import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Search, User, Award, Calendar, Download, Upload, 
  Eye, FileText, Star, Clock, CheckCircle, XCircle, Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmployeeTrainingRecords = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);

  const employeeRecords = [
    {
      id: 'EMP-001',
      name: isRTL ? 'أحمد محمد العلي' : 'Ahmed Mohamed Ali',
      avatar: '/api/placeholder/40/40',
      department: 'IT',
      position: isRTL ? 'مطور أول' : 'Senior Developer',
      email: 'ahmed.ali@company.com',
      totalTrainingHours: 120,
      completedPrograms: 8,
      ongoingPrograms: 2,
      skillsImproved: 15,
      lastActivity: '2024-06-15',
      overallProgress: 85,
      trainingHistory: [
        {
          id: 'TRN-001',
          program: isRTL ? 'تطوير مهارات القيادة' : 'Leadership Development',
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          status: 'Completed',
          score: 92,
          certificate: 'CERT-001.pdf',
          duration: '40 hours',
          feedback: isRTL ? 'برنامج ممتاز، استفدت كثيراً' : 'Excellent program, learned a lot'
        },
        {
          id: 'TRN-002',
          program: isRTL ? 'React و TypeScript' : 'React & TypeScript',
          startDate: '2024-03-01',
          endDate: '2024-04-15',
          status: 'Completed',
          score: 88,
          certificate: 'CERT-002.pdf',
          duration: '60 hours',
          feedback: isRTL ? 'تحدي تقني ممتاز' : 'Great technical challenge'
        },
        {
          id: 'TRN-003',
          program: isRTL ? 'إدارة المشاريع الرشيقة' : 'Agile Project Management',
          startDate: '2024-05-01',
          endDate: null,
          status: 'In Progress',
          score: null,
          certificate: null,
          duration: '32 hours',
          progress: 65
        }
      ],
      skills: [
        { name: 'React', level: 'Advanced', progress: 90 },
        { name: 'TypeScript', level: 'Intermediate', progress: 75 },
        { name: 'Leadership', level: 'Advanced', progress: 85 },
        { name: 'Project Management', level: 'Intermediate', progress: 65 }
      ],
      certificates: [
        { name: 'AWS Certified Developer', issueDate: '2024-01-20', expiryDate: '2027-01-20', status: 'Valid' },
        { name: 'Scrum Master Certification', issueDate: '2023-06-15', expiryDate: '2025-06-15', status: 'Valid' },
        { name: 'Leadership Excellence', issueDate: '2024-02-20', expiryDate: null, status: 'Valid' }
      ]
    },
    {
      id: 'EMP-002',
      name: isRTL ? 'فاطمة أحمد السعيد' : 'Fatima Ahmed Alsaeed',
      avatar: '/api/placeholder/40/40',
      department: 'HR',
      position: isRTL ? 'أخصائي موارد بشرية' : 'HR Specialist',
      email: 'fatima.saeed@company.com',
      totalTrainingHours: 95,
      completedPrograms: 6,
      ongoingPrograms: 1,
      skillsImproved: 12,
      lastActivity: '2024-06-12',
      overallProgress: 78,
      trainingHistory: [
        {
          id: 'TRN-004',
          program: isRTL ? 'إدارة الأداء المتقدمة' : 'Advanced Performance Management',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          status: 'Completed',
          score: 95,
          certificate: 'CERT-003.pdf',
          duration: '24 hours',
          feedback: isRTL ? 'معلومات قيمة جداً' : 'Very valuable information'
        },
        {
          id: 'TRN-005',
          program: isRTL ? 'قانون العمل والامتثال' : 'Labor Law & Compliance',
          startDate: '2024-04-15',
          endDate: null,
          status: 'In Progress',
          score: null,
          certificate: null,
          duration: '20 hours',
          progress: 40
        }
      ],
      skills: [
        { name: 'Performance Management', level: 'Advanced', progress: 95 },
        { name: 'Labor Law', level: 'Intermediate', progress: 70 },
        { name: 'Employee Relations', level: 'Advanced', progress: 88 },
        { name: 'Data Analysis', level: 'Beginner', progress: 45 }
      ],
      certificates: [
        { name: 'CIPD Level 5', issueDate: '2023-09-15', expiryDate: null, status: 'Valid' },
        { name: 'Performance Management Expert', issueDate: '2024-03-01', expiryDate: '2026-03-01', status: 'Valid' }
      ]
    },
    {
      id: 'EMP-003',
      name: isRTL ? 'محمد عبدالله النصر' : 'Mohamed Abdullah Alnasr',
      avatar: '/api/placeholder/40/40',
      department: 'Sales',
      position: isRTL ? 'مدير مبيعات' : 'Sales Manager',
      email: 'mohamed.nasr@company.com',
      totalTrainingHours: 85,
      completedPrograms: 5,
      ongoingPrograms: 3,
      skillsImproved: 10,
      lastActivity: '2024-06-14',
      overallProgress: 72,
      trainingHistory: [
        {
          id: 'TRN-006',
          program: isRTL ? 'مهارات المبيعات المتقدمة' : 'Advanced Sales Skills',
          startDate: '2024-01-10',
          endDate: '2024-02-10',
          status: 'Completed',
          score: 89,
          certificate: 'CERT-004.pdf',
          duration: '30 hours',
          feedback: isRTL ? 'استراتيجيات فعالة جداً' : 'Very effective strategies'
        }
      ],
      skills: [
        { name: 'Sales Techniques', level: 'Advanced', progress: 89 },
        { name: 'Customer Relations', level: 'Advanced', progress: 92 },
        { name: 'Negotiation', level: 'Intermediate', progress: 73 },
        { name: 'Team Leadership', level: 'Intermediate', progress: 68 }
      ],
      certificates: [
        { name: 'Certified Sales Professional', issueDate: '2024-02-15', expiryDate: '2026-02-15', status: 'Valid' },
        { name: 'Customer Relationship Management', issueDate: '2023-11-20', expiryDate: null, status: 'Valid' }
      ]
    }
  ];

  const departments = [
    { value: 'all', label: isRTL ? 'جميع الأقسام' : 'All Departments' },
    { value: 'IT', label: isRTL ? 'تقنية المعلومات' : 'IT' },
    { value: 'HR', label: isRTL ? 'الموارد البشرية' : 'HR' },
    { value: 'Sales', label: isRTL ? 'المبيعات' : 'Sales' },
    { value: 'Finance', label: isRTL ? 'المالية' : 'Finance' },
    { value: 'Marketing', label: isRTL ? 'التسويق' : 'Marketing' }
  ];

  const statusOptions = [
    { value: 'all', label: isRTL ? 'جميع الحالات' : 'All Status' },
    { value: 'active', label: isRTL ? 'نشط' : 'Active' },
    { value: 'completed', label: isRTL ? 'مكتمل' : 'Completed' },
    { value: 'pending', label: isRTL ? 'معلق' : 'Pending' }
  ];

  const filteredEmployees = employeeRecords.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleViewRecord = (employee) => {
    setSelectedEmployee(employee);
    setIsRecordDialogOpen(true);
  };

  const handleDownloadCertificate = (certificate) => {
    toast({
      title: isRTL ? 'جاري التحميل' : 'Downloading',
      description: isRTL ? `تحميل شهادة ${certificate}` : `Downloading certificate ${certificate}`
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Completed': { variant: 'default', color: 'bg-green-100 text-green-800' },
      'In Progress': { variant: 'secondary', color: 'bg-blue-100 text-blue-800' },
      'Pending': { variant: 'outline', color: 'bg-yellow-100 text-yellow-800' },
      'Failed': { variant: 'destructive', color: 'bg-red-100 text-red-800' }
    };
    
    return statusConfig[status] || { variant: 'default', color: 'bg-gray-100 text-gray-800' };
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'text-green-600';
      case 'Intermediate': return 'text-blue-600';
      case 'Beginner': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'سجلات تدريب الموظفين' : 'Employee Training Records'}</h2>
          <p className="text-muted-foreground">
            {isRTL ? 'تتبع وإدارة سجلات التدريب والشهادات لجميع الموظفين' : 'Track and manage training records and certifications for all employees'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {isRTL ? 'رفع شهادة' : 'Upload Certificate'}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير السجلات' : 'Export Records'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في الموظفين...' : 'Search employees...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                  <Badge variant="outline" className="text-xs">{employee.department}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Overview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{isRTL ? 'التقدم العام' : 'Overall Progress'}</span>
                  <span className="font-semibold text-primary">{employee.overallProgress}%</span>
                </div>
                <Progress value={employee.overallProgress} className="h-2" />
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-primary">{employee.completedPrograms}</div>
                  <div className="text-muted-foreground">{isRTL ? 'برامج مكتملة' : 'Completed'}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-chart-2">{employee.ongoingPrograms}</div>
                  <div className="text-muted-foreground">{isRTL ? 'برامج جارية' : 'Ongoing'}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-chart-3">{employee.totalTrainingHours}h</div>
                  <div className="text-muted-foreground">{isRTL ? 'ساعات تدريب' : 'Training Hours'}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-chart-4">{employee.skillsImproved}</div>
                  <div className="text-muted-foreground">{isRTL ? 'مهارات محسنة' : 'Skills Improved'}</div>
                </div>
              </div>
              
              {/* Last Activity */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{isRTL ? 'آخر نشاط:' : 'Last Activity:'}</span>
                <span>{employee.lastActivity}</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewRecord(employee)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {isRTL ? 'عرض السجل' : 'View Record'}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'تقرير' : 'Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Detail Dialog */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedEmployee && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                    <AvatarFallback>{selectedEmployee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedEmployee.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.position} - {selectedEmployee.department}</p>
                  </div>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
              {/* Training History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {isRTL ? 'تاريخ التدريب' : 'Training History'}
                </h3>
                <div className="space-y-3">
                  {selectedEmployee.trainingHistory.map((training) => (
                    <Card key={training.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{training.program}</h4>
                        <Badge className={getStatusBadge(training.status).color}>
                          {training.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                        <div>{isRTL ? 'البداية:' : 'Start:'} {training.startDate}</div>
                        <div>{isRTL ? 'المدة:' : 'Duration:'} {training.duration}</div>
                        {training.endDate && <div>{isRTL ? 'النهاية:' : 'End:'} {training.endDate}</div>}
                        {training.score && <div>{isRTL ? 'النتيجة:' : 'Score:'} {training.score}%</div>}
                      </div>
                      {training.progress && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                            <span>{training.progress}%</span>
                          </div>
                          <Progress value={training.progress} className="h-2" />
                        </div>
                      )}
                      {training.certificate && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadCertificate(training.certificate)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            {isRTL ? 'الشهادة' : 'Certificate'}
                          </Button>
                        </div>
                      )}
                      {training.feedback && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                          <strong>{isRTL ? 'التقييم:' : 'Feedback:'}</strong> {training.feedback}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Skills & Certificates */}
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5" />
                    {isRTL ? 'المهارات المطورة' : 'Skills Developed'}
                  </h3>
                  <div className="space-y-3">
                    {selectedEmployee.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getSkillLevelColor(skill.level)}>
                              {skill.level}
                            </Badge>
                            <span className="text-sm font-semibold">{skill.progress}%</span>
                          </div>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Certificates */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5" />
                    {isRTL ? 'الشهادات والاعتمادات' : 'Certificates & Certifications'}
                  </h3>
                  <div className="space-y-3">
                    {selectedEmployee.certificates.map((cert, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <Badge variant={cert.status === 'Valid' ? 'default' : 'destructive'}>
                            {cert.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>{isRTL ? 'تاريخ الإصدار:' : 'Issued:'} {cert.issueDate}</div>
                          {cert.expiryDate && (
                            <div>{isRTL ? 'تاريخ الانتهاء:' : 'Expires:'} {cert.expiryDate}</div>
                          )}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            {isRTL ? 'عرض' : 'View'}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            {isRTL ? 'تحميل' : 'Download'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeTrainingRecords;