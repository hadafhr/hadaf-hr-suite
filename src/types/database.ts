// نماذج قاعدة البيانات لمنصة إدارة المنشآت والموظفين

// جدول الشركات/المنشآت
export interface Company {
  id: string;
  name: string;
  commercialRecord: string;
  unifiedNumber: string;
  sector: string;
  status: 'نشط' | 'غير نشط' | 'معلق';
  establishmentDate: string;
  address: {
    city: string;
    district: string;
    street: string;
    postalCode: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  range: 'أخضر' | 'أصفر' | 'أحمر';
  compliance: number; // نسبة الامتثال
  licenses: {
    qiwa: 'نشط' | 'منتهي' | 'معلق';
    municipal: 'نشط' | 'منتهي' | 'معلق';
    gosi: 'نشط' | 'منتهي' | 'معلق';
  };
  saudiPercentage: number;
  totalEmployees: number;
  createdAt: string;
  updatedAt: string;
}

// جدول الفروع
export interface Branch {
  id: string;
  companyId: string;
  name: string;
  code: string;
  address: {
    city: string;
    district: string;
    street: string;
    postalCode: string;
  };
  manager: string;
  employeeCount: number;
  status: 'نشط' | 'غير نشط' | 'معلق';
  createdAt: string;
  updatedAt: string;
}

// جدول المستخدمين
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr_manager' | 'employee' | 'super_admin';
  permissions: string[];
  companyId: string;
  employeeId?: string;
  isActive: boolean;
  lastLogin: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// جدول الموظفين
export interface Employee {
  id: string;
  companyId: string;
  branchId: string;
  jobId: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  nationalId?: string;
  iqamaId?: string;
  passport?: string;
  nationality: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  contactInfo: {
    phone: string;
    email: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  address: {
    city: string;
    district: string;
    street: string;
    postalCode: string;
  };
  status: 'على رأس العمل' | 'موقوف' | 'مستقيل' | 'منهي الخدمة';
  hireDate: string;
  terminationDate?: string;
  probationEndDate?: string;
  visaInfo?: {
    visaNumber: string;
    issueDate: string;
    expiryDate: string;
    sponsor: string;
  };
  bankInfo: {
    bankName: string;
    accountNumber: string;
    iban: string;
  };
  performance: 'ممتاز' | 'جيد جداً' | 'جيد' | 'مقبول' | 'ضعيف';
  warningsCount: number;
  leaveBalance: number;
  gosiRegistered: boolean;
  selfServiceAccess: boolean;
  createdAt: string;
  updatedAt: string;
}

// جدول الوظائف
export interface Job {
  id: string;
  title: string;
  titleEn: string;
  code: string;
  departmentId: string;
  level: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// جدول الأقسام
export interface Department {
  id: string;
  companyId: string;
  name: string;
  nameEn: string;
  code: string;
  managerId?: string;
  parentDepartmentId?: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// جدول الرواتب
export interface Salary {
  id: string;
  employeeId: string;
  payrollCycleId: string;
  baseSalary: number;
  allowances: {
    housing: number;
    transportation: number;
    communication: number;
    other: number;
  };
  deductions: {
    gosi: number;
    tax: number;
    loan: number;
    other: number;
  };
  bonus: number;
  overtime: number;
  netSalary: number;
  paymentDate: string;
  status: 'paid' | 'pending' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// جدول دورات الرواتب
export interface PayrollCycle {
  id: string;
  companyId: string;
  title: string;
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  paymentDate: string;
  status: 'draft' | 'calculated' | 'approved' | 'paid' | 'cancelled';
  totalAmount: number;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

// جدول العقود
export interface Contract {
  id: string;
  employeeId: string;
  companyId: string;
  contractNumber: string;
  type: 'unlimited' | 'limited' | 'part_time' | 'temporary';
  startDate: string;
  endDate?: string;
  salary: number;
  workingHours: number;
  jobTitle: string;
  department: string;
  terms: string;
  qiwaReference?: string;
  status: 'active' | 'expired' | 'terminated' | 'renewed';
  createdAt: string;
  updatedAt: string;
}

// جدول الحضور والانصراف
export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  overtimeHours: number;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'holiday';
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

// جدول الإجازات
export interface Leave {
  id: string;
  employeeId: string;
  requestId: string;
  type: 'annual' | 'sick' | 'maternity' | 'emergency' | 'unpaid';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

// جدول الطلبات
export interface Request {
  id: string;
  employeeId: string;
  type: 'leave' | 'advance' | 'certificate' | 'data_change' | 'resignation' | 'other';
  title: string;
  description: string;
  data: any; // بيانات مخصصة حسب نوع الطلب
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedBy: string;
  assignedTo?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  documents: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// جدول الموافقات
export interface Approval {
  id: string;
  requestId: string;
  approverId: string;
  level: number;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// جدول التقييمات
export interface Evaluation {
  id: string;
  employeeId: string;
  evaluatorId: string;
  period: string;
  year: number;
  type: 'annual' | 'probation' | 'promotion' | 'disciplinary';
  criteria: {
    [key: string]: {
      score: number;
      maxScore: number;
      comments: string;
    };
  };
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  grade: 'ممتاز' | 'جيد جداً' | 'جيد' | 'مقبول' | 'ضعيف';
  recommendations: string;
  employeeComments?: string;
  status: 'draft' | 'submitted' | 'approved' | 'final';
  createdAt: string;
  updatedAt: string;
}

// جدول التكاملات الخارجية
export interface ExternalApi {
  id: string;
  platform: 'qiwa' | 'muqeem' | 'gosi' | 'tamm';
  companyId: string;
  employeeId?: string;
  apiKey: string;
  endpoint: string;
  lastSync: string;
  syncStatus: 'success' | 'failed' | 'in_progress';
  dataPoints: number;
  errorLog?: string;
  configuration: any;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// جدول سجلات الذكاء الاصطناعي
export interface AiLog {
  id: string;
  userId: string;
  employeeId?: string;
  companyId: string;
  module: 'dashboard' | 'hr' | 'payroll' | 'attendance' | 'performance' | 'prediction';
  action: string;
  query: string;
  response: string;
  confidence: number;
  dataUsed: string[];
  processingTime: number;
  feedback?: 'helpful' | 'not_helpful';
  createdAt: string;
}

// نوع للاستعلامات المركبة
export interface DashboardMetrics {
  totalEmployees: number;
  activeEmployees: number;
  totalCompanies: number;
  attendanceRate: number;
  pendingRequests: number;
  complianceScore: number;
  totalSalaries: number;
  averageSalary: number;
}

// نوع للتنبيهات الذكية
export interface AiAlert {
  id: string;
  type: 'warning' | 'info' | 'critical' | 'success';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  action: string;
  companyId: string;
  employeeId?: string;
  module: string;
  confidence: number;
  isRead: boolean;
  dismissedAt?: string;
  createdAt: string;
}