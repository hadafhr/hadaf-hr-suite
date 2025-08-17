import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  GraduationCap,
  BookOpen,
  Video,
  Award,
  Users,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  Star,
  Award as Certificate,
  User,
  BarChart3,
  FileText,
  Laptop,
  Globe
} from 'lucide-react';

interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'soft-skills' | 'compliance' | 'leadership' | 'safety';
  type: 'online' | 'classroom' | 'workshop' | 'seminar' | 'webinar';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  rating: number;
  language: 'ar' | 'en' | 'both';
  price: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  prerequisites: string[];
  learningObjectives: string[];
  materials: string[];
}

interface TrainingEnrollment {
  id: string;
  courseId: string;
  courseName: string;
  employeeId: string;
  employeeName: string;
  department: string;
  enrollmentDate: string;
  startDate: string;
  completionDate?: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped' | 'failed';
  progress: number;
  score?: number;
  certificateIssued: boolean;
  feedback?: string;
  rating?: number;
}

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  employeeId: string;
  employeeName: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl?: string;
  status: 'active' | 'expired' | 'revoked';
}

const TrainingDevelopment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock training courses
  const [trainingCourses] = useState<TrainingCourse[]>([
    {
      id: 'TC001',
      title: 'إدارة المشاريع الاحترافية - PMP',
      description: 'دورة شاملة في إدارة المشاريع وفق معايير PMI العالمية',
      category: 'leadership',
      type: 'classroom',
      level: 'advanced',
      duration: 40,
      instructor: 'د. أحمد محمد السعد',
      maxParticipants: 20,
      currentParticipants: 15,
      rating: 4.8,
      language: 'ar',
      price: 5000,
      startDate: '2024-04-15',
      endDate: '2024-05-15',
      status: 'active',
      prerequisites: ['خبرة 3 سنوات في إدارة المشاريع'],
      learningObjectives: [
        'فهم منهجية إدارة المشاريع',
        'تطبيق أدوات التخطيط والتنفيذ',
        'إدارة المخاطر والجودة'
      ],
      materials: ['كتاب PMBOK', 'أدوات Microsoft Project', 'دراسات حالة']
    },
    {
      id: 'TC002',
      title: 'تطوير تطبيقات الويب باستخدام React',
      description: 'تعلم بناء تطبيقات ويب تفاعلية حديثة',
      category: 'technical',
      type: 'online',
      level: 'intermediate',
      duration: 32,
      instructor: 'م. سارة أحمد الزهراني',
      maxParticipants: 30,
      currentParticipants: 25,
      rating: 4.6,
      language: 'both',
      price: 3000,
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      status: 'active',
      prerequisites: ['معرفة أساسية في JavaScript', 'HTML/CSS'],
      learningObjectives: [
        'إتقان React Hooks',
        'إدارة الحالة مع Redux',
        'بناء تطبيقات متجاوبة'
      ],
      materials: ['كود المشاريع', 'مقاطع فيديو', 'تمارين تطبيقية']
    },
    {
      id: 'TC003',
      title: 'الأمن والسلامة المهنية',
      description: 'دورة إلزامية في معايير الأمن والسلامة',
      category: 'safety',
      type: 'workshop',
      level: 'beginner',
      duration: 8,
      instructor: 'م. خالد عبدالله النمر',
      maxParticipants: 50,
      currentParticipants: 45,
      rating: 4.2,
      language: 'ar',
      price: 500,
      startDate: '2024-04-10',
      endDate: '2024-04-10',
      status: 'completed',
      prerequisites: [],
      learningObjectives: [
        'فهم معايير السلامة المهنية',
        'التعامل مع حالات الطوارئ',
        'استخدام معدات الحماية'
      ],
      materials: ['دليل السلامة', 'معدات الحماية', 'محاكاة للطوارئ']
    }
  ]);

  // Mock enrollments
  const [enrollments] = useState<TrainingEnrollment[]>([
    {
      id: 'EN001',
      courseId: 'TC001',
      courseName: 'إدارة المشاريع الاحترافية - PMP',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      enrollmentDate: '2024-04-01',
      startDate: '2024-04-15',
      status: 'in-progress',
      progress: 65,
      certificateIssued: false,
      rating: 5
    },
    {
      id: 'EN002',
      courseId: 'TC002',
      courseName: 'تطوير تطبيقات الويب باستخدام React',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد الأحمد',
      department: 'تقنية المعلومات',
      enrollmentDate: '2024-03-25',
      startDate: '2024-04-01',
      completionDate: '2024-04-30',
      status: 'completed',
      progress: 100,
      score: 92,
      certificateIssued: true,
      feedback: 'دورة ممتازة وعملية جداً',
      rating: 5
    }
  ]);

  // Mock certifications
  const [certifications] = useState<Certification[]>([
    {
      id: 'CERT001',
      name: 'React Developer Certification',
      issuingOrganization: 'مركز بعد للتدريب',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد الأحمد',
      issueDate: '2024-04-30',
      credentialId: 'REACT-2024-002',
      verificationUrl: 'https://verify.baad.com/react-2024-002',
      status: 'active'
    }
  ]);

  const getStatusBadge = (status: string, type: 'course' | 'enrollment' | 'certification' = 'course') => {
    const configs = {
      course: {
        'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة' },
        'published': { color: 'bg-blue-100 text-blue-800', text: 'منشورة' },
        'active': { color: 'bg-green-100 text-green-800', text: 'نشطة' },
        'completed': { color: 'bg-purple-100 text-purple-800', text: 'مكتملة' },
        'cancelled': { color: 'bg-red-100 text-red-800', text: 'ملغية' }
      },
      enrollment: {
        'enrolled': { color: 'bg-blue-100 text-blue-800', text: 'مسجل' },
        'in-progress': { color: 'bg-orange-100 text-orange-800', text: 'قيد التقدم' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' },
        'dropped': { color: 'bg-gray-100 text-gray-800', text: 'منسحب' },
        'failed': { color: 'bg-red-100 text-red-800', text: 'فاشل' }
      },
      certification: {
        'active': { color: 'bg-green-100 text-green-800', text: 'فعال' },
        'expired': { color: 'bg-red-100 text-red-800', text: 'منتهي الصلاحية' },
        'revoked': { color: 'bg-gray-100 text-gray-800', text: 'ملغي' }
      }
    } as const;

    const typeConfig = configs[type];
    const config = (typeConfig as any)[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'technical': 'bg-blue-100 text-blue-800',
      'soft-skills': 'bg-green-100 text-green-800',
      'compliance': 'bg-red-100 text-red-800',
      'leadership': 'bg-purple-100 text-purple-800',
      'safety': 'bg-orange-100 text-orange-800'
    };
    const labels = {
      'technical': 'تقنية',
      'soft-skills': 'مهارات ناعمة',
      'compliance': 'امتثال',
      'leadership': 'قيادة',
      'safety': 'أمن وسلامة'
    };
    
    return <Badge className={colors[category as keyof typeof colors]}>{labels[category as keyof typeof labels]}</Badge>;
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-red-100 text-red-800'
    };
    const labels = { 'beginner': 'مبتدئ', 'intermediate': 'متوسط', 'advanced': 'متقدم' };
    
    return <Badge className={colors[level as keyof typeof colors]}>{labels[level as keyof typeof labels]}</Badge>;
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const calculateStats = () => {
    return {
      totalCourses: trainingCourses.length,
      activeCourses: trainingCourses.filter(c => c.status === 'active').length,
      totalEnrollments: enrollments.length,
      completedTrainings: enrollments.filter(e => e.status === 'completed').length,
      certificatesIssued: certifications.filter(c => c.status === 'active').length,
      averageRating: trainingCourses.reduce((sum, c) => sum + c.rating, 0) / trainingCourses.length,
      totalTrainingHours: enrollments.reduce((sum, e) => {
        const course = trainingCourses.find(c => c.id === e.courseId);
        return sum + (course ? course.duration : 0);
      }, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <GraduationCap className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام التدريب والتطوير</h1>
            <p className="text-muted-foreground">إدارة شاملة لبرامج التدريب وتطوير المهارات</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <FileText className="h-4 w-4 ml-2" />
            تقرير التدريب
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                <Plus className="h-4 w-4 ml-2" />
                دورة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-[#009F87]">إنشاء دورة تدريبية جديدة</DialogTitle>
                <DialogDescription>أدخل تفاصيل الدورة التدريبية</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>عنوان الدورة</Label>
                    <Input placeholder="مثال: إدارة المشاريع" />
                  </div>
                  <div>
                    <Label>الفئة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">تقنية</SelectItem>
                        <SelectItem value="soft-skills">مهارات ناعمة</SelectItem>
                        <SelectItem value="leadership">قيادة</SelectItem>
                        <SelectItem value="compliance">امتثال</SelectItem>
                        <SelectItem value="safety">أمن وسلامة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>وصف الدورة</Label>
                  <Textarea placeholder="اكتب وصف مفصل للدورة..." />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>النوع</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">عبر الإنترنت</SelectItem>
                        <SelectItem value="classroom">قاعة دراسية</SelectItem>
                        <SelectItem value="workshop">ورشة عمل</SelectItem>
                        <SelectItem value="seminar">ندوة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>المستوى</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">مبتدئ</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="advanced">متقدم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>المدة (ساعة)</Label>
                    <Input type="number" placeholder="24" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    إنشاء الدورة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-7 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.totalCourses}</div>
            <div className="text-sm text-muted-foreground">إجمالي الدورات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.activeCourses}</div>
            <div className="text-sm text-muted-foreground">دورات نشطة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalEnrollments}</div>
            <div className="text-sm text-muted-foreground">إجمالي التسجيلات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.completedTrainings}</div>
            <div className="text-sm text-muted-foreground">تدريبات مكتملة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Certificate className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.certificatesIssued}</div>
            <div className="text-sm text-muted-foreground">شهادات صادرة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">متوسط التقييم</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-teal-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.6s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-600">{stats.totalTrainingHours}</div>
            <div className="text-sm text-muted-foreground">إجمالي ساعات التدريب</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex space-x-1 bg-white/70 backdrop-blur rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
            { id: 'courses', label: 'الدورات التدريبية', icon: BookOpen },
            { id: 'enrollments', label: 'التسجيلات', icon: Users },
            { id: 'certifications', label: 'الشهادات', icon: Certificate },
            { id: 'instructors', label: 'المدربين', icon: User },
            { id: 'learning-paths', label: 'مسارات التعلم', icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#009F87] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'courses' && (
        <div className="relative space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فلترة حسب الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="technical">تقنية</SelectItem>
                <SelectItem value="soft-skills">مهارات ناعمة</SelectItem>
                <SelectItem value="leadership">قيادة</SelectItem>
                <SelectItem value="compliance">امتثال</SelectItem>
                <SelectItem value="safety">أمن وسلامة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {trainingCourses
            .filter(course => selectedCategory === 'all' || course.category === selectedCategory)
            .map((course, index) => (
            <Card 
              key={course.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#009F87]">{course.title}</h3>
                      {getStatusBadge(course.status, 'course')}
                      {getCategoryBadge(course.category)}
                      {getLevelBadge(course.level)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">المدرب:</span>
                        <p className="font-semibold">{course.instructor}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">المدة:</span>
                        <p className="font-semibold">{course.duration} ساعة</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">المشاركين:</span>
                        <p className="font-semibold">{course.currentParticipants}/{course.maxParticipants}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">السعر:</span>
                        <p className="font-semibold text-[#009F87]">{course.price.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">التقييم:</span>
                        {getRatingStars(course.rating)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{course.startDate} - {course.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Edit className="h-4 w-4 ml-2" />
                      تحرير
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Users className="h-4 w-4 ml-2" />
                      إدارة المشاركين
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'enrollments' && (
        <div className="relative space-y-4">
          {enrollments.map((enrollment, index) => (
            <Card 
              key={enrollment.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#009F87]">
                        {enrollment.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{enrollment.employeeName}</h3>
                        {getStatusBadge(enrollment.status, 'enrollment')}
                        <Badge variant="outline">{enrollment.department}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{enrollment.courseName}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>تاريخ التسجيل: {enrollment.enrollmentDate}</span>
                        <span>تاريخ البداية: {enrollment.startDate}</span>
                        {enrollment.completionDate && <span>تاريخ الإكمال: {enrollment.completionDate}</span>}
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>التقدم</span>
                          <span>{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      {enrollment.score && (
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-sm"><strong>النتيجة:</strong> {enrollment.score}%</span>
                          {enrollment.certificateIssued && (
                            <Badge className="bg-green-100 text-green-800">
                              <Certificate className="h-3 w-3 ml-1" />
                              شهادة صادرة
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    {enrollment.status === 'completed' && !enrollment.certificateIssued && (
                      <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                        <Certificate className="h-4 w-4 ml-2" />
                        إصدار شهادة
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="relative space-y-4">
          {certifications.map((cert, index) => (
            <Card 
              key={cert.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#009F87]/10 rounded-lg">
                      <Certificate className="h-8 w-8 text-[#009F87]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#009F87]">{cert.name}</h3>
                        {getStatusBadge(cert.status, 'certification')}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">الموظف:</span>
                          <p className="font-semibold">{cert.employeeName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">الجهة المانحة:</span>
                          <p className="font-semibold">{cert.issuingOrganization}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">تاريخ الإصدار:</span>
                          <p className="font-semibold">{cert.issueDate}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">رقم الاعتماد:</span>
                          <p className="font-semibold font-mono">{cert.credentialId}</p>
                        </div>
                      </div>
                      {cert.verificationUrl && (
                        <div className="mt-3">
                          <a 
                            href={cert.verificationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[#009F87] hover:underline flex items-center gap-1"
                          >
                            <Globe className="h-4 w-4" />
                            رابط التحقق من الشهادة
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Download className="h-4 w-4 ml-2" />
                      تحميل الشهادة
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingDevelopment;