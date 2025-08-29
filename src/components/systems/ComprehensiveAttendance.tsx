import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, Users, MapPin, Calendar, AlertTriangle, CheckCircle,
  Download, FileText, Search, Filter, Plus, Edit, Eye, Trash2,
  ArrowLeft, RefreshCw, BarChart3, TrendingUp, Timer, User,
  Building, Smartphone, Fingerprint, Globe, Shield
} from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  workingHours: number;
  overtimeHours: number;
  status: 'present' | 'absent' | 'late' | 'early_leave' | 'remote';
  checkInMethod: 'gps' | 'fingerprint' | 'manual' | 'facial_recognition';
  checkInLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  checkOutLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  notes?: string;
  approvedBy?: string;
  createdAt: Date;
}

interface ComprehensiveAttendanceProps {
  onBack?: () => void;
}

export const ComprehensiveAttendance: React.FC<ComprehensiveAttendanceProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<{[key: string]: boolean}>({});

  // Mock data
  const mockRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات',
      date: new Date(),
      checkInTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
      checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
      workingHours: 8,
      overtimeHours: 1,
      status: 'present',
      checkInMethod: 'gps',
      checkInLocation: {
        lat: 24.7136,
        lng: 46.6753,
        address: 'الرياض، المملكة العربية السعودية'
      },
      createdAt: new Date()
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'سارة المطيري',
      department: 'المالية',
      position: 'محاسبة مالية',
      date: new Date(),
      checkInTime: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
      workingHours: 7.5,
      overtimeHours: 0,
      status: 'late',
      checkInMethod: 'fingerprint',
      createdAt: new Date()
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'محمد الخالدي',
      department: 'التسويق',
      position: 'مختص تسويق',
      date: new Date(),
      workingHours: 0,
      overtimeHours: 0,
      status: 'absent',
      checkInMethod: 'manual',
      notes: 'مريض',
      createdAt: new Date()
    },
    {
      id: '4',
      employeeId: 'EMP004',
      employeeName: 'فاطمة عبدالله',
      department: 'الموارد البشرية',
      position: 'أخصائية موارد بشرية',
      date: new Date(),
      checkInTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
      workingHours: 8,
      overtimeHours: 0,
      status: 'remote',
      checkInMethod: 'gps',
      checkInLocation: {
        lat: 21.4225,
        lng: 39.8262,
        address: 'جدة، المملكة العربية السعودية'
      },
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
  }, []);

  // Filter records
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Statistics
  const stats = {
    total: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    late: records.filter(r => r.status === 'late').length,
    remote: records.filter(r => r.status === 'remote').length,
    earlyLeave: records.filter(r => r.status === 'early_leave').length,
    avgWorkingHours: records.reduce((sum, r) => sum + r.workingHours, 0) / records.length || 0,
    totalOvertime: records.reduce((sum, r) => sum + r.overtimeHours, 0)
  };

  // Status card click handlers
  const handleStatusCardClick = (status: string) => {
    const statusRecords = records.filter(r => r.status === status);
    setShowDetails(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const handleExportPDF = async () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Attendance Report', 20, 30);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString('ar-SA')}`, 20, 45);
      
      let yPos = 65;
      filteredRecords.forEach((record, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.text(`${index + 1}. ${record.employeeName}`, 20, yPos);
        doc.text(`Department: ${record.department}`, 30, yPos + 10);
        doc.text(`Status: ${record.status}`, 30, yPos + 20);
        doc.text(`Working Hours: ${record.workingHours}`, 30, yPos + 30);
        
        yPos += 50;
      });
      
      doc.save('attendance-report.pdf');
      
      toast({
        title: "تم تصدير التقرير بنجاح",
        description: "تم تحميل ملف PDF لسجلات الحضور"
      });
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير التقرير"
      });
    }
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Employee Name', 'Department', 'Status', 'Check In', 'Check Out', 'Working Hours'].join(','),
      ...filteredRecords.map(record => [
        `"${record.employeeName}"`,
        `"${record.department}"`,
        `"${record.status}"`,
        record.checkInTime ? format(record.checkInTime, 'HH:mm') : 'N/A',
        record.checkOutTime ? format(record.checkOutTime, 'HH:mm') : 'N/A',
        record.workingHours.toString()
      ].join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'attendance-report.csv';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم تصدير البيانات بنجاح",
      description: "تم تحميل ملف Excel لسجلات الحضور"
    });
  };

  const handleRefreshData = () => {
    setRecords([...mockRecords]);
    toast({
      title: "تم تحديث البيانات",
      description: "تم تحديث سجلات الحضور بنجاح"
    });
  };

  const handleViewRecord = (record: AttendanceRecord) => {
    alert(`عرض تفاصيل سجل الحضور للموظف: ${record.employeeName}`);
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    alert(`تعديل سجل الحضور للموظف: ${record.employeeName}`);
  };

  const getStatusIcon = (method: string) => {
    switch (method) {
      case 'gps':
        return <MapPin className="h-4 w-4" />;
      case 'fingerprint':
        return <Fingerprint className="h-4 w-4" />;
      case 'facial_recognition':
        return <User className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      present: { label: 'حاضر', className: 'bg-green-100 text-green-800' },
      absent: { label: 'غائب', className: 'bg-red-100 text-red-800' },
      late: { label: 'متأخر', className: 'bg-yellow-100 text-yellow-800' },
      remote: { label: 'عمل عن بعد', className: 'bg-blue-100 text-blue-800' },
      early_leave: { label: 'انصراف مبكر', className: 'bg-orange-100 text-orange-800' }
    };
    
    const statusConfig = config[status as keyof typeof config] || config.present;
    
    return (
      <Badge className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#009F87]/10 rounded-lg">
              <Clock className="h-6 w-6 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#009F87]">الحضور والانصراف</h1>
              <p className="text-muted-foreground">متابعة حضور الموظفين وإدارة السجلات اليومية</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExportPDF()}
          >
            <FileText className="h-4 w-4 ml-2" />
            PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExportExcel()}
          >
            <Download className="h-4 w-4 ml-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleRefreshData()}>
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="daily">السجلات اليومية</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Daily Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStatusCardClick('present')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">الحضور</p>
                    <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStatusCardClick('absent')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">الغياب</p>
                    <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStatusCardClick('late')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">التأخير</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Timer className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleStatusCardClick('remote')}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">عمل عن بعد</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.remote}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Employee Lists for Each Status */}
          {Object.entries(showDetails).map(([status, isVisible]) => {
            if (!isVisible) return null;
            
            const statusRecords = records.filter(r => r.status === status);
            const statusLabels = {
              present: 'الموظفين الحاضرين',
              absent: 'الموظفين الغائبين',
              late: 'الموظفين المتأخرين',
              remote: 'الموظفين العاملين عن بعد'
            };
            
            return (
              <Card key={status}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {statusLabels[status as keyof typeof statusLabels]}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowDetails(prev => ({ ...prev, [status]: false }))}
                    >
                      إخفاء
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusRecords.map(record => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-[#009F87]" />
                          </div>
                          <div>
                            <p className="font-medium">{record.employeeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {record.employeeId} - {record.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          {record.checkInTime && (
                            <p className="text-sm">دخول: {format(record.checkInTime, 'HH:mm')}</p>
                          )}
                          {record.checkOutTime && (
                            <p className="text-sm">خروج: {format(record.checkOutTime, 'HH:mm')}</p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(record.checkInMethod)}
                            <span className="text-xs text-muted-foreground">
                              {record.checkInMethod === 'gps' ? 'GPS' :
                               record.checkInMethod === 'fingerprint' ? 'بصمة' :
                               record.checkInMethod === 'facial_recognition' ? 'تعرف وجه' : 'يدوي'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="daily" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في السجلات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="حالة الحضور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="present">حاضر</SelectItem>
                    <SelectItem value="absent">غائب</SelectItem>
                    <SelectItem value="late">متأخر</SelectItem>
                    <SelectItem value="remote">عمل عن بعد</SelectItem>
                    <SelectItem value="early_leave">انصراف مبكر</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأقسام</SelectItem>
                    <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                    <SelectItem value="المالية">المالية</SelectItem>
                    <SelectItem value="التسويق">التسويق</SelectItem>
                    <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Daily Records Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                سجلات الحضور اليومية ({filteredRecords.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-3">الموظف</th>
                      <th className="text-right p-3">القسم</th>
                      <th className="text-right p-3">وقت الدخول</th>
                      <th className="text-right p-3">وقت الخروج</th>
                      <th className="text-right p-3">ساعات العمل</th>
                      <th className="text-right p-3">الحالة</th>
                      <th className="text-right p-3">طريقة التسجيل</th>
                      <th className="text-right p-3">الموقع</th>
                      <th className="text-center p-3">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-[#009F87]" />
                            </div>
                            <div>
                              <p className="font-medium">{record.employeeName}</p>
                              <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{record.department}</td>
                        <td className="p-3">
                          {record.checkInTime ? format(record.checkInTime, 'HH:mm') : '-'}
                        </td>
                        <td className="p-3">
                          {record.checkOutTime ? format(record.checkOutTime, 'HH:mm') : '-'}
                        </td>
                        <td className="p-3">
                          <div>
                            <span className="font-medium">{record.workingHours}h</span>
                            {record.overtimeHours > 0 && (
                              <span className="text-sm text-blue-600 mr-2">
                                (+{record.overtimeHours}h)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">{getStatusBadge(record.status)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.checkInMethod)}
                            <span className="text-sm">
                              {record.checkInMethod === 'gps' ? 'GPS' :
                               record.checkInMethod === 'fingerprint' ? 'بصمة' :
                               record.checkInMethod === 'facial_recognition' ? 'تعرف وجه' : 'يدوي'}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          {record.checkInLocation ? (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground truncate max-w-[100px]">
                                {record.checkInLocation.address}
                              </span>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleViewRecord(record)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditRecord(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>تقارير الحضور والانصراف</CardTitle>
            </CardHeader>
            <CardContent>
              <p>قريباً - تقارير مفصلة وتحليلات الحضور</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الحضور</CardTitle>
            </CardHeader>
            <CardContent>
              <p>قريباً - إعدادات نظام الحضور والانصراف</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};