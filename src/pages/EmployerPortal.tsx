import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users,
  UserPlus,
  AlertTriangle,
  FileText,
  Calendar,
  ArrowLeft,
  Download,
  Upload,
  Search,
  Filter,
  Bell,
  Settings,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const EmployerPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات وهمية للموظفين والطلبات
  const employees = [
    {
      id: 'EMP001',
      name: 'أحمد محمد العلي',
      position: 'مطور برمجيات',
      department: 'تقنية المعلومات',
      status: 'نشط',
      performanceScore: 85,
      avatar: '/placeholder.svg'
    },
    {
      id: 'EMP002',
      name: 'فاطمة سعد الأحمد',
      position: 'محاسبة',
      department: 'المالية',
      status: 'نشط',
      performanceScore: 92,
      avatar: '/placeholder.svg'
    },
    {
      id: 'EMP003',
      name: 'خالد يوسف النمر',
      position: 'مدير مبيعات',
      department: 'المبيعات',
      status: 'في إجازة',
      performanceScore: 78,
      avatar: '/placeholder.svg'
    }
  ];

  const pendingRequests = [
    {
      id: 'REQ001',
      employeeName: 'أحمد محمد العلي',
      type: 'إجازة سنوية',
      details: 'إجازة سنوية لمدة 5 أيام',
      date: '2024-01-15',
      status: 'قيد المراجعة',
      priority: 'متوسط'
    },
    {
      id: 'REQ002',
      employeeName: 'فاطمة سعد الأحمد',
      type: 'شهادة راتب',
      details: 'شهادة راتب للبنك',
      date: '2024-01-14',
      status: 'قيد المراجعة',
      priority: 'عاجل'
    },
    {
      id: 'REQ003',
      employeeName: 'خالد يوسف النمر',
      type: 'إجازة مرضية',
      details: 'إجازة مرضية لمدة 3 أيام',
      date: '2024-01-13',
      status: 'قيد المراجعة',
      priority: 'عاجل'
    }
  ];

  const companyStats = {
    totalEmployees: 152,
    activeEmployees: 145,
    onLeave: 7,
    pendingRequests: pendingRequests.length,
    newHires: 3,
    departmentCount: 8,
    averagePerformance: 85,
    attendanceRate: 94
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'نشط':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'في إجازة':
        return <Badge className="bg-yellow-100 text-yellow-800">في إجازة</Badge>;
      case 'متوقف':
        return <Badge className="bg-red-100 text-red-800">متوقف</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'عاجل':
        return <Badge className="bg-red-100 text-red-800">عاجل</Badge>;
      case 'متوسط':
        return <Badge className="bg-yellow-100 text-yellow-800">متوسط</Badge>;
      case 'منخفض':
        return <Badge className="bg-green-100 text-green-800">منخفض</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleApproveRequest = (requestId: string) => {
    console.log('Approved request:', requestId);
    // سيتم تطوير هذا لاحقاً مع قاعدة البيانات
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejected request:', requestId);
    // سيتم تطوير هذا لاحقاً مع قاعدة البيانات
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">بوابة أصحاب العمل</h1>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge className="mr-2 bg-red-500 text-white text-xs">
                {pendingRequests.length}
              </Badge>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
            <TabsTrigger value="requests">الطلبات</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{companyStats.totalEmployees}</div>
                      <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{companyStats.activeEmployees}</div>
                      <div className="text-sm text-muted-foreground">موظف نشط</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{companyStats.pendingRequests}</div>
                      <div className="text-sm text-muted-foreground">طلبات معلقة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{companyStats.averagePerformance}%</div>
                      <div className="text-sm text-muted-foreground">متوسط الأداء</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Pending Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    الطلبات المعلقة
                    <Badge className="bg-red-100 text-red-800">
                      {pendingRequests.length} طلب
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex-1">
                          <p className="font-medium">{request.employeeName}</p>
                          <p className="text-sm text-muted-foreground">{request.type}</p>
                          <p className="text-xs text-muted-foreground">{request.details}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(request.priority)}
                          <Button size="sm" variant="outline" onClick={() => setActiveTab('requests')}>
                            مراجعة
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingRequests.length > 3 && (
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab('requests')}>
                        عرض جميع الطلبات ({pendingRequests.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>نظرة عامة على الأداء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">متوسط الأداء العام</span>
                        <span className="font-bold">{companyStats.averagePerformance}%</span>
                      </div>
                      <Progress value={companyStats.averagePerformance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">معدل الحضور</span>
                        <span className="font-bold">{companyStats.attendanceRate}%</span>
                      </div>
                      <Progress value={companyStats.attendanceRate} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{companyStats.newHires}</div>
                        <div className="text-xs text-muted-foreground">موظفون جدد</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{companyStats.departmentCount}</div>
                        <div className="text-xs text-muted-foreground">أقسام</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <UserPlus className="h-6 w-6" />
                    إضافة موظف
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    مراجعة الطلبات
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    تقارير الأداء
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    إعدادات الشركة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث عن موظف..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                      />
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="فلترة حسب القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Employees List */}
            <div className="grid gap-4">
              {employees.map((employee) => (
                <Card key={employee.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">الحالة</div>
                          {getStatusBadge(employee.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">الأداء</div>
                          <Badge variant={employee.performanceScore >= 80 ? "default" : "secondary"}>
                            {employee.performanceScore}%
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طلبات الموظفين المعلقة</CardTitle>
                <CardDescription>
                  مراجعة والموافقة على طلبات الموظفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-yellow-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{request.employeeName}</h3>
                              {getPriorityBadge(request.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              <strong>{request.type}</strong> - {request.details}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              تاريخ الطلب: {request.date} | رقم الطلب: {request.id}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectRequest(request.id)}
                            >
                              <XCircle className="h-4 w-4 ml-2" />
                              رفض
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApproveRequest(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 ml-2" />
                              موافقة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقييم أداء الموظفين</CardTitle>
                <CardDescription>
                  مراقبة وتقييم أداء الموظفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير نظام تقييم الأداء قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير الإدارية</CardTitle>
                <CardDescription>
                  تقارير شاملة عن الموظفين والعمليات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير الحضور
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير الرواتب
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير الأداء
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير الإجازات
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير التوظيف
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير مخصص
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التحليلات والإحصائيات</CardTitle>
                <CardDescription>
                  تحليلات متقدمة لبيانات الشركة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>سيتم تطوير نظام التحليلات قريباً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerPortal;