import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MessageSquare, Mail, Send, FileText, Archive, BarChart3, Settings, Download, Plus, Search, Filter, Calendar, Building, Eye, Edit, Trash2, Save, Upload, Printer, Bell, Clock, AlertTriangle, CheckCircle2, User, Users, Paperclip, Signature, Target, TrendingUp, Activity, Zap, Globe, Sparkles, Crown, Tag, FileCheck, MailOpen, Network, Building2, Award, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
interface AdministrativeCommunicationsProps {
  onBack: () => void;
}
interface Correspondence {
  id: string;
  transactionNumber: string;
  date: string;
  sender?: string;
  recipient?: string;
  subject: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  status: string;
  assignedTo?: string;
  department: string;
  attachments: number;
  dueDate?: string;
  approvedBy?: string;
  sentDate?: string;
  content?: string;
  aiSummary?: string;
  category?: 'Legal' | 'HR' | 'Finance' | 'General';
  responseTime?: number;
}
interface InternalMemo {
  id: string;
  transactionNumber: string;
  date: string;
  title: string;
  department: string;
  status: string;
  readBy: number;
  totalEmployees: number;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  author: string;
  content?: string;
  aiSummary?: string;
}
interface CommunicationMetric {
  id: string;
  metric: string;
  category: 'Incoming' | 'Outgoing' | 'Internal' | 'Response' | 'Archive';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}
export const AdministrativeCommunications: React.FC<AdministrativeCommunicationsProps> = ({
  onBack
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'incoming' | 'outgoing' | 'memo'>('incoming');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate unique transaction numbers
  const generateTransactionNumber = (type: 'IN' | 'OUT' | 'MEMO'): string => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    return `${type}-${year}-${String(randomNum).padStart(4, '0')}`;
  };

  // Mock data for demonstration
  const incomingCorrespondence: Correspondence[] = [{
    id: '1',
    transactionNumber: 'IN-2024-0001',
    date: '2024-01-15',
    sender: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    subject: 'تحديث اللوائح التنظيمية للعمل وفقاً للتعديلات الجديدة',
    priority: 'عالية',
    status: 'جديد',
    assignedTo: 'أحمد محمد الخالدي',
    department: 'الموارد البشرية',
    attachments: 2,
    dueDate: '2024-01-25',
    content: 'يسرنا إعلامكم بالتحديثات الجديدة على اللوائح التنظيمية...',
    aiSummary: 'تحديث اللوائح - مطلوب تطبيق التعديلات خلال 10 أيام',
    category: 'HR',
    responseTime: 3.2
  }, {
    id: '2',
    transactionNumber: 'IN-2024-0002',
    date: '2024-01-18',
    sender: 'الهيئة العامة للتأمينات الاجتماعية',
    subject: 'طلب تحديث بيانات الموظفين المؤمن عليهم',
    priority: 'متوسطة',
    status: 'قيد المراجعة',
    assignedTo: 'سارة أحمد المطيري',
    department: 'المالية',
    attachments: 1,
    dueDate: '2024-02-01',
    category: 'Finance',
    responseTime: 2.1
  }, {
    id: '3',
    transactionNumber: 'IN-2024-0003',
    date: '2024-01-20',
    sender: 'المحكمة العمالية',
    subject: 'استدعاء قضية عمالية رقم 2024/45',
    priority: 'عالية',
    status: 'معلق',
    assignedTo: 'محمد سعد القحطاني',
    department: 'الشئون القانونية',
    attachments: 3,
    dueDate: '2024-01-28',
    category: 'Legal',
    responseTime: 1.5
  }];
  const outgoingCorrespondence: Correspondence[] = [{
    id: '1',
    transactionNumber: 'OUT-2024-0001',
    date: '2024-01-16',
    recipient: 'غرفة التجارة والصناعة بالرياض',
    subject: 'طلب شهادة عضوية مؤسسة تجارية',
    priority: 'متوسطة',
    status: 'معتمد',
    department: 'الإدارة العامة',
    attachments: 3,
    approvedBy: 'المدير العام',
    sentDate: '2024-01-16',
    category: 'General',
    responseTime: 1.2
  }, {
    id: '2',
    transactionNumber: 'OUT-2024-0002',
    date: '2024-01-19',
    recipient: 'وزارة التجارة والاستثمار',
    subject: 'إشعار تغيير عنوان المؤسسة الرئيسي',
    priority: 'عالية',
    status: 'مرسل',
    department: 'الشئون القانونية',
    attachments: 2,
    approvedBy: 'المدير التنفيذي',
    sentDate: '2024-01-19',
    category: 'Legal',
    responseTime: 0.8
  }];
  const internalMemos: InternalMemo[] = [{
    id: '1',
    transactionNumber: 'MEMO-2024-0001',
    date: '2024-01-17',
    title: 'تحديث سياسة الإجازات للعام 2024',
    department: 'جميع الأقسام',
    status: 'نشط',
    readBy: 45,
    totalEmployees: 60,
    priority: 'عالية',
    author: 'إدارة الموارد البشرية',
    content: 'نود إعلامكم بالتحديثات الجديدة على سياسة الإجازات...',
    aiSummary: 'تحديث سياسة الإجازات - تطبيق فوري - معدل قراءة 75%'
  }, {
    id: '2',
    transactionNumber: 'MEMO-2024-0002',
    date: '2024-01-20',
    title: 'إجراءات السلامة المهنية الجديدة',
    department: 'الإنتاج والعمليات',
    status: 'مراجعة',
    readBy: 28,
    totalEmployees: 35,
    priority: 'عالية',
    author: 'قسم السلامة المهنية',
    aiSummary: 'إجراءات السلامة الجديدة - تدريب مطلوب - معدل قراءة 80%'
  }];
  const communicationMetrics: CommunicationMetric[] = [{
    id: '1',
    metric: 'معدل الاستجابة في الوقت',
    category: 'Response',
    status: 'Excellent',
    value: 96,
    target: 95,
    trend: 'up',
    lastUpdated: '2024-01-15'
  }, {
    id: '2',
    metric: 'متوسط وقت الاستجابة',
    category: 'Response',
    status: 'Good',
    value: 2.3,
    target: 2.0,
    trend: 'stable',
    lastUpdated: '2024-01-15'
  }, {
    id: '3',
    metric: 'معدل معالجة المراسلات',
    category: 'Incoming',
    status: 'Excellent',
    value: 94,
    target: 90,
    trend: 'up',
    lastUpdated: '2024-01-15'
  }];

  // Analytics data
  const correspondenceData = [{
    month: 'يناير',
    incoming: 45,
    outgoing: 32,
    memos: 18,
    response: 2.1
  }, {
    month: 'فبراير',
    incoming: 52,
    outgoing: 38,
    memos: 22,
    response: 1.9
  }, {
    month: 'مارس',
    incoming: 48,
    outgoing: 41,
    memos: 25,
    response: 2.3
  }, {
    month: 'أبريل',
    incoming: 56,
    outgoing: 35,
    memos: 20,
    response: 2.0
  }, {
    month: 'مايو',
    incoming: 61,
    outgoing: 45,
    memos: 28,
    response: 1.8
  }, {
    month: 'يونيو',
    incoming: 58,
    outgoing: 42,
    memos: 31,
    response: 2.1
  }];
  const categoryDistribution = [{
    name: 'قانونية',
    value: 35,
    color: '#3b82f6'
  }, {
    name: 'مالية',
    value: 25,
    color: '#10b981'
  }, {
    name: 'موارد بشرية',
    value: 30,
    color: '#f59e0b'
  }, {
    name: 'عامة',
    value: 10,
    color: '#8b5cf6'
  }];

  // Calculate statistics
  const stats = {
    totalIncoming: incomingCorrespondence.length,
    totalOutgoing: outgoingCorrespondence.length,
    totalMemos: internalMemos.length,
    pendingApproval: 6,
    avgResponseTime: 2.3,
    satisfactionRate: 94
  };
  const handleSave = (type: string) => {
    toast({
      title: "تم الحفظ بنجاح",
      description: `تم حفظ ${type} بنجاح مع رقم المعاملة الجديد`
    });
  };
  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير تقرير الاتصالات الإدارية بصيغة ${format.toUpperCase()}`
    });
  };
  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة"
    });
  };
  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم رفع ${file.name} بنجاح`
      });
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'جديد':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'قيد المراجعة':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'معتمد':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'مرسل':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'معلق':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'نشط':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'مراجعة':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'متوسطة':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'منخفضة':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const renderHeader = () => <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">قسم الاتصالات الإدراية</h1>
        <p className="text-muted-foreground">منظومة شاملة لإدارة المراسلات والمذكرات مع أدوات الذكاء الاصطناعي</p>
      </div>
    </div>;
  const renderAnalyticsDashboard = () => <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المراسلات الواردة</p>
                <p className="text-2xl font-bold text-primary">{stats.totalIncoming}</p>
              </div>
              <Mail className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المراسلات الصادرة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalOutgoing}</p>
              </div>
              <Send className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المذكرات الداخلية</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.totalMemos}</p>
              </div>
              <FileText className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معلقة الموافقة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pendingApproval}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الاستجابة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgResponseTime} أيام</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الرضا</p>
                <p className="text-2xl font-bold text-green-600">{stats.satisfactionRate}%</p>
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
              إحصائيات المراسلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={correspondenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="incoming" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="outgoing" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="memos" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المراسلات حسب النوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                  {categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
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
            رؤى الذكاء الاصطناعي للاتصالات الإدارية
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
                تحسن ملحوظ في أوقات الاستجابة للمراسلات بنسبة 23%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحديث مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                هناك 3 مراسلات قانونية تتطلب متابعة عاجلة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                يُنصح بتحديث قوالب المراسلات لتحسين الكفاءة
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">البحث الذكي</h4>
            <div className="flex gap-2">
              <Input placeholder="مثال: أظهر جميع المراسلات من وزارة العمل في 2024 مرتبة حسب رقم المعاملة" className="flex-1" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Button>
                <Search className="w-4 h-4 mr-2" />
                بحث ذكي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            مؤشرات الأداء الرئيسية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">96%</div>
              <p className="text-sm text-muted-foreground">معدل الاستجابة في الوقت</p>
              <Progress value={96} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3 أيام</div>
              <p className="text-sm text-muted-foreground">متوسط وقت الاستجابة</p>
              <Progress value={77} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <p className="text-sm text-muted-foreground">معدل رضا المراسلين</p>
              <Progress value={94} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            التنبيهات والتذكيرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">مراسلة متأخرة</p>
                  <p className="text-sm text-muted-foreground">رد على وزارة الموارد البشرية مستحق منذ 2 أيام - رقم المعاملة: IN-2024-0001</p>
                </div>
              </div>
              <Button size="sm" variant="outline">عرض</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">موافقة مطلوبة</p>
                  <p className="text-sm text-muted-foreground">3 مراسلات صادرة تحتاج موافقة المدير العام</p>
                </div>
              </div>
              <Button size="sm" variant="outline">مراجعة</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderIncomingCorrespondence = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              المراسلات الواردة
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <Input placeholder="البحث في المراسلات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-64" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المراسلات</SelectItem>
                    <SelectItem value="جديد">جديد</SelectItem>
                    <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                    <SelectItem value="معلق">معلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleExport('excel')} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المعاملة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المرسل</TableHead>
                  <TableHead>الموضوع</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>المخصص إلى</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>المرفقات</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomingCorrespondence.map(item => <TableRow key={item.id}>
                    <TableCell>
                      <span className="font-mono text-sm font-semibold text-primary">
                        {item.transactionNumber}
                      </span>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-48">
                      <div className="truncate" title={item.sender}>
                        {item.sender}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-64">
                      <div className="truncate" title={item.subject}>
                        {item.subject}
                      </div>
                      {item.aiSummary && <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {item.aiSummary}
                        </div>}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-4 w-4" />
                        {item.attachments}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderOutgoingCorrespondence = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              المراسلات الصادرة
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <Input placeholder="البحث في المراسلات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-64" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المراسلات</SelectItem>
                    <SelectItem value="معتمد">معتمد</SelectItem>
                    <SelectItem value="مرسل">مرسل</SelectItem>
                    <SelectItem value="مسودة">مسودة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleExport('excel')} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم المعاملة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المستقبل</TableHead>
                  <TableHead>الموضوع</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>معتمد من</TableHead>
                  <TableHead>تاريخ الإرسال</TableHead>
                  <TableHead>المرفقات</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outgoingCorrespondence.map(item => <TableRow key={item.id}>
                    <TableCell>
                      <span className="font-mono text-sm font-semibold text-primary">
                        {item.transactionNumber}
                      </span>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-48">
                      <div className="truncate" title={item.recipient}>
                        {item.recipient}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-64">
                      <div className="truncate" title={item.subject}>
                        {item.subject}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.approvedBy}</TableCell>
                    <TableCell>{item.sentDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-4 w-4" />
                        {item.attachments}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderInternalMemos = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              المذكرات الداخلية
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <Input placeholder="البحث في المذكرات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-64" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المذكرات</SelectItem>
                    <SelectItem value="نشط">نشطة</SelectItem>
                    <SelectItem value="مراجعة">قيد المراجعة</SelectItem>
                    <SelectItem value="مؤرشف">مؤرشفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleExport('excel')} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {internalMemos.map(memo => <Card key={memo.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{memo.title}</h3>
                        <Badge className={getPriorityColor(memo.priority)}>
                          {memo.priority}
                        </Badge>
                        <Badge className={getStatusColor(memo.status)} variant="outline">
                          {memo.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>رقم المعاملة: <span className="font-mono font-semibold text-primary">{memo.transactionNumber}</span></p>
                        <p>التاريخ: {memo.date} | القسم: {memo.department} | الكاتب: {memo.author}</p>
                        {memo.aiSummary && <div className="flex items-center gap-1 text-blue-600">
                            <Sparkles className="h-3 w-3" />
                            <span>{memo.aiSummary}</span>
                          </div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">معدل القراءة: </span>
                        <span className="font-semibold">{memo.readBy}/{memo.totalEmployees}</span>
                      </div>
                      <Progress value={memo.readBy / memo.totalEmployees * 100} className="w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {Math.round(memo.readBy / memo.totalEmployees * 100)}% مقروءة
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderArchiving = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            الأرشيف الرقمي
          </CardTitle>
          <CardDescription>
            نظام أرشفة آمن وذكي للمراسلات والمذكرات مع إمكانيات البحث المتقدمة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Search Interface */}
            <div className="flex gap-4">
              <Input placeholder="البحث بالكلمات المفتاحية، المرسل، الموضوع، رقم المعاملة، أو التاريخ..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="flex-1" />
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="نوع المراسلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="incoming">واردة</SelectItem>
                  <SelectItem value="outgoing">صادرة</SelectItem>
                  <SelectItem value="memo">مذكرات داخلية</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="فترة زمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="quarter">هذا الربع</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                بحث
              </Button>
            </div>

            {/* Archive Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Archive className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                  <p className="text-sm text-muted-foreground">إجمالي المراسلات المؤرشفة</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">98.5%</p>
                  <p className="text-sm text-muted-foreground">معدل الفهرسة التلقائية</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">0.3 ثانية</p>
                  <p className="text-sm text-muted-foreground">متوسط وقت البحث</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">5 مستويات</p>
                  <p className="text-sm text-muted-foreground">صلاحيات الوصول</p>
                </CardContent>
              </Card>
            </div>

            {/* Archived Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">المراسلات المؤرشفة مؤخراً</h3>
              {[...incomingCorrespondence, ...outgoingCorrespondence].map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm font-semibold text-primary">
                            {item.transactionNumber}
                          </span>
                          <Badge variant="outline">
                            {item.sender ? 'واردة' : 'صادرة'}
                          </Badge>
                          {item.category && <Badge variant="secondary">
                              {item.category === 'Legal' ? 'قانونية' : item.category === 'HR' ? 'موارد بشرية' : item.category === 'Finance' ? 'مالية' : 'عامة'}
                            </Badge>}
                        </div>
                        <h4 className="font-medium mb-1">{item.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.sender || item.recipient} • {item.date} • {item.department}
                        </p>
                        {item.aiSummary && <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {item.aiSummary}
                          </div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderReports = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            التقارير والإحصائيات
          </CardTitle>
          <CardDescription>
            تقارير شاملة وإحصائيات مفصلة حول الاتصالات الإدارية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Report Cards */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير المراسلات الشهري</h3>
                    <p className="text-sm text-muted-foreground">إحصائيات شاملة للمراسلات</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المراسلات الواردة</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>المراسلات الصادرة</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>المذكرات الداخلية</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير أوقات الاستجابة</h3>
                    <p className="text-sm text-muted-foreground">تحليل مفصل لأداء الاستجابة</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>متوسط الاستجابة</span>
                    <span className="font-semibold">2.3 أيام</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الأسرع</span>
                    <span className="font-semibold">0.8 يوم</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>معدل الالتزام</span>
                    <span className="font-semibold">96%</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">تقرير الأقسام والموظفين</h3>
                    <p className="text-sm text-muted-foreground">أداء الأقسام وحمل العمل</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>الأقسام النشطة</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الموظفين المشاركين</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>متوسط حمل العمل</span>
                    <span className="font-semibold">12 مراسلة</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>أداء الاستجابة الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={correspondenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="response" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المذكرات الداخلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {internalMemos.map(memo => <div key={memo.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{memo.title}</p>
                        <p className="text-sm text-muted-foreground">{memo.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {Math.round(memo.readBy / memo.totalEmployees * 100)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {memo.readBy}/{memo.totalEmployees}
                        </p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>;
  const renderSettings = () => <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات النظام
          </CardTitle>
          <CardDescription>
            إدارة صلاحيات المستخدمين، قوالب المراسلات، ومسارات الموافقة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="permissions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
              <TabsTrigger value="templates">القوالب</TabsTrigger>
              <TabsTrigger value="workflows">مسارات الموافقة</TabsTrigger>
              <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إدارة الصلاحيات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">صلاحيات المراسلات الواردة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">استقبال المراسلات</span>
                          <Badge className="bg-green-100 text-green-800">مدير النظام</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">توزيع المراسلات</span>
                          <Badge className="bg-blue-100 text-blue-800">مدير الإدارة</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">معالجة المراسلات</span>
                          <Badge className="bg-orange-100 text-orange-800">الموظف المختص</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">صلاحيات المراسلات الصادرة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">إنشاء المراسلات</span>
                          <Badge className="bg-blue-100 text-blue-800">جميع الموظفين</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">اعتماد الإرسال</span>
                          <Badge className="bg-red-100 text-red-800">المدير العام</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">الإرسال الفعلي</span>
                          <Badge className="bg-green-100 text-green-800">مدير النظام</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('إعدادات الصلاحيات')}>
                    <Save className="h-4 w-4 mr-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">قوالب المراسلات</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة قالب جديد
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[{
                  name: 'خطاب رسمي عام',
                  category: 'عام',
                  usage: 45
                }, {
                  name: 'طلب معلومات',
                  category: 'استعلامات',
                  usage: 32
                }, {
                  name: 'إشعار قانوني',
                  category: 'قانوني',
                  usage: 28
                }, {
                  name: 'تقرير دوري',
                  category: 'تقارير',
                  usage: 19
                }, {
                  name: 'مذكرة داخلية',
                  category: 'داخلي',
                  usage: 67
                }, {
                  name: 'شكوى رسمية',
                  category: 'شكاوى',
                  usage: 15
                }].map((template, index) => <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                          <Badge variant="secondary">{template.usage} مرة</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            تعديل
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            معاينة
                          </Button>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">مسارات الموافقة</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة مسار جديد
                  </Button>
                </div>

                <div className="space-y-4">
                  {[{
                  name: 'موافقة المراسلات الصادرة العادية',
                  steps: ['الموظف المختص', 'مدير القسم', 'الإرسال'],
                  duration: '2-3 أيام'
                }, {
                  name: 'موافقة المراسلات الصادرة الهامة',
                  steps: ['الموظف المختص', 'مدير القسم', 'المدير العام', 'الإرسال'],
                  duration: '3-5 أيام'
                }, {
                  name: 'موافقة المذكرات الداخلية',
                  steps: ['كاتب المذكرة', 'مدير القسم', 'النشر'],
                  duration: '1-2 أيام'
                }].map((workflow, index) => <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{workflow.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              المدة المتوقعة: {workflow.duration}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              تعديل
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              عرض
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto">
                          {workflow.steps.map((step, stepIndex) => <React.Fragment key={stepIndex}>
                              <Badge variant="outline" className="whitespace-nowrap">
                                {step}
                              </Badge>
                              {stepIndex < workflow.steps.length - 1 && <ArrowLeft className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                            </React.Fragment>)}
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إعدادات التنبيهات</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">تنبيهات المراسلات الواردة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">مراسلة جديدة</span>
                          <Badge className="bg-green-100 text-green-800">فعال</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">اقتراب موعد الرد</span>
                          <Badge className="bg-yellow-100 text-yellow-800">فعال</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">تأخير في الرد</span>
                          <Badge className="bg-red-100 text-red-800">فعال</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">تنبيهات المراسلات الصادرة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">طلب موافقة</span>
                          <Badge className="bg-blue-100 text-blue-800">فعال</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">تمت الموافقة</span>
                          <Badge className="bg-green-100 text-green-800">فعال</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">تم الإرسال</span>
                          <Badge className="bg-green-100 text-green-800">فعال</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave('إعدادات التنبيهات')}>
                    <Save className="h-4 w-4 mr-2" />
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
  return <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="incoming">الوارد</TabsTrigger>
            <TabsTrigger value="outgoing">الصادر</TabsTrigger>
            <TabsTrigger value="memos">المذكرات الداخلية</TabsTrigger>
            <TabsTrigger value="archive">الأرشيف</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="incoming">
            {renderIncomingCorrespondence()}
          </TabsContent>

          <TabsContent value="outgoing">
            {renderOutgoingCorrespondence()}
          </TabsContent>

          <TabsContent value="memos">
            {renderInternalMemos()}
          </TabsContent>

          <TabsContent value="archive">
            {renderArchiving()}
          </TabsContent>

          <TabsContent value="reports">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
    </div>;
};