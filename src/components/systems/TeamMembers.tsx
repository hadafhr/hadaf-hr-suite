import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Users, UserPlus, FileText, BarChart3, Settings, 
  TrendingUp, UserCheck, ClipboardList, Share, Download, Database, 
  Activity, Eye, Target, UserCircle, Calendar, Award
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import TeamDashboard from './team/TeamDashboard';
import EmployeeDirectory from './team/EmployeeDirectory';
import EmployeeProfile from './team/EmployeeProfile';
import AddNewEmployee from './team/AddNewEmployee';
import TasksNotes from './team/TasksNotes';
import TeamReports from './team/TeamReports';
import TeamSettings from './team/TeamSettings';

interface TeamMembersProps {
  onBack: () => void;
}

const TeamMembers = ({ onBack }: TeamMembersProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Team Members Management System - Force Update

  const tabs = [
    {
      id: 'dashboard',
      label: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: BarChart3,
      component: TeamDashboard,
      description: isRTL ? 'إحصائيات الموظفين والحالة العامة' : 'Employee statistics and overview'
    },
    {
      id: 'directory',
      label: isRTL ? 'دليل الموظفين' : 'Employee Directory',
      icon: Users,
      component: EmployeeDirectory,
      description: isRTL ? 'قائمة الموظفين مع التفاصيل' : 'Complete employee listing'
    },
    {
      id: 'profile',
      label: isRTL ? 'ملف الموظف' : 'Full Profile',
      icon: UserCircle,
      component: EmployeeProfile,
      description: isRTL ? 'الملف الشخصي الكامل للموظف' : 'Complete employee profile'
    },
    {
      id: 'addnew',
      label: isRTL ? 'إضافة موظف جديد' : 'Add New Employee',
      icon: UserPlus,
      component: AddNewEmployee,
      description: isRTL ? 'إضافة موظف جديد للنظام' : 'Register new employee'
    },
    {
      id: 'tasks',
      label: isRTL ? 'المهام والملاحظات' : 'Tasks & Notes',
      icon: ClipboardList,
      component: TasksNotes,
      description: isRTL ? 'إدارة مهام وملاحظات الموظفين' : 'Manage employee tasks and notes'
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير' : 'Reports',
      icon: FileText,
      component: TeamReports,
      description: isRTL ? 'تقارير شاملة قابلة للتصدير' : 'Comprehensive exportable reports'
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: TeamSettings,
      description: isRTL ? 'إعدادات النظام والصلاحيات' : 'System settings and permissions'
    }
  ];

  // Team Performance Data
  const teamPerformanceData = [
    { month: 'Jan', employees: 245, active: 234, onTrial: 11 },
    { month: 'Feb', employees: 268, active: 251, onTrial: 17 },
    { month: 'Mar', employees: 289, active: 276, onTrial: 13 },
    { month: 'Apr', employees: 312, active: 298, onTrial: 14 },
    { month: 'May', employees: 334, active: 319, onTrial: 15 },
    { month: 'Jun', employees: 356, active: 342, onTrial: 14 }
  ];

  const teamMetrics = [
    { name: 'Active Employees', value: 342, color: 'hsl(var(--primary))' },
    { name: 'On Trial Period', value: 14, color: 'hsl(var(--chart-2))' },
    { name: 'On Leave', value: 23, color: 'hsl(var(--chart-3))' },
    { name: 'Departments', value: 12, color: 'hsl(var(--chart-4))' }
  ];

  const teamFeatures = [
    { icon: Users, label: isRTL ? 'إدارة الموظفين' : 'Employee Management', count: 356, color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { icon: UserCheck, label: isRTL ? 'الموظفون النشطون' : 'Active Staff', count: 342, color: 'bg-gradient-to-r from-green-500 to-teal-600' },
    { icon: Calendar, label: isRTL ? 'فترة التجربة' : 'Trial Period', count: 14, color: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { icon: Award, label: isRTL ? 'الأداء المميز' : 'Top Performers', count: 23, color: 'bg-gradient-to-r from-yellow-500 to-orange-600' },
    { icon: TrendingUp, label: isRTL ? 'النمو الوظيفي' : 'Career Growth', count: 89, color: 'bg-gradient-to-r from-indigo-500 to-blue-600' },
    { icon: Target, label: isRTL ? 'الأهداف المحققة' : 'Goals Achieved', count: 156, color: 'bg-gradient-to-r from-purple-500 to-pink-600' }
  ];

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isRTL ? 'إدارة فريق العمل' : 'Team Management'}
                </h1>
                <p className="text-gray-600">
                  {isRTL ? 'النظام الشامل لإدارة الموظفين والفريق' : 'Comprehensive employee and team management system'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تصدير' : 'Export'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'إجمالي الموظفين' : 'Total Employees'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'الموظفين النشطين' : 'Active Employees'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'تحت التجربة' : 'On Trial'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'متوسط الأداء' : 'Avg Performance'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border border-gray-200 bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-600" />
              {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white h-auto p-4 flex flex-col gap-2"
                onClick={() => setActiveTab('addnew')}
              >
                <UserPlus className="h-6 w-6" />
                <span className="text-sm">{isRTL ? 'إضافة موظف' : 'Add Employee'}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 h-auto p-4 flex flex-col gap-2"
                onClick={() => setActiveTab('tasks')}
              >
                <ClipboardList className="h-6 w-6" />
                <span className="text-sm">{isRTL ? 'إضافة مهمة' : 'Add Task'}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 h-auto p-4 flex flex-col gap-2"
                onClick={() => setActiveTab('reports')}
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">{isRTL ? 'تصدير البيانات' : 'Export Data'}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 h-auto p-4 flex flex-col gap-2"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-6 w-6" />
                <span className="text-sm">{isRTL ? 'الإعدادات' : 'Settings'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Charts */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-teal-600" />
                {isRTL ? 'توزيع الموظفين حسب الإدارة' : 'Employee Distribution by Department'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{isRTL ? 'تقنية المعلومات' : 'IT Department'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">12</span>
                    <span className="text-sm text-gray-500 ml-1">40%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">{isRTL ? 'التسويق' : 'Marketing'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">8</span>
                    <span className="text-sm text-gray-500 ml-1">27%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Recent Activities */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" />
                {isRTL ? 'الأنشطة الأخيرة' : 'Recent Activities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {isRTL ? 'تم تعيين موظف جديد في قسم تقنية المعلومات' : 'New employee assigned to IT Department'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isRTL ? 'أحمد محمد الحلي' : 'Ahmed Mohammed Al-Hali'}
                    </p>
                    <p className="text-xs text-gray-400">{isRTL ? '8 دقت' : '8 minutes ago'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {isRTL ? 'تم إجراء تقييم أداء ربع سنوي' : 'Quarterly performance review completed'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isRTL ? 'فاطمة أحمد محمود' : 'Fatima Ahmed Mahmoud'}
                    </p>
                    <p className="text-xs text-gray-400">{isRTL ? '7 درجة' : '7 minutes ago'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* قسم التبويبات الاحترافي مع تأثيرات بصرية */}
        <div className="dashboard-card overflow-hidden animate-fade-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border/30 px-6 py-4 bg-gradient-to-r from-muted/30 to-primary/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-soft">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{isRTL ? 'أقسام النظام' : 'System Sections'}</h3>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'الوصول الكامل لجميع الوظائف' : 'Complete access to all functions'}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </Badge>
              </div>
              
              <TabsList className="bg-card/60 backdrop-blur-sm border border-border/30 p-1 shadow-soft">
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white data-[state=active]:shadow-glow hover:bg-muted/50 transition-all duration-300 animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <tab.icon className="h-4 w-4 ml-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-6 bg-gradient-to-br from-card/50 to-muted/20">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0 animate-fade-in">
                  <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <tab.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{tab.label}</h4>
                        <p className="text-sm text-muted-foreground">{tab.description}</p>
                      </div>
                    </div>
                    <tab.component />
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;