import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Users, 
  BriefcaseIcon, 
  Calendar,
  FileText,
  Send,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Bot,
  TrendingUp,
  UserCheck,
  MessageSquare,
  Filter,
  Shield,
  Settings
} from 'lucide-react';
import { AutoMessaging } from '@/components/smartHire/AutoMessaging';
import { InterviewScheduling } from '@/components/smartHire/InterviewScheduling';
import { PermissionManagement } from '@/components/smartHire/PermissionManagement';
import { ApplicationForm } from '@/components/smartHire/ApplicationForm';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'paused' | 'closed';
  applications: number;
  shortlisted: number;
  createdAt: string;
  description: string;
  requirements: string[];
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  score: number;
  status: 'new' | 'screening' | 'interviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  resumeUrl?: string;
  aiAnalysis?: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    recommendation: 'strong' | 'good' | 'fair' | 'weak';
  };
}

const SmartHire: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [newJobDialog, setNewJobDialog] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = React.useState(false);

  // Mock data
  const [jobs, setJobs] = React.useState<Job[]>([
    {
      id: '1',
      title: 'مطور Full Stack',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      type: 'full-time',
      status: 'active',
      applications: 45,
      shortlisted: 8,
      createdAt: '2024-01-15',
      description: 'نبحث عن مطور Full Stack محترف للانضمام إلى فريقنا التقني.',
      requirements: ['React.js', 'Node.js', 'TypeScript', 'خبرة 3+ سنوات']
    },
    {
      id: '2',
      title: 'محاسب أول',
      department: 'المالية',
      location: 'جدة',
      type: 'full-time',
      status: 'active',
      applications: 23,
      shortlisted: 5,
      createdAt: '2024-01-10',
      description: 'مطلوب محاسب خبرة للعمل في قسم المالية.',
      requirements: ['CPA', 'خبرة 5+ سنوات', 'إتقان Excel']
    }
  ]);

  const [applicants, setApplicants] = React.useState<Applicant[]>([
    {
      id: '1',
      name: 'أحمد محمد العتيبي',
      email: 'ahmed.alotaibi@email.com',
      phone: '+966501234567',
      position: 'مطور Full Stack',
      experience: '4 سنوات',
      score: 92,
      status: 'shortlisted',
      appliedAt: '2024-01-20',
      aiAnalysis: {
        skillsMatch: 95,
        experienceMatch: 90,
        educationMatch: 88,
        recommendation: 'strong'
      }
    },
    {
      id: '2',
      name: 'فاطمة سالم القحطاني',
      email: 'fatima.alqahtani@email.com',
      phone: '+966507654321',
      position: 'محاسب أول',
      experience: '6 سنوات',
      score: 88,
      status: 'interviewed',
      appliedAt: '2024-01-18',
      aiAnalysis: {
        skillsMatch: 85,
        experienceMatch: 92,
        educationMatch: 87,
        recommendation: 'strong'
      }
    }
  ]);

  const [jobForm, setJobForm] = React.useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time' as const,
    description: '',
    requirements: ''
  });

  const generateJobDescription = async () => {
    if (!jobForm.title) return;
    
    setIsGeneratingDescription(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedDescription = `نحن نبحث عن ${jobForm.title} متميز للانضمام إلى فريقنا المتنامي في ${jobForm.department || 'الشركة'}. 

المهام الرئيسية:
• تطوير وتنفيذ الحلول التقنية المبتكرة
• التعاون مع الفرق المختلفة لتحقيق أهداف المشروع
• ضمان جودة العمل والالتزام بالمعايير المطلوبة
• المشاركة في التطوير المستمر للعمليات

المؤهلات المطلوبة:
• شهادة جامعية في التخصص ذات الصلة
• خبرة عملية في مجال ${jobForm.title}
• مهارات تواصل وعمل جماعي ممتازة
• إتقان اللغة العربية والإنجليزية

نوفر بيئة عمل محفزة وفرص نمو مهني ممتازة.`;

      setJobForm(prev => ({ ...prev, description: generatedDescription }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleCreateJob = () => {
    const newJob: Job = {
      id: Date.now().toString(),
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      status: 'active',
      applications: 0,
      shortlisted: 0,
      createdAt: new Date().toISOString().split('T')[0],
      description: jobForm.description,
      requirements: jobForm.requirements.split('\n').filter(r => r.trim())
    };

    setJobs(prev => [newJob, ...prev]);
    setNewJobDialog(false);
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      requirements: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'closed': return 'bg-red-500';
      case 'shortlisted': return 'bg-blue-500';
      case 'interviewed': return 'bg-purple-500';
      case 'hired': return 'bg-green-600';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-yellow-600 bg-yellow-50';
      case 'weak': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const statsData = [
    {
      title: 'الوظائف النشطة',
      value: jobs.filter(j => j.status === 'active').length,
      icon: BriefcaseIcon,
      color: 'text-blue-600',
      change: '+2 هذا الأسبوع'
    },
    {
      title: 'إجمالي المتقدمين',
      value: jobs.reduce((sum, job) => sum + job.applications, 0),
      icon: Users,
      color: 'text-green-600',
      change: '+15 اليوم'
    },
    {
      title: 'المرشحين المتقدمين',
      value: applicants.filter(a => a.status === 'shortlisted').length,
      icon: UserCheck,
      color: 'text-purple-600',
      change: '+3 هذا الأسبوع'
    },
    {
      title: 'المقابلات المجدولة',
      value: applicants.filter(a => a.status === 'interviewed').length,
      icon: Calendar,
      color: 'text-orange-600',
      change: '5 هذا الأسبوع'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
                🤖 منصة التوظيف الذكي SmartHire
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                منصة توظيف مؤتمتة مدعومة بالذكاء الاصطناعي
              </p>
            </div>
            <div className="flex gap-3">
              <Dialog open={newJobDialog} onOpenChange={setNewJobDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة وظيفة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إنشاء وظيفة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">المسمى الوظيفي</Label>
                        <Input
                          id="title"
                          value={jobForm.title}
                          onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="مثال: مطور Full Stack"
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">القسم</Label>
                        <Input
                          id="department"
                          value={jobForm.department}
                          onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                          placeholder="مثال: تقنية المعلومات"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">الموقع</Label>
                        <Input
                          id="location"
                          value={jobForm.location}
                          onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="مثال: الرياض"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">نوع الوظيفة</Label>
                        <Select value={jobForm.type} onValueChange={(value: any) => setJobForm(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">دوام كامل</SelectItem>
                            <SelectItem value="part-time">دوام جزئي</SelectItem>
                            <SelectItem value="contract">تعاقد</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="description">الوصف الوظيفي</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateJobDescription}
                          disabled={!jobForm.title || isGeneratingDescription}
                          className="flex items-center gap-2"
                        >
                          <Bot className="w-4 h-4" />
                          {isGeneratingDescription ? 'جاري التوليد...' : 'توليد بالذكاء الاصطناعي'}
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        value={jobForm.description}
                        onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="سيتم توليد الوصف تلقائياً..."
                        rows={8}
                      />
                    </div>

                    <div>
                      <Label htmlFor="requirements">المتطلبات (سطر لكل متطلب)</Label>
                      <Textarea
                        id="requirements"
                        value={jobForm.requirements}
                        onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
                        placeholder="React.js&#10;Node.js&#10;خبرة 3+ سنوات"
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setNewJobDialog(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleCreateJob}>
                        إنشاء الوظيفة
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="jobs">إدارة الوظائف</TabsTrigger>
            <TabsTrigger value="applicants">المتقدمين</TabsTrigger>
            <TabsTrigger value="messaging">التواصل التلقائي</TabsTrigger>
            <TabsTrigger value="interviews">المقابلات</TabsTrigger>
            <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
            <TabsTrigger value="application">نموذج التقديم</TabsTrigger>
            <TabsTrigger value="analytics">التقارير</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Jobs */}
              <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">الوظائف الحديثة</h3>
                  <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{job.department}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(job.status)} text-white`}>
                          {job.status === 'active' ? 'نشط' : job.status === 'paused' ? 'متوقف' : 'مغلق'}
                        </Badge>
                        <span className="text-sm text-slate-600">{job.applications} متقدم</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Candidates */}
              <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">أفضل المرشحين</h3>
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="space-y-3">
                  {applicants.filter(a => a.score >= 85).slice(0, 3).map((applicant) => (
                    <div key={applicant.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{applicant.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getRecommendationColor(applicant.aiAnalysis?.recommendation || 'fair')}`}>
                          {applicant.aiAnalysis?.recommendation === 'strong' ? 'ممتاز' : 
                           applicant.aiAnalysis?.recommendation === 'good' ? 'جيد' :
                           applicant.aiAnalysis?.recommendation === 'fair' ? 'مقبول' : 'ضعيف'}
                        </Badge>
                        <span className="text-sm font-semibold text-green-600">{applicant.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">إدارة الوظائف</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 ml-2" />
                    فلترة
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <Badge className={`${getStatusColor(job.status)} text-white`}>
                            {job.status === 'active' ? 'نشط' : job.status === 'paused' ? 'متوقف' : 'مغلق'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          <span>القسم: {job.department}</span>
                          <span>الموقع: {job.location}</span>
                          <span>النوع: {job.type === 'full-time' ? 'دوام كامل' : job.type === 'part-time' ? 'دوام جزئي' : 'تعاقد'}</span>
                          <span>تاريخ النشر: {job.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.applications} متقدم
                          </span>
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            {job.shortlisted} مرشح
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants" className="space-y-6">
            <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">إدارة المتقدمين</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 ml-2" />
                    فلترة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bot className="w-4 h-4 ml-2" />
                    التحليل الذكي
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{applicant.name}</h4>
                          <Badge className={`${getStatusColor(applicant.status)} text-white`}>
                            {applicant.status === 'shortlisted' ? 'مرشح' : 
                             applicant.status === 'interviewed' ? 'تمت المقابلة' :
                             applicant.status === 'hired' ? 'تم التوظيف' :
                             applicant.status === 'rejected' ? 'مرفوض' : 'جديد'}
                          </Badge>
                          {applicant.aiAnalysis && (
                            <Badge className={`${getRecommendationColor(applicant.aiAnalysis.recommendation)}`}>
                              <Bot className="w-3 h-3 ml-1" />
                              {applicant.aiAnalysis.recommendation === 'strong' ? 'ممتاز' : 
                               applicant.aiAnalysis.recommendation === 'good' ? 'جيد' :
                               applicant.aiAnalysis.recommendation === 'fair' ? 'مقبول' : 'ضعيف'}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                          <span>الوظيفة: {applicant.position}</span>
                          <span>الخبرة: {applicant.experience}</span>
                          <span>البريد: {applicant.email}</span>
                          <span>تاريخ التقديم: {applicant.appliedAt}</span>
                        </div>

                        {applicant.aiAnalysis && (
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div className="text-sm">
                              <span className="text-slate-600 dark:text-slate-400">تطابق المهارات: </span>
                              <span className="font-semibold text-green-600">{applicant.aiAnalysis.skillsMatch}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-slate-600 dark:text-slate-400">تطابق الخبرة: </span>
                              <span className="font-semibold text-blue-600">{applicant.aiAnalysis.experienceMatch}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-slate-600 dark:text-slate-400">النتيجة الإجمالية: </span>
                              <span className="font-semibold text-purple-600">{applicant.score}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">أداء التوظيف</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>معدل التحويل</span>
                    <span className="font-semibold text-green-600">18.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متوسط وقت التوظيف</span>
                    <span className="font-semibold text-blue-600">21 يوم</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>رضا المرشحين</span>
                    <span className="font-semibold text-purple-600">4.7/5</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">أداء الذكاء الاصطناعي</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>دقة التوصيات</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>توفير الوقت</span>
                    <span className="font-semibold text-blue-600">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>تحسن جودة المرشحين</span>
                    <span className="font-semibold text-purple-600">45%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SmartHire;