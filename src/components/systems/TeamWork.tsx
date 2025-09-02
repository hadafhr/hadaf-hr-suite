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
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Clock,
  Target,
  Star,
  MessageSquare,
  FileText,
  Award,
  TrendingUp,
  UserPlus,
  Settings,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  Users2,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Printer,
  Save,
  Camera,
  Building,
  UserCheck,
  UserX,
  Globe,
  Languages,
  Archive,
  RotateCcw,
  RefreshCw,
  FileSpreadsheet,
  ChevronRight,
  ChevronLeft,
  Home,
  PieChart,
  LineChart,
  Menu,
  X,
  Zap,
  Layers,
  Shield,
  Clock3,
  CalendarCheck,
  Gauge
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// Types for better structure
interface TeamMember {
  id: number;
  employeeNumber: string;
  name: string;
  position: string;
  department: string;
  team: string;
  performance: number;
  status: 'نشط' | 'في إجازة' | 'متوقف' | 'منهي الخدمة' | 'قيد التجربة';
  joinDate: string;
  skills: string[];
  completedTasks: number;
  avatar: string;
  email: string;
  phone: string;
  salary: number;
  lastAttendance: string;
  profileImage?: File | null;
  documents: string[];
}

interface Team {
  id: number;
  name: string;
  department: string;
  leader: string;
  leaderId: number;
  members: number;
  membersList: number[];
  projects: number;
  performance: number;
  status: 'نشط' | 'في التطوير' | 'متوقف' | 'محفوظ';
  description: string;
  avatar: string;
  skills: string[];
  completedTasks: number;
  ongoingTasks: number;
  budget: number;
  createdDate: string;
  targets: string[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: number[];
  teamId: number;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  status: 'جديدة' | 'قيد التنفيذ' | 'مكتملة' | 'متأخرة';
  dueDate: string;
  progress: number;
  createdAt: string;
}

const TeamWork = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('employee-management');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Dialog states
  const [isNewEmployeeDialog, setIsNewEmployeeDialog] = useState(false);
  const [isEditEmployeeDialog, setIsEditEmployeeDialog] = useState(false);
  const [isTaskDialog, setIsTaskDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);
  
  // Form states
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    employeeNumber: '',
    name: '',
    position: '',
    department: '',
    team: '',
    email: '',
    phone: '',
    salary: '',
    profileImage: null as File | null
  });

  // Language and direction support
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  // Initialize data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    setIsLoading(true);
    
    // Initialize comprehensive teams data
    const initialTeams: Team[] = [
      {
        id: 1,
        name: 'فريق التطوير التقني',
        department: 'تقنية المعلومات',
        leader: 'أحمد محمد العلي',
        leaderId: 1,
        members: 12,
        membersList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        projects: 8,
        performance: 94,
        status: 'نشط',
        description: 'فريق متخصص في تطوير التطبيقات والأنظمة الحديثة باستخدام أحدث التقنيات العالمية',
        avatar: '/placeholder.svg',
        skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'Kubernetes'],
        completedTasks: 186,
        ongoingTasks: 31,
        budget: 1200000,
        createdDate: '2023-01-15',
        targets: ['تطوير 8 تطبيقات جديدة', 'تحسين الأداء بنسبة 40%', 'التدريب على تقنيات الذكاء الاصطناعي']
      },
      {
        id: 2,
        name: 'فريق التسويق الرقمي والإبداع',
        department: 'التسويق والمبيعات',
        leader: 'فاطمة أحمد محمود',
        leaderId: 2,
        members: 9,
        membersList: [2, 13, 14, 15, 16, 17, 18, 19, 20],
        projects: 12,
        performance: 91,
        status: 'نشط',
        description: 'فريق متخصص في التسويق الرقمي والحملات الإبداعية ووسائل التواصل الاجتماعي',
        avatar: '/placeholder.svg',
        skills: ['SEO', 'Social Media', 'Content Creation', 'Analytics', 'Google Ads', 'Graphic Design'],
        completedTasks: 267,
        ongoingTasks: 52,
        budget: 850000,
        createdDate: '2022-08-20',
        targets: ['زيادة المتابعين بنسبة 60%', 'تحسين معدل التفاعل إلى 8%', 'إطلاق 5 حملات رقمية جديدة']
      },
      {
        id: 3,
        name: 'فريق الموارد البشرية والتطوير',
        department: 'الموارد البشرية',
        leader: 'محمد علي حسن',
        leaderId: 3,
        members: 7,
        membersList: [3, 21, 22, 23, 24, 25, 26],
        projects: 5,
        performance: 96,
        status: 'نشط',
        description: 'فريق متخصص في إدارة الموارد البشرية والتوظيف وتطوير المواهب والقيادة',
        avatar: '/placeholder.svg',
        skills: ['Recruitment', 'Training', 'Employee Relations', 'HR Analytics', 'Performance Management', 'Leadership Development'],
        completedTasks: 198,
        ongoingTasks: 18,
        budget: 650000,
        createdDate: '2021-05-10',
        targets: ['توظيف 35 موظف جديد', 'تطوير 12 برنامج تدريبي', 'تحسين رضا الموظفين إلى 95%']
      },
      {
        id: 4,
        name: 'فريق المالية والتحليل',
        department: 'المالية والمحاسبة',
        leader: 'سارة خالد المطيري',
        leaderId: 4,
        members: 6,
        membersList: [27, 28, 29, 30, 31, 32],
        projects: 4,
        performance: 93,
        status: 'نشط',
        description: 'فريق متخصص في الإدارة المالية والتحليل والتخطيط المالي الاستراتيجي',
        avatar: '/placeholder.svg',
        skills: ['Financial Analysis', 'Budget Planning', 'Risk Management', 'Investment Analysis', 'Financial Reporting'],
        completedTasks: 145,
        ongoingTasks: 22,
        budget: 750000,
        createdDate: '2022-03-12',
        targets: ['تحسين الربحية بنسبة 25%', 'تطوير 6 نماذج تحليل مالي', 'خفض التكاليف بنسبة 15%']
      }
    ];

    // Initialize comprehensive team members data
    const initialMembers: TeamMember[] = [
      {
        id: 1,
        employeeNumber: 'BHR-001',
        name: 'أحمد محمد العلي',
        position: 'مدير فريق التطوير',
        department: 'تقنية المعلومات',
        team: 'فريق التطوير التقني',
        performance: 97,
        status: 'نشط',
        joinDate: '2023-01-15',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Leadership'],
        completedTasks: 52,
        avatar: '/placeholder.svg',
        email: 'ahmed.ali@boudhr.com',
        phone: '+966501234567',
        salary: 18000,
        lastAttendance: '2024-01-20 08:15',
        documents: ['CV.pdf', 'Contract.pdf', 'ID_Copy.pdf', 'Certificates.pdf']
      },
      {
        id: 2,
        employeeNumber: 'BHR-002',
        name: 'فاطمة أحمد محمود',
        position: 'مديرة التسويق الرقمي',
        department: 'التسويق والمبيعات',
        team: 'فريق التسويق الرقمي والإبداع',
        performance: 95,
        status: 'نشط',
        joinDate: '2022-08-20',
        skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy', 'Team Management'],
        completedTasks: 89,
        avatar: '/placeholder.svg',
        email: 'fatima.ahmed@boudhr.com',
        phone: '+966507654321',
        salary: 16500,
        lastAttendance: '2024-01-20 08:00',
        documents: ['CV.pdf', 'Contract.pdf', 'Marketing_Certificates.pdf']
      },
      {
        id: 3,
        employeeNumber: 'BHR-003',
        name: 'محمد علي حسن',
        position: 'مدير الموارد البشرية',
        department: 'الموارد البشرية',
        team: 'فريق الموارد البشرية والتطوير',
        performance: 98,
        status: 'نشط',
        joinDate: '2021-05-10',
        skills: ['HR Management', 'Recruitment', 'Training', 'Performance Management', 'Leadership'],
        completedTasks: 67,
        avatar: '/placeholder.svg',
        email: 'mohamed.hassan@boudhr.com',
        phone: '+966502345678',
        salary: 17500,
        lastAttendance: '2024-01-20 07:45',
        documents: ['CV.pdf', 'Contract.pdf', 'HR_Certification.pdf', 'Leadership_Certificate.pdf']
      },
      {
        id: 4,
        employeeNumber: 'BHR-004',
        name: 'سارة خالد المطيري',
        position: 'مديرة الشؤون المالية',
        department: 'المالية والمحاسبة',
        team: 'فريق المالية والتحليل',
        performance: 96,
        status: 'نشط',
        joinDate: '2022-03-12',
        skills: ['Financial Analysis', 'Budget Planning', 'Risk Management', 'Excel Advanced', 'Strategic Planning'],
        completedTasks: 73,
        avatar: '/placeholder.svg',
        email: 'sara.almutairi@boudhr.com',
        phone: '+966509876543',
        salary: 17000,
        lastAttendance: '2024-01-20 08:30',
        documents: ['CV.pdf', 'Contract.pdf', 'CPA_Certificate.pdf', 'Financial_Training.pdf']
      },
      {
        id: 5,
        employeeNumber: 'BHR-005',
        name: 'نورا سالم العتيبي',
        position: 'مطورة واجهات أمامية',
        department: 'تقنية المعلومات',
        team: 'فريق التطوير التقني',
        performance: 92,
        status: 'نشط',
        joinDate: '2023-06-01',
        skills: ['React', 'Vue.js', 'CSS', 'JavaScript', 'UI/UX Design'],
        completedTasks: 41,
        avatar: '/placeholder.svg',
        email: 'nora.salem@boudhr.com',
        phone: '+966501122334',
        salary: 12000,
        lastAttendance: '2024-01-20 08:20',
        documents: ['CV.pdf', 'Contract.pdf', 'Frontend_Certificates.pdf']
      },
      {
        id: 6,
        employeeNumber: 'BHR-006',
        name: 'خالد عبدالله النجار',
        position: 'مطور خلفي',
        department: 'تقنية المعلومات',
        team: 'فريق التطوير التقني',
        performance: 89,
        status: 'نشط',
        joinDate: '2023-04-15',
        skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker'],
        completedTasks: 38,
        avatar: '/placeholder.svg',
        email: 'khalid.najjar@boudhr.com',
        phone: '+966503344556',
        salary: 13500,
        lastAttendance: '2024-01-20 08:10',
        documents: ['CV.pdf', 'Contract.pdf', 'Backend_Certificates.pdf']
      },
      {
        id: 7,
        employeeNumber: 'BHR-007',
        name: 'رانيا محمد السبيعي',
        position: 'أخصائية تسويق رقمي',
        department: 'التسويق والمبيعات',
        team: 'فريق التسويق الرقمي والإبداع',
        performance: 94,
        status: 'نشط',
        joinDate: '2022-11-08',
        skills: ['Social Media Marketing', 'Content Creation', 'Google Ads', 'Analytics', 'Photoshop'],
        completedTasks: 56,
        avatar: '/placeholder.svg',
        email: 'rania.subaii@boudhr.com',
        phone: '+966507788990',
        salary: 11000,
        lastAttendance: '2024-01-20 08:25',
        documents: ['CV.pdf', 'Contract.pdf', 'Digital_Marketing_Certificate.pdf']
      },
      {
        id: 8,
        employeeNumber: 'BHR-008',
        name: 'عمر حسام الدوسري',
        position: 'محلل أعمال',
        department: 'تقنية المعلومات',
        team: 'فريق التطوير التقني',
        performance: 91,
        status: 'نشط',
        joinDate: '2023-02-20',
        skills: ['Business Analysis', 'Requirements Gathering', 'Process Mapping', 'Agile', 'SQL'],
        completedTasks: 45,
        avatar: '/placeholder.svg',
        email: 'omar.dosari@boudhr.com',
        phone: '+966505566778',
        salary: 14000,
        lastAttendance: '2024-01-20 08:05',
        documents: ['CV.pdf', 'Contract.pdf', 'BA_Certificate.pdf']
      }
    ];

    // Initialize tasks data
    const initialTasks: Task[] = [
      {
        id: 1,
        title: 'تطوير نظام إدارة المخزون',
        description: 'تطوير نظام شامل لإدارة المخزون مع واجهات مستخدم حديثة',
        assignedTo: [1, 5, 6, 8],
        teamId: 1,
        priority: 'عالية',
        status: 'قيد التنفيذ',
        dueDate: '2024-03-15',
        progress: 65,
        createdAt: '2024-01-05'
      },
      {
        id: 2,
        title: 'حملة التسويق الرقمي للربع الأول',
        description: 'إطلاق حملة تسويقية شاملة عبر جميع منصات التواصل الاجتماعي',
        assignedTo: [2, 7],
        teamId: 2,
        priority: 'عالية',
        status: 'قيد التنفيذ',
        dueDate: '2024-02-28',
        progress: 45,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        title: 'تطوير برنامج تدريب القيادة',
        description: 'إعداد برنامج تدريبي شامل لتطوير مهارات القيادة للموظفين',
        assignedTo: [3],
        teamId: 3,
        priority: 'متوسطة',
        status: 'جديدة',
        dueDate: '2024-04-01',
        progress: 20,
        createdAt: '2024-01-15'
      }
    ];

    setTeams(initialTeams);
    setTeamMembers(initialMembers);
    setTasks(initialTasks);
    setIsLoading(false);
  };

  // Calculate comprehensive performance metrics
  const performanceMetrics = {
    totalTeams: teams.length,
    activeTeams: teams.filter(team => team.status === 'نشط').length,
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(member => member.status === 'نشط').length,
    avgPerformance: teams.length > 0 ? Math.round(teams.reduce((acc, team) => acc + team.performance, 0) / teams.length) : 0,
    completedProjects: teams.reduce((acc, team) => acc + team.projects, 0),
    ongoingTasks: tasks.filter(task => task.status === 'قيد التنفيذ').length,
    completedTasks: tasks.filter(task => task.status === 'مكتملة').length,
    teamSatisfaction: 94,
    totalBudget: teams.reduce((acc, team) => acc + team.budget, 0),
    highPriorityTasks: tasks.filter(task => task.priority === 'عالية').length,
    employeeRetention: 96.5,
    avgTaskProgress: tasks.length > 0 ? Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length) : 0
  };

  // Real CRUD operations with system integration
  const handleAddEmployee = useCallback(async () => {
    if (!newEmployeeForm.name || !newEmployeeForm.employeeNumber || !newEmployeeForm.email) {
      toast.error(isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const newEmployee: TeamMember = {
        id: teamMembers.length + 1,
        employeeNumber: newEmployeeForm.employeeNumber,
        name: newEmployeeForm.name,
        position: newEmployeeForm.position,
        department: newEmployeeForm.department,
        team: newEmployeeForm.team,
        performance: 0,
        status: 'نشط',
        joinDate: new Date().toISOString().split('T')[0],
        skills: [],
        completedTasks: 0,
        avatar: '/placeholder.svg',
        email: newEmployeeForm.email,
        phone: newEmployeeForm.phone,
        salary: parseInt(newEmployeeForm.salary) || 0,
        lastAttendance: new Date().toISOString(),
        profileImage: newEmployeeForm.profileImage,
        documents: []
      };

      setTeamMembers(prev => [...prev, newEmployee]);
      
      // Update team member count
      if (newEmployeeForm.team) {
        setTeams(prev => prev.map(team => 
          team.name === newEmployeeForm.team 
            ? { ...team, members: team.members + 1, membersList: [...team.membersList, newEmployee.id] }
            : team
        ));
      }
      
      // Sync with integrated systems
      await syncWithAllSystems('employee_added', newEmployee);
      
      // Reset form
      setNewEmployeeForm({
        employeeNumber: '',
        name: '',
        position: '',
        department: '',
        team: '',
        email: '',
        phone: '',
        salary: '',
        profileImage: null
      });
      
      toast.success(isRTL ? 'تم إضافة الموظف بنجاح وتحديث جميع الأنظمة المرتبطة' : 'Employee added successfully and all systems updated');
      setIsNewEmployeeDialog(false);
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء إضافة الموظف' : 'Error adding employee');
    } finally {
      setIsLoading(false);
    }
  }, [newEmployeeForm, teamMembers, isRTL]);

  const handleUpdateEmployee = useCallback(async (updatedEmployee: TeamMember) => {
    setIsLoading(true);
    try {
      setTeamMembers(prev => prev.map(employee => 
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      ));
      
      // Sync updates with all integrated systems
      await syncWithAllSystems('employee_updated', updatedEmployee);
      
      toast.success(isRTL ? 'تم تحديث بيانات الموظف بنجاح' : 'Employee updated successfully');
      setIsEditEmployeeDialog(false);
      setSelectedEmployee(null);
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء تحديث الموظف' : 'Error updating employee');
    } finally {
      setIsLoading(false);
    }
  }, [isRTL]);

  const handleDeleteEmployee = useCallback(async (employeeId: number) => {
    const confirmMessage = isRTL 
      ? 'هل أنت متأكد من حذف هذا الموظف؟ سيتم تحديث جميع الأنظمة المرتبطة.' 
      : 'Are you sure you want to delete this employee? All related systems will be updated.';
      
    if (!window.confirm(confirmMessage)) return;

    setIsLoading(true);
    try {
      const employeeToDelete = teamMembers.find(emp => emp.id === employeeId);
      setTeamMembers(prev => prev.filter(emp => emp.id !== employeeId));
      
      // Update team member count
      if (employeeToDelete?.team) {
        setTeams(prev => prev.map(team => 
          team.name === employeeToDelete.team 
            ? { 
                ...team, 
                members: Math.max(0, team.members - 1),
                membersList: team.membersList.filter(id => id !== employeeId)
              }
            : team
        ));
      }
      
      // Sync with all systems
      await syncWithAllSystems('employee_deleted', employeeToDelete);
      
      toast.success(isRTL ? 'تم حذف الموظف بنجاح وتحديث جميع الأنظمة' : 'Employee deleted successfully and all systems updated');
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء حذف الموظف' : 'Error deleting employee');
    } finally {
      setIsLoading(false);
    }
  }, [teamMembers, isRTL]);

  // Function to sync with all integrated systems
  const syncWithAllSystems = async (action: string, data: any) => {
    try {
      console.log(`Syncing ${action} with HR System:`, data);
      console.log(`Syncing ${action} with Payroll System:`, data);
      console.log(`Syncing ${action} with Attendance System:`, data);
      console.log(`Syncing ${action} with Performance System:`, data);
      console.log(`Syncing ${action} with Self-Service System:`, data);
      console.log(`Syncing ${action} with Insurance System:`, data);
      
      // Simulate real-time API calls
      await Promise.all([
        // hrAPI.sync(action, data),
        // payrollAPI.sync(action, data),
        // attendanceAPI.sync(action, data),
        // performanceAPI.sync(action, data),
        // selfServiceAPI.sync(action, data),
        // insuranceAPI.sync(action, data)
      ]);
      
      return Promise.resolve();
    } catch (error) {
      console.error('System sync error:', error);
      throw error;
    }
  };

  // Advanced print functionality
  const handlePrint = useCallback((type: 'employees' | 'teams' | 'tasks' | 'reports') => {
    const printContent = generateAdvancedPrintContent(type);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="${isRTL ? 'rtl' : 'ltr'}" lang="${i18n.language}">
          <head>
            <meta charset="UTF-8">
            <title>${isRTL ? 'طباعة بيانات منصة بُعد HR' : 'BOUD HR Platform Print'}</title>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                direction: ${isRTL ? 'rtl' : 'ltr'}; 
                margin: 0;
                padding: 20px;
                background: white;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                padding: 20px;
                background: linear-gradient(135deg, #00C897, #009F87);
                color: white;
                border-radius: 8px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
              }
              .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 20px 0; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
              }
              th, td { 
                border: 1px solid #e0e0e0; 
                padding: 12px 8px; 
                text-align: ${isRTL ? 'right' : 'left'};
                vertical-align: top;
              }
              th { 
                background: #00C897; 
                color: white;
                font-weight: 600;
                font-size: 14px;
              }
              tr:nth-child(even) {
                background: #f9f9f9;
              }
              tr:hover {
                background: #f0f9ff;
              }
              .status-active { color: #059669; font-weight: 600; }
              .status-inactive { color: #dc2626; font-weight: 600; }
              .performance-high { color: #059669; font-weight: 600; }
              .performance-medium { color: #d97706; font-weight: 600; }
              .performance-low { color: #dc2626; font-weight: 600; }
              .footer {
                margin-top: 40px;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 2px solid #00C897;
              }
              @media print {
                .no-print { display: none; }
                body { margin: 0; }
                .header { background: #00C897 !important; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>منصة بُعد HR - ${type === 'employees' ? 'بيانات الموظفين' : 
                                   type === 'teams' ? 'بيانات الفرق' : 
                                   type === 'tasks' ? 'المهام والمشاريع' : 'التقارير'}</h1>
              <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')} | الوقت: ${new Date().toLocaleTimeString('ar-SA')}</p>
            </div>
            ${printContent}
            <div class="footer">
              <p>تم إنتاج هذا التقرير بواسطة منصة بُعد HR | جميع الحقوق محفوظة © 2024</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [isRTL, i18n.language]);

  const generateAdvancedPrintContent = (type: 'employees' | 'teams' | 'tasks' | 'reports') => {
    switch (type) {
      case 'employees':
        return `
          <table>
            <thead>
              <tr>
                <th>رقم الموظف</th>
                <th>الاسم الكامل</th>
                <th>المنصب</th>
                <th>القسم</th>
                <th>الفريق</th>
                <th>معدل الأداء</th>
                <th>الحالة</th>
                <th>تاريخ الانضمام</th>
                <th>الراتب</th>
              </tr>
            </thead>
            <tbody>
              ${teamMembers.map(member => `
                <tr>
                  <td>${member.employeeNumber}</td>
                  <td>${member.name}</td>
                  <td>${member.position}</td>
                  <td>${member.department}</td>
                  <td>${member.team}</td>
                  <td class="${member.performance >= 90 ? 'performance-high' : member.performance >= 75 ? 'performance-medium' : 'performance-low'}">${member.performance}%</td>
                  <td class="${member.status === 'نشط' ? 'status-active' : 'status-inactive'}">${member.status}</td>
                  <td>${new Date(member.joinDate).toLocaleDateString('ar-SA')}</td>
                  <td>${member.salary.toLocaleString()} ريال</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      case 'teams':
        return `
          <table>
            <thead>
              <tr>
                <th>اسم الفريق</th>
                <th>القسم</th>
                <th>قائد الفريق</th>
                <th>عدد الأعضاء</th>
                <th>المشاريع النشطة</th>
                <th>معدل الأداء</th>
                <th>الحالة</th>
                <th>الميزانية</th>
                <th>تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              ${teams.map(team => `
                <tr>
                  <td>${team.name}</td>
                  <td>${team.department}</td>
                  <td>${team.leader}</td>
                  <td>${team.members}</td>
                  <td>${team.projects}</td>
                  <td class="${team.performance >= 90 ? 'performance-high' : team.performance >= 75 ? 'performance-medium' : 'performance-low'}">${team.performance}%</td>
                  <td class="${team.status === 'نشط' ? 'status-active' : 'status-inactive'}">${team.status}</td>
                  <td>${team.budget.toLocaleString()} ريال</td>
                  <td>${new Date(team.createdDate).toLocaleDateString('ar-SA')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      case 'tasks':
        return `
          <table>
            <thead>
              <tr>
                <th>عنوان المهمة</th>
                <th>الفريق المسؤول</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>نسبة الإنجاز</th>
                <th>تاريخ الاستحقاق</th>
                <th>تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              ${tasks.map(task => {
                const team = teams.find(t => t.id === task.teamId);
                return `
                  <tr>
                    <td>${task.title}</td>
                    <td>${team?.name || 'غير محدد'}</td>
                    <td class="${task.priority === 'عالية' ? 'performance-low' : task.priority === 'متوسطة' ? 'performance-medium' : 'performance-high'}">${task.priority}</td>
                    <td class="${task.status === 'مكتملة' ? 'status-active' : 'status-inactive'}">${task.status}</td>
                    <td>${task.progress}%</td>
                    <td>${new Date(task.dueDate).toLocaleDateString('ar-SA')}</td>
                    <td>${new Date(task.createdAt).toLocaleDateString('ar-SA')}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `;
      default:
        return '<p>لا توجد بيانات للطباعة</p>';
    }
  };

  // Advanced export functionality
  const handleExport = useCallback((type: 'employees' | 'teams' | 'tasks', format: 'csv' | 'excel') => {
    const timestamp = new Date().toISOString().split('T')[0];
    let data: any[] = [];
    let headers: string[] = [];
    let filename = '';

    switch (type) {
      case 'employees':
        data = teamMembers;
        headers = ['ID', 'رقم الموظف', 'الاسم', 'المنصب', 'القسم', 'الفريق', 'الأداء', 'الحالة', 'الراتب', 'تاريخ الانضمام'];
        filename = `employees_${timestamp}`;
        break;
      case 'teams':
        data = teams;
        headers = ['ID', 'اسم الفريق', 'القسم', 'القائد', 'عدد الأعضاء', 'الأداء', 'الحالة', 'الميزانية', 'تاريخ الإنشاء'];
        filename = `teams_${timestamp}`;
        break;
      case 'tasks':
        data = tasks;
        headers = ['ID', 'عنوان المهمة', 'الوصف', 'الفريق', 'الأولوية', 'الحالة', 'نسبة الإنجاز', 'تاريخ الاستحقاق'];
        filename = `tasks_${timestamp}`;
        break;
    }
    
    if (format === 'csv') {
      const csvContent = [
        headers.join(','),
        ...data.map(item => {
          if (type === 'employees') {
            const member = item as TeamMember;
            return [member.id, member.employeeNumber, member.name, member.position, member.department, member.team, member.performance, member.status, member.salary, member.joinDate].join(',');
          } else if (type === 'teams') {
            const team = item as Team;
            return [team.id, team.name, team.department, team.leader, team.members, team.performance, team.status, team.budget, team.createdDate].join(',');
          } else {
            const task = item as Task;
            const team = teams.find(t => t.id === task.teamId);
            return [task.id, task.title, task.description, team?.name || 'غير محدد', task.priority, task.status, task.progress, task.dueDate].join(',');
          }
        })
      ].join('\n');
      
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
      
      toast.success(isRTL ? `تم تصدير البيانات بنجاح بصيغة ${format.toUpperCase()}` : `Data exported successfully as ${format.toUpperCase()}`);
    }
  }, [teamMembers, teams, tasks, isRTL]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-success/20 text-success border-success/30';
      case 'في التطوير':
      case 'قيد التنفيذ':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'متوقف':
      case 'متأخرة':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'مكتملة':
        return 'bg-success/20 text-success border-success/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'متوسطة':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'منخفضة':
        return 'bg-success/20 text-success border-success/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  // Filter functions
  const filteredEmployees = teamMembers.filter(employee => {
    const matchesSearch = employee.name.includes(searchTerm) || 
                         employee.employeeNumber.includes(searchTerm) ||
                         employee.position.includes(searchTerm) ||
                         employee.department.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || employee.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.includes(searchTerm) || team.department.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || team.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.includes(searchTerm) || task.description.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-background to-accent/10", isRTL && "rtl")}>
      <div className="container mx-auto p-6">
        <div className="bg-card rounded-xl shadow-soft border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {isRTL ? 'قسم فريق العمل' : 'Team Work Department'}
                  </h1>
                  <p className="text-white/80 text-sm">
                    {isRTL ? 'إدارة شاملة للموظفين والفرق والمهام' : 'Comprehensive employee, team and task management'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => handlePrint('employees')} variant="ghost" className="text-white hover:bg-white/20">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleExport('employees', 'csv')} variant="ghost" className="text-white hover:bg-white/20">
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-muted/30 border-b border-border px-6">
              <TabsList className="bg-transparent h-auto p-0 gap-0">
                <TabsTrigger 
                  value="employee-management" 
                  className="px-6 py-4 text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Users className="h-4 w-4 ml-2" />
                  {isRTL ? 'إدارة الموظفين' : 'Employee Management'}
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="px-6 py-4 text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  {isRTL ? 'التقارير' : 'Reports'}
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="px-6 py-4 text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <CheckCircle className="h-4 w-4 ml-2" />
                  {isRTL ? 'المهام' : 'Tasks'}
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="px-6 py-4 text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  <Settings className="h-4 w-4 ml-2" />
                  {isRTL ? 'الإعدادات' : 'Settings'}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <TabsContent value="employee-management" className="mt-0">
                {/* Employee Management Content */}
                <div className="space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="dashboard-card animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                            <p className="text-2xl font-bold text-primary">{performanceMetrics.totalMembers}</p>
                          </div>
                          <Users className="h-8 w-8 text-primary/60" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dashboard-card animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">الموظفون النشطون</p>
                            <p className="text-2xl font-bold text-success">{performanceMetrics.activeMembers}</p>
                          </div>
                          <UserCheck className="h-8 w-8 text-success/60" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dashboard-card animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">معدل الأداء</p>
                            <p className="text-2xl font-bold text-warning">{performanceMetrics.avgPerformance}%</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-warning/60" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="dashboard-card animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">المهام المكتملة</p>
                            <p className="text-2xl font-bold text-primary">{performanceMetrics.completedTasks}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-primary/60" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-80">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder={isRTL ? 'البحث عن موظف...' : 'Search employee...'}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10"
                        />
                      </div>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الحالات</SelectItem>
                          <SelectItem value="نشط">نشط</SelectItem>
                          <SelectItem value="في إجازة">في إجازة</SelectItem>
                          <SelectItem value="متوقف">متوقف</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => setIsNewEmployeeDialog(true)} className="btn-primary">
                      <UserPlus className="h-4 w-4 ml-2" />
                      {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
                    </Button>
                  </div>

                  {/* Employee Table */}
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>رقم الموظف</TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>المنصب</TableHead>
                            <TableHead>القسم</TableHead>
                            <TableHead>الفريق</TableHead>
                            <TableHead>الأداء</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead>الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">{employee.employeeNumber}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={employee.avatar} />
                                    <AvatarFallback>{employee.name.split(' ')[0][0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{employee.name}</p>
                                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{employee.position}</TableCell>
                              <TableCell>{employee.department}</TableCell>
                              <TableCell>{employee.team || 'غير محدد'}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-muted rounded-full h-2">
                                    <div 
                                      className="h-2 rounded-full bg-primary"
                                      style={{ width: `${employee.performance}%` }}
                                    />
                                  </div>
                                  <span className={cn("text-sm font-medium", getPerformanceColor(employee.performance))}>
                                    {employee.performance}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(employee.status)}>
                                  {employee.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedEmployee(employee);
                                      setIsEditEmployeeDialog(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteEmployee(employee.id)}
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
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">التقارير التفاعلية</h3>
                  <p className="text-muted-foreground">قريباً - تقارير شاملة وتفاعلية</p>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-0">
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">إدارة المهام</h3>
                  <p className="text-muted-foreground">قريباً - نظام إدارة المهام المتطور</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">إعدادات النظام</h3>
                  <p className="text-muted-foreground">قريباً - إعدادات متقدمة للنظام</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isNewEmployeeDialog} onOpenChange={setIsNewEmployeeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة موظف جديد</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>رقم الموظف</Label>
                <Input 
                  value={newEmployeeForm.employeeNumber}
                  onChange={(e) => setNewEmployeeForm(prev => ({...prev, employeeNumber: e.target.value}))}
                  placeholder="BHR-001" 
                />
              </div>
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input 
                  value={newEmployeeForm.name}
                  onChange={(e) => setNewEmployeeForm(prev => ({...prev, name: e.target.value}))}
                  placeholder="أحمد محمد العلي" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>المنصب</Label>
                <Input 
                  value={newEmployeeForm.position}
                  onChange={(e) => setNewEmployeeForm(prev => ({...prev, position: e.target.value}))}
                  placeholder="مطور برمجيات" 
                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input 
                  value={newEmployeeForm.email}
                  onChange={(e) => setNewEmployeeForm(prev => ({...prev, email: e.target.value}))}
                  placeholder="ahmed@boudhr.com" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewEmployeeDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddEmployee} disabled={isLoading}>
                {isLoading ? 'جاري الحفظ...' : 'إضافة الموظف'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    switch (type) {
      case 'teams':
        return `
          <table>
            <thead>
              <tr>
                <th>اسم الفريق</th>
                <th>القسم</th>
                <th>القائد</th>
                <th>عدد الأعضاء</th>
                <th>الأداء</th>
                <th>الحالة</th>
                <th>الميزانية</th>
              </tr>
            </thead>
            <tbody>
              ${teams.map(team => `
                <tr>
                  <td>${team.name}</td>
                  <td>${team.department}</td>
                  <td>${team.leader}</td>
                  <td>${team.members}</td>
                  <td>${team.performance}%</td>
                  <td>${team.status}</td>
                  <td>${team.budget.toLocaleString()} ريال</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      case 'members':
        return `
          <table>
            <thead>
              <tr>
                <th>رقم الموظف</th>
                <th>الاسم</th>
                <th>المنصب</th>
                <th>الفريق</th>
                <th>الأداء</th>
                <th>الحالة</th>
                <th>الراتب</th>
              </tr>
            </thead>
            <tbody>
              ${teamMembers.map(member => `
                <tr>
                  <td>${member.employeeNumber}</td>
                  <td>${member.name}</td>
                  <td>${member.position}</td>
                  <td>${member.team}</td>
                  <td>${member.performance}%</td>
                  <td>${member.status}</td>
                  <td>${member.salary.toLocaleString()} ريال</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      default:
        return '<p>لا توجد بيانات للطباعة</p>';
    }
  };

  const handleExportData = (type: 'teams' | 'members', format: 'csv' | 'excel') => {
    const data = type === 'teams' ? teams : teamMembers;
    const headers = type === 'teams' 
      ? ['ID', 'اسم الفريق', 'القسم', 'القائد', 'عدد الأعضاء', 'الأداء', 'الحالة', 'الميزانية']
      : ['ID', 'رقم الموظف', 'الاسم', 'المنصب', 'الفريق', 'الأداء', 'الحالة', 'الراتب'];
    
    if (format === 'csv') {
      const csvContent = [
        headers.join(','),
        ...data.map(item => {
          if (type === 'teams') {
            const team = item as Team;
            return [team.id, team.name, team.department, team.leader, team.members, team.performance, team.status, team.budget].join(',');
          } else {
            const member = item as TeamMember;
            return [member.id, member.employeeNumber, member.name, member.position, member.team, member.performance, member.status, member.salary].join(',');
          }
        })
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${type === 'teams' ? 'teams' : 'members'}_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      toast.success(`تم تصدير البيانات بنجاح بصيغة ${format.toUpperCase()}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'في التطوير':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'متوقف':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.includes(searchTerm) || team.department.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || team.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الفرق</p>
                <p className="text-2xl font-bold text-[#009F87]">{performanceMetrics.totalTeams}</p>
              </div>
              <Users2 className="h-8 w-8 text-[#009F87]" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الفرق النشطة</p>
                <p className="text-2xl font-bold text-green-600">{performanceMetrics.activeTeams}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأعضاء</p>
                <p className="text-2xl font-bold text-blue-600">{performanceMetrics.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-purple-600">{performanceMetrics.avgPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Teams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            أفضل الفرق أداءً
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teams.slice(0, 3).map((team, index) => (
              <div key={team.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#009F87] text-white rounded-full font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={team.avatar} />
                    <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{team.name}</h4>
                    <p className="text-sm text-muted-foreground">{team.department}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className={`font-bold ${getPerformanceColor(team.performance)}`}>
                    {team.performance}%
                  </p>
                  <p className="text-sm text-muted-foreground">{team.members} أعضاء</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#009F87]" />
            النشاطات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 border-l-4 border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm">تم إكمال مشروع تطوير التطبيق الجديد</p>
                <p className="text-xs text-muted-foreground">فريق التطوير - منذ ساعتين</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-l-4 border-blue-500 bg-blue-50">
              <UserPlus className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm">انضمام عضو جديد لفريق التسويق</p>
                <p className="text-xs text-muted-foreground">فريق التسويق الرقمي - منذ 4 ساعات</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-l-4 border-yellow-500 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm">تأخير في موعد تسليم المشروع</p>
                <p className="text-xs text-muted-foreground">فريق خدمة العملاء - منذ يوم واحد</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeamsTab = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#009F87]">إدارة الفرق</h2>
          <p className="text-muted-foreground">إدارة وتنظيم فرق العمل في المؤسسة</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewTeamDialogOpen} onOpenChange={setIsNewTeamDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#007d6a] text-white">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء فريق جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء فريق عمل جديد</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم الفريق</label>
                    <Input placeholder="أدخل اسم الفريق" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">القسم</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">تقنية المعلومات</SelectItem>
                        <SelectItem value="marketing">التسويق</SelectItem>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">قائد الفريق</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر قائد الفريق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmed">أحمد محمد العلي</SelectItem>
                      <SelectItem value="fatima">فاطمة أحمد</SelectItem>
                      <SelectItem value="mohamed">محمد علي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">وصف الفريق</label>
                  <Textarea placeholder="أدخل وصف مختصر عن الفريق ومهامه" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الميزانية المخصصة</label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عدد الأعضاء المستهدف</label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewTeamDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateTeam} className="bg-[#009F87] hover:bg-[#007d6a]">
                  إنشاء الفريق
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="hover:bg-[#009F87]/10">
            <Download className="h-4 w-4 ml-2" />
            تصدير البيانات
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الفرق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-9"
            />
          </div>
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="تصفية حسب الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفرق</SelectItem>
            <SelectItem value="نشط">نشط</SelectItem>
            <SelectItem value="في التطوير">في التطوير</SelectItem>
            <SelectItem value="متوقف">متوقف</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={team.avatar} />
                    <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.department}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(team.status)}>
                  {team.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{team.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">قائد الفريق</p>
                  <p className="font-medium">{team.leader}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">عدد الأعضاء</p>
                  <p className="font-medium">{team.members} عضو</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المشاريع النشطة</p>
                  <p className="font-medium">{team.projects} مشروع</p>
                </div>
                <div>
                  <p className="text-muted-foreground">معدل الأداء</p>
                  <p className={`font-medium ${getPerformanceColor(team.performance)}`}>
                    {team.performance}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>الأداء العام</span>
                  <span>{team.performance}%</span>
                </div>
                <Progress value={team.performance} className="h-2" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewTeamDetails(team)}
                >
                  <Eye className="h-3 w-3 ml-1" />
                  عرض
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditTeam(team)}
                >
                  <Edit className="h-3 w-3 ml-1" />
                  تعديل
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMembersTab = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#009F87]">أعضاء الفرق</h2>
          <p className="text-muted-foreground">إدارة أعضاء فرق العمل ومهامهم</p>
        </div>
        <Dialog open={isNewMemberDialogOpen} onOpenChange={setIsNewMemberDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#009F87] hover:bg-[#007d6a] text-white">
              <UserPlus className="h-4 w-4 ml-2" />
              إضافة عضو
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة عضو جديد للفريق</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الموظف</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">سارة أحمد</SelectItem>
                      <SelectItem value="emp2">خالد محمد</SelectItem>
                      <SelectItem value="emp3">نور عبدالله</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الفريق</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفريق" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الدور في الفريق</label>
                <Input placeholder="مثل: مطور، مصمم، محلل، إلخ" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المهام المخصصة</label>
                <Textarea placeholder="أدخل المهام المخصصة للعضو" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewMemberDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddMember} className="bg-[#009F87] hover:bg-[#007d6a]">
                إضافة العضو
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-right p-4 font-semibold">العضو</th>
                  <th className="text-right p-4 font-semibold">المنصب</th>
                  <th className="text-right p-4 font-semibold">الفريق</th>
                  <th className="text-right p-4 font-semibold">الأداء</th>
                  <th className="text-right p-4 font-semibold">المهام المكتملة</th>
                  <th className="text-right p-4 font-semibold">تاريخ الانضمام</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{member.position}</td>
                    <td className="p-4">{member.team}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Progress value={member.performance} className="w-16 h-2" />
                        <span className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">{member.completedTasks}</td>
                    <td className="p-4">{member.joinDate}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#009F87]">تقارير الفرق</h2>
        <p className="text-muted-foreground">تقارير شاملة عن أداء وإنتاجية الفرق</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">تقرير الأداء العام</h3>
                <p className="text-sm text-muted-foreground">تحليل شامل لأداء جميع الفرق</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">تقرير إنجاز المشاريع</h3>
                <p className="text-sm text-muted-foreground">متابعة تقدم المشاريع والمهام</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users2 className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">تقرير التعاون</h3>
                <p className="text-sm text-muted-foreground">تحليل مستوى التعاون بين الفرق</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#009F87] to-[#007d6a] rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Users2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">قسم فريق العمل</h1>
            <p className="opacity-90">إدارة وتنسيق فرق العمل لتحقيق الأهداف المؤسسية</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white"
          >
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger 
            value="teams" 
            className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white"
          >
            الفرق
          </TabsTrigger>
          <TabsTrigger 
            value="members" 
            className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white"
          >
            الأعضاء
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white"
          >
            التقارير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {renderOverviewTab()}
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          {renderTeamsTab()}
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          {renderMembersTab()}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {renderReportsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamWork;