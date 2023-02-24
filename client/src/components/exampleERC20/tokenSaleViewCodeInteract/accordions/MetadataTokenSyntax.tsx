
import { SyntaxInteract } from "../../SyntaxInteract";

const listFunc = [
    `// contract.ts
    export const loadAbis = ()=>{
        const abiMyToken = MyTokenABI as AbiItem[];
        const abiTokenSale = TokenSaleABI as AbiItem[];
        return ({abiMyToken, abiTokenSale});
    }`,
    `// interact.ts
    export const getMetadataToken = async () => {
        try {
            const { abiTokenSale } = loadAbis();
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const metadataToken: IMetadataToken = {
                name: await tokenSaleInstance.methods.getNameToken().call(),
                symbol: await tokenSaleInstance.methods.getSymbolToken().call(),
                owner: await tokenSaleInstance.methods.ownerToken().call(),
                price: await tokenSaleInstance.methods.tokenPrice().call()
            }
            return metadataToken;
        } catch (err: any) {
            const errAlert = {
                errTitle: "Oh snap! Failed to get Metadata Token!",
                errContent: err.message
            }
            throw new Error(JSON.stringify(errAlert));
        }
    }`
]


export const MetadataTokenSyntax = () => {
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}