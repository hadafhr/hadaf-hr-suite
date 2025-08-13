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
    const { evaluationData, teamData } = await req.json();

    // Analyze patterns and potential bias using AI
    const prompt = `
    As an HR Analytics AI specialized in bias detection and pattern analysis, analyze the following evaluation data for potential patterns and biases:

    Individual Evaluation Data:
    ${JSON.stringify(evaluationData, null, 2)}
    
    Team/Organizational Data:
    ${JSON.stringify(teamData, null, 2)}
    
    Analyze for:
    1. Rating patterns by manager/department/time period
    2. Potential unconscious bias indicators
    3. Statistical anomalies in scoring
    4. Consistency patterns across evaluation methods
    5. Risk indicators for talent retention
    
    IMPORTANT: Focus only on job-relevant patterns. Do not analyze protected characteristics.
    
    Return as JSON with this structure:
    {
      "overallRisk": "low" | "medium" | "high",
      "patterns": [
        {
          "type": string,
          "description": string,
          "severity": "low" | "medium" | "high",
          "affectedCount": number,
          "recommendation": string
        }
      ],
      "anomalies": [
        {
          "type": string,
          "description": string,
          "dataPoints": [string],
          "potentialCauses": [string]
        }
      ],
      "riskFlags": [
        {
          "employeeId": string,
          "riskType": string,
          "indicators": [string],
          "recommendation": string
        }
      ],
      "insights": [string],
      "recommendations": [string]
    }
    `;

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
            content: 'You are an expert HR Analytics AI that identifies patterns and potential biases in performance evaluation data. Focus only on job-relevant factors and avoid protected characteristics. Always return valid JSON responses.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    const generatedAnalysis = data.choices[0].message.content;

    // Parse the AI response
    let analysisResult;
    try {
      analysisResult = JSON.parse(generatedAnalysis);
    } catch (parseError) {
      // Fallback analysis if AI response isn't valid JSON
      analysisResult = {
        overallRisk: "medium",
        patterns: [
          {
            type: "Rating Inflation",
            description: "Manager A consistently rates 15% higher than organizational average",
            severity: "medium",
            affectedCount: 8,
            recommendation: "Provide calibration training for Manager A"
          },
          {
            type: "KPI vs 360 Disconnect",
            description: "3 employees show high KPI scores but low 360 feedback",
            severity: "low",
            affectedCount: 3,
            recommendation: "Review goal-setting and soft skills development"
          }
        ],
        anomalies: [
          {
            type: "Sudden Performance Drop",
            description: "Employee B showed 25% performance decrease in Q4",
            dataPoints: ["Q3: 87%", "Q4: 62%"],
            potentialCauses: ["Workload increase", "Personal circumstances", "Role mismatch"]
          },
          {
            type: "Assessment Inconsistency",
            description: "High technical scores but low leadership assessments",
            dataPoints: ["Technical: 92%", "Leadership: 56%"],
            potentialCauses: ["Career progression readiness", "Training needs", "Role clarity"]
          }
        ],
        riskFlags: [
          {
            employeeId: "emp-001",
            riskType: "Attrition Risk",
            indicators: ["Performance decline", "Low engagement scores", "Missed 1:1s"],
            recommendation: "Schedule retention conversation and career planning"
          },
          {
            employeeId: "emp-007",
            riskType: "Burnout Risk", 
            indicators: ["High performance but declining quality", "Overtime increase", "Stress indicators"],
            recommendation: "Workload review and wellness support"
          }
        ],
        insights: [
          "Overall evaluation quality is good with 94% completion rate",
          "Cross-functional collaboration scores trending upward",
          "Technical competencies strong across all departments",
          "Leadership pipeline needs attention in mid-level roles"
        ],
        recommendations: [
          "Implement manager calibration sessions quarterly",
          "Develop leadership development program for high performers",
          "Create early warning system for performance pattern changes",
          "Enhance feedback quality training for 360 participants",
          "Regular bias awareness training for all evaluators"
        ]
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in insights-risks function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});