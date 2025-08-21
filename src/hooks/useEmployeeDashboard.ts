import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Employee {
  id: string;
  user_id?: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position_id?: string;
  department_id?: string;
  basic_salary: number;
  employment_status: string;
  profile_picture_url?: string;
}

export interface AttendanceRecord {
  id: string;
  attendance_date: string;
  check_in_time?: string;
  check_out_time?: string;
  check_in_location?: any;
  check_out_location?: any;
  total_hours?: number;
  overtime_hours?: number;
  status: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  notification_type: string;
  action_type?: string;
  is_read: boolean;
  priority: string;
  created_at: string;
  read_at?: string;
}

export interface EmployeeDocument {
  id: string;
  document_type: string;
  document_name: string;
  file_path: string;
  is_verified: boolean;
  created_at: string;
}

export const useEmployeeDashboard = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { toast } = useToast();

  // جلب بيانات الموظف الحالي
  const fetchEmployeeData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: employeeData, error: employeeError } = await supabase
        .from('boud_employees')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (employeeError) {
        console.error('Error fetching employee:', employeeError);
        return;
      }

      setEmployee(employeeData);
      return employeeData;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // جلب الإشعارات
  const fetchNotifications = async (employeeId: string) => {
    try {
      const { data, error } = await supabase
        .from('employee_notifications')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      setNotifications(data || []);
      setUnreadNotifications(data?.filter(n => !n.is_read).length || 0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // جلب حضور اليوم
  const fetchTodayAttendance = async (employeeId: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('employee_attendance_records')
        .select('*')
        .eq('employee_id', employeeId)
        .eq('attendance_date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching attendance:', error);
        return;
      }

      setTodayAttendance(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // جلب المستندات
  const fetchDocuments = async (employeeId: string) => {
    try {
      const { data, error } = await supabase
        .from('employee_documents')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // تسجيل الحضور
  const checkIn = async (location?: GeolocationPosition) => {
    if (!employee) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const locationData = location ? {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date().toISOString()
      } : null;

      const { data, error } = await supabase
        .from('employee_attendance_records')
        .insert({
          employee_id: employee.id,
          attendance_date: today,
          check_in_time: new Date().toISOString(),
          check_in_location: locationData,
          status: 'present'
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "خطأ في تسجيل الحضور",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setTodayAttendance(data);
      toast({
        title: "تم تسجيل الحضور بنجاح",
        description: "تم تسجيل حضورك لليوم",
      });

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الحضور",
        variant: "destructive",
      });
    }
  };

  // تسجيل الانصراف
  const checkOut = async (location?: GeolocationPosition) => {
    if (!employee || !todayAttendance) return;

    try {
      const locationData = location ? {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date().toISOString()
      } : null;

      // حساب إجمالي الساعات
      const checkInTime = new Date(todayAttendance.check_in_time!);
      const checkOutTime = new Date();
      const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      const { data, error } = await supabase
        .from('employee_attendance_records')
        .update({
          check_out_time: new Date().toISOString(),
          check_out_location: locationData,
          total_hours: Math.round(totalHours * 100) / 100
        })
        .eq('id', todayAttendance.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "خطأ في تسجيل الانصراف",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setTodayAttendance(data);
      toast({
        title: "تم تسجيل الانصراف بنجاح",
        description: `إجمالي ساعات العمل: ${Math.round(totalHours * 100) / 100} ساعة`,
      });

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الانصراف",
        variant: "destructive",
      });
    }
  };

  // تحديد الموقع الجغرافي
  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('الجهاز لا يدعم تحديد الموقع الجغرافي'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  // تسجيل حضور مع GPS
  const checkInWithLocation = async () => {
    try {
      const location = await getCurrentLocation();
      await checkIn(location);
    } catch (error: any) {
      // التسجيل بدون موقع في حالة الفشل
      toast({
        title: "تعذر تحديد الموقع",
        description: "سيتم تسجيل الحضور بدون الموقع الجغرافي",
        variant: "default",
      });
      await checkIn();
    }
  };

  // تسجيل انصراف مع GPS
  const checkOutWithLocation = async () => {
    try {
      const location = await getCurrentLocation();
      await checkOut(location);
    } catch (error: any) {
      // التسجيل بدون موقع في حالة الفشل
      toast({
        title: "تعذر تحديد الموقع",
        description: "سيتم تسجيل الانصراف بدون الموقع الجغرافي",
        variant: "default",
      });
      await checkOut();
    }
  };

  // وضع علامة مقروء على الإشعار
  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('employee_notifications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return;
      }

      // تحديث القائمة المحلية
      setNotifications(prev => prev.map(n => 
        n.id === notificationId 
          ? { ...n, is_read: true, read_at: new Date().toISOString() }
          : n
      ));
      setUnreadNotifications(prev => Math.max(0, prev - 1));

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // رفع مستند جديد
  const uploadDocument = async (file: File, documentType: string, documentName?: string) => {
    if (!employee) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${employee.user_id}/${documentType}_${Date.now()}.${fileExt}`;

      // رفع الملف إلى التخزين
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('employee-documents')
        .upload(fileName, file);

      if (uploadError) {
        toast({
          title: "خطأ في رفع الملف",
          description: uploadError.message,
          variant: "destructive",
        });
        return null;
      }

      // حفظ بيانات المستند في قاعدة البيانات
      const { data: docData, error: docError } = await supabase
        .from('employee_documents')
        .insert({
          employee_id: employee.id,
          document_type: documentType,
          document_name: documentName || file.name,
          file_path: uploadData.path,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single();

      if (docError) {
        toast({
          title: "خطأ في حفظ المستند",
          description: docError.message,
          variant: "destructive",
        });
        return null;
      }

      // تحديث قائمة المستندات
      setDocuments(prev => [docData, ...prev]);
      
      toast({
        title: "تم رفع المستند بنجاح",
        description: "تم حفظ المستند وإرساله للمراجعة",
      });

      return docData;

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفع المستند",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      const empData = await fetchEmployeeData();
      if (empData) {
        await Promise.all([
          fetchNotifications(empData.id),
          fetchTodayAttendance(empData.id),
          fetchDocuments(empData.id)
        ]);
      }
      
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // الاشتراك في الإشعارات المباشرة
  useEffect(() => {
    if (!employee) return;

    const notificationSubscription = supabase
      .channel('employee-notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'employee_notifications',
          filter: `employee_id=eq.${employee.id}`
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadNotifications(prev => prev + 1);
          
          // إظهار toast للإشعار الجديد
          toast({
            title: newNotification.title,
            description: newNotification.description,
            duration: 5000,
          });
        }
      )
      .subscribe();

    return () => {
      notificationSubscription.unsubscribe();
    };
  }, [employee, toast]);

  return {
    employee,
    notifications,
    todayAttendance,
    documents,
    unreadNotifications,
    isLoading,
    checkInWithLocation,
    checkOutWithLocation,
    markNotificationAsRead,
    uploadDocument,
    fetchNotifications: () => employee && fetchNotifications(employee.id),
    fetchTodayAttendance: () => employee && fetchTodayAttendance(employee.id),
    fetchDocuments: () => employee && fetchDocuments(employee.id)
  };
};