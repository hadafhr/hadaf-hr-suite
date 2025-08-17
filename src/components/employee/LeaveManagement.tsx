import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Calendar as CalendarIcon,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  BarChart3,
  Heart,
  Plane,
  Stethoscope,
  Baby,
  GraduationCap,
  Search,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  documents?: string[];
  managerComments?: string;
}

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  annual: { total: number; used: number; remaining: number };
  sick: { total: number; used: number; remaining: number };
  emergency: { total: number; used: number; remaining: number };
  maternity: { total: number; used: number; remaining: number };
  paternity: { total: number; used: number; remaining: number };
  study: { total: number; used: number; remaining: number };
}

const LeaveManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  // Leave types according to Saudi Labor Law
  const leaveTypes = [
    { id: 'annual', name: 'إجازة سنوية', icon: Plane, color: 'text-blue-600', maxDays: 30 },
    { id: 'sick', name: 'إجازة مرضية', icon: Stethoscope, color: 'text-red-600', maxDays: 30 },
    { id: 'emergency', name: 'إجازة طارئة', icon: AlertTriangle, color: 'text-orange-600', maxDays: 5 },
    { id: 'maternity', name: 'إجازة أمومة', icon: Baby, color: 'text-pink-600', maxDays: 70 },
    { id: 'paternity', name: 'إجازة أبوة', icon: Heart, color: 'text-green-600', maxDays: 3 },
    { id: 'study', name: 'إجازة دراسية', icon: GraduationCap, color: 'text-purple-600', maxDays: 365 }
  ];

  // Mock leave requests
  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: 'LR001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      leaveType: 'annual',
      startDate: '2024-04-15',
      endDate: '2024-04-20',
      days: 5,
      reason: 'سفر عائلي',
      status: 'pending',
      submittedDate: '2024-03-20',
      documents: ['medical-certificate.pdf']
    },
    {
      id: 'LR002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سعد الأحمد',
      department: 'المالية',
      leaveType: 'sick',
      startDate: '2024-03-25',
      endDate: '2024-03-27',
      days: 3,
      reason: 'حالة مرضية طارئة',
      status: 'approved',
      submittedDate: '2024-03-24',
      approvedBy: 'محمد السالم',
      approvedDate: '2024-03-24',
      documents: ['medical-report.pdf']
    },
    {
      id: 'LR003',
      employeeId: 'EMP003',
      employeeName: 'خالد يوسف النمر',
      department: 'المبيعات',
      leaveType: 'emergency',
      startDate: '2024-03-22',
      endDate: '2024-03-22',
      days: 1,
      reason: 'ظروف عائلية طارئة',
      status: 'rejected',
      submittedDate: '2024-03-21',
      rejectionReason: 'عدم توفر الوثائق المطلوبة'
    }
  ]);

  // Mock leave balances
  const [leaveBalances] = useState<LeaveBalance[]>([
    {
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      annual: { total: 30, used: 12, remaining: 18 },
      sick: { total: 30, used: 3, remaining: 27 },
      emergency: { total: 5, used: 1, remaining: 4 },
      maternity: { total: 0, used: 0, remaining: 0 },
      paternity: { total: 3, used: 0, remaining: 3 },
      study: { total: 0, used: 0, remaining: 0 }
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'في انتظار الموافقة', icon: Clock },
      'approved': { color: 'bg-green-100 text-green-800 border-green-200', text: 'موافق', icon: CheckCircle },
      'rejected': { color: 'bg-red-100 text-red-800 border-red-200', text: 'مرفوض', icon: XCircle },
      'cancelled': { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'ملغي', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getLeaveTypeInfo = (typeId: string) => {
    return leaveTypes.find(type => type.id === typeId) || leaveTypes[0];
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.leaveType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const calculateStats = () => {
    return {
      total: leaveRequests.length,
      pending: leaveRequests.filter(r => r.status === 'pending').length,
      approved: leaveRequests.filter(r => r.status === 'approved').length,
      rejected: leaveRequests.filter(r => r.status === 'rejected').length,
      totalDays: leaveRequests.reduce((sum, r) => sum + r.days, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <CalendarIcon className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام إدارة الإجازات</h1>
            <p className="text-muted-foreground">إدارة شاملة لطلبات الإجازات وأرصدة الموظفين</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                <Plus className="h-4 w-4 ml-2" />
                طلب إجازة جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-[#009F87]">طلب إجازة جديد</DialogTitle>
                <DialogDescription>
                  املأ البيانات المطلوبة لتقديم طلب الإجازة
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employee">الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                        <SelectItem value="EMP002">فاطمة سعد الأحمد</SelectItem>
                        <SelectItem value="EMP003">خالد يوسف النمر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="leaveType">نوع الإجازة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الإجازة" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${type.color}`} />
                                {type.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>تاريخ البداية</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>تاريخ النهاية</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, 'PPP', { locale: ar }) : 'اختر التاريخ'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">سبب الإجازة</Label>
                  <Textarea placeholder="اذكر سبب طلب الإجازة..." />
                </div>

                <div>
                  <Label htmlFor="documents">المرفقات (اختياري)</Label>
                  <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                    إلغاء
                  </Button>
                  <Button 
                    className="bg-[#009F87] hover:bg-[#008072] text-white"
                    onClick={() => {
                      toast.success('تم تقديم طلب الإجازة بنجاح');
                      setIsNewRequestOpen(false);
                    }}
                  >
                    تقديم الطلب
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.total}</div>
            <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">في الانتظار</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-muted-foreground">موافق عليها</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-red-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-muted-foreground">مرفوضة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.totalDays}</div>
            <div className="text-sm text-muted-foreground">إجمالي الأيام</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="relative bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث عن موظف أو رقم الطلب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#009F87]/20 focus:border-[#009F87]"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 border-[#009F87]/20 focus:border-[#009F87]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في الانتظار</SelectItem>
                <SelectItem value="approved">موافق</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 border-[#009F87]/20 focus:border-[#009F87]">
                <SelectValue placeholder="نوع الإجازة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                {leaveTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests */}
      <Card className="relative bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <FileText className="h-6 w-6" />
            طلبات الإجازات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات إجازات</p>
              </div>
            ) : (
              filteredRequests.map((request, index) => {
                const leaveTypeInfo = getLeaveTypeInfo(request.leaveType);
                const Icon = leaveTypeInfo.icon;
                
                return (
                  <Card 
                    key={request.id} 
                    className="hover:shadow-md transition-all animate-fade-in hover:scale-[1.02]"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 ${leaveTypeInfo.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{request.employeeId} - {request.department}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={leaveTypeInfo.color}>
                                {leaveTypeInfo.name}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {request.days} يوم
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">من</div>
                            <div className="font-semibold">{request.startDate}</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">إلى</div>
                            <div className="font-semibold">{request.endDate}</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">تاريخ التقديم</div>
                            <div className="font-semibold">{request.submittedDate}</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground mb-1">الحالة</div>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                              <Eye className="h-4 w-4 ml-1" />
                              عرض
                            </Button>
                            {request.status === 'pending' && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  <CheckCircle className="h-4 w-4 ml-1" />
                                  موافقة
                                </Button>
                                <Button variant="destructive" size="sm">
                                  <XCircle className="h-4 w-4 ml-1" />
                                  رفض
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">السبب: </span>
                          {request.reason}
                        </p>
                        {request.rejectionReason && (
                          <p className="text-sm text-red-600 mt-2">
                            <span className="font-medium">سبب الرفض: </span>
                            {request.rejectionReason}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Employee Leave Balances */}
      <Card className="relative bg-white/80 backdrop-blur border-[#009F87]/20 animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#009F87]">
            <Users className="h-6 w-6" />
            أرصدة الإجازات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveBalances.map((balance) => (
              <Card key={balance.employeeId} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{balance.employeeName}</h3>
                    <Badge variant="outline">{balance.employeeId}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(balance).filter(([key]) => key !== 'employeeId' && key !== 'employeeName').map(([key, data]) => {
                      const leaveType = leaveTypes.find(type => type.id === key);
                      if (!leaveType) return null;
                      
                      const Icon = leaveType.icon;
                      const percentage = data.total > 0 ? (data.remaining / data.total) * 100 : 0;
                      
                      return (
                        <div key={key} className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            <Icon className={`h-5 w-5 ${leaveType.color}`} />
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">{leaveType.name}</div>
                          <div className="font-semibold text-sm">
                            {data.remaining}/{data.total}
                          </div>
                          <Progress value={percentage} className="h-1 mt-1" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagement;