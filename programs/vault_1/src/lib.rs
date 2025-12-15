use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("DXCP6HG3zTLmL5hg59RBn8c9NrfsRz8yWKvDWitkHGCs");

#[program]
pub mod vault_1 {
    use super::*;

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        };

        let cpi_ctx =
            CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);

        token::transfer(cpi_ctx, amount)?;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let vault_balance = ctx.accounts.vault.amount;

        let seeds = &[
            b"vault-authority",
            ctx.accounts.signer.key.as_ref(),
            &[ctx.bumps.vault_authority],
        ];

        let signer_seeds = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.user_token.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        };

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer_seeds,
        );

        token::transfer(cpi_ctx, vault_balance)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = user_token.mint == mint.key(),
        constraint = user_token.owner == signer.key()
    )]
    pub user_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = vault.mint == mint.key(),
        constraint = vault.owner == vault_authority.key()
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        seeds = [b"vault-authority", signer.key().as_ref()],
        bump
    )]
    /// CHECK: PDA derived from fixed seeds, used only as token authority
    pub vault_authority: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    pub mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = user_token.mint == mint.key(),
        constraint = user_token.owner == signer.key()
    )]
    pub user_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = vault.mint == mint.key(),
        constraint = vault.owner == vault_authority.key()
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        seeds = [b"vault-authority", signer.key().as_ref()],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
}
