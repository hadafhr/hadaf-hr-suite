import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Shield, 
  Key, 
  Eye,
  UserCheck,
  UserMinus,
  Settings
} from 'lucide-react';

export const UserManagementPermissions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'أحمد محمد الأحمد',
      email: 'ahmed@boud-hr.com',
      role: 'super_admin',
      branches: ['الرئيسي', 'جدة'],
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      twoFactorEnabled: true,
      permissions: ['all']
    },
    {
      id: '2',
      name: 'فاطمة علي السالم',
      email: 'fatima@boud-hr.com',
      role: 'branch_admin',
      branches: ['جدة'],
      status: 'active',
      lastLogin: '2024-01-14 16:45',
      twoFactorEnabled: false,
      permissions: ['view', 'edit', 'reports']
    },
    {
      id: '3',
      name: 'محمد عبدالله العتيبي',
      email: 'mohammed@boud-hr.com',
      role: 'hr_manager',
      branches: ['الدمام'],
      status: 'inactive',
      lastLogin: '2024-01-10 14:20',
      twoFactorEnabled: true,
      permissions: ['view', 'edit']
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 'super_admin',
      name: isRTL ? 'مدير عام' : 'Super Admin',
      description: isRTL ? 'صلاحيات كاملة على جميع الفروع' : 'Full access to all branches',
      permissions: ['all'],
      userCount: 1,
      isSystem: true
    },
    {
      id: 'branch_admin',
      name: isRTL ? 'مدير فرع' : 'Branch Admin',
      description: isRTL ? 'إدارة فرع محدد فقط' : 'Manage specific branch only',
      permissions: ['view', 'edit', 'reports', 'approve'],
      userCount: 5,
      isSystem: true
    },
    {
      id: 'hr_manager',
      name: isRTL ? 'مدير موارد بشرية' : 'HR Manager',
      description: isRTL ? 'إدارة الموارد البشرية' : 'Human Resources Management',
      permissions: ['view', 'edit', 'reports'],
      userCount: 3,
      isSystem: false
    },
    {
      id: 'payroll_officer',
      name: isRTL ? 'موظف رواتب' : 'Payroll Officer',
      description: isRTL ? 'إدارة الرواتب والمزايا' : 'Payroll and Benefits Management',
      permissions: ['view', 'edit'],
      userCount: 2,
      isSystem: false
    }
  ]);

  const [delegatedAdmins, setDelegatedAdmins] = useState([
    {
      id: '1',
      userId: '2',
      branchId: 'jeddah',
      branchName: 'فرع جدة',
      permissions: ['manage_users', 'view_reports', 'approve_requests'],
      assignedDate: '2024-01-01',
      status: 'active'
    },
    {
      id: '2', 
      userId: '3',
      branchId: 'dammam',
      branchName: 'فرع الدمام',
      permissions: ['view_reports', 'manage_attendance'],
      assignedDate: '2024-01-05',
      status: 'active'
    }
  ]);

  const handleAddUser = () => {
    console.log('Adding new user');
  };

  const handleEditUser = (userId: string) => {
    console.log('Editing user:', userId);
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Deleting user:', userId);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleToggle2FA = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, twoFactorEnabled: !user.twoFactorEnabled }
        : user
    ));
  };

  const handleAddRole = () => {
    console.log('Adding new role');
  };

  const handleEditRole = (roleId: string) => {
    console.log('Editing role:', roleId);
  };

  const handleDeleteRole = (roleId: string) => {
    console.log('Deleting role:', roleId);
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {isRTL ? (status === 'active' ? 'نشط' : 'غير نشط') : status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Users Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? 'إدارة المستخدمين' : 'User Management'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة حسابات المستخدمين والصلاحيات' : 'Manage user accounts and permissions'}
                </CardDescription>
              </div>
            </div>
            <Button onClick={handleAddUser} className="gap-2">
              <Plus className="w-4 h-4" />
              {isRTL ? 'إضافة مستخدم' : 'Add User'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.name}</span>
                      {getStatusBadge(user.status)}
                    </div>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{isRTL ? 'الدور:' : 'Role:'} {getRoleName(user.role)}</span>
                      <span>{isRTL ? 'الفروع:' : 'Branches:'} {user.branches.join(', ')}</span>
                      <span>{isRTL ? 'آخر دخول:' : 'Last Login:'} {user.lastLogin}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={user.twoFactorEnabled}
                      onCheckedChange={() => handleToggle2FA(user.id)}
                    />
                    <Key className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleUserStatus(user.id)}
                    className="gap-1"
                  >
                    {user.status === 'active' ? <UserMinus className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? 'إدارة الأدوار' : 'Role Management'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'تحديد الأدوار والصلاحيات' : 'Define roles and permissions'}
                </CardDescription>
              </div>
            </div>
            <Button onClick={handleAddRole} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              {isRTL ? 'إضافة دور' : 'Add Role'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-medium">{role.name}</span>
                    {role.isSystem && (
                      <Badge variant="secondary" className="text-xs">
                        {isRTL ? 'نظام' : 'System'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRole(role.id)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    {!role.isSystem && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission === 'all' ? (isRTL ? 'جميع الصلاحيات' : 'All Permissions') : permission}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {role.userCount} {isRTL ? 'مستخدم' : 'users'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delegated Admins */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-lg">
                {isRTL ? 'المدراء المفوضون' : 'Delegated Admins'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'مدراء الفروع بصلاحيات محلية' : 'Branch managers with local permissions'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {delegatedAdmins.map((admin) => {
              const user = users.find(u => u.id === admin.userId);
              return (
                <div key={admin.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user?.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {isRTL ? `فرع: ${admin.branchName}` : `Branch: ${admin.branchName}`}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        {admin.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                      {isRTL ? (admin.status === 'active' ? 'نشط' : 'غير نشط') : admin.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Global Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'إعدادات الأمان العامة' : 'Global Security Settings'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'تفعيل المصادقة الثنائية إجبارياً' : 'Force Two-Factor Authentication'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'يتطلب من جميع المستخدمين تفعيل 2FA' : 'Requires all users to enable 2FA'}
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'تسجيل الدخول الموحد (SSO)' : 'Single Sign-On (SSO)'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'تمكين تسجيل الدخول عبر Azure AD / Google' : 'Enable login via Azure AD / Google'}
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{isRTL ? 'انتهاء صلاحية الجلسة' : 'Session Timeout'}</span>
              <p className="text-sm text-muted-foreground">
                {isRTL ? 'المدة بالدقائق قبل انتهاء الجلسة' : 'Minutes before session expires'}
              </p>
            </div>
            <Select defaultValue="60">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="120">120</SelectItem>
                <SelectItem value="240">240</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};