import { Heart } from "lucide-react";
import Image from "next/image";

interface NFTCardProps {
	imageUrl: string;
	name: string;
	likes: number;
	userAvatar?: string;
	className?: string;
}

export function NFTCard({
	imageUrl,
	name,
	likes,
	userAvatar,
	className = "",
}: NFTCardProps) {
	return (
		<div
			className={`relative bg-slate-800/50 rounded-2xl p-4 border border-purple-500/20 backdrop-blur-sm ${className}`}
		>
			{/* Main NFT Image */}
			<div className="relative rounded-xl overflow-hidden mb-4">
				<Image
					src={imageUrl}
					alt={name}
					width={400}
					height={400}
					className="w-full h-auto aspect-square object-cover"
				/>
			</div>

			{/* Bottom section with user and likes */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					{userAvatar && (
						<div className="w-8 h-8 rounded-full overflow-hidden">
							<Image
								src={userAvatar}
								alt="User avatar"
								width={32}
								height={32}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
					<span className="text-white font-medium">{name}</span>
				</div>

				<div className="flex items-center gap-1 text-white/70">
					<Heart className="w-4 h-4" />
					<span className="text-sm">{likes}</span>
				</div>
			</div>
		</div>
	);
}
