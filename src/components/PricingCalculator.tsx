import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Users, 
  ArrowLeft, 
  FileText, 
  CreditCard,
  Bot,
  CheckCircle,
  Settings,
  GraduationCap,
  HeadphonesIcon
} from 'lucide-react';
import { BoudLogo } from './BoudLogo';
import { AIRecommendations } from './AIRecommendations';

interface PricingCalculatorProps {
  selectedPackage?: string;
  onBack?: () => void;
}

interface AdditionalService {
  id: string;
  title: string;
  price: number;
  unit: string;
  description: string;
}

const additionalServices: AdditionalService[] = [
  {
    id: 'setup',
    title: 'تأسيس النظام',
    price: 1500,
    unit: 'مرة واحدة',
    description: 'إعداد كامل للنظام وتكوين الشركة'
  },
  {
    id: 'training',
    title: 'التدريب',
    price: 200,
    unit: 'لكل موظف',
    description: 'تدريب شامل للموظفين على استخدام النظام'
  },
  {
    id: 'support',
    title: 'الدعم الفني المتقدم',
    price: 499,
    unit: 'شهريًا',
    description: 'دعم فني متقدم 24/7 مع مدير حساب مخصص'
  }
];

const packagePricing = {
  startup: { price: 399, maxEmployees: 10, name: 'الباقة الصغيرة' },
  basic: { price: 899, maxEmployees: 50, name: 'الباقة الأساسية' },
  professional: { price: 1899, maxEmployees: 250, name: 'الباقة الاحترافية' },
  enterprise: { price: 3899, maxEmployees: Infinity, name: 'الباقة الشاملة' }
};

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  selectedPackage, 
  onBack 
}) => {
  const [employeeCount, setEmployeeCount] = useState(10);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedServices, setSelectedServices] = useState<{[key: string]: number}>({});
  const [currentPackage, setCurrentPackage] = useState(selectedPackage || 'professional');

  // حساب السعر الإجمالي
  const calculateTotal = () => {
    const pkg = packagePricing[currentPackage as keyof typeof packagePricing];
    if (!pkg) return { monthly: 0, total: 0, breakdown: [] };

    let monthlyPrice = pkg.price;
    let oneTimeTotal = 0;
    let monthlyServices = 0;
    
    const breakdown = [];

    // إضافة سعر الباقة الأساسية
    breakdown.push({
      item: pkg.name,
      type: 'subscription',
      monthly: monthlyPrice,
      total: billingCycle === 'yearly' ? monthlyPrice * 12 * 0.85 : monthlyPrice
    });

    // حساب الخدمات الإضافية
    Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
      if (quantity > 0) {
        const service = additionalServices.find(s => s.id === serviceId);
        if (service) {
          if (service.unit === 'مرة واحدة') {
            oneTimeTotal += service.price * quantity;
            breakdown.push({
              item: service.title,
              type: 'onetime',
              quantity,
              unitPrice: service.price,
              total: service.price * quantity
            });
          } else if (service.unit === 'لكل موظف') {
            const employeeServiceTotal = service.price * employeeCount;
            oneTimeTotal += employeeServiceTotal;
            breakdown.push({
              item: service.title,
              type: 'employee-based',
              quantity: employeeCount,
              unitPrice: service.price,
              total: employeeServiceTotal
            });
          } else if (service.unit === 'شهريًا') {
            monthlyServices += service.price * quantity;
            breakdown.push({
              item: service.title,
              type: 'monthly-service',
              monthly: service.price * quantity,
              total: billingCycle === 'yearly' 
                ? (service.price * quantity * 12 * 0.85) 
                : service.price * quantity
            });
          }
        }
      }
    });

    const totalMonthly = monthlyPrice + monthlyServices;
    let subscriptionTotal = totalMonthly;

    if (billingCycle === 'yearly') {
      subscriptionTotal = totalMonthly * 12 * 0.85; // خصم 15%
    }

    const grandTotal = subscriptionTotal + oneTimeTotal;

    return {
      monthly: totalMonthly,
      yearly: totalMonthly * 12 * 0.85,
      oneTime: oneTimeTotal,
      total: grandTotal,
      discount: billingCycle === 'yearly' ? totalMonthly * 12 * 0.15 : 0,
      breakdown
    };
  };

  const calculation = calculateTotal();

  const handleServiceChange = (serviceId: string, value: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: Math.max(0, value)
    }));
  };

  const handlePayment = (method: string) => {
    if (!companyName || !contactEmail) {
      alert('يرجى إدخال اسم الشركة والبريد الإلكتروني أولاً');
      return;
    }

    // إنشاء الفاتورة أولاً
    generatePDF();

    // رسالة تأكيد وفقاً لطريقة الدفع
    const paymentMessages = {
      'mada': 'سيتم توجيهك لبوابة الدفع بالمدى',
      'apple-pay': 'سيتم فتح Apple Pay',
      'stc-pay': 'سيتم توجيهك لتطبيق STC Pay',
      'visa-mastercard': 'سيتم توجيهك لبوابة الدفع الإلكتروني',
      'bank-transfer': 'سيتم إرسال تفاصيل التحويل البنكي على بريدك الإلكتروني'
    };

    alert(paymentMessages[method] || 'تم اختيار طريقة الدفع');
    
    // هنا يمكن إضافة التكامل مع بوابات الدفع الفعلية
    console.log('Payment method selected:', method, 'Total:', calculation.total);
  };

  const generatePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    const invoiceData = {
      companyName,
      contactEmail,
      employeeCount,
      selectedPackage: currentPackage,
      billingCycle,
      calculation,
      date: new Date().toLocaleDateString('ar-SA'),
      invoiceNumber: `BOUD-${Date.now()}`
    };

    // إعداد الخط العربي
    doc.setFont('helvetica');
    
    // العنوان الرئيسي
    doc.setFontSize(20);
    doc.text('BOUD HR System Invoice', 20, 30);
    doc.text('فاتورة نظام بُعد لإدارة الموارد البشرية', 20, 45);
    
    // معلومات الفاتورة
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 65);
    doc.text(`Date: ${invoiceData.date}`, 20, 75);
    doc.text(`Company: ${invoiceData.companyName}`, 20, 85);
    doc.text(`Email: ${invoiceData.contactEmail}`, 20, 95);
    doc.text(`Employees: ${invoiceData.employeeCount}`, 20, 105);
    
    // تفاصيل الباقة
    doc.setFontSize(14);
    doc.text('Package Details:', 20, 125);
    
    let yPos = 140;
    doc.setFontSize(10);
    
    calculation.breakdown.forEach((item) => {
      doc.text(`${item.item}: ${item.total?.toLocaleString()} SAR`, 25, yPos);
      yPos += 10;
    });
    
    // الخصم إن وجد
    if (calculation.discount > 0) {
      doc.text(`Annual Discount (15%): -${calculation.discount.toLocaleString()} SAR`, 25, yPos);
      yPos += 10;
    }
    
    // المجموع النهائي
    doc.setFontSize(14);
    doc.text(`Total: ${calculation.total.toLocaleString()} SAR`, 25, yPos + 15);
    
    // حفظ الملف
    doc.save(`BOUD-HR-Invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {onBack && (
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            العودة للباقات
          </Button>
        )}
        <div className="flex items-center gap-4">
          <BoudLogo variant="icon" size="sm" />
          <div>
            <h1 className="text-2xl font-bold text-gradient">حاسبة خدمات بُعد HR الذكية</h1>
            <p className="text-muted-foreground">احسب تكلفة اشتراكك بدقة مع التسعير الديناميكي</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* معلومات الشركة */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              معلومات الشركة
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>اسم الشركة *</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="اسم شركتك"
                />
              </div>
              <div>
                <Label>البريد الإلكتروني *</Label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="email@company.com"
                />
              </div>
            </div>
          </Card>

          {/* اختيار الباقة */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">اختيار الباقة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(packagePricing).map(([key, pkg]) => (
                <Button
                  key={key}
                  variant={currentPackage === key ? "default" : "outline"}
                  onClick={() => setCurrentPackage(key)}
                  className="h-auto p-3 flex-col"
                >
                  <div className="text-sm font-medium">{pkg.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {pkg.price.toLocaleString()} ر.س/شهر
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* عدد الموظفين */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              عدد الموظفين: {employeeCount}
            </h3>
            <div className="space-y-4">
              <Slider
                value={[employeeCount]}
                onValueChange={(value) => setEmployeeCount(value[0])}
                max={500}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1 موظف</span>
                <span>500+ موظف</span>
              </div>
            </div>
          </Card>

          {/* دورة الفوترة */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">دورة الفوترة</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={billingCycle === 'monthly' ? "default" : "outline"}
                onClick={() => setBillingCycle('monthly')}
                className="h-auto p-4"
              >
                <div className="text-center">
                  <div className="font-medium">شهري</div>
                  <div className="text-xs text-muted-foreground">دفع شهري</div>
                </div>
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? "default" : "outline"}
                onClick={() => setBillingCycle('yearly')}
                className="h-auto p-4 relative"
              >
                <Badge className="absolute -top-2 -right-2 bg-green-500">
                  خصم 15%
                </Badge>
                <div className="text-center">
                  <div className="font-medium">سنوي</div>
                  <div className="text-xs text-muted-foreground">وفر شهرين</div>
                </div>
              </Button>
            </div>
          </Card>

          {/* الخدمات الإضافية */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">البنود الإضافية</h3>
            <div className="space-y-4">
              {additionalServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                    <div className="text-sm font-medium text-primary">
                      {service.price.toLocaleString()} ر.س / {service.unit}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleServiceChange(service.id, (selectedServices[service.id] || 0) - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{selectedServices[service.id] || 0}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleServiceChange(service.id, (selectedServices[service.id] || 0) + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* ملخص التكلفة */}
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              ملخص التكلفة
            </h3>
            
            <div className="space-y-3">
              {calculation.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.item}</span>
                  <span>{item.total?.toLocaleString()} ر.س</span>
                </div>
              ))}
              
              {calculation.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>خصم السنوي (15%)</span>
                  <span>-{calculation.discount.toLocaleString()} ر.س</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>المجموع</span>
                <span className="text-primary">{calculation.total.toLocaleString()} ر.س</span>
              </div>
              
              {billingCycle === 'yearly' && (
                <p className="text-xs text-muted-foreground text-center">
                  توفير {calculation.discount.toLocaleString()} ر.س سنوياً
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary-glow"
                onClick={generatePDF}
                disabled={!companyName || !contactEmail}
              >
                <FileText className="h-4 w-4 ml-2" />
                اشترك الآن
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-3">اختر طريقة الدفع:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center py-3 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePayment('mada')}
                  >
                    <CreditCard className="h-3 w-3 ml-1" />
                    مدى
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center py-3 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePayment('apple-pay')}
                  >
                    <CreditCard className="h-3 w-3 ml-1" />
                    Apple Pay
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center py-3 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePayment('stc-pay')}
                  >
                    <CreditCard className="h-3 w-3 ml-1" />
                    STC Pay
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center py-3 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePayment('visa-mastercard')}
                  >
                    <CreditCard className="h-3 w-3 ml-1" />
                    فيزا / ماستر
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center justify-center py-3 col-span-2 hover:bg-primary/10 transition-colors"
                    onClick={() => handlePayment('bank-transfer')}
                  >
                    <CreditCard className="h-3 w-3 ml-1" />
                    تحويل بنكي
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <AIRecommendations 
            employeeCount={employeeCount}
            currentPackage={currentPackage}
            billingCycle={billingCycle}
          />
        </div>
      </div>
    </div>
  );
};