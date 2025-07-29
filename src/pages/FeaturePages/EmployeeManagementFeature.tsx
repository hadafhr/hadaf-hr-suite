import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  FileText, 
  Calendar,
  Search,
  UserPlus,
  Settings,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowLeft,
  Clock,
  Phone,
  Mail,
  Star
} from 'lucide-react';

const EmployeeManagementFeature: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "إدارة ملفات الموظفين",
      description: "نظام شامل لحفظ وإدارة جميع بيانات الموظفين الشخصية والمهنية",
      icon: FileText,
      benefits: ["أرشفة رقمية آمنة", "تتبع تاريخ الموظف", "تحديثات فورية"]
    },
    {
      title: "التوظيف والاستقطاب",
      description: "أدوات متطورة لإدارة عمليات التوظيف من الإعلان وحتى التعيين",
      icon: UserPlus,
      benefits: ["نشر الوظائف تلقائياً", "فرز السير الذاتية", "جدولة المقابلات"]
    },
    {
      title: "إدارة الحضور والانصراف",
      description: "تتبع دقيق لساعات العمل والحضور مع تقارير تفصيلية",
      icon: Clock,
      benefits: ["تسجيل بيومتري", "تقارير الحضور", "إدارة الإجازات"]
    },
    {
      title: "الهيكل التنظيمي",
      description: "بناء وإدارة الهيكل التنظيمي للشركة بصرياً وتفاعلياً",
      icon: Building2,
      benefits: ["مخططات تفاعلية", "تحديد المسؤوليات", "إدارة الأقسام"]
    },
    {
      title: "إدارة الرواتب والمزايا",
      description: "نظام متكامل لحساب الرواتب والمزايا والخصومات",
      icon: BarChart3,
      benefits: ["حساب تلقائي", "كشوفات مفصلة", "تكامل مع البنوك"]
    },
    {
      title: "التقارير والتحليلات",
      description: "تقارير شاملة وتحليلات ذكية لاتخاذ القرارات الاستراتيجية",
      icon: BarChart3,
      benefits: ["تقارير تفاعلية", "رؤى ذكية", "تحليل الأداء"]
    }
  ];

  const benefits = [
    {
      title: "توفير الوقت",
      value: "75%",
      description: "تقليل الوقت المستغرق في العمليات الإدارية"
    },
    {
      title: "دقة البيانات",
      value: "99.8%",
      description: "دقة عالية في البيانات مع تقليل الأخطاء"
    },
    {
      title: "رضا الموظفين",
      value: "92%",
      description: "تحسن ملحوظ في رضا الموظفين"
    },
    {
      title: "امتثال قانوني",
      value: "100%",
      description: "امتثال كامل للقوانين واللوائح السعودية"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-foreground">إدارة الموظفين</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="btn-primary">
              ابدأ الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              إدارة الموظفين المتطورة
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              إدارة شاملة ومتطورة <span className="text-gradient">للموظفين</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نظام متكامل لإدارة جميع جوانب الموارد البشرية من التوظيف وحتى نهاية الخدمة، 
              مع أدوات ذكية تساعدك في اتخاذ قرارات مدروسة وتحسين إنتاجية فريق العمل.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero" onClick={() => navigate('/dashboard')}>
                ابدأ التجربة المجانية
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/chat-messaging')}>
                تحدث مع خبير
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">المميزات الرئيسية</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              مجموعة شاملة من الأدوات والمميزات لإدارة فعالة للموظفين
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="service-card group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">النتائج المحققة</h2>
            <p className="text-xl text-muted-foreground">
              أرقام حقيقية من عملائنا الذين يستخدمون نظام إدارة الموظفين
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 metric-card">
                <div className="text-4xl font-bold text-primary mb-2">{benefit.value}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gradient">تكامل مع الأنظمة الحكومية</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                يتكامل نظام إدارة الموظفين بشكل مباشر مع الأنظمة الحكومية السعودية 
                لضمان الامتثال الكامل وتسهيل العمليات الإدارية.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">منصة مدد</h4>
                    <p className="text-sm text-muted-foreground">حماية الأجور</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Building2 className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">منصة قوى</h4>
                    <p className="text-sm text-muted-foreground">العمل والتوطين</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">التأمينات الاجتماعية</h4>
                    <p className="text-sm text-muted-foreground">التأمين والمعاشات</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">الزكاة والضريبة</h4>
                    <p className="text-sm text-muted-foreground">التقارير الضريبية</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                alt="تكامل الأنظمة الحكومية"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ابدأ في إدارة موظفيك بكفاءة أكبر
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              جرب نظام إدارة الموظفين مجاناً لمدة 30 يوماً واكتشف الفرق
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8" onClick={() => navigate('/dashboard')}>
                ابدأ التجربة المجانية
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/chat-messaging')}>
                تحدث مع فريق المبيعات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">إدارة الموظفين - بُعد HR</span>
          </div>
          <p className="text-background/70 mb-6">
            نظام متكامل لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              الرئيسية
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/chat-messaging')}>
              الدعم
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/service-calculator')}>
              الأسعار
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeManagementFeature;