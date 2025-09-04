import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Users, 
  Calendar, 
  Filter,
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  UserPlus,
  UserMinus,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  Edit,
  Trash2,
  Save,
  Printer,
  FileX,
  Star,
  Award,
  MapPin,
  Building,
  Briefcase,
  History,
  ChevronRight,
  Target,
  Zap,
  Brain,
  MessageSquare,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, Cell, BarChart, Bar } from 'recharts';

interface EmployeeMovementsSystemProps {
  onBack: () => void;
}

export const EmployeeMovementsSystem: React.FC<EmployeeMovementsSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [isNewMovementOpen, setIsNewMovementOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Mock data for dashboard
  const dashboardStats = {
    totalMovements: 156,
    activeTransfers: 12,
    promotions: 8,
    secondments: 5,
    pendingApprovals: 23,
    completedThisMonth: 45,
    pendingRequests: 18,
    averageProcessingTime: 7
  };

  // Movement distribution data
  const movementDistribution = [
    { name: 'تقنية المعلومات', transfers: 15, promotions: 8, secondments: 3 },
    { name: 'الموارد البشرية', transfers: 12, promotions: 6, secondments: 2 },
    { name: 'المالية', transfers: 10, promotions: 5, secondments: 1 },
    { name: 'العمليات', transfers: 18, promotions: 9, secondments: 4 },
    { name: 'التسويق', transfers: 8, promotions: 4, secondments: 2 }
  ];

  // Monthly trends data
  const monthlyTrends = [
    { month: 'يناير', transfers: 12, promotions: 8, secondments: 3 },
    { month: 'فبراير', transfers: 15, promotions: 10, secondments: 4 },
    { month: 'مارس', transfers: 18, promotions: 12, secondments: 6 },
    { month: 'أبريل', transfers: 20, promotions: 15, secondments: 8 },
    { month: 'مايو', transfers: 22, promotions: 18, secondments: 10 },
    { month: 'يونيو', transfers: 25, promotions: 20, secondments: 12 }
  ];

  // Mock movement records
  const movementRecords = [
    {
      id: 'MOV-2024-001',
      employeeName: 'أحمد محمد العلي',
      employeeId: 'EMP001',
      movementType: 'ترقية',
      fromPosition: 'مطور برمجيات',
      toPosition: 'مطور برمجيات أول',
      fromDepartment: 'تقنية المعلومات',
      toDepartment: 'تقنية المعلومات',
      requestDate: '2024-01-15',
      effectiveDate: '2024-02-01',
      status: 'معتمد',
      reason: 'تقييم أداء ممتاز',
      approvedBy: 'مدير الموارد البشرية',
      salaryChange: '+15%',
      priority: 'عالية'
    },
    {
      id: 'MOV-2024-002',
      employeeName: 'فاطمة أحمد السالم',
      employeeId: 'EMP002',
      movementType: 'نقل',
      fromPosition: 'محاسب',
      toPosition: 'محاسب',
      fromDepartment: 'المحاسبة والمالية',
      toDepartment: 'المراجعة الداخلية',
      requestDate: '2024-01-20',
      effectiveDate: '2024-02-15',
      status: 'قيد المراجعة',
      reason: 'طلب الموظف للتطوير المهني',
      approvedBy: '-',
      salaryChange: '0%',
      priority: 'متوسطة'
    },
    {
      id: 'MOV-2024-003',
      employeeName: 'محمد سعد الغامدي',
      employeeId: 'EMP003',
      movementType: 'إعارة',
      fromPosition: 'مشرف خدمة عملاء',
      toPosition: 'مشرف خدمة عملاء',
      fromDepartment: 'خدمة العملاء',
      toDepartment: 'فرع الرياض',
      requestDate: '2024-01-18',
      effectiveDate: '2024-03-01',
      status: 'معتمد',
      reason: 'احتياج مؤقت في الفرع',
      approvedBy: 'مدير العمليات',
      salaryChange: '+10%',
      priority: 'عالية'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'معتمد': 'bg-green-100 text-green-800 border-green-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200',
      'في الانتظار': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'عالية': 'bg-red-100 text-red-800 border-red-200',
      'متوسطة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفضة': 'bg-green-100 text-green-800 border-green-200'
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || 'bg-gray-100 text-gray-800';
  };

  const getMovementTypeIcon = (type: string) => {
    switch (type) {
      case 'ترقية':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'نقل':
        return <ArrowRight className="h-4 w-4 text-blue-600" />;
      case 'إعارة':
        return <MapPin className="h-4 w-4 text-purple-600" />;
      case 'تغيير مسمى':
        return <Briefcase className="h-4 w-4 text-orange-600" />;
      default:
        return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  const COLORS = ['#009F87', '#00B4A0', '#00C9B8', '#00DED0', '#00F3E8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90" dir="rtl">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#009F87]/8 to-[#009F87]/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#009F87]/10 to-[#009F87]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-[#009F87]/3 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="border-gray-300 hover:bg-[#009F87]/5 hover:border-[#009F87]/30 hover:text-[#009F87] transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#009F87] to-[#00B4A0] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <RefreshCw className="h-8 w-8 text-white relative z-10" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">قسم الحركة والتنقلات</h1>
                <p className="text-gray-600 text-lg">إدارة تنقلات وترقيات الموظفين بذكاء اصطناعي</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#009F87]/30 text-[#009F87] bg-[#009F87]/5 px-4 py-2 text-sm font-medium">
              <Activity className="h-4 w-4 ml-2" />
              نظام متطور
            </Badge>
            <Button
              onClick={() => setIsAIAssistantOpen(true)}
              className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Brain className="h-4 w-4 ml-2" />
              المساعد الذكي
            </Button>
            <Button className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
          </div>
        </div>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200/50 shadow-lg p-4">
            <TabsList className="grid w-full grid-cols-8 bg-transparent p-0 h-auto gap-2">
              <TabsTrigger 
                value="dashboard" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <BarChart3 className="h-5 w-5" />
                <span>لوحة التحكم</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="transfers" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <ArrowRight className="h-5 w-5" />
                <span>النقل الداخلي</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="promotions" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <TrendingUp className="h-5 w-5" />
                <span>الترقيات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="secondments" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <MapPin className="h-5 w-5" />
                <span>الإعارات والتكليفات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="job-changes" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <Briefcase className="h-5 w-5" />
                <span>تغيير المسميات</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="history" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <History className="h-5 w-5" />
                <span>السجل والأرشيف</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reports" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <FileText className="h-5 w-5" />
                <span>التقارير</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-all duration-300 data-[state=active]:bg-[#009F87] data-[state=active]:text-white data-[state=active]:shadow-lg bg-white/70 text-gray-700 hover:bg-[#009F87]/10 hover:text-[#009F87] border border-gray-200 data-[state=active]:border-[#009F87] hover:scale-105 hover:shadow-md"
              >
                <Settings className="h-5 w-5" />
                <span>الإعدادات</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <RefreshCw className="h-6 w-6 text-[#009F87]" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.totalMovements}</div>
                    <p className="text-sm text-gray-600">إجمالي الحركات</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ArrowRight className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.activeTransfers}</div>
                    <p className="text-sm text-gray-600">نقل نشط</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.promotions}</div>
                    <p className="text-sm text-gray-600">ترقيات</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.secondments}</div>
                    <p className="text-sm text-gray-600">إعارات</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.pendingApprovals}</div>
                    <p className="text-sm text-gray-600">في انتظار الموافقة</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.completedThisMonth}</div>
                    <p className="text-sm text-gray-600">مكتمل هذا الشهر</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.pendingRequests}</div>
                    <p className="text-sm text-gray-600">طلبات معلقة</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-black">{dashboardStats.averageProcessingTime}</div>
                    <p className="text-sm text-gray-600">متوسط وقت المعالجة (أيام)</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-black">
                      <LineChart className="h-5 w-5" />
                      اتجاهات الحركة الشهرية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="transfers" stackId="1" stroke="#009F87" fill="#009F87" />
                        <Area type="monotone" dataKey="promotions" stackId="1" stroke="#00B4A0" fill="#00B4A0" />
                        <Area type="monotone" dataKey="secondments" stackId="1" stroke="#00C9B8" fill="#00C9B8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Movement Distribution */}
                <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-black">
                      <PieChart className="h-5 w-5" />
                      توزيع الحركات حسب القسم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={movementDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="transfers" fill="#009F87" />
                        <Bar dataKey="promotions" fill="#00B4A0" />
                        <Bar dataKey="secondments" fill="#00C9B8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-black">
                      <RefreshCw className="h-5 w-5" />
                      آخر الحركات
                    </CardTitle>
                    <Button 
                      onClick={() => setIsNewMovementOpen(true)}
                      className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white"
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      حركة جديدة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {movementRecords.slice(0, 5).map((movement) => (
                      <div key={movement.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-200/30 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-4">
                          {getMovementTypeIcon(movement.movementType)}
                          <div>
                            <h4 className="font-medium text-black">{movement.employeeName}</h4>
                            <p className="text-sm text-gray-600">
                              {movement.movementType}: {movement.fromPosition} → {movement.toPosition}
                            </p>
                            <p className="text-xs text-gray-500">رقم المرجع: {movement.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getPriorityBadge(movement.priority)}>
                            {movement.priority}
                          </Badge>
                          <Badge className={getStatusBadge(movement.status)}>
                            {movement.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tab Contents - Simplified for now */}
          <TabsContent value="transfers">
            <Card className="bg-white/80 backdrop-blur border-gray-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black">إدارة النقل الداخلي</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                      <Upload className="h-4 w-4 ml-2" />
                      رفع ملف
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                      <Download className="h-4 w-4 ml-2" />
                      تصدير
                    </Button>
                    <Button className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                      <Plus className="h-4 w-4 ml-2" />
                      نقل جديد
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ArrowRight className="h-16 w-16 text-[#009F87] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">إدارة النقل الداخلي</h3>
                  <p className="text-gray-600 mb-4">
                    نظام متطور لإدارة نقل الموظفين بين الأقسام والوحدات التنظيمية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions">
            <Card className="bg-white/80 backdrop-blur border-gray-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black">إدارة الترقيات</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                      <Target className="h-4 w-4 ml-2" />
                      معايير الاستحقاق
                    </Button>
                    <Button className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                      <Plus className="h-4 w-4 ml-2" />
                      ترقية جديدة
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">نظام الترقيات الذكي</h3>
                  <p className="text-gray-600 mb-4">
                    ربط تلقائي مع تقييمات الأداء ونظام الرواتب لترقيات فعالة
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="secondments">
            <Card className="bg-white/80 backdrop-blur border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">الإعارات والتكليفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">إدارة الإعارات والتكليفات</h3>
                  <p className="text-gray-600 mb-4">
                    تتبع التكليفات المؤقتة داخل وخارج المؤسسة مع العودة التلقائية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job-changes">
            <Card className="bg-white/80 backdrop-blur border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-black">تغيير المسميات الوظيفية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">إدارة المسميات الوظيفية</h3>
                  <p className="text-gray-600 mb-4">
                    تحديث وتعديل المسميات الوظيفية مع ضمان التوافق مع الهيكل التنظيمي
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-white/80 backdrop-blur border-gray-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black">السجل والأرشيف</CardTitle>
                  <div className="flex items-center gap-2">
                    <Input placeholder="البحث في السجل..." className="w-64" />
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رقم المرجع</TableHead>
                      <TableHead className="text-right">الموظف</TableHead>
                      <TableHead className="text-right">نوع الحركة</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movementRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{record.employeeName}</div>
                            <div className="text-sm text-gray-600">{record.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementTypeIcon(record.movementType)}
                            {record.movementType}
                          </div>
                        </TableCell>
                        <TableCell>{record.requestDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-[#009F87]/10 hover:text-[#009F87]">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-[#009F87] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تقارير الحركة</h3>
                  <p className="text-gray-600 text-sm mb-4">تقارير شاملة حسب النوع والقسم</p>
                  <Button className="w-full bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                    إنشاء التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تحليلات التنقل</h3>
                  <p className="text-gray-600 text-sm mb-4">معدلات الدوران والتنقل</p>
                  <Button className="w-full bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                    عرض التحليلات
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">تصدير البيانات</h3>
                  <p className="text-gray-600 text-sm mb-4">تصدير PDF/Excel</p>
                  <Button className="w-full bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                    تصدير الآن
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <CardTitle className="text-black">إعدادات سير العمل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>سير موافقة النقل</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر سير العمل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">موظف → مدير → موارد بشرية</SelectItem>
                        <SelectItem value="advanced">موظف → مدير → موارد بشرية → إدارة عليا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>معايير الاستحقاق للترقية</Label>
                    <Textarea placeholder="حدد معايير الاستحقاق..." />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                    <Save className="h-4 w-4 ml-2" />
                    حفظ الإعدادات
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-gray-200/50">
                <CardHeader>
                  <CardTitle className="text-black">صلاحيات النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>من يمكنه طلب النقل</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الموظفين</SelectItem>
                        <SelectItem value="managers">المدراء فقط</SelectItem>
                        <SelectItem value="hr">الموارد البشرية فقط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>من يمكنه الموافقة النهائية</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">مدير الموارد البشرية</SelectItem>
                        <SelectItem value="admin">المدير العام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                    تحديث الصلاحيات
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Assistant Dialog */}
        <Dialog open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#009F87]" />
                المساعد الذكي للحركة والتنقلات
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-[#009F87]/5 rounded-lg border border-[#009F87]/20">
                <MessageSquare className="h-5 w-5 text-[#009F87] mb-2" />
                <p className="text-sm text-gray-700">
                  أهلاً بك! يمكنني مساعدتك في:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• عرض الموظفين المرقيين في آخر 12 شهر</li>
                  <li>• التنبؤ بمخاطر دوران الموظفين</li>
                  <li>• اقتراح موظفين مؤهلين للترقية</li>
                  <li>• تحليل اتجاهات الحركة والتنقل</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-2">
                <Input placeholder="اكتب سؤالك هنا..." className="flex-1" />
                <Button className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white">
                  إرسال
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Movement Dialog */}
        <Dialog open={isNewMovementOpen} onOpenChange={setIsNewMovementOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء حركة جديدة</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <Label>الموظف</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الموظف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                      <SelectItem value="emp2">فاطمة أحمد السالم</SelectItem>
                      <SelectItem value="emp3">محمد سعد الغامدي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>نوع الحركة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحركة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">ترقية</SelectItem>
                      <SelectItem value="transfer">نقل</SelectItem>
                      <SelectItem value="secondment">إعارة</SelectItem>
                      <SelectItem value="job_change">تغيير مسمى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>من قسم</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="القسم الحالي" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>إلى قسم</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="القسم الجديد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>من مسمى</Label>
                  <Input placeholder="المسمى الحالي" />
                </div>

                <div>
                  <Label>إلى مسمى</Label>
                  <Input placeholder="المسمى الجديد" />
                </div>

                <div>
                  <Label>تاريخ السريان</Label>
                  <Input type="date" />
                </div>

                <div>
                  <Label>الأولوية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="low">منخفضة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label>سبب الحركة</Label>
              <Textarea placeholder="اذكر سبب الحركة والمبررات..." />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsNewMovementOpen(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={() => setIsNewMovementOpen(false)}
                className="bg-gradient-to-r from-[#009F87] to-[#00B4A0] hover:from-[#00B4A0] hover:to-[#009F87] text-white"
              >
                <Save className="h-4 w-4 ml-2" />
                إنشاء الحركة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeeMovementsSystem;
