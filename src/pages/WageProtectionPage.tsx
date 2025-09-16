import React, { useState } from 'react';
import { WageProtectionPlatform } from '@/components/WageProtectionPlatform';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const WageProtectionPage: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ToolHeader 
        language={language}
        onLanguageToggle={toggleLanguage}
        toolName={language === 'ar' ? 'منصة حماية الأجور' : 'Wage Protection Platform'}
        toolsPath="hr-tools"
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{language === 'ar' ? 'منصة متوافقة 100%:' : '100% Compliant Platform:'}</strong> {' '}
            {language === 'ar' 
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