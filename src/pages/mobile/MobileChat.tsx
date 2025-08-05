import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile
} from 'lucide-react';

export const MobileChat: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);
  const { t } = useTranslation();

  const chatList = [
    {
      id: 1,
      name: 'فريق الموارد البشرية',
      lastMessage: 'تم إرسال التقرير الشهري',
      time: '10:30',
      unread: 2,
      avatar: 'HR',
      isGroup: true,
      online: true
    },
    {
      id: 2,
      name: 'أحمد محمد - مدير المبيعات',
      lastMessage: 'شكراً لك على التقرير',
      time: '09:45',
      unread: 0,
      avatar: 'أم',
      isGroup: false,
      online: true
    },
    {
      id: 3,
      name: 'فريق التطوير',
      lastMessage: 'الميزة الجديدة جاهزة للاختبار',
      time: '08:20',
      unread: 5,
      avatar: 'فت',
      isGroup: true,
      online: false
    },
    {
      id: 4,
      name: 'فاطمة علي - مسؤولة التدريب',
      lastMessage: 'متى موعد الاجتماع القادم؟',
      time: 'أمس',
      unread: 1,
      avatar: 'فع',
      isGroup: false,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'أحمد محمد',
      message: 'السلام عليكم، كيف الحال؟',
      time: '10:00',
      isMine: false,
      avatar: 'أم'
    },
    {
      id: 2,
      sender: 'أنت',
      message: 'وعليكم السلام، الحمد لله بخير',
      time: '10:02',
      isMine: true,
      avatar: 'أ'
    },
    {
      id: 3,
      sender: 'أحمد محمد',
      message: 'هل يمكنك إرسال تقرير المبيعات الشهري؟',
      time: '10:05',
      isMine: false,
      avatar: 'أم'
    },
    {
      id: 4,
      sender: 'أنت',
      message: 'بالطبع، سأرسله خلال ساعة',
      time: '10:06',
      isMine: true,
      avatar: 'أ'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {selectedChat ? (
        // Chat View
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>أم</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">أحمد محمد</h3>
                  <p className="text-sm text-green-600">متصل الآن</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg.isMine && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.isMine
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك..."
                  className="pr-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Chat List View
        <div className="flex-1 p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في المحادثات..."
              className="pl-10"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-2">
            {chatList.map((chat) => (
              <Card
                key={chat.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedChat(chat.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{chat.avatar}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <MobileNavigation />
    </div>
  );
};