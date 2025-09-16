import React, { useState } from 'react';
import { Search, Users, TrendingUp, Building2, MapPin, BarChart3, Gift, ChevronRight, AlertCircle, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface SalaryData {
  job_title: string;
  average_salary: number;
  salary_range: { min: number; max: number };
  data_points: number;
  industry_breakdown: Record<string, number>;
  city_breakdown: Record<string, number>;
}

const SalaryBenchmarkingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [jobTitle, setJobTitle] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [searchResults, setSearchResults] = useState<SalaryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockSalaryData: Record<string, SalaryData> = {
    'أخصائي موارد بشرية': {
      job_title: 'أخصائي موارد بشرية',
      average_salary: 9000,
      salary_range: { min: 7000, max: 12000 },
      data_points: 150,
      industry_breakdown: {
        'تقنية المعلومات': 9500,
        'الخدمات المالية': 8900,
        'التجارة': 8500,
        'الصحة': 9200
      },
      city_breakdown: {
        'الرياض': 9200,
        'جدة': 8800,
        'الدمام': 8600,
        'أخرى': 8400
      }
    },
    'مطور برمجيات': {
      job_title: 'مطور برمجيات',
      average_salary: 12000,
      salary_range: { min: 8000, max: 18000 },
      data_points: 320,
      industry_breakdown: {
        'تقنية المعلومات': 13000,
        'الخدمات المالية': 12500,
        'التجارة': 11000,
        'الصحة': 11800
      },
      city_breakdown: {
        'الرياض': 12500,
        'جدة': 12000,
        'الدمام': 11500,
        'أخرى': 10800
      }
    },
    'محاسب': {
      job_title: 'محاسب',
      average_salary: 7500,
      salary_range: { min: 5500, max: 10000 },
      data_points: 280,
      industry_breakdown: {
        'تقنية المعلومات': 8000,
        'الخدمات المالية': 8200,
        'التجارة': 7200,
        'الصحة': 7800
      },
      city_breakdown: {
        'الرياض': 7800,
        'جدة': 7500,
        'الدمام': 7200,
        'أخرى': 7000
      }
    }
  };

  const handleSearch = async () => {
    if (!jobTitle.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال المسمى الوظيفي",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const results = Object.values(mockSalaryData).filter(data =>
        data.job_title.includes(jobTitle) || jobTitle.includes(data.job_title)
      );
      
      if (results.length === 0) {
        // Add a generic result if no match found
        results.push({
          job_title: jobTitle,
          average_salary: 8500,
          salary_range: { min: 6000, max: 12000 },
          data_points: 75,
          industry_breakdown: {
            'تقنية المعلومات': 9000,
            'الخدمات المالية': 8500,
            'التجارة': 8000,
            'الصحة': 8700
          },
          city_breakdown: {
            'الرياض': 8800,
            'جدة': 8500,
            'الدمام': 8200,
            'أخرى': 8000
          }
        });
      }

      setSearchResults(results.slice(0, 3)); // Show first 3 results
      setIsLoading(false);

      toast({
        title: "تم البحث بنجاح",
        description: `تم العثور على ${results.length} نتيجة مقارنة`,
      });
    }, 1500);
  };

  const formatSalary = (amount: number) => {
    return `${amount.toLocaleString('ar-SA')} ريال`;
  };

  const calculatePercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
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
              <img 
                src={buodLogo} 
                alt="Buod HR" 
                className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105" 
              />
            </div>

            {/* Center Section - Title & BarChart Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  {isArabic ? 'مقارنة الرواتب' : 'Salary Benchmarking'}
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  {isArabic ? 'حساب قانوني دقيق' : 'Legal & Accurate Calculation'}
                </p>
              </div>
            </div>

            {/* Left Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 backdrop-blur-xl rounded-2xl border border-[#008C6A]/30 shadow-xl shadow-[#008C6A]/10 p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] shadow-lg shadow-[#008C6A]/40 group-hover:shadow-[#008C6A]/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-[#008C6A] to-[#00694F] opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-black/20 to-gray-900/30 backdrop-blur-lg rounded-xl border border-[#008C6A]/20 px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'دقيق' : 'Accurate'}</span>
                  </div>
                  <div className="w-px h-3 bg-[#008C6A]/30"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">{isArabic ? 'قانوني' : 'Legal'}</span>
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
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', path: '/hr-tools' },
                { label: isArabic ? 'مقارنة الرواتب' : 'Salary Benchmarking', path: '/salary-benchmarking' }
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
            {isArabic ? 'اعتمد على بيانات دقيقة لمقارنة الرواتب' : 'Rely on Accurate Data for Salary Comparison'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
              {isArabic 
                ? 'استند إلى بيانات موثوقة من أكثر من 200,000 موظف ومنشأة في السعودية لتقرر رواتب عادلة وجذابة مع تجربة تفاعلية متطورة'
                : 'Based on reliable data from more than 200,000 employees and organizations in Saudi Arabia to decide fair and attractive salaries with an advanced interactive experience'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008C6A]/20 via-transparent to-[#008C6A]/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Input Card */}
        <Card className="mb-8 bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300 max-w-4xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10 text-center">
              {isArabic ? 'اعتمد على بيانات دقيقة لمقارنة الرواتب' : 'Rely on Accurate Data for Salary Comparison'}
            </CardTitle>
            <p className="text-lg text-white/90 max-w-3xl mx-auto text-center relative z-10">
              {isArabic 
                ? 'استند إلى بيانات موثوقة من أكثر من 200,000 موظف ومنشأة في السعودية لتقرر رواتب عادلة وجذابة.'
                : 'Based on reliable data from more than 200,000 employees and organizations in Saudi Arabia to decide fair and attractive salaries.'
              }
            </p>
          </CardHeader>
          <CardContent className="p-6 bg-gray-900/40">
            {/* Value Propositions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                <TrendingUp className="h-8 w-8 text-[#008C6A]" />
                <div>
                  <h3 className="font-semibold text-white">{isArabic ? 'نتائج فورية' : 'Instant Results'}</h3>
                  <p className="text-sm text-gray-300">{isArabic ? 'أول 3 نتائج مجاناً' : 'First 3 results free'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                <Users className="h-8 w-8 text-[#008C6A]" />
                <div>
                  <h3 className="font-semibold text-white">{isArabic ? 'بيانات محدثة' : 'Updated Data'}</h3>
                  <p className="text-sm text-gray-300">{isArabic ? 'تحديث لحظي' : 'Real-time updates'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                <Building2 className="h-8 w-8 text-[#008C6A]" />
                <div>
                  <h3 className="font-semibold text-white">{isArabic ? 'دون استشارات' : 'No Consultations'}</h3>
                  <p className="text-sm text-gray-300">{isArabic ? 'لا حاجة لجداول إكسل' : 'No need for Excel sheets'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-black/40 backdrop-blur-sm border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                <Gift className="h-8 w-8 text-[#008C6A]" />
                <div>
                  <h3 className="font-semibold text-white">{isArabic ? 'رواتب عادلة' : 'Fair Salaries'}</h3>
                  <p className="text-sm text-gray-300">{isArabic ? 'اجذب أفضل المواهب' : 'Attract top talent'}</p>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border-2 border-[#008C6A]/30 shadow-lg">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-gray-200 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A] rounded-full animate-pulse"></span>
                    {isArabic ? 'المسمى الوظيفي *' : 'Job Title *'}
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder={isArabic ? 'مثال: أخصائي موارد بشرية' : 'Example: HR Specialist'}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-12 bg-black/50 border-[#008C6A]/40 text-white placeholder:text-gray-400 focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-gray-200 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                    {isArabic ? 'نوع المنشأة' : 'Company Size'}
                  </Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger className="h-12 bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200">
                      <SelectValue placeholder={isArabic ? 'اختر نوع المنشأة' : 'Select company size'} className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/40">
                      <SelectItem value="small" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'صغيرة (1-50 موظف)' : 'Small (1-50 employees)'}
                      </SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'متوسطة (51-250 موظف)' : 'Medium (51-250 employees)'}
                      </SelectItem>
                      <SelectItem value="large" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'كبيرة (250+ موظف)' : 'Large (250+ employees)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-200 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#008C6A]/70 rounded-full"></span>
                    {isArabic ? 'الصناعة (اختياري)' : 'Industry (Optional)'}
                  </Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="h-12 bg-black/50 border-[#008C6A]/40 text-white focus:border-[#008C6A] focus:ring-[#008C6A]/50 hover:border-[#008C6A]/70 transition-all duration-200">
                      <SelectValue placeholder={isArabic ? 'اختر الصناعة' : 'Select industry'} className="text-gray-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#008C6A]/40">
                      <SelectItem value="tech" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'تقنية المعلومات' : 'Information Technology'}
                      </SelectItem>
                      <SelectItem value="finance" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'الخدمات المالية' : 'Financial Services'}
                      </SelectItem>
                      <SelectItem value="retail" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'التجارة' : 'Retail'}
                      </SelectItem>
                      <SelectItem value="healthcare" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'الصحة' : 'Healthcare'}
                      </SelectItem>
                      <SelectItem value="education" className="text-white hover:bg-[#008C6A]/20 focus:bg-[#008C6A]/30">
                        {isArabic ? 'التعليم' : 'Education'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] hover:from-[#00694F] hover:via-[#008C6A] hover:to-[#009F87] text-white font-bold py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#008C6A]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {isArabic ? 'جاري البحث...' : 'Searching...'}
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      {isArabic ? 'ابحث الآن' : 'Search Now'}
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-6 animate-fade-in">
            {searchResults.length > 0 ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">{isArabic ? 'نتائج المقارنة' : 'Comparison Results'}</h2>
                  <p className="text-gray-300">{isArabic ? 'أول 3 نتائج مجانية - للمزيد انضم لقائمة الانتظار' : 'First 3 results free - join waiting list for more'}</p>
                </div>

                <div className="grid gap-6">
                  {searchResults.map((result, index) => (
                    <Card key={index} className="bg-gray-900/60 backdrop-blur-xl shadow-2xl border border-[#008C6A]/30 animate-fade-in hover:border-[#008C6A]/50 transition-all duration-300 transform hover:scale-[1.01]">
                      <CardHeader className="bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] text-white rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="flex items-center justify-between relative z-10">
                          <CardTitle className="text-xl font-bold text-white">
                            {result.job_title}
                          </CardTitle>
                          <div className="text-sm text-white/90 flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {result.data_points} {isArabic ? 'عينة بيانات' : 'data samples'}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6 bg-gray-900/40">
                        {/* Salary Overview */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 rounded-lg bg-black/40 border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                            <p className="text-sm text-gray-400 mb-1">{isArabic ? 'متوسط الراتب' : 'Average Salary'}</p>
                            <p className="text-2xl font-bold text-[#008C6A] animate-pulse">
                              {formatSalary(result.average_salary)}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-black/40 border border-green-500/20 hover:border-green-500/40 transition-all duration-200">
                            <p className="text-sm text-gray-400 mb-1">{isArabic ? 'أقل راتب' : 'Minimum Salary'}</p>
                            <p className="text-xl font-semibold text-green-400">
                              {formatSalary(result.salary_range.min)}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-black/40 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200">
                            <p className="text-sm text-gray-400 mb-1">{isArabic ? 'أعلى راتب' : 'Maximum Salary'}</p>
                            <p className="text-xl font-semibold text-blue-400">
                              {formatSalary(result.salary_range.max)}
                            </p>
                          </div>
                        </div>

                        {/* Salary Range Visualization */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{isArabic ? 'نطاق الراتب' : 'Salary Range'}</span>
                            <span>{formatSalary(result.salary_range.min)} - {formatSalary(result.salary_range.max)}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3 relative">
                            <div 
                              className="bg-gradient-to-r from-green-400 via-[#008C6A] to-blue-400 h-3 rounded-full"
                              style={{ width: '100%' }}
                            />
                            <div 
                              className="absolute top-0 h-3 w-1 bg-red-500 rounded-full animate-pulse"
                              style={{ 
                                left: `${calculatePercentage(result.average_salary, result.salary_range.min, result.salary_range.max)}%`,
                                transform: 'translateX(-50%)'
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-xs text-gray-400">{isArabic ? 'المتوسط' : 'Average'}</span>
                          </div>
                        </div>

                        {/* Industry Breakdown */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-[#008C6A]" />
                            {isArabic ? 'التوزيع حسب الصناعة' : 'Industry Breakdown'}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(result.industry_breakdown).map(([industry, salary]) => (
                              <div key={industry} className="flex justify-between items-center p-2 rounded bg-black/40 border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                                <span className="text-sm text-gray-300">{industry}</span>
                                <span className="font-semibold text-[#008C6A]">{formatSalary(salary)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* City Breakdown */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#008C6A]" />
                            {isArabic ? 'التوزيع حسب المدينة' : 'City Breakdown'}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(result.city_breakdown).map(([city, salary]) => (
                              <div key={city} className="flex justify-between items-center p-2 rounded bg-black/40 border border-[#008C6A]/20 hover:border-[#008C6A]/40 transition-all duration-200">
                                <span className="text-sm text-gray-300">{city}</span>
                                <span className="font-semibold text-[#008C6A]">{formatSalary(salary)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA Section */}
                <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 via-primary-glow/5 to-background text-center">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      هل تريد المزيد من التحليلات التفصيلية؟
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      احصل على تحليلات شاملة تشمل مقارنات حسب سنوات الخبرة، المؤهلات، والمزيد من البيانات المفصلة
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300 transform hover:scale-105"
                        onClick={() => toast({ title: "تم الانضمام", description: "سيتم التواصل معك قريباً" })}
                      >
                        <Gift className="h-5 w-5 ml-2" />
                        انضم لقائمة الانتظار
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
                        onClick={() => toast({ title: "طلب العرض", description: "سيتم التواصل معك خلال 24 ساعة" })}
                      >
                        <ChevronRight className="h-5 w-5 ml-2" />
                        اطلب عرضاً تفصيلياً
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="text-center p-8">
                <CardContent>
                  <div className="text-muted-foreground mb-4">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>لم يتم العثور على نتائج مطابقة</p>
                    <p className="text-sm">جرب مسمى وظيفي آخر أو تواصل معنا لإضافة بيانات جديدة</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryBenchmarkingPage;