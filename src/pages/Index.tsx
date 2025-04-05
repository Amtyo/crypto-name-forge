
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import NameGenerator from '@/components/NameGenerator';
import NameDisplay from '@/components/NameDisplay';
import PurchaseButton from '@/components/PurchaseButton';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  
  const handleNameChange = (newName: string) => {
    setName(newName);
    // For demo purposes, we'll consider names with 5+ characters as available
    setIsAvailable(newName.length >= 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-crypto-dark">
      <Toaster />
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-crypto-purple to-crypto-teal">
              Forge Your Crypto Identity
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Create and purchase unique names for your crypto wallets. Stand out in the blockchain world with your personalized digital identity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <NameGenerator onNameChange={handleNameChange} />
              
              <div className="p-4 bg-slate-800/20 border border-slate-700/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Price</span>
                  <span className="font-bold text-white">0.01 ETH</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Registration Period</span>
                  <span className="font-semibold text-white">1 Year</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Network</span>
                  <span className="font-semibold text-crypto-teal">Ethereum</span>
                </div>
                
                <PurchaseButton name={name} isAvailable={isAvailable} />
              </div>
            </div>
            
            <div>
              <NameDisplay name={name} />
              
              <div className="mt-6 bg-slate-800/20 border border-slate-700/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-white">Why get a crypto name?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-purple/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-purple"></div>
                    </div>
                    <span className="ml-2 text-slate-300">Replace complex addresses with a memorable name</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-blue/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-blue"></div>
                    </div>
                    <span className="ml-2 text-slate-300">Secure your brand in the blockchain space</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-teal/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-teal"></div>
                    </div>
                    <span className="ml-2 text-slate-300">One name works across multiple blockchains</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 py-6 border-t border-slate-800/20">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 CryptoNameForge - Create and own your crypto identity</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
