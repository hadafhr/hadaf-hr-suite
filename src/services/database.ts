// خدمات قاعدة البيانات لمنصة إدارة المنشآت والموظفين
import { 
  Company, Employee, User, Job, Department, Salary, Contract, 
  Attendance, Leave, Request, Evaluation, ExternalApi, AiLog,
  DashboardMetrics, AiAlert, Branch, Approval, PayrollCycle
} from '@/types/database';

// محاكي قاعدة البيانات - في البيئة الإنتاجية سيتم الاستعاضة عنها بـ API حقيقي
export class DatabaseService {
  
  // ========== الشركات والمنشآت ==========
  static async getCompanies(): Promise<Company[]> {
    // محاكي البيانات
    return [
      {
        id: '1',
        name: 'شركة التقنية المتقدمة المحدودة',
        commercialRecord: '1010123456',
        unifiedNumber: '700123456700003',
        sector: 'تقنية المعلومات',
        status: 'نشط',
        establishmentDate: '2020-01-15',
        address: {
          city: 'الرياض',
          district: 'العليا',
          street: 'طريق الملك فهد',
          postalCode: '12211'
        },
        contactInfo: {
          phone: '+966112345678',
          email: 'info@techcompany.sa',
          website: 'www.techcompany.sa'
        },
        range: 'أخضر',
        compliance: 94,
        licenses: {
          qiwa: 'نشط',
          municipal: 'نشط',
          gosi: 'نشط'
        },
        saudiPercentage: 65,
        totalEmployees: 156,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      }
    ];
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    const companies = await this.getCompanies();
    return companies.find(c => c.id === id) || null;
  }

  static async createCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const newCompany: Company = {
      ...company,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newCompany;
  }

  // ========== الموظفين ==========
  static async getEmployees(companyId?: string): Promise<Employee[]> {
    const employees: Employee[] = [
      {
        id: '1',
        companyId: '1',
        branchId: '1',
        jobId: '1',
        employeeNumber: 'EMP001',
        firstName: 'أحمد',
        lastName: 'محمد العلي',
        nationalId: '1234567890',
        iqamaId: 'A123456789',
        nationality: 'سعودي',
        dateOfBirth: '1990-05-15',
        gender: 'male',
        maritalStatus: 'married',
        contactInfo: {
          phone: '+966501234567',
          email: 'ahmed.ali@company.sa',
          emergencyContact: {
            name: 'محمد العلي',
            relationship: 'أب',
            phone: '+966505556677'
          }
        },
        address: {
          city: 'الرياض',
          district: 'النرجس',
          street: 'شارع التخصصي',
          postalCode: '12245'
        },
        status: 'على رأس العمل',
        hireDate: '2023-01-15',
        probationEndDate: '2023-04-15',
        bankInfo: {
          bankName: 'البنك الأهلي السعودي',
          accountNumber: '123456789',
          iban: 'SA1234567890123456789'
        },
        performance: 'ممتاز',
        warningsCount: 0,
        leaveBalance: 25,
        gosiRegistered: true,
        selfServiceAccess: true,
        createdAt: '2023-01-15T08:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      }
    ];

    return companyId ? employees.filter(e => e.companyId === companyId) : employees;
  }

  static async getEmployeeById(id: string): Promise<Employee | null> {
    const employees = await this.getEmployees();
    return employees.find(e => e.id === id) || null;
  }

  // ========== الحضور والانصراف ==========
  static async getAttendance(employeeId?: string, date?: string): Promise<Attendance[]> {
    const attendance: Attendance[] = [
      {
        id: '1',
        employeeId: '1',
        date: '2024-01-20',
        checkIn: '08:00:00',
        checkOut: '17:00:00',
        breakStart: '12:00:00',
        breakEnd: '13:00:00',
        totalHours: 8,
        overtimeHours: 0,
        status: 'present',
        location: {
          latitude: 24.7136,
          longitude: 46.6753,
          address: 'مكتب الشركة الرئيسي'
        },
        createdAt: '2024-01-20T08:00:00Z',
        updatedAt: '2024-01-20T17:00:00Z'
      }
    ];

    let filtered = attendance;
    if (employeeId) {
      filtered = filtered.filter(a => a.employeeId === employeeId);
    }
    if (date) {
      filtered = filtered.filter(a => a.date === date);
    }
    return filtered;
  }

  // ========== الإجازات ==========
  static async getLeaves(employeeId?: string): Promise<Leave[]> {
    const leaves: Leave[] = [
      {
        id: '1',
        employeeId: '1',
        requestId: 'REQ001',
        type: 'annual',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
        totalDays: 5,
        reason: 'إجازة سنوية',
        status: 'approved',
        approvedBy: 'manager1',
        approvedAt: '2024-01-25T10:00:00Z',
        documents: [],
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-01-25T10:00:00Z'
      }
    ];

    return employeeId ? leaves.filter(l => l.employeeId === employeeId) : leaves;
  }

  // ========== الطلبات ==========
  static async getRequests(employeeId?: string): Promise<Request[]> {
    const requests: Request[] = [
      {
        id: '1',
        employeeId: '1',
        type: 'leave',
        title: 'طلب إجازة سنوية',
        description: 'طلب إجازة سنوية لمدة 5 أيام',
        data: {
          startDate: '2024-02-01',
          endDate: '2024-02-05',
          leaveType: 'annual'
        },
        status: 'approved',
        priority: 'medium',
        submittedBy: '1',
        assignedTo: 'manager1',
        approvedBy: 'manager1',
        approvedAt: '2024-01-25T10:00:00Z',
        documents: [],
        dueDate: '2024-01-30',
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-01-25T10:00:00Z'
      }
    ];

    return employeeId ? requests.filter(r => r.employeeId === employeeId) : requests;
  }

  // ========== الرواتب ==========
  static async getSalaries(employeeId?: string): Promise<Salary[]> {
    const salaries: Salary[] = [
      {
        id: '1',
        employeeId: '1',
        payrollCycleId: 'PC_2024_01',
        baseSalary: 12000,
        allowances: {
          housing: 2000,
          transportation: 500,
          communication: 200,
          other: 0
        },
        deductions: {
          gosi: 1080,
          tax: 0,
          loan: 0,
          other: 0
        },
        bonus: 1000,
        overtime: 0,
        netSalary: 14620,
        paymentDate: '2024-01-30',
        status: 'paid',
        createdAt: '2024-01-25T00:00:00Z',
        updatedAt: '2024-01-30T15:00:00Z'
      }
    ];

    return employeeId ? salaries.filter(s => s.employeeId === employeeId) : salaries;
  }

  // ========== التقييمات ==========
  static async getEvaluations(employeeId?: string): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = [
      {
        id: '1',
        employeeId: '1',
        evaluatorId: 'manager1',
        period: '2023',
        year: 2023,
        type: 'annual',
        criteria: {
          'الجودة': { score: 9, maxScore: 10, comments: 'ممتاز في جودة العمل' },
          'الالتزام': { score: 10, maxScore: 10, comments: 'ملتزم جداً بالمواعيد' },
          'التعاون': { score: 8, maxScore: 10, comments: 'متعاون مع الفريق' },
          'الإبداع': { score: 9, maxScore: 10, comments: 'مبدع في الحلول' }
        },
        totalScore: 36,
        maxTotalScore: 40,
        percentage: 90,
        grade: 'ممتاز',
        recommendations: 'ترشيح للترقية',
        status: 'final',
        createdAt: '2023-12-15T00:00:00Z',
        updatedAt: '2023-12-20T00:00:00Z'
      }
    ];

    return employeeId ? evaluations.filter(e => e.employeeId === employeeId) : evaluations;
  }

  // ========== التكاملات الخارجية ==========
  static async getExternalApiIntegrations(companyId?: string): Promise<ExternalApi[]> {
    const integrations: ExternalApi[] = [
      {
        id: '1',
        platform: 'qiwa',
        companyId: '1',
        apiKey: 'qiwa_api_key_encrypted',
        endpoint: 'https://api.qiwa.sa/v1/',
        lastSync: '2024-01-20T14:30:00Z',
        syncStatus: 'success',
        dataPoints: 245,
        configuration: {
          autoSync: true,
          syncInterval: '24h'
        },
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      },
      {
        id: '2',
        platform: 'gosi',
        companyId: '1',
        apiKey: 'gosi_api_key_encrypted',
        endpoint: 'https://api.gosi.gov.sa/v1/',
        lastSync: '2024-01-20T14:15:00Z',
        syncStatus: 'success',
        dataPoints: 245,
        configuration: {
          autoSync: true,
          syncInterval: '24h'
        },
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-20T14:15:00Z'
      }
    ];

    return companyId ? integrations.filter(i => i.companyId === companyId) : integrations;
  }

  // ========== سجلات الذكاء الاصطناعي ==========
  static async getAiLogs(userId?: string): Promise<AiLog[]> {
    const logs: AiLog[] = [
      {
        id: '1',
        userId: '1',
        companyId: '1',
        module: 'dashboard',
        action: 'generate_insights',
        query: 'كم موظف على رأس العمل اليوم؟',
        response: 'يوجد 245 موظف على رأس العمل اليوم، منهم 225 حاضر و 20 غائب',
        confidence: 95,
        dataUsed: ['employees', 'attendance'],
        processingTime: 1200,
        feedback: 'helpful',
        createdAt: '2024-01-20T14:30:00Z'
      }
    ];

    return userId ? logs.filter(l => l.userId === userId) : logs;
  }

  // ========== التنبيهات الذكية ==========
  static async getAiAlerts(companyId?: string): Promise<AiAlert[]> {
    const alerts: AiAlert[] = [
      {
        id: '1',
        type: 'warning',
        title: 'تحذير من هبوط النطاق',
        description: 'منشأة شركة التقنية المتقدمة معرضة لهبوط النطاق خلال 30 يوم بسبب نسبة السعودة',
        priority: 'high',
        action: 'مراجعة خطة السعودة',
        companyId: '1',
        module: 'compliance',
        confidence: 89,
        isRead: false,
        createdAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        type: 'critical',
        title: 'موظف يحتاج مراجعة تأديبية',
        description: 'الموظف أحمد سالم تجاوز 3 إنذارات ويحتاج مراجعة تأديبية عاجلة',
        priority: 'urgent',
        action: 'مراجعة تأديبية فورية',
        companyId: '1',
        employeeId: '2',
        module: 'hr',
        confidence: 95,
        isRead: false,
        createdAt: '2024-01-20T11:30:00Z'
      }
    ];

    return companyId ? alerts.filter(a => a.companyId === companyId) : alerts;
  }

  // ========== مؤشرات الأداء ==========
  static async getDashboardMetrics(companyId?: string): Promise<DashboardMetrics> {
    return {
      totalEmployees: 245,
      activeEmployees: 225,
      totalCompanies: 12,
      attendanceRate: 92,
      pendingRequests: 7,
      complianceScore: 94,
      totalSalaries: 2450000,
      averageSalary: 10612
    };
  }

  // ========== البحث والتصفية ==========
  static async searchEmployees(query: string, companyId?: string): Promise<Employee[]> {
    const employees = await this.getEmployees(companyId);
    return employees.filter(emp => 
      emp.firstName.includes(query) || 
      emp.lastName.includes(query) ||
      emp.employeeNumber.includes(query) ||
      emp.nationalId?.includes(query) ||
      emp.iqamaId?.includes(query)
    );
  }

  // ========== تحديث البيانات ==========
  static async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
    const employee = await this.getEmployeeById(id);
    if (!employee) return null;
    
    return {
      ...employee,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  }

  // ========== مزامنة البيانات الحكومية ==========
  static async syncWithGovernmentPlatform(platform: 'qiwa' | 'gosi' | 'muqeem' | 'tamm', companyId: string): Promise<{
    success: boolean;
    message: string;
    syncedRecords: number;
  }> {
    // محاكي عملية المزامنة
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      message: `تمت مزامنة البيانات مع منصة ${platform} بنجاح`,
      syncedRecords: Math.floor(Math.random() * 100) + 50
    };
  }

  // ========== إنشاء التقارير ==========
  static async generateReport(type: 'employees' | 'attendance' | 'payroll' | 'compliance', filters: any): Promise<{
    data: any[];
    summary: any;
    generatedAt: string;
  }> {
    const data = [];
    const summary = {};
    
    switch (type) {
      case 'employees':
        data.push(...await this.getEmployees());
        break;
      case 'attendance':
        data.push(...await this.getAttendance());
        break;
      case 'payroll':
        data.push(...await this.getSalaries());
        break;
      case 'compliance':
        const companies = await this.getCompanies();
        data.push(...companies);
        break;
    }

    return {
      data,
      summary,
      generatedAt: new Date().toISOString()
    };
  }
}

// مصدر أحداث البيانات للتحديثات المباشرة
export class DataEventService {
  private static listeners: Map<string, Function[]> = new Map();

  static subscribe(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  static emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  static unsubscribe(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}