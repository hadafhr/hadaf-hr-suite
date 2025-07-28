import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Brain, 
  MessageSquare, 
  Users, 
  BarChart3, 
  FileText, 
  Lightbulb,
  Send,
  Loader2
} from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'performance' | 'training' | 'recruitment' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  action: string;
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    title: 'تحسين أداء قسم المبيعات',
    description: 'بناءً على تحليل البيانات، يُنصح بتنظيم برنامج تدريبي متخصص لفريق المبيعات',
    type: 'performance',
    priority: 'high',
    action: 'تنظيم تدريب متخصص'
  },
  {
    id: '2',
    title: 'توظيف مطورين جدد',
    description: 'هناك حاجة لتوظيف 3 مطورين إضافيين بناءً على حجم المشاريع الحالية',
    type: 'recruitment',
    priority: 'medium',
    action: 'فتح وظائف جديدة'
  },
  {
    id: '3',
    title: 'برنامج تطوير القيادة',
    description: 'تطوير مهارات القيادة للمدراء المتوسطين سيحسن الإنتاجية بنسبة 25%',
    type: 'training',
    priority: 'medium',
    action: 'إنشاء برنامج قيادة'
  }
];

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'مرحباً! أنا مساعدك الذكي في منصة بُعد. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // محاكاة رد الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('أداء') || lowerInput.includes('تقييم')) {
      return 'بناءً على تحليل البيانات، أرى أن متوسط الأداء العام هو 86%. أنصح بالتركيز على الموظفين الذين يحتاجون تحسين في مجال المهارات التقنية. هل تريد تقرير مفصل؟';
    }
    
    if (lowerInput.includes('توظيف') || lowerInput.includes('موظف')) {
      return 'حالياً لديكم 20 موظف نشط. بناءً على تحليل العبء وحجم المشاريع، أنصح بتوظيف 2-3 موظفين إضافيين في قسم التطوير. هل تريد مني إنشاء إعلان وظيفي؟';
    }
    
    if (lowerInput.includes('تدريب') || lowerInput.includes('تطوير')) {
      return 'أحلل احتياجات التدريب بناءً على تقييمات الأداء. أنصح ببرامج تدريبية في: القيادة، المهارات التقنية، وخدمة العملاء. هل تريد خطة تدريبية مفصلة؟';
    }
    
    return 'شكراً لسؤالك. يمكنني مساعدتك في تحليل الأداء، التوظيف، التدريب، والتقارير. ما الذي تحتاج المساعدة فيه تحديداً؟';
  };

  const handleRecommendationAction = (recommendation: AIRecommendation) => {
    toast({
      title: 'تنفيذ التوصية',
      description: `جاري تنفيذ: ${recommendation.action}`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return BarChart3;
      case 'recruitment': return Users;
      case 'training': return FileText;
      case 'strategy': return Lightbulb;
      default: return Brain;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* مساعد المحادثة */}
      <Card className="dashboard-card">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">المساعد الذكي</h3>
        </div>
        
        <div className="h-80 overflow-y-auto mb-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('ar-SA')}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">جاري الكتابة...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* التوصيات الذكية */}
      <Card className="dashboard-card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">التوصيات الذكية</h3>
        </div>
        
        <div className="space-y-4">
          {mockRecommendations.map((recommendation) => {
            const IconComponent = getTypeIcon(recommendation.type);
            return (
              <div key={recommendation.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">{recommendation.title}</h4>
                  </div>
                  <Badge variant={getPriorityColor(recommendation.priority)}>
                    {recommendation.priority === 'high' ? 'عالي' :
                     recommendation.priority === 'medium' ? 'متوسط' : 'منخفض'}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {recommendation.description}
                </p>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRecommendationAction(recommendation)}
                  className="w-full"
                >
                  {recommendation.action}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};