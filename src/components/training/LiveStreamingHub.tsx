import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Hand, 
  MessageCircle, 
  Users, 
  Settings,
  Play,
  Square,
  BarChart3,
  Send,
  Calendar,
  Clock
} from 'lucide-react';

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  startTime: Date;
  endTime?: Date;
  status: 'scheduled' | 'live' | 'ended';
  participants: number;
  maxParticipants: number;
  recordingEnabled: boolean;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'poll' | 'hand_raise';
}

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: { [key: string]: number };
  isActive: boolean;
}

export const LiveStreamingHub = () => {
  const { toast } = useToast();
  const [isStreaming, setIsStreaming] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('50');
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([
    {
      id: '1',
      title: 'إدارة الوقت والإنتاجية',
      instructor: 'د. أحمد محمد',
      startTime: new Date(),
      status: 'live',
      participants: 24,
      maxParticipants: 50,
      recordingEnabled: true
    },
    {
      id: '2',
      title: 'مهارات القيادة الحديثة',
      instructor: 'أ. فاطمة علي',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'scheduled',
      participants: 0,
      maxParticipants: 30,
      recordingEnabled: false
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'محمد أحمد',
      message: 'مرحباً بالجميع في الجلسة التدريبية',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'message'
    },
    {
      id: '2',
      user: 'سارة علي',
      message: 'شكراً لكم على هذه الجلسة المفيدة',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: 'message'
    }
  ]);

  const [activePoll, setActivePoll] = useState<Poll>({
    id: '1',
    question: 'ما هو أهم عنصر في إدارة الوقت؟',
    options: ['التخطيط المسبق', 'تحديد الأولويات', 'تجنب المشتتات', 'استخدام التقنية'],
    votes: { 'التخطيط المسبق': 8, 'تحديد الأولويات': 12, 'تجنب المشتتات': 6, 'استخدام التقنية': 4 },
    isActive: true
  });

  const handleStartStream = () => {
    setIsStreaming(true);
    toast({
      title: "تم بدء البث المباشر",
      description: "تم تشغيل البث بنجاح والمشاركين يمكنهم الانضمام الآن"
    });
  };

  const handleEndStream = () => {
    setIsStreaming(false);
    toast({
      title: "تم إنهاء البث المباشر",
      description: "تم حفظ التسجيل تلقائياً"
    });
  };

  const handleScheduleSession = () => {
    if (!newSessionTitle || !selectedDate || !selectedTime) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newSession: LiveSession = {
      id: Date.now().toString(),
      title: newSessionTitle,
      instructor: 'المدرب الحالي',
      startTime: new Date(`${selectedDate}T${selectedTime}`),
      status: 'scheduled',
      participants: 0,
      maxParticipants: parseInt(maxParticipants),
      recordingEnabled: true
    };

    setLiveSessions([...liveSessions, newSession]);
    setNewSessionTitle('');
    setSelectedDate('');
    setSelectedTime('');
    setMaxParticipants('50');

    toast({
      title: "تم جدولة الجلسة",
      description: "تم إنشاء جلسة تدريبية جديدة بنجاح"
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'أنت',
      message: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };

  const handleRaiseHand = () => {
    setHandRaised(!handRaised);
    const handMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'أنت',
      message: handRaised ? 'تم خفض اليد' : 'رفع اليد للسؤال',
      timestamp: new Date(),
      type: 'hand_raise'
    };

    setChatMessages([...chatMessages, handMessage]);
  };

  const handleCreatePoll = () => {
    if (!newPollQuestion || newPollOptions.some(opt => !opt.trim())) {
      toast({
        title: "خطأ",
        description: "يرجى ملء سؤال الاستطلاع وجميع الخيارات",
        variant: "destructive"
      });
      return;
    }

    const poll: Poll = {
      id: Date.now().toString(),
      question: newPollQuestion,
      options: newPollOptions.filter(opt => opt.trim()),
      votes: {},
      isActive: true
    };

    setActivePoll(poll);
    setNewPollQuestion('');
    setNewPollOptions(['', '']);

    toast({
      title: "تم إنشاء استطلاع جديد",
      description: "يمكن للمشاركين التصويت الآن"
    });
  };

  const handleVote = (option: string) => {
    setActivePoll(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [option]: (prev.votes[option] || 0) + 1
      }
    }));

    toast({
      title: "تم التصويت",
      description: `تم تسجيل صوتك لـ "${option}"`
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      live: 'bg-red-500 text-white animate-pulse',
      scheduled: 'bg-blue-500 text-white',
      ended: 'bg-gray-500 text-white'
    };
    
    const labels = {
      live: 'مباشر الآن',
      scheduled: 'مجدولة',
      ended: 'انتهت'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">مركز البث المباشر</h1>
            <p className="text-muted-foreground">إدارة الجلسات التدريبية المباشرة والتفاعل مع المتدربين</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="ml-2 h-4 w-4" />
              جدولة جلسة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>جدولة جلسة تدريبية مباشرة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionTitle">عنوان الجلسة</Label>
                <Input
                  id="sessionTitle"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="أدخل عنوان الجلسة"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">التاريخ</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">الوقت</Label>
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxParticipants">العدد الأقصى للمشاركين</Label>
                <Select value={maxParticipants} onValueChange={setMaxParticipants}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 مشاركين</SelectItem>
                    <SelectItem value="25">25 مشارك</SelectItem>
                    <SelectItem value="50">50 مشارك</SelectItem>
                    <SelectItem value="100">100 مشارك</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleScheduleSession} className="w-full">
                جدولة الجلسة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Live Sessions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveSessions.map((session) => (
          <Card key={session.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{session.title}</CardTitle>
                {getStatusBadge(session.status)}
              </div>
              <p className="text-sm text-muted-foreground">المدرب: {session.instructor}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="ml-2 h-4 w-4" />
                  {session.startTime.toLocaleString('ar-SA')}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="ml-2 h-4 w-4" />
                  {session.participants}/{session.maxParticipants} مشارك
                </div>
                {session.status === 'live' && (
                  <Button size="sm" className="w-full mt-2">
                    <Video className="ml-2 h-4 w-4" />
                    الانضمام للبث
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Streaming Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Stream */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                البث المباشر
                <div className="flex items-center gap-2">
                  {isStreaming && (
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      مباشر
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                {isStreaming ? (
                  <div className="text-white text-center">
                    <Video className="h-12 w-12 mx-auto mb-2" />
                    <p>البث المباشر نشط</p>
                    <p className="text-sm text-gray-300 mt-2">24 مشارك متصل</p>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <VideoOff className="h-12 w-12 mx-auto mb-2" />
                    <p>البث غير نشط</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={videoEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVideoEnabled(!videoEnabled)}
                >
                  {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={audioEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={screenSharing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScreenSharing(!screenSharing)}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                {isStreaming ? (
                  <Button onClick={handleEndStream} variant="destructive">
                    <Square className="ml-2 h-4 w-4" />
                    إنهاء البث
                  </Button>
                ) : (
                  <Button onClick={handleStartStream}>
                    <Play className="ml-2 h-4 w-4" />
                    بدء البث
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat & Interaction Panel */}
        <div className="space-y-4">
          {/* Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الدردشة المباشرة</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 p-4">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`p-2 rounded-lg ${
                      msg.type === 'hand_raise' ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <span className="font-medium">{msg.user}</span>
                        <span>{msg.timestamp.toLocaleTimeString('ar-SA')}</span>
                        {msg.type === 'hand_raise' && <Hand className="h-3 w-3 text-yellow-600" />}
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالة..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant={handRaised ? "default" : "outline"}
                  size="sm"
                  className="w-full mt-2"
                  onClick={handleRaiseHand}
                >
                  <Hand className="ml-2 h-4 w-4" />
                  {handRaised ? 'خفض اليد' : 'رفع اليد'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Poll */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">استطلاع مباشر</CardTitle>
            </CardHeader>
            <CardContent>
              {activePoll.isActive ? (
                <div className="space-y-3">
                  <h4 className="font-medium">{activePoll.question}</h4>
                  <div className="space-y-2">
                    {activePoll.options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        size="sm"
                        className="w-full justify-between"
                        onClick={() => handleVote(option)}
                      >
                        <span>{option}</span>
                        <Badge variant="secondary">
                          {activePoll.votes[option] || 0}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">لا يوجد استطلاع نشط حالياً</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Poll Creation */}
      <Card>
        <CardHeader>
          <CardTitle>إنشاء استطلاع جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pollQuestion">سؤال الاستطلاع</Label>
              <Input
                id="pollQuestion"
                value={newPollQuestion}
                onChange={(e) => setNewPollQuestion(e.target.value)}
                placeholder="أدخل سؤال الاستطلاع"
              />
            </div>
            <div className="space-y-2">
              <Label>خيارات الإجابة</Label>
              {newPollOptions.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => {
                    const updated = [...newPollOptions];
                    updated[index] = e.target.value;
                    setNewPollOptions(updated);
                  }}
                  placeholder={`الخيار ${index + 1}`}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewPollOptions([...newPollOptions, ''])}
              >
                إضافة خيار
              </Button>
            </div>
            <Button onClick={handleCreatePoll}>
              <BarChart3 className="ml-2 h-4 w-4" />
              إنشاء الاستطلاع
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};