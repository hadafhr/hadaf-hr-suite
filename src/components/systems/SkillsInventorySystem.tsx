import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Settings, 
  Briefcase, 
  Users,
  TrendingUp,
  Award,
  Target,
  Brain,
  FileBarChart,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Star,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Zap,
  Globe,
  Lightbulb,
  GraduationCap,
  Shield
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SkillsInventorySystemProps {
  onBack?: () => void;
}

export const SkillsInventorySystem: React.FC<SkillsInventorySystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const [isAddSkillOpen, setIsAddSkillOpen] = React.useState(false);

  // Mock data for employees and their skills
  const employees = [
    {
      id: 1,
      name: 'أحمد محمد',
      department: 'تطوير البرمجيات',
      position: 'مطور أول',
      avatar: '/lovable-uploads/98104f4d-712b-4381-98d5-35d5fa928839.png',
      skills: [
        { name: 'React.js', category: 'تقنية', level: 'خبير', progress: 95, certified: true },
        { name: 'إدارة الفريق', category: 'سلوكية', level: 'متقدم', progress: 85, certified: false },
        { name: 'تحليل البيانات', category: 'عملية', level: 'متوسط', progress: 65, certified: true }
      ],
      overallScore: 85,
      lastAssessment: '2024-01-15'
    },
    {
      id: 2,
      name: 'فاطمة عبدالله',
      department: 'الموارد البشرية',
      position: 'أخصائية موارد بشرية',
      avatar: '/lovable-uploads/59f4e8c7-2404-4004-b19f-3ba486f5f42c.png',
      skills: [
        { name: 'التوظيف والاستقطاب', category: 'عملية', level: 'خبير', progress: 90, certified: true },
        { name: 'التواصل الفعال', category: 'سلوكية', level: 'متقدم', progress: 88, certified: false },
        { name: 'تقييم الأداء', category: 'عملية', level: 'متقدم', progress: 82, certified: true }
      ],
      overallScore: 87,
      lastAssessment: '2024-01-10'
    }
  ];

  const skillCategories = ['تقنية', 'عملية', 'سلوكية'];
  const skillLevels = ['مبتدئ', 'متوسط', 'متقدم', 'خبير'];

  // Statistics for dashboard
  const stats = {
    totalEmployees: 150,
    totalSkills: 245,
    avgSkillLevel: 78,
    criticalGaps: 12,
    certifiedSkills: 89,
    upcomingAssessments: 23
  };

  const handleAddSkill = () => {
    toast({
      title: "تمت إضافة المهارة بنجاح",
      description: "سيتم إرسالها للمراجعة والموافقة"
    });
    setIsAddSkillOpen(false);
  };

  const handleApproveSkill = (skillName: string) => {
    toast({
      title: "تم اعتماد المهارة",
      description: `تم اعتماد مهارة ${skillName} بنجاح`
    });
  };

  const handleScheduleTraining = (employeeName: string) => {
    toast({
      title: "تم جدولة التدريب",
      description: `تم إنشاء خطة تدريب مخصصة للموظف ${employeeName}`
    });
  };

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: "تم إنشاء التقرير",
      description: `جاري تحضير تقرير ${reportType}`
    });
  };

  const getSkillLevelColor = (level: string) => {
    const colors = {
      'مبتدئ': 'bg-red-500',
      'متوسط': 'bg-yellow-500',
      'متقدم': 'bg-blue-500',
      'خبير': 'bg-green-500'
    };
    return colors[level] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-[#009F87]/10 border-[#009F87]/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-[#009F87]" />
              مخزون المهارات الذكي
            </h1>
            <p className="text-gray-600 mt-1">نظام إدارة وتتبع مهارات الموظفين بالذكاء الاصطناعي</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => handleGenerateReport('التقرير الشامل')}
          >
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg p-4">
          <TabsList className="grid w-full grid-cols-6 gap-2 bg-transparent h-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="skills-database" className="flex items-center gap-2 py-3">
              <Briefcase className="h-4 w-4" />
              قاعدة المهارات
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-2 py-3">
              <Target className="h-4 w-4" />
              التقييمات
            </TabsTrigger>
            <TabsTrigger value="ai-analysis" className="flex items-center gap-2 py-3">
              <Brain className="h-4 w-4" />
              التحليل الذكي
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2 py-3">
              <GraduationCap className="h-4 w-4" />
              التدريب
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 py-3">
              <FileBarChart className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
                <Users className="h-4 w-4 text-[#009F87]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">مسجل في النظام</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">المهارات المسجلة</CardTitle>
                <Award className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSkills}</div>
                <p className="text-xs text-muted-foreground">مهارة مختلفة</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">متوسط مستوى المهارات</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgSkillLevel}%</div>
                <Progress value={stats.avgSkillLevel} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Critical Gaps and Upcoming Assessments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  الفجوات الحرجة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">الذكاء الاصطناعي</div>
                      <div className="text-sm text-muted-foreground">قسم تطوير البرمجيات</div>
                    </div>
                    <Badge variant="destructive">حرج</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">إدارة المشاريع المتقدمة</div>
                      <div className="text-sm text-muted-foreground">الإدارة التنفيذية</div>
                    </div>
                    <Badge variant="destructive">حرج</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  التقييمات القادمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">تقييم ربع سنوي</div>
                      <div className="text-sm text-muted-foreground">15 فبراير 2024</div>
                    </div>
                    <Badge>قريباً</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">تقييم 360 درجة</div>
                      <div className="text-sm text-muted-foreground">20 فبراير 2024</div>
                    </div>
                    <Badge>قريباً</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Database Tab */}
        <TabsContent value="skills-database">
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="البحث عن موظف أو مهارة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="it">تطوير البرمجيات</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Employee Skills List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {employees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.position}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                      <Badge className="bg-[#009F87]/10 text-[#009F87]">
                        {employee.overallScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {employee.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                              {skill.certified && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                            <div className="text-sm text-muted-foreground">{skill.category}</div>
                          </div>
                          <div className="text-center">
                            <Badge className={`${getSkillLevelColor(skill.level)} text-white`}>
                              {skill.level}
                            </Badge>
                            <div className="text-xs mt-1">{skill.progress}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Plus className="h-4 w-4 mr-1" />
                            إضافة مهارة
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>إضافة مهارة جديدة</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <Input placeholder="اسم المهارة" />
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="فئة المهارة" />
                              </SelectTrigger>
                              <SelectContent>
                                {skillCategories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="مستوى الإتقان" />
                              </SelectTrigger>
                              <SelectContent>
                                {skillLevels.map(level => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button onClick={handleAddSkill} className="w-full">
                              إضافة المهارة
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleScheduleTraining(employee.name)}
                      >
                        <GraduationCap className="h-4 w-4 mr-1" />
                        خطة تدريب
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  التقييم الذاتي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  يقوم الموظف بتقييم مهاراته بنفسه
                </p>
                <Button className="w-full">إنشاء تقييم ذاتي</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  تقييم 360 درجة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  تقييم شامل من المدير والزملاء والمرؤوسين
                </p>
                <Button className="w-full">بدء تقييم 360</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  تقييم المدير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  تقييم المدير المباشر لمهارات الموظف
                </p>
                <Button className="w-full">تقييم الفريق</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Assessments */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>التقييمات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          آخر تقييم: {employee.lastAssessment}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{employee.overallScore}%</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproveSkill(`نتائج ${employee.name}`)}
                      >
                        اعتماد النتائج
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Analysis Tab */}
        <TabsContent value="ai-analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  تحليل فجوات المهارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700 font-medium">
                      <AlertTriangle className="h-4 w-4" />
                      فجوة حرجة: الذكاء الاصطناعي
                    </div>
                    <p className="text-sm text-red-600 mt-1">
                      70% من قسم التطوير يحتاج تدريب على AI/ML
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-700 font-medium">
                      <Clock className="h-4 w-4" />
                      فجوة متوسطة: إدارة المشاريع
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">
                      45% من المدراء يحتاج تطوير مهارات إدارية
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  توليد توصيات ذكية
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  مطابقة المهارات مع الوظائف
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">منصب: مدير تقني أول</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      أفضل المرشحين الداخليين:
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>أحمد محمد</span>
                        <Badge className="bg-green-100 text-green-700">مطابقة 92%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>سارا المطيري</span>
                        <Badge className="bg-blue-100 text-blue-700">مطابقة 87%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Users className="h-4 w-4 mr-2" />
                  عرض جميع المرشحين
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  البرامج التدريبية المقترحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">دورة الذكاء الاصطناعي للمطورين</div>
                    <div className="text-sm text-muted-foreground">مدة: 40 ساعة</div>
                    <div className="text-sm text-muted-foreground">المتدربون: 15 موظف</div>
                    <Badge className="mt-2">أولوية عالية</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">مهارات القيادة الحديثة</div>
                    <div className="text-sm text-muted-foreground">مدة: 24 ساعة</div>
                    <div className="text-sm text-muted-foreground">المتدربون: 8 مدراء</div>
                    <Badge variant="secondary" className="mt-2">أولوية متوسطة</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  جدولة التدريب
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  متابعة التقدم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">React Advanced Patterns</div>
                    <div className="text-sm text-muted-foreground">أحمد محمد</div>
                    <Progress value={75} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">75% مكتمل</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium">Leadership Excellence</div>
                    <div className="text-sm text-muted-foreground">فاطمة عبدالله</div>
                    <Progress value={45} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">45% مكتمل</div>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  تقرير ROI التدريب
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleGenerateReport('توزيع المهارات')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  توزيع المهارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  خريطة بصرية لتوزيع المهارات في المؤسسة
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleGenerateReport('الموظفون المتميزون')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  الموظفون المتميزون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  الموظفون الأعلى مهارة في كل مجال
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleGenerateReport('جاهزية المؤسسة')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  جاهزية المؤسسة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  تقييم الجاهزية للمشاريع والتوسعات الجديدة
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-[#009F87]">{stats.certifiedSkills}</div>
                  <div className="text-sm text-muted-foreground">مهارة معتمدة</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">{stats.criticalGaps}</div>
                  <div className="text-sm text-muted-foreground">فجوة حرجة</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{stats.upcomingAssessments}</div>
                  <div className="text-sm text-muted-foreground">تقييم قادم</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">{stats.avgSkillLevel}%</div>
                  <div className="text-sm text-muted-foreground">متوسط الكفاءة</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};