import React from 'react';
import { BoudHeader } from './BoudHeader';
import { BoudSidebar } from './BoudSidebar';
import { cn } from '@/lib/utils';

interface BoudLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
  showSidebar?: boolean;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  className?: string;
}

export const BoudLayout: React.FC<BoudLayoutProps> = ({
  title,
  children,
  onBack,
  showBackButton = true,
  showSidebar = true,
  activeSection,
  onSectionChange,
  className
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BoudHeader 
        title={title} 
        onBack={onBack} 
        showBackButton={showBackButton} 
      />
      
      <div className="flex flex-1">
        {showSidebar && (
          <BoudSidebar 
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        )}
        
        <main className={cn(
          "flex-1 overflow-auto",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};