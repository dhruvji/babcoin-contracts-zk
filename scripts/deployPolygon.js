const superAdmin = "0xa7e719109C711CFFb7AA7739BC23c4C7546521e8";
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