const { Network, Alchemy } = require("alchemy-sdk");
const { Wallet } = require("ethers");
require("dotenv").config();

const alchemy = new Alchemy({
    apiKey: process.env.MUMBAI_ALCHEMY_KEY,
    network: Network.MATIC_MUMBAI
});

const superAdmin = "0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f";
const babCoinURI = "https://babcoin-backend.herokuapp.com/v1/event/nft/{id}";
const emptyData = "0x00000000000000000000000000000000000000000000000000000000000000";

const main = async () => {
    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI, superAdmin);
    await babCoinContract.deployed();
    console.log("Contract deployed to:", babCoinContract.address);

    var wallet = Wallet.createRandom();

    //addresses, id, amount, additional data
    await babCoinContract.airdrop([superAdmin, wallet.address], 1, 1, emptyData);
    await babCoinContract.airdrop([superAdmin, wallet.address], 2, 1, emptyData);
    console.log("Aidropped to", wallet.address, "- checking owned NFTs...");

    setTimeout(function() {
        alchemy.nft.getNftsForOwner(wallet.address).then(console.log);
    }, 10000);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

/*alchemy.nft.getNftsForOwner("0x31fCCb1B62f68Af0a15AC5020Ea1a95C6A35cA22")
    .then(nfts => {
        console.log(nfts.ownedNfts);
    });*/

runMain();