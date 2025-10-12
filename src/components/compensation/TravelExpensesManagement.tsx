import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plane, 
  Hotel,
  Car,
  Receipt,
  DollarSign,
  Calendar,
  MapPin,
  Upload,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  FileText,
  AlertCircle,
  BarChart3,
  CreditCard,
  Briefcase,
  Globe
} from 'lucide-react';

export const TravelExpensesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);

  // Mock data
  const stats = {
    totalTrips: 45,
    pendingRequests: 12,
    approvedAmount: 285000,
    avgTripCost: 6333,
    monthlyBudget: 350000,
    usedBudget: 285000,
    utilizationRate: 81
  };

  const travelRequests = [
    {
      id: 1,
      requestNumber: 'TR-2024-001',
      employee: 'أحمد محمد علي',
      department: 'المبيعات',
      destination: 'دبي، الإمارات',
      purpose: 'اجتماع عملاء',
      startDate: '2024-02-15',
      endDate: '2024-02-18',
      duration: 3,
      estimatedCost: 8500,
      actualCost: 8200,
      status: 'approved',
      expenses: {
        flights: 3500,
        hotel: 3200,
        transportation: 800,
        meals: 700
      }
    },
    {
      id: 2,
      requestNumber: 'TR-2024-002',
      employee: 'فاطمة سالم',
      department: 'التسويق',
      destination: 'القاهرة، مصر',
      purpose: 'معرض تجاري',
      startDate: '2024-02-20',
      endDate: '2024-02-23',
      duration: 3,
      estimatedCost: 7200,
      actualCost: null,
      status: 'pending',
      expenses: {
        flights: 2800,
        hotel: 2900,
        transportation: 800,
        meals: 700
      }
    },
    {
      id: 3,
      requestNumber: 'TR-2024-003',
      employee: 'خالد أحمد',
      department: 'التكنولوجيا',
      destination: 'الرياض',
      purpose: 'دورة تدريبية',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      duration: 2,
      estimatedCost: 5500,
      actualCost: 5300,
      status: 'completed',
      expenses: {
        flights: 2200,
        hotel: 2000,
        transportation: 600,
        meals: 500
      }
    },
    {
      id: 4,
      requestNumber: 'TR-2024-004',
      employee: 'سارة عبدالله',
      department: 'الموارد البشرية',
      destination: 'جدة',
      purpose: 'مؤتمر HR',
      startDate: '2024-02-25',
      endDate: '2024-02-26',
      duration: 1,
      estimatedCost: 4200,
      actualCost: null,
      status: 'rejected',
      expenses: {
        flights: 1800,
        hotel: 1500,
        transportation: 500,
        meals: 400
      }
    }
  ];

  const expenseCategories = [
    { name: 'تذاكر الطيران', amount: 125000, percentage: 44, icon: Plane, color: 'blue' },
    { name: 'الإقامة', amount: 98000, percentage: 34, icon: Hotel, color: 'green' },
    { name: 'المواصلات', amount: 38000, percentage: 13, icon: Car, color: 'purple' },
    { name: 'الوجبات', amount: 24000, percentage: 9, icon: Receipt, color: 'orange' }
  ];

  const travelPolicies = [
    {
      category: 'الطيران',
      rule: 'درجة الاقتصاد للرحلات أقل من 6 ساعات',
      limit: 'حد أقصى 4000 ريال للتذكرة'
    },
    {
      category: 'الإقامة',
      rule: 'فنادق 4 نجوم كحد أقصى',
      limit: 'حد أقصى 800 ريال لليلة'
    },
    {
      category: 'المواصلات',
      rule: 'سيارة اقتصادية أو تطبيقات النقل',
      limit: 'حد أقصى 300 ريال يومياً'
    },
    {
      category: 'الوجبات',
      rule: 'بدل يومي ثابت',
      limit: '200 ريال يومياً'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 ml-1" />قيد المراجعة</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 ml-1" />موافق عليه</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 ml-1" />مكتمل</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 ml-1" />مرفوض</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getIconColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة السفر والمصروفات</h1>
          <p className="text-muted-foreground">إدارة شاملة لطلبات السفر والمصروفات المتعلقة بها</p>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-center">
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              طلب سفر جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>طلب سفر جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الموظف</Label>
                  <Input placeholder="اختر الموظف" />
                </div>
                <div className="space-y-2">
                  <Label>القسم</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">المبيعات</SelectItem>
                      <SelectItem value="marketing">التسويق</SelectItem>
                      <SelectItem value="it">التكنولوجيا</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>الوجهة</Label>
                <Input placeholder="المدينة، الدولة" />
              </div>

              <div className="space-y-2">
                <Label>الغرض من السفر</Label>
                <Textarea placeholder="اذكر الغرض من الرحلة..." rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ المغادرة</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>تاريخ العودة</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium">التكاليف المتوقعة</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm">تذاكر الطيران</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">الإقامة</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">المواصلات</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">الوجبات</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>المرفقات (اختياري)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    اسحب وأفلت الملفات هنا أو انقر للتحميل
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">إرسال الطلب</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowNewRequestDialog(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الرحلات</p>
                <p className="text-2xl font-bold">{stats.totalTrips}</p>
                <p className="text-xs text-muted-foreground mt-1">هذا الشهر</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                <p className="text-xs text-yellow-600 mt-1">تحتاج مراجعة</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المبالغ المعتمدة</p>
                <p className="text-2xl font-bold">{(stats.approvedAmount / 1000).toFixed(0)}ك</p>
                <p className="text-xs text-muted-foreground mt-1">ريال سعودي</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط تكلفة الرحلة</p>
                <p className="text-2xl font-bold">{stats.avgTripCost.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">ريال</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            نظرة على ميزانية السفر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">الميزانية الشهرية</span>
              <span className="font-medium">{stats.monthlyBudget.toLocaleString()} ريال</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">المستخدم</span>
              <span className="font-medium text-purple-600">{stats.usedBudget.toLocaleString()} ريال</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">المتبقي</span>
              <span className="font-medium text-green-600">{(stats.monthlyBudget - stats.usedBudget).toLocaleString()} ريال</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">نسبة الاستخدام</span>
                <span className={`font-medium ${stats.utilizationRate > 90 ? 'text-red-600' : stats.utilizationRate > 75 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {stats.utilizationRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${stats.utilizationRate > 90 ? 'bg-red-600' : stats.utilizationRate > 75 ? 'bg-yellow-600' : 'bg-green-600'}`}
                  style={{ width: `${stats.utilizationRate}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">طلبات السفر</TabsTrigger>
          <TabsTrigger value="expenses">فئات المصروفات</TabsTrigger>
          <TabsTrigger value="policies">سياسات السفر</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Travel Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>طلبات السفر</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في الطلبات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الطلبات</SelectItem>
                      <SelectItem value="pending">قيد المراجعة</SelectItem>
                      <SelectItem value="approved">موافق عليه</SelectItem>
                      <SelectItem value="completed">مكتمل</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {travelRequests.map((request) => (
                  <Card key={request.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{request.employee}</h4>
                            <Badge variant="outline" className="text-xs">{request.requestNumber}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.department}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">الوجهة</p>
                            <p className="text-sm font-medium">{request.destination}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">المدة</p>
                            <p className="text-sm font-medium">{request.duration} أيام</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">التكلفة المقدرة</p>
                            <p className="text-sm font-medium">{request.estimatedCost.toLocaleString()} ريال</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">الغرض</p>
                            <p className="text-sm font-medium">{request.purpose}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض التفاصيل
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="w-4 h-4 ml-1" />
                              موافقة
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <XCircle className="w-4 h-4 ml-1" />
                              رفض
                            </Button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <Button size="sm" variant="outline">
                            <Upload className="w-4 h-4 ml-1" />
                            رفع المصروفات
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Categories Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                توزيع المصروفات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getIconColor(category.color)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.percentage}% من الإجمالي</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-bold">{category.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">ريال</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color === 'blue' ? 'bg-blue-600' : category.color === 'green' ? 'bg-green-600' : category.color === 'purple' ? 'bg-purple-600' : 'bg-orange-600'}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {expenseCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">إجمالي المصروفات (ريال)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Travel Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                سياسات وضوابط السفر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {travelPolicies.map((policy, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2">{policy.category}</h4>
                          <div className="space-y-1">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                              <p className="text-sm text-muted-foreground">{policy.rule}</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
                              <p className="text-sm font-medium">{policy.limit}</p>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">ملاحظة مهمة</p>
                    <p className="text-sm text-blue-700 mt-1">
                      جميع المصروفات التي تتجاوز الحدود المسموح بها تحتاج إلى موافقة خاصة من المدير المباشر
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  الإحصائيات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">إجمالي الرحلات</span>
                    <span className="text-lg font-bold text-blue-600">{stats.totalTrips}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">الرحلات المكتملة</span>
                    <span className="text-lg font-bold text-green-600">
                      {travelRequests.filter(r => r.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">قيد الانتظار</span>
                    <span className="text-lg font-bold text-yellow-600">{stats.pendingRequests}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">متوسط التكلفة</span>
                    <span className="text-lg font-bold text-purple-600">{stats.avgTripCost.toLocaleString()} ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  أفضل الوجهات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { city: 'دبي، الإمارات', trips: 12, cost: 102000 },
                    { city: 'الرياض، السعودية', trips: 10, cost: 55000 },
                    { city: 'القاهرة، مصر', trips: 8, cost: 57600 },
                    { city: 'البحرين', trips: 6, cost: 42000 }
                  ].map((dest, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{dest.city}</p>
                          <p className="text-xs text-muted-foreground">{dest.trips} رحلة</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{(dest.cost / 1000).toFixed(0)}ك ريال</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تقارير مفصلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">تقرير شهري</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm">تحليل الأقسام</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Users className="w-6 h-6" />
                  <span className="text-sm">تقرير الموظفين</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm">تحليل التكاليف</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Globe className="w-6 h-6" />
                  <span className="text-sm">تقرير الوجهات</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Download className="w-6 h-6" />
                  <span className="text-sm">تصدير البيانات</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};