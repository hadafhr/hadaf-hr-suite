import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type BoudEmployee = Database['public']['Tables']['boud_employees']['Row'];
type BoudEmployeeInsert = Database['public']['Tables']['boud_employees']['Insert'];
type BoudEmployeeUpdate = Database['public']['Tables']['boud_employees']['Update'];

export interface EmployeeDirectoryData {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  position_id?: string;
  department_id?: string;
  hire_date?: string;
  is_active?: boolean;
  company_id?: string;
}

export interface SecureEmployeeViewData {
  id: string;
  user_id?: string;
  company_id?: string;
  department_id?: string;
  position_id?: string;
  manager_id?: string;
  employee_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  full_name_arabic?: string;
  national_id?: string;
  passport_number?: string;
  nationality?: string;
  gender?: string;
  date_of_birth?: string;
  marital_status?: string;
  email?: string;
  phone?: string;
  address?: string;
  hire_date?: string;
  contract_start_date?: string;
  contract_end_date?: string;
  contract_type?: string;
  employment_status?: string;
  work_location?: string;
  basic_salary?: number;
  housing_allowance?: number;
  transport_allowance?: number;
  other_allowances?: number;
  total_salary?: number;
  bank_name?: string;
  bank_account_number?: string;
  iban?: string;
  education_level?: string;
  university?: string;
  major?: string;
  graduation_year?: number;
  experience_years?: number;
  annual_leave_balance?: number;
  sick_leave_balance?: number;
  emergency_leave_balance?: number;
  emergency_contact?: any;
  documents?: any;
  profile_picture_url?: string;
  notes?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useSecureEmployeeData = () => {
  const [employees, setEmployees] = useState<EmployeeDirectoryData[]>([]);
  const [fullEmployeeData, setFullEmployeeData] = useState<SecureEmployeeViewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch secure employee data with basic directory information
  const fetchSecureEmployeeData = async () => {
    setIsLoading(true);
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
          hire_date,
          is_active,
          company_id
        `)
        .eq('is_active', true)
        .order('first_name');

      if (error) {
        console.error('Error fetching employee directory:', error);
        toast({
          title: "خطأ في جلب دليل الموظفين",
          description: "حدث خطأ أثناء جلب البيانات الأساسية للموظفين",
          variant: "destructive",
        });
        return;
      }

      const mappedData: EmployeeDirectoryData[] = (data || []).map(emp => ({
        id: emp.id,
        employee_id: emp.employee_id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        phone: emp.phone,
        position_id: emp.position_id,
        department_id: emp.department_id,
        hire_date: emp.hire_date,
        is_active: emp.is_active,
        company_id: emp.company_id
      }));

      setEmployees(mappedData);
    } catch (error) {
      console.error('Error fetching employee directory:', error);
      toast({
        title: "خطأ في جلب دليل الموظفين",
        description: "حدث خطأ أثناء جلب البيانات الأساسية للموظفين",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch full employee data (for HR staff only)
  const fetchFullEmployeeData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .select('*')
        .eq('is_active', true)
        .order('first_name');

      if (error) {
        console.error('Error fetching full employee data:', error);
        return;
      }

      setFullEmployeeData(data || []);
    } catch (error) {
      console.error('Error fetching full employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDecryptedSensitiveData = async (employeeId: string) => {
    try {
      // Call the secure decryption functions
      const [nationalIdResult, passportResult, bankAccountResult, ibanResult] = await Promise.all([
        supabase.rpc('get_decrypted_national_id', { employee_id: employeeId }),
        supabase.rpc('get_decrypted_passport_number', { employee_id: employeeId }),
        supabase.rpc('get_decrypted_bank_account', { employee_id: employeeId }),
        supabase.rpc('get_decrypted_iban', { employee_id: employeeId }),
      ]);

      if (nationalIdResult.error) console.error('Error decrypting national_id:', nationalIdResult.error);
      if (passportResult.error) console.error('Error decrypting passport:', passportResult.error);
      if (bankAccountResult.error) console.error('Error decrypting bank account:', bankAccountResult.error);
      if (ibanResult.error) console.error('Error decrypting IBAN:', ibanResult.error);

      return {
        national_id: nationalIdResult.data,
        passport_number: passportResult.data,
        bank_account_number: bankAccountResult.data,
        iban: ibanResult.data,
      };
    } catch (error) {
      console.error('Error fetching decrypted data:', error);
      toast({
        title: "خطأ في فك التشفير",
        description: "لا يمكن عرض البيانات الحساسة. قد لا تملك صلاحية الوصول.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateEmployee = async (employeeId: string, updateData: Partial<BoudEmployeeUpdate>) => {
    setIsLoading(true);
    try {
      // Update employee data (sensitive fields will be auto-encrypted via trigger)
      const { error } = await supabase
        .from('boud_employees')
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
        description: "تم تحديث بيانات الموظف وتشفير البيانات الحساسة تلقائياً",
      });

      // Refresh data
      await fetchSecureEmployeeData();
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

  const addEmployee = async (employeeData: BoudEmployeeInsert) => {
    setIsLoading(true);
    try {
      // Add new employee (sensitive fields will be auto-encrypted via trigger)
      const { error } = await supabase
        .from('boud_employees')
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
        description: "تم إضافة الموظف الجديد وتشفير البيانات الحساسة تلقائياً",
      });

      // Refresh data
      await fetchSecureEmployeeData();
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

  useEffect(() => {
    fetchSecureEmployeeData();
  }, []);

  return {
    employees,
    fullEmployeeData,
    isLoading,
    fetchSecureEmployeeData,
    fetchFullEmployeeData,
    getDecryptedSensitiveData,
    updateEmployee,
    addEmployee,
  };
};