-- Insert sample budget expenses using existing category IDs
INSERT INTO budget_expenses (id, category_id, expense_date, amount, description, status) VALUES
('11111111-eeee-eeee-eeee-111111111111', '14408f38-2c14-43c2-9a2c-46bdc9eb2f94', '2025-01-15', 125000, 'رواتب شهر يناير 2025', 'approved'),
('22222222-eeee-eeee-eeee-222222222222', '14408f38-2c14-43c2-9a2c-46bdc9eb2f94', '2025-02-15', 128000, 'رواتب شهر فبراير 2025', 'approved'),
('33333333-eeee-eeee-eeee-333333333333', '7bee0038-f094-46bc-a179-ba711294a662', '2025-01-10', 18000, 'حملة توظيف جديدة', 'approved'),
('44444444-eeee-eeee-eeee-444444444444', '934e1f9b-09da-4f16-bb1e-99a2bc02eb85', '2025-01-20', 12000, 'دورة تدريبية في إدارة المشاريع', 'approved'),
('55555555-eeee-eeee-eeee-555555555555', '6c277bb0-eaba-4c46-98ae-df15847b8def', '2025-02-01', 25000, 'مكافآت الأداء المتميز', 'approved'),
('66666666-eeee-eeee-eeee-666666666666', '6ab471cb-6b1e-44c1-ba0d-51b3a5abf9aa', '2025-01-25', 8000, 'برنامج الصحة النفسية', 'pending'),
('77777777-eeee-eeee-eeee-777777777777', 'afa70bf0-48fe-48d0-8f7c-d5bce63f0ed7', '2025-02-10', 15000, 'تحديث أنظمة الموارد البشرية', 'approved'),
('88888888-eeee-eeee-eeee-888888888888', '6e01e52d-550b-49c9-ad36-673d8a2de89d', '2025-01-30', 5000, 'استشارات قانونية', 'pending'),
('99999999-eeee-eeee-eeee-999999999999', '68b70b12-8a6e-4200-adbf-45405e37856c', '2025-02-05', 3500, 'خدمات إدارية مساندة', 'approved')
ON CONFLICT (id) DO NOTHING;