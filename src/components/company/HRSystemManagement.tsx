import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  BarChart3,
  Shield,
  Database,
  Workflow,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Building2,
  UserCheck,
  ClipboardList,
  DollarSign
} from 'lucide-react';

export const HRSystemManagement: React.FC = () => {
  const systemModules = [
    {
      title: "إدارة الموظفين",
      description: "إدارة شاملة لبيانات الموظفين والملفات الشخصية",
      icon: <Users className="h-8 w-8 text-primary" />,
      status: "نشط",
      users: 245,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "نظام الحضور والانصراف",
      description: "تتبع أوقات الحضور والانصراف والإجازات",
      icon: <Clock className="h-8 w-8 text-green-600" />,
      status: "نشط",
      users: 198,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "إدارة الرواتب",
      description: "حساب وإدارة الرواتب والمكافآت والخصومات",
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      status: "نشط",
      users: 245,
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: "التقارير والتحليلات",
      description: "تقارير شاملة وتحليلات بيانات الموارد البشرية",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      status: "نشط",
      users: 25,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "إدارة الأداء",
      description: "تقييم الأداء ووضع الأهداف ومتابعة الإنجازات",
      icon: <Target className="h-8 w-8 text-red-600" />,
      status: "قيد التطوير",
      users: 0,
      color: "bg-red-50 border-red-200"
    },
    {
      title: "إدارة التدريب",
      description: "برامج التدريب والتطوير المهني للموظفين",
      icon: <UserCheck className="h-8 w-8 text-indigo-600" />,
      status: "قيد التطوير",
      users: 0,
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  const systemStats = [
    { label: "إجمالي المستخدمين", value: "245", icon: <Users className="h-5 w-5" />, change: "+12%" },
    { label: "معدل الحضور", value: "94.2%", icon: <CheckCircle className="h-5 w-5" />, change: "+2.1%" },
    { label: "التقارير المُنشأة", value: "156", icon: <FileText className="h-5 w-5" />, change: "+8%" },
    { label: "صحة النظام", value: "98.5%", icon: <Shield className="h-5 w-5" />, change: "+0.3%" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">نظام إدارة الموارد البشرية المتكاملة</h2>
            <p className="text-gray-600">منصة شاملة لإدارة جميع عمليات الموارد البشرية بكفاءة وفعالية</p>
          </div>
        </div>
        
        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-4 border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-primary mb-1">{stat.icon}</div>
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Modules */}
      <div>
        <h3 className="text-xl font-semibold mb-4">وحدات النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemModules.map((module, index) => (
            <Card key={index} className={`${module.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {module.icon}
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant={module.status === 'نشط' ? 'default' : 'secondary'} className="mt-1">
                        {module.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{module.users} مستخدم</span>
                  </div>
                  <Button size="sm" variant={module.status === 'نشط' ? 'default' : 'outline'}>
                    {module.status === 'نشط' ? 'إدارة' : 'قريباً'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">الإعدادات العامة</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>تفعيل الإشعارات</span>
                  <Badge variant="default">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>النسخ الاحتياطي التلقائي</span>
                  <Badge variant="default">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>التشفير المتقدم</span>
                  <Badge variant="default">مفعل</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">الصلاحيات والأمان</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>المصادقة الثنائية</span>
                  <Badge variant="default">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>سجل العمليات</span>
                  <Badge variant="default">نشط</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>مراقبة الأنشطة</span>
                  <Badge variant="default">نشط</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              إعدادات متقدمة
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              إدارة قاعدة البيانات
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              تصدير التقارير
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};