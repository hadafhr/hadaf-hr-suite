import React, { useState } from 'react';
import { Search, Users, TrendingUp, Building2, MapPin, BarChart3, Gift, ChevronRight, AlertTriangle } from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  const [jobTitle, setJobTitle] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [searchResults, setSearchResults] = useState<SalaryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                مقارنة الرواتب
              </h1>
              <p className="text-sm text-muted-foreground">
                اعتمد على بيانات دقيقة لمقارنة الرواتب
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-primary/5 via-primary-glow/5 to-background animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              اعتمد على بيانات دقيقة لمقارنة الرواتب للشركات الصغيرة والمتوسطة في المملكة
            </CardTitle>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              استند إلى بيانات موثوقة من أكثر من 200,000 موظف ومنشأة في السعودية لتقرر رواتب عادلة وجذابة.
            </p>
          </CardHeader>
          <CardContent>
            {/* Value Propositions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">نتائج فورية</h3>
                  <p className="text-sm text-muted-foreground">أول 3 نتائج مجاناً</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">بيانات محدثة</h3>
                  <p className="text-sm text-muted-foreground">تحديث لحظي</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">دون استشارات</h3>
                  <p className="text-sm text-muted-foreground">لا حاجة لجداول إكسل</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border">
                <Gift className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">رواتب عادلة</h3>
                  <p className="text-sm text-muted-foreground">اجذب أفضل المواهب</p>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border-2 border-primary/10 shadow-lg">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-sm font-medium">
                    المسمى الوظيفي *
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="مثال: أخصائي موارد بشرية"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-sm font-medium">
                    نوع المنشأة
                  </Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر نوع المنشأة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">صغيرة (1-50 موظف)</SelectItem>
                      <SelectItem value="medium">متوسطة (51-250 موظف)</SelectItem>
                      <SelectItem value="large">كبيرة (250+ موظف)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium">
                    الصناعة (اختياري)
                  </Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر الصناعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">تقنية المعلومات</SelectItem>
                      <SelectItem value="finance">الخدمات المالية</SelectItem>
                      <SelectItem value="retail">التجارة</SelectItem>
                      <SelectItem value="healthcare">الصحة</SelectItem>
                      <SelectItem value="education">التعليم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    جاري البحث...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    ابحث الآن
                  </div>
                )}
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
                  <h2 className="text-2xl font-bold mb-2">نتائج المقارنة</h2>
                  <p className="text-muted-foreground">أول 3 نتائج مجانية - للمزيد انضم لقائمة الانتظار</p>
                </div>

                <div className="grid gap-6">
                  {searchResults.map((result, index) => (
                    <Card key={index} className="border-0 shadow-xl bg-gradient-to-r from-background via-background to-muted/10 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-bold text-primary">
                            {result.job_title}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {result.data_points} عينة بيانات
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Salary Overview */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-sm text-muted-foreground mb-1">متوسط الراتب</p>
                            <p className="text-2xl font-bold text-primary">
                              {formatSalary(result.average_salary)}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                            <p className="text-sm text-muted-foreground mb-1">أقل راتب</p>
                            <p className="text-xl font-semibold text-green-600">
                              {formatSalary(result.salary_range.min)}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                            <p className="text-sm text-muted-foreground mb-1">أعلى راتب</p>
                            <p className="text-xl font-semibold text-blue-600">
                              {formatSalary(result.salary_range.max)}
                            </p>
                          </div>
                        </div>

                        {/* Salary Range Visualization */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>نطاق الراتب</span>
                            <span>{formatSalary(result.salary_range.min)} - {formatSalary(result.salary_range.max)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 relative">
                            <div 
                              className="bg-gradient-to-r from-green-400 via-primary to-blue-400 h-3 rounded-full"
                              style={{ width: '100%' }}
                            />
                            <div 
                              className="absolute top-0 h-3 w-1 bg-red-500 rounded-full"
                              style={{ 
                                left: `${calculatePercentage(result.average_salary, result.salary_range.min, result.salary_range.max)}%`,
                                transform: 'translateX(-50%)'
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-xs text-muted-foreground">المتوسط</span>
                          </div>
                        </div>

                        {/* Industry Breakdown */}
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            التوزيع حسب الصناعة
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(result.industry_breakdown).map(([industry, salary]) => (
                              <div key={industry} className="flex justify-between items-center p-2 rounded bg-muted/50">
                                <span className="text-sm">{industry}</span>
                                <span className="font-semibold text-primary">{formatSalary(salary)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* City Breakdown */}
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            التوزيع حسب المدينة
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(result.city_breakdown).map(([city, salary]) => (
                              <div key={city} className="flex justify-between items-center p-2 rounded bg-muted/50">
                                <span className="text-sm">{city}</span>
                                <span className="font-semibold text-primary">{formatSalary(salary)}</span>
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