import type { Address } from "viem";

// Contract address type
export type ContractAddress = Address;

// Network IDs
export type NetworkId = 56; // BSC Mainnet

// Contract names
export type ContractName = "starKeeper" | "paymentToken" | "factory";

// NFT Metadata structure
export interface NFTMetadata {
	name: string;
	description: string;
	image: string;
	attributes?: Array<{
		trait_type: string;
		value: string | number;
	}>;
}

// Pet NFT specific data
export interface PetNFT {
	tokenId: bigint;
	owner: Address;
	metadata: NFTMetadata;
	likes: number;
	createdAt: bigint;
}

// Collection Info from STAR_KEEPER contract
export interface CollectionInfo {
	name: string;
	symbol: string;
	totalSupply: bigint;
	maxSupply: bigint;
	mintPrice: bigint;
	tokenMintPrice: bigint;
	paymentToken: Address;
}

// Contract interaction result types
export interface ContractResult<T = unknown> {
	data?: T;
	error?: string;
	isLoading: boolean;
}

// Transaction result
export interface TransactionResult {
	hash?: Address;
	success: boolean;
	error?: string;
}

// Mint options
export type MintType = "eth" | "token";

// Collection creation parameters
export interface CreateCollectionParams {
	name: string;
	symbol: string;
	maxSupply: bigint;
	mintPrice: bigint;
	tokenMintPrice: bigint;
	paymentToken: Address;
	baseTokenURI: string;
	collectionImageURI: string;
}
