import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Eye
} from 'lucide-react';

// Import training components
import { LiveStreamPlayer } from '@/components/training/LiveStreamPlayer';
import { CourseCreator } from '@/components/training/CourseCreator';
import { StudentDashboard } from '@/components/training/StudentDashboard';
import { InstructorDashboard } from '@/components/training/InstructorDashboard';

const courses = [
  {
    id: 1,
    title: "أساسيات إدارة المشاريع",
    description: "دورة شاملة لتعلم مبادئ إدارة المشاريع وأدواتها الحديثة",
    instructor: "د. محمد الأحمد",
    duration: "8 ساعات",
    level: "مبتدئ",
    enrolled: 45,
    progress: 65,
    rating: 4.8,
    status: "جاري",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "التسويق الرقمي المتقدم",
    description: "استراتيجيات التسويق الرقمي وإدارة وسائل التواصل الاجتماعي",
    instructor: "أ. سارة المطيري",
    duration: "12 ساعة",
    level: "متقدم",
    enrolled: 32,
    progress: 100,
    rating: 4.9,
    status: "مكتمل",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "البرمجة بـ React",
    description: "تطوير تطبيقات الويب التفاعلية باستخدام مكتبة React",
    instructor: "م. أحمد العتيبي",
    duration: "16 ساعة",
    level: "متوسط",
    enrolled: 28,
    progress: 30,
    rating: 4.7,
    status: "جاري",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop"
  }
];

const learningPaths = [
  {
    id: 1,
    title: "مسار تطوير القيادة",
    courses: 5,
    duration: "40 ساعة",
    progress: 60,
    description: "برنامج متكامل لتطوير المهارات القيادية والإدارية"
  },
  {
    id: 2,
    title: "مسار التقنية والبرمجة",
    courses: 8,
    duration: "64 ساعة",
    progress: 35,
    description: "مسار شامل لتعلم أحدث التقنيات والأدوات البرمجية"
  },
  {
    id: 3,
    title: "مسار المالية والمحاسبة",
    courses: 6,
    duration: "48 ساعة",
    progress: 80,
    description: "دورات متخصصة في المالية والمحاسبة والتخطيط المالي"
  }
];

const achievements = [
  {
    id: 1,
    title: "إنجاز أول دورة",
    description: "أكمل دورتك التدريبية الأولى",
    icon: "🎯",
    earned: true
  },
  {
    id: 2,
    title: "متعلم نشط",
    description: "أكمل 5 دورات تدريبية",
    icon: "📚",
    earned: true
  },
  {
    id: 3,
    title: "خبير في المجال",
    description: "احصل على تقييم 90% أو أكثر في 10 دورات",
    icon: "🏆",
    earned: false
  }
];

export const Training: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedView, setSelectedView] = useState('admin');
  const [showCourseCreator, setShowCourseCreator] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);

  // Render different views based on user role
  if (selectedView === 'instructor') {
    return <InstructorDashboard />;
  }

  if (selectedView === 'student') {
    return <StudentDashboard />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              منصة التدريب التفاعلية المتكاملة
            </h1>
            <p className="text-muted-foreground">
              منصة احترافية للتدريب والتطوير المؤسسي بالصوت والصورة والأنشطة التفاعلية
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={selectedView === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('admin')}
              >
                <Settings className="h-3 w-3 mr-1" />
                مشرف
              </Button>
              <Button
                variant={selectedView === 'instructor' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('instructor')}
              >
                <UserCheck className="h-3 w-3 mr-1" />
                مدرب
              </Button>
              <Button
                variant={selectedView === 'student' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('student')}
              >
                <GraduationCap className="h-3 w-3 mr-1" />
                متدرب
              </Button>
            </div>

            <Dialog open={showCourseCreator} onOpenChange={setShowCourseCreator}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء دورة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إنشاء دورة تدريبية جديدة</DialogTitle>
                </DialogHeader>
                <CourseCreator />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الدورات النشطة</p>
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% هذا الشهر
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          
          <Card className="dashboard-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المتدربين النشطين</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +156 متدرب جديد
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="dashboard-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الشهادات الصادرة</p>
                <p className="text-2xl font-bold text-success">342</p>
                <p className="text-xs text-muted-foreground mt-1">
                  معدل نجاح 94%
                </p>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="dashboard-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الجلسات المباشرة</p>
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-xs text-muted-foreground mt-1">
                  جاري الآن
                </p>
              </div>
              <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Video className="h-6 w-6 text-warning animate-pulse" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
            onClick={() => setShowLiveStream(true)}
          >
            <Video className="h-5 w-5 mb-1" />
            بدء بث مباشر
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
            onClick={() => setShowCourseCreator(true)}
          >
            <Plus className="h-5 w-5 mb-1" />
            إنشاء دورة
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
          >
            <UserCheck className="h-5 w-5 mb-1" />
            إدارة المدربين
          </Button>
          
          <Button 
            variant="outline" 
            className="h-16 flex flex-col items-center justify-center"
          >
            <MessageSquare className="h-5 w-5 mb-1" />
            الرسائل
          </Button>
        </div>

        {/* Live Stream Dialog */}
        <Dialog open={showLiveStream} onOpenChange={setShowLiveStream}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>البث المباشر التفاعلي</DialogTitle>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="courses">الدورات</TabsTrigger>
            <TabsTrigger value="live">البث المباشر</TabsTrigger>
            <TabsTrigger value="paths">المسارات</TabsTrigger>
            <TabsTrigger value="assessments">التقييمات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activities */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">الأنشطة الحديثة</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">جلسة مباشرة جديدة</h4>
                        <p className="text-sm text-muted-foreground">
                          د. محمد الأحمد بدأ جلسة "إدارة المشاريع المتقدمة"
                        </p>
                        <p className="text-xs text-muted-foreground">منذ 5 دقائق</p>
                      </div>
                      <Button size="sm" variant="outline">
                        انضمام
                      </Button>
                    </div>

                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Award className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">شهادة جديدة</h4>
                        <p className="text-sm text-muted-foreground">
                          أحمد محمد حصل على شهادة "التسويق الرقمي"
                        </p>
                        <p className="text-xs text-muted-foreground">منذ 15 دقيقة</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Plus className="h-5 w-5 text-warning" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">دورة جديدة</h4>
                        <p className="text-sm text-muted-foreground">
                          تم نشر دورة "البرمجة بـ Python" للمبتدئين
                        </p>
                        <p className="text-xs text-muted-foreground">منذ ساعة</p>
                      </div>
                      <Button size="sm" variant="outline">
                        عرض
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Popular Courses */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">الدورات الأكثر شعبية</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.slice(0, 4).map((course) => (
                      <div key={course.id} className="border border-border rounded-lg p-4">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-24 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-sm mb-1">{course.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {course.enrolled}
                          </div>
                          <div className="flex items-center text-xs">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Live Sessions */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Video className="h-4 w-4 mr-2 text-red-500 animate-pulse" />
                    الجلسات المباشرة
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-sm">إدارة المشاريع</h4>
                      <p className="text-xs text-muted-foreground">د. محمد الأحمد</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-500 flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                          مباشر الآن
                        </span>
                        <Button size="sm" variant="destructive">
                          انضمام
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">إحصائيات سريعة</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">المتدربين اليوم</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">الجلسات المكتملة</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">معدل الرضا</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                </Card>

                {/* Upcoming Events */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    الأحداث القادمة
                  </h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <p className="font-medium">ورشة البرمجة</p>
                      <p className="text-xs text-muted-foreground">غداً 7:00 م</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">اختبار التسويق</p>
                      <p className="text-xs text-muted-foreground">يوم الأحد 6:00 م</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">إدارة الدورات التدريبية</h2>
                <p className="text-sm text-muted-foreground">
                  إدارة شاملة للدورات مع إمكانية إنشاء محتوى تفاعلي
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  استيراد دورة
                </Button>
                <Button className="btn-primary" onClick={() => setShowCourseCreator(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  دورة جديدة
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="dashboard-card hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={course.status === 'مكتمل' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      {course.status === 'جاري' && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="destructive" className="animate-pulse">
                            🔴 نشط
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <UserCheck className="h-3 w-3 mr-1" />
                          {course.instructor}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                          </div>
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-3 w-3 text-primary" />
                          </div>
                          <span className="font-medium">{course.enrolled}</span>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <TrendingUp className="h-3 w-3 text-success" />
                          </div>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>مستوى الإكمال</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1 btn-primary" size="sm">
                          <Play className="h-3 w-3 mr-1" />
                          {course.status === 'مكتمل' ? 'مراجعة' : 'متابعة'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Streaming Tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">نظام البث المباشر التفاعلي</h3>
                <p className="text-muted-foreground mb-6">
                  ابدأ جلسة تدريبية مباشرة بالصوت والصورة مع إمكانية مشاركة الشاشة والسبورة التفاعلية
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    className="btn-primary"
                    onClick={() => setShowLiveStream(true)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    بدء بث مباشر جديد
                  </Button>
                  <Button size="lg" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    جدولة جلسة
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">الجلسات النشطة</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">إدارة المشاريع المتقدمة</h4>
                    <Badge variant="destructive" className="animate-pulse">
                      🔴 مباشر
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">د. محمد الأحمد</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      25 مشارك
                    </span>
                    <Button size="sm" variant="destructive">
                      انضمام للجلسة
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Enhanced Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">المسارات التعليمية المتكاملة</h2>
                <p className="text-sm text-muted-foreground">
                  مسارات تعليمية مترابطة ومنظمة لتطوير المهارات بشكل تدريجي
                </p>
              </div>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                إنشاء مسار جديد
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <Card key={path.id} className="dashboard-card hover:shadow-lg transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <h3 className="font-semibold text-foreground">{path.title}</h3>
                      </div>
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-lg font-bold text-primary">{path.courses}</div>
                        <div className="text-xs text-muted-foreground">دورة تدريبية</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-lg font-bold text-primary">{path.duration}</div>
                        <div className="text-xs text-muted-foreground">مدة المسار</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم الإجمالي</span>
                        <span className="font-medium">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>مكتمل</span>
                        <span>{Math.round((path.progress / 100) * path.courses)}/{path.courses} دورات</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 btn-primary">
                        {path.progress > 0 ? 'متابعة المسار' : 'بدء المسار'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>

                    {path.progress > 0 && (
                      <div className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          آخر نشاط: منذ يومين
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enhanced Assessments Tab */}
          <TabsContent value="assessments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">نظام التقييم والاختبارات الذكي</h2>
                <p className="text-sm text-muted-foreground">
                  اختبارات تفاعلية متنوعة مع تصحيح تلقائي وإصدار شهادات معتمدة
                </p>
              </div>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                إنشاء اختبار
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Assessments */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">الاختبارات الحديثة</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'اختبار إدارة المشاريع النهائي', course: 'أساسيات إدارة المشاريع', score: 92, status: 'مكتمل' },
                      { title: 'تقييم استراتيجيات التسويق', course: 'التسويق الرقمي المتقدم', score: 88, status: 'مكتمل' },
                      { title: 'اختبار البرمجة العملي', course: 'البرمجة بـ React', score: null, status: 'قيد التقييم' }
                    ].map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.course}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {assessment.score && (
                            <div className="text-center">
                              <div className="text-lg font-bold text-primary">{assessment.score}%</div>
                              <div className="text-xs text-muted-foreground">النتيجة</div>
                            </div>
                          )}
                          <Badge variant={assessment.status === 'مكتمل' ? 'default' : 'secondary'}>
                            {assessment.status}
                          </Badge>
                          {assessment.status === 'مكتمل' && assessment.score && assessment.score >= 80 && (
                            <Button size="sm" variant="outline">
                              <Award className="h-3 w-3 mr-1" />
                              الشهادة
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Certificate Generator */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    مولد الشهادات الإلكترونية
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg text-center">
                      <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-medium mb-1">شهادة إدارة المشاريع</h4>
                      <p className="text-xs text-muted-foreground mb-3">أحمد محمد - 92%</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-3 w-3 mr-1" />
                        تحميل PDF
                      </Button>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg text-center">
                      <Award className="h-8 w-8 text-success mx-auto mb-2" />
                      <h4 className="font-medium mb-1">شهادة التسويق الرقمي</h4>
                      <p className="text-xs text-muted-foreground mb-3">سارة أحمد - 95%</p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-3 w-3 mr-1" />
                        تحميل PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Assessment Stats */}
              <div className="space-y-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">إحصائيات التقييم</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">معدل النجاح</span>
                      <span className="font-bold text-success">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">متوسط الدرجات</span>
                      <span className="font-bold text-primary">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">الشهادات الصادرة</span>
                      <span className="font-bold text-primary">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">معدل الرضا</span>
                      <span className="font-bold text-warning">4.8/5</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3">أنواع الاختبارات</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>اختيار متعدد</span>
                      <span>45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>صواب/خطأ</span>
                      <span>28</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>مقالي</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>عملي</span>
                      <span>8</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">تحليلات وتقارير شاملة</h2>
                <p className="text-sm text-muted-foreground">
                  رؤى تفصيلية حول الأداء والحضور ومستوى رضا المتدربين
                </p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                تصدير التقرير
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  مقاييس الأداء الرئيسية
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">94%</div>
                    <div className="text-sm text-muted-foreground">معدل الإكمال</div>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <div className="text-2xl font-bold text-success">4.8</div>
                    <div className="text-sm text-muted-foreground">تقييم المتدربين</div>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <div className="text-2xl font-bold text-warning">1,247</div>
                    <div className="text-sm text-muted-foreground">ساعة تدريب</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/5 rounded-lg">
                    <div className="text-2xl font-bold text-purple-500">87%</div>
                    <div className="text-sm text-muted-foreground">متوسط الدرجات</div>
                  </div>
                </div>
              </Card>

              {/* Monthly Growth */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">النمو الشهري</h3>
                <div className="space-y-4">
                  {['يناير', 'فبراير', 'مارس', 'أبريل'].map((month, index) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm">{month}</span>
                      <div className="flex items-center gap-2 flex-1 mx-4">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${60 + index * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12">
                          {60 + index * 10}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* User Engagement */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">تفاعل المستخدمين</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الزيارات اليومية</span>
                    <span className="font-bold text-primary">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">متوسط وقت الجلسة</span>
                    <span className="font-bold text-primary">45 دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معدل العودة</span>
                    <span className="font-bold text-success">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الجلسات المباشرة</span>
                    <span className="font-bold text-warning">12</span>
                  </div>
                </div>
              </Card>

              {/* Revenue Analytics */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">تحليل الإيرادات</h3>
                <div className="space-y-3">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">125,400</div>
                    <div className="text-sm text-muted-foreground">ريال سعودي هذا الشهر</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الدورات المدفوعة</span>
                    <span className="font-medium">89,200 ريال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الاشتراكات</span>
                    <span className="font-medium">31,400 ريال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الشهادات</span>
                    <span className="font-medium">4,800 ريال</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Reports */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">التقارير التفصيلية</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <Users className="h-5 w-5 mb-1" />
                  تقرير المتدربين
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <BookOpen className="h-5 w-5 mb-1" />
                  تقرير الدورات
                </Button>
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                  <Award className="h-5 w-5 mb-1" />
                  تقرير الشهادات
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};