import {
	useChainId,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { STAR_KEEPER, STAR_OWNER } from "./abis";
import { CONTRACT_ADDRESSES } from "./index";
import type {
	CollectionInfo,
	ContractResult,
	TransactionResult,
} from "./types";

// Hook to get contract address for current chain
export function useContractAddress(
	contractName: keyof (typeof CONTRACT_ADDRESSES)[56],
) {
	const chainId = useChainId();
	return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.[
		contractName
	];
}

// STAR_KEEPER NFT Contract Hooks

// Hook to read NFT token URI
export function useReadNFTTokenURI(tokenId: bigint): ContractResult<string> {
	const contractAddress = useContractAddress("starKeeper");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_KEEPER,
		functionName: "tokenURI",
		args: [tokenId],
	});

	return {
		data: data as string,
		error: error?.message,
		isLoading,
	};
}

// Hook to get collection info
export function useCollectionInfo(): ContractResult<CollectionInfo> {
	const contractAddress = useContractAddress("starKeeper");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_KEEPER,
		functionName: "getCollectionInfo",
	});

	return {
		data: data as CollectionInfo,
		error: error?.message,
		isLoading,
	};
}

// Hook to get current supply
export function useCurrentSupply(): ContractResult<bigint> {
	const contractAddress = useContractAddress("starKeeper");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_KEEPER,
		functionName: "getCurrentSupply",
	});

	return {
		data: data as bigint,
		error: error?.message,
		isLoading,
	};
}

// Hook to get NFT balance of an address
export function useNFTBalance(address: `0x${string}`): ContractResult<bigint> {
	const contractAddress = useContractAddress("starKeeper");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_KEEPER,
		functionName: "balanceOf",
		args: [address],
	});

	return {
		data: data as bigint,
		error: error?.message,
		isLoading,
	};
}

// Hook to mint NFT with ETH/BNB
export function useMintNFT() {
	const contractAddress = useContractAddress("starKeeper");
	const {
		writeContractAsync,
		data: hash,
		error,
		isPending,
	} = useWriteContract();

	// Get the current mint price from the contract
	const { data: mintPrice } = useReadContract({
		address: contractAddress,
		abi: STAR_KEEPER,
		functionName: "mintPrice",
	}) as { data: bigint | undefined };

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	});

	const mint = async (): Promise<TransactionResult> => {
		try {
			if (!contractAddress) {
				return {
					success: false,
					error: "Contract address not found for current network",
				};
			}

			if (!mintPrice) {
				return {
					success: false,
					error: "Could not fetch mint price",
				};
			}

			const txHash = await writeContractAsync({
				address: contractAddress,
				abi: STAR_KEEPER,
				functionName: "mint",
				value: mintPrice, // Send the mint price as value
			});

			return {
				hash: txHash,
				success: true,
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Unknown error",
			};
		}
	};

	return {
		mint,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
		mintPrice, // Also return the mint price for display purposes
	};
}

// Hook to mint NFT to specific address
export function useMintToNFT() {
	const contractAddress = useContractAddress("starKeeper");
	const { writeContract, data: hash, error, isPending } = useWriteContract();

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	});

	const mintTo = async (to: `0x${string}`): Promise<TransactionResult> => {
		try {
			if (!contractAddress) {
				return {
					success: false,
					error: "Contract address not found for current network",
				};
			}

			writeContract({
				address: contractAddress,
				abi: STAR_KEEPER,
				functionName: "mintTo",
				args: [to],
			});

			return {
				hash,
				success: isSuccess,
				error: error?.message,
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Unknown error",
			};
		}
	};

	return {
		mintTo,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
	};
}

// Hook to mint NFT with token payment
export function useMintWithToken() {
	const contractAddress = useContractAddress("starKeeper");
	const { writeContract, data: hash, error, isPending } = useWriteContract();

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	});

	const mintWithToken = async (): Promise<TransactionResult> => {
		try {
			if (!contractAddress) {
				return {
					success: false,
					error: "Contract address not found for current network",
				};
			}

			writeContract({
				address: contractAddress,
				abi: STAR_KEEPER,
				functionName: "mintWithToken",
			});

			return {
				hash,
				success: isSuccess,
				error: error?.message,
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Unknown error",
			};
		}
	};

	return {
		mintWithToken,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
	};
}

// Factory Contract Hooks (if needed)
// Note: The factory contract now uses a proposal-based system
// You would need to implement proposal creation and voting hooks if needed

// STAR_OWNER NFT Contract Hooks
export function useStarOwnerMint() {
	const contractAddress = useContractAddress("starOwner");
	const chainId = useChainId();

	const {
		writeContractAsync,
		data: hash,
		error,
		isPending,
	} = useWriteContract();

	// Get the current mint price from the contract
	const { data: mintPrice, error: mintPriceError } = useReadContract({
		address: contractAddress,
		abi: STAR_OWNER,
		functionName: "mintPrice",
	}) as { data: bigint | undefined; error: Error | null };

	// Log for debugging
	console.log("StarOwner Contract Debug:", {
		contractAddress,
		chainId,
		mintPrice: mintPrice?.toString(),
		mintPriceError: mintPriceError?.message,
	});

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	});

	const mint = async (tokenURI: string): Promise<TransactionResult> => {
		try {
			if (chainId !== 56) {
				return {
					success: false,
					error: `Пожалуйста, переключитесь на BSC Mainnet (текущая сеть: ${chainId})`,
				};
			}

			if (!contractAddress) {
				return {
					success: false,
					error: "Contract address not found for current network",
				};
			}

			// For free NFTs, mintPrice can be 0 or undefined
			if (mintPrice === undefined && mintPriceError) {
				return {
					success: false,
					error: mintPriceError.message || "Could not fetch mint price",
				};
			}

			// Use 0 if mintPrice is undefined (for free NFTs)
			const valueToSend = mintPrice || BigInt(0);

			const txHash = await writeContractAsync({
				address: contractAddress,
				abi: STAR_OWNER,
				functionName: "mint",
				args: [tokenURI],
				value: valueToSend, // Send 0 for free NFTs
			});

			return {
				hash: txHash,
				success: true,
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Unknown error",
			};
		}
	};

	return {
		mint,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
		mintPrice, // Also return the mint price for display purposes
	};
}
