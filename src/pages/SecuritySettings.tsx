import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle, Key } from 'lucide-react';
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
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h1>
              <p className="text-sm text-muted-foreground animate-fade-in font-light">
                {isArabic ? 'إدارة الأمان والحماية المتقدمة للنظام' : 'Advanced System Security and Protection Management'}
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