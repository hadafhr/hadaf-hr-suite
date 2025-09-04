import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Users, FileText, Calendar, DollarSign, Eye, Save, Download, 
  Share, Settings, BarChart, Clock, Search, Plus, User, AlertTriangle, 
  CheckCircle, Building, Phone, Mail, Globe, CreditCard, TrendingUp, 
  Activity, Bell, Zap, Target, Briefcase, Star, PieChart, LineChart, 
  Filter, RefreshCw, Upload, Edit, Trash2, Check, X, Calculator, 
  ChevronRight, Send, UserCheck, Brain, Sparkles, BarChart3, Lightbulb, 
  Gauge, Layers, Shield, Smartphone, MapPin, Clock4, Users2, BookOpen,
  FileUser, UserPlus, ClipboardList, MessageSquare, FileCheck, Wallet,
  Award, Network, GitBranch, Fingerprint, Video, Mic, FileSpreadsheet
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ComprehensiveRecruitmentHiringProps {
  onBack: () => void;
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full_time' | 'part_time' | 'contract';
  status: 'draft' | 'published' | 'closed' | 'filled';
  salary_min: number;
  salary_max: number;
  applications_count: number;
  created_at: string;
  requirements: string;
  description: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position_applied: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  score: number;
  experience_years: number;
  education: string;
  cv_url?: string;
  applied_at: string;
  interview_date?: string;
  notes?: string;
}

interface WorkforcePlan {
  department: string;
  current_headcount: number;
  target_headcount: number;
  open_positions: number;
  budget_allocated: number;
  budget_used: number;
  hiring_timeline: string;
}

export const ComprehensiveRecruitmentHiring: React.FC<ComprehensiveRecruitmentHiringProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [workforcePlans, setWorkforcePlans] = useState<WorkforcePlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dialog states
  const [newJobDialog, setNewJobDialog] = useState(false);
  const [workforcePlanDialog, setWorkforcePlanDialog] = useState(false);
  const [candidateDetailDialog, setCandidateDetailDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Form states for new job
  const [newJob, setNewJob] = useState<{
    title: string;
    department: string;
    location: string;
    type: 'full_time' | 'part_time' | 'contract';
    salary_min: number;
    salary_max: number;
    requirements: string;
    description: string;
  }>({
    title: '',
    department: '',
    location: '',
    type: 'full_time',
    salary_min: 0,
    salary_max: 0,
    requirements: '',
    description: ''
  });

  // Mock data
  const mockJobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      type: 'full_time',
      status: 'published',
      salary_min: 12000,
      salary_max: 18000,
      applications_count: 25,
      created_at: '2024-01-15',
      requirements: 'بكالوريوس في علوم الحاسب، خبرة 5+ سنوات',
      description: 'تطوير وصيانة الأنظمة البرمجية للشركة'
    },
    {
      id: '2',
      title: 'محاسب مالي',
      department: 'المالية',
      location: 'جدة',
      type: 'full_time',
      status: 'published',
      salary_min: 8000,
      salary_max: 12000,
      applications_count: 18,
      created_at: '2024-01-10',
      requirements: 'بكالوريوس محاسبة، خبرة 3+ سنوات',
      description: 'إعداد التقارير المالية والميزانيات'
    }
  ];

  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      position_applied: 'مطور برمجيات أول',
      status: 'interview',
      score: 85,
      experience_years: 6,
      education: 'بكالوريوس علوم حاسب',
      applied_at: '2024-01-20',
      interview_date: '2024-01-25',
      notes: 'مرشح ممتاز مع خبرة قوية'
    },
    {
      id: '2',
      name: 'فاطمة حسن الزهراني',
      email: 'fatima@example.com',
      phone: '+966509876543',
      position_applied: 'محاسب مالي',
      status: 'screening',
      score: 78,
      experience_years: 4,
      education: 'بكالوريوس محاسبة',
      applied_at: '2024-01-18',
      notes: 'خبرة جيدة في النظم المالية'
    }
  ];

  const mockWorkforcePlans: WorkforcePlan[] = [
    {
      department: 'تقنية المعلومات',
      current_headcount: 15,
      target_headcount: 20,
      open_positions: 3,
      budget_allocated: 300000,
      budget_used: 180000,
      hiring_timeline: 'Q2 2024'
    },
    {
      department: 'المالية',
      current_headcount: 8,
      target_headcount: 12,
      open_positions: 2,
      budget_allocated: 200000,
      budget_used: 120000,
      hiring_timeline: 'Q1 2024'
    }
  ];

  // Dashboard metrics
  const dashboardMetrics = {
    totalPositions: mockJobPositions.length,
    activePositions: mockJobPositions.filter(job => job.status === 'published').length,
    totalApplications: mockCandidates.length,
    pendingInterviews: mockCandidates.filter(c => c.status === 'interview').length,
    avgTimeToHire: 21, // days
    avgApplicationsPerJob: 22
  };

  // Charts data
  const hiringFunnelData = [
    { name: 'الطلبات المستلمة', value: 150 },
    { name: 'تم الفحص', value: 120 },
    { name: 'مقابلات أولية', value: 80 },
    { name: 'مقابلات نهائية', value: 40 },
    { name: 'تم التعيين', value: 15 }
  ];

  const departmentHiringData = [
    { department: 'تقنية المعلومات', hired: 8, target: 12 },
    { department: 'المالية', hired: 5, target: 8 },
    { department: 'التسويق', hired: 3, target: 6 },
    { department: 'الموارد البشرية', hired: 2, target: 4 }
  ];

  const monthlyHiringTrend = [
    { month: 'يناير', hired: 3, applications: 45 },
    { month: 'فبراير', hired: 5, applications: 62 },
    { month: 'مارس', hired: 4, applications: 38 },
    { month: 'أبريل', hired: 7, applications: 55 },
    { month: 'مايو', hired: 6, applications: 48 },
    { month: 'يونيو', hired: 4, applications: 42 }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', '#82ca9d'];

  useEffect(() => {
    setJobPositions(mockJobPositions);
    setCandidates(mockCandidates);
    setWorkforcePlans(mockWorkforcePlans);
  }, []);

  // Filter candidates based on search and status
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position_applied.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'draft': { label: 'مسودة', class: 'bg-gray-100 text-gray-800' },
      'published': { label: 'منشور', class: 'bg-green-100 text-green-800' },
      'closed': { label: 'مغلق', class: 'bg-red-100 text-red-800' },
      'filled': { label: 'تم التعيين', class: 'bg-blue-100 text-blue-800' },
      'applied': { label: 'تقدم للوظيفة', class: 'bg-blue-100 text-blue-800' },
      'screening': { label: 'فحص أولي', class: 'bg-yellow-100 text-yellow-800' },
      'interview': { label: 'مقابلة', class: 'bg-purple-100 text-purple-800' },
      'offer': { label: 'عرض وظيفي', class: 'bg-orange-100 text-orange-800' },
      'hired': { label: 'تم التعيين', class: 'bg-green-100 text-green-800' },
      'rejected': { label: 'مرفوض', class: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['applied'];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  // Handle new job creation
  const handleCreateJob = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const newJobPosition: JobPosition = {
        ...newJob,
        id: Date.now().toString(),
        status: 'draft',
        applications_count: 0,
        created_at: new Date().toISOString()
      };
      
      setJobPositions(prev => [...prev, newJobPosition]);
      setNewJobDialog(false);
      setNewJob({
        title: '',
        department: '',
        location: '',
        type: 'full_time',
        salary_min: 0,
        salary_max: 0,
        requirements: '',
        description: ''
      });
      
      toast({
        title: "تم إنشاء الوظيفة بنجاح",
        description: "تم إضافة الوظيفة الجديدة إلى قاعدة البيانات",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الوظيفة",
        description: "حدث خطأ أثناء إنشاء الوظيفة",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render dashboard section
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الوظائف النشطة</p>
                <p className="text-2xl font-bold text-foreground">{dashboardMetrics.activePositions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileUser className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-foreground">{dashboardMetrics.totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">مقابلات معلقة</p>
                <p className="text-2xl font-bold text-foreground">{dashboardMetrics.pendingInterviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">متوسط وقت التعيين</p>
                <p className="text-2xl font-bold text-foreground">{dashboardMetrics.avgTimeToHire} يوم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <Card className="border-primary/20 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              قمع التوظيف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={hiringFunnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {hiringFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Hiring Trend */}
        <Card className="border-primary/20 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AreaChart className="h-5 w-5 text-primary" />
              اتجاه التوظيف الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyHiringTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hired" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="applications" stackId="2" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Hiring Progress */}
      <Card className="border-primary/20 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            تقدم التوظيف حسب الإدارة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={departmentHiringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hired" fill="hsl(var(--primary))" name="تم التعيين" />
              <Bar dataKey="target" fill="hsl(var(--muted))" name="الهدف" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  // Render workforce planning section
  const renderWorkforcePlanning = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">تخطيط القوى العاملة</h2>
        <Button 
          onClick={() => setWorkforcePlanDialog(true)}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
        >
          <Plus className="h-4 w-4 ml-2" />
          خطة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workforcePlans.map((plan) => (
          <Card key={plan.department} className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">{plan.department}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">العدد الحالي</p>
                  <p className="font-bold text-lg">{plan.current_headcount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">الهدف</p>
                  <p className="font-bold text-lg">{plan.target_headcount}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>التقدم</span>
                  <span>{Math.round((plan.current_headcount / plan.target_headcount) * 100)}%</span>
                </div>
                <Progress value={(plan.current_headcount / plan.target_headcount) * 100} className="h-2" />
              </div>

              <div>
                <p className="text-muted-foreground text-sm">الميزانية المستخدمة</p>
                <div className="flex justify-between text-sm">
                  <span>{plan.budget_used.toLocaleString()} ريال</span>
                  <span className="text-muted-foreground">من {plan.budget_allocated.toLocaleString()}</span>
                </div>
                <Progress value={(plan.budget_used / plan.budget_allocated) * 100} className="h-2 mt-1" />
              </div>

              <Badge variant="outline" className="text-xs">
                الجدول الزمني: {plan.hiring_timeline}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Render job management section
  const renderJobManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">إدارة الوظائف</h2>
        <Button 
          onClick={() => setNewJobDialog(true)}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white"
        >
          <Plus className="h-4 w-4 ml-2" />
          وظيفة جديدة
        </Button>
      </div>

      <div className="grid gap-4">
        {jobPositions.map((job) => (
          <Card key={job.id} className="border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    {getStatusBadge(job.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} ريال
                    </div>
                    <div className="flex items-center gap-2">
                      <FileUser className="h-4 w-4" />
                      {job.applications_count} طلب
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Render candidates section
  const renderCandidates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">إدارة المرشحين</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 ml-2" />
            رفع سير ذاتية
          </Button>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مرشح
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث في المرشحين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="applied">تقدم للوظيفة</SelectItem>
            <SelectItem value="screening">فحص أولي</SelectItem>
            <SelectItem value="interview">مقابلة</SelectItem>
            <SelectItem value="offer">عرض وظيفي</SelectItem>
            <SelectItem value="hired">تم التعيين</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Candidates Table */}
      <Card className="border-primary/20 shadow-soft">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المرشح</TableHead>
                <TableHead>الوظيفة المتقدم إليها</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>النقاط</TableHead>
                <TableHead>تاريخ التقديم</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.position_applied}</TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={candidate.score} className="w-16 h-2" />
                      <span className="text-sm font-medium">{candidate.score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(candidate.applied_at).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setCandidateDetailDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                رجوع
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
                  <FileUser className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">قسم التوظيف والتعيين</h1>
                  <p className="text-sm text-muted-foreground">النظام الشامل لإدارة التوظيف وتخطيط القوى العاملة</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                نظام ذكي
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger 
              value="workforce-planning"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Users className="h-4 w-4 mr-2" />
              تخطيط القوى العاملة
            </TabsTrigger>
            <TabsTrigger 
              value="job-management"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              إدارة الوظائف
            </TabsTrigger>
            <TabsTrigger 
              value="candidates"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <FileUser className="h-4 w-4 mr-2" />
              المرشحين
            </TabsTrigger>
            <TabsTrigger 
              value="interviews"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Video className="h-4 w-4 mr-2" />
              المقابلات
            </TabsTrigger>
            <TabsTrigger 
              value="reports"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <FileText className="h-4 w-4 mr-2" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="workforce-planning" className="space-y-6">
            {renderWorkforcePlanning()}
          </TabsContent>

          <TabsContent value="job-management" className="space-y-6">
            {renderJobManagement()}
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            {renderCandidates()}
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <div className="text-center py-12">
              <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">قسم المقابلات</h3>
              <p className="text-muted-foreground">جدولة وإدارة المقابلات مع المرشحين</p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">تقارير التوظيف</h3>
              <p className="text-muted-foreground">تقارير شاملة عن أداء عمليات التوظيف</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <Dialog open={newJobDialog} onOpenChange={setNewJobDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إنشاء وظيفة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">المسمى الوظيفي</Label>
                <Input
                  id="title"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل المسمى الوظيفي"
                />
              </div>
              <div>
                <Label htmlFor="department">الإدارة</Label>
                <Select
                  value={newJob.department}
                  onValueChange={(value) => setNewJob(prev => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الإدارة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">تقنية المعلومات</SelectItem>
                    <SelectItem value="finance">المالية</SelectItem>
                    <SelectItem value="hr">الموارد البشرية</SelectItem>
                    <SelectItem value="marketing">التسويق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="أدخل موقع العمل"
                />
              </div>
              <div>
                <Label htmlFor="type">نوع الوظيفة</Label>
                <Select
                  value={newJob.type}
                  onValueChange={(value: 'full_time' | 'part_time' | 'contract') => 
                    setNewJob(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">دوام كامل</SelectItem>
                    <SelectItem value="part_time">دوام جزئي</SelectItem>
                    <SelectItem value="contract">تعاقد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salary_min">الحد الأدنى للراتب</Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={newJob.salary_min}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salary_min: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="salary_max">الحد الأعلى للراتب</Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={newJob.salary_max}
                  onChange={(e) => setNewJob(prev => ({ ...prev, salary_max: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">المتطلبات</Label>
              <Textarea
                id="requirements"
                value={newJob.requirements}
                onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                placeholder="أدخل متطلبات الوظيفة"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="description">الوصف الوظيفي</Label>
              <Textarea
                id="description"
                value={newJob.description}
                onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                placeholder="أدخل الوصف الوظيفي"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setNewJobDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={handleCreateJob} disabled={isLoading}>
                {isLoading ? 'جاري الإنشاء...' : 'إنشاء الوظيفة'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Candidate Detail Dialog */}
      <Dialog open={candidateDetailDialog} onOpenChange={setCandidateDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل المرشح</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground">{selectedCandidate.position_applied}</p>
                  {getStatusBadge(selectedCandidate.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">البريد الإلكتروني</Label>
                  <p className="mt-1">{selectedCandidate.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">رقم الهاتف</Label>
                  <p className="mt-1">{selectedCandidate.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">سنوات الخبرة</Label>
                  <p className="mt-1">{selectedCandidate.experience_years} سنوات</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">المؤهل العلمي</Label>
                  <p className="mt-1">{selectedCandidate.education}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">نقاط التقييم</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Progress value={selectedCandidate.score} className="flex-1" />
                  <span className="font-semibold">{selectedCandidate.score}%</span>
                </div>
              </div>

              {selectedCandidate.notes && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">الملاحظات</Label>
                  <p className="mt-1 text-sm bg-muted p-3 rounded-lg">{selectedCandidate.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  عرض السيرة الذاتية
                </Button>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  جدولة مقابلة
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};