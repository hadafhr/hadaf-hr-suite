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

interface MobileBoudHRAssistantProps {
  language?: 'ar' | 'en';
}

export const MobileBoudHRAssistant: React.FC<MobileBoudHRAssistantProps> = ({ 
  language = 'ar' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isRTL = language === 'ar';

  // Get current page context for mobile
  const getPageContext = () => {
    const path = location.pathname;
    const contextMap: Record<string, { ar: string; en: string }> = {
      '/mobile-login': { ar: 'تسجيل الدخول للجوال', en: 'Mobile Login' },
      '/mobile-dashboard': { ar: 'لوحة التحكم للجوال', en: 'Mobile Dashboard' },
      '/mobile-profile': { ar: 'الملف الشخصي للجوال', en: 'Mobile Profile' },
      '/mobile-requests': { ar: 'الطلبات للجوال', en: 'Mobile Requests' },
      '/mobile-tasks': { ar: 'المهام للجوال', en: 'Mobile Tasks' },
      '/mobile-chat': { ar: 'الدردشة للجوال', en: 'Mobile Chat' },
      '/mobile-notifications': { ar: 'الإشعارات للجوال', en: 'Mobile Notifications' },
    };

    return contextMap[path]?.[language] || (isRTL ? 'تطبيق BOUD للجوال' : 'BOUD Mobile App');
  };

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: isRTL 
          ? `مرحباً! أنا مساعد BOUD HR للجوال 📱\n\nيمكنني مساعدتك في:\n✅ الإجابة على أسئلة الموارد البشرية\n✅ التنقل في التطبيق\n✅ إدارة المهام والطلبات\n✅ شرح ميزات التطبيق\n\nأنت الآن في: ${getPageContext()}\n\nكيف يمكنني مساعدتك؟`
          : `Hello! I'm BOUD HR Mobile Assistant 📱\n\nI can help you with:\n✅ HR-related questions\n✅ App navigation\n✅ Task & request management\n✅ App features explanation\n\nYou're currently in: ${getPageContext()}\n\nHow can I assist you?`,
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
          context: `Mobile App - ${getPageContext()}`,
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
          ? 'عذراً، حدث خطأ في الاتصال بالمساعد الذكي.' 
          : 'Sorry, there was an error connecting to the AI assistant.',
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
      {/* Mobile Floating Assistant Button */}
      <div className={`fixed bottom-4 ${isRTL ? 'left-4' : 'right-4'} z-50 md:hidden`}>
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            size="icon"
          >
            <img 
              src={boudAssistantIcon} 
              alt="BOUD HR Assistant" 
              className="w-6 h-6"
            />
          </Button>
        )}
      </div>

      {/* Mobile Chat Window - Full Screen */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background md:hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <img 
                  src={boudAssistantIcon} 
                  alt="BOUD HR Assistant" 
                  className="w-8 h-8 bg-white rounded-full p-1"
                />
                <div>
                  <h1 className="text-lg font-semibold">
                    {isRTL ? 'مساعد BOUD HR' : 'BOUD HR Assistant'}
                  </h1>
                  <p className="text-xs opacity-90">
                    {isRTL ? 'متصل الآن' : 'Online now'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-muted-foreground rounded-bl-sm'
                      }`}
                    >
                      {!message.isUser && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4" />
                          <span className="text-xs font-medium">BOUD Assistant</span>
                        </div>
                      )}
                      <div className="whitespace-pre-line">
                        {formatMessage(message.content)}
                      </div>
                      <div className="text-xs mt-2 opacity-60">
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
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isRTL ? 'يكتب...' : 'Typing...'}
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Mobile Input Area */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isRTL ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="h-10 w-10"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBoudHRAssistant;