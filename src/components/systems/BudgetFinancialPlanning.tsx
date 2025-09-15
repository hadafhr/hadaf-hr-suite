import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Calculator, 
  Target, 
  BarChart3, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react';

interface BudgetFinancialPlanningProps {
  onBack?: () => void;
}

const BudgetFinancialPlanning: React.FC<BudgetFinancialPlanningProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const budgetData = {
    totalBudget: 5000000,
    allocated: 3200000,
    spent: 2800000,
    remaining: 400000,
    utilization: 87.5
  };

  const departments = [
    { name: 'الموارد البشرية', budget: 800000, spent: 720000, percentage: 90 },
    { name: 'التكنولوجيا', budget: 1200000, spent: 980000, percentage: 81.7 },
    { name: 'العمليات', budget: 900000, spent: 750000, percentage: 83.3 },
    { name: 'التسويق', budget: 500000, spent: 350000, percentage: 70 }
  ];

  const upcomingExpenses = [
    { item: 'رواتب الشهر القادم', amount: 450000, date: '2024-02-01', priority: 'عالي' },
    { item: 'تدريب الموظفين', amount: 75000, date: '2024-02-15', priority: 'متوسط' },
    { item: 'تحديث الأنظمة', amount: 120000, date: '2024-02-20', priority: 'عالي' },
    { item: 'المكافآت السنوية', amount: 200000, date: '2024-03-01', priority: 'متوسط' }
  ];

  const BudgetOverview = () => (
    <div className="space-y-6">
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              إجمالي الميزانية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">{budgetData.totalBudget.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foregrounde">
              المخصص
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">{budgetData.allocated.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المُنفق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{budgetData.spent.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              المتبقي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">{budgetData.remaining.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">ريال</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Budget Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            توزيع الميزانية على الأقسام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {dept.spent.toLocaleString()} / {dept.budget.toLocaleString()} ريال
                    </span>
                    <Badge variant={dept.percentage > 85 ? "destructive" : dept.percentage > 70 ? "default" : "secondary"}>
                      {dept.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dept.percentage > 85 ? 'bg-red-500' : 
                      dept.percentage > 70 ? 'bg-primary' : 'bg-green-500'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            المصروفات المقبلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    expense.priority === 'عالي' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{expense.item}</p>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-semibold">{expense.amount.toLocaleString()} ريال</p>
                  <Badge variant={expense.priority === 'عالي' ? "destructive" : "default"}>
                    {expense.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const BudgetPlanning = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          تخطيط الميزانية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>وحدة تخطيط الميزانية قيد التطوير</p>
          <p className="text-sm">ستتضمن أدوات التخطيط والتنبؤ المالي</p>
        </div>
      </CardContent>
    </Card>
  );

  const FinancialReports = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          التقارير المالية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>وحدة التقارير المالية قيد التطوير</p>
          <p className="text-sm">ستتضمن تقارير تفصيلية وتحليلات مالية</p>
        </div>
      </CardContent>
    </Card>
  );

  const CostControl = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          مراقبة التكاليف
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-20 text-muted-foreground">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>وحدة مراقبة التكاليف قيد التطوير</p>
          <p className="text-sm">ستتضمن أدوات مراقبة وتحكم في التكاليف</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
        <div className="flex items-center gap-6">
          {onBack && (
            <>
              <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300">
                <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
                رجوع
              </Button>
              <div className="h-8 w-px bg-gray-300"></div>
            </>
          )}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              <DollarSign className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                قسم الميزانية والتخطيط المالي
              </h1>
              <p className="text-muted-foreground text-lg">
                إدارة شاملة للميزانيات والتخطيط المالي المؤسسي
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 ml-2" />
            نظام متقدم
          </Badge>
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-foreground">
                نظام الميزانية والتخطيط المالي المتكامل
              </CardTitle>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  نظام معتمد
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">نظرة عامة</span>
                </TabsTrigger>
                <TabsTrigger
                  value="planning"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="font-medium">التخطيط</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">التقارير</span>
                </TabsTrigger>
                <TabsTrigger
                  value="control"
                  className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">مراقبة التكاليف</span>
                </TabsTrigger>
              </TabsList>

              <div className="animate-fade-in">
                <TabsContent value="overview">
                  <BudgetOverview />
                </TabsContent>
                
                <TabsContent value="planning">
                  <BudgetPlanning />
                </TabsContent>
                
                <TabsContent value="reports">
                  <FinancialReports />
                </TabsContent>
                
                <TabsContent value="control">
                  <CostControl />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetFinancialPlanning;