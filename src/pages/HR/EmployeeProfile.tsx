import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Download,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  nationality: string;
  address: string;
  emergencyContact: string;
  avatar?: string;
}

export const EmployeeProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<EmployeeData>({
    id: 'EMP001',
    name: 'أحمد محمد العلي',
    email: 'ahmed.ali@company.com',
    phone: '+966501234567',
    position: 'مطور برمجيات أول',
    department: 'قسم تقنية المعلومات',
    joinDate: '2022-01-15',
    nationality: 'سعودي',
    address: 'الرياض، المملكة العربية السعودية',
    emergencyContact: '+966509876543'
  });

  const documents = [
    { name: 'صورة من الهوية الوطنية', type: 'PDF', date: '2024-01-01', status: 'محدث' },
    { name: 'الشهادة الجامعية', type: 'PDF', date: '2024-01-01', status: 'محدث' },
    { name: 'شهادة الخبرة', type: 'PDF', date: '2024-01-01', status: 'محدث' },
    { name: 'العقد الوظيفي', type: 'PDF', date: '2024-01-01', status: 'محدث' }
  ];

  const performanceData = [
    { metric: 'تقييم الأداء العام', value: '4.8/5', icon: Star },
    { metric: 'مؤشر الإنتاجية', value: '95%', icon: TrendingUp },
    { metric: 'التقديرات المستلمة', value: '12', icon: Award },
    { metric: 'المشاريع المكتملة', value: '28', icon: FileText }
  ];

  const handleSave = () => {
    // Here you would save the profile data to your backend
    setIsEditing(false);
    alert('تم حفظ التعديلات بنجاح!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" onClick={() => navigate('/employee-dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <h1 className="text-xl font-semibold">الملف الشخصي</h1>
                <p className="text-sm text-muted-foreground">عرض وتحديث البيانات الشخصية</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel} size="sm">
                    <X className="w-4 h-4 ml-1" />
                    إلغاء
                  </Button>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 ml-1" />
                    حفظ
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            {/* Profile Header */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback className="text-lg">
                      {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-right">
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-lg text-muted-foreground">{profileData.position}</p>
                    <p className="text-sm text-muted-foreground">{profileData.department}</p>
                    <Badge className="mt-2">رقم الموظف: {profileData.id}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right flex items-center">
                      <User className="w-4 h-4 ml-1" />
                      الاسم الكامل
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-right flex items-center">
                      <Mail className="w-4 h-4 ml-1" />
                      البريد الإلكتروني
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-right flex items-center">
                      <Phone className="w-4 h-4 ml-1" />
                      رقم الهاتف
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="text-right flex items-center">
                      <MapPin className="w-4 h-4 ml-1" />
                      الجنسية
                    </Label>
                    {isEditing ? (
                      <Input
                        id="nationality"
                        value={profileData.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.nationality}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-right flex items-center">
                      <MapPin className="w-4 h-4 ml-1" />
                      العنوان
                    </Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate" className="text-right flex items-center">
                      <Calendar className="w-4 h-4 ml-1" />
                      تاريخ الانضمام
                    </Label>
                    <p className="p-2 text-right">{profileData.joinDate}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="text-right flex items-center">
                      <Phone className="w-4 h-4 ml-1" />
                      رقم الطوارئ
                    </Label>
                    {isEditing ? (
                      <Input
                        id="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="text-right"
                      />
                    ) : (
                      <p className="p-2 text-right">{profileData.emergencyContact}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">المستندات والملفات</CardTitle>
                <CardDescription className="text-right">
                  جميع المستندات المرفوعة في النظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Badge variant="outline">{doc.status}</Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4 ml-1" />
                          تحميل
                        </Button>
                      </div>
                      <div className="text-right">
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.map((item, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                        <p className="text-2xl font-bold">{item.value}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-right">تقييم الأداء التفصيلي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-right text-green-800">التقييم الأخير - ديسمبر 2023</h4>
                    <p className="text-sm text-green-700 text-right mt-1">
                      أداء ممتاز في جميع المجالات مع إنجازات استثنائية في المشاريع المسندة
                    </p>
                    <div className="flex justify-end mt-3">
                      <Badge className="bg-green-100 text-green-800">4.8/5</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};