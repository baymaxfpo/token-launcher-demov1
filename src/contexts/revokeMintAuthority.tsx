import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, MintLayout, Token, AuthorityType} from '@solana/spl-token';
import { Connection, PublicKey, Transaction, SystemProgram, Keypair, TransactionInstruction } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";


export async function revokeMintAuthority(
    connection : Connection,
    wallet : WalletContextState,
    mintAddress : PublicKey,
    ALT : dEXKey,
) {
    if(wallet.publicKey != null) {
        const transaction = new Transaction();
        transaction.add(await Token.createSetAuthorityInstruction(TOKEN_PROGRAM_ID, mintAddress, null, "MintTokens", wallet.publicKey, []));

        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.feePayer = wallet.publicKey;
        console.log(transaction)
        console.log(ALT)
        if(wallet.signTransaction != undefined) {
            try {
                let signTX = await wallet.signTransaction(ALT);
                const signature = await connection.sendRawTransaction(signTX.serialize());
                console.log("signature ====>", signature);
            } catch(err) {
                console.log("revoking error ====>", err);
            }
        }
    }
}