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
    { name: 'تقنية المعلومات', value: 95, color: 'hsl(var(--primary))' },
    { name: 'الموارد البشرية', value: 92, color: 'hsl(var(--primary-glow))' },
    { name: 'المالية', value: 88, color: 'hsl(var(--warning))' },
    { name: 'التسويق', value: 90, color: 'hsl(var(--success))' },
    { name: 'العمليات', value: 85, color: 'hsl(var(--muted-foreground))' }
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
        <Card className="dashboard-card border-l-4 border-l-primary">
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

        <Card className="dashboard-card border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">حاضر اليوم</p>
                <p className="text-2xl font-bold text-success">{stats.presentToday}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متأخرين</p>
                <p className="text-2xl font-bold text-warning">{stats.lateArrivals}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-primary">{stats.avgAttendance}%</p>
              </div>
              <Target className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عمل عن بُعد</p>
                <p className="text-2xl font-bold text-primary">{stats.remoteWorkers}</p>
              </div>
              <Globe className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط ساعات العمل</p>
                <p className="text-2xl font-bold text-primary">{stats.avgWorkHours}</p>
              </div>
              <Timer className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5 text-primary" />
              إحصائيات الحضور الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="present" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" />
                <Area type="monotone" dataKey="late" stackId="2" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" />
                <Area type="monotone" dataKey="absent" stackId="3" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
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
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {departmentAttendance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="dashboard-card border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">حضور ممتاز</span>
              </div>
              <p className="text-sm text-muted-foreground">
                تحسن ملحوظ في معدلات الحضور العامة بنسبة 12% هذا الشهر
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">تنبيه تأخير</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ملاحظة زيادة في حالات التأخير الصباحي في قسم المبيعات
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-muted-foreground">
                التوقعات تشير لتحقيق هدف 95% حضور منتظم نهاية الشهر
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-primary" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تسجيل حضور</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Calendar className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">إدارة النوبات</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <MapPin className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تتبع الموقع</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <FileText className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">تقرير يومي</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Settings className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">إعدادات النظام</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2 border-primary/20 hover:bg-primary/10 hover:border-primary">
              <Bell className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs text-center">التنبيهات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {renderHeader()}
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-xl border border-border shadow-soft p-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted rounded-lg p-2">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">لوحة التحكم</TabsTrigger>
                <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-white">سجل الحضور</TabsTrigger>
                <TabsTrigger value="shifts" className="data-[state=active]:bg-primary data-[state=active]:text-white">إدارة النوبات</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-white">التقارير</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard">
              {renderAnalyticsDashboard()}
            </TabsContent>

            <TabsContent value="attendance">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    سجل الحضور والانصراف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">سجل الحضور</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shifts">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    إدارة النوبات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">إدارة النوبات</h3>
                    <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    التقارير والإحصائيات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">التقارير والإحصائيات</h3>
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