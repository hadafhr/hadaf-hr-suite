import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type HREmployee = Database['public']['Tables']['hr_employees']['Row'];
type HREmployeeInsert = Database['public']['Tables']['hr_employees']['Insert'];
type HREmployeeUpdate = Database['public']['Tables']['hr_employees']['Update'];

export interface PublicEmployeeData {
  id: string;
  company_id?: string;
  employee_id: string;
  full_name: string;
  email?: string;
  position?: string;
  org_unit_id?: string;
  manager_id?: string;
  hire_date?: string;
  is_active?: boolean;
  created_at?: string;
}

export const useSecureHRData = () => {
  const [publicDirectory, setPublicDirectory] = useState<PublicEmployeeData[]>([]);
  const [sensitiveData, setSensitiveData] = useState<HREmployee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasHRAccess, setHasHRAccess] = useState(false);
  const { toast } = useToast();

  // Fetch public employee directory (basic info only)
  const fetchPublicDirectory = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('public_employee_directory')
        .select('*')
        .order('full_name');

      if (error) {
        console.error('Error fetching public directory:', error);
        toast({
          title: "خطأ في جلب دليل الموظفين",
          description: "حدث خطأ أثناء جلب البيانات الأساسية للموظفين",
          variant: "destructive",
        });
        return;
      }

      setPublicDirectory(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sensitive HR data (requires HR permissions)
  const fetchSensitiveData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('hr_employees')
        .select('*')
        .order('full_name');

      if (error) {
        console.error('Error fetching HR data:', error);
        // Don't show error toast for permission issues
        if (error.code !== 'PGRST116') {
          toast({
            title: "خطأ في جلب بيانات الموارد البشرية",
            description: "حدث خطأ أثناء جلب البيانات الحساسة للموظفين",
            variant: "destructive",
          });
        }
        return;
      }

      setSensitiveData(data || []);
      setHasHRAccess(true);
    } catch (error) {
      console.error('Error:', error);
      setHasHRAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check user's access level and fetch appropriate data
  const checkAccessAndFetch = async () => {
    // Always try to fetch public directory first
    await fetchPublicDirectory();
    
    // Try to fetch sensitive data (will fail if user lacks permissions)
    await fetchSensitiveData();
  };

  // Add new employee (HR only)
  const addEmployee = async (employeeData: HREmployeeInsert) => {
    if (!hasHRAccess) {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية لإضافة موظفين جدد",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('hr_employees')
        .insert([employeeData]);

      if (error) {
        console.error('Error adding employee:', error);
        toast({
          title: "خطأ في الإضافة",
          description: "حدث خطأ أثناء إضافة الموظف الجديد",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة الموظف الجديد بنجاح",
      });

      // Refresh data
      await checkAccessAndFetch();
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع أثناء الإضافة",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update employee (HR only or own record)
  const updateEmployee = async (employeeId: string, updateData: HREmployeeUpdate) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('hr_employees')
        .update(updateData)
        .eq('id', employeeId);

      if (error) {
        console.error('Error updating employee:', error);
        toast({
          title: "خطأ في التحديث",
          description: "حدث خطأ أثناء تحديث بيانات الموظف",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الموظف بنجاح",
      });

      // Refresh data
      await checkAccessAndFetch();
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع أثناء التحديث",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAccessAndFetch();
  }, []);

  return {
    publicDirectory,
    sensitiveData,
    isLoading,
    hasHRAccess,
    fetchPublicDirectory,
    fetchSensitiveData,
    addEmployee,
    updateEmployee,
    refreshData: checkAccessAndFetch,
  };
};