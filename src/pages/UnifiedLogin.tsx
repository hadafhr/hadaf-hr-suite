import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, Loader2, Building2, Shield, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { sanitizeInput, isValidEmail } from '@/utils/sanitizeHtml';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const UnifiedLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Mock authentication for admin
  const mockAuthentication = (username: string, password: string) => {
    if (username === 'admin@boud.com' && password === 'Sa123465') {
      return { success: true, user: { email: 'admin@boud.com' } };
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  };

  // Mock role determination based on email or username
  const determineUserRole = (emailOrUsername: string) => {
    // فريق بُعد - الإدارة العليا
    if (emailOrUsername === 'admin@boud.com' || emailOrUsername.includes('admin@boud.com') || emailOrUsername.includes('@boud.com.sa')) {
      return 'super_admin';
    }
    // باقي المستخدمين - حسابات المنشآت
    return 'company_user';
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = determineUserRole(user.email || '');
      if (role === 'super_admin') {
        navigate('/super-admin-dashboard', { replace: true });
      } else {
        navigate('/company-dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!formData.email) {
      newErrors.push(isArabic ? 'اسم المستخدم أو البريد الإلكتروني مطلوب' : 'Username or email is required');
    }
    
    if (!formData.password) {
      newErrors.push(isArabic ? 'كلمة المرور مطلوبة' : 'Password is required');
    } else if (formData.password.length < 6) {
      newErrors.push(isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Check for admin credentials first
      const mockAuth = mockAuthentication(formData.email, formData.password);
      
      if (mockAuth.success) {
        // Admin login successful - redirect to super admin dashboard
        navigate('/super-admin-dashboard', { replace: true });
      } else {
        // Try normal authentication for regular users
        const { error } = await signIn(
          sanitizeInput(formData.email),
          formData.password
        );
        
        if (!error) {
          // Determine role and redirect
          const role = determineUserRole(formData.email);
            if (role === 'super_admin') {
              navigate('/super-admin-dashboard', { replace: true });
            } else {
            navigate('/company-dashboard', { replace: true });
          }
        } else {
          setErrors([isArabic ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials']);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors([isArabic ? 'حدث خطأ في تسجيل الدخول' : 'Login error occurred']);
    }
    
    setLoading(false);
  };

  const handleInputChange = (field: string, value: any) => {
    if (errors.length > 0) {
      setErrors([]);
    }
    
    if (field === 'email') {
      value = sanitizeInput(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password flow
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50 flex items-center justify-center p-4 relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent/10 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <BoudLogo variant="full" size="lg" className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isArabic ? 'منصة بُعد للموارد البشرية' : 'BuAD HR Platform'}
          </h1>
          <p className="text-muted-foreground">
            {isArabic ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
          </p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-sm bg-background/80 border border-border/50 shadow-2xl p-8">
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
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className={isArabic ? "text-right" : "text-left"}>
                {isArabic ? 'البريد الإلكتروني / اسم المستخدم' : 'Email / Username'}
              </Label>
              <div className="relative">
                <Mail className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isArabic ? 'right-3' : 'left-3'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${isArabic ? 'pr-10' : 'pl-10'} ${isArabic ? 'text-right' : 'text-left'}`}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className={isArabic ? "text-right" : "text-left"}>
                {isArabic ? 'كلمة المرور' : 'Password'}
              </Label>
              <div className="relative">
                <Lock className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isArabic ? 'right-3' : 'left-3'}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`${isArabic ? 'pr-10 pl-10' : 'pl-10 pr-10'} ${isArabic ? 'text-right' : 'text-left'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground ${isArabic ? 'left-3' : 'right-3'}`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
              <Button 
                type="button"
                variant="link" 
                className="text-sm p-0 h-auto text-primary hover:text-primary/80"
                onClick={handleForgotPassword}
              >
                {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
              </Button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 hover:scale-105" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {isArabic ? 'جارٍ تسجيل الدخول...' : 'Signing in...'}
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </>
              )}
            </Button>

            {/* Demo Credentials */}
            <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
              <p className="font-medium text-foreground">
                {isArabic ? 'بيانات الدخول التجريبية:' : 'Demo Credentials:'}
              </p>
              <div className="space-y-1 text-muted-foreground">
                <p>{isArabic ? 'مستخدم الشركة:' : 'Company User:'} employee@company.com / password123</p>
                <p>{isArabic ? 'مدير النظام:' : 'System Admin:'} admin@boud.com / Sa123465</p>
              </div>
            </div>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            {isArabic ? (
              <>
                بتسجيل الدخول، أنت توافق على{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  شروط الاستخدام
                </Button>
                {' '}و{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  سياسة الخصوصية
                </Button>
              </>
            ) : (
              <>
                By signing in, you agree to our{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  Terms of Service
                </Button>
                {' '}and{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  Privacy Policy
                </Button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};