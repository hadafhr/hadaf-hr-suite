import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  features: string[];
  isPremium?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  route,
  features,
  isPremium = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="service-card group">
      {/* رمز الخدمة */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-3 rounded-lg bg-gradient-primary text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          {isPremium && (
            <span className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              مميز
            </span>
          )}
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* مميزات الخدمة */}
        <ul className="space-y-1.5">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full ml-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
          {features.length > 3 && (
            <li className="text-sm text-muted-foreground">
              + {features.length - 3} ميزة أخرى
            </li>
          )}
        </ul>

        {/* زر الوصول */}
        <Button 
          onClick={() => navigate(route)}
          className="w-full btn-primary group-hover:shadow-glow transition-all duration-300"
        >
          <span>الوصول للمنصة</span>
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};