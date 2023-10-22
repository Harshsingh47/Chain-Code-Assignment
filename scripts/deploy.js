// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs')

async function main() {

  const [deployer] = await ethers.getSigners()
  console.log("Deployer Address",await deployer.getAddress())
  // ERC20 token deployment
  const token = await hre.ethers.deployContract("erc20Token", ["Mytoken", "MTK"]);
  await token.waitForDeployment();

  // userWhitelist contract deployment
  const Main = await hre.ethers.deployContract("Main", [token.getAddress(), deployer.getAddress()]);
  await Main.waitForDeployment();
  console.log("ERC20 contract Address:",await token.getAddress());
  console.log("Main Contract Address:" ,await Main.getAddress());

  const myAddress = {
    erc20Address: (await token.getAddress()).toString(),
    mainAddress: (await Main.getAddress()).toString()
  }
  const json = JSON.stringify(myAddress)
  fs.writeFileSync("./scripts/address.json",json)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
