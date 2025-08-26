import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Lock, Eye, AlertTriangle, CheckCircle, 
  Key, FileText, Users, Clock, Settings, 
  Database, Wifi, Smartphone, Globe
} from 'lucide-react';

interface SecurityDataProtectionProps {
  onBack: () => void;
}

const SecurityDataProtection = ({ onBack }: SecurityDataProtectionProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const securityMetrics = [
    {
      title: 'مستوى الأمان',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      title: 'التهديدات المكتشفة',
      value: '12',
      change: '-5',
      trend: 'down',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-red-600'
    },
    {
      title: 'المستخدمون المحميون',
      value: '1,234',
      change: '+45',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'عمليات التدقيق',
      value: '2,456',
      change: '+156',
      trend: 'up',
      icon: <Eye className="w-6 h-6" />,
      color: 'text-purple-600'
    }
  ];

  const securityPolicies = [
    {
      id: '1',
      name: 'سياسة كلمات المرور',
      description: 'متطلبات كلمات المرور القوية والتحديث الدوري',
      status: 'active',
      compliance: 98,
      lastUpdate: '2024-01-15',
      violations: 3
    },
    {
      id: '2',
      name: 'التحكم في الوصول',
      description: 'إدارة صلاحيات المستخدمين والأدوار',
      status: 'active',
      compliance: 95,
      lastUpdate: '2024-01-20',
      violations: 1
    },
    {
      id: '3',
      name: 'حماية البيانات',
      description: 'تشفير وحماية البيانات الحساسة',
      status: 'active',
      compliance: 100,
      lastUpdate: '2024-01-22',
      violations: 0
    }
  ];

  const accessLogs = [
    {
      id: '1',
      user: 'أحمد محمد',
      action: 'تسجيل دخول',
      resource: 'نظام الموارد البشرية',
      time: '2024-01-25 09:30',
      status: 'success',
      location: 'الرياض، المملكة العربية السعودية'
    },
    {
      id: '2',
      user: 'سارا أحمد',
      action: 'عرض تقرير',
      resource: 'تقرير الرواتب',
      time: '2024-01-25 09:25',
      status: 'success',
      location: 'جدة، المملكة العربية السعودية'
    },
    {
      id: '3',
      user: 'محمد علي',
      action: 'محاولة وصول',
      resource: 'البيانات المالية',
      time: '2024-01-25 09:20',
      status: 'blocked',
      location: 'غير معروف'
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-primary/5 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              الأمان وحماية البيانات
            </h1>
            <p className="text-muted-foreground">
              نظام شامل لحماية البيانات ومراقبة الأمان
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            إعدادات الأمان
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
            <Shield className="w-4 h-4" />
            فحص أمني جديد
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.change}
                  </div>
                  <div className={`mt-2 ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30">
          <TabsTrigger value="overview" className="gap-2">
            <Shield className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="policies" className="gap-2">
            <FileText className="w-4 h-4" />
            السياسات الأمنية
          </TabsTrigger>
          <TabsTrigger value="access" className="gap-2">
            <Key className="w-4 h-4" />
            التحكم في الوصول
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="gap-2">
            <Eye className="w-4 h-4" />
            المراقبة والتدقيق
          </TabsTrigger>
          <TabsTrigger value="incidents" className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            الحوادث الأمنية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  حالة الأمان العامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { component: 'حماية كلمات المرور', status: 98, color: 'text-green-600' },
                    { component: 'التشفير', status: 100, color: 'text-green-600' },
                    { component: 'المصادقة الثنائية', status: 87, color: 'text-yellow-600' },
                    { component: 'مراقبة الوصول', status: 95, color: 'text-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.component}</span>
                        <span className={`font-medium ${item.color}`}>{item.status}%</span>
                      </div>
                      <Progress value={item.status} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  التنبيهات الأمنية الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'تحذير', message: 'محاولة دخول غير مصرح بها', time: '10 دقائق', level: 'high' },
                    { type: 'معلومات', message: 'تم تحديث كلمة مرور المستخدم', time: '1 ساعة', level: 'low' },
                    { type: 'تحذير', message: 'تسجيل دخول من موقع جديد', time: '2 ساعة', level: 'medium' }
                  ].map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      alert.level === 'high' ? 'bg-red-50 border-red-200' :
                      alert.level === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">منذ {alert.time}</p>
                        </div>
                        <Badge variant={alert.level === 'high' ? 'destructive' : 'secondary'}>
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {securityPolicies.map((policy) => (
              <Card key={policy.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-primary">{policy.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{policy.description}</p>
                    </div>
                    <Badge variant="default">نشط</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>مستوى الامتثال:</span>
                      <span className="font-medium">{policy.compliance}%</span>
                    </div>
                    <Progress value={policy.compliance} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">آخر تحديث:</span>
                      <p className="font-medium">{policy.lastUpdate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">المخالفات:</span>
                      <p className="font-medium text-red-600">{policy.violations}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">تعديل السياسة</Button>
                    <Button size="sm" variant="outline">عرض التفاصيل</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-primary">سجل العمليات الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        log.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {log.status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{log.user}</h4>
                        <p className="text-sm text-muted-foreground">{log.action} • {log.resource}</p>
                        <p className="text-xs text-muted-foreground">{log.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{log.time}</p>
                      <Badge variant={log.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                        {log.status === 'success' ? 'نجح' : 'محظور'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDataProtection;