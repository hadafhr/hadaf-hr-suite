import React, { useState } from 'react';
import { PricingCalculator } from '@/components/PricingCalculator';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const ServiceCalculatorPage: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ToolHeader 
        language={language}
        onLanguageToggle={toggleLanguage}
        toolName={language === 'ar' ? 'حاسبة الاشتراكات' : 'Services Calculator'}
        toolsPath="hr-tools"
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{language === 'ar' ? 'عرض سعر تقديري:' : 'Estimated Quote:'}</strong> {' '}
            {language === 'ar' 
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