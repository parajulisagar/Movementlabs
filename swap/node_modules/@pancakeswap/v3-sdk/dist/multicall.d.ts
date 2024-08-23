export declare abstract class Multicall {
    static ABI: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "data";
            readonly type: "bytes[]";
        }];
        readonly name: "multicall";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "results";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeMulticall(calldatas: `0x${string}` | `0x${string}`[]): `0x${string}`;
}
//# sourceMappingURL=multicall.d.ts.map