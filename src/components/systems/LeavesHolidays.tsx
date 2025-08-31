import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, Search, Plus, Filter } from 'lucide-react';

interface LeavesHolidaysProps {
  onBack: () => void;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: 'annual' | 'sick' | 'emergency' | 'maternity' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  approvedBy?: string;
}

interface Holiday {
  id: string;
  name: string;
  englishName: string;
  date: string;
  type: 'national' | 'religious' | 'company';
  isRecurring: boolean;
}

export const LeavesHolidays: React.FC<LeavesHolidaysProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      leaveType: 'annual',
      startDate: '2024-02-01',
      endDate: '2024-02-07',
      days: 7,
      reason: 'إجازة سنوية للسفر مع العائلة',
      status: 'approved',
      requestDate: '2024-01-15',
      approvedBy: 'سارة أحمد'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      leaveType: 'sick',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'مرض مفاجئ - تقرير طبي مرفق',
      status: 'pending',
      requestDate: '2024-01-24'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      leaveType: 'emergency',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      days: 3,
      reason: 'ظروف عائلية طارئة',
      status: 'approved',
      requestDate: '2024-02-08',
      approvedBy: 'محمد خالد'
    }
  ];

  const holidays: Holiday[] = [
    {
      id: '1',
      name: 'اليوم الوطني السعودي',
      englishName: 'Saudi National Day',
      date: '2024-09-23',
      type: 'national',
      isRecurring: true
    },
    {
      id: '2',
      name: 'عيد الفطر المبارك',
      englishName: 'Eid Al-Fitr',
      date: '2024-04-10',
      type: 'religious',
      isRecurring: true
    },
    {
      id: '3',
      name: 'يوم التأسيس',
      englishName: 'Founding Day',
      date: '2024-02-22',
      type: 'national',
      isRecurring: true
    },
    {
      id: '4',
      name: 'اليوم العالمي للمرأة',
      englishName: 'International Women\'s Day',
      date: '2024-03-08',
      type: 'company',
      isRecurring: true
    }
  ];

  const getLeaveTypeBadge = (type: string) => {
    const typeConfig = {
      annual: { text: isRTL ? 'إجازة سنوية' : 'Annual Leave', className: 'bg-blue-100 text-blue-800' },
      sick: { text: isRTL ? 'إجازة مرضية' : 'Sick Leave', className: 'bg-red-100 text-red-800' },
      emergency: { text: isRTL ? 'إجازة اضطرارية' : 'Emergency Leave', className: 'bg-orange-100 text-orange-800' },
      maternity: { text: isRTL ? 'إجازة أمومة' : 'Maternity Leave', className: 'bg-pink-100 text-pink-800' },
      unpaid: { text: isRTL ? 'إجازة بدون راتب' : 'Unpaid Leave', className: 'bg-gray-100 text-gray-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      approved: { text: isRTL ? 'معتمدة' : 'Approved', className: 'bg-green-100 text-green-800' },
      rejected: { text: isRTL ? 'مرفوضة' : 'Rejected', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getHolidayTypeBadge = (type: string) => {
    const typeConfig = {
      national: { text: isRTL ? 'وطنية' : 'National', className: 'bg-green-100 text-green-800' },
      religious: { text: isRTL ? 'دينية' : 'Religious', className: 'bg-blue-100 text-blue-800' },
      company: { text: isRTL ? 'الشركة' : 'Company', className: 'bg-purple-100 text-purple-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  البحث المتقدم
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  طلب إجازة جديد
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Calendar className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام الإجازات والعطلات المتطور
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة طلبات الإجازات والعطل الرسمية مع أنظمة الموافقة والمتابعة الآلية
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">نظام الإجازات المتقدم</h3>
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الطلبات</span>
                      <span className="font-bold text-primary">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الموافقة</span>
                      <span className="font-bold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط أيام الإجازة</span>
                      <span className="font-bold text-blue-600">12.3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة العطل الرسمية</h3>
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">عطل وطنية</span>
                      <span className="font-bold text-green-600">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">عطل دينية</span>
                      <span className="font-bold text-blue-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">أيام عمل محفوظة</span>
                      <span className="font-bold text-purple-600">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الإجازات</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">طلبات هذا الشهر</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">7</div>
                    <div className="text-sm text-gray-600">في انتظار الموافقة</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-gray-600">معتمدة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة الإجازات المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Calendar, label: "طلبات الإجازة", color: "text-blue-600", count: 24 },
                { icon: Clock, label: "الموافقات الآلية", color: "text-green-600", count: 15 },
                { icon: Filter, label: "تصفية الطلبات", color: "text-purple-600", count: 0 },
                { icon: ArrowLeft, label: "المتابعة المرحلية", color: "text-orange-600", count: 8 },
                { icon: Plus, label: "العطل الرسمية", color: "text-teal-600", count: 3 },
                { icon: Search, label: "التقارير التحليلية", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">إجمالي أيام الإجازة المعتمدة</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">معدل الموافقة على الطلبات</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">2.1</div>
                <div className="text-sm text-gray-600">متوسط وقت المعالجة (أيام)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">{isRTL ? 'طلبات الإجازة' : 'Leave Requests'}</TabsTrigger>
            <TabsTrigger value="holidays">{isRTL ? 'العطل الرسمية' : 'Official Holidays'}</TabsTrigger>
            <TabsTrigger value="policies">{isRTL ? 'السياسات' : 'Leave Policies'}</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في طلبات الإجازة...' : 'Search leave requests...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {isRTL ? 'تصفية' : 'Filter'}
              </Button>
            </div>

            {/* Leave Requests List */}
            <div className="space-y-6">
              {filteredRequests.map((request) => {
                const leaveTypeBadge = getLeaveTypeBadge(request.leaveType);
                const statusBadge = getStatusBadge(request.status);
                
                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.employeeName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{request.employeeId}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={leaveTypeBadge.className}>
                            {leaveTypeBadge.text}
                          </Badge>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              {isRTL ? 'سبب الإجازة' : 'Reason'}
                            </h4>
                            <p className="text-sm">{request.reason}</p>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الطلب:' : 'Request Date:'}</span>
                            <span className="text-sm font-medium">{request.requestDate}</span>
                          </div>
                          {request.approvedBy && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{isRTL ? 'معتمد من:' : 'Approved By:'}</span>
                              <span className="text-sm">{request.approvedBy}</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ البداية:' : 'Start Date:'}</span>
                            <span className="text-sm font-medium">{request.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ النهاية:' : 'End Date:'}</span>
                            <span className="text-sm font-medium">{request.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'عدد الأيام:' : 'Days:'}</span>
                            <span className="text-sm font-medium text-primary">{request.days} {isRTL ? 'يوم' : 'days'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                              {isRTL ? 'اعتماد' : 'Approve'}
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              {isRTL ? 'رفض' : 'Reject'}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="holidays">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {holidays.map((holiday) => {
                const typeBadge = getHolidayTypeBadge(holiday.type);
                return (
                  <Card key={holiday.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{holiday.name}</CardTitle>
                        <Badge className={typeBadge.className}>
                          {typeBadge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{holiday.englishName}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{isRTL ? 'التاريخ:' : 'Date:'}</span>
                          <span className="text-sm font-medium">{holiday.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{isRTL ? 'متكررة:' : 'Recurring:'}</span>
                          <span className="text-sm">{holiday.isRecurring ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'سياسات الإجازات' : 'Leave Policies'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'عرض وإدارة سياسات الإجازات المختلفة في الشركة' : 'View and manage different leave policies in the company'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};