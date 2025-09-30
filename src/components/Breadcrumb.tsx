import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <nav className={`flex items-center space-x-2 space-x-reverse ${className}`}>
      <div className="flex items-center bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border hover:border-primary transition-all duration-300">
        <Home className="h-4 w-4 text-primary ml-2" />
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => {
                console.log('Breadcrumb clicked:', item.path);
                navigate(item.path);
              }}
              className={`text-sm transition-all duration-200 hover:scale-105 ${
                index === items.length - 1
                  ? 'text-primary font-medium cursor-default'
                  : 'text-muted-foreground hover:text-foreground cursor-pointer'
              }`}
              disabled={index === items.length - 1}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <ChevronLeft className={`h-3 w-3 text-muted-foreground mx-2 ${isArabic ? 'rotate-180' : ''}`} />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};