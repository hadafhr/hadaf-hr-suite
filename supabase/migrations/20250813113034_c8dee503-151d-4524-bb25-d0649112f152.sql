-- إدراج البيانات التجريبية للاختبارات والقوالب

-- أولاً: إدراج قوالب الكفاءات الافتراضية
INSERT INTO public.competencies (company_id, competency_name, description, category, levels)
SELECT 
  c.id,
  'القيادة والإدارة',
  'القدرة على قيادة الفرق وإدارة المشاريع بفعالية',
  'leadership',
  CAST('[
    {"level": 1, "name": "مبتدئ", "description": "يحتاج إلى التوجيه المستمر"},
    {"level": 2, "name": "متطور", "description": "يعمل بشكل مستقل في المهام الأساسية"},
    {"level": 3, "name": "كفء", "description": "يؤدي المهام بخبرة ويساعد الآخرين"},
    {"level": 4, "name": "متقدم", "description": "يقود المشاريع ويطور العمليات"},
    {"level": 5, "name": "خبير", "description": "يضع الاستراتيجيات ويقود التحول"}
  ]' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'التواصل والعلاقات',
  'مهارات التواصل الفعال وبناء العلاقات المهنية',
  'behavioral',
  CAST('[
    {"level": 1, "name": "مبتدئ", "description": "تواصل أساسي مع التوجيه"},
    {"level": 2, "name": "متطور", "description": "تواصل واضح في معظم الحالات"},
    {"level": 3, "name": "كفء", "description": "تواصل فعال ومؤثر"},
    {"level": 4, "name": "متقدم", "description": "يؤثر ويقنع الآخرين بفعالية"},
    {"level": 5, "name": "خبير", "description": "يلهم ويحفز الآخرين"}
  ]' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'حل المشكلات والابتكار',
  'القدرة على تحليل المشكلات وإيجاد حلول إبداعية',
  'technical',
  CAST('[
    {"level": 1, "name": "مبتدئ", "description": "يحل المشكلات البسيطة بالتوجيه"},
    {"level": 2, "name": "متطور", "description": "يحل المشكلات المعتادة بشكل مستقل"},
    {"level": 3, "name": "كفء", "description": "يحلل ويحل المشكلات المعقدة"},
    {"level": 4, "name": "متقدم", "description": "يبتكر حلولاً جديدة ومبدعة"},
    {"level": 5, "name": "خبير", "description": "يطور منهجيات حل جديدة"}
  ]' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'التعلم والتطوير',
  'الالتزام بالتعلم المستمر وتطوير الذات والآخرين',
  'behavioral',
  CAST('[
    {"level": 1, "name": "مبتدئ", "description": "يتعلم المهارات الأساسية"},
    {"level": 2, "name": "متطور", "description": "يطور مهاراته باستمرار"},
    {"level": 3, "name": "كفء", "description": "يتعلم بسرعة ويطبق المعرفة"},
    {"level": 4, "name": "متقدم", "description": "يعلم ويطور الآخرين"},
    {"level": 5, "name": "خبير", "description": "يقود التطوير المؤسسي"}
  ]' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, competency_name) DO NOTHING;

-- إدراج دورة تقييم نشطة
INSERT INTO public.evaluation_cycles (company_id, cycle_name, cycle_type, start_date, end_date, status, description)
SELECT 
  c.id,
  'دورة التقييم الربعية Q1 2025',
  'quarterly',
  '2025-01-01',
  '2025-03-31', 
  'active',
  'دورة التقييم الربعية الأولى لعام 2025'
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, cycle_name) DO NOTHING;

-- إدراج قوالب التقييم الافتراضية
INSERT INTO public.evaluation_templates (company_id, template_name, evaluation_type, template_config, is_default)
SELECT 
  c.id,
  'قالب الإدارة بالأهداف الافتراضي',
  'mbo',
  CAST('{
    "weights": {
      "institutional": 20,
      "departmental": 30,
      "individual": 50
    },
    "rating_scale": {
      "min": 1,
      "max": 5,
      "labels": ["ضعيف", "مقبول", "جيد", "ممتاز", "متميز"]
    },
    "default_objectives": [
      {
        "category": "institutional",
        "title": "تحقيق رؤية الشركة",
        "weight": 20
      },
      {
        "category": "departmental", 
        "title": "تحقيق أهداف القسم",
        "weight": 30
      },
      {
        "category": "individual",
        "title": "التطوير المهني الشخصي",
        "weight": 50
      }
    ]
  }' AS jsonb),
  true
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'قالب مؤشرات الأداء الافتراضي',
  'kpi',
  CAST('{
    "default_kpis": {
      "sales": [
        {"name": "تحقيق الحصة", "weight": 35, "unit": "%"},
        {"name": "نمو الإيراد", "weight": 25, "unit": "%"},
        {"name": "دقة التوقع", "weight": 15, "unit": "%"},
        {"name": "تحصيل الذمم", "weight": 15, "unit": "%"},
        {"name": "رضا العملاء", "weight": 10, "unit": "نقطة"}
      ],
      "hr": [
        {"name": "معدل الاحتفاظ بالموظفين", "weight": 30, "unit": "%"},
        {"name": "متوسط وقت التوظيف", "weight": 25, "unit": "يوم"},
        {"name": "رضا الموظفين", "weight": 25, "unit": "نقطة"},
        {"name": "إنجاز التدريب", "weight": 20, "unit": "%"}
      ]
    }
  }' AS jsonb),
  true
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'قالب التقييم 360 الافتراضي',
  '360',
  CAST('{
    "evaluator_weights": {
      "manager": 40,
      "peers": 25,
      "subordinates": 25,
      "customers": 10
    },
    "competencies": [
      "القيادة والإدارة",
      "التواصل والعلاقات", 
      "حل المشكلات والابتكار",
      "التعلم والتطوير"
    ],
    "anonymous": true
  }' AS jsonb),
  true
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'قالب بطاقة الأداء المتوازن الافتراضي',
  'bsc',
  CAST('{
    "perspectives": [
      {"name": "المالي", "weight": 25},
      {"name": "العملاء", "weight": 25},
      {"name": "العمليات الداخلية", "weight": 25},
      {"name": "التعلم والنمو", "weight": 25}
    ]
  }' AS jsonb),
  true
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'قالب التقييم المستمر الافتراضي',
  'continuous',
  CAST('{
    "meeting_frequency": "monthly",
    "feedback_types": [
      "one_on_one",
      "micro_goal", 
      "instant_feedback",
      "recognition"
    ],
    "rating_scale": 5
  }' AS jsonb),
  true
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT (company_id, template_name, evaluation_type) DO NOTHING;

-- إدراج قوالب الاختبارات الافتراضية مع جميع الأنواع
INSERT INTO public.assessments (company_id, assessment_name, assessment_type, description, questions, scoring_config)
SELECT 
  c.id,
  'اختبار الأداء العملي - التقني',
  'work_sample',
  'تقييم الأداء من خلال مهام محاكاة عملية',
  CAST('[
    {
      "id": 1,
      "task": "تطوير نموذج أولي",
      "description": "قم بتطوير نموذج أولي لتطبيق ويب بسيط",
      "time_limit": 120,
      "criteria": ["الجودة", "السرعة", "الالتزام بالمعايير"]
    },
    {
      "id": 2,
      "task": "حل مشكلة تقنية",
      "description": "حلل وحل مشكلة في نظام موجود",
      "time_limit": 90,
      "criteria": ["التحليل", "الحل", "التوثيق"]
    }
  ]' AS jsonb),
  CAST('{
    "weights": {"quality": 40, "speed": 30, "adherence": 30},
    "scale": {"min": 1, "max": 5}
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'اختبار بيركمان',
  'birkman',
  'تقييم شامل للسلوك والاهتمامات والاحتياجات مع خطة تطوير 90 يوماً',
  CAST('[
    {
      "category": "interests",
      "questions": [
        {"id": 1, "text": "أفضل العمل في بيئة تنافسية", "weight": 1},
        {"id": 2, "text": "أستمتع بحل المشكلات المعقدة", "weight": 1}
      ]
    },
    {
      "category": "behavior", 
      "questions": [
        {"id": 3, "text": "أتخذ قرارات سريعة في العمل", "weight": 1},
        {"id": 4, "text": "أفضل العمل ضمن فريق", "weight": 1}
      ]
    },
    {
      "category": "needs",
      "questions": [
        {"id": 5, "text": "أحتاج إلى بيئة عمل منظمة", "weight": 1},
        {"id": 6, "text": "أحتاج للتقدير والاعتراف", "weight": 1}
      ]
    }
  ]' AS jsonb),
  CAST('{
    "dimensions": ["interests", "behavior", "needs", "stress"],
    "interpretation": "auto_generated",
    "development_plan_duration": 90,
    "auto_recommendations": true
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'اختبار DISC',
  'disc',
  'تحليل أنماط السلوك والشخصية في العمل مع توصيات التعاون',
  CAST('[
    {
      "id": 1,
      "text": "أميل إلى اتخاذ قرارات سريعة",
      "type": "D",
      "weight": 1
    },
    {
      "id": 2, 
      "text": "أستمتع بالتفاعل مع الآخرين",
      "type": "I",
      "weight": 1
    },
    {
      "id": 3,
      "text": "أفضل العمل في بيئة مستقرة",
      "type": "S",
      "weight": 1
    },
    {
      "id": 4,
      "text": "أهتم بالتفاصيل والدقة",
      "type": "C",
      "weight": 1
    }
  ]' AS jsonb),
  CAST('{
    "dimensions": ["D", "I", "S", "C"],
    "balanced_default": [25, 25, 25, 25],
    "team_collaboration_report": true
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'اختبار MBTI',
  'mbti',
  'تحليل الشخصية وفقاً لنموذج Myers-Briggs مع 16 نمطاً',
  CAST('[
    {
      "dimension": "E/I",
      "questions": [
        {"id": 1, "text": "أحصل على الطاقة من التفاعل مع الآخرين", "type": "E"},
        {"id": 2, "text": "أفضل التفكير قبل التحدث", "type": "I"}
      ]
    },
    {
      "dimension": "S/N", 
      "questions": [
        {"id": 3, "text": "أركز على الحقائق والتفاصيل", "type": "S"},
        {"id": 4, "text": "أحب استكشاف الاحتمالات الجديدة", "type": "N"}
      ]
    }
  ]' AS jsonb),
  CAST('{
    "personality_types": 16,
    "dimensions": ["E/I", "S/N", "T/F", "J/P"],
    "team_recommendations": true
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'اختبارات هوجان',
  'hogan',
  'تقييم إمكانات القيادة ومخاطر السلوك والقيم',
  CAST('[
    {
      "category": "leadership_potential",
      "questions": [
        {"id": 1, "text": "أتحمل المسؤولية بسهولة", "weight": 2},
        {"id": 2, "text": "أقود الآخرين بشكل طبيعي", "weight": 2}
      ]
    },
    {
      "category": "derailment_risks",
      "questions": [
        {"id": 3, "text": "أحياناً أتصرف بتهور", "weight": 1},
        {"id": 4, "text": "قد أكون متشكك من الآخرين", "weight": 1}
      ]
    }
  ]' AS jsonb),
  CAST('{
    "assessments": ["HPI", "HDS", "MVPI"],
    "leadership_summary": true,
    "risk_analysis": true
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
UNION ALL
SELECT 
  c.id,
  'اختبار الكفاءات المبني على الأدوار',
  'competency',
  'مصفوفة كفاءات مخصصة حسب الدور مع 5 مستويات لكل كفاءة',
  CAST('[
    {
      "competency": "القيادة والإدارة",
      "scenarios": [
        {"id": 1, "situation": "كيف تتعامل مع صراع في فريقك؟", "level_indicator": true},
        {"id": 2, "situation": "كيف تحفز موظف منخفض الأداء؟", "level_indicator": true}
      ]
    },
    {
      "competency": "التواصل والعلاقات",
      "scenarios": [
        {"id": 3, "situation": "كيف تقدم تغذية راجعة صعبة؟", "level_indicator": true},
        {"id": 4, "situation": "كيف تقنع فريق بتغيير الاتجاه؟", "level_indicator": true}
      ]
    }
  ]' AS jsonb),
  CAST('{
    "competency_matrix": "role_based",
    "levels": 5,
    "scenario_based": true,
    "development_mapping": true
  }' AS jsonb)
FROM public.companies c 
WHERE c.company_code = 'BOUD-001'
ON CONFLICT DO NOTHING;