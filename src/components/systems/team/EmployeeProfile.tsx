import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Download,
  Edit,
  Save,
  Building,
  Briefcase,
  DollarSign,
  Clock,
  Target,
  Award,
  Upload,
  Eye,
  Trash2
} from 'lucide-react';

interface TeamMember {
  id: string;
  employeeNumber: string;
  name: string;
  position: string;
  department: string;
  status: string;
  level: string;
  manager: string;
  email: string;
  phone: string;
  startDate: string;
  contractType: string;
  performanceScore: number;
  attendanceRate: number;
  yearsOfExperience: number;
  salary: number;
}

interface EmployeeProfileProps {
  employee: TeamMember | null;
  onEdit?: () => void;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, onEdit }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">اختر موظفاً لعرض تفاصيله</p>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث بيانات الموظف",
    });
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير ملف ${employee.name} كملف PDF`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Employee Header */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src="/lovable-uploads/employee-avatars/ahmed-mohamed.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
                <p className="text-lg text-muted-foreground">{employee.position}</p>
                <p className="text-sm text-muted-foreground">رقم الموظف: {employee.employeeNumber}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className={employee.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                    {employee.status === 'Active' ? 'نشط' : employee.status}
                  </Badge>
                  <Badge variant="outline">{employee.department}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 ml-2" />
                تصدير PDF
              </Button>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                size="sm" 
                onClick={isEditing ? handleSave : () => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="h-4 w-4 ml-2" /> : <Edit className="h-4 w-4 ml-2" />}
                {isEditing ? "حفظ" : "تحرير"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="job">معلومات الوظيفة</TabsTrigger>
          <TabsTrigger value="financial">البيانات المالية</TabsTrigger>
          <TabsTrigger value="attendance">الحضور والإجازات</TabsTrigger>
          <TabsTrigger value="performance">الأداء والتقييم</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
          <TabsTrigger value="history">سجل الأنشطة</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الاسم الكامل</Label>
                    <Input value={employee.name} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>رقم الهوية</Label>
                    <Input value="1234567890" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>الجنسية</Label>
                    <Input value="سعودي" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>الحالة الاجتماعية</Label>
                    <Input value="متزوج" disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  معلومات الاتصال
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input value={employee.email} disabled={!isEditing} />
                </div>
                <div>
                  <Label>رقم الهاتف</Label>
                  <Input value={employee.phone} disabled={!isEditing} />
                </div>
                <div>
                  <Label>العنوان</Label>
                  <Textarea value="الرياض، المملكة العربية السعودية" disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Job Information */}
        <TabsContent value="job">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  تفاصيل الوظيفة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>المسمى الوظيفي</Label>
                    <Input value={employee.position} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <Input value={employee.department} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>المستوى الوظيفي</Label>
                    <Input value={employee.level} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>المدير المباشر</Label>
                    <Input value={employee.manager} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>تاريخ التوظيف</Label>
                    <Input value={employee.startDate} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>نوع العقد</Label>
                    <Input value={employee.contractType} disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  الخبرة والمهارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>سنوات الخبرة</Label>
                  <Input value={`${employee.yearsOfExperience} سنوات`} disabled={!isEditing} />
                </div>
                <div>
                  <Label>المهارات الأساسية</Label>
                  <Textarea value="JavaScript, React, Node.js, TypeScript" disabled={!isEditing} />
                </div>
                <div>
                  <Label>الشهادات المهنية</Label>
                  <Textarea value="AWS Solutions Architect, PMP" disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Information */}
        <TabsContent value="financial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  معلومات الراتب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الراتب الأساسي</Label>
                    <Input value={`${employee.salary.toLocaleString()} ريال`} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>بدل السكن</Label>
                    <Input value="2000 ريال" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>بدل النقل</Label>
                    <Input value="1000 ريال" disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>الإجمالي الشهري</Label>
                    <Input value={`${(employee.salary + 3000).toLocaleString()} ريال`} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  معلومات البنك
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>اسم البنك</Label>
                  <Input value="البنك الأهلي السعودي" disabled={!isEditing} />
                </div>
                <div>
                  <Label>رقم الحساب</Label>
                  <Input value="1234567890123456" disabled={!isEditing} />
                </div>
                <div>
                  <Label>رقم الآيبان</Label>
                  <Input value="SA1234567890123456789012" disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Attendance & Leave */}
        <TabsContent value="attendance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  معدل الحضور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{employee.attendanceRate}%</div>
                  <p className="text-muted-foreground">معدل الحضور الشهري</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أرصدة الإجازات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>الإجازة السنوية</span>
                  <Badge>21 يوم متبقي</Badge>
                </div>
                <div className="flex justify-between">
                  <span>الإجازة المرضية</span>
                  <Badge>30 يوم متبقي</Badge>
                </div>
                <div className="flex justify-between">
                  <span>الإجازة الاضطرارية</span>
                  <Badge>5 أيام متبقية</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  التقييم الحالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{employee.performanceScore}%</div>
                  <p className="text-muted-foreground">درجة الأداء العام</p>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-800">ممتاز</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تاريخ التقييمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تقييم 2024 - Q1</span>
                    <Badge>92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تقييم 2023 - Q4</span>
                    <Badge>89%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تقييم 2023 - Q3</span>
                    <Badge>91%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  المستندات الرسمية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'العقد الوظيفي', date: '2022-01-15', type: 'PDF' },
                  { name: 'صورة الهوية', date: '2022-01-15', type: 'JPG' },
                  { name: 'الشهادات العلمية', date: '2022-01-15', type: 'PDF' },
                  { name: 'التقرير الطبي', date: '2024-01-01', type: 'PDF' }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إضافة مستند جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>نوع المستند</Label>
                    <Input placeholder="اختر نوع المستند" />
                  </div>
                  <div>
                    <Label>الوصف</Label>
                    <Textarea placeholder="وصف المستند" />
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 ml-2" />
                    رفع المستند
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>سجل الأنشطة والتحديثات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '2024-01-20', action: 'تحديث بيانات الاتصال', user: 'محمد أحمد' },
                  { date: '2024-01-15', action: 'إضافة تقييم الأداء Q1', user: 'نورا السالم' },
                  { date: '2024-01-10', action: 'تحديث الراتب الأساسي', user: 'فاطمة العبدالله' },
                  { date: '2024-01-05', action: 'رفع شهادة تدريبية جديدة', user: 'أحمد محمد' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">بواسطة: {activity.user}</p>
                    </div>
                    <Badge variant="outline">{activity.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;