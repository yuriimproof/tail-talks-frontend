import Image from "next/image";
import type { ReactNode } from "react";

interface FeatureCardProps {
	title: string;
	description: string;
	imageUrl?: string;
	icon?: ReactNode;
	gradient: string;
	className?: string;
}

export function FeatureCard({
	title,
	description,
	imageUrl,
	icon,
	gradient,
	className = "",
}: FeatureCardProps) {
	return (
		<div
			className={`relative rounded-2xl overflow-hidden border border-purple-500/20 ${className}`}
		>
			{/* Image/Icon Section */}
			<div
				className={`relative h-48 ${gradient} flex items-center justify-center`}
			>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={title}
						width={200}
						height={200}
						className="w-auto h-32 object-contain"
					/>
				) : icon ? (
					<div className="text-6xl text-white/90">{icon}</div>
				) : null}
			</div>

			{/* Content Section */}
			<div className="bg-slate-800/50 backdrop-blur-sm p-6">
				<h3 className="text-xl font-semibold text-white mb-3 text-center">
					{title}
				</h3>
				<p className="text-white/70 text-center leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
}
