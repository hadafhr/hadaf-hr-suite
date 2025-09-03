import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users, Building, CreditCard, TrendingUp, Settings, LogOut,
  Shield, Database, Activity, AlertCircle, CheckCircle, Clock,
  DollarSign, Globe, Search, Filter, Plus, Download, Menu, X, Bell
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { BoudLogo } from '@/components/BoudLogo';

export const SuperAdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const systemStats = [
    {
      title: isArabic ? 'إجمالي العملاء' : 'Total Clients',
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

  const adminActions = [
    {
      title: isArabic ? 'إدارة الاشتراكات' : 'Subscription Management',
      description: isArabic ? 'تفعيل وإيقاف وتجديد الاشتراكات' : 'Activate, suspend, and renew subscriptions',
      icon: CreditCard,
      action: () => console.log('Manage subscriptions'),
      color: 'bg-primary'
    },
    {
      title: isArabic ? 'إدارة العملاء' : 'Client Management',
      description: isArabic ? 'إضافة وحذف المنشآت وإعادة ضبط الحسابات' : 'Add/remove companies and reset accounts',
      icon: Users,
      action: () => console.log('Manage clients'),
      color: 'bg-blue-600'
    },
    {
      title: isArabic ? 'تطوير الأنظمة' : 'System Development',
      description: isArabic ? 'التحكم في الميزات والتطوير' : 'Feature control and development',
      icon: Database,
      action: () => console.log('System dev'),
      color: 'bg-green-600'
    },
    {
      title: isArabic ? 'التقارير والتحليلات' : 'Reports & Analytics',
      description: isArabic ? 'إحصائيات الاستخدام والبيانات المالية' : 'Usage statistics and financial data',
      icon: TrendingUp,
      action: () => console.log('Reports'),
      color: 'bg-orange-600'
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

  const clientStats = [
    { name: isArabic ? 'شركة الراجحي' : 'Al Rajhi Company', employees: 2500, status: 'active', plan: 'Enterprise' },
    { name: isArabic ? 'شركة أرامكو' : 'Aramco', employees: 5000, status: 'active', plan: 'Enterprise+' },
    { name: isArabic ? 'البنك الأهلي' : 'National Bank', employees: 1200, status: 'active', plan: 'Professional' },
    { name: isArabic ? 'شركة سابك' : 'SABIC', employees: 3200, status: 'pending', plan: 'Enterprise' }
  ];

  const sidebarItems = [
    { icon: Shield, label: isArabic ? 'لوحة التحكم' : 'Dashboard', active: true },
    { icon: Building, label: isArabic ? 'إدارة العملاء' : 'Client Management' },
    { icon: CreditCard, label: isArabic ? 'الاشتراكات' : 'Subscriptions' },
    { icon: TrendingUp, label: isArabic ? 'التقارير' : 'Reports' },
    { icon: Database, label: isArabic ? 'النظام' : 'System' },
    { icon: Settings, label: isArabic ? 'الإعدادات' : 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 ${isArabic ? 'right-0' : 'left-0'} z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : isArabic ? 'translate-x-full' : '-translate-x-full'
      } lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b bg-primary/5">
            <BoudLogo variant="full" size="sm" />
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">{isArabic ? 'إدارة بُعد' : 'BuAD Admin'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start ${isArabic ? 'flex-row-reverse' : ''}`}
                onClick={() => console.log(`Navigate to ${item.label}`)}
              >
                <item.icon className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t bg-primary/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">{isArabic ? 'مدير النظام' : 'System Admin'}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => signOut()}
            >
              <LogOut className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'تسجيل الخروج' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`lg:${isArabic ? 'mr-64' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {isArabic ? 'لوحة تحكم الإدارة العليا' : 'Super Admin Dashboard'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'إدارة شاملة لمنصة بُعد والعملاء' : 'Comprehensive management of BuAD platform and clients'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <span className="sr-only">{isArabic ? 'الإشعارات' : 'Notifications'}</span>
            </Button>
            <LanguageSwitcher />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {isArabic ? 'مرحباً بك في لوحة إدارة بُعد' : 'Welcome to BuAD Admin Panel'}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {isArabic ? 'التحكم الشامل في منصة بُعد، إدارة العملاء، والاشتراكات' : 'Complete control of BuAD platform, client management, and subscriptions'}
            </p>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow border-l-4 border-l-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} {isArabic ? 'من الشهر الماضي' : 'from last month'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Admin Actions & System Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  {isArabic ? 'الإجراءات الإدارية' : 'Admin Actions'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'الوصول السريع للمهام الإدارية الأساسية' : 'Quick access to essential admin tasks'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminActions.map((action, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  {isArabic ? 'تنبيهات النظام' : 'System Alerts'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'آخر التنبيهات والتحديثات في النظام' : 'Latest system alerts and updates'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'success' ? 'bg-green-500' :
                      alert.severity === 'warning' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Client Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {isArabic ? 'نظرة عامة على العملاء' : 'Client Overview'}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'أهم العملاء وحالة اشتراكاتهم' : 'Top clients and their subscription status'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientStats.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {client.employees} {isArabic ? 'موظف' : 'employees'} • {client.plan}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        client.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {client.status === 'active' 
                          ? (isArabic ? 'نشط' : 'Active')
                          : (isArabic ? 'معلق' : 'Pending')
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};