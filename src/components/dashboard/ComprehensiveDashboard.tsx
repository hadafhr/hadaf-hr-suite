import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  FileText, 
  Calendar as CalendarIcon, 
  Award,
  Clock,
  DollarSign,
  Building2,
  TrendingUp,
  BarChart3,
  PieChart,
  RefreshCw,
  CheckCircle2,
  Bell,
  Target,
  GraduationCap,
  Activity,
  Eye,
  Edit,
  Plus,
  Star,
  Zap,
  CheckCircle,
  XCircle,
  Timer,
  Briefcase,
  MessageSquare,
  Gift,
  Scale,
  Heart,
  Shield,
  BookOpen,
  Gavel,
  Bot,
  FileBarChart,
  CalendarClock,
  Megaphone,
  CheckSquare,
  PenTool,
  Banknote,
  Network,
  Plug,
  MapPin,
  Phone,
  Mail,
  Laptop,
  Globe,
  Settings
} from 'lucide-react';

interface DashboardProps {
  onNavigateToSection?: (section: string) => void;
}

export const ComprehensiveDashboard: React.FC<DashboardProps> = ({ onNavigateToSection }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'موظف جديد ينتظر الموافقة',
      description: 'أحمد محمد - قسم تقنية المعلومات',
      type: 'info',
      time: '10 دقائق',
      urgent: false
    },
    {
      id: 2,
      title: 'انتهاء عقد قريب',
      description: 'عقد سارة أحمد ينتهي خلال 30 يوم',
      type: 'warning',
      time: '1 ساعة',
      urgent: true
    },
    {
      id: 3,
      title: 'تأخير في الحضور',
      description: '5 موظفين تأخروا اليوم',
      type: 'alert',
      time: '2 ساعات',
      urgent: false
    }
  ]);

  // البيانات الإحصائية الشاملة لجميع الأقسام
  const departmentStats = [
    {
      name: 'فريق العمل',
      icon: Users,
      total: 245,
      active: 238,
      pending: 7,
      alerts: 3,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      name: 'الإدارات والأقسام',
      icon: Building2,
      total: 12,
      active: 12,
      pending: 0,
      alerts: 0,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      name: 'الحضور والانصراف',
      icon: Clock,
      total: 245,
      active: 220,
      pending: 15,
      alerts: 10,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30'
    },
    {
      name: 'الجزاءات والعقوبات',
      icon: AlertTriangle,
      total: 2,
      active: 2,
      pending: 0,
      alerts: 2,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/30'
    },
    {
      name: 'الإجازات والعطلات',
      icon: CalendarIcon,
      total: 45,
      active: 12,
      pending: 8,
      alerts: 5,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30'
    },
    {
      name: 'الرواتب والأجور',
      icon: DollarSign,
      total: 245,
      active: 245,
      pending: 0,
      alerts: 0,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30'
    },
    {
      name: 'التكامل والربط',
      icon: Plug,
      total: 8,
      active: 6,
      pending: 2,
      alerts: 1,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      name: 'التطوير والتنظيم المؤسسي',
      icon: Network,
      total: 15,
      active: 12,
      pending: 3,
      alerts: 0,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    }
  ];

  // مؤشرات الأداء الرئيسية
  const kpiWidgets = [
    {
      title: 'الموارد البشرية',
      icon: Users,
      stats: {
        total: 245,
        new: 12,
        departed: 3,
        trend: '+4.2%'
      },
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'الحضور والانصراف',
      icon: Clock,
      stats: {
        attendance: '94.5%',
        violations: 8,
        onTime: '89%',
        trend: '+2.1%'
      },
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'التوظيف',
      icon: UserPlus,
      stats: {
        openPositions: 8,
        interviews: 15,
        offers: 5,
        trend: '+12.5%'
      },
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'الأداء',
      icon: Target,
      stats: {
        avgRating: 4.2,
        reviews: 180,
        goals: '76%',
        trend: '+3.8%'
      },
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'العقود',
      icon: FileText,
      stats: {
        expiring: 12,
        renewal: 8,
        active: 238,
        trend: '-2.1%'
      },
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'الرواتب',
      icon: DollarSign,
      stats: {
        totalPayroll: '2.4M',
        bonuses: '180K',
        advances: 15,
        trend: '+6.2%'
      },
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'المخالفات',
      icon: AlertTriangle,
      stats: {
        active: 2,
        urgent: 1,
        resolved: 28,
        trend: '-15.2%'
      },
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'التدريب والتطوير',
      icon: GraduationCap,
      stats: {
        programs: 8,
        participants: 95,
        completion: '78%',
        trend: '+9.3%'
      },
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  // الأحداث القادمة
  const upcomingEvents = [
    {
      id: 1,
      title: 'انتهاء عقد - سارة أحمد',
      date: '2024-04-15',
      type: 'contract',
      urgent: true,
      action: () => onNavigateToSection?.('employees')
    },
    {
      id: 2,
      title: 'اجتماع تقييم الأداء',
      date: '2024-04-18',
      type: 'meeting',
      urgent: false,
      action: () => onNavigateToSection?.('meetings')
    },
    {
      id: 3,
      title: 'بداية برنامج تدريبي جديد',
      date: '2024-04-20',
      type: 'training',
      urgent: false,
      action: () => onNavigateToSection?.('training')
    },
    {
      id: 4,
      title: 'مراجعة سياسات الشركة',
      date: '2024-04-22',
      type: 'policy',
      urgent: false,
      action: () => onNavigateToSection?.('governance')
    }
  ];

  // الإجراءات السريعة
  const quickActions = [
    {
      title: 'إضافة موظف جديد',
      icon: UserPlus,
      action: () => onNavigateToSection?.('employees'),
      color: 'bg-accent hover:bg-accent/90'
    },
    {
      title: 'اعتماد طلب',
      icon: CheckCircle,
      action: () => onNavigateToSection?.('requests'),
      color: 'bg-success hover:bg-success/90'
    },
    {
      title: 'رفع تقرير',
      icon: FileBarChart,
      action: () => onNavigateToSection?.('reports'),
      color: 'bg-accent hover:bg-accent/90'
    },
    {
      title: 'إرسال إشعار جماعي',
      icon: Megaphone,
      action: () => onNavigateToSection?.('requests'),
      color: 'bg-accent hover:bg-accent/90'
    }
  ];

  // دالة للتنقل بين الأقسام
  const handleSectionNavigation = (section: string) => {
    // قائمة الأقسام وما يقابلها في التبويبات
    const sectionMapping: { [key: string]: string } = {
      'فريق العمل': 'employees',
      'الإدارات والأقسام': 'departments', 
      'الحضور والانصراف': 'attendance',
      'الجزاءات والعقوبات': 'disciplinary',
      'الإجازات والعطلات': 'leaves',
      'الرواتب والأجور': 'payroll',
      'التكامل والربط': 'government',
      'التطوير والتنظيم المؤسسي': 'organization',
      'الموارد البشرية': 'employees',
      'التوظيف': 'recruitment',
      'الأداء': 'performance',
      'العقود': 'employees',
      'المخالفات': 'disciplinary',
      'التدريب والتطوير': 'training'
    };
    
    const targetSection = sectionMapping[section] || section.toLowerCase();
    onNavigateToSection?.(targetSection);
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith('+')) return 'text-success';
    if (trend.startsWith('-')) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return <Bell className="h-4 w-4 text-accent" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'alert': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="h-4 w-4" />;
      case 'meeting': return <CalendarClock className="h-4 w-4" />;
      case 'training': return <GraduationCap className="h-4 w-4" />;
      case 'policy': return <BookOpen className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
      {/* رأس لوحة التحكم */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-accent">لوحة التحكم الشاملة</h1>
          <p className="text-muted-foreground mt-1">
            نظرة شاملة على جميع أنشطة وإحصائيات النظام (22 قسم)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-accent border-accent">
            آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-accent hover:text-accent-foreground"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* الإحصائيات العامة لجميع الأقسام */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departmentStats.map((dept, index) => (
          <Card 
            key={index} 
            className={`${dept.bgColor} ${dept.borderColor} border-2 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105`} 
            onClick={() => handleSectionNavigation(dept.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <dept.icon className={`h-8 w-8 ${dept.color}`} />
                {dept.alerts > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {dept.alerts} تنبيه
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الإجمالي:</span>
                  <span className="font-medium">{dept.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">النشط:</span>
                  <span className="font-medium text-success">{dept.active}</span>
                </div>
                {dept.pending > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">معلق:</span>
                    <span className="font-medium text-warning">{dept.pending}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* الوحدات الرسومية التفاعلية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiWidgets.map((widget, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105" 
            onClick={() => handleSectionNavigation(widget.title)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-card/60 backdrop-blur-xl border-b border-border">
              <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
              <widget.icon className={`h-4 w-4 ${widget.color}`} />
            </CardHeader>
            <CardContent className="bg-card/60 backdrop-blur-xl p-4">
              <div className="space-y-2">
                {Object.entries(widget.stats).map(([key, value], idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className={key === 'trend' ? getTrendColor(value as string) : 'font-medium'}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* الصف السفلي: التقويم الذكي، الإشعارات، والإجراءات السريعة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* التقويم الذكي */}
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-accent" />
              التقويم الذكي
            </CardTitle>
            <CardDescription>
              الأحداث والمواعيد المهمة (ميلادي وهجري)
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300"
            />
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">الأحداث القادمة:</h4>
              {upcomingEvents.slice(0, 3).map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors" 
                  onClick={event.action}
                >
                  <div className={`p-1 rounded ${event.urgent ? 'bg-destructive/10' : 'bg-muted'}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  {event.urgent && (
                    <Badge variant="destructive" className="text-xs">عاجل</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* إشعارات النظام */}
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              إشعارات النظام
              <Badge variant="secondary" className="ml-auto">
                {notifications.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Alert key={notification.id} className={notification.urgent ? 'border-destructive/30 bg-destructive/10' : 'bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300'}>
                    <div className="flex items-start gap-3 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-4">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <AlertTitle className="text-sm font-medium">
                          {notification.title}
                          {notification.urgent && (
                            <Badge variant="destructive" className="ml-2 text-xs">عاجل</Badge>
                          )}
                        </AlertTitle>
                        <AlertDescription className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </AlertDescription>
                        <p className="text-xs text-muted-foreground mt-2">
                          منذ {notification.time}
                        </p>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
            <Button variant="outline" className="w-full mt-4" onClick={() => onNavigateToSection?.('requests')}>
              عرض جميع الإشعارات
            </Button>
          </CardContent>
        </Card>

        {/* الإجراءات السريعة */}
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              الإجراءات السريعة
            </CardTitle>
            <CardDescription>
              الوصول السريع للمهام الأكثر استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`${action.color} text-white justify-start h-12`}
                  onClick={action.action}
                >
                  <action.icon className="h-4 w-4 ml-2" />
                  {action.title}
                </Button>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">روابط مفيدة:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" size="sm" className="justify-start text-xs" onClick={() => onNavigateToSection?.('reports')}>
                  <FileBarChart className="h-3 w-3 ml-1" />
                  التقارير
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-xs" onClick={() => onNavigateToSection?.('ai')}>
                  <Bot className="h-3 w-3 ml-1" />
                  الذكاء الاصطناعي
                </Button>
                <Button variant="ghost" size="sm" className="justify-start text-xs" onClick={() => onNavigateToSection?.('meetings')}>
                  <CalendarClock className="h-3 w-3 ml-1" />
                  الاجتماعات
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-xs" onClick={() => onNavigateToSection?.('settings')}>
                  <Settings className="h-3 w-3 ml-1" />
                  الإعدادات
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تنبيهات الذكاء الاصطناعي */}
      <Card className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Bot className="h-6 w-6" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent/10 border border-border hover:border-accent/50 animate-fade-in transition-all duration-300 p-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Alert className="border-success/30 bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
              <AlertTitle className="text-success-foreground">اتجاه إيجابي</AlertTitle>
              <AlertDescription className="text-success-foreground/80">
                معدل الحضور تحسن بنسبة 2.1% هذا الشهر
              </AlertDescription>
            </Alert>
            <Alert className="border-warning/30 bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning-foreground">يحتاج انتباه</AlertTitle>
              <AlertDescription className="text-warning-foreground/80">
                12 عقد عمل ينتهي خلال الشهر القادم
              </AlertDescription>
            </Alert>
            <Alert className="border-accent/30 bg-accent/10">
              <Target className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent-foreground">توصية</AlertTitle>
              <AlertDescription className="text-accent-foreground/80">
                وقت مثالي لبدء برنامج تدريبي جديد
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};