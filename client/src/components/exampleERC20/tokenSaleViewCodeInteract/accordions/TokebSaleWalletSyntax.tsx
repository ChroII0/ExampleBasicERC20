import { SyntaxInteract } from "../../SyntaxInteract";



const listFunc = [
    `// helpFunc.ts
    export const addFloatingPoint = (balanceString: string, decimalPlaces: number) => {
        const indexFloatingPoint: number = balanceString.length - decimalPlaces;
        return balanceString.length === 1 ? balanceString : balanceString.slice(0, indexFloatingPoint) + "." + balanceString.slice(indexFloatingPoint);
    }`,
    `
// interact.ts
    export const getCurrentWalletTokenSale = async () => {
        try {
            const { abiTokenSale } = loadAbis();
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const balance = await web3.eth.getBalance(addressTokenSale);
            const balanceToken = await tokenSaleInstance.methods.getBalanceOf(addressTokenSale).call();
            const remainingAllowance = await tokenSaleInstance.methods.getAllowance().call();
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const tokenSaleWallet: ITokenSaleWallet = {
                address: addressTokenSale,
                balance: balance,
                balanceToken: addFloatingPoint(balanceToken.toString(), decimal),
                remainingAllowance: addFloatingPoint(remainingAllowance.toString(), decimal)
            }
            return tokenSaleWallet;
        } catch (err: any) {
            const errAlert = {
                errTitle: "Oh snap! Failed to get current TokenSale contract wallet!",
                errContent: err.message
            }
            throw new Error(JSON.stringify(errAlert));
        }
    }`
]

export const TokenSaleWalletSyntax = () => {
    
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}