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
    const { employeeData, analysisType, context } = await req.json();

    let prompt = '';
    let model = 'gpt-4.1-2025-04-14';

    switch (analysisType) {
      case 'performance_analysis':
        prompt = `
        أنت مستشار موارد بشرية خبير متخصص في تحليل الأداء. قم بتحليل البيانات التالية للموظف وقدم تقييماً شاملاً:

        بيانات الموظف:
        ${JSON.stringify(employeeData, null, 2)}

        السياق الإضافي:
        ${context || 'لا يوجد سياق إضافي'}

        أرجو تقديم تحليل شامل يتضمن:
        1. تقييم الأداء العام (من 1-100)
        2. نقاط القوة الرئيسية (3-5 نقاط)
        3. المجالات التي تحتاج تطوير (3-5 نقاط)
        4. التوصيات المحددة للتحسين
        5. أهداف قابلة للقياس للربع القادم
        6. توصيات للتدريب والتطوير
        7. تقييم المخاطر والفرص

        يجب أن يكون التحليل مفصلاً ومبنياً على البيانات المقدمة، ومكتوباً باللغة العربية.
        `;
        break;

      case 'competency_assessment':
        prompt = `
        أنت خبير في تقييم الكفاءات والمهارات. قم بتحليل المهارات والكفاءات التالية:

        بيانات الموظف:
        ${JSON.stringify(employeeData, null, 2)}

        قدم تقييماً شاملاً للكفاءات يتضمن:
        1. تقييم المهارات التقنية
        2. تقييم المهارات السلوكية
        3. مهارات القيادة والإدارة
        4. مهارات التواصل والعمل الجماعي
        5. القدرة على التكيف والابتكار
        6. خطة تطوير المهارات
        7. المسار الوظيفي المقترح

        استخدم مقياس من 1-5 لكل كفاءة وقدم توضيحاً مفصلاً.
        `;
        break;

      case 'career_planning':
        prompt = `
        أنت مستشار تطوير وظيفي خبير. قم بإعداد خطة تطوير وظيفي شاملة:

        بيانات الموظف:
        ${JSON.stringify(employeeeData, null, 2)}

        أعد خطة تطوير وظيفي تتضمن:
        1. تحليل الوضع الحالي
        2. الأهداف قصيرة المدى (6-12 شهر)
        3. الأهداف متوسطة المدى (1-3 سنوات)
        4. الأهداف طويلة المدى (3-5 سنوات)
        5. المهارات المطلوب تطويرها
        6. الخبرات المطلوب اكتسابها
        7. المناصب المستقبلية المحتملة
        8. خطة التدريب والتطوير
        `;
        break;

      case 'risk_assessment':
        prompt = `
        أنت محلل مخاطر الموارد البشرية. قم بتحليل المخاطر المتعلقة بهذا الموظف:

        بيانات الموظف:
        ${JSON.stringify(employeeData, null, 2)}

        قدم تحليل مخاطر شامل يتضمن:
        1. مخاطر الاستقالة (احتمالية ومؤشرات)
        2. مخاطر انخفاض الأداء
        3. مخاطر عدم الالتزام
        4. المخاطر المهنية والتقنية
        5. التوصيات للحد من المخاطر
        6. خطة الاحتفاظ بالموهبة
        7. خطة الطوارئ
        `;
        break;

      default:
        prompt = `
        قم بتحليل عام لبيانات الموظف التالية وقدم رؤى مفيدة:
        ${JSON.stringify(employeeData, null, 2)}
        `;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { 
            role: 'system', 
            content: 'أنت خبير موارد بشرية متخصص في تحليل الأداء وتقييم الموظفين. تقدم تحليلات دقيقة ومفصلة وتوصيات عملية قابلة للتطبيق.' 
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Try to structure the response
    let structuredAnalysis;
    try {
      // Attempt to extract structured data from the analysis
      structuredAnalysis = {
        summary: analysis.split('\n')[0] || '',
        fullAnalysis: analysis,
        recommendations: extractRecommendations(analysis),
        rating: extractRating(analysis),
        keyPoints: extractKeyPoints(analysis),
        timestamp: new Date().toISOString()
      };
    } catch (parseError) {
      console.error('Error structuring analysis:', parseError);
      structuredAnalysis = {
        summary: 'تم إنتاج التحليل بنجاح',
        fullAnalysis: analysis,
        recommendations: [],
        rating: null,
        keyPoints: [],
        timestamp: new Date().toISOString()
      };
    }

    return new Response(JSON.stringify(structuredAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-performance-analysis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'فشل في تحليل البيانات باستخدام الذكاء الاصطناعي'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions
function extractRecommendations(text: string): string[] {
  const recommendations: string[] = [];
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('توصية') || line.includes('يُنصح') || line.includes('يجب')) {
      recommendations.push(line);
    }
  }
  
  return recommendations.slice(0, 5); // Max 5 recommendations
}

function extractRating(text: string): number | null {
  const ratingMatch = text.match(/(\d+)\/100|(\d+)%|(\d+)\s*من\s*100/);
  if (ratingMatch) {
    return parseInt(ratingMatch[1] || ratingMatch[2] || ratingMatch[3]);
  }
  return null;
}

function extractKeyPoints(text: string): string[] {
  const keyPoints: string[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^\d+\.|^-|^•/) && trimmed.length > 10) {
      keyPoints.push(trimmed);
    }
  }
  
  return keyPoints.slice(0, 8); // Max 8 key points
}