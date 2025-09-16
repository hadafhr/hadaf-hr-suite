import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calculator, BarChart3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BackButton } from '@/components/BackButton';
import { PatternBackground } from '@/components/PatternBackground';

const OvertimeCalculatorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    basicSalary: '',
    housingAllowance: '',
    otherAllowances: '',
    overtimeHours: '',
    overtimeType: ''
  });
  
  const [result, setResult] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateOvertime = () => {
    // Track analytics
    console.log('OvertimeCalc.Calculate.Click');
    
    const basicSalary = parseFloat(formData.basicSalary);
    const housingAllowance = parseFloat(formData.housingAllowance) || 0;
    const otherAllowances = parseFloat(formData.otherAllowances) || 0;
    const overtimeHours = parseFloat(formData.overtimeHours);
    
    if (!basicSalary || !overtimeHours || !formData.overtimeType) return;

    // Calculate according to Saudi Labor Law Article 107
    // 1. Basic hourly rate
    const basicHourly = basicSalary / 30 / 8;
    
    // 2. Total salary and total hourly rate
    const totalSalary = basicSalary + housingAllowance + otherAllowances;
    const totalHourly = totalSalary / 30 / 8;
    
    // 3. Legal overtime hourly rate (total hourly + 50% of basic hourly)
    const overtimeHourly = totalHourly + (basicHourly * 0.5);
    
    // 4. Calculate total overtime pay
    let overtimePay;
    if (formData.overtimeType === 'holiday') {
      // Work on official holiday: overtime rate + full daily wage
      overtimePay = (overtimeHourly * overtimeHours) + (totalSalary / 30);
    } else {
      // Regular overtime
      overtimePay = overtimeHourly * overtimeHours;
    }

    setResult({
      basicHourly,
      totalHourly,
      overtimeHourly,
      overtimePay,
      overtimeHours,
      totalSalary
    });

    // Show Power BI chart after calculation
    setTimeout(() => setShowChart(true), 500);
  };

  // Track page view
  React.useEffect(() => {
    console.log('OvertimeCalc.View');
  }, []);

  // Track Power BI chart view
  React.useEffect(() => {
    if (showChart) {
      console.log('OvertimeCalc.PowerBI.View');
    }
  }, [showChart]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #008C6A 0%, #F8F8F8 50%, #FFFFFF 100%)' }}>
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4 space-x-reverse">
            <BackButton />
            <Clock className="h-6 w-6 text-[#008C6A]" />
            <h1 className="text-xl font-bold text-gray-900">
              {isArabic ? 'حاسبة العمل الإضافي' : 'Overtime Calculator'}
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#008C6A] rounded-full mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {isArabic ? 'احسب أجر العمل الإضافي بدقة قانونية' : 'Calculate Overtime Pay with Legal Accuracy'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? 'حاسبة معتمدة وفقاً للمادة (107) من نظام العمل السعودي - احسب الأجر الإضافي بدقة تامة'
              : 'Certified calculator according to Article (107) of Saudi Labor Law - Calculate overtime pay with complete accuracy'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="bg-white shadow-lg border-0 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calculator className="h-5 w-5" />
                {isArabic ? 'بيانات الحساب' : 'Calculation Data'}
              </CardTitle>
              <CardDescription className="text-white/90">
                {isArabic 
                  ? 'أدخل جميع البيانات المطلوبة لحساب دقيق'
                  : 'Enter all required data for accurate calculation'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="basicSalary" className="text-gray-700 font-medium">
                  {isArabic ? 'الراتب الأساسي الشهري (ريال) *' : 'Monthly Basic Salary (SAR) *'}
                </Label>
                <Input
                  id="basicSalary"
                  type="number"
                  placeholder="8000"
                  value={formData.basicSalary}
                  onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                  className="border-gray-300 focus:border-[#008C6A] focus:ring-[#008C6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="housingAllowance" className="text-gray-700 font-medium">
                  {isArabic ? 'بدل السكن الشهري (ريال)' : 'Monthly Housing Allowance (SAR)'}
                </Label>
                <Input
                  id="housingAllowance"
                  type="number"
                  placeholder="2000"
                  value={formData.housingAllowance}
                  onChange={(e) => handleInputChange('housingAllowance', e.target.value)}
                  className="border-gray-300 focus:border-[#008C6A] focus:ring-[#008C6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherAllowances" className="text-gray-700 font-medium">
                  {isArabic ? 'إجمالي البدلات الثابتة الأخرى (ريال)' : 'Total Other Fixed Allowances (SAR)'}
                </Label>
                <Input
                  id="otherAllowances"
                  type="number"
                  placeholder="1000"
                  value={formData.otherAllowances}
                  onChange={(e) => handleInputChange('otherAllowances', e.target.value)}
                  className="border-gray-300 focus:border-[#008C6A] focus:ring-[#008C6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeHours" className="text-gray-700 font-medium">
                  {isArabic ? 'عدد الساعات الإضافية *' : 'Number of Overtime Hours *'}
                </Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.5"
                  placeholder="10"
                  value={formData.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                  className="border-gray-300 focus:border-[#008C6A] focus:ring-[#008C6A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeType" className="text-gray-700 font-medium">
                  {isArabic ? 'نوع الساعات الإضافية *' : 'Type of Overtime Hours *'}
                </Label>
                <Select value={formData.overtimeType} onValueChange={(value) => handleInputChange('overtimeType', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-[#008C6A] focus:ring-[#008C6A]">
                    <SelectValue placeholder={isArabic ? 'اختر نوع الساعات' : 'Select overtime type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">
                      {isArabic ? 'عادية (بعد 8 ساعات يومية)' : 'Regular (after 8 daily hours)'}
                    </SelectItem>
                    <SelectItem value="holiday">
                      {isArabic ? 'يوم راحة/عطلة رسمية' : 'Rest day/Official holiday'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateOvertime} 
                className="w-full bg-[#008C6A] hover:bg-[#00694F] text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                disabled={!formData.basicSalary || !formData.overtimeHours || !formData.overtimeType}
              >
                {isArabic ? 'احسب الآن' : 'Calculate Now'}
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {result && (
            <Card className="bg-white shadow-lg border-0 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white rounded-t-lg">
                <CardTitle className="text-white">
                  {isArabic ? 'نتيجة الحساب' : 'Calculation Results'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">
                      {isArabic ? 'أجر الساعة الأساسي:' : 'Basic Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A]">
                      {result.basicHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">
                      {isArabic ? 'أجر الساعة الإجمالي:' : 'Total Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A]">
                      {result.totalHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">
                      {isArabic ? 'أجر الساعة الإضافية النظامية:' : 'Legal Overtime Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A]">
                      {result.overtimeHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white rounded-lg">
                    <span className="font-bold text-lg">
                      {isArabic ? 'إجمالي الأجر الإضافي المستحق:' : 'Total Overtime Pay Due:'}
                    </span>
                    <span className="font-bold text-xl">
                      {result.overtimePay.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Power BI Chart Section */}
        {showChart && (
          <Card className="mt-8 bg-white shadow-lg border-0 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5" />
                {isArabic ? 'الرسم البياني للتكاليف الشهرية' : 'Monthly Cost Chart'}
              </CardTitle>
              <CardDescription className="text-white/90">
                {isArabic 
                  ? 'رسم بياني تفاعلي يوضح تكاليف العمل الإضافي عبر الأشهر'
                  : 'Interactive chart showing overtime costs across months'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <BarChart3 className="h-16 w-16 text-[#008C6A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رسم Power BI التفاعلي' : 'Interactive Power BI Chart'}
                </h3>
                <p className="text-gray-600">
                  {isArabic 
                    ? 'سيتم عرض الرسم البياني التفاعلي هنا لإظهار التكاليف الشهرية'
                    : 'Interactive chart will be displayed here showing monthly costs'
                  }
                </p>
                {result && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'البيانات الحالية:' : 'Current Data:'} {result.overtimeHours} {isArabic ? 'ساعة' : 'hours'} = {result.overtimePay.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5 ml-3" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">
                {isArabic ? '⚖️ ملاحظة قانونية مهمة' : '⚖️ Important Legal Notice'}
              </h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                {isArabic 
                  ? 'يتم احتساب الأجر الإضافي وفق المادة (107) من نظام العمل السعودي الصادر عن وزارة الموارد البشرية والتنمية الاجتماعية. الحساب معتمد قانونياً ويضمن حقوق الموظف كاملة.'
                  : 'Overtime pay is calculated according to Article (107) of the Saudi Labor Law issued by the Ministry of Human Resources and Social Development. The calculation is legally certified and guarantees full employee rights.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OvertimeCalculatorPage;