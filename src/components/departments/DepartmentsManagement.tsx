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
  Building, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
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

interface DepartmentsManagementProps {
  onBack: () => void;
}

export const DepartmentsManagement: React.FC<DepartmentsManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data
  const departments = [
    {
      id: '1',
      name: 'تقنية المعلومات',
      employeeCount: 15,
      performance: 92,
      budget: 500000
    },
    {
      id: '2', 
      name: 'الموارد البشرية',
      employeeCount: 8,
      performance: 95,
      budget: 200000
    }
  ];

  const stats = {
    totalDepartments: 16,
    activeDepartments: 14,
    totalPositions: 38,
    openPositions: 12,
    avgPerformance: 89,
    totalBudget: 2500000
  };

  const performanceData = [
    { month: 'يناير', departments: 12, positions: 25, performance: 85 },
    { month: 'فبراير', departments: 13, positions: 28, performance: 87 },
    { month: 'مارس', departments: 14, positions: 32, performance: 89 },
    { month: 'أبريل', departments: 14, positions: 30, performance: 88 },
    { month: 'مايو', departments: 15, positions: 35, performance: 91 },
    { month: 'يونيو', departments: 16, positions: 38, performance: 93 }
  ];

  const departmentTypeDistribution = [
    { name: 'تقني', value: 35, color: '#3b82f6' },
    { name: 'إداري', value: 25, color: '#10b981' },
    { name: 'عمليات', value: 20, color: '#f59e0b' },
    { name: 'دعم', value: 15, color: '#8b5cf6' },
    { name: 'استراتيجي', value: 5, color: '#ef4444' }
  ];

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
            <Building className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">
              نظام إدارة الأقسام المتطور
            </h1>
            <p className="text-gray-600 text-lg">
              إدارة شاملة للهيكل التنظيمي والأقسام بتقنيات ذكية متطورة
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
          <Building className="h-4 w-4 ml-2" />
          نظام متقدم
        </Badge>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Download className="h-4 w-4 ml-2" />
          تصدير التقارير
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 ml-2" />
          قسم جديد
        </Button>
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
                <p className="text-sm text-muted-foreground">إجمالي الأقسام</p>
                <p className="text-2xl font-bold text-primary">{stats.totalDepartments}</p>
              </div>
              <Building className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">أقسام نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeDepartments}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المناصب الإجمالية</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.totalPositions}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مناصب شاغرة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openPositions}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الأداء (%)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgPerformance}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الميزانية</p>
                <p className="text-2xl font-bold text-green-600">{(stats.totalBudget / 1000000).toFixed(1)}م</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500/60" />
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
              أداء النظام الإداري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="departments" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="positions" stackId="2" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="performance" stackId="3" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع أنواع الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentTypeDistribution.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي الإدارية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">هيكل متوازن</span>
              </div>
              <p className="text-sm text-emerald-700">
                الهيكل التنظيمي متوازن ويحقق كفاءة عالية في توزيع الأدوار
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">احتياج إعادة هيكلة</span>
              </div>
              <p className="text-sm text-orange-700">
                قسم العمليات يحتاج لإعادة هيكلة بسبب زيادة الأعباء
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">نمو متوقع</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لحاجة 3 أقسام جديدة خلال العام القادم
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderProfessionalHeader()}
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-border">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="departments">الأقسام</TabsTrigger>
              <TabsTrigger value="positions">المناصب</TabsTrigger>
              <TabsTrigger value="structure">الهيكل التنظيمي</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="departments">
            <h2 className="text-2xl font-bold">إدارة الأقسام</h2>
            <Card>
              <CardContent className="p-6">
                <p>قائمة الأقسام والوحدات التنظيمية</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions">
            <h2 className="text-2xl font-bold">إدارة المناصب</h2>
            <Card>
              <CardContent className="p-6">
                <p>المناصب الوظيفية المتاحة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure">
            <h2 className="text-2xl font-bold">الهيكل التنظيمي</h2>
            <Card>
              <CardContent className="p-6">
                <p>المخطط التنظيمي للشركة</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <h2 className="text-2xl font-bold">التقارير</h2>
            <Card>
              <CardContent className="p-6">
                <p>تقارير الأقسام والأداء</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <h2 className="text-2xl font-bold">الإعدادات</h2>
            <Card>
              <CardContent className="p-6">
                <p>إعدادات النظام</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DepartmentsManagement;