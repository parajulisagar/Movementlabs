import { ConsiderationItem, SeaportData } from '../../src/entities/protocols/seaport';
import { BigNumber } from 'ethers';
export declare const seaportV1_5DataETH: SeaportData;
export declare function calculateSeaportValue(considerations: ConsiderationItem[], token: string): BigNumber;
