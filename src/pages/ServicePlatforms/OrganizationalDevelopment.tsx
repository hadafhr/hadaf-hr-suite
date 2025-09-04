import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, Users, TrendingUp, Lightbulb, Plus, Calendar, Award, 
  CheckCircle, Clock, ArrowRight, AlertCircle, FileText, 
  Search, Settings, BookOpen, Workflow, ChevronDown, ChevronUp,
  User, UserCheck, Building2, ClipboardCheck, Smile, Trophy,
  BarChart3, Shuffle, GitBranch, Shield, Star, Heart, Crown,
  Medal, Download, Eye, Edit, Filter, Zap, ThumbsUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface Initiative {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  phase: string;
  start_date: string;
  end_date: string;
  budget: number;
  department: string;
  regulations: string[];
  steps: Array<{
    id: number;
    title: string;
    completed: boolean;
    description: string;
  }>;
  approvals: Array<{
    role_name: string;
    status: 'approved' | 'pending' | 'rejected';
    approved_date?: string;
    entity: string;
  }>;
}

interface HappinessData {
  id: string;
  department: string;
  score: number;
  measurement_date: string;
  employee_count: number;
}

interface LeaderboardEntry {
  id: string;
  department: string;
  score: number;
  improvement_percentage: number;
  badge: string;
  employee_count: number;
  period_month: number;
  period_year: number;
}

interface ImpactData {
  id: string;
  initiative_id: string;
  measurement_type: 'performance' | 'cost' | 'satisfaction';
  before_value: number;
  after_value: number;
  improvement_percentage: number;
}

export const OrganizationalDevelopment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [happinessData, setHappinessData] = useState<HappinessData[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [impactData, setImpactData] = useState<ImpactData[]>([]);
  const [isNewInitiativeOpen, setIsNewInitiativeOpen] = useState(false);
  const [isNewHappinessOpen, setIsNewHappinessOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    loadInitiatives();
    loadHappinessData();
    loadLeaderboardData();
    loadImpactData();
  }, []);

  const loadInitiatives = async () => {
    try {
      const { data, error } = await supabase
        .from('od_initiatives')
        .select(`
          *,
          od_initiative_steps (*),
          od_initiative_approvals (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedInitiatives = data?.map(initiative => ({
        id: initiative.id,
        title: initiative.title,
        description: initiative.description,
        status: initiative.status as 'planning' | 'in-progress' | 'completed' | 'on-hold',
        progress: initiative.progress,
        phase: initiative.phase,
        start_date: initiative.start_date,
        end_date: initiative.end_date,
        budget: initiative.budget,
        department: initiative.department,
        regulations: initiative.regulations || [],
        steps: initiative.od_initiative_steps?.map((step: any) => ({
          id: parseInt(step.order_index) || 1,
          title: step.title,
          completed: step.completed,
          description: step.description || ''
        })) || [],
        approvals: initiative.od_initiative_approvals?.map((approval: any) => ({
          role_name: approval.role_name,
          status: approval.status as 'approved' | 'pending' | 'rejected',
          approved_date: approval.approved_date,
          entity: approval.entity
        })) || []
      })) || [];

      setInitiatives(formattedInitiatives);
    } catch (error) {
      console.error('Error loading initiatives:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المبادرات',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadHappinessData = async () => {
    try {
      const { data, error } = await supabase
        .from('od_happiness_measurements')
        .select('*')
        .order('measurement_date', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(item => ({
        id: item.id,
        department: item.department,
        score: parseFloat(item.score.toString()),
        measurement_date: item.measurement_date,
        employee_count: item.employee_count
      })) || [];

      setHappinessData(formattedData);
    } catch (error) {
      console.error('Error loading happiness data:', error);
    }
  };

  const loadLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('od_leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;

      const formattedData = data?.map(item => ({
        id: item.id,
        department: item.department,
        score: parseFloat(item.score.toString()),
        improvement_percentage: parseFloat((item.improvement_percentage || 0).toString()),
        badge: item.badge || '',
        employee_count: item.employee_count,
        period_month: item.period_month,
        period_year: item.period_year
      })) || [];

      setLeaderboardData(formattedData);
    } catch (error) {
      console.error('Error loading leaderboard data:', error);
    }
  };

  const loadImpactData = async () => {
    try {
      const { data, error } = await supabase
        .from('od_impact_measurements')
        .select('*')
        .order('measurement_date', { ascending: false });

      if (error) throw error;
      setImpactData((data || []).map(item => ({
        ...item,
        measurement_type: item.measurement_type as 'performance' | 'cost' | 'satisfaction'
      })));
    } catch (error) {
      console.error('Error loading impact data:', error);
    }
  };

  const createInitiative = async (initiativeData: any) => {
    try {
      const { data, error } = await supabase
        .from('od_initiatives')
        .insert([{
          ...initiativeData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'نجح الحفظ',
        description: 'تم إنشاء المبادرة بنجاح'
      });

      loadInitiatives();
      setIsNewInitiativeOpen(false);
    } catch (error) {
      console.error('Error creating initiative:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إنشاء المبادرة',
        variant: 'destructive'
      });
    }
  };

  const addHappinessMeasurement = async (measurementData: any) => {
    try {
      const { data, error } = await supabase
        .from('od_happiness_measurements')
        .insert([{
          ...measurementData,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'نجح الحفظ',
        description: 'تم إضافة قياس السعادة بنجاح'
      });

      loadHappinessData();
      setIsNewHappinessOpen(false);
    } catch (error) {
      console.error('Error adding happiness measurement:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة قياس السعادة',
        variant: 'destructive'
      });
    }
  };

  // Sample mock data for organizational phases (to be replaced with database data)
  const organizationalPhases = [
    {
      id: 1,
      title: "التشخيص والتحليل الأولي",
      description: "تقرير تشخيص أولي لحالة المؤسسة وفقاً لمعايير رؤية 2030",
      status: "مكتمل",
      progress: 100,
      icon: Search,
      example: "مثال: شركة تقنية ناشئة تحتاج لهيكلة إدارية تتماشى مع قوانين الاستثمار الأجنبي",
      steps: [
        { 
          id: 1, 
          title: "تعبئة نموذج التقييم الذاتي (وفقاً لمعايير ساما/هيئة السوق المالية)", 
          completed: true,
          details: "يشمل تقييم الحوكمة، إدارة المخاطر، والامتثال للوائح"
        },
        { 
          id: 2, 
          title: "مقابلات تشخيصية مع الإدارة العليا والموظفين", 
          completed: true,
          details: "مقابلات منظمة تراعي الثقافة المحلية والتنوع في بيئة العمل السعودية"
        },
        { 
          id: 3, 
          title: "تحليل SWOT مع التركيز على فرص رؤية 2030", 
          completed: true,
          details: "تحليل يربط نقاط القوة بأهداف التحول الوطني والاقتصاد الرقمي"
        },
        { 
          id: 4, 
          title: "رفع تقرير تشخيصي متوافق مع المعايير المحلية", 
          completed: true,
          details: "تقرير يتضمن توصيات تتماشى مع نظام العمل السعودي والسعودة"
        }
      ],
      approvals: [
        { role: "مدير الإدارة", status: "موافق", date: "2024-01-15", entity: "الإدارة التنفيذية" },
        { role: "مدير عام الموارد البشرية", status: "موافق", date: "2024-01-16", entity: "قسم الموارد البشرية" },
        { role: "الرئيس التنفيذي", status: "موافق", date: "2024-01-17", entity: "مجلس الإدارة" }
      ],
      regulations: ["نظام العمل السعودي", "لائحة الحوكمة", "معايير رؤية 2030"]
    },
    {
      id: 2,
      title: "تصميم الهيكل والعمليات",
      description: "هيكل تنظيمي محدت + خريطة عمليات متوافقة مع الأنظمة السعودية",
      status: "جاري",
      progress: 75,
      icon: Building2,
      example: "مثال: إعادة هيكلة بنك محلي ليتماشى مع متطلبات ساما الجديدة للبنوك الرقمية",
      steps: [
        { 
          id: 1, 
          title: "تصميم هيكل تنظيمي يراعي متطلبات السعودة (75%)", 
          completed: true,
          details: "هيكل يضمن نسب السعودة المطلوبة ويدعم التطوير المهني للمواطنين"
        },
        { 
          id: 2, 
          title: "تحديد الوحدات الإدارية وفقاً لمعايير الحوكمة المؤسسية", 
          completed: true,
          details: "فصل واضح للمسؤوليات مع لجان المراجعة والمخاطر والامتثال"
        },
        { 
          id: 3, 
          title: "تصميم خريطة العمليات الرقمية (تماشياً مع التحول الرقمي)", 
          completed: true,
          details: "عمليات رقمية تدعم مبادرات الحكومة الإلكترونية والذكاء الاصطناعي"
        },
        { 
          id: 4, 
          title: "مراجعة الأدوار الوظيفية لضمان التوافق مع قانون العمل", 
          completed: false,
          details: "مراجعة شاملة تضمن التوافق مع ساعات العمل والإجازات والحقوق"
        }
      ],
      approvals: [
        { role: "مدير تطوير تنظيمي", status: "موافق", date: "2024-01-20", entity: "إدارة التطوير" },
        { role: "مدير الموارد البشرية", status: "موافق", date: "2024-01-21", entity: "قسم الموارد البشرية" },
        { role: "المستشار القانوني", status: "قيد المراجعة", date: null, entity: "الإدارة القانونية" },
        { role: "الرئيس التنفيذي", status: "انتظار", date: null, entity: "مجلس الإدارة" }
      ],
      regulations: ["نظام الشركات السعودي", "لائحة الحوكمة", "نظام العمل", "أنظمة ساما"]
    }
  ];

  const organizationalStats = [
    { title: "المراحل المكتملة", value: initiatives.filter(i => i.status === 'completed').length.toString(), icon: CheckCircle, color: "text-success" },
    { title: "المرحلة الحالية", value: "تصميم الهيكل", icon: Clock, color: "text-warning" },
    { title: "نسبة الإنجاز الإجمالية", value: `${Math.round(initiatives.reduce((acc, i) => acc + i.progress, 0) / Math.max(initiatives.length, 1))}%`, icon: TrendingUp, color: "text-primary" },
    { title: "الموافقات المعلقة", value: initiatives.filter(i => i.approvals.some(a => a.status === 'pending')).length.toString(), icon: AlertCircle, color: "text-destructive" }
  ];

  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة الذكية', icon: BarChart3 },
    { id: 'initiatives', label: 'مبادرات التطوير', icon: Target },
    { id: 'restructuring', label: 'إعادة الهيكلة', icon: Shuffle },
    { id: 'change-management', label: 'إدارة التغيير', icon: GitBranch },
    { id: 'governance', label: 'الحوكمة والامتثال', icon: Shield },
    { id: 'maturity', label: 'قياس النضج', icon: CheckCircle },
    { id: 'impact', label: 'قياس الأثر المؤسسي', icon: TrendingUp },
    { id: 'happiness', label: 'مؤشر السعادة', icon: Smile },
    { id: 'leaderboard', label: 'لوحة الشرف', icon: Trophy },
    { id: 'integration', label: 'تكامل البوابة', icon: Users }
  ];

  const toggleSteps = (phaseId: number) => {
    setExpandedSteps(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": 
      case "completed": return "bg-success/20 text-success border-success";
      case "جاري": 
      case "in-progress": return "bg-warning/20 text-warning border-warning";
      case "قيد المراجعة": return "bg-info/20 text-info border-info";
      case "قيد الانتظار": 
      case "planning": return "bg-muted/20 text-muted-foreground border-muted";
      default: return "bg-muted/20 text-muted-foreground border-muted";
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "موافق": 
      case "approved": return "text-success";
      case "قيد المراجعة": 
      case "pending": return "text-warning";
      case "انتظار": return "text-muted-foreground";
      case "مرفوض": 
      case "rejected": return "text-destructive";
      default: return "text-muted-foreground";
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

  // Chart data
  const progressChartData = [
    { month: 'يناير', completed: 1, inProgress: 2, planned: 3 },
    { month: 'فبراير', completed: 1, inProgress: 2, planned: 3 },
    { month: 'مارس', completed: 1, inProgress: 2, planned: 3 },
    { month: 'أبريل', completed: 2, inProgress: 1, planned: 3 },
    { month: 'مايو', completed: 2, inProgress: 2, planned: 2 },
    { month: 'يونيو', completed: 3, inProgress: 2, planned: 1 }
  ];

  const impactChartData = [
    { name: 'الأداء', value: 85, color: '#22c55e' },
    { name: 'التكلفة', value: 75, color: '#3b82f6' },
    { name: 'الرضا', value: 80, color: '#f59e0b' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationalStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-r from-primary/5 to-primary/2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
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
                  data={impactChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {impactChartData.map((entry, index) => (
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
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">جاري التحميل...</p>
            </div>
          ) : (
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
                      {initiative.status === 'completed' ? 'مكتمل' : 
                       initiative.status === 'in-progress' ? 'قيد التنفيذ' :
                       initiative.status === 'planning' ? 'قيد التخطيط' : 'متوقف'}
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
              {initiatives.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد مبادرات حالياً</p>
                  <Button className="mt-4" onClick={() => setIsNewInitiativeOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة مبادرة جديدة
                  </Button>
                </div>
              )}
            </div>
          )}
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
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  title: formData.get('title'),
                  description: formData.get('description'),
                  department: formData.get('department'),
                  phase: formData.get('phase'),
                  start_date: formData.get('start_date'),
                  end_date: formData.get('end_date'),
                  budget: parseFloat(formData.get('budget') as string),
                  status: 'planning',
                  progress: 0,
                  regulations: []
                };
                createInitiative(data);
              }}>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عنوان المبادرة</label>
                    <Input name="title" placeholder="اسم المبادرة" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">القسم المسؤول</label>
                    <Input name="department" placeholder="اختر القسم" required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">وصف المبادرة</label>
                    <Textarea name="description" placeholder="وصف تفصيلي للمبادرة وأهدافها" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ البدء</label>
                    <Input name="start_date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ الانتهاء</label>
                    <Input name="end_date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الميزانية المقدرة</label>
                    <Input name="budget" type="number" placeholder="المبلغ بالريال السعودي" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المرحلة</label>
                    <Input name="phase" placeholder="مرحلة المبادرة" required />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsNewInitiativeOpen(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit">
                    حفظ المبادرة
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {initiatives.filter(init => 
          init.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          init.department.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((initiative) => (
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
                  {initiative.status === 'completed' ? 'مكتمل' : 
                   initiative.status === 'in-progress' ? 'قيد التنفيذ' :
                   initiative.status === 'planning' ? 'قيد التخطيط' : 'متوقف'}
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

              {/* Details */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{initiative.phase}</span>
                <span>{new Date(initiative.start_date).toLocaleDateString('ar-SA')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {initiatives.length === 0 && !loading && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">لا توجد مبادرات</h3>
          <p className="text-muted-foreground mb-4">ابدأ بإضافة مبادرة تطوير جديدة</p>
          <Button onClick={() => setIsNewInitiativeOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            إضافة مبادرة جديدة
          </Button>
        </div>
      )}
    </div>
  );

  const renderHappiness = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">مؤشر السعادة الوظيفية</h2>
          <p className="text-muted-foreground">قياس ومتابعة مستويات الرضا والسعادة الوظيفية</p>
        </div>
        <Dialog open={isNewHappinessOpen} onOpenChange={setIsNewHappinessOpen}>
          <DialogTrigger asChild>
            <Button>
              <Smile className="h-4 w-4 mr-2" />
              إضافة قياس جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قياس سعادة جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                department: formData.get('department'),
                score: parseFloat(formData.get('score') as string),
                employee_count: parseInt(formData.get('employee_count') as string),
                measurement_date: formData.get('measurement_date') || new Date().toISOString().split('T')[0]
              };
              addHappinessMeasurement(data);
            }}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">القسم</label>
                  <Input name="department" placeholder="اسم القسم" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">النتيجة (من 5)</label>
                  <Input name="score" type="number" step="0.1" min="0" max="5" placeholder="4.5" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد الموظفين</label>
                  <Input name="employee_count" type="number" placeholder="25" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">تاريخ القياس</label>
                  <Input name="measurement_date" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsNewHappinessOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  حفظ القياس
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Happiness Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-6 text-center">
            <Smile className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {happinessData.length > 0 ? (happinessData.reduce((sum, item) => sum + item.score, 0) / happinessData.length).toFixed(1) : '0.0'}
            </div>
            <p className="text-sm text-muted-foreground">المتوسط العام</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">+8%</div>
            <p className="text-sm text-muted-foreground">التحسن الشهري</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {happinessData.reduce((sum, item) => sum + item.employee_count, 0)}
            </div>
            <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500/10 to-red-500/5 border-red-500/20">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">معدل المشاركة</p>
          </CardContent>
        </Card>
      </div>

      {/* Happiness Details */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل السعادة حسب الأقسام</CardTitle>
        </CardHeader>
        <CardContent>
          {happinessData.length > 0 ? (
            <div className="space-y-4">
              {happinessData.map((dept, index) => (
                <div key={dept.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{dept.department}</h4>
                    </div>
                    <Badge variant="outline">المركز {index + 1}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">النتيجة</p>
                      <p className="font-bold text-lg">{dept.score.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">عدد الموظفين</p>
                      <p className="font-medium">{dept.employee_count}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">تاريخ القياس</p>
                      <p className="font-medium">{new Date(dept.measurement_date).toLocaleDateString('ar-SA')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">التقييم</p>
                      <p className="font-medium">
                        {dept.score >= 4.5 ? 'ممتاز' : 
                         dept.score >= 4.0 ? 'جيد جداً' :
                         dept.score >= 3.5 ? 'جيد' : 'يحتاج تحسين'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${(dept.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Smile className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لا توجد قياسات سعادة حالياً</p>
              <Button className="mt-4" onClick={() => setIsNewHappinessOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                إضافة قياس جديد
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">لوحة الشرف - قادة السعادة والتغيير</h2>
          <p className="text-muted-foreground">ترتيب الأقسام حسب مستوى السعادة والتحسن</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            وضع العرض الكامل
          </Button>
        </div>
      </div>

      {leaderboardData.length > 0 ? (
        <>
          {/* Top 3 Podium */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">منصة التتويج</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center gap-8">
                {leaderboardData.slice(0, 3).map((entry, index) => (
                  <div key={entry.id} className="text-center">
                    <div className={`w-${index === 0 ? '24' : index === 1 ? '20' : '16'} h-${index === 0 ? '20' : index === 1 ? '16' : '12'} ${
                      index === 0 ? 'bg-yellow-200' : index === 1 ? 'bg-gray-200' : 'bg-orange-200'
                    } rounded-t-lg flex items-center justify-center mb-2`}>
                      {index === 0 ? <Crown className="h-10 w-10 text-yellow-600" /> :
                       index === 1 ? <Medal className="h-8 w-8 text-gray-600" /> :
                       <Award className="h-6 w-6 text-orange-600" />}
                    </div>
                    <div className={`p-${index === 0 ? '4' : '3'} ${
                      index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : 'bg-orange-50'
                    } rounded-lg`}>
                      <div className={`text-${index === 0 ? 'xl' : 'lg'} font-bold ${
                        index === 0 ? 'text-yellow-700' : ''
                      }`}>#{index + 1}</div>
                      <div className="text-sm font-medium">{entry.department}</div>
                      <div className="text-xs text-muted-foreground">{entry.score.toFixed(1)}/5.0</div>
                      {entry.badge && (
                        <Badge className="mt-1 text-xs">
                          {getBadgeIcon(entry.badge)}
                          <span className="ml-1">{entry.badge}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>ترتيب مفصل للأقسام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => (
                  <div key={entry.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{entry.department}</h4>
                        {entry.badge && (
                          <Badge variant="outline" className="text-xs">
                            {getBadgeIcon(entry.badge)}
                            <span className="ml-1">{entry.badge}</span>
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{entry.employee_count} موظف</span>
                        <span>النتيجة: {entry.score.toFixed(1)}/5.0</span>
                        <span className={`${entry.improvement_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.improvement_percentage >= 0 ? '+' : ''}{entry.improvement_percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${(entry.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle>شارات الإنجاز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-medium text-sm">مبدع التغيير</div>
                  <div className="text-xs text-muted-foreground">أعلى نتيجة</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-sm">رائد التطوير</div>
                  <div className="text-xs text-muted-foreground">أكبر تحسن</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-sm">محفز النمو</div>
                  <div className="text-xs text-muted-foreground">نمو مستمر</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-sm">قائد السعادة</div>
                  <div className="text-xs text-muted-foreground">أعلى رضا</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">لا توجد بيانات لوحة الشرف</h3>
          <p className="text-muted-foreground">سيتم عرض ترتيب الأقسام عند توفر قياسات السعادة</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'initiatives': return renderInitiatives();
      case 'happiness': return renderHappiness();
      case 'leaderboard': return renderLeaderboard();
      case 'restructuring':
      case 'change-management':
      case 'governance':
      case 'maturity':
      case 'impact':
      case 'integration':
        return (
          <div className="p-8 text-center">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">قريباً</h3>
            <p className="text-muted-foreground">هذه الميزة قيد التطوير وستكون متاحة قريباً</p>
          </div>
        );
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary p-8 mb-8 shadow-2xl">
        <div className="container mx-auto">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Building2 className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              نظام التطوير المؤسسي والتحول التنظيمي الشامل
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              منصة متقدمة ومتكاملة لإدارة جميع مبادرات التطوير والتحول المؤسسي مع قياس الأثر ومؤشر السعادة ولوحة الشرف التفاعلية
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
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

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-border/20 p-6">
            {renderContent()}
          </div>
        </Tabs>
      </div>
    </div>
  );
};