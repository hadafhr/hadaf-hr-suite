import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Send, X } from 'lucide-react';

interface LeaveRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    leave_type: 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid';
    start_date: string;
    end_date: string;
    reason?: string;
    total_days: number;
  }) => Promise<void>;
}

export const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    leave_type: '' as 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid' | '',
    start_date: '',
    end_date: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDays = () => {
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.leave_type || !formData.start_date || !formData.end_date) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        leave_type: formData.leave_type as 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid',
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason,
        total_days: calculateDays()
      });
      
      // Reset form
      setFormData({
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: ''
      });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            طلب إجازة جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="leave_type">نوع الإجازة *</Label>
            <Select 
              value={formData.leave_type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, leave_type: value as any }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الإجازة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">إجازة سنوية</SelectItem>
                <SelectItem value="sick">إجازة مرضية</SelectItem>
                <SelectItem value="emergency">إجازة طارئة</SelectItem>
                <SelectItem value="maternity">إجازة وضع</SelectItem>
                <SelectItem value="paternity">إجازة أبوة</SelectItem>
                <SelectItem value="unpaid">إجازة بدون راتب</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">تاريخ البداية *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="end_date">تاريخ النهاية *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                required
                min={formData.start_date}
              />
            </div>
          </div>

          {formData.start_date && formData.end_date && (
            <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
              عدد الأيام: {calculateDays()} يوم
            </div>
          )}

          <div>
            <Label htmlFor="reason">السبب (اختياري)</Label>
            <Textarea
              id="reason"
              placeholder="اكتب سبب الإجازة..."
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={!formData.leave_type || !formData.start_date || !formData.end_date || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  جاري الإرسال...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 ml-2" />
                  إرسال الطلب
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};