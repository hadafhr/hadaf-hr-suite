import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BoudLogo } from '@/components/BoudLogo';
import { PatternBackground } from '@/components/PatternBackground';

const SalaryCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [allowances, setAllowances] = useState<number>(0);
  const [nationality, setNationality] = useState<'saudi' | 'non-saudi'>('saudi');

  const totalSalary = basicSalary + allowances;
  const gosiDeduction = nationality === 'saudi' ? totalSalary * 0.0975 : 0;
  const netSalary = totalSalary - gosiDeduction;

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/hr-tools" className="flex items-center space-x-2 space-x-reverse text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>{isArabic ? 'العودة للأدوات' : 'Back to Tools'}</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <BoudLogo variant="icon" size="md" />
              <h1 className="text-lg font-semibold">
                {isArabic ? 'حاسبة الرواتب' : 'Salary Calculator'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {isArabic ? 'حاسبة الرواتب' : 'Salary Calculator'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isArabic 
                ? 'احسب صافي وإجمالي الراتب مع خصومات التأمينات الاجتماعية والبدلات'
                : 'Calculate net and gross salary with social insurance deductions and allowances'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  {isArabic ? 'البيانات الأساسية' : 'Basic Information'}
                </CardTitle>
                <CardDescription>
                  {isArabic 
                    ? 'أدخل بيانات الراتب الأساسي والبدلات'
                    : 'Enter basic salary and allowances information'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>{isArabic ? 'جنسية الموظف' : 'Employee Nationality'}</Label>
                  <RadioGroup value={nationality} onValueChange={(value: 'saudi' | 'non-saudi') => setNationality(value)}>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="saudi" id="saudi" />
                      <Label htmlFor="saudi">{isArabic ? 'سعودي' : 'Saudi'}</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="non-saudi" id="non-saudi" />
                      <Label htmlFor="non-saudi">{isArabic ? 'غير سعودي' : 'Non-Saudi'}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basic-salary">
                    {isArabic ? 'الراتب الأساسي (ريال)' : 'Basic Salary (SAR)'}
                  </Label>
                  <Input
                    id="basic-salary"
                    type="number"
                    min="0"
                    value={basicSalary || ''}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    placeholder={isArabic ? 'أدخل الراتب الأساسي' : 'Enter basic salary'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowances">
                    {isArabic ? 'البدلات (ريال)' : 'Allowances (SAR)'}
                  </Label>
                  <Input
                    id="allowances"
                    type="number"
                    min="0"
                    value={allowances || ''}
                    onChange={(e) => setAllowances(Number(e.target.value))}
                    placeholder={isArabic ? 'أدخل إجمالي البدلات' : 'Enter total allowances'}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? 'نتائج الحساب' : 'Calculation Results'}</CardTitle>
                <CardDescription>
                  {isArabic 
                    ? 'تفاصيل الراتب والخصومات'
                    : 'Salary details and deductions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'الراتب الأساسي:' : 'Basic Salary:'}
                  </span>
                  <span className="font-semibold">
                    {basicSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'البدلات:' : 'Allowances:'}
                  </span>
                  <span className="font-semibold">
                    {allowances.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'إجمالي الراتب:' : 'Gross Salary:'}
                  </span>
                  <span className="font-semibold">
                    {totalSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">
                    {isArabic ? 'خصم التأمينات الاجتماعية:' : 'GOSI Deduction:'}
                  </span>
                  <span className="font-semibold text-red-600">
                    -{gosiDeduction.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-4">
                  <span className="font-semibold text-lg">
                    {isArabic ? 'صافي الراتب:' : 'Net Salary:'}
                  </span>
                  <span className="font-bold text-lg text-primary">
                    {netSalary.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                {nationality === 'saudi' && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>
                      {isArabic 
                        ? '* يتم خصم 9.75% من إجمالي الراتب للتأمينات الاجتماعية للموظفين السعوديين'
                        : '* 9.75% of gross salary is deducted for GOSI for Saudi employees'
                      }
                    </p>
                  </div>
                )}

                {nationality === 'non-saudi' && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>
                      {isArabic 
                        ? '* لا يتم خصم التأمينات الاجتماعية من رواتب الموظفين غير السعوديين'
                        : '* No GOSI deductions for non-Saudi employees'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              {isArabic 
                ? '⚠️ هذه النتائج استرشادية فقط. يُرجى الرجوع لسياسات الشركة والعقود الرسمية للحصول على المعلومات الدقيقة.'
                : '⚠️ These results are for guidance only. Please refer to company policies and official contracts for accurate information.'
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalaryCalculatorPage;