# 🔒 Solana Token Vault

A decentralized **Token Vault Program** built on the **Solana Blockchain** using the **Anchor Framework**.  
This vault allows users to **initialize a secure account, deposit (lock) SPL tokens, and withdraw them.**

> 📌 Built as part of **Q4 Builder Pre-Course (Task 2)**.

---

## 🚀 Deployment Details (Devnet)

| Component | Value |
|-----------|-------|
| **Program ID** | BwgP9zXRVRtzmZszAGtTPEGnFpuEKrMLnGYfibCYgmU4 |
| **Custom Token Mint** | 7sKE2TnxK1ffqEKLbu8sShAfxu9N53yCSgmaNLaCVzwk |
| **Network** | Solana Devnet |

---

## 📜 Proof of Work

### 📌 1. Token Locking Transaction  
Tokens were successfully **minted and locked** in the vault program.

- **Transaction Signature:** 2aju15tA6QnMPe8XwSK5pQZCU6t4qoqZj4gkaCQHAd5iTNRpGtHz9X8jK39xyv5MYuER2i7T5YLmAXEdsSmBQV7
- **Explorer Link:** *(View on Solana Devnet Explorer)*

### 🖼️ 2. Visual Proof  
📎 *Upload your screenshot here using GitHub README drag & drop or attach in Issues.*

---

## 🛠️ Tech Stack

| Area | Tech |
|------|------|
| **Smart Contract Language** | Rust |
| **Framework** | Anchor 0.30.1 |
| **Client** | TypeScript / Node.js |
| **Network** | Solana Devnet |

---

## 📂 Project Structure

vault/
├── programs/
│   └── token_vault/
│       └── src/
│           └── lib.rs        # Core smart contract logic (Initialize, Deposit, Withdraw)
├── scripts/
│   └── vault.ts              # Client script to interact with vault
└── tests/                    # Anchor integration tests

---

## ⚙️ How to Run Locally

### 📌 Prerequisites
Ensure you have:
- Rust & Cargo
- Solana CLI
- Anchor CLI
- Node.js & NPM/Yarn

---

### 🧰 Steps to Run

1️⃣ Clone the Repository  
git clone https://github.com/Harshbhargav45/vault.git  
cd vault

2️⃣ Install Dependencies  
npm install

3️⃣ Build the Program  
anchor build

4️⃣ Deploy to Devnet *(Make sure your wallet has SOL and Anchor.toml is set to devnet)*  
anchor deploy

5️⃣ Run the Interaction Script *(Initializes vault and deposits tokens)*  
npx ts-node scripts/vault.ts

---
 
Feel free to ⭐ star the repo, fork it, or open issues. 🙌

---
