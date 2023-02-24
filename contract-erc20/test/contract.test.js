const web3 = require("web3");
const MyToken = artifacts.require("MyToken");
const TokenSale = artifacts.require("TokenSale");

const BN = web3.utils.toBN;

const createAmount = (amount, decimal)=>{
    const result = BN(amount).mul(BN(10).pow(BN(decimal))).toString();
    return result;
}

contract("MyToken", (accounts)=>{
    it(`Should deployed Contract MyToken and creates 1000 tokens and assigns them to account ${accounts[0]}`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const decimal = await tokenSaleInstance.getDecimal();
        const actualTotalSupply = await tokenSaleInstance.getBalanceOf(accounts[0]);
        const expectedTotalSupply = createAmount(1000, decimal);
        assert.equal(actualTotalSupply.toString(), expectedTotalSupply, "The amount of tokens is incorrect!");
    });
    it(`Should creates 15 tokens and assigns them to account ${accounts[1]}, increasing the total supply.`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        await myTokenInstance.mint(accounts[1], 15);
        const decimal = await tokenSaleInstance.getDecimal();
        const actualBalance = await tokenSaleInstance.getBalanceOf(accounts[1]);
        const expectedBalance = createAmount(15, decimal);
        assert.equal(actualBalance.toString(), expectedBalance, "The amount of tokens is incorrect!");
    });
    it(`Should burn 5 tokens and assigns them to account ${accounts[1]}, reducing the total supply.`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        await myTokenInstance.burn(accounts[1], 5);
        const decimal = await tokenSaleInstance.getDecimal();
        const actualBalance = await tokenSaleInstance.getBalanceOf(accounts[1]);
        const expectedBalance = createAmount(10, decimal);
        assert.equal(actualBalance.toString(), expectedBalance, "The amount of tokens is incorrect!");
    });

})

contract("TokenSale", (accounts)=>{
    it("Should returns the name of the token", async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const tokenName = await tokenSaleInstance.getNameToken();
        assert.equal(tokenName, "MyToken", "The name of the token is incorrect!");
    });
    it("Should returns the symbol of the token", async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const tokenSymbol = await tokenSaleInstance.getSymbolToken();
        assert.equal(tokenSymbol, "MTK", "The symbol of the token is incorrect!");
    });
    it("Should returns the decimals places of the token", async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const decimal = await tokenSaleInstance.getDecimal();
        assert.equal(decimal, 18, "The decimals places is incorrect!");
    });
    it(`Should buy 25 tokens from caller's account`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const decimal = await tokenSaleInstance.getDecimal();
        await myTokenInstance.mint(tokenSaleInstance.address, 25);
        await tokenSaleInstance.buyToken({from: accounts[3], value: web3.utils.toWei("25", "ether")});
        const actualBalance = await tokenSaleInstance.getBalanceOf(accounts[3]);
        const expectedBalance = createAmount(25, decimal);
        assert.equal(actualBalance.toString(), expectedBalance, "The amount of tokens is incorrect!");
    });
    it(`Should sell 5 tokens from caller's account`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const decimal = await tokenSaleInstance.getDecimal();
        await myTokenInstance.mint(accounts[4], 25);
        const amountToken = BN(createAmount(5, decimal));
        await myTokenInstance.approve(tokenSaleInstance.address, 0, {from: accounts[4]});
        await myTokenInstance.approve(tokenSaleInstance.address,amountToken, {from: accounts[4]});
        await tokenSaleInstance.sellToken(amountToken, {from: accounts[4]});
        const actualBalance = await tokenSaleInstance.getBalanceOf(accounts[4]);
        const expectedBalance = createAmount(20, decimal);
        assert.equal(actualBalance.toString(), expectedBalance, "The amount of tokens is incorrect!");
    });
    it(`Should send 5 tokens from caller's account to account ${accounts[5]}`, async()=>{
        const myTokenInstance = await MyToken.deployed({from: accounts[0]});
        const tokenSaleInstance = await TokenSale.deployed(myTokenInstance.address);
        const decimal = await tokenSaleInstance.getDecimal();
        const amountToken = BN(createAmount(5, decimal));
        await myTokenInstance.approve(tokenSaleInstance.address, 0, {from: accounts[0]});
        await myTokenInstance.approve(tokenSaleInstance.address,amountToken, {from: accounts[0]});
        await tokenSaleInstance.sendToken(accounts[5], amountToken, {from: accounts[0]});
        const actualBalance = await tokenSaleInstance.getBalanceOf(accounts[5]);
        const expectedBalance = createAmount(5, decimal);
        assert.equal(actualBalance.toString(), expectedBalance, "The amount of tokens is incorrect!");
    });
});