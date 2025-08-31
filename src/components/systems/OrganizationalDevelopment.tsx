import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Target, 
  BookOpen, 
  Network, 
  Building, 
  ArrowUpCircle, 
  CheckCircle, 
  Eye, 
  Save, 
  Download, 
  Share, 
  Settings, 
  BarChart, 
  Clock, 
  Zap,
  Plus,
  FileText,
  Calendar,
  Award,
  Briefcase,
  Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { PatternBackground } from '@/components/PatternBackground';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

const OrganizationalDevelopment = ({ onBack }: OrganizationalDevelopmentProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');

  // بيانات التطوير التنظيمي - تطوير البرامج الشهرية
  const monthlyDevelopment = [
    { month: 'يناير', programs: 25, completed: 20, inProgress: 5, change: 8 },
    { month: 'فبراير', programs: 28, completed: 24, inProgress: 4, change: 12 },
    { month: 'مارس', programs: 32, completed: 28, inProgress: 4, change: 14 },
    { month: 'أبريل', programs: 30, completed: 26, inProgress: 4, change: -2 },
    { month: 'مايو', programs: 35, completed: 30, inProgress: 5, change: 17 },
    { month: 'يونيو', programs: 38, completed: 33, inProgress: 5, change: 9 }
  ];

  // توزيع مكونات التطوير
  const developmentComponents = [
    { name: 'تطوير القيادات', value: 35, color: 'hsl(var(--primary))' },
    { name: 'التحول الرقمي', value: 28, color: 'hsl(var(--secondary))' },
    { name: 'تطوير المهارات', value: 22, color: 'hsl(var(--warning))' },
    { name: 'الثقافة التنظيمية', value: 15, color: 'hsl(var(--success))' }
  ];

  // إحصائيات شاملة للتطوير التنظيمي
  const developmentStats = {
    totalPrograms: 156,
    monthlyAverage: 26,
    activeInitiatives: 23,
    completedPrograms: 133,
    improvementProjects: 45,
    successRate: 87
  };

  const handleExport = () => {
    alert('تم تصدير البيانات بنجاح');
  };

  const handlePrint = () => {
    alert('تم الطباعة بنجاح');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Enhanced Header with Pattern Background */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-secondary p-8 shadow-2xl">
          <PatternBackground />
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleExport}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير' : 'Export'}
                </Button>
                <Button 
                  onClick={handlePrint}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'طباعة' : 'Print'}
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  {isRTL ? 'برنامج جديد' : 'New Program'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام التطوير التنظيمي والتغيير الذكي' : 'Smart Organizational Development & Change System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'منظومة متطورة لإدارة التطوير التنظيمي وقيادة التغيير وبناء القدرات المؤسسية' : 'Advanced system for organizational development management, change leadership, and institutional capacity building'}
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards - 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي البرامج</p>
                  <p className="text-2xl font-bold text-primary">{developmentStats.totalPrograms}</p>
                  <p className="text-xs text-green-600">+12% من الشهر الماضي</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المعدل الشهري</p>
                  <p className="text-2xl font-bold text-secondary">{developmentStats.monthlyAverage}</p>
                  <p className="text-xs text-green-600">+8% تحسن مستمر</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-warning">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المبادرات النشطة</p>
                  <p className="text-2xl font-bold text-warning">{developmentStats.activeInitiatives}</p>
                  <p className="text-xs text-blue-600">قيد التنفيذ حالياً</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-full">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-success/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">البرامج المكتملة</p>
                  <p className="text-2xl font-bold text-success">{developmentStats.completedPrograms}</p>
                  <p className="text-xs text-green-600">معدل إنجاز عالي</p>
                </div>
                <div className="p-3 bg-success/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">مشاريع التحسين</p>
                  <p className="text-2xl font-bold text-primary">{developmentStats.improvementProjects}</p>
                  <p className="text-xs text-blue-600">تطوير مستمر</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل النجاح</p>
                  <p className="text-2xl font-bold text-secondary">{developmentStats.successRate}%</p>
                  <p className="text-xs text-green-600">أداء ممتاز</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Development Evolution Chart */}
          <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                تطور البرامج الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyDevelopment}>
                  <defs>
                    <linearGradient id="colorDevelopment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="programs" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorDevelopment)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Development Components Distribution */}
          <Card className="bg-white/90 backdrop-blur border border-secondary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                توزيع مكونات التطوير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={developmentComponents}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {developmentComponents.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, 'النسبة']} />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {developmentComponents.map((component, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: component.color }}
                    ></div>
                    <span className="text-muted-foreground">{component.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-warning/5 border border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Brain className="h-6 w-6" />
              رؤى الذكاء الاصطناعي - التطوير التنظيمي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/60 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">تحليل الأداء الحالي</h4>
                <p className="text-sm text-muted-foreground">
                  يظهر النظام تحسناً ملحوظاً بنسبة 12% في عدد البرامج المنفذة مقارنة بالشهر الماضي، 
                  مع معدل نجاح مرتفع يصل إلى 87%.
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-secondary/10">
                <h4 className="font-semibold text-secondary mb-2">التوقعات والاتجاهات</h4>
                <p className="text-sm text-muted-foreground">
                  من المتوقع زيادة في برامج التحول الرقمي بنسبة 25% خلال الربع القادم 
                  مع التركيز على تطوير المهارات التقنية.
                </p>
              </div>
              <div className="p-4 bg-white/60 rounded-lg border border-warning/10">
                <h4 className="font-semibold text-warning mb-2">توصيات التحسين</h4>
                <p className="text-sm text-muted-foreground">
                  يُنصح بتعزيز برامج الثقافة التنظيمية وزيادة مشاريع التطوير القيادي 
                  لتحقيق توازن أفضل في التطوير الشامل.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/90 backdrop-blur border border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2" variant="outline">
                <Plus className="h-5 w-5" />
                <span className="text-xs">برنامج تطوير جديد</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline">
                <FileText className="h-5 w-5" />
                <span className="text-xs">تقارير التقدم</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">جدولة المبادرات</span>
              </Button>
              <Button className="h-16 flex-col gap-2" variant="outline">
                <Settings className="h-5 w-5" />
                <span className="text-xs">إدارة البرامج</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OrganizationalDevelopment;