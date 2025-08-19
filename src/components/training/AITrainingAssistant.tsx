import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Send, 
  Mic, 
  MicOff, 
  User, 
  Bot, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  Target,
  Users,
  Clock,
  Award,
  BarChart3,
  Zap,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AITrainingAssistantProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
}

interface TrainingInsight {
  id: string;
  title: string;
  description: string;
  type: 'performance' | 'recommendation' | 'risk' | 'opportunity';
  severity: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export const AIAssistant: React.FC<AITrainingAssistantProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'recommendations'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sample training insights
  const [insights] = useState<TrainingInsight[]>([
    {
      id: '1',
      title: isRTL ? 'انخفاض معدل إكمال الدورة' : 'Low Course Completion Rate',
      description: isRTL ? 'دورة "إدارة المشاريع" لديها معدل إكمال 45% فقط. يُنصح بمراجعة المحتوى وإضافة عناصر تفاعلية.' : 'Project Management course has only 45% completion rate. Consider reviewing content and adding interactive elements.',
      type: 'risk',
      severity: 'high',
      actionable: true
    },
    {
      id: '2',
      title: isRTL ? 'أداء ممتاز في التسويق الرقمي' : 'Excellent Performance in Digital Marketing',
      description: isRTL ? 'معدل رضا المتدربين 96% مع تحسن ملحوظ في النتائج. يمكن استخدام هذا النموذج في دورات أخرى.' : '96% learner satisfaction with notable improvement in results. This model can be applied to other courses.',
      type: 'performance',
      severity: 'low',
      actionable: true
    },
    {
      id: '3',
      title: isRTL ? 'فرصة لدورة جديدة في الذكاء الاصطناعي' : 'Opportunity for New AI Course',
      description: isRTL ? 'طلبات متزايدة من الموظفين لتعلم تقنيات الذكاء الاصطناعي. يُنصح بإنشاء مسار تعليمي متخصص.' : 'Increasing employee requests for AI technology learning. Consider creating a specialized learning path.',
      type: 'opportunity',
      severity: 'medium',
      actionable: true
    }
  ]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content: isRTL 
        ? 'أهلاً بك! أنا مساعدك الذكي للتدريب. يمكنني مساعدتك في تحليل أداء الدورات، اقتراح تحسينات، إنشاء محتوى تدريبي، وتقديم رؤى حول تطوير المهارات. كيف يمكنني مساعدتك اليوم؟'
        : 'Welcome! I\'m your AI Training Assistant. I can help you analyze course performance, suggest improvements, create training content, and provide insights on skill development. How can I assist you today?',
      timestamp: new Date(),
      suggestions: isRTL 
        ? ['تحليل أداء الدورات', 'اقتراح دورة جديدة', 'تحسين المحتوى التدريبي', 'تقييم المتدربين']
        : ['Analyze course performance', 'Suggest new course', 'Improve training content', 'Evaluate learners']
    };
    
    setMessages([welcomeMessage]);
  }, [isRTL]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call AI service (simulated response for now)
      const response = await generateAIResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        data: response.data
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: isRTL 
          ? 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.' 
          : 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (input: string): Promise<{content: string, suggestions?: string[], data?: any}> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple pattern matching for demo purposes
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('أداء') || lowerInput.includes('performance')) {
      return {
        content: isRTL 
          ? 'بناءً على تحليل البيانات، إليك أهم مؤشرات الأداء:\n\n📊 معدل إكمال الدورات: 73%\n🎯 رضا المتدربين: 4.6/5\n⏱️ متوسط وقت التعلم: 12 ساعة\n🏆 معدل النجاح في الاختبارات: 87%\n\nهناك مجال للتحسين في معدل الإكمال. أقترح إضافة المزيد من العناصر التفاعلية والحوافز.'
          : 'Based on data analysis, here are the key performance indicators:\n\n📊 Course completion rate: 73%\n🎯 Learner satisfaction: 4.6/5\n⏱️ Average learning time: 12 hours\n🏆 Test success rate: 87%\n\nThere\'s room for improvement in completion rate. I suggest adding more interactive elements and incentives.',
        suggestions: isRTL 
          ? ['تفاصيل أكثر عن الأداء', 'خطة تحسين الإكمال', 'مقارنة مع الفترة السابقة', 'تحليل المتدربين المتميزين']
          : ['More performance details', 'Completion improvement plan', 'Compare with previous period', 'Analyze top performers']
      };
    }

    if (lowerInput.includes('دورة جديدة') || lowerInput.includes('new course')) {
      return {
        content: isRTL 
          ? 'بناءً على احتياجات الموظفين الحالية، أقترح الدورات التالية:\n\n🤖 **الذكاء الاصطناعي للأعمال** (طلب عالي)\n📱 **التحول الرقمي وإدارة التغيير**\n🎯 **القيادة عن بُعد وإدارة الفرق الافتراضية**\n📊 **تحليل البيانات للمديرين**\n\nأي منها يثير اهتمامك أكثر؟ يمكنني مساعدتك في إنشاء المنهج والمحتوى.'
          : 'Based on current employee needs, I suggest these courses:\n\n🤖 **AI for Business** (high demand)\n📱 **Digital Transformation & Change Management**\n🎯 **Remote Leadership & Virtual Team Management**\n📊 **Data Analytics for Managers**\n\nWhich one interests you most? I can help create the curriculum and content.',
        suggestions: isRTL 
          ? ['إنشاء منهج الذكاء الاصطناعي', 'تفاصيل التحول الرقمي', 'مدة وتكلفة الدورات', 'متطلبات المدربين']
          : ['Create AI curriculum', 'Digital transformation details', 'Course duration & costs', 'Instructor requirements']
      };
    }

    if (lowerInput.includes('تحسين') || lowerInput.includes('improve')) {
      return {
        content: isRTL 
          ? 'إليك أفضل الممارسات لتحسين التدريب:\n\n🎮 **التعلم التفاعلي**: إضافة محاكاة وألعاب تعليمية\n📹 **الفيديو القصير**: تقسيم المحتوى لمقاطع 5-7 دقائق\n👥 **التعلم الاجتماعي**: مجموعات نقاش ومشاريع تعاونية\n🏅 **نظام النقاط**: حوافز وشارات للإنجازات\n📱 **التعلم المتنقل**: محتوى متوافق مع الهواتف\n\nأي جانب تريد التركيز عليه أولاً؟'
          : 'Here are best practices for training improvement:\n\n🎮 **Interactive Learning**: Add simulations and educational games\n📹 **Short Videos**: Break content into 5-7 minute segments\n👥 **Social Learning**: Discussion groups and collaborative projects\n🏅 **Gamification**: Incentives and badges for achievements\n📱 **Mobile Learning**: Mobile-friendly content\n\nWhich aspect would you like to focus on first?',
        suggestions: isRTL 
          ? ['إضافة محاكاة تفاعلية', 'تصميم نظام النقاط', 'إنشاء مجموعات نقاش', 'تطوير تطبيق موبايل']
          : ['Add interactive simulations', 'Design point system', 'Create discussion groups', 'Develop mobile app']
      };
    }

    // Default response
    return {
      content: isRTL 
        ? 'شكراً لسؤالك. يمكنني مساعدتك في عدة مجالات:\n\n📈 تحليل وتقييم أداء التدريب\n💡 اقتراح دورات جديدة بناءً على الاحتياجات\n🎯 تطوير وتحسين المحتوى التدريبي\n🤖 استخدام الذكاء الاصطناعي في التعلم\n📊 إنشاء تقارير ومؤشرات أداء\n\nما الذي تود معرفة المزيد عنه؟'
        : 'Thank you for your question. I can help you in several areas:\n\n📈 Analyze and evaluate training performance\n💡 Suggest new courses based on needs\n🎯 Develop and improve training content\n🤖 Use AI in learning\n📊 Create reports and KPIs\n\nWhat would you like to know more about?',
      suggestions: isRTL 
        ? ['تحليل الأداء الحالي', 'اقتراح دورات جديدة', 'تحسين المحتوى', 'استخدام الذكاء الاصطناعي']
        : ['Analyze current performance', 'Suggest new courses', 'Improve content', 'Use AI features']
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = isRTL ? 'ar-SA' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'risk': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'opportunity': return <Sparkles className="h-4 w-4 text-blue-500" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="h-[70vh] flex flex-col">
      {/* Header with tabs */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
            <h2 className="text-lg font-semibold">
              {isRTL ? 'المساعد الذكي للتدريب' : 'AI Training Assistant'}
            </h2>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {isRTL ? 'متصل' : 'Online'}
          </Badge>
        </div>
        
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('chat')}
            className="flex-1"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {isRTL ? 'المحادثة' : 'Chat'}
          </Button>
          <Button
            variant={activeTab === 'insights' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('insights')}
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            {isRTL ? 'الرؤى' : 'Insights'}
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('recommendations')}
            className="flex-1"
          >
            <Lightbulb className="h-4 w-4 mr-1" />
            {isRTL ? 'التوصيات' : 'Recommendations'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                          <div className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground ml-4'
                              : 'bg-card border border-border mr-4'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                          {message.suggestions && (
                            <div className="mt-2 mr-4 space-y-1">
                              <p className="text-xs text-muted-foreground">
                                {isRTL ? 'اقتراحات:' : 'Suggestions:'}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 border-border hover:bg-accent"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-card border border-border p-3 rounded-lg mr-4">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    className="pr-12 border-border"
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute ${isRTL ? 'left-1' : 'right-1'} top-1/2 transform -translate-y-1/2 h-8 w-8 p-0`}
                    onClick={startVoiceInput}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {isRTL ? 'رؤى التدريب الذكية' : 'Smart Training Insights'}
            </h3>
            
            <div className="space-y-3">
              {insights.map((insight) => (
                <Card key={insight.id} className={`border ${getSeverityColor(insight.severity)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                      {insight.actionable && (
                        <Button size="sm" variant="outline" className="shrink-0 text-xs">
                          {isRTL ? 'اتخاذ إجراء' : 'Take Action'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {isRTL ? 'التوصيات الذكية' : 'Smart Recommendations'}
            </h3>
            
            <div className="grid gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        {isRTL ? 'إنشاء دورة الذكاء الاصطناعي' : 'Create AI Course'}
                      </h4>
                      <p className="text-sm text-blue-800 mb-2">
                        {isRTL 
                          ? 'بناءً على الطلبات المتزايدة، يُنصح بإنشاء دورة شاملة في الذكاء الاصطناعي للأعمال.'
                          : 'Based on increasing demand, recommend creating a comprehensive AI for Business course.'
                        }
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        {isRTL ? 'بدء الإنشاء' : 'Start Creating'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-1">
                        {isRTL ? 'تحسين معدل الإكمال' : 'Improve Completion Rate'}
                      </h4>
                      <p className="text-sm text-green-800 mb-2">
                        {isRTL 
                          ? 'إضافة عناصر تفاعلية ونقاط تحفيزية يمكن أن ترفع معدل الإكمال بنسبة 25%.'
                          : 'Adding interactive elements and gamification can increase completion rate by 25%.'
                        }
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        {isRTL ? 'تطبيق التحسينات' : 'Apply Improvements'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900 mb-1">
                        {isRTL ? 'التعلم الشخصي المدعوم بالذكاء الاصطناعي' : 'AI-Powered Personalized Learning'}
                      </h4>
                      <p className="text-sm text-purple-800 mb-2">
                        {isRTL 
                          ? 'تفعيل خوارزميات التعلم التكيفي لتخصيص المحتوى حسب احتياجات كل متدرب.'
                          : 'Enable adaptive learning algorithms to customize content based on individual learner needs.'
                        }
                      </p>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        {isRTL ? 'تفعيل الميزة' : 'Enable Feature'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};