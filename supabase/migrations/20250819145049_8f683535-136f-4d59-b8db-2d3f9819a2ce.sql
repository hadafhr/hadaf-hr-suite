-- إنشاء نظام الجزاءات والإجراءات التأديبية الشامل وفقاً لنظام العمل السعودي

-- جدول المخالفات وفقاً لنظام العمل السعودي
CREATE TABLE IF NOT EXISTS public.saudi_labor_violations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    violation_code TEXT NOT NULL UNIQUE, -- كود المخالفة مثل 1/1, 1/2, etc.
    category TEXT NOT NULL, -- الفئة: الحضور والانصراف، تنظيم العمل، السلوك العام
    violation_name TEXT NOT NULL, -- اسم المخالفة
    article_reference TEXT NOT NULL, -- مرجع المادة في النظام
    description TEXT, -- وصف المخالفة
    severity public.severity_level NOT NULL DEFAULT 'medium', -- مستوى الخطورة
    first_action TEXT NOT NULL, -- الإجراء الأول
    second_action TEXT NOT NULL, -- الإجراء الثاني  
    third_action TEXT NOT NULL, -- الإجراء الثالث
    final_action TEXT NOT NULL, -- الإجراء النهائي
    auto_trigger_rules JSONB DEFAULT '{}', -- قواعد الرصد التلقائي
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- إدراج المخالفات الأساسية وفقاً لنظام العمل السعودي
INSERT INTO public.saudi_labor_violations (violation_code, category, violation_name, article_reference, description, severity, first_action, second_action, third_action, final_action, auto_trigger_rules) VALUES
-- مخالفات الحضور والانصراف - المادة الأولى
('1/1', 'الحضور والانصراف', 'التأخير عن موعد العمل 15 دقيقة أو أقل', 'المادة 80 - الفقرة 1/1', 'التأخير عن موعد بداية العمل المحدد لمدة 15 دقيقة أو أقل', 'low', 'إنذار شفهي', 'إنذار كتابي', 'خصم نصف يوم', 'خصم يوم كامل', '{"attendance_late": {"threshold_minutes": 15, "count_period": "monthly"}}'),
('1/2', 'الحضور والانصراف', 'التأخير عن موعد العمل أكثر من 15 دقيقة وأقل من 30 دقيقة', 'المادة 80 - الفقرة 1/2', 'التأخير عن موعد بداية العمل لمدة تزيد عن 15 دقيقة وتقل عن 30 دقيقة', 'medium', 'إنذار كتابي', 'خصم نصف يوم', 'خصم يوم كامل', 'خصم يومين', '{"attendance_late": {"threshold_minutes": 30, "count_period": "monthly"}}'),
('1/3', 'الحضور والانصراف', 'التأخير عن موعد العمل أكثر من 30 دقيقة وأقل من ساعة', 'المادة 80 - الفقرة 1/3', 'التأخير عن موعد بداية العمل لمدة تزيد عن 30 دقيقة وتقل عن ساعة', 'high', 'خصم نصف يوم', 'خصم يوم كامل', 'خصم يومين', 'فصل من الخدمة', '{"attendance_late": {"threshold_minutes": 60, "count_period": "monthly"}}'),
('1/4', 'الحضور والانصراف', 'التأخير عن موعد العمل أكثر من ساعة', 'المادة 80 - الفقرة 1/4', 'التأخير عن موعد بداية العمل لمدة تزيد عن ساعة كاملة', 'critical', 'خصم يوم كامل', 'خصم يومين', 'فصل من الخدمة', 'فصل من الخدمة', '{"attendance_late": {"threshold_minutes": 60, "automatic_escalation": true}}'),
('1/5', 'الحضور والانصراف', 'مغادرة مكان العمل أثناء ساعات الدوام دون إذن', 'المادة 80 - الفقرة 1/5', 'ترك مكان العمل دون الحصول على إذن مسبق من الرئيس المباشر', 'medium', 'إنذار كتابي', 'خصم نصف يوم', 'خصم يوم كامل', 'فصل من الخدمة', '{"early_departure": true}'),
('1/6', 'الحضور والانصراف', 'الغياب عن العمل دون عذر مشروع يوم واحد', 'المادة 80 - الفقرة 1/6', 'الغياب الكامل عن العمل ليوم واحد دون مبرر مقبول أو إذن مسبق', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', '{"absence_unauthorized": {"days": 1}}'),
('1/7', 'الحضور والانصراف', 'الغياب عن العمل دون عذر مشروع أكثر من يوم متتالي', 'المادة 80 - الفقرة 1/7', 'الغياب المتواصل عن العمل لأكثر من يوم واحد دون مبرر', 'critical', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', '{"absence_unauthorized": {"days_consecutive": 2}}'),

-- مخالفات تنظيم العمل - المادة الثانية
('2/1', 'تنظيم العمل', 'مخالفة تعليمات الأمن والسلامة', 'المادة 80 - الفقرة 2/1', 'عدم الالتزام بقواعد وتعليمات الأمن والسلامة المهنية', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', '{}'),
('2/2', 'تنظيم العمل', 'عدم المحافظة على أدوات العمل وممتلكات المنشأة', 'المادة 80 - الفقرة 2/2', 'الإهمال في المحافظة على أدوات ومعدات العمل أو ممتلكات الشركة', 'medium', 'إنذار شفهي', 'إنذار كتابي', 'خصم نصف يوم', 'خصم يوم كامل', '{}'),
('2/3', 'تنظيم العمل', 'إهمال في أداء الواجبات مما يعرض سلامة المنشأة أو العاملين للخطر', 'المادة 80 - الفقرة 2/3', 'الإهمال الجسيم الذي قد يعرض سلامة المنشأة أو الموظفين للخطر', 'critical', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', '{}'),
('2/4', 'تنظيم العمل', 'عدم طاعة الأوامر أو عدم احترام الرؤساء', 'المادة 80 - الفقرة 2/4', 'عدم تنفيذ الأوامر المشروعة أو عدم احترام الرؤساء في العمل', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', '{}'),

-- مخالفات السلوك العام - المادة الثالثة
('3/1', 'السلوك العام', 'الاعتداء على أحد الرؤساء أو الزملاء أو الجمهور', 'المادة 80 - الفقرة 3/1', 'أي نوع من الاعتداء الجسدي أو اللفظي على الرؤساء أو الزملاء أو العملاء', 'critical', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', '{}'),
('3/2', 'السلوك العام', 'إفشاء أسرار العمل', 'المادة 80 - الفقرة 3/2', 'كشف أو نشر أسرار العمل أو المعلومات السرية للشركة', 'critical', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', '{}'),
('3/3', 'السلوك العام', 'ممارسة أنشطة سياسية داخل المنشأة', 'المادة 80 - الفقرة 3/3', 'القيام بأنشطة سياسية أو حزبية داخل مكان العمل', 'high', 'إنذار كتابي', 'خصم راتب يوم واحد', 'خصم راتب ثلاثة أيام', 'فصل من الخدمة', '{}'),
('3/4', 'السلوك العام', 'تعاطي المسكرات أو المواد المخدرة', 'المادة 80 - الفقرة 3/4', 'تعاطي أو حيازة أو تداول المسكرات أو المواد المخدرة في مكان العمل', 'critical', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', 'فصل من الخدمة', '{}'),
('3/5', 'السلوك العام', 'التدخين في أماكن محظورة', 'المادة 80 - الفقرة 3/5', 'التدخين في الأماكن المحظورة أو غير المخصصة للتدخين', 'low', 'إنذار شفهي', 'إنذار كتابي', 'خصم نصف يوم', 'خصم يوم كامل', '{}')
ON CONFLICT (violation_code) DO NOTHING;

-- تحديث سجل الموظفين التأديبي
CREATE TABLE IF NOT EXISTS public.employee_disciplinary_record (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id UUID NOT NULL,
    company_id UUID NOT NULL,
    disciplinary_action_id UUID,
    violation_count INTEGER DEFAULT 0,
    total_warnings INTEGER DEFAULT 0,
    total_penalties NUMERIC DEFAULT 0,
    last_violation_date DATE,
    risk_level TEXT DEFAULT 'low', -- low, medium, high, critical
    next_escalation_level TEXT,
    points_accumulated INTEGER DEFAULT 0, -- نظام النقاط للمخالفات
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(employee_id, company_id)
);

-- جدول التنبيهات الذكية للذكاء الاصطناعي
CREATE TABLE IF NOT EXISTS public.ai_disciplinary_insights (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    insight_type TEXT NOT NULL, -- 'risk', 'pattern', 'recommendation', 'prediction'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority public.severity_level NOT NULL DEFAULT 'medium',
    action_required BOOLEAN DEFAULT false,
    employee_id UUID,
    department TEXT,
    company_id UUID,
    confidence_score NUMERIC DEFAULT 0, -- درجة الثقة في التحليل (0-1)
    data_points JSONB DEFAULT '{}', -- البيانات المستخدمة في التحليل
    recommendations JSONB DEFAULT '[]', -- التوصيات المقترحة
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- جدول الطعون والاعتراضات
CREATE TABLE IF NOT EXISTS public.disciplinary_appeals (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    disciplinary_action_id UUID NOT NULL REFERENCES public.disciplinary_actions(id),
    appeal_reason TEXT NOT NULL,
    supporting_documents JSONB DEFAULT '[]',
    submitted_by UUID NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    review_committee JSONB DEFAULT '[]', -- أعضاء لجنة المراجعة
    status public.appeal_status DEFAULT 'submitted',
    decision TEXT,
    decision_date TIMESTAMP WITH TIME ZONE,
    decision_by UUID,
    final_outcome TEXT, -- النتيجة النهائية: 'upheld', 'overturned', 'modified'
    modified_penalty TEXT, -- الجزاء المعدل في حالة التعديل
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- تمكين RLS على الجداول الجديدة
ALTER TABLE public.saudi_labor_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_disciplinary_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_disciplinary_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinary_appeals ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمخالفات السعودية (يمكن للجميع القراءة)
CREATE POLICY "Everyone can view Saudi labor violations" ON public.saudi_labor_violations
    FOR SELECT USING (is_active = true);

-- سياسات الأمان لسجلات الموظفين التأديبية
CREATE POLICY "HR managers can view disciplinary records" ON public.employee_disciplinary_record
    FOR SELECT USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

CREATE POLICY "HR managers can manage disciplinary records" ON public.employee_disciplinary_record
    FOR ALL USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

-- سياسات الأمان للتنبيهات الذكية
CREATE POLICY "HR can view AI insights" ON public.ai_disciplinary_insights
    FOR SELECT USING (
        boud_has_role(auth.uid(), company_id, 'super_admin'::user_role) OR 
        boud_has_role(auth.uid(), company_id, 'hr_manager'::user_role)
    );

-- سياسات الأمان للطعون
CREATE POLICY "Employees can view their appeals" ON public.disciplinary_appeals
    FOR SELECT USING (
        submitted_by = auth.uid() OR
        disciplinary_action_id IN (
            SELECT id FROM public.disciplinary_actions 
            WHERE employee_id IN (
                SELECT id FROM public.boud_employees 
                WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Employees can create appeals" ON public.disciplinary_appeals
    FOR INSERT WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "HR can manage appeals" ON public.disciplinary_appeals
    FOR ALL USING (
        disciplinary_action_id IN (
            SELECT id FROM public.disciplinary_actions da
            WHERE boud_has_role(auth.uid(), da.company_id, 'super_admin'::user_role) OR 
                  boud_has_role(auth.uid(), da.company_id, 'hr_manager'::user_role)
        )
    );

-- دالة لتوليد تنبيهات الذكاء الاصطناعي
CREATE OR REPLACE FUNCTION public.generate_ai_disciplinary_insights()
RETURNS TABLE(insight_count INTEGER, insights_generated JSONB[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    insight_count INTEGER := 0;
    insights_generated JSONB[] := '{}';
    rec RECORD;
    company_violation_count INTEGER;
    employee_at_risk_count INTEGER;
BEGIN
    -- تحليل أنماط المخالفات على مستوى الشركة
    FOR rec IN 
        SELECT company_id, COUNT(*) as violation_count
        FROM disciplinary_actions 
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY company_id
        HAVING COUNT(*) > 10
    LOOP
        INSERT INTO ai_disciplinary_insights (
            insight_type, title, description, priority, action_required, 
            company_id, confidence_score, data_points
        ) VALUES (
            'pattern',
            'ارتفاع معدل المخالفات',
            'تم رصد ارتفاع غير طبيعي في معدل المخالفات خلال الشهر الماضي',
            'high',
            true,
            rec.company_id,
            0.85,
            jsonb_build_object(
                'violation_count', rec.violation_count,
                'period', '30 days',
                'threshold_exceeded', true
            )
        );
        
        insight_count := insight_count + 1;
        insights_generated := array_append(insights_generated, 
            jsonb_build_object('type', 'pattern', 'company_id', rec.company_id)
        );
    END LOOP;
    
    -- تحديد الموظفين المعرضين للخطر
    FOR rec IN
        SELECT e.id as employee_id, e.company_id, COUNT(da.id) as recent_violations
        FROM boud_employees e
        LEFT JOIN disciplinary_actions da ON da.employee_id = e.id
        WHERE da.created_at >= NOW() - INTERVAL '90 days'
        GROUP BY e.id, e.company_id
        HAVING COUNT(da.id) >= 3
    LOOP
        INSERT INTO ai_disciplinary_insights (
            insight_type, title, description, priority, action_required,
            employee_id, company_id, confidence_score, data_points
        ) VALUES (
            'risk',
            'موظف عرضة للفصل',
            'هذا الموظف تجاوز الحد المسموح من المخالفات ويحتاج تدخل فوري',
            'critical',
            true,
            rec.employee_id,
            rec.company_id,
            0.90,
            jsonb_build_object(
                'recent_violations', rec.recent_violations,
                'period', '90 days',
                'risk_level', 'critical'
            )
        );
        
        insight_count := insight_count + 1;
        insights_generated := array_append(insights_generated, 
            jsonb_build_object('type', 'risk', 'employee_id', rec.employee_id)
        );
    END LOOP;
    
    RETURN QUERY SELECT insight_count, insights_generated;
END;
$$;

-- دالة لتنفيذ الطعون
CREATE OR REPLACE FUNCTION public.process_disciplinary_appeal(
    appeal_id UUID,
    decision TEXT,
    outcome TEXT,
    modified_penalty TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    appeal_record RECORD;
    action_record RECORD;
BEGIN
    -- جلب بيانات الطعن
    SELECT * INTO appeal_record FROM disciplinary_appeals WHERE id = appeal_id;
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- جلب بيانات الإجراء التأديبي
    SELECT * INTO action_record FROM disciplinary_actions WHERE id = appeal_record.disciplinary_action_id;
    
    -- تحديث حالة الطعن
    UPDATE disciplinary_appeals SET
        status = 'reviewed',
        decision = decision,
        decision_date = NOW(),
        decision_by = auth.uid(),
        final_outcome = outcome,
        modified_penalty = modified_penalty,
        updated_at = NOW()
    WHERE id = appeal_id;
    
    -- تطبيق النتيجة على الإجراء التأديبي
    IF outcome = 'overturned' THEN
        -- إلغاء الإجراء التأديبي
        UPDATE disciplinary_actions SET 
            status = 'cancelled',
            notes = COALESCE(notes, '') || ' - تم إلغاؤه بناءً على الطعن رقم ' || appeal_id::TEXT,
            updated_at = NOW()
        WHERE id = appeal_record.disciplinary_action_id;
        
    ELSIF outcome = 'modified' AND modified_penalty IS NOT NULL THEN
        -- تعديل الإجراء التأديبي
        UPDATE disciplinary_actions SET 
            action_type = modified_penalty::disciplinary_action_type,
            notes = COALESCE(notes, '') || ' - تم تعديله بناءً على الطعن رقم ' || appeal_id::TEXT,
            updated_at = NOW()
        WHERE id = appeal_record.disciplinary_action_id;
    END IF;
    
    RETURN TRUE;
END;
$$;

-- دالة لحساب مستوى المخاطر للموظف
CREATE OR REPLACE FUNCTION public.calculate_employee_risk_level(p_employee_id UUID, p_company_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    violation_count INTEGER;
    recent_violations INTEGER;
    severity_score INTEGER := 0;
    risk_level TEXT := 'low';
    rec RECORD;
BEGIN
    -- عدد المخالفات الإجمالية
    SELECT COUNT(*) INTO violation_count
    FROM disciplinary_actions
    WHERE employee_id = p_employee_id AND company_id = p_company_id;
    
    -- عدد المخالفات في آخر 90 يوم
    SELECT COUNT(*) INTO recent_violations
    FROM disciplinary_actions
    WHERE employee_id = p_employee_id 
    AND company_id = p_company_id
    AND created_at >= NOW() - INTERVAL '90 days';
    
    -- حساب درجة الخطورة بناءً على أنواع المخالفات
    FOR rec IN
        SELECT slv.severity
        FROM disciplinary_actions da
        JOIN saudi_labor_violations slv ON da.violation_id = slv.id
        WHERE da.employee_id = p_employee_id 
        AND da.company_id = p_company_id
        AND da.created_at >= NOW() - INTERVAL '180 days'
    LOOP
        CASE rec.severity
            WHEN 'low' THEN severity_score := severity_score + 1;
            WHEN 'medium' THEN severity_score := severity_score + 2;
            WHEN 'high' THEN severity_score := severity_score + 4;
            WHEN 'critical' THEN severity_score := severity_score + 8;
        END CASE;
    END LOOP;
    
    -- تحديد مستوى المخاطر
    IF recent_violations >= 3 OR severity_score >= 12 THEN
        risk_level := 'critical';
    ELSIF recent_violations >= 2 OR severity_score >= 6 THEN
        risk_level := 'high';
    ELSIF violation_count >= 2 OR severity_score >= 3 THEN
        risk_level := 'medium';
    ELSE
        risk_level := 'low';
    END IF;
    
    -- تحديث سجل الموظف
    INSERT INTO employee_disciplinary_record (
        employee_id, company_id, violation_count, risk_level, updated_at
    ) VALUES (
        p_employee_id, p_company_id, violation_count, risk_level, NOW()
    )
    ON CONFLICT (employee_id, company_id) DO UPDATE SET
        violation_count = EXCLUDED.violation_count,
        risk_level = EXCLUDED.risk_level,
        updated_at = NOW();
    
    RETURN risk_level;
END;
$$;

-- إنشاء محفز لتحديث السجل التأديبي عند إنشاء إجراء تأديبي جديد
CREATE OR REPLACE FUNCTION public.update_employee_disciplinary_record()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- تحديث أو إنشاء سجل الموظف التأديبي
    INSERT INTO employee_disciplinary_record (
        employee_id, 
        company_id, 
        disciplinary_action_id,
        violation_count,
        total_warnings,
        last_violation_date
    )
    VALUES (
        NEW.employee_id,
        NEW.company_id,
        NEW.id,
        1,
        CASE WHEN NEW.action_type IN ('verbal_warning', 'written_warning', 'final_warning') THEN 1 ELSE 0 END,
        NEW.violation_date
    )
    ON CONFLICT (employee_id, company_id) 
    DO UPDATE SET
        violation_count = employee_disciplinary_record.violation_count + 1,
        total_warnings = employee_disciplinary_record.total_warnings + 
            CASE WHEN NEW.action_type IN ('verbal_warning', 'written_warning', 'final_warning') THEN 1 ELSE 0 END,
        total_penalties = employee_disciplinary_record.total_penalties + COALESCE(NEW.penalty_amount, 0),
        last_violation_date = NEW.violation_date,
        updated_at = now();
        
    RETURN NEW;
END;
$$;

-- إنشاء المحفز
DROP TRIGGER IF EXISTS trigger_update_disciplinary_record ON public.disciplinary_actions;
CREATE TRIGGER trigger_update_disciplinary_record
    AFTER INSERT ON public.disciplinary_actions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_employee_disciplinary_record();

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_saudi_violations_category ON public.saudi_labor_violations(category);
CREATE INDEX IF NOT EXISTS idx_saudi_violations_severity ON public.saudi_labor_violations(severity);
CREATE INDEX IF NOT EXISTS idx_disciplinary_record_employee ON public.employee_disciplinary_record(employee_id, company_id);
CREATE INDEX IF NOT EXISTS idx_disciplinary_record_risk ON public.employee_disciplinary_record(risk_level);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON public.ai_disciplinary_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_priority ON public.ai_disciplinary_insights(priority);
CREATE INDEX IF NOT EXISTS idx_appeals_status ON public.disciplinary_appeals(status);