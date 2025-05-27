import {
	useChainId,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { STAR_KEEPER, STAR_KEEPER_FACTORY, STAR_OWNER } from "./abis";
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
	const { writeContract, data: hash, error, isPending } = useWriteContract();

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

			writeContract({
				address: contractAddress,
				abi: STAR_KEEPER,
				functionName: "mint",
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
		mint,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
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

// Token Contract Hooks

// Hook to read token balance
export function useTokenBalance(
	address: `0x${string}`,
): ContractResult<bigint> {
	const contractAddress = useContractAddress("paymentToken");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_OWNER,
		functionName: "balanceOf",
		args: [address],
	});

	return {
		data: data as bigint,
		error: error?.message,
		isLoading,
	};
}

// Hook to read token total supply
export function useTokenTotalSupply(): ContractResult<bigint> {
	const contractAddress = useContractAddress("paymentToken");

	const { data, error, isLoading } = useReadContract({
		address: contractAddress,
		abi: STAR_OWNER,
		functionName: "totalSupply",
	});

	return {
		data: data as bigint,
		error: error?.message,
		isLoading,
	};
}

// Factory Contract Hooks (if needed)

// Hook to create new collection via factory
export function useCreateCollection() {
	const contractAddress = useContractAddress("factory");
	const { writeContract, data: hash, error, isPending } = useWriteContract();

	const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
		hash,
	});

	const createCollection = async (
		name: string,
		symbol: string,
		maxSupply: bigint,
		mintPrice: bigint,
		tokenMintPrice: bigint,
		paymentToken: `0x${string}`,
		baseTokenURI: string,
		collectionImageURI: string,
	): Promise<TransactionResult> => {
		try {
			if (!contractAddress) {
				return {
					success: false,
					error: "Factory contract address not found for current network",
				};
			}

			writeContract({
				address: contractAddress,
				abi: STAR_KEEPER_FACTORY,
				functionName: "createCollection",
				args: [
					name,
					symbol,
					maxSupply,
					mintPrice,
					tokenMintPrice,
					paymentToken,
					baseTokenURI,
					collectionImageURI,
				],
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
		createCollection,
		isLoading: isPending || isConfirming,
		isSuccess,
		error: error?.message,
	};
}
