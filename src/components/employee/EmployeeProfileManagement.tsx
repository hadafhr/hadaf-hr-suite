import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, Edit, Upload, FileText, Camera, Phone, 
  Mail, MapPin, Calendar, Briefcase, GraduationCap,
  Building2, CreditCard, Heart, Shield
} from 'lucide-react';
import { useBoudEMS } from '@/hooks/useBoudEMS';
import { useToast } from '@/hooks/use-toast';

export function EmployeeProfileManagement() {
  const [editMode, setEditMode] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const { employees, isLoading, updateEmployee } = useBoudEMS();
  const { toast } = useToast();

  // بيانات تجريبية للموظف الحالي
  const currentEmployee = {
    id: '1',
    employee_id: 'EMP001',
    first_name: 'أحمد',
    last_name: 'محمد الأحمد',
    full_name_arabic: 'أحمد محمد الأحمد',
    email: 'ahmed.mohammed@company.com',
    phone: '+966501234567',
    national_id: '1234567890',
    passport_number: 'A12345678',
    nationality: 'سعودي',
    gender: 'ذكر',
    date_of_birth: '1990-01-15',
    marital_status: 'متزوج',
    address: 'الرياض، المملكة العربية السعودية',
    hire_date: '2020-01-01',
    contract_type: 'دائم',
    position: 'مطور برمجيات',
    basic_salary: 8000,
    housing_allowance: 2000,
    transport_allowance: 500,
    bank_name: 'البنك الأهلي السعودي',
    iban: 'SA1234567890123456789012',
    education_level: 'بكالوريوس',
    university: 'جامعة الملك سعود',
    major: 'علوم الحاسب',
    experience_years: 5,
    profile_picture_url: null,
    emergency_contact: {
      name: 'فاطمة أحمد',
      relationship: 'زوجة',
      phone: '+966507654321'
    }
  };

  const handleSave = async () => {
    try {
      toast({
        title: "تم حفظ البيانات",
        description: "تم تحديث بيانات الملف الشخصي بنجاح"
      });
      setEditMode(false);
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive"
      });
    }
  };

  const documentTypes = [
    { id: 'id_copy', name: 'صورة الهوية', icon: <CreditCard className="h-4 w-4" />, status: 'مرفوع' },
    { id: 'passport', name: 'صورة جواز السفر', icon: <FileText className="h-4 w-4" />, status: 'مرفوع' },
    { id: 'contract', name: 'عقد العمل', icon: <FileText className="h-4 w-4" />, status: 'مرفوع' },
    { id: 'certificate', name: 'الشهادة الجامعية', icon: <GraduationCap className="h-4 w-4" />, status: 'مطلوب' },
    { id: 'medical', name: 'التقرير الطبي', icon: <Heart className="h-4 w-4" />, status: 'مرفوع' },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              إدارة الملف الشخصي
            </CardTitle>
            <Button 
              variant={editMode ? "default" : "outline"} 
              onClick={() => editMode ? handleSave() : setEditMode(true)}
            >
              {editMode ? 'حفظ التغييرات' : 'تحرير البيانات'}
              <Edit className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentEmployee.profile_picture_url || ''} />
                <AvatarFallback className="text-lg">
                  {currentEmployee.first_name.charAt(0) + currentEmployee.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {editMode && (
                <Button size="sm" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  تغيير الصورة
                </Button>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input 
                  value={currentEmployee.full_name_arabic} 
                  disabled={!editMode}
                  className={!editMode ? "bg-gray-50" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label>رقم الموظف</Label>
                <Input 
                  value={currentEmployee.employee_id} 
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input 
                  value={currentEmployee.email} 
                  disabled={!editMode}
                  className={!editMode ? "bg-gray-50" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label>رقم الجوال</Label>
                <Input 
                  value={currentEmployee.phone} 
                  disabled={!editMode}
                  className={!editMode ? "bg-gray-50" : ""}
                />
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                موظف نشط
              </Badge>
              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                {currentEmployee.contract_type}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="job">بيانات الوظيفة</TabsTrigger>
          <TabsTrigger value="financial">البيانات المالية</TabsTrigger>
          <TabsTrigger value="education">التعليم والخبرة</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                البيانات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>رقم الهوية الوطنية</Label>
                  <Input 
                    value={currentEmployee.national_id} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>رقم جواز السفر</Label>
                  <Input 
                    value={currentEmployee.passport_number} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الجنسية</Label>
                  <Input 
                    value={currentEmployee.nationality} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الجنس</Label>
                  <Input 
                    value={currentEmployee.gender} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ الميلاد</Label>
                  <Input 
                    type="date"
                    value={currentEmployee.date_of_birth} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الحالة الاجتماعية</Label>
                  <Input 
                    value={currentEmployee.marital_status} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>العنوان</Label>
                  <Textarea 
                    value={currentEmployee.address} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                    rows={3}
                  />
                </div>

                <div className="col-span-2">
                  <Separator className="my-4" />
                  <h4 className="font-semibold mb-3">جهة الاتصال في حالات الطوارئ</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>الاسم</Label>
                      <Input 
                        value={currentEmployee.emergency_contact.name} 
                        disabled={!editMode}
                        className={!editMode ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>صلة القرابة</Label>
                      <Input 
                        value={currentEmployee.emergency_contact.relationship} 
                        disabled={!editMode}
                        className={!editMode ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الجوال</Label>
                      <Input 
                        value={currentEmployee.emergency_contact.phone} 
                        disabled={!editMode}
                        className={!editMode ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Information */}
        <TabsContent value="job">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                بيانات الوظيفة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المسمى الوظيفي</Label>
                  <Input 
                    value={currentEmployee.position} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ التعيين</Label>
                  <Input 
                    type="date"
                    value={currentEmployee.hire_date} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>نوع العقد</Label>
                  <Input 
                    value={currentEmployee.contract_type} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>سنوات الخبرة</Label>
                  <Input 
                    value={currentEmployee.experience_years} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Information */}
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                البيانات المالية والمصرفية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الراتب الأساسي</Label>
                  <Input 
                    value={`${currentEmployee.basic_salary.toLocaleString()} ريال`} 
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>بدل السكن</Label>
                  <Input 
                    value={`${currentEmployee.housing_allowance.toLocaleString()} ريال`} 
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>بدل المواصلات</Label>
                  <Input 
                    value={`${currentEmployee.transport_allowance.toLocaleString()} ريال`} 
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>إجمالي الراتب</Label>
                  <Input 
                    value={`${(currentEmployee.basic_salary + currentEmployee.housing_allowance + currentEmployee.transport_allowance).toLocaleString()} ريال`} 
                    disabled
                    className="bg-gray-50 font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label>اسم البنك</Label>
                  <Input 
                    value={currentEmployee.bank_name} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>رقم الآيبان</Label>
                  <Input 
                    value={currentEmployee.iban} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                التعليم والمؤهلات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>المستوى التعليمي</Label>
                  <Input 
                    value={currentEmployee.education_level} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الجامعة</Label>
                  <Input 
                    value={currentEmployee.university} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>التخصص</Label>
                  <Input 
                    value={currentEmployee.major} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>سنوات الخبرة الإجمالية</Label>
                  <Input 
                    value={currentEmployee.experience_years} 
                    disabled={!editMode}
                    className={!editMode ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  الوثائق والمستندات
                </CardTitle>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  رفع وثيقة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((doc) => (
                  <Card key={doc.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {doc.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <Badge 
                              variant={doc.status === 'مرفوع' ? 'default' : 'destructive'}
                              className="mt-1 text-xs"
                            >
                              {doc.status}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          {doc.status === 'مرفوع' ? 'عرض' : 'رفع'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}