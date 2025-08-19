import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  ArrowLeft
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
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

interface TrainingDashboardProps {
  onBack: () => void;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedView, setSelectedView] = useState('admin');
  const [showCourseCreator, setShowCourseCreator] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "أساسيات إدارة المشاريع",
      englishTitle: "Project Management Fundamentals",
      description: "دورة شاملة لتعلم مبادئ إدارة المشاريع وأدواتها الحديثة",
      instructor: "د. محمد الأحمد",
      duration: "40 ساعة",
      level: "مبتدئ",
      enrolled: 145,
      capacity: 200,
      progress: 65,
      rating: 4.8,
      status: "active",
      category: "إدارة",
      format: "hybrid",
      startDate: "2024-02-01",
      endDate: "2024-02-29",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      isLive: false,
      hasAI: true
    },
    {
      id: 2,
      title: "التسويق الرقمي المتقدم",
      englishTitle: "Advanced Digital Marketing",
      description: "استراتيجيات التسويق الرقمي وإدارة وسائل التواصل الاجتماعي",
      instructor: "أ. سارة المطيري",
      duration: "32 ساعة",
      level: "متقدم",
      enrolled: 89,
      capacity: 150,
      progress: 100,
      rating: 4.9,
      status: "completed",
      category: "تسويق",
      format: "online",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      isLive: true,
      hasAI: true
    },
    {
      id: 3,
      title: "البرمجة بـ React",
      englishTitle: "React Programming",
      description: "تطوير تطبيقات الويب التفاعلية باستخدام مكتبة React",
      instructor: "م. أحمد العتيبي",
      duration: "48 ساعة",
      level: "متوسط",
      enrolled: 67,
      capacity: 100,
      progress: 30,
      rating: 4.7,
      status: "active",
      category: "تقنية",
      format: "online",
      startDate: "2024-02-10",
      endDate: "2024-03-10",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      isLive: false,
      hasAI: true
    }
  ];

  // Learning paths data
  const learningPaths = [
    {
      id: 1,
      title: "مسار تطوير القيادة",
      courses: 5,
      duration: "120 ساعة",
      progress: 60,
      description: "برنامج متكامل لتطوير المهارات القيادية والإدارية",
      enrolled: 45
    },
    {
      id: 2,
      title: "مسار التقنية والبرمجة",
      courses: 8,
      duration: "180 ساعة",
      progress: 35,
      description: "مسار شامل لتعلم أحدث التقنيات والأدوات البرمجية",
      enrolled: 67
    },
    {
      id: 3,
      title: "مسار المالية والمحاسبة",
      courses: 6,
      duration: "150 ساعة",
      progress: 80,
      description: "دورات متخصصة في المالية والمحاسبة والتخطيط المالي",
      enrolled: 34
    }
  ];

  // Statistics data
  const stats = {
    activeCourses: 24,
    totalLearners: 1247,
    certificatesIssued: 342,
    liveSessions: 8,
    completionRate: 94,
    averageRating: 4.8,
    totalHours: 15680,
    activeInstructors: 15
  };

  // Filter courses based on search and filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Utility functions for badges
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
      upcoming: { text: isRTL ? 'قادم' : 'Upcoming', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getFormatBadge = (format: string) => {
    const formatConfig = {
      online: { text: isRTL ? 'إلكتروني' : 'Online', className: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
      offline: { text: isRTL ? 'حضوري' : 'In-Person', className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
      hybrid: { text: isRTL ? 'مدمج' : 'Hybrid', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
    };
    return formatConfig[format as keyof typeof formatConfig];
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'مبتدئ': { text: 'مبتدئ', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'متوسط': { text: 'متوسط', className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
      'متقدم': { text: 'متقدم', className: 'bg-red-500/10 text-red-500 border-red-500/20' }
    };
    return levelConfig[level as keyof typeof levelConfig];
  };

  // Render different views based on user role
  if (selectedView === 'instructor') {
    return <InstructorDashboard />;
  }

  if (selectedView === 'student') {
    return <StudentDashboard />;
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
                {isRTL ? 'منصة التدريب التفاعلية المتكاملة' : 'AI-Powered Interactive Training System'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'منصة احترافية للتدريب والتطوير المؤسسي بالذكاء الاصطناعي والبث المباشر' : 'Professional platform for institutional training and development with AI and live streaming'}
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
                {isRTL ? 'مشرف' : 'Admin'}
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
                variant={selectedView === 'student' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('student')}
                className="text-xs"
              >
                <GraduationCap className="h-3 w-3 mr-1" />
                {isRTL ? 'متدرب' : 'Student'}
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
            <Dialog open={showCourseCreator} onOpenChange={setShowCourseCreator}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  {isRTL ? 'إنشاء دورة جديدة' : 'Create New Course'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{isRTL ? 'إنشاء دورة تدريبية جديدة' : 'Create New Training Course'}</DialogTitle>
                </DialogHeader>
                <CourseCreator />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الدورات النشطة' : 'Active Courses'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeCourses}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {isRTL ? '+12% هذا الشهر' : '+12% this month'}
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
                    {isRTL ? 'المتدربين النشطين' : 'Active Learners'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalLearners.toLocaleString()}</p>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {isRTL ? '+156 متدرب جديد' : '+156 new learners'}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الشهادات الصادرة' : 'Certificates Issued'}
                  </p>
                  <p className="text-2xl font-bold text-green-500">{stats.certificatesIssued}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? `معدل نجاح ${stats.completionRate}%` : `${stats.completionRate}% completion rate`}
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
                    {isRTL ? 'الجلسات المباشرة' : 'Live Sessions'}
                  </p>
                  <p className="text-2xl font-bold text-red-500">{stats.liveSessions}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isRTL ? 'جاري الآن' : 'Currently active'}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-red-500 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center border-border hover:bg-accent/50 transition-colors"
            onClick={() => setShowLiveStream(true)}
          >
            <Video className="h-5 w-5 mb-1 text-red-500" />
            <span className="text-sm">{isRTL ? 'بدء بث مباشر' : 'Start Live Stream'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center border-border hover:bg-accent/50 transition-colors"
            onClick={() => setShowCourseCreator(true)}
          >
            <Plus className="h-5 w-5 mb-1 text-primary" />
            <span className="text-sm">{isRTL ? 'إنشاء دورة' : 'Create Course'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center border-border hover:bg-accent/50 transition-colors"
            onClick={() => setSelectedTab('instructors')}
          >
            <UserCheck className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-sm">{isRTL ? 'إدارة المدربين' : 'Manage Instructors'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center border-border hover:bg-accent/50 transition-colors"
            onClick={() => setShowAIAssistant(true)}
          >
            <Brain className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-sm">{isRTL ? 'المساعد الذكي' : 'AI Assistant'}</span>
          </Button>
        </div>

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
                {isRTL ? 'البث المباشر التفاعلي' : 'Interactive Live Streaming'}
              </DialogTitle>
            </DialogHeader>
            <LiveStreamPlayer 
              sessionId="demo-session"
              isInstructor={true}
              onJoinSession={() => console.log('Joined session')}
              onLeaveSession={() => setShowLiveStream(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Enhanced Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card border border-border">
            <TabsTrigger value="overview" className="text-sm">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
            <TabsTrigger value="courses" className="text-sm">{isRTL ? 'الدورات' : 'Courses'}</TabsTrigger>
            <TabsTrigger value="live" className="text-sm">{isRTL ? 'البث المباشر' : 'Live Sessions'}</TabsTrigger>
            <TabsTrigger value="instructors" className="text-sm">{isRTL ? 'المدربين' : 'Instructors'}</TabsTrigger>
            <TabsTrigger value="paths" className="text-sm">{isRTL ? 'المسارات' : 'Learning Paths'}</TabsTrigger>
            <TabsTrigger value="assessments" className="text-sm">{isRTL ? 'التقييمات' : 'Assessments'}</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">{isRTL ? 'التحليلات' : 'Analytics'}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {isRTL ? 'الدورات الحديثة' : 'Recent Courses'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{course.title}</p>
                          <p className="text-xs text-muted-foreground">{course.instructor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-5 w-5 text-red-500" />
                    {isRTL ? 'الجلسات المباشرة' : 'Live Sessions'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-200">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">التسويق الرقمي المتقدم</p>
                        <p className="text-xs text-muted-foreground">89 مشارك</p>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <Button size="sm" onClick={() => setShowLiveStream(true)}>
                        <Video className="h-4 w-4 mr-2" />
                        {isRTL ? 'بدء جلسة جديدة' : 'Start New Session'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    {isRTL ? 'الإنجازات الأخيرة' : 'Recent Achievements'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">23 شهادة جديدة</p>
                        <p className="text-xs text-muted-foreground">تم إصدارها اليوم</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                      <TrendingUp className="h-8 w-8 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">معدل إكمال 94%</p>
                        <p className="text-xs text-muted-foreground">تحسن بنسبة 5%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
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
                  variant={selectedFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('active')}
                >
                  {isRTL ? 'نشط' : 'Active'}
                </Button>
                <Button
                  variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('completed')}
                >
                  {isRTL ? 'مكتمل' : 'Completed'}
                </Button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const statusBadge = getStatusBadge(course.status);
                const formatBadge = getFormatBadge(course.format);
                const levelBadge = getLevelBadge(course.level);
                
                return (
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

                      {/* Course level and format badges */}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <Badge className={`${statusBadge.className} text-xs`}>
                          {statusBadge.text}
                        </Badge>
                        <Badge className={`${formatBadge.className} text-xs`}>
                          {formatBadge.text}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1 line-clamp-2">{course.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-2">{course.englishTitle}</p>
                          <Badge className={`${levelBadge.className} text-xs w-fit`}>
                            {levelBadge.text}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {isRTL ? 'المدرب:' : 'Instructor:'}
                            </span>
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {isRTL ? 'المدة:' : 'Duration:'}
                            </span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {isRTL ? 'المسجلين:' : 'Enrolled:'}
                            </span>
                            <span className="font-medium">{course.enrolled}/{course.capacity}</span>
                          </div>
                        </div>

                        {/* Enrollment Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'نسبة الحجز' : 'Enrollment'}</span>
                            <span>{Math.round((course.enrolled / course.capacity) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(course.enrolled / course.capacity) * 100}
                            className="h-2"
                          />
                        </div>

                        {/* Course Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress 
                            value={course.progress}
                            className="h-2"
                          />
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{isRTL ? 'من' : 'From'} {course.startDate}</span>
                          <span>{isRTL ? 'إلى' : 'To'} {course.endDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-accent">
                          <Eye className="h-3 w-3 mr-1" />
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        {course.isLive && (
                          <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                            <Video className="h-3 w-3 mr-1" />
                            {isRTL ? 'انضمام' : 'Join Live'}
                          </Button>
                        )}
                        {!course.isLive && (
                          <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-accent">
                            <Play className="h-3 w-3 mr-1" />
                            {isRTL ? 'بدء' : 'Start'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="live">
            <LiveSessionsManager />
          </TabsContent>

          <TabsContent value="instructors">
            <InstructorManagement />
          </TabsContent>

          <TabsContent value="paths">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{isRTL ? 'المسارات التعليمية' : 'Learning Paths'}</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {isRTL ? 'مسار جديد' : 'New Path'}
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path) => (
                  <Card key={path.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'الدورات:' : 'Courses:'}</span>
                          <span className="font-medium">{path.courses}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'المدة الإجمالية:' : 'Total Duration:'}</span>
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'المسجلين:' : 'Enrolled:'}</span>
                          <span>{path.enrolled}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                            <span>{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          {isRTL ? 'عرض المسار' : 'View Path'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentManager />
          </TabsContent>

          <TabsContent value="analytics">
            <TrainingAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
