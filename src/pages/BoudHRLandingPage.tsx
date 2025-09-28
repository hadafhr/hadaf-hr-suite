import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { Breadcrumb } from '@/components/Breadcrumb';
import buodLogo from '@/assets/buod-logo-white.png';

const BoudHRLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir={isArabic ? 'rtl' : 'ltr'}>
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
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </div>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'حلول الموارد البشرية المتقدمة' : 'Advanced HR Solutions'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'منصة شاملة لإدارة الموارد البشرية' : 'Comprehensive HR Management Platform'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] shadow-lg shadow-[#008C6A]/40 group-hover:shadow-[#008C6A]/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? '1000+ شركة' : '1000+ Companies'}</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'محدّث' : 'Updated'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0 px-4 py-8">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Professional Hero Section */}
        <section id="home" className="relative py-32 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-90"></div>
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
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
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
              return (
                <div key={index} className="group">
                    <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg`}>
                      <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-xl mb-2">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </div>
              );
            })}
            </div>
          </div>

          {/* Professional Features Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group cursor-pointer" onClick={() => navigate(feature.route)}>
                  <div className="relative">
                    {/* Gradient Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute inset-[1px] bg-gradient-to-br from-background/95 to-muted/50 rounded-2xl"></div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
                    
                    <Card className="relative bg-transparent border-border/40 hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5">
                      <CardHeader className="pb-6 pt-8">
                        <div className="flex items-center space-x-6 space-x-reverse">
                          {/* Enhanced Icon */}
                          <div className="relative group/icon">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-xl">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                              <CardTitle className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {feature.title}
                              </CardTitle>
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/30">
                                {feature.subtitle}
                              </Badge>
                            </div>
                            <CardDescription className="text-muted-foreground leading-relaxed">
                              {feature.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        {/* Enhanced Image */}
                        <div className="relative mb-6 group/image">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-border/30">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          <img src={feature.image} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
                              <ArrowLeft className="w-6 h-6 text-primary rotate-180" />
                            </div>
                          </div>
                        </div>
                        </div>
                        
                        {/* Enhanced Features List */}
                        <div className="bg-gradient-to-br from-primary/5 via-primary-glow/3 to-transparent rounded-2xl p-6 border border-primary/10">
                          <div className="grid grid-cols-2 gap-3">
                            {feature.features.map((featureItem, idx) => (
                              <div key={idx} className="flex items-center space-x-3 space-x-reverse text-sm">
                                <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-muted-foreground font-medium">{featureItem}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Marketing Text */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30 rounded-xl p-4 border border-emerald-200/30 dark:border-emerald-800/30 mt-4">
                            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed">
                              {feature.marketingText}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
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
              <Badge className="relative bg-gradient-to-r from-primary/12 to-primary-glow/8 text-primary border-primary/30 px-6 py-3 text-base font-semibold shadow-lg">
                <Zap className="w-5 h-5 mr-2" />
                فوائد متقدمة ومميزة
              </Badge>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              لماذا نحن <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">الخيار الأمثل</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              مزايا حقيقية وقابلة للقياس تحقق النتائج وتوفر عليك الوقت والمال
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="relative bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
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
              <Badge className="relative bg-gradient-to-r from-primary/12 to-primary-glow/8 text-primary border-primary/30 px-6 py-3 text-base font-semibold shadow-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                آراء عملائنا الكرام
              </Badge>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              ماذا يقول <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">عملاؤنا</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              شهادات حقيقية من شركات رائدة تثق في حلولنا وتحقق نتائج استثنائية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <Card key={index} className="relative bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary-glow/10">
                      <img 
                        src={`https://images.unsplash.com/${testimonial.image}?auto=format&fit=crop&w=64&q=80`} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 space-x-reverse mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-glow to-primary overflow-hidden">
        {/* Professional Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.05),transparent)]"></div>
        
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 mb-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <Badge className="relative bg-white/10 text-white border-white/30 px-6 py-3 text-base font-semibold shadow-lg backdrop-blur-sm">
                <Rocket className="w-5 h-5 mr-2" />
                ابدأ رحلتك الرقمية اليوم
              </Badge>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="block mb-2">هل أنت مستعد للتحول الرقمي؟</span>
                <span className="text-white/90">
                  انضم لآلاف الشركات الناجحة
                </span>
              </h2>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                احصل على عرض مخصص مجاناً واكتشف كيف يمكن لحلولنا تحسين كفاءة إدارة الموارد البشرية في شركتك
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
              <Button 
                size="lg" 
                onClick={() => navigate('/subscription-packages')}
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2 rotate-180" />
                ابدأ التجربة المجانية
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/demo-request')}
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
              >
                <Play className="w-5 h-5 ml-2" />
                احجز عرض تجريبي
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto pt-12">
              {[
                { icon: Building2, text: "1000+ شركة" },
                { icon: Users, text: "100K+ موظف" },
                { icon: Shield, text: "99.9% أمان" },
                { icon: Clock, text: "دعم 24/7" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm mb-2">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-white/80 font-medium">{item.text}</div>
                  </div>
                );
              })}
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
                <BoudLogo variant="full" size="header" className="h-10 w-auto max-w-[100px] object-contain filter brightness-0 invert" />
              </div>
              <p className="text-background/70 leading-relaxed">
                الرائد في حلول الموارد البشرية المدعومة بالذكاء الاصطناعي في المملكة العربية السعودية
              </p>
              <div className="flex items-center space-x-4 space-x-reverse pt-4">
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
      </main>
      
      {/* BOUD HR Assistant with controlled state */}
      <BoudHRAssistant language="ar" isOpen={assistantOpen} onOpenChange={handleAssistantOpenChange} initialMessage={initialMessage} />
    </div>
  );
};

export default BoudHRLandingPage;