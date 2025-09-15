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

export interface BudgetKPI {
  total_allocated: number;
  total_spent: number;
  compliance_rate: number;
  exceeded_categories: number;
  variance_percent: number;
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