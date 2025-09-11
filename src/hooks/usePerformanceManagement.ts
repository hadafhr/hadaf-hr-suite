import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PerformanceGoal {
  id: string;
  employee_id: string;
  company_id: string;
  title: string;
  description?: string;
  target_value?: number;
  current_value: number;
  unit: string;
  priority: string;
  status: string;
  start_date: string;
  target_date: string;
  completion_date?: string;
  weight: number;
  category: string;
  created_by?: string;
  assigned_by?: string;
  reviewed_by?: string;
  review_date?: string;
  review_comments?: string;
  created_at: string;
  updated_at: string;
}

export interface PerformanceReview {
  id: string;
  employee_id: string;
  company_id: string;
  reviewer_id: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating?: number;
  goal_achievement_score: number;
  competency_scores: any;
  strengths?: string;
  areas_for_improvement?: string;
  development_recommendations?: string;
  manager_comments?: string;
  employee_comments?: string;
  hr_comments?: string;
  status: string;
  submitted_date?: string;
  approved_date?: string;
  approved_by?: string;
  next_review_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PerformanceKPI {
  id: string;  
  company_id: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  target_value?: number;
  calculation_method?: string;
  frequency: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeKPIMeasurement {
  id: string;
  employee_id: string;
  kpi_id: string;
  measurement_date: string;
  actual_value: number;
  target_value?: number;
  variance?: number;
  variance_percentage?: number;
  notes?: string;
  recorded_by?: string;
  created_at: string;
}

export interface DevelopmentPlan {
  id: string;
  employee_id: string;
  evaluation_id?: string;
  title?: string;
  description?: string;
  weak_indicators?: string[];
  skills_to_develop?: string[];
  development_activities: any;
  training_recommendations: any;
  timeline_months: number;
  progress_percentage?: number;
  start_date?: string;
  target_completion_date?: string;
  budget_allocated?: number;
  status: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface PerformanceCompetency {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  category: string;
  proficiency_levels: any;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const usePerformanceManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<PerformanceGoal[]>([]);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [kpis, setKpis] = useState<PerformanceKPI[]>([]);
  const [measurements, setMeasurements] = useState<EmployeeKPIMeasurement[]>([]);
  const [developmentPlans, setDevelopmentPlans] = useState<DevelopmentPlan[]>([]);
  const [competencies, setCompetencies] = useState<PerformanceCompetency[]>([]);

  // Fetch all performance data
  const fetchPerformanceData = async () => {
    try {
      setIsLoading(true);
      
      const [goalsRes, reviewsRes, kpisRes, measurementsRes, plansRes, competenciesRes] = await Promise.all([
        supabase.from('performance_goals').select('*').order('created_at', { ascending: false }),
        supabase.from('performance_reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('performance_kpis').select('*').order('created_at', { ascending: false }),
        supabase.from('employee_kpi_measurements').select('*').order('measurement_date', { ascending: false }),
        supabase.from('development_plans').select('*').order('created_at', { ascending: false }),
        supabase.from('performance_competencies').select('*').order('created_at', { ascending: false })
      ]);

      if (goalsRes.error) throw goalsRes.error;
      if (reviewsRes.error) throw reviewsRes.error;
      if (kpisRes.error) throw kpisRes.error;
      if (measurementsRes.error) throw measurementsRes.error;
      if (plansRes.error) throw plansRes.error;
      if (competenciesRes.error) throw competenciesRes.error;

      setGoals((goalsRes.data as PerformanceGoal[]) || []);
      setReviews((reviewsRes.data as PerformanceReview[]) || []);
      setKpis((kpisRes.data as PerformanceKPI[]) || []);
      setMeasurements((measurementsRes.data as EmployeeKPIMeasurement[]) || []);
      setDevelopmentPlans((plansRes.data as DevelopmentPlan[]) || []);
      setCompetencies((competenciesRes.data as PerformanceCompetency[]) || []);

    } catch (error) {
      console.error('Error fetching performance data:', error);
      toast.error('حدث خطأ في تحميل بيانات الأداء');
    } finally {
      setIsLoading(false);
    }
  };

  // Create new goal
  const createGoal = async (goalData: any) => {
    try {
      const { data, error } = await supabase
        .from('performance_goals')
        .insert([goalData])
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => [data as PerformanceGoal, ...prev]);
      toast.success('تم إنشاء الهدف بنجاح');
      return data;
    } catch (error) {
      console.error('Error creating goal:', error);
      toast.error('حدث خطأ في إنشاء الهدف');
      throw error;
    }
  };

  // Update goal
  const updateGoal = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('performance_goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => prev.map(goal => goal.id === id ? data as PerformanceGoal : goal));
      toast.success('تم تحديث الهدف بنجاح');
      return data;
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('حدث خطأ في تحديث الهدف');
      throw error;
    }
  };

  // Create new review
  const createReview = async (reviewData: any) => {
    try {
      const { data, error } = await supabase
        .from('performance_reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => [data as PerformanceReview, ...prev]);
      toast.success('تم إنشاء التقييم بنجاح');
      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error('حدث خطأ في إنشاء التقييم');
      throw error;
    }
  };

  // Update review
  const updateReview = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('performance_reviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => prev.map(review => review.id === id ? data as PerformanceReview : review));
      toast.success('تم تحديث التقييم بنجاح');
      return data;
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('حدث خطأ في تحديث التقييم');
      throw error;
    }
  };

  // Create new KPI
  const createKPI = async (kpiData: any) => {
    try {
      const { data, error } = await supabase
        .from('performance_kpis')
        .insert([kpiData])
        .select()
        .single();

      if (error) throw error;

      setKpis(prev => [data as PerformanceKPI, ...prev]);
      toast.success('تم إنشاء مؤشر الأداء بنجاح');
      return data;
    } catch (error) {
      console.error('Error creating KPI:', error);
      toast.error('حدث خطأ في إنشاء مؤشر الأداء');
      throw error;
    }
  };

  // Record KPI measurement
  const recordKPIMeasurement = async (measurementData: any) => {
    try {
      const { data, error } = await supabase
        .from('employee_kpi_measurements')
        .insert([measurementData])
        .select()
        .single();

      if (error) throw error;

      setMeasurements(prev => [data as EmployeeKPIMeasurement, ...prev]);
      toast.success('تم تسجيل قياس مؤشر الأداء بنجاح');
      return data;
    } catch (error) {
      console.error('Error recording KPI measurement:', error);
      toast.error('حدث خطأ في تسجيل قياس مؤشر الأداء');
      throw error;
    }
  };

  // Create development plan
  const createDevelopmentPlan = async (planData: any) => {
    try {
      const { data, error } = await supabase
        .from('development_plans')
        .insert([planData])
        .select()
        .single();

      if (error) throw error;

      setDevelopmentPlans(prev => [data as DevelopmentPlan, ...prev]);
      toast.success('تم إنشاء خطة التطوير بنجاح');
      return data;
    } catch (error) {
      console.error('Error creating development plan:', error);
      toast.error('حدث خطأ في إنشاء خطة التطوير');
      throw error;
    }
  };

  // Update development plan
  const updateDevelopmentPlan = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('development_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setDevelopmentPlans(prev => prev.map(plan => plan.id === id ? data as DevelopmentPlan : plan));
      toast.success('تم تحديث خطة التطوير بنجاح');
      return data;
    } catch (error) {
      console.error('Error updating development plan:', error);
      toast.error('حدث خطأ في تحديث خطة التطوير');
      throw error;
    }
  };

  // Calculate performance statistics
  const getPerformanceStats = () => {
    const activeGoals = goals.filter(g => g.status === 'active').length;
    const completedGoals = goals.filter(g => g.status === 'completed').length;
    const averageGoalProgress = goals.length > 0 ? 
      goals.reduce((sum, g) => sum + g.current_value, 0) / goals.length : 0;
    
    const completedReviews = reviews.filter(r => r.status === 'completed').length;
    const averageRating = reviews.length > 0 ? 
      reviews.filter(r => r.overall_rating).reduce((sum, r) => sum + (r.overall_rating || 0), 0) / 
      reviews.filter(r => r.overall_rating).length : 0;
    
    const activePlans = developmentPlans.filter(p => p.status === 'active').length;
    const completedPlans = developmentPlans.filter(p => p.status === 'completed').length;

    return {
      activeGoals,
      completedGoals,
      averageGoalProgress: Math.round(averageGoalProgress),
      completedReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      activePlans,
      completedPlans,
      totalGoals: goals.length,
      totalReviews: reviews.length,
      totalPlans: developmentPlans.length
    };
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  return {
    isLoading,
    goals,
    reviews,
    kpis,
    measurements,
    developmentPlans,
    competencies,
    createGoal,
    updateGoal,
    createReview,
    updateReview,
    createKPI,
    recordKPIMeasurement,
    createDevelopmentPlan,
    updateDevelopmentPlan,
    getPerformanceStats,
    refetch: fetchPerformanceData
  };
};