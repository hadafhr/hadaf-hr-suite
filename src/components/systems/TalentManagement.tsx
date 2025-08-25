import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  TrendingUp,
  Award,
  Target,
  Heart,
  UserPlus,
  Download,
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Star,
  BookOpen,
  Crown,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface TalentProfile {
  id: string;
  employeeId: string;
  name: string;
  position: string;
  department: string;
  performanceRating: number;
  potentialLevel: 'high' | 'medium' | 'low';
  careerPath: string;
  lastPromotion: string;
  retentionRisk: 'high' | 'medium' | 'low';
  engagementScore: number;
}

interface CareerPath {
  id: string;
  title: string;
  currentLevel: string;
  nextLevel: string;
  requiredSkills: string[];
  estimatedTime: string;
  trainingPrograms: string[];
  employeesCount: number;
}

interface SuccessionPlan {
  id: string;
  position: string;
  currentHolder: string;
  successors: Array<{
    name: string;
    readiness: 'ready' | 'developing' | 'needs_development';
    timeToReady: string;
  }>;
  criticalLevel: 'high' | 'medium' | 'low';
}

const TalentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data
  const [talentProfiles] = useState<TalentProfile[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'أحمد محمد',
      position: 'مدير المشاريع',
      department: 'تقنية المعلومات',
      performanceRating: 4.8,
      potentialLevel: 'high',
      careerPath: 'مسار الإدارة التنفيذية',
      lastPromotion: '2023-01-15',
      retentionRisk: 'low',
      engagementScore: 92
    },
    {
      id: '2',
      employeeId: 'EMP002', 
      name: 'فاطمة علي',
      position: 'محللة بيانات أول',
      department: 'التحليلات',
      performanceRating: 4.6,
      potentialLevel: 'high',
      careerPath: 'مسار التحليلات المتقدمة',
      lastPromotion: '2023-06-20',
      retentionRisk: 'medium',
      engagementScore: 88
    }
  ]);

  const [careerPaths] = useState<CareerPath[]>([
    {
      id: '1',
      title: 'مسار الإدارة التنفيذية',
      currentLevel: 'مدير مشاريع',
      nextLevel: 'مدير إدارة',
      requiredSkills: ['القيادة', 'إدارة الميزانيات', 'التخطيط الاستراتيجي'],
      estimatedTime: '18-24 شهر',
      trainingPrograms: ['برنامج القيادة المتقدمة', 'إدارة المالية للمديرين'],
      employeesCount: 12
    },
    {
      id: '2',
      title: 'مسار التحليلات المتقدمة',
      currentLevel: 'محلل بيانات أول',
      nextLevel: 'رئيس قسم التحليلات',
      requiredSkills: ['Python المتقدم', 'Machine Learning', 'إدارة الفرق'],
      estimatedTime: '12-18 شهر',
      trainingPrograms: ['الذكاء الاصطناعي', 'إدارة فرق التحليلات'],
      employeesCount: 8
    }
  ]);

  const [successionPlans] = useState<SuccessionPlan[]>([
    {
      id: '1',
      position: 'مدير عام تقنية المعلومات',
      currentHolder: 'سعد الأحمد',
      successors: [
        { name: 'أحمد محمد', readiness: 'developing', timeToReady: '12 شهر' },
        { name: 'خالد سالم', readiness: 'needs_development', timeToReady: '24 شهر' }
      ],
      criticalLevel: 'high'
    }
  ]);

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تصدير البيانات",
      description: `جاري تصدير البيانات بصيغة ${format.toUpperCase()}...`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة",
      description: "جاري إعداد التقرير للطباعة...",
    });
  };

  const getDashboardStats = () => ({
    highPerformers: talentProfiles.filter(p => p.performanceRating >= 4.5).length,
    highPotentials: talentProfiles.filter(p => p.potentialLevel === 'high').length,
    activeCareerPaths: careerPaths.length,
    avgEngagement: Math.round(talentProfiles.reduce((acc, p) => acc + p.engagementScore, 0) / talentProfiles.length),
    criticalSuccessions: successionPlans.filter(s => s.criticalLevel === 'high').length
  });

  const stats = getDashboardStats();

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المواهب عالية الأداء</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPerformers}</div>
            <p className="text-xs text-muted-foreground">من إجمالي {talentProfiles.length} موظف</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القادة المحتملون</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPotentials}</div>
            <p className="text-xs text-muted-foreground">مؤهلون للقيادة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المسارات الوظيفية</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCareerPaths}</div>
            <p className="text-xs text-muted-foreground">مسار نشط</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط المشاركة</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">نسبة الرضا الوظيفي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تنبيهات الإحلال</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.criticalSuccessions}</div>
            <p className="text-xs text-muted-foreground">موقع حرج</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المواهب عالية الأداء</CardTitle>
            <CardDescription>الموظفون ذوو الأداء المتميز</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {talentProfiles.filter(p => p.performanceRating >= 4.5).map((talent) => (
                  <div key={talent.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{talent.name}</h4>
                      <p className="text-sm text-muted-foreground">{talent.position}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{talent.performanceRating}/5.0</span>
                      </div>
                    </div>
                    <Badge variant={talent.potentialLevel === 'high' ? 'default' : 'secondary'}>
                      {talent.potentialLevel === 'high' ? 'إمكانية عالية' : 'إمكانية متوسطة'}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تنبيهات الإحلال الوظيفي</CardTitle>
            <CardDescription>المناصب التي تحتاج خطط إحلال</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {successionPlans.map((plan) => (
                  <div key={plan.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{plan.position}</h4>
                      <Badge variant={plan.criticalLevel === 'high' ? 'destructive' : 'secondary'}>
                        {plan.criticalLevel === 'high' ? 'حرج' : 'عادي'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">الحالي: {plan.currentHolder}</p>
                    <div className="space-y-1">
                      {plan.successors.slice(0, 2).map((successor, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{successor.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {successor.timeToReady}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTalentAcquisition = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الاستقطاب الاستراتيجي</h2>
        <div className="flex gap-2">
          <Button onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            تصدير PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileText className="h-4 w-4 mr-2" />
            تصدير Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>مراجعة جودة التوظيف</CardTitle>
          <CardDescription>متابعة توافق المرشحين الجدد مع الاحتياجات طويلة الأجل</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <p className="text-sm text-muted-foreground">نسبة التوافق الاستراتيجي</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <p className="text-sm text-muted-foreground">موظف جديد هذا الشهر</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">90%</div>
                  <p className="text-sm text-muted-foreground">معدل الاحتفاظ للسنة الأولى</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">الموظفون الجدد المتميزون</h3>
            <div className="space-y-3">
              {[
                { name: 'سارة أحمد', position: 'مطورة برمجيات', hireDate: '2024-01-15', alignment: 95 },
                { name: 'محمد خالد', position: 'محلل أعمال', hireDate: '2024-01-20', alignment: 88 },
                { name: 'نور السالم', position: 'مصممة UX', hireDate: '2024-02-01', alignment: 92 }
              ].map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{employee.name}</h4>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <p className="text-xs text-muted-foreground">تاريخ التوظيف: {employee.hireDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{employee.alignment}%</div>
                    <Progress value={employee.alignment} className="w-20 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCareerDevelopment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">التطوير المهني</h2>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة مسار وظيفي
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <FileText className="h-4 w-4 mr-2" />
            طباعة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerPaths.map((path) => (
          <Card key={path.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {path.title}
                <Badge>{path.employeesCount} موظف</Badge>
              </CardTitle>
              <CardDescription>
                من {path.currentLevel} إلى {path.nextLevel}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">المهارات المطلوبة</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">برامج التدريب</h4>
                  <div className="space-y-2">
                    {path.trainingPrograms.map((program, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        {program}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">المدة المتوقعة: {path.estimatedTime}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPerformanceRetention = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة الأداء والاحتفاظ</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          برنامج احتفاظ جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>خطر الاستقالة العالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {talentProfiles.filter(p => p.retentionRisk === 'high').map((talent) => (
                <div key={talent.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <h4 className="font-medium">{talent.name}</h4>
                    <p className="text-sm text-muted-foreground">{talent.position}</p>
                  </div>
                  <Badge variant="destructive">عالي</Badge>
                </div>
              ))}
              {talentProfiles.filter(p => p.retentionRisk === 'high').length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">لا توجد حالات خطر عالي</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>خطر الاستقالة المتوسط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {talentProfiles.filter(p => p.retentionRisk === 'medium').map((talent) => (
                <div key={talent.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <h4 className="font-medium">{talent.name}</h4>
                    <p className="text-sm text-muted-foreground">{talent.position}</p>
                  </div>
                  <Badge variant="secondary">متوسط</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>استقرار عالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {talentProfiles.filter(p => p.retentionRisk === 'low').map((talent) => (
                <div key={talent.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <h4 className="font-medium">{talent.name}</h4>
                    <p className="text-sm text-muted-foreground">{talent.position}</p>
                  </div>
                  <Badge variant="default">مستقر</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>برامج الولاء والاحتفاظ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { program: 'برنامج المكافآت التقديرية', participants: 25, effectiveness: 85 },
              { program: 'برنامج التطوير الداخلي', participants: 18, effectiveness: 92 },
              { program: 'برنامج المرونة في العمل', participants: 45, effectiveness: 78 },
              { program: 'برنامج التقدير الشهري', participants: 60, effectiveness: 88 }
            ].map((program, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{program.program}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{program.participants} مشارك</span>
                  <span>فعالية {program.effectiveness}%</span>
                </div>
                <Progress value={program.effectiveness} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">إدارة المواهب</h1>
          <p className="text-muted-foreground">إدارة شاملة للمواهب والقدرات البشرية</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="acquisition" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            الاستقطاب
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            التطوير المهني
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            الأداء والاحتفاظ
          </TabsTrigger>
          <TabsTrigger value="succession" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            الإحلال الوظيفي
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            المشاركة والثقافة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="acquisition" className="mt-6">
          {renderTalentAcquisition()}
        </TabsContent>

        <TabsContent value="development" className="mt-6">
          {renderCareerDevelopment()}
        </TabsContent>

        <TabsContent value="retention" className="mt-6">
          {renderPerformanceRetention()}
        </TabsContent>

        <TabsContent value="succession" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">الإحلال الوظيفي</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                خطة إحلال جديدة
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {successionPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {plan.position}
                      <Badge variant={plan.criticalLevel === 'high' ? 'destructive' : 'secondary'}>
                        {plan.criticalLevel === 'high' ? 'حرج' : 'عادي'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>الشاغل الحالي: {plan.currentHolder}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-4">المرشحون للإحلال</h4>
                    <div className="space-y-3">
                      {plan.successors.map((successor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h5 className="font-medium">{successor.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {successor.readiness === 'ready' && 'جاهز للإحلال'}
                              {successor.readiness === 'developing' && 'قيد التطوير'}
                              {successor.readiness === 'needs_development' && 'يحتاج تطوير'}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={
                              successor.readiness === 'ready' ? 'default' :
                              successor.readiness === 'developing' ? 'secondary' : 'outline'
                            }>
                              {successor.timeToReady}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">المشاركة والثقافة المؤسسية</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                استطلاع جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <p className="text-sm text-muted-foreground">الرضا الوظيفي العام</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <p className="text-sm text-muted-foreground">الولاء للمؤسسة</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <p className="text-sm text-muted-foreground">التوصية بالعمل</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">78%</div>
                    <p className="text-sm text-muted-foreground">التوازن الوظيفي</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>مبادرات تحسين بيئة العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { initiative: 'برنامج الصحة النفسية', status: 'نشط', impact: 85 },
                    { initiative: 'مساحات العمل المرنة', status: 'نشط', impact: 78 },
                    { initiative: 'برنامج التقدير الأسبوعي', status: 'قيد التطوير', impact: 92 },
                    { initiative: 'نشاطات بناء الفريق', status: 'نشط', impact: 88 }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{item.initiative}</h4>
                        <Badge variant={item.status === 'نشط' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>التأثير: {item.impact}%</span>
                      </div>
                      <Progress value={item.impact} className="mt-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentManagement;