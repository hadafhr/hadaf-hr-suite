import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Building2, Calendar, Clock, Users, DollarSign } from 'lucide-react';

interface JobDetailModalProps {
  job: any;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply
}) => {
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات أساسية */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{job.department?.name}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{getJobTypeName(job.job_type)}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>{job.applications_count} متقدم</span>
            </div>
          </div>

          {/* الراتب */}
          {job.salary_range_min && job.salary_range_max && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex items-center text-primary font-medium">
                <DollarSign className="w-5 h-5 mr-2" />
                الراتب المتوقع: {job.salary_range_min.toLocaleString()} - {job.salary_range_max.toLocaleString()} ريال
              </div>
            </div>
          )}

          <Separator />

          {/* الوصف */}
          <div>
            <h3 className="text-lg font-semibold mb-3">وصف الوظيفة</h3>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          {/* المتطلبات */}
          {Array.isArray(job.requirements) && job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">المتطلبات</h3>
              <ul className="space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* المزايا */}
          {Array.isArray(job.benefits) && job.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">المزايا</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* أزرار العمليات */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              إغلاق
            </Button>
            <Button onClick={onApply} className="flex-1">
              قدّم الآن
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};