import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Building2, 
  Target, 
  UserPlus,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Award,
  BookOpen,
  Shield,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const employees = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    email: "ahmed.saad@company.com",
    phone: "+966501234567",
    salary: "12000",
    joinDate: "2022-03-15",
    status: "نشط",
    performance: 85
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "المالية",
    email: "fatma.noor@company.com", 
    phone: "+966507654321",
    salary: "9500",
    joinDate: "2021-07-20",
    status: "نشط",
    performance: 92
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "المبيعات",
    email: "mohammed.shamari@company.com",
    phone: "+966509876543", 
    salary: "8500",
    joinDate: "2020-11-10",
    status: "إجازة",
    performance: 78
  }
];

const leaveRequests = [
  {
    id: 1,
    employeeName: "سارة أحمد المطيري",
    leaveType: "إجازة سنوية",
    startDate: "2024-02-15",
    endDate: "2024-02-25",
    days: 10,
    reason: "سفر عائلي",
    status: "معلق",
    submittedDate: "2024-01-28"
  },
  {
    id: 2,
    employeeName: "خالد محمد العتيبي", 
    leaveType: "إجازة مرضية",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
    days: 3,
    reason: "مراجعة طبية",
    status: "معلق",
    submittedDate: "2024-02-08"
  }
];

const employerServices = [
  {
    title: "إدارة الموظفين",
    description: "إدارة شاملة لجميع بيانات الموظفين",
    icon: Users,
    route: "/services/employee-management",
    color: "bg-primary",
    stats: "247 موظف"
  },
  {
    title: "التوظيف",
    description: "إدارة عمليات التوظيف والمرشحين",
    icon: UserPlus,
    route: "/services/recruitment",
    color: "bg-accent",
    stats: "15 مرشح جديد"
  },
  {
    title: "تقييم الأداء",
    description: "نظام تقييم الأداء وإدارة KPIs",
    icon: Target,
    route: "/services/performance",
    color: "bg-primary",
    stats: "85% متوسط الأداء"
  },
  {
    title: "التدريب والتطوير",
    description: "إدارة البرامج التدريبية",
    icon: BookOpen,
    route: "/services/training",
    color: "bg-accent",
    stats: "12 دورة نشطة"
  }
];

export const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: ''
  });
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تمت إضافة الموظف بنجاح",
      description: `تم إضافة ${newEmployee.name} إلى النظام`,
    });
    
    // إعادة تعيين النموذج
    setNewEmployee({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      salary: ''
    });
    setIsAddEmployeeOpen(false);
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsViewEmployeeOpen(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditEmployeeOpen(true);
  };

  const handleApproveLeave = (requestId: number) => {
    toast({
      title: "تم قبول الطلب",
      description: "تم قبول طلب الإجازة بنجاح",
    });
  };

  const handleRejectLeave = (requestId: number) => {
    toast({
      title: "تم رفض الطلب", 
      description: "تم رفض طلب الإجازة",
      variant: "destructive"
    });
  };

  const handleCreateEvaluation = (employeeId: number) => {
    toast({
      title: "إنشاء تقييم أداء",
      description: "تم فتح نموذج تقييم الأداء",
    });
    // يمكن توجيه المستخدم لصفحة تقييم الأداء
    navigate('/services/performance');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            بوابة صاحب العمل
          </h1>
          <p className="text-muted-foreground text-lg">
            لوحة التحكم الشاملة لإدارة الموارد البشرية
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">طلبات الإجازة المعلقة</p>
                <p className="text-2xl font-bold text-warning">{leaveRequests.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-success">85%</p>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                <p className="text-2xl font-bold text-primary">{employees.filter(emp => emp.status === 'نشط').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* إضافة موظف جديد */}
        <Card className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">إدارة الموظفين</h3>
            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <UserPlus className="h-4 w-4 mr-2" />
                  إضافة موظف جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة موظف جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات الموظف الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      الاسم
                    </Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      className="col-span-3"
                      placeholder="اسم الموظف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="position" className="text-right">
                      المنصب
                    </Label>
                    <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      className="col-span-3"
                      placeholder="منصب الموظف"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      القسم
                    </Label>
                    <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                        <SelectItem value="المالية">المالية</SelectItem>
                        <SelectItem value="المبيعات">المبيعات</SelectItem>
                        <SelectItem value="التسويق">التسويق</SelectItem>
                        <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      className="col-span-3"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      رقم الجوال
                    </Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      className="col-span-3"
                      placeholder="+966501234567"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="salary" className="text-right">
                      الراتب
                    </Label>
                    <Input
                      id="salary"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                      className="col-span-3"
                      placeholder="10000"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddEmployee}>
                    إضافة الموظف
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* قائمة الموظفين */}
          <div className="space-y-4">
            <h4 className="font-medium">قائمة الموظفين</h4>
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold">{employee.name}</h5>
                    <p className="text-sm text-muted-foreground">{employee.position} - {employee.department}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={employee.status === 'نشط' ? 'default' : 'secondary'}>
                      {employee.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">أداء: {employee.performance}%</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewEmployee(employee)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCreateEvaluation(employee.id)}
                    >
                      <Award className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* طلبات الإجازة المعلقة */}
        <Card className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">طلبات الإجازة المعلقة</h3>
          
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h5 className="font-semibold">{request.employeeName}</h5>
                  <p className="text-sm text-muted-foreground">{request.leaveType}</p>
                  <p className="text-xs text-muted-foreground">
                    من {request.startDate} إلى {request.endDate} ({request.days} أيام)
                  </p>
                  <p className="text-xs text-muted-foreground">السبب: {request.reason}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{request.status}</Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleApproveLeave(request.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRejectLeave(request.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* الخدمات المتاحة */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">الخدمات المتاحة</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerServices.map((service, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => navigate(service.route)}
              >
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {service.stats}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog عرض تفاصيل الموظف */}
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تفاصيل الموظف</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>الاسم</Label>
                  <p className="text-sm">{selectedEmployee.name}</p>
                </div>
                <div className="space-y-2">
                  <Label>المنصب</Label>
                  <p className="text-sm">{selectedEmployee.position}</p>
                </div>
                <div className="space-y-2">
                  <Label>القسم</Label>
                  <p className="text-sm">{selectedEmployee.department}</p>
                </div>
                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <p className="text-sm">{selectedEmployee.email}</p>
                </div>
                <div className="space-y-2">
                  <Label>رقم الجوال</Label>
                  <p className="text-sm">{selectedEmployee.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label>الراتب</Label>
                  <p className="text-sm">{selectedEmployee.salary} ريال</p>
                </div>
                <div className="space-y-2">
                  <Label>تاريخ الانضمام</Label>
                  <p className="text-sm">{selectedEmployee.joinDate}</p>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Badge variant={selectedEmployee.status === 'نشط' ? 'default' : 'secondary'}>
                    {selectedEmployee.status}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog تعديل الموظف */}
        <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الموظف</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">الاسم</Label>
                  <Input
                    id="edit-name"
                    defaultValue={selectedEmployee.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-position" className="text-right">المنصب</Label>
                  <Input
                    id="edit-position"
                    defaultValue={selectedEmployee.position}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-salary" className="text-right">الراتب</Label>
                  <Input
                    id="edit-salary"
                    defaultValue={selectedEmployee.salary}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "تم تحديث البيانات",
                      description: "تم تحديث بيانات الموظف بنجاح",
                    });
                    setIsEditEmployeeOpen(false);
                  }}>
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};