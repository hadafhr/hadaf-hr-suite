import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings,
  Users,
  Shield,
  Eye,
  EyeOff,
  FileText,
  Database,
  Bell,
  Workflow,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';

const TeamSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    employeeIdFormat: 'EMP-YYYY-###',
    autoGenerateIds: true,
    requireApprovalForChanges: true,
    enableProfilePictures: true,
    enableDocumentStorage: true,
    maxDocumentSize: 5, // MB
    
    // Field Settings
    mandatoryFields: {
      personalInfo: ['fullName', 'nationalId', 'email', 'phone'],
      jobInfo: ['position', 'department', 'startDate'],
      financialInfo: ['basicSalary']
    },
    
    // Permission Settings
    permissions: {
      canViewAll: ['HR Manager', 'Admin'],
      canEditAll: ['HR Manager', 'Admin'],
      canDeleteEmployee: ['HR Manager', 'Admin'],
      canViewSalary: ['HR Manager', 'Admin', 'Payroll'],
      canEditSalary: ['HR Manager', 'Payroll'],
      canViewDocuments: ['HR Manager', 'Admin', 'Direct Manager'],
      canUploadDocuments: ['HR Manager', 'Admin']
    },
    
    // Notification Settings
    notifications: {
      newEmployeeAdded: true,
      employeeUpdated: true,
      documentUploaded: true,
      probationEnding: true,
      contractExpiring: true,
      birthdayReminder: true,
      anniversaryReminder: true
    },
    
    // Workflow Settings
    workflows: {
      employeeCreationApproval: true,
      salaryChangeApproval: true,
      documentVerification: true
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as any),
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "تم حفظ الإعدادات بنجاح",
      description: "تم تحديث إعدادات إدارة فريق العمل",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "تم استعادة الإعدادات الافتراضية",
      description: "تم إعادة تعيين جميع الإعدادات للقيم الافتراضية",
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>تنسيق رقم الموظف</Label>
              <Input
                value={settings.employeeIdFormat}
                onChange={(e) => handleSettingChange('general', 'employeeIdFormat', e.target.value)}
                placeholder="EMP-YYYY-###"
              />
              <p className="text-xs text-muted-foreground mt-1">
                استخدم YYYY للسنة، ### للرقم التسلسلي
              </p>
            </div>
            <div>
              <Label>الحد الأقصى لحجم المستند (MB)</Label>
              <Input
                type="number"
                value={settings.maxDocumentSize}
                onChange={(e) => handleSettingChange('general', 'maxDocumentSize', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>إنشاء أرقام الموظفين تلقائياً</Label>
                <p className="text-sm text-muted-foreground">سيتم إنشاء رقم موظف فريد تلقائياً</p>
              </div>
              <Switch
                checked={settings.autoGenerateIds}
                onCheckedChange={(checked) => handleSettingChange('general', 'autoGenerateIds', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>تفعيل الصور الشخصية</Label>
                <p className="text-sm text-muted-foreground">السماح برفع وعرض الصور الشخصية</p>
              </div>
              <Switch
                checked={settings.enableProfilePictures}
                onCheckedChange={(checked) => handleSettingChange('general', 'enableProfilePictures', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>تفعيل تخزين المستندات</Label>
                <p className="text-sm text-muted-foreground">السماح برفع وتخزين مستندات الموظفين</p>
              </div>
              <Switch
                checked={settings.enableDocumentStorage}
                onCheckedChange={(checked) => handleSettingChange('general', 'enableDocumentStorage', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>مطالبة الموافقة على التغييرات</Label>
                <p className="text-sm text-muted-foreground">مطالبة موافقة المدير على تعديل بيانات الموظفين</p>
              </div>
              <Switch
                checked={settings.requireApprovalForChanges}
                onCheckedChange={(checked) => handleSettingChange('general', 'requireApprovalForChanges', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFieldSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الحقول الإجبارية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">البيانات الشخصية</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { key: 'fullName', label: 'الاسم الكامل' },
                  { key: 'nationalId', label: 'رقم الهوية' },
                  { key: 'email', label: 'البريد الإلكتروني' },
                  { key: 'phone', label: 'رقم الهاتف' },
                  { key: 'address', label: 'العنوان' },
                  { key: 'birthDate', label: 'تاريخ الميلاد' }
                ].map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`personal-${field.key}`}
                      checked={settings.mandatoryFields.personalInfo.includes(field.key)}
                      onChange={(e) => {
                        const currentFields = settings.mandatoryFields.personalInfo;
                        const updatedFields = e.target.checked 
                          ? [...currentFields, field.key]
                          : currentFields.filter(f => f !== field.key);
                        handleSettingChange('mandatoryFields', 'personalInfo', updatedFields);
                      }}
                    />
                    <Label htmlFor={`personal-${field.key}`} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">معلومات الوظيفة</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { key: 'position', label: 'المسمى الوظيفي' },
                  { key: 'department', label: 'القسم' },
                  { key: 'level', label: 'المستوى الوظيفي' },
                  { key: 'manager', label: 'المدير المباشر' },
                  { key: 'startDate', label: 'تاريخ البدء' },
                  { key: 'contractType', label: 'نوع العقد' }
                ].map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`job-${field.key}`}
                      checked={settings.mandatoryFields.jobInfo.includes(field.key)}
                      onChange={(e) => {
                        const currentFields = settings.mandatoryFields.jobInfo;
                        const updatedFields = e.target.checked 
                          ? [...currentFields, field.key]
                          : currentFields.filter(f => f !== field.key);
                        handleSettingChange('mandatoryFields', 'jobInfo', updatedFields);
                      }}
                    />
                    <Label htmlFor={`job-${field.key}`} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">البيانات المالية</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { key: 'basicSalary', label: 'الراتب الأساسي' },
                  { key: 'housingAllowance', label: 'بدل السكن' },
                  { key: 'transportAllowance', label: 'بدل النقل' },
                  { key: 'bankName', label: 'اسم البنك' },
                  { key: 'accountNumber', label: 'رقم الحساب' },
                  { key: 'iban', label: 'رقم الآيبان' }
                ].map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`financial-${field.key}`}
                      checked={settings.mandatoryFields.financialInfo.includes(field.key)}
                      onChange={(e) => {
                        const currentFields = settings.mandatoryFields.financialInfo;
                        const updatedFields = e.target.checked 
                          ? [...currentFields, field.key]
                          : currentFields.filter(f => f !== field.key);
                        handleSettingChange('mandatoryFields', 'financialInfo', updatedFields);
                      }}
                    />
                    <Label htmlFor={`financial-${field.key}`} className="text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPermissionSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            إعدادات الصلاحيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(settings.permissions).map(([permission, roles]) => (
              <div key={permission} className="space-y-2">
                <Label className="text-sm font-medium">
                  {permission === 'canViewAll' && 'عرض جميع الموظفين'}
                  {permission === 'canEditAll' && 'تحرير جميع الموظفين'}
                  {permission === 'canDeleteEmployee' && 'حذف الموظفين'}
                  {permission === 'canViewSalary' && 'عرض معلومات الراتب'}
                  {permission === 'canEditSalary' && 'تحرير معلومات الراتب'}
                  {permission === 'canViewDocuments' && 'عرض المستندات'}
                  {permission === 'canUploadDocuments' && 'رفع المستندات'}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <Badge key={role} variant="secondary" className="flex items-center gap-1">
                      {role}
                      <button
                        onClick={() => {
                          const updatedRoles = roles.filter(r => r !== role);
                          handleSettingChange('permissions', permission, updatedRoles);
                        }}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 ml-1" />
                    إضافة دور
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            إعدادات الإشعارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([notification, enabled]) => (
              <div key={notification} className="flex items-center justify-between">
                <div>
                  <Label>
                    {notification === 'newEmployeeAdded' && 'إضافة موظف جديد'}
                    {notification === 'employeeUpdated' && 'تحديث بيانات موظف'}
                    {notification === 'documentUploaded' && 'رفع مستند جديد'}
                    {notification === 'probationEnding' && 'انتهاء فترة التجربة'}
                    {notification === 'contractExpiring' && 'انتهاء العقد'}
                    {notification === 'birthdayReminder' && 'تذكير أعياد الميلاد'}
                    {notification === 'anniversaryReminder' && 'تذكير ذكرى التوظيف'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {notification === 'newEmployeeAdded' && 'إشعار عند إضافة موظف جديد للنظام'}
                    {notification === 'employeeUpdated' && 'إشعار عند تحديث بيانات أي موظف'}
                    {notification === 'documentUploaded' && 'إشعار عند رفع مستندات جديدة'}
                    {notification === 'probationEnding' && 'تذكير قبل انتهاء فترة التجربة بـ 7 أيام'}
                    {notification === 'contractExpiring' && 'تذكير قبل انتهاء العقد بـ 30 يوم'}
                    {notification === 'birthdayReminder' && 'تذكير بأعياد ميلاد الموظفين'}
                    {notification === 'anniversaryReminder' && 'تذكير بذكرى توظيف الموظفين'}
                  </p>
                </div>
                <Switch
                  checked={enabled as boolean}
                  onCheckedChange={(checked) => handleSettingChange('notifications', notification, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWorkflowSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            إعدادات سير العمل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.workflows).map(([workflow, enabled]) => (
              <div key={workflow} className="flex items-center justify-between">
                <div>
                  <Label>
                    {workflow === 'employeeCreationApproval' && 'موافقة إنشاء موظف'}
                    {workflow === 'salaryChangeApproval' && 'موافقة تغيير الراتب'}
                    {workflow === 'documentVerification' && 'التحقق من المستندات'}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {workflow === 'employeeCreationApproval' && 'مطالبة موافقة المدير قبل إنشاء ملف موظف جديد'}
                    {workflow === 'salaryChangeApproval' && 'مطالبة موافقة الإدارة العليا لتغيير الرواتب'}
                    {workflow === 'documentVerification' && 'مطالبة التحقق من صحة المستندات المرفوعة'}
                  </p>
                </div>
                <Switch
                  checked={enabled as boolean}
                  onCheckedChange={(checked) => handleSettingChange('workflows', workflow, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إعدادات فريق العمل</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="h-4 w-4 ml-2" />
            استعادة الافتراضي
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 ml-2" />
            حفظ الإعدادات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            الحقول
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الصلاحيات
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            سير العمل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          {renderGeneralSettings()}
        </TabsContent>

        <TabsContent value="fields">
          {renderFieldSettings()}
        </TabsContent>

        <TabsContent value="permissions">
          {renderPermissionSettings()}
        </TabsContent>

        <TabsContent value="notifications">
          {renderNotificationSettings()}
        </TabsContent>

        <TabsContent value="workflows">
          {renderWorkflowSettings()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSettings;