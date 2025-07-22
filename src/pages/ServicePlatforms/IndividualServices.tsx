import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Calendar, 
  FileText, 
  Award, 
  Settings,
  Bell,
  Download,
  Upload,
  Edit,
  Save
} from 'lucide-react';

export const IndividualServices: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'أحمد محمد العتيبي',
    email: 'ahmed.otaibi@company.com',
    phone: '+966501234567',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات أول',
    employeeId: 'EMP001',
    joinDate: '2022-01-15'
  });

  const vacationRequests = [
    { id: 1, type: 'إجازة سنوية', startDate: '2024-02-15', endDate: '2024-02-20', status: 'معتمد', days: 5 },
    { id: 2, type: 'إجازة مرضية', startDate: '2024-01-10', endDate: '2024-01-12', status: 'معتمد', days: 2 },
    { id: 3, type: 'إجازة اضطرارية', startDate: '2024-03-01', endDate: '2024-03-01', status: 'قيد المراجعة', days: 1 }
  ];

  const performanceData = [
    { metric: 'الإنتاجية', score: 92, target: 85 },
    { metric: 'الجودة', score: 88, target: 80 },
    { metric: 'التعاون', score: 95, target: 90 },
    { metric: 'الابتكار', score: 87, target: 75 }
  ];

  const trainingCourses = [
    { id: 1, title: 'تطوير تطبيقات React', progress: 75, status: 'جاري', duration: '40 ساعة' },
    { id: 2, title: 'إدارة المشاريع الرشيقة', progress: 100, status: 'مكتمل', duration: '25 ساعة' },
    { id: 3, title: 'الأمن السيبراني', progress: 30, status: 'جاري', duration: '60 ساعة' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            منصة الخدمات الفردية
          </h1>
          <p className="text-muted-foreground">
            إدارة شاملة لجميع شؤونك المهنية والشخصية
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="vacation" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              الإجازات
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              المستندات
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              الأداء
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              التطوير
            </TabsTrigger>
          </TabsList>

          {/* الملف الشخصي */}
          <TabsContent value="profile">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">بياناتي الشخصية</h3>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                  {isEditing ? 'حفظ' : 'تعديل'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      readOnly={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      readOnly={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      readOnly={!isEditing}
                      className={isEditing ? '' : 'bg-muted'}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="department">القسم</Label>
                    <Input
                      id="department"
                      value={profileData.department}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">المنصب</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeId">رقم الموظف</Label>
                    <Input
                      id="employeeId"
                      value={profileData.employeeId}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* الإجازات */}
          <TabsContent value="vacation">
            <div className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">طلب إجازة جديد</h3>
                  <Button className="btn-primary">
                    <Calendar className="h-4 w-4 mr-2" />
                    طلب إجازة
                  </Button>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="metric-card">
                    <h4 className="text-2xl font-bold text-primary">21</h4>
                    <p className="text-sm text-muted-foreground">أيام متبقية</p>
                  </div>
                  <div className="metric-card">
                    <h4 className="text-2xl font-bold text-success">15</h4>
                    <p className="text-sm text-muted-foreground">أيام مستخدمة</p>
                  </div>
                  <div className="metric-card">
                    <h4 className="text-2xl font-bold text-warning">2</h4>
                    <p className="text-sm text-muted-foreground">طلبات معلقة</p>
                  </div>
                  <div className="metric-card">
                    <h4 className="text-2xl font-bold text-muted">30</h4>
                    <p className="text-sm text-muted-foreground">الرصيد السنوي</p>
                  </div>
                </div>
              </Card>

              <Card className="dashboard-card">
                <h3 className="text-lg font-semibold mb-4">سجل الإجازات</h3>
                <div className="space-y-3">
                  {vacationRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div>
                          <h4 className="font-medium">{request.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {request.startDate} - {request.endDate} ({request.days} أيام)
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.status === 'معتمد' 
                          ? 'bg-success/10 text-success'
                          : request.status === 'قيد المراجعة'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* المستندات */}
          <TabsContent value="documents">
            <Card className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">مستنداتي</h3>
                <Button className="btn-primary">
                  <Upload className="h-4 w-4 mr-2" />
                  رفع مستند
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'شهادة التخرج',
                  'عقد العمل',
                  'تقرير الأداء السنوي',
                  'شهادات التدريب',
                  'الملف الطبي',
                  'بيانات الراتب'
                ].map((doc, index) => (
                  <div key={index} className="metric-card">
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium text-sm">{doc}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      آخر تحديث: منذ {Math.floor(Math.random() * 30)} يوم
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* تقييم الأداء */}
          <TabsContent value="performance">
            <Card className="dashboard-card">
              <h3 className="text-lg font-semibold mb-6">تقييم الأداء الحالي</h3>
              
              <div className="space-y-6">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.score}% / {item.target}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${(item.score / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">الأداء الإجمالي: ممتاز</h4>
                  <p className="text-sm text-muted-foreground">
                    تحقق أداؤك معايير عالية في جميع المجالات. استمر في الأداء المتميز!
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* التطوير والتدريب */}
          <TabsContent value="training">
            <div className="space-y-6">
              <Card className="dashboard-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">دوراتي التدريبية</h3>
                  <Button className="btn-primary">
                    تصفح الدورات
                  </Button>
                </div>

                <div className="space-y-4">
                  {trainingCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{course.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          المدة: {course.duration}
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-primary rounded-full h-2 transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.progress}% مكتمل
                        </p>
                      </div>
                      <div className="text-center mr-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          course.status === 'مكتمل' 
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};