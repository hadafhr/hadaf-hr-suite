import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Zap,
  ArrowRight,
  Plus,
  Filter,
  Download
} from 'lucide-react';

export const ChangeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('initiatives');

  // بيانات تجريبية لمبادرات التغيير
  const changeInitiatives = [
    {
      id: 1,
      title: 'تحويل رقمي للموارد البشرية',
      description: 'أتمتة العمليات الإدارية وتطبيق الأنظمة الذكية',
      status: 'in_progress',
      progress: 65,
      priority: 'high',
      startDate: '2024-01-15',
      targetDate: '2024-06-30',
      owner: 'إدارة تقنية المعلومات',
      impactLevel: 'strategic'
    },
    {
      id: 2,
      title: 'إعادة هيكلة تنظيمية',
      description: 'تطوير الهيكل التنظيمي لتحسين الكفاءة',
      status: 'planning',
      progress: 25,
      priority: 'high',
      startDate: '2024-02-01',
      targetDate: '2024-08-31',
      owner: 'الإدارة التنفيذية',
      impactLevel: 'transformational'
    },
    {
      id: 3,
      title: 'تطوير ثقافة الأداء',
      description: 'برنامج شامل لتعزيز ثقافة الأداء العالي',
      status: 'completed',
      progress: 100,
      priority: 'medium',
      startDate: '2023-09-01',
      targetDate: '2024-01-31',
      owner: 'إدارة الموارد البشرية',
      impactLevel: 'operational'
    }
  ];

  // إحصائيات إدارة التغيير
  const stats = {
    totalInitiatives: 12,
    activeInitiatives: 7,
    completedInitiatives: 3,
    plannedInitiatives: 2,
    averageSuccessRate: 82,
    stakeholderEngagement: 78
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'planning': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'on_hold': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactLabel = (level: string) => {
    switch (level) {
      case 'transformational': return 'تحويلي';
      case 'strategic': return 'استراتيجي';
      case 'operational': return 'تشغيلي';
      default: return level;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in_progress': return 'قيد التنفيذ';
      case 'planning': return 'قيد التخطيط';
      case 'on_hold': return 'متوقف مؤقتاً';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* العنوان والإحصائيات */}
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة التغيير</h1>
          <p className="text-muted-foreground">نظام متقدم لإدارة وتتبع مبادرات التغيير المؤسسي</p>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المبادرات</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalInitiatives}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeInitiatives}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedInitiatives}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد التخطيط</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.plannedInitiatives}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">معدل النجاح</p>
                  <p className="text-2xl font-bold text-foreground">{stats.averageSuccessRate}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مشاركة الأطراف</p>
                  <p className="text-2xl font-bold text-foreground">{stats.stakeholderEngagement}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="initiatives" className="flex flex-col gap-1 py-3">
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">المبادرات</span>
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex flex-col gap-1 py-3">
            <Target className="h-4 w-4" />
            <span className="text-xs">التخطيط</span>
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex flex-col gap-1 py-3">
            <Zap className="h-4 w-4" />
            <span className="text-xs">التنفيذ</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex flex-col gap-1 py-3">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">المراقبة</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
            <FileText className="h-4 w-4" />
            <span className="text-xs">التقارير</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="space-y-4">
          <div className="grid gap-4">
            {changeInitiatives.map((initiative) => (
              <Card key={initiative.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* رأس البطاقة */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{initiative.title}</h3>
                          <Badge className={getPriorityColor(initiative.priority)}>
                            {initiative.priority === 'high' ? 'عالية' : initiative.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </Badge>
                          <Badge className={getStatusColor(initiative.status)}>
                            {getStatusLabel(initiative.status)}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{initiative.description}</p>
                      </div>
                    </div>

                    {/* شريط التقدم */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">التقدم</span>
                        <span className="font-bold text-foreground">{initiative.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">مستوى التأثير</p>
                          <p className="text-sm font-medium text-foreground">{getImpactLabel(initiative.impactLevel)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">الجهة المسؤولة</p>
                          <p className="text-sm font-medium text-foreground">{initiative.owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">تاريخ البدء</p>
                          <p className="text-sm font-medium text-foreground">{initiative.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">التاريخ المستهدف</p>
                          <p className="text-sm font-medium text-foreground">{initiative.targetDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* أزرار الإجراءات */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="h-4 w-4 ml-2" />
                        التفاصيل
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 ml-2" />
                        التقارير
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <ArrowRight className="h-4 w-4 ml-2" />
                        إدارة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <div className="space-y-4">
            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  التخطيط الاستراتيجي للتغيير
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* نموذج تقييم الاستعداد للتغيير */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Target className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">تقييم الاستعداد</h3>
                          <p className="text-xs text-muted-foreground">تقييم جاهزية المؤسسة للتغيير</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>الاستعداد التنظيمي</span>
                          <span className="font-bold">78%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }} />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">إجراء تقييم جديد</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">تحليل أصحاب المصلحة</h3>
                          <p className="text-xs text-muted-foreground">تحديد وتصنيف الأطراف المعنية</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-muted/50 p-2 rounded-lg">
                          <p className="text-2xl font-bold text-foreground">24</p>
                          <p className="text-xs text-muted-foreground">أطراف معنية</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">18</p>
                          <p className="text-xs text-muted-foreground">داعمين</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">إدارة الأطراف</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* خارطة طريق التغيير */}
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-base">خارطة طريق التغيير</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { phase: 'التحليل والتقييم', status: 'completed', duration: '4 أسابيع' },
                        { phase: 'التصميم والتخطيط', status: 'in_progress', duration: '6 أسابيع' },
                        { phase: 'التنفيذ التجريبي', status: 'pending', duration: '8 أسابيع' },
                        { phase: 'التطبيق الشامل', status: 'pending', duration: '12 أسبوع' }
                      ].map((phase, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            phase.status === 'completed' ? 'bg-green-500/20 text-green-600' :
                            phase.status === 'in_progress' ? 'bg-blue-500/20 text-blue-600' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{phase.phase}</p>
                            <p className="text-xs text-muted-foreground">{phase.duration}</p>
                          </div>
                          <Badge className={
                            phase.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                            phase.status === 'in_progress' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                            'bg-muted text-muted-foreground'
                          }>
                            {phase.status === 'completed' ? 'مكتمل' : 
                             phase.status === 'in_progress' ? 'جاري' : 'قادم'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation">
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-transparent">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Zap className="h-8 w-8 text-blue-600" />
                    <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">نشط</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-sm text-muted-foreground">مشاريع قيد التنفيذ</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">عرض التفاصيل</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-transparent">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                    <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">تحذير</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-sm text-muted-foreground">مشاريع بها تأخير</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">معالجة التأخيرات</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-transparent">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30">مكتمل</Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">15</p>
                    <p className="text-sm text-muted-foreground">مشروع تم إنجازه</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">سجل الإنجازات</Button>
                </CardContent>
              </Card>
            </div>

            {/* قائمة المهام النشطة */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">المهام التنفيذية النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: 'تدريب الموظفين على النظام الجديد', owner: 'إدارة التدريب', deadline: '2024-12-15', progress: 75, priority: 'high' },
                    { task: 'ترحيل البيانات إلى النظام الجديد', owner: 'تقنية المعلومات', deadline: '2024-12-20', progress: 45, priority: 'high' },
                    { task: 'إعداد دليل المستخدم', owner: 'الجودة', deadline: '2024-12-10', progress: 90, priority: 'medium' },
                    { task: 'اختبار الأداء', owner: 'ضمان الجودة', deadline: '2024-12-08', progress: 60, priority: 'medium' }
                  ].map((task, index) => (
                    <div key={index} className="p-4 bg-card border border-border/50 rounded-lg space-y-3 hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{task.task}</h4>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {task.owner}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.deadline}
                            </span>
                          </div>
                        </div>
                        <Badge className={task.priority === 'high' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/20'}>
                          {task.priority === 'high' ? 'عاجل' : 'متوسط'}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">التقدم</span>
                          <span className="font-bold text-foreground">{task.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-4">
            {/* مؤشرات الأداء الرئيسية */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
                  <p className="text-3xl font-bold text-foreground">92%</p>
                  <p className="text-sm text-muted-foreground">معدل الإنجاز الكلي</p>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                    +5% عن الشهر السابق
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Users className="h-8 w-8 text-blue-600 mx-auto" />
                  <p className="text-3xl font-bold text-foreground">85%</p>
                  <p className="text-sm text-muted-foreground">مستوى المشاركة</p>
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    ممتاز
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Target className="h-8 w-8 text-orange-600 mx-auto" />
                  <p className="text-3xl font-bold text-foreground">7/10</p>
                  <p className="text-sm text-muted-foreground">الأهداف المحققة</p>
                  <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                    70%
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto" />
                  <p className="text-3xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">أيام متبقية</p>
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                    المرحلة الحالية
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* لوحة المراقبة التفصيلية */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    أداء المبادرات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'التحول الرقمي', value: 85, color: 'bg-blue-600' },
                      { name: 'إعادة الهيكلة', value: 65, color: 'bg-green-600' },
                      { name: 'ثقافة الأداء', value: 95, color: 'bg-purple-600' },
                      { name: 'الابتكار', value: 45, color: 'bg-orange-600' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">{item.name}</span>
                          <span className="text-muted-foreground">{item.value}%</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    المخاطر والتحديات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { risk: 'مقاومة التغيير', level: 'high', impact: 'عالي', status: 'active' },
                      { risk: 'نقص الموارد', level: 'medium', impact: 'متوسط', status: 'monitoring' },
                      { risk: 'التأخير في الجدول الزمني', level: 'medium', impact: 'متوسط', status: 'mitigated' },
                      { risk: 'قلة التدريب', level: 'low', impact: 'منخفض', status: 'resolved' }
                    ].map((risk, index) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{risk.risk}</p>
                          <p className="text-xs text-muted-foreground">التأثير: {risk.impact}</p>
                        </div>
                        <Badge className={
                          risk.level === 'high' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                          risk.level === 'medium' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                          'bg-green-500/10 text-green-600 border-green-500/20'
                        }>
                          {risk.level === 'high' ? 'عالي' : risk.level === 'medium' ? 'متوسط' : 'منخفض'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-4">
            {/* أنواع التقارير */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-all">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير التقدم الشهري</h3>
                    <p className="text-sm text-muted-foreground">نظرة شاملة على التقدم المحرز</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-500/20 transition-all">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير الأداء</h3>
                    <p className="text-sm text-muted-foreground">مؤشرات الأداء الرئيسية</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-purple-500/20 transition-all">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير المشاركة</h3>
                    <p className="text-sm text-muted-foreground">مستويات مشاركة الموظفين</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* التقارير الأخيرة */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التقارير المنشورة مؤخراً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'تقرير ربع سنوي - Q4 2024', date: '2024-12-01', type: 'quarterly', size: '2.4 MB', downloads: 45 },
                    { title: 'تحليل المخاطر - نوفمبر 2024', date: '2024-11-30', type: 'risk', size: '1.8 MB', downloads: 32 },
                    { title: 'تقرير الإنجازات - نوفمبر 2024', date: '2024-11-28', type: 'achievement', size: '3.1 MB', downloads: 67 },
                    { title: 'تقييم رضا الموظفين', date: '2024-11-25', type: 'survey', size: '1.2 MB', downloads: 89 }
                  ].map((report, index) => (
                    <div key={index} className="p-4 bg-card border border-border/50 rounded-lg flex items-center justify-between hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{report.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {report.date}
                            </span>
                            <span>{report.size}</span>
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {report.downloads} تحميل
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* إنشاء تقرير مخصص */}
            <Card className="border-border/50 border-dashed">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">إنشاء تقرير مخصص</h3>
                  <p className="text-sm text-muted-foreground">قم بإنشاء تقرير مخصص حسب احتياجاتك</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء تقرير جديد
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};