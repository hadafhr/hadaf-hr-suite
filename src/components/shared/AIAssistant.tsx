import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AIAssistantProps {
  title: string;
  placeholder: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ title, placeholder }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: isArabic 
        ? 'مرحباً! أنا المساعد الذكي. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I am your AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isArabic 
          ? 'أنا هنا لمساعدتك. يرجى تقديم المزيد من التفاصيل حول استفسارك.'
          : 'I am here to help you. Please provide more details about your inquiry.'
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <Card className="backdrop-blur-xl bg-black/40 border border-border">
      <CardHeader>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-2 bg-gradient-to-r from-accent/20 to-accent/20 rounded-lg border border-accent/30">
            <Bot className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-white flex items-center">
              {title}
              <Sparkles className="h-4 w-4 mr-2 text-accent animate-pulse" />
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {isArabic ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto space-y-3 p-3 bg-black/20 rounded-lg border border-border">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-accent to-accent text-black'
                    : 'bg-accent/10 text-white border border-accent/30'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholder}
            className="flex-1 border-border bg-black/20 text-white"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border text-white hover:bg-accent/20 text-xs"
            onClick={() => setInput(isArabic ? 'ما هي آخر التقارير؟' : 'What are the latest reports?')}
          >
            {isArabic ? 'آخر التقارير' : 'Latest Reports'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-white hover:bg-accent/20 text-xs"
            onClick={() => setInput(isArabic ? 'عرض الإحصائيات' : 'Show Statistics')}
          >
            {isArabic ? 'الإحصائيات' : 'Statistics'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-white hover:bg-accent/20 text-xs"
            onClick={() => setInput(isArabic ? 'مساعدة' : 'Help')}
          >
            {isArabic ? 'مساعدة' : 'Help'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};