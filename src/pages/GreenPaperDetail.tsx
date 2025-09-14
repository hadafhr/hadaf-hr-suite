import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Download, 
  Star, 
  Calendar, 
  Share2, 
  Copy, 
  BookOpen,
  ExternalLink,
  ChevronRight,
  Eye,
  Users,
  Building
} from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { toast } from 'sonner';

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
  summary: string;
  key_takeaways: string[];
  table_of_contents: { title: string; anchor: string }[];
  preview_pages: number[];
  sources: { title: string; url: string }[];
}

const GreenPaperDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<GreenPaper | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [relatedPapers, setRelatedPapers] = useState<GreenPaper[]>([]);
  
  // Lead capture form state
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    company: '',
    companySize: '',
    industry: '',
    agreeToPrivacy: false
  });

  // Mock data - in a real app, this would come from an API
  const paperData: GreenPaper = {
    id: '1',
    slug: 'employee-file-saudi',
    title: 'ملف الموظف في السعودية: الامتثال والتوثيق والتحول الرقمي',
    cover_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
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
    rating: 4.8,
    summary: `هذا الدليل الشامل يوفر إطار عمل متكامل لإنشاء وإدارة ملفات الموظفين في المملكة العربية السعودية وفقاً للأنظمة واللوائح المعمول بها. يغطي الدليل جميع الجوانب الأساسية من التوثيق المطلوب، إجراءات الحفظ والأرشفة، الامتثال للقوانين المحلية، وكيفية الاستفادة من التقنيات الرقمية لتحسين كفاءة إدارة الملفات.

يتناول الدليل بالتفصيل متطلبات وزارة الموارد البشرية والتنمية الاجتماعية، التأمينات الاجتماعية، ومتطلبات الزكاة والضريبة والجمارك، مع توفير نماذج عملية وقوالب جاهزة للاستخدام المباشر.

كما يسلط الضوء على أفضل الممارسات العالمية في إدارة ملفات الموظفين ويوضح كيفية تطبيقها في البيئة السعودية مع مراعاة الخصوصيات الثقافية والتنظيمية المحلية.`,
    key_takeaways: [
      'فهم شامل لمتطلبات القوانين السعودية في إدارة ملفات الموظفين',
      'قوالب جاهزة للوثائق المطلوبة وفق المعايير المحلية والعالمية',
      'إجراءات عملية للتحول من الملفات الورقية إلى النظام الرقمي',
      'ضمانات الامتثال للوائح حماية البيانات والخصوصية',
      'استراتيجيات فعالة لأرشفة وحفظ الوثائق طويلة المدى',
      'مؤشرات أداء رئيسية لقياس كفاءة إدارة الملفات'
    ],
    table_of_contents: [
      { title: 'مقدمة عن إدارة ملفات الموظفين', anchor: '#introduction' },
      { title: 'الإطار التنظيمي السعودي', anchor: '#regulatory-framework' },
      { title: 'الوثائق الأساسية المطلوبة', anchor: '#required-documents' },
      { title: 'إجراءات الإنشاء والتحديث', anchor: '#creation-procedures' },
      { title: 'التحول الرقمي وأتمتة العمليات', anchor: '#digital-transformation' },
      { title: 'ضمانات الأمان وحماية البيانات', anchor: '#data-protection' },
      { title: 'مؤشرات الأداء والتقييم', anchor: '#performance-metrics' },
      { title: 'دراسات حالة وأمثلة تطبيقية', anchor: '#case-studies' }
    ],
    preview_pages: [1, 2, 3, 4],
    sources: [
      { title: 'وزارة الموارد البشرية والتنمية الاجتماعية', url: 'https://www.hrsd.gov.sa' },
      { title: 'التأمينات الاجتماعية', url: 'https://www.gosi.gov.sa' },
      { title: 'الزكاة والضريبة والجمارك', url: 'https://zatca.gov.sa' },
      { title: 'الهيئة السعودية للبيانات والذكاء الاصطناعي', url: 'https://sdaia.gov.sa' }
    ]
  };

  const mockRelatedPapers: GreenPaper[] = [
    {
      id: '2',
      slug: 'hr-certifications-global',
      title: 'خارطة شهادات الموارد البشرية العالمية',
      cover_url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=250&fit=crop',
      excerpt: 'دليل شامل للشهادات المهنية في الموارد البشرية.',
      category: ['تطوير'],
      level: 'متقدم',
      industry: ['تقنية', 'صحي'],
      reading_minutes: 25,
      pages: 35,
      pdf_url: '/sample.pdf',
      published_at: '2025-01-05',
      updated_at: '2025-01-08',
      downloads: 890,
      views: 2100,
      rating: 4.6,
      summary: '',
      key_takeaways: [],
      table_of_contents: [],
      preview_pages: [],
      sources: []
    },
    {
      id: '3',
      slug: 'cloud-hr-roi',
      title: 'لماذا تنتقل إلى نظام HR سحابي؟',
      cover_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      excerpt: 'تحليل شامل لفوائد الانتقال إلى أنظمة الموارد البشرية السحابية.',
      category: ['تقنية'],
      level: 'متقدم',
      industry: ['تقنية'],
      reading_minutes: 22,
      pages: 32,
      pdf_url: '/sample.pdf',
      published_at: '2024-12-20',
      updated_at: '2024-12-20',
      downloads: 1450,
      views: 4200,
      rating: 4.9,
      summary: '',
      key_takeaways: [],
      table_of_contents: [],
      preview_pages: [],
      sources: []
    }
  ];

  useEffect(() => {
    // In a real app, fetch paper data from API based on slug
    if (slug === 'employee-file-saudi') {
      setPaper(paperData);
      setRelatedPapers(mockRelatedPapers);
    }
    
    // Check if user has already provided lead info
    const hasProvidedLead = localStorage.getItem('boud_lead_captured') === 'true';
    setLeadCaptured(hasProvidedLead);
  }, [slug]);

  const handleDownload = () => {
    if (!leadCaptured) {
      setShowLeadCapture(true);
    } else {
      // Direct download
      performDownload();
    }
  };

  const handleLeadSubmit = () => {
    if (!leadForm.fullName || !leadForm.email || !leadForm.agreeToPrivacy) {
      toast.error('يرجى ملء جميع الحقول المطلوبة والموافقة على سياسة الخصوصية');
      return;
    }

    // Save lead data (in real app, send to API)
    console.log('Lead captured:', leadForm);
    localStorage.setItem('boud_lead_captured', 'true');
    localStorage.setItem('boud_lead_data', JSON.stringify(leadForm));
    
    setLeadCaptured(true);
    setShowLeadCapture(false);
    performDownload();
    toast.success('تم حفظ بياناتك بنجاح، جاري تنزيل الملف...');
  };

  const performDownload = () => {
    // In a real app, this would trigger actual PDF download
    console.log('Downloading PDF:', paper?.title);
    toast.success('تم بدء التنزيل');
    
    // Track download analytics
    if (paper) {
      // Update download count
      console.log('Analytics: GreenPapers.Download.Success', {
        paperId: paper.id,
        paperTitle: paper.title
      });
    }
  };

  const handleShare = (method: string) => {
    const url = window.location.href;
    const title = paper?.title || '';
    
    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('تم نسخ الرابط');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
    }
  };

  if (!paper) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">الورقة غير موجودة</h2>
        <Button onClick={() => navigate('/green-papers')}>العودة إلى الأوراق الخضراء</Button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-background/98 backdrop-blur-md border-b border-border/80 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/green-papers')}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة
              </Button>
              <BoudLogo showText size="header" />
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleDownload} className="bg-primary hover:bg-primary-glow text-white">
                <Download className="w-4 h-4 ml-2" />
                تنزيل الورقة
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">الرئيسية</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/knowledge" className="hover:text-primary">المعرفة</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/green-papers" className="hover:text-primary">أوراق خضراء</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{paper.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Paper Hero */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {paper.isNew && <Badge className="bg-green-500 text-white">جديد</Badge>}
                {paper.isUpdated && <Badge className="bg-blue-500 text-white">محدث</Badge>}
                <Badge variant="secondary">{paper.level}</Badge>
                {paper.category.map(cat => (
                  <Badge key={cat} variant="outline">{cat}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {paper.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {paper.reading_minutes} دقيقة للقراءة
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {paper.pages} صفحة
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  نُشر في {new Date(paper.published_at).toLocaleDateString('ar-SA')}
                </div>
                {paper.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {paper.rating} / 5
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {paper.downloads.toLocaleString()} تنزيل
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {paper.views.toLocaleString()} مشاهدة
                </div>
              </div>

              {/* Industry tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">القطاعات:</span>
                {paper.industry.map(industry => (
                  <Badge key={industry} variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={paper.cover_url}
                alt={paper.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  الملخص التنفيذي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none text-right">
                  {paper.summary.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  النقاط الأساسية
                </CardTitle>
                <CardDescription>
                  أهم ما ستتعلمه من هذه الورقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {paper.key_takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-medium">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  جدول المحتويات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {paper.table_of_contents.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.anchor}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* PDF Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  معاينة الورقة
                </CardTitle>
                <CardDescription>
                  اطلع على عينة من محتوى الورقة قبل التنزيل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">معاينة PDF</h3>
                  <p className="text-muted-foreground mb-4">
                    عذراً، معاينة PDF غير متوفرة حالياً. يمكنك تنزيل الملف للاطلاع على المحتوى الكامل.
                  </p>
                  <Button onClick={handleDownload} className="bg-primary hover:bg-primary-glow text-white">
                    <Download className="w-4 h-4 ml-2" />
                    تنزيل الورقة كاملة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  المراجع والمصادر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {paper.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {source.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Action */}
            <Card>
              <CardHeader>
                <CardTitle>تنزيل الورقة</CardTitle>
                <CardDescription>
                  احصل على النسخة الكاملة من الورقة مجاناً
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleDownload} className="w-full bg-primary hover:bg-primary-glow text-white">
                  <Download className="w-4 h-4 ml-2" />
                  تنزيل PDF ({paper.pages} صفحة)
                </Button>
                <p className="text-xs text-muted-foreground">
                  الملف مجاني بالكامل ولا يتطلب تسجيل الدخول
                </p>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  شارك الورقة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="w-full justify-start"
                >
                  <Copy className="w-4 h-4 ml-2" />
                  نسخ الرابط
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('whatsapp')}
                  className="w-full justify-start"
                >
                  📱 واتساب
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="w-full justify-start"
                >
                  💼 لينكدإن
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('email')}
                  className="w-full justify-start"
                >
                  📧 البريد الإلكتروني
                </Button>
              </CardContent>
            </Card>

            {/* Related Papers */}
            <Card>
              <CardHeader>
                <CardTitle>أوراق ذات صلة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedPapers.map((relatedPaper) => (
                  <div key={relatedPaper.id} className="group cursor-pointer" onClick={() => navigate(`/green-papers/${relatedPaper.slug}`)}>
                    <div className="flex gap-3">
                      <img
                        src={relatedPaper.cover_url}
                        alt={relatedPaper.title}
                        className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPaper.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {relatedPaper.reading_minutes} دقيقة
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <Dialog open={showLeadCapture} onOpenChange={setShowLeadCapture}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>معلومات سريعة للتنزيل</DialogTitle>
            <DialogDescription>
              نحتاج بعض المعلومات الأساسية لنرسل لك أحدث الأوراق والمحتوى المفيد
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل *</Label>
              <Input
                id="fullName"
                value={leadForm.fullName}
                onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                placeholder="example@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">اسم الشركة</Label>
              <Input
                id="company"
                value={leadForm.company}
                onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                placeholder="اسم شركتك"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">حجم المنشأة</Label>
              <Select value={leadForm.companySize} onValueChange={(value) => setLeadForm({ ...leadForm, companySize: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر حجم المنشأة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغيرة (1-50 موظف)</SelectItem>
                  <SelectItem value="medium">متوسطة (51-250 موظف)</SelectItem>
                  <SelectItem value="large">كبيرة (250+ موظف)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">القطاع</Label>
              <Select value={leadForm.industry} onValueChange={(value) => setLeadForm({ ...leadForm, industry: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">تقنية</SelectItem>
                  <SelectItem value="healthcare">صحي</SelectItem>
                  <SelectItem value="education">تعليم</SelectItem>
                  <SelectItem value="retail">تجزئة</SelectItem>
                  <SelectItem value="hospitality">ضيافة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="privacy"
                checked={leadForm.agreeToPrivacy}
                onCheckedChange={(checked) => setLeadForm({ ...leadForm, agreeToPrivacy: checked as boolean })}
              />
              <Label htmlFor="privacy" className="text-sm">
                أوافق على <a href="/privacy" className="text-primary hover:underline">سياسة الخصوصية</a> وتلقي المحتوى المفيد من بُعد *
              </Label>
            </div>

            <Button onClick={handleLeadSubmit} className="w-full bg-primary hover:bg-primary-glow text-white">
              تأكيد وتنزيل الورقة
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GreenPaperDetail;