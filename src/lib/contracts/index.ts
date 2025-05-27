// Contract addresses for BSC Mainnet
export const CONTRACT_ADDRESSES = {
	// BSC Mainnet
	[56]: {
		// Add your mainnet contract addresses here
		starKeeper: "0x0000000000000000000000000000000000000000" as const,
		paymentToken: "0x0000000000000000000000000000000000000000" as const,
		factory: "0x0000000000000000000000000000000000000000" as const,
	},
} as const;

// Export contract addresses only
// Import ABIs, hooks, and types directly from their respective files when needed
