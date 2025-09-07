import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Settings,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Key,
  Mail,
  Phone,
  Calendar,
  Activity,
  Eye,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [activeUserTab, setActiveUserTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'أحمد محمد السعد',
      email: 'ahmed.saad@company.com',
      phone: '+966 50 123 4567',
      role: 'hr_admin',
      department: 'الموارد البشرية',
      status: 'active',
      lastLogin: '2024-01-15T14:30:00',
      createdAt: '2023-06-15',
      permissions: ['manage_employees', 'view_reports', 'manage_payroll']
    },
    {
      id: 2,
      name: 'سارة أحمد الحربي',
      email: 'sara.harbi@company.com',
      phone: '+966 55 987 6543',
      role: 'manager',
      department: 'المبيعات',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00',
      createdAt: '2023-08-22',
      permissions: ['view_team', 'approve_leaves', 'view_reports']
    },
    {
      id: 3,
      name: 'محمد علي القحطاني',
      email: 'mohammed.ali@company.com',
      phone: '+966 56 456 7890',
      role: 'employee',
      department: 'التقنية',
      status: 'inactive',
      lastLogin: '2024-01-10T16:45:00',
      createdAt: '2023-09-10',
      permissions: ['view_profile', 'request_leave']
    },
    {
      id: 4,
      name: 'فاطمة عبدالله المطيري',
      email: 'fatima.mutairi@company.com',
      phone: '+966 54 321 0987',
      role: 'hr_admin',
      department: 'الموارد البشرية',
      status: 'active',
      lastLogin: '2024-01-15T11:20:00',
      createdAt: '2023-07-03',
      permissions: ['manage_employees', 'view_reports', 'manage_attendance']
    }
  ];

  const roles = [
    { value: 'super_admin', label: 'مدير النظام', color: 'bg-red-100 text-red-800' },
    { value: 'hr_admin', label: 'مدير الموارد البشرية', color: 'bg-blue-100 text-blue-800' },
    { value: 'manager', label: 'مدير قسم', color: 'bg-green-100 text-green-800' },
    { value: 'employee', label: 'موظف', color: 'bg-gray-100 text-gray-800' }
  ];

  const permissions = [
    { id: 'manage_employees', label: 'إدارة الموظفين', category: 'hr' },
    { id: 'view_reports', label: 'عرض التقارير', category: 'reports' },
    { id: 'manage_payroll', label: 'إدارة الرواتب', category: 'finance' },
    { id: 'approve_leaves', label: 'الموافقة على الإجازات', category: 'hr' },
    { id: 'manage_attendance', label: 'إدارة الحضور والانصراف', category: 'hr' },
    { id: 'view_team', label: 'عرض فريق العمل', category: 'team' },
    { id: 'view_profile', label: 'عرض الملف الشخصي', category: 'basic' },
    { id: 'request_leave', label: 'طلب إجازة', category: 'basic' }
  ];

  const departments = [
    'الموارد البشرية',
    'التقنية',  
    'المبيعات',
    'التسويق',
    'المالية',
    'العمليات'
  ];

  const getRoleBadge = (roleValue: string) => {
    const role = roles.find(r => r.value === roleValue);
    return role ? (
      <Badge className={role.color}>
        {role.label}
      </Badge>
    ) : null;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">
        <UserCheck className="w-3 h-3 mr-1" />
        نشط
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">
        <UserX className="w-3 h-3 mr-1" />
        غير نشط
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <Tabs value={activeUserTab} onValueChange={setActiveUserTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
          <TabsTrigger value="activity">سجل النشاطات</TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  إدارة المستخدمين ({users.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث عن مستخدم..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية حسب الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأدوار</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مستخدم
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span>{user.phone}</span>
                              </div>
                              <span>القسم: {user.department}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {getRoleBadge(user.role)}
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm text-gray-600">
                            <p>آخر دخول: {formatDate(user.lastLogin)}</p>
                            <p>انضم في: {formatDate(user.createdAt)}</p>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              تعديل
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 mr-2" />
                              حذف
                            </Button>
                          </div>
                          
                          <Switch
                            checked={user.status === 'active'}
                            className="ml-2"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">الصلاحيات المُعيَّنة:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.permissions.slice(0, 3).map((permission) => {
                                const perm = permissions.find(p => p.id === permission);
                                return perm ? (
                                  <Badge key={permission} variant="outline" className="text-xs">
                                    {perm.label}
                                  </Badge>
                                ) : null;
                              })}
                              {user.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{user.permissions.length - 3} أخرى
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Shield className="w-4 h-4 mr-2" />
                            إدارة الصلاحيات
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  الأدوار المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-sm text-gray-600">
                            {users.filter(u => u.role === role.value).length} مستخدم
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        تحرير
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  الصلاحيات المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    permissions.reduce((acc, permission) => {
                      if (!acc[permission.category]) {
                        acc[permission.category] = [];
                      }
                      acc[permission.category].push(permission);
                      return acc;
                    }, {} as Record<string, typeof permissions>)
                  ).map(([category, perms]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700 capitalize">
                        {category === 'hr' ? 'الموارد البشرية' :
                         category === 'reports' ? 'التقارير' :
                         category === 'finance' ? 'المالية' :
                         category === 'team' ? 'الفريق' :
                         category === 'basic' ? 'أساسية' : category}
                      </h4>
                      <div className="grid grid-cols-1 gap-1">
                        {perms.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between text-sm">
                            <span>{permission.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                سجل نشاطات المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: 'أحمد محمد السعد',
                    action: 'تسجيل دخول',
                    time: '2024-01-15T14:30:00',
                    ip: '192.168.1.100',
                    device: 'Chrome on Windows'
                  },
                  {
                    user: 'سارة أحمد الحربي',
                    action: 'عرض تقرير الحضور',
                    time: '2024-01-15T13:45:00',
                    ip: '192.168.1.101',
                    device: 'Safari on macOS'
                  },
                  {
                    user: 'فاطمة عبدالله المطيري',
                    action: 'إضافة موظف جديد',
                    time: '2024-01-15T11:20:00',
                    ip: '192.168.1.102',
                    device: 'Firefox on Windows'
                  },
                  {
                    user: 'محمد علي القحطاني',
                    action: 'تحديث الملف الشخصي',
                    time: '2024-01-15T10:15:00',
                    ip: '192.168.1.103',
                    device: 'Chrome on Android'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400">
                          {formatDate(activity.time)} - {activity.device}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>IP: {activity.ip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};