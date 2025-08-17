import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY is not set');
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('OpenAI API key found');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      throw new Error('Supabase configuration is incomplete');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { analysisType = 'full' } = await req.json();

    console.log('Fetching HR data for analysis...');

    // Fetch relevant HR data with error handling
    let employees, disciplinaryActions, attendanceRecords, violations;
    
    try {
      const [
        employeesResult,
        disciplinaryResult,
        attendanceResult,
        violationsResult
      ] = await Promise.all([
        supabase.from('boud_employees').select('*').limit(100),
        supabase.from('disciplinary_actions').select('*').limit(100),
        supabase.from('attendance_records_new').select('*').limit(100),
        supabase.from('saudi_labor_violations').select('*').limit(20)
      ]);
      
      employees = employeesResult.data || [];
      disciplinaryActions = disciplinaryResult.data || [];
      attendanceRecords = attendanceResult.data || [];
      violations = violationsResult.data || [];
      
      console.log(`Fetched data: ${employees.length} employees, ${disciplinaryActions.length} disciplinary actions, ${attendanceRecords.length} attendance records, ${violations.length} violations`);
      
    } catch (dbError) {
      console.error('Database fetch error:', dbError);
      // Use fallback data if database fetch fails
      employees = [];
      disciplinaryActions = [];
      attendanceRecords = [];
      violations = [];
    }

    // Prepare data summary for AI analysis
    const dataSummary = {
      totalEmployees: employees.length || 0,
      activeEmployees: employees.filter(emp => emp.is_active).length || 0,
      totalDisciplinaryActions: disciplinaryActions.length || 0,
      pendingDisciplinaryActions: disciplinaryActions.filter(action => action.status === 'pending').length || 0,
      recentAttendanceIssues: attendanceRecords.filter(record => 
        record.status === 'late' || record.status === 'absent'
      ).length || 0,
      departmentDistribution: employees.reduce((acc: any, emp: any) => {
        const dept = emp.department_id || 'غير محدد';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {}),
      disciplinaryTrends: disciplinaryActions.reduce((acc: any, action: any) => {
        try {
          const month = new Date(action.created_at).getMonth();
          acc[month] = (acc[month] || 0) + 1;
        } catch (e) {
          console.warn('Invalid date in disciplinary action:', action.created_at);
        }
        return acc;
      }, {}),
      topViolations: violations.slice(0, 5) || []
    };

    console.log('Data summary prepared:', JSON.stringify(dataSummary, null, 2));

    const prompt = `
أنت محلل ذكي للموارد البشرية متخصص في تحليل بيانات الموظفين وتقديم التوصيات المهنية.

بيانات الشركة الحالية:
- إجمالي الموظفين: ${dataSummary.totalEmployees}
- الموظفون النشطون: ${dataSummary.activeEmployees}
- الإجراءات التأديبية الإجمالية: ${dataSummary.totalDisciplinaryActions}
- الإجراءات التأديبية المعلقة: ${dataSummary.pendingDisciplinaryActions}
- مشاكل الحضور الأخيرة: ${dataSummary.recentAttendanceIssues}

المطلوب منك تحليل هذه البيانات وتقديم تقرير شامل بصيغة JSON يحتوي على:

{
  "overview": {
    "overallScore": "نقاط من 100",
    "status": "ممتاز/جيد/متوسط/يحتاج تحسين",
    "summary": "ملخص عام عن حالة الموارد البشرية"
  },
  "insights": [
    {
      "type": "positive/warning/critical",
      "title": "عنوان الرؤية",
      "description": "وصف تفصيلي",
      "impact": "high/medium/low",
      "category": "disciplinary/attendance/performance/general"
    }
  ],
  "recommendations": [
    {
      "priority": "high/medium/low",
      "title": "عنوان التوصية",
      "description": "وصف التوصية",
      "expectedImpact": "الأثر المتوقع",
      "timeframe": "فورية/قصيرة المدى/طويلة المدى"
    }
  ],
  "riskAssessment": {
    "overallRisk": "منخفض/متوسط/مرتفع",
    "risks": [
      {
        "risk": "وصف المخاطرة",
        "probability": "منخفضة/متوسطة/مرتفعة",
        "impact": "منخفض/متوسط/مرتفع",
        "mitigation": "طرق التخفيف"
      }
    ]
  },
  "kpis": {
    "employeeRetention": "نسبة مئوية",
    "disciplinaryRate": "نسبة مئوية",
    "attendanceRate": "نسبة مئوية",
    "overallEfficiency": "نسبة مئوية"
  },
  "trends": {
    "disciplinaryTrend": "تصاعدي/تنازلي/مستقر",
    "attendanceTrend": "تحسن/تراجع/مستقر",
    "prediction": "توقعات الأشهر القادمة"
  }
}

يجب أن تكون جميع النصوص باللغة العربية ومهنية ومفيدة للإدارة.
`;

    console.log('Sending request to OpenAI...');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { 
              role: 'system', 
              content: 'أنت محلل ذكي للموارد البشرية. قدم تحليلاً مهنياً ودقيقاً بصيغة JSON صحيحة فقط بدون أي نص إضافي.' 
            },
            { role: 'user', content: prompt }
          ],
          max_tokens: 2000,
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, response.statusText, errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('OpenAI response received successfully');
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid OpenAI response structure:', data);
        throw new Error('Invalid response from OpenAI API');
      }

      let analysisResult;
      try {
        const content = data.choices[0].message.content.trim();
        console.log('Raw OpenAI response:', content);
        
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          analysisResult = JSON.parse(content);
        }
        
        console.log('Successfully parsed AI response');
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        console.log('Content that failed to parse:', data.choices[0].message.content);
        
        // Generate fallback response based on actual data
        analysisResult = generateFallbackAnalysis(dataSummary);
      }

      return new Response(JSON.stringify(analysisResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (openaiError) {
      console.error('OpenAI request failed:', openaiError);
      
      // Return fallback analysis when OpenAI fails
      const fallbackAnalysis = generateFallbackAnalysis(dataSummary);
      return new Response(JSON.stringify(fallbackAnalysis), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in hr-insights function:', error);
    
    // Generate fallback analysis even on major errors
    const fallbackAnalysis = generateFallbackAnalysis({
      totalEmployees: 0,
      activeEmployees: 0,
      totalDisciplinaryActions: 0,
      pendingDisciplinaryActions: 0,
      recentAttendanceIssues: 0,
      departmentDistribution: {},
      disciplinaryTrends: {},
      topViolations: []
    });
    
    return new Response(JSON.stringify(fallbackAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to generate fallback analysis based on data
function generateFallbackAnalysis(dataSummary: any) {
  const totalEmployees = dataSummary.totalEmployees || 0;
  const activeEmployees = dataSummary.activeEmployees || 0;
  const disciplinaryActions = dataSummary.totalDisciplinaryActions || 0;
  const attendanceIssues = dataSummary.recentAttendanceIssues || 0;
  
  // Calculate basic metrics
  const retentionRate = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 85;
  const disciplinaryRate = totalEmployees > 0 ? Math.round((disciplinaryActions / totalEmployees) * 100) : 8;
  const attendanceRate = totalEmployees > 0 ? Math.round(((totalEmployees - attendanceIssues) / totalEmployees) * 100) : 92;
  const efficiency = Math.round((retentionRate + attendanceRate + (100 - disciplinaryRate)) / 3);
  
  return {
    "overview": {
      "overallScore": efficiency.toString(),
      "status": efficiency >= 85 ? "ممتاز" : efficiency >= 70 ? "جيد" : efficiency >= 50 ? "متوسط" : "يحتاج تحسين",
      "summary": `النظام يعمل ${efficiency >= 70 ? 'بكفاءة جيدة' : 'ويحتاج إلى تحسينات'} مع ${totalEmployees} موظف نشط في النظام`
    },
    "insights": [
      {
        "type": retentionRate >= 90 ? "positive" : retentionRate >= 70 ? "warning" : "critical",
        "title": `معدل الاحتفاظ بالموظفين ${retentionRate}%`,
        "description": `${retentionRate >= 90 ? 'معدل ممتاز للاحتفاظ بالموظفين' : retentionRate >= 70 ? 'معدل جيد لكن يمكن تحسينه' : 'معدل منخفض يحتاج إلى تدخل فوري'}`,
        "impact": retentionRate >= 90 ? "medium" : "high",
        "category": "general"
      },
      {
        "type": attendanceRate >= 95 ? "positive" : attendanceRate >= 85 ? "warning" : "critical",
        "title": `معدل الحضور ${attendanceRate}%`,
        "description": `${attendanceIssues > 0 ? `يوجد ${attendanceIssues} حالة مشاكل في الحضور` : 'الحضور في المستوى المطلوب'}`,
        "impact": attendanceRate >= 85 ? "medium" : "high",
        "category": "attendance"
      },
      {
        "type": disciplinaryRate <= 5 ? "positive" : disciplinaryRate <= 15 ? "warning" : "critical",
        "title": `معدل الإجراءات التأديبية ${disciplinaryRate}%`,
        "description": `${disciplinaryActions > 0 ? `يوجد ${disciplinaryActions} إجراء تأديبي في النظام` : 'لا توجد إجراءات تأديبية معلقة'}`,
        "impact": disciplinaryRate <= 10 ? "low" : "medium",
        "category": "disciplinary"
      }
    ],
    "recommendations": [
      {
        "priority": efficiency < 70 ? "high" : "medium",
        "title": "تحسين نظام إدارة الموارد البشرية",
        "description": "تطوير آليات أفضل لمتابعة أداء الموظفين وضمان الانضباط",
        "expectedImpact": "تحسين الكفاءة العامة بنسبة 15-20%",
        "timeframe": "متوسطة المدى"
      },
      {
        "priority": attendanceIssues > 5 ? "high" : "low",
        "title": "تعزيز برامج الحضور والانصراف",
        "description": "إنشاء نظام حوافز للحضور المنتظم ومتابعة أفضل للغياب",
        "expectedImpact": "تحسين معدل الحضور بنسبة 10%",
        "timeframe": "قصيرة المدى"
      },
      {
        "priority": disciplinaryActions > 3 ? "high" : "low",
        "title": "برامج التوعية والتطوير",
        "description": "تنفيذ برامج توعية للموظفين وورش عمل لتطوير السلوك المهني",
        "expectedImpact": "تقليل المخالفات بنسبة 25%",
        "timeframe": "متوسطة المدى"
      }
    ],
    "riskAssessment": {
      "overallRisk": efficiency >= 80 ? "منخفض" : efficiency >= 60 ? "متوسط" : "مرتفع",
      "risks": [
        {
          "risk": "تراجع في الأداء العام",
          "probability": efficiency < 70 ? "مرتفعة" : "منخفضة",
          "impact": "متوسط",
          "mitigation": "تطبيق برامج التحسين المقترحة ومتابعة دورية للمؤشرات"
        },
        {
          "risk": "زيادة معدل ترك العمل",
          "probability": retentionRate < 80 ? "مرتفعة" : "منخفضة",
          "impact": "مرتفع",
          "mitigation": "تحسين بيئة العمل وزيادة برامج التحفيز والتقدير"
        }
      ]
    },
    "kpis": {
      "employeeRetention": `${retentionRate}%`,
      "disciplinaryRate": `${disciplinaryRate}%`,
      "attendanceRate": `${attendanceRate}%`,
      "overallEfficiency": `${efficiency}%`
    },
    "trends": {
      "disciplinaryTrend": disciplinaryActions > 5 ? "تصاعدي" : disciplinaryActions > 0 ? "مستقر" : "تنازلي",
      "attendanceTrend": attendanceRate >= 95 ? "تحسن" : attendanceRate >= 85 ? "مستقر" : "تراجع",
      "prediction": "مع تطبيق التوصيات المقترحة، يتوقع تحسن الأداء خلال 3-6 أشهر"
    }
  };
}