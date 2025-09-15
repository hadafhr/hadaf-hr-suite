import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnifiedHeader } from '@/components/shared/UnifiedHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { NotificationBell } from '@/components/shared/NotificationSystem';
import { useAnalytics, useTrackEvent } from '@/components/shared/AnalyticsProvider';
import {
  Building2,
  Users,
  CreditCard,
  HeadphonesIcon,
  TrendingUp,
  Activity,
  AlertTriangle,
  Settings,
  Crown,
  Search,
  Plus,
  FileText,
  Shield,
  Database,
  Monitor,
  Zap,
  DollarSign,
  BarChart3,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

// Mock Data Interfaces
interface TenantData {
  id: string;
  name: string;
  status: 'active' | 'frozen' | 'trial';
  plan: 'basic' | 'professional' | 'enterprise';
  employees: number;
  branches: number;
  lastLogin: string;
  usage: {
    users: number;
    storage: number;
    reports: number;
  };
}

interface BillingData {
  tenantId: string;
  tenantName: string;
  amount: number;
  status: 'paid' | 'overdue' | 'pending';
  dueDate: string;
  plan: string;
  cycle: 'monthly' | 'annual';
}

export const NewAdminDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const { track } = useAnalytics();
  const trackEvent = useTrackEvent();

  const isArabic = i18n.language === 'ar';

  React.useEffect(() => {
    track('admin_dashboard_viewed');
  }, [track]);

  // Mock system stats
  const systemStats = [
    {
      label: isArabic ? 'العملاء النشطون' : 'Active Tenants',
      value: '156',
      icon: Building2,
      color: 'text-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      label: isArabic ? 'إجمالي المستخدمين' : 'Total Users',
      value: '12,847',
      icon: Users,
      color: 'text-green-500',
      change: '+8%',
      trend: 'up'
    },
    {
      label: isArabic ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: '$2.4M',
      icon: DollarSign,
      color: 'text-purple-500',
      change: '+15%',
      trend: 'up'
    },
    {
      label: isArabic ? 'معدل التشغيل' : 'System Uptime',
      value: '99.9%',
      icon: Activity,
      color: 'text-emerald-500',
      change: 'Stable',
      trend: 'stable'
    }
  ];

  // Mock tenant data
  const mockTenants: TenantData[] = [
    {
      id: '1',
      name: 'شركة النور للتقنية',
      status: 'active',
      plan: 'enterprise',
      employees: 150,
      branches: 3,
      lastLogin: '2024-01-15T10:30:00Z',
      usage: { users: 145, storage: 85, reports: 230 }
    },
    {
      id: '2', 
      name: 'مؤسسة الأمل',
      status: 'active',
      plan: 'professional',
      employees: 75,
      branches: 2,
      lastLogin: '2024-01-14T16:20:00Z',
      usage: { users: 70, storage: 45, reports: 120 }
    },
    {
      id: '3',
      name: 'شركة المستقبل',
      status: 'trial',
      plan: 'enterprise',
      employees: 200,
      branches: 5,
      lastLogin: '2024-01-13T09:15:00Z',
      usage: { users: 50, storage: 25, reports: 45 }
    }
  ];

  // Mock billing data
  const mockBilling: BillingData[] = [
    {
      tenantId: '1',
      tenantName: 'شركة النور للتقنية',
      amount: 5400,
      status: 'paid',
      dueDate: '2024-02-01',
      plan: 'Enterprise',
      cycle: 'monthly'
    },
    {
      tenantId: '2',
      tenantName: 'مؤسسة الأمل',
      status: 'overdue',
      amount: 2800,
      dueDate: '2024-01-15',
      plan: 'Professional',
      cycle: 'monthly'
    }
  ];

  // Tenant Management Functions
  const handleCreateTenant = () => {
    trackEvent.trackFeatureUsage('tenant_management', 'create_tenant');
    // Implementation for creating new tenant
  };

  const handleTenantAction = (action: string, tenantId: string) => {
    track('tenant_action', { action, tenant_id: tenantId });
    // Implementation for tenant actions (suspend, activate, etc.)
  };

  const handleBillingAction = (action: string, tenantId: string) => {
    track('billing_action', { action, tenant_id: tenantId });
    // Implementation for billing actions
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      frozen: 'bg-red-100 text-red-800', 
      trial: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      active: isArabic ? 'نشط' : 'Active',
      frozen: isArabic ? 'مجمّد' : 'Frozen',
      trial: isArabic ? 'تجريبي' : 'Trial',
      paid: isArabic ? 'مدفوع' : 'Paid',
      overdue: isArabic ? 'متأخر' : 'Overdue', 
      pending: isArabic ? 'معلق' : 'Pending'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader showAuthActions={true} userRole="admin" />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs />
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isArabic ? 'لوحة تحكم مدير النظام' : 'System Administrator Dashboard'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {isArabic ? 'لوحة التحكم الشاملة لإدارة منصة بُعد HR' : 'Comprehensive control panel for managing BOUD HR platform'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationBell />
              <Button onClick={() => track('system_health_check')}>
                <Monitor className="w-4 h-4 mr-2" />
                {isArabic ? 'فحص النظام' : 'System Check'}
              </Button>
            </div>
          </div>
        </div>

        {/* System Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{isArabic ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
            <TabsTrigger value="tenants">{isArabic ? 'إدارة العملاء' : 'Tenant Management'}</TabsTrigger>
            <TabsTrigger value="billing">{isArabic ? 'الفوترة والاشتراكات' : 'Billing & Subscriptions'}</TabsTrigger>
            <TabsTrigger value="support">{isArabic ? 'الدعم' : 'Support'}</TabsTrigger>
            <TabsTrigger value="system">{isArabic ? 'النظام' : 'System'}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {isArabic ? 'نمو العملاء' : 'Client Growth'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    {isArabic ? 'رسم بياني لنمو العملاء' : 'Client growth chart placeholder'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {isArabic ? 'مراقبة النظام' : 'System Monitoring'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>{isArabic ? 'استخدام الخادم' : 'Server Usage'}</span>
                      <span className="font-bold text-green-600">23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{isArabic ? 'قاعدة البيانات' : 'Database Load'}</span>
                      <span className="font-bold text-blue-600">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{isArabic ? 'الذاكرة' : 'Memory Usage'}</span>
                      <span className="font-bold text-yellow-600">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tenant Management Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isArabic ? 'إدارة العملاء' : 'Tenant Management'}</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isArabic ? 'البحث في العملاء...' : 'Search tenants...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button onClick={handleCreateTenant}>
                  <Plus className="w-4 h-4 mr-2" />
                  {isArabic ? 'إنشاء عميل جديد' : 'Create New Tenant'}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4">{isArabic ? 'اسم العميل' : 'Tenant Name'}</th>
                        <th className="p-4">{isArabic ? 'الحالة' : 'Status'}</th>
                        <th className="p-4">{isArabic ? 'الباقة' : 'Plan'}</th>
                        <th className="p-4">{isArabic ? 'الموظفون' : 'Employees'}</th>
                        <th className="p-4">{isArabic ? 'آخر دخول' : 'Last Login'}</th>
                        <th className="p-4">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTenants.map((tenant) => (
                        <tr key={tenant.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{tenant.name}</div>
                              <div className="text-sm text-muted-foreground">{tenant.id}</div>
                            </div>
                          </td>
                          <td className="p-4">{getStatusBadge(tenant.status)}</td>
                          <td className="p-4">
                            <Badge variant="outline">{tenant.plan}</Badge>
                          </td>
                          <td className="p-4">{tenant.employees}</td>
                          <td className="p-4">
                            {new Date(tenant.lastLogin).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleTenantAction('edit', tenant.id)}
                              >
                                {isArabic ? 'تعديل' : 'Edit'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleTenantAction('suspend', tenant.id)}
                              >
                                {isArabic ? 'إيقاف' : 'Suspend'}
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

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isArabic ? 'الفوترة والاشتراكات' : 'Billing & Subscriptions'}</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {isArabic ? 'تصدير الفواتير' : 'Export Invoices'}
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {isArabic ? 'إنشاء فاتورة' : 'Create Invoice'}
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">$45,200</div>
                  <div className="text-sm text-muted-foreground">{isArabic ? 'إيرادات هذا الشهر' : 'This Month Revenue'}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">{isArabic ? 'فواتير متأخرة' : 'Overdue Invoices'}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">142</div>
                  <div className="text-sm text-muted-foreground">{isArabic ? 'فواتير مدفوعة' : 'Paid Invoices'}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4">{isArabic ? 'العميل' : 'Tenant'}</th>
                        <th className="p-4">{isArabic ? 'المبلغ' : 'Amount'}</th>
                        <th className="p-4">{isArabic ? 'الحالة' : 'Status'}</th>
                        <th className="p-4">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                        <th className="p-4">{isArabic ? 'الباقة' : 'Plan'}</th>
                        <th className="p-4">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBilling.map((bill) => (
                        <tr key={bill.tenantId} className="border-b hover:bg-muted/50">
                          <td className="p-4">{bill.tenantName}</td>
                          <td className="p-4 font-bold">${bill.amount.toLocaleString()}</td>
                          <td className="p-4">{getStatusBadge(bill.status)}</td>
                          <td className="p-4">{new Date(bill.dueDate).toLocaleDateString()}</td>
                          <td className="p-4">{bill.plan}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleBillingAction('view', bill.tenantId)}
                              >
                                {isArabic ? 'عرض' : 'View'}
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleBillingAction('generate_pdf', bill.tenantId)}
                              >
                                PDF
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

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <h2 className="text-2xl font-bold">{isArabic ? 'الدعم' : 'Support'}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? 'تذاكر الدعم' : 'Support Tickets'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <HeadphonesIcon className="h-12 w-12 mx-auto mb-4" />
                    <p>{isArabic ? 'نظام تذاكر الدعم قيد التطوير' : 'Support ticket system under development'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? 'إحصائيات الدعم' : 'Support Statistics'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{isArabic ? 'التذاكر المفتوحة' : 'Open Tickets'}</span>
                      <Badge>12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>{isArabic ? 'متوسط وقت الاستجابة' : 'Avg Response Time'}</span>
                      <Badge variant="outline">2.5h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>{isArabic ? 'معدل الرضا' : 'Satisfaction Rate'}</span>
                      <Badge className="bg-green-100 text-green-800">94%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-2xl font-bold">{isArabic ? 'النظام والإصدارات' : 'System & Versions'}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? 'حالة النظام' : 'System Status'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>{isArabic ? 'الخوادم' : 'Servers'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">{isArabic ? 'تعمل بشكل طبيعي' : 'Operational'}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{isArabic ? 'قاعدة البيانات' : 'Database'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">{isArabic ? 'تعمل بشكل طبيعي' : 'Operational'}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{isArabic ? 'التكاملات الخارجية' : 'External Integrations'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-600">{isArabic ? 'صيانة جزئية' : 'Partial Maintenance'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? 'الإصدارات' : 'Version History'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-green-200 pl-4">
                      <div className="font-medium">v2.1.5</div>
                      <div className="text-sm text-muted-foreground">{isArabic ? 'تم النشر في 15 يناير' : 'Deployed Jan 15'}</div>
                      <div className="text-sm text-green-600">{isArabic ? '✓ نشط' : '✓ Active'}</div>
                    </div>
                    <div className="border-l-2 border-gray-200 pl-4">
                      <div className="font-medium">v2.1.4</div>
                      <div className="text-sm text-muted-foreground">{isArabic ? 'تم النشر في 8 يناير' : 'Deployed Jan 8'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};