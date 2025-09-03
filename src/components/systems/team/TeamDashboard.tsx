import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, UserCheck, UserPlus, TrendingUp, TrendingDown, 
  AlertTriangle, Clock, CheckCircle, XCircle, FileText,
  Calendar, Target, Award, Briefcase
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TeamDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Mock data for dashboard
  const kpiData = [
    {
      title: isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      value: 356,
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: isRTL ? 'الموظفين النشطين' : 'Active Employees', 
      value: 334,
      change: '+8',
      trend: 'up',
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: isRTL ? 'تحت التجربة' : 'Under Probation',
      value: 25,
      change: '+3',
      trend: 'up',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: isRTL ? 'منتهي الخدمة' : 'Terminated',
      value: 11,
      change: '-2',
      trend: 'down',
      icon: XCircle,
      color: 'bg-red-500'
    }
  ];

  const departmentData = [
    { name: isRTL ? 'الموارد البشرية' : 'HR', employees: 45, color: '#8b5cf6' },
    { name: isRTL ? 'التقنية' : 'IT', employees: 78, color: '#3b82f6' },
    { name: isRTL ? 'المالية' : 'Finance', employees: 32, color: '#10b981' },
    { name: isRTL ? 'التسويق' : 'Marketing', employees: 56, color: '#f59e0b' },
    { name: isRTL ? 'العمليات' : 'Operations', employees: 89, color: '#ef4444' },
    { name: isRTL ? 'المبيعات' : 'Sales', employees: 67, color: '#8b5cf6' }
  ];

  const performanceData = [
    { month: 'Jan', performance: 85, satisfaction: 78 },
    { month: 'Feb', performance: 88, satisfaction: 82 },
    { month: 'Mar', performance: 87, satisfaction: 85 },
    { month: 'Apr', performance: 92, satisfaction: 88 },
    { month: 'May', performance: 94, satisfaction: 90 },
    { month: 'Jun', performance: 96, satisfaction: 94 }
  ];

  const alerts = [
    {
      type: 'urgent',
      title: isRTL ? 'انتهاء فترة التجربة' : 'Probation Period Ending',
      message: isRTL ? '5 موظفين تنتهي فترة تجربتهم خلال أسبوع' : '5 employees probation ending in a week',
      count: 5
    },
    {
      type: 'warning', 
      title: isRTL ? 'وثائق مفقودة' : 'Missing Documents',
      message: isRTL ? '12 موظف لديهم وثائق ناقصة' : '12 employees have incomplete documents',
      count: 12
    },
    {
      type: 'info',
      title: isRTL ? 'تقييمات الأداء' : 'Performance Reviews',
      message: isRTL ? '23 موظف يحتاجون تقييم أداء' : '23 employees need performance review',
      count: 23
    }
  ];

  const recentActivities = [
    { type: 'add', message: isRTL ? 'تم إضافة موظف جديد: أحمد محمد' : 'New employee added: Ahmed Mohamed', time: '2 hours ago' },
    { type: 'update', message: isRTL ? 'تم تحديث راتب: سارة أحمد' : 'Salary updated: Sara Ahmed', time: '4 hours ago' },
    { type: 'document', message: isRTL ? 'تم رفع عقد جديد: محمد علي' : 'New contract uploaded: Mohamed Ali', time: '1 day ago' },
    { type: 'promotion', message: isRTL ? 'ترقية موظف: ليلى حسن' : 'Employee promoted: Laila Hassan', time: '2 days ago' }
  ];
  const performanceData = [
    { month: 'يناير', performance: 85, attendance: 92, projects: 15 },
    { month: 'فبراير', performance: 87, attendance: 94, projects: 18 },
    { month: 'مارس', performance: 89, attendance: 96, projects: 20 },
    { month: 'أبريل', performance: 88, attendance: 93, projects: 17 },
    { month: 'مايو', performance: 91, attendance: 95, projects: 22 },
    { month: 'يونيو', performance: 93, attendance: 97, projects: 25 }
  ];

  const departmentDistribution = [
    { name: 'تقنية المعلومات', value: 35, color: '#3b82f6' },
    { name: 'الموارد البشرية', value: 20, color: '#10b981' },
    { name: 'المالية', value: 15, color: '#f59e0b' },
    { name: 'التسويق', value: 18, color: '#8b5cf6' },
    { name: 'العمليات', value: 12, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موظفين نشطين</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeMembers}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأقسام</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgPerformance}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الحضور</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgAttendance}%</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الخبرة (سنة)</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgExperience}</p>
              </div>
              <Award className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أداء الفريق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="performance" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="attendance" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="projects" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamDashboard;