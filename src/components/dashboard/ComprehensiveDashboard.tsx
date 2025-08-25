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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'الإدارات والأقسام',
      icon: Building2,
      total: 12,
      active: 12,
      pending: 0,
      alerts: 0,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      name: 'الحضور والانصراف',
      icon: Clock,
      total: 245,
      active: 220,
      pending: 15,
      alerts: 10,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'الجزاءات والعقوبات',
      icon: AlertTriangle,
      total: 2,
      active: 2,
      pending: 0,
      alerts: 2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'الإجازات والعطلات',
      icon: CalendarIcon,
      total: 45,
      active: 12,
      pending: 8,
      alerts: 5,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      name: 'الرواتب والأجور',
      icon: DollarSign,
      total: 245,
      active: 245,
      pending: 0,
      alerts: 0,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      name: 'التكامل والربط',
      icon: Plug,
      total: 8,
      active: 6,
      pending: 2,
      alerts: 1,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      name: 'التطوير والتنظيم المؤسسي',
      icon: Network,
      total: 15,
      active: 12,
      pending: 3,
      alerts: 0,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
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
      color: 'text-[#009F87]',
      bgColor: 'bg-[#009F87]/10'
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
      color: 'text-green-600',
      bgColor: 'bg-green-50'
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
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
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
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
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
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
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
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
      color: 'text-red-600',
      bgColor: 'bg-red-50'
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
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
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
      color: 'bg-[#009F87] hover:bg-[#008072]'
    },
    {
      title: 'اعتماد طلب',
      icon: CheckCircle,
      action: () => onNavigateToSection?.('requests'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'رفع تقرير',
      icon: FileBarChart,
      action: () => onNavigateToSection?.('reports'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'إرسال إشعار جماعي',
      icon: Megaphone,
      action: () => onNavigateToSection?.('requests'),
      color: 'bg-purple-600 hover:bg-purple-700'
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
    if (trend.startsWith('+')) return 'text-green-600';
    if (trend.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return <Bell className="h-4 w-4 text-blue-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'alert': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
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
    <div className="space-y-6">
      {/* رأس لوحة التحكم */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#009F87]">لوحة التحكم الشاملة</h1>
          <p className="text-muted-foreground mt-1">
            نظرة شاملة على جميع أنشطة وإحصائيات النظام (22 قسم)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-[#009F87] border-[#009F87]">
            آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-[#009F87] hover:text-white"
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
              <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الإجمالي:</span>
                  <span className="font-medium">{dept.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">النشط:</span>
                  <span className="font-medium text-green-600">{dept.active}</span>
                </div>
                {dept.pending > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">معلق:</span>
                    <span className="font-medium text-orange-600">{dept.pending}</span>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
              <widget.icon className={`h-4 w-4 ${widget.color}`} />
            </CardHeader>
            <CardContent>
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#009F87]" />
              التقويم الذكي
            </CardTitle>
            <CardDescription>
              الأحداث والمواعيد المهمة (ميلادي وهجري)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">الأحداث القادمة:</h4>
              {upcomingEvents.slice(0, 3).map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" 
                  onClick={event.action}
                >
                  <div className={`p-1 rounded ${event.urgent ? 'bg-red-100' : 'bg-gray-100'}`}>
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#009F87]" />
              إشعارات النظام
              <Badge variant="secondary" className="ml-auto">
                {notifications.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Alert key={notification.id} className={notification.urgent ? 'border-red-200 bg-red-50' : ''}>
                    <div className="flex items-start gap-3">
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#009F87]" />
              الإجراءات السريعة
            </CardTitle>
            <CardDescription>
              الوصول السريع للمهام الأكثر استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent>
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
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Bot className="h-6 w-6" />
            رؤى الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Alert className="border-green-200 bg-green-50">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">اتجاه إيجابي</AlertTitle>
              <AlertDescription className="text-green-700">
                معدل الحضور تحسن بنسبة 2.1% هذا الشهر
              </AlertDescription>
            </Alert>
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">يحتاج انتباه</AlertTitle>
              <AlertDescription className="text-orange-700">
                12 عقد عمل ينتهي خلال الشهر القادم
              </AlertDescription>
            </Alert>
            <Alert className="border-blue-200 bg-blue-50">
              <Target className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">توصية</AlertTitle>
              <AlertDescription className="text-blue-700">
                وقت مثالي لبدء برنامج تدريبي جديد
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};