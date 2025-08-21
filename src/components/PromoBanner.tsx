import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FreeTrialModal } from './FreeTrialModal';

export const PromoBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-primary via-primary-glow to-boud-accent text-white py-3 px-4 relative overflow-hidden">
        <div className="container mx-auto flex items-center justify-center">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Gift className="h-5 w-5 animate-bounce" />
            <span className="font-semibold text-sm md:text-base">
              🎁 جرب النظام مجانًا لمدة 14 يومًا - اشترك الآن!
            </span>
          </div>
          <Button
            variant="ghost" 
            size="sm"
            onClick={() => setIsVisible(false)}
            className="absolute left-2 text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* تأثير الشمر المتحرك */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
      </div>

      <FreeTrialModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};