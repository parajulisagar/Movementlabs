"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyGasPriceProvider = void 0;
const gas_price_provider_1 = require("./gas-price-provider");
class LegacyGasPriceProvider extends gas_price_provider_1.IGasPriceProvider {
    constructor(provider) {
        super();
        this.provider = provider;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getGasPrice(_latestBlockNumber, _requestBlockNumber) {
        const gasPriceWei = await this.provider.getGasPrice();
        return {
            gasPriceWei,
        };
    }
}
exports.LegacyGasPriceProvider = LegacyGasPriceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LWdhcy1wcmljZS1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvbGVnYWN5LWdhcy1wcmljZS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2REFBbUU7QUFFbkUsTUFBYSxzQkFBdUIsU0FBUSxzQ0FBaUI7SUFDM0QsWUFBc0IsUUFBeUI7UUFDN0MsS0FBSyxFQUFFLENBQUM7UUFEWSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtJQUUvQyxDQUFDO0lBRUQsNkRBQTZEO0lBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQTBCLEVBQUUsbUJBQTRCO1FBQ3hGLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxPQUFPO1lBQ0wsV0FBVztTQUNaLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFaRCx3REFZQyJ9