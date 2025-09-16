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
import buodLogo from '@/assets/buod-logo-white.png';

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
    color: "text-[#008C6A]",
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
    color: "text-[#008C6A]",
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

  return <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 sticky top-0">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between h-20">
            {/* Professional Logo Section */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-12 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
                />
              </div>
            </div>

            {/* Center Section - Title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Building2 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  منصة بُعد للموارد البشرية
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  حلول متطورة وذكية
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <a href="#home" className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors">الرئيسية</a>
              
              <a href="#about" className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors">عن بُعد</a>
              
              <Button variant="ghost" onClick={() => navigate('/interactive-tour')} className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                جولة تفاعلية
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors">
                    مركز المعرفة
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 z-50">
                  <DropdownMenuItem onClick={() => navigate('/tutorials')} className="text-white hover:bg-[#008C6A]/20">
                    الدروس التعليمية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/blog')} className="text-white hover:bg-[#008C6A]/20">
                    مدونة بُعد
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/green-papers')} className="text-white hover:bg-[#008C6A]/20">
                    الأوراق الخضراء
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                أدوات الموارد البشرية
              </Button>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors">
                اربح مع بُعد
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors flex items-center gap-2">
                📅 احجز اجتماع
              </Button>

              <Button variant="ghost" onClick={() => navigate('/careers')} className="text-sm font-medium text-white hover:text-[#008C6A] transition-colors flex items-center gap-2">
                👥 انضم الى فريقنا
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-medium text-white flex items-center gap-1 hover:text-[#008C6A] transition-colors">
                  تواصل معنا <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gray-900 border border-[#008C6A]/30 shadow-lg z-50">
                  {menuItems.contact.map((item, index) => <DropdownMenuItem key={index} asChild>
                    <button onClick={() => item.href.startsWith('#') ? document.getElementById(item.href.substring(1))?.scrollIntoView({
                      behavior: 'smooth'
                    }) : navigate(item.href)} className="w-full text-right text-white hover:bg-[#008C6A]/20 transition-colors flex items-center gap-2 p-3">
                      <MessageCircle className="w-4 h-4" />
                      {item.name}
                    </button>
                  </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && <div className="md:hidden py-4 border-t border-[#008C6A]/30">
              <div className="space-y-2">
                {menuItems.services.map((item, index) => <a key={index} href={item.href} className="block px-4 py-2 text-sm text-white hover:text-[#008C6A] transition-colors">
                    {item.name}
                  </a>)}
                <a href="#about" className="block px-4 py-2 text-sm text-white hover:text-[#008C6A] transition-colors">عن بُعد</a>
                <a href="#clients" className="block px-4 py-2 text-sm text-white hover:text-[#008C6A] transition-colors">عملاؤنا</a>
                <a href="#contact" className="block px-4 py-2 text-sm text-white hover:text-[#008C6A] transition-colors">تواصل معنا</a>
              </div>
            </div>}
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      {/* Professional Hero Section */}
      <section id="home" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#008C6A]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-[#008C6A]/12 via-[#008C6A]/8 to-[#008C6A]/12 text-[#008C6A] border-[#008C6A]/25 px-6 py-3 text-base font-semibold shadow-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  الرائد في حلول الموارد البشرية
                </Badge>
                
                <h2 className="text-2xl lg:text-3xl text-gray-300 font-medium">
                  إدارة الموارد البشرية بالذكاء الاصطناعي
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  حل شامل ومتطور لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي، يخدم أكثر من 1000+ شركة في السعودية
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={() => navigate('/subscription-packages')} className="bg-gradient-to-r from-[#008C6A] to-[#008C6A]/80 hover:from-[#008C6A]/90 hover:to-[#008C6A] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                  ابدأ مجاناً الآن
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/demo-request')} className="border-2 border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                  <Play className="w-5 h-5 ml-2" />
                  مشاهدة العرض التوضيحي
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#008C6A]">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>)}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-gray-800 bg-gray-900/60 backdrop-blur-xl">
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
      <section id="solutions" className="relative py-24 overflow-hidden">
        <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-[#008C6A]/8 to-[#008C6A]/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-8 w-32 h-32 bg-gradient-to-br from-[#008C6A]/6 to-[#008C6A]/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Professional Section Header */}
          <div className="text-center space-y-8 mb-20">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#008C6A]/10 via-[#008C6A]/8 to-[#008C6A]/10 rounded-xl blur-xl opacity-50"></div>
              <Badge className="relative bg-gradient-to-r from-[#008C6A]/12 via-[#008C6A]/8 to-[#008C6A]/12 text-[#008C6A] border-[#008C6A]/25 px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-lg">
                <Target className="w-5 h-5 mr-2" />
                حلول المؤسسات المتقدمة
              </Badge>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight animate-fade-in">
                <span className="block mb-2">منصة إدارة الموارد البشرية</span>
                <span className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] bg-clip-text text-transparent animate-scale-in">
                  المتكاملة والذكية
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-[#008C6A] to-[#009F87] mx-auto rounded-full opacity-80"></div>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium">
                حلول شاملة ومتطورة لإدارة رأس المال البشري بكفاءة وأمان عالي
              </p>
              <p className="text-lg text-[#008C6A] font-semibold bg-gradient-to-r from-[#008C6A]/8 to-[#008C6A]/5 rounded-xl p-4 backdrop-blur-sm border border-[#008C6A]/20">
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
                      <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-gray-800/50 hover:border-[#008C6A]/30 transition-all duration-300 hover:shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-[#008C6A] mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    </div>;
              })}
            </div>
          </div>

          {/* Enterprise Solutions Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {features.map((feature, index) => <Card key={index} className="group relative bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-500 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#008C6A]/20 rounded-xl border border-[#008C6A]/30 group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-white group-hover:text-[#008C6A] transition-colors duration-300 mb-2">
                      {feature.title}
                    </CardTitle>
                    <p className="text-[#008C6A] font-semibold text-sm">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-[#008C6A]/20">
                  <p className="text-sm text-gray-400 font-medium">
                    {feature.marketingText}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {feature.features.map((subFeature, subIndex) => <div key={subIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#008C6A] animate-pulse" />
                    <span className="text-sm text-gray-300">{subFeature}</span>
                  </div>)}
                </div>

                <Button 
                  onClick={() => navigate(feature.route)}
                  className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <span>استكشف الحل</span>
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>)}
          </div>
        </div>
      </section>

      {/* Professional Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              لماذا نحن الخيار الأمثل؟
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              مزايا تنافسية تضعنا في المقدمة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <Card key={index} className="text-center group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="p-4 bg-[#008C6A]/20 rounded-full w-20 h-20 mx-auto mb-6 group-hover:bg-[#008C6A]/30 transition-all duration-300">
                    <benefit.icon className="h-12 w-12 text-[#008C6A] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-[#008C6A] mb-4 animate-pulse">
                    {benefit.stat}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#008C6A] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Professional Features Tabs */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              استكشف منصة بُعد التفاعلية
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              تجربة شاملة لجميع احتياجاتك في إدارة الموارد البشرية
            </p>
          </div>

          <Tabs defaultValue="employees" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 rounded-xl p-2">
              <TabsTrigger value="employees" className="text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white transition-all duration-300">
                <Users className="w-4 h-4 mr-2" />
                الموظفون
              </TabsTrigger>
              <TabsTrigger value="payroll" className="text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white transition-all duration-300">
                <DollarSign className="w-4 h-4 mr-2" />
                الرواتب
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white transition-all duration-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                الأداء
              </TabsTrigger>
              <TabsTrigger value="training" className="text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white transition-all duration-300">
                <GraduationCap className="w-4 h-4 mr-2" />
                التدريب
              </TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="mt-8">
              <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Users className="h-8 w-8 text-[#008C6A]" />
                    إدارة الموظفين الشاملة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        نظام متكامل لإدارة دورة حياة الموظف الكاملة من التوظيف حتى انتهاء الخدمة، مع أتمتة جميع العمليات وتبسيط الإجراءات.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {["قاعدة بيانات موحدة", "ملفات رقمية", "تتبع الحضور", "إدارة الإجازات", "التقييمات", "التطوير المهني"].map((feature, index) => <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#008C6A]" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>)}
                      </div>
                    </div>
                    <div className="relative">
                      <img src={businessTeam} alt="فريق العمل" className="w-full rounded-xl shadow-lg border border-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-8">
              <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-[#008C6A]" />
                    نظام الرواتب الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        حل متطور لإدارة الرواتب والمزايا مع ضمان الامتثال لقوانين العمل والتأمينات الاجتماعية السعودية.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {["حساب تلقائي", "تكامل GOSI", "كشوف مفصلة", "تقارير ضريبية", "حماية الأجور", "أرشفة إلكترونية"].map((feature, index) => <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#008C6A]" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>)}
                      </div>
                    </div>
                    <div className="relative">
                      <img src={hrAutomation} alt="أتمتة الموارد البشرية" className="w-full rounded-xl shadow-lg border border-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-8">
              <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <BarChart3 className="h-8 w-8 text-[#008C6A]" />
                    تقييم الأداء المتقدم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        منصة ذكية لتقييم وتطوير أداء الموظفين مع مؤشرات قياس دقيقة وخطط تطوير مخصصة.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {["مؤشرات ذكية", "تقييم 360 درجة", "خطط التطوير", "تتبع الأهداف", "تقارير تحليلية", "ردود فعل فورية"].map((feature, index) => <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#008C6A]" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>)}
                      </div>
                    </div>
                    <div className="relative">
                      <img src={codingScreen} alt="تحليل الأداء" className="w-full rounded-xl shadow-lg border border-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="mt-8">
              <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-[#008C6A]" />
                    منصة التدريب الإلكتروني
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed">
                        حل شامل للتدريب والتطوير المهني مع مكتبة واسعة من الدورات التفاعلية ونظام شهادات معتمد.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {["دورات تفاعلية", "شهادات معتمدة", "تتبع التقدم", "اختبارات ذكية", "مسارات تعلم", "تقييم المهارات"].map((feature, index) => <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#008C6A]" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>)}
                      </div>
                    </div>
                    <div className="relative">
                      <img src={teamCollaboration} alt="التدريب الجماعي" className="w-full rounded-xl shadow-lg border border-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Professional Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              شهادات حقيقية من عملائنا الكرام في جميع أنحاء المملكة
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 9).map((testimonial, index) => <Card key={index} className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#008C6A]/20 rounded-full flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-[#008C6A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                    <p className="text-xs text-[#008C6A]">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>)}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/testimonials')}
              className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              عرض المزيد من الشهادات
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Government Integration Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-[#008C6A]/12 via-[#008C6A]/8 to-[#008C6A]/12 text-[#008C6A] border-[#008C6A]/25 px-6 py-3 text-base font-semibold shadow-lg mb-6">
              <Shield className="w-5 h-5 mr-2" />
              تكامل حكومي معتمد
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              اتصال مباشر مع الأنظمة الحكومية
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              تكامل فوري مع جميع الأنظمة الحكومية لضمان الامتثال والدقة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group text-center bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img src={ecssPoral} alt="منصة أبشر" className="w-full h-32 object-cover rounded-lg border border-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#008C6A] transition-colors duration-300">
                  منصة أبشر الموحدة
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  ربط مباشر مع منصة أبشر لاستخراج البيانات الشخصية وتحديث المعلومات تلقائياً
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img src={eisPortal} alt="التأمينات الاجتماعية" className="w-full h-32 object-cover rounded-lg border border-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#008C6A] transition-colors duration-300">
                  التأمينات الاجتماعية
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  تكامل كامل مع نظام GOSI لحساب الاشتراكات والمساهمات تلقائياً
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img src={npcsPortal} alt="قوى العمل" className="w-full h-32 object-cover rounded-lg border border-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#008C6A] transition-colors duration-300">
                  وزارة الموارد البشرية
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  اتصال مع منصة قوى لإدارة تراخيص العمل والوافدين ونظام النطاقات
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-[#008C6A]/12 via-[#008C6A]/8 to-[#008C6A]/12 text-[#008C6A] border-[#008C6A]/25 px-6 py-3 text-base font-semibold shadow-lg mb-6">
              <Brain className="w-5 h-5 mr-2" />
              الذكاء الاصطناعي
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              مساعدك الذكي في الموارد البشرية
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              استفد من قوة الذكاء الاصطناعي في اتخاذ قرارات أفضل وأسرع
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AIAssistantPreview 
              onStartConversation={handleStartConversation}
              onQuestionClick={handleQuestionClick}
            />
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-[#008C6A]/12 via-[#008C6A]/8 to-[#008C6A]/12 text-[#008C6A] border-[#008C6A]/25 px-6 py-3 text-base font-semibold shadow-lg mb-8">
              <Rocket className="w-5 h-5 mr-2" />
              ابدأ رحلتك الرقمية
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              جاهز لتحويل إدارة الموارد البشرية في منشأتك؟
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl max-w-3xl mx-auto">
              انضم إلى أكثر من 1000 شركة تثق في حلولنا المتطورة واحصل على تجربة مجانية لمدة 30 يوماً
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                className="group px-12 py-6 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-2xl shadow-[#008C6A]/30 hover:shadow-[#008C6A]/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden text-lg font-semibold"
                onClick={() => navigate('/subscription-packages')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">ابدأ تجربتك المجانية</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 border-2 border-[#008C6A]/50 hover:border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A]/10 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-black/20 backdrop-blur-sm text-lg font-semibold"
                onClick={() => navigate('/demo-request')}
              >
                <Video className="mr-3 h-6 w-6" />
                احجز عرض توضيحي
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-6 w-6 text-[#008C6A]" />
                <span className="text-white font-medium">تجربة مجانية 30 يوم</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-6 w-6 text-[#008C6A]" />
                <span className="text-white font-medium">دعم فني على مدار الساعة</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <CheckCircle className="h-6 w-6 text-[#008C6A]" />
                <span className="text-white font-medium">تدريب وتأهيل مجاني</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-[#008C6A]/30 py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-12 w-auto filter brightness-200 contrast-125" 
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة رائدة في حلول الموارد البشرية، نساعد الشركات السعودية على التحول الرقمي وتحقيق أهداف رؤية 2030 من خلال حلول تقنية متطورة ومبتكرة.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-[#008C6A]/20 rounded-full flex items-center justify-center hover:bg-[#008C6A]/30 transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5 text-[#008C6A]" />
                </div>
                <div className="w-10 h-10 bg-[#008C6A]/20 rounded-full flex items-center justify-center hover:bg-[#008C6A]/30 transition-colors cursor-pointer">
                  <Linkedin className="h-5 w-5 text-[#008C6A]" />
                </div>
                <div className="w-10 h-10 bg-[#008C6A]/20 rounded-full flex items-center justify-center hover:bg-[#008C6A]/30 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5 text-[#008C6A]" />
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">خدماتنا الرئيسية</h4>
              <ul className="space-y-3">
                {menuItems.services.map((service, index) => <li key={index}>
                    <a href={service.href} className="text-gray-400 hover:text-[#008C6A] transition-colors flex items-center gap-2">
                      <ArrowLeft className="h-3 w-3 rotate-180" />
                      {service.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">الدعم والمساعدة</h4>
              <ul className="space-y-3">
                {[{
                name: "مركز المساعدة",
                href: "/help-center"
              }, {
                name: "الدعم الفني",
                href: "/chat-messaging"
              }, {
                name: "دليل المستخدم",
                href: "/user-guide"
              }, {
                name: "أسئلة شائعة",
                href: "/faq"
              }, {
                name: "حالة النظام",
                href: "/system-status"
              }].map((item, index) => <li key={index}>
                    <a href={item.href} className="text-gray-400 hover:text-[#008C6A] transition-colors flex items-center gap-2">
                      <ArrowLeft className="h-3 w-3 rotate-180" />
                      {item.name}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">هاتف المبيعات</p>
                    <p className="text-white font-medium">+966 11 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">الدعم الفني</p>
                    <p className="text-white font-medium">+966 11 765 4321</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">البريد الإلكتروني</p>
                    <p className="text-white font-medium">info@boud-hr.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">العنوان</p>
                    <p className="text-white font-medium">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#008C6A]/20 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 بُعد للموارد البشرية. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[#008C6A]/20 text-[#008C6A] border-[#008C6A]/30">
                  <Shield className="h-3 w-3 mr-1" />
                  ISO 27001
                </Badge>
                <Badge className="bg-[#008C6A]/20 text-[#008C6A] border-[#008C6A]/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  معتمد حكومياً
                </Badge>
              </div>
            </div>
            <div className="flex space-x-6 space-x-reverse">
              <a href="/privacy-policy" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">سياسة الخصوصية</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">شروط الاستخدام</a>
              <a href="/cookies-policy" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">سياسة الكوكيز</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      {assistantOpen && (
        <BoudHRAssistant 
          onOpenChange={handleAssistantOpenChange}
          initialMessage={initialMessage}
        />
      )}
    </div>;
};

export default BoudHRLandingPage;