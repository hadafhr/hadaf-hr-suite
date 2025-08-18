import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Building2, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { sanitizeInput, isValidEmail } from '@/utils/sanitizeHtml';
import hadafLogo from '@/assets/hadaf-logo.png';

export const Login: React.FC = () => {
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
      navigate('/dashboard', { replace: true });
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
      navigate('/dashboard', { replace: true });
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
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* الشعار والترحيب */}
        <div className="text-center mb-8">
          <img 
            src={hadafLogo} 
            alt="شعار هدف للموارد البشرية" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            مرحباً بك مرة أخرى
          </h1>
          <p className="text-white/80">
            سجل دخولك للوصول إلى لوحة التحكم
          </p>
        </div>

        {/* نموذج تسجيل الدخول */}
        <Card className="glass-card p-6">
          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <ul className="text-sm text-destructive space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 text-right"
                  required
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 text-right"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  تذكرني
                </Label>
              </div>
              <Button variant="link" className="text-sm p-0 h-auto">
                نسيت كلمة المرور؟
              </Button>
            </div>

            {/* زر تسجيل الدخول */}
            <Button type="submit" className="w-full btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  جارٍ تسجيل الدخول...
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4 mr-2" />
                  تسجيل الدخول
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
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ليس لديك حساب؟{' '}
                <Button 
                  variant="link" 
                  className="text-primary p-0 h-auto font-semibold"
                  onClick={() => navigate('/register')}
                >
                  سجل الآن
                </Button>
              </p>
            </div>
          </form>
        </Card>

        {/* معلومات إضافية */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            بتسجيل الدخول، أنت توافق على{' '}
            <Button variant="link" className="text-white underline p-0 h-auto text-sm">
              شروط الاستخدام
            </Button>
            {' '}و{' '}
            <Button variant="link" className="text-white underline p-0 h-auto text-sm">
              سياسة الخصوصية
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};