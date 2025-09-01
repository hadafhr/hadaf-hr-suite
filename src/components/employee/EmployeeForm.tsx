import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: string;
  employeeId: string;
  avatar: string;
  nationality: string;
  idNumber: string;
  emergencyContact: string;
  address: string;
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: 0,
    hireDate: '',
    employeeId: '',
    avatar: '',
    nationality: '',
    idNumber: '',
    emergencyContact: '',
    address: ''
  });

  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const departments = [
    'الموارد البشرية',
    'المالية',
    'التكنولوجيا',
    'التسويق',
    'المبيعات',
    'العمليات',
    'القانونية',
    'التطوير'
  ];

  const positions = [
    'مدير',
    'مساعد مدير',
    'مشرف',
    'موظف',
    'اختصاصي',
    'محلل',
    'مطور',
    'مسؤول'
  ];

  const handleInputChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmployeeId = () => {
    const id = `EMP${Date.now().toString().slice(-6)}`;
    setFormData(prev => ({
      ...prev,
      employeeId: id
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.position || !formData.department) {
      toast.error('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }

    if (!formData.employeeId) {
      generateEmployeeId();
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">البيانات الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview} alt="صورة الموظف" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="avatar-upload"
                />
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      رفع صورة
                    </span>
                  </Button>
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="أدخل الاسم الكامل"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+966 XX XXX XXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">الجنسية</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="الجنسية"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">رقم الهوية/الإقامة</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                placeholder="رقم الهوية أو الإقامة"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">بيانات العمل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="employeeId">الرقم الوظيفي</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="الرقم الوظيفي"
                />
              </div>
              <Button 
                type="button" 
                onClick={generateEmployeeId}
                className="mt-8"
                variant="outline"
                size="sm"
              >
                توليد
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">المنصب *</Label>
              <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنصب" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">القسم *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">الراتب الأساسي</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate">تاريخ التوظيف</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">جهة الاتصال الطارئ</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="اسم ورقم جهة الاتصال الطارئ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="العنوان الكامل"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          إلغاء
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          حفظ الموظف
        </Button>
      </div>
    </form>
  );
};