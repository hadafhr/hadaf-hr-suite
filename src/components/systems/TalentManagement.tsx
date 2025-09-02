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
  ArrowLeft, Crown, Users, TrendingUp, Download, Plus, Search, Filter, Calendar, Building, Award, Target,
  BarChart3, PieChart, Activity, Zap, Eye, Settings, Bell, UserCheck, Sparkles, Archive, Edit, Trash2,
  Share, Lock, Unlock, AlertCircle, Info, UserPlus, Phone, Mail, Users2, Database, RefreshCw,
  Server, FileText, BookOpen, GraduationCap, Star, CheckCircle2, AlertTriangle, Clock, Upload, Camera,
  User, Briefcase, MapPin, Calendar as CalendarIcon, MessageSquare, ThumbsUp, Percent, TrendingDown,
  Code, Heart, Lightbulb, Shield, Zap as ZapIcon, Cpu, Palette, Globe, LineChart, BarChart, Route,
  GitBranch, Layers, Network, Compass, Map, ArrowUp, ArrowRight, ChevronRight, Trophy, Medal,
  Crosshair, Focus, Radar, Telescope, Binoculars, Gem, Diamond, Rocket, PlayCircle, Save
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, ScatterChart, Scatter } from 'recharts';

interface TalentManagementProps {
  onBack: () => void;
}

export const TalentManagement: React.FC<TalentManagementProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير إدارة المواهب كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "تم الإرسال للطباعة",
      description: "تم إرسال التقرير للطباعة بنجاح",
    });
  };

  const handleSave = () => {
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ البيانات بنجاح",
    });
  };

  const handleUpload = () => {
    toast({
      title: "تم الرفع بنجاح",
      description: "تم رفع الملفات بنجاح",
    });
  };

  const handleDownload = () => {
    toast({
      title: "تم التحميل بنجاح",
      description: "تم تحميل الملفات بنجاح",
    });
  };

  // Mock data
  const dashboardKPIs = [
    { title: "الموظفون عالو الإمكانات", value: "42", change: "+8%", icon: Crown, color: "text-primary" },
    { title: "قوة خطة الخلافة", value: "78%", change: "+12%", icon: TrendingUp, color: "text-success" },
    { title: "تغطية الأدوار الحرجة", value: "85%", change: "+5%", icon: Shield, color: "text-warning" },
    { title: "برامج التطوير النشطة", value: "24", change: "+3", icon: Rocket, color: "text-info" },
  ];

  const highPotentialEmployees = [
    { id: 1, name: "أحمد محمد", position: "مطور برمجيات أول", department: "تكنولوجيا المعلومات", potential: "عالي", performance: "ممتاز", readiness: "جاهز الآن", avatar: "/lovable-uploads/34b81724-88d2-404d-8192-f65dc4643195.png" },
    { id: 2, name: "فاطمة أحمد", position: "محللة أعمال", department: "العمليات", potential: "عالي", performance: "جيد جداً", readiness: "1-2 سنة", avatar: "/lovable-uploads/3bb8cda9-761e-4268-8f44-76b21cecb2a4.png" },
    { id: 3, name: "محمد سالم", position: "مدير مشروع", department: "التسويق", potential: "متوسط عالي", performance: "ممتاز", readiness: "جاهز الآن", avatar: "/lovable-uploads/4b2910fb-b74e-4c5d-b399-8b1109f26b7b.png" },
    { id: 4, name: "نورا عبدالله", position: "أخصائية موارد بشرية", department: "الموارد البشرية", potential: "عالي", performance: "جيد جداً", readiness: "3-5 سنوات", avatar: "/lovable-uploads/59f4e8c7-2404-4004-b19f-3ba486f5f42c.png" },
  ];

  const successionPipeline = [
    { position: "مدير تكنولوجيا المعلومات", current: "محمد الأحمد", successors: [
      { name: "أحمد محمد", readiness: "جاهز الآن", score: 95 },
      { name: "سارة المطيري", readiness: "1-2 سنة", score: 88 },
      { name: "عبدالله الزهراني", readiness: "3-5 سنوات", score: 75 }
    ]},
    { position: "مدير العمليات", current: "فيصل العتيبي", successors: [
      { name: "فاطمة أحمد", readiness: "1-2 سنة", score: 92 },
      { name: "خالد الشهري", readiness: "جاهز الآن", score: 89 },
      { name: "منى الدوسري", readiness: "3-5 سنوات", score: 78 }
    ]},
  ];

  const nineBoxData = [
    { name: "أحمد محمد", performance: 9, potential: 9, department: "IT" },
    { name: "فاطمة أحمد", performance: 8, potential: 8, department: "العمليات" },
    { name: "محمد سالم", performance: 9, potential: 7, department: "التسويق" },
    { name: "نورا عبدالله", performance: 8, potential: 9, department: "HR" },
    { name: "سارة المطيري", performance: 7, potential: 8, department: "IT" },
    { name: "خالد الشهري", performance: 8, potential: 7, department: "العمليات" },
  ];

  const developmentPrograms = [
    { id: 1, name: "برنامج القيادة المتقدمة", participants: 15, duration: "6 أشهر", status: "نشط", completion: 65 },
    { id: 2, name: "برنامج إعداد المديرين", participants: 22, duration: "4 أشهر", status: "نشط", completion: 80 },
    { id: 3, name: "برنامج الابتكار والإبداع", participants: 18, duration: "3 أشهر", status: "مكتمل", completion: 100 },
    { id: 4, name: "برنامج المهارات الرقمية", participants: 35, duration: "8 أشهر", status: "نشط", completion: 45 },
  ];

  const chartData = [
    { name: 'يناير', hiPos: 38, readyNow: 15, inDevelopment: 23 },
    { name: 'فبراير', hiPos: 42, readyNow: 18, inDevelopment: 24 },
    { name: 'مارس', hiPos: 45, readyNow: 20, inDevelopment: 25 },
    { name: 'أبريل', hiPos: 48, readyNow: 22, inDevelopment: 26 },
    { name: 'مايو', hiPos: 42, readyNow: 25, inDevelopment: 17 },
  ];

  const potentialDistribution = [
    { name: 'عالي الإمكانات', value: 42, color: '#22c55e' },
    { name: 'متوسط الإمكانات', value: 65, color: '#f59e0b' },
    { name: 'إمكانات محدودة', value: 23, color: '#ef4444' },
  ];

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">إدارة المواهب</h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة المواهب وتخطيط الخلافة وتطوير القادة مع تحليل الإمكانات والأداء
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleUpload}>
              <Upload className="h-4 w-4 ml-2" />
              رفع
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 ml-2" />
              تحميل
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileText className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة موهبة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardKPIs.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="text-success bg-success/10">
                      {kpi.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-primary/10 ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              تطور المواهب عبر الوقت
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hiPos" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                <Area type="monotone" dataKey="readyNow" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="inDevelopment" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              توزيع الإمكانات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={potentialDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {potentialDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('hipos')}>
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">الموظفون عالو الإمكانات</h3>
            <p className="text-muted-foreground text-sm">إدارة وتتبع المواهب المميزة</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('succession')}>
          <CardContent className="p-6 text-center">
            <GitBranch className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">تخطيط الخلافة</h3>
            <p className="text-muted-foreground text-sm">إعداد خطط الخلافة للأدوار الحرجة</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveTab('nine-box')}>
          <CardContent className="p-6 text-center">
            <Crosshair className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">مصفوفة 9-Box</h3>
            <p className="text-muted-foreground text-sm">تحليل الأداء والإمكانات</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHiPos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">الموظفون عالو الإمكانات</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة موظف
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {highPotentialEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {employee.avatar ? (
                      <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                    <p className="text-xs text-muted-foreground">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {employee.potential}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">الإمكانات</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {employee.performance}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">الأداء</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline">
                      {employee.readiness}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">الجاهزية</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(employee)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSuccessionPlanning = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">تخطيط الخلافة</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير الخطة
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة خطة
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {successionPipeline.map((pipeline, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  {pipeline.position}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                المنصب الحالي: <strong>{pipeline.current}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground mb-3">الخلفاء المحتملون</h4>
                {pipeline.successors.map((successor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{successor.name}</p>
                        <p className="text-sm text-muted-foreground">{successor.readiness}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{successor.score}%</div>
                        <p className="text-xs text-muted-foreground">الجاهزية</p>
                      </div>
                      <Progress value={successor.score} className="w-24" />
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCareerPathing = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">المسارات الوظيفية</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" size="sm">
            <Map className="h-4 w-4 ml-2" />
            عرض الخريطة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء مسار
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Route className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">المسارات الوظيفية</h3>
            <p className="text-muted-foreground mb-6">قم بإنشاء وإدارة المسارات الوظيفية للموظفين</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 ml-2" />
                إنشاء أول مسار وظيفي
              </Button>
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="h-4 w-4 ml-2" />
                رفع مسارات
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 ml-2" />
                تحميل قوالب
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNineBox = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">مصفوفة الأداء والإمكانات (9-Box)</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير المصفوفة
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 ml-2" />
            حفظ
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="performance" 
                name="الأداء" 
                domain={[0, 10]}
                label={{ value: 'الأداء', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="potential" 
                name="الإمكانات" 
                domain={[0, 10]}
                label={{ value: 'الإمكانات', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-muted-foreground">{data.department}</p>
                        <p className="text-sm">الأداء: {data.performance}/10</p>
                        <p className="text-sm">الإمكانات: {data.potential}/10</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="الموظفون" data={nineBoxData} fill="#22c55e" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderDevelopmentPrograms = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">برامج التطوير</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء برنامج
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {developmentPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{program.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {program.participants} مشارك • {program.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Badge variant={program.status === 'نشط' ? 'default' : 'secondary'}>
                      {program.status}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{program.completion}%</div>
                    <Progress value={program.completion} className="w-20 mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">التقارير والتحليلات</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 ml-2" />
            البحث
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير جميع التقارير
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <FileText className="h-4 w-4 ml-2" />
            طباعة
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إنشاء تقرير مخصص
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "تقرير المواهب عالية الإمكانات", icon: Crown, description: "قائمة مفصلة بالموظفين ذوي الإمكانات العالية" },
          { title: "تقرير خطط الخلافة", icon: GitBranch, description: "حالة جميع خطط الخلافة والجاهزية" },
          { title: "تقرير مصفوفة 9-Box", icon: Crosshair, description: "توزيع الموظفين حسب الأداء والإمكانات" },
          { title: "تقرير برامج التطوير", icon: GraduationCap, description: "تقدم المشاركين في برامج التطوير" },
          { title: "تقرير المسارات الوظيفية", icon: Route, description: "تحليل المسارات الوظيفية المتاحة" },
          { title: "تقرير تحليل الفجوات", icon: AlertTriangle, description: "الفجوات في الأدوار الحرجة والمهارات" },
        ].map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{report.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-3 w-3 ml-1" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <FileText className="h-3 w-3 ml-1" />
                  طباعة
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="h-3 w-3 ml-1" />
                  حفظ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">إعدادات إدارة المواهب</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="h-4 w-4 ml-2" />
            رفع إعدادات
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 ml-2" />
            تحميل إعدادات
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Settings className="h-4 w-4 ml-2" />
            حفظ الإعدادات
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>إعدادات عامة</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>تكوين الإعدادات الأساسية لنظام إدارة المواهب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="review-cycle">دورة مراجعة المواهب</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    <SelectItem value="biannual">نصف سنوي</SelectItem>
                    <SelectItem value="annual">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating-scale">مقياس التقييم</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المقياس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5</SelectItem>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="percentage">نسبة مئوية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>صلاحيات الوصول</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>إدارة صلاحيات الوصول لمختلف الأدوار</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: "مدير الموارد البشرية", access: "كامل" },
              { role: "مدير الأقسام", access: "قسمه فقط" },
              { role: "الموظف", access: "ملفه الشخصي" },
            ].map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{permission.role}</span>
                <div className="flex items-center gap-2">
                  <Select defaultValue={permission.access}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">كامل</SelectItem>
                      <SelectItem value="department">قسمه فقط</SelectItem>
                      <SelectItem value="personal">ملفه الشخصي</SelectItem>
                      <SelectItem value="none">بدون وصول</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Add/Edit Dialog
  const renderAddDialog = () => (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة عنصر جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">الاسم</Label>
              <Input id="name" placeholder="أدخل الاسم" />
            </div>
            <div>
              <Label htmlFor="type">النوع</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="talent">موهبة</SelectItem>
                  <SelectItem value="program">برنامج</SelectItem>
                  <SelectItem value="plan">خطة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea id="description" placeholder="أدخل الوصف" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => {
              handleSave();
              setShowAddDialog(false);
            }}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="hipos" className="flex flex-col gap-1 py-3">
              <Crown className="h-4 w-4" />
              <span className="text-xs">عالو الإمكانات</span>
            </TabsTrigger>
            <TabsTrigger value="succession" className="flex flex-col gap-1 py-3">
              <GitBranch className="h-4 w-4" />
              <span className="text-xs">تخطيط الخلافة</span>
            </TabsTrigger>
            <TabsTrigger value="career-paths" className="flex flex-col gap-1 py-3">
              <Route className="h-4 w-4" />
              <span className="text-xs">المسارات الوظيفية</span>
            </TabsTrigger>
            <TabsTrigger value="nine-box" className="flex flex-col gap-1 py-3">
              <Crosshair className="h-4 w-4" />
              <span className="text-xs">مصفوفة 9-Box</span>
            </TabsTrigger>
            <TabsTrigger value="development" className="flex flex-col gap-1 py-3">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">برامج التطوير</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="hipos">{renderHiPos()}</TabsContent>
          <TabsContent value="succession">{renderSuccessionPlanning()}</TabsContent>
          <TabsContent value="career-paths">{renderCareerPathing()}</TabsContent>
          <TabsContent value="nine-box">{renderNineBox()}</TabsContent>
          <TabsContent value="development">{renderDevelopmentPrograms()}</TabsContent>
          <TabsContent value="reports">{renderReports()}</TabsContent>
          <TabsContent value="settings">{renderSettings()}</TabsContent>
        </Tabs>
      </div>

      {renderAddDialog()}
    </div>
  );
};