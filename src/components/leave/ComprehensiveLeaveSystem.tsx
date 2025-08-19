import React, { useState, useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  Users,
  TrendingUp,
  BarChart3,
  Heart,
  Plane,
  Stethoscope,
  Baby,
  GraduationCap,
  Search,
  Filter,
  User,
  Briefcase,
  Home,
  BellRing,
  Calendar as CalendarDays,
  Star,
  AlertCircle,
  ChevronRight,
  Settings,
  MapPin,
  Phone
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface LeaveType {
  id: string;
  code: string;
  name_ar: string;
  name_en: string;
  description_ar?: string;
  max_days_per_year: number;
  is_paid: boolean;
  requires_medical_certificate: boolean;
  gender_restriction: string;
  minimum_service_years: number;
}

interface Holiday {
  id: string;
  name_ar: string;
  name_en: string;
  gregorian_date?: string;
  hijri_date?: string;
  duration_days: number;
  holiday_type: string;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type_code: string;
  start_date: string;
  end_date: string;
  total_days: number;
  working_days: number;
  reason: string;
  status: string;
  priority: string;
  created_at: string;
  attachments?: any;
  manager_comments?: string;
  hr_comments?: string;
  rejection_reason?: string;
}

interface LeaveBalance {
  id: string;
  employee_id: string;
  leave_type_code: string;
  total_entitled: number;
  used_days: number;
  pending_days: number;
  remaining_days: number;
  carried_forward: number;
  year: number;
}

interface AIInsight {
  id: string;
  insight_type: string;
  severity: string;
  title: string;
  description: string;
  recommendations: any;
  is_read: boolean;
  created_at: string;
}

export const ComprehensiveLeaveSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [newRequestForm, setNewRequestForm] = useState({
    leave_type_code: '',
    start_date: '',
    end_date: '',
    reason: '',
    priority: 'normal' as const,
    delegate_employee_id: '',
    delegate_instructions: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchLeaveTypes(),
        fetchHolidays(), 
        fetchLeaveRequests(),
        fetchLeaveBalances(),
        fetchAIInsights()
      ]);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveTypes = async () => {
    const { data, error } = await supabase
      .from('saudi_leave_types')
      .select('*')
      .eq('is_active', true)
      .order('name_ar');
    
    if (error) throw error;
    setLeaveTypes(data || []);
  };

  const fetchHolidays = async () => {
    const { data, error } = await supabase
      .from('saudi_holidays')
      .select('*')
      .eq('is_active', true)
      .order('gregorian_date');
    
    if (error) throw error;
    setHolidays(data || []);
  };

  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('comprehensive_leave_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    setLeaveRequests(data || []);
  };

  const fetchLeaveBalances = async () => {
    const { data, error } = await supabase
      .from('employee_leave_balances')
      .select('*')
      .eq('year', new Date().getFullYear());
    
    if (error) throw error;
    setLeaveBalances(data || []);
  };

  const fetchAIInsights = async () => {
    const { data, error } = await supabase
      .from('leave_ai_insights')
      .select('*')
      .eq('is_dismissed', false)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    setAiInsights(data || []);
  };

  const getLeaveTypeIcon = (code: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'ANNUAL': Plane,
      'SICK': Stethoscope,
      'MATERNITY': Baby,
      'PATERNITY': Heart,
      'MARRIAGE': Heart,
      'BEREAVEMENT': Heart,
      'HAJJ': Star,
      'STUDY': GraduationCap,
      'UNPAID': AlertTriangle,
      'EMERGENCY': AlertCircle
    };
    return iconMap[code] || FileText;
  };

  const getLeaveTypeColor = (code: string) => {
    const colorMap: Record<string, string> = {
      'ANNUAL': 'text-blue-600 bg-blue-50 border-blue-200',
      'SICK': 'text-red-600 bg-red-50 border-red-200',
      'MATERNITY': 'text-pink-600 bg-pink-50 border-pink-200',
      'PATERNITY': 'text-green-600 bg-green-50 border-green-200',
      'MARRIAGE': 'text-purple-600 bg-purple-50 border-purple-200',
      'BEREAVEMENT': 'text-gray-600 bg-gray-50 border-gray-200',
      'HAJJ': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'STUDY': 'text-indigo-600 bg-indigo-50 border-indigo-200',
      'UNPAID': 'text-orange-600 bg-orange-50 border-orange-200',
      'EMERGENCY': 'text-red-600 bg-red-50 border-red-200'
    };
    return colorMap[code] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'draft': { color: 'bg-gray-100 text-gray-800', text: 'مسودة', icon: FileText },
      'submitted': { color: 'bg-blue-100 text-blue-800', text: 'مقدم', icon: Clock },
      'pending_manager': { color: 'bg-yellow-100 text-yellow-800', text: 'في انتظار المدير', icon: Clock },
      'pending_hr': { color: 'bg-orange-100 text-orange-800', text: 'في انتظار الموارد البشرية', icon: Clock },
      'approved': { color: 'bg-green-100 text-green-800', text: 'معتمد', icon: CheckCircle },
      'rejected': { color: 'bg-red-100 text-red-800', text: 'مرفوض', icon: XCircle },
      'cancelled': { color: 'bg-gray-100 text-gray-800', text: 'ملغي', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config?.icon || Clock;
    
    return (
      <Badge className={`${config?.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config?.text}
      </Badge>
    );
  };

  const getSeverityColor = (severity: string) => {
    const colorMap = {
      'low': 'text-green-600 bg-green-50 border-green-200',
      'medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'high': 'text-orange-600 bg-orange-50 border-orange-200',
      'critical': 'text-red-600 bg-red-50 border-red-200'
    };
    return colorMap[severity as keyof typeof colorMap] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const calculateDays = (startDate: Date, endDate: Date) => {
    return differenceInDays(endDate, startDate) + 1;
  };

  const handleSubmitRequest = async () => {
    if (!selectedDate || !endDate || !newRequestForm.leave_type_code || !newRequestForm.reason) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const totalDays = calculateDays(selectedDate, endDate);
    
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      if (!currentUser.user) throw new Error('User not authenticated');

      // Get employee ID from boud_employees table
      const { data: employee } = await supabase
        .from('boud_employees')
        .select('id')
        .eq('user_id', currentUser.user.id)
        .single();

      if (!employee) throw new Error('Employee not found');

      const { error } = await supabase
        .from('comprehensive_leave_requests')
        .insert({
          employee_id: employee.id,
          leave_type_code: newRequestForm.leave_type_code,
          start_date: selectedDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          total_days: totalDays,
          working_days: totalDays, // Simplified calculation
          reason: newRequestForm.reason,
          priority: newRequestForm.priority,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          submitted_by: currentUser.user.id,
          delegate_employee_id: newRequestForm.delegate_employee_id || null,
          delegate_instructions: newRequestForm.delegate_instructions || null
        });

      if (error) throw error;

      toast({
        title: "تم تقديم الطلب بنجاح",
        description: "سيتم مراجعة طلب الإجازة من قبل المدير المباشر"
      });

      setIsNewRequestOpen(false);
      setNewRequestForm({
        leave_type_code: '',
        start_date: '',
        end_date: '',
        reason: '',
        priority: 'normal',
        delegate_employee_id: '',
        delegate_instructions: ''
      });
      setSelectedDate(undefined);
      setEndDate(undefined);
      
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "خطأ في تقديم الطلب",
        description: "حدث خطأ أثناء تقديم طلب الإجازة. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.reason?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.leave_type_code === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalRequests: leaveRequests.length,
    pendingRequests: leaveRequests.filter(r => r.status.includes('pending') || r.status === 'submitted').length,
    approvedRequests: leaveRequests.filter(r => r.status === 'approved').length,
    rejectedRequests: leaveRequests.filter(r => r.status === 'rejected').length,
    totalDaysRequested: leaveRequests.reduce((sum, r) => sum + r.total_days, 0)
  };

  const criticalInsights = aiInsights.filter(insight => insight.severity === 'critical');
  const upcomingHolidays = holidays.filter(holiday => {
    if (holiday.gregorian_date) {
      const holidayDate = new Date(holiday.gregorian_date);
      const today = new Date();
      return holidayDate >= today;
    }
    return true;
  }).slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <CalendarIcon className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium">جاري تحميل نظام الإجازات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-primary/5 via-background to-primary/10 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <CalendarIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">نظام الإجازات والعطل الشامل</h1>
            <p className="text-muted-foreground">إدارة متقدمة للإجازات وفقاً لنظام العمل السعودي</p>
          </div>
        </div>
        
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              طلب إجازة جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>طلب إجازة جديد</DialogTitle>
              <DialogDescription>
                املأ البيانات المطلوبة لتقديم طلب إجازة جديد
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>نوع الإجازة *</Label>
                  <Select value={newRequestForm.leave_type_code} onValueChange={(value) => 
                    setNewRequestForm(prev => ({ ...prev, leave_type_code: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الإجازة" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.map((type) => {
                        const IconComponent = getLeaveTypeIcon(type.code);
                        return (
                          <SelectItem key={type.code} value={type.code}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span>{type.name_ar}</span>
                              {!type.is_paid && <Badge variant="outline">بدون راتب</Badge>}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>الأولوية</Label>
                  <Select value={newRequestForm.priority} onValueChange={(value) => 
                    setNewRequestForm(prev => ({ ...prev, priority: value as any }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="normal">عادية</SelectItem>
                      <SelectItem value="high">مرتفعة</SelectItem>
                      <SelectItem value="urgent">عاجلة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>تاريخ البداية *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
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
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>تاريخ النهاية *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
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
                        disabled={(date) => selectedDate ? date < selectedDate : false}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {selectedDate && endDate && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    إجمالي أيام الإجازة المطلوبة: <strong>{calculateDays(selectedDate, endDate)} يوم</strong>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label>سبب الإجازة *</Label>
                <Textarea 
                  placeholder="اذكر سبب طلب الإجازة بالتفصيل..."
                  value={newRequestForm.reason}
                  onChange={(e) => setNewRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label>تعليمات للمفوض (اختياري)</Label>
                <Textarea 
                  placeholder="تعليمات خاصة للموظف المفوض أثناء فترة الإجازة..."
                  value={newRequestForm.delegate_instructions}
                  onChange={(e) => setNewRequestForm(prev => ({ ...prev, delegate_instructions: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSubmitRequest} className="bg-primary hover:bg-primary/90">
                  تقديم الطلب
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Critical AI Insights Alert */}
      {criticalInsights.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            تحذير: يوجد {criticalInsights.length} تنبيه حرج من نظام الذكاء الاصطناعي يتطلب انتباهكم الفوري.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
          <TabsTrigger value="requests">طلبات الإجازة</TabsTrigger>
          <TabsTrigger value="balances">أرصدة الإجازات</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
          <TabsTrigger value="holidays">العطل الرسمية</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات والذكاء الاصطناعي</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-white/80 backdrop-blur border-primary/20">
              <CardContent className="p-4 text-center">
                <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{stats.totalRequests}</div>
                <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-yellow-200">
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
                <div className="text-sm text-muted-foreground">في الانتظار</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-green-200">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{stats.approvedRequests}</div>
                <div className="text-sm text-muted-foreground">معتمدة</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-red-200">
              <CardContent className="p-4 text-center">
                <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{stats.rejectedRequests}</div>
                <div className="text-sm text-muted-foreground">مرفوضة</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-purple-200">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{stats.totalDaysRequested}</div>
                <div className="text-sm text-muted-foreground">إجمالي الأيام</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions and Upcoming Events */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Leave Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  أحدث طلبات الإجازة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRequests.slice(0, 5).map((request) => {
                    const leaveType = leaveTypes.find(t => t.code === request.leave_type_code);
                    const IconComponent = getLeaveTypeIcon(request.leave_type_code);
                    return (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">{leaveType?.name_ar}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.start_date} - {request.end_date}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Holidays */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  العطل القادمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingHolidays.map((holiday) => (
                    <div key={holiday.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="font-medium">{holiday.name_ar}</p>
                          <p className="text-sm text-muted-foreground">{holiday.name_en}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{holiday.gregorian_date}</p>
                        <Badge variant="outline" className="text-xs">
                          {holiday.duration_days} {holiday.duration_days === 1 ? 'يوم' : 'أيام'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في طلبات الإجازة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="submitted">مقدمة</SelectItem>
                    <SelectItem value="pending_manager">في انتظار المدير</SelectItem>
                    <SelectItem value="pending_hr">في انتظار الموارد البشرية</SelectItem>
                    <SelectItem value="approved">معتمدة</SelectItem>
                    <SelectItem value="rejected">مرفوضة</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="نوع الإجازة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type.code} value={type.code}>
                        {type.name_ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const leaveType = leaveTypes.find(t => t.code === request.leave_type_code);
              const IconComponent = getLeaveTypeIcon(request.leave_type_code);
              return (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", getLeaveTypeColor(request.leave_type_code))}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{leaveType?.name_ar}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.start_date} إلى {request.end_date} • {request.total_days} أيام
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        {request.priority !== 'normal' && (
                          <Badge variant="outline" className="text-xs">
                            {request.priority === 'high' ? 'مرتفعة' : 
                             request.priority === 'urgent' ? 'عاجلة' : 'منخفضة'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">سبب الإجازة</h4>
                        <p className="text-sm">{request.reason}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">تاريخ التقديم</h4>
                        <p className="text-sm">{format(new Date(request.created_at), 'PPP', { locale: ar })}</p>
                      </div>
                    </div>

                    {(request.manager_comments || request.hr_comments || request.rejection_reason) && (
                      <div className="border-t pt-4">
                        {request.manager_comments && (
                          <p className="text-sm"><span className="font-medium">تعليقات المدير:</span> {request.manager_comments}</p>
                        )}
                        {request.hr_comments && (
                          <p className="text-sm"><span className="font-medium">تعليقات الموارد البشرية:</span> {request.hr_comments}</p>
                        )}
                        {request.rejection_reason && (
                          <p className="text-sm text-red-600"><span className="font-medium">سبب الرفض:</span> {request.rejection_reason}</p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                      {request.status === 'draft' && (
                        <>
                          <Button size="sm" variant="outline">
                            تعديل
                          </Button>
                          <Button size="sm">
                            إرسال
                          </Button>
                        </>
                      )}
                      {(request.status === 'submitted' || request.status.includes('pending')) && (
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          إلغاء الطلب
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Leave Balances Tab */}
        <TabsContent value="balances" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaveTypes.map((leaveType) => {
              const balance = leaveBalances.find(b => b.leave_type_code === leaveType.code);
              const IconComponent = getLeaveTypeIcon(leaveType.code);
              const usedPercentage = balance ? (balance.used_days / balance.total_entitled) * 100 : 0;
              
              return (
                <Card key={leaveType.code} className={cn("border-l-4", getLeaveTypeColor(leaveType.code))}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold">{leaveType.name_ar}</h3>
                          <p className="text-sm text-muted-foreground">{leaveType.name_en}</p>
                        </div>
                      </div>
                      {!leaveType.is_paid && (
                        <Badge variant="outline">بدون راتب</Badge>
                      )}
                    </div>

                    {balance ? (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>المستخدم: {balance.used_days}</span>
                          <span>المتاح: {balance.remaining_days}</span>
                        </div>
                        <Progress value={usedPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>الإجمالي: {balance.total_entitled} يوم</span>
                          <span>المعلق: {balance.pending_days} يوم</span>
                        </div>
                        {balance.carried_forward > 0 && (
                          <div className="text-xs text-blue-600">
                            أيام منقولة: {balance.carried_forward}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">
                          الحد الأقصى: {leaveType.max_days_per_year} يوم سنوياً
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {leaveType.minimum_service_years > 0 && `يتطلب ${leaveType.minimum_service_years} سنة خدمة`}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تقويم الإجازات والعطل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">قريباً - عرض التقويم التفاعلي</h3>
                <p className="text-muted-foreground">
                  سيتم عرض جميع الإجازات والعطل الرسمية في تقويم تفاعلي مع إمكانية التنقل بين التواريخ الهجرية والميلادية
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holidays.map((holiday) => (
              <Card key={holiday.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Star className="h-6 w-6 text-yellow-500" />
                      <div>
                        <h3 className="font-semibold">{holiday.name_ar}</h3>
                        <p className="text-sm text-muted-foreground">{holiday.name_en}</p>
                      </div>
                    </div>
                    <Badge className={
                      holiday.holiday_type === 'religious' ? 'bg-blue-100 text-blue-800' :
                      holiday.holiday_type === 'national' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {holiday.holiday_type === 'religious' ? 'ديني' :
                       holiday.holiday_type === 'national' ? 'وطني' : 'ملكي'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>التاريخ الميلادي:</span>
                      <span className="font-medium">{holiday.gregorian_date || 'متغير'}</span>
                    </div>
                    {holiday.hijri_date && (
                      <div className="flex justify-between text-sm">
                        <span>التاريخ الهجري:</span>
                        <span className="font-medium">{holiday.hijri_date}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>المدة:</span>
                      <span className="font-medium">
                        {holiday.duration_days} {holiday.duration_days === 1 ? 'يوم' : 'أيام'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                رؤى الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiInsights.length > 0 ? (
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <Card key={insight.id} className={cn("border-l-4", getSeverityColor(insight.severity))}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge className={getSeverityColor(insight.severity)}>
                            {insight.severity === 'critical' ? 'حرج' :
                             insight.severity === 'high' ? 'عالي' :
                             insight.severity === 'medium' ? 'متوسط' : 'منخفض'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        {Array.isArray(insight.recommendations) && insight.recommendations.length > 0 && (
                          <div className="space-y-1">
                            <h5 className="font-medium text-sm">التوصيات:</h5>
                            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                              {insight.recommendations.map((rec: string, index: number) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد رؤى متاحة حالياً</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Charts Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                التحليلات والإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">قريباً - التحليلات المتقدمة</h3>
                <p className="text-muted-foreground">
                  سيتم عرض الرسوم البيانية والإحصائيات المتقدمة لاستخدام الإجازات وأنماط الغياب
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};