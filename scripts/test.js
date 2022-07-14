const babCoinURI = "TEMPORARY URL EXTENDED LENGTH";

const main = async () => {
    const [owner, random1, random2, random3, random4] = await hre.ethers.getSigners();

    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI, owner.address);
    await babCoinContract.deployed();
    console.log("Contract deployed to:", babCoinContract.address);
    console.log("Contract deployed by:", owner.address, "\n");

    let txn = await babCoinContract.addAdmins(
        [random1.address, random2.address, random3.address, random1.address]
    );
    await txn.wait();
    let admins = await babCoinContract.getAdmins();
    console.log("Admins:", admins);

    txn = await babCoinContract.removeAdmins([random1.address, random3.address]);
    await txn.wait();
    admins = await babCoinContract.getAdmins();
    console.log("Updated admins:", admins);

    //txn = await babCoinContract.connect(random4).addAdmins([random1.address]);
    //await txn.wait();
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