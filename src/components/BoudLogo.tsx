import React from 'react';

interface BoudLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'pattern';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    xl: 'h-24 w-auto'
  };

  // اختيار الشعار المناسب
  const logoSrc = {
    full: '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png', // الشعار المستطيل الكامل
    icon: '/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png', // الشعار الصغير (أيقونة)
    pattern: '/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png' // للاستخدام كنمط
  };

  const finalClassName = className || sizeClasses[size];

  // في حالة النمط المتكرر
  if (variant === 'pattern') {
    return (
      <div className={`opacity-10 ${finalClassName}`}>
        <img 
          src={logoSrc.pattern}
          alt="" 
          className={finalClassName}
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