import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Download, ArrowRight, FileText, Crown } from 'lucide-react';
import { BoudLogo } from '@/components/BoudLogo';

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      confirmPayment(sessionId);
    } else {
      setLoading(false);
      toast({
        title: "خطأ",
        description: "معرف الجلسة غير موجود",
        variant: "destructive"
      });
    }
  }, [searchParams]);

  const confirmPayment = async (sessionId: string) => {
    try {
      setLoading(true);

      console.log('Confirming payment for session:', sessionId);

      const { data, error } = await supabase.functions.invoke('confirm-subscription-payment', {
        body: { sessionId }
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('Payment confirmed:', data);

      setSubscriptionData(data.subscription);
      setInvoiceData(data.invoice);

      toast({
        title: "تم تأكيد الدفع بنجاح! 🎉",
        description: "تم تفعيل اشتراكك في منصة بُعد",
      });

    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast({
        title: "خطأ في تأكيد الدفع",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async () => {
    if (!invoiceData?.pdf_url) {
      toast({
        title: "خطأ",
        description: "رابط الفاتورة غير متوفر",
        variant: "destructive"
      });
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = invoiceData.pdf_url;
      link.download = `فاتورة-${invoiceData.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "تم تحميل الفاتورة",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">جاري تأكيد الدفع...</h3>
              <p className="text-muted-foreground">يرجى الانتظار</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <BoudLogo size="lg" className="mx-auto mb-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-8">
              <div className="text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-green-800 mb-4">
                  🎉 تم تأكيد اشتراكك بنجاح!
                </h1>
                <p className="text-lg text-green-700 mb-6">
                  مرحباً بك في منصة بُعد لإدارة الموارد البشرية
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Crown className="w-5 h-5" />
                  <span className="font-semibold">اشتراكك مفعل الآن</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Subscription Details */}
            {subscriptionData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    تفاصيل الاشتراك
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">اسم الشركة:</span>
                    <span className="font-semibold">{subscriptionData.company_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">عدد الموظفين:</span>
                    <span className="font-semibold">{subscriptionData.employee_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نوع الاشتراك:</span>
                    <span className="font-semibold">
                      {subscriptionData.billing_cycle === 'monthly' ? 'شهري' : 'سنوي'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">تاريخ البداية:</span>
                    <span className="font-semibold">
                      {new Date(subscriptionData.subscription_start).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">تاريخ الانتهاء:</span>
                    <span className="font-semibold">
                      {new Date(subscriptionData.subscription_end).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        نشط
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Invoice Details */}
            {invoiceData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    تفاصيل الفاتورة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">رقم الفاتورة:</span>
                    <span className="font-semibold font-mono">{invoiceData.invoice_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">تاريخ الإصدار:</span>
                    <span className="font-semibold">
                      {new Date(invoiceData.issue_date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">المبلغ الفرعي:</span>
                    <span className="font-semibold">{Number(invoiceData.subtotal).toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ضريبة القيمة المضافة:</span>
                    <span className="font-semibold">{Number(invoiceData.tax_amount).toFixed(2)} ريال</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
                      <span className="text-lg font-bold text-primary">
                        {Number(invoiceData.total_amount).toFixed(2)} ريال
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      onClick={downloadInvoice}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      تحميل الفاتورة PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>الخطوات التالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-3">ابدأ الآن:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium">ادخل إلى لوحة التحكم</p>
                        <p className="text-sm text-muted-foreground">ابدأ في إعداد منصتك وإضافة الموظفين</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium">أضف موظفيك</p>
                        <p className="text-sm text-muted-foreground">قم بدعوة موظفيك وإنشاء ملفاتهم الشخصية</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <p className="font-medium">استكشف الميزات</p>
                        <p className="text-sm text-muted-foreground">تعرف على جميع أدوات المنصة المتاحة</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-3">الدعم والمساعدة:</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-1">دعم فني على مدار الساعة</p>
                      <p className="text-sm text-muted-foreground">تواصل معنا في أي وقت للحصول على المساعدة</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-1">تدريب مجاني</p>
                      <p className="text-sm text-muted-foreground">احصل على تدريب شامل لفريقك</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-1">موارد تعليمية</p>
                      <p className="text-sm text-muted-foreground">أدلة ومقاطع فيديو تعليمية شاملة</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="flex-1 sm:flex-initial"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              ادخل إلى لوحة التحكم
            </Button>
            <Button 
              onClick={() => navigate('/invoices-dashboard')}
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-initial"
            >
              <FileText className="w-5 h-5 mr-2" />
              عرض الفواتير والاشتراكات
            </Button>
          </div>

          {/* Thank You Message */}
          <Card className="mt-8 bg-primary/5">
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-2">
                <strong>شكراً لاختيارك منصة بُعد! 🙏</strong>
              </p>
              <p className="text-muted-foreground">
                نحن متحمسون لمساعدتك في تحسين إدارة الموارد البشرية في شركتك
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;