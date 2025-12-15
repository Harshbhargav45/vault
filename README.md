# 🔒 Solana Token Vault

A decentralized Token Vault Program built on the **Solana Blockchain** using the **Anchor Framework**.
This vault allows users to deposit (lock) custom SPL tokens into a PDA-controlled vault and withdraw them securely using on-chain logic.

📌 **Built as part of Q4 Builder Pre-Course (Task 2).**

## 🚀 Deployment Details (Devnet)


## 📜 Proof of Work

### 📌 Token Locking Transaction
Tokens were successfully minted and locked into the vault.

* **Transaction Signature:** `2aju15tA6QnMPe8XwSK5pQZCU6t4qoqZj4gkaCQHAd5iTNRpGtHz9X8jK39xyv5MYuER2i7T5YLmAXEdsSmBQV7`
* **Explorer:** [View on Solana Devnet Explorer](https://explorer.solana.com/tx/2aju15tA6QnMPe8XwSK5pQZCU6t4qoqZj4gkaCQHAd5iTNRpGtHz9X8jK39xyv5MYuER2i7T5YLmAXEdsSmBQV7?cluster=devnet)

## 🧑‍💻 User Stories

* As a user, I want to deposit my SPL tokens into a vault so they are securely locked by the program.
* As a user, I want only my wallet to be able to withdraw tokens from my vault.
* As a user, I want the vault to be controlled by a PDA, not a private key.
* As a user, I want my funds to remain non-custodial and verifiable on-chain.
* As a developer, I want a reusable vault primitive for staking, escrow, and game rewards.

## Architecture diagram 
Assests/Screenshot_20251215_213949_Chrome.jpg

### Architecture Overview

1.  **User Wallet**
    * Owns SPL tokens
    * Signs deposit and withdrawal transactions
2.  **Custom SPL Token Mint**
    * Token used for vault deposits
    * Created and minted separately
3.  **Vault Authority (PDA)**
    * Derived using seeds: `["vault-authority", user_pubkey]`
    * Has no private key
    * Acts as authority over vault token account
4.  **Vault Token Account**
    * SPL token account owned by the PDA
    * Stores locked tokens
5.  **Vault Program (Anchor)**
    * Verifies ownership and constraints
    * Uses CPI to SPL Token Program
    * Signs transfers using PDA seeds
6.  **SPL Token Program**
    * Executes token transfers securely

## ⚙️ How the Code Works

### Deposit Flow
1.  User calls `deposit(amount)`
2.  Program verifies:
    * Token mint matches
    * User owns the source token account
3.  CPI call transfers tokens:
    * From user token account
    * To vault token account
4.  Tokens are now locked in the vault

### Withdraw Flow
1.  User calls `withdraw()`
2.  Program derives PDA signer seeds
3.  CPI transfer is signed by PDA
4.  Tokens move back to user token account

## 🛠️ Tech Stack

| Area | Tech |
| :--- | :--- |
| **Smart Contract** | Rust |
| **Framework** | Anchor 0.32.x |
| **Token Standard** | SPL Token |
| **Client** | TypeScript / Node.js |
| **Network** | Solana Devnet |

## 📂 Project Structure

```bash
vault/
├── programs/
│   └── vault_1/
│       └── src/
│           └── lib.rs        # Vault logic (deposit & withdraw)
├── tests/
│   └── vault_1.ts            # Anchor integration tests
├── Anchor.toml
├── package.json
└── README.md
```

## 🧪 Testing

- **Tests written in:** TypeScript
- **Test Framework:** Anchor
- **Covers:**
  - Token deposit
  - Token withdrawal
  - PDA-based authority signing

Run tests with:
 anchor test

