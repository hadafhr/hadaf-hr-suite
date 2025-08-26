import React, { useState } from 'react';
import { EmptyStateCard } from '@/components/EmptyStateCard';
import { BookOpen, Users, Award, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

const courseSchema = z.object({
  title: z.string().min(1, 'عنوان الدورة مطلوب'),
  englishTitle: z.string().optional(),
  description: z.string().min(1, 'وصف الدورة مطلوب'),
  instructor: z.string().min(1, 'اسم المدرب مطلوب'),
  duration: z.string().min(1, 'مدة الدورة مطلوبة'),
  level: z.enum(['مبتدئ', 'متوسط', 'متقدم']),
  category: z.string().min(1, 'فئة الدورة مطلوبة'),
  format: z.enum(['online', 'offline', 'hybrid']),
  capacity: z.number().min(1, 'السعة يجب أن تكون أكبر من صفر'),
  price: z.number().min(0, 'السعر يجب أن يكون صفر أو أكثر'),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface EmptyTrainingViewProps {
  onCourseAdded: () => void;
}

export const EmptyTrainingView = ({ onCourseAdded }: EmptyTrainingViewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      englishTitle: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'مبتدئ',
      category: '',
      format: 'online',
      capacity: 30,
      price: 0,
    },
  });

  const handleAddCourse = async (data: CourseFormData) => {
    try {
      // Here you would typically save to your database
      // For now, we'll just show success message
      toast({
        title: "تم إضافة الدورة بنجاح",
        description: `تم إنشاء دورة ${data.title} بنجاح`,
      });

      setIsAddDialogOpen(false);
      form.reset();
      onCourseAdded();
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء الدورة",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Training System Guide */}
      <Card className="bg-green-50/50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <BookOpen className="h-5 w-5" />
            نظام إدارة التدريب والتطوير
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-700">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">الدورات التدريبية</h4>
              <p className="text-sm">إنشاء وإدارة الدورات</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">المدربين</h4>
              <p className="text-sm">إدارة قاعدة المدربين</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Video className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">الجلسات المباشرة</h4>
              <p className="text-sm">التدريب التفاعلي المباشر</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">الشهادات</h4>
              <p className="text-sm">إصدار وإدارة الشهادات</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <EmptyStateCard
        title="لم يتم إعداد برامج التدريب بعد"
        description="لا توجد دورات تدريبية مُنشأة في النظام. ابدأ بإضافة الدورات والبرامج التدريبية لتطوير مهارات الموظفين ورفع كفاءتهم المهنية."
        onAddNew={() => setIsAddDialogOpen(true)}
        addButtonText="إضافة دورة تدريبية جديدة"
        icon={<BookOpen className="h-8 w-8 text-muted-foreground" />}
      />

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>إضافة دورة تدريبية جديدة</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddCourse)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان الدورة *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: أساسيات إدارة المشاريع" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="englishTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان بالإنجليزية</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Management Fundamentals" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الدورة *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="وصف تفصيلي عن محتوى الدورة وأهدافها" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المدرب *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: د. أحمد محمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مدة الدورة *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 40 ساعة / 5 أيام" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مستوى الدورة</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المستوى" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                          <SelectItem value="متوسط">متوسط</SelectItem>
                          <SelectItem value="متقدم">متقدم</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع التدريب</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="online">عن بُعد</SelectItem>
                          <SelectItem value="offline">حضوري</SelectItem>
                          <SelectItem value="hybrid">مختلط</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد المقاعد</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="30" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>فئة الدورة *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: إدارة، تقنية، تسويق" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رسوم الدورة (ريال)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">إضافة الدورة</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};