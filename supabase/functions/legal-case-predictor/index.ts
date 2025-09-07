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

interface CasePredictionRequest {
  action: 'predict_outcome' | 'estimate_costs' | 'suggest_strategy' | 'analyze_risks';
  caseId?: string;
  caseData: {
    caseType: string;
    description: string;
    employeeInfo: any;
    evidence: any[];
    similarCases?: any[];
  };
}

// Historical case data for pattern matching
const historicalCasePatterns = {
  'labor_dispute': {
    avgDuration: 45, // days
    successRate: 0.65,
    avgCost: 15000, // SAR
    commonOutcomes: ['settlement', 'employer_favor', 'employee_favor']
  },
  'termination': {
    avgDuration: 30,
    successRate: 0.80,
    avgCost: 8000,
    commonOutcomes: ['termination_upheld', 'compensation_awarded', 'reinstatement']
  },
  'contract_violation': {
    avgDuration: 60,
    successRate: 0.70,
    avgCost: 12000,
    commonOutcomes: ['contract_modification', 'penalty_imposed', 'case_dismissed']
  },
  'salary_dispute': {
    avgDuration: 35,
    successRate: 0.75,
    avgCost: 6000,
    commonOutcomes: ['payment_ordered', 'partial_payment', 'claim_rejected']
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, caseId, caseData }: CasePredictionRequest = await req.json();
    
    console.log('Case Predictor Request:', { action, caseId, caseType: caseData.caseType });

    switch (action) {
      case 'predict_outcome':
        return await predictCaseOutcome(caseData, caseId);
      
      case 'estimate_costs':
        return await estimateCaseCosts(caseData, caseId);
      
      case 'suggest_strategy':
        return await suggestLegalStrategy(caseData, caseId);
      
      case 'analyze_risks':
        return await analyzeRisks(caseData, caseId);
      
      default:
        throw new Error('Unknown action');
    }

  } catch (error) {
    console.error('Error in legal-case-predictor:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function predictCaseOutcome(caseData: any, caseId?: string) {
  console.log('Predicting case outcome for type:', caseData.caseType);
  
  // Get historical pattern data
  const pattern = historicalCasePatterns[caseData.caseType as keyof typeof historicalCasePatterns] || 
                  historicalCasePatterns['labor_dispute'];

  // Analyze case factors
  const factors = analyzeCaseFactors(caseData);
  
  // Adjust success rate based on factors
  let adjustedSuccessRate = pattern.successRate;
  
  // Strong evidence increases success rate
  if (factors.evidenceStrength === 'strong') {
    adjustedSuccessRate += 0.2;
  } else if (factors.evidenceStrength === 'weak') {
    adjustedSuccessRate -= 0.15;
  }
  
  // Employee history affects outcome
  if (factors.employeeRecord === 'good') {
    adjustedSuccessRate += 0.1;
  } else if (factors.employeeRecord === 'poor') {
    adjustedSuccessRate -= 0.1;
  }
  
  // Case complexity
  if (factors.complexity === 'high') {
    adjustedSuccessRate -= 0.05;
  }
  
  // Ensure rate stays within bounds
  adjustedSuccessRate = Math.max(0.1, Math.min(0.95, adjustedSuccessRate));

  // AI-powered detailed analysis
  let aiAnalysis = null;
  if (openAIApiKey) {
    try {
      aiAnalysis = await getAIOutcomePrediction(caseData);
    } catch (error) {
      console.error('AI analysis failed:', error);
    }
  }

  const prediction = {
    caseType: caseData.caseType,
    successProbability: Math.round(adjustedSuccessRate * 100),
    estimatedDuration: pattern.avgDuration + factors.complexityDays,
    mostLikelyOutcome: pattern.commonOutcomes[0],
    alternativeOutcomes: pattern.commonOutcomes.slice(1),
    confidenceLevel: calculateConfidenceLevel(factors),
    keyFactors: factors,
    aiInsights: aiAnalysis,
    recommendations: generateRecommendations(caseData, adjustedSuccessRate),
    generatedAt: new Date().toISOString()
  };

  // Save prediction to database if caseId provided
  if (caseId) {
    await saveAnalysisToDatabase('outcome_prediction', caseId, prediction);
  }

  return new Response(JSON.stringify({
    success: true,
    prediction
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function estimateCaseCosts(caseData: any, caseId?: string) {
  console.log('Estimating case costs for type:', caseData.caseType);
  
  const pattern = historicalCasePatterns[caseData.caseType as keyof typeof historicalCasePatterns] || 
                  historicalCasePatterns['labor_dispute'];
  
  const factors = analyzeCaseFactors(caseData);
  
  // Base cost calculation
  let estimatedCost = pattern.avgCost;
  
  // Adjust based on complexity
  if (factors.complexity === 'high') {
    estimatedCost *= 1.5;
  } else if (factors.complexity === 'low') {
    estimatedCost *= 0.8;
  }
  
  // Adjust based on duration
  const durationMultiplier = (pattern.avgDuration + factors.complexityDays) / pattern.avgDuration;
  estimatedCost *= durationMultiplier;
  
  // External vs internal case cost difference
  if (caseData.isExternal) {
    estimatedCost *= 2.5; // Court cases are much more expensive
  }

  const costBreakdown = {
    legalFees: Math.round(estimatedCost * 0.6),
    courtFees: caseData.isExternal ? Math.round(estimatedCost * 0.2) : 0,
    administrativeCosts: Math.round(estimatedCost * 0.1),
    potentialSettlement: Math.round(estimatedCost * 0.8),
    contingencyCosts: Math.round(estimatedCost * 0.2)
  };

  const costEstimate = {
    totalEstimatedCost: Math.round(estimatedCost),
    costRange: {
      minimum: Math.round(estimatedCost * 0.7),
      maximum: Math.round(estimatedCost * 1.4)
    },
    breakdown: costBreakdown,
    factors: factors,
    timeframe: `${pattern.avgDuration + factors.complexityDays} يوم`,
    costLevel: getCostLevel(estimatedCost),
    recommendations: getCostOptimizationRecommendations(caseData, estimatedCost),
    generatedAt: new Date().toISOString()
  };

  if (caseId) {
    await saveAnalysisToDatabase('cost_estimate', caseId, costEstimate);
  }

  return new Response(JSON.stringify({
    success: true,
    costEstimate
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function suggestLegalStrategy(caseData: any, caseId?: string) {
  console.log('Suggesting legal strategy for:', caseData.caseType);
  
  const factors = analyzeCaseFactors(caseData);
  const pattern = historicalCasePatterns[caseData.caseType as keyof typeof historicalCasePatterns];
  
  // Generate strategy based on case strength
  let primaryStrategy = '';
  let alternativeStrategies = [];
  let tactics = [];
  
  if (factors.evidenceStrength === 'strong' && factors.employeeRecord === 'good') {
    primaryStrategy = 'aggressive_defense';
    tactics = [
      'التركيز على نقاط القوة في القضية',
      'استخدام الأدلة القوية المتاحة',
      'السعي للحصول على حكم سريع',
      'تجنب التسوية إلا إذا كانت مواتية جداً'
    ];
  } else if (factors.evidenceStrength === 'weak' || factors.employeeRecord === 'poor') {
    primaryStrategy = 'settlement_focused';
    tactics = [
      'السعي للتسوية الودية',
      'التفاوض على شروط مقبولة',
      'تجنب المحاكمة الطويلة',
      'التركيز على تقليل الأضرار'
    ];
  } else {
    primaryStrategy = 'balanced_approach';
    tactics = [
      'تقييم مستمر لقوة القضية',
      'استعداد للتفاوض أو المحاكمة',
      'جمع أدلة إضافية إن أمكن',
      'مراقبة تطورات القضية'
    ];
  }

  // AI-powered strategy suggestions
  let aiStrategySuggestions = null;
  if (openAIApiKey) {
    try {
      aiStrategySuggestions = await getAIStrategySuggestions(caseData, factors);
    } catch (error) {
      console.error('AI strategy analysis failed:', error);
    }
  }

  const strategy = {
    primaryStrategy,
    tactics,
    timeline: generateTimeline(caseData, factors),
    riskMitigation: generateRiskMitigation(factors),
    expectedOutcomes: pattern.commonOutcomes,
    aiRecommendations: aiStrategySuggestions,
    keyMilestones: generateKeyMilestones(caseData),
    contingencyPlans: generateContingencyPlans(factors),
    generatedAt: new Date().toISOString()
  };

  if (caseId) {
    await saveAnalysisToDatabase('legal_strategy', caseId, strategy);
  }

  return new Response(JSON.stringify({
    success: true,
    strategy
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function analyzeRisks(caseData: any, caseId?: string) {
  console.log('Analyzing risks for case type:', caseData.caseType);
  
  const factors = analyzeCaseFactors(caseData);
  
  const risks = {
    financial: {
      level: factors.complexity === 'high' ? 'high' : 'medium',
      description: 'مخاطر التكاليف القانونية والتعويضات المحتملة',
      mitigation: 'وضع ميزانية واضحة والنظر في التأمين القانوني'
    },
    reputational: {
      level: caseData.isExternal ? 'high' : 'low',
      description: 'تأثير القضية على سمعة الشركة',
      mitigation: 'إدارة الاتصالات والإعلام بعناية'
    },
    operational: {
      level: factors.employeeImpact > 5 ? 'high' : 'medium',
      description: 'تأثير القضية على العمليات اليومية',
      mitigation: 'وضع خطة لاستمرارية العمل'
    },
    legal: {
      level: factors.evidenceStrength === 'weak' ? 'high' : 'low',
      description: 'مخاطر الخسارة في القضية',
      mitigation: 'تقوية الأدلة والاستعانة بخبراء'
    }
  };

  const riskAnalysis = {
    overallRiskLevel: calculateOverallRisk(risks),
    individualRisks: risks,
    riskFactors: factors,
    mitigationPlan: generateMitigationPlan(risks),
    monitoringPlan: generateMonitoringPlan(caseData),
    escalationProcedures: generateEscalationProcedures(),
    generatedAt: new Date().toISOString()
  };

  if (caseId) {
    await saveAnalysisToDatabase('risk_analysis', caseId, riskAnalysis);
  }

  return new Response(JSON.stringify({
    success: true,
    riskAnalysis
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Helper functions
function analyzeCaseFactors(caseData: any) {
  return {
    evidenceStrength: caseData.evidence?.length > 3 ? 'strong' : 
                     caseData.evidence?.length > 1 ? 'medium' : 'weak',
    employeeRecord: caseData.employeeInfo?.disciplinaryHistory?.length === 0 ? 'good' : 'poor',
    complexity: caseData.description?.length > 500 ? 'high' : 'medium',
    complexityDays: caseData.description?.length > 500 ? 15 : 0,
    employeeImpact: caseData.affectedEmployees || 1,
    urgency: caseData.priority === 'high' ? 'urgent' : 'normal'
  };
}

function calculateConfidenceLevel(factors: any): string {
  let confidence = 0.5;
  if (factors.evidenceStrength === 'strong') confidence += 0.3;
  if (factors.employeeRecord === 'good') confidence += 0.2;
  if (confidence > 0.8) return 'عالي';
  if (confidence > 0.6) return 'متوسط';
  return 'منخفض';
}

function generateRecommendations(caseData: any, successRate: number): string[] {
  const recommendations = [];
  
  if (successRate > 0.7) {
    recommendations.push('المضي قدماً في القضية بثقة');
    recommendations.push('التركيز على نقاط القوة');
  } else if (successRate < 0.4) {
    recommendations.push('النظر جدياً في التسوية الودية');
    recommendations.push('تقييم المخاطر بعناية');
  } else {
    recommendations.push('جمع أدلة إضافية قبل المتابعة');
    recommendations.push('استشارة خبراء قانونيين');
  }
  
  return recommendations;
}

async function getAIOutcomePrediction(caseData: any) {
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
          content: 'أنت خبير قانوني متخصص في القضايا العمالية في السعودية. حلل القضية وتنبأ بالنتيجة المحتملة.'
        },
        {
          role: 'user',
          content: `حلل هذه القضية وتنبأ بالنتيجة: ${JSON.stringify(caseData)}`
        }
      ],
      max_completion_tokens: 800,
    }),
  });

  const result = await response.json();
  return result.choices[0].message.content;
}

async function getAIStrategySuggestions(caseData: any, factors: any) {
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
          content: 'أنت استراتيجي قانوني خبير. اقترح أفضل استراتيجية قانونية للقضية.'
        },
        {
          role: 'user',
          content: `اقترح استراتيجية للقضية: ${JSON.stringify({ caseData, factors })}`
        }
      ],
      max_completion_tokens: 600,
    }),
  });

  const result = await response.json();
  return result.choices[0].message.content;
}

async function saveAnalysisToDatabase(analysisType: string, caseId: string, analysisResults: any) {
  const { error } = await supabase
    .from('legal_ai_analytics')
    .insert({
      analysis_type: analysisType,
      analysis_scope: 'specific_case',
      scope_id: caseId,
      analysis_data: { caseId },
      analysis_results: analysisResults,
      confidence_score: 0.85
    });

  if (error) {
    console.error('Error saving analysis to database:', error);
  }
}

function getCostLevel(cost: number): string {
  if (cost > 50000) return 'عالي';
  if (cost > 15000) return 'متوسط';
  return 'منخفض';
}

function getCostOptimizationRecommendations(caseData: any, estimatedCost: number): string[] {
  const recommendations = [];
  
  if (estimatedCost > 30000) {
    recommendations.push('النظر في التسوية الودية لتقليل التكاليف');
  }
  
  if (caseData.isExternal) {
    recommendations.push('تقييم إمكانية الحل قبل الوصول للمحكمة');
  }
  
  recommendations.push('وضع ميزانية واضحة ومراقبة الإنفاق');
  
  return recommendations;
}

function generateTimeline(caseData: any, factors: any): any[] {
  return [
    { phase: 'تحضير القضية', duration: '7-14 يوم', description: 'جمع الأدلة والمستندات' },
    { phase: 'المفاوضات الأولية', duration: '14-21 يوم', description: 'محاولة التسوية الودية' },
    { phase: 'الإجراءات القانونية', duration: '30-60 يوم', description: 'رفع القضية والمرافعات' }
  ];
}

function generateRiskMitigation(factors: any): string[] {
  return [
    'توثيق جميع الإجراءات والقرارات',
    'الحفاظ على التواصل المهني',
    'إشراك الخبراء القانونيين عند الحاجة'
  ];
}

function generateKeyMilestones(caseData: any): string[] {
  return [
    'إنهاء مرحلة التحضير',
    'انتهاء المفاوضات الأولية',
    'تقديم الأدلة والمرافعات',
    'صدور القرار النهائي'
  ];
}

function generateContingencyPlans(factors: any): string[] {
  return [
    'خطة بديلة في حالة ضعف الأدلة',
    'استراتيجية التسوية كحل أخير',
    'خطة إدارة الأزمات الإعلامية'
  ];
}

function generateMitigationPlan(risks: any): string[] {
  return [
    'وضع حدود واضحة للتكاليف القانونية',
    'إعداد خطة تواصل مع وسائل الإعلام',
    'ضمان استمرارية العمليات التشغيلية',
    'المراجعة المستمرة للاستراتيجية القانونية'
  ];
}

function generateMonitoringPlan(caseData: any): string[] {
  return [
    'مراجعة أسبوعية لتطورات القضية',
    'تقييم شهري للتكاليف والميزانية',
    'مراقبة يومية للأثر التشغيلي'
  ];
}

function generateEscalationProcedures(): string[] {
  return [
    'إبلاغ الإدارة العليا في حالة تجاوز الميزانية بنسبة 20%',
    'تفعيل خطة إدارة الأزمات عند الحاجة',
    'استشارة خبراء خارجيين في القضايا المعقدة'
  ];
}

function calculateOverallRisk(risks: any): string {
  const highRiskCount = Object.values(risks).filter((r: any) => r.level === 'high').length;
  if (highRiskCount >= 2) return 'عالي';
  if (highRiskCount === 1) return 'متوسط';
  return 'منخفض';
}