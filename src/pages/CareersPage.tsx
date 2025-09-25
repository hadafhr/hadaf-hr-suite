import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Users, Search, Filter, Briefcase, Clock, Star, ArrowRight, Building2, Heart, Shield, Trophy, Zap, Globe, FileText } from 'lucide-react';
import { useCareers } from '@/hooks/useCareers';
import { JobApplicationModal } from '@/components/careers/JobApplicationModal';
import { JobDetailModal } from '@/components/careers/JobDetailModal';
import { ApplicationTracking } from '@/components/careers/ApplicationTracking';
import { SEOHead } from '@/components/careers/SEOHead';
import CareersHeader from '@/components/careers/CareersHeader';
import heroImage from '@/assets/team-collaboration.jpg';

const CareersPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { 
    departments, 
    jobs, 
    filteredJobs, 
    selectedJob, 
    loading, 
    fetchJobById, 
    applyFilters, 
    getStatistics 
  } = useCareers();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showJobDetailModal, setShowJobDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');

  const statistics = getStatistics();

  // معالج البحث والفلترة
  const handleSearch = () => {
    applyFilters({
      search: searchTerm,
      department: selectedDepartment === 'all' ? undefined : selectedDepartment,
      location: selectedLocation === 'all' ? undefined : selectedLocation,
      jobType: selectedJobType === 'all' ? undefined : selectedJobType
    });
  };

  // مسح الفلاتر
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedLocation('all');
    setSelectedJobType('all');
    applyFilters({});
  };

  // عرض تفاصيل الوظيفة
  const handleViewJob = (job: any) => {
    navigate(`/careers/${job.id}`);
  };

  // التقديم على الوظيفة
  const handleApplyToJob = (job: any) => {
    setShowApplicationModal(true);
  };

  // أنواع الوظائف
  const jobTypes = [
    { value: 'full_time', label: 'دوام كامل' },
    { value: 'part_time', label: 'دوام جزئي' },
    { value: 'contract', label: 'عقد مؤقت' },
    { value: 'internship', label: 'تدريب' }
  ];

  // المواقع المتاحة
  const locations = [
    { value: 'الرياض', label: 'الرياض' },
    { value: 'جدة', label: 'جدة' },
    { value: 'الدمام', label: 'الدمام' },
    { value: 'عن بُعد', label: 'عن بُعد' },
    { value: 'هجين', label: 'هجين' }
  ];

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedDepartment, selectedLocation, selectedJobType]);

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId).then((job) => {
        if (job) {
          setShowJobDetailModal(true);
        }
      });
    }
  }, [jobId]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>

      <SEOHead 
        title={selectedJob ? `${selectedJob.title} - ${selectedJob.location} | وظائف بُعد HR` : undefined}
        description={selectedJob ? `انضم إلى فريق بُعد HR كـ ${selectedJob.title} في ${selectedJob.location}` : undefined}
        jobTitle={selectedJob?.title}
        location={selectedJob?.location}
        department={selectedJob?.department?.name}
        jobType={selectedJob?.job_type}
        salaryMin={selectedJob?.salary_range_min}
        salaryMax={selectedJob?.salary_range_max}
      />
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        <CareersHeader />
      </header>
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900/95 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#008C6A_0%,transparent_50%)] opacity-[0.15]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#008C6A_0%,transparent_50%)] opacity-[0.1]"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            انضم إلى فريقنا في بُعد HR
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            كن جزءاً من رحلة تطوير أكثر منصات الموارد البشرية تقدماً في المملكة العربية السعودية
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#009F87] hover:to-[#008C6A] hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-xl shadow-[#008C6A]/30 border border-[#008C6A]/40"
              onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              عرض الوظائف الشاغرة
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-[#008C6A]/50 text-white hover:bg-[#008C6A]/10 hover:border-[#008C6A] hover:scale-105 transition-all duration-300 px-8 py-4 text-lg backdrop-blur-sm bg-black/20"
            >
              <Heart className="w-5 h-5 mr-2" />
              تعرف على ثقافتنا
            </Button>
          </div>
          
          {/* إحصائيات سريعة في Hero */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-[#008C6A]">500+</div>
              <div className="text-sm text-gray-400">موظف</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-[#008C6A]">95%</div>
              <div className="text-sm text-gray-400">رضا</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-[#008C6A]">24/7</div>
              <div className="text-sm text-gray-400">دعم</div>
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات سريعة */}
      <section className="py-16 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-6 hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="text-3xl font-bold text-[#008C6A] mb-2">{statistics.totalJobs}+</div>
              <div className="text-gray-300">وظيفة متاحة</div>
            </div>
            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-6 hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="text-3xl font-bold text-[#008C6A] mb-2">500+</div>
              <div className="text-gray-300">موظف سعيد</div>
            </div>
            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-6 hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="text-3xl font-bold text-[#008C6A] mb-2">7</div>
              <div className="text-gray-300">أقسام متخصصة</div>
            </div>
            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-6 hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="text-3xl font-bold text-[#008C6A] mb-2">95%</div>
              <div className="text-gray-300">رضا الموظفين</div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم لماذا بُعد HR */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900/95 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#008C6A_0%,transparent_50%)] opacity-[0.1]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">لماذا تختار بُعد HR؟</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              نوفر بيئة عمل محفزة ومليئة بالفرص للنمو والتطوير المهني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-8 group hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="w-16 h-16 bg-[#008C6A]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#008C6A]/20 transition-colors border border-[#008C6A]/30">
                <Heart className="w-8 h-8 text-[#008C6A]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">بيئة عمل داعمة</h3>
              <p className="text-gray-300">فريق متعاون وقيادة داعمة لتحقيق أهدافك</p>
            </div>

            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-8 group hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="w-16 h-16 bg-[#008C6A]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#008C6A]/20 transition-colors border border-[#008C6A]/30">
                <Trophy className="w-8 h-8 text-[#008C6A]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">فرص نمو مميزة</h3>
              <p className="text-gray-300">مسار وظيفي واضح وفرص ترقية سريعة</p>
            </div>

            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-8 group hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="w-16 h-16 bg-[#008C6A]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#008C6A]/20 transition-colors border border-[#008C6A]/30">
                <Zap className="w-8 h-8 text-[#008C6A]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">تقنيات متطورة</h3>
              <p className="text-gray-300">اعمل مع أحدث التقنيات والأدوات</p>
            </div>

            <div className="text-center bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-8 group hover:scale-105 transition-all duration-300 hover:border-[#008C6A]/50">
              <div className="w-16 h-16 bg-[#008C6A]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#008C6A]/20 transition-colors border border-[#008C6A]/30">
                <Globe className="w-8 h-8 text-[#008C6A]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">مرونة في العمل</h3>
              <p className="text-gray-300">خيارات عمل مرنة وتوازن صحي</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم البحث والفلترة والوظائف */}
      <section id="jobs-section" className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">الوظائف والتقديم</h2>
            <p className="text-lg text-gray-300">اكتشف الفرص الوظيفية المناسبة لخبرتك ومهاراتك أو تابع طلباتك السابقة</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gradient-to-r from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 grid w-full grid-cols-2 mb-8 p-2">
              <TabsTrigger value="jobs" className="flex items-center gap-2 data-[state=active]:bg-[#008C6A]/20 data-[state=active]:text-white text-gray-300">
                <Briefcase className="w-4 h-4" />
                الوظائف المتاحة
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex items-center gap-2 data-[state=active]:bg-[#008C6A]/20 data-[state=active]:text-white text-gray-300">
                <FileText className="w-4 h-4" />
                قدم الآن
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-8">
              {/* أدوات البحث والفلترة */}
              <Card className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 shadow-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="ابحث عن وظيفة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10 bg-black/20 border-[#008C6A]/30 text-white placeholder:text-gray-400 focus:border-[#008C6A]"
                        />
                      </div>
                    </div>

                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="bg-black/20 border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="القسم" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="bg-black/20 border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="الموقع" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع المواقع</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location.value} value={location.value}>{location.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="bg-black/20 border-[#008C6A]/30 text-white">
                        <SelectValue placeholder="نوع الدوام" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        {jobTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-300">
                      {filteredJobs.length} وظيفة من أصل {jobs.length}
                    </div>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10">
                      <Filter className="w-4 h-4 mr-2" />
                      مسح الفلاتر
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* قائمة الوظائف */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                        <div className="h-8 bg-muted rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredJobs.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">لا توجد وظائف متاحة</h3>
                    <p className="text-muted-foreground">جرب تغيير معايير البحث للعثور على وظائف أخرى</p>
                  </div>
                ) : (
                  filteredJobs.map(job => (
                    <Card key={job.id} className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl border border-[#008C6A]/30 hover:scale-105 transition-all duration-300 group cursor-pointer hover:border-[#008C6A]/50">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-[#008C6A] transition-colors text-white">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center text-gray-300 mt-2">
                              <Building2 className="w-4 h-4 mr-1" />
                              <span>{job.department?.name || 'غير محدد'}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="shrink-0 bg-[#008C6A]/20 text-[#008C6A] border border-[#008C6A]/30">
                            {jobTypes.find(t => t.value === job.job_type)?.label || job.job_type}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-300 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center text-gray-300 mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>نُشر {new Date(job.posted_at).toLocaleDateString('ar-SA')}</span>
                          </div>

                          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                            {job.description.substring(0, 120)}...
                          </p>

                          {job.salary_range_min && job.salary_range_max && (
                            <div className="text-sm font-medium text-[#008C6A] mb-4">
                              {job.salary_range_min.toLocaleString()} - {job.salary_range_max.toLocaleString()} ريال
                            </div>
                          )}

                          <Separator className="my-4 bg-[#008C6A]/30" />

                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-300">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{job.applications_count} متقدم</span>
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-black/20 border-[#008C6A]/30 text-white hover:bg-[#008C6A]/10 hover:scale-105 transition-all duration-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewJob(job);
                                }}
                              >
                                عرض التفاصيل
                              </Button>
                              <Button 
                                size="sm"
                                className="bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white hover:from-[#009F87] hover:to-[#008C6A] hover:scale-105 transition-all duration-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyToJob(job);
                                }}
                              >
                                قدّم الآن
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="apply" className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 p-8">
              <ApplicationTracking />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Modals */}
      {showApplicationModal && selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      )}

      {showJobDetailModal && selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={showJobDetailModal}
          onClose={() => {
            setShowJobDetailModal(false);
            navigate('/careers');
          }}
          onApply={() => {
            setShowJobDetailModal(false);
            setShowApplicationModal(true);
          }}
        />
      )}
    </div>
  );
};

export default CareersPage;