import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Brain, 
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle,
  Play,
  Pause,
  BarChart3,
  Sparkles,
  Zap,
  MessageSquare,
  FileText,
  Video,
  Headphones,
  Download,
  Share2,
  Star,
  Calendar,
  Trophy,
  Lightbulb,
  Search
} from 'lucide-react';

export const SmartLearningAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalCourses: 45,
    enrolledLearners: 248,
    completionRate: 78,
    averageScore: 85,
    activeLearning: 32,
    certificatesIssued: 156
  };

  const aiCourses = [
    {
      id: 1,
      title: 'مهارات القيادة المتقدمة',
      category: 'القيادة',
      level: 'متقدم',
      duration: '8 ساعات',
      enrolled: 45,
      progress: 65,
      rating: 4.8,
      aiFeatures: ['مسار تعلم مخصص', 'تقييم ذكي', 'توصيات آلية'],
      status: 'active'
    },
    {
      id: 2,
      title: 'التحول الرقمي في المؤسسات',
      category: 'التكنولوجيا',
      level: 'متوسط',
      duration: '12 ساعة',
      enrolled: 62,
      progress: 42,
      rating: 4.6,
      aiFeatures: ['محتوى تفاعلي', 'مساعد ذكي', 'تحليل الأداء'],
      status: 'active'
    },
    {
      id: 3,
      title: 'إدارة الموارد البشرية الحديثة',
      category: 'الموارد البشرية',
      level: 'متقدم',
      duration: '10 ساعات',
      enrolled: 38,
      progress: 88,
      rating: 4.9,
      aiFeatures: ['سيناريوهات واقعية', 'تدريب عملي', 'تقييم مستمر'],
      status: 'active'
    },
    {
      id: 4,
      title: 'مهارات التواصل الفعال',
      category: 'المهارات الناعمة',
      level: 'مبتدئ',
      duration: '6 ساعات',
      enrolled: 71,
      progress: 25,
      rating: 4.7,
      aiFeatures: ['تمارين تفاعلية', 'ردود فورية', 'محاكاة حوارات'],
      status: 'active'
    }
  ];

  const learningPaths = [
    {
      id: 1,
      name: 'مسار القيادة التنفيذية',
      courses: 5,
      duration: '40 ساعة',
      level: 'متقدم',
      enrolled: 28,
      completion: 45
    },
    {
      id: 2,
      name: 'مسار الإدارة الوسطى',
      courses: 4,
      duration: '32 ساعة',
      level: 'متوسط',
      enrolled: 52,
      completion: 68
    },
    {
      id: 3,
      name: 'مسار المهارات التقنية',
      courses: 6,
      duration: '48 ساعة',
      level: 'متقدم',
      enrolled: 41,
      completion: 52
    }
  ];

  const aiInsights = [
    {
      type: 'recommendation',
      title: 'توصية ذكية',
      message: '15 موظف بحاجة لتطوير مهارات القيادة بناءً على تقييمات الأداء',
      priority: 'high',
      action: 'عرض التفاصيل'
    },
    {
      type: 'prediction',
      title: 'توقع نجاح',
      message: 'معدل إتمام الدورات سيرتفع 12% خلال الشهر القادم',
      priority: 'medium',
      action: 'عرض التحليل'
    },
    {
      type: 'alert',
      title: 'تنبيه أداء',
      message: '8 موظفين لم يكملوا التدريبات الإلزامية المحددة',
      priority: 'high',
      action: 'إرسال تذكير'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">مكتمل</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">مسودة</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ':
        return 'text-green-600';
      case 'متوسط':
        return 'text-blue-600';
      case 'متقدم':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            التعلم الذكي والتدريب بالذكاء الاصطناعي
          </h2>
          <p className="text-muted-foreground mt-1">
            منصة تعلم ذكية مدعومة بالذكاء الاصطناعي لتطوير مهارات الموظفين
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          إنشاء دورة بالذكاء الاصطناعي
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الدورات</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
                <p className="text-xs text-green-600 mt-1">+12 هذا الشهر</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المتعلمون النشطون</p>
                <p className="text-2xl font-bold">{stats.enrolledLearners}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.activeLearning} في تدريب حالياً</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الإتمام</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
                <Progress value={stats.completionRate} className="mt-2 h-1.5" />
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getPriorityColor(insight.priority)}`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    {insight.type === 'recommendation' && <Lightbulb className="w-5 h-5 text-yellow-600" />}
                    {insight.type === 'prediction' && <Brain className="w-5 h-5 text-purple-600" />}
                    {insight.type === 'alert' && <Zap className="w-5 h-5 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{insight.message}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">الدورات التدريبية</TabsTrigger>
          <TabsTrigger value="paths">المسارات التعليمية</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات الذكية</TabsTrigger>
          <TabsTrigger value="assistant">المساعد الذكي</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>الدورات التدريبية المدعومة بالذكاء الاصطناعي</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في الدورات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiCourses.map((course) => (
                  <Card key={course.id} className="border hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{course.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{course.category}</Badge>
                            <span className={`font-medium ${getLevelColor(course.level)}`}>{course.level}</span>
                          </div>
                        </div>
                        {getStatusBadge(course.status)}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{course.enrolled} متعلم</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{course.rating}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">التقدم</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground mb-2">مزايا الذكاء الاصطناعي:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.aiFeatures.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                <Sparkles className="w-3 h-3 ml-1" />
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Play className="w-4 h-4 ml-1" />
                            متابعة التعلم
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المسارات التعليمية الذكية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((path) => (
                  <Card key={path.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{path.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{path.courses} دورات</span>
                            <span>•</span>
                            <span>{path.duration}</span>
                            <span>•</span>
                            <span className={getLevelColor(path.level)}>{path.level}</span>
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          <Brain className="w-3 h-3 ml-1" />
                          مسار ذكي
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                          <p className="text-lg font-bold">{path.enrolled}</p>
                          <p className="text-xs text-muted-foreground">مسجل</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Target className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                          <p className="text-lg font-bold">{path.completion}%</p>
                          <p className="text-xs text-muted-foreground">إتمام</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Trophy className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                          <p className="text-lg font-bold">{Math.round(path.enrolled * path.completion / 100)}</p>
                          <p className="text-xs text-muted-foreground">شهادات</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Sparkles className="w-4 h-4 ml-1" />
                          تخصيص بالذكاء الاصطناعي
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  أداء التعلم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>معدل الإتمام</span>
                      <span className="font-medium">{stats.completionRate}%</span>
                    </div>
                    <Progress value={stats.completionRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>متوسط الدرجات</span>
                      <span className="font-medium">{stats.averageScore}%</span>
                    </div>
                    <Progress value={stats.averageScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>معدل المشاركة</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  الإنجازات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">شهادات صادرة</span>
                    </div>
                    <span className="text-2xl font-bold">{stats.certificatesIssued}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">متعلمون متميزون</span>
                    </div>
                    <span className="text-2xl font-bold">34</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">دورات مكتملة</span>
                    </div>
                    <span className="text-2xl font-bold">428</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="assistant" className="space-y-4">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                المساعد الذكي للتعلم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">مساعدك الذكي جاهز لمساعدتك</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        اسأل عن أي شيء متعلق بالتدريب والتطوير، سأقوم بتحليل البيانات وتقديم توصيات مخصصة
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="justify-start">
                          <Lightbulb className="w-4 h-4 ml-2" />
                          توصيات دورات مخصصة
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <Target className="w-4 h-4 ml-2" />
                          تحليل فجوات المهارات
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <BarChart3 className="w-4 h-4 ml-2" />
                          تقارير الأداء
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          <BookOpen className="w-4 h-4 ml-2" />
                          إنشاء خطة تطوير
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">محادثة مع المساعد الذكي</span>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="flex gap-2">
                      <div className="p-3 bg-gray-100 rounded-lg max-w-[80%]">
                        <p className="text-sm">مرحباً! كيف يمكنني مساعدتك في التدريب والتطوير اليوم؟</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="اكتب سؤالك هنا..." className="flex-1" />
                    <Button>
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};