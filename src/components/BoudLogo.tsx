import React from 'react';

interface BoudLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'pattern';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'header';
}

const BoudLogo: React.FC<BoudLogoProps> = ({ 
  className, 
  showText = false,
  variant = 'full',
  size = 'md'
}) => {
  // أحجام محددة مسبقاً
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto', 
    xl: 'h-24 w-auto',
    header: 'h-14 w-auto' // حجم خاص للهيدر
  };

  // اختيار الشعار المناسب - الشعار الرسمي الجديد
  const logoSrc = {
    full: '/lovable-uploads/061e5b1e-3dae-47c5-a4bb-7cf75ff2ee1d.png', // الشعار الجديد لـ BOUD HR
    icon: '/lovable-uploads/061e5b1e-3dae-47c5-a4bb-7cf75ff2ee1d.png', // الشعار الجديد لـ BOUD HR
    pattern: '/lovable-uploads/061e5b1e-3dae-47c5-a4bb-7cf75ff2ee1d.png' // للاستخدام كنمط
  };

  const finalClassName = className || sizeClasses[size];

  // في حالة النمط المتكرر
  if (variant === 'pattern') {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden`}>
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${logoSrc.pattern})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '120px 120px',
            backgroundPosition: 'center'
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoSrc[variant]}
        alt="شعار بُعد BOUD HR" 
        className={finalClassName}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">بُعد</span>
          <span className="text-xs text-muted-foreground">BOUD HR</span>
        </div>
      )}
    </div>
  );
};

export { BoudLogo };
export default BoudLogo;