import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Mail, Phone, MapPin, Calendar, Building, Upload, 
  Save, RefreshCw, FileText, DollarSign, Heart, Camera, 
  IdCard, GraduationCap, Users
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AddNewEmployee = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [employeeData, setEmployeeData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    birthDate: '',
    nationality: '',
    idNumber: '',
    address: '',
    gender: '',
    maritalStatus: '',
    
    // Professional Information
    position: '',
    department: '',
    employmentType: '',
    startDate: '',
    reportingManager: '',
    workLocation: '',
    
    // Financial Information
    basicSalary: '',
    currency: 'SAR',
    bankAccount: '',
    bankName: '',
    taxNumber: '',
    
    // Emergency Contacts
    emergencyContacts: [
      { name: '', phone: '', relation: '', email: '' },
      { name: '', phone: '', relation: '', email: '' }
    ]
  });

  const [generatedEmployeeId, setGeneratedEmployeeId] = useState('');

  const generateEmployeeId = () => {
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const id = `EMP${currentYear}${randomNumber.toString().padStart(4, '0')}`;
    setGeneratedEmployeeId(id);
    
    toast({
      title: isRTL ? "تم إنشاء الرقم الوظيفي" : "Employee ID Generated",
      description: isRTL ? `الرقم الوظيفي: ${id}` : `Employee ID: ${id}`,
    });
  };

  const departments = [
    { value: 'it', label: isRTL ? 'تقنية المعلومات' : 'Information Technology' },
    { value: 'hr', label: isRTL ? 'الموارد البشرية' : 'Human Resources' },
    { value: 'finance', label: isRTL ? 'المالية' : 'Finance' },
    { value: 'marketing', label: isRTL ? 'التسويق' : 'Marketing' },
    { value: 'sales', label: isRTL ? 'المبيعات' : 'Sales' },
    { value: 'operations', label: isRTL ? 'العمليات' : 'Operations' }
  ];

  const positions = [
    { value: 'senior_dev', label: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer' },
    { value: 'project_manager', label: isRTL ? 'مدير مشروع' : 'Project Manager' },
    { value: 'hr_specialist', label: isRTL ? 'أخصائي موارد بشرية' : 'HR Specialist' },
    { value: 'accountant', label: isRTL ? 'محاسب' : 'Accountant' },
    { value: 'marketing_manager', label: isRTL ? 'مدير تسويق' : 'Marketing Manager' }
  ];

  const employmentTypes = [
    { value: 'full-time', label: isRTL ? 'دوام كامل' : 'Full Time' },
    { value: 'part-time', label: isRTL ? 'دوام جزئي' : 'Part Time' },
    { value: 'contract', label: isRTL ? 'عقد' : 'Contract' },
    { value: 'intern', label: isRTL ? 'متدرب' : 'Intern' }
  ];

  const relationTypes = [
    { value: 'spouse', label: isRTL ? 'زوج/زوجة' : 'Spouse' },
    { value: 'father', label: isRTL ? 'والد' : 'Father' },
    { value: 'mother', label: isRTL ? 'والدة' : 'Mother' },
    { value: 'brother', label: isRTL ? 'أخ' : 'Brother' },
    { value: 'sister', label: isRTL ? 'أخت' : 'Sister' },
    { value: 'friend', label: isRTL ? 'صديق' : 'Friend' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    setEmployeeData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const handleSubmit = () => {
    if (!generatedEmployeeId) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى إنشاء رقم وظيفي أولاً" : "Please generate an employee ID first",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!employeeData.firstName || !employeeData.lastName || !employeeData.email) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء الحقول المطلوبة" : "Please fill in the required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isRTL ? "تم حفظ البيانات" : "Employee Data Saved",
      description: isRTL ? `تم إضافة الموظف ${employeeData.firstName} ${employeeData.lastName} بنجاح` : `Employee ${employeeData.firstName} ${employeeData.lastName} added successfully`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
        </h2>
        <p className="text-gray-600">
          {isRTL ? 'إضافة موظف جديد للنظام مع جميع البيانات المطلوبة' : 'Add a new employee to the system with all required information'}
        </p>
      </div>

      {/* Employee ID Generation */}
      <Card className="shadow-lg border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isRTL ? 'الرقم الوظيفي' : 'Employee ID'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isRTL ? 'قم بإنشاء رقم وظيفي فريد للموظف الجديد' : 'Generate a unique employee ID for the new employee'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {generatedEmployeeId && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">{isRTL ? 'الرقم المُنشأ:' : 'Generated ID:'}</p>
                  <p className="text-2xl font-bold text-primary">{generatedEmployeeId}</p>
                </div>
              )}
              <Button onClick={generateEmployeeId} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                {isRTL ? 'إنشاء رقم' : 'Generate ID'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Form */}
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {isRTL ? 'البيانات الشخصية' : 'Personal Information'}
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {isRTL ? 'البيانات الوظيفية' : 'Professional Information'}
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {isRTL ? 'البيانات المالية' : 'Financial Information'}
              </TabsTrigger>
              <TabsTrigger value="emergency" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {isRTL ? 'جهات الاتصال الطارئة' : 'Emergency Contacts'}
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="p-6">
              <div className="space-y-6">
                {/* Profile Photo Section */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">
                        {employeeData.firstName[0]}{employeeData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {isRTL ? 'انقر لرفع صورة شخصية' : 'Click to upload profile photo'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'الاسم الأول *' : 'First Name *'}
                      </Label>
                      <Input
                        placeholder={isRTL ? 'أدخل الاسم الأول' : 'Enter first name'}
                        value={employeeData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}
                      </Label>
                      <Input
                        type="email"
                        placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
                        value={employeeData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                      </Label>
                      <Input
                        placeholder="+966501234567"
                        value={employeeData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'تاريخ الميلاد' : 'Birth Date'}
                      </Label>
                      <Input
                        type="date"
                        value={employeeData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'رقم الهوية' : 'ID Number'}
                      </Label>
                      <Input
                        placeholder={isRTL ? 'أدخل رقم الهوية' : 'Enter ID number'}
                        value={employeeData.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'اسم العائلة *' : 'Last Name *'}
                      </Label>
                      <Input
                        placeholder={isRTL ? 'أدخل اسم العائلة' : 'Enter last name'}
                        value={employeeData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'رقم الجوال' : 'Mobile Number'}
                      </Label>
                      <Input
                        placeholder="+966551234567"
                        value={employeeData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'الجنسية' : 'Nationality'}
                      </Label>
                      <Select value={employeeData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={isRTL ? 'اختر الجنسية' : 'Select nationality'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saudi">{isRTL ? 'سعودي' : 'Saudi Arabian'}</SelectItem>
                          <SelectItem value="egyptian">{isRTL ? 'مصري' : 'Egyptian'}</SelectItem>
                          <SelectItem value="jordanian">{isRTL ? 'أردني' : 'Jordanian'}</SelectItem>
                          <SelectItem value="lebanese">{isRTL ? 'لبناني' : 'Lebanese'}</SelectItem>
                          <SelectItem value="other">{isRTL ? 'أخرى' : 'Other'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'الجنس' : 'Gender'}
                      </Label>
                      <Select value={employeeData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={isRTL ? 'اختر الجنس' : 'Select gender'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{isRTL ? 'ذكر' : 'Male'}</SelectItem>
                          <SelectItem value="female">{isRTL ? 'أنثى' : 'Female'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        {isRTL ? 'الحالة الاجتماعية' : 'Marital Status'}
                      </Label>
                      <Select value={employeeData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={isRTL ? 'اختر الحالة الاجتماعية' : 'Select marital status'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">{isRTL ? 'أعزب' : 'Single'}</SelectItem>
                          <SelectItem value="married">{isRTL ? 'متزوج' : 'Married'}</SelectItem>
                          <SelectItem value="divorced">{isRTL ? 'مطلق' : 'Divorced'}</SelectItem>
                          <SelectItem value="widowed">{isRTL ? 'أرمل' : 'Widowed'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    {isRTL ? 'العنوان' : 'Address'}
                  </Label>
                  <Textarea
                    placeholder={isRTL ? 'أدخل العنوان الكامل' : 'Enter full address'}
                    value={employeeData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent value="professional" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'المسمى الوظيفي *' : 'Job Title *'}
                    </Label>
                    <Select value={employeeData.position} onValueChange={(value) => handleInputChange('position', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={isRTL ? 'اختر المسمى الوظيفي' : 'Select job title'} />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position) => (
                          <SelectItem key={position.value} value={position.value}>
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'نوع التوظيف' : 'Employment Type'}
                    </Label>
                    <Select value={employeeData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={isRTL ? 'اختر نوع التوظيف' : 'Select employment type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'المدير المباشر' : 'Reporting Manager'}
                    </Label>
                    <Input
                      placeholder={isRTL ? 'أدخل اسم المدير المباشر' : 'Enter reporting manager name'}
                      value={employeeData.reportingManager}
                      onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'القسم *' : 'Department *'}
                    </Label>
                    <Select value={employeeData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={isRTL ? 'اختر القسم' : 'Select department'} />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'تاريخ بداية العمل *' : 'Start Date *'}
                    </Label>
                    <Input
                      type="date"
                      value={employeeData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'مكان العمل' : 'Work Location'}
                    </Label>
                    <Input
                      placeholder={isRTL ? 'أدخل مكان العمل' : 'Enter work location'}
                      value={employeeData.workLocation}
                      onChange={(e) => handleInputChange('workLocation', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Financial Information Tab */}
            <TabsContent value="financial" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'الراتب الأساسي' : 'Basic Salary'}
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder="15000"
                        value={employeeData.basicSalary}
                        onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                        className="flex-1"
                      />
                      <Select value={employeeData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAR">SAR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'رقم الحساب البنكي' : 'Bank Account Number'}
                    </Label>
                    <Input
                      placeholder="1234567890"
                      value={employeeData.bankAccount}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'اسم البنك' : 'Bank Name'}
                    </Label>
                    <Input
                      placeholder={isRTL ? 'أدخل اسم البنك' : 'Enter bank name'}
                      value={employeeData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {isRTL ? 'الرقم الضريبي' : 'Tax Number'}
                    </Label>
                    <Input
                      placeholder={isRTL ? 'أدخل الرقم الضريبي' : 'Enter tax number'}
                      value={employeeData.taxNumber}
                      onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Emergency Contacts Tab */}
            <TabsContent value="emergency" className="p-6">
              <div className="space-y-6">
                <p className="text-gray-600">
                  {isRTL ? 'أضف جهات الاتصال في حالات الطوارئ (يُفضل شخصان على الأقل)' : 'Add emergency contacts (at least two contacts recommended)'}
                </p>

                {employeeData.emergencyContacts.map((contact, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {isRTL ? `جهة الاتصال ${index + 1}` : `Emergency Contact ${index + 1}`}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          {isRTL ? 'الاسم الكامل' : 'Full Name'}
                        </Label>
                        <Input
                          placeholder={isRTL ? 'أدخل الاسم الكامل' : 'Enter full name'}
                          value={contact.name}
                          onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                        </Label>
                        <Input
                          placeholder="+966501234567"
                          value={contact.phone}
                          onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          {isRTL ? 'صلة القرابة' : 'Relationship'}
                        </Label>
                        <Select 
                          value={contact.relation} 
                          onValueChange={(value) => handleEmergencyContactChange(index, 'relation', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={isRTL ? 'اختر صلة القرابة' : 'Select relationship'} />
                          </SelectTrigger>
                          <SelectContent>
                            {relationTypes.map((relation) => (
                              <SelectItem key={relation.value} value={relation.value}>
                                {relation.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                        </Label>
                        <Input
                          type="email"
                          placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
                          value={contact.email}
                          onChange={(e) => handleEmergencyContactChange(index, 'email', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="lg">
          {isRTL ? 'إلغاء' : 'Cancel'}
        </Button>
        <Button onClick={handleSubmit} size="lg" className="min-w-32">
          <Save className="h-4 w-4 mr-2" />
          {isRTL ? 'حفظ الموظف' : 'Save Employee'}
        </Button>
      </div>
    </div>
  );
};

export default AddNewEmployee;