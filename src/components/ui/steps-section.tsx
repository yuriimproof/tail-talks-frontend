import { GradientCard } from "@/components/ui/gradient-card";
import { stepsData } from "@/lib/constants";

export function StepsSection() {
	return (
		<section id="steps" className="py-20 px-4">
			<div className="container mx-auto">
				<h2 className="text-4xl font-bold text-center mb-4">
					Представьте себе мир где:
				</h2>

				<div className="grid gap-6 max-w-4xl mx-auto mt-12">
					{stepsData.map((step) => (
						<GradientCard
							key={step.number}
							number={step.number}
							title={step.title}
							description={step.description}
							gradient={step.gradient}
							style={step.style}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
