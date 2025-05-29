"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMintNFT, useStarOwnerMint } from "@/lib/contracts/hooks";
import { AlertCircle, Image as ImageIcon, Star, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useChainId } from "wagmi";

export function NFTSection() {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const {
		mint: mintStarKeeper,
		isLoading: isMintingStarKeeper,
		// error: mintStarKeeperError,
		mintPrice,
	} = useMintNFT();
	const {
		mint: mintStarOwner,
		isLoading: isMintingStarOwner,
		// error: mintStarOwnerError,
		// mintPrice: starOwnerMintPrice,
	} = useStarOwnerMint();
	// const { address, isConnected } = useAccount();
	const { isConnected } = useAccount();
	const chainId = useChainId();
	const { toast } = useToast();

	// Check if on correct network
	const isCorrectNetwork = chainId === 56;

	// Validation constants
	const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
	const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

	const validateFile = (file: File): string | null => {
		if (!ALLOWED_TYPES.includes(file.type)) {
			return "Пожалуйста, загрузите файл изображения (JPG, PNG)";
		}

		if (file.size > MAX_FILE_SIZE) {
			return `Размер файла слишком большой. Максимальный размер: ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
		}

		return null;
	};

	const uploadToIPFS = async (file: File): Promise<string> => {
		try {
			setIsUploading(true);

			// Dynamically import IPFS client to avoid build-time issues
			// @ts-expect-error - IPFS client types are not properly resolved due to package.json exports field limitations
			const { create } = await import("ipfs-http-client");

			// Configure IPFS client to connect to your local node
			const ipfs = create({
				url: "http://127.0.0.1:5001/api/v0",
			});

			// Convert file to buffer
			const buffer = await file.arrayBuffer();

			// Upload to IPFS
			const result = await ipfs.add(Buffer.from(buffer));
			const ipfsUrl = `ipfs://${result.cid.toString()}`;

			console.log("File uploaded to IPFS:", ipfsUrl);
			return ipfsUrl;
		} catch (error) {
			console.error("IPFS upload error:", error);

			// Provide helpful error messages
			if (error instanceof Error) {
				if (error.message.includes("fetch")) {
					throw new Error(
						"Не удается подключиться к IPFS. Убедитесь, что IPFS daemon запущен на порту 5001. " +
							"Запустите: ipfs daemon",
					);
				}
			}

			throw new Error(
				"Ошибка загрузки в IPFS. Проверьте подключение к IPFS node.",
			);
		} finally {
			setIsUploading(false);
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploadError(null);

			const validationError = validateFile(file);
			if (validationError) {
				setUploadError(validationError);
				event.target.value = "";
				return;
			}

			setSelectedImage(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleBuyStarKeeper = async () => {
		if (!isConnected) {
			toast({
				title: "Ошибка",
				description: "Пожалуйста, подключите кошелек!",
				variant: "destructive",
			});
			return;
		}

		try {
			const result = await mintStarKeeper();
			if (!result.success) {
				throw new Error(result.error || "Failed to mint NFT");
			}
			toast({
				title: "Успех!",
				description: "NFT успешно создан!",
			});
		} catch (err) {
			console.error("Error minting StarKeeper NFT:", err);
			const error = err as Error;
			toast({
				title: "Ошибка",
				description: error.message || "Не удалось создать NFT",
				variant: "destructive",
			});
		}
	};

	const handleMintStarOwner = async () => {
		if (!isConnected) {
			toast({
				title: "Ошибка",
				description: "Пожалуйста, подключите кошелек!",
				variant: "destructive",
			});
			return;
		}

		if (!selectedImage) {
			toast({
				title: "Ошибка",
				description: "Пожалуйста, загрузите изображение!",
				variant: "destructive",
			});
			return;
		}

		try {
			// Upload image to IPFS
			const imageIpfsUrl = await uploadToIPFS(selectedImage);

			// Create metadata
			const metadata = {
				name: "Tail Talks Pet NFT",
				description: "A unique pet NFT from Tail Talks collection",
				image: imageIpfsUrl,
			};

			// Convert metadata to Blob and create File
			const metadataFile = new File(
				[JSON.stringify(metadata)],
				"metadata.json",
				{ type: "application/json" },
			);

			// Upload metadata to IPFS
			const metadataIpfsUrl = await uploadToIPFS(metadataFile);

			// Mint NFT with metadata URL
			const result = await mintStarOwner(metadataIpfsUrl);
			if (!result.success) {
				// Provide more specific error messages
				let errorMessage = "Не удалось создать NFT";

				if (result.error?.includes("insufficient funds")) {
					errorMessage =
						"Недостаточно средств для оплаты транзакции и mint price";
				} else if (
					result.error?.includes("user rejected") ||
					result.error?.includes("User denied")
				) {
					errorMessage = "Транзакция была отменена";
				} else if (result.error?.includes("mint price")) {
					errorMessage = "Не удалось получить цену минтинга";
				} else if (result.error?.includes("Contract address not found")) {
					errorMessage = "Смарт-контракт не найден для текущей сети";
				} else if (result.error) {
					errorMessage = result.error;
				}

				throw new Error(errorMessage);
			}

			toast({
				title: "Успех!",
				description: "NFT успешно создан!",
			});
			// Reset form
			setSelectedImage(null);
			setImagePreview(null);
		} catch (err) {
			console.error("Error creating StarOwner NFT:", err);
			const error = err as Error;
			toast({
				title: "Ошибка",
				description: error.message || "Не удалось создать NFT",
				variant: "destructive",
			});
		}
	};

	return (
		<section id="nft" className="py-20 px-4 relative overflow-hidden">
			<div className="container mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-5xl lg:text-6xl font-bold mb-6">
						Ваш эксклюзивный NFT Tail Talks
					</h2>
					<p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto">
						Станьте обладателем уникальной NFT из эксклюзивной коллекции
						TailTalks и займите свое место в истории социальной сети! Этот NFT
						не просто символ любви к животным, но и паспорт в мир привилегий,
						включая участие в пресейле токенов и эксклюзивное бета-тестирование.
					</p>
				</div>

				<div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
					{/* NFT Image with animated rings */}
					<div className="relative flex-shrink-0">
						{/* Animated rings */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full border-2 border-purple-500/30 animate-spin-slow" />
							<div className="absolute w-80 h-80 lg:w-[420px] lg:h-[420px] rounded-full border border-purple-400/20 animate-spin-reverse" />
							<div className="absolute w-64 h-64 lg:w-[340px] lg:h-[340px] rounded-full border border-purple-300/10 animate-spin-slow" />
						</div>

						{/* Sparkle effects */}
						<div className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full animate-pulse" />
						<div className="absolute top-16 right-12 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
						<div className="absolute bottom-12 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-700" />
						<div className="absolute bottom-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
						<div className="absolute top-1/3 left-4 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500" />
						<div className="absolute top-1/4 right-4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-200" />

						{/* NFT Card */}
						<div className="relative z-10 bg-gradient-to-br from-purple-900/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-500/30 shadow-2xl">
							<div className="relative overflow-hidden rounded-2xl mb-4">
								<Image
									src="/images/nft-image.jpg"
									alt="Tail Talks NFT"
									width={320}
									height={320}
									className="w-64 h-64 lg:w-80 lg:h-80 object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>

							<div className="text-center">
								<h3 className="text-2xl font-bold mb-2">
									Уникальная серия Tail Talks
								</h3>
								<p className="text-3xl font-bold text-purple-400 mb-4">
									{mintPrice && isCorrectNetwork
										? mintPrice === BigInt(0)
											? "Бесплатно"
											: `${formatEther(mintPrice)} BNB`
										: isConnected && !isCorrectNetwork
											? "Переключитесь на BSC Mainnet"
											: "Loading..."}
								</p>
								<Button
									onClick={handleBuyStarKeeper}
									disabled={
										isMintingStarKeeper || !isConnected || !isCorrectNetwork
									}
									className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 text-lg font-semibold rounded-xl"
								>
									{isMintingStarKeeper
										? "Создание NFT..."
										: !isCorrectNetwork
											? "Переключитесь на BSC Mainnet"
											: "Купить NFT"}
								</Button>
								{!isConnected && (
									<p className="text-white/70 text-sm mt-3">
										Для покупки NFT необходимо подключить кошелек
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Benefits List */}
					<div className="space-y-8 max-w-lg">
						<div className="space-y-6">
							<div className="flex items-start gap-4">
								<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
									<Star className="w-5 h-5 text-white" />
								</div>
								<div>
									<h4 className="text-xl font-semibold mb-2">
										Эксклюзивный доступ
									</h4>
									<p className="text-white/70">
										Получите ранний доступ к бета-версии TailTalks и станьте
										одним из первых пользователей платформы.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
									<Star className="w-5 h-5 text-white" />
								</div>
								<div>
									<h4 className="text-xl font-semibold mb-2">
										Пресейл токенов
									</h4>
									<p className="text-white/70">
										Эксклюзивное участие в предварительной продаже токенов
										TailTalks по специальной цене.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
									<Star className="w-5 h-5 text-white" />
								</div>
								<div>
									<h4 className="text-xl font-semibold mb-2">Особый статус</h4>
									<p className="text-white/70">
										Уникальный статус в сообществе и доступ к закрытым
										мероприятиям и функциям.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mt-1">
									<Star className="w-5 h-5 text-white" />
								</div>
								<div>
									<h4 className="text-xl font-semibold mb-2">
										Коллекционная ценность
									</h4>
									<p className="text-white/70">
										Ограниченная коллекция NFT, которая может вырасти в цене с
										развитием проекта.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Custom NFT Minting Section */}
				<div className="mt-20 pt-16">
					<div className="text-center mb-12">
						<h3 className="text-4xl font-bold mb-4">
							Создайте свой уникальный NFT
						</h3>
						<p className="text-xl text-white/70 max-w-3xl mx-auto">
							Загрузите фотографию вашего питомца и превратите её в уникальный
							NFT-токен
						</p>
						{isConnected && !isCorrectNetwork && (
							<div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl max-w-lg mx-auto">
								<p className="text-yellow-400 font-medium">
									⚠️ Пожалуйста, переключитесь на BSC Mainnet для создания NFT
								</p>
							</div>
						)}
						{isConnected && isCorrectNetwork && (
							<p className="text-2xl font-bold text-purple-400 mt-4">
								Цена: Бесплатно
							</p>
						)}
					</div>

					<div className="max-w-2xl mx-auto">
						<div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20">
							{/* Upload Area */}
							<div className="mb-8">
								{uploadError && (
									<div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
										<AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
										<p className="text-red-400 text-sm">{uploadError}</p>
									</div>
								)}
								<label htmlFor="image-upload" className="block mb-4">
									<div
										className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
											imagePreview
												? "border-purple-500 bg-purple-500/10"
												: uploadError
													? "border-red-500/50 hover:border-red-500/70 hover:bg-red-500/5"
													: "border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5"
										}`}
									>
										{imagePreview ? (
											<div className="space-y-4">
												<img
													src={imagePreview}
													alt="Preview"
													className="w-48 h-48 object-cover rounded-xl mx-auto"
												/>
												<p className="text-purple-400 font-medium">
													Фото загружено! Нажмите для замены
												</p>
											</div>
										) : (
											<div className="space-y-4">
												<div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
													<ImageIcon className="w-8 h-8 text-purple-400" />
												</div>
												<div>
													<p className="text-xl font-semibold text-white mb-2">
														Загрузите фото вашего питомца
													</p>
													<p className="text-white/60">
														Поддерживаются форматы: JPG, PNG (макс. 10MB)
													</p>
												</div>
												<div className="flex items-center justify-center gap-2 text-purple-400">
													<Upload className="w-5 h-5" />
													<span>Нажмите или перетащите файл</span>
												</div>
											</div>
										)}
									</div>
								</label>
								<input
									id="image-upload"
									type="file"
									accept="image/jpeg,image/jpg,image/png"
									onChange={handleImageUpload}
									className="hidden"
								/>
							</div>

							{/* Mint Button */}
							<div className="text-center">
								<Button
									onClick={handleMintStarOwner}
									disabled={
										!selectedImage ||
										isMintingStarOwner ||
										isUploading ||
										!isConnected ||
										!isCorrectNetwork
									}
									className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300"
								>
									{isUploading ? (
										"Загрузка изображения..."
									) : isMintingStarOwner ? (
										"Создание NFT..."
									) : !isCorrectNetwork ? (
										"Переключитесь на BSC Mainnet"
									) : (
										<>
											<Star className="w-5 h-5 mr-2" />
											Создать NFT из фото
										</>
									)}
								</Button>
								{!isConnected && (
									<p className="text-white/70 text-sm mt-3">
										Для создания NFT необходимо подключить кошелек
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
