import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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
  RefreshCw,
  Building2,
  Crown,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Employee {
  id: string;
  user_id: string;
  company_id: string;
  department_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employee_id: string;
  is_active: boolean;
  created_at: string;
  role?: string;
  department_name?: string;
  position_title?: string;
  permissions_count?: number;
  user_permissions?: any[];
  boud_departments?: { department_name: string };
  boud_job_positions?: { position_title: string };
}

export const UserManagement: React.FC = () => {
  const [activeUserTab, setActiveUserTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [userPermissions, setUserPermissions] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);

  // Available roles with Arabic labels
  const roles = [
    { value: 'super_admin', label: 'مدير النظام العام', color: 'bg-red-100 text-red-800', description: 'صلاحيات كاملة على النظام' },
    { value: 'hr_manager', label: 'مدير الموارد البشرية', color: 'bg-blue-100 text-blue-800', description: 'إدارة الموظفين والموارد البشرية' },
    { value: 'hr_admin', label: 'مشرف الموارد البشرية', color: 'bg-cyan-100 text-cyan-800', description: 'مساعد في إدارة الموارد البشرية' },
    { value: 'department_manager', label: 'مدير قسم', color: 'bg-green-100 text-green-800', description: 'إدارة قسم محدد' },
    { value: 'team_leader', label: 'قائد فريق', color: 'bg-yellow-100 text-yellow-800', description: 'قيادة فريق عمل' },
    { value: 'senior_employee', label: 'موظف أول', color: 'bg-purple-100 text-purple-800', description: 'موظف بخبرة عالية' },
    { value: 'employee', label: 'موظف', color: 'bg-gray-100 text-gray-800', description: 'موظف عادي' },
    { value: 'trainee', label: 'متدرب', color: 'bg-orange-100 text-orange-800', description: 'موظف تحت التدريب' }
  ];

  // Fetch employees and related data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch employees with their department and position info
      const { data: employeesData, error: employeesError } = await supabase
        .from('boud_employees')
        .select(`
          *,
          boud_departments!inner(id, department_name),
          boud_job_positions(id, position_title)
        `)
        .eq('is_active', true);

      if (employeesError) throw employeesError;

      // Fetch departments
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('boud_departments')
        .select('*')
        .eq('is_active', true);

      if (departmentsError) throw departmentsError;

      // Fetch available permissions
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('department_permissions')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('permission_name_ar', { ascending: true });

      if (permissionsError) throw permissionsError;

      // Fetch user roles
      const { data: userRolesData, error: userRolesError } = await supabase
        .from('user_company_roles')
        .select('*')
        .eq('is_active', true);

      if (userRolesError) throw userRolesError;

      // Fetch user department permissions
      const { data: userPermissionsData, error: userPermissionsError } = await supabase
        .from('user_department_permissions')
        .select(`
          *,
          boud_departments(department_name),
          department_permissions(permission_name_ar, category)
        `)
        .eq('is_active', true);

      if (userPermissionsError) throw userPermissionsError;

      // Merge role data with employees
      const employeesWithRoles = employeesData?.map(emp => {
        const userRole = userRolesData?.find(role => role.user_id === emp.user_id);
        const empPermissions = userPermissionsData?.filter(perm => perm.user_id === emp.user_id);
        
        return {
          ...emp,
          role: userRole?.role || 'employee',
          department_name: emp.boud_departments?.department_name || 'غير محدد',
          position_title: emp.boud_job_positions?.position_title || 'غير محدد',
          permissions_count: empPermissions?.length || 0,
          user_permissions: empPermissions || []
        };
      }) || [];

      setEmployees(employeesWithRoles);
      setDepartments(departmentsData || []);
      setPermissions(permissionsData || []);
      setUserPermissions(userPermissionsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleGrantPermission = async (userId: string, companyId: string, departmentId: string | null, permissionCode: string) => {
    try {
      const { error } = await supabase.rpc('grant_department_permission', {
        _user_id: userId,
        _company_id: companyId,
        _department_id: departmentId,
        _permission_code: permissionCode
      });

      if (error) throw error;

      toast.success('تم منح الصلاحية بنجاح');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error granting permission:', error);
      toast.error('حدث خطأ في منح الصلاحية');
    }
  };

  const handleRevokePermission = async (userId: string, companyId: string, departmentId: string | null, permissionCode: string) => {
    try {
      const { error } = await supabase.rpc('revoke_department_permission', {
        _user_id: userId,
        _company_id: companyId,
        _department_id: departmentId,
        _permission_code: permissionCode
      });

      if (error) throw error;

      toast.success('تم سحب الصلاحية بنجاح');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error revoking permission:', error);
      toast.error('حدث خطأ في سحب الصلاحية');
    }
  };

  const handleUpdateUserRole = async (userId: string, companyId: string, newRole: string, departmentId: string | null = null) => {
    try {
      // First, deactivate existing roles
      const { error: updateError } = await supabase
        .from('user_company_roles')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('company_id', companyId);

      if (updateError) throw updateError;

      // Insert new role with proper type assertion
      const { error: insertError } = await supabase
        .from('user_company_roles')
        .insert({
          user_id: userId,
          company_id: companyId,
          role: newRole as any, // Type assertion for enum
          department_id: departmentId,
          is_active: true
        });

      if (insertError) throw insertError;

      toast.success('تم تحديث دور المستخدم بنجاح');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('حدث خطأ في تحديث دور المستخدم');
    }
  };

  const toggleEmployeeStatus = async (employeeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('boud_employees')
        .update({ is_active: !currentStatus })
        .eq('id', employeeId);

      if (error) throw error;

      toast.success(`تم ${!currentStatus ? 'تفعيل' : 'إلغاء تفعيل'} الموظف بنجاح`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error toggling employee status:', error);
      toast.error('حدث خطأ في تحديث حالة الموظف');
    }
  };

  const getRoleBadge = (roleValue: string) => {
    const role = roles.find(r => r.value === roleValue);
    return role ? (
      <Badge className={role.color}>
        <Crown className="w-3 h-3 mr-1" />
        {role.label}
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">
        غير محدد
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
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

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const openPermissionDialog = (employee: any) => {
    setSelectedUser(employee);
    setPermissionDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="mr-2 text-lg">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeUserTab} onValueChange={setActiveUserTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
          <TabsTrigger value="permissions">صلاحيات الأقسام</TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  إدارة المستخدمين ({filteredEmployees.length} من {employees.length})
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
                  <Button onClick={fetchData}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    تحديث
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {employee.first_name?.charAt(0) || 'م'}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg">
                              {employee.first_name} {employee.last_name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                <span>{employee.email}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                <span>{employee.phone || 'غير محدد'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>القسم: {employee.department_name}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {getRoleBadge(employee.role)}
                              {getStatusBadge(employee.is_active)}
                              <Badge variant="outline" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                {employee.permissions_count} صلاحية
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm text-gray-600">
                            <p>رقم الموظف: {employee.employee_id}</p>
                            <p>انضم في: {formatDate(employee.created_at)}</p>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openPermissionDialog(employee)}
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              إدارة الصلاحيات
                            </Button>
                            <Select 
                              value={employee.role} 
                              onValueChange={(newRole) => handleUpdateUserRole(employee.user_id, employee.company_id, newRole, employee.department_id)}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Switch
                            checked={employee.is_active}
                            onCheckedChange={() => toggleEmployeeStatus(employee.id, employee.is_active)}
                            className="ml-2"
                          />
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
                  <Crown className="w-5 h-5 text-primary" />
                  الأدوار المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => {
                    const employeeCount = employees.filter(emp => emp.role === role.value).length;
                    return (
                      <div key={role.value} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <div>
                            <p className="font-medium">{role.label}</p>
                            <p className="text-sm text-gray-600">{role.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {employeeCount} مستخدم
                            </p>
                          </div>
                        </div>
                        <Badge className={role.color}>
                          {employeeCount}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  إحصائيات الصلاحيات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    (permissions as any[]).reduce((acc: Record<string, any[]>, permission: any) => {
                      if (!acc[permission.category]) {
                        acc[permission.category] = [];
                      }
                      acc[permission.category].push(permission);
                      return acc;
                    }, {})
                  ).map(([category, perms]) => {
                    const categoryName = {
                      'hr': 'الموارد البشرية',
                      'finance': 'المالية',
                      'reports': 'التقارير',
                      'management': 'الإدارة',
                      'analytics': 'التحليلات',
                      'performance': 'الأداء',
                      'development': 'التطوير',
                      'system': 'النظام'
                    }[category] || category;

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-gray-700">
                            {categoryName}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {Array.isArray(perms) ? perms.length : 0} صلاحية
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          {Array.isArray(perms) && perms.slice(0, 3).map((permission: any) => (
                            <div key={permission.id}>{permission.permission_name_ar}</div>
                          ))}
                          {Array.isArray(perms) && perms.length > 3 && (
                            <div>و {String(Array.isArray(perms) ? perms.length - 3 : 0)} صلاحيات أخرى...</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Department Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                صلاحيات الأقسام ({departments.length} قسم)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((department) => {
                  const deptPermissions = userPermissions.filter(up => up.department_id === department.id);
                  const uniqueUsers = [...new Set(deptPermissions.map(up => up.user_id))].length;
                  
                  return (
                    <Card key={department.id} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{department.department_name}</h3>
                          <Badge variant="outline">
                            {uniqueUsers} مستخدم
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>رمز القسم: {department.department_code}</p>
                          <p>إجمالي الصلاحيات: {deptPermissions.length}</p>
                          
                          {deptPermissions.length > 0 && (
                            <div className="mt-3">
                              <p className="font-medium text-gray-700 mb-2">الصلاحيات الشائعة:</p>
                              <div className="space-y-1">
                                {Object.entries(
                                  deptPermissions.reduce((acc, perm) => {
                                    const permCode = perm.permission_code;
                                    acc[permCode] = (acc[permCode] || 0) + 1;
                                    return acc;
                                  }, {} as Record<string, number>)
                                ).slice(0, 3).map(([permCode, count]) => {
                                  const permission = permissions.find(p => p.permission_code === permCode);
                                  return (
                                    <div key={permCode} className="flex items-center justify-between text-xs">
                                      <span>{permission?.permission_name_ar || permCode}</span>
                                      <Badge variant="outline" className="text-xs">{String(count)}</Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permission Management Dialog */}
      <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              إدارة صلاحيات: {selectedUser?.first_name} {selectedUser?.last_name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات المستخدم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span>{selectedUser.department_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-gray-500" />
                      {getRoleBadge(selectedUser.role)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إحصائيات الصلاحيات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>إجمالي الصلاحيات:</span>
                      <Badge>{selectedUser.permissions_count}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>صلاحيات الأقسام:</span>
                      <Badge variant="outline">
                        {[...new Set(selectedUser.user_permissions?.map((p: any) => p.department_id))].length} قسم
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إدارة الصلاحيات حسب القسم</h3>
                
                {departments.map((department) => {
                  const userDeptPermissions = userPermissions.filter(
                    up => up.user_id === selectedUser.user_id && up.department_id === department.id
                  );
                  
                  return (
                    <Card key={department.id} className="border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{department.department_name}</h4>
                          <Badge variant="outline">
                            {userDeptPermissions.length} صلاحية
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {permissions.map((permission) => {
                            const hasPermission = userDeptPermissions.some(
                              up => up.permission_code === permission.permission_code
                            );
                            
                            return (
                              <div key={permission.id} className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox
                                  id={`${department.id}-${permission.permission_code}`}
                                  checked={hasPermission}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      handleGrantPermission(
                                        selectedUser.user_id,
                                        selectedUser.company_id,
                                        department.id,
                                        permission.permission_code
                                      );
                                    } else {
                                      handleRevokePermission(
                                        selectedUser.user_id,
                                        selectedUser.company_id,
                                        department.id,
                                        permission.permission_code
                                      );
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`${department.id}-${permission.permission_code}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {permission.permission_name_ar}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};