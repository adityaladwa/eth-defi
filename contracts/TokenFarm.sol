// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFarm is Ownable {
    // stakeToken
    // unstakeToken
    // issueToken
    // addAllowedToken
    // getEthValue
    address[] public allowedTokens;

    function stakeToken(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must be more than 0");
    }

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    function tokenIsAllowed(address _token) public returns(bool) {
        for(uint256 i=0; i < allowedTokens.length; i++) {
            if(allowedTokens[i] == _token){
                return true;
            }
        }
        return false;
    }
}