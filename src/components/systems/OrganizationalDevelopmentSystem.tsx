import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Building2, 
  TrendingUp, 
  Smile, 
  Trophy, 
  Users, 
  BarChart3,
  Target,
  Shuffle,
  GitBranch,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Star,
  Award,
  Calendar,
  DollarSign,
  Clock,
  Settings,
  FileText,
  Lightbulb,
  Zap,
  Heart,
  ThumbsUp,
  Crown,
  Medal,
  Circle
} from 'lucide-react';
import { SystemHeader } from '@/components/shared/SystemHeader';

interface OrganizationalDevelopmentSystemProps {
  onBack: () => void;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  kpis: string[];
  impact: {
    performance: number;
    cost: number;
    satisfaction: number;
  };
  startDate: string;
  endDate: string;
  budget: number;
  department: string;
}

interface HappinessData {
  department: string;
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  rank: number;
  employees: number;
  lastUpdated: string;
}

interface LeaderboardEntry {
  rank: number;
  department: string;
  score: number;
  improvement: number;
  badge: string;
  employees: number;
}

const OrganizationalDevelopmentSystem: React.FC<OrganizationalDevelopmentSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Mock data for initiatives
  const initiatives: Initiative[] = [
    {
      id: '1',
      title: 'تحديث نظام إدارة الأداء',
      description: 'تطوير وتحديث نظام تقييم الأداء ليصبح أكثر فعالية وشمولية',
      status: 'in-progress',
      progress: 75,
      kpis: ['رضا الموظفين', 'دقة التقييم', 'وقت التنفيذ'],
      impact: { performance: 85, cost: 70, satisfaction: 90 },
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 150000,
      department: 'الموارد البشرية'
    },
    {
      id: '2',
      title: 'إعادة هيكلة قسم التكنولوجيا',
      description: 'إعادة تنظيم الهيكل التنظيمي لقسم تكنولوجيا المعلومات',
      status: 'completed',
      progress: 100,
      kpis: ['الكفاءة التشغيلية', 'سرعة الاستجابة', 'جودة الخدمة'],
      impact: { performance: 95, cost: 80, satisfaction: 85 },
      startDate: '2023-09-01',
      endDate: '2024-02-28',
      budget: 200000,
      department: 'تكنولوجيا المعلومات'
    },
    {
      id: '3',
      title: 'برنامج تطوير المهارات القيادية',
      description: 'تطوير مهارات القيادة للمدراء التنفيذيين والمتوسطين',
      status: 'planning',
      progress: 25,
      kpis: ['مهارات القيادة', 'الأداء الإداري', 'الرضا الوظيفي'],
      impact: { performance: 0, cost: 0, satisfaction: 0 },
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      budget: 300000,
      department: 'التطوير والتدريب'
    }
  ];

  // Mock data for happiness index
  const happinessData: HappinessData[] = [
    {
      department: 'الموارد البشرية',
      currentScore: 4.8,
      previousScore: 4.5,
      trend: 'up',
      rank: 1,
      employees: 25,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'تكنولوجيا المعلومات',
      currentScore: 4.7,
      previousScore: 4.2,
      trend: 'up',
      rank: 2,
      employees: 45,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'المالية',
      currentScore: 4.5,
      previousScore: 4.6,
      trend: 'down',
      rank: 3,
      employees: 30,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'المبيعات',
      currentScore: 4.3,
      previousScore: 4.1,
      trend: 'up',
      rank: 4,
      employees: 60,
      lastUpdated: '2024-03-15'
    },
    {
      department: 'العمليات',
      currentScore: 4.1,
      previousScore: 4.3,
      trend: 'down',
      rank: 5,
      employees: 80,
      lastUpdated: '2024-03-15'
    }
  ];

  // Mock data for leaderboard
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      department: 'الموارد البشرية',
      score: 4.8,
      improvement: 6.7,
      badge: 'مبدع التغيير',
      employees: 25
    },
    {
      rank: 2,
      department: 'تكنولوجيا المعلومات',
      score: 4.7,
      improvement: 11.9,
      badge: 'رائد التطوير',
      employees: 45
    },
    {
      rank: 3,
      department: 'المبيعات',
      score: 4.3,
      improvement: 4.9,
      badge: 'محفز النمو',
      employees: 60
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-hold': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in-progress': return 'قيد التنفيذ';
      case 'planning': return 'قيد التخطيط';
      case 'on-hold': return 'متوقف مؤقتاً';
      default: return status;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'مبدع التغيير': return <Lightbulb className="h-4 w-4" />;
      case 'رائد التطوير': return <Zap className="h-4 w-4" />;
      case 'محفز النمو': return <TrendingUp className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: BarChart3 },
    { id: 'initiatives', label: 'المبادرات', icon: Target },
    { id: 'restructuring', label: 'إعادة الهيكلة', icon: Shuffle },
    { id: 'change-management', label: 'إدارة التغيير', icon: GitBranch },
    { id: 'governance', label: 'الحوكمة', icon: Shield },
    { id: 'maturity', label: 'قياس النضج', icon: CheckCircle2 },
    { id: 'impact', label: 'قياس الأثر', icon: TrendingUp },
    { id: 'happiness', label: 'مؤشر السعادة', icon: Smile },
    { id: 'leaderboard', label: 'لوحة الشرف', icon: Trophy },
    { id: 'integration', label: 'تكامل البوابة', icon: Users }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المبادرات النشطة</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مؤشر السعادة العام</p>
                <p className="text-2xl font-bold">4.5</p>
              </div>
              <Smile className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأثر المالي</p>
                <p className="text-2xl font-bold">+2.3M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            المبادرات الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {initiatives.slice(0, 3).map((initiative) => (
              <div key={initiative.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{initiative.title}</h4>
                  <p className="text-sm text-muted-foreground">{initiative.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(initiative.status)}>
                    {getStatusText(initiative.status)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">{initiative.progress}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${initiative.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Happiness Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="h-5 w-5" />
            نظرة عامة على السعادة الوظيفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {happinessData.slice(0, 3).map((dept) => (
              <div key={dept.department} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{dept.department}</h4>
                  {getTrendIcon(dept.trend)}
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{dept.currentScore}</p>
                  <p className="text-sm text-muted-foreground">من 5.0</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">المركز {dept.rank}</Badge>
                  <span className="text-sm text-muted-foreground">{dept.employees} موظف</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInitiatives = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">مبادرات التطوير</h2>
        <Button>
          <Target className="h-4 w-4 mr-2" />
          إضافة مبادرة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {initiatives.map((initiative) => (
          <Card key={initiative.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{initiative.title}</CardTitle>
                <Badge className={getStatusColor(initiative.status)}>
                  {getStatusText(initiative.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{initiative.description}</p>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">التقدم</span>
                  <span className="text-sm">{initiative.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">الأداء</p>
                  <p className="font-medium text-green-600">{initiative.impact.performance}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">التكلفة</p>
                  <p className="font-medium text-blue-600">{initiative.impact.cost}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">الرضا</p>
                  <p className="font-medium text-yellow-600">{initiative.impact.satisfaction}%</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{initiative.department}</span>
                <span>{new Date(initiative.startDate).toLocaleDateString('ar-SA')}</span>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setSelectedInitiative(initiative)}
              >
                عرض التفاصيل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRestructuring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إعادة الهيكلة الإدارية</h2>
        <Button>
          <Shuffle className="h-4 w-4 mr-2" />
          بدء مشروع إعادة هيكلة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أدوات التصميم التفاعلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                منشئ المخططات التنظيمية
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                محلل الأدوار والمسؤوليات
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                مقارن الهياكل
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Lightbulb className="h-4 w-4 mr-2" />
                توصيات الذكاء الاصطناعي
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مشاريع إعادة الهيكلة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">إعادة هيكلة قسم المبيعات</h4>
                  <Badge className="bg-blue-100 text-blue-800">قيد التنفيذ</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">تحسين الكفاءة وتوزيع المهام</p>
                <div className="flex items-center justify-between text-sm">
                  <span>التقدم: 65%</span>
                  <span>المدة المتبقية: 3 أسابيع</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">دمج أقسام التسويق</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">قيد التخطيط</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">توحيد الجهود التسويقية</p>
                <div className="flex items-center justify-between text-sm">
                  <span>التقدم: 20%</span>
                  <span>البدء المتوقع: الشهر القادم</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderChangeManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة التغيير</h2>
        <Button>
          <GitBranch className="h-4 w-4 mr-2" />
          إنشاء خطة تغيير
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>نموذج ADKAR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">الوعي (Awareness)</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">الرغبة (Desire)</span>
                <span className="text-sm font-medium">70%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '70%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">المعرفة (Knowledge)</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '60%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">القدرة (Ability)</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-orange-500 rounded-full" style={{ width: '45%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">التعزيز (Reinforcement)</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>جاهزية الإدارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">الموارد البشرية</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">جاهز</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">المالية</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">قيد التحضير</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="font-medium">العمليات</span>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">يحتاج تدخل</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>خطة التواصل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                إرسال تحديث شهري
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                جلسة أسئلة وأجوبة
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                ورشة تدريبية
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                مسح رضا الموظفين
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderGovernance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">حوكمة التطوير والتحول</h2>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          إنشاء طلب موافقة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سلسلة الموافقات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">موافقة مدير الموارد البشرية</p>
                  <p className="text-sm text-muted-foreground">تمت في 15 مارس 2024</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">مراجعة اللجنة التنفيذية</p>
                  <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Circle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">موافقة الرئيس التنفيذي</p>
                  <p className="text-sm text-muted-foreground">في الانتظار</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المراجعة المالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">الميزانية المخصصة:</span>
                <span className="text-sm">2,500,000 ريال</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">المصروف حتى الآن:</span>
                <span className="text-sm">1,850,000 ريال</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">المتبقي:</span>
                <span className="text-sm text-green-600">650,000 ريال</span>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '74%' }} />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <AlertTriangle className="h-4 w-4" />
                تنبيه: الميزانية تحتاج مراجعة في المشروع القادم
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMaturity = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">قياس النضج الإداري</h2>
        <Button>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          إجراء تقييم جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>مستوى النضج العام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3.8</div>
              <p className="text-muted-foreground">من 5.0</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">متقدم</Badge>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>القيادة</span>
                <span className="font-medium">4.2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>العمليات</span>
                <span className="font-medium">3.7</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>التكنولوجيا</span>
                <span className="font-medium">4.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>الموارد البشرية</span>
                <span className="font-medium">3.5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مقارنة بين الإدارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {happinessData.slice(0, 4).map((dept, index) => (
                <div key={dept.department} className="flex items-center justify-between">
                  <span className="text-sm">{dept.department}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${(dept.currentScore / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{dept.currentScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التحسن عبر الزمن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-green-600">+12%</div>
              <p className="text-sm text-muted-foreground">تحسن خلال 6 أشهر</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>يناير 2024</span>
                <span>3.4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>فبراير 2024</span>
                <span>3.5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>مارس 2024</span>
                <span>3.8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderImpact = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">لوحة قياس الأثر المؤسسي</h2>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          تقرير الأثر الشامل
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أثر التغييرات على الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">الكفاءة التشغيلية</span>
                  <span className="text-sm text-green-600">+23%</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-red-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">قبل</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 h-2 bg-green-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '88%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">بعد</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">جودة الخدمة</span>
                  <span className="text-sm text-green-600">+18%</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-red-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">قبل</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 h-2 bg-green-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '88%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">بعد</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الأثر المالي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">+2.3M</div>
                <p className="text-sm text-muted-foreground">وفورات إجمالية</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">تحسين العمليات</span>
                  <span className="text-sm font-medium text-green-600">+1.2M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">تقليل الأخطاء</span>
                  <span className="text-sm font-medium text-green-600">+650K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">زيادة الإنتاجية</span>
                  <span className="text-sm font-medium text-green-600">+450K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            توصيات الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">فرصة تحسين العمليات</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    يمكن تحقيق وفورات إضافية بقيمة 300K من خلال أتمتة عمليات الموافقات في قسم المالية
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">توصية لتحسين الرضا</h4>
                  <p className="text-sm text-green-700 mt-1">
                    تطبيق برنامج العمل المرن في قسم تكنولوجيا المعلومات قد يرفع الرضا الوظيفي بنسبة 15%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHappiness = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">مؤشر السعادة الوظيفية</h2>
        <Button>
          <Smile className="h-4 w-4 mr-2" />
          إجراء مسح جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Smile className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">4.5</div>
            <p className="text-sm text-muted-foreground">المتوسط العام</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">+8%</div>
            <p className="text-sm text-muted-foreground">التحسن الشهري</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">240</div>
            <p className="text-sm text-muted-foreground">المشاركون</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">معدل المشاركة</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Happiness Details */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل السعادة حسب الإدارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {happinessData.map((dept) => (
              <div key={dept.department} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{dept.department}</h4>
                    {getTrendIcon(dept.trend)}
                  </div>
                  <Badge variant="outline">المركز {dept.rank}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">النتيجة الحالية</p>
                    <p className="font-bold text-lg">{dept.currentScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">النتيجة السابقة</p>
                    <p className="font-medium">{dept.previousScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">عدد الموظفين</p>
                    <p className="font-medium">{dept.employees}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">آخر تحديث</p>
                    <p className="font-medium">{new Date(dept.lastUpdated).toLocaleDateString('ar-SA')}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${(dept.currentScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">لوحة الشرف - قادة السعادة والتغيير</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            وضع العرض الكامل
          </Button>
          <Button>
            <Award className="h-4 w-4 mr-2" />
            إنشاء شارة جديدة
          </Button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">منصة التتويج</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center gap-8">
            {/* Second Place */}
            <div className="text-center">
              <div className="w-20 h-16 bg-gray-200 rounded-t-lg flex items-center justify-center mb-2">
                <Medal className="h-8 w-8 text-gray-600" />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">#2</div>
                <div className="text-sm font-medium">{leaderboardData[1].department}</div>
                <div className="text-xs text-muted-foreground">{leaderboardData[1].score}/5.0</div>
              </div>
            </div>

            {/* First Place */}
            <div className="text-center">
              <div className="w-24 h-20 bg-yellow-200 rounded-t-lg flex items-center justify-center mb-2">
                <Crown className="h-10 w-10 text-yellow-600" />
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-xl font-bold text-yellow-700">#1</div>
                <div className="text-sm font-medium">{leaderboardData[0].department}</div>
                <div className="text-xs text-muted-foreground">{leaderboardData[0].score}/5.0</div>
                <Badge className="mt-1 bg-yellow-100 text-yellow-800 text-xs">
                  {leaderboardData[0].badge}
                </Badge>
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <div className="w-16 h-12 bg-orange-200 rounded-t-lg flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold">#3</div>
                <div className="text-sm font-medium">{leaderboardData[2].department}</div>
                <div className="text-xs text-muted-foreground">{leaderboardData[2].score}/5.0</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>ترتيب مفصل للإدارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                  {entry.rank}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{entry.department}</h4>
                    <Badge variant="outline" className="text-xs">
                      {getBadgeIcon(entry.badge)}
                      <span className="ml-1">{entry.badge}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{entry.employees} موظف</span>
                    <span>النتيجة: {entry.score}/5.0</span>
                    <span className="text-green-600">تحسن: +{entry.improvement}%</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${(entry.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle>شارات الإنجاز</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="font-medium text-sm">مبدع التغيير</div>
              <div className="text-xs text-muted-foreground">أعلى نتيجة</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-sm">رائد التطوير</div>
              <div className="text-xs text-muted-foreground">أكبر تحسن</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-sm">محفز النمو</div>
              <div className="text-xs text-muted-foreground">نمو مستمر</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-sm">قائد السعادة</div>
              <div className="text-xs text-muted-foreground">أعلى رضا</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegration = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">تكامل بوابة الموظفين</h2>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          تخصيص الواجهة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Portal Preview */}
        <Card>
          <CardHeader>
            <CardTitle>معاينة بوابة الموظف</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">ترتيب إدارتك</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">#2</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  إدارة تكنولوجيا المعلومات
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">مؤشر السعادة</h4>
                  <span className="text-lg font-bold">4.7</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">التحسن هذا الشهر</h4>
                  <span className="text-sm text-green-600">+11.9%</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  أداء ممتاز! استمروا
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الإشعارات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">تحديث الترتيب الأسبوعي</p>
                  <p className="text-xs text-muted-foreground">إشعار عند تغيير ترتيب الإدارة</p>
                </div>
                <Button variant="outline" size="sm">تفعيل</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">إنجازات جديدة</p>
                  <p className="text-xs text-muted-foreground">إشعار عند حصول الإدارة على شارة</p>
                </div>
                <Button variant="outline" size="sm">تفعيل</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">مقارنة شهرية</p>
                  <p className="text-xs text-muted-foreground">تقرير مقارنة مع الإدارات الأخرى</p>
                </div>
                <Button variant="outline" size="sm">تفعيل</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Widget Customization */}
      <Card>
        <CardHeader>
          <CardTitle>تخصيص الواجهات المصغرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">واجهة الترتيب</p>
              <p className="text-xs text-muted-foreground">عرض ترتيب الإدارة</p>
              <Button variant="outline" size="sm" className="mt-2">تخصيص</Button>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Smile className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">واجهة السعادة</p>
              <p className="text-xs text-muted-foreground">مؤشر السعادة الحالي</p>
              <Button variant="outline" size="sm" className="mt-2">تخصيص</Button>
            </div>
            
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium">واجهة التحسن</p>
              <p className="text-xs text-muted-foreground">نسبة التحسن الشهرية</p>
              <Button variant="outline" size="sm" className="mt-2">تخصيص</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'initiatives': return renderInitiatives();
      case 'restructuring': return renderRestructuring();
      case 'change-management': return renderChangeManagement();
      case 'governance': return renderGovernance();
      case 'maturity': return renderMaturity();
      case 'impact': return renderImpact();
      case 'happiness': return renderHappiness();
      case 'leaderboard': return renderLeaderboard();
      case 'integration': return renderIntegration();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SystemHeader
        title="التطوير المؤسسي والتحول التنظيمي"
        description="منصة شاملة لإدارة مبادرات التطوير والتحول مع قياس الأثر ومؤشر السعادة"
        icon={<Building2 className="h-8 w-8" />}
        onBack={onBack}
        showBackButton={true}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 text-xs"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizationalDevelopmentSystem;