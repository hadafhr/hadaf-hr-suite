import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

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
      // First try the real authentication
      const { error: authError } = await signIn(formData.email, formData.password);
      
      if (authError) {
        // If auth fails, check if this is the test account
        if (formData.email === 'employee@boud.com' && formData.password === 'Test123!') {
          toast.success('مرحباً بك في نظام الخدمة الذاتية (حساب تجريبي)');
          navigate(redirectPath);
          return;
        }
        
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        setIsLoading(false);
        return;
      }

      // Check if user is an employee
      const { data: employee, error: employeeError } = await supabase
        .from('boud_employees')
        .select('*')
        .eq('email', formData.email)
        .eq('is_active', true)
        .maybeSingle();

      if (employeeError) {
        console.error('Database error:', employeeError);
        toast.error('حدث خطأ في قاعدة البيانات');
        setIsLoading(false);
        return;
      }

      if (!employee) {
        toast.error('عذراً، لا يمكن العثور على بيانات الموظف');
        setIsLoading(false);
        return;
      }

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </Button>
            <BoudLogo variant="icon" size="md" />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-border/50">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                لوحة تحكم الموظف
              </CardTitle>
              <p className="text-muted-foreground">
                تسجيل الدخول للوصول إلى نظام الخدمة الذاتية
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative mt-1">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="employee@company.com"
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="أدخل كلمة المرور"
                      required
                      className="pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg text-sm">
                  <p className="font-medium text-foreground mb-2">بيانات الدخول التجريبية:</p>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">البريد الإلكتروني: employee@boud.com</p>
                    <p className="text-muted-foreground">كلمة المرور: Test123!</p>
                  </div>
                </div>

                <Button
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جارٍ تسجيل الدخول...
                    </>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/contact')}
                  >
                    هل نسيت كلمة المرور؟
                  </Button>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  نظام آمن ومحمي. بياناتك الشخصية محفوظة ومشفرة بأعلى معايير الحماية.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;