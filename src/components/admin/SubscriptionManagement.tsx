import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Crown,
  DollarSign,
  Users,
  Building2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  Eye,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  clientName: string;
  clientId: string;
  plan: 'basic' | 'professional' | 'enterprise' | 'enterprise+';
  status: 'active' | 'suspended' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  monthlyPrice: number;
  employees: number;
  features: string[];
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    clientName: 'شركة الراجحي للتقنية',
    clientId: 'CLI-001',
    plan: 'enterprise+',
    status: 'active',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    monthlyPrice: 25000,
    employees: 2500,
    features: ['إدارة الموظفين', 'الرواتب', 'الحضور', 'التقارير المتقدمة', 'API'],
    paymentStatus: 'paid'
  },
  {
    id: '2',
    clientName: 'مؤسسة النور التجارية',
    clientId: 'CLI-002',
    plan: 'professional',
    status: 'active',
    startDate: '2023-03-20',
    endDate: '2024-03-20',
    monthlyPrice: 5500,
    employees: 150,
    features: ['إدارة الموظفين', 'الرواتب', 'الحضور'],
    paymentStatus: 'paid'
  },
  {
    id: '3',
    clientName: 'شركة المستقبل للاستشارات',
    clientId: 'CLI-003',
    plan: 'basic',
    status: 'trial',
    startDate: '2024-01-05',
    endDate: '2024-02-05',
    monthlyPrice: 0,
    employees: 75,
    features: ['إدارة الموظفين الأساسية'],
    paymentStatus: 'pending'
  }
];

const planData = [
  { name: 'Basic', value: 25, color: '#3b82f6' },
  { name: 'Professional', value: 45, color: '#10b981' },
  { name: 'Enterprise', value: 20, color: '#f59e0b' },
  { name: 'Enterprise+', value: 10, color: '#ef4444' }
];

const revenueData = [
  { month: 'يناير', revenue: 180000, subscriptions: 45 },
  { month: 'فبراير', revenue: 208000, subscriptions: 52 },
  { month: 'مارس', revenue: 244000, subscriptions: 61 },
  { month: 'أبريل', revenue: 312000, subscriptions: 78 },
  { month: 'مايو', revenue: 380000, subscriptions: 95 },
  { month: 'يونيو', revenue: 480000, subscriptions: 120 }
];

export const SubscriptionManagement: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const getPlanBadge = (plan: string) => {
    const variants = {
      'basic': 'secondary',
      'professional': 'default',
      'enterprise': 'destructive',
      'enterprise+': 'outline'
    };
    
    const labels = {
      'basic': isArabic ? 'أساسي' : 'Basic',
      'professional': isArabic ? 'احترافي' : 'Professional',
      'enterprise': isArabic ? 'مؤسسي' : 'Enterprise',
      'enterprise+': isArabic ? 'مؤسسي+' : 'Enterprise+'
    };
    
    return (
      <Badge variant={variants[plan as keyof typeof variants] as any} className="font-medium">
        <Crown className="h-3 w-3 mr-1" />
        {labels[plan as keyof typeof labels]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'suspended': 'destructive',
      'expired': 'secondary',
      'trial': 'outline'
    };
    
    const labels = {
      'active': isArabic ? 'نشط' : 'Active',
      'suspended': isArabic ? 'معلق' : 'Suspended',
      'expired': isArabic ? 'منتهي' : 'Expired',
      'trial': isArabic ? 'تجريبي' : 'Trial'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      'paid': 'default',
      'pending': 'secondary',
      'overdue': 'destructive'
    };
    
    const labels = {
      'paid': isArabic ? 'مدفوع' : 'Paid',
      'pending': isArabic ? 'معلق' : 'Pending',
      'overdue': isArabic ? 'متأخر' : 'Overdue'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleSuspendSubscription = (id: string) => {
    toast.success(isArabic ? 'تم تعليق الاشتراك بنجاح' : 'Subscription suspended successfully');
  };

  const handleActivateSubscription = (id: string) => {
    toast.success(isArabic ? 'تم تفعيل الاشتراك بنجاح' : 'Subscription activated successfully');
  };

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsViewOpen(true);
  };

  const totalRevenue = mockSubscriptions.reduce((sum, sub) => sum + sub.monthlyPrice, 0);
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === 'active').length;
  const trialSubscriptions = mockSubscriptions.filter(sub => sub.status === 'trial').length;
  const totalEmployees = mockSubscriptions.reduce((sum, sub) => sum + sub.employees, 0);

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.clientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">{isArabic ? 'إدارة الاشتراكات' : 'Subscription Management'}</h2>
        <p className="text-muted-foreground">
          {isArabic ? 'إدارة اشتراكات العملاء والباقات والمدفوعات' : 'Manage client subscriptions, packages, and payments'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalRevenue.toLocaleString()} ر.س</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeSubscriptions}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'اشتراكات نشطة' : 'Active Subscriptions'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{trialSubscriptions}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'اشتراكات تجريبية' : 'Trial Subscriptions'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalEmployees.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي الموظفين' : 'Total Employees'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'توزيع الباقات' : 'Plan Distribution'}</CardTitle>
            <CardDescription>
              {isArabic ? 'توزيع العملاء حسب نوع الباقة' : 'Client distribution by plan type'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {planData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? 'اتجاه الإيرادات' : 'Revenue Trend'}</CardTitle>
            <CardDescription>
              {isArabic ? 'الإيرادات الشهرية لآخر 6 أشهر' : 'Monthly revenue for the last 6 months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} ر.س`, isArabic ? 'الإيرادات' : 'Revenue']} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? 'البحث عن الاشتراكات...' : 'Search subscriptions...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={isArabic ? 'تصفية بالحالة' : 'Filter by status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="active">{isArabic ? 'نشط' : 'Active'}</SelectItem>
                <SelectItem value="suspended">{isArabic ? 'معلق' : 'Suspended'}</SelectItem>
                <SelectItem value="expired">{isArabic ? 'منتهي' : 'Expired'}</SelectItem>
                <SelectItem value="trial">{isArabic ? 'تجريبي' : 'Trial'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? 'العميل' : 'Client'}</TableHead>
                <TableHead>{isArabic ? 'الباقة' : 'Plan'}</TableHead>
                <TableHead>{isArabic ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{isArabic ? 'المبلغ الشهري' : 'Monthly Price'}</TableHead>
                <TableHead>{isArabic ? 'الموظفين' : 'Employees'}</TableHead>
                <TableHead>{isArabic ? 'تاريخ الانتهاء' : 'End Date'}</TableHead>
                <TableHead>{isArabic ? 'حالة الدفع' : 'Payment'}</TableHead>
                <TableHead>{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subscription.clientName}</div>
                      <div className="text-sm text-muted-foreground">{subscription.clientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell>
                    {subscription.monthlyPrice > 0 
                      ? `${subscription.monthlyPrice.toLocaleString()} ر.س`
                      : isArabic ? 'تجريبي' : 'Trial'
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{subscription.employees.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{subscription.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(subscription.paymentStatus)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewSubscription(subscription)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {isArabic ? 'تعديل الباقة' : 'Edit Plan'}
                        </DropdownMenuItem>
                        {subscription.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleSuspendSubscription(subscription.id)}>
                            <Pause className="h-4 w-4 mr-2" />
                            {isArabic ? 'تعليق الاشتراك' : 'Suspend'}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateSubscription(subscription.id)}>
                            <Play className="h-4 w-4 mr-2" />
                            {isArabic ? 'تفعيل الاشتراك' : 'Activate'}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscription Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'تفاصيل الاشتراك' : 'Subscription Details'}</DialogTitle>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'اسم العميل' : 'Client Name'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.clientName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'رقم العميل' : 'Client ID'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.clientId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'الباقة' : 'Plan'}</Label>
                  <div className="mt-1">{getPlanBadge(selectedSubscription.plan)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'الحالة' : 'Status'}</Label>
                  <div className="mt-1">{getStatusBadge(selectedSubscription.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'عدد الموظفين' : 'Employees'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.employees.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'السعر الشهري' : 'Monthly Price'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSubscription.monthlyPrice > 0 
                      ? `${selectedSubscription.monthlyPrice.toLocaleString()} ر.س`
                      : isArabic ? 'تجريبي مجاني' : 'Free Trial'
                    }
                  </p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">{isArabic ? 'الميزات المشمولة' : 'Included Features'}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSubscription.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'تاريخ البداية' : 'Start Date'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">{isArabic ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.endDate}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};