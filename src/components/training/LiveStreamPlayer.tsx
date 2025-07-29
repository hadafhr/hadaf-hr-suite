import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Users, 
  MessageSquare,
  Settings,
  Volume2,
  Maximize,
  Play,
  Pause,
} from 'lucide-react';

interface LiveStreamPlayerProps {
  isInstructor?: boolean;
  sessionId: string;
  onJoinSession?: () => void;
  onLeaveSession?: () => void;
}

export const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({
  isInstructor = false,
  sessionId,
  onJoinSession,
  onLeaveSession
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [participants, setParticipants] = useState(12);
  const [messages, setMessages] = useState([
    { id: 1, user: 'أحمد محمد', message: 'مرحباً بالجميع', time: '14:30' },
    { id: 2, user: 'سارة أحمد', message: 'هل يمكن رفع الصوت قليلاً؟', time: '14:32' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // محاكاة الاتصال بجلسة البث المباشر
    if (isConnected && videoRef.current) {
      // هنا سيتم تكامل WebRTC أو Zoom SDK
      console.log('Connecting to live session:', sessionId);
    }
  }, [isConnected, sessionId]);

  const handleJoinSession = () => {
    setIsConnected(true);
    onJoinSession?.();
  };

  const handleLeaveSession = () => {
    setIsConnected(false);
    onLeaveSession?.();
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleRecording = () => setIsRecording(!isRecording);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'أنت',
        message: newMessage,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-8 text-center space-y-4">
        <Video className="h-16 w-16 text-primary mx-auto" />
        <h3 className="text-xl font-semibold">الانضمام للجلسة المباشرة</h3>
        <p className="text-muted-foreground">
          اضغط للانضمام لجلسة التدريب المباشرة مع المدرب والمتدربين الآخرين
        </p>
        <Button onClick={handleJoinSession} className="btn-primary">
          <Video className="h-4 w-4 mr-2" />
          الانضمام للجلسة
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 gap-4 h-[600px]">
      {/* مشغل الفيديو الرئيسي */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="relative h-full p-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover bg-black"
            autoPlay
            muted={!isAudioOn}
          />
          
          {/* شريط التحكم */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVideo}
                  className={isVideoOn ? "text-white" : "text-red-500"}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAudio}
                  className={isAudioOn ? "text-white" : "text-red-500"}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                
                {isInstructor && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleScreenShare}
                      className={isScreenSharing ? "text-primary" : "text-white"}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? "text-red-500" : "text-white"}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-20"
                  />
                </div>
                
                <div className="flex items-center gap-1 text-white">
                  <Users className="h-4 w-4" />
                  <span>{participants}</span>
                </div>
                
                <Button variant="ghost" size="sm" className="text-white">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* مؤشرات الحالة */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="destructive" className="animate-pulse">
              🔴 بث مباشر
            </Badge>
            {isRecording && (
              <Badge variant="secondary">
                <Play className="h-3 w-3 mr-1" />
                تسجيل
              </Badge>
            )}
          </div>
        </Card>
      </div>

      {/* لوحة المحادثة والمشاركين */}
      <div className="space-y-4">
        {/* المشاركون */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            المشاركون ({participants})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              د. محمد الأحمد (مدرب)
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              أحمد محمد
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              سارة أحمد
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              فاطمة علي
            </div>
          </div>
        </Card>

        {/* المحادثة */}
        <Card className="p-4 flex-1">
          <h4 className="font-semibold mb-3 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            المحادثة
          </h4>
          
          <div className="space-y-2 max-h-64 overflow-y-auto mb-3">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-primary">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-muted-foreground">{msg.message}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="اكتب رسالتك..."
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            <Button size="sm" onClick={sendMessage}>
              إرسال
            </Button>
          </div>
        </Card>

        {/* أزرار التحكم */}
        <div className="space-y-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLeaveSession}
          >
            مغادرة الجلسة
          </Button>
        </div>
      </div>
    </div>
  );
};