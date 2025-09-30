import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';
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
  Crown,
  Settings
} from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { signOut, user } = useAuth();
  const isArabic = i18n.language === 'ar';

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: false,
    sessionTimeout: true,
    ipWhitelisting: false,
    auditLogging: true,
    encryptionAtRest: true
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

  const securityMetrics = [
    { 
      label: isArabic ? 'التهديدات المحجوبة' : 'Blocked Threats', 
      value: '1,247', 
      icon: Shield, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'محاولات تسجيل الدخول' : 'Login Attempts', 
      value: '8,453', 
      icon: Lock, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'الأنشطة المشبوهة' : 'Suspicious Activities', 
      value: '23', 
      icon: Eye, 
      color: 'text-foreground'
    },
    { 
      label: isArabic ? 'مستوى الأمان' : 'Security Level', 
      value: '98%', 
      icon: CheckCircle, 
      color: 'text-foreground'
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      title: isArabic ? 'محاولة دخول مشبوهة' : 'Suspicious Login Attempt',
      description: isArabic ? 'محاولة دخول من IP غير معروف' : 'Login attempt from unknown IP',
      time: '2 min ago',
      urgent: true
    },
    {
      id: 2,
      type: 'success',
      title: isArabic ? 'تم تحديث كلمة المرور' : 'Password Updated',
      description: isArabic ? 'تم تحديث كلمة مرور المستخدم بنجاح' : 'User password updated successfully',
      time: '1 hour ago',
      urgent: false
    },
    {
      id: 3,
      type: 'info',
      title: isArabic ? 'فحص أمني مجدول' : 'Scheduled Security Scan',
      description: isArabic ? 'سيتم إجراء فحص أمني في منتصف الليل' : 'Security scan will run at midnight',
      time: '3 hours ago',
      urgent: false
    }
  ];

  const handleSettingChange = (setting: string, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
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
                  {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'إدارة الأمان والحماية المتقدمة' : 'Advanced Security & Protection'}
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
              {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
            </h2>
            <p className="text-muted-foreground">
              {isArabic ? 'إدارة الأمان والحماية المتقدمة للنظام' : 'Advanced System Security and Protection Management'}
            </p>
          </div>

          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
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

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card className="p-6 backdrop-blur-xl bg-card border border-border rounded-2xl shadow-2xl">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'طبقة إضافية من الحماية' : 'Additional layer of protection'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSettingChange('twoFactorAuth', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'انتهاء صلاحية كلمة المرور' : 'Password Expiry'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'إجبار تغيير كلمة المرور دورياً' : 'Force periodic password changes'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordExpiry}
                    onCheckedChange={(value) => handleSettingChange('passwordExpiry', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isArabic ? 'انتهاء الجلسة' : 'Session Timeout'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'إنهاء الجلسات غير النشطة تلقائياً' : 'Auto-logout inactive sessions'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.sessionTimeout}
                    onCheckedChange={(value) => handleSettingChange('sessionTimeout', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Security Alerts */}
            <Card className="p-6 backdrop-blur-xl bg-card border border-border rounded-2xl shadow-2xl">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                {isArabic ? 'تنبيهات الأمان' : 'Security Alerts'}
              </h3>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-border rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-destructive' :
                        alert.type === 'success' ? 'bg-success' : 'bg-accent'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                          {alert.urgent && (
                            <Badge variant="destructive" className="text-xs border-0 shadow-lg">
                              {isArabic ? 'عاجل' : 'Urgent'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};