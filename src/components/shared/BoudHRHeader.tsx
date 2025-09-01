import React from 'react';

interface BoudHRHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const BoudHRHeader: React.FC<BoudHRHeaderProps> = ({ 
  title, 
  subtitle, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <img 
          src="/src/assets/boud-hr-logo.png" 
          alt="BOUD HR" 
          className="h-12 w-auto"
        />
      </div>
    </div>
  );
};