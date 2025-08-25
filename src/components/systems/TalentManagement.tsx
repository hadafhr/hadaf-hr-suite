import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Users, TrendingUp, Award, Target, Heart, UserPlus, Download, FileText, Search, Filter, Plus, Edit, Trash2, 
  Star, BookOpen, Crown, AlertTriangle, BarChart3, ArrowLeft, Brain, Globe, Settings, Share, Eye, Save, 
  Zap, Activity, PieChart, Calendar, Clock, GraduationCap, Lightbulb, TrendingDown, UserCheck, PlayCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Pie } from 'recharts';

interface TalentProfile {
  id: string;
  employeeId: string;
  name: string;
  position: string;
  department: string;
  performanceRating: number;
  potentialLevel: 'high' | 'medium' | 'low';
  careerPath: string;
  lastPromotion: string;
  retentionRisk: 'high' | 'medium' | 'low';
  engagementScore: number;
}

interface TalentProgram {
  id: string;
  title: string;
  description: string;
  type: 'leadership' | 'technical' | 'soft_skills' | 'mentorship';
  duration: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'upcoming' | 'completed';
  content: TalentProgramContent[];
}

interface TalentProgramContent {
  id: string;
  title: string;
  type: 'video' | 'document' | 'assessment' | 'workshop';
  duration: string;
  completed: boolean;
  url?: string;
}

interface TalentManagementProps {
  onBack?: () => void;
}

const TalentManagement: React.FC<TalentManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showContentManager, setShowContentManager] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [newProgram, setNewProgram] = useState({
    title: '',
    description: '',
    type: 'leadership' as const,
    duration: '',
    capacity: 0
  });
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'video' as const,
    duration: '',
    url: ''
  });
  const { toast } = useToast();

  // Mock data for talent profiles
  const [talentProfiles] = useState<TalentProfile[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'أحمد محمد',
      position: 'مدير المشاريع',
      department: 'تقنية المعلومات',
      performanceRating: 4.8,
      potentialLevel: 'high',
      careerPath: 'مسار الإدارة التنفيذية',
      lastPromotion: '2023-01-15',
      retentionRisk: 'low',
      engagementScore: 92
    },
    {
      id: '2',
      employeeId: 'EMP002', 
      name: 'فاطمة علي',
      position: 'محللة بيانات أول',
      department: 'التحليلات',
      performanceRating: 4.6,
      potentialLevel: 'high',
      careerPath: 'مسار التحليلات المتقدمة',
      lastPromotion: '2023-06-20',
      retentionRisk: 'medium',
      engagementScore: 88
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'سارة أحمد',
      position: 'مطورة برمجيات أولى',
      department: 'تقنية المعلومات',
      performanceRating: 4.5,
      potentialLevel: 'high',
      careerPath: 'مسار القيادة التقنية',
      lastPromotion: '2023-03-10',
      retentionRisk: 'low',
      engagementScore: 95
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'محمد خالد',
      position: 'محلل أعمال',
      department: 'الأعمال',
      performanceRating: 4.2,
      potentialLevel: 'medium',
      careerPath: 'مسار إدارة الأعمال',
      lastPromotion: '2023-08-15',
      retentionRisk: 'high',
      engagementScore: 75
    }
  ]);

  // Comprehensive talent programs with rich content
  const [talentPrograms, setTalentPrograms] = useState<TalentProgram[]>([
    {
      id: '1',
      title: 'برنامج القيادة المتقدمة',
      description: 'برنامج تطوير شامل للقادة المستقبليين يركز على المهارات الإدارية والاستراتيجية المتقدمة',
      type: 'leadership',
      duration: '6 أشهر',
      capacity: 20,
      enrolled: 15,
      status: 'active',
      content: [
        { id: '1', title: 'مقدمة في القيادة الحديثة', type: 'video', duration: '45 دقيقة', completed: true, url: '/content/leadership-intro.mp4' },
        { id: '2', title: 'تقييم أسلوب القيادة الشخصي', type: 'assessment', duration: '30 دقيقة', completed: false },
        { id: '3', title: 'ورشة عمل: إدارة الفرق عالية الأداء', type: 'workshop', duration: '3 ساعات', completed: false },
        { id: '4', title: 'دليل القائد الفعال في القرن الواحد والعشرين', type: 'document', duration: '30 دقيقة', completed: true, url: '/content/leader-guide.pdf' },
        { id: '5', title: 'محاكاة القيادة في الأزمات', type: 'workshop', duration: '4 ساعات', completed: false }
      ]
    },
    {
      id: '2',
      title: 'برنامج التطوير التقني المتقدم',
      description: 'برنامج تدريبي متخصص في أحدث التقنيات والمنهجيات التطويرية مع التركيز على الذكاء الاصطناعي',
      type: 'technical',
      duration: '4 أشهر',
      capacity: 25,
      enrolled: 22,
      status: 'active',
      content: [
        { id: '6', title: 'أساسيات الذكاء الاصطناعي وتطبيقاته', type: 'video', duration: '60 دقيقة', completed: false },
        { id: '7', title: 'تطبيقات عملية في Machine Learning', type: 'workshop', duration: '4 ساعات', completed: false },
        { id: '8', title: 'اختبار المهارات التقنية المتقدم', type: 'assessment', duration: '90 دقيقة', completed: false },
        { id: '9', title: 'مشروع تطبيقي: بناء نموذج ذكي', type: 'workshop', duration: '8 ساعات', completed: false }
      ]
    },
    {
      id: '3',
      title: 'برنامج المهارات الناعمة والتواصل',
      description: 'تطوير مهارات التواصل والعمل الجماعي والإبداع والتفكير النقدي',
      type: 'soft_skills',
      duration: '3 أشهر',
      capacity: 30,
      enrolled: 28,
      status: 'active',
      content: [
        { id: '10', title: 'فن التواصل الفعال والإقناع', type: 'video', duration: '40 دقيقة', completed: false },
        { id: '11', title: 'مهارات العرض والتقديم المتقدمة', type: 'workshop', duration: '2 ساعة', completed: false },
        { id: '12', title: 'إدارة الوقت والأولويات', type: 'video', duration: '35 دقيقة', completed: false },
        { id: '13', title: 'تقييم مهارات التواصل', type: 'assessment', duration: '25 دقيقة', completed: false }
      ]
    },
    {
      id: '4',
      title: 'برنامج الإرشاد والتوجيه المهني',
      description: 'ربط الموظفين الجدد بالمرشدين المتمرسين لتطوير مهاراتهم ونقل الخبرات',
      type: 'mentorship',
      duration: '12 شهر',
      capacity: 15,
      enrolled: 10,
      status: 'active',
      content: [
        { id: '14', title: 'دليل المرشد الناجح', type: 'document', duration: '25 دقيقة', completed: false },
        { id: '15', title: 'جلسات الإرشاد الفردية المنظمة', type: 'workshop', duration: '1 ساعة', completed: false },
        { id: '16', title: 'تقنيات الإرشاد الحديثة', type: 'video', duration: '50 دقيقة', completed: false }
      ]
    }
  ]);

  // Analytics data
  const talentAnalytics = [
    { month: 'يناير', programs: 12, participants: 145, completion: 85, satisfaction: 92 },
    { month: 'فبراير', programs: 15, participants: 162, completion: 88, satisfaction: 94 },
    { month: 'مارس', programs: 18, participants: 178, completion: 92, satisfaction: 96 },
    { month: 'أبريل', programs: 16, participants: 156, completion: 87, satisfaction: 89 },
    { month: 'مايو', programs: 20, participants: 195, completion: 95, satisfaction: 98 },
    { month: 'يونيو', programs: 22, participants: 210, completion: 90, satisfaction: 95 }
  ];

  const programTypeDistribution = [
    { name: 'القيادة', value: 35, count: 15 },
    { name: 'التقنية', value: 30, count: 22 },
    { name: 'المهارات الناعمة', value: 25, count: 28 },
    { name: 'الإرشاد', value: 10, count: 10 }
  ];

  const aiTalentInsights = [
    { category: 'مواهب متطورة', count: 68, percentage: 82, color: 'hsl(var(--success))' },
    { category: 'في طور النمو', count: 24, percentage: 15, color: 'hsl(var(--warning))' },
    { category: 'يحتاج تطوير', count: 8, percentage: 3, color: 'hsl(var(--destructive))' }
  ];

  const BOUD_COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))', 'hsl(var(--secondary))'];

  const handleAddProgram = () => {
    if (newProgram.title && newProgram.description) {
      const program: TalentProgram = {
        id: Date.now().toString(),
        ...newProgram,
        enrolled: 0,
        status: 'upcoming',
        content: []
      };
      setTalentPrograms([...talentPrograms, program]);
      setNewProgram({ title: '', description: '', type: 'leadership', duration: '', capacity: 0 });
      setShowAddProgram(false);
      toast({
        title: "تم إضافة البرنامج",
        description: `تم إنشاء برنامج "${program.title}" بنجاح`,
      });
    }
  };

  const handleAddContent = () => {
    if (selectedProgram && newContent.title) {
      const content: TalentProgramContent = {
        id: Date.now().toString(),
        ...newContent,
        completed: false
      };
      
      setTalentPrograms(prev => prev.map(program => 
        program.id === selectedProgram 
          ? { ...program, content: [...program.content, content] }
          : program
      ));
      
      setNewContent({ title: '', type: 'video', duration: '', url: '' });
      toast({
        title: "تم إضافة المحتوى",
        description: `تم إضافة "${content.title}" إلى البرنامج بنجاح`,
      });
    }
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تصدير البيانات",
      description: `جاري تصدير البيانات بصيغة ${format.toUpperCase()}...`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة",
      description: "جاري إعداد التقرير للطباعة...",
    });
  };

  const getDashboardStats = () => ({
    totalPrograms: talentPrograms.length,
    totalParticipants: talentPrograms.reduce((acc, prog) => acc + prog.enrolled, 0),
    activePrograms: talentPrograms.filter(p => p.status === 'active').length,
    completionRate: 88,
    highPerformers: talentProfiles.filter(p => p.performanceRating >= 4.5).length,
    highPotentials: talentProfiles.filter(p => p.potentialLevel === 'high').length,
    avgEngagement: Math.round(talentProfiles.reduce((acc, p) => acc + p.engagementScore, 0) / talentProfiles.length)
  });

  const stats = getDashboardStats();

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'assessment': return <Target className="h-4 w-4" />;
      case 'workshop': return <Users className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case 'leadership': return 'bg-blue-100 text-blue-800';
      case 'technical': return 'bg-green-100 text-green-800';
      case 'soft_skills': return 'bg-purple-100 text-purple-800';
      case 'mentorship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderProfessionalHeader = () => (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-success p-8 mb-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
              <Share className="h-4 w-4 ml-2" />
              استيراد
            </Button>
            <Button className="bg-success/80 border-success/30 text-white hover:bg-success/90 backdrop-blur-sm" onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button className="bg-destructive/80 border-destructive/30 text-white hover:bg-destructive/90 backdrop-blur-sm" onClick={() => handleExport('pdf')}>
              <FileText className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button className="bg-warning/80 border-warning/30 text-white hover:bg-warning/90 backdrop-blur-sm" onClick={handlePrint}>
              <Eye className="h-4 w-4 ml-2" />
              طباعة
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Star className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            منظومة إدارة المواهب الذكية
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            نظام شامل لتطوير وإدارة المواهب البشرية مع برامج تدريبية متقدمة وتحليلات ذكية
          </p>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Main Analytics Panel */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-slate-900 via-primary to-success text-white shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI Brain Visualization */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary-glow">
                  تحليل المواهب الذكي
                </h3>
                <div className="relative h-48 bg-gradient-to-br from-primary/50 to-success/50 rounded-xl p-4 flex items-center justify-center">
                  <Brain className="h-32 w-32 text-primary-glow opacity-80" />
                  <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                    {stats.totalPrograms} برنامج
                  </div>
                  <div className="absolute bottom-4 left-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                    {stats.totalParticipants} مشارك
                  </div>
                </div>
              </div>

              {/* Globe Visualization */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-success">
                  الانتشار والتأثير
                </h3>
                <div className="relative h-48 bg-gradient-to-br from-success/50 to-warning/50 rounded-xl p-4 flex items-center justify-center">
                  <Globe className="h-32 w-32 text-success opacity-80" />
                  <div className="absolute top-4 right-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                    {stats.completionRate}% إكمال
                  </div>
                  <div className="absolute bottom-4 left-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                    {stats.avgEngagement}% رضا
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="mt-8">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={talentAnalytics}>
                  <defs>
                    <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Area type="monotone" dataKey="participants" stroke="hsl(var(--primary))" fill="url(#colorParticipants)" />
                  <Area type="monotone" dataKey="completion" stroke="hsl(var(--success))" fill="url(#colorCompletion)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Statistics */}
      <div className="space-y-6">
        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                إحصائيات سريعة
              </h3>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {aiTalentInsights.map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${insight.color}15` }}>
                  <div>
                    <p className="font-semibold text-gray-800">{insight.category}</p>
                    <p className="text-sm text-gray-600">{insight.count} موظف</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold" style={{ color: insight.color }}>{insight.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              توزيع البرامج
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={programTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {programTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTalentPrograms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">برامج إدارة المواهب</h2>
        <div className="flex gap-2">
          <Dialog open={showAddProgram} onOpenChange={setShowAddProgram}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إضافة برنامج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة برنامج تطوير مواهب جديد</DialogTitle>
                <DialogDescription>
                  قم بإنشاء برنامج تدريبي جديد لتطوير مهارات ومواهب الموظفين
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">اسم البرنامج</Label>
                  <Input
                    id="title"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                    placeholder="مثل: برنامج القيادة المتقدمة"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">وصف البرنامج</Label>
                  <Textarea
                    id="description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    placeholder="وصف مفصل عن أهداف ومحتوى البرنامج..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">نوع البرنامج</Label>
                    <Select value={newProgram.type} onValueChange={(value: any) => setNewProgram({...newProgram, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leadership">القيادة</SelectItem>
                        <SelectItem value="technical">التقنية</SelectItem>
                        <SelectItem value="soft_skills">المهارات الناعمة</SelectItem>
                        <SelectItem value="mentorship">الإرشاد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">المدة</Label>
                    <Input
                      id="duration"
                      value={newProgram.duration}
                      onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                      placeholder="مثل: 3 أشهر"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">السعة القصوى</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newProgram.capacity}
                    onChange={(e) => setNewProgram({...newProgram, capacity: parseInt(e.target.value) || 0})}
                    placeholder="عدد المشاركين المسموح"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddProgram(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddProgram}>
                  إضافة البرنامج
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showContentManager} onOpenChange={setShowContentManager}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                إدارة المحتوى
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>إدارة محتوى البرامج</DialogTitle>
                <DialogDescription>
                  إضافة وتعديل محتويات البرامج التدريبية
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="program-select">اختر البرنامج</Label>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر برنامج لإدارة محتواه" />
                    </SelectTrigger>
                    <SelectContent>
                      {talentPrograms.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedProgram && (
                  <>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">إضافة محتوى جديد</h4>
                      <div className="grid gap-3">
                        <div className="grid gap-2">
                          <Label htmlFor="content-title">عنوان المحتوى</Label>
                          <Input
                            id="content-title"
                            value={newContent.title}
                            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                            placeholder="مثل: مقدمة في القيادة الحديثة"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="grid gap-2">
                            <Label htmlFor="content-type">نوع المحتوى</Label>
                            <Select value={newContent.type} onValueChange={(value: any) => setNewContent({...newContent, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">فيديو</SelectItem>
                                <SelectItem value="document">مستند</SelectItem>
                                <SelectItem value="assessment">تقييم</SelectItem>
                                <SelectItem value="workshop">ورشة عمل</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="content-duration">المدة</Label>
                            <Input
                              id="content-duration"
                              value={newContent.duration}
                              onChange={(e) => setNewContent({...newContent, duration: e.target.value})}
                              placeholder="مثل: 45 دقيقة"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="content-url">رابط المحتوى (اختياري)</Label>
                          <Input
                            id="content-url"
                            value={newContent.url}
                            onChange={(e) => setNewContent({...newContent, url: e.target.value})}
                            placeholder="مثل: /content/video.mp4"
                          />
                        </div>
                        <Button onClick={handleAddContent} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          إضافة المحتوى
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">المحتوى الحالي</h4>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {talentPrograms.find(p => p.id === selectedProgram)?.content.map((content) => (
                            <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                {getContentTypeIcon(content.type)}
                                <div>
                                  <h5 className="font-medium">{content.title}</h5>
                                  <p className="text-sm text-muted-foreground">{content.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={content.completed ? 'default' : 'secondary'}>
                                  {content.completed ? 'مكتمل' : 'جديد'}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {talentPrograms.map((program) => (
          <Card key={program.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{program.title}</span>
                <div className="flex items-center gap-2">
                  <Badge className={getProgramTypeColor(program.type)}>
                    {program.type === 'leadership' && 'القيادة'}
                    {program.type === 'technical' && 'التقنية'}
                    {program.type === 'soft_skills' && 'المهارات الناعمة'}
                    {program.type === 'mentorship' && 'الإرشاد'}
                  </Badge>
                  <Badge variant="outline">
                    {program.enrolled}/{program.capacity}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription className="text-sm">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المدة: {program.duration}</span>
                  <Badge variant={program.status === 'active' ? 'default' : program.status === 'upcoming' ? 'secondary' : 'outline'}>
                    {program.status === 'active' && 'نشط'}
                    {program.status === 'upcoming' && 'قادم'}
                    {program.status === 'completed' && 'مكتمل'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>نسبة الإشغال</span>
                    <span>{Math.round((program.enrolled / program.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(program.enrolled / program.capacity) * 100} />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    المحتوى ({program.content.length} عنصر)
                  </h4>
                  <ScrollArea className="h-[120px]">
                    <div className="space-y-2">
                      {program.content.slice(0, 3).map((content) => (
                        <div key={content.id} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                          {getContentTypeIcon(content.type)}
                          <span className="flex-1">{content.title}</span>
                          <span className="text-xs text-muted-foreground">{content.duration}</span>
                        </div>
                      ))}
                      {program.content.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{program.content.length - 3} عنصر إضافي
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button size="sm">
                    عرض التفاصيل
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTalentProfiles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ملفات المواهب</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في المواهب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talentProfiles
          .filter(profile => 
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.department.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((profile) => (
          <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.employeeId}</p>
                </div>
                <Badge variant={profile.potentialLevel === 'high' ? 'default' : profile.potentialLevel === 'medium' ? 'secondary' : 'outline'}>
                  {profile.potentialLevel === 'high' && 'إمكانية عالية'}
                  {profile.potentialLevel === 'medium' && 'إمكانية متوسطة'}
                  {profile.potentialLevel === 'low' && 'إمكانية منخفضة'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{profile.position}</p>
                <p className="text-sm text-muted-foreground">{profile.department}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">تقييم الأداء</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold">{profile.performanceRating}/5.0</span>
                  </div>
                </div>
                <Progress value={(profile.performanceRating / 5) * 100} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">مستوى المشاركة</span>
                  <span className="font-bold">{profile.engagementScore}%</span>
                </div>
                <Progress value={profile.engagementScore} />
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">خطر الاستقالة</span>
                  <Badge variant={
                    profile.retentionRisk === 'high' ? 'destructive' :
                    profile.retentionRisk === 'medium' ? 'secondary' : 'outline'
                  }>
                    {profile.retentionRisk === 'high' && 'عالي'}
                    {profile.retentionRisk === 'medium' && 'متوسط'}
                    {profile.retentionRisk === 'low' && 'منخفض'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">المسار الوظيفي: {profile.careerPath}</p>
              </div>

              <div className="flex justify-between pt-3 border-t">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  عرض الملف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {renderProfessionalHeader()}
        {renderAnalyticsDashboard()}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              برامج المواهب
            </TabsTrigger>
            <TabsTrigger value="profiles" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              ملفات المواهب
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي البرامج</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPrograms}</div>
                  <p className="text-xs text-muted-foreground">{stats.activePrograms} برنامج نشط</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المشاركين</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalParticipants}</div>
                  <p className="text-xs text-muted-foreground">عبر جميع البرامج</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المواهب عالية الأداء</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.highPerformers}</div>
                  <p className="text-xs text-muted-foreground">من {talentProfiles.length} موظف</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">معدل الإكمال</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">متوسط إكمال البرامج</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            {renderTalentPrograms()}
          </TabsContent>

          <TabsContent value="profiles" className="mt-6">
            {renderTalentProfiles()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TalentManagement;