import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Gavel, 
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
  Users,
  Building,
  BookOpen,
  Shield,
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
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensiveLegalAffairsProps {
  onBack: () => void;
}

interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  type: 'Employment' | 'Contract' | 'Compliance' | 'Intellectual Property' | 'Civil' | 'Commercial';
  status: 'Open' | 'In Progress' | 'Pending' | 'Closed' | 'Appealed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedLawyer: string;
  client: string;
  startDate: string;
  expectedResolution: string;
  description: string;
  amount?: number;
  documents: number;
}

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  type: 'Employment' | 'Service' | 'Supply' | 'Partnership' | 'NDA' | 'Licensing';
  status: 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Expired' | 'Terminated';
  party1: string;
  party2: string;
  startDate: string;
  endDate: string;
  value: number;
  renewalDate?: string;
  description: string;
}

interface ComplianceItem {
  id: string;
  regulation: string;
  category: 'Labor Law' | 'Data Protection' | 'Financial' | 'Health & Safety' | 'Environmental' | 'Industry Specific';
  status: 'Compliant' | 'At Risk' | 'Non-Compliant' | 'Under Review';
  lastReviewDate: string;
  nextReviewDate: string;
  assignedTo: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  actions: string[];
}

interface LegalDocument {
  id: string;
  title: string;
  type: 'Policy' | 'Procedure' | 'Template' | 'Regulation' | 'Guide' | 'Form';
  category: string;
  version: string;
  lastUpdated: string;
  author: string;
  status: 'Active' | 'Draft' | 'Archived';
  downloadCount: number;
}

export const ComprehensiveLegalAffairs: React.FC<ComprehensiveLegalAffairsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const legalCases: LegalCase[] = [
    {
      id: '1',
      caseNumber: 'LC-2024-001',
      title: 'نزاع عمالي - إنهاء خدمة',
      type: 'Employment',
      status: 'In Progress',
      priority: 'High',
      assignedLawyer: 'أحمد الجبيري',
      client: 'شركة النور للتجارة',
      startDate: '2024-01-15',
      expectedResolution: '2024-03-15',
      description: 'قضية إنهاء خدمة موظف والمطالبة بالتعويضات',
      amount: 45000,
      documents: 8
    },
    {
      id: '2',
      caseNumber: 'LC-2024-002',
      title: 'مراجعة عقد شراكة',
      type: 'Contract',
      status: 'Open',
      priority: 'Medium',
      assignedLawyer: 'فاطمة الخالدي',
      client: 'مؤسسة التقنية المتقدمة',
      startDate: '2024-02-01',
      expectedResolution: '2024-02-28',
      description: 'مراجعة وتعديل شروط عقد الشراكة الاستراتيجية',
      documents: 5
    }
  ];

  const contracts: Contract[] = [
    {
      id: '1',
      contractNumber: 'CT-2024-001',
      title: 'عقد توريد أجهزة كمبيوتر',
      type: 'Supply',
      status: 'Active',
      party1: 'شركة بود',
      party2: 'مؤسسة التقنية المتقدمة',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: 250000,
      renewalDate: '2024-11-01',
      description: 'عقد توريد أجهزة الكمبيوتر والمعدات التقنية'
    },
    {
      id: '2',
      contractNumber: 'CT-2024-002',
      title: 'عقد استشارات قانونية',
      type: 'Service',
      status: 'Under Review',
      party1: 'شركة بود',
      party2: 'مكتب الجبيري للمحاماة',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      value: 120000,
      description: 'عقد تقديم الاستشارات القانونية والدعم القانوني'
    }
  ];

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      regulation: 'نظام العمل السعودي',
      category: 'Labor Law',
      status: 'Compliant',
      lastReviewDate: '2024-01-15',
      nextReviewDate: '2024-04-15',
      assignedTo: 'إدارة الموارد البشرية',
      riskLevel: 'Low',
      actions: ['مراجعة العقود', 'تحديث السياسات']
    },
    {
      id: '2',
      regulation: 'نظام حماية البيانات',
      category: 'Data Protection',
      status: 'At Risk',
      lastReviewDate: '2023-11-20',
      nextReviewDate: '2024-02-20',
      assignedTo: 'إدارة تقنية المعلومات',
      riskLevel: 'Medium',
      actions: ['تحديث سياسة الخصوصية', 'تدريب الموظفين']
    }
  ];

  const legalDocuments: LegalDocument[] = [
    {
      id: '1',
      title: 'سياسة الموارد البشرية',
      type: 'Policy',
      category: 'HR',
      version: '2.1',
      lastUpdated: '2024-01-10',
      author: 'أحمد الجبيري',
      status: 'Active',
      downloadCount: 156
    },
    {
      id: '2',
      title: 'نموذج عقد العمل',
      type: 'Template',
      category: 'Employment',
      version: '3.0',
      lastUpdated: '2024-01-20',
      author: 'فاطمة الخالدي',
      status: 'Active',
      downloadCount: 89
    }
  ];

  const performanceData = [
    { month: 'يناير', cases: 12, resolved: 8, contracts: 15, compliance: 95 },
    { month: 'فبراير', cases: 15, resolved: 12, contracts: 18, compliance: 97 },
    { month: 'مارس', cases: 10, resolved: 9, contracts: 12, compliance: 92 },
    { month: 'أبريل', cases: 18, resolved: 14, contracts: 20, compliance: 98 },
    { month: 'مايو', cases: 14, resolved: 11, contracts: 16, compliance: 94 },
    { month: 'يونيو', cases: 16, resolved: 15, contracts: 22, compliance: 99 }
  ];

  const caseTypeDistribution = [
    { name: 'قضايا عمالية', value: 35, color: '#3b82f6' },
    { name: 'عقود', value: 28, color: '#10b981' },
    { name: 'امتثال', value: 20, color: '#f59e0b' },
    { name: 'ملكية فكرية', value: 10, color: '#ef4444' },
    { name: 'أخرى', value: 7, color: '#8b5cf6' }
  ];

  const complianceStatus = [
    { status: 'ملتزم', count: 45, percentage: 78 },
    { status: 'في خطر', count: 8, percentage: 14 },
    { status: 'غير ملتزم', count: 3, percentage: 5 },
    { status: 'قيد المراجعة', count: 2, percentage: 3 }
  ];

  const getDashboardStats = () => {
    return {
      totalCases: legalCases.length,
      activeCases: legalCases.filter(c => c.status === 'In Progress' || c.status === 'Open').length,
      activeContracts: contracts.filter(c => c.status === 'Active').length,
      complianceRate: 78,
      avgResolutionTime: 45,
      documentsCount: legalDocuments.length
    };
  };

  const stats = getDashboardStats();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Open': 'destructive',
      'In Progress': 'secondary',
      'Pending': 'outline', 
      'Closed': 'default',
      'Appealed': 'destructive',
      'Draft': 'outline',
      'Under Review': 'secondary',
      'Approved': 'default',
      'Active': 'default',
      'Expired': 'destructive',
      'Terminated': 'destructive',
      'Compliant': 'default',
      'At Risk': 'secondary',
      'Non-Compliant': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Low': 'outline',
      'Medium': 'secondary',
      'High': 'destructive',
      'Critical': 'destructive'
    };
    return <Badge variant={variants[priority] || 'default'}>{priority}</Badge>;
  };

  const handleExport = () => {
    toast({
      title: "تصدير البيانات",
      description: "جاري تصدير البيانات إلى ملف Excel...",
    });
  };

  const handlePrint = () => {
    toast({
      title: "طباعة التقرير",
      description: "جاري إعداد التقرير للطباعة...",
    });
  };

  const renderProfessionalHeader = () => (
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
                <Gavel className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  نظام الشؤون القانونية والامتثال الذكي
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  نظام متطور لإدارة القضايا القانونية والعقود وضمان الامتثال للقوانين واللوائح
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
              قضية جديدة
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
                <p className="text-sm text-muted-foreground">إجمالي القضايا</p>
                <p className="text-2xl font-bold text-primary">{stats.totalCases}</p>
              </div>
              <Gavel className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قضايا نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeCases}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عقود نشطة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.activeContracts}</p>
              </div>
              <FileText className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الامتثال</p>
                <p className="text-2xl font-bold text-blue-600">{stats.complianceRate}%</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط وقت الحل (يوم)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgResolutionTime}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المستندات القانونية</p>
                <p className="text-2xl font-bold text-green-600">{stats.documentsCount}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500/60" />
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
              أداء النظام القانوني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cases" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="contracts" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع القضايا
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={caseTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {caseTypeDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي القانونية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تحسن في الأداء</span>
              </div>
              <p className="text-sm text-emerald-700">
                انخفاض في متوسط وقت حل القضايا بنسبة 20% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه</span>
              </div>
              <p className="text-sm text-orange-700">
                5 عقود تحتاج للتجديد خلال الشهرين القادمين
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                تحديث سياسات الامتثال لتحسين النسبة إلى 95%
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
          <Scale className="h-5 w-5" />
          نظرة عامة على النظام القانوني
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
            <Gavel className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">إدارة القضايا</h3>
            <p className="text-sm text-muted-foreground">
              متابعة شاملة للقضايا القانونية من التسجيل حتى الإغلاق
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-emerald-300 hover:border-emerald-400 transition-colors">
            <FileText className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">إدارة العقود</h3>
            <p className="text-sm text-muted-foreground">
              نظام متطور لإنشاء ومراجعة ومتابعة العقود القانونية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
            <Shield className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">الامتثال والمطابقة</h3>
            <p className="text-sm text-muted-foreground">
              مراقبة دائمة للامتثال للقوانين واللوائح المحلية والدولية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
            <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">المكتبة القانونية</h3>
            <p className="text-sm text-muted-foreground">
              مجموعة شاملة من المستندات والسياسات والنماذج القانونية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
            <Bell className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">التنبيهات الذكية</h3>
            <p className="text-sm text-muted-foreground">
              تنبيهات تلقائية للمواعيد المهمة والالتزامات القانونية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
            <BarChart3 className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">التقارير والتحليلات</h3>
            <p className="text-sm text-muted-foreground">
              تقارير تفصيلية وتحليلات متقدمة للأداء القانوني
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderLegalCases = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في القضايا..."
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
            <SelectItem value="all">جميع القضايا</SelectItem>
            <SelectItem value="open">مفتوحة</SelectItem>
            <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
            <SelectItem value="closed">مغلقة</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          قضية جديدة
        </Button>
      </div>

      {/* Cases List */}
      <div className="grid gap-4">
        {legalCases.map((legalCase) => (
          <Card key={legalCase.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{legalCase.title}</h3>
                  <p className="text-muted-foreground">رقم القضية: {legalCase.caseNumber}</p>
                  <p className="text-sm text-muted-foreground">العميل: {legalCase.client}</p>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(legalCase.status)}
                  {getPriorityBadge(legalCase.priority)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">نوع القضية</Label>
                  <p className="font-medium">{legalCase.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المحامي المكلف</Label>
                  <p className="font-medium">{legalCase.assignedLawyer}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">تاريخ البداية</Label>
                  <p className="font-medium">{legalCase.startDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">الحل المتوقع</Label>
                  <p className="font-medium">{legalCase.expectedResolution}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{legalCase.description}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {legalCase.amount && (
                    <>
                      <CreditCard className="h-4 w-4" />
                      <span>{legalCase.amount.toLocaleString()} ريال</span>
                    </>
                  )}
                  <FileText className="h-4 w-4" />
                  <span>{legalCase.documents} مستند</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 ml-2" />
                    عرض
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 ml-2" />
                    تحرير
                  </Button>
                  <Button size="sm">
                    <Share className="h-4 w-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة العقود</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          عقد جديد
        </Button>
      </div>

      <div className="grid gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{contract.title}</h4>
                  <p className="text-muted-foreground">رقم العقد: {contract.contractNumber}</p>
                </div>
                {getStatusBadge(contract.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">نوع العقد</Label>
                  <p className="font-medium">{contract.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">الطرف الأول</Label>
                  <p className="font-medium">{contract.party1}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">الطرف الثاني</Label>
                  <p className="font-medium">{contract.party2}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">قيمة العقد</Label>
                  <p className="text-lg font-semibold text-green-600">{contract.value.toLocaleString()} ريال</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">تاريخ البداية</Label>
                  <p className="font-medium">{contract.startDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">تاريخ الانتهاء</Label>
                  <p className="font-medium">{contract.endDate}</p>
                </div>
                {contract.renewalDate && (
                  <div>
                    <Label className="text-xs text-muted-foreground">تاريخ التجديد</Label>
                    <p className="font-medium">{contract.renewalDate}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">{contract.description}</p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">عرض العقد</Button>
                <Button variant="outline" size="sm">تحرير</Button>
                <Button size="sm">تجديد</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">مراقبة الامتثال</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          عنصر جديد
        </Button>
      </div>

      <div className="grid gap-6">
        {complianceItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{item.regulation}</h4>
                  <p className="text-muted-foreground">الفئة: {item.category}</p>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(item.status)}
                  {getPriorityBadge(item.riskLevel)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">آخر مراجعة</Label>
                  <p className="font-medium">{item.lastReviewDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المراجعة القادمة</Label>
                  <p className="font-medium">{item.nextReviewDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المسؤول</Label>
                  <p className="font-medium">{item.assignedTo}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">الإجراءات المطلوبة</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.actions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">مراجعة</Button>
                <Button variant="outline" size="sm">تحديث</Button>
                <Button size="sm">إجراء</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">المكتبة القانونية</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          مستند جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.type} - {doc.category}</p>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">الإصدار:</span>
                  <span className="font-medium">{doc.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">آخر تحديث:</span>
                  <span className="font-medium">{doc.lastUpdated}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المؤلف:</span>
                  <span className="font-medium">{doc.author}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التحميلات:</span>
                  <span className="font-medium">{doc.downloadCount}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 ml-2" />
                  عرض
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {renderProfessionalHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة المعلومات
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              القضايا
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              العقود
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              الامتثال
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              المكتبة
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
            {renderSystemOverview()}
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            {renderLegalCases()}
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            {renderContracts()}
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {renderCompliance()}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {renderDocuments()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير القانونية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Gavel className="h-6 w-6 mb-2" />
                    تقرير القضايا الشامل
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    تقرير العقود
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Shield className="h-6 w-6 mb-2" />
                    تقرير الامتثال
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