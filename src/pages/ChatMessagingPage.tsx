import React, { useState } from 'react';
import ChatMessaging from '@/components/ChatMessaging';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const ChatMessagingPage: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ToolHeader 
        language={language}
        onLanguageToggle={toggleLanguage}
        toolName={language === 'ar' ? 'منصة المراسلات الذكية' : 'Smart Messaging Platform'}
        toolsPath="hr-tools"
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{language === 'ar' ? 'منصة آمنة ومشفرة:' : 'Secure & Encrypted Platform:'}</strong> {' '}
            {language === 'ar' 
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