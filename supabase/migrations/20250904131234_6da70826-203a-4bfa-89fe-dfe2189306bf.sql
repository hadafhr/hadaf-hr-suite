-- Create a new function specifically for OD tables with proper security
CREATE OR REPLACE FUNCTION update_od_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Update triggers to use the new secure function
DROP TRIGGER IF EXISTS update_od_initiatives_updated_at ON public.od_initiatives;
DROP TRIGGER IF EXISTS update_od_initiative_steps_updated_at ON public.od_initiative_steps;
DROP TRIGGER IF EXISTS update_od_happiness_measurements_updated_at ON public.od_happiness_measurements;
DROP TRIGGER IF EXISTS update_od_leaderboard_updated_at ON public.od_leaderboard;

CREATE TRIGGER update_od_initiatives_updated_at
    BEFORE UPDATE ON public.od_initiatives
    FOR EACH ROW
    EXECUTE FUNCTION update_od_updated_at_column();

CREATE TRIGGER update_od_initiative_steps_updated_at
    BEFORE UPDATE ON public.od_initiative_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_od_updated_at_column();

CREATE TRIGGER update_od_happiness_measurements_updated_at
    BEFORE UPDATE ON public.od_happiness_measurements
    FOR EACH ROW
    EXECUTE FUNCTION update_od_updated_at_column();

CREATE TRIGGER update_od_leaderboard_updated_at
    BEFORE UPDATE ON public.od_leaderboard
    FOR EACH ROW
    EXECUTE FUNCTION update_od_updated_at_column();