import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Mic, MicOff, Video, VideoOff, Users, MessageCircle, 
  Send, Phone, PhoneOff, Volume2, VolumeX,
  Hand, Share2, StopCircle
} from 'lucide-react';
import { AudioRecorder, encodeAudioForAPI, playAudioData, clearAudioQueue } from '@/utils/RealtimeAudio';
import { useToast } from '@/hooks/use-toast';

interface LiveStreamInterfaceProps {
  courseId: string;
  courseTitle: string;
  instructorName: string;
  isInstructor?: boolean;
}

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'user' | 'instructor' | 'system' | 'ai';
}

export const LiveStreamInterface: React.FC<LiveStreamInterfaceProps> = ({
  courseId,
  courseTitle,
  instructorName,
  isInstructor = false
}) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'النظام',
      message: `مرحباً بكم في البث المباشر للدورة: ${courseTitle}`,
      timestamp: new Date().toLocaleTimeString('ar-SA'),
      type: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const connectToLiveStream = async () => {
    try {
      setIsConnected(true);
      toast({
        title: "تم الاتصال بنجاح",
        description: "مرحباً بك في البث المباشر",
      });
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    toast({
      title: "بدء التسجيل",
      description: "يمكنك التحدث الآن",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const disconnect = () => {
    setIsConnected(false);
    setIsRecording(false);
  };

  const addChatMessage = (username: string, message: string, type: ChatMessage['type'] = 'user') => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      username,
      message,
      timestamp: new Date().toLocaleTimeString('ar-SA'),
      type
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;
    addChatMessage('أنت', newMessage, 'user');
    setNewMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]" dir="rtl">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              البث المباشر - {courseTitle}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">{instructorName}</p>
                <p className="text-gray-500">المدرب الرئيسي</p>
              </div>
              
              {isConnected && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  مباشر
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-3">
              {!isConnected ? (
                <Button onClick={connectToLiveStream} className="gap-2">
                  <Phone className="w-4 h-4" />
                  الانضمام للبث
                </Button>
              ) : (
                <>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    onClick={isRecording ? stopRecording : startRecording}
                    className="gap-2"
                  >
                    {isRecording ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isRecording ? 'إيقاف التسجيل' : 'بدء التحدث'}
                  </Button>
                  
                  <Button variant="destructive" onClick={disconnect}>
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              المشاركون (3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm flex-1">{instructorName}</span>
                <Badge variant="secondary" className="text-xs">مدرب</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              المحادثة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium">{msg.username}</span>
                      <span>{msg.timestamp}</span>
                      {msg.type === 'ai' && (
                        <Badge variant="outline" className="text-xs">مساعد ذكي</Badge>
                      )}
                    </div>
                    <p className={`text-sm p-2 rounded-lg ${
                      msg.type === 'system' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : msg.type === 'ai'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-gray-50'
                    }`}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالة..."
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <Button onClick={sendChatMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};