import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Calendar,
  BarChart3,
  TrendingUp,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export const ComplianceAudit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for compliance audit
  const complianceOverview = {
    overallScore: 87,
    totalChecks: 156,
    passedChecks: 136,
    failedChecks: 12,
    pendingChecks: 8,
    lastAuditDate: '2024-01-15',
    nextAuditDate: '2024-04-15',
    riskLevel: 'منخفض'
  };

  const complianceCategories = [
    {
      id: 1,
      name: 'نظام العمل السعودي',
      score: 92,
      status: 'compliant',
      totalItems: 45,
      passedItems: 41,
      failedItems: 2,
      pendingItems: 2,
      lastCheck: '2024-01-15',
      riskLevel: 'منخفض',
      description: 'الامتثال لأحكام نظام العمل السعودي'
    },
    {
      id: 2,
      name: 'العقود والاتفاقيات',
      score: 88,
      status: 'compliant',
      totalItems: 32,
      passedItems: 28,
      failedItems: 2,
      pendingItems: 2,
      lastCheck: '2024-01-14',
      riskLevel: 'منخفض',
      description: 'صحة ونظامية العقود والاتفاقيات'
    },
    {
      id: 3,
      name: 'السياسات الداخلية',
      score: 75,
      status: 'needs_attention',
      totalItems: 28,
      passedItems: 21,
      failedItems: 4,
      pendingItems: 3,
      lastCheck: '2024-01-13',
      riskLevel: 'متوسط',
      description: 'تطبيق السياسات واللوائح الداخلية'
    },
    {
      id: 4,
      name: 'حماية البيانات',
      score: 95,
      status: 'compliant',
      totalItems: 22,
      passedItems: 21,
      failedItems: 0,
      pendingItems: 1,
      lastCheck: '2024-01-16',
      riskLevel: 'منخفض',
      description: 'حماية بيانات الموظفين والخصوصية'
    },
    {
      id: 5,
      name: 'السلامة المهنية',
      score: 82,
      status: 'compliant',
      totalItems: 29,
      passedItems: 24,
      failedItems: 4,
      pendingItems: 1,
      lastCheck: '2024-01-12',
      riskLevel: 'منخفض',
      description: 'معايير السلامة والصحة المهنية'
    }
  ];

  const auditFindings = [
    {
      id: 1,
      title: 'عدم تحديث عقود بعض الموظفين',
      category: 'العقود والاتفاقيات',
      severity: 'متوسط',
      status: 'open',
      description: '12 موظف لديهم عقود قديمة تحتاج تحديث حسب التعديلات الجديدة لنظام العمل',
      impact: 'مخاطر قانونية محتملة',
      recommendation: 'تحديث العقود خلال 30 يوم',
      assignedTo: 'قسم الموارد البشرية',
      dueDate: '2024-02-15',
      createdDate: '2024-01-15',
      affectedEmployees: 12
    },
    {
      id: 2,
      title: 'نقص في توثيق إجراءات السلامة',
      category: 'السلامة المهنية',
      severity: 'منخفض',
      status: 'in_progress',
      description: 'بعض الأقسام تفتقر لتوثيق كامل لإجراءات السلامة المهنية',
      impact: 'عدم امتثال كامل لمعايير السلامة',
      recommendation: 'إنشاء دليل شامل لإجراءات السلامة',
      assignedTo: 'قسم السلامة المهنية',
      dueDate: '2024-03-01',
      createdDate: '2024-01-12',
      affectedEmployees: 45
    },
    {
      id: 3,
      title: 'عدم تطبيق سياسة الإجازات بشكل منتظم',
      category: 'السياسات الداخلية',
      severity: 'عالي',
      status: 'open',
      description: 'تباين في تطبيق سياسة الإجازات بين الأقسام المختلفة',
      impact: 'عدم عدالة وانتهاك حقوق الموظفين',
      recommendation: 'توحيد تطبيق سياسة الإجازات وتدريب المديرين',
      assignedTo: 'الموارد البشرية والشؤون القانونية',
      dueDate: '2024-02-20',
      createdDate: '2024-01-13',
      affectedEmployees: 78
    },
    {
      id: 4,
      title: 'حاجة لتحديث سياسة حماية البيانات',
      category: 'حماية البيانات',
      severity: 'متوسط',
      status: 'closed',
      description: 'السياسة الحالية تحتاج تحديث لتواكب المتطلبات الجديدة',
      impact: 'مخاطر على خصوصية البيانات',
      recommendation: 'تحديث وتطوير سياسة حماية البيانات',
      assignedTo: 'قسم تقنية المعلومات',
      dueDate: '2024-01-20',
      createdDate: '2024-01-05',
      affectedEmployees: 0,
      resolvedDate: '2024-01-18'
    }
  ];

  const getComplianceScore = (score: number) => {
    if (score >= 90) return { color: 'text-green-600', bg: 'bg-green-50', label: 'ممتاز' };
    if (score >= 80) return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'جيد' };
    if (score >= 70) return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'مقبول' };
    return { color: 'text-red-600', bg: 'bg-red-50', label: 'يحتاج تحسين' };
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'compliant': { label: 'متوافق', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'needs_attention': { label: 'يحتاج انتباه', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      'non_compliant': { label: 'غير متوافق', color: 'bg-red-100 text-red-800', icon: XCircle },
      'open': { label: 'مفتوح', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'in_progress': { label: 'قيد الحل', color: 'bg-blue-100 text-blue-800', icon: RefreshCw },
      'closed': { label: 'مغلق', color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['open'];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'عالي': 'bg-red-100 text-red-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'منخفض': 'bg-green-100 text-green-800'
    };
    
    return <Badge className={severityConfig[severity as keyof typeof severityConfig]}>{severity}</Badge>;
  };

  const getRiskLevelBadge = (riskLevel: string) => {
    const riskConfig = {
      'منخفض': 'bg-green-100 text-green-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'عالي': 'bg-red-100 text-red-800'
    };
    
    return <Badge className={riskConfig[riskLevel as keyof typeof riskConfig]}>{riskLevel}</Badge>;
  };

  const handleRunAudit = () => {
    toast.success('تم بدء عملية التدقيق الشاملة');
  };

  const handleExportReport = () => {
    toast.success('تم تصدير تقرير الامتثال بنجاح');
  };

  const filteredFindings = auditFindings.filter(finding => {
    const matchesSearch = finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      finding.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || finding.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الامتثال والتدقيق القانوني</h2>
          <p className="text-gray-600 mt-2">مراقبة ومراجعة الامتثال للقوانين واللوائح</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
          <Button onClick={handleRunAudit}>
            <RefreshCw className="ml-2 h-4 w-4" />
            تدقيق شامل
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              نظرة عامة على الامتثال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{complianceOverview.overallScore}%</div>
              <p className="text-gray-600">معدل الامتثال الإجمالي</p>
              <div className="mt-4">
                {getRiskLevelBadge(complianceOverview.riskLevel)}
              </div>
            </div>
            
            <div className="space-y-3">
              <Progress value={complianceOverview.overallScore} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="font-semibold text-green-600">{complianceOverview.passedChecks}</p>
                  <p className="text-gray-600">متوافق</p>
                </div>
                <div>
                  <p className="font-semibold text-red-600">{complianceOverview.failedChecks}</p>
                  <p className="text-gray-600">غير متوافق</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-600">{complianceOverview.pendingChecks}</p>
                  <p className="text-gray-600">معلق</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الفحوصات</p>
                <p className="text-2xl font-bold">{complianceOverview.totalChecks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">آخر تدقيق</p>
                <p className="text-lg font-bold">{complianceOverview.lastAuditDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">فئات الامتثال</TabsTrigger>
          <TabsTrigger value="findings">النتائج والمخالفات</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات والإحصائيات</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceCategories.map((category) => {
              const scoreInfo = getComplianceScore(category.score);
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      {getStatusBadge(category.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${scoreInfo.color} mb-1`}>
                          {category.score}%
                        </div>
                        <Badge className={scoreInfo.bg + ' ' + scoreInfo.color}>
                          {scoreInfo.label}
                        </Badge>
                      </div>
                      
                      <Progress value={category.score} className="h-2" />
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <p className="font-semibold text-green-600">{category.passedItems}</p>
                          <p className="text-gray-600">متوافق</p>
                        </div>
                        <div>
                          <p className="font-semibold text-red-600">{category.failedItems}</p>
                          <p className="text-gray-600">مخالف</p>
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-600">{category.pendingItems}</p>
                          <p className="text-gray-600">معلق</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">مستوى المخاطر:</span>
                          {getRiskLevelBadge(category.riskLevel)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">آخر فحص:</span>
                          <span>{category.lastCheck}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600">{category.description}</p>
                      
                      <Button variant="outline" className="w-full" size="sm">
                        <Eye className="ml-2 h-4 w-4" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Findings Tab */}
        <TabsContent value="findings" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في النتائج والمخالفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline">
              <Settings className="ml-2 h-4 w-4" />
              تصفية
            </Button>
          </div>

          {/* Findings List */}
          <div className="space-y-6">
            {filteredFindings.map((finding) => (
              <Card key={finding.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">{finding.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        {getStatusBadge(finding.status)}
                        {getSeverityBadge(finding.severity)}
                        <Badge variant="outline">{finding.category}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">الوصف</p>
                      <p className="text-gray-700">{finding.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">التأثير</p>
                      <p className="text-gray-700">{finding.impact}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-800 mb-1">التوصية:</p>
                    <p className="text-blue-700">{finding.recommendation}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="font-medium">المسؤول: </span>
                        {finding.assignedTo}
                      </div>
                      <div>
                        <span className="font-medium">الموظفين المتأثرين: </span>
                        {finding.affectedEmployees}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="font-medium">تاريخ الإنشاء: </span>
                        {finding.createdDate}
                      </div>
                      <div>
                        <span className="font-medium">الموعد النهائي: </span>
                        {finding.dueDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  اتجاه الامتثال الشهري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-600">معدل الامتثال في تحسن مستمر</p>
                  <div className="mt-4 text-2xl font-bold text-green-600">+5.2%</div>
                  <p className="text-sm text-gray-500">مقارنة بالشهر الماضي</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أهم المجالات التي تحتاج تحسين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">السياسات الداخلية</span>
                    <Badge className="bg-yellow-100 text-yellow-800">75%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">السلامة المهنية</span>
                    <Badge className="bg-yellow-100 text-yellow-800">82%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">العقود والاتفاقيات</span>
                    <Badge className="bg-blue-100 text-blue-800">88%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-sm text-gray-600">تدقيقات هذا الشهر</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-sm text-gray-600">مخالفات تم حلها</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">6</div>
                  <p className="text-sm text-gray-600">مخالفات مفتوحة</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3.2</div>
                  <p className="text-sm text-gray-600">أيام متوسط الحل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};