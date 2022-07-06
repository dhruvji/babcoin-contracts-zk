const babCoinURI = "TEMPORARY";

const main = async () => {
    const [owner, random1, random2] = await hre.ethers.getSigners();

    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI);
    await babCoinContract.deployed();
    console.log("Contract deployed to:", babCoinContract.address);
    console.log("Contract deployed by:", owner.address);


    let txn = await babCoinContract.airdrop(
        [random1.address, random2.address], 1, 1, ""
    );
    await txn.wait();

    const random1Balance = await babCoinContract.balanceOf(random1.address, 1);
    console.log("Random Account #1 Balance:", random1Balance);
    const random2Balance = await babCoinContract.balanceOf(random2.address, 1);
    console.log("Random Account #2 Balance:", random2Balance);
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