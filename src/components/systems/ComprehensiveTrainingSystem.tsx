import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  Users,
  TrendingUp,
  PlayCircle,
  FileText,
  Download,
  Search,
  Filter,
  Settings,
  User,
  Clock,
  Star
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEmployees } from '@/data/mockEmployees';
import { BoudHRHeader } from '@/components/shared/BoudHRHeader';
import { BackButton } from '@/components/BackButton';
import { toast } from 'sonner';

interface TrainingSystemProps {
  onBack: () => void;
}

const trainingData = [
  { month: 'يناير', completed: 45, enrolled: 60, satisfaction: 4.2 },
  { month: 'فبراير', completed: 52, enrolled: 65, satisfaction: 4.3 },
  { month: 'مارس', completed: 38, enrolled: 55, satisfaction: 4.1 },
  { month: 'أبريل', completed: 48, enrolled: 62, satisfaction: 4.4 },
  { month: 'مايو', completed: 55, enrolled: 70, satisfaction: 4.5 },
  { month: 'يونيو', completed: 42, enrolled: 58, satisfaction: 4.2 },
];

const trainingPrograms = [
  {
    id: '1',
    name: 'برنامج القيادة الإدارية',
    type: 'إدارة',
    duration: '40 ساعة',
    participants: 15,
    status: 'active',
    instructor: 'د. أحمد المالكي',
    startDate: '2024-02-01',
    progress: 65
  },
  {
    id: '2',
    name: 'التحول الرقمي',
    type: 'تقنية',
    duration: '30 ساعة',
    participants: 20,
    status: 'active',
    instructor: 'م. سارة الحربي',
    startDate: '2024-01-15',
    progress: 80
  },
  {
    id: '3',
    name: 'إدارة الموارد البشرية',
    type: 'موارد بشرية',
    duration: '35 ساعة',
    participants: 12,
    status: 'completed',
    instructor: 'د. فاطمة النهدي',
    startDate: '2024-01-01',
    progress: 100
  }
];

const employeeTrainingRecords = mockEmployees.map(emp => ({
  ...emp,
  totalHours: Math.floor(Math.random() * 50) + 10,
  completedCourses: Math.floor(Math.random() * 8) + 2,
  certifications: Math.floor(Math.random() * 3) + 1,
  lastTraining: '2024-01-15'
}));

export const ComprehensiveTrainingSystem: React.FC<TrainingSystemProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const totalPrograms = trainingPrograms.length;
  const activePrograms = trainingPrograms.filter(p => p.status === 'active').length;
  const totalParticipants = trainingPrograms.reduce((sum, p) => sum + p.participants, 0);
  const avgSatisfaction = 4.3;

  const handleExportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const handleGenerateReport = () => {
    toast.success('تم إنشاء التقرير بنجاح');
  };

  const handleCreateProgram = () => {
    toast.success('تم إنشاء برنامج تدريبي جديد');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success border-success/20">نشط</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">مكتمل</Badge>;
      case 'pending':
        return <Badge variant="secondary">قيد الانتظار</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">البرامج النشطة</p>
                <p className="text-2xl font-bold text-primary">{activePrograms}</p>
                <p className="text-xs text-primary/70">من أصل {totalPrograms}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المشاركون</p>
                <p className="text-2xl font-bold text-success">{totalParticipants}</p>
                <p className="text-xs text-success/70">متدرب نشط</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الشهادات الممنوحة</p>
                <p className="text-2xl font-bold text-amber-600">156</p>
                <p className="text-xs text-amber-600/70">هذا العام</p>
              </div>
              <Award className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">معدل الرضا</p>
                <p className="text-2xl font-bold text-blue-600">{avgSatisfaction}</p>
                <p className="text-xs text-blue-600/70">من 5 نجوم</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>إحصائيات التدريب الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="completed" fill="#10b981" stroke="#10b981" name="المكتملة" />
                <Area type="monotone" dataKey="enrolled" fill="#3b82f6" stroke="#3b82f6" name="المسجلة" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>معدل الرضا عن التدريب</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} name="معدل الرضا" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>الإجراءات السريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button onClick={handleCreateProgram} className="w-full gap-2">
              <BookOpen className="w-4 h-4" />
              برنامج جديد
            </Button>
            <Button onClick={handleExportData} variant="outline" className="w-full gap-2">
              <Download className="w-4 h-4" />
              تصدير البيانات
            </Button>
            <Button onClick={handleGenerateReport} variant="outline" className="w-full gap-2">
              <FileText className="w-4 h-4" />
              إنشاء تقرير
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Settings className="w-4 h-4" />
              إعدادات التدريب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="البحث في البرامج التدريبية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            تصفية
          </Button>
        </div>
        <Button onClick={handleCreateProgram}>
          <BookOpen className="w-4 h-4 mr-2" />
          برنامج جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingPrograms.map((program) => (
          <Card key={program.id} className="border-border/20 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{program.name}</CardTitle>
                {getStatusBadge(program.status)}
              </div>
              <CardDescription>{program.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">المدة</p>
                  <p className="font-medium">{program.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المشاركون</p>
                  <p className="font-medium">{program.participants}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المدرب</p>
                  <p className="font-medium">{program.instructor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">تاريخ البداية</p>
                  <p className="font-medium">{program.startDate}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم</span>
                  <span>{program.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${program.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <PlayCircle className="w-4 h-4 mr-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  تفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEmployeeRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="البحث في سجلات الموظفين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            تصفية
          </Button>
        </div>
        <Button onClick={handleExportData}>
          <Download className="w-4 h-4 mr-2" />
          تصدير
        </Button>
      </div>

      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right p-4 font-medium">الموظف</th>
                  <th className="text-right p-4 font-medium">ساعات التدريب</th>
                  <th className="text-right p-4 font-medium">الدورات المكتملة</th>
                  <th className="text-right p-4 font-medium">الشهادات</th>
                  <th className="text-right p-4 font-medium">آخر تدريب</th>
                  <th className="text-right p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {employeeTrainingRecords
                  .filter(record => record.name.includes(searchTerm))
                  .map((record) => (
                    <tr key={record.id} className="border-t border-border/20 hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={record.avatar} alt={record.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.name}</p>
                            <p className="text-sm text-muted-foreground">{record.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{record.totalHours} ساعة</td>
                      <td className="p-4">{record.completedCourses}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{record.certifications}</Badge>
                      </td>
                      <td className="p-4">{record.lastTraining}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Award className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <BoudHRHeader 
              title="نظام التدريب والتطوير" 
              subtitle="إدارة شاملة لبرامج التدريب وتطوير الموظفين" 
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="programs">البرامج</TabsTrigger>
            <TabsTrigger value="records">سجلات الموظفين</TabsTrigger>
            <TabsTrigger value="certificates">الشهادات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="programs">{renderPrograms()}</TabsContent>
          <TabsContent value="records">{renderEmployeeRecords()}</TabsContent>
          <TabsContent value="certificates">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إدارة الشهادات</h3>
                <p className="text-muted-foreground">إصدار ومتابعة شهادات التدريب</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقارير التدريب</h3>
                <p className="text-muted-foreground">تقارير مفصلة عن أداء البرامج التدريبية</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إعدادات النظام</h3>
                <p className="text-muted-foreground">تخصيص قواعد وإعدادات التدريب</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};