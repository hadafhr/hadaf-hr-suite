import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Download, BookOpen, ArrowLeft, FileText, Clock, Star, Calendar, Filter, Mail, Phone, MapPin } from 'lucide-react';
import { Building2, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';

interface GreenPaper {
  id: string;
  slug: string;
  title: string;
  cover_url: string;
  excerpt: string;
  category: string[];
  level: string;
  industry: string[];
  reading_minutes: number;
  pages: number;
  pdf_url: string;
  published_at: string;
  updated_at: string;
  downloads: number;
  views: number;
  isNew?: boolean;
  isUpdated?: boolean;
  rating?: number;
}

const GreenPapers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filteredPapers, setFilteredPapers] = useState<GreenPaper[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Sample data
  const greenPapers: GreenPaper[] = [
    {
      id: '1',
      slug: 'employee-file-saudi',
      title: 'ملف الموظف في السعودية: الامتثال والتوثيق والتحول الرقمي',
      cover_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      excerpt: 'دليل عملي لإنشاء وإدارة ملفات الموظفين وفق الأنظمة السعودية مع سياسات وضوابط حديثة.',
      category: ['امتثال', 'رواتب'],
      level: 'أساسي',
      industry: ['تقنية', 'تجزئة'],
      reading_minutes: 18,
      pages: 28,
      pdf_url: '/sample.pdf',
      published_at: '2025-01-10',
      updated_at: '2025-01-10',
      downloads: 1250,
      views: 3400,
      isNew: true,
      rating: 4.8
    },
    {
      id: '2',
      slug: 'hr-certifications-global',
      title: 'خارطة شهادات الموارد البشرية العالمية (SHRM / PHR / CIPD)',
      cover_url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=250&fit=crop',
      excerpt: 'دليل شامل للشهادات المهنية في الموارد البشرية وكيفية الحصول عليها وقيمتها المضافة للمهنيين.',
      category: ['تطوير'],
      level: 'متقدم',
      industry: ['تقنية', 'صحي', 'تعليم'],
      reading_minutes: 25,
      pages: 35,
      pdf_url: '/sample.pdf',
      published_at: '2025-01-05',
      updated_at: '2025-01-08',
      downloads: 890,
      views: 2100,
      isUpdated: true,
      rating: 4.6
    },
    {
      id: '3',
      slug: 'cloud-hr-roi',
      title: 'لماذا تنتقل إلى نظام HR سحابي؟ (ROI / الأمان / التوسع)',
      cover_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      excerpt: 'تحليل شامل لفوائد الانتقال إلى أنظمة الموارد البشرية السحابية مع دراسات حالة وحسابات العائد على الاستثمار.',
      category: ['تقنية', 'تحليلات'],
      level: 'متقدم',
      industry: ['تقنية', 'ضيافة'],
      reading_minutes: 22,
      pages: 32,
      pdf_url: '/sample.pdf',
      published_at: '2024-12-20',
      updated_at: '2024-12-20',
      downloads: 1450,
      views: 4200,
      rating: 4.9
    },
    {
      id: '4',
      slug: 'gulf-hr-compliance',
      title: 'امتثال الموارد البشرية في الخليج (لوائح / غرامات / حلول)',
      cover_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
      excerpt: 'دليل مفصل للوائح والقوانين المتعلقة بالموارد البشرية في دول الخليج والغرامات المحتملة وطرق الحماية.',
      category: ['امتثال'],
      level: 'أساسي',
      industry: ['تقنية', 'صحي', 'تجزئة'],
      reading_minutes: 30,
      pages: 45,
      pdf_url: '/sample.pdf',
      published_at: '2024-12-15',
      updated_at: '2025-01-02',
      downloads: 2100,
      views: 5600,
      isUpdated: true,
      rating: 4.7
    },
    {
      id: '5',
      slug: 'emotional-intelligence-work',
      title: 'الذكاء العاطفي في العمل: بناء فرق أكثر فعالية',
      cover_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
      excerpt: 'كيفية تطبيق مبادئ الذكاء العاطفي في بيئة العمل لتحسين الأداء والتعاون بين أعضاء الفريق.',
      category: ['ثقافة', 'أداء'],
      level: 'أساسي',
      industry: ['تقنية', 'تعليم', 'ضيافة'],
      reading_minutes: 15,
      pages: 22,
      pdf_url: '/sample.pdf',
      published_at: '2024-12-10',
      updated_at: '2024-12-10',
      downloads: 750,
      views: 1800,
      rating: 4.5
    },
    {
      id: '6',
      slug: 'enps-employee-index',
      title: 'مؤشر eNPS للموظفين: قياس الولاء والرضا',
      cover_url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
      excerpt: 'دليل عملي لفهم وتطبيق مؤشر صافي نقاط الترويج للموظفين كأداة لقياس مستوى الرضا والولاء.',
      category: ['تحليلات', 'أداء'],
      level: 'متقدم',
      industry: ['تقنية', 'صحي'],
      reading_minutes: 20,
      pages: 28,
      pdf_url: '/sample.pdf',
      published_at: '2024-12-05',
      updated_at: '2024-12-05',
      downloads: 950,
      views: 2300,
      rating: 4.4
    }
  ];

  const categories = ['رواتب', 'امتثال', 'توظيف', 'أداء', 'ثقافة', 'تحليلات', 'تقنية', 'تطوير'];
  const levels = ['أساسي', 'متقدم'];
  const industries = ['تقنية', 'صحي', 'تعليم', 'ضيافة', 'تجزئة'];

  useEffect(() => {
    let filtered = [...greenPapers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(paper => 
        paper.category.includes(selectedCategory)
      );
    }

    // Apply level filter
    if (selectedLevel && selectedLevel !== 'all') {
      filtered = filtered.filter(paper => paper.level === selectedLevel);
    }

    // Apply industry filter
    if (selectedIndustry && selectedIndustry !== 'all') {
      filtered = filtered.filter(paper => 
        paper.industry.includes(selectedIndustry)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilteredPapers(filtered);
  }, [searchQuery, selectedCategory, selectedLevel, selectedIndustry, sortBy]);

  const handleSubscribeNewsletter = () => {
    if (!newsletterEmail) return;
    // Here you would typically send this to your API
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
    // Show success message
  };

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-background/98 backdrop-blur-md border-b border-border/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo and Back Button */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">العودة</span>
              </Button>
              <BoudLogo showText size="header" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="/products" className="text-sm font-medium hover:text-primary transition-colors">المنتجات</a>
              <a href="/solutions" className="text-sm font-medium hover:text-primary transition-colors">الحلول</a>
              <a href="/knowledge" className="text-sm font-medium hover:text-primary transition-colors">المعرفة</a>
              <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">عن بُعد</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary-glow text-white">
                اطلب عرضًا
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary-glow/10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              📗 أوراق خضراء عن الموارد البشرية
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              دلائل ومراجع عملية تساعد فرق الموارد البشرية على اتخاذ قراراتٍ أفضل.
            </p>

            {/* Search and Filters */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/20">
              <div className="grid md:grid-cols-5 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="ابحث في الأوراق..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستويات</SelectItem>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="ترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">الأحدث</SelectItem>
                    <SelectItem value="downloads">الأكثر تنزيلاً</SelectItem>
                    <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Filters */}
              <div className="mt-4 flex flex-wrap gap-3">
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-auto">
                    <Filter className="w-4 h-4 ml-2" />
                    <SelectValue placeholder="القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع القطاعات</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {filteredPapers.length} ورقة متاحة
            </h2>
            <p className="text-muted-foreground">
              اختر الورقة التي تناسب احتياجاتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={paper.cover_url}
                    alt={paper.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    {paper.isNew && <Badge className="bg-green-500 text-white">جديد</Badge>}
                    {paper.isUpdated && <Badge className="bg-blue-500 text-white">محدث</Badge>}
                    <Badge variant="secondary">{paper.level}</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {paper.category.map(cat => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {paper.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {paper.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {paper.reading_minutes} دقيقة
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {paper.pages} صفحة
                      </div>
                      {paper.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {paper.rating}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => navigate(`/green-papers/${paper.slug}`)}
                      className="flex-1"
                    >
                      <BookOpen className="w-4 h-4 ml-2" />
                      اقرأ التفاصيل
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Handle direct download with lead capture
                        console.log('Download:', paper.title);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              📩 أرسل لي أحدث الأوراق
            </h2>
            <p className="text-muted-foreground mb-8">
              اشترك في نشرتنا البريدية واحصل على أحدث الأوراق والدلائل العملية أولاً بأول
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubscribeNewsletter} className="px-8">
                اشترك
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              أسئلة شائعة
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-right">ما هي الأوراق الخضراء؟</AccordionTrigger>
                <AccordionContent className="text-right">
                  الأوراق الخضراء هي مجموعة من الدلائل والمراجع العملية المتخصصة في مجال الموارد البشرية، تهدف إلى مساعدة المهنيين واتخاذ قرارات مدروسة ومبنية على أفضل الممارسات العالمية والمحلية.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-right">هل هي مجانية؟</AccordionTrigger>
                <AccordionContent className="text-right">
                  نعم، جميع الأوراق الخضراء متاحة للتحميل مجاناً. نؤمن في بُعد أن المعرفة يجب أن تكون متاحة للجميع لتطوير مجال الموارد البشرية في المنطقة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-right">من أين نأتي بالمصادر؟</AccordionTrigger>
                <AccordionContent className="text-right">
                  نعتمد على مصادر موثوقة مثل الهيئة العامة للموارد البشرية، التأمينات الاجتماعية، أفضل الممارسات العالمية من منظمات مثل SHRM و CIPD، بالإضافة إلى خبرة فريقنا المتخصص في الموارد البشرية.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-primary-glow py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              هل تريد حلولاً مخصصة لشركتك؟
            </h2>
            <p className="text-white/90 text-lg mb-8">
              تواصل معنا للحصول على استشارة مجانية حول كيفية تطبيق هذه المفاهيم في بيئة عملك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                اطلب عرضًا توضيحيًا
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-white border-white hover:bg-white hover:text-primary">
                احجز اجتماعًا مع خبير بُعد
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <BoudLogo showText />
              <p className="text-sm text-muted-foreground">
                منصة بُعد للموارد البشرية - الحل الشامل لإدارة رأس المال البشري
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">المحتوى والأدوات</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">أوراق خضراء</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">أدوات الموارد البشرية</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">مدونة بُعد</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">دراسات الحالة</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">المنتجات</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">إدارة الموظفين</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">الرواتب والمزايا</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">الحضور والانصراف</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">تقييم الأداء</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +966 11 123 4567
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  info@boudhr.com
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  الرياض، المملكة العربية السعودية
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2025 بُعد للموارد البشرية. جميع الحقوق محفوظة.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary">سياسة الخصوصية</a>
                <a href="#" className="hover:text-primary">الشروط والأحكام</a>
                <a href="#" className="hover:text-primary">سياسة الاستخدام</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GreenPapers;