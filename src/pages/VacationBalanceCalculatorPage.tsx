import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';

const VacationBalanceCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    employmentDate: '',
    currentDate: '',
    contractType: 'fixed', // fixed or unlimited
    usedDays: '',
    unpaidLeaveDays: ''
  });
  
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateVacationBalance = () => {
    const employmentDate = new Date(formData.employmentDate);
    const currentDate = new Date(formData.currentDate);
    const usedDays = parseFloat(formData.usedDays) || 0;
    const unpaidLeaveDays = parseFloat(formData.unpaidLeaveDays) || 0;
    
    if (!employmentDate || !currentDate) return;

    const diffTime = Math.abs(currentDate.getTime() - employmentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = diffDays / 30;
    const yearsOfService = diffMonths / 12;

    // Annual vacation days based on contract type
    const annualVacationDays = formData.contractType === 'unlimited' ? 30 : 21;
    
    // Calculate accrued vacation days
    const accruedDays = (diffMonths * annualVacationDays) / 12;
    
    // Deduct unpaid leave impact (typically reduces accrual)
    const adjustedAccruedDays = accruedDays - (unpaidLeaveDays * annualVacationDays / 365);
    
    const remainingBalance = Math.max(0, adjustedAccruedDays - usedDays);

    setResult({
      yearsOfService: yearsOfService.toFixed(1),
      annualVacationDays,
      accruedDays: accruedDays.toFixed(1),
      usedDays,
      remainingBalance: remainingBalance.toFixed(1),
      unpaidLeaveDays,
      nextAccrualDate: new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000))
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4 space-x-reverse">
            <BackButton />
            <Coffee className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">
              {isArabic ? 'حاسبة رصيد الإجازات' : 'Vacation Balance Calculator'}
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'احسب رصيد الإجازات السنوية' : 'Calculate Annual Vacation Balance'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? '21 يوم للعقود المحددة، 30 يوم للعقود غير المحددة'
              : '21 days for fixed contracts, 30 days for unlimited contracts'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {isArabic ? 'بيانات الموظف' : 'Employee Data'}
              </CardTitle>
              <CardDescription>
                {isArabic 
                  ? 'أدخل بيانات الموظف لحساب رصيد الإجازات'
                  : 'Enter employee data to calculate vacation balance'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contractType">
                  {isArabic ? 'نوع العقد' : 'Contract Type'}
                </Label>
                <Select value={formData.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">
                      {isArabic ? 'عقد محدد المدة (21 يوم)' : 'Fixed Term Contract (21 days)'}
                    </SelectItem>
                    <SelectItem value="unlimited">
                      {isArabic ? 'عقد غير محدد المدة (30 يوم)' : 'Unlimited Contract (30 days)'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentDate">
                  {isArabic ? 'تاريخ بداية العمل' : 'Employment Start Date'}
                </Label>
                <Input
                  id="employmentDate"
                  type="date"
                  value={formData.employmentDate}
                  onChange={(e) => handleInputChange('employmentDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentDate">
                  {isArabic ? 'التاريخ الحالي' : 'Current Date'}
                </Label>
                <Input
                  id="currentDate"
                  type="date"
                  value={formData.currentDate}
                  onChange={(e) => handleInputChange('currentDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usedDays">
                  {isArabic ? 'الأيام المستخدمة' : 'Used Days'}
                </Label>
                <Input
                  id="usedDays"
                  type="number"
                  placeholder="0"
                  value={formData.usedDays}
                  onChange={(e) => handleInputChange('usedDays', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unpaidLeaveDays">
                  {isArabic ? 'أيام الإجازة بلا أجر' : 'Unpaid Leave Days'}
                </Label>
                <Input
                  id="unpaidLeaveDays"
                  type="number"
                  placeholder="0"
                  value={formData.unpaidLeaveDays}
                  onChange={(e) => handleInputChange('unpaidLeaveDays', e.target.value)}
                />
              </div>

              <Button onClick={calculateVacationBalance} className="w-full">
                {isArabic ? 'احسب رصيد الإجازات' : 'Calculate Vacation Balance'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isArabic ? 'رصيد الإجازات' : 'Vacation Balance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'سنوات الخدمة:' : 'Years of Service:'}
                    </span>
                    <span>{result.yearsOfService} {isArabic ? 'سنة' : 'years'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'الإجازة السنوية:' : 'Annual Vacation:'}
                    </span>
                    <span>{result.annualVacationDays} {isArabic ? 'يوم' : 'days'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'الأيام المستحقة:' : 'Accrued Days:'}
                    </span>
                    <span>{result.accruedDays} {isArabic ? 'يوم' : 'days'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'الأيام المستخدمة:' : 'Used Days:'}
                    </span>
                    <span>{result.usedDays} {isArabic ? 'يوم' : 'days'}</span>
                  </div>

                  {result.unpaidLeaveDays > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? 'إجازة بلا أجر:' : 'Unpaid Leave:'}
                      </span>
                      <span>{result.unpaidLeaveDays} {isArabic ? 'يوم' : 'days'}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t pt-3">
                    <span className="font-bold text-lg">
                      {isArabic ? 'الرصيد المتبقي:' : 'Remaining Balance:'}
                    </span>
                    <span className="font-bold text-lg text-primary">
                      {result.remainingBalance} {isArabic ? 'يوم' : 'days'}
                    </span>
                  </div>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {isArabic 
                        ? 'موعد الاستحقاق التالي:'
                        : 'Next accrual date:'
                      }
                    </p>
                    <p className="font-medium">
                      {result.nextAccrualDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                    </p>
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

export default VacationBalanceCalculatorPage;