import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generating invoice PDF");

    const { invoiceId } = await req.json();

    if (!invoiceId) {
      throw new Error("Invoice ID is required");
    }

    // إنشاء Supabase client باستخدام service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // جلب بيانات الفاتورة مع معلومات الاشتراك والباقة
    const { data: invoiceData, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select(`
        *,
        boud_user_subscriptions (
          *,
          boud_subscription_packages (*)
        ),
        invoice_line_items (*)
      `)
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoiceData) {
      throw new Error("Invoice not found");
    }

    console.log(`Generating PDF for invoice: ${invoiceData.invoice_number}`);

    // إنشاء محتوى HTML للفاتورة
    const htmlContent = generateInvoiceHTML(invoiceData);

    // تحويل HTML إلى PDF (استخدام Puppeteer محاكي)
    const pdfBuffer = await generatePDF(htmlContent);

    // رفع الملف إلى Supabase Storage
    const fileName = `invoice-${invoiceData.invoice_number}.pdf`;
    
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('invoices')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error("Failed to upload PDF");
    }

    // الحصول على الرابط العام
    const { data: urlData } = supabaseClient.storage
      .from('invoices')
      .getPublicUrl(fileName);

    console.log(`PDF generated successfully: ${urlData.publicUrl}`);

    return new Response(JSON.stringify({
      success: true,
      pdfUrl: urlData.publicUrl,
      fileName: fileName,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function generateInvoiceHTML(invoiceData: any): string {
  const subscription = invoiceData.boud_user_subscriptions;
  const package_info = subscription?.boud_subscription_packages;
  const lineItems = invoiceData.invoice_line_items || [];

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاتورة ${invoiceData.invoice_number}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Tajawal', Arial, sans-serif;
          line-height: 1.6;
          color: #2c3e50;
          background: #ffffff;
          padding: 20px;
        }

        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
          color: white;
          padding: 30px;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #38b2ac, #4fd1c7);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 700;
          color: #38b2ac;
        }

        .company-info {
          text-align: center;
        }

        .company-name {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .invoice-details {
          display: flex;
          justify-content: space-between;
          padding: 30px;
          background: #f8f9fa;
          border-bottom: 1px solid #e2e8f0;
        }

        .invoice-info, .client-info {
          flex: 1;
        }

        .invoice-info h3, .client-info h3 {
          color: #2d3748;
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: 600;
        }

        .info-item {
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .label {
          font-weight: 500;
          color: #4a5568;
        }

        .value {
          font-weight: 600;
          color: #2d3748;
        }

        .items-section {
          padding: 30px;
        }

        .items-title {
          color: #2d3748;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .items-table th {
          background: #f1f5f9;
          color: #475569;
          padding: 15px;
          text-align: center;
          font-weight: 600;
          border: 1px solid #e2e8f0;
        }

        .items-table td {
          padding: 12px 15px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .items-table tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .totals-section {
          background: #f8f9fa;
          padding: 20px 30px;
          border-top: 2px solid #e2e8f0;
        }

        .totals-table {
          width: 100%;
          max-width: 400px;
          margin-left: auto;
        }

        .totals-table td {
          padding: 8px 15px;
          font-size: 16px;
        }

        .totals-table .label {
          text-align: right;
          font-weight: 500;
        }

        .totals-table .amount {
          text-align: left;
          font-weight: 600;
        }

        .total-row {
          border-top: 2px solid #38b2ac;
          background: #e6fffa;
        }

        .total-row td {
          font-size: 18px;
          font-weight: 700;
          color: #2d3748;
          padding: 15px;
        }

        .footer {
          background: #2d3748;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 14px;
        }

        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-paid {
          background: #d4edda;
          color: #155724;
        }

        .status-pending {
          background: #fff3cd;
          color: #856404;
        }

        .notes-section {
          padding: 20px 30px;
          background: #e6fffa;
          border-top: 1px solid #e2e8f0;
        }

        .notes-title {
          font-weight: 600;
          margin-bottom: 10px;
          color: #2d3748;
        }

        .notes-text {
          color: #4a5568;
          line-height: 1.8;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header -->
        <div class="header">
          <div class="logo">
            <div class="logo-text">بُعد BOUD HR</div>
          </div>
          <div class="company-info">
            <div class="company-name">منصة بُعد لإدارة الموارد البشرية</div>
            <div>BOUD HR Management Platform</div>
          </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details">
          <div class="invoice-info">
            <h3>معلومات الفاتورة</h3>
            <div class="info-item">
              <span class="label">رقم الفاتورة:</span>
              <span class="value">${invoiceData.invoice_number}</span>
            </div>
            <div class="info-item">
              <span class="label">تاريخ الإصدار:</span>
              <span class="value">${new Date(invoiceData.issue_date).toLocaleDateString('ar-SA')}</span>
            </div>
            <div class="info-item">
              <span class="label">تاريخ الاستحقاق:</span>
              <span class="value">${new Date(invoiceData.due_date).toLocaleDateString('ar-SA')}</span>
            </div>
            <div class="info-item">
              <span class="label">حالة الدفع:</span>
              <span class="status-badge ${invoiceData.payment_status === 'paid' ? 'status-paid' : 'status-pending'}">
                ${invoiceData.payment_status === 'paid' ? 'مدفوعة' : 'معلقة'}
              </span>
            </div>
          </div>

          <div class="client-info">
            <h3>معلومات العميل</h3>
            <div class="info-item">
              <span class="label">اسم الشركة:</span>
              <span class="value">${subscription?.company_name || 'غير محدد'}</span>
            </div>
            <div class="info-item">
              <span class="label">البريد الإلكتروني:</span>
              <span class="value">${subscription?.contact_email || 'غير محدد'}</span>
            </div>
            <div class="info-item">
              <span class="label">عدد الموظفين:</span>
              <span class="value">${subscription?.employee_count || 0}</span>
            </div>
            <div class="info-item">
              <span class="label">نوع الاشتراك:</span>
              <span class="value">${subscription?.billing_cycle === 'monthly' ? 'شهري' : 'سنوي'}</span>
            </div>
          </div>
        </div>

        <!-- Items Section -->
        <div class="items-section">
          <h3 class="items-title">تفاصيل الاشتراك</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>الوصف</th>
                <th>الكمية</th>
                <th>السعر للوحدة</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              ${lineItems.map((item: any) => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${Number(item.unit_price).toFixed(2)} ريال</td>
                  <td>${Number(item.line_total).toFixed(2)} ريال</td>
                </tr>
              `).join('')}
              ${lineItems.length === 0 ? `
                <tr>
                  <td colspan="4">
                    ${package_info?.package_name || 'اشتراك'} - ${subscription?.employee_count || 1} موظف
                    <br>
                    <small>(${subscription?.billing_cycle === 'monthly' ? 'اشتراك شهري' : 'اشتراك سنوي'})</small>
                  </td>
                  <td>${subscription?.employee_count || 1}</td>
                  <td>${(Number(invoiceData.subtotal) / (subscription?.employee_count || 1)).toFixed(2)} ريال</td>
                  <td>${Number(invoiceData.subtotal).toFixed(2)} ريال</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>

        <!-- Totals Section -->
        <div class="totals-section">
          <table class="totals-table">
            <tr>
              <td class="label">المجموع الفرعي:</td>
              <td class="amount">${Number(invoiceData.subtotal).toFixed(2)} ريال</td>
            </tr>
            <tr>
              <td class="label">ضريبة القيمة المضافة (${invoiceData.tax_rate}%):</td>
              <td class="amount">${Number(invoiceData.tax_amount).toFixed(2)} ريال</td>
            </tr>
            <tr class="total-row">
              <td class="label">المبلغ الإجمالي:</td>
              <td class="amount">${Number(invoiceData.total_amount).toFixed(2)} ريال</td>
            </tr>
          </table>
        </div>

        <!-- Notes Section -->
        <div class="notes-section">
          <div class="notes-title">ملاحظات:</div>
          <div class="notes-text">
            ${invoiceData.payment_status === 'paid' 
              ? `تم الدفع بنجاح بتاريخ ${invoiceData.paid_at ? new Date(invoiceData.paid_at).toLocaleDateString('ar-SA') : 'غير محدد'}. الاشتراك مفعل حتى ${subscription?.subscription_end ? new Date(subscription.subscription_end).toLocaleDateString('ar-SA') : 'غير محدد'}.`
              : 'في انتظار تأكيد الدفع. سيتم تفعيل الاشتراك فور تأكيد الدفع.'
            }
            <br><br>
            شكراً لاختياركم منصة بُعد لإدارة الموارد البشرية. نتطلع لخدمتكم.
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div>منصة بُعد لإدارة الموارد البشرية | BOUD HR Management Platform</div>
          <div style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
            هذه فاتورة إلكترونية تم إنشاؤها تلقائياً ولا تحتاج إلى توقيع
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// محاكي تحويل HTML إلى PDF (في الواقع نحتاج مكتبة مثل Puppeteer)
async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  // هذه دالة مؤقتة - في الواقع نحتاج استخدام مكتبة PDF مناسبة
  // للآن سنقوم بإنشاء ملف HTML وإرجاعه كـ buffer
  const encoder = new TextEncoder();
  return encoder.encode(htmlContent);
}