import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, Building, Clock, DollarSign, TrendingUp, Settings, LogOut,
  Shield, Activity, AlertCircle, CheckCircle, Search, Filter, Plus, 
  Download, Menu, X, Bell, BarChart3, ChevronDown, ArrowLeft,
  Calendar, FileText, Award, BookOpen, MessageSquare, Target
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { BoudLogo } from '@/components/BoudLogo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export const HRManagementSystem: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const hrModules = [
    {
      title: isArabic ? 'إدارة الموظفين' : 'Employee Management',
      description: isArabic ? 'إدارة شاملة للموظفين والملفات الشخصية' : 'Comprehensive employee and profile management',
      icon: Users,
      route: '/comprehensive-employee-management',
      color: 'bg-primary',
      active: true
    }
  ];

  const systemStats = [
    {
      title: isArabic ? 'إجمالي الموظفين' : 'Total Employees',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: isArabic ? 'معدل الحضور' : 'Attendance Rate',
      value: '96.8%',
      change: '+2.1%',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: isArabic ? 'الطلبات المعلقة' : 'Pending Requests',
      value: '23',
      change: '-15%',
      icon: FileText,
      color: 'text-orange-500'
    },
    {
      title: isArabic ? 'رضا الموظفين' : 'Employee Satisfaction',
      value: '8.7/10',
      change: '+0.3',
      icon: Award,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center space-x-2 space-x-reverse"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isArabic ? 'رجوع' : 'Back'}</span>
          </Button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">
              {isArabic ? 'نظام إدارة الموارد البشرية' : 'HR Management System'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={isArabic ? 'البحث في النظام...' : 'Search system...'}
              className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {isArabic ? 'تسجيل الخروج' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isArabic ? 'مرحباً بك في نظام إدارة الموارد البشرية' : 'Welcome to HR Management System'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isArabic ? 'النظام الشامل لإدارة جميع عمليات الموارد البشرية في منصة بُعد' : 'Comprehensive system for managing all HR operations in Boud platform'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> {isArabic ? 'من الشهر الماضي' : 'from last month'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* HR Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {isArabic ? 'وحدات النظام' : 'System Modules'}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'جميع وحدات نظام إدارة الموارد البشرية المتاحة' : 'All available HR management system modules'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {hrModules.map((module, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-24 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50 ${
                      !module.active ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => module.active && navigate(module.route)}
                    disabled={!module.active}
                  >
                    <div className={`w-8 h-8 rounded-full ${module.color} flex items-center justify-center`}>
                      <module.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs text-center font-medium">{module.title}</span>
                    {!module.active && (
                      <Badge variant="secondary" className="text-xs">
                        {isArabic ? 'قريباً' : 'Coming Soon'}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {isArabic ? 'معلومات النظام' : 'System Information'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'معلومات تقنية حول نظام إدارة الموارد البشرية' : 'Technical information about the HR management system'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? 'إصدار النظام' : 'System Version'}</span>
                    <Badge>v3.2.1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? 'الوحدات النشطة' : 'Active Modules'}</span>
                    <Badge variant="outline">5 / 8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? 'آخر تحديث' : 'Last Update'}</span>
                    <Badge variant="secondary">{isArabic ? '15 دقيقة' : '15 min ago'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? 'حالة النظام' : 'System Status'}</span>
                    <Badge className="bg-green-600">{isArabic ? 'نشط' : 'Active'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? 'قاعدة البيانات' : 'Database'}</span>
                    <Badge className="bg-green-600">{isArabic ? 'متصلة' : 'Connected'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {isArabic ? 'تم إضافة موظف جديد' : 'New employee added'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'منذ 10 دقائق' : '10 minutes ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {isArabic ? 'تمت معالجة طلب إجازة' : 'Leave request processed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'منذ 25 دقيقة' : '25 minutes ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {isArabic ? 'تحديث بيانات الحضور' : 'Attendance data updated'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'منذ ساعة' : '1 hour ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {isArabic ? 'تم إنتاج تقرير الرواتب' : 'Payroll report generated'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isArabic ? 'منذ ساعتين' : '2 hours ago'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRManagementSystem;