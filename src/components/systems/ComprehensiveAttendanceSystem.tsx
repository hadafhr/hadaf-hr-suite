import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Settings,
  BarChart3,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEmployees } from '@/data/mockEmployees';
import { BoudHRHeader } from '@/components/shared/BoudHRHeader';
import { BackButton } from '@/components/BackButton';
import { toast } from 'sonner';

interface AttendanceSystemProps {
  onBack: () => void;
}

const attendanceData = [
  { name: 'السبت', present: 18, late: 2, absent: 0 },
  { name: 'الأحد', present: 19, late: 1, absent: 0 },
  { name: 'الاثنين', present: 20, late: 0, absent: 0 },
  { name: 'الثلاثاء', present: 17, late: 2, absent: 1 },
  { name: 'الأربعاء', present: 19, late: 1, absent: 0 },
  { name: 'الخميس', present: 18, late: 1, absent: 1 },
];

const attendanceRecords = mockEmployees.map(emp => ({
  ...emp,
  checkIn: '08:30',
  checkOut: '17:00',
  status: Math.random() > 0.8 ? 'late' : Math.random() > 0.9 ? 'absent' : 'present',
  location: 'المكتب الرئيسي',
  workingHours: '8:30 ساعة'
}));

export const ComprehensiveAttendanceSystem: React.FC<AttendanceSystemProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="w-3 h-3 mr-1" />حاضر</Badge>;
      case 'late':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />متأخر</Badge>;
      case 'absent':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />غائب</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const handleExportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const handleGenerateReport = () => {
    toast.success('تم إنشاء التقرير بنجاح');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الحضور</p>
                <p className="text-2xl font-bold text-success">18</p>
                <p className="text-xs text-success/70">من أصل 20 موظف</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">التأخير</p>
                <p className="text-2xl font-bold text-amber-600">2</p>
                <p className="text-xs text-amber-600/70">موظف متأخر</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-destructive/5 to-destructive/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الغياب</p>
                <p className="text-2xl font-bold text-destructive">0</p>
                <p className="text-xs text-destructive/70">موظف غائب</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط ساعات العمل</p>
                <p className="text-2xl font-bold text-primary">8.5</p>
                <p className="text-xs text-primary/70">ساعة يومياً</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>إحصائيات الحضور الأسبوعية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="present" fill="#10b981" stroke="#10b981" />
                <Area type="monotone" dataKey="late" fill="#f59e0b" stroke="#f59e0b" />
                <Area type="monotone" dataKey="absent" fill="#ef4444" stroke="#ef4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>توزيع حالات الحضور</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" />
                <Bar dataKey="late" fill="#f59e0b" />
                <Bar dataKey="absent" fill="#ef4444" />
              </BarChart>
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
            <Button onClick={handleExportData} className="w-full gap-2">
              <Download className="w-4 h-4" />
              تصدير البيانات
            </Button>
            <Button onClick={handleGenerateReport} variant="outline" className="w-full gap-2">
              <BarChart3 className="w-4 h-4" />
              إنشاء تقرير
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Settings className="w-4 h-4" />
              إعدادات الحضور
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Calendar className="w-4 h-4" />
              تقويم الحضور
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAttendanceRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            placeholder="البحث في سجلات الحضور..."
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
                  <th className="text-right p-4 font-medium">وقت الدخول</th>
                  <th className="text-right p-4 font-medium">وقت الخروج</th>
                  <th className="text-right p-4 font-medium">ساعات العمل</th>
                  <th className="text-right p-4 font-medium">الموقع</th>
                  <th className="text-right p-4 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords
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
                            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{record.checkIn}</td>
                      <td className="p-4">{record.checkOut}</td>
                      <td className="p-4">{record.workingHours}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {record.location}
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(record.status)}</td>
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
              title="نظام الحضور والانصراف" 
              subtitle="إدارة شاملة لحضور وانصراف الموظفين" 
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="records">سجلات الحضور</TabsTrigger>
            <TabsTrigger value="calendar">التقويم</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            <TabsTrigger value="tracking">التتبع المباشر</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="records">{renderAttendanceRecords()}</TabsContent>
          <TabsContent value="calendar">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقويم الحضور</h3>
                <p className="text-muted-foreground">عرض تقويم تفاعلي لحضور الموظفين</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">تقارير الحضور</h3>
                <p className="text-muted-foreground">تقارير مفصلة عن أداء الحضور</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">إعدادات النظام</h3>
                <p className="text-muted-foreground">تخصيص قواعد وإعدادات الحضور</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tracking">
            <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">التتبع المباشر</h3>
                <p className="text-muted-foreground">تتبع مواقع الموظفين في الوقت الفعلي</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};