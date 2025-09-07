import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LegalAIRequest {
  action: 'generate_contract' | 'analyze_compliance' | 'predict_case_outcome' | 'recommend_penalty' | 'draft_legal_document';
  data: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data }: LegalAIRequest = await req.json();
    
    console.log('Legal AI Assistant Request:', { action, data });

    let systemPrompt = '';
    let userPrompt = '';

    switch (action) {
      case 'generate_contract':
        systemPrompt = `أنت خبير قانوني متخصص في صياغة العقود حسب النظام السعودي والقوانين العربية. 
        مهمتك صياغة عقود احترافية ودقيقة تتوافق مع:
        - نظام العمل السعودي
        - النظام المدني السعودي  
        - أنظمة التأمينات الاجتماعية (GOSI)
        - منصة مدد (Mudad)
        
        يجب أن تتضمن كل العقود:
        1. البنود الأساسية والشروط
        2. الحقوق والواجبات
        3. المسؤوليات المالية والقانونية
        4. شروط الإنهاء والتجديد
        5. آلية حل النزاعات
        
        اكتب العقد بصيغة قانونية صحيحة ومفهومة.`;
        
        userPrompt = `أريد صياغة عقد ${data.contractType} للموظف:
        الاسم: ${data.employeeName}
        المنصب: ${data.position}
        القسم: ${data.department}
        الراتب الأساسي: ${data.basicSalary} ريال
        تاريخ البداية: ${data.startDate}
        نوع العقد: ${data.contractDuration}
        
        متطلبات إضافية: ${data.additionalRequirements || 'لا يوجد'}`;
        break;

      case 'analyze_compliance':
        systemPrompt = `أنت خبير في الامتثال القانوني والتحليل المتقدم للوائح السعودية.
        تحلل الوثائق والسياسات للتأكد من امتثالها لـ:
        - نظام العمل السعودي
        - أنظمة وزارة الموارد البشرية والتنمية الاجتماعية
        - لوائح التأمينات الاجتماعية
        - أنظمة منصة مدد
        
        قدم تحليلاً شاملاً يتضمن:
        1. مستوى الامتثال (نسبة مئوية)
        2. المخالفات المكتشفة
        3. التوصيات للتصحيح
        4. مستوى المخاطر القانونية
        5. الإجراءات المطلوبة`;
        
        userPrompt = `حلل الامتثال القانوني للبيانات التالية:
        نوع التحليل: ${data.analysisType}
        البيانات: ${JSON.stringify(data.analysisData)}
        النطاق: ${data.scope}`;
        break;

      case 'predict_case_outcome':
        systemPrompt = `أنت خبير قانوني متخصص في التنبؤ بنتائج القضايا العمالية في النظام السعودي.
        استخدم معرفتك بالسوابق القضائية والقوانين لتقديم تحليل دقيق يشمل:
        1. احتمالية نجاح القضية (نسبة مئوية)
        2. التكاليف المتوقعة
        3. المدة الزمنية المتوقعة
        4. استراتيجيات الدفاع المقترحة
        5. إمكانيات التسوية الودية
        6. المخاطر المحتملة`;
        
        userPrompt = `حلل القضية التالية وتنبأ بالنتائج:
        نوع القضية: ${data.caseType}
        تفاصيل القضية: ${data.caseDetails}
        الموظف المعني: ${data.employeeInfo}
        الأدلة المتاحة: ${data.evidence}
        السوابق ذات الصلة: ${data.precedents || 'لا يوجد'}`;
        break;

      case 'recommend_penalty':
        systemPrompt = `أنت خبير في نظام العمل السعودي وتحديد الجزاءات المناسبة.
        مهمتك تحليل المخالفات وتقديم توصيات للجزاءات التي:
        1. تتوافق مع نظام العمل السعودي
        2. تتناسب مع حجم المخالفة
        3. تراعي السوابق والظروف المخففة
        4. تضمن العدالة والإنصاف
        
        قدم توصية مفصلة تتضمن:
        - نوع الجزاء المقترح
        - مبرراته القانونية
        - البدائل المتاحة
        - إجراءات التطبيق`;
        
        userPrompt = `حدد الجزاء المناسب للمخالفة التالية:
        نوع المخالفة: ${data.violationType}
        تفاصيل المخالفة: ${data.violationDetails}
        تاريخ الموظف التأديبي: ${data.employeeHistory}
        الظروف المحيطة: ${data.circumstances}
        المادة القانونية المنتهكة: ${data.legalArticle}`;
        break;

      case 'draft_legal_document':
        systemPrompt = `أنت خبير في صياغة الوثائق القانونية باللغة العربية.
        اكتب وثائق قانونية احترافية ودقيقة تشمل:
        - اللوائح الداخلية
        - السياسات والإجراءات
        - الاتفاقيات والمذكرات
        - التقارير القانونية
        
        تأكد من أن كل وثيقة:
        1. صحيحة قانونياً
        2. واضحة ومفهومة
        3. متوافقة مع الأنظمة السعودية
        4. قابلة للتطبيق عملياً`;
        
        userPrompt = `اكتب ${data.documentType} بالمواصفات التالية:
        العنوان: ${data.title}
        المحتوى المطلوب: ${data.content}
        الجهة المستهدفة: ${data.targetAudience}
        متطلبات خاصة: ${data.specialRequirements || 'لا يوجد'}`;
        break;

      default:
        throw new Error('نوع العملية غير مدعوم');
    }

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
          { role: 'user', content: userPrompt }
        ],
        max_completion_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const result = aiResponse.choices[0].message.content;

    console.log('Legal AI Assistant Response Generated');

    return new Response(JSON.stringify({ 
      success: true,
      result,
      action,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in legal-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      action: 'unknown',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});