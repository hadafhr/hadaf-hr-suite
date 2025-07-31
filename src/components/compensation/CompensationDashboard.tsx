import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  AlertCircle,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

export const CompensationDashboard: React.FC = () => {
  // Mock data for dashboard
  const dashboardData = {
    totalBudget: 2500000,
    usedBudget: 1850000,
    budgetUtilization: 74,
    upcomingRaises: 15,
    pendingPromotions: 8,
    activeAssignments: 5,
    recentActivity: [
      { id: 1, type: 'raise', employee: 'أحمد محمد', amount: 500, date: '2024-01-20' },
      { id: 2, type: 'promotion', employee: 'فاطمة علي', amount: 1300, date: '2024-01-18' },
      { id: 3, type: 'reward', employee: 'خالد سالم', amount: 2000, date: '2024-01-15' },
      { id: 4, type: 'assignment', employee: 'سارة أحمد', amount: 1800, date: '2024-01-12' }
    ],
    salaryDistribution: [
      { category: 'الفئة الدنيا', count: 45, percentage: 35, avgSalary: 5500 },
      { category: 'الإشرافية', count: 38, percentage: 30, avgSalary: 8200 },
      { category: 'التنفيذية', count: 28, percentage: 22, avgSalary: 12500 },
      { category: 'العليا', count: 17, percentage: 13, avgSalary: 18000 }
    ],
    performanceMetrics: {
      excellent: 32,
      veryGood: 45,
      good: 38,
      acceptable: 15,
      poor: 3
    },
    alerts: [
      { id: 1, type: 'warning', message: 'اقتراب انتهاء مهلة تقييمات الأداء السنوية', priority: 'high' },
      { id: 2, type: 'info', message: '15 موظف مؤهلين للترقية هذا العام', priority: 'medium' },
      { id: 3, type: 'warning', message: 'تجاوز ميزانية المكافآت 80% من الحد المسموح', priority: 'high' }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'raise': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'promotion': return <Award className="w-4 h-4 text-purple-600" />;
      case 'reward': return <DollarSign className="w-4 h-4 text-yellow-600" />;
      case 'assignment': return <Calendar className="w-4 h-4 text-blue-600" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'raise': return 'علاوة';
      case 'promotion': return 'ترقية';
      case 'reward': return 'مكافأة';
      case 'assignment': return 'انتداب';
      default: return 'نشاط';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">استخدام الميزانية</p>
                <p className="text-2xl font-bold">{dashboardData.budgetUtilization}%</p>
                <Progress value={dashboardData.budgetUtilization} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">علاوات قادمة</p>
                <p className="text-2xl font-bold">{dashboardData.upcomingRaises}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">ترقيات معلقة</p>
                <p className="text-2xl font-bold">{dashboardData.pendingPromotions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">انتدابات نشطة</p>
                <p className="text-2xl font-bold">{dashboardData.activeAssignments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على الميزانية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">الميزانية الإجمالية</span>
                <span className="font-medium">{(dashboardData.totalBudget / 1000000).toFixed(1)}م ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">المستخدم</span>
                <span className="font-medium text-blue-600">{(dashboardData.usedBudget / 1000000).toFixed(1)}م ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">المتبقي</span>
                <span className="font-medium text-green-600">
                  {((dashboardData.totalBudget - dashboardData.usedBudget) / 1000000).toFixed(1)}م ريال
                </span>
              </div>
            </div>
            
            <div className="col-span-2">
              <Progress value={dashboardData.budgetUtilization} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>{dashboardData.budgetUtilization}% مستخدم</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع الرواتب حسب الفئات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.salaryDistribution.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {category.count} موظف - متوسط {category.avgSalary.toLocaleString()} ريال
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع تقييمات الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge className="bg-green-100 text-green-800">ممتاز</Badge>
                <span className="text-sm font-medium">{dashboardData.performanceMetrics.excellent} موظف</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge className="bg-blue-100 text-blue-800">جيد جداً</Badge>
                <span className="text-sm font-medium">{dashboardData.performanceMetrics.veryGood} موظف</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge className="bg-yellow-100 text-yellow-800">جيد</Badge>
                <span className="text-sm font-medium">{dashboardData.performanceMetrics.good} موظف</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge className="bg-orange-100 text-orange-800">مقبول</Badge>
                <span className="text-sm font-medium">{dashboardData.performanceMetrics.acceptable} موظف</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge className="bg-red-100 text-red-800">ضعيف</Badge>
                <span className="text-sm font-medium">{dashboardData.performanceMetrics.poor} موظف</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.employee}</p>
                    <p className="text-xs text-muted-foreground">
                      {getActivityLabel(activity.type)} - {activity.amount.toLocaleString()} ريال
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>التنبيهات المهمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-600' : 
                    alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <Badge className={`${getPriorityColor(alert.priority)} mt-1 text-xs`}>
                      {alert.priority === 'high' ? 'عالي' : 
                       alert.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">معالجة العلاوات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Award className="w-6 h-6" />
              <span className="text-sm">مراجعة الترقيات</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">إدارة المكافآت</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">تقارير شاملة</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};