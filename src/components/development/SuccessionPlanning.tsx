import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Crown,
  Shield,
  Zap,
  BarChart3,
  Calendar,
  Brain,
  Star,
  Search,
  Filter,
  Download,
  Eye,
  UserPlus
} from 'lucide-react';

export const SuccessionPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('critical-positions');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock data
  const stats = {
    criticalPositions: 18,
    identifiedSuccessors: 42,
    readyNow: 12,
    readySoon: 18,
    developing: 12,
    coverageRate: 78
  };

  const criticalPositions = [
    {
      id: 1,
      title: 'المدير التنفيذي',
      department: 'الإدارة العليا',
      incumbent: 'عبدالله أحمد',
      retirementDate: '2026-12-31',
      riskLevel: 'high',
      successors: [
        { name: 'محمد سالم', readiness: 85, timeline: 'جاهز الآن' },
        { name: 'فاطمة علي', readiness: 72, timeline: '6-12 شهر' }
      ],
      developmentPlan: true
    },
    {
      id: 2,
      title: 'مدير التكنولوجيا',
      department: 'التكنولوجيا',
      incumbent: 'خالد محمد',
      retirementDate: '2027-06-30',
      riskLevel: 'medium',
      successors: [
        { name: 'سارة أحمد', readiness: 78, timeline: '6-12 شهر' },
        { name: 'أحمد عبدالله', readiness: 65, timeline: '1-2 سنة' }
      ],
      developmentPlan: true
    },
    {
      id: 3,
      title: 'مدير الموارد البشرية',
      department: 'الموارد البشرية',
      incumbent: 'نورة سالم',
      retirementDate: '2025-12-31',
      riskLevel: 'high',
      successors: [
        { name: 'ريم خالد', readiness: 92, timeline: 'جاهز الآن' }
      ],
      developmentPlan: true
    },
    {
      id: 4,
      title: 'مدير العمليات',
      department: 'العمليات',
      incumbent: 'سعد محمد',
      retirementDate: '2028-03-31',
      riskLevel: 'low',
      successors: [],
      developmentPlan: false
    }
  ];

  const talentPool = [
    {
      name: 'محمد سالم',
      currentRole: 'مدير إقليمي',
      potential: 'عالي',
      performance: 95,
      readiness: 85,
      developmentAreas: ['القيادة الاستراتيجية', 'إدارة التغيير'],
      targetPositions: ['المدير التنفيذي', 'نائب الرئيس التنفيذي']
    },
    {
      name: 'سارة أحمد',
      currentRole: 'مدير تقني أول',
      potential: 'عالي',
      performance: 92,
      readiness: 78,
      developmentAreas: ['الإدارة المالية', 'الذكاء الاصطناعي'],
      targetPositions: ['مدير التكنولوجيا', 'رئيس الابتكار']
    },
    {
      name: 'ريم خالد',
      currentRole: 'مدير موارد بشرية أول',
      potential: 'عالي',
      performance: 94,
      readiness: 92,
      developmentAreas: ['التخطيط الاستراتيجي'],
      targetPositions: ['مدير الموارد البشرية']
    }
  ];

  const developmentPrograms = [
    {
      id: 1,
      name: 'برنامج القيادة التنفيذية',
      participants: 8,
      duration: '12 شهر',
      completion: 65,
      focus: ['القيادة الاستراتيجية', 'إدارة التغيير', 'الذكاء العاطفي']
    },
    {
      id: 2,
      name: 'برنامج تطوير المدراء',
      participants: 15,
      duration: '9 أشهر',
      completion: 42,
      focus: ['إدارة الفرق', 'اتخاذ القرار', 'التخطيط المالي']
    },
    {
      id: 3,
      name: 'برنامج القادة الناشئين',
      participants: 22,
      duration: '6 أشهر',
      completion: 78,
      focus: ['مهارات القيادة', 'التواصل', 'حل المشكلات']
    }
  ];

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">عالي</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">متوسط</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">منخفض</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getReadinessColor = (readiness: number) => {
    if (readiness >= 80) return 'text-green-600';
    if (readiness >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReadinessLabel = (readiness: number) => {
    if (readiness >= 80) return 'جاهز الآن';
    if (readiness >= 60) return '6-12 شهر';
    return '1-2 سنة';
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">تخطيط التعاقب الوظيفي</h1>
        <p className="text-muted-foreground">التخطيط الاستراتيجي لاستمرارية القيادة والأدوار الحرجة</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المناصب الحرجة</p>
                <p className="text-2xl font-bold">{stats.criticalPositions}</p>
                <p className="text-xs text-muted-foreground mt-1">معدل التغطية {stats.coverageRate}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الخلفاء المحددون</p>
                <p className="text-2xl font-bold">{stats.identifiedSuccessors}</p>
                <p className="text-xs text-green-600 mt-1">{stats.readyNow} جاهز الآن</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيد التطوير</p>
                <p className="text-2xl font-bold">{stats.developing}</p>
                <p className="text-xs text-muted-foreground mt-1">{stats.readySoon} قريب من الجاهزية</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-900 mb-1">تنبيه مخاطر</h4>
              <p className="text-sm text-red-700">
                4 مناصب حرجة بمستوى مخاطر عالي تحتاج إلى خطط تعاقب عاجلة. 
                2 منها بدون خلفاء محددين.
              </p>
              <Button size="sm" variant="outline" className="mt-2 border-red-300 text-red-700 hover:bg-red-100">
                عرض التفاصيل
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="critical-positions">المناصب الحرجة</TabsTrigger>
          <TabsTrigger value="talent-pool">مجمع المواهب</TabsTrigger>
          <TabsTrigger value="development">برامج التطوير</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* Critical Positions Tab */}
        <TabsContent value="critical-positions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>المناصب الحرجة وخطط التعاقب</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في المناصب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المناصب</SelectItem>
                      <SelectItem value="high">مخاطر عالية</SelectItem>
                      <SelectItem value="medium">مخاطر متوسطة</SelectItem>
                      <SelectItem value="low">مخاطر منخفضة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalPositions.map((position) => (
                  <Card key={position.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-5 h-5 text-yellow-600" />
                            <h4 className="font-medium text-lg">{position.title}</h4>
                            {getRiskBadge(position.riskLevel)}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <span>القسم: {position.department}</span>
                            <span>الشاغل: {position.incumbent}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              التقاعد: {new Date(position.retirementDate).toLocaleDateString('ar-SA')}
                            </span>
                            <span>الخلفاء: {position.successors.length}</span>
                          </div>
                        </div>
                        {position.developmentPlan ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 ml-1" />
                            خطة متوفرة
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            <AlertTriangle className="w-3 h-3 ml-1" />
                            بحاجة لخطة
                          </Badge>
                        )}
                      </div>

                      {position.successors.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          <p className="text-sm font-medium">الخلفاء المحتملون:</p>
                          {position.successors.map((successor, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium">{successor.name}</span>
                                </div>
                                <Badge className={`
                                  ${successor.readiness >= 80 ? 'bg-green-100 text-green-800' : 
                                    successor.readiness >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'}
                                `}>
                                  {successor.timeline}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>مستوى الجاهزية</span>
                                  <span className={`font-medium ${getReadinessColor(successor.readiness)}`}>
                                    {successor.readiness}%
                                  </span>
                                </div>
                                <Progress value={successor.readiness} className="h-1.5" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                          <div className="flex items-center gap-2 text-yellow-800">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="text-sm font-medium">لا يوجد خلفاء محددون لهذا المنصب</span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserPlus className="w-4 h-4 ml-1" />
                          إضافة خليفة
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="w-4 h-4 ml-1" />
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

        {/* Talent Pool Tab */}
        <TabsContent value="talent-pool" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>مجمع المواهب القيادية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {talentPool.map((talent, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-lg flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            {talent.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{talent.currentRole}</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          إمكانات {talent.potential}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">الأداء</p>
                          <div className="flex items-center gap-2">
                            <Progress value={talent.performance} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{talent.performance}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">الجاهزية</p>
                          <div className="flex items-center gap-2">
                            <Progress value={talent.readiness} className="h-2 flex-1" />
                            <span className={`text-sm font-medium ${getReadinessColor(talent.readiness)}`}>
                              {talent.readiness}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-2">المناصب المستهدفة:</p>
                        <div className="flex flex-wrap gap-1">
                          {talent.targetPositions.map((pos, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {pos}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-2">مجالات التطوير:</p>
                        <div className="flex flex-wrap gap-1">
                          {talent.developmentAreas.map((area, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          عرض الملف الكامل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Brain className="w-4 h-4 ml-1" />
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

        {/* Development Programs Tab */}
        <TabsContent value="development" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>برامج تطوير القيادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developmentPrograms.map((program) => (
                  <Card key={program.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-lg">{program.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{program.participants} مشارك</span>
                            <span>•</span>
                            <span>{program.duration}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{program.completion}% مكتمل</Badge>
                      </div>

                      <div className="mb-3">
                        <Progress value={program.completion} className="h-2" />
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-2">مجالات التركيز:</p>
                        <div className="flex flex-wrap gap-1">
                          {program.focus.map((area, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" className="w-full">
                        عرض تفاصيل البرنامج
                      </Button>
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
                  معدلات التغطية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>مناصب مغطاة بالكامل</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>خلفاء جاهزون الآن</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>قيد التطوير</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  المؤشرات الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">معدل نجاح التعاقب</span>
                    <span className="text-lg font-bold">89%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">متوسط وقت الجاهزية</span>
                    <span className="text-lg font-bold">8 أشهر</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">معدل الاحتفاظ بالخلفاء</span>
                    <span className="text-lg font-bold">92%</span>
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