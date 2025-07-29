import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Bot, Calendar, CheckCircle, Clock, Download, Edit, Eye, FileText, Gift, HandHeart, Heart, MessageSquare, Plus, Search, Send, Shield, Target, TrendingUp, Users, AlertCircle, BarChart3, BookOpen, Building, Coins, DollarSign, Globe, Lightbulb, Mail, PieChart, Star, Zap } from 'lucide-react';

// النماذج والبيانات
const governancePolicies = [
  { id: 1, name: "سياسة تعارض المصالح", status: "مكتملة", lastUpdate: "2024-01-15", compliance: 95 },
  { id: 2, name: "سياسة الخصوصية", status: "مراجعة", lastUpdate: "2024-01-10", compliance: 85 },
  { id: 3, name: "سياسة السلوك الوظيفي", status: "مكتملة", lastUpdate: "2024-01-20", compliance: 90 },
  { id: 4, name: "سياسة الإدارة المالية", status: "تحديث مطلوب", lastUpdate: "2023-12-15", compliance: 70 }
];

const sustainabilityMetrics = [
  { title: "التمويل التشغيلي", value: "75%", trend: "+5%", color: "text-green-600" },
  { title: "التنويع المالي", value: "4 مصادر", trend: "+1", color: "text-blue-600" },
  { title: "الاستدامة المؤسسية", value: "82%", trend: "+3%", color: "text-purple-600" },
  { title: "الكفاءة التشغيلية", value: "88%", trend: "+7%", color: "text-orange-600" }
];

const capacityPrograms = [
  { id: 1, title: "تدريب الإدارة المالية", participants: 15, completion: 85, category: "مالية" },
  { id: 2, title: "مهارات القيادة", participants: 12, completion: 75, category: "قيادة" },
  { id: 3, title: "إدارة المتطوعين", participants: 20, completion: 90, category: "متطوعين" },
  { id: 4, title: "التسويق الرقمي", participants: 8, completion: 60, category: "تسويق" }
];

const complianceReports = [
  { id: 1, title: "تقرير الامتثال الربعي", type: "ربعي", status: "مكتمل", dueDate: "2024-03-31" },
  { id: 2, title: "التقرير السنوي", type: "سنوي", status: "قيد الإعداد", dueDate: "2024-12-31" },
  { id: 3, title: "تقرير الحوكمة", type: "نصف سنوي", status: "مطلوب", dueDate: "2024-06-30" },
  { id: 4, title: "تقرير الأثر الاجتماعي", type: "سنوي", status: "مكتمل", dueDate: "2024-12-31" }
];

const aiInsights = [
  {
    id: 1,
    type: "تحذير",
    title: "انخفاض معدل التطوع",
    message: "لوحظ انخفاض 15% في أنشطة التطوع خلال الشهر الماضي",
    priority: "عالية",
    icon: AlertTriangle,
    color: "text-red-600"
  },
  {
    id: 2,
    type: "توصية",
    title: "فرصة تمويل جديدة",
    message: "تم رصد برنامج تمويل حكومي يتماشى مع أنشطتكم",
    priority: "متوسطة",
    icon: Lightbulb,
    color: "text-yellow-600"
  },
  {
    id: 3,
    type: "تنبيه",
    title: "موعد تجديد الترخيص",
    message: "ترخيص النشاط ينتهي خلال 30 يوماً",
    priority: "عالية",
    icon: Clock,
    color: "text-orange-600"
  }
];

const nonprofitStats = [
  { title: "البرامج النشطة", value: "25", icon: Target, color: "text-green-600", trend: "+3" },
  { title: "المستفيدين", value: "1,250", icon: Users, color: "text-blue-600", trend: "+150" },
  { title: "المتطوعين النشطين", value: "450", icon: HandHeart, color: "text-purple-600", trend: "+25" },
  { title: "التبرعات الشهرية", value: "2.8M ريال", icon: Gift, color: "text-orange-600", trend: "+12%" }
];

const programs = [
  {
    id: 1,
    name: "برنامج كفالة الأيتام",
    description: "برنامج شامل لكفالة ورعاية الأيتام وتوفير احتياجاتهم الأساسية والتعليمية",
    beneficiaries: 150,
    budget: 500000,
    spent: 350000,
    status: "نشط",
    category: "رعاية اجتماعية",
    startDate: "2023-06-01",
    impact: "عالي",
    completion: 70
  },
  {
    id: 2,
    name: "مبادرة التعليم للجميع",
    description: "توفير فرص التعليم النوعي للأطفال المحتاجين",
    beneficiaries: 200,
    budget: 750000,
    spent: 550000,
    status: "نشط",
    category: "تعليم",
    startDate: "2023-09-01",
    impact: "عالي",
    completion: 85
  },
  {
    id: 3,
    name: "برنامج الدعم الصحي",
    description: "تقديم الرعاية الصحية الأساسية للأسر المحتاجة",
    beneficiaries: 300,
    budget: 400000,
    spent: 200000,
    status: "نشط",
    category: "صحة",
    startDate: "2024-01-01",
    impact: "متوسط",
    completion: 50
  }
];

const volunteers = [
  {
    id: 1,
    name: "سارة أحمد المطيري",
    skills: ["تعليم", "ترجمة", "إدارة"],
    hoursContributed: 120,
    programs: 3,
    status: "نشط",
    rating: 4.8,
    joinDate: "2023-05-01",
    email: "sara.motairi@email.com",
    phone: "+966501234567"
  },
  {
    id: 2,
    name: "محمد علي الغامدي",
    skills: ["طب", "إسعافات أولية", "تدريب"],
    hoursContributed: 85,
    programs: 2,
    status: "نشط",
    rating: 4.9,
    joinDate: "2023-07-15",
    email: "mohammed.ghamdi@email.com",
    phone: "+966502345678"
  },
  {
    id: 3,
    name: "فاطمة خالد العتيبي",
    skills: ["تصميم", "إدارة", "تسويق"],
    hoursContributed: 95,
    programs: 4,
    status: "نشط",
    rating: 4.7,
    joinDate: "2023-06-10",
    email: "fatimah.otaibi@email.com",
    phone: "+966503456789"
  }
];

const donations = [
  { month: "يناير", amount: 2800000, donors: 450, recurring: 65 },
  { month: "فبراير", amount: 3200000, donors: 520, recurring: 70 },
  { month: "مارس", amount: 2950000, donors: 480, recurring: 68 }
];

export const NonProfitServices: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');

  // AI Assistant Handler
  const handleAiQuestion = () => {
    if (!aiQuestion.trim()) return;
    
    toast({
      title: "مساعد الذكاء الاصطناعي",
      description: `جاري تحليل السؤال: "${aiQuestion}"`,
    });
    
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "إجابة المساعد الذكي",
        description: "تم تحليل البيانات وإعداد الإجابة بناءً على بيانات منظمتكم",
      });
    }, 2000);
    
    setAiQuestion('');
    setIsAiAssistantOpen(false);
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "تقرير جاهز",
      description: `تم إنشاء ${reportType} بنجاح وهو جاهز للتحميل`,
    });
  };

  const handlePolicyUpdate = (policyName: string) => {
    toast({
      title: "تحديث السياسة",
      description: `تم تحديث ${policyName} بنجاح`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Building className="h-8 w-8 mr-3 text-primary" />
            منصة القطاع غير الربحي الذكية
          </h1>
          <p className="text-muted-foreground mt-2">
            تمكين، حوكمة، واستدامة باستخدام الذكاء الاصطناعي
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isAiAssistantOpen} onOpenChange={setIsAiAssistantOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <Bot className="h-4 w-4 mr-2" />
                المساعد الذكي
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  مساعد الذكاء الاصطناعي
                </DialogTitle>
                <DialogDescription>
                  اسأل أي سؤال حول منظمتكم أو القطاع غير الربحي
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="مثال: كم عدد المتطوعين النشطين؟ ما هي التوصيات لتحسين الاستدامة المالية؟"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAiAssistantOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAiQuestion}>
                  <Zap className="h-4 w-4 mr-2" />
                  اسأل المساعد
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            مشروع جديد
          </Button>
        </div>
      </div>

      {/* AI Insights Alerts */}
      <div className="grid gap-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          التنبيهات الذكية
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <insight.icon className={`h-5 w-5 mt-1 ${insight.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge variant={insight.priority === 'عالية' ? 'destructive' : 'secondary'} className="text-xs">
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nonprofitStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.trend}</span> من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="governance">الحوكمة</TabsTrigger>
          <TabsTrigger value="sustainability">الاستدامة</TabsTrigger>
          <TabsTrigger value="capacity">بناء القدرات</TabsTrigger>
          <TabsTrigger value="volunteers">المتطوعين</TabsTrigger>
          <TabsTrigger value="compliance">الامتثال</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Programs Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  نظرة عامة على البرامج
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {programs.slice(0, 3).map((program) => (
                  <div key={program.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{program.name}</span>
                      <Badge variant="outline">{program.completion}%</Badge>
                    </div>
                    <Progress value={program.completion} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{program.beneficiaries} مستفيد</span>
                      <span>{(program.spent / 1000).toFixed(0)}K / {(program.budget / 1000).toFixed(0)}K ريال</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Volunteers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  أفضل المتطوعين
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {volunteers.slice(0, 3).map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{volunteer.name}</p>
                      <p className="text-xs text-muted-foreground">{volunteer.hoursContributed} ساعة</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{volunteer.rating}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Donations Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                تطور التبرعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{donation.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{donation.donors} متبرع</span>
                      <span className="text-sm">{(donation.amount / 1000000).toFixed(1)}M ريال</span>
                      <Progress value={(donation.amount / 4000000) * 100} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                السياسات والحوكمة
              </CardTitle>
              <CardDescription>
                إدارة السياسات ومؤشرات الحوكمة المؤسسية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governancePolicies.map((policy) => (
                  <div key={policy.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{policy.name}</h4>
                        <p className="text-xs text-muted-foreground">آخر تحديث: {policy.lastUpdate}</p>
                      </div>
                      <Badge variant={
                        policy.status === 'مكتملة' ? 'default' : 
                        policy.status === 'مراجعة' ? 'secondary' : 'destructive'
                      }>
                        {policy.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>مستوى الامتثال</span>
                        <span>{policy.compliance}%</span>
                      </div>
                      <Progress value={policy.compliance} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handlePolicyUpdate(policy.name)}>
                        <Edit className="h-3 w-3 mr-1" />
                        تحديث
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sustainability Tab */}
        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sustainabilityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className={`text-xs ${metric.color}`}>{metric.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                خطة الاستدامة المالية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">مصادر التمويل الحالية</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">التبرعات الفردية</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">المنح الحكومية</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">الشراكات المؤسسية</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">التوصيات الذكية</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">زيادة التبرعات الشهرية بنسبة 15%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">تطوير برامج الاستثمار الوقفي</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span className="text-sm">استكشاف شراكات تجارية جديدة</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Capacity Building Tab */}
        <TabsContent value="capacity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                برامج بناء القدرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {capacityPrograms.map((program) => (
                  <div key={program.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{program.title}</h4>
                        <p className="text-sm text-muted-foreground">{program.participants} مشارك</p>
                      </div>
                      <Badge variant="outline">{program.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>معدل الإنجاز</span>
                        <span>{program.completion}%</span>
                      </div>
                      <Progress value={program.completion} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Volunteers Tab */}
        <TabsContent value="volunteers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HandHeart className="h-5 w-5 mr-2" />
                إدارة المتطوعين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteers.map((volunteer) => (
                  <div key={volunteer.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{volunteer.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          انضم في: {volunteer.joinDate}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {volunteer.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">الساعات: </span>
                            <span className="font-medium">{volunteer.hoursContributed}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">البرامج: </span>
                            <span className="font-medium">{volunteer.programs}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{volunteer.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          تواصل
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                التقارير والامتثال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          نوع التقرير: {report.type} | موعد التسليم: {report.dueDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          report.status === 'مكتمل' ? 'default' : 
                          report.status === 'قيد الإعداد' ? 'secondary' : 'destructive'
                        }>
                          {report.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleGenerateReport(report.title)}
                          disabled={report.status === 'قيد الإعداد'}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Government Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                حالة الربط مع المنصات الحكومية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">المركز الوطني للقطاع غير الربحي</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">وزارة الموارد البشرية</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">التأمينات الاجتماعية</span>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">منصة إحسان</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-2">آخر مزامنة</h4>
                    <p className="text-xs text-muted-foreground">
                      تم تحديث البيانات قبل 2 ساعات
                    </p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    مزامنة البيانات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};