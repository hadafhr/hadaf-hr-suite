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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Building2,
  Shield,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  Archive,
  Edit,
  Trash2,
  Share,
  Bell,
  CreditCard,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Bot,
  Upload,
  Phone,
  Mail,
  Settings,
  Eye,
  RefreshCw,
  Send,
  Paperclip,
  History,
  BookOpen,
  HelpCircle,
  Star,
  ThumbsUp,
  ArrowRight,
  ArrowLeft,
  Home,
  Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface EmployeeRequest {
  id: string;
  type: 'vacation' | 'certificate' | 'loan' | 'advance' | 'other';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  submittedDate: string;
  reviewedBy?: string;
  amount?: number;
  referenceNumber: string;
}

interface EmployeeService {
  id: string;
  name: string;
  nameEn: string;
  category: 'requests' | 'documents' | 'profile' | 'chat' | 'reports';
  description: string;
  usage: number;
  satisfaction: number;
  avgProcessingTime: string;
  icon: React.ReactNode;
}

export default function EmployeeServicesDepartment() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', content: 'مرحباً! كيف يمكنني مساعدتك اليوم؟', timestamp: '10:30' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for employee requests
  const employeeRequests: EmployeeRequest[] = [
    {
      id: '1',
      type: 'vacation',
      title: 'طلب إجازة سنوية',
      description: 'طلب إجازة سنوية لمدة 15 يوم',
      status: 'pending',
      submittedDate: '2024-01-20',
      referenceNumber: 'REQ-2024-001'
    },
    {
      id: '2',
      type: 'certificate',
      title: 'شهادة راتب',
      description: 'طلب شهادة راتب للبنك',
      status: 'approved',
      submittedDate: '2024-01-18',
      reviewedBy: 'أحمد محمد',
      referenceNumber: 'REQ-2024-002'
    },
    {
      id: '3',
      type: 'advance',
      title: 'سلفة شهرية',
      description: 'طلب سلفة على الراتب',
      status: 'in_review',
      submittedDate: '2024-01-19',
      amount: 5000,
      referenceNumber: 'REQ-2024-003'
    }
  ];

  const employeeServices: EmployeeService[] = [
    {
      id: '1',
      name: 'طلبات الإجازات',
      nameEn: 'Leave Requests',
      category: 'requests',
      description: 'تقديم ومتابعة طلبات الإجازات المختلفة',
      usage: 156,
      satisfaction: 4.8,
      avgProcessingTime: '2 أيام',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      id: '2',
      name: 'الشهادات والخطابات',
      nameEn: 'Certificates & Letters',
      category: 'documents',
      description: 'إصدار الشهادات والخطابات الرسمية',
      usage: 89,
      satisfaction: 4.9,
      avgProcessingTime: '1 يوم',
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: '3',
      name: 'إدارة البيانات الشخصية',
      nameEn: 'Profile Management',
      category: 'profile',
      description: 'تحديث وإدارة البيانات الشخصية',
      usage: 234,
      satisfaction: 4.7,
      avgProcessingTime: 'فوري',
      icon: <User className="h-6 w-6" />
    },
    {
      id: '4',
      name: 'الدردشة مع الموارد البشرية',
      nameEn: 'HR Chat',
      category: 'chat',
      description: 'تواصل مباشر مع قسم الموارد البشرية',
      usage: 78,
      satisfaction: 4.6,
      avgProcessingTime: '30 دقيقة',
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  // Analytics data
  const serviceUsageData = [
    { month: 'يناير', requests: 145, certificates: 89, profile: 234, chat: 78 },
    { month: 'فبراير', requests: 167, certificates: 92, profile: 245, chat: 85 },
    { month: 'مارس', requests: 189, certificates: 108, profile: 267, chat: 91 },
    { month: 'أبريل', requests: 178, certificates: 95, profile: 289, chat: 88 },
    { month: 'مايو', requests: 201, certificates: 112, profile: 298, chat: 94 },
    { month: 'يونيو', requests: 223, certificates: 125, profile: 312, chat: 102 }
  ];

  const requestTypeDistribution = [
    { name: 'طلبات الإجازة', value: 35, color: '#3b82f6' },
    { name: 'الشهادات', value: 25, color: '#10b981' },
    { name: 'السلف والمقدمات', value: 20, color: '#f59e0b' },
    { name: 'تحديث البيانات', value: 15, color: '#8b5cf6' },
    { name: 'أخرى', value: 5, color: '#ef4444' }
  ];

  // Statistics
  const stats = {
    totalRequests: employeeRequests.length,
    pendingRequests: employeeRequests.filter(r => r.status === 'pending').length,
    approvedRequests: employeeRequests.filter(r => r.status === 'approved').length,
    avgSatisfaction: 4.7,
    avgProcessingTime: '1.5 يوم',
    totalServices: employeeServices.length
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user' as const,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          sender: 'ai' as const,
          content: 'شكراً لك على استفسارك. سأقوم بمراجعة طلبك والرد عليك في أقرب وقت ممكن.',
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير خدمات الموظفين كملف PDF",
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
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'approved': 'موافق عليه',
      'pending': 'في الانتظار',
      'in_review': 'قيد المراجعة',
      'rejected': 'مرفوض'
    };
    return statusMap[status] || status;
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" className="border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 hover:text-[#008C6A] transition-all duration-300 bg-black/20 backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-[#008C6A]/30"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#008C6A] to-[#00694F] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#008C6A]/30 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Users className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#008C6A] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              نظام خدمات الموظفين المتطور
            </h1>
            <p className="text-gray-300 text-lg">
              مركز شامل لجميع الخدمات والطلبات مع الذكاء الاصطناعي المتقدم
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#008C6A]/30 text-[#008C6A] bg-[#008C6A]/10 backdrop-blur-sm px-4 py-2 text-sm font-medium">
          <Users className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setIsRequestDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          طلب جديد
        </Button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalRequests}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">طلبات موافق عليها</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.approvedRequests}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الرضا</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgSatisfaction}</p>
              </div>
              <Star className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">وقت المعالجة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgProcessingTime}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الخدمات</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalServices}</p>
              </div>
              <Award className="h-8 w-8 text-green-500/60" />
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
              استخدام الخدمات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={serviceUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="certificates" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="profile" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="chat" stackId="4" stroke="#8b5cf6" fill="#8b5cf6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={requestTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            آخر الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employeeRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{request.title}</h4>
                    <p className="text-sm text-gray-600">{request.referenceNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                  <span className="text-sm text-gray-500">{request.submittedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي لخدمات الموظفين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في رضا الموظفين عن الخدمات المقدمة بنسبة 12%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحسين مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بتسريع معالجة طلبات الشهادات لتقليل وقت الانتظار
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                من المتوقع زيادة طلبات الإجازة بنسبة 20% خلال الشهر القادم
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative z-10">
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 h-auto p-1 bg-muted/50">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex flex-col gap-1 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">طلبات الموظفين</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-3">
              <User className="h-4 w-4" />
              <span className="text-xs">الملف الشخصي</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col gap-1 py-3">
              <Archive className="h-4 w-4" />
              <span className="text-xs">الوثائق والشهادات</span>
            </TabsTrigger>
            <TabsTrigger value="selfservice" className="flex flex-col gap-1 py-3">
              <UserCheck className="h-4 w-4" />
              <span className="text-xs">الخدمة الذاتية</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex flex-col gap-1 py-3">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">الدردشة مع HR</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">طلبات الموظفين</h2>
                <Button onClick={() => setIsRequestDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  طلب جديد
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">طلب إجازة</h3>
                    <p className="text-sm text-gray-600">إجازة سنوية، مرضية، طارئة</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">شهادة راتب</h3>
                    <p className="text-sm text-gray-600">للبنوك والجهات الرسمية</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">شهادة خبرة</h3>
                    <p className="text-sm text-gray-600">شهادة خبرة رسمية</p>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">سلفة أو مقدم</h3>
                    <p className="text-sm text-gray-600">طلب سلفة على الراتب</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>سجل الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employeeRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{request.title}</h4>
                            <p className="text-sm text-gray-600">{request.description}</p>
                            <p className="text-xs text-gray-500">{request.referenceNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">الملف الشخصي والبيانات</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      المعلومات الأساسية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 ml-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div>
                        <Label>الاسم الكامل</Label>
                        <Input defaultValue="أحمد محمد الخالدي" />
                      </div>
                      <div>
                        <Label>رقم الهوية</Label>
                        <Input defaultValue="1234567890" />
                      </div>
                      <div>
                        <Label>تاريخ الميلاد</Label>
                        <Input type="date" defaultValue="1990-01-15" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      معلومات الاتصال
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input defaultValue="+966501234567" />
                    </div>
                    <div>
                      <Label>البريد الإلكتروني</Label>
                      <Input defaultValue="ahmed@company.com" />
                    </div>
                    <div>
                      <Label>العنوان</Label>
                      <Textarea defaultValue="الرياض، المملكة العربية السعودية" />
                    </div>
                    <div>
                      <Label>الحالة الاجتماعية</Label>
                      <Select defaultValue="married">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">أعزب</SelectItem>
                          <SelectItem value="married">متزوج</SelectItem>
                          <SelectItem value="divorced">مطلق</SelectItem>
                          <SelectItem value="widowed">أرمل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      جهات الاتصال الطارئة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>اسم جهة الاتصال</Label>
                      <Input defaultValue="فاطمة أحمد الخالدي" />
                    </div>
                    <div>
                      <Label>صلة القرابة</Label>
                      <Input defaultValue="الزوجة" />
                    </div>
                    <div>
                      <Label>رقم الهاتف</Label>
                      <Input defaultValue="+966507654321" />
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة جهة اتصال أخرى
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">إلغاء</Button>
                <Button>حفظ التغييرات</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الوثائق والشهادات</h2>
                <Button>
                  <Upload className="h-4 w-4 ml-2" />
                  رفع وثيقة
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      الشهادات الرسمية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">شهادة راتب - يناير 2024</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">شهادة خبرة</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        طلب شهادة جديدة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      الوثائق الشخصية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">صورة الهوية الوطنية</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">السيرة الذاتية</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        رفع وثيقة جديدة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      الوثائق المالية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">معلومات الحساب البنكي</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">إقرار ضريبي</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        تحديث البيانات المالية
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="selfservice">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">الخدمة الذاتية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <CreditCard className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">تحديث البيانات المصرفية</h3>
                        <p className="text-sm text-gray-600">تغيير رقم الحساب أو الآيبان</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      تحديث الآن
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Home className="h-8 w-8 text-green-500" />
                      <div>
                        <h3 className="font-semibold">تحديث العنوان</h3>
                        <p className="text-sm text-gray-600">تغيير عنوان السكن</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      تحديث العنوان
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Users className="h-8 w-8 text-purple-500" />
                      <div>
                        <h3 className="font-semibold">إدارة المعالين</h3>
                        <p className="text-sm text-gray-600">إضافة أو تعديل بيانات المعالين</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      إدارة المعالين
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <MessageSquare className="h-8 w-8 text-orange-500" />
                      <div>
                        <h3 className="font-semibold">تقديم شكوى</h3>
                        <p className="text-sm text-gray-600">إرسال شكوى أو اقتراح</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      تقديم شكوى
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <History className="h-8 w-8 text-red-500" />
                      <div>
                        <h3 className="font-semibold">سجل الخدمات</h3>
                        <p className="text-sm text-gray-600">مراجعة تاريخ الخدمات المستخدمة</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      عرض السجل
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <ThumbsUp className="h-8 w-8 text-indigo-500" />
                      <div>
                        <h3 className="font-semibold">تقييم الخدمات</h3>
                        <p className="text-sm text-gray-600">تقييم جودة الخدمات المقدمة</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      تقييم الخدمات
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    الدردشة مع قسم الموارد البشرية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-white border'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    المساعد الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-800">مساعد HR الذكي</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      متاح 24/7 للإجابة على استفساراتك حول نظام العمل السعودي
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">أسئلة شائعة:</h4>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <HelpCircle className="h-3 w-3 ml-2" />
                      كم عدد أيام الإجازة السنوية؟
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <HelpCircle className="h-3 w-3 ml-2" />
                      كيف أطلب شهادة راتب؟
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <HelpCircle className="h-3 w-3 ml-2" />
                      ما هي مدة الإشعار لإنهاء العمل؟
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <Button variant="outline" className="w-full">
                      <Bot className="h-4 w-4 ml-2" />
                      بدء محادثة جديدة مع AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 ml-2" />
                    تصدير
                  </Button>
                  <Button variant="outline" onClick={handlePrint}>
                    <FileText className="h-4 w-4 ml-2" />
                    طباعة
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تقرير استخدام الخدمات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>طلبات الإجازة</span>
                        <span>156</span>
                      </div>
                      <Progress value={75} />
                      <div className="flex justify-between">
                        <span>الشهادات</span>
                        <span>89</span>
                      </div>
                      <Progress value={60} />
                      <div className="flex justify-between">
                        <span>الطلبات الأخرى</span>
                        <span>45</span>
                      </div>
                      <Progress value={30} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>أوقات المعالجة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">1.5</div>
                        <p className="text-sm text-gray-600">متوسط أيام المعالجة</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">4.7</div>
                        <p className="text-sm text-gray-600">تقييم الرضا</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>الإحصائيات الشهرية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>الطلبات المقدمة</span>
                        <Badge variant="secondary">290</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>الطلبات المكتملة</span>
                        <Badge variant="secondary">267</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>الطلبات المعلقة</span>
                        <Badge variant="outline">23</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل الإنجاز</span>
                        <Badge>92%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>تقرير تفصيلي للخدمات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-2">نوع الخدمة</th>
                          <th className="text-right p-2">عدد الطلبات</th>
                          <th className="text-right p-2">معدل الموافقة</th>
                          <th className="text-right p-2">متوسط وقت المعالجة</th>
                          <th className="text-right p-2">تقييم الرضا</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeServices.map((service) => (
                          <tr key={service.id} className="border-b">
                            <td className="p-2">{service.name}</td>
                            <td className="p-2">{service.usage}</td>
                            <td className="p-2">95%</td>
                            <td className="p-2">{service.avgProcessingTime}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {service.satisfaction}
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
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إعدادات خدمات الموظفين</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الخدمات المتاحة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {employeeServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {service.icon}
                          <span>{service.name}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>سلسلة الموافقات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>طلبات الإجازة</span>
                        <span className="text-sm text-gray-600">المدير المباشر ← HR</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>الشهادات</span>
                        <span className="text-sm text-gray-600">HR مباشرة</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>السلف والمقدمات</span>
                        <span className="text-sm text-gray-600">المدير ← المالية ← HR</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      تخصيص سلسلة الموافقات
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>الأذونات والصلاحيات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>الموظفون</span>
                        <Badge variant="secondary">عرض وتعديل البيانات الشخصية</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>المدراء</span>
                        <Badge variant="secondary">موافقة على الطلبات</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>HR</span>
                        <Badge>إدارة كاملة</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      إدارة الأذونات
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الإشعارات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>إشعار عند الطلب الجديد</span>
                        <Button variant="outline" size="sm">تفعيل</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>تذكير للمراجعة</span>
                        <Button variant="outline" size="sm">تفعيل</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>إشعار اكتمال الطلب</span>
                        <Button variant="outline" size="sm">تفعيل</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Request Dialog */}
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogContent className="max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>طلب جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>نوع الطلب</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">طلب إجازة</SelectItem>
                    <SelectItem value="certificate">شهادة راتب</SelectItem>
                    <SelectItem value="experience">شهادة خبرة</SelectItem>
                    <SelectItem value="advance">سلفة أو مقدم</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>عنوان الطلب</Label>
                <Input placeholder="أدخل عنوان الطلب" />
              </div>
              <div>
                <Label>تفاصيل الطلب</Label>
                <Textarea placeholder="اشرح تفاصيل طلبك..." rows={3} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>إلغاء</Button>
                <Button onClick={() => {
                  setIsRequestDialogOpen(false);
                  toast({
                    title: "تم إرسال الطلب",
                    description: "سيتم مراجعة طلبك والرد عليك قريباً",
                  });
                }}>
                  إرسال الطلب
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
  );
}