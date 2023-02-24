import Web3 from "web3";
import { IMetadataToken, ITokenSaleWallet, IWallet } from "../interface";
import { addressMyToken, addressTokenSale, loadAbis } from "./contract";
import { addFloatingPoint, checkErrorCode, createAmount } from "./helpFunc";
//creates a new instance of the Web3.js library and sets the provider as window.ethereum. 
export const web3 = new Web3(window.ethereum);
// const web3 = new Web3(new Web3.providers.HttpProvider('http://0.0.0.0:8545'));
// const web3 = new Web3(new Web3.providers.HttpProvider('https://ea16-115-78-15-110.ap.ngrok.io'));

export const BN = web3.utils.toBN;
export const fromWei = web3.utils.fromWei;
export const zeroAddress = web3.utils.toChecksumAddress("0x0000000000000000000000000000000000000000");
const _gasPrice = web3.utils.toWei("2.5", "Gwei");
//
export const connectWallet = async () => {
    //check if MetaMask is available
    if (window.ethereum) {
        try {
            await web3.eth.requestAccounts();
            return "MetaMask is connected!"
        } catch (err: any) {
            throw new Error(checkErrorCode(err));
        }
    } else {
        throw new Error(JSON.stringify('Metamask is not installed.'));
    }
}
export const getCurrentWalletConnected = async () => {
    const wallet: IWallet = {
        address: "",
        balance: "0"
    }
    //check if MetaMask is available
    if (window.ethereum) {
        try {
            //Promise returns Array - An array of addresses controlled by node.
            const account: string[] = await web3.eth.getAccounts();
            //Promise returns String - The current balance for the given address in wei.
            const balance: string = await web3.eth.getBalance(account[0], "latest");
            wallet.address = account[0];
            wallet.balance = balance;
            return wallet;
        } catch (err: any) {
            const errAlert = {
                errTitle: "Oh snap! Error getting current wallet information!",
                errContent: err.message
            }
            throw new Error(JSON.stringify(errAlert));
        }
    }
    return wallet;
}
export const getOwnerToken = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const result: string = await tokenSaleInstance.methods.ownerToken().call();
        return result;
    } catch (err) {
        throw new Error("Failed to get owner of token");
    }
}
export const getTokenPrice = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const tokenPrice: string = await tokenSaleInstance.methods.tokenPrice().call();
        return tokenPrice;
    } catch (err) {
        throw new Error("Failed to get the price of token");
    }
}
export const getNameToken = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const tokenName: string = await tokenSaleInstance.methods.getNameToken().call();
        return tokenName;
    } catch (err) {
        throw new Error("Failed to get the name of token");
    }
}
export const getSymbolToken = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const tokenSymbol: string = await tokenSaleInstance.methods.getSymbolToken().call();
        return tokenSymbol;
    } catch (err) {
        throw new Error("Failed to get the symbol of token");
    }
}
export const getDecimal = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
        return decimal;
    } catch (err) {
        throw new Error("Failed to get decimal places");
    }
}
export const getTotalSupply = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const totalSupply: string = await tokenSaleInstance.methods.getTotalSupply().call();
        const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
        return addFloatingPoint(totalSupply, decimal);
    } catch (err: any) {
        const errAlert = {
            errTitle: "Oh snap! Failed to get total supply token!",
            errContent: err.message
        }
        throw new Error(JSON.stringify(errAlert));    }
}
export const getBalanceOf = async (address: string) => {
    try {
        const { abiTokenSale } = loadAbis();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const balanceOf: string = await tokenSaleInstance.methods.getBalanceOf(address).call();
        const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
        return addFloatingPoint(balanceOf, Number(decimal));
    } catch (err: any) {
        throw new Error(checkErrorCode(err));
    }
}
export const getMyBalanceToken = async () => {
    try {
        const { abiTokenSale } = loadAbis();
        const account = await web3.eth.getAccounts();
        const tokenSaleInstance = new web3.eth.Contract(abiTokenSale, addressTokenSale);
        const myBalance: string = await tokenSaleInstance.methods.getBalanceOf(account[0]).call();
        const decimal: number = await tokenSaleInstance.methods.getDecimal().call();
        return addFloatingPoint(myBalance, decimal);
    } catch (err: any) {
        const errAlert = {
            errTitle: "Oh snap! Failed to get your balance token!",
            errContent: err.message
        }
        throw new Error(JSON.stringify(errAlert));
    }
}
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
}
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
}
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
}
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
}
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
}
