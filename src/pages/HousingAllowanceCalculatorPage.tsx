import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Calculator, BarChart3, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [showChart, setShowChart] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);

  const generateChartData = (resultData: any) => {
    const months = isArabic 
      ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month, index) => ({
      month,
      cost: index === new Date().getMonth() ? resultData.monthlyHousingAllowance : Math.random() * resultData.monthlyHousingAllowance,
      gosi: index === new Date().getMonth() ? resultData.employeeGosi : Math.random() * resultData.employeeGosi
    }));
  };

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

    setIsCalculated(true);
    // Show Power BI chart after calculation
    setTimeout(() => setShowChart(true), 500);
  };

  // Track page view
  React.useEffect(() => {
    console.log('HousingAllowanceCalc.View');
  }, []);

  // Track Power BI chart view
  React.useEffect(() => {
    if (showChart) {
      console.log('HousingAllowanceCalc.PowerBI.View');
    }
  }, [showChart]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            {/* Center Section - Title & Home Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Home className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة بدل السكن' : 'Housing Allowance Calculator'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            {/* Left Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] shadow-lg shadow-[#008C6A]/40 group-hover:shadow-[#008C6A]/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'دقيق' : 'Accurate'}</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'قانوني' : 'Legal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'حاسبة بدل السكن' : 'Housing Allowance Calculator', path: '/hr-tools/housing-allowance' }
              ]}
            />
          </div>
        </div>
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            {isArabic ? 'احسب تأثير بدل السكن بدقة قانونية' : 'Calculate Housing Allowance Impact with Legal Accuracy'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'احسب تأثير بدل السكن على التأمينات الاجتماعية والراتب الصافي مع تجربة تفاعلية متطورة'
                : 'Calculate the impact of housing allowance on GOSI and net salary with advanced interactive experience'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className={`transition-all duration-500 ${!isCalculated ? 'max-w-2xl mx-auto' : 'grid grid-cols-1 lg:grid-cols-2 gap-8'}`}>
          {/* Results Card - Show on Left when calculated */}
          {isCalculated && result && (
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300 order-1 lg:order-1">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-white relative z-10 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 animate-pulse" />
                  {isArabic ? 'نتيجة الحساب' : 'Calculation Results'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-gray-900/40">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                      {isArabic ? 'الراتب الأساسي:' : 'Basic Salary:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {parseFloat(formData.basicSalary).toLocaleString()} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                      {isArabic ? 'بدل السكن الشهري:' : 'Monthly Housing Allowance:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {result.monthlyHousingAllowance.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                      {isArabic ? 'إجمالي التعويض الشهري:' : 'Total Monthly Compensation:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {result.totalCompensation.toLocaleString()} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-lg shadow-2xl shadow-[#008C6A]/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                    <span className="font-bold text-lg relative z-10 flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                      {isArabic ? 'الراتب الصافي النهائي:' : 'Final Net Salary:'}
                    </span>
                    <span className="font-bold text-2xl relative z-10 animate-pulse">
                      {result.netSalary.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Input Card - Centered when not calculated, Right side when calculated */}
          <Card className={`bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300 ${isCalculated ? 'order-2 lg:order-2' : ''}`}>
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <Calculator className="h-5 w-5 animate-pulse" />
                {isArabic ? 'بيانات الراتب' : 'Salary Information'}
              </CardTitle>
              <CardDescription className="text-white/90 relative z-10">
                {isArabic 
                  ? 'أدخل الراتب الأساسي وبدل السكن'
                  : 'Enter basic salary and housing allowance'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gray-900/40">
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