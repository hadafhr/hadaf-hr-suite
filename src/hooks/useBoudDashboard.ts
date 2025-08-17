import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalEmployees: number;
  totalCompanies: number;
  totalPayroll: number;
  attendanceRate: number;
  monthlyGrowth: number;
}

interface DashboardData {
  stats: DashboardStats;
  employeeTrends: any[];
  departmentDistribution: any[];
  attendanceData: any[];
  performanceMetrics: any[];
}

export const useBoudDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch employee statistics
      const { data: employeesData, error: employeesError } = await supabase
        .from('boud_employees')
        .select('*')
        .eq('is_active', true);

      if (employeesError) throw employeesError;

      // Fetch company statistics
      const { data: companiesData, error: companiesError } = await supabase
        .from('boud_companies')
        .select('*')
        .eq('is_active', true);

      if (companiesError) throw companiesError;

      // Fetch payroll statistics
      const { data: payrollData, error: payrollError } = await supabase
        .from('boud_payroll_runs')
        .select('*')
        .eq('status', 'paid')
        .gte('created_at', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());

      if (payrollError) throw payrollError;

      // Mock attendance data since we don't have attendance table yet
      const attendanceData: any[] = [];

      // Calculate statistics
      const totalEmployees = employeesData?.length || 0;
      const totalCompanies = companiesData?.length || 0;
      // Use mock payroll data since we don't have the exact schema
      const totalPayroll = payrollData?.length ? payrollData.length * 25000 : 0; // Mock calculation
      
      // Mock attendance rate since we don't have attendance data yet
      const attendanceRate = 98; // Mock data

      // Mock data for trends (في التطبيق الحقيقي سيتم حسابها من البيانات الفعلية)
      const employeeTrends = [
        { month: 'يناير', count: totalEmployees - 20 },
        { month: 'فبراير', count: totalEmployees - 15 },
        { month: 'مارس', count: totalEmployees - 10 },
        { month: 'أبريل', count: totalEmployees - 8 },
        { month: 'مايو', count: totalEmployees - 5 },
        { month: 'يونيو', count: totalEmployees }
      ];

      // Calculate department distribution
      const departmentCounts: { [key: string]: number } = {};
      employeesData?.forEach(employee => {
        // نحتاج للحصول على معلومات القسم من جدول الأقسام
        // هنا نستخدم بيانات وهمية
        const dept = 'قسم عام'; // employee.department_name || 'قسم عام';
        departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
      });

      const departmentDistribution = Object.entries(departmentCounts).map(([name, count]) => ({
        name,
        value: count,
        percentage: totalEmployees > 0 ? (count / totalEmployees) * 100 : 0
      }));

      // Mock performance metrics
      const performanceMetrics = [
        { category: 'ممتاز', count: Math.floor(totalEmployees * 0.3), percentage: 30 },
        { category: 'جيد جداً', count: Math.floor(totalEmployees * 0.4), percentage: 40 },
        { category: 'جيد', count: Math.floor(totalEmployees * 0.2), percentage: 20 },
        { category: 'مقبول', count: Math.floor(totalEmployees * 0.1), percentage: 10 }
      ];

      const dashboardData: DashboardData = {
        stats: {
          totalEmployees,
          totalCompanies,
          totalPayroll,
          attendanceRate,
          monthlyGrowth: 3.7 // نسبة نمو وهمية
        },
        employeeTrends,
        departmentDistribution,
        attendanceData: attendanceData || [],
        performanceMetrics
      };

      setData(dashboardData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refresh = () => {
    fetchDashboardData();
  };

  return {
    data,
    loading,
    error,
    refresh
  };
};