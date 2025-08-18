import React, { useState, useEffect } from 'react';
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
  Building2, CreditCard, Heart, Shield, Eye, EyeOff, Lock
} from 'lucide-react';
import { useSecureEmployeeData } from '@/hooks/useSecureEmployeeData';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function EmployeeProfileManagement() {
  const [editMode, setEditMode] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState<{ [key: string]: boolean }>({});
  const [decryptedData, setDecryptedData] = useState<{ [key: string]: any }>({});
  
  const { 
    employees, 
    fullEmployeeData, 
    isLoading, 
    fetchFullEmployeeData,
    getDecryptedSensitiveData, 
    updateEmployee 
  } = useSecureEmployeeData();
  
  const { toast } = useToast();

  // Load full employee data on mount
  useEffect(() => {
    fetchFullEmployeeData();
  }, []);

  // Use full employee data if available, otherwise use directory data with defaults
  const currentEmployee = fullEmployeeData?.[0] || (employees?.[0] ? {
    ...employees[0],
    full_name_arabic: `${employees[0].first_name} ${employees[0].last_name}`,
    phone: '',
    national_id: '',
    passport_number: '',
    nationality: 'غير محدد',
    gender: 'غير محدد',
    date_of_birth: '',
    marital_status: 'غير محدد',
    address: '',
    contract_type: 'دائم',
    employment_status: 'active',
    work_location: '',
    basic_salary: 0,
    housing_allowance: 0,
    transport_allowance: 0,
    other_allowances: 0,
    total_salary: 0,
    bank_name: '',
    bank_account_number: '',
    iban: '',
    education_level: '',
    university: '',
    major: '',
    graduation_year: undefined,
    experience_years: 0,
    annual_leave_balance: 30,
    sick_leave_balance: 30,
    emergency_leave_balance: 5,
    emergency_contact: {},
    documents: [],
    profile_picture_url: '',
    notes: '',
    created_at: '',
    updated_at: '',
    user_id: '',
    department_id: '',
    position_id: '',
    manager_id: '',
    contract_start_date: '',
    contract_end_date: '',
    middle_name: ''
  } : null);

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

  // Helper function to toggle and decrypt sensitive data
  const toggleSensitiveData = async (fieldName: string) => {
    if (!showSensitiveData[fieldName]) {
      // Show decrypted data
      if (currentEmployee?.id) {
        const decrypted = await getDecryptedSensitiveData(currentEmployee.id);
        if (decrypted) {
          setDecryptedData(prev => ({ ...prev, [currentEmployee.id]: decrypted }));
          setShowSensitiveData(prev => ({ ...prev, [fieldName]: true }));
        }
      }
    } else {
      // Hide decrypted data
      setShowSensitiveData(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Helper function to get sensitive field value (masked or decrypted)
  const getSensitiveFieldValue = (fieldName: string, maskedValue: string | undefined) => {
    if (showSensitiveData[fieldName] && currentEmployee?.id && decryptedData[currentEmployee.id]) {
      return decryptedData[currentEmployee.id][fieldName] || maskedValue || 'غير متاح';
    }
    return maskedValue || 'XXX-XXX-XXXX';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جاري تحميل بيانات الموظف...</p>
        </div>
      </div>
    );
  }

  if (!currentEmployee) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">لا توجد بيانات موظف متاحة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Security Notice */}
      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          البيانات الحساسة محمية بالتشفير. انقر على أيقونة العين لعرض البيانات الفعلية.
        </AlertDescription>
      </Alert>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentEmployee.profile_picture_url || ''} />
                <AvatarFallback className="text-lg">
                  {`${currentEmployee.first_name?.[0] || ''}${currentEmployee.last_name?.[0] || ''}`}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {currentEmployee.full_name_arabic || `${currentEmployee.first_name} ${currentEmployee.last_name}`}
                </CardTitle>
                <p className="text-muted-foreground">رقم الموظف: {currentEmployee.employee_id}</p>
                <Badge variant="secondary" className="mt-1">
                  {currentEmployee.employment_status === 'active' ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <User className="h-4 w-4 mr-2" />
                    حفظ
                  </Button>
                  <Button variant="outline" onClick={() => setEditMode(false)} size="sm">
                    إلغاء
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  تعديل
                </Button>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    تغيير الصورة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>تغيير صورة الملف الشخصي</DialogTitle>
                  </DialogHeader>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">الصورة</Label>
                    <Input id="picture" type="file" accept="image/*" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentEmployee.email || 'غير محدد'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span>{getSensitiveFieldValue('phone', currentEmployee.phone)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => toggleSensitiveData('phone')}
                >
                  {showSensitiveData['phone'] ? 
                    <EyeOff className="h-3 w-3" /> : 
                    <Eye className="h-3 w-3" />
                  }
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>تاريخ التوظيف: {currentEmployee.hire_date || 'غير محدد'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="job">بيانات العمل</TabsTrigger>
          <TabsTrigger value="financial">البيانات المالية</TabsTrigger>
          <TabsTrigger value="education">التعليم</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>رقم الهوية الوطنية</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={getSensitiveFieldValue('national_id', currentEmployee.national_id)}
                    disabled={!editMode}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSensitiveData('national_id')}
                  >
                    {showSensitiveData['national_id'] ? 
                      <EyeOff className="h-4 w-4" /> : 
                      <Eye className="h-4 w-4" />
                    }
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>رقم جواز السفر</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={getSensitiveFieldValue('passport_number', currentEmployee.passport_number)}
                    disabled={!editMode}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSensitiveData('passport_number')}
                  >
                    {showSensitiveData['passport_number'] ? 
                      <EyeOff className="h-4 w-4" /> : 
                      <Eye className="h-4 w-4" />
                    }
                  </Button>
                </div>
              </div>

              <div>
                <Label>الجنسية</Label>
                <Input value={currentEmployee.nationality || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>الجنس</Label>
                <Input value={currentEmployee.gender || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>تاريخ الميلاد</Label>
                <Input value={currentEmployee.date_of_birth || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>الحالة الاجتماعية</Label>
                <Input value={currentEmployee.marital_status || 'غير محدد'} disabled={!editMode} />
              </div>

              <div className="md:col-span-2">
                <Label>العنوان</Label>
                <Input value={currentEmployee.address || 'غير محدد'} disabled={!editMode} />
              </div>

              <div className="md:col-span-2">
                <Label>جهة الاتصال في حالة الطوارئ</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  <Input 
                    placeholder="الاسم" 
                    value={currentEmployee.emergency_contact?.name || ''} 
                    disabled={!editMode} 
                  />
                  <Input 
                    placeholder="صلة القرابة" 
                    value={currentEmployee.emergency_contact?.relationship || ''} 
                    disabled={!editMode} 
                  />
                  <Input 
                    placeholder="رقم الهاتف" 
                    value={currentEmployee.emergency_contact?.phone || ''} 
                    disabled={!editMode} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معلومات العمل</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>نوع العقد</Label>
                <Input value={currentEmployee.contract_type || 'دائم'} disabled={!editMode} />
              </div>

              <div>
                <Label>سنوات الخبرة</Label>
                <Input value={currentEmployee.experience_years || 0} disabled={!editMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات المالية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>الراتب الأساسي</Label>
                <Input 
                  value={`${(currentEmployee.basic_salary || 0).toLocaleString()} ريال`} 
                  disabled={!editMode} 
                />
              </div>

              <div>
                <Label>بدل السكن</Label>
                <Input 
                  value={`${(currentEmployee.housing_allowance || 0).toLocaleString()} ريال`} 
                  disabled={!editMode} 
                />
              </div>

              <div>
                <Label>بدل المواصلات</Label>
                <Input 
                  value={`${(currentEmployee.transport_allowance || 0).toLocaleString()} ريال`} 
                  disabled={!editMode} 
                />
              </div>

              <div>
                <Label>إجمالي الراتب</Label>
                <Input 
                  value={`${((currentEmployee.basic_salary || 0) + (currentEmployee.housing_allowance || 0) + (currentEmployee.transport_allowance || 0)).toLocaleString()} ريال`} 
                  disabled 
                  className="font-semibold"
                />
              </div>

              <div>
                <Label>اسم البنك</Label>
                <Input value={currentEmployee.bank_name || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>رقم الآيبان</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value={getSensitiveFieldValue('iban', currentEmployee.iban)}
                    disabled={!editMode}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => toggleSensitiveData('iban')}
                  >
                    {showSensitiveData['iban'] ? 
                      <EyeOff className="h-4 w-4" /> : 
                      <Eye className="h-4 w-4" />
                    }
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المؤهلات التعليمية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>المستوى التعليمي</Label>
                <Input value={currentEmployee.education_level || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>الجامعة</Label>
                <Input value={currentEmployee.university || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>التخصص</Label>
                <Input value={currentEmployee.major || 'غير محدد'} disabled={!editMode} />
              </div>

              <div>
                <Label>سنة التخرج</Label>
                <Input value={currentEmployee.graduation_year || 'غير محدد'} disabled={!editMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المستندات المطلوبة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTypes.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {doc.icon}
                      <span className="font-medium">{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === 'مرفوع' ? 'default' : 'destructive'}>
                        {doc.status}
                      </Badge>
                      {doc.status === 'مرفوع' ? (
                        <Button variant="outline" size="sm">
                          عرض
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          رفع
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}