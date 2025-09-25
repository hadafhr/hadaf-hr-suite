import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Download, Eye, TrendingUp, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb } from '@/components/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import buodLogo from '@/assets/buod-logo-white.png';

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
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  دليل الأوصاف الوظيفية
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  مسارات وظيفية احترافية
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    الوظائف المتاحة
                  </span>
                  <span className="text-sm text-[#008C6A] font-bold">
                    {filteredJobs.length}
                  </span>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{filteredJobs.length} وظيفة</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">محدّث</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: 'الرئيسية', path: '/' },
                { label: 'دليل الأوصاف الوظيفية', path: '/job-descriptions' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-white bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
            دليل الأوصاف الوظيفية
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              ابحث عن مهام ومسؤوليات ومسارات كل مسمى وظيفي، مع مؤشرات رواتب في السعودية (﷼)
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Professional Search Bar */}
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#008C6A] h-5 w-5 z-10" />
                <Input
                  placeholder="ابحث باسم المسمى الوظيفي..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-12 pl-6 h-14 bg-gradient-to-r from-gray-900/80 to-black/60 backdrop-blur-xl border border-[#008C6A]/30 rounded-2xl text-white placeholder-gray-400 focus:border-[#008C6A]/70 focus:ring-2 focus:ring-[#008C6A]/30 transition-all duration-300 shadow-xl hover:shadow-[#008C6A]/20"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:bg-gradient-to-r hover:from-[#008C6A]/20 hover:to-[#00694F]/20 hover:border-[#008C6A]/70 transition-all duration-300 shadow-lg hover:shadow-[#008C6A]/25 px-6 h-12"
              >
                <Search className="w-4 h-4 mr-2" />
                مسح البحث
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {['مدير الموارد البشرية', 'محاسب مالي', 'مطور برمجيات', 'مندوب مبيعات'].map((job) => (
              <Badge 
                key={job} 
                className={`cursor-pointer px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  searchTerm === job 
                    ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white border-[#008C6A] shadow-lg hover:shadow-[#008C6A]/25' 
                    : 'bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:bg-gradient-to-r hover:from-[#008C6A]/20 hover:to-[#00694F]/20 hover:border-[#008C6A]/70'
                }`}
                onClick={() => setSearchTerm(job)}
              >
                {job}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Filter className="h-5 w-5 text-[#008C6A]" />
                  التصنيفات
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-[#008C6A] hover:text-white hover:bg-[#008C6A]/20"
                >
                  مسح الكل
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">الإدارة</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:border-[#008C6A]/70 transition-all duration-300">
                      <SelectValue placeholder="اختر الإدارة" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept} className="text-white hover:bg-[#008C6A]/20">{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">المستوى المهني</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:border-[#008C6A]/70 transition-all duration-300">
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                      {levels.map((level) => (
                        <SelectItem key={level} value={level} className="text-white hover:bg-[#008C6A]/20">{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">نوع العمل</label>
                  <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
                    <SelectTrigger className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:border-[#008C6A]/70 transition-all duration-300">
                      <SelectValue placeholder="اختر نوع العمل" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-[#008C6A]/20">{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">المدينة</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:border-[#008C6A]/70 transition-all duration-300">
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="text-white hover:bg-[#008C6A]/20">{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-lg">
                  <span className="text-[#008C6A] font-bold">{filteredJobs.length}</span> وظيفة
                </span>
                {(debouncedSearchTerm || selectedDepartment || selectedLevel || selectedWorkType || selectedCity) && (
                  <Badge className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40">
                    مفلترة
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gradient-to-r from-gray-900/50 to-black/30 border border-[#008C6A]/30 text-white hover:border-[#008C6A]/70 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#008C6A]/30">
                    <SelectItem value="trending" className="text-white hover:bg-[#008C6A]/20">الأكثر رواجاً</SelectItem>
                    <SelectItem value="alphabetical" className="text-white hover:bg-[#008C6A]/20">أبجدياً</SelectItem>
                    <SelectItem value="newest" className="text-white hover:bg-[#008C6A]/20">الأحدث</SelectItem>
                    <SelectItem value="views" className="text-white hover:bg-[#008C6A]/20">الأكثر مشاهدة</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-[#008C6A]/30 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900/50 to-black/30">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white' : 'text-gray-400 hover:text-white hover:bg-[#008C6A]/20'}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-gradient-to-r from-[#008C6A] to-[#00694F] text-white' : 'text-gray-400 hover:text-white hover:bg-[#008C6A]/20'}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 py-16 text-center">
                <p className="text-gray-300 mb-4">لا توجد وظائف تطابق معايير البحث</p>
                <Button 
                  onClick={clearFilters} 
                  className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white border-0 shadow-lg hover:shadow-[#008C6A]/25 transition-all duration-300"
                >
                  مسح التصنيفات
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-xl rounded-3xl border border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/10 hover:shadow-[#008C6A]/25 transition-all duration-500 hover:scale-105 hover:border-[#008C6A]/60 cursor-pointer"
                    onClick={() => handleJobClick(job.id)}
                  >
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/10 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#008C6A] transition-colors duration-300 mb-2 flex items-center gap-2">
                            {job.title}
                            {job.trending && (
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg text-xs">
                                <TrendingUp className="h-3 w-3 ml-1" />
                                رائج
                              </Badge>
                            )}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40 text-xs">{job.department}</Badge>
                            <Badge className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40 text-xs">{job.level}</Badge>
                            <Badge className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40 text-xs">{job.workType}</Badge>
                            <Badge className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40 text-xs">{job.city}</Badge>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                            <Eye className="h-3 w-3" />
                            {job.views.toLocaleString('ar-SA')}
                          </div>
                          <div className="text-sm font-bold text-[#008C6A]">
                            {job.salaryRange} ﷼
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                        {job.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <Button 
                          className="bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 text-[#008C6A] border border-[#008C6A]/40 hover:bg-gradient-to-r hover:from-[#008C6A] hover:to-[#00694F] hover:text-white hover:border-[#008C6A] transition-all duration-300 font-semibold shadow-lg hover:shadow-[#008C6A]/25"
                          size="sm"
                        >
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
                          className="text-[#008C6A] hover:text-white hover:bg-[#008C6A]/20 transition-all duration-300"
                        >
                          <Download className="h-4 w-4 ml-2" />
                          تحميل PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}