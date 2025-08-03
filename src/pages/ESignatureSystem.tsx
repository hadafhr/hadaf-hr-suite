import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  PenTool, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  Settings,
  Lock,
  Globe,
  UserCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for demonstration
const mockDocuments = [
  {
    id: '1',
    title: 'عقد عمل - أحمد محمد',
    type: 'contract',
    status: 'pending',
    signatories: ['أحمد محمد', 'مدير الموارد البشرية'],
    createdAt: '2024-01-15',
    dueDate: '2024-01-22',
    progress: 50
  },
  {
    id: '2',
    title: 'إنذار كتابي - سارة أحمد',
    type: 'warning',
    status: 'completed',
    signatories: ['سارة أحمد', 'مدير المبيعات'],
    createdAt: '2024-01-10',
    completedAt: '2024-01-12',
    progress: 100
  },
  {
    id: '3',
    title: 'سياسة الشركة الجديدة',
    type: 'policy',
    status: 'draft',
    signatories: ['جميع الموظفين'],
    createdAt: '2024-01-20',
    progress: 0
  }
];

const subscriptionPlans = [
  {
    name: 'المبتدئ',
    price: '299',
    documents: '50',
    features: ['توقيع إلكتروني أساسي', 'تخزين آمن', 'دعم فني أساسي'],
    color: 'bg-blue-500'
  },
  {
    name: 'النمو',
    price: '599',
    documents: '200',
    features: ['توقيع متقدم', 'تكامل نفاذ', 'تقارير شاملة', 'دعم فني متقدم'],
    color: 'bg-green-500',
    popular: true
  },
  {
    name: 'المؤسسات',
    price: '1299',
    documents: 'غير محدود',
    features: ['جميع المميزات', 'API مخصص', 'دعم مخصص 24/7', 'تخصيص كامل'],
    color: 'bg-purple-500'
  }
];

const analytics = {
  totalDocuments: 156,
  signedDocuments: 98,
  pendingDocuments: 45,
  rejectedDocuments: 13,
  monthlyGrowth: 23,
  avgSigningTime: '2.4 أيام'
};

export const ESignatureSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'pending': return 'في الانتظار';
      case 'draft': return 'مسودة';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              نظام التوقيع الإلكتروني الآمن
            </h1>
            <p className="text-muted-foreground">
              نظام توقيع متوافق مع نفاذ ولوائح المملكة العربية السعودية
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              متوافق مع نفاذ
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              شهادة معتمدة
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              المستندات
            </TabsTrigger>
            <TabsTrigger value="signatures" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              التوقيعات
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الامتثال
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              الخطط
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المستندات</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{analytics.totalDocuments}</div>
                  <p className="text-xs text-muted-foreground">+{analytics.monthlyGrowth}% هذا الشهر</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المستندات الموقعة</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{analytics.signedDocuments}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((analytics.signedDocuments / analytics.totalDocuments) * 100)}% من الإجمالي
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{analytics.pendingDocuments}</div>
                  <p className="text-xs text-muted-foreground">متوسط الوقت: {analytics.avgSigningTime}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المرفوضة</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{analytics.rejectedDocuments}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((analytics.rejectedDocuments / analytics.totalDocuments) * 100)}% من الإجمالي
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDocuments.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {doc.signatories.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={doc.progress} className="w-20" />
                        <Badge className={`${getStatusColor(doc.status)} text-white`}>
                          {getStatusText(doc.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث في المستندات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="pending">في الانتظار</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="rejected">مرفوض</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                رفع مستند جديد
              </Button>
            </div>

            {/* Documents List */}
            <div className="grid gap-4">
              {mockDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <FileText className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{doc.title}</h3>
                          <p className="text-muted-foreground">
                            الموقعون: {doc.signatories.join(', ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            تاريخ الإنشاء: {doc.createdAt}
                            {doc.dueDate && ` | تاريخ الاستحقاق: ${doc.dueDate}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Progress value={doc.progress} className="w-20 mb-2" />
                          <span className="text-sm text-muted-foreground">{doc.progress}%</span>
                        </div>
                        <Badge className={`${getStatusColor(doc.status)} text-white`}>
                          {getStatusText(doc.status)}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            عرض
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Signatures Tab */}
          <TabsContent value="signatures" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  إدارة التوقيعات
                </CardTitle>
                <CardDescription>
                  إنشاء وإدارة التوقيعات الإلكترونية المعتمدة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <PenTool className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">إنشاء توقيع جديد</h3>
                      <p className="text-muted-foreground mb-4">
                        قم بإنشاء توقيع إلكتروني آمن ومعتمد
                      </p>
                      <Button>إنشاء توقيع</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                      <UserCheck className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">التحقق عبر نفاذ</h3>
                      <p className="text-muted-foreground mb-4">
                        تحقق من هويتك باستخدام نفاذ الوطني الموحد
                      </p>
                      <Button variant="outline">
                        <Globe className="w-4 h-4 mr-2" />
                        التحقق عبر نفاذ
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg p-6">
                  <h4 className="font-semibold mb-4">معايير الأمان والامتثال</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>تشفير AES-256</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>شهادة رقمية معتمدة</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>طابع زمني آمن</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>متوافق مع لوائح المملكة</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    الامتثال التنظيمي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>هيئة الحكومة الرقمية</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      متوافق
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>هيئة الأمن السيبراني</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      متوافق
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>نظام العمل السعودي</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      متوافق
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>سجل التدقيق</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">تم توقيع المستند</p>
                        <p className="text-xs text-muted-foreground">منذ 30 دقيقة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">تم التحقق من الهوية</p>
                        <p className="text-xs text-muted-foreground">منذ ساعة</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                      <Upload className="w-4 h-4 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">تم رفع مستند جديد</p>
                        <p className="text-xs text-muted-foreground">منذ ساعتين</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">خطط الاشتراك</h2>
              <p className="text-muted-foreground">
                اختر الخطة المناسبة لاحتياجات مؤسستك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        الأكثر شعبية
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground"> ريال/شهر</span>
                    </CardDescription>
                    <p className="text-muted-foreground">
                      حتى {plan.documents} مستند شهرياً
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      اختيار الخطة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">هل تحتاج خطة مخصصة؟</h3>
                <p className="text-muted-foreground mb-6">
                  نوفر حلول مخصصة للمؤسسات الكبيرة مع متطلبات خاصة
                </p>
                <Button size="lg">
                  تواصل مع فريق المبيعات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};