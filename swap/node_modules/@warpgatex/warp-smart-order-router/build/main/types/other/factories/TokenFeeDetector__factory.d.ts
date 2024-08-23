import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import type { TokenFeeDetector, TokenFeeDetectorInterface } from "../TokenFeeDetector";
export declare class TokenFeeDetector__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): TokenFeeDetectorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TokenFeeDetector;
}
