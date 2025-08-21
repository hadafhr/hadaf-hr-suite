import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  packageId: string;
  billingCycle: 'monthly' | 'yearly';
  companyName: string;
  employeeCount: number;
  contactEmail: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating subscription checkout session");

    // إنشاء Supabase client باستخدام service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // التحقق من المصادقة
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user?.email) throw new Error("User not authenticated");

    const user = userData.user;
    console.log(`Processing checkout for user: ${user.email}`);

    // قراءة بيانات الطلب
    const { packageId, billingCycle, companyName, employeeCount, contactEmail }: CheckoutRequest = await req.json();

    // جلب معلومات الباقة
    const { data: packageData, error: packageError } = await supabaseClient
      .from('boud_subscription_packages')
      .select('*')
      .eq('id', packageId)
      .eq('is_active', true)
      .single();

    if (packageError || !packageData) {
      throw new Error("Package not found or inactive");
    }

    console.log(`Package selected: ${packageData.package_name}`);

    // تهيئة Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // التحقق من وجود عميل Stripe
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // إنشاء عميل جديد
      const customer = await stripe.customers.create({
        email: user.email,
        name: companyName,
        metadata: {
          user_id: user.id,
          company_name: companyName,
        }
      });
      customerId = customer.id;
    }

    // حساب السعر
    const price = billingCycle === 'yearly' 
      ? Number(packageData.price_yearly) 
      : Number(packageData.price_monthly);

    const subtotal = price * employeeCount;
    const taxRate = 0.15; // ضريبة القيمة المضافة 15%
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    console.log(`Pricing: Subtotal=${subtotal}, Tax=${taxAmount}, Total=${totalAmount}`);

    // إنشاء جلسة الدفع
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "sar",
            product_data: {
              name: `${packageData.package_name} - ${employeeCount} موظف`,
              description: `اشتراك ${billingCycle === 'monthly' ? 'شهري' : 'سنوي'} في منصة بُعد HR`,
              images: []
            },
            unit_amount: Math.round(totalAmount * 100), // تحويل إلى هللة
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/subscription-packages`,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        billing_cycle: billingCycle,
        company_name: companyName,
        employee_count: employeeCount.toString(),
        contact_email: contactEmail,
        subtotal: subtotal.toString(),
        tax_amount: taxAmount.toString(),
        total_amount: totalAmount.toString(),
      },
      customer_update: {
        address: 'auto',
        name: 'auto'
      },
      billing_address_collection: 'required',
    });

    console.log(`Checkout session created: ${session.id}`);

    // إنشاء اشتراك مؤقت في قاعدة البيانات
    const subscriptionEndDate = new Date();
    if (billingCycle === 'yearly') {
      subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
    } else {
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
    }

    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('boud_user_subscriptions')
      .insert({
        user_id: user.id,
        package_id: packageId,
        company_name: companyName,
        contact_email: contactEmail,
        employee_count: employeeCount,
        billing_cycle: billingCycle,
        subscription_start: new Date().toISOString().split('T')[0],
        subscription_end: subscriptionEndDate.toISOString().split('T')[0],
        status: 'pending',
        stripe_customer_id: customerId,
      })
      .select()
      .single();

    if (subscriptionError) {
      console.error('Subscription creation error:', subscriptionError);
      throw new Error("Failed to create subscription record");
    }

    console.log(`Subscription created with ID: ${subscriptionData.id}`);

    // إنشاء فاتورة مؤقتة
    const invoiceNumber = await generateInvoiceNumber();
    
    const { error: invoiceError } = await supabaseClient
      .from('invoices')
      .insert({
        user_id: user.id,
        subscription_id: subscriptionData.id,
        invoice_number: invoiceNumber,
        issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date().toISOString().split('T')[0],
        subtotal: subtotal,
        tax_rate: 15.00,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        currency: 'SAR',
        payment_status: 'pending',
        stripe_session_id: session.id,
      });

    if (invoiceError) {
      console.error('Invoice creation error:', invoiceError);
    }

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

// دالة مساعدة لتوليد رقم الفاتورة
async function generateInvoiceNumber(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BOUD-${currentYear}-${randomNum}`;
}