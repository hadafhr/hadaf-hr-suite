import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, BookOpen, Users, Award, Clock, 
  TrendingUp, Calendar, Target, Eye, Bell
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const TrainingDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const trainingKPIs = [
    {
      title: isRTL ? 'برامج التدريب النشطة' : 'Active Training Programs',
      value: '42',
      change: '+8',
      trend: 'up',
      description: isRTL ? 'برنامج جاري حالياً' : 'Currently running programs',
      icon: BookOpen,
      color: 'primary'
    },
    {
      title: isRTL ? 'الموظفون في التدريب' : 'Employees in Training',
      value: '127',
      change: '+23',
      trend: 'up',
      description: isRTL ? 'موظف مسجل في برامج نشطة' : 'Enrolled in active programs',
      icon: Users,
      color: 'chart-2'
    },
    {
      title: isRTL ? 'معدل إتمام التدريب' : 'Training Completion Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      description: isRTL ? 'معدل إنجاز البرامج' : 'Program completion rate',
      icon: Target,
      color: 'chart-3'
    },
    {
      title: isRTL ? 'الشهادات المكتملة' : 'Completed Certifications',
      value: '89',
      change: '+12',
      trend: 'up',
      description: isRTL ? 'شهادة تم الحصول عليها' : 'Certifications earned',
      icon: Award,
      color: 'chart-4'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'urgent',
      title: isRTL ? 'تدريب الأمان والسلامة منتهي الصلاحية' : 'Safety Training Expired',
      message: isRTL ? '15 موظف يحتاجون تجديد شهادة الأمان' : '15 employees need safety certification renewal',
      department: 'Manufacturing',
      dueDate: '2024-07-20',
      severity: 'high',
      action: isRTL ? 'جدولة تدريب فوري' : 'Schedule immediate training'
    },
    {
      id: 2,
      type: 'warning',
      title: isRTL ? 'تدريب الامتثال مستحق قريباً' : 'Compliance Training Due Soon',
      message: isRTL ? '8 موظفين بحاجة لتدريب الامتثال خلال 30 يوم' : '8 employees need compliance training within 30 days',
      department: 'Finance',
      dueDate: '2024-08-15',
      severity: 'medium',
      action: isRTL ? 'إرسال تذكير' : 'Send reminder'
    },
    {
      id: 3,
      type: 'info',
      title: isRTL ? 'شهادات مهنية تنتهي خلال 60 يوم' : 'Professional Certifications Expiring in 60 Days',
      message: isRTL ? '12 شهادة مهنية تحتاج تجديد' : '12 professional certifications need renewal',
      department: 'IT',
      dueDate: '2024-09-01',
      severity: 'low',
      action: isRTL ? 'التخطيط للتجديد' : 'Plan renewal'
    }
  ];

  const trainingTrends = [
    { month: 'Jan', completed: 45, enrolled: 67, effectiveness: 92 },
    { month: 'Feb', completed: 52, enrolled: 73, effectiveness: 89 },
    { month: 'Mar', completed: 49, enrolled: 81, effectiveness: 94 },
    { month: 'Apr', completed: 63, enrolled: 89, effectiveness: 91 },
    { month: 'May', completed: 71, enrolled: 95, effectiveness: 96 },
    { month: 'Jun', completed: 67, enrolled: 87, effectiveness: 93 }
  ];

  const departmentTraining = [
    { department: 'IT', programs: 15, employees: 45, completion: 92 },
    { department: 'Sales', programs: 12, employees: 38, completion: 87 },
    { department: 'HR', programs: 8, employees: 22, completion: 95 },
    { department: 'Finance', programs: 6, employees: 18, completion: 89 },
    { department: 'Marketing', programs: 9, employees: 28, completion: 84 }
  ];

  const trainingCategories = [
    { name: isRTL ? 'التدريب التقني' : 'Technical Training', value: 35, color: 'hsl(var(--chart-1))' },
    { name: isRTL ? 'القيادة والإدارة' : 'Leadership & Management', value: 28, color: 'hsl(var(--chart-2))' },
    { name: isRTL ? 'الامتثال والسلامة' : 'Compliance & Safety', value: 22, color: 'hsl(var(--chart-3))' },
    { name: isRTL ? 'المهارات الناعمة' : 'Soft Skills', value: 15, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="space-y-6">
      {/* Training KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainingKPIs.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${kpi.color}/10`}>
                  <kpi.icon className={`h-6 w-6 text-${kpi.color}`} />
                </div>
                <Badge variant={kpi.trend === 'up' ? 'default' : 'secondary'}>
                  {kpi.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </p>
                <p className="text-3xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Critical Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {isRTL ? 'تنبيهات التدريب الحرجة' : 'Critical Training Alerts'}
          </CardTitle>
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            {isRTL ? 'عرض الكل' : 'View All'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-l-destructive bg-destructive/5' :
                alert.severity === 'medium' ? 'border-l-warning bg-warning/5' :
                'border-l-primary bg-primary/5'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <Badge variant={
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'secondary' : 'default'
                      }>
                        {alert.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {isRTL ? 'الموعد النهائي:' : 'Due:'} {alert.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      {isRTL ? 'تذكير' : 'Remind'}
                    </Button>
                    <Button size="sm">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {isRTL ? 'اتجاهات التدريب' : 'Training Trends'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trainingTrends}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorCompleted)"
                  name={isRTL ? 'مكتمل' : 'Completed'}
                />
                <Area 
                  type="monotone" 
                  dataKey="enrolled" 
                  stroke="hsl(var(--chart-2))" 
                  fillOpacity={1} 
                  fill="url(#colorEnrolled)"
                  name={isRTL ? 'مسجل' : 'Enrolled'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Training Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {isRTL ? 'فئات التدريب' : 'Training Categories'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trainingCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {trainingCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {trainingCategories.map((category, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span>{category.name}</span>
                  </div>
                  <span className="font-semibold">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Training Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {isRTL ? 'نظرة عامة على تدريب الأقسام' : 'Department Training Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentTraining}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="programs" fill="hsl(var(--primary))" name={isRTL ? 'البرامج' : 'Programs'} />
              <Bar dataKey="employees" fill="hsl(var(--chart-2))" name={isRTL ? 'الموظفين' : 'Employees'} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'برنامج جديد' : 'New Program'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <Users className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'تسجيل موظف' : 'Enroll Employee'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <Award className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'إصدار شهادة' : 'Issue Certificate'}</span>
            </Button>
            <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">{isRTL ? 'تقرير الأداء' : 'Performance Report'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingDashboard;