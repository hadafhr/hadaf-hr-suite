import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building2, Users, Briefcase, Calendar, FileText, TrendingUp } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import ComprehensiveEmployeeManagement from '@/pages/ComprehensiveEmployeeManagement';
import { User, LogOut, ChevronDown, Crown, Settings } from 'lucide-react';
import boudLogo from '@/assets/boud-logo-large.png';
export const HRManagement: React.FC = () => {
  const navigate = useNavigate();
  const {
    t,
    i18n
  } = useTranslation();
  const {
    signOut,
    user
  } = useAuth();
  const isArabic = i18n.language === 'ar';
  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };
  return <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/15 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="w-full h-full bg-repeat animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b1a086" stop-opacity="0.6"/><stop offset="100%" stop-color="#b1a086" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
          backgroundSize: '80px 80px'
        }}></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
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
                src={boudLogo} 
                alt="Boud HR" 
                className="h-40 w-auto object-contain filter brightness-110 transition-transform hover:scale-105"
              />
              <div className="hidden md:flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  {isArabic ? 'إدارة الموارد البشرية' : 'HR Management'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'إدارة شاملة للموظفين والموارد البشرية' : 'Comprehensive Employee & HR Management'}
                </p>
              </div>
            </div>

            {/* Left Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/company-dashboard')}
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
                  <DropdownMenuItem 
                    onClick={() => navigate('/company-dashboard')}
                    className="hover:bg-accent/20 cursor-pointer"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    {isArabic ? 'لوحة تحكم المنشأة' : 'Company Dashboard'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {isArabic ? 'إعدادات النظام' : 'System Settings'}
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
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border/30 hover:border-accent/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Logo Section */}
          <div className="flex justify-center">
            <img src={boudLogo} alt="Boud Logo" className="h-24 w-auto" />
          </div>
          
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              className="bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all cursor-pointer group"
              onClick={() => navigate('/recruitment-management')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  {isArabic ? 'إدارة التوظيف' : 'Recruitment'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'نظام التوظيف الذكي وطلبات الاحتياج الوظيفي' : 'Smart hiring system and manpower requests'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  {isArabic ? 'الحضور والانصراف' : 'Attendance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'إدارة حضور وانصراف الموظفين' : 'Employee attendance management'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  {isArabic ? 'الرواتب' : 'Payroll'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'إدارة رواتب ومستحقات الموظفين' : 'Employee payroll management'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-accent/50 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-foreground group-hover:text-accent transition-colors">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-all">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  {isArabic ? 'تقييم الأداء' : 'Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? 'تقييم ومتابعة أداء الموظفين' : 'Employee performance evaluation'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <ComprehensiveEmployeeManagement />
        </div>
      </main>
    </div>;
};