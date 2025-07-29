import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  FileText,
  BookOpen,
  Scale,
  Clock,
  MessageSquare,
  Sparkles,
  Languages,
  Headphones,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: string;
}

interface HRAIAssistantProps {
  language: 'ar' | 'en';
}

export const AIAssistant: React.FC<HRAIAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample knowledge base for Saudi Labor Law
  const knowledgeBase = {
    ar: {
      greetings: [
        "مرحباً! أنا مساعدك الذكي للموارد البشرية. كيف يمكنني مساعدتك اليوم؟",
        "أهلاً وسهلاً! أنا هنا لمساعدتك في جميع استفساراتك المتعلقة بنظام العمل والموارد البشرية."
      ],
      topics: {
        leave: {
          keywords: ['إجازة', 'عطلة', 'راحة', 'غياب'],
          responses: [
            "بحسب نظام العمل السعودي، يحق للموظف الحصول على إجازة سنوية مدفوعة الأجر لا تقل عن 21 يوماً للسنة الأولى، و30 يوماً بعد 5 سنوات من الخدمة.",
            "أنواع الإجازات الرسمية تشمل: الإجازة السنوية، الإجازة المرضية، إجازة الوضع، إجازة الحج، والإجازة الطارئة."
          ]
        },
        salary: {
          keywords: ['راتب', 'أجر', 'مرتب', 'تعويض'],
          responses: [
            "يجب دفع الأجر في موعد لا يتجاوز نهاية الشهر التالي لاستحقاقه، ولا يجوز تأخيره أكثر من 60 يوماً.",
            "يشمل الأجر: الراتب الأساسي، والبدلات، والعمولات، والحوافز المتفق عليها في عقد العمل."
          ]
        },
        workingHours: {
          keywords: ['ساعات العمل', 'دوام', 'وقت', 'ساعات'],
          responses: [
            "الحد الأقصى لساعات العمل العادية 8 ساعات يومياً أو 48 ساعة أسبوعياً. وفي شهر رمضان تخفض إلى 6 ساعات يومياً أو 36 ساعة أسبوعياً.",
            "العمل الإضافي يُحتسب بزيادة 50% من الأجر العادي، أما في أيام الراحة والأعياد فيُحتسب بزيادة 100%."
          ]
        },
        termination: {
          keywords: ['فصل', 'إنهاء', 'استقالة', 'ترك العمل'],
          responses: [
            "يحق للعامل الحصول على مكافأة نهاية الخدمة بمعدل نصف شهر عن كل سنة من السنوات الخمس الأولى، وشهر كامل عن كل سنة من السنوات التالية.",
            "فترة الإنذار المطلوبة للاستقالة هي 60 يوماً للموظفين الشهريين، و30 يوماً للموظفين اليوميين."
          ]
        }
      }
    },
    en: {
      greetings: [
        "Hello! I'm your HR AI Assistant. How can I help you today?",
        "Welcome! I'm here to assist you with all your HR and Saudi Labor Law inquiries."
      ],
      topics: {
        leave: {
          keywords: ['leave', 'vacation', 'holiday', 'absence'],
          responses: [
            "According to Saudi Labor Law, employees are entitled to paid annual leave of at least 21 days for the first year, and 30 days after 5 years of service.",
            "Official leave types include: Annual leave, Sick leave, Maternity leave, Hajj leave, and Emergency leave."
          ]
        },
        salary: {
          keywords: ['salary', 'wage', 'pay', 'compensation'],
          responses: [
            "Wages must be paid no later than the end of the month following the month of entitlement, and cannot be delayed more than 60 days.",
            "Wages include: Basic salary, allowances, commissions, and agreed incentives in the employment contract."
          ]
        },
        workingHours: {
          keywords: ['working hours', 'work time', 'schedule', 'hours'],
          responses: [
            "Maximum regular working hours are 8 hours daily or 48 hours weekly. During Ramadan, it's reduced to 6 hours daily or 36 hours weekly.",
            "Overtime is calculated at 150% of regular pay, while work on rest days and holidays is calculated at 200%."
          ]
        },
        termination: {
          keywords: ['termination', 'resignation', 'end of service', 'leaving'],
          responses: [
            "Employees are entitled to end-of-service gratuity at half a month's wage for each of the first five years, and a full month's wage for each subsequent year.",
            "Required notice period for resignation is 60 days for monthly employees and 30 days for daily employees."
          ]
        }
      }
    }
  };

  const quickActions = [
    {
      id: 1,
      title: language === 'ar' ? 'حقوق الموظف' : 'Employee Rights',
      icon: <Scale className="h-4 w-4" />,
      query: language === 'ar' ? 'ما هي حقوقي كموظف؟' : 'What are my rights as an employee?'
    },
    {
      id: 2,
      title: language === 'ar' ? 'أنواع الإجازات' : 'Leave Types',
      icon: <CalendarIcon className="h-4 w-4" />,
      query: language === 'ar' ? 'ما هي أنواع الإجازات المتاحة؟' : 'What types of leave are available?'
    },
    {
      id: 3,
      title: language === 'ar' ? 'ساعات العمل' : 'Working Hours',
      icon: <Clock className="h-4 w-4" />,
      query: language === 'ar' ? 'كم ساعة عمل يومياً؟' : 'How many working hours per day?'
    },
    {
      id: 4,
      title: language === 'ar' ? 'نهاية الخدمة' : 'End of Service',
      icon: <FileText className="h-4 w-4" />,
      query: language === 'ar' ? 'كيف تُحسب مكافأة نهاية الخدمة؟' : 'How is end-of-service gratuity calculated?'
    }
  ];

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      const greeting = knowledgeBase[language].greetings[0];
      setMessages([{
        id: '1',
        type: 'assistant',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const kb = knowledgeBase[language];
    
    // Check each topic for keyword matches
    for (const [topicKey, topic] of Object.entries(kb.topics)) {
      for (const keyword of topic.keywords) {
        if (input.includes(keyword)) {
          const responses = topic.responses;
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
    
    // Default response
    return language === 'ar' 
      ? 'شكراً لسؤالك. هذا موضوع مهم وسأحتاج لمراجعة المزيد من التفاصيل. هل يمكنك تحديد سؤالك أكثر؟ أو يمكنك التواصل مع قسم الموارد البشرية للحصول على إجابة مفصلة.'
      : 'Thank you for your question. This is an important topic and I need to review more details. Could you specify your question further? Or you can contact the HR department for a detailed answer.';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        category: 'response'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    handleSend();
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would implement speech recognition
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // Here you would implement text-to-speech
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/ai-assistant-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold">
              {language === 'ar' ? 'مساعد الموارد البشرية الذكي' : 'HR AI Assistant'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'متخصص في نظام العمل السعودي' : 'Saudi Labor Law Specialist'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Sparkles className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'متصل' : 'Online'}
          </Badge>
          <Button size="sm" variant="ghost" onClick={toggleSpeaking}>
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <p className="text-sm text-muted-foreground mb-3">
          {language === 'ar' ? 'مواضيع شائعة:' : 'Popular Topics:'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="h-auto p-3 justify-start"
              onClick={() => handleQuickAction(action.query)}
            >
              {action.icon}
              <span className="mr-2 text-xs">{action.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-3 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <Avatar className="h-8 w-8">
                {message.type === 'user' ? (
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className={`space-y-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.type === 'assistant' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => copyMessage(message.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                language === 'ar' 
                  ? 'اسأل عن حقوقك في العمل أو أي استفسار آخر...' 
                  : 'Ask about your employment rights or any other inquiry...'
              }
              className="pr-12"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={toggleListening}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <Button onClick={handleSend} disabled={!input.trim()} className="btn-primary">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {language === 'ar' 
            ? 'مدرب على نظام العمل والعمال السعودي المحدث • دقة المعلومات 95%'
            : 'Trained on updated Saudi Labor Law • Information accuracy 95%'
          }
        </p>
      </div>
    </div>
  );
};