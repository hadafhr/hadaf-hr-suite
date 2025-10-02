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
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  DollarSign, 
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  Eye,
  Settings,
  Bell,
  BookOpen,
  Gavel,
  UserCheck,
  CreditCard,
  Building,
  Briefcase,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensiveWageProtectionProps {
  onBack: () => void;
}

interface WageViolation {
  id: string;
  companyName: string;
  employeeName: string;
  violationType: 'Late Payment' | 'Underpayment' | 'Overtime Violation' | 'Benefits Violation';
  amount: number;
  reportDate: string;
  status: 'Open' | 'Investigating' | 'Resolved' | 'Escalated';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
}

interface ComplianceReport {
  id: string;
  companyName: string;
  complianceScore: number;
  lastAuditDate: string;
  violations: number;
  employeeCount: number;
  status: 'Compliant' | 'At Risk' | 'Non-Compliant';
  nextAuditDate: string;
}

interface LegalCase {
  id: string;
  caseNumber: string;
  plaintiff: string;
  defendant: string;
  caseType: 'Wage Dispute' | 'Overtime Claim' | 'Benefits Claim' | 'Discrimination';
  amount: number;
  filingDate: string;
  status: 'Filed' | 'In Progress' | 'Settled' | 'Dismissed';
  expectedResolution: string;
}

export const ComprehensiveWageProtection: React.FC<ComprehensiveWageProtectionProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for demonstration
  const wageViolations: WageViolation[] = [
    {
      id: '1',
      companyName: 'شركة النور للتجارة',
      employeeName: 'أحمد محمد السالم',
      violationType: 'Late Payment',
      amount: 4500,
      reportDate: '2024-01-15',
      status: 'Investigating',
      severity: 'High',
      description: 'تأخير في دفع الراتب لمدة 15 يوم'
    },
    {
      id: '2',
      companyName: 'مؤسسة البناء الحديث',
      employeeName: 'فاطمة الخالدي',
      violationType: 'Underpayment',
      amount: 2800,
      reportDate: '2024-01-20',
      status: 'Open',
      severity: 'Medium',
      description: 'نقص في المبلغ المدفوع مقارنة بالعقد'
    }
  ];

  const complianceReports: ComplianceReport[] = [
    {
      id: '1',
      companyName: 'شركة النور للتجارة',
      complianceScore: 65,
      lastAuditDate: '2023-12-15',
      violations: 3,
      employeeCount: 45,
      status: 'At Risk',
      nextAuditDate: '2024-03-15'
    },
    {
      id: '2',
      companyName: 'مؤسسة التقنية المتقدمة',
      complianceScore: 95,
      lastAuditDate: '2024-01-10',
      violations: 0,
      employeeCount: 120,
      status: 'Compliant',
      nextAuditDate: '2024-07-10'
    }
  ];

  const legalCases: LegalCase[] = [
    {
      id: '1',
      caseNumber: 'WP-2024-001',
      plaintiff: 'أحمد محمد السالم',
      defendant: 'شركة النور للتجارة',
      caseType: 'Wage Dispute',
      amount: 15000,
      filingDate: '2024-01-25',
      status: 'In Progress',
      expectedResolution: '2024-04-15'
    }
  ];

  const performanceData = [
    { month: 'يناير', protected: 98, violations: 15, resolved: 92, claims: 8 },
    { month: 'فبراير', protected: 99, violations: 12, resolved: 95, claims: 6 },
    { month: 'مارس', protected: 97, violations: 18, resolved: 88, claims: 12 },
    { month: 'أبريل', protected: 100, violations: 8, resolved: 100, claims: 4 },
    { month: 'مايو', protected: 96, violations: 22, resolved: 86, claims: 15 },
    { month: 'يونيو', protected: 99, violations: 10, resolved: 98, claims: 5 }
  ];

  const violationTypes = [
    { name: 'تأخير الرواتب', value: 45, color: '#ef4444' },
    { name: 'نقص المبالغ', value: 30, color: '#f59e0b' },
    { name: 'انتهاكات الإضافي', value: 15, color: '#8b5cf6' },
    { name: 'انتهاكات المزايا', value: 10, color: '#06b6d4' }
  ];

  const complianceScores = [
    { company: 'شركة أ', score: 95, category: 'ممتاز' },
    { company: 'شركة ب', score: 85, category: 'جيد' },
    { company: 'شركة ج', score: 65, category: 'مقبول' },
    { company: 'شركة د', score: 45, category: 'ضعيف' }
  ];

  const getDashboardStats = () => {
    return {
      totalEmployees: 12450,
      protectedEmployees: 12201,
      activeViolations: wageViolations.filter(v => v.status !== 'Resolved').length,
      resolvedCases: 156,
      complianceRate: 96.2,
      avgResolutionTime: 14
    };
  };

  const stats = getDashboardStats();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Open': 'destructive',
      'Investigating': 'secondary',
      'Resolved': 'default',
      'Escalated': 'outline',
      'Filed': 'secondary',
      'In Progress': 'secondary',
      'Settled': 'default',
      'Dismissed': 'outline',
      'Compliant': 'default',
      'At Risk': 'secondary',
      'Non-Compliant': 'destructive'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'Low': 'outline',
      'Medium': 'secondary',
      'High': 'destructive',
      'Critical': 'destructive'
    };
    return <Badge variant={variants[severity] || 'default'}>{severity}</Badge>;
  };

  const renderProfessionalHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Shield className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام حماية الأجور الذكي المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              نظام متطور لحماية حقوق العمال وضمان الالتزام بقوانين العمل
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Shield className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          إبلاغ عن انتهاك
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موظفين محميين</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.protectedEmployees.toLocaleString()}</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">انتهاكات نشطة</p>
                <p className="text-2xl font-bold text-red-600">{stats.activeViolations}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قضايا محلولة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.resolvedCases}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الالتزام</p>
                <p className="text-2xl font-bold text-green-600">{stats.complianceRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط وقت الحل (يوم)</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgResolutionTime}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500/60" />
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
              تطور أداء النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="protected" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="violations" stackId="2" stroke="#ef4444" fill="#ef4444" />
                <Area type="monotone" dataKey="resolved" stackId="3" stroke="#3b82f6" fill="#3b82f6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              أنواع الانتهاكات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={violationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {violationTypes.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تحسن ملحوظ</span>
              </div>
              <p className="text-sm text-emerald-700">
                انخفاض في الانتهاكات بنسبة 25% مقارنة بالشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحذير</span>
              </div>
              <p className="text-sm text-orange-700">
                3 شركات تحتاج لمراجعة فورية لتجنب المخالفات القانونية
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                تطبيق نظام التنبيهات المبكرة لتحسين معدل الالتزام بنسبة 15%
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
          <Shield className="h-5 w-5" />
          نظرة عامة على نظام حماية الأجور
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">مراقبة الرواتب</h3>
            <p className="text-sm text-muted-foreground">
              مراقبة مستمرة لدفع الرواتب والتأكد من الالتزام بالمواعيد المحددة
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-emerald-300 hover:border-emerald-400 transition-colors">
            <AlertTriangle className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">كشف الانتهاكات</h3>
            <p className="text-sm text-muted-foreground">
              نظام ذكي لكشف انتهاكات قوانين العمل والأجور تلقائياً
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors">
            <Gavel className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">الحلول القانونية</h3>
            <p className="text-sm text-muted-foreground">
              إدارة شاملة للقضايا القانونية ومتابعة الحلول المناسبة
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
            <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">تقارير متقدمة</h3>
            <p className="text-sm text-muted-foreground">
              تحليلات شاملة وتقارير دورية عن حالة الالتزام والحماية
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors">
            <Bell className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">التنبيهات الذكية</h3>
            <p className="text-sm text-muted-foreground">
              تنبيهات فورية عند اكتشاف أي مخالفات أو انتهاكات محتملة
            </p>
          </div>
          <div className="p-6 rounded-lg border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
            <BookOpen className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">الدعم القانوني</h3>
            <p className="text-sm text-muted-foreground">
              مكتبة شاملة من القوانين والأنظمة والإرشادات القانونية
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderViolations = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الانتهاكات..."
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
            <SelectItem value="all">جميع الانتهاكات</SelectItem>
            <SelectItem value="open">مفتوحة</SelectItem>
            <SelectItem value="investigating">قيد التحقيق</SelectItem>
            <SelectItem value="resolved">محلولة</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          إبلاغ عن انتهاك
        </Button>
      </div>

      {/* Violations List */}
      <div className="grid gap-4">
        {wageViolations.map((violation) => (
          <Card key={violation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{violation.companyName}</h3>
                  <p className="text-muted-foreground">الموظف: {violation.employeeName}</p>
                  <p className="text-sm text-muted-foreground">نوع الانتهاك: {violation.violationType}</p>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(violation.status)}
                  {getSeverityBadge(violation.severity)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">المبلغ المتأثر</Label>
                  <p className="text-lg font-semibold text-red-600">{violation.amount.toLocaleString()} ريال</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">تاريخ الإبلاغ</Label>
                  <p className="text-sm font-medium">{violation.reportDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">وصف المشكلة</Label>
                  <p className="text-sm">{violation.description}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">عرض التفاصيل</Button>
                <Button variant="outline" size="sm">تحديث الحالة</Button>
                <Button size="sm">إجراء قانوني</Button>
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
        <h3 className="text-lg font-semibold">تقارير الالتزام</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          تقرير جديد
        </Button>
      </div>

      <div className="grid gap-6">
        {complianceReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{report.companyName}</h4>
                  <p className="text-muted-foreground">عدد الموظفين: {report.employeeCount}</p>
                </div>
                {getStatusBadge(report.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">درجة الالتزام</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={report.complianceScore} className="flex-1" />
                    <span className="text-sm font-bold">{report.complianceScore}%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المخالفات</Label>
                  <p className="text-lg font-semibold text-red-600">{report.violations}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">آخر مراجعة</Label>
                  <p className="text-sm font-medium">{report.lastAuditDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المراجعة القادمة</Label>
                  <p className="text-sm font-medium">{report.nextAuditDate}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">عرض التفاصيل</Button>
                <Button variant="outline" size="sm">جدولة مراجعة</Button>
                <Button size="sm">إجراءات تصحيحية</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLegalCases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">القضايا القانونية</h3>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          قضية جديدة
        </Button>
      </div>

      <div className="grid gap-6">
        {legalCases.map((legalCase) => (
          <Card key={legalCase.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">القضية رقم: {legalCase.caseNumber}</h4>
                  <p className="text-muted-foreground">النوع: {legalCase.caseType}</p>
                </div>
                {getStatusBadge(legalCase.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">المدعي</Label>
                  <p className="font-medium">{legalCase.plaintiff}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">المدعى عليه</Label>
                  <p className="font-medium">{legalCase.defendant}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">قيمة الدعوى</Label>
                  <p className="text-lg font-semibold text-green-600">{legalCase.amount.toLocaleString()} ريال</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">تاريخ الرفع</Label>
                  <p className="font-medium">{legalCase.filingDate}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">عرض المستندات</Button>
                <Button variant="outline" size="sm">تحديث الحالة</Button>
                <Button size="sm">متابعة القضية</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-arabic" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/50 to-primary"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Centered Logo */}
      <div className="relative z-10 flex justify-center pt-12 mb-8">
        <img 
          src="/src/assets/boud-logo-centered.png" 
          alt="Boud Logo" 
          className="h-24 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      {/* Centered Header */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          نظام حماية الأجور الذكي المتطور
        </h1>
        <p className="text-lg text-muted-foreground">
          نظام متطور لحماية حقوق العمال وضمان الالتزام بقوانين العمل
        </p>
      </div>
      
      <div className="container mx-auto p-6 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all">
              <BarChart3 className="h-4 w-4" />
              لوحة المعلومات
            </TabsTrigger>
            <TabsTrigger value="violations" className="flex items-center gap-2 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all">
              <AlertTriangle className="h-4 w-4" />
              الانتهاكات
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all">
              <Shield className="h-4 w-4" />
              الالتزام
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all">
              <Gavel className="h-4 w-4" />
              القضايا القانونية
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
            {renderSystemOverview()}
          </TabsContent>

          <TabsContent value="violations" className="space-y-6">
            {renderViolations()}
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {renderCompliance()}
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            {renderLegalCases()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير حماية الأجور</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    تقرير الانتهاكات الشامل
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    تحليل الالتزام
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Gavel className="h-6 w-6 mb-2" />
                    تقرير القضايا القانونية
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