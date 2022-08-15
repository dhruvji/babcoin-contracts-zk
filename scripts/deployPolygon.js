const superAdmin = "0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f";
const babCoinURI = "https://babcoin-backend.herokuapp.com/v1/event/nft/{id}";

const main = async () => {
    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI, superAdmin);
    await babCoinContract.deployed();
    console.log("Contract deployed to:", babCoinContract.address);
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

runMain();