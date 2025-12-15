import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Vault1 } from "../target/types/vault_1";
import {
  createMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  mintTo,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { assert } from "chai";

describe("vault_1 – SPL Token Vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Vault1 as Program<Vault1>;
  const wallet = provider.wallet.publicKey;

  let mint: anchor.web3.PublicKey;
  let userToken: anchor.web3.PublicKey;
  let vaultAuthority: anchor.web3.PublicKey;
  let vault: anchor.web3.PublicKey;

  before(async () => {
    mint = await createMint(
      provider.connection,
      provider.wallet.payer,
      wallet,
      null,
      6
    );

    // 2️⃣ User ATA
    userToken = await getAssociatedTokenAddress(
      mint,
      wallet
    );

    const createUserAtaIx = createAssociatedTokenAccountInstruction(
      wallet,
      userToken,
      wallet,
      mint
    );

    await provider.sendAndConfirm(
      new anchor.web3.Transaction().add(createUserAtaIx)
    );

    // 3️⃣ Mint tokens to user
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      mint,
      userToken,
      wallet,
      2_000_000
    );

    // 4️⃣ Derive vault authority PDA
    [vaultAuthority] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault-authority"),
        wallet.toBuffer(),
      ],
      program.programId
    );

    // 5️⃣ Vault token account (ATA owned by PDA)
    vault = await getAssociatedTokenAddress(
      mint,
      vaultAuthority,
      true // PDA
    );

    const createVaultIx = createAssociatedTokenAccountInstruction(
      wallet,
      vault,
      vaultAuthority,
      mint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    await provider.sendAndConfirm(
      new anchor.web3.Transaction().add(createVaultIx)
    );
  });

  it("deposits tokens into vault", async () => {
    await program.methods
      .deposit(new anchor.BN(1_000_000))
      .accounts({
        signer: wallet,
        mint,
        userToken,
        vault,
        vaultAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const vaultAccount =
      await program.provider.connection.getTokenAccountBalance(vault);

    assert.equal(vaultAccount.value.amount, "1000000");
  });

  it("withdraws tokens back to user", async () => {
    await program.methods
      .withdraw()
      .accounts({
        signer: wallet,
        mint,
        userToken,
        vault,
        vaultAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const userBalance =
      await program.provider.connection.getTokenAccountBalance(userToken);

    assert.equal(userBalance.value.amount, "2000000");
  });
});
