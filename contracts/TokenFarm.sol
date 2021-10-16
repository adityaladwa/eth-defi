// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenFarm is Ownable {
    // stakeToken
    // unstakeToken
    // issueToken
    // addAllowedToken
    // getEthValue
    address[] public allowedTokens;
    address[] public stakers;
    IERC20 public dappToken;
    mapping(address => mapping(address => uint256)) public stakingBalance;
    mapping(address => uint256) public uniqueTokenStaked;
    mapping(address => address) public tokenPriceFeedMapping;

    constructor(address _dappTokenAddress) public {
        dappToken = IERC20(_dappTokenAddress);
    }

    function setPriceFeedContract(address _token, address _priceFeed) public onlyOwner {
        tokenPriceFeedMapping[_token] = _priceFeed;
    }

    function issueTokens() public onlyOwner {
        for(uint256 i = 0; i< stakers.length; i++){
            address recipient = stakers[i];
            uint256 userTotalValue = getUserTotalValue(recipient);
            dappToken.transfer(recipient, userTotalValue);
        }
    }

    function getUserTotalValue(address _user) public view returns(uint256) {
        uint256 totalValue = 0;
        require(uniqueTokenStaked[_user] >0,"No token staked");
        for(uint256 i = 0; i < allowedTokens.length; i++) {
            totalValue = totalValue + getUserSingleTokenValue(_user,allowedTokens[i]);
        }
        return totalValue;
    }

    function getUserSingleTokenValue(address _user, address _token) public view returns(uint256) {
        if(uniqueTokenStaked[_user] <= 0 ) {
            return 0;
        }
        (uint256 price, uint256 decimals) = getTokenValue(_token);
        return (stakingBalance[_token][_user] * price / (10**decimals));
    }

    function getTokenValue(address _token) public view returns(uint256, uint256) {
        address priceFeedAddress = tokenPriceFeedMapping[_token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (,int256 price,,,) = priceFeed.latestRoundData();
        uint256 decimals = uint256(priceFeed.decimals());
        return (uint256(price), decimals);
    }

    function stakeToken(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must be more than 0");
        require(tokenIsAllowed(_token),"Token is currently not allowed");
        IERC20(_token).transferFrom(msg.sender, address(this),_amount);
        updateUniqueTokenStaked(msg.sender, _token);
        stakingBalance[_token][msg.sender] = stakingBalance[_token][msg.sender] + _amount;
        if(uniqueTokenStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }

    function unstakeToken(address _token) public {
        uint256 balance = stakingBalance[_token][msg.sender];
        require(balance >0,"Staking balance cannot be 0");
        IERC20(_token).transfer(msg.sender, balance); 
        stakingBalance[_token][msg.sender] = 0;
        uniqueTokenStaked[msg.sender] = uniqueTokenStaked[msg.sender] -1;
    }

    function updateUniqueTokenStaked(address _user, address _token) internal {
        if(stakingBalance[_token][_user] <= 0){
            uniqueTokenStaked[_user] = uniqueTokenStaked[_user] + 1;
        }
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