import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Search,
  FileText,
  BookOpen,
  HelpCircle,
  Calendar,
  User,
  Tag,
  Clock,
  Eye,
  Star
} from 'lucide-react';

const Knowledge: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'جميع المقالات', count: 32 },
    { id: 'labor-law', name: 'قانون العمل السعودي', count: 12 },
    { id: 'product-guides', name: 'أدلة المنتج', count: 8 },
    { id: 'faq', name: 'الأسئلة الشائعة', count: 7 },
    { id: 'hr-best-practices', name: 'أفضل ممارسات الموارد البشرية', count: 5 }
  ];

  const articles = [
    {
      id: 1,
      title: 'دليل شامل لقانون العمل السعودي الجديد',
      excerpt: 'تعرف على أحدث التعديلات في قانون العمل السعودي وكيفية تطبيقها في منشأتك',
      category: 'labor-law',
      author: 'أحمد المحمد',
      publishDate: '2024-01-15',
      readTime: '8 دقائق',
      views: 2543,
      rating: 4.8,
      tags: ['قانون العمل', 'تحديثات', 'امتثال']
    },
    {
      id: 2,
      title: 'كيفية إعداد نظام الرواتب في منصة بُعد',
      excerpt: 'دليل خطوة بخطوة لإعداد وتكوين نظام الرواتب لضمان الدقة والامتثال',
      category: 'product-guides',
      author: 'سارة الأحمد',
      publishDate: '2024-01-12',
      readTime: '12 دقيقة',
      views: 1876,
      rating: 4.9,
      tags: ['رواتب', 'إعداد', 'دليل']
    },
    {
      id: 3,
      title: 'الأسئلة الشائعة حول إدارة الإجازات',
      excerpt: 'إجابات شاملة على أكثر الأسئلة شيوعاً حول إدارة الإجازات وحساب المستحقات',
      category: 'faq',
      author: 'محمد العتيبي',
      publishDate: '2024-01-10',
      readTime: '6 دقائق',
      views: 3120,
      rating: 4.7,
      tags: ['إجازات', 'أسئلة شائعة', 'مستحقات']
    },
    {
      id: 4,
      title: 'أفضل ممارسات تقييم أداء الموظفين',
      excerpt: 'استراتيجيات مؤثرة لتطوير نظام تقييم الأداء وتحسين مشاركة الموظفين',
      category: 'hr-best-practices',
      author: 'فاطمة الزهراني',
      publishDate: '2024-01-08',
      readTime: '10 دقائق',
      views: 1654,
      rating: 4.8,
      tags: ['تقييم الأداء', 'مشاركة الموظفين', 'تطوير']
    },
    {
      id: 5,
      title: 'تكامل منصة بُعد مع التأمينات الاجتماعية',
      excerpt: 'شرح مفصل لكيفية ربط النظام مع التأمينات الاجتماعية وإرسال البيانات آلياً',
      category: 'product-guides',
      author: 'عبدالله السعد',
      publishDate: '2024-01-05',
      readTime: '15 دقيقة',
      views: 2198,
      rating: 4.9,
      tags: ['تكامل', 'التأمينات الاجتماعية', 'أتمتة']
    },
    {
      id: 6,
      title: 'حقوق وواجبات الموظف في القطاع الخاص',
      excerpt: 'دليل شامل لحقوق وواجبات الموظفين وفقاً لنظام العمل السعودي',
      category: 'labor-law',
      author: 'نورا الجابر',
      publishDate: '2024-01-03',
      readTime: '14 دقيقة',
      views: 4521,
      rating: 4.9,
      tags: ['حقوق الموظفين', 'واجبات', 'قطاع خاص']
    },
    {
      id: 7,
      title: 'كيفية استخدام تقارير الحضور والانصراف',
      excerpt: 'تعلم كيفية إنشاء وتحليل تقارير الحضور لتحسين إدارة الوقت والإنتاجية',
      category: 'product-guides',
      author: 'خالد الشمري',
      publishDate: '2024-01-01',
      readTime: '9 دقائق',
      views: 1432,
      rating: 4.6,
      tags: ['تقارير', 'حضور وانصراف', 'إنتاجية']
    },
    {
      id: 8,
      title: 'التعامل مع المخالفات والجزاءات التأديبية',
      excerpt: 'إرشادات لتطبيق الجزاءات التأديبية بما يتماشى مع القوانين السعودية',
      category: 'labor-law',
      author: 'ريم الحربي',
      publishDate: '2023-12-28',
      readTime: '11 دقيقة',
      views: 2876,
      rating: 4.7,
      tags: ['جزاءات تأديبية', 'مخالفات', 'قانون العمل']
    },
    {
      id: 9,
      title: 'استراتيجيات فعالة للتوظيف والاختيار',
      excerpt: 'طرق مبتكرة لجذب أفضل المواهب وتطوير عملية التوظيف',
      category: 'hr-best-practices',
      author: 'يوسف الدوسري',
      publishDate: '2023-12-25',
      readTime: '13 دقيقة',
      views: 1987,
      rating: 4.8,
      tags: ['توظيف', 'اختيار المواهب', 'استراتيجيات']
    },
    {
      id: 10,
      title: 'حل مشاكل الدخول الشائعة في النظام',
      excerpt: 'دليل استكشاف الأخطاء وحلها لمشاكل الدخول والوصول للنظام',
      category: 'faq',
      author: 'منى القحطاني',
      publishDate: '2023-12-22',
      readTime: '7 دقائق',
      views: 3654,
      rating: 4.5,
      tags: ['مشاكل فنية', 'دخول النظام', 'حلول']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (articleId: number) => {
    navigate(`/knowledge/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            {t('btn.back')}
          </Button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('knowledge.center')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('knowledge.desc')}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Input 
                placeholder={t('knowledge.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rtl:pr-12 rtl:pl-4 h-12 text-lg"
              />
              <Search className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Articles Content */}
            <TabsContent value={selectedCategory} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 hover:-translate-y-1"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(cat => cat.id === article.category)?.name}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{article.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{article.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Article Meta */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{article.publishDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">لا توجد مقالات مطابقة</h3>
                  <p className="text-muted-foreground mb-4">
                    جرب البحث بكلمات مختلفة أو تصفح جميع الفئات
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    عرض جميع المقالات
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              فريق الدعم جاهز لمساعدتك في أي وقت
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8"
                onClick={() => navigate('/contact')}
              >
                تواصل مع الدعم
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={() => navigate('/schedule')}
              >
                احجز جلسة تدريبية
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Knowledge;