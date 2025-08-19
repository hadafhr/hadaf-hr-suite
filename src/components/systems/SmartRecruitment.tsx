import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  ArrowLeft, UserPlus, Search, Filter, Download, Plus, 
  Eye, Edit, CheckCircle2, XCircle, Clock, Star,
  Users, TrendingUp, BarChart3, Calendar, Mail,
  Phone, MapPin, FileText, Award, Brain, Zap,
  MessageSquare, Video, Briefcase, GraduationCap
} from 'lucide-react';
import patternBg from '@/assets/boud-pattern-bg.jpg';
import gradientMesh from '@/assets/boud-gradient-mesh.jpg';
import circlesPattern from '@/assets/boud-circles-pattern.jpg';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'fullTime' | 'partTime' | 'contract' | 'internship';
  level: 'junior' | 'mid' | 'senior' | 'executive';
  requirements: string[];
  description: string;
  salaryRange: {
    min: number;
    max: number;
  };
  postedDate: string;
  deadline: string;
  status: 'active' | 'paused' | 'closed';
  applicantCount: number;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: number;
  education: string;
  skills: string[];
  appliedDate: string;
  status: 'new' | 'screening' | 'interview' | 'assessment' | 'finalReview' | 'hired' | 'rejected';
  score: number;
  interviewDate?: string;
  notes: string;
  resumeUrl?: string;
}

interface RecruitmentProps {
  onBack: () => void;
}

export const SmartRecruitment: React.FC<RecruitmentProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [isCandidateDialogOpen, setIsCandidateDialogOpen] = useState(false);

  // Mock job postings data
  const jobPostings: JobPosting[] = [
    {
      id: 'JOB001',
      title: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      type: 'fullTime',
      level: 'senior',
      requirements: ['React', 'Node.js', 'TypeScript', '5+ سنوات خبرة'],
      description: 'نبحث عن مطور برمجيات متمرس للانضمام لفريق التطوير',
      salaryRange: { min: 12000, max: 18000 },
      postedDate: '2024-03-15',
      deadline: '2024-04-15',
      status: 'active',
      applicantCount: 24
    },
    {
      id: 'JOB002',
      title: 'مدير موارد بشرية',
      department: 'الموارد البشرية',
      location: 'جدة',
      type: 'fullTime',
      level: 'mid',
      requirements: ['SHRM', 'إدارة الأداء', '3+ سنوات خبرة', 'قيادة الفرق'],
      description: 'فرصة مميزة للعمل في بيئة ديناميكية وقيادة فريق الموارد البشرية',
      salaryRange: { min: 10000, max: 15000 },
      postedDate: '2024-03-10',
      deadline: '2024-04-10',
      status: 'active',
      applicantCount: 18
    }
  ];

  // Mock candidates data
  const candidates: Candidate[] = [
    {
      id: 'CAND001',
      name: 'سارة محمد الأحمد',
      email: 'sara.ahmad@email.com',
      phone: '+966501234567',
      position: 'مطور برمجيات أول',
      experience: 6,
      education: 'بكالوريوس علوم الحاسب',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      appliedDate: '2024-03-18',
      status: 'interview',
      score: 92,
      interviewDate: '2024-03-25',
      notes: 'مرشحة ممتازة مع خبرة قوية في التقنيات المطلوبة',
      resumeUrl: '/resumes/sara-ahmad-cv.pdf'
    },
    {
      id: 'CAND002',
      name: 'خالد عبد العزيز النمر',
      email: 'khalid.alnamir@email.com',
      phone: '+966507654321',
      position: 'مدير موارد بشرية',
      experience: 4,
      education: 'ماجستير إدارة أعمال',
      skills: ['SHRM', 'إدارة الأداء', 'القيادة', 'التدريب'],
      appliedDate: '2024-03-12',
      status: 'finalReview',
      score: 88,
      notes: 'خبرة جيدة في القيادة ومهارات تواصل ممتازة',
      resumeUrl: '/resumes/khalid-alnamir-cv.pdf'
    },
    {
      id: 'CAND003',
      name: 'نورا أحمد السالم',
      email: 'nora.alsalem@email.com',
      phone: '+966501122334',
      position: 'مطور برمجيات أول',
      experience: 3,
      education: 'بكالوريوس هندسة برمجيات',
      skills: ['React', 'Python', 'Docker', 'Git'],
      appliedDate: '2024-03-20',
      status: 'screening',
      score: 75,
      notes: 'مرشحة واعدة تحتاج مزيد من الخبرة',
      resumeUrl: '/resumes/nora-alsalem-cv.pdf'
    }
  ];

  const recruitmentStats = {
    activeJobs: 12,
    totalApplications: 156,
    interviewsScheduled: 23,
    hiredThisMonth: 8,
    averageTimeToHire: 18,
    applicationConversionRate: 15.2,
    candidateQualityScore: 84,
    costPerHire: 4500
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { text: 'جديد', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      screening: { text: 'فحص أولي', className: 'bg-warning/20 text-warning border-warning/30' },
      interview: { text: 'مقابلة', className: 'bg-purple-100 text-purple-800 border-purple-200' },
      assessment: { text: 'تقييم', className: 'bg-orange-100 text-orange-800 border-orange-200' },
      finalReview: { text: 'مراجعة أخيرة', className: 'bg-primary/20 text-primary border-primary/30' },
      hired: { text: 'تم التوظيف', className: 'bg-success/20 text-success border-success/30' },
      rejected: { text: 'مرفوض', className: 'bg-destructive/20 text-destructive border-destructive/30' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getJobStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: 'نشط', className: 'bg-success/20 text-success border-success/30' },
      paused: { text: 'متوقف', className: 'bg-warning/20 text-warning border-warning/30' },
      closed: { text: 'مغلق', className: 'bg-destructive/20 text-destructive border-destructive/30' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const handleHireCandidate = (candidateId: string) => {
    toast.success('تم قبول المرشح بنجاح', {
      description: 'تم إرسال عرض العمل للمرشح'
    });
  };

  const handleRejectCandidate = (candidateId: string) => {
    toast.success('تم رفض المرشح', {
      description: 'تم إرسال إشعار الرفض للمرشح'
    });
  };

  const handleScheduleInterview = () => {
    toast.success('تم جدولة المقابلة', {
      description: 'تم إرسال دعوة المقابلة للمرشح'
    });
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${gradientMesh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${circlesPattern})`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative p-6 backdrop-blur-sm">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-white/90 backdrop-blur border-primary/20 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 backdrop-blur rounded-xl border border-primary/30">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">نظام التوظيف الذكي</h1>
                <p className="text-muted-foreground">منصة متطورة لإدارة عمليات التوظيف والمرشحين</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة وظيفة
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-primary">إضافة وظيفة جديدة</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">عنوان الوظيفة</label>
                      <Input placeholder="مثل: مطور برمجيات" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">القسم</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">تقنية المعلومات</SelectItem>
                          <SelectItem value="HR">الموارد البشرية</SelectItem>
                          <SelectItem value="Finance">المالية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">الموقع</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الموقع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">الرياض</SelectItem>
                          <SelectItem value="jeddah">جدة</SelectItem>
                          <SelectItem value="dammam">الدمام</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">نوع الوظيفة</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fullTime">دوام كامل</SelectItem>
                          <SelectItem value="partTime">دوام جزئي</SelectItem>
                          <SelectItem value="contract">عقد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">الحد الأدنى للراتب</label>
                      <Input type="number" placeholder="8000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">الحد الأعلى للراتب</label>
                      <Input type="number" placeholder="15000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">آخر موعد للتقديم</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">مستوى الخبرة</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="junior">مبتدئ</SelectItem>
                          <SelectItem value="mid">متوسط</SelectItem>
                          <SelectItem value="senior">خبير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">وصف الوظيفة</label>
                    <Textarea placeholder="وصف تفصيلي للوظيفة ومسؤولياتها..." rows={4} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">المتطلبات</label>
                    <Textarea placeholder="المهارات والمؤهلات المطلوبة..." rows={3} />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setIsJobDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    نشر الوظيفة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
              <Download className="h-4 w-4 ml-2" />
              تقارير التوظيف
            </Button>
          </div>
        </div>

        {/* Comprehensive Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الوظائف النشطة</p>
                  <p className="text-3xl font-bold text-primary">{recruitmentStats.activeJobs}</p>
                  <p className="text-xs text-muted-foreground">وظيفة متاحة</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur border-success/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الطلبات</p>
                  <p className="text-3xl font-bold text-success">{recruitmentStats.totalApplications}</p>
                  <div className="flex items-center text-xs text-success mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    +12% من الشهر الماضي
                  </div>
                </div>
                <div className="p-3 bg-success/20 rounded-lg">
                  <Users className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المقابلات المجدولة</p>
                  <p className="text-3xl font-bold text-blue-600">{recruitmentStats.interviewsScheduled}</p>
                  <p className="text-xs text-muted-foreground">مقابلة هذا الأسبوع</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">تم التوظيف</p>
                  <p className="text-3xl font-bold text-purple-600">{recruitmentStats.hiredThisMonth}</p>
                  <p className="text-xs text-muted-foreground">موظف هذا الشهر</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs defaultValue="candidates" className="space-y-6">
          <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-primary/20">
            <TabsList className="grid w-full grid-cols-5 bg-primary/10">
              <TabsTrigger value="candidates" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                المرشحين
              </TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                الوظائف المتاحة
              </TabsTrigger>
              <TabsTrigger value="interviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                المقابلات
              </TabsTrigger>
              <TabsTrigger value="pipeline" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                مسار التوظيف
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                التحليلات
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="candidates" className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث عن مرشح..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 backdrop-blur border-primary/20"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/90 backdrop-blur border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المراحل</SelectItem>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="screening">فحص أولي</SelectItem>
                    <SelectItem value="interview">مقابلة</SelectItem>
                    <SelectItem value="finalReview">مراجعة أخيرة</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur border-primary/20">
                  <Filter className="h-4 w-4 ml-2" />
                  تصفية
                </Button>
              </div>
            </div>

            {/* Enhanced Candidates List */}
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => {
                const statusBadge = getStatusBadge(candidate.status);
                
                return (
                  <Card key={candidate.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        {/* Candidate Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.position}</p>
                              <div className="flex items-center gap-2 text-xs text-primary mt-1">
                                <GraduationCap className="h-3 w-3" />
                                {candidate.education}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{candidate.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{candidate.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span>{candidate.experience} سنوات خبرة</span>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground">المهارات</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 4}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            تاريخ التقديم: {candidate.appliedDate}
                          </div>
                        </div>

                        {/* Status & Score */}
                        <div className="text-center space-y-3">
                          <Badge className={statusBadge.className + ' w-full justify-center'}>
                            {statusBadge.text}
                          </Badge>
                          <div className="p-4 bg-primary/10 rounded-lg">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {candidate.score}%
                            </div>
                            <div className="text-xs text-muted-foreground">نتيجة التقييم</div>
                            <div className="flex items-center justify-center mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < Math.floor(candidate.score / 20) ? 'text-warning fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Interview Info */}
                        <div className="space-y-3">
                          {candidate.interviewDate && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">المقابلة القادمة</span>
                              </div>
                              <div className="text-xs text-blue-700">
                                {candidate.interviewDate}
                              </div>
                            </div>
                          )}
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">ملاحظات:</div>
                            <div className="text-xs line-clamp-3">
                              {candidate.notes}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 justify-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedCandidate(candidate)}
                          >
                            <Eye className="h-4 w-4 ml-2" />
                            عرض السيرة
                          </Button>
                          
                          {candidate.status === 'new' && (
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                              <MessageSquare className="h-4 w-4 ml-2" />
                              فحص أولي
                            </Button>
                          )}
                          
                          {candidate.status === 'screening' && (
                            <Button 
                              size="sm" 
                              className="w-full bg-purple-600 hover:bg-purple-700"
                              onClick={handleScheduleInterview}
                            >
                              <Video className="h-4 w-4 ml-2" />
                              جدولة مقابلة
                            </Button>
                          )}
                          
                          {candidate.status === 'finalReview' && (
                            <>
                              <Button 
                                size="sm" 
                                className="w-full bg-success hover:bg-success/90"
                                onClick={() => handleHireCandidate(candidate.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 ml-2" />
                                قبول
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleRejectCandidate(candidate.id)}
                              >
                                <XCircle className="h-4 w-4 ml-2" />
                                رفض
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-4">
              {jobPostings.map((job) => {
                const statusBadge = getJobStatusBadge(job.status);
                
                return (
                  <Card key={job.id} className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-2">
                          <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span>{job.type === 'fullTime' ? 'دوام كامل' : 
                                     job.type === 'partTime' ? 'دوام جزئي' : 'عقد'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">المتطلبات الأساسية</h4>
                          <div className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs block w-fit">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="p-4 bg-success/10 rounded-lg mb-3">
                            <div className="text-2xl font-bold text-success">
                              {job.applicantCount}
                            </div>
                            <div className="text-xs text-muted-foreground">طلب توظيف</div>
                          </div>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="text-center p-3 bg-primary/10 rounded-lg">
                            <div className="text-lg font-bold text-primary">
                              {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()} ر.س
                            </div>
                            <div className="text-xs text-muted-foreground">نطاق الراتب</div>
                          </div>
                          <div className="text-xs text-center text-muted-foreground">
                            آخر موعد: {job.deadline}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 ml-2" />
                              تعديل
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 ml-2" />
                              عرض
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    المقابلات اليوم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">5</div>
                    <p className="text-sm text-muted-foreground">مقابلة مجدولة</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-warning" />
                    في انتظار الجدولة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-warning mb-2">12</div>
                    <p className="text-sm text-muted-foreground">مرشح في الانتظار</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    مقابلات مكتملة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success mb-2">34</div>
                    <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipeline">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>مراحل عملية التوظيف</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">طلبات جديدة</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <Progress value={75} className="w-20 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                      <span className="font-medium">فحص أولي</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-warning">18</div>
                        <Progress value={60} className="w-20 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium">مقابلات</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">12</div>
                        <Progress value={40} className="w-20 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <span className="font-medium">عروض عمل</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">8</div>
                        <Progress value={80} className="w-20 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>معدلات التحويل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">من التقديم إلى المقابلة</span>
                        <span className="text-sm font-bold">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">من المقابلة إلى العرض</span>
                        <span className="text-sm font-bold">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">من العرض إلى القبول</span>
                        <span className="text-sm font-bold">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">15.2%</div>
                        <div className="text-sm text-muted-foreground">معدل التوظيف الإجمالي</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">تقرير الأداء</h3>
                  <div className="text-2xl font-bold text-primary mb-2">{recruitmentStats.averageTimeToHire}</div>
                  <p className="text-sm text-muted-foreground">متوسط أيام التوظيف</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-success/20 rounded-full w-fit mx-auto mb-4">
                    <Award className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">جودة المرشحين</h3>
                  <div className="text-2xl font-bold text-success mb-2">{recruitmentStats.candidateQualityScore}%</div>
                  <p className="text-sm text-muted-foreground">نتيجة الجودة</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">معدل التحويل</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{recruitmentStats.applicationConversionRate}%</div>
                  <p className="text-sm text-muted-foreground">من التقديم للتوظيف</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur border-primary/20 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">تكلفة التوظيف</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-2">{recruitmentStats.costPerHire.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">ريال لكل موظف</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Candidate Detail Dialog */}
        {selectedCandidate && (
          <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
            <DialogContent className="bg-white/95 backdrop-blur max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  ملف المرشح - {selectedCandidate.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">عرض تفصيلي للمرشح</h3>
                  <p className="text-muted-foreground">
                    ملف شامل يتضمن السيرة الذاتية وتقييم الأداء وتاريخ المقابلات
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};