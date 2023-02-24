import { SyntaxInteract } from "../../SyntaxInteract";


const listFunc = [
    `// interact.ts
    export const sendToken = async (to: string, amount: number) => {
        try {
            const { abiTokenSale, abiMyToken } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            await myTokenInstance.methods.approve(addressTokenSale, amountToBN).send({ from: accounts[0] });
            const estimateGas = await tokenSaleInstance.methods
                .sendToken(to, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await tokenSaleInstance.methods
                .sendToken(to, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Transfer({ filter: { _from: addressTokenSale, _to: to, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }
    export const sellToken = async (amount: number) => {
        try {
            const { abiTokenSale, abiMyToken } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            await myTokenInstance.methods.approve(addressTokenSale, amountToBN).send({ from: accounts[0] });
            const estimateGas = await tokenSaleInstance.methods
                .sellToken(amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await tokenSaleInstance.methods
                .sellToken(amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Transfer({ filter: { _from: accounts[0], _to: addressTokenSale, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }
    export const buyToken = async (amount: number) => {
        try {
            const { abiTokenSale, abiMyToken } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const value = web3.utils.toWei(amount.toString(), "ether");
            const estimateGas = await tokenSaleInstance.methods
                .buyToken()
                .estimateGas({ from: accounts[0], gas: 5000000, value: value });
            const gasLimit: number = estimateGas * 5;
            const receipt = await tokenSaleInstance.methods
                .buyToken()
                .send({ from: accounts[0], value: value, gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Transfer({ filter: { _from: addressTokenSale, _to: accounts[0], }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }`
]



export const TransactionSyntax = () => {
    
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}