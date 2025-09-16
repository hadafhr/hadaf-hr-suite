import React, { useState } from 'react';
import { EndOfServiceCalculator } from '@/components/EndOfServiceCalculator';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const EndOfServiceCalculatorPage: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ToolHeader 
        language={language}
        onLanguageToggle={toggleLanguage}
        toolName={language === 'ar' ? 'حاسبة مكافأة نهاية الخدمة' : 'End of Service Calculator'}
        toolsPath="hr-tools"
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{language === 'ar' ? 'نتائج استرشادية:' : 'Guidance Results:'}</strong> {' '}
            {language === 'ar' 
              ? 'هذه الحاسبة مخصصة للاسترشاد فقط ولا تغني عن الاستشارة القانونية المتخصصة. يُرجى الرجوع للعقد والنظام عند النزاع.'
              : 'This calculator is for guidance only and does not replace specialized legal consultation. Please refer to the contract and regulations in case of disputes.'
            }
          </AlertDescription>
        </Alert>

        <EndOfServiceCalculator />
      </main>
    </div>
  );
};

export default EndOfServiceCalculatorPage;