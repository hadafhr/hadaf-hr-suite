import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  DollarSign, 
  Clock, 
  Shield, 
  FileSignature, 
  Settings,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Link,
  Bell
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: React.ReactNode;
  lastSync?: string;
  nextSync?: string;
  features: string[];
}

export const IntegrationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payroll');

  const integrations: Integration[] = [
    {
      id: 'payroll',
      name: 'الرواتب والمستحقات',
      description: 'تحديث الرواتب تلقائياً عند اعتماد البدلات والسلف',
      category: 'payroll',
      status: 'connected',
      icon: <DollarSign className="w-5 h-5" />,
      lastSync: '2024-01-15 14:30',
      nextSync: '2024-01-15 15:00',
      features: ['حساب البدلات', 'خصم السلف', 'تحديث الراتب الصافي']
    },
    {
      id: 'attendance',
      name: 'نظام الحضور والانصراف',
      description: 'مزامنة طلبات الإجازات مع بيانات الحضور',
      category: 'attendance',
      status: 'connected',
      icon: <Clock className="w-5 h-5" />,
      lastSync: '2024-01-15 14:25',
      nextSync: '2024-01-15 15:00',
      features: ['تحديث رصيد الإجازات', 'احتساب أيام العمل', 'إشعارات التأخير']
    },
    {
      id: 'insurance',
      name: 'التأمين الطبي',
      description: 'ربط طلبات التأمين مع مقدمي الخدمة',
      category: 'insurance',
      status: 'disconnected',
      icon: <Shield className="w-5 h-5" />,
      features: ['موافقة المطالبات', 'تحديث التغطية', 'إشعار انتهاء البوليصة']
    },
    {
      id: 'esign',
      name: 'التوقيع الإلكتروني',
      description: 'توقيع العقود والوثائق إلكترونياً',
      category: 'documents',
      status: 'error',
      icon: <FileSignature className="w-5 h-5" />,
      features: ['توقيع العقود', 'إرسال للتوقيع', 'حفظ الوثائق الموقعة']
    }
  ];

  const syncLogs = [
    { time: '14:30', system: 'الرواتب', action: 'تحديث بدل إقامة - أحمد محمد', status: 'success' },
    { time: '14:25', system: 'الحضور', action: 'مزامنة إجازة سنوية - سارة أحمد', status: 'success' },
    { time: '14:20', system: 'التأمين', action: 'فشل الاتصال بالخادم', status: 'error' },
    { time: '14:15', system: 'التوقيع', action: 'توقيع عقد عمل - محمد علي', status: 'success' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">مركز التكاملات</h2>
          <p className="text-muted-foreground">إدارة التكاملات مع الأنظمة الخارجية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 ml-2" />
            مزامنة جميع الأنظمة
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 ml-2" />
            إعدادات التكامل
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payroll">الرواتب</TabsTrigger>
          <TabsTrigger value="attendance">الحضور</TabsTrigger>
          <TabsTrigger value="insurance">التأمين</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                تكامل نظام الرواتب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">متصل بنجاح</p>
                    <p className="text-sm text-muted-foreground">آخر مزامنة: 2024-01-15 14:30</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">البدلات المعتمدة اليوم</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">السلف المحسومة</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">التحديثات المعلقة</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير البيانات
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع ملف الرواتب
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                تكامل نظام الحضور
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">متصل بنجاح</p>
                    <p className="text-sm text-muted-foreground">آخر مزامنة: 2024-01-15 14:25</p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الإجازات المعتمدة</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الأرصدة المحدثة</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الإشعارات المرسلة</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="رقم البصمة" className="flex-1" />
                  <Button size="sm">ربط</Button>
                </div>
                <p className="text-xs text-muted-foreground">ربط رقم البصمة برقم الموظف</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                تكامل التأمين الطبي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">غير متصل</p>
                    <p className="text-sm text-muted-foreground">يتطلب إعداد الاتصال</p>
                  </div>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm">يتطلب تكوين API للاتصال بشركة التأمين</p>
                <Button size="sm" className="mt-2">إعداد الاتصال</Button>
              </div>

              <div className="space-y-2">
                <Input placeholder="API Key" />
                <Input placeholder="Base URL" />
                <Button>حفظ الإعدادات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSignature className="w-5 h-5" />
                تكامل التوقيع الإلكتروني
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-medium">خطأ في الاتصال</p>
                    <p className="text-sm text-muted-foreground">فشل في الاتصال بالخادم</p>
                  </div>
                </div>
                <Switch checked={false} />
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">خطأ: انتهت صلاحية شهادة SSL</p>
                <Button size="sm" variant="destructive" className="mt-2">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  إعادة المحاولة
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>الوثائق المعلقة</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span>التوقيعات المكتملة</span>
                  <Badge variant="secondary">12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sync Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            سجل المزامنة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {syncLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(log.status)}
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.system} - {log.time}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(log.status)}>
                  {log.status === 'success' ? 'نجح' : 'فشل'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};