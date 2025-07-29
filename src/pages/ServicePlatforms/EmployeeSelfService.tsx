import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User,
  FileText,
  MessageSquare,
  Clock,
  DollarSign,
  CheckSquare,
  Paperclip,
  Bell,
  Bot,
  Upload,
  Download,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Shield,
  Settings,
  Languages,
  Headphones
} from 'lucide-react';

// Import ESS components
import { EmployeeProfile } from '@/components/ess/EmployeeProfile';
import { RequestManagement } from '@/components/ess/RequestManagement';
import { AIAssistant } from '@/components/ess/HRAIAssistant';

interface EmployeeData {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  salary: number;
  joinDate: string;
  manager: string;
}

interface QuickStat {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

export const EmployeeSelfService: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  // Mock employee data
  const employeeData: EmployeeData = {
    id: '1',
    name: 'أحمد محمد العتيبي',
    employeeId: 'EMP-2024-001',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات أول',
    email: 'ahmed.alotaibi@buadhr.com',
    phone: '+966 50 123 4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    salary: 15000,
    joinDate: '2023-01-15',
    manager: 'د. سارة المطيري'
  };

  const quickStats: QuickStat[] = [
    {
      title: language === 'ar' ? 'الطلبات المعلقة' : 'Pending Requests',
      value: 3,
      change: '+2',
      trend: 'up',
      icon: <FileText className="h-5 w-5" />,
      color: 'text-warning'
    },
    {
      title: language === 'ar' ? 'رصيد الإجازات' : 'Leave Balance',
      value: '21 يوم',
      change: '-3',
      trend: 'down',
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-primary'
    },
    {
      title: language === 'ar' ? 'المهام المكتملة' : 'Completed Tasks',
      value: '87%',
      change: '+12%',
      trend: 'up',
      icon: <CheckSquare className="h-5 w-5" />,
      color: 'text-success'
    },
    {
      title: language === 'ar' ? 'ساعات الحضور' : 'Attendance Hours',
      value: '172h',
      change: '+8h',
      trend: 'up',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-info'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'request',
      title: 'طلب إجازة اعتيادية',
      status: 'معتمد',
      date: '2024-03-20',
      icon: <Calendar className="h-4 w-4 text-success" />
    },
    {
      id: 2,
      type: 'task',
      title: 'مراجعة تقرير المبيعات',
      status: 'مكتمل',
      date: '2024-03-19',
      icon: <CheckCircle className="h-4 w-4 text-success" />
    },
    {
      id: 3,
      type: 'payroll',
      title: 'راتب شهر مارس',
      status: 'تم الصرف',
      date: '2024-03-18',
      icon: <DollarSign className="h-4 w-4 text-primary" />
    },
    {
      id: 4,
      type: 'message',
      title: 'رسالة من المدير المباشر',
      status: 'جديد',
      date: '2024-03-17',
      icon: <MessageSquare className="h-4 w-4 text-warning" />
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'اجتماع فريق التطوير',
      date: '2024-03-25',
      time: '10:00 ص',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'دورة الأمن السيبراني',
      date: '2024-03-28',
      time: '2:00 م',
      type: 'training'
    },
    {
      id: 3,
      title: 'تقييم الأداء السنوي',
      date: '2024-04-01',
      time: '11:00 ص',
      type: 'evaluation'
    }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-background p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              {language === 'ar' ? 'نظام الخدمة الذاتية الذكي للموظف' : 'ESS Smart Employee Portal'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'منصة متكاملة لإدارة شؤونك الوظيفية بسهولة وأمان' 
                : 'Integrated platform for managing your employment matters easily and securely'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </Button>

            {/* AI Assistant */}
            <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
              <DialogTrigger asChild>
                <Button className="btn-primary animate-pulse">
                  <Bot className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'مستشارك الذكي' : 'AI Assistant'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {language === 'ar' ? 'مساعد الموارد البشرية الذكي' : 'HR AI Assistant'}
                  </DialogTitle>
                </DialogHeader>
                <AIAssistant language={language} />
              </DialogContent>
            </Dialog>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                <AvatarFallback>{employeeData.name.split(' ')[0][0]}</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-medium">{employeeData.name}</p>
                <p className="text-sm text-muted-foreground">{employeeData.employeeId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="dashboard-card hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className={`h-3 w-3 mr-1 ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`} />
                    <span className={`text-xs ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}/10`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="dashboard">
              {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="profile">
              {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="requests">
              {language === 'ar' ? 'الطلبات' : 'Requests'}
            </TabsTrigger>
            <TabsTrigger value="messaging">
              {language === 'ar' ? 'المراسلة' : 'Messaging'}
            </TabsTrigger>
            <TabsTrigger value="attendance">
              {language === 'ar' ? 'الحضور' : 'Attendance'}
            </TabsTrigger>
            <TabsTrigger value="payroll">
              {language === 'ar' ? 'الرواتب' : 'Payroll'}
            </TabsTrigger>
            <TabsTrigger value="tasks">
              {language === 'ar' ? 'المهام' : 'Tasks'}
            </TabsTrigger>
            <TabsTrigger value="documents">
              {language === 'ar' ? 'المستندات' : 'Documents'}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'النشاطات الحديثة' : 'Recent Activity'}
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          {activity.icon}
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <Badge variant={
                          activity.status === 'معتمد' || activity.status === 'مكتمل' || activity.status === 'تم الصرف' ? 'default' :
                          activity.status === 'جديد' ? 'destructive' : 'secondary'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 mt-6">
                  <h3 className="font-semibold mb-4">
                    {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => setSelectedTab('requests')}
                    >
                      <Plus className="h-5 w-5 mb-2" />
                      {language === 'ar' ? 'طلب جديد' : 'New Request'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => setSelectedTab('messaging')}
                    >
                      <MessageSquare className="h-5 w-5 mb-2" />
                      {language === 'ar' ? 'مراسلة المدير' : 'Message Manager'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => setSelectedTab('payroll')}
                    >
                      <Download className="h-5 w-5 mb-2" />
                      {language === 'ar' ? 'تحميل قسيمة راتب' : 'Download Payslip'}
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Employee Info Card */}
                <Card className="p-6">
                  <div className="text-center space-y-3">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                      <AvatarFallback className="text-xl">{employeeData.name.split(' ')[0][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{employeeData.name}</h3>
                      <p className="text-sm text-muted-foreground">{employeeData.position}</p>
                      <p className="text-xs text-muted-foreground">{employeeData.department}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <div className="font-medium">{employeeData.employeeId}</div>
                        <div className="text-xs text-muted-foreground">
                          {language === 'ar' ? 'الرقم الوظيفي' : 'Employee ID'}
                        </div>
                      </div>
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <div className="font-medium">3 {language === 'ar' ? 'سنوات' : 'Years'}</div>
                        <div className="text-xs text-muted-foreground">
                          {language === 'ar' ? 'سنوات الخدمة' : 'Service Years'}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-3 w-3 mr-2" />
                      {language === 'ar' ? 'تحديث البيانات' : 'Update Profile'}
                    </Button>
                  </div>
                </Card>

                {/* Upcoming Events */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'الأحداث القادمة' : 'Upcoming Events'}
                  </h3>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.date} - {event.time}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {event.type === 'meeting' ? (language === 'ar' ? 'اجتماع' : 'Meeting') :
                           event.type === 'training' ? (language === 'ar' ? 'تدريب' : 'Training') :
                           (language === 'ar' ? 'تقييم' : 'Evaluation')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* HR Support */}
                <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Headphones className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {language === 'ar' ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' 
                          ? 'تواصل مع فريق الموارد البشرية' 
                          : 'Contact HR Support Team'
                        }
                      </p>
                    </div>
                    <Button size="sm" className="w-full">
                      <MessageSquare className="h-3 w-3 mr-2" />
                      {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <EmployeeProfile employeeData={employeeData} language={language} />
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <RequestManagement language={language} />
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging">
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'نظام المراسلة' : 'Messaging System'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قريباً...' : 'Coming Soon...'}
              </p>
            </div>
          </TabsContent>

          {/* Other tabs with similar placeholder */}
          <TabsContent value="attendance">
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'نظام الحضور والانصراف' : 'Attendance System'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قريباً...' : 'Coming Soon...'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="payroll">
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'نظام الرواتب' : 'Payroll System'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قريباً...' : 'Coming Soon...'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'إدارة المهام' : 'Task Management'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قريباً...' : 'Coming Soon...'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ar' ? 'مركز المستندات' : 'Document Center'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قريباً...' : 'Coming Soon...'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeSelfService;