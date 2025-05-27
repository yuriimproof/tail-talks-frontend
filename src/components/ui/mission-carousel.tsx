"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MissionCard {
	id: number;
	imageUrl: string;
	title: string;
	description: string;
	gradient: string;
}

const missionCards: MissionCard[] = [
	{
		id: 1,
		imageUrl: "/images/mission1.jpg",
		title: "Объединить",
		description: "сообщество владельцев питомцев со всего мира",
		gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
	},
	{
		id: 2,
		imageUrl: "/images/mission2.jpg",
		title: "Популяризировать",
		description: "технологии блокчейна - фото вашего питомца станет NFT!",
		gradient: "bg-gradient-to-br from-pink-400 to-purple-500",
	},
	{
		id: 3,
		imageUrl: "/images/mission3.jpg",
		title: "Создать",
		description:
			"безопасное и интерактивное пространство для общения и обмена опытом",
		gradient: "bg-gradient-to-br from-orange-400 to-pink-500",
	},
	{
		id: 4,
		imageUrl: "/images/mission4.jpg",
		title: "Развивать",
		description: "инновационные решения для взаимодействия с питомцами",
		gradient: "bg-gradient-to-br from-green-400 to-blue-500",
	},
];

export function MissionCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => {
			if (typeof window === "undefined") return prevIndex;

			const width = window.innerWidth;
			let maxIndex: number;

			// Mobile: can cycle through all cards
			if (width < 768) {
				maxIndex = missionCards.length - 1;
			}
			// Extra large screens (xl+): show 3 cards, so max index is length - 3
			else if (width >= 1280) {
				maxIndex = Math.max(0, missionCards.length - 3);
			}
			// Medium screens (md): show 2 cards, so max index is length - 2
			else {
				maxIndex = Math.max(0, missionCards.length - 2);
			}

			return prevIndex >= maxIndex ? 0 : prevIndex + 1;
		});
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? missionCards.length - 1 : prevIndex - 1,
		);
	};

	// Calculate transform based on screen size
	const getTransform = () => {
		if (typeof window === "undefined") return "translateX(-0%)";

		const width = window.innerWidth;

		// Mobile: move by full width (100%)
		if (width < 768) {
			return `translateX(-${currentIndex * 100}%)`;
		}
		// Extra large screens (xl+): 3 cards visible, move by ~33.33%
		if (width >= 1280) {
			// With 4 cards showing 3, max movement should be 25% (to show cards 2,3,4)
			const cardWidthPercent = 25;
			return `translateX(-${currentIndex * cardWidthPercent}%)`;
		}
		// Medium screens (md): 2 cards visible, move by 50%
		const cardWidthPercent = 50;
		return `translateX(-${currentIndex * cardWidthPercent}%)`;
	};

	return (
		<div className="relative">
			{/* Header */}
			<div className="flex items-center justify-between mb-8 md:mb-12">
				<h2 className="text-2xl md:text-4xl font-bold">Наша миссия</h2>
				{/* Desktop navigation buttons */}
				<div className="hidden md:flex gap-2">
					<Button
						variant="outline"
						size="sm"
						className="border-purple-500/20 hover:bg-purple-500/10"
						onClick={prevSlide}
					>
						<ChevronLeft className="w-4 h-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="border-purple-500/20 hover:bg-purple-500/10"
						onClick={nextSlide}
					>
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Carousel container */}
			<div className="relative">
				{/* Mobile navigation buttons */}
				<button
					type="button"
					onClick={prevSlide}
					className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-purple-500/80 hover:bg-purple-500 text-white p-2 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm md:hidden"
					aria-label="Предыдущий слайд"
				>
					<ChevronLeft className="w-5 h-5" />
				</button>

				<button
					type="button"
					onClick={nextSlide}
					className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-purple-500/80 hover:bg-purple-500 text-white p-2 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm md:hidden"
					aria-label="Следующий слайд"
				>
					<ChevronRight className="w-5 h-5" />
				</button>

				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-500 ease-in-out w-full gap-0 md:gap-4"
						style={{ transform: getTransform() }}
					>
						{missionCards.map((card) => (
							<div
								key={card.id}
								className="flex-shrink-0 w-full md:w-[calc(50%-12px)] xl:w-[calc(30%-18px)]"
							>
								<div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-slate-800/30 backdrop-blur-sm h-full flex flex-col mx-16 md:mx-0">
									{/* Image Section */}
									<div
										className={`relative h-48 md:h-64 ${card.gradient} p-4 md:p-6 flex items-center justify-center flex-shrink-0`}
									>
										<div className="relative w-full h-full rounded-xl overflow-hidden">
											<Image
												src={card.imageUrl}
												alt={card.title}
												fill
												className="object-cover"
											/>
										</div>
									</div>

									{/* Content Section */}
									<div className="p-4 md:p-6 text-center flex-grow flex flex-col justify-center min-h-[120px] md:min-h-[140px]">
										<div className="flex items-center justify-center mb-3">
											<div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1" />
											<h3 className="text-lg md:text-xl font-semibold text-white mx-3 md:mx-4 whitespace-nowrap">
												{card.title}
											</h3>
											<div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1" />
										</div>
										<p className="text-white/70 leading-relaxed text-sm">
											{card.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Mobile dots indicator */}
				<div className="flex justify-center mt-6 gap-2 md:hidden">
					{missionCards.map((card, index) => (
						<button
							key={card.id}
							type="button"
							onClick={() => setCurrentIndex(index)}
							className={`w-2 h-2 rounded-full transition-colors ${
								index === currentIndex ? "bg-purple-500" : "bg-white/30"
							}`}
							aria-label={`Перейти к слайду ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
