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

interface Participant {
  id: string;
  name: string;
  email: string;
  role: 'organizer' | 'participant' | 'viewer';
  avatar?: string;
  isOnline?: boolean;
  joinTime?: string;
  permissions: {
    canSpeak: boolean;
    canShare: boolean;
    canChat: boolean;
    isHost: boolean;
  };
  videoEnabled?: boolean;
  audioEnabled?: boolean;
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

interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  linkedToTasks?: boolean;
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

interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  currentBooking?: {
    title: string;
    time: string;
    organizer: string;
  };
}

export const Meetings: React.FC<MeetingsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Meeting management states
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [inMeetingView, setInMeetingView] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  
  // Video/Audio states
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [gridView, setGridView] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Dialog states
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [showJoinMeeting, setShowJoinMeeting] = useState(false);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  // Form states
  const [newMeetingData, setNewMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    type: 'online' as 'in_person' | 'online' | 'hybrid',
    attendees: [] as string[],
    agenda: [''],
    recordingEnabled: true,
    priority: 'medium' as 'high' | 'medium' | 'low'
  });
  
  // Analytics data
  const [analytics, setAnalytics] = useState<MeetingAnalytics>({
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
  
  // Refs for video/audio
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
      status: 'scheduled',
      attendees: [
        { 
          id: '1', name: 'سارة أحمد', email: 'sarah@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: false },
          isOnline: true, videoEnabled: true, audioEnabled: true
        },
        { 
          id: '2', name: 'محمد خالد', email: 'mohammed@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: false, canChat: true, isHost: false },
          isOnline: false, videoEnabled: false, audioEnabled: true
        },
        { 
          id: '3', name: 'فاطمة علي', email: 'fatima@company.com', role: 'viewer',
          permissions: { canSpeak: false, canShare: false, canChat: true, isHost: false },
          isOnline: true, videoEnabled: false, audioEnabled: false
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
      chatHistory: [],
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
      status: 'ongoing',
      attendees: [
        { 
          id: '4', name: 'علي أحمد', email: 'ali@company.com', role: 'organizer',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: true },
          isOnline: true, videoEnabled: true, audioEnabled: true
        },
        { 
          id: '5', name: 'نور محمد', email: 'noor@company.com', role: 'participant',
          permissions: { canSpeak: true, canShare: true, canChat: true, isHost: false },
          isOnline: true, videoEnabled: true, audioEnabled: true
        }
      ],
      priority: 'medium',
      recordingEnabled: true,
      recordingUrl: 'https://storage.company.com/recordings/meeting-2.mp4',
      meetingUrl: 'https://zoom.us/j/123456789',
      passcode: '789012',
      chatHistory: [
        {
          id: '1',
          senderId: '4',
          senderName: 'علي أحمد',
          message: 'مرحباً بالجميع في ورشة التدريب',
          timestamp: '2024-02-16T14:05:00Z',
          type: 'text'
        }
      ],
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

  const meetingRooms: MeetingRoom[] = [
    {
      id: '1',
      name: 'قاعة الاجتماعات الرئيسية',
      capacity: 20,
      location: 'الطابق الثالث',
      equipment: ['بروجكتور', 'شاشة تفاعلية', 'نظام صوتي', 'كاميرا فيديو'],
      status: 'occupied',
      currentBooking: {
        title: 'اجتماع فريق التسويق',
        time: '10:00 - 12:00',
        organizer: 'محمد خالد'
      }
    },
    {
      id: '2',
      name: 'قاعة الاجتماعات الفرعية أ',
      capacity: 8,
      location: 'الطابق الثاني',
      equipment: ['بروجكتور', 'لوحة بيضاء', 'نظام صوتي'],
      status: 'available'
    },
    {
      id: '3',
      name: 'قاعة الاجتماعات الفرعية ب',
      capacity: 6,
      location: 'الطابق الثاني',
      equipment: ['شاشة LCD', 'لوحة بيضاء'],
      status: 'maintenance'
    }
  ];

  const getMeetingTypeBadge = (type: string) => {
    const typeConfig = {
      in_person: { text: isRTL ? 'حضوري' : 'In-Person', className: 'bg-blue-100 text-blue-800' },
      online: { text: isRTL ? 'إلكتروني' : 'Online', className: 'bg-purple-100 text-purple-800' },
      hybrid: { text: isRTL ? 'مدمج' : 'Hybrid', className: 'bg-green-100 text-green-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { text: isRTL ? 'مجدول' : 'Scheduled', className: 'bg-blue-100 text-blue-800' },
      ongoing: { text: isRTL ? 'جاري' : 'Ongoing', className: 'bg-green-100 text-green-800' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-gray-100 text-gray-800' },
      cancelled: { text: isRTL ? 'ملغي' : 'Cancelled', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' }
    };
    return priorityConfig[priority as keyof typeof priorityConfig];
  };

  const getRoomStatusBadge = (status: string) => {
    const statusConfig = {
      available: { text: isRTL ? 'متاحة' : 'Available', className: 'bg-green-100 text-green-800' },
      occupied: { text: isRTL ? 'محجوزة' : 'Occupied', className: 'bg-red-100 text-red-800' },
      maintenance: { text: isRTL ? 'صيانة' : 'Maintenance', className: 'bg-yellow-100 text-yellow-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  // Meeting Management Functions
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
      attendees: [],
      agenda: [''],
      recordingEnabled: true,
      priority: 'medium'
    });

    toast({
      title: "تم إنشاء الاجتماع بنجاح",
      description: `تم إنشاء اجتماع "${newMeeting.title}" وإرسال الدعوات للمشاركين`,
    });

    // Generate AI insights for new meeting
    generateAIInsights(newMeeting.id);
  };

  const joinMeeting = (meeting: Meeting) => {
    setActiveMeeting(meeting);
    setInMeetingView(true);
    setParticipants(meeting.attendees || []);
    setChatMessages(meeting.chatHistory || []);
    setSharedFiles(meeting.sharedFiles || []);
    
    toast({
      title: "تم الانضمام للاجتماع",
      description: `مرحباً بك في اجتماع "${meeting.title}"`,
    });
  };

  const leaveMeeting = () => {
    if (isRecording) {
      stopRecording();
    }
    setInMeetingView(false);
    setActiveMeeting(null);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    setIsScreenSharing(false);
    setIsPresentationMode(false);
    
    toast({
      title: "تم مغادرة الاجتماع",
      description: "شكراً لمشاركتك في الاجتماع",
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    
    toast({
      title: "بدء التسجيل",
      description: "تم بدء تسجيل الاجتماع بنجاح",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Generate AI minutes after recording stops
    if (activeMeeting) {
      generateMeetingMinutes(activeMeeting.id);
    }
    
    toast({
      title: "تم إيقاف التسجيل",
      description: `مدة التسجيل: ${Math.floor(recordingDuration / 60)} دقيقة و ${recordingDuration % 60} ثانية`,
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeMeeting) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'المستخدم الحالي',
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update meeting chat history
    setMeetings(prev => prev.map(meeting => 
      meeting.id === activeMeeting.id 
        ? { ...meeting, chatHistory: [...(meeting.chatHistory || []), message] }
        : meeting
    ));
  };

  const shareFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeMeeting) return;

    const sharedFile: SharedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: getFileType(file.name),
      url: URL.createObjectURL(file),
      size: file.size,
      uploadedBy: 'المستخدم الحالي',
      timestamp: new Date().toISOString()
    };

    setSharedFiles(prev => [...prev, sharedFile]);

    // Update meeting shared files
    setMeetings(prev => prev.map(meeting => 
      meeting.id === activeMeeting.id 
        ? { ...meeting, sharedFiles: [...(meeting.sharedFiles || []), sharedFile] }
        : meeting
    ));

    toast({
      title: "تم مشاركة الملف",
      description: `تم مشاركة ملف "${file.name}" مع جميع المشاركين`,
    });
  };

  const getFileType = (fileName: string): SharedFile['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'pdf';
      case 'docx': case 'doc': return 'docx';
      case 'xlsx': case 'xls': return 'xlsx';
      case 'pptx': case 'ppt': return 'pptx';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'image';
      case 'mp4': case 'avi': case 'mov': return 'video';
      default: return 'other';
    }
  };

  const generateMeetingMinutes = async (meetingId: string) => {
    // Simulate AI generation of meeting minutes
    await new Promise(resolve => setTimeout(resolve, 2000));

    const minutes: MeetingMinutes = {
      id: Date.now().toString(),
      meetingId,
      summary: 'تم مناقشة النقاط الرئيسية للمشروع والاتفاق على الخطوات التالية. تم تحديد المسؤوليات وتوزيع المهام على أعضاء الفريق.',
      keyDecisions: [
        'الموافقة على الجدول الزمني المقترح للمشروع',
        'تخصيص الميزانية اللازمة لتطوير النظام',
        'تحديد فريق العمل المسؤول عن التنفيذ'
      ],
      actionItems: [
        {
          id: Date.now().toString(),
          task: 'إعداد الوثائق التقنية للمشروع',
          assignedTo: 'سارة أحمد',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          priority: 'high',
          status: 'pending',
          linkedToTasks: true
        },
        {
          id: (Date.now() + 1).toString(),
          task: 'مراجعة المتطلبات مع العميل',
          assignedTo: 'محمد خالد',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          priority: 'medium',
          status: 'pending',
          linkedToTasks: true
        }
      ],
      attendanceList: participants.map(p => p.name),
      duration: recordingDuration / 60,
      generatedAt: new Date().toISOString(),
      aiGenerated: true
    };

    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, minutes }
        : meeting
    ));

    toast({
      title: "تم إنشاء محضر الاجتماع",
      description: "تم إنشاء محضر الاجتماع تلقائياً باستخدام الذكاء الاصطناعي",
    });
  };

  const generateAIInsights = async (meetingId: string) => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    const insights: AIInsight[] = [
      {
        id: Date.now().toString(),
        type: 'productivity',
        title: 'مستوى الإنتاجية ممتاز',
        description: 'معدل المشاركة والتفاعل عالي جداً',
        score: 92,
        suggestion: 'الحفاظ على هذا المستوى وتطبيق نفس الأسلوب في الاجتماعات القادمة',
        generatedAt: new Date().toISOString()
      },
      {
        id: (Date.now() + 1).toString(),
        type: 'recommendation',
        title: 'تحسين إدارة الوقت',
        description: 'يمكن تقليل مدة الاجتماع بـ15% من خلال تركيز المناقشات',
        score: 78,
        suggestion: 'استخدام جدول أعمال أكثر تفصيلاً وتحديد وقت لكل نقطة',
        generatedAt: new Date().toISOString()
      }
    ];

    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, aiInsights: insights }
        : meeting
    ));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || meeting.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // In-Meeting View Component
  const InMeetingView = () => (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        {/* Meeting Header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">{activeMeeting?.title}</h2>
            {isRecording && (
              <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm">تسجيل {formatDuration(recordingDuration)}</span>
              </div>
            )}
          </div>
          
          {/* Meeting Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isAudioEnabled ? "default" : "destructive"}
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            >
              {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant={isVideoEnabled ? "default" : "destructive"}
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            >
              {isVideoEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant={isScreenSharing ? "secondary" : "default"}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <StopCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGridView(!gridView)}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={leaveMeeting}
            >
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-800 relative">
            {gridView ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 h-full">
                {participants.map((participant) => (
                  <div key={participant.id} className="bg-gray-700 rounded-lg relative overflow-hidden">
                    <div className="aspect-video bg-gray-600 flex items-center justify-center">
                      {participant.videoEnabled ? (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">
                          <Camera className="h-8 w-8" />
                        </div>
                      ) : (
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {participant.name}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {!participant.audioEnabled && (
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <MicOff className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {participant.permissions.isHost && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4" />
                    <p>عرض المتحدث الرئيسي</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white border-l">
            <Tabs defaultValue="chat" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">المحادثة</TabsTrigger>
                <TabsTrigger value="participants">المشاركون</TabsTrigger>
                <TabsTrigger value="files">الملفات</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex flex-col h-full">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{message.senderName}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString('ar-SA')}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="اكتب رسالة..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="p-4">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{participant.role}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isOnline && (
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        )}
                        {participant.permissions.isHost && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="files" className="p-4">
                <div className="space-y-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    رفع ملف جديد
                  </Button>
                  
                  {sharedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-500">
                          {file.uploadedBy} • {new Date(file.timestamp).toLocaleTimeString('ar-SA')}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={shareFile}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov"
      />
    </div>
  );

  if (inMeetingView) {
    return <InMeetingView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  onClick={() => setShowAnalytics(true)}
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  التحليلات والتقارير
                </Button>
                <Dialog open={showJoinMeeting} onOpenChange={setShowJoinMeeting}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                      <Video className="h-4 w-4 ml-2" />
                      الانضمام لاجتماع
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Dialog open={showCreateMeeting} onOpenChange={setShowCreateMeeting}>
                  <DialogTrigger asChild>
                    <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                      <Plus className="h-4 w-4 ml-2" />
                      اجتماع جديد
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Calendar className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام الاجتماعات الذكي المتطور
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة الاجتماعات وحجز القاعات والتنسيق مع التكامل الكامل مع التقويم والإشعارات
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">نظام الاجتماعات الذكي</h3>
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">اجتماعات اليوم</span>
                      <span className="font-bold text-primary">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الحضور</span>
                      <span className="font-bold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط مدة الاجتماع</span>
                      <span className="font-bold text-blue-600">75 دقيقة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة القاعات</h3>
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">قاعات متاحة</span>
                      <span className="font-bold text-green-600">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الاستخدام</span>
                      <span className="font-bold text-blue-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">حجوزات الأسبوع</span>
                      <span className="font-bold text-purple-600">34</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الاجتماعات</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">7</div>
                    <div className="text-sm text-gray-600">اجتماعات اليوم</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">42</div>
                    <div className="text-sm text-gray-600">مشاركون</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-gray-600">اجتماعات إلكترونية</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة الاجتماعات المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Calendar, label: "جدولة الاجتماعات", color: "text-blue-600", count: 7 },
                { icon: MapPin, label: "حجز القاعات", color: "text-green-600", count: 5 },
                { icon: Users, label: "إدارة المشاركين", color: "text-purple-600", count: 42 },
                { icon: Video, label: "الاجتماعات المرئية", color: "text-orange-600", count: 15 },
                { icon: Clock, label: "التوقيتات الذكية", color: "text-teal-600", count: 0 },
                { icon: Search, label: "البحث والتصفية", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">284</div>
                <div className="text-sm text-gray-600">إجمالي الاجتماعات هذا الشهر</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">معدل الحضور العام</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">75</div>
                <div className="text-sm text-gray-600">متوسط مدة الاجتماع (دقيقة)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meetings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="meetings">{isRTL ? 'الاجتماعات' : 'Meetings'}</TabsTrigger>
            <TabsTrigger value="rooms">{isRTL ? 'قاعات الاجتماعات' : 'Meeting Rooms'}</TabsTrigger>
            <TabsTrigger value="calendar">{isRTL ? 'التقويم' : 'Calendar'}</TabsTrigger>
          </TabsList>

          <TabsContent value="meetings">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في الاجتماعات...' : 'Search meetings...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Meetings List */}
            <div className="space-y-6">
              {filteredMeetings.map((meeting) => {
                const typeBadge = getMeetingTypeBadge(meeting.type);
                const statusBadge = getStatusBadge(meeting.status);
                const priorityBadge = getPriorityBadge(meeting.priority);
                
                return (
                  <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <CardTitle className="text-lg">{meeting.title}</CardTitle>
                            <div className="flex gap-2">
                              <Badge className={typeBadge.className}>
                                {typeBadge.text}
                              </Badge>
                              <Badge className={statusBadge.className}>
                                {statusBadge.text}
                              </Badge>
                              <Badge className={priorityBadge.className}>
                                {priorityBadge.text}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">{meeting.organizer}</p>
                              <p className="text-sm mb-2">{meeting.description}</p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {meeting.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {meeting.time} ({meeting.duration})
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {meeting.attendees.length} مشارك
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {meeting.status === 'ongoing' && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium text-green-800">الاجتماع جاري حالياً</span>
                                  </div>
                                  <Button 
                                    onClick={() => joinMeeting(meeting)}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                  >
                                    <Video className="h-4 w-4 ml-2" />
                                    انضم الآن
                                  </Button>
                                </div>
                              )}
                              
                              {meeting.status === 'scheduled' && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-blue-800">اجتماع مجدول</span>
                                    {meeting.recordingEnabled && (
                                      <div className="flex items-center gap-1 text-blue-600">
                                        <Circle className="h-4 w-4" />
                                        <span className="text-xs">تسجيل مفعل</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      onClick={() => {
                                        setSelectedMeeting(meeting);
                                        setShowMeetingDetails(true);
                                      }}
                                      variant="outline"
                                      className="flex-1"
                                    >
                                      <Eye className="h-4 w-4 ml-2" />
                                      التفاصيل
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => joinMeeting(meeting)}
                                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    >
                                      <Video className="h-4 w-4 ml-2" />
                                      بدء الاجتماع
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {meeting.status === 'completed' && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">اجتماع مكتمل</span>
                                    {meeting.recordingUrl && (
                                      <div className="flex items-center gap-1 text-gray-600">
                                        <Play className="h-4 w-4" />
                                        <span className="text-xs">تسجيل متاح</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    {meeting.minutes && (
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedMeeting(meeting);
                                          setShowMeetingDetails(true);
                                        }}
                                        className="flex-1"
                                      >
                                        <FileText className="h-4 w-4 ml-2" />
                                        المحضر
                                      </Button>
                                    )}
                                    {meeting.recordingUrl && (
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="flex-1"
                                      >
                                        <Play className="h-4 w-4 ml-2" />
                                        التسجيل
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Insights */}
                          {meeting.aiInsights && meeting.aiInsights.length > 0 && (
                            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Brain className="h-4 w-4 text-purple-600" />
                                <span className="font-medium text-purple-800">رؤى الذكاء الاصطناعي</span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2">
                                {meeting.aiInsights.slice(0, 2).map((insight) => (
                                  <div key={insight.id} className="bg-white rounded p-2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">{insight.title}</span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-500" />
                                        <span className="text-xs">{insight.score}%</span>
                                      </div>
                                    </div>
                                    <p className="text-xs text-gray-600">{insight.suggestion}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {filteredMeetings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد اجتماعات</h3>
                <p className="text-gray-500">لم يتم العثور على اجتماعات تطابق معايير البحث</p>
                <Button 
                  className="mt-4"
                  onClick={() => setShowCreateMeeting(true)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء اجتماع جديد
                </Button>
              </div>
            )}
            
            {/* Dialogs */}
            
            {/* Create Meeting Dialog */}
            <Dialog open={showCreateMeeting} onOpenChange={setShowCreateMeeting}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
                  <DialogDescription>
                    املأ البيانات التالية لإنشاء اجتماع جديد وإرسال الدعوات للمشاركين
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">عنوان الاجتماع</label>
                      <Input
                        value={newMeetingData.title}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="أدخل عنوان الاجتماع"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">نوع الاجتماع</label>
                      <Select 
                        value={newMeetingData.type} 
                        onValueChange={(value: 'in_person' | 'online' | 'hybrid') => 
                          setNewMeetingData(prev => ({ ...prev, type: value }))
                        }
                      >
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
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">وصف الاجتماع</label>
                    <Textarea
                      value={newMeetingData.description}
                      onChange={(e) => setNewMeetingData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="أدخل وصف تفصيلي للاجتماع..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">التاريخ</label>
                      <Input
                        type="date"
                        value={newMeetingData.date}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">الوقت</label>
                      <Input
                        type="time"
                        value={newMeetingData.time}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">المدة (دقيقة)</label>
                      <Input
                        type="number"
                        value={newMeetingData.duration}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="60"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">جدول الأعمال</label>
                    <div className="space-y-2">
                      {newMeetingData.agenda.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newAgenda = [...newMeetingData.agenda];
                              newAgenda[index] = e.target.value;
                              setNewMeetingData(prev => ({ ...prev, agenda: newAgenda }));
                            }}
                            placeholder={`النقطة ${index + 1}`}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newAgenda = newMeetingData.agenda.filter((_, i) => i !== index);
                              setNewMeetingData(prev => ({ ...prev, agenda: newAgenda }));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => 
                          setNewMeetingData(prev => ({ ...prev, agenda: [...prev.agenda, ''] }))
                        }
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة نقطة
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">الأولوية</label>
                      <Select 
                        value={newMeetingData.priority} 
                        onValueChange={(value: 'high' | 'medium' | 'low') => 
                          setNewMeetingData(prev => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">عالي</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="low">منخفض</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="recordingEnabled"
                        checked={newMeetingData.recordingEnabled}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, recordingEnabled: e.target.checked }))}
                        className="rounded"
                      />
                      <label htmlFor="recordingEnabled" className="text-sm">
                        تفعيل تسجيل الاجتماع
                      </label>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateMeeting(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={createMeeting}>
                    <Calendar className="h-4 w-4 ml-2" />
                    إنشاء الاجتماع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Join Meeting Dialog */}
            <Dialog open={showJoinMeeting} onOpenChange={setShowJoinMeeting}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>الانضمام لاجتماع</DialogTitle>
                  <DialogDescription>
                    أدخل معرف الاجتماع أو الرابط للانضمام
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">معرف الاجتماع أو الرابط</label>
                    <Input placeholder="123-456-789 أو https://meet.company.com/room/123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">كلمة المرور (اختياري)</label>
                    <Input type="password" placeholder="أدخل كلمة المرور إن وجدت" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الاسم المعروض</label>
                    <Input placeholder="اسمك كما سيظهر للمشاركين" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowJoinMeeting(false)}>
                    إلغاء
                  </Button>
                  <Button>
                    <Video className="h-4 w-4 ml-2" />
                    انضم للاجتماع
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Meeting Details Dialog */}
            <Dialog open={showMeetingDetails} onOpenChange={setShowMeetingDetails}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{selectedMeeting?.title}</DialogTitle>
                  <DialogDescription>
                    تفاصيل الاجتماع ومحضر الجلسة والتوصيات
                  </DialogDescription>
                </DialogHeader>
                
                {selectedMeeting && (
                  <div className="space-y-6">
                    {/* Meeting Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">معلومات الاجتماع</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="font-medium">المنظم:</span>
                            <span>{selectedMeeting.organizer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">التاريخ والوقت:</span>
                            <span>{selectedMeeting.date} - {selectedMeeting.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">المدة:</span>
                            <span>{selectedMeeting.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">المشاركون:</span>
                            <span>{selectedMeeting.attendees.length} شخص</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">نوع الاجتماع:</span>
                            <Badge className={getMeetingTypeBadge(selectedMeeting.type).className}>
                              {getMeetingTypeBadge(selectedMeeting.type).text}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">المشاركون</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedMeeting.attendees.map((participant) => (
                              <div key={participant.id} className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="font-medium">{participant.name}</div>
                                  <div className="text-sm text-gray-500 capitalize">{participant.role}</div>
                                </div>
                                {participant.permissions.isHost && (
                                  <Star className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Meeting Minutes */}
                    {selectedMeeting.minutes && (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">محضر الاجتماع</CardTitle>
                            {selectedMeeting.minutes.aiGenerated && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                <Brain className="h-3 w-3 ml-1" />
                                مُنشأ بالذكاء الاصطناعي
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">ملخص الاجتماع:</h4>
                            <p className="text-gray-700">{selectedMeeting.minutes.summary}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">القرارات الرئيسية:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedMeeting.minutes.keyDecisions.map((decision, index) => (
                                <li key={index} className="text-gray-700">{decision}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">المهام والمتابعة:</h4>
                            <div className="space-y-3">
                              {selectedMeeting.minutes.actionItems.map((item) => (
                                <div key={item.id} className="border rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{item.task}</span>
                                    <div className="flex items-center gap-2">
                                      <Badge className={
                                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                      }>
                                        {item.status === 'completed' ? 'مكتمل' :
                                         item.status === 'in_progress' ? 'قيد التنفيذ' : 'معلق'}
                                      </Badge>
                                      {item.linkedToTasks && (
                                        <Badge variant="outline">
                                          <Target className="h-3 w-3 ml-1" />
                                          مربوط بالمهام
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <div>المسؤول: {item.assignedTo}</div>
                                    <div>تاريخ الاستحقاق: {new Date(item.dueDate).toLocaleDateString('ar-SA')}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {/* AI Insights */}
                    {selectedMeeting.aiInsights && selectedMeeting.aiInsights.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-600" />
                            رؤى الذكاء الاصطناعي والتوصيات
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {selectedMeeting.aiInsights.map((insight) => (
                              <div key={insight.id} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{insight.title}</h4>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-medium">{insight.score}%</span>
                                  </div>
                                </div>
                                <p className="text-gray-700 mb-2">{insight.description}</p>
                                <p className="text-sm text-purple-700 bg-purple-50 p-2 rounded">
                                  💡 {insight.suggestion}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowMeetingDetails(false)}>
                    إغلاق
                  </Button>
                  {selectedMeeting?.minutes && (
                    <Button>
                      <Download className="h-4 w-4 ml-2" />
                      تحميل المحضر
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Analytics Dialog */}
            <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
              <DialogContent className="max-w-6xl">
                <DialogHeader>
                  <DialogTitle>تحليلات وتقارير الاجتماعات</DialogTitle>
                  <DialogDescription>
                    رؤى شاملة حول أداء الاجتماعات والإنتاجية والتوصيات
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{analytics.totalMeetings}</div>
                        <div className="text-sm text-gray-600">إجمالي الاجتماعات</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{analytics.averageAttendance}%</div>
                        <div className="text-sm text-gray-600">معدل الحضور</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{analytics.averageDuration} دقيقة</div>
                        <div className="text-sm text-gray-600">متوسط المدة</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{analytics.productivityScore}%</div>
                        <div className="text-sm text-gray-600">درجة الإنتاجية</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Monthly Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>اتجاه الاجتماعات الشهري</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analytics.monthlyTrend.map((month) => (
                          <div key={month.month} className="flex items-center justify-between">
                            <span className="font-medium">{month.month}</span>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">الاجتماعات:</span>
                                <span className="font-medium">{month.meetings}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">الحضور:</span>
                                <span className="font-medium">{month.attendance}%</span>
                              </div>
                              <Progress value={month.attendance} className="w-32" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Top Participants & AI Recommendations */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>المشاركون الأكثر نشاطاً</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.topParticipants.map((participant, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="font-bold text-blue-600">{index + 1}</span>
                                </div>
                                <span className="font-medium">{participant.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={participant.attendance} className="w-20" />
                                <span className="text-sm font-medium">{participant.attendance}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-purple-600" />
                          توصيات الذكاء الاصطناعي
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.recommendations.map((recommendation, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-purple-50">
                              <div className="flex items-start gap-2">
                                <TrendingUp className="h-4 w-4 text-purple-600 mt-1" />
                                <p className="text-sm">{recommendation}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAnalytics(false)}>
                    إغلاق
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="rooms">
            <div className="grid lg:grid-cols-3 gap-6">
              {meetingRooms.map((room) => {
                const statusBadge = getRoomStatusBadge(room.status);
                return (
                  <Card key={room.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-3">
                           <div>
                             <h4 className="font-medium text-sm text-muted-foreground mb-1">
                               {isRTL ? 'الوصف' : 'Description'}
                             </h4>
                             <p className="text-sm">قاعة اجتماعات مجهزة بأحدث التقنيات</p>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-sm text-muted-foreground">{isRTL ? 'المكان:' : 'Location:'}</span>
                             <span className="text-sm font-medium">{room.location}</span>
                           </div>
                         </div>
                         <div className="space-y-3">
                           <div className="flex justify-between">
                             <span className="text-sm text-muted-foreground">{isRTL ? 'السعة:' : 'Capacity:'}</span>
                             <span className="text-sm font-medium">{room.capacity} شخص</span>
                           </div>
                           <div className="flex justify-between">
                             <span className="text-sm text-muted-foreground">{isRTL ? 'الحالة:' : 'Status:'}</span>
                             <span className="text-sm font-medium">{room.status === 'available' ? 'متاحة' : 'محجوزة'}</span>
                           </div>
                         </div>
                       </div>
                       
                       <div className="mt-4">
                         <h4 className="font-medium text-sm text-muted-foreground mb-2">
                           {isRTL ? 'التسهيلات' : 'Facilities'}
                         </h4>
                         <div className="flex flex-wrap gap-1">
                           <Badge variant="outline" className="text-xs">
                             شاشة عرض
                           </Badge>
                           <Badge variant="outline" className="text-xs">
                             نظام صوتي
                           </Badge>
                           <Badge variant="outline" className="text-xs">
                             واي فاي
                           </Badge>
                         </div>
                       </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'انضمام' : 'Join Meeting'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="rooms">
            <div className="grid lg:grid-cols-3 gap-6">
              {meetingRooms.map((room) => {
                const statusBadge = getRoomStatusBadge(room.status);
                return (
                  <Card key={room.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
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
                );
              })}
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