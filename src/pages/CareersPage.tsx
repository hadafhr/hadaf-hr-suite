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
import calendarLogo from '@/assets/calendar-logo.png';

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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
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
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent opacity-80"></div>
        </div>
        <CareersHeader />
      </header>
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Professional Layered Background */}
        <div className="absolute inset-0 bg-background"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.05),transparent_70%)]"></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-32 left-[15%] w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-[20%] w-48 h-48 bg-accent/8 rounded-full blur-2xl animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Accent Lines */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Logo */}
          <div className="relative inline-flex items-center justify-center mb-12 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src={calendarLogo} 
              alt="Buod HR Logo" 
              className="h-72 w-72 z-10 relative drop-shadow-2xl transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight max-w-4xl mx-auto">
            انضم إلى فريقنا في 
            <span className="block mt-4 bg-gradient-to-r from-accent via-accent to-foreground bg-clip-text text-transparent animate-fade-in">
              بُعد HR
            </span>
          </h1>
          
          {/* Description */}
          <div className="relative max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium bg-card/30 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              كن جزءاً من رحلة تطوير أكثر منصات الموارد البشرية تقدماً في المملكة العربية السعودية
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl blur opacity-50"></div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-20">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-accent text-primary-foreground px-10 py-6 text-xl font-bold shadow-2xl border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 min-w-[250px] relative overflow-hidden group"
              onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <Briefcase className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">عرض الوظائف الشاغرة</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-border text-foreground hover:bg-accent/20 hover:border-accent px-10 py-6 text-xl font-bold backdrop-blur-sm bg-card/50 transition-all duration-300 hover:scale-105 min-w-[250px]"
            >
              <Heart className="w-6 h-6 mr-3" />
              تعرف على ثقافتنا
            </Button>
          </div>
          
          {/* Statistics Cards with Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-background border-2 border-border rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:border-accent backdrop-blur-sm">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">500+</div>
                <div className="text-lg text-foreground font-semibold">موظف محترف</div>
                <div className="text-sm text-muted-foreground mt-2">في جميع التخصصات</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-background border-2 border-border rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:border-accent backdrop-blur-sm">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">95%</div>
                <div className="text-lg text-foreground font-semibold">معدل الرضا</div>
                <div className="text-sm text-muted-foreground mt-2">من موظفينا</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-card to-background border-2 border-border rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:border-accent backdrop-blur-sm">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">24/7</div>
                <div className="text-lg text-foreground font-semibold">دعم مستمر</div>
                <div className="text-sm text-muted-foreground mt-2">لجميع الموظفين</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات سريعة */}
      <section className="py-16 bg-card backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-6 hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="text-3xl font-bold text-accent mb-2">{statistics.totalJobs}+</div>
              <div className="text-muted-foreground">وظيفة متاحة</div>
            </div>
            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-6 hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">موظف سعيد</div>
            </div>
            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-6 hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="text-3xl font-bold text-accent mb-2">7</div>
              <div className="text-muted-foreground">أقسام متخصصة</div>
            </div>
            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-6 hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">رضا الموظفين</div>
            </div>
          </div>
        </div>
      </section>

      {/* قسم لماذا بُعد HR */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--accent))_0%,transparent_50%)] opacity-[0.1]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">لماذا تختار بُعد HR؟</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              نوفر بيئة عمل محفزة ومليئة بالفرص للنمو والتطوير المهني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-8 group hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors border border-border">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">بيئة عمل داعمة</h3>
              <p className="text-muted-foreground">فريق متعاون وقيادة داعمة لتحقيق أهدافك</p>
            </div>

            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-8 group hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors border border-border">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">فرص نمو مميزة</h3>
              <p className="text-muted-foreground">مسار وظيفي واضح وفرص ترقية سريعة</p>
            </div>

            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-8 group hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors border border-border">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">تقنيات متطورة</h3>
              <p className="text-muted-foreground">اعمل مع أحدث التقنيات والأدوات</p>
            </div>

            <div className="text-center bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-8 group hover:scale-105 transition-all duration-300 hover:border-accent">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors border border-border">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">مرونة في العمل</h3>
              <p className="text-muted-foreground">خيارات عمل مرنة وتوازن صحي</p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم البحث والفلترة والوظائف */}
      <section id="jobs-section" className="py-20 bg-card backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">الوظائف والتقديم</h2>
            <p className="text-lg text-muted-foreground">اكتشف الفرص الوظيفية المناسبة لخبرتك ومهاراتك أو تابع طلباتك السابقة</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gradient-to-r from-card to-background backdrop-blur-xl border border-border grid w-full grid-cols-2 mb-8 p-2">
              <TabsTrigger value="jobs" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-foreground text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                الوظائف المتاحة
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex items-center gap-2 data-[state=active]:bg-accent/20 data-[state=active]:text-foreground text-muted-foreground">
                <FileText className="w-4 h-4" />
                طلبات التوظيف
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-8">
              {/* أدوات البحث والفلترة */}
              <Card className="bg-gradient-to-br from-card to-background backdrop-blur-xl border border-border shadow-xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="ابحث عن وظيفة..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                        />
                      </div>
                    </div>

                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="القسم" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="الموقع" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="all">جميع المواقع</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location.value} value={location.value}>{location.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="نوع الدوام" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
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
                    <Button variant="outline" size="sm" onClick={clearFilters} className="bg-card border-border hover:bg-accent/10">
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
                    <Card key={job.id} className="bg-gradient-to-br from-card to-background backdrop-blur-xl border border-border hover:scale-105 transition-all duration-300 group cursor-pointer hover:border-accent">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-accent transition-colors text-foreground">
                              {job.title}
                            </CardTitle>
                            <div className="flex items-center text-muted-foreground mt-2">
                              <Building2 className="w-4 h-4 mr-1" />
                              <span>{job.department?.name || 'غير محدد'}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="shrink-0 bg-accent/20 text-accent border border-accent/30">
                            {jobTypes.find(t => t.value === job.job_type)?.label || job.job_type}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center text-muted-foreground mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>نُشر {new Date(job.posted_at).toLocaleDateString('ar-SA')}</span>
                          </div>

                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {job.description.substring(0, 120)}...
                          </p>

                          {job.salary_range_min && job.salary_range_max && (
                            <div className="text-sm font-medium text-accent mb-4">
                              {job.salary_range_min.toLocaleString()} - {job.salary_range_max.toLocaleString()} ريال
                            </div>
                          )}

                          <Separator className="my-4 bg-border" />

                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              <span>{job.applications_count} متقدم</span>
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-card border-border hover:bg-accent/10 hover:scale-105 transition-all duration-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewJob(job);
                                }}
                              >
                                عرض التفاصيل
                              </Button>
                              <Button 
                                size="sm"
                                className="bg-primary hover:bg-accent text-primary-foreground hover:scale-105 transition-all duration-300"
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

            <TabsContent value="apply" className="bg-gradient-to-br from-card to-background backdrop-blur-xl rounded-2xl border border-border p-8">
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
