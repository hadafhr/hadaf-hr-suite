import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Users, UserPlus, FileText, BarChart3, Settings, 
  TrendingUp, UserCheck, ClipboardList, Share, Download, Database, 
  Activity, Eye, Target, UserCircle, Calendar, Award, Sparkles,
  Plus, ChevronRight, Clock, Mail, Phone, Star, Zap, Layers,
  MessageSquare, Shield, Globe, Workflow
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
  
  const tabs = [
    {
      id: 'dashboard',
      label: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: BarChart3,
      component: TeamDashboard,
      description: isRTL ? 'إحصائيات شاملة وتقارير الأداء التفاعلية' : 'Comprehensive statistics and interactive performance reports'
    },
    {
      id: 'directory',
      label: isRTL ? 'دليل الموظفين' : 'Employee Directory',
      icon: Users,
      component: EmployeeDirectory,
      description: isRTL ? 'قاعدة بيانات الموظفين مع إمكانيات البحث المتقدم' : 'Employee database with advanced search capabilities'
    },
    {
      id: 'profile',
      label: isRTL ? 'الملف الشخصي' : 'Profile Management',
      icon: UserCircle,
      component: EmployeeProfile,
      description: isRTL ? 'إدارة الملفات الشخصية والبيانات التفصيلية' : 'Personal profile management and detailed information'
    },
    {
      id: 'addnew',
      label: isRTL ? 'إضافة موظف' : 'Add Employee',
      icon: UserPlus,
      component: AddNewEmployee,
      description: isRTL ? 'تسجيل موظفين جدد مع نماذج ذكية ومتقدمة' : 'Register new employees with smart and advanced forms'
    },
    {
      id: 'tasks',
      label: isRTL ? 'المهام والملاحظات' : 'Tasks & Notes',
      icon: ClipboardList,
      component: TasksNotes,
      description: isRTL ? 'إدارة المهام والملاحظات مع تتبع التقدم' : 'Task and note management with progress tracking'
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير' : 'Reports',
      icon: FileText,
      component: TeamReports,
      description: isRTL ? 'تقارير تفصيلية وقابلة للتخصيص والتصدير' : 'Detailed customizable and exportable reports'
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: TeamSettings,
      description: isRTL ? 'إعدادات النظام والصلاحيات والأمان' : 'System settings, permissions and security'
    }
  ];

  const teamMetrics = [
    { 
      title: isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      value: '356',
      description: isRTL ? 'جميع الموظفين المسجلين في النظام' : 'All registered employees in the system',
      icon: Users,
      trend: '+12%',
      color: 'from-primary to-primary-glow'
    },
    { 
      title: isRTL ? 'الموظفون النشطون' : 'Active Employees',
      value: '342',
      description: isRTL ? 'الموظفون العاملون حالياً' : 'Currently working employees',
      icon: UserCheck,
      trend: '+8%',
      color: 'from-primary to-primary-glow'
    },
    { 
      title: isRTL ? 'فترة التجربة' : 'On Trial',
      value: '14',
      description: isRTL ? 'موظفون في فترة التجربة' : 'Employees in trial period',
      icon: Clock,
      trend: '-3%',
      color: 'from-muted-foreground to-muted-foreground'
    },
    { 
      title: isRTL ? 'متوسط الأداء' : 'Avg Performance',
      value: '92%',
      description: isRTL ? 'متوسط تقييم أداء الفريق' : 'Average team performance rating',
      icon: TrendingUp,
      trend: '+5%',
      color: 'from-primary to-primary-glow'
    }
  ];

  const teamFeatures = [
    { 
      title: isRTL ? 'إضافة موظف' : 'Add Employee',
      description: isRTL ? 'تسجيل موظف جديد' : 'Register new employee',
      icon: UserPlus,
      action: () => setActiveTab('addnew')
    },
    { 
      title: isRTL ? 'إضافة مهمة' : 'Add Task',
      description: isRTL ? 'إنشاء مهمة جديدة' : 'Create new task',
      icon: Plus,
      action: () => setActiveTab('tasks')
    },
    { 
      title: isRTL ? 'تصدير البيانات' : 'Export Data',
      description: isRTL ? 'تصدير التقارير' : 'Export reports',
      icon: Download,
      action: () => setActiveTab('reports')
    },
    { 
      title: isRTL ? 'الإعدادات' : 'Settings',
      description: isRTL ? 'إعدادات النظام' : 'System settings',
      icon: Settings,
      action: () => setActiveTab('settings')
    },
    { 
      title: isRTL ? 'المراسلة' : 'Messaging',
      description: isRTL ? 'التواصل مع الفريق' : 'Team communication',
      icon: MessageSquare,
      action: () => console.log('مراسلة الفريق')
    },
    { 
      title: isRTL ? 'الحضور والانصراف' : 'Attendance',
      description: isRTL ? 'تتبع ساعات العمل' : 'Track working hours',
      icon: Calendar,
      action: () => console.log('نظام الحضور')
    },
    { 
      title: isRTL ? 'التقييمات' : 'Reviews',
      description: isRTL ? 'تقييم الأداء' : 'Performance reviews',
      icon: Star,
      action: () => console.log('تقييم الأداء')
    },
    { 
      title: isRTL ? 'الأمان' : 'Security',
      description: isRTL ? 'إعدادات الأمان' : 'Security settings',
      icon: Shield,
      action: () => console.log('إعدادات الأمان')
    }
  ];

  const teamPerformanceData = [
    { 
      value: '95%',
      label: isRTL ? 'رضا الموظفين' : 'Employee Satisfaction',
      trend: isRTL ? 'تحسن مستمر' : 'Continuous improvement'
    },
    { 
      value: '87%',
      label: isRTL ? 'معدل الإنجاز' : 'Completion Rate',
      trend: isRTL ? 'أداء ممتاز' : 'Excellent performance'
    },
    { 
      value: '92%',
      label: isRTL ? 'معدل الحضور' : 'Attendance Rate',
      trend: isRTL ? 'انتظام عالي' : 'High regularity'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* خلفية احترافية متحركة بألوان الهوية البصرية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/8 to-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-primary/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-muted/20 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-primary/8 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* الشريط العلوي الاحترافي */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20 animate-fade-in">
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-muted-foreground/20 text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div className="h-8 w-px bg-border/30"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <Users className="h-8 w-8 text-white relative z-10" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {isRTL ? 'إدارة فريق العمل' : 'Team Management'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {isRTL ? 'النظام الشامل والمتقدم لإدارة الموظفين والفرق' : 'Comprehensive and advanced employee and team management system'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 ml-2" />
              {isRTL ? 'نظام متطور' : 'Advanced System'}
            </Badge>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-glow hover:shadow-strong transition-all duration-300 px-6 py-2"
              onClick={() => setActiveTab('reports')}
            >
              <Download className="h-4 w-4 ml-2" />
              {isRTL ? 'تصدير' : 'Export'}
            </Button>
          </div>
        </div>

        {/* العنوان الرئيسي الاحترافي */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary to-primary-glow rounded-full shadow-glow mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
            <Users className="h-14 w-14 text-white relative z-10" />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-6 relative">
            {isRTL ? 'إدارة فريق العمل الاحترافية' : 'Professional Team Management'}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {isRTL ? 'نظام شامل ومتطور لإدارة الموظفين والفرق بأحدث التقنيات والواجهات الاحترافية المتقدمة' : 'Comprehensive and advanced system for managing employees and teams with the latest technologies and advanced professional interfaces'}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Sparkles className="h-5 w-5 ml-2" />
              {isRTL ? 'نظام ذكي' : 'Smart System'}
            </Badge>
            <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground bg-muted/20 px-6 py-3 text-base font-medium hover:bg-muted/30 transition-all duration-300">
              <Target className="h-5 w-5 ml-2" />
              {isRTL ? 'واجهة احترافية' : 'Professional Interface'}
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Award className="h-5 w-5 ml-2" />
              {isRTL ? 'إدارة متقدمة' : 'Advanced Management'}
            </Badge>
          </div>
        </div>

        {/* الإحصائيات السريعة الاحترافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMetrics.map((metric, index) => (
            <Card key={index} className="group hover:shadow-glow hover:scale-105 transition-all duration-700 border border-border/20 bg-white/98 backdrop-blur-sm animate-fade-in overflow-hidden relative" 
                  style={{animationDelay: `${index * 0.2}s`}}>
              {/* تأثير الخلفية المتحركة */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-5 rounded-3xl bg-gradient-to-br ${metric.color} shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-700 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <metric.icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground bg-muted/10 hover:bg-muted/20 transition-colors duration-300 px-4 py-2">
                    {metric.trend}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <p className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">{metric.value}</p>
                  <p className="text-lg text-foreground font-semibold">{metric.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
                {/* مؤشر التقدم */}
                <div className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* الإجراءات السريعة الاحترافية */}
        <div className="mb-12">
          <Card className="border border-border/20 bg-white/98 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-700 overflow-hidden relative">
            {/* خلفية متحركة للكارت */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/2 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-glow to-primary"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-18 h-18 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  <Activity className="h-9 w-9 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'الإجراءات السريعة والذكية' : 'Smart Quick Actions'}</h3>
                  <p className="text-muted-foreground text-lg">{isRTL ? 'أدوات الإدارة المتقدمة والفعالة للتحكم الكامل' : 'Advanced and effective management tools for complete control'}</p>
                </div>
                <div className="mr-auto">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-5 py-2 text-base">
                    {isRTL ? 'جاهز للاستخدام' : 'Ready to Use'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {teamFeatures.map((feature, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="group h-auto p-8 flex flex-col items-center gap-5 border border-border/30 bg-white hover:bg-primary/5 hover:border-primary/40 hover:shadow-glow transition-all duration-700 animate-fade-in relative overflow-hidden"
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => {
                      console.log(`تم تفعيل ${feature.title}`);
                      if (feature.action) feature.action();
                    }}
                  >
                    {/* تأثير الهوفر المتحرك */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-0 right-0 w-10 h-10 bg-primary/10 rounded-full blur-lg -translate-y-5 translate-x-5 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-muted/30 to-muted/10 group-hover:from-primary group-hover:to-primary-glow rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:shadow-glow relative z-10">
                      <feature.icon className="h-8 w-8 text-muted-foreground group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-500">{feature.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* عرض سريع للبيانات الاحترافي */}
        <div className="mb-12">
          <Card className="border border-border/20 bg-white/98 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-700 overflow-hidden relative">
            {/* تصميم الخلفية المتقدم */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-muted/3"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-muted/15 rounded-full blur-2xl animate-float"></div>
            
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-3xl animate-pulse"></div>
                    <BarChart3 className="h-9 w-9 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'نظرة عامة متقدمة وذكية' : 'Advanced Smart Overview'}</h3>
                    <p className="text-muted-foreground text-lg">{isRTL ? 'إحصائيات الفريق التفاعلية المحدثة لحظياً بتقنيات متطورة' : 'Interactive team statistics updated in real-time with advanced technologies'}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-500 hover:shadow-soft px-8 py-3 text-base"
                  onClick={() => {
                    console.log('تصدير البيانات');
                    setActiveTab('reports');
                  }}
                >
                  <Download className="h-5 w-5 ml-2" />
                  {isRTL ? 'تصدير البيانات' : 'Export Data'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamPerformanceData.map((item, index) => (
                  <div key={index} className="group text-center p-8 bg-card/50 hover:bg-card/80 rounded-3xl border border-border/20 hover:border-primary/30 hover:shadow-glow transition-all duration-700 animate-fade-in relative overflow-hidden"
                       style={{animationDelay: `${index * 0.2}s`}}>
                    {/* تأثيرات الخلفية التفاعلية */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/8 rounded-full blur-lg -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 mb-4">{item.value}</div>
                      <div className="text-lg text-foreground font-semibold mb-3">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.trend}</div>
                      
                      {/* مؤشر التقدم المتحرك */}
                      <div className="mt-6 w-full bg-muted/20 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* قسم التبويبات الاحترافي المتطور */}
        <div className="overflow-hidden animate-fade-in">
          <Card className="border border-border/20 bg-white/99 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-1000 overflow-hidden relative">
            {/* خلفية متدرجة متحركة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/1 via-transparent to-muted/2"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-muted/8 rounded-full blur-3xl animate-float"></div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
              <div className="border-b border-border/20 px-10 py-8 bg-gradient-to-r from-primary/3 via-white/70 to-muted/3 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-glow relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent animate-pulse"></div>
                      <Database className="h-10 w-10 text-white relative z-10" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full animate-bounce"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'أقسام النظام المتقدمة والذكية' : 'Advanced Smart System Sections'}</h3>
                      <p className="text-muted-foreground text-lg">{isRTL ? 'الوصول الشامل لجميع الوظائف والأدوات المتطورة مع تحكم كامل' : 'Comprehensive access to all advanced functions and tools with complete control'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 px-6 py-3 font-semibold text-base">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </Badge>
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <TabsList className="bg-white/90 backdrop-blur-sm border border-border/30 p-3 shadow-soft rounded-3xl overflow-hidden">
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white data-[state=active]:shadow-glow hover:bg-muted/30 hover:scale-105 transition-all duration-700 animate-fade-in px-8 py-4 rounded-2xl font-medium relative overflow-hidden text-base"
                      style={{animationDelay: `${index * 0.1}s`}}
                      onClick={() => {
                        console.log(`تم تفعيل تبويب: ${tab.label}`);
                        setActiveTab(tab.id);
                      }}
                    >
                      {/* تأثير الهوفر */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <tab.icon className="h-6 w-6 ml-3 relative z-10" />
                      <span className="relative z-10">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-10 bg-gradient-to-br from-white/70 via-card/20 to-muted/8 backdrop-blur-sm">
                {tabs.map((tab, tabIndex) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-700 border border-border/20 relative overflow-hidden">
                      {/* خلفية التبويب المتحركة */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-muted/3"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full blur-3xl -translate-y-16 translate-x-16 animate-pulse-slow"></div>
                      
                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-soft">
                          <tab.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-foreground">{tab.label}</h4>
                          <p className="text-muted-foreground text-lg leading-relaxed">{tab.description}</p>
                        </div>
                        <div className="mr-auto">
                          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-2 text-base">
                            {isRTL ? 'نشط' : 'Active'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <tab.component />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;