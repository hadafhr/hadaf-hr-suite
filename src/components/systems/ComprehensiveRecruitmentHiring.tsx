import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Users, Briefcase, FileText, AlertTriangle, CheckCircle2, Clock,
  Download, Plus, Search, Filter, Calendar, Building, Award, Target, TrendingUp,
  BarChart3, PieChart, Activity, Globe, Eye, Settings, Bell, UserPlus, Phone,
  Mail, Star, Upload, Send, MessageSquare, Video, FileUser, BrainCircuit,
  CircleCheck, X, Copy, ExternalLink, Timer, MapPin, DollarSign, Edit, Trash2,
  Share, User, CalendarIcon, ChartBar, Package
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, LineChart, Line, BarChart, Bar } from 'recharts';

interface ComprehensiveRecruitmentHiringProps {
  onBack: () => void;
}

interface Job {
  id: string;
  title: string;
  department: string;
  type: 'full_time' | 'part_time' | 'contract' | 'internship';
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'draft' | 'published' | 'paused' | 'closed';
  postedDate: string;
  applications: number;
  views: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'applied' | 'screening' | 'interview' | 'technical' | 'final' | 'offer' | 'hired' | 'rejected';
  source: string;
  email: string;
  phone: string;
  appliedDate: string;
  resumeScore: number;
  interviewScore?: number;
  expectedSalary: number;
  experience: number;
}

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  type: 'phone' | 'video' | 'in_person' | 'technical';
  date: string;
  time: string;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  score?: number;
  notes?: string;
}

interface ComprehensiveRecruitmentHiringProps {
  onBack: () => void;
}

export const ComprehensiveRecruitmentHiring: React.FC<ComprehensiveRecruitmentHiringProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock Data - Jobs
  const jobs: Job[] = [
    {
      id: '1',
      title: 'مطور فول ستاك أول',
      department: 'تقنية المعلومات',
      type: 'full_time',
      location: 'الرياض',
      salaryMin: 12000,
      salaryMax: 18000,
      description: 'نبحث عن مطور فول ستاك خبير للانضمام لفريقنا التقني المميز',
      requirements: ['خبرة 3+ سنوات في React و Node.js', 'معرفة بقواعد البيانات MySQL/MongoDB', 'مهارات حل المشاكل'],
      benefits: ['تأمين طبي شامل', 'مكافآت أداء ربعية', 'بيئة عمل مرنة'],
      status: 'published',
      postedDate: '2024-01-10',
      applications: 25,
      views: 145
    },
    {
      id: '2',
      title: 'مصمم UX/UI',
      department: 'التسويق',
      type: 'full_time',
      location: 'جدة',
      salaryMin: 10000,
      salaryMax: 15000,
      description: 'مصمم واجهات مستخدم إبداعي مع خبرة في تجربة المستخدم',
      requirements: ['خبرة في Figma و Adobe Creative Suite', 'فهم مبادئ UX وتجربة المستخدم', 'محفظة أعمال قوية'],
      benefits: ['راتب تنافسي', 'إجازات إضافية', 'تدريب مستمر'],
      status: 'published',
      postedDate: '2024-01-05',
      applications: 18,
      views: 98
    },
    {
      id: '3',
      title: 'محاسب مالي',
      department: 'المالية',
      type: 'full_time',
      location: 'الدمام',
      salaryMin: 8000,
      salaryMax: 12000,
      description: 'محاسب مالي للعمل في قسم المحاسبة والمالية',
      requirements: ['شهادة محاسبة', 'خبرة 2+ سنوات', 'معرفة بأنظمة ERP'],
      benefits: ['تأمين صحي', 'مكافآت سنوية', 'فرص ترقية'],
      status: 'draft',
      postedDate: '2024-01-12',
      applications: 8,
      views: 45
    }
  ];

  // Mock Data - Candidates
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'أحمد محمد العلي',
      position: 'مطور فول ستاك أول',
      department: 'تقنية المعلومات',
      status: 'interview',
      source: 'موقع الشركة',
      email: 'ahmed.ali@email.com',
      phone: '+966501234567',
      appliedDate: '2024-01-15',
      resumeScore: 92,
      interviewScore: 88,
      expectedSalary: 15000,
      experience: 5
    },
    {
      id: '2',
      name: 'فاطمة سعد النور',
      position: 'مصمم UX/UI',
      department: 'التسويق',
      status: 'offer',
      source: 'لينكد إن',
      email: 'fatima.noor@email.com',
      phone: '+966502345678',
      appliedDate: '2024-01-10',
      resumeScore: 95,
      interviewScore: 94,
      expectedSalary: 12000,
      experience: 4
    },
    {
      id: '3',
      name: 'خالد عبدالله الزهراني',
      position: 'محاسب مالي',
      department: 'المالية',
      status: 'screening',
      source: 'بيت.كوم',
      email: 'khalid.zahrani@email.com',
      phone: '+966503456789',
      appliedDate: '2024-01-20',
      resumeScore: 85,
      expectedSalary: 10000,
      experience: 3
    },
    {
      id: '4',
      name: 'نورا أحمد السالم',
      position: 'مطور فول ستاك أول',
      department: 'تقنية المعلومات',
      status: 'hired',
      source: 'إحالة موظف',
      email: 'nora.salem@email.com',
      phone: '+966504567890',
      appliedDate: '2024-01-08',
      resumeScore: 97,
      interviewScore: 96,
      expectedSalary: 16000,
      experience: 6
    }
  ];

  // Mock Data - Interviews
  const interviews: Interview[] = [
    {
      id: '1',
      candidateId: '1',
      candidateName: 'أحمد محمد العلي',
      position: 'مطور فول ستاك أول',
      type: 'technical',
      date: '2024-01-22',
      time: '10:00',
      interviewer: 'محمد خالد السالم',
      status: 'scheduled'
    },
    {
      id: '2',
      candidateId: '3',
      candidateName: 'خالد عبدالله الزهراني',
      position: 'محاسب مالي',
      type: 'phone',
      date: '2024-01-23',
      time: '14:00',
      interviewer: 'سارة أحمد النور',
      status: 'scheduled'
    },
    {
      id: '3',
      candidateId: '2',
      candidateName: 'فاطمة سعد النور',
      position: 'مصمم UX/UI',
      type: 'video',
      date: '2024-01-18',
      time: '11:00',
      interviewer: 'عمر سالم الأحمد',
      status: 'completed',
      score: 94,
      notes: 'مرشحة ممتازة، مهارات تصميم قوية وإبداع واضح'
    }
  ];

  // Statistics
  const stats = {
    totalApplications: 180,
    activePositions: 8,
    scheduledInterviews: 12,
    pendingOffers: 4,
    avgTimeToHire: 18,
    qualityScore: 92
  };

  const hiringFunnelData = [
    { stage: 'الطلبات', count: 180, percentage: 100 },
    { stage: 'الفحص', count: 120, percentage: 67 },
    { stage: 'المقابلات', count: 65, percentage: 36 },
    { stage: 'العروض', count: 25, percentage: 14 },
    { stage: 'التوظيف', count: 18, percentage: 10 }
  ];

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'screening': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'technical': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'final': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'offer': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'hired': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'applied': 'تقدم للوظيفة',
      'screening': 'فحص أولي',
      'interview': 'مقابلة HR',
      'technical': 'مقابلة فنية',
      'final': 'مقابلة نهائية',
      'offer': 'عرض وظيفي',
      'hired': 'تم التوظيف',
      'rejected': 'مرفوض'
    };
    return statusMap[status] || status;
  };

  const getJobTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'full_time': 'دوام كامل',
      'part_time': 'دوام جزئي',
      'contract': 'عقد مؤقت',
      'internship': 'تدريب'
    };
    return typeMap[type] || type;
  };

  const getDepartmentText = (dept: string) => {
    const deptMap: { [key: string]: string } = {
      'تقنية المعلومات': 'تقنية المعلومات',
      'الموارد البشرية': 'الموارد البشرية',
      'المالية': 'المالية',
      'التسويق': 'التسويق',
      'العمليات': 'العمليات',
      'المبيعات': 'المبيعات'
    };
    return deptMap[dept] || dept;
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-1">
                  <FileText className="h-8 w-8 text-primary" />
                  <Search className="h-5 w-5 text-primary/70" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  قسم التوظيف والتعيين
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  نظام تتبع المتقدمين المتكامل - من التقديم إلى أول يوم عمل
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              وظيفة جديدة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalApplications}</p>
              </div>
              <FileUser className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الوظائف النشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activePositions}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مقابلات مجدولة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.scheduledInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عروض معلقة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pendingOffers}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط التوظيف (يوم)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgTimeToHire}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نقاط الجودة</p>
                <p className="text-2xl font-bold text-green-600">{stats.qualityScore}%</p>
              </div>
              <Award className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              قمع التوظيف (Hiring Funnel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              متوسط وقت التوظيف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.avgTimeToHire}</div>
                <div className="text-muted-foreground">يوم متوسط التوظيف</div>
              </div>
              <Progress value={75} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">
                تحسن بنسبة 25% عن الشهر الماضي
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للتوظيف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تحسن ملحوظ</span>
              </div>
              <p className="text-sm text-emerald-700">
                جودة المرشحين تحسنت بنسبة 18% مقارنة بالربع الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحسين مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                ينصح بتسريع عملية الفحص الأولي لتقليل وقت الاستجابة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                متوقع تحقيق 95% من أهداف التوظيف لهذا الربع
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto">
            <TabsTrigger value="dashboard" className="text-sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="career-page" className="text-sm">
              <Globe className="h-4 w-4 ml-2" />
              صفحة الوظائف
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-sm">
              <Briefcase className="h-4 w-4 ml-2" />
              إدارة الوظائف
            </TabsTrigger>
            <TabsTrigger value="candidates" className="text-sm">
              <Users className="h-4 w-4 ml-2" />
              رحلة المرشح
            </TabsTrigger>
            <TabsTrigger value="interviews" className="text-sm">
              <Video className="h-4 w-4 ml-2" />
              المقابلات
            </TabsTrigger>
            <TabsTrigger value="approvals" className="text-sm">
              <CheckCircle2 className="h-4 w-4 ml-2" />
              الموافقات
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              <FileText className="h-4 w-4 ml-2" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="career-page">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    صفحة الوظائف الخارجية (Career Page)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">صفحة الوظائف المباشرة</h3>
                          <p className="text-sm text-muted-foreground">careers.yourcompany.com</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-2" />
                            معاينة
                          </Button>
                          <Button size="sm">
                            <ExternalLink className="h-4 w-4 ml-2" />
                            زيارة الصفحة
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{jobs.filter(j => j.status === 'published').length}</div>
                            <div className="text-sm text-muted-foreground">الوظائف المنشورة</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">1,245</div>
                            <div className="text-sm text-muted-foreground">مشاهدة هذا الشهر</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{jobs.reduce((sum, job) => sum + job.applications, 0)}</div>
                            <div className="text-sm text-muted-foreground">طلب جديد</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-4">الوظائف المنشورة حالياً</h4>
                      <div className="space-y-3">
                        {jobs.filter(job => job.status === 'published').map(job => (
                          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <h5 className="font-semibold">{job.title}</h5>
                                <Badge variant="outline">{getDepartmentText(job.department)}</Badge>
                                <Badge>{getJobTypeText(job.type)}</Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} ريال
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {job.views} مشاهدة
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {job.applications} متقدم
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-6">
              {/* Job Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{jobs.length}</div>
                      <div className="text-sm text-muted-foreground">إجمالي الوظائف</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {jobs.filter(j => j.status === 'published').length}
                      </div>
                      <div className="text-sm text-muted-foreground">منشورة</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {jobs.filter(j => j.status === 'draft').length}
                      </div>
                      <div className="text-sm text-muted-foreground">مسودة</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {jobs.filter(j => j.status === 'closed').length}
                      </div>
                      <div className="text-sm text-muted-foreground">مغلقة</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Jobs List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>بنك الوظائف</CardTitle>
                    <Button onClick={() => toast({ title: "إضافة وظيفة", description: "سيتم إضافة هذه الميزة قريباً" })}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة وظيفة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.map(job => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <Badge variant={job.status === 'published' ? 'default' : job.status === 'draft' ? 'secondary' : 'destructive'}>
                                {job.status === 'published' ? 'منشورة' : job.status === 'draft' ? 'مسودة' : 'مغلقة'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>{getDepartmentText(job.department)}</span>
                              <span>{job.location}</span>
                              <span>{job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} ريال</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm">
                                <Users className="h-4 w-4" />
                                <span>{job.applications} متقدم</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Eye className="h-4 w-4" />
                                <span>{job.views} مشاهدة</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                نشرت في {job.postedDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="البحث في المرشحين..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="applied">تقدم للوظيفة</SelectItem>
                        <SelectItem value="screening">فحص أولي</SelectItem>
                        <SelectItem value="interview">مقابلة</SelectItem>
                        <SelectItem value="offer">عرض وظيفي</SelectItem>
                        <SelectItem value="hired">تم التوظيف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Candidates List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {candidates
                  .filter(candidate => 
                    (selectedFilter === 'all' || candidate.status === selectedFilter) &&
                    (searchTerm === '' || candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     candidate.position.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map(candidate => (
                    <Card key={candidate.id} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedCandidate(candidate)}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{candidate.name}</h3>
                            <Badge className={getStatusColor(candidate.status)}>
                              {getStatusText(candidate.status)}
                            </Badge>
                          </div>
                          
                          <div>
                            <p className="font-medium text-primary">{candidate.position}</p>
                            <p className="text-sm text-muted-foreground">{candidate.department}</p>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">مصدر: {candidate.source}</span>
                            <span className="text-muted-foreground">تقدم في: {candidate.appliedDate}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>CV: {candidate.resumeScore}%</span>
                            </div>
                            {candidate.interviewScore && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-green-500" />
                                <span>مقابلة: {candidate.interviewScore}%</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>{candidate.experience} سنوات خبرة</span>
                            <span>{candidate.expectedSalary.toLocaleString()} ريال</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="space-y-6">
              {/* Interview Schedule Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{interviews.length}</div>
                      <div className="text-sm text-muted-foreground">مقابلات مجدولة</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {interviews.filter(i => i.status === 'completed').length}
                      </div>
                      <div className="text-sm text-muted-foreground">مكتملة</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {interviews.filter(i => i.status === 'scheduled').length}
                      </div>
                      <div className="text-sm text-muted-foreground">مجدولة</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {interviews.filter(i => i.status === 'cancelled').length}
                      </div>
                      <div className="text-sm text-muted-foreground">ملغية</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interview List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>جدول المقابلات</CardTitle>
                    <Button onClick={() => toast({ title: "جدولة مقابلة", description: "سيتم إضافة هذه الميزة قريباً" })}>
                      <Plus className="h-4 w-4 ml-2" />
                      جدولة مقابلة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interviews.map(interview => (
                      <div key={interview.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{interview.candidateName}</h3>
                              <Badge variant="outline">{interview.position}</Badge>
                              <Badge className={interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                                              interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                                              'bg-red-100 text-red-800'}>
                                {interview.status === 'scheduled' ? 'مجدولة' : 
                                 interview.status === 'completed' ? 'مكتملة' : 'ملغية'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {interview.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {interview.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {interview.interviewer}
                              </span>
                              <span className="flex items-center gap-1">
                                {interview.type === 'video' && <Video className="h-4 w-4" />}
                                {interview.type === 'phone' && <Phone className="h-4 w-4" />}
                                {interview.type === 'in_person' && <Users className="h-4 w-4" />}
                                {interview.type === 'technical' && <Settings className="h-4 w-4" />}
                                {interview.type === 'video' ? 'فيديو' :
                                 interview.type === 'phone' ? 'هاتفي' :
                                 interview.type === 'in_person' ? 'وجهاً لوجه' : 'تقني'}
                              </span>
                            </div>
                            {interview.score && (
                              <div className="mt-2 flex items-center gap-2">
                                <Progress value={interview.score} className="w-24" />
                                <span className="text-sm font-medium">{interview.score}%</span>
                              </div>
                            )}
                            {interview.notes && (
                              <div className="mt-2">
                                <p className="text-sm bg-muted/50 p-2 rounded">{interview.notes}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    الموافقات وسير العمل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">4</div>
                            <div className="text-sm text-muted-foreground">في انتظار الموافقة</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">12</div>
                            <div className="text-sm text-muted-foreground">تمت الموافقة</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">2</div>
                            <div className="text-sm text-muted-foreground">مرفوضة</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">العروض الوظيفية المعلقة</h4>
                      {candidates.filter(c => c.status === 'offer').map(candidate => (
                        <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                          <div>
                            <h5 className="font-semibold">{candidate.name}</h5>
                            <p className="text-sm text-muted-foreground">{candidate.position} - {candidate.department}</p>
                            <p className="text-sm">الراتب المتوقع: {candidate.expectedSalary.toLocaleString()} ريال</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              موافقة
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                              رفض
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">الموظفون الجدد المُوافق عليهم</h4>
                      {candidates.filter(c => c.status === 'hired').map(candidate => (
                        <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                          <div>
                            <h5 className="font-semibold">{candidate.name}</h5>
                            <p className="text-sm text-muted-foreground">{candidate.position} - {candidate.department}</p>
                            <p className="text-sm">تاريخ البدء المتوقع: خلال أسبوعين</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              إرسال العقد
                            </Button>
                            <Button size="sm" variant="outline">
                              تجهيز الحساب
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="h-5 w-5" />
                    التقارير والتحليلات المتقدمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">تقارير الأداء الشهرية</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">معدل التوظيف الناجح</span>
                            <span className="font-semibold">78%</span>
                          </div>
                          <Progress value={78} />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">متوسط وقت التوظيف</span>
                            <span className="font-semibold">{stats.avgTimeToHire} يوم</span>
                          </div>
                          <Progress value={65} />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">رضا المرشحين</span>
                            <span className="font-semibold">92%</span>
                          </div>
                          <Progress value={92} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">مصادر التوظيف الفعالة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <span>موقع الشركة</span>
                            <span className="font-semibold text-blue-600">45%</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <span>لينكد إن</span>
                            <span className="font-semibold text-green-600">28%</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                            <span>إحالة موظف</span>
                            <span className="font-semibold text-orange-600">18%</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                            <span>بيت.كوم</span>
                            <span className="font-semibold text-purple-600">9%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Button className="flex items-center gap-2" variant="outline">
                        <Download className="h-4 w-4" />
                        تقرير شهري
                      </Button>
                      <Button className="flex items-center gap-2" variant="outline">
                        <Download className="h-4 w-4" />
                        تقرير ربعي
                      </Button>
                      <Button className="flex items-center gap-2" variant="outline">
                        <Download className="h-4 w-4" />
                        تقرير سنوي
                      </Button>
                      <Button className="flex items-center gap-2" variant="outline">
                        <Settings className="h-4 w-4" />
                        تقرير مخصص
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Candidate Detail Dialog */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-5 w-5" />
                تفاصيل المرشح - {selectedCandidate.name}
              </CardTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">الاسم</Label>
                      <p>{selectedCandidate.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">المنصب المطلوب</Label>
                      <p>{selectedCandidate.position}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">القسم</Label>
                      <p>{selectedCandidate.department}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label className="text-sm font-medium">البريد الإلكتروني</Label>
                        <p className="text-sm">{selectedCandidate.email}</p>
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">الهاتف</Label>
                        <p className="text-sm">{selectedCandidate.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات التقييم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">نقاط السيرة الذاتية</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={selectedCandidate.resumeScore} className="flex-1" />
                        <span className="text-sm font-medium">{selectedCandidate.resumeScore}%</span>
                      </div>
                    </div>
                    {selectedCandidate.interviewScore && (
                      <div>
                        <Label className="text-sm font-medium">نقاط المقابلة</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={selectedCandidate.interviewScore} className="flex-1" />
                          <span className="text-sm font-medium">{selectedCandidate.interviewScore}%</span>
                        </div>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium">سنوات الخبرة</Label>
                      <p>{selectedCandidate.experience} سنوات</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">الراتب المتوقع</Label>
                      <p>{selectedCandidate.expectedSalary.toLocaleString()} ريال</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Mail className="h-4 w-4 ml-2" />
                  إرسال إيميل
                </Button>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 ml-2" />
                  جدولة مقابلة
                </Button>
                <Button>
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                  الانتقال للمرحلة التالية
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};