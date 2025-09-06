import React from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { ArrowRight, Search, Bell, User, Globe } from 'lucide-react';

interface BoudHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const BoudHeader: React.FC<BoudHeaderProps> = ({ 
  title, 
  onBack, 
  showBackButton = true 
}) => {
  return (
    <>
      <header className="bg-white border-b border-separator h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        {/* Right Side - Section Name and Navigation */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-text-secondary hover:text-primary hover:bg-accent transition-colors"
            >
              <ArrowRight className="h-4 w-4 ml-1" />
              <span className="text-sm">لوحة التحكم</span>
            </Button>
          )}
          
          <div className="h-8 w-px bg-separator" />
          
          <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        </div>

        {/* Left Side - Action Icons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-text-secondary hover:text-primary hover:bg-accent transition-colors"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-text-secondary hover:text-primary hover:bg-accent transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <LanguageSwitcher />
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-text-secondary hover:text-primary hover:bg-accent transition-colors"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </>
  );
};