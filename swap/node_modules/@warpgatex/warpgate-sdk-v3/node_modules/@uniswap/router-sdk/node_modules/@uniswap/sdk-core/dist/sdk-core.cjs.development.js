'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var bignumber = require('@ethersproject/bignumber');
var address = require('@ethersproject/address');
var bytes = require('@ethersproject/bytes');
var keccak256 = require('@ethersproject/keccak256');
var strings = require('@ethersproject/strings');

function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
  ChainId[ChainId["GOERLI"] = 5] = "GOERLI";
  ChainId[ChainId["SEPOLIA"] = 11155111] = "SEPOLIA";
  ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
  ChainId[ChainId["OPTIMISM_GOERLI"] = 420] = "OPTIMISM_GOERLI";
  ChainId[ChainId["OPTIMISM_SEPOLIA"] = 11155420] = "OPTIMISM_SEPOLIA";
  ChainId[ChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  ChainId[ChainId["ARBITRUM_GOERLI"] = 421613] = "ARBITRUM_GOERLI";
  ChainId[ChainId["ARBITRUM_SEPOLIA"] = 421614] = "ARBITRUM_SEPOLIA";
  ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
  ChainId[ChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
  ChainId[ChainId["CELO"] = 42220] = "CELO";
  ChainId[ChainId["CELO_ALFAJORES"] = 44787] = "CELO_ALFAJORES";
  ChainId[ChainId["GNOSIS"] = 100] = "GNOSIS";
  ChainId[ChainId["MOONBEAM"] = 1284] = "MOONBEAM";
  ChainId[ChainId["BNB"] = 56] = "BNB";
  ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
  ChainId[ChainId["BASE_GOERLI"] = 84531] = "BASE_GOERLI";
  ChainId[ChainId["BASE"] = 8453] = "BASE";
  ChainId[ChainId["ZORA"] = 7777777] = "ZORA";
  ChainId[ChainId["ZORA_SEPOLIA"] = 999999999] = "ZORA_SEPOLIA";
  ChainId[ChainId["ROOTSTOCK"] = 30] = "ROOTSTOCK";
  ChainId[ChainId["BLAST"] = 81457] = "BLAST";
  ChainId[ChainId["ZKSYNC"] = 324] = "ZKSYNC";
})(exports.ChainId || (exports.ChainId = {}));
var SUPPORTED_CHAINS = [exports.ChainId.MAINNET, exports.ChainId.OPTIMISM, exports.ChainId.OPTIMISM_GOERLI, exports.ChainId.OPTIMISM_SEPOLIA, exports.ChainId.ARBITRUM_ONE, exports.ChainId.ARBITRUM_GOERLI, exports.ChainId.ARBITRUM_SEPOLIA, exports.ChainId.POLYGON, exports.ChainId.POLYGON_MUMBAI, exports.ChainId.GOERLI, exports.ChainId.SEPOLIA, exports.ChainId.CELO_ALFAJORES, exports.ChainId.CELO, exports.ChainId.BNB, exports.ChainId.AVALANCHE, exports.ChainId.BASE, exports.ChainId.BASE_GOERLI, exports.ChainId.ZORA, exports.ChainId.ZORA_SEPOLIA, exports.ChainId.ROOTSTOCK, exports.ChainId.BLAST, exports.ChainId.ZKSYNC];
(function (NativeCurrencyName) {
  // Strings match input for CLI
  NativeCurrencyName["ETHER"] = "ETH";
  NativeCurrencyName["MATIC"] = "MATIC";
  NativeCurrencyName["CELO"] = "CELO";
  NativeCurrencyName["GNOSIS"] = "XDAI";
  NativeCurrencyName["MOONBEAM"] = "GLMR";
  NativeCurrencyName["BNB"] = "BNB";
  NativeCurrencyName["AVAX"] = "AVAX";
  NativeCurrencyName["ROOTSTOCK"] = "RBTC";
})(exports.NativeCurrencyName || (exports.NativeCurrencyName = {}));

var _V2_FACTORY_ADDRESSES, _V2_ROUTER_ADDRESSES, _CHAIN_TO_ADDRESSES_M, _GOVERNANCE_ALPHA_V1_, _GOVERNANCE_BRAVO_ADD, _MERKLE_DISTRIBUTOR_A, _ARGENT_WALLET_DETECT, _SOCKS_CONTROLLER_ADD;
var DEFAULT_NETWORKS = [exports.ChainId.MAINNET, exports.ChainId.GOERLI, exports.ChainId.SEPOLIA];
function constructSameAddressMap(address, additionalNetworks) {
  if (additionalNetworks === void 0) {
    additionalNetworks = [];
  }
  return DEFAULT_NETWORKS.concat(additionalNetworks).reduce(function (memo, chainId) {
    memo[chainId] = address;
    return memo;
  }, {});
}
var UNI_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', [exports.ChainId.OPTIMISM, exports.ChainId.ARBITRUM_ONE, exports.ChainId.POLYGON, exports.ChainId.POLYGON_MUMBAI, exports.ChainId.SEPOLIA]);
var UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = '0x8B799381ac40b838BBA4131ffB26197C432AFe78';
/**
 * @deprecated use V2_FACTORY_ADDRESSES instead
 */
var V2_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
var V2_FACTORY_ADDRESSES = (_V2_FACTORY_ADDRESSES = {}, _V2_FACTORY_ADDRESSES[exports.ChainId.MAINNET] = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', _V2_FACTORY_ADDRESSES[exports.ChainId.GOERLI] = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', _V2_FACTORY_ADDRESSES[exports.ChainId.SEPOLIA] = '0xB7f907f7A9eBC822a80BD25E224be42Ce0A698A0', _V2_FACTORY_ADDRESSES[exports.ChainId.OPTIMISM] = '0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf', _V2_FACTORY_ADDRESSES[exports.ChainId.ARBITRUM_ONE] = '0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9', _V2_FACTORY_ADDRESSES[exports.ChainId.AVALANCHE] = '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C', _V2_FACTORY_ADDRESSES[exports.ChainId.BASE] = '0x8909dc15e40173ff4699343b6eb8132c65e18ec6', _V2_FACTORY_ADDRESSES[exports.ChainId.BNB] = '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6', _V2_FACTORY_ADDRESSES[exports.ChainId.POLYGON] = '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C', _V2_FACTORY_ADDRESSES[exports.ChainId.CELO] = '0x79a530c8e2fA8748B7B40dd3629C0520c2cCf03f', _V2_FACTORY_ADDRESSES[exports.ChainId.BLAST] = '0x5C346464d33F90bABaf70dB6388507CC889C1070', _V2_FACTORY_ADDRESSES);
/**
 * @deprecated use V2_ROUTER_ADDRESSES instead
 */
var V2_ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
var V2_ROUTER_ADDRESSES = (_V2_ROUTER_ADDRESSES = {}, _V2_ROUTER_ADDRESSES[exports.ChainId.MAINNET] = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', _V2_ROUTER_ADDRESSES[exports.ChainId.GOERLI] = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', _V2_ROUTER_ADDRESSES[exports.ChainId.ARBITRUM_ONE] = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24', _V2_ROUTER_ADDRESSES[exports.ChainId.OPTIMISM] = '0x4a7b5da61326a6379179b40d00f57e5bbdc962c2', _V2_ROUTER_ADDRESSES[exports.ChainId.BASE] = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24', _V2_ROUTER_ADDRESSES[exports.ChainId.AVALANCHE] = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24', _V2_ROUTER_ADDRESSES[exports.ChainId.BNB] = '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24', _V2_ROUTER_ADDRESSES[exports.ChainId.POLYGON] = '0xedf6066a2b290c185783862c7f4776a2c8077ad1', _V2_ROUTER_ADDRESSES[exports.ChainId.BLAST] = '0xBB66Eb1c5e875933D44DAe661dbD80e5D9B03035', _V2_ROUTER_ADDRESSES);
// Networks that share most of the same addresses i.e. Mainnet, Goerli, Optimism, Arbitrum, Polygon
var DEFAULT_ADDRESSES = {
  v3CoreFactoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  multicallAddress: '0x1F98415757620B543A52E61c46B32eB19261F984',
  quoterAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
  v3MigratorAddress: '0xA5644E29708357803b5A882D272c41cC0dF92B34',
  nonfungiblePositionManagerAddress: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
};
var MAINNET_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  mixedRouteQuoterV1Address: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E'
});
var GOERLI_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  mixedRouteQuoterV1Address: '0xBa60b6e6fF25488308789E6e0A65D838be34194e'
});
var OPTIMISM_ADDRESSES = DEFAULT_ADDRESSES;
var ARBITRUM_ONE_ADDRESSES = /*#__PURE__*/_extends({}, DEFAULT_ADDRESSES, {
  multicallAddress: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  tickLensAddress: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573'
});
var POLYGON_ADDRESSES = DEFAULT_ADDRESSES;
// celo v3 addresses
var CELO_ADDRESSES = {
  v3CoreFactoryAddress: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
  multicallAddress: '0x633987602DE5C4F337e3DbF265303A1080324204',
  quoterAddress: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
  v3MigratorAddress: '0x3cFd4d48EDfDCC53D3f173F596f621064614C582',
  nonfungiblePositionManagerAddress: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
  tickLensAddress: '0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D'
};
// BNB v3 addresses
var BNB_ADDRESSES = {
  v3CoreFactoryAddress: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
  multicallAddress: '0x963Df249eD09c358A4819E39d9Cd5736c3087184',
  quoterAddress: '0x78D78E420Da98ad378D7799bE8f4AF69033EB077',
  v3MigratorAddress: '0x32681814957e0C13117ddc0c2aba232b5c9e760f',
  nonfungiblePositionManagerAddress: '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613',
  tickLensAddress: '0xD9270014D396281579760619CCf4c3af0501A47C',
  swapRouter02Address: '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2'
};
// optimism goerli addresses
var OPTIMISM_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0xB656dA17129e7EB733A557f4EBc57B76CFbB5d10',
  multicallAddress: '0x07F2D8a2a02251B62af965f22fC4744A5f96BCCd',
  quoterAddress: '0x9569CbA925c8ca2248772A9A4976A516743A246F',
  v3MigratorAddress: '0xf6c55fBe84B1C8c3283533c53F51bC32F5C7Aba8',
  nonfungiblePositionManagerAddress: '0x39Ca85Af2F383190cBf7d7c41ED9202D27426EF6',
  tickLensAddress: '0xe6140Bd164b63E8BfCfc40D5dF952f83e171758e'
};
// optimism sepolia addresses
var OPTIMISM_SEPOLIA_ADDRESSES = {
  v3CoreFactoryAddress: '0x8CE191193D15ea94e11d327b4c7ad8bbE520f6aF',
  multicallAddress: '0x80e4e06841bb76AA9735E0448cB8d003C0EF009a',
  quoterAddress: '0x0FBEa6cf957d95ee9313490050F6A0DA68039404',
  v3MigratorAddress: '0xE7EcbAAaA54D007A00dbb6c1d2f150066D69dA07',
  nonfungiblePositionManagerAddress: '0xdA75cEf1C93078e8b736FCA5D5a30adb97C8957d',
  tickLensAddress: '0xCb7f54747F58F8944973cea5b8f4ac2209BadDC5',
  swapRouter02Address: '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4'
};
// arbitrum goerli v3 addresses
var ARBITRUM_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6',
  multicallAddress: '0x8260CB40247290317a4c062F3542622367F206Ee',
  quoterAddress: '0x1dd92b83591781D0C6d98d07391eea4b9a6008FA',
  v3MigratorAddress: '0xA815919D2584Ac3F76ea9CB62E6Fd40a43BCe0C3',
  nonfungiblePositionManagerAddress: '0x622e4726a167799826d1E1D150b076A7725f5D81',
  tickLensAddress: '0xb52429333da969a0C79a60930a4Bf0020E5D1DE8'
};
// arbitrum sepolia v3 addresses
var ARBITRUM_SEPOLIA_ADDRESSES = {
  v3CoreFactoryAddress: '0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e',
  multicallAddress: '0x2B718b475e385eD29F56775a66aAB1F5cC6B2A0A',
  quoterAddress: '0x2779a0CC1c3e0E44D2542EC3e79e3864Ae93Ef0B',
  v3MigratorAddress: '0x398f43ef2c67B941147157DA1c5a868E906E043D',
  nonfungiblePositionManagerAddress: '0x6b2937Bde17889EDCf8fbD8dE31C3C2a70Bc4d65',
  tickLensAddress: '0x0fd18587734e5C2dcE2dccDcC7DD1EC89ba557d9',
  swapRouter02Address: '0x101F443B4d1b059569D643917553c771E1b9663E'
};
// sepolia v3 addresses
var SEPOLIA_ADDRESSES = {
  v3CoreFactoryAddress: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
  multicallAddress: '0xD7F33bCdb21b359c8ee6F0251d30E94832baAd07',
  quoterAddress: '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
  v3MigratorAddress: '0x729004182cF005CEC8Bd85df140094b6aCbe8b15',
  nonfungiblePositionManagerAddress: '0x1238536071E1c677A632429e3655c799b22cDA52',
  tickLensAddress: '0xd7f33bcdb21b359c8ee6f0251d30e94832baad07',
  swapRouter02Address: '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E'
};
// Avalanche v3 addresses
var AVALANCHE_ADDRESSES = {
  v3CoreFactoryAddress: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
  multicallAddress: '0x0139141Cd4Ee88dF3Cdb65881D411bAE271Ef0C2',
  quoterAddress: '0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F',
  v3MigratorAddress: '0x44f5f1f5E452ea8d29C890E8F6e893fC0f1f0f97',
  nonfungiblePositionManagerAddress: '0x655C406EBFa14EE2006250925e54ec43AD184f8B',
  tickLensAddress: '0xEB9fFC8bf81b4fFd11fb6A63a6B0f098c6e21950',
  swapRouter02Address: '0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE'
};
var BASE_ADDRESSES = {
  v3CoreFactoryAddress: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  multicallAddress: '0x091e99cb1C49331a94dD62755D168E941AbD0693',
  quoterAddress: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  v3MigratorAddress: '0x23cF10b1ee3AdfCA73B0eF17C07F7577e7ACd2d7',
  nonfungiblePositionManagerAddress: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
  tickLensAddress: '0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d',
  swapRouter02Address: '0x2626664c2603336E57B271c5C0b26F421741e481',
  mixedRouteQuoterV1Address: '0xe544efae946f0008ae9a8d64493efa7886b73776'
};
// Base Goerli v3 addresses
var BASE_GOERLI_ADDRESSES = {
  v3CoreFactoryAddress: '0x9323c1d6D800ed51Bd7C6B216cfBec678B7d0BC2',
  multicallAddress: '0xB206027a9E0E13F05eBEFa5D2402Bab3eA716439',
  quoterAddress: '0xedf539058e28E5937dAef3f69cEd0b25fbE66Ae9',
  v3MigratorAddress: '0x3efe5d02a04b7351D671Db7008ec6eBA9AD9e3aE',
  nonfungiblePositionManagerAddress: '0x3c61369ef0D1D2AFa70d8feC2F31C5D6Ce134F30',
  tickLensAddress: '0x1acB873Ee909D0c98adB18e4474943249F931b92',
  swapRouter02Address: '0x8357227D4eDc78991Db6FDB9bD6ADE250536dE1d'
};
var ZORA_ADDRESSES = {
  v3CoreFactoryAddress: '0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb',
  multicallAddress: '0xA51c76bEE6746cB487a7e9312E43e2b8f4A37C15',
  quoterAddress: '0x11867e1b3348F3ce4FcC170BC5af3d23E07E64Df',
  v3MigratorAddress: '0x048352d8dCF13686982C799da63fA6426a9D0b60',
  nonfungiblePositionManagerAddress: '0xbC91e8DfA3fF18De43853372A3d7dfe585137D78',
  tickLensAddress: '0x209AAda09D74Ad3B8D0E92910Eaf85D2357e3044',
  swapRouter02Address: '0x7De04c96BE5159c3b5CeffC82aa176dc81281557'
};
var ZORA_SEPOLIA_ADDRESSES = {
  v3CoreFactoryAddress: '0x4324A677D74764f46f33ED447964252441aA8Db6',
  multicallAddress: '0xA1E7e3A69671C4494EC59Dbd442de930a93F911A',
  quoterAddress: '0xC195976fEF0985886E37036E2DF62bF371E12Df0',
  v3MigratorAddress: '0x65ef259b31bf1d977c37e9434658694267674897',
  nonfungiblePositionManagerAddress: '0xB8458EaAe43292e3c1F7994EFd016bd653d23c20',
  tickLensAddress: '0x23C0F71877a1Fc4e20A78018f9831365c85f3064'
};
var ROOTSTOCK_ADDRESSES = {
  v3CoreFactoryAddress: '0xaF37EC98A00FD63689CF3060BF3B6784E00caD82',
  multicallAddress: '0x996a9858cDfa45Ad68E47c9A30a7201E29c6a386',
  quoterAddress: '0xb51727c996C68E60F598A923a5006853cd2fEB31',
  v3MigratorAddress: '0x16678977CA4ec3DAD5efc7b15780295FE5f56162',
  nonfungiblePositionManagerAddress: '0x9d9386c042F194B460Ec424a1e57ACDE25f5C4b1',
  tickLensAddress: '0x55B9dF5bF68ADe972191a91980459f48ecA16afC',
  swapRouter02Address: '0x0B14ff67f0014046b4b99057Aec4509640b3947A'
};
var BLAST_ADDRESSES = {
  v3CoreFactoryAddress: '0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd',
  multicallAddress: '0xdC7f370de7631cE9e2c2e1DCDA6B3B5744Cf4705',
  quoterAddress: '0x6Cdcd65e03c1CEc3730AeeCd45bc140D57A25C77',
  v3MigratorAddress: '0x15CA7043CD84C5D21Ae76Ba0A1A967d42c40ecE0',
  nonfungiblePositionManagerAddress: '0xB218e4f7cF0533d4696fDfC419A0023D33345F28',
  tickLensAddress: '0x2E95185bCdD928a3e984B7e2D6560Ab1b17d7274',
  swapRouter02Address: '0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66'
};
var ZKSYNC_ADDRESSES = {
  v3CoreFactoryAddress: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
  multicallAddress: '0x0c68a7C72f074d1c45C16d41fa74eEbC6D16a65C',
  quoterAddress: '0x8Cb537fc92E26d8EBBb760E632c95484b6Ea3e28',
  v3MigratorAddress: '0x611841b24E43C4ACfd290B427a3D6cf1A59dac8E',
  nonfungiblePositionManagerAddress: '0x0616e5762c1E7Dc3723c50663dF10a162D690a86',
  tickLensAddress: '0xe10FF11b809f8EE07b056B452c3B2caa7FE24f89',
  swapRouter02Address: '0x99c56385daBCE3E81d8499d0b8d0257aBC07E8A3'
};
var CHAIN_TO_ADDRESSES_MAP = (_CHAIN_TO_ADDRESSES_M = {}, _CHAIN_TO_ADDRESSES_M[exports.ChainId.MAINNET] = MAINNET_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.OPTIMISM] = OPTIMISM_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ARBITRUM_ONE] = ARBITRUM_ONE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.POLYGON] = POLYGON_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.POLYGON_MUMBAI] = POLYGON_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.GOERLI] = GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.CELO] = CELO_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.CELO_ALFAJORES] = CELO_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BNB] = BNB_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.OPTIMISM_GOERLI] = OPTIMISM_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.OPTIMISM_SEPOLIA] = OPTIMISM_SEPOLIA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ARBITRUM_GOERLI] = ARBITRUM_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ARBITRUM_SEPOLIA] = ARBITRUM_SEPOLIA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.SEPOLIA] = SEPOLIA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.AVALANCHE] = AVALANCHE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BASE] = BASE_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BASE_GOERLI] = BASE_GOERLI_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ZORA] = ZORA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ZORA_SEPOLIA] = ZORA_SEPOLIA_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ROOTSTOCK] = ROOTSTOCK_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.BLAST] = BLAST_ADDRESSES, _CHAIN_TO_ADDRESSES_M[exports.ChainId.ZKSYNC] = ZKSYNC_ADDRESSES, _CHAIN_TO_ADDRESSES_M);
/* V3 Contract Addresses */
var V3_CORE_FACTORY_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress;
  return memo;
}, {}));
var V3_MIGRATOR_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var v3MigratorAddress = CHAIN_TO_ADDRESSES_MAP[chainId].v3MigratorAddress;
  if (v3MigratorAddress) {
    memo[chainId] = v3MigratorAddress;
  }
  return memo;
}, {}));
var MULTICALL_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress;
  return memo;
}, {}));
/**
 * The oldest V0 governance address
 */
var GOVERNANCE_ALPHA_V0_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F');
/**
 * The older V1 governance address
 */
var GOVERNANCE_ALPHA_V1_ADDRESSES = (_GOVERNANCE_ALPHA_V1_ = {}, _GOVERNANCE_ALPHA_V1_[exports.ChainId.MAINNET] = '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6', _GOVERNANCE_ALPHA_V1_);
/**
 * The latest governor bravo that is currently admin of timelock
 */
var GOVERNANCE_BRAVO_ADDRESSES = (_GOVERNANCE_BRAVO_ADD = {}, _GOVERNANCE_BRAVO_ADD[exports.ChainId.MAINNET] = '0x408ED6354d4973f66138C91495F2f2FCbd8724C3', _GOVERNANCE_BRAVO_ADD);
var TIMELOCK_ADDRESSES = /*#__PURE__*/constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC');
var MERKLE_DISTRIBUTOR_ADDRESS = (_MERKLE_DISTRIBUTOR_A = {}, _MERKLE_DISTRIBUTOR_A[exports.ChainId.MAINNET] = '0x090D4613473dEE047c3f2706764f49E0821D256e', _MERKLE_DISTRIBUTOR_A);
var ARGENT_WALLET_DETECTOR_ADDRESS = (_ARGENT_WALLET_DETECT = {}, _ARGENT_WALLET_DETECT[exports.ChainId.MAINNET] = '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8', _ARGENT_WALLET_DETECT);
var QUOTER_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress;
  return memo;
}, {}));
var NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var nonfungiblePositionManagerAddress = CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress;
  if (nonfungiblePositionManagerAddress) {
    memo[chainId] = nonfungiblePositionManagerAddress;
  }
  return memo;
}, {}));
var ENS_REGISTRAR_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/constructSameAddressMap('0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'));
var SOCKS_CONTROLLER_ADDRESSES = (_SOCKS_CONTROLLER_ADD = {}, _SOCKS_CONTROLLER_ADD[exports.ChainId.MAINNET] = '0x65770b5283117639760beA3F867b69b3697a91dd', _SOCKS_CONTROLLER_ADD);
var TICK_LENS_ADDRESSES = /*#__PURE__*/_extends({}, /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var tickLensAddress = CHAIN_TO_ADDRESSES_MAP[chainId].tickLensAddress;
  if (tickLensAddress) {
    memo[chainId] = tickLensAddress;
  }
  return memo;
}, {}));
var MIXED_ROUTE_QUOTER_V1_ADDRESSES = /*#__PURE__*/SUPPORTED_CHAINS.reduce(function (memo, chainId) {
  var mixedRouteQuoterV1Address = CHAIN_TO_ADDRESSES_MAP[chainId].mixedRouteQuoterV1Address;
  if (mixedRouteQuoterV1Address) {
    memo[chainId] = mixedRouteQuoterV1Address;
  }
  return memo;
}, {});
var SWAP_ROUTER_02_ADDRESSES = function SWAP_ROUTER_02_ADDRESSES(chainId) {
  if (SUPPORTED_CHAINS.includes(chainId)) {
    var _CHAIN_TO_ADDRESSES_M2;
    var id = chainId;
    return (_CHAIN_TO_ADDRESSES_M2 = CHAIN_TO_ADDRESSES_MAP[id].swapRouter02Address) != null ? _CHAIN_TO_ADDRESSES_M2 : '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
  }
  return '';
};

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));
(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));
var MaxUint256 = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = JSBI.BigInt(1);
    }
    this.numerator = JSBI.BigInt(numerator);
    this.denominator = JSBI.BigInt(denominator);
  }
  Fraction.tryParseFraction = function tryParseFraction(fractionish) {
    if (fractionish instanceof JSBI || typeof fractionish === 'number' || typeof fractionish === 'string') return new Fraction(fractionish);
    if ('numerator' in fractionish && 'denominator' in fractionish) return fractionish;
    throw new Error('Could not parse fraction');
  }
  // performs floor division
  ;
  var _proto = Fraction.prototype;
  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };
  _proto.add = function add(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.subtract = function subtract(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.lessThan = function lessThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.equalTo = function equalTo(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.multiply = function multiply(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.divide = function divide(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  }
  /**
   * Helper method for converting any super class back to a fraction
   */;
  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    }
    // remainder after floor division
  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }, {
    key: "asFraction",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }]);
  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);
  function CurrencyAmount(currency, numerator, denominator) {
    var _this;
    _this = _Fraction.call(this, numerator, denominator) || this;
    !JSBI.lessThanOrEqual(_this.quotient, MaxUint256) ?  invariant(false, 'AMOUNT')  : void 0;
    _this.currency = currency;
    _this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(currency.decimals));
    return _this;
  }
  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  CurrencyAmount.fromRawAmount = function fromRawAmount(currency, rawAmount) {
    return new CurrencyAmount(currency, rawAmount);
  }
  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */;
  CurrencyAmount.fromFractionalAmount = function fromFractionalAmount(currency, numerator, denominator) {
    return new CurrencyAmount(currency, numerator, denominator);
  };
  var _proto = CurrencyAmount.prototype;
  _proto.add = function add(other) {
    !this.currency.equals(other.currency) ?  invariant(false, 'CURRENCY')  : void 0;
    var added = _Fraction.prototype.add.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, added.numerator, added.denominator);
  };
  _proto.subtract = function subtract(other) {
    !this.currency.equals(other.currency) ?  invariant(false, 'CURRENCY')  : void 0;
    var subtracted = _Fraction.prototype.subtract.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, subtracted.numerator, subtracted.denominator);
  };
  _proto.multiply = function multiply(other) {
    var multiplied = _Fraction.prototype.multiply.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, multiplied.numerator, multiplied.denominator);
  };
  _proto.divide = function divide(other) {
    var divided = _Fraction.prototype.divide.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, divided.numerator, divided.denominator);
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    return _Fraction.prototype.divide.call(this, this.decimalScale).toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.divide.call(this, this.decimalScale).toFixed(decimalPlaces, format, rounding);
  };
  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }
    Big$1.DP = this.currency.decimals;
    return new Big$1(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
  };
  _createClass(CurrencyAmount, [{
    key: "wrapped",
    get: function get() {
      if (this.currency.isToken) return this;
      return CurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator, this.denominator);
    }
  }]);
  return CurrencyAmount;
}(Fraction);

var ONE_HUNDRED = /*#__PURE__*/new Fraction( /*#__PURE__*/JSBI.BigInt(100));
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
function toPercent(fraction) {
  return new Percent(fraction.numerator, fraction.denominator);
}
var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);
  function Percent() {
    var _this;
    _this = _Fraction.apply(this, arguments) || this;
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */
    _this.isPercent = true;
    return _this;
  }
  var _proto = Percent.prototype;
  _proto.add = function add(other) {
    return toPercent(_Fraction.prototype.add.call(this, other));
  };
  _proto.subtract = function subtract(other) {
    return toPercent(_Fraction.prototype.subtract.call(this, other));
  };
  _proto.multiply = function multiply(other) {
    return toPercent(_Fraction.prototype.multiply.call(this, other));
  };
  _proto.divide = function divide(other) {
    return toPercent(_Fraction.prototype.divide.call(this, other));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }
    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }
    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toFixed(decimalPlaces, format, rounding);
  };
  return Percent;
}(Fraction);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);
  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  function Price() {
    var _this;
    var baseCurrency, quoteCurrency, denominator, numerator;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 4) {
      baseCurrency = args[0];
      quoteCurrency = args[1];
      denominator = args[2];
      numerator = args[3];
    } else {
      var result = args[0].quoteAmount.divide(args[0].baseAmount);
      var _ref = [args[0].baseAmount.currency, args[0].quoteAmount.currency, result.denominator, result.numerator];
      baseCurrency = _ref[0];
      quoteCurrency = _ref[1];
      denominator = _ref[2];
      numerator = _ref[3];
    }
    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }
  /**
   * Flip the price, switching the base and quote currency
   */
  var _proto = Price.prototype;
  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  }
  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */;
  _proto.multiply = function multiply(other) {
    !this.quoteCurrency.equals(other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;
    var fraction = _Fraction.prototype.multiply.call(this, other);
    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */;
  _proto.quote = function quote(currencyAmount) {
    !currencyAmount.currency.equals(this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;
    var result = _Fraction.prototype.multiply.call(this, currencyAmount);
    return CurrencyAmount.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator);
  }
  /**
   * Get the value scaled by decimals for formatting
   * @private
   */;
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }
    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  };
  _createClass(Price, [{
    key: "adjustedForDecimals",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);
  return Price;
}(Fraction);

/**
 * A currency is any fungible financial instrument, including Ether, all ERC20 tokens, and other chain-native currencies
 */
var BaseCurrency =
/**
 * Constructs an instance of the base class `BaseCurrency`.
 * @param chainId the chain ID on which this currency resides
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function BaseCurrency(chainId, decimals, symbol, name) {
  !Number.isSafeInteger(chainId) ?  invariant(false, 'CHAIN_ID')  : void 0;
  !(decimals >= 0 && decimals < 255 && Number.isInteger(decimals)) ?  invariant(false, 'DECIMALS')  : void 0;
  this.chainId = chainId;
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};

/**
 * Represents the native currency of the chain on which it resides, e.g.
 */
var NativeCurrency = /*#__PURE__*/function (_BaseCurrency) {
  _inheritsLoose(NativeCurrency, _BaseCurrency);
  function NativeCurrency() {
    var _this;
    _this = _BaseCurrency.apply(this, arguments) || this;
    _this.isNative = true;
    _this.isToken = false;
    return _this;
  }
  return NativeCurrency;
}(BaseCurrency);

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
function validateAndParseAddress(address$1) {
  try {
    return address.getAddress(address$1);
  } catch (error) {
    throw new Error(address$1 + " is not a valid address.");
  }
}
// Checks a string starts with 0x, is 42 characters long and contains only hex characters after 0x
var startsWith0xLen42HexRegex = /^0x[0-9a-fA-F]{40}$/;
/**
 * Checks if an address is valid by checking 0x prefix, length === 42 and hex encoding.
 * @param address the unchecksummed hex address
 */
function checkValidAddress(address) {
  if (startsWith0xLen42HexRegex.test(address)) {
    return address;
  }
  throw new Error(address + " is not a valid address.");
}

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
var Token = /*#__PURE__*/function (_BaseCurrency) {
  _inheritsLoose(Token, _BaseCurrency);
  /**
   *
   * @param chainId {@link BaseCurrency#chainId}
   * @param address The contract address on the chain on which this token lives
   * @param decimals {@link BaseCurrency#decimals}
   * @param symbol {@link BaseCurrency#symbol}
   * @param name {@link BaseCurrency#name}
   * @param bypassChecksum If true it only checks for length === 42, startsWith 0x and contains only hex characters
   * @param buyFeeBps Buy fee tax for FOT tokens, in basis points
   * @param sellFeeBps Sell fee tax for FOT tokens, in basis points
   */
  function Token(chainId, address, decimals, symbol, name, bypassChecksum, buyFeeBps, sellFeeBps) {
    var _this;
    _this = _BaseCurrency.call(this, chainId, decimals, symbol, name) || this;
    _this.isNative = false;
    _this.isToken = true;
    if (bypassChecksum) {
      _this.address = checkValidAddress(address);
    } else {
      _this.address = validateAndParseAddress(address);
    }
    if (buyFeeBps) {
      !buyFeeBps.gte(bignumber.BigNumber.from(0)) ?  invariant(false, 'NON-NEGATIVE FOT FEES')  : void 0;
    }
    if (sellFeeBps) {
      !sellFeeBps.gte(bignumber.BigNumber.from(0)) ?  invariant(false, 'NON-NEGATIVE FOT FEES')  : void 0;
    }
    _this.buyFeeBps = buyFeeBps;
    _this.sellFeeBps = sellFeeBps;
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  var _proto = Token.prototype;
  _proto.equals = function equals(other) {
    return other.isToken && this.chainId === other.chainId && this.address.toLowerCase() === other.address.toLowerCase();
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */;
  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address.toLowerCase() !== other.address.toLowerCase()) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
  /**
   * Return this token, which does not need to be wrapped
   */;
  _createClass(Token, [{
    key: "wrapped",
    get: function get() {
      return this;
    }
  }]);
  return Token;
}(BaseCurrency);

/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
var WETH9 = {
  1: /*#__PURE__*/new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  3: /*#__PURE__*/new Token(3, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'),
  4: /*#__PURE__*/new Token(4, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'),
  5: /*#__PURE__*/new Token(5, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
  42: /*#__PURE__*/new Token(42, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'),
  10: /*#__PURE__*/new Token(10, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  69: /*#__PURE__*/new Token(69, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  11155420: /*#__PURE__*/new Token(11155420, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  42161: /*#__PURE__*/new Token(42161, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
  421611: /*#__PURE__*/new Token(421611, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether'),
  421614: /*#__PURE__*/new Token(421614, '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73', 18, 'WETH', 'Wrapped Ether'),
  8453: /*#__PURE__*/new Token(8453, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  56: /*#__PURE__*/new Token(56, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
  137: /*#__PURE__*/new Token(137, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC'),
  43114: /*#__PURE__*/new Token(43114, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
  324: /*#__PURE__*/new Token(324, '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91', 18, 'WETH', 'Wrapped Ether')
};

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
var Ether = /*#__PURE__*/function (_NativeCurrency) {
  _inheritsLoose(Ether, _NativeCurrency);
  function Ether(chainId) {
    return _NativeCurrency.call(this, chainId, 18, 'ETH', 'Ether') || this;
  }
  Ether.onChain = function onChain(chainId) {
    var _this$_etherCache$cha;
    return (_this$_etherCache$cha = this._etherCache[chainId]) != null ? _this$_etherCache$cha : this._etherCache[chainId] = new Ether(chainId);
  };
  var _proto = Ether.prototype;
  _proto.equals = function equals(other) {
    return other.isNative && other.chainId === this.chainId;
  };
  _createClass(Ether, [{
    key: "wrapped",
    get: function get() {
      var weth9 = WETH9[this.chainId];
      !!!weth9 ?  invariant(false, 'WRAPPED')  : void 0;
      return weth9;
    }
  }]);
  return Ether;
}(NativeCurrency);
Ether._etherCache = {};

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */
function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var quotedOutputAmount = midPrice.quote(inputAmount);
  // calculate price impact := (exactQuote - outputAmount) / exactQuote
  var priceImpact = quotedOutputAmount.subtract(outputAmount).divide(quotedOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}

function computeZksyncCreate2Address(sender, bytecodeHash, salt, input) {
  if (input === void 0) {
    input = '0x';
  }
  var prefix = keccak256.keccak256(strings.toUtf8Bytes('zksyncCreate2'));
  var inputHash = keccak256.keccak256(input);
  var addressBytes = keccak256.keccak256(bytes.concat([prefix, bytes.hexZeroPad(sender, 32), salt, bytecodeHash, inputHash])).slice(26);
  return address.getAddress(addressBytes);
}

// given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item
function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0;
  // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize
  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0;
  // short circuit first item add
  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize;
    // short circuit if full and the additional item does not come before the last item
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }
    var lo = 0,
      hi = items.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

var MAX_SAFE_INTEGER = /*#__PURE__*/JSBI.BigInt(Number.MAX_SAFE_INTEGER);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */
function sqrt(value) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, 'NEGATIVE')  : void 0;
  // rely on built in sqrt if possible
  if (JSBI.lessThan(value, MAX_SAFE_INTEGER)) {
    return JSBI.BigInt(Math.floor(Math.sqrt(JSBI.toNumber(value))));
  }
  var z;
  var x;
  z = value;
  x = JSBI.add(JSBI.divide(value, TWO), ONE);
  while (JSBI.lessThan(x, z)) {
    z = x;
    x = JSBI.divide(JSBI.add(JSBI.divide(value, x), x), TWO);
  }
  return z;
}

exports.ARGENT_WALLET_DETECTOR_ADDRESS = ARGENT_WALLET_DETECTOR_ADDRESS;
exports.CHAIN_TO_ADDRESSES_MAP = CHAIN_TO_ADDRESSES_MAP;
exports.CurrencyAmount = CurrencyAmount;
exports.ENS_REGISTRAR_ADDRESSES = ENS_REGISTRAR_ADDRESSES;
exports.Ether = Ether;
exports.Fraction = Fraction;
exports.GOVERNANCE_ALPHA_V0_ADDRESSES = GOVERNANCE_ALPHA_V0_ADDRESSES;
exports.GOVERNANCE_ALPHA_V1_ADDRESSES = GOVERNANCE_ALPHA_V1_ADDRESSES;
exports.GOVERNANCE_BRAVO_ADDRESSES = GOVERNANCE_BRAVO_ADDRESSES;
exports.MERKLE_DISTRIBUTOR_ADDRESS = MERKLE_DISTRIBUTOR_ADDRESS;
exports.MIXED_ROUTE_QUOTER_V1_ADDRESSES = MIXED_ROUTE_QUOTER_V1_ADDRESSES;
exports.MULTICALL_ADDRESSES = MULTICALL_ADDRESSES;
exports.MaxUint256 = MaxUint256;
exports.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = NONFUNGIBLE_POSITION_MANAGER_ADDRESSES;
exports.NativeCurrency = NativeCurrency;
exports.Percent = Percent;
exports.Price = Price;
exports.QUOTER_ADDRESSES = QUOTER_ADDRESSES;
exports.SOCKS_CONTROLLER_ADDRESSES = SOCKS_CONTROLLER_ADDRESSES;
exports.SUPPORTED_CHAINS = SUPPORTED_CHAINS;
exports.SWAP_ROUTER_02_ADDRESSES = SWAP_ROUTER_02_ADDRESSES;
exports.TICK_LENS_ADDRESSES = TICK_LENS_ADDRESSES;
exports.TIMELOCK_ADDRESSES = TIMELOCK_ADDRESSES;
exports.Token = Token;
exports.UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS;
exports.UNI_ADDRESSES = UNI_ADDRESSES;
exports.V2_FACTORY_ADDRESS = V2_FACTORY_ADDRESS;
exports.V2_FACTORY_ADDRESSES = V2_FACTORY_ADDRESSES;
exports.V2_ROUTER_ADDRESS = V2_ROUTER_ADDRESS;
exports.V2_ROUTER_ADDRESSES = V2_ROUTER_ADDRESSES;
exports.V3_CORE_FACTORY_ADDRESSES = V3_CORE_FACTORY_ADDRESSES;
exports.V3_MIGRATOR_ADDRESSES = V3_MIGRATOR_ADDRESSES;
exports.WETH9 = WETH9;
exports.computePriceImpact = computePriceImpact;
exports.computeZksyncCreate2Address = computeZksyncCreate2Address;
exports.sortedInsert = sortedInsert;
exports.sqrt = sqrt;
exports.validateAndParseAddress = validateAndParseAddress;
//# sourceMappingURL=sdk-core.cjs.development.js.map
