import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LiveStreamInterface } from '@/components/training/LiveStreamInterface';
import { 
  BookOpen, Users, Clock, Search, Plus, Award, ArrowLeft, Edit2, Trash2,
  Bot, Settings, FileText, BarChart3, PieChart, Calendar, Eye, Filter,
  User, Globe, Video, Download, Upload, CheckCircle, X, Save, Star
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  instructor: string;
  duration: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  startDate: string;
  endDate: string;
  format: 'online' | 'offline' | 'hybrid';
  price?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating?: number;
}

interface Enrollment {
  id: string;
  employeeName: string;
  employeeId: string;
  courseTitle: string;
  enrollmentDate: string;
  progress: number;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  department: string;
  completionDate?: string;
  grade?: number;
}

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  rating: number;
  status: 'active' | 'inactive';
  bio: string;
  coursesCount: number;
  studentsCount: number;
  joinDate: string;
}

interface Certificate {
  id: string;
  employeeName: string;
  employeeId: string;
  courseTitle: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  status: 'active' | 'expired' | 'revoked';
  grade: number;
  instructorName: string;
}

interface Schedule {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  type: 'lecture' | 'lab' | 'exam' | 'workshop';
  instructor: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  attendees: number;
  maxCapacity: number;
}

interface Evaluation {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  evaluationType: 'quiz' | 'assignment' | 'final_exam' | 'project';
  grade: number;
  maxGrade: number;
  feedback: string;
  evaluationDate: string;
  instructor: string;
}

interface DigitalContent {
  id: string;
  title: string;
  courseId: string;
  type: 'video' | 'pdf' | 'presentation' | 'interactive';
  url: string;
  duration?: string;
  size: string;
  uploadDate: string;
  downloads: number;
  status: 'active' | 'inactive';
}

interface ComprehensiveTrainingProps {
  onBack?: () => void;
}

export const ComprehensiveTraining: React.FC<ComprehensiveTrainingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showEvaluationDialog, setShowEvaluationDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    englishTitle: '',
    description: '',
    instructor: '',
    duration: '',
    capacity: 20,
    category: '',
    startDate: '',
    endDate: '',
    format: 'online',
    level: 'beginner',
    price: 0
  });
  const [newInstructor, setNewInstructor] = useState<Partial<Instructor>>({
    name: '',
    email: '',
    phone: '',
    specialization: [],
    experience: 0,
    bio: '',
    status: 'active'
  });
  const [newEnrollment, setNewEnrollment] = useState({
    employeeName: '',
    employeeId: '',
    courseId: '',
    department: ''
  });
  const [newSchedule, setNewSchedule] = useState({
    courseId: '',
    date: '',
    startTime: '',
    endTime: '',
    room: '',
    type: 'lecture'
  });
  const [newEvaluation, setNewEvaluation] = useState({
    courseId: '',
    studentId: '',
    grade: 0,
    feedback: '',
    evaluationType: 'quiz'
  });

  const courses: Course[] = [
    {
      id: '1',
      title: 'إدارة المشاريع الحديثة',
      englishTitle: 'Modern Project Management',
      description: 'دورة شاملة في أساسيات إدارة المشاريع باستخدام أحدث الأساليب والأدوات',
      instructor: 'د. أحمد العلي',
      duration: '40 ساعة',
      capacity: 25,
      enrolled: 18,
      status: 'active',
      category: 'إدارة',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      format: 'hybrid',
      level: 'intermediate',
      price: 1200,
      rating: 4.5
    },
    {
      id: '2',
      title: 'تطوير المهارات القيادية',
      englishTitle: 'Leadership Skills Development',
      description: 'برنامج متخصص لتنمية المهارات القيادية والإدارية للمديرين الجدد',
      instructor: 'سارة محمد',
      duration: '32 ساعة',
      capacity: 20,
      enrolled: 15,
      status: 'upcoming',
      category: 'قيادة',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      format: 'offline',
      level: 'beginner',
      price: 950,
      rating: 4.7
    },
    {
      id: '3',
      title: 'الأمن السيبراني للمؤسسات',
      englishTitle: 'Cybersecurity for Organizations',
      description: 'دورة متقدمة في أساسيات الأمن السيبراني وحماية المعلومات المؤسسية',
      instructor: 'م. عبد الله الحارثي',
      duration: '48 ساعة',
      capacity: 30,
      enrolled: 30,
      status: 'completed',
      category: 'تقنية',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      format: 'online',
      level: 'advanced',
      price: 1500,
      rating: 4.8
    },
    {
      id: '4',
      title: 'التسويق الرقمي المتقدم',
      englishTitle: 'Advanced Digital Marketing',
      description: 'دورة شاملة في استراتيجيات التسويق الرقمي الحديثة ووسائل التواصل الاجتماعي',
      instructor: 'مريم الأحمدي',
      duration: '35 ساعة',
      capacity: 22,
      enrolled: 20,
      status: 'active',
      category: 'تسويق',
      startDate: '2024-02-15',
      endDate: '2024-03-10',
      format: 'hybrid',
      level: 'intermediate',
      price: 1100,
      rating: 4.6
    }
  ];

  const enrollments: Enrollment[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      courseTitle: 'إدارة المشاريع الحديثة',
      enrollmentDate: '2024-02-01',
      progress: 75,
      status: 'in_progress',
      department: 'تقنية المعلومات',
      grade: 85
    },
    {
      id: '2',
      employeeName: 'فاطمة الزهراني',
      employeeId: 'EMP002',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      enrollmentDate: '2024-01-01',
      progress: 100,
      status: 'completed',
      department: 'الأمن السيبراني',
      completionDate: '2024-01-31',
      grade: 92
    },
    {
      id: '3',
      employeeName: 'محمد السالم',
      employeeId: 'EMP003',
      courseTitle: 'تطوير المهارات القيادية',
      enrollmentDate: '2024-02-15',
      progress: 45,
      status: 'in_progress',
      department: 'الموارد البشرية',
      grade: 78
    },
    {
      id: '4',
      employeeName: 'نورا الخالدي',
      employeeId: 'EMP004',
      courseTitle: 'التسويق الرقمي المتقدم',
      enrollmentDate: '2024-02-20',
      progress: 30,
      status: 'enrolled',
      department: 'التسويق'
    }
  ];

  const instructors: Instructor[] = [
    {
      id: '1',
      name: 'د. أحمد العلي',
      email: 'ahmed.ali@company.com',
      phone: '+966501234567',
      specialization: ['إدارة المشاريع', 'القيادة', 'التخطيط الاستراتيجي'],
      experience: 15,
      rating: 4.8,
      status: 'active',
      bio: 'خبير في إدارة المشاريع مع خبرة أكثر من 15 عامًا في القطاعين العام والخاص',
      coursesCount: 12,
      studentsCount: 450,
      joinDate: '2020-01-15'
    },
    {
      id: '2',
      name: 'سارة محمد',
      email: 'sara.mohammed@company.com',
      phone: '+966507654321',
      specialization: ['القيادة', 'إدارة الفرق', 'التطوير المهني'],
      experience: 12,
      rating: 4.7,
      status: 'active',
      bio: 'مدربة معتمدة في تطوير المهارات القيادية والإدارية مع شهادات دولية',
      coursesCount: 8,
      studentsCount: 320,
      joinDate: '2021-03-10'
    },
    {
      id: '3',
      name: 'م. عبد الله الحارثي',
      email: 'abdullah.harthi@company.com',
      phone: '+966512345678',
      specialization: ['الأمن السيبراني', 'أمن المعلومات', 'الشبكات'],
      experience: 18,
      rating: 4.9,
      status: 'active',
      bio: 'خبير أمن سيبراني معتمد مع خبرة واسعة في حماية البيانات والشبكات',
      coursesCount: 15,
      studentsCount: 600,
      joinDate: '2019-08-20'
    },
    {
      id: '4',
      name: 'مريم الأحمدي',
      email: 'maryam.ahmadi@company.com',
      phone: '+966509876543',
      specialization: ['التسويق الرقمي', 'وسائل التواصل الاجتماعي', 'التجارة الإلكترونية'],
      experience: 10,
      rating: 4.6,
      status: 'active',
      bio: 'متخصصة في التسويق الرقمي مع خبرة في إدارة الحملات الإعلانية الناجحة',
      coursesCount: 6,
      studentsCount: 280,
      joinDate: '2022-05-12'
    }
  ];

  const schedules: Schedule[] = [
    {
      id: '1',
      courseId: '1',
      courseTitle: 'إدارة المشاريع الحديثة',
      date: '2024-02-15',
      startTime: '09:00',
      endTime: '12:00',
      room: 'قاعة A-101',
      type: 'lecture',
      instructor: 'د. أحمد العلي',
      status: 'scheduled',
      attendees: 18,
      maxCapacity: 25
    },
    {
      id: '2',
      courseId: '2',
      courseTitle: 'تطوير المهارات القيادية',
      date: '2024-03-01',
      startTime: '14:00',
      endTime: '17:00',
      room: 'قاعة B-205',
      type: 'workshop',
      instructor: 'سارة محمد',
      status: 'scheduled',
      attendees: 15,
      maxCapacity: 20
    },
    {
      id: '3',
      courseId: '3',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      date: '2024-02-10',
      startTime: '10:00',
      endTime: '13:00',
      room: 'معمل الحاسوب C-150',
      type: 'lab',
      instructor: 'م. عبد الله الحارثي',
      status: 'completed',
      attendees: 30,
      maxCapacity: 30
    }
  ];

  const evaluations: Evaluation[] = [
    {
      id: '1',
      courseId: '1',
      courseTitle: 'إدارة المشاريع الحديثة',
      studentId: 'EMP001',
      studentName: 'أحمد محمد علي',
      evaluationType: 'quiz',
      grade: 85,
      maxGrade: 100,
      feedback: 'أداء ممتاز في فهم أساسيات إدارة المشاريع',
      evaluationDate: '2024-02-05',
      instructor: 'د. أحمد العلي'
    },
    {
      id: '2',
      courseId: '3',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      studentId: 'EMP002',
      studentName: 'فاطمة الزهراني',
      evaluationType: 'final_exam',
      grade: 92,
      maxGrade: 100,
      feedback: 'فهم عميق لمفاهيم الأمن السيبراني وتطبيقاتها',
      evaluationDate: '2024-01-30',
      instructor: 'م. عبد الله الحارثي'
    },
    {
      id: '3',
      courseId: '2',
      courseTitle: 'تطوير المهارات القيادية',
      studentId: 'EMP003',
      studentName: 'محمد السالم',
      evaluationType: 'project',
      grade: 88,
      maxGrade: 100,
      feedback: 'مشروع متميز يعكس فهماً جيداً للمهارات القيادية',
      evaluationDate: '2024-02-12',
      instructor: 'سارة محمد'
    }
  ];

  const digitalContents: DigitalContent[] = [
    {
      id: '1',
      title: 'مقدمة في إدارة المشاريع',
      courseId: '1',
      type: 'video',
      url: '/content/project-management-intro.mp4',
      duration: '45 دقيقة',
      size: '250 MB',
      uploadDate: '2024-01-15',
      downloads: 156,
      status: 'active'
    },
    {
      id: '2',
      title: 'دليل القيادة الفعالة',
      courseId: '2',
      type: 'pdf',
      url: '/content/leadership-guide.pdf',
      size: '5.2 MB',
      uploadDate: '2024-01-20',
      downloads: 89,
      status: 'active'
    },
    {
      id: '3',
      title: 'أساسيات الأمن السيبراني',
      courseId: '3',
      type: 'presentation',
      url: '/content/cybersecurity-basics.pptx',
      size: '12.8 MB',
      uploadDate: '2024-01-10',
      downloads: 234,
      status: 'active'
    },
    {
      id: '4',
      title: 'محاكي التسويق التفاعلي',
      courseId: '4',
      type: 'interactive',
      url: '/content/marketing-simulator',
      duration: 'تفاعلي',
      size: '45 MB',
      uploadDate: '2024-02-01',
      downloads: 67,
      status: 'active'
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      employeeName: 'فاطمة الزهراني',
      employeeId: 'EMP002',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      issueDate: '2024-02-01',
      expiryDate: '2027-02-01',
      certificateNumber: 'CRT-2024-001',
      status: 'active',
      grade: 92,
      instructorName: 'م. عبد الله الحارثي'
    },
    {
      id: '2',
      employeeName: 'خالد الشمري',
      employeeId: 'EMP005',
      courseTitle: 'إدارة المشاريع الحديثة',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      certificateNumber: 'CRT-2024-002',
      status: 'active',
      grade: 88,
      instructorName: 'د. أحمد العلي'
    },
    {
      id: '3',
      employeeName: 'هند العتيبي',
      employeeId: 'EMP006',
      courseTitle: 'تطوير المهارات القيادية',
      issueDate: '2023-12-20',
      certificateNumber: 'CRT-2023-015',
      status: 'active',
      grade: 95,
      instructorName: 'سارة محمد'
    }
  ];

  // Functions
  const handleSystemAction = (action: string) => {
    console.log(`تنفيذ إجراء: ${action}`);
    handleModuleClick(action);
  };

  const handleAddSchedule = () => {
    console.log('إضافة جدولة جديدة:', newSchedule);
    setShowScheduleDialog(false);
    setNewSchedule({
      courseId: '',
      date: '',
      startTime: '',
      endTime: '',
      room: '',
      type: 'lecture'
    });
  };

  const handleAddEvaluation = () => {
    console.log('إضافة تقييم جديد:', newEvaluation);
    setShowEvaluationDialog(false);
    setNewEvaluation({
      courseId: '',
      studentId: '',
      grade: 0,
      feedback: '',
      evaluationType: 'quiz'
    });
  };

  const handleModuleClick = (module: string) => {
    switch (module) {
      case 'المناهج':
        setActiveTab('courses');
        break;
      case 'المتدربين':
        setActiveTab('enrollments');
        break;
      case 'الشهادات':
        setActiveTab('certificates');
        break;
      case 'الجدولة':
        setShowScheduleDialog(true);
        break;
      case 'المدربين':
        setActiveTab('instructors');
        break;
      case 'البث المباشر':
        setActiveTab(`live-${courses[0]?.id || '1'}`);
        break;
      case 'التدريب الرقمي':
        setActiveTab('digital-content');
        break;
      case 'التقييم':
        setShowEvaluationDialog(true);
        break;
      default:
        console.log(`تم النقر على: ${module}`);
    }
  };

  const handleAddCourse = () => {
    console.log('إضافة دورة جديدة:', newCourse);
    setShowAddCourse(false);
    setNewCourse({
      title: '',
      englishTitle: '',
      description: '',
      instructor: '',
      duration: '',
      capacity: 20,
      category: '',
      startDate: '',
      endDate: '',
      format: 'online',
      level: 'beginner',
      price: 0
    });
  };

  const handleAddInstructor = () => {
    console.log('إضافة مدرب جديد:', newInstructor);
    setShowAddInstructor(false);
    setNewInstructor({
      name: '',
      email: '',
      phone: '',
      specialization: [],
      experience: 0,
      bio: '',
      status: 'active'
    });
  };

  const handleEnroll = () => {
    console.log('تسجيل جديد:', newEnrollment);
    setShowEnrollDialog(false);
    setNewEnrollment({
      employeeName: '',
      employeeId: '',
      courseId: '',
      department: ''
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': 'bg-green-500/20 text-green-700 border-green-200',
      'completed': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'upcoming': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'enrolled': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'in_progress': 'bg-orange-500/20 text-orange-700 border-orange-200',
      'dropped': 'bg-red-500/20 text-red-700 border-red-200',
      'expired': 'bg-gray-500/20 text-gray-700 border-gray-200',
      'revoked': 'bg-red-500/20 text-red-700 border-red-200',
      'inactive': 'bg-gray-500/20 text-gray-700 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-500/20 text-gray-700'}>
        {status}
      </Badge>
    );
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'beginner': 'bg-green-500/20 text-green-700 border-green-200',
      'intermediate': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'advanced': 'bg-red-500/20 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={levelConfig[level as keyof typeof levelConfig]}>
        {level === 'beginner' ? 'مبتدئ' : level === 'intermediate' ? 'متوسط' : 'متقدم'}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
          <div className="flex items-center gap-6">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
                <ArrowLeft className="h-4 w-4 ml-2" />
                رجوع
              </Button>
            )}
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
                  <BookOpen className="h-12 w-12" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  نظام التدريب والتطوير الشامل
                </h1>
                <p className="text-gray-600 text-lg">
                  منظومة متكاملة لإدارة التدريب وتطوير المهارات مع شهادات معتمدة
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 ml-2" />
              نظام متقدم
            </Badge>
            <Button 
              onClick={() => handleSystemAction('مساعد الذكاء الاصطناعي')}
              className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bot className="h-4 w-4 ml-2" />
              مساعد ذكي
            </Button>
            <Button 
              onClick={() => setShowAddCourse(true)}
              className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 ml-2" />
              دورة جديدة
            </Button>
          </div>
        </div>

        {/* Advanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">إجمالي الدورات</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                  <p className="text-white/70 text-xs mt-1">دورة متاحة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">المتدربين النشطين</p>
                  <p className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
                  <p className="text-white/70 text-xs mt-1">متدرب مسجل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">شهادات مكتملة</p>
                  <p className="text-3xl font-bold">{certificates.length}</p>
                  <p className="text-white/70 text-xs mt-1">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">ساعات التدريب</p>
                  <p className="text-3xl font-bold">240</p>
                  <p className="text-white/70 text-xs mt-1">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">المدربين</p>
                  <p className="text-3xl font-bold">{instructors.length}</p>
                  <p className="text-white/70 text-xs mt-1">مدرب معتمد</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">معدل النجاح</p>
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-white/70 text-xs mt-1">معدل الإنجاز</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <PieChart className="w-7 h-7" />
              نظرة عامة على النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {[
                { icon: BookOpen, label: 'المناهج', color: 'text-blue-600', bg: 'bg-blue-100' },
                { icon: Users, label: 'المتدربين', color: 'text-green-600', bg: 'bg-green-100' },
                { icon: Award, label: 'الشهادات', color: 'text-purple-600', bg: 'bg-purple-100' },
                { icon: Calendar, label: 'الجدولة', color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { icon: User, label: 'المدربين', color: 'text-indigo-600', bg: 'bg-indigo-100' },
                { icon: Video, label: 'البث المباشر', color: 'text-red-600', bg: 'bg-red-100' },
                { icon: Globe, label: 'التدريب الرقمي', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                { icon: BarChart3, label: 'التقييم', color: 'text-orange-600', bg: 'bg-orange-100' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-primary/30"
                  onClick={() => handleSystemAction(item.label)}
                >
                  <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium mt-2 text-center text-gray-700 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Navigation Tabs */}
        <Card className="bg-white/90 backdrop-blur shadow-xl border-0">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-primary/10 to-primary/5 p-2 rounded-none h-auto border-b">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">لوحة التحكم</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="courses" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">الدورات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="enrollments" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">التسجيلات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="certificates" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Award className="w-5 h-5" />
                  <span className="font-medium">الشهادات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="instructors" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">المدربين</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">التقارير</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="digital-content" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">المحتوى الرقمي</span>
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <BarChart3 className="w-5 h-5" />
                        إحصائيات التدريب
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الدورات النشطة</span>
                          <span className="font-bold text-green-600">{courses.filter(c => c.status === 'active').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الدورات القادمة</span>
                          <span className="font-bold text-blue-600">{courses.filter(c => c.status === 'upcoming').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الدورات المكتملة</span>
                          <span className="font-bold text-purple-600">{courses.filter(c => c.status === 'completed').length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <Users className="w-5 h-5" />
                        أداء المتدربين
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">92%</p>
                          <p className="text-sm text-gray-500">معدل إكمال الدورات</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط التقييم:</span>
                          <span className="font-medium">4.7/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>المتدربون النشطون:</span>
                          <span className="font-medium">{enrollments.filter(e => e.status === 'in_progress').length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-700">
                        <Award className="w-5 h-5" />
                        الشهادات والإنجازات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600">{certificates.length}</p>
                          <p className="text-sm text-gray-500">شهادة صادرة</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>الشهادات النشطة:</span>
                          <span className="font-medium">{certificates.filter(c => c.status === 'active').length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط الدرجات:</span>
                          <span className="font-medium">
                            {certificates.reduce((sum, c) => sum + c.grade, 0) / certificates.length}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      الإجراءات السريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        onClick={() => setShowAddCourse(true)}
                        className="flex items-center gap-2 h-16"
                        variant="outline"
                      >
                        <Plus className="w-5 h-5" />
                        إضافة دورة
                      </Button>
                      <Button 
                        onClick={() => setShowEnrollDialog(true)}
                        className="flex items-center gap-2 h-16"
                        variant="outline"
                      >
                        <Users className="w-5 h-5" />
                        تسجيل متدرب
                      </Button>
                      <Button 
                        onClick={() => setShowAddInstructor(true)}
                        className="flex items-center gap-2 h-16"
                        variant="outline"
                      >
                        <User className="w-5 h-5" />
                        إضافة مدرب
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('reports')}
                        className="flex items-center gap-2 h-16"
                        variant="outline"
                      >
                        <BarChart3 className="w-5 h-5" />
                        التقارير
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">الدورات التدريبية</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في الدورات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10 w-64"
                      />
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الدورات</SelectItem>
                        <SelectItem value="active">نشطة</SelectItem>
                        <SelectItem value="upcoming">قادمة</SelectItem>
                        <SelectItem value="completed">مكتملة</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setShowAddCourse(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      إضافة دورة
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {courses
                    .filter(course => 
                      (selectedFilter === 'all' || course.status === selectedFilter) &&
                      (searchTerm === '' || course.title.includes(searchTerm) || course.category.includes(searchTerm))
                    )
                    .map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{course.title}</h4>
                              {getLevelBadge(course.level)}
                              {getStatusBadge(course.status)}
                            </div>
                            <p className="text-gray-600">{course.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <span><strong>المدرب:</strong> {course.instructor}</span>
                              <span><strong>المدة:</strong> {course.duration}</span>
                              <span><strong>المسجلين:</strong> {course.enrolled}/{course.capacity}</span>
                              <span><strong>التكلفة:</strong> {course.price} ريال</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">التقييم:</span>
                              <div className="flex gap-1">
                                {course.rating && renderStars(course.rating)}
                              </div>
                              <span className="text-sm text-gray-600">({course.rating})</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button 
                              size="sm" 
                              variant="default" 
                              onClick={() => setActiveTab(`live-${course.id}`)}
                              className="gap-2 bg-red-500 hover:bg-red-600 text-white"
                            >
                              <Video className="w-4 h-4" />
                              البث المباشر
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingCourse(course)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من حذف هذه الدورة؟ هذا الإجراء لا يمكن التراجع عنه.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => console.log('حذف الدورة:', course.id)}>
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Live Stream Tabs for each course */}
              {courses.map((course) => (
                <TabsContent key={`live-${course.id}`} value={`live-${course.id}`} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('courses')}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        العودة للدورات
                      </Button>
                      <div>
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <p className="text-gray-600">بث مباشر مع {course.instructor}</p>
                      </div>
                    </div>
                    
                    <LiveStreamInterface 
                      courseId={course.id}
                      courseTitle={course.title}
                      instructorName={course.instructor}
                      isInstructor={false}
                    />
                  </div>
                </TabsContent>
              ))}

              {/* Enrollments Tab */}
              <TabsContent value="enrollments" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">تسجيلات المتدربين</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في التسجيلات..."
                        className="pr-10 w-64"
                      />
                    </div>
                    <Button onClick={() => setShowEnrollDialog(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      تسجيل جديد
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-bold text-lg">{enrollment.employeeName}</h4>
                              {getStatusBadge(enrollment.status)}
                            </div>
                            <p className="text-gray-600"><strong>الدورة:</strong> {enrollment.courseTitle}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <span><strong>رقم الموظف:</strong> {enrollment.employeeId}</span>
                              <span><strong>القسم:</strong> {enrollment.department}</span>
                              <span><strong>تاريخ التسجيل:</strong> {enrollment.enrollmentDate}</span>
                              {enrollment.completionDate && (
                                <span><strong>تاريخ الإكمال:</strong> {enrollment.completionDate}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>التقدم</span>
                                  <span>{enrollment.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                    style={{ width: `${enrollment.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              {enrollment.grade && (
                                <div className="text-center">
                                  <span className="text-2xl font-bold text-green-600">{enrollment.grade}%</span>
                                  <p className="text-xs text-gray-500">الدرجة</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button size="sm" variant="outline">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من حذف هذا التسجيل؟ هذا الإجراء لا يمكن التراجع عنه.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => console.log('حذف التسجيل:', enrollment.id)}>
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">إدارة الشهادات</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في الشهادات..."
                        className="pr-10 w-64"
                      />
                    </div>
                    <Button className="gap-2">
                      <Download className="w-4 h-4" />
                      تصدير التقرير
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <Award className="w-6 h-6 text-yellow-500" />
                              <h4 className="font-bold text-lg">{certificate.employeeName}</h4>
                              {getStatusBadge(certificate.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <span><strong>رقم الموظف:</strong> {certificate.employeeId}</span>
                              <span><strong>الدورة:</strong> {certificate.courseTitle}</span>
                              <span><strong>المدرب:</strong> {certificate.instructorName}</span>
                              <span><strong>رقم الشهادة:</strong> {certificate.certificateNumber}</span>
                              <span><strong>تاريخ الإصدار:</strong> {certificate.issueDate}</span>
                              {certificate.expiryDate && (
                                <span><strong>تاريخ الانتهاء:</strong> {certificate.expiryDate}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">الدرجة النهائية:</span>
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                  {certificate.grade}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                              تحميل
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                              عرض
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <X className="w-4 h-4" />
                                  إلغاء
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>إلغاء الشهادة</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من إلغاء هذه الشهادة؟ هذا الإجراء سيجعل الشهادة غير صالحة.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>تراجع</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => console.log('إلغاء الشهادة:', certificate.id)}>
                                    إلغاء الشهادة
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Instructors Tab */}
              <TabsContent value="instructors" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">إدارة المدربين</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في المدربين..."
                        className="pr-10 w-64"
                      />
                    </div>
                    <Button onClick={() => setShowAddInstructor(true)} className="gap-2">
                      <Plus className="w-4 h-4" />
                      إضافة مدرب
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {instructors.map((instructor) => (
                    <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <User className="w-6 h-6 text-blue-500" />
                              <h4 className="font-bold text-lg">{instructor.name}</h4>
                              {getStatusBadge(instructor.status)}
                            </div>
                            <p className="text-gray-600">{instructor.bio}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <span><strong>البريد:</strong> {instructor.email}</span>
                              <span><strong>الهاتف:</strong> {instructor.phone}</span>
                              <span><strong>سنوات الخبرة:</strong> {instructor.experience}</span>
                              <span><strong>تاريخ الانضمام:</strong> {instructor.joinDate}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">التخصصات:</span>
                                <div className="flex flex-wrap gap-2">
                                  {instructor.specialization.map((spec, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">التقييم:</span>
                                  <div className="flex gap-1">
                                    {renderStars(instructor.rating)}
                                  </div>
                                  <span className="text-sm text-gray-600">({instructor.rating})</span>
                                </div>
                                <span className="text-sm text-gray-600">
                                  <strong>{instructor.coursesCount}</strong> دورة - <strong>{instructor.studentsCount}</strong> طالب
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button size="sm" variant="outline" onClick={() => setEditingInstructor(instructor)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من حذف هذا المدرب؟ هذا الإجراء لا يمكن التراجع عنه.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => console.log('حذف المدرب:', instructor.id)}>
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">تقارير التدريب</h3>
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    تصدير جميع التقارير
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'تقرير الدورات الشامل',
                      description: 'تقرير مفصل عن جميع الدورات وحالتها',
                      icon: BookOpen,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                      border: 'border-blue-200'
                    },
                    {
                      title: 'تقرير أداء المتدربين',
                      description: 'إحصائيات شاملة عن تقدم وأداء المتدربين',
                      icon: Users,
                      color: 'text-green-600',
                      bg: 'bg-green-50',
                      border: 'border-green-200'
                    },
                    {
                      title: 'تقرير الشهادات الصادرة',
                      description: 'قائمة بجميع الشهادات المصدرة والمعلقة',
                      icon: Award,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50',
                      border: 'border-purple-200'
                    },
                    {
                      title: 'تقرير أداء المدربين',
                      description: 'إحصائيات وتقييمات المدربين',
                      icon: User,
                      color: 'text-orange-600',
                      bg: 'bg-orange-50',
                      border: 'border-orange-200'
                    },
                    {
                      title: 'التقرير المالي',
                      description: 'تقرير الإيرادات والتكاليف',
                      icon: BarChart3,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                      border: 'border-indigo-200'
                    },
                    {
                      title: 'تقرير مخصص',
                      description: 'إنشاء تقرير مخصص حسب المعايير',
                      icon: Settings,
                      color: 'text-gray-600',
                      bg: 'bg-gray-50',
                      border: 'border-gray-200'
                    }
                  ].map((report, index) => (
                    <Card key={index} className={`hover:shadow-lg transition-all cursor-pointer ${report.bg} ${report.border}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${report.bg} border ${report.border}`}>
                            <report.icon className={`w-6 h-6 ${report.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-2">{report.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Eye className="w-4 h-4" />
                                عرض
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2">
                                <Download className="w-4 h-4" />
                                تحميل
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
                        <p className="text-sm text-gray-600">إجمالي الدورات</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">{enrollments.length}</p>
                        <p className="text-sm text-gray-600">إجمالي التسجيلات</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">{certificates.length}</p>
                        <p className="text-sm text-gray-600">الشهادات الصادرة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-orange-600">{instructors.length}</p>
                        <p className="text-sm text-gray-600">المدربين النشطين</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Digital Content Tab */}
              <TabsContent value="digital-content" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">المحتوى الرقمي</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في المحتوى..."
                        className="pr-10 w-64"
                      />
                    </div>
                    <Button className="gap-2">
                      <Upload className="w-4 h-4" />
                      رفع محتوى جديد
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {digitalContents.map((content) => (
                    <Card key={content.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                content.type === 'video' ? 'bg-red-100 text-red-600' :
                                content.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                                content.type === 'presentation' ? 'bg-green-100 text-green-600' :
                                'bg-purple-100 text-purple-600'
                              }`}>
                                {content.type === 'video' ? <Video className="w-5 h-5" /> :
                                 content.type === 'pdf' ? <FileText className="w-5 h-5" /> :
                                 content.type === 'presentation' ? <FileText className="w-5 h-5" /> :
                                 <Globe className="w-5 h-5" />}
                              </div>
                              <h4 className="font-bold text-lg">{content.title}</h4>
                              <Badge variant="outline" className={
                                content.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700'
                              }>
                                {content.status === 'active' ? 'نشط' : 'غير نشط'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <span><strong>النوع:</strong> {
                                content.type === 'video' ? 'فيديو' :
                                content.type === 'pdf' ? 'ملف PDF' :
                                content.type === 'presentation' ? 'عرض تقديمي' :
                                'محتوى تفاعلي'
                              }</span>
                              <span><strong>الحجم:</strong> {content.size}</span>
                              <span><strong>التحميلات:</strong> {content.downloads}</span>
                              <span><strong>تاريخ الرفع:</strong> {content.uploadDate}</span>
                            </div>
                            {content.duration && (
                              <div className="text-sm text-gray-600">
                                <strong>المدة:</strong> {content.duration}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 items-center">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    هل أنت متأكد من حذف هذا المحتوى؟ هذا الإجراء لا يمكن التراجع عنه.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => console.log('حذف المحتوى:', content.id)}>
                                    حذف
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Schedule Dialog */}
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إدارة الجدولة</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">تاريخ الجلسة</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleRoom">القاعة</Label>
                  <Input
                    id="scheduleRoom"
                    value={newSchedule.room}
                    onChange={(e) => setNewSchedule({...newSchedule, room: e.target.value})}
                    placeholder="مثال: قاعة A-101"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">وقت البداية</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">وقت النهاية</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newSchedule.endTime}
                    onChange={(e) => setNewSchedule({...newSchedule, endTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionType">نوع الجلسة</Label>
                  <Select value={newSchedule.type} onValueChange={(value: 'lecture' | 'lab' | 'exam' | 'workshop') => setNewSchedule({...newSchedule, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">محاضرة</SelectItem>
                      <SelectItem value="lab">معمل</SelectItem>
                      <SelectItem value="exam">امتحان</SelectItem>
                      <SelectItem value="workshop">ورشة عمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleCourse">الدورة</Label>
                <Select value={newSchedule.courseId} onValueChange={(value) => setNewSchedule({...newSchedule, courseId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Schedules */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">الجدولة الحالية</h4>
                <div className="grid gap-3 max-h-64 overflow-y-auto">
                  {schedules.map((schedule) => (
                    <Card key={schedule.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">{schedule.courseTitle}</h5>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>📅 {schedule.date} | ⏰ {schedule.startTime} - {schedule.endTime}</p>
                            <p>🏢 {schedule.room} | 👥 {schedule.attendees}/{schedule.maxCapacity}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={
                          schedule.status === 'completed' ? 'bg-green-100 text-green-700' :
                          schedule.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                          schedule.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {schedule.status === 'completed' ? 'مكتمل' :
                           schedule.status === 'ongoing' ? 'جاري' :
                           schedule.status === 'cancelled' ? 'ملغي' :
                           'مجدول'}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                  إغلاق
                </Button>
                <Button onClick={handleAddSchedule} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ الجدولة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Evaluation Dialog */}
        <Dialog open={showEvaluationDialog} onOpenChange={setShowEvaluationDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إدارة التقييمات</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evalCourse">الدورة</Label>
                  <Select value={newEvaluation.courseId} onValueChange={(value) => setNewEvaluation({...newEvaluation, courseId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدورة" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evalStudent">الطالب</Label>
                  <Select value={newEvaluation.studentId} onValueChange={(value) => setNewEvaluation({...newEvaluation, studentId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الطالب" />
                    </SelectTrigger>
                    <SelectContent>
                      {enrollments.map((enrollment) => (
                        <SelectItem key={enrollment.id} value={enrollment.employeeId}>
                          {enrollment.employeeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="evalType">نوع التقييم</Label>
                  <Select value={newEvaluation.evaluationType} onValueChange={(value: 'quiz' | 'assignment' | 'final_exam' | 'project') => setNewEvaluation({...newEvaluation, evaluationType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">اختبار قصير</SelectItem>
                      <SelectItem value="assignment">واجب</SelectItem>
                      <SelectItem value="final_exam">امتحان نهائي</SelectItem>
                      <SelectItem value="project">مشروع</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evalGrade">الدرجة</Label>
                  <Input
                    id="evalGrade"
                    type="number"
                    min="0"
                    max="100"
                    value={newEvaluation.grade}
                    onChange={(e) => setNewEvaluation({...newEvaluation, grade: parseInt(e.target.value)})}
                    placeholder="الدرجة من 100"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evalFeedback">التعليقات والملاحظات</Label>
                <Textarea
                  id="evalFeedback"
                  value={newEvaluation.feedback}
                  onChange={(e) => setNewEvaluation({...newEvaluation, feedback: e.target.value})}
                  placeholder="أدخل التعليقات والملاحظات على الأداء"
                />
              </div>

              {/* Current Evaluations */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">التقييمات الحالية</h4>
                <div className="grid gap-3 max-h-64 overflow-y-auto">
                  {evaluations.map((evaluation) => (
                    <Card key={evaluation.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h5 className="font-medium">{evaluation.studentName}</h5>
                            <Badge variant="outline" className={
                              evaluation.grade >= 90 ? 'bg-green-100 text-green-700' :
                              evaluation.grade >= 80 ? 'bg-blue-100 text-blue-700' :
                              evaluation.grade >= 70 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }>
                              {evaluation.grade}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{evaluation.courseTitle}</p>
                          <p className="text-sm text-gray-600">
                            {evaluation.evaluationType === 'quiz' ? 'اختبار قصير' :
                             evaluation.evaluationType === 'assignment' ? 'واجب' :
                             evaluation.evaluationType === 'final_exam' ? 'امتحان نهائي' :
                             'مشروع'} - {evaluation.evaluationDate}
                          </p>
                          <p className="text-sm">{evaluation.feedback}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEvaluationDialog(false)}>
                  إغلاق
                </Button>
                <Button onClick={handleAddEvaluation} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ التقييم
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Course Dialog */}
        <Dialog open={showAddCourse} onOpenChange={setShowAddCourse}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة دورة تدريبية جديدة</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الدورة</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="أدخل عنوان الدورة"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="englishTitle">العنوان الإنجليزي</Label>
                  <Input
                    id="englishTitle"
                    value={newCourse.englishTitle}
                    onChange={(e) => setNewCourse({...newCourse, englishTitle: e.target.value})}
                    placeholder="Enter English title"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">وصف الدورة</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="أدخل وصف مفصل للدورة"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">المدرب</Label>
                  <Select value={newCourse.instructor} onValueChange={(value) => setNewCourse({...newCourse, instructor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدرب" />
                    </SelectTrigger>
                    <SelectContent>
                      {instructors.map((instructor) => (
                        <SelectItem key={instructor.id} value={instructor.name}>
                          {instructor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">فئة الدورة</Label>
                  <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="إدارة">إدارة</SelectItem>
                      <SelectItem value="قيادة">قيادة</SelectItem>
                      <SelectItem value="تقنية">تقنية</SelectItem>
                      <SelectItem value="تسويق">تسويق</SelectItem>
                      <SelectItem value="مالية">مالية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">المدة</Label>
                  <Input
                    id="duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    placeholder="مثال: 40 ساعة"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">السعة القصوى</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newCourse.capacity}
                    onChange={(e) => setNewCourse({...newCourse, capacity: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">التكلفة (ريال)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">نوع التدريب</Label>
                  <Select value={newCourse.format} onValueChange={(value: 'online' | 'offline' | 'hybrid') => setNewCourse({...newCourse, format: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">عبر الإنترنت</SelectItem>
                      <SelectItem value="offline">حضوري</SelectItem>
                      <SelectItem value="hybrid">مدمج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">المستوى</Label>
                  <Select value={newCourse.level} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setNewCourse({...newCourse, level: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدئ</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ البداية</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddCourse(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddCourse} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ الدورة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Instructor Dialog */}
        <Dialog open={showAddInstructor} onOpenChange={setShowAddInstructor}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مدرب جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructorName">اسم المدرب</Label>
                  <Input
                    id="instructorName"
                    value={newInstructor.name}
                    onChange={(e) => setNewInstructor({...newInstructor, name: e.target.value})}
                    placeholder="أدخل اسم المدرب"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructorEmail">البريد الإلكتروني</Label>
                  <Input
                    id="instructorEmail"
                    type="email"
                    value={newInstructor.email}
                    onChange={(e) => setNewInstructor({...newInstructor, email: e.target.value})}
                    placeholder="instructor@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructorPhone">رقم الهاتف</Label>
                  <Input
                    id="instructorPhone"
                    value={newInstructor.phone}
                    onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})}
                    placeholder="+966xxxxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructorExperience">سنوات الخبرة</Label>
                  <Input
                    id="instructorExperience"
                    type="number"
                    value={newInstructor.experience}
                    onChange={(e) => setNewInstructor({...newInstructor, experience: parseInt(e.target.value)})}
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructorBio">نبذة تعريفية</Label>
                <Textarea
                  id="instructorBio"
                  value={newInstructor.bio}
                  onChange={(e) => setNewInstructor({...newInstructor, bio: e.target.value})}
                  placeholder="أدخل نبذة تعريفية عن المدرب وخبراته"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddInstructor(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddInstructor} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ المدرب
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enroll Dialog */}
        <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تسجيل متدرب جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">اسم الموظف</Label>
                  <Input
                    id="employeeName"
                    value={newEnrollment.employeeName}
                    onChange={(e) => setNewEnrollment({...newEnrollment, employeeName: e.target.value})}
                    placeholder="أدخل اسم الموظف"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">رقم الموظف</Label>
                  <Input
                    id="employeeId"
                    value={newEnrollment.employeeId}
                    onChange={(e) => setNewEnrollment({...newEnrollment, employeeId: e.target.value})}
                    placeholder="EMP001"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseSelect">الدورة التدريبية</Label>
                <Select value={newEnrollment.courseId} onValueChange={(value) => setNewEnrollment({...newEnrollment, courseId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.filter(c => c.status === 'active' || c.status === 'upcoming').map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">القسم</Label>
                <Input
                  id="department"
                  value={newEnrollment.department}
                  onChange={(e) => setNewEnrollment({...newEnrollment, department: e.target.value})}
                  placeholder="أدخل اسم القسم"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEnrollDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleEnroll} className="gap-2">
                  <Save className="w-4 h-4" />
                  تسجيل
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};