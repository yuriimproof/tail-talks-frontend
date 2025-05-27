"use client";

import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/ui/nft-card";

export function HeroSection() {
	return (
		<section className="relative py-20 px-4">
			<div className="container mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<div className="space-y-8 text-center lg:text-left">
						<h1 className="text-5xl lg:text-6xl font-bold leading-tight">
							Протяните руку
							<br />
							вашему питомцу
							<br />
							<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								с NFT
							</span>
						</h1>

						<p className="text-xl text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
							Tail Talks - социальная сеть нового поколения для питомцев и их
							владельцев, где каждый питомец заслуживает стать звездой
						</p>

						<div className="flex justify-center lg:justify-start">
							<Button
								size="lg"
								className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg w-full sm:w-auto"
								onClick={(e) => {
									e.preventDefault();
									const nextSection = document.getElementById("steps");
									if (nextSection) {
										nextSection.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
									}
								}}
							>
								Узнать подробнее
							</Button>
						</div>
					</div>

					{/* Right Content - NFT Card */}
					<div className="flex justify-center order-first lg:order-last">
						<NFTCard
							imageUrl="/images/lera-nft.png"
							name="ЛЕРА"
							likes={338}
							userAvatar="/images/lera-avatar.jpg"
							className="w-full max-w-sm"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
