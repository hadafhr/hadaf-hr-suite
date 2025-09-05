import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Brain, TrendingUp, DollarSign, Shield, Star } from 'lucide-react';

const QuoteOptimizer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'محسن العروض بالذكاء الاصطناعي' : 'AI-Powered Quote Optimizer'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">
                {isRTL ? 'تحليل ذكي' : 'Smart Analysis'}
              </h3>
              <p className="text-sm text-blue-600">
                {isRTL ? 'تحليل العروض بالذكاء الاصطناعي' : 'AI-powered quote analysis'}
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">
                {isRTL ? 'توفير التكاليف' : 'Cost Savings'}
              </h3>
              <p className="text-sm text-green-600">
                {isRTL ? 'تحسين التكاليف والوفورات' : 'Cost optimization and savings'}
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800 mb-2">
                {isRTL ? 'ضمان الجودة' : 'Quality Assurance'}
              </h3>
              <p className="text-sm text-purple-600">
                {isRTL ? 'ضمان جودة التغطية' : 'Coverage quality assurance'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteOptimizer;