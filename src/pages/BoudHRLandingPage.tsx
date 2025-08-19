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
  Video
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
      description: "حلول شاملة ومتطورة لتلبية جميع احتياجات إدارة الموارد البشرية. يتضمن جميع الأنظمة: التوظيف الذكي، التدريب، التعويضات والمزايا، حماية الأجور، التقييمات الذكية، التكامل الحكومي، الذكاء الاصطناعي، الاجتماعات الذكية، الشؤون القانونية، وخدمات أصحاب الأعمال.",
      icon: Users,
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "نظام الخدمة الذاتية",
      description: "منصة تفاعلية متطورة تمكن الموظفين من إدارة شؤونهم الشخصية والمهنية بكل سهولة ومرونة. تقليل الأعباء الإدارية مع تحسين تجربة الموظف الرقمية بشكل استثنائي.",
      icon: Settings,
      color: "text-primary",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=400&q=80"
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
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <img 
                src="/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png" 
                alt="BOUD HR Logo" 
                className="h-60 w-auto ml-4"
              />
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
                  <DropdownMenuItem asChild>
                    <button 
                      onClick={() => navigate('/self-service-login')} 
                      className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3"
                    >
                      <Settings className="w-4 h-4" />
                      دخول نظام الخدمة الذاتية
                    </button>
                  </DropdownMenuItem>
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
                  <Button variant="ghost" onClick={() => navigate('/business-login')}>
                    <Building2 className="w-4 h-4 ml-2" />
                    دخول أصحاب الأعمال
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/individual-login')}>
                    <User className="w-4 h-4 ml-2" />
                    دخول الأفراد
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
                  🚀 منصة سعودية 100% متوافقة مع رؤية 2030
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  منصة <span className="text-gradient">بُعد HR</span>
                  <br />
                  البُعد الجديد لإدارة رأس المال البشري
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  منصّة موارد بشرية سحابية، ذكية، ومتكاملة تمكّن منظمتك من إدارة دورة حياة الموظف بالكامل 
                  من الاستقطاب وحتى نهاية الخدمة، عبر الأتمتة والتحليلات التنبؤية والتكامل الفوري مع الجهات الحكومية.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8" onClick={() => navigate('/subscription-packages')}>
                  انضم الينا
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Visual Elements */}
            <div className="relative animate-slide-up">
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative mb-6">
                  <img 
                    src="/lovable-uploads/e178bb8e-1473-4998-a200-54739ac16b3e.png" 
                    alt="فريق عمل متنوع - منصة بُعد HR" 
                    className="w-full h-80 object-cover rounded-2xl shadow-strong"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <Cloud className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">تقنية سحابية متقدمة</div>
                          <div className="text-xs text-muted-foreground">آمنة ومتاحة 24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                     <img 
                       src="/lovable-uploads/ebeb1cac-6889-402f-800b-60ea4e5b64c5.png" 
                       alt="أتمتة الموارد البشرية" 
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
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

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">نظام بُعد</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              حلول شاملة ومتطورة لتلبية جميع احتياجات إدارة الموارد البشرية
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="service-card group cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
                onClick={() => {
                  if (feature.title === "نظام إدارة الموظفين الشامل") navigate("/comprehensive-employee-management");
                  else if (feature.title === "نظام الخدمة الذاتية") navigate("/employee-self-service");
                }}
              >
                <CardHeader className="text-center p-0">
                  {/* صورة النظام */}
                  <div className="w-full h-48 overflow-hidden rounded-t-lg mb-4">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-6 pb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-3 text-right">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-right">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">فوائد بُعد HR</h2>
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

      {/* Why Boud Section - Comprehensive */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">لماذا بُعد؟</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              اكتشف الأسباب التي تجعل بُعد HR الخيار الأمثل لإدارة الموارد البشرية في منظمتك مع الحلول الأكثر تطوراً وشمولية
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="automation" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-muted/50 p-2 rounded-xl">
                <TabsTrigger 
                  value="automation" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">أتمتة العمليات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">أمان البيانات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="cloud" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <Cloud className="w-5 h-5" />
                  <span className="text-sm font-medium">الحوسبة السحابية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="compliance" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">الامتثال التنظيمي</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="automation" className="mt-8">
                <Card className="service-card border-primary/20">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">أتمتة العمليات الذكية</h3>
                        </div>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          نقوم بأتمتة جميع العمليات الروتينية في إدارة الموارد البشرية، مما يوفر 70% من الوقت المخصص للمهام الإدارية ويقلل الأخطاء البشرية إلى الحد الأدنى.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">أتمتة عمليات الرواتب والمزايا والتعويضات بدقة 100%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">معالجة طلبات الإجازات والغياب والانتدابات تلقائياً</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تقارير ذكية مُحدثة في الوقت الفعلي مع التحليلات</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تذكيرات ذكية للمواعيد والعلاوات والترقيات</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">حساب تلقائي لسلم الرواتب وبدلات الانتداب</span>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-primary">النتائج المحققة</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            توفير 70% من الوقت • تقليل الأخطاء بنسبة 95% • زيادة الإنتاجية بـ 40% • توفير التكاليف بنسبة 60%
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <img 
                          src="/lovable-uploads/ebeb1cac-6889-402f-800b-60ea4e5b64c5.png"
                          alt="أتمتة العمليات في بُعد HR"
                          className="w-full h-80 object-cover rounded-xl shadow-strong"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-8">
                <Card className="service-card border-primary/20">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">أمان البيانات المطلق</h3>
                        </div>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          نضمن حماية بيانات موظفيك وبيانات الرواتب والمزايا بأعلى معايير الأمان العالمية والمحلية، مع التوافق الكامل مع قوانين حماية البيانات السعودية.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تشفير متقدم 256-bit للبيانات الحساسة والمالية</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">مصادقة ثنائية العامل لجميع المستخدمين والمدراء</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">نسخ احتياطية آمنة كل 15 دقيقة مع استرداد فوري</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">مراقبة أمنية 24/7 ضد التهديدات والاختراقات</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">حماية بيانات التعويضات والمزايا بعزل تام</span>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-primary">الشهادات والامتثال</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ISO 27001 • NCA ECC-1 • GDPR • قانون حماية البيانات السعودي • SAMA • CITC
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <img 
                          src={codingScreen}
                          alt="أمان البيانات في بُعد HR"
                          className="w-full h-80 object-cover rounded-xl shadow-strong"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white">
                              <Lock className="w-5 h-5" />
                              <span className="text-sm font-medium">أمان متقدم</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cloud" className="mt-8">
                <Card className="service-card border-primary/20">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Cloud className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">الحوسبة السحابية المتطورة</h3>
                        </div>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          بنية تحتية سحابية متطورة داخل المملكة العربية السعودية، تضمن الأداء العالي والتوافر المستمر لجميع خدمات التعويضات والموارد البشرية.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">استضافة محلية داخل المملكة العربية السعودية</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">توافر 99.9% مع ضمان استمرارية الخدمة</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">قابلية التوسع التلقائي حسب احتياجات المنظمة</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تحديثات تلقائية بدون انقطاع في الخدمة</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">أداء فائق السرعة لمعالجة الرواتب والتقارير</span>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-primary">الوصول من أي مكان</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            وصول آمن من الهاتف المحمول • أجهزة الكمبيوتر • الأجهزة اللوحية • في أي وقت • من أي مكان
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <img 
                          src={cloudComputing}
                          alt="الحوسبة السحابية في بُعد HR"
                          className="w-full h-80 object-cover rounded-xl shadow-strong"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white">
                              <Cloud className="w-5 h-5" />
                              <span className="text-sm font-medium">سحابية 100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="mt-8">
                <Card className="service-card border-primary/20">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">الامتثال التنظيمي الشامل</h3>
                        </div>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          نضمن الامتثال الكامل لجميع القوانين واللوائح السعودية والعالمية في مجال التعويضات وحماية الأجور، مع التحديث المستمر لمواكبة أي تغييرات قانونية.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">توافق كامل مع نظام العمل السعودي الجديد والتعديلات</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تكامل مباشر مع منصة قوى والتأمينات الاجتماعية ومدد</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تطبيق سياسات السعودة والحد الأدنى للأجور</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">تحديثات تلقائية للوائح والقوانين الجديدة</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">امتثال كامل لأنظمة حماية الأجور ونظام WPS</span>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-primary">الجهات المتكاملة</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            قوى • التأمينات الاجتماعية • مدد • البنوك السعودية • الزكاة والضريبة • نقدي
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <img 
                          src={businessTeam}
                          alt="الامتثال التنظيمي في بُعد HR"
                          className="w-full h-80 object-cover rounded-xl shadow-strong"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-3">
                            <div className="flex items-center gap-2 text-white">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">متوافق 100%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Additional Why Choose Section */}
            <div className="mt-16 grid lg:grid-cols-3 gap-8">
              <Card className="service-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">دقة بنسبة 99.9%</h3>
                  <p className="text-muted-foreground">
                    نضمن دقة عالية في جميع العمليات المالية والحسابات والتقارير مع عدم وجود أخطاء في التعويضات
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">توفير الوقت</h3>
                  <p className="text-muted-foreground">
                    توفير 70% من الوقت المخصص للعمليات الإدارية مع أتمتة كاملة لحساب الرواتب والعلاوات والترقيات
                  </p>
                </CardContent>
              </Card>

              <Card className="service-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">توفير التكاليف</h3>
                  <p className="text-muted-foreground">
                    تقليل التكاليف التشغيلية بنسبة 60% مع حلول شاملة تغطي جميع احتياجات التعويضات والمزايا
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              تجارب حقيقية من شركات ومؤسسات تثق في بُعد HR
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="service-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100&q=80"
                      alt="أحمد المحمد - مدير الموارد البشرية"
                      className="w-12 h-12 rounded-full object-cover"
                    />
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
      <section className="py-20 bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ابدأ رحلتك مع بُعد HR اليوم
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              انضم إلى أكثر من 1000 شركة تثق في بُعد HR لإدارة مواردها البشرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8" onClick={() => navigate("/dashboard")}>
                ابدأ التجربة المجانية
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                تحدث مع خبير
              </Button>
            </div>
            
            {/* Chat Bot Button */}
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
                onClick={() => navigate("/ai-hub")}
              >
                <MessageCircle className="w-5 h-5" />
                تحدث مع المساعد الذكي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">📬 تواصل معنا – نحن هنا لدعمك في كل خطوة</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              سواء كنت صاحب عمل أو موظفًا، يسعدنا خدمتك والرد على استفساراتك عبر أي وسيلة تفضلها.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">الهاتف</h3>
                  <p className="text-2xl font-bold text-primary">+966 55 123 4567</p>
                  <p className="text-sm text-muted-foreground mt-2">متاح 24/7</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">البريد الإلكتروني</h3>
                  <p className="text-lg font-bold text-primary">support@boodhr.sa</p>
                  <p className="text-sm text-muted-foreground mt-2">رد سريع خلال ساعتين</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">الموقع</h3>
                  <p className="text-primary font-medium">الرياض</p>
                  <p className="text-sm text-muted-foreground">المملكة العربية السعودية</p>
                </Card>

                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">ساعات العمل</h3>
                  <p className="text-primary font-medium">9 صباحاً - 9 مساءً</p>
                  <p className="text-sm text-muted-foreground">7 أيام في الأسبوع</p>
                </Card>
              </div>
            </div>

            {/* Social Media & Quick Actions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">تابعنا على وسائل التواصل</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Snapchat */}
                  <a 
                    href="https://snapchat.com/add/boodhr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-yellow-100 hover:bg-yellow-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">@boodhr</span>
                  </a>

                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/boodhr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">📷</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">@boodhr</span>
                  </a>

                  {/* TikTok */}
                  <a 
                    href="https://tiktok.com/@boodhr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">@boodhr</span>
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href="https://x.com/boodhr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">@boodhr</span>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/company/boodhr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Bood HR</span>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/966551234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 rounded-xl bg-green-100 hover:bg-green-200 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">راسلنا</span>
                  </a>
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">🛡️ الخصوصية والأمان</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  نحن ملتزمون بحماية خصوصيتك وأمان بياناتك وفقاً لأعلى المعايير الدولية ولوائح حماية البيانات السعودية.
                </p>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    اطّلع على سياسة الخصوصية
                  </Button>
                </div>
              </div>
            </div>
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
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">تسجيل الحضور بـ GPS</h3>
                    <p className="text-muted-foreground">سجل حضورك وانصرافك من خلال الموقع الجغرافي المحدد</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">إشعارات فورية</h3>
                    <p className="text-muted-foreground">احصل على تنبيهات فورية لجميع التحديثات المهمة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">إدارة الطلبات</h3>
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
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">قريباً</p>
                    <p className="text-sm text-muted-foreground">التطبيق قيد التطوير النهائي وسيكون متاحاً قريباً على جميع المنصات</p>
                  </div>
                </div>
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
                <li><a href="#pricing" className="text-background/80 hover:text-background transition-colors">الأسعار</a></li>
                <li><a href="#about" className="text-background/80 hover:text-background transition-colors">من نحن</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">إدارة الموظفين</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">حماية الأجور</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">التقييمات الذكية</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">التكامل الحكومي</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-background/80">+966 55 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-background/80">support@boodhr.sa</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-background/80">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
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