import React, { useState } from 'react';
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
  Heart, 
  Trophy, 
  Users, 
  Target,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Eye,
  Settings,
  Bell,
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
  FileText,
  Smile,
  HeartHandshake,
  Dumbbell,
  Briefcase,
  Gift,
  BarChart,
  ShoppingCart,
  Star,
  CheckCircle2,
  AlertTriangle,
  Clock,
  PlayCircle,
  BookOpen,
  Headphones,
  Shield,
  MapPin,
  Calendar as CalendarIcon,
  MessageSquare,
  ThumbsUp,
  Percent
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';

interface QualityOfLifeSystemProps {
  onBack: () => void;
}

interface QualityProgram {
  id: string;
  name: string;
  nameEn: string;
  category: 'sports' | 'cultural' | 'social' | 'volunteering';
  status: 'active' | 'inactive' | 'completed' | 'planning';
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  targetParticipants: number;
  responsibleManager: string;
  budget: number;
}

interface SupportService {
  id: string;
  type: 'psychological' | 'social' | 'financial' | 'legal';
  title: string;
  description: string;
  status: 'available' | 'busy' | 'offline';
  provider: string;
  sessions: number;
  rating: number;
}

interface HealthChallenge {
  id: string;
  name: string;
  type: 'steps' | 'sports' | 'wellness' | 'nutrition';
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  points: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface WorkLifeRequest {
  id: string;
  employeeName: string;
  requestType: 'flexible_hours' | 'remote_work' | 'compressed_week' | 'job_share';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  requestDate: string;
  startDate: string;
  reason: string;
  managerApproval: boolean;
  hrApproval: boolean;
}

interface RewardItem {
  id: string;
  name: string;
  type: 'voucher' | 'discount' | 'gift' | 'experience';
  points: number;
  description: string;
  provider: string;
  available: number;
  claimed: number;
  status: 'active' | 'inactive' | 'out_of_stock';
}

interface Survey {
  id: string;
  title: string;
  type: 'satisfaction' | 'engagement' | 'feedback' | 'pulse';
  status: 'draft' | 'active' | 'completed' | 'analyzing';
  responses: number;
  targetResponses: number;
  startDate: string;
  endDate: string;
  averageRating: number;
}

export const QualityOfLifeSystem: React.FC<QualityOfLifeSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const qualityPrograms: QualityProgram[] = [
    {
      id: '1',
      name: 'برنامج اللياقة البدنية',
      nameEn: 'Fitness Program',
      category: 'sports',
      status: 'active',
      description: 'برنامج شامل للياقة البدنية يشمل تمارين متنوعة وتحديات صحية',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      participants: 156,
      targetParticipants: 200,
      responsibleManager: 'أحمد محمد الخالدي',
      budget: 25000
    },
    {
      id: '2',
      name: 'النادي الثقافي',
      nameEn: 'Cultural Club',
      category: 'cultural',
      status: 'active',
      description: 'أنشطة ثقافية متنوعة تشمل القراءة والمحاضرات والفعاليات الثقافية',
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      participants: 89,
      targetParticipants: 120,
      responsibleManager: 'فاطمة أحمد السالم',
      budget: 15000
    },
    {
      id: '3',
      name: 'مبادرة العمل التطوعي',
      nameEn: 'Volunteer Initiative',
      category: 'volunteering',
      status: 'planning',
      description: 'مبادرات تطوعية لخدمة المجتمع والمشاركة في الأعمال الخيرية',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      participants: 0,
      targetParticipants: 80,
      responsibleManager: 'نورا محمد العتيبي',
      budget: 10000
    }
  ];

  const supportServices: SupportService[] = [
    {
      id: '1',
      type: 'psychological',
      title: 'الاستشارة النفسية',
      description: 'جلسات استشارية نفسية سرية مع أخصائيين معتمدين',
      status: 'available',
      provider: 'د. سارة أحمد المطيري',
      sessions: 45,
      rating: 4.8
    },
    {
      id: '2',
      type: 'social',
      title: 'الدعم الاجتماعي',
      description: 'مساعدة في حل المشاكل الاجتماعية والأسرية',
      status: 'available',
      provider: 'أ. محمد عبدالله الشمري',
      sessions: 32,
      rating: 4.6
    },
    {
      id: '3',
      type: 'financial',
      title: 'الاستشارة المالية',
      description: 'نصائح مالية وتخطيط للميزانية الشخصية',
      status: 'busy',
      provider: 'أ. خالد سعد القحطاني',
      sessions: 28,
      rating: 4.7
    }
  ];

  const healthChallenges: HealthChallenge[] = [
    {
      id: '1',
      name: 'تحدي 10,000 خطوة',
      type: 'steps',
      description: 'تحدي يومي للوصول لـ 10,000 خطوة يوميًا',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      participants: 234,
      points: 500,
      status: 'active'
    },
    {
      id: '2',
      name: 'بطولة كرة القدم',
      type: 'sports',
      description: 'بطولة كرة قدم بين أقسام الشركة',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      participants: 64,
      points: 1000,
      status: 'active'
    },
    {
      id: '3',
      name: 'شهر التأمل والاسترخاء',
      type: 'wellness',
      description: 'جلسات تأمل واسترخاء للموظفين',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      participants: 0,
      points: 300,
      status: 'upcoming'
    }
  ];

  const workLifeRequests: WorkLifeRequest[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد الخالدي',
      requestType: 'remote_work',
      status: 'approved',
      requestDate: '2024-01-10',
      startDate: '2024-01-20',
      reason: 'ظروف عائلية',
      managerApproval: true,
      hrApproval: true
    },
    {
      id: '2',
      employeeName: 'فاطمة أحمد السالم',
      requestType: 'flexible_hours',
      status: 'pending',
      requestDate: '2024-01-15',
      startDate: '2024-02-01',
      reason: 'التوازن بين العمل والحياة',
      managerApproval: false,
      hrApproval: false
    }
  ];

  const rewardItems: RewardItem[] = [
    {
      id: '1',
      name: 'قسيمة شراء 500 ريال',
      type: 'voucher',
      points: 2500,
      description: 'قسيمة شراء من متاجر مختارة',
      provider: 'متاجر الشراكة',
      available: 20,
      claimed: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'خصم 30% على المطاعم',
      type: 'discount',
      points: 1000,
      description: 'خصم على مطاعم مختارة',
      provider: 'شبكة المطاعم',
      available: 50,
      claimed: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'تذكرة سينما مجانية',
      type: 'experience',
      points: 800,
      description: 'تذكرة مجانية لدور السينما',
      provider: 'سينما الرياض',
      available: 0,
      claimed: 30,
      status: 'out_of_stock'
    }
  ];

  const surveys: Survey[] = [
    {
      id: '1',
      title: 'استطلاع رضا الموظفين',
      type: 'satisfaction',
      status: 'active',
      responses: 145,
      targetResponses: 200,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      averageRating: 4.2
    },
    {
      id: '2',
      title: 'مؤشر الانخراط الوظيفي',
      type: 'engagement',
      status: 'completed',
      responses: 189,
      targetResponses: 180,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      averageRating: 3.9
    },
    {
      id: '3',
      title: 'تقييم برامج جودة الحياة',
      type: 'feedback',
      status: 'draft',
      responses: 0,
      targetResponses: 150,
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      averageRating: 0
    }
  ];

  // Analytics data
  const satisfactionData = [
    { month: 'يناير', satisfaction: 85, engagement: 82, programs: 15 },
    { month: 'فبراير', satisfaction: 87, engagement: 84, programs: 18 },
    { month: 'مارس', satisfaction: 89, engagement: 86, programs: 20 },
    { month: 'أبريل', satisfaction: 88, engagement: 83, programs: 17 },
    { month: 'مايو', satisfaction: 91, engagement: 88, programs: 22 },
    { month: 'يونيو', satisfaction: 93, engagement: 90, programs: 25 }
  ];

  const programDistribution = [
    { name: 'البرامج الرياضية', value: 35, color: '#3b82f6' },
    { name: 'البرامج الثقافية', value: 25, color: '#10b981' },
    { name: 'البرامج الاجتماعية', value: 20, color: '#f59e0b' },
    { name: 'العمل التطوعي', value: 15, color: '#8b5cf6' },
    { name: 'برامج أخرى', value: 5, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    employeeSatisfaction: 92,
    activePrograms: qualityPrograms.filter(p => p.status === 'active').length,
    participationRate: 78,
    supportRequests: 156,
    totalRewards: 2847,
    completedSurveys: surveys.filter(s => s.status === 'completed').length
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير جودة الحياة كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleAddProgram = () => {
    toast({
      title: "تم إضافة البرنامج",
      description: "تم إضافة برنامج جودة الحياة الجديد بنجاح",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProgram = (id: string) => {
    toast({
      title: "تم تحديث البرنامج",
      description: "تم تحديث بيانات البرنامج بنجاح",
    });
  };

  const handleDeleteProgram = (id: string) => {
    toast({
      title: "تم حذف البرنامج",
      description: "تم حذف البرنامج من النظام",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'available':
      case 'approved': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'planning':
      case 'pending':
      case 'busy': 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
      case 'offline':
      case 'rejected': 
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'completed': 
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'out_of_stock': 
        return 'bg-red-100 text-red-800 border-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'active': 'نشط',
      'inactive': 'غير نشط',
      'completed': 'مكتمل',
      'planning': 'قيد التخطيط',
      'available': 'متاح',
      'busy': 'مشغول',
      'offline': 'غير متاح',
      'pending': 'قيد المراجعة',
      'approved': 'موافق عليه',
      'rejected': 'مرفوض',
      'out_of_stock': 'غير متوفر',
      'draft': 'مسودة',
      'analyzing': 'قيد التحليل',
      'upcoming': 'قادم'
    };
    return statusMap[status] || status;
  };

  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'sports': 'رياضية',
      'cultural': 'ثقافية',
      'social': 'اجتماعية',
      'volunteering': 'تطوعية',
      'psychological': 'نفسية',
      'financial': 'مالية',
      'legal': 'قانونية',
      'steps': 'خطوات',
      'wellness': 'عافية',
      'nutrition': 'تغذية',
      'remote_work': 'عمل عن بُعد',
      'flexible_hours': 'ساعات مرنة',
      'compressed_week': 'أسبوع مضغوط',
      'job_share': 'مشاركة وظيفية',
      'voucher': 'قسيمة',
      'discount': 'خصم',
      'gift': 'هدية',
      'experience': 'تجربة',
      'satisfaction': 'رضا',
      'engagement': 'انخراط',
      'feedback': 'تقييم',
      'pulse': 'نبض'
    };
    return categoryMap[category] || category;
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
            <Heart className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام جودة الحياة المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لتحسين جودة الحياة الوظيفية وتعزيز رفاهية الموظفين
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Heart className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 ml-2" />
              برنامج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة برنامج جودة حياة جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="programName">اسم البرنامج</Label>
                <Input id="programName" placeholder="أدخل اسم البرنامج" />
              </div>
              <div>
                <Label htmlFor="category">الفئة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">رياضية</SelectItem>
                    <SelectItem value="cultural">ثقافية</SelectItem>
                    <SelectItem value="social">اجتماعية</SelectItem>
                    <SelectItem value="volunteering">تطوعية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">تاريخ البداية</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">تاريخ النهاية</Label>
                <Input id="endDate" type="date" />
              </div>
              <div>
                <Label htmlFor="targetParticipants">عدد المشاركين المستهدف</Label>
                <Input id="targetParticipants" type="number" placeholder="100" />
              </div>
              <div>
                <Label htmlFor="budget">الميزانية</Label>
                <Input id="budget" type="number" placeholder="10000" />
              </div>
              <div className="col-span-full">
                <Label htmlFor="description">الوصف</Label>
                <Textarea id="description" placeholder="وصف البرنامج والأهداف" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddProgram}>
                إضافة البرنامج
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                <p className="text-sm text-muted-foreground">رضا الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.employeeSatisfaction}%</p>
              </div>
              <Smile className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">البرامج النشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activePrograms}</p>
              </div>
              <PlayCircle className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل المشاركة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.participationRate}%</p>
              </div>
              <Users className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات الدعم</p>
                <p className="text-2xl font-bold text-blue-600">{stats.supportRequests}</p>
              </div>
              <HeartHandshake className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المكافآت</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalRewards}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الاستطلاعات المكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedSurveys}</p>
              </div>
              <BarChart className="h-8 w-8 text-green-500/60" />
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
              مؤشرات الرضا والانخراط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="engagement" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="programs" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع البرامج
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={programDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {programDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي لجودة الحياة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">رضا عالي</span>
              </div>
              <p className="text-sm text-emerald-700">
                ارتفاع ملحوظ في مؤشرات رضا الموظفين بنسبة 12% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">فرصة تحسين</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بزيادة البرامج الثقافية لتحسين التوازن في المشاركة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                تفعيل برامج العمل المرن قد يزيد من الرضا الوظيفي بنسبة 8%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              أحدث الأنشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Trophy className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">انتهاء تحدي 10,000 خطوة</p>
                  <p className="text-xs text-muted-foreground">234 مشارك - نسبة النجاح 87%</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ ساعة</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">استطلاع رضا جديد</p>
                  <p className="text-xs text-muted-foreground">145 استجابة من أصل 200</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ 3 ساعات</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Gift className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">استبدال مكافآت جديدة</p>
                  <p className="text-xs text-muted-foreground">15 قسيمة شراء تم استبدالها</p>
                </div>
                <span className="text-xs text-muted-foreground">منذ 5 ساعات</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-1">
                <Plus className="h-5 w-5" />
                <span className="text-xs">برنامج جديد</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <BarChart className="h-5 w-5" />
                <span className="text-xs">إنشاء استطلاع</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <HeartHandshake className="h-5 w-5" />
                <span className="text-xs">خدمة دعم</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-1">
                <Dumbbell className="h-5 w-5" />
                <span className="text-xs">تحدي رياضي</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProgramsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في البرامج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع البرامج</SelectItem>
              <SelectItem value="sports">رياضية</SelectItem>
              <SelectItem value="cultural">ثقافية</SelectItem>
              <SelectItem value="social">اجتماعية</SelectItem>
              <SelectItem value="volunteering">تطوعية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 ml-1" />
            طباعة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qualityPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(program.status)}>
                  {getStatusText(program.status)}
                </Badge>
                <Badge variant="outline">
                  {getCategoryText(program.category)}
                </Badge>
              </div>
              <CardTitle className="text-lg">{program.name}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المشاركين:</span>
                  <span className="font-medium">{program.participants} / {program.targetParticipants}</span>
                </div>
                <Progress 
                  value={(program.participants / program.targetParticipants) * 100} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المسؤول:</span>
                  <span className="font-medium">{program.responsibleManager}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">الميزانية:</span>
                  <span className="font-medium">{program.budget.toLocaleString()} ريال</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span className="font-medium">{program.startDate} - {program.endDate}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => handleEditProgram(program.id)}>
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  عرض
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDeleteProgram(program.id)}>
                  <Trash2 className="h-4 w-4 ml-1" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSupportServicesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">خدمات الدعم</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            خدمة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supportServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(service.status)}>
                  {getStatusText(service.status)}
                </Badge>
                <Badge variant="outline">
                  {getCategoryText(service.type)}
                </Badge>
              </div>
              <CardTitle className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5" />
                {service.title}
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المختص:</span>
                  <span className="font-medium">{service.provider}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">الجلسات:</span>
                  <span className="font-medium">{service.sessions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">التقييم:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 ml-1" />
                  حجز جلسة
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHealthFitnessTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الصحة واللياقة</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            تحدي جديد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(challenge.status)}>
                  {getStatusText(challenge.status)}
                </Badge>
                <Badge variant="outline">
                  {getCategoryText(challenge.type)}
                </Badge>
              </div>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                {challenge.name}
              </CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المشاركين:</span>
                  <span className="font-medium">{challenge.participants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">النقاط:</span>
                  <span className="font-medium text-primary">{challenge.points}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المدة:</span>
                  <span className="font-medium">{challenge.startDate} - {challenge.endDate}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  <UserPlus className="h-4 w-4 ml-1" />
                  انضمام
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderWorkLifeBalanceTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">التوازن بين العمل والحياة</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            طلب جديد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workLifeRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.employeeName}</h3>
                    <p className="text-sm text-muted-foreground">{getCategoryText(request.requestType)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {request.requestDate}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                  <p className="font-medium">{request.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">موافقة المدير</p>
                  <p className="font-medium">{request.managerApproval ? 'نعم' : 'لا'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">موافقة الموارد البشرية</p>
                  <p className="font-medium">{request.hrApproval ? 'نعم' : 'لا'}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">السبب</p>
                <p className="text-sm">{request.reason}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  عرض
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button size="sm" variant="outline">
                  <CheckCircle2 className="h-4 w-4 ml-1" />
                  موافقة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">المكافآت والتقدير</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            مكافأة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardItems.map((reward) => (
          <Card key={reward.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(reward.status)}>
                  {getStatusText(reward.status)}
                </Badge>
                <Badge variant="outline">
                  {getCategoryText(reward.type)}
                </Badge>
              </div>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                {reward.name}
              </CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">النقاط المطلوبة:</span>
                  <span className="font-bold text-primary">{reward.points}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المزود:</span>
                  <span className="font-medium">{reward.provider}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المتاح:</span>
                  <span className="font-medium">{reward.available}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تم الاستبدال:</span>
                  <span className="font-medium">{reward.claimed}</span>
                </div>
                <Progress 
                  value={reward.available > 0 ? ((reward.claimed / (reward.claimed + reward.available)) * 100) : 100} 
                  className="h-2"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1" disabled={reward.status === 'out_of_stock'}>
                  <ShoppingCart className="h-4 w-4 ml-1" />
                  استبدال
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSurveysTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">الاستطلاعات</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 ml-1" />
            استطلاع جديد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{survey.title}</h3>
                    <p className="text-sm text-muted-foreground">{getCategoryText(survey.type)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(survey.status)}>
                    {getStatusText(survey.status)}
                  </Badge>
                  {survey.averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{survey.averageRating}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الاستجابات</span>
                  <span className="text-sm font-medium">{survey.responses} / {survey.targetResponses}</span>
                </div>
                <Progress 
                  value={(survey.responses / survey.targetResponses) * 100} 
                  className="h-2"
                />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                  <p className="font-medium">{survey.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ النهاية</p>
                  <p className="font-medium">{survey.endDate}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 ml-1" />
                  عرض النتائج
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 ml-1" />
                  تصدير PDF
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4 ml-1" />
                  مشاركة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إعدادات جودة الحياة</h2>
        <Button size="sm">
          <Archive className="h-4 w-4 ml-1" />
          حفظ الإعدادات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات البرامج</CardTitle>
            <CardDescription>إعدادات عامة لبرامج جودة الحياة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoApprove">الموافقة التلقائية على البرامج</Label>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">إشعارات البرامج</Label>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="budget">إدارة الميزانية</Label>
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات المكافآت</CardTitle>
            <CardDescription>إدارة نظام النقاط والمكافآت</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="pointsSystem">نظام النقاط</Label>
              <Button variant="outline" size="sm">
                <Trophy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rewardCatalog">كتالوج المكافآت</Label>
              <Button variant="outline" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="redemption">قواعد الاستبدال</Label>
              <Button variant="outline" size="sm">
                <Gift className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الاستطلاعات</CardTitle>
            <CardDescription>قوالب وإعدادات الاستطلاعات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="templates">قوالب الاستطلاعات</Label>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="anonymous">الاستطلاعات المجهولة</Label>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">التحليلات المتقدمة</Label>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الصلاحيات</CardTitle>
            <CardDescription>إدارة صلاحيات المستخدمين</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hrAccess">صلاحيات الموارد البشرية</Label>
              <Button variant="outline" size="sm">
                <UserCheck className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="managerAccess">صلاحيات المديرين</Label>
              <Button variant="outline" size="sm">
                <Crown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="employeeAccess">صلاحيات الموظفين</Label>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex flex-col gap-1 py-3">
              <Trophy className="h-4 w-4" />
              <span className="text-xs">البرامج والمبادرات</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex flex-col gap-1 py-3">
              <HeartHandshake className="h-4 w-4" />
              <span className="text-xs">خدمات الدعم</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex flex-col gap-1 py-3">
              <Dumbbell className="h-4 w-4" />
              <span className="text-xs">الصحة واللياقة</span>
            </TabsTrigger>
            <TabsTrigger value="worklife" className="flex flex-col gap-1 py-3">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs">التوازن الوظيفي</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex flex-col gap-1 py-3">
              <Gift className="h-4 w-4" />
              <span className="text-xs">المكافآت</span>
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex flex-col gap-1 py-3">
              <BarChart className="h-4 w-4" />
              <span className="text-xs">الاستطلاعات</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            {renderProgramsTab()}
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            {renderSupportServicesTab()}
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            {renderHealthFitnessTab()}
          </TabsContent>

          <TabsContent value="worklife" className="space-y-6">
            {renderWorkLifeBalanceTab()}
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            {renderRewardsTab()}
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            {renderSurveysTab()}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {renderSettingsTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};