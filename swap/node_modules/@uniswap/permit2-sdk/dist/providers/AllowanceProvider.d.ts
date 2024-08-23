import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
export interface AllowanceData {
    amount: BigNumber;
    nonce: number;
    expiration: number;
}
export declare class AllowanceProvider {
    private provider;
    private permit2Address;
    private permit2;
    constructor(provider: Provider, permit2Address: string);
    getAllowanceData(token: string, owner: string, spender: string): Promise<AllowanceData>;
    getAllowance(token: string, owner: string, spender: string): Promise<BigNumber>;
    getNonce(token: string, owner: string, spender: string): Promise<number>;
    getExpiration(token: string, owner: string, spender: string): Promise<number>;
}
