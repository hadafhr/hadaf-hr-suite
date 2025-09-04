import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Users, 
  Calendar, 
  Filter,
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  UserPlus,
  UserMinus,
  RefreshCw
} from 'lucide-react';

interface EmployeeMovementsSystemProps {
  onBack: () => void;
}

export const EmployeeMovementsSystem: React.FC<EmployeeMovementsSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewMovementOpen, setIsNewMovementOpen] = useState(false);

  // Mock data for movements
  const movementStats = {
    totalMovements: 156,
    pendingRequests: 23,
    approvedThisMonth: 45,
    promotions: 28,
    transfers: 34,
    demotions: 3
  };

  const recentMovements = [
    {
      id: 1,
      employeeName: 'أحمد محمد العلي',
      employeeId: 'EMP001',
      movementType: 'ترقية',
      fromPosition: 'مطور برمجيات',
      toPosition: 'مطور برمجيات أول',
      fromDepartment: 'تقنية المعلومات',
      toDepartment: 'تقنية المعلومات',
      requestDate: '2024-01-15',
      effectiveDate: '2024-02-01',
      status: 'معتمد',
      reason: 'تقييم أداء ممتاز',
      approvedBy: 'مدير الموارد البشرية'
    },
    {
      id: 2,
      employeeName: 'فاطمة أحمد السالم',
      employeeId: 'EMP002',
      movementType: 'نقل',
      fromPosition: 'محاسب',
      toPosition: 'محاسب',
      fromDepartment: 'المحاسبة والمالية',
      toDepartment: 'المراجعة الداخلية',
      requestDate: '2024-01-20',
      effectiveDate: '2024-02-15',
      status: 'قيد المراجعة',
      reason: 'طلب الموظف للتطوير المهني',
      approvedBy: '-'
    },
    {
      id: 3,
      employeeName: 'محمد سعد الغامدي',
      employeeId: 'EMP003',
      movementType: 'ترقية',
      fromPosition: 'موظف خدمة عملاء',
      toPosition: 'مشرف خدمة عملاء',
      fromDepartment: 'خدمة العملاء',
      toDepartment: 'خدمة العملاء',
      requestDate: '2024-01-18',
      effectiveDate: '2024-03-01',
      status: 'مرفوض',
      reason: 'تحتاج لاستكمال متطلبات الخبرة',
      approvedBy: 'مدير العمليات'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'معتمد': 'bg-green-100 text-green-800 border-green-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200'
    };
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getMovementTypeIcon = (type: string) => {
    switch (type) {
      case 'ترقية':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'نقل':
        return <ArrowRight className="h-4 w-4 text-blue-600" />;
      case 'تنزيل':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90" dir="rtl">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/8 to-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-primary/3 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="border-muted-foreground/20 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">قسم الحركة والتنقلات</h1>
                <p className="text-muted-foreground text-lg">إدارة تنقلات وترقيات الموظفين</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isNewMovementOpen} onOpenChange={setIsNewMovementOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-glow">
                  <Plus className="h-4 w-4 ml-2" />
                  حركة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إنشاء حركة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employee">الموظف</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                          <SelectItem value="emp2">فاطمة أحمد السالم</SelectItem>
                          <SelectItem value="emp3">محمد سعد الغامدي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="movementType">نوع الحركة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الحركة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotion">ترقية</SelectItem>
                          <SelectItem value="transfer">نقل</SelectItem>
                          <SelectItem value="demotion">تنزيل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromDepartment">من قسم</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="القسم الحالي" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">تقنية المعلومات</SelectItem>
                          <SelectItem value="hr">الموارد البشرية</SelectItem>
                          <SelectItem value="finance">المالية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="toDepartment">إلى قسم</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="القسم الجديد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">تقنية المعلومات</SelectItem>
                          <SelectItem value="hr">الموارد البشرية</SelectItem>
                          <SelectItem value="finance">المالية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromPosition">من مسمى</Label>
                      <Input placeholder="المسمى الحالي" />
                    </div>
                    <div>
                      <Label htmlFor="toPosition">إلى مسمى</Label>
                      <Input placeholder="المسمى الجديد" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="effectiveDate">تاريخ السريان</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label htmlFor="reason">سبب الحركة</Label>
                    <Textarea placeholder="اذكر سبب الحركة..." />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsNewMovementOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={() => setIsNewMovementOpen(false)}>
                      إنشاء الحركة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border/20">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="movements" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              الحركات
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.totalMovements}</div>
                  <p className="text-sm text-muted-foreground">إجمالي الحركات</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.pendingRequests}</div>
                  <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.approvedThisMonth}</div>
                  <p className="text-sm text-muted-foreground">معتمد هذا الشهر</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.promotions}</div>
                  <p className="text-sm text-muted-foreground">ترقيات</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.transfers}</div>
                  <p className="text-sm text-muted-foreground">نقل</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-border/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{movementStats.demotions}</div>
                  <p className="text-sm text-muted-foreground">تنزيل</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Movements */}
            <Card className="bg-white/80 backdrop-blur border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  آخر الحركات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMovements.slice(0, 5).map((movement) => (
                    <div key={movement.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/10">
                      <div className="flex items-center gap-4">
                        {getMovementTypeIcon(movement.movementType)}
                        <div>
                          <h4 className="font-medium text-foreground">{movement.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {movement.movementType}: {movement.fromPosition} → {movement.toPosition}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusBadge(movement.status)}>
                          {movement.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{movement.requestDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements">
            <Card className="bg-white/80 backdrop-blur border-border/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>جميع الحركات</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="البحث في الحركات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 ml-2" />
                      فلترة
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">الموظف</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">نوع الحركة</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">من</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">إلى</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">تاريخ الطلب</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMovements.map((movement) => (
                        <tr key={movement.id} className="border-b border-border/10 hover:bg-muted/20">
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-foreground">{movement.employeeName}</div>
                              <div className="text-sm text-muted-foreground">{movement.employeeId}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getMovementTypeIcon(movement.movementType)}
                              <span>{movement.movementType}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="text-sm font-medium">{movement.fromPosition}</div>
                              <div className="text-xs text-muted-foreground">{movement.fromDepartment}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="text-sm font-medium">{movement.toPosition}</div>
                              <div className="text-xs text-muted-foreground">{movement.toDepartment}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {movement.requestDate}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadge(movement.status)}>
                              {movement.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">
                              عرض التفاصيل
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="bg-white/80 backdrop-blur border-border/20">
              <CardHeader>
                <CardTitle>طلبات الحركة المعلقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMovements.filter(m => m.status === 'قيد المراجعة').map((movement) => (
                    <div key={movement.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-medium text-foreground">{movement.employeeName}</h4>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {movement.movementType}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{movement.requestDate}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">من: </span>
                          <span className="font-medium">{movement.fromPosition} - {movement.fromDepartment}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">إلى: </span>
                          <span className="font-medium">{movement.toPosition} - {movement.toDepartment}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{movement.reason}</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <XCircle className="h-4 w-4 ml-2" />
                          رفض
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="h-4 w-4 ml-2" />
                          موافقة
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-white/80 backdrop-blur border-border/20">
              <CardHeader>
                <CardTitle>تقارير الحركة والتنقلات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">تقارير تفصيلية</h3>
                  <p className="text-muted-foreground mb-4">
                    ستتوفر التقارير التفصيلية للحركة والتنقلات قريباً
                  </p>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 ml-2" />
                    تصدير التقرير
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeMovementsSystem;