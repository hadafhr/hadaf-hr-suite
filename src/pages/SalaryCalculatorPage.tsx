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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-80"></div>
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
                <Clock className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  {isArabic ? 'حاسبة الرواتب' : 'Salary Calculator'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'حساب دقيق للراتب الصافي' : 'Accurate Net Salary Calculation'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-card via-background to-card backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-border hover:border-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg hover:shadow-primary/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-primary transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/40 group-hover:shadow-primary/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-card to-background backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'دقيق' : 'Accurate'}</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'قانوني' : 'Legal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
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
        <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
            {isArabic ? 'احسب راتبك الصافي بدقة' : 'Calculate Your Net Salary Accurately'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-card backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              {isArabic 
                ? 'حاسبة معتمدة لحساب الراتب الصافي مع خصومات التأمينات الاجتماعية والبدلات وفقاً للنظام السعودي'
                : 'Certified calculator for net salary calculation with GOSI deductions and allowances according to Saudi regulations'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">#START_MAIN_CONTENT#

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-primary transition-all duration-300">
              <CardHeader className="bg-background text-foreground rounded-t-lg relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-background"></div>
                <CardTitle className="text-foreground relative z-10 flex items-center gap-2">
                  <Calculator className="h-5 w-5 animate-pulse" />
                  {isArabic ? 'البيانات الأساسية' : 'Basic Information'}
                </CardTitle>
                <CardDescription className="text-muted-foreground relative z-10">
                  {isArabic 
                    ? 'أدخل بيانات الراتب الأساسي والبدلات'
                    : 'Enter basic salary and allowances information'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 bg-card">
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
            <Card className="bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-primary transition-all duration-300">
              <CardHeader className="bg-background text-foreground rounded-t-lg relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-background"></div>
                <CardTitle className="text-foreground relative z-10 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 animate-pulse" />
                  {isArabic ? 'نتائج الحساب' : 'Calculation Results'}
                </CardTitle>
                <CardDescription className="text-muted-foreground relative z-10">
                  {isArabic 
                    ? 'تفاصيل الراتب والخصومات'
                    : 'Salary details and deductions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-card">
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-200">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {isArabic ? 'الراتب الأساسي:' : 'Basic Salary:'}
                  </span>
                  <span className="font-bold text-lg text-primary">
                    {basicSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-200">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {isArabic ? 'البدلات:' : 'Allowances:'}
                  </span>
                  <span className="font-bold text-lg text-primary">
                    {allowances.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-200">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {isArabic ? 'إجمالي الراتب:' : 'Gross Salary:'}
                  </span>
                  <span className="font-bold text-lg text-primary">
                    {totalSalary.toLocaleString('ar-SA')} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-background rounded-lg border border-border hover:border-primary transition-all duration-200">
                  <span className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                    {isArabic ? 'خصم التأمينات الاجتماعية:' : 'GOSI Deduction:'}
                  </span>
                  <span className="font-bold text-lg text-destructive">
                    -{gosiDeduction.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-6 bg-primary text-primary-foreground rounded-lg shadow-xl relative overflow-hidden">
                  <span className="font-bold text-lg relative z-10 flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary-foreground rounded-full animate-bounce"></span>
                    {isArabic ? 'صافي الراتب:' : 'Net Salary:'}
                  </span>
                  <span className="font-bold text-2xl text-primary-foreground relative z-10 animate-pulse">
                    {netSalary.toLocaleString('ar-SA', { maximumFractionDigits: 2 })} {isArabic ? 'ريال' : 'SAR'}
                  </span>
                </div>

                {nationality === 'saudi' && (
                  <div className="text-sm text-muted-foreground bg-card backdrop-blur-sm p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">{isArabic ? 'ملاحظة قانونية' : 'Legal Note'}</span>
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
                  <div className="text-sm text-muted-foreground bg-card backdrop-blur-sm p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">{isArabic ? 'ملاحظة قانونية' : 'Legal Note'}</span>
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
          <div className="mt-8 p-6 bg-warning/10 backdrop-blur-sm border border-warning/30 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-warning animate-pulse" />
              <span className="font-semibold text-warning">{isArabic ? 'إخلاء مسؤولية' : 'Disclaimer'}</span>
            </div>
            <p className="text-sm text-warning-foreground leading-relaxed">
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