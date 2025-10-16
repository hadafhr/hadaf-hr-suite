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
    navigate('/admin-login');
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
      
      {/* Logo */}
      <div className="flex justify-center mb-6 pt-6">
        <img src={boudLogo} alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة الموارد البشرية</h1>
        <p className="text-muted-foreground">إدارة شاملة للموظفين والموارد البشرية</p>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ComprehensiveEmployeeManagement />
        </div>
      </main>
    </div>;
};