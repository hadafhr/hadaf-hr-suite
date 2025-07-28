import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ServiceCard } from '@/components/ServiceCard';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  GraduationCap, 
  ShieldCheck, 
  Target,
  Award,
  Globe,
  Heart,
  ArrowLeft,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const services = [
  {
    title: "خدمات الأفراد الإلكترونية",
    description: "منصة شاملة لإدارة شؤون الموظفين الشخصية والمهنية بطريقة رقمية متطورة",
    icon: Users,
    route: "/services/individuals",
    features: [
      "إدارة البيانات الشخصية",
      "طلبات الإجازات والمهام",
      "تتبع الأداء والتقييمات",
      "التطوير المهني"
    ]
  },
  {
    title: "إدارة المنشآت والموظفين",
    description: "حلول متكاملة لإدارة رحلة الموظف الكاملة من التوظيف حتى التقاعد",
    icon: Building2,
    route: "/services/business-management",
    features: [
      "إدارة دورة حياة الموظف",
      "نظام إدارة الوقت والحضور",
      "معالجة كشوف الرواتب",
      "تقارير الأداء التفصيلية"
    ],
    isPremium: true
  },
  {
    title: "التطوير والتنظيم المؤسسي",
    description: "استشارات وحلول لتطوير الهيكل التنظيمي وتحسين الأداء المؤسسي",
    icon: TrendingUp,
    route: "/services/organizational-development",
    features: [
      "تحليل الهيكل التنظيمي",
      "تطوير السياسات واللوائح",
      "برامج التحول الرقمي",
      "استشارات الإدارة"
    ]
  },
  {
    title: "خدمات التوظيف",
    description: "منصة ذكية للبحث عن المواهب وإدارة عمليات التوظيف بكفاءة عالية",
    icon: Target,
    route: "/services/recruitment",
    features: [
      "نشر الوظائف الذكي",
      "فلترة السير الذاتية",
      "إدارة المقابلات",
      "تقييم المرشحين"
    ]
  },
  {
    title: "حماية الأجور",
    description: "نظام آمن ومتوافق مع أنظمة العمل السعودية لضمان حماية حقوق العمال",
    icon: ShieldCheck,
    route: "/services/wage-protection",
    features: [
      "التوافق مع نظام ساند",
      "مراقبة صرف الرواتب",
      "تقارير الامتثال",
      "الحماية القانونية"
    ]
  },
  {
    title: "منصات التدريب",
    description: "حلول تدريبية متطورة لتنمية مهارات الموظفين وتطوير قدراتهم",
    icon: GraduationCap,
    route: "/services/training",
    features: [
      "مسارات تدريبية مخصصة",
      "محتوى تفاعلي متقدم",
      "تتبع التقدم والإنجاز",
      "شهادات معتمدة"
    ]
  },
  {
    title: "تطوير المنصات الإلكترونية",
    description: "تصميم وتطوير منصات رقمية مخصصة لاحتياجات المنشآت المختلفة",
    icon: Globe,
    route: "/services/platform-development",
    features: [
      "تطوير مخصص",
      "واجهات مستخدم حديثة",
      "تكامل مع الأنظمة الحالية",
      "دعم فني مستمر"
    ]
  },
  {
    title: "تقييم الأداء KPIs",
    description: "أنظمة متطورة لقياس وتقييم الأداء باستخدام مؤشرات الأداء الرئيسية",
    icon: Award,
    route: "/services/performance",
    features: [
      "مؤشرات أداء ذكية",
      "تقارير مرئية شاملة",
      "تحليلات متقدمة",
      "خطط التحسين"
    ]
  },
  {
    title: "خدمات القطاع غير الربحي",
    description: "حلول متخصصة للحوكمة والاستدامة والامتثال للمنظمات غير الربحية",
    icon: Heart,
    route: "/services/nonprofit-services",
    features: [
      "إدارة الحوكمة",
      "تقارير الاستدامة",
      "الامتثال التنظيمي",
      "إدارة المتطوعين"
    ]
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* القسم الرئيسي */}
      <section className="hero-section min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-gradient">
              بُعد
              <span className="block text-secondary text-3xl md:text-5xl mt-2">
                مستقبل إدارة الموارد البشرية في السعودية
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed animate-slide-up">
              منصة متكاملة تجمع جميع خدمات الموارد البشرية في مكان واحد، مصممة خصيصاً 
              للمنشآت السعودية مع التوافق الكامل مع أنظمة العمل المحلية
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Button 
                className="btn-hero text-lg px-8 py-4"
                onClick={() => navigate('/employee-dashboard')}
              >
                بوابة الموظف
                <User className="mr-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                onClick={() => navigate('/employer-dashboard')}
              >
                بوابة صاحب العمل
                <Users className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* قسم نبذة عن الشركة */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              من نحن؟
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong>بُعد</strong> هي شركة سعودية رائدة تقدم حلولاً متكاملة وذكية 
              لإدارة الموارد البشرية. نساعد المنشآت على تحسين كفاءتها التشغيلية وتطوير رأس المال البشري 
              من خلال منصات رقمية متطورة تتوافق مع رؤية السعودية 2030.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="metric-card text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">رؤيتنا</h3>
              <p className="text-muted-foreground">
                أن نكون الخيار الأول لحلول الموارد البشرية الرقمية في المملكة
              </p>
            </div>
            <div className="metric-card text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">رسالتنا</h3>
              <p className="text-muted-foreground">
                تمكين المنشآت من تحقيق أهدافها من خلال حلول مبتكرة وفعالة
              </p>
            </div>
            <div className="metric-card text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">قيمنا</h3>
              <p className="text-muted-foreground">
                الابتكار، الجودة، الشفافية، والالتزام بالمعايير المهنية العالية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الخدمات */}
      <section className="py-16 bg-accent/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              خدماتنا المتكاملة
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              مجموعة شاملة من المنصات المتخصصة لتلبية جميع احتياجات إدارة الموارد البشرية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="py-16 bg-gradient-primary">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-bounce-gentle">
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-white/90">منشأة تثق بنا</p>
            </div>
            <div className="animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-white/90">موظف يستخدم منصاتنا</p>
            </div>
            <div className="animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-white/90">نسبة الوقت التشغيلي</p>
            </div>
            <div className="animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-white/90">دعم فني مستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم البوابات */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              اختر البوابة المناسبة لك
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              بوابات مخصصة لكل فئة مع خدمات متكاملة ومصممة لتلبية احتياجاتك
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card 
              className="p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-card border-border"
              onClick={() => navigate('/employee-dashboard')}
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">بوابة الموظف</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                إدارة شاملة للشؤون الشخصية والوظيفية للموظفين
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-right">
                <li>• ملف شخصي متكامل وآمن</li>
                <li>• طلبات الإجازات والموافقات</li>
                <li>• كشوف الراتب والمستحقات</li>
                <li>• تقييم الأداء والإنجازات</li>
                <li>• الدورات التدريبية والشهادات</li>
                <li>• سجل الحضور والانصراف</li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                دخول بوابة الموظف
              </Button>
            </Card>

            <Card 
              className="p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-card border-border"
              onClick={() => navigate('/employer-dashboard')}
            >
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">بوابة صاحب العمل</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                أدوات متقدمة لإدارة الموارد البشرية والشركات
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-right">
                <li>• إدارة شاملة للموظفين</li>
                <li>• التوظيف والاستقطاب</li>
                <li>• تقييم الأداء ومؤشرات KPIs</li>
                <li>• التدريب والتطوير المهني</li>
                <li>• التقارير والتحليلات المتقدمة</li>
                <li>• إدارة الرواتب والمزايا</li>
              </ul>
              <Button className="w-full bg-accent hover:bg-accent/90" variant="outline">
                دخول بوابة صاحب العمل
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            ابدأ رحلتك معنا اليوم
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            انضم إلى آلاف المنشآت التي تثق في حلولنا المتقدمة
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center sm:space-x-reverse">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
              onClick={() => navigate('/login')}
            >
              ابدأ الآن مجاناً
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};