import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Target,
  AlertTriangle,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2,
  Save,
  Brain,
  Users,
  Calendar,
  Clock,
  Zap,
  Activity,
  Shield,
  Briefcase,
  BookOpen,
  MessageSquare,
  ChevronRight,
  RefreshCw,
  FileSpreadsheet,
  Printer,
  Database,
  Layers,
  Gauge
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell, Bar } from 'recharts';

interface ComprehensivePerformanceEvaluationProps {
  onBack: () => void;
}

export const ComprehensivePerformanceEvaluation: React.FC<ComprehensivePerformanceEvaluationProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIndicatorType, setSelectedIndicatorType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewIndicatorOpen, setIsNewIndicatorOpen] = useState(false);
  const [isNewEvaluationOpen, setIsNewEvaluationOpen] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);

  // Mock data for dashboard KPIs
  const dashboardMetrics = {
    kpi: { value: 87, target: 85, trend: '+5%', status: 'good' },
    kri: { value: 12, target: 15, trend: '-3%', status: 'good' },
    kci: { value: 94, target: 90, trend: '+2%', status: 'excellent' },
    kqi: { value: 89, target: 85, trend: '+7%', status: 'good' },
    kvi: { value: 76, target: 80, trend: '-2%', status: 'warning' },
    ksi: { value: 91, target: 85, trend: '+8%', status: 'excellent' }
  };

  // Performance trends data
  const performanceTrends = [
    { month: 'يناير', kpi: 82, kri: 15, kci: 88, kqi: 85, kvi: 78, ksi: 87 },
    { month: 'فبراير', kpi: 85, kri: 13, kci: 90, kqi: 87, kvi: 75, ksi: 89 },
    { month: 'مارس', kpi: 87, kri: 12, kci: 94, kqi: 89, kvi: 76, ksi: 91 },
    { month: 'أبريل', kpi: 89, kri: 10, kci: 96, kqi: 91, kvi: 79, ksi: 93 },
    { month: 'مايو', kpi: 87, kri: 12, kci: 94, kqi: 89, kvi: 76, ksi: 91 }
  ];

  // Department performance data
  const departmentPerformance = [
    { department: 'تقنية المعلومات', score: 92, employees: 25, trend: '+5%' },
    { department: 'المبيعات', score: 88, employees: 18, trend: '+3%' },
    { department: 'الموارد البشرية', score: 85, employees: 12, trend: '+2%' },
    { department: 'المالية', score: 90, employees: 15, trend: '+4%' },
    { department: 'التسويق', score: 87, employees: 20, trend: '+6%' }
  ];

  // Mock indicators data
  const indicatorTypes = [
    {
      type: 'KPI',
      name: 'مؤشرات الأداء الرئيسية',
      description: 'قياس الإنجاز والإنتاجية والمبيعات',
      icon: Target,
      color: '#3CB593',
      count: 12,
      indicators: [
        { id: 1, name: 'معدل الإنجاز الشهري', target: 85, current: 87, unit: '%', source: 'manual' },
        { id: 2, name: 'إنتاجية المبيعات', target: 100000, current: 125000, unit: 'ريال', source: 'sales_system' },
        { id: 3, name: 'معدل رضا العملاء', target: 90, current: 92, unit: '%', source: 'crm_system' }
      ]
    },
    {
      type: 'KRI',
      name: 'مؤشرات المخاطر الرئيسية',
      description: 'رصد معدل الأخطاء وتأخير المشاريع',
      icon: AlertTriangle,
      color: '#ef4444',
      count: 8,
      indicators: [
        { id: 4, name: 'معدل الأخطاء', target: 5, current: 3, unit: '%', source: 'quality_system' },
        { id: 5, name: 'تأخير المشاريع', target: 10, current: 7, unit: '%', source: 'project_system' },
        { id: 6, name: 'مخاطر الامتثال', target: 2, current: 1, unit: 'حالة', source: 'compliance_system' }
      ]
    },
    {
      type: 'KCI',
      name: 'مؤشرات الالتزام الرئيسية',
      description: 'نسبة الالتزام بالسياسات والضوابط',
      icon: CheckCircle,
      color: '#3b82f6',
      count: 6,
      indicators: [
        { id: 7, name: 'الالتزام بالحضور', target: 95, current: 97, unit: '%', source: 'attendance_system' },
        { id: 8, name: 'الالتزام بالسياسات', target: 90, current: 94, unit: '%', source: 'hr_system' },
        { id: 9, name: 'التدريب الإلزامي', target: 100, current: 96, unit: '%', source: 'training_system' }
      ]
    },
    {
      type: 'KQI',
      name: 'مؤشرات الجودة الرئيسية',
      description: 'جودة المنتج والخدمة ونسبة المرتجعات',
      icon: Star,
      color: '#f59e0b',
      count: 10,
      indicators: [
        { id: 10, name: 'جودة المنتج', target: 95, current: 89, unit: '%', source: 'quality_system' },
        { id: 11, name: 'نسبة المرتجعات', target: 2, current: 1.5, unit: '%', source: 'sales_system' },
        { id: 12, name: 'وقت الاستجابة', target: 24, current: 18, unit: 'ساعة', source: 'support_system' }
      ]
    },
    {
      type: 'KVI',
      name: 'مؤشرات القيمة الرئيسية',
      description: 'القيمة المضافة ومعدل العائد على الاستثمار',
      icon: TrendingUp,
      color: '#8b5cf6',
      count: 5,
      indicators: [
        { id: 13, name: 'العائد على الاستثمار', target: 15, current: 12, unit: '%', source: 'finance_system' },
        { id: 14, name: 'القيمة المضافة', target: 500000, current: 480000, unit: 'ريال', source: 'finance_system' },
        { id: 15, name: 'هامش الربح', target: 25, current: 23, unit: '%', source: 'finance_system' }
      ]
    },
    {
      type: 'KSI',
      name: 'مؤشرات النجاح الرئيسية',
      description: 'عوامل النجاح الحرجة وحصة السوق',
      icon: Award,
      color: '#ec4899',
      count: 7,
      indicators: [
        { id: 16, name: 'حصة السوق', target: 20, current: 22, unit: '%', source: 'market_research' },
        { id: 17, name: 'سمعة العلامة التجارية', target: 85, current: 91, unit: '%', source: 'brand_monitoring' },
        { id: 18, name: 'معدل الاحتفاظ بالعملاء', target: 90, current: 88, unit: '%', source: 'crm_system' }
      ]
    }
  ];

  // Mock evaluations data
  const evaluations = [
    {
      id: 'EVAL-2024-001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      period: 'Q1 2024',
      overallScore: 87,
      status: 'completed',
      evaluatorName: 'سارة أحمد المدير',
      dueDate: '2024-04-15',
      submittedDate: '2024-04-10'
    },
    {
      id: 'EVAL-2024-002',
      employeeName: 'فاطمة سعد الغامدي',
      department: 'المبيعات',
      period: 'Q1 2024',
      overallScore: 92,
      status: 'pending_approval',
      evaluatorName: 'محمد علي المدير',
      dueDate: '2024-04-15',
      submittedDate: '2024-04-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEvaluationStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEvaluationStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'pending_approval': return 'في انتظار الموافقة';
      case 'in_progress': return 'قيد التنفيذ';
      case 'overdue': return 'متأخر';
      default: return status;
    }
  };

  const COLORS = ['#3CB593', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  const renderIndicatorTypeModal = (indicatorType: any) => {
    return (
      <Dialog open={selectedIndicatorType === indicatorType.type} onOpenChange={() => setSelectedIndicatorType(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <indicatorType.icon className="h-6 w-6" style={{ color: indicatorType.color }} />
              {indicatorType.name} ({indicatorType.type})
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Actions Bar */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={`البحث في مؤشرات ${indicatorType.type}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-2" />
                  فلترة
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 ml-2" />
                  استيراد Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
                <Button 
                  onClick={() => setIsNewIndicatorOpen(true)}
                  style={{ backgroundColor: indicatorType.color }}
                  className="text-white hover:opacity-90"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  مؤشر جديد
                </Button>
              </div>
            </div>

            {/* Indicators Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم المؤشر</TableHead>
                    <TableHead className="text-right">الهدف</TableHead>
                    <TableHead className="text-right">القيمة الحالية</TableHead>
                    <TableHead className="text-right">نسبة الإنجاز</TableHead>
                    <TableHead className="text-right">مصدر البيانات</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicatorType.indicators.map((indicator: any) => {
                    const achievement = indicatorType.type === 'KRI' 
                      ? ((indicator.target - indicator.current) / indicator.target) * 100
                      : (indicator.current / indicator.target) * 100;
                    const status = achievement >= 100 ? 'excellent' : achievement >= 80 ? 'good' : achievement >= 60 ? 'warning' : 'danger';
                    
                    return (
                      <TableRow key={indicator.id}>
                        <TableCell className="font-medium">{indicator.name}</TableCell>
                        <TableCell>{indicator.target} {indicator.unit}</TableCell>
                        <TableCell>{indicator.current} {indicator.unit}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.min(achievement, 100)} className="w-20" />
                            <span className="text-sm font-medium">{achievement.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {indicator.source === 'manual' ? 'يدوي' : 'تلقائي'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(status)}>
                            {status === 'excellent' ? 'ممتاز' : status === 'good' ? 'جيد' : status === 'warning' ? 'تحذير' : 'ضعيف'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle>حالة التكامل مع الأنظمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">نظام الحضور والانصراف</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">متصل</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">نظام الرواتب</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">متصل</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium">نظام CRM</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">قيد الإعداد</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90" dir="rtl">
      {/* خلفية احترافية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#3CB593]/8 to-[#3CB593]/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#3CB593]/10 to-[#3CB593]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-[#3CB593]/3 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <Target className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  نظام تقييم الأداء الشامل
                </h1>
                <p className="text-gray-600 text-lg">
                  مؤشرات الأداء الذكية والتقييم المتطور بالذكاء الاصطناعي
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
              <Activity className="h-4 w-4 ml-2" />
              نظام متطور
            </Badge>
            <Button
              onClick={() => setIsAIAnalysisOpen(true)}
              className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Brain className="h-4 w-4 ml-2" />
              التحليل الذكي
            </Button>
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200/50 shadow-lg p-4 mb-6">
            <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 h-auto gap-2">
              <TabsTrigger 
                value="dashboard" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#3CB593] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#3CB593]/10 hover:text-[#3CB593] border border-gray-200 data-[state=active]:border-[#3CB593] hover:scale-105 hover:shadow-md"
              >
                <BarChart3 className="h-5 w-5" />
                <span>لوحة القيادة</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="indicators" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#3CB593] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#3CB593]/10 hover:text-[#3CB593] border border-gray-200 data-[state=active]:border-[#3CB593] hover:scale-105 hover:shadow-md"
              >
                <Gauge className="h-5 w-5" />
                <span>مركز المؤشرات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="evaluations" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#3CB593] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#3CB593]/10 hover:text-[#3CB593] border border-gray-200 data-[state=active]:border-[#3CB593] hover:scale-105 hover:shadow-md"
              >
                <Users className="h-5 w-5" />
                <span>إدارة التقييمات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reports" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#3CB593] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#3CB593]/10 hover:text-[#3CB593] border border-gray-200 data-[state=active]:border-[#3CB593] hover:scale-105 hover:shadow-md"
              >
                <FileText className="h-5 w-5" />
                <span>التقارير والتحليلات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#3CB593] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#3CB593]/10 hover:text-[#3CB593] border border-gray-200 data-[state=active]:border-[#3CB593] hover:scale-105 hover:shadow-md"
              >
                <Settings className="h-5 w-5" />
                <span>الإعدادات</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {Object.entries(dashboardMetrics).map(([key, metric], index) => {
                  const indicatorType = indicatorTypes.find(t => t.type.toLowerCase() === key);
                  const IconComponent = indicatorType?.icon || Target;
                  
                  return (
                    <Card key={key} className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                             style={{ backgroundColor: `${COLORS[index]}20` }}>
                          <IconComponent className="h-6 w-6" style={{ color: COLORS[index] }} />
                        </div>
                        <div className="text-2xl font-bold text-black">{metric.value}</div>
                        <p className="text-sm text-gray-600 mb-2">{indicatorType?.name}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Badge className={getStatusColor(metric.status)}>
                            {metric.trend}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Trends */}
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-[#3CB593]" />
                      اتجاهات الأداء الشهرية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="kpi" stackId="1" stroke="#3CB593" fill="#3CB593" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="kci" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="kqi" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Department Performance */}
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-[#3CB593]" />
                      أداء الأقسام
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentPerformance.map((dept, index) => (
                        <div key={dept.department} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <div>
                              <div className="font-medium text-black">{dept.department}</div>
                              <div className="text-sm text-gray-600">{dept.employees} موظف</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={dept.score} className="w-20" />
                            <div className="text-right">
                              <div className="font-bold text-black">{dept.score}%</div>
                              <div className="text-xs text-green-600">{dept.trend}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              <Card className="bg-gradient-to-r from-[#3CB593]/5 to-[#2da574]/5 border-[#3CB593]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#3CB593]" />
                    رؤى الذكاء الاصطناعي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/50 rounded-lg border border-[#3CB593]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">تحذير</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        انخفاض في KVI بنسبة 2% - يُنصح بمراجعة استراتيجية القيمة المضافة
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/50 rounded-lg border border-[#3CB593]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium">فرصة</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        تحسن ملحوظ في KCI - يمكن تطبيق نفس الاستراتيجية على أقسام أخرى
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/50 rounded-lg border border-[#3CB593]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">توصية</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        5 موظفين مؤهلين للترقية بناءً على نتائج KPI الممتازة
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Indicators Center Tab */}
          <TabsContent value="indicators">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">مركز المؤشرات</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 ml-2" />
                    تحديث البيانات
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="h-4 w-4 ml-2" />
                    قالب Excel
                  </Button>
                </div>
              </div>

              {/* Indicator Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {indicatorTypes.map((indicatorType, index) => {
                  const IconComponent = indicatorType.icon;
                  
                  return (
                    <Card 
                      key={indicatorType.type} 
                      className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedIndicatorType(indicatorType.type)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                               style={{ backgroundColor: `${indicatorType.color}20` }}>
                            <IconComponent className="h-6 w-6" style={{ color: indicatorType.color }} />
                          </div>
                          <Badge className="bg-gray-100 text-gray-800">
                            {indicatorType.count} مؤشر
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-black mb-2">
                          {indicatorType.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {indicatorType.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge style={{ backgroundColor: `${indicatorType.color}20`, color: indicatorType.color }}>
                            {indicatorType.type}
                          </Badge>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#3CB593] transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Integration Overview */}
              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-[#3CB593]" />
                    نظرة عامة على التكامل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-800">8</div>
                      <div className="text-sm text-green-600">أنظمة متصلة</div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-800">48</div>
                      <div className="text-sm text-blue-600">مؤشر نشط</div>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-800">15</div>
                      <div className="text-sm text-yellow-600">دقيقة (آخر تحديث)</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">95%</div>
                      <div className="text-sm text-purple-600">دقة البيانات</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">إدارة التقييمات</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 ml-2" />
                    جدولة دورة تقييم
                  </Button>
                  <Button 
                    onClick={() => setIsNewEvaluationOpen(true)}
                    className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    تقييم جديد
                  </Button>
                </div>
              </div>

              {/* Evaluation Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-[#3CB593] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-black">156</div>
                    <div className="text-sm text-gray-600">إجمالي التقييمات</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-black">142</div>
                    <div className="text-sm text-gray-600">مكتملة</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-black">12</div>
                    <div className="text-sm text-gray-600">في انتظار الموافقة</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-black">2</div>
                    <div className="text-sm text-gray-600">متأخرة</div>
                  </CardContent>
                </Card>
              </div>

              {/* Evaluations Table */}
              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>سجل التقييمات</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="البحث في التقييمات..."
                          className="pr-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 ml-2" />
                        فلترة
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">رقم التقييم</TableHead>
                        <TableHead className="text-right">الموظف</TableHead>
                        <TableHead className="text-right">القسم</TableHead>
                        <TableHead className="text-right">الفترة</TableHead>
                        <TableHead className="text-right">النتيجة الإجمالية</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">المقيم</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {evaluations.map((evaluation) => (
                        <TableRow key={evaluation.id}>
                          <TableCell className="font-medium">{evaluation.id}</TableCell>
                          <TableCell>{evaluation.employeeName}</TableCell>
                          <TableCell>{evaluation.department}</TableCell>
                          <TableCell>{evaluation.period}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={evaluation.overallScore} className="w-16" />
                              <span className="font-medium">{evaluation.overallScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getEvaluationStatusBadge(evaluation.status)}>
                              {getEvaluationStatusText(evaluation.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{evaluation.evaluatorName}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-[#3CB593] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تقارير فردية</h3>
                  <p className="text-gray-600 text-sm mb-4">تقارير أداء مفصلة لكل موظف</p>
                  <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white">
                    إنشاء التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تقارير جماعية</h3>
                  <p className="text-gray-600 text-sm mb-4">تقارير الأقسام والإدارات</p>
                  <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white">
                    عرض التقارير
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تقارير مقارنة</h3>
                  <p className="text-gray-600 text-sm mb-4">مقارنة بين الفروع والأقسام</p>
                  <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white">
                    مقارنة الأداء
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <CardTitle>إعدادات التقييم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>دورة التقييم</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر دورة التقييم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quarterly">ربع سنوي</SelectItem>
                        <SelectItem value="semi_annual">نصف سنوي</SelectItem>
                        <SelectItem value="annual">سنوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>نظام التقييم</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نظام التقييم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">نسبة مئوية (0-100)</SelectItem>
                        <SelectItem value="grade">درجات (A-F)</SelectItem>
                        <SelectItem value="points">نقاط (1-10)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <CardTitle>سير الموافقات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>الموظف</span>
                      <Badge className="bg-blue-100 text-blue-800">المرحلة 1</Badge>
                    </div>
                    <div className="flex items-center justify-center">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>المدير المباشر</span>
                      <Badge className="bg-blue-100 text-blue-800">المرحلة 2</Badge>
                    </div>
                    <div className="flex items-center justify-center">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>الموارد البشرية</span>
                      <Badge className="bg-blue-100 text-blue-800">المرحلة 3</Badge>
                    </div>
                    <div className="flex items-center justify-center">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>الإدارة العليا</span>
                      <Badge className="bg-green-100 text-green-800">الموافقة النهائية</Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white">
                    تحديث سير العمل
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Render Indicator Type Modals */}
        {indicatorTypes.map(indicatorType => renderIndicatorTypeModal(indicatorType))}

        {/* AI Analysis Dialog */}
        <Dialog open={isAIAnalysisOpen} onOpenChange={setIsAIAnalysisOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#3CB593]" />
                التحليل الذكي للأداء
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-l-4 border-l-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-red-700">موظفين منخفضي الأداء</span>
                  </div>
                  <div className="text-2xl font-bold text-red-800 mb-1">3</div>
                  <p className="text-sm text-red-600">يحتاجون لبرامج تطوير عاجلة</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-yellow-500">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium text-yellow-700">برامج تدريبية مقترحة</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800 mb-1">12</div>
                  <p className="text-sm text-yellow-600">برنامج مخصص حسب نتائج التقييم</p>
                </Card>

                <Card className="p-4 border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-700">توقعات مستقبلية</span>
                  </div>
                  <div className="text-2xl font-bold text-green-800 mb-1">+7%</div>
                  <p className="text-sm text-green-600">تحسن متوقع في الأداء العام</p>
                </Card>
              </div>

              <div className="p-4 bg-[#3CB593]/5 rounded-lg border border-[#3CB593]/20">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-[#3CB593]" />
                  <span className="font-medium text-[#3CB593]">توصيات الذكاء الاصطناعي</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• ركز على تحسين مؤشرات KVI من خلال برامج الابتكار</li>
                  <li>• قم بمكافأة الموظفين المتميزين في KCI لتعزيز الالتزام</li>
                  <li>• اعتمد برامج تدريبية في إدارة الجودة لتحسين KQI</li>
                  <li>• راقب عن كثب مؤشرات KRI لتجنب المخاطر المستقبلية</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Indicator Dialog */}
        <Dialog open={isNewIndicatorOpen} onOpenChange={setIsNewIndicatorOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مؤشر جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>اسم المؤشر</Label>
                <Input placeholder="أدخل اسم المؤشر" />
              </div>
              <div>
                <Label>نوع المؤشر</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المؤشر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KPI">KPI - مؤشرات الأداء الرئيسية</SelectItem>
                    <SelectItem value="KRI">KRI - مؤشرات المخاطر الرئيسية</SelectItem>
                    <SelectItem value="KCI">KCI - مؤشرات الالتزام الرئيسية</SelectItem>
                    <SelectItem value="KQI">KQI - مؤشرات الجودة الرئيسية</SelectItem>
                    <SelectItem value="KVI">KVI - مؤشرات القيمة الرئيسية</SelectItem>
                    <SelectItem value="KSI">KSI - مؤشرات النجاح الرئيسية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>القيمة المستهدفة</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <Label>وحدة القياس</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الوحدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="%">نسبة مئوية (%)</SelectItem>
                    <SelectItem value="ريال">ريال سعودي</SelectItem>
                    <SelectItem value="عدد">عدد</SelectItem>
                    <SelectItem value="ساعة">ساعة</SelectItem>
                    <SelectItem value="يوم">يوم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>مصدر البيانات</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مصدر البيانات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">إدخال يدوي</SelectItem>
                    <SelectItem value="attendance_system">نظام الحضور والانصراف</SelectItem>
                    <SelectItem value="payroll_system">نظام الرواتب</SelectItem>
                    <SelectItem value="training_system">نظام التدريب</SelectItem>
                    <SelectItem value="crm_system">نظام إدارة العملاء</SelectItem>
                    <SelectItem value="sales_system">نظام المبيعات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>الوصف</Label>
                <Textarea placeholder="وصف المؤشر وطريقة قياسه..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t mt-6">
              <Button variant="outline" onClick={() => setIsNewIndicatorOpen(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={() => setIsNewIndicatorOpen(false)}
                className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ المؤشر
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ComprehensivePerformanceEvaluation;