import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Building2, 
  Users, 
  Shield, 
  Crown,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPackages: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 'starter',
      name: 'الباقة الأساسية',
      price: '199',
      period: 'شهرياً',
      description: 'مثالية للشركات الصغيرة والناشئة',
      icon: Building2,
      color: 'text-blue-600',
      popular: false,
      features: [
        'إدارة الموظفين (حتى 50 موظف)',
        'نظام الحضور والانصراف',
        'إدارة الإجازات والطلبات',
        'التقارير الأساسية',
        'دعم فني عبر الإيميل',
        'التكامل مع منصة قوى',
        'واجهة باللغة العربية'
      ]
    },
    {
      id: 'professional',
      name: 'الباقة المتقدمة',
      price: '399',
      period: 'شهرياً',
      description: 'الأنسب للشركات متوسطة الحجم',
      icon: Users,
      color: 'text-primary',
      popular: true,
      features: [
        'جميع مميزات الباقة الأساسية',
        'إدارة الموظفين (حتى 200 موظف)',
        'نظام تقييم الأداء',
        'إدارة الرواتب المتقدمة',
        'التكامل مع منصات مدد والتأمينات',
        'تقارير متقدمة ولوحات تحكم',
        'دعم فني متواصل 24/7',
        'التطبيق المحمول',
        'نظام الخدمة الذاتية للموظفين'
      ]
    },
    {
      id: 'enterprise',
      name: 'باقة المؤسسات',
      price: '799',
      period: 'شهرياً',
      description: 'حلول شاملة للمؤسسات الكبيرة',
      icon: Crown,
      color: 'text-amber-600',
      popular: false,
      features: [
        'جميع مميزات الباقة المتقدمة',
        'عدد موظفين غير محدود',
        'الذكاء الاصطناعي والتحليلات المتقدمة',
        'نظام إدارة المواهب',
        'منصة التدريب والتطوير',
        'نظام حماية الأجور',
        'التكامل المخصص مع أنظمة أخرى',
        'مدير حساب مخصص',
        'تدريب فريق العمل',
        'دعم فني أولوية عالية'
      ]
    }
  ];

  const addOns = [
    {
      name: 'منصة التدريب والتطوير',
      price: '150',
      description: 'نظام إدارة التعلم مع البث المباشر'
    },
    {
      name: 'نظام إدارة التوظيف الذكي',
      price: '100',
      description: 'أتمتة عملية التوظيف والمقابلات'
    },
    {
      name: 'تقارير متقدمة ومخصصة',
      price: '75',
      description: 'تقارير مخصصة حسب احتياجات شركتك'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">بُعد HR</h1>
                <p className="text-xs text-muted-foreground">باقات الاشتراك</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 ml-1" />
              اختر الباقة المناسبة لشركتك
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              باقات <span className="text-gradient">بُعد HR</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اختر الباقة التي تناسب حجم شركتك واحتياجاتك، مع إمكانية الترقية أو التخصيص في أي وقت
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  pkg.popular 
                    ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-glow text-white text-center py-2 text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    الأكثر شعبية
                  </div>
                )}
                
                <CardHeader className={`text-center pb-4 ${pkg.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center`}>
                    <pkg.icon className={`w-8 h-8 ${pkg.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{pkg.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-lg text-muted-foreground">ريال</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                    <Button 
                      className={`w-full ${
                        pkg.popular 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                      }`}
                      onClick={() => {
                        // Here you would implement the subscription logic
                        alert(`تم اختيار ${pkg.name}. سيتم توجيهك لإتمام عملية الاشتراك.`);
                      }}
                    >
                      اختيار هذه الباقة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">خدمات إضافية</h2>
              <p className="text-muted-foreground">عزز باقتك بخدمات إضافية متخصصة</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="border border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">{addon.name}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">{addon.price}</span>
                        <span className="text-sm text-muted-foreground">ريال/شهرياً</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      إضافة للباقة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">تحتاج باقة مخصصة؟</h3>
            <p className="text-muted-foreground mb-6">
              تواصل معنا لتصميم باقة تناسب احتياجاتك الخاصة ومتطلبات شركتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/chat-messaging')}>
                تواصل مع فريق المبيعات
              </Button>
              <Button variant="outline" onClick={() => navigate('/service-calculator')}>
                احسب التكلفة المخصصة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPackages;