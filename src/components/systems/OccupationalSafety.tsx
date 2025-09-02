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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  HardHat, 
  Shield, 
  AlertTriangle, 
  FileText, 
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
  XCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Target,
  Settings,
  Bell,
  BookOpen,
  Brain,
  Stethoscope,
  ClipboardCheck,
  Upload,
  Send,
  MessageSquare,
  Zap,
  Award,
  Camera,
  Phone,
  Mail,
  User,
  Building,
  UserCheck,
  Timer,
  Trash2,
  RefreshCw,
  Star
} from 'lucide-react';

const OccupationalSafety = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [selectedRisk, setSelectedRisk] = useState<any>(null);
  const { toast } = useToast();

  // Comprehensive Mock Data
  const mockIncidents = [
    {
      id: 'INC001',
      title: 'انزلاق في المختبر',
      type: 'حادث',
      severity: 'متوسط',
      location: 'المختبر الرئيسي - الطابق الثاني',
      date: '2024-01-15',
      time: '10:30',
      reporter: 'أحمد محمد',
      reporterPosition: 'فني مختبر',
      status: 'تحت التحقيق',
      description: 'انزلاق موظف بسبب أرضية مبللة بالقرب من حوض الغسيل',
      witnesses: ['سارة أحمد', 'محمد علي'],
      medicalAttention: true,
      workDaysLost: 2,
      cost: 1500,
      rootCause: 'عدم وضع علامات تحذيرية',
      correctiveActions: 'تركيب علامات تحذيرية وتحسين نظام التصريف',
      photos: ['photo1.jpg', 'photo2.jpg'],
      documents: ['medical_report.pdf', 'incident_form.pdf']
    },
    {
      id: 'INC002', 
      title: 'تسرب كيميائي بسيط',
      type: 'شبه حادث',
      severity: 'منخفض',
      location: 'المخزن - القسم الكيميائي',
      date: '2024-01-10',
      time: '14:15',
      reporter: 'فاطمة علي',
      reporterPosition: 'مسؤولة المخزن',
      status: 'مغلق',
      description: 'تسرب بسيط من عبوة كيميائية بسبب تلف الغطاء',
      witnesses: ['خالد محمد'],
      medicalAttention: false,
      workDaysLost: 0,
      cost: 200,
      rootCause: 'تلف في الغطاء بسبب التخزين غير السليم',
      correctiveActions: 'استبدال العبوة وتحسين طرق التخزين',
      photos: ['chemical_leak.jpg'],
      documents: ['cleanup_report.pdf']
    },
    {
      id: 'INC003',
      title: 'إصابة بجرح بسيط',
      type: 'حادث',
      severity: 'منخفض',
      location: 'ورشة الصيانة',
      date: '2024-01-20',
      time: '09:45',
      reporter: 'عمر حسن',
      reporterPosition: 'فني صيانة',
      status: 'مكتمل',
      description: 'جرح بسيط في اليد أثناء استخدام أداة حادة',
      witnesses: ['أحمد سالم'],
      medicalAttention: true,
      workDaysLost: 0,
      cost: 100,
      rootCause: 'عدم استخدام قفازات الحماية',
      correctiveActions: 'التأكيد على استخدام معدات الحماية',
      photos: ['injury.jpg'],
      documents: ['first_aid_report.pdf']
    }
  ];

  const mockPolicies = [
    {
      id: 'POL001',
      title: 'سياسة السلامة العامة',
      category: 'السلامة العامة',
      version: '2.1',
      effectiveDate: '2024-01-01',
      reviewDate: '2024-12-31',
      approvedBy: 'المدير العام',
      status: 'نشط',
      readBy: 145,
      totalEmployees: 200,
      description: 'السياسة الأساسية للسلامة والصحة المهنية في المنشأة',
      document: 'safety_policy_v2.1.pdf',
      acknowledgments: [
        { employee: 'أحمد محمد', date: '2024-01-15', position: 'مهندس' },
        { employee: 'فاطمة علي', date: '2024-01-16', position: 'محاسبة' }
      ]
    },
    {
      id: 'POL002',
      title: 'إجراءات الطوارئ والإخلاء',
      category: 'الطوارئ',
      version: '1.5',
      effectiveDate: '2024-01-15',
      reviewDate: '2024-06-15',
      approvedBy: 'مدير السلامة',
      status: 'نشط',
      readBy: 178,
      totalEmployees: 200,
      description: 'الإجراءات المتبعة في حالات الطوارئ وخطط الإخلاء',
      document: 'emergency_procedures_v1.5.pdf',
      acknowledgments: []
    }
  ];

  const mockTrainings = [
    {
      id: 'TRN001',
      title: 'السلامة في بيئة العمل',
      type: 'إجباري',
      category: 'السلامة العامة',
      duration: '4 ساعات',
      instructor: 'د. محمد الأحمد',
      instructorQualifications: 'دكتوراه في السلامة المهنية',
      participants: 25,
      maxParticipants: 30,
      date: '2024-02-01',
      time: '09:00-13:00',
      location: 'قاعة التدريب الرئيسية',
      status: 'مجدول',
      objectives: [
        'فهم أساسيات السلامة المهنية',
        'التعرف على المخاطر الشائعة',
        'تطبيق إجراءات السلامة'
      ],
      materials: ['عرض تقديمي', 'كتيب السلامة', 'فيديو توضيحي'],
      assessment: true,
      certificate: true,
      cost: 5000,
      feedback: []
    },
    {
      id: 'TRN002',
      title: 'استخدام معدات الحماية الشخصية',
      type: 'إجباري',
      category: 'معدات الحماية',
      duration: '2 ساعة',
      instructor: 'أ. سارة محمد',
      instructorQualifications: 'خبيرة سلامة معتمدة',
      participants: 15,
      maxParticipants: 20,
      date: '2024-01-25',
      time: '10:00-12:00',
      location: 'ورشة التدريب العملي',
      status: 'مكتمل',
      objectives: [
        'التعرف على أنواع معدات الحماية',
        'الاستخدام الصحيح للمعدات',
        'صيانة وفحص المعدات'
      ],
      materials: ['عينات من المعدات', 'دليل المستخدم'],
      assessment: true,
      certificate: true,
      cost: 2000,
      feedback: [
        { participant: 'أحمد علي', rating: 5, comment: 'تدريب ممتاز وعملي' },
        { participant: 'فاطمة سالم', rating: 4, comment: 'مفيد جداً' }
      ]
    }
  ];

  const mockMedicalExams = [
    {
      id: 'MED001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد',
      position: 'فني مختبر',
      department: 'المختبرات',
      examType: 'فحص دوري سنوي',
      scheduledDate: '2024-02-01',
      completedDate: null,
      status: 'مجدول',
      clinic: 'مركز الفحوص الطبية المتقدم',
      doctor: 'د. سامي الأحمد',
      tests: ['فحص الدم الشامل', 'فحص الأشعة', 'فحص العيون', 'فحص السمع'],
      results: null,
      recommendations: null,
      restrictions: null,
      nextExamDate: '2025-02-01',
      cost: 800,
      notes: 'فحص أولي للموظف الجديد'
    },
    {
      id: 'MED002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة علي',
      position: 'محاسبة',
      department: 'المالية',
      examType: 'فحص دوري سنوي',
      scheduledDate: '2024-01-15',
      completedDate: '2024-01-15',
      status: 'مكتمل',
      clinic: 'مركز الفحوص الطبية المتقدم',
      doctor: 'د. ليلى محمد',
      tests: ['فحص الدم الشامل', 'فحص العيون'],
      results: 'طبيعي',
      recommendations: 'الحفاظ على النشاط البدني',
      restrictions: 'لا توجد',
      nextExamDate: '2025-01-15',
      cost: 600,
      notes: 'نتائج ممتازة'
    }
  ];

  const mockRisks = [
    {
      id: 'RISK001',
      title: 'مخاطر كيميائية في المختبر',
      category: 'كيميائية',
      area: 'المختبر الرئيسي',
      description: 'التعرض للمواد الكيميائية الخطرة',
      probabilityScore: 3,
      impactScore: 4,
      riskScore: 12,
      riskLevel: 'عالي',
      identifiedBy: 'مهندس السلامة',
      identifiedDate: '2024-01-10',
      status: 'تحت المعالجة',
      controlMeasures: [
        'استخدام خزانات الأبخرة',
        'توفير معدات الحماية الشخصية',
        'التدريب على التعامل الآمن'
      ],
      monitoringFrequency: 'أسبوعي',
      responsiblePerson: 'أحمد السلامة',
      targetDate: '2024-03-01',
      cost: 15000,
      progress: 60
    },
    {
      id: 'RISK002',
      title: 'مخاطر الانزلاق والسقوط',
      category: 'فيزيائية',
      area: 'الممرات والمداخل',
      description: 'الأرضيات المبللة والأسطح الزلقة',
      probabilityScore: 4,
      impactScore: 3,
      riskScore: 12,
      riskLevel: 'عالي',
      identifiedBy: 'فريق السلامة',
      identifiedDate: '2024-01-05',
      status: 'مكتمل',
      controlMeasures: [
        'تركيب علامات تحذيرية',
        'استخدام أسطح غير زلقة',
        'التنظيف المنتظم والتجفيف'
      ],
      monitoringFrequency: 'يومي',
      responsiblePerson: 'سارة النظافة',
      targetDate: '2024-02-01',
      cost: 5000,
      progress: 100
    }
  ];

  const mockAIResponses = [
    'مرحباً! كيف يمكنني مساعدتك في مسائل السلامة المهنية؟',
    'بناءً على تحليل البيانات، أنصح بزيادة التدريب على السلامة في قسم المختبرات.',
    'تم رصد زيادة في الحوادث البسيطة. يُنصح بمراجعة إجراءات السلامة.',
    'جميع الفحوص الطبية الدورية مكتملة لهذا الشهر - أداء ممتاز!',
    'تذكير: يوجد 3 موظفين لم يجروا الفحص الطبي الدوري المطلوب.'
  ];

  const mockInspections = [
    {
      id: 'INS001',
      area: 'المختبرات',
      inspector: 'مهندس السلامة',
      date: '2024-01-20',
      score: 85,
      status: 'مكتمل',
      findings: 3,
      corrective_actions: 1
    },
    {
      id: 'INS002',
      area: 'المكاتب الإدارية', 
      inspector: 'فريق السلامة',
      date: '2024-01-18',
      score: 92,
      status: 'مكتمل',
      findings: 1,
      corrective_actions: 0
    },
    {
      id: 'INS003',
      area: 'ورشة الصيانة',
      inspector: 'خبير السلامة',
      date: '2024-01-22',
      score: 78,
      status: 'تحت المراجعة',
      findings: 5,
      corrective_actions: 2
    }
  ];

  // Helper Functions
  const handleIncidentAction = (action: string, incident: any) => {
    toast({
      title: "تم تنفيذ الإجراء",
      description: `تم ${action} للحادث ${incident.id}`,
    });
  };

  const handleAIChat = () => {
    if (!chatMessage.trim()) return;
    
    const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
    toast({
      title: "مساعد الذكاء الاصطناعي",
      description: randomResponse,
    });
    setChatMessage('');
  };

  const handleTrainingAction = (action: string, training: any) => {
    toast({
      title: "تم تنفيذ الإجراء",
      description: `تم ${action} للبرنامج التدريبي ${training.id}`,
    });
  };

  const handleInspectionAction = (action: string, inspection: any) => {
    toast({
      title: "تم تنفيذ الإجراء", 
      description: `تم ${action} لتقرير التفتيش ${inspection.id}`,
    });
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <Badge className={severityConfig[severity as keyof typeof severityConfig] || 'bg-gray-100 text-gray-800'}>
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'مجدول': 'bg-blue-100 text-blue-800 border-blue-200',
      'مكتمل': 'bg-green-100 text-green-800 border-green-200',
      'تحت التحقيق': 'bg-orange-100 text-orange-800 border-orange-200',
      'مغلق': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Assistant */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <HardHat className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#009F87]">نظام الصحة والسلامة المهنية</h2>
            <p className="text-muted-foreground">نظام مؤتمت وذكي لإدارة شاملة للسلامة والصحة المهنية</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setAiChatOpen(!aiChatOpen)}>
            <Brain className="h-4 w-4 ml-2" />
            المساعد الذكي
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleIncidentAction('تصدير التقارير', {})}>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                <Plus className="h-4 w-4 ml-2" />
                إضافة حادث
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#009F87]" />
                  إبلاغ عن حادث جديد
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="incident-title">عنوان الحادث</Label>
                    <Input id="incident-title" placeholder="وصف مختصر للحادث" />
                  </div>
                  <div>
                    <Label htmlFor="incident-type">نوع الحادث</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الحادث" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accident">حادث</SelectItem>
                        <SelectItem value="near-miss">شبه حادث</SelectItem>
                        <SelectItem value="unsafe-condition">حالة غير آمنة</SelectItem>
                        <SelectItem value="unsafe-behavior">سلوك غير آمن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="severity">شدة الحادث</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الشدة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">الموقع</Label>
                    <Input id="location" placeholder="موقع الحادث" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">وصف الحادث</Label>
                  <Textarea id="description" placeholder="وصف تفصيلي للحادث والظروف المحيطة" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button 
                    className="bg-[#009F87] hover:bg-[#009F87]/90"
                    onClick={() => {
                      toast({
                        title: "تم إرسال التقرير",
                        description: "تم إرسال تقرير الحادث بنجاح وسيتم مراجعته",
                      });
                    }}
                  >
                    إرسال التقرير
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Chat Panel */}
      {aiChatOpen && (
        <Card className="border-2 border-[#009F87]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#009F87]" />
              المساعد الذكي للسلامة المهنية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="اسأل عن أي مسألة تتعلق بالسلامة المهنية..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
                className="flex-1"
              />
              <Button onClick={handleAIChat} className="bg-[#009F87] hover:bg-[#009F87]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>يمكنني مساعدتك في:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>تحليل تقارير الحوادث واقتراح حلول وقائية</li>
                <li>الإجابة على أسئلة الحقوق في حالة الإصابة</li>
                <li>معلومات عن الإجازات المرضية</li>
                <li>التزامات المنشأة وفقاً لنظام العمل السعودي</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            السياسات والإجراءات
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            الحوادث والإصابات
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            الفحوص الطبية
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            التدريب والتوعية
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            إدارة المخاطر
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#009F87]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  إجمالي الحوادث
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#009F87]">3</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↓ 40%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  أيام بدون حوادث
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">15</div>
                <p className="text-xs text-muted-foreground">
                  الهدف: 30 يوم
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  التدريبات المكتملة
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 100%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  نسبة الامتثال
                  <Target className="h-4 w-4 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">87%</div>
                <p className="text-xs text-muted-foreground">
                  الهدف: 95%
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
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>تم الإبلاغ عن حادث في المختبر</span>
                  <span className="text-muted-foreground mr-auto">منذ ساعتين</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>اكتمل تدريب السلامة للقسم الثاني</span>
                  <span className="text-muted-foreground mr-auto">أمس</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>تم جدولة فحص طبي لـ 5 موظفين</span>
                  <span className="text-muted-foreground mr-auto">منذ 3 أيام</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#009F87]" />
                  التنبيهات الذكية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-800">3 موظفين لم يجروا الفحص الطبي الدوري</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm text-blue-800">حان موعد مراجعة سياسة السلامة العامة</p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm text-green-800">تم تطبيق جميع الإجراءات التصحيحية للمخاطر</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الحوادث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => handleIncidentAction('تصفية', {})}>
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{incident.title}</h3>
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {incident.id}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {incident.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {incident.reporter}
                        </div>
                      </div>
                      <p className="text-sm">{incident.description}</p>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('عرض', incident)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('تعديل', incident)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('تحميل التقرير', incident)}
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
    </div>
  );
};

export default OccupationalSafety;

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">إدارة السياسات والإجراءات</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة سياسة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#009F87]" />
                    إضافة سياسة جديدة
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="policy-title">عنوان السياسة</Label>
                      <Input id="policy-title" placeholder="عنوان السياسة" />
                    </div>
                    <div>
                      <Label htmlFor="policy-category">الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">السلامة العامة</SelectItem>
                          <SelectItem value="emergency">الطوارئ</SelectItem>
                          <SelectItem value="equipment">معدات الحماية</SelectItem>
                          <SelectItem value="chemical">السلامة الكيميائية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="policy-description">وصف السياسة</Label>
                    <Textarea id="policy-description" placeholder="وصف تفصيلي للسياسة" rows={4} />
                  </div>
                  <div>
                    <Label htmlFor="policy-document">رفع الوثيقة</Label>
                    <Input id="policy-document" type="file" accept=".pdf,.doc,.docx" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => {
                        toast({
                          title: "تم إضافة السياسة",
                          description: "تم إضافة السياسة بنجاح وسيتم إرسالها للموافقة",
                        });
                      }}
                    >
                      حفظ السياسة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockPolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{policy.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{policy.category}</Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200">v{policy.version}</Badge>
                        {getStatusBadge(policy.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          ساري من {policy.effectiveDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {policy.readBy}/{policy.totalEmployees} قرأوا
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          اعتمد بواسطة {policy.approvedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          مراجعة في {policy.reviewDate}
                        </div>
                      </div>
                      <p className="text-sm">{policy.description}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(policy.readBy / policy.totalEmployees) * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {Math.round((policy.readBy / policy.totalEmployees) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('عرض السياسة', policy)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('تحميل السياسة', policy)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('إرسال للموظفين', policy)}
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

        {/* Medical Examinations Tab */}
        <TabsContent value="medical" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">الفحوص الطبية الدورية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  جدولة فحص طبي
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-[#009F87]" />
                    جدولة فحص طبي جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employee-select">اختيار الموظف</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموظف" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp1">أحمد محمد - فني مختبر</SelectItem>
                          <SelectItem value="emp2">فاطمة علي - محاسبة</SelectItem>
                          <SelectItem value="emp3">محمد سالم - مهندس</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="exam-type">نوع الفحص</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الفحص" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="annual">فحص دوري سنوي</SelectItem>
                          <SelectItem value="pre-employment">فحص قبل التوظيف</SelectItem>
                          <SelectItem value="periodic">فحص دوري</SelectItem>
                          <SelectItem value="special">فحص خاص</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exam-date">تاريخ الفحص</Label>
                      <Input id="exam-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="clinic">المركز الطبي</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المركز الطبي" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="center1">مركز الفحوص الطبية المتقدم</SelectItem>
                          <SelectItem value="center2">مستشفى الملك فهد</SelectItem>
                          <SelectItem value="center3">المجمع الطبي التخصصي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tests">الفحوصات المطلوبة</Label>
                    <div className="space-y-2 mt-2">
                      {['فحص الدم الشامل', 'فحص الأشعة', 'فحص العيون', 'فحص السمع', 'تخطيط القلب'].map((test) => (
                        <div key={test} className="flex items-center space-x-2">
                          <input type="checkbox" id={test} className="rounded" />
                          <Label htmlFor={test} className="text-sm">{test}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => {
                        toast({
                          title: "تم جدولة الفحص",
                          description: "تم جدولة الفحص الطبي بنجاح وسيتم إرسال التنبيهات",
                        });
                      }}
                    >
                      جدولة الفحص
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockMedicalExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{exam.employeeName}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{exam.position}</Badge>
                        {getStatusBadge(exam.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Stethoscope className="h-4 w-4" />
                          {exam.examType}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exam.scheduledDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {exam.clinic}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {exam.doctor}
                        </div>
                      </div>
                      <div className="text-sm">
                        <p><strong>الفحوصات:</strong> {exam.tests.join(', ')}</p>
                        {exam.results && <p><strong>النتائج:</strong> {exam.results}</p>}
                        {exam.recommendations && <p><strong>التوصيات:</strong> {exam.recommendations}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('عرض التفاصيل', exam)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('إرسال تذكير', exam)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      {exam.status === 'مكتمل' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleIncidentAction('تحميل التقرير', exam)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risk Management Tab */}
        <TabsContent value="risks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">إدارة المخاطر</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مخاطرة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#009F87]" />
                    إضافة مخاطرة جديدة
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="risk-title">عنوان المخاطرة</Label>
                      <Input id="risk-title" placeholder="وصف المخاطرة" />
                    </div>
                    <div>
                      <Label htmlFor="risk-category">فئة المخاطرة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chemical">كيميائية</SelectItem>
                          <SelectItem value="physical">فيزيائية</SelectItem>
                          <SelectItem value="biological">بيولوجية</SelectItem>
                          <SelectItem value="ergonomic">بيئة العمل</SelectItem>
                          <SelectItem value="psychosocial">نفسية واجتماعية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="risk-area">المنطقة المتأثرة</Label>
                      <Input id="risk-area" placeholder="موقع المخاطرة" />
                    </div>
                    <div>
                      <Label htmlFor="responsible-person">المسؤول عن المعالجة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المسؤول" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="safety-eng">مهندس السلامة</SelectItem>
                          <SelectItem value="facility-mgr">مدير المرافق</SelectItem>
                          <SelectItem value="dept-mgr">مدير القسم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="risk-description">وصف المخاطرة</Label>
                    <Textarea id="risk-description" placeholder="وصف تفصيلي للمخاطرة" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="probability">احتمالية الحدوث (1-5)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الاحتمالية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - منخفض جداً</SelectItem>
                          <SelectItem value="2">2 - منخفض</SelectItem>
                          <SelectItem value="3">3 - متوسط</SelectItem>
                          <SelectItem value="4">4 - عالي</SelectItem>
                          <SelectItem value="5">5 - عالي جداً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="impact">شدة التأثير (1-5)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر شدة التأثير" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - ضعيف</SelectItem>
                          <SelectItem value="2">2 - بسيط</SelectItem>
                          <SelectItem value="3">3 - متوسط</SelectItem>
                          <SelectItem value="4">4 - خطير</SelectItem>
                          <SelectItem value="5">5 - كارثي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => {
                        toast({
                          title: "تم إضافة المخاطرة",
                          description: "تم إضافة المخاطرة بنجاح وسيتم تقييمها",
                        });
                      }}
                    >
                      حفظ المخاطرة
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockRisks.map((risk) => (
              <Card key={risk.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{risk.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{risk.category}</Badge>
                        <Badge className={
                          risk.riskLevel === 'عالي' ? 'bg-red-100 text-red-800 border-red-200' :
                          risk.riskLevel === 'متوسط' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }>
                          {risk.riskLevel} ({risk.riskScore})
                        </Badge>
                        {getStatusBadge(risk.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {risk.area}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {risk.responsiblePerson}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          الهدف: {risk.targetDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          {risk.progress}% مكتمل
                        </div>
                      </div>
                      <p className="text-sm">{risk.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">التقدم:</span>
                          <Progress value={risk.progress} className="flex-1" />
                          <span className="text-sm text-muted-foreground">{risk.progress}%</span>
                        </div>
                        <div className="text-sm">
                          <strong>إجراءات التحكم:</strong>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground">
                            {risk.controlMeasures.map((measure, index) => (
                              <li key={index}>{measure}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('عرض التفاصيل', risk)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('تحديث التقدم', risk)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleIncidentAction('تقرير المخاطرة', risk)}
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

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">برامج التدريب والتوعية</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة برنامج تدريبي
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#009F87]" />
                    إضافة برنامج تدريبي جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="training-title">عنوان البرنامج</Label>
                      <Input id="training-title" placeholder="عنوان البرنامج التدريبي" />
                    </div>
                    <div>
                      <Label htmlFor="training-type">نوع التدريب</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mandatory">إجباري</SelectItem>
                          <SelectItem value="optional">اختياري</SelectItem>
                          <SelectItem value="refresher">تنشيطي</SelectItem>
                          <SelectItem value="specialized">متخصص</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="training-instructor">المدرب</Label>
                      <Input id="training-instructor" placeholder="اسم المدرب" />
                    </div>
                    <div>
                      <Label htmlFor="training-duration">المدة</Label>
                      <Input id="training-duration" placeholder="مثال: 4 ساعات" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="training-date">تاريخ التدريب</Label>
                      <Input id="training-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="training-location">الموقع</Label>
                      <Input id="training-location" placeholder="قاعة التدريب" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="training-objectives">أهداف التدريب</Label>
                    <Textarea id="training-objectives" placeholder="الأهداف التعليمية للبرنامج" rows={3} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="assessment-required" className="rounded" />
                    <Label htmlFor="assessment-required" className="text-sm">يتطلب تقييم</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="certificate-issued" className="rounded" />
                    <Label htmlFor="certificate-issued" className="text-sm">إصدار شهادة</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button 
                      className="bg-[#009F87] hover:bg-[#009F87]/90"
                      onClick={() => {
                        toast({
                          title: "تم إضافة البرنامج",
                          description: "تم إضافة البرنامج التدريبي بنجاح",
                        });
                      }}
                    >
                      حفظ البرنامج
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockTrainings.map((training) => (
              <Card key={training.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{training.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{training.type}</Badge>
                        {getStatusBadge(training.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {training.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {training.participants}/{training.maxParticipants} مشارك
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {training.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {training.location}
                        </div>
                      </div>
                      <div className="text-sm">
                        <p><strong>المدرب:</strong> {training.instructor} - {training.instructorQualifications}</p>
                        <p><strong>الأهداف:</strong> {training.objectives.join(', ')}</p>
                        <p><strong>المواد:</strong> {training.materials.join(', ')}</p>
                      </div>
                      {training.feedback.length > 0 && (
                        <div className="text-sm">
                          <strong>تقييمات المشاركين:</strong>
                          <div className="mt-1 space-y-1">
                            {training.feedback.map((feedback, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-muted-foreground">- {feedback.participant}: {feedback.comment}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTrainingAction('عرض التفاصيل', training)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTrainingAction('تعديل البرنامج', training)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {training.status === 'مكتمل' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTrainingAction('تحميل التقرير', training)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OccupationalSafety;