import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  FolderOpen, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Download,
  Eye,
  Edit,
  Users,
  Calendar,
  Filter,
  Search,
  BookOpen,
  Shield,
  Target
} from 'lucide-react';

export const PoliciesProcedures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('policies');

  // بيانات تجريبية للسياسات
  const policies = [
    {
      id: 1,
      code: 'POL-HR-001',
      title: 'سياسة الموارد البشرية',
      category: 'HR',
      version: '2.1',
      status: 'active',
      approvalDate: '2024-01-15',
      reviewDate: '2024-12-31',
      owner: 'إدارة الموارد البشرية',
      compliance: 95
    },
    {
      id: 2,
      code: 'POL-IT-002',
      title: 'سياسة أمن المعلومات',
      category: 'IT',
      version: '1.5',
      status: 'active',
      approvalDate: '2024-02-01',
      reviewDate: '2024-11-30',
      owner: 'إدارة تقنية المعلومات',
      compliance: 88
    },
    {
      id: 3,
      code: 'POL-FIN-003',
      title: 'سياسة الصرف والمشتريات',
      category: 'Finance',
      version: '3.0',
      status: 'under_review',
      approvalDate: '2023-12-01',
      reviewDate: '2024-12-15',
      owner: 'الإدارة المالية',
      compliance: 92
    },
    {
      id: 4,
      code: 'POL-QM-004',
      title: 'سياسة الجودة',
      category: 'Quality',
      version: '1.8',
      status: 'active',
      approvalDate: '2024-03-10',
      reviewDate: '2025-03-10',
      owner: 'إدارة الجودة',
      compliance: 97
    }
  ];

  // بيانات تجريبية للإجراءات
  const procedures = [
    {
      id: 1,
      code: 'PROC-001',
      title: 'إجراءات التوظيف والاستقطاب',
      category: 'HR',
      steps: 8,
      avgDuration: '14 يوم',
      status: 'active',
      lastUpdated: '2024-11-20'
    },
    {
      id: 2,
      code: 'PROC-002',
      title: 'إجراءات صرف المستحقات',
      category: 'Finance',
      steps: 6,
      avgDuration: '3 أيام',
      status: 'active',
      lastUpdated: '2024-11-15'
    },
    {
      id: 3,
      code: 'PROC-003',
      title: 'إجراءات طلب الإجازات',
      category: 'HR',
      steps: 4,
      avgDuration: '1 يوم',
      status: 'active',
      lastUpdated: '2024-11-25'
    }
  ];

  // إحصائيات
  const stats = {
    totalPolicies: 24,
    activePolicies: 20,
    underReview: 3,
    expired: 1,
    totalProcedures: 42,
    avgCompliance: 93
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'under_review': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'expired': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HR': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'IT': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'Finance': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Quality': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* العنوان والإحصائيات */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              السياسات والإجراءات
            </h2>
            <p className="text-muted-foreground mt-2">نظام شامل لإدارة السياسات والإجراءات المؤسسية</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              إضافة جديد
            </Button>
          </div>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي السياسات</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPolicies}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">سياسات نشطة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activePolicies}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.underReview}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">منتهية الصلاحية</p>
                  <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الإجراءات</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalProcedures}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الالتزام</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgCompliance}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التبويبات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="policies" className="flex flex-col gap-1 py-3">
            <FileText className="h-4 w-4" />
            <span className="text-xs">السياسات</span>
          </TabsTrigger>
          <TabsTrigger value="procedures" className="flex flex-col gap-1 py-3">
            <FolderOpen className="h-4 w-4" />
            <span className="text-xs">الإجراءات</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex flex-col gap-1 py-3">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">القوالب</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex flex-col gap-1 py-3">
            <Shield className="h-4 w-4" />
            <span className="text-xs">الالتزام</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4">
          {/* شريط البحث */}
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="البحث في السياسات..."
                  className="w-full pr-10 pl-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* قائمة السياسات */}
          <div className="grid gap-4">
            {policies.map((policy) => (
              <Card key={policy.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">
                            {policy.code}
                          </Badge>
                          <Badge className={getCategoryColor(policy.category)}>
                            {policy.category}
                          </Badge>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status === 'active' ? 'نشط' : 
                             policy.status === 'under_review' ? 'قيد المراجعة' : 
                             policy.status === 'expired' ? 'منتهي' : 'مسودة'}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{policy.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {policy.owner}
                          </span>
                          <span>الإصدار {policy.version}</span>
                        </div>
                      </div>
                    </div>

                    {/* شريط الالتزام */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">مستوى الالتزام</span>
                        <span className="font-bold text-foreground">{policy.compliance}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                          style={{ width: `${policy.compliance}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">تاريخ الاعتماد</p>
                        <p className="text-sm font-medium text-foreground">{policy.approvalDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">تاريخ المراجعة</p>
                        <p className="text-sm font-medium text-foreground">{policy.reviewDate}</p>
                      </div>
                      <div className="col-span-2 lg:col-span-1 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 ml-2" />
                          تعديل
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-4">
          <div className="grid gap-4">
            {procedures.map((proc) => (
              <Card key={proc.id} className="border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="font-mono text-xs">{proc.code}</Badge>
                          <Badge className={getCategoryColor(proc.category)}>{proc.category}</Badge>
                        </div>
                        <h3 className="font-bold text-foreground">{proc.title}</h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span>{proc.steps} خطوات</span>
                          <span>•</span>
                          <span>المدة المتوقعة: {proc.avgDuration}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            آخر تحديث: {proc.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">قوالب السياسات والإجراءات</h3>
                <p className="text-muted-foreground">مكتبة القوالب الجاهزة للاستخدام</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 ml-2" />
                استعراض القوالب
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">تقارير الالتزام</h3>
                <p className="text-muted-foreground">متابعة مستويات الالتزام بالسياسات والإجراءات</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                عرض التقارير
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};