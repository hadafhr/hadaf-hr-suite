import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings,
  Clock,
  MapPin,
  Bell,
  Shield,
  Users,
  Calendar,
  Smartphone,
  Save,
  RefreshCw
} from 'lucide-react';
import boudLogo from '@/assets/boud-logo-large.png';

const AttendanceSettings: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ إعدادات الحضور بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img 
          src={boudLogo}
          alt="Boud Logo" 
          className="h-32 w-auto object-contain"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">إعدادات نظام الحضور</h1>
        <p className="text-muted-foreground">إدارة وتخصيص إعدادات نظام الحضور والانصراف</p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-card/50 backdrop-blur-xl border border-border">
          <TabsTrigger value="general" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="h-5 w-5" />
            <span className="text-xs">عام</span>
          </TabsTrigger>
          <TabsTrigger value="time" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-xs">الأوقات</span>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MapPin className="h-5 w-5" />
            <span className="text-xs">المواقع</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="h-5 w-5" />
            <span className="text-xs">الإشعارات</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Smartphone className="h-5 w-5" />
            <span className="text-xs">الأجهزة</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                الإعدادات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-checkout">تسجيل الخروج التلقائي</Label>
                  <p className="text-sm text-muted-foreground">تسجيل خروج تلقائي عند انتهاء وقت العمل</p>
                </div>
                <Switch id="auto-checkout" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="face-recognition">التعرف على الوجه</Label>
                  <p className="text-sm text-muted-foreground">استخدام التعرف على الوجه للحضور</p>
                </div>
                <Switch id="face-recognition" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="gps-tracking">تتبع GPS</Label>
                  <p className="text-sm text-muted-foreground">تفعيل تتبع الموقع الجغرافي</p>
                </div>
                <Switch id="gps-tracking" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="overtime">احتساب الوقت الإضافي</Label>
                  <p className="text-sm text-muted-foreground">احتساب ساعات العمل الإضافية تلقائياً</p>
                </div>
                <Switch id="overtime" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </TabsContent>

        {/* Time Settings */}
        <TabsContent value="time" className="space-y-6 mt-6">
          <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                إعدادات الأوقات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="work-start">وقت بداية العمل</Label>
                  <Input id="work-start" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-end">وقت نهاية العمل</Label>
                  <Input id="work-end" type="time" defaultValue="17:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="late-threshold">حد التأخير (دقائق)</Label>
                  <Input id="late-threshold" type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="early-leave">حد المغادرة المبكرة (دقائق)</Label>
                  <Input id="early-leave" type="number" defaultValue="15" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </TabsContent>

        {/* Location Settings */}
        <TabsContent value="location" className="space-y-6 mt-6">
          <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                إعدادات المواقع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">المكتب الرئيسي</h4>
                    <Badge>نشط</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                  <p className="text-xs text-muted-foreground mt-1">نطاق: 100 متر</p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">الفرع الشرقي</h4>
                    <Badge variant="outline">غير نشط</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">الدمام، المملكة العربية السعودية</p>
                  <p className="text-xs text-muted-foreground mt-1">نطاق: 100 متر</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                إضافة موقع جديد
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notify-late">إشعار التأخير</Label>
                  <p className="text-sm text-muted-foreground">إرسال إشعار عند تأخر الموظف</p>
                </div>
                <Switch id="notify-late" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notify-absent">إشعار الغياب</Label>
                  <p className="text-sm text-muted-foreground">إرسال إشعار عند غياب الموظف</p>
                </div>
                <Switch id="notify-absent" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notify-overtime">إشعار الوقت الإضافي</Label>
                  <p className="text-sm text-muted-foreground">إرسال إشعار عند تسجيل وقت إضافي</p>
                </div>
                <Switch id="notify-overtime" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </TabsContent>

        {/* Devices Settings */}
        <TabsContent value="devices" className="space-y-6 mt-6">
          <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                إدارة الأجهزة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="mobile-app">تطبيق الهاتف</Label>
                  <p className="text-sm text-muted-foreground">السماح بالحضور عبر تطبيق الهاتف</p>
                </div>
                <Switch id="mobile-app" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="biometric">الأجهزة البيومترية</Label>
                  <p className="text-sm text-muted-foreground">السماح بأجهزة البصمة والوجه</p>
                </div>
                <Switch id="biometric" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">الأجهزة المسجلة</h4>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">جهاز البصمة - المكتب الرئيسي</p>
                      <p className="text-sm text-muted-foreground">آخر نشاط: منذ ساعتين</p>
                    </div>
                    <Badge>متصل</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              حفظ التغييرات
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceSettings;