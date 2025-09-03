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
  FileText, 
  PenTool, 
  Upload, 
  Download, 
  Eye, 
  Check, 
  X, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Settings, 
  Archive, 
  Edit, 
  Trash2, 
  Share, 
  Lock, 
  Unlock, 
  User, 
  Users, 
  Shield, 
  Zap, 
  Sparkles, 
  Activity, 
  BarChart3, 
  PieChart, 
  Calendar, 
  Building2, 
  UserCheck, 
  Network, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  Info, 
  Bell, 
  RefreshCw, 
  Database, 
  Server, 
  Mail, 
  Phone, 
  Building,
  Crown,
  Award,
  Heart,
  ThumbsUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface ESignatureSystemProps {
  onBack: () => void;
}

interface Document {
  id: string;
  title: string;
  titleEn: string;
  type: 'contract' | 'letter' | 'form' | 'certificate' | 'agreement';
  status: 'draft' | 'pending' | 'signed' | 'rejected';
  description: string;
  employeeName: string;
  employeeId: string;
  createdDate: string;
  signedDate?: string;
  signaturesRequired: number;
  signaturesCompleted: number;
  lastUpdated: string;
  referenceNumber: string;
  fileSize: string;
  urgency: 'high' | 'medium' | 'low';
}

interface Template {
  id: string;
  name: string;
  nameEn: string;
  category: 'contract' | 'letter' | 'form' | 'certificate';
  description: string;
  fields: string[];
  usageCount: number;
  lastUsed?: string;
  isActive: boolean;
}

interface SignatureMetric {
  id: string;
  metric: string;
  category: 'Performance' | 'Security' | 'Usage' | 'Compliance' | 'Efficiency';
  status: 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ESignatureSystem: React.FC<ESignatureSystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const documents: Document[] = [
    {
      id: '1',
      title: 'عقد عمل - أحمد محمد العلي',
      titleEn: 'Employment Contract - Ahmed Mohammed Ali',
      type: 'contract',
      status: 'signed',
      description: 'عقد عمل موظف جديد في قسم تقنية المعلومات',
      employeeName: 'أحمد محمد العلي',
      employeeId: 'EMP001',
      createdDate: '2024-01-15',
      signedDate: '2024-01-18',
      signaturesRequired: 3,
      signaturesCompleted: 3,
      lastUpdated: '2024-01-18 14:30',
      referenceNumber: 'DOC-2024-001',
      fileSize: '2.5 MB',
      urgency: 'medium'
    },
    {
      id: '2',
      title: 'خطاب ترقية - فاطمة أحمد السالم',
      titleEn: 'Promotion Letter - Fatima Ahmed Salem',
      type: 'letter',
      status: 'pending',
      description: 'خطاب ترقية إلى منصب مدير المالية',
      employeeName: 'فاطمة أحمد السالم',
      employeeId: 'EMP002',
      createdDate: '2024-01-20',
      signaturesRequired: 2,
      signaturesCompleted: 1,
      lastUpdated: '2024-01-20 10:15',
      referenceNumber: 'DOC-2024-002',
      fileSize: '1.8 MB',
      urgency: 'high'
    },
    {
      id: '3',
      title: 'استمارة تقييم الأداء - محمد سعد الخالد',
      titleEn: 'Performance Evaluation Form - Mohammed Saad Khalid',
      type: 'form',
      status: 'draft',
      description: 'استمارة تقييم الأداء السنوي للموظف',
      employeeName: 'محمد سعد الخالد',
      employeeId: 'EMP003',
      createdDate: '2024-01-22',
      signaturesRequired: 2,
      signaturesCompleted: 0,
      lastUpdated: '2024-01-22 08:45',
      referenceNumber: 'DOC-2024-003',
      fileSize: '1.2 MB',
      urgency: 'low'
    },
    {
      id: '4',
      title: 'شهادة خبرة - سارة عبدالله النصر',
      titleEn: 'Experience Certificate - Sara Abdullah Nasser',
      type: 'certificate',
      status: 'rejected',
      description: 'شهادة خبرة للموظفة المستقيلة',
      employeeName: 'سارة عبدالله النصر',
      employeeId: 'EMP004',
      createdDate: '2024-01-19',
      signaturesRequired: 2,
      signaturesCompleted: 1,
      lastUpdated: '2024-01-21 16:20',
      referenceNumber: 'DOC-2024-004',
      fileSize: '800 KB',
      urgency: 'medium'
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'عقد العمل الأساسي',
      nameEn: 'Basic Employment Contract',
      category: 'contract',
      description: 'قالب عقد العمل الأساسي للموظفين الجدد',
      fields: ['اسم الموظف', 'المنصب', 'الراتب الأساسي', 'تاريخ البدء'],
      usageCount: 45,
      lastUsed: '2024-01-20',
      isActive: true
    },
    {
      id: '2',
      name: 'خطاب الترقية',
      nameEn: 'Promotion Letter',
      category: 'letter',
      description: 'قالب خطاب ترقية الموظفين',
      fields: ['اسم الموظف', 'المنصب الحالي', 'المنصب الجديد', 'تاريخ الترقية'],
      usageCount: 23,
      lastUsed: '2024-01-18',
      isActive: true
    },
    {
      id: '3',
      name: 'استمارة تقييم الأداء',
      nameEn: 'Performance Evaluation Form',
      category: 'form',
      description: 'قالب تقييم الأداء السنوي للموظفين',
      fields: ['اسم الموظف', 'فترة التقييم', 'الأهداف المحققة', 'التقييم العام'],
      usageCount: 78,
      lastUsed: '2024-01-22',
      isActive: true
    },
    {
      id: '4',
      name: 'شهادة الخبرة',
      nameEn: 'Experience Certificate',
      category: 'certificate',
      description: 'قالب شهادة خبرة للموظفين المغادرين',
      fields: ['اسم الموظف', 'فترة العمل', 'المنصب', 'الإنجازات'],
      usageCount: 12,
      lastUsed: '2024-01-19',
      isActive: true
    }
  ];

  const signatureMetrics: SignatureMetric[] = [
    {
      id: '1',
      metric: 'معدل إتمام التوقيع',
      category: 'Performance',
      status: 'Excellent',
      value: 96,
      target: 95,
      trend: 'up',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      metric: 'متوسط وقت التوقيع',
      category: 'Efficiency',
      status: 'Good',
      value: 2.3,
      target: 2.0,
      trend: 'stable',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      metric: 'عدد الوثائق الموقعة',
      category: 'Usage',
      status: 'Excellent',
      value: 156,
      target: 120,
      trend: 'up',
      lastUpdated: '2024-01-15'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', signed: 45, pending: 12, rejected: 3, templates: 8 },
    { month: 'فبراير', signed: 52, pending: 15, rejected: 2, templates: 9 },
    { month: 'مارس', signed: 48, pending: 18, rejected: 4, templates: 10 },
    { month: 'أبريل', signed: 58, pending: 14, rejected: 1, templates: 11 },
    { month: 'مايو', signed: 63, pending: 20, rejected: 3, templates: 12 },
    { month: 'يونيو', signed: 59, pending: 16, rejected: 2, templates: 13 }
  ];

  const documentTypeDistribution = [
    { name: 'العقود', value: 35, color: '#3b82f6' },
    { name: 'الخطابات', value: 28, color: '#10b981' },
    { name: 'الاستمارات', value: 20, color: '#f59e0b' },
    { name: 'الشهادات', value: 12, color: '#8b5cf6' },
    { name: 'أخرى', value: 5, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalDocuments: documents.length,
    signedDocuments: documents.filter(d => d.status === 'signed').length,
    pendingDocuments: documents.filter(d => d.status === 'pending').length,
    avgSigningTime: 2.3,
    completionRate: 96,
    activeTemplates: templates.filter(t => t.isActive).length
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير التوقيع الإلكتروني كملف PDF",
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
      case 'signed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'signed': 'موقع',
      'pending': 'في الانتظار',
      'draft': 'مسودة',
      'rejected': 'مرفوض'
    };
    return statusMap[status] || status;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'contract': 'عقد',
      'letter': 'خطاب',
      'form': 'استمارة',
      'certificate': 'شهادة',
      'agreement': 'اتفاقية'
    };
    return typeMap[type] || type;
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
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
                <PenTool className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  التوقيع الإلكتروني
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة للتوقيع الإلكتروني الآمن مع أدوات إدارة الوثائق والموافقات المتقدمة والتقارير التفصيلية
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              وثيقة جديدة
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
                <p className="text-sm text-muted-foreground">إجمالي الوثائق</p>
                <p className="text-2xl font-bold text-primary">{stats.totalDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">وثائق موقعة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.signedDocuments}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">في الانتظار</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.pendingDocuments}</p>
              </div>
              <Clock className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الإتمام</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الوقت</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgSigningTime}د</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">القوالب النشطة</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeTemplates}</p>
              </div>
              <Archive className="h-8 w-8 text-green-500/60" />
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
              أداء التوقيع الإلكتروني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="signed" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="pending" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="rejected" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الوثائق
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={documentTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentTypeDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للتوقيع الإلكتروني
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
                تحسن ملحوظ في سرعة إتمام التوقيعات بنسبة 18% عن الشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه أمني</span>
              </div>
              <p className="text-sm text-orange-700">
                اكتشاف محاولة تعديل على وثيقة موقعة - تم رفضها تلقائياً
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                اقتراح إنشاء قالب جديد لخطابات النقل بناءً على التكرار
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
              النشاطات الحديثة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "تم توقيع عقد العمل",
                  employee: "أحمد محمد العلي",
                  document: "DOC-2024-001",
                  time: "منذ ساعة"
                },
                {
                  action: "رفع وثيقة جديدة للتوقيع",
                  employee: "إدارة الموارد البشرية",
                  document: "DOC-2024-005",
                  time: "منذ 3 ساعات"
                },
                {
                  action: "اعتماد خطاب الترقية",
                  employee: "فاطمة أحمد السالم",
                  document: "DOC-2024-002",
                  time: "أمس"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <PenTool className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.employee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{activity.document}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Upload className="h-5 w-5" />
                <span className="text-xs">رفع وثيقة</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <PenTool className="h-5 w-5" />
                <span className="text-xs">توقيع سريع</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="text-xs">الموافقات المعلقة</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                <Archive className="h-5 w-5" />
                <span className="text-xs">الأرشيف</span>
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
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">لوحة المعلومات</TabsTrigger>
            <TabsTrigger value="sign-documents">توقيع الوثائق</TabsTrigger>
            <TabsTrigger value="pending-approvals">الموافقات المعلقة</TabsTrigger>
            <TabsTrigger value="archive">أرشيف الوثائق</TabsTrigger>
            <TabsTrigger value="templates">القوالب</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="sign-documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    توقيع الوثائق
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 ml-2" />
                      رفع وثيقة
                    </Button>
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      إنشاء من قالب
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">اسحب وأفلت الملفات هنا</h3>
                    <p className="text-muted-foreground mb-4">أو اختر الملفات من جهازك</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 ml-2" />
                        اختيار ملف PDF
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 ml-2" />
                        اختيار ملف Word
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      الملفات المدعومة: PDF, Word, Excel (الحد الأقصى 10 MB)
                    </p>
                  </div>

                  {/* Document Processing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">الوثائق قيد المعالجة</h3>
                    <div className="grid gap-4">
                      {[
                        {
                          name: "عقد_عمل_جديد.pdf",
                          size: "2.5 MB",
                          status: "جاري المعالجة",
                          progress: 75,
                          signatures: "2/3"
                        },
                        {
                          name: "خطاب_ترقية.docx",
                          size: "1.8 MB",
                          status: "جاهز للتوقيع",
                          progress: 100,
                          signatures: "0/2"
                        }
                      ].map((doc, index) => (
                        <Card key={index} className="border border-border/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <FileText className="h-8 w-8 text-primary" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-muted-foreground">{doc.size}</p>
                                </div>
                              </div>
                              <Badge className={doc.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {doc.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span>التقدم</span>
                                <span>{doc.progress}%</span>
                              </div>
                              <Progress value={doc.progress} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">التوقيعات: {doc.signatures}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4 ml-2" />
                                  معاينة
                                </Button>
                                {doc.progress === 100 && (
                                  <Button size="sm">
                                    <PenTool className="h-4 w-4 ml-2" />
                                    توقيع
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Signature Tools */}
                  <Card className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PenTool className="h-5 w-5" />
                        أدوات التوقيع
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border border-border/50 p-4 text-center">
                          <PenTool className="h-8 w-8 text-primary mx-auto mb-3" />
                          <h4 className="font-medium mb-2">التوقيع اليدوي</h4>
                          <p className="text-sm text-muted-foreground mb-3">ارسم توقيعك باستخدام الفأرة أو اللمس</p>
                          <Button variant="outline" size="sm" className="w-full">
                            بدء التوقيع
                          </Button>
                        </Card>
                        
                        <Card className="border border-border/50 p-4 text-center">
                          <Upload className="h-8 w-8 text-primary mx-auto mb-3" />
                          <h4 className="font-medium mb-2">رفع التوقيع</h4>
                          <p className="text-sm text-muted-foreground mb-3">ارفع صورة توقيعك المحفوظة</p>
                          <Button variant="outline" size="sm" className="w-full">
                            رفع صورة
                          </Button>
                        </Card>
                        
                        <Card className="border border-border/50 p-4 text-center">
                          <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                          <h4 className="font-medium mb-2">التوقيع الرقمي</h4>
                          <p className="text-sm text-muted-foreground mb-3">استخدم الشهادة الرقمية المعتمدة</p>
                          <Button variant="outline" size="sm" className="w-full">
                            توقيع رقمي
                          </Button>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending-approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    الموافقات المعلقة
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="البحث في الموافقات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline">
                      <Filter className="h-4 w-4 ml-2" />
                      فلتر
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Approval Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="border border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-yellow-800">8</p>
                        <p className="text-sm text-yellow-700">في الانتظار</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-blue-800">5</p>
                        <p className="text-sm text-blue-700">قيد المراجعة</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-red-200 bg-red-50">
                      <CardContent className="p-4 text-center">
                        <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-red-800">3</p>
                        <p className="text-sm text-red-700">متأخرة</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="font-bold text-lg text-green-800">45</p>
                        <p className="text-sm text-green-700">مكتملة اليوم</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Pending Documents */}
                  {documents.filter(doc => doc.status === 'pending').map((document) => (
                    <Card key={document.id} className="border border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{document.title}</h3>
                              <p className="text-muted-foreground mb-2">{document.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>الموظف: {document.employeeName}</span>
                                <span>الرقم المرجعي: {document.referenceNumber}</span>
                                <span>تاريخ الإنشاء: {document.createdDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(document.status)}>
                              {getStatusText(document.status)}
                            </Badge>
                            <p className={`text-sm mt-1 ${getUrgencyColor(document.urgency)}`}>
                              الأولوية: {document.urgency === 'high' ? 'عالية' : document.urgency === 'medium' ? 'متوسطة' : 'منخفضة'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">النوع</p>
                            <p className="font-medium">{getTypeText(document.type)}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">التوقيعات</p>
                            <p className="font-medium">{document.signaturesCompleted}/{document.signaturesRequired}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">حجم الملف</p>
                            <p className="font-medium">{document.fileSize}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">آخر تحديث</p>
                            <p className="font-medium">{document.lastUpdated}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 ml-2" />
                            اعتماد
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <X className="h-4 w-4 ml-2" />
                            رفض
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-2" />
                            معاينة
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 ml-2" />
                            تحميل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Archive className="h-5 w-5" />
                    أرشيف الوثائق الموقعة
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="البحث في الأرشيف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="فلتر حسب النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="contract">العقود</SelectItem>
                        <SelectItem value="letter">الخطابات</SelectItem>
                        <SelectItem value="form">الاستمارات</SelectItem>
                        <SelectItem value="certificate">الشهادات</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير جماعي
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((document) => (
                    <Card key={document.id} className="border border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{document.title}</h3>
                              <p className="text-muted-foreground mb-2">{document.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>الموظف: {document.employeeName}</span>
                                <span>الرقم المرجعي: {document.referenceNumber}</span>
                                <span>تاريخ التوقيع: {document.signedDate || 'غير موقع'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex flex-col gap-2">
                            <Badge className={getStatusColor(document.status)}>
                              {getStatusText(document.status)}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Shield className="h-4 w-4 text-green-600" />
                              <span className="text-green-600">محمي</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">النوع</p>
                            <p className="font-medium">{getTypeText(document.type)}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">التوقيعات</p>
                            <p className="font-medium text-green-600">{document.signaturesCompleted}/{document.signaturesRequired}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">حجم الملف</p>
                            <p className="font-medium">{document.fileSize}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">تاريخ الإنشاء</p>
                            <p className="font-medium">{document.createdDate}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">الحالة</p>
                            <p className="font-medium">{getStatusText(document.status)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 ml-2" />
                            تحميل
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="h-4 w-4 ml-2" />
                            مشاركة
                          </Button>
                          {document.status === 'signed' && (
                            <Button size="sm" variant="outline" className="text-green-600">
                              <Shield className="h-4 w-4 ml-2" />
                              التحقق من الصحة
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Archive className="h-5 w-5" />
                    قوالب الوثائق
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="البحث في القوالب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      قالب جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="border border-border/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <p className="text-sm text-muted-foreground capitalize">{template.category}</p>
                            </div>
                          </div>
                          <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {template.isActive ? 'نشط' : 'معطل'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">الحقول المطلوبة:</p>
                          <div className="flex flex-wrap gap-2">
                            {template.fields.map((field, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <p className="text-xs text-muted-foreground">مرات الاستخدام</p>
                            <p className="font-bold text-primary">{template.usageCount}</p>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <p className="text-xs text-muted-foreground">آخر استخدام</p>
                            <p className="font-bold text-xs">{template.lastUsed || 'لم يستخدم'}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <FileText className="h-4 w-4 ml-2" />
                            استخدام
                          </Button>
                          <Button size="sm" variant="outline">
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
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  التقارير والتحليلات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "تقرير حالة التوقيعات",
                      description: "تحليل شامل لحالة الوثائق (موقعة، معلقة، مرفوضة)",
                      icon: PieChart,
                      color: "text-blue-600",
                      bgColor: "bg-blue-50",
                      borderColor: "border-blue-200"
                    },
                    {
                      title: "مراقبة اتفاقية مستوى الخدمة",
                      description: "متوسط أوقات التوقيع ومؤشرات الأداء",
                      icon: Clock,
                      color: "text-green-600",
                      bgColor: "bg-green-50",
                      borderColor: "border-green-200"
                    },
                    {
                      title: "تقرير الامتثال والأمان",
                      description: "تحليل الامتثال للوائح والمعايير الأمنية",
                      icon: Shield,
                      color: "text-purple-600",
                      bgColor: "bg-purple-50",
                      borderColor: "border-purple-200"
                    },
                    {
                      title: "إحصائيات الاستخدام",
                      description: "تحليل استخدام النظام والقوالب الأكثر استخداماً",
                      icon: TrendingUp,
                      color: "text-orange-600",
                      bgColor: "bg-orange-50",
                      borderColor: "border-orange-200"
                    },
                    {
                      title: "تقرير الموظفين",
                      description: "تحليل أداء الموظفين في عملية التوقيع",
                      icon: Users,
                      color: "text-indigo-600",
                      bgColor: "bg-indigo-50",
                      borderColor: "border-indigo-200"
                    },
                    {
                      title: "تقرير سير العمل",
                      description: "تحليل كفاءة سير عمل الموافقات والتوقيعات",
                      icon: Network,
                      color: "text-pink-600",
                      bgColor: "bg-pink-50",
                      borderColor: "border-pink-200"
                    }
                  ].map((report, index) => (
                    <Card key={index} className={`${report.borderColor} ${report.bgColor} hover:shadow-md transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${report.bgColor} border ${report.borderColor}`}>
                            <report.icon className={`h-6 w-6 ${report.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{report.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 ml-2" />
                                عرض
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 ml-2" />
                                تحميل PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    إعدادات عامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signature-validity">مدة صلاحية التوقيع (أيام)</Label>
                    <Input id="signature-validity" placeholder="365" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">الحد الأقصى لحجم الملف (MB)</Label>
                    <Input id="max-file-size" placeholder="10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="auto-archive">أرشفة تلقائية بعد (أيام)</Label>
                    <Input id="auto-archive" placeholder="30" />
                  </div>

                  <Button className="w-full">
                    حفظ الإعدادات العامة
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    سير الموافقات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { level: "المستوى الأول", type: "العقود الأساسية", approver: "المدير المباشر" },
                      { level: "المستوى الثاني", type: "الترقيات والنقل", approver: "مدير الموارد البشرية" },
                      { level: "المستوى الثالث", type: "العقود التنفيذية", approver: "المدير العام" }
                    ].map((level, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{level.level}</span>
                          <Badge variant="outline">{level.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">المعتمد: {level.approver}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    تعديل سير الموافقات
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    إعدادات الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "المصادقة الثنائية للتوقيع", description: "إجباري للعقود التنفيذية" },
                    { title: "التحقق من الهوية", description: "قبل كل عملية توقيع" },
                    { title: "تسجيل جميع العمليات", description: "لأغراض التدقيق والمراجعة" },
                    { title: "التوقيع الرقمي المعتمد", description: "استخدام الشهادات الرقمية" }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{setting.title}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        تفعيل
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    إدارة البيانات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير جميع الوثائق الموقعة
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Archive className="h-4 w-4 ml-2" />
                      أرشفة الوثائق المنتهية الصلاحية
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <RefreshCw className="h-4 w-4 ml-2" />
                      تحديث القوالب تلقائياً
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 ml-2" />
                      فحص صحة التوقيعات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};