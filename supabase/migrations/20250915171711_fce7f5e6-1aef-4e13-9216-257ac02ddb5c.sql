-- Insert sample budget categories
INSERT INTO budget_categories (id, code, name_ar, name_en, description, status) VALUES
('11111111-1111-1111-1111-111111111111', 'SAL', 'الرواتب والأجور', 'Salaries & Wages', 'رواتب الموظفين والمكافآت والحوافز', 'active'),
('22222222-2222-2222-2222-222222222222', 'RENT', 'الإيجارات والمرافق', 'Rent & Utilities', 'إيجار المكاتب والمرافق والخدمات', 'active'),
('33333333-3333-3333-3333-333333333333', 'MKTG', 'التسويق والإعلان', 'Marketing & Advertising', 'حملات التسويق والإعلان والترويج', 'active'),
('44444444-4444-4444-4444-444444444444', 'IT', 'تقنية المعلومات', 'Information Technology', 'معدات وبرمجيات تقنية المعلومات', 'active'),
('55555555-5555-5555-5555-555555555555', 'TRAIN', 'التدريب والتطوير', 'Training & Development', 'برامج التدريب وتطوير المهارات', 'active'),
('66666666-6666-6666-6666-666666666666', 'TRAVEL', 'السفر والمهام', 'Travel & Business', 'مصاريف السفر والمهام الرسمية', 'active'),
('77777777-7777-7777-7777-777777777777', 'OFFICE', 'مستلزمات المكتب', 'Office Supplies', 'مستلزمات المكتب والقرطاسية', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample budget allocations for 2025
INSERT INTO budget_allocations (id, category_id, year, allocated_amount, notes, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 2025, 1500000, 'رواتب فريق العمل الأساسي لعام 2025', 'approved'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 2025, 300000, 'إيجار المكتب الرئيسي والفروع', 'approved'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 2025, 250000, 'حملات التسويق الرقمي والتقليدي', 'approved'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 2025, 180000, 'تحديث الأجهزة والبرمجيات', 'approved'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 2025, 100000, 'برامج التدريب والتطوير المهني', 'approved'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '66666666-6666-6666-6666-666666666666', 2025, 80000, 'مصاريف السفر والمهام الرسمية', 'pending'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', '77777777-7777-7777-7777-777777777777', 2025, 50000, 'مستلزمات المكتب والقرطاسية', 'draft')
ON CONFLICT (id) DO NOTHING;

-- Insert sample budget expenses
INSERT INTO budget_expenses (id, category_id, expense_date, amount, description, status) VALUES
('11111111-eeee-eeee-eeee-111111111111', '11111111-1111-1111-1111-111111111111', '2025-01-15', 125000, 'رواتب شهر يناير 2025', 'approved'),
('22222222-eeee-eeee-eeee-222222222222', '22222222-2222-2222-2222-222222222222', '2025-01-01', 25000, 'إيجار المكتب الرئيسي - يناير', 'approved'),
('33333333-eeee-eeee-eeee-333333333333', '33333333-3333-3333-3333-333333333333', '2025-01-10', 18000, 'حملة إعلانية على وسائل التواصل', 'approved'),
('44444444-eeee-eeee-eeee-444444444444', '44444444-4444-4444-4444-444444444444', '2025-01-08', 12000, 'تراخيص البرمجيات السنوية', 'approved'),
('55555555-eeee-eeee-eeee-555555555555', '11111111-1111-1111-1111-111111111111', '2025-02-15', 128000, 'رواتب شهر فبراير 2025', 'approved'),
('66666666-eeee-eeee-eeee-666666666666', '22222222-2222-2222-2222-222222222222', '2025-02-01', 25000, 'إيجار المكتب - فبراير', 'approved'),
('77777777-eeee-eeee-eeee-777777777777', '55555555-5555-5555-5555-555555555555', '2025-02-20', 8000, 'دورة تدريبية في إدارة المشاريع', 'approved'),
('88888888-eeee-eeee-eeee-888888888888', '77777777-7777-7777-7777-777777777777', '2025-01-25', 3500, 'مستلزمات مكتبية متنوعة', 'pending'),
('99999999-eeee-eeee-eeee-999999999999', '33333333-3333-3333-3333-333333333333', '2025-03-05', 22000, 'حملة تسويقية جديدة', 'pending'),
('aaaaaaaa-eeee-eeee-eeee-aaaaaaaaaaaa', '66666666-6666-6666-6666-666666666666', '2025-02-10', 15000, 'رحلة عمل لمؤتمر التقنية', 'approved')
ON CONFLICT (id) DO NOTHING;

-- Insert sample budget forecasts
INSERT INTO budget_forecasts (category_id, forecast_year, forecast_month, predicted_amount, forecast_method, confidence_level) VALUES
('11111111-1111-1111-1111-111111111111', 2025, 4, 130000, 'linear', 85),
('22222222-2222-2222-2222-222222222222', 2025, 4, 25000, 'linear', 90),
('33333333-3333-3333-3333-333333333333', 2025, 4, 20000, 'ai', 78),
('44444444-4444-4444-4444-444444444444', 2025, 4, 15000, 'linear', 82),
('55555555-5555-5555-5555-555555555555', 2025, 4, 10000, 'manual', 75)
ON CONFLICT DO NOTHING;

-- Insert sample budget approvals
INSERT INTO budget_approvals (allocation_id, requested_by, approval_level, status, notes) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', (SELECT auth.uid()), 'manager', 'pending', 'يحتاج موافقة على مصاريف السفر'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', (SELECT auth.uid()), 'finance', 'pending', 'مراجعة مستلزمات المكتب')
ON CONFLICT DO NOTHING;

-- Insert sample budget notifications
INSERT INTO budget_notifications (user_id, title, message, notification_type, related_category_id, is_read) VALUES
((SELECT auth.uid()), 'تحذير من تجاوز الميزانية', 'تم تجاوز 80% من ميزانية التسويق لهذا الشهر', 'warning', '33333333-3333-3333-3333-333333333333', false),
((SELECT auth.uid()), 'موافقة مطلوبة', 'يوجد طلب موافقة على مصاريف السفر', 'approval_required', '66666666-6666-6666-6666-666666666666', false),
((SELECT auth.uid()), 'تم الموافقة', 'تم الموافقة على ميزانية الرواتب', 'approved', '11111111-1111-1111-1111-111111111111', true),
((SELECT auth.uid()), 'تقرير شهري', 'تقرير الميزانية لشهر فبراير متاح الآن', 'info', null, false)
ON CONFLICT DO NOTHING;