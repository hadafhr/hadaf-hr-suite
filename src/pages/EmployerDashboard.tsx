import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  BarChart3,
  FileText,
  Calendar,
  BookOpen,
  Target,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const employerServices = [
  {
    title: "إدارة الموظفين",
    description: "إدارة شاملة لجميع بيانات الموظفين",
    icon: Users,
    route: "/services/employee-management",
    color: "bg-primary",
    stats: "247 موظف"
  },
  {
    title: "التوظيف",
    description: "إدارة عمليات التوظيف والمرشحين",
    icon: UserPlus,
    route: "/services/recruitment",
    color: "bg-accent",
    stats: "15 مرشح جديد"
  },
  {
    title: "تقييم الأداء",
    description: "نظام تقييم الأداء وإدارة KPIs",
    icon: Target,
    route: "/services/performance",
    color: "bg-primary",
    stats: "85% متوسط الأداء"
  },
  {
    title: "التدريب والتطوير",
    description: "إدارة البرامج التدريبية",
    icon: BookOpen,
    route: "/services/training",
    color: "bg-accent",
    stats: "12 دورة نشطة"
  },
  {
    title: "الرواتب والمستحقات",
    description: "إدارة الرواتب والمزايا",
    icon: DollarSign,
    route: "/employer/payroll",
    color: "bg-primary",
    stats: "2.4M ريال شهرياً"
  },
  {
    title: "الحضور والانصراف",
    description: "متابعة أوقات العمل والحضور",
    icon: Clock,
    route: "/employer/attendance",
    color: "bg-accent",
    stats: "94% حضور"
  },
  {
    title: "التقارير والتحليلات",
    description: "تقارير شاملة وتحليلات متقدمة",
    icon: BarChart3,
    route: "/reports",
    color: "bg-primary",
    stats: "25 تقرير"
  },
  {
    title: "إدارة الإجازات",
    description: "موافقة ومتابعة طلبات الإجازات",
    icon: Calendar,
    route: "/employer/leave-management",
    color: "bg-accent",
    stats: "8 طلبات معلقة"
  }
];

const companyStats = [
  { 
    label: "إجمالي الموظفين", 
    value: "247", 
    icon: Users, 
    change: "+12 هذا الشهر",
    type: "increase"
  },
  { 
    label: "متوسط الأداء", 
    value: "85%", 
    icon: TrendingUp, 
    change: "+3% من الشهر الماضي",
    type: "increase"
  },
  { 
    label: "طلبات الإجازة المعلقة", 
    value: "8", 
    icon: AlertCircle, 
    change: "تحتاج موافقة",
    type: "warning"
  },
  { 
    label: "معدل الرضا الوظيفي", 
    value: "92%", 
    icon: CheckCircle, 
    change: "ممتاز",
    type: "success"
  }
];

const pendingActions = [
  {
    title: "طلبات إجازة معلقة",
    count: 8,
    action: "مراجعة الطلبات",
    route: "/employer/leave-management",
    icon: Calendar,
    priority: "high"
  },
  {
    title: "تقييمات أداء مستحقة",
    count: 15,
    action: "إكمال التقييمات",
    route: "/services/performance",
    icon: Target,
    priority: "medium"
  },
  {
    title: "مرشحين جدد",
    count: 12,
    action: "مراجعة السير الذاتية",
    route: "/services/recruitment",
    icon: UserPlus,
    priority: "medium"
  }
];

export const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            بوابة صاحب العمل
          </h1>
          <p className="text-muted-foreground text-lg">
            لوحة التحكم الرئيسية - شركة التقنية المتقدمة
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {companyStats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-8 w-8 ${
                  stat.type === 'increase' ? 'text-primary' :
                  stat.type === 'warning' ? 'text-yellow-500' :
                  stat.type === 'success' ? 'text-green-500' : 'text-muted-foreground'
                }`} />
                <Badge variant={
                  stat.type === 'warning' ? 'destructive' : 
                  stat.type === 'success' ? 'default' : 'secondary'
                }>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Pending Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">إجراءات تحتاج متابعة</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {pendingActions.map((action, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(action.route)}
              >
                <div className="flex items-center justify-between mb-3">
                  <action.icon className={`h-6 w-6 ${
                    action.priority === 'high' ? 'text-red-500' :
                    action.priority === 'medium' ? 'text-yellow-500' : 'text-primary'
                  }`} />
                  <Badge variant={action.priority === 'high' ? 'destructive' : 'secondary'}>
                    {action.count}
                  </Badge>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.action}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employerServices.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => navigate(service.route)}
            >
              <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <Badge variant="secondary" className="text-xs">
                {service.stats}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Quick Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">أداء الشركة هذا الشهر</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الإنتاجية العامة</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-4/5 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">معدل الحضور</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-19/20 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">رضا الموظفين</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-19/20 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">إحصائيات سريعة</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">موظفين جدد هذا الشهر</span>
                <span className="font-medium text-primary">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">دورات تدريبية مكتملة</span>
                <span className="font-medium">38</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">معدل دوران الموظفين</span>
                <span className="font-medium text-green-500">4.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">متوسط ساعات التدريب</span>
                <span className="font-medium">16 ساعة</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => navigate('/services/employee-management')}
            className="bg-primary hover:bg-primary/90"
          >
            <Users className="h-4 w-4 mr-2" />
            إدارة الموظفين
          </Button>
          <Button 
            onClick={() => navigate('/services/recruitment')}
            variant="outline"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            التوظيف
          </Button>
          <Button 
            onClick={() => navigate('/reports')}
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            التقارير
          </Button>
        </div>
      </div>
    </div>
  );
};