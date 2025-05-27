import { ThemeProvider } from "@/components/providers/theme-provider";
import { Web3Provider } from "@/components/providers/web3-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "TailTalks - NFT Social Network for Pet Owners",
	description:
		"Social network for pet owners where every pet deserves to be a star with NFT",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Web3Provider>{children}</Web3Provider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
