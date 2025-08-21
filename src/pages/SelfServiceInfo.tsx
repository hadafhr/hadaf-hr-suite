import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Calendar, FileText, Bell, CreditCard, BookOpen, MessageCircle, CheckCircle, Smartphone, Cloud, Shield } from 'lucide-react';

const SelfServiceInfo: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "الملف الشخصي التفاعلي",
      description: "إدارة البيانات الشخصية والمهنية مع إمكانية التحديث الفوري والمراجعة المتقدمة",
      icon: User,
      benefits: ["تحديث البيانات الشخصية", "عرض الهيكل التنظيمي", "إدارة جهات الاتصال", "سجل التوظيف الكامل"]
    },
    {
      title: "إدارة الطلبات والإجازات",
      description: "نظام متطور لتقديم جميع أنواع الطلبات والإجازات مع تتبع حالة الموافقة",
      icon: Calendar,
      benefits: ["تقديم طلبات الإجازة", "تتبع حالة الطلبات", "تقويم الإجازات", "إشعارات الموافقة"]
    },
    {
      title: "كشوف الرواتب الإلكترونية",
      description: "عرض تفصيلي لكشوف الرواتب مع إمكانية التحميل والطباعة والأرشفة الرقمية",
      icon: CreditCard,
      benefits: ["عرض كشف الراتب التفصيلي", "تحميل وطباعة الكشوف", "سجل الرواتب السنوي", "تقارير الخصومات والإضافات"]
    },
    {
      title: "التقييمات والأداء",
      description: "منصة تفاعلية لمتابعة تقييمات الأداء وخطط التطوير المهني الشخصية",
      icon: FileText,
      benefits: ["عرض نتائج التقييم", "خطة التطوير الشخصية", "متابعة الأهداف", "تقييمات الزملاء"]
    },
    {
      title: "التدريب الإلكتروني",
      description: "مكتبة شاملة من الدورات التدريبية مع إمكانية التسجيل والمتابعة والحصول على الشهادات",
      icon: BookOpen,
      benefits: ["كتالوج الدورات التدريبية", "التسجيل الإلكتروني", "متابعة التقدم", "شهادات إنجاز"]
    },
    {
      title: "التنبيهات الذكية",
      description: "نظام إشعارات متقدم للتنبيه للمواعيد المهمة والمهام العاجلة والتحديثات",
      icon: Bell,
      benefits: ["تنبيهات الطلبات", "تذكير المواعيد", "إشعارات التدريب", "تحديثات النظام"]
    }
  ];

  const advantages = [
    { text: "متاح 24/7 من أي مكان", icon: Cloud },
    { text: "واجهة سهلة ومتجاوبة مع جميع الأجهزة", icon: Smartphone },
    { text: "أمان عالي وحماية البيانات", icon: Shield },
    { text: "تحديثات فورية ومتزامنة", icon: CheckCircle }
  ];

  const benefits = [
    "توفير الوقت والجهد للموظفين",
    "تقليل الأعمال الورقية والإدارية", 
    "تحسين التواصل مع إدارة الموارد البشرية",
    "زيادة رضا الموظفين وإنتاجيتهم"
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </Button>
            <BoudLogo variant="full" size="md" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              نظام الخدمة الذاتية السحابي
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              تمكين الموظفين رقمياً
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              منصة تفاعلية متطورة تمكن الموظفين من إدارة شؤونهم الشخصية والمهنية بكل سهولة ومرونة من أي مكان وفي أي وقت
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <advantage.icon className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{advantage.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              المميزات الرئيسية للخدمة الذاتية
            </h2>
            <p className="text-lg text-muted-foreground">
              كل ما يحتاجه الموظف في مكان واحد
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                لماذا الخدمة الذاتية السحابية؟
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">الإحصائيات</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>تقليل الوقت المستغرق في الطلبات</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>رضا الموظفين</span>
                  <span className="text-primary font-bold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>تقليل الأخطاء الإدارية</span>
                  <span className="text-primary font-bold">90%</span>
                </div>
                <div className="flex justify-between">
                  <span>توفير في التكاليف الإدارية</span>
                  <span className="text-primary font-bold">60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              تجربة تفاعلية للنظام
            </h2>
            <p className="text-lg text-muted-foreground">
              استكشف الواجهة البسيطة والمميزات المتقدمة
            </p>
          </div>

          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-md transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">واجهة سهلة</h3>
                  <p className="text-sm text-muted-foreground">تصميم بديهي يناسب جميع المستخدمين</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">متجاوب</h3>
                  <p className="text-sm text-muted-foreground">يعمل على جميع الأجهزة والشاشات</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-md transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">آمن</h3>
                  <p className="text-sm text-muted-foreground">حماية متقدمة لبيانات الموظفين</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              امنح موظفيك القوة والاستقلالية
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              اكتشف كيف يمكن لنظام الخدمة الذاتية أن يحسن تجربة الموظفين ويزيد من كفاءة العمليات في شركتك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/demo-request')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                اطلب العرض التوضيحي
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 text-lg"
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfServiceInfo;