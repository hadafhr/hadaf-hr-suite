import React, { useState } from 'react';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  GraduationCap,
  Settings,
  UserPlus,
  CalendarCheck,
  Briefcase,
  Award,
  Building2,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock3
} from 'lucide-react';

export const HRSystemManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // إحصائيات النظام
  const systemStats = [
    {
      title: 'إجمالي الموظفين',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'معدل الحضور',
      value: '94.8%',
      change: '+2.1%',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي الرواتب',
      value: '2.4M ر.س',
      change: '+5.3%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'التقارير المنجزة',
      value: '89',
      change: '+18%',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  // وحدات النظام
  const systemModules = [
    {
      id: 'employees',
      title: 'إدارة الموظفين',
      description: 'إضافة وتعديل وإدارة بيانات الموظفين',
      icon: Users,
      count: '1,247 موظف',
      status: 'نشط',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'attendance',
      title: 'نظام الحضور والانصراف',
      description: 'متابعة أوقات الحضور والغياب والإجازات',
      icon: Clock,
      count: '94.8% معدل حضور',
      status: 'نشط',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'payroll',
      title: 'إدارة الرواتب',
      description: 'حساب وصرف الرواتب والمكافآت',
      icon: DollarSign,
      count: '2.4M ر.س شهرياً',
      status: 'نشط',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'reports',
      title: 'التقارير والتحليلات',
      description: 'تقارير شاملة عن أداء الموارد البشرية',
      icon: BarChart3,
      count: '89 تقرير',
      status: 'نشط',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'performance',
      title: 'تقييم الأداء',
      description: 'نظام تقييم أداء الموظفين الدوري',
      icon: TrendingUp,
      count: '856 تقييم',
      status: 'نشط',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'training',
      title: 'إدارة التدريب',
      description: 'برامج التدريب والتطوير المهني',
      icon: GraduationCap,
      count: '42 برنامج',
      status: 'نشط',
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  // الإجراءات السريعة
  const quickActions = [
    { icon: UserPlus, label: 'إضافة موظف جديد', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: CalendarCheck, label: 'تسجيل حضور', color: 'bg-green-600 hover:bg-green-700' },
    { icon: DollarSign, label: 'إنشاء كشف راتب', color: 'bg-purple-600 hover:bg-purple-700' },
    { icon: FileText, label: 'إنشاء تقرير', color: 'bg-orange-600 hover:bg-orange-700' }
  ];

  // المهام الأخيرة
  const recentActivities = [
    {
      id: 1,
      action: 'تم إضافة موظف جديد',
      details: 'أحمد محمد - قسم التسويق',
      time: 'منذ ساعتين',
      icon: UserPlus,
      status: 'completed'
    },
    {
      id: 2,
      action: 'تم إنجاز كشف الرواتب',
      details: 'راتب شهر ديسمبر 2024',
      time: 'منذ 4 ساعات',
      icon: DollarSign,
      status: 'completed'
    },
    {
      id: 3,
      action: 'طلب إجازة جديد',
      details: 'سارة أحمد - إجازة سنوية',
      time: 'منذ 6 ساعات',
      icon: CalendarCheck,
      status: 'pending'
    },
    {
      id: 4,
      action: 'تم إنجاز تقييم أداء',
      details: 'تقييم الربع الرابع',
      time: 'منذ يوم',
      icon: Award,
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* رأس النظام */}
        <SystemHeader
          title="نظام إدارة الموارد البشرية المتكاملة"
          description="منظومة شاملة لإدارة الموارد البشرية تشمل إدارة الموظفين والحضور والرواتب والتقييم والتدريب"
          icon={<Building2 className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* إحصائيات النظام */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change} من الشهر الماضي
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* المحتوى الرئيسي */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="modules">وحدات النظام</TabsTrigger>
              <TabsTrigger value="activities">النشاطات الأخيرة</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* الإجراءات السريعة */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    الإجراءات السريعة
                  </CardTitle>
                  <CardDescription>
                    إجراءات مختصرة للمهام اليومية الشائعة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        className={`h-20 flex flex-col gap-2 ${action.color} text-white`}
                      >
                        <action.icon className="h-6 w-6" />
                        <span className="text-sm text-center">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* أداء النظام */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>أداء النظام</CardTitle>
                    <CardDescription>مؤشرات الأداء الرئيسية للنظام</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>معدل استخدام النظام</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>رضا المستخدمين</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>دقة البيانات</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الإشعارات والتنبيهات</CardTitle>
                    <CardDescription>آخر التحديثات المهمة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">تذكير: موعد صرف الرواتب</p>
                        <p className="text-xs text-muted-foreground">خلال 3 أيام</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">تم تحديث النظام بنجاح</p>
                        <p className="text-xs text-muted-foreground">الإصدار 2.1.0</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Clock3 className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">جلسة تدريب جديدة</p>
                        <p className="text-xs text-muted-foreground">غداً الساعة 10:00 ص</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemModules.map((module) => (
                  <Card key={module.id} className={`${module.color} transition-all hover:shadow-lg`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <module.icon className="h-8 w-8 text-primary" />
                        <Badge variant="secondary">{module.status}</Badge>
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-primary">{module.count}</div>
                        <Button className="w-full">دخول الوحدة</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>النشاطات الأخيرة</CardTitle>
                  <CardDescription>آخر العمليات التي تم تنفيذها في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          <activity.icon className={`h-5 w-5 ${
                            activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status === 'completed' ? 'مكتمل' : 'قيد المراجعة'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    إعدادات النظام
                  </CardTitle>
                  <CardDescription>إدارة إعدادات نظام الموارد البشرية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">إعدادات عامة</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          إعدادات الشركة
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          إعدادات الأقسام
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          إعدادات المناصب
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">إعدادات النظام</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          صلاحيات المستخدمين
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          النسخ الاحتياطية
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          سجل العمليات
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};