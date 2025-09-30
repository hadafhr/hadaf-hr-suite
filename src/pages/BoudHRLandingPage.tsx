import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
import { CountUpNumber } from '@/components/CountUpNumber';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';

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

  return (
    <div className={`min-h-screen bg-black font-arabic ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Professional Interactive Header - Multi-Language Support */}
      <header className={`relative z-10 bg-gradient-to-r from-background via-background to-background backdrop-blur-xl border-b border-border/40 shadow-2xl shadow-accent/30 sticky top-0 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/3 to-accent/5"></div>
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
              <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent mx-2"></div>
              <img src={boudWhiteLogo} alt="شعار بُعد" className="hidden lg:block h-56 w-auto hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Center Section - Navigation Menu */}
            <nav className={`hidden lg:flex items-center space-x-8 ${currentLanguage === 'ar' ? 'space-x-reverse order-2' : 'order-2'}`}>
              <a href="#home" className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10">
                {currentLanguage === 'ar' ? 'الرئيسية' : 'Home'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
              </a>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10">
                    {currentLanguage === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
                    <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48 bg-card/95 backdrop-blur-xl border border-border/30 shadow-2xl">
                  <DropdownMenuItem onClick={() => navigate('/tutorials')} className="text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الدروس التعليمية' : 'Tutorials'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/green-papers')} className="text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الأوراق الخضراء' : 'White Papers'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/job-descriptions')} className="text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-300">
                    {currentLanguage === 'ar' ? 'الأوصاف الوظيفية' : 'Job Descriptions'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                {currentLanguage === 'ar' ? 'أدوات الموارد البشرية' : 'HR Tools'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/earn-with-boad')} className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10">
                {currentLanguage === 'ar' ? 'اربح مع بُعد' : 'Earn with Boad'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/schedule-meeting')} className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2">
                📅 {currentLanguage === 'ar' ? 'احجز اجتماع' : 'Schedule Meeting'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
              </Button>

              <Button variant="ghost" onClick={() => navigate('/careers')} className="relative group text-foreground hover:text-accent text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2">
                👥 {currentLanguage === 'ar' ? 'انضم الى فريقنا' : 'Join Our Team'}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
              </Button>
            </nav>

            {/* Left Section (Arabic) / Right Section (English) - Actions */}
            <div className={`flex items-center gap-3 ${currentLanguage === 'ar' ? 'order-3' : 'order-3'}`}>
              
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="group relative text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 flex items-center gap-2 px-3 py-2 rounded-lg border border-border/30 hover:border-accent/60 hover:scale-105"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">
                  {currentLanguage === 'ar' ? 'English' : 'العربية'}
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              {/* Professional Login Section */}
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group relative flex items-center gap-2 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 backdrop-blur-sm px-6 py-2.5 rounded-xl border border-border/40 hover:border-accent/70 hover:from-accent/30 hover:to-accent/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-lg hover:shadow-accent/30">
                      <User className="w-4 h-4 text-foreground group-hover:text-accent transition-colors duration-300" />
                      <span className="text-sm text-foreground font-semibold tracking-wide group-hover:text-accent transition-colors duration-300">
                        {currentLanguage === 'ar' ? 'دخول' : 'Login'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-foreground group-hover:text-accent group-hover:rotate-180 transition-all duration-300" />
                      
                      {/* Premium Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-xl border border-border/30 shadow-2xl rounded-xl">
                    <DropdownMenuItem onClick={() => navigate('/admin-login')} className="w-full text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-300 flex items-center gap-3 p-4 cursor-pointer rounded-lg mx-1 my-1">
                      <Building2 className="w-5 h-5" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{currentLanguage === 'ar' ? 'مدير النظام' : 'System Admin'}</span>
                        <span className="text-xs opacity-70">{currentLanguage === 'ar' ? 'إدارة النظام الكاملة' : 'Full system management'}</span>
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
                className="lg:hidden text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-2 rounded-lg border border-border/30 hover:border-accent/60"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/30 shadow-2xl rounded-b-xl animate-fade-in">
              <nav className="flex flex-col p-4 space-y-2">
                <a href="#home" className="text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
                <Button onClick={() => navigate('/tutorials')} variant="ghost" className="justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'مركز المعرفة' : 'Knowledge Center'}
                </Button>
                <Button onClick={() => navigate('/hr-tools')} variant="ghost" className="justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'أدوات الموارد البشرية' : 'HR Tools'}
                </Button>
                <Button onClick={() => navigate('/earn-with-boad')} variant="ghost" className="justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'اربح مع بُعد' : 'Earn with Boad'}
                </Button>
                <Button onClick={() => navigate('/schedule-meeting')} variant="ghost" className="justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'احجز اجتماع' : 'Schedule Meeting'}
                </Button>
                <Button onClick={() => navigate('/careers')} variant="ghost" className="justify-start text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 p-3 rounded-lg">
                  {currentLanguage === 'ar' ? 'انضم الى فريقنا' : 'Join Our Team'}
                </Button>
              </nav>
            </div>
          )}

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-card overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-12">
              {/* Main Title with Professional Styling */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm hover:bg-accent/15 transition-all duration-300 hover:scale-105 shadow-lg">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-accent">
                    {currentLanguage === 'ar' ? 'منصة الموارد البشرية الرائدة في المملكة' : 'Leading HR Platform in Saudi Arabia'}
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight max-w-6xl mx-auto">
                  {currentLanguage === 'ar' ? (
                    <>
                      <span className="block text-foreground mb-4">
                        كل منشأة تبدأ بحلم…
                      </span>
                      <span className="block bg-gradient-to-r from-accent via-accent to-foreground bg-clip-text text-transparent animate-fade-in mb-4">
                        لكن إدارة الموظفين
                      </span>
                      <span className="block text-foreground/90 text-4xl md:text-5xl lg:text-6xl leading-relaxed">
                        قد تتحول إلى عبء يستهلك وقتك وجهدك
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block text-foreground mb-4">
                        Every business starts with a dream…
                      </span>
                      <span className="block bg-gradient-to-r from-accent via-accent to-foreground bg-clip-text text-transparent animate-fade-in mb-4">
                        but managing people
                      </span>
                      <span className="block text-foreground/90 text-4xl md:text-5xl lg:text-6xl leading-relaxed">
                        can become a burden that drains your time and energy
                      </span>
                    </>
                  )}
                </h1>

                <div className="relative max-w-4xl mx-auto mt-8">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium bg-card/30 backdrop-blur-sm p-8 rounded-2xl border border-border shadow-xl">
                    {currentLanguage === 'ar' 
                      ? 'بُعد HR هنا ليعيد لك السيطرة، ويحوّل الفوضى إلى نظام، والتحديات إلى فرص' 
                      : 'BOUD HR gives you back control – turning chaos into order, and challenges into opportunities'
                    }
                  </p>
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl blur opacity-50"></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-accent text-primary-foreground px-12 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 min-w-[250px] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative z-10">{currentLanguage === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey'}</span>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-border text-foreground hover:bg-accent/20 hover:border-accent px-12 py-6 text-xl font-bold rounded-xl backdrop-blur-sm bg-card/50 transition-all duration-300 hover:scale-105 min-w-[250px]"
                >
                  {currentLanguage === 'ar' ? 'شاهد العرض التوضيحي' : 'Watch Demo'}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Explainer Video Section */}
        <section className="relative py-20 bg-gradient-to-b from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' 
                  ? 'شاهد القصة… كيف انتقلت شركات من المعاناة مع الأنظمة التقليدية إلى تجربة سلسة مع بُعد HR.'
                  : 'Watch the story… how companies moved from struggling with outdated systems to a seamless journey with BOUD HR.'
                }
              </h2>
              
              <div className="relative max-w-4xl mx-auto aspect-video bg-card rounded-2xl flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Pain Before BOUD Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' ? 'المشكلة قبل بُعد' : 'The Pain Before BOUD'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Settings className="w-8 h-8" />,
                    textAr: 'أنظمة متعددة لا تتكامل',
                    textEn: 'Multiple systems that don\'t talk to each other'
                  },
                  {
                    icon: <Clock className="w-8 h-8" />,
                    textAr: 'تقارير يدوية تستهلك الساعات',
                    textEn: 'Hours wasted on manual reports'
                  },
                  {
                    icon: <DollarSign className="w-8 h-8" />,
                    textAr: 'أخطاء في الرواتب تعني شكاوى لا تنتهي',
                    textEn: 'Payroll errors leading to endless complaints'
                  },
                  {
                    icon: <FileText className="w-8 h-8" />,
                    textAr: 'ضياع بيانات الموظفين بين الملفات',
                    textEn: 'Employee data scattered everywhere'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-b from-destructive/20 to-destructive/10 p-6 rounded-xl border border-destructive/20 text-center space-y-4"
                  >
                    <div className="text-destructive flex justify-center">
                      {item.icon}
                    </div>
                    <p className="text-foreground font-medium">
                      {currentLanguage === 'ar' ? item.textAr : item.textEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Transformation with BOUD Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' ? 'الحل مع بُعد' : 'The Transformation with BOUD'}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-accent/20 to-accent/10 p-8 rounded-2xl border border-border/30"
                >
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                    {currentLanguage === 'ar' 
                      ? 'بُعد HR يجمع كل ما تحتاجه في مكان واحد: التوظيف، الرواتب، التدريب، الأداء، الحوكمة… كل شيء في منصة سحابية ذكية، متوافقة مع الأنظمة السعودية، ومدعومة بالذكاء الاصطناعي.'
                      : 'BOUD HR brings everything you need into one place: recruitment, payroll, training, performance, compliance… all in a smart cloud platform, fully compliant with Saudi regulations, and powered by AI.'
                    }
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Customer Journey Section */}
        <section className="relative py-20 bg-gradient-to-b from-card to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' ? 'رحلة العميل' : 'Customer Journey'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    icon: <Eye className="w-8 h-8" />,
                    titleAr: 'البداية: اكتشاف الفوضى في أنظمة الموارد البشرية',
                    titleEn: 'The Beginning: Realizing the chaos in HR systems'
                  },
                  {
                    step: '2',
                    icon: <Rocket className="w-8 h-8" />,
                    titleAr: 'التحول: تجربة بُعد HR ورؤية الفرق من اليوم الأول',
                    titleEn: 'The Shift: Trying BOUD HR and seeing results from day one'
                  },
                  {
                    step: '3',
                    icon: <Crown className="w-8 h-8" />,
                    titleAr: 'النتيجة: راحة إدارية، نمو أسرع، ورضا موظفين أعلى',
                    titleEn: 'The Outcome: Administrative peace, faster growth, happier employees'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-b from-accent/20 to-accent/5 p-8 rounded-xl border border-border/30 text-center space-y-6 group hover:scale-105 transition-transform duration-300">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto text-foreground font-bold text-xl">
                        {item.step}
                      </div>
                      <div className="text-accent flex justify-center">
                        {item.icon}
                      </div>
                      <h3 className="text-foreground font-semibold text-lg">
                        {currentLanguage === 'ar' ? item.titleAr : item.titleEn}
                      </h3>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' ? 'قصص نجاح' : 'Success Stories'}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-accent/20 to-accent/10 p-8 rounded-2xl border border-border/30"
                >
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                    {currentLanguage === 'ar' 
                      ? 'إحدى الشركات وفّرت 70% من وقتها الإداري بعد اعتماد بُعد HR. أخرى حسّنت رضا موظفيها بنسبة 40%. الجميع اتفقوا: بُعد ليس برنامجًا، بل نقلة نوعية.'
                      : 'One company saved 70% of their admin time after adopting BOUD HR. Another improved employee satisfaction by 40%. Everyone agrees: BOUD is not just software – it\'s a breakthrough.'
                    }
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">
                        <CountUpNumber target={70} duration={2} suffix="%" />
                      </div>
                      <p className="text-muted-foreground">
                        {currentLanguage === 'ar' ? 'توفير في الوقت الإداري' : 'Admin Time Saved'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">
                        <CountUpNumber target={40} duration={2} suffix="%" />
                      </div>
                      <p className="text-muted-foreground">
                        {currentLanguage === 'ar' ? 'تحسين رضا الموظفين' : 'Employee Satisfaction'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">
                        <CountUpNumber target={95} duration={2} suffix="%" />
                      </div>
                      <p className="text-muted-foreground">
                        {currentLanguage === 'ar' ? 'دقة الرواتب' : 'Payroll Accuracy'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why BOUD Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {currentLanguage === 'ar' ? 'لماذا بُعد؟' : 'Why BOUD?'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Award className="w-8 h-8" />,
                    titleAr: 'حل محلي بمعايير عالمية – صمم خصيصًا لبيئة العمل السعودية والخليجية',
                    titleEn: 'Local solution with global standards – tailored for Saudi & GCC markets'
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    titleAr: 'تكامل شامل – لا حاجة لتعدد الأنظمة أو الإضافات',
                    titleEn: 'Full integration – no need for multiple systems or add-ons'
                  },
                  {
                    icon: <Settings className="w-8 h-8" />,
                    titleAr: 'مرونة كاملة – يناسب جميع أحجام المنشآت',
                    titleEn: 'Complete flexibility – designed for all business sizes'
                  },
                  {
                    icon: <Brain className="w-8 h-8" />,
                    titleAr: 'ابتكار وذكاء – تقارير تنبؤية وذكاء اصطناعي',
                    titleEn: 'Innovation & Intelligence – predictive analytics and AI-powered insights'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-b from-accent/20 to-accent/5 p-6 rounded-xl border border-border/30 text-center space-y-4 group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-accent flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <p className="text-foreground font-medium">
                      {currentLanguage === 'ar' ? item.titleAr : item.titleEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="relative bg-gradient-to-b from-card to-background border-t border-border/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <BoudLogo variant="full" size="sm" className="h-8 w-auto filter brightness-200" />
                  <img src={boudWhiteLogo} alt="شعار بُعد" className="h-32 w-auto" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {currentLanguage === 'ar' 
                    ? 'نقود التحول الرقمي في إدارة الموارد البشرية مع حلول تقنية متطورة ومدعومة بالذكاء الاصطناعي.'
                    : 'Leading digital transformation in Human Resource Management with advanced technology solutions powered by AI.'
                  }
                </p>
                <div className="flex items-center gap-4">
                  <motion.a 
                    href="#" 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 bg-accent/20 hover:bg-accent/40 rounded-full flex items-center justify-center text-foreground hover:text-accent transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 bg-accent/20 hover:bg-accent/40 rounded-full flex items-center justify-center text-foreground hover:text-accent transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 bg-accent/20 hover:bg-accent/40 rounded-full flex items-center justify-center text-foreground hover:text-accent transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-foreground font-semibold text-lg">
                  {currentLanguage === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                </h3>
                <div className="space-y-2">
                  <a href="#home" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'الرئيسية' : 'Home'}
                  </a>
                  <a href="#solutions" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'الحلول' : 'Solutions'}
                  </a>
                  <a href="#success-stories" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'قصص النجاح' : 'Success Stories'}
                  </a>
                  <a href="#contact" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </a>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-foreground font-semibold text-lg">
                  {currentLanguage === 'ar' ? 'خدماتنا' : 'Our Services'}
                </h3>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'إدارة الموظفين' : 'Employee Management'}
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'الخدمة الذاتية' : 'Self Service'}
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'التقييمات الذكية' : 'Smart Evaluations'}
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                    {currentLanguage === 'ar' ? 'التدريب والتطوير' : 'Training & Development'}
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-foreground font-semibold text-lg">
                  {currentLanguage === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="text-sm">+966 11 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4 text-accent" />
                    <span className="text-sm">info@boud.systems</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm">
                      {currentLanguage === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-border mt-12 pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {currentLanguage === 'ar' 
                  ? '© بُعد BOUD Systems – جميع الحقوق محفوظة'
                  : '© BOUD Systems – All Rights Reserved'
                }
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* AI Assistant */}
      <BoudHRAssistant />
    </div>
  );
};

export default BoudHRLandingPage;