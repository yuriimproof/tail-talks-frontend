import { createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
	chains: [bsc],
	connectors: [
		injected(),
		walletConnect({
			projectId: projectId ?? "",
			metadata: {
				name: "Tail Talks",
				description: "Web3 Frontend App",
				url: "https://tail-talks.vercel.app",
				icons: ["https://avatars.githubusercontent.com/u/37784886"],
			},
		}),
	],
	transports: {
		[bsc.id]: http(),
	},
});

declare module "wagmi" {
	interface Register {
		config: typeof config;
	}
}
