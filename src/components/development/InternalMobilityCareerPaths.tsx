import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users,
  Target,
  Award,
  MapPin,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Star,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Zap,
  Calendar
} from 'lucide-react';

export const InternalMobilityCareerPaths: React.FC = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalOpportunities: 28,
    activeApplications: 15,
    successfulMoves: 42,
    careerPaths: 12,
    readinessScore: 78,
    engagedEmployees: 156
  };

  const internalOpportunities = [
    {
      id: 1,
      title: 'مدير مشروع أول',
      department: 'التكنولوجيا',
      location: 'الرياض',
      type: 'ترقية',
      level: 'متقدم',
      openDate: '2024-01-15',
      applications: 8,
      matchScore: 85,
      requiredSkills: ['إدارة المشاريع', 'القيادة', 'التواصل'],
      status: 'open'
    },
    {
      id: 2,
      title: 'أخصائي موارد بشرية',
      department: 'الموارد البشرية',
      location: 'جدة',
      type: 'نقل أفقي',
      level: 'متوسط',
      openDate: '2024-01-20',
      applications: 12,
      matchScore: 72,
      requiredSkills: ['التوظيف', 'التطوير', 'العلاقات'],
      status: 'open'
    },
    {
      id: 3,
      title: 'محلل بيانات متقدم',
      department: 'التحليلات',
      location: 'الرياض',
      type: 'ترقية',
      level: 'متقدم',
      openDate: '2024-01-18',
      applications: 5,
      matchScore: 91,
      requiredSkills: ['تحليل البيانات', 'Python', 'SQL'],
      status: 'open'
    }
  ];

  const careerPaths = [
    {
      id: 1,
      title: 'مسار القيادة التنفيذية',
      currentRole: 'مدير قسم',
      targetRole: 'مدير عام',
      steps: 4,
      timeframe: '3-5 سنوات',
      completedSteps: 2,
      requiredCompetencies: ['القيادة الاستراتيجية', 'إدارة التغيير', 'التخطيط المالي'],
      nextMilestone: 'اكتساب خبرة في الإدارة التنفيذية'
    },
    {
      id: 2,
      title: 'مسار التخصص التقني',
      currentRole: 'مطور برمجيات',
      targetRole: 'معماري نظم',
      steps: 3,
      timeframe: '2-3 سنوات',
      completedSteps: 1,
      requiredCompetencies: ['هندسة البرمجيات', 'Cloud Architecture', 'DevOps'],
      nextMilestone: 'الحصول على شهادة AWS Architect'
    },
    {
      id: 3,
      title: 'مسار إدارة المنتجات',
      currentRole: 'محلل منتجات',
      targetRole: 'مدير منتجات رئيسي',
      steps: 3,
      timeframe: '2-4 سنوات',
      completedSteps: 1,
      requiredCompetencies: ['استراتيجية المنتج', 'UX/UI', 'تحليل السوق'],
      nextMilestone: 'قيادة إطلاق منتج جديد'
    }
  ];

  const employeeReadiness = [
    {
      employeeName: 'أحمد محمد',
      currentRole: 'مطور برمجيات',
      targetRole: 'مطور رئيسي',
      readiness: 85,
      strengths: ['المهارات التقنية', 'العمل الجماعي'],
      gaps: ['القيادة'],
      timeToReady: '3 أشهر'
    },
    {
      employeeName: 'فاطمة علي',
      currentRole: 'أخصائي موارد بشرية',
      targetRole: 'مدير موارد بشرية',
      readiness: 68,
      strengths: ['التوظيف', 'التدريب'],
      gaps: ['الإدارة الاستراتيجية', 'الميزانية'],
      timeToReady: '6 أشهر'
    },
    {
      employeeName: 'خالد سالم',
      currentRole: 'محلل بيانات',
      targetRole: 'محلل بيانات متقدم',
      readiness: 92,
      strengths: ['Python', 'SQL', 'التحليل'],
      gaps: ['Machine Learning'],
      timeToReady: '1 شهر'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-800">متاح</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">مغلق</Badge>;
      case 'filled':
        return <Badge className="bg-blue-100 text-blue-800">تم الملء</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'ترقية':
        return <Badge className="bg-purple-100 text-purple-800">{type}</Badge>;
      case 'نقل أفقي':
        return <Badge className="bg-blue-100 text-blue-800">{type}</Badge>;
      case 'نقل جغرافي':
        return <Badge className="bg-orange-100 text-orange-800">{type}</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            التنقل الداخلي والمسارات الوظيفية
          </h2>
          <p className="text-muted-foreground mt-1">
            تمكين الموظفين من النمو والتطور داخل المؤسسة
          </p>
        </div>
        <Button>
          <Briefcase className="w-4 h-4 ml-2" />
          نشر فرصة داخلية
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الفرص المتاحة</p>
                <p className="text-2xl font-bold">{stats.totalOpportunities}</p>
                <p className="text-xs text-green-600 mt-1">+5 هذا الشهر</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الانتقالات الناجحة</p>
                <p className="text-2xl font-bold">{stats.successfulMoves}</p>
                <p className="text-xs text-muted-foreground mt-1">في آخر 12 شهر</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المسارات النشطة</p>
                <p className="text-2xl font-bold">{stats.careerPaths}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.engagedEmployees} موظف مشارك</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">الفرص الداخلية</TabsTrigger>
          <TabsTrigger value="paths">المسارات الوظيفية</TabsTrigger>
          <TabsTrigger value="readiness">جاهزية الموظفين</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>الفرص الداخلية المتاحة</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في الفرص..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internalOpportunities.map((opp) => (
                  <Card key={opp.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-lg">{opp.title}</h4>
                            {getTypeBadge(opp.type)}
                            {getStatusBadge(opp.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {opp.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {opp.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(opp.openDate).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className={`text-2xl font-bold ${getMatchColor(opp.matchScore)}`}>
                            {opp.matchScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">نسبة التوافق</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">المهارات المطلوبة:</p>
                          <div className="flex flex-wrap gap-1">
                            {opp.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">المستوى: {opp.level}</p>
                          <p className="text-xs text-muted-foreground">عدد المتقدمين: {opp.applications}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 ml-1" />
                          التقديم
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Paths Tab */}
        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المسارات الوظيفية المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerPaths.map((path) => (
                  <Card key={path.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-lg mb-1">{path.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{path.currentRole}</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="font-medium text-foreground">{path.targetRole}</span>
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          {path.timeframe}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">التقدم في المسار</span>
                          <span className="font-medium">{path.completedSteps} من {path.steps} خطوات</span>
                        </div>
                        <Progress value={(path.completedSteps / path.steps) * 100} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">الكفاءات المطلوبة:</p>
                          <div className="flex flex-wrap gap-1">
                            {path.requiredCompetencies.map((comp, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {comp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-blue-900">المرحلة القادمة:</p>
                              <p className="text-xs text-blue-700">{path.nextMilestone}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          عرض خارطة المسار
                        </Button>
                        <Button size="sm" variant="outline">
                          <GraduationCap className="w-4 h-4 ml-1" />
                          خطة التطوير
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Readiness Tab */}
        <TabsContent value="readiness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>جاهزية الموظفين للانتقال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeReadiness.map((employee, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{employee.employeeName}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{employee.currentRole}</span>
                            <ArrowRight className="w-4 h-4" />
                            <span className="font-medium text-foreground">{employee.targetRole}</span>
                          </div>
                        </div>
                        <Badge className={`
                          ${employee.readiness >= 80 ? 'bg-green-100 text-green-800' : 
                            employee.readiness >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {employee.readiness}% جاهز
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <Progress value={employee.readiness} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          الوقت المتوقع للجاهزية: {employee.timeToReady}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">نقاط القوة:</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.strengths.map((strength, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 ml-1" />
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">الفجوات:</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.gaps.map((gap, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                <AlertCircle className="w-3 h-3 ml-1" />
                                {gap}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          عرض خطة التطوير
                        </Button>
                        <Button size="sm" variant="outline">
                          <GraduationCap className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  معدلات النجاح
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>معدل نجاح الترقيات</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>معدل نجاح النقل الأفقي</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>رضا الموظفين بعد الانتقال</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  الإحصائيات العامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">متوسط وقت الانتقال</span>
                    <span className="text-lg font-bold">3.5 شهر</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">معدل الاحتفاظ بعد الانتقال</span>
                    <span className="text-lg font-bold">94%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">تحسن الأداء بعد الانتقال</span>
                    <span className="text-lg font-bold">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};