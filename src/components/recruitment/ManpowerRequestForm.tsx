import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Calendar, DollarSign } from 'lucide-react';

const manpowerRequestSchema = z.object({
  job_title: z.string().min(3, 'يجب إدخال المسمى الوظيفي'),
  number_of_positions: z.coerce.number().min(1, 'يجب أن يكون العدد 1 على الأقل'),
  reason: z.enum(['workload_increase', 'new_project', 'replacement', 'other']),
  reason_details: z.string().optional(),
  required_skills: z.string().min(10, 'يجب إدخال المهارات المطلوبة'),
  required_experience: z.string().min(5, 'يجب إدخال الخبرات المطلوبة'),
  contract_type: z.enum(['permanent', 'temporary', 'fixed_term']),
  employment_duration: z.string().optional(),
  proposed_salary: z.coerce.number().optional(),
  required_start_date: z.string().min(1, 'يجب تحديد تاريخ الانضمام'),
});

type ManpowerRequestFormData = z.infer<typeof manpowerRequestSchema>;

interface ManpowerRequestFormProps {
  onSuccess?: () => void;
}

export const ManpowerRequestForm: React.FC<ManpowerRequestFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ManpowerRequestFormData>({
    resolver: zodResolver(manpowerRequestSchema),
    defaultValues: {
      number_of_positions: 1,
      reason: 'workload_increase',
      contract_type: 'permanent',
    },
  });

  const onSubmit = async (data: ManpowerRequestFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get user's company and department
      const { data: employee } = await supabase
        .from('boud_employees')
        .select('company_id, department_id')
        .eq('user_id', user.id)
        .single();

      if (!employee) throw new Error('Employee data not found');

      // Check if finance approval is required (e.g., if salary > 15000)
      const financeRequired = data.proposed_salary ? data.proposed_salary > 15000 : false;

      const { error, data: insertedData } = await supabase.from('manpower_requests').insert({
        job_title: data.job_title,
        number_of_positions: data.number_of_positions,
        reason: data.reason as any,
        reason_details: data.reason_details,
        required_skills: data.required_skills,
        required_experience: data.required_experience,
        contract_type: data.contract_type as any,
        employment_duration: data.employment_duration,
        proposed_salary: data.proposed_salary,
        required_start_date: data.required_start_date,
        company_id: employee.company_id as any,
        department_id: employee.department_id as any,
        requested_by: user.id,
        status: 'pending_manager' as any,
        finance_required: financeRequired,
        current_approver_role: 'manager',
      } as any).select('id').single();

      if (error) throw error;

      // Add timeline entry
      if (insertedData?.id) {
        await supabase.from('manpower_request_timeline').insert({
          request_id: insertedData.id,
          stage: 'created',
          action: 'تم إنشاء طلب احتياج وظيفي جديد',
          actor_id: user.id,
        } as any);
      }

      toast({
        title: 'تم إرسال الطلب بنجاح',
        description: 'سيتم مراجعة طلبك من قبل المدير المباشر',
      });

      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'خطأ في إرسال الطلب',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasonOptions = [
    { value: 'workload_increase', label: 'زيادة حجم العمل' },
    { value: 'new_project', label: 'مشروع جديد' },
    { value: 'replacement', label: 'بديل موظف' },
    { value: 'other', label: 'أخرى' },
  ];

  const contractTypeOptions = [
    { value: 'permanent', label: 'دائم' },
    { value: 'temporary', label: 'مؤقت' },
    { value: 'fixed_term', label: 'عقد محدد المدة' },
  ];

  return (
    <Card className="bg-card backdrop-blur-sm border border-border shadow-lg hover:border-primary transition-all duration-300 rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-6 w-6 text-primary" />
          طلب احتياج وظيفي جديد
        </CardTitle>
        <CardDescription>
          املأ النموذج التالي لطلب احتياج وظيفي جديد في قسمك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المسمى الوظيفي المطلوب *</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: محلل بيانات" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number_of_positions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      عدد الموظفين المطلوبين *
                    </FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سبب الاحتياج *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر السبب" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {reasonOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contract_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع العقد *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع العقد" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contractTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proposed_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      الراتب المقترح (ريال سعودي)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="مثال: 8000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="required_start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      موعد الانضمام المطلوب *
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('contract_type') !== 'permanent' && (
                <FormField
                  control={form.control}
                  name="employment_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مدة التوظيف</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: 6 أشهر" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {form.watch('reason') === 'other' && (
              <FormField
                control={form.control}
                name="reason_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تفاصيل السبب</FormLabel>
                    <FormControl>
                      <Textarea placeholder="اشرح سبب الاحتياج بالتفصيل..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="required_skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المهارات المطلوبة *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="مثال: إجادة تحليل البيانات، Excel متقدم، SQL، Python..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="required_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخبرات المطلوبة *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="مثال: 3-5 سنوات خبرة في مجال تحليل البيانات..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                إعادة تعيين
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
