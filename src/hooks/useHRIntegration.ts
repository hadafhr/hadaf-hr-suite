import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface HREmployee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position_id?: string;
  department_id?: string;
  basic_salary: number;
  employment_status: string;
  hire_date: string;
  profile_picture_url?: string;
  company_id: string;
}

export interface CompanyStats {
  total_employees: number;
  active_employees: number;
  pending_requests: number;
  total_departments: number;
}

export const useHRIntegration = () => {
  const [employees, setEmployees] = useState<HREmployee[]>([]);
  const [companyStats, setCompanyStats] = useState<CompanyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // جلب قائمة الموظفين
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .select(`
          id,
          employee_id,
          first_name,
          last_name,
          email,
          phone,
          position_id,
          department_id,
          basic_salary,
          employment_status,
          hire_date,
          profile_picture_url,
          company_id
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching employees:', error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "تعذر جلب قائمة الموظفين",
          variant: "destructive",
        });
        return;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // جلب إحصائيات الشركة
  const fetchCompanyStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // جلب معرف الشركة
      const { data: companyData } = await supabase
        .from('boud_employees')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (!companyData?.company_id) return;

      // حساب إجمالي الموظفين
      const { count: totalEmployees } = await supabase
        .from('boud_employees')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyData.company_id);

      // حساب الموظفين النشطين
      const { count: activeEmployees } = await supabase
        .from('boud_employees')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyData.company_id)
        .eq('employment_status', 'active');

      // حساب الطلبات المعلقة
      const { count: pendingRequests } = await supabase
        .from('hr_requests')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyData.company_id)
        .eq('status', 'pending');

      // حساب إجمالي الأقسام
      const { count: totalDepartments } = await supabase
        .from('boud_departments')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyData.company_id)
        .eq('is_active', true);

      setCompanyStats({
        total_employees: totalEmployees || 0,
        active_employees: activeEmployees || 0,
        pending_requests: pendingRequests || 0,
        total_departments: totalDepartments || 0
      });

    } catch (error) {
      console.error('Error fetching company stats:', error);
    }
  };

  // إضافة موظف جديد
  const addEmployee = async (employeeData: Partial<HREmployee>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // جلب معرف الشركة
      const { data: companyData } = await supabase
        .from('boud_employees')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (!companyData?.company_id) {
        toast({
          title: "خطأ",
          description: "تعذر تحديد الشركة",
          variant: "destructive",
        });
        return;
      }

      // التأكد من وجود البيانات المطلوبة
      if (!employeeData.employee_id || !employeeData.first_name || !employeeData.last_name) {
        toast({
          title: "خطأ في البيانات",
          description: "يجب إدخال جميع البيانات المطلوبة",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('boud_employees')
        .insert({
          employee_id: employeeData.employee_id,
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          email: employeeData.email,
          phone: employeeData.phone,
          basic_salary: employeeData.basic_salary || 0,
          company_id: companyData.company_id,
          employment_status: 'active' as const
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "خطأ في إضافة الموظف",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setEmployees(prev => [data, ...prev]);
      toast({
        title: "تم إضافة الموظف بنجاح",
        description: `تم إضافة ${data.first_name} ${data.last_name} بنجاح`,
      });

      // إعادة جلب الإحصائيات
      fetchCompanyStats();

      return data;
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الموظف",
        variant: "destructive",
      });
    }
  };

  // تحديث بيانات موظف
  const updateEmployee = async (employeeId: string, employeeData: Partial<HREmployee>) => {
    try {
      const updateData: Record<string, any> = {};
      
      // فقط إضافة الحقول المسموح بتحديثها
      if (employeeData.first_name) updateData.first_name = employeeData.first_name;
      if (employeeData.last_name) updateData.last_name = employeeData.last_name;
      if (employeeData.email) updateData.email = employeeData.email;
      if (employeeData.phone) updateData.phone = employeeData.phone;
      if (employeeData.basic_salary !== undefined) updateData.basic_salary = employeeData.basic_salary;
      if (employeeData.employment_status) {
        const validStatuses = ['active', 'inactive', 'terminated', 'suspended'];
        if (validStatuses.includes(employeeData.employment_status)) {
          updateData.employment_status = employeeData.employment_status;
        }
      }

      const { data, error } = await supabase
        .from('boud_employees')
        .update(updateData)
        .eq('id', employeeId)
        .select()
        .single();

      if (error) {
        toast({
          title: "خطأ في تحديث الموظف",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setEmployees(prev => prev.map(emp => 
        emp.id === employeeId ? { ...emp, ...data } : emp
      ));
      
      toast({
        title: "تم تحديث بيانات الموظف",
        description: "تم حفظ التغييرات بنجاح",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث بيانات الموظف",
        variant: "destructive",
      });
    }
  };

  // تعطيل موظف
  const deactivateEmployee = async (employeeId: string) => {
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .update({ employment_status: 'inactive' })
        .eq('id', employeeId)
        .select()
        .single();

      if (error) {
        toast({
          title: "خطأ في تعطيل الموظف",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setEmployees(prev => prev.map(emp => 
        emp.id === employeeId ? { ...emp, employment_status: 'inactive' } : emp
      ));
      
      toast({
        title: "تم تعطيل الموظف",
        description: "تم تعطيل الموظف بنجاح",
      });

      // إعادة جلب الإحصائيات
      fetchCompanyStats();

      return data;
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تعطيل الموظف",
        variant: "destructive",
      });
    }
  };

  // بحث في قائمة الموظفين
  const searchEmployees = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      fetchEmployees();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .select(`
          id,
          employee_id,
          first_name,
          last_name,
          email,
          phone,
          position_id,
          department_id,
          basic_salary,
          employment_status,
          hire_date,
          profile_picture_url,
          company_id
        `)
        .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,employee_id.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching employees:', error);
        return;
      }

      setEmployees(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchEmployees(),
        fetchCompanyStats()
      ]);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  return {
    employees,
    companyStats,
    isLoading,
    addEmployee,
    updateEmployee,
    deactivateEmployee,
    searchEmployees,
    fetchEmployees,
    fetchCompanyStats
  };
};