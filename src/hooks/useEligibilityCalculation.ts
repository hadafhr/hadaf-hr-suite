import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EligibilityResult {
  employee_id: string;
  employee_name: string;
  is_eligible: boolean;
  eligibility_score: number;
  calculated_amount: number;
  met_criteria: any;
  failed_criteria: any;
  program_name: string;
}

export const useEligibilityCalculation = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [eligibilityResults, setEligibilityResults] = useState<EligibilityResult[]>([]);
  const { toast } = useToast();

  const calculateEmployeeEligibility = async (employeeId: string, programId: string) => {
    try {
      const { data, error } = await supabase.rpc('calculate_reward_eligibility', {
        p_employee_id: employeeId,
        p_program_id: programId
      });

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error calculating eligibility:', error);
      throw error;
    }
  };

  const calculateAllEligibility = async () => {
    setIsCalculating(true);
    
    try {
      // Get all active employees
      const { data: employees, error: empError } = await supabase
        .from('boud_employees')
        .select(`
          id,
          first_name,
          last_name,
          employment_status,
          company_id
        `)
        .eq('is_active', true)
        .eq('employment_status', 'active');

      if (empError) throw empError;

      if (!employees || employees.length === 0) {
        toast({
          title: "تنبيه",
          description: "لا توجد موظفين نشطين لحساب أهليتهم",
          variant: "destructive"
        });
        return;
      }

      // Get all active reward programs
      const { data: programs, error: progError } = await supabase
        .from('incentive_programs')
        .select('id, program_name, is_active')
        .eq('is_active', true);

      if (progError) throw progError;

      if (!programs || programs.length === 0) {
        toast({
          title: "تنبيه",
          description: "لا توجد برامج مكافآت نشطة",
          variant: "destructive"
        });
        return;
      }

      const results: EligibilityResult[] = [];
      let calculatedCount = 0;
      let eligibleCount = 0;

      // Calculate eligibility for each employee and program combination
      for (const employee of employees) {
        for (const program of programs) {
          try {
            const eligibilityData = await calculateEmployeeEligibility(employee.id, program.id);
            
            if (eligibilityData) {
              const result: EligibilityResult = {
                employee_id: employee.id,
                employee_name: `${employee.first_name} ${employee.last_name}`,
                program_name: program.program_name,
                is_eligible: eligibilityData.is_eligible,
                eligibility_score: eligibilityData.eligibility_score,
                calculated_amount: eligibilityData.calculated_amount,
                met_criteria: eligibilityData.met_criteria,
                failed_criteria: eligibilityData.failed_criteria
              };
              
              results.push(result);
              calculatedCount++;
              
              if (result.is_eligible) {
                eligibleCount++;
              }
            }
          } catch (error) {
            console.error(`Error calculating eligibility for employee ${employee.id} and program ${program.id}:`, error);
          }
        }
      }

      setEligibilityResults(results);

      toast({
        title: "تم حساب الأهلية بنجاح",
        description: `تم حساب أهلية ${calculatedCount} حالة، منها ${eligibleCount} مؤهلة للحصول على مكافآت`,
      });

      return {
        total: calculatedCount,
        eligible: eligibleCount,
        results: results
      };

    } catch (error) {
      console.error('Error in calculateAllEligibility:', error);
      toast({
        title: "خطأ في حساب الأهلية",
        description: "حدث خطأ أثناء حساب أهلية الموظفين للمكافآت",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateAttendanceEligibility = async () => {
    setIsCalculating(true);
    
    try {
      // Get all active employees with their attendance data
      const { data: employees, error: empError } = await supabase
        .from('boud_employees')
        .select(`
          id,
          first_name,
          last_name,
          company_id
        `)
        .eq('is_active', true)
        .eq('employment_status', 'active');

      if (empError) throw empError;

      if (!employees || employees.length === 0) {
        toast({
          title: "تنبيه",
          description: "لا توجد موظفين نشطين",
          variant: "destructive"
        });
        return;
      }

      const results = [];
      let violationsCreated = 0;

      // Check attendance violations for each employee
      for (const employee of employees) {
        try {
          const { data: violationData, error: violationError } = await supabase.rpc(
            'check_and_create_attendance_violations',
            {
              p_employee_id: employee.id,
              p_company_id: employee.company_id
            }
          );

          if (violationError) {
            console.error(`Error checking violations for employee ${employee.id}:`, violationError);
            continue;
          }

          if (violationData && violationData.length > 0) {
            violationsCreated += violationData.length;
            results.push({
              employee_id: employee.id,
              employee_name: `${employee.first_name} ${employee.last_name}`,
              violations: violationData
            });
          }
        } catch (error) {
          console.error(`Error processing employee ${employee.id}:`, error);
        }
      }

      toast({
        title: "تم فحص أهلية الحضور",
        description: `تم إنشاء ${violationsCreated} إجراء تأديبي للمخالفات المكتشفة`,
      });

      return {
        processedEmployees: employees.length,
        violationsFound: violationsCreated,
        results: results
      };

    } catch (error) {
      console.error('Error in calculateAttendanceEligibility:', error);
      toast({
        title: "خطأ في فحص الحضور",
        description: "حدث خطأ أثناء فحص مخالفات الحضور",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsCalculating(false);
    }
  };

  const calculatePerformanceEligibility = async () => {
    setIsCalculating(true);
    
    try {
      // Get all performance evaluations
      const { data: evaluations, error: evalError } = await supabase
        .from('boud_performance_evaluations')
        .select(`
          employee_id,
          overall_rating,
          status
        `)
        .eq('status', 'approved')
        .gte('evaluation_period_end', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

      if (evalError) throw evalError;

      if (!evaluations || evaluations.length === 0) {
        toast({
          title: "تنبيه",
          description: "لا توجد تقييمات أداء معتمدة",
          variant: "destructive"
        });
        return;
      }

      // Get employee details separately
      const employeeIds = evaluations.map(e => e.employee_id);
      const { data: employees, error: empError } = await supabase
        .from('boud_employees')
        .select('id, first_name, last_name')
        .in('id', employeeIds);

      if (empError) throw empError;

      const employeeMap = new Map(employees?.map(emp => [emp.id, emp]) || []);

      const results = evaluations.map(evaluation => {
        const employee = employeeMap.get(evaluation.employee_id);
        const isEligible = evaluation.overall_rating >= 3.5; // Minimum rating for eligibility
        
        return {
          employee_id: evaluation.employee_id,
          employee_name: employee ? `${employee.first_name} ${employee.last_name}` : 'غير محدد',
          performance_rating: evaluation.overall_rating,
          is_eligible: isEligible,
          eligibility_reason: isEligible 
            ? 'تقييم أداء ممتاز يؤهل للحصول على مكافآت'
            : 'تقييم الأداء أقل من الحد المطلوب (3.5)',
        };
      });

      const eligibleCount = results.filter(r => r.is_eligible).length;

      toast({
        title: "تم حساب أهلية الأداء",
        description: `${eligibleCount} من أصل ${results.length} موظف مؤهل بناءً على تقييم الأداء`,
      });

      return {
        total: results.length,
        eligible: eligibleCount,
        results: results
      };

    } catch (error) {
      console.error('Error in calculatePerformanceEligibility:', error);
      toast({
        title: "خطأ في حساب أهلية الأداء",
        description: "حدث خطأ أثناء حساب الأهلية بناءً على الأداء",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    isCalculating,
    eligibilityResults,
    calculateAllEligibility,
    calculateAttendanceEligibility,
    calculatePerformanceEligibility,
    calculateEmployeeEligibility
  };
};