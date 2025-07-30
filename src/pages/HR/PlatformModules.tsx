import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Plus, 
  Settings, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  BarChart3,
  GraduationCap,
  Shield,
  MessageSquare,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'inactive' | 'trial';
  users: number;
  category: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export const PlatformModules: React.FC = () => {
  const navigate = useNavigate();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

  // Mock platforms data
  const platforms: Platform[] = [
    {
      id: 'hr',
      name: 'إدارة الموارد البشرية',
      description: 'نظام شامل لإدارة شؤون الموظفين',
      icon: Users,
      status: 'active',
      users: 150,
      category: 'HR'
    },
    {
      id: 'payroll',
      name: 'نظام الرواتب',
      description: 'حساب وإدارة الرواتب والمستحقات',
      icon: DollarSign,
      status: 'active',
      users: 150,
      category: 'Finance'
    },
    {
      id: 'attendance',
      name: 'الحضور والانصراف',
      description: 'تتبع حضور الموظفين بنظام GPS',
      icon: Clock,
      status: 'active',
      users: 150,
      category: 'HR'
    },
    {
      id: 'training',
      name: 'منصة التدريب',
      description: 'إدارة البرامج التدريبية والتطوير',
      icon: GraduationCap,
      status: 'trial',
      users: 25,
      category: 'Development'
    },
    {
      id: 'reports',
      name: 'التقارير والتحليلات',
      description: 'تقارير مفصلة وتحليلات ذكية',
      icon: BarChart3,
      status: 'active',
      users: 50,
      category: 'Analytics'
    },
    {
      id: 'recruitment',
      name: 'التوظيف الذكي',
      description: 'نظام إدارة التوظيف والمرشحين',
      icon: FileText,
      status: 'inactive',
      users: 0,
      category: 'HR'
    }
  ];

  // Mock subscription plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      price: 299,
      features: [
        'حتى 50 موظف',
        'إدارة الحضور والانصراف',
        'إدارة الإجازات',
        'التقارير الأساسية',
        'الدعم الفني'
      ]
    },
    {
      id: 'professional',
      name: 'الباقة الاحترافية',
      price: 599,
      popular: true,
      features: [
        'حتى 150 موظف',
        'جميع مميزات الباقة الأساسية',
        'نظام الرواتب المتقدم',
        'منصة التدريب',
        'التقارير التحليلية',
        'التكامل مع الأنظمة الخارجية',
        'الدعم على مدار الساعة'
      ]
    },
    {
      id: 'enterprise',
      name: 'باقة المؤسسات',
      price: 999,
      features: [
        'موظفين غير محدود',
        'جميع المنصات والمميزات',
        'التخصيص الكامل',
        'التكامل المتقدم',
        'التحليلات الذكية بالذكاء الاصطناعي',
        'مدير حساب مخصص',
        'التدريب والاستشارات'
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">مفعل</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">غير مفعل</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800">تجريبي</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HR':
        return 'bg-blue-50 hover:bg-blue-100';
      case 'Finance':
        return 'bg-green-50 hover:bg-green-100';
      case 'Development':
        return 'bg-purple-50 hover:bg-purple-100';
      case 'Analytics':
        return 'bg-orange-50 hover:bg-orange-100';
      default:
        return 'bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <h1 className="text-xl font-semibold">منصات النظام</h1>
                <p className="text-sm text-muted-foreground">إدارة وإضافة منصات جديدة</p>
              </div>
            </div>
            <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-1" />
                  إضافة منصة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-right">باقات الاشتراك</DialogTitle>
                  <DialogDescription className="text-right">
                    اختر الباقة المناسبة لاحتياجات مؤسستك
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {subscriptionPlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`border-2 ${plan.popular ? 'border-primary' : 'border-border'} relative`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-6">
                          <Badge className="bg-primary text-white">الأكثر شيوعاً</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-primary">
                          {plan.price} ريال
                          <span className="text-sm font-normal text-muted-foreground">/شهرياً</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-right">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full mt-6" 
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          اختيار الباقة
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{platforms.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي المنصات</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {platforms.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">منصات مفعلة</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {platforms.filter(p => p.status === 'trial').length}
              </div>
              <div className="text-sm text-muted-foreground">منصات تجريبية</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {platforms.reduce((total, p) => total + p.users, 0)}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المستخدمين</div>
            </CardContent>
          </Card>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Card 
              key={platform.id} 
              className={`border-0 shadow-sm cursor-pointer transition-all duration-200 ${getCategoryColor(platform.category)}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusBadge(platform.status)}
                    <Badge variant="outline" className="text-xs">
                      {platform.category}
                    </Badge>
                  </div>
                  <platform.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-right">
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {platform.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2 space-x-reverse">
                    <Button size="sm" variant="ghost">
                      <Settings className="w-4 h-4 ml-1" />
                      إعدادات
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {platform.users} مستخدم
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Access Logs */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-right">سجل دخول المنصات</CardTitle>
            <CardDescription className="text-right">
              آخر الأنشطة والوصول للمنصات
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'أحمد محمد', platform: 'إدارة الموارد البشرية', time: 'منذ 5 دقائق', action: 'تسجيل الحضور' },
                { user: 'سارة أحمد', platform: 'نظام الرواتب', time: 'منذ 15 دقيقة', action: 'عرض كشف الراتب' },
                { user: 'محمد علي', platform: 'منصة التدريب', time: 'منذ 30 دقيقة', action: 'إكمال الدورة التدريبية' },
                { user: 'فاطمة خالد', platform: 'التقارير والتحليلات', time: 'منذ ساعة', action: 'تصدير تقرير شهري' }
              ].map((log, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    {log.time}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{log.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.action} - {log.platform}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};