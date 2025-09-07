import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  CreditCard, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  RefreshCw,
  Settings,
  Star,
  Zap,
  Shield,
  Users,
  Database,
  Clock,
  Bell,
  HeadphonesIcon
} from 'lucide-react';

export const SubscriptionManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('current');

  // Mock subscription data
  const currentSubscription = {
    plan: 'Enterprise Pro',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    price: 2500,
    currency: 'SAR',
    employeeLimit: 500,
    currentEmployees: 245,
    features: [
      'إدارة شاملة للموارد البشرية',
      'تقييم الأداء المتقدم',
      'تحليلات ذكية مدعومة بالـ AI',
      'دعم فني 24/7',
      'تخزين غير محدود',
      'تقارير متقدمة',
      'API متكامل',
      'أمان متقدم'
    ]
  };

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-01',
      amount: 2500,
      status: 'paid',
      invoice: 'INV-2024-001',
      description: 'اشتراك سنوي - Enterprise Pro'
    },
    {
      id: 2,
      date: '2023-01-01',
      amount: 2000,
      status: 'paid',
      invoice: 'INV-2023-001',
      description: 'اشتراك سنوي - Professional'
    },
    {
      id: 3,
      date: '2022-01-01',
      amount: 1500,
      status: 'paid',
      invoice: 'INV-2022-001',
      description: 'اشتراك سنوي - Standard'
    }
  ];

  const availableUpgrades = [
    {
      name: 'Enterprise Plus',
      price: 3500,
      features: [
        'جميع مميزات Enterprise Pro',
        'ذكاء اصطناعي متقدم',
        'تحليلات تنبؤية',
        'دعم أولوية قصوى',
        '1000 موظف',
        'تكامل مخصص'
      ],
      recommended: true
    },
    {
      name: 'Custom Enterprise',
      price: 'حسب الطلب',
      features: [
        'حلول مخصصة بالكامل',
        'عدد موظفين غير محدود',
        'تطوير مخصص',
        'مدير حساب مخصص',
        'SLA مضمون',
        'تدريب متقدم'
      ],
      recommended: false
    }
  ];

  const usageMetrics = [
    {
      title: 'الموظفين المستخدمين',
      current: 245,
      limit: 500,
      percentage: 49,
      color: 'bg-green-500'
    },
    {
      title: 'التخزين المستخدم',
      current: '15.2 GB',
      limit: 'غير محدود',
      percentage: 0,
      color: 'bg-blue-500'
    },
    {
      title: 'طلبات API الشهرية',
      current: 25400,
      limit: 100000,
      percentage: 25,
      color: 'bg-purple-500'
    },
    {
      title: 'التقارير المُنشأة',
      current: 156,
      limit: 'غير محدود',
      percentage: 0,
      color: 'bg-orange-500'
    }
  ];

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(currentSubscription.endDate);

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">الاشتراك الحالي</TabsTrigger>
          <TabsTrigger value="billing">الفواتير والمدفوعات</TabsTrigger>
          <TabsTrigger value="usage">استخدام الموارد</TabsTrigger>
          <TabsTrigger value="upgrade">الترقية والتحديث</TabsTrigger>
        </TabsList>

        {/* Current Subscription */}
        <TabsContent value="current" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Subscription Status */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    {currentSubscription.plan}
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    نشط
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">المبلغ السنوي</span>
                    <span className="text-2xl font-bold text-primary">
                      {currentSubscription.price.toLocaleString()} {currentSubscription.currency}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">تاريخ الانتهاء</span>
                    <span className="font-medium">{currentSubscription.endDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">الأيام المتبقية</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${daysRemaining < 30 ? 'text-red-600' : 'text-green-600'}`}>
                        {daysRemaining} يوم
                      </span>
                      {daysRemaining < 30 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        تجديد الاشتراك
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        إدارة الاشتراك
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  المميزات المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSubscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center text-center space-y-2">
                  <Download className="w-5 h-5 text-primary" />
                  <span className="text-sm">تحميل الفاتورة</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center text-center space-y-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-sm">تحديث طريقة الدفع</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center text-center space-y-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-sm">إعدادات التنبيهات</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center text-center space-y-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm">تاريخ الاشتراكات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                سجل الفواتير والمدفوعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{bill.description}</h4>
                        <p className="text-sm text-gray-600">فاتورة رقم: {bill.invoice}</p>
                        <p className="text-xs text-gray-400">التاريخ: {bill.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{bill.amount.toLocaleString()} ر.س</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        مدفوع
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      تحميل
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Metrics */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {usageMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{metric.current}</span>
                      <span className="text-sm text-gray-600">من {metric.limit}</span>
                    </div>
                    {metric.percentage > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>الاستخدام</span>
                          <span>{metric.percentage}%</span>
                        </div>
                        <Progress value={metric.percentage} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Upgrade Options */}
        <TabsContent value="upgrade" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {availableUpgrades.map((upgrade, index) => (
              <Card key={index} className={`relative ${upgrade.recommended ? 'border-2 border-primary' : ''}`}>
                {upgrade.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      مُوصى به
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {upgrade.recommended ? (
                      <Crown className="w-5 h-5 text-primary" />
                    ) : (
                      <Zap className="w-5 h-5 text-primary" />
                    )}
                    {upgrade.name}
                  </CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {typeof upgrade.price === 'number' 
                      ? `${upgrade.price.toLocaleString()} ر.س/سنوياً`
                      : upgrade.price
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {upgrade.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={upgrade.recommended ? "default" : "outline"}>
                      {upgrade.recommended ? "ترقية الآن" : "طلب عرض سعر"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold">تحتاج حلول مخصصة؟</h3>
                <p className="text-gray-600">
                  تواصل مع فريق المبيعات للحصول على عرض سعر مخصص يناسب احتياجات شركتك
                </p>
                <div className="flex justify-center gap-4">
                  <Button>
                    <HeadphonesIcon className="w-4 h-4 mr-2" />
                    تواصل مع المبيعات
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    طلب عرض سعر
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};