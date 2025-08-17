import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Shield,
  Heart,
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
  Building2
} from 'lucide-react';

const BenefitsInsurance = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // بيانات المزايا والتأمينات
  const benefitsData = {
    totalBenefitsCost: 1250000,
    insuredEmployees: 145,
    totalClaimsThisYear: 89,
    pendingClaims: 12,
    activePackages: 8
  };

  // باقات التأمين
  const insurancePackages = [
    {
      id: 1,
      name: 'التأمين الطبي الأساسي',
      provider: 'شركة التعاونية للتأمين',
      coverage: 150000,
      premium: 2400,
      employees: 120,
      status: 'active',
      type: 'medical'
    },
    {
      id: 2,
      name: 'التأمين الطبي الشامل',
      provider: 'شركة الأهلي للتكافل',
      coverage: 300000,
      premium: 4800,
      employees: 45,
      status: 'active',
      type: 'medical'
    },
    {
      id: 3,
      name: 'تأمين السيارات',
      provider: 'شركة الراجحي للتأمين',
      coverage: 200000,
      premium: 3600,
      employees: 35,
      status: 'active',
      type: 'auto'
    },
    {
      id: 4,
      name: 'تأمين الحياة',
      provider: 'شركة وقاية للتأمين',
      coverage: 500000,
      premium: 1200,
      employees: 89,
      status: 'pending',
      type: 'life'
    }
  ];

  // المزايا الإضافية
  const additionalBenefits = [
    {
      id: 1,
      name: 'بدل السكن',
      type: 'housing',
      amount: 2000,
      eligibleEmployees: 145,
      enrolled: 120,
      description: 'بدل سكن شهري للموظفين المؤهلين'
    },
    {
      id: 2,
      name: 'بدل المواصلات',
      type: 'transport',
      amount: 800,
      eligibleEmployees: 145,
      enrolled: 145,
      description: 'بدل مواصلات شهري لجميع الموظفين'
    },
    {
      id: 3,
      name: 'بدل الهاتف',
      type: 'phone',
      amount: 200,
      eligibleEmployees: 89,
      enrolled: 67,
      description: 'بدل اتصالات للمناصب الإدارية'
    },
    {
      id: 4,
      name: 'التدريب والتطوير',
      type: 'training',
      amount: 5000,
      eligibleEmployees: 145,
      enrolled: 34,
      description: 'برامج التدريب والتطوير المهني'
    },
    {
      id: 5,
      name: 'إجازة إضافية',
      type: 'vacation',
      amount: 0,
      eligibleEmployees: 145,
      enrolled: 145,
      description: '5 أيام إجازة إضافية سنوياً'
    }
  ];

  // مطالبات التأمين
  const insuranceClaims = [
    {
      id: 1,
      employeeName: 'أحمد محمد العلي',
      claimType: 'طبي',
      amount: 15000,
      status: 'approved',
      dateSubmitted: '2024-03-10',
      description: 'فحوصات طبية شاملة'
    },
    {
      id: 2,
      employeeName: 'فاطمة سعد الأحمد',
      claimType: 'طبي',
      amount: 8500,
      status: 'pending',
      dateSubmitted: '2024-03-15',
      description: 'علاج أسنان'
    },
    {
      id: 3,
      employeeName: 'خالد يوسف النمر',
      claimType: 'سيارة',
      amount: 12000,
      status: 'processing',
      dateSubmitted: '2024-03-12',
      description: 'إصلاح أضرار حادث'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">غير نشط</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">موافق عليه</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">قيد المعالجة</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case 'housing':
        return <Home className="h-6 w-6" />;
      case 'transport':
        return <Car className="h-6 w-6" />;
      case 'phone':
        return <Phone className="h-6 w-6" />;
      case 'training':
        return <GraduationCap className="h-6 w-6" />;
      case 'vacation':
        return <Plane className="h-6 w-6" />;
      default:
        return <Gift className="h-6 w-6" />;
    }
  };

  const handleExport = () => {
    toast.success('تم تصدير بيانات المزايا والتأمينات');
  };

  const handleAddBenefit = () => {
    toast.success('تم فتح نموذج إضافة ميزة جديدة');
  };

  const handleProcessClaim = (claimId: number) => {
    toast.success('تم معالجة المطالبة بنجاح');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">المزايا والتأمينات</h2>
          <p className="text-muted-foreground">إدارة مزايا الموظفين وباقات التأمين</p>
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
          <TabsTrigger value="insurance">التأمينات</TabsTrigger>
          <TabsTrigger value="benefits">المزايا</TabsTrigger>
          <TabsTrigger value="claims">المطالبات</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-foreground/80">إجمالي التكلفة</p>
                    <p className="text-2xl font-bold">{benefitsData.totalBenefitsCost.toLocaleString()} ريال</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-primary-foreground/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">موظف مؤمن</p>
                    <p className="text-2xl font-bold">{benefitsData.insuredEmployees}</p>
                  </div>
                  <Shield className="h-10 w-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">مطالبات السنة</p>
                    <p className="text-2xl font-bold">{benefitsData.totalClaimsThisYear}</p>
                  </div>
                  <FileText className="h-10 w-10 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">مطالبات معلقة</p>
                    <p className="text-2xl font-bold">{benefitsData.pendingClaims}</p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">باقات نشطة</p>
                    <p className="text-2xl font-bold">{benefitsData.activePackages}</p>
                  </div>
                  <Gift className="h-10 w-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-primary/10"
              onClick={() => setActiveTab('insurance')}
            >
              <Shield className="h-6 w-6" />
              إدارة التأمينات
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-secondary/10"
              onClick={() => setActiveTab('benefits')}
            >
              <Gift className="h-6 w-6" />
              إدارة المزايا
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-destructive/10"
              onClick={() => setActiveTab('claims')}
            >
              <FileText className="h-6 w-6" />
              معالجة المطالبات
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
        </TabsContent>

        {/* Insurance Tab */}
        <TabsContent value="insurance" className="space-y-6">
          <div className="grid gap-4">
            {insurancePackages.map((package_) => (
              <Card key={package_.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{package_.name}</h3>
                        <p className="text-sm text-muted-foreground">{package_.provider}</p>
                        <p className="text-sm text-muted-foreground">
                          التغطية: {package_.coverage.toLocaleString()} ريال
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">القسط السنوي</div>
                        <div className="text-lg font-bold text-primary">{package_.premium.toLocaleString()} ريال</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">عدد المؤمنين</div>
                        <div className="text-lg font-bold">{package_.employees} موظف</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">الحالة</div>
                        {getStatusBadge(package_.status)}
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

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid gap-4">
            {additionalBenefits.map((benefit) => (
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
                          <div className="text-sm font-medium">المبلغ</div>
                          <div className="text-lg font-bold text-primary">{benefit.amount.toLocaleString()} ريال</div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-sm font-medium">المؤهلون</div>
                        <div className="text-lg font-bold">{benefit.eligibleEmployees} موظف</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">المشتركون</div>
                        <div className="text-lg font-bold text-green-600">{benefit.enrolled} موظف</div>
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

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-6">
          <div className="grid gap-4">
            {insuranceClaims.map((claim) => (
              <Card key={claim.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{claim.employeeName}</h3>
                        <p className="text-sm text-muted-foreground">{claim.description}</p>
                        <p className="text-sm text-muted-foreground">نوع المطالبة: {claim.claimType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">المبلغ</div>
                        <div className="text-lg font-bold text-primary">{claim.amount.toLocaleString()} ريال</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">تاريخ التقديم</div>
                        <div className="text-sm">{claim.dateSubmitted}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">الحالة</div>
                        {getClaimStatusBadge(claim.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Button>
                        {claim.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleProcessClaim(claim.id)}
                          >
                            <CheckCircle className="h-4 w-4 ml-1" />
                            معالجة
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BenefitsInsurance;