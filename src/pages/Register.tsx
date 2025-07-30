import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Building2, Mail, Lock, ArrowLeft, User, Phone, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import hadafLogo from '@/assets/hadaf-logo.png';

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'employer' | 'employee'>('employee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    position: '',
    city: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    if (!validateEmail(formData.email)) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمة المرور",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "الموافقة على الشروط مطلوبة",
        description: "يجب الموافقة على الشروط والأحكام للمتابعة",
        variant: "destructive"
      });
      return;
    }

    console.log('تسجيل حساب جديد:', { ...formData, userType });
    
    toast({
      title: "تم إنشاء الحساب بنجاح!",
      description: "يمكنك الآن تسجيل الدخول بحسابك الجديد",
    });

    // توجيه المستخدم حسب نوع الحساب
    setTimeout(() => {
      if (userType === 'employer') {
        navigate('/business-login');
      } else {
        navigate('/login');
      }
    }, 2000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* الشعار والترحيب */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
          
          <img 
            src={hadafLogo} 
            alt="شعار هدف للموارد البشرية" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            إنشاء حساب جديد
          </h1>
          <p className="text-white/80">
            انضم إلى منصة هدف للموارد البشرية
          </p>
        </div>

        {/* اختيار نوع الحساب */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant={userType === 'employee' ? 'default' : 'outline'}
            onClick={() => setUserType('employee')}
            className={`h-16 ${userType === 'employee' ? 'bg-white text-primary' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
          >
            <User className="w-6 h-6 mb-2" />
            <span className="block text-sm">حساب موظف</span>
          </Button>
          <Button
            variant={userType === 'employer' ? 'default' : 'outline'}
            onClick={() => setUserType('employer')}
            className={`h-16 ${userType === 'employer' ? 'bg-white text-primary' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
          >
            <Building2 className="w-6 h-6 mb-2" />
            <span className="block text-sm">حساب صاحب عمل</span>
          </Button>
        </div>

        {/* نموذج التسجيل */}
        <Card className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الاسم الكامل */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* المدينة */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-right">المدينة</Label>
                <Select onValueChange={(value) => handleInputChange('city', value)} required>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="dammam">الدمام</SelectItem>
                    <SelectItem value="mecca">مكة المكرمة</SelectItem>
                    <SelectItem value="medina">المدينة المنورة</SelectItem>
                    <SelectItem value="taif">الطائف</SelectItem>
                    <SelectItem value="abha">أبها</SelectItem>
                    <SelectItem value="tabuk">تبوك</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* حقول إضافية حسب نوع الحساب */}
            {userType === 'employer' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-right">اسم الشركة</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="اسم الشركة أو المؤسسة"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="pl-10 text-right"
                      required={userType === 'employer'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-right">المنصب</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="position"
                      type="text"
                      placeholder="مدير عام، مدير موارد بشرية، إلخ"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="pl-10 text-right"
                      required={userType === 'employer'}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة مرور قوية"
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

              {/* تأكيد كلمة المرور */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-right">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد كتابة كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* الموافقة على الشروط */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <Checkbox 
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                required
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                أوافق على{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  شروط الاستخدام
                </Button>
                {' '}و{' '}
                <Button variant="link" className="text-primary underline p-0 h-auto text-sm">
                  سياسة الخصوصية
                </Button>
                {' '}الخاصة بمنصة هدف للموارد البشرية
              </Label>
            </div>

            {/* زر التسجيل */}
            <Button type="submit" className="w-full btn-primary">
              {userType === 'employer' ? <Building2 className="h-4 w-4 mr-2" /> : <User className="h-4 w-4 mr-2" />}
              إنشاء الحساب
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

            {/* تسجيل الدخول */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                لديك حساب بالفعل؟{' '}
                <Button 
                  variant="link" 
                  className="text-primary p-0 h-auto font-semibold"
                  onClick={() => navigate('/login')}
                >
                  سجل الدخول
                </Button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};