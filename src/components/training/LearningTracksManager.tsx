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
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  BookOpen, 
  Users,
  Clock,
  Star,
  Plus,
  Edit,
  Eye,
  Search,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  Building2,
  User,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3,
  Brain
} from 'lucide-react';
import { useTrainingSystem } from '@/hooks/useTrainingSystem';

interface LearningTrack {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  department: string;
  targetAudience: string;
  courses: string[];
  courseDetails: {
    id: string;
    title: string;
    duration: string;
    order: number;
    isCompleted?: boolean;
    progress?: number;
  }[];
  totalDuration: string;
  estimatedCompletion: string;
  enrolledUsers: number;
  completedUsers: number;
  averageRating: number;
  status: 'active' | 'draft' | 'archived';
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningObjectives: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  tags: string[];
}

interface TrackEnrollment {
  id: string;
  trackId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  enrolledAt: string;
  currentCourse: string;
  progress: number;
  completedCourses: number;
  totalCourses: number;
  status: 'in-progress' | 'completed' | 'paused';
  estimatedCompletion: string;
}

export const LearningTracksManager: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { courses } = useTrainingSystem();

  const [selectedTab, setSelectedTab] = useState('tracks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);
  const [showTrackDetails, setShowTrackDetails] = useState(false);

  const [newTrack, setNewTrack] = useState({
    title: '',
    englishTitle: '',
    description: '',
    department: '',
    targetAudience: '',
    level: 'beginner',
    prerequisites: [''],
    learningObjectives: [''],
    tags: ['']
  });

  // Sample learning tracks data
  const [learningTracks] = useState<LearningTrack[]>([
    {
      id: 'track_1',
      title: 'مسار تطوير القيادة الشامل',
      englishTitle: 'Comprehensive Leadership Development Track',
      description: 'برنامج متكامل لتطوير المهارات القيادية والإدارية للمدراء والمشرفين',
      department: 'إدارة عامة',
      targetAudience: 'المدراء والمشرفين',
      courses: ['1', '2'],
      courseDetails: [
        { id: '1', title: 'أساسيات إدارة المشاريع', duration: '40 ساعة', order: 1 },
        { id: '2', title: 'التسويق الرقمي المتقدم', duration: '32 ساعة', order: 2 }
      ],
      totalDuration: '72 ساعة',
      estimatedCompletion: '8 أسابيع',
      enrolledUsers: 145,
      completedUsers: 89,
      averageRating: 4.8,
      status: 'active',
      level: 'intermediate',
      prerequisites: ['خبرة إدارية لا تقل عن سنتين'],
      learningObjectives: [
        'تطوير المهارات القيادية',
        'فهم أساسيات إدارة المشاريع',
        'تحسين مهارات التواصل'
      ],
      createdBy: 'د. محمد الأحمد',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-10T14:30:00Z',
      thumbnail: '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png',
      tags: ['قيادة', 'إدارة', 'تطوير']
    },
    {
      id: 'track_2',
      title: 'مسار التقنية والبرمجة المتقدم',
      englishTitle: 'Advanced Technology & Programming Track',
      description: 'مسار شامل لتعلم أحدث التقنيات والأدوات البرمجية المطلوبة في سوق العمل',
      department: 'تقنية المعلومات',
      targetAudience: 'المطورين والمهندسين',
      courses: ['3'],
      courseDetails: [
        { id: '3', title: 'البرمجة بـ React', duration: '48 ساعة', order: 1 }
      ],
      totalDuration: '120 ساعة',
      estimatedCompletion: '12 أسبوع',
      enrolledUsers: 234,
      completedUsers: 187,
      averageRating: 4.9,
      status: 'active',
      level: 'advanced',
      prerequisites: ['معرفة أساسية بالبرمجة', 'JavaScript الأساسية'],
      learningObjectives: [
        'إتقان تطوير تطبيقات React',
        'فهم أدوات التطوير الحديثة',
        'تطبيق أفضل الممارسات في البرمجة'
      ],
      createdBy: 'م. أحمد العتيبي',
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-02-15T16:45:00Z',
      thumbnail: '/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png',
      tags: ['برمجة', 'تقنية', 'React']
    },
    {
      id: 'track_3',
      title: 'مسار المالية والمحاسبة',
      englishTitle: 'Finance & Accounting Professional Track',
      description: 'دورات متخصصة في المالية والمحاسبة والتخطيط المالي للمحترفين',
      department: 'المالية',
      targetAudience: 'المحاسبين والماليين',
      courses: ['2'],
      courseDetails: [
        { id: '2', title: 'التسويق الرقمي المتقدم', duration: '32 ساعة', order: 1 }
      ],
      totalDuration: '150 ساعة',
      estimatedCompletion: '15 أسبوع',
      enrolledUsers: 98,
      completedUsers: 76,
      averageRating: 4.7,
      status: 'active',
      level: 'intermediate',
      prerequisites: ['بكالوريوس في المحاسبة أو المالية'],
      learningObjectives: [
        'فهم المعايير المحاسبية الدولية',
        'تطوير مهارات التحليل المالي',
        'إعداد التقارير المالية'
      ],
      createdBy: 'أ. فاطمة الزهراني',
      createdAt: '2024-01-25T11:30:00Z',
      updatedAt: '2024-02-12T13:15:00Z',
      thumbnail: '/lovable-uploads/9315a174-2c21-4ec0-8554-b4936be67676.png',
      tags: ['مالية', 'محاسبة', 'تخطيط']
    }
  ]);

  // Sample enrollment data
  const [trackEnrollments] = useState<TrackEnrollment[]>([
    {
      id: 'enroll_1',
      trackId: 'track_1',
      userId: 'user_1',
      userName: 'أحمد محمد الأحمد',
      userEmail: 'ahmed.mohammed@company.com',
      userAvatar: '/lovable-uploads/e178bb8e-1473-4998-a200-54739ac16b3e.png',
      enrolledAt: '2024-02-01T10:00:00Z',
      currentCourse: 'أساسيات إدارة المشاريع',
      progress: 65,
      completedCourses: 1,
      totalCourses: 2,
      status: 'in-progress',
      estimatedCompletion: '2024-03-15T00:00:00Z'
    },
    {
      id: 'enroll_2',
      trackId: 'track_2',
      userId: 'user_2',
      userName: 'فاطمة الزهراني',
      userEmail: 'fatima.alzahrani@company.com',
      userAvatar: '/lovable-uploads/ebeb1cac-6889-402f-800b-60ea4e5b64c5.png',
      enrolledAt: '2024-01-15T09:00:00Z',
      currentCourse: 'البرمجة بـ React',
      progress: 90,
      completedCourses: 2,
      totalCourses: 3,
      status: 'in-progress',
      estimatedCompletion: '2024-02-28T00:00:00Z'
    }
  ]);

  // Filter tracks
  const filteredTracks = learningTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.englishTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || track.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'draft': { text: isRTL ? 'مسودة' : 'Draft', className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
      'archived': { text: isRTL ? 'مؤرشف' : 'Archived', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'beginner': { text: isRTL ? 'مبتدئ' : 'Beginner', className: 'bg-green-500/10 text-green-500' },
      'intermediate': { text: isRTL ? 'متوسط' : 'Intermediate', className: 'bg-yellow-500/10 text-yellow-500' },
      'advanced': { text: isRTL ? 'متقدم' : 'Advanced', className: 'bg-red-500/10 text-red-500' }
    };
    return levelConfig[level as keyof typeof levelConfig];
  };

  const getProgressStatusBadge = (status: string) => {
    const statusConfig = {
      'in-progress': { text: isRTL ? 'قيد التقدم' : 'In Progress', className: 'bg-blue-500/10 text-blue-500' },
      'completed': { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-green-500/10 text-green-500' },
      'paused': { text: isRTL ? 'متوقف' : 'Paused', className: 'bg-yellow-500/10 text-yellow-500' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const handleCreateTrack = () => {
    // Handle creating new track
    console.log('Creating new track:', newTrack);
    setShowCreateDialog(false);
    
    // Reset form
    setNewTrack({
      title: '',
      englishTitle: '',
      description: '',
      department: '',
      targetAudience: '',
      level: 'beginner',
      prerequisites: [''],
      learningObjectives: [''],
      tags: ['']
    });
  };

  const handleTrackClick = (track: LearningTrack) => {
    setSelectedTrack(track);
    setShowTrackDetails(true);
  };

  // Calculate statistics
  const stats = {
    totalTracks: learningTracks.length,
    activeTracks: learningTracks.filter(t => t.status === 'active').length,
    totalEnrollments: learningTracks.reduce((sum, t) => sum + t.enrolledUsers, 0),
    averageCompletion: Math.round(learningTracks.reduce((sum, t) => sum + (t.completedUsers / Math.max(t.enrolledUsers, 1)) * 100, 0) / learningTracks.length),
    averageRating: learningTracks.reduce((sum, t) => sum + t.averageRating, 0) / learningTracks.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'إدارة مسارات التعلم' : 'Learning Tracks Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة المسارات التعليمية المتكاملة والمنهجية' : 'Create and manage comprehensive structured learning pathways'}
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'إنشاء مسار جديد' : 'Create New Track'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء مسار تعليمي جديد' : 'Create New Learning Track'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'عنوان المسار (عربي)' : 'Track Title (Arabic)'}</Label>
                  <Input
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({...newTrack, title: e.target.value})}
                    placeholder={isRTL ? 'أدخل عنوان المسار' : 'Enter track title'}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'عنوان المسار (إنجليزي)' : 'Track Title (English)'}</Label>
                  <Input
                    value={newTrack.englishTitle}
                    onChange={(e) => setNewTrack({...newTrack, englishTitle: e.target.value})}
                    placeholder={isRTL ? 'أدخل العنوان الإنجليزي' : 'Enter English title'}
                  />
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'وصف المسار' : 'Track Description'}</Label>
                <Textarea
                  value={newTrack.description}
                  onChange={(e) => setNewTrack({...newTrack, description: e.target.value})}
                  placeholder={isRTL ? 'وصف مفصل للمسار التعليمي' : 'Detailed description of the learning track'}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'القسم' : 'Department'}</Label>
                  <Select value={newTrack.department} onValueChange={(value) => setNewTrack({...newTrack, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر القسم' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">{isRTL ? 'تقنية المعلومات' : 'Information Technology'}</SelectItem>
                      <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</SelectItem>
                      <SelectItem value="finance">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
                      <SelectItem value="marketing">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{isRTL ? 'المستوى' : 'Level'}</Label>
                  <Select value={newTrack.level} onValueChange={(value) => setNewTrack({...newTrack, level: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{isRTL ? 'مبتدئ' : 'Beginner'}</SelectItem>
                      <SelectItem value="intermediate">{isRTL ? 'متوسط' : 'Intermediate'}</SelectItem>
                      <SelectItem value="advanced">{isRTL ? 'متقدم' : 'Advanced'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'الفئة المستهدفة' : 'Target Audience'}</Label>
                <Input
                  value={newTrack.targetAudience}
                  onChange={(e) => setNewTrack({...newTrack, targetAudience: e.target.value})}
                  placeholder={isRTL ? 'مثال: المدراء والمشرفين' : 'e.g. Managers and Supervisors'}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateTrack}>
                {isRTL ? 'إنشاء المسار' : 'Create Track'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المسارات' : 'Total Tracks'}</p>
                <p className="text-2xl font-bold">{stats.totalTracks}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'المسارات النشطة' : 'Active Tracks'}</p>
                <p className="text-2xl font-bold text-green-500">{stats.activeTracks}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المسجلين' : 'Total Enrollments'}</p>
                <p className="text-2xl font-bold text-blue-500">{stats.totalEnrollments}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.averageCompletion}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط التقييم' : 'Average Rating'}</p>
                <p className="text-2xl font-bold text-purple-500">{stats.averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tracks">{isRTL ? 'المسارات' : 'Learning Tracks'}</TabsTrigger>
          <TabsTrigger value="enrollments">{isRTL ? 'المسجلين' : 'Enrollments'}</TabsTrigger>
          <TabsTrigger value="analytics">{isRTL ? 'التحليلات' : 'Analytics'}</TabsTrigger>
          <TabsTrigger value="recommendations">{isRTL ? 'التوصيات الذكية' : 'AI Recommendations'}</TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في المسارات...' : 'Search learning tracks...'}
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
                variant={selectedFilter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('draft')}
              >
                {isRTL ? 'مسودة' : 'Draft'}
              </Button>
            </div>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => {
              const statusBadge = getStatusBadge(track.status);
              const levelBadge = getLevelBadge(track.level);
              const completionRate = track.enrolledUsers > 0 ? (track.completedUsers / track.enrolledUsers) * 100 : 0;
              
              return (
                <Card key={track.id} className="border-border bg-card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleTrackClick(track)}>
                  <div className="relative">
                    <img 
                      src={track.thumbnail} 
                      alt={track.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={statusBadge.className}>
                        {statusBadge.text}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={levelBadge.className}>
                        {levelBadge.text}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg mb-1 line-clamp-2">{track.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{track.englishTitle}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'القسم:' : 'Department:'}</span>
                          <span className="font-medium">{track.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الدورات:' : 'Courses:'}</span>
                          <span>{track.courseDetails.length} {isRTL ? 'دورة' : 'courses'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المدة:' : 'Duration:'}</span>
                          <span>{track.totalDuration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{track.averageRating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {track.enrolledUsers} {isRTL ? 'مسجل' : 'enrolled'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'معدل الإكمال' : 'Completion Rate'}</span>
                          <span className="font-medium">{Math.round(completionRate)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>

                      {track.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {track.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
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
                        <Edit className="h-3 w-3 mr-1" />
                        {isRTL ? 'تعديل' : 'Edit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="enrollments" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'المسجلين في المسارات' : 'Track Enrollments'}</h3>
            <div className="space-y-4">
              {trackEnrollments.map((enrollment) => {
                const progressBadge = getProgressStatusBadge(enrollment.status);
                return (
                  <div key={enrollment.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{enrollment.userName}</h4>
                          <p className="text-sm text-muted-foreground">{enrollment.userEmail}</p>
                        </div>
                      </div>
                      <Badge className={progressBadge.className}>
                        {progressBadge.text}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isRTL ? 'التقدم العام' : 'Overall Progress'}</span>
                          <span className="font-medium">{enrollment.progress}%</span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                      </div>
                      
                      <div className="text-sm">
                        <p className="text-muted-foreground">{isRTL ? 'الدورة الحالية:' : 'Current Course:'}</p>
                        <p className="font-medium">{enrollment.currentCourse}</p>
                      </div>
                      
                      <div className="text-sm">
                        <p className="text-muted-foreground">{isRTL ? 'الدورات المكتملة:' : 'Completed Courses:'}</p>
                        <p className="font-medium">{enrollment.completedCourses}/{enrollment.totalCourses}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {isRTL ? 'تحليلات المسارات التعليمية' : 'Learning Track Analytics'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL ? 'تحليلات مفصلة لأداء المسارات ومعدلات الإكمال' : 'Detailed analytics on track performance and completion rates'}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              {isRTL ? 'التوصيات الذكية للمسارات' : 'AI-Powered Track Recommendations'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL ? 'توصيات ذكية لإنشاء مسارات جديدة وتحسين المسارات الموجودة' : 'Smart recommendations for creating new tracks and improving existing ones'}
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Track Details Dialog */}
      <Dialog open={showTrackDetails} onOpenChange={setShowTrackDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {selectedTrack ? selectedTrack.title : (isRTL ? 'تفاصيل المسار' : 'Track Details')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTrack && (
            <div className="space-y-6">
              {/* Track Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedTrack.thumbnail} 
                    alt={selectedTrack.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedTrack.title}</h3>
                    <p className="text-muted-foreground">{selectedTrack.englishTitle}</p>
                  </div>
                  <p className="text-sm">{selectedTrack.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{isRTL ? 'القسم:' : 'Department:'}</p>
                      <p className="font-medium">{selectedTrack.department}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{isRTL ? 'المستوى:' : 'Level:'}</p>
                      <Badge className={getLevelBadge(selectedTrack.level).className}>
                        {getLevelBadge(selectedTrack.level).text}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <Card className="p-4">
                <h4 className="font-semibold mb-3">{isRTL ? 'الدورات المتضمنة' : 'Included Courses'}</h4>
                <div className="space-y-2">
                  {selectedTrack.courseDetails.map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between p-2 border border-border rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                          {course.order}
                        </div>
                        <span className="font-medium">{course.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{course.duration}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};