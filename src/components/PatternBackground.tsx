import React from 'react';
import { BoudLogo } from './BoudLogo';

interface PatternBackgroundProps {
  opacity?: number;
  size?: number;
  className?: string;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  opacity = 0.03, 
  size = 300,
  className = ""
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center ${className}`}>
      <div 
        className="absolute"
        style={{
          backgroundImage: `url(/lovable-uploads/061e5b1e-3dae-47c5-a4bb-7cf75ff2ee1d.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          opacity: opacity,
          width: `${size}px`,
          height: `${size}px`
        }}
      />
    </div>
  );
};

export default PatternBackground;