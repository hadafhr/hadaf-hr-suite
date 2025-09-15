import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Shield, Brain, Target, BarChart3, CheckCircle, Star, ArrowLeft, Menu, X, Phone, Mail, MapPin, Globe, Linkedin, Twitter, MessageCircle, Play, Award, Zap, Lock, Cloud, Settings, Building, GraduationCap, Calculator, Heart, Briefcase, FileText, Clock, ChevronDown, User, Bell, DollarSign, PenTool, Video, Smartphone, Eye, Rocket, Lightbulb, Crown } from 'lucide-react';
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
import { PatternBackground } from '@/components/PatternBackground';
import { AIAssistantPreview } from '@/components/AIAssistantPreview';
import { BoudHRAssistant } from '@/components/BoudHRAssistant';
import { VisionSection } from '@/components/about/VisionSection';
import { TeamSection } from '@/components/about/TeamSection';
import { PartnersSection } from '@/components/about/PartnersSection';
import BoudLogo from '@/components/BoudLogo';
const BoudHRLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string>('');
  const handleStartConversation = () => {
    setAssistantOpen(true);
  };
  const handleQuestionClick = (question: string) => {
    setInitialMessage(question);
    setAssistantOpen(true);
  };

  // Reset initial message after assistant opens and processes it
  const handleAssistantOpenChange = (open: boolean) => {
    setAssistantOpen(open);
    if (!open) {
      setInitialMessage('');
    }
  };
  const menuItems = {
    services: [{
      name: "إدارة الموظفين",
      href: "/employee-management"
    }, {
      name: "الخدمة الذاتية",
      href: "/employee-self-service"
    }, {
      name: "التعويضات والمزايا",
      href: "/compensation-benefits"
    }, {
      name: "حماية الأجور",
      href: "/wage-protection"
    }, {
      name: "التقييمات الذكية",
      href: "/performance-evaluation"
    }, {
      name: "التدريب والتطوير",
      href: "/training"
    }],
    about: [{
      name: "رؤيتنا",
      href: "#vision"
    }, {
      name: "فريق العمل",
      href: "#team"
    }, {
      name: "شركاؤنا",
      href: "#partners"
    }],
    clients: [{
      name: "عملاؤنا",
      href: "#clients"
    }, {
      name: "قصص نجاح",
      href: "#success-stories"
    }, {
      name: "شهادات العملاء",
      href: "#testimonials"
    }, {
      name: "دراسات الحالة",
      href: "#case-studies"
    }],
    contact: [{
      name: "تواصل معنا",
      href: "#contact"
    }, {
      name: "الدعم الفني",
      href: "/chat-messaging"
    }, {
      name: "طلب عرض سعر",
      href: "/service-calculator"
    }, {
      name: "حجز موعد",
      href: "#booking"
    }]
  };
  const features = [{
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
  }, {
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
  }];
  const benefits = [{
    title: "أتمتة العمليات",
    description: "توفير 70% من الوقت المستغرق في العمليات اليدوية",
    icon: Zap,
    stat: "70%"
  }, {
    title: "أمان البيانات",
    description: "حماية متقدمة تتوافق مع معايير الأمان السعودية",
    icon: Lock,
    stat: "100%"
  }, {
    title: "الحوسبة السحابية",
    description: "وصول آمن من أي مكان وفي أي وقت",
    icon: Cloud,
    stat: "24/7"
  }, {
    title: "الامتثال التنظيمي",
    description: "ضمان الامتثال لجميع اللوائح والقوانين السعودية",
    icon: CheckCircle,
    stat: "100%"
  }];
  const testimonials = [{
    name: "أحمد المحمد",
    position: "مدير الموارد البشرية",
    company: "شركة الرياض للتقنية",
    text: "نظام بُعد HR غيّر طريقة عملنا بالكامل. الواجهة سهلة والمميزات متقدمة جداً.",
    rating: 5,
    image: "photo-1519389950473-47ba0277781c"
  }, {
    name: "فاطمة السعيد",
    position: "مديرة العمليات",
    company: "مجموعة الخليج التجارية",
    text: "التكامل مع الأنظمة الحكومية وفر علينا وقتاً كبيراً وقلل من الأخطاء.",
    rating: 5,
    image: "photo-1488972685288-c3fd157d7c7a"
  }, {
    name: "محمد الشمري",
    position: "الرئيس التنفيذي",
    company: "شركة الابتكار الرقمي",
    text: "الذكاء الاصطناعي في النظام يساعدنا في اتخاذ قرارات أفضل حول الموظفين.",
    rating: 5,
    image: "photo-1498050108023-c5249f4df085"
  }, {
    name: "سارة العتيبي",
    position: "مديرة المالية",
    company: "شركة النجاح للاستثمار",
    text: "حسابات الرواتب أصبحت دقيقة وسريعة، والتقارير المالية مفصلة ومفيدة جداً.",
    rating: 5,
    image: "photo-1494790108755-2616c27f21c"
  }, {
    name: "خالد القحطاني",
    position: "مدير تقنية المعلومات",
    company: "مجموعة الشرق الأوسط",
    text: "النظام آمن وموثوق، والدعم الفني ممتاز ومتوفر على مدار الساعة.",
    rating: 5,
    image: "photo-1507003211169-0a1dd7228f2d"
  }, {
    name: "نورا الحربي",
    position: "مديرة التطوير البشري",
    company: "شركة الإبداع التقني",
    text: "منصة التدريب الإلكتروني ساعدت موظفينا على تطوير مهاراتهم بشكل مستمر.",
    rating: 5,
    image: "photo-1438761681033-6461ffad8d80"
  }, {
    name: "عبدالله المطيري",
    position: "مدير العمليات التشغيلية",
    company: "شركة الخليج للصناعات",
    text: "إدارة الحضور والانصراف أصبحت أسهل وأكثر دقة مع نظام بُعد HR.",
    rating: 4,
    image: "photo-1472099645785-5658abf4ff4e"
  }, {
    name: "هند العمري",
    position: "مديرة شؤون الموظفين",
    company: "مؤسسة الرواد التجارية",
    text: "النظام سهل الاستخدام ووفر علينا الكثير من الوقت في إدارة الموظفين.",
    rating: 5,
    image: "photo-1487412720507-e7ab37603c6f"
  }, {
    name: "ماجد الزهراني",
    position: "الرئيس التنفيذي",
    company: "شركة التطوير المتقدم",
    text: "التحليلات والتقارير تساعدنا في اتخاذ قرارات استراتيجية أفضل للشركة.",
    rating: 5,
    image: "photo-1500648767791-00dcc994a43e"
  }, {
    name: "ريم الشهري",
    position: "مديرة التوظيف",
    company: "شركة الآفاق الجديدة",
    text: "عملية التوظيف أصبحت أكثر كفاءة ونتمكن من اختيار أفضل المرشحين بسهولة.",
    rating: 4,
    image: "photo-1544725176-7c40e5a71c5e"
  }, {
    name: "عمر الدوسري",
    position: "مدير الأداء المؤسسي",
    company: "مجموعة الأعمال المتطورة",
    text: "نظام تقييم الأداء منظم ويساعد في تطوير الموظفين وتحفيزهم بشكل فعال.",
    rating: 5,
    image: "photo-1566492031773-4f4e44671d66"
  }, {
    name: "دانا الخالدي",
    position: "مديرة الامتثال",
    company: "شركة الحلول الذكية",
    text: "النظام يضمن الامتثال للقوانين السعودية والمعايير الدولية بشكل تلقائي.",
    rating: 5,
    image: "photo-1517841905240-472988babdf9"
  }, {
    name: "سعد الغامدي",
    position: "مدير التخطيط الاستراتيجي",
    company: "شركة المستقبل للتنمية",
    text: "البيانات والتحليلات تساعدنا في التخطيط طويل المدى لاستراتيجية الموارد البشرية.",
    rating: 4,
    image: "photo-1507591064344-4c6ce005b128"
  }, {
    name: "لطيفة البقمي",
    position: "مديرة التدريب والتطوير",
    company: "مؤسسة الإنجاز الرقمي",
    text: "برامج التدريب المدمجة في النظام فعالة وتلبي احتياجات الموظفين المختلفة.",
    rating: 5,
    image: "photo-1531123897727-8f129e1688ce"
  }, {
    name: "يوسف الرشيد",
    position: "مدير الأمن السيبراني",
    company: "شركة الحماية التقنية",
    text: "مستوى الأمان والحماية في النظام عالي جداً ويلبي جميع متطلباتنا الأمنية.",
    rating: 5,
    image: "photo-1463453091185-61582044d556"
  }, {
    name: "أمل الفيصل",
    position: "مديرة الجودة",
    company: "شركة الامتياز للخدمات",
    text: "جودة النظام عالية والتحديثات المستمرة تضيف قيمة حقيقية لعملنا اليومي.",
    rating: 4,
    image: "photo-1524504388940-b1c1722653e1"
  }, {
    name: "طلال السبيعي",
    position: "مدير المبيعات",
    company: "شركة التسويق المتقدم",
    text: "النظام ساعد فريق المبيعات في تتبع أدائهم وتحقيق أهدافهم بكفاءة أكبر.",
    rating: 5,
    image: "photo-1507591064344-4c6ce005b128"
  }, {
    name: "منيرة العنزي",
    position: "مديرة المشاريع",
    company: "مجموعة التقنيات المبتكرة",
    text: "إدارة فرق المشاريع أصبحت أكثر تنظيماً والتعاون بين الأقسام محسن بشكل كبير.",
    rating: 5,
    image: "photo-1573497019940-1c28c88b4f3e"
  }, {
    name: "فهد الحارثي",
    position: "مدير الاستراتيجية",
    company: "شركة الرؤية المستقبلية",
    text: "النظام يدعم رؤية الشركة 2030 ويساعدنا في تطبيق أفضل الممارسات العالمية.",
    rating: 4,
    image: "photo-1472099645785-5658abf4ff4e"
  }, {
    name: "شريفة الحكمي",
    position: "مديرة الابتكار",
    company: "مؤسسة الإبداع الرقمي",
    text: "المميزات المتطورة والذكاء الاصطناعي يجعل النظام في المقدمة عالمياً.",
    rating: 5,
    image: "photo-1494790108755-2616c27f21c"
  }];
  const stats = [{
    number: "1000+",
    label: "شركة تثق بنا"
  }, {
    number: "100,000+",
    label: "موظف نديرهم"
  }, {
    number: "99.9%",
    label: "وقت التشغيل"
  }, {
    number: "24/7",
    label: "دعم متواصل"
  }];
  return <div className="min-h-screen bg-background font-arabic">
      {/* Professional Enterprise Header */}
      <header className="bg-background/98 backdrop-blur-md border-b border-border/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Professional Logo Section */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center gap-3">
                <BoudLogo variant="full" size="header" className="h-12 w-auto max-w-[120px] object-contain" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 space-x-reverse">
              <a href="#home" className="navigation-item text-sm font-medium hover:text-primary transition-colors">الرئيسية</a>
              
              <a href="#about" className="navigation-item text-sm font-medium hover:text-primary transition-colors">عن بُعد</a>
              
              <Button variant="ghost" onClick={() => navigate('/interactive-tour')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                جولة تفاعلية
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
                  <DropdownMenuItem onClick={() => navigate('/green-papers')}>
                    الأوراق الخضراء
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                أدوات الموارد البشرية
              </Button>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors">
                اربح مع بُعد
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-2">
                📅 احجز اجتماع
              </Button>

              <Button variant="ghost" onClick={() => navigate('/careers')} className="navigation-item text-sm font-medium text-black hover:text-primary transition-colors flex items-center gap-2">
                👥 انضم الى فريقنا
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="navigation-item text-sm font-medium text-black flex items-center gap-1 hover:text-primary transition-colors">
                  تواصل معنا <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
                  {menuItems.contact.map((item, index) => <DropdownMenuItem key={index} asChild>
                      <button onClick={() => item.href.startsWith('#') ? document.getElementById(item.href.substring(1))?.scrollIntoView({
                    behavior: 'smooth'
                  }) : navigate(item.href)} className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3">
                        <MessageCircle className="w-4 h-4" />
                        {item.name}
                      </button>
                    </DropdownMenuItem>)}
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
                  <DropdownMenuItem onClick={() => navigate('/admin-login')} className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <Building2 className="w-4 h-4" />
                     مدير النظام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <Building className="w-4 h-4" />
                    🏢 لوحة تحكم المنشأة
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/employee-login')} className="w-full text-right hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <User className="w-4 h-4" />
                    🔘 لوحة تحكم الموظف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => navigate('/subscription-packages')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                انضم الينا
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="navigation-item text-sm font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  الرئيسية
                </a>
                <button onClick={() => {
              navigate('/interactive-tour');
              setIsMobileMenuOpen(false);
            }} className="navigation-item text-sm font-medium text-right flex items-center gap-2 hover:text-primary transition-colors">
                  <Play className="w-4 h-4" />
                  جولة تفاعلية
                </button>
                <details className="group">
                  <summary className="navigation-item text-sm font-medium cursor-pointer list-none">
                    من نحن <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.about.map((item, index) => <button key={index} onClick={() => {
                  const element = document.getElementById(item.href.substring(1));
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMobileMenuOpen(false);
                }} className="block text-sm text-muted-foreground w-full text-right hover:text-primary transition-colors">
                        {item.name}
                      </button>)}
                  </div>
                </details>
                <details className="group">
                  <summary className="navigation-item text-sm font-medium cursor-pointer list-none">
                    تواصل معنا <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.contact.map((item, index) => <a key={index} href={item.href} className="block text-sm text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a>)}
                  </div>
                </details>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" onClick={() => navigate('/admin-login')}>
                    <Building2 className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الإدارة
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/company-dashboard')}>
                    <Building className="w-4 h-4 ml-2" />
                    🏢 لوحة تحكم المنشأة
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/employee-login')}>
                    <User className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الموظف
                  </Button>
                  <Button onClick={() => navigate('/subscription-packages')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    انضم الينا
                  </Button>
                </div>
              </nav>
            </div>}
        </div>
      </header>

      {/* Professional Hero Section */}
      <section id="home" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-slate-50/20 to-background">
        <PatternBackground opacity={0.03} size={500} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary-glow/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-primary/12 to-primary-glow/8 text-primary border-primary/25 px-6 py-3 text-base font-semibold shadow-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  الرائد في حلول الموارد البشرية
                </Badge>
                
                <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium">
                  إدارة الموارد البشرية بالذكاء الاصطناعي
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  حل شامل ومتطور لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي، يخدم أكثر من 1000+ شركة في السعودية
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={() => navigate('/subscription-packages')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                  ابدأ مجاناً الآن
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/demo-request')} className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Play className="w-5 h-5 ml-2" />
                  مشاهدة العرض التوضيحي
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>)}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img src="/lovable-uploads/8bafb621-e051-45f9-bbb2-928a25b816b7.png" alt="لوحة تحكم نظام بُعد HR - إدارة الموظفين الشامل" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <VisionSection />

      {/* About Sections */}
      <div id="about-sections">
        <TeamSection />
        <PartnersSection />
      </div>

        {/* Professional HR Solutions Section */}
      <section id="solutions" className="relative py-24 bg-gradient-to-br from-background via-slate-50/30 to-background overflow-hidden">
        {/* Enterprise-grade Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--primary-glow)/0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.03),transparent)]"></div>
        <PatternBackground opacity={0.02} size={600} />
        
        {/* Professional Accent Elements */}
        <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-primary/8 to-primary-glow/4 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 right-8 w-32 h-32 bg-gradient-to-br from-primary-glow/6 to-primary/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-60 delay-500"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Professional Section Header */}
          <div className="text-center space-y-8 mb-20">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary-glow/8 to-primary/10 rounded-xl blur-xl opacity-50"></div>
              <Badge className="relative bg-gradient-to-r from-primary/12 via-primary-glow/8 to-primary/12 text-primary border-primary/25 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
                <Target className="w-5 h-5 mr-2" />
                حلول المؤسسات المتقدمة
              </Badge>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-fade-in">
                <span className="block mb-2">منصة إدارة الموارد البشرية</span>
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                  المتكاملة والذكية
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                حلول شاملة ومتطورة لإدارة رأس المال البشري بكفاءة وأمان عالي
              </p>
              <p className="text-lg text-primary font-semibold bg-gradient-to-r from-primary/8 to-primary-glow/5 rounded-xl p-4 backdrop-blur-sm border border-primary/20">
                ✅ معتمد حكومياً • 🏢 +1000 منشأة تثق بنا • 🔒 أمان متقدم • ⚡ دعم 24/7
              </p>
            </div>

            {/* Professional Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {[{
              number: "1000+",
              label: "شركة تثق بنا",
              icon: Building2,
              color: "from-blue-500/10 to-blue-600/5"
            }, {
              number: "100K+",
              label: "موظف نديرهم",
              icon: Users,
              color: "from-green-500/10 to-green-600/5"
            }, {
              number: "99.9%",
              label: "وقت التشغيل",
              icon: Shield,
              color: "from-purple-500/10 to-purple-600/5"
            }, {
              number: "24/7",
              label: "دعم متواصل",
              icon: Heart,
              color: "from-red-500/10 to-red-600/5"
            }].map((stat, index) => {
              const IconComponent = stat.icon;
              return <div key={index} className="group">
                    <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>;
            })}
            </div>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return <div key={index} className="group cursor-pointer" onClick={() => navigate(feature.route)}>
                  <Card className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 bg-gradient-to-br from-background/95 to-muted/50 backdrop-blur-xl hover:scale-105">
                    {/* Premium Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute inset-[1px] bg-gradient-to-br from-background/95 to-muted/50 rounded-2xl"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                    
                    <div className="relative z-10">
                      <CardHeader className="pb-6 pt-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                              <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-xl">
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Badge className="bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-700 border-emerald-400/30 text-sm font-bold px-4 py-1">
                                ⚡ جاهز للمؤسسات
                              </Badge>
                              <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-700 border-blue-400/30 text-sm font-bold px-4 py-1 ml-2">
                                🤖 مدعوم بالذكاء الاصطناعي
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {feature.title}
                          </CardTitle>
                          <p className="text-lg font-semibold text-primary bg-primary/5 rounded-lg px-4 py-2">
                            {feature.subtitle}
                          </p>
                          <CardDescription className="text-base text-muted-foreground leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 space-y-6">
                        {/* Premium Image Container */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          
                          {/* Overlay Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                              <Play className="w-8 h-8 text-primary ml-1" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Marketing Content */}
                        <div className="bg-gradient-to-br from-primary/5 via-primary-glow/3 to-transparent rounded-2xl p-6 border border-primary/10">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Rocket className="w-3 h-3 text-white" />
                            </div>
                            <p className="text-base font-semibold text-foreground leading-relaxed">
                              {feature.marketingText}
                            </p>
                          </div>
                          
                          {/* ROI Highlight */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">✓</span>
                              </div>
                              <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">ضمان العائد على الاستثمار</span>
                            </div>
                            <p className="text-sm text-emerald-700 dark:text-emerald-200">
                              متوسط 340% عائد استثمار خلال 6 أشهر • 60% تقليل في تكاليف العمليات
                            </p>
                          </div>
                        </div>
                        
                        {/* Enhanced Features Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {feature.features.map((feat, featIndex) => <div key={featIndex} className="flex items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors duration-300">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-foreground">{feat}</span>
                            </div>)}
                        </div>
                        
                        {/* Premium CTA */}
                        <div className="flex gap-3 pt-4">
                          <Button className="flex-1 bg-gradient-to-r from-primary via-primary-glow to-primary hover:from-primary/90 hover:via-primary-glow/90 hover:to-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 group-hover:scale-105">
                            <span>استكشف الحل</span>
                            <ArrowLeft className="w-5 h-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                          <Button variant="outline" className="px-6 py-4 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-xl font-semibold transition-all duration-300">
                            <Video className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>;
          })}
          </div>

          {/* Bottom Call-to-Action */}
          <div className="text-center mt-24">
            <div className="bg-gradient-to-br from-primary/10 via-primary-glow/5 to-purple-600/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-primary" />
                  <Badge className="bg-gradient-to-r from-primary/20 to-primary-glow/20 text-primary border-primary/30 text-sm font-bold px-4 py-2">
                    رائد الصناعة 2024
                  </Badge>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  هل أنت مستعد لتحويل عمليات الموارد البشرية؟
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  انضم إلى آلاف الشركات التي تستخدم منصتنا لتحقيق نتائج استثنائية
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500">
                    ابدأ التجربة المجانية
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                    احجز عرض توضيحي
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 bg-muted/50">
        <PatternBackground opacity={0.08} size={320} />
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <Badge className="relative bg-gradient-to-r from-primary/15 to-primary/10 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
                <Lightbulb className="w-5 h-5 mr-2" />
                لماذا بُعد HR؟
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
                مزايا تجعلنا 
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                  الخيار الأول
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
            </div>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              نقدم حلول متطورة تساعد في تحسين الكفاءة والإنتاجية
              <br />
              <span className="text-primary font-semibold">مع ضمان الامتثال الكامل للوائح السعودية</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-muted/50">
        <PatternBackground opacity={0.015} size={160} />
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <Badge className="relative bg-gradient-to-r from-primary/15 to-primary/10 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                آراء العملاء
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
                ماذا يقول 
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                  عملاؤنا
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
            </div>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              شهادات حقيقية من عملائنا المميزين
              <br />
              <span className="text-primary font-semibold">في مختلف القطاعات والشركات السعودية</span>
            </p>
          </div>

          {/* Animated Testimonials Carousel */}
          <div className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="flex gap-6 animate-[scroll-right_40s_linear_infinite] mb-6">
              {testimonials.slice(0, 10).concat(testimonials.slice(0, 10)).map((testimonial, index) => <Card key={`row1-${index}`} className="flex-shrink-0 w-[350px] border-2 hover:border-primary/50 transition-all duration-300 bg-background/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    
                    <p className="text-muted-foreground italic leading-relaxed">"{testimonial.text}"</p>
                  </CardContent>
                </Card>)}
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex gap-6 animate-[scroll-left_35s_linear_infinite]">
              {testimonials.slice(10, 20).concat(testimonials.slice(10, 20)).map((testimonial, index) => <Card key={`row2-${index}`} className="flex-shrink-0 w-[350px] border-2 hover:border-primary/50 transition-all duration-300 bg-background/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    
                    <p className="text-muted-foreground italic leading-relaxed">"{testimonial.text}"</p>
                  </CardContent>
                </Card>)}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

        {/* AI Assistant Preview Section */}
        <AIAssistantPreview language="ar" onStartConversation={handleStartConversation} onQuestionClick={handleQuestionClick} />

      {/* Mobile App Download Section */}
      <section id="mobile-app" className="relative py-20 bg-background overflow-hidden">
        <PatternBackground opacity={0.02} size={140} />
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <Badge className="relative bg-gradient-to-r from-primary/15 to-primary/10 text-primary border-primary/30 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
                <Smartphone className="w-5 h-5 mr-2" />
                تطبيق محمول متقدم
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-in">
                حمّل تطبيق 
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-scale-in">
                  بُعد HR
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-glow mx-auto rounded-full opacity-80"></div>
            </div>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              استمتع بتجربة فريدة مع أقوى تطبيق إدارة موارد بشرية في السعودية
              <br />
              <span className="text-primary font-semibold">متاح على جميع المتاجر الرقمية</span>
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+50K</div>
                <div className="text-xs text-muted-foreground">تحميل نشط</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-xs text-muted-foreground">تقييم المستخدمين</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">دعم مستمر</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">تسجيل الحضور بـ GPS</h3>
                    <p className="text-muted-foreground text-sm">تتبع دقيق للحضور والانصراف باستخدام الموقع الجغرافي</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">إشعارات ذكية</h3>
                    <p className="text-muted-foreground text-sm">تنبيهات فورية ومخصصة لجميع المهام والتحديثات</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">إدارة الطلبات</h3>
                    <p className="text-muted-foreground text-sm">تقديم ومتابعة جميع الطلبات بسهولة ومن أي مكان</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">دورات تدريبية وتطويرية</h3>
                    <p className="text-muted-foreground text-sm">منصة تعلم متكاملة مع دورات تفاعلية ومتابعة التقدم</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">تقييم الأداء</h3>
                    <p className="text-muted-foreground text-sm">نظام تقييم ذكي مع تحليلات مفصلة وخطط التطوير</p>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="pt-6">
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">حمّل التطبيق الآن</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-normal">متاح على</div>
                        <div className="font-bold">App Store</div>
                      </div>
                      <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      </div>
                    </div>
                  </Button>
                  
                  <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-normal">احصل عليه من</div>
                        <div className="font-bold">Google Play</div>
                      </div>
                      <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      </div>
                    </div>
                  </Button>
                  
                  <Button size="lg" className="bg-foreground hover:bg-foreground/90 text-background font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-normal">متاح على</div>
                        <div className="font-bold">AppGallery</div>
                      </div>
                      <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Coming Soon Notice */}
              <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">قريباً جداً</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  التطبيق في المراحل النهائية من التطوير وسيكون متاحاً قريباً على جميع المنصات
                </p>
              </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-72 h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] border-4 border-gray-900 shadow-2xl shadow-gray-900/25 overflow-hidden">
                  {/* iPhone Notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 border-2 border-gray-800"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-gray-800 rounded-full z-40"></div>
                  
                  {/* Inner Border */}
                  <div className="absolute inset-1 rounded-[2.8rem] border border-primary/20 pointer-events-none z-30"></div>
                  
                  {/* App Content */}
                  <div className="px-4 py-8 relative z-20 h-full bg-gradient-to-br from-blue-50 via-white to-green-50">
                     {/* Background Pattern with BOUD Logo */}
                     <div className="absolute inset-0 opacity-[0.1] flex items-center justify-center">
                       <img src="/lovable-uploads/07038205-c0e2-4432-b52b-5efb7069cfd7.png" alt="Background Pattern" className="w-96 h-96 object-contain rotate-12 scale-150" />
                     </div>
                    
                    {/* Geometric Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.005]" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0.05px, transparent 0.05px),
                                       radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0.02px, transparent 0.02px)`,
                    backgroundSize: '100px 100px'
                  }}></div>
                    
                     {/* Gradient Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] via-transparent to-accent/[0.01] border border-gray-800"></div>
                     
                     {/* Background Logo Pattern */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-5">
                       <img src="/lovable-uploads/1fc0fdbf-df4b-474a-aa0f-2ea63f4e02d7.png" alt="Background Pattern" className="w-80 h-auto" />
                     </div>
                    
                    {/* App Header */}
                    <div className="text-center pt-4 relative z-10">
                      <div className="flex items-center justify-center -mb-8">
                        <img src="/lovable-uploads/98104f4d-712b-4381-98d5-35d5fa928839.png" alt="BOUD HR Logo" className="h-60 w-auto drop-shadow-lg -mt-24 relative z-20" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-800 mb-2 -mt-16 relative z-20">مرحباً بك</h3>
                      <h4 className="text-xl font-bold text-primary mb-4 relative z-20">نظام ذكي بلا حدود</h4>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-4 px-2 relative z-10">
                      <div className="space-y-3">
                        <label className="text-lg font-bold text-gray-800 block text-center">اسم المنشأة</label>
                        <div className="relative">
                          <input type="text" placeholder="اكتب اسم المنشأة" className="w-full h-14 text-lg border-2 border-gray-900 rounded-2xl focus:border-black bg-white/90 backdrop-blur-sm px-4 text-center font-bold text-gray-800 shadow-lg" readOnly />
                          {/* Inner border for input */}
                          <div className="absolute inset-0 rounded-2xl border border-white/50 pointer-events-none"></div>
                        </div>
                        <p className="text-lg text-primary text-center font-bold">EXAMPLE.BOUD.COM.SA</p>
                      </div>

                      <Button size="lg" onClick={() => navigate('/mobile-login')} className="w-full mt-4 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white text-xl py-4 font-black rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:shadow-primary/25 transition-all duration-300 border border-white/20">
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                        دخول
                      </Button>

                      <div className="flex items-center justify-center">
                        
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-full px-4 z-10">
                       <div className="flex flex-col items-center">
                         <img src="/lovable-uploads/3bb8cda9-761e-4268-8f44-76b21cecb2a4.png" alt="BOUD HR Logo" className="h-10 w-auto mb-3" />
                        <p className="text-sm text-gray-600 text-center font-bold mt-4">
                          © 2025 BOUD HR
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* iPhone Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full z-10"></div>
                </div>
                
                {/* Interactive Labels */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
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
      

      {/* BOUD HR Assistant with controlled state */}
      <BoudHRAssistant language="ar" isOpen={assistantOpen} onOpenChange={handleAssistantOpenChange} initialMessage={initialMessage} />
    </div>;
};
export default BoudHRLandingPage;