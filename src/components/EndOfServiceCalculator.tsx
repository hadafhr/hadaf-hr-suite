import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BoudLogo } from '@/components/BoudLogo';
import { BackButton } from '@/components/BackButton';
import { Calculator, Download, Mail, Calendar as CalendarIcon, Clock, Users, DollarSign, FileText, AlertTriangle, Info, Copy, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, differenceInDays, differenceInYears } from 'date-fns';
import { ar } from 'date-fns/locale';
import moment from 'moment-hijri';
import { cn } from '@/lib/utils';

// Termination reasons according to Saudi Labor Law
const TERMINATION_REASONS = [
  { value: 'mutual', label: 'اتفاق الطرفين على إنهاء العقد', factor: 1.0, article: 'م84' },
  { value: 'employer', label: 'انتهاء/فسخ العقد من قبل صاحب العمل', factor: 1.0, article: 'م84' },
  { value: 'art80', label: 'فسخ العقد من قبل صاحب العمل لإحدى حالات المادة 80', factor: 0, article: 'م80' },
  { value: 'force_majeure', label: 'ترك العامل العمل لقوة قاهرة', factor: 1.0, article: 'م87' },
  { value: 'female_marriage_birth', label: 'إنهاء العاملة لعقدها خلال 6 أشهر من الزواج أو 3 أشهر من الوضع', factor: 1.0, article: 'م87' },
  { value: 'art81', label: 'ترك العامل العمل لإحدى حالات المادة 81', factor: 1.0, article: 'م81' },
  { value: 'resignation', label: 'فسخ العقد من قبل العامل أو تركه العمل لغير حالات المادة 81 (استقالة)', factor: 'variable', article: 'م85' }
];

export const EndOfServiceCalculator: React.FC = () => {
  // Form State
  const [contractType, setContractType] = useState<'limited' | 'unlimited'>('unlimited');
  const [terminationReason, setTerminationReason] = useState('');
  const [lastSalary, setLastSalary] = useState('');
  const [useDurationMode, setUseDurationMode] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [serviceYears, setServiceYears] = useState('');
  const [serviceMonths, setServiceMonths] = useState('');
  const [serviceDays, setServiceDays] = useState('');
  const [calendarType, setCalendarType] = useState<'gregorian' | 'hijri'>('gregorian');
  const [unpaidLeaveDays, setUnpaidLeaveDays] = useState('');
  const [email, setEmail] = useState('');
  
  // Results State
  const [calculationResult, setCalculationResult] = useState<{
    totalAmount: number;
    serviceYears: number;
    first5Years: number;
    after5Years: number;
    first5Amount: number;
    after5Amount: number;
    factor: number;
    breakdown: string;
    legalNote: string;
  } | null>(null);
  
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  // Helper function to calculate years of service
  const calculateServiceYears = (): number => {
    if (useDurationMode) {
      const years = parseFloat(serviceYears) || 0;
      const months = parseFloat(serviceMonths) || 0;
      const days = parseFloat(serviceDays) || 0;
      return years + months / 12 + days / 365;
    } else if (startDate && endDate) {
      if (calendarType === 'hijri') {
        const startMoment = moment(startDate);
        const endMoment = moment(endDate);
        return endMoment.diff(startMoment, 'years', true);
      } else {
        return differenceInDays(endDate, startDate) / 365;
      }
    }
    return 0;
  };

  // Calculate end of service benefit according to Saudi Labor Law
  const calculateBenefit = () => {
    const salary = parseFloat(lastSalary) || 0;
    const totalServiceYears = calculateServiceYears();
    const unpaidDays = parseFloat(unpaidLeaveDays) || 0;
    const effectiveYears = Math.max(0, totalServiceYears - unpaidDays / 365);

    if (salary <= 0 || !terminationReason) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال الراتب الأساسي وسبب انتهاء العلاقة",
        variant: "destructive"
      });
      return;
    }

    // Calculate base benefit (Article 84)
    const first5Years = Math.min(effectiveYears, 5);
    const after5Years = Math.max(0, effectiveYears - 5);
    
    const first5Amount = first5Years * 0.5 * salary;
    const after5Amount = after5Years * 1.0 * salary;
    const baseBenefit = first5Amount + after5Amount;

    // Apply factor based on termination reason
    let factor = 1.0;
    let breakdown = '';
    let legalNote = '';

    const reason = TERMINATION_REASONS.find(r => r.value === terminationReason);
    
    if (terminationReason === 'resignation') {
      // Article 85 - Resignation rules
      if (effectiveYears < 2) {
        factor = 0;
        breakdown = 'لا يستحق مكافأة (أقل من سنتين)';
        legalNote = 'وفقاً للمادة 85 - لا يستحق العامل المستقيل مكافأة إذا كانت خدمته أقل من سنتين';
      } else if (effectiveYears >= 2 && effectiveYears < 5) {
        factor = 1/3;
        breakdown = 'ثلث المكافأة (من 2 إلى أقل من 5 سنوات)';
        legalNote = 'وفقاً للمادة 85 - يستحق العامل المستقيل ثلث مكافأة نهاية الخدمة';
      } else if (effectiveYears >= 5 && effectiveYears < 10) {
        factor = 2/3;
        breakdown = 'ثلثا المكافأة (من 5 إلى أقل من 10 سنوات)';
        legalNote = 'وفقاً للمادة 85 - يستحق العامل المستقيل ثلثي مكافأة نهاية الخدمة';
      } else {
        factor = 1.0;
        breakdown = 'المكافأة كاملة (10 سنوات أو أكثر)';
        legalNote = 'وفقاً للمادة 85 - يستحق العامل المستقيل كامل مكافأة نهاية الخدمة';
      }
    } else if (terminationReason === 'art80') {
      factor = 0;
      breakdown = 'لا يستحق مكافأة';
      legalNote = 'وفقاً للمادة 80 - فسخ العقد لأسباب تعود للعامل';
    } else if (reason) {
      factor = reason.factor as number;
      breakdown = 'المكافأة كاملة';
      legalNote = `وفقاً ${reason.article} - ${reason.label}`;
    }

    const totalAmount = baseBenefit * factor;

    setCalculationResult({
      totalAmount,
      serviceYears: effectiveYears,
      first5Years,
      after5Years,
      first5Amount,
      after5Amount,
      factor,
      breakdown,
      legalNote
    });

    toast({
      title: "تم حساب المكافأة",
      description: `المبلغ المستحق: ${totalAmount.toLocaleString('ar-SA')} ريال سعودي`
    });
  };

  const clearForm = () => {
    setContractType('unlimited');
    setTerminationReason('');
    setLastSalary('');
    setUseDurationMode(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setServiceYears('');
    setServiceMonths('');
    setServiceDays('');
    setUnpaidLeaveDays('');
    setCalculationResult(null);
    setShowDetailedBreakdown(false);
  };

  const handleExportPDF = () => {
    toast({
      title: "جاري التصدير",
      description: "سيتم تحميل تقرير PDF شامل قريباً"
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط الحاسبة إلى الحافظة"
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
                <span className="text-foreground">حاسبة مكافأة نهاية الخدمة</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">العربية</Button>
              <Button size="sm">اطلب عرضًا</Button>
              <Button variant="outline" size="sm">جولة تفاعلية</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">حاسبة مكافأة نهاية الخدمة</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            احسب مكافأة نهاية الخدمة وفقاً لنظام العمل السعودي (المواد 84، 85، 87، 80، 81، 77) 
            مع دعم التقويم الهجري والميلادي
          </p>
        </div>

        {/* Warning Banner */}
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>نتائج استرشادية:</strong> هذه الحاسبة مخصصة للاسترشاد فقط ولا تغني عن الاستشارة القانونية المتخصصة. 
            يُرجى الرجوع للعقد والنظام عند النزاع.
          </AlertDescription>
        </Alert>

        {/* Contract Details Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              تفاصيل العقد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contract Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">نوع العقد</Label>
                <RadioGroup
                  value={contractType}
                  onValueChange={(value: 'limited' | 'unlimited') => setContractType(value)}
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

              {/* Calendar Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  نوع التقويم
                </Label>
                <RadioGroup
                  value={calendarType}
                  onValueChange={(value: 'gregorian' | 'hijri') => setCalendarType(value)}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Termination Reason */}
              <div className="space-y-2">
                <Label className="text-base font-medium">سبب انتهاء العلاقة العمالية</Label>
                <Select value={terminationReason} onValueChange={setTerminationReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر سبب الانتهاء" />
                  </SelectTrigger>
                  <SelectContent>
                    {TERMINATION_REASONS.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        <div className="flex items-center gap-2">
                          <span>{reason.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {reason.article}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Last Salary */}
              <div className="space-y-2">
                <Label className="text-base font-medium">آخر راتب شهري (ريال سعودي)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={lastSalary}
                  onChange={(e) => setLastSalary(e.target.value)}
                  className="text-right"
                />
              </div>
            </div>

            {/* Duration Mode Toggle */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">وضع المدة</Label>
                <p className="text-sm text-muted-foreground">
                  استخدم مدة خدمة بدلاً من تواريخ محددة
                </p>
              </div>
              <Switch
                checked={useDurationMode}
                onCheckedChange={setUseDurationMode}
              />
            </div>

            {/* Service Period Inputs */}
            {useDurationMode ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>سنوات الخدمة</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={serviceYears}
                    onChange={(e) => setServiceYears(e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label>أشهر الخدمة</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    max="11"
                    value={serviceMonths}
                    onChange={(e) => setServiceMonths(e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label>أيام الخدمة</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    max="365"
                    value={serviceDays}
                    onChange={(e) => setServiceDays(e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label>تاريخ بداية العقد ({calendarType === 'hijri' ? 'هجري' : 'ميلادي'})</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-right font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {startDate ? (
                          calendarType === 'hijri' ? 
                            moment(startDate).format('iYYYY/iMM/iDD') :
                            format(startDate, "yyyy/MM/dd")
                        ) : (
                          <span>اختر التاريخ</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label>تاريخ انتهاء العقد ({calendarType === 'hijri' ? 'هجري' : 'ميلادي'})</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-right font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {endDate ? (
                          calendarType === 'hijri' ? 
                            moment(endDate).format('iYYYY/iMM/iDD') :
                            format(endDate, "yyyy/MM/dd")
                        ) : (
                          <span>اختر التاريخ</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {/* Unpaid Leave Days */}
            <div className="space-y-2">
              <Label>أيام الإجازة بدون أجر (اختياري)</Label>
              <Input
                type="number"
                placeholder="0"
                value={unpaidLeaveDays}
                onChange={(e) => setUnpaidLeaveDays(e.target.value)}
                className="text-right max-w-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={calculateBenefit} className="px-8">
                <Calculator className="w-4 h-4 ml-2" />
                احسب
              </Button>
              <Button variant="secondary" onClick={clearForm}>
                تفريغ
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {calculationResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                المكافأة المحسوبة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Result */}
              <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">
                  {calculationResult.totalAmount.toLocaleString('ar-SA')} ريال
                </div>
                <div className="text-muted-foreground">
                  مكافأة نهاية الخدمة المستحقة
                </div>
              </div>

              {/* Service Period Summary */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">فترة العمل الإجمالية</span>
                </div>
                <span className="text-lg font-semibold">
                  {calculationResult.serviceYears.toFixed(2)} سنة
                </span>
              </div>

              {/* Detailed Breakdown Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                className="w-full"
              >
                <span>تفاصيل الحساب</span>
                {showDetailedBreakdown ? (
                  <ChevronUp className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-2" />
                )}
              </Button>

              {/* Detailed Breakdown */}
              {showDetailedBreakdown && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-semibold text-lg">تفصيل المكافأة</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>أول 5 سنوات ({calculationResult.first5Years.toFixed(2)} سنة)</span>
                        <span>{calculationResult.first5Amount.toLocaleString('ar-SA')} ريال</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {calculationResult.first5Years.toFixed(2)} × نصف شهر × {parseFloat(lastSalary).toLocaleString('ar-SA')} ريال
                      </div>
                    </div>
                    
                    {calculationResult.after5Years > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>ما بعد 5 سنوات ({calculationResult.after5Years.toFixed(2)} سنة)</span>
                          <span>{calculationResult.after5Amount.toLocaleString('ar-SA')} ريال</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {calculationResult.after5Years.toFixed(2)} × شهر كامل × {parseFloat(lastSalary).toLocaleString('ar-SA')} ريال
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">المعامل المطبق</span>
                      <Badge variant={calculationResult.factor === 1 ? "default" : "secondary"}>
                        {calculationResult.factor === 1 ? "كامل" : calculationResult.factor === 0 ? "لا شيء" : `${Math.round(calculationResult.factor * 100)}%`}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {calculationResult.breakdown}
                    </div>
                  </div>

                  <Separator />

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-lg border border-amber-200">
                    <div className="flex gap-2">
                      <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>الأساس القانوني:</strong> {calculationResult.legalNote}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Export and Share */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleExportPDF} variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير PDF
                </Button>
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="w-4 h-4 ml-2" />
                  انسخ الرابط
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Newsletter Subscription */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-right">
                <h3 className="text-lg font-semibold mb-2">اشترك لتصلك أدواتنا</h3>
                <p className="text-muted-foreground">
                  احصل على أحدث أدوات الموارد البشرية والقوانين العمالية
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-right"
                />
                <Button onClick={handleSubscribe}>
                  <Mail className="w-4 h-4 ml-2" />
                  اشترك
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">جرّب بُعد HR</h3>
            <p className="text-muted-foreground mb-6">
              منصة شاملة لإدارة الموارد البشرية مع أدوات متقدمة للحاسبات العمالية
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">اطلب عرضًا توضيحيًا</Button>
              <Button variant="outline" size="lg">جولة تفاعلية</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};