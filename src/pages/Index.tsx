
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import NameGenerator from '@/components/NameGenerator';
import NameDisplay from '@/components/NameDisplay';
import PurchaseButton from '@/components/PurchaseButton';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [price] = useState(0.02); // Prix fixe de 0.02 SOL selon le programme Anchor
  
  const handleNameChange = (newName: string) => {
    setName(newName);
    // Pour démo, on considère que les noms avec 5+ caractères sont disponibles
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
              Forgez Votre Identité Crypto
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Créez et achetez des noms uniques pour vos portefeuilles crypto. Démarquez-vous dans le monde de la blockchain avec votre identité numérique personnalisée.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <NameGenerator onNameChange={handleNameChange} />
              
              <div className="p-4 bg-slate-800/20 border border-slate-700/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Prix</span>
                  <span className="font-bold text-white">0.02 SOL</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">Réseau</span>
                  <span className="font-semibold text-crypto-teal">Solana (Devnet)</span>
                </div>
                
                <PurchaseButton name={name} isAvailable={isAvailable} price={price} />
              </div>
            </div>
            
            <div>
              <NameDisplay name={name} />
              
              <div className="mt-6 bg-slate-800/20 border border-slate-700/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 text-white">Pourquoi obtenir un nom crypto?</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-purple/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-purple"></div>
                    </div>
                    <span className="ml-2 text-slate-300">Remplacez les adresses complexes par un nom mémorable</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-blue/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-blue"></div>
                    </div>
                    <span className="ml-2 text-slate-300">Sécurisez votre marque dans l'espace blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-crypto-teal/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-crypto-teal"></div>
                    </div>
                    <span className="ml-2 text-slate-300">Un nom fonctionne sur plusieurs blockchains</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 py-6 border-t border-slate-800/20">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 CryptoNameForge - Créez et possédez votre identité crypto</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
