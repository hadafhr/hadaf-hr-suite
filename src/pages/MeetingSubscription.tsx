import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Crown, 
  Shield, 
  Users, 
  Video, 
  Clock, 
  HardDrive, 
  Star,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MeetingSubscription() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('business');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'الباقة الأساسية',
      description: 'مثالية للفرق الصغيرة والشركات الناشئة',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      monthly: 299,
      annual: 2990,
      savings: 'وفر شهر مجاني',
      features: [
        'حتى 10 مستخدمين',
        '20 ساعة اجتماعات شهرياً',
        '5 جيجابايت تخزين',
        'تسجيل الاجتماعات الأساسي',
        'مشاركة الشاشة',
        'محادثات نصية',
        'دعم فني عبر البريد الإلكتروني'
      ],
      limitations: [
        'بدون تقارير متقدمة',
        'بدون عروض PowerPoint',
        'بدون تكامل مع أنظمة خارجية'
      ]
    },
    {
      id: 'business',
      name: 'الباقة المتقدمة',
      description: 'الأفضل للشركات المتوسطة والفرق المتنامية',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      monthly: 799,
      annual: 7990,
      savings: 'وفر شهر مجاني',
      popular: true,
      features: [
        'حتى 50 مستخدماً',
        '80 ساعة اجتماعات شهرياً',
        '50 جيجابايت تخزين',
        'تسجيل عالي الجودة',
        'عروض PowerPoint تفاعلية',
        'غرف فرعية للمناقشات',
        'تقارير أداء متقدمة',
        'تكامل مع أنظمة الموارد البشرية',
        'دعم فني مباشر 24/7'
      ],
      limitations: [
        'بدون ميزات مجلس الإدارة المتقدمة'
      ]
    },
    {
      id: 'enterprise',
      name: 'الباقة الاحترافية',
      description: 'حلول شاملة للمؤسسات الكبيرة ومجالس الإدارة',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      monthly: 1599,
      annual: 15990,
      savings: 'وفر شهر مجاني',
      features: [
        'مستخدمين غير محدودين',
        'ساعات اجتماعات غير محدودة',
        '1 تيرابايت تخزين',
        'تسجيل بجودة 4K',
        'أدوات مجلس الإدارة المتقدمة',
        'تشفير من الطرف إلى الطرف',
        'تحليلات وذكاء اصطناعي',
        'تكامل مع جميع الأنظمة',
        'مدير حساب مخصص',
        'تدريب مخصص للفريق',
        'دعم أولوية قصوى'
      ],
      limitations: []
    }
  ];

  const addons = [
    {
      name: 'تخزين إضافي',
      description: '100 جيجابايت إضافية',
      price: 99,
      icon: HardDrive
    },
    {
      name: 'ساعات اجتماعات إضافية',
      description: '50 ساعة إضافية شهرياً',
      price: 199,
      icon: Clock
    },
    {
      name: 'تحليلات متقدمة',
      description: 'تقارير ذكية وتحليلات AI',
      price: 299,
      icon: Star
    }
  ];

  const currentPlan = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/meeting-hub')}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة لنظام الاجتماعات
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            باقات نظام الاجتماعات الذكي
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            اختر الباقة المناسبة لاحتياجات شركتك واستمتع بأقوى منصة اجتماعات
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>
              شهري
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'font-medium' : 'text-muted-foreground'}>
              سنوي
              <Badge className="mr-2 bg-green-100 text-green-800">وفر 17%</Badge>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthly : plan.annual;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card 
                key={plan.id}
                className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  isSelected ? `${plan.borderColor} border-2 shadow-lg` : ''
                } ${plan.popular ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`${plan.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <PlanIcon className={`h-8 w-8 ${plan.color}`} />
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {plan.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        {price} ريال
                      </span>
                      <span className="text-muted-foreground">
                        / {billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-green-600 mt-1">{plan.savings}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">المميزات المتضمنة:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-2">القيود:</h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className={`w-full mt-6 ${
                        isSelected 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan.id);
                      }}
                    >
                      {isSelected ? 'الباقة المحددة' : 'اختيار الباقة'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-ons Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            إضافات اختيارية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon, index) => {
              const AddonIcon = addon.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AddonIcon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">{addon.name}</h3>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        {addon.price} ريال / شهر
                      </span>
                      <Button size="sm" variant="outline">
                        إضافة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary & Checkout */}
        {currentPlan && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <currentPlan.icon className={`h-6 w-6 ${currentPlan.color}`} />
                    <div>
                      <h3 className="font-medium">{currentPlan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {billingCycle === 'monthly' ? 'اشتراك شهري' : 'اشتراك سنوي'}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-lg">
                    {billingCycle === 'monthly' ? currentPlan.monthly : currentPlan.annual} ريال
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>المجموع:</span>
                    <span>
                      {billingCycle === 'monthly' ? currentPlan.monthly : currentPlan.annual} ريال
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 text-left mt-1">
                      وفرت {Math.round((currentPlan.monthly * 12 - currentPlan.annual) / currentPlan.monthly * 12 * 100)}% من التكلفة السنوية
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    تأكيد الاشتراك
                  </Button>
                  <Button variant="outline" className="flex-1">
                    طلب عرض أسعار مخصص
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>• إلغاء الاشتراك في أي وقت</p>
                  <p>• ضمان استرداد المبلغ خلال 30 يوم</p>
                  <p>• دعم فني مجاني</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}