export const workflowConfigs = {
  leave_request_v1: {
    workflowKey: "leave_request_v1",
    entity: "Request(type=leave)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 24, fallbackRole: "hr_officer" },
      { order: 2, role: "hr_officer", slaHours: 24, fallbackRole: "hr_manager" }
    ],
    onApprove: [
      { action: "DEDUCT_LEAVE_BALANCE", params: { days: "$payload.days" } },
      { action: "MARK_ATTENDANCE_ABSENCE", params: { from: "$payload.from", to: "$payload.to" } },
      { action: "EMIT_EVENT", params: { type: "LeaveApproved" } }
    ],
    onReject: [
      { action: "EMIT_EVENT", params: { type: "LeaveRejected" } }
    ],
    notifications: {
      created: ["line_manager"],
      approved: ["employeeId"],
      rejected: ["employeeId"]
    }
  },

  loan_request_v1: {
    workflowKey: "loan_request_v1",
    entity: "Request(type=loan)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 24 },
      { order: 2, role: "hr_officer", slaHours: 24 },
      { order: 3, role: "finance", slaHours: 24 }
    ],
    onApprove: [
      { action: "CREATE_LOAN_SCHEDULE", params: { amount: "$payload.amount", months: "$payload.months" } },
      { action: "EMIT_EVENT", params: { type: "LoanApproved" } }
    ],
    onReject: [
      { action: "EMIT_EVENT", params: { type: "LoanRejected" } }
    ]
  },

  promotion_transfer_v1: {
    workflowKey: "promotion_transfer_v1",
    entity: "HRAction(type=promotion|transfer)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 48 },
      { order: 2, role: "hr_manager", slaHours: 48 },
      { order: 3, role: "exec", slaHours: 72 }
    ],
    onApprove: [
      { action: "UPDATE_JOB_INFO", params: { title: "$payload.title", grade: "$payload.grade" } },
      { action: "UPDATE_PAYROLL", params: { basic: "$payload.basic", allowances: "$payload.allowances" } },
      { action: "EMIT_EVENT", params: { type: "PositionChanged" } }
    ]
  },

  salary_letter_v1: {
    workflowKey: "salary_letter_v1",
    entity: "Request(type=letter)",
    steps: [],
    auto: [
      { action: "GENERATE_PDF_LETTER", params: { template: "salary_ar_en" } },
      { action: "EMIT_EVENT", params: { type: "DocumentIssued", docType: "SalaryLetter" } }
    ]
  },

  data_change_v1: {
    workflowKey: "data_change_v1",
    entity: "Request(type=data_change)",
    steps: [
      { order: 1, role: "hr_officer", slaHours: 24 }
    ],
    onApprove: [
      { action: "UPDATE_PROFILE", params: { fields: "$payload.changes" } }
    ]
  },

  training_request_v1: {
    workflowKey: "training_request_v1",
    entity: "Request(type=training)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 24 },
      { order: 2, role: "training_officer", slaHours: 48 }
    ],
    onApprove: [
      { action: "ASSIGN_TRAINING", params: { courseId: "$payload.courseId" } }
    ]
  },

  early_exit_v1: {
    workflowKey: "early_exit_v1",
    entity: "Request(type=early_exit)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 8 }
    ],
    onApprove: [
      { action: "MARK_ATTENDANCE_EARLYEXIT", params: { date: "$payload.date" } }
    ]
  },

  resignation_v1: {
    workflowKey: "resignation_v1",
    entity: "Request(type=resignation)",
    steps: [
      { order: 1, role: "line_manager", slaHours: 48 },
      { order: 2, role: "hr_manager", slaHours: 48 }
    ],
    onApprove: [
      { action: "INITIATE_END_OF_SERVICE", params: { lastDay: "$payload.lastDay" } },
      { action: "EMIT_EVENT", params: { type: "EmployeeOffboardingStarted" } }
    ]
  },

  disciplinary_v1: {
    workflowKey: "disciplinary_v1",
    entity: "ERCase(type=disciplinary)",
    steps: [
      { order: 1, role: "er_officer", slaHours: 48 },
      { order: 2, role: "hr_manager", slaHours: 48 }
    ],
    onApprove: [
      { action: "APPLY_SANCTION", params: { sanction: "$payload.sanction" } }
    ]
  },

  incident_v1: {
    workflowKey: "incident_v1",
    entity: "HSECase(type=incident)",
    steps: [
      { order: 1, role: "hse_officer", slaHours: 24 },
      { order: 2, role: "hr_officer", slaHours: 24 }
    ],
    onApprove: [
      { action: "ARCHIVE_INCIDENT", params: { reportId: "$payload.reportId" } }
    ]
  }
};

export const getWorkflowByType = (requestType: string) => {
  const workflowMap: Record<string, string> = {
    'leave': 'leave_request_v1',
    'loan': 'loan_request_v1',
    'salary_advance': 'loan_request_v1',
    'promotion': 'promotion_transfer_v1',
    'transfer': 'promotion_transfer_v1',
    'salary_letter': 'salary_letter_v1',
    'salary_certificate': 'salary_letter_v1',
    'data_change': 'data_change_v1',
    'training': 'training_request_v1',
    'early_exit': 'early_exit_v1',
    'resignation': 'resignation_v1',
    'disciplinary': 'disciplinary_v1',
    'incident': 'incident_v1'
  };

  const workflowKey = workflowMap[requestType];
  return workflowKey ? workflowConfigs[workflowKey as keyof typeof workflowConfigs] : null;
};