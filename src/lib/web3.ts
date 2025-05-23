import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

export const config = createConfig({
	chains: [mainnet, sepolia],
	connectors: [
		injected(),
		walletConnect({
			projectId,
			metadata: {
				name: "Tail Talks",
				description: "Web3 Frontend App",
				url: "https://tail-talks.vercel.app",
				icons: ["https://avatars.githubusercontent.com/u/37784886"],
			},
		}),
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}
