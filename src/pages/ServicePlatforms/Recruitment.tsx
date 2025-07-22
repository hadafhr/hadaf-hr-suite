import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Plus, 
  Search, 
  Eye, 
  CheckCircle,
  Clock,
  Users,
  FileText,
  Calendar,
  Briefcase
} from 'lucide-react';

const jobPostings = [
  {
    id: 1,
    title: "مطور واجهات أمامية React",
    department: "تقنية المعلومات",
    type: "دوام كامل",
    location: "الرياض",
    applications: 45,
    status: "نشط",
    postedDate: "2024-01-15",
    closingDate: "2024-02-15"
  },
  {
    id: 2,
    title: "محاسب مالي أول",
    department: "المالية",
    type: "دوام كامل",
    location: "جدة",
    applications: 32,
    status: "نشط",
    postedDate: "2024-01-10",
    closingDate: "2024-02-10"
  },
  {
    id: 3,
    title: "مسؤول تسويق رقمي",
    department: "التسويق",
    type: "دوام جزئي",
    location: "الدمام",
    applications: 28,
    status: "مغلق",
    postedDate: "2023-12-20",
    closingDate: "2024-01-20"
  }
];

const candidates = [
  {
    id: 1,
    name: "سارة أحمد المطيري",
    position: "مطورة واجهات أمامية",
    experience: "5 سنوات",
    education: "بكالوريوس علوم حاسب",
    status: "مقبولة",
    appliedFor: "مطور واجهات أمامية React",
    rating: 4.5,
    phone: "+966501234567",
    email: "sara.mutairi@email.com"
  },
  {
    id: 2,
    name: "خالد محمد العتيبي",
    position: "محاسب مالي",
    experience: "3 سنوات",
    education: "بكالوريوس محاسبة",
    status: "قيد المراجعة",
    appliedFor: "محاسب مالي أول",
    rating: 4.2,
    phone: "+966507654321",
    email: "khalid.otaibi@email.com"
  },
  {
    id: 3,
    name: "نورا عبدالله القحطاني",
    position: "أخصائية تسويق",
    experience: "4 سنوات",
    education: "ماجستير إدارة أعمال",
    status: "مرفوضة",
    appliedFor: "مسؤول تسويق رقمي",
    rating: 3.8,
    phone: "+966509876543",
    email: "nora.qahtani@email.com"
  }
];

export const Recruitment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              منصة التوظيف
            </h1>
            <p className="text-muted-foreground">
              أدوات ذكية للبحث عن المواهب وإدارة التوظيف
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            نشر وظيفة جديدة
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الوظائف المنشورة</p>
                <p className="text-2xl font-bold text-primary">23</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المتقدمين</p>
                <p className="text-2xl font-bold text-primary">156</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المقبولين</p>
                <p className="text-2xl font-bold text-success">28</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">قيد المراجعة</p>
                <p className="text-2xl font-bold text-warning">45</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">الوظائف المنشورة</TabsTrigger>
            <TabsTrigger value="candidates">المرشحين</TabsTrigger>
            <TabsTrigger value="pipeline">مسار التوظيف</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="dashboard-card">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في الوظائف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">فلتر</Button>
                  <Button variant="outline">تصدير</Button>
                </div>
              </div>

              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{job.location}</span>
                          <span className="text-xs text-muted-foreground">{job.type}</span>
                          <span className="text-xs text-muted-foreground">{job.applications} متقدم</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={job.status === 'نشط' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          ينتهي: {job.closingDate}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            <Card className="dashboard-card">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في المرشحين..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">فلتر</Button>
                  <Button variant="outline">تصدير</Button>
                </div>
              </div>

              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{candidate.experience}</span>
                          <span className="text-xs text-muted-foreground">{candidate.education}</span>
                          <span className="text-xs text-muted-foreground">تقدم لـ: {candidate.appliedFor}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={
                          candidate.status === 'مقبولة' ? 'default' : 
                          candidate.status === 'قيد المراجعة' ? 'secondary' : 
                          'destructive'
                        }>
                          {candidate.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          التقييم: {candidate.rating}/5
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4 text-center">متقدمين جدد</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">45</p>
                  <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4 text-center">المقابلات الأولية</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-warning">18</p>
                  <p className="text-sm text-muted-foreground">مجدولة</p>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4 text-center">المقابلات النهائية</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-warning">8</p>
                  <p className="text-sm text-muted-foreground">هذا الأسبوع</p>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="font-semibold mb-4 text-center">العروض المرسلة</h3>
                <div className="text-center">
                  <p className="text-3xl font-bold text-success">12</p>
                  <p className="text-sm text-muted-foreground">في الانتظار</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};