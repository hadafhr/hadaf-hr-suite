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
                    <a href={item.href} className="cursor-pointer text-white hover:bg-[#008C6A]/20">
                      {item.name}
                    </a>
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

      {/* Hero Section with Enhanced Design */}
      <section id="home" className="relative overflow-hidden pt-20 pb-32">
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Main Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-right space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="px-4 py-2 bg-[#008C6A]/20 text-[#008C6A] border border-[#008C6A]/30 hover:bg-[#008C6A]/30 transition-all duration-300 animate-pulse">
                  ✨ منصة الموارد البشرية الأولى في المملكة
                </Badge>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] bg-clip-text text-transparent animate-pulse">
                    بُعد
                  </span>
                  <br />
                  <span className="text-white">
                    للموارد البشرية
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
                  منصة شاملة ومتطورة لإدارة الموارد البشرية تجمع 22 نظاماً فرعياً في حل واحد متكامل يدعم التحول الرقمي ويحقق رؤية المملكة 2030
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="group px-8 py-4 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-2xl shadow-[#008C6A]/30 hover:shadow-[#008C6A]/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  onClick={() => navigate('/hr-app')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                  <Users className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">ابدأ الآن مجاناً</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 border-2 border-[#008C6A]/50 hover:border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A]/10 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-black/20 backdrop-blur-sm"
                  onClick={() => navigate('/interactive-tour')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  جولة تفاعلية
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center pt-8">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-[#008C6A]/20">
                  <Shield className="h-5 w-5 text-green-400 animate-pulse" />
                  <span className="text-sm text-gray-300">معتمد ومرخص</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-[#008C6A]/20">
                  <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />
                  <span className="text-sm text-gray-300">متوافق مع القوانين السعودية</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-[#008C6A]/20">
                  <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="text-sm text-gray-300">تقييم 5 نجوم</span>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-[#008C6A]/20 to-black backdrop-blur-sm border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
                <img 
                  src={heroLaptop} 
                  alt="بُعد للموارد البشرية" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#008C6A]/30 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#008C6A]/20 rounded-full blur-xl animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#008C6A] rounded-full flex justify-center shadow-lg shadow-[#008C6A]/30">
            <div className="w-1 h-3 bg-[#008C6A] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-[#008C6A] mb-2 animate-pulse">
                    {stat.number}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="px-4 py-2 bg-[#008C6A]/20 text-[#008C6A] border border-[#008C6A]/30 hover:bg-[#008C6A]/30 transition-all duration-300 animate-pulse mb-6">
              ✨ منصة متكاملة
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              حلول شاملة لإدارة الموارد البشرية
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              22 نظاماً فرعياً متكاملاً يجمع كل ما تحتاجه لإدارة موظفيك في منصة واحدة متطورة
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-500 transform hover:scale-105 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#008C6A]/20 rounded-xl border border-[#008C6A]/30 group-hover:bg-[#008C6A]/30 transition-all duration-300">
                      <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white group-hover:text-[#008C6A] transition-colors duration-300">{feature.title}</CardTitle>
                      <p className="text-[#008C6A] font-medium">{feature.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-[#008C6A]/20 mb-6">
                    <p className="text-sm text-gray-400 font-medium">
                      {feature.marketingText}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {feature.features.map((subFeature, subIndex) => (
                      <div key={subIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#008C6A] animate-pulse" />
                        <span className="text-sm text-gray-300">{subFeature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => navigate(feature.route)}
                    className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    اكتشف المزيد
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ماذا يقول عملاؤنا؟
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              شهادات حقيقية من عملائنا الكرام
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-105">
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
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ابدأ رحلتك الرقمية اليوم
            </h2>
            <p className="text-xl text-gray-300 mb-8 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              انضم إلى أكثر من 1000 شركة تثق في حلولنا المتطورة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group px-8 py-4 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white shadow-2xl shadow-[#008C6A]/30 hover:shadow-[#008C6A]/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                onClick={() => navigate('/subscription-packages')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">احصل على عرض خاص</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 border-2 border-[#008C6A]/50 hover:border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A]/10 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 bg-black/20 backdrop-blur-sm"
                onClick={() => navigate('/schedule-meeting')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                احجز موعد مجاني
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-[#008C6A]/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-12">
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
                منصة رائدة في حلول الموارد البشرية، نساعد الشركات السعودية على التحول الرقمي وتحقيق أهداف رؤية 2030
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <div className="w-10 h-10 bg-[#008C6A]/20 rounded-full flex items-center justify-center hover:bg-[#008C6A]/30 transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5 text-[#008C6A]" />
                </div>
                <div className="w-10 h-10 bg-[#008C6A]/20 rounded-full flex items-center justify-center hover:bg-[#008C6A]/30 transition-colors cursor-pointer">
                  <Linkedin className="h-5 w-5 text-[#008C6A]" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {['الرئيسية', 'عن بُعد', 'الخدمات', 'العملاء', 'المدونة'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-[#008C6A] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6">خدماتنا</h4>
              <ul className="space-y-3">
                {['إدارة الموظفين', 'نظام الرواتب', 'التقييمات', 'التدريب', 'التقارير'].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-[#008C6A] transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <span className="text-gray-400">+966 11 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <span className="text-gray-400">info@boud-hr.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#008C6A]/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-[#008C6A]" />
                  </div>
                  <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#008C6A]/20 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 بُعد للموارد البشرية. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-4 lg:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">شروط الاستخدام</a>
              <a href="#" className="text-gray-400 hover:text-[#008C6A] text-sm transition-colors">الدعم الفني</a>
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