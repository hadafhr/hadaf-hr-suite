-- Create tables for Organizational Development system

-- Organizational Development Initiatives
CREATE TABLE public.od_initiatives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    phase TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(15,2) DEFAULT 0,
    department TEXT NOT NULL,
    regulations TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Initiative Steps
CREATE TABLE public.od_initiative_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    initiative_id UUID REFERENCES public.od_initiatives(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Initiative Approvals
CREATE TABLE public.od_initiative_approvals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    initiative_id UUID REFERENCES public.od_initiatives(id) ON DELETE CASCADE,
    role_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('approved', 'pending', 'rejected')),
    approved_date TIMESTAMP WITH TIME ZONE,
    entity TEXT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Happiness Index Measurements
CREATE TABLE public.od_happiness_measurements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    department TEXT NOT NULL,
    score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 5),
    measurement_date DATE DEFAULT CURRENT_DATE,
    employee_count INTEGER DEFAULT 0,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Impact Measurements
CREATE TABLE public.od_impact_measurements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    initiative_id UUID REFERENCES public.od_initiatives(id) ON DELETE CASCADE,
    measurement_type TEXT NOT NULL CHECK (measurement_type IN ('performance', 'cost', 'satisfaction')),
    before_value DECIMAL(10,2),
    after_value DECIMAL(10,2),
    improvement_percentage DECIMAL(5,2),
    measurement_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Leaderboard Entries
CREATE TABLE public.od_leaderboard (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    department TEXT NOT NULL,
    score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 5),
    improvement_percentage DECIMAL(5,2) DEFAULT 0,
    badge TEXT,
    employee_count INTEGER DEFAULT 0,
    period_month INTEGER NOT NULL,
    period_year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(department, period_month, period_year)
);

-- Organizational Structure Nodes
CREATE TABLE public.od_org_structure (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('department', 'unit', 'team', 'division')),
    parent_id UUID REFERENCES public.od_org_structure(id),
    manager_name TEXT,
    employee_count INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.od_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_initiative_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_initiative_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_happiness_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_impact_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.od_org_structure ENABLE ROW LEVEL SECURITY;

-- RLS Policies for od_initiatives
CREATE POLICY "Users can view their own initiatives" ON public.od_initiatives
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own initiatives" ON public.od_initiatives
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own initiatives" ON public.od_initiatives
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own initiatives" ON public.od_initiatives
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for od_initiative_steps
CREATE POLICY "Users can view steps of their initiatives" ON public.od_initiative_steps
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create steps for their initiatives" ON public.od_initiative_steps
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update steps of their initiatives" ON public.od_initiative_steps
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete steps of their initiatives" ON public.od_initiative_steps
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

-- Similar RLS policies for other tables
CREATE POLICY "Users can view approvals of their initiatives" ON public.od_initiative_approvals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create approvals for their initiatives" ON public.od_initiative_approvals
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

-- RLS Policies for happiness measurements
CREATE POLICY "Users can view their happiness measurements" ON public.od_happiness_measurements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their happiness measurements" ON public.od_happiness_measurements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their happiness measurements" ON public.od_happiness_measurements
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for impact measurements
CREATE POLICY "Users can view impact of their initiatives" ON public.od_impact_measurements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create impact measurements for their initiatives" ON public.od_impact_measurements
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.od_initiatives 
            WHERE id = initiative_id AND user_id = auth.uid()
        )
    );

-- Public access for leaderboard (read-only)
CREATE POLICY "Everyone can view leaderboard" ON public.od_leaderboard
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage leaderboard" ON public.od_leaderboard
    FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for org structure
CREATE POLICY "Users can view their org structure" ON public.od_org_structure
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their org structure" ON public.od_org_structure
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their org structure" ON public.od_org_structure
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their org structure" ON public.od_org_structure
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_od_initiatives_user_id ON public.od_initiatives(user_id);
CREATE INDEX idx_od_initiatives_status ON public.od_initiatives(status);
CREATE INDEX idx_od_initiatives_department ON public.od_initiatives(department);
CREATE INDEX idx_od_initiative_steps_initiative_id ON public.od_initiative_steps(initiative_id);
CREATE INDEX idx_od_happiness_measurements_department ON public.od_happiness_measurements(department);
CREATE INDEX idx_od_happiness_measurements_date ON public.od_happiness_measurements(measurement_date);
CREATE INDEX idx_od_leaderboard_period ON public.od_leaderboard(period_year, period_month);
CREATE INDEX idx_od_org_structure_parent ON public.od_org_structure(parent_id);

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_od_initiatives_updated_at
    BEFORE UPDATE ON public.od_initiatives
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_od_initiative_steps_updated_at
    BEFORE UPDATE ON public.od_initiative_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_od_happiness_measurements_updated_at
    BEFORE UPDATE ON public.od_happiness_measurements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_od_leaderboard_updated_at
    BEFORE UPDATE ON public.od_leaderboard
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.od_leaderboard (department, score, improvement_percentage, badge, employee_count, period_month, period_year) VALUES
('الموارد البشرية', 4.8, 6.7, 'مبدع التغيير', 25, 3, 2024),
('تكنولوجيا المعلومات', 4.7, 11.9, 'رائد التطوير', 45, 3, 2024),
('المبيعات', 4.3, 4.9, 'محفز النمو', 60, 3, 2024),
('المالية', 4.5, -2.2, 'مستقر', 30, 3, 2024),
('العمليات', 4.1, -4.9, 'يحتاج تطوير', 80, 3, 2024);