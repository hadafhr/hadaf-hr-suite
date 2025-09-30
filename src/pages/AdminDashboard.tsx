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
import headerLogo from '@/assets/header-logo.png';
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
import { AIInsightsDashboard } from '@/components/admin/AIInsightsDashboard';
import { SystemAnalytics } from '@/components/admin/SystemAnalytics';

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
    { label: isArabic ? 'إدارة النظام' : 'HR Management', icon: Users, route: '/hr-management' },
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>

      {/* Fixed Header - Full Width */}
      <header className="fixed top-0 right-0 left-0 z-50 h-20 bg-gradient-to-r from-black/95 via-card/95 to-black/95 backdrop-blur-xl border-b border-border shadow-2xl shadow-accent/20">
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 opacity-80"></div>
        
        <div className="relative z-10 h-full flex items-center justify-between px-6">
          {/* Right Section - Logo & Title */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-accent/20 p-2 rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <img 
                src={headerLogo} 
                alt="Buod HR" 
                className="h-12 w-12 object-contain filter brightness-110 transition-all duration-300 hover:scale-105"
              />
              <div className="hidden md:flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  {isArabic ? 'لوحة تحكم مدير النظام' : 'System Administrator'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'نظام إدارة متطور' : 'Advanced Management System'}
                </p>
              </div>
              <Badge className="text-xs bg-accent text-black px-2 py-1">ADMIN</Badge>
            </div>
          </div>

          {/* Center Section - System Status & Search */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-black/30 rounded-full border border-border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
              <span className="text-sm text-success font-medium">
                {isArabic ? 'النظام يعمل' : 'System Live'}
              </span>
            </div>
            
            <div className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث السريع...' : 'Quick search...'}
                className="pl-10 w-64 h-9 border-border focus:border-accent/50 bg-black/30 text-white placeholder:text-muted-foreground rounded-full backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Left Section - Actions & Profile */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* System Alerts */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-accent/20 p-2 rounded-full">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-destructive text-white rounded-full flex items-center justify-center">
                    {systemAlerts.filter(alert => alert.urgent).length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-black/95 backdrop-blur-xl border border-border text-white">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-white">{isArabic ? 'تنبيهات النظام' : 'System Alerts'}</h3>
                </div>
                {systemAlerts.map((alert) => (
                  <DropdownMenuItem key={alert.id} className="p-4 hover:bg-accent/20">
                    <div className="flex items-start space-x-3 space-x-reverse w-full">
                      {alert.type === 'warning' && <AlertCircle className="w-4 h-4 text-warning mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-success mt-0.5" />}
                      {alert.type === 'info' && <Clock className="w-4 h-4 text-accent mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-white">{alert.title}</p>
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
                <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-white hover:bg-accent/20 p-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-black" />
                  </div>
                  <ChevronDown className="h-4 w-4 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 backdrop-blur-xl border border-border text-white">
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  {isArabic ? 'تسجيل الخروج' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 top-20 right-0 z-40 w-64 bg-black/40 backdrop-blur-xl border-l border-border shadow-2xl shadow-accent/20 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:top-0`}>
          <nav className="mt-8 px-4 h-full overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.route)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-gradient-to-r from-accent to-accent text-black shadow-lg' 
                        : 'text-muted-foreground hover:text-white hover:bg-accent/20'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* AI Assistant Shortcut */}
            <div className="mt-8 mb-4">
              <Card className="p-4 bg-gradient-to-r from-accent/20 to-accent/20 border border-accent/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-white">{isArabic ? 'المساعد الذكي' : 'AI Assistant'}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {isArabic ? 'مراقبة ذكية للنظام' : 'Intelligent system monitoring'}
                </p>
                <Button size="sm" className="w-full bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                  {isArabic ? 'تفعيل' : 'Activate'}
                </Button>
              </Card>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-64">
          <main className="p-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isArabic ? 'مرحباً بك مدير النظام' : 'Welcome, System Administrator'}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {isArabic ? 'لوحة التحكم الشاملة المدعومة بالذكاء الاصطناعي لإدارة منصة بُعد' : 'AI-Powered comprehensive control panel for managing BuAD platform'}
                </p>
              </div>

              {/* System Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemStats.map((stat, index) => (
                  <Card key={index} className="p-6 backdrop-blur-xl bg-black/40 border border-border hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-full bg-gradient-to-r from-accent/20 to-accent/20 backdrop-blur-sm border border-accent/30">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-success mr-1" />
                      <span className="text-sm text-success font-medium">{stat.change}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* AI Insights Dashboard */}
              <AIInsightsDashboard />

              {/* System Analytics */}
              <SystemAnalytics />

              {/* Additional Content... */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Real-time Monitoring */}
                <Card className="p-6 backdrop-blur-xl bg-black/40 border border-border rounded-2xl">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <Monitor className="h-6 w-6 text-accent" />
                    <h3 className="text-lg font-semibold text-white">
                      {isArabic ? 'مراقبة النظام في الوقت الفعلي' : 'Real-time System Monitoring'}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="font-medium text-white">{isArabic ? 'استخدام الخادم' : 'Server Usage'}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-success">23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="font-medium text-white">{isArabic ? 'قاعدة البيانات' : 'Database Load'}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-warning">67%</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 backdrop-blur-xl bg-black/40 border border-border rounded-2xl">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                    <h3 className="text-lg font-semibold text-white">
                      {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                      <Plus className="h-4 w-4 mr-2" />
                      {isArabic ? 'عميل جديد' : 'Add Client'}
                    </Button>
                    <Button variant="outline" className="border-border text-white hover:bg-accent/20">
                      <Settings className="h-4 w-4 mr-2" />
                      {isArabic ? 'إعدادات' : 'Settings'}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};