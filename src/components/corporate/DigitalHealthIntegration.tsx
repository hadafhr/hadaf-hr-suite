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

        <TabsContent value="devices">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">إدارة الأجهزة المتصلة</h3>
                <p className="text-muted-foreground">عرض وإدارة جميع الأجهزة الصحية المتصلة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">تحليلات البيانات الصحية</h3>
                <p className="text-muted-foreground">رؤى وتحليلات متقدمة للبيانات الصحية</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">الخصوصية وأمن البيانات</h3>
                <p className="text-muted-foreground">إدارة صلاحيات الوصول وحماية البيانات الصحية</p>
              </div>
              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">متوافق مع لوائح حماية البيانات الصحية</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};