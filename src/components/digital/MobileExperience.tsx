import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Download, 
  Users, 
  Star,
  TrendingUp,
  Bell,
  Zap,
  Shield,
  Globe,
  Plus,
  Filter,
  BarChart3,
  Clock,
  CheckCircle,
  Settings
} from 'lucide-react';

export const MobileExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    activeUsers: 3450,
    appRating: 4.8,
    downloads: 5200,
    dailyActive: 2100,
    pushNotifications: 1250,
    avgSessionTime: '12.5'
  };

  const features = [
    {
      id: 1,
      name: 'إدارة الحضور المتنقلة',
      icon: Clock,
      usage: 92,
      users: 3200,
      status: 'active',
      description: 'تسجيل الحضور والانصراف عبر الجوال بتقنية GPS'
    },
    {
      id: 2,
      name: 'بوابة الموظف المتنقلة',
      icon: Users,
      usage: 88,
      users: 3100,
      status: 'active',
      description: 'الوصول إلى جميع خدمات الموظفين عبر الجوال'
    },
    {
      id: 3,
      name: 'الإشعارات الفورية',
      icon: Bell,
      usage: 95,
      users: 3400,
      status: 'active',
      description: 'تنبيهات فورية للأحداث المهمة والتحديثات'
    },
    {
      id: 4,
      name: 'الطلبات والموافقات',
      icon: CheckCircle,
      usage: 85,
      users: 2900,
      status: 'active',
      description: 'تقديم الطلبات والموافقة عليها من الجوال'
    }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">تطبيقات الجوال - تجربة Mobile-First</h1>
          <p className="text-muted-foreground">منصة متكاملة لإدارة الموارد البشرية عبر الأجهزة المحمولة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مستخدمون نشطون</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">تقييم التطبيق</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.appRating}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">التحميلات</p>
                  <p className="text-2xl font-bold text-green-600">{stats.downloads.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">نشط يومياً</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.dailyActive.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الإشعارات</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.pushNotifications.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الجلسة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgSessionTime} د</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
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
          <TabsTrigger value="features" className="flex flex-col gap-1 py-3">
            <Zap className="h-4 w-4" />
            <span className="text-xs">المميزات</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex flex-col gap-1 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">الأداء</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col gap-1 py-3">
            <Shield className="h-4 w-4" />
            <span className="text-xs">الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex flex-col gap-1 py-3">
            <Globe className="h-4 w-4" />
            <span className="text-xs">التوزيع</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">استخدام المنصات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: 'iOS', users: 1850, percentage: 54, color: 'bg-blue-600' },
                    { platform: 'Android', users: 1600, percentage: 46, color: 'bg-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.platform}</span>
                        <span className="text-muted-foreground">{item.users} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">أوقات الذروة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '7:00 - 9:00 ص', usage: 'ذروة الصباح', percentage: 85, icon: '🌅' },
                    { time: '12:00 - 2:00 م', usage: 'وقت الغداء', percentage: 65, icon: '🍽️' },
                    { time: '5:00 - 7:00 م', usage: 'ذروة المساء', percentage: 72, icon: '🌆' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.time}</p>
                          <p className="text-xs text-muted-foreground">{item.usage}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          {features.map((feature) => (
            <Card key={feature.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">{feature.name}</h3>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">نشط</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {feature.users.toLocaleString()} مستخدم
                        </span>
                        <span>•</span>
                        <span>معدل الاستخدام: {feature.usage}%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 ml-2" />
                    الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">سرعة التحميل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">2.3s</p>
                    <p className="text-sm text-muted-foreground mt-1">متوسط وقت التحميل</p>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">الأداء</span>
                      <span className="text-green-600 font-medium">ممتاز</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">معدل الاستجابة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-600">98.5%</p>
                    <p className="text-sm text-muted-foreground mt-1">نسبة الاستجابة الناجحة</p>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">الموثوقية</span>
                      <span className="text-blue-600 font-medium">ممتاز</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '98.5%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">معدل الأخطاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">0.2%</p>
                    <p className="text-sm text-muted-foreground mt-1">نسبة الأخطاء</p>
                  </div>
                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">الاستقرار</span>
                      <span className="text-green-600 font-medium">ممتاز</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '99.8%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-border/50 bg-gradient-to-r from-green-500/5 to-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">حماية متقدمة</h3>
                  <p className="text-sm text-muted-foreground">جميع البيانات محمية بتشفير من الطرف إلى الطرف</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">معايير الأمان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { feature: 'تشفير البيانات (AES-256)', status: 'مفعّل' },
                    { feature: 'المصادقة البيومترية', status: 'مفعّل' },
                    { feature: 'المصادقة الثنائية', status: 'مفعّل' },
                    { feature: 'فحص الأمان الدوري', status: 'نشط' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{item.feature}</span>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">الامتثال والشهادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { cert: 'ISO 27001', validity: 'ساري' },
                    { cert: 'SOC 2 Type II', validity: 'ساري' },
                    { cert: 'GDPR Compliant', validity: 'متوافق' },
                    { cert: 'PDPL Saudi Arabia', validity: 'متوافق' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{item.cert}</span>
                      <Badge variant="outline">{item.validity}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">قنوات التوزيع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Download className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">App Store</h4>
                      <p className="text-sm text-muted-foreground">iOS</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التحميلات</span>
                      <span className="font-medium">2,800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التقييم</span>
                      <span className="font-medium">4.9 ⭐</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل من App Store
                  </Button>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-500/10 to-transparent rounded-xl border border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Download className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Google Play</h4>
                      <p className="text-sm text-muted-foreground">Android</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التحميلات</span>
                      <span className="font-medium">2,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التقييم</span>
                      <span className="font-medium">4.7 ⭐</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل من Google Play
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
