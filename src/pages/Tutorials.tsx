import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BackButton } from '@/components/BackButton';
import { BoudLogo } from '@/components/BoudLogo';
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
  Navigation,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Settings,
  Star,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

// استيراد المكونات الجديدة
import { VoiceAssistant } from '@/components/tutorials/VoiceAssistant';
import { InteractiveDemo } from '@/components/tutorials/InteractiveDemo';
import { VisualGuide } from '@/components/tutorials/VisualGuide';
import { GuidedTour } from '@/components/tutorials/GuidedTour';

export const Tutorials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTutorialType, setSelectedTutorialType] = useState<'voice' | 'demo' | 'visual' | 'tour'>('demo');
  const [customTutorials, setCustomTutorials] = useState<any[]>([]);
  const [newTutorial, setNewTutorial] = useState({
    title: '',
    description: '',
    category: '',
    targetUsers: '',
    duration: '',
    content: '',
    steps: [''],
    features: ['']
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<any>(null);

  // بيانات تجريبية محسنة للعروض التوضيحية
  const [demoData] = useState({
    selfService: {
      steps: [
        {
          id: 1,
          title: 'تسجيل الدخول للنظام',
          description: 'ابدأ بتسجيل الدخول باستخدام البيانات المقدمة من إدارة الموارد البشرية',
          action: 'أدخل اسم المستخدم وكلمة المرور ثم اضغط دخول',
          tips: ['تأكد من صحة البيانات', 'احتفظ بكلمة مرورك آمنة'],
          completed: false
        },
        {
          id: 2,
          title: 'الانتقال للوحة الرئيسية',
          description: 'ستظهر لك لوحة تحكم تحتوي على جميع الخدمات المتاحة لك',
          action: 'استكشف الخيارات المتاحة في القائمة الجانبية',
          tips: ['يمكنك تخصيص عرض اللوحة', 'راجع الإشعارات الجديدة'],
          completed: false
        },
        {
          id: 3,
          title: 'تحديث البيانات الشخصية',
          description: 'قم بمراجعة وتحديث بياناتك الشخصية عند الحاجة',
          action: 'اضغط على "الملف الشخصي" وقم بتحديث المعلومات',
          tips: ['تأكد من صحة رقم الهاتف', 'أضف صورة شخصية واضحة'],
          completed: false
        }
      ]
    }
  });

  const [visualGuideData] = useState({
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
        },
        {
          id: 2,
          title: 'لوحة التحكم الرئيسية',
          description: 'واجهة لوحة التحكم مع جميع الخدمات',
          screenshot: '/screenshots/dashboard.png',
          annotations: [
            { x: 20, y: 50, text: 'القائمة الجانبية للخدمات', type: 'info' as const },
            { x: 80, y: 20, text: 'معلومات الحساب', type: 'info' as const }
          ],
          tips: ['استكشف جميع الخدمات المتاحة', 'راجع الإشعارات الجديدة بانتظام']
        }
      ]
    }
  });

  const [tourData] = useState({
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
        },
        {
          id: 3,
          target: '.notifications-area',
          title: 'منطقة الإشعارات',
          description: 'هنا ستجد جميع الإشعارات والتحديثات المهمة',
          position: 'bottom' as const,
          action: 'click' as const
        }
      ]
    }
  });

  // الأقسام الافتراضية مع بيانات محسنة
  const [tutorialSections, setTutorialSections] = useState([
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
      ],
      rating: 4.8,
      completionRate: 95,
      totalLearners: 1250
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
      ],
      rating: 4.6,
      completionRate: 88,
      totalLearners: 450
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
      ],
      rating: 4.9,
      completionRate: 92,
      totalLearners: 2100
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
      ],
      rating: 4.7,
      completionRate: 94,
      totalLearners: 850
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
      ],
      rating: 4.5,
      completionRate: 87,
      totalLearners: 1600
    }
  ]);

  // إضافة درس جديد
  const handleAddTutorial = () => {
    if (newTutorial.title.trim()) {
      const tutorial = {
        ...newTutorial,
        id: Date.now().toString(),
        icon: BookOpen,
        rating: 0,
        completionRate: 0,
        totalLearners: 0,
        steps: newTutorial.steps.filter(step => step.trim()),
        features: newTutorial.features.filter(feature => feature.trim())
      };
      
      setTutorialSections([...tutorialSections, tutorial]);
      setNewTutorial({
        title: '',
        description: '',
        category: '',
        targetUsers: '',
        duration: '',
        content: '',
        steps: [''],
        features: ['']
      });
      setIsAddDialogOpen(false);
    }
  };

  // تحديث درس
  const handleUpdateTutorial = (updatedTutorial: any) => {
    setTutorialSections(sections =>
      sections.map(section =>
        section.id === updatedTutorial.id ? updatedTutorial : section
      )
    );
    setEditingTutorial(null);
  };

  // حذف درس
  const handleDeleteTutorial = (id: string) => {
    setTutorialSections(sections => sections.filter(section => section.id !== id));
  };

  // إضافة خطوة جديدة
  const addStep = (isEditing = false) => {
    if (isEditing && editingTutorial) {
      setEditingTutorial({
        ...editingTutorial,
        steps: [...editingTutorial.steps, '']
      });
    } else {
      setNewTutorial({
        ...newTutorial,
        steps: [...newTutorial.steps, '']
      });
    }
  };

  // إضافة ميزة جديدة
  const addFeature = (isEditing = false) => {
    if (isEditing && editingTutorial) {
      setEditingTutorial({
        ...editingTutorial,
        features: [...editingTutorial.features, '']
      });
    } else {
      setNewTutorial({
        ...newTutorial,
        features: [...newTutorial.features, '']
      });
    }
  };

  const filteredSections = [...tutorialSections, ...customTutorials].filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.features.some((feature: string) => feature.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderTutorialContent = (section: any) => {
    const content = section.content || 'محتوى تفصيلي لكيفية استخدام هذه الميزة...';
    
    return (
      <div className="space-y-6">
        {/* إحصائيات الدرس */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold text-green-600">{section.rating || 4.8}</span>
              </div>
              <p className="text-sm text-muted-foreground">تقييم المتدربين</p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold text-blue-600">{section.completionRate || 95}%</span>
              </div>
              <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-bold text-purple-600">{section.totalLearners || 1250}</span>
              </div>
              <p className="text-sm text-muted-foreground">إجمالي المتدربين</p>
            </CardContent>
          </Card>
        </div>

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

        {/* قائمة الخطوات والميزات */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">خطوات التنفيذ</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {section.steps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الميزات الرئيسية</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* نمط الخلفية */}
      <BoudLogo variant="pattern" />
      
      {/* Header with Back Button and Logo */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BackButton />
            <BoudLogo size="header" showText />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-primary" />
              مركز المعرفة ودليل الاستخدام المتقدم
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              دليل شامل ومتقدم لاستخدام جميع منصات وميزات نظام بُعد HR مع أربعة أنواع مختلفة من المعرفة
            </p>
            
            {/* أنواع المعرفة المتاحة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-4xl mx-auto">
              <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Volume2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">مساعد صوتي</h3>
                  <p className="text-xs text-muted-foreground">قراءة المحتوى بالصوت</p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Play className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">عروض تفاعلية</h3>
                  <p className="text-xs text-muted-foreground">محاكاة خطوة بخطوة</p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">أدلة مصورة</h3>
                  <p className="text-xs text-muted-foreground">لقطات مع إرشادات</p>
                </CardContent>
              </Card>
              
              <Card className="border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Navigation className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">جولات إرشادية</h3>
                  <p className="text-xs text-muted-foreground">جولة داخل المنصة</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* أدوات الإدارة */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            {/* شريط البحث */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ابحث في مركز المعرفة والأدلة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-12 h-12 text-lg border-2 border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* أزرار الإدارة */}
            <div className="flex gap-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة درس جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>إضافة درس تعليمي جديد</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">عنوان الدرس</label>
                        <Input
                          value={newTutorial.title}
                          onChange={(e) => setNewTutorial({...newTutorial, title: e.target.value})}
                          placeholder="أدخل عنوان الدرس"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">الفئة المستهدفة</label>
                        <Input
                          value={newTutorial.targetUsers}
                          onChange={(e) => setNewTutorial({...newTutorial, targetUsers: e.target.value})}
                          placeholder="مثال: الموظفين ومدراء الأقسام"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">المدة المتوقعة</label>
                        <Input
                          value={newTutorial.duration}
                          onChange={(e) => setNewTutorial({...newTutorial, duration: e.target.value})}
                          placeholder="مثال: 15 دقيقة"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">التصنيف</label>
                        <Select value={newTutorial.category} onValueChange={(value) => setNewTutorial({...newTutorial, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التصنيف" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="خدمات الموظفين">خدمات الموظفين</SelectItem>
                            <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                            <SelectItem value="الرواتب والمالية">الرواتب والمالية</SelectItem>
                            <SelectItem value="التدريب والتطوير">التدريب والتطوير</SelectItem>
                            <SelectItem value="الشؤون القانونية">الشؤون القانونية</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">الوصف</label>
                      <Textarea
                        value={newTutorial.description}
                        onChange={(e) => setNewTutorial({...newTutorial, description: e.target.value})}
                        placeholder="وصف مختصر للدرس"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">المحتوى التفصيلي</label>
                      <Textarea
                        value={newTutorial.content}
                        onChange={(e) => setNewTutorial({...newTutorial, content: e.target.value})}
                        placeholder="محتوى الدرس التفصيلي"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">خطوات التنفيذ</label>
                        <Button variant="outline" size="sm" onClick={() => addStep()}>
                          <Plus className="h-4 w-4 ml-1" />
                          إضافة خطوة
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {newTutorial.steps.map((step, index) => (
                          <Input
                            key={index}
                            value={step}
                            onChange={(e) => {
                              const newSteps = [...newTutorial.steps];
                              newSteps[index] = e.target.value;
                              setNewTutorial({...newTutorial, steps: newSteps});
                            }}
                            placeholder={`الخطوة ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">الميزات الرئيسية</label>
                        <Button variant="outline" size="sm" onClick={() => addFeature()}>
                          <Plus className="h-4 w-4 ml-1" />
                          إضافة ميزة
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {newTutorial.features.map((feature, index) => (
                          <Input
                            key={index}
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...newTutorial.features];
                              newFeatures[index] = e.target.value;
                              setNewTutorial({...newTutorial, features: newFeatures});
                            }}
                            placeholder={`الميزة ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleAddTutorial}>
                        إضافة الدرس
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تصدير
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                استيراد
              </Button>
              
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                الإعدادات
              </Button>
            </div>
          </div>

          {/* Tutorial Sections */}
          <div className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredSections.map((section, index) => (
                <AccordionItem 
                  key={index} 
                  value={`section-${index}`}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
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
                      <div className="mr-auto flex flex-wrap gap-2 items-center">
                        <Badge variant="secondary" className="text-xs">
                          {section.targetUsers}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 ml-1" />
                          {section.duration}
                        </Badge>
                        {section.rating && (
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 ml-1" />
                            {section.rating}
                          </Badge>
                        )}
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTutorial(section);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTutorial(section.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

          {/* No Results Message */}
          {filteredSections.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground">
                  لم نتمكن من العثور على دروس تطابق بحثك. جرب كلمات مختلفة أو أضف درساً جديداً.
                </p>
              </CardContent>
            </Card>
          )}

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
    </>
  );
};