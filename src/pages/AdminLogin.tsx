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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 font-arabic relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </Button>
            <div className="flex items-center gap-3">
              <BoudLogo variant="icon" size="md" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">منصة بُعد</h1>
                <p className="text-xs text-muted-foreground">نظام إدارة الموارد البشرية</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-lg">
          {/* Admin Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">لوحة تحكم مدير النظام</span>
            </div>
          </div>

          <Card className="shadow-2xl border-border/50 backdrop-blur-lg bg-background/90 overflow-hidden">
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl w-fit backdrop-blur-sm border border-primary/30">
                <Building2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                مدير النظام
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                تسجيل الدخول للوصول إلى لوحة التحكم الرئيسية وإدارة المنصة
              </p>
            </div>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="admin@boud.com.sa"
                      required
                      className="h-12 pl-4 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pl-12 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 rounded-xl border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="font-medium text-sm text-foreground">بيانات الدخول التجريبية</p>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>📧 البريد: admin@boud.com.sa</p>
                    <p>🔑 كلمة المرور: Sa123465</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl"
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
                    className="text-muted-foreground hover:text-primary"
                  >
                    هل نسيت كلمة المرور؟
                  </Button>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">نظام آمن ومحمي</span>
                </div>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  جميع البيانات مشفرة ومحمية وفقاً لأعلى معايير الأمان العالمية
                  <br />
                  يتم مراقبة جميع عمليات الدخول والأنشطة تلقائياً
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
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