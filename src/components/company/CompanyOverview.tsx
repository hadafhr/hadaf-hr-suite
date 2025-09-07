import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  DollarSign,
  Calendar,
  Bell,
  Eye,
  Download
} from 'lucide-react';

export const CompanyOverview: React.FC = () => {
  // Mock data
  const employeeGrowthData = [
    { month: 'يناير', employees: 180 },
    { month: 'فبراير', employees: 195 },
    { month: 'مارس', employees: 210 },
    { month: 'أبريل', employees: 225 },
    { month: 'مايو', employees: 240 },
    { month: 'يونيو', employees: 245 }
  ];

  const departmentData = [
    { name: 'الموارد البشرية', value: 45, color: '#3b82f6' },
    { name: 'التقنية', value: 85, color: '#10b981' },
    { name: 'المبيعات', value: 65, color: '#f59e0b' },
    { name: 'التسويق', value: 35, color: '#8b5cf6' },
    { name: 'المالية', value: 15, color: '#ef4444' }
  ];

  const systemMetrics = [
    {
      title: 'معدل الحضور الشهري',
      value: '94.5%',
      change: '+2.3%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      title: 'رضا الموظفين',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      color: 'text-blue-600'
    },
    {
      title: 'الإنتاجية العامة',
      value: '87%',
      change: '+5%',
      trend: 'up',
      color: 'text-purple-600'
    },
    {
      title: 'الكفاءة التشغيلية',
      value: '91%',
      change: '+1.5%',
      trend: 'up',
      color: 'text-emerald-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'تم إنشاء تقييم أداء جديد',
      description: 'قسم الموارد البشرية - 15 موظف',
      time: 'منذ ساعتين',
      type: 'performance',
      icon: <TrendingUp className="w-4 h-4 text-blue-500" />
    },
    {
      id: 2,
      title: 'طلب إجازة جديد',
      description: 'أحمد محمد - إجازة سنوية',
      time: 'منذ 4 ساعات',
      type: 'leave',
      icon: <Calendar className="w-4 h-4 text-orange-500" />
    },
    {
      id: 3,
      title: 'تحديث بيانات موظف',
      description: 'سارة أحمد - تحديث المعلومات الشخصية',
      time: 'منذ 6 ساعات',
      type: 'update',
      icon: <Users className="w-4 h-4 text-green-500" />
    },
    {
      id: 4,
      title: 'تذكير دفع راتب',
      description: 'موعد دفع رواتب شهر يونيو',
      time: 'منذ يوم',
      type: 'payroll',
      icon: <DollarSign className="w-4 h-4 text-purple-500" />
    }
  ];

  const quickActions = [
    {
      title: 'إضافة موظف جديد',
      description: 'تسجيل موظف جديد في النظام',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      title: 'إنشاء تقرير شهري',
      description: 'تقرير شامل عن أداء الشركة',
      icon: <BarChart className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      title: 'إدارة الرواتب',
      description: 'معالجة رواتب الموظفين',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      title: 'مراجعة الطلبات',
      description: 'مراجعة طلبات الإجازات والتقييمات',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* System Health Status */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              حالة النظام العامة
            </CardTitle>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              نشط وسليم
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h4>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm ${metric.color} flex items-center justify-center gap-1 mt-1`}>
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              نمو عدد الموظفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="employees" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              توزيع الموظفين حسب الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                النشاطات الأخيرة
              </CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                عرض الكل
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center text-center space-y-2 hover:shadow-md transition-all"
                >
                  <div className={`p-3 rounded-full text-white ${action.color}`}>
                    {action.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            تحميل التقارير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              تقرير الحضور الشهري
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              تقرير الرواتب
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              تقرير الأداء العام
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};