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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
         style={{
           backgroundImage: `url('/src/assets/boud-pattern-bg.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay'
         }}>
      
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">فريق العمل</h1>
                <p className="text-slate-600">إدارة شاملة لجميع أعضاء الفريق</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <Button
                  variant={activeView === 'directory' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('directory')}
                  className="flex items-center gap-2"
                >
                  <List className="h-4 w-4" />
                  الدليل
                </Button>
                <Button
                  variant={activeView === 'manager' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('manager')}
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  لوحة المدير
                </Button>
                <Button
                  variant={activeView === 'org' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('org')}
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  الهيكل التنظيمي
                </Button>
                <Button
                  variant={activeView === 'analytics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView('analytics')}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  التحليلات
                </Button>
              </div>
              
              {/* Add Employee Button */}
              {(userRole === 'hr_admin' || userRole === 'manager') && (
                <Button onClick={handleAddEmployee} className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  إضافة موظف
                </Button>
              )}
              
              {/* Import Button */}
              <Button variant="outline" onClick={handleImportData} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                استيراد
              </Button>
              
              {/* Export Buttons */}
              <Button variant="outline" onClick={() => handleExportData('pdf')} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PDF
              </Button>
              
              <Button variant="outline" onClick={() => handleExportData('excel')} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default TeamMembers;