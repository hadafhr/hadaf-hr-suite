import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  Calendar, 
  BookOpen,
  Award,
  Clock,
  Target,
  MessageSquare,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const employeeServices = [
  {
    title: "ملفي الشخصي",
    description: "عرض وتحديث البيانات الشخصية",
    icon: User,
    route: "/employee/profile",
    color: "bg-primary",
    stats: "محدث"
  },
  {
    title: "طلب إجازة",
    description: "تقديم طلبات الإجازات ومتابعتها",
    icon: Calendar,
    route: "/employee/leave-request",
    color: "bg-accent",
    stats: "5 أيام متاحة"
  },
  {
    title: "كشف الراتب",
    description: "عرض كشوف الراتب والمستحقات",
    icon: DollarSign,
    route: "/employee/payroll",
    color: "bg-primary",
    stats: "آخر راتب"
  },
  {
    title: "تقييم الأداء",
    description: "متابعة تقييمات الأداء والمهام",
    icon: Target,
    route: "/service-platforms/performance-evaluation",
    color: "bg-accent",
    stats: "85%"
  },
  {
    title: "الدورات التدريبية",
    description: "التسجيل في الدورات التدريبية",
    icon: BookOpen,
    route: "/employee/training",
    color: "bg-primary",
    stats: "3 دورات نشطة"
  },
  {
    title: "الشهادات والجوائز",
    description: "عرض الإنجازات والشهادات",
    icon: Award,
    route: "/service-platforms/performance-evaluation",
    color: "bg-accent",
    stats: "7 شهادات"
  },
  {
    title: "سجل الحضور",
    description: "متابعة أوقات الحضور والانصراف",
    icon: Clock,
    route: "/employee/attendance",
    color: "bg-primary",
    stats: "95% حضور"
  },
  {
    title: "التواصل الداخلي",
    description: "رسائل الإدارة والزملاء",
    icon: MessageSquare,
    route: "/service-platforms/individual-services",
    color: "bg-accent",
    stats: "3 رسائل جديدة"
  }
];

const employeeStats = [
  { label: "أيام الإجازة المتبقية", value: "15", icon: Calendar },
  { label: "تقييم الأداء الحالي", value: "85%", icon: TrendingUp },
  { label: "ساعات التدريب", value: "24", icon: BookOpen },
  { label: "نسبة الحضور", value: "95%", icon: Clock }
];

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            بوابة الموظف
          </h1>
          <p className="text-muted-foreground text-lg">
            أهلاً بك في بوابتك الشخصية - أحمد محمد السعد
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {employeeStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {employeeServices.map((service, index) => (
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

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">آخر الأنشطة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">طلب إجازة مقبول</p>
                  <p className="text-sm text-muted-foreground">إجازة من 15-17 أكتوبر</p>
                </div>
              </div>
              <Badge variant="default">مقبول</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3 space-x-reverse">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">دورة تدريبية جديدة</p>
                  <p className="text-sm text-muted-foreground">إدارة المشاريع المتقدمة</p>
                </div>
              </div>
              <Badge variant="secondary">جديد</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">تقييم أداء شهري</p>
                  <p className="text-sm text-muted-foreground">النتيجة: 85% - ممتاز</p>
                </div>
              </div>
              <Badge variant="default">مكتمل</Badge>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={() => navigate('/employee/leave-request')}
            className="bg-primary hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            طلب إجازة
          </Button>
          <Button 
            onClick={() => navigate('/employee/attendance')}
            variant="outline"
          >
            <Clock className="h-4 w-4 mr-2" />
            تسجيل الحضور
          </Button>
          <Button 
            onClick={() => navigate('/employee/payroll')}
            variant="outline"
          >
            <FileText className="h-4 w-4 mr-2" />
            كشف الراتب
          </Button>
        </div>
      </div>
    </div>
  );
};