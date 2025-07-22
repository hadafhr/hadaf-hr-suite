import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Award,
  Clock,
  Users,
  Star,
  Download,
  Calendar
} from 'lucide-react';

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
  const [selectedTab, setSelectedTab] = useState('courses');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              منصة التدريب
            </h1>
            <p className="text-muted-foreground">
              حلول تدريبية متطورة لتنمية مهارات الموظفين وتطوير قدراتهم
            </p>
          </div>
          <Button className="btn-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            إنشاء دورة جديدة
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الدورات المتاحة</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المتدربين النشطين</p>
                <p className="text-2xl font-bold text-primary">156</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الدورات المكتملة</p>
                <p className="text-2xl font-bold text-success">89</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ساعات التدريب</p>
                <p className="text-2xl font-bold text-primary">1,247</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">الدورات</TabsTrigger>
            <TabsTrigger value="paths">المسارات التعليمية</TabsTrigger>
            <TabsTrigger value="progress">التقدم</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="dashboard-card hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <Badge variant={course.status === 'مكتمل' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.instructor}</span>
                        <span>{course.duration}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {course.rating}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.enrolled} متدرب
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <Button className="w-full btn-primary">
                        <Play className="h-4 w-4 mr-2" />
                        {course.status === 'مكتمل' ? 'مراجعة' : 'متابعة'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="dashboard-card">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{path.title}</h3>
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">عدد الدورات</span>
                        <p className="font-medium">{path.courses}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">المدة</span>
                        <p className="font-medium">{path.duration}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم الإجمالي</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                    
                    <Button className="w-full btn-primary">
                      بدء المسار
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">التقدم الشهري</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>يناير</span>
                    <span>3 دورات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>فبراير</span>
                    <span>5 دورات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مارس</span>
                    <span>2 دورة</span>
                  </div>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">الشهادات المكتسبة</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">شهادة إدارة المشاريع</h4>
                      <p className="text-sm text-muted-foreground">15 يناير 2024</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">شهادة التسويق الرقمي</h4>
                      <p className="text-sm text-muted-foreground">28 فبراير 2024</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`dashboard-card ${
                  achievement.earned ? 'border-primary bg-primary/5' : 'opacity-60'
                }`}>
                  <div className="text-center space-y-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.earned && (
                      <Badge className="bg-success text-success-foreground">
                        تم الإنجاز
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};