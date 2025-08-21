import React, { useState } from 'react';
import { SubscriptionPackages } from './SubscriptionPackages';
import { ContactModal } from './ContactModal';
import { DemoRequestModal } from './DemoRequestModal';
import { Button } from './ui/button';
import { ArrowRight, Play, MessageCircle } from 'lucide-react';

interface ServiceCalculatorProps {
  onBack?: () => void;
}

export const ServiceCalculator: React.FC<ServiceCalculatorProps> = ({ onBack }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {onBack && (
        <div className="container mx-auto pt-6 px-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
        </div>
      )}
      
      {/* صفحة الباقات الجديدة */}
      <SubscriptionPackages />
      
      {/* أزرار الإجراءات السريعة */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow flex items-center gap-2"
            onClick={() => setIsDemoModalOpen(true)}
          >
            <Play className="h-5 w-5" />
            اطلب عرضًا توضيحيًا
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsContactModalOpen(true)}
          >
            <MessageCircle className="h-5 w-5" />
            تواصل معنا
          </Button>
        </div>
      </div>

      {/* النماذج */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
};