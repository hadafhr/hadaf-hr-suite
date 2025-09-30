import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Code, Zap, Cpu, Database, Globe, Settings } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import headerLogo from '@/assets/header-logo.png';
import contentLogo from '@/assets/content-logo.png';
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
  User,
  LogOut,
  ChevronDown,
  Crown
} from 'lucide-react';

export const SystemDevelopment: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  const developmentProjects = [
    {
      title: isArabic ? 'تحديث نظام إدارة الموارد البشرية' : 'HR Management System Update',
      status: isArabic ? 'قيد التطوير' : 'In Development',
      progress: 75,
      priority: 'high',
      icon: Code
    },
    {
      title: isArabic ? 'تطوير واجهة برمجة التطبيقات الجديدة' : 'New API Development',
      status: isArabic ? 'مكتملة' : 'Completed',
      progress: 100,
      priority: 'medium',
      icon: Database
    },
    {
      title: isArabic ? 'تحسين الأمان والحماية' : 'Security Enhancement',
      status: isArabic ? 'التخطيط' : 'Planning',
      progress: 25,
      priority: 'critical',
      icon: Settings
    },
    {
      title: isArabic ? 'تطوير التطبيق المحمول' : 'Mobile App Development',
      status: isArabic ? 'قيد التطوير' : 'In Development',
      progress: 60,
      priority: 'high',
      icon: Globe
    }
  ];

  const systemMetrics = [
    { 
      label: isArabic ? 'المشاريع النشطة' : 'Active Projects', 
      value: '8', 
      icon: Code, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'المطورين' : 'Developers', 
      value: '12', 
      icon: User, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'الأخطاء المحلولة' : 'Bugs Fixed', 
      value: '156', 
      icon: Zap, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'أداء النظام' : 'System Performance', 
      value: '98.5%', 
      icon: Cpu, 
      color: 'text-foreground'
    }
  ];

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-destructive';
      case 'high':
        return 'bg-accent';
      case 'medium':
        return 'bg-warning';
      default:
        return 'bg-accent';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return isArabic ? 'حرج' : 'Critical';
      case 'high':
        return isArabic ? 'عالي' : 'High';
      case 'medium':
        return isArabic ? 'متوسط' : 'Medium';
      default:
        return isArabic ? 'منخفض' : 'Low';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b1a086" stop-opacity="0.6"/><stop offset="100%" stop-color="#b1a086" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Professional Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black/95 backdrop-blur-xl shadow-xl">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 h-20">
          <div className="flex items-center justify-between h-full relative z-10">
            {/* Right Section - Logo & Title */}
            <div className="flex items-center gap-6">
              <img 
                src={headerLogo} 
                alt="Buod HR" 
                className="h-56 w-auto object-contain filter brightness-110 transition-transform hover:scale-105" 
              />
              <div className="hidden md:flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  {isArabic ? 'تطوير النظام' : 'System Development'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'أدوات تطوير النظام والميزات الجديدة' : 'Development Tools & New Features'}
                </p>
              </div>
            </div>

            {/* Left Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin-dashboard')}
                className="hidden sm:flex items-center gap-2 border-border hover:bg-accent/20 hover:border-accent/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden lg:inline">{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 hover:bg-accent/20 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="h-4 w-4 text-black" />
                    </div>
                    <ChevronDown className="h-3 w-3 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-black/95 backdrop-blur-xl border-border shadow-2xl"
                >
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    {isArabic ? 'الملف الشخصي' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {isArabic ? 'الإعدادات' : 'Settings'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="hover:bg-destructive/20 text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isArabic ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Content Logo */}
          <div className="flex justify-center mb-8">
            <img src={contentLogo} alt="Logo" className="h-32 w-32 object-contain" />
          </div>
          
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {isArabic ? 'تطوير النظام' : 'System Development'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? 'أدوات تطوير النظام والميزات الجديدة المتقدمة' : 'Advanced System Development Tools and New Features'}
            </p>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="p-6 backdrop-blur-xl bg-card border border-border hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-2xl hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Development Projects */}
          <Card className="p-6 backdrop-blur-xl bg-card border border-border rounded-2xl shadow-2xl">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {isArabic ? 'مشاريع التطوير النشطة' : 'Active Development Projects'}
            </h3>
            <div className="space-y-4">
              {developmentProjects.map((project, index) => (
                <div key={index} className="p-4 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <project.icon className="h-5 w-5 text-accent" />
                      <h4 className="font-medium text-foreground">{project.title}</h4>
                    </div>
                    <Badge className={`${getStatusColor(project.priority)} text-foreground border-0 shadow-lg`}>
                      {getPriorityLabel(project.priority)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{project.status}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all duration-500 shadow-lg"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};