
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Coins, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PurchaseButtonProps {
  name: string;
  isAvailable: boolean;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ name, isAvailable }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const { toast } = useToast();

  const handlePurchase = () => {
    if (!name || !isAvailable) return;
    
    setIsPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setIsPurchasing(false);
      setIsPurchased(true);
      
      toast({
        title: "Name purchased successfully!",
        description: `${name}.eth is now yours!`,
      });
    }, 2000);
  };

  if (isPurchased) {
    return (
      <Button 
        disabled
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <Check className="mr-2 h-4 w-4" /> Name Purchased
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
          Processing...
        </>
      ) : (
        <>
          <Coins className="mr-2 h-4 w-4" />
          {name ? `Purchase ${name}.eth` : 'Enter a name to purchase'}
        </>
      )}
    </Button>
  );
};

export default PurchaseButton;
