import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Users, 
  TrendingUp, 
  Award, 
  Calendar,
  Download,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings,
  Building,
  FileText,
  DollarSign,
  Star,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEmployees } from '@/data/mockEmployees';
import { EmployeeForm } from '@/components/employee/EmployeeForm';
import { BoudHRHeader } from '@/components/shared/BoudHRHeader';
import { BackButton } from '@/components/BackButton';
import { toast } from 'sonner';

interface TeamMembersProps {
  onBack: () => void;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);

  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const totalDepartments = [...new Set(mockEmployees.map(emp => emp.department))].length;
  const avgPerformance = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalEmployees);

  const departmentData = mockEmployees.reduce((acc: any, emp) => {
    const dept = emp.department;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentDistribution = Object.entries(departmentData).map(([name, value], index) => ({
    name,
    value,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'][index % 6]
  }));

  const performanceData = [
    { month: 'يناير', performance: 85, attendance: 92 },
    { month: 'فبراير', performance: 87, attendance: 94 },
    { month: 'مارس', performance: 89, attendance: 96 },
    { month: 'أبريل', performance: 88, attendance: 93 },
    { month: 'مايو', performance: 91, attendance: 95 },
    { month: 'يونيو', performance: 93, attendance: 97 }
  ];

  const handleExport = () => {
    toast.success("تم تصدير البيانات بنجاح");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success border-success/20">نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غير نشط</Badge>;
      case 'on_leave':
        return <Badge variant="outline">في إجازة</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">موظفين نشطين</p>
                <p className="text-2xl font-bold text-success">{activeEmployees}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الأقسام</p>
                <p className="text-2xl font-bold text-blue-600">{totalDepartments}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-amber-600">{avgPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployeesList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder="البحث في الموظفين..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80"
        />
        <Button onClick={() => setShowEmployeeDialog(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          إضافة موظف
        </Button>
      </div>

      <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-right p-4 font-medium">الموظف</th>
                  <th className="text-right p-4 font-medium">المنصب</th>
                  <th className="text-right p-4 font-medium">القسم</th>
                  <th className="text-right p-4 font-medium">الراتب</th>
                  <th className="text-right p-4 font-medium">الأداء</th>
                  <th className="text-right p-4 font-medium">الحالة</th>
                  <th className="text-right p-4 font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees
                  .filter(emp => emp.name.includes(searchTerm))
                  .map((employee) => (
                    <tr key={employee.id} className="border-t border-border/20 hover:bg-muted/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{employee.position}</td>
                      <td className="p-4">{employee.department}</td>
                      <td className="p-4">{employee.salary.toLocaleString()} ريال</td>
                      <td className="p-4">{employee.performanceScore}%</td>
                      <td className="p-4">{getStatusBadge(employee.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <BoudHRHeader 
              title="إدارة فريق العمل" 
              subtitle="إدارة شاملة لجميع الموظفين والفرق" 
            />
          </div>
          <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <UserPlus className="h-4 w-4" />
                إضافة موظف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة موظف جديد</DialogTitle>
                <DialogDescription>قم بإدخال بيانات الموظف الجديد</DialogDescription>
              </DialogHeader>
              <EmployeeForm 
                onSubmit={(employeeData) => {
                  console.log('Employee data:', employeeData);
                  toast.success('تم إضافة الموظف بنجاح وإرسال بيانات الدخول عبر البريد الإلكتروني');
                  setShowEmployeeDialog(false);
                }}
                onCancel={() => setShowEmployeeDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="members">الموظفين</TabsTrigger>
            <TabsTrigger value="departments">الأقسام</TabsTrigger>
            <TabsTrigger value="performance">الأداء</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="members">{renderEmployeesList()}</TabsContent>
          <TabsContent value="departments">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إدارة الأقسام</h3>
                <p className="text-muted-foreground">عرض وإدارة أقسام الشركة</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقييم الأداء</h3>
                <p className="text-muted-foreground">متابعة وتقييم أداء الموظفين</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التقارير</h3>
                <p className="text-muted-foreground">تقارير شاملة عن فريق العمل</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">الإعدادات</h3>
                <p className="text-muted-foreground">إعدادات نظام إدارة الموظفين</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};