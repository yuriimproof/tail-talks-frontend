import { Send, Star } from "lucide-react";

export const SendIcon = () => <Send className="w-6 h-6 text-purple-400" />;

export const StarIcon = () => <Star className="w-6 h-6 text-purple-400" />;

export const DiamondIcon = () => (
	<svg
		className="w-6 h-6 text-purple-400"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-label="Diamond"
	>
		<title>Diamond</title>
		<path d="M6 3h12l4 6-10 12L2 9l4-6z" />
	</svg>
);

export const CheckmarkIcon = () => (
	<svg
		className="w-10 h-10 text-white"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-label="Checkmark"
	>
		<title>Checkmark</title>
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
	</svg>
);

export const StarDonationIcon = () => (
	<svg
		className="w-10 h-10 text-white"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-label="Star"
	>
		<title>Star</title>
		<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
	</svg>
);

export const WalletIcon = () => (
	<svg
		className="w-10 h-10 text-white"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-label="Wallet"
	>
		<title>Wallet</title>
		<path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
	</svg>
);
