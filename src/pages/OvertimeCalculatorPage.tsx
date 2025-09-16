import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';

const OvertimeCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    basicSalary: '',
    overtimeHours: '',
    isHoliday: false,
    isFriday: false
  });
  
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateOvertime = () => {
    const basicSalary = parseFloat(formData.basicSalary);
    const overtimeHours = parseFloat(formData.overtimeHours);
    
    if (!basicSalary || !overtimeHours) return;

    const hourlyRate = basicSalary / 240; // 30 days × 8 hours
    let overtimeRate = 1.5; // 150% for normal overtime

    if (formData.isHoliday || formData.isFriday) {
      overtimeRate = 2; // 200% for holidays and Fridays
    }

    const overtimePay = hourlyRate * overtimeHours * overtimeRate;
    const totalPay = basicSalary + overtimePay;

    setResult({
      hourlyRate,
      overtimeRate,
      overtimePay,
      totalPay,
      overtimeHours
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4 space-x-reverse">
            <BackButton />
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">
              {isArabic ? 'حاسبة العمل الإضافي' : 'Overtime Calculator'}
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'احسب أجر العمل الإضافي' : 'Calculate Overtime Pay'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? '150% للساعة الإضافية العادية، 200% للعطل والجمعة'
              : '150% for regular overtime, 200% for holidays and Fridays'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {isArabic ? 'بيانات الحساب' : 'Calculation Data'}
              </CardTitle>
              <CardDescription>
                {isArabic 
                  ? 'أدخل الراتب الأساسي وساعات العمل الإضافي'
                  : 'Enter basic salary and overtime hours'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="basicSalary">
                  {isArabic ? 'الراتب الأساسي (ريال)' : 'Basic Salary (SAR)'}
                </Label>
                <Input
                  id="basicSalary"
                  type="number"
                  placeholder="5000"
                  value={formData.basicSalary}
                  onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeHours">
                  {isArabic ? 'ساعات العمل الإضافي' : 'Overtime Hours'}
                </Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.5"
                  placeholder="10"
                  value={formData.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="isHoliday"
                    checked={formData.isHoliday}
                    onCheckedChange={(checked) => handleInputChange('isHoliday', !!checked)}
                  />
                  <Label htmlFor="isHoliday">
                    {isArabic ? 'عمل في العطلة الرسمية' : 'Work on Official Holiday'}
                  </Label>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="isFriday"
                    checked={formData.isFriday}
                    onCheckedChange={(checked) => handleInputChange('isFriday', !!checked)}
                  />
                  <Label htmlFor="isFriday">
                    {isArabic ? 'عمل يوم الجمعة' : 'Work on Friday'}
                  </Label>
                </div>
              </div>

              <Button onClick={calculateOvertime} className="w-full">
                {isArabic ? 'احسب العمل الإضافي' : 'Calculate Overtime'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isArabic ? 'نتيجة الحساب' : 'Calculation Result'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'الأجر بالساعة:' : 'Hourly Rate:'}
                    </span>
                    <span>{result.hourlyRate.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'نسبة العمل الإضافي:' : 'Overtime Rate:'}
                    </span>
                    <span>{(result.overtimeRate * 100)}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'ساعات العمل الإضافي:' : 'Overtime Hours:'}
                    </span>
                    <span>{result.overtimeHours} {isArabic ? 'ساعة' : 'hours'}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">
                      {isArabic ? 'أجر العمل الإضافي:' : 'Overtime Pay:'}
                    </span>
                    <span className="font-medium text-primary">
                      {result.overtimePay.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between border-t pt-3">
                    <span className="font-bold text-lg">
                      {isArabic ? 'إجمالي الراتب:' : 'Total Salary:'}
                    </span>
                    <span className="font-bold text-lg text-primary">
                      {result.totalPay.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default OvertimeCalculatorPage;