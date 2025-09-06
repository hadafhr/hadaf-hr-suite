import React, { useState } from 'react';
import { BoudLayout } from '@/components/layout/BoudLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Award, 
  Target, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  UserPlus,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const TeamWorkforce: React.FC = () => {
  const [activeSection, setActiveSection] = useState('team');

  // Employee Statistics Data
  const employeeStats = [
    {
      title: 'إجمالي الموظفين',
      value: '356',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'الموظفون النشطون',
      value: '342',
      change: '+8',
      trend: 'up',
      icon: UserCheck,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      title: 'تحت التجربة',
      value: '14',
      change: '+2',
      trend: 'up',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    {
      title: 'منتهية الخدمة',
      value: '23',
      change: '-3',
      trend: 'down',
      icon: UserX,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20'
    }
  ];

  // Department Data for Chart
  const departmentData = [
    { name: 'تقنية المعلومات', employees: 45, active: 43, onLeave: 2 },
    { name: 'الموارد البشرية', employees: 28, active: 26, onLeave: 2 },
    { name: 'المالية', employees: 32, active: 31, onLeave: 1 },
    { name: 'التسويق', employees: 38, active: 35, onLeave: 3 },
    { name: 'المبيعات', employees: 52, active: 48, onLeave: 4 },
    { name: 'العمليات', employees: 67, active: 63, onLeave: 4 }
  ];

  // Performance Trend Data
  const performanceTrend = [
    { month: 'يناير', performance: 85, attendance: 94, satisfaction: 78 },
    { month: 'فبراير', performance: 87, attendance: 96, satisfaction: 82 },
    { month: 'مارس', performance: 89, attendance: 95, satisfaction: 85 },
    { month: 'أبريل', performance: 92, attendance: 97, satisfaction: 88 },
    { month: 'مايو', performance: 94, attendance: 98, satisfaction: 91 },
    { month: 'يونيو', performance: 96, attendance: 99, satisfaction: 94 }
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      message: 'تم تعيين أحمد محمد في قسم تقنية المعلومات',
      time: 'منذ ساعتين',
      icon: UserCheck,
      color: 'text-success'
    },
    {
      id: 2,
      message: 'تم ترقية سارة أحمد إلى منصب مدير المشروع',
      time: 'منذ 4 ساعات',
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      id: 3,
      message: 'تنبيه: محمد علي لديه 3 أيام غياب متتالية',
      time: 'منذ 6 ساعات',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      id: 4,
      message: 'فاطمة حسن أكملت دورة الأمان المهني',
      time: 'منذ يوم',
      icon: CheckCircle,
      color: 'text-success'
    }
  ];

  // Quick Actions
  const quickActions = [
    { label: 'إضافة موظف جديد', icon: UserPlus, color: 'bg-primary' },
    { label: 'تقرير الحضور', icon: Calendar, color: 'bg-success' },
    { label: 'تقييم الأداء', icon: Award, color: 'bg-warning' },
    { label: 'تحديث البيانات', icon: Activity, color: 'bg-primary' }
  ];

  return (
    <BoudLayout
      title="فريق العمل"
      showBackButton={true}
      showSidebar={true}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      className="p-6"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">لوحة تحكم فريق العمل</h2>
            <p className="text-text-muted">نظرة شاملة على حالة الموظفين والأداء العام للفريق</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              التقارير
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف
            </Button>
          </div>
        </div>

        {/* Employee Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeStats.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-medium transition-all duration-200`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-muted mb-2">{stat.title}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-text-primary">{stat.value}</span>
                      <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                توزيع الموظفين حسب الأقسام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--separator))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--separator))',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="employees" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                اتجاهات الأداء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--separator))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--text-muted))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--separator))',
                      borderRadius: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3} 
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--success))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="satisfaction" 
                    stroke="hsl(var(--warning))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--warning))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-primary" />
                  النشاطات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-accent rounded-xl hover:bg-accent/80 transition-colors duration-200">
                      <div className="p-2 rounded-xl bg-white shadow-soft">
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{activity.message}</p>
                        <p className="text-xs text-text-muted mt-1">{activity.time}</p>
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 border border-separator hover:bg-accent hover:border-primary/20 transition-all duration-200"
                  >
                    <div className={`p-2 rounded-xl ${action.color} text-white ml-3`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-text-secondary">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BoudLayout>
  );
};

export default TeamWorkforce;