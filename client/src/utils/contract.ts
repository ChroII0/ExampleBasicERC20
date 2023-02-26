import { AbiItem } from "web3-utils"
import MyTokenABI from "./abi/abiMyToken.json";
import TokenSaleABI from "./abi/abiTokenSale.json";

export const addressMyToken = "0x8aE59c88ee84a7283559Cb60D4195837bD637ea6" ;
export const addressTokenSale = "0x9795057428b56d5454e15d5696811Ed51FeB082B";


export const loadAbis = ()=>{
    const abiMyToken = MyTokenABI as AbiItem[];
    const abiTokenSale = TokenSaleABI as AbiItem[];
    return ({abiMyToken, abiTokenSale});
}
