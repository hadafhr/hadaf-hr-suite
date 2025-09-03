import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, Users, TrendingUp, Activity, 
  BarChart3, PieChart, Target, Award,
  ArrowUp, ArrowDown, Eye, Edit
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const DepartmentsDashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const departmentStats = [
    {
      title: isRTL ? 'إجمالي الإدارات' : 'Total Departments',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Building2,
      color: 'from-primary to-primary-glow'
    },
    {
      title: isRTL ? 'الإدارات النشطة' : 'Active Departments',
      value: '11',
      change: '+1',
      trend: 'up',
      icon: Activity,
      color: 'from-primary to-primary-glow'
    },
    {
      title: isRTL ? 'الوحدات الفرعية' : 'Sub Units',
      value: '34',
      change: '+8',
      trend: 'up',
      icon: Target,
      color: 'from-muted-foreground to-muted-foreground'
    },
    {
      title: isRTL ? 'إجمالي الموظفين' : 'Total Staff',
      value: '456',
      change: '+23',
      trend: 'up',
      icon: Users,
      color: 'from-primary to-primary-glow'
    }
  ];

  const departmentDistribution = [
    { name: isRTL ? 'تقنية المعلومات' : 'IT Department', employees: 85, color: 'hsl(var(--primary))' },
    { name: isRTL ? 'الموارد البشرية' : 'Human Resources', employees: 65, color: 'hsl(var(--primary-glow))' },
    { name: isRTL ? 'المالية' : 'Finance', employees: 45, color: 'hsl(var(--muted-foreground))' },
    { name: isRTL ? 'التسويق' : 'Marketing', employees: 78, color: 'hsl(var(--accent))' },
    { name: isRTL ? 'المبيعات' : 'Sales', employees: 92, color: 'hsl(var(--primary))' },
    { name: isRTL ? 'العمليات' : 'Operations', employees: 56, color: 'hsl(var(--muted-foreground))' }
  ];

  const monthlyGrowth = [
    { month: isRTL ? 'يناير' : 'Jan', departments: 8, units: 22, employees: 380 },
    { month: isRTL ? 'فبراير' : 'Feb', departments: 9, units: 25, employees: 395 },
    { month: isRTL ? 'مارس' : 'Mar', departments: 10, units: 28, employees: 412 },
    { month: isRTL ? 'أبريل' : 'Apr', departments: 11, units: 31, employees: 438 },
    { month: isRTL ? 'مايو' : 'May', departments: 11, units: 32, employees: 445 },
    { month: isRTL ? 'يونيو' : 'Jun', departments: 12, units: 34, employees: 456 }
  ];

  const recentActivities = [
    {
      action: isRTL ? 'تم إنشاء إدارة جديدة' : 'New department created',
      department: isRTL ? 'إدارة الابتكار والتطوير' : 'Innovation & Development',
      time: isRTL ? '15 دقيقة' : '15 minutes ago',
      type: 'create'
    },
    {
      action: isRTL ? 'تم ربط وحدة فرعية' : 'Sub-unit linked',
      department: isRTL ? 'وحدة التسويق الرقمي' : 'Digital Marketing Unit',
      time: isRTL ? '2 ساعة' : '2 hours ago',
      type: 'link'
    },
    {
      action: isRTL ? 'تحديث بيانات إدارة' : 'Department data updated',
      department: isRTL ? 'إدارة الموارد البشرية' : 'Human Resources Dept',
      time: isRTL ? '4 ساعات' : '4 hours ago',
      type: 'update'
    },
    {
      action: isRTL ? 'تم تعيين مدير جديد' : 'New manager assigned',
      department: isRTL ? 'إدارة المبيعات' : 'Sales Department',
      time: isRTL ? '1 يوم' : '1 day ago',
      type: 'assign'
    }
  ];

  const topPerformingDepartments = [
    {
      name: isRTL ? 'إدارة المبيعات' : 'Sales Department',
      efficiency: 96,
      employees: 92,
      growth: '+12%'
    },
    {
      name: isRTL ? 'تقنية المعلومات' : 'IT Department',
      efficiency: 94,
      employees: 85,
      growth: '+8%'
    },
    {
      name: isRTL ? 'التسويق' : 'Marketing',
      efficiency: 91,
      employees: 78,
      growth: '+15%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departmentStats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-glow transition-all duration-500 border border-border/20 bg-white/95 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="outline" className={`border-${stat.trend === 'up' ? 'primary' : 'destructive'}/30 text-${stat.trend === 'up' ? 'primary' : 'destructive'} bg-${stat.trend === 'up' ? 'primary' : 'destructive'}/5`}>
                  {stat.trend === 'up' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />}
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{stat.value}</p>
                <p className="text-sm text-foreground font-semibold">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* توزيع الموظفين حسب الإدارات */}
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              {isRTL ? 'توزيع الموظفين حسب الإدارات' : 'Employee Distribution by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* النمو الشهري */}
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              {isRTL ? 'النمو الشهري' : 'Monthly Growth'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="employees" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* الأنشطة الأخيرة */}
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              {isRTL ? 'الأنشطة الأخيرة' : 'Recent Activities'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'create' ? 'bg-primary' :
                    activity.type === 'link' ? 'bg-primary-glow' :
                    activity.type === 'update' ? 'bg-muted-foreground' :
                    'bg-accent'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{activity.action}</p>
                    <p className="text-sm text-primary">{activity.department}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* أفضل الإدارات أداءً */}
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              {isRTL ? 'أفضل الإدارات أداءً' : 'Top Performing Departments'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topPerformingDepartments.map((dept, index) => (
                <div key={index} className="group p-4 bg-card/30 rounded-xl hover:bg-primary/5 hover:shadow-soft transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.employees} {isRTL ? 'موظف' : 'employees'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                        {dept.growth}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{isRTL ? 'الكفاءة' : 'Efficiency'}</span>
                      <span className="font-semibold text-foreground">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${dept.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentsDashboard;