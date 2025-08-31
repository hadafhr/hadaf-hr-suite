import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Users, Clock, Search, Plus, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  {isRTL ? 'البحث في الدورات' : 'Search Courses'}
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  {isRTL ? 'دورة جديدة' : 'New Course'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام التدريب والتطوير المتقدم' : 'Advanced Training & Development System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'منظومة ذكية شاملة لإدارة البرامج التدريبية وتطوير المهارات مع أنظمة التقييم والشهادات المتطورة' : 'Comprehensive intelligent system for managing training programs and skills development with advanced assessment and certification systems'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الدورات النشطة' : 'Active Courses'}
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي المتدربين' : 'Total Trainees'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">156</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'ساعات التدريب' : 'Training Hours'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">2,340</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الشهادات الممنوحة' : 'Certificates Issued'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">89</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
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