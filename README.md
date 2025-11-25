Solana Token Vault 🔒

This project is a decentralized Token Vault program built on the Solana Blockchain using the Anchor Framework. It allows users to initialize a secure vault, deposit (lock) specific SPL tokens, and withdraw them.

This repository was created as part of the Q4 Builder Pre-Course (Task 2).

🚀 Deployment Details (Devnet)

Program ID: BwgP9zXRVRtzmZszAGtTPEGnFpuEKrMLnGYfibCYgmU4

Custom Token Mint Address: 7sKE2TnxK1ffqEKLbu8sShAfxu9N53yCSgmaNLaCVzwk

Network: Solana Devnet

📜 Proof of Work

1. Token Locking Transaction

Tokens were successfully minted and locked in the vault program.

Transaction Signature: 2aju15tA6QnMPe8XwSK5pQZCU6t4qoqZj4gkaCQHAd5iTNRpGtHz9X8jK39xyv5MYuER2i7T5YLmAXEdsSmBQV7

Explorer Link: View on Solana Explorer

2. Visual Proof

(Please insert your screenshot of the terminal output or Explorer here)

🛠️ Tech Stack

Language: Rust (Smart Contract)

Framework: Anchor 0.30.1

Client: TypeScript / Node.js

Network: Solana Devnet

📂 Project Structure

programs/token_vault/src/lib.rs: The core logic of the smart contract (Initialize, Deposit, Withdraw).

scripts/vault.ts: The client-side script used to interact with the deployed program on Devnet.

tests/: Anchor integration tests.

⚙️ How to Run Locally

Prerequisites

Rust & Cargo

Solana CLI

Anchor CLI

Node.js & Yarn/NPM

Steps

Clone the Repository

git clone [https://github.com/Harshbhargav45/vault.git](https://github.com/Harshbhargav45/vault.git)
cd vault


Install Dependencies

npm install


Build the Program

anchor build


Deploy to Devnet
Ensure your Anchor.toml is configured for devnet and you have SOL in your wallet.

anchor deploy


Run the Interaction Script
This script initializes the vault (if needed) and deposits tokens.

npx ts-node scripts/vault.ts


📝 License

This project is open source and available under the MIT License.
