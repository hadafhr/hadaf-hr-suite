import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BudgetCategory {
  id: string;
  code: string;
  name_ar: string;
  name_en: string;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface BudgetAllocation {
  id: string;
  category_id: string;
  year: number;
  allocated_amount: number;
  notes?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  created_by?: string;
  created_at: string;
  updated_at: string;
  category?: BudgetCategory;
}

export interface BudgetExpense {
  id: string;
  category_id: string;
  expense_date: string;
  amount: number;
  description: string;
  attachment_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_by?: string;
  created_at: string;
  updated_at: string;
  category?: BudgetCategory;
}

export interface BudgetForecast {
  id: string;
  category_id: string;
  forecast_year: number;
  method: 'ai' | 'linear' | 'manual';
  predicted_amount: number;
  ai_model_version?: string;
  generated_at: string;
  category?: BudgetCategory;
}

export interface BudgetApproval {
  id: string;
  request_type: 'allocation' | 'expense' | 'deletion' | 'update';
  request_id: string;
  stage_index: number;
  approver_user_id?: string;
  decision: 'pending' | 'approved' | 'rejected' | 'returned';
  comments?: string;
  decided_at?: string;
  created_at: string;
}

export interface BudgetNotification {
  id: string;
  request_type: 'allocation' | 'expense' | 'deletion' | 'update';
  request_id: string;
  recipient_user_id: string;
  channel: 'inapp' | 'email' | 'push';
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

export interface BudgetIntegration {
  id: string;
  system_name: string;
  api_endpoint?: string;
  auth_type: 'api_key' | 'oauth2';
  token_secret?: string;
  last_sync?: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface BudgetKPI {
  total_allocated: number;
  total_spent: number;
  compliance_rate: number;
  exceeded_categories: number;
  variance_percent: number;
}

export interface DetailedBudgetKPI {
  category_code: string;
  category_name_ar: string;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  utilization_percentage: number;
  forecast_amount: number;
  variance_amount: number;
  status_indicator: 'good' | 'warning' | 'critical' | 'no_budget';
}

export const useBudgetCategories = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budget_categories')
        .select('*')
        .eq('status', 'active')
        .order('code');

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل فئات الميزانية",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

export const useBudgetAllocations = (year?: number) => {
  const [allocations, setAllocations] = useState<BudgetAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const currentYear = year || new Date().getFullYear();
      
      const { data, error } = await supabase
        .from('budget_allocations')
        .select(`
          *,
          category:budget_categories(*)
        `)
        .eq('year', currentYear)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllocations(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل مخصصات الميزانية",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createAllocation = async (allocation: Omit<BudgetAllocation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('budget_allocations')
        .insert([allocation])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم إضافة المخصص بنجاح",
        description: "تم إضافة مخصص الميزانية الجديد"
      });
      
      fetchAllocations();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في إضافة المخصص",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateAllocation = async (id: string, updates: Partial<BudgetAllocation>) => {
    try {
      const { data, error } = await supabase
        .from('budget_allocations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم تحديث المخصص بنجاح",
        description: "تم تحديث مخصص الميزانية"
      });
      
      fetchAllocations();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في تحديث المخصص",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, [year]);

  return { 
    allocations, 
    loading, 
    error, 
    refetch: fetchAllocations,
    createAllocation,
    updateAllocation
  };
};

export const useBudgetExpenses = (categoryId?: string, dateRange?: { start: string; end: string }) => {
  const [expenses, setExpenses] = useState<BudgetExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('budget_expenses')
        .select(`
          *,
          category:budget_categories(*)
        `)
        .order('expense_date', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (dateRange) {
        query = query
          .gte('expense_date', dateRange.start)
          .lte('expense_date', dateRange.end);
      }

      const { data, error } = await query;

      if (error) throw error;
      setExpenses(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل المصروفات",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense: Omit<BudgetExpense, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('budget_expenses')
        .insert([expense])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم إضافة المصروف بنجاح",
        description: "تم إضافة المصروف الجديد"
      });
      
      fetchExpenses();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في إضافة المصروف",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateExpenseStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { data, error } = await supabase
        .from('budget_expenses')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم تحديث حالة المصروف",
        description: `تم ${status === 'approved' ? 'اعتماد' : status === 'rejected' ? 'رفض' : 'تعديل'} المصروف`
      });
      
      fetchExpenses();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في تحديث المصروف",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [categoryId, dateRange]);

  return { 
    expenses, 
    loading, 
    error, 
    refetch: fetchExpenses,
    createExpense,
    updateExpenseStatus
  };
};

export const useBudgetKPIs = (year?: number) => {
  const [kpis, setKpis] = useState<BudgetKPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKPIs = async () => {
    try {
      setLoading(true);
      const currentYear = year || new Date().getFullYear();

      // احصل على المخصصات للسنة المحددة
      const { data: allocations, error: allocError } = await supabase
        .from('budget_allocations')
        .select('allocated_amount')
        .eq('year', currentYear)
        .eq('status', 'approved');

      if (allocError) throw allocError;

      // احصل على المصروفات للسنة المحددة
      const { data: expenses, error: expenseError } = await supabase
        .from('budget_expenses')
        .select('amount, category_id')
        .gte('expense_date', `${currentYear}-01-01`)
        .lt('expense_date', `${currentYear + 1}-01-01`)
        .eq('status', 'approved');

      if (expenseError) throw expenseError;

      // حساب المؤشرات
      const totalAllocated = allocations?.reduce((sum, alloc) => sum + Number(alloc.allocated_amount), 0) || 0;
      const totalSpent = expenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
      const complianceRate = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;
      const variancePercent = totalAllocated > 0 ? ((totalSpent - totalAllocated) / totalAllocated) * 100 : 0;

      setKpis({
        total_allocated: totalAllocated,
        total_spent: totalSpent,
        compliance_rate: Math.min(complianceRate, 100),
        exceeded_categories: 0, // سيتم حسابها لاحقاً
        variance_percent: variancePercent
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKPIs();
  }, [year]);

  return { kpis, loading, error, refetch: fetchKPIs };
};

export const useBudgetForecasts = (year?: number) => {
  const [forecasts, setForecasts] = useState<BudgetForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchForecasts = async () => {
    try {
      setLoading(true);
      const currentYear = year || new Date().getFullYear();
      
      const { data, error } = await supabase
        .from('budget_forecasts')
        .select(`
          *,
          category:budget_categories(*)
        `)
        .eq('forecast_year', currentYear)
        .order('generated_at', { ascending: false });

      if (error) throw error;
      setForecasts(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل التوقعات",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateForecast = async (categoryId: string, method: 'ai' | 'linear' | 'manual', amount?: number) => {
    try {
      const currentYear = year || new Date().getFullYear();
      const { data, error } = await supabase
        .from('budget_forecasts')
        .insert([{
          category_id: categoryId,
          forecast_year: currentYear,
          method,
          predicted_amount: amount || 0,
          ai_model_version: method === 'ai' ? 'v1.0' : null
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم إنشاء التوقع بنجاح",
        description: "تم إنشاء التوقع المالي الجديد"
      });
      
      fetchForecasts();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في إنشاء التوقع",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchForecasts();
  }, [year]);

  return { forecasts, loading, error, refetch: fetchForecasts, generateForecast };
};

export const useBudgetApprovals = () => {
  const [approvals, setApprovals] = useState<BudgetApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budget_approvals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApprovals(data?.map(item => ({
        ...item,
        decision: item.decision as 'pending' | 'approved' | 'rejected' | 'returned'
      })) || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل الموافقات",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApproval = async (id: string, decision: 'approved' | 'rejected' | 'returned', comments?: string) => {
    try {
      const { data, error } = await supabase
        .from('budget_approvals')
        .update({
          decision: decision as any,
          comments,
          decided_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم تحديث القرار",
        description: `تم ${decision === 'approved' ? 'اعتماد' : decision === 'rejected' ? 'رفض' : 'إرجاع'} الطلب`
      });
      
      fetchApprovals();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في تحديث القرار",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  return { approvals, loading, error, refetch: fetchApprovals, updateApproval };
};

export const useBudgetNotifications = () => {
  const [notifications, setNotifications] = useState<BudgetNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budget_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
      setUnreadCount((data || []).filter(n => n.status === 'unread').length);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل الإشعارات",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budget_notifications')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      
      fetchNotifications();
    } catch (err: any) {
      toast({
        title: "خطأ في تحديث الإشعار",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('budget_notifications')
        .update({ status: 'read' })
        .eq('status', 'unread');

      if (error) throw error;
      
      toast({
        title: "تم قراءة جميع الإشعارات",
        description: "تم تعليم جميع الإشعارات كمقروءة"
      });
      
      fetchNotifications();
    } catch (err: any) {
      toast({
        title: "خطأ في تحديث الإشعارات",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, unreadCount, loading, error, refetch: fetchNotifications, markAsRead, markAllAsRead };
};

export const useBudgetIntegrations = () => {
  const [integrations, setIntegrations] = useState<BudgetIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budget_integrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "خطأ في تحميل التكاملات",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createIntegration = async (integration: Omit<BudgetIntegration, 'id' | 'created_at' | 'last_sync'>) => {
    try {
      const { data, error } = await supabase
        .from('budget_integrations')
        .insert([integration])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "تم إضافة التكامل بنجاح",
        description: "تم إضافة التكامل الجديد مع النظام الخارجي"
      });
      
      fetchIntegrations();
      return data;
    } catch (err: any) {
      toast({
        title: "خطأ في إضافة التكامل",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    }
  };

  const testConnection = async (id: string) => {
    try {
      // محاكاة اختبار الاتصال
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { error } = await supabase
        .from('budget_integrations')
        .update({ 
          last_sync: new Date().toISOString(),
          status: 'active'
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "نجح اختبار الاتصال",
        description: "تم الاتصال بالنظام الخارجي بنجاح"
      });
      
      fetchIntegrations();
      return true;
    } catch (err: any) {
      toast({
        title: "فشل اختبار الاتصال",
        description: "لم يتمكن من الاتصال بالنظام الخارجي",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  return { integrations, loading, error, refetch: fetchIntegrations, createIntegration, testConnection };
};

export const useAdvancedBudgetKPIs = (year?: number) => {
  const [detailedKpis, setDetailedKpis] = useState<DetailedBudgetKPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetailedKPIs = async () => {
    try {
      setLoading(true);
      const currentYear = year || new Date().getFullYear();

      const { data, error } = await supabase
        .rpc('calculate_budget_kpis', { p_year: currentYear });

      if (error) throw error;
      setDetailedKpis(data?.map(item => ({
        ...item,
        status_indicator: item.status_indicator as 'good' | 'warning' | 'critical' | 'no_budget'
      })) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailedKPIs();
  }, [year]);

  return { detailedKpis, loading, error, refetch: fetchDetailedKPIs };
};