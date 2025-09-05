import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  FolderOpen, 
  Upload, 
  Download, 
  FileText, 
  Video, 
  Image, 
  Archive, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Star,
  Share2,
  Copy,
  RefreshCw,
  Calendar,
  User,
  Tag,
  HardDrive
} from 'lucide-react';

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image' | 'presentation' | 'audio' | 'archive';
  url: string;
  size: string;
  uploadedBy: string;
  uploadDate: Date;
  downloadCount: number;
  rating: number;
  tags: string[];
  category: string;
  isPublic: boolean;
  thumbnailUrl?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

export const TrainingLibrary = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true
  });

  const categories: Category[] = [
    { 
      id: 'documents', 
      name: 'المستندات والوثائق', 
      icon: <FileText className="h-5 w-5" />, 
      count: 45,
      color: 'text-blue-600'
    },
    { 
      id: 'videos', 
      name: 'الفيديوهات التعليمية', 
      icon: <Video className="h-5 w-5" />, 
      count: 32,
      color: 'text-red-600'
    },
    { 
      id: 'presentations', 
      name: 'العروض التقديمية', 
      icon: <Image className="h-5 w-5" />, 
      count: 28,
      color: 'text-green-600'
    },
    { 
      id: 'templates', 
      name: 'القوالب والنماذج', 
      icon: <Copy className="h-5 w-5" />, 
      count: 15,
      color: 'text-purple-600'
    },
    { 
      id: 'guides', 
      name: 'الأدلة التدريبية', 
      icon: <Archive className="h-5 w-5" />, 
      count: 22,
      color: 'text-orange-600'
    }
  ];

  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    {
      id: '1',
      title: 'دليل القيادة الفعالة',
      description: 'دليل شامل لتطوير مهارات القيادة والإدارة الحديثة مع أمثلة عملية',
      type: 'document',
      url: '#',
      size: '2.5 MB',
      uploadedBy: 'د. أحمد محمد',
      uploadDate: new Date('2024-01-15'),
      downloadCount: 156,
      rating: 4.8,
      tags: ['قيادة', 'إدارة', 'تطوير'],
      category: 'documents',
      isPublic: true
    },
    {
      id: '2',
      title: 'فيديو: تقنيات إدارة الوقت',
      description: 'فيديو تعليمي يشرح أهم تقنيات إدارة الوقت وزيادة الإنتاجية',
      type: 'video',
      url: '#',
      size: '125 MB',
      uploadedBy: 'أ. فاطمة علي',
      uploadDate: new Date('2024-02-10'),
      downloadCount: 98,
      rating: 4.6,
      tags: ['وقت', 'إنتاجية', 'تنظيم'],
      category: 'videos',
      isPublic: true,
      thumbnailUrl: '/placeholder-video.jpg'
    },
    {
      id: '3',
      title: 'قالب تقييم الموظفين',
      description: 'قالب جاهز لتقييم أداء الموظفين مع معايير وإرشادات التقييم',
      type: 'document',
      url: '#',
      size: '0.8 MB',
      uploadedBy: 'م. سارة أحمد',
      uploadDate: new Date('2024-02-20'),
      downloadCount: 234,
      rating: 4.9,
      tags: ['تقييم', 'أداء', 'قالب'],
      category: 'templates',
      isPublic: true
    },
    {
      id: '4',
      title: 'عرض تقديمي: التسويق الرقمي',
      description: 'عرض تقديمي شامل حول استراتيجيات التسويق الرقمي الحديثة',
      type: 'presentation',
      url: '#',
      size: '15.2 MB',
      uploadedBy: 'أ. محمد سالم',
      uploadDate: new Date('2024-03-01'),
      downloadCount: 67,
      rating: 4.4,
      tags: ['تسويق', 'رقمي', 'استراتيجية'],
      category: 'presentations',
      isPublic: false
    }
  ]);

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.uploadDate.getTime() - a.uploadDate.getTime();
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (!newItem.title) {
        setNewItem(prev => ({ ...prev, title: file.name.split('.')[0] }));
      }

      toast({
        title: "تم اختيار الملف",
        description: `${file.name} - ${formatFileSize(file.size)}`
      });
    }
  };

  const handleUploadItem = () => {
    if (!newItem.title || !newItem.category) {
      toast({
        title: "خطأ",
        description: "يرجى ملء العنوان واختيار التصنيف",
        variant: "destructive"
      });
      return;
    }

    const item: LibraryItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      type: 'document', // Default type
      url: '#',
      size: '1.2 MB', // Placeholder
      uploadedBy: 'المستخدم الحالي',
      uploadDate: new Date(),
      downloadCount: 0,
      rating: 0,
      tags: newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: newItem.category,
      isPublic: newItem.isPublic
    };

    setLibraryItems([...libraryItems, item]);
    setNewItem({ title: '', description: '', category: '', tags: '', isPublic: true });
    setIsUploadDialogOpen(false);

    toast({
      title: "تم رفع الملف",
      description: "تمت إضافة الملف إلى المكتبة التدريبية بنجاح"
    });
  };

  const handleDownload = (item: LibraryItem) => {
    // Update download count
    const updatedItems = libraryItems.map(i => 
      i.id === item.id ? { ...i, downloadCount: i.downloadCount + 1 } : i
    );
    setLibraryItems(updatedItems);

    toast({
      title: "بدء التحميل",
      description: `جاري تحميل ${item.title}`
    });
  };

  const handleShare = (item: LibraryItem) => {
    navigator.clipboard.writeText(`${window.location.origin}/library/${item.id}`);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط المشاركة إلى الحافظة"
    });
  };

  const handleFavorite = (item: LibraryItem) => {
    toast({
      title: "تم الإضافة للمفضلة",
      description: `تمت إضافة "${item.title}" للمفضلة`
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (type: LibraryItem['type']) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-red-600" />;
      case 'image': return <Image className="h-5 w-5 text-green-600" />;
      case 'presentation': return <Image className="h-5 w-5 text-orange-600" />;
      case 'audio': return <Video className="h-5 w-5 text-purple-600" />;
      case 'archive': return <Archive className="h-5 w-5 text-gray-600" />;
      default: return <FileText className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">مكتبة التدريب</h1>
            <p className="text-muted-foreground">مجموعة شاملة من المواد التدريبية القابلة للتحميل والتحديث</p>
          </div>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="ml-2 h-4 w-4" />
              رفع ملف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>رفع ملف جديد للمكتبة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fileTitle">عنوان الملف *</Label>
                <Input
                  id="fileTitle"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="أدخل عنوان الملف"
                />
              </div>
              <div>
                <Label htmlFor="fileDescription">الوصف</Label>
                <Input
                  id="fileDescription"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="وصف مختصر للملف"
                />
              </div>
              <div>
                <Label htmlFor="fileCategory">التصنيف *</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
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
                <Label htmlFor="fileTags">العلامات (مفصولة بفاصلة)</Label>
                <Input
                  id="fileTags"
                  value={newItem.tags}
                  onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                  placeholder="مثال: قيادة, تطوير, إدارة"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>متاح للجميع</Label>
                <Button
                  variant={newItem.isPublic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewItem({ ...newItem, isPublic: !newItem.isPublic })}
                >
                  {newItem.isPublic ? 'نعم' : 'لا'}
                </Button>
              </div>
              <Button onClick={handleFileUpload} variant="outline" className="w-full">
                <Upload className="ml-2 h-4 w-4" />
                اختيار ملف
              </Button>
              <Button onClick={handleUploadItem} className="w-full">
                رفع الملف
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={category.color}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} ملف</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث في المكتبة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="نوع الملف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="document">مستندات</SelectItem>
                <SelectItem value="video">فيديو</SelectItem>
                <SelectItem value="presentation">عروض</SelectItem>
                <SelectItem value="image">صور</SelectItem>
                <SelectItem value="archive">أرشيف</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">الأحدث</SelectItem>
                <SelectItem value="downloads">الأكثر تحميلاً</SelectItem>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="name">الاسم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Library Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{libraryItems.length}</div>
            <p className="text-sm text-muted-foreground">إجمالي الملفات</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {libraryItems.reduce((sum, item) => sum + item.downloadCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">مرات التحميل</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(libraryItems.reduce((sum, item) => sum + item.rating, 0) / libraryItems.length * 10) / 10}
            </div>
            <p className="text-sm text-muted-foreground">متوسط التقييم</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {libraryItems.filter(item => item.isPublic).length}
            </div>
            <p className="text-sm text-muted-foreground">ملفات عامة</p>
          </CardContent>
        </Card>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getFileTypeIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">بواسطة {item.uploadedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{item.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  <span>{item.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{item.downloadCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{item.uploadDate.toLocaleDateString('ar-SA')}</span>
                </div>
              </div>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  size="sm" 
                  onClick={() => handleDownload(item)}
                  className="flex-1"
                >
                  <Download className="ml-2 h-4 w-4" />
                  تحميل
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedItem(item)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare(item)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleFavorite(item)}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Item Details Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {getFileTypeIcon(selectedItem.type)}
                {selectedItem.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">المؤلف:</span> {selectedItem.uploadedBy}
                </div>
                <div>
                  <span className="font-medium">تاريخ الرفع:</span> {selectedItem.uploadDate.toLocaleDateString('ar-SA')}
                </div>
                <div>
                  <span className="font-medium">الحجم:</span> {selectedItem.size}
                </div>
                <div>
                  <span className="font-medium">مرات التحميل:</span> {selectedItem.downloadCount}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">الوصف:</h4>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
              </div>

              {selectedItem.tags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">العلامات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        <Tag className="ml-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleDownload(selectedItem)} className="flex-1">
                  <Download className="ml-2 h-4 w-4" />
                  تحميل الملف
                </Button>
                <Button variant="outline" onClick={() => handleShare(selectedItem)}>
                  <Share2 className="ml-2 h-4 w-4" />
                  مشاركة
                </Button>
                <Button variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تحرير
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mp4,.avi,.mov,.jpg,.png,.zip,.rar"
      />
    </div>
  );
};