import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  MessageSquare, 
  Star, 
  Calendar, 
  Target,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Zap,
  Coffee,
  User,
  Users,
  Send
} from 'lucide-react';

export const ContinuousSystem = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  // Add handlers for continuous system
  const handleScheduleOneOnOne = () => {
    toast({
      title: isRTL ? 'جدولة اجتماع 1:1' : 'Schedule 1:1',
      description: isRTL ? 'جاري فتح نموذج جدولة الاجتماع' : 'Opening meeting scheduling form'
    });
  };

  const handleAddMicroGoal = () => {
    toast({
      title: isRTL ? 'إضافة هدف مصغر' : 'Add Micro-Goal',
      description: isRTL ? 'جاري فتح نموذج الهدف المصغر' : 'Opening micro-goal form'
    });
  };

  const handleViewMeetingDetails = (meetingId: string) => {
    toast({
      title: isRTL ? 'عرض التفاصيل' : 'View Details',
      description: isRTL ? 'عرض تفاصيل الاجتماع' : 'Viewing meeting details'
    });
  };

  const handleStartMeeting = (meetingId: string) => {
    toast({
      title: isRTL ? 'بدء الاجتماع' : 'Start Meeting',
      description: isRTL ? 'جاري بدء الاجتماع' : 'Starting the meeting'
    });
  };

  const handleEditGoal = (goalId: string) => {
    toast({
      title: isRTL ? 'تعديل الهدف' : 'Edit Goal',
      description: isRTL ? 'جاري فتح محرر الهدف' : 'Opening goal editor'
    });
  };

  const handleUpdateProgress = (goalId: string) => {
    toast({
      title: isRTL ? 'تحديث التقدم' : 'Update Progress',
      description: isRTL ? 'جاري تحديث تقدم الهدف' : 'Updating goal progress'
    });
  };

  const handleSendFeedback = () => {
    toast({
      title: isRTL ? 'إرسال تغذية راجعة' : 'Send Feedback',
      description: isRTL ? 'جاري فتح نموذج التغذية الراجعة' : 'Opening feedback form'
    });
  };

  const handleGiveRecognition = () => {
    toast({
      title: isRTL ? 'إعطاء تقدير' : 'Give Recognition',
      description: isRTL ? 'جاري فتح نموذج التقدير' : 'Opening recognition form'
    });
  };

  // Sample data for continuous performance management
  const oneOnOnes = [
    {
      id: '1',
      date: '2024-01-15',
      manager: isRTL ? 'أحمد محمد السعيد' : 'Ahmed Mohammed Al-Saeed',
      employee: isRTL ? 'فاطمة علي الزهراني' : 'Fatima Ali Al-Zahrani',
      status: 'completed',
      duration: 45,
      topics: [
        isRTL ? 'مراجعة إنجازات الأسبوع' : 'Weekly achievements review',
        isRTL ? 'التحديات الحالية' : 'Current challenges',
        isRTL ? 'خطة الأسبوع القادم' : 'Next week planning'
      ],
      outcomes: isRTL ? 'تم تحديد 3 أهداف جديدة للأسبوع القادم' : 'Identified 3 new goals for next week'
    },
    {
      id: '2',
      date: '2024-01-22',
      manager: isRTL ? 'أحمد محمد السعيد' : 'Ahmed Mohammed Al-Saeed',
      employee: isRTL ? 'محمد عبدالله القحطاني' : 'Mohammed Abdullah Al-Qahtani',
      status: 'scheduled',
      duration: 30,
      topics: [
        isRTL ? 'مراجعة تقدم المشروع' : 'Project progress review',
        isRTL ? 'الدعم المطلوب' : 'Required support',
        isRTL ? 'فرص التطوير' : 'Development opportunities'
      ]
    }
  ];

  const microGoals = [
    {
      id: '1',
      title: isRTL ? 'إكمال تحليل السوق Q1' : 'Complete Q1 Market Analysis',
      description: isRTL ? 'إعداد تقرير شامل عن اتجاهات السوق للربع الأول' : 'Prepare comprehensive report on Q1 market trends',
      dueDate: '2024-01-30',
      progress: 75,
      status: 'on_track',
      priority: 'high'
    },
    {
      id: '2',
      title: isRTL ? 'تحسين عملية المبيعات' : 'Improve Sales Process',
      description: isRTL ? 'تطوير وتوثيق عملية مبيعات محسّنة' : 'Develop and document improved sales process',
      dueDate: '2024-02-15',
      progress: 40,
      status: 'at_risk',
      priority: 'medium'
    },
    {
      id: '3',
      title: isRTL ? 'دورة تدريبية في القيادة' : 'Leadership Training Course',
      description: isRTL ? 'إكمال برنامج القيادة التنفيذية' : 'Complete executive leadership program',
      dueDate: '2024-03-01',
      progress: 20,
      status: 'on_track',
      priority: 'low'
    }
  ];

  const feedbackItems = [
    {
      id: '1',
      type: 'recognition',
      from: isRTL ? 'سارة أحمد المطيري' : 'Sarah Ahmed Al-Mutairi',
      to: isRTL ? 'فاطمة علي الزهراني' : 'Fatima Ali Al-Zahrani',
      message: isRTL ? 'عمل رائع في إدارة مشروع التسويق الرقمي!' : 'Excellent work managing the digital marketing project!',
      date: '2024-01-20',
      category: 'teamwork'
    },
    {
      id: '2',
      type: 'feedback',
      from: isRTL ? 'أحمد محمد السعيد' : 'Ahmed Mohammed Al-Saeed',
      to: isRTL ? 'محمد عبدالله القحطاني' : 'Mohammed Abdullah Al-Qahtani',
      message: isRTL ? 'اقتراح: يمكن تحسين التواصل مع العملاء' : 'Suggestion: Could improve customer communication',
      date: '2024-01-18',
      category: 'communication'
    },
    {
      id: '3',
      type: 'kudos',
      from: isRTL ? 'العميل - شركة التقنية المتقدمة' : 'Client - Advanced Tech Company',
      to: isRTL ? 'فاطمة علي الزهراني' : 'Fatima Ali Al-Zahrani',
      message: isRTL ? 'خدمة عملاء ممتازة وحلول مبتكرة' : 'Excellent customer service and innovative solutions',
      date: '2024-01-19',
      category: 'customer_service'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success border-success/30">{isRTL ? 'مكتمل' : 'Completed'}</Badge>;
      case 'scheduled':
        return <Badge className="bg-primary/20 text-primary border-primary/30">{isRTL ? 'مجدول' : 'Scheduled'}</Badge>;
      case 'on_track':
        return <Badge className="bg-success/20 text-success border-success/30">{isRTL ? 'على المسار' : 'On Track'}</Badge>;
      case 'at_risk':
        return <Badge className="bg-warning/20 text-warning border-warning/30">{isRTL ? 'في خطر' : 'At Risk'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return null;
    }
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'recognition':
        return <Award className="w-4 h-4 text-warning" />;
      case 'feedback':
        return <MessageSquare className="w-4 h-4 text-primary" />;
      case 'kudos':
        return <Star className="w-4 h-4 text-success" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            {isRTL ? 'نظام الإدارة المستمرة للأداء' : 'Continuous Performance Management'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isRTL ? 'متابعة مستمرة وتغذية راجعة فورية' : 'Ongoing tracking and instant feedback'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handleScheduleOneOnOne}>
            <Calendar className="w-4 h-4" />
            {isRTL ? 'جدولة 1:1' : 'Schedule 1:1'}
          </Button>
          <Button className="gap-2" onClick={handleAddMicroGoal}>
            <Plus className="w-4 h-4" />
            {isRTL ? 'إضافة هدف مصغر' : 'Add Micro-Goal'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30 p-1 rounded-xl">
          <TabsTrigger value="dashboard" className="rounded-lg">
            {isRTL ? 'لوحة القيادة' : 'Dashboard'}
          </TabsTrigger>
          <TabsTrigger value="one_on_ones" className="rounded-lg">
            {isRTL ? 'اجتماعات 1:1' : '1:1 Meetings'}
          </TabsTrigger>
          <TabsTrigger value="micro_goals" className="rounded-lg">
            {isRTL ? 'أهداف مصغرة' : 'Micro-Goals'}
          </TabsTrigger>
          <TabsTrigger value="feedback" className="rounded-lg">
            {isRTL ? 'التغذية الراجعة' : 'Feedback'}
          </TabsTrigger>
          <TabsTrigger value="recognition" className="rounded-lg">
            {isRTL ? 'التقدير' : 'Recognition'}
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'اجتماعات 1:1 هذا الشهر' : '1:1s This Month'}</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-success">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'أهداف مكتملة' : 'Goals Completed'}</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                  <Target className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-warning">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'تغذية راجعة إيجابية' : 'Positive Feedback'}</p>
                    <p className="text-2xl font-bold text-foreground">15</p>
                  </div>
                  <Star className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'نقاط التقدير' : 'Recognition Points'}</p>
                    <p className="text-2xl font-bold text-foreground">247</p>
                  </div>
                  <Award className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {isRTL ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
                    <Coffee className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {isRTL ? 'اجتماع 1:1 مكتمل' : '1:1 Meeting Completed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isRTL ? 'مع فاطمة علي الزهراني - منذ ساعتين' : 'with Fatima Al-Zahrani - 2h ago'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {isRTL ? 'هدف مصغر مكتمل' : 'Micro-Goal Completed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isRTL ? 'تحليل السوق Q1 - منذ 4 ساعات' : 'Q1 Market Analysis - 4h ago'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                    <Star className="w-5 h-5 text-warning" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {isRTL ? 'تقدير جديد' : 'New Recognition'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isRTL ? 'من العميل - خدمة ممتازة - أمس' : 'From client - Excellent service - Yesterday'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {isRTL ? 'تقدم الأهداف المصغرة' : 'Micro-Goals Progress'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {microGoals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          {getPriorityIcon(goal.priority)}
                          {goal.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 1:1 Meetings Tab */}
        <TabsContent value="one_on_ones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                {isRTL ? 'اجتماعات 1:1' : '1:1 Meetings'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'اجتماعات دورية بين المدير والموظف' : 'Regular one-on-one meetings between manager and employee'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {oneOnOnes.map((meeting) => (
                  <Card key={meeting.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {meeting.manager} & {meeting.employee}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString()} • {meeting.duration} {isRTL ? 'دقيقة' : 'min'}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(meeting.status)}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">
                            {isRTL ? 'موضوعات المناقشة:' : 'Discussion Topics:'}
                          </h5>
                          <ul className="space-y-1">
                            {meeting.topics.map((topic, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {meeting.outcomes && (
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-1">
                              {isRTL ? 'النتائج:' : 'Outcomes:'}
                            </h5>
                            <p className="text-sm text-muted-foreground">{meeting.outcomes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewMeetingDetails(meeting.id)}>
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        {meeting.status === 'scheduled' && (
                          <Button size="sm" onClick={() => handleStartMeeting(meeting.id)}>
                            {isRTL ? 'ابدأ الاجتماع' : 'Start Meeting'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full gap-2 mt-6">
                <Plus className="w-4 h-4" />
                {isRTL ? 'جدولة اجتماع 1:1 جديد' : 'Schedule New 1:1 Meeting'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Micro-Goals Tab */}
        <TabsContent value="micro_goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {isRTL ? 'الأهداف المصغرة' : 'Micro-Goals'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'أهداف قصيرة المدى مع تواريخ استحقاق وتذكيرات' : 'Short-term goals with due dates and reminders'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {microGoals.map((goal) => (
                  <Card key={goal.id} className="border-l-4 border-l-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getPriorityIcon(goal.priority)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {isRTL ? 'موعد الاستحقاق:' : 'Due:'} {new Date(goal.dueDate).toLocaleDateString()}
                              </span>
                              <span className="capitalize">
                                {isRTL ? 'أولوية' : 'Priority'}: {goal.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(goal.status)}
                          <Button size="sm" variant="outline">
                            {isRTL ? 'تحديث' : 'Update'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'التقدم' : 'Progress'}</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full gap-2 mt-6">
                <Plus className="w-4 h-4" />
                {isRTL ? 'إضافة هدف مصغر جديد' : 'Add New Micro-Goal'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {isRTL ? 'التغذية الراجعة الفورية' : 'Instant Feedback'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تبادل التغذية الراجعة في الوقت الفعلي' : 'Real-time feedback exchange'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackItems.map((item) => (
                  <Card key={item.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          {getFeedbackIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-foreground">{item.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium text-foreground">{item.to}</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.message}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 border-2 border-dashed border-primary/30 rounded-xl">
                <h4 className="font-medium text-foreground mb-3">
                  {isRTL ? 'إضافة تغذية راجعة جديدة' : 'Add New Feedback'}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">{isRTL ? 'إلى' : 'To'}</Label>
                    <Input placeholder={isRTL ? 'اختر الموظف...' : 'Select employee...'} />
                  </div>
                  <div>
                    <Label className="text-sm">{isRTL ? 'الرسالة' : 'Message'}</Label>
                    <Textarea placeholder={isRTL ? 'اكتب تغذيتك الراجعة هنا...' : 'Write your feedback here...'} />
                  </div>
                  <Button className="gap-2">
                    <Send className="w-4 h-4" />
                    {isRTL ? 'إرسال' : 'Send Feedback'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recognition Tab */}
        <TabsContent value="recognition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                {isRTL ? 'نظام التقدير والمكافآت' : 'Recognition & Rewards System'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تقدير الإنجازات وتوزيع الشارات والمكافآت' : 'Recognize achievements and distribute badges and rewards'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {isRTL ? 'الشارات المتاحة' : 'Available Badges'}
                  </h4>
                  <div className="grid gap-3">
                    {[
                      { name: isRTL ? 'نجم الفريق' : 'Team Star', icon: '⭐', color: 'bg-warning/20' },
                      { name: isRTL ? 'مبتكر الشهر' : 'Innovator of the Month', icon: '💡', color: 'bg-primary/20' },
                      { name: isRTL ? 'خدمة العملاء المميزة' : 'Excellent Customer Service', icon: '🏆', color: 'bg-success/20' },
                      { name: isRTL ? 'قائد المشروع' : 'Project Leader', icon: '👑', color: 'bg-purple-100' }
                    ].map((badge, index) => (
                      <div key={index} className={`p-3 ${badge.color} rounded-lg flex items-center gap-3 cursor-pointer hover:shadow-soft transition-all duration-300`}>
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="font-medium text-foreground">{badge.name}</span>
                        <Button size="sm" variant="outline" className="ml-auto">
                          {isRTL ? 'منح' : 'Award'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {isRTL ? 'أفضل المؤدين' : 'Top Performers'}
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: isRTL ? 'فاطمة علي الزهراني' : 'Fatima Al-Zahrani', points: 247, badges: 3 },
                      { name: isRTL ? 'محمد عبدالله القحطاني' : 'Mohammed Al-Qahtani', points: 189, badges: 2 },
                      { name: isRTL ? 'سارة أحمد المطيري' : 'Sarah Al-Mutairi', points: 156, badges: 2 }
                    ].map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <span className="font-medium text-foreground">{performer.name}</span>
                            <div className="text-xs text-muted-foreground">
                              {performer.badges} {isRTL ? 'شارات' : 'badges'}
                            </div>
                          </div>
                        </div>
                        <span className="font-bold text-primary">{performer.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};