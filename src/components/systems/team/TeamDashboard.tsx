import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, UserCheck, UserPlus, TrendingUp, TrendingDown, 
  AlertTriangle, Clock, XCircle, FileText,
  Calendar, Target, Award, Briefcase
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const TeamDashboard = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const kpiData = [
    { title: isRTL ? 'إجمالي الموظفين' : 'Total Employees', value: 356, change: '+12', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { title: isRTL ? 'الموظفين النشطين' : 'Active Employees', value: 334, change: '+8', trend: 'up', icon: UserCheck, color: 'bg-green-500' },
    { title: isRTL ? 'تحت التجربة' : 'Under Probation', value: 25, change: '+3', trend: 'up', icon: Clock, color: 'bg-yellow-500' },
    { title: isRTL ? 'منتهي الخدمة' : 'Terminated', value: 11, change: '-2', trend: 'down', icon: XCircle, color: 'bg-red-500' }
  ];

  const departmentData = [
    { name: isRTL ? 'الموارد البشرية' : 'HR', employees: 45 },
    { name: isRTL ? 'التقنية' : 'IT', employees: 78 },
    { name: isRTL ? 'المالية' : 'Finance', employees: 32 },
    { name: isRTL ? 'التسويق' : 'Marketing', employees: 56 },
    { name: isRTL ? 'العمليات' : 'Operations', employees: 89 }
  ];

  const performanceTrends = [
    { month: 'Jan', performance: 85, satisfaction: 78 },
    { month: 'Feb', performance: 88, satisfaction: 82 },
    { month: 'Mar', performance: 87, satisfaction: 85 },
    { month: 'Apr', performance: 92, satisfaction: 88 },
    { month: 'May', performance: 94, satisfaction: 90 },
    { month: 'Jun', performance: 96, satisfaction: 94 }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-3xl font-bold">{kpi.value}</p>
                    <Badge variant={kpi.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                      {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {kpi.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${kpi.color} bg-opacity-10`}>
                  <kpi.icon className={`h-8 w-8 ${kpi.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {isRTL ? 'توزيع الموظفين حسب الإدارة' : 'Employee Distribution by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isRTL ? 'اتجاهات الأداء والرضا' : 'Performance & Satisfaction Trends'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="performance" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-2))" strokeWidth={3} dot={{ fill: 'hsl(var(--chart-2))' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
        </Button>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          {isRTL ? 'جدولة تقييم' : 'Schedule Review'}
        </Button>
      </div>
    </div>
  );
};

export default TeamDashboard;