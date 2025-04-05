
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NameDisplayProps {
  name: string;
}

const NameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  return (
    <Card className="border-slate-800/20 bg-gradient-to-br from-crypto-purple/10 to-crypto-blue/10 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-crypto-gradient from-crypto-purple/20 via-crypto-blue/20 to-crypto-teal/20 opacity-30"></div>
      <CardContent className="relative pt-6">
        <div className="flex flex-col items-center justify-center h-48">
          {!name ? (
            <div className="text-2xl text-slate-400 font-medium">
              Your Crypto Name
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple via-crypto-blue to-crypto-teal animate-pulse-glow">
                {name}
                <span className="text-crypto-teal">.eth</span>
              </div>
              <div className="mt-3 text-sm text-slate-400">
                The perfect identity for your crypto wallet
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameDisplay;
