"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticGasPriceProvider = void 0;
class StaticGasPriceProvider {
    constructor(gasPriceWei) {
        this.gasPriceWei = gasPriceWei;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getGasPrice(_latestBlockNumber, _requestBlockNumber) {
        return { gasPriceWei: this.gasPriceWei };
    }
}
exports.StaticGasPriceProvider = StaticGasPriceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWdhcy1wcmljZS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvc3RhdGljLWdhcy1wcmljZS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxNQUFhLHNCQUFzQjtJQUNqQyxZQUFvQixXQUFzQjtRQUF0QixnQkFBVyxHQUFYLFdBQVcsQ0FBVztJQUFHLENBQUM7SUFDOUMsNkRBQTZEO0lBQzdELEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQTBCLEVBQUUsbUJBQTRCO1FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQU5ELHdEQU1DIn0=