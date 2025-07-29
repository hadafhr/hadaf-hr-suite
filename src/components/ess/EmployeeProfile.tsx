import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  CreditCard,
  Shield,
  Upload,
  Edit,
  Save,
  X,
  Camera,
  FileText,
  Download,
  Eye
} from 'lucide-react';

interface EmployeeData {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  salary: number;
  joinDate: string;
  manager: string;
}

interface EmployeeProfileProps {
  employeeData: EmployeeData;
  language: 'ar' | 'en';
}

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employeeData, language }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(employeeData);

  const personalInfo = [
    {
      label: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
      value: profileData.name,
      icon: <User className="h-4 w-4" />,
      editable: true,
      key: 'name'
    },
    {
      label: language === 'ar' ? 'الرقم الوظيفي' : 'Employee ID',
      value: profileData.employeeId,
      icon: <CreditCard className="h-4 w-4" />,
      editable: false,
      key: 'employeeId'
    },
    {
      label: language === 'ar' ? 'المسمى الوظيفي' : 'Job Title',
      value: profileData.position,
      icon: <Building className="h-4 w-4" />,
      editable: false,
      key: 'position'
    },
    {
      label: language === 'ar' ? 'القسم' : 'Department',
      value: profileData.department,
      icon: <Building className="h-4 w-4" />,
      editable: false,
      key: 'department'
    },
    {
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: profileData.email,
      icon: <Mail className="h-4 w-4" />,
      editable: true,
      key: 'email'
    },
    {
      label: language === 'ar' ? 'رقم الجوال' : 'Phone Number',
      value: profileData.phone,
      icon: <Phone className="h-4 w-4" />,
      editable: true,
      key: 'phone'
    },
    {
      label: language === 'ar' ? 'تاريخ الالتحاق' : 'Join Date',
      value: profileData.joinDate,
      icon: <Calendar className="h-4 w-4" />,
      editable: false,
      key: 'joinDate'
    },
    {
      label: language === 'ar' ? 'المدير المباشر' : 'Direct Manager',
      value: profileData.manager,
      icon: <User className="h-4 w-4" />,
      editable: false,
      key: 'manager'
    }
  ];

  const documents = [
    {
      id: 1,
      name: language === 'ar' ? 'صورة الهوية الوطنية' : 'National ID Copy',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'verified'
    },
    {
      id: 2,
      name: language === 'ar' ? 'شهادة التأمين الطبي' : 'Medical Insurance Certificate',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2024-01-20',
      status: 'verified'
    },
    {
      id: 3,
      name: language === 'ar' ? 'عقد العمل' : 'Employment Contract',
      type: 'PDF',
      size: '3.1 MB',
      uploadDate: '2024-01-15',
      status: 'verified'
    },
    {
      id: 4,
      name: language === 'ar' ? 'الشهادات الأكاديمية' : 'Academic Certificates',
      type: 'PDF',
      size: '4.8 MB',
      uploadDate: '2024-01-18',
      status: 'pending'
    }
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(employeeData);
    setIsEditing(false);
  };

  const handleInputChange = (key: string, value: string) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            {language === 'ar' ? 'الملف الشخصي' : 'Employee Profile'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'إدارة البيانات الشخصية والمستندات الرسمية' 
              : 'Manage personal information and official documents'
            }
          </p>
        </div>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="btn-primary">
            <Edit className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تعديل البيانات' : 'Edit Profile'}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">
            {language === 'ar' ? 'البيانات الشخصية' : 'Personal Info'}
          </TabsTrigger>
          <TabsTrigger value="documents">
            {language === 'ar' ? 'المستندات' : 'Documents'}
          </TabsTrigger>
          <TabsTrigger value="financial">
            {language === 'ar' ? 'البيانات المالية' : 'Financial Info'}
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ')[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.position}</p>
                  <Badge variant="outline" className="mt-2">
                    {language === 'ar' ? 'موظف نشط' : 'Active Employee'}
                  </Badge>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-3 w-3 mr-2" />
                    {language === 'ar' ? 'تحديث الصورة' : 'Update Photo'}
                  </Button>
                )}
              </div>
            </Card>

            {/* Personal Details */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">
                  {language === 'ar' ? 'البيانات الأساسية' : 'Basic Information'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {personalInfo.map((info) => (
                    <div key={info.key} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        {info.icon}
                        {info.label}
                      </Label>
                      {isEditing && info.editable ? (
                        <Input
                          value={info.value}
                          onChange={(e) => handleInputChange(info.key, e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <div className="p-2 bg-muted/30 rounded-md">
                          {info.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {language === 'ar' ? 'المستندات الرسمية' : 'Official Documents'}
            </h3>
            <Button className="btn-primary">
              <Upload className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'رفع مستند' : 'Upload Document'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FileText className="h-8 w-8 text-primary" />
                    <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'}>
                      {doc.status === 'verified' 
                        ? (language === 'ar' ? 'محقق' : 'Verified')
                        : (language === 'ar' ? 'قيد المراجعة' : 'Pending')
                      }
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {doc.type} • {doc.size}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'رُفع في:' : 'Uploaded:'} {doc.uploadDate}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'عرض' : 'View'}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'تحميل' : 'Download'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Financial Information */}
        <TabsContent value="financial" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'البيانات المالية المحمية' : 'Protected Financial Information'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}
                    </span>
                    <span className="font-bold text-lg">
                      {profileData.salary.toLocaleString()} {language === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'بدل السكن' : 'Housing Allowance'}
                    </span>
                    <span className="font-bold text-lg">
                      3,000 {language === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'بدل المواصلات' : 'Transportation Allowance'}
                    </span>
                    <span className="font-bold text-lg">
                      1,500 {language === 'ar' ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'التأمين الطبي' : 'Medical Insurance'}
                    </span>
                    <Badge variant="default">
                      {language === 'ar' ? 'نشط' : 'Active'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'GOSI - التأمينات الاجتماعية' : 'GOSI Contribution'}
                    </span>
                    <Badge variant="default">
                      {language === 'ar' ? 'مشترك' : 'Enrolled'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'رقم حساب البنك' : 'Bank Account'}
                    </span>
                    <span className="font-mono">
                      ****-****-****-1234
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                {language === 'ar' 
                  ? 'البيانات المالية محمية ومشفرة وفقاً لمعايير الأمان المصرفية'
                  : 'Financial data is protected and encrypted according to banking security standards'
                }
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};