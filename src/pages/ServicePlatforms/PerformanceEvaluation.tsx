import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  TrendingUp, 
  Target, 
  Calendar,
  Users,
  BarChart3,
  Star,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const performanceData = [
  { month: 'يناير', performance: 85, goal: 90 },
  { month: 'فبراير', performance: 92, goal: 90 },
  { month: 'مارس', performance: 88, goal: 90 },
  { month: 'أبريل', performance: 95, goal: 90 },
  { month: 'مايو', performance: 89, goal: 90 },
  { month: 'يونيو', performance: 94, goal: 90 }
];

const skillsData = [
  { skill: 'الاتصال', score: 85, fullMark: 100 },
  { skill: 'القيادة', score: 78, fullMark: 100 },
  { skill: 'التقنية', score: 92, fullMark: 100 },
  { skill: 'حل المشاكل', score: 88, fullMark: 100 },
  { skill: 'العمل الجماعي', score: 90, fullMark: 100 },
  { skill: 'إدارة الوقت', score: 82, fullMark: 100 }
];

const employees = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    overallScore: 92,
    lastEvaluation: "2024-01-15",
    status: "مكتمل",
    goals: [
      { title: "تطوير 3 مشاريع جديدة", progress: 85, status: "جاري" },
      { title: "تدريب فريق المطورين", progress: 100, status: "مكتمل" },
      { title: "تحسين الأداء بنسبة 20%", progress: 60, status: "جاري" }
    ]
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "المالية",
    overallScore: 88,
    lastEvaluation: "2024-01-10",
    status: "مكتمل",
    goals: [
      { title: "تطبيق نظام محاسبي جديد", progress: 90, status: "جاري" },
      { title: "تقليل الأخطاء المحاسبية", progress: 100, status: "مكتمل" },
      { title: "إعداد التقارير الشهرية", progress: 95, status: "جاري" }
    ]
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "المبيعات",
    overallScore: 78,
    lastEvaluation: "2023-12-20",
    status: "مطلوب",
    goals: [
      { title: "زيادة المبيعات بنسبة 15%", progress: 45, status: "جاري" },
      { title: "اكتساب 20 عميل جديد", progress: 70, status: "جاري" },
      { title: "تحسين رضا العملاء", progress: 30, status: "جاري" }
    ]
  }
];

export const PerformanceEvaluation: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(employees[0]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              تقييم الأداء KPIs
            </h1>
            <p className="text-muted-foreground">
              أنظمة متطورة لقياس وتقييم الأداء باستخدام مؤشرات الأداء الرئيسية
            </p>
          </div>
          <Button className="btn-primary">
            <Target className="h-4 w-4 mr-2" />
            إنشاء تقييم جديد
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الأداء العام</p>
                <p className="text-2xl font-bold text-primary">86%</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الأهداف المحققة</p>
                <p className="text-2xl font-bold text-success">78%</p>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقييمات المكتملة</p>
                <p className="text-2xl font-bold text-primary">185</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التقييمات المعلقة</p>
                <p className="text-2xl font-bold text-warning">12</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <Card className="dashboard-card">
            <h3 className="text-lg font-semibold mb-4">الموظفين</h3>
            <div className="space-y-3">
              {employees.map((employee) => (
                <div 
                  key={employee.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedEmployee?.id === employee.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">{employee.name}</h4>
                    <Badge variant={
                      employee.status === 'مكتمل' ? 'default' : 
                      employee.status === 'مطلوب' ? 'destructive' : 'secondary'
                    }>
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{employee.position}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">الأداء العام</span>
                    <span className="text-sm font-medium">{employee.overallScore}%</span>
                  </div>
                  <Progress value={employee.overallScore} className="h-2 mt-1" />
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Overview */}
            <Card className="dashboard-card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{selectedEmployee.overallScore}%</div>
                  <p className="text-sm text-muted-foreground">الأداء العام</p>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="goals">الأهداف</TabsTrigger>
                  <TabsTrigger value="skills">المهارات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="performance" fill="hsl(var(--primary))" name="الأداء الفعلي" />
                        <Bar dataKey="goal" fill="hsl(var(--muted))" name="الهدف" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="goals" className="space-y-4">
                  {selectedEmployee.goals.map((goal: any, index: number) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant={
                          goal.status === 'مكتمل' ? 'default' : 'secondary'
                        }>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">التقدم</span>
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="المهارات"
                          dataKey="score"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إجراءات سريعة</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                إنشاء تقييم جديد
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                تصدير التقارير
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                مراجعة جماعية
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">التقييمات القادمة</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">أحمد السعد</span>
                <span className="text-xs text-muted-foreground">15 فبراير</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">سارة المطيري</span>
                <span className="text-xs text-muted-foreground">20 فبراير</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">خالد العتيبي</span>
                <span className="text-xs text-muted-foreground">25 فبراير</span>
              </div>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">الإحصائيات</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">أعلى أداء</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">أقل أداء</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">معدل تحقيق الأهداف</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};