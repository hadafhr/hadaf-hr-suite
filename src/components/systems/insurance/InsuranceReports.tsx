import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Download, Calendar } from 'lucide-react';

const InsuranceReports = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">
                {isRTL ? 'التقرير الأسبوعي' : 'Weekly Report'}
              </h3>
              <Button className="bg-[#3CB593] hover:bg-[#2da574]">
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">
                {isRTL ? 'التقرير الشهري' : 'Monthly Report'}
              </h3>
              <Button className="bg-[#3CB593] hover:bg-[#2da574]">
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800 mb-2">
                {isRTL ? 'تقرير المخاطر' : 'Risk Analysis'}
              </h3>
              <Button className="bg-[#3CB593] hover:bg-[#2da574]">
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceReports;