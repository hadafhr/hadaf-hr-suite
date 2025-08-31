import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  UserPlus, 
  Download, 
  Upload,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Building2,
  Mail,
  Phone,
  Calendar,
  Target,
  Award,
  BookOpen,
  Settings,
  ChevronRight,
  Grid,
  List,
  ArrowLeft,
  MessageSquare,
  Edit,
  Trash2,
  User,
  Users2,
  Shield,
  Crown,
  Briefcase
} from 'lucide-react';

// Import employee avatar images
import ahmedAvatar from '@/assets/employee-avatars/ahmed-mohamed.jpg';
import fatimaAvatar from '@/assets/employee-avatars/fatima-abdullah.jpg';
import mohamedAvatar from '@/assets/employee-avatars/mohamed-khalidi.jpg';
import saraAvatar from '@/assets/employee-avatars/sara-mutairi.jpg';
import noraAvatar from '@/assets/employee-avatars/nora-salem.jpg';

import EmployeeDirectory from './team/EmployeeDirectory';
import EmployeeProfile from './team/EmployeeProfile';
import ManagerDashboard from './team/ManagerDashboard';
import OrganizationalChart from './team/OrganizationalChart';
import TeamAnalytics from './team/TeamAnalytics';

interface Employee {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  yearsInCompany: number;
  profilePicture?: string;
  performanceScore: number;
  attendanceRate: number;
  tasks: number;
  completedTasks: number;
  salary: number;
  leaveBalance: number;
  role: 'employee' | 'manager' | 'hr_admin';
  skills: string[];
  certifications: string[];
  riskScore?: number;
  burnoutRisk?: 'low' | 'medium' | 'high';
}

const TeamMembers = () => {
  const [activeView, setActiveView] = useState<'directory' | 'profile' | 'manager' | 'org' | 'analytics'>('directory');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'employee' | 'manager' | 'hr_admin'>('hr_admin');
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

// Enhanced sample data with full CRUD and export functionality
  useEffect(() => {
    const sampleEmployees: Employee[] = [
      {
        id: '1',
        name: 'أحمد محمد السعيد',
        nameAr: 'أحمد محمد السعيد',
        email: 'ahmed.mohamed@company.com',
        phone: '+966501234567',
        position: 'مطور برامج أول',
        department: 'تقنية المعلومات',
        manager: 'محمد أحمد الخالدي',
        status: 'active',
        joinDate: '2022-01-15',
        yearsInCompany: 2,
        profilePicture: ahmedAvatar,
        performanceScore: 88,
        attendanceRate: 95,
        tasks: 15,
        completedTasks: 12,
        salary: 12000,
        leaveBalance: 18,
        role: 'employee',
        skills: ['React', 'TypeScript', 'Node.js', 'Python'],
        certifications: ['AWS Certified', 'React Professional'],
        riskScore: 15,
        burnoutRisk: 'low'
      },
      {
        id: '2',
        name: 'فاطمة عبدالله النور',
        nameAr: 'فاطمة عبدالله النور',
        email: 'fatima.abdullah@company.com',
        phone: '+966502345678',
        position: 'محاسبة رئيسية',
        department: 'المالية',
        manager: 'عبدالرحمن محمد الأحمد',
        status: 'active',
        joinDate: '2021-03-10',
        yearsInCompany: 3,
        profilePicture: fatimaAvatar,
        performanceScore: 92,
        attendanceRate: 98,
        tasks: 8,
        completedTasks: 8,
        salary: 10000,
        leaveBalance: 22,
        role: 'employee',
        skills: ['Excel Advanced', 'SAP', 'Financial Analysis'],
        certifications: ['CPA', 'Financial Modeling'],
        riskScore: 8,
        burnoutRisk: 'low'
      },
      {
        id: '3',
        name: 'محمد أحمد الخالدي',
        nameAr: 'محمد أحمد الخالدي',
        email: 'mohamed.khalidi@company.com',
        phone: '+966503456789',
        position: 'مدير تقنية المعلومات',
        department: 'تقنية المعلومات',
        manager: 'الإدارة العليا',
        status: 'active',
        joinDate: '2019-06-01',
        yearsInCompany: 5,
        profilePicture: mohamedAvatar,
        performanceScore: 95,
        attendanceRate: 97,
        tasks: 25,
        completedTasks: 23,
        salary: 18000,
        leaveBalance: 15,
        role: 'manager',
        skills: ['Leadership', 'Project Management', 'Cloud Architecture'],
        certifications: ['PMP', 'AWS Solutions Architect'],
        riskScore: 5,
        burnoutRisk: 'low'
      },
      {
        id: '4',
        name: 'سارة خالد المطيري',
        nameAr: 'سارة خالد المطيري',
        email: 'sara.mutairi@company.com',
        phone: '+966504567890',
        position: 'أخصائية موارد بشرية',
        department: 'الموارد البشرية',
        manager: 'نورا أحمد السالم',
        status: 'on_leave',
        joinDate: '2020-09-15',
        yearsInCompany: 4,
        profilePicture: saraAvatar,
        performanceScore: 85,
        attendanceRate: 92,
        tasks: 12,
        completedTasks: 10,
        salary: 9000,
        leaveBalance: 5,
        role: 'employee',
        skills: ['HR Management', 'Recruitment', 'Training & Development'],
        certifications: ['SHRM-CP', 'Talent Acquisition'],
        riskScore: 25,
        burnoutRisk: 'medium'
      },
      {
        id: '5',
        name: 'نورا أحمد السالم',
        nameAr: 'نورا أحمد السالم',
        email: 'nora.salem@company.com',
        phone: '+966505678901',
        position: 'مديرة الموارد البشرية',
        department: 'الموارد البشرية',
        manager: 'الإدارة العليا',
        status: 'active',
        joinDate: '2018-02-01',
        yearsInCompany: 6,
        profilePicture: noraAvatar,
        performanceScore: 97,
        attendanceRate: 99,
        tasks: 20,
        completedTasks: 19,
        salary: 20000,
        leaveBalance: 25,
        role: 'hr_admin',
        skills: ['Strategic HR', 'Leadership', 'Change Management'],
        certifications: ['MBA HR', 'Change Management Professional'],
        riskScore: 3,
        burnoutRisk: 'low'
      }
    ];

    setEmployees(sampleEmployees);
    setCurrentUser(sampleEmployees[4]); // HR Admin
    setLoading(false);
  }, []);

  // Enhanced functionality
  const handleAddEmployee = () => {
    console.log('Navigating to add employee page...');
    // التوجه إلى صفحة إضافة موظف جديد
    window.location.href = '/add-employee';
  };

  const handleEditEmployee = (employee: Employee) => {
    console.log('Editing employee:', employee.id);
    alert(`فتح نموذج تعديل للموظف: ${employee.name}`);
    // في التطبيق الحقيقي سيتم فتح نموذج تعديل الموظف
  };

  const handleChatWithEmployee = (employee: Employee) => {
    console.log('Starting chat with employee:', employee.id);
    alert(`بدء محادثة مع الموظف: ${employee.name}`);
    // في التطبيق الحقيقي سيتم فتح نافذة المحادثة
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      console.log('Employee deleted:', employeeId);
    }
  };

  const handleExportData = async (format: 'pdf' | 'excel') => {
    console.log(`Starting export for format: ${format}`);
    
    try {
      if (format === 'pdf') {
        console.log('Importing jsPDF...');
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        // إضافة العنوان
        doc.setFontSize(16);
        doc.text('Team Members Report', 20, 30);
        
        // إضافة تاريخ التقرير
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleDateString('ar-SA')}`, 20, 45);
        
        let yPosition = 65;
        
        // إضافة بيانات الموظفين
        filteredEmployees.forEach((employee, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 30;
          }
          
          doc.setFontSize(14);
          doc.text(`${index + 1}. ${employee.name}`, 20, yPosition);
          doc.setFontSize(10);
          doc.text(`Department: ${employee.department}`, 30, yPosition + 10);
          doc.text(`Position: ${employee.position}`, 30, yPosition + 20);
          doc.text(`Email: ${employee.email}`, 30, yPosition + 30);
          doc.text(`Phone: ${employee.phone}`, 30, yPosition + 40);
          doc.text(`Status: ${employee.status}`, 30, yPosition + 50);
          
          yPosition += 70;
        });
        
        console.log('Saving PDF...');
        // حفظ الملف
        doc.save('team-members-report.pdf');
        
      } else if (format === 'excel') {
        console.log('Creating CSV data...');
        // تصدير Excel كـ CSV
        const csvContent = [
          ['Name', 'Department', 'Position', 'Email', 'Phone', 'Status'].join(','),
          ...filteredEmployees.map(emp => 
            [
              `"${emp.name}"`,
              `"${emp.department}"`, 
              `"${emp.position}"`,
              `"${emp.email}"`,
              `"${emp.phone}"`,
              `"${emp.status}"`
            ].join(',')
          )
        ].join('\n');
        
        console.log('Creating blob and download link...');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'team-members-report.csv';
        link.style.display = 'none';
        
        // إضافة الرابط للـ DOM وتفعيل التحميل
        document.body.appendChild(link);
        link.click();
        
        // تنظيف الرابط
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      }
      
      console.log(`Export successful for ${format}`);
      alert(`تم تصدير البيانات بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'} بنجاح`);
    } catch (error) {
      console.error('Export error:', error);
      alert('حدث خطأ أثناء تصدير البيانات: ' + error.message);
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing file:', file.name);
        alert(`جاري استيراد الملف: ${file.name}`);
      }
    };
    input.click();
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];
  const statuses = [
    { value: 'active', label: 'نشط' },
    { value: 'on_leave', label: 'في إجازة' },
    { value: 'terminated', label: 'منتهي الخدمة' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">نشط</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">في إجازة</Badge>;
      case 'terminated':
        return <Badge className="bg-red-100 text-red-800 border-red-200">منتهي الخدمة</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getBurnoutRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleViewProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveView('profile');
  };

  const exportData = (format: 'pdf' | 'excel') => {
    handleExportData(format);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mb-4"></div>
          <p className="text-lg font-medium">جاري تحميل بيانات فريق العمل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
         style={{
           backgroundImage: `url('/src/assets/boud-pattern-bg.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay'
         }}>
      
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl mx-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                رجوع
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                <Search className="h-4 w-4 ml-2" />
                البحث المتقدم
              </Button>
              <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                <UserPlus className="h-4 w-4 ml-2" />
                إضافة موظف جديد
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Users className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              نظام إدارة فريق العمل المتطور
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              منظومة ذكية شاملة لإدارة جميع أعضاء الفريق مع أدوات التحليل المتقدمة والتقارير التفصيلية
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة فريق العمل</h3>
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الموظفين</span>
                      <span className="font-bold text-primary">{employees.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الموظفين النشطين</span>
                      <span className="font-bold text-green-600">{employees.filter(emp => emp.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط الأداء</span>
                      <span className="font-bold text-blue-600">{Math.round(employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / employees.length)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">التحليلات المتقدمة</h3>
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الحضور</span>
                      <span className="font-bold text-green-600">{Math.round(employees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / employees.length)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">المهام المكتملة</span>
                      <span className="font-bold text-blue-600">{employees.reduce((sum, emp) => sum + emp.completedTasks, 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الرضا</span>
                      <span className="font-bold text-purple-600">8.7/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الفريق</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
                    <div className="text-sm text-gray-600">إجمالي الأعضاء</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{[...new Set(employees.map(emp => emp.department))].length}</div>
                    <div className="text-sm text-gray-600">الأقسام</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{employees.filter(emp => emp.role === 'manager').length}</div>
                    <div className="text-sm text-gray-600">المدراء</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة إدارة فريق العمل المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Users, label: "دليل الموظفين", color: "text-blue-600", count: employees.length },
                { icon: Building2, label: "الهيكل التنظيمي", color: "text-green-600", count: [...new Set(employees.map(emp => emp.department))].length },
                { icon: BarChart3, label: "لوحة المدير", color: "text-purple-600", count: employees.filter(emp => emp.role === 'manager').length },
                { icon: TrendingUp, label: "التحليلات", color: "text-orange-600", count: 0 },
                { icon: UserPlus, label: "التوظيف", color: "text-teal-600", count: 0 },
                { icon: Settings, label: "الإعدادات", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{Math.round(employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / employees.length)}%</div>
                <div className="text-sm text-gray-600">متوسط الأداء العام</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round(employees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / employees.length)}%</div>
                <div className="text-sm text-gray-600">معدل الحضور</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round(employees.reduce((sum, emp) => sum + emp.yearsInCompany, 0) / employees.length)}</div>
                <div className="text-sm text-gray-600">متوسط الخبرة (سنوات)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Navigation Tabs */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button
                variant={activeView === 'directory' ? 'default' : 'outline'}
                onClick={() => setActiveView('directory')}
                className={activeView === 'directory' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <List className="h-4 w-4 ml-2" />
                دليل الموظفين
              </Button>
              <Button
                variant={activeView === 'manager' ? 'default' : 'outline'}
                onClick={() => setActiveView('manager')}
                className={activeView === 'manager' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <BarChart3 className="h-4 w-4 ml-2" />
                لوحة المدير
              </Button>
              <Button
                variant={activeView === 'org' ? 'default' : 'outline'}
                onClick={() => setActiveView('org')}
                className={activeView === 'org' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <Building2 className="h-4 w-4 ml-2" />
                الهيكل التنظيمي
              </Button>
              <Button
                variant={activeView === 'analytics' ? 'default' : 'outline'}
                onClick={() => setActiveView('analytics')}
                className={activeView === 'analytics' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <TrendingUp className="h-4 w-4 ml-2" />
                التحليلات
              </Button>
              <div className="mr-auto flex gap-2">
                {/* Import Button */}
                <Button variant="outline" onClick={handleImportData} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  استيراد
                </Button>
                
                {/* Export Buttons */}
                <Button variant="outline" onClick={() => exportData('pdf')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => exportData('excel')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          {activeView === 'directory' && (
            <EmployeeDirectory 
              employees={filteredEmployees}
              onViewProfile={handleViewProfile}
              onChatWithEmployee={handleChatWithEmployee}
              onEditEmployee={handleEditEmployee}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterDepartment={filterDepartment}
              setFilterDepartment={setFilterDepartment}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              viewMode={viewMode}
              setViewMode={setViewMode}
              departments={departments}
              statuses={statuses}
              getStatusBadge={getStatusBadge}
              getBurnoutRiskColor={getBurnoutRiskColor}
              userRole={userRole}
            />
          )}
          
          {activeView === 'profile' && selectedEmployee && (
            <EmployeeProfile 
              employee={selectedEmployee}
              onBack={() => setActiveView('directory')}
              userRole={userRole}
              currentUser={currentUser}
            />
          )}
          
          {activeView === 'manager' && (
            <ManagerDashboard 
              employees={employees}
              currentUser={currentUser}
              onViewProfile={handleViewProfile}
            />
          )}
          
          {activeView === 'org' && (
            <OrganizationalChart 
              employees={employees}
              onViewProfile={handleViewProfile}
            />
          )}
          
          {activeView === 'analytics' && (
            <TeamAnalytics 
              employees={employees}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;