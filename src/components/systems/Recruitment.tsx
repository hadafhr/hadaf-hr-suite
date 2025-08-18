import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Briefcase, Search, Plus, Calendar, FileText } from 'lucide-react';

interface RecruitmentProps {
  onBack: () => void;
}

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

export const Recruitment: React.FC<RecruitmentProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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
      appliedDate: '2024-01-16',
      resumeScore: 85
    },
    {
      id: '2',
      name: 'فاطمة عبد الرحمن',
      email: 'fatima.ar@email.com',
      phone: '+966507654321',
      position: 'محاسب أول',
      experience: '3 سنوات',
      education: 'بكالوريوس محاسبة',
      status: 'screening',
      appliedDate: '2024-01-22',
      resumeScore: 78
    },
    {
      id: '3',
      name: 'محمد سعد الغامدي',
      email: 'mohamed.saad@email.com',
      phone: '+966501122334',
      position: 'مصمم جرافيك',
      experience: '2 سنة',
      education: 'دبلوم التصميم الجرافيكي',
      status: 'offer',
      appliedDate: '2024-01-12',
      resumeScore: 92
    }
  ];

  const getEmploymentTypeBadge = (type: string) => {
    const typeConfig = {
      full_time: { text: isRTL ? 'دوام كامل' : 'Full Time', className: 'bg-green-100 text-green-800' },
      part_time: { text: isRTL ? 'دوام جزئي' : 'Part Time', className: 'bg-blue-100 text-blue-800' },
      contract: { text: isRTL ? 'عقد' : 'Contract', className: 'bg-orange-100 text-orange-800' },
      internship: { text: isRTL ? 'تدريب' : 'Internship', className: 'bg-purple-100 text-purple-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getJobStatusBadge = (status: string) => {
    const statusConfig = {
      open: { text: isRTL ? 'مفتوح' : 'Open', className: 'bg-green-100 text-green-800' },
      closed: { text: isRTL ? 'مغلق' : 'Closed', className: 'bg-red-100 text-red-800' },
      draft: { text: isRTL ? 'مسودة' : 'Draft', className: 'bg-gray-100 text-gray-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getCandidateStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { text: isRTL ? 'تم التقديم' : 'Applied', className: 'bg-blue-100 text-blue-800' },
      screening: { text: isRTL ? 'فحص أولي' : 'Screening', className: 'bg-yellow-100 text-yellow-800' },
      interview: { text: isRTL ? 'مقابلة' : 'Interview', className: 'bg-purple-100 text-purple-800' },
      offer: { text: isRTL ? 'عرض عمل' : 'Job Offer', className: 'bg-orange-100 text-orange-800' },
      hired: { text: isRTL ? 'تم التوظيف' : 'Hired', className: 'bg-green-100 text-green-800' },
      rejected: { text: isRTL ? 'مرفوض' : 'Rejected', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || job.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'التوظيف والتعيين' : 'Recruitment & Hiring'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة عمليات التوظيف والمرشحين والوظائف' : 'Manage recruitment processes, candidates and job postings'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'وظيفة جديدة' : 'New Job Posting'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الوظائف المفتوحة' : 'Open Positions'}
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي المرشحين' : 'Total Candidates'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">127</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'المقابلات هذا الأسبوع' : 'Interviews This Week'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'عروض العمل' : 'Job Offers'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">{isRTL ? 'الوظائف' : 'Job Postings'}</TabsTrigger>
            <TabsTrigger value="candidates">{isRTL ? 'المرشحين' : 'Candidates'}</TabsTrigger>
            <TabsTrigger value="interviews">{isRTL ? 'المقابلات' : 'Interviews'}</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الوظائف...' : 'Search job postings...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Job Postings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const employmentTypeBadge = getEmploymentTypeBadge(job.employmentType);
                const statusBadge = getJobStatusBadge(job.status);
                
                return (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{job.englishTitle}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={employmentTypeBadge.className}>
                            {employmentTypeBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'القسم:' : 'Department:'}</span>
                            <span className="font-medium">{job.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'الموقع:' : 'Location:'}</span>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'الخبرة:' : 'Experience:'}</span>
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'الراتب:' : 'Salary:'}</span>
                            <span className="font-medium text-green-600">{job.salary}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{isRTL ? 'المتقدمين:' : 'Applicants:'}</span>
                            <span className="font-bold text-primary">{job.applicants}</span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'نُشر في:' : 'Posted:'} {job.postedDate}</span>
                          <span className="text-muted-foreground">{isRTL ? 'ينتهي:' : 'Deadline:'} {job.deadline}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <div className="space-y-6">
              {candidates.map((candidate) => {
                const statusBadge = getCandidateStatusBadge(candidate.status);
                
                return (
                  <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="text-lg font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.email} • {candidate.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{isRTL ? 'نتيجة السيرة' : 'Resume Score'}</p>
                            <p className={`text-2xl font-bold ${getScoreColor(candidate.resumeScore)}`}>
                              {candidate.resumeScore}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                        <div>
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {isRTL ? 'المنصب المطلوب' : 'Applied Position'}
                          </h4>
                          <p className="font-medium">{candidate.position}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {isRTL ? 'سنوات الخبرة' : 'Experience'}
                          </h4>
                          <p>{candidate.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {isRTL ? 'المؤهل العلمي' : 'Education'}
                          </h4>
                          <p>{candidate.education}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-muted-foreground mb-1">
                            {isRTL ? 'تاريخ التقديم' : 'Applied Date'}
                          </h4>
                          <p>{candidate.appliedDate}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض السيرة' : 'View Resume'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'جدولة مقابلة' : 'Schedule Interview'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تحديث الحالة' : 'Update Status'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'جدولة المقابلات' : 'Interview Scheduling'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'إدارة وجدولة المقابلات مع المرشحين' : 'Manage and schedule interviews with candidates'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};