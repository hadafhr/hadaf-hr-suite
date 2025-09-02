import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Building2, Users, Plus, RefreshCw, Settings, Trash2, 
  CheckCircle, AlertCircle, Eye, Download, BarChart3, Building, 
  User, MapPin, Mail, Phone, TrendingUp, Activity, Target, Star,
  Award, Calendar, Clock, FileText, Briefcase, Network, Shield,
  Edit, Printer, Search, Filter
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  nameEn: string;
  status: 'نشط' | 'غير نشط' | 'قيد المراجعة';
  manager: string;
  employeeCount: number;
  unitsCount: number;
  budget: number;
  description: string;
  lastUpdate: string;
  icon: React.ReactNode;
}

interface DepartmentsUnitsManagementProps {
  onBack: () => void;
}

export const DepartmentsUnitsManagement: React.FC<DepartmentsUnitsManagementProps> = ({ onBack }) => {
  const [syncing, setSyncing] = useState<string | null>(null);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isDeletingDepartment, setIsDeletingDepartment] = useState(false);
  const { toast } = useToast();

  const departments: Department[] = [
    {
      id: 'HR',
      name: 'إدارة الموارد البشرية',
      nameEn: 'Human Resources',
      status: 'نشط',
      manager: 'أحمد محمد علي',
      employeeCount: 45,
      unitsCount: 5,
      budget: 2500000,
      description: 'إدارة شؤون الموظفين والتوظيف والتطوير',
      lastUpdate: '2024-03-20 14:30',
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      id: 'IT',
      name: 'إدارة تقنية المعلومات',
      nameEn: 'Information Technology',
      status: 'نشط',
      manager: 'سارة أحمد المطيري',
      employeeCount: 32,
      unitsCount: 4,
      budget: 3200000,
      description: 'تطوير وصيانة الأنظمة التقنية والبنية التحتية',
      lastUpdate: '2024-03-20 13:45',
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    {
      id: 'FIN',
      name: 'الإدارة المالية والمحاسبة',
      nameEn: 'Finance & Accounting',
      status: 'نشط',
      manager: 'محمد خالد الشمري',
      employeeCount: 28,
      unitsCount: 3,
      budget: 1800000,
      description: 'إدارة الشؤون المالية والمحاسبية والميزانيات',
      lastUpdate: '2024-03-20 12:15',
      icon: <BarChart3 className="h-6 w-6 text-primary" />
    },
    {
      id: 'LEGAL',
      name: 'الإدارة القانونية',
      nameEn: 'Legal Affairs',
      status: 'قيد المراجعة',
      manager: 'فاطمة عبدالله النجار',
      employeeCount: 18,
      unitsCount: 2,
      budget: 1200000,
      description: 'الشؤون القانونية والامتثال واللوائح',
      lastUpdate: '2024-03-19 16:20',
      icon: <Network className="h-6 w-6 text-primary" />
    },
    {
      id: 'OPS',
      name: 'إدارة العمليات',
      nameEn: 'Operations',
      status: 'نشط',
      manager: 'علي حسن الزهراني',
      employeeCount: 55,
      unitsCount: 6,
      budget: 4500000,
      description: 'إدارة العمليات التشغيلية والإنتاجية',
      lastUpdate: '2024-03-20 11:00',
      icon: <Building className="h-6 w-6 text-primary" />
    },
    {
      id: 'MKT',
      name: 'إدارة التسويق والمبيعات',
      nameEn: 'Marketing & Sales',
      status: 'غير نشط',
      manager: 'نورا سالم القحطاني',
      employeeCount: 0,
      unitsCount: 0,
      budget: 0,
      description: 'التسويق والمبيعات وعلاقات العملاء',
      lastUpdate: '2024-03-18 09:30',
      icon: <Star className="h-6 w-6 text-primary" />
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'نشط':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'غير نشط':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      case 'قيد المراجعة':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'غير نشط': 'bg-gray-100 text-gray-800 border-gray-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const handleSync = async (departmentId: string) => {
    setSyncing(departmentId);
    const department = departments.find(d => d.id === departmentId);
    toast({
      title: "بدء التحديث",
      description: `جاري تحديث بيانات ${department?.name}...`,
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSyncing(null);
    
    toast({
      title: "تم التحديث بنجاح",
      description: `تم تحديث بيانات ${department?.name} بنجاح`,
    });
  };

  const handleAddNewDepartment = async () => {
    setIsAddingDepartment(true);
    toast({
      title: "إضافة إدارة جديدة",
      description: "جاري تحضير نموذج إضافة الإدارة الجديدة...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAddingDepartment(false);
    
    toast({
      title: "جاهز للإضافة",
      description: "يمكنك الآن إدخال بيانات الإدارة الجديدة",
    });
  };

  const handleDeleteDepartment = async () => {
    setIsDeletingDepartment(true);
    toast({
      title: "حذف إدارة",
      description: "جاري تحضير قائمة الإدارات المتاحة للحذف...",
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeletingDepartment(false);
    
    toast({
      title: "جاهز للحذف",
      description: "اختر الإدارة التي تريد حذفها من القائمة",
    });
  };

  const handleDepartmentSettings = () => {
    toast({
      title: "الإعدادات العامة",
      description: "جاري فتح إعدادات نظام الإدارات والوحدات...",
    });
  };

  const handleViewDepartment = (department: Department) => {
    toast({
      title: `معاينة ${department.name}`,
      description: `عرض تفاصيل وإحصائيات ${department.nameEn}`,
    });
  };

  const handleExportDepartment = (department: Department) => {
    toast({
      title: `تصدير بيانات ${department.name}`,
      description: "جاري تحضير ملف التصدير... سيتم تحميله قريباً",
    });
    
    setTimeout(() => {
      toast({
        title: "تم التصدير بنجاح",
        description: `تم تصدير بيانات ${department.name} بصيغة Excel`,
      });
    }, 3000);
  };

  const handleDepartmentConfig = (department: Department) => {
    toast({
      title: `إعدادات ${department.name}`,
      description: `فتح لوحة إعدادات ${department.nameEn}`,
    });
  };

  const activeDepartments = departments.filter(d => d.status === 'نشط').length;
  const totalEmployees = departments.reduce((sum, d) => sum + d.employeeCount, 0);
  const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden" dir="rtl">
      {/* خلفية متحركة احترافية */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%)] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_theme(colors.secondary.DEFAULT)_0%,_transparent_50%)] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* هيدر فائق الجمال والاحترافية */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-gray-900 to-black p-10 mb-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl border border-primary/30">
          {/* طبقات التدرج المتقدمة */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 opacity-80"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_180deg,transparent_360deg)]"></div>
          
          {/* عناصر هندسية متحركة */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-secondary/40 rotate-45 animate-bounce"></div>
            <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-accent/10 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-primary/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 border border-secondary/30 transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-spin"></div>
          </div>
          
          <div className="relative z-20">
            {/* التخطيط الفائق: شعار - نص - رمز */}
            <div className="grid grid-cols-12 items-center mb-10 gap-6">
              {/* الشعار المتطور في أقصى اليمين */}
              <div className="col-span-3 flex justify-end">
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
                    <img 
                      src="/lovable-uploads/4b2910fb-b74e-4c5d-b399-8b1109f26b7b.png" 
                      alt="BOUD HR Logo" 
                      className="h-24 w-auto filter drop-shadow-2xl hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* النص المركزي الفائق */}
              <div className="col-span-6 text-center">
                <div className="space-y-4">
                  <div className="relative">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white mb-3 tracking-wider animate-fade-in">
                      إدارة الأقسام والوحدات
                    </h1>
                    <div className="absolute inset-0 text-6xl font-black text-white/5 blur-sm transform -translate-y-3">
                      إدارة الأقسام والوحدات
                    </div>
                  </div>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full border border-primary/50 backdrop-blur-xl shadow-2xl">
                    <span className="text-2xl font-bold text-white tracking-widest">DEPARTMENTS MANAGEMENT</span>
                  </div>
                </div>
              </div>
              
              {/* الرمز المتقدم في اليسار */}
              <div className="col-span-3 flex justify-start">
                <div className="group relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-secondary/40 to-accent/40 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
                  <div className="relative p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-xl border border-primary/30 shadow-2xl hover:scale-110 transition-all duration-500">
                    <Building2 className="h-16 w-16 text-white drop-shadow-2xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* الوصف الجمالي */}
            <div className="text-center mb-10">
              <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl backdrop-blur-xl border border-white/20 shadow-inner">
                <p className="text-xl text-white/90 leading-relaxed font-medium tracking-wide">
                  <span className="text-primary font-bold">منظومة متطورة وذكية</span> لإدارة جميع الأقسام والوحدات التنظيمية 
                  <span className="text-secondary font-bold"> وتنسيق الهيكل الإداري</span> بكفاءة عالية ومرونة تامة
                </p>
              </div>
            </div>

            {/* شريط الفاصل الجمالي */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="mx-6 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>

            {/* مجموعة الأزرار الفائقة الجمال */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Button
                onClick={onBack}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <ArrowLeft className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">رجوع للوحة التحكم</span>
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <RefreshCw className="h-5 w-5 ml-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10">تحديث البيانات</span>
              </Button>
              
              <Button 
                onClick={handleAddNewDepartment}
                disabled={isAddingDepartment}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isAddingDepartment ? (
                  <RefreshCw className="h-5 w-5 ml-3 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5 ml-3 group-hover:rotate-90 transition-transform duration-300" />
                )}
                <span className="relative z-10">{isAddingDepartment ? 'جاري التحضير...' : 'إضافة إدارة جديدة'}</span>
              </Button>
              
              <Button 
                onClick={handleDeleteDepartment}
                disabled={isDeletingDepartment}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isDeletingDepartment ? (
                  <RefreshCw className="h-5 w-5 ml-3 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5 ml-3 group-hover:scale-110 transition-transform duration-300" />
                )}
                <span className="relative z-10">{isDeletingDepartment ? 'جاري التحضير...' : 'حذف إدارة'}</span>
              </Button>
              
              <Button 
                onClick={handleDepartmentSettings}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Settings className="h-5 w-5 ml-3 group-hover:rotate-90 transition-transform duration-500" />
                <span className="relative z-10">الإعدادات المتقدمة</span>
              </Button>
            </div>
          </div>
        </div>

        {/* إحصائيات احترافية محدثة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الإدارات</p>
                  <p className="text-3xl font-bold text-primary">{departments.length}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>نشط ومتاح</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/20 hover:border-accent/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">الإدارات النشطة</p>
                  <p className="text-3xl font-bold text-accent">{activeDepartments}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>متصلة ومتزامنة</span>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors duration-300">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-secondary/20 hover:border-secondary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold text-secondary">{totalEmployees}</p>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Users className="w-3 h-3" />
                    <span>موزعين على الإدارات</span>
                  </div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-colors duration-300">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="relative z-10 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الميزانيات</p>
                  <p className="text-3xl font-bold text-green-600">{(totalBudget / 1000000).toFixed(1)}م</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <BarChart3 className="w-3 h-3" />
                    <span>ريال سعودي</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-2xl group-hover:bg-green-500/20 transition-colors duration-300">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* شبكة الإدارات الاحترافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => (
            <Card key={department.id} className="group relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 hover:from-card hover:to-card/80 border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl backdrop-blur-xl">
              {/* خلفية متدرجة تظهر عند التمرير */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* عنصر تزيني على اليمين */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      {department.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                        {department.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{department.nameEn}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusBadge(department.status)} border text-xs font-medium`}
                  >
                    {getStatusIcon(department.status)}
                    <span className="ml-1">{department.status}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                {/* معلومات أساسية */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">المدير</p>
                      <p className="font-medium truncate">{department.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Users className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">الموظفين</p>
                      <p className="font-bold text-accent">{department.employeeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <Network className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">الوحدات</p>
                      <p className="font-bold text-secondary">{department.unitsCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">الميزانية</p>
                      <p className="font-bold text-green-600">{(department.budget / 1000000).toFixed(1)}م</p>
                    </div>
                  </div>
                </div>

                {/* الوصف */}
                <div className="p-3 bg-muted/20 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {department.description}
                  </p>
                </div>

                {/* معلومات إضافية */}
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>آخر تحديث: {department.lastUpdate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>ID: {department.id}</span>
                  </div>
                </div>

                {/* أزرار العمليات */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/30">
                  <Button
                    size="sm"
                    onClick={() => handleSync(department.id)}
                    disabled={syncing === department.id}
                    className="group/btn relative overflow-hidden bg-primary/90 hover:bg-primary text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    {syncing === department.id ? (
                      <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 ml-2" />
                    )}
                    <span className="relative z-10">
                      {syncing === department.id ? 'جاري التحديث...' : 'تحديث فوري'}
                    </span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDepartment(department)}
                    className="group/btn hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform duration-200" />
                    <span>معاينة</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleExportDepartment(department)}
                    className="group/btn hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4 ml-2 group-hover/btn:translate-y-1 transition-transform duration-200" />
                    <span>تصدير</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDepartmentConfig(department)}
                    className="group/btn hover:bg-secondary/10 hover:border-secondary/30 hover:text-secondary transition-all duration-300 hover:scale-105"
                  >
                    <Settings className="w-4 h-4 ml-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                    <span>إعدادات</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsUnitsManagement;