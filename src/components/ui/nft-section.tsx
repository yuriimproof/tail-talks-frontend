"use client";

import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Star, Upload } from "lucide-react";
import { useState } from "react";

export function NFTSection() {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleMintNFT = () => {
		if (selectedImage) {
			// Here you would implement the actual NFT minting logic
			console.log("Minting NFT with image:", selectedImage.name);
			// For now, just show an alert
			alert("NFT minting functionality will be implemented soon!");
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
								<img
									src="/images/nft-image.jpg"
									alt="Tail Talks NFT"
									className="w-64 h-64 lg:w-80 lg:h-80 object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
							</div>

							<div className="text-center">
								<h3 className="text-2xl font-bold mb-2">
									Уникальная серия Tail Talks
								</h3>
								<p className="text-3xl font-bold text-purple-400 mb-4">200 $</p>
								<Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg font-semibold rounded-xl">
									Купить NFT
								</Button>
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
					</div>

					<div className="max-w-2xl mx-auto">
						<div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20">
							{/* Upload Area */}
							<div className="mb-8">
								<label htmlFor="image-upload" className="block mb-4">
									<div
										className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
											imagePreview
												? "border-purple-500 bg-purple-500/10"
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
														Поддерживаются форматы: JPG, PNG, GIF (макс. 10MB)
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
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
								/>
							</div>

							{/* Mint Button */}
							<div className="text-center">
								<Button
									onClick={handleMintNFT}
									disabled={!selectedImage}
									className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300"
								>
									{selectedImage ? (
										<>
											<Star className="w-5 h-5 mr-2" />
											Создать NFT из фото
										</>
									) : (
										"Сначала загрузите фото"
									)}
								</Button>
								{/* {selectedImage && (
									<p className="text-white/60 text-sm mt-3">
										Стоимость создания NFT: 50 TAIL токенов
									</p>
								)} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
