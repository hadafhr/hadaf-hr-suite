import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calculator, BarChart3, AlertCircle } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

            {/* Center Section - Title & Clock */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Clock className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة الرواتب' : 'Salary Calculator'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب دقيق للراتب الصافي' : 'Accurate Net Salary Calculation'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
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
                { label: isArabic ? 'حاسبة الرواتب' : 'Salary Calculator', path: '/hr-tools/salary-calculator' }
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
            {isArabic ? 'احسب راتبك الصافي بدقة' : 'Calculate Your Net Salary Accurately'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'حاسبة معتمدة لحساب الراتب الصافي مع خصومات التأمينات الاجتماعية والبدلات وفقاً للنظام السعودي'
                : 'Certified calculator for net salary calculation with GOSI deductions and allowances according to Saudi regulations'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">#START_MAIN_CONTENT#

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-white relative z-10 flex items-center gap-2">
                  <Calculator className="h-5 w-5 animate-pulse" />
                  {isArabic ? 'البيانات الأساسية' : 'Basic Information'}
                </CardTitle>
                <CardDescription className="text-white/90 relative z-10">
                  {isArabic 
                    ? 'أدخل بيانات الراتب الأساسي والبدلات'
                    : 'Enter basic salary and allowances information'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-gray-900/40">
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
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-white relative z-10 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 animate-pulse" />
                  {isArabic ? 'نتائج الحساب' : 'Calculation Results'}
                </CardTitle>
                <CardDescription className="text-white/90 relative z-10">
                  {isArabic 
                    ? 'تفاصيل الراتب والخصومات'
                    : 'Salary details and deductions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-gray-900/40">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                    {isArabic ? 'الراتب الأساسي:' : 'Basic Salary:'}
                  </span>
                  <span className="font-bold text-lg text-[#008C6A]">
                    {basicSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                    {isArabic ? 'البدلات:' : 'Allowances:'}
                  </span>
                  <span className="font-bold text-lg text-[#008C6A]">
                    {allowances.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                    {isArabic ? 'إجمالي الراتب:' : 'Gross Salary:'}
                  </span>
                  <span className="font-bold text-lg text-[#008C6A]">
                    {totalSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    {isArabic ? 'خصم التأمينات الاجتماعية:' : 'GOSI Deduction:'}
                  </span>
                  <span className="font-bold text-lg text-red-400">
                    -{gosiDeduction.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-lg shadow-2xl shadow-[#008C6A]/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                  <span className="font-bold text-lg relative z-10 flex items-center gap-2">
                    <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
                    {isArabic ? 'صافي الراتب:' : 'Net Salary:'}
                  </span>
                  <span className="font-bold text-2xl text-white relative z-10 animate-pulse">
                    {netSalary.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                {nationality === 'saudi' && (
                  <div className="text-sm text-gray-300 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-[#008C6A]" />
                      <span className="font-medium text-[#008C6A]">{isArabic ? 'ملاحظة قانونية' : 'Legal Note'}</span>
                    </div>
                    <p>
                      {isArabic 
                        ? '* يتم خصم 9.75% من إجمالي الراتب للتأمينات الاجتماعية للموظفين السعوديين'
                        : '* 9.75% of gross salary is deducted for GOSI for Saudi employees'
                      }
                    </p>
                  </div>
                )}

                {nationality === 'non-saudi' && (
                  <div className="text-sm text-gray-300 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-[#008C6A]" />
                      <span className="font-medium text-[#008C6A]">{isArabic ? 'ملاحظة قانونية' : 'Legal Note'}</span>
                    </div>
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
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-900/60 via-orange-800/60 to-orange-900/60 backdrop-blur-sm border border-orange-400/30 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-orange-300 animate-pulse" />
              <span className="font-semibold text-orange-200">{isArabic ? 'إخلاء مسؤولية' : 'Disclaimer'}</span>
            </div>
            <p className="text-sm text-orange-100 leading-relaxed">
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