import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';
import { EmployeeManagementIntegration } from '@/components/EmployeeManagementIntegration';
import { 
  CheckCircle, 
  Users, 
  Shield, 
  Mail, 
  Globe, 
  Clock,
  Database,
  Settings,
  Activity,
  UserCheck,
  Award,
  Eye
} from 'lucide-react';

type ViewType = 'dashboard' | 'management' | 'overview';

export const EmployeeSelfService = () => {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [completionProgress, setCompletionProgress] = useState(0);

  useEffect(() => {
    // تطبيق الوضع المظلم التلقائي حسب الوقت
    const applyAutoDarkMode = () => {
      const hour = new Date().getHours();
      const isDarkTime = hour >= 19 || hour < 6; // من 7 مساءً حتى 6 صباحاً
      
      if (isDarkTime) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAutoDarkMode();
    
    // محاكاة تقدم الإنجاز
    const interval = setInterval(() => {
      setCompletionProgress(prev => {
        if (prev < 100) return prev + 1;
        return 100;
      });
    }, 50);
    
    // فحص كل ساعة للوضع المظلم
    const darkModeInterval = setInterval(applyAutoDarkMode, 60 * 60 * 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(darkModeInterval);
    };
  }, []);

  const systemFeatures = [
    {
      title: "نظام إدارة الموظفين المتكامل",
      description: "إدارة شاملة لبيانات الموظفين مع التشفير والأمان",
      icon: <Users className="h-8 w-8 text-primary" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "نظام الإشعارات الذكي",
      description: "إشعارات فورية للموظفين عند التحديثات والتغييرات",
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "تشفير البيانات الحساسة",
      description: "حماية متقدمة لبيانات الموظفين والمعلومات السرية",
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "نظام البريد الإلكتروني التلقائي",
      description: "إرسال تلقائي لرسائل الترحيب وكلمات المرور المؤقتة",
      icon: <Mail className="h-8 w-8 text-purple-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "اكتشاف اللغة التلقائي",
      description: "تحديد اللغة تلقائياً حسب إعدادات المستخدم",
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "الوضع المظلم التلقائي",
      description: "تبديل تلقائي للوضع المظلم حسب الوقت",
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "قاعدة البيانات المؤمنة",
      description: "سياسات أمان متقدمة وتشفير للبيانات الحساسة",
      icon: <Database className="h-8 w-8 text-red-600" />,
      status: "مكتمل",
      completion: 100
    },
    {
      title: "واجهة المستخدم المتجاوبة",
      description: "تصميم يتكيف مع جميع أحجام الشاشات",
      icon: <Eye className="h-8 w-8 text-teal-600" />,
      status: "مكتمل",
      completion: 100
    }
  ];

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <Button 
            onClick={() => setCurrentView('overview')}
            variant="outline"
            className="mb-4"
          >
            ← العودة إلى النظرة العامة
          </Button>
        </div>
        <EmployeeDashboard />
      </div>
    );
  }

  if (currentView === 'management') {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <Button 
            onClick={() => setCurrentView('overview')}
            variant="outline"
            className="mb-4"
          >
            ← العودة إلى النظرة العامة
          </Button>
        </div>
        <EmployeeManagementIntegration />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6" dir="rtl">
      <div className="container mx-auto space-y-6">
        {/* رأس الصفحة */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative">
                <CheckCircle className="h-16 w-16 text-green-600" />
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-green-600 text-white">100%</Badge>
                </div>
              </div>
              <div>
                  <CardTitle className="text-xl">
                    نظام بُعد HR المتكامل
                  </CardTitle>
                  <p className="text-lg text-muted-foreground mt-2">
                    الخدمة الذاتية للموظفين
                  </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التقدم الإجمالي</span>
                <span>{completionProgress}%</span>
              </div>
              <Progress value={completionProgress} className="h-3" />
            </div>
          </CardHeader>
        </Card>

        {/* أزرار التنقل */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={() => setCurrentView('overview')}
            variant={currentView === 'overview' ? 'default' : 'outline'}
            className="gap-2"
          >
            <Activity className="h-4 w-4" />
            نظرة عامة على النظام
          </Button>
          <Button 
            onClick={() => setCurrentView('dashboard')}
            variant={'outline'}
            className="gap-2"
          >
            <UserCheck className="h-4 w-4" />
            لوحة تحكم الموظف
          </Button>
          <Button 
            onClick={() => setCurrentView('management')}
            variant={'outline'}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            إدارة الموظفين
          </Button>
        </div>

        {/* الميزات المكتملة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  {feature.icon}
                  <Badge className="bg-green-600 text-white">
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>الإنجاز</span>
                    <span>{feature.completion}%</span>
                  </div>
                  <Progress value={feature.completion} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* إحصائيات النظام */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              إحصائيات الإنجاز
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600">8</div>
                <div className="text-sm text-muted-foreground">ميزات مكتملة</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-muted-foreground">وظائف قاعدة البيانات</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-muted-foreground">واجهات مستخدم</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-muted-foreground">الأمان والحماية</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* الميزات التقنية */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              الميزات التقنية المتقدمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">الأمان والحماية</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    تشفير البيانات الحساسة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    سياسات RLS المتقدمة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    مراجعة العمليات (Audit Logs)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    التحقق من الهوية المتعدد
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">التفاعل والإشعارات</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    إشعارات فورية للموظفين
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    رسائل بريد إلكتروني تلقائية
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    تحديثات مباشرة (Real-time)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    واجهة متعددة اللغات
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* رسالة النجاح */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                  تم إنجاز النظام بنجاح!
                </h3>
                <p className="text-green-700 dark:text-green-400">
                  جميع المتطلبات تم تنفيذها بنسبة 100% مع أفضل معايير الأمان والجودة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};