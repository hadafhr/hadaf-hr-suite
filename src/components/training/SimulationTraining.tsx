import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Pause,
  RotateCcw,
  Award,
  Target,
  Users,
  MessageSquare,
  Brain,
  Gamepad2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Eye,
  Settings,
  Download,
  Plus,
  Edit,
  Star,
  Lightbulb,
  BarChart3
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'customer_service' | 'management' | 'sales' | 'hr' | 'legal' | 'technical';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  objectives: string[];
  created_by: string;
  isActive: boolean;
  completions: number;
  avgScore: number;
}

interface SimulationSession {
  id: string;
  scenarioId: string;
  participantId: string;
  participantName: string;
  status: 'active' | 'completed' | 'paused';
  currentStep: number;
  totalSteps: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  responses: SimulationResponse[];
}

interface SimulationResponse {
  stepId: string;
  question: string;
  userResponse: string;
  aiEvaluation: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  };
  timestamp: Date;
}

interface ScenarioStep {
  id: string;
  scenarioId: string;
  stepNumber: number;
  type: 'dialogue' | 'decision' | 'action';
  content: string;
  options: string[];
  correctAnswer?: string;
  aiPrompt: string;
}

export const SimulationTraining: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeSessions, setActiveSessions] = useState<SimulationSession[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentSession, setCurrentSession] = useState<SimulationSession | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('scenarios');
  const [newScenario, setNewScenario] = useState({
    title: '',
    description: '',
    category: 'customer_service',
    difficulty: 'beginner',
    objectives: ['']
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock scenario steps for demonstration
  const scenarioSteps = [
    {
      type: 'dialogue',
      content: 'عميل غاضب يتصل بك بخصوص تأخير في الطلب. يقول: "هذا غير مقبول! طلبي متأخر أسبوعين كاملين!"',
      question: 'كيف ستتعامل مع هذا العميل الغاضب؟'
    },
    {
      type: 'decision',
      content: 'العميل يطالب بتعويض كبير وإلغاء الطلب. لديك عدة خيارات:',
      options: [
        'الاعتذار وتقديم خصم 50%',
        'شرح أسباب التأخير وتقديم خصم 20%',
        'تحويل المكالمة للمدير',
        'تقديم شحن مجاني للطلبات المستقبلية'
      ]
    },
    {
      type: 'action',
      content: 'العميل قبل الحل المقترح. ما هي الخطوات التي ستتخذها لمنع تكرار هذه المشكلة؟',
      question: 'اكتب خطة عمل لتحسين الخدمة'
    }
  ];

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    const mockScenarios: Scenario[] = [
      {
        id: '1',
        title: 'التعامل مع العميل الغاضب',
        description: 'محاكاة للتعامل مع شكاوى العملاء وحل المشاكل بطريقة احترافية',
        category: 'customer_service',
        difficulty: 'intermediate',
        estimatedTime: 15,
        objectives: [
          'تعلم تقنيات التهدئة',
          'حل المشاكل بفعالية',
          'الحفاظ على رضا العميل'
        ],
        created_by: 'مدرب خدمة العملاء',
        isActive: true,
        completions: 45,
        avgScore: 87
      },
      {
        id: '2',
        title: 'مقابلة توظيف صعبة',
        description: 'محاكاة مقابلة عمل مع مرشح يحمل خبرات متضاربة',
        category: 'hr',
        difficulty: 'advanced',
        estimatedTime: 25,
        objectives: [
          'تقييم المهارات الشخصية',
          'طرح الأسئلة الصحيحة',
          'اتخاذ قرار التوظيف'
        ],
        created_by: 'خبير الموارد البشرية',
        isActive: true,
        completions: 32,
        avgScore: 74
      },
      {
        id: '3',
        title: 'إدارة أزمة في المشروع',
        description: 'سيناريو لإدارة أزمة مشروع مع تأخير في التسليم وفريق محبط',
        category: 'management',
        difficulty: 'advanced',
        estimatedTime: 30,
        objectives: [
          'إدارة الأزمات بفعالية',
          'تحفيز الفريق',
          'إيجاد حلول إبداعية'
        ],
        created_by: 'خبير إدارة المشاريع',
        isActive: true,
        completions: 28,
        avgScore: 82
      },
      {
        id: '4',
        title: 'مفاوضات البيع المعقدة',
        description: 'محاكاة مفاوضات بيع معقدة مع عميل كبير يطلب تخفيضات كبيرة',
        category: 'sales',
        difficulty: 'intermediate',
        estimatedTime: 20,
        objectives: [
          'تقنيات التفاوض',
          'إقناع العميل بالقيمة',
          'إغلاق الصفقة بنجاح'
        ],
        created_by: 'مدير المبيعات الأول',
        isActive: true,
        completions: 52,
        avgScore: 79
      }
    ];
    setScenarios(mockScenarios);
  };

  const startSimulation = async (scenario: Scenario) => {
    const newSession: SimulationSession = {
      id: Date.now().toString(),
      scenarioId: scenario.id,
      participantId: 'current-user',
      participantName: 'المتدرب الحالي',
      status: 'active',
      currentStep: 0,
      totalSteps: scenarioSteps.length,
      score: 0,
      startTime: new Date(),
      responses: []
    };

    setCurrentSession(newSession);
    setSelectedScenario(scenario);
    setCurrentStep(0);
    setActiveTab('simulation');

    toast({
      title: isRTL ? 'بدء المحاكاة' : 'Simulation Started',
      description: isRTL ? 'بدأت المحاكاة التفاعلية بنجاح' : 'Interactive simulation started successfully'
    });
  };

  const submitResponse = async () => {
    if (!userResponse.trim() || !currentSession) return;

    setIsProcessing(true);

    try {
      // Simulate AI evaluation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiEvaluation = {
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        feedback: generateAIFeedback(userResponse),
        strengths: generateStrengths(userResponse),
        improvements: generateImprovements(userResponse)
      };

      const newResponse: SimulationResponse = {
        stepId: currentStep.toString(),
        question: scenarioSteps[currentStep].content,
        userResponse,
        aiEvaluation,
        timestamp: new Date()
      };

      const updatedSession = {
        ...currentSession,
        responses: [...currentSession.responses, newResponse],
        score: Math.round((currentSession.score * currentStep + aiEvaluation.score) / (currentStep + 1))
      };

      setCurrentSession(updatedSession);
      setUserResponse('');

      if (currentStep < scenarioSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete simulation
        const finalSession = {
          ...updatedSession,
          status: 'completed' as const,
          endTime: new Date()
        };
        setCurrentSession(finalSession);
        setActiveSessions(prev => [...prev, finalSession]);
        
        toast({
          title: isRTL ? 'انتهت المحاكاة' : 'Simulation Completed',
          description: isRTL ? `تم إكمال المحاكاة بنتيجة ${finalSession.score}%` : `Simulation completed with score ${finalSession.score}%`
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAIFeedback = (response: string): string => {
    const feedbacks = [
      'إجابة جيدة تظهر فهماً عميقاً للموقف وتتضمن حلولاً عملية',
      'أسلوب احترافي في التعامل مع الموضوع مع مراعاة مشاعر الطرف الآخر',
      'حل إبداعي يأخذ في الاعتبار جميع الجوانب المهمة',
      'تعامل متوازن يظهر الخبرة في إدارة المواقف الصعبة'
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const generateStrengths = (response: string): string[] => {
    const strengths = [
      'أسلوب تواصل واضح ومهني',
      'حلول عملية وقابلة للتطبيق',
      'مراعاة مشاعر الأطراف المعنية',
      'نهج منظم في حل المشاكل',
      'استخدام أمثلة ملموسة'
    ];
    return strengths.slice(0, 2 + Math.floor(Math.random() * 2));
  };

  const generateImprovements = (response: string): string[] => {
    const improvements = [
      'يمكن إضافة المزيد من التفاصيل التقنية',
      'تقديم خيارات بديلة أكثر',
      'التركيز على المتابعة طويلة المدى',
      'استخدام أمثلة من واقع الشركة',
      'إشراك الفريق في اتخاذ القرار'
    ];
    return improvements.slice(0, 1 + Math.floor(Math.random() * 2));
  };

  const createScenario = async () => {
    if (!newScenario.title.trim() || !newScenario.description.trim()) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const scenario: Scenario = {
      id: Date.now().toString(),
      title: newScenario.title,
      description: newScenario.description,
      category: newScenario.category as any,
      difficulty: newScenario.difficulty as any,
      estimatedTime: 20,
      objectives: newScenario.objectives.filter(obj => obj.trim()),
      created_by: 'المستخدم الحالي',
      isActive: true,
      completions: 0,
      avgScore: 0
    };

    setScenarios(prev => [scenario, ...prev]);
    setNewScenario({
      title: '',
      description: '',
      category: 'customer_service',
      difficulty: 'beginner',
      objectives: ['']
    });
    setShowCreateDialog(false);

    toast({
      title: isRTL ? 'تم إنشاء السيناريو' : 'Scenario Created',
      description: isRTL ? 'تم إنشاء السيناريو بنجاح' : 'Scenario created successfully'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customer_service': return <MessageSquare className="w-4 h-4" />;
      case 'hr': return <Users className="w-4 h-4" />;
      case 'management': return <Target className="w-4 h-4" />;
      case 'sales': return <TrendingUp className="w-4 h-4" />;
      default: return <Gamepad2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-primary" />
            {isRTL ? 'المحاكاة التدريبية الذكية' : 'AI Training Simulation'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'تدريب تفاعلي ذكي مع تقييم فوري بالذكاء الاصطناعي' : 'Interactive smart training with instant AI evaluation'}
          </p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {isRTL ? 'إنشاء سيناريو' : 'Create Scenario'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء سيناريو جديد' : 'Create New Scenario'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'عنوان السيناريو' : 'Scenario Title'}
                </label>
                <Input
                  value={newScenario.title}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={isRTL ? 'أدخل عنوان السيناريو' : 'Enter scenario title'}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {isRTL ? 'الوصف' : 'Description'}
                </label>
                <Textarea
                  value={newScenario.description}
                  onChange={(e) => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={isRTL ? 'وصف مفصل للسيناريو...' : 'Detailed scenario description...'}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {isRTL ? 'الفئة' : 'Category'}
                  </label>
                  <Select 
                    value={newScenario.category} 
                    onValueChange={(value) => setNewScenario(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer_service">{isRTL ? 'خدمة العملاء' : 'Customer Service'}</SelectItem>
                      <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</SelectItem>
                      <SelectItem value="management">{isRTL ? 'الإدارة' : 'Management'}</SelectItem>
                      <SelectItem value="sales">{isRTL ? 'المبيعات' : 'Sales'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {isRTL ? 'مستوى الصعوبة' : 'Difficulty Level'}
                  </label>
                  <Select 
                    value={newScenario.difficulty} 
                    onValueChange={(value) => setNewScenario(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{isRTL ? 'مبتدئ' : 'Beginner'}</SelectItem>
                      <SelectItem value="intermediate">{isRTL ? 'متوسط' : 'Intermediate'}</SelectItem>
                      <SelectItem value="advanced">{isRTL ? 'متقدم' : 'Advanced'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={createScenario} className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {isRTL ? 'إنشاء السيناريو' : 'Create Scenario'}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">
            {isRTL ? 'السيناريوهات' : 'Scenarios'}
          </TabsTrigger>
          <TabsTrigger value="simulation">
            {isRTL ? 'المحاكاة' : 'Simulation'}
          </TabsTrigger>
          <TabsTrigger value="sessions">
            {isRTL ? 'الجلسات' : 'Sessions'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {isRTL ? 'التحليلات' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="gap-1">
                          {getCategoryIcon(scenario.category)}
                          {isRTL ? 
                            (scenario.category === 'customer_service' ? 'خدمة العملاء' :
                             scenario.category === 'hr' ? 'الموارد البشرية' :
                             scenario.category === 'management' ? 'الإدارة' :
                             scenario.category === 'sales' ? 'المبيعات' : scenario.category) :
                            scenario.category.replace('_', ' ')}
                        </Badge>
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {isRTL ? 
                            (scenario.difficulty === 'beginner' ? 'مبتدئ' :
                             scenario.difficulty === 'intermediate' ? 'متوسط' : 'متقدم') :
                            scenario.difficulty}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{scenario.title}</h3>
                      <p className="text-muted-foreground mb-3">{scenario.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'الوقت المقدر' : 'Estimated Time'}</p>
                          <p className="font-medium">{scenario.estimatedTime} {isRTL ? 'دقيقة' : 'minutes'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'مرات الإكمال' : 'Completions'}</p>
                          <p className="font-medium">{scenario.completions}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'متوسط النتيجة' : 'Avg Score'}</p>
                          <p className="font-medium">{scenario.avgScore}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{isRTL ? 'المنشئ' : 'Created By'}</p>
                          <p className="font-medium">{scenario.created_by}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">{isRTL ? 'الأهداف التعليمية:' : 'Learning Objectives:'}</p>
                        <div className="space-y-1">
                          {scenario.objectives.map((objective, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Target className="w-3 h-3 text-primary" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => startSimulation(scenario)}
                        className="gap-2"
                      >
                        <Play className="w-4 h-4" />
                        {isRTL ? 'بدء المحاكاة' : 'Start Simulation'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          {currentSession && selectedScenario ? (
            <div className="space-y-4">
              {/* Progress Header */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{selectedScenario.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? `الخطوة ${currentStep + 1} من ${scenarioSteps.length}` : 
                                `Step ${currentStep + 1} of ${scenarioSteps.length}`}
                      </p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Star className="w-3 h-3" />
                      {currentSession.score}%
                    </Badge>
                  </div>
                  <Progress value={((currentStep + 1) / scenarioSteps.length) * 100} />
                </CardContent>
              </Card>

              {/* Current Step */}
              {currentStep < scenarioSteps.length && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">{isRTL ? 'الموقف:' : 'Situation:'}</h4>
                        <p className="bg-gray-50 p-4 rounded-lg border-r-4 border-primary">
                          {scenarioSteps[currentStep].content}
                        </p>
                      </div>

                      {scenarioSteps[currentStep].options && (
                        <div>
                          <h4 className="font-medium mb-3">{isRTL ? 'الخيارات المتاحة:' : 'Available Options:'}</h4>
                          <div className="space-y-2">
                            {scenarioSteps[currentStep].options?.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="w-full text-right justify-start h-auto p-4"
                                onClick={() => setUserResponse(option)}
                              >
                                <span className="font-normal">{option}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-3">
                          {scenarioSteps[currentStep].question || (isRTL ? 'ردك:' : 'Your Response:')}
                        </h4>
                        <Textarea
                          value={userResponse}
                          onChange={(e) => setUserResponse(e.target.value)}
                          placeholder={isRTL ? 'اكتب ردك هنا...' : 'Write your response here...'}
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={submitResponse}
                          disabled={!userResponse.trim() || isProcessing}
                          className="gap-2"
                        >
                          {isProcessing ? (
                            <>
                              <Brain className="w-4 h-4 animate-pulse" />
                              {isRTL ? 'جاري التحليل...' : 'AI Analyzing...'}
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              {isRTL ? 'إرسال الرد' : 'Submit Response'}
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => setUserResponse('')}>
                          <RotateCcw className="w-4 h-4" />
                          {isRTL ? 'مسح' : 'Clear'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Previous Responses */}
              {currentSession.responses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">{isRTL ? 'الردود السابقة:' : 'Previous Responses:'}</h4>
                  {currentSession.responses.map((response, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {isRTL ? `الخطوة ${index + 1}:` : `Step ${index + 1}:`}
                            </p>
                            <p className="font-medium">{response.userResponse}</p>
                          </div>
                          
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                {isRTL ? 'تقييم الذكاء الاصطناعي' : 'AI Evaluation'}
                              </span>
                              <Badge variant="outline">{response.aiEvaluation.score}%</Badge>
                            </div>
                            <p className="text-sm text-green-700 mb-2">{response.aiEvaluation.feedback}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div>
                                <p className="font-medium text-green-800 mb-1">
                                  {isRTL ? '✅ نقاط القوة:' : '✅ Strengths:'}
                                </p>
                                {response.aiEvaluation.strengths.map((strength, i) => (
                                  <p key={i} className="text-green-600">• {strength}</p>
                                ))}
                              </div>
                              <div>
                                <p className="font-medium text-green-800 mb-1">
                                  {isRTL ? '💡 التحسينات المقترحة:' : '💡 Suggested Improvements:'}
                                </p>
                                {response.aiEvaluation.improvements.map((improvement, i) => (
                                  <p key={i} className="text-green-600">• {improvement}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Completion Summary */}
              {currentSession.status === 'completed' && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-8 h-8 text-green-600" />
                        <h3 className="text-xl font-bold text-green-800">
                          {isRTL ? 'تم إكمال المحاكاة!' : 'Simulation Completed!'}
                        </h3>
                      </div>
                      
                      <div>
                        <p className="text-3xl font-bold text-green-600 mb-2">{currentSession.score}%</p>
                        <p className="text-green-700">
                          {isRTL ? 'النتيجة الإجمالية' : 'Overall Score'}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-center">
                        <Button className="gap-2">
                          <Download className="w-4 h-4" />
                          {isRTL ? 'تحميل التقرير' : 'Download Report'}
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab('scenarios')}>
                          <RotateCcw className="w-4 h-4" />
                          {isRTL ? 'محاكاة أخرى' : 'New Simulation'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">
                  {isRTL ? 'لم تبدأ أي محاكاة بعد' : 'No Active Simulation'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isRTL ? 'اختر سيناريو من القائمة لبدء المحاكاة التفاعلية' : 'Select a scenario from the list to start interactive simulation'}
                </p>
                <Button onClick={() => setActiveTab('scenarios')} className="gap-2">
                  <Play className="w-4 h-4" />
                  {isRTL ? 'اختيار سيناريو' : 'Choose Scenario'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="grid gap-4">
            {activeSessions.map((session) => {
              const scenario = scenarios.find(s => s.id === session.scenarioId);
              return (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{scenario?.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {session.participantName} - {session.startTime.toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{isRTL ? 'النتيجة:' : 'Score:'} <span className="font-medium">{session.score}%</span></span>
                          <span>{isRTL ? 'المدة:' : 'Duration:'} 
                            {session.endTime ? 
                              ` ${Math.round((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60))} ${isRTL ? 'دقيقة' : 'min'}` :
                              ` ${isRTL ? 'قيد التقدم' : 'In Progress'}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {activeSessions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">
                    {isRTL ? 'لا توجد جلسات' : 'No Sessions'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'لم يتم إكمال أي جلسات محاكاة بعد' : 'No simulation sessions completed yet'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'محاكاة مكتملة' : 'Completed Simulations'}
                    </p>
                    <p className="text-2xl font-bold">{activeSessions.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'متوسط النتائج' : 'Average Score'}
                    </p>
                    <p className="text-2xl font-bold">
                      {activeSessions.length > 0 ? 
                        Math.round(activeSessions.reduce((sum, s) => sum + s.score, 0) / activeSessions.length) :
                        0}%
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'إجمالي وقت التدريب' : 'Total Training Time'}
                    </p>
                    <p className="text-2xl font-bold">
                      {scenarios.reduce((sum, s) => sum + s.estimatedTime * s.completions, 0)} {isRTL ? 'د' : 'min'}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {isRTL ? 'تحليل الأداء بالفئة' : 'Performance Analysis by Category'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['customer_service', 'hr', 'management', 'sales'].map((category) => {
                  const categoryScenarios = scenarios.filter(s => s.category === category);
                  const avgScore = categoryScenarios.length > 0 ? 
                    Math.round(categoryScenarios.reduce((sum, s) => sum + s.avgScore, 0) / categoryScenarios.length) : 0;
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="font-medium">
                          {isRTL ? 
                            (category === 'customer_service' ? 'خدمة العملاء' :
                             category === 'hr' ? 'الموارد البشرية' :
                             category === 'management' ? 'الإدارة' : 'المبيعات') :
                            category.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={avgScore} className="w-24" />
                        <span className="text-sm font-medium w-12">{avgScore}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};