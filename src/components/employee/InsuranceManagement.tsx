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
  Shield,
  Heart,
  Car,
  Building2,
  FileText,
  Download,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  Calculator,
  Calendar,
  Phone,
  Mail,
  User,
  Search,
  Filter
} from 'lucide-react';

const InsuranceManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [isProcessClaimOpen, setIsProcessClaimOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  // بيانات التأمينات
  const insuranceData = {
    totalPremiums: 890000,
    insuredEmployees: 145,
    totalClaimsThisYear: 89,
    pendingClaims: 12,
    activePackages: 8,
    claimsApprovalRate: 87.5
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
      type: 'medical',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تغطية طبية أساسية تشمل العيادات الخارجية والطوارئ'
    },
    {
      id: 2,
      name: 'التأمين الطبي الشامل',
      provider: 'شركة الأهلي للتكافل',
      coverage: 300000,
      premium: 4800,
      employees: 45,
      status: 'active',
      type: 'medical',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تغطية طبية شاملة تشمل العمليات الجراحية والتنويم'
    },
    {
      id: 3,
      name: 'تأمين السيارات',
      provider: 'شركة الراجحي للتأمين',
      coverage: 200000,
      premium: 3600,
      employees: 35,
      status: 'active',
      type: 'auto',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تأمين شامل على المركبات للموظفين المؤهلين'
    },
    {
      id: 4,
      name: 'تأمين الحياة',
      provider: 'شركة وقاية للتأمين',
      coverage: 500000,
      premium: 1200,
      employees: 89,
      status: 'pending',
      type: 'life',
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      description: 'تأمين على الحياة لحماية عائلات الموظفين'
    },
    {
      id: 5,
      name: 'التأمين ضد الحوادث الشخصية',
      provider: 'شركة سلامة للتأمين',
      coverage: 100000,
      premium: 800,
      employees: 67,
      status: 'active',
      type: 'accident',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تأمين ضد الحوادث الشخصية والعجز المؤقت'
    },
    {
      id: 6,
      name: 'تأمين الممتلكات الشخصية',
      provider: 'شركة الخليج للتأمين',
      coverage: 80000,
      premium: 600,
      employees: 23,
      status: 'inactive',
      type: 'property',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      description: 'تأمين على الممتلكات الشخصية للموظفين'
    }
  ];

  // مطالبات التأمين
  const insuranceClaims = [
    {
      id: 1,
      employeeName: 'أحمد محمد العلي',
      employeeId: '001',
      claimType: 'طبي',
      insuranceType: 'التأمين الطبي الأساسي',
      amount: 15000,
      status: 'approved',
      dateSubmitted: '2024-03-10',
      dateProcessed: '2024-03-15',
      description: 'فحوصات طبية شاملة وتحاليل مخبرية',
      attachments: 3,
      approvedBy: 'إدارة الموارد البشرية'
    },
    {
      id: 2,
      employeeName: 'فاطمة سعد الأحمد',
      employeeId: '002',
      claimType: 'طبي',
      insuranceType: 'التأمين الطبي الشامل',
      amount: 8500,
      status: 'pending',
      dateSubmitted: '2024-03-15',
      dateProcessed: null,
      description: 'علاج أسنان وتركيب طقم جزئي',
      attachments: 2,
      approvedBy: null
    },
    {
      id: 3,
      employeeName: 'خالد يوسف النمر',
      employeeId: '003',
      claimType: 'سيارة',
      insuranceType: 'تأمين السيارات',
      amount: 12000,
      status: 'processing',
      dateSubmitted: '2024-03-12',
      dateProcessed: null,
      description: 'إصلاح أضرار حادث مروري',
      attachments: 5,
      approvedBy: null
    },
    {
      id: 4,
      employeeName: 'نورا محمد السعد',
      employeeId: '004',
      claimType: 'حوادث شخصية',
      insuranceType: 'التأمين ضد الحوادث الشخصية',
      amount: 25000,
      status: 'rejected',
      dateSubmitted: '2024-03-08',
      dateProcessed: '2024-03-14',
      description: 'إصابة في العمل - طلب تعويض',
      attachments: 4,
      approvedBy: 'لجنة التأمين',
      rejectionReason: 'عدم توافق مع شروط البوليصة'
    },
    {
      id: 5,
      employeeName: 'سامي علي الزهراني',
      employeeId: '005',
      claimType: 'طبي',
      insuranceType: 'التأمين الطبي الأساسي',
      amount: 6200,
      status: 'approved',
      dateSubmitted: '2024-03-05',
      dateProcessed: '2024-03-11',
      description: 'علاج طبيعي وجلسات تأهيل',
      attachments: 2,
      approvedBy: 'إدارة الموارد البشرية'
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

  const getInsuranceIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <Heart className="h-6 w-6 text-red-500" />;
      case 'auto':
        return <Car className="h-6 w-6 text-blue-500" />;
      case 'life':
        return <Shield className="h-6 w-6 text-green-500" />;
      case 'accident':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'property':
        return <Building2 className="h-6 w-6 text-purple-500" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  const handleExport = () => {
    toast.success('تم تصدير بيانات التأمينات');
  };

  const handleAddPackage = () => {
    setIsAddPackageOpen(true);
    toast.info('فتح نموذج إضافة باقة تأمين جديدة');
  };

  const handleProcessClaim = (claim: any) => {
    setSelectedClaim(claim);
    setIsProcessClaimOpen(true);
  };

  const handleApproveClaim = () => {
    if (selectedClaim) {
      toast.success(`تم الموافقة على مطالبة ${selectedClaim.employeeName}`);
      setIsProcessClaimOpen(false);
      setSelectedClaim(null);
    }
  };

  const handleRejectClaim = () => {
    if (selectedClaim) {
      toast.error(`تم رفض مطالبة ${selectedClaim.employeeName}`);
      setIsProcessClaimOpen(false);
      setSelectedClaim(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">التأمينات والتأمين</h2>
          <p className="text-muted-foreground">إدارة باقات التأمين ومعالجة المطالبات</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            تصدير البيانات
          </Button>
          <Button onClick={handleAddPackage}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة باقة تأمين
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="packages">باقات التأمين</TabsTrigger>
          <TabsTrigger value="claims">المطالبات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">إجمالي الأقساط</p>
                    <p className="text-2xl font-bold">{insuranceData.totalPremiums.toLocaleString()} ريال</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">موظف مؤمن</p>
                    <p className="text-2xl font-bold">{insuranceData.insuredEmployees}</p>
                  </div>
                  <Shield className="h-10 w-10 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">مطالبات السنة</p>
                    <p className="text-2xl font-bold">{insuranceData.totalClaimsThisYear}</p>
                  </div>
                  <FileText className="h-10 w-10 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">مطالبات معلقة</p>
                    <p className="text-2xl font-bold">{insuranceData.pendingClaims}</p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100">باقات نشطة</p>
                    <p className="text-2xl font-bold">{insuranceData.activePackages}</p>
                  </div>
                  <Shield className="h-10 w-10 text-indigo-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-teal-100">معدل الموافقة</p>
                    <p className="text-2xl font-bold">{insuranceData.claimsApprovalRate}%</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-teal-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-primary/10"
              onClick={() => setActiveTab('packages')}
            >
              <Shield className="h-6 w-6" />
              إدارة الباقات
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-secondary/10"
              onClick={() => setActiveTab('claims')}
            >
              <FileText className="h-6 w-6" />
              معالجة المطالبات
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-destructive/10"
              onClick={handleAddPackage}
            >
              <Plus className="h-6 w-6" />
              باقة جديدة
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-green-50"
              onClick={handleExport}
            >
              <Download className="h-6 w-6" />
              تقارير التأمين
            </Button>
          </div>

          {/* Insurance Package Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص باقات التأمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insurancePackages.filter(pkg => pkg.status === 'active').slice(0, 3).map((package_) => (
                  <Card key={package_.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {getInsuranceIcon(package_.type)}
                        <div>
                          <h4 className="font-medium">{package_.name}</h4>
                          <p className="text-sm text-muted-foreground">{package_.employees} موظف</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Packages Tab */}
        <TabsContent value="packages" className="space-y-6">
          <div className="grid gap-4">
            {insurancePackages.map((package_) => (
              <Card key={package_.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {getInsuranceIcon(package_.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{package_.name}</h3>
                        <p className="text-sm text-muted-foreground">{package_.provider}</p>
                        <p className="text-sm text-muted-foreground">{package_.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>من {package_.startDate}</span>
                          <span>إلى {package_.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">التغطية</div>
                        <div className="text-lg font-bold text-primary">{package_.coverage.toLocaleString()} ريال</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">القسط السنوي</div>
                        <div className="text-lg font-bold text-green-600">{package_.premium.toLocaleString()} ريال</div>
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
                        <p className="text-sm text-muted-foreground">رقم الموظف: {claim.employeeId}</p>
                        <p className="text-sm text-muted-foreground">{claim.description}</p>
                        <p className="text-sm text-muted-foreground">نوع التأمين: {claim.insuranceType}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>تاريخ التقديم: {claim.dateSubmitted}</span>
                          <span>المرفقات: {claim.attachments}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">المبلغ</div>
                        <div className="text-lg font-bold text-primary">{claim.amount.toLocaleString()} ريال</div>
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
                        {(claim.status === 'pending' || claim.status === 'processing') && (
                          <Button 
                            size="sm" 
                            onClick={() => handleProcessClaim(claim)}
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

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  تقارير التأمينات
                </CardTitle>
                <CardDescription>تقارير شاملة عن باقات التأمين والمطالبات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير باقات التأمين');
                    handleExport();
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  تقرير باقات التأمين
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير المطالبات');
                    handleExport();
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  تقرير المطالبات الشهري
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
                  تقرير تكاليف التأمين
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  تقارير إدارية
                </CardTitle>
                <CardDescription>تقارير للجهات الحكومية والمراجعة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير التأمينات الاجتماعية');
                    handleExport();
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  تقرير التأمينات الاجتماعية
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء تقرير هيئة التأمين');
                    handleExport();
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  تقرير هيئة التأمين
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast.success('تم إنشاء التقرير السنوي');
                    handleExport();
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  التقرير السنوي للتأمينات
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Package Dialog */}
      <Dialog open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة باقة تأمين جديدة</DialogTitle>
            <DialogDescription>
              إضافة باقة تأمين جديدة للموظفين
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="packageName">اسم الباقة</Label>
                <Input id="packageName" placeholder="اسم باقة التأمين" />
              </div>
              <div>
                <Label htmlFor="provider">شركة التأمين</Label>
                <Input id="provider" placeholder="اسم شركة التأمين" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coverage">مبلغ التغطية</Label>
                <Input id="coverage" type="number" placeholder="مبلغ التغطية بالريال" />
              </div>
              <div>
                <Label htmlFor="premium">القسط السنوي</Label>
                <Input id="premium" type="number" placeholder="القسط السنوي بالريال" />
              </div>
            </div>
            <div>
              <Label htmlFor="packageType">نوع التأمين</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التأمين" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">طبي</SelectItem>
                  <SelectItem value="auto">سيارات</SelectItem>
                  <SelectItem value="life">حياة</SelectItem>
                  <SelectItem value="accident">حوادث شخصية</SelectItem>
                  <SelectItem value="property">ممتلكات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">وصف الباقة</Label>
              <Textarea id="description" placeholder="وصف تفصيلي للباقة..." />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                toast.success('تم إضافة باقة التأمين بنجاح');
                setIsAddPackageOpen(false);
              }}>
                إضافة الباقة
              </Button>
              <Button variant="outline" onClick={() => setIsAddPackageOpen(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Claim Dialog */}
      <Dialog open={isProcessClaimOpen} onOpenChange={setIsProcessClaimOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>معالجة المطالبة</DialogTitle>
            <DialogDescription>
              مراجعة وموافقة أو رفض مطالبة التأمين
            </DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>اسم الموظف</Label>
                  <Input value={selectedClaim.employeeName} readOnly />
                </div>
                <div>
                  <Label>رقم الموظف</Label>
                  <Input value={selectedClaim.employeeId} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>نوع المطالبة</Label>
                  <Input value={selectedClaim.claimType} readOnly />
                </div>
                <div>
                  <Label>المبلغ</Label>
                  <Input value={`${selectedClaim.amount.toLocaleString()} ريال`} readOnly />
                </div>
              </div>
              <div>
                <Label>وصف المطالبة</Label>
                <Textarea value={selectedClaim.description} readOnly />
              </div>
              <div>
                <Label>ملاحظات المعالجة</Label>
                <Textarea placeholder="أضف ملاحظاتك حول المطالبة..." />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleApproveClaim} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  الموافقة على المطالبة
                </Button>
                <Button variant="destructive" onClick={handleRejectClaim}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  رفض المطالبة
                </Button>
                <Button variant="outline" onClick={() => setIsProcessClaimOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsuranceManagement;