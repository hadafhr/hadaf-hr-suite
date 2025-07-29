import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceCalculator } from '@/components/ServiceCalculator';
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
  User,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
  Eye,
  Lightbulb,
  Handshake,
  Shield,
  Brain,
  Calculator
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
const boudLogo = '/lovable-uploads/9315a174-2c21-4ec0-8554-b4936be67676.png';

const services = [
  {
    title: "خدمات الأفراد الإلكترونية",
    description: "منصة شاملة لإدارة شؤون الموظفين الشخصية والمهنية",
    icon: Users,
    route: "/services/individuals",
    monthlyPrice: 299,
    features: [
      "إدارة البيانات الشخصية",
      "طلبات الإجازات والمهام", 
      "تتبع الأداء والتقييمات",
      "التطوير المهني"
    ]
  },
  {
    title: "إدارة المنشآت والموظفين",
    description: "حلول متكاملة لإدارة رحلة الموظف الكاملة",
    icon: Building2,
    route: "/services/business-management",
    monthlyPrice: 899,
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
    description: "استشارات وحلول لتطوير الهيكل التنظيمي",
    icon: TrendingUp,
    route: "/services/organizational-development",
    monthlyPrice: 1299,
    features: [
      "تحليل الهيكل التنظيمي",
      "برامج التطوير المؤسسي",
      "استشارات الإدارة",
      "قياس مؤشرات الأداء"
    ]
  },
  {
    title: "منصة التوظيف الذكي",
    description: "تقنيات ذكية للبحث عن المواهب وإدارة التوظيف",
    icon: Target,
    route: "/services/recruitment",
    monthlyPrice: 599,
    features: [
      "نشر الوظائف الشاغرة",
      "فلترة المتقدمين الذكية",
      "إدارة المقابلات",
      "تقييم المرشحين"
    ]
  },
  {
    title: "منصة التدريب والتطوير",
    description: "برامج تدريبية متطورة لتنمية المهارات",
    icon: GraduationCap,
    route: "/services/training",
    monthlyPrice: 449,
    features: [
      "مكتبة تدريبية شاملة",
      "مسارات تعليمية مخصصة",
      "شهادات معتمدة",
      "تقارير التقدم"
    ]
  },
  {
    title: "حماية الأجور",
    description: "نظام حماية حقوق العمال والأجور",
    icon: ShieldCheck,
    route: "/services/wage-protection",
    monthlyPrice: 199,
    features: [
      "مراقبة دفع الأجور",
      "تقارير الامتثال",
      "إدارة الشكاوى",
      "حماية حقوق العمال"
    ]
  },
  {
    title: "تطوير المنصات الإلكترونية",
    description: "تطوير وتصميم المنصات والتطبيقات الرقمية",
    icon: Globe,
    route: "/services/platform-development",
    monthlyPrice: 2499,
    features: [
      "تطوير تطبيقات مخصصة",
      "تصميم واجهات المستخدم",
      "تكامل الأنظمة",
      "الصيانة والدعم"
    ],
    isPremium: true
  },
  {
    title: "خدمات القطاع غير الربحي",
    description: "حلول مخصصة للمؤسسات الخيرية وغير الربحية",
    icon: Heart,
    route: "/services/nonprofit-services",
    monthlyPrice: 149,
    features: [
      "إدارة المتطوعين",
      "تتبع التبرعات",
      "تقارير الأثر الاجتماعي",
      "إدارة البرامج الخيرية"
    ]
  }
];

const stats = [
  { number: "500+", label: "شركة تثق بنا" },
  { number: "50,000+", label: "موظف نديرهم" },
  { number: "99.9%", label: "وقت التشغيل" },
  { number: "24/7", label: "دعم متواصل" }
];

const testimonials = [
  {
    name: "أحمد محمد السعد",
    position: "مدير الموارد البشرية",
    company: "شركة الرياض للتقنية",
    text: "منصة هدف غيرت طريقة إدارتنا للموارد البشرية بالكامل. سهولة الاستخدام والمميزات المتقدمة جعلت عملنا أكثر كفاءة.",
    rating: 5
  },
  {
    name: "فاطمة علي النور", 
    position: "الرئيسة التنفيذية",
    company: "مؤسسة الخير الاجتماعية",
    text: "بفضل حلول هدف، تمكنا من تطوير عملياتنا وزيادة كفاءة إدارة المتطوعين والبرامج الخيرية بشكل ملحوظ.",
    rating: 5
  },
  {
    name: "محمد خالد الشمري",
    position: "مدير العمليات",
    company: "شركة البناء المتقدم",
    text: "أنظمة هدف ساعدتنا في تنظيم عمليات التوظيف والتدريب، مما وفر علينا الكثير من الوقت والجهد.",
    rating: 4
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return <ServiceCalculator onBack={() => setShowCalculator(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* القسم الرئيسي */}
      <section className="hero-section relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  مستقبل إدارة
                  <span className="block text-gradient">الموارد البشرية</span>
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  منصة شاملة ومتطورة لإدارة جميع جوانب الموارد البشرية بأحدث التقنيات وأفضل الممارسات العالمية
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={() => navigate('/login')}
                >
                  ابدأ الآن مجاناً
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => navigate('/services')}
                >
                  استكشف الخدمات
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-8 text-white/80">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img 
                  src={boudLogo} 
                  alt="بُعد HR - منصة الموارد البشرية"
                  className="w-64 h-64 object-contain mx-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* من نحن */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">من نحن</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نحن شركة هدف للموارد البشرية، رائدة في تقديم الحلول الرقمية المتطورة لإدارة الموارد البشرية في المملكة العربية السعودية
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">قصتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                تأسست شركة هدف للموارد البشرية عام 2020 برؤية واضحة: تطوير أنظمة رقمية متطورة تساعد الشركات والمؤسسات 
                على إدارة مواردها البشرية بكفاءة عالية وفقاً لأفضل المعايير العالمية ومتطلبات السوق السعودي.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                منذ انطلاقتنا، نجحنا في خدمة أكثر من 500 شركة ومؤسسة، وإدارة شؤون أكثر من 50,000 موظف، 
                مما جعلنا الخيار الأول للشركات الساعية للتميز في إدارة مواردها البشرية.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">4+</div>
                  <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">منصات متخصصة</div>
                </div>
              </div>
            </div>
            
            <Card className="service-card">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">ما يميزنا</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">التقنيات الحديثة</h4>
                      <p className="text-sm text-muted-foreground">استخدام أحدث التقنيات والذكاء الاصطناعي</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">الامتثال المحلي</h4>
                      <p className="text-sm text-muted-foreground">متوافق مع قوانين العمل والضرائب السعودية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">دعم 24/7</h4>
                      <p className="text-sm text-muted-foreground">فريق دعم فني متخصص متاح على مدار الساعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">التكامل السهل</h4>
                      <p className="text-sm text-muted-foreground">تكامل سهل مع الأنظمة والمنصات الموجودة</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* رؤيتنا وقيمنا */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">رؤيتنا وقيمنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نؤمن بأن الموارد البشرية هي أساس نجاح أي منظمة، ونسعى لتمكين الشركات من تحقيق أهدافها من خلال حلولنا المبتكرة
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* الرؤية */}
            <Card className="service-card text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الشريك الاستراتيجي الأول للشركات في المملكة العربية السعودية في مجال تطوير وإدارة 
                  الموارد البشرية من خلال تقديم حلول رقمية مبتكرة تواكب رؤية المملكة 2030.
                </p>
              </div>
            </Card>
            
            {/* المهمة */}
            <Card className="service-card text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">مهمتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  تمكين الشركات والمؤسسات من إدارة مواردها البشرية بكفاءة عالية من خلال منصات رقمية متطورة 
                  وخدمات استشارية متخصصة تساهم في تحقيق النمو المستدام والتطوير المؤسسي.
                </p>
              </div>
            </Card>
            
            {/* القيم */}
            <Card className="service-card text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">قيمنا</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>الابتكار والتطوير المستمر</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>الشفافية والنزاهة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>التميز في الخدمة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>الشراكة طويلة المدى</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* الخدمات والأسعار */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">منصاتنا وخدماتنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              مجموعة شاملة من المنصات المتخصصة لتلبية جميع احتياجات إدارة الموارد البشرية
            </p>
            
            {/* حاسبة الخدمات والتحكم في الأسعار */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
              <Button 
                size="lg" 
                className="btn-primary"
                onClick={() => navigate('/service-calculator')}
              >
                <Calculator className="ml-2 h-5 w-5" />
                حاسبة الخدمات الذكية
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/wage-protection-platform')}
              >
                <Shield className="ml-2 h-5 w-5" />
                منصة حماية الأجور
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/chat-messaging')}
              >
                <Brain className="ml-2 h-5 w-5" />
                نظام المراسلة الذكي
              </Button>
              
              <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-2">
                <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                  شهري
                </span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span 
                    className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      isYearly ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                  سنوي
                </span>
                {isYearly && (
                  <Badge variant="secondary" className="text-xs">
                    خصم 15%
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Card key={index} className="service-card group cursor-pointer hover:scale-105 transition-all duration-300">
                  <div className="space-y-4">
                    {service.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        مميز
                      </Badge>
                    )}
                    
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ServiceIcon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">
                          {isYearly 
                            ? `${Math.round(service.monthlyPrice * 12 * 0.85).toLocaleString()} ريال/سنوياً`
                            : `${service.monthlyPrice} ريال/شهرياً`
                          }
                        </span>
                        <Badge variant="outline" className={isYearly ? 'bg-primary text-primary-foreground' : ''}>
                          {isYearly ? 'سنوي' : 'شهري'}
                        </Badge>
                      </div>
                      
                      <Button 
                        className="w-full btn-primary"
                        onClick={() => navigate(service.route)}
                      >
                        تفاصيل أكثر
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* آراء العملاء */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              آراء وتجارب عملائنا الكرام مع منصات هدف للموارد البشرية
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="service-card">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* دعوة للعمل */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              ابدأ رحلتك معنا اليوم
            </h2>
            <p className="text-xl text-white/90">
              انضم إلى أكثر من 500 شركة تثق في هدف للموارد البشرية لإدارة مواردها البشرية بكفاءة وتميز
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/login')}
              >
                جرب مجاناً لمدة 30 يوم
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/user-management')}
              >
                تواصل مع المبيعات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* معلومات التواصل */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gradient mb-4">هدف للموارد البشرية</h3>
              <p className="text-muted-foreground mb-6">
                شريكك الاستراتيجي في إدارة وتطوير الموارد البشرية. نقدم حلولاً رقمية متطورة تساعد منظمتك على تحقيق التميز والنمو المستدام.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">info@hadaf-hr.sa</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">+966 11 234 5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">الخدمات</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary" onClick={() => navigate('/services/individuals')}>
                  خدمات الأفراد
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary" onClick={() => navigate('/services/business-management')}>
                  إدارة المنشآت
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary" onClick={() => navigate('/services/recruitment')}>
                  التوظيف الذكي
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary" onClick={() => navigate('/services/training')}>
                  التدريب والتطوير
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">الشركة</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary">
                  من نحن
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary">
                  فريق العمل
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary">
                  الوظائف
                </Button>
                <Button variant="ghost" className="h-auto p-0 font-normal text-muted-foreground hover:text-primary">
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 هدف للموارد البشرية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </section>
    </div>
  );
};