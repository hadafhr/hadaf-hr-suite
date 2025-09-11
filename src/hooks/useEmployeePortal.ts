import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

// Types for employee data
interface EmployeeProfile {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  position_id: string;
  department_id: string;
  email: string;
  phone: string;
  national_id: string;
  hire_date: string;
  basic_salary: number;
  employment_status: string;
  company_id: string;
  manager_id?: string;
  profile_picture_url?: string;
  full_name_arabic?: string;
  boud_departments?: {
    department_name: string;
  };
  boud_job_positions?: {
    position_title: string;
  };
}

interface AttendanceRecord {
  id: string;
  employee_id: string;
  attendance_date: string;
  clock_in_time?: string;
  clock_out_time?: string;
  status: 'present' | 'late' | 'absent' | 'early_leave' | 'overtime';
  total_hours?: number;
  notes?: string;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid';
  start_date: string;
  end_date: string;
  total_days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  applied_date: string;
}

interface PayrollItem {
  id: string;
  employee_id: string;
  basic_salary: number;
  housing_allowance: number;
  transport_allowance: number;
  other_allowances: number;
  gross_salary: number;
  total_deductions: number;
  net_salary: number;
  payroll_run_id: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_by?: string;
  created_at: string;
}

export const useEmployeePortal = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [payrollItems, setPayrollItems] = useState<PayrollItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalLeaves: 0,
    usedLeaves: 0,
    pendingTasks: 0,
    completedTasks: 0,
    attendanceRate: 0,
    lastPayroll: null as PayrollItem | null
  });

  // Fetch employee profile
  const fetchEmployeeProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('boud_employees')
        .select(`
          *,
          boud_departments!inner(department_name),
          boud_job_positions!inner(position_title)
        `)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching employee profile:', error);
        toast({
          title: 'خطأ',
          description: 'فشل في تحميل بيانات الموظف',
          variant: 'destructive'
        });
        return;
      }

      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee profile:', error);
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async () => {
    if (!employee?.id) return;

    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('attendance_records_new')
        .select('*')
        .eq('employee_id', employee.id)
        .gte('attendance_date', startOfMonth.toISOString().split('T')[0])
        .order('attendance_date', { ascending: false });

      if (error) {
        console.error('Error fetching attendance:', error);
        return;
      }

      setAttendanceRecords(data || []);
      
      // Calculate attendance rate
      const totalDays = data?.length || 0;
      const presentDays = data?.filter(record => 
        record.status === 'present' || record.status === 'overtime'
      ).length || 0;
      const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
      
      setDashboardStats(prev => ({ ...prev, attendanceRate }));
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    if (!employee?.id) return;

    try {
      const { data, error } = await supabase
        .from('boud_leave_requests')
        .select('*')
        .eq('employee_id', employee.id)
        .order('applied_date', { ascending: false });

      if (error) {
        console.error('Error fetching leave requests:', error);
        return;
      }

      setLeaveRequests(data || []);
      
      // Calculate leave stats
      const totalLeaves = 30; // Default annual leave
      const usedLeaves = data?.filter(req => req.status === 'approved')
        .reduce((sum, req) => sum + req.total_days, 0) || 0;
      
      setDashboardStats(prev => ({ 
        ...prev, 
        totalLeaves, 
        usedLeaves 
      }));
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  // Fetch payroll items
  const fetchPayrollItems = async () => {
    if (!employee?.id) return;

    try {
      const { data, error } = await supabase
        .from('boud_payroll_items')
        .select('*')
        .eq('employee_id', employee.id)
        .order('created_at', { ascending: false })
        .limit(12); // Last 12 months

      if (error) {
        console.error('Error fetching payroll:', error);
        return;
      }

      setPayrollItems(data || []);
      
      // Set last payroll for dashboard
      if (data && data.length > 0) {
        setDashboardStats(prev => ({ 
          ...prev, 
          lastPayroll: data[0] 
        }));
      }
    } catch (error) {
      console.error('Error fetching payroll items:', error);
    }
  };

  // Submit leave request
  const submitLeaveRequest = async (leaveData: {
    leave_type: 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid';
    start_date: string;
    end_date: string;
    reason?: string;
    total_days: number;
  }) => {
    if (!employee?.id) return false;

    try {
      const { error } = await supabase
        .from('boud_leave_requests')
        .insert({
          employee_id: employee.id,
          leave_type: leaveData.leave_type,
          start_date: leaveData.start_date,
          end_date: leaveData.end_date,
          reason: leaveData.reason,
          total_days: leaveData.total_days,
          applied_date: new Date().toISOString().split('T')[0],
          status: 'pending' as const
        });

      if (error) {
        console.error('Error submitting leave request:', error);
        toast({
          title: 'خطأ',
          description: 'فشل في تقديم طلب الإجازة',
          variant: 'destructive'
        });
        return false;
      }

      toast({
        title: 'تم بنجاح',
        description: 'تم تقديم طلب الإجازة بنجاح'
      });

      await fetchLeaveRequests(); // Refresh leave requests
      return true;
    } catch (error) {
      console.error('Error submitting leave request:', error);
      return false;
    }
  };

  // Clock in/out functionality
  const clockIn = async (location?: { latitude: number; longitude: number }) => {
    if (!employee?.id) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if already clocked in today
      const { data: existingRecord } = await supabase
        .from('attendance_records_new')
        .select('*')
        .eq('employee_id', employee.id)
        .eq('attendance_date', today)
        .single();

      if (existingRecord?.clock_in_time) {
        toast({
          title: 'تنبيه',
          description: 'تم تسجيل الحضور بالفعل اليوم',
          variant: 'destructive'
        });
        return false;
      }

      const clockInTime = new Date();
      const attendanceData = {
        employee_id: employee.id,
        attendance_date: today,
        clock_in_time: clockInTime.toISOString(),
        status: 'present' as const,
        location_check_in: location ? `${location.latitude},${location.longitude}` : null
      };

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('attendance_records_new')
          .update(attendanceData)
          .eq('id', existingRecord.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('attendance_records_new')
          .insert(attendanceData);

        if (error) throw error;
      }

      toast({
        title: 'تم بنجاح',
        description: 'تم تسجيل الحضور بنجاح'
      });

      await fetchAttendanceRecords(); // Refresh attendance
      return true;
    } catch (error) {
      console.error('Error clocking in:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تسجيل الحضور',
        variant: 'destructive'
      });
      return false;
    }
  };

  const clockOut = async (location?: { latitude: number; longitude: number }) => {
    if (!employee?.id) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: existingRecord, error: fetchError } = await supabase
        .from('attendance_records_new')
        .select('*')
        .eq('employee_id', employee.id)
        .eq('attendance_date', today)
        .single();

      if (fetchError || !existingRecord?.clock_in_time) {
        toast({
          title: 'خطأ',
          description: 'يجب تسجيل الحضور أولاً',
          variant: 'destructive'
        });
        return false;
      }

      if (existingRecord.clock_out_time) {
        toast({
          title: 'تنبيه',
          description: 'تم تسجيل الانصراف بالفعل',
          variant: 'destructive'
        });
        return false;
      }

      const clockOutTime = new Date();
      const clockInTime = new Date(existingRecord.clock_in_time);
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

      const { error } = await supabase
        .from('attendance_records_new')
        .update({
          clock_out_time: clockOutTime.toISOString(),
          total_hours: Math.round(totalHours * 100) / 100,
          location_check_out: location ? `${location.latitude},${location.longitude}` : null
        })
        .eq('id', existingRecord.id);

      if (error) throw error;

      toast({
        title: 'تم بنجاح',
        description: 'تم تسجيل الانصراف بنجاح'
      });

      await fetchAttendanceRecords(); // Refresh attendance
      return true;
    } catch (error) {
      console.error('Error clocking out:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تسجيل الانصراف',
        variant: 'destructive'
      });
      return false;
    }
  };

  // Get current location
  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      if (user) {
        setLoading(true);
        await fetchEmployeeProfile();
        setLoading(false);
      }
    };

    initializeData();
  }, [user]);

  // Fetch related data when employee is loaded
  useEffect(() => {
    if (employee) {
      fetchAttendanceRecords();
      fetchLeaveRequests();
      fetchPayrollItems();
    }
  }, [employee]);

  return {
    loading,
    employee,
    attendanceRecords,
    leaveRequests,
    payrollItems,
    tasks,
    notifications,
    dashboardStats,
    actions: {
      submitLeaveRequest,
      clockIn,
      clockOut,
      getCurrentLocation,
      refreshData: () => {
        if (employee) {
          fetchAttendanceRecords();
          fetchLeaveRequests();
          fetchPayrollItems();
        }
      }
    }
  };
};