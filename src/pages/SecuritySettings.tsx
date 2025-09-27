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
      color: 'text-green-500'
    },
    { 
      label: isArabic ? 'محاولات تسجيل الدخول' : 'Login Attempts', 
      value: '8,453', 
      icon: Lock, 
      color: 'text-blue-500'
    },
    { 
      label: isArabic ? 'الأنشطة المشبوهة' : 'Suspicious Activities', 
      value: '23', 
      icon: Eye, 
      color: 'text-orange-500'
    },
    { 
      label: isArabic ? 'مستوى الأمان' : 'Security Level', 
      value: '98%', 
      icon: CheckCircle, 
      color: 'text-green-500'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#00B488]/15 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#008C6A]/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#008C6A" stop-opacity="0.6"/><stop offset="100%" stop-color="#008C6A" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#008C6A]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00B488]/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Enhanced Header */}
      <header className="relative z-10 backdrop-blur-2xl bg-black/30 border-b border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10 h-28 flex items-center justify-between px-8">
        {/* Enhanced animated background pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/20 via-[#00B488]/15 to-[#008C6A]/20 text-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="flex items-center relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center gap-2 text-white hover:bg-[#008C6A]/30 hover:shadow-lg hover:shadow-[#008C6A]/20 transition-all duration-300 mr-4 bg-black/20 backdrop-blur-sm border border-[#008C6A]/20"
          >
            <ArrowLeft className="w-5 h-5" />
            {isArabic ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
          </Button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <BoudLogo variant="icon" size="md" />
              <div className="absolute -inset-2 bg-gradient-to-r from-[#008C6A]/40 to-[#00B488]/40 rounded-full blur-lg animate-pulse group-hover:animate-ping transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-[#00B488]/80 bg-clip-text text-transparent animate-fade-in">
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h1>
              <p className="text-sm text-gray-400/80 animate-fade-in font-light">
                {isArabic ? 'إدارة الأمان والحماية المتقدمة للنظام' : 'Advanced System Security and Protection Management'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse relative z-10">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse text-white hover:bg-[#008C6A]/30 bg-black/20 backdrop-blur-sm border border-[#008C6A]/20 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-gradient-to-r from-[#008C6A] to-[#00B488] rounded-full flex items-center justify-center shadow-lg shadow-[#008C6A]/30">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-2xl border border-[#008C6A]/30 text-white shadow-2xl shadow-[#008C6A]/20 rounded-2xl">
              <DropdownMenuItem className="hover:bg-[#008C6A]/20 rounded-xl transition-all duration-200">
                <User className="h-4 w-4 mr-2" />
                {isArabic ? 'الملف الشخصي' : 'Admin Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#008C6A]/20 rounded-xl transition-all duration-200">
                <Settings className="h-4 w-4 mr-2" />
                {isArabic ? 'إعدادات النظام' : 'System Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#008C6A]/30" />
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-[#008C6A]/20 rounded-xl transition-all duration-200">
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
              <Card key={index} className="p-6 backdrop-blur-xl bg-black/40 border border-[#008C6A]/30 hover:shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 rounded-2xl hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card className="p-6 backdrop-blur-xl bg-black/40 border border-[#008C6A]/30 rounded-2xl shadow-2xl shadow-[#008C6A]/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00B488]" />
                {isArabic ? 'إعدادات الأمان' : 'Security Settings'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-[#008C6A]/30 rounded-xl hover:bg-black/50 hover:border-[#008C6A]/50 transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-white">
                      {isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {isArabic ? 'طبقة إضافية من الحماية' : 'Additional layer of protection'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSettingChange('twoFactorAuth', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-[#008C6A]/30 rounded-xl hover:bg-black/50 hover:border-[#008C6A]/50 transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-white">
                      {isArabic ? 'انتهاء صلاحية كلمة المرور' : 'Password Expiry'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {isArabic ? 'إجبار تغيير كلمة المرور دورياً' : 'Force periodic password changes'}
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.passwordExpiry}
                    onCheckedChange={(value) => handleSettingChange('passwordExpiry', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-[#008C6A]/30 rounded-xl hover:bg-black/50 hover:border-[#008C6A]/50 transition-all duration-300 backdrop-blur-sm">
                  <div>
                    <h4 className="font-medium text-white">
                      {isArabic ? 'انتهاء الجلسة' : 'Session Timeout'}
                    </h4>
                    <p className="text-sm text-gray-400">
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
            <Card className="p-6 backdrop-blur-xl bg-black/40 border border-[#008C6A]/30 rounded-2xl shadow-2xl shadow-[#008C6A]/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#00B488]" />
                {isArabic ? 'تنبيهات الأمان' : 'Security Alerts'}
              </h3>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-[#008C6A]/30 rounded-xl hover:bg-black/50 hover:border-[#008C6A]/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-orange-500' :
                        alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white text-sm">{alert.title}</h4>
                          {alert.urgent && (
                            <Badge variant="destructive" className="text-xs border-0 shadow-lg">
                              {isArabic ? 'عاجل' : 'Urgent'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
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