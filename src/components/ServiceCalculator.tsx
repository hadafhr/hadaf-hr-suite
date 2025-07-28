import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  Calculator, 
  Users, 
  Calendar, 
  CheckCircle, 
  Minus, 
  Plus,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ServiceCalculatorProps {
  onBack?: () => void;
}

const services = [
  {
    id: 'employee-management',
    title: 'إدارة الموظفين',
    description: 'نظام شامل لإدارة بيانات ومعلومات الموظفين',
    monthlyPrice: 15,
    features: ['إدارة الملفات الشخصية', 'تتبع الحضور والانصراف', 'إدارة العقود']
  },
  {
    id: 'payroll',
    title: 'إدارة الرواتب',
    description: 'نظام متكامل لحساب وإدارة رواتب الموظفين',
    monthlyPrice: 25,
    features: ['حساب الرواتب التلقائي', 'إدارة البدلات والخصميات', 'تقارير الرواتب']
  },
  {
    id: 'recruitment',
    title: 'التوظيف والاستقطاب',
    description: 'منصة متطورة لإدارة عمليات التوظيف',
    monthlyPrice: 20,
    features: ['نشر الوظائف', 'إدارة السير الذاتية', 'تتبع المقابلات']
  },
  {
    id: 'training',
    title: 'التدريب والتطوير',
    description: 'نظام إدارة التدريب والتطوير المهني',
    monthlyPrice: 18,
    features: ['إدارة البرامج التدريبية', 'تتبع التقدم', 'شهادات الإنجاز']
  },
  {
    id: 'performance',
    title: 'تقييم الأداء',
    description: 'نظام تقييم أداء الموظفين الذكي',
    monthlyPrice: 22,
    features: ['تقييمات دورية', 'أهداف ذكية', 'تقارير الأداء']
  },
  {
    id: 'reports',
    title: 'التقارير والتحليلات',
    description: 'تقارير تحليلية شاملة وذكية',
    monthlyPrice: 12,
    features: ['تقارير مالية', 'إحصائيات الموظفين', 'تحليلات الأداء']
  }
];

export const ServiceCalculator: React.FC<ServiceCalculatorProps> = ({ onBack }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [employeeCount, setEmployeeCount] = useState<number>(10);
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'yearly'>('monthly');
  const [customMonths, setCustomMonths] = useState<number>(12);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const selectedServiceObjects = services.filter(service => 
      selectedServices.includes(service.id)
    );
    
    let basePrice = selectedServiceObjects.reduce((total, service) => 
      total + service.monthlyPrice, 0
    );

    // حساب إجمالي السعر حسب عدد الموظفين
    let totalPrice = basePrice * employeeCount;

    // تطبيق خصم حسب نوع الاشتراك
    if (subscriptionType === 'yearly') {
      totalPrice = totalPrice * 12 * 0.85; // خصم 15% للاشتراك السنوي
    } else {
      totalPrice = totalPrice * customMonths;
    }

    return {
      basePrice,
      totalPrice,
      discount: subscriptionType === 'yearly' ? 15 : 0
    };
  };

  const { basePrice, totalPrice, discount } = calculateTotal();

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
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gradient">حاسبة خدمات بُعد HR</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          احسب تكلفة اشتراكك بدقة حسب الخدمات المطلوبة وعدد الموظفين
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Services Selection */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Employee Count */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">عدد الموظفين</h3>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEmployeeCount(Math.max(1, employeeCount - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 text-center text-lg font-semibold"
                min="1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEmployeeCount(employeeCount + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              الحد الأدنى موظف واحد
            </p>
          </Card>

          {/* Services Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              اختر الخدمات المطلوبة
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`p-4 cursor-pointer border-2 transition-all duration-300 ${
                    selectedServices.includes(service.id) 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{service.title}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {service.monthlyPrice} ر.س
                        </div>
                        <div className="text-xs text-muted-foreground">شهريًا / موظف</div>
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
                    
                    {selectedServices.includes(service.id) && (
                      <Badge variant="default" className="w-fit">
                        مُحدد
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">ملخص التكلفة</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>الخدمات المحددة:</span>
                    <span className="font-medium">{selectedServices.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>عدد الموظفين:</span>
                    <span className="font-medium">{employeeCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>فترة الاشتراك:</span>
                    <span className="font-medium">
                      {subscriptionType === 'yearly' ? 'سنوي' : `${customMonths} شهر`}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>السعر الأساسي (شهري):</span>
                    <span className="font-medium">{basePrice} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>التكلفة لكل الموظفين:</span>
                    <span className="font-medium">{basePrice * employeeCount} ر.س</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>خصم الاشتراك السنوي:</span>
                      <span className="font-medium">-{discount}%</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(totalPrice).toLocaleString()} ر.س
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {subscriptionType === 'yearly' ? 'سنويًا' : `لمدة ${customMonths} شهر`}
                  </div>
                  {subscriptionType === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      توفير {Math.round((basePrice * employeeCount * 12 * 0.15)).toLocaleString()} ر.س سنويًا
                    </div>
                  )}
                </div>

                <Button className="w-full btn-primary" size="lg">
                  طلب عرض سعر مخصص
                </Button>
                
                <div className="text-center">
                  <Button variant="outline" className="w-full">
                    تحدث مع خبير مبيعات
                  </Button>
                </div>
              </div>

              {selectedServices.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">الخدمات المحددة:</h4>
                  <div className="space-y-1">
                    {services
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span>{service.title}</span>
                          <span>{service.monthlyPrice} ر.س</span>
                        </div>
                      ))
                    }
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