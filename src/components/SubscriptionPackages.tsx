import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';
import { PricingCalculator } from './PricingCalculator';

interface Package {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  price: number;
  originalPrice?: number;
  maxEmployees: string;
  popular?: boolean;
  features: string[];
  color: string;
}

const packages: Package[] = [
  {
    id: 'startup',
    title: 'الباقة الصغيرة',
    subtitle: 'Startup Plan',
    icon: Rocket,
    price: 399,
    maxEmployees: 'حتى 10 موظفين',
    features: [
      'نظام مصغر للإدارة',
      'دعم بسيط عبر البريد',
      'لوحة تحكم الموظف',
      'تسجيل حضور أساسي',
      'تقارير بسيطة'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'basic',
    title: 'الباقة الأساسية',
    subtitle: 'Basic Plan',
    icon: Check,
    price: 899,
    originalPrice: 999,
    maxEmployees: 'حتى 50 موظف',
    features: [
      'إدارة موظفين أساسية',
      'حضور وانصراف متقدم',
      'ملف موظف إلكتروني',
      'تقارير مبدئية',
      'دعم عبر البريد الإلكتروني',
      'تكامل مع أنظمة الرواتب'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'professional',
    title: 'الباقة الاحترافية',
    subtitle: 'Professional Plan',
    icon: Star,
    price: 1899,
    maxEmployees: 'حتى 250 موظف',
    popular: true,
    features: [
      'كل ما في الأساسية',
      'تقييم أداء متقدم',
      'إدارة الإجازات والجزاءات',
      'نظام خدمة ذاتية',
      'تدريب أولي مجانًا',
      'تقارير تحليلية متقدمة',
      'دعم هاتفي'
    ],
    color: 'from-primary to-primary-glow'
  },
  {
    id: 'enterprise',
    title: 'الباقة الشاملة',
    subtitle: 'Enterprise Plan',
    icon: Crown,
    price: 3899,
    maxEmployees: 'عدد غير محدود',
    features: [
      'كل ما في الاحترافية',
      'الترقيات والمكافآت',
      'تكامل حكومي كامل',
      'ذكاء اصطناعي وتحليلات',
      'دعم مباشر 24/7',
      'API مخصص',
      'مدير حساب مخصص',
      'تخصيص كامل للنظام'
    ],
    color: 'from-purple-500 to-purple-600'
  }
];

export const SubscriptionPackages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  if (selectedPackage) {
    return (
      <PricingCalculator 
        selectedPackage={selectedPackage}
        onBack={() => setSelectedPackage(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          باقات نظام بُعد HR الذكية
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          حل متكامل لإدارة الموارد البشرية في منشأتك - نظام ذكي يختصر الوقت والجهد
        </p>
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl max-w-2xl mx-auto">
          <p className="text-primary font-semibold">
            🏷️ خصم 10% على جميع الباقات مقارنة بالمنافسين + ضمان استرداد المال خلال 30 يوم
          </p>
        </div>
      </div>

      {/* الباقات */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
        {packages.map((pkg, index) => {
          const IconComponent = pkg.icon;
          return (
            <Card 
              key={pkg.id}
              className={`relative p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                pkg.popular ? 'border-2 border-primary shadow-glow' : ''
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-glow">
                  الأكثر شيوعًا
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.subtitle}</p>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">{pkg.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">ريال</span>
                    {pkg.originalPrice && (
                      <span className="text-sm line-through text-muted-foreground">
                        {pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">شهريًا</p>
                  <p className="text-sm font-medium text-primary">{pkg.maxEmployees}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full ${pkg.popular 
                  ? 'bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow' 
                  : 'bg-gradient-to-r ' + pkg.color
                }`}
              >
                اختيار الباقة
              </Button>
            </Card>
          );
        })}
      </div>

      {/* مقارنة سريعة */}
      <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">غير متأكد من الباقة المناسبة؟</h3>
        <p className="text-muted-foreground mb-6">
          استخدم حاسبة الأسعار الذكية أو تواصل مع فريق المبيعات للحصول على استشارة مجانية
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow"
            onClick={() => setSelectedPackage('calculator')}
          >
            <Zap className="h-5 w-5 ml-2" />
            استخدم حاسبة الأسعار
          </Button>
          <Button size="lg" variant="outline">
            تواصل مع المبيعات
          </Button>
        </div>
      </div>
    </div>
  );
};