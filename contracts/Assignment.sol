// SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Erc20.sol";

contract Main is Ownable {
    erc20Token token; // Address for ERC20 smart contract
    uint256 tokenClaimTime = 60; //token claim time 60 seconds

    // Pass ERC20 contract address and owner address who will deploy the contract
    constructor(erc20Token erc20Address, address intialOwnerAddress) 
        Ownable(intialOwnerAddress)
    {
        token = erc20Address;
    }

    // mapping
    mapping(address => bool) public isWhitelisted; //To check and Store whitelisted users
    mapping(address => bool) public hasClaimed; //To check whether user has claimed Tokens
    mapping(address => uint256) public lastClaimedTime; // Time at which user calimed the tokens

    // events
    event whitelisted(address indexed user, bool status);
    event tokensClaimed(address indexed user, uint256 amount);

    // add multiple users in whitelist
    function addMultipleWhitelistedUsers(address[] memory users)
        external
        onlyOwner
    {
        for (uint256 i; i < users.length; i++) {
            require(!isWhitelisted[users[i]], "User is already whitelisted");
            isWhitelisted[users[i]] = true;
            emit whitelisted(users[i], true);
        }
    }

    // add single user in whitelist
    function addSingleWhitelistedUser(address user) external onlyOwner {
        require(!isWhitelisted[user], "User is already whitelisted");
        isWhitelisted[user] = true;
        emit whitelisted(user, true);
    }

    function removeWhitelistedUser(address user) external onlyOwner {
        if (isWhitelisted[user]){
            isWhitelisted[user] = false;
            emit whitelisted(user, false);
        } else {
            revert("User not whitelisted");
        }
    }

    // This method uses less gas as compared to above function
    function _claimToken(uint256 amount) external {
        if (isWhitelisted[msg.sender]) {
            if (
                block.timestamp > lastClaimedTime[msg.sender] + tokenClaimTime
            ) {
                require(
                    amount <= 100,
                    "User can claim upto 100 tokens per min"
                );
                lastClaimedTime[msg.sender] = block.timestamp;
                token.mint(msg.sender, (amount * 10) ^ 18);
                emit tokensClaimed(msg.sender, amount);
            } else {
                revert("You can claim tokens after 60 seconds");
            }
        } else {
            revert("User not whitelisted");
        }
    }

    function userBalance() external view returns (uint256) {
        return token.balanceOf(msg.sender);
    }
}

