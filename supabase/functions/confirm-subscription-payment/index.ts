import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
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
    console.log("Confirming subscription payment");

    const { sessionId } = await req.json();

    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    // إنشاء Supabase client باستخدام service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // تهيئة Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // جلب معلومات جلسة الدفع
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    console.log(`Payment confirmed for session: ${sessionId}`);

    const metadata = session.metadata;
    if (!metadata) {
      throw new Error("Session metadata not found");
    }

    // تحديث حالة الاشتراك
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('boud_user_subscriptions')
      .update({
        status: 'active',
        stripe_subscription_id: sessionId,
      })
      .eq('user_id', metadata.user_id)
      .eq('status', 'pending')
      .select()
      .single();

    if (subscriptionError) {
      console.error('Subscription update error:', subscriptionError);
      throw new Error("Failed to update subscription");
    }

    // تحديث الفاتورة
    const { data: invoiceData, error: invoiceUpdateError } = await supabaseClient
      .from('invoices')
      .update({
        payment_status: 'paid',
        paid_at: new Date().toISOString(),
        payment_method: session.payment_method_types?.[0] || 'card',
        stripe_invoice_id: session.payment_intent as string,
      })
      .eq('stripe_session_id', sessionId)
      .select()
      .single();

    if (invoiceUpdateError) {
      console.error('Invoice update error:', invoiceUpdateError);
      throw new Error("Failed to update invoice");
    }

    // إضافة عناصر الفاتورة
    const { error: lineItemError } = await supabaseClient
      .from('invoice_line_items')
      .insert({
        invoice_id: invoiceData.id,
        description: `اشتراك ${metadata.billing_cycle === 'monthly' ? 'شهري' : 'سنوي'} - ${metadata.employee_count} موظف`,
        quantity: parseInt(metadata.employee_count),
        unit_price: parseFloat(metadata.subtotal) / parseInt(metadata.employee_count),
        line_total: parseFloat(metadata.subtotal),
      });

    if (lineItemError) {
      console.error('Line item error:', lineItemError);
    }

    // توليد الفاتورة PDF
    try {
      const pdfResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/generate-invoice-pdf`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceId: invoiceData.id }),
      });

      if (pdfResponse.ok) {
        const { pdfUrl } = await pdfResponse.json();
        
        // تحديث رابط PDF في الفاتورة
        await supabaseClient
          .from('invoices')
          .update({ pdf_url: pdfUrl })
          .eq('id', invoiceData.id);

        // إرسال الفاتورة عبر البريد الإلكتروني
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-invoice-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            invoiceId: invoiceData.id,
            userEmail: metadata.contact_email 
          }),
        });
      }
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      // لا نفشل العملية بسبب خطأ في PDF
    }

    // جدولة تذكيرات التجديد
    const subscriptionEndDate = new Date(subscriptionData.subscription_end);
    
    // تذكير بعد 30 يوم
    const reminder30Days = new Date(subscriptionEndDate);
    reminder30Days.setDate(reminder30Days.getDate() - 30);
    
    // تذكير بعد 7 أيام
    const reminder7Days = new Date(subscriptionEndDate);
    reminder7Days.setDate(reminder7Days.getDate() - 7);
    
    // تذكير بعد يوم واحد
    const reminder1Day = new Date(subscriptionEndDate);
    reminder1Day.setDate(reminder1Day.getDate() - 1);

    await supabaseClient
      .from('renewal_reminders')
      .insert([
        {
          subscription_id: subscriptionData.id,
          reminder_type: '30_days',
        },
        {
          subscription_id: subscriptionData.id,
          reminder_type: '7_days',
        },
        {
          subscription_id: subscriptionData.id,
          reminder_type: '1_day',
        }
      ]);

    console.log(`Payment confirmation completed for subscription: ${subscriptionData.id}`);

    return new Response(JSON.stringify({
      success: true,
      subscription: subscriptionData,
      invoice: invoiceData,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});