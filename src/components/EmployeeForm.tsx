import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useDownloadPrint } from '@/hooks/useDownloadPrint';
import { 
  Save, 
  Download, 
  Printer, 
  Upload, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
  CreditCard,
  FileText,
  Home,
  GraduationCap
} from 'lucide-react';

interface Employee {
  id?: string;
  employee_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  full_name_arabic?: string;
  national_id?: string;
  passport_number?: string;
  nationality?: string;
  gender?: 'male' | 'female';
  marital_status?: string;
  date_of_birth?: string;
  phone?: string;
  email?: string;
  address?: string;
  hire_date?: string;
  contract_start_date?: string;
  contract_end_date?: string;
  contract_type?: string;
  position?: string;
  department?: string;
  basic_salary?: number;
  housing_allowance?: number;
  transport_allowance?: number;
  other_allowances?: number;
  bank_name?: string;
  bank_account_number?: string;
  iban?: string;
  education_level?: string;
  university?: string;
  major?: string;
  graduation_year?: number;
  experience_years?: number;
  work_location?: string;
  employment_status?: 'active' | 'inactive' | 'terminated' | 'on_leave';
  profile_picture_url?: string;
  notes?: string;
}

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  onSave: (employee: Employee) => void;
  mode: 'create' | 'edit' | 'view';
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isOpen,
  onClose,
  employee,
  onSave,
  mode
}) => {
  const { downloadFile, printData } = useDownloadPrint();
  const [formData, setFormData] = useState<Employee>(
    employee || {
      employee_id: `EMP${Date.now()}`,
      first_name: '',
      last_name: '',
      employment_status: 'active',
      contract_type: 'permanent',
      basic_salary: 0,
      housing_allowance: 0,
      transport_allowance: 0,
      other_allowances: 0,
      experience_years: 0
    }
  );

  const handleInputChange = (field: keyof Employee, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.first_name || !formData.last_name) {
      toast.error('يرجى إدخال الاسم الأول والأخير');
      return;
    }
    onSave(formData);
    toast.success(mode === 'create' ? 'تم إضافة الموظف بنجاح' : 'تم تحديث بيانات الموظف بنجاح');
    onClose();
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    downloadFile({
      data: formData,
      filename: `employee_${formData.employee_id}`,
      format
    });
  };

  const handlePrint = () => {
    printData(formData, `بيانات الموظف - ${formData.first_name} ${formData.last_name}`);
  };

  const isViewOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#009F87]">
            <User className="h-5 w-5" />
            {mode === 'create' ? 'إضافة موظف جديد' : 
             mode === 'edit' ? 'تعديل بيانات الموظف' : 'عرض بيانات الموظف'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* أزرار الإجراءات */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={formData.employment_status === 'active' ? 'default' : 'secondary'}>
                {formData.employment_status === 'active' ? 'نشط' : 'غير نشط'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                رقم الموظف: {formData.employee_id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
              >
                <Download className="h-4 w-4 ml-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('excel')}
              >
                <Download className="h-4 w-4 ml-2" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 ml-2" />
                طباعة
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* البيانات الشخصية */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  البيانات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profile_picture_url} />
                    <AvatarFallback className="text-lg">
                      {formData.first_name?.[0]}{formData.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الاسم الأول *</Label>
                    <Input
                      value={formData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="أدخل الاسم الأول"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>اسم الأب</Label>
                    <Input
                      value={formData.middle_name || ''}
                      onChange={(e) => handleInputChange('middle_name', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="أدخل اسم الأب"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الاسم الأخير *</Label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="أدخل الاسم الأخير"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الاسم بالعربية</Label>
                  <Input
                    value={formData.full_name_arabic || ''}
                    onChange={(e) => handleInputChange('full_name_arabic', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="أدخل الاسم الكامل بالعربية"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رقم الهوية</Label>
                    <Input
                      value={formData.national_id || ''}
                      onChange={(e) => handleInputChange('national_id', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="رقم الهوية الوطنية"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>رقم الجواز</Label>
                    <Input
                      value={formData.passport_number || ''}
                      onChange={(e) => handleInputChange('passport_number', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="رقم جواز السفر"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الجنسية</Label>
                    <Select 
                      value={formData.nationality || ''} 
                      onValueChange={(value) => handleInputChange('nationality', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجنسية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saudi">سعودي</SelectItem>
                        <SelectItem value="egyptian">مصري</SelectItem>
                        <SelectItem value="jordanian">أردني</SelectItem>
                        <SelectItem value="lebanese">لبناني</SelectItem>
                        <SelectItem value="syrian">سوري</SelectItem>
                        <SelectItem value="palestinian">فلسطيني</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الجنس</Label>
                    <Select 
                      value={formData.gender || ''} 
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الحالة الاجتماعية</Label>
                    <Select 
                      value={formData.marital_status || ''} 
                      onValueChange={(value) => handleInputChange('marital_status', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">أعزب</SelectItem>
                        <SelectItem value="married">متزوج</SelectItem>
                        <SelectItem value="divorced">مطلق</SelectItem>
                        <SelectItem value="widowed">أرمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>تاريخ الميلاد</Label>
                    <Input
                      type="date"
                      value={formData.date_of_birth || ''}
                      onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      disabled={isViewOnly}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* بيانات الاتصال والعنوان */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  بيانات الاتصال والعنوان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="+966 5xx xxx xxx"
                  />
                </div>

                <div className="space-y-2">
                  <Label>البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>العنوان</Label>
                  <Textarea
                    value={formData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="أدخل العنوان الكامل"
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    البيانات الوظيفية
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ التعيين</Label>
                      <Input
                        type="date"
                        value={formData.hire_date || ''}
                        onChange={(e) => handleInputChange('hire_date', e.target.value)}
                        disabled={isViewOnly}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>نوع العقد</Label>
                      <Select 
                        value={formData.contract_type || ''} 
                        onValueChange={(value) => handleInputChange('contract_type', value)}
                        disabled={isViewOnly}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع العقد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">دائم</SelectItem>
                          <SelectItem value="temporary">مؤقت</SelectItem>
                          <SelectItem value="contract">تعاقد</SelectItem>
                          <SelectItem value="internship">تدريب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ بداية العقد</Label>
                      <Input
                        type="date"
                        value={formData.contract_start_date || ''}
                        onChange={(e) => handleInputChange('contract_start_date', e.target.value)}
                        disabled={isViewOnly}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ انتهاء العقد</Label>
                      <Input
                        type="date"
                        value={formData.contract_end_date || ''}
                        onChange={(e) => handleInputChange('contract_end_date', e.target.value)}
                        disabled={isViewOnly}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>المنصب</Label>
                      <Input
                        value={formData.position || ''}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        disabled={isViewOnly}
                        placeholder="أدخل المنصب"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>القسم</Label>
                      <Select 
                        value={formData.department || ''} 
                        onValueChange={(value) => handleInputChange('department', value)}
                        disabled={isViewOnly}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">تقنية المعلومات</SelectItem>
                          <SelectItem value="hr">الموارد البشرية</SelectItem>
                          <SelectItem value="finance">المالية</SelectItem>
                          <SelectItem value="marketing">التسويق</SelectItem>
                          <SelectItem value="operations">العمليات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>مكان العمل</Label>
                    <Input
                      value={formData.work_location || ''}
                      onChange={(e) => handleInputChange('work_location', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="أدخل مكان العمل"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>حالة التوظيف</Label>
                    <Select 
                      value={formData.employment_status || ''} 
                      onValueChange={(value) => handleInputChange('employment_status', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="inactive">غير نشط</SelectItem>
                        <SelectItem value="on_leave">في إجازة</SelectItem>
                        <SelectItem value="terminated">منتهي الخدمة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* البيانات المالية والتعليمية */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  البيانات المالية والتعليمية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    الراتب والبدلات (ريال)
                  </h4>

                  <div className="space-y-2">
                    <Label>الراتب الأساسي</Label>
                    <Input
                      type="number"
                      value={formData.basic_salary || 0}
                      onChange={(e) => handleInputChange('basic_salary', Number(e.target.value))}
                      disabled={isViewOnly}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>بدل السكن</Label>
                    <Input
                      type="number"
                      value={formData.housing_allowance || 0}
                      onChange={(e) => handleInputChange('housing_allowance', Number(e.target.value))}
                      disabled={isViewOnly}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>بدل المواصلات</Label>
                    <Input
                      type="number"
                      value={formData.transport_allowance || 0}
                      onChange={(e) => handleInputChange('transport_allowance', Number(e.target.value))}
                      disabled={isViewOnly}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>بدلات أخرى</Label>
                    <Input
                      type="number"
                      value={formData.other_allowances || 0}
                      onChange={(e) => handleInputChange('other_allowances', Number(e.target.value))}
                      disabled={isViewOnly}
                      placeholder="0"
                    />
                  </div>

                  <div className="p-3 bg-[#009F87]/10 rounded-lg">
                    <p className="text-sm font-medium text-[#009F87]">
                      إجمالي الراتب: {
                        (formData.basic_salary || 0) + 
                        (formData.housing_allowance || 0) + 
                        (formData.transport_allowance || 0) + 
                        (formData.other_allowances || 0)
                      } ريال
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    البيانات البنكية
                  </h4>

                  <div className="space-y-2">
                    <Label>اسم البنك</Label>
                    <Select 
                      value={formData.bank_name || ''} 
                      onValueChange={(value) => handleInputChange('bank_name', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر البنك" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alrajhi">مصرف الراجحي</SelectItem>
                        <SelectItem value="ncb">البنك الأهلي</SelectItem>
                        <SelectItem value="samba">سامبا</SelectItem>
                        <SelectItem value="riyad">بنك الرياض</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>رقم الحساب</Label>
                    <Input
                      value={formData.bank_account_number || ''}
                      onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="رقم الحساب البنكي"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>رقم الآيبان</Label>
                    <Input
                      value={formData.iban || ''}
                      onChange={(e) => handleInputChange('iban', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="SA00 0000 0000 0000 0000 0000"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    المؤهلات التعليمية
                  </h4>

                  <div className="space-y-2">
                    <Label>المستوى التعليمي</Label>
                    <Select 
                      value={formData.education_level || ''} 
                      onValueChange={(value) => handleInputChange('education_level', value)}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">ثانوية عامة</SelectItem>
                        <SelectItem value="diploma">دبلوم</SelectItem>
                        <SelectItem value="bachelor">بكالوريوس</SelectItem>
                        <SelectItem value="master">ماجستير</SelectItem>
                        <SelectItem value="phd">دكتوراه</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>الجامعة</Label>
                    <Input
                      value={formData.university || ''}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      disabled={isViewOnly}
                      placeholder="اسم الجامعة"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>التخصص</Label>
                      <Input
                        value={formData.major || ''}
                        onChange={(e) => handleInputChange('major', e.target.value)}
                        disabled={isViewOnly}
                        placeholder="التخصص الأكاديمي"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>سنة التخرج</Label>
                      <Input
                        type="number"
                        value={formData.graduation_year || ''}
                        onChange={(e) => handleInputChange('graduation_year', Number(e.target.value))}
                        disabled={isViewOnly}
                        placeholder="2020"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>سنوات الخبرة</Label>
                    <Input
                      type="number"
                      value={formData.experience_years || 0}
                      onChange={(e) => handleInputChange('experience_years', Number(e.target.value))}
                      disabled={isViewOnly}
                      placeholder="0"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>ملاحظات</Label>
                  <Textarea
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    disabled={isViewOnly}
                    placeholder="أدخل أي ملاحظات إضافية"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* أزرار الحفظ والإلغاء */}
          {!isViewOnly && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button onClick={handleSave} className="bg-[#009F87] hover:bg-[#008072]">
                <Save className="h-4 w-4 ml-2" />
                {mode === 'create' ? 'إضافة الموظف' : 'حفظ التغييرات'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};