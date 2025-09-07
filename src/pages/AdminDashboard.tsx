import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Shield,
  User,
  LogOut,
  ChevronDown,
  Menu,
  Database,
  Globe,
  Zap,
  Crown,
  RefreshCw,
  Monitor,
  Server
} from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { SystemMonitoring } from '@/components/admin/SystemMonitoring';
import { ClientManagement } from '@/components/admin/ClientManagement';
import { SubscriptionManagement } from '@/components/admin/SubscriptionManagement';
import { HRManagementSystem } from '@/components/admin/HRManagementSystem';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  // Mock super admin data
  const systemStats = [
    { label: isArabic ? 'العملاء النشطون' : 'Active Clients', value: '156', icon: Building2, color: 'text-blue-500', change: '+12%' },
    { label: isArabic ? 'إجمالي المستخدمين' : 'Total Users', value: '12,847', icon: Users, color: 'text-green-500', change: '+8%' },
    { label: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue', value: '₺2.4M', icon: DollarSign, color: 'text-purple-500', change: '+15%' },
    { label: isArabic ? 'معدل التشغيل' : 'System Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500', change: 'Stable' }
  ];

  const sidebarItems = [
    { label: isArabic ? 'لوحة التحكم' : 'Dashboard', icon: BarChart3, route: '/admin-dashboard', active: true },
    { label: isArabic ? 'إدارة العملاء' : 'Client Management', icon: Building2, route: '/client-management' },
    { label: isArabic ? 'مراقبة النظام' : 'System Monitoring', icon: Monitor, route: '/system-monitoring' },
    { label: isArabic ? 'إدارة الاشتراكات' : 'Subscription Management', icon: Crown, route: '/subscription-management' },
    { label: isArabic ? 'التقارير والتحليلات' : 'Reports & Analytics', icon: BarChart3, route: '/admin-analytics' },
    { label: isArabic ? 'تطوير النظام' : 'System Development', icon: Zap, route: '/system-development' },
    { label: isArabic ? 'إعدادات الأمان' : 'Security Settings', icon: Shield, route: '/security-settings' }
  ];

  // Mock data for charts
  const clientGrowthData = [
    { month: 'Jan', clients: 45, revenue: 180000 },
    { month: 'Feb', clients: 52, revenue: 208000 },
    { month: 'Mar', clients: 61, revenue: 244000 },
    { month: 'Apr', clients: 78, revenue: 312000 },
    { month: 'May', clients: 95, revenue: 380000 },
    { month: 'Jun', clients: 120, revenue: 480000 },
    { month: 'Jul', clients: 134, revenue: 536000 },
    { month: 'Aug', clients: 156, revenue: 624000 }
  ];

  const subscriptionData = [
    { name: 'Basic', value: 45, color: '#3b82f6' },
    { name: 'Professional', value: 78, color: '#10b981' },
    { name: 'Enterprise', value: 33, color: '#f59e0b' }
  ];

  const recentClients = [
    { name: 'شركة النور للتقنية', employees: 150, status: 'Active', plan: 'Enterprise' },
    { name: 'مؤسسة الأمل', employees: 75, status: 'Active', plan: 'Professional' },
    { name: 'شركة المستقبل', employees: 200, status: 'Pending', plan: 'Enterprise' },
    { name: 'مكتب الإبداع', employees: 30, status: 'Active', plan: 'Basic' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', title: isArabic ? 'استخدام عالي للخادم' : 'High Server Usage', description: '85% CPU usage detected', urgent: true },
    { id: 2, type: 'info', title: isArabic ? 'عميل جديد' : 'New Client Registration', description: 'Pending approval', urgent: false },
    { id: 3, type: 'success', title: isArabic ? 'تم التحديث' : 'System Updated', description: 'Version 2.1.5 deployed', urgent: false }
  ];

  return (
    <div className="min-h-screen bg-background flex relative">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-sm border-r border-border transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 border-b border-border px-4">
          <BoudLogo variant="full" size="md" />
          <Badge variant="destructive" className="text-xs">ADMIN</Badge>
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

        {/* AI Assistant Shortcut */}
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{isArabic ? 'المساعد الذكي' : 'AI Assistant'}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {isArabic ? 'مراقبة ذكية للنظام' : 'Intelligent system monitoring'}
            </p>
            <Button size="sm" className="w-full">
              {isArabic ? 'تفعيل' : 'Activate'}
            </Button>
          </Card>
        </div>
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
            <div className="flex items-center space-x-2 space-x-reverse">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">
                {isArabic ? 'لوحة تحكم مدير النظام' : 'System Administrator Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            {/* System Status */}
            <div className="hidden md:flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {isArabic ? 'النظام يعمل بشكل طبيعي' : 'System Operational'}
              </span>
            </div>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث في النظام...' : 'Search system...'}
                className="pl-10 w-64"
              />
            </div>

            {/* System Alerts */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                    {systemAlerts.filter(alert => alert.urgent).length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{isArabic ? 'تنبيهات النظام' : 'System Alerts'}</h3>
                </div>
                {systemAlerts.map((alert) => (
                  <DropdownMenuItem key={alert.id} className="p-4">
                    <div className="flex items-start space-x-3 space-x-reverse w-full">
                      {alert.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                      {alert.type === 'info' && <Clock className="w-4 h-4 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
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
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  {isArabic ? 'الملف الشخصي' : 'Admin Profile'}
                </DropdownMenuItem>
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {isArabic ? 'مرحباً بك مدير النظام' : 'Welcome, System Administrator'}
              </h2>
              <p className="text-muted-foreground">
                {isArabic ? 'لوحة التحكم الشاملة لإدارة منصة بُعد والعملاء والاشتراكات' : 'Comprehensive control panel for managing BuAD platform, clients, and subscriptions'}
              </p>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index} className="p-6 backdrop-blur-sm bg-background/80 border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                <TabsTrigger value="clients">{isArabic ? 'العملاء' : 'Clients'}</TabsTrigger>
                <TabsTrigger value="monitoring">{isArabic ? 'مراقبة النظام' : 'System Monitor'}</TabsTrigger>
                <TabsTrigger value="subscriptions">{isArabic ? 'الاشتراكات' : 'Subscriptions'}</TabsTrigger>
                <TabsTrigger value="hr-management">{isArabic ? 'إدارة النظام' : 'System Management'}</TabsTrigger>
                <TabsTrigger value="development">{isArabic ? 'التطوير' : 'Development'}</TabsTrigger>
                <TabsTrigger value="analytics">{isArabic ? 'التحليلات' : 'Analytics'}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Client Growth Chart */}
                  <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {isArabic ? 'نمو العملاء' : 'Client Growth'}
                      </h3>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {isArabic ? 'تحديث' : 'Refresh'}
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={clientGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="clients" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name={isArabic ? 'العملاء' : 'Clients'}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Revenue Chart */}
                  <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
                      </h3>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        {isArabic ? 'تفاصيل' : 'Details'}
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={clientGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, isArabic ? 'الإيرادات' : 'Revenue']} />
                        <Bar 
                          dataKey="revenue" 
                          fill="hsl(var(--primary))" 
                          name={isArabic ? 'الإيرادات' : 'Revenue'}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="clients" className="space-y-6">
                <ClientManagement />
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <SystemMonitoring />
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-6">
                <SubscriptionManagement />
              </TabsContent>

              <TabsContent value="hr-management" className="space-y-6">
                <HRManagementSystem />
              </TabsContent>

              <TabsContent value="development" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {isArabic ? 'تطوير النظام' : 'System Development'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isArabic ? 'أدوات تطوير النظام والميزات الجديدة' : 'System development tools and new features'}
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {isArabic ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isArabic ? 'تحليلات متقدمة ومعلومات إحصائية شاملة' : 'Advanced analytics and comprehensive statistical insights'}
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};