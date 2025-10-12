import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  RefreshCw,
  PieChart,
  Settings
} from 'lucide-react';

export const WorkforcePlanningBudget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data
  const budgetData = {
    totalBudget: 15000000,
    allocatedBudget: 12500000,
    usedBudget: 10200000,
    remainingBudget: 4800000,
    budgetUtilization: 68,
    forecastAccuracy: 87,
    savingsAchieved: 320000,
    overBudgetItems: 3
  };

  const workforceMetrics = {
    totalHeadcount: 248,
    projectedHeadcount: 275,
    vacantPositions: 12,
    planedHires: 15,
    avgSalary: 8500,
    turnoverRate: 8.5,
    timeToFill: 45,
    costPerHire: 12000
  };

  const departmentBudgets = [
    { 
      id: 1, 
      name: 'التكنولوجيا', 
      budget: 4500000, 
      allocated: 4200000, 
      spent: 3800000, 
      headcount: 62,
      projected: 68,
      utilization: 90,
      status: 'on-track'
    },
    { 
      id: 2, 
      name: 'المبيعات', 
      budget: 3800000, 
      allocated: 3500000, 
      spent: 3200000, 
      headcount: 48,
      projected: 52,
      utilization: 91,
      status: 'on-track'
    },
    { 
      id: 3, 
      name: 'الموارد البشرية', 
      budget: 2200000, 
      allocated: 2000000, 
      spent: 1650000, 
      headcount: 28,
      projected: 30,
      utilization: 83,
      status: 'under-budget'
    },
    { 
      id: 4, 
      name: 'التسويق', 
      budget: 1800000, 
      allocated: 1700000, 
      spent: 1800000, 
      headcount: 32,
      projected: 35,
      utilization: 106,
      status: 'over-budget'
    },
    { 
      id: 5, 
      name: 'المالية', 
      budget: 1500000, 
      allocated: 1400000, 
      spent: 1200000, 
      headcount: 22,
      projected: 24,
      utilization: 86,
      status: 'on-track'
    },
    { 
      id: 6, 
      name: 'العمليات', 
      budget: 1200000, 
      allocated: 1100000, 
      spent: 950000, 
      headcount: 18,
      projected: 20,
      utilization: 86,
      status: 'on-track'
    }
  ];

  const hiringPlan = [
    { quarter: 'Q1 2024', planned: 8, actual: 7, budget: 96000, spent: 84000 },
    { quarter: 'Q2 2024', planned: 12, actual: 10, budget: 144000, spent: 120000 },
    { quarter: 'Q3 2024', planned: 10, actual: 0, budget: 120000, spent: 0 },
    { quarter: 'Q4 2024', planned: 15, actual: 0, budget: 180000, spent: 0 }
  ];

  const costAnalysis = [
    { category: 'الرواتب الأساسية', amount: 8200000, percentage: 80.4, trend: 'stable' },
    { category: 'البدلات والمزايا', amount: 1200000, percentage: 11.8, trend: 'up' },
    { category: 'المكافآت', amount: 450000, percentage: 4.4, trend: 'down' },
    { category: 'التأمينات', amount: 250000, percentage: 2.5, trend: 'stable' },
    { category: 'التدريب والتطوير', amount: 100000, percentage: 0.9, trend: 'up' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return <Badge className="bg-success/20 text-success border-success/30">في المسار</Badge>;
      case 'over-budget':
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">تجاوز الميزانية</Badge>;
      case 'under-budget':
        return <Badge className="bg-accent/20 text-accent-foreground border-accent/30">أقل من الميزانية</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-destructive" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-success" />;
      default:
        return <div className="w-4 h-4 border-t-2 border-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">تخطيط القوى العاملة والتوافق مع الميزانية</h1>
          <p className="text-muted-foreground">إدارة متكاملة لتخطيط الموارد البشرية والميزانيات ومراقبة التكاليف</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الميزانية</p>
                <p className="text-2xl font-bold text-foreground">{(budgetData.totalBudget / 1000000).toFixed(1)}م</p>
                <p className="text-xs text-muted-foreground mt-1">ريال سعودي</p>
              </div>
              <div className="p-3 bg-accent/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
            <Progress value={budgetData.budgetUtilization} className="mt-3 h-1.5" />
            <p className="text-xs text-muted-foreground mt-2">
              {budgetData.budgetUtilization}% مستخدم
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-foreground">{workforceMetrics.totalHeadcount}</p>
                <p className="text-xs text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{workforceMetrics.projectedHeadcount - workforceMetrics.totalHeadcount} متوقع
                </p>
              </div>
              <div className="p-3 bg-success/20 rounded-lg">
                <Users className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">دقة التوقعات</p>
                <p className="text-2xl font-bold text-foreground">{budgetData.forecastAccuracy}%</p>
                <p className="text-xs text-muted-foreground mt-1">معدل الدقة</p>
              </div>
              <div className="p-3 bg-accent/20 rounded-lg">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الوفورات المحققة</p>
                <p className="text-2xl font-bold text-foreground">{(budgetData.savingsAchieved / 1000).toFixed(0)}ك</p>
                <p className="text-xs text-success mt-1">ريال سعودي</p>
              </div>
              <div className="p-3 bg-success/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
          <TabsTrigger value="hiring">خطة التوظيف</TabsTrigger>
          <TabsTrigger value="analysis">تحليل التكاليف</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Status */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  حالة الميزانية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الميزانية المعتمدة</span>
                    <span className="font-medium text-foreground">{(budgetData.totalBudget / 1000000).toFixed(2)}م ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">المخصص</span>
                    <span className="font-medium text-accent-foreground">{(budgetData.allocatedBudget / 1000000).toFixed(2)}م ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">المستخدم</span>
                    <span className="font-medium text-accent-foreground">{(budgetData.usedBudget / 1000000).toFixed(2)}م ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">المتبقي</span>
                    <span className="font-medium text-success">{(budgetData.remainingBudget / 1000000).toFixed(2)}م ريال</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">نسبة الاستخدام</span>
                    <Badge variant="outline" className="border-border">{budgetData.budgetUtilization}%</Badge>
                  </div>
                  <Progress value={budgetData.budgetUtilization} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Workforce Metrics */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  مؤشرات القوى العاملة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">العدد الحالي</p>
                    <p className="text-2xl font-bold text-foreground">{workforceMetrics.totalHeadcount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">المتوقع</p>
                    <p className="text-2xl font-bold text-success">{workforceMetrics.projectedHeadcount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">الوظائف الشاغرة</p>
                    <p className="text-xl font-bold text-foreground">{workforceMetrics.vacantPositions}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">التعيينات المخططة</p>
                    <p className="text-xl font-bold text-foreground">{workforceMetrics.planedHires}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">متوسط الراتب</span>
                    <span className="font-medium text-foreground">{workforceMetrics.avgSalary.toLocaleString()} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">معدل الدوران</span>
                    <span className="font-medium text-foreground">{workforceMetrics.turnoverRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">تكلفة التوظيف</span>
                    <span className="font-medium text-foreground">{workforceMetrics.costPerHire.toLocaleString()} ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-warning" />
                التنبيهات والتوصيات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">تجاوز ميزانية قسم التسويق</p>
                    <p className="text-xs text-muted-foreground mt-1">القسم تجاوز الميزانية المخصصة بنسبة 6%، يرجى المراجعة</p>
                  </div>
                  <Badge className="bg-destructive text-destructive-foreground">عالي</Badge>
                </div>

                <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">12 وظيفة شاغرة منذ أكثر من 60 يوم</p>
                    <p className="text-xs text-muted-foreground mt-1">يجب تسريع عملية التوظيف لتجنب تأثر الإنتاجية</p>
                  </div>
                  <Badge className="bg-warning text-warning-foreground">متوسط</Badge>
                </div>

                <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">وفورات ممتازة في قسم الموارد البشرية</p>
                    <p className="text-xs text-muted-foreground mt-1">القسم حقق وفورات بنسبة 17% من الميزانية المخصصة</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">إيجابي</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-foreground">ميزانيات الأقسام</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في الأقسام..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64 bg-background border-border text-foreground"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-40 bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">كل الأقسام</SelectItem>
                      <SelectItem value="on-track">في المسار</SelectItem>
                      <SelectItem value="over-budget">تجاوز الميزانية</SelectItem>
                      <SelectItem value="under-budget">أقل من الميزانية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentBudgets.map((dept) => (
                  <Card key={dept.id} className="border-border bg-background">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-lg text-foreground">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {dept.headcount} موظف حالياً • {dept.projected} متوقع
                          </p>
                        </div>
                        {getStatusBadge(dept.status)}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">الميزانية</p>
                          <p className="font-medium text-foreground">{(dept.budget / 1000000).toFixed(2)}م</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">المخصص</p>
                          <p className="font-medium text-accent-foreground">{(dept.allocated / 1000000).toFixed(2)}م</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">المستخدم</p>
                          <p className="font-medium text-accent-foreground">{(dept.spent / 1000000).toFixed(2)}م</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">الاستخدام</p>
                          <p className={`font-medium ${dept.utilization > 100 ? 'text-destructive' : dept.utilization > 90 ? 'text-warning' : 'text-success'}`}>
                            {dept.utilization}%
                          </p>
                        </div>
                      </div>

                      <Progress value={dept.utilization} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hiring Plan Tab */}
        <TabsContent value="hiring" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                خطة التوظيف السنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hiringPlan.map((plan, index) => (
                  <Card key={index} className="border-border bg-background">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{plan.quarter}</h4>
                          <p className="text-sm text-muted-foreground">
                            التوظيف الفعلي: {plan.actual} من {plan.planned}
                          </p>
                        </div>
                        <Badge variant={plan.actual >= plan.planned ? 'default' : 'secondary'}>
                          {plan.actual >= plan.planned ? 'مكتمل' : 'قيد التنفيذ'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">الميزانية المخططة</p>
                          <p className="font-medium text-foreground">{plan.budget.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">المصروف الفعلي</p>
                          <p className="font-medium text-accent-foreground">{plan.spent.toLocaleString()} ريال</p>
                        </div>
                      </div>

                      <Progress value={(plan.actual / plan.planned) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        {Math.round((plan.actual / plan.planned) * 100)}% من الخطة
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-foreground mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">إجمالي خطة التوظيف 2024</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      45 موظف مخطط • 17 تم توظيفهم • ميزانية 540,000 ريال • مصروف 204,000 ريال
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <PieChart className="w-5 h-5 text-primary" />
                تحليل هيكل التكاليف
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costAnalysis.map((cost, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{cost.category}</span>
                        {getTrendIcon(cost.trend)}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{cost.amount.toLocaleString()} ريال</p>
                        <p className="text-xs text-muted-foreground">{cost.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={cost.percentage} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {costAnalysis.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">إجمالي التكاليف</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">
                      {(budgetData.totalBudget - budgetData.usedBudget).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">المتبقي</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent-foreground">
                      {budgetData.forecastAccuracy}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">دقة التوقعات</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">التوصيات والإجراءات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border border-border rounded-lg bg-background">
                  <Target className="w-5 h-5 text-accent-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">تحسين دقة التوقعات</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      استخدام البيانات التاريخية لتحسين دقة توقعات الميزانية بنسبة 5%
                    </p>
                  </div>
                  <Button size="sm" variant="outline">تطبيق</Button>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg bg-background">
                  <Users className="w-5 h-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">تحسين عملية التوظيف</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      تقليل متوسط فترة التوظيف من 45 إلى 30 يوم لتوفير التكاليف
                    </p>
                  </div>
                  <Button size="sm" variant="outline">تطبيق</Button>
                </div>

                <div className="flex items-start gap-3 p-3 border border-border rounded-lg bg-background">
                  <DollarSign className="w-5 h-5 text-accent-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">إعادة توزيع الميزانية</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      نقل 200,000 ريال من الأقسام الأقل استخداماً إلى الأقسام الأكثر احتياجاً
                    </p>
                  </div>
                  <Button size="sm" variant="outline">تطبيق</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};