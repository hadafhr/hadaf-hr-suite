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

  // Sample data for demonstration
  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'أساسيات إدارة المشاريع',
      englishTitle: 'Project Management Fundamentals',
      description: 'دورة شاملة لتعلم مبادئ إدارة المشاريع وأدواتها الحديثة',
      instructor: 'د. محمد الأحمد',
      instructorId: 'inst_1',
      duration: '40 ساعة',
      level: 'مبتدئ',
      enrolled: 145,
      capacity: 200,
      progress: 65,
      rating: 4.8,
      status: 'active',
      category: 'إدارة',
      format: 'hybrid',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      thumbnail: '/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png',
      isLive: false,
      hasAI: true,
      price: 1500,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      title: 'التسويق الرقمي المتقدم',
      englishTitle: 'Advanced Digital Marketing',
      description: 'استراتيجيات التسويق الرقمي وإدارة وسائل التواصل الاجتماعي',
      instructor: 'أ. سارة المطيري',
      instructorId: 'inst_2',
      duration: '32 ساعة',
      level: 'متقدم',
      enrolled: 89,
      capacity: 150,
      progress: 100,
      rating: 4.9,
      status: 'completed',
      category: 'تسويق',
      format: 'online',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      thumbnail: '/lovable-uploads/9315a174-2c21-4ec0-8554-b4936be67676.png',
      isLive: true,
      hasAI: true,
      price: 2000,
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-02-15T16:45:00Z'
    },
    {
      id: '3',
      title: 'البرمجة بـ React',
      englishTitle: 'React Programming',
      description: 'تطوير تطبيقات الويب التفاعلية باستخدام مكتبة React',
      instructor: 'م. أحمد العتيبي',
      instructorId: 'inst_3',
      duration: '48 ساعة',
      level: 'متوسط',
      enrolled: 67,
      capacity: 100,
      progress: 30,
      rating: 4.7,
      status: 'active',
      category: 'تقنية',
      format: 'online',
      startDate: '2024-02-10',
      endDate: '2024-03-10',
      thumbnail: '/lovable-uploads/a53728d1-12f4-46c1-8428-dc575579fb1e.png',
      isLive: false,
      hasAI: true,
      price: 1800,
      createdAt: '2024-02-01T11:00:00Z',
      updatedAt: '2024-02-05T14:20:00Z'
    }
  ];

  const sampleInstructors: Instructor[] = [
    {
      id: 'inst_1',
      fullName: 'د. محمد الأحمد',
      email: 'mohammed.ahmed@company.com',
      specialization: 'إدارة المشاريع',
      bio: 'خبير في إدارة المشاريع مع أكثر من 15 سنة خبرة في القطاعين الحكومي والخاص',
      rating: 4.8,
      totalCourses: 12,
      totalStudents: 456,
      avatar: '/lovable-uploads/e178bb8e-1473-4998-a200-54739ac16b3e.png',
      phone: '+966501234567',
      experience: '15 سنة',
      certifications: ['PMP', 'Agile Certified', 'PRINCE2'],
      isActive: true,
      createdAt: '2023-01-15T10:00:00Z'
    },
    {
      id: 'inst_2',
      fullName: 'أ. سارة المطيري',
      email: 'sara.almuteri@company.com',
      specialization: 'التسويق الرقمي',
      bio: 'مختصة في التسويق الرقمي ووسائل التواصل الاجتماعي مع خبرة 10 سنوات',
      rating: 4.9,
      totalCourses: 8,
      totalStudents: 234,
      avatar: '/lovable-uploads/ebeb1cac-6889-402f-800b-60ea4e5b64c5.png',
      phone: '+966507654321',
      experience: '10 سنوات',
      certifications: ['Google Ads', 'Facebook Marketing', 'HubSpot'],
      isActive: true,
      createdAt: '2023-03-20T09:30:00Z'
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setCourses(sampleCourses);
    setInstructors(sampleInstructors);
    
    // Calculate stats from sample data
    const activeCourseCount = sampleCourses.filter(c => c.status === 'active').length;
    const totalEnrolled = sampleCourses.reduce((sum, course) => sum + course.enrolled, 0);
    const avgRating = sampleCourses.reduce((sum, course) => sum + course.rating, 0) / sampleCourses.length;
    
    setStats({
      activeCourses: activeCourseCount,
      totalLearners: totalEnrolled,
      certificatesIssued: 342,
      liveSessions: 8,
      completionRate: 94,
      averageRating: Number(avgRating.toFixed(1)),
      totalHours: 15680,
      activeInstructors: sampleInstructors.filter(i => i.isActive).length,
      monthlyEnrollments: 156,
      revenue: 284500
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