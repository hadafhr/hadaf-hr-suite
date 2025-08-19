import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  GraduationCap,
  BookOpen, 
  Award,
  Clock,
  Star,
  TrendingUp,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  Activity,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Building2,
  Target
} from 'lucide-react';
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

interface Trainee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  avatar: string;
  enrolledCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  averageGrade: number;
  certificates: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  phone?: string;
}

interface TraineeProgress {
  courseId: string;
  courseName: string;
  progress: number;
  startDate: string;
  lastAccessed: string;
  grade?: number;
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped';
  assignments: {
    total: number;
    completed: number;
    pending: number;
  };
  attendance: {
    attended: number;
    total: number;
    percentage: number;
  };
}

export const TraineeManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { courses } = useTrainingSystem();

  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [showTraineeDetails, setShowTraineeDetails] = useState(false);

  // Sample trainees data
  const [trainees] = useState<Trainee[]>([
    {
      id: 'trainee_1',
      employeeId: 'EMP001',
      fullName: 'أحمد محمد الأحمد',
      email: 'ahmed.mohammed@company.com',
      department: 'تقنية المعلومات',
      position: 'مطور برامج',
      avatar: '/lovable-uploads/e178bb8e-1473-4998-a200-54739ac16b3e.png',
      enrolledCourses: 5,
      completedCourses: 3,
      inProgressCourses: 2,
      totalHours: 120,
      averageGrade: 87,
      certificates: 3,
      lastActivity: '2024-02-19T14:30:00Z',
      status: 'active',
      joinDate: '2024-01-15T10:00:00Z',
      phone: '+966501234567'
    },
    {
      id: 'trainee_2',
      employeeId: 'EMP002',
      fullName: 'فاطمة الزهراني',
      email: 'fatima.alzahrani@company.com',
      department: 'الموارد البشرية',
      position: 'أخصائية موارد بشرية',
      avatar: '/lovable-uploads/ebeb1cac-6889-402f-800b-60ea4e5b64c5.png',
      enrolledCourses: 7,
      completedCourses: 6,
      inProgressCourses: 1,
      totalHours: 180,
      averageGrade: 94,
      certificates: 6,
      lastActivity: '2024-02-20T09:15:00Z',
      status: 'active',
      joinDate: '2023-12-01T08:00:00Z',
      phone: '+966507654321'
    },
    {
      id: 'trainee_3',
      employeeId: 'EMP003',
      fullName: 'خالد العتيبي',
      email: 'khalid.alotaibi@company.com',
      department: 'التسويق',
      position: 'مختص تسويق رقمي',
      avatar: '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png',
      enrolledCourses: 4,
      completedCourses: 2,
      inProgressCourses: 2,
      totalHours: 96,
      averageGrade: 79,
      certificates: 2,
      lastActivity: '2024-02-18T16:45:00Z',
      status: 'active',
      joinDate: '2024-02-01T09:30:00Z',
      phone: '+966555123456'
    },
    {
      id: 'trainee_4',
      employeeId: 'EMP004',
      fullName: 'نورا السالم',
      email: 'nora.alsalem@company.com',
      department: 'المالية',
      position: 'محاسبة',
      avatar: '/lovable-uploads/9315a174-2c21-4ec0-8554-b4936be67676.png',
      enrolledCourses: 3,
      completedCourses: 1,
      inProgressCourses: 1,
      totalHours: 45,
      averageGrade: 91,
      certificates: 1,
      lastActivity: '2024-02-17T11:20:00Z',
      status: 'inactive',
      joinDate: '2024-01-20T14:00:00Z',
      phone: '+966512345678'
    }
  ]);

  // Sample trainee progress data
  const traineeProgress: TraineeProgress[] = [
    {
      courseId: '1',
      courseName: 'أساسيات إدارة المشاريع',
      progress: 75,
      startDate: '2024-02-01T10:00:00Z',
      lastAccessed: '2024-02-19T14:30:00Z',
      grade: 87,
      status: 'in-progress',
      assignments: { total: 5, completed: 4, pending: 1 },
      attendance: { attended: 8, total: 10, percentage: 80 }
    },
    {
      courseId: '2',
      courseName: 'التسويق الرقمي المتقدم',
      progress: 100,
      startDate: '2024-01-15T09:00:00Z',
      lastAccessed: '2024-02-15T16:00:00Z',
      grade: 94,
      status: 'completed',
      assignments: { total: 6, completed: 6, pending: 0 },
      attendance: { attended: 12, total: 12, percentage: 100 }
    }
  ];

  // Filter trainees
  const filteredTrainees = trainees.filter(trainee => {
    const matchesSearch = trainee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || trainee.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'inactive': { text: isRTL ? 'غير نشط' : 'Inactive', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
      'suspended': { text: isRTL ? 'موقوف' : 'Suspended', className: 'bg-red-500/10 text-red-500 border-red-500/20' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getProgressStatusBadge = (status: string) => {
    const statusConfig = {
      'enrolled': { text: isRTL ? 'مسجل' : 'Enrolled', className: 'bg-blue-500/10 text-blue-500' },
      'in-progress': { text: isRTL ? 'قيد التقدم' : 'In Progress', className: 'bg-yellow-500/10 text-yellow-500' },
      'completed': { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-green-500/10 text-green-500' },
      'dropped': { text: isRTL ? 'منسحب' : 'Dropped', className: 'bg-red-500/10 text-red-500' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const handleTraineeClick = (trainee: Trainee) => {
    setSelectedTrainee(trainee);
    setShowTraineeDetails(true);
  };

  // Calculate statistics
  const stats = {
    totalTrainees: trainees.length,
    activeTrainees: trainees.filter(t => t.status === 'active').length,
    totalEnrollments: trainees.reduce((sum, t) => sum + t.enrolledCourses, 0),
    averageCompletion: Math.round(trainees.reduce((sum, t) => sum + (t.completedCourses / Math.max(t.enrolledCourses, 1)) * 100, 0) / trainees.length),
    totalCertificates: trainees.reduce((sum, t) => sum + t.certificates, 0),
    averageGrade: Math.round(trainees.reduce((sum, t) => sum + t.averageGrade, 0) / trainees.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'إدارة المتدربين' : 'Trainee Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'متابعة وإدارة تقدم المتدربين في البرامج التدريبية' : 'Track and manage trainee progress in training programs'}
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المتدربين' : 'Total Trainees'}</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalTrainees}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'المتدربين النشطين' : 'Active Trainees'}</p>
                <p className="text-2xl font-bold text-green-500">{stats.activeTrainees}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي التسجيلات' : 'Total Enrollments'}</p>
                <p className="text-2xl font-bold text-blue-500">{stats.totalEnrollments}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط الإكمال' : 'Avg Completion'}</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.averageCompletion}%</p>
              </div>
              <Target className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'الشهادات الصادرة' : 'Certificates Issued'}</p>
                <p className="text-2xl font-bold text-purple-500">{stats.totalCertificates}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط الدرجات' : 'Average Grade'}</p>
                <p className="text-2xl font-bold text-orange-500">{stats.averageGrade}%</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="progress">{isRTL ? 'التقدم' : 'Progress Tracking'}</TabsTrigger>
          <TabsTrigger value="performance">{isRTL ? 'الأداء' : 'Performance'}</TabsTrigger>
          <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في المتدربين...' : 'Search trainees...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                {isRTL ? 'الكل' : 'All'}
              </Button>
              <Button
                variant={selectedFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('active')}
              >
                {isRTL ? 'نشط' : 'Active'}
              </Button>
              <Button
                variant={selectedFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('inactive')}
              >
                {isRTL ? 'غير نشط' : 'Inactive'}
              </Button>
            </div>
          </div>

          {/* Trainees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainees.map((trainee) => {
              const statusBadge = getStatusBadge(trainee.status);
              const completionRate = trainee.enrolledCourses > 0 ? (trainee.completedCourses / trainee.enrolledCourses) * 100 : 0;
              
              return (
                <Card key={trainee.id} className="border-border bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleTraineeClick(trainee)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={trainee.avatar} />
                        <AvatarFallback>{trainee.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{trainee.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{trainee.position}</p>
                            <p className="text-xs text-muted-foreground">{trainee.department}</p>
                          </div>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-2 bg-accent/50 rounded">
                          <p className="font-bold text-lg text-primary">{trainee.enrolledCourses}</p>
                          <p className="text-muted-foreground text-xs">{isRTL ? 'دورات مسجلة' : 'Enrolled'}</p>
                        </div>
                        <div className="text-center p-2 bg-accent/50 rounded">
                          <p className="font-bold text-lg text-green-500">{trainee.completedCourses}</p>
                          <p className="text-muted-foreground text-xs">{isRTL ? 'دورات مكتملة' : 'Completed'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</span>
                          <span className="font-medium">{Math.round(completionRate)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <p className="font-medium text-yellow-500">{trainee.averageGrade}%</p>
                          <p className="text-muted-foreground">{isRTL ? 'متوسط الدرجات' : 'Avg Grade'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-purple-500">{trainee.certificates}</p>
                          <p className="text-muted-foreground">{isRTL ? 'شهادات' : 'Certificates'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-blue-500">{trainee.totalHours}h</p>
                          <p className="text-muted-foreground">{isRTL ? 'ساعات' : 'Hours'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{isRTL ? 'آخر نشاط:' : 'Last activity:'}</span>
                        <span>{new Date(trainee.lastActivity).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {isRTL ? 'رسالة' : 'Message'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'تتبع التقدم المفصل' : 'Detailed Progress Tracking'}</h3>
            <div className="space-y-4">
              {traineeProgress.map((progress, index) => {
                const statusBadge = getProgressStatusBadge(progress.status);
                return (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{progress.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'بدأ في:' : 'Started:'} {new Date(progress.startDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Badge className={statusBadge.className}>
                        {statusBadge.text}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'التقدم العام' : 'Overall Progress'}</span>
                          <span className="font-medium">{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'المهام' : 'Assignments'}</span>
                          <span className="font-medium">{progress.assignments.completed}/{progress.assignments.total}</span>
                        </div>
                        <Progress value={(progress.assignments.completed / progress.assignments.total) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'الحضور' : 'Attendance'}</span>
                          <span className="font-medium">{progress.attendance.percentage}%</span>
                        </div>
                        <Progress value={progress.attendance.percentage} className="h-2" />
                      </div>
                    </div>
                    
                    {progress.grade && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{isRTL ? 'الدرجة:' : 'Grade:'} <strong>{progress.grade}%</strong></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'تحليل الأداء' : 'Performance Analytics'}</h3>
            <p className="text-muted-foreground">
              {isRTL ? 'تحليلات مفصلة لأداء المتدربين ونتائج التقييمات' : 'Detailed analytics on trainee performance and assessment results'}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'تقارير المتدربين' : 'Trainee Reports'}</h3>
            <p className="text-muted-foreground">
              {isRTL ? 'تقارير شاملة عن أداء وتقدم المتدربين قابلة للتصدير' : 'Comprehensive reports on trainee performance and progress for export'}
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trainee Details Dialog */}
      <Dialog open={showTraineeDetails} onOpenChange={setShowTraineeDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {selectedTrainee ? selectedTrainee.fullName : (isRTL ? 'تفاصيل المتدرب' : 'Trainee Details')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTrainee && (
            <div className="space-y-6">
              {/* Trainee Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">{isRTL ? 'المعلومات الشخصية' : 'Personal Information'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTrainee.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTrainee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTrainee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTrainee.department}</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">{isRTL ? 'إحصائيات التدريب' : 'Training Statistics'}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{selectedTrainee.enrolledCourses}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'دورات مسجلة' : 'Enrolled Courses'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{selectedTrainee.completedCourses}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'دورات مكتملة' : 'Completed Courses'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-500">{selectedTrainee.averageGrade}%</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'متوسط الدرجات' : 'Average Grade'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-500">{selectedTrainee.certificates}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'شهادات' : 'Certificates'}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};