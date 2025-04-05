
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

const NameGenerator: React.FC<{
  onNameChange: (name: string) => void;
}> = ({ onNameChange }) => {
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.trim().toLowerCase();
    setName(newName);
    onNameChange(newName);
    
    // Simulate availability check
    if (newName.length < 3) {
      setIsAvailable(null);
    } else {
      // This is a mock - in a real app, this would be an API call
      setTimeout(() => {
        // For the demo, we'll say names shorter than 5 chars are "taken"
        setIsAvailable(newName.length >= 5);
      }, 500);
    }
  };

  return (
    <Card className="border-slate-800/20 bg-white/5 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Create Your Crypto Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter your unique name"
                value={name}
                onChange={handleNameChange}
                className="pr-20 border-slate-800/20 bg-white/10 focus:border-crypto-purple focus:ring-crypto-purple/20"
              />
              <div className="absolute right-3 top-2.5">
                {isAvailable === true && (
                  <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Available
                  </Badge>
                )}
                {isAvailable === false && (
                  <Badge variant="outline" className="border-red-500 bg-red-500/10 text-red-500 flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" />
                    Taken
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-slate-500/30 hover:bg-slate-500/10 cursor-pointer">
              .crypto
            </Badge>
            <Badge variant="outline" className="border-crypto-purple/30 hover:bg-crypto-purple/10 cursor-pointer">
              .eth
            </Badge>
            <Badge variant="outline" className="border-crypto-blue/30 hover:bg-crypto-blue/10 cursor-pointer">
              .btc
            </Badge>
            <Badge variant="outline" className="border-crypto-teal/30 hover:bg-crypto-teal/10 cursor-pointer">
              .sol
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NameGenerator;
