import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, MapPin, Building2, Calendar } from 'lucide-react';
import { useCareers } from '@/hooks/useCareers';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationModalProps {
  job: any;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose
}) => {
  const { submitApplication, uploadResume, loading } = useCareers();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    cover_letter: ''
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "نوع ملف غير صالح",
          description: "يرجى رفع ملف PDF أو Word فقط",
          variant: "destructive"
        });
        return;
      }

      // التحقق من حجم الملف (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "الملف كبير جداً",
          description: "يجب أن يكون حجم الملف أقل من 5 ميجابايت",
          variant: "destructive"
        });
        return;
      }

      setResumeFile(file);
    }
  };

  const validateForm = () => {
    if (!formData.applicant_name.trim()) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى إدخال الاسم الكامل",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.applicant_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicant_email)) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى إدخال بريد إلكتروني صالح",
        variant: "destructive"
      });
      return false;
    }

    if (!resumeFile) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى رفع السيرة الذاتية",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // رفع السيرة الذاتية
      const resumeUrl = await uploadResume(resumeFile!, formData.applicant_email);
      if (!resumeUrl) {
        throw new Error('فشل في رفع السيرة الذاتية');
      }

      // تقديم الطلب
      const applicationData = {
        job_opening_id: job.id,
        applicant_name: formData.applicant_name,
        applicant_email: formData.applicant_email,
        applicant_phone: formData.applicant_phone,
        cover_letter: formData.cover_letter,
        resume_url: resumeUrl
      };

      const result = await submitApplication(applicationData);
      
      if (result) {
        // إعادة تعيين النموذج
        setFormData({
          applicant_name: '',
          applicant_email: '',
          applicant_phone: '',
          cover_letter: ''
        });
        setResumeFile(null);
        onClose();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "خطأ في التقديم",
        description: "حدث خطأ أثناء تقديم طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getJobTypeName = (type: string) => {
    const types: { [key: string]: string } = {
      'full_time': 'دوام كامل',
      'part_time': 'دوام جزئي',
      'contract': 'عقد مؤقت',
      'internship': 'تدريب'
    };
    return types[type] || type;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">التقديم على الوظيفة</DialogTitle>
        </DialogHeader>

        {/* معلومات الوظيفة */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                <span>{job.department?.name}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{getJobTypeName(job.job_type)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="applicant_name">الاسم الكامل *</Label>
              <Input
                id="applicant_name"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleInputChange}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div>
              <Label htmlFor="applicant_email">البريد الإلكتروني *</Label>
              <Input
                id="applicant_email"
                name="applicant_email"
                type="email"
                value={formData.applicant_email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="applicant_phone">رقم الهاتف</Label>
            <Input
              id="applicant_phone"
              name="applicant_phone"
              type="tel"
              value={formData.applicant_phone}
              onChange={handleInputChange}
              placeholder="+966 5xxxxxxxx"
              dir="ltr"
            />
          </div>

          <div>
            <Label htmlFor="resume">السيرة الذاتية *</Label>
            <div className="mt-1">
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                {resumeFile ? (
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{resumeFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">ارفع السيرة الذاتية</p>
                    <p className="text-xs text-muted-foreground">PDF أو Word (حد أقصى 5MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="cover_letter">رسالة تحفيزية (اختياري)</Label>
            <Textarea
              id="cover_letter"
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleInputChange}
              placeholder="اكتب رسالة قصيرة توضح سبب اهتمامك بهذه الوظيفة..."
              rows={5}
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">ملاحظة مهمة:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• تأكد من صحة جميع البيانات قبل التقديم</li>
              <li>• سيتم مراجعة طلبك خلال 3-5 أيام عمل</li>
              <li>• ستصلك رسالة تأكيد على البريد الإلكتروني</li>
              <li>• يمكنك متابعة حالة طلبك من خلال البريد الإلكتروني</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? 'جاري التقديم...' : 'تقديم الطلب'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};