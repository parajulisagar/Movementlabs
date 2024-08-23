import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
export declare function permit2Domain(permit2Address: string, chainId: number): TypedDataDomain;
export declare type PermitData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: any;
};
