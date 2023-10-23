Latest version of Openzeppelin Contracts are been used, version 5.0.0

First install the module by running the command 

npm install

In hardhat.config.js file enter your private key on line number 9 to deploy the contract


Try running some of the following tasks:

npx hardhat compile 

npx hardhat run --network sepolia scripts/deploy.js  //TO deploy on testnet

This will return you Deployer address, ERC20 contract address and Main contract Address

//To verify smart contract on etherscan run this command

npx hardhat verify --network sepolia Main contract Address ERC20 contract address Deployer Address

This will return the etherscan link where you can read and write the smart contract

In new Terminal run this command

node ./eventListener.js

This will listen and return the events in console whenever the event is emitted


