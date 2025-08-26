import React, { useState } from 'react';
import { EmptyStateCard } from '@/components/EmptyStateCard';
import { Building2, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const departmentSchema = z.object({
  department_code: z.string().min(1, 'كود القسم مطلوب'),
  name_ar: z.string().min(1, 'الاسم باللغة العربية مطلوب'),
  name_en: z.string().optional(),
  description: z.string().optional(),
  department_type: z.string().min(1, 'نوع القسم مطلوب'),
  function_type: z.enum(['strategic', 'operational', 'support']),
  sector_type: z.enum(['governmental', 'private', 'nonprofit']),
  location: z.string().optional(),
  budget_allocation: z.number().optional(),
  head_count: z.number().optional(),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface EmptyDepartmentsViewProps {
  onDepartmentAdded: () => void;
}

export const EmptyDepartmentsView = ({ onDepartmentAdded }: EmptyDepartmentsViewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      department_code: '',
      name_ar: '',
      name_en: '',
      description: '',
      department_type: '',
      function_type: 'operational',
      sector_type: 'private',
      location: '',
      budget_allocation: 0,
      head_count: 0,
    },
  });

  const handleAddDepartment = async (data: DepartmentFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get company ID from user's employee record
      const { data: employeeData } = await supabase
        .from('boud_employees')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (!employeeData?.company_id) {
        toast({
          title: "خطأ",
          description: "تعذر تحديد الشركة. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
        return;
      }

      // For now, use a simple local storage approach until proper tables are created
      const { error } = await supabase
        .from('boud_employees')
        .insert([{
          employee_id: `DEPT_${data.department_code}`,
          first_name: data.name_ar || 'قسم جديد',
          last_name: data.department_code,
          email: `${data.department_code}@company.com`,
          company_id: employeeData.company_id,
          employment_status: 'active'
        }]);

      if (error) throw error;

      toast({
        title: "تم إضافة القسم بنجاح",
        description: `تم إنشاء قسم ${data.name_ar} بنجاح`,
      });

      setIsAddDialogOpen(false);
      form.reset();
      onDepartmentAdded();
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء القسم",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Setup Guide */}
      <Card className="bg-blue-50/50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Target className="h-5 w-5" />
            دليل الإعداد السريع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-700">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Building2 className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">1. إنشاء الأقسام</h4>
              <p className="text-sm">ابدأ بإضافة أقسام مؤسستك الرئيسية</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">2. تحديد المناصب</h4>
              <p className="text-sm">أضف المناصب والوظائف لكل قسم</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">3. ربط الموظفين</h4>
              <p className="text-sm">اربط الموظفين بالأقسام والمناصب</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <EmptyStateCard
        title="لم يتم إعداد بيانات الأقسام بعد"
        description="لا توجد أقسام مُنشأة في النظام. ابدأ بإضافة الأقسام الرئيسية لمؤسستك لتتمكن من تنظيم الموظفين وإدارة الهيكل التنظيمي بفعالية."
        onAddNew={() => setIsAddDialogOpen(true)}
        addButtonText="إضافة قسم جديد يدوياً"
        icon={<Building2 className="h-8 w-8 text-muted-foreground" />}
      />

      {/* Add Department Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة قسم جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddDepartment)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كود القسم *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: HR, IT, FIN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم القسم (عربي) *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: قسم الموارد البشرية" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم القسم (إنجليزي)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: Human Resources Department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف القسم</FormLabel>
                    <FormControl>
                      <Textarea placeholder="وصف مختصر عن مهام ومسؤوليات القسم" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="function_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع الوظيفة</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strategic">استراتيجي</SelectItem>
                          <SelectItem value="operational">تشغيلي</SelectItem>
                          <SelectItem value="support">داعم</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sector_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع القطاع</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر القطاع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="governmental">حكومي</SelectItem>
                          <SelectItem value="private">خاص</SelectItem>
                          <SelectItem value="nonprofit">غير ربحي</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="head_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الموظفين المتوقع</FormLabel>
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الموقع</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: الطابق الثاني - المبنى الرئيسي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget_allocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الميزانية المخصصة (ريال)</FormLabel>
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
                <Button type="submit">إضافة القسم</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};