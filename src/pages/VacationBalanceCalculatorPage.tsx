import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Calculator } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Coffee className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حاسبة رصيد الإجازات' : 'Vacation Balance Calculator'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-4">
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
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
                
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 transition-all duration-300"
                  >
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                  </button>
                </div>
              </div>
              
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
                { label: isArabic ? 'حاسبة رصيد الإجازات' : 'Vacation Balance Calculator', path: '/hr-tools/vacation-balance' }
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
            {isArabic ? 'احسب رصيد الإجازات السنوية بدقة قانونية' : 'Calculate Annual Vacation Balance with Legal Accuracy'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'حاسبة معتمدة وفقاً لنظام العمل السعودي - 21 يوم للعقود المحددة، 30 يوم للعقود غير المحددة'
                : 'Certified calculator according to Saudi Labor Law - 21 days for fixed contracts, 30 days for unlimited contracts'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <Calculator className="h-5 w-5" />
                {isArabic ? 'بيانات الموظف' : 'Employee Data'}
              </CardTitle>
              <CardDescription className="text-white/80 relative z-10">
                {isArabic 
                  ? 'أدخل بيانات الموظف لحساب رصيد الإجازات'
                  : 'Enter employee data to calculate vacation balance'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gray-900/40">
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

              <Button onClick={calculateVacationBalance} className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#008C6A]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {isArabic ? 'احسب رصيد الإجازات' : 'Calculate Vacation Balance'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-white relative z-10">
                  {isArabic ? 'رصيد الإجازات' : 'Vacation Balance'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-gray-900/40">
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