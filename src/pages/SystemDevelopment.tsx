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
      color: 'text-blue-500'
    },
    { 
      label: isArabic ? 'المطورين' : 'Developers', 
      value: '12', 
      icon: User, 
      color: 'text-green-500'
    },
    { 
      label: isArabic ? 'الأخطاء المحلولة' : 'Bugs Fixed', 
      value: '156', 
      icon: Zap, 
      color: 'text-purple-500'
    },
    { 
      label: isArabic ? 'أداء النظام' : 'System Performance', 
      value: '98.5%', 
      icon: Cpu, 
      color: 'text-orange-500'
    }
  ];

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
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
                {isArabic ? 'تطوير النظام' : 'System Development'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'أدوات تطوير النظام والميزات الجديدة' : 'System Development Tools and New Features'}
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
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="p-6 backdrop-blur-sm bg-background/80 border border-border/50 hover:shadow-lg transition-shadow">
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
          <Card className="p-6 backdrop-blur-sm bg-background/80 border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {isArabic ? 'مشاريع التطوير النشطة' : 'Active Development Projects'}
            </h3>
            <div className="space-y-4">
              {developmentProjects.map((project, index) => (
                <div key={index} className="p-4 border border-border/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <project.icon className="h-5 w-5 text-primary" />
                      <h4 className="font-medium text-foreground">{project.title}</h4>
                    </div>
                    <Badge className={`${getStatusColor(project.priority)} text-white`}>
                      {getPriorityLabel(project.priority)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{project.status}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-300"
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