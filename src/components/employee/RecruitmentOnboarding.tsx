import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  UserPlus,
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Star,
  MessageSquare,
  Send,
  Award,
  Target,
  BookOpen
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'paused' | 'closed';
  postedDate: string;
  applicationsCount: number;
  interviewsScheduled: number;
  offersExtended: number;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  rating: number;
  experience: string;
  education: string;
  notes: string;
  documents: string[];
}

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: 'documentation' | 'training' | 'orientation' | 'setup';
}

const RecruitmentOnboarding: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock job postings
  const [jobPostings] = useState<JobPosting[]>([
    {
      id: 'JOB001',
      title: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      type: 'full-time',
      status: 'active',
      postedDate: '2024-03-15',
      applicationsCount: 45,
      interviewsScheduled: 8,
      offersExtended: 2,
      description: 'نبحث عن مطور برمجيات أول للانضمام لفريق التطوير',
      requirements: ['خبرة 5+ سنوات', 'React/Node.js', 'قواعد البيانات'],
      salary: { min: 15000, max: 20000, currency: 'SAR' }
    },
    {
      id: 'JOB002',
      title: 'محاسب أول',
      department: 'المالية',
      location: 'جدة', 
      type: 'full-time',
      status: 'active',
      postedDate: '2024-03-10',
      applicationsCount: 32,
      interviewsScheduled: 6,
      offersExtended: 1,
      description: 'محاسب أول للإشراف على العمليات المالية',
      requirements: ['بكالوريوس محاسبة', 'خبرة 3+ سنوات', 'CPA مفضل'],
      salary: { min: 12000, max: 16000, currency: 'SAR' }
    }
  ]);

  // Mock applicants
  const [applicants] = useState<Applicant[]>([
    {
      id: 'APP001',
      name: 'أحمد محمد الأحمد',
      email: 'ahmed@email.com',
      phone: '+966501234567',
      position: 'مطور برمجيات أول',
      status: 'interview',
      appliedDate: '2024-03-18',
      rating: 4.5,
      experience: '6 سنوات',
      education: 'بكالوريوس علوم الحاسب',
      notes: 'مرشح ممتاز مع خبرة قوية',
      documents: ['CV.pdf', 'Portfolio.pdf']
    },
    {
      id: 'APP002',
      name: 'فاطمة سعد الزهراني',
      email: 'fatima@email.com',
      phone: '+966502345678',
      position: 'محاسب أول',
      status: 'offer',
      appliedDate: '2024-03-16',
      rating: 4.8,
      experience: '4 سنوات',
      education: 'بكالوريوس محاسبة',
      notes: 'خبرة ممتازة في الأنظمة المالية',
      documents: ['CV.pdf', 'Certificates.pdf']
    }
  ]);

  // Mock onboarding tasks
  const [onboardingTasks] = useState<OnboardingTask[]>([
    {
      id: 'OB001',
      title: 'توقيع عقد العمل',
      description: 'مراجعة وتوقيع عقد العمل الرسمي',
      assignedTo: 'الموارد البشرية',
      dueDate: '2024-04-01',
      status: 'completed',
      priority: 'high',
      category: 'documentation'
    },
    {
      id: 'OB002',
      title: 'إعداد الحسابات التقنية',
      description: 'إنشاء حسابات البريد الإلكتروني والأنظمة',
      assignedTo: 'تقنية المعلومات',
      dueDate: '2024-04-02',
      status: 'in-progress',
      priority: 'high',
      category: 'setup'
    },
    {
      id: 'OB003',
      title: 'دورة الأمن والسلامة',
      description: 'حضور دورة تدريبية إلزامية في الأمن والسلامة',
      assignedTo: 'الأمن والسلامة',
      dueDate: '2024-04-05',
      status: 'pending',
      priority: 'medium',
      category: 'training'
    }
  ]);

  const getStatusBadge = (status: string, type: 'job' | 'applicant' | 'task' = 'job') => {
    const configs = {
      job: {
        'active': { color: 'bg-green-100 text-green-800', text: 'نشطة' },
        'paused': { color: 'bg-yellow-100 text-yellow-800', text: 'متوقفة' },
        'closed': { color: 'bg-gray-100 text-gray-800', text: 'مغلقة' }
      },
      applicant: {
        'applied': { color: 'bg-blue-100 text-blue-800', text: 'تقدم' },
        'screening': { color: 'bg-purple-100 text-purple-800', text: 'فحص أولي' },
        'interview': { color: 'bg-orange-100 text-orange-800', text: 'مقابلة' },
        'offer': { color: 'bg-green-100 text-green-800', text: 'عرض عمل' },
        'hired': { color: 'bg-emerald-100 text-emerald-800', text: 'تم التوظيف' },
        'rejected': { color: 'bg-red-100 text-red-800', text: 'مرفوض' }
      },
      task: {
        'pending': { color: 'bg-gray-100 text-gray-800', text: 'في الانتظار' },
        'in-progress': { color: 'bg-blue-100 text-blue-800', text: 'قيد التنفيذ' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' }
      }
    };

    const config = configs[type][status as keyof typeof configs[typeof type]] || { color: 'bg-gray-100 text-gray-800', text: 'غير محدد' };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800', 
      'high': 'bg-red-100 text-red-800'
    };
    const labels = { 'low': 'منخفض', 'medium': 'متوسط', 'high': 'عالي' };
    
    return <Badge className={colors[priority as keyof typeof colors]}>{labels[priority as keyof typeof labels]}</Badge>;
  };

  const calculateStats = () => {
    return {
      totalJobs: jobPostings.length,
      activeJobs: jobPostings.filter(j => j.status === 'active').length,
      totalApplicants: applicants.length,
      interviewScheduled: applicants.filter(a => a.status === 'interview').length,
      offersExtended: applicants.filter(a => a.status === 'offer').length,
      hired: applicants.filter(a => a.status === 'hired').length
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <UserPlus className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام التوظيف والإعداد</h1>
            <p className="text-muted-foreground">إدارة شاملة لعمليات التوظيف وإعداد الموظفين الجدد</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                <Briefcase className="h-4 w-4 ml-2" />
                وظيفة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-[#009F87]">إضافة وظيفة جديدة</DialogTitle>
                <DialogDescription>أدخل تفاصيل الوظيفة الجديدة</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>عنوان الوظيفة</Label>
                    <Input placeholder="مثال: مطور برمجيات" />
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">تقنية المعلومات</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>وصف الوظيفة</Label>
                  <Textarea placeholder="اكتب وصف مفصل للوظيفة..." />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>الراتب الأدنى</Label>
                    <Input type="number" placeholder="15000" />
                  </div>
                  <div>
                    <Label>الراتب الأعلى</Label>
                    <Input type="number" placeholder="20000" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    نشر الوظيفة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.totalJobs}</div>
            <div className="text-sm text-muted-foreground">إجمالي الوظائف</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.activeJobs}</div>
            <div className="text-sm text-muted-foreground">وظائف نشطة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalApplicants}</div>
            <div className="text-sm text-muted-foreground">المتقدمين</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.interviewScheduled}</div>
            <div className="text-sm text-muted-foreground">مقابلات مجدولة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.offersExtended}</div>
            <div className="text-sm text-muted-foreground">عروض عمل</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-emerald-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <UserPlus className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{stats.hired}</div>
            <div className="text-sm text-muted-foreground">تم توظيفهم</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex space-x-1 bg-white/70 backdrop-blur rounded-lg p-1">
          {[
            { id: 'jobs', label: 'الوظائف المنشورة', icon: Briefcase },
            { id: 'applicants', label: 'المتقدمين', icon: Users },
            { id: 'interviews', label: 'المقابلات', icon: Calendar },
            { id: 'onboarding', label: 'الإعداد', icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#009F87] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'jobs' && (
        <div className="relative space-y-4">
          {jobPostings.map((job, index) => (
            <Card 
              key={job.id} 
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#009F87]">{job.title}</h3>
                      {getStatusBadge(job.status, 'job')}
                      <Badge variant="outline">{job.department}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        نُشرت: {job.postedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.applicationsCount} متقدم
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">الراتب:</span>
                        <Badge variant="outline">
                          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Edit className="h-4 w-4 ml-2" />
                      تحرير
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Users className="h-4 w-4 ml-2" />
                      المتقدمين ({job.applicationsCount})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'applicants' && (
        <div className="relative space-y-4">
          {applicants.map((applicant, index) => (
            <Card 
              key={applicant.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#009F87]">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{applicant.name}</h3>
                        {getStatusBadge(applicant.status, 'applicant')}
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(applicant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">({applicant.rating})</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {applicant.position}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {applicant.phone}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span><strong>الخبرة:</strong> {applicant.experience}</span>
                          <span><strong>التعليم:</strong> {applicant.education}</span>
                        </div>
                      </div>
                      {applicant.notes && (
                        <div className="mt-3 p-2 bg-[#009F87]/5 rounded-lg">
                          <p className="text-sm">{applicant.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض الملف
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Calendar className="h-4 w-4 ml-2" />
                      جدولة مقابلة
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      إرسال رسالة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'onboarding' && (
        <div className="relative space-y-4">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <BookOpen className="h-6 w-6" />
                مهام الإعداد للموظفين الجدد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingTasks.map((task, index) => (
                  <Card 
                    key={task.id}
                    className="hover:shadow-md transition-all animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{task.title}</h3>
                            {getStatusBadge(task.status, 'task')}
                            {getPriorityBadge(task.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span><strong>المسؤول:</strong> {task.assignedTo}</span>
                            <span><strong>الموعد النهائي:</strong> {task.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 ml-2" />
                            تحديث الحالة
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecruitmentOnboarding;