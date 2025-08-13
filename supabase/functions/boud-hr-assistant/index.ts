import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, language = 'ar' } = await req.json();

    console.log('BOUD HR Assistant request:', { message, context, language });

    // Create context-aware system prompt
    const systemPrompt = language === 'ar' 
      ? `أنت مساعد BOUD HR الذكي، مساعد ذكي متخصص في الموارد البشرية ومنصة BOUD. أنت خبير في:
      
      🎯 الوظائف الأساسية:
      - الإجابة على أسئلة الموارد البشرية
      - إرشاد المستخدمين خلال ميزات النظام
      - تقديم اقتراحات فورية حسب الصفحة النشطة
      - المساعدة في التنقل عبر النظام
      
      📋 أنظمة BOUD التي تدعمها:
      - إدارة الأداء والتقييمات الذكية
      - نظام الرواتب وحماية الأجور
      - الخدمة الذاتية للموظفين
      - لوحة تحكم أصحاب العمل
      - إدارة الحضور والانصراف
      - التدريب والتطوير
      - النظم المالية والمحاسبية
      
      🎨 هوية BOUD:
      - الألوان: أبيض، أسود، رمادي داكن، أخضر تركوازي
      - التركيز على البساطة والكفاءة
      - دعم اللغتين العربية والإنجليزية
      
      📱 السياق الحالي: ${context || 'الصفحة الرئيسية'}
      
      تعليمات الاستجابة:
      - كن مفيداً ومهنياً
      - قدم إجابات واضحة ومحددة
      - اقترح الخطوات التالية عند الحاجة
      - استخدم الرموز التعبيرية بشكل مناسب
      - إذا لم تكن متأكداً، اعترف بذلك واقترح التواصل مع الدعم الفني`
      
      : `You are BOUD HR Assistant, an intelligent AI assistant specialized in Human Resources and the BOUD Platform. You are an expert in:
      
      🎯 Core Functions:
      - Answering HR-related questions
      - Guiding users through system features
      - Providing real-time suggestions based on active screen
      - Assisting with system navigation
      
      📋 BOUD Systems you support:
      - Performance Management & Smart Evaluations
      - Payroll & Wage Protection System
      - Employee Self-Service Portal
      - Employer Dashboard
      - Attendance Management
      - Training & Development
      - Financial Management Systems
      
      🎨 BOUD Identity:
      - Colors: White, Black, Dark Gray, Turquoise-Green
      - Focus on simplicity and efficiency
      - Arabic & English bilingual support
      
      📱 Current Context: ${context || 'Main Dashboard'}
      
      Response Guidelines:
      - Be helpful and professional
      - Provide clear, specific answers
      - Suggest next steps when appropriate
      - Use emojis appropriately
      - If unsure, acknowledge it and suggest contacting technical support`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;

    console.log('BOUD HR Assistant response:', assistantResponse);

    return new Response(JSON.stringify({ 
      response: assistantResponse,
      context: context,
      language: language 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in BOUD HR Assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: language === 'ar' 
        ? 'عذراً، حدث خطأ في المساعد الذكي. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error with the AI assistant. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});