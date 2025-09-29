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
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-black/40 backdrop-blur-xl border-l border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 border-b border-[#008C6A]/30 px-4">
          <BoudLogo variant="full" size="md" />
          <Badge className="text-xs bg-[#008C6A] text-white">ADMIN</Badge>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(item.route)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-[#008C6A]/20'
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
          <Card className="p-4 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 border border-[#008C6A]/30 backdrop-blur-sm">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Zap className="h-4 w-4 text-[#008C6A]" />
              <span className="text-sm font-medium text-white">{isArabic ? 'المساعد الذكي' : 'AI Assistant'}</span>
            </div>
            <p className="text-xs text-gray-300 mb-2">
              {isArabic ? 'مراقبة ذكية للنظام' : 'Intelligent system monitoring'}
            </p>
            <Button size="sm" className="w-full bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#008C6A]/80 hover:to-[#00694F]/80 text-white">
              {isArabic ? 'تفعيل' : 'Activate'}
            </Button>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 h-24 flex items-center justify-between px-6" style={{ marginTop: '64px' }}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
          </div>
          <div className="flex items-center relative z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-2 text-white hover:bg-[#008C6A]/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="relative">
                <Shield className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'لوحة تحكم مدير النظام' : 'System Administrator Dashboard'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'نظام إدارة الموارد البشرية المتطور' : 'Advanced HR Management System'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse relative z-10">
            {/* System Status */}
            <div className="hidden md:flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm text-green-300 font-semibold">
                {isArabic ? 'النظام يعمل بشكل طبيعي' : 'System Operational'}
              </span>
            </div>

            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={isArabic ? 'البحث في النظام...' : 'Search system...'}
                className="pl-10 w-64 border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm"
              />
            </div>

            {/* System Alerts */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-[#008C6A]/20">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                    {systemAlerts.filter(alert => alert.urgent).length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
                <div className="p-4 border-b border-[#008C6A]/30">
                  <h3 className="font-semibold text-white">{isArabic ? 'تنبيهات النظام' : 'System Alerts'}</h3>
                </div>
                {systemAlerts.map((alert) => (
                  <DropdownMenuItem key={alert.id} className="p-4 hover:bg-[#008C6A]/20">
                    <div className="flex items-start space-x-3 space-x-reverse w-full">
                      {alert.type === 'warning' && <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                      {alert.type === 'info' && <Clock className="w-4 h-4 text-blue-500 mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-white">{alert.title}</p>
                        <p className="text-xs text-gray-300">{alert.description}</p>
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
                <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-white hover:bg-[#008C6A]/20">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#008C6A] to-[#00694F] rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border border-[#008C6A]/30 text-white">
                <DropdownMenuSeparator className="bg-[#008C6A]/30" />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-[#008C6A]/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  {isArabic ? 'تسجيل الخروج' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 relative z-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                {isArabic ? 'مرحباً بك مدير النظام' : 'Welcome, System Administrator'}
              </h2>
              <p className="text-gray-300 text-lg">
                {isArabic ? 'لوحة التحكم الشاملة المدعومة بالذكاء الاصطناعي لإدارة منصة بُعد' : 'AI-Powered comprehensive control panel for managing BuAD platform'}
              </p>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <Card key={index} className="p-6 backdrop-blur-xl bg-black/40 border border-[#008C6A]/30 hover:shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm border border-[#008C6A]/30">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Insights Dashboard */}
            <AIInsightsDashboard />

            {/* System Analytics */}
            <SystemAnalytics />

            {/* Additional AI Features */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Real-time Monitoring */}
              <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Monitor className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {isArabic ? 'مراقبة النظام في الوقت الفعلي' : 'Real-time System Monitoring'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="font-medium">{isArabic ? 'استخدام الخادم' : 'Server Usage'}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold">23%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="font-medium">{isArabic ? 'قاعدة البيانات' : 'Database Load'}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="font-medium">{isArabic ? 'الذاكرة' : 'Memory Usage'}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold">67%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                    <span className="font-medium">{isArabic ? 'الشبكة' : 'Network Load'}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold">12%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Assistant Actions */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {isArabic ? 'إجراءات المساعد الذكي' : 'AI Assistant Actions'}
                  </h3>
                </div>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    {isArabic ? 'تحسين قاعدة البيانات' : 'Optimize Database'}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    {isArabic ? 'تحليل سلوك المستخدمين' : 'Analyze User Behavior'}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {isArabic ? 'توليد تقرير التنبؤات' : 'Generate Predictions Report'}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    {isArabic ? 'فحص أمني شامل' : 'Security Audit'}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Performance Indicators */}
            <Card className="p-6 bg-gradient-to-r from-background to-muted/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {isArabic ? 'مؤشرات الأداء الرئيسية' : 'Key Performance Indicators'}
                </h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {isArabic ? 'تحديث' : 'Refresh'}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">99.8%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{isArabic ? 'وقت التشغيل' : 'Uptime'}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">2.3s</div>
                  <div className="text-sm text-green-700 dark:text-green-300">{isArabic ? 'زمن الاستجابة' : 'Response Time'}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">15.2K</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">{isArabic ? 'المعاملات اليومية' : 'Daily Transactions'}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">97.5%</div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">{isArabic ? 'معدل النجاح' : 'Success Rate'}</div>
                </div>
              </div>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
};