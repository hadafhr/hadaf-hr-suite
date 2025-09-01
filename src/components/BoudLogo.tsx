import React from 'react';

interface BoudLogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BoudLogo: React.FC<BoudLogoProps> = ({ 
  variant = 'full', 
  size = 'md',
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-[#009F87] p-2 rounded-lg">
        <span className="text-white font-bold text-lg">بُعد</span>
      </div>
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="text-[#009F87] font-bold text-sm">نظم الموارد البشرية</span>
          <span className="text-muted-foreground text-xs">BOUD HR Systems</span>
        </div>
      )}
    </div>
  );
};