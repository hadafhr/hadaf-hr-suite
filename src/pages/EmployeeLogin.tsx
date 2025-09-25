import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Eye, EyeOff, Loader2, Mail, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import buodLogo from '@/assets/buod-logo-white.png';

const EmployeeLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  
  // Get the redirect path from state if available
  const redirectPath = location.state?.from || '/employee-portal';
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes, just navigate directly to the portal
      toast.success('مرحباً بك في نظام الخدمة الذاتية');
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <User className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  لوحة تحكم الموظف
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  نظام الخدمة الذاتية للموظفين
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Back Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    التنقل
                  </span>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20"
                  >
                    <ArrowLeft className="w-4 h-4 text-white group-hover:text-[#008C6A] transition-colors duration-300" />
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      الرئيسية
                    </span>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Login Section */}
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md relative">
            {/* Floating background elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
            
            <Card className="group bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#008C6A]/20 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
              </div>
              
              <CardHeader className="text-center pb-4 relative z-10 bg-gray-900/40">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto transition-all duration-300 hover:scale-105 group cursor-pointer">
                  <User className="w-10 h-10 text-[#008C6A] group-hover:text-white transition-colors duration-300 z-10 relative drop-shadow-2xl" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#008C6A]/20 to-transparent"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-2">
                  لوحة تحكم الموظف
                </CardTitle>
                <p className="text-gray-300 bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-[#008C6A]/20">
                  تسجيل الدخول للوصول إلى نظام الخدمة الذاتية
                </p>
              </CardHeader>
              <CardContent className="relative z-10 bg-gray-900/40">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-300 font-medium mb-2 block">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="employee@company.com"
                        required
                        className="pl-12 bg-black/20 backdrop-blur-sm border border-[#008C6A]/30 text-white placeholder:text-gray-400 focus:border-[#008C6A]/70 focus:ring-[#008C6A]/20 transition-all duration-300"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#008C6A]" />
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/5 to-[#008C6A]/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-300 font-medium mb-2 block">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        required
                        className="pl-12 bg-black/20 backdrop-blur-sm border border-[#008C6A]/30 text-white placeholder:text-gray-400 focus:border-[#008C6A]/70 focus:ring-[#008C6A]/20 transition-all duration-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent z-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-[#008C6A]" />
                        ) : (
                          <Eye className="h-5 w-5 text-[#008C6A]" />
                        )}
                      </Button>
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/5 to-[#008C6A]/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="bg-[#008C6A]/10 backdrop-blur-sm p-4 rounded-lg border border-[#008C6A]/20 shadow-lg">
                    <p className="text-center text-gray-300 text-sm flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4 text-[#008C6A]" />
                      أدخل أي بريد إلكتروني وكلمة مرور للدخول إلى النظام التجريبي
                    </p>
                  </div>

                  <Button
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#008C6A]/20 h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جارٍ تسجيل الدخول...</span>
                      </div>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#008C6A]/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-gray-900 px-3 text-gray-400">أو</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-black/20 backdrop-blur-sm border border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 transition-all duration-300 hover:scale-105 h-12"
                    onClick={() => {
                      toast.success('مرحباً بك في نظام الخدمة الذاتية (وضع التجريب)');
                      navigate('/employee-portal');
                    }}
                  >
                    دخول مباشر (بدون بيانات)
                  </Button>

                  <div className="text-center space-y-2">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/contact')}
                      className="text-gray-400 hover:text-[#008C6A] transition-colors duration-300"
                    >
                      هل نسيت كلمة المرور؟
                    </Button>
                  </div>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-[#008C6A]/10 backdrop-blur-sm rounded-lg border border-[#008C6A]/20 shadow-lg">
                  <p className="text-xs text-gray-300 text-center flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-[#008C6A]" />
                    نظام آمن ومحمي. بياناتك الشخصية محفوظة ومشفرة بأعلى معايير الحماية.
                  </p>
                </div>
              </CardContent>
              
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeLogin;