import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
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
  LineChart,
  Line
} from 'recharts';
import { 
  User,
  LogOut,
  ChevronDown,
  Crown,
  Settings
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  // Mock analytics data
  const analyticsData = [
    { month: 'Jan', users: 1200, revenue: 45000, clients: 15 },
    { month: 'Feb', users: 1400, revenue: 52000, clients: 18 },
    { month: 'Mar', users: 1650, revenue: 61000, clients: 22 },
    { month: 'Apr', users: 1900, revenue: 71000, clients: 28 },
    { month: 'May', users: 2200, revenue: 84000, clients: 35 },
    { month: 'Jun', users: 2500, revenue: 96000, clients: 42 }
  ];

  const stats = [
    { 
      label: isArabic ? 'إجمالي المستخدمين' : 'Total Users', 
      value: '12,847', 
      icon: Users, 
      color: 'text-blue-500',
      change: '+18%'
    },
    { 
      label: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue', 
      value: '₺2.4M', 
      icon: DollarSign, 
      color: 'text-green-500',
      change: '+24%'
    },
    { 
      label: isArabic ? 'معدل النمو' : 'Growth Rate', 
      value: '15.3%', 
      icon: TrendingUp, 
      color: 'text-purple-500',
      change: '+3.2%'
    },
    { 
      label: isArabic ? 'العملاء النشطون' : 'Active Clients', 
      value: '156', 
      icon: BarChart3, 
      color: 'text-orange-500',
      change: '+12%'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center gap-3 mr-6">
            <BoudLogo variant="icon" size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                {isArabic ? 'التقارير والتحليلات' : 'Reports & Analytics'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'تحليلات متقدمة ومعلومات إحصائية شاملة' : 'Advanced Analytics and Comprehensive Statistics'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <LanguageSwitcher />
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

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
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

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'نمو المستخدمين' : 'User Growth'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name={isArabic ? 'المستخدمين' : 'Users'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Chart */}
            <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
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
        </div>
      </main>
    </div>
  );
};