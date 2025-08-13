import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain,
  Users,
  BarChart3,
  Clock,
  Send,
  FileText,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface Assessment {
  id: string;
  name: string;
  type: 'work_sample' | 'birkman' | 'disc' | 'mbti' | 'hogan' | 'competency';
  description: string;
  duration: number; // in minutes
  status: 'available' | 'in_progress' | 'completed';
  completionRate: number;
  participants: number;
  defaultConfig: string;
  features: string[];
}

interface AssessmentResult {
  id: string;
  employeeName: string;
  assessmentType: string;
  completedAt: string;
  score: number;
  status: 'completed' | 'pending' | 'overdue';
  interpretation: string;
}

export const AssessmentSuite: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);

  // ترتيب الاختبارات كما هو مطلوب
  const assessments: Assessment[] = [
    {
      id: 'work_sample',
      name: isRTL ? 'اختبارات الأداء العملي' : 'Work Sample Tests',
      type: 'work_sample',
      description: isRTL ? 'تقييم الأداء من خلال مهام محاكاة عملية حقيقية' : 'Performance assessment through real work task simulation',
      duration: 90,
      status: 'available',
      completionRate: 85,
      participants: 24,
      defaultConfig: isRTL ? 'جودة 40% | سرعة 30% | التزام 30%' : 'Quality 40% | Speed 30% | Compliance 30%',
      features: [
        isRTL ? '3 مهام محاكاة' : '3 simulation tasks',
        isRTL ? 'تقييم الجودة والسرعة' : 'Quality and speed assessment',
        isRTL ? 'معايير محددة مسبقاً' : 'Predefined criteria'
      ]
    },
    {
      id: 'birkman',
      name: isRTL ? 'اختبار بيركمان (Birkman Method)' : 'Birkman Method Assessment',
      type: 'birkman',
      description: isRTL ? 'تحليل شامل للاهتمامات والسلوكيات والاحتياجات مع خطة تطوير 90 يوماً' : 'Comprehensive analysis of interests, behaviors, and needs with 90-day development plan',
      duration: 45,
      status: 'available',
      completionRate: 92,
      participants: 18,
      defaultConfig: isRTL ? 'تفسير آلي وخطة تطوير 90 يوماً' : 'Automatic interpretation and 90-day development plan',
      features: [
        isRTL ? 'تحليل الاهتمامات والسلوكيات' : 'Interests and behaviors analysis',
        isRTL ? 'تحديد نقاط القوة والضغط' : 'Strengths and stress points identification',
        isRTL ? 'خطة تطوير تلقائية 90 يوماً' : 'Automatic 90-day development plan'
      ]
    },
    {
      id: 'disc',
      name: isRTL ? 'اختبار DISC' : 'DISC Assessment',
      type: 'disc',
      description: isRTL ? 'تحليل أنماط السلوك والشخصية مع تقرير أسلوب التواصل' : 'Behavioral and personality pattern analysis with communication style report',
      duration: 20,
      status: 'available',
      completionRate: 78,
      participants: 32,
      defaultConfig: isRTL ? 'أوزان D/I/S/C متوازنة افتراضياً' : 'Balanced D/I/S/C weights by default',
      features: [
        isRTL ? 'تحليل أبعاد D/I/S/C' : 'D/I/S/C dimensions analysis',
        isRTL ? 'تقرير أسلوب التواصل' : 'Communication style report',
        isRTL ? 'توصيات التعاون' : 'Collaboration recommendations'
      ]
    },
    {
      id: 'mbti',
      name: isRTL ? 'اختبار MBTI' : 'MBTI Assessment',
      type: 'mbti',
      description: isRTL ? 'تحليل الشخصية وفقاً لنموذج Myers-Briggs مع 16 نمطاً' : 'Personality analysis according to Myers-Briggs model with 16 types',
      duration: 30,
      status: 'available',
      completionRate: 88,
      participants: 21,
      defaultConfig: isRTL ? '16 نمطاً وتوليد توصيات تعاون' : '16 types and team collaboration recommendations',
      features: [
        isRTL ? '16 نمط شخصية' : '16 personality types',
        isRTL ? 'توصيات تعاون داخل الفريق' : 'Team collaboration recommendations',
        isRTL ? 'تحليل تفضيلات العمل' : 'Work preferences analysis'
      ]
    },
    {
      id: 'hogan',
      name: isRTL ? 'اختبارات هوجان (Hogan)' : 'Hogan Assessments',
      type: 'hogan',
      description: isRTL ? 'تقييم إمكانات القيادة ومخاطر السلوك والقيم' : 'Leadership potential, behavioral risks, and values assessment',
      duration: 60,
      status: 'available',
      completionRate: 94,
      participants: 12,
      defaultConfig: isRTL ? 'مخرجات ملخصة للإدارة' : 'Executive summary outputs',
      features: [
        isRTL ? 'إمكانات القيادة (HPI)' : 'Leadership potential (HPI)',
        isRTL ? 'مخاطر السلوك (HDS)' : 'Behavioral risks (HDS)',
        isRTL ? 'القيم والدوافع (MVPI)' : 'Values and motives (MVPI)'
      ]
    },
    {
      id: 'competency',
      name: isRTL ? 'اختبارات الكفاءة' : 'Competency-based Assessments',
      type: 'competency',
      description: isRTL ? 'مصفوفة كفاءات مخصصة حسب الدور مع 5 مستويات' : 'Role-based competency matrix with 5 levels',
      duration: 40,
      status: 'available',
      completionRate: 76,
      participants: 28,
      defaultConfig: isRTL ? '5-7 كفاءات، 5 مستويات لكل واحدة' : '5-7 competencies, 5 levels each',
      features: [
        isRTL ? 'مصفوفة كفاءات حسب الدور' : 'Role-based competency matrix',
        isRTL ? '5 مستويات لكل كفاءة' : '5 levels per competency',
        isRTL ? 'خرائط نقاط القوة والاحتياجات' : 'Strengths and needs mapping'
      ]
    }
  ];

  const recentResults: AssessmentResult[] = [
    {
      id: '1',
      employeeName: isRTL ? 'أحمد محمد السعيد' : 'Ahmed Mohammed Alsaeed',
      assessmentType: 'DISC',
      completedAt: '2025-01-10',
      score: 85,
      status: 'completed',
      interpretation: isRTL ? 'نمط قيادي مع تفضيل للعمل الجماعي' : 'Leadership style with team collaboration preference'
    },
    {
      id: '2',
      employeeName: isRTL ? 'فاطمة علي النمر' : 'Fatma Ali Alnamir',
      assessmentType: 'Birkman',
      completedAt: '2025-01-08',
      score: 92,
      status: 'completed',
      interpretation: isRTL ? 'اهتمامات تحليلية قوية مع حاجة للاستقرار' : 'Strong analytical interests with stability needs'
    },
    {
      id: '3',
      employeeName: isRTL ? 'سالم أحمد الغامدي' : 'Salem Ahmed Alghamdi',
      assessmentType: 'Work Sample',
      completedAt: '2025-01-05',
      score: 78,
      status: 'completed',
      interpretation: isRTL ? 'أداء تقني جيد مع إمكانية للتحسن' : 'Good technical performance with improvement potential'
    }
  ];

  const handleCreateInvitation = (assessmentId: string) => {
    console.log('Creating invitation for:', assessmentId);
  };

  const handleImportResults = () => {
    console.log('Importing external results...');
  };

  const handleGenerateReport = (type: 'individual' | 'team') => {
    console.log('Generating report:', type);
  };

  const handleViewResult = (resultId: string) => {
    console.log('Viewing result:', resultId);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { color: 'bg-green-500', icon: CheckCircle, label: isRTL ? 'متاح' : 'Available' },
      in_progress: { color: 'bg-blue-500', icon: Clock, label: isRTL ? 'قيد التنفيذ' : 'In Progress' },
      completed: { color: 'bg-gray-500', icon: CheckCircle, label: isRTL ? 'مكتمل' : 'Completed' },
      pending: { color: 'bg-yellow-500', icon: AlertCircle, label: isRTL ? 'معلق' : 'Pending' },
      overdue: { color: 'bg-red-500', icon: AlertCircle, label: isRTL ? 'متأخر' : 'Overdue' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`text-white ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            {isRTL ? 'حزمة الاختبارات والمقاييس' : 'Assessment Suite'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'اختبارات شاملة لقياس القدرات والأداء مع قيم افتراضية جاهزة للتشغيل' : 'Comprehensive tests for measuring capabilities and performance with ready-to-use default values'}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="assessments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assessments">{isRTL ? 'الاختبارات' : 'Assessments'}</TabsTrigger>
          <TabsTrigger value="results">{isRTL ? 'النتائج' : 'Results'}</TabsTrigger>
          <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Reports'}</TabsTrigger>
        </TabsList>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid gap-6">
            {assessments.map((assessment, index) => (
              <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs font-medium">
                          {index + 1}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground">{assessment.name}</h3>
                        {getStatusBadge(assessment.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{assessment.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {assessment.duration} {isRTL ? 'دقيقة' : 'minutes'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {assessment.participants} {isRTL ? 'مشارك' : 'participants'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {assessment.completionRate}% {isRTL ? 'معدل الإكمال' : 'completion rate'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {isRTL ? 'الإعداد الافتراضي:' : 'Default configuration:'}
                        </p>
                        <p className="text-sm font-medium">{assessment.defaultConfig}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {isRTL ? 'الميزات:' : 'Features:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {assessment.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {isRTL ? 'معدل الإكمال' : 'Completion Rate'}
                          </span>
                          <span className="text-sm font-medium">{assessment.completionRate}%</span>
                        </div>
                        <Progress value={assessment.completionRate} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCreateInvitation(assessment.id)}
                        className="gap-1"
                      >
                        <Send className="w-3 h-3" />
                        {isRTL ? 'دعوة' : 'Invite'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedAssessment(assessment.id)}
                        className="gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        {isRTL ? 'إنشاء' : 'Create'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={handleImportResults} variant="outline" className="gap-2 h-12">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'استيراد نتائج خارجية' : 'Import External Results'}
                </Button>
                <Button onClick={() => handleGenerateReport('individual')} variant="outline" className="gap-2 h-12">
                  <FileText className="w-4 h-4" />
                  {isRTL ? 'تقرير فردي' : 'Individual Report'}
                </Button>
                <Button onClick={() => handleGenerateReport('team')} variant="outline" className="gap-2 h-12">
                  <Users className="w-4 h-4" />
                  {isRTL ? 'تقرير فِرَقي' : 'Team Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'النتائج الحديثة' : 'Recent Results'}</CardTitle>
              <CardDescription>
                {isRTL ? 'آخر نتائج الاختبارات المكتملة' : 'Latest completed assessment results'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-foreground">{result.employeeName}</h4>
                            <Badge variant="outline">{result.assessmentType}</Badge>
                            {getStatusBadge(result.status)}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">{result.interpretation}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(result.completedAt).toLocaleDateString(isRTL ? 'ar' : 'en')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {result.score}/100
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewResult(result.id)}
                            className="gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            {isRTL ? 'عرض' : 'View'}
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="w-3 h-3" />
                            {isRTL ? 'تحميل' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</CardTitle>
              <CardDescription>
                {isRTL ? 'تقارير تحليلية شاملة لنتائج الاختبارات' : 'Comprehensive analytical reports for assessment results'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{isRTL ? 'تقرير فجوات الكفاءات' : 'Competency Gaps Report'}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'تحليل الفجوات في الكفاءات حسب الإدارة' : 'Analysis of competency gaps by department'}
                  </p>
                  <Button size="sm" className="w-full">
                    {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{isRTL ? 'تقرير أداء الفريق' : 'Team Performance Report'}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'تحليل أداء الفريق وتوصيات التطوير' : 'Team performance analysis and development recommendations'}
                  </p>
                  <Button size="sm" className="w-full">
                    {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{isRTL ? 'مصفوفة 9-Box' : '9-Box Matrix'}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'الإمكانات مقابل الأداء' : 'Potential vs Performance analysis'}
                  </p>
                  <Button size="sm" className="w-full">
                    {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
                  </Button>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{isRTL ? 'خريطة حرارة الإدارات' : 'Department Heat Map'}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? 'تصور الأداء عبر الإدارات المختلفة' : 'Performance visualization across departments'}
                  </p>
                  <Button size="sm" className="w-full">
                    {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};