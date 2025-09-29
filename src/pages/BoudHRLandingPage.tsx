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
import boudWhiteLogo from '@/assets/boud-white-logo.png';
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
  const [currentLanguage, setCurrentLanguage] = useState<'ar' | 'en'>('ar');
  
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setCurrentLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };
  
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
      href: "/contact"
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
  return <div className="min-h-screen bg-black font-arabic">
      {/* Professional Interactive Header - Multi-Language Support */}
      <header className={`relative z-10 bg-gradient-to-r from-gray-950 via-black to-gray-950 backdrop-blur-xl border-b border-[#008C6A]/40 shadow-2xl shadow-[#008C6A]/30 sticky top-0 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/5 via-[#009F87]/3 to-[#00694F]/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        </div>
        
        {/* Main Header Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            
            {/* Right Section (Arabic) / Left Section (English) - Logo & Brand */}
            <div className={`flex items-center gap-4 ${currentLanguage === 'ar' ? 'order-1' : 'order-1'}`}>
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer">
                <BoudLogo variant="full" size="header" className="h-10 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl" />
              </div>
              <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-[#008C6A]/50 to-transparent mx-2"></div>
              <img src={boudWhiteLogo} alt="شعار بُعد" className="hidden lg:block h-16 w-auto hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Center Section - Navigation Menu */}
            <nav className={`hidden lg:flex items-center space-x-8 ${currentLanguage === 'ar' ? 'space-x-reverse order-2' : 'order-2'}`}>
              <a href="#home" className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10">
                {currentLanguage === 'ar' ? 'الرئيسية' : 'Home'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008C6A] group-hover:w-full transition-all duration-300"></div>
              </a>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10">
                    {currentLanguage === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
                    <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 bg-gray-900/95 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl">
                  <DropdownMenuItem onClick={() => navigate('/tutorials')} className="text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الدروس التعليمية' : 'Tutorials'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/green-papers')} className="text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الأوراق الخضراء' : 'White Papers'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/job-descriptions')} className="text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الأوصاف الوظيفية' : 'Job Descriptions'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                {currentLanguage === 'ar' ? 'أدوات الموارد البشرية' : 'HR Tools'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008C6A] group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10">
                {currentLanguage === 'ar' ? 'اربح مع بُعد' : 'Earn with Boad'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008C6A] group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10 flex items-center gap-2">
                📅 {currentLanguage === 'ar' ? 'احجز اجتماع' : 'Schedule Meeting'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008C6A] group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/careers')} className="relative group text-white hover:text-[#008C6A] text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-[#008C6A]/10 flex items-center gap-2">
                👥 {currentLanguage === 'ar' ? 'انضم الى فريقنا' : 'Join Our Team'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#008C6A] group-hover:w-full transition-all duration-300"></div>
              </Button>
            </nav>

            {/* Left Section (Arabic) / Right Section (English) - Actions */}
            <div className={`flex items-center gap-3 ${currentLanguage === 'ar' ? 'order-3' : 'order-3'}`}>
              
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="group relative text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg border border-[#008C6A]/30 hover:border-[#008C6A]/60 hover:scale-105"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'ar' ? 'English' : 'العربية'}
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/10 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              {/* Professional Login Section */}
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group relative flex items-center gap-2 bg-gradient-to-r from-[#008C6A]/20 via-[#008C6A]/10 to-[#008C6A]/20 backdrop-blur-sm px-6 py-2.5 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#008C6A]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/30">
                      <User className="w-4 h-4 text-white group-hover:text-[#008C6A] transition-colors duration-300" />
                      <span className="text-sm text-white font-semibold tracking-wide group-hover:text-[#008C6A] transition-colors duration-300">
                        {currentLanguage === 'ar' ? 'دخول' : 'Login'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-white group-hover:text-[#008C6A] group-hover:rotate-180 transition-all duration-300" />
                      
                      {/* Premium Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-gray-900/95 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl rounded-xl">
                    <DropdownMenuItem onClick={() => navigate('/admin-login')} className="w-full text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300 flex items-center gap-3 p-4 cursor-pointer rounded-lg mx-1 my-1">
                      <Building2 className="w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{currentLanguage === 'ar' ? 'مدير النظام' : 'System Admin'}</span>
                        <span className="text-xs opacity-70">{currentLanguage === 'ar' ? 'إدارة النظام الكاملة' : 'Full system management'}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="w-full text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300 flex items-center gap-3 p-4 cursor-pointer rounded-lg mx-1 my-1">
                      <Building className="w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{currentLanguage === 'ar' ? 'لوحة تحكم المنشأة' : 'Company Dashboard'}</span>
                        <span className="text-xs opacity-70">{currentLanguage === 'ar' ? 'إدارة الشركة والموظفين' : 'Manage company & employees'}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/employee-login')} className="w-full text-white hover:bg-[#008C6A]/20 hover:text-[#008C6A] transition-all duration-300 flex items-center gap-3 p-4 cursor-pointer rounded-lg mx-1 my-1">
                      <User className="w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{currentLanguage === 'ar' ? 'لوحة تحكم الموظف' : 'Employee Dashboard'}</span>
                        <span className="text-xs opacity-70">{currentLanguage === 'ar' ? 'الخدمة الذاتية للموظفين' : 'Employee self-service'}</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-2 rounded-lg border border-[#008C6A]/30 hover:border-[#008C6A]/60"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-[#008C6A]/30 shadow-2xl rounded-b-xl animate-fade-in">
              <nav className="flex flex-col p-4 space-y-2">
                <a href="#home" className="text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
                <Button onClick={() => navigate('/tutorials')} variant="ghost" className="justify-start text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
                </Button>
                <Button onClick={() => navigate('/hr-tools')} variant="ghost" className="justify-start text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'أدوات الموارد البشرية' : 'HR Tools'}
                </Button>
                <Button onClick={() => navigate('/earn-with-boad')} variant="ghost" className="justify-start text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'اربح مع بُعد' : 'Earn with Boad'}
                </Button>
                <Button onClick={() => navigate('/schedule-meeting')} variant="ghost" className="justify-start text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'احجز اجتماع' : 'Schedule Meeting'}
                </Button>
                <Button onClick={() => navigate('/careers')} variant="ghost" className="justify-start text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'انضم الى فريقنا' : 'Join Our Team'}
                </Button>
              </nav>
            </div>
          )}

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>
    </div>;
};
export default BoudHRLandingPage;