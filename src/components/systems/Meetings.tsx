import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, Users, Search, Plus, Video, MapPin } from 'lucide-react';

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
  attendees: string[];
  priority: 'high' | 'medium' | 'low';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const meetings: Meeting[] = [
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
      attendees: ['سارة أحمد', 'محمد خالد', 'فاطمة علي', 'عبد الله سعد'],
      priority: 'high'
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
      attendees: ['جميع الموظفين'],
      priority: 'medium'
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
      attendees: ['أعضاء مجلس الإدارة'],
      priority: 'high'
    }
  ];

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

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || meeting.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'الاجتماعات' : 'Meetings'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة الاجتماعات وحجز القاعات والتنسيق' : 'Manage meetings, room bookings and scheduling'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'اجتماع جديد' : 'New Meeting'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'اجتماعات اليوم' : 'Today\'s Meetings'}
                  </p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'القاعات المتاحة' : 'Available Rooms'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'المشاركون اليوم' : 'Today\'s Participants'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">42</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الاجتماعات الإلكترونية' : 'Online Meetings'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">15</p>
                </div>
                <Video className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                        <div>
                          <CardTitle className="text-lg mb-2">{meeting.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{meeting.organizer}</p>
                        </div>
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
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              {isRTL ? 'الوصف' : 'Description'}
                            </h4>
                            <p className="text-sm">{meeting.description}</p>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'المكان:' : 'Location:'}</span>
                            <span className="text-sm font-medium">{meeting.location}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'التاريخ:' : 'Date:'}</span>
                            <span className="text-sm font-medium">{meeting.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'الوقت:' : 'Time:'}</span>
                            <span className="text-sm font-medium">{meeting.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'المدة:' : 'Duration:'}</span>
                            <span className="text-sm">{meeting.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'المشاركون:' : 'Attendees:'}</span>
                            <span className="text-sm font-medium">{meeting.attendees.length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">
                          {isRTL ? 'المشاركون' : 'Attendees'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {meeting.attendees.slice(0, 3).map((attendee, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {attendee}
                            </Badge>
                          ))}
                          {meeting.attendees.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{meeting.attendees.length - 3} {isRTL ? 'آخرون' : 'more'}
                            </Badge>
                          )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetingRooms.map((room) => {
                const statusBadge = getRoomStatusBadge(room.status);
                
                return (
                  <Card key={room.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{room.location}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{isRTL ? 'السعة:' : 'Capacity:'}</span>
                          <span className="text-sm font-medium">{room.capacity} {isRTL ? 'شخص' : 'people'}</span>
                        </div>
                        
                        {room.currentBooking && (
                          <div className="p-3 bg-red-50 rounded-lg">
                            <h4 className="font-medium text-sm text-red-800 mb-1">
                              {isRTL ? 'محجوزة حالياً' : 'Currently Booked'}
                            </h4>
                            <p className="text-sm text-red-700">{room.currentBooking.title}</p>
                            <p className="text-xs text-red-600">{room.currentBooking.time} - {room.currentBooking.organizer}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">
                            {isRTL ? 'المعدات المتاحة' : 'Available Equipment'}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.map((equipment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {equipment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline" className="flex-1" disabled={room.status === 'occupied'}>
                          {isRTL ? 'احجز' : 'Book'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
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
                <CardTitle>{isRTL ? 'تقويم الاجتماعات' : 'Meeting Calendar'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'عرض جميع الاجتماعات في تقويم شهري وأسبوعي' : 'View all meetings in monthly and weekly calendar view'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};