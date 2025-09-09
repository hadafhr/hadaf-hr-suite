import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calculator, 
  Users, 
  Calendar, 
  Settings, 
  CheckCircle, 
  Download, 
  Mail, 
  Lightbulb, 
  TrendingDown,
  AlertCircle,
  Crown,
  Shield,
  Zap,
  FileText,
  Clock,
  Globe,
  Bot,
  Award,
  Target,
  Building,
  Share2,
  Home,
  ArrowLeft,
  ArrowUp,
  Play,
  MessageCircle,
  Phone,
  Eye,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingTier {
  minEmployees: number;
  maxEmployees: number | null;
  pricePerEmployee: number;
}

const PRICING_TIERS: PricingTier[] = [
  { minEmployees: 1, maxEmployees: 20, pricePerEmployee: 19 },
  { minEmployees: 21, maxEmployees: 50, pricePerEmployee: 18 },
  { minEmployees: 51, maxEmployees: 100, pricePerEmployee: 17 },
  { minEmployees: 101, maxEmployees: 250, pricePerEmployee: 16 },
  { minEmployees: 251, maxEmployees: 500, pricePerEmployee: 15 },
  { minEmployees: 501, maxEmployees: 1000, pricePerEmployee: 14 },
  { minEmployees: 1001, maxEmployees: 2000, pricePerEmployee: 13 },
  { minEmployees: 2001, maxEmployees: null, pricePerEmployee: 12 }
];

const FEATURES = [
  {
    icon: Building,
    title: "دعم نظام العمل السعودي",
    description: "متوافق 100% مع قوانين العمل واللوائح السعودية"
  },
  {
    icon: Globe,
    title: "تكامل مع الجهات الرسمية",
    description: "ربط مباشر مع قوى، مدد، التأمينات الاجتماعية"
  },
  {
    icon: FileText,
    title: "تقارير فورية ذكية",
    description: "تقارير تحليلية متقدمة ولوحات معلومات تفاعلية"
  },
  {
    icon: Users,
    title: "خدمة ذاتية للموظفين",
    description: "منصة متكاملة لإدارة الموظفين لشؤونهم الذاتية"
  },
  {
    icon: FileText,
    title: "توقيع إلكتروني",
    description: "توقيع إلكتروني معتمد للعقود والمستندات"
  },
  {
    icon: Bot,
    title: "دعم بالذكاء الاصطناعي",
    description: "مساعد ذكي متاح 24/7 لدعم العمليات"
  }
];

const FAQ_ITEMS = [
  {
    question: "كيف يتم احتساب الفوترة؟",
    answer: "يتم احتساب الفوترة حسب عدد الموظفين النشطين مع خصومات تدريجية للأعداد الأكبر. يمكنك الاختيار بين الفوترة الشهرية أو السنوية مع خصم 15%."
  },
  {
    question: "هل يمكنني إلغاء الاشتراك في أي وقت؟",
    answer: "نعم، يمكنك إلغاء الاشتراك في أي وقت مع إشعار مسبق 30 يوماً. لا توجد رسوم إلغاء أو التزامات طويلة الأمد."
  },
  {
    question: "ما هو مستوى الدعم المتاح؟",
    answer: "نقدم دعماً فنياً شاملاً يشمل الدعم الهاتفي والبريد الإلكتروني والدردشة المباشرة. كما نوفر تدريباً مجانياً لفريقك."
  },
  {
    question: "هل البيانات آمنة ومحمية؟",
    answer: "نعم، نستخدم أعلى معايير الأمان العالمية مع تشفير البيانات وحماية متعددة المستويات. جميع البيانات محفوظة في خوادم محلية آمنة."
  }
];

export const SubscriptionCalculator: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Initialize state from URL params or defaults
  const [employees, setEmployees] = useState<number>(() => {
    const urlEmployees = searchParams.get('employees');
    return urlEmployees ? Math.max(1, parseInt(urlEmployees)) : 50;
  });
  const [isAnnual, setIsAnnual] = useState<boolean>(() => {
    return searchParams.get('annual') === 'true';
  });
  const [includeSetup, setIncludeSetup] = useState<boolean>(() => {
    return searchParams.get('setup') === 'true';
  });
  const [includeSupport, setIncludeSupport] = useState<boolean>(() => {
    return searchParams.get('support') === 'true';
  });
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState<number>(0);
  const { toast } = useToast();

  // Update URL when state changes
  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set('employees', employees.toString());
    newParams.set('annual', isAnnual.toString());
    newParams.set('setup', includeSetup.toString());
    newParams.set('support', includeSupport.toString());
    setSearchParams(newParams, { replace: true });
  }, [employees, isAnnual, includeSetup, includeSupport, setSearchParams]);

  // Configuration (would come from admin panel)
  const config = {
    annualDiscount: 15, // 15%
    setupFee: 2500, // ﷼
    supportFeeMonthly: 500, // ﷼
    supportFeeAnnual: 5000, // ﷼
  };

  const currentTier = useMemo(() => {
    return PRICING_TIERS.find(tier => 
      employees >= tier.minEmployees && 
      (tier.maxEmployees === null || employees <= tier.maxEmployees)
    ) || PRICING_TIERS[PRICING_TIERS.length - 1];
  }, [employees]);

  const nextTier = useMemo(() => {
    const currentIndex = PRICING_TIERS.findIndex(tier => 
      employees >= tier.minEmployees && 
      (tier.maxEmployees === null || employees <= tier.maxEmployees)
    );
    return currentIndex < PRICING_TIERS.length - 1 ? PRICING_TIERS[currentIndex + 1] : null;
  }, [employees]);

  const calculations = useMemo(() => {
    const basePrice = employees * currentTier.pricePerEmployee;
    const supportCost = includeSupport ? (isAnnual ? config.supportFeeAnnual : config.supportFeeMonthly) : 0;
    const setupCost = includeSetup ? config.setupFee : 0;

    let monthlyTotal = basePrice + (isAnnual ? 0 : supportCost);
    let annualTotal = basePrice * 12 + (isAnnual ? supportCost : supportCost * 12);
    
    if (isAnnual) {
      const discount = annualTotal * (config.annualDiscount / 100);
      annualTotal = annualTotal - discount;
    }

    const finalTotal = isAnnual ? annualTotal + setupCost : monthlyTotal + setupCost;
    const savings = isAnnual ? (basePrice * 12 + (includeSupport ? config.supportFeeMonthly * 12 : 0)) - annualTotal : 0;

    return {
      basePrice,
      supportCost,
      setupCost,
      monthlyTotal,
      annualTotal,
      finalTotal,
      savings,
      pricePerEmployee: currentTier.pricePerEmployee
    };
  }, [employees, isAnnual, includeSetup, includeSupport, currentTier, config]);

  const handleEmployeesChange = (value: string) => {
    const num = parseInt(value) || 0;
    if (num >= 1 && num <= 10000) {
      setEmployees(num);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount).replace('ر.س.', '') + ' ﷼';
  };

  const contactSales = () => {
    toast({
      title: "تواصل معنا",
      description: "سيتم توجيهكم لصفحة التواصل",
    });
    // Navigate to contact page or open contact modal
  };

  const requestDemo = () => {
    toast({
      title: "طلب عرض توضيحي",
      description: "سيتم توجيهكم لصفحة طلب العرض التوضيحي",
    });
    // Navigate to demo request page or open demo modal
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePDF = () => {
    // This would generate a PDF with the calculation details
    toast({
      title: "تم إنشاء PDF",
      description: "سيتم تحميل ملف العرض التفصيلي خلال لحظات",
    });
  };

  const sendByEmail = () => {
    // This would send the calculation by email
    toast({
      title: "تم الإرسال بالبريد الإلكتروني",
      description: "سيتم إرسال تفاصيل العرض إلى بريدكم الإلكتروني",
    });
  };

  const shareCalculation = () => {
    const url = `${window.location.origin}/service-calculator?employees=${employees}&annual=${isAnnual}&setup=${includeSetup}&support=${includeSupport}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "تم نسخ الرابط",
      description: "يمكنك مشاركة هذا الرابط مع فريقك",
    });
  };

  // Animate total price changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedTotal(calculations.finalTotal);
    }, 100);
    return () => clearTimeout(timer);
  }, [calculations]);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      
      {/* Header Navigation */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <Home className="w-4 h-4" />
                الرئيسية
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-lg font-bold text-gray-900">حاسبة الاشتراك</h1>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                variant="outline" 
                onClick={contactSales}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:border-gray-900"
              >
                <MessageCircle className="w-4 h-4" />
                تواصل معنا
              </Button>
              <Button 
                onClick={requestDemo}
                className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                عرض توضيحي
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gray-900 text-white px-4 py-2 text-sm font-semibold">
              <Calculator className="w-4 h-4 ml-2" />
              حاسبة الاشتراك الذكية
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              احسب اشتراكك في بُعد HR
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              احصل على عرض سعر مخصص لمنشأتك واكتشف كم ستوفر مع نظام بُعد لإدارة الموارد البشرية
            </p>
          </div>

          {/* Quick Calculator Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <Label className="text-gray-700 font-semibold mb-2 block">عدد الموظفين</Label>
                <Input
                  type="number"
                  value={employees}
                  onChange={(e) => handleEmployeesChange(e.target.value)}
                  className="text-center text-lg font-bold border-2"
                  min={1}
                  max={10000}
                />
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">السعر الإجمالي</div>
                <div className="text-2xl font-bold text-gray-900 transition-all duration-500">
                  {formatCurrency(animatedTotal || calculations.finalTotal)}
                </div>
                <div className="text-sm text-gray-600">
                  {isAnnual ? 'سنوياً' : 'شهرياً'}
                </div>
              </div>
              <div>
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  احسب التفاصيل
                  <Calculator className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section id="calculator" className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Calculator Card */}
            <Card className="border-2 border-gray-200 shadow-xl">
              <CardHeader className="bg-gray-900 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Calculator className="w-6 h-6 ml-3" />
                  حاسبة الاشتراك
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                
                {/* Employee Count Input */}
                <div className="space-y-3">
                  <Label className="text-gray-900 font-semibold text-lg flex items-center">
                    <Users className="w-5 h-5 ml-2 text-teal-600" />
                    عدد الموظفين
                  </Label>
                  <Input
                    type="number"
                    value={employees}
                    onChange={(e) => handleEmployeesChange(e.target.value)}
                    className="text-xl font-bold text-center border-2 border-gray-300 focus:border-teal-600"
                    min={1}
                    max={10000}
                    placeholder="أدخل عدد الموظفين"
                  />
                  <div className="text-sm text-gray-600 text-center">
                    سعر الوحدة: <span className="font-bold text-teal-600">{formatCurrency(currentTier.pricePerEmployee)}</span> للموظف الواحد
                  </div>
                  
                  {/* AI Suggestion for next tier */}
                  {nextTier && (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-teal-700">
                          <span className="font-semibold">نصيحة ذكية:</span> إذا أضفت {nextTier.minEmployees - employees} موظفين إضافيين، 
                          ينخفض سعر الوحدة إلى <span className="font-bold">{formatCurrency(nextTier.pricePerEmployee)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Billing Cycle Toggle */}
                <div className="space-y-3">
                  <Label className="text-gray-900 font-semibold text-lg flex items-center">
                    <Calendar className="w-5 h-5 ml-2 text-teal-600" />
                    دورة الفوترة
                  </Label>
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {isAnnual ? 'فوترة سنوية' : 'فوترة شهرية'}
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-teal-600 font-semibold">
                          وفّر {formatCurrency(calculations.savings)} سنوياً
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={!isAnnual ? 'font-semibold text-gray-900' : 'text-gray-600'}>شهري</span>
                      <Switch
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                        className="data-[state=checked]:bg-teal-600"
                      />
                      <span className={isAnnual ? 'font-semibold text-gray-900' : 'text-gray-600'}>سنوي</span>
                      {isAnnual && (
                        <Badge className="bg-teal-600 text-white">خصم 15%</Badge>
                      )}
                    </div>
                  </div>
                  
                  {!isAnnual && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <TrendingDown className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-700">
                          <span className="font-semibold">اقتراح توفير:</span> وفّر <span className="font-bold">{formatCurrency((employees * currentTier.pricePerEmployee * 12 * config.annualDiscount / 100) + (includeSupport ? config.supportFeeMonthly * 12 - config.supportFeeAnnual : 0))}</span> بالاشتراك السنوي
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Add-ons */}
                <div className="space-y-4">
                  <Label className="text-gray-900 font-semibold text-lg flex items-center">
                    <Settings className="w-5 h-5 ml-2 text-teal-600" />
                    الإضافات الاختيارية
                  </Label>
                  
                  {/* Setup Fee */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Checkbox
                        id="setup"
                        checked={includeSetup}
                        onCheckedChange={(checked) => setIncludeSetup(checked === true)}
                        className="border-2 border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                      />
                      <div>
                        <Label htmlFor="setup" className="font-semibold text-gray-900 cursor-pointer">
                          رسوم التأسيس
                        </Label>
                        <div className="text-sm text-gray-600">إعداد النظام وتدريب الفريق (مرة واحدة)</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(config.setupFee)}
                    </div>
                  </div>

                  {/* Technical Support */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Checkbox
                        id="support"
                        checked={includeSupport}
                        onCheckedChange={(checked) => setIncludeSupport(checked === true)}
                        className="border-2 border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                      />
                      <div>
                        <Label htmlFor="support" className="font-semibold text-gray-900 cursor-pointer">
                          الدعم الفني المتقدم
                        </Label>
                        <div className="text-sm text-gray-600">
                          دعم فني مخصص وأولوية في الاستجابة
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      {isAnnual 
                        ? formatCurrency(config.supportFeeAnnual) 
                        : `${formatCurrency(config.supportFeeMonthly)}/شهر`
                      }
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="border-2 border-teal-200 shadow-xl">
              <CardHeader className="bg-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <FileText className="w-6 h-6 ml-3" />
                  ملخص التكلفة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                
                {/* Pricing Breakdown */}
                <div className="space-y-4">
                  
                  {/* Base Price */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">الاشتراك الأساسي</div>
                      <div className="text-sm text-gray-600">
                        {employees} موظف × {formatCurrency(currentTier.pricePerEmployee)} 
                        {isAnnual && ' × 12 شهر'}
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(isAnnual ? calculations.basePrice * 12 : calculations.basePrice)}
                    </div>
                  </div>

                  {/* Annual Discount */}
                  {isAnnual && (
                    <div className="flex justify-between items-center text-teal-600">
                      <div>
                        <div className="font-semibold">خصم الاشتراك السنوي</div>
                        <div className="text-sm">خصم {config.annualDiscount}% على الاشتراك الأساسي</div>
                      </div>
                      <div className="font-bold">
                        -{formatCurrency(calculations.basePrice * 12 * config.annualDiscount / 100)}
                      </div>
                    </div>
                  )}

                  {/* Support Fee */}
                  {includeSupport && (
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">الدعم الفني المتقدم</div>
                        <div className="text-sm text-gray-600">
                          {isAnnual ? 'اشتراك سنوي' : 'اشتراك شهري'}
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        {formatCurrency(calculations.supportCost)}
                      </div>
                    </div>
                  )}

                  {/* Setup Fee */}
                  {includeSetup && (
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">رسوم التأسيس</div>
                        <div className="text-sm text-gray-600">دفعة واحدة فقط</div>
                      </div>
                      <div className="font-bold text-gray-900">
                        {formatCurrency(calculations.setupCost)}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg">
                    <div>
                      <div className="text-lg font-bold">الإجمالي</div>
                      <div className="text-sm opacity-90">
                        {isAnnual ? 'سنوياً' : 'شهرياً'}
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(calculations.finalTotal)}
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  {isAnnual && calculations.savings > 0 && (
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                      <div className="text-teal-700">
                        <div className="font-bold text-lg">توفير سنوي</div>
                        <div className="text-2xl font-bold text-teal-600">
                          {formatCurrency(calculations.savings)}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={generatePDF}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل العرض التفصيلي PDF
                  </Button>
                  <Button 
                    onClick={sendByEmail}
                    variant="outline"
                    className="w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    <Mail className="w-4 h-4 ml-2" />
                    إرسال بالبريد الإلكتروني
                  </Button>
                  <Button 
                    onClick={shareCalculation}
                    variant="outline"
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                  >
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة الحساب
                  </Button>
                </div>

              </CardContent>
            </Card>

          </div>

          {/* Action Buttons Row */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Button 
                onClick={requestDemo}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Play className="w-5 h-5 ml-2" />
                احجز عرضاً توضيحياً
              </Button>
              <Button 
                onClick={contactSales}
                size="lg"
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              >
                <Phone className="w-5 h-5 ml-2" />
                تحدث مع خبير المبيعات
              </Button>
              <Button 
                onClick={generatePDF}
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
              >
                <Download className="w-5 h-5 ml-2" />
                تحميل عرض السعر PDF
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Tiers Display */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              هيكل التسعير حسب عدد الموظفين
            </h2>
            <p className="text-xl text-gray-600">
              كلما زاد عدد الموظفين، انخفض السعر للموظف الواحد
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRICING_TIERS.map((tier, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all duration-300 hover:shadow-lg ${
                  employees >= tier.minEmployees && 
                  (tier.maxEmployees === null || employees <= tier.maxEmployees)
                    ? 'border-teal-600 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {tier.minEmployees}-{tier.maxEmployees || '∞'} موظف
                  </div>
                  <div className="text-2xl font-bold text-teal-600 mb-1">
                    {formatCurrency(tier.pricePerEmployee)}
                  </div>
                  <div className="text-sm text-gray-600">
                    لكل موظف شهرياً
                  </div>
                  {employees >= tier.minEmployees && 
                   (tier.maxEmployees === null || employees <= tier.maxEmployees) && (
                    <Badge className="mt-3 bg-teal-600 text-white">
                      مستواك الحالي
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مميزات الاشتراك في بُعد HR
            </h2>
            <p className="text-xl text-gray-600">
              احصل على جميع هذه المميزات مع اشتراكك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="border border-gray-200 hover:border-teal-600 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Guarantee */}
      <section className="py-16 px-6 bg-teal-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-teal-200">
            <div className="mb-6">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ضمان أفضل سعر في السوق
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                نضمن لك أسعاراً أقل من المنافسين بـ 5% على الأقل
              </p>
            </div>
            
            <div className="bg-teal-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Shield className="w-8 h-8" />
                <span className="text-2xl font-bold">ضمان المنافسة</span>
              </div>
              <p className="text-lg">
                إذا وجدت سعراً أفضل من منافس آخر، سنطابق السعر ونخفض عنه 5% إضافية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              أجوبة على أكثر الأسئلة شيوعاً حول الفوترة والاشتراك
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <Card key={index} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-right hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-900 text-right">{item.question}</h3>
                      <div className={`transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                        <ArrowUp className="w-5 h-5 text-teal-600" />
                      </div>
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                      <p className="text-gray-600 text-right leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gray-900 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              جاهز لبدء رحلتك مع بُعد HR؟
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              انضم إلى آلاف الشركات التي تثق بنا في إدارة مواردها البشرية
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                onClick={requestDemo}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                <Eye className="w-5 h-5 ml-2" />
                احجز عرضاً توضيحياً
              </Button>
              <Button 
                onClick={contactSales}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تواصل معنا
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  إعداد مجاني
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  دعم على مدار الساعة
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  ضمان استرداد الأموال
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg transition-all duration-300 hover:scale-110"
        size="sm"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>

    </div>
  );
};