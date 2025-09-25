import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'admin@boud.com.sa',
    password: 'Sa123465'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (formData.email === 'admin@boud.com.sa' && formData.password === 'Sa123465') {
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/admin-dashboard');
    } else {
      toast.error('بيانات الدخول غير صحيحة');
    }
    
    setIsLoading(false);
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
      
      {/* Professional Interactive Header - Exact Copy from Employee Portal */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-[#008C6A]/20 transition-all duration-300 text-white border border-gray-800/50 hover:border-[#008C6A]/30 rounded-lg px-4 py-2 backdrop-blur-sm hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                العودة للرئيسية
              </Button>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Building2 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  بوابة المدير
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  نظام إدارة الموارد البشرية
                </p>
              </div>
            </div>

            {/* Right Section - Brand */}
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-[#008C6A]/30 rounded-xl px-4 py-3 shadow-lg">
              <BoudLogo variant="icon" size="md" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">منصة بُعد</h1>
                <p className="text-xs text-gray-300">إدارة الموارد البشرية</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-96px)] p-6">
        <div className="w-full max-w-lg">
          {/* Professional Admin Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl border border-[#008C6A]/30 rounded-2xl shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in">
              <Building2 className="w-6 h-6 text-[#008C6A]" />
              <span className="text-sm font-medium text-white">لوحة تحكم مدير النظام</span>
            </div>
          </div>

          <Card className="bg-black/40 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
            {/* Professional Card Header */}
            <div className="bg-black/40 p-8 text-center relative">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
              </div>
              <div className="relative z-10">
                <div className="mx-auto mb-4 p-4 bg-[#008C6A]/20 rounded-2xl w-fit backdrop-blur-sm border border-[#008C6A]/30 shadow-lg">
                  <Building2 className="w-10 h-10 text-[#008C6A]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  مدير النظام
                </h2>
                <p className="text-gray-300 max-w-sm mx-auto">
                  تسجيل الدخول للوصول إلى لوحة التحكم الرئيسية وإدارة المنصة
                </p>
              </div>
            </div>

            <CardContent className="bg-black/40 p-8 relative">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/10 via-transparent to-[#008C6A]/5"></div>
              </div>
              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="admin@boud.com.sa"
                        required
                        className="h-12 pl-4 border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-12 pl-12 border-gray-800/50 focus:border-[#008C6A]/50 bg-black/30 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-12 px-3 hover:bg-transparent text-gray-400 hover:text-[#008C6A]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Professional Demo Credentials */}
                  <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></div>
                      <p className="font-medium text-sm text-white">بيانات الدخول التجريبية</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[#008C6A]">📧</span>
                        <span>البريد: admin@boud.com.sa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#008C6A]">🔑</span>
                        <span>كلمة المرور: Sa123465</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#008C6A]/80 hover:to-[#00694F]/80 font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl text-white border border-transparent hover:border-[#008C6A]/30 rounded-lg backdrop-blur-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        جارٍ تسجيل الدخول...
                      </>
                    ) : (
                      <>
                        <Building2 className="w-5 h-5 ml-2" />
                        دخول لوحة التحكم
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center pt-4">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/contact')}
                      className="text-gray-400 hover:text-[#008C6A] hover:bg-[#008C6A]/10"
                    >
                      هل نسيت كلمة المرور؟
                    </Button>
                  </div>
                </form>

                {/* Professional Security Notice */}
                <div className="mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-[#008C6A]">نظام آمن ومحمي</span>
                  </div>
                  <p className="text-xs text-gray-300 text-center leading-relaxed">
                    جميع البيانات مشفرة ومحمية وفقاً لأعلى معايير الأمان العالمية
                    <br />
                    يتم مراقبة جميع عمليات الدخول والأنشطة تلقائياً
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Footer Info */}
          <div className="text-center mt-6 opacity-80">
            <p className="text-xs text-gray-400">
              منصة بُعد © 2024 - نظام إدارة الموارد البشرية المتطور
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;