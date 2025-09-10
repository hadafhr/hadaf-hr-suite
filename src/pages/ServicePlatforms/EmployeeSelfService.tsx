import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { BoudLogo } from '@/components/BoudLogo';
import { 
  User,
  FileText,
  MessageSquare,
  Clock,
  DollarSign,
  CheckSquare,
  Bell,
  Bot,
  Upload,
  Download,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Plus,
  Send,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Shield,
  Settings,
  Languages,
  Headphones,
  Star,
  BarChart3,
  Camera,
  Image as ImageIcon,
  Award,
  Clock3,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

// Import components
import { EmployeeProfile } from '@/components/ess/EmployeeProfile';
import { RequestManagement } from '@/components/ess/RequestManagement';
import { AIAssistant as HRAIAssistant } from '@/components/ess/HRAIAssistant';
import { AttendanceSystem } from '@/components/AttendanceSystem';

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
  address: string;
  nationalId: string;
  contractType: string;
  workLocation: string;
}

interface RequestItem {
  id: string;
  type: 'leave' | 'advance' | 'certificate' | 'earlyLeave' | 'dataUpdate';
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'inReview';
  date: string;
  description: string;
  attachments?: string[];
  approvalStage: 'manager' | 'department' | 'hr' | 'completed';
}

interface PayrollRecord {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  overtime: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
  payDate: string;
}

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  status: 'present' | 'absent' | 'late' | 'earlyLeave';
  location?: string;
}

interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

interface Document {
  id: string;
  name: string;
  type: 'identity' | 'certificate' | 'contract' | 'medical' | 'other';
  uploadDate: string;
  size: string;
  status: 'approved' | 'pending' | 'rejected';
}

export const EmployeeSelfService: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);
  const [language, setLanguage] = React.useState<'ar' | 'en'>('ar');
  const [profileEditMode, setProfileEditMode] = React.useState(false);
  const [showImageUpload, setShowImageUpload] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState('');

  // Mock employee data
  const [employeeData, setEmployeeData] = React.useState<EmployeeData>({
    id: '1',
    name: 'أحمد محمد العتيبي',
    employeeId: 'EMP-2024-001',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات أول',
    email: 'ahmed.alotaibi@buadhr.com',
    phone: '+966 50 123 4567',
    avatar: '/placeholder.svg',
    salary: 15000,
    joinDate: '2023-01-15',
    manager: 'د. سارة المطيري',
    address: 'الرياض، المملكة العربية السعودية',
    nationalId: '1234567890',
    contractType: 'دوام كامل',
    workLocation: 'المكتب الرئيسي - الرياض'
  });

  // Mock requests data
  const [requests] = React.useState<RequestItem[]>([
    {
      id: '1',
      type: 'leave',
      title: 'طلب إجازة اعتيادية',
      status: 'pending',
      date: '2024-03-20',
      description: 'إجازة لمدة 5 أيام للسفر',
      approvalStage: 'manager'
    },
    {
      id: '2',
      type: 'advance',
      title: 'طلب سلفة',
      status: 'approved',
      date: '2024-03-18',
      description: 'سلفة بمبلغ 3000 ريال',
      approvalStage: 'completed'
    },
    {
      id: '3',
      type: 'certificate',
      title: 'طلب تعريف راتب',
      status: 'inReview',
      date: '2024-03-22',
      description: 'شهادة راتب للبنك',
      approvalStage: 'hr'
    }
  ]);

  // Mock payroll data
  const [payrollRecords] = React.useState<PayrollRecord[]>([
    {
      id: '1',
      month: 'مارس',
      year: 2024,
      basicSalary: 15000,
      allowances: 2000,
      overtime: 500,
      deductions: 1200,
      netSalary: 16300,
      status: 'paid',
      payDate: '2024-03-25'
    },
    {
      id: '2',
      month: 'فبراير',
      year: 2024,
      basicSalary: 15000,
      allowances: 1800,
      overtime: 0,
      deductions: 1100,
      netSalary: 15700,
      status: 'paid',
      payDate: '2024-02-25'
    }
  ]);

  // Mock attendance data
  const [attendanceRecords] = React.useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2024-03-24',
      checkIn: '08:00',
      checkOut: '17:00',
      workHours: 8,
      status: 'present',
      location: 'المكتب الرئيسي'
    },
    {
      id: '2',
      date: '2024-03-23',
      checkIn: '08:15',
      checkOut: '17:00',
      workHours: 7.75,
      status: 'late',
      location: 'المكتب الرئيسي'
    }
  ]);

  // Mock messages
  const [messages] = React.useState<Message[]>([
    {
      id: '1',
      from: 'د. سارة المطيري',
      to: 'أحمد محمد العتيبي',
      subject: 'موافقة على طلب الإجازة',
      content: 'تم الموافقة على طلب إجازتك. استمتع بوقتك.',
      timestamp: '2024-03-24 10:30',
      isRead: false
    },
    {
      id: '2',
      from: 'قسم الموارد البشرية',
      to: 'أحمد محمد العتيبي',
      subject: 'تذكير: تحديث البيانات',
      content: 'يرجى تحديث بياناتك الشخصية في النظام.',
      timestamp: '2024-03-23 14:00',
      isRead: true
    }
  ]);

  // Mock documents
  const [documents] = React.useState<Document[]>([
    {
      id: '1',
      name: 'صورة الهوية الوطنية',
      type: 'identity',
      uploadDate: '2024-01-15',
      size: '2.1 MB',
      status: 'approved'
    },
    {
      id: '2',
      name: 'شهادة البكالوريوس',
      type: 'certificate',
      uploadDate: '2024-01-15',
      size: '1.8 MB',
      status: 'approved'
    },
    {
      id: '3',
      name: 'عقد العمل',
      type: 'contract',
      uploadDate: '2024-01-15',
      size: '850 KB',
      status: 'approved'
    }
  ]);

  const quickStats = [
    {
      title: 'الطلبات المعلقة',
      value: requests.filter(r => r.status === 'pending').length,
      change: '+2',
      trend: 'up' as const,
      icon: <FileText className="h-5 w-5" />,
      color: 'text-[#009F87]'
    },
    {
      title: 'رصيد الإجازات',
      value: '21 يوم',
      change: '-3',
      trend: 'down' as const,
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-[#009F87]'
    },
    {
      title: 'المهام المكتملة',
      value: '87%',
      change: '+12%',
      trend: 'up' as const,
      icon: <CheckSquare className="h-5 w-5" />,
      color: 'text-[#009F87]'
    },
    {
      title: 'ساعات الحضور',
      value: '172h',
      change: '+8h',
      trend: 'up' as const,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-[#009F87]'
    }
  ];

  const handleProfileUpdate = () => {
    setProfileEditMode(false);
    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بياناتك الشخصية بنجاح",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, upload to server
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmployeeData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
        setShowImageUpload(false);
        toast({
          title: "تم تحديث الصورة",
          description: "تم تحديث صورتك الشخصية بنجاح",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In real app, send to backend
    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال رسالتك إلى المدير المباشر",
    });
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'paid':
      case 'present':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'inReview':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'late':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: {[key: string]: string} = {
      'pending': 'معلق',
      'approved': 'معتمد',
      'rejected': 'مرفوض',
      'inReview': 'قيد المراجعة',
      'paid': 'مدفوع',
      'processing': 'قيد المعالجة',
      'present': 'حاضر',
      'absent': 'غائب',
      'late': 'متأخر',
      'earlyLeave': 'انصراف مبكر'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-white text-black font-arabic" dir="rtl">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="hover:bg-[#009F87]/10"
              >
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة
              </Button>
              
              {/* BOUD Logo */}
              <div className="flex items-center gap-3">
                <BoudLogo variant="icon" size="md" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  منصة الخدمة الذاتية للموظف
                </h1>
                <p className="text-gray-600">
                  منصة ذكية وشاملة لإدارة جميع شؤونك الوظيفية بسهولة وأمان
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* AI Assistant - بُعد */}
              <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
                <DialogTrigger asChild>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    <Bot className="h-4 w-4 ml-2" />
                    مساعدك الذكي - بُعد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-right">مساعد الموارد البشرية الذكي - بُعد</DialogTitle>
                  </DialogHeader>
                  <HRAIAssistant language={language} />
                </DialogContent>
              </Dialog>

              {/* Notifications */}
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
                onClick={() => {
                  toast({
                    title: "الإشعارات",
                    description: `لديك ${messages.filter(m => !m.isRead).length} رسائل غير مقروءة`,
                  });
                }}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {messages.filter(m => !m.isRead).length}
                </span>
              </Button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-black">{employeeData.name}</p>
                  <p className="text-sm text-gray-600">{employeeData.employeeId}</p>
                </div>
                <Avatar className="h-12 w-12 border-2 border-[#009F87]">
                  <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                  <AvatarFallback className="bg-[#009F87] text-white">{employeeData.name.split(' ')[0][0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-gray-50 border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#009F87]">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`h-3 w-3 ml-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-xs ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-[#009F87]/10 flex items-center justify-center">
                    <div className="text-[#009F87]">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-gray-100">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="messaging" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              المراسلة
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الحضور
            </TabsTrigger>
            <TabsTrigger value="payroll" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              الرواتب
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              تقييم الأداء
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
              المستندات
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-black">
                      <Clock className="h-5 w-5 ml-2 text-[#009F87]" />
                      النشاطات الحديثة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-[#009F87]" />
                            <div>
                              <h4 className="font-medium text-black">{request.title}</h4>
                              <p className="text-sm text-gray-600">{request.date}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">الإجراءات السريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white"
                        onClick={() => setSelectedTab('requests')}
                      >
                        <Plus className="h-5 w-5 mb-2" />
                        طلب جديد
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white"
                        onClick={() => setSelectedTab('messaging')}
                      >
                        <MessageSquare className="h-5 w-5 mb-2" />
                        مراسلة المدير
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white"
                        onClick={() => setSelectedTab('payroll')}
                      >
                        <Download className="h-5 w-5 mb-2" />
                        تحميل قسيمة راتب
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Employee Info Card */}
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24 mx-auto border-4 border-[#009F87]">
                          <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                          <AvatarFallback className="bg-[#009F87] text-white text-xl">
                            {employeeData.name.split(' ')[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="absolute -bottom-2 right-1/2 transform translate-x-1/2 rounded-full p-1 h-8 w-8 border-[#009F87]"
                          onClick={() => setShowImageUpload(true)}
                        >
                          <Camera className="h-4 w-4 text-[#009F87]" />
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg text-black">{employeeData.name}</h3>
                        <p className="text-gray-600">{employeeData.position}</p>
                        <p className="text-sm text-gray-500">{employeeData.department}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-[#009F87]/5 rounded-lg border border-[#009F87]/20">
                          <div className="font-semibold text-[#009F87]">{employeeData.employeeId}</div>
                          <div className="text-xs text-gray-600">الرقم الوظيفي</div>
                        </div>
                        <div className="p-3 bg-[#009F87]/5 rounded-lg border border-[#009F87]/20">
                          <div className="font-semibold text-[#009F87]">3 سنوات</div>
                          <div className="text-xs text-gray-600">سنوات الخدمة</div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white"
                        onClick={() => setSelectedTab('profile')}
                      >
                        <Edit className="h-4 w-4 ml-2" />
                        تحديث البيانات
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Summary */}
                <Card className="bg-gradient-to-br from-[#009F87]/10 to-[#009F87]/5 border-[#009F87]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#009F87]">
                      <Star className="h-5 w-5 ml-2" />
                      تقييم الأداء
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">التقييم العام</span>
                        <Badge className="bg-[#009F87] text-white">ممتاز</Badge>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-gray-600">92% - أداء متميز</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center text-black">
                  <User className="h-5 w-5 ml-2 text-[#009F87]" />
                  البيانات الشخصية
                </CardTitle>
                <Button 
                  onClick={() => profileEditMode ? handleProfileUpdate() : setProfileEditMode(true)}
                  className="bg-[#009F87] hover:bg-[#008072] text-white"
                >
                  {profileEditMode ? <CheckCircle className="h-4 w-4 ml-2" /> : <Edit className="h-4 w-4 ml-2" />}
                  {profileEditMode ? 'حفظ التغييرات' : 'تعديل البيانات'}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input 
                        id="name" 
                        value={employeeData.name} 
                        disabled={!profileEditMode}
                        onChange={(e) => setEmployeeData(prev => ({...prev, name: e.target.value}))}
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email" 
                        value={employeeData.email} 
                        disabled={!profileEditMode}
                        onChange={(e) => setEmployeeData(prev => ({...prev, email: e.target.value}))}
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input 
                        id="phone" 
                        value={employeeData.phone} 
                        disabled={!profileEditMode}
                        onChange={(e) => setEmployeeData(prev => ({...prev, phone: e.target.value}))}
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationalId">رقم الهوية الوطنية</Label>
                      <Input 
                        id="nationalId" 
                        value={employeeData.nationalId} 
                        disabled={!profileEditMode}
                        onChange={(e) => setEmployeeData(prev => ({...prev, nationalId: e.target.value}))}
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="position">المسمى الوظيفي</Label>
                      <Input 
                        id="position" 
                        value={employeeData.position} 
                        disabled 
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">القسم</Label>
                      <Input 
                        id="department" 
                        value={employeeData.department} 
                        disabled 
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manager">المدير المباشر</Label>
                      <Input 
                        id="manager" 
                        value={employeeData.manager} 
                        disabled 
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">العنوان</Label>
                      <Textarea 
                        id="address" 
                        value={employeeData.address} 
                        disabled={!profileEditMode}
                        onChange={(e) => setEmployeeData(prev => ({...prev, address: e.target.value}))}
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">إدارة الطلبات</h2>
              <Button 
                className="bg-[#009F87] hover:bg-[#008072] text-white"
                onClick={() => {
                  toast({
                    title: "طلب جديد",
                    description: "سيتم فتح نموذج الطلب الجديد قريباً",
                  });
                }}
              >
                <Plus className="h-4 w-4 ml-2" />
                طلب جديد
              </Button>
            </div>
            
            <div className="grid gap-4">
              {requests.map((request) => (
                <Card key={request.id} className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-black">{request.title}</h3>
                        <p className="text-gray-600">{request.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>تاريخ التقديم: {request.date}</span>
                          <span>مرحلة الموافقة: {request.approvalStage === 'manager' ? 'المدير المباشر' : 
                                                  request.approvalStage === 'department' ? 'مدير القسم' :
                                                  request.approvalStage === 'hr' ? 'الموارد البشرية' : 'مكتملة'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "عرض الطلب",
                              description: `عرض تفاصيل ${request.title}`,
                            });
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messaging Tab */}
          <TabsContent value="messaging" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <MessageSquare className="h-5 w-5 ml-2 text-[#009F87]" />
                  المراسلة مع المدير المباشر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 rounded-lg ${
                      message.from === employeeData.name ? 'bg-[#009F87]/10 mr-12' : 'bg-gray-50 ml-12'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-black">{message.subject}</h4>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{message.content}</p>
                      <p className="text-sm text-gray-500 mt-2">من: {message.from}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <Textarea 
                    placeholder="اكتب رسالتك هنا..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-[#009F87] hover:bg-[#008072] text-white"
                  >
                    <Send className="h-4 w-4 ml-2" />
                    إرسال الرسالة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <AttendanceSystem employeeData={employeeData} />
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <CreditCard className="h-5 w-5 ml-2 text-[#009F87]" />
                  كشوفات الرواتب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollRecords.map((record) => (
                    <Card key={record.id} className="bg-gray-50 border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg text-black">
                              {record.month} {record.year}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">الراتب الأساسي:</span>
                                <p className="font-semibold text-[#009F87]">{record.basicSalary.toLocaleString()} ر.س</p>
                              </div>
                              <div>
                                <span className="text-gray-600">البدلات:</span>
                                <p className="font-semibold text-green-600">{record.allowances.toLocaleString()} ر.س</p>
                              </div>
                              <div>
                                <span className="text-gray-600">الخصومات:</span>
                                <p className="font-semibold text-red-600">{record.deductions.toLocaleString()} ر.س</p>
                              </div>
                              <div>
                                <span className="text-gray-600">الراتب الصافي:</span>
                                <p className="font-bold text-[#009F87] text-lg">{record.netSalary.toLocaleString()} ر.س</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(record.status)}>
                              {getStatusText(record.status)}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "تحميل كشف الراتب",
                                  description: `تحميل كشف راتب ${record.month} ${record.year}`,
                                });
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <BarChart3 className="h-5 w-5 ml-2 text-[#009F87]" />
                  تقييم الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-black">التقييم العام</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>الأداء العام</span>
                          <div className="flex items-center gap-2">
                            <Progress value={92} className="w-24 h-2" />
                            <span className="font-semibold text-[#009F87]">92%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>المهارات التقنية</span>
                          <div className="flex items-center gap-2">
                            <Progress value={88} className="w-24 h-2" />
                            <span className="font-semibold text-[#009F87]">88%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>العمل الجماعي</span>
                          <div className="flex items-center gap-2">
                            <Progress value={95} className="w-24 h-2" />
                            <span className="font-semibold text-[#009F87]">95%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg text-black">الإنجازات</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-[#009F87]" />
                          <span className="text-sm">موظف الشهر - مارس 2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">إنجاز مشروع تطوير النظام</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">تدريب 5 موظفين جدد</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-3">ملاحظات المدير</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        أداء ممتاز ومستمر. يظهر الموظف التزاماً عالياً ومهارات قيادية متميزة. 
                        نوصي بالتفكير في ترقيته للمستوى التالي خلال العام القادم.
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- د. سارة المطيري</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">المستندات والملفات</h2>
              <Button 
                className="bg-[#009F87] hover:bg-[#008072] text-white"
                onClick={() => {
                  toast({
                    title: "رفع مستند",
                    description: "سيتم فتح نافذة رفع المستندات قريباً",
                  });
                }}
              >
                <Upload className="h-4 w-4 ml-2" />
                رفع مستند جديد
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="bg-white border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-[#009F87]" />
                          <h4 className="font-semibold text-black">{doc.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">الحجم: {doc.size}</p>
                        <p className="text-xs text-gray-500">تاريخ الرفع: {doc.uploadDate}</p>
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusText(doc.status)}
                        </Badge>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "عرض المستند",
                              description: `عرض ${doc.name}`,
                            });
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "تحميل المستند",
                              description: `تحميل ${doc.name}`,
                            });
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Upload Dialog */}
        <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تحديث الصورة الشخصية</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">اضغط لرفع الصورة</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG أو JPG (الحد الأقصى 5MB)</p>
                  </div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeeSelfService;