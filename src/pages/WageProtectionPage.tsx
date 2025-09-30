import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WageProtectionPlatform } from '@/components/WageProtectionPlatform';
import { BackButton } from '@/components/BackButton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Clock } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';

export const WageProtectionPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl shadow-accent/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            {/* Center Section - Title & Clock */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent">
                  {isArabic ? 'منصة حماية الأجور' : 'Wage Protection Platform'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'متوافقة 100% مع منصة مدد' : '100% Compliant with Mudad'}
                </p>
              </div>
            </div>

            {/* Language Toggle Button */}
            <div className="flex flex-col items-end space-y-4">
              <div className="bg-gradient-to-r from-background/40 via-card/60 to-background/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl shadow-accent/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium mr-4">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-accent/40 hover:border-accent/70 transition-all duration-300"
                  >
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-accent transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'منصة حماية الأجور' : 'Wage Protection Platform', path: '/hr-tools/wage-protection' }
              ]}
            />
          </div>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{isArabic ? 'منصة متوافقة 100%:' : '100% Compliant Platform:'}</strong> {' '}
            {isArabic 
              ? 'منصة حماية الأجور متوافقة بالكامل مع منصة مدد الحكومية. تأكد من دقة البيانات المدخلة لضمان الامتثال الكامل.'
              : 'The Wage Protection Platform is fully compliant with the government Mudad platform. Ensure data accuracy for complete compliance.'
            }
          </AlertDescription>
        </Alert>

        <WageProtectionPlatform />
      </main>
    </div>
  );
};