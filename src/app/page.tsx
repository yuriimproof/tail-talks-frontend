import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { WalletConnect } from "@/components/wallet-connect";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
			{/* Header */}
			<header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
						<h1 className="text-xl font-bold">Tail Talks</h1>
					</div>
					<nav className="hidden md:flex items-center space-x-6">
						<a
							href="#features"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							About
						</a>
						<a
							href="#docs"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Docs
						</a>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<main className="container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Welcome to the Future of Web3
					</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
						Connect your wallet and explore the decentralized web with our
						modern, beautiful interface built with Next.js, Tailwind CSS, and
						shadcn/ui.
					</p>
				</div>

				{/* Wallet Connection Section */}
				<div className="flex justify-center mb-16">
					<WalletConnect />
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-3 gap-8 mb-16" id="features">
					<Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
						<CardHeader>
							<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
								<Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<CardTitle>Lightning Fast</CardTitle>
							<CardDescription>
								Built with Next.js 14 and optimized for performance with modern
								web standards.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full group">
								Learn More
								<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</CardContent>
					</Card>

					<Card className="border-2 hover:border-green-200 dark:hover:border-green-800 transition-colors">
						<CardHeader>
							<div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
								<Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<CardTitle>Secure & Reliable</CardTitle>
							<CardDescription>
								Enterprise-grade security with comprehensive wallet integration
								and best practices.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full group">
								Security Docs
								<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</CardContent>
					</Card>

					<Card className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
						<CardHeader>
							<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
								<Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
							</div>
							<CardTitle>Multi-Chain Support</CardTitle>
							<CardDescription>
								Connect to multiple blockchain networks with seamless switching
								and management.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full group">
								View Networks
								<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* CTA Section */}
				<Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 text-white">
					<CardHeader className="text-center">
						<CardTitle className="text-3xl mb-2">
							Ready to Get Started?
						</CardTitle>
						<CardDescription className="text-blue-100">
							Join thousands of users already building on our platform
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" variant="secondary">
							View Documentation
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white text-white hover:bg-white hover:text-blue-600"
						>
							Join Community
						</Button>
					</CardContent>
				</Card>
			</main>

			{/* Footer */}
			<footer className="border-t bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm mt-16">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="flex items-center space-x-2 mb-4 md:mb-0">
							<div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
							<span className="font-semibold">Tail Talks</span>
						</div>
						<div className="flex items-center space-x-6 text-sm text-muted-foreground">
							<a href="/privacy" className="hover:text-foreground">
								Privacy
							</a>
							<a href="/terms" className="hover:text-foreground">
								Terms
							</a>
							<a href="/support" className="hover:text-foreground">
								Support
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
