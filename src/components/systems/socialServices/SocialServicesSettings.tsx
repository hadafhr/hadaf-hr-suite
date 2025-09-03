import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings,
  Users,
  Shield,
  Bell,
  Database,
  Workflow,
  DollarSign,
  FileText,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export const SocialServicesSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { id: 'general', name: 'إعدادات عامة', icon: Settings },
    { id: 'programs', name: 'إعدادات البرامج', icon: FileText },
    { id: 'workflow', name: 'سير العمل', icon: Workflow },
    { id: 'permissions', name: 'الصلاحيات', icon: Shield },
    { id: 'notifications', name: 'الإشعارات', icon: Bell }
  ];

  const userRoles = [
    {
      id: 1,
      name: 'موظف',
      description: 'يمكنه تقديم الطلبات وعرض حالتها',
      permissions: ['submit_request', 'view_own_requests'],
      users: 1247
    },
    {
      id: 2,
      name: 'مدير مباشر',
      description: 'يمكنه مراجعة طلبات فريقه',
      permissions: ['review_team_requests', 'approve_manager_level'],
      users: 45
    },
    {
      id: 3,
      name: 'أخصائي موارد بشرية',
      description: 'يمكنه مراجعة وإدارة جميع الطلبات',
      permissions: ['manage_all_requests', 'generate_reports'],
      users: 8
    },
    {
      id: 4,
      name: 'أخصائي خدمات اجتماعية',
      description: 'يمكنه الموافقة النهائية على الطلبات',
      permissions: ['final_approval', 'manage_programs', 'financial_reports'],
      users: 3
    }
  ];

  const workflowSteps = [
    {
      id: 1,
      name: 'تقديم الطلب',
      description: 'الموظف يقدم الطلب مع المستندات المطلوبة',
      required: true,
      assignedTo: 'الموظف'
    },
    {
      id: 2,
      name: 'مراجعة المدير المباشر',
      description: 'المدير المباشر يراجع ويوافق على الطلب',
      required: true,
      assignedTo: 'المدير المباشر'
    },
    {
      id: 3,
      name: 'مراجعة الموارد البشرية',
      description: 'قسم الموارد البشرية يراجع الطلب والمستندات',
      required: true,
      assignedTo: 'أخصائي الموارد البشرية'
    },
    {
      id: 4,
      name: 'الموافقة النهائية',
      description: 'أخصائي الخدمات الاجتماعية يعطي الموافقة النهائية',
      required: true,
      assignedTo: 'أخصائي الخدمات الاجتماعية'
    }
  ];

  const programSettings = [
    {
      category: 'المساعدات الطبية',
      maxAmount: 25000,
      requiresApproval: true,
      documentsRequired: ['تقرير طبي', 'فاتورة المستشفى'],
      eligibilityPeriod: '24 شهر',
      isActive: true
    },
    {
      category: 'دعم التعليم',
      maxAmount: 20000,
      requiresApproval: true,
      documentsRequired: ['كشف الدرجات', 'فاتورة الجامعة'],
      eligibilityPeriod: '12 شهر',
      isActive: true
    },
    {
      category: 'إعانة الزواج',
      maxAmount: 15000,
      requiresApproval: true,
      documentsRequired: ['عقد الزواج', 'بطاقة الهوية'],
      eligibilityPeriod: 'مرة واحدة',
      isActive: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">إعدادات النظام</h2>
          <p className="text-muted-foreground mt-1">
            إدارة وتكوين إعدادات نظام الخدمات الاجتماعية
          </p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            إعادة تحميل
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>الإعدادات العامة للنظام</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="systemName">اسم النظام</Label>
                  <Input id="systemName" defaultValue="نظام الخدمات الاجتماعية" />
                </div>
                <div>
                  <Label htmlFor="systemVersion">إصدار النظام</Label>
                  <Input id="systemVersion" defaultValue="v2.1.0" readOnly />
                </div>
              </div>

              <div>
                <Label htmlFor="systemDescription">وصف النظام</Label>
                <Textarea 
                  id="systemDescription" 
                  defaultValue="نظام متكامل لإدارة الخدمات الاجتماعية وبرامج الدعم للموظفين"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fiscalYear">السنة المالية</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">العملة الافتراضية</Label>
                  <Select defaultValue="SAR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (₪)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>تفعيل نظام الموافقات المتدرجة</Label>
                    <p className="text-sm text-muted-foreground">يتطلب موافقة متعددة المستويات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>تفعيل الإشعارات التلقائية</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعارات عند تغيير حالة الطلبات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>تسجيل العمليات (Audit Log)</Label>
                    <p className="text-sm text-muted-foreground">حفظ سجل بجميع العمليات المنفذة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Program Settings Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="space-y-4">
            {programSettings.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{program.category}</CardTitle>
                    <Switch defaultChecked={program.isActive} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>الحد الأقصى للمبلغ (₪)</Label>
                      <Input type="number" defaultValue={program.maxAmount} />
                    </div>
                    <div>
                      <Label>فترة الاستحقاق</Label>
                      <Input defaultValue={program.eligibilityPeriod} />
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse pt-6">
                      <Switch defaultChecked={program.requiresApproval} />
                      <Label>يتطلب موافقة</Label>
                    </div>
                  </div>
                  
                  <div>
                    <Label>المستندات المطلوبة</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {program.documentsRequired.map((doc, docIndex) => (
                        <Badge key={docIndex} variant="secondary">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>مراحل سير العمل</CardTitle>
              <p className="text-muted-foreground">تحديد المراحل المطلوبة لمعالجة الطلبات</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                        <Badge variant="outline">{step.assignedTo}</Badge>
                        {step.required && <Badge className="bg-red-100 text-red-800">مطلوب</Badge>}
                      </div>
                    </div>
                    <Switch defaultChecked={step.required} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <div className="space-y-4">
            {userRoles.map((role) => (
              <Card key={role.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <p className="text-muted-foreground">{role.description}</p>
                    </div>
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {role.users} مستخدم
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label className="text-sm font-medium">الصلاحيات:</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => {
                        const permissionNames = {
                          'submit_request': 'تقديم الطلبات',
                          'view_own_requests': 'عرض الطلبات الشخصية',
                          'review_team_requests': 'مراجعة طلبات الفريق',
                          'approve_manager_level': 'موافقة مستوى المدير',
                          'manage_all_requests': 'إدارة جميع الطلبات',
                          'generate_reports': 'إنشاء التقارير',
                          'final_approval': 'الموافقة النهائية',
                          'manage_programs': 'إدارة البرامج',
                          'financial_reports': 'التقارير المالية'
                        };
                        
                        return (
                          <Badge key={index} variant="outline">
                            {permissionNames[permission as keyof typeof permissionNames] || permission}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label>إشعار تقديم طلب جديد</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعار عند تقديم طلب جديد</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label>إشعار تغيير حالة الطلب</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعار عند موافقة أو رفض الطلب</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label>تذكير الطلبات المعلقة</Label>
                    <p className="text-sm text-muted-foreground">تذكير يومي بالطلبات التي تحتاج موافقة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <Label>تقارير دورية</Label>
                    <p className="text-sm text-muted-foreground">إرسال تقارير شهرية عن الأنشطة</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="emailTemplate">قالب البريد الإلكتروني</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">القالب الافتراضي</SelectItem>
                      <SelectItem value="formal">القالب الرسمي</SelectItem>
                      <SelectItem value="simple">القالب البسيط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notificationFreq">تكرار الإشعارات</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">فوري</SelectItem>
                      <SelectItem value="hourly">كل ساعة</SelectItem>
                      <SelectItem value="daily">يومي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">تنبيه مهم</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    تأكد من تكوين إعدادات الخادم البريدي (SMTP) بشكل صحيح لضمان وصول الإشعارات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};