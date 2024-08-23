import { Wallet } from 'ethers';
import { PermitSingle } from '@uniswap/permit2-sdk';
import { Permit2Permit } from '../../src/utils/inputTokens';
export declare function generatePermitSignature(permit: PermitSingle, signer: Wallet, chainId: number, permitAddress?: string): Promise<string>;
export declare function generateEip2098PermitSignature(permit: PermitSingle, signer: Wallet, chainId: number, permitAddress?: string): Promise<string>;
export declare function toInputPermit(signature: string, permit: PermitSingle): Permit2Permit;
export declare function makePermit(token: string, amount?: string, nonce?: string, routerAddress?: string): PermitSingle;
