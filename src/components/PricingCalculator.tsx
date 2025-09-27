import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calculator, 
  Users, 
  FileText, 
  Download,
  Mail,
  CheckCircle,
  Star,
  Shield,
  Zap,
  Bot,
  Award,
  TrendingDown,
  Building2,
  HeadphonesIcon
} from 'lucide-react';
import { BoudLogo } from './BoudLogo';

interface PricingCalculatorProps {
  selectedPackage?: string;
  onBack?: () => void;
}

// Tiered pricing structure (SAR per employee per month)
const pricingTiers = [
  { min: 1, max: 20, price: 19 },
  { min: 21, max: 50, price: 18 },
  { min: 51, max: 100, price: 17 },
  { min: 101, max: 250, price: 16 },
  { min: 251, max: 500, price: 15 },
  { min: 501, max: 1000, price: 14 },
  { min: 1001, max: 2000, price: 13 },
  { min: 2001, max: Infinity, price: 12 }
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = () => {
  const [employeeCount, setEmployeeCount] = useState(50);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [includeSetup, setIncludeSetup] = useState(false);
  const [includeSupport, setIncludeSupport] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Configuration values (would be admin-editable)
  const setupFee = 2500;
  const supportFeeMonthly = 500;
  const supportFeeYearly = 5000;
  const annualDiscount = 0.15; // 15%

  // Calculate price per employee based on tier
  const getPricePerEmployee = (count: number) => {
    const tier = pricingTiers.find(t => count >= t.min && count <= t.max);
    return tier ? tier.price : 12; // fallback to lowest price
  };

  // Calculate totals
  const calculateTotals = () => {
    const pricePerEmployee = getPricePerEmployee(employeeCount);
    const baseMonthly = employeeCount * pricePerEmployee;
    const supportCost = includeSupport ? (billingCycle === 'yearly' ? supportFeeYearly : supportFeeMonthly) : 0;
    const setupCost = includeSetup ? setupFee : 0;

    let total = 0;
    let savings = 0;

    if (billingCycle === 'yearly') {
      const yearlyBase = baseMonthly * 12;
      const discountAmount = yearlyBase * annualDiscount;
      total = (yearlyBase - discountAmount) + supportCost + setupCost;
      savings = discountAmount;
    } else {
      total = baseMonthly + supportCost + setupCost;
    }

    return {
      pricePerEmployee,
      baseMonthly,
      supportCost,
      setupCost,
      total,
      savings,
      annualTotal: billingCycle === 'yearly' ? total : (baseMonthly * 12) + (supportCost * 12) + setupCost
    };
  };

  const calculation = calculateTotals();

  // AI Suggestions
  const getAISuggestions = () => {
    const suggestions = [];
    
    if (billingCycle === 'monthly') {
      suggestions.push(`💡 وفّر ${calculation.savings.toLocaleString()} ﷼ بالاشتراك السنوي`);
    }

    // Check next tier savings
    const nextTier = pricingTiers.find(t => employeeCount < t.min);
    if (nextTier) {
      const employeesNeeded = nextTier.min - employeeCount;
      const currentPrice = getPricePerEmployee(employeeCount);
      const nextPrice = nextTier.price;
      const savingsPerEmployee = currentPrice - nextPrice;
      
      if (savingsPerEmployee > 0) {
        suggestions.push(`🚀 إذا أضفت ${employeesNeeded} موظفًا إضافيًا ينخفض سعر الوحدة إلى ${nextPrice} ﷼`);
      }
    }

    return suggestions;
  };

  const generatePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    // Add Arabic support (RTL)
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(20);
    doc.text('عرض سعر نظام بُعد لإدارة الموارد البشرية', 20, 30);
    
    // Company details
    doc.setFontSize(12);
    doc.text(`اسم الشركة: ${companyName}`, 20, 50);
    doc.text(`البريد الإلكتروني: ${contactEmail}`, 20, 60);
    doc.text(`عدد الموظفين: ${employeeCount}`, 20, 70);
    doc.text(`دورة الفوترة: ${billingCycle === 'yearly' ? 'سنوي' : 'شهري'}`, 20, 80);
    
    // Pricing breakdown
    doc.setFontSize(14);
    doc.text('تفاصيل التسعير:', 20, 100);
    
    let yPos = 115;
    doc.setFontSize(10);
    
    doc.text(`سعر الموظف الواحد: ${calculation.pricePerEmployee} ﷼/شهر`, 25, yPos);
    yPos += 10;
    doc.text(`التكلفة الأساسية: ${calculation.baseMonthly.toLocaleString()} ﷼/شهر`, 25, yPos);
    yPos += 10;
    
    if (includeSetup) {
      doc.text(`رسوم التأسيس: ${setupFee.toLocaleString()} ﷼`, 25, yPos);
      yPos += 10;
    }
    
    if (includeSupport) {
      doc.text(`الدعم الفني: ${calculation.supportCost.toLocaleString()} ﷼`, 25, yPos);
      yPos += 10;
    }
    
    if (billingCycle === 'yearly' && calculation.savings > 0) {
      doc.text(`الخصم السنوي (15%): -${calculation.savings.toLocaleString()} ﷼`, 25, yPos);
      yPos += 10;
    }
    
    // Total
    doc.setFontSize(14);
    doc.text(`المجموع النهائي: ${calculation.total.toLocaleString()} ﷼`, 25, yPos + 15);
    
    doc.save(`Boud-HR-Quote-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-l from-teal-600 to-teal-700 text-white">
        {/* Navigation Bar */}
        <div className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <BoudLogo variant="icon" size="sm" />
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 hover:text-white"
                    onClick={() => window.location.href = '/'}
                  >
                    الصفحة الرئيسية
                  </Button>
                  <span className="text-white/70">|</span>
                  <span className="text-white/90">حاسبة الاشتراكات</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-teal-700 transition-colors"
                  onClick={() => window.location.href = '/'}
                >
                  <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  العودة للرئيسية
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-teal-700 hover:bg-gray-100"
                >
                  <HeadphonesIcon className="h-4 w-4 ml-2" />
                  الدعم الفني
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="py-16 relative z-10 backdrop-blur-xl bg-black/30 rounded-3xl border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 mx-4 my-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-6">
              <Badge variant="secondary" className="bg-black/40 text-[#00B488] border-[#008C6A]/30 text-sm px-3 py-1 mb-4 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
                <Calculator className="h-4 w-4 ml-2" />
                حاسبة ذكية متقدمة
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">احسب اشتراكك بدقة</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              احصل على عرض سعر فوري ومخصص لنظام إدارة الموارد البشرية الأكثر تقدماً في المملكة
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-black/40 text-[#00B488] border-[#008C6A]/30 text-base px-4 py-2 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
                <Award className="h-5 w-5 ml-2" />
                أقل من السوق بـ 5% على الأقل
              </Badge>
              <Badge variant="secondary" className="bg-black/40 text-[#00B488] border-[#008C6A]/30 text-base px-4 py-2 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
                <Shield className="h-5 w-5 ml-2" />
                ضمان الاسترداد
              </Badge>
              <Badge variant="secondary" className="bg-black/40 text-[#00B488] border-[#008C6A]/30 text-base px-4 py-2 backdrop-blur-sm hover:bg-black/60 transition-all duration-300">
                <Star className="h-5 w-5 ml-2" />
                دعم 24/7
              </Badge>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">شركة تثق بنا</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-white/80">وقت التشغيل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">دعم فني</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Info */}
            <Card className="p-6 border-2 border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                <Building2 className="h-6 w-6 text-teal-600" />
                معلومات الشركة
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700">اسم الشركة *</Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="اسم شركتك"
                    className="border-gray-200 focus:border-teal-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">البريد الإلكتروني *</Label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="border-gray-200 focus:border-teal-500"
                  />
                </div>
              </div>
            </Card>

            {/* Employee Count */}
            <Card className="p-6 border-2 border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                <Users className="h-6 w-6 text-teal-600" />
                عدد الموظفين: {employeeCount}
              </h3>
              <div className="space-y-4">
                <Slider
                  value={[employeeCount]}
                  onValueChange={(value) => setEmployeeCount(Math.max(1, value[0]))}
                  max={3000}
                  min={1}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-teal-600 [&_[role=slider]]:border-teal-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>1 موظف</span>
                  <span>3000+ موظف</span>
                </div>
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50">
                    سعر الوحدة: {calculation.pricePerEmployee} ﷼/شهر
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Billing Cycle */}
            <Card className="p-6 border-2 border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">دورة الفوترة</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={billingCycle === 'monthly' ? "default" : "outline"}
                  onClick={() => setBillingCycle('monthly')}
                  className={`h-auto p-4 ${billingCycle === 'monthly' ? 'bg-teal-600 hover:bg-teal-700' : 'border-gray-200 hover:border-teal-300'}`}
                >
                  <div className="text-center">
                    <div className="font-medium">شهري</div>
                    <div className="text-xs opacity-75">دفع شهري</div>
                  </div>
                </Button>
                <Button
                  variant={billingCycle === 'yearly' ? "default" : "outline"}
                  onClick={() => setBillingCycle('yearly')}
                  className={`h-auto p-4 relative ${billingCycle === 'yearly' ? 'bg-teal-600 hover:bg-teal-700' : 'border-gray-200 hover:border-teal-300'}`}
                >
                  <Badge className="absolute -top-2 -right-2 bg-orange-500">
                    وفر 15%
                  </Badge>
                  <div className="text-center">
                    <div className="font-medium">سنوي</div>
                    <div className="text-xs opacity-75">وفر شهرين</div>
                  </div>
                </Button>
              </div>
            </Card>

            {/* Additional Services */}
            <Card className="p-6 border-2 border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">الخدمات الإضافية</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">رسوم التأسيس</div>
                    <div className="text-sm text-gray-600">إعداد كامل للنظام وتكوين الشركة</div>
                    <div className="text-sm font-medium text-teal-600">
                      {setupFee.toLocaleString()} ﷼ (مرة واحدة)
                    </div>
                  </div>
                  <Checkbox
                    checked={includeSetup}
                    onCheckedChange={(checked) => setIncludeSetup(checked === true)}
                    className="border-teal-300 data-[state=checked]:bg-teal-600"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">الدعم الفني المتقدم</div>
                    <div className="text-sm text-gray-600">دعم فني متقدم 24/7 مع مدير حساب مخصص</div>
                    <div className="text-sm font-medium text-teal-600">
                      {billingCycle === 'yearly' 
                        ? `${supportFeeYearly.toLocaleString()} ﷼/سنوياً` 
                        : `${supportFeeMonthly.toLocaleString()} ﷼/شهرياً`
                      }
                    </div>
                  </div>
                  <Checkbox
                    checked={includeSupport}
                    onCheckedChange={(checked) => setIncludeSupport(checked === true)}
                    className="border-teal-300 data-[state=checked]:bg-teal-600"
                  />
                </div>
              </div>
            </Card>

            {/* AI Suggestions */}
            {getAISuggestions().length > 0 && (
              <Card className="p-6 border-2 border-teal-100 bg-teal-50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-teal-900">
                  <Bot className="h-5 w-5" />
                  اقتراحات ذكية
                </h3>
                <div className="space-y-2">
                  {getAISuggestions().map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2 text-teal-800">
                      <Zap className="h-4 w-4" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="p-6 border-2 border-teal-100 sticky top-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                <Calculator className="h-6 w-6 text-teal-600" />
                ملخص التكلفة
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">التكلفة الأساسية ({billingCycle === 'yearly' ? 'سنوي' : 'شهري'})</span>
                  <span className="font-medium">
                    {billingCycle === 'yearly' 
                      ? (calculation.baseMonthly * 12).toLocaleString() 
                      : calculation.baseMonthly.toLocaleString()
                    } ﷼
                  </span>
                </div>
                
                {includeSetup && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم التأسيس</span>
                    <span className="font-medium">{setupFee.toLocaleString()} ﷼</span>
                  </div>
                )}
                
                {includeSupport && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">الدعم الفني</span>
                    <span className="font-medium">{calculation.supportCost.toLocaleString()} ﷼</span>
                  </div>
                )}
                
                {billingCycle === 'yearly' && calculation.savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>الخصم السنوي (15%)</span>
                    <span>-{calculation.savings.toLocaleString()} ﷼</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold text-xl">
                  <span className="text-gray-900">المجموع</span>
                  <span className="text-teal-600">{calculation.total.toLocaleString()} ﷼</span>
                </div>
                
                {billingCycle === 'yearly' && calculation.savings > 0 && (
                  <p className="text-xs text-green-600 text-center">
                    توفير {calculation.savings.toLocaleString()} ﷼ سنوياً
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={generatePDF}
                  disabled={!companyName || !contactEmail}
                >
                  <Download className="h-4 w-4 ml-2" />
                  تحميل عرض السعر
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                  disabled={!companyName || !contactEmail}
                >
                  <Mail className="h-4 w-4 ml-2" />
                  إرسال بالبريد الإلكتروني
                </Button>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 border-2 border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900">مميزات الاشتراك</h3>
              <div className="space-y-3">
                {[
                  'دعم نظام العمل السعودي',
                  'تكامل مع الجهات الرسمية',
                  'تقارير فورية ذكية',
                  'خدمة ذاتية للموظفين',
                  'توقيع إلكتروني',
                  'دعم بالذكاء الاصطناعي'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Guarantee */}
            <Card className="p-4 border-2 border-teal-200 bg-teal-50 text-center">
              <div className="flex justify-center mb-2">
                <TrendingDown className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="font-bold text-teal-900 mb-1">ضمان المنافسة</h4>
              <p className="text-sm text-teal-800">أقل من السوق بـ 5% على الأقل</p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">الأسئلة الشائعة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-gray-200">
              <h4 className="font-bold mb-2 text-gray-900">كيف يتم احتساب الفوترة؟</h4>
              <p className="text-sm text-gray-600">
                يتم احتساب الفوترة حسب عدد الموظفين الفعليين في النظام مع أسعار متدرجة تقل كلما زاد العدد.
              </p>
            </Card>
            <Card className="p-6 border-gray-200">
              <h4 className="font-bold mb-2 text-gray-900">هل يمكن إلغاء الاشتراك؟</h4>
              <p className="text-sm text-gray-600">
                نعم، يمكن إلغاء الاشتراك في أي وقت مع ضمان استرداد المبلغ المتبقي من الفترة المدفوعة.
              </p>
            </Card>
            <Card className="p-6 border-gray-200">
              <h4 className="font-bold mb-2 text-gray-900">ما هو الدعم الفني المتوفر؟</h4>
              <p className="text-sm text-gray-600">
                نوفر دعم فني أساسي مجاني، ودعم متقدم 24/7 مع مدير حساب مخصص كخدمة إضافية.
              </p>
            </Card>
            <Card className="p-6 border-gray-200">
              <h4 className="font-bold mb-2 text-gray-900">هل الأسعار شاملة الضريبة؟</h4>
              <p className="text-sm text-gray-600">
                جميع الأسعار المعروضة غير شاملة ضريبة القيمة المضافة والتي ستضاف عند الفوترة.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};