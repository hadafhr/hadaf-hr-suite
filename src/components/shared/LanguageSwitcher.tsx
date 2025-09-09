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
    const previousLang = i18n.language;
    i18n.changeLanguage(lng);
    
    // Update document direction
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Save to localStorage
    localStorage.setItem('app.lang', lng);
    
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('ui.lang_changed', {
        from: previousLang,
        to: lng
      });
    }
    
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 h-9 px-3 hover:bg-accent/10 transition-all duration-200"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4 text-foreground" />
          <span className="hidden sm:inline text-sm font-medium">
            {i18n.language === 'ar' ? 'العربية' : 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-32 bg-background border border-border shadow-lg z-50"
        sideOffset={8}
      >
        <DropdownMenuItem
          onClick={() => changeLanguage('ar')}
          className={`cursor-pointer hover:bg-accent/10 transition-colors duration-200 ${
            i18n.language === 'ar' ? 'bg-accent/20 text-accent-foreground' : ''
          }`}
          role="menuitem"
        >
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer hover:bg-accent/10 transition-colors duration-200 ${
            i18n.language === 'en' ? 'bg-accent/20 text-accent-foreground' : ''
          }`}
          role="menuitem"
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};