
import React from 'react';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center border-b border-slate-800/10 bg-slate-900/5 backdrop-blur-lg">
      <div className="flex items-center space-x-2">
        <Coins className="h-6 w-6 text-crypto-purple" />
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple to-crypto-blue">
          CryptoNameForge
        </span>
      </div>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className="border-crypto-purple/30 hover:border-crypto-purple text-crypto-purple hover:bg-crypto-purple/10"
        >
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
