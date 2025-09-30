import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Download, BookOpen, ArrowLeft, FileText, Clock, Star, Calendar, Filter, Mail, Phone, MapPin } from 'lucide-react';
import { Building2, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { Breadcrumb } from '@/components/Breadcrumb';
import buodLogo from '@/assets/buod-logo-white.png';
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
  const greenPapers: GreenPaper[] = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }];
  const categories = ['رواتب', 'امتثال', 'توظيف', 'أداء', 'ثقافة', 'تحليلات', 'تقنية', 'تطوير'];
  const levels = ['أساسي', 'متقدم'];
  const industries = ['تقنية', 'صحي', 'تعليم', 'ضيافة', 'تجزئة'];
  useEffect(() => {
    let filtered = [...greenPapers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(paper => paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || paper.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(paper => paper.category.includes(selectedCategory));
    }

    // Apply level filter
    if (selectedLevel && selectedLevel !== 'all') {
      filtered = filtered.filter(paper => paper.level === selectedLevel);
    }

    // Apply industry filter
    if (selectedIndustry && selectedIndustry !== 'all') {
      filtered = filtered.filter(paper => paper.industry.includes(selectedIndustry));
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
  return <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-full h-full bg-repeat animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
          backgroundSize: '60px 60px'
        }}></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-card to-black backdrop-blur-xl border-b border-border shadow-2xl shadow-accent/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent opacity-80"></div>
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
                <BookOpen className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">📗 الأوراق البيضاء</h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  دلائل ومراجع احترافية
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-card/60 to-black/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl shadow-accent/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    الأوراق المتاحة
                  </span>
                  <span className="text-sm text-accent font-bold">
                    {filteredPapers.length}
                  </span>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-card/30 backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{filteredPapers.length} ورقة</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">محدّث</span>
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
            <Breadcrumb items={[{
            label: 'الرئيسية',
            path: '/'
          }, {
            label: 'الأوراق الخضراء',
            path: '/green-papers'
          }]} />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img src="/boud-logo-white.png" alt="شعار بُعد" className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">📗 أوراق البيضاء عن الموارد البشرية</h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              دلائل ومراجع عملية تساعد فرق الموارد البشرية على اتخاذ قراراتٍ أفضل
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Professional Search Bar */}
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5 z-10" />
                <Input placeholder="ابحث في الأوراق الخضراء..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pr-12 pl-6 h-14 bg-gradient-to-r from-card/80 to-black/60 backdrop-blur-xl border border-border rounded-2xl text-white placeholder-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-accent/30 transition-all duration-300 shadow-xl hover:shadow-accent/20" />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedLevel('');
              setSelectedIndustry('');
            }} className="bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/20 hover:border-accent/70 transition-all duration-300 shadow-lg hover:shadow-accent/25 px-6 h-12">
                <Search className="w-4 h-4 mr-2" />
                مسح البحث
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-auto min-w-[150px] bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:border-accent/70 transition-all duration-300">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map(cat => <SelectItem key={cat} value={cat} className="text-white hover:bg-accent/20">{cat}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-auto min-w-[150px] bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:border-accent/70 transition-all duration-300">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">جميع المستويات</SelectItem>
                {levels.map(level => <SelectItem key={level} value={level} className="text-white hover:bg-accent/20">{level}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Industry Filter */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-auto min-w-[150px] bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:border-accent/70 transition-all duration-300">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="القطاع" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">جميع القطاعات</SelectItem>
                {industries.map(industry => <SelectItem key={industry} value={industry} className="text-white hover:bg-accent/20">{industry}</SelectItem>)}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-auto min-w-[150px] bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:border-accent/70 transition-all duration-300">
                <SelectValue placeholder="ترتيب" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="latest" className="text-white hover:bg-accent/20">الأحدث</SelectItem>
                <SelectItem value="downloads" className="text-white hover:bg-accent/20">الأكثر تنزيلاً</SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-accent/20">الأعلى تقييماً</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Platform Features - Without Title */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">إدارة شاملة</CardTitle>
                <CardDescription className="text-muted-foreground">
                  نظام متكامل يغطي جميع جوانب الموارد البشرية من التوظيف حتى التقاعد
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">امتثال كامل</CardTitle>
                <CardDescription className="text-muted-foreground">
                  متوافق مع جميع الأنظمة واللوائح السعودية والخليجية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">تقارير ذكية</CardTitle>
                <CardDescription className="text-muted-foreground">
                  تحليلات متقدمة وتقارير تفصيلية لاتخاذ قرارات مبنية على البيانات
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">توفير الوقت</CardTitle>
                <CardDescription className="text-muted-foreground">
                  أتمتة المهام الروتينية وتقليل الوقت المستغرق في العمليات الإدارية
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">تجربة مستخدم متميزة</CardTitle>
                <CardDescription className="text-muted-foreground">
                  واجهة سهلة الاستخدام ومتاحة على جميع الأجهزة
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">دعم ومساعدة</CardTitle>
                <CardDescription className="text-muted-foreground">
                  فريق دعم متخصص ومصادر تعليمية شاملة متاحة دائماً
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="relative">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
              {filteredPapers.length} ورقة متاحة
            </h2>
            <p className="text-gray-300 text-lg">
              اختر الورقة التي تناسب احتياجاتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map(paper => <div key={paper.id} className="group relative overflow-hidden bg-gradient-to-br from-card/50 to-black/70 backdrop-blur-xl rounded-3xl border border-border shadow-2xl shadow-accent/10 hover:shadow-accent/25 transition-all duration-500 hover:scale-105 hover:border-accent/60">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Image Section */}
                  <div className="relative">
                    <img src={paper.cover_url} alt={paper.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                      {paper.isNew && <Badge className="bg-gradient-to-r from-success to-success text-white border-0 shadow-lg">جديد</Badge>}
                      {paper.isUpdated && <Badge className="bg-gradient-to-r from-accent to-accent text-black border-0 shadow-lg">محدث</Badge>}
                      <Badge className="bg-gradient-to-r from-accent/80 to-accent/80 text-black border-0 shadow-lg">{paper.level}</Badge>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                      {paper.category.map(cat => <Badge key={cat} className="bg-gradient-to-r from-accent/20 to-accent/20 text-accent border border-accent/40 text-xs">
                          {cat}
                        </Badge>)}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
                      {paper.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-text-secondary transition-colors duration-300 line-clamp-3">
                      {paper.excerpt}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {paper.reading_minutes} دقيقة
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {paper.pages} صفحة
                        </div>
                        {paper.rating && <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-white font-semibold">{paper.rating}</span>
                          </div>}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="default" size="sm" onClick={() => navigate(`/green-papers/${paper.slug}`)} className="flex-1 bg-gradient-to-r from-accent/20 to-accent/20 text-accent border border-accent/40 hover:bg-gradient-to-r hover:from-accent hover:to-accent hover:text-black hover:border-accent transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/25">
                        
                        اقرأ التفاصيل
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                    // Handle direct download with lead capture
                    console.log('Download:', paper.title);
                  }} className="bg-gradient-to-r from-card/50 to-black/30 border border-border text-white hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/20 hover:border-accent/70 transition-all duration-300">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-card/60 to-black/40 backdrop-blur-xl rounded-3xl border border-border shadow-2xl shadow-accent/10 p-8 text-center">
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-text-secondary to-white bg-clip-text text-transparent mb-4">
              📩 أرسل لي أحدث الأوراق
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              اشترك في نشرتنا البريدية واحصل على أحدث الأوراق والدلائل العملية أولاً بأول
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="أدخل بريدك الإلكتروني" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} className="flex-1 bg-gradient-to-r from-card/80 to-black/60 backdrop-blur-xl border border-border rounded-xl text-white placeholder-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-accent/30 transition-all duration-300" />
              <Button onClick={handleSubscribeNewsletter} className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black border-0 shadow-lg hover:shadow-accent/25 transition-all duration-300 px-8">
                <Mail className="w-4 h-4 ml-2" />
                اشترك
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 منصة بُعد للموارد البشرية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </main>
    </div>;
};
export default GreenPapers;