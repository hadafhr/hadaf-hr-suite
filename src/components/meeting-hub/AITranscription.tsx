import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mic, MicOff, Download, Search, Filter, 
  FileText, Brain, Users, Clock, Copy,
  CheckCircle, AlertCircle, Loader2, Play, Pause
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
  confidence: number;
  language: 'ar' | 'en';
  isAIGenerated: boolean;
}

interface MeetingDecision {
  id: string;
  text: string;
  assignedTo?: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

interface AITranscriptionProps {
  meetingId: string;
  isLive?: boolean;
}

const AITranscription: React.FC<AITranscriptionProps> = ({ meetingId, isLive = false }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<TranscriptSegment[]>([
    {
      id: '1',
      speaker: 'أحمد محمد (مدير المشروع)',
      text: 'أهلاً بالجميع في اجتماع اليوم، سنناقش تقدم المشروع والخطوات القادمة',
      timestamp: '14:30:15',
      confidence: 0.95,
      language: 'ar',
      isAIGenerated: true
    },
    {
      id: '2', 
      speaker: 'فاطمة علي (مطور)',
      text: 'تم الانتهاء من تطوير الواجهة الأساسية، ونحن الآن في مرحلة الاختبار',
      timestamp: '14:31:02',
      confidence: 0.92,
      language: 'ar',
      isAIGenerated: true
    },
    {
      id: '3',
      speaker: 'محمد خالد (مصمم)',
      text: 'We need to finalize the design system by next week to stay on schedule',
      timestamp: '14:31:45',
      confidence: 0.89,
      language: 'en',
      isAIGenerated: true
    }
  ]);
  
  const [decisions, setDecisions] = useState<MeetingDecision[]>([
    {
      id: '1',
      text: 'إنهاء اختبار الواجهة الأساسية',
      assignedTo: 'فاطمة علي',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: '2',
      text: 'وضع اللمسات الأخيرة على نظام التصميم',
      assignedTo: 'محمد خالد',
      dueDate: '2024-01-12',
      priority: 'medium',
      status: 'pending'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'ar' | 'en'>('all');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [meetingSummary, setMeetingSummary] = useState('');

  // محاكاة النسخ الصوتي المباشر
  useEffect(() => {
    if (isLive && isRecording) {
      const interval = setInterval(() => {
        // محاكاة نص جديد كل 10 ثواني
        const newTranscript: TranscriptSegment = {
          id: Date.now().toString(),
          speaker: 'متحدث جديد',
          text: 'هذا نص تجريبي للنسخ الصوتي المباشر باستخدام الذكاء الاصطناعي...',
          timestamp: new Date().toLocaleTimeString('ar-SA'),
          confidence: 0.85 + Math.random() * 0.15,
          language: Math.random() > 0.5 ? 'ar' : 'en',
          isAIGenerated: true
        };
        
        setTranscripts(prev => [...prev, newTranscript]);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isLive, isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'تم إيقاف النسخ الصوتي' : 'بدأ النسخ الصوتي',
      description: isRecording ? 'توقف تحويل الكلام إلى نص' : 'جاري تحويل الكلام إلى نص بالذكاء الاصطناعي'
    });
  };

  const generateMeetingSummary = async () => {
    setIsGeneratingSummary(true);
    
    // محاكاة استدعاء API للذكاء الاصطناعي
    setTimeout(() => {
      const summary = `
## ملخص الاجتماع - ${new Date().toLocaleDateString('ar-SA')}

### المشاركون:
- أحمد محمد (مدير المشروع)
- فاطمة علي (مطور)
- محمد خالد (مصمم)

### النقاط الرئيسية:
1. تم الانتهاء من تطوير الواجهة الأساسية
2. جاري العمل على مرحلة الاختبار
3. يجب إنهاء نظام التصميم بحلول الأسبوع القادم

### القرارات المتخذة:
- إنهاء اختبار الواجهة الأساسية (مسؤول: فاطمة علي، موعد: 15 يناير)
- وضع اللمسات الأخيرة على نظام التصميم (مسؤول: محمد خالد، موعد: 12 يناير)

### الإجراءات المطلوبة:
- متابعة تقدم الاختبارات يومياً
- مراجعة نظام التصميم مع الفريق
- تحديد موعد الاجتماع القادم
      `;
      
      setMeetingSummary(summary);
      setIsGeneratingSummary(false);
      
      toast({
        title: 'تم إنشاء الملخص الذكي',
        description: 'تم توليد ملخص شامل للاجتماع باستخدام الذكاء الاصطناعي'
      });
    }, 3000);
  };

  const exportTranscript = () => {
    const content = transcripts.map(t => 
      `[${t.timestamp}] ${t.speaker}: ${t.text}`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-transcript-${meetingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'تم تصدير المحضر',
      description: 'تم حفظ النسخ الصوتي في ملف نصي'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'تم النسخ',
      description: 'تم نسخ النص إلى الحافظة'
    });
  };

  const filteredTranscripts = transcripts.filter(transcript => {
    const matchesSearch = transcript.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transcript.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || transcript.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-500';
    if (confidence >= 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="transcription" className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <TabsList>
            <TabsTrigger value="transcription">النسخ الصوتي</TabsTrigger>
            <TabsTrigger value="decisions">القرارات والمهام</TabsTrigger>
            <TabsTrigger value="summary">الملخص الذكي</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            {isLive && (
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "destructive" : "default"}
                size="sm"
              >
                {isRecording ? <MicOff className="w-4 h-4 ml-1" /> : <Mic className="w-4 h-4 ml-1" />}
                {isRecording ? 'إيقاف' : 'تشغيل'}
              </Button>
            )}
            
            <Button onClick={exportTranscript} variant="outline" size="sm">
              <Download className="w-4 h-4 ml-1" />
              تصدير
            </Button>
            
            <Button onClick={generateMeetingSummary} variant="outline" size="sm" disabled={isGeneratingSummary}>
              {isGeneratingSummary ? (
                <Loader2 className="w-4 h-4 ml-1 animate-spin" />
              ) : (
                <Brain className="w-4 h-4 ml-1" />
              )}
              ملخص ذكي
            </Button>
          </div>
        </div>

        <TabsContent value="transcription" className="flex-1 flex flex-col p-4">
          {/* شريط البحث والفلترة */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="البحث في المحضر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'all' | 'ar' | 'en')}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">جميع اللغات</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* النسخ الصوتي */}
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {filteredTranscripts.map((transcript) => (
                <Card key={transcript.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {transcript.timestamp}
                        </Badge>
                        <span className="font-medium text-sm">{transcript.speaker}</span>
                        {transcript.language === 'en' && (
                          <Badge variant="secondary" className="text-xs">EN</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 text-xs ${getConfidenceColor(transcript.confidence)}`}>
                          <AlertCircle className="w-3 h-3" />
                          {Math.round(transcript.confidence * 100)}%
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(transcript.text)}
                          className="h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm leading-relaxed">{transcript.text}</p>
                    
                    {transcript.isAIGenerated && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Brain className="w-3 h-3" />
                        تم توليده بالذكاء الاصطناعي
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="decisions" className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">القرارات والمهام المستخرجة</h3>
              <Badge variant="secondary">{decisions.length} مهمة</Badge>
            </div>
            
            {decisions.map((decision) => (
              <Card key={decision.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium mb-1">{decision.text}</p>
                      {decision.assignedTo && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          مسؤول: {decision.assignedTo}
                        </div>
                      )}
                      {decision.dueDate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          موعد الإنجاز: {new Date(decision.dueDate).toLocaleDateString('ar-SA')}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Badge variant={getPriorityColor(decision.priority)}>
                        {decision.priority === 'high' ? 'عالية' : 
                         decision.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </Badge>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(decision.status)}`}>
                        {decision.status === 'completed' ? 'مكتملة' :
                         decision.status === 'in_progress' ? 'قيد التنفيذ' : 'معلقة'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-1 p-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                الملخص الذكي للاجتماع
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meetingSummary ? (
                <ScrollArea className="h-96">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans">{meetingSummary}</pre>
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    لم يتم إنشاء الملخص الذكي بعد
                  </p>
                  <Button onClick={generateMeetingSummary} disabled={isGeneratingSummary}>
                    {isGeneratingSummary ? (
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    ) : (
                      <Brain className="w-4 h-4 ml-2" />
                    )}
                    إنشاء ملخص ذكي
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITranscription;