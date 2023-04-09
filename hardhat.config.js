require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.8.4"
      },
      {
        version: "0.8.19"
      },
      {
        version: "^0.8.19"
      }
    ]
  },

  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/`,
      accounts: [""]
    }
  }
};