import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Settings,
  Building2,
  Globe,
  Users,
  Shield,
  Key,
  Database,
  Plug,
  Download,
  Upload,
  Bell,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Palette,
  Languages,
  Server,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Crown,
  UserPlus,
  Zap,
  Network,
  Wifi,
  HardDrive,
  Monitor,
  Smartphone,
  Laptop,
  Camera,
  Printer,
  QrCode,
  FileText,
  Link,
  Code,
  Webhook,
  Bot,
  MessageSquare,
  Headphones,
  CreditCard,
  Banknote
} from 'lucide-react';

interface SystemSettingsProps {
  onBack?: () => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [companySettings, setCompanySettings] = useState({
    name: 'شركة بُعد للتقنية',
    logo: '/company-logo.png',
    primaryLanguage: 'ar',
    timezone: 'Asia/Riyadh',
    currency: 'SAR',
    address: 'الرياض، المملكة العربية السعودية',
    phone: '+966 11 123 4567',
    email: 'info@boud.sa',
    website: 'https://boud.sa'
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'أحمد محمد السالم',
      email: 'ahmed@company.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-03-20 14:30',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'سارة أحمد علي',
      email: 'sara@company.com',
      role: 'hr_manager',
      status: 'active',
      lastLogin: '2024-03-20 09:15',
      permissions: ['hr', 'employees', 'reports']
    },
    {
      id: 3,
      name: 'محمد عبدالله',
      email: 'mohammed@company.com',
      role: 'manager',
      status: 'inactive',
      lastLogin: '2024-03-18 16:45',
      permissions: ['employees', 'attendance']
    }
  ]);

  const [customRoles, setCustomRoles] = useState([
    {
      id: 1,
      name: 'مدير الموارد البشرية',
      code: 'hr_manager',
      permissions: ['employees', 'payroll', 'leaves', 'reports'],
      description: 'يمكنه إدارة جميع شؤون الموظفين والرواتب',
      usersCount: 3
    },
    {
      id: 2,
      name: 'مشرف الحضور',
      code: 'attendance_supervisor',
      permissions: ['attendance', 'reports'],
      description: 'مسؤول عن متابعة الحضور والانصراف',
      usersCount: 2
    },
    {
      id: 3,
      name: 'محاسب الرواتب',
      code: 'payroll_accountant',
      permissions: ['payroll', 'reports'],
      description: 'مختص بحساب وإدارة الرواتب',
      usersCount: 1
    }
  ]);

  const [integrations, setIntegrations] = useState([
    {
      name: 'منصة قوى (Qiwa)',
      status: 'connected',
      description: 'ربط مع منصة قوى لإدارة العمالة',
      lastSync: '2024-03-20 12:00',
      icon: Building2
    },
    {
      name: 'التأمينات الاجتماعية (GOSI)',
      status: 'connected',
      description: 'ربط مع نظام التأمينات الاجتماعية',
      lastSync: '2024-03-20 10:30',
      icon: Shield
    },
    {
      name: 'منصة مدد (Mudad)',
      status: 'pending',
      description: 'ربط مع منصة مدد لتمديد الإقامات',
      lastSync: 'لم يتم المزامنة',
      icon: FileText
    },
    {
      name: 'خدمات البريد الإلكتروني',
      status: 'connected',
      description: 'إرسال الإشعارات والتقارير عبر البريد',
      lastSync: '2024-03-20 14:15',
      icon: Mail
    },
    {
      name: 'خدمات الرسائل النصية (SMS)',
      status: 'disconnected',
      description: 'إرسال التنبيهات عبر الرسائل النصية',
      lastSync: 'غير متصل',
      icon: MessageSquare
    }
  ]);

  const [clientDomains, setClientDomains] = useState([
    {
      id: 1,
      companyName: 'شركة الرياض للتطوير',
      domain: 'riyadh-dev.boud.sa',
      status: 'active',
      employees: 120,
      createdDate: '2024-01-15',
      lastAccess: '2024-03-20 16:30'
    },
    {
      id: 2,
      companyName: 'مجموعة جدة التجارية',
      domain: 'jeddah-group.boud.sa',
      status: 'active',
      employees: 85,
      createdDate: '2024-02-10',
      lastAccess: '2024-03-20 11:45'
    },
    {
      id: 3,
      companyName: 'شركة الدمام للصناعات',
      domain: 'dammam-industries.boud.sa',
      status: 'pending',
      employees: 0,
      createdDate: '2024-03-18',
      lastAccess: 'لم يتم الوصول'
    }
  ]);

  const handleSaveGeneralSettings = () => {
    toast.success('تم حفظ الإعدادات العامة بنجاح');
  };

  const handleCreateUser = () => {
    toast.success('تم إنشاء المستخدم بنجاح');
  };

  const handleCreateRole = () => {
    toast.success('تم إنشاء الصلاحية المخصصة بنجاح');
  };

  const handleConnectIntegration = (integration: string) => {
    toast.success(`تم ربط ${integration} بنجاح`);
  };

  const handleCreateDomain = () => {
    toast.success('تم إنشاء النطاق بنجاح');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr_manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manager': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'connected': return 'bg-green-100 text-green-800';
      case 'inactive': case 'disconnected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const permissions = [
    { id: 'employees', name: 'إدارة الموظفين', description: 'إضافة وتعديل وحذف بيانات الموظفين' },
    { id: 'attendance', name: 'الحضور والانصراف', description: 'مراقبة وإدارة الحضور والانصراف' },
    { id: 'payroll', name: 'الرواتب', description: 'حساب وإدارة الرواتب والمستحقات' },
    { id: 'leaves', name: 'الإجازات', description: 'اعتماد ومراجعة طلبات الإجازات' },
    { id: 'reports', name: 'التقارير', description: 'عرض وتصدير التقارير المختلفة' },
    { id: 'settings', name: 'الإعدادات', description: 'تعديل إعدادات النظام العامة' },
    { id: 'users', name: 'إدارة المستخدمين', description: 'إضافة وإدارة مستخدمي النظام' }
  ];

  return (
    <div className="space-y-6">
      {/* رأس الإعدادات */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Settings className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">إعدادات النظام</h1>
            <p className="text-muted-foreground">إدارة الإعدادات العامة والصلاحيات والتكاملات</p>
          </div>
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            العودة
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* قائمة التبويب */}
        <div className="bg-white rounded-lg border p-1">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              الصلاحيات
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              النطاقات
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug className="h-4 w-4" />
              التكاملات
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              الأمان
            </TabsTrigger>
          </TabsList>
        </div>

        {/* تبويب الإعدادات العامة */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  معلومات المنشأة
                </CardTitle>
                <CardDescription>
                  الإعدادات الأساسية للشركة أو المؤسسة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم المنشأة</Label>
                  <Input
                    id="company-name"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">العنوان</Label>
                  <Textarea
                    id="company-address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">الهاتف</Label>
                    <Input
                      id="company-phone"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">البريد الإلكتروني</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">الموقع الإلكتروني</Label>
                  <Input
                    id="company-website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  الإعدادات الإقليمية
                </CardTitle>
                <CardDescription>
                  اللغة والمنطقة الزمنية والعملة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-language">اللغة الأساسية</Label>
                  <Select value={companySettings.primaryLanguage} onValueChange={(value) => setCompanySettings({...companySettings, primaryLanguage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <Select value={companySettings.timezone} onValueChange={(value) => setCompanySettings({...companySettings, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="Asia/Kuwait">الكويت (GMT+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">العملة</Label>
                  <Select value={companySettings.currency} onValueChange={(value) => setCompanySettings({...companySettings, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                      <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                      <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveGeneralSettings} className="w-full">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* تبويب إدارة المستخدمين */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">إدارة المستخدمين</h3>
              <p className="text-sm text-muted-foreground">إضافة وإدارة مستخدمي النظام وصلاحياتهم</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 ml-2" />
                  إضافة مستخدم
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                  <DialogDescription>أدخل بيانات المستخدم الجديد</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">الاسم الكامل</Label>
                    <Input id="user-name" placeholder="أدخل الاسم الكامل" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">البريد الإلكتروني</Label>
                    <Input id="user-email" type="email" placeholder="user@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">الدور</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">مدير النظام</SelectItem>
                        <SelectItem value="hr_manager">مدير الموارد البشرية</SelectItem>
                        <SelectItem value="manager">مشرف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCreateUser} className="w-full">
                    إنشاء المستخدم
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {users.map((user) => (
                  <div key={user.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">آخر دخول: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role === 'super_admin' ? 'مدير النظام' : 
                         user.role === 'hr_manager' ? 'مدير الموارد البشرية' : 'مشرف'}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب إدارة الصلاحيات */}
        <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">إدارة الصلاحيات</h3>
              <p className="text-sm text-muted-foreground">إنشاء وإدارة الأدوار والصلاحيات المخصصة</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء صلاحية مخصصة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء صلاحية مخصصة</DialogTitle>
                  <DialogDescription>حدد الصلاحيات والأذونات للدور الجديد</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">اسم الصلاحية</Label>
                      <Input id="role-name" placeholder="مثال: مشرف المبيعات" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-code">الكود</Label>
                      <Input id="role-code" placeholder="sales_supervisor" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">الوصف</Label>
                    <Textarea id="role-description" placeholder="وصف مختصر للدور والمسؤوليات" rows={2} />
                  </div>
                  <div className="space-y-3">
                    <Label>الصلاحيات:</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-3">
                          <Switch id={permission.id} />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor={permission.id} className="text-sm font-medium">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleCreateRole} className="w-full">
                    إنشاء الصلاحية
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customRoles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant="secondary">{role.usersCount} مستخدم</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">الصلاحيات:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permissions.find(p => p.id === permission)?.name || permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="h-3 w-3 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* تبويب إدارة النطاقات */}
        <TabsContent value="domains" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">إدارة النطاقات</h3>
              <p className="text-sm text-muted-foreground">إنشاء نطاقات فرعية للعملاء والشركات</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء نطاق جديد
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إنشاء نطاق جديد</DialogTitle>
                  <DialogDescription>إنشاء نطاق فرعي لشركة أو عميل جديد</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain-company">اسم الشركة</Label>
                    <Input id="domain-company" placeholder="اسم الشركة العميلة" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain-subdomain">النطاق الفرعي</Label>
                    <div className="flex">
                      <Input id="domain-subdomain" placeholder="company-name" className="rounded-l-md rounded-r-none" />
                      <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .boud.sa
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      مثال: company-name.boud.sa
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain-contact">بريد المسؤول</Label>
                    <Input id="domain-contact" type="email" placeholder="admin@company.com" />
                  </div>
                  <Button onClick={handleCreateDomain} className="w-full">
                    إنشاء النطاق
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {clientDomains.map((domain) => (
                  <div key={domain.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{domain.companyName}</h4>
                        <p className="text-sm text-muted-foreground">{domain.domain}</p>
                      </div>
                      <Badge className={getStatusColor(domain.status)}>
                        {domain.status === 'active' ? 'نشط' : 
                         domain.status === 'pending' ? 'في الانتظار' : 'غير نشط'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">الموظفين:</span>
                        <span className="font-medium ml-2">{domain.employees}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                        <span className="font-medium ml-2">{domain.createdDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">آخر وصول:</span>
                        <span className="font-medium ml-2">{domain.lastAccess}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 ml-1" />
                        عرض
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="h-3 w-3 ml-1" />
                        زيارة الموقع
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب التكاملات والربط */}
        <TabsContent value="integrations" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">التكاملات والربط</h3>
            <p className="text-sm text-muted-foreground">ربط النظام مع الأنظمة والخدمات الخارجية</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <integration.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">{integration.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === 'connected' ? 'متصل' : 
                       integration.status === 'pending' ? 'في الانتظار' : 'غير متصل'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">آخر مزامنة:</span>
                      <span className="font-medium ml-2">{integration.lastSync}</span>
                    </div>
                    <div className="flex gap-2">
                      {integration.status === 'connected' ? (
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-3 w-3 ml-1" />
                          مزامنة
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleConnectIntegration(integration.name)}
                        >
                          <Plug className="h-3 w-3 ml-1" />
                          ربط
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 ml-1" />
                        إعدادات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                واجهات API والتطوير
              </CardTitle>
              <CardDescription>إعداد واجهات API والأدوات التطويرية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>مفتاح API الرئيسي</Label>
                  <div className="flex">
                    <Input value="boud_api_key_••••••••••••••••" readOnly className="rounded-l-md rounded-r-none" />
                    <Button variant="outline" className="rounded-l-none rounded-r-md">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhooks/boud" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 ml-2" />
                  وثائق API
                </Button>
                <Button variant="outline">
                  <Webhook className="h-4 w-4 ml-2" />
                  اختبار Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب الأمان والنسخ الاحتياطي */}
        <TabsContent value="security" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">الأمان والنسخ الاحتياطي</h3>
            <p className="text-sm text-muted-foreground">إعدادات الأمان والحماية والنسخ الاحتياطي</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية لجميع المستخدمين</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">انتهاء صلاحية الجلسة</Label>
                    <p className="text-sm text-muted-foreground">انهاء الجلسة تلقائياً بعد عدم النشاط</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 دقيقة</SelectItem>
                      <SelectItem value="30">30 دقيقة</SelectItem>
                      <SelectItem value="60">ساعة</SelectItem>
                      <SelectItem value="240">4 ساعات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">تسجيل العمليات</Label>
                    <p className="text-sm text-muted-foreground">حفظ سجل بجميع العمليات والتغييرات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">تشفير البيانات الحساسة</Label>
                    <p className="text-sm text-muted-foreground">تشفير الرواتب والبيانات الشخصية</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  النسخ الاحتياطي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>جدولة النسخ الاحتياطي</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">كل ساعة</SelectItem>
                      <SelectItem value="daily">يومياً</SelectItem>
                      <SelectItem value="weekly">أسبوعياً</SelectItem>
                      <SelectItem value="monthly">شهرياً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>آخر نسخة احتياطية</Label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">اليوم 03:00 ص - نجحت</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>حجم البيانات</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>قاعدة البيانات</span>
                      <span>2.4 GB</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل نسخة
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    نسخ الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                التنبيهات الأمنية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>محاولة دخول مشبوهة</AlertTitle>
                  <AlertDescription>
                    تم رصد محاولة دخول من عنوان IP غير مألوف (192.168.1.100) - منذ 2 ساعات
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>النظام محدث</AlertTitle>
                  <AlertDescription>
                    جميع التحديثات الأمنية مثبتة - آخر تحديث: 2024-03-15
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>شهادة SSL</AlertTitle>
                  <AlertDescription>
                    شهادة SSL ستنتهي خلال 30 يوم - تاريخ الانتهاء: 2024-04-20
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};