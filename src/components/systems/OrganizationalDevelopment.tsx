import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  GitBranch,
  Building2, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  BookOpen,
  Users,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Eye,
  Settings,
  Bell,
  CreditCard,
  UserCheck,
  Sparkles,
  Archive,
  Edit,
  Trash2,
  Share,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  UserPlus,
  Phone,
  Mail,
  Crown,
  Users2,
  Database,
  RefreshCw,
  Server,
  Upload,
  Printer,
  FileDown,
  CheckCircle,
  XCircle,
  AlertOctagon,
  Clipboard,
  FileCheck,
  ShieldCheck,
  UserX,
  Timer,
  Hash,
  Layers,
  Workflow,
  Network,
  Shuffle,
  Copy,
  Maximize2,
  Move3D,
  RotateCcw,
  Save
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

interface Department {
  id: string;
  name: string;
  type: 'department' | 'unit' | 'team';
  headCount: number;
  manager: string;
  parentId?: string;
  status: 'active' | 'inactive' | 'proposed' | 'pending';
  level: number;
  x?: number;
  y?: number;
}

interface JobDescription {
  id: string;
  title: string;
  department: string;
  level: 'executive' | 'managerial' | 'supervisory' | 'specialist' | 'administrative';
  responsibilities: string[];
  qualifications: string[];
  reportingTo: string;
  directReports: number;
  status: 'active' | 'draft' | 'review' | 'archived';
  lastUpdated: string;
}

interface ChangeRequest {
  id: string;
  type: 'create' | 'modify' | 'delete' | 'merge' | 'split';
  title: string;
  description: string;
  requestedBy: string;
  targetDepartment: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  priority: 'high' | 'medium' | 'low';
  submitDate: string;
  approver?: string;
  implementationDate?: string;
}

interface Approval {
  id: string;
  title: string;
  type: 'structure' | 'job_description' | 'change' | 'policy';
  requester: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submitDate: string;
  priority: 'high' | 'medium' | 'low';
  department: string;
  details: string;
}

export const OrganizationalDevelopment: React.FC<OrganizationalDevelopmentProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const departments: Department[] = [
    {
      id: '1',
      name: 'الإدارة العامة',
      type: 'department',
      headCount: 12,
      manager: 'د. أحمد محمد الخالدي',
      status: 'active',
      level: 1,
      x: 400,
      y: 50
    },
    {
      id: '2',
      name: 'الموارد البشرية',
      type: 'department',
      headCount: 25,
      manager: 'فاطمة أحمد السالم',
      parentId: '1',
      status: 'active',
      level: 2,
      x: 200,
      y: 150
    },
    {
      id: '3',
      name: 'المالية والمحاسبة',
      type: 'department',
      headCount: 18,
      manager: 'محمد علي العتيبي',
      parentId: '1',
      status: 'active',
      level: 2,
      x: 400,
      y: 150
    },
    {
      id: '4',
      name: 'تكنولوجيا المعلومات',
      type: 'department',
      headCount: 30,
      manager: 'سارة أحمد المطيري',
      parentId: '1',
      status: 'active',
      level: 2,
      x: 600,
      y: 150
    },
    {
      id: '5',
      name: 'وحدة التطوير',
      type: 'unit',
      headCount: 8,
      manager: 'نورا سالم الأحمد',
      parentId: '4',
      status: 'proposed',
      level: 3,
      x: 600,
      y: 250
    }
  ];

  const jobDescriptions: JobDescription[] = [
    {
      id: '1',
      title: 'مدير الموارد البشرية',
      department: 'الموارد البشرية',
      level: 'managerial',
      responsibilities: [
        'إدارة وتطوير استراتيجيات الموارد البشرية',
        'الإشراف على عمليات التوظيف والاختيار',
        'وضع السياسات والإجراءات الخاصة بالموظفين',
        'إدارة أنظمة التعويضات والمزايا'
      ],
      qualifications: [
        'بكالوريوس في إدارة الأعمال أو الموارد البشرية',
        'خبرة لا تقل عن 8 سنوات في مجال الموارد البشرية',
        'مهارات قيادية وإدارية قوية',
        'إجادة اللغة الإنجليزية'
      ],
      reportingTo: 'المدير العام',
      directReports: 6,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'محلل أنظمة',
      department: 'تكنولوجيا المعلومات',
      level: 'specialist',
      responsibilities: [
        'تحليل متطلبات الأنظمة والتطبيقات',
        'تصميم وتطوير الحلول التقنية',
        'إعداد الوثائق التقنية والمواصفات',
        'اختبار الأنظمة وضمان الجودة'
      ],
      qualifications: [
        'بكالوريوس في علوم الحاسب أو نظم المعلومات',
        'خبرة 3-5 سنوات في تحليل الأنظمة',
        'إجادة لغات البرمجة المختلفة',
        'شهادات تقنية معتمدة'
      ],
      reportingTo: 'مدير تكنولوجيا المعلومات',
      directReports: 0,
      status: 'review',
      lastUpdated: '2024-01-12'
    }
  ];

  const changeRequests: ChangeRequest[] = [
    {
      id: '1',
      type: 'create',
      title: 'إنشاء وحدة الذكاء الاصطناعي',
      description: 'إنشاء وحدة متخصصة في تطوير حلول الذكاء الاصطناعي تحت قسم تكنولوجيا المعلومات',
      requestedBy: 'سارة أحمد المطيري',
      targetDepartment: 'تكنولوجيا المعلومات',
      status: 'pending',
      priority: 'high',
      submitDate: '2024-01-18'
    },
    {
      id: '2',
      type: 'modify',
      title: 'إعادة هيكلة قسم المحاسبة',
      description: 'دمج وحدة المحاسبة العامة مع وحدة المحاسبة الإدارية لتحسين الكفاءة',
      requestedBy: 'محمد علي العتيبي',
      targetDepartment: 'المالية والمحاسبة',
      status: 'approved',
      priority: 'medium',
      submitDate: '2024-01-10',
      approver: 'د. أحمد محمد الخالدي',
      implementationDate: '2024-02-01'
    }
  ];

  const approvals: Approval[] = [
    {
      id: '1',
      title: 'الموافقة على الهيكل التنظيمي المحدث',
      type: 'structure',
      requester: 'فاطمة أحمد السالم',
      approver: 'د. أحمد محمد الخالدي',
      status: 'pending',
      submitDate: '2024-01-19',
      priority: 'high',
      department: 'الموارد البشرية',
      details: 'تحديث الهيكل التنظيمي لإضافة وحدة التطوير التنظيمي'
    },
    {
      id: '2',
      title: 'اعتماد الوصف الوظيفي لمنسق التدريب',
      type: 'job_description',
      requester: 'نورا سالم الأحمد',
      approver: 'فاطمة أحمد السالم',
      status: 'approved',
      submitDate: '2024-01-16',
      priority: 'medium',
      department: 'الموارد البشرية',
      details: 'وصف وظيفي جديد لمنسق التدريب والتطوير'
    }
  ];

  // Analytics data
  const organizationData = [
    { month: 'يناير', departments: 12, employees: 285, changes: 3 },
    { month: 'فبراير', departments: 13, employees: 295, changes: 2 },
    { month: 'مارس', departments: 13, employees: 310, changes: 4 },
    { month: 'أبريل', departments: 14, employees: 325, changes: 1 },
    { month: 'مايو', departments: 15, employees: 340, changes: 3 },
    { month: 'يونيو', departments: 16, employees: 360, changes: 2 }
  ];

  const departmentDistribution = [
    { name: 'الأقسام الإدارية', value: 40, color: '#3b82f6' },
    { name: 'الأقسام التقنية', value: 25, color: '#10b981' },
    { name: 'الأقسام المالية', value: 15, color: '#f59e0b' },
    { name: 'الأقسام الداعمة', value: 20, color: '#8b5cf6' }
  ];

  // Calculate statistics
  const stats = {
    totalDepartments: departments.length,
    activeDepartments: departments.filter(d => d.status === 'active').length,
    pendingChanges: changeRequests.filter(c => c.status === 'pending').length,
    totalEmployees: 360,
    pendingApprovals: approvals.filter(a => a.status === 'pending').length,
    jobDescriptions: jobDescriptions.length
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير تقرير التطوير التنظيمي كملف ${format === 'pdf' ? 'PDF' : 'Excel'}`,
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'implemented': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
      case 'proposed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <GitBranch className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام التطوير التنظيمي المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لإدارة وتطوير الهياكل التنظيمية مع التحليل المتقدم
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <GitBranch className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          إضافة جديد
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأقسام</p>
                <p className="text-2xl font-bold text-primary">{stats.totalDepartments}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أقسام نشطة</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeDepartments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تغييرات معلقة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingChanges}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موافقات معلقة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.pendingApprovals}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أوصاف وظيفية</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.jobDescriptions}</p>
              </div>
              <FileText className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              نمو المؤسسة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={organizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="departments" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="employees" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="changes" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للتطوير التنظيمي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">هيكل متوازن</span>
              </div>
              <p className="text-sm text-emerald-700">
                الهيكل التنظيمي الحالي متوازن مع نسبة مثالية بين الإدارة والموظفين
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">اهتمام مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                قسم تكنولوجيا المعلومات يحتاج إلى مشرف إضافي لتحسين الإشراف
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصيات ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                إضافة وحدة للذكاء الاصطناعي ستعزز من القدرات التقنية للمؤسسة
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            الأنشطة الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'تم اعتماد إنشاء وحدة التطوير التقني', time: 'منذ ساعة', type: 'approval', user: 'د. أحمد الخالدي' },
              { action: 'تحديث الوصف الوظيفي لمحلل الأنظمة', time: 'منذ 3 ساعات', type: 'job_description', user: 'سارة المطيري' },
              { action: 'طلب تغيير هيكل قسم المحاسبة', time: 'أمس', type: 'change_request', user: 'محمد العتيبي' },
              { action: 'إضافة منصب مساعد مدير العمليات', time: 'أمس', type: 'structure', user: 'فاطمة السالم' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-full bg-primary/10">
                  {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {activity.type === 'job_description' && <FileText className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'change_request' && <GitBranch className="h-4 w-4 text-orange-600" />}
                  {activity.type === 'structure' && <Building2 className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrganizationalStructures = () => (
    <div className="space-y-6">
      {/* Chart Builder Tools */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">أدوات بناء الهيكل التنظيمي</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 ml-2" />
                إعادة رسم
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة قسم
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Org Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            الهيكل التنظيمي التفاعلي
          </CardTitle>
          <CardDescription>
            اسحب وأفلت لتعديل المواقع، انقر نقراً مزدوجاً للتعديل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center bg-muted/10">
            <div className="text-center">
              <GitBranch className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">منطقة الهيكل التنظيمي التفاعلي</h3>
              <p className="text-muted-foreground">سيتم إضافة أداة السحب والإفلات هنا</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(dept.status)}>
                      {dept.status === 'active' && 'نشط'}
                      {dept.status === 'proposed' && 'مقترح'}
                      {dept.status === 'inactive' && 'غير نشط'}
                      {dept.status === 'pending' && 'معلق'}
                    </Badge>
                    <Badge variant="outline">
                      {dept.type === 'department' && 'قسم'}
                      {dept.type === 'unit' && 'وحدة'}
                      {dept.type === 'team' && 'فريق'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المدير:</span>
                  <span className="font-medium">{dept.manager}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">عدد الموظفين:</span>
                  <span className="font-medium">{dept.headCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المستوى:</span>
                  <span className="font-medium">المستوى {dept.level}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 ml-2" />
                  الموظفون
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Building className="h-4 w-4 ml-2" />
                  الفروع
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderJobDescriptions = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الأوصاف الوظيفية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="تصفية حسب المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="executive">تنفيذي</SelectItem>
                <SelectItem value="managerial">إداري</SelectItem>
                <SelectItem value="supervisory">إشرافي</SelectItem>
                <SelectItem value="specialist">اختصاصي</SelectItem>
                <SelectItem value="administrative">إداري</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 ml-2" />
              وصف وظيفي جديد
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Descriptions List */}
      <div className="space-y-4">
        {jobDescriptions.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status === 'active' && 'نشط'}
                      {job.status === 'draft' && 'مسودة'}
                      {job.status === 'review' && 'قيد المراجعة'}
                      {job.status === 'archived' && 'مؤرشف'}
                    </Badge>
                    <Badge variant="outline">
                      {job.level === 'executive' && 'تنفيذي'}
                      {job.level === 'managerial' && 'إداري'}
                      {job.level === 'supervisory' && 'إشرافي'}
                      {job.level === 'specialist' && 'اختصاصي'}
                      {job.level === 'administrative' && 'إداري'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">القسم</p>
                  <p className="font-medium">{job.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">يرفع إلى</p>
                  <p className="font-medium">{job.reportingTo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المرؤوسون المباشرون</p>
                  <p className="font-medium">{job.directReports}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-semibold mb-2">المسؤوليات الرئيسية:</p>
                  <ul className="text-sm space-y-1">
                    {job.responsibilities.slice(0, 3).map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold mb-2">المؤهلات المطلوبة:</p>
                  <ul className="text-sm space-y-1">
                    {job.qualifications.slice(0, 3).map((qual, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض كامل
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 ml-2" />
                  نسخ
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 ml-2" />
                  مشاركة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChangeManagement = () => (
    <div className="space-y-6">
      {/* Change Management Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">إدارة التغيير التنظيمي</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 ml-2" />
                الأرشيف
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                طلب تغيير جديد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Requests */}
      <div className="space-y-4">
        {changeRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{request.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status === 'pending' && 'معلق'}
                      {request.status === 'approved' && 'موافق عليه'}
                      {request.status === 'rejected' && 'مرفوض'}
                      {request.status === 'implemented' && 'منفذ'}
                    </Badge>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority === 'high' && 'عاجل'}
                      {request.priority === 'medium' && 'متوسط'}
                      {request.priority === 'low' && 'منخفض'}
                    </Badge>
                    <Badge variant="outline">
                      {request.type === 'create' && 'إنشاء'}
                      {request.type === 'modify' && 'تعديل'}
                      {request.type === 'delete' && 'حذف'}
                      {request.type === 'merge' && 'دمج'}
                      {request.type === 'split' && 'تقسيم'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{request.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">مقدم الطلب</p>
                  <p className="font-medium">{request.requestedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">القسم المستهدف</p>
                  <p className="font-medium">{request.targetDepartment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                  <p className="font-medium">{request.submitDate}</p>
                </div>
              </div>

              {request.status === 'approved' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">المعتمد من قبل</p>
                    <p className="font-medium text-green-800">{request.approver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ التنفيذ</p>
                    <p className="font-medium text-green-800">{request.implementationDate}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                {request.status === 'pending' && (
                  <>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      موافقة
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 ml-2" />
                      رفض
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderApprovalsWorkflow = () => (
    <div className="space-y-6">
      {/* Workflow Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">سير عمل الموافقات</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Workflow className="h-4 w-4 ml-2" />
                إعدادات السير
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                طلب موافقة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.map((approval) => (
          <Card key={approval.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{approval.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(approval.status)}>
                      {approval.status === 'pending' && 'معلق'}
                      {approval.status === 'approved' && 'موافق عليه'}
                      {approval.status === 'rejected' && 'مرفوض'}
                      {approval.status === 'expired' && 'منتهي الصلاحية'}
                    </Badge>
                    <Badge className={getPriorityColor(approval.priority)}>
                      {approval.priority === 'high' && 'عاجل'}
                      {approval.priority === 'medium' && 'متوسط'}
                      {approval.priority === 'low' && 'منخفض'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{approval.details}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">مقدم الطلب</p>
                  <p className="font-medium">{approval.requester}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المعتمد</p>
                  <p className="font-medium">{approval.approver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                  <p className="font-medium">{approval.submitDate}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {approval.status === 'pending' && (
                  <>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      موافقة
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 ml-2" />
                      رفض
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>تقارير التطوير التنظيمي</CardTitle>
          <CardDescription>
            إنشاء وتصدير التقارير التفصيلية للهياكل والأوصاف الوظيفية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label>نوع التقرير</Label>
              <Select defaultValue="structure">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structure">تقرير الهيكل التنظيمي</SelectItem>
                  <SelectItem value="job_descriptions">تقرير الأوصاف الوظيفية</SelectItem>
                  <SelectItem value="changes">تقرير التغييرات</SelectItem>
                  <SelectItem value="approvals">تقرير الموافقات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الفترة الزمنية</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  <SelectItem value="annual">سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>تنسيق التصدير</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="word">Word</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>
              <BarChart3 className="h-4 w-4 ml-2" />
              إنشاء التقرير
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 ml-2" />
              جدولة تقرير دوري
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'تقرير الهيكل التنظيمي الشامل', description: 'هيكل كامل مع التفاصيل', icon: GitBranch, color: 'text-blue-600' },
          { name: 'تقرير الأوصاف الوظيفية', description: 'جميع المناصب والمسؤوليات', icon: FileText, color: 'text-green-600' },
          { name: 'تقرير التغييرات التنظيمية', description: 'سجل التغييرات والتطوير', icon: Shuffle, color: 'text-orange-600' },
          { name: 'تقرير توزيع الموظفين', description: 'توزيع الموظفين حسب الأقسام', icon: Users, color: 'text-purple-600' },
          { name: 'تقرير مسارات الموافقة', description: 'حالة الموافقات وسير العمل', icon: Workflow, color: 'text-indigo-600' },
          { name: 'تقرير النمو التنظيمي', description: 'تحليل نمو المؤسسة', icon: TrendingUp, color: 'text-red-600' }
        ].map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full bg-muted ${report.color}`}>
                  <report.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 ml-2" />
                  معاينة
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
          <CardDescription>
            إعدادات النظام الأساسية للتطوير التنظيمي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>عدد المستويات الإدارية القصوى</Label>
              <Input type="number" defaultValue="5" />
            </div>
            <div>
              <Label>الحد الأدنى لعدد الموظفين لإنشاء وحدة</Label>
              <Input type="number" defaultValue="3" />
            </div>
            <div>
              <Label>فترة مراجعة الأوصاف الوظيفية (بالشهور)</Label>
              <Input type="number" defaultValue="12" />
            </div>
            <div>
              <Label>نوع اعتماد التغييرات الافتراضي</Label>
              <Select defaultValue="manager">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">مدير القسم</SelectItem>
                  <SelectItem value="director">مدير عام</SelectItem>
                  <SelectItem value="board">مجلس الإدارة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة الصلاحيات</CardTitle>
          <CardDescription>
            تحديد صلاحيات المستخدمين للنظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { role: 'مدير التطوير التنظيمي', permissions: ['عرض', 'إضافة', 'تعديل', 'حذف', 'اعتماد'], users: 1 },
              { role: 'مدير الموارد البشرية', permissions: ['عرض', 'إضافة', 'تعديل', 'تقارير'], users: 2 },
              { role: 'مدير القسم', permissions: ['عرض', 'تعديل محدود', 'طلب تغيير'], users: 8 },
              { role: 'موظف عادي', permissions: ['عرض محدود'], users: 349 }
            ].map((role, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{role.role}</h4>
                      <p className="text-sm text-muted-foreground">{role.users} مستخدم</p>
                    </div>
                    <div className="flex gap-2">
                      {role.permissions.map((permission, pIndex) => (
                        <Badge key={pIndex} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Settings */}
      <Card>
        <CardHeader>
          <CardTitle>قوالب الهياكل التنظيمية</CardTitle>
          <CardDescription>
            إدارة القوالب الجاهزة للهياكل التنظيمية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'الهيكل الهرمي التقليدي', type: 'hierarchical' },
              { name: 'الهيكل الشبكي المرن', type: 'matrix' },
              { name: 'الهيكل المسطح', type: 'flat' }
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <GitBranch className="h-12 w-12 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{template.type}</p>
                  <Button variant="outline" size="sm">
                    استخدام القالب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex gap-2">
        <Button>
          <Settings className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 ml-2" />
          إعادة تعيين
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="structures">الهياكل التنظيمية</TabsTrigger>
            <TabsTrigger value="jobs">الأوصاف الوظيفية</TabsTrigger>
            <TabsTrigger value="changes">إدارة التغيير</TabsTrigger>
            <TabsTrigger value="approvals">سير الموافقات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="structures">
            {renderOrganizationalStructures()}
          </TabsContent>

          <TabsContent value="jobs">
            {renderJobDescriptions()}
          </TabsContent>

          <TabsContent value="changes">
            {renderChangeManagement()}
          </TabsContent>

          <TabsContent value="approvals">
            {renderApprovalsWorkflow()}
          </TabsContent>

          <TabsContent value="reports">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة عنصر جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>النوع</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">قسم</SelectItem>
                  <SelectItem value="job_description">وصف وظيفي</SelectItem>
                  <SelectItem value="change_request">طلب تغيير</SelectItem>
                  <SelectItem value="approval">طلب موافقة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>العنوان</Label>
              <Input placeholder="أدخل العنوان" />
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea placeholder="أدخل الوصف التفصيلي" rows={4} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                toast({
                  title: "تم الحفظ",
                  description: "تم إضافة العنصر الجديد بنجاح",
                });
                setIsAddDialogOpen(false);
              }}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};