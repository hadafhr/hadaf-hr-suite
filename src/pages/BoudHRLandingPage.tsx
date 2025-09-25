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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
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
              <BoudLogo variant="full" size="header" className="h-12 w-auto max-w-[120px] object-contain filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" />
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  منصة بُعد للموارد البشرية
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  حلول احترافية ومتقدمة
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
                
                {/* Navigation Buttons Row */}
                <div className="flex items-center justify-between space-x-2">
                  <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-white hover:text-[#008C6A] text-xs p-2 hover:bg-[#008C6A]/10 transition-all duration-300">
                    <Calculator className="w-3 h-3 ml-1" />
                    أدوات
                  </Button>
                  
                  <Button variant="ghost" onClick={() => navigate('/academy')} className="text-white hover:text-[#008C6A] text-xs p-2 hover:bg-[#008C6A]/10 transition-all duration-300">
                    <GraduationCap className="w-3 h-3 ml-1" />
                    أكاديمية
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">1000+ عميل</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">متاح 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-center space-x-6 space-x-reverse pb-4">
            <a href="#home" className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors">الرئيسية</a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors hover:bg-[#008C6A]/10">
                  مركز المعرفة <ChevronDown className="w-4 h-4 mr-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl z-50">
                <DropdownMenuItem onClick={() => navigate('/tutorials')} className="text-white hover:bg-[#008C6A]/20">
                  الدروس التعليمية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/blog')} className="text-white hover:bg-[#008C6A]/20">
                  مدونة بُعد
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/green-papers')} className="text-white hover:bg-[#008C6A]/20">
                  الأوراق الخضراء
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/job-descriptions')} className="text-white hover:bg-[#008C6A]/20">
                  الأوصاف الوظيفية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" onClick={() => navigate('/academy')} className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors">
              اكسب مع بُعد
            </Button>

            <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors">
              حجز موعد
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors hover:bg-[#008C6A]/10">
                  عن بُعد <ChevronDown className="w-4 h-4 mr-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl z-50">
                <DropdownMenuItem asChild>
                  <a href="#vision" className="text-white hover:bg-[#008C6A]/20">رؤيتنا</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#team" className="text-white hover:bg-[#008C6A]/20">فريق العمل</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#partners" className="text-white hover:bg-[#008C6A]/20">شركاؤنا</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#008C6A] text-sm font-medium transition-colors hover:bg-[#008C6A]/10">
                  تواصل معنا <ChevronDown className="w-4 h-4 mr-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl z-50">
                <DropdownMenuItem asChild>
                  <a href="#contact" className="text-white hover:bg-[#008C6A]/20">تواصل معنا</a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/chat-messaging')} className="text-white hover:bg-[#008C6A]/20">
                  الدعم الفني
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/service-calculator')} className="text-white hover:bg-[#008C6A]/20">
                  طلب عرض سعر
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#booking" className="text-white hover:bg-[#008C6A]/20">حجز موعد</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors">
                    تسجيل الدخول <ChevronDown className="w-4 h-4 mr-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl shadow-lg z-50">
                  <DropdownMenuItem onClick={() => navigate('/admin-login')} className="w-full text-right text-white hover:bg-[#008C6A]/20 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <Building2 className="w-4 h-4" />
                     مدير النظام
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="w-full text-right text-white hover:bg-[#008C6A]/20 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <Building className="w-4 h-4" />
                    لوحة تحكم المنشأة
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/employee-login')} className="w-full text-right text-white hover:bg-[#008C6A]/20 transition-colors flex items-center gap-2 p-3 cursor-pointer">
                    <User className="w-4 h-4" />
                    لوحة تحكم الموظف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-[#008C6A] hover:bg-[#006B4F] text-white" onClick={() => navigate('/subscription-packages')}>
                انضم إلينا
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute top-6 left-4">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#008C6A]/30 bg-black/90 backdrop-blur-xl rounded-xl mt-4">
              <nav className="flex flex-col space-y-2 px-4">
                <a href="#home" className="text-white hover:text-[#008C6A] py-2 px-4 rounded transition-colors">الرئيسية</a>
                <a href="#about" className="text-white hover:text-[#008C6A] py-2 px-4 rounded transition-colors">عن بُعد</a>
                <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-white hover:text-[#008C6A] justify-start">
                  <Calculator className="w-4 h-4 ml-2" />
                  أدوات الموارد البشرية
                </Button>
                <Button variant="ghost" onClick={() => navigate('/academy')} className="text-white hover:text-[#008C6A] justify-start">
                  <GraduationCap className="w-4 h-4 ml-2" />
                  اكسب مع بُعد
                </Button>
                <a href="#contact" className="text-white hover:text-[#008C6A] py-2 px-4 rounded transition-colors">تواصل معنا</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-[#008C6A]/30">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    تسجيل الدخول
                  </Button>
                  <Button className="bg-[#008C6A] hover:bg-[#006B4F] text-white" onClick={() => navigate('/subscription-packages')}>
                    انضم إلينا
                  </Button>
                </div>
              </nav>
            </div>
          )}

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      {/* Professional Hero Section */}
      <section id="home" className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>
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
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="block mb-2">إدارة الموارد البشرية</span>
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                    بالذكاء الاصطناعي
                  </span>
                </h1>
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
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-border">
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

      {/* BoudHRAssistant */}
      <BoudHRAssistant 
        isOpen={assistantOpen}
        onOpenChange={handleAssistantOpenChange}
        initialMessage={initialMessage}
      />
    </div>
  );
};

export default BoudHRLandingPage;
