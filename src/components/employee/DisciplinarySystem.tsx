import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Gavel,
  AlertTriangle,
  FileText,
  Calendar,
  Search,
  Filter,
  Download,
  BookOpen,
  Scale,
  Clock,
  User,
  AlertCircle,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

interface SaudiLaborViolation {
  id: string;
  violation_code: string;
  category: string;
  violation_name: string;
  article_reference: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  first_action: string;
  second_action: string;
  final_action: string;
  auto_trigger_rules: any;
}

interface DisciplinaryAction {
  id: string;
  case_number: string;
  employee_id: string;
  violation_id: string;
  violation_date: string;
  description: string;
  action_type: 'verbal_warning' | 'written_warning' | 'salary_deduction' | 'suspension' | 'final_warning' | 'termination';
  status: 'pending' | 'under_review' | 'resolved' | 'escalated';
  penalty_amount: number;
  suspension_days: number;
  notes: string;
  created_at: string;
  saudi_labor_violations?: {
    violation_name: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    article_reference: string;
  };
}

interface EmployeeDisciplinaryRecord {
  id: string;
  employee_id: string;
  violation_count: number;
  total_warnings: number;
  total_penalties: number;
  last_violation_date: string;
}

const DisciplinarySystem = () => {
  const [activeTab, setActiveTab] = useState('violations');
  const [violations, setViolations] = useState<SaudiLaborViolation[]>([]);
  const [disciplinaryActions, setDisciplinaryActions] = useState<DisciplinaryAction[]>([]);
  const [employeeRecords, setEmployeeRecords] = useState<EmployeeDisciplinaryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAction, setNewAction] = useState({
    employee_id: '',
    violation_id: '',
    description: '',
    action_type: '',
    penalty_amount: 0,
    suspension_days: 0
  });

  // جلب بيانات المخالفات
  const fetchViolations = async () => {
    try {
      const { data, error } = await supabase
        .from('saudi_labor_violations')
        .select('*')
        .eq('is_active', true)
        .order('category');

      if (error) throw error;
      setViolations(data || []);
    } catch (error) {
      toast.error('خطأ في جلب بيانات المخالفات');
      console.error('Error fetching violations:', error);
    }
  };

  // جلب الإجراءات التأديبية
  const fetchDisciplinaryActions = async () => {
    try {
      const { data, error } = await supabase
        .from('disciplinary_actions')
        .select(`
          *,
          saudi_labor_violations (
            violation_name,
            category,
            severity,
            article_reference
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDisciplinaryActions(data || []);
    } catch (error) {
      toast.error('خطأ في جلب الإجراءات التأديبية');
      console.error('Error fetching disciplinary actions:', error);
    }
  };

  // جلب سجلات الموظفين التأديبية
  const fetchEmployeeRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_disciplinary_record')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setEmployeeRecords(data || []);
    } catch (error) {
      console.error('Error fetching employee records:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchViolations(),
        fetchDisciplinaryActions(),
        fetchEmployeeRecords()
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // التحقق من مخالفات الحضور
  const checkAttendanceViolations = async (employeeId: string, companyId: string) => {
    try {
      const { data, error } = await supabase.rpc('check_and_create_attendance_violations', {
        p_employee_id: employeeId,
        p_company_id: companyId
      });

      if (error) throw error;
      
      if (data && data.length > 0) {
        toast.success(`تم رصد ${data.length} مخالفة وإنشاء الإجراءات التأديبية المناسبة`);
        await fetchDisciplinaryActions();
      }
    } catch (error) {
      console.error('Error checking attendance violations:', error);
    }
  };

  // إنشاء إجراء تأديبي جديد
  const createDisciplinaryAction = async () => {
    try {
      // إنشاء رقم قضية فريد
      const { data: caseNumberData, error: caseError } = await supabase.rpc('generate_disciplinary_case_number');
      if (caseError) throw caseError;

      const { data, error } = await supabase
        .from('disciplinary_actions')
        .insert([{
          ...newAction,
          case_number: caseNumberData,
          violation_date: new Date().toISOString().split('T')[0],
          reported_by: 'current_user_id', // يجب استبدالها بـ auth.uid()
          company_id: 'company_id', // يجب استبدالها بمعرف الشركة الحالي
          action_type: newAction.action_type as 'verbal_warning' | 'written_warning' | 'salary_deduction' | 'suspension' | 'final_warning' | 'termination'
        }])
        .select();

      if (error) throw error;

      toast.success('تم إنشاء الإجراء التأديبي بنجاح');
      setIsCreateDialogOpen(false);
      setNewAction({
        employee_id: '',
        violation_id: '',
        description: '',
        action_type: '',
        penalty_amount: 0,
        suspension_days: 0
      });
      await fetchDisciplinaryActions();
    } catch (error) {
      toast.error('خطأ في إنشاء الإجراء التأديبي');
      console.error('Error creating disciplinary action:', error);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const severityMap = {
      low: { label: 'منخفض', className: 'bg-green-100 text-green-800' },
      medium: { label: 'متوسط', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'عالي', className: 'bg-red-100 text-red-800' },
      critical: { label: 'حرج', className: 'bg-red-600 text-white' }
    };
    
    const config = severityMap[severity as keyof typeof severityMap] || severityMap.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'معلق', className: 'bg-yellow-100 text-yellow-800' },
      under_review: { label: 'قيد المراجعة', className: 'bg-blue-100 text-blue-800' },
      resolved: { label: 'محلول', className: 'bg-green-100 text-green-800' },
      escalated: { label: 'مصعد', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getActionTypeBadge = (actionType: string) => {
    const actionMap = {
      verbal_warning: { label: 'إنذار شفهي', className: 'bg-blue-100 text-blue-800' },
      written_warning: { label: 'إنذار كتابي', className: 'bg-yellow-100 text-yellow-800' },
      salary_deduction: { label: 'خصم راتب', className: 'bg-orange-100 text-orange-800' },
      suspension: { label: 'إيقاف', className: 'bg-red-100 text-red-800' },
      final_warning: { label: 'إنذار نهائي', className: 'bg-red-600 text-white' },
      termination: { label: 'إنهاء خدمة', className: 'bg-gray-800 text-white' }
    };
    
    const config = actionMap[actionType as keyof typeof actionMap] || actionMap.verbal_warning;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.violation_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || violation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(violations.map(v => v.category))];

  const stats = {
    totalViolations: violations.length,
    activeActions: disciplinaryActions.filter(a => a.status === 'pending' || a.status === 'under_review').length,
    resolvedActions: disciplinaryActions.filter(a => a.status === 'resolved').length,
    employeesWithRecords: employeeRecords.length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{stats.totalViolations}</div>
            <div className="text-sm text-blue-600">أنواع المخالفات</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">{stats.activeActions}</div>
            <div className="text-sm text-yellow-600">إجراءات نشطة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{stats.resolvedActions}</div>
            <div className="text-sm text-green-600">إجراءات محلولة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <ShieldAlert className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{stats.employeesWithRecords}</div>
            <div className="text-sm text-red-600">موظفين لديهم سجل</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="violations">قاعدة المخالفات</TabsTrigger>
            <TabsTrigger value="actions">الإجراءات النشطة</TabsTrigger>
            <TabsTrigger value="records">سجلات الموظفين</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 ml-2" />
                  إجراء تأديبي جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء إجراء تأديبي جديد</DialogTitle>
                  <DialogDescription>
                    اختر نوع المخالفة والموظف المعني
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>الموظف</Label>
                    <Select value={newAction.employee_id} onValueChange={(value) => setNewAction({...newAction, employee_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                        <SelectItem value="emp2">فاطمة سعد الأحمد</SelectItem>
                        <SelectItem value="emp3">خالد يوسف النمر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>نوع المخالفة</Label>
                    <Select value={newAction.violation_id} onValueChange={(value) => setNewAction({...newAction, violation_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المخالفة" />
                      </SelectTrigger>
                      <SelectContent>
                        {violations.map((violation) => (
                          <SelectItem key={violation.id} value={violation.id}>
                            {violation.violation_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>نوع الإجراء</Label>
                    <Select value={newAction.action_type} onValueChange={(value) => setNewAction({...newAction, action_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الإجراء" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verbal_warning">إنذار شفهي</SelectItem>
                        <SelectItem value="written_warning">إنذار كتابي</SelectItem>
                        <SelectItem value="salary_deduction">خصم راتب</SelectItem>
                        <SelectItem value="suspension">إيقاف</SelectItem>
                        <SelectItem value="final_warning">إنذار نهائي</SelectItem>
                        <SelectItem value="termination">إنهاء خدمة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>تفاصيل المخالفة</Label>
                    <Textarea 
                      value={newAction.description}
                      onChange={(e) => setNewAction({...newAction, description: e.target.value})}
                      placeholder="اكتب تفاصيل المخالفة..." 
                    />
                  </div>
                  {newAction.action_type === 'salary_deduction' && (
                    <div>
                      <Label>مبلغ الخصم (ريال)</Label>
                      <Input 
                        type="number"
                        value={newAction.penalty_amount}
                        onChange={(e) => setNewAction({...newAction, penalty_amount: Number(e.target.value)})}
                        placeholder="0" 
                      />
                    </div>
                  )}
                  {newAction.action_type === 'suspension' && (
                    <div>
                      <Label>عدد أيام الإيقاف</Label>
                      <Input 
                        type="number"
                        value={newAction.suspension_days}
                        onChange={(e) => setNewAction({...newAction, suspension_days: Number(e.target.value)})}
                        placeholder="0" 
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>إلغاء</Button>
                    <Button onClick={createDisciplinaryAction}>إنشاء الإجراء</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* قاعدة المخالفات */}
        <TabsContent value="violations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6" />
                قاعدة بيانات المخالفات - نظام العمل السعودي
              </CardTitle>
              <CardDescription>
                المخالفات والإجراءات التأديبية وفقاً للمادة 80 من نظام العمل السعودي
              </CardDescription>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في المخالفات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="فلترة حسب الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredViolations.map((violation) => (
                  <Card key={violation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{violation.violation_name}</h3>
                            {getSeverityBadge(violation.severity)}
                            <Badge variant="outline">{violation.article_reference}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{violation.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-green-600">الإجراء الأول:</span>
                              <p>{violation.first_action}</p>
                            </div>
                            <div>
                              <span className="font-medium text-yellow-600">الإجراء الثاني:</span>
                              <p>{violation.second_action}</p>
                            </div>
                            <div>
                              <span className="font-medium text-red-600">الإجراء النهائي:</span>
                              <p>{violation.final_action}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="mb-2">{violation.category}</Badge>
                          <br />
                          <Button variant="outline" size="sm" className="mt-2">
                            استخدام
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الإجراءات النشطة */}
        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                الإجراءات التأديبية النشطة
              </CardTitle>
              <CardDescription>
                متابعة الإجراءات التأديبية الجارية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disciplinaryActions.map((action) => (
                  <Card key={action.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <Gavel className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">رقم القضية: {action.case_number}</h3>
                            <p className="text-sm text-muted-foreground">
                              {action.saudi_labor_violations?.violation_name}
                            </p>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">التاريخ</div>
                            <div className="text-sm text-muted-foreground">{action.violation_date}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">نوع الإجراء</div>
                            {getActionTypeBadge(action.action_type)}
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">الحالة</div>
                            {getStatusBadge(action.status)}
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 ml-1" />
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* سجلات الموظفين */}
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                سجلات الموظفين التأديبية
              </CardTitle>
              <CardDescription>
                ملخص السجل التأديبي للموظفين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeRecords.map((record) => (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">معرف الموظف: {record.employee_id}</h3>
                            <p className="text-sm text-muted-foreground">
                              آخر مخالفة: {record.last_violation_date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{record.violation_count}</div>
                            <div className="text-sm text-muted-foreground">إجمالي المخالفات</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{record.total_warnings}</div>
                            <div className="text-sm text-muted-foreground">إجمالي الإنذارات</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{record.total_penalties}</div>
                            <div className="text-sm text-muted-foreground">إجمالي الغرامات (ريال)</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <TrendingUp className="h-4 w-4 ml-1" />
                            فحص الحضور
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* التقارير */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                تقارير الإجراءات التأديبية
              </CardTitle>
              <CardDescription>
                تقارير وإحصائيات شاملة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  تقرير شهري
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  تقرير سنوي  
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  تقرير مخصص
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisciplinarySystem;