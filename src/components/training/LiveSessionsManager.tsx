import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Video, 
  Users, 
  Clock, 
  Calendar,
  Plus,
  Play,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  MessageSquare,
  Settings,
  Eye,
  Edit,
  Trash2,
  Monitor,
  Volume2,
  VolumeX,
  Download
} from 'lucide-react';
import { LiveStreamPlayer } from './LiveStreamPlayer';

interface LiveSession {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  courseId?: string;
  courseName?: string;
  scheduledAt: string;
  duration: number;
  participants: number;
  maxParticipants: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  streamUrl?: string;
  recordingUrl?: string;
  chatEnabled: boolean;
  recordingEnabled: boolean;
  thumbnail?: string;
  tags: string[];
}

export const LiveSessionsManager: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showStreamDialog, setShowStreamDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);

  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    instructor: 'د. محمد الأحمد',
    instructorId: 'inst_1',
    courseId: '',
    courseName: '',
    scheduledAt: '',
    duration: 60,
    maxParticipants: 100,
    chatEnabled: true,
    recordingEnabled: true,
    tags: ['']
  });

  // Sample live sessions data
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([
    {
      id: 'session_1',
      title: 'مقدمة في إدارة المشاريع',
      description: 'جلسة تفاعلية لتعلم أساسيات إدارة المشاريع والأدوات الحديثة',
      instructor: 'د. محمد الأحمد',
      instructorId: 'inst_1',
      courseId: '1',
      courseName: 'أساسيات إدارة المشاريع',
      scheduledAt: '2024-02-20T10:00:00Z',
      duration: 90,
      participants: 45,
      maxParticipants: 100,
      status: 'live',
      chatEnabled: true,
      recordingEnabled: true,
      thumbnail: '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png',
      tags: ['إدارة', 'مشاريع', 'مباشر']
    },
    {
      id: 'session_2',
      title: 'استراتيجيات التسويق الرقمي',
      description: 'ورشة عمل تفاعلية حول أحدث استراتيجيات التسويق الرقمي',
      instructor: 'أ. سارة المطيري',
      instructorId: 'inst_2',
      courseId: '2',
      courseName: 'التسويق الرقمي المتقدم',
      scheduledAt: '2024-02-21T14:00:00Z',
      duration: 120,
      participants: 0,
      maxParticipants: 80,
      status: 'scheduled',
      chatEnabled: true,
      recordingEnabled: true,
      thumbnail: '/lovable-uploads/9315a174-2c21-4ec0-8554-b4936be67676.png',
      tags: ['تسويق', 'رقمي', 'ورشة']
    },
    {
      id: 'session_3',
      title: 'تطوير تطبيقات React',
      description: 'جلسة برمجة مباشرة لتطوير تطبيق React من الصفر',
      instructor: 'م. أحمد العتيبي',
      instructorId: 'inst_3',
      courseId: '3',
      courseName: 'البرمجة بـ React',
      scheduledAt: '2024-02-18T16:00:00Z',
      duration: 180,
      participants: 67,
      maxParticipants: 60,
      status: 'completed',
      recordingUrl: '/recordings/react-session-1.mp4',
      chatEnabled: true,
      recordingEnabled: true,
      thumbnail: '/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png',
      tags: ['برمجة', 'React', 'تطوير']
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'live': { text: isRTL ? 'مباشر الآن' : 'LIVE NOW', className: 'bg-red-500 text-white animate-pulse' },
      'scheduled': { text: isRTL ? 'مجدولة' : 'Scheduled', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      'completed': { text: isRTL ? 'مكتملة' : 'Completed', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'cancelled': { text: isRTL ? 'ملغية' : 'Cancelled', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const handleCreateSession = () => {
    const session: LiveSession = {
      id: `session_${Date.now()}`,
      title: newSession.title,
      description: newSession.description,
      instructor: newSession.instructor,
      instructorId: newSession.instructorId,
      courseId: newSession.courseId || undefined,
      courseName: newSession.courseName || undefined,
      scheduledAt: newSession.scheduledAt,
      duration: newSession.duration,
      participants: 0,
      maxParticipants: newSession.maxParticipants,
      status: 'scheduled',
      chatEnabled: newSession.chatEnabled,
      recordingEnabled: newSession.recordingEnabled,
      tags: newSession.tags.filter(tag => tag.trim() !== '')
    };

    setLiveSessions(prev => [...prev, session]);
    setShowCreateDialog(false);
    
    // Reset form
    setNewSession({
      title: '',
      description: '',
      instructor: 'د. محمد الأحمد',
      instructorId: 'inst_1',
      courseId: '',
      courseName: '',
      scheduledAt: '',
      duration: 60,
      maxParticipants: 100,
      chatEnabled: true,
      recordingEnabled: true,
      tags: ['']
    });
  };

  const handleJoinSession = (session: LiveSession) => {
    setSelectedSession(session);
    setShowStreamDialog(true);
  };

  const filteredSessions = (status: string) => {
    return liveSessions.filter(session => session.status === status);
  };

  const upcomingSessions = filteredSessions('scheduled');
  const liveSessions_active = filteredSessions('live');
  const completedSessions = filteredSessions('completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'إدارة الجلسات المباشرة' : 'Live Sessions Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة الجلسات التفاعلية والبث المباشر' : 'Create and manage interactive sessions and live streaming'}
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إنشاء جلسة جديدة' : 'Create New Session'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء جلسة مباشرة جديدة' : 'Create New Live Session'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>{isRTL ? 'عنوان الجلسة' : 'Session Title'}</Label>
                <Input
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                  placeholder={isRTL ? 'أدخل عنوان الجلسة' : 'Enter session title'}
                />
              </div>
              
              <div className="col-span-2">
                <Label>{isRTL ? 'وصف الجلسة' : 'Session Description'}</Label>
                <Textarea
                  value={newSession.description}
                  onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                  placeholder={isRTL ? 'وصف مفصل للجلسة' : 'Detailed session description'}
                  rows={3}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'المدرب' : 'Instructor'}</Label>
                <Select value={newSession.instructor} onValueChange={(value) => setNewSession({...newSession, instructor: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="د. محمد الأحمد">د. محمد الأحمد</SelectItem>
                    <SelectItem value="أ. سارة المطيري">أ. سارة المطيري</SelectItem>
                    <SelectItem value="م. أحمد العتيبي">م. أحمد العتيبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>{isRTL ? 'الدورة المرتبطة' : 'Related Course'}</Label>
                <Input
                  value={newSession.courseName}
                  onChange={(e) => setNewSession({...newSession, courseName: e.target.value})}
                  placeholder={isRTL ? 'اختياري - اسم الدورة' : 'Optional - Course name'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'تاريخ ووقت البدء' : 'Start Date & Time'}</Label>
                <Input
                  type="datetime-local"
                  value={newSession.scheduledAt}
                  onChange={(e) => setNewSession({...newSession, scheduledAt: e.target.value})}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'المدة (دقيقة)' : 'Duration (minutes)'}</Label>
                <Input
                  type="number"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({...newSession, duration: parseInt(e.target.value) || 60})}
                  placeholder="60"
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'الحد الأقصى للمشاركين' : 'Max Participants'}</Label>
                <Input
                  type="number"
                  value={newSession.maxParticipants}
                  onChange={(e) => setNewSession({...newSession, maxParticipants: parseInt(e.target.value) || 100})}
                  placeholder="100"
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'الكلمات المفتاحية' : 'Tags'}</Label>
                <Input
                  value={newSession.tags.join(', ')}
                  onChange={(e) => setNewSession({...newSession, tags: e.target.value.split(', ')})}
                  placeholder={isRTL ? 'مباشر، تفاعلي، تعليمي' : 'live, interactive, educational'}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateSession}>
                {isRTL ? 'إنشاء الجلسة' : 'Create Session'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'جلسات مباشرة' : 'Live Now'}</p>
                <p className="text-2xl font-bold text-red-500">{liveSessions_active.length}</p>
              </div>
              <Video className="h-8 w-8 text-red-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'جلسات مجدولة' : 'Scheduled'}</p>
                <p className="text-2xl font-bold text-blue-500">{upcomingSessions.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'المشاركون النشطون' : 'Active Participants'}</p>
                <p className="text-2xl font-bold text-green-500">
                  {liveSessions_active.reduce((sum, session) => sum + session.participants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'جلسات مكتملة' : 'Completed'}</p>
                <p className="text-2xl font-bold text-gray-500">{completedSessions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="live">{isRTL ? 'مباشر الآن' : 'Live Now'}</TabsTrigger>
          <TabsTrigger value="upcoming">{isRTL ? 'جلسات قادمة' : 'Upcoming'}</TabsTrigger>
          <TabsTrigger value="completed">{isRTL ? 'مكتملة' : 'Completed'}</TabsTrigger>
          <TabsTrigger value="recordings">{isRTL ? 'التسجيلات' : 'Recordings'}</TabsTrigger>
        </TabsList>

        {/* Live Sessions Tab */}
        <TabsContent value="live" className="space-y-4">
          {liveSessions_active.length === 0 ? (
            <Card className="p-6 text-center">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {isRTL ? 'لا توجد جلسات مباشرة حالياً' : 'No live sessions currently active'}
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {liveSessions_active.map((session) => {
                const statusBadge = getStatusBadge(session.status);
                return (
                  <Card key={session.id} className="border-red-200 bg-red-50 dark:bg-red-900/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{session.title}</h3>
                            <Badge className={statusBadge.className}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{session.description}</p>
                          
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{session.participants}/{session.maxParticipants} {isRTL ? 'مشارك' : 'participants'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{session.duration} {isRTL ? 'دقيقة' : 'minutes'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(session.scheduledAt).toLocaleDateString('ar-SA')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-muted-foreground" />
                              <span>{session.instructor}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleJoinSession(session)}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            {isRTL ? 'انضمام للبث' : 'Join Live'}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingSessions.map((session) => {
              const statusBadge = getStatusBadge(session.status);
              return (
                <Card key={session.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{session.title}</h3>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{session.description}</p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(session.scheduledAt).toLocaleString('ar-SA')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{session.duration} {isRTL ? 'دقيقة' : 'minutes'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{isRTL ? 'حتى' : 'Up to'} {session.maxParticipants} {isRTL ? 'مشارك' : 'participants'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                            <span>{session.instructor}</span>
                          </div>
                        </div>
                        
                        {session.tags.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {session.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          {isRTL ? 'تعديل' : 'Edit'}
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Completed Sessions Tab */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedSessions.map((session) => {
              const statusBadge = getStatusBadge(session.status);
              return (
                <Card key={session.id} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{session.title}</h3>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{session.description}</p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(session.scheduledAt).toLocaleDateString('ar-SA')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{session.participants} {isRTL ? 'مشارك' : 'participants'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{session.duration} {isRTL ? 'دقيقة' : 'minutes'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                            <span>{session.instructor}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {session.recordingUrl && (
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            {isRTL ? 'مشاهدة التسجيل' : 'Watch Recording'}
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          {isRTL ? 'تحميل' : 'Download'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Recordings Tab */}
        <TabsContent value="recordings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'مكتبة التسجيلات' : 'Recordings Library'}</h3>
            <p className="text-muted-foreground">
              {isRTL ? 'جميع تسجيلات الجلسات المباشرة متاحة هنا للمراجعة والتحميل' : 'All live session recordings available for review and download'}
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Live Stream Dialog */}
      <Dialog open={showStreamDialog} onOpenChange={setShowStreamDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-red-500" />
              {selectedSession?.title || (isRTL ? 'البث المباشر' : 'Live Stream')}
            </DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <LiveStreamPlayer 
              sessionId={selectedSession.id}
              isInstructor={true}
              onJoinSession={() => console.log('Joined session')}
              onLeaveSession={() => setShowStreamDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};