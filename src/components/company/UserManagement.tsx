import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Search,
  Settings,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  Building2,
  Crown,
  Activity
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
  boud_departments?: { department_name: string };
  boud_job_positions?: { position_title: string };
}

export const UserManagement: React.FC = () => {
  const [activeUserTab, setActiveUserTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);
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
          boud_departments(id, department_name),
          boud_job_positions(id, position_title)
        `)
        .eq('is_active', true);

      if (employeesError) throw employeesError;

      // Fetch user roles separately (if table exists)
      let userRoles: any[] = [];
      try {
        const { data: rolesData } = await supabase
          .from('boud_user_roles')
          .select('*')
          .eq('is_active', true);
        userRoles = rolesData || [];
      } catch (error) {
        console.warn('User roles table not found, using default roles');
      }

      // Fetch departments
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('boud_departments')
        .select('*')
        .eq('is_active', true);

      if (departmentsError) throw departmentsError;

      // Transform employees data
      const employeesWithRoles = employeesData?.map(emp => {
        const userRole = userRoles.find(role => role.user_id === emp.user_id);
        return {
          ...emp,
          role: userRole?.role || 'employee',
          department_name: emp.boud_departments?.department_name || 'غير محدد',
          position_title: emp.boud_job_positions?.position_title || 'غير محدد',
        };
      }) || [];

      setEmployees(employeesWithRoles);
      setDepartments(departmentsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId: string, companyId: string, newRole: string) => {
    try {
      // Update existing role or insert new one
      const { error: upsertError } = await supabase
        .from('boud_user_roles')
        .upsert({
          user_id: userId,
          company_id: companyId,
          role: newRole as any,
          is_active: true
        });

      if (upsertError) throw upsertError;

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

  const openPermissionDialog = (employee: Employee) => {
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
          <TabsTrigger value="roles">الأدوار والمناصب</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
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
                              {getRoleBadge(employee.role || 'employee')}
                              {getStatusBadge(employee.is_active)}
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
                              إدارة المستخدم
                            </Button>
                            <Select 
                              value={employee.role || 'employee'} 
                              onValueChange={(newRole) => handleUpdateUserRole(employee.user_id, employee.company_id, newRole)}
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

        {/* Roles & Positions */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                الأدوار المتاحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => {
                  const employeeCount = employees.filter(emp => emp.role === role.value).length;
                  return (
                    <div key={role.value} className="flex items-center justify-between p-4 bg-gradient-to-r from-background to-muted rounded-lg border">
                      <div>
                        <p className="font-medium">{role.label}</p>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {employeeCount} مستخدم
                        </p>
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
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                الأقسام ({departments.length} قسم)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((department) => {
                  const departmentEmployees = employees.filter(emp => emp.department_id === department.id);
                  
                  return (
                    <Card key={department.id} className="border border-muted">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{department.department_name}</h3>
                          <Badge variant="outline">
                            {departmentEmployees.length} موظف
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p>رمز القسم: {department.department_code}</p>
                          <div className="space-y-1">
                            {departmentEmployees.slice(0, 3).map((emp) => (
                              <div key={emp.id} className="flex items-center justify-between">
                                <span className="text-xs">{emp.first_name} {emp.last_name}</span>
                                {getRoleBadge(emp.role || 'employee')}
                              </div>
                            ))}
                            {departmentEmployees.length > 3 && (
                              <p className="text-xs text-muted-foreground">
                                و {departmentEmployees.length - 3} موظفين آخرين...
                              </p>
                            )}
                          </div>
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

      {/* User Management Dialog */}
      <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              إدارة المستخدم: {selectedUser?.first_name} {selectedUser?.last_name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات المستخدم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedUser.department_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-muted-foreground" />
                    {getRoleBadge(selectedUser.role || 'employee')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>انضم في: {formatDate(selectedUser.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    {getStatusBadge(selectedUser.is_active)}
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="role-select" className="text-sm font-medium">
                      تحديث دور المستخدم:
                    </Label>
                    <Select 
                      value={selectedUser.role || 'employee'} 
                      onValueChange={(newRole) => {
                        handleUpdateUserRole(selectedUser.user_id, selectedUser.company_id, newRole);
                        setSelectedUser({...selectedUser, role: newRole});
                      }}
                    >
                      <SelectTrigger className="mt-2">
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

                  <div className="mt-4 flex items-center justify-between">
                    <Label htmlFor="status-toggle" className="text-sm font-medium">
                      حالة المستخدم:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="status-toggle"
                        checked={selectedUser.is_active}
                        onCheckedChange={() => {
                          toggleEmployeeStatus(selectedUser.id, selectedUser.is_active);
                          setSelectedUser({...selectedUser, is_active: !selectedUser.is_active});
                        }}
                      />
                      {getStatusBadge(selectedUser.is_active)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};