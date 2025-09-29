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
              <img src={boudWhiteLogo} alt="شعار بُعد" className="hidden lg:block h-56 w-auto hover:scale-105 transition-transform duration-300" />
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

      {/* Hero Section - القسم الأول: الغلاف الرئيسي */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#008C6A]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#008C6A]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {currentLanguage === 'ar' 
                ? 'ودّع فوضى الأنظمة المتعددة وابدأ من بُعد HR'
                : 'Say goodbye to fragmented systems. Start with BOUD HR'
              }
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {currentLanguage === 'ar' 
                ? 'كل ما تحتاجه لإدارة رأس المال البشري في مكان واحد'
                : 'All your Human Capital Management in one place'
              }
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring", bounce: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#00A87A] hover:to-[#008C6A] text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105"
              >
                {currentLanguage === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section - القسم الثاني: من نحن */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, x: currentLanguage === 'ar' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F]"
                ></motion.div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  {currentLanguage === 'ar' ? 'من نحن' : 'About Us'}
                </h2>
              </div>
              
              <motion.p
                initial={{ opacity: 0, x: currentLanguage === 'ar' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                {currentLanguage === 'ar' 
                  ? 'بُعد HR هو الحل الشامل والمتطور لإدارة الموارد البشرية، مصمم خصيصاً للشركات السعودية لتلبية احتياجاتها الفريدة وضمان الامتثال للقوانين المحلية.'
                  : 'BOUD HR is a comprehensive and advanced Human Resources management solution, specifically designed for Saudi companies to meet their unique needs and ensure compliance with local regulations.'
                }
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HR Divisions Section - القسم الثالث: إدارات بُعد HR */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {currentLanguage === 'ar' ? 'إدارات بُعد HR' : 'Our Main HR Divisions'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, titleAr: 'إدارة الموظفين', titleEn: 'Employee Management' },
              { icon: Building, titleAr: 'إدارة الشركات', titleEn: 'Company Management' },
              { icon: DollarSign, titleAr: 'الرواتب والمزايا', titleEn: 'Payroll & Benefits' },
              { icon: BarChart3, titleAr: 'التقارير والتحليلات', titleEn: 'Reports & Analytics' },
              { icon: GraduationCap, titleAr: 'التدريب والتطوير', titleEn: 'Training & Development' },
              { icon: Shield, titleAr: 'الأمان والحماية', titleEn: 'Security & Protection' }
            ].map((division, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group text-center p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-[#008C6A]/20 hover:border-[#008C6A]/60 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#008C6A] to-[#00694F] rounded-2xl flex items-center justify-center"
                >
                  <division.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (index * 0.1) + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold text-white group-hover:text-[#008C6A] transition-colors duration-300"
                >
                  {currentLanguage === 'ar' ? division.titleAr : division.titleEn}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BOUD Section - القسم الرابع: لماذا بُعد؟ */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {currentLanguage === 'ar' ? 'لماذا بُعد؟' : 'Why BOUD?'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { icon: Zap, titleAr: 'أتمتة كاملة', titleEn: 'Full Automation', descAr: 'توفير 70% من الوقت في العمليات', descEn: 'Save 70% of time in operations' },
              { icon: Shield, titleAr: 'أمان متقدم', titleEn: 'Advanced Security', descAr: 'حماية عالية المستوى للبيانات', descEn: 'High-level data protection' },
              { icon: Cloud, titleAr: 'تقنية سحابية', titleEn: 'Cloud Technology', descAr: 'وصول آمن من أي مكان', descEn: 'Secure access from anywhere' },
              { icon: CheckCircle, titleAr: 'امتثال تنظيمي', titleEn: 'Regulatory Compliance', descAr: 'ضمان الامتثال للقوانين السعودية', descEn: 'Ensure compliance with Saudi laws' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-900/30 border border-gray-800 hover:border-[#008C6A]/50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2, color: '#008C6A' }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-gradient-to-r from-[#008C6A] to-[#00694F] rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {currentLanguage === 'ar' ? feature.titleAr : feature.titleEn}
                  </h3>
                  <p className="text-gray-400">
                    {currentLanguage === 'ar' ? feature.descAr : feature.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers Section - القسم الخامس: الأرقام تتحدث */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {currentLanguage === 'ar' ? 'الأرقام تتحدث' : 'Impact in Numbers'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 1000, suffix: '+', titleAr: 'شركة تثق بنا', titleEn: 'Companies Trust Us' },
              { number: 100000, suffix: '+', titleAr: 'موظف نديرهم', titleEn: 'Employees We Manage' },
              { number: 99.9, suffix: '%', titleAr: 'وقت التشغيل', titleEn: 'Uptime' },
              { number: 24, suffix: '/7', titleAr: 'دعم متواصل', titleEn: 'Continuous Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 border border-[#008C6A]/20 shadow-xl hover:shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: (index * 0.1) + 0.3, duration: 0.8, type: "spring", bounce: 0.6 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-bold text-[#008C6A] mb-4"
                >
                  <CountUpNumber target={stat.number} suffix={stat.suffix} />
                </motion.div>
                <h3 className="text-lg font-semibold text-white">
                  {currentLanguage === 'ar' ? stat.titleAr : stat.titleEn}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories - القسم السادس: قصص نجاح العملاء */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {currentLanguage === 'ar' ? 'قصص نجاح العملاء' : 'Client Success Stories'}
            </h2>
          </motion.div>
          
          <TestimonialCarousel currentLanguage={currentLanguage} />
        </div>
      </section>

      {/* Pricing Section - القسم السابع: باقات الأسعار */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {currentLanguage === 'ar' ? 'باقات الأسعار' : 'Pricing & Packages'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { nameAr: 'الباقة الأساسية', nameEn: 'Basic Plan', price: '99', popular: false },
              { nameAr: 'الباقة المتقدمة', nameEn: 'Advanced Plan', price: '199', popular: true },
              { nameAr: 'باقة المؤسسات', nameEn: 'Enterprise Plan', price: '399', popular: false },
              { nameAr: 'باقة مخصصة', nameEn: 'Custom Plan', price: 'حسب الطلب', popular: false }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-[#008C6A]/20 to-gray-950 border-[#008C6A] shadow-2xl shadow-[#008C6A]/30' 
                    : 'bg-gradient-to-b from-gray-900 to-gray-950 border-gray-700 hover:border-[#008C6A]/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white px-6 py-2 rounded-full text-sm font-semibold">
                      {currentLanguage === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentLanguage === 'ar' ? plan.nameAr : plan.nameEn}
                  </h3>
                  <div className="text-4xl font-bold text-[#008C6A] mb-6">
                    {plan.price === 'حسب الطلب' && currentLanguage === 'en' ? 'Custom' : plan.price}
                    {plan.price !== 'حسب الطلب' && plan.price !== 'Custom' && (
                      <span className="text-lg text-gray-400">
                        {currentLanguage === 'ar' ? ' ريال/شهر' : ' SAR/month'}
                      </span>
                    )}
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#00A87A] hover:to-[#008C6A] text-white'
                          : 'bg-gray-800 hover:bg-[#008C6A] text-white'
                      }`}
                    >
                      {currentLanguage === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - الفوتر */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {currentLanguage === 'ar' ? 'الروابط السريعة' : 'Quick Links'}
              </h3>
              <div className="space-y-4">
                {[
                  { textAr: 'الرئيسية', textEn: 'Home', href: '#home' },
                  { textAr: 'الخدمات', textEn: 'Services', href: '#services' },
                  { textAr: 'قصص النجاح', textEn: 'Success Stories', href: '#success' },
                  { textAr: 'تواصل معنا', textEn: 'Contact Us', href: '#contact' }
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="block text-gray-400 hover:text-[#008C6A] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {currentLanguage === 'ar' ? link.textAr : link.textEn}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 text-center"
            >
              <div className="mb-8">
                <BoudLogo variant="full" size="lg" className="h-16 w-auto mx-auto filter brightness-200" />
              </div>
              
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Linkedin, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Globe, href: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#008C6A] transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {currentLanguage === 'ar' ? 'تواصل معنا' : 'Contact Info'}
              </h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#008C6A]" />
                  <span>+966 11 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#008C6A]" />
                  <span>info@boud.com.sa</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#008C6A]" />
                  <span>{currentLanguage === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 text-center"
          >
            <p className="text-gray-400">
              {currentLanguage === 'ar' 
                ? '© بُعد BOUD Systems – جميع الحقوق محفوظة' 
                : '© BOUD Systems – All Rights Reserved'
              }
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default BoudHRLandingPage;