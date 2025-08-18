import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction and language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    // Update body class for RTL styling
    document.body.classList.toggle('rtl', lng === 'ar');
    setIsOpen(false);
    
    // Update URL for language routing
    const path = window.location.pathname;
    const newPath = lng === 'en' ? '/en' : '/';
    if (path !== newPath && (path === '/' || path === '/en')) {
      window.history.replaceState(null, '', newPath);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-primary">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {i18n.language === 'ar' ? t('language.arabic') : t('language.english')}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-32 bg-background border border-border shadow-lg z-50"
      >
        <DropdownMenuItem
          onClick={() => changeLanguage('ar')}
          className={`cursor-pointer ${i18n.language === 'ar' ? 'bg-accent' : ''}`}
        >
          {t('language.arabic')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer ${i18n.language === 'en' ? 'bg-accent' : ''}`}
        >
          {t('language.english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};