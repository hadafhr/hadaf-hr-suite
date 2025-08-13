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
    const { employeeData, competencyGaps } = await req.json();

    // Generate IDP using AI
    const prompt = `
    As an HR Development AI, create a comprehensive 90-day Individual Development Plan (IDP) based on:

    Employee Profile:
    ${JSON.stringify(employeeData, null, 2)}
    
    Competency Gaps Identified:
    ${JSON.stringify(competencyGaps, null, 2)}
    
    Create a detailed 90-day plan with:
    1. 3-5 specific development actions
    2. Timeline with milestones
    3. Learning resources and methods
    4. Success metrics
    5. Support needed
    
    Return as JSON with this structure:
    {
      "planTitle": string,
      "overview": string,
      "developmentActions": [
        {
          "id": string,
          "title": string,
          "description": string,
          "competencyArea": string,
          "timeline": string,
          "milestones": [string],
          "learningMethods": [string],
          "resources": [string],
          "successMetrics": [string],
          "supportNeeded": string,
          "priority": "high" | "medium" | "low"
        }
      ],
      "learningPaths": [string],
      "checkpoints": [
        {
          "week": number,
          "activity": string,
          "outcome": string
        }
      ],
      "expectedOutcomes": [string]
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
            content: 'You are an expert HR Development AI that creates comprehensive Individual Development Plans. Always return valid JSON responses with actionable development strategies.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const generatedPlan = data.choices[0].message.content;

    // Parse the AI response
    let planResult;
    try {
      planResult = JSON.parse(generatedPlan);
    } catch (parseError) {
      // Fallback IDP if AI response isn't valid JSON
      planResult = {
        planTitle: "Leadership & Communication Development Plan",
        overview: "A comprehensive 90-day development plan focused on enhancing leadership capabilities and communication skills based on assessment results.",
        developmentActions: [
          {
            id: "action-1",
            title: "Leadership Fundamentals Training",
            description: "Complete comprehensive leadership training program covering core leadership principles and practices",
            competencyArea: "Leadership & Direction",
            timeline: "Weeks 1-6",
            milestones: [
              "Complete leadership assessment",
              "Attend 4 leadership workshops",
              "Practice leadership scenarios"
            ],
            learningMethods: ["Instructor-led training", "Case studies", "Role playing"],
            resources: ["Leadership Excellence Course", "Harvard Business Review articles", "Leadership mentor"],
            successMetrics: ["Training completion certificate", "360 feedback improvement", "Team engagement scores"],
            supportNeeded: "Manager coaching and time allocation for training",
            priority: "high"
          },
          {
            id: "action-2",
            title: "Communication Skills Enhancement",
            description: "Develop effective communication techniques for various stakeholder interactions",
            competencyArea: "Communication & Influence",
            timeline: "Weeks 3-8",
            milestones: [
              "Complete communication style assessment",
              "Practice presentation skills",
              "Implement feedback techniques"
            ],
            learningMethods: ["Online courses", "Practice sessions", "Peer feedback"],
            resources: ["Dale Carnegie course", "Toastmasters membership", "Communication coach"],
            successMetrics: ["Presentation confidence scores", "Stakeholder feedback ratings", "Meeting effectiveness"],
            supportNeeded: "Opportunities to present to senior leadership",
            priority: "high"
          },
          {
            id: "action-3",
            title: "Cross-functional Collaboration Project",
            description: "Lead a cross-departmental initiative to practice collaboration and influence skills",
            competencyArea: "Collaboration & Teamwork",
            timeline: "Weeks 6-12",
            milestones: [
              "Project kickoff with stakeholders",
              "Mid-project review",
              "Project completion and retrospective"
            ],
            learningMethods: ["Experiential learning", "Project management", "Stakeholder management"],
            resources: ["Project management tools", "Cross-functional team", "Senior sponsor"],
            successMetrics: ["Project success metrics", "Team satisfaction scores", "Stakeholder feedback"],
            supportNeeded: "Executive sponsorship and resource allocation",
            priority: "medium"
          }
        ],
        learningPaths: [
          "Leadership Development Program",
          "Advanced Communication Skills",
          "Emotional Intelligence Mastery"
        ],
        checkpoints: [
          { week: 2, activity: "Initial progress review", outcome: "Course enrollment confirmation" },
          { week: 4, activity: "Skills practice session", outcome: "Feedback on leadership scenarios" },
          { week: 8, activity: "Mid-point assessment", outcome: "Progress evaluation and plan adjustment" },
          { week: 12, activity: "Final evaluation", outcome: "Development outcomes measurement" }
        ],
        expectedOutcomes: [
          "Improved leadership confidence and effectiveness",
          "Enhanced communication skills across all stakeholder levels",
          "Stronger cross-functional collaboration abilities",
          "Increased team engagement and performance",
          "Readiness for expanded leadership responsibilities"
        ]
      };
    }

    return new Response(JSON.stringify(planResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-idp function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});