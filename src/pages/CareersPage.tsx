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
    <div className="min-h-screen bg-background">
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
      
      {/* الهيدر المتطور */}
      <CareersHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-[0.15]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-[0.1]"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            انضم إلى فريقنا في بُعد HR
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            كن جزءاً من رحلة تطوير أكثر منصات الموارد البشرية تقدماً في المملكة العربية السعودية
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button 
              size="lg" 
              className="glass-card hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Briefcase className="w-5 h-5 mr-2" />
              عرض الوظائف الشاغرة
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              تعرف على ثقافتنا
            </Button>
          </div>
          
          {/* إحصائيات سريعة في Hero */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-primary">500+</div>
              <div className="text-sm text-muted-foreground">موظف</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-primary">95%</div>
              <div className="text-sm text-muted-foreground">رضا</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1 text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">دعم</div>
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات سريعة */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-2">{statistics.totalJobs}+</div>
              <div className="text-muted-foreground">وظيفة متاحة</div>
            </div>
            <div className="text-center glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">موظف سعيد</div>
            </div>
            <div className="text-center glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-muted-foreground">أقسام متخصصة</div>
            </div>
            <div className="text-center glass-card p-6 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">رضا الموظفين</div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم لماذا بُعد HR */}
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار بُعد HR؟</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              نوفر بيئة عمل محفزة ومليئة بالفرص للنمو والتطوير المهني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center glass-card p-8 group hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">بيئة عمل داعمة</h3>
              <p className="text-muted-foreground">فريق متعاون وقيادة داعمة لتحقيق أهدافك</p>
            </div>

            <div className="text-center glass-card p-8 group hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">فرص نمو مميزة</h3>
              <p className="text-muted-foreground">مسار وظيفي واضح وفرص ترقية سريعة</p>
            </div>

            <div className="text-center glass-card p-8 group hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">تقنيات متطورة</h3>
              <p className="text-muted-foreground">اعمل مع أحدث التقنيات والأدوات</p>
            </div>

            <div className="text-center glass-card p-8 group hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">مرونة في العمل</h3>
              <p className="text-muted-foreground">خيارات عمل مرنة وتوازن صحي</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم البحث والفلترة والوظائف */}
      <section id="jobs-section" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الوظائف والتقديم</h2>
            <p className="text-lg text-muted-foreground">اكتشف الفرص الوظيفية المناسبة لخبرتك ومهاراتك أو تابع طلباتك السابقة</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card grid w-full grid-cols-2 mb-8 p-2">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                الوظائف المتاحة
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                قدم الآن
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-8">
              {/* أدوات البحث والفلترة */}
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="ابحث عن وظيفة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10 glass-card"
                        />
                      </div>
                    </div>

                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="القسم" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="الموقع" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="all">جميع المواقع</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location.value} value={location.value}>{location.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="نوع الدوام" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        {jobTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-muted-foreground">
                      {filteredJobs.length} وظيفة من أصل {jobs.length}
                    </div>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="glass-card">
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
                    <Card key={job.id} className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center text-muted-foreground mt-2">
                              <Building2 className="w-4 h-4 mr-1" />
                              <span>{job.department?.name || 'غير محدد'}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="shrink-0 glass-card">
                            {jobTypes.find(t => t.value === job.job_type)?.label || job.job_type}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>نُشر {new Date(job.posted_at).toLocaleDateString('ar-SA')}</span>
                          </div>

                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {job.description.substring(0, 120)}...
                          </p>

                          {job.salary_range_min && job.salary_range_max && (
                            <div className="text-sm font-medium text-primary">
                              {job.salary_range_min.toLocaleString()} - {job.salary_range_max.toLocaleString()} ريال
                            </div>
                          )}

                          <Separator />

                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{job.applications_count} متقدم</span>
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewJob(job);
                                }}
                              >
                                عرض التفاصيل
                              </Button>
                              <Button 
                                size="sm"
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

            <TabsContent value="apply">
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