import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Users, TrendingUp, Lightbulb, Plus, Calendar, Award, 
  CheckCircle, Clock, ArrowRight, AlertCircle, FileText, 
  Search, Settings, BookOpen, Workflow, ChevronDown, ChevronUp,
  User, UserCheck, Building2, ClipboardCheck
} from 'lucide-react';

// البيانات الأساسية للنظام وفقاً للممارسات السعودية
const organizationalPhases = [
  {
    id: 1,
    title: "التشخيص والتحليل الأولي",
    description: "تقرير تشخيص أولي لحالة المؤسسة وفقاً لمعايير رؤية 2030",
    status: "مكتمل",
    progress: 100,
    icon: Search,
    example: "مثال: شركة تقنية ناشئة تحتاج لهيكلة إدارية تتماشى مع قوانين الاستثمار الأجنبي",
    steps: [
      { 
        id: 1, 
        title: "تعبئة نموذج التقييم الذاتي (وفقاً لمعايير ساما/هيئة السوق المالية)", 
        completed: true,
        details: "يشمل تقييم الحوكمة، إدارة المخاطر، والامتثال للوائح"
      },
      { 
        id: 2, 
        title: "مقابلات تشخيصية مع الإدارة العليا والموظفين", 
        completed: true,
        details: "مقابلات منظمة تراعي الثقافة المحلية والتنوع في بيئة العمل السعودية"
      },
      { 
        id: 3, 
        title: "تحليل SWOT مع التركيز على فرص رؤية 2030", 
        completed: true,
        details: "تحليل يربط نقاط القوة بأهداف التحول الوطني والاقتصاد الرقمي"
      },
      { 
        id: 4, 
        title: "رفع تقرير تشخيصي متوافق مع المعايير المحلية", 
        completed: true,
        details: "تقرير يتضمن توصيات تتماشى مع نظام العمل السعودي والسعودة"
      }
    ],
    approvals: [
      { role: "مدير الإدارة", status: "موافق", date: "2024-01-15", entity: "الإدارة التنفيذية" },
      { role: "مدير عام الموارد البشرية", status: "موافق", date: "2024-01-16", entity: "قسم الموارد البشرية" },
      { role: "الرئيس التنفيذي", status: "موافق", date: "2024-01-17", entity: "مجلس الإدارة" }
    ],
    regulations: ["نظام العمل السعودي", "لائحة الحوكمة", "معايير رؤية 2030"]
  },
  {
    id: 2,
    title: "تصميم الهيكل والعمليات",
    description: "هيكل تنظيمي محدت + خريطة عمليات متوافقة مع الأنظمة السعودية",
    status: "جاري",
    progress: 75,
    icon: Building2,
    example: "مثال: إعادة هيكلة بنك محلي ليتماشى مع متطلبات ساما الجديدة للبنوك الرقمية",
    steps: [
      { 
        id: 1, 
        title: "تصميم هيكل تنظيمي يراعي متطلبات السعودة (75%)", 
        completed: true,
        details: "هيكل يضمن نسب السعودة المطلوبة ويدعم التطوير المهني للمواطنين"
      },
      { 
        id: 2, 
        title: "تحديد الوحدات الإدارية وفقاً لمعايير الحوكمة المؤسسية", 
        completed: true,
        details: "فصل واضح للمسؤوليات مع لجان المراجعة والمخاطر والامتثال"
      },
      { 
        id: 3, 
        title: "تصميم خريطة العمليات الرقمية (تماشياً مع التحول الرقمي)", 
        completed: true,
        details: "عمليات رقمية تدعم مبادرات الحكومة الإلكترونية والذكاء الاصطناعي"
      },
      { 
        id: 4, 
        title: "مراجعة الأدوار الوظيفية لضمان التوافق مع قانون العمل", 
        completed: false,
        details: "مراجعة شاملة تضمن التوافق مع ساعات العمل والإجازات والحقوق"
      }
    ],
    approvals: [
      { role: "مدير تطوير تنظيمي", status: "موافق", date: "2024-01-20", entity: "إدارة التطوير" },
      { role: "مدير الموارد البشرية", status: "موافق", date: "2024-01-21", entity: "قسم الموارد البشرية" },
      { role: "المستشار القانوني", status: "قيد المراجعة", date: null, entity: "الإدارة القانونية" },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null, entity: "مجلس الإدارة" }
    ],
    regulations: ["نظام الشركات السعودي", "لائحة الحوكمة", "نظام العمل", "أنظمة ساما"]
  },
  {
    id: 3,
    title: "بناء السياسات والإجراءات",
    description: "دليل سياسات وإجراءات متوافق مع الأنظمة واللوائح السعودية",
    status: "قيد الانتظار",
    progress: 0,
    icon: FileText,
    example: "مثال: وضع سياسات لشركة تجارة إلكترونية تتوافق مع أنظمة التجارة الإلكترونية ووزارة التجارة",
    steps: [
      { 
        id: 1, 
        title: "إعداد سياسات الموارد البشرية (متوافقة مع نظام العمل ونطاقات)", 
        completed: false,
        details: "سياسات شاملة للتوظيف، الرواتب، الإجازات، والتأديب وفقاً للنظام السعودي"
      },
      { 
        id: 2, 
        title: "تصميم إجراءات العمل التشغيلية والمالية (وفقاً لمعايير المحاسبة السعودية)", 
        completed: false,
        details: "إجراءات مفصلة تراعي معايير المحاسبة السعودية ومتطلبات الزكاة والضريبة"
      },
      { 
        id: 3, 
        title: "اعتماد السياسات من الجهات المختصة", 
        completed: false,
        details: "مراجعة واعتماد من الجهات الرقابية ذات العلاقة (ساما، CMA، CITC، إلخ)"
      },
      { 
        id: 4, 
        title: "رفع الملفات للمنصة الحكومية (ناجز/قوى/مراس)", 
        completed: false,
        details: "تحديث البيانات في المنصات الحكومية الإلكترونية"
      }
    ],
    approvals: [
      { role: "مدير الجودة والامتثال", status: "انتظار", date: null, entity: "إدارة الجودة" },
      { role: "مدير تطوير تنظيمي", status: "انتظار", date: null, entity: "إدارة التطوير" },
      { role: "المستشار القانوني", status: "انتظار", date: null, entity: "الإدارة القانونية" },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null, entity: "الإدارة العليا" },
      { role: "مجلس الإدارة", status: "انتظار", date: null, entity: "مجلس الإدارة" }
    ],
    regulations: ["نظام العمل", "نظام الشركات", "معايير المحاسبة السعودية", "لوائح الزكاة والضريبة"]
  },
  {
    id: 4,
    title: "إدارة التغيير وتدريب الموظفين",
    description: "خطة إدارة التغيير + خطة تدريبية تراعي الثقافة المحلية",
    status: "قيد الانتظار",
    progress: 0,
    icon: BookOpen,
    example: "مثال: تدريب موظفي بنك على النظام المصرفي المفتوح وفقاً لتوجهات ساما للتقنية المالية",
    steps: [
      { 
        id: 1, 
        title: "إعداد خطة إدارة التغيير (تراعي الثقافة السعودية والتنوع)", 
        completed: false,
        details: "خطة تأخذ في الاعتبار التدرج الثقافي وإشراك المواطنين في القيادة"
      },
      { 
        id: 2, 
        title: "تصميم برامج التوعية باللغة العربية", 
        completed: false,
        details: "مواد تدريبية باللغة العربية تراعي المصطلحات المحلية والسياق الثقافي"
      },
      { 
        id: 3, 
        title: "تنفيذ الورش مع مراعاة أوقات الصلاة والمناسبات الدينية", 
        completed: false,
        details: "جدولة تراعي الأعياد والمناسبات الدينية وأوقات الصلاة"
      },
      { 
        id: 4, 
        title: "قياس الجاهزية وفقاً لمؤشرات الأداء المحلية", 
        completed: false,
        details: "مؤشرات تقيس التطبيق الفعلي والالتزام بالأنظمة المحلية"
      }
    ],
    approvals: [
      { role: "مدير التدريب والتطوير", status: "انتظار", date: null, entity: "إدارة التدريب" },
      { role: "مدير تطوير تنظيمي", status: "انتظار", date: null, entity: "إدارة التطوير" },
      { role: "مدير الموارد البشرية", status: "انتظار", date: null, entity: "الموارد البشرية" },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null, entity: "الإدارة العليا" }
    ],
    regulations: ["نظام العمل", "لوائح التدريب المهني", "معايير المؤسسة العامة للتدريب التقني"]
  },
  {
    id: 5,
    title: "التفعيل والمتابعة والتحسين",
    description: "تشغيل النظام الجديد + تقارير أداء وفقاً للمعايير المحلية",
    status: "قيد الانتظار",
    progress: 0,
    icon: TrendingUp,
    example: "مثال: تفعيل نظام إدارة الأداء في شركة اتصالات يراعي مؤشرات هيئة الاتصالات",
    steps: [
      { 
        id: 1, 
        title: "إطلاق الهيكل الجديد مع التبليغ للجهات الرسمية", 
        completed: false,
        details: "تحديث البيانات في وزارة التجارة، التأمينات الاجتماعية، والجهات ذات العلاقة"
      },
      { 
        id: 2, 
        title: "مراقبة الأداء لمدة 90 يوم وفقاً لمؤشرات الأداء المحلية", 
        completed: false,
        details: "متابعة شاملة تشمل الالتزام بنسب السعودة ومؤشرات الإنتاجية"
      },
      { 
        id: 3, 
        title: "إعداد تقارير الأداء باللغة العربية", 
        completed: false,
        details: "تقارير دورية تبين مستوى التحسن والالتزام بالأنظمة"
      },
      { 
        id: 4, 
        title: "رفع التوصيات للتحسين المستمر", 
        completed: false,
        details: "توصيات تراعي التطورات في الأنظمة واللوائح المحلية"
      }
    ],
    approvals: [
      { role: "مدير الأداء المؤسسي", status: "انتظار", date: null, entity: "إدارة الأداء" },
      { role: "مدير الموارد البشرية", status: "انتظار", date: null, entity: "الموارد البشرية" },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null, entity: "الإدارة العليا" }
    ],
    regulations: ["نظام مراقبة الشركات", "معايير الإفصاح والشفافية", "لوائح هيئة السوق المالية"]
  }
];

const organizationalStats = [
  { title: "المراحل المكتملة", value: "1", icon: CheckCircle, color: "text-success" },
  { title: "المرحلة الحالية", value: "تصميم الهيكل", icon: Clock, color: "text-warning" },
  { title: "نسبة الإنجاز الإجمالية", value: "35%", icon: TrendingUp, color: "text-primary" },
  { title: "الموافقات المعلقة", value: "2", icon: AlertCircle, color: "text-destructive" }
];

export const OrganizationalDevelopment: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleSteps = (phaseId: number) => {
    setExpandedSteps(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": return "bg-success/20 text-success border-success";
      case "جاري": return "bg-warning/20 text-warning border-warning";
      case "قيد المراجعة": return "bg-info/20 text-info border-info";
      case "قيد الانتظار": return "bg-muted/20 text-muted-foreground border-muted";
      default: return "bg-muted/20 text-muted-foreground border-muted";
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "موافق": return "text-success";
      case "قيد المراجعة": return "text-warning";
      case "انتظار": return "text-muted-foreground";
      case "مرفوض": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">نظام التطوير والتنظيم المؤسسي</h1>
          <p className="text-muted-foreground mt-2">إدارة مراحل التطوير المؤسسي</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          مشروع تطوير جديد
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* مراحل التطوير */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">مراحل التطوير المؤسسي</h2>
        
        <div className="space-y-4">
          {organizationalPhases.map((phase, index) => (
            <Card key={phase.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <phase.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <span>{phase.title}</span>
                        <Badge className={getStatusColor(phase.status)}>
                          {phase.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{phase.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{phase.progress}%</div>
                    <div className="text-sm text-muted-foreground">مكتمل</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress value={phase.progress} className="h-2" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* مثال تطبيقي */}
                <div className="bg-info/10 border-r-4 border-info p-4 rounded-lg">
                  <h4 className="font-semibold text-info mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    مثال تطبيقي
                  </h4>
                  <p className="text-sm text-foreground">{phase.example}</p>
                </div>

                {/* الأنظمة واللوائح المطبقة */}
                <div className="bg-primary/10 border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    الأنظمة واللوائح المطبقة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.regulations.map((regulation, regIndex) => (
                      <Badge key={regIndex} variant="outline" className="text-xs">
                        {regulation}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* الخطوات */}
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSteps(phase.id)}
                    className="flex items-center gap-2 p-0 h-auto text-sm font-medium"
                  >
                    {expandedSteps.includes(phase.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    عرض الخطوات التفصيلية ({phase.steps.length})
                  </Button>
                  
                  {expandedSteps.includes(phase.id) && (
                    <div className="mt-3 space-y-3">
                      {phase.steps.map((step) => (
                        <div key={step.id} className="border rounded-lg p-4 bg-muted/20">
                          <div className="flex items-start gap-3">
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                            ) : (
                              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h5 className={`font-medium mb-2 ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step.title}
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                {step.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* سلسلة الموافقات */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    سلسلة الموافقات
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {phase.approvals.map((approval, approvalIndex) => (
                      <div key={approvalIndex} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{approval.role}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getApprovalStatusColor(approval.status)}`}>
                            {approval.status}
                          </div>
                          {approval.date && (
                            <div className="text-xs text-muted-foreground">
                              {approval.date}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  <Button size="sm" variant="outline">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    تقرير المرحلة
                  </Button>
                  {phase.status === "جاري" && (
                    <Button size="sm">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      تحديث الحالة
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ملخص سير العمل */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            ملخص سير العمل
          </CardTitle>
          <CardDescription>
            تتبع تقدم مراحل التطوير المؤسسي والانتقالات التلقائية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">خطوط الانتقال</h4>
                <ul className="text-sm space-y-1">
                  <li>• المرحلة 1 ← 2: انتقال تلقائي بعد موافقة الرئيس التنفيذي</li>
                  <li>• المرحلة 2 ← 3: انتقال بعد اكتمال جميع الموافقات</li>
                  <li>• المرحلة 3 ← 4: نشر تلقائي بعد اعتماد مجلس الإدارة</li>
                  <li>• المرحلة 4 ← 5: انتقال بعد تقييم الجاهزية</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">النظام الحالي</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>المرحلة النشطة:</span>
                    <span className="font-medium">المرحلة 2 - تصميم الهيكل والعمليات</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نسبة الإنجاز الإجمالية:</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الموافقات المعلقة:</span>
                    <span className="font-medium text-warning">2 موافقة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};