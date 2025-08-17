import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Gift,
  Car,
  Home,
  GraduationCap,
  Phone,
  Plane,
  Calculator,
  FileText,
  Download,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Star,
  Award,
  Target,
  TrendingUp,
  Zap,
  Coffee,
  Wifi,
  Dumbbell,
  Baby
} from 'lucide-react';

const BenefitsRewards = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddBenefitOpen, setIsAddBenefitOpen] = useState(false);
  const [isAddRewardOpen, setIsAddRewardOpen] = useState(false);

  // بيانات المزايا والحوافز
  const benefitsData = {
    totalBenefitsCost: 560000,
    totalRewardsCost: 180000,
    beneficiaryEmployees: 145,
    activeBenefits: 12,
    rewardsThisYear: 45,
    employeeSatisfaction: 4.3
  };

  // المزايا الأساسية
  const basicBenefits = [
    {
      id: 1,
      name: 'بدل السكن',
      type: 'housing',
      amount: 2000,
      eligibleEmployees: 145,
      enrolled: 120,
      totalCost: 240000,
      description: 'بدل سكن شهري للموظفين المؤهلين',
      status: 'active'
    },
    {
      id: 2,
      name: 'بدل المواصلات',
      type: 'transport',
      amount: 800,
      eligibleEmployees: 145,
      enrolled: 145,
      totalCost: 116000,
      description: 'بدل مواصلات شهري لجميع الموظفين',
      status: 'active'
    },
    {
      id: 3,
      name: 'بدل الهاتف',
      type: 'phone',
      amount: 200,
      eligibleEmployees: 89,
      enrolled: 67,
      totalCost: 13400,
      description: 'بدل اتصالات للمناصب الإدارية',
      status: 'active'
    },
    {
      id: 4,
      name: 'التدريب والتطوير',
      type: 'training',
      amount: 5000,
      eligibleEmployees: 145,
      enrolled: 34,
      totalCost: 170000,
      description: 'برامج التدريب والتطوير المهني السنوية',
      status: 'active'
    },
    {
      id: 5,
      name: 'إجازة إضافية',
      type: 'vacation',
      amount: 0,
      eligibleEmployees: 145,
      enrolled: 145,
      totalCost: 0,
      description: '5 أيام إجازة إضافية سنوياً',
      status: 'active'
    },
    {
      id: 6,
      name: 'بدل الأطفال',
      type: 'childcare',
      amount: 300,
      eligibleEmployees: 78,
      enrolled: 45,
      totalCost: 13500,
      description: 'بدل شهري لرعاية الأطفال',
      status: 'active'
    }
  ];

  // المزايا الإضافية والترفيهية
  const additionalBenefits = [
    {
      id: 7,
      name: 'عضوية النادي الرياضي',
      type: 'gym',
      amount: 150,
      eligibleEmployees: 145,
      enrolled: 67,
      totalCost: 10050,
      description: 'عضوية مجانية في النادي الرياضي',
      status: 'active'
    },
    {
      id: 8,
      name: 'وجبات مجانية',
      type: 'meals',
      amount: 25,
      eligibleEmployees: 145,
      enrolled: 123,
      totalCost: 3075,
      description: 'وجبة غداء مجانية يومياً',
      status: 'active'
    },
    {
      id: 9,
      name: 'إنترنت مجاني',
      type: 'internet',
      amount: 100,
      eligibleEmployees: 145,
      enrolled: 89,
      totalCost: 8900,
      description: 'باقة إنترنت منزلي مجانية',
      status: 'active'
    },
    {
      id: 10,
      name: 'قهوة ومشروبات',
      type: 'beverages',
      amount: 0,
      eligibleEmployees: 145,
      enrolled: 145,
      totalCost: 2400,
      description: 'قهوة ومشروبات مجانية في المكتب',
      status: 'active'
    }
  ];

  // نظام المكافآت والحوافز
  const rewardsSystem = [
    {
      id: 1,
      name: 'مكافأة الأداء المتميز',
      type: 'performance',
      amount: 5000,
      frequency: 'ربعي',
      recipients: 12,
      totalPaid: 60000,
      description: 'مكافأة للموظفين ذوي الأداء المتميز',
      criteria: 'تقييم أداء 90% فأكثر'
    },
    {
      id: 2,
      name: 'مكافأة الحضور المنتظم',
      type: 'attendance',
      amount: 1000,
      frequency: 'شهري',
      recipients: 89,
      totalPaid: 89000,
      description: 'مكافأة للحضور المنتظم بدون تأخير',
      criteria: 'حضور 100% بدون تأخير'
    },
    {
      id: 3,
      name: 'مكافأة الابتكار',
      type: 'innovation',
      amount: 3000,
      frequency: 'حسب الحاجة',
      recipients: 8,
      totalPaid: 24000,
      description: 'مكافأة لتقديم أفكار إبداعية',
      criteria: 'تطبيق فكرة إبداعية مفيدة'
    },
    {
      id: 4,
      name: 'مكافأة العمل الجماعي',
      type: 'teamwork',
      amount: 2000,
      frequency: 'شهري',
      recipients: 23,
      totalPaid: 46000,
      description: 'مكافأة للتعاون والعمل الجماعي',
      criteria: 'تقييم العمل الجماعي العالي'
    },
    {
      id: 5,
      name: 'مكافأة خدمة العملاء',
      type: 'service',
      amount: 1500,
      frequency: 'شهري',
      recipients: 15,
      totalPaid: 22500,
      description: 'مكافأة لتميز خدمة العملاء',
      criteria: 'تقييم عملاء 95% فأكثر'
    }
  ];

  // إحصائيات المكافآت الشهرية
  const monthlyRewards = [
    { month: 'يناير', amount: 45000, recipients: 28 },
    { month: 'فبراير', amount: 52000, recipients: 32 },
    { month: 'مارس', amount: 48000, recipients: 29 },
    { month: 'أبريل', amount: 56000, recipients: 34 },
    { month: 'مايو', amount: 61000, recipients: 38 },
    { month: 'يونيو', amount: 49000, recipients: 31 }
  ];

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case 'housing':
        return <Home className="h-6 w-6 text-blue-500" />;
      case 'transport':
        return <Car className="h-6 w-6 text-green-500" />;
      case 'phone':
        return <Phone className="h-6 w-6 text-purple-500" />;
      case 'training':
        return <GraduationCap className="h-6 w-6 text-orange-500" />;
      case 'vacation':
        return <Plane className="h-6 w-6 text-cyan-500" />;
      case 'childcare':
        return <Baby className="h-6 w-6 text-pink-500" />;
      case 'gym':
        return <Dumbbell className="h-6 w-6 text-red-500" />;
      case 'meals':
        return <Coffee className="h-6 w-6 text-amber-500" />;
      case 'internet':
        return <Wifi className="h-6 w-6 text-indigo-500" />;
      case 'beverages':
        return <Coffee className="h-6 w-6 text-brown-500" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <Star className="h-6 w-6 text-yellow-500" />;
      case 'attendance':
        return <Clock className="h-6 w-6 text-green-500" />;
      case 'innovation':
        return <Zap className="h-6 w-6 text-purple-500" />;
      case 'teamwork':
        return <Users className="h-6 w-6 text-blue-500" />;
      case 'service':
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const handleExport = () => {
    toast.success('تم تصدير بيانات المزايا والحوافز');
  };

  const handleAddBenefit = () => {
    setIsAddBenefitOpen(true);
    toast.info('فتح نموذج إضافة ميزة جديدة');
  };

  const handleAddReward = () => {
    setIsAddRewardOpen(true);
    toast.info('فتح نموذج إضافة مكافأة جديدة');
  };

  const allBenefits = [...basicBenefits, ...additionalBenefits];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">المزايا والحوافز</h2>
          <p className="text-muted-foreground">إدارة مزايا الموظفين ونظام المكافآت والحوافز</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            تصدير البيانات
          </Button>
          <Button onClick={handleAddBenefit}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة ميزة
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="benefits">المزايا</TabsTrigger>
          <TabsTrigger value="rewards">المكافآت والحوافز</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">تكلفة المزايا</p>
                    <p className="text-2xl font-bold">{benefitsData.totalBenefitsCost.toLocaleString()} ريال</p>
                  </div>
                  <Gift className="h-10 w-10 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">تكلفة المكافآت</p>
                    <p className="text-2xl font-bold">{benefitsData.totalRewardsCost.toLocaleString()} ريال</p>
                  </div>
                  <Award className="h-10 w-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">موظف مستفيد</p>
                    <p className="text-2xl font-bold">{benefitsData.beneficiaryEmployees}</p>
                  </div>
                  <Users className="h-10 w-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">مزايا نشطة</p>
                    <p className="text-2xl font-bold">{benefitsData.activeBenefits}</p>
                  </div>
                  <Gift className="h-10 w-10 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100">مكافآت السنة</p>
                    <p className="text-2xl font-bold">{benefitsData.rewardsThisYear}</p>
                  </div>
                  <Star className="h-10 w-10 text-teal-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100">رضا الموظفين</p>
                    <p className="text-2xl font-bold">{benefitsData.employeeSatisfaction}/5</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-indigo-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-primary/10"
              onClick={() => setActiveTab('benefits')}
            >
              <Gift className="h-6 w-6" />
              إدارة المزايا
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-secondary/10"
              onClick={() => setActiveTab('rewards')}
            >
              <Award className="h-6 w-6" />
              إدارة المكافآت
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-destructive/10"
              onClick={handleAddBenefit}
            >
              <Plus className="h-6 w-6" />
              ميزة جديدة
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-green-50"
              onClick={handleExport}
            >
              <Download className="h-6 w-6" />
              تقارير شاملة
            </Button>
          </div>

          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>المزايا الأكثر استخداماً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allBenefits
                    .sort((a, b) => (b.enrolled / b.eligibleEmployees) - (a.enrolled / a.eligibleEmployees))
                    .slice(0, 5)
                    .map((benefit) => (
                      <div key={benefit.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getBenefitIcon(benefit.type)}
                          <span className="font-medium">{benefit.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{Math.round((benefit.enrolled / benefit.eligibleEmployees) * 100)}%</div>
                          <div className="text-sm text-muted-foreground">{benefit.enrolled} موظف</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المكافآت الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRewards.slice(-4).map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="font-medium">{month.month}</span>
                      <div className="text-right">
                        <div className="font-bold">{month.amount.toLocaleString()} ريال</div>
                        <div className="text-sm text-muted-foreground">{month.recipients} موظف</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid gap-4">
            {allBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        {getBenefitIcon(benefit.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{benefit.name}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {benefit.amount > 0 && (
                        <div className="text-center">
                          <div className="text-sm font-medium">المبلغ الشهري</div>
                          <div className="text-lg font-bold text-primary">{benefit.amount.toLocaleString()} ريال</div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-sm font-medium">التكلفة السنوية</div>
                        <div className="text-lg font-bold text-green-600">{benefit.totalCost.toLocaleString()} ريال</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">المؤهلون</div>
                        <div className="text-lg font-bold">{benefit.eligibleEmployees} موظف</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">المشتركون</div>
                        <div className="text-lg font-bold text-blue-600">{benefit.enrolled} موظف</div>
                      </div>
                      <div className="w-24">
                        <div className="text-sm font-medium mb-1">معدل المشاركة</div>
                        <Progress 
                          value={(benefit.enrolled / benefit.eligibleEmployees) * 100} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.round((benefit.enrolled / benefit.eligibleEmployees) * 100)}%
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 ml-1" />
                          تحرير
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">نظام المكافآت والحوافز</h3>
            <Button onClick={handleAddReward}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة مكافأة
            </Button>
          </div>
          
          <div className="grid gap-4">
            {rewardsSystem.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        {getRewardIcon(reward.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                        <p className="text-sm text-muted-foreground">معايير الاستحقاق: {reward.criteria}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">قيمة المكافأة</div>
                        <div className="text-lg font-bold text-primary">{reward.amount.toLocaleString()} ريال</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">التكرار</div>
                        <div className="text-sm font-medium">{reward.frequency}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">المستفيدون</div>
                        <div className="text-lg font-bold text-blue-600">{reward.recipients} موظف</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">إجمالي المدفوع</div>
                        <div className="text-lg font-bold text-green-600">{reward.totalPaid.toLocaleString()} ريال</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 ml-1" />
                          تحرير
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-6 w-6" />
                  تقارير المزايا
                </CardTitle>
                <CardDescription>تقارير تفصيلية عن مزايا الموظفين</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير المزايا الشهري');
                    handleExport();
                  }}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  تقرير المزايا الشهري
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير التكاليف');
                    handleExport();
                  }}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  تقرير تكاليف المزايا
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير المشاركة');
                    handleExport();
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  تقرير معدلات المشاركة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6" />
                  تقارير المكافآت
                </CardTitle>
                <CardDescription>تقارير المكافآت والحوافز الممنوحة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير المكافآت الشهري');
                    handleExport();
                  }}
                >
                  <Star className="h-4 w-4 mr-2" />
                  تقرير المكافآت الشهري
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير الأداء والمكافآت');
                    handleExport();
                  }}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  تقرير الأداء والمكافآت
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء التقرير السنوي للمكافآت');
                    handleExport();
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  التقرير السنوي للمكافآت
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Benefit Dialog */}
      <Dialog open={isAddBenefitOpen} onOpenChange={setIsAddBenefitOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة ميزة جديدة</DialogTitle>
            <DialogDescription>
              إضافة ميزة جديدة لمزايا الموظفين
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="benefitName">اسم الميزة</Label>
                <Input id="benefitName" placeholder="اسم الميزة" />
              </div>
              <div>
                <Label htmlFor="benefitType">نوع الميزة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الميزة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">بدل سكن</SelectItem>
                    <SelectItem value="transport">بدل مواصلات</SelectItem>
                    <SelectItem value="phone">بدل اتصالات</SelectItem>
                    <SelectItem value="training">تدريب وتطوير</SelectItem>
                    <SelectItem value="vacation">إجازات إضافية</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">المبلغ الشهري</Label>
                <Input id="amount" type="number" placeholder="المبلغ بالريال" />
              </div>
              <div>
                <Label htmlFor="eligibleEmployees">عدد المؤهلين</Label>
                <Input id="eligibleEmployees" type="number" placeholder="عدد الموظفين المؤهلين" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">وصف الميزة</Label>
              <Textarea id="description" placeholder="وصف تفصيلي للميزة..." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                toast.success('تم إضافة الميزة بنجاح');
                setIsAddBenefitOpen(false);
              }}>
                إضافة الميزة
              </Button>
              <Button variant="outline" onClick={() => setIsAddBenefitOpen(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Reward Dialog */}
      <Dialog open={isAddRewardOpen} onOpenChange={setIsAddRewardOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة مكافأة جديدة</DialogTitle>
            <DialogDescription>
              إضافة نوع مكافأة جديد لنظام الحوافز
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rewardName">اسم المكافأة</Label>
                <Input id="rewardName" placeholder="اسم المكافأة" />
              </div>
              <div>
                <Label htmlFor="rewardType">نوع المكافأة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المكافأة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">أداء متميز</SelectItem>
                    <SelectItem value="attendance">حضور منتظم</SelectItem>
                    <SelectItem value="innovation">ابتكار</SelectItem>
                    <SelectItem value="teamwork">عمل جماعي</SelectItem>
                    <SelectItem value="service">خدمة عملاء</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rewardAmount">قيمة المكافأة</Label>
                <Input id="rewardAmount" type="number" placeholder="القيمة بالريال" />
              </div>
              <div>
                <Label htmlFor="frequency">تكرار المكافأة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التكرار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">شهري</SelectItem>
                    <SelectItem value="quarterly">ربعي</SelectItem>
                    <SelectItem value="yearly">سنوي</SelectItem>
                    <SelectItem value="ondemand">حسب الحاجة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="criteria">معايير الاستحقاق</Label>
              <Textarea id="criteria" placeholder="معايير وشروط الحصول على المكافأة..." />
            </div>
            <div>
              <Label htmlFor="rewardDescription">وصف المكافأة</Label>
              <Textarea id="rewardDescription" placeholder="وصف تفصيلي للمكافأة..." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                toast.success('تم إضافة المكافأة بنجاح');
                setIsAddRewardOpen(false);
              }}>
                إضافة المكافأة
              </Button>
              <Button variant="outline" onClick={() => setIsAddRewardOpen(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BenefitsRewards;