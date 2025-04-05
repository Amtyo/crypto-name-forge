
// Ce fichier sert de placeholder pour les bibliothèques Solana

// PROGRAMME ANCHOR CUSTOM_NAME_SERVICE
// declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg8YNi4zqF6h");

// #[program]
// pub mod custom_name_service {
//   use super::*;
//
//   pub fn register_name(ctx: Context<RegisterName>, name: String) -> Result<()> {
//     let name_record = &mut ctx.accounts.name_record;
//     name_record.name = name.clone();
//     name_record.owner = *ctx.accounts.user.key;
//
//     // --- Paiement ---
//     let lamports_to_pay = 20_000_000; // Montant à payer en lamports (0.02 SOL)
//     ...
//   }
// }

// #[derive(Accounts)]
// pub struct RegisterName<'info> {
//     #[account(init, payer = user, space = 8 + 64)]
//     pub name_record: Account<'info, NameRecord>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[account]
// pub struct NameRecord {
//     pub name: String,
//     pub owner: Pubkey,
// }
