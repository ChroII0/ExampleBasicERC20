import {
    ETHER_INPUT_NAME,
    MAX_DECIMAL_PLACES,
    MAX_INPUT_VALUE_ETHER,
    MAX_INPUT_VALUE_TOKEN,
    MIN_INPUT_VALUE_ETHER,
    MIN_INPUT_VALUE_TOKEN
} from "./constants";
import { BN, fromWei } from "./interact";


export const addFloatingPoint = (balanceString: string, decimalPlaces: number) => {
    const indexFloatingPoint: number = balanceString.length - decimalPlaces;
    return balanceString.length === 1 ? balanceString : balanceString.slice(0, indexFloatingPoint) + "." + balanceString.slice(indexFloatingPoint);
}

export const createAmount = (amountString: string, decimal: number) => {
    const k = amountString.length - amountString.indexOf(".") - 1;
    return BN(Number(amountString) * 10 ** k).mul(BN(10).pow(BN(decimal - k)));
}

// export const createAmount = (amountString: string, decimalPlaces: number) => {
//     const decimalIndex: number = amountString.indexOf(".");
//     const digitsAfterDecimal: number = amountString.length - decimalIndex - 1;
//     const multiplier: number = 10 ** digitsAfterDecimal;
//     const amountWithoutDecimal: number = Number(amountString.replace(".", ""));
//     const amountWithDecimalMoved: number = amountWithoutDecimal * multiplier;
//     const decimalAdjustment: number = decimalPlaces - digitsAfterDecimal;
//     const decimalMultiplier = BN(10).pow(BN(decimalAdjustment));
//     return BN(amountWithDecimalMoved).mul(decimalMultiplier);
// }


export const withUnit = (balance: string, unit: string | any) => {
    const result: string = (unit === "wei" ? balance : fromWei(balance, unit));
    return result;
}
export const createParsedData = (dataString: any) => {
    if (dataString.indexOf("{") === -1) {
        const err = {
            Error: dataString.replace("Error:", "")
        }
        return JSON.stringify(err);

    }
    const cleanedDataString = dataString.split(/\n/g);
    if (cleanedDataString.length === 1) return cleanedDataString[0];
    let parsedData = cleanedDataString[1];
    for (let i = 2; i < cleanedDataString.length; i++) {
        if (i === 3) continue;
        if (cleanedDataString[i].indexOf(null) !== -1) continue;
        parsedData += cleanedDataString[i];
    }
    return parsedData;
}
//
export const checkErrorCode = (error: any) => {
    if (error.code === 4001) {
        const err = {
            code: error.code,
            message: error.message
        }
        return JSON.stringify(err);
    }
    if (error.code !== undefined)
    {
        return JSON.stringify(error);
    }
    return error;
}
export const checkInputNumber = (value: string, prevValue: object | any, name: string) => {

    const MIN_INPUT_VALUE = (name === ETHER_INPUT_NAME ? MIN_INPUT_VALUE_ETHER : MIN_INPUT_VALUE_TOKEN);
    const MAX_INPUT_VALUE = (name === ETHER_INPUT_NAME ? MAX_INPUT_VALUE_ETHER : MAX_INPUT_VALUE_TOKEN);

    if (Number(value) < MIN_INPUT_VALUE || Number(value) > MAX_INPUT_VALUE) {
        return prevValue[name];
    }
    const decimalIndex = value.indexOf(".");
    if (decimalIndex !== -1 && value.length - decimalIndex - 1 > MAX_DECIMAL_PLACES) {
        return prevValue[name];
    }
    return value;
};