import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CheckCircle,
  Star,
  Users,
  Building2,
  Crown,
  Phone,
  MessageCircle,
  Calendar,
  Zap,
  Shield,
  Clock,
  Award,
  Headphones
} from 'lucide-react';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      description: 'مثالية للشركات الصغيرة والناشئة',
      monthlyPrice: 299,
      yearlyPrice: 2390,
      monthlyDiscount: 0,
      yearlyDiscount: 20,
      icon: Users,
      color: 'text-blue-600',
      gradient: 'from-blue-50 to-blue-100',
      popular: false,
      employees: '1-50 موظف',
      features: [
        'إدارة الموظفين الأساسية',
        'نظام الحضور والانصراف',
        'كشوف الرواتب الآلية',
        'إدارة الإجازات',
        'تقارير أساسية',
        'الخدمة الذاتية للموظفين',
        'دعم فني بالبريد الإلكتروني',
        'تدريب أساسي مجاني'
      ],
      limitations: [
        'حتى 50 موظف',
        'تقارير أساسية فقط',
        'دعم في أوقات العمل'
      ]
    },
    {
      id: 'professional',
      name: 'الباقة الاحترافية',
      description: 'الأنسب للشركات المتوسطة والنامية',
      monthlyPrice: 599,
      yearlyPrice: 4790,
      monthlyDiscount: 0,
      yearlyDiscount: 33,
      icon: Building2,
      color: 'text-green-600',
      gradient: 'from-green-50 to-green-100',
      popular: true,
      employees: '51-200 موظف',
      features: [
        'جميع مميزات الباقة الأساسية',
        'تقييم الأداء المتقدم',
        'نظام التوظيف الذكي',
        'التحليلات والتقارير المتقدمة',
        'تكامل مع التأمينات الاجتماعية',
        'إدارة المسارات الوظيفية',
        'نظام الموافقات المتقدم',
        'واجهات برمجية (API)',
        'دعم فني أولوي',
        'تدريب متقدم وورش عمل'
      ],
      limitations: [
        'حتى 200 موظف',
        'تكاملات محدودة'
      ]
    },
    {
      id: 'enterprise',
      name: 'الباقة المؤسساتية',
      description: 'حلول شاملة للمؤسسات الكبيرة',
      monthlyPrice: 999,
      yearlyPrice: 7990,
      monthlyDiscount: 0,
      yearlyDiscount: 33,
      icon: Crown,
      color: 'text-purple-600',
      gradient: 'from-purple-50 to-purple-100',
      popular: false,
      employees: 'موظفون غير محدودون',
      features: [
        'جميع مميزات الباقة الاحترافية',
        'حلول مخصصة حسب الطلب',
        'تكاملات متقدمة غير محدودة',
        'ذكاء اصطناعي متقدم',
        'لوحات معلومات تنفيذية',
        'إدارة متعددة الشركات',
        'أمان وامتثال متقدم',
        'نسخ احتياطية متقدمة',
        'مدير حساب مخصص',
        'دعم فني ٢٤/٧',
        'تدريب مخصص في الموقع',
        'استشارات HR مجانية'
      ],
      limitations: []
    }
  ];

  const addOns = [
    {
      name: 'وحدة التدريب والتطوير',
      price: 149,
      description: 'نظام إدارة التدريب مع منصة التعلم الإلكتروني',
      icon: Award
    },
    {
      name: 'وحدة التوظيف المتقدم',
      price: 199,
      description: 'نظام توظيف شامل مع الذكاء الاصطناعي',
      icon: Users
    },
    {
      name: 'وحدة التحليلات المتقدمة',
      price: 99,
      description: 'تحليلات متقدمة مع التنبؤات والرؤى الذكية',
      icon: Zap
    },
    {
      name: 'وحدة الأمان المتقدم',
      price: 79,
      description: 'حماية إضافية مع المصادقة الثنائية والتشفير المتقدم',
      icon: Shield
    }
  ];

  const supportLevels = [
    {
      plan: 'basic',
      type: 'دعم أساسي',
      features: ['بريد إلكتروني', 'أوقات العمل', 'استجابة خلال 24 ساعة'],
      icon: MessageCircle
    },
    {
      plan: 'professional',
      type: 'دعم أولوي',
      features: ['بريد + هاتف', 'أوقات ممتدة', 'استجابة خلال 4 ساعات'],
      icon: Phone
    },
    {
      plan: 'enterprise',
      type: 'دعم مخصص',
      features: ['جميع القنوات', '24/7', 'استجابة فورية'],
      icon: Headphones
    }
  ];

  const calculatePrice = (plan: any) => {
    const basePrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const discount = isYearly ? plan.yearlyDiscount : plan.monthlyDiscount;
    return basePrice * (1 - discount / 100);
  };

  const calculateSavings = (plan: any) => {
    if (!isYearly) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyPrice = plan.yearlyPrice;
    return monthlyTotal - yearlyPrice;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            {t('btn.back')}
          </Button>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('pricing.subtitle')}
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-20 h-10 rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-transform ${
                    isYearly ? 'translate-x-10 rtl:-translate-x-10' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {t('pricing.yearly')}
              </span>
              {isYearly && (
                <Badge className="bg-green-500 text-white mr-2 rtl:ml-2 rtl:mr-0">
                  {t('pricing.save')} حتى 33%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105 z-10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm px-6 py-2">
                    <Star className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                    الأكثر شيوعاً
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className={`w-10 h-10 ${plan.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {isYearly && calculateSavings(plan) > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          {(plan.monthlyPrice * 12).toLocaleString()} ر.س
                        </span>
                      )}
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      {calculatePrice(plan).toLocaleString()} ر.س
                    </div>
                    <div className="text-muted-foreground">
                      / {isYearly ? 'سنوياً' : 'شهرياً'}
                    </div>
                    {isYearly && calculateSavings(plan) > 0 && (
                      <div className="text-green-600 text-sm mt-2">
                        وفر {calculateSavings(plan).toLocaleString()} ر.س سنوياً
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="mb-6">
                    {plan.employees}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-4 text-sm text-primary">المميزات المضمنة:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground">القيود:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Support Level */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      {supportLevels.find(s => s.plan === plan.id)?.icon && 
                        React.createElement(supportLevels.find(s => s.plan === plan.id)!.icon, {
                          className: "w-4 h-4 text-primary"
                        })
                      }
                      <span className="font-semibold text-sm">
                        {supportLevels.find(s => s.plan === plan.id)?.type}
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {supportLevels.find(s => s.plan === plan.id)?.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full mt-8"
                    size="lg"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/schedule')}
                  >
                    {t('pricing.cta')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">الوحدات الإضافية</h2>
            <p className="text-xl text-muted-foreground">
              عزز باقتك بوحدات متخصصة حسب احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={index} className="text-center border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <addon.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {addon.price} ر.س
                  </div>
                  <div className="text-sm text-muted-foreground">/شهرياً</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {addon.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    إضافة للباقة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أسئلة شائعة حول الباقات</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'هل يمكنني ترقية أو تخفيض الباقة في أي وقت؟',
                a: 'نعم، يمكنك ترقية أو تخفيض باقتك في أي وقت. التغييرات تسري من الفاتورة التالية.'
              },
              {
                q: 'هل تتضمن الباقات التدريب والدعم الفني؟',
                a: 'جميع الباقات تتضمن تدريب أساسي ودعم فني. الباقات الأعلى تحصل على مستوى دعم أولوي ومتقدم.'
              },
              {
                q: 'ماذا يحدث إذا تجاوزت عدد الموظفين المسموح؟',
                a: 'سنتواصل معك لترقية الباقة تلقائياً. لن يتوقف الخدمة ولكن ستحتاج لترقية الباقة.'
              },
              {
                q: 'هل توجد رسوم إضافية خفية؟',
                a: 'لا توجد رسوم خفية. جميع الأسعار شاملة الضريبة ومعلنة بوضوح.'
              },
              {
                q: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
                a: 'نعم، يمكنك إلغاء الاشتراك في أي وقت دون رسوم إلغاء. بياناتك محفوظة لمدة 90 يوم.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <h3 className="font-semibold">{faq.q}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            مستعد لبدء رحلتك مع بُعد؟
          </h2>
          <p className="text-xl opacity-90 mb-8">
            احجز استشارة مجانية لاختيار الباقة الأنسب لشركتك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3"
              onClick={() => navigate('/schedule')}
            >
              <Calendar className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
              احجز استشارة مجانية
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              <MessageCircle className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
              تواصل مع المبيعات
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;