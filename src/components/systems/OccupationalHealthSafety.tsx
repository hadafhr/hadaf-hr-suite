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
  AlertTriangle, 
  FileText, 
  Stethoscope,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Settings,
  Bell,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Sparkles,
  User,
  Building,
  BookOpen,
  Share,
  Paperclip,
  Send,
  Archive,
  Flag,
  RefreshCw,
  Star,
  Hash,
  Zap,
  Globe,
  UserCheck,
  Phone,
  Mail,
  Database,
  Server,
  HardHat,
  AlertCircle,
  Info,
  Camera,
  MapPin,
  UserPlus,
  Clipboard,
  Heart,
  TestTube,
  Calculator,
  BrainCircuit,
  ShieldCheck,
  Lock,
  Unlock,
  GraduationCap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface OccupationalHealthSafetyProps {
  onBack: () => void;
}

interface Incident {
  id: string;
  incidentNumber: string;
  date: string;
  time: string;
  location: string;
  reportedBy: string;
  employeeInvolved: string;
  department: string;
  incidentType: 'accident' | 'near_miss' | 'hazard' | 'injury' | 'illness';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  immediateAction: string;
  rootCause?: string;
  correctiveAction?: string;
  status: 'reported' | 'investigating' | 'action_required' | 'resolved' | 'closed';
  investigator?: string;
  attachments: number;
  daysLost: number;
  isRecordable: boolean;
}

interface MedicalCheck {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkType: 'pre_employment' | 'periodic' | 'fitness_for_duty' | 'return_to_work' | 'exit';
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled';
  medicalProvider: string;
  results?: 'fit' | 'fit_with_restrictions' | 'unfit' | 'pending';
  restrictions?: string;
  nextDueDate?: string;
  cost: number;
}

interface RiskAssessment {
  id: string;
  riskTitle: string;
  category: 'physical' | 'chemical' | 'biological' | 'ergonomic' | 'psychosocial';
  department: string;
  identifiedBy: string;
  dateIdentified: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  probability: number;
  severity: number;
  riskScore: number;
  description: string;
  controls: string;
  residualRisk: 'low' | 'medium' | 'high';
  assignedTo: string;
  status: 'identified' | 'assessed' | 'controls_implemented' | 'monitoring' | 'closed';
  reviewDate: string;
}

interface SafetyTraining {
  id: string;
  trainingTitle: string;
  trainingType: 'induction' | 'refresher' | 'specialized' | 'emergency' | 'compliance';
  department: string;
  trainer: string;
  scheduledDate: string;
  duration: number;
  maxParticipants: number;
  registeredCount: number;
  completedCount: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  certificationRequired: boolean;
  validityPeriod?: number;
  cost: number;
}

interface SafetyPolicy {
  id: string;
  policyTitle: string;
  policyNumber: string;
  category: 'general' | 'emergency' | 'ppe' | 'hazmat' | 'equipment' | 'procedure';
  version: string;
  effectiveDate: string;
  reviewDate: string;
  approvedBy: string;
  status: 'draft' | 'approved' | 'under_review' | 'archived';
  acknowledgedCount: number;
  totalEmployees: number;
  attachmentUrl?: string;
}

export const OccupationalHealthSafety: React.FC<OccupationalHealthSafetyProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Mock data for demonstration
  const incidents: Incident[] = [
    {
      id: '1',
      incidentNumber: 'INC-2024-001',
      date: '2024-01-20',
      time: '14:30',
      location: 'مصنع الإنتاج - الخط الأول',
      reportedBy: 'أحمد محمد العلي',
      employeeInvolved: 'سالم أحمد المطيري',
      department: 'الإنتاج',
      incidentType: 'accident',
      severity: 'medium',
      description: 'إصابة في اليد نتيجة تشغيل الآلة بدون واقيات',
      immediateAction: 'إسعافات أولية ونقل للمستشفى',
      rootCause: 'عدم استخدام معدات الحماية الشخصية',
      correctiveAction: 'تدريب إضافي على السلامة',
      status: 'investigating',
      investigator: 'مدير السلامة',
      attachments: 3,
      daysLost: 2,
      isRecordable: true
    },
    {
      id: '2',
      incidentNumber: 'INC-2024-002',
      date: '2024-01-18',
      time: '10:15',
      location: 'المكاتب الإدارية - الطابق الثاني',
      reportedBy: 'فاطمة سعد النحاس',
      employeeInvolved: 'محمد علي الخالدي',
      department: 'الإدارة',
      incidentType: 'near_miss',
      severity: 'low',
      description: 'كاد أن يسقط من الكرسي المكسور',
      immediateAction: 'استبدال الكرسي فوراً',
      status: 'resolved',
      attachments: 1,
      daysLost: 0,
      isRecordable: false
    }
  ];

  const medicalChecks: MedicalCheck[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'الإنتاج',
      checkType: 'periodic',
      scheduledDate: '2024-01-25',
      status: 'scheduled',
      medicalProvider: 'مستشفى الملك فهد',
      nextDueDate: '2025-01-25',
      cost: 500
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سالم المطيري',
      department: 'المالية',
      checkType: 'periodic',
      scheduledDate: '2024-01-15',
      completedDate: '2024-01-15',
      status: 'completed',
      medicalProvider: 'مركز السلامة الطبي',
      results: 'fit',
      nextDueDate: '2025-01-15',
      cost: 450
    }
  ];

  const riskAssessments: RiskAssessment[] = [
    {
      id: '1',
      riskTitle: 'التعرض للمواد الكيميائية',
      category: 'chemical',
      department: 'الإنتاج',
      identifiedBy: 'مدير السلامة',
      dateIdentified: '2024-01-10',
      riskLevel: 'high',
      probability: 3,
      severity: 4,
      riskScore: 12,
      description: 'تعرض العمال للمواد الكيميائية أثناء عملية التصنيع',
      controls: 'استخدام معدات الحماية الشخصية وتحسين التهوية',
      residualRisk: 'medium',
      assignedTo: 'مشرف الإنتاج',
      status: 'controls_implemented',
      reviewDate: '2024-04-10'
    },
    {
      id: '2',
      riskTitle: 'الإجهاد المهني للموظفين',
      category: 'psychosocial',
      department: 'الإدارة',
      identifiedBy: 'مدير الموارد البشرية',
      dateIdentified: '2024-01-15',
      riskLevel: 'medium',
      probability: 4,
      severity: 2,
      riskScore: 8,
      description: 'مستويات عالية من الإجهاد بسبب ضغط العمل',
      controls: 'برامج إدارة الإجهاد وتحسين بيئة العمل',
      residualRisk: 'low',
      assignedTo: 'مدير الموارد البشرية',
      status: 'monitoring',
      reviewDate: '2024-07-15'
    }
  ];

  const safetyTrainings: SafetyTraining[] = [
    {
      id: '1',
      trainingTitle: 'التدريب الأساسي على السلامة',
      trainingType: 'induction',
      department: 'جميع الأقسام',
      trainer: 'مدرب السلامة المعتمد',
      scheduledDate: '2024-02-01',
      duration: 4,
      maxParticipants: 20,
      registeredCount: 18,
      completedCount: 0,
      status: 'scheduled',
      certificationRequired: true,
      validityPeriod: 12,
      cost: 2500
    },
    {
      id: '2',
      trainingTitle: 'الإسعافات الأولية',
      trainingType: 'specialized',
      department: 'الإنتاج',
      trainer: 'طبيب معتمد',
      scheduledDate: '2024-01-15',
      duration: 8,
      maxParticipants: 15,
      registeredCount: 15,
      completedCount: 15,
      status: 'completed',
      certificationRequired: true,
      validityPeriod: 24,
      cost: 3500
    }
  ];

  const safetyPolicies: SafetyPolicy[] = [
    {
      id: '1',
      policyTitle: 'سياسة السلامة العامة',
      policyNumber: 'POL-SAF-001',
      category: 'general',
      version: '2.1',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-12-31',
      approvedBy: 'الرئيس التنفيذي',
      status: 'approved',
      acknowledgedCount: 45,
      totalEmployees: 50,
      attachmentUrl: '/documents/safety-policy.pdf'
    },
    {
      id: '2',
      policyTitle: 'إجراءات الطوارئ',
      policyNumber: 'POL-EMG-001',
      category: 'emergency',
      version: '1.3',
      effectiveDate: '2024-01-15',
      reviewDate: '2024-06-15',
      approvedBy: 'مدير السلامة',
      status: 'approved',
      acknowledgedCount: 38,
      totalEmployees: 50,
      attachmentUrl: '/documents/emergency-procedures.pdf'
    }
  ];

  // Analytics data
  const performanceData = [
    { month: 'يناير', incidents: 12, nearMiss: 8, medicalChecks: 15, trainings: 3 },
    { month: 'فبراير', incidents: 8, nearMiss: 12, medicalChecks: 18, trainings: 2 },
    { month: 'مارس', incidents: 6, nearMiss: 15, medicalChecks: 12, trainings: 4 },
    { month: 'أبريل', incidents: 4, nearMiss: 18, medicalChecks: 20, trainings: 3 },
    { month: 'مايو', incidents: 3, nearMiss: 22, medicalChecks: 16, trainings: 5 },
    { month: 'يونيو', incidents: 2, nearMiss: 25, medicalChecks: 22, trainings: 4 }
  ];

  const incidentTypeDistribution = [
    { name: 'حوادث', value: 35, color: '#dc2626' },
    { name: 'أخطاء وشيكة', value: 40, color: '#ea580c' },
    { name: 'مخاطر', value: 15, color: '#ca8a04' },
    { name: 'إصابات', value: 8, color: '#16a34a' },
    { name: 'أمراض مهنية', value: 2, color: '#2563eb' }
  ];

  const riskLevelDistribution = [
    { name: 'منخفض', value: 45, color: '#16a34a' },
    { name: 'متوسط', value: 32, color: '#ca8a04' },
    { name: 'عالي', value: 18, color: '#ea580c' },
    { name: 'حرج', value: 5, color: '#dc2626' }
  ];

  // Calculate statistics
  const stats = {
    totalIncidents: incidents.length,
    activeIncidents: incidents.filter(i => ['reported', 'investigating', 'action_required'].includes(i.status)).length,
    accidentFreeDays: 45,
    medicalChecksCompleted: medicalChecks.filter(m => m.status === 'completed').length,
    medicalChecksPending: medicalChecks.filter(m => m.status === 'scheduled').length,
    trainingsCompleted: safetyTrainings.filter(t => t.status === 'completed').length,
    riskAssessmentsActive: riskAssessments.filter(r => r.status !== 'closed').length,
    complianceRate: 92
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير السلامة والصحة المهنية كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleUpload = () => {
    toast({
      title: "تم الرفع بنجاح",
      description: "تم رفع المستندات بنجاح",
    });
  };

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "يتم تحميل المستندات",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': 
      case 'resolved': 
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      case 'investigating':
      case 'in_progress': 
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reported':
      case 'action_required': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    const severityMap: { [key: string]: string } = {
      'critical': 'حرج',
      'high': 'عالي',
      'medium': 'متوسط',
      'low': 'منخفض'
    };
    return severityMap[severity] || severity;
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'reported': 'مُبلغ عنه',
      'investigating': 'قيد التحقيق',
      'action_required': 'يتطلب إجراء',
      'resolved': 'محلول',
      'closed': 'مُغلق',
      'completed': 'مكتمل',
      'scheduled': 'مجدول',
      'overdue': 'متأخر',
      'in_progress': 'قيد التنفيذ'
    };
    return statusMap[status] || status;
  };

  const getIncidentTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'accident': 'حادث',
      'near_miss': 'خطأ وشيك',
      'hazard': 'خطر',
      'injury': 'إصابة',
      'illness': 'مرض مهني'
    };
    return typeMap[type] || type;
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
            <HardHat className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام السلامة والصحة المهنية
            </h1>
            <p className="text-gray-600 text-lg">
              منظومة شاملة لإدارة السلامة مع أدوات المراقبة والتحليل المتقدمة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <HardHat className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2" />
          تقرير حادث
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الحوادث</p>
                <p className="text-2xl font-bold text-primary">{stats.totalIncidents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حوادث نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeIncidents}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أيام بلا حوادث</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.accidentFreeDays}</p>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">فحوصات مكتملة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.medicalChecksCompleted}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">فحوصات معلقة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.medicalChecksPending}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تدريبات مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.trainingsCompleted}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تقييمات المخاطر</p>
                <p className="text-2xl font-bold text-red-600">{stats.riskAssessmentsActive}</p>
              </div>
              <Shield className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الامتثال</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.complianceRate}%</p>
              </div>
              <Target className="h-8 w-8 text-indigo-500/60" />
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
              أداء السلامة الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="incidents" stackId="1" stroke="#dc2626" fill="#dc2626" />
                <Area type="monotone" dataKey="nearMiss" stackId="2" stroke="#ea580c" fill="#ea580c" />
                <Area type="monotone" dataKey="medicalChecks" stackId="3" stroke="#16a34a" fill="#16a34a" />
                <Area type="monotone" dataKey="trainings" stackId="4" stroke="#2563eb" fill="#2563eb" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الحوادث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={incidentTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentTypeDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للسلامة والصحة المهنية
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
                انخفاض الحوادث بنسبة 40% مقارنة بالشهر الماضي مع زيادة التدريبات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحذير</span>
              </div>
              <p className="text-sm text-orange-700">
                قسم الإنتاج يُظهر مخاطر عالية - يُنصح بمراجعة فورية لإجراءات السلامة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توصية</span>
              </div>
              <p className="text-sm text-blue-700">
                15 موظف يحتاجون لفحوصات طبية دورية خلال الأسبوعين القادمين
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPoliciesProcedures = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في السياسات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="تصفية حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع السياسات</SelectItem>
              <SelectItem value="approved">معتمدة</SelectItem>
              <SelectItem value="draft">مسودات</SelectItem>
              <SelectItem value="under_review">قيد المراجعة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {safetyPolicies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6">{policy.policyTitle}</CardTitle>
                  <CardDescription className="mt-1">{policy.policyNumber} - الإصدار {policy.version}</CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الفئة:</span>
                <Badge variant="outline">{policy.category}</Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تاريخ السريان:</span>
                <span>{policy.effectiveDate}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تاريخ المراجعة:</span>
                <span>{policy.reviewDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(policy.status)}>
                  {getStatusText(policy.status)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">معدل الاطلاع</span>
                  <span className="font-medium">
                    {policy.acknowledgedCount}/{policy.totalEmployees} ({Math.round((policy.acknowledgedCount / policy.totalEmployees) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(policy.acknowledgedCount / policy.totalEmployees) * 100} 
                  className="h-2" 
                />
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{policy.approvedBy}</span>
                </div>
                {policy.attachmentUrl && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <span>مرفق</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Policy Button */}
      <Card className="border-dashed border-2 hover:bg-muted/50 cursor-pointer transition-colors">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">إضافة سياسة جديدة</h3>
            <p className="text-muted-foreground">أنشئ سياسة أو إجراء سلامة جديد</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIncidentManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الحوادث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="تصفية حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحوادث</SelectItem>
              <SelectItem value="reported">مُبلغ عنها</SelectItem>
              <SelectItem value="investigating">قيد التحقيق</SelectItem>
              <SelectItem value="resolved">محلولة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6 flex items-center gap-2">
                    {incident.incidentNumber}
                    {incident.isRecordable && <Flag className="h-4 w-4 text-red-500" />}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {incident.date} في {incident.time} - {incident.location}
                  </CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(incident)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">النوع:</span>
                <span className="font-medium">{getIncidentTypeText(incident.incidentType)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الموظف المتضرر:</span>
                <span>{incident.employeeInvolved}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">القسم:</span>
                <span>{incident.department}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(incident.severity)}>
                  {getSeverityText(incident.severity)}
                </Badge>
                <Badge className={getStatusColor(incident.status)}>
                  {getStatusText(incident.status)}
                </Badge>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground mb-1">الوصف:</p>
                <p className="line-clamp-2">{incident.description}</p>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground mb-1">الإجراء المباشر:</p>
                <p className="line-clamp-2">{incident.immediateAction}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    <span>{incident.attachments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{incident.daysLost} أيام</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{incident.reportedBy}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMedicalChecks = () => (
    <div className="space-y-6">
      {/* Medical Checks Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{medicalChecks.filter(m => m.status === 'scheduled').length}</p>
                <p className="text-sm text-muted-foreground">مجدولة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{medicalChecks.filter(m => m.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">مكتملة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{medicalChecks.filter(m => m.status === 'overdue').length}</p>
                <p className="text-sm text-muted-foreground">متأخرة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {medicalChecks.reduce((sum, check) => sum + check.cost, 0).toLocaleString()} ريال
                </p>
                <p className="text-sm text-muted-foreground">إجمالي التكلفة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Checks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            الفحوصات الطبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{check.employeeName}</h4>
                  <p className="text-sm text-muted-foreground">{check.department} - {check.checkType}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">المجدول</p>
                    <p className="font-medium">{check.scheduledDate}</p>
                  </div>
                  {check.completedDate && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">المكتمل</p>
                      <p className="font-medium">{check.completedDate}</p>
                    </div>
                  )}
                  <Badge className={getStatusColor(check.status)}>
                    {getStatusText(check.status)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">التكلفة</p>
                    <p className="font-medium">{check.cost} ريال</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRiskManagement = () => (
    <div className="space-y-6">
      {/* Risk Level Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            توزيع مستويات المخاطر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={riskLevelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskLevelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {riskAssessments.map((risk) => (
          <Card key={risk.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6">{risk.riskTitle}</CardTitle>
                  <CardDescription className="mt-1">{risk.department} - {risk.category}</CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">تاريخ التحديد:</span>
                <span>{risk.dateIdentified}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المُحدد بواسطة:</span>
                <span>{risk.identifiedBy}</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={getSeverityColor(risk.riskLevel)}>
                  {getSeverityText(risk.riskLevel)}
                </Badge>
                <Badge className={getStatusColor(risk.status)}>
                  {getStatusText(risk.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">الاحتمالية</p>
                  <p className="font-bold">{risk.probability}</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">الشدة</p>
                  <p className="font-bold">{risk.severity}</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">النقاط</p>
                  <p className="font-bold">{risk.riskScore}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground mb-1">الوصف:</p>
                <p className="line-clamp-2">{risk.description}</p>
              </div>

              <div className="text-sm">
                <p className="text-muted-foreground mb-1">الضوابط:</p>
                <p className="line-clamp-2">{risk.controls}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{risk.assignedTo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{risk.reviewDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTrainingAwareness = () => (
    <div className="space-y-6">
      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{safetyTrainings.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي التدريبات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {safetyTrainings.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">مكتملة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {safetyTrainings.reduce((sum, training) => sum + training.completedCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">متدربين</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {safetyTrainings.reduce((sum, training) => sum + training.cost, 0).toLocaleString()} ريال
                </p>
                <p className="text-sm text-muted-foreground">إجمالي التكلفة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {safetyTrainings.map((training) => (
          <Card key={training.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-6">{training.trainingTitle}</CardTitle>
                  <CardDescription className="mt-1">
                    {training.trainingType} - {training.department}
                  </CardDescription>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التاريخ المجدول:</span>
                <span>{training.scheduledDate}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المدرب:</span>
                <span>{training.trainer}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المدة:</span>
                <span>{training.duration} ساعات</span>
              </div>

              <Badge className={getStatusColor(training.status)}>
                {getStatusText(training.status)}
              </Badge>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">معدل التسجيل</span>
                  <span className="font-medium">
                    {training.registeredCount}/{training.maxParticipants} ({Math.round((training.registeredCount / training.maxParticipants) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(training.registeredCount / training.maxParticipants) * 100} 
                  className="h-2" 
                />
              </div>

              {training.status === 'completed' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">معدل الإكمال</span>
                    <span className="font-medium text-green-600">
                      {training.completedCount}/{training.registeredCount} ({Math.round((training.completedCount / training.registeredCount) * 100)}%)
                    </span>
                  </div>
                  <Progress 
                    value={(training.completedCount / training.registeredCount) * 100} 
                    className="h-2" 
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {training.certificationRequired && (
                    <Badge variant="outline" className="text-xs">
                      <Award className="h-3 w-3 ml-1" />
                      شهادة
                    </Badge>
                  )}
                  {training.validityPeriod && (
                    <Badge variant="outline" className="text-xs">
                      صالحة {training.validityPeriod} شهر
                    </Badge>
                  )}
                </div>
                <span className="font-medium">{training.cost.toLocaleString()} ريال</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">سجل الحوادث</h3>
            <p className="text-sm text-muted-foreground">
              تقرير شامل لجميع الحوادث والأخطاء الوشيكة
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">سجل المخاطر</h3>
            <p className="text-sm text-muted-foreground">
              تقييمات المخاطر والضوابط المطبقة
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">الفحوصات الطبية</h3>
            <p className="text-sm text-muted-foreground">
              حالة الفحوصات ومعدلات الامتثال
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">التدريبات</h3>
            <p className="text-sm text-muted-foreground">
              إحصائيات التدريب والشهادات
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              معدل الحوادث حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { department: 'الإنتاج', incidents: 8 },
                { department: 'الصيانة', incidents: 5 },
                { department: 'المخازن', incidents: 3 },
                { department: 'الإدارة', incidents: 1 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              معدل الامتثال للسلامة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الفحوصات الطبية</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-24" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>التدريبات الإجبارية</span>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-24" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>السياسات المقروءة</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-24" />
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>استخدام معدات الحماية</span>
                <div className="flex items-center gap-2">
                  <Progress value={94} className="w-24" />
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>خيارات التصدير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <FileText className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة التقرير
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 ml-2" />
              مشاركة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* User Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            صلاحيات المستخدمين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>مسؤول السلامة</Label>
                <Select defaultValue="safety_manager">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety_manager">مدير السلامة</SelectItem>
                    <SelectItem value="hr_manager">مدير الموارد البشرية</SelectItem>
                    <SelectItem value="admin">المشرف العام</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>محققي الحوادث</Label>
                <Select defaultValue="investigators">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety_team">فريق السلامة</SelectItem>
                    <SelectItem value="managers">المدراء</SelectItem>
                    <SelectItem value="all">جميع المستخدمين</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>إدارة التدريبات</Label>
                <Select defaultValue="trainers">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certified_trainers">المدربين المعتمدين</SelectItem>
                    <SelectItem value="hr_team">فريق الموارد البشرية</SelectItem>
                    <SelectItem value="safety_team">فريق السلامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              فئات المخاطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['physical', 'chemical', 'biological', 'ergonomic', 'psychosocial'].map((category) => (
                <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{category}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 ml-2" />
                إضافة فئة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>فترة التذكير للفحوصات الطبية</Label>
                <Select defaultValue="30days">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">7 أيام</SelectItem>
                    <SelectItem value="14days">14 يوم</SelectItem>
                    <SelectItem value="30days">30 يوم</SelectItem>
                    <SelectItem value="60days">60 يوم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>فترة صلاحية التدريبات</Label>
                <Select defaultValue="12months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 أشهر</SelectItem>
                    <SelectItem value="12months">12 شهر</SelectItem>
                    <SelectItem value="24months">24 شهر</SelectItem>
                    <SelectItem value="36months">36 شهر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>التوقيع الرقمي للحوادث</Label>
                <Select defaultValue="required">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="required">مطلوب</SelectItem>
                    <SelectItem value="optional">اختياري</SelectItem>
                    <SelectItem value="disabled">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">إلغاء</Button>
        <Button onClick={() => {
          toast({
            title: "تم حفظ الإعدادات",
            description: "تم حفظ جميع إعدادات السلامة والصحة المهنية",
          });
        }}>
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );

  // Add Incident Dialog
  const AddIncidentDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>الإبلاغ عن حادث جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>تاريخ الحادث</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>وقت الحادث</Label>
              <Input type="time" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الموقع</Label>
              <Input placeholder="مكان وقوع الحادث" />
            </div>
            <div className="space-y-2">
              <Label>نوع الحادث</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الحادث" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accident">حادث</SelectItem>
                  <SelectItem value="near_miss">خطأ وشيك</SelectItem>
                  <SelectItem value="hazard">خطر</SelectItem>
                  <SelectItem value="injury">إصابة</SelectItem>
                  <SelectItem value="illness">مرض مهني</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الموظف المتضرر</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                  <SelectItem value="emp2">سالم أحمد المطيري</SelectItem>
                  <SelectItem value="emp3">فاطمة سعد النحاس</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>درجة الخطورة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر درجة الخطورة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                  <SelectItem value="critical">حرج</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>وصف الحادث</Label>
            <Textarea placeholder="وصف تفصيلي لما حدث" rows={3} />
          </div>

          <div className="space-y-2">
            <Label>الإجراء المباشر المتخذ</Label>
            <Textarea placeholder="الإجراءات الفورية التي تم اتخاذها" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>عدد أيام الغياب</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>قابل للتسجيل</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">نعم</SelectItem>
                  <SelectItem value="no">لا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => {
              setIsAddDialogOpen(false);
              toast({
                title: "تم الإبلاغ عن الحادث",
                description: "تم تسجيل الحادث بنجاح وإرسال إشعار للمسؤولين",
              });
            }}>
              تسجيل الحادث
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              السياسات والإجراءات
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              إدارة الحوادث
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              الفحوصات الطبية
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              إدارة المخاطر
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              التدريب والتوعية
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            {renderPoliciesProcedures()}
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            {renderIncidentManagement()}
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            {renderMedicalChecks()}
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            {renderRiskManagement()}
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            {renderTrainingAwareness()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      <AddIncidentDialog />
    </div>
  );
};