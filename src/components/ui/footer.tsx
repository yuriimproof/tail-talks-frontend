"use client";

import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/constants";

export function Footer() {
	return (
		<footer className="bg-slate-900 py-16 px-4">
			<div className="container mx-auto">
				{/* Logo */}
				<div className="mb-8 lg:mb-16">
					<h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						TAILTALKS
					</h3>
				</div>

				{/* Desktop Layout */}
				<div className="hidden lg:flex justify-between items-start gap-12 mb-16">
					{/* Navigation Links */}
					<div className="flex flex-wrap gap-8 lg:gap-12">
						{navigationLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-white hover:text-purple-400 transition-colors text-lg"
							>
								{link.label}
							</a>
						))}
					</div>

					{/* Telegram Button */}
					<div className="flex items-center">
						<Button
							asChild
							className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-3 rounded-xl border border-purple-500/30"
						>
							<a
								href="https://t.me/tailtalksrus"
								target="_blank"
								rel="noopener noreferrer"
							>
								Сообщество Telegram
							</a>
						</Button>
					</div>
				</div>

				{/* Mobile Layout */}
				<div className="lg:hidden mb-8">
					{/* Navigation Links - Vertical on Mobile */}
					<nav className="flex flex-col gap-4 mb-8 items-center text-center">
						{navigationLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-white hover:text-purple-400 transition-colors text-lg"
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* Telegram Button - Full Width on Mobile */}
					<Button
						asChild
						className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 rounded-xl border border-purple-500/30 text-lg"
					>
						<a
							href="https://t.me/tailtalksrus"
							target="_blank"
							rel="noopener noreferrer"
						>
							Сообщество Telegram
						</a>
					</Button>
				</div>

				{/* Contact Info */}
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
					<div>
						<p className="text-gray-400 mb-1">Свяжитесь с нами:</p>
						<p className="text-white">Email: Tailtalks.official@gmail.com</p>
					</div>
				</div>

				{/* Bottom Copyright */}
				<div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-700">
					<p className="text-gray-400 text-sm">
						© 2024 Tail Talks. All Rights Reserved.
					</p>
					<a
						href="/privacy"
						className="text-gray-400 text-sm hover:text-white transition-colors"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	);
}
