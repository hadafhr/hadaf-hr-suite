import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BoudLogo } from '@/components/BoudLogo';
import { BackButton } from '@/components/BackButton';
import { Calculator, Download, Mail, Eye, EyeOff, Info, Calendar, Clock, Users, DollarSign, FileText, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import moment from 'moment-hijri';

export const EndOfServiceCalculator: React.FC = () => {
  // Basic Information State
  const [dateType, setDateType] = useState<'hijri' | 'gregorian'>('gregorian');
  const [employeeType, setEmployeeType] = useState<'saudi' | 'non-saudi'>('saudi');
  const [basicSalary, setBasicSalary] = useState('');
  const [allowances, setAllowances] = useState('');
  const [totalSalary, setTotalSalary] = useState('');
  const [salaryAfterInsurance, setSalaryAfterInsurance] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [email, setEmail] = useState('');

  // Calculator States
  const [delayedWages, setDelayedWages] = useState({
    method: 'period' as 'period' | 'direct',
    startDate: '',
    endDate: '',
    months: '',
    days: '',
    result: 0
  });

  const [endOfService, setEndOfService] = useState({
    method: 'article84' as 'article84' | 'article85',
    startDate: '',
    endDate: '',
    unpaidLeaveDays: '',
    result: 0
  });

  const [vacationPay, setVacationPay] = useState({
    vacationDays: '',
    result: 0
  });

  const [overtime, setOvertime] = useState({
    dailyHours: '8',
    overtimeHours: '',
    overtimeDays: '',
    result: 0
  });

  const [termination, setTermination] = useState({
    contractType: 'unlimited' as 'unlimited' | 'limited',
    remainingStartDate: '',
    remainingEndDate: '',
    result: 0
  });

  const [vacationDays, setVacationDays] = useState({
    firstFiveYearsDays: '21',
    afterFiveYearsDays: '30',
    serviceStartDate: '',
    serviceEndDate: '',
    result: 0
  });

  const [deductions, setDeductions] = useState({
    dailyHours: '8',
    absenceDays: '',
    lateHours: '',
    lateMinutes: '',
    result: 0
  });

  const [averageWage, setAverageWage] = useState({
    monthlyWages: Array(12).fill(''),
    result: { monthly: 0, daily: 0, hourly: 0 }
  });

  const [showDetails, setShowDetails] = useState(false);

  // Auto-calculate total salary
  React.useEffect(() => {
    const basic = parseFloat(basicSalary) || 0;
    const allowance = parseFloat(allowances) || 0;
    const total = basic + allowance;
    setTotalSalary(total.toString());
    
    // Auto-calculate salary after insurance
    let afterInsurance = total;
    if (employeeType === 'saudi') {
      // Saudi employees: 9.75% deduction for partial coverage
      const insuranceDeduction = basic * 0.0975; // Only from basic salary typically
      afterInsurance = total - insuranceDeduction;
    }
    // Non-Saudi: no employee deduction
    setSalaryAfterInsurance(afterInsurance.toFixed(2));
  }, [basicSalary, allowances, employeeType]);

  // Helper functions for date calculations
  const calculateDaysBetween = (start: string, end: string, type: 'hijri' | 'gregorian'): number => {
    if (!start || !end) return 0;
    
    if (type === 'hijri') {
      const startMoment = moment(start, 'iYYYY-iMM-iDD');
      const endMoment = moment(end, 'iYYYY-iMM-iDD');
      return endMoment.diff(startMoment, 'days') + 1;
    } else {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = endDate.getTime() - startDate.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
  };

  const calculateYearsBetween = (start: string, end: string, type: 'hijri' | 'gregorian'): number => {
    if (!start || !end) return 0;
    
    if (type === 'hijri') {
      const startMoment = moment(start, 'iYYYY-iMM-iDD');
      const endMoment = moment(end, 'iYYYY-iMM-iDD');
      return endMoment.diff(startMoment, 'years', true);
    } else {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = endDate.getTime() - startDate.getTime();
      return diffTime / (1000 * 60 * 60 * 24 * 365.25);
    }
  };

  // Calculator functions
  const calculateDelayedWages = () => {
    const salary = parseFloat(salaryAfterInsurance) || 0;
    const dailyWage = salary / 30;
    
    let result = 0;
    if (delayedWages.method === 'period') {
      const days = calculateDaysBetween(delayedWages.startDate, delayedWages.endDate, dateType);
      result = days * dailyWage;
    } else {
      const months = parseFloat(delayedWages.months) || 0;
      const days = parseFloat(delayedWages.days) || 0;
      result = (months * salary) + (days * dailyWage);
    }
    
    setDelayedWages(prev => ({ ...prev, result: Math.round(result * 100) / 100 }));
  };

  const calculateEndOfServiceBenefit = () => {
    const salary = parseFloat(salaryAfterInsurance) || 0;
    const years = calculateYearsBetween(endOfService.startDate, endOfService.endDate, dateType);
    const unpaidDays = parseFloat(endOfService.unpaidLeaveDays) || 0;
    const adjustedYears = years - (unpaidDays / 365);
    
    let benefit = 0;
    if (endOfService.method === 'article84') {
      // Article 84: 0.5 month for first 5 years, 1 month thereafter
      if (adjustedYears <= 5) {
        benefit = adjustedYears * 0.5 * salary;
      } else {
        benefit = (5 * 0.5 * salary) + ((adjustedYears - 5) * salary);
      }
    } else {
      // Article 85: Resignation rules
      const article84Benefit = adjustedYears <= 5 ? 
        adjustedYears * 0.5 * salary : 
        (5 * 0.5 * salary) + ((adjustedYears - 5) * salary);
      
      if (adjustedYears >= 2 && adjustedYears < 5) {
        benefit = article84Benefit * (1/3); // One third
      } else if (adjustedYears >= 5 && adjustedYears < 10) {
        benefit = article84Benefit * (2/3); // Two thirds
      } else if (adjustedYears >= 10) {
        benefit = article84Benefit; // Full amount
      }
    }
    
    setEndOfService(prev => ({ ...prev, result: Math.round(benefit * 100) / 100 }));
  };

  const calculateVacationPay = () => {
    const salary = parseFloat(salaryAfterInsurance) || 0;
    const dailyWage = salary / 30;
    const days = parseFloat(vacationPay.vacationDays) || 0;
    const result = days * dailyWage;
    
    setVacationPay(prev => ({ ...prev, result: Math.round(result * 100) / 100 }));
  };

  const calculateOvertime = () => {
    const basicSal = parseFloat(basicSalary) || 0;
    const dailyHours = parseFloat(overtime.dailyHours) || 8;
    const overtimeHours = parseFloat(overtime.overtimeHours) || 0;
    const overtimeDays = parseFloat(overtime.overtimeDays) || 0;
    
    const hourlyRate = basicSal / 30 / dailyHours;
    const overtimeRate = hourlyRate * 1.5;
    
    const result = (overtimeHours * overtimeRate) + (overtimeDays * dailyHours * overtimeRate);
    setOvertime(prev => ({ ...prev, result: Math.round(result * 100) / 100 }));
  };

  const calculateTerminationCompensation = () => {
    const salary = parseFloat(salaryAfterInsurance) || 0;
    const dailyWage = salary / 30;
    
    let result = 0;
    if (termination.contractType === 'unlimited') {
      // 15 days per year, minimum 2 months
      const years = calculateYearsBetween(endOfService.startDate, endOfService.endDate, dateType);
      result = Math.max(years * 15 * dailyWage, 2 * salary);
    } else {
      // Remaining contract period, minimum 2 months
      const remainingDays = calculateDaysBetween(termination.remainingStartDate, termination.remainingEndDate, dateType);
      result = Math.max(remainingDays * dailyWage, 2 * salary);
    }
    
    setTermination(prev => ({ ...prev, result: Math.round(result * 100) / 100 }));
  };

  const calculateVacationDays = () => {
    const years = calculateYearsBetween(vacationDays.serviceStartDate, vacationDays.serviceEndDate, dateType);
    const firstFiveDays = parseFloat(vacationDays.firstFiveYearsDays) || 21;
    const afterFiveDays = parseFloat(vacationDays.afterFiveYearsDays) || 30;
    
    let totalDays = 0;
    if (years <= 5) {
      totalDays = years * firstFiveDays;
    } else {
      totalDays = (5 * firstFiveDays) + ((years - 5) * afterFiveDays);
    }
    
    setVacationDays(prev => ({ ...prev, result: Math.round(totalDays * 100) / 100 }));
  };

  const calculateDeductions = () => {
    const salary = parseFloat(salaryAfterInsurance) || 0;
    const dailyHours = parseFloat(deductions.dailyHours) || 8;
    const absenceDays = parseFloat(deductions.absenceDays) || 0;
    const lateHours = parseFloat(deductions.lateHours) || 0;
    const lateMinutes = parseFloat(deductions.lateMinutes) || 0;
    
    const dailyWage = salary / 30;
    const hourlyWage = dailyWage / dailyHours;
    const minuteWage = hourlyWage / 60;
    
    const result = (absenceDays * dailyWage) + (lateHours * hourlyWage) + (lateMinutes * minuteWage);
    setDeductions(prev => ({ ...prev, result: Math.round(result * 100) / 100 }));
  };

  const calculateAverageWage = () => {
    const wages = averageWage.monthlyWages.map(w => parseFloat(w) || 0);
    const total = wages.reduce((sum, wage) => sum + wage, 0);
    const monthly = total / 12;
    const daily = monthly / 30;
    const hourly = daily / (parseFloat(deductions.dailyHours) || 8);
    
    setAverageWage(prev => ({ 
      ...prev, 
      result: { 
        monthly: Math.round(monthly * 100) / 100,
        daily: Math.round(daily * 100) / 100,
        hourly: Math.round(hourly * 100) / 100
      }
    }));
  };

  const handleExportPDF = () => {
    toast({
      title: "جاري التصدير",
      description: "سيتم تحميل تقرير PDF شامل قريباً"
    });
  };

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "البريد الإلكتروني مطلوب",
        description: "يرجى إدخال بريدك الإلكتروني للاشتراك",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم الاشتراك بنجاح",
      description: "سيصلك جديد أدوات الموارد البشرية على بريدك الإلكتروني"
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BackButton />
              <Separator orientation="vertical" className="h-6" />
              <BoudLogo size="header" />
              <Separator orientation="vertical" className="h-6" />
              <nav className="text-sm text-muted-foreground">
                <span>أدوات الموارد البشرية</span>
                <span className="mx-2">&gt;</span>
                <span className="text-foreground">الحاسبة العُمّالية</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">العربية</Button>
              <Button size="sm">اطلب عرضًا توضيحيًا</Button>
              <Button variant="outline" size="sm">جرّب النسخة التجريبية</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">الحاسبة العُمّالية</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            أداة شاملة لحساب الحقوق العمالية وفقاً لنظام العمل السعودي - تشمل الأجور المتأخرة، مكافأة نهاية الخدمة، أجر الإجازة، العمل الإضافي والتعويضات
          </p>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>إصدار استرشادي تجريبي:</strong> هذه الأداة مخصصة للاسترشاد فقط ولا تغني عن الاستشارة القانونية المتخصصة. 
            العقود الميلادية تُحسب بالتاريخ الميلادي والعقود الهجرية بالتاريخ الهجري وفقاً لتقويم أم القرى.
            جميع البيانات المدخلة محفوظة محلياً ولا يتم إرسالها لأي جهة خارجية.
          </AlertDescription>
        </Alert>

        {/* Basic Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              البيانات الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Date Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  نوع التاريخ
                </Label>
                <RadioGroup
                  value={dateType}
                  onValueChange={(value: 'hijri' | 'gregorian') => setDateType(value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="gregorian" id="gregorian" />
                    <Label htmlFor="gregorian">ميلادي</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="hijri" id="hijri" />
                    <Label htmlFor="hijri">هجري</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Employee Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">جنسية العامل</Label>
                <RadioGroup
                  value={employeeType}
                  onValueChange={(value: 'saudi' | 'non-saudi') => setEmployeeType(value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="saudi" id="saudi" />
                    <Label htmlFor="saudi">سعودي</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="non-saudi" id="non-saudi" />
                    <Label htmlFor="non-saudi">غير سعودي</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Salary */}
              <div className="space-y-2">
                <Label htmlFor="basic-salary" className="text-base font-medium">
                  الأجر الأساسي (ريال سعودي)
                </Label>
                <Input
                  id="basic-salary"
                  type="number"
                  placeholder="0.00"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Allowances */}
              <div className="space-y-2">
                <Label htmlFor="allowances" className="text-base font-medium">
                  البدلات (ريال سعودي)
                </Label>
                <Input
                  id="allowances"
                  type="number"
                  placeholder="0.00"
                  value={allowances}
                  onChange={(e) => setAllowances(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Total Salary (Calculated) */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-muted-foreground">
                  الإجمالي (محسوب)
                </Label>
                <Input
                  type="text"
                  value={totalSalary}
                  readOnly
                  className="text-right bg-muted/50"
                />
              </div>

              {/* Salary After Insurance */}
              <div className="space-y-2">
                <Label htmlFor="salary-after-insurance" className="text-base font-medium">
                  الأجر بعد حسم التأمينات
                  <Info className="w-4 h-4 inline ml-1 text-muted-foreground" />
                </Label>
                <Input
                  id="salary-after-insurance"
                  type="number"
                  value={salaryAfterInsurance}
                  onChange={(e) => setSalaryAfterInsurance(e.target.value)}
                  className="text-right"
                />
                <p className="text-xs text-muted-foreground">
                  {employeeType === 'saudi' 
                    ? 'محسوب تلقائياً (خصم 9.75% للتغطية الجزئية)'
                    : 'لا يوجد خصم للعامل غير السعودي'
                  }
                </p>
              </div>

              {/* Claimant Name */}
              <div className="space-y-2">
                <Label htmlFor="claimant-name" className="text-base font-medium">
                  اسم المدّعي
                </Label>
                <Input
                  id="claimant-name"
                  type="text"
                  placeholder="أدخل اسم المدّعي"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Defendant Name */}
              <div className="space-y-2">
                <Label htmlFor="defendant-name" className="text-base font-medium">
                  اسم المدّعى عليه
                </Label>
                <Input
                  id="defendant-name"
                  type="text"
                  placeholder="أدخل اسم المدّعى عليه"
                  value={defendantName}
                  onChange={(e) => setDefendantName(e.target.value)}
                  className="text-right"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Cards */}
        <Accordion type="single" collapsible className="mb-8">
          {/* 1. Delayed Wages */}
          <AccordionItem value="delayed-wages">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>الأجور المتأخرة</span>
                {delayedWages.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {delayedWages.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">طريقة الحساب</Label>
                      <RadioGroup
                        value={delayedWages.method}
                        onValueChange={(value: 'period' | 'direct') => 
                          setDelayedWages(prev => ({ ...prev, method: value }))
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="period" id="period" />
                          <Label htmlFor="period">إدخال من–إلى</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="direct" id="direct" />
                          <Label htmlFor="direct">إدخال عدد الأشهر/الأيام</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {delayedWages.method === 'period' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>تاريخ البداية</Label>
                          <Input
                            type={dateType === 'hijri' ? 'text' : 'date'}
                            value={delayedWages.startDate}
                            onChange={(e) => setDelayedWages(prev => ({ ...prev, startDate: e.target.value }))}
                            placeholder={dateType === 'hijri' ? 'مثال: 1445-01-15' : ''}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>تاريخ النهاية</Label>
                          <Input
                            type={dateType === 'hijri' ? 'text' : 'date'}
                            value={delayedWages.endDate}
                            onChange={(e) => setDelayedWages(prev => ({ ...prev, endDate: e.target.value }))}
                            placeholder={dateType === 'hijri' ? 'مثال: 1445-03-20' : ''}
                            className="text-right"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>عدد الأشهر</Label>
                          <Input
                            type="number"
                            value={delayedWages.months}
                            onChange={(e) => setDelayedWages(prev => ({ ...prev, months: e.target.value }))}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>عدد الأيام الإضافية</Label>
                          <Input
                            type="number"
                            value={delayedWages.days}
                            onChange={(e) => setDelayedWages(prev => ({ ...prev, days: e.target.value }))}
                            className="text-right"
                          />
                        </div>
                      </div>
                    )}

                    <Button onClick={calculateDelayedWages} className="w-full">
                      احسب الأجور المتأخرة
                    </Button>

                    {delayedWages.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {delayedWages.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">إجمالي الأجور المتأخرة</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 2. End of Service Benefit */}
          <AccordionItem value="end-of-service">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <span>مكافأة نهاية الخدمة (م 84/85)</span>
                {endOfService.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {endOfService.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">طريقة الاحتساب</Label>
                      <RadioGroup
                        value={endOfService.method}
                        onValueChange={(value: 'article84' | 'article85') => 
                          setEndOfService(prev => ({ ...prev, method: value }))
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="article84" id="article84" />
                          <Label htmlFor="article84">المادة 84 (القاعدة العامة)</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="article85" id="article85" />
                          <Label htmlFor="article85">المادة 85 (الاستقالة)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>تاريخ بداية العمل</Label>
                        <Input
                          type={dateType === 'hijri' ? 'text' : 'date'}
                          value={endOfService.startDate}
                          onChange={(e) => setEndOfService(prev => ({ ...prev, startDate: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>تاريخ نهاية العمل</Label>
                        <Input
                          type={dateType === 'hijri' ? 'text' : 'date'}
                          value={endOfService.endDate}
                          onChange={(e) => setEndOfService(prev => ({ ...prev, endDate: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>أيام الإجازة بدون أجر</Label>
                        <Input
                          type="number"
                          value={endOfService.unpaidLeaveDays}
                          onChange={(e) => setEndOfService(prev => ({ ...prev, unpaidLeaveDays: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateEndOfServiceBenefit} className="w-full">
                      احسب مكافأة نهاية الخدمة
                    </Button>

                    {endOfService.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {endOfService.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">
                            مكافأة نهاية الخدمة وفق {endOfService.method === 'article84' ? 'المادة 84' : 'المادة 85'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 3. Vacation Pay */}
          <AccordionItem value="vacation-pay">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>أجر الإجازة</span>
                {vacationPay.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {vacationPay.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>عدد أيام الإجازة المستحقة</Label>
                      <Input
                        type="number"
                        value={vacationPay.vacationDays}
                        onChange={(e) => setVacationPay(prev => ({ ...prev, vacationDays: e.target.value }))}
                        className="text-right"
                        placeholder="0"
                      />
                    </div>

                    <Button onClick={calculateVacationPay} className="w-full">
                      احسب أجر الإجازة
                    </Button>

                    {vacationPay.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {vacationPay.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">أجر الإجازة المستحق</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 4. Overtime Pay */}
          <AccordionItem value="overtime">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>أجر العمل الإضافي</span>
                {overtime.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {overtime.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>ساعات العمل اليومية</Label>
                        <Input
                          type="number"
                          value={overtime.dailyHours}
                          onChange={(e) => setOvertime(prev => ({ ...prev, dailyHours: e.target.value }))}
                          className="text-right"
                          min="2"
                          max="12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عدد الساعات الإضافية</Label>
                        <Input
                          type="number"
                          value={overtime.overtimeHours}
                          onChange={(e) => setOvertime(prev => ({ ...prev, overtimeHours: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عدد الأيام الإضافية</Label>
                        <Input
                          type="number"
                          value={overtime.overtimeDays}
                          onChange={(e) => setOvertime(prev => ({ ...prev, overtimeDays: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateOvertime} className="w-full">
                      احسب أجر العمل الإضافي
                    </Button>

                    {overtime.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {overtime.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">أجر العمل الإضافي المستحق</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 5. Termination Compensation */}
          <AccordionItem value="termination">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span>التعويض عن الإنهاء لغير سبب مشروع</span>
                {termination.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {termination.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">نوع العقد</Label>
                      <RadioGroup
                        value={termination.contractType}
                        onValueChange={(value: 'unlimited' | 'limited') => 
                          setTermination(prev => ({ ...prev, contractType: value }))
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="unlimited" id="unlimited" />
                          <Label htmlFor="unlimited">غير محدد المدة</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="limited" id="limited" />
                          <Label htmlFor="limited">محدد المدة</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {termination.contractType === 'limited' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>بداية المدة المتبقية</Label>
                          <Input
                            type={dateType === 'hijri' ? 'text' : 'date'}
                            value={termination.remainingStartDate}
                            onChange={(e) => setTermination(prev => ({ ...prev, remainingStartDate: e.target.value }))}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>نهاية المدة المتبقية</Label>
                          <Input
                            type={dateType === 'hijri' ? 'text' : 'date'}
                            value={termination.remainingEndDate}
                            onChange={(e) => setTermination(prev => ({ ...prev, remainingEndDate: e.target.value }))}
                            className="text-right"
                          />
                        </div>
                      </div>
                    )}

                    <Button onClick={calculateTerminationCompensation} className="w-full">
                      احسب التعويض
                    </Button>

                    {termination.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {termination.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">
                            التعويض عن الإنهاء ({termination.contractType === 'unlimited' ? 'غير محدد المدة' : 'محدد المدة'})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 6. Vacation Days Calculation */}
          <AccordionItem value="vacation-days">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>معرفة عدد أيام الإجازة في فترة الخدمة</span>
                {vacationDays.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {vacationDays.result.toLocaleString('ar-SA')} يوم
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>أيام الإجازة السنوية (أول 5 سنوات)</Label>
                        <Input
                          type="number"
                          value={vacationDays.firstFiveYearsDays}
                          onChange={(e) => setVacationDays(prev => ({ ...prev, firstFiveYearsDays: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>أيام الإجازة السنوية (بعد 5 سنوات)</Label>
                        <Input
                          type="number"
                          value={vacationDays.afterFiveYearsDays}
                          onChange={(e) => setVacationDays(prev => ({ ...prev, afterFiveYearsDays: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>تاريخ بداية الخدمة</Label>
                        <Input
                          type={dateType === 'hijri' ? 'text' : 'date'}
                          value={vacationDays.serviceStartDate}
                          onChange={(e) => setVacationDays(prev => ({ ...prev, serviceStartDate: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>تاريخ نهاية الخدمة</Label>
                        <Input
                          type={dateType === 'hijri' ? 'text' : 'date'}
                          value={vacationDays.serviceEndDate}
                          onChange={(e) => setVacationDays(prev => ({ ...prev, serviceEndDate: e.target.value }))}
                          className="text-right"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateVacationDays} className="w-full">
                      احسب أيام الإجازة المستحقة
                    </Button>

                    {vacationDays.result > 0 && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {vacationDays.result.toLocaleString('ar-SA')} يوم
                          </div>
                          <p className="text-sm text-muted-foreground">إجمالي أيام الإجازة المستحقة</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 7. Deductions */}
          <AccordionItem value="deductions">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>مبلغ الحسم بسبب الغياب والتأخر</span>
                {deductions.result > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {deductions.result.toLocaleString('ar-SA')} ريال
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>ساعات العمل اليومية</Label>
                        <Input
                          type="number"
                          value={deductions.dailyHours}
                          onChange={(e) => setDeductions(prev => ({ ...prev, dailyHours: e.target.value }))}
                          className="text-right"
                          min="2"
                          max="12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عدد أيام الغياب</Label>
                        <Input
                          type="number"
                          value={deductions.absenceDays}
                          onChange={(e) => setDeductions(prev => ({ ...prev, absenceDays: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عدد ساعات التأخر</Label>
                        <Input
                          type="number"
                          value={deductions.lateHours}
                          onChange={(e) => setDeductions(prev => ({ ...prev, lateHours: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>عدد دقائق التأخر</Label>
                        <Input
                          type="number"
                          value={deductions.lateMinutes}
                          onChange={(e) => setDeductions(prev => ({ ...prev, lateMinutes: e.target.value }))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <Button onClick={calculateDeductions} className="w-full">
                      احسب مبلغ الحسم
                    </Button>

                    {deductions.result > 0 && (
                      <div className="mt-4 p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-destructive mb-2">
                            {deductions.result.toLocaleString('ar-SA')} ريال سعودي
                          </div>
                          <p className="text-sm text-muted-foreground">مبلغ الحسم الإجمالي</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          {/* 8. Average Wage */}
          <AccordionItem value="average-wage">
            <AccordionTrigger className="text-right">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <span>متوسط الأجر لآخر سنة</span>
                {averageWage.result.monthly > 0 && (
                  <Badge variant="outline" className="mr-auto">
                    {averageWage.result.monthly.toLocaleString('ar-SA')} ريال/شهر
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">الراتب الشهري لآخر 12 شهراً (بالريال السعودي)</Label>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {averageWage.monthlyWages.map((wage, index) => (
                        <div key={index} className="space-y-2">
                          <Label className="text-sm">الشهر {index + 1}</Label>
                          <Input
                            type="number"
                            value={wage}
                            onChange={(e) => {
                              const newWages = [...averageWage.monthlyWages];
                              newWages[index] = e.target.value;
                              setAverageWage(prev => ({ ...prev, monthlyWages: newWages }));
                            }}
                            className="text-right"
                            placeholder="0.00"
                          />
                        </div>
                      ))}
                    </div>

                    <Button onClick={calculateAverageWage} className="w-full">
                      احسب متوسط الأجر
                    </Button>

                    {averageWage.result.monthly > 0 && (
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-primary/5 rounded-lg border text-center">
                            <div className="text-lg font-bold text-primary">
                              {averageWage.result.monthly.toLocaleString('ar-SA')}
                            </div>
                            <p className="text-sm text-muted-foreground">متوسط شهري</p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-lg border text-center">
                            <div className="text-lg font-bold text-primary">
                              {averageWage.result.daily.toLocaleString('ar-SA')}
                            </div>
                            <p className="text-sm text-muted-foreground">متوسط يومي</p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-lg border text-center">
                            <div className="text-lg font-bold text-primary">
                              {averageWage.result.hourly.toLocaleString('ar-SA')}
                            </div>
                            <p className="text-sm text-muted-foreground">متوسط بالساعة</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Comprehensive Report */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              التقرير الشامل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {delayedWages.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">أجور متأخرة</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {endOfService.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">مكافأة نهاية الخدمة</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {vacationPay.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">أجر الإجازة</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {overtime.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">عمل إضافي</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {termination.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">تعويض الإنهاء</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="font-semibold text-primary">
                    {vacationDays.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">أيام إجازة</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg text-center">
                  <div className="font-semibold text-destructive">
                    -{deductions.result.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">حسومات</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-center">
                  <div className="font-semibold text-primary text-lg">
                    {(delayedWages.result + endOfService.result + vacationPay.result + overtime.result + termination.result - deductions.result).toLocaleString('ar-SA')}
                  </div>
                  <div className="text-xs text-muted-foreground">الإجمالي النهائي</div>
                </div>
              </div>
              
              <Button onClick={handleExportPDF} className="w-full flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير التقرير الشامل PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Subscription */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">اشترك ليصلك جديد أدوات الموارد البشرية</h3>
              <p className="text-muted-foreground text-sm">احصل على آخر التحديثات والأدوات المفيدة لإدارة الموارد البشرية</p>
            </div>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right"
              />
              <Button onClick={handleSubscribe} className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                إرسال
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>الأسئلة الشائعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">كيف تُحسب الأجور المتأخرة؟</h4>
                <p className="text-sm text-muted-foreground">
                  تُحسب بضرب عدد الأيام المستحقة في الأجر اليومي (الأجر الشهري ÷ 30)، أو بجمع الأشهر المستحقة مضروبة في الأجر الشهري.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">ما الفرق بين المادة 84 والمادة 85؟</h4>
                <p className="text-sm text-muted-foreground">
                  المادة 84 تحدد المكافأة الكاملة (نصف شهر لكل سنة من أول 5 سنوات، شهر كامل لما بعدها). المادة 85 تطبق نسب مخفضة للاستقالة حسب مدة الخدمة.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">كيف يُحسب أجر العمل الإضافي؟</h4>
                <p className="text-sm text-muted-foreground">
                  يُحسب أجر الساعة من الراتب الأساسي ÷ 30 ÷ ساعات اليوم، ثم يُضرب في 1.5 لكل ساعة إضافية وفقاً للنظام.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">هل الحسابات متوافقة مع نظام العمل السعودي؟</h4>
                <p className="text-sm text-muted-foreground">
                  نعم، جميع الحسابات مبنية على نظام العمل السعودي والتأمينات الاجتماعية، مع تحديث مستمر عند صدور أي تعديلات نظامية.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">ما أهمية اختيار نوع التاريخ (هجري/ميلادي)؟</h4>
                <p className="text-sm text-muted-foreground">
                  العقود الميلادية تُحسب بالتاريخ الميلادي والعقود الهجرية بالتاريخ الهجري، مما يؤثر على حساب المدد والفترات بدقة أكبر.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
