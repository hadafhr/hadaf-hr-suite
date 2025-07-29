// React Hooks لإدارة البيانات وحالة التطبيق
import { useState, useEffect, useCallback } from 'react';
import { DatabaseService, DataEventService } from '@/services/database';
import {
  Company, Employee, User, Attendance, Leave, Request,
  Salary, Evaluation, AiAlert, DashboardMetrics, ExternalApi
} from '@/types/database';

// Hook لإدارة الشركات
export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الشركات');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    refetch: fetchCompanies
  };
};

// Hook لإدارة الموظفين
export const useEmployees = (companyId?: string) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getEmployees(companyId);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الموظفين');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const searchEmployees = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const data = await DatabaseService.searchEmployees(query, companyId);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في البحث');
      console.error('Error searching employees:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const updateEmployee = useCallback(async (id: string, updates: Partial<Employee>) => {
    try {
      const updatedEmployee = await DatabaseService.updateEmployee(id, updates);
      if (updatedEmployee) {
        setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
        DataEventService.emit('employee_updated', updatedEmployee);
      }
    } catch (err) {
      setError('حدث خطأ في تحديث بيانات الموظف');
      console.error('Error updating employee:', err);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    const handleEmployeeUpdate = (updatedEmployee: Employee) => {
      setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    };

    DataEventService.subscribe('employee_updated', handleEmployeeUpdate);
    DataEventService.subscribe('employee_created', fetchEmployees);
    DataEventService.subscribe('employee_deleted', fetchEmployees);

    return () => {
      DataEventService.unsubscribe('employee_updated', handleEmployeeUpdate);
      DataEventService.unsubscribe('employee_created', fetchEmployees);
      DataEventService.unsubscribe('employee_deleted', fetchEmployees);
    };
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    searchEmployees,
    updateEmployee
  };
};

// Hook لإدارة الحضور والانصراف
export const useAttendance = (employeeId?: string, date?: string) => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getAttendance(employeeId, date);
      setAttendance(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الحضور');
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId, date]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return {
    attendance,
    loading,
    error,
    refetch: fetchAttendance
  };
};

// Hook لإدارة الإجازات
export const useLeaves = (employeeId?: string) => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getLeaves(employeeId);
      setLeaves(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الإجازات');
      console.error('Error fetching leaves:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  return {
    leaves,
    loading,
    error,
    refetch: fetchLeaves
  };
};

// Hook لإدارة الطلبات
export const useRequests = (employeeId?: string) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getRequests(employeeId);
      setRequests(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل الطلبات');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests
  };
};

// Hook لإدارة الرواتب
export const useSalaries = (employeeId?: string) => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSalaries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getSalaries(employeeId);
      setSalaries(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات الرواتب');
      console.error('Error fetching salaries:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  return {
    salaries,
    loading,
    error,
    refetch: fetchSalaries
  };
};

// Hook لإدارة التقييمات
export const useEvaluations = (employeeId?: string) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getEvaluations(employeeId);
      setEvaluations(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل التقييمات');
      console.error('Error fetching evaluations:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

  return {
    evaluations,
    loading,
    error,
    refetch: fetchEvaluations
  };
};

// Hook لإدارة التكاملات الخارجية
export const useExternalApis = (companyId?: string) => {
  const [integrations, setIntegrations] = useState<ExternalApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getExternalApiIntegrations(companyId);
      setIntegrations(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات التكاملات');
      console.error('Error fetching integrations:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const syncPlatform = useCallback(async (platform: 'qiwa' | 'gosi' | 'muqeem' | 'tamm') => {
    if (!companyId) return;
    try {
      const result = await DatabaseService.syncWithGovernmentPlatform(platform, companyId);
      if (result.success) {
        await fetchIntegrations(); // إعادة تحميل البيانات بعد المزامنة
        DataEventService.emit('sync_completed', { platform, result });
      }
      return result;
    } catch (err) {
      setError(`حدث خطأ في مزامنة منصة ${platform}`);
      console.error(`Error syncing ${platform}:`, err);
      throw err;
    }
  }, [companyId, fetchIntegrations]);

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  return {
    integrations,
    loading,
    error,
    refetch: fetchIntegrations,
    syncPlatform
  };
};

// Hook لإدارة التنبيهات الذكية
export const useAiAlerts = (companyId?: string) => {
  const [alerts, setAlerts] = useState<AiAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getAiAlerts(companyId);
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل التنبيهات');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const markAsRead = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissedAt: new Date().toISOString() } : alert
    ));
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    // استمع للتنبيهات الجديدة
    const handleNewAlert = (newAlert: AiAlert) => {
      setAlerts(prev => [newAlert, ...prev]);
    };

    DataEventService.subscribe('new_ai_alert', handleNewAlert);

    return () => {
      DataEventService.unsubscribe('new_ai_alert', handleNewAlert);
    };
  }, []);

  return {
    alerts,
    unreadCount: alerts.filter(a => !a.isRead && !a.dismissedAt).length,
    loading,
    error,
    refetch: fetchAlerts,
    markAsRead,
    dismissAlert
  };
};

// Hook لإدارة مؤشرات الأداء
export const useDashboardMetrics = (companyId?: string) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DatabaseService.getDashboardMetrics(companyId);
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ في تحميل مؤشرات الأداء');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchMetrics();
    
    // إعادة تحميل المؤشرات كل 5 دقائق
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics
  };
};

// Hook لإنشاء التقارير
export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (
    type: 'employees' | 'attendance' | 'payroll' | 'compliance',
    filters: any
  ) => {
    try {
      setLoading(true);
      setError(null);
      const report = await DatabaseService.generateReport(type, filters);
      return report;
    } catch (err) {
      setError('حدث خطأ في إنشاء التقرير');
      console.error('Error generating report:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateReport,
    loading,
    error
  };
};