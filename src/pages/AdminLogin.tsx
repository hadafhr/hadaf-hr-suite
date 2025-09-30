import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import buodLogo from '@/assets/buod-logo-white.png';
import heroLogo from '@/assets/hero-logo.png';

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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header - Exact Copy from Employee Portal */}
      <header className="relative z-10 bg-gradient-to-r from-black via-card to-black backdrop-blur-xl border-b border-border shadow-2xl shadow-accent/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent opacity-80"></div>
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
                <Building2 className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white">
                  بوابة المدير
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  نظام إدارة الموارد البشرية
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Compact Status Panel - Header Height Match */}
              <div className="bg-gradient-to-r from-black/40 via-card/60 to-black/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl shadow-accent/10 h-20 px-6 min-w-[240px] flex items-center justify-between">
                {/* Status Section */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">متصل</span>
                  </div>
                  <div className="w-px h-6 bg-border"></div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-accent" />
                    <span className="text-xs text-muted-foreground font-medium">لوحة المدير</span>
                  </div>
                </div>
                
                {/* Action Section */}
                <div>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/')}
                    className="group relative bg-gradient-to-r from-accent/20 to-accent/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-accent/40 hover:border-accent/70 hover:from-accent/30 hover:to-accent/30 transition-all duration-300 hover:scale-105 h-8"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4 text-accent group-hover:text-white transition-colors duration-300" />
                      <span className="text-sm text-white group-hover:text-accent transition-colors duration-300 font-medium">العودة</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-96px)] p-6">
        <div className="w-full max-w-lg">
          {/* Professional Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-pointer">
              <img 
                src={heroLogo} 
                alt="Buod HR Admin" 
                className="h-80 w-80 z-10 relative drop-shadow-2xl transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-3xl"></div>
            </div>
          </div>

          <Card className="bg-black/40 backdrop-blur-xl border border-border shadow-2xl hover:shadow-accent/20 transition-all duration-300 animate-fade-in rounded-2xl overflow-hidden">
            {/* Professional Card Header */}
            <div className="bg-black/40 p-8 text-center relative">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
              </div>
              <div className="relative z-10">
                <div className="mx-auto mb-4 p-4 bg-accent/20 rounded-2xl w-fit backdrop-blur-sm border border-accent/30 shadow-lg">
                  <Building2 className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  مدير النظام
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  تسجيل الدخول للوصول إلى لوحة التحكم الرئيسية وإدارة المنصة
                </p>
              </div>
            </div>

            <CardContent className="bg-black/40 p-8 relative">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5"></div>
              </div>
              <div className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="admin@boud.com.sa"
                        required
                        className="h-12 pl-4 border-border focus:border-accent/50 bg-black/30 text-white placeholder:text-muted-foreground rounded-lg backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-12 pl-12 border-border focus:border-accent/50 bg-black/30 text-white placeholder:text-muted-foreground rounded-lg backdrop-blur-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute left-0 top-0 h-12 px-3 hover:bg-transparent text-muted-foreground hover:text-accent"
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
                  <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <p className="font-medium text-sm text-white">بيانات الدخول التجريبية</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-accent">📧</span>
                        <span>البريد: admin@boud.com.sa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">🔑</span>
                        <span>كلمة المرور: Sa123465</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl text-black border border-transparent hover:border-accent/30 rounded-lg backdrop-blur-sm"
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
                      className="text-muted-foreground hover:text-accent hover:bg-accent/10"
                    >
                      هل نسيت كلمة المرور؟
                    </Button>
                  </div>
                </form>

                {/* Professional Security Notice */}
                <div className="mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-border shadow-lg">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-accent">نظام آمن ومحمي</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
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
            <p className="text-xs text-muted-foreground">
              منصة بُعد © 2024 - نظام إدارة الموارد البشرية المتطور
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;