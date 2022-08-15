const { expect } = require("chai");
const { ethers } = require("hardhat");

const emptyData = "0x00000000000000000000000000000000000000000000000000000000000000";

describe("BabCoinContract", function() {
    it("Basic Gas Test", async function() {
        const signers = await ethers.getSigners();
        const babCoinContractFactory = await ethers.getContractFactory("BabCoinContract");
        const babCoinContract = await babCoinContractFactory.deploy("URI HERE ADDING CHARACTERS TO MATCH REALISTIC LENGTH", signers[0].address);

        let attendees = [];
        let attendee_size = 100;
        let i = 0;
        while (attendees.length < attendee_size) {
            attendees.push(signers[i % signers.length].address);
            i++;
        }
        await babCoinContract.airdrop(attendees, 1, 1, emptyData);

        const balance = await babCoinContract.balanceOf(attendees[0], 1);
        expect(balance).to.equal(5);
    });
});