"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletConnectButton() {
	const { address, isConnected } = useAccount();
	const { connect, connectors } = useConnect();
	const { disconnect } = useDisconnect();

	if (isConnected) {
		return (
			<div className="flex items-center gap-2">
				<span className="text-sm text-white/70">
					{address?.slice(0, 6)}...{address?.slice(-4)}
				</span>
				<Button
					variant="outline"
					size="sm"
					onClick={() => disconnect()}
					className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
				>
					Отключить
				</Button>
			</div>
		);
	}

	return (
		<Button
			variant="outline"
			onClick={() => connect({ connector: connectors[0] })}
			className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
		>
			Подключить кошелек
		</Button>
	);
}
