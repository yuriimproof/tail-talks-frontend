import type { ReactNode } from "react";

interface GradientCardProps {
	number: string;
	title: string;
	description: string;
	gradient: string;
	style?: string;
	children?: ReactNode;
	className?: string;
}

export function GradientCard({
	number,
	title,
	description,
	gradient,
	style,
	children,
	className = "",
}: GradientCardProps) {
	return (
		<div
			className={`relative rounded-2xl p-6 ${gradient} ${className}`}
			style={style ? { background: style } : {}}
		>
			<div className="flex items-start gap-4">
				<div className="text-4xl font-bold text-white/90 min-w-[3rem]">
					{number}
				</div>
				<div>
					<h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
					<p className="text-white/80 leading-relaxed">{description}</p>
					{children}
				</div>
			</div>
		</div>
	);
}
