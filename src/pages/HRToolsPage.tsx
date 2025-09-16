import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, Clock, TrendingUp, Calculator, Users, Award, Bot, FileText, Shield, Briefcase, Home, Coffee, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoudLogo } from '@/components/BoudLogo';
import { BackButton } from '@/components/BackButton';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BackButton />
              <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                <BoudLogo variant="icon" size="md" />
                <span className="font-bold text-xl text-foreground hidden sm:block">بُعد</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6 space-x-reverse mr-8">
                <Button variant="ghost" onClick={() => navigate('/services')} className="text-muted-foreground hover:text-foreground transition-colors">
                  {isArabic ? 'المنتجات' : 'Products'}
                </Button>
                <Button variant="ghost" onClick={() => navigate('/solutions')} className="text-muted-foreground hover:text-foreground transition-colors">
                  {isArabic ? 'الحلول' : 'Solutions'}
                </Button>
                <Button variant="ghost" onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground transition-colors">
                  {isArabic ? 'المعرفة' : 'Knowledge'}
                </Button>
                <Button variant="ghost" onClick={() => window.scrollTo({ top: document.getElementById('about')?.offsetTop || 0, behavior: 'smooth' })} className="text-muted-foreground hover:text-foreground transition-colors">
                  {isArabic ? 'عن بُعد' : 'About'}
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={() => navigate('/demo-request')}>
                {isArabic ? 'اطلب عرض' : 'Request Demo'}
              </Button>
              <Button size="sm" onClick={() => navigate('/subscription-packages')}>
                {isArabic ? 'جولة تفاعلية' : 'Interactive Tour'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {isArabic ? 'حزمة أدوات الموارد البشرية السعودية' : 'Saudi HR Tools Suite'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {isArabic 
                ? 'نمنحك أدوات ذكية تُنجز المهام الروتينية بسرعة، لتتفرغ لعمل يُحدث الفرق.'
                : 'Smart tools that handle routine tasks quickly, so you can focus on work that makes a difference.'
              }
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={isArabic ? 'ابحث عن الأدوات...' : 'Search tools...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Access */}
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>{isArabic ? 'شائعة:' : 'Popular:'}</span>
                  {popularTools.slice(0, 2).map(tool => (
                    <Badge 
                      key={tool.slug} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => navigate(tool.route)}
                    >
                      {tool.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card key={tool.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      {tool.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {tool.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(tool.route)}
                      >
                        {isArabic ? 'افتح الأداة' : 'Open Tool'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          // Show tooltip or guide modal instead of navigating to non-existent guide page
                          alert(isArabic 
                            ? `دليل ${tool.title} - قريباً سيتم إضافة دليل مفصل لاستخدام هذه الأداة`
                            : `${tool.title} Guide - A detailed guide for using this tool will be added soon`
                          );
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
                <p className="text-muted-foreground">
                  {isArabic ? 'لم يتم العثور على أدوات مطابقة' : 'No matching tools found'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Suggestion Form */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {isArabic ? 'اقترح الأداة التالية' : 'Suggest the Next Tool'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isArabic 
                ? 'شاركنا أفكارك لأدوات جديدة تساعد في تطوير بيئة العمل'
                : 'Share your ideas for new tools that help improve the work environment'
              }
            </p>

            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <Input
                placeholder={isArabic ? 'عنوان الأداة المقترحة' : 'Suggested Tool Title'}
                value={suggestionForm.title}
                onChange={(e) => setSuggestionForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <Input
                type="email"
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your Email'}
                value={suggestionForm.email}
                onChange={(e) => setSuggestionForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <textarea
                className="w-full p-3 rounded-md border border-input bg-background resize-none"
                rows={4}
                placeholder={isArabic ? 'وصف الأداة والفائدة المرجوة منها...' : 'Tool description and expected benefits...'}
                value={suggestionForm.description}
                onChange={(e) => setSuggestionForm(prev => ({ ...prev, description: e.target.value }))}
                required
              />
              <Button type="submit" size="lg" className="w-full">
                {isArabic ? 'أرسل الاقتراح' : 'Send Suggestion'}
              </Button>
            </form>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {isArabic ? 'جرّب بُعد بنفسك' : 'Try Boud Yourself'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {isArabic 
                ? 'اكتشف كيف تحوّل بُعد إدارة الموارد البشرية في منشأتك'
                : 'Discover how Boud transforms HR management in your organization'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => navigate('/demo-request')}>
                {isArabic ? 'اطلب عرض' : 'Request Demo'}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate('/subscription-packages')}>
                {isArabic ? 'جولة تفاعلية' : 'Interactive Tour'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-4 right-4 bg-orange-100 border border-orange-200 text-orange-800 px-4 py-2 rounded-lg text-sm max-w-md">
        {isArabic 
          ? 'النتائج استرشادية. يُرجى الرجوع للسياسات والعقود عند النزاع.'
          : 'Results are for guidance only. Please refer to policies and contracts in case of disputes.'
        }
      </div>
    </div>
  );
};

export default HRToolsPage;