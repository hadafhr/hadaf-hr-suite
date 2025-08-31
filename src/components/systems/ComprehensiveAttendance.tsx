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
  Building, Smartphone, Fingerprint, Globe, Shield, Bot, Settings,
  PieChart
} from 'lucide-react';
import { format } from 'date-fns';

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
      department: 'المبيعات',
      position: 'مندوب مبيعات',
      date: new Date(),
      workingHours: 0,
      overtimeHours: 0,
      status: 'remote',
      checkInMethod: 'manual',
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    setRecords(mockRecords);
  }, []);

  const handleSystemAction = (action: string) => {
    toast({ title: "تم تنفيذ الإجراء", description: `${action} - سيتم تطويره قريباً` });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'present': 'bg-green-500/20 text-green-700 border-green-200',
      'absent': 'bg-red-500/20 text-red-700 border-red-200',
      'late': 'bg-yellow-500/20 text-yellow-700 border-yellow-200',
      'early_leave': 'bg-orange-500/20 text-orange-700 border-orange-200',
      'remote': 'bg-blue-500/20 text-blue-700 border-blue-200'
    };
    
    return (
      <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-500/20 text-gray-700'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-foreground rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/20 backdrop-blur rounded-2xl shadow-xl">
                  <Clock className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">نظام الحضور والانصراف الشامل</h1>
                  <p className="text-white/90 text-lg">
                    نظام متطور لإدارة حضور الموظفين مع تتبع الموقع والذكاء الاصطناعي
                  </p>
                  <div className="flex gap-4 mt-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">تتبع GPS</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">بصمة الوجه</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">تقارير متقدمة</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('مساعد الذكاء الاصطناعي')}
                >
                  <Bot className="w-5 h-5" />
                  مساعد ذكي
                </Button>
                <Button 
                  className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                  onClick={() => handleSystemAction('تقرير شامل')}
                >
                  <FileText className="w-5 h-5" />
                  تقرير شامل
                </Button>
                {onBack && (
                  <Button 
                    className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur"
                    onClick={onBack}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    رجوع
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold">{records.length}</p>
                  <p className="text-white/70 text-xs mt-1">حاضر اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">حضور منتظم</p>
                  <p className="text-3xl font-bold">{records.filter(r => r.status === 'present').length}</p>
                  <p className="text-white/70 text-xs mt-1">95% معدل الحضور</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">ساعات إضافية</p>
                  <p className="text-3xl font-bold">{records.reduce((sum, r) => sum + r.overtimeHours, 0)}</p>
                  <p className="text-white/70 text-xs mt-1">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">تأخير</p>
                  <p className="text-3xl font-bold">{records.filter(r => r.status === 'late').length}</p>
                  <p className="text-white/70 text-xs mt-1">حالات التأخير</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">عمل عن بُعد</p>
                  <p className="text-3xl font-bold">{records.filter(r => r.status === 'remote').length}</p>
                  <p className="text-white/70 text-xs mt-1">اليوم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">في المكتب</p>
                  <p className="text-3xl font-bold">{records.filter(r => r.checkInMethod === 'gps').length}</p>
                  <p className="text-white/70 text-xs mt-1">تسجيل GPS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <PieChart className="w-7 h-7" />
              نظرة عامة على النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {[
                { icon: Clock, label: 'الحضور اليومي', color: 'text-blue-600', bg: 'bg-blue-100' },
                { icon: Calendar, label: 'جدولة النوبات', color: 'text-green-600', bg: 'bg-green-100' },
                { icon: MapPin, label: 'تتبع الموقع', color: 'text-purple-600', bg: 'bg-purple-100' },
                { icon: Fingerprint, label: 'البصمة', color: 'text-yellow-600', bg: 'bg-yellow-100' },
                { icon: Smartphone, label: 'التطبيق المحمول', color: 'text-indigo-600', bg: 'bg-indigo-100' },
                { icon: BarChart3, label: 'التقارير', color: 'text-red-600', bg: 'bg-red-100' },
                { icon: Shield, label: 'الأمان', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                { icon: RefreshCw, label: 'المزامنة', color: 'text-orange-600', bg: 'bg-orange-100' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-primary/30"
                  onClick={() => handleSystemAction(item.label)}
                >
                  <div className={`p-3 rounded-xl ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium mt-2 text-center text-gray-700 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Navigation Tabs */}
        <Card className="bg-white/90 backdrop-blur shadow-xl border-0">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-primary/10 to-primary/5 p-2 rounded-none h-auto border-b">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">لوحة التحكم</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="attendance" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">سجل الحضور</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="shifts" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">إدارة النوبات</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="location" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">تتبع الموقع</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">التقارير</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">الإعدادات</span>
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Clock className="w-5 h-5" />
                        نشاط الحضور اليومي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الحضور في الوقت</span>
                          <span className="font-bold text-green-600">92%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">التأخير</span>
                          <span className="font-bold text-yellow-600">5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">الغياب</span>
                          <span className="font-bold text-red-600">3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700">
                        <Timer className="w-5 h-5" />
                        الساعات الإضافية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">{records.reduce((sum, r) => sum + r.overtimeHours, 0)}</p>
                          <p className="text-sm text-gray-500">ساعة إضافية هذا الشهر</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط الساعات الإضافية:</span>
                          <span className="font-medium">2.5 ساعة/يوم</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Other tabs with placeholder content */}
              <TabsContent value="attendance" className="p-6">
                <div className="space-y-4">
                  {records.map((record) => (
                    <Card key={record.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{record.employeeName}</h4>
                            <p className="text-gray-600">{record.department} - {record.position}</p>
                            <div className="flex gap-4 text-sm">
                              <span>دخول: {record.checkInTime ? format(record.checkInTime, 'HH:mm') : 'لم يسجل'}</span>
                              <span>خروج: {record.checkOutTime ? format(record.checkOutTime, 'HH:mm') : 'لم يسجل'}</span>
                              <span>ساعات العمل: {record.workingHours}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            {getStatusBadge(record.status)}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Placeholder tabs */}
              <TabsContent value="shifts" className="p-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">إدارة النوبات</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="location" className="p-6">
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">تتبع الموقع</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="p-6">
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">التقارير المتقدمة</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">إعدادات النظام</h3>
                  <p className="text-gray-500">سيتم تطوير هذا القسم قريبًا</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
