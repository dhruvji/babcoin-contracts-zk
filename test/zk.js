const { ethers } = require("hardhat");

const SemaphoreArtifact = require("../artifacts/contracts/Semaphore.sol/Semaphore.json");
const VerifierRegistryArtifact = require("../artifacts/contracts/VerifierRegistry.sol/VerifierRegistry.json");

const pollId = 1;
const coordinator = ethers.utils.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");
const merkleRoot = 123456789;
const merkleTreeDepth = 8;
const nullifierHash = 987654321;
const vote = "0x123456789abcdef";
const proof = [
0x123456789abcdef,
0x23456789abcdef1,
0x3456789abcdef12,
0x456789abcdef123,
0x56789abcdef1234,
0x6789abcdef12345,
0x789abcdef123456,
0x89abcdef1234567,
];

async function main() {
const [owner, random1, random2, random3] = await ethers.getSigners();
// Deploy VerifierRegistry contract
const VerifierRegistry = await ethers.getContractFactory(
    VerifierRegistryArtifact.abi,
    VerifierRegistryArtifact.bytecode,
    owner
);
const verifierRegistry = await VerifierRegistry.deploy();
await verifierRegistry.deployed();
console.log("VerifierRegistry deployed to:", verifierRegistry.address);

// Deploy Semaphore contract
const Semaphore = await ethers.getContractFactory(
    SemaphoreArtifact.abi,
    SemaphoreArtifact.bytecode,
    owner
);
const semaphore = await Semaphore.deploy(verifierRegistry.address);
await semaphore.deployed();
console.log("Semaphore deployed to:", semaphore.address);

// Register Verifier contract with VerifierRegistry
const IVerifier = await ethers.getContractFactory("IVerifier");
const verifier = await IVerifier.deploy();
await verifier.deployed();
console.log("Verifier deployed to:", verifier.address);

let txn = await verifierRegistry.addVerifier(verifier.address, merkleTreeDepth);
await txn.wait();

// Create poll
txn = await semaphore.createPoll(pollId, coordinator, merkleRoot, merkleTreeDepth);
await txn.wait();

// Cast vote
txn = await semaphore.castVote(vote, nullifierHash, pollId, proof);
await txn.wait();

// End poll
txn = await semaphore.endPoll(pollId);
await txn.wait();

// Get poll state
const [yesVotes, noVotes, state] = await semaphore.getPollState(pollId);
console.log("Poll state:", { yesVotes, noVotes, state });
}

main()
.then(() => process.exit(0))
.catch(error => {
console.error(error);
process.exit(1);
});