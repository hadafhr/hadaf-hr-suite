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

export const ElectronicSignature: React.FC<ElectronicSignatureProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<'requests' | 'templates' | 'documents'>('requests');
  const [searchTerm, setSearchTerm] = useState('');
  
  const signatureRequests: SignatureRequest[] = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const signatureTemplates: SignatureTemplate[] = [
    {
      id: 'TEMP001',
      title: 'قالب عقد العمل الأساسي',
      type: 'عقد عمل',
      description: 'قالب عقد العمل للموظفين الجدد',
      fields: 12,
      usage: 45,
      status: 'نشط'
    },
    {
      id: 'TEMP002',
      title: 'اتفاقية السرية',
      type: 'اتفاقية',
      description: 'اتفاقية حماية المعلومات السرية',
      fields: 8,
      usage: 32,
      status: 'نشط'
    },
    {
      id: 'TEMP003',
      title: 'إقرار استلام المعدات',
      type: 'إقرار',
      description: 'إقرار باستلام معدات العمل',
      fields: 6,
      usage: 28,
      status: 'نشط'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'مرسل': 'bg-blue-100 text-blue-800 border-blue-200',
      'في الانتظار': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'موقع': 'bg-green-100 text-green-800 border-green-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200',
      'منتهي الصلاحية': 'bg-gray-100 text-gray-800 border-gray-200',
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'مؤرشف': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const config = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return config[priority as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'موقع':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'في الانتظار':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'مرسل':
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <PenTool className="h-4 w-4 text-gray-600" />;
    }
  };

  const pendingRequests = signatureRequests.filter(r => r.status === 'في الانتظار' || r.status === 'مرسل').length;
  const signedRequests = signatureRequests.filter(r => r.status === 'موقع').length;
  const activeTemplates = signatureTemplates.filter(t => t.status === 'نشط').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  البحث المتقدم
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  طلب توقيع جديد
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <PenTool className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام التوقيع الإلكتروني المتطور
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة التوقيعات الإلكترونية والمستندات مع التكامل الكامل مع الأنظمة القانونية
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">نظام التوقيع الإلكتروني</h3>
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">طلبات التوقيع</span>
                      <span className="font-bold text-primary">{signatureRequests.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل التوقيع</span>
                      <span className="font-bold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط وقت التوقيع</span>
                      <span className="font-bold text-blue-600">2.3 يوم</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة القوالب</h3>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">قوالب نشطة</span>
                      <span className="font-bold text-green-600">{activeTemplates}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">استخدام القوالب</span>
                      <span className="font-bold text-blue-600">154</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">كفاءة المعالجة</span>
                      <span className="font-bold text-purple-600">96%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات التوقيع</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{signatureRequests.length}</div>
                    <div className="text-sm text-gray-600">طلبات التوقيع</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{pendingRequests}</div>
                    <div className="text-sm text-gray-600">في الانتظار</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{signedRequests}</div>
                    <div className="text-sm text-gray-600">مكتملة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة التوقيع الإلكتروني المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: PenTool, label: "التوقيع الإلكتروني", color: "text-blue-600", count: signatureRequests.length },
                { icon: FileText, label: "إدارة المستندات", color: "text-green-600", count: activeTemplates },
                { icon: CheckCircle, label: "التحقق الآمن", color: "text-purple-600", count: 0 },
                { icon: Clock, label: "المتابعة الآلية", color: "text-orange-600", count: pendingRequests },
                { icon: Upload, label: "رفع المستندات", color: "text-teal-600", count: 0 },
                { icon: Search, label: "البحث والأرشفة", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">789</div>
                <div className="text-sm text-gray-600">إجمالي المستندات الموقعة</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">97%</div>
                <div className="text-sm text-gray-600">معدل الأمان والحماية</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1.8</div>
                <div className="text-sm text-gray-600">متوسط وقت المعالجة (أيام)</div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Navigation Tabs */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === 'requests' ? 'default' : 'outline'}
              onClick={() => setActiveView('requests')}
              className={activeView === 'requests' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <PenTool className="h-4 w-4 ml-2" />
              طلبات التوقيع
            </Button>
            <Button
              variant={activeView === 'templates' ? 'default' : 'outline'}
              onClick={() => setActiveView('templates')}
              className={activeView === 'templates' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <FileText className="h-4 w-4 ml-2" />
              القوالب
            </Button>
            <Button
              variant={activeView === 'documents' ? 'default' : 'outline'}
              onClick={() => setActiveView('documents')}
              className={activeView === 'documents' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Upload className="h-4 w-4 ml-2" />
              إدارة المستندات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`البحث في ${activeView === 'requests' ? 'طلبات التوقيع' : activeView === 'templates' ? 'القوالب' : 'المستندات'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Signature Requests View */}
      {activeView === 'requests' && (
        <div className="space-y-4">
          {signatureRequests.map((request) => (
            <Card key={request.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{request.documentTitle}</h3>
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
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-medium text-blue-900 mb-1">نوع المستند</div>
                    <div className="font-semibold text-blue-700">{request.documentType}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="font-medium text-gray-900 mb-1">تاريخ الإرسال</div>
                    <div className="font-semibold text-gray-700">{request.createdDate}</div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="font-medium text-orange-900 mb-1">تاريخ انتهاء الصلاحية</div>
                    <div className="font-semibold text-orange-700">{request.expiryDate}</div>
                  </div>
                  
                  {request.signedDate && (
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="font-medium text-green-900 mb-1">تاريخ التوقيع</div>
                      <div className="font-semibold text-green-700">{request.signedDate}</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    عرض المستند
                  </Button>
                  {request.status === 'في الانتظار' && (
                    <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50">
                      إرسال تذكير
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-50">
                    تحميل نسخة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Templates View */}
      {activeView === 'templates' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureTemplates.map((template) => (
            <Card key={template.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      <FileText className="h-5 w-5 text-[#009F87]" />
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
                  <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                    <div className="font-semibold text-[#009F87]">{template.fields}</div>
                    <div className="text-xs text-muted-foreground">حقول التوقيع</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-600">{template.usage}</div>
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
            </Card>
          ))}
        </div>
      )}

      {/* Documents Management View */}
      {activeView === 'documents' && (
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#009F87]">
              <Upload className="h-6 w-6" />
              إدارة المستندات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Upload className="h-16 w-16 text-[#009F87] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">رفع مستند جديد للتوقيع</h3>
              <p className="text-muted-foreground mb-6">
                قم برفع المستند واختيار الموقعين المطلوبين
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
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
        </Card>
      )}
      </div>
    </div>
  );
};