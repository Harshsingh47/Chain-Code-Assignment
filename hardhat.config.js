require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
   sepolia: {
     url: "https://sepolia.infura.io/v3/541cdcc43a3e41ddbc0901364c68e026", //Infura url with projectId
     accounts: [""] // add the account that will deploy the contract (private key)
    },
  },
  etherscan: {
    apiKey: "JAKW9HQ7AMPC4QGF8D29FJTZEB9463ZIQU"
  }
};
