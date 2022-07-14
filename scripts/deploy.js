const babCoinURI = "TEMPORARY URL EXTENDED LENGTH";

const main = async () => {
    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI);
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