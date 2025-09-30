import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Code, Zap, Cpu, Database, Globe, Settings } from 'lucide-react';
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
      
      {/* Enhanced Header */}
      <header className="relative z-10 backdrop-blur-2xl bg-card border-b border-border shadow-2xl h-28 flex items-center justify-between px-8">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
        </div>
        <div className="flex items-center relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 text-foreground hover:bg-accent/20 hover:shadow-lg transition-all duration-300 mr-4 backdrop-blur-sm border border-border"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <BoudLogo variant="icon" size="md" />
              <div className="absolute -inset-2 bg-accent/20 rounded-full blur-lg animate-pulse group-hover:animate-ping transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-foreground animate-fade-in">
                {isArabic ? 'تطوير النظام' : 'System Development'}
              </h1>
              <p className="text-sm text-muted-foreground animate-fade-in font-light">
                {isArabic ? 'أدوات تطوير النظام والميزات الجديدة المتقدمة' : 'Advanced System Development Tools and New Features'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse relative z-10">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-foreground hover:bg-accent/20 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="h-5 w-5 text-accent-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card backdrop-blur-2xl border border-border text-foreground shadow-2xl rounded-2xl">
              <DropdownMenuItem className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <User className="h-4 w-4 mr-2" />
                {isArabic ? 'الملف الشخصي' : 'Admin Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                {isArabic ? 'تسجيل الخروج' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
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