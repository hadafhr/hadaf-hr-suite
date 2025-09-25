import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, Download, Eye, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data - in real app this would come from API
const mockJobDescriptions = [
  {
    id: '1',
    title: 'مدير الموارد البشرية',
    department: 'الموارد البشرية',
    level: 'قيادي',
    workType: 'مكتبي',
    city: 'الرياض',
    summary: 'يقود استراتيجية الموارد البشرية وإدارة المواهب في المؤسسة',
    description: 'مسؤول عن وضع وتنفيذ استراتيجيات الموارد البشرية...',
    views: 1250,
    trending: true,
    salaryRange: '15000-25000',
    currency: 'SAR',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'محاسب مالي',
    department: 'المالية والمحاسبة',
    level: 'متوسط',
    workType: 'مكتبي',
    city: 'جدة',
    summary: 'يدير العمليات المحاسبية والمالية اليومية للمؤسسة',
    description: 'مسؤول عن إعداد التقارير المالية والحسابات...',
    views: 890,
    trending: false,
    salaryRange: '8000-15000',
    currency: 'SAR',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'مطور برمجيات',
    department: 'تقنية المعلومات',
    level: 'متوسط',
    workType: 'هجين',
    city: 'الدمام',
    summary: 'يطور ويصمم التطبيقات والأنظمة البرمجية',
    description: 'مسؤول عن كتابة الكود وتطوير التطبيقات...',
    views: 2100,
    trending: true,
    salaryRange: '12000-20000',
    currency: 'SAR',
    createdAt: '2024-01-20'
  }
];

const departments = ['الموارد البشرية', 'المالية والمحاسبة', 'تقنية المعلومات', 'التسويق', 'المبيعات'];
const levels = ['مبتدئ', 'متوسط', 'قيادي'];
const workTypes = ['مكتبي', 'ميداني', 'هجين'];
const cities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة'];

export default function JobDescriptionsIndex() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = mockJobDescriptions.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
      const matchesLevel = !selectedLevel || job.level === selectedLevel;
      const matchesWorkType = !selectedWorkType || job.workType === selectedWorkType;
      const matchesCity = !selectedCity || job.city === selectedCity;

      return matchesSearch && matchesDepartment && matchesLevel && matchesWorkType && matchesCity;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title, 'ar');
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'views':
          return b.views - a.views;
        case 'trending':
        default:
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
    });

    return filtered;
  }, [debouncedSearchTerm, selectedDepartment, selectedLevel, selectedWorkType, selectedCity, sortBy]);

  const handleJobClick = (jobId: string) => {
    navigate(`/job-descriptions/${jobId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedLevel('');
    setSelectedWorkType('');
    setSelectedCity('');
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-muted/20 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              دليل الأوصاف الوظيفية
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ابحث عن مهام ومسؤوليات ومسارات كل مسمى وظيفي، مع مؤشرات رواتب في السعودية (﷼)
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="ابحث باسم المسمى الوظيفي..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-12 py-4 text-lg border-2 focus:border-primary/50 bg-background"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['مدير الموارد البشرية', 'محاسب مالي', 'مطور برمجيات', 'مندوب مبيعات'].map((job) => (
                <Badge 
                  key={job} 
                  variant="secondary" 
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchTerm(job)}
                >
                  {job}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    التصنيفات
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    مسح الكل
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">الإدارة</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الإدارة" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">المستوى المهني</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">نوع العمل</label>
                  <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العمل" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">المدينة</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {filteredJobs.length} وظيفة
                </span>
                {(debouncedSearchTerm || selectedDepartment || selectedLevel || selectedWorkType || selectedCity) && (
                  <Badge variant="outline">
                    مفلترة
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">الأكثر رواجاً</SelectItem>
                    <SelectItem value="alphabetical">أبجدياً</SelectItem>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="views">الأكثر مشاهدة</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground mb-4">لا توجد وظائف تطابق معايير البحث</p>
                  <Button onClick={clearFilters} variant="outline">
                    مسح التصنيفات
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center gap-2">
                            {job.title}
                            {job.trending && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="h-3 w-3 ml-1" />
                                رائج
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">{job.department}</Badge>
                            <Badge variant="outline">{job.level}</Badge>
                            <Badge variant="outline">{job.workType}</Badge>
                            <Badge variant="outline">{job.city}</Badge>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {job.views.toLocaleString('ar-SA')}
                          </div>
                          <div className="text-sm font-medium text-primary mt-1">
                            {job.salaryRange} ﷼
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {job.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button variant="default" size="sm">
                          عرض التفاصيل
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "تحميل PDF",
                              description: "سيتم تحميل الوصف الوظيفي قريباً",
                            });
                          }}
                        >
                          <Download className="h-4 w-4 ml-2" />
                          تحميل PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}