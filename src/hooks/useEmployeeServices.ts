import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface LeaveType {
  id: string;
  name_ar: string;
  name_en?: string;
  max_days_per_year: number;
  is_paid: boolean;
  requires_approval: boolean;
  is_active: boolean;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type_id: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason?: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  emergency_contact?: string;
  replacement_employee_id?: string;
  created_at: string;
  updated_at?: string;
  leave_types?: LeaveType;
}

export interface EmployeeRequest {
  id: string;
  employee_id: string;
  request_type: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  assigned_to?: string;
  documents: any;
  response_notes?: string;
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface AttendanceCorrection {
  id: string;
  employee_id: string;
  attendance_record_id?: string;
  correction_date: string;
  correction_type: string;
  original_clock_in?: string;
  original_clock_out?: string;
  corrected_clock_in?: string;
  corrected_clock_out?: string;
  reason: string;
  evidence_documents: any;
  status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  manager_notes?: string;
  created_at: string;
}

export interface PayrollRequest {
  id: string;
  employee_id: string;
  request_type: string;
  requested_amount?: number;
  request_reason?: string;
  bank_letter_type?: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  processed_by?: string;
  processed_at?: string;
  documents: any;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface EndOfService {
  id: string;
  employee_id: string;
  termination_date: string;
  termination_type: string;
  notice_period_days: number;
  last_working_day?: string;
  reason?: string;
  years_of_service?: number;
  final_settlement: any;
  total_eos_amount?: number;
  vacation_balance_days: number;
  vacation_balance_amount: number;
  other_dues: number;
  deductions: number;
  net_amount?: number;
  clearance_status: any;
  exit_interview_completed: boolean;
  final_documents_issued: boolean;
  processed_by?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export function useEmployeeServices() {
  const [loading, setLoading] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employeeRequests, setEmployeeRequests] = useState<EmployeeRequest[]>([]);
  const [attendanceCorrections, setAttendanceCorrections] = useState<AttendanceCorrection[]>([]);
  const [payrollRequests, setPayrollRequests] = useState<PayrollRequest[]>([]);
  const [endOfServiceRecords, setEndOfServiceRecords] = useState<EndOfService[]>([]);
  const { toast } = useToast();

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchLeaveTypes(),
        fetchLeaveRequests(),
        fetchEmployeeRequests(),
        fetchAttendanceCorrections(),
        fetchPayrollRequests(),
        fetchEndOfServiceRecords()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Leave Types
  const fetchLeaveTypes = async () => {
    const { data, error } = await supabase
      .from('leave_types')
      .select('*')
      .eq('is_active', true)
      .order('name_ar');

    if (error) {
      console.error('Error fetching leave types:', error);
      return;
    }
    setLeaveTypes(data || []);
  };

  // Leave Requests
  const fetchLeaveRequests = async () => {
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        leave_types(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leave requests:', error);
      return;
    }
    setLeaveRequests(data as LeaveRequest[] || []);
  };

  const submitLeaveRequest = async (request: Omit<LeaveRequest, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('leave_requests')
        .insert([request]);

      if (error) throw error;

      toast({
        title: "تم إرسال طلب الإجازة",
        description: "تم إرسال طلب الإجازة بنجاح. سيتم مراجعته من قبل الإدارة."
      });

      await fetchLeaveRequests();
    } catch (error) {
      console.error('Error submitting leave request:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلب الإجازة.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Employee Requests
  const fetchEmployeeRequests = async () => {
    const { data, error } = await supabase
      .from('employee_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching employee requests:', error);
      return;
    }
    setEmployeeRequests(data || []);
  };

  const submitEmployeeRequest = async (request: Omit<EmployeeRequest, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('employee_requests')
        .insert([request]);

      if (error) throw error;

      toast({
        title: "تم إرسال الطلب",
        description: "تم إرسال طلبك بنجاح. سيتم مراجعته من قبل قسم الموارد البشرية."
      });

      await fetchEmployeeRequests();
    } catch (error) {
      console.error('Error submitting employee request:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال الطلب.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Attendance Corrections
  const fetchAttendanceCorrections = async () => {
    const { data, error } = await supabase
      .from('attendance_corrections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching attendance corrections:', error);
      return;
    }
    setAttendanceCorrections(data as unknown as AttendanceCorrection[] || []);
  };

  const submitAttendanceCorrection = async (correction: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('attendance_corrections')
        .insert([correction]);

      if (error) throw error;

      toast({
        title: "تم إرسال طلب التصحيح",
        description: "تم إرسال طلب تصحيح الحضور بنجاح."
      });

      await fetchAttendanceCorrections();
    } catch (error) {
      console.error('Error submitting attendance correction:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلب التصحيح.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Payroll Requests
  const fetchPayrollRequests = async () => {
    const { data, error } = await supabase
      .from('payroll_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payroll requests:', error);
      return;
    }
    setPayrollRequests(data || []);
  };

  const submitPayrollRequest = async (request: Omit<PayrollRequest, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('payroll_requests')
        .insert([request]);

      if (error) throw error;

      toast({
        title: "تم إرسال طلب الراتب",
        description: "تم إرسال طلب الراتب/المزايا بنجاح."
      });

      await fetchPayrollRequests();
    } catch (error) {
      console.error('Error submitting payroll request:', error);
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلب الراتب.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // End of Service
  const fetchEndOfServiceRecords = async () => {
    const { data, error } = await supabase
      .from('end_of_service')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching end of service records:', error);
      return;
    }
    setEndOfServiceRecords(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    leaveTypes,
    leaveRequests,
    employeeRequests,
    attendanceCorrections,
    payrollRequests,
    endOfServiceRecords,
    submitLeaveRequest,
    submitEmployeeRequest,
    submitAttendanceCorrection,
    submitPayrollRequest,
    fetchData,
    fetchLeaveRequests,
    fetchEmployeeRequests,
    fetchAttendanceCorrections,
    fetchPayrollRequests,
    fetchEndOfServiceRecords
  };
}