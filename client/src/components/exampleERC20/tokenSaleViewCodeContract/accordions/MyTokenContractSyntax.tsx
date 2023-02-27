import { SyntaxInteract } from "../../SyntaxInteract";


const listFunc = [
    `// MyToken.sol
    // SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");


    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    function burn(address to, uint256 amount) public onlyRole(BURNER_ROLE){
        _burn(to, amount);
    }
    function setAllowance(address spender, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) returns(bool){
        address owner = _msgSender();
        _approve(owner, spender, 0);
        _approve(owner, spender, amount);
        return true;
    }
    function approve(address spender, uint256 amount) public override returns(bool){
        address owner = _msgSender();
        require(
            balanceOf(owner) >= amount,
            "Not enough token"
        );
        _approve(owner, spender, 0);
        _approve(owner, spender, amount);
        return true;
    }
    function _increaseAllowance(address spender, uint256 addedValue) public onlyRole(DEFAULT_ADMIN_ROLE) returns(bool){
        return increaseAllowance(spender, addedValue);
    }
    function _decreaseAllowance(address spender, uint256 subtractedValue) public onlyRole(DEFAULT_ADMIN_ROLE) returns(bool){
        return decreaseAllowance(spender, subtractedValue);
    }
}
`
]

export const MyTokenContractSyntax = () => {
    return (<>
            <SyntaxInteract
                listFunc={listFunc}
            />
    </>);
}