const ethers = require("ethers");
const userWhitelistABI = require("./contracts/mainContract.json");
// require("dotenv").config();
const fs = require('fs')

async function main() {

    console.log("Event Listener server Started");

    const addressConfig = fs.readFileSync("./scripts/address.json", "utf-8");
    const add = JSON.parse(addressConfig);

    const contractAddress = add.mainAddress;
    // console.log(userWhitelistAddress);

    const provider = new ethers.WebSocketProvider(
        "wss://eth-sepolia.g.alchemy.com/v2/S6tjHzrxZOi4Cr7qDALL4iSnLC5rmO0R"
    )

    const contract = new ethers.Contract(contractAddress, userWhitelistABI, provider);
    contract.on("whitelisted", (user, status) => {
        let info = {
            user: user,
            status: status
            // data: event
        }
        console.log("whitelisted event",JSON.stringify(info))
    })

    contract.on("tokensClaimed", (user, amount) => {
        let info = {
            user: user,
            amount: amount,
            // data: event
        }
        console.log("tokenClaimed event",JSON.stringify(info))
    })
}

main()