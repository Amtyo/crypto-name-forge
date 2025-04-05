
import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar: React.FC = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    try {
      // Vérifier si l'extension Phantom est installée
      const solana = (window as any).solana;
      
      if (!solana) {
        toast({
          title: "Wallet non trouvé",
          description: "Veuillez installer l'extension Phantom pour continuer",
          variant: "destructive",
        });
        return;
      }

      // Connecter au wallet
      await solana.connect();
      const publicKey = solana.publicKey.toString();
      setWallet(publicKey);
      
      toast({
        title: "Wallet connecté",
        description: `Connecté avec ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`,
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter au wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    try {
      const solana = (window as any).solana;
      if (solana && solana.disconnect) {
        solana.disconnect();
      }
      setWallet(null);
      toast({
        title: "Wallet déconnecté",
        description: "Vous êtes maintenant déconnecté",
      });
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  // Vérifier si un wallet est déjà connecté au chargement
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const solana = (window as any).solana;
        if (solana && solana.isConnected) {
          const publicKey = solana.publicKey.toString();
          setWallet(publicKey);
        }
      } catch (error) {
        console.error("Erreur de vérification de connexion:", error);
      }
    };

    checkConnection();
  }, []);

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-slate-800/10 bg-slate-900/5 backdrop-blur-lg">
      <div className="flex items-center space-x-2">
        <Coins className="h-6 w-6 text-crypto-purple" />
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple to-crypto-blue">
          CryptoNameForge
        </span>
      </div>
      <div className="flex space-x-4">
        {!wallet ? (
          <Button 
            onClick={connectWallet}
            variant="outline" 
            className="border-crypto-purple/30 hover:border-crypto-purple text-crypto-purple hover:bg-crypto-purple/10"
          >
            Connecter Wallet Solana
          </Button>
        ) : (
          <Button 
            onClick={disconnectWallet}
            variant="outline" 
            className="border-crypto-teal/30 hover:border-crypto-teal text-crypto-teal hover:bg-crypto-teal/10"
          >
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
