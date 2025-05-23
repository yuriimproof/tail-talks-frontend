"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LogOut, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletConnect() {
	const { address, isConnected } = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	if (isConnected) {
		return (
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Wallet className="h-5 w-5" />
						Wallet Connected
					</CardTitle>
					<CardDescription>
						Your wallet is successfully connected
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Address:</span>
						<code className="text-sm bg-muted px-2 py-1 rounded">
							{address && formatAddress(address)}
						</code>
					</div>
					<Button
						onClick={() => disconnect()}
						variant="outline"
						className="w-full"
					>
						<LogOut className="h-4 w-4 mr-2" />
						Disconnect
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Wallet className="h-5 w-5" />
					Connect Wallet
				</CardTitle>
				<CardDescription>
					Choose a wallet to connect to the application
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{connectors.map((connector) => (
					<Button
						key={connector.uid}
						onClick={() => connect({ connector })}
						variant="outline"
						className="w-full justify-start"
					>
						<Wallet className="h-4 w-4 mr-2" />
						{connector.name}
					</Button>
				))}
			</CardContent>
		</Card>
	);
}
