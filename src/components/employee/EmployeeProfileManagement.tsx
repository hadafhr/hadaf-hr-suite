import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  User,
  Edit,
  Upload,
  Download,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
  Award,
  Target,
  Eye,
  Plus
} from 'lucide-react';

export const EmployeeProfileManagement: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Mock employee data
  const employeeData = {
    id: 'EMP001',
    name: 'أحمد محمد العلي',
    nameEn: 'Ahmed Mohammed Al-Ali',
    position: 'مطور برمجيات أول',
    department: 'تقنية المعلومات',
    email: 'ahmed.ali@company.com',
    phone: '+966501234567',
    nationalId: '1234567890',
    passportNumber: 'A12345678',
    nationality: 'سعودي',
    dateOfBirth: '1990-05-15',
    maritalStatus: 'متزوج',
    address: 'الرياض، المملكة العربية السعودية',
    emergencyContact: 'سارة العلي - +966509876543',
    hireDate: '2022-01-15',
    contractType: 'دائم',
    manager: 'محمد السالم',
    grade: 'الدرجة السابعة',
    workLocation: 'المكتب الرئيسي - الرياض',
    avatar: '/placeholder.svg',
    
    // Career information
    career: {
      yearsOfService: 2.2,
      lastPromotion: '2023-06-15',
      performanceRating: 4.5,
      totalProjects: 12,
      completedTraining: 8
    },
    
    // Documents
    documents: [
      { id: '1', name: 'العقد الوظيفي', type: 'contract', status: 'active', expiryDate: '2025-01-15', fileSize: '2.3 MB' },
      { id: '2', name: 'صورة الهوية الوطنية', type: 'id', status: 'active', expiryDate: '2030-05-15', fileSize: '1.2 MB' },
      { id: '3', name: 'صورة جواز السفر', type: 'passport', status: 'active', expiryDate: '2028-03-20', fileSize: '1.8 MB' },
      { id: '4', name: 'شهادة المؤهل العلمي', type: 'education', status: 'active', expiryDate: null, fileSize: '3.1 MB' },
      { id: '5', name: 'شهادة الخبرة السابقة', type: 'experience', status: 'expired', expiryDate: '2024-01-01', fileSize: '1.5 MB' },
      { id: '6', name: 'تقرير الفحص الطبي', type: 'medical', status: 'expiring', expiryDate: '2024-03-15', fileSize: '2.7 MB' }
    ],
    
    // Education
    education: {
      level: 'بكالوريوس',
      university: 'جامعة الملك سعود',
      major: 'علوم الحاسب',
      graduationYear: 2016,
      gpa: 3.8
    },
    
    // Emergency contacts
    emergencyContacts: [
      { name: 'سارة العلي', relation: 'الزوجة', phone: '+966509876543' },
      { name: 'محمد العلي', relation: 'الوالد', phone: '+966508765432' }
    ]
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white hover:bg-green-600">نشط</Badge>;
      case 'expired':
        return <Badge className="bg-red-500 text-white hover:bg-red-600">منتهي الصلاحية</Badge>;
      case 'expiring':
        return <Badge className="bg-orange-500 text-white hover:bg-orange-600">ينتهي قريباً</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'id':
        return <User className="h-5 w-5 text-green-600" />;
      case 'passport':
        return <Building2 className="h-5 w-5 text-purple-600" />;
      case 'education':
        return <GraduationCap className="h-5 w-5 text-indigo-600" />;
      case 'medical':
        return <Calendar className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleUpdateProfile = () => {
    setIsEditingProfile(false);
    toast.success('تم تحديث الملف الشخصي بنجاح');
  };

  const handleUploadDocument = () => {
    setIsUploadingDocument(false);
    toast.success('تم رفع المستند بنجاح');
  };

  const handleDownloadDocument = (documentName: string) => {
    toast.info(`جاري تحميل: ${documentName}`);
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    toast.info(`عرض المستند: ${document.name}`);
  };

  return (
    <div className="space-y-6 bg-background text-foreground">
      {/* Profile Header */}
      <Card className="border-l-4 border-l-green-500 bg-card shadow-lg">
        <CardHeader className="bg-gradient-to-r from-background to-muted">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              ملف الموظف الشخصي
            </CardTitle>
            <Button 
              onClick={() => setIsEditingProfile(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Edit className="h-4 w-4 ml-2" />
              تعديل البيانات
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-green-200">
                <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-green-400 to-green-600 text-white">
                  {employeeData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                <Upload className="h-4 w-4 ml-2" />
                تحديث الصورة
              </Button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">الاسم الكامل</Label>
                  <p className="text-lg font-semibold text-foreground">{employeeData.name}</p>
                  <p className="text-sm text-muted-foreground">{employeeData.nameEn}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">المسمى الوظيفي</Label>
                  <p className="text-base font-medium text-foreground">{employeeData.position}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">القسم</Label>
                  <p className="text-base font-medium text-foreground">{employeeData.department}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">تاريخ التعيين</Label>
                  <p className="text-base font-medium text-foreground">{employeeData.hireDate}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">رقم الموظف</Label>
                  <p className="text-lg font-semibold text-green-600">{employeeData.id}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">المدير المباشر</Label>
                  <p className="text-base font-medium text-foreground">{employeeData.manager}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">الدرجة الوظيفية</Label>
                  <p className="text-base font-medium text-foreground">{employeeData.grade}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="text-sm font-medium text-muted-foreground">سنوات الخدمة</Label>
                  <p className="text-base font-medium text-green-600">{employeeData.career.yearsOfService} سنة</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">تقييم الأداء</p>
                <p className="text-2xl font-bold text-green-700">{employeeData.career.performanceRating}/5</p>
              </div>
              <Star className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">المشاريع المكتملة</p>
                <p className="text-2xl font-bold text-blue-700">{employeeData.career.totalProjects}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">الدورات المكتملة</p>
                <p className="text-2xl font-bold text-purple-700">{employeeData.career.completedTraining}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">آخر ترقية</p>
                <p className="text-sm font-bold text-orange-700">{employeeData.career.lastPromotion}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="personal" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">المستندات</TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">التعليم</TabsTrigger>
          <TabsTrigger value="emergency" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">جهات الاتصال</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <User className="h-5 w-5" />
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-sm text-muted-foreground font-medium">البريد الإلكتروني</Label>
                      <p className="font-semibold text-foreground">{employeeData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-sm text-muted-foreground font-medium">رقم الجوال</Label>
                      <p className="font-semibold text-foreground">{employeeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-sm text-muted-foreground font-medium">تاريخ الميلاد</Label>
                      <p className="font-semibold text-foreground">{employeeData.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">رقم الهوية الوطنية</Label>
                    <p className="font-semibold text-foreground">{employeeData.nationalId}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">رقم جواز السفر</Label>
                    <p className="font-semibold text-foreground">{employeeData.passportNumber}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">الحالة الاجتماعية</Label>
                    <p className="font-semibold text-foreground">{employeeData.maritalStatus}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <Label className="text-sm text-muted-foreground font-medium">العنوان</Label>
                    <p className="font-semibold text-foreground">{employeeData.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <FileText className="h-5 w-5" />
                  وثائق الموظف
                </CardTitle>
                <Dialog open={isUploadingDocument} onOpenChange={setIsUploadingDocument}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 ml-2" />
                      رفع مستند
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>رفع مستند جديد</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>نوع المستند</Label>
                        <Input placeholder="مثال: شهادة دورة تدريبية" />
                      </div>
                      <div>
                        <Label>ملف المستند</Label>
                        <Input type="file" />
                      </div>
                      <div>
                        <Label>تاريخ انتهاء الصلاحية (اختياري)</Label>
                        <Input type="date" />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleUploadDocument}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          رفع المستند
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsUploadingDocument(false)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employeeData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-card">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.fileSize}</span>
                          {doc.expiryDate && (
                            <span>• ينتهي في: {doc.expiryDate}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDocumentStatusBadge(doc.status)}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDocument(doc)}
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        عرض
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadDocument(doc.name)}
                      >
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <GraduationCap className="h-5 w-5" />
                المؤهلات العلمية
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">مستوى التعليم</Label>
                    <p className="text-lg font-semibold text-foreground">{employeeData.education.level}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">الجامعة</Label>
                    <p className="font-semibold text-foreground">{employeeData.education.university}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">المعدل التراكمي</Label>
                    <p className="text-lg font-semibold text-green-600">{employeeData.education.gpa}/4.0</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">التخصص</Label>
                    <p className="font-semibold text-foreground">{employeeData.education.major}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm text-muted-foreground font-medium">سنة التخرج</Label>
                    <p className="font-semibold text-foreground">{employeeData.education.graduationYear}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Users className="h-5 w-5" />
                جهات الاتصال في حالات الطوارئ
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {employeeData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.relation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{contact.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل الملف الشخصي</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>الاسم الكامل</Label>
                <Input defaultValue={employeeData.name} />
              </div>
              <div>
                <Label>البريد الإلكتروني</Label>
                <Input defaultValue={employeeData.email} />
              </div>
              <div>
                <Label>رقم الجوال</Label>
                <Input defaultValue={employeeData.phone} />
              </div>
              <div>
                <Label>الحالة الاجتماعية</Label>
                <Input defaultValue={employeeData.maritalStatus} />
              </div>
            </div>
            <div>
              <Label>العنوان</Label>
              <Textarea defaultValue={employeeData.address} />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleUpdateProfile}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                حفظ التغييرات
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditingProfile(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};