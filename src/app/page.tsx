"use client";

import { CommunitySection } from "@/components/ui/community-section";
import { FAQSection } from "@/components/ui/faq-section";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { MainNav } from "@/components/ui/main-nav";
import { MissionCarousel } from "@/components/ui/mission-carousel";
import { NFTSection } from "@/components/ui/nft-section";
import { Roadmap } from "@/components/ui/roadmap";
import { StepsSection } from "@/components/ui/steps-section";

export default function Home() {
	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<MainNav />
			<HeroSection />
			<StepsSection />

			{/* Mission Section */}
			<section id="mission" className="py-20 px-4">
				<div className="container mx-auto">
					<MissionCarousel />
				</div>
			</section>

			<CommunitySection />

			{/* Roadmap Section */}
			<section id="roadmap" className="py-20 px-4">
				<div className="container mx-auto">
					<Roadmap />
				</div>
			</section>

			<NFTSection />
			<FAQSection />
			<Footer />
		</div>
	);
}
