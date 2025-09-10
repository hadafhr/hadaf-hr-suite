import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Video, Calendar, Clock, Users, Plus, Search, Filter, Play, Edit, Trash2, Copy } from 'lucide-react';

interface MeetingsTabProps {
  onJoinMeeting: (meetingId: string) => void;
}

export const MeetingsTab = ({ onJoinMeeting }: MeetingsTabProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [meetings, setMeetings] = useState([
    {
      id: '1',
      title: 'اجتماع فريق التطوير الأسبوعي',
      description: 'مراجعة التقدم في المشاريع الحالية',
      date: '2024-01-22',
      time: '10:00',
      duration: 60,
      status: 'scheduled',
      participants: 8
    },
    {
      id: '2',
      title: 'عرض تقديمي للعميل الجديد',
      description: 'عرض الحلول المقترحة',
      date: '2024-01-23',
      time: '14:30',
      duration: 90,
      status: 'scheduled',
      participants: 5
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60
  });

  const handleCreateMeeting = () => {
    if (!newMeeting.title) {
      toast({ title: 'يرجى إدخال عنوان الاجتماع', variant: 'destructive' });
      return;
    }

    const meeting = {
      id: Date.now().toString(),
      ...newMeeting,
      status: 'scheduled' as const,
      participants: 0
    };

    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', description: '', date: '', time: '', duration: 60 });
    setShowCreateDialog(false);
    toast({ title: 'تم إنشاء الاجتماع بنجاح', variant: 'default' });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الاجتماعات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              اجتماع جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء اجتماع جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label>عنوان الاجتماع</Label>
                <Input
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  placeholder="مثال: اجتماع فريق التطوير"
                />
              </div>
              <div>
                <Label>وصف الاجتماع</Label>
                <Textarea
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                  placeholder="وصف مختصر لهدف الاجتماع"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>التاريخ</Label>
                  <Input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label>الوقت</Label>
                  <Input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label>المدة (دقيقة)</Label>
                  <Input
                    type="number"
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>إلغاء</Button>
                <Button onClick={handleCreateMeeting}>إنشاء الاجتماع</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{meeting.title}</h3>
                  <p className="text-muted-foreground mb-4">{meeting.description}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{meeting.date} - {meeting.time}</span>
                    <span>{meeting.duration} دقيقة</span>
                    <span>{meeting.participants} مشارك</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onJoinMeeting(meeting.id)}>
                    <Play className="h-4 w-4 ml-2" />
                    انضمام
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};