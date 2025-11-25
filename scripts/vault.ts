import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import idl from "../target/idl/token_vault.json";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = new anchor.Program(idl as any, provider);

const MINT_ADDRESS = new anchor.web3.PublicKey(
  "7sKE2TnxK1ffqEKLbu8sShAfxu9N53yCSgmaNLaCVzwk"
);

async function main() {
  console.log("🚀 Starting Vault Script...");
  console.log("Program ID:", program.programId.toString());
  console.log("Mint Address:", MINT_ADDRESS.toString());

  const [vaultState] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), MINT_ADDRESS.toBuffer()],
    program.programId
  );

  const [vaultTokenAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault_token"), MINT_ADDRESS.toBuffer()],
    program.programId
  );

  const userAta = await getAssociatedTokenAddress(
    MINT_ADDRESS,
    provider.publicKey
  );

  console.log("Vault PDA:", vaultState.toString());
  console.log("Vault Token Account PDA:", vaultTokenAccount.toString());

  try {
    const accountInfo = await provider.connection.getAccountInfo(vaultState);

    if (accountInfo === null) {
      console.log("⚠️ Vault not initialized. Initializing now...");

      const tx = await program.methods
        .initializeVault()
        .accounts({
          vault: vaultState,
          vaultTokenAccount: vaultTokenAccount,
          mint: MINT_ADDRESS,
          user: provider.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
      console.log("✅ Initialization successful! Sig:", tx);
    } else {
      console.log("✅ Vault already initialized.");
    }
  } catch (e) {
    console.error("❌ Initialization Error:", e);
    return;
  }

  const amountToLock = new anchor.BN(10 * 1_000_000_000);

  console.log("⏳ Attempting to lock tokens...");

  try {
    const tx = await program.methods
      .deposit(amountToLock)
      .accounts({
        userTokenAccount: userAta,
        vaultTokenAccount: vaultTokenAccount,
        user: provider.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("🎉 SUCCESS! Tokens Locked.");
    console.log(
      `🔎 View on Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  } catch (error) {
    console.error("❌ Error locking tokens:", error);
    console.log("Logs:", error.logs);
  }
}

main();
