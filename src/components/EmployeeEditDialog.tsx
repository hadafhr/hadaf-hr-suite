import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  joinDate: string;
  city: string;
  notes?: string;
  status: 'active' | 'inactive' | 'on-leave';
}

interface EmployeeEditDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

export const EmployeeEditDialog: React.FC<EmployeeEditDialogProps> = ({
  employee,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Employee>(
    employee || {
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: 0,
      joinDate: '',
      city: '',
      notes: '',
      status: 'active'
    }
  );
  const { toast } = useToast();

  React.useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        salary: 0,
        joinDate: '',
        city: '',
        notes: '',
        status: 'active'
      });
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.position) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: employee ? "تم تحديث بيانات الموظف" : "تم إضافة موظف جديد",
      description: `تم ${employee ? 'تحديث' : 'إضافة'} ${formData.name} بنجاح`,
    });
    onClose();
  };

  const handleInputChange = (field: keyof Employee, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            {employee ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الاسم */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">الاسم الكامل *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 text-right"
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">البريد الإلكتروني *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 text-right"
                  placeholder="البريد الإلكتروني"
                  required
                />
              </div>
            </div>

            {/* رقم الهاتف */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 text-right"
                  placeholder="05xxxxxxxx"
                />
              </div>
            </div>

            {/* المنصب */}
            <div className="space-y-2">
              <Label htmlFor="position" className="text-right">المنصب *</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="pl-10 text-right"
                  placeholder="المنصب الوظيفي"
                  required
                />
              </div>
            </div>

            {/* القسم */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-right">القسم</Label>
              <Select onValueChange={(value) => handleInputChange('department', value)} value={formData.department}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">الموارد البشرية</SelectItem>
                  <SelectItem value="finance">المالية</SelectItem>
                  <SelectItem value="it">تقنية المعلومات</SelectItem>
                  <SelectItem value="marketing">التسويق</SelectItem>
                  <SelectItem value="sales">المبيعات</SelectItem>
                  <SelectItem value="operations">العمليات</SelectItem>
                  <SelectItem value="legal">الشؤون القانونية</SelectItem>
                  <SelectItem value="admin">الإدارة العامة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* الراتب */}
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-right">الراتب الأساسي (ريال)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', Number(e.target.value))}
                  className="pl-10 text-right"
                  placeholder="0"
                />
              </div>
            </div>

            {/* تاريخ الانضمام */}
            <div className="space-y-2">
              <Label htmlFor="joinDate" className="text-right">تاريخ الانضمام</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                  className="pl-10 text-right"
                />
              </div>
            </div>

            {/* المدينة */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-right">المدينة</Label>
              <Select onValueChange={(value) => handleInputChange('city', value)} value={formData.city}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riyadh">الرياض</SelectItem>
                  <SelectItem value="jeddah">جدة</SelectItem>
                  <SelectItem value="dammam">الدمام</SelectItem>
                  <SelectItem value="mecca">مكة المكرمة</SelectItem>
                  <SelectItem value="medina">المدينة المنورة</SelectItem>
                  <SelectItem value="taif">الطائف</SelectItem>
                  <SelectItem value="abha">أبها</SelectItem>
                  <SelectItem value="tabuk">تبوك</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* الحالة */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-right">حالة الموظف</Label>
              <Select onValueChange={(value) => handleInputChange('status', value)} value={formData.status}>
                <SelectTrigger className="text-right">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="on-leave">في إجازة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ملاحظات */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-right">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="text-right"
              placeholder="أي ملاحظات أو معلومات إضافية عن الموظف"
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">
              {employee ? 'حفظ التغييرات' : 'إضافة الموظف'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};