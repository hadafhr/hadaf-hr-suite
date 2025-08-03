import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  PenTool
} from 'lucide-react';

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
  },
  {
    title: "نظام التوقيع الإلكتروني",
    description: "نظام توقيع إلكتروني آمن ومتوافق مع نفاذ ولوائح المملكة العربية السعودية",
    icon: PenTool,
    route: "/e-signature",
    features: [
      "تكامل مع نفاذ الوطني الموحد",
      "شهادات رقمية معتمدة", 
      "تخزين آمن في السحابة",
      "تتبع كامل للمستندات",
      "امتثال كامل للوائح السعودية"
    ],
    isPremium: true
  }
];

export const Services: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">خدماتنا</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-6">
            خدماتنا المتكاملة
          </h1>
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
    </div>
  );
};