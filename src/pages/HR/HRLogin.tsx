import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HRLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'employee' | 'admin'>('employee');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate with Supabase
    if (userType === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/employee-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">نظام الموارد البشرية</h1>
          <p className="text-muted-foreground">تسجيل الدخول إلى منصة الخدمة الذاتية</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              اختر نوع الحساب وأدخل بياناتك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'employee' | 'admin')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="employee" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  موظف
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  مدير
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      كلمة المرور
                    </Label>
                    <Input
                      id="employee-password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-right"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11">
                    دخول لوحة الموظف
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني للمدير
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="أدخل بريد المدير"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      كلمة المرور
                    </Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-right"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11">
                    دخول لوحة الإدارة
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                هل نسيت كلمة المرور؟
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-sm">
            العودة للموقع الرئيسي
          </Button>
        </div>
      </div>
    </div>
  );
};