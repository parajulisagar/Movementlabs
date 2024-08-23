import { PermitSingle } from '@uniswap/permit2-sdk';
import { RoutePlanner } from './routerCommands';
export interface Permit2Permit extends PermitSingle {
    signature: string;
}
export declare type ApproveProtocol = {
    token: string;
    protocol: string;
};
export declare type Permit2TransferFrom = {
    token: string;
    amount: string;
    recipient?: string;
};
export declare type InputTokenOptions = {
    approval?: ApproveProtocol;
    permit2Permit?: Permit2Permit;
    permit2TransferFrom?: Permit2TransferFrom;
};
export declare function encodePermit(planner: RoutePlanner, permit2: Permit2Permit): void;
export declare function encodeInputTokenOptions(planner: RoutePlanner, options: InputTokenOptions): void;
