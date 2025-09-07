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

export const Meetings: React.FC<MeetingsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  
  // States for meeting management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [inMeetingView, setInMeetingView] = useState(false);
  
  // In-meeting states
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
  
  // Dialog states
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [showJoinMeeting, setShowJoinMeeting] = useState(false);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  // Form state
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
  
  // Sample data
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

  // Helper functions
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

  // Meeting management functions
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

    // Generate AI insights for new meeting
    setTimeout(() => generateAIInsights(newMeeting.id), 1000);
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
      setTimeout(() => generateMeetingMinutes(activeMeeting.id), 2000);
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

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || meeting.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // In-Meeting View Component
  if (inMeetingView && activeMeeting) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="h-full flex flex-col">
          {/* Meeting Header */}
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <h2 className="font-semibold">{activeMeeting.title}</h2>
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
                            <span className="ml-2">فيديو نشط</span>
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

              {/* Presentation Mode Overlay */}
              {isPresentationMode && (
                <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Presentation className="h-24 w-24 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">وضع العرض التقديمي</h3>
                    <p className="text-gray-600">يتم عرض العرض التقديمي هنا</p>
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

                <TabsContent value="chat" className="flex flex-col h-full mt-0">
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
                            <p className="text-sm bg-gray-100 p-2 rounded">{message.message}</p>
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
                      <Upload className="h-4 w-4 ml-2" />
                      رفع ملف
                    </Button>
                    
                    {sharedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-3 p-2 border rounded-lg">
                        <FileIcon className="h-8 w-8 text-blue-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{file.name}</div>
                          <div className="text-xs text-gray-500">
                            {file.uploadedBy} • {new Date(file.timestamp).toLocaleString('ar-SA')}
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
  }

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 ml-2" />
                رجوع
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowAnalytics(true)}
              >
                <BarChart3 className="h-4 w-4 ml-2" />
                التحليلات والتقارير
              </Button>
              <Dialog open={showJoinMeeting} onOpenChange={setShowJoinMeeting}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Video className="h-4 w-4 ml-2" />
                    الانضمام لاجتماع
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Dialog open={showCreateMeeting} onOpenChange={setShowCreateMeeting}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 ml-2" />
                    اجتماع جديد
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              نظام الاجتماعات الذكي المتطور
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              منظومة ذكية شاملة لإدارة الاجتماعات وحجز القاعات والتنسيق مع التكامل الكامل مع التقويم والإشعارات
            </p>
          </div>
        </div>

        {/* Dashboard Analytics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الاجتماعات الجارية</p>
                  <p className="text-2xl font-bold text-green-600">{meetings.filter(m => m.status === 'ongoing').length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الاجتماعات المجدولة</p>
                  <p className="text-2xl font-bold text-blue-600">{meetings.filter(m => m.status === 'scheduled').length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الاجتماعات المكتملة</p>
                  <p className="text-2xl font-bold text-gray-600">{meetings.filter(m => m.status === 'completed').length}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">معدل الحضور</p>
                  <p className="text-2xl font-bold text-purple-600">{analytics.averageAttendance}%</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="meetings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="meetings">الاجتماعات</TabsTrigger>
            <TabsTrigger value="rooms">قاعات الاجتماعات</TabsTrigger>
            <TabsTrigger value="calendar">التقويم</TabsTrigger>
          </TabsList>

          <TabsContent value="meetings">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في الاجتماعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الاجتماعات</SelectItem>
                  <SelectItem value="ongoing">جاري</SelectItem>
                  <SelectItem value="scheduled">مجدول</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                </SelectContent>
              </Select>
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
                              <p className="text-sm text-gray-600 mb-2">{meeting.organizer}</p>
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
                                    <Button 
                                      size="sm" 
                                      onClick={() => {
                                        setSelectedMeeting(meeting);
                                        setShowMeetingDetails(true);
                                      }}
                                      variant="outline"
                                      className="flex-1"
                                    >
                                      <FileText className="h-4 w-4 ml-2" />
                                      المحضر
                                    </Button>
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
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Create Meeting Dialog */}
            <Dialog open={showCreateMeeting} onOpenChange={setShowCreateMeeting}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
                  <DialogDescription>
                    قم بتعبئة تفاصيل الاجتماع وإرسال الدعوات للمشاركين
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">عنوان الاجتماع</label>
                      <Input
                        placeholder="أدخل عنوان الاجتماع"
                        value={newMeetingData.title}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, title: e.target.value }))}
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
                    <label className="block text-sm font-medium mb-1">الوصف</label>
                    <Textarea
                      placeholder="وصف موجز عن موضوع الاجتماع"
                      value={newMeetingData.description}
                      onChange={(e) => setNewMeetingData(prev => ({ ...prev, description: e.target.value }))}
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
                        placeholder="60"
                        value={newMeetingData.duration}
                        onChange={(e) => setNewMeetingData(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">جدول الأعمال</label>
                    <div className="space-y-2">
                      {newMeetingData.agenda.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={`النقطة ${index + 1}`}
                            value={item}
                            onChange={(e) => {
                              const newAgenda = [...newMeetingData.agenda];
                              newAgenda[index] = e.target.value;
                              setNewMeetingData(prev => ({ ...prev, agenda: newAgenda }));
                            }}
                          />
                          {newMeetingData.agenda.length > 1 && (
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
                          )}
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
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${month.attendance}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Top Participants */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>أكثر المشاركين نشاطاً</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analytics.topParticipants.map((participant, index) => (
                            <div key={participant.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                </div>
                                <span className="font-medium">{participant.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{participant.attendance}%</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${participant.attendance}%` }}
                                  ></div>
                                </div>
                              </div>
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
                            <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                              <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                              <p className="text-sm text-purple-800">{recommendation}</p>
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
              {[
                {
                  id: '1',
                  name: 'قاعة الاجتماعات الرئيسية',
                  capacity: 20,
                  location: 'الطابق الثالث',
                  status: 'occupied' as const
                },
                {
                  id: '2',
                  name: 'قاعة الاجتماعات الفرعية أ',
                  capacity: 8,
                  location: 'الطابق الثاني',
                  status: 'available' as const
                },
                {
                  id: '3',
                  name: 'قاعة الاجتماعات الفرعية ب',
                  capacity: 6,
                  location: 'الطابق الثاني',
                  status: 'maintenance' as const
                }
              ].map((room) => (
                <Card key={room.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <Badge className={
                        room.status === 'available' ? 'bg-green-100 text-green-800' :
                        room.status === 'occupied' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {room.status === 'available' ? 'متاحة' :
                         room.status === 'occupied' ? 'محجوزة' : 'صيانة'}
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