import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Download, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Clock, 
  RefreshCw,
  Crown,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components/BackButton';

interface Subscription {
  id: string;
  company_name: string;
  employee_count: number;
  billing_cycle: string;
  subscription_start: string;
  subscription_end: string;
  status: string;
  boud_subscription_packages: {
    package_name: string;
    price_monthly: number;
    price_yearly: number;
  };
}

interface Invoice {
  id: string;
  invoice_number: string;
  issue_date?: string;
  total_amount?: number;
  amount?: number;
  payment_status?: string;
  status?: string;
  pdf_url?: string;
  currency: string;
}

const InvoicesDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState({
    totalSpent: 0,
    activeSubscriptions: 0,
    upcomingRenewals: 0,
    paidInvoices: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // جلب الاشتراكات
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('boud_user_subscriptions')
        .select(`
          *,
          boud_subscription_packages (
            package_name,
            price_monthly,
            price_yearly
          )
        `)
        .order('created_at', { ascending: false });

      if (subscriptionsError) throw subscriptionsError;

      // جلب الفواتير
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .order('issue_date', { ascending: false });

      if (invoicesError) throw invoicesError;

      setSubscriptions(subscriptionsData || []);
      setInvoices(invoicesData || []);

      // حساب الإحصائيات
      const totalSpent = invoicesData?.reduce((sum, invoice) => 
        sum + (invoice.payment_status === 'paid' ? Number(invoice.total_amount) : 0), 0) || 0;
      
      const activeSubscriptions = subscriptionsData?.filter(sub => sub.status === 'active').length || 0;
      
      const upcomingRenewals = subscriptionsData?.filter(sub => {
        const endDate = new Date(sub.subscription_end);
        const now = new Date();
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
      }).length || 0;
      
      const paidInvoices = invoicesData?.filter(invoice => invoice.payment_status === 'paid').length || 0;

      setStats({
        totalSpent,
        activeSubscriptions,
        upcomingRenewals,
        paidInvoices,
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "تعذر جلب بيانات الاشتراكات والفواتير",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (invoice: Invoice) => {
    if (!invoice.pdf_url) {
      toast({
        title: "خطأ",
        description: "رابط الفاتورة غير متوفر",
        variant: "destructive"
      });
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = invoice.pdf_url;
      link.download = `فاتورة-${invoice.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "تم التحميل",
        description: "تم تحميل الفاتورة بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في التحميل",
        description: "فشل في تحميل الفاتورة",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { label: 'نشط', variant: 'default' as const, icon: CheckCircle },
      'expired': { label: 'منتهي', variant: 'destructive' as const, icon: AlertTriangle },
      'cancelled': { label: 'ملغي', variant: 'secondary' as const, icon: AlertTriangle },
      'pending': { label: 'معلق', variant: 'outline' as const, icon: Clock },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      'paid': { label: 'مدفوعة', variant: 'default' as const, icon: CheckCircle },
      'pending': { label: 'معلقة', variant: 'outline' as const, icon: Clock },
      'failed': { label: 'فاشلة', variant: 'destructive' as const, icon: AlertTriangle },
      'refunded': { label: 'مسترد', variant: 'secondary' as const, icon: RefreshCw },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">جاري تحميل البيانات...</h3>
              <p className="text-muted-foreground">يرجى الانتظار</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold">الفواتير والاشتراكات</h1>
              <p className="text-muted-foreground">إدارة اشتراكاتك وفواتيرك</p>
            </div>
          </div>
          <BoudLogo size="md" />
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المدفوع</p>
                  <p className="text-2xl font-bold">{stats.totalSpent.toFixed(2)} ريال</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الاشتراكات النشطة</p>
                  <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
                </div>
                <Crown className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">تجديد قريب</p>
                  <p className="text-2xl font-bold">{stats.upcomingRenewals}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الفواتير المدفوعة</p>
                  <p className="text-2xl font-bold">{stats.paidInvoices}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                الاشتراكات النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.filter(sub => sub.status === 'active').map((subscription) => (
                  <div key={subscription.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{subscription.company_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subscription.boud_subscription_packages?.package_name}
                        </p>
                      </div>
                      {getStatusBadge(subscription.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{subscription.employee_count} موظف</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{subscription.billing_cycle === 'monthly' ? 'شهري' : 'سنوي'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ينتهي في:</span>
                        <span className="font-medium">
                          {new Date(subscription.subscription_end).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {subscriptions.filter(sub => sub.status === 'active').length === 0 && (
                  <div className="text-center py-8">
                    <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">لا توجد اشتراكات نشطة</p>
                    <Button 
                      onClick={() => navigate('/subscription-packages')}
                      className="mt-4"
                    >
                      اشترك الآن
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                الفواتير الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold font-mono text-sm">{invoice.invoice_number}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.issue_date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      {getPaymentStatusBadge(invoice.payment_status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="font-bold text-lg">
                          {Number(invoice.total_amount).toFixed(2)} {invoice.currency || 'ريال'}
                        </span>
                      </div>
                      
                      {invoice.pdf_url && (
                        <Button 
                          onClick={() => downloadInvoice(invoice)}
                          size="sm"
                          variant="outline"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          تحميل
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {invoices.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">لا توجد فواتير</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/subscription-packages')}
                className="flex-1 sm:flex-initial"
              >
                <Crown className="w-4 h-4 mr-2" />
                اشترك في باقة جديدة
              </Button>
              
              <Button 
                onClick={fetchData}
                variant="outline"
                className="flex-1 sm:flex-initial"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                تحديث البيانات
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="flex-1 sm:flex-initial"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                العودة للوحة التحكم
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoicesDashboard;