import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Users, 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Target,
  Settings,
  Bell,
  Gift,
  HandHeart,
  Home,
  GraduationCap,
  Stethoscope,
  DollarSign,
  Shield,
  Phone,
  Mail,
  User,
  Building,
  FileText,
  Star,
  Award,
  UserCheck,
  Timer,
  Send,
  Share
} from 'lucide-react';

const SocialServices = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data for social services
  const mockPrograms = [
    {
      id: 'SOC001',
      title: 'برنامج الدعم الأسري',
      category: 'الدعم الأسري',
      status: 'نشط',
      participants: 45,
      maxParticipants: 60,
      budget: 50000,
      spent: 32000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      manager: 'سارة أحمد',
      description: 'برنامج لدعم الموظفين في المسائل الأسرية والشخصية',
      benefits: ['استشارات أسرية', 'دعم نفسي', 'ورش توعوية']
    },
    {
      id: 'SOC002',
      title: 'برنامج الإسكان الاجتماعي',
      category: 'الإسكان',
      status: 'نشط',
      participants: 23,
      maxParticipants: 30,
      budget: 80000,
      spent: 65000,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      manager: 'محمد علي',
      description: 'مساعدة الموظفين في الحصول على سكن مناسب',
      benefits: ['قروض إسكان', 'استشارات عقارية', 'دعم إيجار']
    }
  ];

  const mockRequests = [
    {
      id: 'REQ001',
      employeeName: 'أحمد محمد',
      employeeId: 'EMP001',
      requestType: 'دعم أسري',
      status: 'قيد المراجعة',
      priority: 'عالي',
      submissionDate: '2024-01-20',
      description: 'طلب دعم للحصول على استشارة أسرية',
      assignedTo: 'سارة أحمد',
      notes: 'تم التواصل مع الموظف لتحديد موعد المقابلة'
    },
    {
      id: 'REQ002',
      employeeName: 'فاطمة علي',
      employeeId: 'EMP002',
      requestType: 'دعم إسكان',
      status: 'معتمد',
      priority: 'متوسط',
      submissionDate: '2024-01-18',
      description: 'طلب مساعدة في الحصول على قرض إسكان',
      assignedTo: 'محمد علي',
      notes: 'تم الموافقة على القرض والبدء في الإجراءات'
    }
  ];

  const mockEvents = [
    {
      id: 'EVT001',
      title: 'ورشة الصحة النفسية',
      type: 'ورشة عمل',
      date: '2024-02-15',
      time: '10:00-12:00',
      location: 'قاعة التدريب الكبرى',
      facilitator: 'د. ليلى محمد',
      participants: 25,
      maxParticipants: 30,
      status: 'مجدول',
      description: 'ورشة عمل حول أهمية الصحة النفسية في بيئة العمل'
    },
    {
      id: 'EVT002',
      title: 'فعالية اليوم الاجتماعي',
      type: 'فعالية اجتماعية',
      date: '2024-02-20',
      time: '15:00-18:00',
      location: 'الحديقة الخارجية',
      facilitator: 'فريق الخدمات الاجتماعية',
      participants: 120,
      maxParticipants: 150,
      status: 'مؤكد',
      description: 'فعالية اجتماعية لتعزيز التواصل بين الموظفين'
    }
  ];

  // Helper functions
  const handleAction = (action: string, item: any) => {
    toast({
      title: "تم تنفيذ الإجراء",
      description: `تم ${action} بنجاح`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'مؤقت': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'معتمد': 'bg-blue-100 text-blue-800 border-blue-200',
      'قيد المراجعة': 'bg-orange-100 text-orange-800 border-orange-200',
      'مجدول': 'bg-purple-100 text-purple-800 border-purple-200',
      'مؤكد': 'bg-green-100 text-green-800 border-green-200',
      'منتهي': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <Badge className={priorityConfig[priority as keyof typeof priorityConfig] || 'bg-gray-100 text-gray-800'}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Heart className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#009F87]">نظام الخدمات الاجتماعية</h2>
            <p className="text-muted-foreground">الرعاية الشاملة والدعم الاجتماعي للموظفين</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction('تصدير التقارير', {})}>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                <Plus className="h-4 w-4 ml-2" />
                برنامج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#009F87]" />
                  إضافة برنامج اجتماعي جديد
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="program-title">اسم البرنامج</Label>
                    <Input id="program-title" placeholder="اسم البرنامج الاجتماعي" />
                  </div>
                  <div>
                    <Label htmlFor="program-category">الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family">الدعم الأسري</SelectItem>
                        <SelectItem value="housing">الإسكان</SelectItem>
                        <SelectItem value="health">الصحة والعافية</SelectItem>
                        <SelectItem value="education">التعليم والتطوير</SelectItem>
                        <SelectItem value="financial">الدعم المالي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="program-budget">الميزانية</Label>
                    <Input id="program-budget" type="number" placeholder="المبلغ بالريال" />
                  </div>
                  <div>
                    <Label htmlFor="max-participants">الحد الأقصى للمشاركين</Label>
                    <Input id="max-participants" type="number" placeholder="عدد المشاركين" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="program-description">وصف البرنامج</Label>
                  <Textarea id="program-description" placeholder="وصف تفصيلي للبرنامج وأهدافه" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button 
                    className="bg-[#009F87] hover:bg-[#009F87]/90"
                    onClick={() => handleAction('إضافة البرنامج', {})}
                  >
                    إضافة البرنامج
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <HandHeart className="h-4 w-4" />
            البرامج الاجتماعية
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            طلبات الخدمات
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            الفعاليات والأنشطة
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#009F87]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  البرامج النشطة
                  <HandHeart className="h-4 w-4 text-[#009F87]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#009F87]">{mockPrograms.length}</div>
                <p className="text-xs text-muted-foreground">
                  برنامج فعال حالياً
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  إجمالي المستفيدين
                  <Users className="h-4 w-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">68</div>
                <p className="text-xs text-muted-foreground">
                  موظف مستفيد من الخدمات
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  الطلبات المعتمدة
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">15</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 25%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  معدل الرضا
                  <Star className="h-4 w-4 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                <p className="text-xs text-muted-foreground">
                  تقييم ممتاز للخدمات
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#009F87]" />
                  النشاطات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>تم اعتماد طلب دعم إسكان لفاطمة علي</span>
                  <span className="text-muted-foreground mr-auto">منذ ساعة</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>تم تسجيل 15 مشارك في ورشة الصحة النفسية</span>
                  <span className="text-muted-foreground mr-auto">منذ 3 ساعات</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>بدء برنامج الدعم الأسري الجديد</span>
                  <span className="text-muted-foreground mr-auto">أمس</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#009F87]" />
                  التنبيهات والإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-800">3 طلبات جديدة تحتاج للمراجعة</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm text-blue-800">ورشة الصحة النفسية غداً الساعة 10:00</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm text-green-800">تم الوصول لـ 85% من هدف البرامج الشهرية</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">البرامج الاجتماعية</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في البرامج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => handleAction('تصفية', {})}>
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{program.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{program.category}</Badge>
                        {getStatusBadge(program.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {program.participants}/{program.maxParticipants} مشارك
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {program.spent.toLocaleString()} / {program.budget.toLocaleString()} ر.س
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {program.startDate} - {program.endDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {program.manager}
                        </div>
                      </div>
                      <p className="text-sm">{program.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">التقدم:</span>
                          <Progress value={(program.spent / program.budget) * 100} className="flex-1" />
                          <span className="text-sm text-muted-foreground">
                            {Math.round((program.spent / program.budget) * 100)}%
                          </span>
                        </div>
                        <div className="text-sm">
                          <strong>المزايا:</strong> {program.benefits.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('عرض البرنامج', program)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('تعديل البرنامج', program)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('تقرير البرنامج', program)}
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

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">طلبات الخدمات الاجتماعية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  طلب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#009F87]" />
                    طلب خدمة اجتماعية جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employee-name">اسم الموظف</Label>
                      <Input id="employee-name" placeholder="اسم الموظف" />
                    </div>
                    <div>
                      <Label htmlFor="request-type">نوع الطلب</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الطلب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family-support">دعم أسري</SelectItem>
                          <SelectItem value="housing-support">دعم إسكان</SelectItem>
                          <SelectItem value="health-support">دعم صحي</SelectItem>
                          <SelectItem value="education-support">دعم تعليمي</SelectItem>
                          <SelectItem value="financial-support">دعم مالي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="priority">الأولوية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">عالي</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="low">منخفض</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="assigned-to">المسؤول عن المتابعة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المسؤول" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sara">سارة أحمد</SelectItem>
                          <SelectItem value="mohamed">محمد علي</SelectItem>
                          <SelectItem value="fatima">فاطمة محمد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="request-description">وصف الطلب</Label>
                    <Textarea id="request-description" placeholder="وصف تفصيلي للطلب والحاجة" rows={4} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => handleAction('إرسال الطلب', {})}
                    >
                      إرسال الطلب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{request.employeeName}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{request.requestType}</Badge>
                        {getStatusBadge(request.status)}
                        {getPriorityBadge(request.priority)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {request.employeeId}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {request.submissionDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-4 w-4" />
                          {request.assignedTo}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {request.id}
                        </div>
                      </div>
                      <p className="text-sm">{request.description}</p>
                      {request.notes && (
                        <div className="p-2 bg-gray-50 rounded text-sm">
                          <strong>ملاحظات:</strong> {request.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('عرض الطلب', request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('معالجة الطلب', request)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('إرسال تحديث', request)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">الفعاليات والأنشطة الاجتماعية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  فعالية جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#009F87]" />
                    إضافة فعالية اجتماعية جديدة
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-title">عنوان الفعالية</Label>
                      <Input id="event-title" placeholder="اسم الفعالية" />
                    </div>
                    <div>
                      <Label htmlFor="event-type">نوع الفعالية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">ورشة عمل</SelectItem>
                          <SelectItem value="social">فعالية اجتماعية</SelectItem>
                          <SelectItem value="training">تدريب</SelectItem>
                          <SelectItem value="seminar">ندوة</SelectItem>
                          <SelectItem value="celebration">احتفال</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">التاريخ</Label>
                      <Input id="event-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="event-time">الوقت</Label>
                      <Input id="event-time" placeholder="مثال: 10:00-12:00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-location">المكان</Label>
                      <Input id="event-location" placeholder="موقع الفعالية" />
                    </div>
                    <div>
                      <Label htmlFor="max-participants">الحد الأقصى للمشاركين</Label>
                      <Input id="max-participants" type="number" placeholder="عدد المشاركين" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="event-description">وصف الفعالية</Label>
                    <Textarea id="event-description" placeholder="وصف تفصيلي للفعالية وأهدافها" rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => handleAction('إضافة الفعالية', {})}
                    >
                      إضافة الفعالية
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{event.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{event.type}</Badge>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.participants}/{event.maxParticipants} مشارك
                        </div>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">نسبة التسجيل:</span>
                        <Progress value={(event.participants / event.maxParticipants) * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {Math.round((event.participants / event.maxParticipants) * 100)}%
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <strong>المنسق:</strong> {event.facilitator}
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('عرض الفعالية', event)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('تعديل الفعالية', event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('مشاركة الفعالية', event)}
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#009F87]" />
                إعدادات نظام الخدمات الاجتماعية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                هنا يمكن إدارة إعدادات نظام الخدمات الاجتماعية، تخصيص البرامج، وضبط التنبيهات.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" onClick={() => handleAction('إعدادات البرامج', {})}>
                  <HandHeart className="h-4 w-4 ml-2" />
                  إعدادات البرامج
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAction('إعدادات التنبيهات', {})}>
                  <Bell className="h-4 w-4 ml-2" />
                  إعدادات التنبيهات
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAction('إدارة المستخدمين', {})}>
                  <Users className="h-4 w-4 ml-2" />
                  إدارة المستخدمين
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAction('قوالب التقارير', {})}>
                  <FileText className="h-4 w-4 ml-2" />
                  قوالب التقارير
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialServices;