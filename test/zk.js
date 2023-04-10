const { ethers, upgrades } = require("hardhat");
const { solidity } = require('ethereum-waffle');
const { expect } = require('chai');
const babCoinURI = "TEMPORARY URL EXTENDED LENGTH";

describe("BabCoinContract", function() {
  let babCoinContract;

  beforeEach(async () => {
    const [owner, random1, random2, random3, random4] = await ethers.getSigners();

    const babCoinContractFactory = await ethers.getContractFactory('BabCoinContract');

    babCoinContract = await babCoinContractFactory.deploy(babCoinURI, owner.address);
    await babCoinContract.deployed();
  });

  it("should add and remove admins correctly", async function() {
    const [owner, random1, random2, random3, random4] = await ethers.getSigners();

    await babCoinContract.addAdmins([random1.address, random2.address, random3.address, random1.address]);
    let admins = await babCoinContract.getAdmins();
    expect(admins).to.have.lengthOf(4);
    expect(admins).to.include.members([random1.address, random2.address, random3.address]);

    await babCoinContract.removeAdmins([random1.address, random3.address]);
    admins = await babCoinContract.getAdmins();
    expect(admins).to.have.lengthOf(1);
    expect(admins).to.include.members([random2.address]);
  });
});