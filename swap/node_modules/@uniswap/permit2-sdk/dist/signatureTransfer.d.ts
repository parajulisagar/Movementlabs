import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { BigNumberish } from '@ethersproject/bignumber';
export interface Witness {
    witness: any;
    witnessTypeName: string;
    witnessType: Record<string, TypedDataField[]>;
}
export interface TokenPermissions {
    token: string;
    amount: BigNumberish;
}
export interface PermitTransferFrom {
    permitted: TokenPermissions;
    spender: string;
    nonce: BigNumberish;
    deadline: BigNumberish;
}
export interface PermitBatchTransferFrom {
    permitted: TokenPermissions[];
    spender: string;
    nonce: BigNumberish;
    deadline: BigNumberish;
}
export declare type PermitTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: PermitTransferFrom;
};
export declare type PermitBatchTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: PermitBatchTransferFrom;
};
export declare abstract class SignatureTransfer {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getPermitData(permit: PermitTransferFrom | PermitBatchTransferFrom, permit2Address: string, chainId: number, witness?: Witness): PermitTransferFromData | PermitBatchTransferFromData;
    static hash(permit: PermitTransferFrom | PermitBatchTransferFrom, permit2Address: string, chainId: number, witness?: Witness): string;
}
