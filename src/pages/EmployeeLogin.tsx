import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EmployeeLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '123465',
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

    if (formData.employeeId === '123465' && formData.password === 'Sa123465') {
      toast.success('مرحباً بك في نظام الخدمة الذاتية');
      navigate('/employee-self-service');
    } else {
      toast.error('الرقم الوظيفي أو كلمة المرور غير صحيحة');
    }
    
    setIsLoading(false);
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
            <img 
              src="/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png" 
              alt="BOUD HR Logo" 
              className="h-12 w-auto"
            />
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
                  <Label htmlFor="employeeId">الرقم الوظيفي</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="123465"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Sa123465"
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
                  <p className="font-medium text-foreground mb-1">بيانات الدخول الافتراضية:</p>
                  <p className="text-muted-foreground">الرقم الوظيفي: 123465</p>
                  <p className="text-muted-foreground">كلمة المرور: Sa123465</p>
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