import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Shield,
  Heart,
  Car,
  Building2,
  FileText,
  Download,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  AlertTriangle,
  Calculator,
  Calendar,
  Phone,
  Mail,
  User,
  Search,
  Filter,
  ArrowLeft,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  BarChart3,
  PieChart,
  Settings,
  RefreshCw,
  Bell
} from 'lucide-react';

interface InsuranceManagementProps {
  onBack: () => void;
}

const InsuranceManagement: React.FC<InsuranceManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Insurance Statistics
  const insuranceStats = {
    totalPremiums: 890000,
    insuredEmployees: 145,
    totalClaimsThisYear: 89,
    pendingClaims: 12,
    activePackages: 8,
    claimsApprovalRate: 87.5
  };

  // Insurance Packages Data
  const insurancePackages = [
    {
      id: 1,
      name: 'التأمين الطبي الأساسي',
      provider: 'شركة التعاونية للتأمين',
      coverage: 150000,
      premium: 2400,
      employees: 120,
      status: 'active',
      type: 'medical',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تغطية طبية أساسية تشمل العيادات الخارجية والطوارئ'
    },
    {
      id: 2,
      name: 'التأمين الطبي الشامل',
      provider: 'شركة الأهلي للتكافل',
      coverage: 300000,
      premium: 4800,
      employees: 45,
      status: 'active',
      type: 'medical',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تغطية طبية شاملة تشمل العمليات الجراحية والتنويم'
    },
    {
      id: 3,
      name: 'تأمين السيارات',
      provider: 'شركة الراجحي للتأمين',
      coverage: 200000,
      premium: 3600,
      employees: 35,
      status: 'active',
      type: 'auto',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'تأمين شامل على المركبات للموظفين المؤهلين'
    }
  ];

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'inactive': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'معلق';
      case 'inactive': return 'غير نشط';
      default: return status;
    }
  };

  const getInsuranceIcon = (type: string) => {
    switch (type) {
      case 'medical': return <Heart className="h-5 w-5 text-red-500" />;
      case 'auto': return <Car className="h-5 w-5 text-blue-500" />;
      case 'life': return <Shield className="h-5 w-5 text-green-500" />;
      case 'accident': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'property': return <Building2 className="h-5 w-5 text-purple-500" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  // Render functions
  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">إدارة التأمينات</h1>
          <p className="text-muted-foreground">إدارة باقات التأمين ومعالجة المطالبات</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          التقارير
        </Button>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          الإعدادات
        </Button>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          إضافة باقة تأمين
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">إجمالي الأقساط</p>
                <p className="text-2xl font-bold text-blue-900">{insuranceStats.totalPremiums.toLocaleString()}</p>
                <p className="text-xs text-blue-600/70 mt-1">ريال سعودي</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-muted-foreground">مقارنة بالشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">الموظفون المؤمنون</p>
                <p className="text-2xl font-bold text-green-900">{insuranceStats.insuredEmployees}</p>
                <p className="text-xs text-green-600/70 mt-1">موظف</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+8</span>
              <span className="text-sm text-muted-foreground">موظف جديد هذا الشهر</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">المطالبات المعلقة</p>
                <p className="text-2xl font-bold text-orange-900">{insuranceStats.pendingClaims}</p>
                <p className="text-xs text-orange-600/70 mt-1">مطالبة</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">متوسط المعالجة</span>
              <span className="text-sm text-muted-foreground">5 أيام</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/50" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">معدل الموافقة</p>
                <p className="text-2xl font-bold text-purple-900">{insuranceStats.claimsApprovalRate}%</p>
                <p className="text-xs text-purple-600/70 mt-1">نسبة الموافقة</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+2.3%</span>
              <span className="text-sm text-muted-foreground">تحسن هذا الربع</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div>
              <CardTitle className="text-base font-semibold">توزيع أنواع التأمين</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">نظرة عامة على الباقات النشطة</CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">التأمين الطبي</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">165 موظف</div>
                  <div className="text-xs text-muted-foreground">68%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">تأمين السيارات</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">35 موظف</div>
                  <div className="text-xs text-muted-foreground">14%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">تأمين الحياة</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">89 موظف</div>
                  <div className="text-xs text-muted-foreground">37%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div>
              <CardTitle className="text-base font-semibold">اتجاهات المطالبات</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">المطالبات المقدمة خلال الـ 6 أشهر الماضية</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'].map((month, index) => (
                <div key={month} className="flex items-center gap-4">
                  <div className="text-sm font-medium w-16">{month}</div>
                  <div className="flex-1">
                    <div className="bg-primary/10 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.random() * 80 + 20}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground w-8">
                    {Math.floor(Math.random() * 20) + 10}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-foreground">رؤى الذكاء الاصطناعي</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• معدل موافقة المطالبات الطبية أعلى بـ 15% من المتوسط الصناعي</p>
                <p>• توصية بزيادة حد التغطية للتأمين الطبي الأساسي بناءً على استخدام الموظفين</p>
                <p>• متوسط وقت معالجة المطالبات تحسن بـ 30% هذا الربع</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              عرض التفاصيل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-primary/5 hover:border-primary/20">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-medium">إدارة الباقات</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-200">
          <FileText className="h-6 w-6 text-green-600" />
          <span className="font-medium">معالجة المطالبات</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-200">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <span className="font-medium">التقارير التحليلية</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-200">
          <Settings className="h-6 w-6 text-orange-600" />
          <span className="font-medium">إعدادات النظام</span>
        </Button>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">الأنشطة الأخيرة</CardTitle>
            <CardDescription>آخر العمليات في نظام التأمينات</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            تحديث
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'موافقة على مطالبة تأمين طبي', user: 'أحمد محمد العلي', amount: '15,000 ريال', time: 'منذ 30 دقيقة', type: 'approved' },
              { action: 'إضافة باقة تأمين جديدة', user: 'إدارة الموارد البشرية', amount: 'تأمين الحوادث الشخصية', time: 'منذ ساعة', type: 'added' },
              { action: 'رفض مطالبة تأمين سيارات', user: 'خالد يوسف النمر', amount: '12,000 ريال', time: 'منذ ساعتين', type: 'rejected' },
              { action: 'تحديث بيانات باقة التأمين', user: 'نظام إدارة التأمينات', amount: 'التأمين الطبي الشامل', time: 'منذ 3 ساعات', type: 'updated' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`p-2 ${activity.type === 'approved' ? 'bg-green-100' : activity.type === 'rejected' ? 'bg-red-100' : activity.type === 'added' ? 'bg-blue-100' : 'bg-orange-100'} rounded-full`}>
                  {activity.type === 'approved' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                   activity.type === 'rejected' ? <AlertTriangle className="h-4 w-4 text-red-600" /> :
                   activity.type === 'added' ? <Plus className="h-4 w-4 text-blue-600" /> :
                   <Edit className="h-4 w-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user} • {activity.amount}</p>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {renderHeader()}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2">
              <Shield className="h-4 w-4" />
              باقات التأمين
            </TabsTrigger>
            <TabsTrigger value="claims" className="gap-2">
              <FileText className="h-4 w-4" />
              المطالبات
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Activity className="h-4 w-4" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <PieChart className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderAnalyticsDashboard()}
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>باقات التأمين المتاحة</CardTitle>
                <CardDescription>إدارة جميع باقات التأمين للموظفين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insurancePackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getInsuranceIcon(pkg.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground">{pkg.provider}</p>
                          <p className="text-xs text-muted-foreground mt-1">{pkg.employees} موظف مشترك</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold">{pkg.coverage.toLocaleString()} ريال</div>
                          <div className="text-xs text-muted-foreground">حد التغطية</div>
                        </div>
                        <Badge className={getStatusColor(pkg.status)}>
                          {getStatusText(pkg.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>مطالبات التأمين</CardTitle>
                <CardDescription>إدارة ومعالجة مطالبات الموظفين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">لا توجد مطالبات جديدة</h3>
                  <p className="text-muted-foreground mb-4">سيتم عرض المطالبات الجديدة هنا عند تقديمها</p>
                  <Button variant="outline">
                    عرض جميع المطالبات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التحليلات التفصيلية</CardTitle>
                <CardDescription>تحليل شامل لبيانات التأمينات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">التحليلات التفصيلية</h3>
                  <p className="text-muted-foreground mb-4">عرض تحليلات متقدمة لبيانات التأمينات والمطالبات</p>
                  <Button variant="outline">
                    إنشاء تقرير تحليلي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير</CardTitle>
                <CardDescription>إنشاء وتصدير التقارير المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">تقارير التأمينات</h3>
                  <p className="text-muted-foreground mb-4">إنشاء تقارير شاملة عن التأمينات والمطالبات</p>
                  <Button variant="outline">
                    إنشاء تقرير جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
                <CardDescription>تكوين إعدادات نظام التأمينات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">إعدادات التأمينات</h3>
                  <p className="text-muted-foreground mb-4">إدارة إعدادات النظام والتفضيلات</p>
                  <Button variant="outline">
                    الانتقال للإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Package Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة باقة تأمين جديدة</DialogTitle>
              <DialogDescription>
                إضافة باقة تأمين جديدة للموظفين
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="packageName">اسم الباقة</Label>
                  <Input id="packageName" placeholder="اسم باقة التأمين" />
                </div>
                <div>
                  <Label htmlFor="provider">شركة التأمين</Label>
                  <Input id="provider" placeholder="اسم شركة التأمين" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coverage">مبلغ التغطية</Label>
                  <Input id="coverage" type="number" placeholder="مبلغ التغطية بالريال" />
                </div>
                <div>
                  <Label htmlFor="premium">القسط السنوي</Label>
                  <Input id="premium" type="number" placeholder="القسط السنوي بالريال" />
                </div>
              </div>
              <div>
                <Label htmlFor="packageType">نوع التأمين</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع التأمين" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">طبي</SelectItem>
                    <SelectItem value="auto">سيارات</SelectItem>
                    <SelectItem value="life">حياة</SelectItem>
                    <SelectItem value="accident">حوادث شخصية</SelectItem>
                    <SelectItem value="property">ممتلكات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">وصف الباقة</Label>
                <Textarea id="description" placeholder="وصف تفصيلي للباقة..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => {
                  toast.success('تم إضافة باقة التأمين بنجاح');
                  setIsAddDialogOpen(false);
                }}>
                  إضافة الباقة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InsuranceManagement;