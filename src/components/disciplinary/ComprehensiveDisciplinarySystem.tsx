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
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Gavel, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Download,
  Plus,
  Search,
  Filter,
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
  Info,
  UserPlus,
  Phone,
  Mail,
  Crown,
  Users2,
  Scale,
  Timer,
  Users,
  ShieldAlert,
  XCircle,
  Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensiveDisciplinarySystemProps {
  onBack?: () => void;
}

const ComprehensiveDisciplinarySystem = ({ onBack }: ComprehensiveDisciplinarySystemProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAppealDialogOpen, setIsAppealDialogOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<any>(null);

  // Mock data for violations
  const [violations, setViolations] = useState([
    {
      id: 1,
      employeeName: "أحمد محمد علي",
      employeeId: "EMP001",
      violationType: "تأخير عن العمل",
      description: "تأخر عن العمل لمدة 30 دقيقة بدون إذن",
      date: "2024-01-15",
      status: "نشط",
      severity: "متوسط",
      department: "الموارد البشرية",
      penalty: "إنذار شفهي",
      createdBy: "مدير الموارد البشرية"
    },
    {
      id: 2,
      employeeName: "فاطمة أحمد سالم",
      employeeId: "EMP002", 
      violationType: "عدم اتباع الإجراءات",
      description: "عدم اتباع إجراءات السلامة في المختبر",
      date: "2024-01-20",
      status: "قيد المراجعة",
      severity: "عالي",
      department: "المختبر",
      penalty: "إنذار كتابي",
      createdBy: "مدير المختبر"
    },
    {
      id: 3,
      employeeName: "محمد عبدالله الأحمد",
      employeeId: "EMP003",
      violationType: "عدم الالتزام بالزي الموحد",
      description: "عدم ارتداء الزي الموحد للشركة",
      date: "2024-01-18",
      status: "محلول",
      severity: "منخفض",
      department: "المبيعات",
      penalty: "تنبيه",
      createdBy: "مدير المبيعات"
    }
  ]);

  // Mock data for appeals
  const [appeals, setAppeals] = useState([
    {
      id: 1,
      violationId: 1,
      employeeName: "أحمد محمد علي",
      appealReason: "كان هناك ظرف طارئ عائلي",
      appealDate: "2024-01-16",
      status: "قيد المراجعة",
      reviewedBy: "",
      decision: ""
    },
    {
      id: 2,
      violationId: 2,
      employeeName: "فاطمة أحمد سالم", 
      appealReason: "لم أكن على علم بالإجراء الجديد",
      appealDate: "2024-01-21",
      status: "مقبول",
      reviewedBy: "مدير الموارد البشرية",
      decision: "تم قبول الاستئناف وإلغاء المخالفة"
    }
  ]);

  // Form states
  const [newViolation, setNewViolation] = useState({
    employeeName: "",
    employeeId: "",
    violationType: "",
    description: "",
    date: "",
    severity: "",
    department: "",
    penalty: ""
  });

  const [newAppeal, setNewAppeal] = useState({
    violationId: "",
    appealReason: "",
    appealDate: ""
  });

  // Analytics data
  const disciplinaryData = [
    { month: 'يناير', violations: 12, warnings: 8, suspensions: 2 },
    { month: 'فبراير', violations: 15, warnings: 10, suspensions: 3 },
    { month: 'مارس', violations: 8, warnings: 6, suspensions: 1 },
    { month: 'أبريل', violations: 18, warnings: 12, suspensions: 4 },
    { month: 'مايو', violations: 10, warnings: 7, suspensions: 2 },
    { month: 'يونيو', violations: 14, warnings: 9, suspensions: 3 }
  ];

  const violationsByType = [
    { name: 'مخالفات الحضور', value: 40, color: '#3b82f6' },
    { name: 'مخالفات السلوك', value: 25, color: '#10b981' },
    { name: 'مخالفات الأمان', value: 20, color: '#f59e0b' },
    { name: 'مخالفات أخرى', value: 15, color: '#8b5cf6' }
  ];

  // Calculate statistics
  const stats = {
    totalViolations: 156,
    activeWarnings: 23,
    resolvedCases: 133,
    avgResolutionTime: 4.2,
    employeesAtRisk: 8,
    criticalCases: 3
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير الجزاءات والعقوبات كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  // Handler functions
  const handleAddViolation = () => {
    if (!newViolation.employeeName || !newViolation.violationType) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const violation = {
      id: violations.length + 1,
      ...newViolation,
      status: "نشط",
      createdBy: "المستخدم الحالي"
    };
    
    setViolations([...violations, violation]);
    setNewViolation({
      employeeName: "",
      employeeId: "",
      violationType: "",
      description: "",
      date: "",
      severity: "",
      department: "",
      penalty: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "تم إضافة المخالفة",
      description: "تم إضافة المخالفة الجديدة بنجاح"
    });
  };

  const handleEditViolation = () => {
    if (!selectedViolation) return;
    
    const updatedViolations = violations.map(v => 
      v.id === selectedViolation.id ? selectedViolation : v
    );
    setViolations(updatedViolations);
    setIsEditDialogOpen(false);
    setSelectedViolation(null);
    
    toast({
      title: "تم تحديث المخالفة",
      description: "تم تحديث بيانات المخالفة بنجاح"
    });
  };

  const handleDeleteViolation = (id: number) => {
    setViolations(violations.filter(v => v.id !== id));
    toast({
      title: "تم حذف المخالفة",
      description: "تم حذف المخالفة بنجاح"
    });
  };

  const handleAddAppeal = () => {
    if (!newAppeal.violationId || !newAppeal.appealReason) {
      toast({
        title: "خطأ في البيانات", 
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const violation = violations.find(v => v.id === parseInt(newAppeal.violationId));
    const appeal = {
      id: appeals.length + 1,
      ...newAppeal,
      violationId: parseInt(newAppeal.violationId),
      employeeName: violation?.employeeName || "",
      status: "قيد المراجعة",
      reviewedBy: "",
      decision: ""
    };
    
    setAppeals([...appeals, appeal]);
    setNewAppeal({
      violationId: "",
      appealReason: "",
      appealDate: ""
    });
    setIsAppealDialogOpen(false);
    
    toast({
      title: "تم إضافة الاستئناف",
      description: "تم تقديم الاستئناف بنجاح"
    });
  };

  const handleApproveAppeal = (id: number) => {
    const updatedAppeals = appeals.map(a =>
      a.id === id ? { ...a, status: "مقبول", reviewedBy: "المستخدم الحالي" } : a
    );
    setAppeals(updatedAppeals);
    
    toast({
      title: "تم قبول الاستئناف",
      description: "تم قبول الاستئناف بنجاح"
    });
  };

  const handleRejectAppeal = (id: number) => {
    const updatedAppeals = appeals.map(a =>
      a.id === id ? { ...a, status: "مرفوض", reviewedBy: "المستخدم الحالي" } : a
    );
    setAppeals(updatedAppeals);
    
    toast({
      title: "تم رفض الاستئناف",
      description: "تم رفض الاستئناف"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط": return "bg-red-100 text-red-800";
      case "محلول": return "bg-green-100 text-green-800";
      case "قيد المراجعة": return "bg-yellow-100 text-yellow-800";
      case "مقبول": return "bg-green-100 text-green-800";
      case "مرفوض": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "عالي": return "bg-red-100 text-red-800";
      case "متوسط": return "bg-yellow-100 text-yellow-800";
      case "منخفض": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 rounded-3xl animate-fade-in">
      <div className="flex items-center gap-6">
        <Button variant="outline" size="sm" onClick={onBack} className="border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50 transition-all duration-300">
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        <div className="h-8 w-px bg-[#008C6A]/30"></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#008C6A] to-[#00694F] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#008C6A]/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            <Gavel className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#008C6A] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              نظام الجزاءات والعقوبات المتطور
            </h1>
            <p className="text-gray-300 text-lg">
              منظومة شاملة لإدارة المخالفات والجزاءات وفقاً لنظام العمل السعودي
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#008C6A]/30 text-[#008C6A] bg-[#008C6A]/10 px-4 py-2 text-sm font-medium">
          <Gavel className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          مخالفة جديدة
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-[#008C6A]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">إجمالي المخالفات</p>
                <p className="text-2xl font-bold text-[#008C6A]">{stats.totalViolations}</p>
              </div>
              <Scale className="h-8 w-8 text-[#008C6A]/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">إنذارات نشطة</p>
                <p className="text-2xl font-bold text-orange-400">{stats.activeWarnings}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">حالات محلولة</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolvedCases}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">متوسط وقت الحل (أيام)</p>
                <p className="text-2xl font-bold text-blue-400">{stats.avgResolutionTime}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-400/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">موظفين عرضة للخطر</p>
                <p className="text-2xl font-bold text-red-400">{stats.employeesAtRisk}</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-400/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">حالات حرجة</p>
                <p className="text-2xl font-bold text-purple-400">{stats.criticalCases}</p>
              </div>
              <XCircle className="h-8 w-8 text-purple-400/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-[#008C6A]" />
              إحصائيات المخالفات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={disciplinaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="violations" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="warnings" stackId="2" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="suspensions" stackId="3" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <PieChart className="h-5 w-5 text-[#008C6A]" />
              المخالفات حسب النوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={violationsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {violationsByType.map((entry, index) => (
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
      <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-[#008C6A]" />
            رؤى الذكاء الاصطناعي للجزاءات والعقوبات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-900/30 border border-emerald-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">تحسن ملحوظ</span>
              </div>
              <p className="text-sm text-gray-300">
                انخفاض في معدل المخالفات العامة بنسبة 18% مقارنة بالشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-900/30 border border-orange-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-semibold text-orange-300">تنبيه نمط مخالفات</span>
              </div>
              <p className="text-sm text-gray-300">
                ارتفاع في مخالفات التأخير في قسم الإنتاج، يتطلب تدخل إداري
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-300">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-gray-300">
                التوقعات تشير لانخفاض إضافي في المخالفات بنسبة 15% الشهر القادم
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="h-5 w-5 text-[#008C6A]" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <Gavel className="h-6 w-6 mb-2 text-[#008C6A]" />
              <span className="text-xs text-center">مخالفة جديدة</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <AlertTriangle className="h-6 w-6 mb-2 text-orange-400" />
              <span className="text-xs text-center">إنذار رسمي</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <FileText className="h-6 w-6 mb-2 text-blue-400" />
              <span className="text-xs text-center">سجل المخالفات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <Shield className="h-6 w-6 mb-2 text-green-400" />
              <span className="text-xs text-center">استئناف</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <Settings className="h-6 w-6 mb-2 text-purple-400" />
              <span className="text-xs text-center">إعدادات النظام</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20 hover:border-[#008C6A]/50">
              <Bell className="h-6 w-6 mb-2 text-yellow-400" />
              <span className="text-xs text-center">التنبيهات</span>
            </Button>
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
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-black/20 rounded-3xl border border-[#008C6A]/20 shadow-2xl shadow-[#008C6A]/10">
        {renderHeader()}
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 rounded-xl">
              <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="violations" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">سجل المخالفات</TabsTrigger>
              <TabsTrigger value="appeals" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">الاستئنافات</TabsTrigger>
              <TabsTrigger value="reports" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008C6A] data-[state=active]:via-[#009F87] data-[state=active]:to-[#00694F] data-[state=active]:text-white hover:bg-[#008C6A]/20 transition-all duration-300 rounded-lg">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="violations">
              <div className="space-y-6">
                {/* Header with actions */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">سجل المخالفات والعقوبات</h2>
                    <p className="text-gray-300">إدارة شاملة لجميع المخالفات والعقوبات</p>
                  </div>
                  <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white shadow-2xl shadow-[#008C6A]/20 hover:scale-105 transition-all duration-300">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مخالفة جديدة
                  </Button>
                </div>

                {/* Search and filters */}
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المخالفات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white placeholder:text-gray-400 focus:border-[#008C6A]/70"
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48 bg-black/20 backdrop-blur-sm border-[#008C6A]/30 text-white focus:border-[#008C6A]/70">
                      <SelectValue placeholder="تصفية النتائج" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المخالفات</SelectItem>
                      <SelectItem value="نشط">نشطة</SelectItem>
                      <SelectItem value="محلول">محلولة</SelectItem>
                      <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Violations List */}
                <div className="grid gap-4">
                  {violations
                    .filter(v => 
                      selectedFilter === 'all' || v.status === selectedFilter
                    )
                    .filter(v => 
                      v.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      v.violationType.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((violation) => (
                    <Card key={violation.id} className="bg-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:border-[#008C6A]/50 shadow-2xl shadow-[#008C6A]/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div>
                                <h3 className="font-semibold text-lg text-white">{violation.employeeName}</h3>
                                <p className="text-sm text-gray-400">ID: {violation.employeeId}</p>
                              </div>
                              <Badge className={getStatusColor(violation.status)}>
                                {violation.status}
                              </Badge>
                              <Badge className={getSeverityColor(violation.severity)}>
                                {violation.severity}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-300">نوع المخالفة:</span>
                                <p className="text-white">{violation.violationType}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">القسم:</span>
                                <p className="text-white">{violation.department}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">التاريخ:</span>
                                <p className="text-white">{violation.date}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-300">العقوبة:</span>
                                <p className="text-white">{violation.penalty}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <span className="font-medium text-muted-foreground">الوصف:</span>
                              <p className="mt-1">{violation.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedViolation(violation);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteViolation(violation.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Violation Dialog */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>إضافة مخالفة جديدة</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employeeName">اسم الموظف</Label>
                          <Input
                            id="employeeName"
                            value={newViolation.employeeName}
                            onChange={(e) => setNewViolation({...newViolation, employeeName: e.target.value})}
                            placeholder="أدخل اسم الموظف"
                          />
                        </div>
                        <div>
                          <Label htmlFor="employeeId">رقم الموظف</Label>
                          <Input
                            id="employeeId"
                            value={newViolation.employeeId}
                            onChange={(e) => setNewViolation({...newViolation, employeeId: e.target.value})}
                            placeholder="EMP001"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="violationType">نوع المخالفة</Label>
                          <Select onValueChange={(value) => setNewViolation({...newViolation, violationType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع المخالفة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تأخير عن العمل">تأخير عن العمل</SelectItem>
                              <SelectItem value="غياب بدون إذن">غياب بدون إذن</SelectItem>
                              <SelectItem value="عدم اتباع الإجراءات">عدم اتباع الإجراءات</SelectItem>
                              <SelectItem value="عدم الالتزام بالزي">عدم الالتزام بالزي الموحد</SelectItem>
                              <SelectItem value="سوء السلوك">سوء السلوك</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="department">القسم</Label>
                          <Select onValueChange={(value) => setNewViolation({...newViolation, department: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر القسم" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                              <SelectItem value="المبيعات">المبيعات</SelectItem>
                              <SelectItem value="التسويق">التسويق</SelectItem>
                              <SelectItem value="المحاسبة">المحاسبة</SelectItem>
                              <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="date">تاريخ المخالفة</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newViolation.date}
                            onChange={(e) => setNewViolation({...newViolation, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="severity">درجة الخطورة</Label>
                          <Select onValueChange={(value) => setNewViolation({...newViolation, severity: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر درجة الخطورة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="منخفض">منخفض</SelectItem>
                              <SelectItem value="متوسط">متوسط</SelectItem>
                              <SelectItem value="عالي">عالي</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="penalty">العقوبة</Label>
                          <Select onValueChange={(value) => setNewViolation({...newViolation, penalty: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر العقوبة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تنبيه">تنبيه</SelectItem>
                              <SelectItem value="إنذار شفهي">إنذار شفهي</SelectItem>
                              <SelectItem value="إنذار كتابي">إنذار كتابي</SelectItem>
                              <SelectItem value="خصم من الراتب">خصم من الراتب</SelectItem>
                              <SelectItem value="إيقاف عن العمل">إيقاف عن العمل</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">وصف المخالفة</Label>
                        <Textarea
                          id="description"
                          value={newViolation.description}
                          onChange={(e) => setNewViolation({...newViolation, description: e.target.value})}
                          placeholder="اكتب تفاصيل المخالفة..."
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          إلغاء
                        </Button>
                        <Button onClick={handleAddViolation}>
                          إضافة المخالفة
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            <TabsContent value="appeals">
              <div className="space-y-6">
                {/* Header with actions */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">إدارة الاستئنافات</h2>
                    <p className="text-muted-foreground">مراجعة والبت في استئنافات المخالفات</p>
                  </div>
                  <Button onClick={() => setIsAppealDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 ml-2" />
                    استئناف جديد
                  </Button>
                </div>

                {/* Appeals List */}
                <div className="grid gap-4">
                  {appeals.map((appeal) => (
                    <Card key={appeal.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">{appeal.employeeName}</h3>
                                <p className="text-sm text-muted-foreground">رقم المخالفة: {appeal.violationId}</p>
                              </div>
                              <Badge className={getStatusColor(appeal.status)}>
                                {appeal.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>
                                <span className="font-medium text-muted-foreground">تاريخ الاستئناف:</span>
                                <p>{appeal.appealDate}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">المراجع:</span>
                                <p>{appeal.reviewedBy || "لم يتم التعيين"}</p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <span className="font-medium text-muted-foreground">سبب الاستئناف:</span>
                              <p className="mt-1">{appeal.appealReason}</p>
                            </div>

                            {appeal.decision && (
                              <div>
                                <span className="font-medium text-muted-foreground">القرار:</span>
                                <p className="mt-1">{appeal.decision}</p>
                              </div>
                            )}
                          </div>
                          
                          {appeal.status === "قيد المراجعة" && (
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleApproveAppeal(appeal.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 ml-2" />
                                قبول
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleRejectAppeal(appeal.id)}
                              >
                                <XCircle className="h-4 w-4 ml-2" />
                                رفض
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Appeal Dialog */}
                <Dialog open={isAppealDialogOpen} onOpenChange={setIsAppealDialogOpen}>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>تقديم استئناف جديد</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="violationId">رقم المخالفة</Label>
                        <Select onValueChange={(value) => setNewAppeal({...newAppeal, violationId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المخالفة" />
                          </SelectTrigger>
                          <SelectContent>
                            {violations
                              .filter(v => v.status === "نشط")
                              .map((violation) => (
                              <SelectItem key={violation.id} value={violation.id.toString()}>
                                {violation.id} - {violation.employeeName} ({violation.violationType})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="appealDate">تاريخ الاستئناف</Label>
                        <Input
                          id="appealDate"
                          type="date"
                          value={newAppeal.appealDate}
                          onChange={(e) => setNewAppeal({...newAppeal, appealDate: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label htmlFor="appealReason">سبب الاستئناف</Label>
                        <Textarea
                          id="appealReason"
                          value={newAppeal.appealReason}
                          onChange={(e) => setNewAppeal({...newAppeal, appealReason: e.target.value})}
                          placeholder="اشرح أسباب الاستئناف..."
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAppealDialogOpen(false)}>
                          إلغاء
                        </Button>
                        <Button onClick={handleAddAppeal}>
                          تقديم الاستئناف
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold">التقارير والإحصائيات</h2>
                  <p className="text-muted-foreground">تقارير شاملة عن المخالفات والعقوبات</p>
                </div>

                {/* Report Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Monthly Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">التقرير الشهري</h3>
                          <p className="text-sm text-muted-foreground">إحصائيات شهرية شاملة</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>إجمالي المخالفات:</span>
                          <span className="font-medium">42</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الحالات المحلولة:</span>
                          <span className="font-medium">38</span>
                        </div>
                        <div className="flex justify-between">
                          <span>معدل الحل:</span>
                          <span className="font-medium">90%</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Department Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">تقرير الأقسام</h3>
                          <p className="text-sm text-muted-foreground">مخالفات حسب القسم</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>الموارد البشرية:</span>
                          <span className="font-medium">8 مخالفات</span>
                        </div>
                        <div className="flex justify-between">
                          <span>المبيعات:</span>
                          <span className="font-medium">12 مخالفة</span>
                        </div>
                        <div className="flex justify-between">
                          <span>التسويق:</span>
                          <span className="font-medium">6 مخالفات</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Violation Types Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">تقرير أنواع المخالفات</h3>
                          <p className="text-sm text-muted-foreground">تحليل أنواع المخالفات</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>تأخير عن العمل:</span>
                          <span className="font-medium">18 حالة</span>
                        </div>
                        <div className="flex justify-between">
                          <span>عدم اتباع الإجراءات:</span>
                          <span className="font-medium">12 حالة</span>
                        </div>
                        <div className="flex justify-between">
                          <span>غياب بدون إذن:</span>
                          <span className="font-medium">8 حالات</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Employee Performance Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">تقرير أداء الموظفين</h3>
                          <p className="text-sm text-muted-foreground">تحليل أداء الموظفين</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>موظفين متميزين:</span>
                          <span className="font-medium text-green-600">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>يحتاجون تطوير:</span>
                          <span className="font-medium text-yellow-600">12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>عرضة للخطر:</span>
                          <span className="font-medium text-red-600">3%</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Trends Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">تقرير الاتجاهات</h3>
                          <p className="text-sm text-muted-foreground">تحليل الاتجاهات الزمنية</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>الاتجاه العام:</span>
                          <span className="font-medium text-green-600">تحسن</span>
                        </div>
                        <div className="flex justify-between">
                          <span>معدل التغيير:</span>
                          <span className="font-medium">-15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>التوقع القادم:</span>
                          <span className="font-medium text-green-600">إيجابي</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Appeals Report */}
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">تقرير الاستئنافات</h3>
                          <p className="text-sm text-muted-foreground">إحصائيات الاستئنافات</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>إجمالي الاستئنافات:</span>
                          <span className="font-medium">15</span>
                        </div>
                        <div className="flex justify-between">
                          <span>مقبولة:</span>
                          <span className="font-medium text-green-600">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>مرفوضة:</span>
                          <span className="font-medium text-red-600">5</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" onClick={handleExport}>
                        <Download className="h-4 w-4 ml-2" />
                        تصدير التقرير
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Custom Report Builder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      منشئ التقارير المخصصة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>الفترة الزمنية</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفترة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="week">أسبوع</SelectItem>
                            <SelectItem value="month">شهر</SelectItem>
                            <SelectItem value="quarter">ربع سنة</SelectItem>
                            <SelectItem value="year">سنة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>القسم</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر القسم" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الأقسام</SelectItem>
                            <SelectItem value="hr">الموارد البشرية</SelectItem>
                            <SelectItem value="sales">المبيعات</SelectItem>
                            <SelectItem value="marketing">التسويق</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>نوع التقرير</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summary">ملخص</SelectItem>
                            <SelectItem value="detailed">مفصل</SelectItem>
                            <SelectItem value="analytical">تحليلي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleExport} className="flex-1">
                        <Download className="h-4 w-4 ml-2" />
                        إنشاء وتصدير التقرير
                      </Button>
                      <Button variant="outline" onClick={handlePrint}>
                        <FileText className="h-4 w-4 ml-2" />
                        معاينة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ComprehensiveDisciplinarySystem;