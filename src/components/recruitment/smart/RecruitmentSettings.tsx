import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Users, 
  Shield, 
  Brain, 
  Bot,
  Mail,
  Bell,
  Database,
  Key,
  Globe,
  Clock,
  Target,
  FileText,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Zap
} from 'lucide-react';

export const RecruitmentSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'منصة التوظيف الذكي SmartHire',
    organizationName: 'شركة بُعد',
    timeZone: 'Asia/Riyadh',
    language: 'ar',
    currency: 'SAR',
    
    // AI Settings
    aiEnabled: true,
    aiModel: 'advanced',
    confidenceThreshold: 80,
    biasDetection: true,
    modelUpdateFrequency: 'monthly',
    
    // Panel Settings
    panelSize: 4,
    votingType: 'weighted',
    quorumRequired: 75,
    anonymousVoting: false,
    voteTimeLimit: 7,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    instantAlerts: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    auditLogging: true,
    dataEncryption: true,
    gdprCompliance: true,
    
    // Integration Settings
    hrisIntegration: true,
    calendarSync: true,
    emailIntegration: true,
    documentManagement: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    // Reset to default values
    setSettings({
      systemName: 'منصة التوظيف الذكي SmartHire',
      organizationName: 'شركة بُعد',
      timeZone: 'Asia/Riyadh',
      language: 'ar',
      currency: 'SAR',
      aiEnabled: true,
      aiModel: 'advanced',
      confidenceThreshold: 80,
      biasDetection: true,
      modelUpdateFrequency: 'monthly',
      panelSize: 4,
      votingType: 'weighted',
      quorumRequired: 75,
      anonymousVoting: false,
      voteTimeLimit: 7,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyReports: true,
      instantAlerts: true,
      twoFactorAuth: true,
      sessionTimeout: 30,
      auditLogging: true,
      dataEncryption: true,
      gdprCompliance: true,
      hrisIntegration: true,
      calendarSync: true,
      emailIntegration: true,
      documentManagement: true
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `smarthire-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            إعدادات التوظيف الذكي
          </h2>
          <p className="text-muted-foreground">إدارة وتخصيص إعدادات نظام التوظيف الذكي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            استعادة افتراضية
          </Button>
          <Button variant="outline" onClick={exportSettings} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير الإعدادات
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="ai">الذكاء الاصطناعي</TabsTrigger>
          <TabsTrigger value="panel">اللجنة</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="integration">التكامل</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  الإعدادات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="systemName">اسم النظام</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => updateSetting('systemName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="organizationName">اسم المؤسسة</Label>
                  <Input
                    id="organizationName"
                    value={settings.organizationName}
                    onChange={(e) => updateSetting('organizationName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="timeZone">المنطقة الزمنية</Label>
                  <Select value={settings.timeZone} onValueChange={(value) => updateSetting('timeZone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">الرياض (UTC+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (UTC+4)</SelectItem>
                      <SelectItem value="Asia/Kuwait">الكويت (UTC+3)</SelectItem>
                      <SelectItem value="Africa/Cairo">القاهرة (UTC+2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  التفضيلات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">اللغة الافتراضية</Label>
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">العملة</Label>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                      <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                      <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  إعدادات الذكاء الاصطناعي
                </CardTitle>
                <CardDescription>تخصيص أداء وسلوك نماذج الذكاء الاصطناعي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">تفعيل الذكاء الاصطناعي</Label>
                    <p className="text-sm text-muted-foreground">تشغيل جميع ميزات الذكاء الاصطناعي</p>
                  </div>
                  <Switch
                    checked={settings.aiEnabled}
                    onCheckedChange={(checked) => updateSetting('aiEnabled', checked)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">نموذج الذكاء الاصطناعي</Label>
                  <Select value={settings.aiModel} onValueChange={(value) => updateSetting('aiModel', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">أساسي - سريع ومتوازن</SelectItem>
                      <SelectItem value="advanced">متقدم - دقة عالية</SelectItem>
                      <SelectItem value="premium">مميز - أقصى دقة وميزات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold">حد الثقة ({settings.confidenceThreshold}%)</Label>
                  <p className="text-sm text-muted-foreground mb-3">الحد الأدنى لمستوى ثقة التوصيات</p>
                  <Slider
                    value={[settings.confidenceThreshold]}
                    onValueChange={(value) => updateSetting('confidenceThreshold', value[0])}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">كشف التحيز</Label>
                    <p className="text-sm text-muted-foreground">فحص دوري للتحيز في القرارات</p>
                  </div>
                  <Switch
                    checked={settings.biasDetection}
                    onCheckedChange={(checked) => updateSetting('biasDetection', checked)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">تكرار تحديث النموذج</Label>
                  <Select value={settings.modelUpdateFrequency} onValueChange={(value) => updateSetting('modelUpdateFrequency', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      <SelectItem value="manual">يدوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="panel" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  إعدادات لجنة التوظيف
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">حجم اللجنة الافتراضي</Label>
                  <Input
                    type="number"
                    value={settings.panelSize}
                    onChange={(e) => updateSetting('panelSize', parseInt(e.target.value))}
                    min={2}
                    max={10}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">عدد أعضاء اللجنة لكل تقييم</p>
                </div>

                <div>
                  <Label className="text-base font-semibold">نوع التصويت</Label>
                  <Select value={settings.votingType} onValueChange={(value) => updateSetting('votingType', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="majority">أغلبية بسيطة</SelectItem>
                      <SelectItem value="weighted">تصويت مرجح</SelectItem>
                      <SelectItem value="unanimous">إجماع كامل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold">النصاب المطلوب ({settings.quorumRequired}%)</Label>
                  <Slider
                    value={[settings.quorumRequired]}
                    onValueChange={(value) => updateSetting('quorumRequired', value[0])}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full mt-3"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">التصويت المجهول</Label>
                    <p className="text-sm text-muted-foreground">إخفاء هوية المصوتين</p>
                  </div>
                  <Switch
                    checked={settings.anonymousVoting}
                    onCheckedChange={(checked) => updateSetting('anonymousVoting', checked)}
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold">مهلة التصويت (بالأيام)</Label>
                  <Input
                    type="number"
                    value={settings.voteTimeLimit}
                    onChange={(e) => updateSetting('voteTimeLimit', parseInt(e.target.value))}
                    min={1}
                    max={30}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  إشعارات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعارات عبر البريد</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">إشعارات الرسائل النصية</Label>
                    <p className="text-sm text-muted-foreground">إرسال رسائل SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">الإشعارات الفورية</Label>
                    <p className="text-sm text-muted-foreground">إشعارات داخل النظام</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  التقارير والتنبيهات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">التقارير الأسبوعية</Label>
                    <p className="text-sm text-muted-foreground">إرسال تقارير دورية</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">التنبيهات الفورية</Label>
                    <p className="text-sm text-muted-foreground">تنبيهات المشاكل العاجلة</p>
                  </div>
                  <Switch
                    checked={settings.instantAlerts}
                    onCheckedChange={(checked) => updateSetting('instantAlerts', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  الأمان والخصوصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">طبقة أمان إضافية لتسجيل الدخول</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                    />
                    {settings.twoFactorAuth && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">مهلة انتهاء الجلسة (دقيقة)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    min={5}
                    max={480}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">مدة الخمول قبل تسجيل الخروج التلقائي</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">سجل المراجعة</Label>
                    <p className="text-sm text-muted-foreground">تتبع جميع العمليات والتغييرات</p>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">تشفير البيانات</Label>
                    <p className="text-sm text-muted-foreground">تشفير البيانات الحساسة</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings.dataEncryption}
                      onCheckedChange={(checked) => updateSetting('dataEncryption', checked)}
                    />
                    <Key className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">امتثال GDPR</Label>
                    <p className="text-sm text-muted-foreground">الامتثال لقوانين حماية البيانات</p>
                  </div>
                  <Switch
                    checked={settings.gdprCompliance}
                    onCheckedChange={(checked) => updateSetting('gdprCompliance', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  التكاملات النشطة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <Label className="text-base font-semibold">نظام الموارد البشرية</Label>
                      <p className="text-sm text-muted-foreground">مزامنة البيانات مع HRIS</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.hrisIntegration}
                    onCheckedChange={(checked) => updateSetting('hrisIntegration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <Label className="text-base font-semibold">مزامنة التقويم</Label>
                      <p className="text-sm text-muted-foreground">جدولة المقابلات تلقائياً</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.calendarSync}
                    onCheckedChange={(checked) => updateSetting('calendarSync', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  خدمات إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <Label className="text-base font-semibold">تكامل البريد الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">إرسال الإشعارات والتقارير</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailIntegration}
                    onCheckedChange={(checked) => updateSetting('emailIntegration', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <Label className="text-base font-semibold">إدارة الوثائق</Label>
                      <p className="text-sm text-muted-foreground">حفظ ومعالجة الملفات</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.documentManagement}
                    onCheckedChange={(checked) => updateSetting('documentManagement', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Status Bar */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                النظام متصل
              </Badge>
              <span className="text-sm text-muted-foreground">
                آخر تحديث: {new Date().toLocaleString('ar-SA')}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                معاينة النظام
              </Button>
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4 mr-1" />
                استيراد إعدادات
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};