export interface IWallet {
    address: string,
    balance: string
}
export interface ITokenSaleWallet extends IWallet {
    balanceToken: string,
    remainingAllowance: string
}
export interface IMetadataToken {
    name: string,
    symbol: string,
    owner: string,
    price: string
}
//
export interface IInputEther {
    amountEther: number,
}
export interface IInputToken {
    amountToken: number,
}
export interface IInputAddress {
    address: string,
}
//
export interface IMintBurnData extends IInputToken, IInputAddress {}
export interface ITransactionData extends IInputToken,IInputAddress, IInputEther {}

 
