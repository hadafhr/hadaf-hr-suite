import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Sending invoice email");

    const { invoiceId, userEmail } = await req.json();

    if (!invoiceId || !userEmail) {
      throw new Error("Invoice ID and user email are required");
    }

    // إنشاء Supabase client باستخدام service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // جلب بيانات الفاتورة
    const { data: invoiceData, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select(`
        *,
        boud_user_subscriptions (
          *,
          boud_subscription_packages (*)
        )
      `)
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoiceData) {
      throw new Error("Invoice not found");
    }

    const subscription = invoiceData.boud_user_subscriptions;
    const package_info = subscription?.boud_subscription_packages;

    console.log(`Sending invoice email to: ${userEmail}`);

    // تحضير محتوى البريد الإلكتروني
    const emailSubject = `فاتورة اشتراك بُعد HR - ${invoiceData.invoice_number}`;
    
    const emailHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #38b2ac 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .content {
            padding: 30px;
          }
          .invoice-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 5px 0;
          }
          .detail-row:not(:last-child) {
            border-bottom: 1px solid #e9ecef;
          }
          .label {
            font-weight: bold;
            color: #495057;
          }
          .value {
            color: #212529;
          }
          .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #38b2ac;
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: #e6fffa;
            border-radius: 8px;
          }
          .button {
            display: inline-block;
            background: #38b2ac;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin: 10px 5px;
          }
          .button:hover {
            background: #319795;
          }
          .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
          }
          .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            background: #d4edda;
            color: #155724;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">بُعد BOUD HR</div>
            <div>فاتورة الاشتراك الإلكترونية</div>
          </div>
          
          <div class="content">
            <h2>شكراً لاشتراكك في منصة بُعد!</h2>
            
            <p>عزيزي العميل،</p>
            <p>نشكرك لاختيار منصة بُعد لإدارة الموارد البشرية. إليك تفاصيل فاتورة الاشتراك:</p>
            
            <div class="invoice-details">
              <div class="detail-row">
                <span class="label">رقم الفاتورة:</span>
                <span class="value">${invoiceData.invoice_number}</span>
              </div>
              <div class="detail-row">
                <span class="label">تاريخ الإصدار:</span>
                <span class="value">${new Date(invoiceData.issue_date).toLocaleDateString('ar-SA')}</span>
              </div>
              <div class="detail-row">
                <span class="label">اسم الشركة:</span>
                <span class="value">${subscription?.company_name || 'غير محدد'}</span>
              </div>
              <div class="detail-row">
                <span class="label">نوع الباقة:</span>
                <span class="value">${package_info?.package_name || 'غير محدد'}</span>
              </div>
              <div class="detail-row">
                <span class="label">عدد الموظفين:</span>
                <span class="value">${subscription?.employee_count || 0}</span>
              </div>
              <div class="detail-row">
                <span class="label">مدة الاشتراك:</span>
                <span class="value">${subscription?.billing_cycle === 'monthly' ? 'شهري' : 'سنوي'}</span>
              </div>
              <div class="detail-row">
                <span class="label">حالة الدفع:</span>
                <span class="value">
                  <span class="status-badge">
                    ${invoiceData.payment_status === 'paid' ? 'مدفوعة ✓' : 'معلقة'}
                  </span>
                </span>
              </div>
            </div>
            
            <div class="total-amount">
              المبلغ الإجمالي: ${Number(invoiceData.total_amount).toFixed(2)} ريال سعودي
            </div>
            
            ${invoiceData.payment_status === 'paid' ? `
              <p style="color: #28a745; font-weight: bold; text-align: center;">
                ✅ تم تأكيد الدفع بنجاح!
              </p>
              <p style="text-align: center;">
                اشتراكك مفعل الآن حتى ${subscription?.subscription_end ? new Date(subscription.subscription_end).toLocaleDateString('ar-SA') : 'غير محدد'}
              </p>
            ` : `
              <p style="color: #dc3545; font-weight: bold; text-align: center;">
                ⏳ في انتظار تأكيد الدفع
              </p>
            `}
            
            <div style="text-align: center; margin: 30px 0;">
              ${invoiceData.pdf_url ? `
                <a href="${invoiceData.pdf_url}" class="button">تحميل الفاتورة PDF</a>
              ` : ''}
              <a href="${Deno.env.get("SUPABASE_URL")?.replace('/rest/v1', '')}/dashboard" class="button">لوحة التحكم</a>
            </div>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0c5460; margin-bottom: 10px;">الخطوات التالية:</h3>
              <ul style="color: #0c5460; margin: 0; padding-right: 20px;">
                <li>ادخل إلى لوحة التحكم لبدء استخدام المنصة</li>
                <li>أضف موظفيك وقم بإعداد الأقسام</li>
                <li>استفد من جميع ميزات الباقة المشترك بها</li>
                <li>تواصل مع الدعم الفني عند الحاجة</li>
              </ul>
            </div>
            
            <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.</p>
            
            <p>مع أطيب التحيات،<br>
            فريق بُعد للموارد البشرية</p>
          </div>
          
          <div class="footer">
            <p><strong>منصة بُعد لإدارة الموارد البشرية</strong></p>
            <p>BOUD HR Management Platform</p>
            <p style="margin-top: 10px; font-size: 12px;">
              هذه رسالة إلكترونية تلقائية، يرجى عدم الرد عليها مباشرة.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // إرسال البريد الإلكتروني
    const emailResponse = await resend.emails.send({
      from: "بُعد HR <noreply@boud-hr.com>",
      to: [userEmail],
      subject: emailSubject,
      html: emailHTML,
      attachments: invoiceData.pdf_url ? [
        {
          filename: `فاتورة-${invoiceData.invoice_number}.pdf`,
          path: invoiceData.pdf_url,
        }
      ] : [],
    });

    if (emailResponse.error) {
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    console.log(`Email sent successfully to ${userEmail}: ${emailResponse.data?.id}`);

    return new Response(JSON.stringify({
      success: true,
      emailId: emailResponse.data?.id,
      message: "Invoice email sent successfully",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});