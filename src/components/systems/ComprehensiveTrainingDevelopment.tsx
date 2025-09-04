import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  Award,
  Play,
  Download,
  Star,
  Target,
  BarChart3,
  PieChart,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  Headphones,
  Monitor,
  Globe,
  Camera,
  Mic,
  Eye,
  Edit,
  Trash2,
  Upload,
  Send,
  User,
  Calendar as CalendarIcon,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComprehensiveTrainingDevelopmentProps {
  onBack?: () => void;
}

// Mock Data
const trainingStats = {
  totalPrograms: 145,
  activeTrainees: 892,
  completedHours: 3240,
  targetHours: 4000,
  plannedBudget: 450000,
  spentBudget: 280000,
  completionRate: 78,
  satisfaction: 4.6,
  elearningCourses: 89,
  certificates: 456
};

const trainingPrograms = [
  {
    id: 1,
    title: 'برنامج القيادة الإدارية',
    titleEn: 'Management Leadership Program',
    type: 'حضوري',
    typeEn: 'In-Person',
    department: 'الإدارة العليا',
    departmentEn: 'Senior Management',
    duration: '40 ساعة',
    durationEn: '40 Hours',
    cost: 25000,
    participants: 15,
    status: 'نشط',
    statusEn: 'Active',
    trainer: 'د. أحمد محمد',
    trainerEn: 'Dr. Ahmed Mohammed',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    completion: 65,
    rating: 4.8
  },
  {
    id: 2,
    title: 'مهارات التسويق الرقمي',
    titleEn: 'Digital Marketing Skills',
    type: 'إلكتروني',
    typeEn: 'Online',
    department: 'التسويق',
    departmentEn: 'Marketing',
    duration: '25 ساعة',
    durationEn: '25 Hours',
    cost: 8000,
    participants: 45,
    status: 'مكتمل',
    statusEn: 'Completed',
    trainer: 'سارة أحمد',
    trainerEn: 'Sarah Ahmed',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    completion: 100,
    rating: 4.5
  }
];

const elearningCourses = [
  {
    id: 1,
    title: 'أساسيات إدارة المشاريع',
    titleEn: 'Project Management Fundamentals',
    category: 'إدارة',
    categoryEn: 'Management',
    duration: '12 ساعة',
    durationEn: '12 Hours',
    lessons: 8,
    enrolled: 156,
    completed: 89,
    rating: 4.7,
    level: 'مبتدئ',
    levelEn: 'Beginner',
    instructor: 'أ. محمد علي',
    instructorEn: 'Mr. Mohammed Ali',
    progress: 0,
    certificate: false,
    description: 'دورة شاملة في أساسيات إدارة المشاريع',
    descriptionEn: 'Comprehensive course in project management fundamentals'
  },
  {
    id: 2,
    title: 'التميز في خدمة العملاء',
    titleEn: 'Excellence in Customer Service',
    category: 'مهارات',
    categoryEn: 'Skills',
    duration: '8 ساعات',
    durationEn: '8 Hours',
    lessons: 6,
    enrolled: 234,
    completed: 198,
    rating: 4.9,
    level: 'متوسط',
    levelEn: 'Intermediate',
    instructor: 'د. فاطمة السالم',
    instructorEn: 'Dr. Fatima Al-Salem',
    progress: 25,
    certificate: false,
    description: 'تطوير مهارات التعامل مع العملاء',
    descriptionEn: 'Developing customer service skills'
  }
];

const trainingPlan = [
  {
    id: 1,
    department: 'الموارد البشرية',
    departmentEn: 'Human Resources',
    plannedPrograms: 12,
    completedPrograms: 8,
    plannedBudget: 85000,
    spentBudget: 52000,
    targetEmployees: 45,
    trainedEmployees: 32,
    progress: 67
  },
  {
    id: 2,
    department: 'تقنية المعلومات',
    departmentEn: 'Information Technology',
    plannedPrograms: 18,
    completedPrograms: 15,
    plannedBudget: 120000,
    spentBudget: 98000,
    targetEmployees: 78,
    trainedEmployees: 65,
    progress: 83
  }
];

const attendanceData = [
  {
    id: 1,
    employeeName: 'أحمد محمد علي',
    employeeNameEn: 'Ahmed Mohammed Ali',
    employeeId: 'EMP-001',
    program: 'برنامج القيادة الإدارية',
    programEn: 'Management Leadership Program',
    date: '2024-02-15',
    status: 'حاضر',
    statusEn: 'Present',
    arrivalTime: '09:00',
    departureTime: '17:00',
    hoursAttended: 8,
    signature: true,
    rating: 4.5
  },
  {
    id: 2,
    employeeName: 'سارة أحمد محمد',
    employeeNameEn: 'Sarah Ahmed Mohammed',
    employeeId: 'EMP-002',
    program: 'مهارات التسويق الرقمي',
    programEn: 'Digital Marketing Skills',
    date: '2024-02-16',
    status: 'غائب',
    statusEn: 'Absent',
    arrivalTime: '-',
    departureTime: '-',
    hoursAttended: 0,
    signature: false,
    rating: 0
  }
];

const chartData = [
  { month: 'يناير', completed: 45, planned: 60 },
  { month: 'فبراير', completed: 52, planned: 65 },
  { month: 'مارس', completed: 38, planned: 55 },
  { month: 'أبريل', completed: 48, planned: 50 },
  { month: 'مايو', completed: 55, planned: 70 },
  { month: 'يونيو', completed: 62, planned: 75 }
];

const typeDistribution = [
  { name: 'حضوري', value: 45, color: '#3CB593' },
  { name: 'إلكتروني', value: 35, color: '#2563eb' },
  { name: 'خارجي', value: 20, color: '#dc2626' }
];

export const ComprehensiveTrainingDevelopment: React.FC<ComprehensiveTrainingDevelopmentProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [programForm, setProgramForm] = useState({
    title: '',
    type: '',
    department: '',
    duration: '',
    cost: '',
    trainer: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [courseForm, setCourseForm] = useState({
    title: '',
    category: '',
    duration: '',
    lessons: '',
    level: '',
    instructor: '',
    description: ''
  });

  const handleCreateProgram = () => {
    if (!programForm.title || !programForm.type) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء البرنامج التدريبي بنجاح" : "Training program created successfully"
    });

    setProgramForm({
      title: '',
      type: '',
      department: '',
      duration: '',
      cost: '',
      trainer: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const handleCreateCourse = () => {
    if (!courseForm.title || !courseForm.category) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء الدورة الإلكترونية بنجاح" : "E-learning course created successfully"
    });

    setCourseForm({
      title: '',
      category: '',
      duration: '',
      lessons: '',
      level: '',
      instructor: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const handleEnrollCourse = (courseId: number) => {
    toast({
      title: isRTL ? "تم التسجيل" : "Enrolled",
      description: isRTL ? "تم تسجيلك في الدورة بنجاح" : "You have been enrolled in the course successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", class: string }> = {
      'نشط': { variant: 'default', class: 'bg-green-100 text-green-800 hover:bg-green-100' },
      'Active': { variant: 'default', class: 'bg-green-100 text-green-800 hover:bg-green-100' },
      'مكتمل': { variant: 'secondary', class: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      'Completed': { variant: 'secondary', class: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      'متوقف': { variant: 'destructive', class: 'bg-red-100 text-red-800 hover:bg-red-100' },
      'Paused': { variant: 'destructive', class: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };
    
    const config = statusMap[status] || { variant: 'outline' as const, class: '' };
    return <Badge variant={config.variant} className={config.class}>{status}</Badge>;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'إجمالي البرامج' : 'Total Programs'}</p>
                <p className="text-2xl font-bold">{trainingStats.totalPrograms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'متدربين نشطين' : 'Active Trainees'}</p>
                <p className="text-2xl font-bold">{trainingStats.activeTrainees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'ساعات مكتملة' : 'Completed Hours'}</p>
                <p className="text-2xl font-bold">{trainingStats.completedHours.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'شهادات صادرة' : 'Certificates Issued'}</p>
                <p className="text-2xl font-bold">{trainingStats.certificates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {isRTL ? 'تقدم الساعات التدريبية' : 'Training Hours Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? 'المكتمل' : 'Completed'}: {trainingStats.completedHours}</span>
                <span>{isRTL ? 'المستهدف' : 'Target'}: {trainingStats.targetHours}</span>
              </div>
              <Progress value={(trainingStats.completedHours / trainingStats.targetHours) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round((trainingStats.completedHours / trainingStats.targetHours) * 100)}% {isRTL ? 'من الهدف' : 'of target'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              {isRTL ? 'الميزانية المنفذة' : 'Budget Execution'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? 'المنفق' : 'Spent'}: {trainingStats.spentBudget.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
                <span>{isRTL ? 'المخطط' : 'Planned'}: {trainingStats.plannedBudget.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
              </div>
              <Progress value={(trainingStats.spentBudget / trainingStats.plannedBudget) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round((trainingStats.spentBudget / trainingStats.plannedBudget) * 100)}% {isRTL ? 'من الميزانية' : 'of budget'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'تقدم البرامج الشهري' : 'Monthly Programs Progress'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#3CB593" fill="#3CB593" name={isRTL ? 'مكتمل' : 'Completed'} />
                <Area type="monotone" dataKey="planned" stackId="1" stroke="#2563eb" fill="#2563eb" name={isRTL ? 'مخطط' : 'Planned'} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'توزيع أنواع التدريب' : 'Training Types Distribution'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie dataKey="value" data={typeDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTrainingPlan = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'الخطة التدريبية السنوية' : 'Annual Training Plan'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'خطة التدريب حسب الإدارات' : 'Training plan by departments'}</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'خطة جديدة' : 'New Plan'}
        </Button>
      </div>

      <div className="grid gap-4">
        {trainingPlan.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                <div className="lg:col-span-2">
                  <h4 className="font-semibold">{isRTL ? plan.department : plan.departmentEn}</h4>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? `${plan.completedPrograms} من ${plan.plannedPrograms} برنامج` : `${plan.completedPrograms} of ${plan.plannedPrograms} programs`}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{plan.progress}%</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'مكتمل' : 'Completed'}</p>
                </div>
                
                <div className="text-center">
                  <p className="font-semibold">{plan.spentBudget.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'من' : 'of'} {plan.plannedBudget.toLocaleString()}</p>
                </div>
                
                <div className="text-center">
                  <p className="font-semibold">{plan.trainedEmployees}</p>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'من' : 'of'} {plan.targetEmployees} {isRTL ? 'موظف' : 'employees'}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress value={plan.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProgramsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'إدارة البرامج التدريبية' : 'Training Programs Management'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'إنشاء وإدارة البرامج التدريبية' : 'Create and manage training programs'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'برنامج جديد' : 'New Program'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء برنامج تدريبي جديد' : 'Create New Training Program'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'اسم البرنامج' : 'Program Name'}</Label>
                  <Input 
                    value={programForm.title}
                    onChange={(e) => setProgramForm({...programForm, title: e.target.value})}
                    placeholder={isRTL ? 'أدخل اسم البرنامج' : 'Enter program name'}
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'نوع التدريب' : 'Training Type'}</Label>
                  <Select value={programForm.type} onValueChange={(value) => setProgramForm({...programForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">{isRTL ? 'حضوري' : 'In-Person'}</SelectItem>
                      <SelectItem value="online">{isRTL ? 'إلكتروني' : 'Online'}</SelectItem>
                      <SelectItem value="hybrid">{isRTL ? 'مختلط' : 'Hybrid'}</SelectItem>
                      <SelectItem value="external">{isRTL ? 'خارجي' : 'External'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'القسم' : 'Department'}</Label>
                  <Select value={programForm.department} onValueChange={(value) => setProgramForm({...programForm, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر القسم' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</SelectItem>
                      <SelectItem value="it">{isRTL ? 'تقنية المعلومات' : 'Information Technology'}</SelectItem>
                      <SelectItem value="finance">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
                      <SelectItem value="marketing">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{isRTL ? 'المدة (ساعة)' : 'Duration (Hours)'}</Label>
                  <Input 
                    value={programForm.duration}
                    onChange={(e) => setProgramForm({...programForm, duration: e.target.value})}
                    placeholder={isRTL ? 'المدة بالساعات' : 'Duration in hours'}
                    type="number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'المدرب' : 'Trainer'}</Label>
                  <Input 
                    value={programForm.trainer}
                    onChange={(e) => setProgramForm({...programForm, trainer: e.target.value})}
                    placeholder={isRTL ? 'اسم المدرب' : 'Trainer name'}
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'التكلفة' : 'Cost'}</Label>
                  <Input 
                    value={programForm.cost}
                    onChange={(e) => setProgramForm({...programForm, cost: e.target.value})}
                    placeholder={isRTL ? 'التكلفة بالريال' : 'Cost in SAR'}
                    type="number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                  <Input 
                    value={programForm.startDate}
                    onChange={(e) => setProgramForm({...programForm, startDate: e.target.value})}
                    type="date"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                  <Input 
                    value={programForm.endDate}
                    onChange={(e) => setProgramForm({...programForm, endDate: e.target.value})}
                    type="date"
                  />
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  value={programForm.description}
                  onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                  placeholder={isRTL ? 'وصف البرنامج وأهدافه' : 'Program description and objectives'}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateProgram} className="bg-primary hover:bg-primary/90">
                {isRTL ? 'إنشاء البرنامج' : 'Create Program'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? 'البحث في البرامج...' : 'Search programs...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={isRTL ? 'تصفية حسب' : 'Filter by'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'جميع البرامج' : 'All Programs'}</SelectItem>
            <SelectItem value="in-person">{isRTL ? 'حضوري' : 'In-Person'}</SelectItem>
            <SelectItem value="online">{isRTL ? 'إلكتروني' : 'Online'}</SelectItem>
            <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
            <SelectItem value="completed">{isRTL ? 'مكتمل' : 'Completed'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold">{isRTL ? program.title : program.titleEn}</h4>
                    {getStatusBadge(isRTL ? program.status : program.statusEn)}
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {isRTL ? `${program.department} • ${program.duration} • ${program.trainer}` : `${program.departmentEn} • ${program.durationEn} • ${program.trainerEn}`}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {program.startDate} - {program.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {program.participants} {isRTL ? 'مشارك' : 'participants'}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {program.cost.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{program.rating}</span>
                  </div>
                  <Progress value={program.completion} className="w-32 h-2" />
                  <span className="text-sm text-muted-foreground">{program.completion}%</span>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  {isRTL ? program.type : program.typeEn}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'إدارة الحضور والمشاركة' : 'Attendance & Participation Management'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'تتبع حضور المتدربين والشهادات' : 'Track trainee attendance and certificates'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'تسجيل حضور' : 'Record Attendance'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-muted-foreground">{isRTL ? 'حاضر' : 'Present'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">{isRTL ? 'غائب' : 'Absent'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متأخر' : 'Late'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'سجل الحضور' : 'Attendance Record'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{isRTL ? 'الموظف' : 'Employee'}</th>
                  <th className="text-left p-2">{isRTL ? 'البرنامج' : 'Program'}</th>
                  <th className="text-left p-2">{isRTL ? 'التاريخ' : 'Date'}</th>
                  <th className="text-left p-2">{isRTL ? 'الحالة' : 'Status'}</th>
                  <th className="text-left p-2">{isRTL ? 'ساعات الحضور' : 'Hours Attended'}</th>
                  <th className="text-left p-2">{isRTL ? 'التوقيع' : 'Signature'}</th>
                  <th className="text-left p-2">{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{(isRTL ? record.employeeName : record.employeeNameEn).charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{isRTL ? record.employeeName : record.employeeNameEn}</p>
                          <p className="text-xs text-muted-foreground">{record.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{isRTL ? record.program : record.programEn}</td>
                    <td className="p-2">{record.date}</td>
                    <td className="p-2">
                      {getStatusBadge(isRTL ? record.status : record.statusEn)}
                    </td>
                    <td className="p-2">{record.hoursAttended} {isRTL ? 'ساعة' : 'hours'}</td>
                    <td className="p-2">
                      {record.signature ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEvaluation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'تقييم البرامج التدريبية' : 'Training Programs Evaluation'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'تقييم فعالية وأثر البرامج التدريبية' : 'Evaluate effectiveness and impact of training programs'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'تقييم جديد' : 'New Evaluation'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.6</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط الرضا' : 'Average Satisfaction'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'فعالية التدريب' : 'Training Effectiveness'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">234</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تقييمات مكتملة' : 'Completed Evaluations'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'تقييمات البرامج الحديثة' : 'Recent Program Evaluations'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingPrograms.map((program) => (
                <div key={program.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{isRTL ? program.title : program.titleEn}</h4>
                    <p className="text-sm text-muted-foreground">{isRTL ? program.department : program.departmentEn}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{program.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{program.participants} {isRTL ? 'تقييم' : 'reviews'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'تحليل الأثر التدريبي' : 'Training Impact Analysis'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'تحسن الأداء' : 'Performance Improvement'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'تطبيق المهارات' : 'Skills Application'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'رضا المتدربين' : 'Trainee Satisfaction'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'العائد على الاستثمار' : 'ROI'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={68} className="w-20 h-2" />
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderELearningAcademy = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Monitor className="h-6 w-6 text-primary" />
            {isRTL ? 'الأكاديمية الإلكترونية' : 'E-Learning Academy'}
          </h3>
          <p className="text-muted-foreground">{isRTL ? 'منصة التعلم الرقمي والدورات الإلكترونية' : 'Digital learning platform and online courses'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'دورة جديدة' : 'New Course'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء دورة إلكترونية جديدة' : 'Create New E-Learning Course'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'اسم الدورة' : 'Course Name'}</Label>
                  <Input 
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    placeholder={isRTL ? 'أدخل اسم الدورة' : 'Enter course name'}
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'الفئة' : 'Category'}</Label>
                  <Select value={courseForm.category} onValueChange={(value) => setCourseForm({...courseForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الفئة' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="management">{isRTL ? 'إدارة' : 'Management'}</SelectItem>
                      <SelectItem value="technical">{isRTL ? 'تقني' : 'Technical'}</SelectItem>
                      <SelectItem value="skills">{isRTL ? 'مهارات' : 'Skills'}</SelectItem>
                      <SelectItem value="language">{isRTL ? 'لغات' : 'Languages'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>{isRTL ? 'المدة (ساعة)' : 'Duration (Hours)'}</Label>
                  <Input 
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                    placeholder={isRTL ? 'المدة' : 'Duration'}
                    type="number"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'عدد الدروس' : 'Number of Lessons'}</Label>
                  <Input 
                    value={courseForm.lessons}
                    onChange={(e) => setCourseForm({...courseForm, lessons: e.target.value})}
                    placeholder={isRTL ? 'عدد الدروس' : 'Lessons count'}
                    type="number"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'المستوى' : 'Level'}</Label>
                  <Select value={courseForm.level} onValueChange={(value) => setCourseForm({...courseForm, level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر المستوى' : 'Select level'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{isRTL ? 'مبتدئ' : 'Beginner'}</SelectItem>
                      <SelectItem value="intermediate">{isRTL ? 'متوسط' : 'Intermediate'}</SelectItem>
                      <SelectItem value="advanced">{isRTL ? 'متقدم' : 'Advanced'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'المدرس' : 'Instructor'}</Label>
                <Input 
                  value={courseForm.instructor}
                  onChange={(e) => setCourseForm({...courseForm, instructor: e.target.value})}
                  placeholder={isRTL ? 'اسم المدرس' : 'Instructor name'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  placeholder={isRTL ? 'وصف الدورة ومحتوياتها' : 'Course description and contents'}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateCourse} className="bg-primary hover:bg-primary/90">
                {isRTL ? 'إنشاء الدورة' : 'Create Course'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">{trainingStats.elearningCourses}</p>
                <p className="text-blue-100 text-sm">{isRTL ? 'دورة متاحة' : 'Available Courses'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-green-100 text-sm">{isRTL ? 'طالب مسجل' : 'Enrolled Students'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">456</p>
                <p className="text-purple-100 text-sm">{isRTL ? 'شهادة مكتملة' : 'Certificates Earned'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">2,890</p>
                <p className="text-orange-100 text-sm">{isRTL ? 'ساعة تعلم' : 'Learning Hours'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? 'البحث في الدورات...' : 'Search courses...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={isRTL ? 'تصفية حسب الفئة' : 'Filter by category'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</SelectItem>
            <SelectItem value="management">{isRTL ? 'إدارة' : 'Management'}</SelectItem>
            <SelectItem value="technical">{isRTL ? 'تقني' : 'Technical'}</SelectItem>
            <SelectItem value="skills">{isRTL ? 'مهارات' : 'Skills'}</SelectItem>
            <SelectItem value="language">{isRTL ? 'لغات' : 'Languages'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elearningCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCourse(course)}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/30 flex items-center justify-center">
                  <Play className="h-12 w-12 text-primary" />
                </div>
                <Badge className="absolute top-2 right-2 bg-white text-primary">
                  {isRTL ? course.level : course.levelEn}
                </Badge>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {isRTL ? course.category : course.categoryEn}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{isRTL ? course.title : course.titleEn}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {isRTL ? course.description : course.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {isRTL ? course.duration : course.durationEn}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} {isRTL ? 'درس' : 'lessons'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.enrolled}
                  </span>
                </div>
                
                {course.progress > 0 ? (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ) : null}
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnrollCourse(course.id);
                    }}
                  >
                    {course.progress > 0 ? (isRTL ? 'متابعة' : 'Continue') : (isRTL ? 'التسجيل' : 'Enroll')}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                {isRTL ? selectedCourse.title : selectedCourse.titleEn}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{isRTL ? 'تفاصيل الدورة' : 'Course Details'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المدرس:' : 'Instructor:'}</span>
                      <span>{isRTL ? selectedCourse.instructor : selectedCourse.instructorEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المدة:' : 'Duration:'}</span>
                      <span>{isRTL ? selectedCourse.duration : selectedCourse.durationEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'عدد الدروس:' : 'Lessons:'}</span>
                      <span>{selectedCourse.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المستوى:' : 'Level:'}</span>
                      <span>{isRTL ? selectedCourse.level : selectedCourse.levelEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'التقييم:' : 'Rating:'}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{selectedCourse.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{isRTL ? 'إحصائيات التسجيل' : 'Enrollment Stats'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المسجلين:' : 'Enrolled:'}</span>
                      <span>{selectedCourse.enrolled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'مكتمل:' : 'Completed:'}</span>
                      <span>{selectedCourse.completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'معدل الإكمال:' : 'Completion Rate:'}</span>
                      <span>{Math.round((selectedCourse.completed / selectedCourse.enrolled) * 100)}%</span>
                    </div>
                  </div>
                  
                  {selectedCourse.progress > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">{isRTL ? 'تقدمك' : 'Your Progress'}</h4>
                      <Progress value={selectedCourse.progress} className="h-3 mb-2" />
                      <p className="text-sm text-muted-foreground">{selectedCourse.progress}% {isRTL ? 'مكتمل' : 'completed'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{isRTL ? 'وصف الدورة' : 'Course Description'}</h4>
                <p className="text-sm text-muted-foreground">{isRTL ? selectedCourse.description : selectedCourse.descriptionEn}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                {isRTL ? 'إغلاق' : 'Close'}
              </Button>
              <Button onClick={() => handleEnrollCourse(selectedCourse.id)} className="bg-primary hover:bg-primary/90">
                {selectedCourse.progress > 0 ? (isRTL ? 'متابعة التعلم' : 'Continue Learning') : (isRTL ? 'التسجيل في الدورة' : 'Enroll in Course')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'تقارير شاملة عن أداء التدريب' : 'Comprehensive training performance reports'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="h-4 w-4 mr-2" />
          {isRTL ? 'تقرير جديد' : 'New Report'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير فردي' : 'Individual Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تقرير مفصل لكل موظف' : 'Detailed report per employee'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير إداري' : 'Departmental Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تقرير حسب الأقسام' : 'Report by departments'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تحليل الأثر' : 'Impact Analysis'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'قياس أثر التدريب' : 'Measure training impact'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <PieChart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير مقارن' : 'Comparative Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'مقارنة بين الفترات' : 'Compare across periods'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'تقارير سريعة' : 'Quick Reports'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تصدير كشف الحضور' : 'Export Attendance Sheet'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تقرير الساعات التدريبية' : 'Training Hours Report'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تقرير التكاليف' : 'Cost Report'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تقرير الشهادات' : 'Certificates Report'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'إحصائيات سريعة' : 'Quick Statistics'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'أعلى قسم في التدريب:' : 'Top Training Department:'}</span>
                <span className="font-semibold">{isRTL ? 'تقنية المعلومات' : 'Information Technology'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'أفضل مدرب:' : 'Top Trainer:'}</span>
                <span className="font-semibold">{isRTL ? 'د. أحمد محمد' : 'Dr. Ahmed Mohammed'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'أكثر دورة شعبية:' : 'Most Popular Course:'}</span>
                <span className="font-semibold">{isRTL ? 'القيادة الإدارية' : 'Management Leadership'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'متوسط التقييم:' : 'Average Rating:'}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.6</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabContent = {
    dashboard: renderDashboard,
    plan: renderTrainingPlan,
    programs: renderProgramsManagement,
    attendance: renderAttendance,
    evaluation: renderEvaluation,
    elearning: renderELearningAcademy,
    reports: renderReports,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'نظام التدريب والتأهيل المتكامل' : 'Comprehensive Training & Development System'}
                </h1>
                <p className="text-muted-foreground">
                  {isRTL ? 'إدارة شاملة للتدريب مع الأكاديمية الإلكترونية' : 'Complete training management with E-Learning Academy'}
                </p>
              </div>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {isRTL ? 'العودة' : 'Back'}
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border/40 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-7 gap-1 bg-muted/50">
                <TabsTrigger value="dashboard" className="flex items-center gap-2 text-xs">
                  <BarChart3 className="h-4 w-4" />
                  {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                </TabsTrigger>
                <TabsTrigger value="plan" className="flex items-center gap-2 text-xs">
                  <Calendar className="h-4 w-4" />
                  {isRTL ? 'الخطة السنوية' : 'Annual Plan'}
                </TabsTrigger>
                <TabsTrigger value="programs" className="flex items-center gap-2 text-xs">
                  <BookOpen className="h-4 w-4" />
                  {isRTL ? 'البرامج' : 'Programs'}
                </TabsTrigger>
                <TabsTrigger value="attendance" className="flex items-center gap-2 text-xs">
                  <Users className="h-4 w-4" />
                  {isRTL ? 'الحضور' : 'Attendance'}
                </TabsTrigger>
                <TabsTrigger value="evaluation" className="flex items-center gap-2 text-xs">
                  <Star className="h-4 w-4" />
                  {isRTL ? 'التقييم' : 'Evaluation'}
                </TabsTrigger>
                <TabsTrigger value="elearning" className="flex items-center gap-2 text-xs">
                  <Monitor className="h-4 w-4" />
                  {isRTL ? 'الأكاديمية' : 'E-Learning'}
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2 text-xs">
                  <FileText className="h-4 w-4" />
                  {isRTL ? 'التقارير' : 'Reports'}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              {Object.entries(tabContent).map(([key, renderContent]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  {renderContent()}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveTrainingDevelopment;