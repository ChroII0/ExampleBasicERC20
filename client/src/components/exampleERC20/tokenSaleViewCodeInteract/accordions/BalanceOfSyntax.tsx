import { SyntaxInteract } from "../../SyntaxInteract";


const listFunc = [
    `//interacct.ts
    export const getBalanceOf = async (address: string) => {
        try {
            const { abiTokenSale } = loadAbis();
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const balanceOf: string = await tokenSaleInstance.methods.getBalanceOf(address).call();
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            return addFloatingPoint(balanceOf, decimal);
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }`
]


export const BalanceOfSyntax = () => {
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}