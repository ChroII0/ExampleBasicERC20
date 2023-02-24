import { SyntaxInteract } from "../../SyntaxInteract";


const listFunc = [
    `// interact.ts
    export const setAllowance = async (amount: number) => {
        try {
            const { abiMyToken, abiTokenSale } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            const estimateGas = await myTokenInstance.methods
                .setAllowance(addressTokenSale, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await myTokenInstance.methods
                .setAllowance(addressTokenSale, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Approval({ filter: { _from: accounts[0], _to: addressTokenSale, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }
    export const increaseAllowance = async (amount: number) => {
        try {
            const { abiMyToken, abiTokenSale } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            const estimateGas = await myTokenInstance.methods
                ._increaseAllowance(addressTokenSale, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await myTokenInstance.methods
                ._increaseAllowance(addressTokenSale, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Approval({ filter: { _from: accounts[0], _to: addressTokenSale, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }
    export const decreaseAllowance = async (amount: number) => {
        try {
            const { abiMyToken, abiTokenSale } = loadAbis();
            const accounts = await web3.eth.getAccounts();
            const myTokenInstance = new web3.eth.Contract(abiMyToken, addressMyToken);
            const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
            const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
            const amountToBN = createAmount(amount.toString(), decimal);
            const estimateGas = await myTokenInstance.methods
                ._decreaseAllowance(addressTokenSale, amountToBN)
                .estimateGas({ from: accounts[0], gas: 5000000 });
            const gasLimit: number = estimateGas * 5;
            const receipt = await myTokenInstance.methods
                ._decreaseAllowance(addressTokenSale, amountToBN)
                .send({ from: accounts[0], gas: gasLimit, gasPrice: _gasPrice });
            if (receipt.status) {
                return myTokenInstance.events.Approval({ filter: { _from: accounts[0], _to: addressTokenSale, }, fromBlock: receipt.blockNumber });
            }
            return false;
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    }`
]


export const AllownaceSyntax = () => {
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}