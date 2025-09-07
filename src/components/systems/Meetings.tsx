import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Calendar, Clock, Users, Search, Plus, Video, MapPin, 
  Mic, MicOff, Camera, CameraOff, Share2, MessageSquare, FileText, 
  Download, Upload, Settings, Phone, PhoneOff, Grid3X3, Maximize2,
  Circle, StopCircle, Play, Pause, BarChart3, Brain, TrendingUp,
  CheckCircle, AlertTriangle, Star, Bell, Archive, Edit, Trash2,
  Send, Paperclip, Image, FileIcon, Monitor, Presentation, MoreVertical,
  Eye, EyeOff, UserCheck, UserX, Volume2, VolumeX, Minimize2, Copy,
  RefreshCw, Filter, SortAsc, Calendar as CalendarIcon, Globe,
  Shield, Lock, Unlock, ChevronDown, ChevronUp, BookOpen, Target
} from 'lucide-react';

interface MeetingsProps {
  onBack: () => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'participant' | 'viewer';
  avatar?: string;
  isOnline?: boolean;
  videoEnabled?: boolean;
  audioEnabled?: boolean;
  permissions?: {
    canSpeak: boolean;
    canShare: boolean;
    canChat: boolean;
    isHost: boolean;
  };
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
}

interface SharedFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'video' | 'other';
  url: string;
  size: number;
  uploadedBy: string;
  timestamp: string;
}

interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  linkedToTasks?: boolean;
}

interface MeetingMinutes {
  id: string;
  meetingId: string;
  summary: string;
  keyDecisions: string[];
  actionItems: ActionItem[];
  attendanceList: string[];
  duration: number;
  generatedAt: string;
  aiGenerated: boolean;
}

interface AIInsight {
  id: string;
  type: 'productivity' | 'attendance' | 'engagement' | 'recommendation';
  title: string;
  description: string;
  score: number;
  suggestion: string;
  generatedAt: string;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: 'in_person' | 'online' | 'hybrid';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  attendees: Participant[];
  priority: 'high' | 'medium' | 'low';
  agenda?: string[];
  recordingEnabled?: boolean;
  recordingUrl?: string;
  chatHistory?: ChatMessage[];
  sharedFiles?: SharedFile[];
  minutes?: MeetingMinutes;
  aiInsights?: AIInsight[];
  meetingUrl?: string;
  passcode?: string;
  hostKey?: string;
  permissions?: {
    canRecord: boolean;
    canShare: boolean;
    canChat: boolean;
    canManageParticipants: boolean;
  };
}

interface MeetingAnalytics {
  totalMeetings: number;
  averageAttendance: number;
  averageDuration: number;
  completionRate: number;
  monthlyTrend: {
    month: string;
    meetings: number;
    attendance: number;
  }[];
  topParticipants: {
    name: string;
    attendance: number;
  }[];
  productivityScore: number;
  recommendations: string[];
}

export const Meetings: React.FC<MeetingsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [inMeetingView, setInMeetingView] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [gridView, setGridView] = useState(true);
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [showJoinMeeting, setShowJoinMeeting] = useState(false);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  const [newMeetingData, setNewMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    type: 'online' as 'in_person' | 'online' | 'hybrid',
    agenda: [''],
    recordingEnabled: true,
    priority: 'medium' as 'high' | 'medium' | 'low'
  });
  
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'اجتماع مراجعة الأداء الشهري',
      description: 'مراجعة أداء الفرق والمشاريع والخطط القادمة',
      organizer: 'أحمد محمد - مدير الموارد البشرية',
      date: '2024-02-15',
      time: '10:00',
      duration: '90 دقيقة',
      location: 'قاعة الاجتماعات الرئيسية',
      type: 'in_person',
      status: 'ongoing',
      attendees: [
        { 
          id: '1', name: 'سارة أحمد', email: 'sarah@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: false },
          isOnline: true, videoEnabled: true, audioEnabled: true
        },
        { 
          id: '2', name: 'محمد خالد', email: 'mohammed@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: false, canChat: true, isHost: false },
          isOnline: true, videoEnabled: false, audioEnabled: true
        },
        { 
          id: '3', name: 'فاطمة علي', email: 'fatima@company.com', role: 'organizer',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: true },
          isOnline: true, videoEnabled: true, audioEnabled: true
        }
      ],
      priority: 'high',
      agenda: ['مراجعة KPIs الشهرية', 'تقييم أداء الفرق', 'وضع خطط التحسين'],
      recordingEnabled: true,
      meetingUrl: 'https://meet.company.com/room/123',
      passcode: '123456',
      hostKey: 'HOST123',
      permissions: {
        canRecord: true,
        canShare: true,
        canChat: true,
        canManageParticipants: true
      },
      chatHistory: [
        {
          id: '1',
          senderId: '3',
          senderName: 'فاطمة علي',
          message: 'مرحباً بالجميع في اجتماع مراجعة الأداء',
          timestamp: '2024-02-15T10:05:00Z',
          type: 'text'
        }
      ],
      sharedFiles: [],
      aiInsights: [
        {
          id: '1',
          type: 'productivity',
          title: 'مستوى الإنتاجية عالي',
          description: 'معدل المشاركة في الاجتماع 95%',
          score: 95,
          suggestion: 'الحفاظ على هذا المستوى العالي من المشاركة',
          generatedAt: '2024-02-15T10:00:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'ورشة التدريب على النظام الجديد',
      description: 'تدريب الموظفين على استخدام نظام إدارة الموارد البشرية الجديد',
      organizer: 'سارة أحمد - مدير التقنية',
      date: '2024-02-16',
      time: '14:00',
      duration: '120 دقيقة',
      location: 'رابط زوم',
      type: 'online',
      status: 'scheduled',
      attendees: [
        { 
          id: '4', name: 'علي أحمد', email: 'ali@company.com', role: 'organizer',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: true },
          isOnline: false, videoEnabled: true, audioEnabled: true
        },
        { 
          id: '5', name: 'نور محمد', email: 'noor@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: false },
          isOnline: false, videoEnabled: true, audioEnabled: true
        }
      ],
      priority: 'medium',
      recordingEnabled: true,
      meetingUrl: 'https://zoom.us/j/123456789',
      passcode: '789012',
      chatHistory: [],
      sharedFiles: [
        {
          id: '1',
          name: 'دليل النظام الجديد.pdf',
          type: 'pdf',
          url: 'https://storage.company.com/files/guide.pdf',
          size: 2048000,
          uploadedBy: 'سارة أحمد',
          timestamp: '2024-02-16T13:55:00Z'
        }
      ]
    },
    {
      id: '3',
      title: 'اجتماع مجلس الإدارة',
      description: 'الاجتماع الشهري لمجلس إدارة الشركة',
      organizer: 'عبد العزيز الملك - الرئيس التنفيذي',
      date: '2024-02-14',
      time: '09:00',
      duration: '180 دقيقة',
      location: 'قاعة مجلس الإدارة',
      type: 'hybrid',
      status: 'completed',
      attendees: [
        { 
          id: '6', name: 'عبد العزيز الملك', email: 'ceo@company.com', role: 'organizer',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: true }
        },
        { 
          id: '7', name: 'خالد السالم', email: 'khalid@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: false }
        }
      ],
      priority: 'high',
      recordingEnabled: true,
      recordingUrl: 'https://storage.company.com/recordings/board-meeting.mp4',
      minutes: {
        id: '1',
        meetingId: '3',
        summary: 'تم مناقشة الأداء المالي للربع الأول والموافقة على الخطة الاستراتيجية الجديدة.',
        keyDecisions: [
          'الموافقة على زيادة الميزانية التشغيلية بنسبة 15%',
          'تطوير منتج جديد في القطاع التقني',
          'توسيع الفريق التجاري خلال الربع القادم'
        ],
        actionItems: [
          {
            id: '1',
            task: 'إعداد خطة التطوير للمنتج الجديد',
            assignedTo: 'سارة أحمد',
            dueDate: '2024-03-01',
            priority: 'high',
            status: 'pending',
            linkedToTasks: true
          },
          {
            id: '2',
            task: 'توظيف 3 موظفين جدد في قسم المبيعات',
            assignedTo: 'أحمد محمد',
            dueDate: '2024-02-28',
            priority: 'medium',
            status: 'in_progress',
            linkedToTasks: true
          }
        ],
        attendanceList: ['عبد العزيز الملك', 'خالد السالم', 'أحمد محمد', 'سارة أحمد'],
        duration: 180,
        generatedAt: '2024-02-14T12:00:00Z',
        aiGenerated: true
      }
    }
  ]);

  const [analytics] = useState<MeetingAnalytics>({
    totalMeetings: 284,
    averageAttendance: 89,
    averageDuration: 75,
    completionRate: 94,
    monthlyTrend: [
      { month: 'يناير', meetings: 45, attendance: 87 },
      { month: 'فبراير', meetings: 52, attendance: 91 },
      { month: 'مارس', meetings: 48, attendance: 88 },
      { month: 'أبريل', meetings: 55, attendance: 92 },
      { month: 'مايو', meetings: 49, attendance: 89 },
      { month: 'يونيو', meetings: 35, attendance: 86 }
    ],
    topParticipants: [
      { name: 'أحمد محمد', attendance: 98 },
      { name: 'سارة أحمد', attendance: 95 },
      { name: 'محمد خالد', attendance: 92 },
      { name: 'فاطمة علي', attendance: 90 }
    ],
    productivityScore: 87,
    recommendations: [
      'تقليل عدد الاجتماعات في يوم الخميس لتحسين الإنتاجية',
      'زيادة مدة الاستراحة بين الاجتماعات المتتالية',
      'استخدام الذكاء الاصطناعي لتلخيص النقاط الرئيسية',
      'تفعيل التذكيرات المسبقة لتقليل الغيابات'
    ]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const getMeetingTypeBadge = (type: string) => {
    const typeConfig = {
      in_person: { text: 'حضوري', className: 'bg-blue-100 text-blue-800' },
      online: { text: 'إلكتروني', className: 'bg-purple-100 text-purple-800' },
      hybrid: { text: 'مدمج', className: 'bg-green-100 text-green-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { text: 'مجدول', className: 'bg-blue-100 text-blue-800' },
      ongoing: { text: 'جاري', className: 'bg-green-100 text-green-800' },
      completed: { text: 'مكتمل', className: 'bg-gray-100 text-gray-800' },
      cancelled: { text: 'ملغي', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { text: 'عالي', className: 'bg-red-100 text-red-800' },
      medium: { text: 'متوسط', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: 'منخفض', className: 'bg-green-100 text-green-800' }
    };
    return priorityConfig[priority as keyof typeof priorityConfig];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createMeeting = async () => {
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title: newMeetingData.title,
      description: newMeetingData.description,
      organizer: 'المستخدم الحالي',
      date: newMeetingData.date,
      time: newMeetingData.time,
      duration: `${newMeetingData.duration} دقيقة`,
      location: newMeetingData.type === 'online' ? 'رابط إلكتروني' : 'قاعة الاجتماعات',
      type: newMeetingData.type,
      status: 'scheduled',
      attendees: [],
      priority: newMeetingData.priority,
      agenda: newMeetingData.agenda.filter(item => item.trim() !== ''),
      recordingEnabled: newMeetingData.recordingEnabled,
      meetingUrl: `https://meet.company.com/room/${Date.now()}`,
      passcode: Math.floor(100000 + Math.random() * 900000).toString(),
      hostKey: `HOST${Math.floor(1000 + Math.random() * 9000)}`,
      permissions: {
        canRecord: true,
        canShare: true,
        canChat: true,
        canManageParticipants: true
      },
      chatHistory: [],
      sharedFiles: []
    };

    setMeetings(prev => [newMeeting, ...prev]);
    setShowCreateMeeting(false);
    setNewMeetingData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '60',
      type: 'online',
      agenda: [''],
      recordingEnabled: true,
      priority: 'medium'
    });

    toast({
      title: "تم إنشاء الاجتماع بنجاح",
      description: `تم إنشاء اجتماع "${newMeeting.title}" وإرسال الدعوات للمشاركين`,
    });
  };

  const joinMeeting = (meeting: Meeting) => {
    setActiveMeeting(meeting);
    setInMeetingView(true);
    setParticipants(meeting.attendees || []);
    setChatMessages(meeting.chatHistory || []);
    setSharedFiles(meeting.sharedFiles || []);
    
    toast({
      title: "انضممت للاجتماع",
      description: `تم الانضمام لاجتماع "${meeting.title}" بنجاح`,
    });
  };

  const leaveMeeting = () => {
    setInMeetingView(false);
    setActiveMeeting(null);
    setIsRecording(false);
    setRecordingDuration(0);
    
    toast({
      title: "تم مغادرة الاجتماع",
      description: "تم مغادرة الاجتماع بنجاح",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingDuration(0);
      toast({
        title: "بدأ التسجيل",
        description: "تم بدء تسجيل الاجتماع",
      });
    } else {
      toast({
        title: "توقف التسجيل",
        description: "تم إيقاف تسجيل الاجتماع وحفظه",
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && activeMeeting) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: 'current-user',
        senderName: 'أنت',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const shareFile = (file: File) => {
    const sharedFile: SharedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.name.split('.').pop() as any || 'other',
      url: URL.createObjectURL(file),
      size: file.size,
      uploadedBy: 'أنت',
      timestamp: new Date().toISOString()
    };
    
    setSharedFiles(prev => [...prev, sharedFile]);
    
    toast({
      title: "تم مشاركة الملف",
      description: `تم مشاركة "${file.name}" بنجاح`,
    });
  };

  const generateMinutes = () => {
    if (activeMeeting) {
      const minutes: MeetingMinutes = {
        id: Date.now().toString(),
        meetingId: activeMeeting.id,
        summary: 'تم توليد محضر الاجتماع تلقائياً باستخدام الذكاء الاصطناعي. تم مناقشة النقاط الرئيسية واتخاذ القرارات المهمة.',
        keyDecisions: [
          'تم الموافقة على الخطة الجديدة',
          'تحديد المسؤوليات والمهام',
          'تحديد مواعيد المتابعة'
        ],
        actionItems: [
          {
            id: '1',
            task: 'متابعة تنفيذ القرارات',
            assignedTo: 'الفريق المختص',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            status: 'pending',
            linkedToTasks: true
          }
        ],
        attendanceList: participants.map(p => p.name),
        duration: recordingDuration,
        generatedAt: new Date().toISOString(),
        aiGenerated: true
      };

      setMeetings(prev => prev.map(meeting => 
        meeting.id === activeMeeting.id 
          ? { ...meeting, minutes }
          : meeting
      ));

      toast({
        title: "تم توليد محضر الاجتماع",
        description: "تم توليد محضر الاجتماع تلقائياً وربط المهام بقسم المتابعة",
      });
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || meeting.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  if (inMeetingView && activeMeeting) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Meeting Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">{activeMeeting.title}</h1>
              <Badge className="bg-green-500 text-white">
                <Circle className="h-2 w-2 mr-1 fill-current" />
                جاري الآن
              </Badge>
              {isRecording && (
                <Badge className="bg-red-500 text-white">
                  <Circle className="h-2 w-2 mr-1 fill-current animate-pulse" />
                  تسجيل {formatDuration(recordingDuration)}
                </Badge>
              )}
            </div>
            <Button variant="destructive" onClick={leaveMeeting}>
              <Phone className="h-4 w-4 mr-2" />
              إنهاء المكالمة
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            {gridView ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
                {participants.map((participant) => (
                  <div key={participant.id} className="relative bg-gray-700 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-600 flex items-center justify-center">
                      {participant.videoEnabled ? (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      ) : (
                        <Avatar className="w-20 h-20">
                          <AvatarFallback className="bg-gray-500 text-white text-lg">
                            {participant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <div className="bg-black bg-opacity-60 rounded px-2 py-1 text-sm">
                        {participant.name}
                      </div>
                      <div className="flex gap-1">
                        {!participant.audioEnabled && <MicOff className="h-4 w-4 text-red-400" />}
                        {participant.permissions?.isHost && <Star className="h-4 w-4 text-yellow-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">مشاركة الشاشة</p>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel */}
          <div className="w-80 bg-gray-800 border-l border-gray-700">
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                <TabsTrigger value="chat">المحادثة</TabsTrigger>
                <TabsTrigger value="participants">المشاركون</TabsTrigger>
                <TabsTrigger value="files">الملفات</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col p-4">
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.senderName}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString('ar')}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
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
                    className="bg-gray-700 border-gray-600"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="flex-1 p-4">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-600 text-white text-sm">
                            {participant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{participant.name}</span>
                            {participant.permissions?.isHost && <Star className="h-3 w-3 text-yellow-400" />}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {participant.isOnline && <Badge variant="outline" className="text-xs">متصل</Badge>}
                            {!participant.audioEnabled && <MicOff className="h-3 w-3 text-red-400" />}
                            {!participant.videoEnabled && <CameraOff className="h-3 w-3 text-red-400" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="files" className="flex-1 p-4">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      مشاركة ملف
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => e.target.files?.[0] && shareFile(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {sharedFiles.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                          <FileIcon className="h-6 w-6 text-blue-400" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-400">{file.uploadedBy}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full px-6 py-3 border border-gray-700">
          <div className="flex items-center gap-4">
            <Button
              variant={isAudioEnabled ? "default" : "destructive"}
              size="sm"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="rounded-full"
            >
              {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={isVideoEnabled ? "default" : "destructive"}
              size="sm"
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className="rounded-full"
            >
              {isVideoEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={isScreenSharing ? "default" : "outline"}
              size="sm"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className="rounded-full"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={toggleRecording}
              className="rounded-full"
            >
              {isRecording ? <StopCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGridView(!gridView)}
              className="rounded-full"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={generateMinutes}
              className="rounded-full"
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة
            </Button>
            <div>
              <h1 className="text-2xl font-bold">إدارة الاجتماعات</h1>
              <p className="text-muted-foreground">نظام شامل لإدارة وتنظيم الاجتماعات</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={showCreateMeeting} onOpenChange={setShowCreateMeeting}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء اجتماع
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل الاجتماع الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">عنوان الاجتماع</label>
                    <Input
                      value={newMeetingData.title}
                      onChange={(e) => setNewMeetingData({...newMeetingData, title: e.target.value})}
                      placeholder="أدخل عنوان الاجتماع"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">الوصف</label>
                    <Textarea
                      value={newMeetingData.description}
                      onChange={(e) => setNewMeetingData({...newMeetingData, description: e.target.value})}
                      placeholder="أدخل وصف الاجتماع"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">التاريخ</label>
                      <Input
                        type="date"
                        value={newMeetingData.date}
                        onChange={(e) => setNewMeetingData({...newMeetingData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">الوقت</label>
                      <Input
                        type="time"
                        value={newMeetingData.time}
                        onChange={(e) => setNewMeetingData({...newMeetingData, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">المدة (دقيقة)</label>
                      <Input
                        type="number"
                        value={newMeetingData.duration}
                        onChange={(e) => setNewMeetingData({...newMeetingData, duration: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">النوع</label>
                      <Select value={newMeetingData.type} onValueChange={(value: any) => setNewMeetingData({...newMeetingData, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">إلكتروني</SelectItem>
                          <SelectItem value="in_person">حضوري</SelectItem>
                          <SelectItem value="hybrid">مدمج</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateMeeting(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={createMeeting}>
                    إنشاء الاجتماع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={showJoinMeeting} onOpenChange={setShowJoinMeeting}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Video className="h-4 w-4 mr-2" />
                  الانضمام لاجتماع
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="meetings">الاجتماعات</TabsTrigger>
            <TabsTrigger value="analytics">التقارير</TabsTrigger>
            <TabsTrigger value="minutes">المحاضر</TabsTrigger>
            <TabsTrigger value="rooms">القاعات</TabsTrigger>
            <TabsTrigger value="calendar">التقويم</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">إجمالي الاجتماعات</p>
                      <p className="text-2xl font-bold">{analytics.totalMeetings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">معدل الحضور</p>
                      <p className="text-2xl font-bold">{analytics.averageAttendance}%</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">متوسط المدة</p>
                      <p className="text-2xl font-bold">{analytics.averageDuration} دقيقة</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">نقاط الإنتاجية</p>
                      <p className="text-2xl font-bold">{analytics.productivityScore}/100</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الاجتماعات الجارية والقادمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {meetings.filter(m => m.status === 'ongoing' || m.status === 'scheduled').slice(0, 3).map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{meeting.title}</h3>
                          <p className="text-sm text-muted-foreground">{meeting.date} - {meeting.time}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge className={getStatusBadge(meeting.status).className}>
                              {getStatusBadge(meeting.status).text}
                            </Badge>
                            <Badge className={getMeetingTypeBadge(meeting.type).className}>
                              {getMeetingTypeBadge(meeting.type).text}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => joinMeeting(meeting)}
                          disabled={meeting.status !== 'ongoing' && meeting.status !== 'scheduled'}
                        >
                          {meeting.status === 'ongoing' ? 'انضمام' : 'جدولة'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توصيات الذكاء الاصطناعي</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Brain className="h-5 w-5 text-primary mt-0.5" />
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meetings">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في الاجتماعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الاجتماعات</SelectItem>
                    <SelectItem value="scheduled">مجدولة</SelectItem>
                    <SelectItem value="ongoing">جارية</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredMeetings.map((meeting) => (
                  <Card key={meeting.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">{meeting.title}</h3>
                            <Badge className={getStatusBadge(meeting.status).className}>
                              {getStatusBadge(meeting.status).text}
                            </Badge>
                            <Badge className={getMeetingTypeBadge(meeting.type).className}>
                              {getMeetingTypeBadge(meeting.type).text}
                            </Badge>
                            <Badge className={getPriorityBadge(meeting.priority).className}>
                              {getPriorityBadge(meeting.priority).text}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{meeting.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.time} ({meeting.duration})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.attendees.length} مشارك</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-muted-foreground">منظم بواسطة:</span>
                            <span className="text-sm font-medium">{meeting.organizer}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {meeting.status === 'ongoing' && (
                            <Button onClick={() => joinMeeting(meeting)}>
                              <Video className="h-4 w-4 mr-2" />
                              انضمام
                            </Button>
                          )}
                          {meeting.status === 'scheduled' && (
                            <Button variant="outline" onClick={() => joinMeeting(meeting)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              تفاصيل
                            </Button>
                          )}
                          {meeting.status === 'completed' && meeting.recordingUrl && (
                            <Button variant="outline">
                              <Play className="h-4 w-4 mr-2" />
                              مشاهدة التسجيل
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>أهم المشاركين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.topParticipants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {index + 1}
                            </div>
                            <span className="font-medium">{participant.name}</span>
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {participant.attendance}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الاتجاه الشهري</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics.monthlyTrend.slice(-6).map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{trend.month}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{trend.meetings} اجتماع</span>
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${trend.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{trend.attendance}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">معدل الإكمال</span>
                        <span className="font-medium">{analytics.completionRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">متوسط المدة</span>
                        <span className="font-medium">{analytics.averageDuration} دقيقة</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">نقاط الإنتاجية</span>
                        <span className="font-medium">{analytics.productivityScore}/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${analytics.productivityScore}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="minutes">
            <div className="space-y-6">
              <div className="grid gap-4">
                {meetings.filter(m => m.minutes).map((meeting) => (
                  <Card key={meeting.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{meeting.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {meeting.date} - مدة الاجتماع: {meeting.minutes?.duration} دقيقة
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            محضر ذكي
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            تحميل PDF
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">ملخص الاجتماع</h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                            {meeting.minutes?.summary}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">القرارات الرئيسية</h4>
                          <ul className="space-y-2">
                            {meeting.minutes?.keyDecisions.map((decision, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                <span>{decision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">المهام والمتابعة</h4>
                          <div className="space-y-2">
                            {meeting.minutes?.actionItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.task}</p>
                                  <p className="text-xs text-muted-foreground">
                                    مسند إلى: {item.assignedTo} | تاريخ الاستحقاق: {item.dueDate}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getPriorityBadge(item.priority).className}>
                                    {getPriorityBadge(item.priority).text}
                                  </Badge>
                                  {item.linkedToTasks && (
                                    <Badge variant="outline" className="text-xs">
                                      <Target className="h-3 w-3 mr-1" />
                                      مربوط بالمهام
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">قائمة الحضور</h4>
                          <div className="flex flex-wrap gap-2">
                            {meeting.minutes?.attendanceList.map((attendee, index) => (
                              <Badge key={index} variant="outline">
                                {attendee}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rooms">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: 'قاعة الاجتماعات الرئيسية', location: 'الطابق الأول', capacity: 20, status: 'available' },
                { id: 2, name: 'قاعة العروض التقديمية', location: 'الطابق الثاني', capacity: 50, status: 'occupied' },
                { id: 3, name: 'غرفة الاجتماعات الصغيرة', location: 'الطابق الأول', capacity: 8, status: 'available' },
                { id: 4, name: 'قاعة المؤتمرات الكبرى', location: 'الطابق الثالث', capacity: 100, status: 'maintenance' },
                { id: 5, name: 'غرفة الاجتماعات التنفيذية', location: 'الطابق الرابع', capacity: 12, status: 'available' },
                { id: 6, name: 'استوديو البث المباشر', location: 'الطابق الثاني', capacity: 6, status: 'occupied' }
              ].map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge 
                          className={
                            room.status === 'available' ? 'bg-green-100 text-green-800' :
                            room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {room.status === 'available' ? 'متاحة' :
                           room.status === 'occupied' ? 'محجوزة' : 'صيانة'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{room.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>سعة {room.capacity} شخص</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">شاشة عرض</Badge>
                        <Badge variant="outline" className="text-xs">نظام صوتي</Badge>
                        <Badge variant="outline" className="text-xs">واي فاي</Badge>
                      </div>
                      <Button 
                        className="w-full" 
                        variant={room.status === 'available' ? 'default' : 'outline'}
                        disabled={room.status !== 'available'}
                      >
                        {room.status === 'available' ? 'حجز القاعة' : 'غير متاحة'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>تقويم الاجتماعات</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">عرض التقويم</h3>
                <p className="text-gray-500">عرض جميع الاجتماعات في تقويم شهري وأسبوعي</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meetings;