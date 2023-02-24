import { SyntaxInteract } from "../../SyntaxInteract";



const listFunc = [
    `// helpFunc.ts
    export const createAmount = (amountString: string, decimalPlaces: number) => {
        const decimalIndex: number = amountString.indexOf(".");
        const digitsAfterDecimal: number = amountString.length - decimalIndex - 1;
        const multiplier: number = 10 ** digitsAfterDecimal;
        const amountWithoutDecimal: number = Number(amountString.replace(".", ""));
        const amountWithDecimalMoved: number = amountWithoutDecimal * multiplier;
        const decimalAdjustment: number = decimalPlaces - digitsAfterDecimal;
        const decimalMultiplier = BN(10).pow(BN(decimalAdjustment));
        return BN(amountWithDecimalMoved).mul(decimalMultiplier);
    }`,
    `// interact.ts
    export const mintToken = async (to: string, amount: number) => {
        try {
            const { abiMyToken, abiTokenSale } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            const estimateGas = await myTokenInstance.methods
                .mint(to, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await myTokenInstance.methods
                .mint(to, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Transfer({ filter: { _from: zeroAddress, _to: to, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }
    export const burnToken = async (to: string, amount: number) => {
        try {
            const { abiMyToken, abiTokenSale } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            const estimateGas = await myTokenInstance.methods
                .burn(to, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await myTokenInstance.methods
                .burn(to, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Transfer({ filter: { _from: accounts[0], _to: zeroAddress, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }`,
]

export const MintOrBurnTokenSyntax = () => {
    
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}