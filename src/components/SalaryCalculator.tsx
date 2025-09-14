import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BoudLogo } from '@/components/BoudLogo';
import { BackButton } from '@/components/BackButton';
import { 
  Calculator, 
  Users, 
  Calendar, 
  FileText, 
  Download, 
  Mail, 
  Share2, 
  Home,
  ArrowLeft,
  Play,
  MessageCircle,
  Eye,
  EyeOff,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Building,
  Globe,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDownloadPrint } from '@/hooks/useDownloadPrint';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';

// تكوين dayjs للغة العربية
dayjs.locale('ar-sa');

interface SalaryCalculation {
  workingDays: number;
  monthDays: number;
  prorationRatio: number;
  baseWageSubject: number;
  totalGrossSubject: number;
  employeeContribution: number;
  employerContribution: number;
  netSalary: number;
}

interface EmployeeData {
  nationality: 'saudi' | 'non-saudi';
  insuranceType: 'comprehensive' | 'partial';
  joiningDate: string;
  basicSalary: number;
  housingAllowance: number;
  monthlyCommissions: number;
  additionalAllowances: number;
  otherDeductions: number;
}

const INSURANCE_RATES = {
  comprehensive: {
    employer: 21.5,
    employee: 0
  },
  partial: {
    employer: 11.75,
    employee: 9.75
  },
  nonSaudi: {
    employer: 2,
    employee: 0
  }
};

const FAQ_DATA = [
  {
    question: "كيف نحسب صافي الراتب؟",
    answer: "نطرح مساهمة الموظف في التأمينات (إن وُجدت) وأي خصومات أخرى من إجمالي الدخل الشهري بعد احتساب النسبة التناسبية لأيام العمل."
  },
  {
    question: "هل الحسابات متوافقة مع التأمينات الاجتماعية؟",
    answer: "نعم، تُبنى المساهمات على الأجر الخاضع للاشتراك (الراتب الأساسي + بدل السكن) وبالنسب المعتمدة، مع تحديث مستمر عند أي تغييرات تنظيمية."
  },
  {
    question: "هل أستطيع حفظ بيان الراتب؟",
    answer: "يمكنك تصدير قسيمة راتب PDF لإرسالها أو طباعتها."
  },
  {
    question: "ما البنود التي تدخل في الحساب؟",
    answer: "الراتب الأساسي، بدل السكن، العمولات، والبدلات الإضافية، بينما تُحسب الاشتراكات على الأجر الخاضع للاشتراك فقط."
  }
];

export const SalaryCalculator: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { downloadFile } = useDownloadPrint();
  
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    nationality: 'saudi',
    insuranceType: 'comprehensive',
    joiningDate: '',
    basicSalary: 0,
    housingAllowance: 0,
    monthlyCommissions: 0,
    additionalAllowances: 0,
    otherDeductions: 0
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // دالة التحقق من صحة البيانات
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!employeeData.joiningDate) {
      errors.joiningDate = 'تاريخ الانضمام مطلوب';
    } else if (dayjs(employeeData.joiningDate).isAfter(dayjs())) {
      errors.joiningDate = 'تاريخ الانضمام لا يمكن أن يكون في المستقبل';
    }

    if (employeeData.basicSalary <= 0) {
      errors.basicSalary = 'الراتب الأساسي مطلوب ويجب أن يكون أكبر من صفر';
    }

    if (employeeData.housingAllowance < 0) {
      errors.housingAllowance = 'بدل السكن يجب أن يكون قيمة موجبة أو صفر';
    }

    if (employeeData.monthlyCommissions < 0) {
      errors.monthlyCommissions = 'العمولات يجب أن تكون قيمة موجبة أو صفر';
    }

    if (employeeData.additionalAllowances < 0) {
      errors.additionalAllowances = 'البدلات الإضافية يجب أن تكون قيمة موجبة أو صفر';
    }

    if (employeeData.otherDeductions < 0) {
      errors.otherDeductions = 'الخصومات الأخرى يجب أن تكون قيمة موجبة أو صفر';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // حسابات الراتب
  const calculations: SalaryCalculation = useMemo(() => {
    if (!validateForm()) {
      return {
        workingDays: 0,
        monthDays: 0,
        prorationRatio: 0,
        baseWageSubject: 0,
        totalGrossSubject: 0,
        employeeContribution: 0,
        employerContribution: 0,
        netSalary: 0
      };
    }

    const joiningDate = dayjs(employeeData.joiningDate);
    const currentMonth = dayjs();
    
    // حساب أيام الشهر وأيام العمل
    const monthDays = currentMonth.daysInMonth();
    let workingDays: number;
    
    if (joiningDate.isSame(currentMonth, 'month') && joiningDate.isSame(currentMonth, 'year')) {
      // إذا كان تاريخ الانضمام في نفس الشهر الحالي
      workingDays = monthDays - joiningDate.date() + 1;
    } else if (joiningDate.isBefore(currentMonth, 'month')) {
      // إذا كان تاريخ الانضمام قبل الشهر الحالي
      workingDays = monthDays;
    } else {
      // إذا كان تاريخ الانضمام بعد الشهر الحالي
      workingDays = 0;
    }

    const prorationRatio = workingDays / monthDays;

    // الأجر الخاضع للاشتراك (الراتب الأساسي + بدل السكن)
    const baseWageSubject = employeeData.basicSalary + employeeData.housingAllowance;
    
    // إجمالي الراتب الشهري قبل الاستقطاعات
    const totalGross = employeeData.basicSalary + employeeData.housingAllowance + 
                      employeeData.monthlyCommissions + employeeData.additionalAllowances;

    // الأجر الخاضع للاشتراك النسبي
    const baseWageSubjectProrated = baseWageSubject * prorationRatio;
    
    // إجمالي الراتب النسبي
    const totalGrossProrated = totalGross * prorationRatio;

    // حساب الاشتراكات
    let employeeContribution = 0;
    let employerContribution = 0;

    if (employeeData.nationality === 'saudi') {
      if (employeeData.insuranceType === 'comprehensive') {
        employeeContribution = 0;
        employerContribution = baseWageSubjectProrated * (INSURANCE_RATES.comprehensive.employer / 100);
      } else {
        employeeContribution = baseWageSubjectProrated * (INSURANCE_RATES.partial.employee / 100);
        employerContribution = baseWageSubjectProrated * (INSURANCE_RATES.partial.employer / 100);
      }
    } else {
      employeeContribution = 0;
      employerContribution = baseWageSubjectProrated * (INSURANCE_RATES.nonSaudi.employer / 100);
    }

    // صافي الراتب
    const netSalary = totalGrossProrated - employeeContribution - employeeData.otherDeductions;

    return {
      workingDays,
      monthDays,
      prorationRatio,
      baseWageSubject: baseWageSubjectProrated,
      totalGrossSubject: totalGrossProrated,
      employeeContribution,
      employerContribution,
      netSalary
    };
  }, [employeeData]);

  // تحديث بيانات الموظف
  const updateEmployeeData = (field: keyof EmployeeData, value: any) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // تنسيق العملة
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // تصدير قسيمة الراتب PDF
  const exportPayslipPDF = () => {
    const payslipData = {
      employeeData,
      calculations,
      currentDate: dayjs().format('DD/MM/YYYY'),
      calculationDate: dayjs().format('DD/MM/YYYY HH:mm'),
      companyName: 'شركة بُعد للموارد البشرية',
    };

    downloadFile({
      data: payslipData,
      filename: `قسيمة_راتب_${dayjs().format('YYYY-MM-DD')}`,
      format: 'pdf'
    });

    toast({
      title: "تم التصدير",
      description: "تم تصدير قسيمة الراتب بنجاح",
    });
  };

  // مشاركة الحساب
  const shareCalculation = () => {
    const shareText = `حاسبة الرواتب - بُعد HR\nصافي الراتب: ${formatCurrency(calculations.netSalary)}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'حاسبة الرواتب - بُعد HR',
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط الحاسبة إلى الحافظة",
      });
    }
  };

  // إرسال بالبريد الإلكتروني
  const sendByEmail = () => {
    if (!email) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال البريد الإلكتروني",
        variant: "destructive"
      });
      return;
    }

    const subject = encodeURIComponent('نتائج حاسبة الرواتب - بُعد HR');
    const body = encodeURIComponent(`
السلام عليكم ورحمة الله وبركاته،

تجد أدناه نتائج حساب الراتب من حاسبة الرواتب - بُعد HR:

📋 بيانات الموظف:
• الجنسية: ${employeeData.nationality === 'saudi' ? 'سعودي' : 'غير سعودي'}
• نوع التأمين: ${employeeData.insuranceType === 'comprehensive' ? 'تغطية شاملة' : 'تغطية جزئية'}
• تاريخ الانضمام: ${dayjs(employeeData.joiningDate).format('DD/MM/YYYY')}

💰 المكونات المالية:
• الراتب الأساسي: ${formatCurrency(employeeData.basicSalary)}
• بدل السكن: ${formatCurrency(employeeData.housingAllowance)}
• العمولات الشهرية: ${formatCurrency(employeeData.monthlyCommissions)}
• البدلات الإضافية: ${formatCurrency(employeeData.additionalAllowances)}

📊 نتائج الحساب:
• عدد أيام العمل: ${calculations.workingDays} من أصل ${calculations.monthDays} يوماً
• الأجر الخاضع للاشتراك: ${formatCurrency(calculations.baseWageSubject)}
• اشتراك التأمينات (الموظف): ${formatCurrency(calculations.employeeContribution)}
• اشتراك التأمينات (صاحب العمل): ${formatCurrency(calculations.employerContribution)}

💵 صافي الراتب: ${formatCurrency(calculations.netSalary)}

مع تحيات فريق بُعد للموارد البشرية
    `);

    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    
    toast({
      title: "تم فتح البريد الإلكتروني",
      description: "يمكنك الآن إرسال النتائج",
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BackButton />
              <Separator orientation="vertical" className="h-6" />
              <BoudLogo size="header" />
              <Separator orientation="vertical" className="h-6" />
              <nav className="text-sm text-muted-foreground">
                <span>أدوات الموارد البشرية</span>
                <span className="mx-2">›</span>
                <span className="text-foreground font-medium">حاسبة الرواتب</span>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                تواصل معنا
              </Button>
              <Button 
                onClick={() => navigate('/demo-request')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                عرض توضيحي
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-glow text-white py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Calculator className="w-4 h-4 ml-2" />
            حاسبة الرواتب المتطورة
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            حاسبة الرواتب
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            احسب صافي راتب موظفك بسهولة—بناءً على الراتب الأساسي، بدل السكن، العمولات، والتأمينات الاجتماعية.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Input Form */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="flex items-center text-xl">
                  <Users className="w-6 h-6 ml-3" />
                  بيانات الموظف
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                
                {/* الجنسية */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold text-lg flex items-center">
                    <Building className="w-5 h-5 ml-2 text-primary" />
                    جنسية الموظف
                  </Label>
                  <RadioGroup 
                    value={employeeData.nationality} 
                    onValueChange={(value) => updateEmployeeData('nationality', value)}
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

                {/* المساهمة في التأمينات */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold text-lg flex items-center">
                    <Shield className="w-5 h-5 ml-2 text-primary" />
                    المساهمة في التأمينات الاجتماعية
                  </Label>
                  <RadioGroup 
                    value={employeeData.insuranceType} 
                    onValueChange={(value) => updateEmployeeData('insuranceType', value)}
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="comprehensive" id="comprehensive" />
                      <Label htmlFor="comprehensive">
                        تغطية شاملة – 21.5% يتحملها صاحب العمل (الموظف=0%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="partial" id="partial" />
                      <Label htmlFor="partial">
                        تغطية جزئية – 11.75% صاحب العمل + 9.75% الموظف
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* تاريخ الانضمام */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold text-lg flex items-center">
                    <Calendar className="w-5 h-5 ml-2 text-primary" />
                    تاريخ الانضمام
                  </Label>
                  <Input
                    type="date"
                    value={employeeData.joiningDate}
                    onChange={(e) => updateEmployeeData('joiningDate', e.target.value)}
                    className={`border-2 ${validationErrors.joiningDate ? 'border-destructive' : ''}`}
                  />
                  {validationErrors.joiningDate && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      {validationErrors.joiningDate}
                    </p>
                  )}
                </div>

                {/* الراتب الأساسي */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold text-lg flex items-center">
                    <DollarSign className="w-5 h-5 ml-2 text-primary" />
                    الراتب الأساسي (ريال سعودي)
                  </Label>
                  <Input
                    type="number"
                    value={employeeData.basicSalary || ''}
                    onChange={(e) => updateEmployeeData('basicSalary', parseFloat(e.target.value) || 0)}
                    placeholder="أدخل الراتب الأساسي"
                    className={`border-2 ${validationErrors.basicSalary ? 'border-destructive' : ''}`}
                  />
                  {validationErrors.basicSalary && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      {validationErrors.basicSalary}
                    </p>
                  )}
                </div>

                {/* بدل السكن */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold flex items-center">
                    <Home className="w-5 h-5 ml-2 text-primary" />
                    بدل السكن (اختياري)
                  </Label>
                  <Input
                    type="number"
                    value={employeeData.housingAllowance || ''}
                    onChange={(e) => updateEmployeeData('housingAllowance', parseFloat(e.target.value) || 0)}
                    placeholder="أدخل بدل السكن"
                  />
                </div>

                {/* العمولات الشهرية */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 ml-2 text-primary" />
                    العمولات الشهرية (اختياري)
                  </Label>
                  <Input
                    type="number"
                    value={employeeData.monthlyCommissions || ''}
                    onChange={(e) => updateEmployeeData('monthlyCommissions', parseFloat(e.target.value) || 0)}
                    placeholder="أدخل العمولات الشهرية"
                  />
                </div>

                {/* البدلات الإضافية */}
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold flex items-center">
                    <FileText className="w-5 h-5 ml-2 text-primary" />
                    إجمالي البدلات الإضافية (اختياري)
                  </Label>
                  <Input
                    type="number"
                    value={employeeData.additionalAllowances || ''}
                    onChange={(e) => updateEmployeeData('additionalAllowances', parseFloat(e.target.value) || 0)}
                    placeholder="أدخل البدلات الإضافية"
                  />
                </div>

                {/* خيارات متقدمة */}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="flex items-center gap-2 text-primary"
                  >
                    {showAdvancedOptions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    خيارات متقدمة
                  </Button>
                  
                  {showAdvancedOptions && (
                    <div className="mt-4 space-y-3">
                      <Label className="text-foreground font-semibold flex items-center">
                        <AlertCircle className="w-5 h-5 ml-2 text-destructive" />
                        خصومات أخرى (اختياري)
                      </Label>
                      <Input
                        type="number"
                        value={employeeData.otherDeductions || ''}
                        onChange={(e) => updateEmployeeData('otherDeductions', parseFloat(e.target.value) || 0)}
                        placeholder="أدخل الخصومات الأخرى"
                      />
                    </div>
                  )}
                </div>

                {/* زر الحساب */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                  onClick={() => {
                    if (validateForm()) {
                      toast({
                        title: "تم الحساب",
                        description: "تم حساب الراتب بنجاح",
                      });
                    }
                  }}
                >
                  <Calculator className="w-6 h-6 ml-2" />
                  احسب الراتب
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              
              {/* المبلغ المستحق */}
              <Card className="border-2 border-success shadow-lg bg-gradient-to-br from-success/5 to-success/10">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success ml-2" />
                    <h3 className="text-2xl font-bold text-foreground">المبلغ المستحق لأيام العمل</h3>
                  </div>
                  <div className="text-5xl font-bold text-success mb-2">
                    {formatCurrency(calculations.netSalary)}
                  </div>
                  <p className="text-muted-foreground text-lg">ريال سعودي</p>
                </CardContent>
              </Card>

              {/* تفاصيل قسيمة الراتب */}
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-xl">
                      <FileText className="w-6 h-6 ml-3" />
                      تفاصيل قسيمة الراتب
                    </CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                      className="flex items-center gap-2"
                    >
                      {showCalculationDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showCalculationDetails ? 'إخفاء التفاصيل' : 'عرض تفاصيل الحساب'}
                    </Button>
                  </div>
                </CardHeader>
                
                {showCalculationDetails && (
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">أيام العمل:</span>
                        <span className="font-semibold">{calculations.workingDays} يوماً</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">أيام الشهر:</span>
                        <span className="font-semibold">{calculations.monthDays} يوماً</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span className="text-muted-foreground">الأجر الخاضع للاشتراك:</span>
                        <span className="font-semibold">{formatCurrency(calculations.baseWageSubject)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">اشتراك التأمينات (الموظف):</span>
                        <span className="font-semibold text-destructive">{formatCurrency(calculations.employeeContribution)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">اشتراك التأمينات (صاحب العمل):</span>
                        <span className="font-semibold text-info">{formatCurrency(calculations.employerContribution)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>صافي الراتب لأيام العمل:</span>
                      <span className="text-success">{formatCurrency(calculations.netSalary)}</span>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* أزرار الإجراءات */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={exportPayslipPDF}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4" />
                  تصدير قسيمة الراتب PDF
                </Button>
                <Button
                  onClick={shareCalculation}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  مشاركة الحساب
                </Button>
              </div>
            </div>
          </div>

          {/* مشاركة/اشتراك */}
          <div className="mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Mail className="w-6 h-6" />
                  اشترك ليصلك جديد أدوات الموارد البشرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={sendByEmail} className="bg-primary hover:bg-primary/90">
                    إرسال
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* الأسئلة الشائعة */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">الأسئلة الشائعة</h2>
              <p className="text-muted-foreground text-lg">إجابات على أكثر الأسئلة شيوعاً حول حاسبة الرواتب</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible>
                {FAQ_DATA.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-right">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* CTA سفلي */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-primary to-primary-glow text-white border-0">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">جرّب بُعد HR الآن</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  اكتشف كيف يمكن لنظام بُعد لإدارة الموارد البشرية أن يساعد في تبسيط عمليات الرواتب والموارد البشرية في منشأتك
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/demo-request')}
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    اطلب عرض توضيحي
                  </Button>
                  <Button
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    جولة تفاعلية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};