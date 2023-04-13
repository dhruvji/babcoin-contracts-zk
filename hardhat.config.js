require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-circom");
require("dotenv").config({ path: __dirname + "/.env" });

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
  
  circom: {
    inputBasePath: "./circuits",
    ptau: "https://hermezptau.blob.core.windows.net/ptau/powersOfTau28_hez_final_21.ptau",
    circuits: [
      {
        name: "semaphore",
        // No protocol, so it defaults to groth16
      },
      {
        name: "ecdsa-semaphore",
        // No protocol, so it defaults to groth16
      },
      {
        name: "split-bits",
        // No protocol, so it defaults to groth16
      },
      {
        name: "ecdsa",
        // No protocol, so it defaults to groth16
      },
      {
        name: "eth_addr",
        // No protocol, so it defaults to groth16
      },
    ],
  },
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/iezDy_XrzTY8bQe-oS3mHubapFF7GN5K`,
      accounts: ["66b8d716b5bba6e7c9a03716da65fbfe05aa87c7dce8a071c8cbdbf44a518077"]
    }
  }
};