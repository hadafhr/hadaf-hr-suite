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

  // اختيار الشعار المناسب - الشعارات الرسمية الجديدة
  const logoSrc = {
    full: '/lovable-uploads/34b81724-88d2-404d-8192-f65dc4643195.png', // الشعار المستطيل الكامل الرسمي
    icon: '/lovable-uploads/0e845462-6664-4621-9f4e-7af1cd547135.png', // الشعار الصغير الرسمي (BD HR)
    pattern: '/lovable-uploads/0e845462-6664-4621-9f4e-7af1cd547135.png' // للاستخدام كنمط
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