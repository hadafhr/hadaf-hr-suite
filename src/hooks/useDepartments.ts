import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Department {
  id: string;
  company_id: string;
  parent_department_id?: string;
  department_code: string;
  name_ar: string;
  name_en?: string;
  description?: string;
  department_type: string;
  function_type: 'strategic' | 'operational' | 'support';
  sector_type: 'governmental' | 'private' | 'nonprofit';
  cost_center_code?: string;
  location?: string;
  is_active: boolean;
  visibility_level: 'public' | 'internal' | 'hr_only';
  manager_id?: string;
  deputy_manager_id?: string;
  head_count: number;
  budget_allocation: number;
  custom_fields: any;
  sort_order: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface DepartmentPosition {
  id: string;
  department_id: string;
  company_id: string;
  position_code: string;
  title_ar: string;
  title_en?: string;
  description?: string;
  level: number;
  reports_to_position_id?: string;
  salary_grade?: string;
  required_qualifications: string[];
  responsibilities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DepartmentEmployee {
  id: string;
  department_id: string;
  employee_id: string;
  position_id?: string;
  assignment_date: string;
  end_date?: string;
  is_primary: boolean;
  assignment_type: 'permanent' | 'temporary' | 'secondment';
  created_at: string;
  updated_at: string;
}

export interface DepartmentKPI {
  id: string;
  department_id: string;
  kpi_name: string;
  kpi_type: 'financial' | 'operational' | 'hr' | 'quality';
  target_value: number;
  current_value: number;
  unit_of_measure?: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<DepartmentPosition[]>([]);
  const [departmentEmployees, setDepartmentEmployees] = useState<DepartmentEmployee[]>([]);
  const [departmentKPIs, setDepartmentKPIs] = useState<DepartmentKPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      // Mock data for now since tables don't exist yet
      const mockDepartments: Department[] = [
        {
          id: '1',
          company_id: 'temp-company-id',
          department_code: 'HR',
          name_ar: 'الموارد البشرية',
          name_en: 'Human Resources',
          description: 'قسم إدارة الموارد البشرية والشؤون الإدارية',
          department_type: 'support',
          function_type: 'support',
          sector_type: 'private',
          cost_center_code: 'CC-HR-001',
          location: 'المبنى الرئيسي - الطابق الثالث',
          is_active: true,
          visibility_level: 'internal',
          head_count: 8,
          budget_allocation: 500000,
          custom_fields: {},
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setDepartments(mockDepartments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch departments');
      console.error('Error fetching departments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch department positions
  const fetchPositions = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_department_positions')
        .select('*')
        .order('level', { ascending: true });

      if (error) throw error;
      setPositions(data || []);
    } catch (err) {
      console.error('Error fetching positions:', err);
    }
  };

  // Fetch department employees
  const fetchDepartmentEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_department_employees')
        .select('*')
        .order('assignment_date', { ascending: false });

      if (error) throw error;
      setDepartmentEmployees(data || []);
    } catch (err) {
      console.error('Error fetching department employees:', err);
    }
  };

  // Fetch department KPIs
  const fetchDepartmentKPIs = async () => {
    try {
      const { data, error } = await supabase
        .from('boud_department_kpis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDepartmentKPIs(data || []);
    } catch (err) {
      console.error('Error fetching department KPIs:', err);
    }
  };

  // Create department
  const createDepartment = async (department: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('boud_departments')
        .insert([department])
        .select()
        .single();

      if (error) throw error;
      
      setDepartments(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create department');
    }
  };

  // Update department
  const updateDepartment = async (id: string, updates: Partial<Department>) => {
    try {
      const { data, error } = await supabase
        .from('boud_departments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setDepartments(prev => prev.map(dept => dept.id === id ? data : dept));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update department');
    }
  };

  // Delete department (soft delete)
  const deleteDepartment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('boud_departments')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      
      setDepartments(prev => prev.map(dept => dept.id === id ? { ...dept, is_active: false } : dept));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete department');
    }
  };

  // Get department hierarchy
  const getDepartmentHierarchy = async (companyId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_department_hierarchy', {
        company_uuid: companyId
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching department hierarchy:', err);
      return [];
    }
  };

  // Create department position
  const createPosition = async (position: Omit<DepartmentPosition, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('boud_department_positions')
        .insert([position])
        .select()
        .single();

      if (error) throw error;
      
      setPositions(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create position');
    }
  };

  // Assign employee to department
  const assignEmployeeToDepartment = async (assignment: Omit<DepartmentEmployee, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('boud_department_employees')
        .insert([assignment])
        .select()
        .single();

      if (error) throw error;
      
      setDepartmentEmployees(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to assign employee');
    }
  };

  // Create department KPI
  const createDepartmentKPI = async (kpi: Omit<DepartmentKPI, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('boud_department_kpis')
        .insert([kpi])
        .select()
        .single();

      if (error) throw error;
      
      setDepartmentKPIs(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create KPI');
    }
  };

  // Get AI insights for departments
  const getAIInsights = async () => {
    // Mock AI insights - in real implementation, this would call an AI service
    return [
      {
        id: '1',
        type: 'optimization',
        title: 'تحسين الهيكل التنظيمي',
        description: 'تم اكتشاف تداخل في مهام قسمي التسويق والمبيعات',
        priority: 'high',
        recommendation: 'دمج الأقسام أو إعادة توزيع المهام',
        impact: 'توفير 15% من التكاليف التشغيلية'
      },
      {
        id: '2',
        type: 'efficiency',
        title: 'نسبة الموظفين إلى المدير',
        description: 'قسم تقنية المعلومات يحتاج إلى مدير إضافي',
        priority: 'medium',
        recommendation: 'تعيين مدير فرعي للقسم',
        impact: 'تحسين الكفاءة بنسبة 20%'
      },
      {
        id: '3',
        type: 'performance',
        title: 'أداء القسم المالي',
        description: 'أداء متميز يستحق التقدير',
        priority: 'low',
        recommendation: 'برنامج حوافز للفريق',
        impact: 'الحفاظ على مستوى الأداء العالي'
      }
    ];
  };

  // Export departments data
  const exportDepartments = async (format: 'excel' | 'pdf') => {
    // Mock export functionality
    const exportData = departments.map(dept => ({
      'رمز القسم': dept.department_code,
      'الاسم بالعربية': dept.name_ar,
      'الاسم بالإنجليزية': dept.name_en || '',
      'نوع الوظيفة': dept.function_type,
      'الموقع': dept.location || '',
      'عدد الموظفين': dept.head_count,
      'الميزانية': dept.budget_allocation
    }));

    console.log(`Exporting departments as ${format}:`, exportData);
    return exportData;
  };

  // Import departments data
  const importDepartments = async (data: any[]) => {
    try {
      const { data: imported, error } = await supabase
        .from('boud_departments')
        .insert(data)
        .select();

      if (error) throw error;
      
      setDepartments(prev => [...prev, ...imported]);
      return imported;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to import departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
    fetchDepartmentEmployees();
    fetchDepartmentKPIs();
  }, []);

  return {
    departments,
    positions,
    departmentEmployees,
    departmentKPIs,
    isLoading,
    error,
    
    // Department management
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentHierarchy,
    
    // Position management
    createPosition,
    
    // Employee assignment
    assignEmployeeToDepartment,
    
    // KPI management
    createDepartmentKPI,
    
    // AI and analytics
    getAIInsights,
    
    // Import/Export
    exportDepartments,
    importDepartments,
    
    // Refresh data
    refetch: fetchDepartments
  };
};