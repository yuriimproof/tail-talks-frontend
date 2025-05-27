"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/constants";

export function FAQSection() {
	return (
		<section id="faq" className="py-20 px-4">
			<div className="container mx-auto">
				<div className="text-center mb-12">
					<p className="text-purple-400 text-6xl font-semibold mb-2">FAQ</p>
					<h2 className="text-4xl font-bold">Часто задаваемые вопросы</h2>
				</div>

				<div className="max-w-3xl mx-auto">
					<Accordion type="single" collapsible className="space-y-4">
						{faqData.map((faq) => (
							<AccordionItem
								key={faq.id}
								value={faq.id}
								className="border border-purple-500/30 rounded-xl bg-slate-800/30 px-6"
							>
								<AccordionTrigger className="text-left hover:no-underline py-6 text-lg">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-white/70 pb-6 text-lg">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
