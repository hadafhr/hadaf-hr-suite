import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Building2, Settings } from 'lucide-react';

const SelfServiceLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للرئيسية
            </Button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div>
                <h1 className="text-xl font-bold text-black">بُعد HR</h1>
                <p className="text-xs text-muted-foreground">BOUD</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
              <Settings className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-4">
              نظام الخدمة الذاتية
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة متطورة تمكن الموظفين وأصحاب الأعمال من إدارة طلباتهم وبياناتهم بكل سهولة
            </p>
          </div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Employee Login */}
            <Card className="service-card group cursor-pointer hover:shadow-strong transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mb-2">دخول الموظفين</CardTitle>
                <CardDescription className="text-base">
                  للوصول إلى لوحة تحكم الموظف وإدارة الطلبات الشخصية
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    عرض البيانات الشخصية والوظيفية
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    طلب الإجازات والأذونات
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    عرض كشوف الراتب والبونصات
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    تتبع ساعات العمل والحضور
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    التواصل مع إدارة الموارد البشرية
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/employee-dashboard')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  دخول الموظفين
                </Button>
              </CardContent>
            </Card>

            {/* Employer Login */}
            <Card className="service-card group cursor-pointer hover:shadow-strong transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">دخول أصحاب الأعمال</CardTitle>
                <CardDescription className="text-base">
                  للوصول إلى لوحة تحكم أصحاب الأعمال وإدارة الشركة
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    إدارة بيانات الموظفين والأقسام
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    مراجعة وإعتماد الطلبات
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    إدارة الرواتب والبونصات
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    تقارير الأداء والحضور
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    إعدادات النظام والصلاحيات
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate('/employer-dashboard')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  دخول أصحاب الأعمال
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">مميزات إضافية</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-green-500/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <h4 className="font-semibold mb-2">وصول آمن</h4>
                  <p className="text-sm text-muted-foreground">
                    تشفير متقدم وحماية البيانات
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  </div>
                  <h4 className="font-semibold mb-2">متاح 24/7</h4>
                  <p className="text-sm text-muted-foreground">
                    وصول من أي مكان وفي أي وقت
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                  </div>
                  <h4 className="font-semibold mb-2">سهولة الاستخدام</h4>
                  <p className="text-sm text-muted-foreground">
                    واجهة مستخدم بديهية ومبسطة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfServiceLogin;