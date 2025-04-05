
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PurchaseButtonProps {
  name: string;
  isAvailable: boolean;
  price: number;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ name, isAvailable, price }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!name || !isAvailable) return;
    
    setIsPurchasing(true);

    try {
      // Vérifier si Solana est disponible
      const solana = (window as any).solana;
      if (!solana) {
        toast({
          title: "Wallet non disponible",
          description: "Veuillez installer l'extension Phantom et vous connecter",
          variant: "destructive",
        });
        setIsPurchasing(false);
        return;
      }

      // Vérifier si l'utilisateur est connecté
      if (!solana.isConnected) {
        await solana.connect();
      }

      const wallet = solana.publicKey;
      if (!wallet) {
        toast({
          title: "Wallet non connecté",
          description: "Veuillez vous connecter à votre wallet Solana pour continuer",
          variant: "destructive",
        });
        setIsPurchasing(false);
        return;
      }

      // Créer l'objet connection Solana
      const solanaWeb3 = (window as any).solanaWeb3;
      if (!solanaWeb3) {
        toast({
          title: "Bibliothèque manquante",
          description: "Veuillez rafraîchir la page pour charger les dépendances Solana",
          variant: "destructive",
        });
        setIsPurchasing(false);
        return;
      }

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"), "confirmed");

      // Préparer la transaction
      const lamportsToPay = price * 1_000_000_000; // Convertir SOL en lamports
      const transaction = new solanaWeb3.Transaction();

      // Utiliser l'adresse wallet du snippet HTML fourni
      const destinationWallet = new solanaWeb3.PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg8YNi4zqF6h");

      const transferIx = solanaWeb3.SystemProgram.transfer({
        fromPubkey: wallet,
        toPubkey: destinationWallet,
        lamports: lamportsToPay,
      });

      transaction.add(transferIx);

      // Ici, vous pourrez ajouter les instructions pour appeler votre programme Anchor
      // const programId = new solanaWeb3.PublicKey("VOTRE_PROGRAM_ID");
      // const instruction = ... votre instruction Anchor pour enregistrer le nom ...
      // transaction.add(instruction);

      // Préparer la transaction
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet;

      // Signer et envoyer la transaction
      const signed = await solana.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);

      setTxId(txid);
      setIsPurchased(true);
      
      toast({
        title: "Nom acheté avec succès!",
        description: `${name}.eth est maintenant à vous! Transaction: ${txid.slice(0, 8)}...`,
      });
    } catch (error: any) {
      console.error("Erreur lors de l'achat:", error);
      toast({
        title: "Erreur lors de l'achat",
        description: error.message || "Une erreur est survenue lors de la transaction",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isPurchased) {
    return (
      <Button 
        disabled
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <Check className="mr-2 h-4 w-4" /> Nom Acheté
        {txId && (
          <span className="ml-2 text-xs opacity-70">
            Tx: {txId.slice(0, 6)}...
          </span>
        )}
      </Button>
    );
  }

  return (
    <Button 
      onClick={handlePurchase}
      disabled={!name || !isAvailable || isPurchasing}
      className="w-full bg-gradient-to-r from-crypto-purple to-crypto-blue hover:from-crypto-purple/90 hover:to-crypto-blue/90 transition-all duration-300"
    >
      {isPurchasing ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Transaction en cours...
        </>
      ) : (
        <>
          <Coins className="mr-2 h-4 w-4" />
          {name ? `Acheter ${name}.eth pour ${price.toFixed(2)} SOL` : 'Entrez un nom à acheter'}
        </>
      )}
    </Button>
  );
};

export default PurchaseButton;
