import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Calendar, CreditCard, FileText, Calculator, CheckCircle, AlertCircle, User, TrendingUp, TrendingDown, DollarSign, Clock, Search, Filter, Download, Eye, Edit, Trash2, UserX, FileCheck, Award, Briefcase, Building, Phone, Mail, MapPin, History, AlertTriangle } from 'lucide-react';
import { useEmployeeServices } from '@/hooks/useEmployeeServices';
export function EndOfServiceManagement() {
  const [showEOSDialog, setShowEOSDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [eosForm, setEosForm] = useState({
    employee_id: '',
    termination_type: '',
    termination_date: '',
    reason: '',
    notice_period_days: 30,
    years_of_service: 0,
    last_salary: 0
  });
  const {
    endOfServiceRecords,
    loading
  } = useEmployeeServices();
  const terminationTypes = [{
    id: 'resignation',
    name: 'استقالة',
    color: 'bg-blue-500 text-white',
    icon: UserX
  }, {
    id: 'termination',
    name: 'فصل',
    color: 'bg-red-500 text-white',
    icon: AlertTriangle
  }, {
    id: 'contract_end',
    name: 'انتهاء عقد',
    color: 'bg-yellow-500 text-white',
    icon: FileCheck
  }, {
    id: 'retirement',
    name: 'تقاعد',
    color: 'bg-green-500 text-white',
    icon: Award
  }];

  // Mock statistics
  const stats = {
    total: 156,
    pending: 12,
    approved: 8,
    completed: 136,
    totalAmount: 2850000,
    avgAmount: 18269
  };

  // Mock data for demonstration
  const mockRecords = [{
    id: '1',
    employee_id: 'EMP001',
    employee_name: 'أحمد محمد العلي',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات',
    termination_type: 'resignation',
    termination_date: '2024-12-31',
    hire_date: '2019-01-15',
    years_of_service: 5.8,
    last_salary: 15000,
    eos_amount: 52500,
    vacation_balance: 15,
    vacation_amount: 7500,
    net_amount: 60000,
    status: 'pending',
    reason: 'فرصة عمل أفضل',
    notice_period_days: 30,
    last_working_day: '2024-12-31',
    created_at: '2024-11-15'
  }, {
    id: '2',
    employee_id: 'EMP045',
    employee_name: 'فاطمة سالم الغامدي',
    department: 'الموارد البشرية',
    position: 'أخصائي موارد بشرية',
    termination_type: 'contract_end',
    termination_date: '2024-11-30',
    hire_date: '2021-12-01',
    years_of_service: 3.0,
    last_salary: 12000,
    eos_amount: 18000,
    vacation_balance: 10,
    vacation_amount: 4000,
    net_amount: 22000,
    status: 'approved',
    reason: 'انتهاء مدة العقد',
    notice_period_days: 30,
    last_working_day: '2024-11-30',
    created_at: '2024-10-28'
  }, {
    id: '3',
    employee_id: 'EMP089',
    employee_name: 'خالد عبدالله الشهري',
    department: 'المالية',
    position: 'محاسب أول',
    termination_type: 'retirement',
    termination_date: '2024-10-15',
    hire_date: '2000-03-01',
    years_of_service: 24.5,
    last_salary: 18000,
    eos_amount: 396000,
    vacation_balance: 20,
    vacation_amount: 12000,
    net_amount: 408000,
    status: 'completed',
    reason: 'بلوغ سن التقاعد',
    notice_period_days: 60,
    last_working_day: '2024-10-15',
    created_at: '2024-08-10'
  }];
  const calculateEOSBenefits = (yearsOfService: number, lastSalary: number) => {
    let eosAmount = 0;
    if (yearsOfService >= 1) {
      const firstFiveYears = Math.min(yearsOfService, 5);
      eosAmount += firstFiveYears * (lastSalary * 0.5);
      if (yearsOfService > 5) {
        const remainingYears = yearsOfService - 5;
        eosAmount += remainingYears * lastSalary;
      }
    }
    return eosAmount;
  };
  const calculateVacationAmount = (vacationDays: number, dailySalary: number) => {
    return vacationDays * dailySalary;
  };
  const getStatusBadge = (status: string) => {
    const statusConfig: any = {
      pending: {
        label: 'قيد المراجعة',
        color: 'bg-yellow-500 text-white'
      },
      approved: {
        label: 'معتمد',
        color: 'bg-blue-500 text-white'
      },
      completed: {
        label: 'مكتمل',
        color: 'bg-green-500 text-white'
      },
      rejected: {
        label: 'مرفوض',
        color: 'bg-red-500 text-white'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };
  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setShowDetailsDialog(true);
  };
  return <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">قسم إنهاء الخدمات</h1>
          <p className="text-muted-foreground">إدارة شاملة لجميع حالات إنهاء الخدمة ومستحقات الموظفين</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>

          <Dialog open={showEOSDialog} onOpenChange={setShowEOSDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة طلب جديد
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl">طلب إنهاء خدمة موظف</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الرقم الوظيفي</Label>
                  <Input value={eosForm.employee_id} onChange={e => setEosForm({
                    ...eosForm,
                    employee_id: e.target.value
                  })} placeholder="أدخل الرقم الوظيفي" />
                </div>
                <div className="space-y-2">
                  <Label>نوع إنهاء الخدمة</Label>
                  <Select value={eosForm.termination_type} onValueChange={value => setEosForm({
                    ...eosForm,
                    termination_type: value
                  })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الإنهاء" />
                    </SelectTrigger>
                    <SelectContent>
                      {terminationTypes.map(type => <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.name}
                          </div>
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>تاريخ إنهاء الخدمة</Label>
                  <Input type="date" value={eosForm.termination_date} onChange={e => setEosForm({
                    ...eosForm,
                    termination_date: e.target.value
                  })} />
                </div>
                <div className="space-y-2">
                  <Label>فترة الإشعار (بالأيام)</Label>
                  <Input type="number" value={eosForm.notice_period_days} onChange={e => setEosForm({
                    ...eosForm,
                    notice_period_days: parseInt(e.target.value)
                  })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>سنوات الخدمة</Label>
                  <Input type="number" step="0.1" value={eosForm.years_of_service} onChange={e => setEosForm({
                    ...eosForm,
                    years_of_service: parseFloat(e.target.value)
                  })} />
                </div>
                <div className="space-y-2">
                  <Label>آخر راتب (ريال)</Label>
                  <Input type="number" value={eosForm.last_salary} onChange={e => setEosForm({
                    ...eosForm,
                    last_salary: parseFloat(e.target.value)
                  })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>سبب إنهاء الخدمة</Label>
                <Textarea value={eosForm.reason} onChange={e => setEosForm({
                  ...eosForm,
                  reason: e.target.value
                })} placeholder="اذكر سبب إنهاء الخدمة بالتفصيل..." rows={4} />
              </div>

              <Separator />

              <div className="bg-accent/10 p-6 rounded-xl border border-accent/20">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  حساب المستحقات التقديرية
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">سنوات الخدمة:</span>
                      <span className="font-bold text-lg">{eosForm.years_of_service} سنة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">آخر راتب:</span>
                      <span className="font-bold text-lg">{eosForm.last_salary.toLocaleString()} ريال</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">مكافأة نهاية الخدمة:</span>
                      <span className="font-bold text-lg text-green-600">
                        {calculateEOSBenefits(eosForm.years_of_service, eosForm.last_salary).toLocaleString()} ريال
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">إجمالي المستحقات:</span>
                      <span className="font-bold text-xl text-primary">
                        {calculateEOSBenefits(eosForm.years_of_service, eosForm.last_salary).toLocaleString()} ريال
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowEOSDialog(false)}>إلغاء</Button>
                <Button className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  إرسال الطلب
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>

      <div className="rounded-xl border border-border p-6 bg-card">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">إجمالي الحالات</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">المكتملة</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{(stats.totalAmount / 1000).toFixed(0)}K ریال</div>
              <div className="text-sm text-muted-foreground">إجمالي المستحقات</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <FileText className="h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              حاسبة المستحقات
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="البحث برقم الموظف أو الاسم..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-10" />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="نوع الإنهاء" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    {terminationTypes.map(type => <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Records List */}
            <div className="space-y-4">
              {mockRecords.map(record => {
                const typeConfig = terminationTypes.find(t => t.id === record.termination_type);
                const TypeIcon = typeConfig?.icon || User;
                return <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${typeConfig?.color || 'bg-muted text-foreground'}`}>
                          <TypeIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{record.employee_name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {record.employee_id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {record.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {record.position}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(record.status)}
                        <Badge className={typeConfig?.color}>
                          {typeConfig?.name}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">تاريخ الالتحاق</p>
                        <p className="font-medium flex items-center gap-1 text-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(record.hire_date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">تاريخ الإنهاء</p>
                        <p className="font-medium flex items-center gap-1 text-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(record.termination_date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">سنوات الخدمة</p>
                        <p className="font-medium flex items-center gap-1 text-foreground">
                          <Clock className="h-3 w-3" />
                          {record.years_of_service} سنة
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">المستحقات الكلية</p>
                        <p className="font-bold text-green-600 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {record.net_amount.toLocaleString()} ريال
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-muted-foreground">مكافأة نهاية الخدمة: </span>
                            <span className="font-bold text-foreground">{record.eos_amount.toLocaleString()} ريال</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">رصيد إجازات: </span>
                            <span className="font-bold text-foreground">{record.vacation_balance} يوم</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">قيمة الإجازات: </span>
                            <span className="font-bold text-foreground">{record.vacation_amount.toLocaleString()} ريال</span>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleViewDetails(record)} className="gap-2">
                          <Eye className="h-4 w-4" />
                          التفاصيل
                        </Button>
                      </div>

                      {record.reason && <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-muted-foreground flex items-start gap-2">
                            <FileText className="h-4 w-4 mt-0.5" />
                            <span><strong>السبب:</strong> {record.reason}</span>
                          </p>
                        </div>}
                    </CardContent>
                  </Card>;
              })}
            </div>
          </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">حاسبة مستحقات نهاية الخدمة</h2>
              </div>
              <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>سنوات الخدمة</Label>
                  <Input type="number" step="0.1" placeholder="5.5" />
                </div>
                <div className="space-y-2">
                  <Label>آخر راتب شهري (ريال)</Label>
                  <Input type="number" placeholder="15000" />
                </div>
                <div className="space-y-2">
                  <Label>رصيد الإجازات (أيام)</Label>
                  <Input type="number" placeholder="15" />
                </div>
                <div className="space-y-2">
                  <Label>نوع إنهاء الخدمة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {terminationTypes.map(type => <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full gap-2" size="lg">
                <Calculator className="h-5 w-5" />
                احسب المستحقات
              </Button>

              <Separator />

              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-lg mb-4 text-foreground">نتيجة الحساب</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">مكافأة نهاية الخدمة</p>
                    <p className="text-2xl font-bold text-foreground">52,500 ريال</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">قيمة رصيد الإجازات</p>
                    <p className="text-2xl font-bold text-foreground">7,500 ريال</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-1">خصومات (إن وجدت)</p>
                    <p className="text-2xl font-bold text-red-600">0 ريال</p>
                  </div>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                    <p className="text-sm opacity-90 mb-1">إجمالي المستحقات</p>
                    <p className="text-3xl font-bold">60,000 ريال</p>
                  </div>
                </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">توزيع أنواع إنهاء الخدمة</h2>
                <div className="space-y-4">
                  {terminationTypes.map((type, index) => {
                      const counts = [45, 28, 15, 12];
                      const percentages = [38, 24, 13, 10];
                      return <div key={type.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-foreground">
                            <type.icon className="h-4 w-4" />
                            {type.name}
                          </span>
                          <span className="font-bold text-foreground">{counts[index]} ({percentages[index]}%)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${type.color}`} style={{
                            width: `${percentages[index]}%`
                          }} />
                        </div>
                      </div>;
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">متوسط سنوات الخدمة</h2>
                <div className="text-center py-8">
                  <div className="text-6xl font-bold text-foreground mb-2">8.5</div>
                  <p className="text-muted-foreground">سنة</p>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">الحد الأدنى</p>
                      <p className="font-bold text-lg text-foreground">0.5 سنة</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">الحد الأقصى</p>
                      <p className="font-bold text-lg text-foreground">28 سنة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">متوسط المستحقات</h2>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-green-600 mb-2">18,269</div>
                  <p className="text-muted-foreground">ريال سعودي</p>
                  <Separator className="my-6" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">أقل مبلغ:</span>
                      <span className="font-bold text-foreground">2,500 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">أعلى مبلغ:</span>
                      <span className="font-bold text-foreground">408,000 ريال</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">الحالات الشهرية</h2>
                <div className="space-y-3">
                  {['يناير', 'فبراير', 'مارس', 'أبريل'].map((month, index) => {
                      const counts = [8, 12, 7, 10];
                      return <div key={month} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{month} 2024</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{
                              width: `${counts[index] / 12 * 100}%`
                            }} />
                          </div>
                          <span className="font-bold text-sm w-8 text-foreground">{counts[index]}</span>
                        </div>
                      </div>;
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </Tabs>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedRecord && <>
              <DialogHeader>
                <DialogTitle className="text-2xl">تفاصيل إنهاء الخدمة</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-xl">
                  <User className="h-12 w-12 text-primary" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedRecord.employee_name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">الرقم الوظيفي</p>
                        <p className="font-medium">{selectedRecord.employee_id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">القسم</p>
                        <p className="font-medium">{selectedRecord.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">المنصب</p>
                        <p className="font-medium">{selectedRecord.position}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">الحالة</p>
                        {getStatusBadge(selectedRecord.status)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">معلومات الخدمة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ الالتحاق:</span>
                        <span className="font-medium">{new Date(selectedRecord.hire_date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ إنهاء الخدمة:</span>
                        <span className="font-medium">{new Date(selectedRecord.termination_date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">سنوات الخدمة:</span>
                        <span className="font-bold text-primary">{selectedRecord.years_of_service} سنة</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">فترة الإشعار:</span>
                        <span className="font-medium">{selectedRecord.notice_period_days} يوم</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">المستحقات المالية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">آخر راتب:</span>
                        <span className="font-medium">{selectedRecord.last_salary.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">مكافأة نهاية الخدمة:</span>
                        <span className="font-bold text-green-600">{selectedRecord.eos_amount.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">رصيد الإجازات:</span>
                        <span className="font-medium">{selectedRecord.vacation_balance} يوم</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">قيمة الإجازات:</span>
                        <span className="font-medium">{selectedRecord.vacation_amount.toLocaleString()} ريال</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-bold">إجمالي المستحقات:</span>
                        <span className="font-bold text-xl text-primary">{selectedRecord.net_amount.toLocaleString()} ريال</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">سبب إنهاء الخدمة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedRecord.reason}</p>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                    إغلاق
                  </Button>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    طباعة التفاصيل
                  </Button>
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>
      </div>
    </div>;
}