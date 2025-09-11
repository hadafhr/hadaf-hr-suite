import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface NewEvaluationProgramFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const NewEvaluationProgramForm: React.FC<NewEvaluationProgramFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    evaluation_type: '',
    start_date: undefined as Date | undefined,
    end_date: undefined as Date | undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.evaluation_type || !formData.start_date || !formData.end_date) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (formData.end_date <= formData.start_date) {
      toast({
        title: "خطأ",
        description: "تاريخ النهاية يجب أن يكون بعد تاريخ البداية",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('evaluation_programs')
        .insert([{
          program_name: formData.title,
          description: formData.description || null,
          evaluation_type: formData.evaluation_type as 'annual' | 'semi_annual' | 'quarterly' | 'monthly' | 'custom',
          start_date: format(formData.start_date, 'yyyy-MM-dd'),
          end_date: format(formData.end_date, 'yyyy-MM-dd'),
          company_id: 'default-company-id', // This should be dynamic based on user's company
          is_active: true,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم إنشاء برنامج التقييم بنجاح",
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating evaluation program:', error);
      toast({
        title: "خطأ",
        description: "فشل في إنشاء برنامج التقييم",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">عنوان البرنامج *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="مثال: التقييم السنوي 2024"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evaluation_type">نوع التقييم *</Label>
          <Select 
            value={formData.evaluation_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, evaluation_type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع التقييم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">سنوي</SelectItem>
              <SelectItem value="semi_annual">نصف سنوي</SelectItem>
              <SelectItem value="quarterly">ربع سنوي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
              <SelectItem value="custom">قائم على مشروع</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">وصف البرنامج</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="وصف مختصر لبرنامج التقييم وأهدافه"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>تاريخ البداية *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.start_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.start_date ? (
                  format(formData.start_date, "PPP", { locale: ar })
                ) : (
                  <span>اختر تاريخ البداية</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.start_date}
                onSelect={(date) => setFormData(prev => ({ ...prev, start_date: date }))}
                initialFocus
                locale={ar}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>تاريخ النهاية *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.end_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.end_date ? (
                  format(formData.end_date, "PPP", { locale: ar })
                ) : (
                  <span>اختر تاريخ النهاية</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.end_date}
                onSelect={(date) => setFormData(prev => ({ ...prev, end_date: date }))}
                initialFocus
                locale={ar}
                disabled={(date) =>
                  formData.start_date ? date <= formData.start_date : false
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          إلغاء
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          إنشاء البرنامج
        </Button>
      </div>
    </form>
  );
};