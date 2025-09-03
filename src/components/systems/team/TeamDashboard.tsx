import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserCheck, UserX, Clock, TrendingUp, TrendingDown, 
  Calendar, Award, Target, Activity, AlertTriangle, CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TeamDashboard = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const employeeStats = [
    {
      title: isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      value: '356',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: isRTL ? 'الموظفون النشطون' : 'Active Employees',
      value: '342',
      change: '+8',
      trend: 'up',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: isRTL ? 'تحت التجربة' : 'On Trial Period',
      value: '14',
      change: '+2',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: isRTL ? 'منتهية الخدمة' : 'Terminated',
      value: '23',
      change: '-3',
      trend: 'down',
      icon: UserX,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  const departmentData = [
    { name: isRTL ? 'تقنية المعلومات' : 'IT', employees: 45, active: 43, onLeave: 2 },
    { name: isRTL ? 'الموارد البشرية' : 'HR', employees: 28, active: 26, onLeave: 2 },
    { name: isRTL ? 'المالية' : 'Finance', employees: 32, active: 31, onLeave: 1 },
    { name: isRTL ? 'التسويق' : 'Marketing', employees: 38, active: 35, onLeave: 3 },
    { name: isRTL ? 'المبيعات' : 'Sales', employees: 52, active: 48, onLeave: 4 },
    { name: isRTL ? 'العمليات' : 'Operations', employees: 67, active: 63, onLeave: 4 }
  ];

  const performanceTrend = [
    { month: 'Jan', performance: 85, attendance: 94, satisfaction: 78 },
    { month: 'Feb', performance: 87, attendance: 96, satisfaction: 82 },
    { month: 'Mar', performance: 89, attendance: 95, satisfaction: 85 },
    { month: 'Apr', performance: 92, attendance: 97, satisfaction: 88 },
    { month: 'May', performance: 94, attendance: 98, satisfaction: 91 },
    { month: 'Jun', performance: 96, attendance: 99, satisfaction: 94 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new_hire',
      message: isRTL ? 'تم تعيين أحمد محمد في قسم تقنية المعلومات' : 'Ahmed Mohammed hired in IT Department',
      time: '2 hours ago',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'promotion',
      message: isRTL ? 'تم ترقية سارة أحمد إلى منصب مدير المشروع' : 'Sara Ahmed promoted to Project Manager',
      time: '4 hours ago',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'warning',
      message: isRTL ? 'تنبيه: محمد علي لديه 3 أيام غياب متتالية' : 'Warning: Mohammed Ali has 3 consecutive absences',
      time: '6 hours ago',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'completion',
      message: isRTL ? 'فاطمة حسن أكملت دورة الأمان المهني' : 'Fatima Hassan completed Safety Training',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  const quickActions = [
    { label: isRTL ? 'إضافة موظف جديد' : 'Add New Employee', icon: Users, color: 'bg-blue-600' },
    { label: isRTL ? 'تقرير الحضور' : 'Attendance Report', icon: Calendar, color: 'bg-green-600' },
    { label: isRTL ? 'تقييم الأداء' : 'Performance Review', icon: Award, color: 'bg-purple-600' },
    { label: isRTL ? 'تحديث البيانات' : 'Update Records', icon: Activity, color: 'bg-orange-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isRTL ? 'لوحة تحكم فريق العمل' : 'Team Dashboard'}
        </h2>
        <p className="text-gray-600">
          {isRTL ? 'نظرة شاملة على حالة الموظفين والأداء العام للفريق' : 'Comprehensive overview of employee status and team performance'}
        </p>
      </div>

      {/* Employee Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => (
          <Card key={index} className={`${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-lg transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {isRTL ? 'توزيع الموظفين حسب الأقسام' : 'Employee Distribution by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {isRTL ? 'اتجاهات الأداء' : 'Performance Trends'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="hsl(var(--primary))" strokeWidth={3} />
                <Line type="monotone" dataKey="attendance" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-3))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {isRTL ? 'النشاطات الأخيرة' : 'Recent Activities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full bg-white shadow-sm`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamDashboard;