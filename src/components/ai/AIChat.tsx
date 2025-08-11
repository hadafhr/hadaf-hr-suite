import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  Paperclip, 
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: string;
    params?: Record<string, any>;
  }>;
}

interface AIChatProps {
  context: 'employee' | 'employer' | 'nonprofit';
  userId?: string;
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ context, userId, className = '' }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message based on context
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      suggestions: getInitialSuggestions()
    };
    setMessages([welcomeMessage]);
  }, [context, i18n.language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getWelcomeMessage = () => {
    const messages = {
      employee: {
        ar: 'مرحباً! أنا مساعدك الذكي في نظام بُعد HR. يمكنني مساعدتك في الاستفسارات حول الراتب، الإجازات، الحضور، والطلبات.',
        en: 'Hello! I\'m your AI assistant in BOOD HR. I can help you with salary inquiries, leave balance, attendance, and requests.'
      },
      employer: {
        ar: 'مرحباً! أنا مساعدك الذكي لإدارة الموارد البشرية. يمكنني تقديم تحليلات وتوصيات حول الموظفين والأداء.',
        en: 'Hello! I\'m your HR management AI assistant. I can provide analytics and recommendations about employees and performance.'
      },
      nonprofit: {
        ar: 'مرحباً! أنا مساعدك الذكي لإدارة المنظمات غير الربحية. يمكنني مساعدتك في إدارة البرامج والمتطوعين.',
        en: 'Hello! I\'m your nonprofit management AI assistant. I can help you manage programs and volunteers.'
      }
    };
    
    return messages[context][i18n.language as 'ar' | 'en'];
  };

  const getInitialSuggestions = () => {
    const suggestions = {
      employee: {
        ar: [
          'ما هو رصيد إجازاتي؟',
          'كيف أقدم طلب إجازة؟',
          'متى سأحصل على راتبي؟',
          'ما هي ساعات عملي اليوم؟'
        ],
        en: [
          'What is my leave balance?',
          'How do I submit a leave request?',
          'When will I receive my salary?',
          'What are my working hours today?'
        ]
      },
      employer: {
        ar: [
          'عرض تقرير الحضور الشهري',
          'ما هو معدل دوران الموظفين؟',
          'توصيات لتحسين الأداء',
          'تحليل تكاليف الرواتب'
        ],
        en: [
          'Show monthly attendance report',
          'What is the employee turnover rate?',
          'Performance improvement recommendations',
          'Payroll cost analysis'
        ]
      },
      nonprofit: {
        ar: [
          'عرض تقرير البرامج النشطة',
          'كم عدد المتطوعين المتاحين؟',
          'تحليل الميزانية الشهرية',
          'مؤشرات الأثر الاجتماعي'
        ],
        en: [
          'Show active programs report',
          'How many volunteers are available?',
          'Monthly budget analysis',
          'Social impact metrics'
        ]
      }
    };
    
    return suggestions[context][i18n.language as 'ar' | 'en'];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): Message => {
    // Simple response generation based on keywords
    const lowerInput = userInput.toLowerCase();
    
    let content = '';
    let actions: Array<{ label: string; action: string; params?: Record<string, any> }> = [];

    if (lowerInput.includes('leave') || lowerInput.includes('إجازة')) {
      content = i18n.language === 'ar' 
        ? 'رصيدك الحالي من الإجازات هو 25 يوماً. يمكنك تقديم طلب إجازة جديد من خلال النظام.'
        : 'Your current leave balance is 25 days. You can submit a new leave request through the system.';
      
      actions = [
        { 
          label: i18n.language === 'ar' ? 'تقديم طلب إجازة' : 'Submit Leave Request', 
          action: 'create_leave_request' 
        }
      ];
    } else if (lowerInput.includes('salary') || lowerInput.includes('راتب')) {
      content = i18n.language === 'ar'
        ? 'سيتم صرف راتب هذا الشهر في 28 يناير. يمكنك عرض كشف الراتب التفصيلي.'
        : 'This month\'s salary will be paid on January 28th. You can view your detailed payslip.';
      
      actions = [
        { 
          label: i18n.language === 'ar' ? 'عرض كشف الراتب' : 'View Payslip', 
          action: 'view_payslip' 
        }
      ];
    } else if (lowerInput.includes('attendance') || lowerInput.includes('حضور')) {
      content = i18n.language === 'ar'
        ? 'سجلت اليوم 8 ساعات عمل. وقت الحضور: 8:00 ص، وقت الانصراف: 5:00 م.'
        : 'You logged 8 hours today. Clock in: 8:00 AM, Clock out: 5:00 PM.';
    } else {
      content = i18n.language === 'ar'
        ? 'أعتذر، لم أفهم طلبك بوضوح. هل يمكنك توضيح ما تحتاج إليه؟'
        : 'I apologize, I didn\'t understand your request clearly. Could you clarify what you need?';
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      actions: actions.length > 0 ? actions : undefined
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleActionClick = (action: string, params?: Record<string, any>) => {
    // Handle AI suggested actions
    console.log('AI Action:', action, params);
    
    // Here you would implement the actual action logic
    switch (action) {
      case 'create_leave_request':
        // Navigate to leave request form
        break;
      case 'view_payslip':
        // Navigate to payslip view
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <Card className={`flex flex-col h-96 ${className}`}>
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          {t('ai.assistant')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col overflow-hidden p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="mr-2 mb-1 text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                
                {/* Actions */}
                {message.actions && (
                  <div className="mt-2 space-y-1">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        className="mr-2 mb-1 text-xs"
                        onClick={() => handleActionClick(action.action, action.params)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center order-2">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ai.chat')}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};