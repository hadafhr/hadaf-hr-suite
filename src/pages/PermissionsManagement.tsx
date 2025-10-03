import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Key
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ReportsSection } from '@/components/shared/ReportsSection';
import { AIAssistant } from '@/components/shared/AIAssistant';

export const PermissionsManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('roles');

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

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isArabic ? 'إدارة الصلاحيات' : 'Permissions Management'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isArabic ? 'إدارة الأدوار والصلاحيات للمستخدمين' : 'Manage roles and permissions for users'}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
            <UserPlus className="h-4 w-4 mr-2" />
            {isArabic ? 'إضافة دور جديد' : 'Add New Role'}
          </Button>
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
                        placeholder={isArabic ? 'البحث عن دور...' : 'Search roles...'}
                        className="pl-10 w-64 border-border bg-black/20 text-white"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                      <Filter className="h-4 w-4 mr-2" />
                      {isArabic ? 'تصفية' : 'Filter'}
                    </Button>
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
                      <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                        <Edit className="h-4 w-4 mr-2" />
                        {isArabic ? 'تعديل' : 'Edit'}
                      </Button>
                      {role.isActive ? (
                        <Button variant="outline" size="sm" className="border-border text-warning hover:bg-warning/20">
                          <Lock className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعطيل' : 'Disable'}
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-border text-success hover:bg-success/20">
                          <Unlock className="h-4 w-4 mr-2" />
                          {isArabic ? 'تفعيل' : 'Enable'}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-border text-destructive hover:bg-destructive/20">
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
                  <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isArabic ? 'إضافة مستخدم' : 'Add User'}
                  </Button>
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
    </div>
  );
};