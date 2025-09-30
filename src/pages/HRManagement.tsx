import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import ComprehensiveEmployeeManagement from '@/pages/ComprehensiveEmployeeManagement';
import { User, LogOut, ChevronDown, Crown, Settings } from 'lucide-react';
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
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-accent/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 backdrop-blur-2xl bg-card/30 border-b border-border/20 shadow-2xl shadow-accent/10 h-28 flex items-center justify-between px-8">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/15 to-accent/20 text-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent"></div>
        </div>
        <div className="flex items-center relative z-10">
          <Button variant="ghost" onClick={() => navigate('/admin-dashboard')} className="flex items-center gap-2 text-foreground hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 mr-4 bg-card/20 backdrop-blur-sm border border-border/20">
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <BoudLogo variant="icon" size="md" />
              <div className="absolute -inset-2 bg-gradient-to-r from-accent/40 to-accent/40 rounded-full blur-lg animate-pulse group-hover:animate-ping transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-accent/80 bg-clip-text text-transparent animate-fade-in">
                {isArabic ? 'إدارة الموارد البشرية' : 'HR Management'}
              </h1>
              <p className="text-sm text-muted-foreground/80 animate-fade-in font-light">
                {isArabic ? 'نظام إدارة الموارد البشرية المتكاملة والمتقدمة' : 'Advanced Integrated Human Resources Management System'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse relative z-10">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-foreground hover:bg-accent/30 bg-card/20 backdrop-blur-sm border border-border/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                  <Crown className="h-5 w-5 text-foreground" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card/90 backdrop-blur-2xl border border-border/30 text-foreground shadow-2xl shadow-accent/20 rounded-2xl">
              <DropdownMenuItem onClick={() => navigate('/company-dashboard')} className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <Building2 className="h-4 w-4 mr-2" />
                {isArabic ? 'لوحة تحكم المنشأة' : 'Company Dashboard'}
              </DropdownMenuItem>
              
              <DropdownMenuItem className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/30" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent/20 rounded-xl transition-all duration-200">
                <LogOut className="h-4 w-4 mr-2" />
                {isArabic ? 'تسجيل الخروج' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border/30 hover:border-accent/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <ComprehensiveEmployeeManagement />
        </div>
      </main>
    </div>;
};