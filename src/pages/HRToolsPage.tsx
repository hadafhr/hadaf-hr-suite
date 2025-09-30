import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, Clock, TrendingUp, Calculator, Users, Award, Bot, FileText, Shield, Briefcase, Home, Coffee, DollarSign, AlertCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoudLogo } from '@/components/BoudLogo';
import { BackButton } from '@/components/BackButton';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import buodLogo from '@/assets/buod-logo-white.png';

interface Tool {
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

const HRToolsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isArabic = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestionForm, setSuggestionForm] = useState({
    title: '',
    email: '',
    description: ''
  });

  const tools: Tool[] = [
    {
      slug: 'salary-calculator',
      title: isArabic ? 'حاسبة الرواتب' : 'Salary Calculator',
      subtitle: isArabic ? 'احسب صافي وإجمالي الراتب مع التأمينات والبدلات' : 'Calculate net and gross salary with insurance and allowances',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['رواتب', 'GOSI', 'امتثال'],
      badge: isArabic ? 'مُحدّث' : 'Updated',
      icon: Calculator,
      locale: 'ar-SA',
      order: 1,
      route: '/hr-tools/salary-calculator'
    },
    {
      slug: 'nitaqat-calculator',
      title: isArabic ? 'حاسبة النطاقات' : 'Nitaqat Calculator',
      subtitle: isArabic ? 'قياس مستوى نطاق المنشأة ونسبة السعودة' : 'Measure establishment Nitaqat level and Saudization ratio',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['نطاقات', 'سعودة', 'امتثال'],
      icon: Users,
      locale: 'ar-SA',
      order: 2,
      route: '/hr-tools/nitaqat-calculator'
    },
    {
      slug: 'end-of-service',
      title: isArabic ? 'حاسبة مكافأة نهاية الخدمة' : 'End of Service Calculator',
      subtitle: isArabic ? 'احتساب الاستحقاق حسب نوع العقد وسبب الانتهاء' : 'Calculate entitlements based on contract type and termination reason',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['نهاية خدمة', 'مكافآت', 'عقود'],
      icon: Award,
      locale: 'ar-SA',
      order: 3,
      route: '/end-of-service-calculator'
    },
    {
      slug: 'labor-law-ai',
      title: isArabic ? 'مُمتثل الذكي' : 'Smart Compliance Assistant',
      subtitle: isArabic ? 'مساعد محادثي لقانون العمل السعودي بالذكاء الاصطناعي' : 'AI-powered conversational assistant for Saudi Labor Law',
      category: isArabic ? 'مساعدين' : 'Assistants',
      tags: ['قانون عمل', 'ذكي', 'مساعد'],
      badge: isArabic ? 'جديد' : 'New',
      icon: Bot,
      locale: 'ar-SA',
      order: 4,
      route: '/hr-tools/labor-law-ai'
    },
    {
      slug: 'wps-checker',
      title: isArabic ? 'مدقّق حماية الأجور' : 'WPS Checker',
      subtitle: isArabic ? 'تحقق من سلامة ملف SIF وأزمنة الدفع' : 'Verify SIF file integrity and payment timing',
      category: isArabic ? 'أدوات' : 'Tools',
      tags: ['حماية أجور', 'WPS', 'SIF'],
      icon: Shield,
      locale: 'ar-SA',
      order: 5,
      route: '/hr-tools/wps-checker'
    },
    {
      slug: 'overtime-calculator',
      title: isArabic ? 'حاسبة العمل الإضافي' : 'Overtime Calculator',
      subtitle: isArabic ? '150% للساعة الإضافية مع خيارات العطل والجمعة' : '150% for overtime hours with holiday and Friday options',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['عمل إضافي', 'ساعات', 'أجور'],
      icon: Clock,
      locale: 'ar-SA',
      order: 6,
      route: '/hr-tools/overtime-calculator'
    },
    {
      slug: 'vacation-balance',
      title: isArabic ? 'حاسبة رصيد الإجازات' : 'Vacation Balance Calculator',
      subtitle: isArabic ? 'تراكم سنوي 21/30 يوماً مع خصم الإجازات بلا أجر' : 'Annual accumulation 21/30 days with unpaid leave deductions',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['إجازات', 'رصيد', 'سنوي'],
      icon: Coffee,
      locale: 'ar-SA',
      order: 7,
      route: '/hr-tools/vacation-balance'
    },
    {
      slug: 'housing-allowance',
      title: isArabic ? 'حاسبة بدل السكن' : 'Housing Allowance Calculator',
      subtitle: isArabic ? 'بدل السكن السنوي/الشهري وتأثيره على GOSI' : 'Annual/monthly housing allowance and its impact on GOSI',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['بدل سكن', 'GOSI', 'راتب'],
      icon: Home,
      locale: 'ar-SA',
      order: 8,
      route: '/hr-tools/housing-allowance'
    },
    {
      slug: 'salary-benchmarking',
      title: isArabic ? 'مقارنة الرواتب' : 'Salary Benchmarking',
      subtitle: isArabic ? 'مقارنة الرواتب استناداً إلى بيانات أكثر من 200,000 موظف' : 'Compare salaries based on data from over 200,000 employees',
      category: isArabic ? 'حاسبات' : 'Calculators',
      tags: ['مقارنة', 'رواتب', 'بيانات'],
      badge: isArabic ? 'جديد' : 'New',
      icon: DollarSign,
      locale: 'ar-SA',
      order: 9,
      route: '/salary-benchmarking'
    }
  ];

  const categories = [
    { value: 'all', label: isArabic ? 'جميع الأدوات' : 'All Tools' },
    { value: 'حاسبات', label: isArabic ? 'حاسبات' : 'Calculators' },
    { value: 'مساعدين', label: isArabic ? 'مساعدين' : 'Assistants' },
    { value: 'أدوات', label: isArabic ? 'أدوات' : 'Tools' }
  ];

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, tools]);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    toast({
      title: isArabic ? "تم إرسال الاقتراح بنجاح" : "Suggestion sent successfully",
      description: isArabic ? "سنراجع اقتراحك ونتواصل معك قريباً" : "We'll review your suggestion and contact you soon"
    });
    setSuggestionForm({ title: '', email: '', description: '' });
  };

  const popularTools = tools.slice(0, 4);
  const recentTools = tools.slice(1, 4);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-card/50 backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/70 to-accent/50 opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                  {isArabic ? 'حزمة أدوات الموارد البشرية' : 'HR Tools Suite'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'أدوات احترافية ومتقدمة' : 'Professional & Advanced Tools'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
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
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-accent/40 hover:border-accent/70 hover:bg-accent/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-lg hover:shadow-accent/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-accent transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/40 group-hover:shadow-accent/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-card/30 backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{filteredTools.length} {isArabic ? 'أداة' : 'Tools'}</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'محدّث' : 'Updated'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' }
              ]}
            />
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
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            {isArabic ? 'حزمة أدوات الموارد البشرية السعودية' : 'Saudi HR Tools Suite'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'نمنحك أدوات ذكية تُنجز المهام الروتينية بسرعة، لتتفرغ لعمل يُحدث الفرق - معتمدة وفقاً لأنظمة المملكة العربية السعودية'
                : 'Smart tools that handle routine tasks quickly, so you can focus on work that makes a difference - Certified according to Saudi Arabia regulations'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Enhanced Calculator Search & Filter Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardTitle className="flex items-center gap-2 text-white relative z-10">
                <Search className="h-5 w-5 animate-pulse" />
                {isArabic ? 'البحث والتصفية' : 'Search & Filter'}
              </CardTitle>
              <CardDescription className="text-white/90 relative z-10">
                {isArabic 
                  ? 'ابحث عن الأداة المناسبة لاحتياجاتك'
                  : 'Find the right tool for your needs'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 bg-gray-900/40">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={isArabic ? 'ابحث عن الأدوات...' : 'Search tools...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200 pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue className="text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#008C6A]/40">
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value} className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Enhanced Quick Access */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <TrendingUp className="h-4 w-4 text-[#008C6A]" />
                  <span>{isArabic ? 'شائعة:' : 'Popular:'}</span>
                  {popularTools.slice(0, 2).map(tool => (
                    <Badge 
                      key={tool.slug} 
                      variant="secondary" 
                      className="cursor-pointer bg-[#008C6A]/20 hover:bg-[#008C6A] hover:text-white transition-all duration-300 border border-[#008C6A]/30 hover:border-[#008C6A] hover:scale-105"
                      onClick={() => navigate(tool.route)}
                    >
                      {tool.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Professional Tools Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Card key={tool.slug} className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20">
                <CardHeader className="bg-gradient-to-r from-[#008C6A]/20 via-[#009F87]/20 to-[#00694F]/20 border-b border-[#008C6A]/30 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-[#008C6A]/20 rounded-xl group-hover:bg-[#008C6A]/30 transition-all duration-300 border border-[#008C6A]/30 hover:border-[#008C6A]/50">
                      <tool.icon className="h-6 w-6 text-[#008C6A] group-hover:text-white transition-colors duration-300" />
                    </div>
                    {tool.badge && (
                      <Badge variant="secondary" className="text-xs bg-[#008C6A]/30 text-white border border-[#008C6A]/50 animate-pulse">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-[#008C6A] transition-colors duration-300">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-300">
                    {tool.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 bg-gray-900/40">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs bg-black/40 text-gray-300 border-[#008C6A]/30 hover:border-[#008C6A]/50 hover:bg-[#008C6A]/20 transition-all duration-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#008C6A]/30"
                      onClick={() => navigate(tool.route)}
                    >
                      {isArabic ? 'افتح الأداة' : 'Open Tool'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-black/40 border-[#008C6A]/40 text-gray-300 hover:border-[#008C6A] hover:bg-[#008C6A]/20 hover:text-white transition-all duration-300"
                      onClick={() => {
                        toast({
                          title: isArabic ? "دليل الاستخدام" : "User Guide",
                          description: isArabic 
                            ? `دليل ${tool.title} - قريباً سيتم إضافة دليل مفصل لاستخدام هذه الأداة`
                            : `${tool.title} Guide - A detailed guide for using this tool will be added soon`
                        });
                      }}
                    >
                      {isArabic ? 'الشرح' : 'Guide'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-gray-900/60 border border-[#008C6A]/30">
                <Search className="h-12 w-12 text-[#008C6A] animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-[#008C6A]/10 animate-ping"></div>
              </div>
              <p className="text-gray-300 text-lg">
                {isArabic ? 'لم يتم العثور على أدوات مطابقة لبحثك' : 'No matching tools found for your search'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {isArabic ? 'جرب تغيير مصطلحات البحث أو الفئة' : 'Try changing search terms or category'}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Suggestion Form */}
        <Card className="max-w-4xl mx-auto mb-12 bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardTitle className="flex items-center gap-2 text-white relative z-10">
              <FileText className="h-5 w-5 animate-pulse" />
              {isArabic ? 'اقترح الأداة التالية' : 'Suggest the Next Tool'}
            </CardTitle>
            <CardDescription className="text-white/90 relative z-10">
              {isArabic 
                ? 'شاركنا أفكارك لأدوات جديدة تساعد في تطوير بيئة العمل'
                : 'Share your ideas for new tools that help improve the work environment'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 bg-gray-900/40">
            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'عنوان الأداة المقترحة *' : 'Suggested Tool Title *'}
                </label>
                <Input
                  placeholder={isArabic ? 'حاسبة المكافآت التحفيزية' : 'Incentive Bonus Calculator'}
                  value={suggestionForm.title}
                  onChange={(e) => setSuggestionForm(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'بريدك الإلكتروني *' : 'Your Email *'}
                </label>
                <Input
                  type="email"
                  placeholder={isArabic ? 'example@company.com' : 'example@company.com'}
                  value={suggestionForm.email}
                  onChange={(e) => setSuggestionForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-200 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                  {isArabic ? 'وصف مفصل للأداة *' : 'Detailed Tool Description *'}
                </label>
                <textarea
                  className="w-full p-3 rounded-md border border-[#008C6A]/40 bg-black/50 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200 resize-none"
                  rows={4}
                  placeholder={isArabic ? 'وصف مفصل للأداة وكيف ستساعد في العمل وما هي الحسابات أو الوظائف المطلوبة...' : 'Detailed description of the tool and how it will help at work and what calculations or functions are needed...'}
                  value={suggestionForm.description}
                  onChange={(e) => setSuggestionForm(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#008C6A]/30 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  {isArabic ? 'إرسال الاقتراح' : 'Send Suggestion'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Enhanced Call-to-Action Section */}
        <Card className="max-w-4xl mx-auto mb-12 bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300">
          <CardContent className="p-8 text-center bg-gray-900/40">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {isArabic ? 'جرب النظام الكامل' : 'Try the Complete System'}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {isArabic 
                ? 'اكتشف كيف يمكن لنظام بُعد الشامل أن يُحدث نقلة نوعية في إدارة الموارد البشرية'
                : 'Discover how the comprehensive Buod system can revolutionize your HR management'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/demo-request')}
                className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-xl shadow-[#008C6A]/30"
              >
                {isArabic ? 'اطلب عرض تجريبي' : 'Request a Demo'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/subscription-packages')}
                className="bg-black/40 border-[#008C6A]/40 text-gray-300 hover:border-[#008C6A] hover:bg-[#008C6A]/20 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {isArabic ? 'جولة تفاعلية' : 'Interactive Tour'}
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
                <span className="text-2xl">⚖️</span>
                {isArabic ? 'ملاحظة قانونية مهمة' : 'Important Legal Notice'}
              </h4>
              <p className="text-amber-200 text-sm leading-relaxed">
                {isArabic 
                  ? 'هذه الأدوات مخصصة للإرشاد وفقاً لأنظمة المملكة العربية السعودية الصادرة عن وزارة الموارد البشرية والتنمية الاجتماعية. يُنصح بمراجعة مختص قانوني للحالات المعقدة. جميع الحسابات معتمدة قانونياً وتضمن حقوق الموظفين كاملة.'
                  : 'These tools are for guidance according to Saudi Arabia regulations issued by the Ministry of Human Resources and Social Development. It\'s recommended to consult a legal expert for complex cases. All calculations are legally certified and guarantee full employee rights.'
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRToolsPage;