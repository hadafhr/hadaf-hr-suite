import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const AutoLanguageDetector = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectLanguage = () => {
      // جلب اللغة المحفوظة من localStorage أولاً
      const savedLanguage = localStorage.getItem('app.lang');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        return;
      }

      // فحص لغة المتصفح
      const browserLanguage = navigator.language || navigator.languages[0];
      
      // تحديد اللغة بناء على إعدادات المتصفح
      if (browserLanguage.includes('ar')) {
        i18n.changeLanguage('ar');
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        i18n.changeLanguage('en');
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
      }

      // حفظ اللغة المحددة
      localStorage.setItem('app.lang', i18n.language);
    };

    detectLanguage();

    // الاستماع لتغييرات اللغة
    const handleLanguageChange = (language: string) => {
      localStorage.setItem('app.lang', language);
      
      if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
      }
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return null;
};