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
  Award,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  BookOpen,
  Gavel
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const EmployeeManagementSystem = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');

  // بيانات وهمية للموظفين
  const employees = [
    {
      id: '001',
      name: 'أحمد محمد العلي',
      position: 'مطور برمجيات',
      department: 'تقنية المعلومات',
      status: 'نشط',
      joinDate: '2023-01-15',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg'
    },
    {
      id: '002',
      name: 'فاطمة سعد الأحمد',
      position: 'محاسبة',
      department: 'المالية',
      status: 'نشط',
      joinDate: '2022-08-10',
      disciplinaryRecord: 1,
      avatar: '/placeholder.svg'
    },
    {
      id: '003',
      name: 'خالد يوسف النمر',
      position: 'مدير مبيعات',
      department: 'المبيعات',
      status: 'في إجازة',
      joinDate: '2021-03-20',
      disciplinaryRecord: 0,
      avatar: '/placeholder.svg'
    }
  ];

  // إحصائيات النظام
  const stats = {
    totalEmployees: 152,
    activeEmployees: 145,
    onLeave: 7,
    pendingDisciplinary: 3,
    newRequests: 12
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

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">نظام إدارة الموظفين</h1>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير البيانات
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 ml-2" />
              استيراد البيانات
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="employees">الموظفين</TabsTrigger>
            <TabsTrigger value="disciplinary">الإجراءات التأديبية</TabsTrigger>
            <TabsTrigger value="requests">طلبات الموظفين</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                      <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                    </div>
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.activeEmployees}</div>
                      <div className="text-sm text-muted-foreground">موظف نشط</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-yellow-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.onLeave}</div>
                      <div className="text-sm text-muted-foreground">في إجازة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.pendingDisciplinary}</div>
                      <div className="text-sm text-muted-foreground">إجراءات تأديبية معلقة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Bell className="h-8 w-8 text-blue-600" />
                    <div className="mr-4">
                      <div className="text-2xl font-bold">{stats.newRequests}</div>
                      <div className="text-sm text-muted-foreground">طلبات جديدة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
                <CardDescription>الوصول السريع للمهام الأساسية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <UserPlus className="h-6 w-6" />
                    إضافة موظف
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Gavel className="h-6 w-6" />
                    إجراء تأديبي
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    طلب موظف
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Award className="h-6 w-6" />
                    تقييم أداء
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
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="فلترة حسب القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                      <SelectItem value="المالية">المالية</SelectItem>
                      <SelectItem value="المبيعات">المبيعات</SelectItem>
                      <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
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
              {filteredEmployees.map((employee) => (
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
                          <div className="text-sm font-medium">تاريخ التوظيف</div>
                          <div className="text-sm text-muted-foreground">{employee.joinDate}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">الحالة</div>
                          {getStatusBadge(employee.status)}
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">الإجراءات التأديبية</div>
                          <Badge variant={employee.disciplinaryRecord > 0 ? "destructive" : "secondary"}>
                            {employee.disciplinaryRecord}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Disciplinary Tab */}
          <TabsContent value="disciplinary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-6 w-6" />
                  نظام الإجراءات التأديبية - نظام العمل السعودي
                </CardTitle>
                <CardDescription>
                  إدارة الإجراءات التأديبية وفقاً لنظام العمل السعودي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    إنذار أول
                  </Button>
                  <Button variant="destructive" className="h-20 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    إنذار نهائي
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <BookOpen className="h-6 w-6" />
                    قاعدة البيانات القانونية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طلبات الموظفين</CardTitle>
                <CardDescription>إدارة جميع طلبات الموظفين والموافقات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  سيتم تطوير نظام طلبات الموظفين قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والتحليلات</CardTitle>
                <CardDescription>تقارير شاملة عن الموظفين والأداء</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  سيتم تطوير نظام التقارير قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  إعدادات النظام
                </CardTitle>
                <CardDescription>تخصيص إعدادات نظام إدارة الموظفين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  سيتم تطوير إعدادات النظام قريباً
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeManagementSystem;