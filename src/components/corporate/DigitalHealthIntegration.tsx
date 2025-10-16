import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Heart, 
  Smartphone, 
  TrendingUp,
  Calendar,
  Clock,
  Plus,
  Download,
  Filter,
  BarChart3,
  Users,
  Shield,
  Stethoscope,
  Wifi,
  Bell,
  CheckCircle
} from 'lucide-react';

export const DigitalHealthIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    connectedDevices: 248,
    activeUsers: 215,
    healthChecks: 1240,
    alerts: 12,
    averageScore: 82,
    compliance: 94
  };

  const integrations = [
    {
      id: 1,
      name: 'تكامل نظام صحتي',
      provider: 'وزارة الصحة السعودية',
      status: 'active',
      users: 180,
      lastSync: '2024-12-05 10:30',
      features: ['السجلات الطبية', 'المواعيد', 'الوصفات']
    },
    {
      id: 2,
      name: 'أجهزة تتبع اللياقة',
      provider: 'متعدد',
      status: 'active',
      users: 145,
      lastSync: '2024-12-05 09:15',
      features: ['النشاط البدني', 'النوم', 'معدل القلب']
    },
    {
      id: 3,
      name: 'تطبيقات الصحة العقلية',
      provider: 'متعدد',
      status: 'active',
      users: 89,
      lastSync: '2024-12-05 08:45',
      features: ['التأمل', 'إدارة التوتر', 'الاستشارات']
    }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              التكامل مع تقنيات الصحة الرقمية
            </h2>
            <p className="text-muted-foreground mt-2">نظام شامل للربط مع منصات الصحة الرقمية وأجهزة المراقبة الصحية</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              إضافة تكامل
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">أجهزة متصلة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.connectedDevices}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">فحوصات صحية</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.healthChecks}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">تنبيهات صحية</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.alerts}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الصحة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.averageScore}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الامتثال</p>
                  <p className="text-2xl font-bold text-foreground">{stats.compliance}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="overview" className="flex flex-col gap-1 py-3">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">نظرة عامة</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex flex-col gap-1 py-3">
            <Wifi className="h-4 w-4" />
            <span className="text-xs">التكاملات</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex flex-col gap-1 py-3">
            <Smartphone className="h-4 w-4" />
            <span className="text-xs">الأجهزة</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col gap-1 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">التحليلات</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex flex-col gap-1 py-3">
            <Shield className="h-4 w-4" />
            <span className="text-xs">الخصوصية</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">الصحة العامة للموظفين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'النشاط البدني', score: 78, color: 'bg-green-600' },
                    { metric: 'جودة النوم', score: 85, color: 'bg-blue-600' },
                    { metric: 'مستوى التوتر', score: 65, color: 'bg-orange-600' },
                    { metric: 'التغذية', score: 72, color: 'bg-purple-600' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.metric}</span>
                        <span className="text-muted-foreground">{item.score}%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التنبيهات الصحية الحديثة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'تنبيه', message: 'موعد فحص دوري قادم', time: 'منذ ساعة', priority: 'medium' },
                    { type: 'تذكير', message: 'وقت تناول الدواء', time: 'منذ 2 ساعات', priority: 'high' },
                    { type: 'إشعار', message: 'تحديث بيانات التأمين', time: 'منذ 3 ساعات', priority: 'low' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.priority === 'high' ? 'bg-red-600' :
                        alert.priority === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-foreground">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wifi className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">{integration.name}</h3>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle className="h-3 w-3 ml-1" />
                          نشط
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{integration.provider}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {integration.users} مستخدم
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          آخر مزامنة: {integration.lastSync}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {integration.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">الإعدادات</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">التفاصيل</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الأجهزة النشطة</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-foreground">156</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الأجهزة غير المتصلة</span>
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
                <p className="text-2xl font-bold text-foreground">23</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">متوسط الاستخدام</span>
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">8.5 ساعات/يوم</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {[
              {
                deviceType: 'ساعة ذكية',
                brand: 'Apple Watch',
                users: 89,
                battery: 85,
                lastSync: '2024-12-05 11:20',
                status: 'active',
                metrics: ['معدل القلب', 'النشاط البدني', 'النوم']
              },
              {
                deviceType: 'سوار لياقة',
                brand: 'Fitbit',
                users: 45,
                battery: 62,
                lastSync: '2024-12-05 10:45',
                status: 'active',
                metrics: ['الخطوات', 'السعرات', 'النوم']
              },
              {
                deviceType: 'جهاز قياس ضغط الدم',
                brand: 'Omron',
                users: 34,
                battery: 45,
                lastSync: '2024-12-05 09:30',
                status: 'warning',
                metrics: ['ضغط الدم', 'معدل النبض']
              },
              {
                deviceType: 'جهاز قياس السكر',
                brand: 'FreeStyle Libre',
                users: 12,
                battery: 28,
                lastSync: '2024-12-04 18:15',
                status: 'low',
                metrics: ['مستوى الجلوكوز', 'الاتجاهات']
              }
            ].map((device, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="h-7 w-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-foreground">{device.deviceType}</h3>
                          <Badge className={
                            device.status === 'active' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                            device.status === 'warning' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                            'bg-red-500/10 text-red-600 border-red-500/20'
                          }>
                            {device.status === 'active' ? 'نشط' : device.status === 'warning' ? 'تحذير' : 'بطارية منخفضة'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{device.brand}</p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{device.users} مستخدم</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{device.lastSync}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">البطارية</span>
                            <span className="font-medium text-foreground">{device.battery}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${device.battery > 60 ? 'bg-green-600' : device.battery > 30 ? 'bg-orange-600' : 'bg-red-600'}`}
                              style={{ width: `${device.battery}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {device.metrics.map((metric, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">الإعدادات</Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">التفاصيل</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  اتجاهات النشاط البدني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'يناير', average: 7200, target: 10000, percentage: 72 },
                    { month: 'فبراير', average: 8100, target: 10000, percentage: 81 },
                    { month: 'مارس', average: 8900, target: 10000, percentage: 89 },
                    { month: 'أبريل', average: 9500, target: 10000, percentage: 95 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.month}</span>
                        <span className="text-muted-foreground">{item.average} خطوة / {item.target}</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  مؤشرات صحة القلب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'معدل القلب أثناء الراحة', value: '68 نبضة/دقيقة', status: 'جيد', color: 'bg-green-600' },
                    { metric: 'معدل القلب الأقصى', value: '165 نبضة/دقيقة', status: 'ممتاز', color: 'bg-blue-600' },
                    { metric: 'تباين معدل القلب', value: '42 مللي ثانية', status: 'متوسط', color: 'bg-orange-600' },
                    { metric: 'وقت التعافي', value: '2.3 دقيقة', status: 'جيد', color: 'bg-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{item.metric}</p>
                        <p className="text-xs text-muted-foreground">{item.value}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  تحليل جودة النوم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">متوسط ساعات النوم</p>
                      <p className="text-2xl font-bold text-foreground">7.2</p>
                      <p className="text-xs text-green-600 mt-1">+0.5 ساعة</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">جودة النوم</p>
                      <p className="text-2xl font-bold text-foreground">85%</p>
                      <p className="text-xs text-green-600 mt-1">+3%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { phase: 'نوم عميق', duration: '2.1 ساعة', percentage: 29 },
                      { phase: 'نوم خفيف', duration: '3.8 ساعة', percentage: 53 },
                      { phase: 'نوم REM', duration: '1.3 ساعة', percentage: 18 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground">{item.phase}</span>
                          <span className="text-muted-foreground">{item.duration} ({item.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  التحليل الشامل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">أداء ممتاز</p>
                        <p className="text-xs text-muted-foreground">تحسن بنسبة 15% هذا الشهر</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">التوصيات الذكية</h4>
                    {[
                      'زيادة وقت النوم بمعدل 30 دقيقة',
                      'المحافظة على النشاط البدني الحالي',
                      'تحسين فترات الاسترخاء'
                    ].map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                        <span className="text-muted-foreground">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <div className="grid gap-4">
            <Card className="border-border/50 bg-gradient-to-r from-green-500/5 to-blue-500/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">حالة الامتثال</h3>
                    <p className="text-sm text-muted-foreground">النظام متوافق بنسبة 100% مع لوائح حماية البيانات الصحية السعودية</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                    معتمد
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    معايير الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { standard: 'تشفير البيانات (AES-256)', status: 'مفعّل', icon: CheckCircle, color: 'text-green-600' },
                      { standard: 'المصادقة الثنائية (2FA)', status: 'مفعّل', icon: CheckCircle, color: 'text-green-600' },
                      { standard: 'سجلات المراجعة', status: 'نشط', icon: CheckCircle, color: 'text-green-600' },
                      { standard: 'النسخ الاحتياطي التلقائي', status: 'يومي', icon: CheckCircle, color: 'text-green-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                          <span className="text-sm font-medium text-foreground">{item.standard}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    صلاحيات الوصول
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { role: 'مدير النظام', access: 'وصول كامل', users: 3, color: 'bg-purple-600' },
                      { role: 'مدير الموارد البشرية', access: 'قراءة وكتابة', users: 8, color: 'bg-blue-600' },
                      { role: 'موظف طبي', access: 'قراءة محدودة', users: 15, color: 'bg-green-600' },
                      { role: 'موظف عادي', access: 'قراءة فقط', users: 215, color: 'bg-orange-600' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">{item.role}</span>
                          <span className="text-muted-foreground">{item.users} مستخدم</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: '100%' }} />
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{item.access}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  سجل أحداث الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      event: 'محاولة وصول غير مصرح',
                      user: 'نظام الأمان',
                      time: '2024-12-05 11:45',
                      severity: 'high',
                      action: 'تم الحظر'
                    },
                    {
                      event: 'تحديث صلاحيات مستخدم',
                      user: 'admin@company.com',
                      time: '2024-12-05 10:30',
                      severity: 'medium',
                      action: 'مكتمل'
                    },
                    {
                      event: 'نسخ احتياطي ناجح',
                      user: 'نظام آلي',
                      time: '2024-12-05 03:00',
                      severity: 'low',
                      action: 'مكتمل'
                    },
                    {
                      event: 'مراجعة سجلات الوصول',
                      user: 'security@company.com',
                      time: '2024-12-04 16:20',
                      severity: 'low',
                      action: 'مكتمل'
                    }
                  ].map((log, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.severity === 'high' ? 'bg-red-600' :
                        log.severity === 'medium' ? 'bg-orange-600' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{log.event}</p>
                          <Badge variant="outline" className="text-xs">
                            {log.action}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{log.user}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-blue-500/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">سياسة الخصوصية</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      جميع البيانات الصحية محمية وفقاً للوائح حماية البيانات الشخصية في المملكة العربية السعودية (PDPL).
                      يتم تشفير البيانات أثناء النقل والتخزين، ولا يتم مشاركتها مع أي جهة خارجية دون موافقة صريحة.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل السياسة
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};