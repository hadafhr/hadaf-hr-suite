import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Award,
  Clock,
  Users,
  Star,
  Download,
  Calendar,
  Video,
  UserCheck,
  Settings,
  Plus,
  TrendingUp,
  Monitor,
  MessageSquare,
  Eye,
  Search,
  Filter,
  Brain,
  FileText,
  Camera,
  Mic,
  Share2,
  BarChart3,
  ArrowLeft,
  LogIn,
  Play as PlayIcon,
  User,
  Building2,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Import training components
import { LiveStreamPlayer } from './LiveStreamPlayer';
import { CourseCreator } from './CourseCreator';
import { StudentDashboard } from './StudentDashboard';
import { InstructorDashboard } from './InstructorDashboard';
import { AIAssistant } from './AITrainingAssistant';
import { AssessmentManager } from './AssessmentManager';
import { CertificateManager } from './CertificateManager';
import { InstructorManagement } from './InstructorManagement';
import { TrainingAnalytics } from './TrainingAnalytics';
import { LiveSessionsManager } from './LiveSessionsManager';
import { TraineeManagement } from './TraineeManagement';
import { LearningTracksManager } from './LearningTracksManager';
import { CourseViewer } from './CourseViewer';
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

interface TrainingDashboardProps {
  onBack: () => void;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { courses, stats, loading } = useTrainingSystem();
  
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedView, setSelectedView] = useState('admin'); // admin, instructor, trainee, hr-admin
  const [showCourseCreator, setShowCourseCreator] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showCourseViewer, setShowCourseViewer] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Enhanced sample data for complete functionality
  const enhancedStats = {
    ...stats,
    totalCourses: 45,
    activeLiveSessions: 8,
    completedTrainings: 234,
    topTrainers: 15,
    totalTrainees: 1247,
    pendingTasks: 23,
    thisMonthEnrollments: 156,
    averageCompletion: 89,
    certificatesGenerated: 342,
    ongoingAssignments: 67
  };

  // Sample upcoming courses with timers
  const upcomingCourses = [
    {
      id: 'uc1',
      title: 'إدارة المشاريع المتقدمة',
      instructor: 'د. محمد الأحمد',
      startTime: '2024-02-20T14:00:00Z',
      participants: 45,
      maxParticipants: 60,
      isLive: true
    },
    {
      id: 'uc2', 
      title: 'التسويق الرقمي الحديث',
      instructor: 'أ. سارة المطيري',
      startTime: '2024-02-20T16:30:00Z',
      participants: 32,
      maxParticipants: 50,
      isLive: false
    }
  ];

  // Recent activity logs
  const recentActivity = [
    { id: 1, type: 'enrollment', user: 'أحمد محمد', action: 'تسجيل في دورة React', time: '10:30 ص', icon: BookOpen },
    { id: 2, type: 'completion', user: 'فاطمة الزهراني', action: 'أكمل دورة إدارة المشاريع', time: '09:45 ص', icon: CheckCircle },
    { id: 3, type: 'live', user: 'د. محمد الأحمد', action: 'بدأ جلسة مباشرة', time: '09:15 ص', icon: Video },
    { id: 4, type: 'assignment', user: 'خالد العتيبي', action: 'رفع مهمة التسويق الرقمي', time: '08:30 ص', icon: FileText }
  ];

  // AI Alerts and recommendations
  const aiAlerts = [
    {
      type: 'warning',
      title: 'انخفاض في التفاعل',
      message: 'دورة البرمجة تحتاج لمراجعة المحتوى - معدل المشاركة 45%',
      priority: 'high'
    },
    {
      type: 'success',
      title: 'أداء ممتاز',
      message: 'دورة إدارة المشاريع حققت معدل إكمال 96%',
      priority: 'low'
    },
    {
      type: 'info',
      title: 'توصية جديدة',
      message: 'ينصح بإضافة دورة في الذكاء الاصطناعي للقسم التقني',
      priority: 'medium'
    }
  ];

  // Handle entering a course (live or recorded)
  const handleEnterCourse = (course: any) => {
    if (course.isLive) {
      setSelectedCourse(course);
      setShowLiveStream(true);
    } else {
      setSelectedCourse(course);
      setShowCourseViewer(true);
    }
  };

  // Render different views based on user role
  if (selectedView === 'instructor') {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-between p-6 border-b">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isRTL ? 'رجوع' : 'Back'}
          </Button>
          <div className="flex gap-2">
            {['admin', 'trainee', 'hr-admin'].map((role) => (
              <Button
                key={role}
                variant={selectedView === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedView(role)}
              >
                {role === 'admin' ? (isRTL ? 'مشرف تدريب' : 'Training Admin') :
                 role === 'trainee' ? (isRTL ? 'متدرب' : 'Trainee') :
                 (isRTL ? 'مدير الموارد البشرية' : 'HR Admin')}
              </Button>
            ))}
          </div>
        </div>
        <InstructorDashboard />
      </div>
    );
  }

  if (selectedView === 'trainee') {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-between p-6 border-b">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {isRTL ? 'رجوع' : 'Back'}
          </Button>
          <div className="flex gap-2">
            {['admin', 'instructor', 'hr-admin'].map((role) => (
              <Button
                key={role}
                variant={selectedView === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedView(role)}
              >
                {role === 'admin' ? (isRTL ? 'مشرف تدريب' : 'Training Admin') :
                 role === 'instructor' ? (isRTL ? 'مدرب' : 'Instructor') :
                 (isRTL ? 'مدير الموارد البشرية' : 'HR Admin')}
              </Button>
            ))}
          </div>
        </div>
        <StudentDashboard />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 border-border hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isRTL ? 'نظام التدريب والتطوير المتكامل' : 'Complete Training & Development System'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'منصة احترافية شاملة للتدريب المؤسسي بالذكاء الاصطناعي والتحليلات المتقدمة' : 'Professional comprehensive platform for corporate training with AI and advanced analytics'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex border border-border rounded-lg p-1 bg-card">
              <Button
                variant={selectedView === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('admin')}
                className="text-xs"
              >
                <Settings className="h-3 w-3 mr-1" />
                {isRTL ? 'مشرف تدريب' : 'Training Admin'}
              </Button>
              <Button
                variant={selectedView === 'instructor' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('instructor')}
                className="text-xs"
              >
                <UserCheck className="h-3 w-3 mr-1" />
                {isRTL ? 'مدرب' : 'Instructor'}
              </Button>
              <Button
                variant={selectedView === 'trainee' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('trainee')}
                className="text-xs"
              >
                <GraduationCap className="h-3 w-3 mr-1" />
                {isRTL ? 'متدرب' : 'Trainee'}
              </Button>
              <Button
                variant={selectedView === 'hr-admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('hr-admin')}
                className="text-xs"
              >
                <Building2 className="h-3 w-3 mr-1" />
                {isRTL ? 'إدارة الموارد البشرية' : 'HR Admin'}
              </Button>
            </div>

            {/* AI Assistant */}
            <Button
              variant="outline"
              onClick={() => setShowAIAssistant(true)}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:from-primary/20 hover:to-secondary/20"
            >
              <Brain className="h-4 w-4 mr-2" />
              {isRTL ? 'المساعد الذكي' : 'AI Assistant'}
            </Button>

            {/* Create Course Button */}
            <Button
              onClick={() => setShowCourseCreator(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إنشاء دورة جديدة' : 'Create New Course'}
            </Button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-card border border-border">
            <TabsTrigger value="dashboard" className="text-sm font-medium">
              <Monitor className="h-4 w-4 mr-1" />
              {isRTL ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-sm font-medium">
              <BookOpen className="h-4 w-4 mr-1" />
              {isRTL ? 'الدورات التدريبية' : 'Training Courses'}
            </TabsTrigger>
            <TabsTrigger value="certificates" className="text-sm font-medium">
              <Award className="h-4 w-4 mr-1" />
              {isRTL ? 'الشهادات' : 'Certificates'}
            </TabsTrigger>
            <TabsTrigger value="trainees" className="text-sm font-medium">
              <Users className="h-4 w-4 mr-1" />
              {isRTL ? 'المتدربين' : 'Trainees'}
            </TabsTrigger>
            <TabsTrigger value="learning-tracks" className="text-sm font-medium">
              <Target className="h-4 w-4 mr-1" />
              {isRTL ? 'مسارات التعلم' : 'Learning Tracks'}
            </TabsTrigger>
            <TabsTrigger value="live-sessions" className="text-sm font-medium">
              <Video className="h-4 w-4 mr-1" />
              {isRTL ? 'البث المباشر' : 'Live Sessions'}
            </TabsTrigger>
            <TabsTrigger value="instructors" className="text-sm font-medium">
              <UserCheck className="h-4 w-4 mr-1" />
              {isRTL ? 'المدربين' : 'Instructors'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              <BarChart3 className="h-4 w-4 mr-1" />
              {isRTL ? 'التحليلات والتقارير' : 'Analytics & Reports'}
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab - Main Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {isRTL ? 'إجمالي الدورات' : 'Total Courses'}
                      </p>
                      <p className="text-2xl font-bold text-foreground">{enhancedStats.totalCourses}</p>
                      <p className="text-xs text-green-500 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {isRTL ? '+8 هذا الشهر' : '+8 this month'}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {isRTL ? 'جلسات مباشرة نشطة' : 'Active Live Sessions'}
                      </p>
                      <p className="text-2xl font-bold text-red-500">{enhancedStats.activeLiveSessions}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isRTL ? 'جاري الآن' : 'Currently running'}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Video className="h-6 w-6 text-red-500 animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {isRTL ? 'التدريبات المكتملة' : 'Completed Trainings'}
                      </p>
                      <p className="text-2xl font-bold text-green-500">{enhancedStats.completedTrainings}</p>
                      <p className="text-xs text-green-500 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {isRTL ? `معدل إكمال ${enhancedStats.averageCompletion}%` : `${enhancedStats.averageCompletion}% completion rate`}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {isRTL ? 'إجمالي المتدربين' : 'Total Trainees'}
                      </p>
                      <p className="text-2xl font-bold text-blue-500">{enhancedStats.totalTrainees.toLocaleString()}</p>
                      <p className="text-xs text-blue-500 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {isRTL ? `+${enhancedStats.thisMonthEnrollments} هذا الشهر` : `+${enhancedStats.thisMonthEnrollments} this month`}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Courses with Timer */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {isRTL ? 'الدورات القادمة' : 'Upcoming Courses'}
                  </div>
                  <Badge variant="outline" className="animate-pulse">
                    {isRTL ? 'مباشر' : 'LIVE'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {upcomingCourses.map((course) => (
                    <div key={course.id} className="p-4 border border-border rounded-lg bg-accent/5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        {course.isLive && (
                          <div className="flex items-center gap-1 text-red-500 text-xs">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {isRTL ? 'مباشر' : 'LIVE'}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span>{new Date(course.startTime).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>{course.participants}/{course.maxParticipants} {isRTL ? 'مشارك' : 'participants'}</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleEnterCourse(course)}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        {course.isLive ? (isRTL ? 'دخول البث المباشر' : 'Enter Live Session') : (isRTL ? 'دخول الدورة' : 'Enter Course')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Alerts and Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Alerts */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    {isRTL ? 'تنبيهات الذكاء الاصطناعي' : 'AI Alerts & Recommendations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiAlerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10' :
                        alert.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-900/10' :
                        'bg-blue-50 border-blue-200 dark:bg-blue-900/10'
                      }`}>
                        <div className="flex items-start gap-3">
                          {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                          {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                          {alert.type === 'info' && <Target className="h-4 w-4 text-blue-500 mt-0.5" />}
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    {isRTL ? 'النشاط الأخير' : 'Recent Activity'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.type === 'completion' ? 'bg-green-500/10' :
                          activity.type === 'live' ? 'bg-red-500/10' :
                          activity.type === 'enrollment' ? 'bg-blue-500/10' :
                          'bg-purple-500/10'
                        }`}>
                          <activity.icon className={`h-4 w-4 ${
                            activity.type === 'completion' ? 'text-green-500' :
                            activity.type === 'live' ? 'text-red-500' :
                            activity.type === 'enrollment' ? 'text-blue-500' :
                            'text-purple-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Training Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{isRTL ? 'الدورات التدريبية' : 'Training Courses'}</h2>
              <Button onClick={() => setShowCourseCreator(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة دورة جديدة' : 'Add New Course'}
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الدورات...' : 'Search courses...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-border bg-card"
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
                  variant={selectedFilter === 'live' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('live')}
                >
                  {isRTL ? 'مباشر' : 'Live'}
                </Button>
                <Button
                  variant={selectedFilter === 'recorded' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('recorded')}
                >
                  {isRTL ? 'مسجل' : 'Recorded'}
                </Button>
                <Button
                  variant={selectedFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('active')}
                >
                  {isRTL ? 'نشط' : 'Active'}
                </Button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Live indicator */}
                    {course.isLive && (
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {isRTL ? 'مباشر الآن' : 'LIVE NOW'}
                      </div>
                    )}

                    {/* AI badge */}
                    {course.hasAI && (
                      <div className="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        AI
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg mb-1 line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{course.englishTitle}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المدرب:' : 'Instructor:'}</span>
                          <span className="font-medium">{course.instructor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المدة:' : 'Duration:'}</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المسجلين:' : 'Enrolled:'}</span>
                          <span>{course.enrolled}/{course.capacity}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleEnterCourse(course)}
                        >
                          <LogIn className="h-3 w-3 mr-1" />
                          {course.isLive ? (isRTL ? 'دخول مباشر' : 'Enter Live') : (isRTL ? 'دخول الدورة' : 'Enter Course')}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <CertificateManager />
          </TabsContent>

          {/* Trainees Tab */}
          <TabsContent value="trainees">
            <TraineeManagement />
          </TabsContent>

          {/* Learning Tracks Tab */}
          <TabsContent value="learning-tracks">
            <LearningTracksManager />
          </TabsContent>

          {/* Live Sessions Tab */}
          <TabsContent value="live-sessions">
            <LiveSessionsManager />
          </TabsContent>

          {/* Instructors Tab */}
          <TabsContent value="instructors">
            <InstructorManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <TrainingAnalytics />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        
        {/* Course Creator Dialog */}
        <Dialog open={showCourseCreator} onOpenChange={setShowCourseCreator}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء دورة تدريبية جديدة' : 'Create New Training Course'}</DialogTitle>
            </DialogHeader>
            <CourseCreator />
          </DialogContent>
        </Dialog>

        {/* AI Assistant Dialog */}
        <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                {isRTL ? 'المساعد الذكي للتدريب' : 'AI Training Assistant'}
              </DialogTitle>
            </DialogHeader>
            <AIAssistant onClose={() => setShowAIAssistant(false)} />
          </DialogContent>
        </Dialog>

        {/* Live Stream Dialog */}
        <Dialog open={showLiveStream} onOpenChange={setShowLiveStream}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-500" />
                {selectedCourse?.title || (isRTL ? 'البث المباشر التفاعلي' : 'Interactive Live Session')}
              </DialogTitle>
            </DialogHeader>
            <LiveStreamPlayer 
              sessionId={selectedCourse?.id || "demo-session"}
              isInstructor={selectedView === 'instructor' || selectedView === 'admin'}
              onJoinSession={() => console.log('Joined session')}
              onLeaveSession={() => setShowLiveStream(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Course Viewer Dialog */}
        <Dialog open={showCourseViewer} onOpenChange={setShowCourseViewer}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PlayIcon className="h-5 w-5 text-primary" />
                {selectedCourse?.title || (isRTL ? 'مشاهدة الدورة' : 'Course Viewer')}
              </DialogTitle>
            </DialogHeader>
            <CourseViewer 
              course={selectedCourse}
              onClose={() => setShowCourseViewer(false)}
            />
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};