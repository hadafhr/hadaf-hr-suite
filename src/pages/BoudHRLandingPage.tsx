import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  Shield, 
  Brain,
  Target,
  BarChart3,
  CheckCircle,
  Star,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  MessageCircle,
  Play,
  Award,
  Zap,
  Lock,
  Cloud,
  Settings,
  Building,
  GraduationCap,
  Calculator,
  Heart,
  Briefcase,
  FileText,
  Clock,
  ChevronDown,
  User,
  Bell
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import heroLaptop from '@/assets/hero-laptop.jpg';
import businessTeam from '@/assets/business-team.jpg';
import codingScreen from '@/assets/coding-screen.jpg';
import hrAutomation from '@/assets/hr-automation.jpg';
import cloudComputing from '@/assets/cloud-computing.jpg';
import teamCollaboration from '@/assets/team-collaboration.jpg';

const BoudHRLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const menuItems = {
    services: [
      { name: "إدارة الموظفين", href: "/employee-management" },
      { name: "الخدمة الذاتية", href: "/employee-self-service" },
      { name: "حماية الأجور", href: "/wage-protection" },
      { name: "التقييمات الذكية", href: "/performance-evaluation" },
      { name: "التدريب والتطوير", href: "/training" }
    ],
    about: [
      { name: "رؤيتنا", href: "#vision" },
      { name: "من نحن", href: "#who-we-are" },
      { name: "فريق العمل", href: "#team" },
      { name: "شركاؤنا", href: "#partners" }
    ],
    clients: [
      { name: "عملاؤنا", href: "#clients" },
      { name: "قصص نجاح", href: "#success-stories" },
      { name: "شهادات العملاء", href: "#testimonials" },
      { name: "دراسات الحالة", href: "#case-studies" }
    ],
    contact: [
      { name: "تواصل معنا", href: "#contact" },
      { name: "الدعم الفني", href: "/chat-messaging" },
      { name: "طلب عرض سعر", href: "/service-calculator" },
      { name: "حجز موعد", href: "#booking" }
    ]
  };

  const coreFeatures = [
    {
      title: "إدارة الموظفين",
      description: "نظام شامل لإدارة بيانات الموظفين وتتبع مسيرتهم المهنية",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "حماية الأجور",
      description: "ضمان الامتثال الكامل لأنظمة حماية الأجور السعودية",
      icon: Shield,
      color: "text-primary"
    },
    {
      title: "التقييمات الذكية",
      description: "نظام تقييم أداء متطور مدعوم بالذكاء الاصطناعي",
      icon: BarChart3,
      color: "text-primary"
    },
    {
      title: "التكامل الحكومي",
      description: "ربط مباشر مع منصات مدد وقوى والتأمينات الاجتماعية",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "الذكاء الاصطناعي",
      description: "تحليل ذكي للأداء والتوصيات المدعومة بالذكاء الاصطناعي",
      icon: Brain,
      color: "text-primary"
    },
    {
      title: "أمان البيانات",
      description: "حماية متقدمة تتوافق مع معايير الأمان السعودية والعالمية",
      icon: Lock,
      color: "text-primary"
    }
  ];

  const systemPlatforms = [
    {
      title: "منصة التطوير والتنظيم المؤسسي",
      description: "أدوات متقدمة لتطوير الهيكل التنظيمي وإدارة المشاريع",
      icon: Building,
      color: "text-primary",
      href: "/service-platforms/organizational-development"
    },
    {
      title: "منصة التدريب",
      description: "نظام إدارة التعلم والتدريب مع البث المباشر والمحتوى التفاعلي",
      icon: GraduationCap,
      color: "text-primary",
      href: "/service-platforms/training"
    },
    {
      title: "منصة الشؤون القانونية",
      description: "أدوات قانونية متخصصة مع ذكاء اصطناعي لإدارة الشؤون القانونية",
      icon: FileText,
      color: "text-primary",
      href: "/legal-platform"
    },
    {
      title: "منصة التوظيف الذكي",
      description: "نظام توظيف متطور مع تتبع المتقدمين وإدارة المقابلات الذكية",
      icon: Users,
      color: "text-primary",
      href: "/smart-hire"
    },
    {
      title: "منصة القطاع غير الربحي",
      description: "حلول مخصصة للمنظمات غير الربحية وإدارة المتطوعين",
      icon: Heart,
      color: "text-primary",
      href: "/service-platforms/nonprofit-services"
    },
    {
      title: "منصة خدمات أصحاب الأعمال",
      description: "حلول شاملة مع لوحات تحكم تنفيذية متقدمة لأصحاب الأعمال",
      icon: Briefcase,
      color: "text-primary",
      href: "/service-platforms/business-management"
    },
    {
      title: "حاسبة الخدمات",
      description: "أداة ذكية لحساب تكلفة الخدمات والباقات المناسبة لمنظمتك",
      icon: Calculator,
      color: "text-primary",
      href: "/service-calculator"
    },
    {
      title: "منصة التطوير المخصص",
      description: "تطوير حلول مخصصة حسب احتياجات المنظمة الفريدة",
      icon: Settings,
      color: "text-primary",
      href: "/service-platforms/platform-development"
    }
  ];

  const benefits = [
    {
      title: "أتمتة العمليات",
      description: "توفير 70% من الوقت المستغرق في العمليات اليدوية",
      icon: Zap,
      stat: "70%"
    },
    {
      title: "أمان البيانات",
      description: "حماية متقدمة تتوافق مع معايير الأمان السعودية",
      icon: Lock,
      stat: "100%"
    },
    {
      title: "الحوسبة السحابية",
      description: "وصول آمن من أي مكان وفي أي وقت",
      icon: Cloud,
      stat: "24/7"
    },
    {
      title: "الامتثال التنظيمي",
      description: "ضمان الامتثال لجميع اللوائح والقوانين السعودية",
      icon: CheckCircle,
      stat: "100%"
    }
  ];

  const testimonials = [
    {
      name: "أحمد المحمد",
      position: "مدير الموارد البشرية",
      company: "شركة الرياض للتقنية",
      text: "نظام بُعد HR غيّر طريقة عملنا بالكامل. الواجهة سهلة والمميزات متقدمة جداً.",
      rating: 5,
      image: "photo-1519389950473-47ba0277781c"
    },
    {
      name: "فاطمة السعيد",
      position: "مديرة العمليات",
      company: "مجموعة الخليج التجارية",
      text: "التكامل مع الأنظمة الحكومية وفر علينا وقتاً كبيراً وقلل من الأخطاء.",
      rating: 5,
      image: "photo-1488972685288-c3fd157d7c7a"
    },
    {
      name: "محمد الشمري",
      position: "الرئيس التنفيذي",
      company: "شركة الابتكار الرقمي",
      text: "الذكاء الاصطناعي في النظام يساعدنا في اتخاذ قرارات أفضل حول الموظفين.",
      rating: 5,
      image: "photo-1498050108023-c5249f4df085"
    }
  ];

  const stats = [
    { number: "1000+", label: "شركة تثق بنا" },
    { number: "100,000+", label: "موظف نديرهم" },
    { number: "99.9%", label: "وقت التشغيل" },
    { number: "24/7", label: "دعم متواصل" }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div>
                <h1 className="text-xl font-bold text-black">بُعد HR</h1>
                <p className="text-xs text-muted-foreground">BOUD</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#home" className="navigation-item text-sm font-medium hover:text-primary transition-colors">الرئيسية</a>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                  من نحن <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
                  {menuItems.about.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <a href={item.href} className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3">
                        <Building2 className="w-4 h-4" />
                        {item.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                  خدماتنا <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
                  {menuItems.services.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <button 
                        onClick={() => navigate(item.href)} 
                        className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                      >
                        <Users className="w-4 h-4" />
                        {item.name}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                  عملاؤنا <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
                  {menuItems.clients.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <button 
                        onClick={() => item.href.startsWith('#') ? document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : navigate(item.href)} 
                        className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                      >
                        <Star className="w-4 h-4" />
                        {item.name}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/service-calculator')} className="navigation-item text-sm font-medium hover:text-primary transition-colors">
                احسب اشتراكك
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                  تواصل معنا <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
                  {menuItems.contact.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <button 
                        onClick={() => item.href.startsWith('#') ? document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : navigate(item.href)} 
                        className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {item.name}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/self-service-login')}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                الخدمة الذاتية
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    تسجيل الدخول <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg">
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={() => navigate('/business-login')} 
                      className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                    >
                      <Building2 className="w-4 h-4" />
                      دخول أصحاب الأعمال
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={() => navigate('/individual-login')} 
                      className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                    >
                      <User className="w-4 h-4" />
                      دخول الأفراد
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={() => navigate('/hr/hr-login')} 
                      className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                    >
                      <Users className="w-4 h-4" />
                      دخول الموارد البشرية
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                onClick={() => navigate('/subscription-packages')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                اشترك الآن
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('mobile-app')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l.707.707-1.414 1.414L15 8.414V13a1 1 0 11-2 0V10.414l-3 3-3-3V13a1 1 0 11-2 0V8.414L4 9.414 2.586 8l.707-.707z" clipRule="evenodd" />
                </svg>
                تحميل التطبيق
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="navigation-item text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  الرئيسية
                </a>
                <details className="group">
                  <summary className="navigation-item text-sm font-medium cursor-pointer list-none">
                    خدماتنا <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.services.map((item, index) => (
                      <a key={index} href={item.href} className="block text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </details>
                <details className="group">
                  <summary className="navigation-item text-sm font-medium cursor-pointer list-none">
                    من نحن <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.about.map((item, index) => (
                      <a key={index} href={item.href} className="block text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </details>
                <a href="#contact" className="navigation-item text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  تواصل معنا
                </a>
                <Button 
                  onClick={() => {
                    navigate('/subscription-packages');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                >
                  اشترك الآن
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroLaptop}
            alt="نظام إدارة الموارد البشرية المتطور"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-right space-y-8">
              <div>
                <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm mb-4">
                  الحل الأمثل لإدارة الموارد البشرية 🚀
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  بُعد <span className="text-gradient">HR</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mt-4 leading-relaxed">
                  منصة ذكية شاملة لإدارة الموارد البشرية مع تكامل كامل مع الأنظمة الحكومية السعودية
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/subscription-packages')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                >
                  ابدأ تجربتك المجانية
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
                >
                  اكتشف المميزات
                </Button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative">
                <img 
                  src={businessTeam} 
                  alt="فريق عمل محترف" 
                  className="w-full h-96 object-cover rounded-2xl shadow-strong"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-white">
                      <Brain className="w-5 h-5" />
                      <span className="text-sm font-medium">مدعوم بالذكاء الاصطناعي</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="relative">
                  <img 
                    src={codingScreen} 
                    alt="واجهة النظام المتطورة" 
                    className="w-full h-32 object-cover rounded-xl shadow-medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-foreground">أتمتة ذكية</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src={cloudComputing} 
                    alt="الحوسبة السحابية" 
                    className="w-full h-32 object-cover rounded-xl shadow-medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-foreground">حوسبة سحابية</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="solutions" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">الميزات الأساسية</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              حلول أساسية وقوية لإدارة الموارد البشرية بكفاءة عالية
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="service-card group cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => {
                  if (feature.title === "إدارة الموظفين") navigate("/service-platforms/employee-management");
                  else if (feature.title === "حماية الأجور") navigate("/service-platforms/wage-protection");
                  else if (feature.title === "التقييمات الذكية") navigate("/service-platforms/performance-evaluation");
                  else if (feature.title === "التكامل الحكومي") navigate("/business-platform");
                  else if (feature.title === "الذكاء الاصطناعي") navigate("/ai-hub");
                }}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">لماذا بُعد HR؟</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              فوائد حقيقية وقابلة للقياس لعملك وموظفيك
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="metric-card group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{benefit.title}</h3>
                        <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                      </div>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gradient">من نحن</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نحن فريق سعودي-عالمي من خبراء الموارد البشرية، وتقنية السحابة، وعلوم البيانات.
                اجتمعنا حول رؤية واحدة: إعادة تشكيل إدارة رأس المال البشري في المنطقة العربية.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">🔹 ذكاء عملي</h3>
                  <p className="text-muted-foreground">نحو تحويل بيانات الموظفين إلى رؤى قابلة للتنفيذ، من خلال خوارزميات AI متقدمة.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">🔹 تكامل شامل</h3>
                  <p className="text-muted-foreground">منصة واحدة تشمل: التوظيف، الرواتب، الأداء، الامتثال، التدريب - مرتبطة آليًا بمنصات: قوى – التأمينات الاجتماعية – مدد – البنوك السعودية.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">🔹 أمن وموثوقية</h3>
                  <p className="text-muted-foreground">استضافة سحابية داخل المملكة، مع اعتماد معايير الأمان المحلية والعالمية (ISO 27001 وNCA ECC).</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">🔹 تركيز إنساني</h3>
                  <p className="text-muted-foreground">تصميم كامل للتجربة الوظيفية حول الموظف وراحته، بهدف زيادة الولاء والإنتاجية.</p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="btn-primary" onClick={() => navigate("/business-platform")}>
                  تعرف على المزيد
                </Button>
                <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  تواصل معنا
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={teamCollaboration}
                alt="فريق عمل يتعاون باستخدام تقنيات الموارد البشرية الحديثة"
                className="w-full h-96 object-cover rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white">
                    <Brain className="w-5 h-5" />
                    <span className="text-sm font-medium">مدعوم بالذكاء الاصطناعي</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              شهادات حقيقية من عملائنا الذين استفادوا من حلولنا المتطورة
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">ابدأ رحلتك نحو التحول الرقمي</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الشركات التي تثق في بُعد HR لإدارة مواردها البشرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/subscription-packages')}
              className="text-lg px-8 py-6"
            >
              ابدأ تجربتك المجانية
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/service-calculator')}
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              احسب اشتراكك
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">تواصل معنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نحن هنا لمساعدتك في رحلة التحول الرقمي
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">اتصل بنا</h3>
                <p className="text-muted-foreground">+966 50 123 4567</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">راسلنا</h3>
                <p className="text-muted-foreground">info@boud-hr.com</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">زوروا مكاتبنا</h3>
                <p className="text-muted-foreground">الرياض، المملكة العربية السعودية</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">بُعد HR</h3>
              <p className="text-background/80 mb-4">
                منصة ذكية شاملة لإدارة الموارد البشرية مع تكامل كامل مع الأنظمة الحكومية السعودية
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-background hover:text-primary">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="/employee-management" className="hover:text-primary transition-colors">إدارة الموظفين</a></li>
                <li><a href="/wage-protection" className="hover:text-primary transition-colors">حماية الأجور</a></li>
                <li><a href="/performance-evaluation" className="hover:text-primary transition-colors">التقييمات الذكية</a></li>
                <li><a href="/training" className="hover:text-primary transition-colors">التدريب والتطوير</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#about" className="hover:text-primary transition-colors">من نحن</a></li>
                <li><a href="#testimonials" className="hover:text-primary transition-colors">عملاؤنا</a></li>
                <li><a href="/subscription-packages" className="hover:text-primary transition-colors">الباقات</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">تواصل معنا</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="/chat-messaging" className="hover:text-primary transition-colors">الدعم الفني</a></li>
                <li><a href="/service-calculator" className="hover:text-primary transition-colors">حاسبة الأسعار</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">المساعدة</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 بُعد HR. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoudHRLandingPage;