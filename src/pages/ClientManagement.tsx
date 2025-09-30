import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import headerLogo from '@/assets/header-logo.png';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import { ClientManagement as ClientManagementComponent } from '@/components/admin/ClientManagement';
import { 
  User,
  LogOut,
  ChevronDown,
  Crown,
  Settings
} from 'lucide-react';

export const ClientManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/15 animate-pulse"></div>
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 backdrop-blur-2xl bg-black/30 border-b border-border shadow-2xl shadow-accent/10 h-28 flex items-center justify-between px-8">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/15 to-accent/20 text-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
        </div>
        <div className="flex items-center relative z-10">
          <div className="flex items-center space-x-3 space-x-reverse">
            <img src={headerLogo} alt="Buod HR" className="h-32 w-32 object-contain filter brightness-110" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-muted-foreground to-accent/80 bg-clip-text text-transparent animate-fade-in">
                {isArabic ? 'إدارة العملاء' : 'Client Management'}
              </h1>
              <p className="text-sm text-muted-foreground/80 animate-fade-in font-light">
                {isArabic ? 'نظام إدارة العملاء والمؤسسات المتقدم' : 'Advanced Client and Organization Management System'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 text-white hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 bg-black/20 backdrop-blur-sm border border-border"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-white hover:bg-accent/30 bg-black/20 backdrop-blur-sm border border-border transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                  <Crown className="h-5 w-5 text-black" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-2xl border border-border text-white shadow-2xl shadow-accent/20 rounded-2xl">
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
        <div className="max-w-7xl mx-auto">
          <ClientManagementComponent />
        </div>
      </main>
    </div>
  );
};