import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Clock,
  UserCheck,
  UserX,
  AlertCircle,
  Calendar,
  Timer,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2,
  Save,
  Brain,
  Users,
  Zap,
  Activity,
  Shield,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  CheckCircle,
  XCircle,
  ClockIcon,
  CalendarDays,
  Fingerprint,
  MapPin,
  Wifi,
  Smartphone,
  Target,
  Award,
  RefreshCw,
  FileSpreadsheet,
  Printer,
  Database,
  Layers,
  DollarSign
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface ComprehensiveAttendanceSystemProps {
  onBack: () => void;
}

export const ComprehensiveAttendanceSystem: React.FC<ComprehensiveAttendanceSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAttendanceType, setSelectedAttendanceType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewRecordOpen, setIsNewRecordOpen] = useState(false);
  const [isNewShiftOpen, setIsNewShiftOpen] = useState(false);
  const [isAIAnalysisOpen, setIsAIAnalysisOpen] = useState(false);

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    dailyAttendance: { value: 94, target: 95, trend: '+2%', status: 'good' },
    tardiness: { value: 8, target: 5, trend: '+1%', status: 'warning' },
    actualHours: { value: 168, target: 160, trend: '+5%', status: 'good' },
    absences: { value: 3, target: 2, trend: '-1%', status: 'warning' },
    overtime: { value: 24, target: 20, trend: '+20%', status: 'good' }
  };

  // Attendance trends data
  const attendanceTrends = [
    { month: 'يناير', attendance: 92, tardiness: 10, absences: 5, overtime: 18 },
    { month: 'فبراير', attendance: 94, tardiness: 8, absences: 4, overtime: 22 },
    { month: 'مارس', attendance: 96, tardiness: 6, absences: 3, overtime: 25 },
    { month: 'أبريل', attendance: 94, tardiness: 8, absences: 3, overtime: 28 },
    { month: 'مايو', attendance: 94, tardiness: 8, absences: 3, overtime: 24 }
  ];

  // Department attendance data
  const departmentAttendance = [
    { department: 'تقنية المعلومات', attendance: 96, employees: 25, avgHours: 8.2 },
    { department: 'المبيعات', attendance: 92, employees: 18, avgHours: 8.5 },
    { department: 'الموارد البشرية', attendance: 98, employees: 12, avgHours: 8.0 },
    { department: 'المالية', attendance: 94, employees: 15, avgHours: 8.1 },
    { department: 'التسويق', attendance: 90, employees: 20, avgHours: 8.3 }
  ];

  // Attendance center types
  const attendanceTypes = [
    {
      type: 'daily-attendance',
      name: 'الحضور اليومي',
      description: 'تسجيل الدخول والخروج اليومي',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: 1250,
      trend: '+5%'
    },
    {
      type: 'tardiness',
      name: 'التأخيرات',
      description: 'مراقبة وإدارة حالات التأخير',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      count: 45,
      trend: '-2%'
    },
    {
      type: 'absences',
      name: 'الغياب',
      description: 'تتبع أيام الغياب والإجازات',
      icon: UserX,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      count: 23,
      trend: '-10%'
    },
    {
      type: 'short-leave',
      name: 'الإجازات القصيرة',
      description: 'إجازات بالساعات والفترات القصيرة',
      icon: Timer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: 89,
      trend: '+3%'
    },
    {
      type: 'overtime',
      name: 'العمل الإضافي',
      description: 'ساعات العمل الإضافية والمكافآت',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: 156,
      trend: '+15%'
    }
  ];

  // Mock attendance records
  const attendanceRecords = [
    {
      id: '1',
      employee: 'أحمد محمد علي',
      department: 'تقنية المعلومات',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '17:00',
      workHours: 8,
      overtime: 0,
      status: 'حاضر',
      location: 'المكتب الرئيسي'
    },
    {
      id: '2',
      employee: 'فاطمة أحمد السعيد',
      department: 'المبيعات',
      date: '2024-01-15',
      checkIn: '08:15',
      checkOut: '17:30',
      workHours: 8.25,
      overtime: 0.5,
      status: 'متأخر',
      location: 'المكتب الرئيسي'
    },
    {
      id: '3',
      employee: 'محمد عبد الرحمن',
      department: 'المالية',
      date: '2024-01-15',
      checkIn: '-',
      checkOut: '-',
      workHours: 0,
      overtime: 0,
      status: 'غائب',
      location: '-'
    }
  ];

  // Mock shift schedules
  const shiftSchedules = [
    {
      id: '1',
      name: 'الدوام الصباحي',
      startTime: '08:00',
      endTime: '17:00',
      breakTime: '12:00-13:00',
      employees: 85,
      departments: ['تقنية المعلومات', 'المالية', 'الموارد البشرية']
    },
    {
      id: '2',
      name: 'الدوام المسائي',
      startTime: '14:00',
      endTime: '23:00',
      breakTime: '18:00-19:00',
      employees: 35,
      departments: ['المبيعات', 'خدمة العملاء']
    },
    {
      id: '3',
      name: 'الدوام المرن',
      startTime: '07:00-10:00',
      endTime: '15:00-18:00',
      breakTime: 'حسب الاختيار',
      employees: 25,
      departments: ['التسويق', 'التطوير']
    }
  ];

  // AI Analysis insights
  const aiInsights = [
    {
      type: 'risk',
      title: 'تحذير: زيادة معدل التأخير',
      description: 'تم رصد زيادة بنسبة 15% في معدل التأخير لقسم المبيعات خلال الأسبوع الماضي',
      action: 'مراجعة سياسة الحضور مع مدير القسم',
      priority: 'عالي'
    },
    {
      type: 'opportunity',
      title: 'فرصة تحسين: العمل عن بُعد',
      description: 'يظهر قسم تقنية المعلومات إنتاجية أعلى بنسبة 12% عند العمل عن بُعد',
      action: 'تطبيق نظام العمل المختلط لقسم تقنية المعلومات',
      priority: 'متوسط'
    },
    {
      type: 'prediction',
      title: 'توقع: زيادة ساعات العمل الإضافي',
      description: 'متوقع زيادة العمل الإضافي بنسبة 25% خلال الربع القادم بناءً على الاتجاهات الحالية',
      action: 'تخطيط الميزانية والموارد للعمل الإضافي المتوقع',
      priority: 'متوسط'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'danger': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'حاضر':
        return <Badge className="bg-green-100 text-green-800 border-green-200">حاضر</Badge>;
      case 'متأخر':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">متأخر</Badge>;
      case 'غائب':
        return <Badge className="bg-red-100 text-red-800 border-red-200">غائب</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">معدل الحضور</CardTitle>
            <UserCheck className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.dailyAttendance.value}%</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600">{dashboardMetrics.dailyAttendance.trend}</span>
              <span className="text-gray-500">الهدف: {dashboardMetrics.dailyAttendance.target}%</span>
            </div>
            <Progress value={dashboardMetrics.dailyAttendance.value} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">حالات التأخير</CardTitle>
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.tardiness.value}</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-orange-600">{dashboardMetrics.tardiness.trend}</span>
              <span className="text-gray-500">الهدف: {dashboardMetrics.tardiness.target}</span>
            </div>
            <Progress value={(dashboardMetrics.tardiness.target / dashboardMetrics.tardiness.value) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ساعات العمل الفعلية</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.actualHours.value}</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600">{dashboardMetrics.actualHours.trend}</span>
              <span className="text-gray-500">المخطط: {dashboardMetrics.actualHours.target}</span>
            </div>
            <Progress value={(dashboardMetrics.actualHours.value / dashboardMetrics.actualHours.target) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">أيام الغياب</CardTitle>
            <UserX className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.absences.value}</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-red-600">{dashboardMetrics.absences.trend}</span>
              <span className="text-gray-500">الهدف: {dashboardMetrics.absences.target}</span>
            </div>
            <Progress value={(dashboardMetrics.absences.target / dashboardMetrics.absences.value) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">العمل الإضافي</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{dashboardMetrics.overtime.value}س</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600">{dashboardMetrics.overtime.trend}</span>
              <span className="text-gray-500">المخطط: {dashboardMetrics.overtime.target}س</span>
            </div>
            <Progress value={(dashboardMetrics.overtime.value / dashboardMetrics.overtime.target) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-primary" />
              <span>اتجاهات الحضور الشهرية</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="attendance" stackId="1" stroke="#3CB593" fill="#3CB593" fillOpacity={0.6} />
                <Area type="monotone" dataKey="tardiness" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>أداء الأقسام</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentAttendance.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{dept.department}</div>
                    <div className="text-sm text-gray-500">{dept.employees} موظف</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold">{dept.attendance}%</div>
                      <div className="text-sm text-gray-500">{dept.avgHours}س متوسط</div>
                    </div>
                    <Progress value={dept.attendance} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>إجراءات سريعة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-200"
              onClick={() => setIsNewRecordOpen(true)}
            >
              <Plus className="h-6 w-6 text-green-600" />
              <span className="text-sm">تسجيل حضور</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => setIsNewShiftOpen(true)}
            >
              <Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-sm">إدارة الورديات</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-200"
              onClick={() => setActiveTab('reports')}
            >
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-sm">تقارير فورية</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-200"
              onClick={() => setIsAIAnalysisOpen(true)}
            >
              <Brain className="h-6 w-6 text-orange-600" />
              <span className="text-sm">تحليل ذكي</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAttendanceCenter = () => (
    <div className="space-y-6">
      {selectedAttendanceType ? (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedAttendanceType(null)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>العودة لمركز الحضور</span>
            </Button>
          </div>
          
          {/* Selected Type Details */}
          {renderAttendanceTypeDetails(selectedAttendanceType)}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">مركز الحضور</h3>
            <p className="text-gray-600">اختر نوع المتابعة المطلوبة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceTypes.map((type) => (
              <Card 
                key={type.type}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setSelectedAttendanceType(type.type)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center mb-4`}>
                    <type.icon className={`h-6 w-6 ${type.color}`} />
                  </div>
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{type.count}</div>
                      <div className="text-sm text-gray-500">إجمالي السجلات</div>
                    </div>
                    <div className={`text-sm font-medium ${type.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {type.trend}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAttendanceTypeDetails = (type: string) => {
    const typeData = attendanceTypes.find(t => t.type === type);
    if (!typeData) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg ${typeData.bgColor} flex items-center justify-center`}>
                  <typeData.icon className={`h-6 w-6 ${typeData.color}`} />
                </div>
                <div>
                  <CardTitle>{typeData.name}</CardTitle>
                  <p className="text-gray-600">{typeData.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </Button>
                <Button size="sm" className="bg-primary text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة جديد
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input placeholder="البحث..." />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  فلترة
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الموظف</TableHead>
                    <TableHead>القسم</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الدخول</TableHead>
                    <TableHead>الخروج</TableHead>
                    <TableHead>ساعات العمل</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.workHours}س</TableCell>
                      <TableCell>{getAttendanceStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderShiftManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">إدارة الورديات</h3>
          <p className="text-gray-600">إنشاء وإدارة جداول العمل والورديات</p>
        </div>
        <Button onClick={() => setIsNewShiftOpen(true)} className="bg-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          إضافة وردية جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {shiftSchedules.map((shift) => (
          <Card key={shift.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{shift.name}</CardTitle>
                <Badge variant="secondary">{shift.employees} موظف</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">وقت البداية</div>
                    <div className="font-semibold">{shift.startTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">وقت النهاية</div>
                    <div className="font-semibold">{shift.endTime}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-sm">فترة الراحة</div>
                  <div className="font-semibold">{shift.breakTime}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-sm mb-2">الأقسام</div>
                  <div className="flex flex-wrap gap-1">
                    {shift.departments.map((dept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Clock */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-primary" />
            <span>الساعة الحية</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">{new Date().toLocaleTimeString('ar-SA')}</div>
            <div className="text-lg text-gray-600">{new Date().toLocaleDateString('ar-SA')}</div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600">85</div>
                <div className="text-sm text-gray-500">حاضر الآن</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-orange-600">3</div>
                <div className="text-sm text-gray-500">متأخر</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-red-600">2</div>
                <div className="text-sm text-gray-500">غائب</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">التقارير والتحليلات</h3>
          <p className="text-gray-600">إنشاء وتصدير تقارير الحضور المختلفة</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            طباعة
          </Button>
          <Button className="bg-primary text-white">
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>تقرير الحضور الشهري</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">تقرير شامل للحضور والانصراف الشهري</p>
            <Button variant="outline" className="w-full">
              إنشاء التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>تقرير الأقسام</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">مقارنة أداء الحضور بين الأقسام</p>
            <Button variant="outline" className="w-full">
              إنشاء التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>تقرير العمل الإضافي</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">تحليل ساعات العمل الإضافي والتكاليف</p>
            <Button variant="outline" className="w-full">
              إنشاء التقرير
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">إعدادات الحضور</h3>
        <p className="text-gray-600">تكوين سياسات وقواعد الحضور والانصراف</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سياسات الحضور</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>عدد دقائق السماح للتأخير</Label>
              <Input type="number" defaultValue="15" />
            </div>
            <div>
              <Label>ساعات العمل اليومية المطلوبة</Label>
              <Input type="number" defaultValue="8" />
            </div>
            <div>
              <Label>حد الغياب الشهري المسموح</Label>
              <Input type="number" defaultValue="3" />
            </div>
            <Button className="w-full bg-primary text-white">
              <Save className="h-4 w-4 mr-2" />
              حفظ الإعدادات
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>سلسلة الموافقات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>موافقة المدير المباشر</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="required">مطلوب</SelectItem>
                  <SelectItem value="optional">اختياري</SelectItem>
                  <SelectItem value="disabled">معطل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>موافقة الموارد البشرية</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="required">مطلوب</SelectItem>
                  <SelectItem value="optional">اختياري</SelectItem>
                  <SelectItem value="disabled">معطل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-primary text-white">
              <Save className="h-4 w-4 mr-2" />
              حفظ سلسلة الموافقات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Integration Section
  const renderIntegration = () => (
    <div className="space-y-6">
      {/* Integration Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">التكامل مع الأنظمة</h2>
        <p className="text-gray-600">ربط تلقائي لنظام الحضور مع الرواتب والتقييم والإجازات</p>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Payroll Integration */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-green-100">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">نظام الرواتب</CardTitle>
            <p className="text-sm text-gray-600">ربط تلقائي مع حسابات الراتب</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">العمل الإضافي</span>
              <Badge className="bg-green-100 text-green-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">خصم الغياب</span>
              <Badge className="bg-green-100 text-green-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">خصم التأخير</span>
              <Badge className="bg-green-100 text-green-700">مُفعل</Badge>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-900">آخر تحديث</div>
              <div className="text-xs text-gray-600">2024-12-19 14:30</div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Settings className="h-4 w-4 mr-2" />
              إعدادات الربط
            </Button>
          </CardContent>
        </Card>

        {/* Performance Integration */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">تقييم الأداء</CardTitle>
            <p className="text-sm text-gray-600">ربط مؤشرات الحضور بالتقييم</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">مؤشر الالتزام</span>
              <Badge className="bg-blue-100 text-blue-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">مؤشر الانضباط</span>
              <Badge className="bg-blue-100 text-blue-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ساعات العمل الفعلية</span>
              <Badge className="bg-blue-100 text-blue-700">مُفعل</Badge>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-900">معدل الأداء</div>
              <div className="text-lg font-bold text-blue-600">94.5%</div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Target className="h-4 w-4 mr-2" />
              إعدادات المؤشرات
            </Button>
          </CardContent>
        </Card>

        {/* Leave Integration */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-purple-100">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">إدارة الإجازات</CardTitle>
            <p className="text-sm text-gray-600">تحديث أرصدة الإجازات تلقائياً</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">الإجازات السنوية</span>
              <Badge className="bg-purple-100 text-purple-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">الإجازات المرضية</span>
              <Badge className="bg-purple-100 text-purple-700">مُفعل</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">إجازات الطوارئ</span>
              <Badge className="bg-purple-100 text-purple-700">مُفعل</Badge>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-900">الرصيد المتاح</div>
              <div className="text-lg font-bold text-purple-600">22 يوم</div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              إعدادات الإجازات
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Integration Rules */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-primary" />
            <span>قواعد التكامل التلقائي</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payroll Rules */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 border-b pb-2">قواعد الرواتب</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">العمل الإضافي</div>
                    <div className="text-xs text-gray-600">بعد 8 ساعات يومياً</div>
                  </div>
                  <div className="text-green-600 font-semibold">+50%</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">خصم الغياب</div>
                    <div className="text-xs text-gray-600">غياب بدون إذن</div>
                  </div>
                  <div className="text-red-600 font-semibold">-يوم كامل</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">خصم التأخير</div>
                    <div className="text-xs text-gray-600">أكثر من 15 دقيقة</div>
                  </div>
                  <div className="text-orange-600 font-semibold">-نسبي</div>
                </div>
              </div>
            </div>

            {/* Performance Rules */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 border-b pb-2">قواعد التقييم</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">مؤشر الالتزام</div>
                    <div className="text-xs text-gray-600">معدل الحضور الشهري</div>
                  </div>
                  <div className="text-blue-600 font-semibold">KPI</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">مؤشر الانضباط</div>
                    <div className="text-xs text-gray-600">التأخير والانصراف المبكر</div>
                  </div>
                  <div className="text-indigo-600 font-semibold">KRI</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">الإنتاجية</div>
                    <div className="text-xs text-gray-600">ساعات العمل الفعلية</div>
                  </div>
                  <div className="text-cyan-600 font-semibold">KQI</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status Dashboard */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>حالة التكامل المباشر</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">248</div>
              <div className="text-sm text-gray-600">سجل راتب محدث</div>
              <div className="text-xs text-green-600 mt-1">آخر ساعة</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">مؤشر أداء محدث</div>
              <div className="text-xs text-blue-600 mt-1">آخر ساعة</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">32</div>
              <div className="text-sm text-gray-600">رصيد إجازة محدث</div>
              <div className="text-xs text-purple-600 mt-1">آخر ساعة</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">99.8%</div>
              <div className="text-sm text-gray-600">معدل نجاح التكامل</div>
              <div className="text-xs text-gray-600 mt-1">24 ساعة الماضية</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-primary text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث جميع الأنظمة
        </Button>
        <Button variant="outline">
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          تصدير تقرير التكامل
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          إعدادات التكامل المتقدمة
        </Button>
        <Button variant="outline">
          <Brain className="h-4 w-4 mr-2" />
          تحليل ذكي للتكامل
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>العودة</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">نظام الحضور والانصراف</h1>
              <p className="text-gray-600">إدارة شاملة للحضور وأوقات العمل</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsAIAnalysisOpen(true)}>
              <Brain className="h-4 w-4 mr-2" />
              التحليل الذكي
            </Button>
            <Button className="bg-primary text-white">
              <Settings className="h-4 w-4 mr-2" />
              الإعدادات
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 bg-gray-50/50 px-6">
              <TabsList className="grid w-full grid-cols-6 bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>لوحة القيادة</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance-center"
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <Clock className="h-4 w-4" />
                  <span>مركز الحضور</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="shift-management"
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <Calendar className="h-4 w-4" />
                  <span>إدارة الورديات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports"
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <FileText className="h-4 w-4" />
                  <span>التقارير</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="integration"
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <Database className="h-4 w-4" />
                  <span>التكامل</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-primary"
                >
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="dashboard" className="m-0">
                {renderDashboard()}
              </TabsContent>
              
              <TabsContent value="attendance-center" className="m-0">
                {renderAttendanceCenter()}
              </TabsContent>
              
              <TabsContent value="shift-management" className="m-0">
                {renderShiftManagement()}
              </TabsContent>
              
              <TabsContent value="reports" className="m-0">
                {renderReports()}
              </TabsContent>
              
              <TabsContent value="integration" className="m-0">
                {renderIntegration()}
              </TabsContent>
              
              <TabsContent value="settings" className="m-0">
                {renderSettings()}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* AI Analysis Dialog */}
        <Dialog open={isAIAnalysisOpen} onOpenChange={setIsAIAnalysisOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>التحليل الذكي للحضور</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {aiInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          insight.type === 'risk' ? 'bg-red-100 text-red-600' :
                          insight.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {insight.type === 'risk' ? <AlertCircle className="h-4 w-4" /> :
                           insight.type === 'opportunity' ? <Target className="h-4 w-4" /> :
                           <Activity className="h-4 w-4" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <Badge variant={insight.priority === 'عالي' ? 'destructive' : 'secondary'}>
                            {insight.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">الإجراء المقترح:</div>
                      <p className="text-sm text-gray-600">{insight.action}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* New Record Dialog */}
        <Dialog open={isNewRecordOpen} onOpenChange={setIsNewRecordOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة سجل حضور جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>الموظف</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp1">أحمد محمد علي</SelectItem>
                    <SelectItem value="emp2">فاطمة أحمد السعيد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>وقت الدخول</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label>وقت الخروج</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label>الملاحظات</Label>
                <Textarea placeholder="ملاحظات إضافية..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewRecordOpen(false)}>
                  إلغاء
                </Button>
                <Button className="bg-primary text-white">
                  حفظ
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Shift Dialog */}
        <Dialog open={isNewShiftOpen} onOpenChange={setIsNewShiftOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة وردية جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>اسم الوردية</Label>
                <Input placeholder="مثال: الدوام الصباحي المرن" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>وقت البداية</Label>
                  <Input type="time" />
                </div>
                <div>
                  <Label>وقت النهاية</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label>فترة الراحة</Label>
                <Input placeholder="مثال: 12:00-13:00" />
              </div>
              <div>
                <Label>الأقسام المشمولة</Label>
                <Textarea placeholder="حدد الأقسام المشمولة في هذه الوردية..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewShiftOpen(false)}>
                  إلغاء
                </Button>
                <Button className="bg-primary text-white">
                  حفظ الوردية
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};