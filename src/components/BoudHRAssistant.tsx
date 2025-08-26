import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Bot,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';
import boudAssistantIcon from '@/assets/boud-assistant-icon.png';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface BoudHRAssistantProps {
  language?: 'ar' | 'en';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialMessage?: string;
}

export const BoudHRAssistant: React.FC<BoudHRAssistantProps> = ({ 
  language = 'ar',
  isOpen: externalIsOpen,
  onOpenChange,
  initialMessage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isRTL = language === 'ar';

  // Handle external control of open state
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  // Handle open state changes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  // Get current page context
  const getPageContext = () => {
    const path = location.pathname;
    const contextMap: Record<string, { ar: string; en: string }> = {
      '/': { ar: 'الصفحة الرئيسية', en: 'Main Dashboard' },
      '/service-platforms/performance-evaluation': { ar: 'نظام تقييم الأداء', en: 'Performance Evaluation System' },
      '/service-platforms/employee-management': { ar: 'نظام إدارة الموظفين', en: 'Employee Management System' },
      '/service-platforms/employee-self-service': { ar: 'نظام الخدمة الذاتية للموظفين', en: 'Employee Self-Service Portal' },
      '/service-platforms/compensation-benefits': { ar: 'نظام التعويضات والمزايا', en: 'Compensation & Benefits System' },
      '/service-platforms/wage-protection': { ar: 'نظام حماية الأجور', en: 'Wage Protection System' },
      '/service-platforms/training': { ar: 'نظام التدريب والتطوير', en: 'Training & Development System' },
      '/service-platforms/recruitment': { ar: 'نظام التوظيف', en: 'Recruitment System' },
      '/service-platforms/reports': { ar: 'نظام التقارير والتحليلات', en: 'Reports & Analytics System' }
    };

    return contextMap[path]?.[language] || (isRTL ? 'نظام BOUD' : 'BOUD Platform');
  };

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: isRTL 
          ? `مرحباً! أنا مساعد BOUD HR الذكي 🤖\n\nيمكنني مساعدتك في:\n✅ الإجابة على أسئلة الموارد البشرية\n✅ التنقل عبر النظام\n✅ تقديم اقتراحات ذكية\n✅ شرح ميزات المنصة\n\nأنت الآن في: ${getPageContext()}\n\nكيف يمكنني مساعدتك اليوم؟`
          : `Hello! I'm BOUD HR Assistant 🤖\n\nI can help you with:\n✅ HR-related questions\n✅ System navigation\n✅ Smart suggestions\n✅ Platform features explanation\n\nYou're currently in: ${getPageContext()}\n\nHow can I assist you today?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [language]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle initial message
  useEffect(() => {
    if (initialMessage && isOpen && messages.length === 1) {
      // Send the initial message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: initialMessage,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      // Send to AI
      supabase.functions.invoke('boud-hr-assistant', {
        body: {
          message: initialMessage,
          context: getPageContext(),
          language: language
        }
      }).then(({ data, error }) => {
        if (!error) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: data.response || (isRTL ? 'عذراً، لم أتمكن من معالجة طلبك.' : 'Sorry, I couldn\'t process your request.'),
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, assistantMessage]);
        }
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [initialMessage, isOpen, language, messages.length]);

  // Update welcome message when page changes
  useEffect(() => {
    if (messages.length > 0 && !initialMessage) {
      const contextMessage: Message = {
        id: Date.now().toString(),
        content: isRTL 
          ? `📍 انتقلت إلى: ${getPageContext()}\n\nكيف يمكنني مساعدتك في هذا القسم؟`
          : `📍 You've navigated to: ${getPageContext()}\n\nHow can I help you with this section?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, contextMessage]);
    }
  }, [location.pathname]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('boud-hr-assistant', {
        body: {
          message: inputValue.trim(),
          context: getPageContext(),
          language: language
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || (isRTL ? 'عذراً، لم أتمكن من معالجة طلبك.' : 'Sorry, I couldn\'t process your request.'),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error calling BOUD HR Assistant:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isRTL 
          ? 'عذراً، حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.' 
          : 'Sorry, there was an error connecting to the AI assistant. Please try again.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: isRTL ? "خطأ في المساعد الذكي" : "AI Assistant Error",
        description: isRTL ? "تعذر الاتصال بالمساعد الذكي" : "Could not connect to AI assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* Floating Assistant Logo */}
      {!isOpen && (
        <img 
          src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
          alt="BOUD HR Assistant" 
          className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-24 h-24 cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl`}
          onClick={() => handleOpenChange(true)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-80 md:w-96 transition-all duration-300`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Card className={`shadow-2xl border-0 bg-background/95 backdrop-blur-sm ${isMinimized ? 'h-14' : 'h-96'} transition-all duration-300`}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-3 pb-2 border-b">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/2d27423b-8bca-468b-802c-9a3666f5fe90.png" 
                  alt="BOUD HR Assistant" 
                  className="w-6 h-6"
                />
                <CardTitle className="text-sm font-semibold text-primary">
                  {isRTL ? 'مساعد BOUD HR' : 'BOUD HR Assistant'}
                </CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title={isRTL ? 'متصل' : 'Online'} />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>

            {/* Chat Content */}
            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-80">
                {/* Messages */}
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            message.isUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {!message.isUser && (
                            <div className="flex items-center gap-1 mb-1">
                              <Bot className="w-3 h-3" />
                              <span className="text-xs font-medium">BOUD</span>
                            </div>
                          )}
                          <div className="whitespace-pre-line">
                            {formatMessage(message.content)}
                          </div>
                          <div className="text-xs mt-1 opacity-60">
                            {message.timestamp.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm flex items-center gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          {isRTL ? 'يكتب...' : 'Typing...'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input */}
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isRTL ? 'اكتب رسالتك...' : 'Type your message...'}
                      className="flex-1 text-sm"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                      className="px-3"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default BoudHRAssistant;