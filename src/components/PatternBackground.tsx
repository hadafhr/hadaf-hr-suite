import React from 'react';
import { BoudLogo } from './BoudLogo';

interface PatternBackgroundProps {
  opacity?: number;
  size?: number;
  className?: string;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  opacity = 0.03, 
  size = 150,
  className = ""
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/lovable-uploads/061e5b1e-3dae-47c5-a4bb-7cf75ff2ee1d.png)`,
          backgroundRepeat: 'repeat',
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: 'center',
          opacity: opacity
        }}
      />
    </div>
  );
};

export default PatternBackground;