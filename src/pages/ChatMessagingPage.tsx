import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatMessaging from '@/components/ChatMessaging';
import { BackButton } from '@/components/BackButton';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, MessageSquare, Clock } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';

export const ChatMessagingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={isArabic ? 'rtl' : 'ltr'}>
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
                <MessageSquare className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'منصة المراسلات الذكية' : 'Smart Messaging Platform'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'آمنة ومشفرة' : 'Secure & Encrypted'}
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
      
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'منصة المراسلات الذكية' : 'Smart Messaging Platform', path: '/hr-tools/chat-messaging' }
              ]}
            />
          </div>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{isArabic ? 'منصة آمنة ومشفرة:' : 'Secure & Encrypted Platform:'}</strong> {' '}
            {isArabic 
              ? 'جميع المراسلات محمية بتشفير من الطرف إلى الطرف. تأكد من عدم مشاركة معلومات حساسة أو شخصية في المحادثات العامة.'
              : 'All communications are protected with end-to-end encryption. Ensure you do not share sensitive or personal information in public conversations.'
            }
          </AlertDescription>
        </Alert>

        <ChatMessaging />
      </main>
    </div>
  );
};