import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { 
  Calculator, 
  Users, 
  Calendar, 
  CheckCircle, 
  Minus, 
  Plus,
  TrendingUp,
  Clock,
  ArrowRight,
  Package,
  FileText,
  Download,
  Bot,
  Zap,
  Gift,
  Building,
  Heart,
  Scale,
  GraduationCap
} from 'lucide-react';

interface ServiceCalculatorProps {
  onBack?: () => void;
}

// الباقات المتكاملة
const packages = [
  {
    id: 'hr-complete',
    title: 'باقة الموارد البشرية الشاملة',
    description: 'حل متكامل لجميع احتياجات الموارد البشرية',
    icon: Building,
    pricing: {
      tier1: { min: 1, max: 10, price: 100 },
      tier2: { min: 11, max: 50, price: 85 },
      tier3: { min: 51, max: 200, price: 70 },
      tier4: { min: 201, max: 1000, price: 55 },
      tier5: { min: 1001, max: Infinity, price: 45 }
    },
    setupFee: 500,
    features: [
      'إدارة الموظفين والملفات',
      'نظام الرواتب المتقدم',
      'إدارة الحضور والانصراف',
      'تقييم الأداء',
      'التوظيف والاستقطاب',
      'التقارير والتحليلات',
      'دعم فني 24/7'
    ]
  },
  {
    id: 'governance',
    title: 'باقة الحوكمة والامتثال',
    description: 'ضمان الامتثال والحوكمة المؤسسية',
    icon: Scale,
    pricing: {
      tier1: { min: 1, max: 10, price: 80 },
      tier2: { min: 11, max: 50, price: 65 },
      tier3: { min: 51, max: 200, price: 50 },
      tier4: { min: 201, max: 1000, price: 40 },
      tier5: { min: 1001, max: Infinity, price: 35 }
    },
    setupFee: 300,
    features: [
      'إدارة السياسات والإجراءات',
      'متابعة الامتثال',
      'تقارير الحوكمة',
      'إدارة المخاطر',
      'التدقيق الداخلي',
      'الاستشارات القانونية'
    ]
  },
  {
    id: 'nonprofit',
    title: 'باقة القطاع غير الربحي',
    description: 'حلول مخصصة للمؤسسات غير الربحية',
    icon: Heart,
    pricing: {
      tier1: { min: 1, max: 10, price: 60 },
      tier2: { min: 11, max: 50, price: 50 },
      tier3: { min: 51, max: 200, price: 40 },
      tier4: { min: 201, max: 1000, price: 30 },
      tier5: { min: 1001, max: Infinity, price: 25 }
    },
    setupFee: 200,
    features: [
      'إدارة المتطوعين',
      'إدارة التبرعات',
      'تتبع المشاريع',
      'تقارير الأثر',
      'إدارة الأعضاء',
      'خصم 25% للمؤسسات المسجلة'
    ]
  },
  {
    id: 'training',
    title: 'باقة التدريب والتطوير',
    description: 'منصة تدريب وتطوير المواهب',
    icon: GraduationCap,
    pricing: {
      tier1: { min: 1, max: 10, price: 70 },
      tier2: { min: 11, max: 50, price: 60 },
      tier3: { min: 51, max: 200, price: 50 },
      tier4: { min: 201, max: 1000, price: 40 },
      tier5: { min: 1001, max: Infinity, price: 35 }
    },
    setupFee: 250,
    features: [
      'منصة التعلم الإلكتروني',
      'إدارة المدربين',
      'تتبع التقدم',
      'شهادات الإنجاز',
      'التقييمات والاختبارات',
      'تحليلات التعلم'
    ]
  }
];

// الخدمات المفردة
const individualServices = [
  {
    id: 'payroll-only',
    title: 'الرواتب فقط',
    description: 'نظام إدارة الرواتب المستقل',
    pricing: {
      tier1: { min: 1, max: 10, price: 35 },
      tier2: { min: 11, max: 50, price: 30 },
      tier3: { min: 51, max: 200, price: 25 },
      tier4: { min: 201, max: 1000, price: 20 },
      tier5: { min: 1001, max: Infinity, price: 15 }
    },
    setupFee: 150,
    features: ['حساب الرواتب', 'البدلات والخصومات', 'تقارير الرواتب']
  },
  {
    id: 'attendance-only',
    title: 'الحضور والانصراف',
    description: 'نظام تتبع الحضور المتقدم',
    pricing: {
      tier1: { min: 1, max: 10, price: 20 },
      tier2: { min: 11, max: 50, price: 18 },
      tier3: { min: 51, max: 200, price: 15 },
      tier4: { min: 201, max: 1000, price: 12 },
      tier5: { min: 1001, max: Infinity, price: 10 }
    },
    setupFee: 100,
    features: ['تتبع الحضور', 'إدارة الإجازات', 'تقارير الحضور']
  },
  {
    id: 'recruitment-only',
    title: 'التوظيف فقط',
    description: 'منصة التوظيف المتخصصة',
    pricing: {
      tier1: { min: 1, max: 10, price: 40 },
      tier2: { min: 11, max: 50, price: 35 },
      tier3: { min: 51, max: 200, price: 30 },
      tier4: { min: 201, max: 1000, price: 25 },
      tier5: { min: 1001, max: Infinity, price: 20 }
    },
    setupFee: 200,
    features: ['نشر الوظائف', 'إدارة المرشحين', 'المقابلات الرقمية']
  }
];

// الخدمات الإضافية المخصصة
const additionalServices = [
  { id: 'legal-consultation', title: 'استشارة قانونية', price: 500, unit: 'جلسة' },
  { id: 'field-visit', title: 'زيارة ميدانية', price: 800, unit: 'زيارة' },
  { id: 'custom-training', title: 'تدريب مخصص', price: 1200, unit: 'برنامج' },
  { id: 'system-integration', title: 'ربط الأنظمة', price: 2000, unit: 'نظام' },
  { id: 'data-migration', title: 'نقل البيانات', price: 1500, unit: 'عملية' },
  { id: 'custom-reports', title: 'تقارير مخصصة', price: 600, unit: 'تقرير' }
];

export const ServiceCalculator: React.FC<ServiceCalculatorProps> = ({ onBack }) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedIndividualServices, setSelectedIndividualServices] = useState<string[]>([]);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<{[key: string]: number}>({});
  const [employeeCount, setEmployeeCount] = useState<number>(10);
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'yearly'>('monthly');
  const [customMonths, setCustomMonths] = useState<number>(12);
  const [companyType, setCompanyType] = useState<string>('private');
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');

  // دالة لحساب سعر الطبقة حسب عدد الموظفين
  const calculateTierPrice = (pricing: any, employeeCount: number) => {
    const tiers = Object.values(pricing);
    for (const tier of tiers as any[]) {
      if (employeeCount >= tier.min && employeeCount <= tier.max) {
        return tier.price;
      }
    }
    return pricing.tier5.price; // افتراضي للطبقة الأخيرة
  };

  const handlePackageToggle = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleIndividualServiceToggle = (serviceId: string) => {
    setSelectedIndividualServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAdditionalServiceChange = (serviceId: string, quantity: number) => {
    setSelectedAdditionalServices(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
  };

  const calculateTotal = () => {
    let monthlyTotal = 0;
    let setupTotal = 0;
    let breakdown = {
      packages: [] as any[],
      individualServices: [] as any[],
      additionalServices: [] as any[]
    };

    // حساب تكلفة الباقات
    const selectedPackageObjects = packages.filter(pkg => 
      selectedPackages.includes(pkg.id)
    );
    
    selectedPackageObjects.forEach(pkg => {
      const tierPrice = calculateTierPrice(pkg.pricing, employeeCount);
      const packageMonthly = tierPrice * employeeCount;
      monthlyTotal += packageMonthly;
      setupTotal += pkg.setupFee;
      
      breakdown.packages.push({
        title: pkg.title,
        monthly: packageMonthly,
        setup: pkg.setupFee,
        pricePerEmployee: tierPrice
      });
    });

    // حساب تكلفة الخدمات المفردة
    const selectedIndividualServiceObjects = individualServices.filter(service => 
      selectedIndividualServices.includes(service.id)
    );
    
    selectedIndividualServiceObjects.forEach(service => {
      const tierPrice = calculateTierPrice(service.pricing, employeeCount);
      const serviceMonthly = tierPrice * employeeCount;
      monthlyTotal += serviceMonthly;
      setupTotal += service.setupFee;
      
      breakdown.individualServices.push({
        title: service.title,
        monthly: serviceMonthly,
        setup: service.setupFee,
        pricePerEmployee: tierPrice
      });
    });

    // حساب تكلفة الخدمات الإضافية
    Object.entries(selectedAdditionalServices).forEach(([serviceId, quantity]) => {
      if (quantity > 0) {
        const service = additionalServices.find(s => s.id === serviceId);
        if (service) {
          const serviceTotal = service.price * quantity;
          breakdown.additionalServices.push({
            title: service.title,
            quantity,
            unitPrice: service.price,
            total: serviceTotal,
            unit: service.unit
          });
        }
      }
    });

    // حساب الخصومات
    let discountPercentage = 0;
    let volumeDiscount = 0;
    let companyTypeDiscount = 0;

    // خصم الاشتراك السنوي
    if (subscriptionType === 'yearly') {
      discountPercentage = 15;
    }

    // خصم حجم الموظفين
    if (employeeCount > 100) {
      volumeDiscount = 5;
    } else if (employeeCount > 500) {
      volumeDiscount = 10;
    }

    // خصم نوع الشركة
    if (companyType === 'nonprofit') {
      companyTypeDiscount = 25;
    } else if (companyType === 'startup') {
      companyTypeDiscount = 15;
    }

    const totalDiscountPercentage = Math.min(discountPercentage + volumeDiscount + companyTypeDiscount, 50);

    // حساب التكلفة النهائية
    const additionalServicesTotal = breakdown.additionalServices.reduce((sum, service) => sum + service.total, 0);
    const discountAmount = (monthlyTotal * totalDiscountPercentage) / 100;
    const discountedMonthly = monthlyTotal - discountAmount;

    let finalTotal = discountedMonthly;
    let period = customMonths;

    if (subscriptionType === 'yearly') {
      finalTotal = discountedMonthly * 12;
      period = 12;
    } else {
      finalTotal = discountedMonthly * customMonths;
    }

    finalTotal += additionalServicesTotal + setupTotal;

    return {
      monthlyTotal,
      setupTotal,
      additionalServicesTotal,
      discountAmount,
      discountedMonthly,
      finalTotal,
      totalDiscountPercentage,
      period,
      breakdown,
      employeeCount
    };
  };

  const calculation = calculateTotal();

  // توصيات الذكاء الاصطناعي
  const getAIRecommendations = () => {
    const recommendations = [];
    
    if (employeeCount <= 10 && selectedPackages.length === 0) {
      recommendations.push({
        type: 'package',
        title: 'يُنصح بباقة الموارد البشرية الشاملة',
        reason: 'توفر 25% على الخدمات المفردة للشركات الصغيرة'
      });
    }
    
    if (subscriptionType === 'monthly' && customMonths >= 12) {
      recommendations.push({
        type: 'subscription',
        title: 'الاشتراك السنوي أوفر',
        reason: `توفير ${Math.round(calculation.monthlyTotal * 12 * 0.15)} ر.س سنوياً`
      });
    }
    
    if (employeeCount > 50 && !selectedPackages.includes('hr-complete')) {
      recommendations.push({
        type: 'volume',
        title: 'باقة شاملة مناسبة أكثر',
        reason: 'خصم إضافي 5% للشركات متوسطة الحجم'
      });
    }

    return recommendations;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        {onBack && (
          <div className="flex justify-start mb-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        )}
        <div className="flex justify-center mx-auto mb-4">
          <img 
            src="/lovable-uploads/bd345aa0-600d-43fb-b482-67d69fe656d4.png" 
            alt="شعار بُعد BOUD HR" 
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-gradient">حاسبة خدمات بُعد HR الذكية</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          احسب تكلفة اشتراكك بدقة مع التسعير المتدرج والباقات المتكاملة وتوصيات الذكاء الاصطناعي
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Services Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">معلومات الشركة</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>نوع الشركة</Label>
                <Select value={companyType} onValueChange={setCompanyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">شركة خاصة</SelectItem>
                    <SelectItem value="nonprofit">مؤسسة غير ربحية (خصم 25%)</SelectItem>
                    <SelectItem value="startup">شركة ناشئة (خصم 15%)</SelectItem>
                    <SelectItem value="government">جهة حكومية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>عدد الموظفين</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Slider
                    value={[employeeCount]}
                    onValueChange={(value) => setEmployeeCount(value[0])}
                    max={1000}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {employeeCount > 50 ? 'خصم إضافي للحجم الكبير' : 'من 1-1000+ موظف'}
                </p>
              </div>
            </div>
          </Card>

          {/* Subscription Type */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">نوع الاشتراك</h3>
            </div>
            <div className="flex gap-4">
              <Button
                variant={subscriptionType === 'monthly' ? 'default' : 'outline'}
                onClick={() => setSubscriptionType('monthly')}
                className="flex-1"
              >
                شهري
              </Button>
              <Button
                variant={subscriptionType === 'yearly' ? 'default' : 'outline'}
                onClick={() => setSubscriptionType('yearly')}
                className="flex-1"
              >
                سنوي (خصم 15%)
              </Button>
            </div>
            
            {subscriptionType === 'monthly' && (
              <div className="mt-4">
                <Label>عدد الأشهر</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCustomMonths(Math.max(1, customMonths - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={customMonths}
                    onChange={(e) => setCustomMonths(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                    max="24"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCustomMonths(Math.min(24, customMonths + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Packages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              الباقات المتكاملة (موصى بها)
            </h3>
            <div className="grid gap-4">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                const tierPrice = calculateTierPrice(pkg.pricing, employeeCount);
                const isSelected = selectedPackages.includes(pkg.id);
                
                return (
                  <Card 
                    key={pkg.id}
                    className={`p-6 cursor-pointer border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handlePackageToggle(pkg.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{pkg.title}</h4>
                            <p className="text-sm text-muted-foreground">{pkg.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              {tierPrice} ر.س
                            </div>
                            <div className="text-xs text-muted-foreground">شهريًا / موظف</div>
                            <div className="text-xs text-orange-600 font-medium">
                              رسوم تأسيس: {pkg.setupFee} ر.س
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-1 mb-3">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-primary" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {isSelected && (
                          <Badge variant="default" className="w-fit">
                            <Gift className="h-3 w-3 mr-1" />
                            باقة مُحددة
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Individual Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              الخدمات المفردة
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {individualServices.map((service) => {
                const tierPrice = calculateTierPrice(service.pricing, employeeCount);
                const isSelected = selectedIndividualServices.includes(service.id);
                
                return (
                  <Card 
                    key={service.id}
                    className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleIndividualServiceToggle(service.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{service.title}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {tierPrice} ر.س
                          </div>
                          <div className="text-xs text-muted-foreground">شهريًا / موظف</div>
                          <div className="text-xs text-orange-600">
                            تأسيس: {service.setupFee} ر.س
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isSelected && (
                        <Badge variant="default" className="w-fit">
                          مُحدد
                        </Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              الخدمات الإضافية المخصصة
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {additionalServices.map((service) => (
                <Card key={service.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{service.title}</h4>
                        <p className="text-sm text-primary font-medium">
                          {service.price} ر.س / {service.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdditionalServiceChange(
                            service.id, 
                            Math.max(0, (selectedAdditionalServices[service.id] || 0) - 1)
                          )}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={selectedAdditionalServices[service.id] || 0}
                          onChange={(e) => handleAdditionalServiceChange(
                            service.id, 
                            Math.max(0, parseInt(e.target.value) || 0)
                          )}
                          className="w-16 text-center"
                          min="0"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdditionalServiceChange(
                            service.id, 
                            (selectedAdditionalServices[service.id] || 0) + 1
                          )}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">معلومات للعرض المخصص</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>اسم المسؤول</Label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="الاسم الكامل"
                />
              </div>
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@company.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label>متطلبات خاصة (اختياري)</Label>
                <Textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="أي متطلبات أو تخصيصات إضافية..."
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* AI Recommendations & Calculation Summary */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          {(selectedPackages.length > 0 || selectedIndividualServices.length > 0) && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">توصيات الذكاء الاصطناعي</h3>
              </div>
              <div className="space-y-3">
                {getAIRecommendations().map((rec, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">{rec.title}</p>
                        <p className="text-sm text-blue-700">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Calculation Summary */}
          <Card className="p-6 sticky top-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">ملخص التكلفة الذكي</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>الباقات المحددة:</span>
                    <span className="font-medium">{selectedPackages.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الخدمات المفردة:</span>
                    <span className="font-medium">{selectedIndividualServices.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>عدد الموظفين:</span>
                    <span className="font-medium">{employeeCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>نوع الشركة:</span>
                    <span className="font-medium">
                      {companyType === 'nonprofit' ? 'غير ربحية' : 
                       companyType === 'startup' ? 'ناشئة' : 
                       companyType === 'government' ? 'حكومية' : 'خاصة'}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>التكلفة الشهرية الأساسية:</span>
                    <span className="font-medium">{calculation.monthlyTotal.toLocaleString()} ر.س</span>
                  </div>
                  {calculation.setupTotal > 0 && (
                    <div className="flex justify-between">
                      <span>رسوم التأسيس (مرة واحدة):</span>
                      <span className="font-medium">{calculation.setupTotal.toLocaleString()} ر.س</span>
                    </div>
                  )}
                  {calculation.additionalServicesTotal > 0 && (
                    <div className="flex justify-between">
                      <span>الخدمات الإضافية:</span>
                      <span className="font-medium">{calculation.additionalServicesTotal.toLocaleString()} ر.س</span>
                    </div>
                  )}
                  {calculation.totalDiscountPercentage > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>إجمالي الخصومات:</span>
                      <span className="font-medium">-{calculation.totalDiscountPercentage}%</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(calculation.finalTotal).toLocaleString()} ر.س
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {subscriptionType === 'yearly' ? 'سنويًا' : `لمدة ${customMonths} شهر`}
                  </div>
                  {calculation.totalDiscountPercentage > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      توفير {Math.round(calculation.discountAmount * calculation.period).toLocaleString()} ر.س
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    تحميل عرض السعر PDF
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    طلب عرض سعر مخصص
                  </Button>
                  
                  <Button variant="secondary" className="w-full">
                    تحدث مع خبير مبيعات
                  </Button>
                </div>
              </div>

              {/* Selected Services Breakdown */}
              {(selectedPackages.length > 0 || selectedIndividualServices.length > 0) && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">تفاصيل الخدمات المحددة:</h4>
                  <div className="space-y-3">
                    {calculation.breakdown.packages.map((pkg, index) => (
                      <div key={index} className="p-3 bg-primary/5 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{pkg.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {pkg.pricePerEmployee} ر.س × {employeeCount} موظف
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{pkg.monthly.toLocaleString()} ر.س/شهر</p>
                            <p className="text-sm text-orange-600">تأسيس: {pkg.setup} ر.س</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {calculation.breakdown.individualServices.map((service, index) => (
                      <div key={index} className="p-3 bg-secondary/5 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{service.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.pricePerEmployee} ر.س × {employeeCount} موظف
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{service.monthly.toLocaleString()} ر.س/شهر</p>
                            <p className="text-sm text-orange-600">تأسيس: {service.setup} ر.س</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {calculation.breakdown.additionalServices.map((service, index) => (
                      <div key={index} className="p-3 bg-accent/5 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{service.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.quantity} {service.unit} × {service.unitPrice.toLocaleString()} ر.س
                            </p>
                          </div>
                          <p className="font-medium">{service.total.toLocaleString()} ر.س</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};