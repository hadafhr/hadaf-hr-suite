import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Shield, Users, FileText, Bell, Save, 
  RefreshCw, Key, UserCheck, Edit, Trash2
} from 'lucide-react';

const TeamSettings = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [permissions, setPermissions] = useState({
    addEmployee: true,
    editEmployee: true,
    deleteEmployee: false,
    viewSalaries: false,
    exportReports: true,
    manageDocuments: true,
    viewAnalytics: true,
    systemSettings: false
  });

  const userRoles = [
    {
      id: 'hr_admin',
      name: isRTL ? 'مدير الموارد البشرية' : 'HR Administrator',
      description: isRTL ? 'صلاحية كاملة لإدارة النظام والموظفين' : 'Full system and employee management access',
      userCount: 2,
      status: 'active'
    },
    {
      id: 'hr_specialist',
      name: isRTL ? 'أخصائي موارد بشرية' : 'HR Specialist',
      description: isRTL ? 'إدارة الموظفين والوثائق بدون الإعدادات' : 'Employee and document management without settings',
      userCount: 5,
      status: 'active'
    }
  ];

  const handlePermissionChange = (permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
        {status === 'active' ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'غير نشط' : 'Inactive')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRTL ? 'إعدادات النظام' : 'System Settings'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isRTL ? 'إدارة الصلاحيات والحقول المطلوبة والتحكم في النظام' : 'Manage permissions, required fields, and system controls'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {isRTL ? 'إعادة تعيين' : 'Reset'}
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Permissions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {isRTL ? 'صلاحيات النظام' : 'System Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(permissions).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <Label className="font-medium">
                    {key === 'addEmployee' && (isRTL ? 'إضافة موظف جديد' : 'Add New Employee')}
                    {key === 'editEmployee' && (isRTL ? 'تعديل بيانات الموظف' : 'Edit Employee Data')}
                    {key === 'deleteEmployee' && (isRTL ? 'حذف الموظف' : 'Delete Employee')}
                    {key === 'viewSalaries' && (isRTL ? 'عرض الرواتب' : 'View Salaries')}
                    {key === 'exportReports' && (isRTL ? 'تصدير التقارير' : 'Export Reports')}
                    {key === 'manageDocuments' && (isRTL ? 'إدارة الوثائق' : 'Manage Documents')}
                    {key === 'viewAnalytics' && (isRTL ? 'عرض التحليلات' : 'View Analytics')}
                    {key === 'systemSettings' && (isRTL ? 'إعدادات النظام' : 'System Settings')}
                  </Label>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Roles */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              {isRTL ? 'أدوار المستخدمين' : 'User Roles'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRoles.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{role.name}</h4>
                      {getStatusBadge(role.status)}
                      <Badge variant="outline" className="text-xs">
                        {role.userCount} {isRTL ? 'مستخدم' : 'users'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamSettings;