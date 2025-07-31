import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmployeeEditDialog } from '@/components/EmployeeEditDialog';
import { EmployeeReportsDialog } from '@/components/EmployeeReportsDialog';
import { useDownloadPrint } from '@/hooks/useDownloadPrint';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
  X,
  Printer,
  MoreHorizontal,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  salary: number;
  city: string;
  notes?: string;
  avatar?: string;
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "it",
    email: "ahmed.saad@company.com",
    phone: "+966501234567",
    status: "active",
    joinDate: "2022-03-15",
    salary: 12000,
    city: "riyadh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "finance",
    email: "fatma.noor@company.com",
    phone: "+966507654321",
    status: "active",
    joinDate: "2021-07-20",
    salary: 9500,
    city: "jeddah",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "sales",
    email: "mohammed.shamari@company.com",
    phone: "+966509876543",
    status: "on-leave",
    joinDate: "2020-11-10",
    salary: 8500,
    city: "dammam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export const EmployeeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReportsDialog, setShowReportsDialog] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [employeeFormData, setEmployeeFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    joinDate: ''
  });
  const { toast } = useToast();
  const { downloadFile, printData } = useDownloadPrint();

  const departments = [
    { value: 'all', label: 'جميع الأقسام' },
    { value: 'hr', label: 'الموارد البشرية' },
    { value: 'finance', label: 'المالية' },
    { value: 'it', label: 'تقنية المعلومات' },
    { value: 'marketing', label: 'التسويق' },
    { value: 'sales', label: 'المبيعات' },
    { value: 'operations', label: 'العمليات' },
    { value: 'legal', label: 'الشؤون القانونية' },
    { value: 'admin', label: 'الإدارة العامة' }
  ];

  const statusTranslations = {
    'active': 'نشط',
    'inactive': 'غير نشط',
    'on-leave': 'في إجازة'
  };

  const statusColors = {
    'active': 'default',
    'inactive': 'secondary',
    'on-leave': 'destructive'
  } as const;

  const handleAddEmployee = () => {
    setShowEmployeeForm(true);
  };

  const handleSubmitEmployee = () => {
    toast({
      title: "تم إضافة الموظف بنجاح",
      description: `تم إضافة ${employeeFormData.name} إلى النظام`,
    });
    setShowEmployeeForm(false);
    setEmployeeFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: '',
      salary: '',
      joinDate: ''
    });
  };

  const handleExportData = () => {
    const employeeData = employees.map(emp => ({
      الاسم: emp.name,
      المنصب: emp.position,
      القسم: emp.department,
      البريد_الإلكتروني: emp.email,
      الهاتف: emp.phone,
      الراتب: emp.salary,
      تاريخ_التوظيف: emp.joinDate,
      الحالة: emp.status,
      المدينة: emp.city
    }));
    
    downloadFile({
      data: employeeData,
      filename: 'بيانات_الموظفين_الشاملة',
      format: 'excel'
    });
  };

  const handleAdvancedFilter = () => {
    toast({
      title: "فلتر متقدم",
      description: "تم فتح إعدادات الفلتر المتقدم",
    });
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    toast({
      title: "عرض تفاصيل الموظف",
      description: `تم عرض تفاصيل ${employee.name}`,
    });
  };

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee(employee);
    setShowEditDialog(true);
    toast({
      title: "تعديل بيانات الموظف",
      description: `جاري تعديل بيانات ${employee.name}`,
    });
  };

  const handleDownloadReport = (employee: any) => {
    const employeeReport = {
      المعلومات_الأساسية: {
        الاسم: employee.name,
        المنصب: employee.position,
        القسم: employee.department,
        البريد_الإلكتروني: employee.email,
        الهاتف: employee.phone
      },
      التفاصيل_المالية: {
        الراتب: employee.salary,
        تاريخ_التوظيف: employee.joinDate
      },
      المعلومات_الإضافية: {
        الحالة: employee.status,
        المدينة: employee.city,
        الملاحظات: employee.notes || 'لا توجد ملاحظات'
      }
    };
    
    downloadFile({
      data: employeeReport,
      filename: `تقرير_الموظف_${employee.name}`,
      format: 'pdf'
    });
  };

  const handlePrintEmployee = (employee: any) => {
    printData(employee, `ملف الموظف: ${employee.name}`);
  };

  const handleViewReports = (employee: any) => {
    setSelectedEmployee(employee);
    setShowReportsDialog(true);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: action,
      description: `تم تنفيذ: ${action}`,
    });
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.includes(searchTerm) || 
    emp.department.includes(searchTerm) ||
    emp.position.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/services')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للخدمات
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                إدارة الموظفين
              </h1>
              <p className="text-muted-foreground">
                نظام شامل لإدارة بيانات وشؤون الموظفين
              </p>
            </div>
          </div>
          <Button className="btn-primary" onClick={handleAddEmployee}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة موظف جديد
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">247</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                <p className="text-2xl font-bold text-success">235</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">في إجازة</p>
                <p className="text-2xl font-bold text-warning">8</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">موظفين جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Plus className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="dashboard-card">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث عن موظف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                تصدير البيانات
              </Button>
              <Button variant="outline" onClick={handleAdvancedFilter}>فلتر متقدم</Button>
            </div>
          </div>
        </Card>

        {/* Employee List */}
        <Card className="dashboard-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">قائمة الموظفين</h3>
            
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {employee.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {employee.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{employee.department}</p>
                      <Badge variant={statusColors[employee.status]}>
                        {statusTranslations[employee.status]}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewEmployee(employee)}
                        title="عرض التفاصيل"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditEmployee(employee)}
                        title="تعديل البيانات"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadReport(employee)}
                        title="تحميل التقرير"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handlePrintEmployee(employee)}
                        title="طباعة"
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewReports(employee)}
                        title="التقارير التفصيلية"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إجراءات سريعة</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('إضافة موظف جديد')}
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة موظف جديد
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('تصدير قائمة الموظفين')}
              >
                <FileText className="h-4 w-4 mr-2" />
                تصدير قائمة الموظفين
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('إدارة الإجازات')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                إدارة الإجازات
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">التقارير</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('تقرير الحضور الشهري')}
              >
                <FileText className="h-4 w-4 mr-2" />
                تقرير الحضور الشهري
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('تقرير الرواتب')}
              >
                <FileText className="h-4 w-4 mr-2" />
                تقرير الرواتب
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction('تقرير الأداء')}
              >
                <FileText className="h-4 w-4 mr-2" />
                تقرير الأداء
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إحصائيات سريعة</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">متوسط الراتب</span>
                <span className="font-medium">9,750 ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">متوسط سنوات الخبرة</span>
                <span className="font-medium">3.2 سنة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">معدل دوران الموظفين</span>
                <span className="font-medium">4.8%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Employee Details Modal */}
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">تفاصيل الموظف</DialogTitle>
            </DialogHeader>
            
            {selectedEmployee && (
              <div className="space-y-6">
                {/* Employee Header */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img 
                    src={selectedEmployee.avatar} 
                    alt={selectedEmployee.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground">{selectedEmployee.name}</h2>
                    <p className="text-lg text-muted-foreground">{selectedEmployee.position}</p>
                    <Badge variant={statusColors[selectedEmployee.status]} className="mt-2">
                      {statusTranslations[selectedEmployee.status]}
                    </Badge>
                  </div>
                </div>

                {/* Employee Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b border-border pb-2">المعلومات الشخصية</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground ml-2">البريد الإلكتروني:</span>
                        <span className="font-medium">{selectedEmployee.email}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 ml-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground ml-2">رقم الهاتف:</span>
                        <span className="font-medium">{selectedEmployee.phone}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground ml-2">تاريخ الالتحاق:</span>
                        <span className="font-medium">{selectedEmployee.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b border-border pb-2">معلومات العمل</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">القسم:</span>
                        <p className="font-medium">{selectedEmployee.department}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">المنصب:</span>
                        <p className="font-medium">{selectedEmployee.position}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">الراتب:</span>
                        <p className="font-medium text-lg text-primary">{selectedEmployee.salary} ريال</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-border pb-2">معلومات إضافية</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium text-sm text-muted-foreground">سنوات الخبرة</h4>
                      <p className="text-lg font-bold text-primary">
                        {Math.floor((new Date().getTime() - new Date(selectedEmployee.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} سنة
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-sm text-muted-foreground">الإجازات المتبقية</h4>
                      <p className="text-lg font-bold text-warning">21 يوم</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium text-sm text-muted-foreground">تقييم الأداء</h4>
                      <p className="text-lg font-bold text-success">ممتاز</p>
                    </Card>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={() => handleEditEmployee(selectedEmployee)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل البيانات
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadReport(selectedEmployee)}
                    className="flex-1"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    تحميل التقرير
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedEmployee(null)}
                  >
                    إغلاق
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Employee Form Dialog */}
        <Dialog open={showEmployeeForm} onOpenChange={setShowEmployeeForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة موظف جديد</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-name">الاسم الكامل</Label>
                  <Input
                    id="employee-name"
                    value={employeeFormData.name}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, name: e.target.value})}
                    placeholder="أحمد محمد السعد"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employee-position">المنصب</Label>
                  <Input
                    id="employee-position"
                    value={employeeFormData.position}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, position: e.target.value})}
                    placeholder="مطور برمجيات أول"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-department">القسم</Label>
                  <Select value={employeeFormData.department} onValueChange={(value) => setEmployeeFormData({...employeeFormData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                      <SelectItem value="marketing">التسويق</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employee-email">البريد الإلكتروني</Label>
                  <Input
                    id="employee-email"
                    type="email"
                    value={employeeFormData.email}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, email: e.target.value})}
                    placeholder="employee@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-phone">رقم الهاتف</Label>
                  <Input
                    id="employee-phone"
                    value={employeeFormData.phone}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, phone: e.target.value})}
                    placeholder="+966501234567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employee-salary">الراتب (ريال)</Label>
                  <Input
                    id="employee-salary"
                    type="number"
                    value={employeeFormData.salary}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, salary: e.target.value})}
                    placeholder="8000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-joinDate">تاريخ الالتحاق</Label>
                  <Input
                    id="employee-joinDate"
                    type="date"
                    value={employeeFormData.joinDate}
                    onChange={(e) => setEmployeeFormData({...employeeFormData, joinDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="btn-primary flex-1" onClick={handleSubmitEmployee}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة الموظف
                </Button>
                <Button variant="outline" onClick={() => setShowEmployeeForm(false)}>
                  <X className="h-4 w-4 mr-2" />
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Employee Edit Dialog */}
        <EmployeeEditDialog 
          employee={editingEmployee}
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingEmployee(null);
          }}
          onSave={(updatedEmployee) => {
            // Update employee in the list
            setEmployees(prev => prev.map(emp => 
              emp.id === updatedEmployee.id ? updatedEmployee : emp
            ));
            setShowEditDialog(false);
            setEditingEmployee(null);
            toast({
              title: "تم تحديث البيانات",
              description: `تم تحديث بيانات ${updatedEmployee.name} بنجاح`,
            });
          }}
        />

        {/* Employee Reports Dialog */}
        <EmployeeReportsDialog 
          employee={selectedEmployee}
          isOpen={showReportsDialog}
          onClose={() => {
            setShowReportsDialog(false);
            setSelectedEmployee(null);
          }}
        />
      </div>
    </div>
  );
};