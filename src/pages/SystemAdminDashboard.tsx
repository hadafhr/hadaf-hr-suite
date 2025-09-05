import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, Building, CreditCard, TrendingUp, Settings, LogOut,
  Shield, Database, Activity, AlertCircle, CheckCircle, Clock,
  DollarSign, Globe, Search, Filter, Plus, Download, Menu, X, Bell,
  BarChart3, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { BoudLogo } from '@/components/BoudLogo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export const SystemAdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  const systemStats = [
    {
      title: isArabic ? 'إجمالي المنشآت' : 'Total Companies',
      value: '1,247',
      change: '+18%',
      icon: Building,
      color: 'text-primary'
    },
    {
      title: isArabic ? 'الاشتراكات النشطة' : 'Active Subscriptions',
      value: '1,156',
      change: '+12%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: '2.4M ر.س',
      change: '+25%',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      title: isArabic ? 'استخدام النظام' : 'System Usage',
      value: '94.2%',
      change: '+2.1%',
      icon: Activity,
      color: 'text-blue-600'
    }
  ];


  const systemManagement = [
    {
      title: isArabic ? 'إدارة الاشتراكات' : 'Subscription Management',
      description: isArabic ? 'إدارة اشتراكات العملاء والفواتير' : 'Client subscription and billing management',
      icon: CreditCard,
      route: '/subscription-management',
      color: 'bg-orange-600'
    },
    {
      title: isArabic ? 'إدارة المنشآت' : 'Client Companies Management',
      description: isArabic ? 'إضافة وحذف المنشآت وإعادة الضبط' : 'Add/remove companies and account reset',
      icon: Building,
      route: '/client-companies-management',
      color: 'bg-indigo-600'
    },
    {
      title: isArabic ? 'الإعدادات العامة' : 'General System Settings',
      description: isArabic ? 'النطاقات، التكامل، السياسات العامة' : 'Domains, integrations, general policies',
      icon: Settings,
      route: '/system-settings',
      color: 'bg-gray-600'
    },
    {
      title: isArabic ? 'التقارير والتحليلات' : 'System Reports & Analytics',
      description: isArabic ? 'تحليلات الاستخدام والبيانات المالية' : 'Usage analytics and financial data',
      icon: Database,
      route: '/system-reports-analytics',
      color: 'bg-teal-600'
    }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      title: isArabic ? 'خادم قاعدة البيانات' : 'Database Server',
      message: isArabic ? 'استخدام عالي للذاكرة - 85%' : 'High memory usage - 85%',
      time: isArabic ? 'منذ 5 دقائق' : '5 minutes ago',
      severity: 'warning'
    },
    {
      type: 'info',
      title: isArabic ? 'تحديث النظام' : 'System Update',
      message: isArabic ? 'تم تطبيق التحديث v2.1.3 بنجاح' : 'Update v2.1.3 applied successfully',
      time: isArabic ? 'منذ ساعة' : '1 hour ago',
      severity: 'success'
    },
    {
      type: 'error',
      title: isArabic ? 'فشل في المصادقة' : 'Authentication Failure',
      message: isArabic ? 'محاولات دخول مشبوهة من IP 192.168.1.100' : 'Suspicious login attempts from IP 192.168.1.100',
      time: isArabic ? 'منذ 30 دقيقة' : '30 minutes ago',
      severity: 'error'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-sm border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 border-b border-border">
          <BoudLogo variant="full" size="md" />
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-8">

            {/* System Management Section */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {isArabic ? 'إدارة النظام' : 'System Management'}
              </h3>
              <div className="mt-3 space-y-1">
                {systemManagement.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(section.route)}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <section.icon className="ml-3 h-4 w-4" />
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">
                {isArabic ? 'لوحة تحكم النظام' : 'System Admin Dashboard'}
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

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{isArabic ? 'تنبيهات النظام' : 'System Alerts'}</h3>
                </div>
                {recentAlerts.map((alert, index) => (
                  <DropdownMenuItem key={index} className="p-4">
                    <div className="flex items-start space-x-3 space-x-reverse w-full">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'error' ? 'bg-red-500' :
                        alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {isArabic ? 'مرحباً بك في لوحة تحكم النظام' : 'Welcome to System Admin Dashboard'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isArabic ? 'لوحة التحكم الرئيسية لمزود الخدمة - إدارة شاملة لجميع الأنظمة والمنشآت' : 'Main control panel for service provider - Comprehensive management of all systems and companies'}
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
                      <span className="text-green-600">{stat.change}</span> من الشهر الماضي
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>


            {/* System Management Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  {isArabic ? 'إدارة النظام والعملاء' : 'System & Client Management'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'الإعدادات العامة وإدارة الاشتراكات والمنشآت' : 'General settings, subscription and company management'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {systemManagement.map((section, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50"
                      onClick={() => navigate(section.route)}
                    >
                      <div className={`w-8 h-8 rounded-full ${section.color} flex items-center justify-center`}>
                        <section.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs text-center">{section.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Info */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {isArabic ? 'معلومات منصة بُعد HR' : 'Boud HR Platform Info'}
                  </CardTitle>
                  <CardDescription>
                    {isArabic ? 'معلومات عامة حول منصة بُعد للموارد البشرية' : 'General information about Boud HR Platform'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'إصدار النظام' : 'System Version'}</span>
                      <Badge>v2.1.3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'بيئة التشغيل' : 'Environment'}</span>
                      <Badge variant="outline">Production</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'الأنظمة الفرعية' : 'Subsystems'}</span>
                      <Badge variant="secondary">22</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'التكامل الحكومي' : 'Government Integration'}</span>
                      <Badge className="bg-green-600">متصل</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'حالة قاعدة البيانات' : 'Database Status'}</span>
                      <Badge className="bg-green-600">{isArabic ? 'نشط' : 'Active'}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{isArabic ? 'مزود الخدمة' : 'Service Provider'}</span>
                      <Badge className="bg-primary text-primary-foreground">بُعد HR</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    {isArabic ? 'تنبيهات النظام' : 'System Alerts'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start space-x-3 space-x-reverse">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          alert.severity === 'error' ? 'bg-red-500' :
                          alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};