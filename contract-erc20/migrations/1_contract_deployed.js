const MyToken = artifacts.require("MyToken");
const TokenSale = artifacts.require("TokenSale");



module.exports = function(deployer){
    deployer.deploy(MyToken).then(()=>{
        return deployer.deploy(TokenSale, MyToken.address);
    });
}