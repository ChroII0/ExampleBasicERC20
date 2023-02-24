import { SyntaxInteract } from "../../SyntaxInteract";

const listFunc = [
    `// helpFunc.ts
    export const checkErrorCode = (error: any) => {
        if (error.code === 4001) {
            const err = {
                code: error.code,
                message: error.message
            }
            return JSON.stringify(err);
        }
        if (error.code !== undefined)
        {
            return JSON.stringify(error);
        }
        return error;
    }`,
    `// interact.ts
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
    }`
]


export const ConnectWalletSyntax = () => {
    return(<>
        <SyntaxInteract
            listFunc={listFunc}
        />
    </>);
}