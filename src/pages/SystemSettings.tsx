import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Settings, 
  Users, 
  Shield, 
  Bell,
  Database,
  Mail,
  Palette,
  Clock,
  Globe,
  Lock,
  Key,
  UserCheck,
  FileText,
  Calendar,
  Briefcase,
  Monitor,
  Smartphone,
  Wifi,
  HardDrive,
  Cloud,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SystemSettings: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // حالات الإعدادات
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      reminderNotifications: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      lockAfterAttempts: 5
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
      analyticsTracking: true
    },
    appearance: {
      darkMode: false,
      language: 'ar',
      timezone: 'Asia/Riyadh',
      dateFormat: 'dd/mm/yyyy'
    },
    attendance: {
      autoClockOut: true,
      overtimeAlert: true,
      lateArrivalGrace: 15,
      breakDuration: 30
    },
    hr: {
      autoApproveLeave: false,
      performanceReviewCycle: 12,
      probationPeriod: 3,
      noticeLength: 30
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
    toast({
      title: "تم تحديث الإعداد",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleSaveAll = () => {
    toast({
      title: "تم حفظ جميع الإعدادات",
      description: "تم حفظ جميع التغييرات بنجاح",
    });
  };

  const handleReset = () => {
    toast({
      title: "إعادة تعيين الإعدادات",
      description: "تم إعادة تعيين جميع الإعدادات إلى القيم الافتراضية",
      variant: "destructive"
    });
  };

  const handleBackup = () => {
    toast({
      title: "إنشاء نسخة احتياطية",
      description: "تم إنشاء نسخة احتياطية من البيانات بنجاح",
    });
  };

  const handleRestore = () => {
    toast({
      title: "استعادة النسخة الاحتياطية",
      description: "تم استعادة البيانات من النسخة الاحتياطية بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">إعدادات النظام</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                إعدادات نظام إدارة الموظفين
              </h1>
              <p className="text-muted-foreground">
                تخصيص وإدارة جميع إعدادات النظام والتفضيلات المتقدمة
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                إعادة تعيين
              </Button>
              <Button onClick={handleSaveAll}>
                <Download className="h-4 w-4 mr-2" />
                حفظ جميع الإعدادات
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="attendance">الحضور</TabsTrigger>
              <TabsTrigger value="hr">الموارد البشرية</TabsTrigger>
              <TabsTrigger value="system">النظام</TabsTrigger>
              <TabsTrigger value="backup">النسخ الاحتياطي</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">المظهر والواجهة</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>الوضع الليلي</span>
                      <Switch 
                        checked={settings.appearance.darkMode}
                        onCheckedChange={(checked) => handleSettingChange('appearance', 'darkMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>اللغة</span>
                      <select 
                        value={settings.appearance.language}
                        onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                        className="bg-background border border-border rounded-md px-3 py-1"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>المنطقة الزمنية</span>
                      <select 
                        value={settings.appearance.timezone}
                        onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
                        className="bg-background border border-border rounded-md px-3 py-1"
                      >
                        <option value="Asia/Riyadh">الرياض</option>
                        <option value="Asia/Dubai">دبي</option>
                        <option value="Asia/Kuwait">الكويت</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تنسيق التاريخ</span>
                      <select 
                        value={settings.appearance.dateFormat}
                        onChange={(e) => handleSettingChange('appearance', 'dateFormat', e.target.value)}
                        className="bg-background border border-border rounded-md px-3 py-1"
                      >
                        <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                        <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                        <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                      </select>
                    </div>
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">إعدادات العرض</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>عرض الشعار</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>شريط التنقل المثبت</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عرض الإحصائيات في الصفحة الرئيسية</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تحديث البيانات تلقائياً</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">إعدادات الأمان</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>المصادقة الثنائية</span>
                      <Switch 
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>انتهاء الجلسة (دقيقة)</span>
                      <input 
                        type="number" 
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>انتهاء صلاحية كلمة المرور (يوم)</span>
                      <input 
                        type="number" 
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>قفل الحساب بعد محاولات فاشلة</span>
                      <input 
                        type="number" 
                        value={settings.security.lockAfterAttempts}
                        onChange={(e) => handleSettingChange('security', 'lockAfterAttempts', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">صلاحيات الوصول</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>وصول المدراء للتقارير</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تحرير بيانات الموظفين</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>حذف السجلات</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تصدير البيانات</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">إعدادات الإشعارات</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium">الإشعارات العامة</h4>
                    <div className="flex items-center justify-between">
                      <span>إشعارات البريد الإلكتروني</span>
                      <Switch 
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الإشعارات المنبثقة</span>
                      <Switch 
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الرسائل النصية</span>
                      <Switch 
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>التذكيرات</span>
                      <Switch 
                        checked={settings.notifications.reminderNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'reminderNotifications', checked)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">إشعارات متخصصة</h4>
                    <div className="flex items-center justify-between">
                      <span>طلبات الإجازة الجديدة</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>التأخير في الحضور</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>انتهاء العقود</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>مراجعة الأداء</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">إعدادات الحضور والانصراف</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>الخروج التلقائي</span>
                      <Switch 
                        checked={settings.attendance.autoClockOut}
                        onCheckedChange={(checked) => handleSettingChange('attendance', 'autoClockOut', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تنبيه العمل الإضافي</span>
                      <Switch 
                        checked={settings.attendance.overtimeAlert}
                        onCheckedChange={(checked) => handleSettingChange('attendance', 'overtimeAlert', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>فترة السماح للتأخير (دقيقة)</span>
                      <input 
                        type="number" 
                        value={settings.attendance.lateArrivalGrace}
                        onChange={(e) => handleSettingChange('attendance', 'lateArrivalGrace', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>مدة الاستراحة (دقيقة)</span>
                      <input 
                        type="number" 
                        value={settings.attendance.breakDuration}
                        onChange={(e) => handleSettingChange('attendance', 'breakDuration', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>ساعات العمل الأسبوعية</span>
                      <input 
                        type="number" 
                        defaultValue={40}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>أيام العمل في الأسبوع</span>
                      <input 
                        type="number" 
                        defaultValue={5}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>بداية اليوم العمل</span>
                      <input 
                        type="time" 
                        defaultValue="08:00"
                        className="bg-background border border-border rounded-md px-3 py-1"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>نهاية يوم العمل</span>
                      <input 
                        type="time" 
                        defaultValue="17:00"
                        className="bg-background border border-border rounded-md px-3 py-1"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="hr" className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">إعدادات الموارد البشرية</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>الموافقة التلقائية على الإجازات</span>
                      <Switch 
                        checked={settings.hr.autoApproveLeave}
                        onCheckedChange={(checked) => handleSettingChange('hr', 'autoApproveLeave', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>دورة مراجعة الأداء (شهر)</span>
                      <input 
                        type="number" 
                        value={settings.hr.performanceReviewCycle}
                        onChange={(e) => handleSettingChange('hr', 'performanceReviewCycle', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>فترة التجربة (شهر)</span>
                      <input 
                        type="number" 
                        value={settings.hr.probationPeriod}
                        onChange={(e) => handleSettingChange('hr', 'probationPeriod', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>فترة الإشعار (يوم)</span>
                      <input 
                        type="number" 
                        value={settings.hr.noticeLength}
                        onChange={(e) => handleSettingChange('hr', 'noticeLength', parseInt(e.target.value))}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>الإجازة السنوية القصوى (يوم)</span>
                      <input 
                        type="number" 
                        defaultValue={30}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الإجازة المرضية القصوى (يوم)</span>
                      <input 
                        type="number" 
                        defaultValue={15}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>حد أقل للراتب الأساسي</span>
                      <input 
                        type="number" 
                        defaultValue={3000}
                        className="bg-background border border-border rounded-md px-3 py-1 w-24"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>معدل العمل الإضافي (%)</span>
                      <input 
                        type="number" 
                        defaultValue={150}
                        className="bg-background border border-border rounded-md px-3 py-1 w-20"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">إعدادات النظام</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>النسخ الاحتياطي التلقائي</span>
                      <Switch 
                        checked={settings.system.autoBackup}
                        onCheckedChange={(checked) => handleSettingChange('system', 'autoBackup', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>وضع الصيانة</span>
                      <Switch 
                        checked={settings.system.maintenanceMode}
                        onCheckedChange={(checked) => handleSettingChange('system', 'maintenanceMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>وضع التطوير</span>
                      <Switch 
                        checked={settings.system.debugMode}
                        onCheckedChange={(checked) => handleSettingChange('system', 'debugMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>تتبع الاستخدام</span>
                      <Switch 
                        checked={settings.system.analyticsTracking}
                        onCheckedChange={(checked) => handleSettingChange('system', 'analyticsTracking', checked)}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">معلومات النظام</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>إصدار النظام:</span>
                      <span className="font-medium">2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>آخر تحديث:</span>
                      <span className="font-medium">2024-08-01</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مساحة التخزين المستخدمة:</span>
                      <span className="font-medium">2.3 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد المستخدمين النشطين:</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حالة الخادم:</span>
                      <span className="font-medium text-green-600">متصل</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Cloud className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">النسخ الاحتياطي</h3>
                  </div>
                  <div className="space-y-4">
                    <Button onClick={handleBackup} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      إنشاء نسخة احتياطية الآن
                    </Button>
                    <Button variant="outline" onClick={handleRestore} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      استعادة من نسخة احتياطية
                    </Button>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>آخر نسخة احتياطية: 2024-08-04 14:30</p>
                      <p>حجم النسخة الاحتياطية: 1.2 GB</p>
                      <p>تردد النسخ الاحتياطي: يومي في 2:00 صباحاً</p>
                    </div>
                  </div>
                </Card>

                <Card className="dashboard-card">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">سجل النسخ الاحتياطية</h3>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((backup) => (
                      <div key={backup} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="text-sm">
                          <p className="font-medium">نسخة احتياطية {backup}</p>
                          <p className="text-muted-foreground">2024-08-{String(backup).padStart(2, '0')} 02:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;