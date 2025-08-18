import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  UserCheck,
  Eye,
  FileSignature,
  Plus,
  X,
  Save,
  Edit3
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock data for employee contracts
const contractDocuments = [
  {
    id: '1',
    title: 'عقد عمل - أحمد محمد العلي',
    employee: 'أحمد محمد العلي',
    type: 'عقد عمل',
    status: 'pending',
    signatories: ['أحمد محمد العلي', 'مدير الموارد البشرية'],
    createdAt: '2024-01-15',
    dueDate: '2024-01-22',
    progress: 50,
    priority: 'high'
  },
  {
    id: '2',
    title: 'إنذار كتابي - سارة أحمد',
    employee: 'سارة أحمد',
    type: 'إنذار كتابي',
    status: 'completed',
    signatories: ['سارة أحمد', 'مدير المبيعات'],
    createdAt: '2024-01-10',
    completedAt: '2024-01-12',
    progress: 100,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'تعديل راتب - خالد يوسف النمر',
    employee: 'خالد يوسف النمر',
    type: 'تعديل راتب',
    status: 'draft',
    signatories: ['خالد يوسف النمر', 'المدير المالي'],
    createdAt: '2024-01-20',
    progress: 0,
    priority: 'low'
  }
];

const signatureAnalytics = {
  totalDocuments: 85,
  signedDocuments: 62,
  pendingDocuments: 18,
  rejectedDocuments: 5,
  monthlyGrowth: 15,
  avgSigningTime: '1.8 أيام'
};

export const DigitalSignatureManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<typeof contractDocuments[0] | null>(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [showSignatureCreator, setShowSignatureCreator] = useState(false);
  const [signatureText, setSignatureText] = useState('');

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">عالي</Badge>;
      case 'medium': return <Badge variant="secondary">متوسط</Badge>;
      case 'low': return <Badge variant="outline">منخفض</Badge>;
      default: return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const handleViewDocument = (doc: typeof contractDocuments[0]) => {
    setSelectedDocument(doc);
    setShowDocumentViewer(true);
    toast.info(`عرض المستند: ${doc.title}`);
  };

  const handleDownloadDocument = (doc: typeof contractDocuments[0]) => {
    toast.success(`تم تحميل المستند: ${doc.title}`);
  };

  const handleCreateSignature = () => {
    setShowSignatureCreator(true);
  };

  const handleSaveSignature = () => {
    toast.success('تم حفظ التوقيع بنجاح');
    setShowSignatureCreator(false);
    setSignatureText('');
  };

  const handleNafathVerification = () => {
    toast.info('جاري توجيهك إلى نفاذ الوطني الموحد للتحقق من الهوية...');
  };

  const handleUploadDocument = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = () => {
      toast.success('تم رفع المستند بنجاح!');
    };
    input.click();
  };

  const handleSendForSignature = (docId: string) => {
    toast.success('تم إرسال المستند للتوقيع بنجاح');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileSignature className="h-6 w-6 text-primary" />
            نظام التوقيع الإلكتروني
          </h2>
          <p className="text-muted-foreground">
            إدارة العقود والتوقيعات الإلكترونية للموظفين
          </p>
        </div>
        <div className="flex items-center gap-2">
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            العقود والمستندات
          </TabsTrigger>
          <TabsTrigger value="signatures" className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            التوقيعات
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            الامتثال والأمان
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
                <div className="text-2xl font-bold text-blue-600">{signatureAnalytics.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">+{signatureAnalytics.monthlyGrowth}% هذا الشهر</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المستندات الموقعة</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{signatureAnalytics.signedDocuments}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((signatureAnalytics.signedDocuments / signatureAnalytics.totalDocuments) * 100)}% من الإجمالي
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{signatureAnalytics.pendingDocuments}</div>
                <p className="text-xs text-muted-foreground">متوسط الوقت: {signatureAnalytics.avgSigningTime}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المرفوضة</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{signatureAnalytics.rejectedDocuments}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((signatureAnalytics.rejectedDocuments / signatureAnalytics.totalDocuments) * 100)}% من الإجمالي
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
                {contractDocuments.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          الموقعون: {doc.signatories.join(', ')}
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
            <Button onClick={handleUploadDocument} className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              رفع مستند جديد
            </Button>
          </div>

          {/* Documents List */}
          <div className="grid gap-4">
            {contractDocuments.map((doc) => (
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
                          الموظف: {doc.employee} | النوع: {doc.type}
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
                      {getPriorityBadge(doc.priority)}
                      <Badge className={`${getStatusColor(doc.status)} text-white`}>
                        {getStatusText(doc.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          عرض
                        </Button>
                        {doc.status === 'draft' && (
                          <Button 
                            size="sm"
                            onClick={() => handleSendForSignature(doc.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            إرسال للتوقيع
                          </Button>
                        )}
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
                إدارة التوقيعات الإلكترونية
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
                    <Button onClick={handleCreateSignature}>
                      <Plus className="w-4 h-4 mr-2" />
                      إنشاء توقيع
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <UserCheck className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">التحقق عبر نفاذ</h3>
                    <p className="text-muted-foreground mb-4">
                      تحقق من هويتك باستخدام نفاذ الوطني الموحد
                    </p>
                    <Button variant="outline" onClick={handleNafathVerification}>
                      <Shield className="w-4 h-4 mr-2" />
                      التحقق الآن
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                الامتثال والأمان
              </CardTitle>
              <CardDescription>
                ضمان الامتثال للوائح المملكة العربية السعودية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 border rounded-lg">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-600">متوافق مع نفاذ</h3>
                  <p className="text-sm text-muted-foreground">
                    التوقيع معتمد من نفاذ الوطني الموحد
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-600">تشفير متقدم</h3>
                  <p className="text-sm text-muted-foreground">
                    حماية بتشفير AES-256 للمستندات
                  </p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-600">معايير دولية</h3>
                  <p className="text-sm text-muted-foreground">
                    متوافق مع معايير ISO 27001
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">سجل الأنشطة الأمنية</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>آخر تحديث أمني</span>
                    <span className="text-muted-foreground">2024-01-20 14:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>فحص التوقيعات الأخير</span>
                    <span className="text-muted-foreground">2024-01-20 09:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحديث شهادات الأمان</span>
                    <span className="text-muted-foreground">2024-01-15 16:45</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Viewer Dialog */}
      <Dialog open={showDocumentViewer} onOpenChange={setShowDocumentViewer}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>عرض المستند: {selectedDocument?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-6 bg-muted min-h-96 flex items-center justify-center">
            <p className="text-muted-foreground">معاينة المستند ستظهر هنا</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signature Creator Dialog */}
      <Dialog open={showSignatureCreator} onOpenChange={setShowSignatureCreator}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إنشاء توقيع إلكتروني جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">نص التوقيع</label>
              <Input
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                placeholder="أدخل اسمك للتوقيع"
              />
            </div>
            <div className="p-6 border-2 border-dashed border-muted-foreground/25 text-center">
              <p className="text-muted-foreground">منطقة الرسم للتوقيع</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSignatureCreator(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveSignature}>
                حفظ التوقيع
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};