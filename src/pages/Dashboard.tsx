import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  ArrowLeft
} from 'lucide-react';

const performanceData = [
  { month: 'يناير', employees: 65, satisfaction: 85 },
  { month: 'فبراير', employees: 72, satisfaction: 88 },
  { month: 'مارس', employees: 68, satisfaction: 92 },
  { month: 'أبريل', employees: 75, satisfaction: 89 },
  { month: 'مايو', employees: 80, satisfaction: 94 },
  { month: 'يونيو', employees: 85, satisfaction: 91 }
];

const departmentData = [
  { name: 'تقنية المعلومات', value: 30, color: '#22c55e' },
  { name: 'المبيعات', value: 25, color: '#eab308' },
  { name: 'التسويق', value: 20, color: '#3b82f6' },
  { name: 'الموارد البشرية', value: 15, color: '#f59e0b' },
  { name: 'المالية', value: 10, color: '#ef4444' }
];

const services = [
  {
    title: "إدارة الموظفين",
    description: "نظام شامل لإدارة بيانات وشؤون الموظفين",
    icon: Users,
    route: "/services/employee-management",
    status: "نشط",
    users: 145
  },
  {
    title: "منصة التوظيف",
    description: "أدوات ذكية للبحث عن المواهب وإدارة التوظيف",
    icon: Target,
    route: "/services/recruitment",
    status: "نشط",
    users: 89
  },
  {
    title: "نظام التدريب",
    description: "برامج تدريبية متطورة لتنمية المهارات",
    icon: TrendingUp,
    route: "/services/training",
    status: "تجريبي",
    users: 67
  },
  {
    title: "تقييم الأداء",
    description: "مؤشرات ومقاييس لتقييم أداء الموظفين",
    icon: BarChart3,
    route: "/services/performance",
    status: "نشط",
    users: 123
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">لوحة التحكم</h1>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* ترحيب وملخص */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="text-muted-foreground">
            نظرة شاملة على أداء منشأتك وإحصائيات الموارد البشرية
          </p>
        </div>

        {/* بطاقات الإحصائيات السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">247</p>
                <p className="text-sm text-success">+12% من الشهر الماضي</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                <p className="text-2xl font-bold text-primary">94.8%</p>
                <p className="text-sm text-success">+2.1% من الشهر الماضي</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المهام المكتملة</p>
                <p className="text-2xl font-bold text-primary">89%</p>
                <p className="text-sm text-success">+5.3% من الشهر الماضي</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التنبيهات النشطة</p>
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">تحتاج للمراجعة</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* الرسوم البيانية */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* رسم بياني للأداء */}
          <Card className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">أداء الموظفين الشهري</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="رضا الموظفين (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* رسم بياني للأقسام */}
          <Card className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">توزيع الموظفين حسب القسم</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* المنصات والخدمات */}
        <Card className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">منصاتك النشطة</h3>
            <Button className="btn-primary">
              إضافة منصة جديدة
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
              <div key={index} className="metric-card group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <ServiceIcon className="h-6 w-6 text-primary" />
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    service.status === 'نشط' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {service.status}
                  </span>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {service.users} مستخدم
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => navigate(service.route)}
                  >
                    الوصول
                  </Button>
                </div>
              </div>
            );
            })}
          </div>
        </Card>

        {/* التقارير السريعة */}
        <Card className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">التقارير السريعة</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/reports')}>
              <Calendar className="h-6 w-6 mb-2" />
              <span>تقرير الحضور</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/reports')}>
              <Building2 className="h-6 w-6 mb-2" />
              <span>تقرير الأقسام</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/reports')}>
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>تقرير الأداء</span>
            </Button>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
};