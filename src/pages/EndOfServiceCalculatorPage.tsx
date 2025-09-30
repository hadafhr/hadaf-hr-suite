import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EndOfServiceCalculator } from '@/components/EndOfServiceCalculator';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Calculator } from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';
import buodLogo from '@/assets/buod-logo-white.png';

const EndOfServiceCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="hsl(var(--primary))" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-80"></div>
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

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Calculator className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة مكافأة نهاية الخدمة' : 'End of Service Calculator'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            {/* Left Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-card/40 via-card/60 to-card/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-primary/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-border hover:border-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg hover:shadow-primary/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-primary transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-card/20 to-card/30 backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'دقيق' : 'Accurate'}</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'قانوني' : 'Legal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'حاسبة مكافأة نهاية الخدمة' : 'End of Service Calculator', path: '/hr-tools/end-of-service-calculator' }
              ]}
            />
          </div>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-warning bg-warning/10 max-w-6xl mx-auto">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-warning-foreground">
            <strong>{isArabic ? 'نتائج استرشادية:' : 'Guidance Results:'}</strong> {' '}
            {isArabic 
              ? 'هذه الحاسبة مخصصة للاسترشاد فقط ولا تغني عن الاستشارة القانونية المتخصصة. يُرجى الرجوع للعقد والنظام عند النزاع.'
              : 'This calculator is for guidance only and does not replace specialized legal consultation. Please refer to the contract and regulations in case of disputes.'
            }
          </AlertDescription>
        </Alert>

        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-foreground bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent leading-tight">
            {isArabic ? 'احسب مكافأة نهاية الخدمة بدقة قانونية' : 'Calculate End of Service Benefits with Legal Accuracy'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-card backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              {isArabic 
                ? 'حاسبة معتمدة وفقاً لنظام العمل السعودي - احسب مكافأة نهاية الخدمة بدقة تامة مع تجربة تفاعلية متطورة'
                : 'Certified calculator according to Saudi Labor Law - Calculate end of service benefits with complete accuracy and advanced interactive experience'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Enhanced Calculator - Updated to match OvertimeCalculatorPage layout */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-primary transition-all duration-300 rounded-lg">
            <EndOfServiceCalculator />
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-warning/20 to-warning/20 border border-warning/30 rounded-lg backdrop-blur-sm max-w-6xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-warning mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-warning-foreground mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                {isArabic ? 'ملاحظة قانونية مهمة' : 'Important Legal Notice'}
              </h4>
              <p className="text-warning-foreground text-sm leading-relaxed">
                {isArabic 
                  ? 'يتم احتساب مكافأة نهاية الخدمة وفق المواد (84، 85، 87) من نظام العمل السعودي الصادر عن وزارة الموارد البشرية والتنمية الاجتماعية. الحساب معتمد قانونياً ويضمن حقوق الموظف كاملة.'
                  : 'End of service benefits are calculated according to Articles (84, 85, 87) of the Saudi Labor Law issued by the Ministry of Human Resources and Social Development. The calculation is legally certified and guarantees full employee rights.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EndOfServiceCalculatorPage;