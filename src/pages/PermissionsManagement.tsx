import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Shield,
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Settings,
  Key,
  ArrowRight,
  ArrowLeft,
  Crown,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReportsSection } from '@/components/shared/ReportsSection';
import { AIAssistant } from '@/components/shared/AIAssistant';
import { toast } from 'sonner';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import headerLogo from '@/assets/header-logo.png';
import contentLogo from '@/assets/content-logo.png';

export const PermissionsManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('roles');
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  // Mock data for roles
  const roles = [
    {
      id: 1,
      name: 'مدير النظام',
      nameEn: 'System Admin',
      description: 'صلاحيات كاملة على جميع أقسام النظام',
      usersCount: 3,
      permissions: ['الكل'],
      isActive: true
    },
    {
      id: 2,
      name: 'مسؤول العملاء',
      nameEn: 'Client Manager',
      description: 'إدارة العملاء والاشتراكات فقط',
      usersCount: 8,
      permissions: ['العملاء', 'الاشتراكات'],
      isActive: true
    },
    {
      id: 3,
      name: 'مسؤول التقارير',
      nameEn: 'Reports Manager',
      description: 'الوصول إلى التقارير والتحليلات',
      usersCount: 5,
      permissions: ['التقارير', 'التحليلات'],
      isActive: true
    },
    {
      id: 4,
      name: 'الدعم الفني',
      nameEn: 'Technical Support',
      description: 'إدارة تذاكر الدعم والمشاكل التقنية',
      usersCount: 12,
      permissions: ['الدعم الفني', 'التذاكر'],
      isActive: true
    }
  ];

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@boudhr.com',
      role: 'مدير النظام',
      status: 'نشط',
      lastLogin: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'فاطمة علي الزهراني',
      email: 'fatima.alzahrani@boudhr.com',
      role: 'مسؤول العملاء',
      status: 'نشط',
      lastLogin: '2024-01-15 10:15'
    },
    {
      id: 3,
      name: 'خالد أحمد المالكي',
      email: 'khalid.malki@boudhr.com',
      role: 'مسؤول التقارير',
      status: 'معطل',
      lastLogin: '2024-01-10 16:45'
    }
  ];

  // Mock data for available permissions
  const availablePermissions = [
    { id: 1, name: 'لوحة التحكم', category: 'أساسي', icon: Settings },
    { id: 2, name: 'العملاء والاشتراكات', category: 'إدارة', icon: Users },
    { id: 3, name: 'إدارة النظام', category: 'إدارة', icon: Shield },
    { id: 4, name: 'مراقبة النظام', category: 'مراقبة', icon: Shield },
    { id: 5, name: 'التقارير والتحليلات', category: 'تقارير', icon: Settings },
    { id: 6, name: 'تطوير النظام', category: 'تطوير', icon: Settings },
    { id: 7, name: 'إعدادات الأمان', category: 'أمان', icon: Lock },
    { id: 8, name: 'الدعم الفني', category: 'دعم', icon: Users }
  ];

  const handleAddRole = () => {
    toast.success(isArabic ? 'تم إضافة الدور بنجاح' : 'Role added successfully');
    setIsAddRoleDialogOpen(false);
  };

  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsEditRoleDialogOpen(true);
  };

  const handleUpdateRole = () => {
    toast.success(isArabic ? 'تم تحديث الدور بنجاح' : 'Role updated successfully');
    setIsEditRoleDialogOpen(false);
  };

  const handleToggleRole = (role: any) => {
    toast.success(
      role.isActive 
        ? (isArabic ? 'تم تعطيل الدور' : 'Role disabled')
        : (isArabic ? 'تم تفعيل الدور' : 'Role enabled')
    );
  };

  const handleDeleteRole = (role: any) => {
    toast.success(isArabic ? 'تم حذف الدور' : 'Role deleted');
  };

  const handleAddUser = () => {
    toast.success(isArabic ? 'تم إضافة المستخدم بنجاح' : 'User added successfully');
    setIsAddUserDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/15 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b1a086" stop-opacity="0.6"/><stop offset="100%" stop-color="#b1a086" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Professional Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black/95 backdrop-blur-xl shadow-xl">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 h-20">
          <div className="flex items-center justify-between h-full relative z-10">
            {/* Right Section - Logo & Title */}
            <div className="flex items-center gap-6">
              <img 
                src={headerLogo} 
                alt="Buod HR" 
                className="h-56 w-auto object-contain filter brightness-110 transition-transform hover:scale-105" 
              />
              <div className="hidden md:flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  {isArabic ? 'إدارة الصلاحيات' : 'Permissions Management'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'إدارة الأدوار والصلاحيات للمستخدمين' : 'Manage Roles & User Permissions'}
                </p>
              </div>
            </div>

            {/* Left Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin-dashboard')}
                className="hidden sm:flex items-center gap-2 border-border hover:bg-accent/20 hover:border-accent/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden lg:inline">{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 hover:bg-accent/20 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="h-4 w-4 text-black" />
                    </div>
                    <ChevronDown className="h-3 w-3 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-black/95 backdrop-blur-xl border-border shadow-2xl"
                >
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    {isArabic ? 'الملف الشخصي' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {isArabic ? 'الإعدادات' : 'Settings'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="hover:bg-destructive/20 text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isArabic ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Content Logo */}
          <div className="flex justify-center mb-8">
            <img src={contentLogo} alt="Logo" className="h-32 w-32 object-contain" />
          </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-xl border border-border">
            <TabsTrigger
              value="roles"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              {isArabic ? 'الأدوار' : 'Roles'}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              {isArabic ? 'المستخدمين' : 'Users'}
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <Key className="h-4 w-4 mr-2" />
              {isArabic ? 'الصلاحيات' : 'Permissions'}
            </TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{isArabic ? 'الأدوار المتاحة' : 'Available Roles'}</CardTitle>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isArabic ? 'البحث عن دور...' : 'Search roles...'}
                        className="pl-10 w-64 border-border bg-black/20 text-white"
                      />
                    </div>
                    <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                          <UserPlus className="h-4 w-4 mr-2" />
                          {isArabic ? 'إضافة دور جديد' : 'Add New Role'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/95 border-border text-white">
                        <DialogHeader>
                          <DialogTitle>{isArabic ? 'إضافة دور جديد' : 'Add New Role'}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {isArabic ? 'قم بإنشاء دور جديد وتحديد الصلاحيات' : 'Create a new role and assign permissions'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>{isArabic ? 'اسم الدور (عربي)' : 'Role Name (Arabic)'}</Label>
                            <Input className="bg-black/20 border-border text-white" />
                          </div>
                          <div>
                            <Label>{isArabic ? 'اسم الدور (إنجليزي)' : 'Role Name (English)'}</Label>
                            <Input className="bg-black/20 border-border text-white" />
                          </div>
                          <div>
                            <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                            <Textarea className="bg-black/20 border-border text-white" />
                          </div>
                          <div>
                            <Label>{isArabic ? 'الصلاحيات' : 'Permissions'}</Label>
                            <div className="space-y-2 mt-2">
                              {availablePermissions.slice(0, 4).map((perm) => (
                                <div key={perm.id} className="flex items-center space-x-2 space-x-reverse">
                                  <Checkbox id={`perm-${perm.id}`} />
                                  <label htmlFor={`perm-${perm.id}`} className="text-sm">{perm.name}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)} className="border-border text-white">
                            {isArabic ? 'إلغاء' : 'Cancel'}
                          </Button>
                          <Button onClick={handleAddRole} className="bg-gradient-to-r from-accent to-accent text-black">
                            {isArabic ? 'حفظ' : 'Save'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                        <Shield className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{isArabic ? role.name : role.nameEn}</h4>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                            {role.usersCount} {isArabic ? 'مستخدم' : 'users'}
                          </Badge>
                          {role.isActive ? (
                            <Badge className="bg-success/10 text-success border-success/20">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {isArabic ? 'نشط' : 'Active'}
                            </Badge>
                          ) : (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                              <XCircle className="h-3 w-3 mr-1" />
                              {isArabic ? 'معطل' : 'Inactive'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border text-white hover:bg-accent/20"
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isArabic ? 'تعديل' : 'Edit'}
                      </Button>
                      {role.isActive ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-warning hover:bg-warning/20"
                          onClick={() => handleToggleRole(role)}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعطيل' : 'Disable'}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-success hover:bg-success/20"
                          onClick={() => handleToggleRole(role)}
                        >
                          <Unlock className="h-4 w-4 mr-2" />
                          {isArabic ? 'تفعيل' : 'Enable'}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border text-destructive hover:bg-destructive/20"
                        onClick={() => handleDeleteRole(role)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{isArabic ? 'المستخدمين' : 'Users'}</CardTitle>
                  <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                        <UserPlus className="h-4 w-4 mr-2" />
                        {isArabic ? 'إضافة مستخدم' : 'Add User'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/95 border-border text-white">
                      <DialogHeader>
                        <DialogTitle>{isArabic ? 'إضافة مستخدم جديد' : 'Add New User'}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          {isArabic ? 'قم بإضافة مستخدم جديد وتعيين الدور' : 'Add a new user and assign role'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>{isArabic ? 'الاسم الكامل' : 'Full Name'}</Label>
                          <Input className="bg-black/20 border-border text-white" />
                        </div>
                        <div>
                          <Label>{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
                          <Input type="email" className="bg-black/20 border-border text-white" />
                        </div>
                        <div>
                          <Label>{isArabic ? 'الدور' : 'Role'}</Label>
                          <Select>
                            <SelectTrigger className="bg-black/20 border-border text-white">
                              <SelectValue placeholder={isArabic ? 'اختر الدور' : 'Select role'} />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-border text-white">
                              {roles.map((role) => (
                                <SelectItem key={role.id} value={role.id.toString()}>
                                  {isArabic ? role.name : role.nameEn}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)} className="border-border text-white">
                          {isArabic ? 'إلغاء' : 'Cancel'}
                        </Button>
                        <Button onClick={handleAddUser} className="bg-gradient-to-r from-accent to-accent text-black">
                          {isArabic ? 'حفظ' : 'Save'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-accent/20 rounded-full flex items-center justify-center border border-accent/30">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                            {user.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {isArabic ? 'آخر دخول:' : 'Last login:'} {user.lastLogin}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {user.status === 'نشط' ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {isArabic ? 'نشط' : 'Active'}
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          <XCircle className="h-3 w-3 mr-1" />
                          {isArabic ? 'معطل' : 'Inactive'}
                        </Badge>
                      )}
                      <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                        <Edit className="h-4 w-4 mr-2" />
                        {isArabic ? 'تعديل' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <CardTitle className="text-white">{isArabic ? 'الصلاحيات المتاحة' : 'Available Permissions'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        <div className="p-2 bg-accent/20 rounded-lg border border-accent/30">
                          <permission.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{permission.name}</h4>
                          <p className="text-xs text-muted-foreground">{permission.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reports and AI Assistant Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ReportsSection
            title={isArabic ? 'تقارير الصلاحيات' : 'Permissions Reports'}
            description={isArabic ? 'تقارير تفصيلية عن الأدوار والصلاحيات' : 'Detailed reports on roles and permissions'}
          />
          <AIAssistant
            title={isArabic ? 'المساعد الذكي للصلاحيات' : 'Permissions AI Assistant'}
            placeholder={isArabic ? 'اسأل عن الصلاحيات والأدوار...' : 'Ask about permissions and roles...'}
          />
        </div>
        </div>
      </main>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent className="bg-black/95 border-border text-white">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'تعديل الدور' : 'Edit Role'}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isArabic ? 'قم بتعديل معلومات الدور وصلاحياته' : 'Edit role information and permissions'}
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <div>
                <Label>{isArabic ? 'اسم الدور (عربي)' : 'Role Name (Arabic)'}</Label>
                <Input defaultValue={selectedRole.name} className="bg-black/20 border-border text-white" />
              </div>
              <div>
                <Label>{isArabic ? 'اسم الدور (إنجليزي)' : 'Role Name (English)'}</Label>
                <Input defaultValue={selectedRole.nameEn} className="bg-black/20 border-border text-white" />
              </div>
              <div>
                <Label>{isArabic ? 'الوصف' : 'Description'}</Label>
                <Textarea defaultValue={selectedRole.description} className="bg-black/20 border-border text-white" />
              </div>
              <div>
                <Label>{isArabic ? 'الصلاحيات' : 'Permissions'}</Label>
                <div className="space-y-2 mt-2">
                  {availablePermissions.slice(0, 4).map((perm) => (
                    <div key={perm.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox id={`edit-perm-${perm.id}`} defaultChecked={selectedRole.permissions.includes(perm.name)} />
                      <label htmlFor={`edit-perm-${perm.id}`} className="text-sm">{perm.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)} className="border-border text-white">
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateRole} className="bg-gradient-to-r from-accent to-accent text-black">
              {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};