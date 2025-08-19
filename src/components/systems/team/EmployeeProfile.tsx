import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  User,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  Award,
  BookOpen,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Edit,
  Download,
  TrendingUp,
  Target,
  Users,
  Building2,
  Star,
  Trophy,
  FileText as Certificate,
  Wrench,
  Heart,
  Car,
  Home
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  status: 'active' | 'on_leave' | 'terminated';
  joinDate: string;
  yearsInCompany: number;
  profilePicture?: string;
  performanceScore: number;
  attendanceRate: number;
  tasks: number;
  completedTasks: number;
  salary: number;
  leaveBalance: number;
  role: 'employee' | 'manager' | 'hr_admin';
  skills: string[];
  certifications: string[];
  riskScore?: number;
  burnoutRisk?: 'low' | 'medium' | 'high';
}

interface EmployeeProfileProps {
  employee: Employee;
  onBack: () => void;
  userRole: 'employee' | 'manager' | 'hr_admin';
  currentUser: Employee | null;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({
  employee,
  onBack,
  userRole,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  
  const canViewSensitiveData = userRole === 'hr_admin' || 
                               (userRole === 'manager' && employee.manager === currentUser?.name) ||
                               employee.id === currentUser?.id;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">نشط</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">في إجازة</Badge>;
      case 'terminated':
        return <Badge className="bg-red-100 text-red-800 border-red-200">منتهي الخدمة</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const personalData = {
    nationalId: '1234567890',
    dateOfBirth: '1990-05-15',
    nationality: 'سعودي',
    maritalStatus: 'متزوج',
    address: 'الرياض، المملكة العربية السعودية',
    emergencyContact: {
      name: 'فاطمة أحمد',
      relationship: 'الزوجة',
      phone: '+966501234567'
    }
  };

  const contractData = {
    contractType: 'دائم',
    startDate: employee.joinDate,
    endDate: null,
    probationPeriod: '3 أشهر',
    workingHours: '8 ساعات يومياً',
    basicSalary: employee.salary,
    housingAllowance: employee.salary * 0.25,
    transportAllowance: 500,
    totalPackage: employee.salary + (employee.salary * 0.25) + 500
  };

  const attendanceData = {
    thisMonth: {
      present: 20,
      absent: 2,
      late: 3,
      earlyLeave: 1,
      overtime: 15
    },
    thisYear: {
      totalWorkingDays: 240,
      attendedDays: 230,
      absentDays: 10,
      lateCount: 25,
      overtimeHours: 120
    }
  };

  const leaveData = {
    annual: { total: 30, used: 12, remaining: 18 },
    sick: { total: 30, used: 5, remaining: 25 },
    emergency: { total: 5, used: 2, remaining: 3 },
    maternity: { total: 10, used: 0, remaining: 10 }
  };

  const performanceData = {
    currentScore: employee.performanceScore,
    previousScore: 85,
    trend: 'up',
    goals: [
      { title: 'إكمال مشروع التطوير', progress: 80, dueDate: '2024-02-28' },
      { title: 'تطوير المهارات التقنية', progress: 65, dueDate: '2024-03-15' },
      { title: 'تحسين التعاون مع الفريق', progress: 90, dueDate: '2024-01-30' }
    ],
    reviews: [
      { date: '2024-01-15', score: 88, reviewer: 'محمد أحمد الخالدي', comments: 'أداء متميز في المشاريع الأخيرة' },
      { date: '2023-07-15', score: 85, reviewer: 'محمد أحمد الخالدي', comments: 'تحسن ملحوظ في الأداء' }
    ]
  };

  const trainingData = [
    { title: 'دورة React المتقدمة', provider: 'معهد التقنية', date: '2024-01-10', status: 'مكتمل', certificate: true },
    { title: 'إدارة المشاريع', provider: 'الأكاديمية الرقمية', date: '2023-12-15', status: 'مكتمل', certificate: true },
    { title: 'الأمن السيبراني', provider: 'جامعة الملك سعود', date: '2024-02-01', status: 'جاري', certificate: false }
  ];

  const disciplinaryData = [
    { date: '2023-11-20', type: 'إنذار شفهي', reason: 'تأخير متكرر', action: 'تحسن الأداء', status: 'مغلق' }
  ];

  const assetsData = [
    { item: 'لابتوب Dell Latitude', serialNumber: 'DL12345', assignedDate: '2022-01-15', status: 'نشط' },
    { item: 'هاتف iPhone 13', serialNumber: 'IP67890', assignedDate: '2022-06-10', status: 'نشط' },
    { item: 'شاشة Samsung 27 بوصة', serialNumber: 'SM11111', assignedDate: '2022-01-15', status: 'نشط' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <Button 
              onClick={onBack}
              variant="outline" 
              className="flex items-center gap-2 bg-white/60"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للدليل
            </Button>
            
            <div className="flex items-center gap-3">
              {canViewSensitiveData && (
                <>
                  <Button variant="outline" className="bg-white/60">
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                  <Button variant="outline" className="bg-white/60">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
              <AvatarImage src={employee.profilePicture} alt={employee.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
                {getStatusBadge(employee.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{employee.position}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{employee.performanceScore}%</div>
                  <div className="text-sm text-slate-600">الأداء</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{employee.attendanceRate}%</div>
                  <div className="text-sm text-slate-600">الحضور</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{employee.completedTasks}/{employee.tasks}</div>
                  <div className="text-sm text-slate-600">المهام</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">{employee.yearsInCompany}</div>
                  <div className="text-sm text-slate-600">سنة خدمة</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            البيانات الشخصية
          </TabsTrigger>
          <TabsTrigger value="job" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            تفاصيل الوظيفة
          </TabsTrigger>
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            العقد والراتب
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            الحضور
          </TabsTrigger>
          <TabsTrigger value="leave" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            الإجازات
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            الأداء
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            التدريب
          </TabsTrigger>
          <TabsTrigger value="disciplinary" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الإجراءات التأديبية
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            المكافآت
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            المهام
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            الأصول
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            السجلات القانونية
          </TabsTrigger>
        </TabsList>

        {/* Personal Data Tab */}
        <TabsContent value="personal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  المعلومات الأساسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canViewSensitiveData ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">رقم الهوية</label>
                        <p className="font-medium">{personalData.nationalId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">تاريخ الميلاد</label>
                        <p className="font-medium">{personalData.dateOfBirth}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">الجنسية</label>
                        <p className="font-medium">{personalData.nationality}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">الحالة الاجتماعية</label>
                        <p className="font-medium">{personalData.maritalStatus}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">العنوان</label>
                      <p className="font-medium">{personalData.address}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">ليس لديك صلاحية لعرض هذه المعلومات</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  جهة الاتصال في الطوارئ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canViewSensitiveData ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-slate-600">الاسم</label>
                      <p className="font-medium">{personalData.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">صلة القرابة</label>
                      <p className="font-medium">{personalData.emergencyContact.relationship}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">رقم الهاتف</label>
                      <p className="font-medium">{personalData.emergencyContact.phone}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">ليس لديك صلاحية لعرض هذه المعلومات</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  نظرة عامة على الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">{performanceData.currentScore}%</div>
                  <div className="text-slate-600">النتيجة الحالية</div>
                  <div className={`text-sm flex items-center justify-center gap-1 mt-2 ${
                    performanceData.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    {performanceData.trend === 'up' ? 'تحسن' : 'انخفاض'} من {performanceData.previousScore}%
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الجودة</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الإنتاجية</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>التعاون</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  الأهداف الحالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.goals.map((goal, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline">{goal.dueDate}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={goal.progress} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                سجل التدريب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingData.map((training, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        training.status === 'مكتمل' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium">{training.title}</h4>
                        <p className="text-sm text-slate-600">{training.provider} • {training.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={training.status === 'مكتمل' ? 'default' : 'secondary'}>
                        {training.status}
                      </Badge>
                      {training.certificate && (
                        <Certificate className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                الأصول المخصصة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assetsData.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{asset.item}</h4>
                      <p className="text-sm text-slate-600">الرقم التسلسلي: {asset.serialNumber}</p>
                      <p className="text-sm text-slate-600">تاريخ التخصيص: {asset.assignedDate}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {asset.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Tab */}
        <TabsContent value="leave">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(leaveData).map(([type, data]) => (
              <Card key={type} className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {type === 'annual' ? 'الإجازة السنوية' :
                     type === 'sick' ? 'الإجازة المرضية' :
                     type === 'emergency' ? 'إجازة الطوارئ' : 'إجازة الأمومة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">{data.remaining}</div>
                    <div className="text-sm text-slate-600">يوم متبقي</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>المجموع:</span>
                      <span className="font-medium">{data.total} يوم</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المستخدم:</span>
                      <span className="font-medium">{data.used} يوم</span>
                    </div>
                    <Progress value={(data.used / data.total) * 100} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add other tabs content here following the same pattern */}
        <TabsContent value="job">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>تفاصيل الوظيفة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">المنصب</label>
                    <p className="font-medium">{employee.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">القسم</label>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">المدير المباشر</label>
                    <p className="font-medium">{employee.manager}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">تاريخ الالتحاق</label>
                    <p className="font-medium">{employee.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">سنوات الخدمة</label>
                    <p className="font-medium">{employee.yearsInCompany} سنة</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">الدور</label>
                    <Badge>{employee.role === 'manager' ? 'مدير' : employee.role === 'hr_admin' ? 'إداري موارد بشرية' : 'موظف'}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add remaining tabs */}
        {['contract', 'attendance', 'disciplinary', 'rewards', 'tasks', 'legal'].map(tab => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>
                  {tab === 'contract' ? 'العقد والراتب' :
                   tab === 'attendance' ? 'الحضور والغياب' :
                   tab === 'disciplinary' ? 'الإجراءات التأديبية' :
                   tab === 'rewards' ? 'المكافآت والحوافز' :
                   tab === 'tasks' ? 'المهام المخصصة' : 'السجلات القانونية'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-lg font-medium text-slate-600 mb-2">
                    جاري التطوير
                  </div>
                  <p className="text-slate-500">
                    هذا القسم قيد التطوير وسيكون متاحاً قريباً
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;