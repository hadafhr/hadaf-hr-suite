import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, Users, Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Printer, Save,
  BarChart3, PieChart, TrendingUp, Activity, CheckCircle, AlertCircle, Clock,
  FileText, Settings, Target, Star, Award, Building, Mail, Phone, MapPin,
  Calendar, MessageSquare, UserPlus, Briefcase, Globe, ChevronRight, Menu,
  FileSpreadsheet, Zap, Shield, Gauge, X, RefreshCw, Home, Languages,
  Heart, CreditCard, Clipboard, Database, UserCog, Bell, Lock, Network,
  ArrowLeft, ChevronDown, AlertTriangle, DollarSign, User
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockDepartments = [
  {
    id: '1',
    name: 'الموارد البشرية',
    nameEn: 'Human Resources',
    code: 'HR-001',
    parentId: null,
    managerId: 'emp-001',
    managerName: 'أحمد محمد',
    employeeCount: 12,
    budget: 500000,
    location: 'المبنى الرئيسي - الطابق الثالث',
    description: 'إدارة شؤون الموظفين والتوظيف والتطوير',
    type: 'administrative',
    status: 'active',
    color: '#00C897',
    units: [
      { id: 'u1', name: 'التوظيف والاختيار', head: 'سارة أحمد', employees: 5 },
      { id: 'u2', name: 'التدريب والتطوير', head: 'محمد علي', employees: 4 },
      { id: 'u3', name: 'الرواتب والمزايا', head: 'فاطمة محمد', employees: 3 }
    ]
  },
  {
    id: '2',
    name: 'تقنية المعلومات',
    nameEn: 'Information Technology',
    code: 'IT-001',
    parentId: null,
    managerId: 'emp-002',
    managerName: 'محمد خالد',
    employeeCount: 18,
    budget: 800000,
    location: 'المبنى الرئيسي - الطابق الثاني',
    description: 'تطوير وصيانة الأنظمة التقنية',
    type: 'technical',
    status: 'active',
    color: '#4F46E5',
    units: [
      { id: 'u4', name: 'تطوير التطبيقات', head: 'علي حسن', employees: 8 },
      { id: 'u5', name: 'أمن المعلومات', head: 'نورا سالم', employees: 6 },
      { id: 'u6', name: 'الدعم التقني', head: 'أحمد يوسف', employees: 4 }
    ]
  },
  {
    id: '3',
    name: 'المالية والمحاسبة',
    nameEn: 'Finance & Accounting',
    code: 'FIN-001',
    parentId: null,
    managerId: 'emp-003',
    managerName: 'فاطمة عبدالله',
    employeeCount: 10,
    budget: 300000,
    location: 'المبنى الرئيسي - الطابق الأول',
    description: 'إدارة الشؤون المالية والمحاسبية',
    type: 'financial',
    status: 'active',
    color: '#F59E0B',
    units: [
      { id: 'u7', name: 'المحاسبة العامة', head: 'خالد أحمد', employees: 6 },
      { id: 'u8', name: 'الخزينة', head: 'سارة محمد', employees: 4 }
    ]
  }
];

const mockStats = {
  totalDepartments: 12,
  totalUnits: 28,
  totalEmployees: 156,
  activeManagers: 12,
  vacantPositions: 8,
  departmentsWithoutManager: 2
};

interface DepartmentsUnitsManagementProps {
  onBack: () => void;
}

const DepartmentsUnitsManagement: React.FC<DepartmentsUnitsManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>(['1']);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    code: '',
    managerId: '',
    budget: '',
    location: '',
    description: '',
    type: 'administrative',
    parentId: ''
  });

  const filteredDepartments = useMemo(() => {
    return mockDepartments.filter(dept => {
      const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dept.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || dept.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const handleSaveDepartment = () => {
    // Mock save functionality
    toast.success('تم حفظ الإدارة بنجاح');
    setShowAddDepartment(false);
    setFormData({
      name: '', nameEn: '', code: '', managerId: '', budget: '', 
      location: '', description: '', type: 'administrative', parentId: ''
    });
  };

  const handleDeleteDepartment = (id: string) => {
    toast.success('تم حذف الإدارة بنجاح');
  };

  const handleExportData = (format: string) => {
    toast.success(`تم تصدير البيانات بصيغة ${format}`);
  };

  const toggleDepartment = (deptId: string) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card bg-gradient-to-br from-primary/10 to-primary/20 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الإدارات</p>
                <p className="text-3xl font-bold text-primary">{mockStats.totalDepartments}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  زيادة 12% هذا الشهر
                </p>
              </div>
              <Building2 className="w-12 h-12 text-primary/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-gradient-to-br from-accent/10 to-accent/20 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الوحدات</p>
                <p className="text-3xl font-bold text-accent">{mockStats.totalUnits}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  زيادة 8% هذا الشهر
                </p>
              </div>
              <Network className="w-12 h-12 text-accent/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card bg-gradient-to-br from-success/10 to-success/20 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-3xl font-bold text-success">{mockStats.totalEmployees}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  زيادة 15% هذا الشهر
                </p>
              </div>
              <Users className="w-12 h-12 text-success/70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              التنبيهات الهامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm font-medium text-warning">إدارات بدون مدير</p>
              <p className="text-xs text-muted-foreground mt-1">
                يوجد {mockStats.departmentsWithoutManager} إدارات تحتاج لتعيين مدير
              </p>
            </div>
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm font-medium text-destructive">مناصب شاغرة</p>
              <p className="text-xs text-muted-foreground mt-1">
                يوجد {mockStats.vacantPositions} مناصب شاغرة تحتاج للإعلان عنها
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              اقتراحات الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary">إعادة الهيكلة المقترحة</p>
              <p className="text-xs text-muted-foreground mt-1">
                يُنصح بدمج وحدة التدريب مع وحدة التطوير لتحسين الكفاءة
              </p>
            </div>
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-medium text-success">توزيع الموظفين الأمثل</p>
              <p className="text-xs text-muted-foreground mt-1">
                توزيع متوازن للموظفين عبر جميع الإدارات
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>توزيع الموظفين حسب الإدارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDepartments.map((dept) => (
              <div key={dept.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="font-medium">{dept.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{dept.employeeCount} موظف</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(dept.employeeCount / 20) * 100}%`,
                        backgroundColor: dept.color 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDepartmentsList = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في الإدارات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 ml-2" />
              <SelectValue placeholder="تصفية حسب النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="administrative">إدارية</SelectItem>
              <SelectItem value="technical">تقنية</SelectItem>
              <SelectItem value="financial">مالية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => handleExportData('Excel')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            تصدير
          </Button>
          <Button 
            onClick={() => setShowAddDepartment(true)}
            className="flex items-center gap-2 bg-gradient-primary hover:shadow-glow"
          >
            <Plus className="w-4 h-4" />
            إضافة إدارة
          </Button>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="dashboard-card hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-8 rounded-full"
                    style={{ backgroundColor: department.color }}
                  />
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{department.code}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {department.type === 'administrative' ? 'إدارية' : 
                   department.type === 'technical' ? 'تقنية' : 'مالية'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{department.employeeCount} موظف</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{department.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{department.managerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>{department.budget?.toLocaleString()} ريال</span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">الوحدات التابعة ({department.units.length})</p>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {department.units.map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                      <span>{unit.name}</span>
                      <span className="text-muted-foreground">{unit.employees}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedDepartment(department)}
                  className="flex-1 text-xs"
                >
                  <Eye className="w-3 h-3 ml-1" />
                  عرض
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Edit className="w-3 h-3 ml-1" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOrganizationalChart = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">الهيكل التنظيمي</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExportData('PDF')}>
            <Download className="w-4 h-4 ml-2" />
            تحميل PDF
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 ml-2" />
            طباعة
          </Button>
        </div>
      </div>

      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockDepartments.map((department) => (
              <div key={department.id} className="space-y-2">
                <div 
                  className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft transition-all duration-200"
                  onClick={() => toggleDepartment(department.id)}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-1 h-6 w-6"
                  >
                    {expandedDepartments.includes(department.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </Button>
                  
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: department.color }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h4 className="font-medium">{department.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {department.employeeCount} موظف
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        مدير: {department.managerName}
                      </span>
                    </div>
                  </div>
                  
                  <Building className="w-5 h-5 text-muted-foreground" />
                </div>

                {expandedDepartments.includes(department.id) && (
                  <div className="mr-12 space-y-2 animate-accordion-down">
                    {department.units.map((unit) => (
                      <div 
                        key={unit.id}
                        className="flex items-center gap-3 p-3 bg-muted/30 border border-border/50 rounded-lg"
                      >
                        <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-sm">{unit.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {unit.employees} موظف
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              رئيس الوحدة: {unit.head}
                            </span>
                          </div>
                        </div>
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'تقرير الإدارات الشامل',
            description: 'تقرير مفصل بجميع الإدارات والوحدات',
            icon: FileText,
            color: 'primary'
          },
          {
            title: 'تقرير توزيع الموظفين',
            description: 'توزيع الموظفين حسب الإدارات والوحدات',
            icon: Users,
            color: 'accent'
          },
          {
            title: 'تقرير الهيكل التنظيمي',
            description: 'مخطط مرئي للهيكل التنظيمي',
            icon: Network,
            color: 'success'
          },
          {
            title: 'تقرير المناصب الشاغرة',
            description: 'قائمة بالمناصب الشاغرة والمطلوب شغلها',
            icon: AlertTriangle,
            color: 'warning'
          },
          {
            title: 'تقرير الميزانيات',
            description: 'توزيع الميزانيات على الإدارات',
            icon: DollarSign,
            color: 'destructive'
          },
          {
            title: 'تقرير الأداء الإداري',
            description: 'مؤشرات أداء الإدارات والوحدات',
            icon: BarChart3,
            color: 'secondary'
          }
        ].map((report, index) => (
          <Card key={index} className="dashboard-card hover:shadow-medium transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <report.icon className={`w-12 h-12 mx-auto mb-4 text-${report.color}`} />
              <h3 className="font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل
                </Button>
                <Button size="sm" variant="outline">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>إعدادات قسم الإدارات والوحدات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">صلاحيات المستخدمين</h4>
              <div className="space-y-3">
                {[
                  'إضافة إدارة جديدة',
                  'تعديل بيانات الإدارة',
                  'حذف الإدارة',
                  'عرض التقارير',
                  'تصدير البيانات'
                ].map((permission, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{permission}</span>
                    <Button size="sm" variant="outline">
                      إدارة
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">تخصيص العرض</h4>
              <div className="space-y-3">
                <div>
                  <Label>طريقة عرض الهيكل التنظيمي</Label>
                  <Select defaultValue="tree">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tree">شجرة هرمية</SelectItem>
                      <SelectItem value="grid">شبكة</SelectItem>
                      <SelectItem value="list">قائمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>عدد العناصر في الصفحة</Label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button variant="outline">إلغاء</Button>
            <Button className="bg-gradient-primary hover:shadow-glow">
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-gradient-primary shadow-soft border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-primary-foreground hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">إدارة الإدارات والوحدات</h1>
                <p className="text-primary-foreground/80 text-sm">نظام إدارة الهيكل التنظيمي الشامل</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleExportData('PDF')}
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
              >
                <Printer className="w-4 h-4 ml-2" />
                طباعة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              الإدارات
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              الهيكل التنظيمي
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="departments">
            {renderDepartmentsList()}
          </TabsContent>

          <TabsContent value="chart">
            {renderOrganizationalChart()}
          </TabsContent>

          <TabsContent value="reports">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Department Dialog */}
      <Dialog open={showAddDepartment} onOpenChange={setShowAddDepartment}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>إضافة إدارة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>اسم الإدارة (عربي) *</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="مثال: إدارة الموارد البشرية"
                />
              </div>
              <div>
                <Label>اسم الإدارة (إنجليزي)</Label>
                <Input 
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  placeholder="Human Resources Department"
                />
              </div>
              <div>
                <Label>رمز الإدارة *</Label>
                <Input 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  placeholder="HR-001"
                />
              </div>
              <div>
                <Label>نوع الإدارة</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrative">إدارية</SelectItem>
                    <SelectItem value="technical">تقنية</SelectItem>
                    <SelectItem value="financial">مالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>الميزانية المخصصة</Label>
                <Input 
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="500000"
                />
              </div>
              <div>
                <Label>الموقع</Label>
                <Input 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="المبنى الرئيسي - الطابق الأول"
                />
              </div>
            </div>
            
            <div>
              <Label>وصف الإدارة ومهامها</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="وصف مختصر لمهام ومسؤوليات الإدارة..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddDepartment(false)}
              >
                إلغاء
              </Button>
              <Button 
                onClick={handleSaveDepartment}
                className="bg-gradient-primary hover:shadow-glow"
              >
                حفظ الإدارة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Department Details Dialog */}
      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل إدارة {selectedDepartment?.name}</DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{selectedDepartment.employeeCount}</p>
                    <p className="text-xs text-muted-foreground">إجمالي الموظفين</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <Network className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="text-2xl font-bold">{selectedDepartment.units.length}</p>
                    <p className="text-xs text-muted-foreground">الوحدات التابعة</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-success" />
                    <p className="text-2xl font-bold">{selectedDepartment.budget?.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">الميزانية (ريال)</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <p className="text-2xl font-bold">نشط</p>
                    <p className="text-xs text-muted-foreground">حالة الإدارة</p>
                  </div>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="employees">الموظفين</TabsTrigger>
                  <TabsTrigger value="units">الوحدات</TabsTrigger>
                  <TabsTrigger value="performance">الأداء</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-4">معلومات الإدارة</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium">الرمز:</span> {selectedDepartment.code}</div>
                        <div><span className="font-medium">النوع:</span> {selectedDepartment.type}</div>
                        <div><span className="font-medium">المدير:</span> {selectedDepartment.managerName}</div>
                        <div><span className="font-medium">الموقع:</span> {selectedDepartment.location}</div>
                      </div>
                      <div className="mt-4">
                        <span className="font-medium">الوصف:</span>
                        <p className="text-sm text-muted-foreground mt-1">{selectedDepartment.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="employees">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-4">قائمة الموظفين</h4>
                      <p className="text-sm text-muted-foreground">سيتم عرض قائمة مفصلة بالموظفين المرتبطين بهذه الإدارة</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="units" className="space-y-4">
                  {selectedDepartment.units.map((unit) => (
                    <Card key={unit.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{unit.name}</h5>
                            <p className="text-sm text-muted-foreground">رئيس الوحدة: {unit.head}</p>
                          </div>
                          <Badge variant="outline">{unit.employees} موظف</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="performance">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-4">مؤشرات الأداء</h4>
                      <p className="text-sm text-muted-foreground">سيتم عرض مؤشرات الأداء والإحصائيات المتعلقة بهذه الإدارة</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentsUnitsManagement;