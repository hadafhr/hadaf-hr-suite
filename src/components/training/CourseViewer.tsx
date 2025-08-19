import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Download,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  BookOpen,
  PenTool,
  Send,
  Star,
  ThumbsUp,
  Eye,
  User,
  Calendar,
  Target,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  FastForward,
  Rewind
} from 'lucide-react';

interface CourseViewerProps {
  course: any;
  onClose: () => void;
}

interface Note {
  id: string;
  timestamp: number;
  content: string;
  createdAt: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  submittedAt?: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded';
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ course, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Notes and interactions
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  
  // Course progress
  const [courseProgress, setCourseProgress] = useState(45);
  const [completedLessons, setCompletedLessons] = useState(3);
  const totalLessons = 8;

  // Sample course materials
  const courseMaterials = [
    { id: 1, name: 'مقدمة في إدارة المشاريع.pdf', type: 'PDF', size: '2.5 MB', downloadUrl: '#' },
    { id: 2, name: 'عرض تقديمي - أساسيات إدارة المشاريع.pptx', type: 'PowerPoint', size: '15.3 MB', downloadUrl: '#' },
    { id: 3, name: 'جدولة المشاريع - قالب Excel.xlsx', type: 'Excel', size: '1.8 MB', downloadUrl: '#' },
    { id: 4, name: 'دليل أدوات إدارة المشاريع.docx', type: 'Word', size: '3.2 MB', downloadUrl: '#' }
  ];

  // Sample assignments
  const [assignments] = useState<Assignment[]>([
    {
      id: 'assignment_1',
      title: 'تحليل دراسة حالة مشروع',
      description: 'قم بتحليل المشروع المرفق وحدد المخاطر المحتملة واقترح حلول للتحديات المطروحة',
      dueDate: '2024-02-25T23:59:00Z',
      maxPoints: 100,
      submittedAt: '2024-02-20T14:30:00Z',
      score: 87,
      feedback: 'عمل ممتاز، تحليل شامل ومقترحات عملية',
      status: 'graded'
    },
    {
      id: 'assignment_2',
      title: 'إعداد خطة مشروع',
      description: 'أعد خطة مشروع متكاملة تشمل الجدولة والموارد والميزانية',
      dueDate: '2024-02-28T23:59:00Z',
      maxPoints: 100,
      status: 'pending'
    }
  ];

  // Sample chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: 'د. محمد الأحمد',
      message: 'مرحباً بكم في دورة أساسيات إدارة المشاريع',
      timestamp: '14:30',
      isInstructor: true
    },
    {
      id: 2,
      user: 'أحمد محمد',
      message: 'شكراً دكتور، لدي سؤال حول الدرس الثاني',
      timestamp: '14:32',
      isInstructor: false
    },
    {
      id: 3,
      user: 'د. محمد الأحمد',
      message: 'تفضل بالسؤال',
      timestamp: '14:33',
      isInstructor: true
    }
  ]);

  // Video player controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: `note_${Date.now()}`,
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date().toISOString()
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const message = {
      id: chatMessages.length + 1,
      user: 'المتدرب',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      isInstructor: false
    };

    setChatMessages([...chatMessages, message]);
    setChatMessage('');
  };

  const getAssignmentStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { text: isRTL ? 'معلق' : 'Pending', className: 'bg-yellow-500/10 text-yellow-500' },
      'submitted': { text: isRTL ? 'مرسل' : 'Submitted', className: 'bg-blue-500/10 text-blue-500' },
      'graded': { text: isRTL ? 'مصحح' : 'Graded', className: 'bg-green-500/10 text-green-500' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster={course?.thumbnail || '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png'}
        >
          <source src="#" type="video/mp4" />
          {isRTL ? 'متصفحك لا يدعم تشغيل الفيديو' : 'Your browser does not support the video tag'}
        </video>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-white/20 rounded-full mb-3 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Rewind className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <FastForward className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/20 rounded-lg"
                />
              </div>
              
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Info Header */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl mb-2">{course?.title || 'أساسيات إدارة المشاريع'}</CardTitle>
              <p className="text-muted-foreground mb-3">{course?.description || 'دورة شاملة لتعلم مبادئ إدارة المشاريع وأدواتها الحديثة'}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{course?.instructor || 'د. محمد الأحمد'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course?.duration || '40 ساعة'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{course?.rating || '4.8'}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-green-500/10 text-green-500">
              {isRTL ? 'مسجل' : 'Enrolled'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{isRTL ? 'تقدم الدورة' : 'Course Progress'}</span>
                <span>{courseProgress}%</span>
              </div>
              <Progress value={courseProgress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>{isRTL ? 'الدروس المكتملة:' : 'Completed Lessons:'} {completedLessons}/{totalLessons}</span>
              <Button size="sm" variant="outline">
                <Award className="h-4 w-4 mr-1" />
                {isRTL ? 'احصل على الشهادة' : 'Get Certificate'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">{isRTL ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="lessons">{isRTL ? 'الدروس' : 'Lessons'}</TabsTrigger>
          <TabsTrigger value="materials">{isRTL ? 'المواد' : 'Materials'}</TabsTrigger>
          <TabsTrigger value="assignments">{isRTL ? 'المهام' : 'Assignments'}</TabsTrigger>
          <TabsTrigger value="notes">{isRTL ? 'الملاحظات' : 'Notes'}</TabsTrigger>
          <TabsTrigger value="discussion">{isRTL ? 'النقاش' : 'Discussion'}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{isRTL ? 'أهداف التعلم' : 'Learning Objectives'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">فهم أساسيات إدارة المشاريع وأهميتها</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">تعلم استخدام أدوات التخطيط والجدولة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">إدارة المخاطر والتعامل معها</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">تطبيق منهجيات إدارة المشاريع الحديثة</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{isRTL ? 'معلومات الدورة' : 'Course Information'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'المستوى:' : 'Level:'}</span>
                    <Badge variant="outline">{isRTL ? 'مبتدئ' : 'Beginner'}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'اللغة:' : 'Language:'}</span>
                    <span>{isRTL ? 'العربية' : 'Arabic'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'نوع الدورة:' : 'Course Type:'}</span>
                    <span>{isRTL ? 'مسجلة' : 'Recorded'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{isRTL ? 'الشهادة:' : 'Certificate:'}</span>
                    <span>{isRTL ? 'متاحة' : 'Available'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'دروس الدورة' : 'Course Lessons'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((lessonNumber) => (
                  <div key={lessonNumber} className={`flex items-center justify-between p-3 border rounded-lg ${
                    lessonNumber <= completedLessons ? 'bg-green-50 border-green-200' : 'border-border'
                  }`}>
                    <div className="flex items-center gap-3">
                      {lessonNumber <= completedLessons ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                      <div>
                        <p className="font-medium">الدرس {lessonNumber}: مقدمة في إدارة المشاريع</p>
                        <p className="text-sm text-muted-foreground">15 دقيقة</p>
                      </div>
                    </div>
                    <Button size="sm" variant={lessonNumber <= completedLessons ? "outline" : "default"}>
                      {lessonNumber <= completedLessons ? (
                        <Eye className="h-4 w-4 mr-1" />
                      ) : (
                        <Play className="h-4 w-4 mr-1" />
                      )}
                      {lessonNumber <= completedLessons ? (isRTL ? 'مراجعة' : 'Review') : (isRTL ? 'تشغيل' : 'Play')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'المواد التعليمية' : 'Course Materials'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courseMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.type} • {material.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      {isRTL ? 'تحميل' : 'Download'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const statusBadge = getAssignmentStatusBadge(assignment.status);
              return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{assignment.description}</p>
                      </div>
                      <Badge className={statusBadge.className}>
                        {statusBadge.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span>{isRTL ? 'تاريخ التسليم:' : 'Due Date:'} {new Date(assignment.dueDate).toLocaleDateString('ar-SA')}</span>
                          <span>{isRTL ? 'الدرجة الكاملة:' : 'Max Points:'} {assignment.maxPoints}</span>
                        </div>
                        {assignment.score && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Star className="h-4 w-4" />
                            <span>{assignment.score}/{assignment.maxPoints}</span>
                          </div>
                        )}
                      </div>
                      
                      {assignment.feedback && (
                        <div className="p-3 bg-accent/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">{isRTL ? 'ملاحظات المدرب:' : 'Instructor Feedback:'}</p>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {assignment.status === 'pending' && (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            {isRTL ? 'رفع المهمة' : 'Submit Assignment'}
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'ملاحظاتي' : 'My Notes'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add Note */}
                <div className="space-y-2">
                  <Textarea
                    placeholder={isRTL ? 'اكتب ملاحظة جديدة...' : 'Write a new note...'}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'الوقت الحالي:' : 'Current time:'} {formatTime(currentTime)}
                    </span>
                    <Button onClick={addNote} size="sm">
                      <PenTool className="h-4 w-4 mr-1" />
                      {isRTL ? 'إضافة ملاحظة' : 'Add Note'}
                    </Button>
                  </div>
                </div>
                
                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium">{formatTime(note.timestamp)}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                  
                  {notes.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>{isRTL ? 'لا توجد ملاحظات بعد' : 'No notes yet'}</p>
                      <p className="text-sm">{isRTL ? 'ابدأ بإضافة ملاحظة أثناء مشاهدة الدورة' : 'Start adding notes while watching the course'}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'منتدى النقاش' : 'Discussion Forum'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.isInstructor ? 'bg-accent/30 p-2 rounded-lg' : ''}`}>
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{msg.user}</span>
                          {msg.isInstructor && (
                            <Badge variant="outline" className="text-xs">
                              {isRTL ? 'مدرب' : 'Instructor'}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Send Message */}
                <div className="flex gap-2">
                  <Input
                    placeholder={isRTL ? 'اكتب رسالة...' : 'Type a message...'}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <Button onClick={sendChatMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};