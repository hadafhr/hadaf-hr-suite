import React, { useState } from 'react';
import { EmptyStateCard } from '@/components/EmptyStateCard';
import { Users, UserPlus, FileSpreadsheet, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const employeeSchema = z.object({
  employee_id: z.string().min(1, 'الرقم الوظيفي مطلوب'),
  first_name: z.string().min(1, 'الاسم الأول مطلوب'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'اسم العائلة مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  phone: z.string().optional(),
  national_id: z.string().optional(),
  nationality: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  basic_salary: z.number().min(0, 'الراتب يجب أن يكون صفر أو أكثر'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmptyEmployeesViewProps {
  onEmployeeAdded: () => void;
}

export const EmptyEmployeesView = ({ onEmployeeAdded }: EmptyEmployeesViewProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee_id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      national_id: '',
      nationality: 'سعودي',
      basic_salary: 0,
    },
  });

  const handleAddEmployee = async (data: EmployeeFormData) => {
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

      const { error } = await supabase
        .from('boud_employees')
        .insert([{
          employee_id: data.employee_id,
          first_name: data.first_name,
          middle_name: data.middle_name || '',
          last_name: data.last_name,
          email: data.email || '',
          phone: data.phone || '',
          national_id: data.national_id || '',
          nationality: data.nationality || 'سعودي',
          gender: data.gender || 'male',
          basic_salary: data.basic_salary || 0,
          company_id: employeeData.company_id,
          employment_status: 'active',
          hire_date: new Date().toISOString().split('T')[0],
          annual_leave_balance: 30,
          sick_leave_balance: 30,
          emergency_leave_balance: 5
        }]);

      if (error) throw error;

      toast({
        title: "تم إضافة الموظف بنجاح",
        description: `تم إنشاء سجل ${data.first_name} ${data.last_name} بنجاح`,
      });

      setIsAddDialogOpen(false);
      form.reset();
      onEmployeeAdded();
    } catch (error: any) {
      toast({
        title: "خطأ في إضافة الموظف",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Employee Management Guide */}
      <Card className="bg-purple-50/50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Users className="h-5 w-5" />
            نظام إدارة الموظفين المتقدم
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-purple-700">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <UserPlus className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">إضافة الموظفين</h4>
              <p className="text-sm">تسجيل بيانات الموظفين الجدد</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">إدارة السجلات</h4>
              <p className="text-sm">تنظيم وتحديث المعلومات</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Settings className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">إعدادات النظام</h4>
              <p className="text-sm">تخصيص الحقول والأذونات</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-medium mb-1">ربط الأقسام</h4>
              <p className="text-sm">تنظيم الهيكل الإداري</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <EmptyStateCard
        title="لم يتم إدخال بيانات الموظفين بعد"
        description="لا توجد سجلات موظفين في النظام. ابدأ بإضافة الموظفين يدوياً لإنشاء قاعدة بيانات شاملة وتفعيل جميع مميزات النظام."
        onAddNew={() => setIsAddDialogOpen(true)}
        addButtonText="إضافة موظف جديد يدوياً"
        icon={<Users className="h-8 w-8 text-muted-foreground" />}
      />

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>إضافة موظف جديد</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddEmployee)} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرقم الوظيفي *</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: EMP001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الأول *</FormLabel>
                      <FormControl>
                        <Input placeholder="أحمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم العائلة *</FormLabel>
                      <FormControl>
                        <Input placeholder="محمد" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ahmed@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="+966501234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="national_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهوية</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنسية</FormLabel>
                      <FormControl>
                        <Input placeholder="سعودي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الجنس</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنس" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">ذكر</SelectItem>
                          <SelectItem value="female">أنثى</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="basic_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الراتب الأساسي (ريال)</FormLabel>
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

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">إضافة الموظف</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};