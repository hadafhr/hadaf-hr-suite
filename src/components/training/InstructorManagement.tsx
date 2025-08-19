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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  UserCheck, 
  Star, 
  BookOpen, 
  Users, 
  Phone, 
  Mail, 
  Award,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  MessageSquare,
  Video
} from 'lucide-react';
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

export const InstructorManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { 
    instructors, 
    courses,
    createInstructor, 
    updateInstructor, 
    getCoursesByInstructor,
    loading 
  } = useTrainingSystem();

  const [selectedTab, setSelectedTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const [newInstructor, setNewInstructor] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    bio: '',
    experience: '',
    certifications: [''],
    avatar: '',
    isActive: true,
    rating: 0,
    totalCourses: 0,
    totalStudents: 0
  });

  // Filter instructors
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && instructor.isActive) ||
                         (selectedFilter === 'inactive' && !instructor.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleCreateInstructor = async () => {
    const result = await createInstructor(newInstructor);
    if (result.success) {
      setShowCreateDialog(false);
      setNewInstructor({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        bio: '',
        experience: '',
        certifications: [''],
        avatar: '',
        isActive: true,
        rating: 0,
        totalCourses: 0,
        totalStudents: 0
      });
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' }
      : { text: isRTL ? 'غير نشط' : 'Inactive', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'إدارة المدربين' : 'Instructor Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إدارة وتتبع أداء المدربين وتخصصاتهم' : 'Manage and track instructor performance and specializations'}
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إضافة مدرب جديد' : 'Add New Instructor'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إضافة مدرب جديد' : 'Add New Instructor'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
                <Input
                  value={newInstructor.fullName}
                  onChange={(e) => setNewInstructor({...newInstructor, fullName: e.target.value})}
                  placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  type="email"
                  value={newInstructor.email}
                  onChange={(e) => setNewInstructor({...newInstructor, email: e.target.value})}
                  placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                <Input
                  value={newInstructor.phone}
                  onChange={(e) => setNewInstructor({...newInstructor, phone: e.target.value})}
                  placeholder={isRTL ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'التخصص' : 'Specialization'}</Label>
                <Input
                  value={newInstructor.specialization}
                  onChange={(e) => setNewInstructor({...newInstructor, specialization: e.target.value})}
                  placeholder={isRTL ? 'أدخل التخصص' : 'Enter specialization'}
                />
              </div>
              
              <div className="col-span-2">
                <Label>{isRTL ? 'السيرة الذاتية' : 'Biography'}</Label>
                <Textarea
                  value={newInstructor.bio}
                  onChange={(e) => setNewInstructor({...newInstructor, bio: e.target.value})}
                  placeholder={isRTL ? 'أدخل نبذة عن المدرب' : 'Enter instructor biography'}
                  rows={3}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
                <Input
                  value={newInstructor.experience}
                  onChange={(e) => setNewInstructor({...newInstructor, experience: e.target.value})}
                  placeholder={isRTL ? 'مثال: 5 سنوات' : 'e.g. 5 years'}
                />
              </div>
              
              <div>
                <Label>{isRTL ? 'الحالة' : 'Status'}</Label>
                <Select value={newInstructor.isActive.toString()} onValueChange={(value) => setNewInstructor({...newInstructor, isActive: value === 'true'})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="false">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateInstructor} disabled={loading}>
                {isRTL ? 'إضافة المدرب' : 'Add Instructor'}
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
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المدربين' : 'Total Instructors'}</p>
                <p className="text-2xl font-bold">{instructors.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'المدربين النشطين' : 'Active Instructors'}</p>
                <p className="text-2xl font-bold text-green-500">{instructors.filter(i => i.isActive).length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط التقييم' : 'Average Rating'}</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {instructors.length > 0 ? (instructors.reduce((sum, i) => sum + i.rating, 0) / instructors.length).toFixed(1) : '0.0'}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الطلاب' : 'Total Students'}</p>
                <p className="text-2xl font-bold text-blue-500">{instructors.reduce((sum, i) => sum + i.totalStudents, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">{isRTL ? 'قائمة المدربين' : 'Instructor List'}</TabsTrigger>
          <TabsTrigger value="performance">{isRTL ? 'تقييم الأداء' : 'Performance'}</TabsTrigger>
          <TabsTrigger value="schedule">{isRTL ? 'الجدولة' : 'Schedule'}</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في المدربين...' : 'Search instructors...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                {isRTL ? 'الكل' : 'All'}
              </Button>
              <Button
                variant={selectedFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('active')}
              >
                {isRTL ? 'نشط' : 'Active'}
              </Button>
              <Button
                variant={selectedFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('inactive')}
              >
                {isRTL ? 'غير نشط' : 'Inactive'}
              </Button>
            </div>
          </div>

          {/* Instructors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => {
              const instructorCourses = getCoursesByInstructor(instructor.id);
              const statusBadge = getStatusBadge(instructor.isActive);
              
              return (
                <Card key={instructor.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={instructor.avatar} />
                        <AvatarFallback>{instructor.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{instructor.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{instructor.specialization}</p>
                          </div>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{instructor.rating}</span>
                          <span className="text-xs text-muted-foreground">
                            ({instructor.totalStudents} {isRTL ? 'طالب' : 'students'})
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{instructor.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-primary" />
                          <span>{instructor.totalCourses} {isRTL ? 'دورة' : 'courses'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-blue-500" />
                          <span>{instructor.experience}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{instructor.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{instructor.phone}</span>
                      </div>

                      {instructor.certifications.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {instructor.certifications.slice(0, 3).map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {isRTL ? 'رسالة' : 'Message'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'تقييم أداء المدربين' : 'Instructor Performance Analytics'}</h3>
            <p className="text-muted-foreground">
              {isRTL ? 'تحليلات مفصلة لأداء المدربين وتقييمات الطلاب' : 'Detailed analytics on instructor performance and student feedback'}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'جدولة المدربين' : 'Instructor Scheduling'}</h3>
            <p className="text-muted-foreground">
              {isRTL ? 'إدارة جداول المدربين والحجوزات' : 'Manage instructor schedules and bookings'}
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};