import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { 
  Building2, 
  Target,
  TrendingUp, 
  Smile, 
  Trophy, 
  Users, 
  BarChart3,
  Shuffle,
  GitBranch,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Star,
  Award,
  Calendar,
  DollarSign,
  Clock,
  Settings,
  FileText,
  Lightbulb,
  Zap,
  Heart,
  ThumbsUp,
  Crown,
  Medal,
  Circle,
  Plus,
  Search,
  BookOpen,
  Workflow,
  ChevronDown,
  ChevronUp,
  User,
  UserCheck,
  ClipboardCheck,
  ArrowRight,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Filter,
  SortAsc
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface ComprehensiveOrganizationalDevelopmentProps {
  onBack: () => void;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  kpis: string[];
  impact: {
    performance: number;
    cost: number;
    satisfaction: number;
  };
  startDate: string;
  endDate: string;
  budget: number;
  department: string;
  phase: string;
  regulations: string[];
  approvals: Array<{
    role: string;
    status: 'approved' | 'pending' | 'rejected';
    date?: string;
    entity: string;
  }>;
  steps: Array<{
    id: number;
    title: string;
    completed: boolean;
    details: string;
  }>;
}

interface HappinessData {
  department: string;
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  rank: number;
  employees: number;
  lastUpdated: string;
}

interface LeaderboardEntry {
  rank: number;
  department: string;
  score: number;
  improvement: number;
  badge: string;
  employees: number;
}

const ComprehensiveOrganizationalDevelopment: React.FC<ComprehensiveOrganizationalDevelopmentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInitiativeOpen, setIsNewInitiativeOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  // Mock data for comprehensive initiatives
  const initiatives: Initiative[] = [
    {
      id: '1',
      title: 'التشخيص والتحليل الأولي',
      description: 'تقرير تشخيص أولي لحالة المؤسسة وفقاً لمعايير رؤية 2030',
      status: 'completed',
      progress: 100,
      phase: 'تشخيص',
      kpis: ['رضا الموظفين', 'دقة التقييم', 'وقت التنفيذ'],
      impact: { performance: 95, cost: 85, satisfaction: 90 },
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      budget: 150000,
      department: 'الموارد البشرية',
      regulations: ['نظام العمل السعودي', 'لائحة الحوكمة', 'معايير رؤية 2030'],
      approvals: [
        { role: 'مدير الإدارة', status: 'approved', date: '2024-01-15', entity: 'الإدارة التنفيذية' },
        { role: 'مدير عام الموارد البشرية', status: 'approved', date: '2024-01-16', entity: 'قسم الموارد البشرية' },
        { role: 'الرئيس التنفيذي', status: 'approved', date: '2024-01-17', entity: 'مجلس الإدارة' }
      ],
      steps: [
        { 
          id: 1, 
          title: 'تعبئة نموذج التقييم الذاتي (وفقاً لمعايير ساما/هيئة السوق المالية)', 
          completed: true,
          details: 'يشمل تقييم الحوكمة، إدارة المخاطر، والامتثال للوائح'
        },
        { 
          id: 2, 
          title: 'مقابلات تشخيصية مع الإدارة العليا والموظفين', 
          completed: true,
          details: 'مقابلات منظمة تراعي الثقافة المحلية والتنوع في بيئة العمل السعودية'
        },
        { 
          id: 3, 
          title: 'تحليل SWOT مع التركيز على فرص رؤية 2030', 
          completed: true,
          details: 'تحليل يربط نقاط القوة بأهداف التحول الوطني والاقتصاد الرقمي'
        },
        { 
          id: 4, 
          title: 'رفع تقرير تشخيصي متوافق مع المعايير المحلية', 
          completed: true,
          details: 'تقرير يتضمن توصيات تتماشى مع نظام العمل السعودي والسعودة'
        }
      ]
    },
    {
      id: '2',
      title: 'تصميم الهيكل والعمليات',
      description: 'هيكل تنظيمي محدث + خريطة عمليات متوافقة مع الأنظمة السعودية',
      status: 'in-progress',
      progress: 75,
      phase: 'تصميم',
      kpis: ['الكفاءة التشغيلية', 'سرعة الاستجابة', 'جودة الخدمة'],
      impact: { performance: 85, cost: 70, satisfaction: 80 },
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 300000,
      department: 'تكنولوجيا المعلومات',
      regulations: ['نظام الشركات السعودي', 'لائحة الحوكمة', 'نظام العمل', 'أنظمة ساما'],
      approvals: [
        { role: 'مدير تطوير تنظيمي', status: 'approved', date: '2024-01-20', entity: 'إدارة التطوير' },
        { role: 'مدير الموارد البشرية', status: 'approved', date: '2024-01-21', entity: 'قسم الموارد البشرية' },
        { role: 'المستشار القانوني', status: 'pending', entity: 'الإدارة القانونية' },
        { role: 'الرئيس التنفيذي', status: 'pending', entity: 'مجلس الإدارة' }
      ],
      steps: [
        { 
          id: 1, 
          title: 'تصميم هيكل تنظيمي يراعي متطلبات السعودة (75%)', 
          completed: true,
          details: 'هيكل يضمن نسب السعودة المطلوبة ويدعم التطوير المهني للمواطنين'
        },
        { 
          id: 2, 
          title: 'تحديد الوحدات الإدارية وفقاً لمعايير الحوكمة المؤسسية', 
          completed: true,
          details: 'فصل واضح للمسؤوليات مع لجان المراجعة والمخاطر والامتثال'
        },
        { 
          id: 3, 
          title: 'تصميم خريطة العمليات الرقمية (تماشياً مع التحول الرقمي)', 
          completed: true,
          details: 'عمليات رقمية تدعم مبادرات الحكومة الإلكترونية والذكاء الاصطناعي'
        },
        { 
          id: 4, 
          title: 'مراجعة الأدوار الوظيفية لضمان التوافق مع قانون العمل', 
          completed: false,
          details: 'مراجعة شاملة تضمن التوافق مع ساعات العمل والإجازات والحقوق'
        }
      ]
    },
    {
      id: '3',
      title: 'برنامج تطوير المهارات القيادية',
      description: 'تطوير مهارات القيادة للمدراء التنفيذيين والمتوسطين',
      status: 'planning',
      progress: 25,
      phase: 'تخطيط',
      kpis: ['مهارات القيادة', 'الأداء الإداري', 'الرضا الوظيفي'],
      impact: { performance: 0, cost: 0, satisfaction: 0 },
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      budget: 500000,
      department: 'التطوير والتدريب',
      regulations: ['نظام العمل', 'لوائح التدريب المهني', 'معايير المؤسسة العامة للتدريب التقني'],
      approvals: [
        { role: 'مدير التدريب والتطوير', status: 'pending', entity: 'إدارة التدريب' },
        { role: 'مدير تطوير تنظيمي', status: 'pending', entity: 'إدارة التطوير' },
        { role: 'مدير الموارد البشرية', status: 'pending', entity: 'الموارد البشرية' },
        { role: 'الرئيس التنفيذي', status: 'pending', entity: 'الإدارة العليا' }
      ],
      steps: [
        { 
          id: 1, 
          title: 'إعداد خطة إدارة التغيير (تراعي الثقافة السعودية والتنوع)', 
          completed: false,
          details: 'خطة تأخذ في الاعتبار التدرج الثقافي وإشراك المواطنين في القيادة'
        },
        { 
          id: 2, 
          title: 'تصميم برامج التوعية باللغة العربية', 
          completed: false,
          details: 'مواد تدريبية باللغة العربية تراعي المصطلحات المحلية والسياق الثقافي'
        },
        { 
          id: 3, 
          title: 'تنفيذ الورش مع مراعاة أوقات الصلاة والمناسبات الدينية', 
          completed: false,
          details: 'جدولة تراعي الأعياد والمناسبات الدينية وأوقات الصلاة'
        },
        { 
          id: 4, 
          title: 'قياس الجاهزية وفقاً لمؤشرات الأداء المحلية', 
          completed: false,
          details: 'مؤشرات تقيس التطبيق الفعلي والالتزام بالأنظمة المحلية'
        }
      ]
    }
  ];

  // Mock data for happiness index
  const happinessData: HappinessData[] = [
    {
      department: 'الموارد البشرية',
      currentScore: 4.8,
      previousScore: 4.5,
      trend: 'up',
      rank: 1,
      employees: 25,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'تكنولوجيا المعلومات',
      currentScore: 4.7,
      previousScore: 4.2,
      trend: 'up',
      rank: 2,
      employees: 45,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'المالية',
      currentScore: 4.5,
      previousScore: 4.6,
      trend: 'down',
      rank: 3,
      employees: 30,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'المبيعات',
      currentScore: 4.3,
      previousScore: 4.1,
      trend: 'up',
      rank: 4,
      employees: 60,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'العمليات',
      currentScore: 4.1,
      previousScore: 4.3,
      trend: 'down',
      rank: 5,
      employees: 80,
      lastUpdated: '2024-03-15'
    }
  ];

  // Mock data for leaderboard
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      department: 'الموارد البشرية',
      score: 4.8,
      improvement: 6.7,
      badge: 'مبدع التغيير',
      employees: 25
    },
    {
      rank: 2,
      department: 'تكنولوجيا المعلومات',
      score: 4.7,
      improvement: 11.9,
      badge: 'رائد التطوير',
      employees: 45
    },
    {
      rank: 3,
      department: 'المبيعات',
      score: 4.3,
      improvement: 4.9,
      badge: 'محفز النمو',
      employees: 60
    }
  ];

  // Chart data
  const progressChartData = [
    { month: 'يناير', completed: 1, inProgress: 2, planned: 3 },
    { month: 'فبراير', completed: 1, inProgress: 2, planned: 3 },
    { month: 'مارس', completed: 1, inProgress: 2, planned: 3 },
    { month: 'أبريل', completed: 2, inProgress: 1, planned: 3 },
    { month: 'مايو', completed: 2, inProgress: 2, planned: 2 },
    { month: 'يونيو', completed: 3, inProgress: 2, planned: 1 }
  ];

  const impactData = [
    { name: 'الأداء', value: 85, color: '#22c55e' },
    { name: 'التكلفة', value: 75, color: '#3b82f6' },
    { name: 'الرضا', value: 80, color: '#f59e0b' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-hold': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in-progress': return 'قيد التنفيذ';
      case 'planning': return 'قيد التخطيط';
      case 'on-hold': return 'متوقف مؤقتاً';
      default: return status;
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getApprovalStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'موافق';
      case 'pending': return 'قيد المراجعة';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'مبدع التغيير': return <Lightbulb className="h-4 w-4" />;
      case 'رائد التطوير': return <Zap className="h-4 w-4" />;
      case 'محفز النمو': return <TrendingUp className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const toggleSteps = (initiativeId: string) => {
    const id = parseInt(initiativeId);
    setExpandedSteps(prev => 
      prev.includes(id) 
        ? prev.filter(stepId => stepId !== id)
        : [...prev, id]
    );
  };

  const filteredInitiatives = initiatives.filter(initiative =>
    initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
    setIsViewDetailsOpen(true);
  };

  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة الذكية', icon: BarChart3 },
    { id: 'initiatives', label: 'مبادرات التطوير', icon: Target },
    { id: 'restructuring', label: 'إعادة الهيكلة', icon: Shuffle },
    { id: 'change-management', label: 'إدارة التغيير', icon: GitBranch },
    { id: 'governance', label: 'الحوكمة والامتثال', icon: Shield },
    { id: 'maturity', label: 'قياس النضج', icon: CheckCircle2 },
    { id: 'impact', label: 'قياس الأثر المؤسسي', icon: TrendingUp },
    { id: 'happiness', label: 'مؤشر السعادة', icon: Smile },
    { id: 'leaderboard', label: 'لوحة الشرف', icon: Trophy },
    { id: 'integration', label: 'تكامل البوابة', icon: Users }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Main Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المبادرات النشطة</p>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">+2 من الشهر السابق</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الإنجاز</p>
                <p className="text-3xl font-bold text-green-600">78%</p>
                <p className="text-xs text-muted-foreground">+5% من الشهر السابق</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مؤشر السعادة العام</p>
                <p className="text-3xl font-bold text-yellow-600">4.5</p>
                <p className="text-xs text-muted-foreground">من 5.0</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Smile className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الأثر المالي</p>
                <p className="text-3xl font-bold text-blue-600">+2.3M</p>
                <p className="text-xs text-muted-foreground">ريال سعودي</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              تقدم المبادرات عبر الزمن
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#22c55e" fill="#22c55e" name="مكتمل" />
                <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="قيد التنفيذ" />
                <Area type="monotone" dataKey="planned" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="مخطط" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              قياس الأثر المؤسسي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={impactData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            الأنشطة الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {initiatives.slice(0, 3).map((initiative) => (
              <div key={initiative.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{initiative.title}</h4>
                    <p className="text-sm text-muted-foreground">{initiative.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(initiative.status)}>
                    {getStatusText(initiative.status)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">{initiative.progress}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-300" 
                        style={{ width: `${initiative.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInitiatives = () => (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مبادرات التطوير المؤسسي</h2>
          <p className="text-muted-foreground">إدارة وتتبع جميع مبادرات التطوير والتحول المؤسسي</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في المبادرات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isNewInitiativeOpen} onOpenChange={setIsNewInitiativeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                مبادرة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة مبادرة تطوير جديدة</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">عنوان المبادرة</label>
                  <Input placeholder="اسم المبادرة" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">القسم المسؤول</label>
                  <Input placeholder="اختر القسم" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">وصف المبادرة</label>
                  <Textarea placeholder="وصف تفصيلي للمبادرة وأهدافها" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ البدء</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ الانتهاء</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">الميزانية المقدرة</label>
                  <Input placeholder="المبلغ بالريال السعودي" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">المرحلة</label>
                  <Input placeholder="مرحلة المبادرة" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewInitiativeOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => setIsNewInitiativeOpen(false)}>
                  حفظ المبادرة
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInitiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{initiative.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{initiative.department}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(initiative.status)}>
                  {getStatusText(initiative.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{initiative.description}</p>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">التقدم</span>
                  <span className="text-sm font-medium">{initiative.progress}%</span>
                </div>
                <Progress value={initiative.progress} className="h-2" />
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">الأداء</p>
                  <p className="font-medium text-green-600">{initiative.impact.performance}%</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">التكلفة</p>
                  <p className="font-medium text-blue-600">{initiative.impact.cost}%</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">الرضا</p>
                  <p className="font-medium text-yellow-600">{initiative.impact.satisfaction}%</p>
                </div>
              </div>

              {/* Regulations */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">الأنظمة واللوائح المطبقة:</p>
                <div className="flex flex-wrap gap-1">
                  {initiative.regulations.slice(0, 2).map((regulation, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {regulation}
                    </Badge>
                  ))}
                  {initiative.regulations.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{initiative.regulations.length - 2} أخرى
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewDetails(initiative)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleSteps(initiative.id)}
                >
                  {expandedSteps.includes(parseInt(initiative.id)) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Expanded Steps */}
              {expandedSteps.includes(parseInt(initiative.id)) && (
                <div className="mt-4 space-y-2 border-t pt-4">
                  <h4 className="font-medium text-sm">خطوات التنفيذ:</h4>
                  {initiative.steps.map((step) => (
                    <div key={step.id} className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg">
                      <div className={`w-4 h-4 rounded-full mt-0.5 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Initiative Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              تفاصيل المبادرة: {selectedInitiative?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedInitiative && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">القسم المسؤول</label>
                  <p className="font-medium">{selectedInitiative.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">المرحلة الحالية</label>
                  <p className="font-medium">{selectedInitiative.phase}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">تاريخ البدء</label>
                  <p className="font-medium">{new Date(selectedInitiative.startDate).toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">تاريخ الانتهاء</label>
                  <p className="font-medium">{new Date(selectedInitiative.endDate).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">وصف المبادرة</label>
                <p className="mt-1">{selectedInitiative.description}</p>
              </div>

              {/* Progress and Impact */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">نسبة الإنجاز</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{selectedInitiative.progress}%</div>
                      <Progress value={selectedInitiative.progress} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">الميزانية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {selectedInitiative.budget.toLocaleString()} ريال
                      </div>
                      <p className="text-sm text-muted-foreground">الميزانية المخصصة</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">حالة الموافقات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedInitiative.approvals.map((approval, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{approval.role}</p>
                          <p className="text-sm text-muted-foreground">{approval.entity}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${getApprovalStatusColor(approval.status)}`}>
                            {getApprovalStatusText(approval.status)}
                          </p>
                          {approval.date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(approval.date).toLocaleDateString('ar-SA')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">خطوات التنفيذ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedInitiative.steps.map((step) => (
                      <div key={step.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed && (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{step.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Regulations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">الأنظمة واللوائح المطبقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedInitiative.regulations.map((regulation, index) => (
                      <Badge key={index} variant="outline">
                        {regulation}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderRestructuring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إعادة الهيكلة الإدارية</h2>
          <p className="text-muted-foreground">أدوات متقدمة لإعادة تصميم الهيكل التنظيمي</p>
        </div>
        <Button>
          <Shuffle className="h-4 w-4 mr-2" />
          مشروع إعادة هيكلة جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أدوات التصميم التفاعلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                منشئ المخططات التنظيمية الذكي
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                محلل الأدوار والمسؤوليات
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                مقارن الهياكل (قبل/بعد)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Lightbulb className="h-4 w-4 mr-2" />
                توصيات الذكاء الاصطناعي
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                محاكي السيناريوهات
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مشاريع إعادة الهيكلة النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">إعادة هيكلة قسم المبيعات</h4>
                  <Badge className="bg-blue-100 text-blue-800">قيد التنفيذ</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  تحسين الكفاءة وتوزيع المهام بما يتماشى مع أهداف رؤية 2030
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">التقدم:</span>
                    <span className="font-medium ml-2">65%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المدة المتبقية:</span>
                    <span className="font-medium ml-2">3 أسابيع</span>
                  </div>
                </div>
                <Progress value={65} className="mt-2" />
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">دمج أقسام التسويق الرقمي</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">قيد التخطيط</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  توحيد الجهود التسويقية لدعم التحول الرقمي
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">التقدم:</span>
                    <span className="font-medium ml-2">20%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">البدء المتوقع:</span>
                    <span className="font-medium ml-2">الشهر القادم</span>
                  </div>
                </div>
                <Progress value={20} className="mt-2" />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">تطوير وحدة الذكاء الاصطناعي</h4>
                  <Badge className="bg-green-100 text-green-800">جديد</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  إنشاء وحدة متخصصة في تطبيقات الذكاء الاصطناعي
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">المرحلة:</span>
                    <span className="font-medium ml-2">دراسة جدوى</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الميزانية:</span>
                    <span className="font-medium ml-2">500K ريال</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Matrix Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>مصفوفة مقارنة الهياكل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-center">الهيكل الحالي</h4>
              <div className="space-y-2">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium">الإدارة العليا</div>
                  <div className="text-sm text-muted-foreground">3 مدراء تنفيذيين</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mr-4">
                  <div className="font-medium">قسم المبيعات</div>
                  <div className="text-sm text-muted-foreground">15 موظف، كفاءة 65%</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mr-4">
                  <div className="font-medium">قسم التسويق</div>
                  <div className="text-sm text-muted-foreground">8 موظفين، تداخل في المهام</div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mr-4">
                  <div className="font-medium">قسم خدمة العملاء</div>
                  <div className="text-sm text-muted-foreground">12 موظف، استجابة بطيئة</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-center">الهيكل المقترح</h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium">الإدارة العليا</div>
                  <div className="text-sm text-muted-foreground">2 مدراء تنفيذيين</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mr-4">
                  <div className="font-medium">وحدة تجربة العملاء</div>
                  <div className="text-sm text-muted-foreground">20 موظف، كفاءة متوقعة 85%</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mr-8">
                  <div className="font-medium">فريق المبيعات الرقمية</div>
                  <div className="text-sm text-muted-foreground">10 موظفين متخصصين</div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mr-8">
                  <div className="font-medium">فريق التسويق التفاعلي</div>
                  <div className="text-sm text-muted-foreground">8 موظفين، مهام محددة</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg mr-4">
                  <div className="font-medium">وحدة الذكاء الاصطناعي</div>
                  <div className="text-sm text-muted-foreground">5 متخصصين جدد</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              توصيات الذكاء الاصطناعي
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• تحسين الكفاءة بنسبة 30% من خلال دمج الأقسام المترابطة</li>
              <li>• توفير 200K ريال سنوياً من تكاليف التشغيل</li>
              <li>• زيادة سرعة الاستجابة للعملاء بنسبة 50%</li>
              <li>• إمكانية توظيف متخصصين في الذكاء الاصطناعي</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChangeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">إدارة التغيير المؤسسي</h2>
          <p className="text-muted-foreground">إدارة شاملة لعمليات التغيير وفقاً لأفضل الممارسات</p>
        </div>
        <Button>
          <GitBranch className="h-4 w-4 mr-2" />
          خطة تغيير جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نموذج ADKAR للتغيير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">الوعي (Awareness)</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">فهم ضرورة التغيير وأسبابه</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">الرغبة (Desire)</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">الدافع للمشاركة ودعم التغيير</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">المعرفة (Knowledge)</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">المهارات والمعرفة اللازمة</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">القدرة (Ability)</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">تطبيق المهارات والسلوكيات</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">التعزيز (Reinforcement)</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">استدامة التغيير وتعزيزه</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>جاهزية الإدارات للتغيير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium">الموارد البشرية</span>
                    <p className="text-xs text-muted-foreground">جاهزية 92%</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">جاهز</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="font-medium">تكنولوجيا المعلومات</span>
                    <p className="text-xs text-muted-foreground">جاهزية 78%</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">قيد التحضير</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <span className="font-medium">المالية</span>
                    <p className="text-xs text-muted-foreground">جاهزية 65%</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">يحتاج دعم</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <span className="font-medium">العمليات</span>
                    <p className="text-xs text-muted-foreground">جاهزية 40%</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">يحتاج تدخل</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-purple-600" />
                  <div>
                    <span className="font-medium">المبيعات</span>
                    <p className="text-xs text-muted-foreground">جاهزية 88%</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">متفوق</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>خطة التواصل الداخلي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                إرسال تحديث شهري
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                جلسة أسئلة وأجوبة
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                ورشة تدريبية
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                مسح رضا الموظفين
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                برنامج التقدير والحوافز
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Lightbulb className="h-4 w-4 mr-2" />
                جلسة عصف ذهني
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>خريطة زمنية للتغيير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">مرحلة التهيئة والإعداد</h4>
                  <Badge className="bg-green-100 text-green-800">مكتمل</Badge>
                </div>
                <p className="text-sm text-muted-foreground">يناير - فبراير 2024</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  <li>• تحديد أهداف التغيير وأصحاب المصلحة</li>
                  <li>• تشكيل فريق إدارة التغيير</li>
                  <li>• وضع استراتيجية التواصل</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">مرحلة التنفيذ التدريجي</h4>
                  <Badge className="bg-blue-100 text-blue-800">قيد التنفيذ</Badge>
                </div>
                <p className="text-sm text-muted-foreground">مارس - يونيو 2024</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  <li>• تطبيق التغييرات على مراحل</li>
                  <li>• برامج التدريب والتأهيل</li>
                  <li>• متابعة التقدم وحل المشاكل</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">مرحلة التقييم والتحسين</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">مجدول</Badge>
                </div>
                <p className="text-sm text-muted-foreground">يوليو - أغسطس 2024</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  <li>• قياس نتائج التغيير</li>
                  <li>• جمع التغذية الراجعة</li>
                  <li>• تطبيق التحسينات اللازمة</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">مرحلة الاستدامة والتعزيز</h4>
                  <Badge className="bg-purple-100 text-purple-800">مخطط</Badge>
                </div>
                <p className="text-sm text-muted-foreground">سبتمبر 2024 فما بعد</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  <li>• ترسيخ التغييرات الجديدة</li>
                  <li>• برامج التعزيز المستمر</li>
                  <li>• مراقبة الأداء طويل المدى</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'initiatives': return renderInitiatives();
      case 'restructuring': return renderRestructuring();
      case 'change-management': return renderChangeManagement();
      case 'governance': return (
        <div className="p-8 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">الحوكمة والامتثال</h3>
          <p className="text-muted-foreground">قريباً - نظام شامل لإدارة الحوكمة والامتثال</p>
        </div>
      );
      case 'maturity': return (
        <div className="p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">قياس النضج المؤسسي</h3>
          <p className="text-muted-foreground">قريباً - أدوات تقييم النضج المؤسسي</p>
        </div>
      );
      case 'impact': return (
        <div className="p-8 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">قياس الأثر المؤسسي</h3>
          <p className="text-muted-foreground">قريباً - لوحة قياس الأثر الشاملة</p>
        </div>
      );
      case 'happiness': return (
        <div className="p-8 text-center">
          <Smile className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">مؤشر السعادة الوظيفية</h3>
          <p className="text-muted-foreground">قريباً - نظام قياس السعادة والرضا</p>
        </div>
      );
      case 'leaderboard': return (
        <div className="p-8 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">لوحة الشرف التفاعلية</h3>
          <p className="text-muted-foreground">قريباً - لوحة شرف للإدارات المتميزة</p>
        </div>
      );
      case 'integration': return (
        <div className="p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">تكامل بوابة الموظفين</h3>
          <p className="text-muted-foreground">قريباً - تكامل مع بوابة الخدمة الذاتية</p>
        </div>
      );
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SystemHeader
        title="التطوير المؤسسي والتحول التنظيمي الشامل"
        description="منصة متقدمة ومتكاملة لإدارة جميع مبادرات التطوير والتحول المؤسسي مع قياس الأثر ومؤشر السعادة"
        icon={<Building2 className="h-8 w-8" />}
        onBack={onBack}
        showBackButton={true}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Advanced Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-border/20 p-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 bg-transparent h-auto p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 border border-border/20 data-[state=active]:border-primary"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content with consistent styling */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-border/20 p-6">
            {renderContent()}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveOrganizationalDevelopment;