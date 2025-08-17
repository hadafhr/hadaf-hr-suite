import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BoudEmployee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company_id?: string;
  department_id?: string;
  position_id?: string;
  employment_status?: 'active' | 'inactive' | 'terminated' | 'suspended';
  hire_date?: string;
  basic_salary?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BoudCompany {
  id: string;
  company_name: string;
  company_code: string;
  company_name_english?: string;
  commercial_register?: string;
  tax_number?: string;
  vat_number?: string;
  contact_email?: string;
  contact_phone?: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PayrollRun {
  id: string;
  company_id: string;
  payroll_period: string;
  payroll_month: number;
  payroll_year: number;
  payroll_period_start: string;
  payroll_period_end: string;
  total_gross: number;
  total_deductions: number;
  total_net: number;
  status: string;
  approved_by?: string;
  approved_date?: string;
  payment_date?: string;
  bank_file_generated?: boolean;
  wps_file_generated?: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BoudDashboardStats {
  totalEmployees: number;
  activeCompanies: number;
  todayAttendance: number;
  employeeGrowth: number;
  recentActivities: {
    id: string;
    description: string;
    type: string;
    time: string;
  }[];
}

export const useBoudEMS = () => {
  const [employees, setEmployees] = useState<BoudEmployee[]>([]);
  const [companies, setCompanies] = useState<BoudCompany[]>([]);
  const [stats, setStats] = useState<BoudDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const employeesQuery = await supabase.from('boud_employees').select('*', { count: 'exact', head: true });
      const companiesQuery = await supabase.from('boud_companies').select('*', { count: 'exact', head: true });

      const totalEmployees = employeesQuery.count || 0;
      const activeCompanies = companiesQuery.count || 0;
      const todayAttendance = 0; // Placeholder for now

      // Calculate employee growth (mock calculation)
      const employeeGrowth = Math.round(Math.random() * 15 + 5);

      setStats({
        totalEmployees,
        activeCompanies,
        todayAttendance,
        employeeGrowth,
        recentActivities: [
          {
            id: '1',
            description: 'تم إضافة موظف جديد',
            type: 'إضافة',
            time: 'منذ 5 دقائق'
          },
          {
            id: '2',
            description: 'تم تحديث بيانات الراتب',
            type: 'تحديث',
            time: 'منذ 15 دقيقة'
          },
          {
            id: '3',
            description: 'تم إنشاء تقرير حضور',
            type: 'تقرير',
            time: 'منذ 30 دقيقة'
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل الإحصائيات',
        variant: 'destructive'
      });
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل بيانات الموظفين',
        variant: 'destructive'
      });
    }
  };

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحميل بيانات الشركات',
        variant: 'destructive'
      });
    }
  };

  // Add employee
  const addEmployee = async (employeeData: Omit<Partial<BoudEmployee>, 'id'> & { employee_id: string; first_name: string; last_name: string }) => {
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .insert(employeeData)
        .select()
        .single();

      if (error) throw error;

      setEmployees(prev => [data, ...prev]);
      toast({
        title: 'نجح',
        description: 'تم إضافة الموظف بنجاح'
      });

      return data;
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في إضافة الموظف',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Update employee
  const updateEmployee = async (id: string, employeeData: Partial<BoudEmployee>) => {
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .update(employeeData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setEmployees(prev => prev.map(emp => emp.id === id ? data : emp));
      toast({
        title: 'نجح',
        description: 'تم تحديث بيانات الموظف بنجاح'
      });

      return data;
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحديث بيانات الموظف',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Delete employee
  const deleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('boud_employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast({
        title: 'نجح',
        description: 'تم حذف الموظف بنجاح'
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في حذف الموظف',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Add company
  const addCompany = async (companyData: Omit<Partial<BoudCompany>, 'id'> & { company_name: string; company_code: string }) => {
    try {
      const { data, error } = await supabase
        .from('boud_companies')
        .insert(companyData)
        .select()
        .single();

      if (error) throw error;

      setCompanies(prev => [data, ...prev]);
      toast({
        title: 'نجح',
        description: 'تم إضافة الشركة بنجاح'
      });

      return data;
    } catch (error) {
      console.error('Error adding company:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في إضافة الشركة',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Update company
  const updateCompany = async (id: string, companyData: Partial<BoudCompany>) => {
    try {
      const { data, error } = await supabase
        .from('boud_companies')
        .update(companyData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCompanies(prev => prev.map(comp => comp.id === id ? data : comp));
      toast({
        title: 'نجح',
        description: 'تم تحديث بيانات الشركة بنجاح'
      });

      return data;
    } catch (error) {
      console.error('Error updating company:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ في تحديث بيانات الشركة',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchStats(),
        fetchEmployees(),
        fetchCompanies()
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    employees,
    companies,
    stats,
    isLoading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addCompany,
    updateCompany,
    fetchEmployees,
    fetchCompanies,
    fetchStats
  };
};