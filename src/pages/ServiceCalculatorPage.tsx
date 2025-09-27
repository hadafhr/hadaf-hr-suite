import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PricingCalculator } from '@/components/PricingCalculator';
import { BackButton } from '@/components/BackButton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Calculator, Clock } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';

const ServiceCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#00B488]/15 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#008C6A]/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#008C6A" stop-opacity="0.6"/><stop offset="100%" stop-color="#008C6A" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#008C6A]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00B488]/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
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
                <Calculator className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة الاشتراكات' : 'Services Calculator'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            {/* Language Toggle Button */}
            <div className="flex flex-col items-end space-y-4">
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium mr-4">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 transition-all duration-300"
                  >
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-8 py-8 backdrop-blur-xl bg-black/20 rounded-3xl border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 mt-6 mb-6">
        {/* Breadcrumb Navigation */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'حاسبة الاشتراكات' : 'Services Calculator', path: '/hr-tools/service-calculator' }
              ]}
            />
          </div>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-[#008C6A]/30 bg-black/40 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#008C6A]/10">
          <AlertTriangle className="h-4 w-4 text-[#00B488]" />
          <AlertDescription className="text-gray-300">
            <strong className="text-white">{isArabic ? 'عرض سعر تقديري:' : 'Estimated Quote:'}</strong> {' '}
            {isArabic 
              ? 'الأسعار المعروضة تقديرية وقد تختلف حسب المتطلبات والخدمات الإضافية. يُرجى التواصل للحصول على عرض سعر نهائي ومفصل.'
              : 'Displayed prices are estimated and may vary based on requirements and additional services. Please contact us for a final detailed quote.'
            }
          </AlertDescription>
        </Alert>

        <PricingCalculator />
      </main>
    </div>
  );
};

export default ServiceCalculatorPage;