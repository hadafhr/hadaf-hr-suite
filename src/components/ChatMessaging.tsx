import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Send, 
  Paperclip, 
  Search, 
  Archive, 
  Filter,
  Bot,
  Phone,
  Video,
  MoreVertical,
  Download,
  Star,
  Eye,
  Calendar,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Image as ImageIcon,
  Mic
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'employee' | 'manager' | 'hr' | 'ai';
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image' | 'audio';
  status: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  linkedTo?: {
    type: 'request' | 'evaluation' | 'task';
    id: string;
    title: string;
  };
  priority?: 'low' | 'medium' | 'high';
  category?: 'administrative' | 'legal' | 'hr' | 'evaluation' | 'complaint';
}

interface Conversation {
  id: string;
  participant: {
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  category: string;
  priority: 'low' | 'medium' | 'high';
  isArchived: boolean;
}

const sampleConversations: Conversation[] = [
  {
    id: '1',
    participant: {
      name: 'أحمد محمد',
      role: 'مدير الموارد البشرية',
      avatar: '/placeholder.svg',
      status: 'online'
    },
    lastMessage: 'تم مراجعة طلب الإجازة وسيتم الرد خلال 24 ساعة',
    lastMessageTime: new Date('2024-01-15T10:30:00'),
    unreadCount: 2,
    category: 'إدارية',
    priority: 'medium',
    isArchived: false
  },
  {
    id: '2',
    participant: {
      name: 'فاطمة العلي',
      role: 'مديرة القسم',
      avatar: '/placeholder.svg',
      status: 'away'
    },
    lastMessage: 'يرجى تحديث تقرير الأداء الشهري',
    lastMessageTime: new Date('2024-01-15T09:15:00'),
    unreadCount: 0,
    category: 'تقييمات',
    priority: 'high',
    isArchived: false
  }
];

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: 'employee',
    senderName: 'محمد أحمد',
    content: 'السلام عليكم، أرغب في تقديم طلب إجازة اعتيادية لمدة أسبوع',
    timestamp: new Date('2024-01-15T09:00:00'),
    type: 'text',
    status: 'read',
    category: 'administrative',
    priority: 'medium'
  },
  {
    id: '2',
    sender: 'ai',
    senderName: 'المساعد الذكي',
    content: 'يمكنني مساعدتك في تقديم طلب الإجازة. هل تريد:\n1. تعبئة نموذج الإجازة الاعتيادية\n2. مراجعة رصيد الإجازات المتاح\n3. الاطلاع على سياسة الإجازات',
    timestamp: new Date('2024-01-15T09:01:00'),
    type: 'text',
    status: 'read'
  },
  {
    id: '3',
    sender: 'manager',
    senderName: 'أحمد محمد',
    content: 'وعليكم السلام، تم استلام طلبك وسيتم مراجعته خلال 24 ساعة',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'text',
    status: 'delivered',
    linkedTo: {
      type: 'request',
      id: 'REQ-2024-001',
      title: 'طلب إجازة اعتيادية'
    }
  }
];

export default function ChatMessaging() {
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showArchived, setShowArchived] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'employee',
      senderName: 'المستخدم الحالي',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // محاكاة رد الذكاء الاصطناعي
    if (isAIEnabled && newMessage.toLowerCase().includes('مساعدة')) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          senderName: 'المساعد الذكي',
          content: 'كيف يمكنني مساعدتك؟ يمكنني:\n• تقديم المساعدة في الطلبات الإدارية\n• شرح السياسات والإجراءات\n• ربط رسالتك بالملفات ذات الصلة',
          timestamp: new Date(),
          type: 'text',
          status: 'delivered'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }

    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال رسالتك بنجاح"
    });
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const filteredConversations = sampleConversations.filter(conv => {
    if (showArchived !== conv.isArchived) return false;
    if (selectedCategory !== 'all' && conv.category !== selectedCategory) return false;
    if (searchQuery && !conv.participant.name.includes(searchQuery)) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-3 h-3 bg-green-500 rounded-full" />;
      case 'away': return <div className="w-3 h-3 bg-yellow-500 rounded-full" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'ai': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'hr': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar - قائمة المحادثات */}
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">المراسلات</h2>
          
          {/* البحث والفلاتر */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في المحادثات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="إدارية">إدارية</SelectItem>
                  <SelectItem value="قانونية">قانونية</SelectItem>
                  <SelectItem value="موارد بشرية">موارد بشرية</SelectItem>
                  <SelectItem value="تقييمات">تقييمات</SelectItem>
                  <SelectItem value="شكاوى">شكاوى</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={showArchived ? "default" : "outline"}
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
              >
                <Archive className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* قائمة المحادثات */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className={`mb-2 cursor-pointer transition-colors hover:bg-accent ${
                  selectedConversation === conversation.id ? 'border-primary bg-accent' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusIcon(conversation.participant.status)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm truncate">
                          {conversation.participant.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <Badge variant={getPriorityColor(conversation.priority)} className="text-xs">
                            {conversation.priority}
                          </Badge>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        {conversation.participant.role}
                      </p>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime.toLocaleTimeString('ar-SA', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {conversation.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* منطقة المحادثة الرئيسية */}
      <div className="flex-1 flex flex-col">
        {/* رأس المحادثة */}
        <div className="border-b p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>أم</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">أحمد محمد</h3>
                <p className="text-sm text-muted-foreground">مدير الموارد البشرية • متصل</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* منطقة الرسائل */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'employee' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${message.sender === 'employee' ? 'order-2' : 'order-1'}`}>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'employee' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : getSenderColor(message.sender)
                  }`}>
                    {message.sender !== 'employee' && (
                      <div className="flex items-center gap-2 mb-2">
                        {message.sender === 'ai' && <Bot className="w-4 h-4" />}
                        <span className="text-xs font-medium">{message.senderName}</span>
                      </div>
                    )}
                    
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.linkedTo && (
                      <div className="mt-2 p-2 bg-background/20 rounded border">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <div>
                            <p className="text-xs font-medium">{message.linkedTo.title}</p>
                            <p className="text-xs opacity-70">#{message.linkedTo.id}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {message.attachments && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-background/20 rounded">
                            <Paperclip className="w-4 h-4" />
                            <span className="text-xs">{attachment.name}</span>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>
                      {message.timestamp.toLocaleTimeString('ar-SA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sender === 'employee' && (
                      <div className="flex items-center gap-1">
                        {message.status === 'sent' && <Clock className="w-3 h-3" />}
                        {message.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                        {message.status === 'read' && <Eye className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* منطقة كتابة الرسالة */}
        <div className="border-t p-4 bg-background">
          {/* الذكاء الاصطناعي */}
          {isAIEnabled && (
            <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">المساعد الذكي نشط</span>
              </div>
              <p className="text-xs text-muted-foreground">
                سيتم تحليل رسائلك وتقديم اقتراحات مناسبة تلقائياً
              </p>
            </div>
          )}
          
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                placeholder="اكتب رسالتك هنا..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" onClick={handleFileUpload}>
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      </div>

      {/* الشريط الجانبي للمعلومات */}
      <div className="w-80 border-l bg-background p-4">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">المعلومات</TabsTrigger>
            <TabsTrigger value="files">الملفات</TabsTrigger>
            <TabsTrigger value="ai">الذكاء الاصطناعي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">معلومات المحادثة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">الفئة</label>
                  <p className="text-sm">إدارية</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">الأولوية</label>
                  <Badge variant="default" className="text-xs">متوسطة</Badge>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">تاريخ البداية</label>
                  <p className="text-sm">15 يناير 2024</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">عدد الرسائل</label>
                  <p className="text-sm">12 رسالة</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">الملفات المرفقة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">لا توجد ملفات مرفقة</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">توصيات الذكاء الاصطناعي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-600">اقتراح</p>
                      <p className="text-xs text-muted-foreground">
                        يمكن ربط هذه المحادثة بطلب الإجازة الجديد تلقائياً
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-600">تحليل المشاعر</p>
                      <p className="text-xs text-muted-foreground">
                        نبرة المحادثة إيجابية ومهنية
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}