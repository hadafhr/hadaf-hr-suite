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
  selected_sections: string[];
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employee_id: string;
  is_active: boolean;
  created_at: string;
  role?: string;
  position_title?: string;
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
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [systemPermissionsDialog, setSystemPermissionsDialog] = useState(false);
  const [selectedUserForPermissions, setSelectedUserForPermissions] = useState<Employee | null>(null);
  const [userPermissions, setUserPermissions] = useState<{[key: string]: string[]}>({});
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    selected_sections: [] as string[],
    position_title: '',
    role: 'employee'
  });

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

  // System management sections (32 sections)
  const systemSections = [
    { id: 'team_management', name: 'قسم فريق العمل', description: 'إدارة فرق العمل والمشاريع', color: 'bg-blue-100 text-blue-800' },
    { id: 'departments_units', name: 'قسم الإدارات والوحدات', description: 'إدارة الأقسام والوحدات التنظيمية', color: 'bg-green-100 text-green-800' },
    { id: 'quality_of_life', name: 'قسم جودة الحياة', description: 'تحسين جودة الحياة الوظيفية للموظفين', color: 'bg-purple-100 text-purple-800' },
    { id: 'skills_inventory', name: 'قسم مخزون المهارات', description: 'إدارة وتطوير مهارات الموظفين', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'internal_communication', name: 'قسم التواصل الداخلي', description: 'التواصل الداخلي بين الموظفين', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'administrative_communication', name: 'قسم الاتصالات الإدارية', description: 'إدارة الاتصالات الرسمية', color: 'bg-pink-100 text-pink-800' },
    { id: 'occupational_safety', name: 'قسم السلامة المهنية', description: 'ضمان السلامة المهنية في بيئة العمل', color: 'bg-red-100 text-red-800' },
    { id: 'social_services', name: 'قسم الخدمات الاجتماعية', description: 'تقديم الخدمات الاجتماعية للموظفين', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'attendance_departure', name: 'قسم الحضور والانصراف', description: 'متابعة أوقات الحضور والانصراف', color: 'bg-orange-100 text-orange-800' },
    { id: 'employee_services', name: 'قسم خدمات الموظفين', description: 'تقديم الخدمات المختلفة للموظفين', color: 'bg-teal-100 text-teal-800' },
    { id: 'penalties_punishments', name: 'قسم الجزاءات والعقوبات', description: 'إدارة الجزاءات والإجراءات التأديبية', color: 'bg-gray-100 text-gray-800' },
    { id: 'vacations', name: 'قسم الإجازات', description: 'إدارة طلبات الإجازات والموافقات', color: 'bg-violet-100 text-violet-800' },
    { id: 'salaries_wages', name: 'قسم الرواتب والأجور', description: 'معالجة الرواتب والأجور', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'integration_linking', name: 'قسم التكامل والربط', description: 'ربط الأنظمة والتكامل', color: 'bg-lime-100 text-lime-800' },
    { id: 'institutional_development', name: 'قسم التطوير المؤسسي', description: 'تطوير العمليات المؤسسية', color: 'bg-amber-100 text-amber-800' },
    { id: 'governance_compliance', name: 'قسم الحوكمة والامتثال', description: 'ضمان الامتثال والحوكمة', color: 'bg-rose-100 text-rose-800' },
    { id: 'wage_protection', name: 'قسم حماية الأجور', description: 'حماية أجور الموظفين', color: 'bg-sky-100 text-sky-800' },
    { id: 'legal_affairs', name: 'قسم الشؤون القانونية', description: 'الشؤون القانونية والامتثال', color: 'bg-slate-100 text-slate-800' },
    { id: 'performance_evaluation', name: 'قسم تقييم الأداء', description: 'تقييم ومتابعة أداء الموظفين', color: 'bg-blue-100 text-blue-800' },
    { id: 'training_qualification', name: 'قسم التدريب والتأهيل', description: 'برامج التدريب والتأهيل', color: 'bg-green-100 text-green-800' },
    { id: 'talent_management', name: 'قسم إدارة المواهب', description: 'إدارة وتطوير المواهب', color: 'bg-purple-100 text-purple-800' },
    { id: 'recruitment_hiring', name: 'قسم التوظيف والتعين', description: 'عمليات التوظيف والتعيين', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'insurance', name: 'قسم التأمين', description: 'إدارة التأمينات والمزايا', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'rewards_incentives', name: 'قسم المكافآت والحوافز', description: 'إدارة المكافآت وبرامج التحفيز', color: 'bg-pink-100 text-pink-800' },
    { id: 'meetings', name: 'قسم الاجتماعات', description: 'تنظيم وإدارة الاجتماعات', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'electronic_signature', name: 'قسم التوقيع الإلكتروني', description: 'إدارة التوقيعات الإلكترونية', color: 'bg-orange-100 text-orange-800' },
    { id: 'tasks_follow_up', name: 'قسم المهام والمتابعة', description: 'متابعة وإدارة المهام', color: 'bg-teal-100 text-teal-800' },
    { id: 'requests_notifications', name: 'قسم الطلبات والإشعارات', description: 'إدارة الطلبات والإشعارات', color: 'bg-gray-100 text-gray-800' },
    { id: 'artificial_intelligence', name: 'قسم الذكاء الاصطناعي', description: 'تطبيقات الذكاء الاصطناعي', color: 'bg-violet-100 text-violet-800' },
    { id: 'comprehensive_reports', name: 'قسم التقارير الشاملة', description: 'إعداد التقارير الشاملة', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'field_tracking', name: 'قسم التتبع الميداني', description: 'تتبع العمل الميداني', color: 'bg-lime-100 text-lime-800' },
    { id: 'general_settings', name: 'الإعدادات العامة', description: 'إدارة الإعدادات العامة للنظام', color: 'bg-amber-100 text-amber-800' },
    { id: 'employee_dashboard', name: 'لوحة تحكم الموظف', description: 'لوحة تحكم شخصية للموظفين', color: 'bg-slate-100 text-slate-800' }
  ];

  // Fetch employees and related data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // استخدام بيانات افتراضية مؤقتاً
      const mockEmployees = [
        {
          id: '1',
          user_id: 'user-1',
          company_id: 'company-1',
          selected_sections: ['hr_management', 'payroll_management'],
          first_name: 'أحمد',
          last_name: 'محمد',
          email: 'ahmed@company.com',
          phone: '+966501234567',
          employee_id: 'EMP001',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          role: 'hr_manager',
          position_title: 'مدير الموارد البشرية'
        },
        {
          id: '2',
          user_id: 'user-2', 
          company_id: 'company-1',
          selected_sections: ['financial_management', 'accounting'],
          first_name: 'فاطمة',
          last_name: 'أحمد',
          email: 'fatima@company.com',
          phone: '+966501234568',
          employee_id: 'EMP002',
          is_active: true,
          created_at: '2024-01-02T00:00:00Z',
          role: 'department_manager',
          position_title: 'مديرة المالية'
        },
        {
          id: '3',
          user_id: 'user-3',
          company_id: 'company-1', 
          selected_sections: ['team_management', 'project_management'],
          first_name: 'محمد',
          last_name: 'علي',
          email: 'mohammed@company.com',
          phone: '+966501234569',
          employee_id: 'EMP003',
          is_active: true,
          created_at: '2024-01-03T00:00:00Z',
          role: 'employee',
          position_title: 'مطور'
        }
      ];

      const mockDepartments = [
        { id: 'dept-1', department_name: 'الموارد البشرية', department_code: 'HR' },
        { id: 'dept-2', department_name: 'المالية', department_code: 'FIN' },
        { id: 'dept-3', department_name: 'التقنية', department_code: 'IT' },
        { id: 'dept-4', department_name: 'التسويق', department_code: 'MKT' },
        { id: 'dept-5', department_name: 'المبيعات', department_code: 'SALES' }
      ];

      setEmployees(mockEmployees);
      setDepartments(mockDepartments);

      // Initialize user permissions (mock data)
      const mockPermissions: {[key: string]: string[]} = {};
      mockEmployees.forEach(emp => {
        mockPermissions[emp.id] = [];
        if (emp.role === 'super_admin') {
          mockPermissions[emp.id] = systemSections.map(s => s.id);
        } else if (emp.role === 'hr_manager') {
          mockPermissions[emp.id] = ['hr_management', 'payroll_management', 'attendance_management', 'leave_management'];
        } else if (emp.role === 'department_manager') {
          mockPermissions[emp.id] = ['team_management', 'departments_units', 'performance_management'];
        }
      });
      setUserPermissions(mockPermissions);

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

  const openSystemPermissionsDialog = (employee: Employee) => {
    setSelectedUserForPermissions(employee);
    setSystemPermissionsDialog(true);
  };

  const toggleSystemPermission = (employeeId: string, sectionId: string) => {
    setUserPermissions(prev => {
      const currentPermissions = prev[employeeId] || [];
      const hasPermission = currentPermissions.includes(sectionId);
      
      const updatedPermissions = hasPermission 
        ? currentPermissions.filter(p => p !== sectionId)
        : [...currentPermissions, sectionId];
      
      return {
        ...prev,
        [employeeId]: updatedPermissions
      };
    });
    
    toast.success(`تم ${userPermissions[employeeId]?.includes(sectionId) ? 'إزالة' : 'إضافة'} الصلاحية بنجاح`);
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.first_name || !newUser.last_name || !newUser.email) {
        toast.error('يجب ملء الحقول المطلوبة');
        return;
      }

      // إضافة المستخدم الجديد للقائمة
      const newEmployee: Employee = {
        id: `emp-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        company_id: 'company-1',
        selected_sections: newUser.selected_sections,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone: newUser.phone,
        employee_id: `EMP${(employees.length + 1).toString().padStart(3, '0')}`,
        is_active: true,
        created_at: new Date().toISOString(),
        role: newUser.role,
        position_title: newUser.position_title || 'غير محدد'
      };

      setEmployees([...employees, newEmployee]);
      
      // Initialize permissions for new employee
      setUserPermissions(prev => ({
        ...prev,
        [newEmployee.id]: []
      }));
      
      // إعادة تعيين النموذج
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        selected_sections: [],
        position_title: '',
        role: 'employee'
      });

      toast.success('تم إضافة المستخدم بنجاح');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('حدث خطأ في إضافة المستخدم');
    }
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="add-user">إضافة مستخدم</TabsTrigger>
          <TabsTrigger value="system-permissions">صلاحيات النظام</TabsTrigger>
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
                                <span>الأقسام: {employee.selected_sections.length > 0 ? 
                                  employee.selected_sections.map(sectionId => 
                                    systemSections.find(s => s.id === sectionId)?.name
                                  ).filter(Boolean).join('، ') : 'غير محدد'}</span>
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
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openSystemPermissionsDialog(employee)}
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              صلاحيات النظام
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

        {/* Add User */}
        <TabsContent value="add-user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                إضافة مستخدم جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">الاسم الأول</Label>
                  <Input
                    id="first_name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                    placeholder="أدخل الاسم الأول"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">الاسم الأخير</Label>
                  <Input
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                    placeholder="أدخل الاسم الأخير"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="sections">أقسام النظام</Label>
                  <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {systemSections.map((section) => (
                        <div key={section.id} className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="checkbox"
                            id={section.id}
                            checked={newUser.selected_sections.includes(section.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewUser({
                                  ...newUser,
                                  selected_sections: [...newUser.selected_sections, section.id]
                                });
                              } else {
                                setNewUser({
                                  ...newUser,
                                  selected_sections: newUser.selected_sections.filter(id => id !== section.id)
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={section.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{section.name}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${section.color}`}>
                                {section.description}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {newUser.selected_sections.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      تم تحديد {newUser.selected_sections.length} من أصل {systemSections.length} قسم
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="role">الدور</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدور" />
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
              </div>

              <div>
                <Label htmlFor="position">المنصب</Label>
                <Input
                  id="position"
                  value={newUser.position_title}
                  onChange={(e) => setNewUser({...newUser, position_title: e.target.value})}
                  placeholder="أدخل المنصب"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAddUser}
                  className="flex-1"
                >
                  إضافة المستخدم
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setNewUser({
                      first_name: '',
                      last_name: '',
                      email: '',
                      phone: '',
                      selected_sections: [],
                      position_title: '',
                      role: 'employee'
                    });
                  }}
                >
                  إعادة تعيين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Permissions Management */}
        <TabsContent value="system-permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                أقسام إدارة النظام ({systemSections.length} قسم)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  يمكنك إعطاء صلاحيات للموظفين على أقسام النظام المختلفة حسب احتياجات العمل
                </div>
                
                <div className="grid gap-6">
                  {employees.map((employee) => (
                    <Card key={employee.id} className="border border-muted">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {employee.first_name?.charAt(0) || 'م'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{employee.first_name} {employee.last_name}</h3>
                              <p className="text-sm text-muted-foreground">{employee.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getRoleBadge(employee.role || 'employee')}
                            <Badge variant="outline">
                              {userPermissions[employee.id]?.length || 0} صلاحية
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {systemSections.map((section) => {
                            const hasPermission = userPermissions[employee.id]?.includes(section.id) || false;
                            return (
                              <div 
                                key={section.id} 
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                  hasPermission ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/20'
                                }`}
                                onClick={() => toggleSystemPermission(employee.id, section.id)}
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{section.name}</p>
                                  <p className="text-xs text-muted-foreground">{section.description}</p>
                                </div>
                                <Switch 
                                  checked={hasPermission}
                                  onChange={() => {}}
                                  className="ml-2"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                أقسام النظام ({systemSections.length} قسم)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemSections.map((section) => {
                  const sectionEmployees = employees.filter(emp => emp.selected_sections.includes(section.id));
                  
                  return (
                    <Card key={section.id} className="border border-muted">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{section.name}</h3>
                          <Badge variant="outline">
                            {sectionEmployees.length} موظف
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p className={`px-2 py-1 rounded-full text-xs ${section.color}`}>
                            {section.description}
                          </p>
                          <div className="space-y-1">
                            {sectionEmployees.slice(0, 3).map((emp) => (
                              <div key={emp.id} className="flex items-center justify-between">
                                <span className="text-xs">{emp.first_name} {emp.last_name}</span>
                                {getRoleBadge(emp.role || 'employee')}
                              </div>
                            ))}
                            {sectionEmployees.length > 3 && (
                              <p className="text-xs text-muted-foreground">
                                و {sectionEmployees.length - 3} موظفين آخرين...
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
                    <span>الأقسام: {selectedUser.selected_sections.length > 0 ? 
                      selectedUser.selected_sections.map(sectionId => 
                        systemSections.find(s => s.id === sectionId)?.name
                      ).filter(Boolean).join('، ') : 'غير محدد'}</span>
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

      {/* System Permissions Dialog */}
      <Dialog open={systemPermissionsDialog} onOpenChange={setSystemPermissionsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              صلاحيات النظام: {selectedUserForPermissions?.first_name} {selectedUserForPermissions?.last_name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUserForPermissions && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">الصلاحيات الحالية</CardTitle>
                    <Badge variant="outline">
                      {userPermissions[selectedUserForPermissions.id]?.length || 0} صلاحية
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {systemSections.map((section) => {
                      const hasPermission = userPermissions[selectedUserForPermissions.id]?.includes(section.id) || false;
                      return (
                        <div 
                          key={section.id}
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                            hasPermission ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/20'
                          }`}
                          onClick={() => toggleSystemPermission(selectedUserForPermissions.id, section.id)}
                        >
                          <div className="flex-1">
                            <h4 className="font-medium">{section.name}</h4>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                          </div>
                          <Switch 
                            checked={hasPermission}
                            onChange={() => {}}
                          />
                        </div>
                      );
                    })}
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