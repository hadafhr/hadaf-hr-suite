import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, PenTool, FileText, CheckCircle, Clock, Users, Upload, Search, Plus } from 'lucide-react';
interface SignatureRequest {
  id: string;
  documentTitle: string;
  documentType: 'عقد عمل' | 'اتفاقية' | 'سياسة' | 'إقرار' | 'طلب';
  requesterName: string;
  signerName: string;
  signerEmail: string;
  status: 'مرسل' | 'في الانتظار' | 'موقع' | 'مرفوض' | 'منتهي الصلاحية';
  createdDate: string;
  expiryDate: string;
  signedDate?: string;
  priority: 'عالي' | 'متوسط' | 'منخفض';
}
interface SignatureTemplate {
  id: string;
  title: string;
  type: string;
  description: string;
  fields: number;
  usage: number;
  status: 'نشط' | 'مؤرشف';
}
interface ElectronicSignatureProps {
  onBack: () => void;
}
export const ElectronicSignature: React.FC<ElectronicSignatureProps> = ({
  onBack
}) => {
  const [activeView, setActiveView] = useState<'requests' | 'templates' | 'documents'>('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const signatureRequests: SignatureRequest[] = [{
    id: 'SIG001',
    documentTitle: 'عقد عمل - أحمد محمد العلي',
    documentType: 'عقد عمل',
    requesterName: 'فاطمة أحمد - موارد بشرية',
    signerName: 'أحمد محمد العلي',
    signerEmail: 'ahmed.ali@company.com',
    status: 'موقع',
    createdDate: '2024-03-15',
    expiryDate: '2024-03-22',
    signedDate: '2024-03-18',
    priority: 'عالي'
  }, {
    id: 'SIG002',
    documentTitle: 'اتفاقية سرية المعلومات',
    documentType: 'اتفاقية',
    requesterName: 'محمد السالم - إدارة',
    signerName: 'سارة عبدالله النصر',
    signerEmail: 'sarah.nasr@company.com',
    status: 'في الانتظار',
    createdDate: '2024-03-20',
    expiryDate: '2024-03-27',
    priority: 'متوسط'
  }, {
    id: 'SIG003',
    documentTitle: 'إقرار استلام معدات العمل',
    documentType: 'إقرار',
    requesterName: 'خالد الأحمد - تقنية المعلومات',
    signerName: 'عبدالرحمن يوسف',
    signerEmail: 'abdulrahman@company.com',
    status: 'مرسل',
    createdDate: '2024-03-22',
    expiryDate: '2024-03-29',
    priority: 'منخفض'
  }];
  const signatureTemplates: SignatureTemplate[] = [{
    id: 'TEMP001',
    title: 'قالب عقد العمل الأساسي',
    type: 'عقد عمل',
    description: 'قالب عقد العمل للموظفين الجدد',
    fields: 12,
    usage: 45,
    status: 'نشط'
  }, {
    id: 'TEMP002',
    title: 'اتفاقية السرية',
    type: 'اتفاقية',
    description: 'اتفاقية حماية المعلومات السرية',
    fields: 8,
    usage: 32,
    status: 'نشط'
  }, {
    id: 'TEMP003',
    title: 'إقرار استلام المعدات',
    type: 'إقرار',
    description: 'إقرار باستلام معدات العمل',
    fields: 6,
    usage: 28,
    status: 'نشط'
  }];
  const getStatusBadge = (status: string) => {
    const config = {
      'مرسل': 'bg-accent/10 text-accent border-accent/20',
      'في الانتظار': 'bg-warning/10 text-warning border-warning/20',
      'موقع': 'bg-success/10 text-success border-success/20',
      'مرفوض': 'bg-destructive/10 text-destructive border-destructive/20',
      'منتهي الصلاحية': 'bg-muted text-muted-foreground border-border',
      'نشط': 'bg-success/10 text-success border-success/20',
      'مؤرشف': 'bg-muted text-muted-foreground border-border'
    };
    return config[status as keyof typeof config] || 'bg-muted text-muted-foreground border-border';
  };
  const getPriorityBadge = (priority: string) => {
    const config = {
      'عالي': 'bg-destructive/10 text-destructive border-destructive/20',
      'متوسط': 'bg-warning/10 text-warning border-warning/20',
      'منخفض': 'bg-success/10 text-success border-success/20'
    };
    return config[priority as keyof typeof config] || 'bg-muted text-muted-foreground border-border';
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'موقع':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'في الانتظار':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'مرسل':
        return <FileText className="h-4 w-4 text-accent" />;
      default:
        return <PenTool className="h-4 w-4 text-muted-foreground" />;
    }
  };
  const pendingRequests = signatureRequests.filter(r => r.status === 'في الانتظار' || r.status === 'مرسل').length;
  const signedRequests = signatureRequests.filter(r => r.status === 'موقع').length;
  const activeTemplates = signatureTemplates.filter(t => t.status === 'نشط').length;
  return <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header - Matching AI System Design */}
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">قسم التوقيع الإلكتروني</h1>
          <p className="text-muted-foreground">منظومة ذكية شاملة لإدارة التوقيعات الإلكترونية والمستندات</p>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border shadow-medium hover:shadow-glow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">نظام التوقيع الإلكتروني</h3>
                    <PenTool className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">طلبات التوقيع</span>
                      <span className="font-bold text-accent">{signatureRequests.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">معدل التوقيع</span>
                      <span className="font-bold text-success">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">متوسط وقت التوقيع</span>
                      <span className="font-bold text-accent">2.3 يوم</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-medium hover:shadow-glow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">إدارة القوالب</h3>
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">قوالب نشطة</span>
                      <span className="font-bold text-success">{activeTemplates}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">استخدام القوالب</span>
                      <span className="font-bold text-accent">154</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">كفاءة المعالجة</span>
                      <span className="font-bold text-foreground">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-card border-border shadow-medium">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">إحصائيات التوقيع</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="text-2xl font-bold text-accent">{signatureRequests.length}</div>
                    <div className="text-sm text-muted-foreground">طلبات التوقيع</div>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="text-2xl font-bold text-warning">{pendingRequests}</div>
                    <div className="text-sm text-muted-foreground">في الانتظار</div>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-2xl font-bold text-success">{signedRequests}</div>
                    <div className="text-sm text-muted-foreground">مكتملة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 bg-card border-border shadow-medium">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">منظومة التوقيع الإلكتروني المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[{
              icon: PenTool,
              label: "التوقيع الإلكتروني",
              color: "text-accent",
              count: signatureRequests.length
            }, {
              icon: FileText,
              label: "إدارة المستندات",
              color: "text-success",
              count: activeTemplates
            }, {
              icon: CheckCircle,
              label: "التحقق الآمن",
              color: "text-foreground",
              count: 0
            }, {
              icon: Clock,
              label: "المتابعة الآلية",
              color: "text-warning",
              count: pendingRequests
            }, {
              icon: Upload,
              label: "رفع المستندات",
              color: "text-accent",
              count: 0
            }, {
              icon: Search,
              label: "البحث والأرشفة",
              color: "text-destructive",
              count: 0
            }].map((item, index) => <div key={index} className="text-center p-4 rounded-xl bg-muted/50 border border-border shadow-soft hover:shadow-medium hover:border-accent/50 transition-all cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-background group-hover:bg-accent/10 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && <span className="absolute -top-1 -right-1 bg-destructive text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>}
                  </div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                </div>)}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg hover:shadow-medium transition-shadow">
                <div className="text-2xl font-bold text-accent">789</div>
                <div className="text-sm text-muted-foreground">إجمالي المستندات الموقعة</div>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg hover:shadow-medium transition-shadow">
                <div className="text-2xl font-bold text-success">97%</div>
                <div className="text-sm text-muted-foreground">معدل الأمان والحماية</div>
              </div>
              <div className="p-4 bg-foreground/10 border border-border rounded-lg hover:shadow-medium transition-shadow">
                <div className="text-2xl font-bold text-foreground">1.8</div>
                <div className="text-sm text-muted-foreground">متوسط وقت المعالجة (أيام)</div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Navigation Tabs */}
      <Card className="bg-card border-border shadow-soft">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button variant={activeView === 'requests' ? 'default' : 'outline'} onClick={() => setActiveView('requests')}>
              <PenTool className="h-4 w-4 ml-2" />
              طلبات التوقيع
            </Button>
            <Button variant={activeView === 'templates' ? 'default' : 'outline'} onClick={() => setActiveView('templates')}>
              <FileText className="h-4 w-4 ml-2" />
              القوالب
            </Button>
            <Button variant={activeView === 'documents' ? 'default' : 'outline'} onClick={() => setActiveView('documents')}>
              <Upload className="h-4 w-4 ml-2" />
              إدارة المستندات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="bg-card border-border shadow-soft">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`البحث في ${activeView === 'requests' ? 'طلبات التوقيع' : activeView === 'templates' ? 'القوالب' : 'المستندات'}...`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Signature Requests View */}
      {activeView === 'requests' && <div className="space-y-4">
          {signatureRequests.map(request => <Card key={request.id} className="bg-card border-border hover:shadow-medium hover:border-accent/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{request.documentTitle}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        مرسل من: {request.requesterName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>للموقع: {request.signerName}</span>
                        <span>•</span>
                        <span>{request.signerEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusBadge(request.status)}>
                      {request.status}
                    </Badge>
                    <Badge className={getPriorityBadge(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-accent/10 p-3 rounded-lg text-center border border-accent/20">
                    <div className="font-medium text-foreground mb-1">نوع المستند</div>
                    <div className="font-semibold text-accent">{request.documentType}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg text-center border border-border">
                    <div className="font-medium text-foreground mb-1">تاريخ الإرسال</div>
                    <div className="font-semibold text-muted-foreground">{request.createdDate}</div>
                  </div>
                  
                  <div className="bg-warning/10 p-3 rounded-lg text-center border border-warning/20">
                    <div className="font-medium text-foreground mb-1">تاريخ انتهاء الصلاحية</div>
                    <div className="font-semibold text-warning">{request.expiryDate}</div>
                  </div>
                  
                  {request.signedDate && <div className="bg-success/10 p-3 rounded-lg text-center border border-success/20">
                      <div className="font-medium text-foreground mb-1">تاريخ التوقيع</div>
                      <div className="font-semibold text-success">{request.signedDate}</div>
                    </div>}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    عرض المستند
                  </Button>
                  {request.status === 'في الانتظار' && <Button variant="outline" size="sm" className="hover:bg-accent/10 hover:text-accent hover:border-accent">
                      إرسال تذكير
                    </Button>}
                  <Button variant="outline" size="sm">
                    تحميل نسخة
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {/* Templates View */}
      {activeView === 'templates' && <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureTemplates.map(template => <Card key={template.id} className="bg-card border-border hover:shadow-medium hover:border-accent/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{template.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(template.status)}>
                    {template.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {template.description}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-accent/10 p-3 rounded-lg text-center border border-accent/20">
                    <div className="font-semibold text-accent">{template.fields}</div>
                    <div className="text-xs text-muted-foreground">حقول التوقيع</div>
                  </div>
                  <div className="bg-success/10 p-3 rounded-lg text-center border border-success/20">
                    <div className="font-semibold text-success">{template.usage}</div>
                    <div className="text-xs text-muted-foreground">مرة استخدام</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    استخدام القالب
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    تحرير
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      {/* Documents Management View */}
      {activeView === 'documents' && <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Upload className="h-6 w-6" />
              إدارة المستندات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Upload className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">رفع مستند جديد للتوقيع</h3>
              <p className="text-muted-foreground mb-6">
                قم برفع المستند واختيار الموقعين المطلوبين
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="default">
                  <Upload className="h-4 w-4 ml-2" />
                  رفع مستند PDF
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 ml-2" />
                  إنشاء من قالب
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>}
      </div>
    </div>;
};