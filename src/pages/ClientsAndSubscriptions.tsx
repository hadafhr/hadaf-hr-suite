import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import headerLogo from '@/assets/header-logo.png';
import contentLogo from '@/assets/new-content-logo.png';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { PatternBackground } from '@/components/PatternBackground';
import { ClientsAndSubscriptions as ClientsAndSubscriptionsComponent } from '@/components/admin/ClientsAndSubscriptions';
import { 
  User,
  LogOut,
  ChevronDown,
  Crown,
  Settings
} from 'lucide-react';

export const ClientsAndSubscriptions: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      <PatternBackground />

      {/* Premium Header */}
      <header className="relative z-50 h-20 bg-gradient-to-r from-black/95 via-card/95 to-black/95 backdrop-blur-xl border-b border-border shadow-2xl shadow-accent/20">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 opacity-80"></div>
        
        <div className="relative z-10 h-full flex items-center justify-between px-6">
          {/* Right Section - Logo & Title */}
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => navigate('/admin-dashboard')}>
            <img 
              src={headerLogo} 
              alt="Buod HR" 
              className="h-56 w-auto object-contain filter brightness-110 transition-all duration-300 hover:scale-105" 
            />
            <div className="hidden md:flex flex-col">
              <h1 className="text-xl font-bold text-white">
                {isArabic ? 'العملاء والاشتراكات' : 'Clients & Subscriptions'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'نظام إدارة متطور' : 'Advanced Management System'}
              </p>
            </div>
          </div>

          {/* Left Section - Actions & Profile */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Settings Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/system-settings')}
              className="text-white hover:bg-accent/20 p-2 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-white hover:bg-accent/20 p-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-black" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.email || (isArabic ? 'المدير' : 'Admin')}
                  </span>
                  <ChevronDown className="h-4 w-4 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 backdrop-blur-xl border border-border text-white">
                <DropdownMenuItem onClick={() => navigate('/admin-dashboard')} className="hover:bg-accent/20">
                  <User className="h-4 w-4 mr-2" />
                  {isArabic ? 'لوحة التحكم' : 'Dashboard'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/system-settings')} className="hover:bg-accent/20">
                  <Settings className="h-4 w-4 mr-2" />
                  {isArabic ? 'الإعدادات' : 'Settings'}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-accent/20">
                  <LogOut className="h-4 w-4 mr-2" />
                  {isArabic ? 'تسجيل الخروج' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Content Logo */}
          <div className="flex justify-center mb-8">
            <img src={contentLogo} alt="Logo" className="h-32 w-32 object-contain" />
          </div>
          <ClientsAndSubscriptionsComponent />
        </div>
      </main>
    </div>
  );
};
