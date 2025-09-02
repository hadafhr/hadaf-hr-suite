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
  Share,
  Baby,
  Heart as MarriageIcon,
  Skull,
  PiggyBank,
  CreditCard,
  Briefcase,
  Lightbulb,
  MessageSquare,
  Headphones,
  FileCheck,
  AlertTriangle,
  Globe,
  Banknote,
  HandCoins,
  Calculator,
  PieChart,
  TrendingDown,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Trash2,
  ChevronRight,
  BookOpen,
  Video,
  Mic
} from 'lucide-react';

const SocialServices = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { toast } = useToast();

  // Mock data for social cases
  const mockSocialCases = [
    {
      id: 'SC001',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      caseType: 'مرض',
      status: 'قيد المراجعة',
      priority: 'عالي',
      submissionDate: '2024-01-15',
      supportAmount: 5000,
      description: 'حاجة لدعم طبي لعملية جراحية عاجلة',
      documents: ['تقرير طبي', 'فاتورة المستشفى'],
      currentStage: 'مراجعة طبية',
      assignedSocialWorker: 'سارة أحمد',
      followUpDate: '2024-01-25'
    },
    {
      id: 'SC002',
      employeeName: 'فاطمة عبدالله',
      employeeId: 'EMP002',
      caseType: 'ولادة',
      status: 'معتمد',
      priority: 'متوسط',
      submissionDate: '2024-01-10',
      supportAmount: 3000,
      description: 'دعم لتكاليف الولادة والرعاية الطبية',
      documents: ['شهادة ولادة', 'تقرير طبي'],
      currentStage: 'تم الصرف',
      assignedSocialWorker: 'ليلى حسن',
      followUpDate: '2024-02-10'
    },
    {
      id: 'SC003',
      employeeName: 'محمد سعد',
      employeeId: 'EMP003',
      caseType: 'زواج',
      status: 'معتمد',
      priority: 'منخفض',
      submissionDate: '2024-01-08',
      supportAmount: 10000,
      description: 'دعم مالي لمناسبة الزواج',
      documents: ['عقد الزواج', 'بطاقة هوية'],
      currentStage: 'تم الصرف',
      assignedSocialWorker: 'نورا محمد',
      followUpDate: '2024-02-08'
    }
  ];

  // Mock data for financial support
  const mockFinancialPrograms = [
    {
      id: 'FP001',
      title: 'صندوق الطوارئ',
      type: 'مساعدة عاجلة',
      totalFund: 100000,
      usedAmount: 35000,
      availableAmount: 65000,
      beneficiaries: 12,
      criteria: 'الحالات الطارئة والعاجلة',
      maxSupport: 15000,
      status: 'نشط'
    },
    {
      id: 'FP002',
      title: 'برنامج القروض الحسنة',
      type: 'قرض بدون فوائد',
      totalFund: 200000,
      usedAmount: 120000,
      availableAmount: 80000,
      beneficiaries: 8,
      criteria: 'الموظفين بأقدمية +2 سنوات',
      maxSupport: 25000,
      status: 'نشط'
    },
    {
      id: 'FP003',
      title: 'صندوق الادخار التعاوني',
      type: 'ادخار جماعي',
      totalFund: 150000,
      usedAmount: 45000,
      availableAmount: 105000,
      beneficiaries: 25,
      criteria: 'اشتراك شهري 500 ريال',
      maxSupport: 0,
      status: 'نشط'
    }
  ];

  // Mock data for social initiatives
  const mockInitiatives = [
    {
      id: 'SI001',
      title: 'مبادرة كفالة الأيتام',
      type: 'خيرية',
      goal: 50000,
      collected: 32000,
      participants: 45,
      endDate: '2024-12-31',
      status: 'نشط',
      impact: 'كفالة 15 يتيم',
      coordinator: 'أحمد محمد'
    },
    {
      id: 'SI002',
      title: 'حملة التبرع لمرضى السرطان',
      type: 'طبية',
      goal: 30000,
      collected: 28500,
      participants: 62,
      endDate: '2024-03-15',
      status: 'قارب على الانتهاء',
      impact: 'مساعدة 8 عائلات',
      coordinator: 'فاطمة علي'
    },
    {
      id: 'SI003',
      title: 'مشروع تشجير البيئة',
      type: 'بيئية',
      goal: 15000,
      collected: 9000,
      participants: 38,
      endDate: '2024-06-30',
      status: 'نشط',
      impact: 'زراعة 500 شجرة',
      coordinator: 'سارة أحمد'
    }
  ];

  // Mock data for family support
  const mockFamilySupport = [
    {
      id: 'FS001',
      type: 'استشارة أسرية',
      employeeName: 'محمد أحمد',
      sessionDate: '2024-01-20',
      counselor: 'د. ليلى محمد',
      status: 'مجدولة',
      issue: 'مشاكل تربوية مع الأطفال',
      confidential: true
    },
    {
      id: 'FS002',
      type: 'دعم تعليم الأطفال',
      employeeName: 'سارة علي',
      childName: 'يوسف سارة',
      grade: 'الصف السادس',
      supportType: 'رسوم مدرسية',
      amount: 8000,
      status: 'معتمد'
    },
    {
      id: 'FS003',
      type: 'برنامج الإسكان',
      employeeName: 'خالد محمد',
      housingType: 'قرض إسكان',
      amount: 150000,
      duration: '15 سنة',
      status: 'قيد المراجعة',
      partner: 'بنك التنمية الاجتماعية'
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
      'معتمد': 'bg-blue-100 text-blue-800 border-blue-200',
      'قيد المراجعة': 'bg-orange-100 text-orange-800 border-orange-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200',
      'مجدولة': 'bg-purple-100 text-purple-800 border-purple-200',
      'مؤجل': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منتهي': 'bg-gray-100 text-gray-800 border-gray-200',
      'قارب على الانتهاء': 'bg-amber-100 text-amber-800 border-amber-200'
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

  const getCaseTypeIcon = (type: string) => {
    const typeIcons = {
      'مرض': <Stethoscope className="h-4 w-4 text-red-500" />,
      'وفاة': <Skull className="h-4 w-4 text-gray-600" />,
      'زواج': <MarriageIcon className="h-4 w-4 text-pink-500" />,
      'ولادة': <Baby className="h-4 w-4 text-blue-500" />
    };
    return typeIcons[type as keyof typeof typeIcons] || <FileText className="h-4 w-4" />;
  };

  // AI Assistant Component
  const AIAssistant = () => (
    <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#009F87]" />
            المساعد الذكي للخدمات الاجتماعية
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('استفسار عن البرامج', {})}>
              <div className="flex items-center gap-3">
                <HandHeart className="h-8 w-8 text-[#009F87]" />
                <div>
                  <h4 className="font-medium">البرامج المتاحة</h4>
                  <p className="text-sm text-muted-foreground">اعرف البرامج التي يمكنك الاستفادة منها</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('طريقة التقديم', {})}>
              <div className="flex items-center gap-3">
                <FileCheck className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">طريقة التقديم</h4>
                  <p className="text-sm text-muted-foreground">تعلم كيفية تقديم طلب للحصول على الدعم</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('المستندات المطلوبة', {})}>
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-500" />
                <div>
                  <h4 className="font-medium">المستندات المطلوبة</h4>
                  <p className="text-sm text-muted-foreground">قائمة بالوثائق اللازمة لكل نوع من الدعم</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('حقوقك القانونية', {})}>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-medium">حقوقك القانونية</h4>
                  <p className="text-sm text-muted-foreground">اعرف حقوقك وفقاً لنظام العمل السعودي</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">التوصيات الذكية للإدارة:</h4>
            <div className="space-y-2">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">💡 زيادة ميزانية صندوق الطوارئ بنسبة 20% بناء على الطلب المتزايد</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm text-blue-800">📊 إطلاق برنامج جديد للدعم النفسي بناء على تحليل الاحتياجات</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-sm text-green-800">🎯 معدل رضا الموظفين عن الخدمات الاجتماعية وصل إلى 95%</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Heart className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#009F87]">قسم الخدمات الاجتماعية</h2>
            <p className="text-muted-foreground">نظام مؤتمت وذكي لرعاية الموظفين الشاملة</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAIAssistant(true)}
            className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            <Lightbulb className="h-4 w-4 ml-2" />
            المساعد الذكي
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('تصدير التقارير', {})}>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                <Plus className="h-4 w-4 ml-2" />
                حالة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-[#009F87]" />
                  تسجيل حالة اجتماعية جديدة
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employee-select">اسم الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp001">أحمد محمد علي</SelectItem>
                        <SelectItem value="emp002">فاطمة عبدالله</SelectItem>
                        <SelectItem value="emp003">محمد سعد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="case-type">نوع الحالة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="illness">مرض</SelectItem>
                        <SelectItem value="death">وفاة</SelectItem>
                        <SelectItem value="marriage">زواج</SelectItem>
                        <SelectItem value="birth">ولادة</SelectItem>
                        <SelectItem value="emergency">حالة طارئة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">مستوى الأولوية</Label>
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
                    <Label htmlFor="support-amount">مبلغ الدعم المطلوب</Label>
                    <Input id="support-amount" type="number" placeholder="المبلغ بالريال" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="case-description">وصف الحالة</Label>
                  <Textarea id="case-description" placeholder="وصف تفصيلي للحالة والظروف المحيطة بها" rows={4} />
                </div>
                <div>
                  <Label>المستندات المطلوبة</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="medical-report" className="rounded" />
                      <label htmlFor="medical-report" className="text-sm">تقرير طبي</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="death-cert" className="rounded" />
                      <label htmlFor="death-cert" className="text-sm">شهادة وفاة</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="marriage-cert" className="rounded" />
                      <label htmlFor="marriage-cert" className="text-sm">عقد زواج</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="birth-cert" className="rounded" />
                      <label htmlFor="birth-cert" className="text-sm">شهادة ميلاد</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">إلغاء</Button>
                  <Button 
                    className="bg-[#009F87] hover:bg-[#009F87]/90"
                    onClick={() => handleAction('تسجيل الحالة', {})}
                  >
                    تسجيل الحالة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="social-cases" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            الحالات الاجتماعية
          </TabsTrigger>
          <TabsTrigger value="financial-support" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            الدعم المالي
          </TabsTrigger>
          <TabsTrigger value="initiatives" className="flex items-center gap-2">
            <HandHeart className="h-4 w-4" />
            المبادرات الاجتماعية
          </TabsTrigger>
          <TabsTrigger value="family-support" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            الدعم الأسري
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            التقارير والتحليلات
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#009F87]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  إجمالي الحالات النشطة
                  <Heart className="h-4 w-4 text-[#009F87]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#009F87]">{mockSocialCases.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 15%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  إجمالي الدعم المقدم
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockSocialCases.reduce((total, case_) => total + case_.supportAmount, 0).toLocaleString()} ر.س
                </div>
                <p className="text-xs text-muted-foreground">
                  هذا الشهر
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  المبادرات النشطة
                  <HandHeart className="h-4 w-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockInitiatives.filter(i => i.status === 'نشط').length}</div>
                <p className="text-xs text-muted-foreground">
                  مبادرة فعالة
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
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <p className="text-xs text-muted-foreground">
                  تقييم ممتاز للخدمات
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities and AI Insights */}
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
                  <span>تم اعتماد طلب دعم طبي لأحمد محمد</span>
                  <span className="text-muted-foreground mr-auto">منذ ساعة</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>إنجاز 95% من مبادرة التبرع للسرطان</span>
                  <span className="text-muted-foreground mr-auto">منذ 2 ساعة</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>تم تسجيل حالة زواج جديدة لمحمد سعد</span>
                  <span className="text-muted-foreground mr-auto">أمس</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>إطلاق برنامج دعم تعليم الأطفال الجديد</span>
                  <span className="text-muted-foreground mr-auto">منذ يومين</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#009F87]" />
                  رؤى الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-white rounded-lg border border-purple-100">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">اتجاه إيجابي</p>
                      <p className="text-xs text-muted-foreground">زيادة 25% في طلبات الدعم التعليمي</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-100">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">تنبيه</p>
                      <p className="text-xs text-muted-foreground">نفاد 65% من صندوق الطوارئ</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-purple-100">
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">توصية</p>
                      <p className="text-xs text-muted-foreground">إطلاق برنامج الدعم النفسي</p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => setShowAIAssistant(true)}
                >
                  <MessageSquare className="h-4 w-4 ml-2" />
                  المزيد من الرؤى
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mockFinancialPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PiggyBank className="h-4 w-4 text-[#009F87]" />
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المتاح:</span>
                    <span className="font-medium">{program.availableAmount.toLocaleString()} ر.س</span>
                  </div>
                  <Progress 
                    value={(program.usedAmount / program.totalFund) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>المستخدم: {program.usedAmount.toLocaleString()}</span>
                    <span>الإجمالي: {program.totalFund.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline">{program.beneficiaries} مستفيد</Badge>
                    {getStatusBadge(program.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Cases Tab */}
        <TabsContent value="social-cases" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">إدارة الحالات الاجتماعية</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الحالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="تصفية حسب النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="illness">مرض</SelectItem>
                  <SelectItem value="death">وفاة</SelectItem>
                  <SelectItem value="marriage">زواج</SelectItem>
                  <SelectItem value="birth">ولادة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {mockSocialCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        {getCaseTypeIcon(case_.caseType)}
                        <div>
                          <h4 className="font-medium">{case_.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">رقم الموظف: {case_.employeeId}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 max-w-2xl">{case_.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {case_.submissionDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {case_.assignedSocialWorker}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {case_.supportAmount.toLocaleString()} ر.س
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          {getStatusBadge(case_.status)}
                          {getPriorityBadge(case_.priority)}
                        </div>
                        <p className="text-xs text-muted-foreground">المرحلة الحالية:</p>
                        <p className="text-sm font-medium">{case_.currentStage}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedCase(case_)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAction('تعديل الحالة', case_)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Documents */}
                  {case_.documents.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">المستندات المرفقة:</p>
                      <div className="flex gap-2 flex-wrap">
                        {case_.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Case Details Modal */}
          {selectedCase && (
            <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getCaseTypeIcon(selectedCase.caseType)}
                    تفاصيل الحالة - {selectedCase.employeeName}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">معلومات أساسية</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">رقم الحالة:</span>
                          <span>{selectedCase.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">نوع الحالة:</span>
                          <span>{selectedCase.caseType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">تاريخ التسجيل:</span>
                          <span>{selectedCase.submissionDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">الأولوية:</span>
                          {getPriorityBadge(selectedCase.priority)}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">تفاصيل الدعم</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">مبلغ الدعم:</span>
                          <span className="font-medium">{selectedCase.supportAmount.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">المسؤول:</span>
                          <span>{selectedCase.assignedSocialWorker}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">موعد المتابعة:</span>
                          <span>{selectedCase.followUpDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">وصف الحالة</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {selectedCase.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">المستندات</h4>
                      <div className="space-y-2">
                        {selectedCase.documents.map((doc: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{doc}</span>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleAction('تحميل المستند', doc)}>
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleAction('اعتماد الحالة', selectedCase)}
                    >
                      <CheckCircle className="h-4 w-4 ml-2" />
                      اعتماد
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleAction('طلب مستندات إضافية', selectedCase)}
                    >
                      <FileText className="h-4 w-4 ml-2" />
                      طلب مستندات
                    </Button>
                  </div>
                  <Button onClick={() => setSelectedCase(null)}>
                    إغلاق
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Financial Support Tab */}
        <TabsContent value="financial-support" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">برامج الدعم المالي والاجتماعي</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  برنامج دعم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-[#009F87]" />
                    إضافة برنامج دعم مالي جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="program-title">اسم البرنامج</Label>
                      <Input id="program-title" placeholder="مثل: صندوق الطوارئ" />
                    </div>
                    <div>
                      <Label htmlFor="program-type">نوع البرنامج</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">مساعدة عاجلة</SelectItem>
                          <SelectItem value="loan">قرض بدون فوائد</SelectItem>
                          <SelectItem value="saving">ادخار جماعي</SelectItem>
                          <SelectItem value="grant">منحة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="total-fund">إجمالي الصندوق</Label>
                      <Input id="total-fund" type="number" placeholder="المبلغ بالريال" />
                    </div>
                    <div>
                      <Label htmlFor="max-support">الحد الأقصى للدعم</Label>
                      <Input id="max-support" type="number" placeholder="أقصى مبلغ للفرد" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="criteria">معايير الاستحقاق</Label>
                    <Textarea id="criteria" placeholder="وصف المعايير المطلوبة للاستفادة من البرنامج" rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => handleAction('إضافة البرنامج المالي', {})}
                    >
                      إضافة البرنامج
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mockFinancialPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5 text-[#009F87]" />
                      {program.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {getStatusBadge(program.status)}
                      <Badge variant="outline">{program.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Financial Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {program.totalFund.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">إجمالي الصندوق (ر.س)</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {program.usedAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">المستخدم (ر.س)</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {program.availableAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">المتاح (ر.س)</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>نسبة الاستخدام</span>
                      <span>{Math.round((program.usedAmount / program.totalFund) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(program.usedAmount / program.totalFund) * 100} 
                      className="h-3"
                    />
                  </div>

                  {/* Program Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">معايير الاستحقاق:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{program.criteria}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">عدد المستفيدين:</span>
                        <span className="font-medium">{program.beneficiaries} موظف</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">الحد الأقصى للفرد:</span>
                        <span className="font-medium">{program.maxSupport.toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('عرض المستفيدين', program)}
                    >
                      <Users className="h-4 w-4 ml-2" />
                      المستفيدون
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('تقرير مالي', program)}
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      تقرير مالي
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('تعديل البرنامج', program)}
                    >
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Social Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">المبادرات الاجتماعية والخيرية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  مبادرة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <HandHeart className="h-5 w-5 text-[#009F87]" />
                    إطلاق مبادرة اجتماعية جديدة
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="initiative-title">اسم المبادرة</Label>
                      <Input id="initiative-title" placeholder="مثل: مبادرة كفالة الأيتام" />
                    </div>
                    <div>
                      <Label htmlFor="initiative-type">نوع المبادرة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="charity">خيرية</SelectItem>
                          <SelectItem value="medical">طبية</SelectItem>
                          <SelectItem value="environmental">بيئية</SelectItem>
                          <SelectItem value="educational">تعليمية</SelectItem>
                          <SelectItem value="community">مجتمعية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-amount">الهدف المالي</Label>
                      <Input id="goal-amount" type="number" placeholder="المبلغ المطلوب" />
                    </div>
                    <div>
                      <Label htmlFor="end-date">تاريخ الانتهاء</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="coordinator">منسق المبادرة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنسق" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp001">أحمد محمد</SelectItem>
                        <SelectItem value="emp002">فاطمة علي</SelectItem>
                        <SelectItem value="emp003">سارة أحمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="initiative-description">وصف المبادرة والهدف منها</Label>
                    <Textarea id="initiative-description" placeholder="وصف تفصيلي للمبادرة والأثر المتوقع منها" rows={4} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => handleAction('إطلاق المبادرة', {})}
                    >
                      إطلاق المبادرة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mockInitiatives.map((initiative) => (
              <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[#009F87] mb-1">{initiative.title}</h4>
                      <p className="text-sm text-muted-foreground">منسق: {initiative.coordinator}</p>
                    </div>
                    <div className="flex gap-2">
                      {getStatusBadge(initiative.status)}
                      <Badge variant="outline">{initiative.type}</Badge>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">التقدم المحرز</span>
                      <span className="text-sm text-muted-foreground">
                        {initiative.collected.toLocaleString()} / {initiative.goal.toLocaleString()} ر.س
                      </span>
                    </div>
                    <Progress 
                      value={(initiative.collected / initiative.goal) * 100} 
                      className="h-3 mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round((initiative.collected / initiative.goal) * 100)}% مكتمل</span>
                      <span>{initiative.participants} مشارك</span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-[#009F87]" />
                        <span className="font-medium">الأثر المتوقع:</span>
                        <span>{initiative.impact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">تاريخ الانتهاء:</span>
                        <span>{initiative.endDate}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">المشاركون:</span>
                        <span>{initiative.participants} موظف</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">المتبقي:</span>
                        <span>{(initiative.goal - initiative.collected).toLocaleString()} ر.س</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('التبرع للمبادرة', initiative)}
                    >
                      <HandCoins className="h-4 w-4 ml-2" />
                      تبرع الآن
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('مشاركة المبادرة', initiative)}
                      >
                        <Share className="h-4 w-4 ml-2" />
                        مشاركة
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('تقرير المبادرة', initiative)}
                      >
                        <BarChart3 className="h-4 w-4 ml-2" />
                        تقرير
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('تعديل المبادرة', initiative)}
                      >
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Family Support Tab */}
        <TabsContent value="family-support" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">الدعم الأسري والاستشارات</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  طلب استشارة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#009F87]" />
                    طلب استشارة أسرية أو دعم تعليمي
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="support-type">نوع الدعم</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الدعم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family-counseling">استشارة أسرية</SelectItem>
                          <SelectItem value="education-support">دعم تعليم الأطفال</SelectItem>
                          <SelectItem value="housing-support">دعم إسكان</SelectItem>
                          <SelectItem value="psychological-support">دعم نفسي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employee-name">اسم الموظف</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp001">أحمد محمد</SelectItem>
                          <SelectItem value="emp002">فاطمة علي</SelectItem>
                          <SelectItem value="emp003">سارا أحمد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferred-date">التاريخ المفضل</Label>
                      <Input id="preferred-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="preferred-time">الوقت المفضل</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">صباحي (8-12)</SelectItem>
                          <SelectItem value="afternoon">مسائي (2-6)</SelectItem>
                          <SelectItem value="evening">مساء (6-9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="issue-description">وصف الحالة أو المشكلة</Label>
                    <Textarea 
                      id="issue-description" 
                      placeholder="وصف موجز للمشكلة أو الحاجة للدعم (سري ومحمي)" 
                      rows={4} 
                    />
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">ملاحظة هامة:</p>
                        <p>جميع الاستشارات والمعلومات سرية تماماً ومحمية وفقاً لسياسة الخصوصية</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => handleAction('تسجيل طلب الاستشارة', {})}
                    >
                      تسجيل الطلب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mockFamilySupport.map((support) => (
              <Card key={support.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        {support.type === 'استشارة أسرية' && <MessageSquare className="h-5 w-5 text-purple-500" />}
                        {support.type === 'دعم تعليم الأطفال' && <GraduationCap className="h-5 w-5 text-blue-500" />}
                        {support.type === 'برنامج الإسكان' && <Home className="h-5 w-5 text-green-500" />}
                        <div>
                          <h4 className="font-medium">{support.type}</h4>
                          <p className="text-sm text-muted-foreground">{support.employeeName}</p>
                        </div>
                      </div>
                      
                      {/* Type-specific information */}
                      {support.type === 'استشارة أسرية' && (
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">المستشار:</span> {(support as any).counselor}</p>
                          <p><span className="text-muted-foreground">موعد الجلسة:</span> {(support as any).sessionDate}</p>
                          <p><span className="text-muted-foreground">الموضوع:</span> {(support as any).issue}</p>
                          {(support as any).confidential && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Shield className="h-3 w-3" />
                              <span className="text-xs">سري ومحمي</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {support.type === 'دعم تعليم الأطفال' && (
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">اسم الطفل:</span> {(support as any).childName}</p>
                          <p><span className="text-muted-foreground">الصف الدراسي:</span> {(support as any).grade}</p>
                          <p><span className="text-muted-foreground">نوع الدعم:</span> {(support as any).supportType}</p>
                          <p><span className="text-muted-foreground">المبلغ:</span> {(support as any).amount?.toLocaleString()} ر.س</p>
                        </div>
                      )}
                      
                      {support.type === 'برنامج الإسكان' && (
                        <div className="space-y-1 text-sm">
                          <p><span className="text-muted-foreground">نوع السكن:</span> {(support as any).housingType}</p>
                          <p><span className="text-muted-foreground">المبلغ:</span> {(support as any).amount?.toLocaleString()} ر.س</p>
                          <p><span className="text-muted-foreground">المدة:</span> {(support as any).duration}</p>
                          <p><span className="text-muted-foreground">الشريك:</span> {(support as any).partner}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(support.status)}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAction('عرض تفاصيل الدعم', support)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Family Support Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center p-6">
              <MessageSquare className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2">الاستشارات الأسرية</h4>
              <p className="text-2xl font-bold text-purple-600">24</p>
              <p className="text-sm text-muted-foreground">جلسة هذا الشهر</p>
            </Card>
            <Card className="text-center p-6">
              <GraduationCap className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2">دعم التعليم</h4>
              <p className="text-2xl font-bold text-blue-600">18</p>
              <p className="text-sm text-muted-foreground">طالب مستفيد</p>
            </Card>
            <Card className="text-center p-6">
              <Home className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2">دعم الإسكان</h4>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-muted-foreground">أسرة مستفيدة</p>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">التقارير والتحليلات الذكية</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleAction('تحديث البيانات', {})}>
                <RefreshCw className="h-4 w-4 ml-2" />
                تحديث
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAction('تصدير جميع التقارير', {})}>
                <Download className="h-4 w-4 ml-2" />
                تصدير الكل
              </Button>
            </div>
          </div>

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض تقرير الحالات', {})}>
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-[#009F87] mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">تقرير الحالات الاجتماعية</h4>
                <p className="text-sm text-muted-foreground mb-4">تحليل شامل للحالات المسجلة والدعم المقدم</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-[#009F87]">{mockSocialCases.length}</p>
                    <p className="text-muted-foreground">حالة نشطة</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">
                      {mockSocialCases.reduce((sum, c) => sum + c.supportAmount, 0).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">ر.س</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض تقرير المالي', {})}>
              <CardContent className="p-6 text-center">
                <PieChart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">التقرير المالي</h4>
                <p className="text-sm text-muted-foreground mb-4">تحليل الميزانيات والإنفاق على البرامج</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-blue-600">
                      {mockFinancialPrograms.reduce((sum, p) => sum + p.usedAmount, 0).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">ر.س مستخدم</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">
                      {mockFinancialPrograms.reduce((sum, p) => sum + p.availableAmount, 0).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">ر.س متاح</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض تقرير المبادرات', {})}>
              <CardContent className="p-6 text-center">
                <HandHeart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">تقرير المبادرات</h4>
                <p className="text-sm text-muted-foreground mb-4">مؤشرات المشاركة والأثر الاجتماعي</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-purple-600">{mockInitiatives.length}</p>
                    <p className="text-muted-foreground">مبادرة</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-orange-600">
                      {mockInitiatives.reduce((sum, i) => sum + i.participants, 0)}
                    </p>
                    <p className="text-muted-foreground">مشارك</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض تقرير الرضا', {})}>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">تقرير رضا الموظفين</h4>
                <p className="text-sm text-muted-foreground mb-4">قياس مستوى الرضا عن الخدمات الاجتماعية</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-yellow-600">4.8/5</p>
                    <p className="text-muted-foreground">متوسط التقييم</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">95%</p>
                    <p className="text-muted-foreground">نسبة الرضا</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض تقرير الحكومي', {})}>
              <CardContent className="p-6 text-center">
                <Building className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">التقارير الحكومية</h4>
                <p className="text-sm text-muted-foreground mb-4">تقارير جاهزة للجهات الحكومية والرقابية</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-gray-600">5</p>
                    <p className="text-muted-foreground">تقرير شهري</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-blue-600">100%</p>
                    <p className="text-muted-foreground">معدل التوافق</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleAction('عرض التحليلات الذكية', {})}>
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-12 w-12 text-[#009F87] mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">التحليلات الذكية</h4>
                <p className="text-sm text-muted-foreground mb-4">رؤى وتوصيات مدعومة بالذكاء الاصطناعي</p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-[#009F87]">12</p>
                    <p className="text-muted-foreground">توصية</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-purple-600">85%</p>
                    <p className="text-muted-foreground">دقة التنبؤ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#009F87]" />
                الاتجاهات الشهرية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">↑ 25%</p>
                  <p className="text-sm text-muted-foreground">زيادة في الحالات الاجتماعية</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">↑ 15%</p>
                  <p className="text-sm text-muted-foreground">زيادة في المشاركة بالمبادرات</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">↓ 5%</p>
                  <p className="text-sm text-muted-foreground">انخفاض في الشكاوى</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">↑ 30%</p>
                  <p className="text-sm text-muted-foreground">زيادة في الدعم المالي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default SocialServices;