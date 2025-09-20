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
  return <div className="min-h-screen bg-background flex flex-col relative">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate('/admin-dashboard')} className="flex items-center gap-2 hover:bg-primary/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center gap-3 mr-6">
            <BoudLogo variant="icon" size="md" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                {isArabic ? 'إدارة النظام' : 'HR Management'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'نظام إدارة الموارد البشرية المتكاملة' : 'Integrated Human Resources Management'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
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
              
              <DropdownMenuItem onClick={() => navigate('/company-dashboard')}>
                <Building2 className="h-4 w-4 mr-2" />
                {isArabic ? 'لوحة تحكم المنشأة' : 'Company Dashboard'}
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
        <div className="max-w-7xl mx-auto">
          <ComprehensiveEmployeeManagement />
        </div>
      </main>
    </div>;
};