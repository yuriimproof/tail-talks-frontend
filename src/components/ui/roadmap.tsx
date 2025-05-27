"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface RoadmapItem {
	title: string;
	items: string[];
}

interface Quarter {
	title: string;
	sections: RoadmapItem[];
}

const roadmapData: Quarter[] = [
	{
		title: "Первый квартал",
		sections: [
			{
				title: "Исследование рынка",
				items: [
					"анализ конкурентов",
					"определение целевой аудитории",
					"изучение потребностей рынка",
				],
			},
			{
				title: "Разработка концепции",
				items: [
					"определение функциональности",
					"разработка бизнес модели",
					"создание прототипа",
				],
			},
			{
				title: "Формирование команды",
				items: ["поиск и привлечение опытных специалистов"],
			},
		],
	},
	{
		title: "Второй квартал",
		sections: [
			{
				title: "Разработка MVP",
				items: [
					"запуск минимально жизнеспособного продукта",
					"тестирование",
					"доработка функциональности",
					"получение обратной связи от пользователей",
				],
			},
			{
				title: "Маркетинг",
				items: ["запуск рекламной кампании", "формирование сообщества"],
			},
			{
				title: "Привлечение пользователей",
				items: [
					"проведение конкурсов и акций",
					"сотрудничество с инфлюенсерами",
				],
			},
		],
	},
	{
		title: "Третий квартал",
		sections: [
			{
				title: "Выпуск лимитированной NFT коллекции",
				items: [
					"разработка и предложение к продаже особой коллекции NFT с правом приоритетного участия в первичном размещении токенов на 21 день раньше",
					"выпуск токенов на децентрализованной платформе",
					"разработка, тестирование и запуск токенов в сети после успешного MVP",
				],
			},
			{
				title: "Развитие платформы",
				items: [
					"добавление новых функций",
					"расширение возможностей",
					"улучшение пользовательского опыта",
				],
			},
		],
	},
	{
		title: "Четвертый квартал",
		sections: [
			{
				title: "Выход на новые рынки",
				items: [
					"адаптация платформы для разных стран",
					"перевод интерфейса на другие языки",
				],
			},
			{
				title: "Масштабирование",
				items: [
					"увеличение числа пользователей",
					"расширение команды",
					"привлечение дополнительных инвестиций",
				],
			},
			{
				title: "Партнерство",
				items: [
					"с другими компаниями в сфере Web3",
					"с вет клиниками, зоомагазинами",
				],
			},
			{
				title: "Развитие благотворительных инициатив",
				items: [],
			},
		],
	},
];

export function Roadmap() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const cardWidth = 320; // Width of each card + gap

	useEffect(() => {
		const updateScrollButtons = () => {
			if (scrollContainerRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } =
					scrollContainerRef.current;
				setCanScrollLeft(scrollLeft > 0);
				setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
			}
		};

		updateScrollButtons();
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", updateScrollButtons);
			return () =>
				scrollContainer.removeEventListener("scroll", updateScrollButtons);
		}
	}, []);

	const scrollToIndex = (index: number) => {
		if (scrollContainerRef.current) {
			const scrollPosition = index * cardWidth;
			scrollContainerRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	const scrollLeft = () => {
		const newIndex = Math.max(0, currentIndex - 1);
		scrollToIndex(newIndex);
	};

	const scrollRight = () => {
		const newIndex = Math.min(roadmapData.length - 1, currentIndex + 1);
		scrollToIndex(newIndex);
	};

	return (
		<div className="relative px-12">
			<div className="text-center mb-16">
				<h2 className="text-4xl font-bold mb-4">
					Дорожная карта Tail Talks 2024!
				</h2>
				<p className="text-white/70 text-lg">
					Отслеживайте развитие нашей социальной сети для животных
				</p>
			</div>

			{/* Carousel Container */}
			<div className="relative">
				{/* Left scroll button */}
				{canScrollLeft && (
					<button
						type="button"
						onClick={scrollLeft}
						className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 bg-purple-500/80 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm 2xl:hidden"
						aria-label="Прокрутить влево"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
				)}

				{/* Right scroll button */}
				{canScrollRight && (
					<button
						type="button"
						onClick={scrollRight}
						className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 bg-purple-500/80 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm 2xl:hidden"
						aria-label="Прокрутить вправо"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				)}

				{/* Scrollable container with timeline and cards */}
				<div
					ref={scrollContainerRef}
					className="overflow-x-auto scrollbar-hide"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						scrollSnapType: "x mandatory",
					}}
				>
					{/* Content wrapper */}
					<div className="flex gap-6 pb-4 px-8">
						{roadmapData.map((quarter, index) => (
							<div
								key={quarter.title}
								className="flex-shrink-0 flex flex-col items-center"
								style={{
									scrollSnapAlign: "start",
									minWidth: "320px",
								}}
							>
								{/* Timeline section for each quarter */}
								<div className="relative mb-8 w-full">
									{/* Timeline dot */}
									<div className="flex justify-center relative">
										<div
											className={`w-4 h-4 rounded-full z-10 ${
												index === 0 ? "bg-purple-500" : "bg-white"
											}`}
										/>

										{/* Timeline line - only show if not the last quarter */}
										{index < roadmapData.length - 1 && (
											<div className="absolute top-1/2 left-[59%] w-[90%] h-0.5 bg-white -translate-y-1/2 z-0" />
										)}

										{/* Timeline line - first quarter */}
										{index === 0 && (
											<div className="absolute top-1/2 left-[59%] w-[90%] h-0.5 bg-gradient-to-r from-purple-500 to-white -translate-y-1/2 z-0" />
										)}
									</div>

									{/* Quarter label */}
									<span className="text-sm font-medium mt-3 block text-center whitespace-nowrap">
										{quarter.title}
									</span>
								</div>

								{/* Card */}
								<div className="w-80 bg-slate-800/40 rounded-2xl p-6 border border-white/20 hover:border-purple-500/40 transition-colors duration-200">
									<h3 className="text-xl font-bold mb-6 text-white">
										{quarter.title}
									</h3>
									<div className="space-y-6">
										{quarter.sections.map((section) => (
											<div key={section.title}>
												<h4 className="font-semibold mb-3 text-white">
													{section.title}
												</h4>
												{section.items.length > 0 && (
													<ul className="space-y-2">
														{section.items.map((item) => (
															<li
																key={item}
																className="text-sm text-white/70 flex items-start"
															>
																<span className="text-white/70 mr-2">•</span>
																<span>{item}</span>
															</li>
														))}
													</ul>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Custom scrollbar styles */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
}
