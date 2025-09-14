import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft,
  BookOpen, 
  Volume2, 
  Copy, 
  Share, 
  Download, 
  Bot,
  Clock,
  Eye,
  Tag,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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

const HRGlossaryTerm: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [term, setTerm] = useState<GlossaryTerm | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiQuestion, setAIQuestion] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from API
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      slug: 'أتمتة-الموارد-البشرية',
      title: 'أتمتة الموارد البشرية',
      letter: 'أ',
      summary: 'تحويل عمليات الموارد البشرية من ورقية إلى رقمية مؤتمتة لتوفير الوقت والجهد',
      body: `أتمتة الموارد البشرية (HR Automation) هي عملية تحويل العمليات الورقية واليدوية التقليدية في إدارة الموارد البشرية إلى أنظمة رقمية متقدمة تنفذ المهام الروتينية بشكل تلقائي وفعال.

## التعريف الشامل

تشمل أتمتة الموارد البشرية استخدام التكنولوجيا والبرمجيات المتخصصة لتبسيط وتحسين العمليات المختلفة مثل التوظيف، إدارة الحضور والانصراف، معالجة الرواتب، إدارة الإجازات، تقييم الأداء، والتدريب.

## الهدف الأساسي

الهدف الرئيسي من أتمتة الموارد البشرية هو تحرير موظفي الموارد البشرية من المهام الروتينية والمتكررة، مما يتيح لهم التركيز على الأنشطة الاستراتيجية ذات القيمة المضافة العالية مثل تطوير المواهب، بناء الثقافة المؤسسية، والتخطيط الاستراتيجي للقوى العاملة.

## الفوائد الرئيسية

### 1. توفير الوقت والجهد
تقليل الوقت المطلوب لإنجاز المهام الإدارية بنسبة تصل إلى 70%

### 2. تحسين الدقة
تقليل الأخطاء البشرية في العمليات الحسابية والإدارية

### 3. تحسين تجربة الموظف
توفير خدمات ذاتية سريعة ومتاحة على مدار الساعة

### 4. الامتثال للأنظمة
ضمان الالتزام بالقوانين واللوائح المحلية والدولية

## التحديات المحتملة

رغم الفوائد العديدة، قد تواجه المؤسسات بعض التحديات عند تطبيق أتمتة الموارد البشرية مثل مقاومة التغيير من بعض الموظفين، التكلفة الأولية للتنفيذ، والحاجة إلى التدريب وتطوير المهارات التقنية.`,
      synonyms: ['ميكنة الموارد البشرية', 'أتمتة HR', 'الأتمتة الإدارية', 'التحول الرقمي للموارد البشرية'],
      category: ['أنظمة', 'تقنية'],
      level: 'أساسي',
      examples: [
        'استخدام نظام حضور وانصراف آلي بدل التسجيل اليدوي في دفتر ورقي',
        'تطبيق طلبات الإجازة الإلكترونية مع مسار الموافقة التلقائي',
        'أتمتة حساب الرواتب والخصوماتوالإضافات شهرياً',
        'نظام التوظيف الإلكتروني من نشر الوظيفة حتى إرسال عروض العمل'
      ],
      related_terms: ['الخدمة الذاتية للموظف', 'تحليلات الموارد البشرية', 'إدارة المواهب الرقمية'],
      related_tools: ['/hr-tools/salary-calculator', '/hr-tools/vacation-balance', '/hr-tools/wps-checker'],
      last_updated: '2025-09-14',
      views: 342,
      badge: 'شائع',
      locale: 'ar-SA'
    },
    // Additional sample terms would go here...
  ];

  useEffect(() => {
    if (slug) {
      const foundTerm = glossaryTerms.find(t => t.slug === slug);
      setTerm(foundTerm || null);
      setLoading(false);
      
      // Track view
      if (foundTerm) {
        // In real app: trackAnalytics('Glossary.Term.View', { termId: foundTerm.id });
      }
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جار تحميل المصطلح...</p>
        </div>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">المصطلح غير موجود</h1>
          <p className="text-muted-foreground mb-4">المصطلح الذي تبحث عنه غير متوفر حالياً</p>
          <Button onClick={() => navigate('/hr-tools/hr-glossary')}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للمعجم
          </Button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const textToCopy = `${term.title}\n\n${term.body}\n\nالمصدر: معجم بُعد للموارد البشرية`;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "تم النسخ",
      description: "تم نسخ المحتوى بنجاح"
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: term.title,
      text: term.summary,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط المصطلح"
      });
    }
  };

  const handleTTS = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term.body);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
      toast({
        title: "بدأ التشغيل",
        description: "يتم تشغيل المحتوى صوتياً"
      });
    }
  };

  const handlePDFExport = () => {
    // In real app: generate and download PDF
    toast({
      title: "جار التصدير",
      description: "سيتم تحميل ملف PDF قريباً"
    });
  };

  const handleAIQuestion = () => {
    if (!aiQuestion.trim()) return;
    
    // In real app: send question to AI API
    toast({
      title: "تم إرسال السؤال",
      description: "سيجيب المساعد الذكي قريباً"
    });
    setAIQuestion('');
  };

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                <BoudLogo variant="icon" size="md" />
                <span className="font-bold text-xl text-foreground hidden sm:block">بُعد</span>
              </Link>
              
              {/* Breadcrumbs */}
              <nav className="hidden md:flex items-center space-x-2 space-x-reverse mr-8 text-sm text-muted-foreground">
                <Link to="/hr-tools" className="hover:text-foreground">أدوات الموارد البشرية</Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/hr-tools/hr-glossary" className="hover:text-foreground">معجم المصطلحات</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{term.title}</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={() => navigate('/demo-request')}>
                اطلب عرض
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/hr-tools/hr-glossary')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للمعجم
          </Button>

          {/* Term Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{term.letter}</span>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {term.title}
                  </h1>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="h-4 w-4" />
                      <span>{term.views} مشاهدة</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>آخر تحديث: {new Date(term.last_updated).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button size="sm" variant="outline" onClick={handleTTS}>
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handlePDFExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {term.badge && (
                <Badge variant="secondary">{term.badge}</Badge>
              )}
              <Badge variant="outline">{term.level}</Badge>
              {term.category.map(cat => (
                <Badge key={cat} variant="outline">{cat}</Badge>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Summary */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">نظرة عامة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {term.summary}
                  </p>
                </CardContent>
              </Card>

              {/* Detailed Definition */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">التعريف المفصل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-slate max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: term.body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />').replace(/^/, '<p>').replace(/$/, '</p>').replace(/## (.*)/g, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>').replace(/### (.*)/g, '<h4 class="font-semibold mt-4 mb-2">$1</h4>')
                    }}
                  />
                </CardContent>
              </Card>

              {/* Examples */}
              {term.examples.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">أمثلة تطبيقية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {term.examples.map((example, index) => (
                        <li key={index} className="flex items-start space-x-3 space-x-reverse">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <p className="text-muted-foreground">{example}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Legal References */}
              {term.law_refs && term.law_refs.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">المراجع النظامية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {term.law_refs.map((ref, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse p-3 bg-muted/50 rounded-lg">
                          <Flag className="h-4 w-4 text-primary" />
                          <span className="font-medium">المادة {ref.article}</span>
                          <span className="text-muted-foreground">من {ref.source}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Assistant */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Bot className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">مساعد بُعد الذكي</CardTitle>
                  </div>
                  <CardDescription>
                    اسأل المساعد الذكي أي سؤال حول هذا المصطلح
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 space-x-reverse">
                    <input
                      type="text"
                      placeholder="مثال: ما هي أهم فوائد هذا المفهوم؟"
                      value={aiQuestion}
                      onChange={(e) => setAIQuestion(e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      onKeyPress={(e) => e.key === 'Enter' && handleAIQuestion()}
                    />
                    <Button onClick={handleAIQuestion} disabled={!aiQuestion.trim()}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Synonyms */}
              {term.synonyms.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">المرادفات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {term.synonyms.map((synonym, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Terms */}
              {term.related_terms.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">مصطلحات ذات صلة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {term.related_terms.map((relatedTerm, index) => (
                        <li key={index}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start h-auto p-2 text-right"
                            onClick={() => navigate(`/hr-tools/hr-glossary/${relatedTerm.replace(/\s+/g, '-')}`)}
                          >
                            <Tag className="h-4 w-4 ml-2" />
                            {relatedTerm}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Related Tools */}
              {term.related_tools.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">أدوات بُعد ذات الصلة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {term.related_tools.map((toolPath, index) => {
                        const toolName = toolPath.split('/').pop()?.replace(/-/g, ' ') || 'أداة';
                        return (
                          <li key={index}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start h-auto p-2 text-right"
                              onClick={() => navigate(toolPath)}
                            >
                              <ExternalLink className="h-4 w-4 ml-2" />
                              {toolName}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إجراءات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Bookmark className="h-4 w-4 ml-2" />
                      حفظ في المفضلة
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <ThumbsUp className="h-4 w-4 ml-2" />
                      مفيد ({Math.floor(Math.random() * 50) + 10})
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Flag className="h-4 w-4 ml-2" />
                      الإبلاغ عن خطأ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRGlossaryTerm;