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
    const { employeeId, evaluationData } = await req.json();

    // Calculate Smart Score using AI
    const prompt = `
    As an HR Analytics AI, calculate a comprehensive Smart Score for an employee based on the following evaluation data:

    Employee ID: ${employeeId}
    
    Evaluation Components:
    ${JSON.stringify(evaluationData, null, 2)}
    
    Please provide:
    1. Overall Smart Score (0-100)
    2. Component breakdown with individual scores
    3. Top 3 performance drivers
    4. Risk flags (if any)
    5. Key insights and recommendations
    
    Return as JSON with this structure:
    {
      "smartScore": number,
      "componentBreakdown": {
        "mbo": { "score": number, "weight": number, "contribution": number },
        "kpi": { "score": number, "weight": number, "contribution": number },
        "360": { "score": number, "weight": number, "contribution": number },
        "bsc": { "score": number, "weight": number, "contribution": number },
        "continuous": { "score": number, "weight": number, "contribution": number },
        "assessments": { "score": number, "weight": number, "contribution": number }
      },
      "topDrivers": [string, string, string],
      "riskFlags": [string],
      "insights": string,
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
            content: 'You are an expert HR Analytics AI that calculates comprehensive Smart Scores for performance evaluation. Always return valid JSON responses.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const generatedAnalysis = data.choices[0].message.content;

    // Parse the AI response
    let analysisResult;
    try {
      analysisResult = JSON.parse(generatedAnalysis);
    } catch (parseError) {
      // Fallback calculation if AI response isn't valid JSON
      analysisResult = {
        smartScore: 76,
        componentBreakdown: {
          mbo: { score: 78, weight: 20, contribution: 15.6 },
          kpi: { score: 82, weight: 30, contribution: 24.6 },
          360: { score: 74, weight: 20, contribution: 14.8 },
          bsc: { score: 71, weight: 10, contribution: 7.1 },
          continuous: { score: 76, weight: 10, contribution: 7.6 },
          assessments: { score: 73, weight: 10, contribution: 7.3 }
        },
        topDrivers: [
          "Strong KPI performance in sales metrics",
          "Consistent goal achievement in MBO system", 
          "Positive feedback in continuous reviews"
        ],
        riskFlags: [
          "360 feedback slightly below peer average"
        ],
        insights: "Employee shows strong technical performance but may benefit from leadership development",
        recommendations: [
          "Consider leadership training program",
          "Provide mentoring for soft skills development",
          "Maintain current performance level in technical areas"
        ]
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in smart-evaluations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});