import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, ArrowRight, Link, Eye } from 'lucide-react';

// مخطط قاعدة البيانات المرئي
const DatabaseSchema: React.FC = () => {
  const tables = [
    {
      name: 'companies',
      title: 'الشركات/المنشآت',
      description: 'بيانات المنشأة الرئيسية (السجل التجاري، النطاق، التصنيف)',
      fields: ['id', 'name', 'commercial_record', 'unified_number', 'sector', 'status', 'range', 'compliance'],
      relationships: ['users', 'branches', 'employees'],
      color: 'bg-primary/10 border-primary/30'
    },
    {
      name: 'branches',
      title: 'الفروع',
      description: 'فروع المنشأة ومواقعها الجغرافية',
      fields: ['id', 'company_id', 'name', 'code', 'address', 'manager', 'employee_count'],
      relationships: ['companies'],
      color: 'bg-secondary/10 border-secondary/30'
    },
    {
      name: 'users',
      title: 'المستخدمين',
      description: 'حسابات الدخول للمستخدمين (أدوار، صلاحيات)',
      fields: ['id', 'username', 'email', 'role', 'permissions', 'company_id', 'employee_id'],
      relationships: ['employees', 'companies'],
      color: 'bg-accent/10 border-accent/30'
    },
    {
      name: 'employees',
      title: 'الموظفين',
      description: 'بيانات الموظفين الأساسية والوظيفية',
      fields: ['id', 'company_id', 'job_id', 'employee_number', 'first_name', 'last_name', 'national_id', 'status'],
      relationships: ['jobs', 'salaries', 'contracts', 'attendances', 'leaves', 'requests', 'evaluations'],
      color: 'bg-success/10 border-success/30'
    },
    {
      name: 'jobs',
      title: 'الوظائف',
      description: 'الوظائف والمسميات وربطها بالإدارات',
      fields: ['id', 'title', 'code', 'department_id', 'level', 'salary_range'],
      relationships: ['departments', 'employees'],
      color: 'bg-warning/10 border-warning/30'
    },
    {
      name: 'departments',
      title: 'الأقسام',
      description: 'أقسام الشركة والهيكل التنظيمي',
      fields: ['id', 'company_id', 'name', 'code', 'manager_id', 'parent_department_id'],
      relationships: ['jobs', 'companies'],
      color: 'bg-info/10 border-info/30'
    },
    {
      name: 'salaries',
      title: 'الرواتب',
      description: 'تفاصيل الرواتب والحسميات والمكافآت',
      fields: ['id', 'employee_id', 'payroll_cycle_id', 'base_salary', 'allowances', 'deductions', 'net_salary'],
      relationships: ['employees', 'payroll_cycles'],
      color: 'bg-destructive/10 border-destructive/30'
    },
    {
      name: 'contracts',
      title: 'العقود',
      description: 'عقود العمل المرتبطة بمنصة قوى',
      fields: ['id', 'employee_id', 'company_id', 'contract_number', 'type', 'start_date', 'qiwa_reference'],
      relationships: ['employees', 'companies', 'external_apis'],
      color: 'bg-muted/10 border-muted/30'
    },
    {
      name: 'attendances',
      title: 'الحضور والانصراف',
      description: 'سجلات الحضور والانصراف اليومية',
      fields: ['id', 'employee_id', 'date', 'check_in', 'check_out', 'total_hours', 'status'],
      relationships: ['employees'],
      color: 'bg-primary/10 border-primary/30'
    },
    {
      name: 'leaves',
      title: 'الإجازات',
      description: 'طلبات الإجازات ومعلومات الرصيد والموافقة',
      fields: ['id', 'employee_id', 'request_id', 'type', 'start_date', 'end_date', 'status'],
      relationships: ['employees', 'requests', 'approvals'],
      color: 'bg-secondary/10 border-secondary/30'
    },
    {
      name: 'requests',
      title: 'الطلبات',
      description: 'كافة الطلبات الذاتية (سلفة، تعريف، تعديل بيانات...)',
      fields: ['id', 'employee_id', 'type', 'title', 'description', 'status', 'priority'],
      relationships: ['employees', 'users', 'approvals'],
      color: 'bg-accent/10 border-accent/30'
    },
    {
      name: 'approvals',
      title: 'الموافقات',
      description: 'نظام الموافقات والتصاريح',
      fields: ['id', 'request_id', 'approver_id', 'level', 'status', 'comments'],
      relationships: ['requests', 'users'],
      color: 'bg-success/10 border-success/30'
    },
    {
      name: 'evaluations',
      title: 'التقييمات',
      description: 'تقييمات الأداء وربطها بالمشرفين والمدراء',
      fields: ['id', 'employee_id', 'evaluator_id', 'period', 'criteria', 'total_score', 'grade'],
      relationships: ['employees', 'users'],
      color: 'bg-warning/10 border-warning/30'
    },
    {
      name: 'external_apis',
      title: 'التكاملات الخارجية',
      description: 'بيانات الربط مع المنصات الخارجية (قوى، تقييم، التأمينات)',
      fields: ['id', 'platform', 'company_id', 'employee_id', 'api_key', 'last_sync', 'sync_status'],
      relationships: ['companies', 'employees'],
      color: 'bg-info/10 border-info/30'
    },
    {
      name: 'ai_logs',
      title: 'سجلات الذكاء الاصطناعي',
      description: 'سجل استخدامات الذكاء الاصطناعي والتنبيهات التنبؤية',
      fields: ['id', 'user_id', 'employee_id', 'module', 'action', 'query', 'response', 'confidence'],
      relationships: ['users', 'employees'],
      color: 'bg-destructive/10 border-destructive/30'
    },
    {
      name: 'payroll_cycles',
      title: 'دورات الرواتب',
      description: 'دورات إعداد وصرف الرواتب الشهرية',
      fields: ['id', 'company_id', 'title', 'year', 'month', 'status', 'total_amount'],
      relationships: ['companies', 'salaries'],
      color: 'bg-muted/10 border-muted/30'
    }
  ];

  const getRelationshipConnections = (tableName: string) => {
    const table = tables.find(t => t.name === tableName);
    return table?.relationships || [];
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3 mb-4">
          <Database className="h-8 w-8 text-primary" />
          خريطة قاعدة البيانات - منصة إدارة المنشآت والموظفين
        </h1>
        <p className="text-muted-foreground text-lg">
          مخطط تفصيلي للجداول والعلاقات في نظام إدارة الموارد البشرية
        </p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{tables.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الجداول</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {tables.reduce((sum, table) => sum + table.relationships.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي العلاقات</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {tables.reduce((sum, table) => sum + table.fields.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي الحقول</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">5</div>
            <div className="text-sm text-muted-foreground">التكاملات الخارجية</div>
          </CardContent>
        </Card>
      </div>

      {/* مخطط الجداول */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => (
          <Card key={table.name} className={`${table.color} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{table.title}</span>
                <Database className="h-4 w-4" />
              </CardTitle>
              <CardDescription className="text-xs">
                {table.description}
              </CardDescription>
              <Badge variant="outline" className="text-xs w-fit">
                {table.name}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* الحقول الرئيسية */}
              <div>
                <p className="text-xs font-medium mb-2">الحقول الرئيسية:</p>
                <div className="flex flex-wrap gap-1">
                  {table.fields.slice(0, 4).map((field) => (
                    <Badge key={field} variant="secondary" className="text-xs">
                      {field}
                    </Badge>
                  ))}
                  {table.fields.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{table.fields.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              {/* العلاقات */}
              {table.relationships.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2">مرتبط بـ:</p>
                  <div className="flex flex-wrap gap-1">
                    {table.relationships.slice(0, 3).map((relation) => (
                      <div key={relation} className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                          {relation}
                        </Badge>
                      </div>
                    ))}
                    {table.relationships.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{table.relationships.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Button variant="outline" size="sm" className="w-full text-xs">
                <Eye className="h-3 w-3 mr-2" />
                عرض التفاصيل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* العلاقات الرئيسية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            العلاقات الأساسية في النظام
          </CardTitle>
          <CardDescription>
            العلاقات المحورية بين الجداول الرئيسية في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-primary/10 text-primary border-primary">companies</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge className="bg-success/10 text-success border-success">employees</Badge>
              <span className="text-sm text-muted-foreground">علاقة واحد إلى متعدد</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-success/10 text-success border-success">employees</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge className="bg-primary/10 text-primary border-primary">attendances</Badge>
              <span className="text-sm text-muted-foreground">علاقة واحد إلى متعدد</span>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-accent/10 text-accent border-accent">requests</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge className="bg-success/10 text-success border-success">approvals</Badge>
              <span className="text-sm text-muted-foreground">علاقة واحد إلى متعدد</span>
            </div>

            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Badge className="bg-primary/10 text-primary border-primary">companies</Badge>
              <ArrowRight className="h-4 w-4" />
              <Badge className="bg-info/10 text-info border-info">external_apis</Badge>
              <span className="text-sm text-muted-foreground">تكامل مع المنصات الحكومية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ملاحظات التنفيذ */}
      <Card>
        <CardHeader>
          <CardTitle>ملاحظات هامة للتنفيذ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/30 rounded-lg">
            <div className="w-2 h-2 bg-info rounded-full mt-2" />
            <div>
              <p className="font-medium text-sm">التكامل مع المنصات الحكومية</p>
              <p className="text-xs text-muted-foreground">
                جدول external_apis يدير كافة التكاملات مع قوى، تقييم، التأمينات، وتم
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="w-2 h-2 bg-warning rounded-full mt-2" />
            <div>
              <p className="font-medium text-sm">الذكاء الاصطناعي</p>
              <p className="text-xs text-muted-foreground">
                جدول ai_logs يحفظ كافة التفاعلات مع النظام الذكي لتحسين الأداء
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/30 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full mt-2" />
            <div>
              <p className="font-medium text-sm">الأمان والصلاحيات</p>
              <p className="text-xs text-muted-foreground">
                جدول users يدير الصلاحيات والأدوار بشكل مرن ومتقدم
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
            <div>
              <p className="font-medium text-sm">الأداء والفهرسة</p>
              <p className="text-xs text-muted-foreground">
                ضرورة إنشاء فهارس مناسبة للحقول المستخدمة في البحث والتصفية
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSchema;