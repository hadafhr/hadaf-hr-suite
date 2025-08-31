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
  Clock, 
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
  MapPin,
  Timer,
  Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface ComprehensiveAttendanceProps {
  onBack: () => void;
}

const ComprehensiveAttendance = ({ onBack }: ComprehensiveAttendanceProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Analytics data
  const attendanceData = [
    { month: 'يناير', present: 85, late: 12, absent: 3 },
    { month: 'فبراير', present: 87, late: 10, absent: 2 },
    { month: 'مارس', present: 89, late: 8, absent: 1 },
    { month: 'أبريل', present: 88, late: 15, absent: 4 },
    { month: 'مايو', present: 91, late: 7, absent: 2 },
    { month: 'يونيو', present: 93, late: 5, absent: 1 }
  ];

  const departmentAttendance = [
    { name: 'تقنية المعلومات', value: 95, color: '#3b82f6' },
    { name: 'الموارد البشرية', value: 92, color: '#10b981' },
    { name: 'المالية', value: 88, color: '#f59e0b' },
    { name: 'التسويق', value: 90, color: '#8b5cf6' },
    { name: 'العمليات', value: 85, color: '#ef4444' }
  ];

  // Calculate statistics
  const stats = {
    totalEmployees: 127,
    presentToday: 118,
    lateArrivals: 8,
    avgAttendance: 92,
    remoteWorkers: 12,
    avgWorkHours: 8.2
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير الحضور والانصراف كملف PDF",
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
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  الحضور والانصراف
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة حضور الموظفين مع أدوات التتبع المتقدمة والتقارير التفصيلية
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
              إضافة نوبة
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
                <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حاضر اليوم</p>
                <p className="text-2xl font-bold text-green-600">{stats.presentToday}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متأخرين</p>
                <p className="text-2xl font-bold text-orange-600">{stats.lateArrivals}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgAttendance}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عمل عن بُعد</p>
                <p className="text-2xl font-bold text-purple-600">{stats.remoteWorkers}</p>
              </div>
              <Globe className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط ساعات العمل</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.avgWorkHours}</p>
              </div>
              <Timer className="h-8 w-8 text-indigo-500/60" />
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
              إحصائيات الحضور الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="present" stackId="1" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="late" stackId="2" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="absent" stackId="3" stroke="#ef4444" fill="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              معدل الحضور حسب القسم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={departmentAttendance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentAttendance.map((entry, index) => (
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
            رؤى الذكاء الاصطناعي للحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">حضور ممتاز</span>
              </div>
              <p className="text-sm text-emerald-700">
                تحسن ملحوظ في معدلات الحضور العامة بنسبة 12% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تنبيه تأخير</span>
              </div>
              <p className="text-sm text-orange-700">
                ملاحظة زيادة في حالات التأخير الصباحي في قسم المبيعات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                التوقعات تشير لتحقيق هدف 95% حضور منتظم نهاية الشهر
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
              <Clock className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">تسجيل حضور</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">إدارة النوبات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <MapPin className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">تتبع الموقع</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs text-center">تقرير يومي</span>
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
              <TabsTrigger value="attendance">سجل الحضور</TabsTrigger>
              <TabsTrigger value="shifts">إدارة النوبات</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>سجل الحضور والانصراف</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">سجل الحضور</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shifts">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة النوبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">إدارة النوبات</h3>
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

export default ComprehensiveAttendance;