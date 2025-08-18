import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft, UserCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { sanitizeInput, isValidEmail } from '@/utils/sanitizeHtml';
import workspaceSetup from '@/assets/workspace-setup.jpg';

export const IndividualLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/employee-dashboard', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.email) {
      newErrors.push('البريد الإلكتروني مطلوب');
    } else if (!isValidEmail(formData.email)) {
      newErrors.push('البريد الإلكتروني غير صحيح');
    }
    
    if (!formData.password) {
      newErrors.push('كلمة المرور مطلوبة');
    } else if (formData.password.length < 6) {
      newErrors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const { error } = await signIn(
      sanitizeInput(formData.email),
      formData.password
    );
    
    if (!error) {
      navigate('/employee-dashboard', { replace: true });
    }
    
    setLoading(false);
  };

  const handleInputChange = (field: string, value: any) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    
    if (field === 'email') {
      value = sanitizeInput(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Panel الأيسر - النموذج */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-lg space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">بُعد HR</h1>
                  <p className="text-sm text-muted-foreground">منصة الأفراد</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  مرحباً بك في المنصة الشخصية
                </h2>
                <p className="text-muted-foreground">
                  إدارة ملفك الشخصي، طلباتك، ومسيرتك المهنية في مكان واحد
                </p>
              </div>
            </div>

            {/* نموذج تسجيل الدخول */}
            <Card className="p-8 border border-border/50 shadow-medium">
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <ul className="text-sm text-destructive space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right text-foreground font-medium">
                    البريد الإلكتروني الشخصي
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="بريدك الإلكتروني الشخصي"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-12 h-12 text-right border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* كلمة المرور */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-right text-foreground font-medium">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="كلمة المرور الخاصة بك"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-12 pr-12 h-12 text-right border-border focus:border-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* خيارات إضافية */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox 
                      id="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => handleInputChange('remember', checked)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      تذكر بياناتي
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm p-0 h-auto text-primary">
                    نسيت كلمة المرور؟
                  </Button>
                </div>

                {/* زر تسجيل الدخول */}
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                      جارٍ تسجيل الدخول...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-5 w-5 ml-2" />
                      دخول المنصة الشخصية
                    </>
                  )}
                </Button>

                {/* خط فاصل */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">أو</span>
                  </div>
                </div>

                {/* تسجيل حساب جديد */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    مستخدم جديد؟
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-primary text-primary hover:bg-primary/10"
                    onClick={() => navigate('/register-individual')}
                  >
                    <User className="h-5 w-5 ml-2" />
                    إنشاء حساب شخصي جديد
                  </Button>
                </div>
              </form>
            </Card>

            {/* معلومات خصوصية */}
            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>🔒 حماية كاملة للخصوصية • بيانات مشفرة ومحمية</p>
              <p>
                بتسجيل الدخول، توافق على{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-xs">
                  شروط الاستخدام
                </Button>
                {' '}و{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-xs">
                  سياسة الخصوصية
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Panel الأيمن - الصورة والمحتوى التسويقي */}
        <div className="relative bg-gradient-to-br from-primary/10 to-accent/20 lg:flex items-center justify-center p-12 hidden">
          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                منصتك الشخصية المتكاملة
              </h3>
              <p className="text-lg text-muted-foreground max-w-md">
                إدارة ذاتية لملفك المهني، طلباتك، وتطوير مسيرتك الوظيفية
              </p>
            </div>
            
            <img 
              src={workspaceSetup} 
              alt="مساحة العمل" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-strong"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">مستخدم نشط</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">رضا المستخدمين</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">دعم متواصل</div>
              </div>
            </div>
          </div>
          
          {/* عناصر زخرفية */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/30 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};