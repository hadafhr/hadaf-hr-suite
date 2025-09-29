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
      {/* Professional Interactive Header - Applied HR Tools Design */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 sticky top-0">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Language Toggle */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg border border-[#008C6A]/30 hover:border-[#008C6A]/60"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'ar' ? 'العربية' : 'English'}
                </span>
              </Button>
            </div>
            
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="hover:scale-105 transition-all duration-300">
                <BoudLogo variant="full" size="header" className="h-12 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" />
              </div>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <img src={boudWhiteLogo} alt="شعار بُعد" className="h-20 w-auto hover:scale-105 transition-transform duration-300 ml-6" />
              <a href="#home" className="text-white hover:text-gray-300 text-sm font-medium transition-colors">الرئيسية</a>
              
              
              

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-gray-300 text-sm font-medium transition-colors">
                    مركز المعرفة
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-black border border-gray-700">
                  <DropdownMenuItem onClick={() => navigate('/tutorials')} className="text-white hover:bg-gray-900">
                    الدروس التعليمية
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/green-papers')} className="text-white hover:bg-gray-900">
                    الأوراق الخضراء
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/job-descriptions')} className="text-white hover:bg-gray-900">
                    الأوصاف الوظيفية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-white hover:text-gray-300 text-sm font-medium transition-colors flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                أدوات الموارد البشرية
              </Button>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="text-white hover:text-gray-300 text-sm font-medium transition-colors">
                اربح مع بُعد
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="text-white hover:text-gray-300 text-sm font-medium transition-colors flex items-center gap-2">
                📅 احجز اجتماع
              </Button>

              <Button variant="ghost" onClick={() => navigate('/careers')} className="text-white hover:text-gray-300 text-sm font-medium transition-colors flex items-center gap-2">
                👥 انضم الى فريقنا
              </Button>

              
            </nav>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex items-center">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-[#008C6A]/10 via-[#008C6A]/5 to-[#008C6A]/10 backdrop-blur-lg rounded-lg border border-[#008C6A]/40 shadow-lg shadow-[#008C6A]/20 p-2 hover:border-[#008C6A]/60 transition-all duration-300 mr-4">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Login & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    الوصول
                  </span>
                  
                  {/* Login Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20">
                        <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                          دخول
                        </span>
                        <ChevronDown className="w-3 h-3 text-white group-hover:text-[#008C6A] transition-colors duration-300" />
                        
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-black border border-gray-700 shadow-lg">
                      <DropdownMenuItem onClick={() => navigate('/admin-login')} className="w-full text-right text-white hover:bg-gray-900 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                        <Building2 className="w-4 h-4" />
                         مدير النظام
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="w-full text-right text-white hover:bg-gray-900 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                        <Building className="w-4 h-4" />
                        🏢 لوحة تحكم المنشأة
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/employee-login')} className="w-full text-right text-white hover:bg-gray-900 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                        <User className="w-4 h-4" />
                        🔘 لوحة تحكم الموظف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg mx-[70px]">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">نظام شامل</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">محدّث</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && <div className="lg:hidden py-4 border-t border-[#008C6A]/30 bg-gradient-to-r from-black/90 to-gray-900/90 backdrop-blur-xl rounded-b-2xl">
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-white hover:text-[#008C6A] text-sm font-medium py-2 px-4 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  الرئيسية
                </a>
                <button onClick={() => {
              navigate('/interactive-tour');
              setIsMobileMenuOpen(false);
            }} className="text-white hover:text-[#008C6A] text-sm font-medium text-right flex items-center gap-2 py-2 px-4 transition-colors">
                  <Play className="w-4 h-4" />
                  جولة تفاعلية
                </button>
                <details className="group">
                  <summary className="text-white hover:text-[#008C6A] text-sm font-medium cursor-pointer list-none py-2 px-4">
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
                }} className="block text-sm text-gray-300 hover:text-[#008C6A] w-full text-right py-1 px-4 transition-colors">
                        {item.name}
                      </button>)}
                  </div>
                </details>
                <details className="group">
                  <summary className="text-white hover:text-[#008C6A] text-sm font-medium cursor-pointer list-none py-2 px-4">
                    تواصل معنا <ChevronDown className="w-4 h-4 inline mr-1 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mr-4 mt-2 space-y-2">
                    {menuItems.contact.map((item, index) => <a key={index} href={item.href} className="block text-sm text-gray-300 hover:text-[#008C6A] py-1 px-4 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </a>)}
                  </div>
                </details>
                <div className="flex flex-col space-y-2 pt-4 px-4">
                  <Button variant="ghost" onClick={() => navigate('/admin-login')} className="text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10">
                    <Building2 className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الإدارة
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/company-dashboard')} className="text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10">
                    <Building className="w-4 h-4 ml-2" />
                    🏢 لوحة تحكم المنشأة
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/employee-login')} className="text-white hover:text-[#008C6A] hover:bg-[#008C6A]/10">
                    <User className="w-4 h-4 ml-2" />
                    🔘 لوحة تحكم الموظف
                  </Button>
                  <Button onClick={() => navigate('/subscription-packages')} className="bg-[#008C6A] hover:bg-[#008C6A]/90 text-white">
                    انضم الينا
                  </Button>
                </div>
              </nav>
            </div>}

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>
    </div>;
};
export default BoudHRLandingPage;