import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CareerDepartment {
  id: string;
  name: string;
  name_en?: string;
  description?: string;
  is_active: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  title_en?: string;
  department_id: string;
  location: string;
  job_type: string;
  description: string;
  requirements: any;
  benefits: any;
  salary_range_min?: number;
  salary_range_max?: number;
  salary_note?: string;
  posted_at: string;
  expires_at?: string;
  is_active: boolean;
  views_count: number;
  applications_count: number;
  department?: any;
}

export interface JobApplication {
  id: string;
  job_opening_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  resume_url?: string;
  cover_letter?: string;
  status: string;
  applied_at: string;
  job_opening?: any;
}

export interface JobFilters {
  department?: string;
  location?: string;
  jobType?: string;
  search?: string;
}

export const useCareers = () => {
  const [departments, setDepartments] = useState<CareerDepartment[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobOpening[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [userApplications, setUserApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({});
  const { toast } = useToast();

  // جلب الأقسام
  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('career_departments')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل الأقسام",
        variant: "destructive"
      });
    }
  };

  // جلب الوظائف
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_openings')
        .select(`
          *,
          department:career_departments(*)
        `)
        .eq('is_active', true)
        .order('posted_at', { ascending: false });

      if (error) throw error;
      setJobs(data as any || []);
      setFilteredJobs(data as any || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل الوظائف",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // جلب وظيفة محددة
  const fetchJobById = async (jobId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_openings')
        .select(`
          *,
          department:career_departments(*)
        `)
        .eq('id', jobId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      
      // تسجيل مشاهدة الوظيفة
      await supabase.rpc('log_job_view', { job_id: jobId });
      
      setSelectedJob(data as any);
      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل تفاصيل الوظيفة",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // تطبيق الفلاتر
  const applyFilters = (newFilters: JobFilters) => {
    setFilters(newFilters);
    let filtered = [...jobs];

    if (newFilters.department) {
      filtered = filtered.filter(job => job.department_id === newFilters.department);
    }

    if (newFilters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(newFilters.location!.toLowerCase())
      );
    }

    if (newFilters.jobType) {
      filtered = filtered.filter(job => job.job_type === newFilters.jobType);
    }

    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        (job.department?.name && job.department.name.toLowerCase().includes(searchLower))
      );
    }

    setFilteredJobs(filtered);
  };

  // التقديم على وظيفة
  const submitApplication = async (applicationData: {
    job_opening_id: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone?: string;
    resume_url?: string;
    cover_letter?: string;
  }) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('job_applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) throw error;

      // تحديث عدد المتقدمين
      const { data: jobData } = await supabase
        .from('job_openings')
        .select('applications_count')
        .eq('id', applicationData.job_opening_id)
        .single();

      if (jobData) {
        await supabase
          .from('job_openings')
          .update({ 
            applications_count: jobData.applications_count + 1
          })
          .eq('id', applicationData.job_opening_id);
      }

      toast({
        title: "تم التقديم بنجاح!",
        description: "تم تسجيل طلبك وسيتم مراجعته في أقرب وقت",
        variant: "default"
      });

      return data;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "خطأ في التقديم",
        description: "حدث خطأ أثناء تسجيل طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // جلب طلبات المستخدم
  const fetchUserApplications = async (email: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_opening:job_openings(
            *,
            department:career_departments(*)
          )
        `)
        .eq('applicant_email', email)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setUserApplications(data as any || []);
      return data;
    } catch (error) {
      console.error('Error fetching user applications:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل طلباتك",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // رفع ملف السيرة الذاتية
  const uploadResume = async (file: File, applicantEmail: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicantEmail}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "خطأ في رفع الملف",
        description: "حدث خطأ أثناء رفع السيرة الذاتية",
        variant: "destructive"
      });
      return null;
    }
  };

  // الحصول على إحصائيات
  const getStatistics = () => {
    const totalJobs = jobs.length;
    const departmentCounts = departments.map(dept => ({
      ...dept,
      jobCount: jobs.filter(job => job.department_id === dept.id).length
    }));

    const jobTypesCounts = {
      full_time: jobs.filter(job => job.job_type === 'full_time').length,
      part_time: jobs.filter(job => job.job_type === 'part_time').length,
      contract: jobs.filter(job => job.job_type === 'contract').length,
      internship: jobs.filter(job => job.job_type === 'internship').length
    };

    return {
      totalJobs,
      departmentCounts,
      jobTypesCounts
    };
  };

  useEffect(() => {
    fetchDepartments();
    fetchJobs();
  }, []);

  return {
    departments,
    jobs,
    filteredJobs,
    selectedJob,
    userApplications,
    loading,
    filters,
    fetchJobs,
    fetchJobById,
    applyFilters,
    submitApplication,
    fetchUserApplications,
    uploadResume,
    getStatistics,
    setSelectedJob
  };
};