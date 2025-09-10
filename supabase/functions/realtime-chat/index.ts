import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    console.log("Upgrading to WebSocket connection");
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    console.log("Connecting to OpenAI Realtime API");
    const openAISocket = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1",
        },
      }
    );

    let sessionCreated = false;

    // Handle OpenAI WebSocket events
    openAISocket.onopen = () => {
      console.log("Connected to OpenAI Realtime API");
    };

    openAISocket.onmessage = (event) => {
      console.log("Received from OpenAI:", event.data);
      const data = JSON.parse(event.data);
      
      // Send session update after session is created
      if (data.type === 'session.created' && !sessionCreated) {
        console.log("Session created, sending session update");
        sessionCreated = true;
        
        const sessionUpdate = {
          "type": "session.update",
          "session": {
            "modalities": ["text", "audio"],
            "instructions": "أنت مساعد ذكي متخصص في التدريب والتطوير المهني. تتحدث باللغة العربية بطلاقة وتساعد المتدربين في فهم المواد التدريبية والإجابة على أسئلتهم. كن ودودًا ومفيدًا ومشجعًا للتعلم.",
            "voice": "alloy",
            "input_audio_format": "pcm16",
            "output_audio_format": "pcm16",
            "input_audio_transcription": {
              "model": "whisper-1"
            },
            "turn_detection": {
              "type": "server_vad",
              "threshold": 0.5,
              "prefix_padding_ms": 300,
              "silence_duration_ms": 1000
            },
            "tools": [
              {
                "type": "function",
                "name": "get_course_info",
                "description": "الحصول على معلومات حول الدورة التدريبية الحالية",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "course_id": { "type": "string" }
                  },
                  "required": ["course_id"]
                }
              },
              {
                "type": "function",
                "name": "submit_question",
                "description": "إرسال سؤال من المتدرب للمدرب",
                "parameters": {
                  "type": "object",
                  "properties": {
                    "question": { "type": "string" },
                    "student_name": { "type": "string" }
                  },
                  "required": ["question", "student_name"]
                }
              }
            ],
            "tool_choice": "auto",
            "temperature": 0.8,
            "max_response_output_tokens": "inf"
          }
        };
        
        openAISocket.send(JSON.stringify(sessionUpdate));
      }
      
      // Handle function calls
      if (data.type === 'response.function_call_arguments.done') {
        console.log("Function call completed:", data);
        const args = JSON.parse(data.arguments);
        
        if (data.name === 'get_course_info') {
          // Simulate course info response
          const courseInfo = {
            title: "إدارة المشاريع الحديثة",
            instructor: "د. أحمد العلي",
            duration: "40 ساعة",
            progress: "75%",
            next_session: "غداً الساعة 10:00 صباحاً"
          };
          
          const response = {
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: data.call_id,
              output: JSON.stringify(courseInfo)
            }
          };
          
          openAISocket.send(JSON.stringify(response));
          openAISocket.send(JSON.stringify({type: 'response.create'}));
        }
        
        if (data.name === 'submit_question') {
          // Simulate question submission
          const result = {
            status: "success",
            message: "تم إرسال سؤالك للمدرب بنجاح. سيتم الرد عليك قريباً."
          };
          
          const response = {
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: data.call_id,
              output: JSON.stringify(result)
            }
          };
          
          openAISocket.send(JSON.stringify(response));
          openAISocket.send(JSON.stringify({type: 'response.create'}));
        }
      }
      
      // Forward all messages to client
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
      }
    };

    openAISocket.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: 'error',
          message: 'Connection to OpenAI failed'
        }));
      }
    };

    openAISocket.onclose = () => {
      console.log("OpenAI WebSocket closed");
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };

    // Handle client WebSocket events
    socket.onopen = () => {
      console.log("Client WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Received from client:", event.data);
      if (openAISocket.readyState === WebSocket.OPEN) {
        openAISocket.send(event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("Client WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Client WebSocket closed");
      if (openAISocket.readyState === WebSocket.OPEN) {
        openAISocket.close();
      }
    };

    return response;

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});