import React, { useState } from 'react';
import { Globe, ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const MobileLogin: React.FC = () => {
  const [organizationName, setOrganizationName] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (organizationName.trim()) {
      // Navigate to organization-specific login or handle subdomain logic
      console.log('Organization:', `${organizationName}.boud.com.sa`);
      navigate('/employee-login');
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Language Switcher - Top Left */}
      <div className={`absolute top-8 ${isArabic ? 'right-4' : 'left-4'} z-10`}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleLanguage}
          className="gap-2 text-[#1A1A1A] hover:text-[#00BFA6] transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {isArabic ? 'English' : 'عربي'}
          </span>
        </Button>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        
        {/* Logo Section */}
        <div className="text-center mb-8 mt-8">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/dbf35ad7-663d-4261-9fd0-178e0b804802.png" 
              alt="BOUD HR Logo" 
              className="h-20 w-auto mx-auto"
            />
          </div>
          
          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-[#00BFA6] mb-2">
            {isArabic ? 'مرحباً بك' : 'Welcome'}
          </h1>
          <p className="text-[#1A1A1A] text-lg opacity-80">
            {isArabic ? 'في نظام بُعد لإدارة الموارد البشرية' : 'to BOUD HR Management System'}
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Name Field */}
            <div className="space-y-3">
              <Label 
                htmlFor="organizationName" 
                className="text-base font-medium text-[#1A1A1A] block"
              >
                {isArabic ? 'اسم المنشأة' : 'Organization Name'}
              </Label>
              <div className="relative">
                <Input
                  id="organizationName"
                  type="text"
                  placeholder={isArabic ? 'اسم المنشأة' : 'Organization Name'}
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="h-14 text-base border-2 border-[#EAEAEA] rounded-xl focus:border-[#00BFA6] focus:ring-[#00BFA6] pr-4 pl-4"
                  required
                />
                <div className="absolute top-1/2 transform -translate-y-1/2 right-3 text-sm text-[#1A1A1A] opacity-60 pointer-events-none">
                  .boud.com.sa
                </div>
              </div>
              {organizationName && (
                <p className="text-sm text-[#00BFA6] font-medium animate-fade-in">
                  {`${organizationName}.boud.com.sa`}
                </p>
              )}
            </div>

            {/* Continue Button */}
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              disabled={!organizationName.trim()}
            >
              <span>{isArabic ? 'متابعة' : 'Continue'}</span>
              <ArrowRight className={`h-5 w-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </form>

          {/* Download App Section */}
          <div className="text-center pt-8 border-t border-[#EAEAEA]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Smartphone className="h-6 w-6 text-[#00BFA6]" />
              <p className="text-[#1A1A1A] font-medium">
                {isArabic ? 'حمل تطبيق بُعد' : 'Download BOUD HR App'}
              </p>
            </div>
            
            <p className="text-sm text-[#1A1A1A] opacity-70 mb-4">
              {isArabic 
                ? 'احصل على تجربة أفضل مع التطبيق المحمول'
                : 'Get a better experience with our mobile app'
              }
            </p>

            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-white transition-colors"
              >
                {isArabic ? 'آب ستور' : 'App Store'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-white transition-colors"
              >
                {isArabic ? 'جوجل بلاي' : 'Google Play'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-sm text-[#1A1A1A] opacity-60">
          © 2024 BOUD HR. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
        </p>
      </div>
    </div>
  );
};