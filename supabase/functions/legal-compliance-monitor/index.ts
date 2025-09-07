import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ComplianceMonitorRequest {
  action: 'check_contract_compliance' | 'monitor_employee_compliance' | 'update_regulations' | 'generate_compliance_report';
  entityType?: string;
  entityId?: string;
  data?: any;
}

// Saudi Labor Law regulations database
const saudiLaborRegulations = {
  contractRequirements: {
    minimumWage: 4000, // Current minimum wage in Saudi Arabia
    maxWorkingHours: 8,
    maxWeeklyHours: 48,
    overtimeRate: 1.5,
    annualLeave: 30,
    sickLeave: 30,
    maternityLeave: 70,
    endOfServiceBenefit: true
  },
  
  complianceRules: [
    {
      rule: 'contract_written_arabic',
      description: 'يجب أن يكون العقد مكتوباً باللغة العربية',
      priority: 'high',
      article: 'المادة 51'
    },
    {
      rule: 'probation_period_limit',
      description: 'فترة التجربة لا تزيد عن 90 يوماً',
      priority: 'high', 
      article: 'المادة 53'
    },
    {
      rule: 'minimum_wage_compliance',
      description: 'يجب أن لا يقل الراتب عن الحد الأدنى للأجور',
      priority: 'critical',
      article: 'المادة 98'
    },
    {
      rule: 'working_hours_limit',
      description: 'ساعات العمل اليومية لا تزيد عن 8 ساعات',
      priority: 'high',
      article: 'المادة 98'
    },
    {
      rule: 'overtime_compensation',
      description: 'تعويض الساعات الإضافية بـ 150% من الأجر',
      priority: 'medium',
      article: 'المادة 107'
    },
    {
      rule: 'annual_leave_entitlement',
      description: 'الإجازة السنوية لا تقل عن 30 يوماً',
      priority: 'medium',
      article: 'المادة 109'
    }
  ]
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, entityType, entityId, data }: ComplianceMonitorRequest = await req.json();
    
    console.log('Compliance Monitor Request:', { action, entityType, entityId });

    switch (action) {
      case 'check_contract_compliance':
        return await checkContractCompliance(entityId!, data);
      
      case 'monitor_employee_compliance':
        return await monitorEmployeeCompliance(entityId!, data);
      
      case 'update_regulations':
        return await updateRegulations();
      
      case 'generate_compliance_report':
        return await generateComplianceReport(data);
      
      default:
        throw new Error('Unknown action');
    }

  } catch (error) {
    console.error('Error in legal-compliance-monitor:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function checkContractCompliance(contractId: string, contractData: any) {
  console.log('Checking contract compliance for:', contractId);
  
  const violations = [];
  const recommendations = [];
  let complianceScore = 100;

  // Check minimum wage compliance
  if (contractData.basicSalary < saudiLaborRegulations.contractRequirements.minimumWage) {
    violations.push({
      rule: 'minimum_wage_compliance',
      severity: 'critical',
      description: `الراتب الأساسي ${contractData.basicSalary} أقل من الحد الأدنى ${saudiLaborRegulations.contractRequirements.minimumWage}`,
      article: 'المادة 98',
      recommendation: 'يجب رفع الراتب الأساسي ليتوافق مع الحد الأدنى للأجور'
    });
    complianceScore -= 30;
  }

  // Check working hours
  if (contractData.workingHours > saudiLaborRegulations.contractRequirements.maxWorkingHours) {
    violations.push({
      rule: 'working_hours_limit',
      severity: 'medium',
      description: `ساعات العمل ${contractData.workingHours} تزيد عن الحد المسموح`,
      article: 'المادة 98',
      recommendation: 'تقليل ساعات العمل أو إضافة تعويض للساعات الإضافية'
    });
    complianceScore -= 15;
  }

  // Check contract language (if specified)
  if (contractData.language && contractData.language !== 'ar') {
    violations.push({
      rule: 'contract_written_arabic',
      severity: 'high',
      description: 'العقد غير مكتوب باللغة العربية',
      article: 'المادة 51',
      recommendation: 'يجب ترجمة العقد إلى اللغة العربية'
    });
    complianceScore -= 20;
  }

  // AI-powered analysis for additional insights
  if (openAIApiKey) {
    try {
      const aiAnalysis = await analyzeContractWithAI(contractData);
      recommendations.push(...aiAnalysis.recommendations);
    } catch (error) {
      console.error('AI analysis failed:', error);
    }
  }

  // Save compliance monitoring record
  const { error: saveError } = await supabase
    .from('legal_compliance_monitoring')
    .insert({
      rule_id: null, // Will be updated with specific rule IDs
      entity_type: 'contract',
      entity_id: contractId,
      compliance_status: violations.length === 0 ? 'compliant' : 'non_compliant',
      compliance_score: complianceScore,
      violations_found: violations,
      ai_recommendations: recommendations,
      risk_level: violations.some(v => v.severity === 'critical') ? 'high' : 
                  violations.some(v => v.severity === 'high') ? 'medium' : 'low'
    });

  if (saveError) {
    console.error('Error saving compliance record:', saveError);
  }

  return new Response(JSON.stringify({
    success: true,
    contractId,
    complianceScore,
    status: violations.length === 0 ? 'compliant' : 'non_compliant',
    violations,
    recommendations,
    riskLevel: violations.some(v => v.severity === 'critical') ? 'high' : 
               violations.some(v => v.severity === 'high') ? 'medium' : 'low'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function monitorEmployeeCompliance(employeeId: string, employeeData: any) {
  console.log('Monitoring employee compliance for:', employeeId);
  
  const violations = [];
  let complianceScore = 100;

  // Check attendance patterns
  if (employeeData.attendanceData) {
    const { lateCount, absenceCount, overtimeHours } = employeeData.attendanceData;
    
    if (lateCount > 5) {
      violations.push({
        type: 'attendance_violation',
        severity: 'medium',
        description: `تأخير متكرر: ${lateCount} مرات في الشهر`,
        recommendation: 'إجراء تحذير وتطبيق سياسة الحضور والانصراف'
      });
      complianceScore -= 10;
    }

    if (absenceCount > 3) {
      violations.push({
        type: 'absence_violation', 
        severity: 'high',
        description: `غياب متكرر: ${absenceCount} أيام بدون إذن`,
        recommendation: 'مراجعة سياسة الإجازات وتطبيق الجزاءات المناسبة'
      });
      complianceScore -= 20;
    }
  }

  // Save employee compliance record
  const { error: saveError } = await supabase
    .from('legal_employee_violations')
    .insert({
      employee_id: employeeId,
      violation_type: 'compliance_check',
      violation_details: { violations, complianceScore },
      ai_penalty_recommendation: violations.map(v => ({
        violation: v.type,
        recommendedAction: v.recommendation,
        severity: v.severity
      })),
      compliance_check_passed: violations.length === 0
    });

  if (saveError) {
    console.error('Error saving employee compliance:', saveError);
  }

  return new Response(JSON.stringify({
    success: true,
    employeeId,
    complianceScore,
    violations,
    status: violations.length === 0 ? 'compliant' : 'needs_attention'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function analyzeContractWithAI(contractData: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: `أنت خبير قانوني في نظام العمل السعودي. حلل العقد التالي واقترح تحسينات للامتثال القانوني.`
        },
        {
          role: 'user',
          content: `حلل هذا العقد: ${JSON.stringify(contractData)}`
        }
      ],
      max_completion_tokens: 1000,
    }),
  });

  const result = await response.json();
  const analysis = result.choices[0].message.content;
  
  // Parse AI recommendations (simplified)
  return {
    recommendations: [
      {
        type: 'ai_suggestion',
        description: analysis,
        priority: 'medium'
      }
    ]
  };
}

async function updateRegulations() {
  // Simulate updating regulations from official sources
  console.log('Updating regulations from Saudi authorities...');
  
  // In a real implementation, this would connect to official APIs
  // For now, we'll just update our local cache with current data
  
  const { error } = await supabase
    .from('legal_compliance_rules')
    .upsert(saudiLaborRegulations.complianceRules.map(rule => ({
      rule_name: rule.rule,
      regulation_source: 'Saudi Labor Law',
      rule_category: 'employment',
      rule_content: { description: rule.description, article: rule.article },
      compliance_criteria: { priority: rule.priority },
      last_updated_from_source: new Date().toISOString()
    })));

  if (error) {
    throw new Error('Failed to update regulations: ' + error.message);
  }
  
  return new Response(JSON.stringify({
    success: true,
    message: 'تم تحديث اللوائح بنجاح',
    updatedRules: saudiLaborRegulations.complianceRules.length
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function generateComplianceReport(data: any) {
  console.log('Generating compliance report...');
  
  // Fetch compliance data from database
  const { data: complianceData, error } = await supabase
    .from('legal_compliance_monitoring')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    throw new Error('Failed to fetch compliance data: ' + error.message);
  }

  // Generate summary statistics
  const totalChecks = complianceData.length;
  const compliantCount = complianceData.filter(item => item.compliance_status === 'compliant').length;
  const nonCompliantCount = complianceData.filter(item => item.compliance_status === 'non_compliant').length;
  const avgScore = complianceData.reduce((sum, item) => sum + (item.compliance_score || 0), 0) / totalChecks;

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalChecks,
      compliantCount,
      nonCompliantCount,
      complianceRate: (compliantCount / totalChecks * 100).toFixed(2),
      averageScore: avgScore.toFixed(2)
    },
    riskAssessment: {
      highRisk: complianceData.filter(item => item.risk_level === 'high').length,
      mediumRisk: complianceData.filter(item => item.risk_level === 'medium').length,
      lowRisk: complianceData.filter(item => item.risk_level === 'low').length
    },
    detailedFindings: complianceData.slice(0, 20) // Latest 20 findings
  };

  return new Response(JSON.stringify({
    success: true,
    report
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}