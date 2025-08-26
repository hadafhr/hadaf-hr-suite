import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define interfaces for department-related data
export interface Department {
  id: string;
  company_id: string;
  department_code: string;
  name_ar: string;
  name_en?: string;
  description?: string;
  department_type: string;
  function_type: "strategic" | "operational" | "support";
  sector_type: "governmental" | "private" | "nonprofit";
  parent_department_id?: string | null;
  cost_center_code?: string;
  location?: string;
  budget_allocation?: number;
  head_count?: number;
  sort_order: number;
  visibility_level: "internal" | "public" | "hr_only";
  is_active: boolean;
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
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
  reports_to_position_id?: string | null;
  salary_grade?: string;
  required_qualifications?: string[];
  responsibilities?: string[];
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
  assignment_type: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentKPI {
  id: string;
  department_id: string;
  kpi_name: string;
  kpi_type: string;
  target_value?: number;
  current_value?: number;
  unit_of_measure?: string;
  frequency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const [positions, setPositions] = useState<DepartmentPosition[]>([]);
  const [departmentEmployees, setDepartmentEmployees] = useState<DepartmentEmployee[]>([]);
  const [departmentKPIs, setDepartmentKPIs] = useState<DepartmentKPI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize data on mount
  useEffect(() => {
    fetchDepartments();
    fetchPositions();
    fetchDepartmentEmployees();
    fetchDepartmentKPIs();
  }, []);

  // Fetch departments from database
  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('boud_employees')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // For now, return empty array since departments structure is different
      setDepartments([]);
      setIsLoading(false);
    } catch (err) {
      // Start with empty departments for manual input
      setDepartments([]);
      setIsLoading(false);
    }
  };

  // Start with empty positions for manual input
  const fetchPositions = async () => {
    try {
      // For now, keep positions empty for manual input
      setPositions([]);
    } catch (err) {
      console.error('Error fetching positions:', err);
    }
  };

  // Start with empty department employees for manual input
  const fetchDepartmentEmployees = async () => {
    try {
      // For now, keep department employees empty for manual input
      setDepartmentEmployees([]);
    } catch (err) {
      console.error('Error fetching department employees:', err);
    }
  };

  // Start with empty KPIs for manual input
  const fetchDepartmentKPIs = async () => {
    try {
      // For now, keep KPIs empty for manual input
      setDepartmentKPIs([]);
    } catch (err) {
      console.error('Error fetching department KPIs:', err);
    }
  };

  // Create department with mock implementation
  const createDepartment = async (department: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newDepartment: Department = {
        ...department,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setDepartments(prev => [...prev, newDepartment]);
      return { data: newDepartment, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create department' };
    }
  };

  // Update department with mock implementation
  const updateDepartment = async (id: string, updates: Partial<Department>) => {
    try {
      const updatedDepartment = departments.find(d => d.id === id);
      if (!updatedDepartment) {
        return { data: null, error: 'Department not found' };
      }
      
      const updated = {
        ...updatedDepartment,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      setDepartments(prev => prev.map(dept => dept.id === id ? updated : dept));
      return { data: updated, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to update department' };
    }
  };

  // Delete department (soft delete)
  const deleteDepartment = async (id: string) => {
    try {
      setDepartments(prev => prev.map(dept => dept.id === id ? { ...dept, is_active: false } : dept));
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to delete department' };
    }
  };

  // Get department hierarchy with mock implementation  
  const getDepartmentHierarchy = async (companyId: string) => {
    try {
      const hierarchyData = departments.filter(d => d.company_id === companyId);
      return { data: hierarchyData, error: null };
    } catch (err) {
      return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch hierarchy' };
    }
  };

  // Assign employee to position (mock implementation)
  const assignEmployeeToPosition = async (assignment: Omit<DepartmentEmployee, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newAssignment: DepartmentEmployee = {
        ...assignment,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setDepartmentEmployees(prev => [...prev, newAssignment]);
      return { data: newAssignment, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to assign employee' };
    }
  };

  // Create KPI (mock implementation)
  const createKPI = async (kpi: Omit<DepartmentKPI, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newKPI: DepartmentKPI = {
        ...kpi,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setDepartmentKPIs(prev => [...prev, newKPI]);
      return { data: newKPI, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to create KPI' };
    }
  };

  // Generate export data (mock implementation)
  const getExportData = async (companyId: string) => {
    try {
      const exportData = {
        departments: departments.filter(d => d.company_id === companyId),
        positions: positions,
        employees: departmentEmployees,
        kpis: departmentKPIs
      };
      
      return { data: exportData, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to generate export' };
    }
  };

  // Import departments data (mock implementation)
  const importDepartments = async (importData: any[]) => {
    try {
      const importedDepartments = importData.map(dept => ({
        ...dept,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) as Department[];
      
      setDepartments(prev => [...prev, ...importedDepartments]);
      return { data: importedDepartments, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to import departments' };
    }
  };

  // Get AI insights (mock implementation)
  const getAIInsights = async () => {
    return [
      {
        id: '1',
        type: 'recommendation',
        title: 'توصية بإعادة هيكلة القسم',
        description: 'يُنصح بدمج قسم التسويق مع قسم المبيعات لتحسين الكفاءة',
        priority: 'high',
        impact: 'medium'
      }
    ];
  };

  return {
    // State
    departments,
    positions,
    departmentEmployees,
    departmentKPIs,
    isLoading,
    error,

    // Actions
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentHierarchy,
    assignEmployeeToPosition,
    createKPI,
    getExportData,
    importDepartments,
    getAIInsights,
    
    // Utility functions
    fetchDepartments,
    fetchPositions,
    fetchDepartmentEmployees,
    fetchDepartmentKPIs
  };
};