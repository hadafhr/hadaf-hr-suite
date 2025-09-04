import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Award, 
  Target,
  Star,
  Brain,
  Zap,
  BookOpen,
  UserCheck,
  Calendar,
  Filter,
  Search,
  Plus,
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  Rocket,
  MapPin,
  Route,
  Users2,
  GraduationCap,
  Crown,
  ArrowRight,
  Edit,
  Eye,
  Building2,
  Briefcase,
  TrendingUpIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie, ScatterChart, Scatter } from 'recharts';

// New Interfaces for Comprehensive Talent Management System
interface ComprehensiveTalentManagementProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  performance: number;
  potential: 'High' | 'Medium' | 'Low';
  engagement: number;
  skills: string[];
  careerGoals: string[];
  retentionRisk: 'Low' | 'Medium' | 'High';
  nextReviewDate: string;
  yearsOfService: number;
  certifications: number;
  readinessLevel: 'Ready Now' | '1-2 Years' | '2-3 Years';
}

interface CareerPath {
  id: string;
  employeeId: string;
  employeeName: string;
  currentPosition: string;
  targetPosition: string;
  milestones: {
    title: string;
    skills: string[];
    timeline: string;
    completed: boolean;
  }[];
  progress: number;
  estimatedCompletion: string;
}

interface InternalJob {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  applicationDeadline: string;
  applicants: {
    id: string;
    name: string;
    currentPosition: string;
    matchScore: number;
  }[];
  status: 'Open' | 'Under Review' | 'Closed';
}

interface KnowledgeTransfer {
  id: string;
  fromEmployee: string;
  toEmployee: string;
  knowledgeArea: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In Progress' | 'Completed';
  progress: number;
  tasks: string[];
  deadline: string;
}

interface FutureLeader {
  id: string;
  employeeId: string;
  employeeName: string;
  program: string;
  startDate: string;
  progress: number;
  competencies: {
    name: string;
    current: number;
    target: number;
  }[];
  mentorName: string;
  nextMilestone: string;
}

export const ComprehensiveTalentManagement: React.FC<ComprehensiveTalentManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for comprehensive system
  const employees: Employee[] = [
    {
      id: '1',
      name: 'أحمد محمد علي',
      position: 'مطور أول',
      department: 'تقنية المعلومات',
      avatar: '/placeholder.svg',
      performance: 92,
      potential: 'High',
      engagement: 88,
      skills: ['React', 'Node.js', 'القيادة التقنية'],
      careerGoals: ['مدير تقني', 'رئيس قسم التطوير'],
      retentionRisk: 'Low',
      nextReviewDate: '2024-03-15',
      yearsOfService: 3.5,
      certifications: 5,
      readinessLevel: '1-2 Years'
    },
    {
      id: '2', 
      name: 'فاطمة السالم',
      position: 'محلل أعمال أول',
      department: 'العمليات',
      avatar: '/placeholder.svg',
      performance: 88,
      potential: 'High',
      engagement: 90,
      skills: ['تحليل البيانات', 'إدارة المشاريع', 'التواصل'],
      careerGoals: ['مدير عمليات', 'مدير استراتيجية'],
      retentionRisk: 'Low',
      nextReviewDate: '2024-04-01',
      yearsOfService: 2.8,
      certifications: 3,
      readinessLevel: 'Ready Now'
    },
    {
      id: '3',
      name: 'محمد الخليفي',
      position: 'مسؤول موارد بشرية',
      department: 'الموارد البشرية',
      avatar: '/placeholder.svg',
      performance: 75,
      potential: 'Medium',
      engagement: 78,
      skills: ['إدارة الموارد البشرية', 'التدريب', 'السياسات'],
      careerGoals: ['مدير موارد بشرية', 'استشاري HR'],
      retentionRisk: 'Medium',
      nextReviewDate: '2024-05-15',
      yearsOfService: 4.2,
      certifications: 2,
      readinessLevel: '2-3 Years'
    }
  ];

  const careerPaths: CareerPath[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'أحمد محمد علي',
      currentPosition: 'مطور أول',
      targetPosition: 'مدير تقني',
      milestones: [
        {
          title: 'تطوير مهارات القيادة',
          skills: ['إدارة الفريق', 'اتخاذ القرارات', 'التواصل'],
          timeline: '6 أشهر',
          completed: true
        },
        {
          title: 'إدارة مشروع كبير',
          skills: ['إدارة المشاريع', 'التخطيط الاستراتيجي'],
          timeline: '8 أشهر',
          completed: false
        }
      ],
      progress: 65,
      estimatedCompletion: '2025-06-30'
    }
  ];

  const internalJobs: InternalJob[] = [
    {
      id: '1',
      title: 'مدير تقنية المعلومات',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      description: 'قيادة فريق التطوير وإدارة المشاريع التقنية',
      requirements: ['خبرة 5+ سنوات', 'مهارات قيادية', 'شهادات تقنية'],
      applicationDeadline: '2024-04-30',
      applicants: [
        { id: '1', name: 'أحمد محمد علي', currentPosition: 'مطور أول', matchScore: 85 },
        { id: '3', name: 'سارة الأحمد', currentPosition: 'مطور', matchScore: 72 }
      ],
      status: 'Open'
    }
  ];

  const knowledgeTransfers: KnowledgeTransfer[] = [
    {
      id: '1',
      fromEmployee: 'سعد الأحمد',
      toEmployee: 'أحمد محمد علي',
      knowledgeArea: 'إدارة البنية التحتية',
      priority: 'High',
      status: 'In Progress',
      progress: 70,
      tasks: ['توثيق الأنظمة', 'نقل كلمات المرور', 'شرح العمليات'],
      deadline: '2024-05-01'
    }
  ];

  const futureLeaders: FutureLeader[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'أحمد محمد علي',
      program: 'برنامج القادة التقنيين',
      startDate: '2024-01-01',
      progress: 45,
      competencies: [
        { name: 'القيادة الاستراتيجية', current: 7, target: 9 },
        { name: 'إدارة التغيير', current: 6, target: 8 },
        { name: 'التواصل التنفيذي', current: 8, target: 9 }
      ],
      mentorName: 'د. محمد العتيبي',
      nextMilestone: 'تقديم مشروع القيادة'
    }
  ];

  const dashboardMetrics = {
    totalTalents: employees.length,
    highPotential: employees.filter(e => e.potential === 'High').length,
    readyNow: employees.filter(e => e.readinessLevel === 'Ready Now').length,
    averageEngagement: Math.round(employees.reduce((acc, e) => acc + e.engagement, 0) / employees.length),
    retentionRate: 94,
    internalMobility: internalJobs.length,
    knowledgeTransferActive: knowledgeTransfers.filter(kt => kt.status === 'In Progress').length,
    futureLeadersProgram: futureLeaders.length
  };

  const performanceMatrix = employees.map(emp => ({
    name: emp.name.split(' ')[0],
    performance: emp.performance,
    potential: emp.potential === 'High' ? 85 : emp.potential === 'Medium' ? 65 : 45,
    category: emp.performance >= 85 && emp.potential === 'High' ? 'Stars' :
              emp.performance >= 85 && emp.potential === 'Medium' ? 'High Performer' :
              emp.performance < 85 && emp.potential === 'High' ? 'High Potential' : 'Core Player'
  }));

  const skillsGapData = [
    { skill: 'القيادة الاستراتيجية', current: 65, required: 85, gap: 20 },
    { skill: 'التحول الرقمي', current: 70, required: 90, gap: 20 },
    { skill: 'إدارة التغيير', current: 60, required: 80, gap: 20 },
    { skill: 'تحليل البيانات', current: 75, required: 85, gap: 10 }
  ];

  const performanceData = [
    { month: 'يناير', performance: 78, engagement: 82, retention: 95 },
    { month: 'فبراير', performance: 82, engagement: 85, retention: 94 },
    { month: 'مارس', performance: 85, engagement: 88, retention: 96 },
    { month: 'أبريل', performance: 88, engagement: 90, retention: 97 },
    { month: 'مايو', performance: 90, engagement: 92, retention: 98 },
    { month: 'يونيو', performance: 92, engagement: 94, retention: 97 }
  ];

  const skillsDistribution = [
    { name: 'التقنية', value: 35, color: '#3CB593' },
    { name: 'القيادة', value: 25, color: '#10b981' },
    { name: 'التواصل', value: 20, color: '#f59e0b' },
    { name: 'التحليل', value: 20, color: '#ef4444' }
  ];

  const developmentPlans = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'أحمد محمد علي',
      title: 'خطة تطوير القيادة التقنية',
      description: 'تطوير مهارات القيادة والإدارة التقنية',
      skills: ['القيادة', 'إدارة الفريق', 'التفكير الاستراتيجي'],
      timeline: '6 أشهر',
      progress: 65,
      status: 'Active' as const,
      mentor: 'سعد الأحمد - مدير التطوير',
      startDate: '2024-01-01',
      targetDate: '2024-06-30'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'فاطمة السالم',
      title: 'برنامج تطوير المهارات الإدارية',
      description: 'تطوير مهارات الإدارة وإدارة المشاريع',
      skills: ['إدارة المشاريع', 'التخطيط الاستراتيجي', 'تحليل البيانات'],
      timeline: '8 أشهر',
      progress: 40,
      status: 'Active' as const,
      mentor: 'نورا الكندري - مديرة العمليات',
      startDate: '2024-02-01',
      targetDate: '2024-09-30'
    }
  ];

  const successionPlans = [
    {
      id: '1',
      position: 'مدير تقنية المعلومات',
      currentHolder: 'سعد الأحمد',
      successors: [
        { name: 'أحمد محمد علي', readiness: '1-2 Years' as const, probability: 85 },
        { name: 'محمد الخليفي', readiness: '2-3 Years' as const, probability: 70 }
      ],
      criticalLevel: 'High' as const
    },
    {
      id: '2',
      position: 'مديرة العمليات',
      currentHolder: 'نورا الكندري',
      successors: [
        { name: 'فاطمة السالم', readiness: '1-2 Years' as const, probability: 90 },
        { name: 'سارة المطيري', readiness: 'Ready Now' as const, probability: 75 }
      ],
      criticalLevel: 'Medium' as const
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Active': 'default',
      'Completed': 'secondary',
      'On Hold': 'destructive',
      'High': 'destructive',
      'Medium': 'secondary',
      'Low': 'default'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPotentialBadge = (potential: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'High': 'default',
      'Medium': 'secondary', 
      'Low': 'outline'
    };
    return <Badge variant={variants[potential] || 'default'}>{potential}</Badge>;
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-white border-b border-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3CB593]/5 to-transparent"></div>
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#3CB593]/10 border border-[#3CB593]/20">
                <div className="relative">
                  <Star className="h-8 w-8 text-[#3CB593]" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#3CB593]"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  قسم إدارة المواهب
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  منظومة متكاملة لإدارة وتطوير المواهب والمسارات الوظيفية مع خطط الخلافة والتوظيف الداخلي
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-50">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button size="sm" className="bg-[#3CB593] hover:bg-[#3CB593]/90 text-white">
              <Plus className="h-4 w-4 ml-2" />
              إضافة موهبة
            </Button>
          </div>
        </div>
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
                <p className="text-sm text-muted-foreground">إجمالي المواهب</p>
                <p className="text-2xl font-bold text-primary">{dashboardMetrics.totalTalents}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مواهب عالية الإمكانات</p>
                <p className="text-2xl font-bold text-emerald-600">{dashboardMetrics.highPotential}</p>
              </div>
              <Star className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">خطط التطوير النشطة</p>
                <p className="text-2xl font-bold text-orange-600">{dashboardMetrics.internalMobility}</p>
              </div>
              <Rocket className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط المشاركة</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardMetrics.averageEngagement}%</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الاحتفاظ</p>
                <p className="text-2xl font-bold text-green-600">{dashboardMetrics.retentionRate}%</p>
              </div>
              <Trophy className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">خلفاء جاهزون</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardMetrics.readyNow}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-500/60" />
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
              تطور الأداء والمشاركة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="performance" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="engagement" stackId="2" stroke="#10b981" fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المهارات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={skillsDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillsDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">إيجابي</span>
              </div>
              <p className="text-sm text-emerald-700">
                ارتفاع ملحوظ في مستويات المشاركة بنسبة 15% خلال الربع الأخير
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحذير</span>
              </div>
              <p className="text-sm text-orange-700">
                5 موظفين يحتاجون لخطط تطوير عاجلة لتجنب مخاطر الاستقالة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                فرصة لتطوير 8 مواهب واعدة لمناصب قيادية خلال العام القادم
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemOverview = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          نظرة عامة على منظومة إدارة المواهب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
            <Star className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">اكتشاف المواهب</h3>
            <p className="text-sm text-muted-foreground">
              تحديد وتقييم المواهب الواعدة باستخدام مؤشرات الأداء والإمكانات
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-emerald-300 hover:border-emerald-400 transition-colors">
            <Rocket className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">خطط التطوير</h3>
            <p className="text-sm text-muted-foreground">
              برامج تطوير مخصصة لكل موهبة وفقاً لأهدافها المهنية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
            <Trophy className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">خطط الخلافة</h3>
            <p className="text-sm text-muted-foreground">
              تخطيط استراتيجي لضمان استمرارية القيادة في المناصب الحيوية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
            <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">تحليلات متقدمة</h3>
            <p className="text-sm text-muted-foreground">
              رؤى مدعومة بالذكاء الاصطناعي لاتخاذ قرارات مدروسة
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
            <Zap className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">برامج الاحتفاظ</h3>
            <p className="text-sm text-muted-foreground">
              استراتيجيات مبتكرة للاحتفاظ بأفضل المواهب وزيادة مشاركتهم
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
            <BookOpen className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">التعلم المستمر</h3>
            <p className="text-sm text-muted-foreground">
              منصات التعلم الذكية وبرامج التطوير المهني المستمر
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTalentProfiles = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المواهب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="تصفية حسب..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المواهب</SelectItem>
            <SelectItem value="high-potential">عالي الإمكانات</SelectItem>
            <SelectItem value="high-performance">عالي الأداء</SelectItem>
            <SelectItem value="at-risk">في خطر</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة موهبة
        </Button>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((talent) => (
          <Card key={talent.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={talent.avatar} />
                    <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{talent.name}</h3>
                    <p className="text-sm text-muted-foreground">{talent.position}</p>
                    <p className="text-xs text-muted-foreground">{talent.department}</p>
                  </div>
                </div>
                {getPotentialBadge(talent.potential)}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>الأداء</span>
                    <span>{talent.performance}%</span>
                  </div>
                  <Progress value={talent.performance} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>المشاركة</span>
                    <span>{talent.engagement}%</span>
                  </div>
                  <Progress value={talent.engagement} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {talent.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {talent.skills.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{talent.skills.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>مخاطر الاستقالة: {getStatusBadge(talent.retentionRisk)}</span>
                  <span>{talent.yearsOfService} سنوات خدمة</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  عرض الملف
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  خطة التطوير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDevelopmentPlans = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">خطط التطوير النشطة</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          خطة تطوير جديدة
        </Button>
      </div>

      <div className="grid gap-6">
        {developmentPlans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{plan.title}</h4>
                  <p className="text-muted-foreground">{plan.employeeName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>
                {getStatusBadge(plan.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">المهارات المستهدفة</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {plan.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المدة الزمنية</Label>
                  <p className="text-sm font-medium">{plan.timeline}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المرشد</Label>
                  <p className="text-sm font-medium">{plan.mentor}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم</span>
                  <span>{plan.progress}%</span>
                </div>
                <Progress value={plan.progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 inline ml-1" />
                  {plan.startDate} - {plan.targetDate}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">عرض التفاصيل</Button>
                  <Button variant="outline" size="sm">تحديث التقدم</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSuccessionPlanning = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">خطط الخلافة</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          خطة خلافة جديدة
        </Button>
      </div>

      <div className="grid gap-6">
        {successionPlans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{plan.position}</h4>
                  <p className="text-muted-foreground">الشاغل الحالي: {plan.currentHolder}</p>
                </div>
                {getStatusBadge(plan.criticalLevel)}
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">الخلفاء المحتملون:</Label>
                {plan.successors.map((successor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{successor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{successor.name}</p>
                        <p className="text-xs text-muted-foreground">جاهزية: {successor.readiness}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{successor.probability}%</p>
                      <Progress value={successor.probability} className="w-16 h-1 mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">عرض التفاصيل</Button>
                <Button variant="outline" size="sm">تحديث الخطة</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة المعلومات
            </TabsTrigger>
            <TabsTrigger value="talents" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              ملفات المواهب
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              خطط التطوير
            </TabsTrigger>
            <TabsTrigger value="succession" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              خطط الخلافة
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
            {renderSystemOverview()}
          </TabsContent>

          <TabsContent value="talents" className="space-y-6">
            {renderTalentProfiles()}
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            {renderDevelopmentPlans()}
          </TabsContent>

          <TabsContent value="succession" className="space-y-6">
            {renderSuccessionPlanning()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير إدارة المواهب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    تقرير المواهب الشامل
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    تحليل الأداء والإمكانات
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    تقرير خطط الخلافة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};