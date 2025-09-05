import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Plus, 
  Upload, 
  FileText, 
  Video, 
  Download, 
  Edit, 
  Trash2, 
  Users, 
  Clock, 
  Calendar,
  PlayCircle,
  FileCheck,
  Star
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number; // in hours
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
  rating: number;
  materials: CourseMaterial[];
  createdAt: Date;
}

interface CourseMaterial {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'presentation' | 'document';
  url: string;
  size: string;
  duration?: number; // for videos in minutes
}

interface Category {
  id: string;
  name: string;
  color: string;
  coursesCount: number;
}

export const CourseManagement = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // New course form
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    instructor: '',
    duration: ''
  });

  const [categories] = useState<Category[]>([
    { id: 'leadership', name: 'القيادة والإدارة', color: 'bg-blue-500', coursesCount: 12 },
    { id: 'technology', name: 'التقنية والتكنولوجيا', color: 'bg-green-500', coursesCount: 8 },
    { id: 'finance', name: 'المالية والمحاسبة', color: 'bg-purple-500', coursesCount: 6 },
    { id: 'hr', name: 'الموارد البشرية', color: 'bg-orange-500', coursesCount: 15 },
    { id: 'marketing', name: 'التسويق والمبيعات', color: 'bg-red-500', coursesCount: 10 },
    { id: 'communication', name: 'التواصل والعلاقات', color: 'bg-teal-500', coursesCount: 7 }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'مهارات القيادة الفعالة',
      description: 'دورة شاملة لتطوير مهارات القيادة والإدارة الحديثة',
      category: 'leadership',
      instructor: 'د. أحمد محمد',
      duration: 20,
      status: 'published',
      enrollments: 125,
      rating: 4.8,
      materials: [
        { id: '1', title: 'مقدمة في القيادة', type: 'video', url: '#', size: '150 MB', duration: 45 },
        { id: '2', title: 'نظريات القيادة', type: 'pdf', url: '#', size: '2.5 MB' },
        { id: '3', title: 'تطبيقات عملية', type: 'presentation', url: '#', size: '8 MB' }
      ],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'إدارة الوقت والإنتاجية',
      description: 'تعلم كيفية إدارة الوقت بفعالية وزيادة الإنتاجية الشخصية',
      category: 'hr',
      instructor: 'أ. فاطمة علي',
      duration: 15,
      status: 'published',
      enrollments: 89,
      rating: 4.6,
      materials: [
        { id: '4', title: 'أساسيات إدارة الوقت', type: 'video', url: '#', size: '120 MB', duration: 35 },
        { id: '5', title: 'تقنيات الإنتاجية', type: 'document', url: '#', size: '1.8 MB' }
      ],
      createdAt: new Date('2024-02-20')
    },
    {
      id: '3',
      title: 'التسويق الرقمي المتقدم',
      description: 'استراتيجيات التسويق الرقمي الحديثة ووسائل التواصل الاجتماعي',
      category: 'marketing',
      instructor: 'م. سارة أحمد',
      duration: 25,
      status: 'draft',
      enrollments: 0,
      rating: 0,
      materials: [],
      createdAt: new Date('2024-03-01')
    }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.category || !newCourse.instructor) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      description: newCourse.description,
      category: newCourse.category,
      instructor: newCourse.instructor,
      duration: parseInt(newCourse.duration) || 0,
      status: 'draft',
      enrollments: 0,
      rating: 0,
      materials: [],
      createdAt: new Date()
    };

    setCourses([...courses, course]);
    setNewCourse({ title: '', description: '', category: '', instructor: '', duration: '' });
    setIsCreateDialogOpen(false);

    toast({
      title: "تم إنشاء الدورة",
      description: "تم إنشاء دورة تدريبية جديدة بنجاح"
    });
  };

  const handleFileUpload = (courseId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && selectedCourse) {
      const file = files[0];
      const material: CourseMaterial = {
        id: Date.now().toString(),
        title: file.name.split('.')[0],
        type: getFileType(file.type),
        url: URL.createObjectURL(file),
        size: formatFileSize(file.size),
        duration: file.type.startsWith('video/') ? 30 : undefined
      };

      const updatedCourse = {
        ...selectedCourse,
        materials: [...selectedCourse.materials, material]
      };

      setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);

      toast({
        title: "تم رفع الملف",
        description: `تم رفع ${file.name} بنجاح`
      });
    }
  };

  const getFileType = (mimeType: string): CourseMaterial['type'] => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('presentation')) return 'presentation';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getStatusBadge = (status: Course['status']) => {
    const variants = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      draft: 'مسودة',
      published: 'منشورة',
      archived: 'مؤرشفة'
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getMaterialIcon = (type: CourseMaterial['type']) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'presentation': return <PlayCircle className="h-4 w-4" />;
      default: return <FileCheck className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">إدارة الدورات التدريبية</h1>
            <p className="text-muted-foreground">إنشاء وإدارة المحتوى التدريبي والمواد التعليمية</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              دورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إنشاء دورة تدريبية جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان الدورة *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="أدخل عنوان الدورة"
                />
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="وصف مختصر للدورة"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="category">التصنيف *</Label>
                <Select value={newCourse.category} onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="instructor">المدرب *</Label>
                <Input
                  id="instructor"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                  placeholder="اسم المدرب"
                />
              </div>
              <div>
                <Label htmlFor="duration">المدة (بالساعات)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="عدد الساعات"
                />
              </div>
              <Button onClick={handleCreateCourse} className="w-full">
                إنشاء الدورة
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-8 h-8 ${category.color} rounded-full mx-auto mb-2`}></div>
              <h3 className="font-medium text-sm">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.coursesCount} دورة</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="البحث في الدورات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="جميع التصنيفات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التصنيفات</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">المدرب: {course.instructor}</p>
                </div>
                {getStatusBadge(course.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} ساعة</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrollments}</span>
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${getCategoryColor(course.category)} rounded-full`}></div>
                <span className="text-sm">{getCategoryName(course.category)}</span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">المواد التعليمية</span>
                  <Badge variant="secondary">{course.materials.length}</Badge>
                </div>
                <Progress value={(course.materials.length / 10) * 100} className="h-2" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Edit className="ml-2 h-4 w-4" />
                  تحرير
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="ml-2 h-4 w-4" />
                  المتدربين
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                تفاصيل الدورة: {selectedCourse.title}
                {getStatusBadge(selectedCourse.status)}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="materials" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="materials">المواد التعليمية</TabsTrigger>
                <TabsTrigger value="details">التفاصيل</TabsTrigger>
                <TabsTrigger value="analytics">الإحصائيات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="materials" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">المواد التعليمية</h3>
                  <Button size="sm" onClick={() => handleFileUpload(selectedCourse.id)}>
                    <Upload className="ml-2 h-4 w-4" />
                    رفع ملف
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {selectedCourse.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMaterialIcon(material.type)}
                        <div>
                          <p className="font-medium">{material.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {material.size}
                            {material.duration && ` • ${material.duration} دقيقة`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {selectedCourse.materials.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لم يتم رفع أي مواد تعليمية بعد</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>عنوان الدورة</Label>
                    <Input defaultValue={selectedCourse.title} />
                  </div>
                  <div>
                    <Label>المدرب</Label>
                    <Input defaultValue={selectedCourse.instructor} />
                  </div>
                  <div>
                    <Label>التصنيف</Label>
                    <Select defaultValue={selectedCourse.category}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>المدة (ساعات)</Label>
                    <Input type="number" defaultValue={selectedCourse.duration} />
                  </div>
                </div>
                <div>
                  <Label>الوصف</Label>
                  <Textarea defaultValue={selectedCourse.description} rows={4} />
                </div>
                <Button>حفظ التغييرات</Button>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourse.enrollments}</div>
                      <p className="text-sm text-muted-foreground">المسجلين</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourse.rating}</div>
                      <p className="text-sm text-muted-foreground">التقييم</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourse.materials.length}</div>
                      <p className="text-sm text-muted-foreground">المواد</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourse.duration}</div>
                      <p className="text-sm text-muted-foreground">ساعة</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.avi,.mov"
      />
    </div>
  );
};