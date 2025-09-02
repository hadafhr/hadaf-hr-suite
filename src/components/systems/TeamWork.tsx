import React, { useState, useEffect, useCallback } from 'react';
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
import { 
  Users, Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Printer, Save,
  BarChart3, PieChart, TrendingUp, Activity, CheckCircle, AlertCircle, Clock,
  FileText, Settings, Target, Star, Award, Building, Mail, Phone, MapPin,
  Calendar, MessageSquare, UserPlus, Briefcase, Globe, ChevronRight, Menu,
  FileSpreadsheet, Zap, Shield, Gauge, X, RefreshCw, Home, Languages
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Enhanced Types
interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  department: string;
  team: string;
  email: string;
  phone: string;
  nationality: string;
  nationalId: string;
  passportNumber?: string;
  birthDate: string;
  hireDate: string;
  contractType: 'permanent' | 'temporary' | 'trainee';
  salary: number;
  allowances: number;
  status: 'active' | 'onLeave' | 'suspended' | 'terminated' | 'probation';
  performance: number;
  skills: string[];
  avatar?: string;
  documents: DocumentInfo[];
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    iban: string;
  };
  lastAttendance: string;
  completedTasks: number;
  ongoingTasks: number;
}

interface DocumentInfo {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  url: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  assignedTeam: string;
  priority: 'high' | 'medium' | 'low';
  status: 'new' | 'inProgress' | 'completed' | 'overdue';
  dueDate: string;
  startDate: string;
  progress: number;
  createdBy: string;
  createdAt: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: DocumentInfo[];
}

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  terminatedEmployees: number;
  probationEmployees: number;
  newHires: number;
  resignations: number;
  contractsExpiring: number;
  averagePerformance: number;
  departmentDistribution: { name: string; count: number; color: string }[];
  monthlyHiring: { month: string; hires: number; terminations: number }[];
}

const TeamWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // Core State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  
  // Dialog States
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Form States
  const [employeeForm, setEmployeeForm] = useState<Partial<Employee>>({});
  const [taskForm, setTaskForm] = useState<Partial<Task>>({});
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  // Language and Direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  // Initialize Data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEmployees: Employee[] = [
        {
          id: '1',
          employeeNumber: 'BHR-001',
          firstName: 'أحمد',
          lastName: 'محمد العلي',
          fullName: 'أحمد محمد العلي',
          position: 'مدير تطوير البرمجيات',
          department: 'تقنية المعلومات',
          team: 'فريق التطوير',
          email: 'ahmed.ali@boudhr.com',
          phone: '+966501234567',
          nationality: 'سعودي',
          nationalId: '1234567890',
          birthDate: '1990-05-15',
          hireDate: '2023-01-15',
          contractType: 'permanent',
          salary: 18000,
          allowances: 2000,
          status: 'active',
          performance: 95,
          skills: ['React', 'Node.js', 'TypeScript', 'Leadership'],
          documents: [
            { id: '1', name: 'السيرة الذاتية', type: 'pdf', uploadDate: '2023-01-10', url: '#' },
            { id: '2', name: 'عقد العمل', type: 'pdf', uploadDate: '2023-01-15', url: '#' }
          ],
          address: 'الرياض، المملكة العربية السعودية',
          emergencyContact: {
            name: 'محمد العلي',
            relationship: 'والد',
            phone: '+966501234568'
          },
          bankDetails: {
            bankName: 'البنك الأهلي السعودي',
            accountNumber: '123456789',
            iban: 'SA1234567891234567890'
          },
          lastAttendance: '2024-01-20 08:15',
          completedTasks: 45,
          ongoingTasks: 8
        },
        {
          id: '2',
          employeeNumber: 'BHR-002',
          firstName: 'فاطمة',
          lastName: 'أحمد محمود',
          fullName: 'فاطمة أحمد محمود',
          position: 'مديرة التسويق الرقمي',
          department: 'التسويق',
          team: 'فريق التسويق الرقمي',
          email: 'fatima.ahmed@boudhr.com',
          phone: '+966507654321',
          nationality: 'سعودية',
          nationalId: '0987654321',
          birthDate: '1988-08-22',
          hireDate: '2022-08-20',
          contractType: 'permanent',
          salary: 16500,
          allowances: 1500,
          status: 'active',
          performance: 92,
          skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
          documents: [
            { id: '3', name: 'السيرة الذاتية', type: 'pdf', uploadDate: '2022-08-15', url: '#' },
            { id: '4', name: 'الشهادات', type: 'pdf', uploadDate: '2022-08-20', url: '#' }
          ],
          address: 'جدة، المملكة العربية السعودية',
          emergencyContact: {
            name: 'أحمد محمود',
            relationship: 'زوج',
            phone: '+966507654322'
          },
          bankDetails: {
            bankName: 'بنك الراجحي',
            accountNumber: '987654321',
            iban: 'SA0987654321098765432'
          },
          lastAttendance: '2024-01-20 08:00',
          completedTasks: 62,
          ongoingTasks: 12
        }
      ];

      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'تطوير نظام إدارة الموظفين',
          description: 'تطوير نظام شامل لإدارة الموظفين مع واجهات حديثة',
          assignedTo: ['1'],
          assignedTeam: 'فريق التطوير',
          priority: 'high',
          status: 'inProgress',
          dueDate: '2024-03-15',
          startDate: '2024-01-05',
          progress: 65,
          createdBy: '1',
          createdAt: '2024-01-05',
          estimatedHours: 120,
          actualHours: 78,
          tags: ['تطوير', 'نظام', 'موارد بشرية'],
          attachments: []
        },
        {
          id: '2',
          title: 'حملة التسويق الرقمي',
          description: 'إطلاق حملة تسويقية جديدة لمنتجات الشركة',
          assignedTo: ['2'],
          assignedTeam: 'فريق التسويق الرقمي',
          priority: 'high',
          status: 'inProgress',
          dueDate: '2024-02-28',
          startDate: '2024-01-10',
          progress: 45,
          createdBy: '2',
          createdAt: '2024-01-10',
          estimatedHours: 80,
          actualHours: 36,
          tags: ['تسويق', 'رقمي', 'حملة'],
          attachments: []
        }
      ];

      setEmployees(mockEmployees);
      setTasks(mockTasks);
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في تحميل البيانات' : 'Error loading data');
    } finally {
      setIsLoading(false);
    }
  }, [isRTL]);

  // Calculate Dashboard Statistics
  const dashboardStats: DashboardStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === 'active').length,
    terminatedEmployees: employees.filter(emp => emp.status === 'terminated').length,
    probationEmployees: employees.filter(emp => emp.status === 'probation').length,
    newHires: employees.filter(emp => {
      const hireDate = new Date(emp.hireDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return hireDate >= thirtyDaysAgo;
    }).length,
    resignations: 2,
    contractsExpiring: 3,
    averagePerformance: employees.length > 0 ? 
      Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length) : 0,
    departmentDistribution: [
      { name: 'تقنية المعلومات', count: 12, color: 'hsl(var(--primary))' },
      { name: 'التسويق', count: 8, color: 'hsl(var(--secondary))' },
      { name: 'الموارد البشرية', count: 6, color: 'hsl(var(--accent))' },
      { name: 'المالية', count: 4, color: 'hsl(var(--muted))' }
    ],
    monthlyHiring: [
      { month: 'يناير', hires: 5, terminations: 1 },
      { month: 'فبراير', hires: 3, terminations: 2 },
      { month: 'مارس', hires: 7, terminations: 0 },
      { month: 'أبريل', hires: 4, terminations: 1 }
    ]
  };

  // CRUD Operations
  const handleAddEmployee = useCallback(async () => {
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.employeeNumber) {
      toast.error(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        employeeNumber: employeeForm.employeeNumber!,
        firstName: employeeForm.firstName!,
        lastName: employeeForm.lastName!,
        fullName: `${employeeForm.firstName} ${employeeForm.lastName}`,
        position: employeeForm.position || '',
        department: employeeForm.department || '',
        team: employeeForm.team || '',
        email: employeeForm.email!,
        phone: employeeForm.phone || '',
        nationality: employeeForm.nationality || '',
        nationalId: employeeForm.nationalId || '',
        passportNumber: employeeForm.passportNumber,
        birthDate: employeeForm.birthDate || '',
        hireDate: employeeForm.hireDate || new Date().toISOString().split('T')[0],
        contractType: employeeForm.contractType || 'permanent',
        salary: employeeForm.salary || 0,
        allowances: employeeForm.allowances || 0,
        status: 'active',
        performance: 0,
        skills: employeeForm.skills || [],
        avatar: employeeForm.avatar,
        documents: [],
        address: employeeForm.address || '',
        emergencyContact: employeeForm.emergencyContact || { name: '', relationship: '', phone: '' },
        bankDetails: employeeForm.bankDetails || { bankName: '', accountNumber: '', iban: '' },
        lastAttendance: '',
        completedTasks: 0,
        ongoingTasks: 0
      };

      setEmployees(prev => [...prev, newEmployee]);
      setEmployeeForm({});
      setIsAddEmployeeOpen(false);
      toast.success(isRTL ? 'تم إضافة الموظف بنجاح' : 'Employee added successfully');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في إضافة الموظف' : 'Error adding employee');
    } finally {
      setIsLoading(false);
    }
  }, [employeeForm, isRTL]);

  const handleEditEmployee = useCallback(async () => {
    if (!selectedEmployee || !employeeForm.firstName || !employeeForm.lastName) {
      toast.error(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id 
          ? { ...emp, ...employeeForm, fullName: `${employeeForm.firstName} ${employeeForm.lastName}` }
          : emp
      ));
      setIsEditEmployeeOpen(false);
      setSelectedEmployee(null);
      setEmployeeForm({});
      toast.success(isRTL ? 'تم تحديث بيانات الموظف بنجاح' : 'Employee updated successfully');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في تحديث الموظف' : 'Error updating employee');
    } finally {
      setIsLoading(false);
    }
  }, [selectedEmployee, employeeForm, isRTL]);

  const handleDeleteEmployee = useCallback(async (employeeId: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذا الموظف؟' : 'Are you sure you want to delete this employee?')) {
      return;
    }

    setIsLoading(true);
    try {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      toast.success(isRTL ? 'تم حذف الموظف بنجاح' : 'Employee deleted successfully');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في حذف الموظف' : 'Error deleting employee');
    } finally {
      setIsLoading(false);
    }
  }, [isRTL]);

  const handleAddTask = useCallback(async () => {
    if (!taskForm.title || !taskForm.assignedTo?.length || !taskForm.dueDate) {
      toast.error(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskForm.title!,
        description: taskForm.description || '',
        assignedTo: taskForm.assignedTo!,
        assignedTeam: taskForm.assignedTeam || '',
        priority: taskForm.priority || 'medium',
        status: 'new',
        dueDate: taskForm.dueDate!,
        startDate: taskForm.startDate || new Date().toISOString().split('T')[0],
        progress: 0,
        createdBy: '1', // Current user
        createdAt: new Date().toISOString(),
        estimatedHours: taskForm.estimatedHours || 0,
        actualHours: 0,
        tags: taskForm.tags || [],
        attachments: []
      };

      setTasks(prev => [...prev, newTask]);
      setTaskForm({});
      setIsAddTaskOpen(false);
      toast.success(isRTL ? 'تم إضافة المهمة بنجاح' : 'Task added successfully');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في إضافة المهمة' : 'Error adding task');
    } finally {
      setIsLoading(false);
    }
  }, [taskForm, isRTL]);

  // Filter Functions
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || employee.position === positionFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesPosition;
  });

  // Export Functions
  const exportToExcel = useCallback((data: Employee[]) => {
    toast.success(isRTL ? 'جاري تصدير البيانات إلى Excel...' : 'Exporting to Excel...');
  }, [isRTL]);

  const exportToPDF = useCallback((data: Employee[]) => {
    toast.success(isRTL ? 'جاري تصدير البيانات إلى PDF...' : 'Exporting to PDF...');
  }, [isRTL]);

  const printData = useCallback(() => {
    window.print();
  }, []);

  // Render Dashboard Tab
  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-scale transition-all duration-300 border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isRTL ? 'إجمالي الموظفين' : 'Total Employees'}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardStats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? '+2 هذا الشهر' : '+2 this month'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isRTL ? 'الموظفون النشطون' : 'Active Employees'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{dashboardStats.activeEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? `${((dashboardStats.activeEmployees / dashboardStats.totalEmployees) * 100).toFixed(1)}% من الإجمالي` : 
               `${((dashboardStats.activeEmployees / dashboardStats.totalEmployees) * 100).toFixed(1)}% of total`}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isRTL ? 'قيد التجربة' : 'On Probation'}
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{dashboardStats.probationEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'موظفين جدد' : 'new hires'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isRTL ? 'متوسط الأداء' : 'Avg Performance'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardStats.averagePerformance}%</div>
            <Progress value={dashboardStats.averagePerformance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              {isRTL ? 'توزيع الموظفين حسب القسم' : 'Employee Distribution by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.departmentDistribution.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-sm font-medium">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{dept.count}</span>
                    <div className="w-16 bg-secondary rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(dept.count / dashboardStats.totalEmployees) * 100}%`,
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

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {isRTL ? 'التوظيف الشهري' : 'Monthly Hiring'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.monthlyHiring.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month}</span>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span className="text-emerald-600">
                        {isRTL ? `${month.hires} توظيف` : `${month.hires} hires`}
                      </span>
                      <span className="text-red-600">
                        {isRTL ? `${month.terminations} إنهاء` : `${month.terminations} terminations`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div 
                      className="bg-emerald-500 rounded-sm transition-all duration-300"
                      style={{ width: `${(month.hires / 10) * 100}%` }}
                    />
                    <div 
                      className="bg-red-500 rounded-sm transition-all duration-300"
                      style={{ width: `${(month.terminations / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => setIsAddEmployeeOpen(true)}
              className="h-12 bg-gradient-to-r from-primary to-primary/80"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {isRTL ? 'إضافة موظف' : 'Add Employee'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAddTaskOpen(true)}
              className="h-12"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إضافة مهمة' : 'Add Task'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportToExcel(employees)}
              className="h-12"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {isRTL ? 'تصدير Excel' : 'Export Excel'}
            </Button>
            <Button 
              variant="outline" 
              onClick={printData}
              className="h-12"
            >
              <Printer className="h-4 w-4 mr-2" />
              {isRTL ? 'طباعة التقرير' : 'Print Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Employee Management Tab
  const renderEmployeeManagement = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border">
        <div className="flex flex-1 gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? 'البحث في الموظفين...' : 'Search employees...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={isRTL ? 'القسم' : 'Department'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
              <SelectItem value="تقنية المعلومات">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
              <SelectItem value="التسويق">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
              <SelectItem value="الموارد البشرية">{isRTL ? 'الموارد البشرية' : 'HR'}</SelectItem>
              <SelectItem value="المالية">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={isRTL ? 'الحالة' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
              <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
              <SelectItem value="onLeave">{isRTL ? 'في إجازة' : 'On Leave'}</SelectItem>
              <SelectItem value="probation">{isRTL ? 'قيد التجربة' : 'Probation'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setIsAddEmployeeOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            {isRTL ? 'إضافة موظف' : 'Add Employee'}
          </Button>
          <Button variant="outline" onClick={() => exportToExcel(filteredEmployees)}>
            <Download className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Employees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isRTL ? 'الموظف' : 'Employee'}</TableHead>
                <TableHead>{isRTL ? 'المنصب' : 'Position'}</TableHead>
                <TableHead>{isRTL ? 'القسم' : 'Department'}</TableHead>
                <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{isRTL ? 'الأداء' : 'Performance'}</TableHead>
                <TableHead>{isRTL ? 'آخر حضور' : 'Last Attendance'}</TableHead>
                <TableHead className="text-center">{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.firstName[0]}{employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.fullName}</div>
                        <div className="text-sm text-muted-foreground">{employee.employeeNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === 'active' ? 'default' : 
                              employee.status === 'probation' ? 'secondary' : 'outline'}
                      className={cn(
                        employee.status === 'active' && 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
                        employee.status === 'probation' && 'bg-amber-500/10 text-amber-700 border-amber-200',
                        employee.status === 'onLeave' && 'bg-blue-500/10 text-blue-700 border-blue-200'
                      )}
                    >
                      {isRTL ? 
                        (employee.status === 'active' ? 'نشط' : 
                         employee.status === 'probation' ? 'قيد التجربة' : 
                         employee.status === 'onLeave' ? 'في إجازة' : employee.status) :
                        employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={employee.performance} className="flex-1 h-2" />
                      <span className="text-sm font-medium w-10">{employee.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {employee.lastAttendance || isRTL ? 'لا يوجد' : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsViewEmployeeOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setEmployeeForm(employee);
                          setIsEditEmployeeOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {isRTL ? 'لا توجد نتائج' : 'No results found'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL ? 'لم يتم العثور على موظفين يطابقون معايير البحث' : 'No employees match your search criteria'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Render Tasks Tab
  const renderTasks = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{isRTL ? 'إدارة المهام' : 'Task Management'}</h3>
        <Button onClick={() => setIsAddTaskOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'إضافة مهمة' : 'Add Task'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover-scale transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge 
                  variant={task.priority === 'high' ? 'destructive' : 
                          task.priority === 'medium' ? 'default' : 'secondary'}
                >
                  {isRTL ? 
                    (task.priority === 'high' ? 'عالية' : 
                     task.priority === 'medium' ? 'متوسطة' : 'منخفضة') :
                    task.priority}
                </Badge>
                <Badge 
                  variant="outline"
                  className={cn(
                    task.status === 'completed' && 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
                    task.status === 'inProgress' && 'bg-blue-500/10 text-blue-700 border-blue-200',
                    task.status === 'new' && 'bg-gray-500/10 text-gray-700 border-gray-200',
                    task.status === 'overdue' && 'bg-red-500/10 text-red-700 border-red-200'
                  )}
                >
                  {isRTL ? 
                    (task.status === 'completed' ? 'مكتملة' : 
                     task.status === 'inProgress' ? 'قيد التنفيذ' : 
                     task.status === 'new' ? 'جديدة' : 'متأخرة') :
                    task.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{task.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{isRTL ? 'موعد التسليم:' : 'Due:'} {task.dueDate}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {isRTL ? 'مُكلف إلى:' : 'Assigned to:'} {task.assignedTo.length} 
                  {isRTL ? ' أشخاص' : ' people'}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  {isRTL ? 'عرض' : 'View'}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  {isRTL ? 'تعديل' : 'Edit'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {isRTL ? 'لا توجد مهام' : 'No tasks found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isRTL ? 'ابدأ بإضافة مهمة جديدة لفريقك' : 'Start by adding a new task for your team'}
            </p>
            <Button onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إضافة مهمة' : 'Add Task'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Render Reports Tab
  const renderReports = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover-scale transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {isRTL ? 'تقرير الموظفين الشامل' : 'Comprehensive Employee Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isRTL ? 'تفاصيل جميع الموظفين مع البيانات الكاملة' : 'All employee details with complete data'}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => exportToPDF(employees)}>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportToExcel(employees)}>
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {isRTL ? 'تقرير الأداء' : 'Performance Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isRTL ? 'تحليل أداء الموظفين والفرق' : 'Employee and team performance analysis'}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => exportToPDF(employees)}>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="outline" onClick={printData}>
                <Printer className="h-4 w-4 mr-1" />
                {isRTL ? 'طباعة' : 'Print'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isRTL ? 'تقرير المهام' : 'Tasks Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isRTL ? 'حالة المهام والإنجازات' : 'Task status and achievements'}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => exportToPDF(employees)}>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportToExcel(employees)}>
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Settings Tab
  const renderSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {isRTL ? 'إعدادات عامة' : 'General Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">{isRTL ? 'الإشعارات' : 'Notifications'}</Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">{isRTL ? 'الحفظ التلقائي' : 'Auto Save'}</Label>
              <Switch id="auto-save" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">{isRTL ? 'تنبيهات البريد' : 'Email Alerts'}</Label>
              <Switch id="email-alerts" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {isRTL ? 'الصلاحيات' : 'Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="add-employee">{isRTL ? 'إضافة موظفين' : 'Add Employees'}</Label>
              <Switch id="add-employee" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-employee">{isRTL ? 'تعديل بيانات الموظفين' : 'Edit Employee Data'}</Label>
              <Switch id="edit-employee" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="delete-employee">{isRTL ? 'حذف الموظفين' : 'Delete Employees'}</Label>
              <Switch id="delete-employee" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className={cn("min-h-screen bg-background p-6", isRTL && "font-arabic")}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{isRTL ? 'قسم فريق العمل' : 'Team Work Department'}</h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة شاملة للموظفين والفرق والمهام' : 'Comprehensive management of employees, teams, and tasks'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => i18n.changeLanguage(isRTL ? 'en' : 'ar')}>
              <Languages className="h-4 w-4 mr-2" />
              {isRTL ? 'English' : 'العربية'}
            </Button>
            <Button variant="outline" size="sm" onClick={loadInitialData} disabled={isLoading}>
              <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
              {isRTL ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {isRTL ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {isRTL ? 'إدارة الموظفين' : 'Employees'}
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {isRTL ? 'المهام' : 'Tasks'}
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {isRTL ? 'التقارير' : 'Reports'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {isRTL ? 'الإعدادات' : 'Settings'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="employees">{renderEmployeeManagement()}</TabsContent>
          <TabsContent value="tasks">{renderTasks()}</TabsContent>
          <TabsContent value="reports">{renderReports()}</TabsContent>
          <TabsContent value="settings">{renderSettings()}</TabsContent>
        </Tabs>

        {/* Add Employee Dialog */}
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="employeeNumber">{isRTL ? 'رقم الموظف' : 'Employee Number'}</Label>
                  <Input
                    id="employeeNumber"
                    value={employeeForm.employeeNumber || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, employeeNumber: e.target.value }))}
                    placeholder={isRTL ? 'BHR-001' : 'BHR-001'}
                  />
                </div>
                <div>
                  <Label htmlFor="firstName">{isRTL ? 'الاسم الأول' : 'First Name'}</Label>
                  <Input
                    id="firstName"
                    value={employeeForm.firstName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder={isRTL ? 'الاسم الأول' : 'Enter first name'}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{isRTL ? 'اسم العائلة' : 'Last Name'}</Label>
                  <Input
                    id="lastName"
                    value={employeeForm.lastName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder={isRTL ? 'اسم العائلة' : 'Enter last name'}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={employeeForm.email || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={isRTL ? 'employee@boudhr.com' : 'employee@boudhr.com'}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <Input
                    id="phone"
                    value={employeeForm.phone || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder={isRTL ? '+966501234567' : '+966501234567'}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="position">{isRTL ? 'المنصب' : 'Position'}</Label>
                  <Input
                    id="position"
                    value={employeeForm.position || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                    placeholder={isRTL ? 'مطور برمجيات' : 'Software Developer'}
                  />
                </div>
                <div>
                  <Label htmlFor="department">{isRTL ? 'القسم' : 'Department'}</Label>
                  <Select value={employeeForm.department || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر القسم' : 'Select Department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تقنية المعلومات">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="التسويق">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                      <SelectItem value="الموارد البشرية">{isRTL ? 'الموارد البشرية' : 'HR'}</SelectItem>
                      <SelectItem value="المالية">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">{isRTL ? 'الراتب الأساسي' : 'Basic Salary'}</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={employeeForm.salary || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, salary: Number(e.target.value) }))}
                    placeholder={isRTL ? '15000' : '15000'}
                  />
                </div>
                <div>
                  <Label htmlFor="hireDate">{isRTL ? 'تاريخ التوظيف' : 'Hire Date'}</Label>
                  <Input
                    id="hireDate"
                    type="date"
                    value={employeeForm.hireDate || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, hireDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contractType">{isRTL ? 'نوع العقد' : 'Contract Type'}</Label>
                  <Select value={employeeForm.contractType || 'permanent'} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, contractType: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">{isRTL ? 'دائم' : 'Permanent'}</SelectItem>
                      <SelectItem value="temporary">{isRTL ? 'مؤقت' : 'Temporary'}</SelectItem>
                      <SelectItem value="trainee">{isRTL ? 'متدرب' : 'Trainee'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleAddEmployee} disabled={isLoading}>
                {isLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Employee Dialog */}
        <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'تعديل بيانات الموظف' : 'Edit Employee'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editFirstName">{isRTL ? 'الاسم الأول' : 'First Name'}</Label>
                  <Input
                    id="editFirstName"
                    value={employeeForm.firstName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editLastName">{isRTL ? 'اسم العائلة' : 'Last Name'}</Label>
                  <Input
                    id="editLastName"
                    value={employeeForm.lastName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editEmail">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={employeeForm.email || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editPhone">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <Input
                    id="editPhone"
                    value={employeeForm.phone || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editPosition">{isRTL ? 'المنصب' : 'Position'}</Label>
                  <Input
                    id="editPosition"
                    value={employeeForm.position || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editDepartment">{isRTL ? 'القسم' : 'Department'}</Label>
                  <Select value={employeeForm.department || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تقنية المعلومات">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="التسويق">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                      <SelectItem value="الموارد البشرية">{isRTL ? 'الموارد البشرية' : 'HR'}</SelectItem>
                      <SelectItem value="المالية">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editSalary">{isRTL ? 'الراتب الأساسي' : 'Basic Salary'}</Label>
                  <Input
                    id="editSalary"
                    type="number"
                    value={employeeForm.salary || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, salary: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editStatus">{isRTL ? 'الحالة' : 'Status'}</Label>
                  <Select value={employeeForm.status || 'active'} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, status: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                      <SelectItem value="onLeave">{isRTL ? 'في إجازة' : 'On Leave'}</SelectItem>
                      <SelectItem value="suspended">{isRTL ? 'متوقف' : 'Suspended'}</SelectItem>
                      <SelectItem value="probation">{isRTL ? 'قيد التجربة' : 'Probation'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleEditEmployee} disabled={isLoading}>
                {isLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Employee Dialog */}
        <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'تفاصيل الموظف' : 'Employee Details'}</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-6 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedEmployee.avatar} />
                    <AvatarFallback className="text-lg">
                      {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedEmployee.fullName}</h3>
                    <p className="text-muted-foreground">{selectedEmployee.position}</p>
                    <Badge className="mt-1">{selectedEmployee.department}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{isRTL ? 'المعلومات الأساسية' : 'Basic Information'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'رقم الموظف:' : 'Employee ID:'}</span>
                        <span className="font-medium">{selectedEmployee.employeeNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'البريد الإلكتروني:' : 'Email:'}</span>
                        <span className="font-medium">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'الهاتف:' : 'Phone:'}</span>
                        <span className="font-medium">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'تاريخ التوظيف:' : 'Hire Date:'}</span>
                        <span className="font-medium">{selectedEmployee.hireDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'الحالة:' : 'Status:'}</span>
                        <Badge variant={selectedEmployee.status === 'active' ? 'default' : 'secondary'}>
                          {isRTL ? 
                            (selectedEmployee.status === 'active' ? 'نشط' : 
                             selectedEmployee.status === 'probation' ? 'قيد التجربة' : selectedEmployee.status) :
                            selectedEmployee.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{isRTL ? 'الأداء والإحصائيات' : 'Performance & Stats'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'تقييم الأداء:' : 'Performance:'}</span>
                          <span className="font-medium">{selectedEmployee.performance}%</span>
                        </div>
                        <Progress value={selectedEmployee.performance} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'المهام المكتملة:' : 'Completed Tasks:'}</span>
                        <span className="font-medium">{selectedEmployee.completedTasks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'المهام الجارية:' : 'Ongoing Tasks:'}</span>
                        <span className="font-medium">{selectedEmployee.ongoingTasks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{isRTL ? 'الراتب الأساسي:' : 'Basic Salary:'}</span>
                        <span className="font-medium">{selectedEmployee.salary.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedEmployee.skills && selectedEmployee.skills.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{isRTL ? 'المهارات' : 'Skills'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Task Dialog */}
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إضافة مهمة جديدة' : 'Add New Task'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="taskTitle">{isRTL ? 'عنوان المهمة' : 'Task Title'}</Label>
                <Input
                  id="taskTitle"
                  value={taskForm.title || ''}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={isRTL ? 'أدخل عنوان المهمة' : 'Enter task title'}
                />
              </div>
              
              <div>
                <Label htmlFor="taskDescription">{isRTL ? 'وصف المهمة' : 'Task Description'}</Label>
                <Textarea
                  id="taskDescription"
                  value={taskForm.description || ''}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={isRTL ? 'أدخل وصف المهمة' : 'Enter task description'}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taskPriority">{isRTL ? 'الأولوية' : 'Priority'}</Label>
                  <Select value={taskForm.priority || 'medium'} onValueChange={(value) => setTaskForm(prev => ({ ...prev, priority: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">{isRTL ? 'عالية' : 'High'}</SelectItem>
                      <SelectItem value="medium">{isRTL ? 'متوسطة' : 'Medium'}</SelectItem>
                      <SelectItem value="low">{isRTL ? 'منخفضة' : 'Low'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="taskDueDate">{isRTL ? 'موعد التسليم' : 'Due Date'}</Label>
                  <Input
                    id="taskDueDate"
                    type="date"
                    value={taskForm.dueDate || ''}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="taskAssignees">{isRTL ? 'تكليف إلى' : 'Assign To'}</Label>
                <Select onValueChange={(value) => setTaskForm(prev => ({ ...prev, assignedTo: [value] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'اختر الموظف' : 'Select Employee'} />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.fullName} - {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="estimatedHours">{isRTL ? 'الساعات المقدرة' : 'Estimated Hours'}</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={taskForm.estimatedHours || ''}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, estimatedHours: Number(e.target.value) }))}
                  placeholder="40"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleAddTask} disabled={isLoading}>
                {isLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ المهمة' : 'Save Task'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeamWork;