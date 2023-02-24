// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

abstract contract ERC20 {
    function name() public view virtual returns (string memory);

    function symbol() public view virtual returns (string memory);

    function decimals() public view virtual returns (uint8);

    function totalSupply() public view virtual returns (uint256);

    function balanceOf(
        address _owner
    ) public view virtual returns (uint256 balance);

    function transfer(
        address _to,
        uint256 _value
    ) public virtual returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public virtual returns (bool success);

    function approve(
        address _spender,
        uint256 _value
    ) public virtual returns (bool success);

    function allowance(
        address _owner,
        address _spender
    ) public view virtual returns (uint256 remaining);
}

contract TokenSale {
    uint public tokenPrice = 1 ether;
    ERC20 token;
    address public ownerToken;
    

    constructor(address addressToken) {
        token = ERC20(addressToken);
        ownerToken = msg.sender;
    }

    function getNameToken() public view returns (string memory) {
        return token.name();
    }

    function getSymbolToken() public view returns (string memory) {
        return token.symbol();
    }

    function getDecimal() public view returns (uint8) {
        return token.decimals();
    }

    function getTotalSupply() public view returns (uint256) {
        return token.totalSupply();
    }

    function getBalanceOf(address owner) public view returns (uint256) {
        return token.balanceOf(owner);
    }
    function getAllowance() public view returns(uint256){
        return token.allowance(ownerToken, address(this));
    }

    function calculateTokenAmount(
        uint weiAmount
    ) private view returns (uint256) {
        uint integerPartOfToken = weiAmount / tokenPrice;
        uint fractionalPartOfToken = weiAmount -
            integerPartOfToken *
            tokenPrice;
        uint tokenToTransfer = integerPartOfToken *
            10 ** token.decimals() +
            ((fractionalPartOfToken * 10 ** token.decimals()) / tokenPrice);
        return tokenToTransfer;
    }

    function buyToken() public payable returns (bool) {
        uint tokenToTransfer = calculateTokenAmount(msg.value);
        require(
            tokenToTransfer >= 10 ** (token.decimals() / 3),
            "the amount of tokens to buy must be 0.000001"
        );
        require(
            token.balanceOf(address(this)) >= tokenToTransfer,
            "Not enough tokens left to buy!"
        );
        return token.transfer(msg.sender, tokenToTransfer);
    }

    function calculateWeiAmount(
        uint tokenAmount
    ) private view returns (uint256) {
        uint integerPartOfToken = tokenAmount / 10 ** token.decimals();
        uint fractionalPartOfToken = tokenAmount -
            integerPartOfToken *
            10 ** token.decimals();
        uint weiToTransfer = integerPartOfToken *
            tokenPrice +
            (fractionalPartOfToken * tokenPrice) /
            10 ** token.decimals();
        return weiToTransfer;
    }

    function sellToken(uint amount) public returns (bool) {
        require(
            amount >= 10 ** (token.decimals() / 3),
            "the amount of tokens to sell must be 0.000001"
        );
        require(
            token.balanceOf(msg.sender) >= amount,
            "Not enough token"
        );
        uint weiToTransfer = calculateWeiAmount(amount);
        require(
            address(this).balance >= weiToTransfer,
            "Not enough ETH in contract to pay seller");  
              
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(weiToTransfer);
        return true;
    }

    function sendToken(address to, uint amount) public returns (bool) {
        require(
            amount >= 10 ** (token.decimals() / 3),
            "the amount of tokens to send must be 0.000001"
        );
        require(
            token.balanceOf(msg.sender) >= amount,
            "Not enough token"
        );
        return token.transferFrom(msg.sender, to, amount);
    }
}
