import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import { BigNumberish } from '@ethersproject/bignumber';
export interface PermitDetails {
    token: string;
    amount: BigNumberish;
    expiration: BigNumberish;
    nonce: BigNumberish;
}
export interface PermitSingle {
    details: PermitDetails;
    spender: string;
    sigDeadline: BigNumberish;
}
export interface PermitBatch {
    details: PermitDetails[];
    spender: string;
    sigDeadline: BigNumberish;
}
export declare type PermitSingleData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: PermitSingle;
};
export declare type PermitBatchData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: PermitBatch;
};
export declare abstract class AllowanceTransfer {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getPermitData(permit: PermitSingle | PermitBatch, permit2Address: string, chainId: number): PermitSingleData | PermitBatchData;
    static hash(permit: PermitSingle | PermitBatch, permit2Address: string, chainId: number): string;
}
