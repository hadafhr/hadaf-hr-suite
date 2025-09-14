import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bot, Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BoudLogo } from '@/components/BoudLogo';
import { PatternBackground } from '@/components/PatternBackground';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LaborLawAIPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: isArabic 
        ? 'مرحباً! أنا مُمتثل الذكي، مساعدك في قانون العمل السعودي. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m Smart Compliance Assistant, your helper for Saudi Labor Law. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: isArabic 
          ? 'شكراً لسؤالك. هذه ميزة تجريبية. في النسخة الكاملة، سأتمكن من الإجابة على جميع استفساراتك حول قانون العمل السعودي بدقة.'
          : 'Thank you for your question. This is a demo feature. In the full version, I will be able to answer all your Saudi Labor Law inquiries accurately.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickQuestions = isArabic ? [
    'ما هي مدة فترة التجربة؟',
    'كيفية حساب مكافأة نهاية الخدمة؟',
    'ما هي ساعات العمل القانونية؟',
    'متى يحق للموظف إجازة سنوية؟'
  ] : [
    'What is the probation period duration?',
    'How to calculate end of service benefits?',
    'What are the legal working hours?',
    'When is an employee entitled to annual leave?'
  ];

  return (
    <div className="min-h-screen bg-background">
      <PatternBackground opacity={0.02} size={120} />
      
      {/* Header */}
      <header className="relative z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/hr-tools" className="flex items-center space-x-2 space-x-reverse text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>{isArabic ? 'العودة للأدوات' : 'Back to Tools'}</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <BoudLogo variant="icon" size="md" />
              <h1 className="text-lg font-semibold">
                {isArabic ? 'مُمتثل الذكي' : 'Smart Compliance Assistant'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {isArabic ? 'مُمتثل الذكي' : 'Smart Compliance Assistant'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isArabic 
                ? 'مساعد محادثي ذكي لقانون العمل السعودي يجيب على استفساراتك بدقة'
                : 'Intelligent conversational assistant for Saudi Labor Law that answers your questions accurately'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    {isArabic ? 'المحادثة' : 'Chat'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 space-x-reverse max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2 space-x-reverse">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted rounded-2xl px-4 py-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={isArabic ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isLoading || !inputMessage.trim()}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Questions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isArabic ? 'أسئلة شائعة' : 'Quick Questions'}
                  </CardTitle>
                  <CardDescription>
                    {isArabic 
                      ? 'انقر على أي سؤال لبدء المحادثة'
                      : 'Click on any question to start the conversation'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-right justify-start h-auto whitespace-normal p-3"
                      onClick={() => setInputMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isArabic ? 'معلومات مهمة' : 'Important Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    {isArabic 
                      ? '🤖 هذا مساعد ذكي تجريبي'
                      : '🤖 This is a demo AI assistant'
                    }
                  </p>
                  <p>
                    {isArabic 
                      ? '⚖️ المعلومات استرشادية وليست استشارة قانونية'
                      : '⚖️ Information is for guidance, not legal advice'
                    }
                  </p>
                  <p>
                    {isArabic 
                      ? '📚 يُنصح بمراجعة المحامي المختص'
                      : '📚 Consult with a qualified lawyer is recommended'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              {isArabic 
                ? '⚠️ هذا مساعد ذكي تجريبي للمعلومات العامة حول قانون العمل السعودي. المعلومات المقدمة استرشادية وليست بديلاً عن الاستشارة القانونية المتخصصة.'
                : '⚠️ This is a demo AI assistant for general information about Saudi Labor Law. The information provided is for guidance and is not a substitute for professional legal consultation.'
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LaborLawAIPage;