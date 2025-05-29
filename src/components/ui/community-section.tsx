"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { donationCards, featuresData, goalsData } from "@/lib/constants";
import {
	CheckmarkIcon,
	DiamondIcon,
	SendIcon,
	StarDonationIcon,
	StarIcon,
	WalletIcon,
} from "@/lib/icons";
import { Copy, Send } from "lucide-react";
import Image from "next/image";

// Icon renderer function
const renderIcon = (iconType: string) => {
	switch (iconType) {
		case "send":
			return <SendIcon />;
		case "star":
			return <StarIcon />;
		case "diamond":
			return <DiamondIcon />;
		case "checkmark":
			return <CheckmarkIcon />;
		case "star-donation":
			return <StarDonationIcon />;
		case "wallet":
			return <WalletIcon />;
		default:
			return null;
	}
};

export function CommunitySection() {
	const { toast } = useToast();

	// Copy function with toast notification
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast({
				title: "Адрес скопирован!",
				description: "Адрес кошелька успешно скопирован в буфер обмена",
			});
		} catch (err) {
			console.error("Failed to copy text: ", err);
			toast({
				title: "Ошибка",
				description: "Не удалось скопировать адрес",
				variant: "destructive",
			});
		}
	};
	return (
		<section id="community" className="py-5 px-4">
			<div className="container mx-auto">
				<h2 className="text-4xl font-bold text-center mb-4">Сообщество</h2>

				{/* Telegram CTA */}
				<div className="bg-gradient-to-r from-purple-600/50 to-purple-800/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 my-10">
					<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
						<div>
							<h3 className="text-2xl font-bold mb-2">
								Присоединяйся к нашему сообществу в Телеграм
							</h3>
							<p className="text-white/70">Не пропусти новости о Tail Talks</p>
						</div>
						<Button asChild className="bg-purple-500 hover:bg-purple-600 px-8">
							<a
								href="https://t.me/tailtalksrus"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Send className="w-4 h-4 mr-2" />
								Сообщество в Telegram
							</a>
						</Button>
					</div>
				</div>

				{/* Features */}
				<div className="bg-slate-900/50 rounded-2xl p-8">
					<h3 className="text-3xl font-bold text-center mb-12">
						TailTalks – это не просто социальная сеть, это:
					</h3>

					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{featuresData.map((feature) => (
							<div key={feature.id} className="flex gap-4">
								<div className="bg-purple-500/20 rounded-full p-3 h-fit">
									{renderIcon(feature.iconType)}
								</div>
								<div>
									<h4 className="text-xl font-semibold mb-2">
										{feature.title}
									</h4>
									<p className="text-white/70">{feature.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Goals and Philosophy Section */}
				<div className="mt-20">
					<div className="text-center mb-12">
						<p className="text-purple-400 text-4xl mb-2">
							Общие цели и философия
						</p>
						<h3 className="text-2xl font-bold">Tail Talks</h3>
					</div>

					<div className="max-w-4xl mx-auto">
						<Accordion type="single" collapsible className="space-y-4">
							{goalsData.map((goal) => (
								<AccordionItem
									key={goal.id}
									value={goal.id}
									className="border border-purple-500/30 rounded-xl bg-slate-800/30 px-6"
								>
									<AccordionTrigger className="text-left hover:no-underline py-6 text-lg">
										{goal.question}
									</AccordionTrigger>
									<AccordionContent className="text-white/70 pb-6 text-lg">
										{goal.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Help Build Community Section */}
					<div className="mt-16 text-center">
						<h3 className="text-3xl font-bold mb-6">
							Хотите помочь нам построить дружелюбное пространство для питомцев?
						</h3>
						<p className="text-white/70 text-lg mb-12 max-w-3xl mx-auto">
							Ваша щедрость поможет нам разработать новые функции платформы,
							поддержать благотворительные приюты для животных и сделать Tail
							Talks доступным для большего числа людей
						</p>

						<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
							{donationCards.map((card) => (
								<div
									key={card.id}
									className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20"
								>
									<div className="w-40 h-40 mx-auto mb-8 flex items-center justify-center">
										<Image
											src={card.imageUrl}
											alt={`Money icon ${card.id}`}
											className="w-full h-full object-contain"
											width={160}
											height={160}
										/>
									</div>
									<div className="space-y-4">
										<div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/30">
											<p className="text-xs text-white/40 mb-1 uppercase tracking-wide">
												Адрес кошелька
											</p>
											<p className="text-sm text-white font-mono leading-relaxed overflow-hidden">
												<span className="block truncate">{card.address}</span>
											</p>
										</div>
										<Button
											onClick={() => copyToClipboard(card.address)}
											variant="outline"
											size="sm"
											className="w-full bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 text-white transition-all duration-200"
										>
											<Copy className="w-4 h-4 mr-2" />
											Копировать адрес
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
