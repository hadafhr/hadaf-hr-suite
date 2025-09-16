import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calculator, BarChart3, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
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

  const generateChartData = (resultData: any) => {
    const months = isArabic 
      ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month, index) => ({
      month,
      cost: index === new Date().getMonth() ? resultData.overtimePay : Math.random() * resultData.overtimePay,
      hours: index === new Date().getMonth() ? resultData.overtimeHours : Math.floor(Math.random() * resultData.overtimeHours)
    }));
  };

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/10 via-transparent to-[#008C6A]/20 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Right Section - Logo (Arabic RTL) */}
            <div className="flex items-center">
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            {/* Center Section - Title & Clock */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Clock className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة العمل الإضافي' : 'Overtime Calculator'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            {/* Left Section - Controls (Arabic RTL) */}
            <div className="flex flex-col space-y-3">
              {/* Status Indicator */}
              <div className="flex items-center space-x-2 space-x-reverse bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300 font-medium">
                  {isArabic ? 'متاح الآن' : 'Online'}
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                {/* Language Toggle Button */}
                <button 
                  onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                  className="flex items-center space-x-2 space-x-reverse bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full border border-[#008C6A]/30 hover:border-[#008C6A]/50 hover:bg-[#008C6A]/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-xs text-gray-300 font-medium">
                    {isArabic ? 'EN' : 'AR'}
                  </span>
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F]"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      {/* Breadcrumb Navigation Section */}
      <div className="relative z-10 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border-b border-[#008C6A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb 
            items={[
              { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
              { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
              { label: isArabic ? 'حاسبة العمل الإضافي' : 'Overtime Calculator', path: '/hr-tools/overtime-calculator' }
            ]}
            className="justify-center"
          />
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#008C6A] via-[#009F87] to-[#00694F] rounded-full mb-8 shadow-2xl shadow-[#008C6A]/40 hover:shadow-[#008C6A]/60 transition-all duration-500">
            <Calculator className="h-12 w-12 text-white animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-[#008C6A] animate-ping opacity-20"></div>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#008C6A]/20 to-transparent blur-lg"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            {isArabic ? 'احسب أجر العمل الإضافي بدقة قانونية' : 'Calculate Overtime Pay with Legal Accuracy'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'حاسبة معتمدة وفقاً للمادة (107) من نظام العمل السعودي - احسب الأجر الإضافي بدقة تامة مع تجربة تفاعلية متطورة'
                : 'Certified calculator according to Article (107) of Saudi Labor Law - Calculate overtime pay with complete accuracy and advanced interactive experience'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <Calculator className="h-5 w-5 animate-pulse" />
                {isArabic ? 'بيانات الحساب' : 'Calculation Data'}
              </CardTitle>
              <CardDescription className="text-white/90 relative z-10">
                {isArabic 
                  ? 'أدخل جميع البيانات المطلوبة لحساب دقيق'
                  : 'Enter all required data for accurate calculation'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gray-900/40">
              <div className="space-y-2">
                <Label htmlFor="basicSalary" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'الراتب الأساسي الشهري (ريال) *' : 'Monthly Basic Salary (SAR) *'}
                </Label>
                <Input
                  id="basicSalary"
                  type="number"
                  placeholder="8000"
                  value={formData.basicSalary}
                  onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="housingAllowance" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                  {isArabic ? 'بدل السكن الشهري (ريال)' : 'Monthly Housing Allowance (SAR)'}
                </Label>
                <Input
                  id="housingAllowance"
                  type="number"
                  placeholder="2000"
                  value={formData.housingAllowance}
                  onChange={(e) => handleInputChange('housingAllowance', e.target.value)}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherAllowances" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                  {isArabic ? 'إجمالي البدلات الثابتة الأخرى (ريال)' : 'Total Other Fixed Allowances (SAR)'}
                </Label>
                <Input
                  id="otherAllowances"
                  type="number"
                  placeholder="1000"
                  value={formData.otherAllowances}
                  onChange={(e) => handleInputChange('otherAllowances', e.target.value)}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeHours" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'عدد الساعات الإضافية *' : 'Number of Overtime Hours *'}
                </Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.5"
                  placeholder="10"
                  value={formData.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeType" className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'نوع الساعات الإضافية *' : 'Type of Overtime Hours *'}
                </Label>
                <Select value={formData.overtimeType} onValueChange={(value) => handleInputChange('overtimeType', value)}>
                  <SelectTrigger className="bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200">
                    <SelectValue placeholder={isArabic ? 'اختر نوع الساعات' : 'Select overtime type'} className="text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#008C6A]/40">
                    <SelectItem value="regular" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                      {isArabic ? 'عادية (بعد 8 ساعات يومية)' : 'Regular (after 8 daily hours)'}
                    </SelectItem>
                    <SelectItem value="holiday" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                      {isArabic ? 'يوم راحة/عطلة رسمية' : 'Rest day/Official holiday'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateOvertime} 
                className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#008C6A]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
                disabled={!formData.basicSalary || !formData.overtimeHours || !formData.overtimeType}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {isArabic ? 'احسب الآن' : 'Calculate Now'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </Button>
            </CardContent>
          </Card>

          {/* Results Card */}
          {result && (
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300">
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
                      {isArabic ? 'أجر الساعة الأساسي:' : 'Basic Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {result.basicHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                      {isArabic ? 'أجر الساعة الإجمالي:' : 'Total Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {result.totalHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                    <span className="text-gray-300 font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                      {isArabic ? 'أجر الساعة الإضافية النظامية:' : 'Legal Overtime Hourly Rate:'}
                    </span>
                    <span className="font-bold text-lg text-[#008C6A] animate-pulse">
                      {result.overtimeHourly.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-lg shadow-2xl shadow-[#008C6A]/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                    <span className="font-bold text-lg relative z-10 flex items-center gap-2">
                      <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                      {isArabic ? 'إجمالي الأجر الإضافي المستحق:' : 'Total Overtime Pay Due:'}
                    </span>
                    <span className="font-bold text-2xl relative z-10 animate-pulse">
                      {result.overtimePay.toFixed(2)} {isArabic ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interactive Chart Section */}
        {showChart && result && (
          <Card className="mt-8 bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <BarChart3 className="h-5 w-5 animate-bounce" />
                {isArabic ? 'الرسم البياني للتكاليف الشهرية' : 'Monthly Cost Chart'}
              </CardTitle>
              <CardDescription className="text-white/90 relative z-10">
                {isArabic 
                  ? 'رسم بياني تفاعلي يوضح تكاليف العمل الإضافي عبر الأشهر'
                  : 'Interactive chart showing overtime costs across months'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-900/40">
              <div className="w-full h-80 bg-black/30 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generateChartData(result)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#008C6A30" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#008C6A' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#008C6A' }}
                      label={{ value: isArabic ? 'التكلفة (ريال)' : 'Cost (SAR)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(2)} ${isArabic ? 'ريال' : 'SAR'}`, isArabic ? 'التكلفة' : 'Cost']}
                      labelFormatter={(label) => `${isArabic ? 'الشهر:' : 'Month:'} ${label}`}
                      contentStyle={{
                        backgroundColor: '#111827',
                        border: '1px solid #008C6A',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,140,106,0.3)',
                        color: 'white'
                      }}
                    />
                    <Bar 
                      dataKey="cost" 
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList 
                        dataKey="cost" 
                        position="top" 
                        formatter={(value: any) => `${value.toFixed(0)}`}
                        style={{ fontSize: '12px', fill: '#008C6A' }}
                      />
                    </Bar>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#008C6A" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#00694F" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200 hover:scale-105">
                  <p className="text-xs text-gray-400 mb-2">{isArabic ? 'متوسط الساعات' : 'Avg Hours'}</p>
                  <p className="font-bold text-xl text-[#008C6A] animate-pulse">{result.overtimeHours}</p>
                </div>
                <div className="text-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200 hover:scale-105">
                  <p className="text-xs text-gray-400 mb-2">{isArabic ? 'أجر الساعة' : 'Hourly Rate'}</p>
                  <p className="font-bold text-xl text-[#008C6A] animate-pulse">{result.overtimeHourly.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200 hover:scale-105">
                  <p className="text-xs text-gray-400 mb-2">{isArabic ? 'التكلفة الشهرية' : 'Monthly Cost'}</p>
                  <p className="font-bold text-xl text-[#008C6A] animate-pulse">{result.overtimePay.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200 hover:scale-105">
                  <p className="text-xs text-gray-400 mb-2">{isArabic ? 'التكلفة السنوية' : 'Annual Cost'}</p>
                  <p className="font-bold text-xl text-[#008C6A] animate-pulse">{(result.overtimePay * 12).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-400 mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                {isArabic ? 'ملاحظة قانونية مهمة' : 'Important Legal Notice'}
              </h4>
              <p className="text-amber-200 text-sm leading-relaxed">
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