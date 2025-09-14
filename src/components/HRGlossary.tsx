import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Volume2, 
  Copy, 
  Share, 
  Download, 
  Plus, 
  Star,
  Clock,
  TrendingUp,
  Eye,
  ChevronRight,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';
import { useToast } from '@/hooks/use-toast';

interface GlossaryTerm {
  id: string;
  slug: string;
  title: string;
  letter: string;
  summary: string;
  body: string;
  synonyms: string[];
  category: string[];
  level: 'أساسي' | 'متقدم';
  examples: string[];
  formulas?: string[];
  law_refs?: Array<{ article: string; source: string }>;
  related_terms: string[];
  related_tools: string[];
  last_updated: string;
  views: number;
  badge?: 'جديد' | 'مُحدّث' | 'شائع';
  locale: string;
}

const HRGlossary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isArabic = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [selectedLetter, setSelectedLetter] = useState('all');

  // Sample HR terms data
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      slug: 'أتمتة-الموارد-البشرية',
      title: 'أتمتة الموارد البشرية',
      letter: 'أ',
      summary: 'تحويل عمليات الموارد البشرية من ورقية إلى رقمية مؤتمتة لتوفير الوقت والجهد',
      body: 'أتمتة الموارد البشرية هي تحويل العمليات الورقية واليدوية إلى أنظمة رقمية تنفذ المهام الروتينية تلقائيًا، مما يتيح للموظفين التفرغ للمهام الاستراتيجية وتحسين كفاءة العمل.',
      synonyms: ['ميكنة الموارد البشرية', 'أتمتة HR', 'الأتمتة الإدارية'],
      category: ['أنظمة', 'تقنية'],
      level: 'أساسي',
      examples: ['استخدام نظام حضور وانصراف آلي بدل التسجيل اليدوي', 'تطبيق طلبات الإجازة الإلكترونية'],
      related_terms: ['الخدمة الذاتية للموظف', 'تحليلات الموارد البشرية'],
      related_tools: ['/hr-tools/salary-calculator', '/hr-tools/vacation-balance'],
      last_updated: '2025-09-14',
      views: 342,
      badge: 'شائع',
      locale: 'ar-SA'
    },
    {
      id: '2',
      slug: 'الخدمة-الذاتية-للموظف',
      title: 'الخدمة الذاتية للموظف',
      letter: 'ا',
      summary: 'منح الموظف صلاحية الوصول لبياناته وطلباته وإنجاز بعض المهام دون الرجوع للموارد البشرية',
      body: 'الخدمة الذاتية للموظف تمكن الموظفين من الوصول إلى معلوماتهم الشخصية وإدارة طلباتهم وتحديث بياناتهم من خلال منصة إلكترونية، مما يقلل العبء على قسم الموارد البشرية.',
      synonyms: ['ESS', 'Employee Self Service', 'الخدمة الذاتية'],
      category: ['أنظمة', 'خدمات'],
      level: 'أساسي',
      examples: ['تحديث البيانات الشخصية', 'طلب إجازة', 'استعلام عن رصيد الإجازات', 'تحميل المستندات'],
      related_terms: ['أتمتة الموارد البشرية', 'بوابة الموظفين'],
      related_tools: ['/hr-tools/vacation-balance'],
      last_updated: '2025-09-10',
      views: 289,
      badge: 'مُحدّث',
      locale: 'ar-SA'
    },
    {
      id: '3',
      slug: 'تحليلات-الموارد-البشرية',
      title: 'تحليلات الموارد البشرية',
      letter: 'ت',
      summary: 'استخدام البيانات لاستخراج رؤى تساعد في تحسين اتخاذ القرار في الموارد البشرية',
      body: 'تحليلات الموارد البشرية تستخدم البيانات والإحصائيات لفهم الاتجاهات وتحليل أداء الموظفين واتخاذ قرارات مدروسة تساهم في تحسين الأداء التنظيمي.',
      synonyms: ['HR Analytics', 'People Analytics', 'تحليل بيانات الموظفين'],
      category: ['تحليلات', 'استراتيجية'],
      level: 'متقدم',
      examples: ['تحليل معدل دوران الموظفين', 'قياس مستوى رضا الموظفين', 'تحليل كفاءة التوظيف'],
      related_terms: ['مؤشرات الأداء الرئيسية', 'إدارة المواهب'],
      related_tools: ['/hr-tools/nitaqat-calculator'],
      last_updated: '2025-09-12',
      views: 156,
      badge: 'جديد',
      locale: 'ar-SA'
    },
    {
      id: '4',
      slug: 'مكافأة-نهاية-الخدمة',
      title: 'مكافأة نهاية الخدمة',
      letter: 'م',
      summary: 'مبلغ مالي يُدفع للموظف عند انتهاء خدمته وفقاً لنظام العمل السعودي',
      body: 'مكافأة نهاية الخدمة هي مبلغ مالي محدد بموجب نظام العمل السعودي يُستحق للموظف عند انتهاء علاقته الوظيفية، وتحسب بناءً على آخر أجر ومدة الخدمة وسبب الانتهاء.',
      synonyms: ['مكافأة الخدمة', 'End of Service Award', 'مستحقات نهاية الخدمة'],
      category: ['قانون', 'رواتب'],
      level: 'أساسي',
      examples: ['نصف شهر عن كل سنة من السنوات الخمس الأولى', 'شهر كامل عن كل سنة زائدة عن الخمس سنوات'],
      law_refs: [
        { article: '84', source: 'نظام العمل السعودي' },
        { article: '85', source: 'نظام العمل السعودي' }
      ],
      related_terms: ['عقد العمل', 'فترة الخدمة'],
      related_tools: ['/end-of-service-calculator'],
      last_updated: '2025-09-14',
      views: 567,
      badge: 'شائع',
      locale: 'ar-SA'
    },
    {
      id: '5',
      slug: 'نظام-الأهداف-والنتائج',
      title: 'نظام الأهداف والنتائج الرئيسية (OKRs)',
      letter: 'ن',
      summary: 'منهجية تربط أهداف الشركة بنتائج قابلة للقياس خلال فترة زمنية محددة',
      body: 'نظام الأهداف والنتائج الرئيسية (OKRs) هو إطار عمل لتحديد الأهداف وتتبع النتائج، حيث يتم تقسيم الأهداف الاستراتيجية إلى نتائج قابلة للقياس ومؤشرات أداء واضحة.',
      synonyms: ['OKRs', 'Objectives and Key Results', 'الأهداف والمؤشرات'],
      category: ['أداء', 'استراتيجية'],
      level: 'متقدم',
      examples: ['زيادة رضا العملاء بنسبة 15%', 'تقليل دوران الموظفين إلى أقل من 5%'],
      related_terms: ['إدارة الأداء', 'مؤشرات الأداء الرئيسية'],
      related_tools: [],
      last_updated: '2025-09-11',
      views: 234,
      locale: 'ar-SA'
    },
    {
      id: '6',
      slug: 'برنامج-حماية-الأجور',
      title: 'برنامج حماية الأجور (WPS)',
      letter: 'ب',
      summary: 'نظام إلكتروني لضمان دفع الرواتب للعمال في المواعيد المحددة وفق نظام العمل',
      body: 'برنامج حماية الأجور هو نظام إلكتروني تشرف عليه وزارة الموارد البشرية لضمان دفع أجور العمال في المواعيد المحددة والمبالغ الصحيحة وفقاً لعقود العمل.',
      synonyms: ['WPS', 'Wage Protection System', 'نظام حماية الرواتب'],
      category: ['قانون', 'رواتب'],
      level: 'أساسي',
      examples: ['رفع ملف SIF شهرياً', 'دفع الرواتب خلال المواعيد المحددة'],
      law_refs: [
        { article: '90', source: 'نظام العمل السعودي' }
      ],
      related_terms: ['عقد العمل', 'الراتب الأساسي'],
      related_tools: ['/hr-tools/wps-checker', '/hr-tools/salary-calculator'],
      last_updated: '2025-09-13',
      views: 445,
      badge: 'شائع',
      locale: 'ar-SA'
    },
    {
      id: '7',
      slug: 'التأمينات-الاجتماعية',
      title: 'التأمينات الاجتماعية (GOSI)',
      letter: 'ت',
      summary: 'نظام حكومي يوفر الحماية الاجتماعية للعاملين وأسرهم من خلال مساهمات شهرية',
      body: 'التأمينات الاجتماعية نظام يهدف إلى توفير الحماية الاجتماعية والاقتصادية للمؤمن عليهم وأفراد أسرهم، من خلال تقديم معاشات وتعويضات عند التقاعد أو العجز أو الوفاة.',
      synonyms: ['GOSI', 'General Organization for Social Insurance', 'التأمينات'],
      category: ['قانون', 'رواتب', 'تأمين'],
      level: 'أساسي',
      examples: ['خصم 10% من الراتب للسعوديين', '2% للمقيمين على المخاطر المهنية'],
      law_refs: [
        { article: '1', source: 'نظام التأمينات الاجتماعية' }
      ],
      related_terms: ['الراتب الخاضع للتأمين', 'التقاعد المبكر'],
      related_tools: ['/hr-tools/salary-calculator'],
      last_updated: '2025-09-14',
      views: 678,
      badge: 'شائع',
      locale: 'ar-SA'
    },
    {
      id: '8',
      slug: 'برنامج-النطاقات',
      title: 'برنامج النطاقات (نتقات)',
      letter: 'ب',
      summary: 'برنامج حكومي لتشجيع توظيف السعوديين وتصنيف المنشآت حسب نسبة السعودة',
      body: 'برنامج النطاقات يهدف إلى زيادة فرص العمل للسعوديين من خلال تصنيف المنشآت إلى نطاقات ملونة (بلاتيني، أخضر، أصفر، أحمر) بناءً على نسبة التوطين.',
      synonyms: ['نتقات', 'Nitaqat', 'برنامج التوطين'],
      category: ['قانون', 'توظيف'],
      level: 'أساسي',
      examples: ['النطاق الأخضر: نسبة سعودة عالية', 'النطاق الأحمر: نسبة سعودة منخفضة'],
      related_terms: ['السعودة', 'توطين الوظائف'],
      related_tools: ['/hr-tools/nitaqat-calculator'],
      last_updated: '2025-09-12',
      views: 523,
      badge: 'مُحدّث',
      locale: 'ar-SA'
    }
  ];

  // Arabic letters for indexing
  const arabicLetters = [
    'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
  ];

  const categories = [
    { value: 'all', label: 'جميع المجالات' },
    { value: 'أنظمة', label: 'أنظمة وتقنية' },
    { value: 'قانون', label: 'قانون ولوائح' },
    { value: 'رواتب', label: 'رواتب ومكافآت' },
    { value: 'توظيف', label: 'توظيف واستقطاب' },
    { value: 'أداء', label: 'أداء وتطوير' },
    { value: 'تحليلات', label: 'تحليلات وبيانات' }
  ];

  const levels = [
    { value: 'all', label: 'جميع المستويات' },
    { value: 'أساسي', label: 'أساسي' },
    { value: 'متقدم', label: 'متقدم' }
  ];

  const sortOptions = [
    { value: 'alphabetical', label: 'ترتيب أبجدي' },
    { value: 'views', label: 'الأكثر مشاهدة' },
    { value: 'updated', label: 'الأحدث تحديثاً' }
  ];

  // Filtered and sorted terms
  const filteredTerms = useMemo(() => {
    let filtered = glossaryTerms.filter(term => {
      const matchesSearch = !searchQuery || 
        term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.synonyms.some(syn => syn.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        term.category.includes(selectedCategory);
      
      const matchesLevel = selectedLevel === 'all' || 
        term.level === selectedLevel;
      
      const matchesLetter = selectedLetter === 'all' || 
        term.letter === selectedLetter;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesLetter;
    });

    // Sort terms
    switch (sortBy) {
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
        break;
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, selectedLetter, sortBy]);

  // Group terms by letter
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: GlossaryTerm[] } = {};
    filteredTerms.forEach(term => {
      if (!groups[term.letter]) {
        groups[term.letter] = [];
      }
      groups[term.letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const handleTermClick = (slug: string) => {
    navigate(`/hr-tools/hr-glossary/${slug}`);
  };

  const handleCopyTerm = (term: GlossaryTerm) => {
    navigator.clipboard.writeText(`${term.title}: ${term.summary}`);
    toast({
      title: "تم النسخ",
      description: "تم نسخ تعريف المصطلح بنجاح"
    });
  };

  const handleTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <BoudLogo variant="icon" size="md" />
                <span className="font-bold text-xl text-foreground hidden sm:block">بُعد</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6 space-x-reverse mr-8">
                <Button variant="ghost" onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground">
                  المعرفة
                </Button>
                <Button variant="ghost" onClick={() => navigate('/hr-tools')} className="text-muted-foreground hover:text-foreground">
                  الأدوات
                </Button>
                <Button variant="ghost" onClick={() => navigate('/support')} className="text-muted-foreground hover:text-foreground">
                  الدعم
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={() => navigate('/demo-request')}>
                اطلب عرض
              </Button>
              <Button size="sm" onClick={() => navigate('/subscription-packages')}>
                🚀 جرّب بُعد HR
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
              📚 معجم مصطلحات الموارد البشرية
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              دليل شامل لأهم مفاهيم الموارد البشرية باللغة العربية مع تعريفات واضحة وأمثلة تطبيقية
            </p>

            {/* Search and Filters Toolbar */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="ابحث في المصطلحات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
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

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Alphabetical Index */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Button
                  variant={selectedLetter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLetter('all')}
                >
                  الكل
                </Button>
                {arabicLetters.map(letter => (
                  <Button
                    key={letter}
                    variant={selectedLetter === letter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLetter(letter)}
                    className="min-w-[40px]"
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Terms Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 text-muted-foreground text-sm">
              عرض {filteredTerms.length} مصطلح من أصل {glossaryTerms.length}
            </div>

            {Object.entries(groupedTerms).map(([letter, terms]) => (
              <div key={letter} className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ml-4">
                    <span className="text-2xl font-bold text-primary">{letter}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">حرف {letter}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {terms.map((term) => (
                    <Card key={term.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex gap-2">
                            {term.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {term.badge}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {term.level}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {term.title}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-3">
                          {term.summary}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {term.category.slice(0, 2).map(cat => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{term.views}</span>
                          <Clock className="h-3 w-3 mr-2" />
                          <span>آخر تحديث: {new Date(term.last_updated).toLocaleDateString('ar-SA')}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleTermClick(term.slug)}
                          >
                            <BookOpen className="h-4 w-4 ml-1" />
                            اقرأ المزيد
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleTTS(term.summary)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCopyTerm(term)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">لم يتم العثور على مصطلحات مطابقة</p>
                <p className="text-sm text-muted-foreground">جرّب تعديل معايير البحث أو الفلاتر</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTAs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ساهم في تطوير المعجم
            </h2>
            <p className="text-muted-foreground mb-8">
              هل لديك مصطلح تود إضافته؟ أو تحسين لأحد التعريفات الموجودة؟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/hr-tools/suggest-term')}>
                <Plus className="h-5 w-5 ml-2" />
                اقترح مصطلحاً جديداً
              </Button>
              
              <Button size="lg" variant="outline" onClick={() => navigate('/demo-request')}>
                🚀 اطلب عرضاً تجريبياً من بُعد HR
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HRGlossary;