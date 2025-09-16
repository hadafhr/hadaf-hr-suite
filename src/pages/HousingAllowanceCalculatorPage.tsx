import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Calculator, AlertTriangle } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';

const HousingAllowanceCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    basicSalary: '',
    allowanceType: 'monthly', // monthly or annual
    housingAllowance: '',
    includeInGOSI: false
  });
  
  const [result, setResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateImpact = () => {
    const basicSalary = parseFloat(formData.basicSalary);
    const housingAllowance = parseFloat(formData.housingAllowance);
    
    if (!basicSalary || !housingAllowance) return;

    // Convert to monthly if annual
    const monthlyHousingAllowance = formData.allowanceType === 'annual' 
      ? housingAllowance / 12 
      : housingAllowance;

    // GOSI calculation (9.75% for employee, 12.25% for employer)
    const employeeGosiRate = 0.0975;
    const employerGosiRate = 0.1225;

    let gosiSalaryBase = basicSalary;
    if (formData.includeInGOSI) {
      gosiSalaryBase += monthlyHousingAllowance;
    }

    // GOSI cap (45,000 SAR)
    const gosiCap = 45000;
    const gosiCalculationBase = Math.min(gosiSalaryBase, gosiCap);

    const employeeGosi = gosiCalculationBase * employeeGosiRate;
    const employerGosi = gosiCalculationBase * employerGosiRate;

    const totalCompensation = basicSalary + monthlyHousingAllowance;
    const netSalary = totalCompensation - employeeGosi;

    // Annual calculations
    const annualHousingAllowance = monthlyHousingAllowance * 12;
    const annualGrossCompensation = totalCompensation * 12;
    const annualEmployeeGosi = employeeGosi * 12;
    const annualEmployerGosi = employerGosi * 12;

    setResult({
      monthlyHousingAllowance,
      annualHousingAllowance,
      totalCompensation,
      gosiCalculationBase,
      employeeGosi,
      employerGosi,
      netSalary,
      annualGrossCompensation,
      annualEmployeeGosi,
      annualEmployerGosi,
      includeInGOSI: formData.includeInGOSI
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4 space-x-reverse">
            <BackButton />
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">
              {isArabic ? 'حاسبة بدل السكن' : 'Housing Allowance Calculator'}
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'احسب تأثير بدل السكن' : 'Calculate Housing Allowance Impact'}
          </h2>
          <p className="text-muted-foreground">
            {isArabic 
              ? 'احسب تأثير بدل السكن على التأمينات الاجتماعية والراتب الصافي'
              : 'Calculate the impact of housing allowance on GOSI and net salary'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {isArabic ? 'بيانات الراتب' : 'Salary Information'}
              </CardTitle>
              <CardDescription>
                {isArabic 
                  ? 'أدخل الراتب الأساسي وبدل السكن'
                  : 'Enter basic salary and housing allowance'
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
                  placeholder="8000"
                  value={formData.basicSalary}
                  onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowanceType">
                  {isArabic ? 'نوع البدل' : 'Allowance Type'}
                </Label>
                <Select value={formData.allowanceType} onValueChange={(value) => handleInputChange('allowanceType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">
                      {isArabic ? 'شهري' : 'Monthly'}
                    </SelectItem>
                    <SelectItem value="annual">
                      {isArabic ? 'سنوي' : 'Annual'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="housingAllowance">
                  {isArabic 
                    ? `بدل السكن (${formData.allowanceType === 'monthly' ? 'شهري' : 'سنوي'}) - ريال`
                    : `Housing Allowance (${formData.allowanceType}) - SAR`
                  }
                </Label>
                <Input
                  id="housingAllowance"
                  type="number"
                  placeholder={formData.allowanceType === 'monthly' ? '2000' : '24000'}
                  value={formData.housingAllowance}
                  onChange={(e) => handleInputChange('housingAllowance', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="includeInGOSI"
                  checked={formData.includeInGOSI}
                  onCheckedChange={(checked) => handleInputChange('includeInGOSI', !!checked)}
                />
                <Label htmlFor="includeInGOSI" className="text-sm">
                  {isArabic 
                    ? 'يدخل بدل السكن في حساب التأمينات الاجتماعية'
                    : 'Include housing allowance in GOSI calculation'
                  }
                </Label>
              </div>

              <Button onClick={calculateImpact} className="w-full">
                {isArabic ? 'احسب التأثير' : 'Calculate Impact'}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {isArabic ? 'تفصيل الراتب' : 'Salary Breakdown'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'الراتب الأساسي:' : 'Basic Salary:'}
                    </span>
                    <span>{parseFloat(formData.basicSalary).toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isArabic ? 'بدل السكن الشهري:' : 'Monthly Housing Allowance:'}
                    </span>
                    <span>{result.monthlyHousingAllowance.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                  </div>

                  <div className="flex justify-between border-t pt-3">
                    <span className="font-medium">
                      {isArabic ? 'إجمالي الراتب:' : 'Total Compensation:'}
                    </span>
                    <span className="font-medium">
                      {result.totalCompensation.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">
                      {isArabic ? 'التأمينات الاجتماعية (GOSI)' : 'GOSI Calculation'}
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isArabic ? 'الأساس المحتسب:' : 'Calculation Base:'}
                      </span>
                      <span>{result.gosiCalculationBase.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isArabic ? 'خصم الموظف (9.75%):' : 'Employee Deduction (9.75%):'}
                      </span>
                      <span>{result.employeeGosi.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isArabic ? 'تحمل صاحب العمل (12.25%):' : 'Employer Contribution (12.25%):'}
                      </span>
                      <span>{result.employerGosi.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
                  </div>

                  <div className="flex justify-between border-t pt-3">
                    <span className="font-bold text-lg">
                      {isArabic ? 'الراتب الصافي:' : 'Net Salary:'}
                    </span>
                    <span className="font-bold text-lg text-primary">
                      {result.netSalary.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="bg-primary/5 p-3 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">
                      {isArabic ? 'الحساب السنوي' : 'Annual Calculation'}
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isArabic ? 'بدل السكن السنوي:' : 'Annual Housing Allowance:'}
                      </span>
                      <span>{result.annualHousingAllowance.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isArabic ? 'إجمالي الراتب السنوي:' : 'Annual Gross Compensation:'}
                      </span>
                      <span>{result.annualGrossCompensation.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}</span>
                    </div>
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

export default HousingAllowanceCalculatorPage;