import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RewardAnalysisRequest {
  employeeId: string;
  analysisType: 'eligibility' | 'recommendation' | 'performance_impact' | 'optimal_timing';
  timeframe?: string;
  departments?: string[];
  performanceMetrics?: any;
  attendanceData?: any;
  projectData?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { employeeId, analysisType, timeframe, departments, performanceMetrics, attendanceData, projectData } = await req.json() as RewardAnalysisRequest;

    // Get employee data
    const { data: employee, error: empError } = await supabase
      .from('boud_employees')
      .select(`
        *,
        boud_departments(name),
        boud_positions(title)
      `)
      .eq('id', employeeId)
      .single();

    if (empError) throw empError;

    // Get historical reward data
    const { data: rewardHistory } = await supabase
      .from('reward_history')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    // Get performance data
    const { data: performanceData } = await supabase
      .from('performance_evaluations')
      .select('*')
      .eq('employee_id', employeeId)
      .order('evaluation_date', { ascending: false })
      .limit(5);

    // Get attendance data
    const { data: attendance } = await supabase
      .from('boud_attendance_records')
      .select('*')
      .eq('employee_id', employeeId)
      .gte('date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: false });

    let analysisPrompt = '';
    let systemContext = `أنت مستشار ذكي لإدارة المكافآت والحوافز في شركة. تحليلك يجب أن يكون دقيقاً ومبنياً على البيانات الفعلية.

بيانات الموظف:
- الاسم: ${employee.first_name} ${employee.last_name}
- المنصب: ${employee.boud_positions?.title || 'غير محدد'}
- القسم: ${employee.boud_departments?.name || 'غير محدد'}
- الراتب الأساسي: ${employee.basic_salary} ريال
- تاريخ التوظيف: ${employee.hire_date}

بيانات الأداء السابق: ${JSON.stringify(performanceData)}
تاريخ المكافآت: ${JSON.stringify(rewardHistory)}
بيانات الحضور: ${attendance ? `${attendance.length} سجل في آخر 90 يوم` : 'لا توجد بيانات'}`;

    switch (analysisType) {
      case 'eligibility':
        analysisPrompt = `قم بتحليل أهلية الموظف للحصول على مكافآت بناءً على:
        1. الأداء الحالي والسابق
        2. معدل الحضور والانتظام
        3. تحقيق الأهداف والمؤشرات
        4. المساهمة في المشاريع
        5. السلوك المهني والالتزام
        
        أعطني نتيجة شاملة تتضمن:
        - نسبة الأهلية (من 0 إلى 100)
        - نوع المكافأة المناسبة
        - المبلغ المقترح
        - المبرر التفصيلي
        - التوصيات للتحسين`;
        break;

      case 'recommendation':
        analysisPrompt = `اقترح برنامج مكافآت مخصص لهذا الموظف يشمل:
        1. أنواع المكافآت المناسبة (مالية، معنوية، تطويرية)
        2. معايير الاستحقاق المحددة
        3. الجدول الزمني المقترح
        4. طرق القياس والتقييم
        5. استراتيجية التحفيز طويلة المدى
        
        ركز على الشخصية المهنية ونقاط القوة`;
        break;

      case 'performance_impact':
        analysisPrompt = `حلل تأثير المكافآت السابقة على أداء الموظف:
        1. تحسن الأداء بعد المكافآت
        2. تأثير على الحضور والالتزام
        3. المساهمة في تحقيق الأهداف
        4. التأثير على الروح المعنوية
        5. عائد الاستثمار من المكافآت
        
        قدم توصيات لتحسين فعالية برامج التحفيز`;
        break;

      case 'optimal_timing':
        analysisPrompt = `حدد التوقيت الأمثل لمنح المكافآت لهذا الموظف:
        1. أفضل الأوقات في السنة
        2. ربط بالإنجازات والمناسبات
        3. تكرار المكافآت المناسب
        4. التوازن بين المكافآت المختلفة
        5. تجنب التضخم في التوقعات
        
        اعتبر المواسم والدورات التجارية`;
        break;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemContext
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const aiResult = await response.json();
    const analysis = aiResult.choices[0].message.content;

    // Store the analysis result
    const { error: insertError } = await supabase
      .from('ai_insights')
      .insert({
        user_id: employee.user_id,
        insight_type: `rewards_${analysisType}`,
        title: `تحليل المكافآت: ${analysisType}`,
        description: analysis,
        data: {
          employee_id: employeeId,
          analysis_type: analysisType,
          employee_data: employee,
          performance_data: performanceData,
          reward_history: rewardHistory,
          attendance_summary: attendance ? {
            total_days: attendance.length,
            present_days: attendance.filter(a => a.status === 'present').length,
            late_days: attendance.filter(a => a.status === 'late').length
          } : null
        },
        severity: 'info'
      });

    if (insertError) {
      console.error('Error storing AI insight:', insertError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis,
        metadata: {
          employee_name: `${employee.first_name} ${employee.last_name}`,
          analysis_type: analysisType,
          timestamp: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in comprehensive-rewards-ai function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});