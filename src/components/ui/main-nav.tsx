"use client";

import { WalletConnectButton } from "@/components/ui/wallet-connect-button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function MainNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	const navItems = [
		{ href: "#mission", label: "НАША МИССИЯ", id: "mission" },
		{ href: "#community", label: "СООБЩЕСТВО", id: "community" },
		{ href: "#roadmap", label: "ДОРОЖНАЯ КАРТА", id: "roadmap" },
		{ href: "#nft", label: "NFT", id: "nft" },
		{ href: "#faq", label: "FAQ", id: "faq" },
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				}
			},
			{
				threshold: 0.3,
				rootMargin: "-100px 0px -50% 0px",
			},
		);

		// Observe all sections
		const sections = ["mission", "community", "roadmap", "nft", "faq"];
		for (const sectionId of sections) {
			const element = document.getElementById(sectionId);
			if (element) {
				observer.observe(element);
			}
		}

		return () => observer.disconnect();
	}, []);

	const handleNavClick = (href: string, id: string) => {
		setActiveSection(id);
		// Smooth scroll to section
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center">
						<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							TAILTALKS
						</h1>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<button
								key={item.href}
								type="button"
								onClick={() => handleNavClick(item.href, item.id)}
								className={`text-sm font-medium transition-colors ${
									activeSection === item.id
										? "text-purple-400 font-semibold"
										: "text-white/70 hover:text-white"
								}`}
							>
								{item.label}
							</button>
						))}
					</nav>

					{/* Wallet Connect */}
					<div className="hidden lg:flex items-center">
						<WalletConnectButton />
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="lg:hidden p-2"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? (
							<X className="h-6 w-6 text-white" />
						) : (
							<Menu className="h-6 w-6 text-white" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="lg:hidden mt-4 pb-4 border-t border-purple-500/20">
						<div className="flex flex-col space-y-4 pt-4">
							{navItems.map((item) => (
								<button
									key={item.href}
									type="button"
									onClick={() => {
										handleNavClick(item.href, item.id);
										setIsOpen(false);
									}}
									className={`text-sm font-medium transition-colors text-left ${
										activeSection === item.id
											? "text-purple-400 font-semibold"
											: "text-white/70 hover:text-white"
									}`}
								>
									{item.label}
								</button>
							))}
							<div className="pt-4">
								<WalletConnectButton />
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
