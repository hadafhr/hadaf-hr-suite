-- إضافة أقسام جديدة للوظائف إذا لم تكن موجودة
INSERT INTO career_departments (id, name, name_en, description, is_active) VALUES 
  (gen_random_uuid(), 'تقنية المعلومات', 'Information Technology', 'قسم تقنية المعلومات والتطوير', true),
  (gen_random_uuid(), 'الموارد البشرية', 'Human Resources', 'قسم الموارد البشرية', true),
  (gen_random_uuid(), 'التسويق', 'Marketing', 'قسم التسويق والمبيعات', true),
  (gen_random_uuid(), 'المالية', 'Finance', 'قسم المالية والمحاسبة', true),
  (gen_random_uuid(), 'العمليات', 'Operations', 'قسم العمليات والإدارة', true)
ON CONFLICT (name) DO NOTHING;

-- إضافة الوظائف الخمس الجديدة
WITH dept_ids AS (
  SELECT 
    id as it_id,
    (SELECT id FROM career_departments WHERE name = 'الموارد البشرية' LIMIT 1) as hr_id,
    (SELECT id FROM career_departments WHERE name = 'التسويق' LIMIT 1) as marketing_id,
    (SELECT id FROM career_departments WHERE name = 'المالية' LIMIT 1) as finance_id,
    (SELECT id FROM career_departments WHERE name = 'العمليات' LIMIT 1) as operations_id
  FROM career_departments 
  WHERE name = 'تقنية المعلومات' 
  LIMIT 1
)
INSERT INTO job_openings (
  id, title, title_en, department_id, location, job_type, description, 
  requirements, benefits, salary_range_min, salary_range_max, 
  posted_at, is_active, views_count, applications_count
) 
SELECT * FROM (
  VALUES 
    (
      gen_random_uuid(),
      'مطور تطبيقات ويب',
      'Web Application Developer',
      (SELECT it_id FROM dept_ids),
      'الرياض',
      'full_time',
      'نبحث عن مطور تطبيقات ويب متمرس للانضمام إلى فريقنا التقني. المرشح المثالي يجب أن يكون لديه خبرة في تطوير تطبيقات الويب الحديثة باستخدام أحدث التقنيات.',
      '["خبرة لا تقل عن 3 سنوات في تطوير تطبيقات الويب", "إتقان React أو Vue.js", "خبرة في Node.js", "معرفة بقواعد البيانات SQL وNoSQL", "إجادة اللغة الإنجليزية"]'::jsonb,
      '["راتب تنافسي", "تأمين صحي شامل", "إجازات مدفوعة الأجر", "فرص التطوير المهني", "بيئة عمل مرنة"]'::jsonb,
      8000,
      15000,
      NOW(),
      true,
      0,
      0
    ),
    (
      gen_random_uuid(),
      'أخصائي موارد بشرية',
      'HR Specialist',
      (SELECT hr_id FROM dept_ids),
      'الرياض',
      'full_time',
      'نحن نبحث عن أخصائي موارد بشرية لإدارة عمليات التوظيف وتطوير السياسات الداخلية. المرشح المثالي يجب أن يكون لديه فهم عميق لممارسات الموارد البشرية الحديثة.',
      '["درجة البكالوريوس في الموارد البشرية أو مجال ذي صلة", "خبرة لا تقل عن سنتين في مجال الموارد البشرية", "مهارات تواصل ممتازة", "معرفة بقوانين العمل السعودية", "إجادة برامج الأوفيس"]'::jsonb,
      '["راتب تنافسي", "تأمين صحي", "إجازات سنوية", "برامج تدريبية", "حوافز أداء"]'::jsonb,
      6000,
      10000,
      NOW(),
      true,
      0,
      0
    ),
    (
      gen_random_uuid(),
      'مسوق رقمي',
      'Digital Marketing Specialist',
      (SELECT marketing_id FROM dept_ids),
      'جدة',
      'full_time',
      'نحن نبحث عن مسوق رقمي مبدع للانضمام إلى فريق التسويق لدينا. المرشح المثالي يجب أن يكون لديه خبرة في إدارة الحملات الرقمية وتحليل البيانات.',
      '["خبرة لا تقل عن سنتين في التسويق الرقمي", "إتقان أدوات Google Analytics وGoogle Ads", "خبرة في إدارة وسائل التواصل الاجتماعي", "مهارات تحليلية قوية", "إبداع في تصميم المحتوى"]'::jsonb,
      '["راتب جذاب", "تأمين صحي شامل", "فرص السفر", "دورات تدريبية متقدمة", "بيئة عمل إبداعية"]'::jsonb,
      7000,
      12000,
      NOW(),
      true,
      0,
      0
    ),
    (
      gen_random_uuid(),
      'محاسب مالي',
      'Financial Accountant',
      (SELECT finance_id FROM dept_ids),
      'الرياض',
      'full_time',
      'نبحث عن محاسب مالي متمرس للانضمام إلى فريق المالية. المرشح المثالي يجب أن يكون لديه خبرة في إعداد التقارير المالية والمحاسبة الإدارية.',
      '["درجة البكالوريوس في المحاسبة أو المالية", "خبرة لا تقل عن 3 سنوات في المحاسبة", "إتقان برامج المحاسبة", "معرفة بالمعايير المحاسبية السعودية", "دقة في العمل"]'::jsonb,
      '["راتب مميز", "تأمين صحي", "إجازات مدفوعة", "فرص الترقي", "استقرار وظيفي"]'::jsonb,
      8000,
      14000,
      NOW(),
      true,
      0,
      0
    ),
    (
      gen_random_uuid(),
      'مدير عمليات',
      'Operations Manager',
      (SELECT operations_id FROM dept_ids),
      'الدمام',
      'full_time',
      'نحن نبحث عن مدير عمليات لإدارة وتطوير العمليات التشغيلية للشركة. المرشح المثالي يجب أن يكون لديه خبرة في إدارة الفرق وتحسين العمليات.',
      '["درجة البكالوريوس في إدارة الأعمال أو مجال ذي صلة", "خبرة لا تقل عن 5 سنوات في إدارة العمليات", "مهارات قيادية قوية", "خبرة في تحسين العمليات", "مهارات تحليلية متقدمة"]'::jsonb,
      '["راتب قيادي", "تأمين صحي شامل للعائلة", "سيارة شركة", "إجازات إضافية", "خيارات الأسهم"]'::jsonb,
      12000,
      20000,
      NOW(),
      true,
      0,
      0
    )
) AS v;