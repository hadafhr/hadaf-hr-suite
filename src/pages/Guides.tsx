import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search,
  Play,
  Clock,
  Users,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Star,
  Download,
  Eye
} from 'lucide-react';

const Guides: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const guides = [
    {
      id: 1,
      title: 'البدء السريع مع منصة بُعد - دليل المبتدئين',
      description: 'تعلم أساسيات استخدام المنصة خلال 30 دقيقة فقط',
      type: 'video',
      duration: '32 دقيقة',
      level: 'beginner',
      steps: 8,
      views: 15420,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
      author: 'فريق بُعد التقني',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'إعداد نظام الرواتب خطوة بخطوة',
      description: 'دليل شامل لتكوين نظام الرواتب والبدلات والخصومات',
      type: 'interactive',
      duration: '45 دقيقة',
      level: 'intermediate',
      steps: 12,
      views: 8765,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
      author: 'سارة المحاسبة',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'تكامل أجهزة البصمة مع النظام',
      description: 'شرح مفصل لربط أجهزة الحضور والانصراف المختلفة',
      type: 'document',
      duration: '25 دقيقة',
      level: 'advanced',
      steps: 6,
      views: 5432,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=400&q=80',
      author: 'أحمد التقني',
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      title: 'إدارة إجازات الموظفين وحساب المستحقات',
      description: 'تعلم كيفية إدارة جميع أنواع الإجازات والحسابات المرتبطة بها',
      type: 'video',
      duration: '38 دقيقة',
      level: 'intermediate',
      steps: 10,
      views: 12108,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&q=80',
      author: 'فاطمة الموارد البشرية',
      lastUpdated: '2024-01-08'
    },
    {
      id: 5,
      title: 'تخصيص التقارير والتحليلات',
      description: 'إنشاء تقارير مخصصة ولوحات معلومات تفاعلية',
      type: 'interactive',
      duration: '52 دقيقة',
      level: 'advanced',
      steps: 15,
      views: 6789,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
      author: 'محمد التحليلات',
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      title: 'إعداد عملية التوظيف والاختيار',
      description: 'دليل شامل لتكوين وإدارة عمليات التوظيف من البداية للنهاية',
      type: 'video',
      duration: '41 دقيقة',
      level: 'intermediate',
      steps: 11,
      views: 9876,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      author: 'نورا التوظيف',
      lastUpdated: '2024-01-03'
    },
    {
      id: 7,
      title: 'تطبيق المسارات الوظيفية وتقييم الأداء',
      description: 'تعلم كيفية إعداد مسارات التطوير الوظيفي وتقييمات الأداء',
      type: 'document',
      duration: '35 دقيقة',
      level: 'advanced',
      steps: 9,
      views: 4321,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80',
      author: 'عبدالله التطوير',
      lastUpdated: '2024-01-01'
    },
    {
      id: 8,
      title: 'إدارة الصلاحيات والأدوار',
      description: 'كيفية تخصيص الأدوار والصلاحيات لمستخدمي النظام',
      type: 'interactive',
      duration: '28 دقيقة',
      level: 'beginner',
      steps: 7,
      views: 11543,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80',
      author: 'ريم الأمان',
      lastUpdated: '2023-12-28'
    },
    {
      id: 9,
      title: 'تكامل النظام مع التأمينات الاجتماعية',
      description: 'دليل خطوة بخطوة لربط النظام مع منصة التأمينات الاجتماعية',
      type: 'video',
      duration: '48 دقيقة',
      level: 'advanced',
      steps: 13,
      views: 7654,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
      author: 'خالد التكامل',
      lastUpdated: '2023-12-25'
    },
    {
      id: 10,
      title: 'نصائح وحيل لتحسين الإنتاجية',
      description: 'اكتشف الميزات المخفية والاختصارات لاستخدام أكثر فعالية',
      type: 'document',
      duration: '22 دقيقة',
      level: 'intermediate',
      steps: 5,
      views: 13987,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=400&q=80',
      author: 'منى الكفاءة',
      lastUpdated: '2023-12-22'
    }
  ];

  const levels = [
    { id: 'all', name: 'جميع المستويات', count: guides.length },
    { id: 'beginner', name: 'مبتدئ', count: guides.filter(g => g.level === 'beginner').length },
    { id: 'intermediate', name: 'متوسط', count: guides.filter(g => g.level === 'intermediate').length },
    { id: 'advanced', name: 'متقدم', count: guides.filter(g => g.level === 'advanced').length }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || guide.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'interactive':
        return <Play className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'فيديو تعليمي';
      case 'interactive':
        return 'دليل تفاعلي';
      case 'document':
        return 'دليل مكتوب';
      default:
        return 'دليل';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'مبتدئ';
      case 'intermediate':
        return 'متوسط';
      case 'advanced':
        return 'متقدم';
      default:
        return level;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'advanced':
        return 'bg-red-500/10 text-red-600 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const handleGuideClick = (guideId: number) => {
    navigate(`/guides/${guideId}`);
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
              {t('knowledge.tutorials')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              شروحات مصورة وأدلة تفاعلية خطوة بخطوة لإتقان استخدام المنصة
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input 
                  placeholder="البحث في الشروحات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 rtl:pr-12 rtl:pl-4 h-12 text-lg"
                />
                <Search className="absolute right-4 rtl:left-4 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              </div>
              
              <div className="flex gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level.id)}
                    className="whitespace-nowrap"
                  >
                    {level.name} ({level.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card 
                key={guide.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 hover:-translate-y-1 overflow-hidden"
                onClick={() => handleGuideClick(guide.id)}
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={guide.thumbnail} 
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Type Badge */}
                  <Badge className="absolute top-4 right-4 bg-black/70 text-white border-0">
                    {getTypeIcon(guide.type)}
                    <span className="mr-1 rtl:ml-1 rtl:mr-0">{getTypeLabel(guide.type)}</span>
                  </Badge>
                  
                  {/* Play Button for Videos */}
                  {guide.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <Play className="w-8 h-8 text-primary mr-1 rtl:ml-1 rtl:mr-0" />
                      </div>
                    </div>
                  )}
                  
                  {/* Duration */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    <Clock className="w-3 h-3 inline ml-1 rtl:mr-1 rtl:ml-0" />
                    {guide.duration}
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getLevelColor(guide.level)}`}
                    >
                      {getLevelLabel(guide.level)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{guide.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  {/* Guide Meta */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>{guide.steps} خطوات</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{guide.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">بواسطة {guide.author}</span>
                        <span className="text-muted-foreground">{guide.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد شروحات مطابقة</h3>
              <p className="text-muted-foreground mb-4">
                جرب البحث بكلمات مختلفة أو تصفح جميع المستويات
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('all');
                }}
              >
                عرض جميع الشروحات
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              هل تحتاج لشرح مخصص؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              احجز جلسة تدريبية فردية مع خبرائنا
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8"
                onClick={() => navigate('/schedule')}
              >
                احجز جلسة تدريبية
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={() => navigate('/contact')}
              >
                تواصل مع الدعم
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guides;