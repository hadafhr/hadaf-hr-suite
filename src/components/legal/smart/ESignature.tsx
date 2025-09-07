import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  PenTool, 
  FileText, 
  Send, 
  Clock, 
  CheckCircle, 
  Users,
  Download,
  Upload,
  Eye,
  Shield,
  Calendar,
  Search,
  Plus,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ESignature: React.FC = () => {
  const [signatureRequests, setSignatureRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Load signature requests from database
  useEffect(() => {
    loadSignatureRequests();
  }, []);

  const loadSignatureRequests = async () => {
    setIsLoading(true);
    try {
      // Using mock data since legal_signature_requests table doesn't exist yet
      const data = [];

      if (data) throw new Error('Mock error handling');
      setSignatureRequests(data || []);
    } catch (error) {
      console.error('Error loading signature requests:', error);
      toast.error('خطأ في تحميل طلبات التوقيع');
    } finally {
      setIsLoading(false);
    }
  };

  const signatureStats = [
    {
      title: 'طلبات التوقيع النشطة',
      value: '24',
      change: '+6',
      icon: PenTool,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'في انتظار التوقيع',
      value: '12',
      change: '+3',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'تم التوقيع',
      value: '156',
      change: '+18',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط وقت التوقيع',
      value: '2.5 يوم',
      change: '-0.5 يوم',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const mockSignatureRequests = [
    {
      id: 1,
      documentTitle: 'عقد توظيف - أحمد محمد العلي',
      contractType: 'employment',
      status: 'pending',
      priority: 'عالي',
      requestedBy: 'إدارة الموارد البشرية',
      signers: [
        { name: 'أحمد محمد العلي', status: 'pending', role: 'الموظف' },
        { name: 'مدير الموارد البشرية', status: 'signed', role: 'المدير' }
      ],
      createdDate: '2024-01-20',
      dueDate: '2024-01-25',
      platform: 'Mudad',
      securityLevel: 'high'
    },
    {
      id: 2,
      documentTitle: 'اتفاقية شراكة استراتيجية',
      contractType: 'partnership',
      status: 'in_progress',
      priority: 'عالي',
      requestedBy: 'الإدارة التنفيذية',
      signers: [
        { name: 'الرئيس التنفيذي', status: 'signed', role: 'الرئيس التنفيذي' },
        { name: 'الشريك الاستراتيجي', status: 'pending', role: 'الشريك' }
      ],
      createdDate: '2024-01-18',
      dueDate: '2024-01-28',
      platform: 'توثق',
      securityLevel: 'high'
    },
    {
      id: 3,
      documentTitle: 'عقد توريد معدات تقنية',
      contractType: 'supply',
      status: 'completed',
      priority: 'متوسط',
      requestedBy: 'إدارة المشتريات',
      signers: [
        { name: 'مدير المشتريات', status: 'signed', role: 'المدير' },
        { name: 'مندوب المورد', status: 'signed', role: 'المورد' }
      ],
      createdDate: '2024-01-15',
      dueDate: '2024-01-22',
      platform: 'Mudad',
      securityLevel: 'medium'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'في الانتظار', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'in_progress': { label: 'قيد التوقيع', color: 'bg-blue-100 text-blue-800', icon: PenTool },
      'completed': { label: 'مكتمل', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'expired': { label: 'منتهي الصلاحية', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'cancelled': { label: 'ملغي', color: 'bg-gray-100 text-gray-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['pending'];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'عالي': 'bg-red-100 text-red-800',
      'متوسط': 'bg-yellow-100 text-yellow-800',
      'منخفض': 'bg-green-100 text-green-800'
    };
    
    return <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>{priority}</Badge>;
  };

  const getSecurityBadge = (level: string) => {
    const securityConfig = {
      'high': { label: 'عالي', color: 'bg-red-100 text-red-800' },
      'medium': { label: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
      'low': { label: 'منخفض', color: 'bg-green-100 text-green-800' }
    };
    
    const config = securityConfig[level as keyof typeof securityConfig] || securityConfig['medium'];
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Shield className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleCreateSignatureRequest = async () => {
    toast.success('تم إنشاء طلب التوقيع الإلكتروني بنجاح');
    setIsNewRequestOpen(false);
    await loadSignatureRequests();
  };

  const handleSendReminder = (id: number) => {
    toast.success('تم إرسال تذكير التوقيع');
  };

  const filteredRequests = mockSignatureRequests.filter(request => {
    const matchesSearch = request.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">التوقيع الإلكتروني</h2>
          <p className="text-gray-600 mt-2">إدارة التوقيعات الإلكترونية والمعتمدة رسمياً</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                طلب توقيع جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إنشاء طلب توقيع إلكتروني جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">نوع المستند</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المستند" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employment">عقد توظيف</SelectItem>
                        <SelectItem value="partnership">اتفاقية شراكة</SelectItem>
                        <SelectItem value="supply">عقد توريد</SelectItem>
                        <SelectItem value="consulting">عقد استشارة</SelectItem>
                        <SelectItem value="nda">اتفاقية سرية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">منصة التوقيع</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المنصة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mudad">منصة مُداد</SelectItem>
                        <SelectItem value="tawtheeq">منصة توثق</SelectItem>
                        <SelectItem value="etimad">منصة اعتماد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">مستوى الأمان</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى الأمان" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">تاريخ الاستحقاق</label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">عنوان المستند</label>
                  <Input placeholder="أدخل عنوان المستند" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">وصف المستند</label>
                  <Textarea placeholder="وصف موجز عن المستند..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">رفع المستند</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">اسحب الملف هنا أو اضغط للرفع</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX (الحد الأقصى 10MB)</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateSignatureRequest}>
                    إنشاء الطلب
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {signatureStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-600 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في طلبات التوقيع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="تصفية حسب الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">في الانتظار</SelectItem>
            <SelectItem value="in_progress">قيد التوقيع</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="expired">منتهي الصلاحية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Signature Requests List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            طلبات التوقيع الإلكتروني
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{request.documentTitle}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                      {getSecurityBadge(request.securityLevel)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(request.id)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">طلب بواسطة</p>
                    <p className="font-medium">{request.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">منصة التوقيع</p>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{request.platform}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">تاريخ الاستحقاق</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{request.dueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Signers Progress */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">حالة الموقعين</span>
                  </div>
                  <div className="space-y-2">
                    {request.signers.map((signer, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="font-medium text-gray-900">{signer.name}</p>
                          <p className="text-sm text-gray-600">{signer.role}</p>
                        </div>
                        <div>
                          {signer.status === 'signed' ? (
                            <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              تم التوقيع
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              في الانتظار
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>تاريخ الإنشاء: {request.createdDate}</span>
                    <span>نوع العقد: {request.contractType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>PDF - 2.4 MB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saudi E-Signature Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            المنصات السعودية المعتمدة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <PenTool className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">منصة مُداد</h3>
                  <p className="text-sm text-gray-600">التوقيع الإلكتروني المعتمد</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الوثائق النشطة:</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">معدل النجاح:</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">منصة توثق</h3>
                  <p className="text-sm text-gray-600">التوثيق الرقمي</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الوثائق النشطة:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">معدل النجاح:</span>
                  <span className="font-medium text-green-600">96%</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">منصة اعتماد</h3>
                  <p className="text-sm text-gray-600">التصديق الإلكتروني</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الوثائق النشطة:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">معدل النجاح:</span>
                  <span className="font-medium text-green-600">99%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};