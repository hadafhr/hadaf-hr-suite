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
                <Gavel className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  الجزاءات والعقوبات
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة المخالفات والجزاءات التأديبية وفقاً لنظام العمل السعودي
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
              مخالفة جديدة
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
                <p className="text-sm text-muted-foreground">إجمالي المخالفات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalViolations}</p>
              </div>
              <Scale className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إنذارات نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeWarnings}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حالات محلولة</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolvedCases}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط وقت الحل (أيام)</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgResolutionTime}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">موظفين عرضة للخطر</p>
                <p className="text-2xl font-bold text-red-600">{stats.employeesAtRisk}</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حالات حرجة</p>
                <p className="text-2xl font-bold text-purple-600">{stats.criticalCases}</p>
              </div>
              <XCircle className="h-8 w-8 text-purple-500/60" />
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
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
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للجزاءات والعقوبات
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
                انخفاض في معدل المخالفات العامة بنسبة 18% مقارنة بالشهر الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه نمط مخالفات</span>
              </div>
              <p className="text-sm text-orange-700">
                ارتفاع في مخالفات التأخير في قسم الإنتاج، يتطلب تدخل إداري
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لانخفاض إضافي في المخالفات بنسبة 15% الشهر القادم
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
              <Gavel className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">مخالفة جديدة</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إنذار رسمي</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">سجل المخالفات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">استئناف</span>
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
              <TabsTrigger value="violations">سجل المخالفات</TabsTrigger>
              <TabsTrigger value="appeals">الاستئنافات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="violations">
              <Card>
                <CardHeader>
                  <CardTitle>سجل المخالفات والعقوبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Gavel className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">سجل المخالفات</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appeals">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الاستئنافات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">إدارة الاستئنافات</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>التقارير والإحصائيات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">التقارير والإحصائيات</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDisciplinarySystem;