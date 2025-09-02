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
  FileSpreadsheet, Zap, Shield, Gauge, X, RefreshCw, Home, Languages,
  Heart, CreditCard, Clipboard, Database, UserCog, Bell, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// ================================
// INTERFACES & TYPES
// ================================

interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameArabic?: string;
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
  contractStartDate: string;
  contractEndDate?: string;
  contractType: 'permanent' | 'temporary' | 'trainee';
  maritalStatus?: string;
  salary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowances: number;
  totalSalary: number;
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
    email?: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    iban: string;
    branch?: string;
  };
  healthInfo: {
    insuranceNumber?: string;
    insuranceProvider?: string;
    medicalConditions?: string[];
    bloodType?: string;
  };
  manager?: string;
  directReports?: string[];
  lastAttendance: string;
  completedTasks: number;
  ongoingTasks: number;
  annualLeaveBalance: number;
  sickLeaveBalance: number;
  emergencyLeaveBalance: number;
  createdAt: string;
  updatedAt: string;
}

interface DocumentInfo {
  id: string;
  name: string;
  type: string;
  category: 'cv' | 'contract' | 'id' | 'passport' | 'certificates' | 'medical' | 'other';
  uploadDate: string;
  url: string;
  size?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  assignedTeam: string;
  priority: 'high' | 'medium' | 'low';
  status: 'new' | 'inProgress' | 'completed' | 'overdue' | 'cancelled';
  dueDate: string;
  startDate: string;
  progress: number;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: DocumentInfo[];
  comments: TaskComment[];
}

interface TaskComment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
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
  recentActivities: ActivityLog[];
  upcomingEvents: UpcomingEvent[];
}

interface ActivityLog {
  id: string;
  type: 'hire' | 'termination' | 'promotion' | 'transfer' | 'performance_review';
  description: string;
  employeeId: string;
  employeeName: string;
  timestamp: string;
}

interface UpcomingEvent {
  id: string;
  type: 'contract_expiry' | 'probation_end' | 'performance_review' | 'birthday' | 'anniversary';
  title: string;
  employeeId: string;
  employeeName: string;
  date: string;
  daysRemaining: number;
}

// ================================
// MAIN COMPONENT
// ================================

const TeamWork: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // ================================
  // STATE MANAGEMENT
  // ================================
  
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
  const [contractFilter, setContractFilter] = useState('all');
  
  // Dialog States
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Form States
  const [employeeForm, setEmployeeForm] = useState<Partial<Employee>>({});
  const [taskForm, setTaskForm] = useState<Partial<Task>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // View States
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  
  // Settings State
  const [systemSettings, setSystemSettings] = useState({
    allowBulkOperations: true,
    requireManagerApproval: true,
    autoBackup: true,
    emailNotifications: true,
    mobileNotifications: true,
    advancedReporting: true,
  });

  // ================================
  // LIFECYCLE & EFFECTS
  // ================================

  // Language and Direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  // Initialize Data
  useEffect(() => {
    loadInitialData();
  }, []);

  // ================================
  // DATA LOADING & MANAGEMENT
  // ================================

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockEmployees: Employee[] = [
        {
          id: '1',
          employeeNumber: 'BHR-001',
          firstName: 'أحمد',
          lastName: 'محمد العلي',
          fullName: 'أحمد محمد العلي',
          fullNameArabic: 'أحمد محمد العلي',
          position: 'مدير تطوير البرمجيات',
          department: 'تقنية المعلومات',
          team: 'فريق التطوير الأساسي',
          email: 'ahmed.ali@boudhr.com',
          phone: '+966501234567',
          nationality: 'سعودي',
          nationalId: '1234567890',
          birthDate: '1990-05-15',
          hireDate: '2023-01-15',
          contractStartDate: '2023-01-15',
          contractEndDate: '2026-01-15',
          contractType: 'permanent',
          salary: 18000,
          housingAllowance: 3000,
          transportAllowance: 800,
          otherAllowances: 1200,
          totalSalary: 23000,
          status: 'active',
          performance: 95,
          skills: ['React', 'Node.js', 'TypeScript', 'Leadership', 'Project Management'],
          documents: [
            { id: '1', name: 'السيرة الذاتية', type: 'pdf', category: 'cv', uploadDate: '2023-01-10', url: '#', size: '2.3 MB' },
            { id: '2', name: 'عقد العمل', type: 'pdf', category: 'contract', uploadDate: '2023-01-15', url: '#', size: '1.8 MB' },
            { id: '3', name: 'صورة بطاقة الهوية', type: 'pdf', category: 'id', uploadDate: '2023-01-12', url: '#', size: '0.9 MB' }
          ],
          address: 'الرياض، المملكة العربية السعودية - حي النرجس',
          emergencyContact: {
            name: 'محمد العلي',
            relationship: 'والد',
            phone: '+966501234568',
            email: 'mohammed.ali@gmail.com'
          },
          bankDetails: {
            bankName: 'البنك الأهلي السعودي',
            accountNumber: '123456789',
            iban: 'SA1234567891234567890',
            branch: 'فرع الرياض الرئيسي'
          },
          healthInfo: {
            insuranceNumber: 'INS-123456',
            insuranceProvider: 'شركة التأمين الطبي',
            medicalConditions: [],
            bloodType: 'O+'
          },
          lastAttendance: '2024-01-20 08:15',
          completedTasks: 45,
          ongoingTasks: 8,
          annualLeaveBalance: 25,
          sickLeaveBalance: 30,
          emergencyLeaveBalance: 5,
          createdAt: '2023-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          employeeNumber: 'BHR-002',
          firstName: 'فاطمة',
          lastName: 'أحمد محمود',
          fullName: 'فاطمة أحمد محمود',
          fullNameArabic: 'فاطمة أحمد محمود',
          position: 'مديرة التسويق الرقمي',
          department: 'التسويق',
          team: 'فريق التسويق الرقمي',
          email: 'fatima.ahmed@boudhr.com',
          phone: '+966507654321',
          nationality: 'سعودية',
          nationalId: '0987654321',
          birthDate: '1988-08-22',
          hireDate: '2022-08-20',
          contractStartDate: '2022-08-20',
          contractEndDate: '2025-08-20',
          contractType: 'permanent',
          salary: 16500,
          housingAllowance: 2500,
          transportAllowance: 600,
          otherAllowances: 900,
          totalSalary: 20500,
          status: 'active',
          performance: 92,
          skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy', 'Social Media'],
          documents: [
            { id: '4', name: 'السيرة الذاتية', type: 'pdf', category: 'cv', uploadDate: '2022-08-15', url: '#', size: '1.9 MB' },
            { id: '5', name: 'الشهادات الأكاديمية', type: 'pdf', category: 'certificates', uploadDate: '2022-08-20', url: '#', size: '3.2 MB' }
          ],
          address: 'جدة، المملكة العربية السعودية - حي الروضة',
          emergencyContact: {
            name: 'أحمد محمود',
            relationship: 'زوج',
            phone: '+966507654322',
            email: 'ahmed.mahmoud@gmail.com'
          },
          bankDetails: {
            bankName: 'بنك الراجحي',
            accountNumber: '987654321',
            iban: 'SA0987654321098765432',
            branch: 'فرع جدة - الروضة'
          },
          healthInfo: {
            insuranceNumber: 'INS-789012',
            insuranceProvider: 'شركة التأمين الطبي',
            medicalConditions: [],
            bloodType: 'A+'
          },
          lastAttendance: '2024-01-20 08:00',
          completedTasks: 62,
          ongoingTasks: 12,
          annualLeaveBalance: 22,
          sickLeaveBalance: 28,
          emergencyLeaveBalance: 3,
          createdAt: '2022-08-20T09:00:00Z',
          updatedAt: '2024-01-20T16:45:00Z'
        },
        {
          id: '3',
          employeeNumber: 'BHR-003',
          firstName: 'سارة',
          lastName: 'خالد المطيري',
          fullName: 'سارة خالد المطيري',
          fullNameArabic: 'سارة خالد المطيري',
          position: 'محاسبة أولى',
          department: 'المالية',
          team: 'فريق المحاسبة',
          email: 'sara.almutairi@boudhr.com',
          phone: '+966509876543',
          nationality: 'سعودية',
          nationalId: '1357924680',
          birthDate: '1992-03-10',
          hireDate: '2023-06-01',
          contractStartDate: '2023-06-01',
          contractType: 'trainee',
          salary: 12000,
          housingAllowance: 2000,
          transportAllowance: 500,
          otherAllowances: 500,
          totalSalary: 15000,
          status: 'probation',
          performance: 88,
          skills: ['Accounting', 'Excel', 'SAP', 'Financial Analysis'],
          documents: [
            { id: '6', name: 'السيرة الذاتية', type: 'pdf', category: 'cv', uploadDate: '2023-05-25', url: '#', size: '1.5 MB' },
            { id: '7', name: 'عقد التجربة', type: 'pdf', category: 'contract', uploadDate: '2023-06-01', url: '#', size: '1.2 MB' }
          ],
          address: 'الدمام، المملكة العربية السعودية - حي الفيصلية',
          emergencyContact: {
            name: 'خالد المطيري',
            relationship: 'والد',
            phone: '+966509876544'
          },
          bankDetails: {
            bankName: 'البنك السعودي للاستثمار',
            accountNumber: '456789123',
            iban: 'SA4567891234567891234'
          },
          healthInfo: {
            insuranceNumber: 'INS-345678',
            insuranceProvider: 'شركة التأمين الطبي',
            bloodType: 'B+'
          },
          lastAttendance: '2024-01-20 08:30',
          completedTasks: 23,
          ongoingTasks: 5,
          annualLeaveBalance: 30,
          sickLeaveBalance: 30,
          emergencyLeaveBalance: 5,
          createdAt: '2023-06-01T08:00:00Z',
          updatedAt: '2024-01-20T12:15:00Z'
        }
      ];

      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'تطوير نظام إدارة الموظفين الجديد',
          description: 'تطوير نظام شامل لإدارة الموظفين مع واجهات حديثة وميزات متقدمة',
          assignedTo: ['1'],
          assignedTeam: 'فريق التطوير الأساسي',
          priority: 'high',
          status: 'inProgress',
          dueDate: '2024-03-15',
          startDate: '2024-01-05',
          progress: 65,
          createdBy: '1',
          createdAt: '2024-01-05T09:00:00Z',
          estimatedHours: 120,
          actualHours: 78,
          tags: ['تطوير', 'نظام', 'موارد بشرية', 'أولوية عالية'],
          attachments: [],
          comments: [
            {
              id: '1',
              authorId: '1',
              authorName: 'أحمد محمد العلي',
              content: 'تم إنجاز واجهة المستخدم الأساسية بنجاح',
              createdAt: '2024-01-15T14:30:00Z'
            }
          ]
        },
        {
          id: '2',
          title: 'حملة التسويق الرقمي للربع الأول',
          description: 'إطلاق حملة تسويقية شاملة عبر القنوات الرقمية لزيادة الوعي بالعلامة التجارية',
          assignedTo: ['2'],
          assignedTeam: 'فريق التسويق الرقمي',
          priority: 'high',
          status: 'inProgress',
          dueDate: '2024-02-28',
          startDate: '2024-01-10',
          progress: 45,
          createdBy: '2',
          createdAt: '2024-01-10T10:00:00Z',
          estimatedHours: 80,
          actualHours: 36,
          tags: ['تسويق', 'رقمي', 'حملة', 'علامة تجارية'],
          attachments: [],
          comments: []
        },
        {
          id: '3',
          title: 'مراجعة التقارير المالية الشهرية',
          description: 'مراجعة وتدقيق جميع التقارير المالية لشهر يناير 2024',
          assignedTo: ['3'],
          assignedTeam: 'فريق المحاسبة',
          priority: 'medium',
          status: 'new',
          dueDate: '2024-02-05',
          startDate: '2024-02-01',
          progress: 0,
          createdBy: '1',
          createdAt: '2024-01-25T11:00:00Z',
          estimatedHours: 16,
          actualHours: 0,
          tags: ['محاسبة', 'تقارير', 'شهري', 'مراجعة'],
          attachments: [],
          comments: []
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

  // ================================
  // COMPUTED VALUES
  // ================================

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
    contractsExpiring: employees.filter(emp => {
      if (!emp.contractEndDate) return false;
      const endDate = new Date(emp.contractEndDate);
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      return endDate <= thirtyDaysFromNow;
    }).length,
    averagePerformance: employees.length > 0 ? 
      Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length) : 0,
    departmentDistribution: [
      { name: 'تقنية المعلومات', count: 12, color: 'hsl(var(--primary))' },
      { name: 'التسويق', count: 8, color: 'hsl(var(--secondary))' },
      { name: 'الموارد البشرية', count: 6, color: 'hsl(var(--accent))' },
      { name: 'المالية', count: 4, color: 'hsl(var(--muted))' },
      { name: 'المبيعات', count: 10, color: 'hsl(var(--success))' }
    ],
    monthlyHiring: [
      { month: 'يناير', hires: 5, terminations: 1 },
      { month: 'فبراير', hires: 3, terminations: 2 },
      { month: 'مارس', hires: 7, terminations: 0 },
      { month: 'أبريل', hires: 4, terminations: 1 },
      { month: 'مايو', hires: 6, terminations: 1 },
      { month: 'يونيو', hires: 2, terminations: 3 }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'hire',
        description: 'تم تعيين موظف جديد في قسم تقنية المعلومات',
        employeeId: '1',
        employeeName: 'أحمد محمد العلي',
        timestamp: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        type: 'performance_review',
        description: 'تم إجراء تقييم أداء ربع سنوي',
        employeeId: '2',
        employeeName: 'فاطمة أحمد محمود',
        timestamp: '2024-01-19T14:15:00Z'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        type: 'contract_expiry',
        title: 'انتهاء عقد عمل',
        employeeId: '1',
        employeeName: 'أحمد محمد العلي',
        date: '2026-01-15',
        daysRemaining: 730
      },
      {
        id: '2',
        type: 'probation_end',
        title: 'انتهاء فترة التجربة',
        employeeId: '3',
        employeeName: 'سارة خالد المطيري',
        date: '2024-03-01',
        daysRemaining: 40
      }
    ]
  };

  // Filter Functions
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || employee.position === positionFilter;
    const matchesContract = contractFilter === 'all' || employee.contractType === contractFilter;

    return matchesSearch && matchesDepartment && matchesStatus && matchesPosition && matchesContract;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTeam.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // ================================
  // EVENT HANDLERS
  // ================================

  // Employee CRUD Operations
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
        fullNameArabic: employeeForm.fullNameArabic,
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
        contractStartDate: employeeForm.contractStartDate || new Date().toISOString().split('T')[0],
        contractEndDate: employeeForm.contractEndDate,
        contractType: employeeForm.contractType || 'permanent',
        salary: employeeForm.salary || 0,
        housingAllowance: employeeForm.housingAllowance || 0,
        transportAllowance: employeeForm.transportAllowance || 0,
        otherAllowances: employeeForm.otherAllowances || 0,
        totalSalary: (employeeForm.salary || 0) + (employeeForm.housingAllowance || 0) + (employeeForm.transportAllowance || 0) + (employeeForm.otherAllowances || 0),
        status: 'active',
        performance: 0,
        skills: employeeForm.skills || [],
        avatar: employeeForm.avatar,
        documents: [],
        address: employeeForm.address || '',
        emergencyContact: employeeForm.emergencyContact || { name: '', relationship: '', phone: '' },
        bankDetails: employeeForm.bankDetails || { bankName: '', accountNumber: '', iban: '' },
        healthInfo: employeeForm.healthInfo || {},
        lastAttendance: '',
        completedTasks: 0,
        ongoingTasks: 0,
        annualLeaveBalance: 30,
        sickLeaveBalance: 30,
        emergencyLeaveBalance: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setEmployees(prev => [...prev, newEmployee]);
      setEmployeeForm({});
      setUploadedFiles([]);
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
          ? { 
              ...emp, 
              ...employeeForm, 
              fullName: `${employeeForm.firstName} ${employeeForm.lastName}`,
              totalSalary: (employeeForm.salary || emp.salary) + (employeeForm.housingAllowance || emp.housingAllowance) + (employeeForm.transportAllowance || emp.transportAllowance) + (employeeForm.otherAllowances || emp.otherAllowances),
              updatedAt: new Date().toISOString()
            }
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
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذا الموظف؟ سيتم حذف جميع البيانات المرتبطة به.' : 'Are you sure you want to delete this employee? All related data will be removed.')) {
      return;
    }

    setIsLoading(true);
    try {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
      setTasks(prev => prev.filter(task => !task.assignedTo.includes(employeeId)));
      toast.success(isRTL ? 'تم حذف الموظف بنجاح' : 'Employee deleted successfully');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ في حذف الموظف' : 'Error deleting employee');
    } finally {
      setIsLoading(false);
    }
  }, [isRTL]);

  // Task Operations
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
        attachments: [],
        comments: []
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

  // File Operations
  const handleFileUpload = useCallback((files: FileList | null, category: string) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    toast.success(isRTL ? `تم رفع ${newFiles.length} ملف بنجاح` : `${newFiles.length} files uploaded successfully`);
  }, [isRTL]);

  // Export Functions
  const exportToExcel = useCallback((data: Employee[]) => {
    toast.success(isRTL ? 'جاري تصدير البيانات إلى Excel...' : 'Exporting to Excel...');
    
    // Simulate export process
    setTimeout(() => {
      toast.success(isRTL ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
    }, 2000);
  }, [isRTL]);

  const exportToPDF = useCallback((data: Employee[]) => {
    toast.success(isRTL ? 'جاري تصدير البيانات إلى PDF...' : 'Exporting to PDF...');
    
    // Simulate export process
    setTimeout(() => {
      toast.success(isRTL ? 'تم تصدير البيانات بنجاح' : 'Data exported successfully');
    }, 2000);
  }, [isRTL]);

  const printData = useCallback(() => {
    window.print();
  }, []);

  // Bulk Operations
  const handleBulkAction = useCallback((action: string) => {
    if (selectedEmployees.length === 0) {
      toast.error(isRTL ? 'يرجى اختيار موظف أو أكثر' : 'Please select one or more employees');
      return;
    }

    switch (action) {
      case 'export':
        const selectedEmployeeData = employees.filter(emp => selectedEmployees.includes(emp.id));
        exportToExcel(selectedEmployeeData);
        break;
      case 'deactivate':
        if (confirm(isRTL ? 'هل أنت متأكد من إلغاء تفعيل الموظفين المحددين؟' : 'Are you sure you want to deactivate selected employees?')) {
          setEmployees(prev => prev.map(emp => 
            selectedEmployees.includes(emp.id) ? { ...emp, status: 'suspended' as const } : emp
          ));
          toast.success(isRTL ? 'تم إلغاء تفعيل الموظفين المحددين' : 'Selected employees deactivated');
        }
        break;
      case 'delete':
        if (confirm(isRTL ? 'هل أنت متأكد من حذف الموظفين المحددين؟' : 'Are you sure you want to delete selected employees?')) {
          setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.id)));
          toast.success(isRTL ? 'تم حذف الموظفين المحددين' : 'Selected employees deleted');
        }
        break;
    }
    
    setSelectedEmployees([]);
  }, [selectedEmployees, employees, isRTL, exportToExcel]);

  // ================================
  // HELPER FUNCTIONS
  // ================================

  const getStatusBadge = (status: Employee['status']) => {
    const statusConfig = {
      active: { 
        label: isRTL ? 'نشط' : 'Active', 
        className: 'bg-success text-success-foreground hover:bg-success/80' 
      },
      probation: { 
        label: isRTL ? 'تحت التجربة' : 'Probation', 
        className: 'bg-warning text-warning-foreground hover:bg-warning/80' 
      },
      onLeave: { 
        label: isRTL ? 'في إجازة' : 'On Leave', 
        className: 'bg-muted text-muted-foreground hover:bg-muted/80' 
      },
      suspended: { 
        label: isRTL ? 'موقوف' : 'Suspended', 
        className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80' 
      },
      terminated: { 
        label: isRTL ? 'منتهية الخدمة' : 'Terminated', 
        className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80' 
      }
    };

    const config = statusConfig[status];
    return (
      <Badge className={cn("transition-colors duration-200", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getContractTypeBadge = (type: Employee['contractType']) => {
    const typeConfig = {
      permanent: { 
        label: isRTL ? 'دائم' : 'Permanent', 
        className: 'bg-primary text-primary-foreground hover:bg-primary/80' 
      },
      temporary: { 
        label: isRTL ? 'مؤقت' : 'Temporary', 
        className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
      },
      trainee: { 
        label: isRTL ? 'متدرب' : 'Trainee', 
        className: 'bg-accent text-accent-foreground hover:bg-accent/80' 
      }
    };

    const config = typeConfig[type];
    return (
      <Badge variant="outline" className={cn("transition-colors duration-200", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const priorityConfig = {
      high: { 
        label: isRTL ? 'عالية' : 'High', 
        className: 'bg-destructive text-destructive-foreground' 
      },
      medium: { 
        label: isRTL ? 'متوسطة' : 'Medium', 
        className: 'bg-warning text-warning-foreground' 
      },
      low: { 
        label: isRTL ? 'منخفضة' : 'Low', 
        className: 'bg-success text-success-foreground' 
      }
    };

    const config = priorityConfig[priority];
    return (
      <Badge className={cn("transition-colors duration-200", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const getTaskStatusBadge = (status: Task['status']) => {
    const statusConfig = {
      new: { 
        label: isRTL ? 'جديدة' : 'New', 
        className: 'bg-accent text-accent-foreground' 
      },
      inProgress: { 
        label: isRTL ? 'قيد التنفيذ' : 'In Progress', 
        className: 'bg-warning text-warning-foreground' 
      },
      completed: { 
        label: isRTL ? 'مكتملة' : 'Completed', 
        className: 'bg-success text-success-foreground' 
      },
      overdue: { 
        label: isRTL ? 'متأخرة' : 'Overdue', 
        className: 'bg-destructive text-destructive-foreground' 
      },
      cancelled: { 
        label: isRTL ? 'ملغية' : 'Cancelled', 
        className: 'bg-muted text-muted-foreground' 
      }
    };

    const config = statusConfig[status];
    return (
      <Badge className={cn("transition-colors duration-200", config.className)}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-SA', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
  };

  const formatCurrency = (amount: number) => {
    return isRTL 
      ? `${amount.toLocaleString()} ريال`
      : `SAR ${amount.toLocaleString()}`;
  };

  // ================================
  // RENDER METHODS
  // ================================

  // Dashboard Tab
  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-br from-background to-muted/10 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الموظفين' : 'Total Employees'}</p>
              <p className="text-3xl font-bold text-foreground">{dashboardStats.totalEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-success bg-gradient-to-br from-background to-success/5 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'الموظفين النشطين' : 'Active Employees'}</p>
              <p className="text-3xl font-bold text-foreground">{dashboardStats.activeEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-warning bg-gradient-to-br from-background to-warning/5 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تحت التجربة' : 'On Probation'}</p>
              <p className="text-3xl font-bold text-foreground">{dashboardStats.probationEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-accent bg-gradient-to-br from-background to-accent/5 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط الأداء' : 'Avg Performance'}</p>
              <p className="text-3xl font-bold text-foreground">{dashboardStats.averagePerformance}%</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => setIsAddEmployeeOpen(true)}
              className="h-20 flex-col gap-2 bg-gradient-to-br from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300"
            >
              <UserPlus className="w-6 h-6" />
              <span className="text-sm">{isRTL ? 'إضافة موظف' : 'Add Employee'}</span>
            </Button>
            
            <Button 
              onClick={() => setIsAddTaskOpen(true)}
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-accent/10 transition-all duration-300"
            >
              <Target className="w-6 h-6" />
              <span className="text-sm">{isRTL ? 'إضافة مهمة' : 'Add Task'}</span>
            </Button>
            
            <Button 
              onClick={() => exportToExcel(employees)}
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-success/10 transition-all duration-300"
            >
              <FileSpreadsheet className="w-6 h-6" />
              <span className="text-sm">{isRTL ? 'تصدير البيانات' : 'Export Data'}</span>
            </Button>
            
            <Button 
              onClick={() => setIsSettingsOpen(true)}
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-muted/50 transition-all duration-300"
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">{isRTL ? 'الإعدادات' : 'Settings'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              {isRTL ? 'توزيع الموظفين حسب الإدارة' : 'Department Distribution'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              {dashboardStats.departmentDistribution.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="font-medium">{dept.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{dept.count}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((dept.count / dashboardStats.totalEmployees) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              {isRTL ? 'النشاطات الأخيرة' : 'Recent Activities'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              {dashboardStats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {isRTL ? 'الأحداث القادمة' : 'Upcoming Events'}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardStats.upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.employeeName}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    {event.daysRemaining} {isRTL ? 'يوم' : 'days'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Employees Tab
  const renderEmployees = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'إدارة الموظفين' : 'Employee Management'}</h2>
          <p className="text-muted-foreground">{isRTL ? 'إدارة شاملة لجميع بيانات الموظفين' : 'Comprehensive employee data management'}</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => setIsAddEmployeeOpen(true)} className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
            <Plus className="w-4 h-4 mr-2" />
            {isRTL ? 'إضافة موظف' : 'Add Employee'}
          </Button>
          
          <Button onClick={() => exportToExcel(filteredEmployees)} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
          
          <Button onClick={printData} variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            {isRTL ? 'طباعة' : 'Print'}
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={isRTL ? 'البحث عن موظف...' : 'Search employees...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder={isRTL ? 'الإدارة' : 'Department'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الإدارات' : 'All Departments'}</SelectItem>
              <SelectItem value="تقنية المعلومات">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
              <SelectItem value="التسويق">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
              <SelectItem value="الموارد البشرية">{isRTL ? 'الموارد البشرية' : 'HR'}</SelectItem>
              <SelectItem value="المالية">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={isRTL ? 'الحالة' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
              <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
              <SelectItem value="probation">{isRTL ? 'تحت التجربة' : 'Probation'}</SelectItem>
              <SelectItem value="onLeave">{isRTL ? 'في إجازة' : 'On Leave'}</SelectItem>
              <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
              <SelectItem value="terminated">{isRTL ? 'منتهية الخدمة' : 'Terminated'}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={contractFilter} onValueChange={setContractFilter}>
            <SelectTrigger>
              <SelectValue placeholder={isRTL ? 'نوع العقد' : 'Contract'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'جميع العقود' : 'All Contracts'}</SelectItem>
              <SelectItem value="permanent">{isRTL ? 'دائم' : 'Permanent'}</SelectItem>
              <SelectItem value="temporary">{isRTL ? 'مؤقت' : 'Temporary'}</SelectItem>
              <SelectItem value="trainee">{isRTL ? 'متدرب' : 'Trainee'}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedEmployees.length > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isRTL ? `تم اختيار ${selectedEmployees.length} موظف` : `${selectedEmployees.length} employees selected`}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                  <Download className="w-4 h-4 mr-1" />
                  {isRTL ? 'تصدير' : 'Export'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {isRTL ? 'إلغاء تفعيل' : 'Deactivate'}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  {isRTL ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Employees List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="p-6 hover:shadow-medium transition-all duration-300 group border border-border hover:border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/10">
                    <AvatarImage src={employee.avatar} alt={employee.fullName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">
                      {employee.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{employee.employeeNumber}</p>
                  </div>
                </div>
                
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedEmployees(prev => [...prev, employee.id]);
                    } else {
                      setSelectedEmployees(prev => prev.filter(id => id !== employee.id));
                    }
                  }}
                  className="rounded border-gray-300"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.position}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.department}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {getStatusBadge(employee.status)}
                    {getContractTypeBadge(employee.contractType)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="text-sm">{isRTL ? 'الأداء' : 'Performance'}: {employee.performance}%</span>
                  <Progress value={employee.performance} className="flex-1 h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsViewEmployeeOpen(true);
                      }}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {isRTL ? 'عرض' : 'View'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setEmployeeForm(employee);
                        setIsEditEmployeeOpen(true);
                      }}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                      } else {
                        setSelectedEmployees([]);
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </TableHead>
                <TableHead>{isRTL ? 'الموظف' : 'Employee'}</TableHead>
                <TableHead>{isRTL ? 'الرقم الوظيفي' : 'Employee ID'}</TableHead>
                <TableHead>{isRTL ? 'المنصب' : 'Position'}</TableHead>
                <TableHead>{isRTL ? 'الإدارة' : 'Department'}</TableHead>
                <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{isRTL ? 'الأداء' : 'Performance'}</TableHead>
                <TableHead className="text-right">{isRTL ? 'إجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-muted/50 transition-colors duration-200">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees(prev => [...prev, employee.id]);
                        } else {
                          setSelectedEmployees(prev => prev.filter(id => id !== employee.id));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={employee.avatar} alt={employee.fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.fullName}</p>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{employee.employeeNumber}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={employee.performance} className="w-16 h-2" />
                      <span className="text-sm">{employee.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsViewEmployeeOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setEmployeeForm(employee);
                          setIsEditEmployeeOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {filteredEmployees.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{isRTL ? 'لا توجد نتائج' : 'No Results Found'}</h3>
          <p className="text-muted-foreground">
            {isRTL ? 'لم يتم العثور على موظفين يطابقون معايير البحث' : 'No employees match your search criteria'}
          </p>
        </Card>
      )}
    </div>
  );

  // Tasks Tab
  const renderTasks = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'إدارة المهام' : 'Task Management'}</h2>
          <p className="text-muted-foreground">{isRTL ? 'تكليف ومتابعة المهام والمشاريع' : 'Assign and track tasks and projects'}</p>
        </div>
        
        <Button onClick={() => setIsAddTaskOpen(true)} className="bg-gradient-to-r from-primary to-primary-glow">
          <Plus className="w-4 h-4 mr-2" />
          {isRTL ? 'إضافة مهمة' : 'Add Task'}
        </Button>
      </div>

      {/* Tasks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المهام' : 'Total Tasks'}</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <Target className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</p>
              <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'inProgress').length}</p>
            </div>
            <Clock className="w-8 h-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مكتملة' : 'Completed'}</p>
              <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'completed').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'متأخرة' : 'Overdue'}</p>
              <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'overdue').length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'قائمة المهام' : 'Tasks List'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{task.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getPriorityBadge(task.priority)}
                      {getTaskStatusBadge(task.status)}
                      <Badge variant="outline">{task.assignedTeam}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {isRTL ? 'تاريخ الاستحقاق' : 'Due'}: {formatDate(task.dueDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {task.assignedTo.length} {isRTL ? 'موظف' : 'assignees'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {task.actualHours}/{task.estimatedHours} {isRTL ? 'ساعة' : 'hours'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
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

  // Reports Tab
  const renderReports = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'التقارير والإحصائيات' : 'Reports & Analytics'}</h2>
          <p className="text-muted-foreground">{isRTL ? 'تقارير شاملة وإحصائيات مفصلة' : 'Comprehensive reports and detailed analytics'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Reports */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تقرير الموظفين' : 'Employee Report'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تقرير شامل بجميع بيانات الموظفين' : 'Comprehensive employee data report'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full" onClick={() => exportToPDF(employees)}>
              <Download className="w-4 h-4 mr-2" />
              {isRTL ? 'تحميل PDF' : 'Download PDF'}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => exportToExcel(employees)}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              {isRTL ? 'تحميل Excel' : 'Download Excel'}
            </Button>
          </div>
        </Card>

        {/* Department Analysis */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تحليل الإدارات' : 'Department Analysis'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إحصائيات مفصلة لكل إدارة' : 'Detailed statistics per department'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">
              <BarChart3 className="w-4 h-4 mr-2" />
              {isRTL ? 'عرض التحليل' : 'View Analysis'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isRTL ? 'تصدير التقرير' : 'Export Report'}
            </Button>
          </div>
        </Card>

        {/* Performance Report */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تقرير الأداء' : 'Performance Report'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تقييم أداء الموظفين والفرق' : 'Employee and team performance evaluation'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">
              <Award className="w-4 h-4 mr-2" />
              {isRTL ? 'عرض التقييمات' : 'View Evaluations'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isRTL ? 'تصدير النتائج' : 'Export Results'}
            </Button>
          </div>
        </Card>

        {/* Attendance Report */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تقرير الحضور' : 'Attendance Report'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إحصائيات الحضور والانصراف' : 'Attendance and absence statistics'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              {isRTL ? 'عرض السجلات' : 'View Records'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isRTL ? 'تصدير البيانات' : 'Export Data'}
            </Button>
          </div>
        </Card>

        {/* Payroll Report */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تقرير الرواتب' : 'Payroll Report'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'تفاصيل الرواتب والمستحقات' : 'Salary and benefits details'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              {isRTL ? 'عرض التفاصيل' : 'View Details'}
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {isRTL ? 'تصدير الملف' : 'Export File'}
            </Button>
          </div>
        </Card>

        {/* Custom Reports */}
        <Card className="p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center">
              <Clipboard className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">{isRTL ? 'تقارير مخصصة' : 'Custom Reports'}</h3>
              <p className="text-sm text-muted-foreground">{isRTL ? 'إنشاء تقارير حسب الحاجة' : 'Create reports as needed'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              {isRTL ? 'إنشاء تقرير' : 'Create Report'}
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              {isRTL ? 'إعدادات التقارير' : 'Report Settings'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  // Settings Tab
  const renderSettings = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h2 className="text-2xl font-bold">{isRTL ? 'إعدادات النظام' : 'System Settings'}</h2>
        <p className="text-muted-foreground">{isRTL ? 'تخصيص وضبط إعدادات قسم فريق العمل' : 'Customize and configure team management settings'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {isRTL ? 'صلاحيات المستخدمين' : 'User Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'السماح بالعمليات المجمعة' : 'Allow Bulk Operations'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'تفعيل إمكانية التعديل على عدة موظفين معاً' : 'Enable bulk editing for multiple employees'}</p>
                </div>
                <Switch
                  checked={systemSettings.allowBulkOperations}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, allowBulkOperations: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'اشتراط موافقة المدير' : 'Require Manager Approval'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'اشتراط موافقة المدير المباشر للتغييرات' : 'Require direct manager approval for changes'}</p>
                </div>
                <Switch
                  checked={systemSettings.requireManagerApproval}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, requireManagerApproval: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'النسخ الاحتياطي التلقائي' : 'Automatic Backup'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'إنشاء نسخ احتياطية تلقائية للبيانات' : 'Create automatic data backups'}</p>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, autoBackup: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              {isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'إرسال إشعارات عبر البريد الإلكتروني' : 'Send notifications via email'}</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'إشعارات الجوال' : 'Mobile Notifications'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'إرسال إشعارات على التطبيق المحمول' : 'Send push notifications to mobile app'}</p>
                </div>
                <Switch
                  checked={systemSettings.mobileNotifications}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, mobileNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{isRTL ? 'التقارير المتقدمة' : 'Advanced Reporting'}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'تفعيل ميزات التقارير المتقدمة' : 'Enable advanced reporting features'}</p>
                </div>
                <Switch
                  checked={systemSettings.advancedReporting}
                  onCheckedChange={(checked) => 
                    setSystemSettings(prev => ({ ...prev, advancedReporting: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              {isRTL ? 'إدارة البيانات' : 'Data Management'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {isRTL ? 'تصدير جميع البيانات' : 'Export All Data'}
              </Button>
              
              <Button className="w-full" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {isRTL ? 'استيراد البيانات' : 'Import Data'}
              </Button>
              
              <Button className="w-full" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                {isRTL ? 'مزامنة البيانات' : 'Sync Data'}
              </Button>
              
              <Button className="w-full" variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                {isRTL ? 'مسح البيانات المؤقتة' : 'Clear Cache'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {isRTL ? 'إعدادات النظام' : 'System Configuration'}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">{isRTL ? 'المنطقة الزمنية' : 'Timezone'}</Label>
                <Select defaultValue="Asia/Riyadh">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Riyadh">{isRTL ? 'الرياض' : 'Riyadh'}</SelectItem>
                    <SelectItem value="Asia/Dubai">{isRTL ? 'دبي' : 'Dubai'}</SelectItem>
                    <SelectItem value="UTC">{isRTL ? 'توقيت جرينتش' : 'UTC'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">{isRTL ? 'العملة' : 'Currency'}</Label>
                <Select defaultValue="SAR">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">{isRTL ? 'ريال سعودي' : 'Saudi Riyal'}</SelectItem>
                    <SelectItem value="USD">{isRTL ? 'دولار أمريكي' : 'US Dollar'}</SelectItem>
                    <SelectItem value="EUR">{isRTL ? 'يورو' : 'Euro'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>{isRTL ? 'حفظ الإعدادات' : 'Save Settings'}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="flex gap-4">
            <Button 
              onClick={() => {
                toast.success(isRTL ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
              }}
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              <Save className="w-4 h-4 mr-2" />
              {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                setSystemSettings({
                  allowBulkOperations: true,
                  requireManagerApproval: true,
                  autoBackup: true,
                  emailNotifications: true,
                  mobileNotifications: true,
                  advancedReporting: true,
                });
                toast.success(isRTL ? 'تم استعادة الإعدادات الافتراضية' : 'Default settings restored');
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isRTL ? 'استعادة الافتراضي' : 'Reset to Default'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ================================
  // DIALOG COMPONENTS
  // ================================

  // Add Employee Dialog
  const AddEmployeeDialog = () => (
    <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">{isRTL ? 'البيانات الأساسية' : 'Basic Info'}</TabsTrigger>
              <TabsTrigger value="work">{isRTL ? 'بيانات العمل' : 'Work Info'}</TabsTrigger>
              <TabsTrigger value="financial">{isRTL ? 'البيانات المالية' : 'Financial'}</TabsTrigger>
              <TabsTrigger value="documents">{isRTL ? 'المستندات' : 'Documents'}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الاسم الأول' : 'First Name'} *</Label>
                  <Input
                    value={employeeForm.firstName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'الاسم الأخير' : 'Last Name'} *</Label>
                  <Input
                    value={employeeForm.lastName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الاسم الثلاثي بالعربية' : 'Full Arabic Name'}</Label>
                  <Input
                    value={employeeForm.fullNameArabic || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, fullNameArabic: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'رقم الهوية' : 'National ID'} *</Label>
                  <Input
                    value={employeeForm.nationalId || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, nationalId: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'رقم جواز السفر' : 'Passport Number'}</Label>
                  <Input
                    value={employeeForm.passportNumber || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, passportNumber: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الجنسية' : 'Nationality'}</Label>
                  <Select value={employeeForm.nationality || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, nationality: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الجنسية' : 'Select nationality'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سعودي">سعودي</SelectItem>
                      <SelectItem value="مصري">مصري</SelectItem>
                      <SelectItem value="أردني">أردني</SelectItem>
                      <SelectItem value="لبناني">لبناني</SelectItem>
                      <SelectItem value="سوري">سوري</SelectItem>
                      <SelectItem value="أخرى">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</Label>
                  <Input
                    type="date"
                    value={employeeForm.birthDate || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الحالة الاجتماعية' : 'Marital Status'}</Label>
                  <Select value={employeeForm.maritalStatus || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, maritalStatus: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الحالة' : 'Select status'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="أعزب">{isRTL ? 'أعزب' : 'Single'}</SelectItem>
                      <SelectItem value="متزوج">{isRTL ? 'متزوج' : 'Married'}</SelectItem>
                      <SelectItem value="مطلق">{isRTL ? 'مطلق' : 'Divorced'}</SelectItem>
                      <SelectItem value="أرمل">{isRTL ? 'أرمل' : 'Widowed'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'} *</Label>
                  <Input
                    type="email"
                    value={employeeForm.email || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <Input
                    value={employeeForm.phone || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
                  <Textarea
                    value={employeeForm.address || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="work" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الرقم الوظيفي' : 'Employee Number'} *</Label>
                  <Input
                    value={employeeForm.employeeNumber || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, employeeNumber: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'تاريخ التعيين' : 'Hire Date'} *</Label>
                  <Input
                    type="date"
                    value={employeeForm.hireDate || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, hireDate: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الإدارة' : 'Department'} *</Label>
                  <Select value={employeeForm.department || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الإدارة' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                      <SelectItem value="التسويق">التسويق</SelectItem>
                      <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                      <SelectItem value="المالية">المالية</SelectItem>
                      <SelectItem value="المبيعات">المبيعات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{isRTL ? 'المنصب' : 'Position'} *</Label>
                  <Input
                    value={employeeForm.position || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الفريق' : 'Team'}</Label>
                  <Input
                    value={employeeForm.team || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, team: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'نوع العقد' : 'Contract Type'}</Label>
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

                <div>
                  <Label>{isRTL ? 'تاريخ بداية العقد' : 'Contract Start Date'}</Label>
                  <Input
                    type="date"
                    value={employeeForm.contractStartDate || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, contractStartDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'تاريخ انتهاء العقد' : 'Contract End Date'}</Label>
                  <Input
                    type="date"
                    value={employeeForm.contractEndDate || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, contractEndDate: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الراتب الأساسي' : 'Basic Salary'} *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.salary || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, salary: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدل السكن' : 'Housing Allowance'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.housingAllowance || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, housingAllowance: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدل المواصلات' : 'Transport Allowance'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.transportAllowance || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, transportAllowance: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدلات أخرى' : 'Other Allowances'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.otherAllowances || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, otherAllowances: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">{isRTL ? 'تفاصيل البنك' : 'Bank Details'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>{isRTL ? 'اسم البنك' : 'Bank Name'}</Label>
                      <Input
                        value={employeeForm.bankDetails?.bankName || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          bankDetails: { ...prev.bankDetails, bankName: e.target.value } as any
                        }))}
                      />
                    </div>

                    <div>
                      <Label>{isRTL ? 'رقم الحساب' : 'Account Number'}</Label>
                      <Input
                        value={employeeForm.bankDetails?.accountNumber || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          bankDetails: { ...prev.bankDetails, accountNumber: e.target.value } as any
                        }))}
                      />
                    </div>

                    <div>
                      <Label>{isRTL ? 'رقم الآيبان' : 'IBAN'}</Label>
                      <Input
                        value={employeeForm.bankDetails?.iban || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          bankDetails: { ...prev.bankDetails, iban: e.target.value } as any
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">{isRTL ? 'جهة الاتصال في الطوارئ' : 'Emergency Contact'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>{isRTL ? 'الاسم' : 'Name'}</Label>
                      <Input
                        value={employeeForm.emergencyContact?.name || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, name: e.target.value } as any
                        }))}
                      />
                    </div>

                    <div>
                      <Label>{isRTL ? 'صلة القرابة' : 'Relationship'}</Label>
                      <Input
                        value={employeeForm.emergencyContact?.relationship || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, relationship: e.target.value } as any
                        }))}
                      />
                    </div>

                    <div>
                      <Label>{isRTL ? 'رقم الهاتف' : 'Phone'}</Label>
                      <Input
                        value={employeeForm.emergencyContact?.phone || ''}
                        onChange={(e) => setEmployeeForm(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, phone: e.target.value } as any
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">{isRTL ? 'رفع المستندات' : 'Upload Documents'}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">{isRTL ? 'الصورة الشخصية' : 'Profile Picture'}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, 'avatar')}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>{isRTL ? 'اختر ملف' : 'Choose File'}</span>
                      </Button>
                    </Label>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">{isRTL ? 'السيرة الذاتية' : 'Resume/CV'}</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, 'cv')}
                      className="hidden"
                      id="cv-upload"
                    />
                    <Label htmlFor="cv-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>{isRTL ? 'اختر ملف' : 'Choose File'}</span>
                      </Button>
                    </Label>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">{isRTL ? 'صورة الهوية' : 'ID Copy'}</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files, 'id')}
                      className="hidden"
                      id="id-upload"
                    />
                    <Label htmlFor="id-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>{isRTL ? 'اختر ملف' : 'Choose File'}</span>
                      </Button>
                    </Label>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">{isRTL ? 'عقد العمل' : 'Contract'}</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, 'contract')}
                      className="hidden"
                      id="contract-upload"
                    />
                    <Label htmlFor="contract-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>{isRTL ? 'اختر ملف' : 'Choose File'}</span>
                      </Button>
                    </Label>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">{isRTL ? 'الملفات المرفوعة:' : 'Uploaded Files:'}</h5>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-4 border-t">
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-primary-glow">
              {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              {isRTL ? 'حفظ الموظف' : 'Save Employee'}
            </Button>
            
            <Button type="button" variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
              {isRTL ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Edit Employee Dialog
  const EditEmployeeDialog = () => (
    <Dialog open={isEditEmployeeOpen} onOpenChange={setIsEditEmployeeOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isRTL ? 'تعديل بيانات الموظف' : 'Edit Employee'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => { e.preventDefault(); handleEditEmployee(); }} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">{isRTL ? 'البيانات الأساسية' : 'Basic Info'}</TabsTrigger>
              <TabsTrigger value="work">{isRTL ? 'بيانات العمل' : 'Work Info'}</TabsTrigger>
              <TabsTrigger value="financial">{isRTL ? 'البيانات المالية' : 'Financial'}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الاسم الأول' : 'First Name'} *</Label>
                  <Input
                    value={employeeForm.firstName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'الاسم الأخير' : 'Last Name'} *</Label>
                  <Input
                    value={employeeForm.lastName || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'} *</Label>
                  <Input
                    type="email"
                    value={employeeForm.email || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                  <Input
                    value={employeeForm.phone || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'رقم الهوية' : 'National ID'}</Label>
                  <Input
                    value={employeeForm.nationalId || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, nationalId: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الجنسية' : 'Nationality'}</Label>
                  <Input
                    value={employeeForm.nationality || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, nationality: e.target.value }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
                  <Textarea
                    value={employeeForm.address || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="work" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الإدارة' : 'Department'}</Label>
                  <Select value={employeeForm.department || ''} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الإدارة' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                      <SelectItem value="التسويق">التسويق</SelectItem>
                      <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                      <SelectItem value="المالية">المالية</SelectItem>
                      <SelectItem value="المبيعات">المبيعات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{isRTL ? 'المنصب' : 'Position'}</Label>
                  <Input
                    value={employeeForm.position || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الفريق' : 'Team'}</Label>
                  <Input
                    value={employeeForm.team || ''}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, team: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'الحالة الوظيفية' : 'Employment Status'}</Label>
                  <Select value={employeeForm.status || 'active'} onValueChange={(value) => setEmployeeForm(prev => ({ ...prev, status: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                      <SelectItem value="probation">{isRTL ? 'تحت التجربة' : 'Probation'}</SelectItem>
                      <SelectItem value="onLeave">{isRTL ? 'في إجازة' : 'On Leave'}</SelectItem>
                      <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                      <SelectItem value="terminated">{isRTL ? 'منتهية الخدمة' : 'Terminated'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{isRTL ? 'نوع العقد' : 'Contract Type'}</Label>
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

                <div>
                  <Label>{isRTL ? 'تقييم الأداء' : 'Performance Rating'}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={employeeForm.performance || 0}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, performance: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الراتب الأساسي' : 'Basic Salary'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.salary || 0}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, salary: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدل السكن' : 'Housing Allowance'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.housingAllowance || 0}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, housingAllowance: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدل المواصلات' : 'Transport Allowance'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.transportAllowance || 0}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, transportAllowance: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label>{isRTL ? 'بدلات أخرى' : 'Other Allowances'}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={employeeForm.otherAllowances || 0}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, otherAllowances: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">
                      {isRTL ? 'إجمالي الراتب:' : 'Total Salary:'} {' '}
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(
                          (employeeForm.salary || 0) + 
                          (employeeForm.housingAllowance || 0) + 
                          (employeeForm.transportAllowance || 0) + 
                          (employeeForm.otherAllowances || 0)
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-4 border-t">
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-primary-glow">
              {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
            
            <Button type="button" variant="outline" onClick={() => setIsEditEmployeeOpen(false)}>
              {isRTL ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // View Employee Profile Dialog
  const ViewEmployeeDialog = () => {
    if (!selectedEmployee) return null;

    return (
      <Dialog open={isViewEmployeeOpen} onOpenChange={setIsViewEmployeeOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isRTL ? 'الملف الشخصي للموظف' : 'Employee Profile'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.fullName} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {selectedEmployee.firstName.charAt(0)}{selectedEmployee.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedEmployee.fullName}</h3>
                      <p className="text-lg text-muted-foreground">{selectedEmployee.position}</p>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.employeeNumber}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {getStatusBadge(selectedEmployee.status)}
                      {getContractTypeBadge(selectedEmployee.contractType)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedEmployee.department}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {isRTL ? 'تاريخ التعيين:' : 'Hired:'} {formatDate(selectedEmployee.hireDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="text-sm">
                        {isRTL ? 'الأداء:' : 'Performance:'} {selectedEmployee.performance}%
                      </span>
                      <Progress value={selectedEmployee.performance} className="w-16 h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">{isRTL ? 'البيانات الشخصية' : 'Personal'}</TabsTrigger>
                <TabsTrigger value="work">{isRTL ? 'بيانات العمل' : 'Work Info'}</TabsTrigger>
                <TabsTrigger value="financial">{isRTL ? 'المالية' : 'Financial'}</TabsTrigger>
                <TabsTrigger value="documents">{isRTL ? 'المستندات' : 'Documents'}</TabsTrigger>
                <TabsTrigger value="attendance">{isRTL ? 'الحضور' : 'Attendance'}</TabsTrigger>
                <TabsTrigger value="performance">{isRTL ? 'الأداء' : 'Performance'}</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <UserCog className="w-5 h-5 text-primary" />
                        {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الاسم الكامل' : 'Full Name'}</p>
                            <p className="font-medium">{selectedEmployee.fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'رقم الهوية' : 'National ID'}</p>
                            <p className="font-medium">{selectedEmployee.nationalId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الجنسية' : 'Nationality'}</p>
                            <p className="font-medium">{selectedEmployee.nationality}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</p>
                            <p className="font-medium">{formatDate(selectedEmployee.birthDate)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-primary" />
                        {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                          <p className="font-medium">{selectedEmployee.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'رقم الهاتف' : 'Phone'}</p>
                          <p className="font-medium">{selectedEmployee.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'العنوان' : 'Address'}</p>
                          <p className="font-medium">{selectedEmployee.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        {isRTL ? 'جهة الاتصال في الطوارئ' : 'Emergency Contact'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'الاسم' : 'Name'}</p>
                          <p className="font-medium">{selectedEmployee.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'صلة القرابة' : 'Relationship'}</p>
                          <p className="font-medium">{selectedEmployee.emergencyContact.relationship}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'رقم الهاتف' : 'Phone'}</p>
                          <p className="font-medium">{selectedEmployee.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        {isRTL ? 'المعلومات الصحية' : 'Health Information'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'رقم التأمين' : 'Insurance Number'}</p>
                          <p className="font-medium">{selectedEmployee.healthInfo?.insuranceNumber || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'مقدم التأمين' : 'Insurance Provider'}</p>
                          <p className="font-medium">{selectedEmployee.healthInfo?.insuranceProvider || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'فصيلة الدم' : 'Blood Type'}</p>
                          <p className="font-medium">{selectedEmployee.healthInfo?.bloodType || '-'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="work" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        {isRTL ? 'تفاصيل الوظيفة' : 'Job Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الرقم الوظيفي' : 'Employee ID'}</p>
                            <p className="font-medium font-mono">{selectedEmployee.employeeNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'المنصب' : 'Position'}</p>
                            <p className="font-medium">{selectedEmployee.position}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الإدارة' : 'Department'}</p>
                            <p className="font-medium">{selectedEmployee.department}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الفريق' : 'Team'}</p>
                            <p className="font-medium">{selectedEmployee.team}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        {isRTL ? 'تفاصيل العقد' : 'Contract Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'نوع العقد' : 'Contract Type'}</p>
                            <div>{getContractTypeBadge(selectedEmployee.contractType)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الحالة' : 'Status'}</p>
                            <div>{getStatusBadge(selectedEmployee.status)}</div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'تاريخ التعيين' : 'Hire Date'}</p>
                            <p className="font-medium">{formatDate(selectedEmployee.hireDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'تاريخ انتهاء العقد' : 'Contract End'}</p>
                            <p className="font-medium">{selectedEmployee.contractEndDate ? formatDate(selectedEmployee.contractEndDate) : '-'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 md:col-span-2">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        {isRTL ? 'المهارات والخبرات' : 'Skills & Expertise'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        {isRTL ? 'تفاصيل الراتب' : 'Salary Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الراتب الأساسي' : 'Basic Salary'}</p>
                            <p className="font-bold text-lg">{formatCurrency(selectedEmployee.salary)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'بدل السكن' : 'Housing Allowance'}</p>
                            <p className="font-medium">{formatCurrency(selectedEmployee.housingAllowance)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'بدل المواصلات' : 'Transport Allowance'}</p>
                            <p className="font-medium">{formatCurrency(selectedEmployee.transportAllowance)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'بدلات أخرى' : 'Other Allowances'}</p>
                            <p className="font-medium">{formatCurrency(selectedEmployee.otherAllowances)}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">{isRTL ? 'إجمالي الراتب:' : 'Total Salary:'}</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(selectedEmployee.totalSalary)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        {isRTL ? 'تفاصيل البنك' : 'Bank Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'اسم البنك' : 'Bank Name'}</p>
                          <p className="font-medium">{selectedEmployee.bankDetails.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'رقم الحساب' : 'Account Number'}</p>
                          <p className="font-medium font-mono">{selectedEmployee.bankDetails.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{isRTL ? 'رقم الآيبان' : 'IBAN'}</p>
                          <p className="font-medium font-mono">{selectedEmployee.bankDetails.iban}</p>
                        </div>
                        {selectedEmployee.bankDetails.branch && (
                          <div>
                            <p className="text-sm text-muted-foreground">{isRTL ? 'الفرع' : 'Branch'}</p>
                            <p className="font-medium">{selectedEmployee.bankDetails.branch}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 md:col-span-2">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        {isRTL ? 'أرصدة الإجازات' : 'Leave Balances'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">{isRTL ? 'الإجازة السنوية' : 'Annual Leave'}</p>
                          <p className="text-2xl font-bold text-success">{selectedEmployee.annualLeaveBalance}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'يوم متاح' : 'days available'}</p>
                        </div>
                        
                        <div className="text-center p-4 bg-warning/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">{isRTL ? 'الإجازة المرضية' : 'Sick Leave'}</p>
                          <p className="text-2xl font-bold text-warning">{selectedEmployee.sickLeaveBalance}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'يوم متاح' : 'days available'}</p>
                        </div>
                        
                        <div className="text-center p-4 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">{isRTL ? 'الإجازة الطارئة' : 'Emergency Leave'}</p>
                          <p className="text-2xl font-bold text-destructive">{selectedEmployee.emergencyLeaveBalance}</p>
                          <p className="text-xs text-muted-foreground">{isRTL ? 'يوم متاح' : 'days available'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      {isRTL ? 'المستندات والملفات' : 'Documents & Files'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedEmployee.documents.map((doc) => (
                        <div key={doc.id} className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{doc.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {isRTL ? 'تاريخ الرفع:' : 'Uploaded:'} {formatDate(doc.uploadDate)}
                              </p>
                              {doc.size && (
                                <p className="text-xs text-muted-foreground mb-2">
                                  {isRTL ? 'الحجم:' : 'Size:'} {doc.size}
                                </p>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {doc.type.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              {isRTL ? 'عرض' : 'View'}
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-1" />
                              {isRTL ? 'تحميل' : 'Download'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedEmployee.documents.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{isRTL ? 'لا توجد مستندات' : 'No Documents'}</h3>
                        <p className="text-muted-foreground">
                          {isRTL ? 'لم يتم رفع أي مستندات لهذا الموظف' : 'No documents have been uploaded for this employee'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                    <h4 className="font-semibold">{isRTL ? 'آخر حضور' : 'Last Attendance'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmployee.lastAttendance ? formatDate(selectedEmployee.lastAttendance) : '-'}
                    </p>
                  </Card>

                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">{isRTL ? 'المهام المكتملة' : 'Completed Tasks'}</h4>
                    <p className="text-2xl font-bold text-primary">{selectedEmployee.completedTasks}</p>
                  </Card>

                  <Card className="p-4 text-center">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-warning" />
                    </div>
                    <h4 className="font-semibold">{isRTL ? 'المهام الجارية' : 'Ongoing Tasks'}</h4>
                    <p className="text-2xl font-bold text-warning">{selectedEmployee.ongoingTasks}</p>
                  </Card>
                </div>

                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{isRTL ? 'سجل الحضور الأخير' : 'Recent Attendance'}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{isRTL ? 'سجل الحضور' : 'Attendance Records'}</h3>
                      <p className="text-muted-foreground">
                        {isRTL ? 'سيتم عرض سجل الحضور التفصيلي هنا' : 'Detailed attendance records will be displayed here'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        {isRTL ? 'تقييم الأداء الحالي' : 'Current Performance'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="hsl(var(--muted))"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="2"
                              strokeDasharray={`${selectedEmployee.performance}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{selectedEmployee.performance}%</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {isRTL ? 'متوسط الأداء العام' : 'Overall Performance Average'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        {isRTL ? 'الإنجازات' : 'Achievements'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">{isRTL ? 'مهام مكتملة' : 'Tasks Completed'}</p>
                            <p className="text-sm text-muted-foreground">{selectedEmployee.completedTasks} {isRTL ? 'مهمة' : 'tasks'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{isRTL ? 'مهام جارية' : 'Ongoing Tasks'}</p>
                            <p className="text-sm text-muted-foreground">{selectedEmployee.ongoingTasks} {isRTL ? 'مهمة' : 'tasks'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <p className="font-medium">{isRTL ? 'تقييم ممتاز' : 'Excellent Rating'}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedEmployee.performance >= 90 ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>{isRTL ? 'تاريخ التقييمات' : 'Performance History'}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="text-center py-8">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{isRTL ? 'تاريخ الأداء' : 'Performance History'}</h3>
                      <p className="text-muted-foreground">
                        {isRTL ? 'سيتم عرض تاريخ تقييمات الأداء هنا' : 'Performance evaluation history will be displayed here'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button 
                onClick={() => {
                  setEmployeeForm(selectedEmployee);
                  setIsViewEmployeeOpen(false);
                  setIsEditEmployeeOpen(true);
                }}
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isRTL ? 'تعديل البيانات' : 'Edit Profile'}
              </Button>
              
              <Button variant="outline" onClick={() => exportToPDF([selectedEmployee])}>
                <Download className="w-4 h-4 mr-2" />
                {isRTL ? 'تحميل PDF' : 'Download PDF'}
              </Button>
              
              <Button variant="outline" onClick={printData}>
                <Printer className="w-4 h-4 mr-2" />
                {isRTL ? 'طباعة' : 'Print'}
              </Button>
              
              <Button variant="outline" onClick={() => setIsViewEmployeeOpen(false)}>
                {isRTL ? 'إغلاق' : 'Close'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Add Task Dialog
  const AddTaskDialog = () => (
    <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isRTL ? 'إضافة مهمة جديدة' : 'Add New Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>{isRTL ? 'عنوان المهمة' : 'Task Title'} *</Label>
              <Input
                value={taskForm.title || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label>{isRTL ? 'وصف المهمة' : 'Task Description'}</Label>
              <Textarea
                value={taskForm.description || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label>{isRTL ? 'تكليف إلى' : 'Assign To'} *</Label>
              <Select 
                value={taskForm.assignedTo?.[0] || ''} 
                onValueChange={(value) => setTaskForm(prev => ({ ...prev, assignedTo: [value] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? 'اختر موظف' : 'Select employee'} />
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
              <Label>{isRTL ? 'الأولوية' : 'Priority'}</Label>
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
              <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
              <Input
                type="date"
                value={taskForm.startDate || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>

            <div>
              <Label>{isRTL ? 'تاريخ الاستحقاق' : 'Due Date'} *</Label>
              <Input
                type="date"
                value={taskForm.dueDate || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label>{isRTL ? 'الساعات المقدرة' : 'Estimated Hours'}</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={taskForm.estimatedHours || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div>
              <Label>{isRTL ? 'الفريق المسؤول' : 'Responsible Team'}</Label>
              <Input
                value={taskForm.assignedTeam || ''}
                onChange={(e) => setTaskForm(prev => ({ ...prev, assignedTeam: e.target.value }))}
              />
            </div>

            <div className="md:col-span-2">
              <Label>{isRTL ? 'العلامات' : 'Tags'}</Label>
              <Input
                placeholder={isRTL ? 'أدخل العلامات مفصولة بفواصل' : 'Enter tags separated by commas'}
                value={taskForm.tags?.join(', ') || ''}
                onChange={(e) => setTaskForm(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                }))}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-primary-glow">
              {isLoading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              {isRTL ? 'حفظ المهمة' : 'Save Task'}
            </Button>
            
            <Button type="button" variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              {isRTL ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // ================================
  // MAIN RENDER
  // ================================

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">
            {isRTL ? 'جاري تحميل بيانات فريق العمل...' : 'Loading team management data...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {isRTL ? 'إدارة فريق العمل' : 'Team Management'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'النظام الشامل لإدارة الموظفين والفرق' : 'Comprehensive employee and team management system'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => i18n.changeLanguage(isRTL ? 'en' : 'ar')}
              >
                <Languages className="w-4 h-4 mr-2" />
                {isRTL ? 'English' : 'العربية'}
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                {isRTL ? 'متصل' : 'Online'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white"
            >
              <Home className="w-4 h-4" />
              {isRTL ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            
            <TabsTrigger 
              value="employees"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              {isRTL ? 'الموظفين' : 'Employees'}
            </TabsTrigger>
            
            <TabsTrigger 
              value="tasks"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white"
            >
              <Target className="w-4 h-4" />
              {isRTL ? 'المهام' : 'Tasks'}
            </TabsTrigger>
            
            <TabsTrigger 
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              {isRTL ? 'التقارير' : 'Reports'}
            </TabsTrigger>
            
            <TabsTrigger 
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              {isRTL ? 'الإعدادات' : 'Settings'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="employees" className="mt-0">
            {renderEmployees()}
          </TabsContent>

          <TabsContent value="tasks" className="mt-0">
            {renderTasks()}
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <AddEmployeeDialog />
      <EditEmployeeDialog />
      <ViewEmployeeDialog />
      <AddTaskDialog />
    </div>
  );
};

export default TeamWork;