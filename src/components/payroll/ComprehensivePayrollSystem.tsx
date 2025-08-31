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
import { RewardsManager } from '@/components/compensation/RewardsManager';
import { PayrollCyclesManager } from '@/components/payroll/PayrollCyclesManager';
import { FinancialReportsManager } from '@/components/payroll/FinancialReportsManager';
import { 
  ArrowLeft, 
  DollarSign, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator,
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
  Timer,
  Users,
  TrendingDown,
  MapPin
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensivePayrollSystemProps {
  onBack?: () => void;
}

export const ComprehensivePayrollSystem = ({ onBack }: ComprehensivePayrollSystemProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Analytics data
  const payrollData = [
    { month: 'يناير', salaries: 450000, bonuses: 35000, allowances: 28000 },
    { month: 'فبراير', salaries: 485000, bonuses: 42000, allowances: 32000 },
    { month: 'مارس', salaries: 465000, bonuses: 38000, allowances: 30000 },
    { month: 'أبريل', salaries: 520000, bonuses: 45000, allowances: 35000 },
    { month: 'مايو', salaries: 495000, bonuses: 40000, allowances: 33000 },
    { month: 'يونيو', salaries: 535000, bonuses: 48000, allowances: 37000 }
  ];

  const payrollByCategory = [
    { name: 'الراتب الأساسي', value: 65, color: '#3b82f6' },
    { name: 'البدلات', value: 20, color: '#10b981' },
    { name: 'المكافآت', value: 10, color: '#f59e0b' },
    { name: 'الخصومات', value: 5, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalPayroll: 2450000,
    monthlyAverage: 408333,
    pendingPayments: 18,
    completedPayrolls: 156,
    budgetUtilization: 76.5,
    employeesCount: 248
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير الرواتب والأجور كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
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
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  الرواتب والأجور
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة الرواتب والتعويضات والمزايا مع حسابات تلقائية متطورة
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
              دورة رواتب جديدة
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
                <p className="text-sm text-muted-foreground">إجمالي الرواتب (ر.س)</p>
                <p className="text-2xl font-bold text-primary">{stats.totalPayroll.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المتوسط الشهري (ر.س)</p>
                <p className="text-2xl font-bold text-blue-600">{stats.monthlyAverage.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مدفوعات معلقة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingPayments}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">دورات مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedPayrolls}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">استخدام الميزانية (%)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.budgetUtilization}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.employeesCount}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500/60" />
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
              تطور الرواتب الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="salaries" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="bonuses" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="allowances" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع مكونات الراتب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={payrollByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {payrollByCategory.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للرواتب والأجور
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">أداء مالي ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                الميزانية المخصصة للرواتب تدار بكفاءة عالية مع توفير 8.5% من التكاليف المتوقعة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه علاوات</span>
              </div>
              <p className="text-sm text-orange-700">
                اقتراب موعد العلاوات السنوية، يُنصح بمراجعة الميزانية للربع القادم
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">نمو متوازن</span>
              </div>
              <p className="text-sm text-blue-700">
                نمو الرواتب يتماشى مع خطة النمو المؤسسية بمعدل 12% سنوياً
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Calculator className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">حساب الرواتب</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Award className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">المكافآت</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">العلاوات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <CreditCard className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">طريقة الدفع</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إعدادات النظام</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">التنبيهات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="payroll">دورات الرواتب</TabsTrigger>
              <TabsTrigger value="bonuses">المكافآت والعلاوات</TabsTrigger>
              <TabsTrigger value="reports">التقارير المالية</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="payroll">
              <PayrollCyclesManager />
            </TabsContent>

            <TabsContent value="bonuses">
              <RewardsManager />
            </TabsContent>

            <TabsContent value="reports">
              <FinancialReportsManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};