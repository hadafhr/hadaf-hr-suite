import React from 'react';

interface BoudLogoProps {
  className?: string;
  showText?: boolean;
}

export const BoudLogo: React.FC<BoudLogoProps> = ({ 
  className = "h-12 w-auto", 
  showText = false 
}) => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/public/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png" 
        alt="شعار بُعد BOUD" 
        className={className}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[#009F87]">بُعد</span>
          <span className="text-xs text-muted-foreground">BOUD</span>
        </div>
      )}
    </div>
  );
};