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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <RefreshCw className="h-8 w-8 text-primary" />
              إدارة التغيير
            </h2>
            <p className="text-muted-foreground mt-2">نظام متقدم لإدارة وتتبع مبادرات التغيير المؤسسي</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              مبادرة جديدة
            </Button>
          </div>
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
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                التخطيط للتغيير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                قسم التخطيط للتغيير قيد التطوير...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                تنفيذ التغيير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                قسم تنفيذ التغيير قيد التطوير...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                مراقبة التقدم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                قسم مراقبة التقدم قيد التطوير...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                تقارير إدارة التغيير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                قسم التقارير قيد التطوير...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};