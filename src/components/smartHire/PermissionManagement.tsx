import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Users,
  Shield,
  Key,
  UserPlus,
  Settings,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruitment_manager' | 'department_manager' | 'hr_manager' | 'general_manager' | 'ai_system';
  department?: string;
  permissions: Permission[];
  status: 'active' | 'inactive';
  lastLogin?: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'jobs' | 'applicants' | 'interviews' | 'reports' | 'system';
}

interface ApprovalWorkflow {
  id: string;
  name: string;
  type: 'job_creation' | 'final_approval';
  steps: ApprovalStep[];
}

interface ApprovalStep {
  order: number;
  role: string;
  required: boolean;
}

export const PermissionManagement: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([
    {
      id: '1',
      name: 'سارة أحمد العتيبي',
      email: 'sara.alotaibi@company.com',
      role: 'recruitment_manager',
      department: 'الموارد البشرية',
      status: 'active',
      lastLogin: '2024-01-20 10:30',
      permissions: [
        { id: 'create_jobs', name: 'إنشاء وظائف', description: 'إنشاء وتعديل الوظائف', category: 'jobs' },
        { id: 'manage_applicants', name: 'إدارة المتقدمين', description: 'مراجعة وإدارة المتقدمين', category: 'applicants' },
        { id: 'schedule_interviews', name: 'جدولة المقابلات', description: 'جدولة وإدارة المقابلات', category: 'interviews' }
      ]
    },
    {
      id: '2',
      name: 'محمد علي القحطاني',
      email: 'mohammed.alqahtani@company.com',
      role: 'department_manager',
      department: 'تقنية المعلومات',
      status: 'active',
      lastLogin: '2024-01-19 15:45',
      permissions: [
        { id: 'review_candidates', name: 'مراجعة المرشحين', description: 'مراجعة وتقييم المرشحين', category: 'applicants' },
        { id: 'conduct_interviews', name: 'إجراء المقابلات', description: 'إجراء وتقييم المقابلات', category: 'interviews' }
      ]
    },
    {
      id: '3',
      name: 'نورا حسن المطيري',
      email: 'nora.almutairi@company.com',
      role: 'hr_manager',
      department: 'الموارد البشرية',
      status: 'active',
      lastLogin: '2024-01-20 09:15',
      permissions: [
        { id: 'final_approval', name: 'الموافقة النهائية', description: 'الموافقة النهائية على التوظيف', category: 'applicants' },
        { id: 'system_management', name: 'إدارة النظام', description: 'إدارة إعدادات النظام', category: 'system' },
        { id: 'view_reports', name: 'عرض التقارير', description: 'عرض وتصدير التقارير', category: 'reports' }
      ]
    }
  ]);

  const [availablePermissions] = React.useState<Permission[]>([
    { id: 'create_jobs', name: 'إنشاء وظائف', description: 'إنشاء وتعديل الوظائف', category: 'jobs' },
    { id: 'publish_jobs', name: 'نشر وظائف', description: 'نشر الوظائف على المواقع الخارجية', category: 'jobs' },
    { id: 'manage_applicants', name: 'إدارة المتقدمين', description: 'مراجعة وإدارة المتقدمين', category: 'applicants' },
    { id: 'review_candidates', name: 'مراجعة المرشحين', description: 'مراجعة وتقييم المرشحين', category: 'applicants' },
    { id: 'final_approval', name: 'الموافقة النهائية', description: 'الموافقة النهائية على التوظيف', category: 'applicants' },
    { id: 'schedule_interviews', name: 'جدولة المقابلات', description: 'جدولة وإدارة المقابلات', category: 'interviews' },
    { id: 'conduct_interviews', name: 'إجراء المقابلات', description: 'إجراء وتقييم المقابلات', category: 'interviews' },
    { id: 'view_reports', name: 'عرض التقارير', description: 'عرض وتصدير التقارير', category: 'reports' },
    { id: 'system_management', name: 'إدارة النظام', description: 'إدارة إعدادات النظام', category: 'system' }
  ]);

  const [workflows] = React.useState<ApprovalWorkflow[]>([
    {
      id: '1',
      name: 'اعتماد الوظيفة الجديدة',
      type: 'job_creation',
      steps: [
        { order: 1, role: 'recruitment_manager', required: true },
        { order: 2, role: 'hr_manager', required: true },
        { order: 3, role: 'general_manager', required: true }
      ]
    },
    {
      id: '2',
      name: 'الموافقة على الترشيح النهائي',
      type: 'final_approval',
      steps: [
        { order: 1, role: 'recruitment_manager', required: true },
        { order: 2, role: 'department_manager', required: true },
        { order: 3, role: 'hr_manager', required: true }
      ]
    }
  ]);

  const [newUserDialog, setNewUserDialog] = React.useState(false);
  const [userForm, setUserForm] = React.useState({
    name: '',
    email: '',
    role: 'recruitment_manager' as User['role'],
    department: '',
    permissions: [] as string[]
  });

  const handleCreateUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      department: userForm.department,
      status: 'active',
      permissions: availablePermissions.filter(p => userForm.permissions.includes(p.id))
    };

    setUsers(prev => [newUser, ...prev]);
    setNewUserDialog(false);
    setUserForm({
      name: '',
      email: '',
      role: 'recruitment_manager',
      department: '',
      permissions: []
    });
  };

  const getRoleLabel = (role: User['role']) => {
    switch (role) {
      case 'recruitment_manager': return 'مسؤول التوظيف';
      case 'department_manager': return 'مدير القسم';
      case 'hr_manager': return 'مدير الموارد البشرية';
      case 'general_manager': return 'المدير العام';
      case 'ai_system': return 'الذكاء الاصطناعي';
      default: return role;
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'recruitment_manager': return 'bg-blue-100 text-blue-800';
      case 'department_manager': return 'bg-green-100 text-green-800';
      case 'hr_manager': return 'bg-purple-100 text-purple-800';
      case 'general_manager': return 'bg-red-100 text-red-800';
      case 'ai_system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: Permission['category']) => {
    switch (category) {
      case 'jobs': return '💼';
      case 'applicants': return '👥';
      case 'interviews': return '🗣️';
      case 'reports': return '📊';
      case 'system': return '⚙️';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">إدارة الصلاحيات</h2>
          <p className="text-slate-600 dark:text-slate-300">إدارة المستخدمين والأدوار والصلاحيات</p>
        </div>
        <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-name">الاسم الكامل</Label>
                  <Input
                    id="user-name"
                    value={userForm.name}
                    onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div>
                  <Label htmlFor="user-email">البريد الإلكتروني</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-role">الدور</Label>
                  <Select value={userForm.role} onValueChange={(value: any) => setUserForm(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruitment_manager">مسؤول التوظيف</SelectItem>
                      <SelectItem value="department_manager">مدير القسم</SelectItem>
                      <SelectItem value="hr_manager">مدير الموارد البشرية</SelectItem>
                      <SelectItem value="general_manager">المدير العام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="user-department">القسم</Label>
                  <Input
                    id="user-department"
                    value={userForm.department}
                    onChange={(e) => setUserForm(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="اسم القسم"
                  />
                </div>
              </div>

              <div>
                <Label>الصلاحيات</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                      <input
                        type="checkbox"
                        checked={userForm.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserForm(prev => ({ ...prev, permissions: [...prev.permissions, permission.id] }));
                          } else {
                            setUserForm(prev => ({ ...prev, permissions: prev.permissions.filter(p => p !== permission.id) }));
                          }
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium">{permission.name}</p>
                        <p className="text-xs text-slate-500">{permission.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewUserDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateUser}>
                  إضافة المستخدم
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">المستخدمين النشطين</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">مديري الأقسام</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'department_manager').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">الصلاحيات المتاحة</p>
              <p className="text-2xl font-bold text-orange-600">{availablePermissions.length}</p>
            </div>
            <Key className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">المستخدمين</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {user.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">{user.department}</span>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-slate-500">{user.permissions.length} صلاحية</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Approval Workflows */}
        <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">سلسلة الموافقات</h3>
            <Settings className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-medium mb-3">{workflow.name}</h4>
                <div className="space-y-2">
                  {workflow.steps.map((step) => (
                    <div key={step.order} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {step.order}
                      </div>
                      <span className="text-sm">{getRoleLabel(step.role as User['role'])}</span>
                      {step.required && (
                        <Badge className="bg-red-100 text-red-800 text-xs">مطلوب</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Permissions Matrix */}
      <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">مصفوفة الصلاحيات</h3>
          <Key className="w-5 h-5 text-orange-600" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-right p-2">الصلاحية</th>
                <th className="text-center p-2">مسؤول التوظيف</th>
                <th className="text-center p-2">مدير القسم</th>
                <th className="text-center p-2">مدير الموارد البشرية</th>
                <th className="text-center p-2">المدير العام</th>
              </tr>
            </thead>
            <tbody>
              {availablePermissions.map((permission) => (
                <tr key={permission.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <span>{getCategoryIcon(permission.category)}</span>
                      <div>
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-xs text-slate-500">{permission.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-2">
                    {users.find(u => u.role === 'recruitment_manager')?.permissions.some(p => p.id === permission.id) ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-2">
                    {users.find(u => u.role === 'department_manager')?.permissions.some(p => p.id === permission.id) ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-2">
                    {users.find(u => u.role === 'hr_manager')?.permissions.some(p => p.id === permission.id) ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};