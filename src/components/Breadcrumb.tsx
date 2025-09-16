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
      <div className="flex items-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
        <Home className="h-4 w-4 text-[#008C6A] ml-2" />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => navigate(item.path)}
              className={`text-sm transition-all duration-200 hover:scale-105 ${
                index === items.length - 1
                  ? 'text-[#008C6A] font-medium cursor-default'
                  : 'text-gray-300 hover:text-white'
              }`}
              disabled={index === items.length - 1}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <ChevronLeft className={`h-3 w-3 text-gray-500 mx-2 ${isArabic ? 'rotate-180' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};