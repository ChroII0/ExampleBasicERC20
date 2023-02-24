import { AbiItem } from "web3-utils"
import MyTokenABI from "./abi/abiMyToken.json";
import TokenSaleABI from "./abi/abiTokenSale.json";

export const addressMyToken = "0xD969672feF4411EFb7179445030d69fcB211d1D4" ;
export const addressTokenSale = "0xb54E8272e57D210d4CEa9dc79428319417A5F799";


export const loadAbis = ()=>{
    const abiMyToken = MyTokenABI as AbiItem[];
    const abiTokenSale = TokenSaleABI as AbiItem[];
    return ({abiMyToken, abiTokenSale});
}
