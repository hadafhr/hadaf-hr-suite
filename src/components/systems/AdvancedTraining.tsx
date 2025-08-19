import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  ArrowLeft, BookOpen, Play, Users, Award, Calendar,
  TrendingUp, BarChart3, Clock, CheckCircle2, Star,
  Video, FileText, Download, Plus, Search, Filter,
  Eye, Edit, Brain, Zap, Target, Activity, PieChart
} from 'lucide-react';
import patternBg from '@/assets/boud-pattern-bg.jpg';
import gradientMesh from '@/assets/boud-gradient-mesh.jpg';
import circlesPattern from '@/assets/boud-circles-pattern.jpg';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'leadership' | 'soft-skills' | 'compliance' | 'safety';
  type: 'online' | 'classroom' | 'hybrid' | 'workshop';
  duration: number; // في الساعات
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  price: number;
  rating: number;
  completionRate: number;
}

interface TrainingEnrollment {
  id: string;
  employeeId: string;
  employeeName: string;
  programId: string;
  programTitle: string;
  enrollmentDate: string;
  startDate: string;
  completionDate?: string;
  progress: number;
  status: 'enrolled' | 'inProgress' | 'completed' | 'dropped' | 'failed';
  score?: number;
  certificateIssued: boolean;
  feedback?: string;
}

interface TrainingProps {
  onBack: () => void;
}

export const AdvancedTraining: React.FC<TrainingProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] = useState(false);

  // Mock training programs data
  const trainingPrograms: TrainingProgram[] = [
    {
      id: 'TRN001',
      title: 'تطوير التطبيقات باستخدام React',
      description: 'دورة شاملة لتعلم تطوير التطبيقات الحديثة باستخدام React وأدواته المتقدمة',
      category: 'technical',
      type: 'online',
      duration: 40,
      level: 'intermediate',
      instructor: 'أحمد محمد التقني',
      capacity: 25,
      enrolled: 18,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      status: 'upcoming',
      price: 2500,
      rating: 4.8,
      completionRate: 85
    },
    {
      id: 'TRN002',
      title: 'مهارات القيادة التنفيذية',
      description: 'برنامج تطوير القيادة للمدراء التنفيذيين وقادة الفرق',
      category: 'leadership',
      type: 'hybrid',
      duration: 32,
      level: 'advanced',
      instructor: 'د. فاطمة السالم',
      capacity: 15,
      enrolled: 12,
      startDate: '2024-03-25',
      endDate: '2024-04-25',
      status: 'ongoing',
      price: 4000,
      rating: 4.9,
      completionRate: 92
    },
    {
      id: 'TRN003',
      title: 'إدارة المشاريع الرقمية',
      description: 'دورة متخصصة في إدارة المشاريع التقنية باستخدام المنهجيات الحديثة',
      category: 'technical',
      type: 'classroom',
      duration: 24,
      level: 'intermediate',
      instructor: 'عبدالله المطيري',
      capacity: 20,
      enrolled: 20,
      startDate: '2024-03-15',
      endDate: '2024-04-05',
      status: 'completed',
      price: 3200,
      rating: 4.7,
      completionRate: 88
    }
  ];

  // Mock enrollment data
  const enrollments: TrainingEnrollment[] = [
    {
      id: 'ENR001',
      employeeId: 'EMP001',
      employeeName: 'سارة أحمد العلي',
      programId: 'TRN001',
      programTitle: 'تطوير التطبيقات باستخدام React',
      enrollmentDate: '2024-03-20',
      startDate: '2024-04-01',
      progress: 0,
      status: 'enrolled',
      certificateIssued: false
    },
    {
      id: 'ENR002',
      employeeId: 'EMP002',
      employeeName: 'خالد محمد الزهراني',
      programId: 'TRN002',
      programTitle: 'مهارات القيادة التنفيذية',
      enrollmentDate: '2024-03-15',
      startDate: '2024-03-25',
      progress: 65,
      status: 'inProgress',
      certificateIssued: false
    },
    {
      id: 'ENR003',
      employeeId: 'EMP003',
      employeeName: 'نورا سالم القحطاني',
      programId: 'TRN003',
      programTitle: 'إدارة المشاريع الرقمية',
      enrollmentDate: '2024-03-10',
      startDate: '2024-03-15',
      completionDate: '2024-04-05',
      progress: 100,
      status: 'completed',
      score: 92,
      certificateIssued: true,
      feedback: 'دورة ممتازة ومفيدة جداً في تطوير مهارات إدارة المشاريع'
    }
  ];

  const trainingStats = {
    totalPrograms: 45,
    activePrograms: 12,
    totalEnrollments: 284,
    completedTrainings: 156,
    certificatesIssued: 142,
    averageRating: 4.7,
    completionRate: 87.5,
    totalTrainingHours: 2840
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      technical: { text: 'تقني', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      leadership: { text: 'قيادة', className: 'bg-purple-100 text-purple-800 border-purple-200' },
      'soft-skills': { text: 'مهارات شخصية', className: 'bg-green-100 text-green-800 border-green-200' },
      compliance: { text: 'امتثال', className: 'bg-orange-100 text-orange-800 border-orange-200' },
      safety: { text: 'سلامة', className: 'bg-red-100 text-red-800 border-red-200' }
    };
    return categoryConfig[category as keyof typeof categoryConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { text: 'قادم', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      ongoing: { text: 'جاري', className: 'bg-success/20 text-success border-success/30' },
      completed: { text: 'مكتمل', className: 'bg-primary/20 text-primary border-primary/30' },
      cancelled: { text: 'ملغي', className: 'bg-destructive/20 text-destructive border-destructive/30' },
      enrolled: { text: 'مسجل', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      inProgress: { text: 'قيد التنفيذ', className: 'bg-warning/20 text-warning border-warning/30' },
      dropped: { text: 'منسحب', className: 'bg-gray-100 text-gray-800 border-gray-200' },
      failed: { text: 'راسب', className: 'bg-destructive/20 text-destructive border-destructive/30' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      online: { text: 'عن بُعد', className: 'bg-green-100 text-green-800' },
      classroom: { text: 'حضوري', className: 'bg-blue-100 text-blue-800' },
      hybrid: { text: 'مختلط', className: 'bg-purple-100 text-purple-800' },
      workshop: { text: 'ورشة عمل', className: 'bg-orange-100 text-orange-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const handleEnrollEmployee = () => {
    toast.success('تم تسجيل الموظف في البرنامج التدريبي', {
      description: 'سيتم إرسال تفاصيل البرنامج عبر البريد الإلكتروني'
    });
    setIsEnrollmentDialogOpen(false);
  };

  const handleCreateProgram = () => {
    toast.success('تم إنشاء البرنامج التدريبي بنجاح', {
      description: 'البرنامج جاهز لاستقبال التسجيلات'
    });
    setIsProgramDialogOpen(false);
  };

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${gradientMesh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: '500px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative p-6 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-white/90 backdrop-blur border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 backdrop-blur rounded-xl border border-primary/30">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">نظام التدريب والتطوير المتقدم</h1>
                <p className="text-muted-foreground">منصة شاملة لإدارة البرامج التدريبية وتطوير المواهب</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  برنامج جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-primary">إنشاء برنامج تدريبي جديد</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">عنوان البرنامج</label>
                      <Input placeholder="مثل: دورة إدارة المشاريع" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">الفئة</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">تقني</SelectItem>
                          <SelectItem value="leadership">قيادة</SelectItem>
                          <SelectItem value="soft-skills">مهارات شخصية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">نوع التدريب</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">عن بُعد</SelectItem>
                          <SelectItem value="classroom">حضوري</SelectItem>
                          <SelectItem value="hybrid">مختلط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">المدرب</label>
                      <Input placeholder="اسم المدرب" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">المدة (بالساعات)</label>
                      <Input type="number" placeholder="24" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">السعة القصوى</label>
                      <Input type="number" placeholder="25" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">تاريخ البداية</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">تاريخ النهاية</label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">وصف البرنامج</label>
                  <Textarea placeholder="وصف تفصيلي للبرنامج التدريبي..." rows={4} />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setIsProgramDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateProgram} className="bg-primary hover:bg-primary/90">
                    إنشاء البرنامج
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isEnrollmentDialogOpen} onOpenChange={setIsEnrollmentDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                  <Users className="h-4 w-4 ml-2" />
                  تسجيل موظفين
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur">
                <DialogHeader>
                  <DialogTitle className="text-primary">تسجيل موظف في برنامج تدريبي</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">الموظف</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">سارة أحمد العلي</SelectItem>
                        <SelectItem value="EMP002">خالد محمد الزهراني</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">البرنامج التدريبي</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البرنامج" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainingPrograms.map(program => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">تفاصيل التسجيل</h4>
                    <p className="text-sm text-muted-foreground">
                      سيتم إرسال تفاصيل البرنامج وجدول المحاضرات للموظف عبر البريد الإلكتروني
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setIsEnrollmentDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleEnrollEmployee} className="bg-primary hover:bg-primary/90">
                    تسجيل الموظف
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Comprehensive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">البرامج النشطة</p>
                  <p className="text-3xl font-bold text-primary">{trainingStats.activePrograms}</p>
                  <p className="text-xs text-muted-foreground">من {trainingStats.totalPrograms} برنامج</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur border-success/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي التسجيلات</p>
                  <p className="text-3xl font-bold text-success">{trainingStats.totalEnrollments}</p>
                  <div className="flex items-center text-xs text-success mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +18% من الشهر الماضي
                  </div>
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <Users className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">معدل الإكمال</p>
                  <p className="text-3xl font-bold text-blue-600">{trainingStats.completionRate}%</p>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${trainingStats.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-warning/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الشهادات الصادرة</p>
                  <p className="text-3xl font-bold text-warning">{trainingStats.certificatesIssued}</p>
                  <div className="flex items-center text-xs mt-1">
                    <Award className="h-3 w-3 text-warning ml-1" />
                    <span>شهادة معتمدة</span>
                  </div>
                </div>
                <div className="p-3 bg-warning/20 rounded-lg">
                  <Award className="h-8 w-8 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="programs" className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-primary/20">
            <TabsList className="grid w-full grid-cols-5 bg-primary/10">
              <TabsTrigger value="programs" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                البرامج التدريبية
              </TabsTrigger>
              <TabsTrigger value="enrollments" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التسجيلات
              </TabsTrigger>
              <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                الشهادات
              </TabsTrigger>
              <TabsTrigger value="instructors" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                المدربين
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التحليلات
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="programs" className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في البرامج التدريبية..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur border-primary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="technical">تقني</SelectItem>
                    <SelectItem value="leadership">قيادة</SelectItem>
                    <SelectItem value="soft-skills">مهارات شخصية</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </div>
            </div>

            {/* Enhanced Programs List */}
            <div className="space-y-6">
              {filteredPrograms.map((program) => {
                const categoryBadge = getCategoryBadge(program.category);
                const statusBadge = getStatusBadge(program.status);
                const typeBadge = getTypeBadge(program.type);
                
                return (
                  <Card key={program.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        {/* Program Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {program.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Badge className={categoryBadge.className}>
                                  {categoryBadge.text}
                                </Badge>
                                <Badge className={typeBadge.className}>
                                  {typeBadge.text}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Program Details */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>المدرب: {program.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{program.duration} ساعة تدريبية</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{program.startDate} - {program.endDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>المستوى: {
                              program.level === 'beginner' ? 'مبتدئ' :
                              program.level === 'intermediate' ? 'متوسط' : 'متقدم'
                            }</span>
                          </div>
                        </div>

                        {/* Enrollment Info */}
                        <div className="space-y-3">
                          <div className="text-center p-3 bg-success/10 rounded-lg">
                            <div className="text-2xl font-bold text-success">
                              {program.enrolled}/{program.capacity}
                            </div>
                            <div className="text-xs text-muted-foreground">المسجلين</div>
                            <Progress 
                              value={(program.enrolled / program.capacity) * 100} 
                              className="mt-2 h-2" 
                            />
                          </div>
                          <Badge className={statusBadge.className + ' w-full justify-center'}>
                            {statusBadge.text}
                          </Badge>
                        </div>

                        {/* Rating & Stats */}
                        <div className="space-y-3">
                          <div className="text-center p-3 bg-warning/10 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(program.rating) ? 'text-warning fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <div className="text-lg font-bold text-warning">{program.rating}</div>
                            <div className="text-xs text-muted-foreground">تقييم المتدربين</div>
                          </div>
                          <div className="text-center text-sm">
                            <div className="font-medium text-primary">{program.price.toLocaleString()} ر.س</div>
                            <div className="text-xs text-muted-foreground">تكلفة البرنامج</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedProgram(program)}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="h-4 w-4 ml-2" />
                            تعديل البرنامج
                          </Button>
                          {program.status === 'upcoming' && (
                            <Button size="sm" className="w-full bg-success hover:bg-success/90">
                              <Play className="h-4 w-4 ml-2" />
                              بدء البرنامج
                            </Button>
                          )}
                          {program.type === 'online' && (
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                              <Video className="h-4 w-4 ml-2" />
                              دخول القاعة
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="enrollments">
            <div className="space-y-4">
              {enrollments.map((enrollment) => {
                const statusBadge = getStatusBadge(enrollment.status);
                
                return (
                  <Card key={enrollment.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-lg">{enrollment.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">{enrollment.programTitle}</p>
                          <div className="text-xs text-primary mt-1">
                            تاريخ التسجيل: {enrollment.enrollmentDate}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{enrollment.progress}%</div>
                          <Progress value={enrollment.progress} className="mt-2" />
                          <div className="text-xs text-muted-foreground mt-1">نسبة الإكمال</div>
                        </div>
                        
                        <div className="text-center">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          {enrollment.score && (
                            <div className="mt-2">
                              <div className="text-lg font-bold text-success">{enrollment.score}%</div>
                              <div className="text-xs text-muted-foreground">النتيجة النهائية</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التقدم
                          </Button>
                          {enrollment.certificateIssued && (
                            <Button size="sm" className="bg-warning hover:bg-warning/90">
                              <Award className="h-4 w-4 ml-2" />
                              تحميل الشهادة
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {enrollment.feedback && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <div className="text-sm text-blue-800">
                            <strong>تقييم المتدرب:</strong> {enrollment.feedback}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-warning" />
                    الشهادات الصادرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-warning mb-2">{trainingStats.certificatesIssued}</div>
                    <p className="text-sm text-muted-foreground">شهادة معتمدة</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    قوالب الشهادات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <p className="text-sm text-muted-foreground">إدارة قوالب الشهادات</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    التحقق من الشهادات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-success mb-4" />
                    <p className="text-sm text-muted-foreground">نظام التحقق الإلكتروني</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="instructors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['د. فاطمة السالم', 'أحمد محمد التقني', 'عبدالله المطيري'].map((instructor, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{instructor}</h3>
                    <p className="text-sm text-muted-foreground mb-4">مدرب خبير</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xl font-bold text-primary">4.{8 + index}</div>
                        <div className="text-xs text-muted-foreground">التقييم</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-success">{12 + index * 3}</div>
                        <div className="text-xs text-muted-foreground">البرامج</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    إحصائيات الأداء التدريبي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">معدل حضور البرامج</span>
                        <span className="text-sm font-bold">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">رضا المتدربين</span>
                        <span className="text-sm font-bold">4.7/5</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">فعالية التدريب</span>
                        <span className="text-sm font-bold">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-success" />
                    توزيع البرامج التدريبية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">البرامج التقنية</span>
                      <span className="text-xl font-bold text-blue-600">40%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">برامج القيادة</span>
                      <span className="text-xl font-bold text-purple-600">30%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">المهارات الشخصية</span>
                      <span className="text-xl font-bold text-green-600">20%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">برامج أخرى</span>
                      <span className="text-xl font-bold text-orange-600">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};