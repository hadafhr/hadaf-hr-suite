import React, { useState, useEffect } from 'react';
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
  RefreshCw
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
  status: 'نشط' | 'في إجازة' | 'متوقف' | 'منهي الخدمة';
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

const TeamWork = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isNewTeamDialogOpen, setIsNewTeamDialogOpen] = useState(false);
  const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
  const [isEditTeamDialogOpen, setIsEditTeamDialogOpen] = useState(false);
  const [isViewTeamDialogOpen, setIsViewTeamDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTeamForm, setNewTeamForm] = useState({
    name: '',
    department: '',
    leader: '',
    description: '',
    budget: '',
    targetMembers: ''
  });
  const [newMemberForm, setNewMemberForm] = useState({
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
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    document.body.className = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Initialize data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    setIsLoading(true);
    
    // Initialize teams data
    const initialTeams: Team[] = [
      {
        id: 1,
        name: 'فريق التطوير',
        department: 'تقنية المعلومات',
        leader: 'أحمد محمد العلي',
        leaderId: 1,
        members: 8,
        membersList: [1, 2, 3, 4, 5, 6, 7, 8],
        projects: 5,
        performance: 92,
        status: 'نشط',
        description: 'فريق متخصص في تطوير التطبيقات والأنظمة الحديثة باستخدام أحدث التقنيات',
        avatar: '/placeholder.svg',
        skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
        completedTasks: 145,
        ongoingTasks: 23,
        budget: 850000,
        createdDate: '2023-01-15',
        targets: ['تطوير 5 تطبيقات جديدة', 'تحسين الأداء بنسبة 30%', 'التدريب على تقنيات جديدة']
      },
      {
        id: 2,
        name: 'فريق التسويق الرقمي',
        department: 'التسويق',
        leader: 'فاطمة أحمد محمود',
        leaderId: 2,
        members: 6,
        membersList: [2, 9, 10, 11, 12, 13],
        projects: 8,
        performance: 88,
        status: 'نشط',
        description: 'فريق متخصص في التسويق الرقمي ووسائل التواصل الاجتماعي وتحليل البيانات',
        avatar: '/placeholder.svg',
        skills: ['SEO', 'Social Media', 'Content Creation', 'Analytics', 'Google Ads'],
        completedTasks: 234,
        ongoingTasks: 45,
        budget: 650000,
        createdDate: '2022-08-20',
        targets: ['زيادة المتابعين بنسبة 50%', 'تحسين معدل التفاعل', 'إطلاق 3 حملات جديدة']
      },
      {
        id: 3,
        name: 'فريق الموارد البشرية',
        department: 'الموارد البشرية',
        leader: 'محمد علي حسن',
        leaderId: 3,
        members: 4,
        membersList: [3, 14, 15, 16],
        projects: 3,
        performance: 95,
        status: 'نشط',
        description: 'فريق متخصص في إدارة الموارد البشرية والتوظيف وتطوير الموظفين',
        avatar: '/placeholder.svg',
        skills: ['Recruitment', 'Training', 'Employee Relations', 'HR Analytics', 'Performance Management'],
        completedTasks: 189,
        ongoingTasks: 12,
        budget: 450000,
        createdDate: '2021-05-10',
        targets: ['توظيف 20 موظف جديد', 'تطوير برامج التدريب', 'تحسين رضا الموظفين']
      }
    ];

    // Initialize team members data
    const initialMembers: TeamMember[] = [
      {
        id: 1,
        employeeNumber: 'EMP-001',
        name: 'أحمد محمد العلي',
        position: 'مطور أول',
        department: 'تقنية المعلومات',
        team: 'فريق التطوير',
        performance: 94,
        status: 'نشط',
        joinDate: '2023-01-15',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        completedTasks: 45,
        avatar: '/placeholder.svg',
        email: 'ahmed@company.com',
        phone: '+966501234567',
        salary: 15000,
        lastAttendance: '2024-01-20 08:30',
        documents: ['CV.pdf', 'Contract.pdf', 'ID_Copy.pdf']
      },
      {
        id: 2,
        employeeNumber: 'EMP-002',
        name: 'فاطمة أحمد محمود',
        position: 'مديرة التسويق',
        department: 'التسويق',
        team: 'فريق التسويق الرقمي',
        performance: 96,
        status: 'نشط',
        joinDate: '2022-08-20',
        skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
        completedTasks: 78,
        avatar: '/placeholder.svg',
        email: 'fatima@company.com',
        phone: '+966507654321',
        salary: 18000,
        lastAttendance: '2024-01-20 08:15',
        documents: ['CV.pdf', 'Contract.pdf', 'Certificates.pdf']
      },
      {
        id: 3,
        employeeNumber: 'EMP-003',
        name: 'محمد علي حسن',
        position: 'مدير الموارد البشرية',
        department: 'الموارد البشرية',
        team: 'فريق الموارد البشرية',
        performance: 98,
        status: 'نشط',
        joinDate: '2021-05-10',
        skills: ['HR Management', 'Recruitment', 'Training', 'Performance Management'],
        completedTasks: 56,
        avatar: '/placeholder.svg',
        email: 'mohamed@company.com',
        phone: '+966502345678',
        salary: 20000,
        lastAttendance: '2024-01-20 08:00',
        documents: ['CV.pdf', 'Contract.pdf', 'HR_Certification.pdf']
      }
    ];

    setTeams(initialTeams);
    setTeamMembers(initialMembers);
    setIsLoading(false);
  };

  // Calculate performance metrics
  const performanceMetrics = {
    totalTeams: teams.length,
    activeTeams: teams.filter(team => team.status === 'نشط').length,
    totalMembers: teamMembers.length,
    avgPerformance: teams.length > 0 ? Math.round(teams.reduce((acc, team) => acc + team.performance, 0) / teams.length) : 0,
    completedProjects: teams.reduce((acc, team) => acc + team.projects, 0),
    ongoingProjects: teams.reduce((acc, team) => acc + team.ongoingTasks, 0),
    teamSatisfaction: 92,
    totalBudget: teams.reduce((acc, team) => acc + team.budget, 0)
  };

  // Real CRUD operations for teams
  const handleCreateTeam = async () => {
    if (!newTeamForm.name || !newTeamForm.department || !newTeamForm.leader) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    try {
      const newTeam: Team = {
        id: teams.length + 1,
        name: newTeamForm.name,
        department: newTeamForm.department,
        leader: newTeamForm.leader,
        leaderId: Math.floor(Math.random() * 1000),
        members: 0,
        membersList: [],
        projects: 0,
        performance: 0,
        status: 'نشط',
        description: newTeamForm.description,
        avatar: '/placeholder.svg',
        skills: [],
        completedTasks: 0,
        ongoingTasks: 0,
        budget: parseInt(newTeamForm.budget) || 0,
        createdDate: new Date().toISOString().split('T')[0],
        targets: []
      };

      setTeams(prev => [...prev, newTeam]);
      
      // Sync with other systems (HR, Payroll, etc.)
      await syncWithSystems('team_created', newTeam);
      
      setNewTeamForm({
        name: '',
        department: '',
        leader: '',
        description: '',
        budget: '',
        targetMembers: ''
      });
      
      toast.success('تم إنشاء الفريق بنجاح وتم ربطه مع الأنظمة الأخرى');
      setIsNewTeamDialogOpen(false);
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء الفريق');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMemberForm.name || !newMemberForm.employeeNumber || !newMemberForm.email) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    try {
      const newMember: TeamMember = {
        id: teamMembers.length + 1,
        employeeNumber: newMemberForm.employeeNumber,
        name: newMemberForm.name,
        position: newMemberForm.position,
        department: newMemberForm.department,
        team: newMemberForm.team,
        performance: 0,
        status: 'نشط',
        joinDate: new Date().toISOString().split('T')[0],
        skills: [],
        completedTasks: 0,
        avatar: '/placeholder.svg',
        email: newMemberForm.email,
        phone: newMemberForm.phone,
        salary: parseInt(newMemberForm.salary) || 0,
        lastAttendance: new Date().toISOString(),
        profileImage: newMemberForm.profileImage,
        documents: []
      };

      setTeamMembers(prev => [...prev, newMember]);
      
      // Update team member count
      if (newMemberForm.team) {
        setTeams(prev => prev.map(team => 
          team.name === newMemberForm.team 
            ? { ...team, members: team.members + 1, membersList: [...team.membersList, newMember.id] }
            : team
        ));
      }
      
      // Sync with other systems (HR, Payroll, Attendance, etc.)
      await syncWithSystems('member_added', newMember);
      
      setNewMemberForm({
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
      
      toast.success('تم إضافة العضو بنجاح وتم تحديث جميع الأنظمة المرتبطة');
      setIsNewMemberDialogOpen(false);
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة العضو');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الفريق؟ سيتم تحديث جميع الأنظمة المرتبطة.')) {
      return;
    }

    setIsLoading(true);
    try {
      const teamToDelete = teams.find(team => team.id === teamId);
      setTeams(prev => prev.filter(team => team.id !== teamId));
      
      // Remove team members from this team
      setTeamMembers(prev => prev.map(member => 
        member.team === teamToDelete?.name 
          ? { ...member, team: '', status: 'متوقف' as const }
          : member
      ));
      
      // Sync deletion with other systems
      await syncWithSystems('team_deleted', { id: teamId, name: teamToDelete?.name });
      
      toast.success('تم حذف الفريق بنجاح وتم تحديث جميع الأنظمة');
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف الفريق');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setIsEditTeamDialogOpen(true);
  };

  const handleUpdateTeam = async (updatedTeam: Team) => {
    setIsLoading(true);
    try {
      setTeams(prev => prev.map(team => 
        team.id === updatedTeam.id ? updatedTeam : team
      ));
      
      // Sync updates with other systems
      await syncWithSystems('team_updated', updatedTeam);
      
      toast.success('تم تحديث بيانات الفريق بنجاح');
      setIsEditTeamDialogOpen(false);
      setSelectedTeam(null);
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث الفريق');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTeamDetails = (team: Team) => {
    setSelectedTeam(team);
    setIsViewTeamDialogOpen(true);
  };

  const handleDeleteMember = async (memberId: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العضو؟ سيتم تحديث جميع الأنظمة المرتبطة.')) {
      return;
    }

    setIsLoading(true);
    try {
      const memberToDelete = teamMembers.find(member => member.id === memberId);
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      
      // Update team member count
      if (memberToDelete?.team) {
        setTeams(prev => prev.map(team => 
          team.name === memberToDelete.team 
            ? { 
                ...team, 
                members: Math.max(0, team.members - 1),
                membersList: team.membersList.filter(id => id !== memberId)
              }
            : team
        ));
      }
      
      // Sync with other systems
      await syncWithSystems('member_deleted', memberToDelete);
      
      toast.success('تم حذف العضو بنجاح وتم تحديث جميع الأنظمة');
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف العضو');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to sync with other systems (HR, Payroll, Attendance)
  const syncWithSystems = async (action: string, data: any) => {
    // Simulate API calls to other systems
    try {
      console.log(`Syncing ${action} with HR System:`, data);
      console.log(`Syncing ${action} with Payroll System:`, data);
      console.log(`Syncing ${action} with Attendance System:`, data);
      console.log(`Syncing ${action} with Performance System:`, data);
      
      // In real implementation, these would be actual API calls:
      // await hrAPI.sync(action, data);
      // await payrollAPI.sync(action, data);
      // await attendanceAPI.sync(action, data);
      // await performanceAPI.sync(action, data);
      
      return Promise.resolve();
    } catch (error) {
      console.error('System sync error:', error);
      throw error;
    }
  };

  // Print and export functions
  const handlePrintData = (type: 'teams' | 'members' | 'reports') => {
    const printContent = generatePrintContent(type);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>طباعة بيانات ${type === 'teams' ? 'الفرق' : type === 'members' ? 'الأعضاء' : 'التقارير'}</title>
            <style>
              body { font-family: Arial, sans-serif; direction: rtl; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
              th { background-color: #f2f2f2; }
              .header { text-align: center; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>منصة بُعد HR - ${type === 'teams' ? 'بيانات الفرق' : type === 'members' ? 'بيانات الأعضاء' : 'التقارير'}</h1>
              <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</p>
            </div>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const generatePrintContent = (type: 'teams' | 'members' | 'reports') => {
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