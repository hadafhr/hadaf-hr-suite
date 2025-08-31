import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, Users, Calendar, Search, Plus, FileText, ArrowLeft,
  Bot, Settings, BarChart3, PieChart, User, Globe, Video,
  Download, Upload, CheckCircle, Clock, Target, Star
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  englishTitle: string;
  department: string;
  location: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  postedDate: string;
  deadline: string;
  status: 'open' | 'closed' | 'draft';
  applicants: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  resumeScore: number;
}

interface ComprehensiveRecruitmentProps {
  onBack?: () => void;
}

export const ComprehensiveRecruitment: React.FC<ComprehensiveRecruitmentProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'مطور برمجيات أول',
      englishTitle: 'Senior Software Developer',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      employmentType: 'full_time',
      experience: '3-5 سنوات',
      salary: '8,000 - 12,000 ريال',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      status: 'open',
      applicants: 25
    },
    {
      id: '2',
      title: 'محاسب أول',
      englishTitle: 'Senior Accountant',
      department: 'المحاسبة والمالية',
      location: 'جدة',
      employmentType: 'full_time',
      experience: '2-4 سنوات',
      salary: '6,000 - 9,000 ريال',
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      status: 'open',
      applicants: 18
    },
    {
      id: '3',
      title: 'مصمم جرافيك',
      englishTitle: 'Graphic Designer',
      department: 'التسويق',
      location: 'الدمام',
      employmentType: 'contract',
      experience: '1-3 سنوات',
      salary: '4,000 - 7,000 ريال',
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      status: 'closed',
      applicants: 32
    }
  ];

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'أحمد علي محمد',
      email: 'ahmed.ali@email.com',
      phone: '+966501234567',
      position: 'مطور برمجيات أول',
      experience: '4 سنوات',
      education: 'بكالوريوس علوم الحاسب',
      status: 'interview',
      appliedDate: '2024-01-18',
      resumeScore: 85
    },
    {
      id: '2',
      name: 'فاطمة الزهراني',
      email: 'fatima.z@email.com',
      phone: '+966507654321',
      position: 'محاسب أول',
      experience: '3 سنوات',
      education: 'بكالوريوس محاسبة',
      status: 'offer',
      appliedDate: '2024-01-22',
      resumeScore: 92
    },
    {
      id: '3',
      name: 'محمد السعد',
      email: 'mohammed.s@email.com',
      phone: '+966509876543',
      position: 'مصمم جرافيك',
      experience: '2 سنة',
      education: 'بكالوريوس تصميم جرافيك',
      status: 'hired',
      appliedDate: '2024-01-12',
      resumeScore: 88
    }
  ];

  const handleSystemAction = (action: string) => {
    console.log(`تنفيذ إجراء: ${action}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'open': 'bg-green-500/20 text-green-700 border-green-200',
      'closed': 'bg-red-500/20 text-red-700 border-red-200',
      'draft': 'bg-gray-500/20 text-gray-700 border-gray-200',
      'applied': 'bg-blue-500/20 text-blue-700 border-blue-200',
      'screening': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'interview': 'bg-purple-500/20 text-purple-700 border-purple-200',
      'offer': 'bg-orange-500/20 text-orange-700 border-orange-200',
      'hired': 'bg-green-500/20 text-green-700 border-green-200',
      'rejected': 'bg-red-500/20 text-red-700 border-red-200'
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
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-foreground rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/20 backdrop-blur rounded-2xl shadow-xl">
                  <Briefcase className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">نظام التوظيف والاستقطاب الذكي</h1>
                  <p className="text-white/90 text-lg">
                    منظومة متطورة لاستقطاب المواهب وإدارة عمليات التوظيف بالذكاء الاصطناعي
                  </p>
                  <div className="flex gap-4 mt-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">فلترة ذكية</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">تقييم آلي</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">مقابلات رقمية</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('مساعد الذكاء الاصطناعي')}
                >
                  <Bot className="w-5 h-5" />
                  مساعد ذكي
                </Button>
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('وظيفة جديدة')}
                >
                  <Plus className="w-5 h-5" />
                  وظيفة جديدة
                </Button>
                {onBack && (
                  <Button 
                    className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                    onClick={onBack}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    رجوع
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">الوظائف المفتوحة</p>
                  <p className="text-3xl font-bold">{jobPostings.filter(j => j.status === 'open').length}</p>
                  <p className="text-white/70 text-xs mt-1">وظيفة متاحة</p>
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
                  <p className="text-white/80 text-sm mb-1">إجمالي المتقدمين</p>
                  <p className="text-3xl font-bold">{jobPostings.reduce((sum, j) => sum + j.applicants, 0)}</p>
                  <p className="text-white/70 text-xs mt-1">متقدم جديد</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">مقابلات مجدولة</p>
                  <p className="text-3xl font-bold">{candidates.filter(c => c.status === 'interview').length}</p>
                  <p className="text-white/70 text-xs mt-1">هذا الأسبوع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">تم التوظيف</p>
                  <p className="text-3xl font-bold">{candidates.filter(c => c.status === 'hired').length}</p>
                  <p className="text-white/70 text-xs mt-1">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">في المراجعة</p>
                  <p className="text-3xl font-bold">{candidates.filter(c => c.status === 'screening').length}</p>
                  <p className="text-white/70 text-xs mt-1">سيرة ذاتية</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">معدل التوظيف</p>
                  <p className="text-3xl font-bold">24%</p>
                  <p className="text-white/70 text-xs mt-1">معدل النجاح</p>
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
                { icon: Briefcase, label: 'الوظائف', color: 'text-blue-600', bg: 'bg-blue-100' },
                { icon: Users, label: 'المرشحين', color: 'text-green-600', bg: 'bg-green-100' },
                { icon: Calendar, label: 'المقابلات', color: 'text-purple-600', bg: 'bg-purple-100' },
                { icon: FileText, label: 'السير الذاتية', color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { icon: Search, label: 'الفلترة', color: 'text-indigo-600', bg: 'bg-indigo-100' },
                { icon: Globe, label: 'النشر', color: 'text-red-600', bg: 'bg-red-100' },
                { icon: Star, label: 'قاعدة البيانات', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                { icon: BarChart3, label: 'التقارير', color: 'text-orange-600', bg: 'bg-orange-100' }
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
                  value="jobs" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">الوظائف</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="candidates" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">المرشحين</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="interviews" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">المقابلات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">التحليلات</span>
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
                        <Briefcase className="w-5 h-5" />
                        إحصائيات التوظيف
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الوظائف المفتوحة</span>
                          <span className="font-bold text-green-600">{jobPostings.filter(j => j.status === 'open').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الوظائف المغلقة</span>
                          <span className="font-bold text-red-600">{jobPostings.filter(j => j.status === 'closed').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">المسودات</span>
                          <span className="font-bold text-gray-600">{jobPostings.filter(j => j.status === 'draft').length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <Users className="w-5 h-5" />
                        أداء التوظيف
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">24%</p>
                          <p className="text-sm text-gray-500">معدل نجاح التوظيف</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط وقت التوظيف:</span>
                          <span className="font-medium">18 يوم</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">الوظائف المتاحة</h3>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة وظيفة جديدة
                  </Button>
                </div>

                <div className="grid gap-4">
                  {jobPostings.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{job.title}</h4>
                            <p className="text-gray-600">{job.department} - {job.location}</p>
                            <div className="flex gap-4 text-sm">
                              <span>الخبرة: {job.experience}</span>
                              <span>الراتب: {job.salary}</span>
                              <span>المتقدمين: {job.applicants}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            {getStatusBadge(job.status)}
                            <Button size="sm" variant="outline">تفاصيل</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Candidates Tab */}
              <TabsContent value="candidates" className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">المرشحين</h3>
                  <div className="flex gap-2">
                    <Input placeholder="البحث في المرشحين..." className="w-64" />
                    <Button variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{candidate.name}</h4>
                            <p className="text-gray-600">{candidate.position}</p>
                            <div className="flex gap-4 text-sm">
                              <span>الخبرة: {candidate.experience}</span>
                              <span>التعليم: {candidate.education}</span>
                              <span>نقاط السيرة الذاتية: {candidate.resumeScore}/100</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            {getStatusBadge(candidate.status)}
                            <Button size="sm" variant="outline">عرض</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Other placeholder tabs */}
              <TabsContent value="interviews" className="p-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">إدارة المقابلات</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">تحليلات التوظيف</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">تقارير التوظيف</h3>
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
