import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  BookOpen, 
  Search, 
  Users, 
  Scale, 
  CreditCard,
  BarChart,
  UserCheck,
  GraduationCap,
  Shield,
  Target,
  Volume2,
  Play,
  Camera,
  Navigation
} from 'lucide-react';

// استيراد المكونات الجديدة
import { VoiceAssistant } from '@/components/tutorials/VoiceAssistant';
import { InteractiveDemo } from '@/components/tutorials/InteractiveDemo';
import { VisualGuide } from '@/components/tutorials/VisualGuide';
import { GuidedTour } from '@/components/tutorials/GuidedTour';

// بيانات تجريبية للعروض التوضيحية
const demoData = {
  selfService: {
    steps: [
      {
        id: 1,
        title: 'تسجيل الدخول للنظام',
        description: 'ابدأ بتسجيل الدخول باستخدام البيانات المقدمة من إدارة الموارد البشرية',
        action: 'أدخل اسم المستخدم وكلمة المرور ثم اضغط دخول',
        tips: ['تأكد من صحة البيانات', 'احتفظ بكلمة مرورك آمنة']
      },
      {
        id: 2,
        title: 'الانتقال للوحة الرئيسية',
        description: 'ستظهر لك لوحة تحكم تحتوي على جميع الخدمات المتاحة لك',
        action: 'استكشف الخيارات المتاحة في القائمة الجانبية',
        tips: ['يمكنك تخصيص عرض اللوحة', 'راجع الإشعارات الجديدة']
      },
      {
        id: 3,
        title: 'تحديث البيانات الشخصية',
        description: 'قم بمراجعة وتحديث بياناتك الشخصية عند الحاجة',
        action: 'اضغط على "الملف الشخصي" وقم بتحديث المعلومات',
        tips: ['تأكد من صحة رقم الهاتف', 'أضف صورة شخصية واضحة']
      }
    ]
  }
};

const visualGuideData = {
  selfService: {
    steps: [
      {
        id: 1,
        title: 'واجهة تسجيل الدخول',
        description: 'شاشة تسجيل الدخول الأولى للموظفين',
        screenshot: '/screenshots/login.png',
        annotations: [
          { x: 50, y: 30, text: 'أدخل اسم المستخدم هنا', type: 'input' as const },
          { x: 50, y: 50, text: 'أدخل كلمة المرور', type: 'input' as const },
          { x: 50, y: 70, text: 'اضغط لتسجيل الدخول', type: 'click' as const }
        ],
        tips: ['استخدم بيانات الدخول المقدمة من HR', 'فعل خيار "تذكرني" لسهولة الوصول']
      }
    ]
  }
};

const tourData = {
  selfService: {
    steps: [
      {
        id: 1,
        target: '.dashboard-header',
        title: 'مرحباً بك في لوحة التحكم',
        description: 'هذه هي منطقة العنوان الرئيسي حيث يمكنك رؤية اسمك ومعلومات الحساب',
        position: 'bottom' as const,
        action: 'hover' as const
      },
      {
        id: 2,
        target: '.sidebar-menu',
        title: 'القائمة الجانبية',
        description: 'تحتوي على جميع الخدمات المتاحة لك كموظف',
        position: 'right' as const,
        action: 'click' as const
      }
    ]
  }
};

export const Tutorials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorialType, setSelectedTutorialType] = useState<'voice' | 'demo' | 'visual' | 'tour'>('demo');

  const tutorialSections = [
    {
      id: 'self-service',
      title: 'منصة الخدمة الذاتية للموظفين',
      description: 'منصة شاملة تمكن الموظفين من إدارة بياناتهم الشخصية وطلباتهم بشكل مستقل',
      icon: Users,
      targetUsers: 'الموظفين ومدراء الأقسام',
      duration: '15 دقيقة',
      category: 'خدمات الموظفين',
      content: 'تعلم كيفية استخدام منصة الخدمة الذاتية لإدارة بياناتك الشخصية، تقديم طلبات الإجازات، عرض كشوف الراتب، وتحميل الشهادات والوثائق المختلفة.',
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
      icon: Scale,
      targetUsers: 'المستشارين القانونيين والإدارة العليا',
      duration: '25 دقيقة',
      category: 'الشؤون القانونية',
      content: 'دليل شامل لاستخدام منصة الشؤون القانونية لإدارة العقود، متابعة الامتثال التنظيمي، وإدارة المخاطر القانونية.',
      steps: [
        'الوصول إلى لوحة الشؤون القانونية',
        'مراجعة العقود والاتفاقيات',
        'إدارة الامتثال التنظيمي',
        'متابعة القضايا القانونية',
        'إنشاء التقارير القانونية',
        'إدارة المخاطر القانونية'
      ],
      features: [
        'إدارة العقود والاتفاقيات',
        'متابعة الامتثال التنظيمي',
        'إدارة القضايا القانونية',
        'تقييم المخاطر القانونية',
        'التقارير القانونية المتقدمة'
      ]
    },
    {
      id: 'hr-services',
      title: 'خدمات الموارد البشرية',
      description: 'نظام شامل لإدارة جميع عمليات الموارد البشرية من التوظيف إلى التقاعد',
      icon: UserCheck,
      targetUsers: 'موظفي الموارد البشرية والمدراء',
      duration: '30 دقيقة',
      category: 'الموارد البشرية',
      content: 'تعلم استخدام جميع خدمات الموارد البشرية من إدارة بيانات الموظفين، نظام الحضور والانصراف، ومعالجة الطلبات المختلفة.',
      steps: [
        'تسجيل الدخول إلى نظام الموارد البشرية',
        'إضافة وإدارة بيانات الموظفين',
        'إنشاء الهيكل التنظيمي',
        'إدارة الحضور والانصراف',
        'معالجة طلبات الموظفين',
        'إنشاء التقارير والإحصائيات'
      ],
      features: [
        'إدارة شاملة لبيانات الموظفين',
        'نظام حضور وانصراف متطور',
        'معالجة الطلبات الإلكترونية',
        'هيكل تنظيمي ديناميكي',
        'تقارير وإحصائيات تفصيلية'
      ]
    },
    {
      id: 'payroll',
      title: 'نظام الرواتب والمكافآت',
      description: 'نظام دقيق لحساب وإدارة رواتب الموظفين ومكافآتهم',
      icon: CreditCard,
      targetUsers: 'محاسبي الرواتب والإدارة المالية',
      duration: '20 دقيقة',
      category: 'الرواتب والمالية',
      content: 'دليل شامل لاستخدام نظام الرواتب من إعداد هيكل الرواتب وحساب الاستقطاعات إلى إنشاء كشوف الرواتب الشهرية.',
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
        'حساب الاستقطاعات الدقيق',
        'كشوف رواتب إلكترونية',
        'تقارير مالية شاملة'
      ]
    },
    {
      id: 'performance',
      title: 'نظام تقييم الأداء',
      description: 'منصة شاملة لتقييم ومتابعة أداء الموظفين وتطويرهم المهني',
      icon: Target,
      targetUsers: 'المدراء المباشرين والموظفين',
      duration: '18 دقيقة',
      category: 'تقييم الأداء',
      content: 'تعلم كيفية إنشاء معايير التقييم، تحديد الأهداف، إجراء تقييمات دورية، ووضع خطط التطوير للموظفين.',
      steps: [
        'إنشاء معايير التقييم',
        'تحديد الأهداف الفردية',
        'إجراء تقييمات دورية',
        'مراجعة النتائج مع الموظفين',
        'وضع خطط التطوير',
        'متابعة التقدم والتحسن'
      ],
      features: [
        'تقييم أداء دوري ومرن',
        'إدارة الأهداف الذكية',
        'خطط تطوير مخصصة',
        'تقييم 360 درجة',
        'تقارير أداء تفصيلية'
      ]
    },
    {
      id: 'recruitment',
      title: 'وحدة التوظيف الذكي',
      description: 'نظام متطور لإدارة عملية التوظيف من الإعلان إلى التعيين',
      icon: UserCheck,
      targetUsers: 'موظفي التوظيف ولجان المقابلات',
      duration: '22 دقيقة',
      category: 'التوظيف',
      content: 'دليل شامل لاستخدام وحدة التوظيف الذكي من إنشاء إعلانات الوظائف وفرز المرشحين إلى إجراء المقابلات واتخاذ قرارات التعيين.',
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
        'نظام تصفية ذكي للمرشحين',
        'جدولة مقابلات مرنة',
        'تقييم شامل للمتقدمين',
        'إدارة عملية التعيين'
      ]
    },
    {
      id: 'training',
      title: 'منصة التدريب والتطوير',
      description: 'بيئة تعليمية متكاملة لتطوير مهارات الموظفين',
      icon: GraduationCap,
      targetUsers: 'المدربين والموظفين',
      duration: '25 دقيقة',
      category: 'التدريب والتطوير',
      content: 'تعلم استخدام منصة التدريب لإنشاء البرامج التدريبية، تسجيل الموظفين، تنفيذ التدريب، وتقييم الفعالية.',
      steps: [
        'تحديد الاحتياجات التدريبية',
        'إنشاء البرامج التدريبية',
        'تسجيل الموظفين في الدورات',
        'تنفيذ البرامج التدريبية',
        'تقييم فعالية التدريب',
        'إصدار الشهادات والتقييمات'
      ],
      features: [
        'إدارة برامج تدريبية شاملة',
        'التدريب الإلكتروني التفاعلي',
        'جدولة مرنة للدورات',
        'تقييم فعالية التدريب',
        'إصدار شهادات معتمدة'
      ]
    },
    {
      id: 'compliance',
      title: 'الامتثال والحوكمة',
      description: 'نظام لضمان الامتثال للوائح والسياسات المؤسسية',
      icon: Shield,
      targetUsers: 'مسؤولي الامتثال والمراجعين',
      duration: '20 دقيقة',
      category: 'الامتثال والحوكمة',
      content: 'دليل شامل لاستخدام نظام الامتثال والحوكمة لضمان الالتزام بالسياسات واللوائح المؤسسية والحكومية.',
      steps: [
        'تحديد متطلبات الامتثال',
        'إنشاء السياسات والإجراءات',
        'مراقبة الالتزام بالسياسات',
        'إجراء مراجعات دورية',
        'إنشاء تقارير الامتثال',
        'اتخاذ الإجراءات التصحيحية'
      ],
      features: [
        'إدارة شاملة للسياسات',
        'مراقبة الامتثال المستمرة',
        'المراجعة الداخلية المنهجية',
        'إدارة المخاطر المتقدمة',
        'تقارير امتثال تفصيلية'
      ]
    },
    {
      id: 'kpi-tracking',
      title: 'متابعة مؤشرات الأداء الرئيسية',
      description: 'نظام لمراقبة وتحليل مؤشرات الأداء المؤسسية',
      icon: BarChart,
      targetUsers: 'المحللين والإدارة العليا',
      duration: '15 دقيقة',
      category: 'التحليلات والتقارير',
      content: 'تعلم كيفية إنشاء ومراقبة مؤشرات الأداء الرئيسية، إنشاء لوحات القياس التفاعلية، وتحليل البيانات لاتخاذ قرارات مدروسة.',
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
        'تحليل البيانات المتقدم',
        'التقارير الآلية الذكية',
        'التنبيهات والإشعارات',
        'مؤشرات أداء مخصصة'
      ]
    }
  ];

  const filteredSections = tutorialSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderTutorialContent = (section: any) => {
    const content = section.content || 'محتوى تفصيلي لكيفية استخدام هذه الميزة...';
    
    return (
      <Tabs value={selectedTutorialType} onValueChange={(value) => setSelectedTutorialType(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            صوتي
          </TabsTrigger>
          <TabsTrigger value="demo" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            تفاعلي
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            مصور
          </TabsTrigger>
          <TabsTrigger value="tour" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            جولة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="mt-6">
          <VoiceAssistant
            content={content}
            title={section.title}
          />
        </TabsContent>

        <TabsContent value="demo" className="mt-6">
          <InteractiveDemo
            title={section.title}
            steps={demoData.selfService.steps}
            platformUrl={`/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <VisualGuide
            title={section.title}
            category={section.category || 'عام'}
            steps={visualGuideData.selfService.steps}
          />
        </TabsContent>

        <TabsContent value="tour" className="mt-6">
          <GuidedTour
            title={section.title}
            platformName={section.title}
            steps={tourData.selfService.steps}
            onStart={() => console.log('بدء الجولة الإرشادية')}
            onComplete={() => console.log('انتهاء الجولة الإرشادية')}
          />
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            الشروحات ودليل الاستخدام
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            دليل شامل ومتقدم لاستخدام جميع منصات وميزات نظام بُعد HR مع أربعة أنواع مختلفة من الشروحات
          </p>
          
          {/* أنواع الشروحات المتاحة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <Volume2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">مساعد صوتي</h3>
                <p className="text-xs text-muted-foreground">قراءة المحتوى بالصوت</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <Play className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">عروض تفاعلية</h3>
                <p className="text-xs text-muted-foreground">محاكاة خطوة بخطوة</p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">أدلة مصورة</h3>
                <p className="text-xs text-muted-foreground">لقطات مع إرشادات</p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 dark:border-orange-800">
              <CardContent className="p-4 text-center">
                <Navigation className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">جولات إرشادية</h3>
                <p className="text-xs text-muted-foreground">جولة داخل المنصة</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ابحث في الشروحات والأدلة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 h-12 text-lg border-2 border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Tutorial Sections */}
        <div className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section, index) => (
              <AccordionItem 
                key={index} 
                value={`section-${index}`}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
              >
                <AccordionTrigger className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4 text-right w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="mr-auto flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {section.targetUsers}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ⏱️ {section.duration}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700">
                  {renderTutorialContent(section)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* API Key Setup Notice */}
        <Card className="mt-8 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                🔊 لتفعيل المساعد الصوتي
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                احصل على مفتاح ElevenLabs API وأضفه في إعدادات النظام لتفعيل ميزة تحويل النص إلى كلام
              </p>
              <Button 
                variant="outline" 
                className="border-yellow-400 text-yellow-800 hover:bg-yellow-100 dark:text-yellow-200 dark:hover:bg-yellow-900/50"
              >
                إعداد مفتاح API
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};