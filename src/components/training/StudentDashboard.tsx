import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Play,
  Download,
  Calendar,
  Clock,
  Award,
  Video,
  FileText,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  duration: string;
  rating: number;
  status: 'active' | 'completed' | 'pending';
  thumbnail: string;
}

interface Certificate {
  id: string;
  courseName: string;
  issueDate: string;
  score: number;
  certificateUrl: string;
}

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
}

export const StudentDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'أساسيات إدارة المشاريع',
      instructor: 'د. محمد الأحمد',
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      nextLesson: 'إدارة المخاطر في المشاريع',
      duration: '8 ساعات',
      rating: 4.8,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'التسويق الرقمي المتقدم',
      instructor: 'أ. سارة المطيري',
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
      nextLesson: '',
      duration: '12 ساعة',
      rating: 4.9,
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      courseName: 'التسويق الرقمي المتقدم',
      issueDate: '2024-03-15',
      score: 92,
      certificateUrl: '#'
    },
    {
      id: '2',
      courseName: 'أساسيات البرمجة',
      issueDate: '2024-02-28',
      score: 88,
      certificateUrl: '#'
    }
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'مشروع تطبيق إدارة المهام',
      courseName: 'أساسيات إدارة المشاريع',
      dueDate: '2024-04-01',
      status: 'pending'
    },
    {
      id: '2',
      title: 'تحليل حملة تسويقية',
      courseName: 'التسويق الرقمي المتقدم',
      dueDate: '2024-03-20',
      status: 'graded',
      score: 95
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'جلسة مباشرة: إدارة المخاطر',
      instructor: 'د. محمد الأحمد',
      date: '2024-03-25',
      time: '19:00',
      duration: '2 ساعة'
    },
    {
      id: '2',
      title: 'ورشة عملية: تحليل البيانات',
      instructor: 'م. أحمد العتيبي',
      date: '2024-03-28',
      time: '20:00',
      duration: '1.5 ساعة'
    }
  ];

  const learningStats = {
    totalHours: 247,
    coursesCompleted: 12,
    currentStreak: 15,
    averageScore: 89
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* الترحيب والملخص */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">مرحباً، أحمد محمد</h1>
              <p className="text-muted-foreground mb-4">
                واصل تقدمك في رحلة التعلم. لديك {enrolledCourses.filter(c => c.status === 'active').length} دورة نشطة
              </p>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{learningStats.totalHours}</div>
                  <div className="text-sm text-muted-foreground">ساعة تدريب</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{learningStats.coursesCompleted}</div>
                  <div className="text-sm text-muted-foreground">دورة مكتملة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{learningStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">يوم متتالي</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{learningStats.averageScore}%</div>
                  <div className="text-sm text-muted-foreground">متوسط الدرجات</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              الجلسات القادمة
            </h3>
            <div className="space-y-3">
              {upcomingSessions.slice(0, 2).map((session) => (
                <div key={session.id} className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm">{session.title}</h4>
                  <p className="text-xs text-muted-foreground">{session.instructor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {session.time}
                    </span>
                    <Button size="sm" variant="outline">
                      انضمام
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="courses">دوراتي</TabsTrigger>
            <TabsTrigger value="assignments">المهام</TabsTrigger>
            <TabsTrigger value="certificates">الشهادات</TabsTrigger>
            <TabsTrigger value="progress">التقدم</TabsTrigger>
          </TabsList>

          {/* لوحة التحكم */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* الدورات النشطة */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">الدورات النشطة</h3>
                <div className="space-y-4">
                  {enrolledCourses.filter(c => c.status === 'active').map((course) => (
                    <div key={course.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{course.title}</h4>
                        <Badge variant="outline">{course.progress}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        الدرس التالي: {course.nextLesson}
                      </p>
                      <Progress value={course.progress} className="h-2 mb-3" />
                      <Button size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        متابعة التعلم
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* آخر الإنجازات */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">آخر الإنجازات</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <Award className="h-6 w-6 text-success" />
                    <div>
                      <h4 className="font-medium">شهادة جديدة!</h4>
                      <p className="text-sm text-muted-foreground">
                        حصلت على شهادة في التسويق الرقمي
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">مهمة مكتملة</h4>
                      <p className="text-sm text-muted-foreground">
                        أكملت مشروع تحليل السوق بدرجة 95%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* دوراتي */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                        {course.status === 'completed' ? 'مكتمل' : 'نشط'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{course.completedLessons}/{course.totalLessons} دروس</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <Button className="w-full" variant={course.status === 'completed' ? 'outline' : 'default'}>
                      {course.status === 'completed' ? (
                        <>
                          <Award className="h-4 w-4 mr-2" />
                          عرض الشهادة
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          متابعة
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* المهام */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        assignment.status === 'pending' ? 'bg-warning' :
                        assignment.status === 'submitted' ? 'bg-primary' :
                        'bg-success'
                      }`} />
                      
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>موعد التسليم: {assignment.dueDate}</span>
                          {assignment.score && (
                            <span className="text-success font-medium">
                              الدرجة: {assignment.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        assignment.status === 'pending' ? 'destructive' :
                        assignment.status === 'submitted' ? 'default' :
                        'default'
                      }>
                        {assignment.status === 'pending' ? 'مطلوب' :
                         assignment.status === 'submitted' ? 'مرسل' :
                         'مقيم'}
                      </Badge>
                      
                      {assignment.status === 'pending' && (
                        <Button size="sm">
                          تسليم المهمة
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* الشهادات */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{cert.courseName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    تاريخ الإصدار: {cert.issueDate}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    الدرجة: {cert.score}%
                  </p>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    تحميل الشهادة
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* التقدم */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  إحصائيات التعلم
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>ساعات التدريب الإجمالية</span>
                    <span className="font-bold text-primary">{learningStats.totalHours}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الدورات المكتملة</span>
                    <span className="font-bold text-success">{learningStats.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط الدرجات</span>
                    <span className="font-bold text-primary">{learningStats.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الأيام المتتالية</span>
                    <span className="font-bold text-warning">{learningStats.currentStreak}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">النشاط الأسبوعي</h3>
                <div className="space-y-3">
                  {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm">{day}</span>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((hour) => (
                          <div 
                            key={hour}
                            className={`w-3 h-3 rounded-sm ${
                              Math.random() > 0.5 ? 'bg-primary' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};