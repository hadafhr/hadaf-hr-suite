import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, Clock, TrendingUp, Play, Users, Award, Bot, FileText, Shield, Briefcase, Home, Coffee, DollarSign, AlertCircle, BarChart3, Eye, Video, Smartphone, Monitor, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import buodLogo from '@/assets/buod-logo-white.png';
interface TourSection {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  badge?: string;
  icon: React.ComponentType<any>;
  locale: string;
  order: number;
  route: string;
}
const InteractiveTour = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const isArabic = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    email: '',
    description: ''
  });
  const tourSections: TourSection[] = [{
    slug: 'employee-management',
    title: isArabic ? 'إدارة الموظفين' : 'Employee Management',
    subtitle: isArabic ? 'استكشف نظام إدارة الموظفين الشامل والمتطور' : 'Explore the comprehensive employee management system',
    category: isArabic ? 'إدارة' : 'Management',
    tags: ['موظفين', 'إدارة', 'نظام'],
    badge: isArabic ? 'شائع' : 'Popular',
    icon: Users,
    locale: 'ar-SA',
    order: 1,
    route: '/employee-management-info'
  }, {
    slug: 'self-service',
    title: isArabic ? 'الخدمة الذاتية' : 'Self Service',
    subtitle: isArabic ? 'تعرف على منصة الخدمة الذاتية للموظفين' : 'Discover the employee self-service platform',
    category: isArabic ? 'خدمات' : 'Services',
    tags: ['خدمة ذاتية', 'موظفين', 'منصة'],
    icon: Smartphone,
    locale: 'ar-SA',
    order: 2,
    route: '/self-service-info'
  }, {
    slug: 'compensation-benefits',
    title: isArabic ? 'التعويضات والمزايا' : 'Compensation & Benefits',
    subtitle: isArabic ? 'اكتشف نظام إدارة الرواتب والمزايا المتقدم' : 'Discover the advanced payroll and benefits management system',
    category: isArabic ? 'مالية' : 'Financial',
    tags: ['رواتب', 'مزايا', 'تعويضات'],
    icon: DollarSign,
    locale: 'ar-SA',
    order: 3,
    route: '/compensation-benefits'
  }, {
    slug: 'performance-evaluation',
    title: isArabic ? 'التقييمات الذكية' : 'Smart Evaluations',
    subtitle: isArabic ? 'نظام تقييم الأداء بالذكاء الاصطناعي' : 'AI-powered performance evaluation system',
    category: isArabic ? 'تقييم' : 'Evaluation',
    tags: ['تقييم', 'أداء', 'ذكي'],
    badge: isArabic ? 'جديد' : 'New',
    icon: Award,
    locale: 'ar-SA',
    order: 4,
    route: '/performance-evaluation'
  }, {
    slug: 'training-development',
    title: isArabic ? 'التدريب والتطوير' : 'Training & Development',
    subtitle: isArabic ? 'منصة التدريب الإلكتروني وتطوير المهارات' : 'E-learning platform and skills development',
    category: isArabic ? 'تدريب' : 'Training',
    tags: ['تدريب', 'تطوير', 'مهارات'],
    icon: Video,
    locale: 'ar-SA',
    order: 5,
    route: '/training'
  }, {
    slug: 'wage-protection',
    title: isArabic ? 'حماية الأجور' : 'Wage Protection',
    subtitle: isArabic ? 'نظام حماية الأجور المتكامل مع البنوك السعودية' : 'Integrated wage protection system with Saudi banks',
    category: isArabic ? 'حماية' : 'Protection',
    tags: ['أجور', 'حماية', 'WPS'],
    icon: Shield,
    locale: 'ar-SA',
    order: 6,
    route: '/wage-protection'
  }, {
    slug: 'dashboard-analytics',
    title: isArabic ? 'لوحة التحكم والتحليلات' : 'Dashboard & Analytics',
    subtitle: isArabic ? 'تحليلات متقدمة ولوحات تحكم تفاعلية' : 'Advanced analytics and interactive dashboards',
    category: isArabic ? 'تحليلات' : 'Analytics',
    tags: ['تحليلات', 'لوحة تحكم', 'تقارير'],
    icon: BarChart3,
    locale: 'ar-SA',
    order: 7,
    route: '/company-dashboard'
  }, {
    slug: 'mobile-apps',
    title: isArabic ? 'التطبيقات المحمولة' : 'Mobile Apps',
    subtitle: isArabic ? 'تطبيقات الهاتف المحمول للموظفين والإدارة' : 'Mobile applications for employees and management',
    category: isArabic ? 'تطبيقات' : 'Applications',
    tags: ['محمول', 'تطبيق', 'موبايل'],
    badge: isArabic ? 'قريباً' : 'Coming Soon',
    icon: Monitor,
    locale: 'ar-SA',
    order: 8,
    route: '/mobile-apps'
  }];
  const categories = [{
    value: 'all',
    label: isArabic ? 'جميع الأقسام' : 'All Sections'
  }, {
    value: 'إدارة',
    label: isArabic ? 'إدارة' : 'Management'
  }, {
    value: 'خدمات',
    label: isArabic ? 'خدمات' : 'Services'
  }, {
    value: 'مالية',
    label: isArabic ? 'مالية' : 'Financial'
  }, {
    value: 'تقييم',
    label: isArabic ? 'تقييم' : 'Evaluation'
  }, {
    value: 'تدريب',
    label: isArabic ? 'تدريب' : 'Training'
  }, {
    value: 'حماية',
    label: isArabic ? 'حماية' : 'Protection'
  }, {
    value: 'تحليلات',
    label: isArabic ? 'تحليلات' : 'Analytics'
  }, {
    value: 'تطبيقات',
    label: isArabic ? 'تطبيقات' : 'Applications'
  }];
  const filteredSections = useMemo(() => {
    return tourSections.filter(section => {
      const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) || section.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || section.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, tourSections]);
  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    toast({
      title: isArabic ? "تم إرسال الاقتراح بنجاح" : "Suggestion sent successfully",
      description: isArabic ? "سنراجع اقتراحك ونتواصل معك قريباً" : "We'll review your suggestion and contact you soon"
    });
    setSuggestionForm({
      title: '',
      email: '',
      description: ''
    });
  };
  const popularSections = tourSections.slice(0, 4);
  const recentSections = tourSections.slice(1, 4);
  return <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-full h-full bg-repeat animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
          backgroundSize: '60px 60px'
        }}></div>
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
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img src={buodLogo} alt="Buod HR" className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Play className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'الجولة التفاعلية' : 'Interactive Tour'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'اكتشف النظام الشامل' : 'Discover the Complete System'}
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
                  <button onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')} tabIndex={0} aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'} className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20">
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
                    <span className="text-gray-400">{filteredSections.length} {isArabic ? 'قسم' : 'Sections'}</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'متاح' : 'Available'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb items={[{
            label: isArabic ? 'الرئيسية' : 'Home',
            path: '/'
          }, {
            label: isArabic ? 'الجولة التفاعلية' : 'Interactive Tour',
            path: '/interactive-tour'
          }]} />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Play className="h-20 w-20 text-[#008C6A] group-hover:text-white transition-colors duration-300 z-10 relative drop-shadow-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            {isArabic ? 'اكتشف نظام بُعد للموارد البشرية' : 'Discover Buod HR System'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic ? 'جولة تفاعلية شاملة لاستكشاف مميزات وحلول نظام بُعد لإدارة الموارد البشرية - معتمدة وفقاً لأنظمة المملكة العربية السعودية' : 'A comprehensive interactive tour to explore Buod HR system features and solutions - Certified according to Saudi Arabia regulations'}
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Enhanced Section Search & Filter */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
            
            
          </Card>
        </div>

        {/* Enhanced Professional Sections Grid */}
        

        {/* Enhanced Suggestion Form */}
        

        {/* Enhanced Call-to-Action Section */}
        <Card className="max-w-4xl mx-auto mb-12 bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
          <CardContent className="p-8 text-center bg-gray-900/40">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {isArabic ? 'ابدأ رحلتك مع بُعد' : 'Start Your Journey with Buod'}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {isArabic ? 'اكتشف كيف يمكن لنظام بُعد الشامل أن يُحدث نقلة نوعية في إدارة الموارد البشرية' : 'Discover how the comprehensive Buod system can revolutionize your HR management'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/demo-request')} className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-xl shadow-[#008C6A]/30">
                {isArabic ? 'اطلب عرض تجريبي' : 'Request a Demo'}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/subscription-packages')} className="bg-black/40 border-[#008C6A]/40 text-gray-300 hover:border-[#008C6A] hover:bg-[#008C6A]/20 hover:text-white transition-all duration-300 hover:scale-105">
                {isArabic ? 'ابدأ الآن' : 'Start Now'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-lg backdrop-blur-sm max-w-6xl mx-auto">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-400 mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                {isArabic ? 'ملاحظة مهمة' : 'Important Notice'}
              </h4>
              <p className="text-amber-200 text-sm leading-relaxed">
                {isArabic ? 'هذه الجولة التفاعلية مخصصة لاستكشاف مميزات نظام بُعد للموارد البشرية وفقاً لأنظمة المملكة العربية السعودية. يُنصح بمراجعة فريق المبيعات للحصول على معلومات تفصيلية. جميع الحلول معتمدة قانونياً وتضمن أعلى معايير الأمان والخصوصية.' : 'This interactive tour is designed to explore Buod HR system features according to Saudi Arabia regulations. It\'s recommended to consult the sales team for detailed information. All solutions are legally certified and guarantee the highest standards of security and privacy.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default InteractiveTour;