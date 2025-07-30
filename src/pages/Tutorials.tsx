import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  FileText,
  Calculator,
  Target,
  UserPlus,
  GraduationCap,
  Shield,
  BarChart3,
  Settings,
  Building,
  Calendar,
  CreditCard,
  MessageSquare,
  BookOpen,
  Award,
  Scale
} from 'lucide-react';

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  targetUsers: string[];
  steps: string[];
  features: string[];
}

const tutorialSections: TutorialSection[] = [
  {
    id: 'self-service',
    title: 'منصة الخدمة الذاتية للموظفين',
    description: 'منصة شاملة تمكن الموظفين من إدارة بياناتهم الشخصية وطلباتهم بشكل مستقل',
    icon: <Users className="h-6 w-6" />,
    targetUsers: ['الموظفين', 'مدراء الأقسام'],
    steps: [
      'تسجيل الدخول باستخدام بيانات الموظف',
      'الانتقال إلى قسم "الخدمة الذاتية"',
      'تحديث البيانات الشخصية والمهنية',
      'تقديم طلبات الإجازات والموافقات',
      'عرض كشوف الراتب والمستحقات',
      'تحميل وطباعة التقارير المطلوبة'
    ],
    features: [
      'إدارة البيانات الشخصية',
      'طلبات الإجازات والأذونات',
      'عرض كشوف الراتب',
      'تحميل الشهادات والوثائق',
      'متابعة حالة الطلبات'
    ]
  },
  {
    id: 'legal-affairs',
    title: 'منصة الشؤون القانونية',
    description: 'نظام متكامل لإدارة الجوانب القانونية والامتثال في المؤسسة',
    icon: <Scale className="h-6 w-6" />,
    targetUsers: ['المستشارين القانونيين', 'إدارة الموارد البشرية', 'الإدارة العليا'],
    steps: [
      'الوصول إلى لوحة الشؤون القانونية',
      'مراجعة العقود والاتفاقيات',
      'إدارة الامتثال التنظيمي',
      'متابعة القضايا القانونية',
      'إنشاء التقارير القانونية',
      'إدارة المخاطر القانونية'
    ],
    features: [
      'إدارة العقود',
      'متابعة الامتثال',
      'إدارة القضايا',
      'تقييم المخاطر',
      'التقارير القانونية'
    ]
  },
  {
    id: 'hr-services',
    title: 'خدمات الموارد البشرية',
    description: 'نظام شامل لإدارة جميع عمليات الموارد البشرية من التوظيف إلى التقاعد',
    icon: <Building className="h-6 w-6" />,
    targetUsers: ['موظفي الموارد البشرية', 'المدراء', 'الإدارة العليا'],
    steps: [
      'تسجيل الدخول إلى نظام الموارد البشرية',
      'إضافة وإدارة بيانات الموظفين',
      'إنشاء الهيكل التنظيمي',
      'إدارة الحضور والانصراف',
      'معالجة طلبات الموظفين',
      'إنشاء التقارير والإحصائيات'
    ],
    features: [
      'إدارة بيانات الموظفين',
      'نظام الحضور والانصراف',
      'إدارة الطلبات',
      'الهيكل التنظيمي',
      'التقارير والإحصائيات'
    ]
  },
  {
    id: 'payroll',
    title: 'نظام الرواتب والمكافآت',
    description: 'نظام دقيق لحساب وإدارة رواتب الموظفين ومكافآتهم',
    icon: <CreditCard className="h-6 w-6" />,
    targetUsers: ['محاسبي الرواتب', 'الموارد البشرية', 'الإدارة المالية'],
    steps: [
      'إعداد هيكل الرواتب والبدلات',
      'ربط بيانات الحضور بالرواتب',
      'حساب الاستقطاعات والضرائب',
      'مراجعة واعتماد كشوف الرواتب',
      'إرسال كشوف الرواتب للموظفين',
      'إنشاء تقارير الرواتب الشهرية'
    ],
    features: [
      'حساب الرواتب التلقائي',
      'إدارة البدلات والمكافآت',
      'حساب الاستقطاعات',
      'كشوف الرواتب الإلكترونية',
      'التقارير المالية'
    ]
  },
  {
    id: 'performance',
    title: 'نظام تقييم الأداء',
    description: 'منصة شاملة لتقييم ومتابعة أداء الموظفين وتطويرهم المهني',
    icon: <Target className="h-6 w-6" />,
    targetUsers: ['المدراء المباشرين', 'الموارد البشرية', 'الموظفين'],
    steps: [
      'إنشاء معايير التقييم',
      'تحديد الأهداف الفردية',
      'إجراء تقييمات دورية',
      'مراجعة النتائج مع الموظفين',
      'وضع خطط التطوير',
      'متابعة التقدم والتحسن'
    ],
    features: [
      'تقييم الأداء الدوري',
      'إدارة الأهداف',
      'خطط التطوير',
      'التقييم 360 درجة',
      'تقارير الأداء'
    ]
  },
  {
    id: 'recruitment',
    title: 'وحدة التوظيف الذكي',
    description: 'نظام متطور لإدارة عملية التوظيف من الإعلان إلى التعيين',
    icon: <UserPlus className="h-6 w-6" />,
    targetUsers: ['موظفي التوظيف', 'المدراء', 'لجان المقابلات'],
    steps: [
      'إنشاء إعلانات الوظائف',
      'استقبال وفرز طلبات التوظيف',
      'إجراء الفحص الأولي للمرشحين',
      'جدولة المقابلات الشخصية',
      'تقييم المرشحين واتخاذ القرار',
      'إنهاء إجراءات التعيين'
    ],
    features: [
      'إدارة إعلانات الوظائف',
      'نظام تصفية المرشحين',
      'جدولة المقابلات',
      'تقييم المتقدمين',
      'إدارة عملية التعيين'
    ]
  },
  {
    id: 'training',
    title: 'منصة التدريب والتطوير',
    description: 'بيئة تعليمية متكاملة لتطوير مهارات الموظفين',
    icon: <GraduationCap className="h-6 w-6" />,
    targetUsers: ['المدربين', 'الموظفين', 'مدراء التطوير'],
    steps: [
      'تحديد الاحتياجات التدريبية',
      'إنشاء البرامج التدريبية',
      'تسجيل الموظفين في الدورات',
      'تنفيذ البرامج التدريبية',
      'تقييم فعالية التدريب',
      'إصدار الشهادات والتقييمات'
    ],
    features: [
      'إدارة البرامج التدريبية',
      'التدريب الإلكتروني',
      'جدولة الدورات',
      'تقييم التدريب',
      'إصدار الشهادات'
    ]
  },
  {
    id: 'compliance',
    title: 'الامتثال والحوكمة',
    description: 'نظام لضمان الامتثال للوائح والسياسات المؤسسية',
    icon: <Shield className="h-6 w-6" />,
    targetUsers: ['مسؤولي الامتثال', 'المراجعين الداخليين', 'الإدارة العليا'],
    steps: [
      'تحديد متطلبات الامتثال',
      'إنشاء السياسات والإجراءات',
      'مراقبة الالتزام بالسياسات',
      'إجراء مراجعات دورية',
      'إنشاء تقارير الامتثال',
      'اتخاذ الإجراءات التصحيحية'
    ],
    features: [
      'إدارة السياسات',
      'مراقبة الامتثال',
      'المراجعة الداخلية',
      'إدارة المخاطر',
      'تقارير الامتثال'
    ]
  },
  {
    id: 'kpi-tracking',
    title: 'متابعة مؤشرات الأداء الرئيسية',
    description: 'نظام لمراقبة وتحليل مؤشرات الأداء المؤسسية',
    icon: <BarChart3 className="h-6 w-6" />,
    targetUsers: ['المحللين', 'الإدارة العليا', 'مدراء الأقسام'],
    steps: [
      'تحديد مؤشرات الأداء الرئيسية',
      'ربط البيانات من الأنظمة المختلفة',
      'إنشاء لوحات القياس',
      'مراقبة الأداء بشكل دوري',
      'تحليل الاتجاهات والأنماط',
      'اتخاذ قرارات مبنية على البيانات'
    ],
    features: [
      'لوحات قياس تفاعلية',
      'تحليل البيانات',
      'التقارير الآلية',
      'التنبيهات الذكية',
      'مؤشرات الأداء المخصصة'
    ]
  }
];

export const Tutorials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<string[]>([]);

  const filteredSections = tutorialSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary ml-4" />
            <h1 className="text-4xl font-bold text-foreground">
              دليل الشروحات والمساعدة
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            دليل شامل لجميع مميزات وخدمات النظام مع شرح مفصل لكيفية الاستخدام خطوة بخطوة
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث في الشروحات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Tutorial Sections */}
        <div className="max-w-6xl mx-auto">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                لم يتم العثور على نتائج
              </h3>
              <p className="text-muted-foreground">
                جرب البحث بكلمات مختلفة أو تصفح جميع الأقسام
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredSections.map((section) => (
                <Card key={section.id} className="overflow-hidden">
                  <Collapsible
                    open={openSections.includes(section.id)}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="p-3 bg-primary/10 rounded-lg">
                              {section.icon}
                            </div>
                            <div className="text-right">
                              <CardTitle className="text-xl mb-2">
                                {section.title}
                              </CardTitle>
                              <CardDescription className="text-base">
                                {section.description}
                              </CardDescription>
                            </div>
                          </div>
                          {openSections.includes(section.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                        
                        {/* Target Users */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {section.targetUsers.map((user, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {user}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Steps */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                              <Settings className="h-5 w-5 ml-2" />
                              خطوات الاستخدام
                            </h4>
                            <ol className="space-y-3">
                              {section.steps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold ml-3 mt-0.5">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          
                          {/* Features */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                              <Award className="h-5 w-5 ml-2" />
                              المميزات الرئيسية
                            </h4>
                            <ul className="space-y-2">
                              {section.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-2 h-2 bg-primary rounded-full ml-3"></div>
                                  <span className="text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                هل تحتاج مساعدة إضافية؟
              </h3>
              <p className="text-muted-foreground mb-4">
                فريق الدعم الفني متاح لمساعدتك في أي استفسارات أو مشاكل تقنية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="text-sm px-4 py-2">
                  📧 support@boudhr.com
                </Badge>
                <Badge variant="outline" className="text-sm px-4 py-2">
                  📞 +966 123 456 789
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};