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
      color: 'text-foreground',
      change: '+18%'
    },
    { 
      label: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue', 
      value: '₺2.4M', 
      icon: DollarSign, 
      color: 'text-foreground',
      change: '+24%'
    },
    { 
      label: isArabic ? 'معدل النمو' : 'Growth Rate', 
      value: '15.3%', 
      icon: TrendingUp, 
      color: 'text-foreground',
      change: '+3.2%'
    },
    { 
      label: isArabic ? 'العملاء النشطون' : 'Active Clients', 
      value: '156', 
      icon: BarChart3, 
      color: 'text-foreground',
      change: '+12%'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
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
      
      {/* Header */}
      <header className="relative z-10 bg-card backdrop-blur-xl border-b border-border shadow-2xl h-24 flex items-center justify-between px-6">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5"></div>
        </div>
        <div className="flex items-center relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 text-foreground hover:bg-accent/20 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="relative">
              <BarChart3 className="h-8 w-8 text-accent animate-pulse" />
              <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">
                {isArabic ? 'التقارير والتحليلات' : 'Reports & Analytics'}
              </h1>
              <p className="text-sm text-muted-foreground animate-fade-in">
                {isArabic ? 'تحليلات متقدمة ومعلومات إحصائية شاملة' : 'Advanced Analytics and Comprehensive Statistics'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse relative z-10">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-foreground hover:bg-accent/20">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-xl border border-border text-foreground">
              <DropdownMenuItem className="hover:bg-accent/20">
                <User className="h-4 w-4 mr-2" />
                {isArabic ? 'الملف الشخصي' : 'Admin Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent/20">
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent/20">
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
              <Card key={index} className="p-6 backdrop-blur-xl bg-card border border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/30">
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

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card className="p-6 backdrop-blur-xl bg-card border border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 animate-fade-in rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'نمو المستخدمين' : 'User Growth'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name={isArabic ? 'المستخدمين' : 'Users'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Chart */}
            <Card className="p-6 backdrop-blur-xl bg-card border border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 animate-fade-in rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    formatter={(value) => [`₺${value.toLocaleString()}`, isArabic ? 'الإيرادات' : 'Revenue']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(var(--accent))" 
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