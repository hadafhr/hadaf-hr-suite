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
    if (!user) {
      console.log('No user found in fetchEmployeeProfile');
      setLoading(false);
      return;
    }

    console.log('Fetching employee profile for user:', user.id);

    try {
      // First try with inner join
      let { data, error } = await supabase
        .from('boud_employees')
        .select(`
          *,
          boud_departments(department_name),
          boud_job_positions(position_title)
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Employee query result:', { data, error });

      if (error) {
        console.error('Error fetching employee profile:', error);
        toast({
          title: 'خطأ',
          description: `فشل في تحميل بيانات الموظف: ${error.message}`,
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      if (!data) {
        console.log('No employee record found for user:', user.id);
        toast({
          title: 'تنبيه',
          description: 'لم يتم العثور على بيانات الموظف. يرجى التواصل مع إدارة الموارد البشرية.',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      setEmployee(data);
      console.log('Employee data set successfully:', data);
    } catch (error) {
      console.error('Unexpected error in fetchEmployeeProfile:', error);
      toast({
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.',
        variant: 'destructive'
      });
      setLoading(false);
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
      console.log('Initialize data called, user:', user);
      setLoading(true);
      
      if (user) {
        await fetchEmployeeProfile();
      } else {
        // For demo purposes, create mock employee data when no user is logged in
        console.log('No user found, creating demo employee data');
        const mockEmployee: EmployeeProfile = {
          id: 'demo-employee-001',
          employee_id: 'EMP-001',
          first_name: 'أحمد',
          last_name: 'محمد',
          position_id: 'pos-001',
          department_id: 'dept-001',
          email: 'ahmed.mohammed@company.com',
          phone: '+966501234567',
          national_id: '1234567890',
          hire_date: '2023-01-15',
          basic_salary: 8000,
          employment_status: 'active',
          company_id: 'company-001',
          full_name_arabic: 'أحمد محمد العلي',
          profile_picture_url: '/placeholder-avatar.jpg',
          boud_departments: {
            department_name: 'تقنية المعلومات'
          },
          boud_job_positions: {
            position_title: 'مطور برمجيات'
          }
        };
        
        setEmployee(mockEmployee);
        
        // Set mock dashboard stats
        setDashboardStats({
          totalLeaves: 30,
          usedLeaves: 8,
          pendingTasks: 3,
          completedTasks: 15,
          attendanceRate: 95,
          lastPayroll: {
            id: 'payroll-001',
            employee_id: 'demo-employee-001',
            basic_salary: 8000,
            housing_allowance: 1500,
            transport_allowance: 500,
            other_allowances: 300,
            gross_salary: 10300,
            total_deductions: 1030,
            net_salary: 9270,
            payroll_run_id: 'run-001'
          }
        });
        
        // Set mock attendance records
        const mockAttendance: AttendanceRecord[] = [
          {
            id: 'att-001',
            employee_id: 'demo-employee-001',
            attendance_date: new Date().toISOString().split('T')[0],
            clock_in_time: '08:00:00',
            clock_out_time: '17:00:00',
            status: 'present',
            total_hours: 9,
            notes: ''
          },
          {
            id: 'att-002',
            employee_id: 'demo-employee-001',
            attendance_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            clock_in_time: '08:15:00',
            clock_out_time: '17:00:00',
            status: 'late',
            total_hours: 8.75,
            notes: 'تأخر 15 دقيقة'
          }
        ];
        setAttendanceRecords(mockAttendance);
        
        // Set mock leave requests
        const mockLeaveRequests: LeaveRequest[] = [
          {
            id: 'leave-001',
            employee_id: 'demo-employee-001',
            leave_type: 'annual',
            start_date: '2024-03-15',
            end_date: '2024-03-19',
            total_days: 5,
            reason: 'إجازة سنوية',
            status: 'approved',
            applied_date: '2024-03-01'
          },
          {
            id: 'leave-002',
            employee_id: 'demo-employee-001',
            leave_type: 'sick',
            start_date: '2024-04-10',
            end_date: '2024-04-12',
            total_days: 3,
            reason: 'إجازة مرضية',
            status: 'pending',
            applied_date: '2024-04-08'
          }
        ];
        setLeaveRequests(mockLeaveRequests);
        
        // Set mock payroll items  
        const mockPayrollItems: PayrollItem[] = [
          {
            id: 'payroll-001',
            employee_id: 'demo-employee-001',
            basic_salary: 8000,
            housing_allowance: 1500,
            transport_allowance: 500,
            other_allowances: 300,
            gross_salary: 10300,
            total_deductions: 1030,
            net_salary: 9270,
            payroll_run_id: 'run-001'
          }
        ];
        setPayrollItems(mockPayrollItems);
        
        console.log('Demo employee data created successfully');
      }
      
      setLoading(false);
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