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

const allPlatforms = [
  {
    id: 1,
    title: "إدارة الموظفين",
    description: "إدارة شاملة لجميع بيانات الموظفين وكشوفات المرتبات",
    icon: Users,
    route: "/service-platforms/employee-management",
    color: "bg-primary",
    stats: "247 موظف",
    isActive: true,
    features: ["إدارة البيانات الشخصية", "تتبع الحضور والانصراف", "إدارة الإجازات", "تقارير شاملة"]
  },
  {
    id: 2,
    title: "التوظيف الذكي",
    description: "نظام ذكي لإدارة عمليات التوظيف والمرشحين",
    icon: UserPlus,
    route: "/service-platforms/recruitment",
    color: "bg-success",
    stats: "15 مرشح جديد",
    isActive: true,
    features: ["فرز المرشحين تلقائياً", "جدولة المقابلات", "تقييم المهارات", "إدارة العروض"]
  },
  {
    id: 3,
    title: "تقييم الأداء",
    description: "نظام تقييم الأداء وإدارة المؤشرات الرئيسية",
    icon: Target,
    route: "/service-platforms/performance-evaluation",
    color: "bg-warning",
    stats: "85% متوسط الأداء",
    isActive: true,
    features: ["تقييم دوري", "تتبع الأهداف", "تقارير الأداء", "خطط التطوير"]
  },
  {
    id: 4,
    title: "التدريب والتطوير",
    description: "منصة شاملة للتدريب والتطوير المهني",
    icon: BookOpen,
    route: "/service-platforms/training",
    color: "bg-info",
    stats: "12 دورة نشطة",
    isActive: true,
    features: ["دورات تفاعلية", "شهادات معتمدة", "تتبع التقدم", "تقييم المهارات"]
  },
  {
    id: 5,
    title: "حماية الأجور",
    description: "نظام حماية الأجور وإدارة المستحقات المالية",
    icon: Shield,
    route: "/service-platforms/wage-protection",
    color: "bg-primary",
    stats: "100% امتثال",
    isActive: false,
    features: ["حماية الأجور", "تتبع المستحقات", "تقارير الامتثال", "التكامل البنكي"]
  },
  {
    id: 6,
    title: "التطوير التنظيمي",
    description: "تطوير الهيكل التنظيمي وتحسين العمليات",
    icon: Building2,
    route: "/service-platforms/organizational-development",
    color: "bg-accent",
    stats: "8 مشروع",
    isActive: false,
    features: ["تحليل الهيكل التنظيمي", "تطوير العمليات", "إدارة التغيير", "قياس الفعالية"]
  },
  {
    id: 7,
    title: "التقارير والتحليلات",
    description: "تقارير تفصيلية وتحليلات ذكية للموارد البشرية",
    icon: BarChart3,
    route: "/service-platforms/reports",
    color: "bg-secondary",
    stats: "25 تقرير",
    isActive: false,
    features: ["تقارير مخصصة", "تحليل البيانات", "لوحات تحكم تفاعلية", "توقعات ذكية"]
  },
  {
    id: 8,
    title: "إدارة الأعمال",
    description: "أدوات شاملة لإدارة العمليات التجارية",
    icon: Building2,
    route: "/service-platforms/business-management",
    color: "bg-primary",
    stats: "12 عملية",
    isActive: false,
    features: ["إدارة المشاريع", "تتبع الأرباح", "إدارة العملاء", "تحليل الأداء المالي"]
  }
];

const subscriptionPlans = [
  {
    id: 1,
    name: "الباقة الأساسية",
    price: "199",
    period: "شهرياً",
    employeeRange: "1-50 موظف",
    features: [
      "إدارة بيانات الموظفين",
      "تتبع الحضور الأساسي",
      "تقارير أساسية",
      "دعم فني 24/7"
    ],
    color: "border-muted",
    recommended: false
  },
  {
    id: 2,
    name: "الباقة المتقدمة",
    price: "399",
    period: "شهرياً",
    employeeRange: "51-200 موظف",
    features: [
      "جميع مزايا الباقة الأساسية",
      "نظام تقييم الأداء",
      "إدارة الإجازات المتقدمة",
      "تقارير تحليلية مفصلة",
      "التكامل مع الأنظمة الخارجية"
    ],
    color: "border-primary",
    recommended: true
  },
  {
    id: 3,
    name: "باقة المؤسسات",
    price: "799",
    period: "شهرياً",
    employeeRange: "200+ موظف",
    features: [
      "جميع مزايا الباقة المتقدمة",
      "ذكاء اصطناعي متقدم",
      "تخصيص كامل للواجهات",
      "دعم مخصص",
      "تدريب متخصص للفريق",
      "خدمات استشارية"
    ],
    color: "border-accent",
    recommended: false
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
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  const [activePlatforms, setActivePlatforms] = useState(allPlatforms.filter(p => p.isActive));

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
    navigate('/service-platforms/performance-evaluation');
  };

  const handleAddNewPlatform = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSubscribeToPlan = (platformId: number, planId: number) => {
    const platform = allPlatforms.find(p => p.id === platformId);
    const plan = subscriptionPlans.find(p => p.id === planId);
    
    if (platform && plan) {
      // Simulate activation
      setActivePlatforms(prev => [...prev, { ...platform, isActive: true }]);
      
      toast({
        title: "تم تفعيل المنصة بنجاح",
        description: `تم الاشتراك في ${platform.title} بالباقة ${plan.name}`,
      });
      
      setIsSubscriptionModalOpen(false);
      setSelectedPlatform(null);
    }
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

        {/* المنصات المتاحة */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">المنصات المتاحة</h2>
            <Button 
              onClick={handleAddNewPlatform}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              إضافة منصة جديدة
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activePlatforms.map((platform) => (
              <Card 
                key={platform.id} 
                className="relative p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 border-2"
                onClick={() => navigate(platform.route)}
              >
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="bg-success text-white">
                    نشط
                  </Badge>
                </div>
                
                <div className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{platform.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
                
                <div className="space-y-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {platform.stats}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">المزايا الرئيسية:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {platform.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-success mr-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
            
            {/* بطاقة إضافة منصة جديدة */}
            <Card 
              className="p-6 border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors cursor-pointer group flex items-center justify-center min-h-[300px]"
              onClick={handleAddNewPlatform}
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/10 transition-colors">
                  <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground group-hover:text-primary mb-2">
                  إضافة منصة جديدة
                </h3>
                <p className="text-sm text-muted-foreground">
                  اكتشف المزيد من المنصات لتطوير أعمالك
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* مودال باقات الاشتراك */}
        <Dialog open={isSubscriptionModalOpen} onOpenChange={setIsSubscriptionModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">اختر المنصة المناسبة لأعمالك</DialogTitle>
              <DialogDescription>
                اكتشف مجموعة واسعة من المنصات المتخصصة لتطوير أعمالك
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-8">
              {/* المنصات المتاحة للتفعيل */}
              <div>
                <h3 className="text-lg font-semibold mb-4">المنصات المتاحة</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allPlatforms.filter(p => !p.isActive).map((platform) => (
                    <Card 
                      key={platform.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedPlatform?.id === platform.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center`}>
                          <platform.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{platform.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{platform.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {platform.stats}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* باقات الاشتراك */}
              {selectedPlatform && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    باقات الاشتراك - {selectedPlatform.title}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {subscriptionPlans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`p-6 relative ${plan.color} ${
                          plan.recommended ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                      >
                        {plan.recommended && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-primary text-white">الأكثر شعبية</Badge>
                          </div>
                        )}
                        
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-bold">{plan.name}</h4>
                          <div className="mt-2">
                            <span className="text-3xl font-bold text-primary">{plan.price}</span>
                            <span className="text-muted-foreground"> ريال {plan.period}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{plan.employeeRange}</p>
                        </div>
                        
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full"
                          variant={plan.recommended ? "default" : "outline"}
                          onClick={() => handleSubscribeToPlan(selectedPlatform.id, plan.id)}
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          انضم الينا
                        </Button>
                      </Card>
                    ))}
                  </div>
                  
                  {/* مزايا المنصة المحددة */}
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">مزايا {selectedPlatform.title}:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedPlatform.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-success mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

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