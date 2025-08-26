import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  instructor: string;
  instructorId: string;
  duration: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  enrolled: number;
  capacity: number;
  progress: number;
  rating: number;
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  category: string;
  format: 'online' | 'offline' | 'hybrid';
  startDate: string;
  endDate: string;
  thumbnail: string;
  isLive: boolean;
  hasAI: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  fullName: string;
  email: string;
  specialization: string;
  bio: string;
  rating: number;
  totalCourses: number;
  totalStudents: number;
  avatar: string;
  phone: string;
  experience: string;
  certifications: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  employeeId: string;
  enrolledAt: string;
  progress: number;
  status: 'enrolled' | 'completed' | 'dropped' | 'suspended';
  completedAt?: string;
  grade?: number;
  certificateUrl?: string;
}

export interface Certificate {
  id: string;
  employeeId: string;
  courseId: string;
  issuedAt: string;
  certificateNumber: string;
  grade: number;
  validUntil?: string;
  pdfUrl: string;
  verificationCode: string;
}

export interface LiveSession {
  id: string;
  courseId: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  instructorId: string;
  streamUrl?: string;
  recordingUrl?: string;
  participants: number;
  maxParticipants: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  chatEnabled: boolean;
  recordingEnabled: boolean;
}

export interface TrainingStats {
  activeCourses: number;
  totalLearners: number;
  certificatesIssued: number;
  liveSessions: number;
  completionRate: number;
  averageRating: number;
  totalHours: number;
  activeInstructors: number;
  monthlyEnrollments: number;
  revenue: number;
}

export const useTrainingSystem = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [stats, setStats] = useState<TrainingStats>({
    activeCourses: 0,
    totalLearners: 0,
    certificatesIssued: 0,
    liveSessions: 0,
    completionRate: 0,
    averageRating: 0,
    totalHours: 0,
    activeInstructors: 0,
    monthlyEnrollments: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with empty data - no sample data
  useEffect(() => {
    setCourses([]);
    setInstructors([]);
    
    // Initialize stats with empty values
    setStats({
      activeCourses: 0,
      totalLearners: 0,
      certificatesIssued: 0,
      liveSessions: 0,
      completionRate: 0,
      averageRating: 0,
      totalHours: 0,
      activeInstructors: 0,
      monthlyEnrollments: 0,
      revenue: 0
    });
  }, []);

  // Course management functions
  const createCourse = async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      const newCourse: Course = {
        ...courseData,
        id: `course_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setCourses(prev => [...prev, newCourse]);
      return { success: true, data: newCourse };
    } catch (error) {
      setError('فشل في إنشاء الدورة');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    setLoading(true);
    try {
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { ...course, ...updates, updatedAt: new Date().toISOString() }
          : course
      ));
      return { success: true };
    } catch (error) {
      setError('فشل في تحديث الدورة');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string) => {
    setLoading(true);
    try {
      setCourses(prev => prev.filter(course => course.id !== courseId));
      return { success: true };
    } catch (error) {
      setError('فشل في حذف الدورة');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Instructor management functions
  const createInstructor = async (instructorData: Omit<Instructor, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const newInstructor: Instructor = {
        ...instructorData,
        id: `inst_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      
      setInstructors(prev => [...prev, newInstructor]);
      return { success: true, data: newInstructor };
    } catch (error) {
      setError('فشل في إضافة المدرب');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateInstructor = async (instructorId: string, updates: Partial<Instructor>) => {
    setLoading(true);
    try {
      setInstructors(prev => prev.map(instructor => 
        instructor.id === instructorId 
          ? { ...instructor, ...updates }
          : instructor
      ));
      return { success: true };
    } catch (error) {
      setError('فشل في تحديث بيانات المدرب');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Enrollment functions
  const enrollStudent = async (courseId: string, employeeId: string) => {
    setLoading(true);
    try {
      const enrollment: Enrollment = {
        id: `enroll_${Date.now()}`,
        courseId,
        employeeId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        status: 'enrolled'
      };
      
      setEnrollments(prev => [...prev, enrollment]);
      
      // Update course enrollment count
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { ...course, enrolled: course.enrolled + 1 }
          : course
      ));
      
      return { success: true, data: enrollment };
    } catch (error) {
      setError('فشل في تسجيل الطالب');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (enrollmentId: string, progress: number) => {
    setLoading(true);
    try {
      setEnrollments(prev => prev.map(enrollment => 
        enrollment.id === enrollmentId 
          ? { ...enrollment, progress }
          : enrollment
      ));
      return { success: true };
    } catch (error) {
      setError('فشل في تحديث التقدم');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Live session functions
  const createLiveSession = async (sessionData: Omit<LiveSession, 'id'>) => {
    setLoading(true);
    try {
      const newSession: LiveSession = {
        ...sessionData,
        id: `session_${Date.now()}`,
      };
      
      setLiveSessions(prev => [...prev, newSession]);
      return { success: true, data: newSession };
    } catch (error) {
      setError('فشل في إنشاء الجلسة المباشرة');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (courseId: string): Course | undefined => {
    return courses.find(course => course.id === courseId);
  };

  const getInstructorById = (instructorId: string): Instructor | undefined => {
    return instructors.find(instructor => instructor.id === instructorId);
  };

  const getCoursesByInstructor = (instructorId: string): Course[] => {
    return courses.filter(course => course.instructorId === instructorId);
  };

  const getEnrollmentsByEmployee = (employeeId: string): Enrollment[] => {
    return enrollments.filter(enrollment => enrollment.employeeId === employeeId);
  };

  return {
    // Data
    courses,
    instructors,
    enrollments,
    certificates,
    liveSessions,
    stats,
    loading,
    error,
    
    // Course functions
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCoursesByInstructor,
    
    // Instructor functions
    createInstructor,
    updateInstructor,
    getInstructorById,
    
    // Enrollment functions
    enrollStudent,
    updateProgress,
    getEnrollmentsByEmployee,
    
    // Live session functions
    createLiveSession,
    
    // Utility functions
    setError: (error: string | null) => setError(error),
    clearError: () => setError(null)
  };
};