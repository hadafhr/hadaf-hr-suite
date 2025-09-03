import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Briefcase, 
  DollarSign, 
  Upload,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

const AddEmployee: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    nationalId: '',
    nationality: 'سعودي',
    maritalStatus: 'أعزب',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    
    // Job Info
    position: '',
    department: '',
    level: 'Junior',
    manager: '',
    startDate: '',
    contractType: 'دائم',
    workLocation: '',
    
    // Financial Info
    basicSalary: '',
    housingAllowance: '',
    transportAllowance: '',
    bankName: '',
    accountNumber: '',
    iban: '',
    
    // Documents
    contract: null,
    nationalIdCopy: null,
    certificates: null,
    photo: null
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    toast({
      title: "تم إنشاء الموظف بنجاح",
      description: "تم إضافة الموظف الجديد إلى النظام برقم EMP-2024-003",
    });
    
    // Reset form
    setFormData({
      fullName: '', nationalId: '', nationality: 'سعودي', maritalStatus: 'أعزب',
      email: '', phone: '', address: '', birthDate: '', position: '', department: '',
      level: 'Junior', manager: '', startDate: '', contractType: 'دائم', workLocation: '',
      basicSalary: '', housingAllowance: '', transportAllowance: '', bankName: '',
      accountNumber: '', iban: '', contract: null, nationalIdCopy: null, certificates: null, photo: null
    });
    setCurrentStep(1);
  };

  const steps = [
    { number: 1, title: 'البيانات الشخصية', icon: User },
    { number: 2, title: 'معلومات الوظيفة', icon: Briefcase },
    { number: 3, title: 'البيانات المالية', icon: DollarSign },
    { number: 4, title: 'المستندات', icon: Upload }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-background text-muted-foreground border-border'
          }`}>
            {currentStep > step.number ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <step.icon className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.number ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          البيانات الشخصية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">الاسم الكامل *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              placeholder="أدخل الاسم الكامل"
            />
          </div>
          <div>
            <Label htmlFor="nationalId">رقم الهوية / الإقامة *</Label>
            <Input
              id="nationalId"
              value={formData.nationalId}
              onChange={(e) => updateFormData('nationalId', e.target.value)}
              placeholder="أدخل رقم الهوية"
            />
          </div>
          <div>
            <Label htmlFor="nationality">الجنسية *</Label>
            <Select value={formData.nationality} onValueChange={(value) => updateFormData('nationality', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="سعودي">سعودي</SelectItem>
                <SelectItem value="مصري">مصري</SelectItem>
                <SelectItem value="أردني">أردني</SelectItem>
                <SelectItem value="سوري">سوري</SelectItem>
                <SelectItem value="لبناني">لبناني</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maritalStatus">الحالة الاجتماعية</Label>
            <Select value={formData.maritalStatus} onValueChange={(value) => updateFormData('maritalStatus', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="أعزب">أعزب</SelectItem>
                <SelectItem value="متزوج">متزوج</SelectItem>
                <SelectItem value="مطلق">مطلق</SelectItem>
                <SelectItem value="أرمل">أرمل</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="birthDate">تاريخ الميلاد</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => updateFormData('birthDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="example@company.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">رقم الهاتف *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="+966501234567"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">العنوان</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder="أدخل العنوان الكامل"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderJobInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          معلومات الوظيفة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="position">المسمى الوظيفي *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => updateFormData('position', e.target.value)}
              placeholder="أدخل المسمى الوظيفي"
            />
          </div>
          <div>
            <Label htmlFor="department">القسم *</Label>
            <Select value={formData.department} onValueChange={(value) => updateFormData('department', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">تقنية المعلومات</SelectItem>
                <SelectItem value="HR">الموارد البشرية</SelectItem>
                <SelectItem value="Finance">المالية</SelectItem>
                <SelectItem value="Marketing">التسويق</SelectItem>
                <SelectItem value="Operations">العمليات</SelectItem>
                <SelectItem value="Sales">المبيعات</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="level">المستوى الوظيفي</Label>
            <Select value={formData.level} onValueChange={(value) => updateFormData('level', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Junior">مبتدئ</SelectItem>
                <SelectItem value="Mid">متوسط</SelectItem>
                <SelectItem value="Senior">أول</SelectItem>
                <SelectItem value="Lead">قائد فريق</SelectItem>
                <SelectItem value="Manager">مدير</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="manager">المدير المباشر</Label>
            <Input
              id="manager"
              value={formData.manager}
              onChange={(e) => updateFormData('manager', e.target.value)}
              placeholder="أدخل اسم المدير المباشر"
            />
          </div>
          <div>
            <Label htmlFor="startDate">تاريخ بداية العمل *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => updateFormData('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contractType">نوع العقد</Label>
            <Select value={formData.contractType} onValueChange={(value) => updateFormData('contractType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="دائم">دائم</SelectItem>
                <SelectItem value="مؤقت">مؤقت</SelectItem>
                <SelectItem value="تدريبي">تدريبي</SelectItem>
                <SelectItem value="استشاري">استشاري</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="workLocation">مكان العمل</Label>
            <Input
              id="workLocation"
              value={formData.workLocation}
              onChange={(e) => updateFormData('workLocation', e.target.value)}
              placeholder="أدخل مكان العمل"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderFinancialInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          البيانات المالية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="basicSalary">الراتب الأساسي *</Label>
            <Input
              id="basicSalary"
              type="number"
              value={formData.basicSalary}
              onChange={(e) => updateFormData('basicSalary', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="housingAllowance">بدل السكن</Label>
            <Input
              id="housingAllowance"
              type="number"
              value={formData.housingAllowance}
              onChange={(e) => updateFormData('housingAllowance', e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="transportAllowance">بدل النقل</Label>
            <Input
              id="transportAllowance"
              type="number"
              value={formData.transportAllowance}
              onChange={(e) => updateFormData('transportAllowance', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold mb-4">معلومات البنك</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">اسم البنك</Label>
              <Select value={formData.bankName} onValueChange={(value) => updateFormData('bankName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر البنك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الأهلي">البنك الأهلي السعودي</SelectItem>
                  <SelectItem value="الراجحي">بنك الراجحي</SelectItem>
                  <SelectItem value="ساب">البنك السعودي البريطاني</SelectItem>
                  <SelectItem value="سامبا">بنك سامبا</SelectItem>
                  <SelectItem value="الرياض">بنك الرياض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountNumber">رقم الحساب</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => updateFormData('accountNumber', e.target.value)}
                placeholder="أدخل رقم الحساب"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="iban">رقم الآيبان</Label>
              <Input
                id="iban"
                value={formData.iban}
                onChange={(e) => updateFormData('iban', e.target.value)}
                placeholder="SA1234567890123456789012"
              />
            </div>
          </div>
        </div>

        {formData.basicSalary && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">ملخص الراتب الشهري</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>الراتب الأساسي:</span>
                  <span>{Number(formData.basicSalary).toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>بدل السكن:</span>
                  <span>{Number(formData.housingAllowance || 0).toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>بدل النقل:</span>
                  <span>{Number(formData.transportAllowance || 0).toLocaleString()} ريال</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>إجمالي الراتب:</span>
                  <span>
                    {(Number(formData.basicSalary) + Number(formData.housingAllowance || 0) + Number(formData.transportAllowance || 0)).toLocaleString()} ريال
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );

  const renderDocuments = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          المستندات المطلوبة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>العقد الوظيفي *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملف هنا أو انقر للاختيار</p>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </div>
            </div>
            
            <div>
              <Label>صورة الهوية / الإقامة *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملف هنا أو انقر للاختيار</p>
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>الشهادات العلمية</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملف هنا أو انقر للاختيار</p>
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
            
            <div>
              <Label>الصورة الشخصية</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملف هنا أو انقر للاختيار</p>
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">ملاحظات هامة:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• يجب أن تكون جميع المستندات واضحة ومقروءة</li>
            <li>• الحد الأقصى لحجم الملف 5 ميجابايت</li>
            <li>• الصيغ المدعومة: PDF, JPG, PNG, DOC, DOCX</li>
            <li>• المستندات المطلوبة (*) إجبارية لإتمام التسجيل</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderStepIndicator()}
      
      {currentStep === 1 && renderPersonalInfo()}
      {currentStep === 2 && renderJobInfo()}
      {currentStep === 3 && renderFinancialInfo()}
      {currentStep === 4 && renderDocuments()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          السابق
        </Button>
        
        {currentStep < 4 ? (
          <Button onClick={handleNext}>
            التالي
            <ArrowRight className="h-4 w-4 mr-2" />
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 ml-2" />
            حفظ الموظف
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;