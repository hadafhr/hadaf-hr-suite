import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, Shield, Database, Users, 
  Building2, Target, Lock, Key, 
  Save, RotateCcw, AlertTriangle,
  Check, X, Eye, EyeOff, Edit
} from 'lucide-react';

const DepartmentsSettings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeSection, setActiveSection] = useState('permissions');
  const [settings, setSettings] = useState({
    autoApproval: true,
    requireManagerApproval: true,
    allowCrossDepartmentAccess: false,
    enableAuditLog: true,
    mandatoryFields: {
      departmentName: true,
      manager: true,
      budget: false,
      description: true,
      location: false
    },
    permissions: {
      canCreateDepartments: false,
      canEditDepartments: false,
      canDeleteDepartments: false,
      canViewAllDepartments: true,
      canManageUnits: false,
      canExportReports: true
    }
  });

  const settingSections = [
    {
      id: 'permissions',
      title: isRTL ? 'الصلاحيات والأذونات' : 'Permissions & Access',
      icon: Shield,
      description: isRTL ? 'إدارة صلاحيات المستخدمين للنظام' : 'Manage user permissions for the system'
    },
    {
      id: 'fields',
      title: isRTL ? 'الحقول الإلزامية' : 'Required Fields',
      icon: Database,
      description: isRTL ? 'تحديد الحقول المطلوبة عند إنشاء الإدارات' : 'Define required fields when creating departments'
    },
    {
      id: 'workflow',
      title: isRTL ? 'سير العمل والموافقات' : 'Workflow & Approvals',
      icon: Target,
      description: isRTL ? 'ضبط آلية الموافقات وسير العمل' : 'Configure approval workflows and processes'
    },
    {
      id: 'security',
      title: isRTL ? 'الأمان والمراقبة' : 'Security & Monitoring',
      icon: Lock,
      description: isRTL ? 'إعدادات الأمان وتسجيل العمليات' : 'Security settings and operation logging'
    }
  ];

  const userRoles = [
    {
      id: 'admin',
      name: isRTL ? 'مدير النظام' : 'System Admin',
      description: isRTL ? 'صلاحية كاملة لجميع العمليات' : 'Full access to all operations',
      users: 2,
      color: 'from-primary to-primary-glow'
    },
    {
      id: 'hr_manager',
      name: isRTL ? 'مدير الموارد البشرية' : 'HR Manager',
      description: isRTL ? 'إدارة الإدارات والموظفين' : 'Manage departments and employees',
      users: 3,
      color: 'from-primary/80 to-primary-glow/80'
    },
    {
      id: 'dept_manager',
      name: isRTL ? 'مدير الإدارة' : 'Department Manager',
      description: isRTL ? 'إدارة الإدارة الخاصة فقط' : 'Manage own department only',
      users: 12,
      color: 'from-muted-foreground/60 to-muted-foreground/40'
    },
    {
      id: 'employee',
      name: isRTL ? 'موظف' : 'Employee',
      description: isRTL ? 'عرض المعلومات فقط' : 'View information only',
      users: 156,
      color: 'from-muted/60 to-muted/40'
    }
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('حفظ الإعدادات:', settings);
  };

  const handleResetSettings = () => {
    console.log('إعادة تعيين الإعدادات');
  };

  const renderPermissionsSection = () => (
    <div className="space-y-6">
      {/* الأدوار والصلاحيات */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            {isRTL ? 'الأدوار والمستخدمين' : 'Roles & Users'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRoles.map((role, index) => (
              <Card key={role.id} className="group hover:shadow-soft transition-all duration-300 border border-border/20 bg-card/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center`}>
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{role.name}</h4>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                      {role.users} {isRTL ? 'مستخدم' : 'users'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10">
                      <Edit className="h-3 w-3 ml-1" />
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-foreground hover:bg-muted/20">
                      <Eye className="h-3 w-3 ml-1" />
                      {isRTL ? 'عرض' : 'View'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* صلاحيات النظام */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <Key className="h-5 w-5 text-white" />
            </div>
            {isRTL ? 'صلاحيات النظام' : 'System Permissions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.permissions).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
              <div>
                <p className="font-medium text-foreground">
                  {key === 'canCreateDepartments' ? (isRTL ? 'إنشاء الإدارات' : 'Create Departments') :
                   key === 'canEditDepartments' ? (isRTL ? 'تعديل الإدارات' : 'Edit Departments') :
                   key === 'canDeleteDepartments' ? (isRTL ? 'حذف الإدارات' : 'Delete Departments') :
                   key === 'canViewAllDepartments' ? (isRTL ? 'عرض جميع الإدارات' : 'View All Departments') :
                   key === 'canManageUnits' ? (isRTL ? 'إدارة الوحدات' : 'Manage Units') :
                   key === 'canExportReports' ? (isRTL ? 'تصدير التقارير' : 'Export Reports') : key}
                </p>
                <p className="text-sm text-muted-foreground">
                  {key === 'canCreateDepartments' ? (isRTL ? 'السماح بإنشاء إدارات جديدة' : 'Allow creating new departments') :
                   key === 'canEditDepartments' ? (isRTL ? 'السماح بتعديل بيانات الإدارات' : 'Allow editing department data') :
                   key === 'canDeleteDepartments' ? (isRTL ? 'السماح بحذف الإدارات' : 'Allow deleting departments') :
                   key === 'canViewAllDepartments' ? (isRTL ? 'عرض جميع الإدارات في النظام' : 'View all departments in system') :
                   key === 'canManageUnits' ? (isRTL ? 'إدارة الوحدات الفرعية' : 'Manage sub-units') :
                   key === 'canExportReports' ? (isRTL ? 'تصدير التقارير والبيانات' : 'Export reports and data') : ''}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => handleSettingChange('permissions', key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderFieldsSection = () => (
    <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
            <Database className="h-5 w-5 text-white" />
          </div>
          {isRTL ? 'الحقول الإلزامية' : 'Required Fields Configuration'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(settings.mandatoryFields).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${value ? 'bg-primary/20' : 'bg-muted/20'}`}>
                {value ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {key === 'departmentName' ? (isRTL ? 'اسم الإدارة' : 'Department Name') :
                   key === 'manager' ? (isRTL ? 'مدير الإدارة' : 'Department Manager') :
                   key === 'budget' ? (isRTL ? 'الميزانية' : 'Budget') :
                   key === 'description' ? (isRTL ? 'الوصف' : 'Description') :
                   key === 'location' ? (isRTL ? 'الموقع' : 'Location') : key}
                </p>
                <p className="text-sm text-muted-foreground">
                  {value ? (isRTL ? 'حقل إلزامي' : 'Required field') : (isRTL ? 'حقل اختياري' : 'Optional field')}
                </p>
              </div>
            </div>
            <Switch
              checked={value}
              onCheckedChange={(checked) => handleSettingChange('mandatoryFields', key, checked)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderWorkflowSection = () => (
    <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          {isRTL ? 'إعدادات سير العمل' : 'Workflow Settings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
          <div>
            <p className="font-medium text-foreground">{isRTL ? 'الموافقة التلقائية' : 'Auto Approval'}</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'موافقة تلقائية على إنشاء الإدارات الجديدة' : 'Automatically approve new department creation'}</p>
          </div>
          <Switch
            checked={settings.autoApproval}
            onCheckedChange={(checked) => handleSettingChange('', 'autoApproval', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
          <div>
            <p className="font-medium text-foreground">{isRTL ? 'موافقة المدير مطلوبة' : 'Manager Approval Required'}</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تتطلب موافقة المدير على التغييرات الهامة' : 'Require manager approval for important changes'}</p>
          </div>
          <Switch
            checked={settings.requireManagerApproval}
            onCheckedChange={(checked) => handleSettingChange('', 'requireManagerApproval', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
          <div>
            <p className="font-medium text-foreground">{isRTL ? 'الوصول عبر الإدارات' : 'Cross-Department Access'}</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'السماح بالوصول لبيانات الإدارات الأخرى' : 'Allow access to other departments data'}</p>
          </div>
          <Switch
            checked={settings.allowCrossDepartmentAccess}
            onCheckedChange={(checked) => handleSettingChange('', 'allowCrossDepartmentAccess', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderSecuritySection = () => (
    <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
            <Lock className="h-5 w-5 text-white" />
          </div>
          {isRTL ? 'إعدادات الأمان' : 'Security Settings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors duration-300">
          <div>
            <p className="font-medium text-foreground">{isRTL ? 'سجل المراجعة' : 'Audit Log'}</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تسجيل جميع العمليات والتغييرات' : 'Log all operations and changes'}</p>
          </div>
          <Switch
            checked={settings.enableAuditLog}
            onCheckedChange={(checked) => handleSettingChange('', 'enableAuditLog', checked)}
          />
        </div>

        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-primary">{isRTL ? 'تنبيه أمني' : 'Security Notice'}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {isRTL ? 'يتم تسجيل جميع العمليات الحساسة ومراقبتها لضمان أمان النظام' : 'All sensitive operations are logged and monitored to ensure system security'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'permissions':
        return renderPermissionsSection();
      case 'fields':
        return renderFieldsSection();
      case 'workflow':
        return renderWorkflowSection();
      case 'security':
        return renderSecuritySection();
      default:
        return renderPermissionsSection();
    }
  };

  return (
    <div className="space-y-8">
      {/* التنقل بين الأقسام */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {settingSections.map((section, index) => (
          <Card 
            key={section.id}
            className={`group cursor-pointer hover:shadow-glow transition-all duration-500 border border-border/20 bg-white/95 backdrop-blur-sm overflow-hidden relative ${
              activeSection === section.id ? 'ring-2 ring-primary/50 shadow-glow' : ''
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {/* خلفية متحركة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${activeSection === section.id ? 'from-primary to-primary-glow' : 'from-muted/30 to-muted/10'} rounded-xl flex items-center justify-center transition-all duration-300`}>
                  <section.icon className={`h-5 w-5 ${activeSection === section.id ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                {activeSection === section.id && (
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    {isRTL ? 'نشط' : 'Active'}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* المحتوى */}
      {renderContent()}

      {/* أزرار الحفظ */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{isRTL ? 'تذكير' : 'Reminder'}</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'لا تنسى حفظ التغييرات قبل مغادرة الصفحة' : 'Don\'t forget to save changes before leaving the page'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-border/30 hover:border-primary/50"
                onClick={handleResetSettings}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                {isRTL ? 'إعادة تعيين' : 'Reset'}
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
                onClick={handleSaveSettings}
              >
                <Save className="h-4 w-4 ml-2" />
                {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentsSettings;