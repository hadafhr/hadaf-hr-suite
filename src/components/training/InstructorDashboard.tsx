import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Users,
  Video,
  Calendar,
  MessageSquare,
  TrendingUp,
  Star,
  Play,
  Edit,
  Eye,
  Settings,
  Plus,
  Download,
  BarChart,
  Clock,
  Award
} from 'lucide-react';

interface CourseData {
  id: string;
  title: string;
  students: number;
  rating: number;
  revenue: number;
  completion: number;
  status: 'published' | 'draft' | 'review';
  thumbnail: string;
}

interface StudentProgress {
  id: string;
  name: string;
  avatar: string;
  course: string;
  progress: number;
  lastActivity: string;
  grade: number;
}

interface UpcomingSession {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  students: number;
  duration: string;
}

export const InstructorDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const instructorStats = {
    totalStudents: 247,
    totalCourses: 8,
    totalRevenue: 125400,
    averageRating: 4.8,
    monthlyGrowth: 15
  };

  const courses: CourseData[] = [
    {
      id: '1',
      title: 'أساسيات إدارة المشاريع',
      students: 45,
      rating: 4.8,
      revenue: 22500,
      completion: 85,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'التسويق الرقمي المتقدم',
      students: 32,
      rating: 4.9,
      revenue: 19200,
      completion: 78,
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'مهارات القيادة الحديثة',
      students: 0,
      rating: 0,
      revenue: 0,
      completion: 60,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    }
  ];

  const studentProgress: StudentProgress[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '👨',
      course: 'أساسيات إدارة المشاريع',
      progress: 85,
      lastActivity: 'منذ ساعتين',
      grade: 92
    },
    {
      id: '2',
      name: 'سارة أحمد',
      avatar: '👩',
      course: 'التسويق الرقمي المتقدم',
      progress: 95,
      lastActivity: 'منذ يوم',
      grade: 88
    },
    {
      id: '3',
      name: 'محمد العتيبي',
      avatar: '👨',
      course: 'أساسيات إدارة المشاريع',
      progress: 72,
      lastActivity: 'منذ 3 أيام',
      grade: 79
    }
  ];

  const upcomingSessions: UpcomingSession[] = [
    {
      id: '1',
      title: 'جلسة مباشرة: إدارة المخاطر',
      course: 'أساسيات إدارة المشاريع',
      date: '2024-03-25',
      time: '19:00',
      students: 25,
      duration: '2 ساعة'
    },
    {
      id: '2',
      title: 'ورشة عملية: استراتيجيات السوشيال ميديا',
      course: 'التسويق الرقمي المتقدم',
      date: '2024-03-27',
      time: '20:00',
      students: 18,
      duration: '1.5 ساعة'
    }
  ];

  const recentMessages = [
    {
      id: '1',
      student: 'أحمد محمد',
      message: 'هل يمكن توضيح موضوع إدارة المخاطر أكثر؟',
      course: 'أساسيات إدارة المشاريع',
      time: 'منذ ساعة'
    },
    {
      id: '2',
      student: 'سارة أحمد',
      message: 'شكراً لك على الشرح الواضح في الدرس الأخير',
      course: 'التسويق الرقمي المتقدم',
      time: 'منذ 3 ساعات'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* الترحيب والإحصائيات */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">مرحباً، د. محمد الأحمد</h1>
              <p className="text-muted-foreground mb-4">
                لوحة تحكم المدرب - تابع أداء دوراتك وتفاعل طلابك
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{instructorStats.totalStudents}</div>
                  <div className="text-sm text-muted-foreground">إجمالي الطلاب</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{instructorStats.totalCourses}</div>
                  <div className="text-sm text-muted-foreground">دورة منشورة</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">الإيرادات الشهرية</h3>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">
              {instructorStats.totalRevenue.toLocaleString()} ريال
            </div>
            <div className="text-sm text-success">
              +{instructorStats.monthlyGrowth}% عن الشهر الماضي
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">التقييم العام</h3>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">
              {instructorStats.averageRating}/5.0
            </div>
            <div className="text-sm text-muted-foreground">
              من {instructorStats.totalStudents} تقييم
            </div>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="courses">دوراتي</TabsTrigger>
            <TabsTrigger value="students">الطلاب</TabsTrigger>
            <TabsTrigger value="sessions">الجلسات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* نظرة عامة */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* الجلسات القادمة */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">الجلسات القادمة</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    جدولة جلسة
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{session.title}</h4>
                        <Badge variant="outline">{session.students} طالب</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{session.course}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.time}
                        </span>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        <Video className="h-3 w-3 mr-2" />
                        بدء الجلسة
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* الرسائل الحديثة */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">الرسائل الحديثة</h3>
                  <Button size="sm" variant="outline">
                    عرض الكل
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{msg.student}</h4>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{msg.message}</p>
                      <p className="text-xs text-primary">{msg.course}</p>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        رد
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* أفضل الطلاب */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">أفضل الطلاب هذا الشهر</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {studentProgress.slice(0, 3).map((student) => (
                  <div key={student.id} className="text-center p-4 border border-border rounded-lg">
                    <div className="text-3xl mb-2">{student.avatar}</div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{student.course}</p>
                    <div className="text-lg font-bold text-primary">{student.grade}%</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* دوراتي */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">إدارة الدورات</h2>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                إنشاء دورة جديدة
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant={
                        course.status === 'published' ? 'default' :
                        course.status === 'draft' ? 'secondary' : 'destructive'
                      }>
                        {course.status === 'published' ? 'منشور' :
                         course.status === 'draft' ? 'مسودة' : 'مراجعة'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">الطلاب:</span>
                        <p className="font-medium">{course.students}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">التقييم:</span>
                        <p className="font-medium flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {course.rating || 'غير متاح'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {course.revenue.toLocaleString()} ريال
                      </div>
                      <div className="text-xs text-muted-foreground">إجمالي الإيرادات</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        عرض
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* الطلاب */}
          <TabsContent value="students" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">تقدم الطلاب</h3>
              <div className="space-y-4">
                {studentProgress.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.course}</p>
                        <p className="text-xs text-muted-foreground">آخر نشاط: {student.lastActivity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">التقدم</div>
                        <div className="font-medium">{student.progress}%</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">الدرجة</div>
                        <div className="font-medium text-primary">{student.grade}%</div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        رسالة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* الجلسات */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">إدارة الجلسات المباشرة</h2>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                جدولة جلسة جديدة
              </Button>
            </div>

            <div className="grid gap-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">{session.title}</h4>
                        <p className="text-sm text-muted-foreground">{session.course}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {session.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {session.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {session.students} طالب
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        إعدادات
                      </Button>
                      <Button size="sm" className="btn-primary">
                        <Play className="h-3 w-3 mr-1" />
                        بدء الجلسة
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* التحليلات */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <BarChart className="h-4 w-4 mr-2" />
                  إحصائيات الأداء
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>معدل إكمال الدورات</span>
                    <span className="font-bold text-success">82%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط وقت المشاهدة</span>
                    <span className="font-bold text-primary">45 دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل رضا الطلاب</span>
                    <span className="font-bold text-primary">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>إجمالي ساعات التدريس</span>
                    <span className="font-bold text-primary">156 ساعة</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">الإيرادات الشهرية</h3>
                <div className="space-y-3">
                  {['يناير', 'فبراير', 'مارس'].map((month, index) => (
                    <div key={month} className="flex items-center justify-between">
                      <span>{month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${60 + index * 15}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {(35000 + index * 5000).toLocaleString()} ريال
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* تقرير مفصل */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">تقرير شامل</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-2" />
                  تحميل التقرير
                </Button>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-primary">247</div>
                  <div className="text-sm text-muted-foreground">إجمالي المتدربين</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-success">89%</div>
                  <div className="text-sm text-muted-foreground">معدل الإكمال</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-warning">4.8</div>
                  <div className="text-sm text-muted-foreground">متوسط التقييم</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-primary">125k</div>
                  <div className="text-sm text-muted-foreground">الإيرادات (ريال)</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};