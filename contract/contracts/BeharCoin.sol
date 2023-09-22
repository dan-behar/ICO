// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BeharCoin is ERC20 {
    address public owner;
    uint256 public tokenPrice;
    uint256 public startTime;
    uint256 public endTime;
    mapping(address => uint256) public ethBalances;

    constructor(uint256 _initialSupply, uint256 _price ) ERC20("Beharcoin", "DBA") {
        owner = msg.sender;
        _mint(msg.sender, _initialSupply * 18**uint256(decimals()));
        tokenPrice = _price;
        startTime = block.timestamp;
        endTime = startTime + 7 days;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier duringICO() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "ICO has ended");
        _;
    }

    function setTokenPrice(uint256 _price) public onlyOwner {
        tokenPrice = _price;
    }

    function buyTokens() public payable duringICO {
        uint256 tokensPerEth = 100; // 1.0 Sepolia-ETH = 100 Beharcoins
        uint256 tokenAmount = msg.value * tokensPerEth;
        require(tokenAmount > 0, "Not enough Sepolia-ETH sent");
        _mint(msg.sender, tokenAmount * 10**uint256(decimals())); // Mint tokens
        ethBalances[msg.sender] += msg.value;
    }

    function claimTokens() public {
        require(balanceOf(msg.sender) > 0, "No tokens to claim");
        uint256 tokensToClaim = balanceOf(msg.sender);
        transfer(msg.sender, tokensToClaim);
    }


    receive() external payable {
        buyTokens(); // Fallback function to buy tokens when Sepolia-ETH is sent
    }
}



