import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, User, Send, Mic, MicOff, Volume2, VolumeX, 
  MessageCircle, BarChart3, Settings, Copy, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIAssistantChat = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: isRTL 
        ? 'مرحباً! أنا مساعدك الذكي في الموارد البشرية. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m your HR AI assistant. How can I help you today?',
      timestamp: new Date(),
      suggestions: isRTL 
        ? ['ما هو رصيد إجازاتي؟', 'عرض تقرير الأداء', 'معلومات الراتب', 'سياسات الشركة']
        : ['What\'s my leave balance?', 'Show performance report', 'Salary information', 'Company policies']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeView, setActiveView] = useState('employee');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      suggestions: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, activeView);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query, view) => {
    const lowerQuery = query.toLowerCase();
    let response = '';
    let suggestions = [];

    if (view === 'employee') {
      if (lowerQuery.includes('leave') || lowerQuery.includes('إجازة')) {
        response = isRTL 
          ? 'رصيد إجازاتك الحالي: 18 يوم سنوي، 5 أيام مرضية، 3 أيام طارئة. آخر إجازة مستخدمة كانت في 15 مايو 2024.'
          : 'Your current leave balance: 18 annual days, 5 sick days, 3 emergency days. Last leave taken on May 15, 2024.';
        suggestions = isRTL 
          ? ['طلب إجازة جديدة', 'تاريخ الإجازات', 'سياسة الإجازات']
          : ['Request new leave', 'Leave history', 'Leave policy'];
      } else if (lowerQuery.includes('salary') || lowerQuery.includes('راتب')) {
        response = isRTL 
          ? 'راتبك الحالي: 15,000 ريال شهرياً. آخر زيادة كانت في يناير 2024 بنسبة 8%. موعد المراجعة القادمة في ديسمبر 2024.'
          : 'Your current salary: SAR 15,000/month. Last increase in January 2024 (8%). Next review in December 2024.';
        suggestions = isRTL 
          ? ['تفاصيل الراتب', 'سجل الزيادات', 'البدلات والخصومات']
          : ['Salary breakdown', 'Increase history', 'Allowances & deductions'];
      } else if (lowerQuery.includes('performance') || lowerQuery.includes('أداء')) {
        response = isRTL 
          ? 'تقييم أداءك الحالي: ممتاز (4.8/5). نقاط القوة: القيادة، التعاون. مجالات التحسين: إدارة الوقت. التقييم القادم في نوفمبر 2024.'
          : 'Your current performance rating: Excellent (4.8/5). Strengths: Leadership, Collaboration. Improvement areas: Time management. Next review in November 2024.';
        suggestions = isRTL 
          ? ['تقرير الأداء التفصيلي', 'خطة التطوير', 'الأهداف الحالية']
          : ['Detailed performance report', 'Development plan', 'Current goals'];
      }
    } else if (view === 'manager') {
      if (lowerQuery.includes('team') || lowerQuery.includes('فريق')) {
        response = isRTL 
          ? 'إحصائيات فريقك: 12 موظف، متوسط الأداء 4.2/5، معدل الحضور 95%، 3 موظفين في فترة الاختبار، لا توجد مخاطر تسريب حالياً.'
          : 'Your team stats: 12 employees, avg performance 4.2/5, attendance rate 95%, 3 on probation, no current attrition risks.';
        suggestions = isRTL 
          ? ['تقرير الفريق التفصيلي', 'خطط التطوير', 'تحليل المخاطر']
          : ['Detailed team report', 'Development plans', 'Risk analysis'];
      } else if (lowerQuery.includes('attrition') || lowerQuery.includes('تسريب')) {
        response = isRTL 
          ? 'تحليل مخاطر التسريب: منخفض (8%). العوامل المؤثرة: الرضا الوظيفي عالي، فرص التطوير متاحة. توصية: مراجعة رواتب المستوى المتوسط.'
          : 'Attrition risk analysis: Low (8%). Contributing factors: High job satisfaction, available growth opportunities. Recommendation: Review mid-level salaries.';
        suggestions = isRTL 
          ? ['تقرير المخاطر التفصيلي', 'خطة الاحتفاظ', 'تحليل الأسباب']
          : ['Detailed risk report', 'Retention plan', 'Root cause analysis'];
      }
    } else if (view === 'hr') {
      if (lowerQuery.includes('analytics') || lowerQuery.includes('تحليلات')) {
        response = isRTL 
          ? 'تحليلات الموارد البشرية: إجمالي الموظفين 245، معدل دوران 12%، متوسط مدة الخدمة 3.2 سنة، تكلفة التوظيف 8,500 ريال/موظف.'
          : 'HR Analytics: Total employees 245, turnover rate 12%, avg tenure 3.2 years, hiring cost SAR 8,500/employee.';
        suggestions = isRTL 
          ? ['تقرير شامل', 'مقارنة بالمعايير', 'توقعات النمو']
          : ['Comprehensive report', 'Benchmark comparison', 'Growth projections'];
      }
    }

    if (!response) {
      response = isRTL 
        ? 'عذراً، لم أتمكن من فهم استفسارك بوضوح. هل يمكنك إعادة صياغته؟'
        : 'I\'m sorry, I didn\'t quite understand your query. Could you please rephrase it?';
      suggestions = isRTL 
        ? ['مساعدة', 'الأسئلة الشائعة', 'تواصل مع الدعم']
        : ['Help', 'FAQ', 'Contact support'];
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      toast({
        title: isRTL ? 'تم إيقاف التسجيل' : 'Recording stopped',
        description: isRTL ? 'تم إيقاف التسجيل الصوتي' : 'Voice recording has been stopped'
      });
    } else {
      setIsListening(true);
      toast({
        title: isRTL ? 'بدء التسجيل' : 'Recording started',
        description: isRTL ? 'ابدأ بالتحدث الآن' : 'Start speaking now'
      });
    }
  };

  const toggleSpeaker = () => {
    setIsSpeaking(!isSpeaking);
    toast({
      title: isSpeaking 
        ? (isRTL ? 'تم إيقاف الصوت' : 'Audio disabled')
        : (isRTL ? 'تم تشغيل الصوت' : 'Audio enabled'),
      description: isSpeaking 
        ? (isRTL ? 'لن يتم تشغيل الردود الصوتية' : 'Voice responses disabled')
        : (isRTL ? 'سيتم تشغيل الردود الصوتية' : 'Voice responses enabled')
    });
  };

  return (
    <div className="space-y-6">
      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              {isRTL ? 'المساعد الذكي للموارد البشرية' : 'HR AI Assistant'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isSpeaking ? "default" : "outline"}
                onClick={toggleSpeaker}
              >
                {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Badge variant="secondary">
                {isRTL ? 'متصل' : 'Online'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* View Selector */}
          <Tabs value={activeView} onValueChange={setActiveView} className="mb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="employee">{isRTL ? 'موظف' : 'Employee'}</TabsTrigger>
              <TabsTrigger value="manager">{isRTL ? 'مدير' : 'Manager'}</TabsTrigger>
              <TabsTrigger value="hr">{isRTL ? 'موارد بشرية' : 'HR/Admin'}</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Messages Area */}
          <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/20">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`space-y-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.type === 'bot' && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="outline"
                              className="text-xs h-7"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="p-2 rounded-full bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-card border">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              size="sm"
              variant={isListening ? "default" : "outline"}
              onClick={toggleVoice}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'أسئلة شائعة' : 'Common Questions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(activeView === 'employee' ? [
              { q: isRTL ? 'ما هو رصيد إجازاتي؟' : 'What\'s my leave balance?', icon: MessageCircle },
              { q: isRTL ? 'عرض تقرير الأداء' : 'Show performance report', icon: BarChart3 },
              { q: isRTL ? 'سياسات الشركة' : 'Company policies', icon: Settings }
            ] : activeView === 'manager' ? [
              { q: isRTL ? 'إحصائيات الفريق' : 'Team statistics', icon: BarChart3 },
              { q: isRTL ? 'مخاطر التسريب' : 'Attrition risks', icon: MessageCircle },
              { q: isRTL ? 'خطط التطوير' : 'Development plans', icon: Settings }
            ] : [
              { q: isRTL ? 'تحليلات شاملة' : 'Overall analytics', icon: BarChart3 },
              { q: isRTL ? 'تقارير الأداء' : 'Performance reports', icon: MessageCircle },
              { q: isRTL ? 'إعدادات النظام' : 'System settings', icon: Settings }
            ]).map((item, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="flex items-center gap-2 h-auto p-4 text-left justify-start"
                onClick={() => handleSuggestionClick(item.q)}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.q}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantChat;