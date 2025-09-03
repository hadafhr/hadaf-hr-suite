import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Users, Clock, Search, Plus, Award, Sparkles, Target, Download } from 'lucide-react';

interface TrainingProps {
  onBack: () => void;
}

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

export const Training: React.FC<TrainingProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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
      enrollmentDate: '2024-01-25',
      progress: 65,
      status: 'in_progress',
      department: 'الموارد البشرية'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      courseTitle: 'تطوير المهارات القيادية',
      enrollmentDate: '2024-02-10',
      progress: 0,
      status: 'enrolled',
      department: 'المحاسبة'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      courseTitle: 'الأمن السيبراني للمؤسسات',
      enrollmentDate: '2024-01-01',
      progress: 100,
      status: 'completed',
      department: 'تقنية المعلومات'
    }
  ];

  const getCourseStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-100 text-green-800' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-gray-100 text-gray-800' },
      upcoming: { text: isRTL ? 'قادم' : 'Upcoming', className: 'bg-blue-100 text-blue-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getEnrollmentStatusBadge = (status: string) => {
    const statusConfig = {
      enrolled: { text: isRTL ? 'مُسجل' : 'Enrolled', className: 'bg-blue-100 text-blue-800' },
      in_progress: { text: isRTL ? 'قيد التنفيذ' : 'In Progress', className: 'bg-yellow-100 text-yellow-800' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-green-100 text-green-800' },
      dropped: { text: isRTL ? 'منسحب' : 'Dropped', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getFormatBadge = (format: string) => {
    const formatConfig = {
      online: { text: isRTL ? 'إلكتروني' : 'Online', className: 'bg-purple-100 text-purple-800' },
      offline: { text: isRTL ? 'حضوري' : 'In-Person', className: 'bg-orange-100 text-orange-800' },
      hybrid: { text: isRTL ? 'مدمج' : 'Hybrid', className: 'bg-blue-100 text-blue-800' }
    };
    return formatConfig[format as keyof typeof formatConfig];
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* خلفية احترافية متحركة بألوان الهوية البصرية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/8 to-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/10 to-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/15 to-primary/3 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-muted/20 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-primary/8 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* الشريط العلوي الاحترافي */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20 animate-fade-in">
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-muted-foreground/20 text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all duration-300 px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div className="h-8 w-px bg-border/30"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <BookOpen className="h-8 w-8 text-white relative z-10" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {isRTL ? 'نظام التدريب والتطوير' : 'Training & Development System'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {isRTL ? 'النظام الشامل لإدارة البرامج التدريبية وتطوير المهارات' : 'Comprehensive system for training programs and skills development'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 ml-2" />
              {isRTL ? 'نظام متطور' : 'Advanced System'}
            </Badge>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-glow hover:shadow-strong transition-all duration-300 px-6 py-2"
            >
              <Download className="h-4 w-4 ml-2" />
              {isRTL ? 'تصدير' : 'Export'}
            </Button>
          </div>
        </div>

        {/* العنوان الرئيسي الاحترافي */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary to-primary-glow rounded-full shadow-glow mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
            <BookOpen className="h-14 w-14 text-white relative z-10" />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-6 relative">
            {isRTL ? 'نظام التدريب والتطوير الاحترافي' : 'Professional Training & Development System'}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {isRTL ? 'منظومة ذكية شاملة لإدارة البرامج التدريبية وتطوير المهارات مع أنظمة التقييم والشهادات المتطورة' : 'Comprehensive intelligent system for managing training programs and skills development with advanced assessment and certification systems'}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Sparkles className="h-5 w-5 ml-2" />
              {isRTL ? 'نظام ذكي' : 'Smart System'}
            </Badge>
            <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground bg-muted/20 px-6 py-3 text-base font-medium hover:bg-muted/30 transition-all duration-300">
              <Target className="h-5 w-5 ml-2" />
              {isRTL ? 'واجهة احترافية' : 'Professional Interface'}
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Award className="h-5 w-5 ml-2" />
              {isRTL ? 'إدارة متقدمة' : 'Advanced Management'}
            </Badge>
          </div>
        </div>

        {/* الإحصائيات السريعة الاحترافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { 
              title: isRTL ? 'الدورات النشطة' : 'Active Courses',
              value: '12',
              description: isRTL ? 'جميع الدورات النشطة في النظام' : 'All active courses in the system',
              icon: BookOpen,
              trend: '+3',
              color: 'from-primary to-primary-glow'
            },
            { 
              title: isRTL ? 'إجمالي المتدربين' : 'Total Trainees',
              value: '156',
              description: isRTL ? 'المتدربين المسجلين حالياً' : 'Currently enrolled trainees',
              icon: Users,
              trend: '+23',
              color: 'from-primary to-primary-glow'
            },
            { 
              title: isRTL ? 'ساعات التدريب' : 'Training Hours',
              value: '2,340',
              description: isRTL ? 'إجمالي ساعات التدريب المنجزة' : 'Total completed training hours',
              icon: Clock,
              trend: '+156',
              color: 'from-muted-foreground to-muted-foreground'
            },
            { 
              title: isRTL ? 'الشهادات الممنوحة' : 'Certificates Issued',
              value: '89',
              description: isRTL ? 'عدد الشهادات الممنوحة' : 'Number of certificates issued',
              icon: Award,
              trend: '+12',
              color: 'from-primary to-primary-glow'
            }
          ].map((metric, index) => (
            <Card key={index} className="group hover:shadow-glow hover:scale-105 transition-all duration-700 border border-border/20 bg-white/98 backdrop-blur-sm animate-fade-in overflow-hidden relative" 
                  style={{animationDelay: `${index * 0.2}s`}}>
              {/* تأثير الخلفية المتحركة */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-5 rounded-3xl bg-gradient-to-br ${metric.color} shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-700 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <metric.icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground bg-muted/10 hover:bg-muted/20 transition-colors duration-300 px-4 py-2">
                    {metric.trend}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <p className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">{metric.value}</p>
                  <p className="text-lg text-foreground font-semibold">{metric.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
                {/* مؤشر التقدم */}
                <div className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">{isRTL ? 'الدورات التدريبية' : 'Training Courses'}</TabsTrigger>
            <TabsTrigger value="enrollments">{isRTL ? 'التسجيلات' : 'Enrollments'}</TabsTrigger>
            <TabsTrigger value="certificates">{isRTL ? 'الشهادات' : 'Certificates'}</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const statusBadge = getCourseStatusBadge(course.status);
                const formatBadge = getFormatBadge(course.format);
                
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{course.englishTitle}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={formatBadge.className}>
                            {formatBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">{course.description}</p>
                        
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
                            <span className="text-muted-foreground">{isRTL ? 'الفئة:' : 'Category:'}</span>
                            <span>{course.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'المسجلين:' : 'Enrolled:'}</span>
                            <span className="font-medium">{course.enrolled}/{course.capacity}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'الحجوزات' : 'Enrollment'}</span>
                            <span>{Math.round((course.enrolled / course.capacity) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'من' : 'From'} {course.startDate}</span>
                          <span className="text-muted-foreground">{isRTL ? 'إلى' : 'To'} {course.endDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="enrollments">
            <div className="space-y-6">
              {enrollments.map((enrollment) => {
                const statusBadge = getEnrollmentStatusBadge(enrollment.status);
                
                return (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{enrollment.employeeName}</h3>
                          <p className="text-sm text-muted-foreground">{enrollment.employeeId} - {enrollment.department}</p>
                        </div>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            {isRTL ? 'الدورة' : 'Course'}
                          </h4>
                          <p className="text-sm font-medium">{enrollment.courseTitle}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            {isRTL ? 'تاريخ التسجيل' : 'Enrollment Date'}
                          </h4>
                          <p className="text-sm">{enrollment.enrollmentDate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-1">
                            {isRTL ? 'التقدم' : 'Progress'}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{enrollment.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إدارة الشهادات' : 'Certificate Management'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'عرض وإدارة الشهادات الممنوحة للموظفين' : 'View and manage certificates issued to employees'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};