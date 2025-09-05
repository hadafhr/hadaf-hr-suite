import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Users, UserCheck, Calendar, Clock, DollarSign, FileText,
  Bell, Settings, LogOut, Building2, Menu, X, User, CheckCircle,
  BarChart3, Plus, Search, ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { BoudLogo } from '@/components/BoudLogo';
import { useNavigate } from 'react-router-dom';

export const CompanyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  // Mock company data
  const companyStats = [
    { label: isArabic ? 'إجمالي الموظفين' : 'Total Employees', value: '247', icon: Users, color: 'text-blue-500' },
    { label: isArabic ? 'الأقسام' : 'Departments', value: '12', icon: Building2, color: 'text-green-500' },
    { label: isArabic ? 'الطلبات المعلقة' : 'Pending Requests', value: '8', icon: Clock, color: 'text-orange-500' },
    { label: isArabic ? 'نسبة الحضور' : 'Attendance Rate', value: '95%', icon: CheckCircle, color: 'text-emerald-500' }
  ];

  const sidebarItems = [
    { label: isArabic ? 'لوحة التحكم' : 'Dashboard', icon: BarChart3, route: '/company-dashboard', active: true },
    { label: isArabic ? 'إدارة الموظفين' : 'Employee Management', icon: Users, route: '/comprehensive-employee-management' },
    { label: isArabic ? 'الحضور والغياب' : 'Attendance', icon: Clock, route: '/attendance-management' },
    { label: isArabic ? 'الرواتب' : 'Payroll', icon: DollarSign, route: '/payroll-management' },
    { label: isArabic ? 'الطلبات' : 'Requests', icon: FileText, route: '/employee-requests' },
    { label: isArabic ? 'التقارير' : 'Reports', icon: BarChart3, route: '/reports-analytics' },
    { label: isArabic ? 'الإعدادات' : 'Settings', icon: Settings, route: '/system-settings' }
  ];

  const quickActions = [
    { label: isArabic ? 'إضافة موظف' : 'Add Employee', icon: Plus, color: 'bg-blue-500', route: '/add-employee' },
    { label: isArabic ? 'طلب إجازة' : 'Leave Request', icon: Calendar, color: 'bg-green-500', route: '/employee/leave-request' },
    { label: isArabic ? 'تقرير جديد' : 'New Report', icon: FileText, color: 'bg-purple-500', route: '/reports-analytics' },
    { label: isArabic ? 'إعدادات النظام' : 'System Settings', icon: Settings, color: 'bg-gray-500', route: '/system-settings' }
  ];

  const recentActivities = [
    { id: 1, type: isArabic ? 'تعيين موظف' : 'Employee Hired', description: isArabic ? 'تم تعيين أحمد محمد في قسم التقنية' : 'Ahmed Mohammed hired in IT Department', time: isArabic ? 'منذ ساعتين' : '2 hours ago' },
    { id: 2, type: isArabic ? 'طلب إجازة' : 'Leave Request', description: isArabic ? 'فاطمة أحمد طلبت إجازة أسبوعية' : 'Fatima Ahmed requested week leave', time: isArabic ? 'منذ 3 ساعات' : '3 hours ago' },
    { id: 3, type: isArabic ? 'تحديث راتب' : 'Salary Update', description: isArabic ? 'تم تحديث راتب محمد علي' : 'Mohammed Ali salary updated', time: isArabic ? 'منذ 5 ساعات' : '5 hours ago' }
  ];

  const notifications = [
    { id: 1, title: isArabic ? 'طلب إجازة جديد' : 'New Leave Request', description: isArabic ? 'يحتاج للموافقة' : 'Needs approval', urgent: true },
    { id: 2, title: isArabic ? 'تحديث النظام' : 'System Update', description: isArabic ? 'متاح الآن' : 'Available now', urgent: false },
    { id: 3, title: isArabic ? 'تقرير شهري' : 'Monthly Report', description: isArabic ? 'جاهز للمراجعة' : 'Ready for review', urgent: false }
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-sm border-r border-border transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 border-b border-border">
          <BoudLogo variant="full" size="md" />
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(item.route)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
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
            <h1 className="text-xl font-semibold text-foreground">
              {isArabic ? 'لوحة التحكم الرئيسية' : 'Company Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث...' : 'Search...'}
                className="pl-10 w-64"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{isArabic ? 'الإشعارات' : 'Notifications'}</h3>
                </div>
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="p-4">
                    <div className="flex items-start space-x-3 space-x-reverse w-full">
                      {notif.urgent && <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">{notif.description}</p>
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
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/employee/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  {isArabic ? 'الملف الشخصي' : 'Profile'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/system-settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  {isArabic ? 'الإعدادات' : 'Settings'}
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {isArabic ? 'مرحباً بك' : 'Welcome back'}, {user?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-muted-foreground">
                {isArabic ? 'إليك نظرة سريعة على أداء شركتك اليوم' : "Here's what's happening with your company today"}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyStats.map((stat, index) => (
                <Card key={index} className="p-6 backdrop-blur-sm bg-background/80 border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-muted/50"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Recent Activities & Calendar */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {isArabic ? 'آخر الأنشطة' : 'Recent Activities'}
                  </h3>
                  <Button variant="ghost" size="sm">
                    {isArabic ? 'عرض الكل' : 'View All'}
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Hijri & Gregorian Calendar */}
              <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {isArabic ? 'التقويم' : 'Calendar'}
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{isArabic ? 'التاريخ الهجري' : 'Hijri Date'}</p>
                    <p className="text-lg font-semibold">١٥ صفر ١٤٤٦</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{isArabic ? 'التاريخ الميلادي' : 'Gregorian Date'}</p>
                    <p className="text-lg font-semibold">{new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</p>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => navigate('/employee/attendance')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    {isArabic ? 'تسجيل الحضور' : 'Mark Attendance'}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Employee Self-Service Links */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'الخدمات الذاتية للموظفين' : 'Employee Self-Service'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center space-y-1"
                  onClick={() => navigate('/employee/attendance')}
                >
                  <Clock className="h-5 w-5" />
                  <span className="text-xs">{isArabic ? 'الحضور' : 'Attendance'}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center space-y-1"
                  onClick={() => navigate('/employee/payroll')}
                >
                  <DollarSign className="h-5 w-5" />
                  <span className="text-xs">{isArabic ? 'الراتب' : 'Payroll'}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center space-y-1"
                  onClick={() => navigate('/employee/leave-request')}
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">{isArabic ? 'الإجازات' : 'Leave'}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center space-y-1"
                  onClick={() => navigate('/employee/profile')}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
                </Button>
              </div>
            </Card>
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