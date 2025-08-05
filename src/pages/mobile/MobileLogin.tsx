import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint, Globe, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export const MobileLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
    navigate('/mobile-dashboard');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleBiometricLogin = () => {
    // Handle biometric login logic
    console.log('Biometric login requested');
  };

  const handleNafathLogin = () => {
    // Handle Nafath login logic
    console.log('Nafath login requested');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="font-bold text-xl">BOOD HR</span>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleLanguage}>
          <Globe className="h-5 w-5 mr-2" />
          {i18n.language === 'ar' ? 'EN' : 'عربي'}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t('welcome')}</CardTitle>
            <CardDescription>{t('loginSubtitle')}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username/Email Field */}
              <div className="space-y-2">
                <Label htmlFor="username">{t('username')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t('username')}
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-12 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    {t('rememberMe')}
                  </Label>
                </div>
                <Button variant="link" className="text-sm p-0 h-auto">
                  {t('forgotPassword')}
                </Button>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full h-12 text-lg">
                {t('login')}
              </Button>
            </form>

            {/* Alternative Login Methods */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">أو</span>
                </div>
              </div>

              {/* Biometric Login */}
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleBiometricLogin}
              >
                <Fingerprint className="h-5 w-5 mr-2" />
                {t('loginWithBiometrics')}
              </Button>

              {/* Nafath Login */}
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleNafathLogin}
              >
                <Smartphone className="h-5 w-5 mr-2" />
                {t('loginWithNafath')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-muted-foreground">
        <p>© 2024 BOOD HR. جميع الحقوق محفوظة</p>
      </div>
    </div>
  );
};