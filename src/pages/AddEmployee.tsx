import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Save, X, Upload, User, Mail, Phone, Building2, Calendar, MapPin, FileText, Award, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // البيانات الشخصية
    name: '',
    nameEn: '',
    email: '',
    phone: '',
    nationalId: '',
    birthDate: '',
    nationality: '',
    address: '',
    
    // بيانات العمل
    employeeId: '',
    position: '',
    department: '',
    manager: '',
    joinDate: '',
    workLocation: '',
    workType: 'full-time',
    
    // الراتب والمزايا
    salary: '',
    currency: 'SAR',
    allowances: '',
    insurance: false,
    
    // المؤهلات والمهارات
    education: '',
    experience: '',
    skills: '',
    certifications: '',
    
    // معلومات إضافية
    emergencyContact: '',
    emergencyPhone: '',
    notes: ''
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // معالجة البيانات وحفظ الموظف الجديد
    console.log('Employee data:', formData);
    alert('تم إضافة الموظف بنجاح!');
    navigate('/comprehensive-employee-management');
  };

  const handleCancel = () => {
    navigate('/comprehensive-employee-management');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              العودة
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">إضافة موظف جديد</h1>
            <p className="text-slate-600">قم بإدخال بيانات الموظف الجديد بعناية</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* صورة الملف الشخصي */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                الصورة الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-slate-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('profile-image')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    رفع الصورة
                  </Button>
                  <p className="text-sm text-slate-600 mt-2">JPG أو PNG، أقل من 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* البيانات الشخصية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                البيانات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل بالعربية *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="أدخل الاسم الكامل"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nameEn">الاسم بالإنجليزية</Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={(e) => handleInputChange('nameEn', e.target.value)}
                    placeholder="Full Name in English"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="employee@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966501234567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nationalId">رقم الهوية الوطنية</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">الجنسية</Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجنسية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saudi">السعودية</SelectItem>
                      <SelectItem value="egyptian">المصرية</SelectItem>
                      <SelectItem value="jordanian">الأردنية</SelectItem>
                      <SelectItem value="lebanese">اللبنانية</SelectItem>
                      <SelectItem value="syrian">السورية</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">العنوان</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="العنوان الكامل"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* بيانات العمل */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                بيانات العمل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">رقم الموظف *</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="EMP001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">المنصب *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="مطور برامج"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">القسم *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">تقنية المعلومات</SelectItem>
                      <SelectItem value="hr">الموارد البشرية</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                      <SelectItem value="marketing">التسويق</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                      <SelectItem value="operations">العمليات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="manager">المدير المباشر</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    placeholder="اسم المدير المباشر"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="joinDate">تاريخ التوظيف *</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="workLocation">مكان العمل</Label>
                  <Input
                    id="workLocation"
                    value={formData.workLocation}
                    onChange={(e) => handleInputChange('workLocation', e.target.value)}
                    placeholder="المكتب الرئيسي"
                  />
                </div>
                <div>
                  <Label htmlFor="workType">نوع العمل</Label>
                  <Select value={formData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">دوام كامل</SelectItem>
                      <SelectItem value="part-time">دوام جزئي</SelectItem>
                      <SelectItem value="contract">عقد مؤقت</SelectItem>
                      <SelectItem value="remote">عمل عن بُعد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الراتب والمزايا */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                الراتب والمزايا
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salary">الراتب الأساسي *</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="10000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currency">العملة</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي</SelectItem>
                      <SelectItem value="USD">دولار أمريكي</SelectItem>
                      <SelectItem value="EUR">يورو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="allowances">البدلات الشهرية</Label>
                  <Input
                    id="allowances"
                    type="number"
                    value={formData.allowances}
                    onChange={(e) => handleInputChange('allowances', e.target.value)}
                    placeholder="1000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* المؤهلات والمهارات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                المؤهلات والمهارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education">المؤهل العلمي</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="بكالوريوس علوم الحاسب"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">سنوات الخبرة</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="5 سنوات"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skills">المهارات</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="React, TypeScript, Node.js, Python..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="certifications">الشهادات المهنية</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                  placeholder="AWS Certified, PMP, Google Analytics..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* جهة الاتصال في حالة الطوارئ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                جهة الاتصال في حالة الطوارئ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact">اسم جهة الاتصال</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="أحمد محمد"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">رقم الهاتف</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="+966501234567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ملاحظات إضافية */}
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="أي ملاحظات إضافية حول الموظف..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* أزرار الحفظ والإلغاء */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              إلغاء
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              حفظ الموظف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;