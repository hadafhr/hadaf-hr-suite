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
              <div className="hover:scale-105 transition-all duration-300">
                <BoudLogo variant="full" size="header" className="h-12 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" />
              </div>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Building2 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  منظومة بُعد للموارد البشرية
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  حلول تقنية متطورة ومبتكرة
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
                
                {/* Navigation Links */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <a href="#home" className="text-xs text-gray-400 hover:text-[#008C6A] transition-colors">الرئيسية</a>
                    <Button variant="ghost" onClick={() => navigate('/interactive-tour')} className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A]">
                      <Play className="w-3 h-3 ml-1" />
                      جولة تفاعلية
                    </Button>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A] justify-start">
                        مركز المعرفة
                        <ChevronDown className="w-3 h-3 mr-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl">
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

                  <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A]">
                      <Calculator className="w-3 h-3 ml-1" />
                      أدوات الموارد البشرية
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A]">
                      اكسب مع بُعد
                    </Button>
                    <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A]">
                      حجز موعد
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <a href="#about" className="text-xs text-gray-400 hover:text-[#008C6A] transition-colors">عن بُعد</a>
                    <a href="#contact" className="text-xs text-gray-400 hover:text-[#008C6A] transition-colors">تواصل معنا</a>
                  </div>

                  {/* Auth buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#008C6A]/20">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-xs p-1 h-auto text-gray-400 hover:text-[#008C6A]">
                          تسجيل دخول
                          <ChevronDown className="w-3 h-3 mr-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-gray-900 border border-[#008C6A]/30 backdrop-blur-xl">
                        <DropdownMenuItem onClick={() => navigate('/admin-login')} className="text-white hover:bg-[#008C6A]/20">
                          <Building2 className="w-3 h-3 ml-1" />
                          مدير النظام
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="text-white hover:bg-[#008C6A]/20">
                          <Building className="w-3 h-3 ml-1" />
                          لوحة تحكم المنشأة
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/employee-login')} className="text-white hover:bg-[#008C6A]/20">
                          <User className="w-3 h-3 ml-1" />
                          لوحة تحكم الموظف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={() => navigate('/subscription-packages')} className="text-xs px-2 py-1 bg-[#008C6A] hover:bg-[#008C6A]/80 text-white">
                      انضم إلينا
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">22 نظام</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">محدّث</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:bg-[#008C6A]/10"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-[#008C6A]/30">
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-3">
                <a href="#home" className="text-white hover:text-[#008C6A] py-2">الرئيسية</a>
                <a href="#about" className="text-white hover:text-[#008C6A] py-2">عن بُعد</a>
                <Button variant="ghost" onClick={() => navigate('/interactive-tour')} className="text-white hover:text-[#008C6A] justify-start p-2">
                  <Play className="w-4 h-4 ml-2" />
                  جولة تفاعلية
                </Button>
                <a href="#services" className="text-white hover:text-[#008C6A] py-2">مركز المعرفة</a>
                <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-white hover:text-[#008C6A] justify-start p-2">
                  <Calculator className="w-4 h-4 ml-2" />
                  أدوات الموارد البشرية
                </Button>
                <a href="#earn" className="text-white hover:text-[#008C6A] py-2">اكسب مع بُعد</a>
                <a href="#booking" className="text-white hover:text-[#008C6A] py-2">حجز موعد</a>
                <a href="#contact" className="text-white hover:text-[#008C6A] py-2">تواصل معنا</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-[#008C6A]/30">
                  <Button onClick={() => navigate('/employee-login')} variant="ghost" className="text-white hover:text-[#008C6A] justify-start">
                    تسجيل دخول
                  </Button>
                  <Button onClick={() => navigate('/subscription-packages')} className="bg-[#008C6A] hover:bg-[#008C6A]/80 text-white">
                    انضم إلينا
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - Rest of the page content continues here... */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold mb-6">مرحباً بك في منظومة بُعد HR</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              الحل الأمثل لإدارة الموارد البشرية في المملكة العربية السعودية
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => navigate('/subscription-packages')} className="bg-[#008C6A] hover:bg-[#008C6A]/80 px-8 py-3">
                ابدأ الآن
              </Button>
              <Button variant="outline" onClick={() => navigate('/interactive-tour')} className="border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A]/10 px-8 py-3">
                جولة تفاعلية
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-12">المميزات الرئيسية</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/50 border-[#008C6A]/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <feature.icon className="h-8 w-8 text-[#008C6A]" />
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#008C6A]" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-[#008C6A] mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* AI Assistant */}
      <BoudHRAssistant />
    </div>
  );
};

export default BoudHRLandingPage;