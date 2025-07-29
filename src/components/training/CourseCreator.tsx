import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  Upload,
  Video,
  FileText,
  Presentation,
  Plus,
  Trash2,
  Save,
  Eye,
  Calendar,
  Clock,
  Users,
  Award
} from 'lucide-react';

interface CourseModule {
  id: string;
  title: string;
  type: 'video' | 'document' | 'presentation' | 'quiz' | 'live';
  content?: string;
  duration?: number;
  file?: File;
}

interface CourseData {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  maxStudents: number;
  language: string;
  modules: CourseModule[];
}

export const CourseCreator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    price: 0,
    maxStudents: 50,
    language: 'ar',
    modules: []
  });

  const [newModule, setNewModule] = useState<Partial<CourseModule>>({
    title: '',
    type: 'video'
  });

  const categories = [
    'إدارة الأعمال',
    'التقنية والبرمجة',
    'التسويق الرقمي',
    'المالية والمحاسبة',
    'الموارد البشرية',
    'التطوير الشخصي',
    'اللغات'
  ];

  const levels = ['مبتدئ', 'متوسط', 'متقدم', 'خبير'];

  const moduleTypes = [
    { value: 'video', label: 'فيديو', icon: Video },
    { value: 'document', label: 'مستند', icon: FileText },
    { value: 'presentation', label: 'عرض تقديمي', icon: Presentation },
    { value: 'quiz', label: 'اختبار', icon: Award },
    { value: 'live', label: 'جلسة مباشرة', icon: Users }
  ];

  const handleInputChange = (field: keyof CourseData, value: any) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    if (newModule.title && newModule.type) {
      const module: CourseModule = {
        id: Date.now().toString(),
        title: newModule.title,
        type: newModule.type as CourseModule['type'],
        duration: newModule.duration || 0
      };
      
      setCourseData(prev => ({
        ...prev,
        modules: [...prev.modules, module]
      }));
      
      setNewModule({ title: '', type: 'video' });
    }
  };

  const removeModule = (moduleId: string) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== moduleId)
    }));
  };

  const handleFileUpload = (moduleId: string, file: File) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? { ...m, file } : m
      )
    }));
  };

  const saveCourse = () => {
    console.log('Saving course:', courseData);
    // هنا سيتم إرسال البيانات إلى الخادم
  };

  const previewCourse = () => {
    console.log('Previewing course:', courseData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">معلومات الدورة الأساسية</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الدورة *</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="أدخل عنوان الدورة"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الدورة *</Label>
              <Textarea
                id="description"
                value={courseData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="اكتب وصفاً شاملاً للدورة وأهدافها"
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">المستوى *</Label>
                <Select onValueChange={(value) => handleInputChange('level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">المدة (بالساعات) *</Label>
                <Input
                  id="duration"
                  value={courseData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="مثال: 8"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">السعر (ريال سعودي) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  placeholder="499"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxStudents">الحد الأقصى للمتدربين</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={courseData.maxStudents}
                  onChange={(e) => handleInputChange('maxStudents', Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">لغة الدورة</Label>
                <Select value={courseData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                    <SelectItem value="both">ثنائية اللغة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">محتوى الدورة والوحدات</h3>
            
            {/* إضافة وحدة جديدة */}
            <Card className="p-4 border-dashed border-2">
              <h4 className="font-medium mb-3">إضافة وحدة جديدة</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <Input
                  value={newModule.title}
                  onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان الوحدة"
                />
                
                <Select 
                  value={newModule.type} 
                  onValueChange={(value) => setNewModule(prev => ({ ...prev, type: value as CourseModule['type'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moduleTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={addModule} className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة
                </Button>
              </div>
            </Card>

            {/* قائمة الوحدات */}
            <div className="space-y-3">
              {courseData.modules.map((module, index) => {
                const TypeIcon = moduleTypes.find(t => t.value === module.type)?.icon || BookOpen;
                return (
                  <Card key={module.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <TypeIcon className="h-5 w-5 text-primary" />
                        <div>
                          <h5 className="font-medium">{module.title}</h5>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">
                              {moduleTypes.find(t => t.value === module.type)?.label}
                            </Badge>
                            {module.duration && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {module.duration} دقيقة
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeModule(module.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">مراجعة ونشر الدورة</h3>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-4">ملخص الدورة</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">العنوان:</span>
                    <p className="font-medium">{courseData.title || 'لم يتم تحديده'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">التصنيف:</span>
                    <p className="font-medium">{courseData.category || 'لم يتم تحديده'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">المستوى:</span>
                    <p className="font-medium">{courseData.level || 'لم يتم تحديده'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">المدة:</span>
                    <p className="font-medium">{courseData.duration} ساعة</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">السعر:</span>
                    <p className="font-medium">{courseData.price} ريال سعودي</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">عدد الوحدات:</span>
                    <p className="font-medium">{courseData.modules.length} وحدة</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">الحد الأقصى للمتدربين:</span>
                    <p className="font-medium">{courseData.maxStudents} متدرب</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">اللغة:</span>
                    <p className="font-medium">
                      {courseData.language === 'ar' ? 'العربية' : 
                       courseData.language === 'en' ? 'الإنجليزية' : 'ثنائية اللغة'}
                    </p>
                  </div>
                </div>
              </div>
              
              {courseData.description && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">الوصف:</span>
                  <p className="mt-1">{courseData.description}</p>
                </div>
              )}
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* شريط التقدم */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">إنشاء دورة تدريبية جديدة</h2>
          <Badge variant="outline">الخطوة {currentStep} من 3</Badge>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between mt-3 text-sm">
          <span className={currentStep >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            المعلومات الأساسية
          </span>
          <span className={currentStep >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            المحتوى والوحدات
          </span>
          <span className={currentStep >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            المراجعة والنشر
          </span>
        </div>
      </Card>

      {/* محتوى الخطوة */}
      <Card className="p-6">
        {renderStepContent()}
      </Card>

      {/* أزرار التنقل */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          السابق
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" onClick={previewCourse}>
            <Eye className="h-4 w-4 mr-2" />
            معاينة
          </Button>
          
          {currentStep === 3 ? (
            <Button onClick={saveCourse} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              حفظ ونشر الدورة
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="btn-primary"
            >
              التالي
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};