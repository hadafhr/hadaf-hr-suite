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
  Bell,
  DollarSign,
  PenTool,
  Video,
  Smartphone
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import heroLaptop from '@/assets/hero-laptop.jpg';
import businessTeam from '@/assets/business-team.jpg';
import codingScreen from '@/assets/coding-screen.jpg';
import hrAutomation from '@/assets/hr-automation.jpg';
import cloudComputing from '@/assets/cloud-computing.jpg';
import teamCollaboration from '@/assets/team-collaboration.jpg';
import ecssPoral from '@/assets/e-css-portal.jpg';
import eisPortal from '@/assets/eis-portal.jpg';
import npcsPortal from '@/assets/npcs-portal.jpg';

const BoudHRLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const menuItems = {
    services: [
      { name: "إدارة الموظفين", href: "/employee-management" },
      { name: "الخدمة الذاتية", href: "/employee-self-service" },
      { name: "التعويضات والمزايا", href: "/compensation-benefits" },
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

  const features = [
    {
      title: "نظام إدارة الموظفين الشامل",
      subtitle: "الحل الأمثل لإدارة رأس المال البشري",
      description: "حل متكامل وشامل يجمع 22 نظاماً فرعياً في منصة واحدة متطورة لإدارة دورة حياة الموظف بالكامل",
      marketingText: "🚀 أتمتة كاملة للعمليات • 🎯 تحليلات ذكية ومتقدمة • ⚡ تكامل فوري مع الأنظمة الحكومية • 🔒 أمان عالي المستوى",
      icon: Users,
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
      route: "/employee-management-info",
      features: ["التوظيف الذكي", "إدارة الأداء", "الرواتب والمزايا", "التدريب والتطوير", "حماية الأجور", "التكامل الحكومي"],
      animation: "hover:scale-105 transform transition-all duration-500"
    },
    {
      title: "نظام الخدمة الذاتية السحابي",
      subtitle: "تمكين الموظفين رقمياً",
      description: "منصة تفاعلية متطورة تمكن الموظفين من إدارة شؤونهم الشخصية والمهنية بكل سهولة ومرونة من أي مكان وفي أي وقت",
      marketingText: "📱 واجهة سهلة ومتجاوبة • ⏱️ خدمة 24/7 • 🔄 تحديثات فورية • 📊 تقارير شخصية مفصلة",
      icon: Settings,
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
      route: "/self-service-info",
      features: ["الملف الشخصي", "طلبات الإجازات", "كشوف الرواتب", "التقييمات الذاتية", "التدريب الإلكتروني", "التواصل المباشر"],
      animation: "hover:scale-105 transform transition-all duration-500"
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
              <img 
                src="/lovable-uploads/1341af57-5888-4f9d-88b7-160bc83d04c7.png" 
                alt="BOUD HR Logo" 
                className="h-12 w-auto"
              />
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
                <DropdownMenuTrigger className="navigation-item text-sm font-medium text-black flex items-center gap-1 hover:text-primary transition-colors">
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

              <Button variant="ghost" onClick={() => navigate('/service-calculator')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors">
                احسب اشتراكك
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors">
                    مركز المعرفة
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border border-border">
                  <DropdownMenuItem onClick={() => navigate('/tutorials')}>
                    الدروس التعليمية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/blog')}>
                    مدونة بُعد
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors">
                اربح مع بُعد
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-2">
                📅 احجز اجتماع
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium text-black flex items-center gap-1 hover:text-primary transition-colors">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    تسجيل الدخول <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg">
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin-login')}
                    className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    🔘 لوحة تحكم الإدارة
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/employee-login')}
                    className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3 cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    🔘 لوحة تحكم الموظف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                onClick={() => navigate('/subscription-packages')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                انضم الينا
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
                <details className="group">
                  <summary className="navigation-item text-sm font-medium cursor-pointer list-none">
                    تواصل معنا <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.contact.map((item, index) => (
                      <a key={index} href={item.href} className="block text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </details>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" onClick={() => navigate('/admin-login')}>
                    <Building2 className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الإدارة
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/employee-login')}>
                    <User className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الموظف
                  </Button>
                  <Button 
                    onClick={() => navigate('/subscription-packages')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    انضم الينا
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                  🎯 الحل الأول في السعودية
                </Badge>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  نظام <span className="text-gradient bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">بُعد HR</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium">
                  إدارة الموارد البشرية بالذكاء الاصطناعي
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  حل شامل ومتطور لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي، يخدم أكثر من 1000+ شركة في السعودية
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/subscription-packages')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ابدأ مجاناً الآن
                  <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/demo-request')}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  <Play className="w-5 h-5 ml-2" />
                  احجز عرض تجريبي
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl overflow-hidden">
                <img 
                  src={heroLaptop}
                  alt="نظام بُعد HR على الكمبيوتر المحمول"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              ⭐ حلولنا المتطورة
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              منصات متكاملة لإدارة <span className="text-gradient">الموارد البشرية</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              حلول ذكية ومتطورة تخدم جميع احتياجات الشركات في إدارة الموارد البشرية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 ${feature.animation} group cursor-pointer`}
                  onClick={() => navigate(feature.route)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IconComponent className={`w-6 h-6 ${feature.color}`} />
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                            جديد
                          </Badge>
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </CardTitle>
                          <p className="text-sm font-medium text-primary mb-2">{feature.subtitle}</p>
                          <CardDescription className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground font-medium">
                          {feature.marketingText}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((feat, featIndex) => (
                          <Badge 
                            key={featIndex} 
                            variant="secondary" 
                            className="text-xs bg-background border border-border"
                          >
                            {feat}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        اكتشف المزيد
                        <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              💡 لماذا بُعد HR؟
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              مزايا تجعلنا <span className="text-gradient">الخيار الأول</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نقدم حلول متطورة تساعد في تحسين الكفاءة والإنتاجية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              💬 آراء العملاء
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              ماذا يقول <span className="text-gradient">عملاؤنا</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              شهادات حقيقية من عملائنا المميزين
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-xs text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Download Section */}
      <section id="mobile-app" className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
              📱 تطبيق محمول متقدم
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              حمّل تطبيق <span className="text-gradient">بُعد HR</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              استمتع بتجربة أفضل مع تطبيقنا المحمول المتاح على جميع المنصات
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Logo Section */}
              <div className="flex justify-center lg:justify-start mb-8">
                <img 
                  src="/lovable-uploads/98104f4d-712b-4381-98d5-35d5fa928839.png" 
                  alt="BOUD HR Logo" 
                  className="h-20 w-auto"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">تسجيل الحضور بـ GPS</h3>
                    <p className="text-muted-foreground">سجل حضورك وانصرافك من خلال الموقع الجغرافي المحدد</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">إشعارات فورية</h3>
                    <p className="text-muted-foreground">احصل على تنبيهات فورية لجميع التحديثات المهمة</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">إدارة الطلبات</h3>
                    <p className="text-muted-foreground">قدم طلباتك وتابع حالتها من أي مكان</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-normal">متاح على</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                    <div className="w-8 h-8 bg-background/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                  </div>
                </Button>
                
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-normal">احصل عليه من</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                    <div className="w-8 h-8 bg-background/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="text-center p-4 rounded-lg bg-accent/20 border border-accent/40">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">قريباً</span> - التطبيق قيد التطوير النهائي وسيكون متاحاً قريباً على جميع المنصات
                </p>
              </div>

              {/* Mobile Login Button */}
              <div className="flex justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/mobile-login')}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-semibold"
                >
                  <Smartphone className="w-5 h-5 ml-2" />
                  تجربة واجهة التطبيق
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
                <div className="w-48 h-96 bg-foreground/5 rounded-3xl mx-auto border-8 border-foreground/10 relative overflow-hidden">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-foreground/20 rounded-full"></div>
                  <div className="mt-12 px-6 space-y-4">
                    <div className="bg-primary/20 h-12 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-foreground/10 rounded"></div>
                      <div className="h-3 bg-foreground/5 rounded w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 bg-primary/10 rounded-lg"></div>
                      <div className="h-16 bg-primary/10 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-foreground/10 rounded"></div>
                      <div className="h-2 bg-foreground/5 rounded w-2/3"></div>
                      <div className="h-2 bg-foreground/5 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">بُعد HR</h1>
                  <p className="text-sm text-background/70">إدارة الموارد البشرية</p>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed">
                نظام سعودي ذكي لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  🇸🇦 صنع في السعودية
                </Badge>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-background/80 hover:text-background transition-colors">الرئيسية</a></li>
                <li><a href="#solutions" className="text-background/80 hover:text-background transition-colors">الحلول</a></li>
                <li><button onClick={() => navigate('/subscription-packages')} className="text-background/80 hover:text-background transition-colors">باقات الاشتراك</button></li>
                <li><button onClick={() => navigate('/blog')} className="text-background/80 hover:text-background transition-colors">المدونة</button></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span className="text-background/80">+966 55 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span className="text-background/80">info@boud.com.sa</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-background/80">الرياض، السعودية</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-background/10 hover:bg-background/20">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-background/10 hover:bg-background/20">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 bg-background/10 hover:bg-background/20">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-background/60 text-sm">
              © 2024 بُعد HR. جميع الحقوق محفوظة. مطور بواسطة فريق بُعد للتقنية
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Live Chat Support */}
        <div className="group relative">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            title="تحدث مع خدمة العملاء"
            onClick={() => navigate("/chat-messaging")}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            تحدث مع خدمة العملاء
          </div>
        </div>

        {/* AI Assistant */}
        <div className="group relative">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            title="بُعد – مساعدك الذكي"
            onClick={() => navigate("/ai-hub")}
          >
            <Brain className="w-6 h-6 text-white" />
          </Button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            بُعد – مساعدك الذكي
          </div>
        </div>

        {/* Call Now */}
        <div className="group relative">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 animate-pulse"
            title="اتصل بنا فوراً"
            onClick={() => window.open('tel:+966551234567')}
          >
            <Phone className="w-6 h-6 text-white" />
          </Button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            اتصل بنا فوراً
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoudHRLandingPage;