import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { 
  MessageCircle,
  Phone,
  Video,
  Bell,
  Calendar,
  Radio,
  Bot,
  FileText,
  Users,
  Settings,
  Send,
  Mic,
  Camera,
  Share,
  Globe,
  Volume2,
  Eye,
  Languages,
  Zap,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  PlayCircle,
  UserPlus,
  Archive,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Headphones,
  Monitor
} from 'lucide-react';

export const ComprehensiveInternalCommunication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');

  // Mock data for communication statistics
  const communicationStats = {
    totalMessages: 2456,
    activeCalls: 12,
    upcomingStreams: 5,
    activeAnnouncements: 8,
    onlineUsers: 145,
    translationsToday: 892,
    aiResponses: 156,
    engagementRate: 87
  };

  // Mock data for recent chats
  const recentChats = [
    { id: '1', name: 'فريق التطوير', lastMessage: 'تم الانتهاء من المشروع', time: '10:30', unread: 3, type: 'group' },
    { id: '2', name: 'أحمد محمد', lastMessage: 'سأرسل التقرير غداً', time: '09:45', unread: 1, type: 'individual' },
    { id: '3', name: 'إدارة الموارد البشرية', lastMessage: 'إعلان جديد متاح', time: '08:15', unread: 0, type: 'group' }
  ];

  // Mock data for announcements
  const announcements = [
    { id: '1', title: 'اجتماع الإدارة العليا', content: 'اجتماع طارئ يوم الغد', priority: 'high', views: 245, reactions: 12 },
    { id: '2', title: 'إجازة نهاية العام', content: 'تعديل في مواعيد الإجازات', priority: 'medium', views: 189, reactions: 8 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">إجمالي الرسائل</p>
                <p className="text-2xl font-bold">{communicationStats.totalMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">المتصلون حالياً</p>
                <p className="text-2xl font-bold">{communicationStats.onlineUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">المكالمات النشطة</p>
                <p className="text-2xl font-bold">{communicationStats.activeCalls}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">البث المباشر</p>
                <p className="text-2xl font-bold">{communicationStats.upcomingStreams}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">ترجمات اليوم</p>
                <p className="text-2xl font-bold">{communicationStats.translationsToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">ردود الذكاء الاصطناعي</p>
                <p className="text-2xl font-bold">{communicationStats.aiResponses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">الإعلانات النشطة</p>
                <p className="text-2xl font-bold">{communicationStats.activeAnnouncements}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-white" />
              <div>
                <p className="text-white/80 text-sm">معدل التفاعل</p>
                <p className="text-2xl font-bold">{communicationStats.engagementRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex-col gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>رسالة جديدة</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Phone className="w-6 h-6" />
              <span>بدء مكالمة</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Radio className="w-6 h-6" />
              <span>بث مباشر</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Bell className="w-6 h-6" />
              <span>إعلان جديد</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMessaging = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">المحادثات</CardTitle>
            <Button size="sm" className="gap-1">
              <UserPlus className="w-4 h-4" />
              جديد
            </Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="بحث في المحادثات..." className="flex-1" />
            <Button size="sm" variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 cursor-pointer hover:bg-muted/50 border-r-2 ${
                  selectedChat === chat.id ? 'bg-muted border-r-primary' : 'border-r-transparent'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{chat.name}</span>
                      {chat.type === 'group' && <Users className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                    {chat.unread > 0 && (
                      <Badge className="w-5 h-5 text-xs flex items-center justify-center p-0">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2 flex flex-col">
        {selectedChat ? (
          <>
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">فريق التطوير</h3>
                    <p className="text-sm text-muted-foreground">12 عضو متصل</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-4">
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                      أ
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">أحمد محمد</span>
                        <span className="text-xs text-muted-foreground">10:30</span>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p>مرحباً جميعاً، كيف سير العمل في المشروع؟</p>
                        {isTranslationEnabled && (
                          <div className="mt-2 pt-2 border-t border-border/50">
                            <p className="text-xs text-muted-foreground italic">
                              Hello everyone, how is the progress on the project?
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-md">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">10:35</span>
                        <span className="font-medium">أنت</span>
                      </div>
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        <p>العمل يسير بشكل جيد، سننتهي حسب الجدولة</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Switch
                      checked={isTranslationEnabled}
                      onCheckedChange={setIsTranslationEnabled}
                    />
                    <span className="text-sm">الترجمة التلقائية</span>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                        <SelectItem value="ur">اردو</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="اكتب رسالتك هنا..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="outline">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-primary">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">اختر محادثة للبدء</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );

  const renderCalls = () => (
    <div className="space-y-6">
      {/* Call Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            مركز المكالمات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2">
              <Phone className="w-8 h-8" />
              <span>مكالمة صوتية</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Video className="w-8 h-8" />
              <span>مكالمة مرئية</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-8 h-8" />
              <span>مؤتمر جماعي</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Calls */}
      <Card>
        <CardHeader>
          <CardTitle>المكالمات النشطة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">مكالمة مع فريق المبيعات</p>
                  <p className="text-sm text-muted-foreground">5 مشاركين - 15:30 دقيقة</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">نشط</Badge>
                <Button size="sm">انضم</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            الترجمة الصوتية الفورية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">اللغات المتاحة</h4>
              <div className="space-y-2">
                {['العربية', 'English', 'हिन्दी', 'اردو', 'Français', 'Filipino'].map((lang) => (
                  <div key={lang} className="flex items-center justify-between p-2 border rounded">
                    <span>{lang}</span>
                    <Switch />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">إعدادات الترجمة</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">جودة الترجمة</label>
                  <Progress value={85} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">سرعة المعالجة</label>
                  <Progress value={92} className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      {/* Create Announcement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            إنشاء إعلان جديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="عنوان الإعلان" />
          <Textarea placeholder="محتوى الإعلان" rows={4} />
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">عالية</SelectItem>
                <SelectItem value="medium">متوسطة</SelectItem>
                <SelectItem value="low">منخفضة</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Send className="w-4 h-4" />
              نشر الإعلان
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle>الإعلانات الحالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <p className="text-muted-foreground mt-1">{announcement.content}</p>
                  </div>
                  <Badge 
                    variant={announcement.priority === 'high' ? 'destructive' : 
                            announcement.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {announcement.priority === 'high' ? 'عالية' : 
                     announcement.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {announcement.views} مشاهدة
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {announcement.reactions} تفاعل
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLiveStream = () => (
    <div className="space-y-6">
      {/* Stream Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            البث المباشر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-20 flex-col gap-2 bg-red-600 hover:bg-red-700">
              <PlayCircle className="w-8 h-8" />
              <span>بدء البث المباشر</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-8 h-8" />
              <span>جدولة بث</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Stream Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الترجمة متعددة اللغات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>النصوص المترجمة (Subtitles)</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>القنوات الصوتية متعددة اللغات</span>
              <Switch />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">اللغات المفعلة</h4>
              <div className="flex flex-wrap gap-2">
                {['العربية', 'English', 'हिन्दी', 'اردو'].map((lang) => (
                  <Badge key={lang} variant="outline">{lang}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات البث</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">جودة الفيديو</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجودة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p Full HD</SelectItem>
                  <SelectItem value="720p">720p HD</SelectItem>
                  <SelectItem value="480p">480p SD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span>تسجيل البث</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>التفاعل المباشر</span>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Streams */}
      <Card>
        <CardHeader>
          <CardTitle>البث القادم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">اجتماع الربع السنوي</p>
                  <p className="text-sm text-muted-foreground">الغد - 10:00 صباحاً</p>
                </div>
              </div>
              <Badge variant="outline">مجدول</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-6">
      {/* AI Assistant Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            المساعد الافتراضي الذكي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">مساعد بُعد الذكي</p>
                  <p className="text-sm text-muted-foreground">
                    مرحباً! يمكنني مساعدتك في الإجابة على استفساراتك حول الموارد البشرية، 
                    المرتبات، الإجازات، والسياسات الداخلية. كيف يمكنني خدمتك اليوم؟
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <Textarea 
                placeholder="اطرح سؤالك هنا..."
                rows={2}
                className="flex-1 resize-none"
              />
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                إرسال
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الردود التلقائية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>الإجابة على استفسارات الرواتب</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>معلومات الإجازات والرصيد</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>السياسات والإجراءات</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>جدولة الاجتماعات</span>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التحليلات الذكية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>تحليل المشاعر</span>
                <Badge className="bg-green-500">نشط</Badge>
              </div>
              <Progress value={78} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>استخراج الكلمات المفتاحية</span>
                <Badge className="bg-blue-500">نشط</Badge>
              </div>
              <Progress value={85} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>التوصيات الاستراتيجية</span>
                <Badge className="bg-purple-500">نشط</Badge>
              </div>
              <Progress value={92} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>رؤى وتوصيات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">زيادة في التفاعل</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    لوحظ زيادة بنسبة 25% في التفاعل مع الإعلانات الداخلية هذا الأسبوع
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">تحسين مقترح</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    يُنصح بزيادة استخدام الترجمة التلقائية لتحسين التواصل بين الفرق متعددة اللغات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            إنشاء التقارير
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع التقرير</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="messages">تقرير الرسائل</SelectItem>
                  <SelectItem value="calls">تقرير المكالمات</SelectItem>
                  <SelectItem value="engagement">تقرير التفاعل</SelectItem>
                  <SelectItem value="translation">تقرير الترجمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الفترة الزمنية</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">تنسيق التصدير</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات التواصل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>الرسائل المرسلة اليوم</span>
                <Badge>{communicationStats.totalMessages}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>المكالمات المكتملة</span>
                <Badge>247</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>جلسات البث</span>
                <Badge>15</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>معدل الاستجابة</span>
                <Badge className="bg-green-500">94%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أداء الترجمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>دقة الترجمة</span>
                  <span>96%</span>
                </div>
                <Progress value={96} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>سرعة المعالجة</span>
                  <span>1.2 ثانية</span>
                </div>
                <Progress value={88} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>اللغات المدعومة</span>
                  <span>12 لغة</span>
                </div>
                <Progress value={100} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>مقارنة بين الأقسام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { dept: 'قسم التطوير', messages: 450, engagement: 92 },
              { dept: 'قسم المبيعات', messages: 380, engagement: 88 },
              { dept: 'الموارد البشرية', messages: 320, engagement: 95 },
              { dept: 'قسم المالية', messages: 280, engagement: 85 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.dept}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{item.messages} رسالة</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.engagement}% تفاعل</span>
                    <Progress value={item.engagement} className="w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            الإعدادات العامة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">الإشعارات الفورية</h4>
              <p className="text-sm text-muted-foreground">تفعيل الإشعارات للرسائل الجديدة</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">الترجمة التلقائية</h4>
              <p className="text-sm text-muted-foreground">ترجمة الرسائل تلقائياً</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">حفظ المكالمات</h4>
              <p className="text-sm text-muted-foreground">تسجيل وحفظ المكالمات المهمة</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Permission Management */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة الأذونات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">الإدارة العليا</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>البث المباشر</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>الترجمة متعددة اللغات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>إدارة الإعلانات</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">المديرون</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>المكالمات الجماعية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>الإعلانات القسمية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>البث المحدود</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">الموظفون</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>المحادثات الفردية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>المحادثات الجماعية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>مشاهدة البث</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات التكامل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                نظام الاجتماعات
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                ربط تلقائي مع جدولة الاجتماعات
              </p>
              <Switch defaultChecked />
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                نظام الطلبات
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                إشعارات الطلبات والموافقات
              </p>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* System Header */}
      <SystemHeader
        title="نظام التواصل الداخلي الذكي المتطور"
        description="منصة اتصالات شاملة مع ترجمة فورية ومساعد ذكي وبث مباشر تفاعلي"
        icon={<MessageCircle className="h-12 w-12 text-white" />}
        showBackButton={false}
      />

      {/* Main Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-muted/50">
            <TabsTrigger value="dashboard" className="gap-1 text-xs lg:text-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">لوحة القيادة</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="gap-1 text-xs lg:text-sm">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">المراسلة</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="gap-1 text-xs lg:text-sm">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">المكالمات</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-1 text-xs lg:text-sm">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">الإعلانات</span>
            </TabsTrigger>
            <TabsTrigger value="streaming" className="gap-1 text-xs lg:text-sm">
              <Radio className="w-4 h-4" />
              <span className="hidden sm:inline">البث المباشر</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-1 text-xs lg:text-sm">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">المساعد الذكي</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-1 text-xs lg:text-sm">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1 text-xs lg:text-sm">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
            <TabsContent value="messaging">{renderMessaging()}</TabsContent>
            <TabsContent value="calls">{renderCalls()}</TabsContent>
            <TabsContent value="announcements">{renderAnnouncements()}</TabsContent>
            <TabsContent value="streaming">{renderLiveStream()}</TabsContent>
            <TabsContent value="ai">{renderAIAssistant()}</TabsContent>
            <TabsContent value="reports">{renderReports()}</TabsContent>
            <TabsContent value="settings">{renderSettings()}</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};