import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Breadcrumb } from '@/components/Breadcrumb';
import buodLogo from '@/assets/buod-logo-white.png';
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
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-accent">{section.rating || 4.8}</span>
              </div>
              <p className="text-sm text-muted-foreground">تقييم المتدربين</p>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-accent">{section.completionRate || 95}%</span>
              </div>
              <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
            </CardContent>
          </Card>
          
          <Card className="border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-accent">{section.totalLearners || 1250}</span>
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
              بصري
            </TabsTrigger>
            <TabsTrigger value="tour" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              جولة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="mt-6">
            <VoiceAssistant 
              title={section.title}
              content={content}
            />
          </TabsContent>

          <TabsContent value="demo" className="mt-6">
            <InteractiveDemo 
              title={section.title}
              steps={demoData.selfService?.steps || []}
            />
          </TabsContent>

          <TabsContent value="visual" className="mt-6">
            <VisualGuide 
              title={section.title}
              category={section.category}
              steps={visualGuideData.selfService?.steps || []}
            />
          </TabsContent>

          <TabsContent value="tour" className="mt-6">
            <GuidedTour 
              title={section.title}
              platformName="منصة بُعد للموارد البشرية"
              steps={tourData.selfService?.steps || []}
            />
          </TabsContent>
        </Tabs>

        {/* معلومات إضافية */}
        <div className="mt-8 space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="content">
              <AccordionTrigger className="text-lg font-semibold">محتوى الدرس</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    {content}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="steps">
              <AccordionTrigger className="text-lg font-semibold">خطوات التعلم</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {section.steps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger className="text-lg font-semibold">الميزات المدروسة</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {section.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-card/50 backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  الدروس التعليمية
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  دروس تفاعلية ومتقدمة
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    حالة النظام
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50"></div>
                    <span className="text-xs text-accent font-semibold">
                      متاح
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    الدروس المتاحة
                  </span>
                  <span className="text-sm text-accent font-bold">
                    {filteredSections.length}
                  </span>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-card/50 backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{filteredSections.length} درس</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">محدّث</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: 'الرئيسية', path: '/' },
                { label: 'الدروس التعليمية', path: '/tutorials' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src="/boud-logo-white.png" 
              alt="شعار بُعد" 
              className="h-36 w-36 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
            مكتبة الدروس التعليمية التفاعلية
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-card/20 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              دروس تعليمية تفاعلية شاملة لتعلم استخدام جميع ميزات منصة بُعد للموارد البشرية
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Professional Search Bar */}
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5 z-10" />
                <Input
                  placeholder="ابحث في الدروس التعليمية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-6 h-14 bg-card/80 backdrop-blur-xl border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-300 shadow-xl hover:shadow-accent/20"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="bg-card/50 border border-border text-foreground hover:bg-accent/20 hover:border-accent transition-all duration-300 shadow-lg hover:shadow-accent/25 px-6 h-12"
              >
                <Search className="w-4 h-4 mr-2" />
                مسح البحث
              </Button>
            </div>
          </div>
        </div>

        {/* Tutorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative">
          {filteredSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-xl rounded-3xl border border-border shadow-2xl hover:shadow-accent/25 transition-all duration-500 hover:scale-105 hover:border-accent cursor-pointer"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative p-8 space-y-6">
                  {/* Header with icon and badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-accent/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-accent/40 group-hover:border-accent transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-accent group-hover:text-foreground transition-colors duration-300" />
                      </div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className="bg-accent/20 text-accent border border-accent/40 group-hover:bg-accent group-hover:text-foreground transition-all duration-300 text-xs font-semibold">
                        {section.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {section.duration}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {section.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {section.targetUsers}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span className="text-sm font-semibold text-foreground">{section.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="text-center p-3 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="text-lg font-bold text-accent">{section.completionRate}%</div>
                      <div className="text-xs text-muted-foreground">معدل الإنجاز</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="text-lg font-bold text-accent">{section.totalLearners}</div>
                      <div className="text-xs text-muted-foreground">متدرب</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-accent/20 text-accent border border-accent/40 hover:bg-accent hover:text-foreground hover:border-accent transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/25"
                        size="lg"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        ابدأ الدرس
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl text-foreground">
                          <IconComponent className="h-8 w-8 text-accent" />
                          {section.title}
                        </DialogTitle>
                      </DialogHeader>
                      {renderTutorialContent(section)}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Panel for Adding/Editing Tutorials */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">إدارة الدروس</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/80 text-foreground border-0 shadow-lg hover:shadow-accent/25 transition-all duration-300 px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة درس جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground text-xl">إضافة درس تعليمي جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">عنوان الدرس</label>
                      <Input
                        value={newTutorial.title}
                        onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
                        placeholder="أدخل عنوان الدرس"
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">التصنيف</label>
                      <Input
                        value={newTutorial.category}
                        onChange={(e) => setNewTutorial({ ...newTutorial, category: e.target.value })}
                        placeholder="تصنيف الدرس"
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block text-muted-foreground">الوصف</label>
                    <Textarea
                      value={newTutorial.description}
                      onChange={(e) => setNewTutorial({ ...newTutorial, description: e.target.value })}
                      placeholder="وصف مختصر للدرس"
                      className="bg-input border-border text-foreground"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">المستخدمون المستهدفون</label>
                      <Input
                        value={newTutorial.targetUsers}
                        onChange={(e) => setNewTutorial({ ...newTutorial, targetUsers: e.target.value })}
                        placeholder="مثال: جميع الموظفين"
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">المدة المتوقعة</label>
                      <Input
                        value={newTutorial.duration}
                        onChange={(e) => setNewTutorial({ ...newTutorial, duration: e.target.value })}
                        placeholder="مثال: 15 دقيقة"
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleAddTutorial} 
                      className="bg-accent hover:bg-accent/80 text-foreground border-0 shadow-lg hover:shadow-accent/25 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة الدرس
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-border text-foreground hover:bg-accent/10"
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Existing Tutorials Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorialSections.map((section) => (
              <div key={section.id} className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border shadow-xl p-6 hover:shadow-accent/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTutorial(section)}
                      className="text-accent hover:text-foreground hover:bg-accent/20 p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTutorial(section.id)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded-lg">{section.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {section.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-accent" />
                      <span className="text-foreground">{section.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-accent" />
                      <span className="text-foreground">{section.completionRate}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-accent" />
                      <span className="text-foreground">{section.totalLearners}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Tutorial Dialog */}
          {editingTutorial && (
            <Dialog open={!!editingTutorial} onOpenChange={() => setEditingTutorial(null)}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground text-xl">تحرير الدرس: {editingTutorial.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">عنوان الدرس</label>
                      <Input
                        value={editingTutorial.title}
                        onChange={(e) => setEditingTutorial({ ...editingTutorial, title: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-muted-foreground">التصنيف</label>
                      <Input
                        value={editingTutorial.category}
                        onChange={(e) => setEditingTutorial({ ...editingTutorial, category: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block text-muted-foreground">الوصف</label>
                    <Textarea
                      value={editingTutorial.description}
                      onChange={(e) => setEditingTutorial({ ...editingTutorial, description: e.target.value })}
                      className="bg-input border-border text-foreground"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleUpdateTutorial(editingTutorial)} 
                      className="bg-accent hover:bg-accent/80 text-foreground border-0 shadow-lg hover:shadow-accent/25 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      حفظ التغييرات
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingTutorial(null)}
                      className="border-border text-foreground hover:bg-accent/10"
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
    </div>
  );
};
