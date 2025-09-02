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
  Shield, 
  Scale, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  BookOpen,
  Gavel,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Eye,
  Settings,
  Bell,
  CreditCard,
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
  Users,
  Upload,
  Printer,
  FileDown,
  CheckCircle,
  XCircle,
  AlertOctagon,
  Clipboard,
  FileCheck,
  ShieldCheck,
  UserX,
  Timer,
  Hash
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface GovernanceComplianceProps {
  onBack: () => void;
}

interface Policy {
  id: string;
  title: string;
  category: 'governance' | 'compliance' | 'risk' | 'audit';
  status: 'active' | 'draft' | 'review' | 'archived';
  department: string;
  lastUpdated: string;
  acknowledged: number;
  total: number;
  priority: 'high' | 'medium' | 'low';
}

interface Audit {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'regulatory';
  status: 'planned' | 'ongoing' | 'completed' | 'overdue';
  auditor: string;
  department: string;
  findings: number;
  startDate: string;
  endDate: string;
  progress: number;
}

interface Risk {
  id: string;
  title: string;
  category: 'operational' | 'financial' | 'strategic' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: number;
  owner: string;
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored';
  dueDate: string;
}

interface Approval {
  id: string;
  title: string;
  type: 'policy' | 'risk' | 'compliance' | 'audit';
  requester: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submitDate: string;
  priority: 'high' | 'medium' | 'low';
  department: string;
}

export const GovernanceCompliance: React.FC<GovernanceComplianceProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const policies: Policy[] = [
    {
      id: '1',
      title: 'سياسة الحوكمة المؤسسية',
      category: 'governance',
      status: 'active',
      department: 'الإدارة العامة',
      lastUpdated: '2024-01-15',
      acknowledged: 285,
      total: 320,
      priority: 'high'
    },
    {
      id: '2',
      title: 'لائحة الامتثال التنظيمي',
      category: 'compliance',
      status: 'review',
      department: 'الامتثال',
      lastUpdated: '2024-01-12',
      acknowledged: 150,
      total: 180,
      priority: 'medium'
    }
  ];

  const audits: Audit[] = [
    {
      id: '1',
      title: 'تدقيق الامتثال السنوي',
      type: 'internal',
      status: 'ongoing',
      auditor: 'أحمد محمد السالم',
      department: 'جميع الأقسام',
      findings: 3,
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      progress: 65
    },
    {
      id: '2',
      title: 'مراجعة المخاطر التشغيلية',
      type: 'external',
      status: 'planned',
      auditor: 'شركة التدقيق المهني',
      department: 'العمليات',
      findings: 0,
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      progress: 0
    }
  ];

  const risks: Risk[] = [
    {
      id: '1',
      title: 'مخاطر عدم الامتثال للوائح الجديدة',
      category: 'compliance',
      severity: 'high',
      probability: 70,
      impact: 85,
      owner: 'فاطمة أحمد الخالدي',
      status: 'assessed',
      dueDate: '2024-03-01'
    },
    {
      id: '2',
      title: 'مخاطر أمان البيانات',
      category: 'operational',
      severity: 'medium',
      probability: 45,
      impact: 75,
      owner: 'محمد علي السعيد',
      status: 'mitigated',
      dueDate: '2024-02-20'
    }
  ];

  const approvals: Approval[] = [
    {
      id: '1',
      title: 'الموافقة على سياسة الخصوصية المحدثة',
      type: 'policy',
      requester: 'نورا سالم المطيري',
      approver: 'د. أحمد الخالدي',
      status: 'pending',
      submitDate: '2024-01-18',
      priority: 'high',
      department: 'الشؤون القانونية'
    },
    {
      id: '2',
      title: 'اعتماد خطة إدارة المخاطر',
      type: 'risk',
      requester: 'سارة محمد العتيبي',
      approver: 'م. فهد الأحمد',
      status: 'approved',
      submitDate: '2024-01-15',
      priority: 'medium',
      department: 'إدارة المخاطر'
    }
  ];

  // Analytics data
  const complianceData = [
    { month: 'يناير', compliance: 95, violations: 5, policies: 28 },
    { month: 'فبراير', compliance: 97, violations: 3, policies: 30 },
    { month: 'مارس', compliance: 94, violations: 6, policies: 32 },
    { month: 'أبريل', compliance: 98, violations: 2, policies: 35 },
    { month: 'مايو', compliance: 96, violations: 4, policies: 38 },
    { month: 'يونيو', compliance: 99, violations: 1, policies: 40 }
  ];

  const riskDistribution = [
    { name: 'مخاطر منخفضة', value: 45, color: '#10b981' },
    { name: 'مخاطر متوسطة', value: 35, color: '#f59e0b' },
    { name: 'مخاطر عالية', value: 15, color: '#ef4444' },
    { name: 'مخاطر حرجة', value: 5, color: '#dc2626' }
  ];

  // Calculate statistics
  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    ongoingAudits: audits.filter(a => a.status === 'ongoing').length,
    complianceRate: 97,
    pendingApprovals: approvals.filter(a => a.status === 'pending').length,
    highRisks: risks.filter(r => r.severity === 'high' || r.severity === 'critical').length
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير تقرير الحوكمة والامتثال كملف ${format === 'pdf' ? 'PDF' : 'Excel'}`,
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
      case 'active':
      case 'completed':
      case 'approved':
      case 'mitigated': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
      case 'pending':
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
      case 'planned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
      case 'rejected':
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  الحوكمة والامتثال
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  نظام شامل لإدارة الحوكمة المؤسسية وضمان الامتثال للقوانين واللوائح مع أدوات التحليل المتقدمة
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <FileText className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              إضافة جديد
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
                <p className="text-sm text-muted-foreground">إجمالي السياسات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPolicies}</p>
              </div>
              <FileText className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الامتثال</p>
                <p className="text-2xl font-bold text-green-600">{stats.complianceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تدقيقات جارية</p>
                <p className="text-2xl font-bold text-orange-600">{stats.ongoingAudits}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موافقات معلقة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pendingApprovals}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مخاطر عالية</p>
                <p className="text-2xl font-bold text-red-600">{stats.highRisks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">سياسات نشطة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.activePolicies}</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-500/60" />
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
              اتجاهات الامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="compliance" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="violations" stackId="2" stroke="#ef4444" fill="#ef4444" />
                <Area type="monotone" dataKey="policies" stackId="3" stroke="#3b82f6" fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المخاطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للحوكمة والامتثال
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">امتثال ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن كبير في معدلات الامتثال مع انخفاض المخالفات بنسبة 40%
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">مراجعة مطلوبة</span>
              </div>
              <p className="text-sm text-orange-700">
                يُنصح بمراجعة 3 سياسات لضمان التوافق مع اللوائح الجديدة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصيات ذكية</span>
              </div>
              <p className="text-sm text-blue-700">
                تطبيق نظام التذكير التلقائي سيحسن الالتزام بمواعيد التدقيق
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            الأنشطة الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'تم اعتماد سياسة الخصوصية الجديدة', time: 'منذ ساعتين', type: 'approval', user: 'د. أحمد الخالدي' },
              { action: 'بدء تدقيق الامتثال السنوي', time: 'منذ 4 ساعات', type: 'audit', user: 'أحمد محمد السالم' },
              { action: 'تحديث تقييم المخاطر للقسم المالي', time: 'أمس', type: 'risk', user: 'فاطمة أحمد الخالدي' },
              { action: 'رفع تقرير الامتثال الشهري', time: 'أمس', type: 'report', user: 'نورا سالم المطيري' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-full bg-primary/10">
                  {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {activity.type === 'audit' && <Eye className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'risk' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                  {activity.type === 'report' && <FileText className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPoliciesRegulations = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في السياسات واللوائح..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="تصفية حسب الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="governance">الحوكمة</SelectItem>
                <SelectItem value="compliance">الامتثال</SelectItem>
                <SelectItem value="risk">المخاطر</SelectItem>
                <SelectItem value="audit">التدقيق</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة سياسة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{policy.title}</h3>
                  <Badge className={getStatusColor(policy.status)}>
                    {policy.status === 'active' && 'نشطة'}
                    {policy.status === 'draft' && 'مسودة'}
                    {policy.status === 'review' && 'قيد المراجعة'}
                    {policy.status === 'archived' && 'مؤرشفة'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">القسم:</span>
                  <span>{policy.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">آخر تحديث:</span>
                  <span>{policy.lastUpdated}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">معدل الإقرار:</span>
                    <span>{Math.round((policy.acknowledged / policy.total) * 100)}%</span>
                  </div>
                  <Progress value={(policy.acknowledged / policy.total) * 100} className="h-2" />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share className="h-4 w-4 ml-2" />
                  مشاركة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAuditsReviews = () => (
    <div className="space-y-6">
      {/* Audit Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">إدارة التدقيق والمراجعات</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 ml-2" />
                جدولة تدقيق
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                تدقيق جديد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audits List */}
      <div className="space-y-4">
        {audits.map((audit) => (
          <Card key={audit.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{audit.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(audit.status)}>
                      {audit.status === 'planned' && 'مخطط'}
                      {audit.status === 'ongoing' && 'جاري'}
                      {audit.status === 'completed' && 'مكتمل'}
                      {audit.status === 'overdue' && 'متأخر'}
                    </Badge>
                    <Badge variant="outline">
                      {audit.type === 'internal' && 'داخلي'}
                      {audit.type === 'external' && 'خارجي'}
                      {audit.type === 'regulatory' && 'تنظيمي'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">المدقق</p>
                  <p className="font-medium">{audit.auditor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">القسم</p>
                  <p className="font-medium">{audit.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">النتائج</p>
                  <p className="font-medium">{audit.findings} نتيجة</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم: {audit.progress}%</span>
                  <span>{audit.startDate} - {audit.endDate}</span>
                </div>
                <Progress value={audit.progress} className="h-2" />
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 ml-2" />
                  إرفاق مستندات
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير التقرير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRiskCompliance = () => (
    <div className="space-y-6">
      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            مصفوفة المخاطر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {/* Risk Matrix Headers */}
            <div className="text-center text-sm font-medium">الاحتمالية</div>
            <div className="text-center text-sm font-medium">منخفض (1-2)</div>
            <div className="text-center text-sm font-medium">متوسط (3-4)</div>
            <div className="text-center text-sm font-medium">عالي (5-6)</div>
            <div className="text-center text-sm font-medium">حرج (7-8)</div>
            
            {/* Risk Matrix Rows */}
            {['عالي', 'متوسط', 'منخفض'].map((impact, rowIndex) => (
              <React.Fragment key={impact}>
                <div className="text-sm font-medium flex items-center justify-center">{impact}</div>
                {[1, 2, 3, 4].map((col) => (
                  <div
                    key={col}
                    className={`h-16 rounded border-2 flex items-center justify-center text-white font-bold
                      ${col === 1 ? 'bg-green-500' : 
                        col === 2 ? 'bg-yellow-500' : 
                        col === 3 ? 'bg-orange-500' : 'bg-red-500'}`}
                  >
                    {rowIndex === 0 && col === 4 ? '2' : 
                     rowIndex === 1 && col === 3 ? '1' : 
                     rowIndex === 2 && col === 2 ? '1' : '0'}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risks List */}
      <div className="space-y-4">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{risk.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getSeverityColor(risk.severity)}>
                      {risk.severity === 'low' && 'منخفض'}
                      {risk.severity === 'medium' && 'متوسط'}
                      {risk.severity === 'high' && 'عالي'}
                      {risk.severity === 'critical' && 'حرج'}
                    </Badge>
                    <Badge variant="outline">
                      {risk.category === 'operational' && 'تشغيلي'}
                      {risk.category === 'financial' && 'مالي'}
                      {risk.category === 'strategic' && 'استراتيجي'}
                      {risk.category === 'compliance' && 'امتثال'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">المسؤول</p>
                  <p className="font-medium">{risk.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الاحتمالية</p>
                  <p className="font-medium">{risk.probability}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">التأثير</p>
                  <p className="font-medium">{risk.impact}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ الاستحقاق</p>
                  <p className="font-medium">{risk.dueDate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>مستوى المخاطرة الإجمالي:</span>
                  <span className="font-semibold">{Math.round((risk.probability * risk.impact) / 100)}%</span>
                </div>
                <Progress value={(risk.probability * risk.impact) / 100} className="h-2" />
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 ml-2" />
                  خطة التخفيف
                </Button>
                <Button variant="outline" size="sm">
                  <Timer className="h-4 w-4 ml-2" />
                  تحديث الحالة
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderApprovalsWorkflow = () => (
    <div className="space-y-6">
      {/* Workflow Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">سير عمل الموافقات</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات السير
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                طلب جديد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.map((approval) => (
          <Card key={approval.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{approval.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge className={getStatusColor(approval.status)}>
                      {approval.status === 'pending' && 'معلق'}
                      {approval.status === 'approved' && 'موافق عليه'}
                      {approval.status === 'rejected' && 'مرفوض'}
                      {approval.status === 'expired' && 'منتهي الصلاحية'}
                    </Badge>
                    <Badge variant="outline">
                      {approval.priority === 'high' && 'عاجل'}
                      {approval.priority === 'medium' && 'متوسط'}
                      {approval.priority === 'low' && 'منخفض'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">مقدم الطلب</p>
                  <p className="font-medium">{approval.requester}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">المعتمد</p>
                  <p className="font-medium">{approval.approver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                  <p className="font-medium">{approval.submitDate}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {approval.status === 'pending' && (
                  <>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      موافقة
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 ml-2" />
                      رفض
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 ml-2" />
                  التفاصيل
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>تقارير الحوكمة والامتثال</CardTitle>
          <CardDescription>
            إنشاء وتصدير التقارير التفصيلية للحوكمة والامتثال
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label>نوع التقرير</Label>
              <Select defaultValue="compliance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliance">تقرير الامتثال</SelectItem>
                  <SelectItem value="policies">تقرير السياسات</SelectItem>
                  <SelectItem value="audits">تقرير التدقيق</SelectItem>
                  <SelectItem value="risks">تقرير المخاطر</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الفترة الزمنية</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  <SelectItem value="annual">سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>تنسيق التصدير</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="word">Word</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>
              <BarChart3 className="h-4 w-4 ml-2" />
              إنشاء التقرير
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 ml-2" />
              جدولة تقرير دوري
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'تقرير الامتثال الشهري', description: 'ملخص شامل لحالة الامتثال', icon: CheckCircle, color: 'text-green-600' },
          { name: 'تقرير تدقيق الأداء', description: 'نتائج التدقيق والتوصيات', icon: Eye, color: 'text-blue-600' },
          { name: 'تقرير إدارة المخاطر', description: 'حالة المخاطر وخطط التخفيف', icon: AlertTriangle, color: 'text-orange-600' },
          { name: 'تقرير السياسات', description: 'حالة السياسات ومعدل الإقرار', icon: FileText, color: 'text-purple-600' },
          { name: 'تقرير الحوكمة التنفيذي', description: 'ملخص تنفيذي للإدارة العليا', icon: Crown, color: 'text-indigo-600' },
          { name: 'تقرير الامتثال التنظيمي', description: 'التزام بالقوانين واللوائح', icon: Gavel, color: 'text-red-600' }
        ].map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-full bg-muted ${report.color}`}>
                  <report.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 ml-2" />
                  معاينة
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
          <CardDescription>
            إعدادات النظام الأساسية للحوكمة والامتثال
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>فترة مراجعة السياسات (بالشهور)</Label>
              <Input type="number" defaultValue="12" />
            </div>
            <div>
              <Label>عدد أيام تذكير انتهاء الصلاحية</Label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <Label>مستوى المخاطر الافتراضي</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>تكرار التدقيق (بالشهور)</Label>
              <Input type="number" defaultValue="6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة الصلاحيات</CardTitle>
          <CardDescription>
            تحديد صلاحيات المستخدمين للنظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { role: 'مدير الحوكمة', permissions: ['عرض', 'إضافة', 'تعديل', 'حذف', 'اعتماد'], users: 2 },
              { role: 'مسؤول الامتثال', permissions: ['عرض', 'إضافة', 'تعديل', 'تقارير'], users: 3 },
              { role: 'مدقق داخلي', permissions: ['عرض', 'تدقيق', 'تقارير'], users: 4 },
              { role: 'موظف عادي', permissions: ['عرض محدود'], users: 285 }
            ].map((role, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{role.role}</h4>
                      <p className="text-sm text-muted-foreground">{role.users} مستخدم</p>
                    </div>
                    <div className="flex gap-2">
                      {role.permissions.map((permission, pIndex) => (
                        <Badge key={pIndex} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
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

      {/* Workflow Settings */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات سير العمل</CardTitle>
          <CardDescription>
            تخصيص مسارات الموافقة والتدقيق
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>مستوى الموافقة الأول</Label>
                <Select defaultValue="supervisor">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supervisor">المشرف المباشر</SelectItem>
                    <SelectItem value="manager">مدير القسم</SelectItem>
                    <SelectItem value="director">مدير عام</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>مستوى الموافقة الثاني</Label>
                <Select defaultValue="manager">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">مدير القسم</SelectItem>
                    <SelectItem value="director">مدير عام</SelectItem>
                    <SelectItem value="ceo">الرئيس التنفيذي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="autoReminder" className="rounded border-gray-300" />
              <Label htmlFor="autoReminder">تفعيل التذكيرات التلقائية</Label>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="digitalSignature" className="rounded border-gray-300" />
              <Label htmlFor="digitalSignature">تطلب التوقيع الإلكتروني</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex gap-2">
        <Button>
          <Settings className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 ml-2" />
          إعادة تعيين
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="policies">السياسات واللوائح</TabsTrigger>
            <TabsTrigger value="audits">التدقيق والمراجعات</TabsTrigger>
            <TabsTrigger value="risk">المخاطر والامتثال</TabsTrigger>
            <TabsTrigger value="approvals">الموافقات وسير العمل</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="policies">
            {renderPoliciesRegulations()}
          </TabsContent>

          <TabsContent value="audits">
            {renderAuditsReviews()}
          </TabsContent>

          <TabsContent value="risk">
            {renderRiskCompliance()}
          </TabsContent>

          <TabsContent value="approvals">
            {renderApprovalsWorkflow()}
          </TabsContent>

          <TabsContent value="reports">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة عنصر جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>النوع</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="policy">سياسة</SelectItem>
                  <SelectItem value="audit">تدقيق</SelectItem>
                  <SelectItem value="risk">مخاطرة</SelectItem>
                  <SelectItem value="approval">طلب موافقة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>العنوان</Label>
              <Input placeholder="أدخل العنوان" />
            </div>
            <div>
              <Label>الوصف</Label>
              <Textarea placeholder="أدخل الوصف التفصيلي" rows={4} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                toast({
                  title: "تم الحفظ",
                  description: "تم إضافة العنصر الجديد بنجاح",
                });
                setIsAddDialogOpen(false);
              }}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};