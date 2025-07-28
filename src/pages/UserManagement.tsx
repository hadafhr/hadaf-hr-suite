import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Key, 
  Shield, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Send,
  Download,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const existingUsers = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    email: "ahmed.saad@company.com",
    role: "مدير عام",
    department: "إدارة عليا",
    status: "نشط",
    lastLogin: "2024-01-20",
    createdAt: "2023-12-01"
  },
  {
    id: 2,
    name: "فاطمة علي النور",
    email: "fatima.noor@company.com",
    role: "مدير الموارد البشرية",
    department: "الموارد البشرية",
    status: "نشط",
    lastLogin: "2024-01-19",
    createdAt: "2023-11-15"
  },
  {
    id: 3,
    name: "محمد خالد الشمري",
    email: "mohammed.shamri@company.com",
    role: "محاسب",
    department: "المالية",
    status: "معلق",
    lastLogin: "2024-01-10",
    createdAt: "2023-10-20"
  }
];

const roles = [
  { value: "admin", label: "مدير النظام" },
  { value: "manager", label: "مدير" },
  { value: "employee", label: "موظف" },
  { value: "hr", label: "موارد بشرية" },
  { value: "accountant", label: "محاسب" },
  { value: "viewer", label: "مشاهد فقط" }
];

const departments = [
  "إدارة عليا",
  "الموارد البشرية", 
  "المالية",
  "تقنية المعلومات",
  "المبيعات",
  "التسويق",
  "الإنتاج",
  "الصيانة"
];

export const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [isEmailTemplateOpen, setIsEmailTemplateOpen] = useState(false);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    position: '',
    phone: '',
    notes: ''
  });

  const [emailTemplate, setEmailTemplate] = useState({
    subject: 'بيانات الدخول إلى النظام',
    body: `مرحباً {{name}},

تم إنشاء حساب لك في نظام إدارة الموارد البشرية.

بيانات الدخول:
البريد الإلكتروني: {{email}}
كلمة المرور: {{password}}
الرابط: {{loginUrl}}

يرجى تغيير كلمة المرور عند أول تسجيل دخول.

مع أطيب التحيات,
فريق الموارد البشرية`
  });

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.department) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const password = generatePassword();
    
    // محاكاة إرسال البريد الإلكتروني
    toast({
      title: "تم إنشاء المستخدم بنجاح",
      description: `تم إنشاء حساب ${newUser.name} وإرسال بيانات الدخول إلى ${newUser.email}`,
    });

    // إعادة تعيين النموذج
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      position: '',
      phone: '',
      notes: ''
    });
    setIsNewUserOpen(false);
  };

  const handleSendCredentials = (user: any) => {
    toast({
      title: "تم إرسال بيانات الدخول",
      description: `تم إرسال بيانات الدخول إلى ${user.email}`,
    });
  };

  const handleResetPassword = (user: any) => {
    const newPassword = generatePassword();
    toast({
      title: "تم إعادة تعيين كلمة المرور",
      description: `تم إنشاء كلمة مرور جديدة وإرسالها إلى ${user.email}`,
    });
  };

  const handleDeleteUser = (user: any) => {
    toast({
      title: "تم حذف المستخدم",
      description: `تم حذف حساب ${user.name}`,
      variant: "destructive"
    });
  };

  const handleToggleStatus = (user: any) => {
    const newStatus = user.status === 'نشط' ? 'معلق' : 'نشط';
    toast({
      title: "تم تغيير حالة المستخدم",
      description: `تم تغيير حالة ${user.name} إلى ${newStatus}`,
    });
  };

  const handleBulkEmail = () => {
    toast({
      title: "تم إرسال الرسائل الجماعية",
      description: "تم إرسال بيانات الدخول لجميع المستخدمين المحددين",
    });
  };

  const handleExportUsers = () => {
    toast({
      title: "تصدير قائمة المستخدمين",
      description: "جاري تحميل ملف Excel بقائمة المستخدمين",
    });
  };

  const filteredUsers = existingUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role.includes(selectedRole);
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المستخدمين</h1>
          <p className="text-muted-foreground mt-2">إنشاء وإدارة حسابات المستخدمين وصلاحياتهم</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEmailTemplateOpen} onOpenChange={setIsEmailTemplateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                قالب البريد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>تخصيص قالب البريد الإلكتروني</DialogTitle>
                <DialogDescription>
                  تخصيص الرسالة التي سيتم إرسالها للمستخدمين الجدد
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-subject">موضوع الرسالة</Label>
                  <Input
                    id="email-subject"
                    value={emailTemplate.subject}
                    onChange={(e) => setEmailTemplate({...emailTemplate, subject: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email-body">محتوى الرسالة</Label>
                  <Textarea
                    id="email-body"
                    rows={10}
                    value={emailTemplate.body}
                    onChange={(e) => setEmailTemplate({...emailTemplate, body: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    يمكنك استخدام المتغيرات: {"{{name}}, {{email}}, {{password}}, {{loginUrl}}"}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEmailTemplateOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => setIsEmailTemplateOpen(false)}>
                    حفظ القالب
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <UserPlus className="h-4 w-4 mr-2" />
                مستخدم جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>إنشاء مستخدم جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات المستخدم الجديد. سيتم إرسال بيانات الدخول تلقائياً
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-name" className="text-right">الاسم *</Label>
                  <Input
                    id="user-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="col-span-3"
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-email" className="text-right">البريد الإلكتروني *</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3"
                    placeholder="email@company.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-role" className="text-right">الدور *</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-department" className="text-right">القسم *</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser({...newUser, department: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-position" className="text-right">المنصب</Label>
                  <Input
                    id="user-position"
                    value={newUser.position}
                    onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                    className="col-span-3"
                    placeholder="المسمى الوظيفي"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-phone" className="text-right">الهاتف</Label>
                  <Input
                    id="user-phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="col-span-3"
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-notes" className="text-right">ملاحظات</Label>
                  <Textarea
                    id="user-notes"
                    value={newUser.notes}
                    onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                    className="col-span-3"
                    placeholder="ملاحظات إضافية"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewUserOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateUser}>
                  إنشاء وإرسال البيانات
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 هذا الشهر</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمين النشطين</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">94.7% من الإجمالي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في انتظار التفعيل</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">يحتاجون مراجعة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المحظورين</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">محظورين مؤقتاً</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار والصلاحيات</TabsTrigger>
          <TabsTrigger value="settings">إعدادات النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* فلاتر البحث */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-64">
                  <Input
                    placeholder="البحث بالاسم أو البريد الإلكتروني..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="فلترة بالدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأدوار</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="فلترة بالقسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الأقسام</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleExportUsers}>
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
                <Button variant="outline" onClick={handleBulkEmail}>
                  <Send className="h-4 w-4 mr-2" />
                  إرسال جماعي
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* قائمة المستخدمين */}
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge variant="secondary">{user.department}</Badge>
                          <Badge variant={user.status === 'نشط' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-muted-foreground">
                        <p>آخر دخول: {user.lastLogin}</p>
                        <p>تاريخ الإنشاء: {user.createdAt}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendCredentials(user)}
                          title="إرسال بيانات الدخول"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetPassword(user)}
                          title="إعادة تعيين كلمة المرور"
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(user)}
                          title={user.status === 'نشط' ? 'تعليق الحساب' : 'تفعيل الحساب'}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="تعديل"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="text-destructive hover:text-destructive"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الأدوار والصلاحيات</CardTitle>
              <CardDescription>تحديد صلاحيات كل دور في النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.value} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{role.label}</h4>
                      <p className="text-sm text-muted-foreground">صلاحيات خاصة بـ {role.label}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      تحرير الصلاحيات
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المستخدمين</CardTitle>
              <CardDescription>إعدادات عامة لإدارة المستخدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">تفعيل المصادقة الثنائية</h4>
                    <p className="text-sm text-muted-foreground">إجبار جميع المستخدمين على استخدام المصادقة الثنائية</p>
                  </div>
                  <Button variant="outline">تفعيل</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">فترة انتهاء كلمة المرور</h4>
                    <p className="text-sm text-muted-foreground">مدة صلاحية كلمة المرور قبل طلب تغييرها</p>
                  </div>
                  <Button variant="outline">90 يوم</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">إعدادات البريد الإلكتروني</h4>
                    <p className="text-sm text-muted-foreground">تكوين خادم البريد الإلكتروني لإرسال بيانات الدخول</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    تكوين
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};