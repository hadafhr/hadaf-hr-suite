import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Users, Clock, Search, Plus, Award, ArrowLeft,
  Bot, Settings, FileText, BarChart3, PieChart, Calendar,
  User, Globe, Video, Download, Upload, CheckCircle
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
}

interface ComprehensiveTrainingProps {
  onBack?: () => void;
}

export const ComprehensiveTraining: React.FC<ComprehensiveTrainingProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
      format: 'hybrid'
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
      format: 'offline'
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
      format: 'online'
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
      department: 'تقنية المعلومات'
    },
    {
      id: '2',
      employeeName: 'فاطمة الزهراني',
      employeeId: 'EMP002',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      enrollmentDate: '2024-01-01',
      progress: 100,
      status: 'completed',
      department: 'الأمن السيبراني'
    }
  ];

  const handleSystemAction = (action: string) => {
    console.log(`تنفيذ إجراء: ${action}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': 'bg-green-500/20 text-green-700 border-green-200',
      'completed': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'upcoming': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'enrolled': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'in_progress': 'bg-orange-500/20 text-orange-700 border-orange-200',
      'dropped': 'bg-red-500/20 text-red-700 border-red-200'
    };
    
    return (
      <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-500/20 text-gray-700'}>
        {status}
      </Badge>
    );
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
              onClick={() => handleSystemAction('دورة جديدة')}
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
                  <p className="text-3xl font-bold">{enrollments.filter(e => e.status === 'completed').length}</p>
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
                  <p className="text-3xl font-bold">8</p>
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
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">الدورات التدريبية</h3>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة دورة جديدة
                  </Button>
                </div>

                <div className="grid gap-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{course.title}</h4>
                            <p className="text-gray-600">{course.description}</p>
                            <div className="flex gap-4 text-sm">
                              <span>المدرب: {course.instructor}</span>
                              <span>المدة: {course.duration}</span>
                              <span>المسجلين: {course.enrolled}/{course.capacity}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            {getStatusBadge(course.status)}
                            <Button size="sm" variant="outline">تفاصيل</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Other placeholder tabs */}
              <TabsContent value="enrollments" className="p-6">
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{enrollment.employeeName}</h4>
                            <p className="text-gray-600">{enrollment.courseTitle}</p>
                            <div className="flex gap-4 text-sm">
                              <span>القسم: {enrollment.department}</span>
                              <span>التقدم: {enrollment.progress}%</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            {getStatusBadge(enrollment.status)}
                            <Button size="sm" variant="outline">عرض</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="certificates" className="p-6">
                <div className="text-center py-12">
                  <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">إدارة الشهادات</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="instructors" className="p-6">
                <div className="text-center py-12">
                  <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">إدارة المدربين</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">تقارير التدريب</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
