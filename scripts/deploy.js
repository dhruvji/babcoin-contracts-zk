const babCoinURI = "https://ipfs.io/ipfs/bafybeiak3xqovye4zm4ny7ucyjpfrfqbfc46ojnucv3znrm4vjvzbafsoa/{id}.json";

const main = async () => {
    const babCoinContractFactory = await hre.ethers.getContractFactory('BabCoinContract');
    const babCoinContract = await babCoinContractFactory.deploy(babCoinURI, "0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f");
    await babCoinContract.deployed();
    console.log("Contract deployed to:", babCoinContract.address);

    //await babCoinContract.airdrop(["0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f", "0x510950e2Fa9aEFDC47CE25528c6917B09d6E9bEe"], 1, 1, "0x00000000000000000000000000000000000000000000000000000000000000");
    //await babCoinContract.airdrop(["0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f", "0x510950e2Fa9aEFDC47CE25528c6917B09d6E9bEe"], 2, 1, "0x00000000000000000000000000000000000000000000000000000000000000");
    //await babCoinContract.airdrop(["0xbab0BAe604066BFd4e536Cc1CddfA14D46790E1f", "0x856924B32216C8F6F326e5eB26806405F326cB24"], 3, 1, "0x00000000000000000000000000000000000000000000000000000000000000");
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