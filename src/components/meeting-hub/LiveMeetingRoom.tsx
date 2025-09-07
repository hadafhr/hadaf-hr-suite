import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Share2, 
  Upload, Download, Users, MessageCircle, FileText, 
  Circle, StopCircle, Camera, Monitor, Volume2, VolumeX,
  Settings, MoreVertical, Clock, Calendar
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LiveMeetingRoomProps {
  meetingId: string;
  isHost: boolean;
  onLeave: () => void;
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isScreenSharing: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
}

const LiveMeetingRoom: React.FC<LiveMeetingRoomProps> = ({ meetingId, isHost, onLeave }) => {
  const { toast } = useToast();
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'أنت',
      isHost: isHost,
      videoEnabled: true,
      audioEnabled: true,
      isScreenSharing: false
    },
    {
      id: '2', 
      name: 'أحمد محمد',
      isHost: false,
      videoEnabled: true,
      audioEnabled: true,
      isScreenSharing: false
    },
    {
      id: '3',
      name: 'فاطمة علي', 
      isHost: false,
      videoEnabled: false,
      audioEnabled: true,
      isScreenSharing: false
    }
  ]);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'أحمد محمد',
      message: 'أهلاً بالجميع',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('video');
  const [meetingDuration, setMeetingDuration] = useState(0);
  const videoGridRef = useRef<HTMLDivElement>(null);

  // حساب مدة الاجتماع
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? 'تم إيقاف الكاميرا' : 'تم تشغيل الكاميرا',
      description: isVideoEnabled ? 'لن يتمكن الآخرون من رؤيتك' : 'يمكن للآخرين رؤيتك الآن'
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? 'تم كتم الصوت' : 'تم إلغاء كتم الصوت',
      description: isAudioEnabled ? 'لن يتمكن الآخرون من سماعك' : 'يمكن للآخرين سماعك الآن'
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? 'تم إيقاف التسجيل' : 'بدأ التسجيل',
      description: isRecording ? 'تم حفظ التسجيل' : 'جاري تسجيل الاجتماع...',
      variant: isRecording ? 'default' : 'destructive'
    });
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // طلب مشاركة الشاشة
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
        setIsScreenSharing(true);
        toast({
          title: 'بدأت مشاركة الشاشة',
          description: 'يمكن للمشاركين الآن رؤية شاشتك'
        });
      } else {
        setIsScreenSharing(false);
        toast({
          title: 'تم إيقاف مشاركة الشاشة',
          description: 'لم تعد تشارك شاشتك'
        });
      }
    } catch (error) {
      toast({
        title: 'فشل في مشاركة الشاشة',
        description: 'تأكد من منح الأذونات المطلوبة',
        variant: 'destructive'
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'أنت',
        message: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'أنت',
        message: `تم رفع الملف: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      };
      setChatMessages([...chatMessages, message]);
      toast({
        title: 'تم رفع الملف',
        description: `تم مشاركة ${file.name} مع المشاركين`
      });
    }
  };

  const generateTranscript = () => {
    toast({
      title: 'جاري إنشاء المحضر الذكي',
      description: 'سيتم إنشاء محضر الاجتماع تلقائياً باستخدام الذكاء الاصطناعي'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* شريط المعلومات العلوي */}
      <div className="flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono">{formatDuration(meetingDuration)}</span>
          </div>
          <Badge variant={isRecording ? 'destructive' : 'secondary'} className="flex items-center gap-1">
            {isRecording ? <Circle className="w-3 h-3" /> : <StopCircle className="w-3 h-3" />}
            {isRecording ? 'جاري التسجيل' : 'متوقف'}
          </Badge>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{participants.length} مشارك</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={generateTranscript}>
            <FileText className="w-4 h-4 ml-2" />
            محضر ذكي
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={onLeave}>
            <PhoneOff className="w-4 h-4 ml-2" />
            مغادرة
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* منطقة الفيديو الرئيسية */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="video">عرض الفيديو</TabsTrigger>
              <TabsTrigger value="screen">مشاركة الشاشة</TabsTrigger>
              <TabsTrigger value="presentation">العروض التقديمية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video" className="flex-1 p-4">
              <div ref={videoGridRef} className="grid grid-cols-2 gap-4 h-full">
                {participants.map((participant) => (
                  <Card key={participant.id} className="relative overflow-hidden bg-black">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      {participant.videoEnabled ? (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                          <Camera className="w-12 h-12 text-white/50" />
                        </div>
                      ) : (
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {participant.name}
                        {participant.isHost && ' (مضيف)'}
                      </Badge>
                      {!participant.audioEnabled && (
                        <Badge variant="destructive" className="p-1">
                          <MicOff className="w-3 h-3" />
                        </Badge>
                      )}
                      {participant.isScreenSharing && (
                        <Badge variant="default" className="p-1">
                          <Monitor className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="screen" className="flex-1 p-4">
              <Card className="h-full flex items-center justify-center bg-black">
                <div className="text-center text-white">
                  <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">مشاركة الشاشة</p>
                  <p className="text-sm text-white/70">انقر على "مشاركة الشاشة" لعرض شاشتك</p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="presentation" className="flex-1 p-4">
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">العروض التقديمية</p>
                  <p className="text-sm text-muted-foreground mb-4">ارفع ملفات PowerPoint أو PDF لعرضها</p>
                  <Button>
                    <Upload className="w-4 h-4 ml-2" />
                    رفع عرض تقديمي
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* أدوات التحكم */}
          <div className="flex items-center justify-center gap-2 p-4 bg-card border-t">
            <Button
              variant={isAudioEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full"
            >
              {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            
            <Button
              variant={isVideoEnabled ? "default" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full"
            >
              {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            
            <Button
              variant={isScreenSharing ? "secondary" : "outline"}
              size="lg"
              onClick={toggleScreenShare}
              className="rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            
            {isHost && (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                onClick={toggleRecording}
                className="rounded-full"
              >
                {isRecording ? <StopCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </Button>
            )}
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.mp4,.mp3"
            />
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-5 h-5" />
              </label>
            </Button>
          </div>
        </div>
        
        {/* لوحة الدردشة والملفات */}
        <div className="w-80 border-l bg-card flex flex-col">
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="chat">الدردشة</TabsTrigger>
              <TabsTrigger value="files">الملفات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{msg.sender}</span>
                        <span className="text-xs text-muted-foreground">
                          {msg.timestamp.toLocaleTimeString('ar-SA', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      {msg.type === 'file' ? (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          <a href={msg.fileUrl} download={msg.fileName} className="text-primary hover:underline">
                            {msg.fileName}
                          </a>
                        </div>
                      ) : (
                        <p className="text-sm">{msg.message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="اكتب رسالة..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="flex-1 p-4">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">الملفات المشاركة في الاجتماع</p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل جميع الملفات
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LiveMeetingRoom;