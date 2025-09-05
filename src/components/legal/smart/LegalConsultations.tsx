import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Eye, 
  Reply,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Building,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

export const LegalConsultations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isNewConsultationOpen, setIsNewConsultationOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Mock data for legal consultations
  const consultations = [
    {
      id: 1,
      ticketNumber: 'LC-CON-2024-001',
      requester: {
        name: 'أحمد محمد العلي',
        department: 'الموارد البشرية',
        position: 'مدير الموارد البشرية'
      },
      subject: 'استشارة حول إنهاء خدمة موظف',
      category: 'إنهاء الخدمة',
      priority: 'عالي',
      status: 'pending',
      createdDate: '2024-01-20',
      lastUpdate: '2024-01-20',
      assignedTo: 'المستشار القانوني الأول',
      description: 'نحتاج استشارة قانونية حول إنهاء خدمة موظف بسبب مخالفة سياسة الشركة. الموظف لديه عقد دائم منذ 3 سنوات.',
      response: null,
      responseDate: null
    },
    {
      id: 2,
      ticketNumber: 'LC-CON-2024-002',
      requester: {
        name: 'فاطمة أحمد سالم',
        department: 'المالية',
        position: 'محاسبة أولى'
      },
      subject: 'استشارة حول إجازة أمومة',
      category: 'الإجازات',
      priority: 'متوسط',
      status: 'responded',
      createdDate: '2024-01-18',
      lastUpdate: '2024-01-19',
      assignedTo: 'المستشار القانوني الثاني',
      description: 'ما هي الحقوق القانونية للموظفة في إجازة الأمومة حسب نظام العمل السعودي؟',
      response: 'حسب نظام العمل السعودي، للموظفة الحق في إجازة أمومة لمدة 10 أسابيع براتب كامل، ولها الحق في تمديد الإجازة بدون راتب حسب الحاجة.',
      responseDate: '2024-01-19'
    },
    {
      id: 3,
      ticketNumber: 'LC-CON-2024-003',
      requester: {
        name: 'محمد عبدالله النور',
        department: 'التسويق',
        position: 'مدير التسويق'
      },
      subject: 'مراجعة اتفاقية عدم إفشاء',
      category: 'العقود',
      priority: 'منخفض',
      status: 'closed',
      createdDate: '2024-01-15',
      lastUpdate: '2024-01-17',
      assignedTo: 'المستشار القانوني الثالث',
      description: 'نحتاج مراجعة قانونية لاتفاقية عدم الإفشاء مع شركاء جدد.',
      response: 'تمت مراجعة الاتفاقية وإرسال التعديلات المطلوبة. الاتفاقية جاهزة للتوقيع بعد التعديلات.',
      responseDate: '2024-01-17'
    }
  ];

  const consultationStats = [
    {
      title: 'الاستشارات المعلقة',
      value: '8',
      change: '+2',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'تم الرد عليها',
      value: '25',
      change: '+5',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'إجمالي الاستشارات',
      value: '47',
      change: '+8',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'متوسط وقت الرد',
      value: '2.5 يوم',
      change: '-0.5 يوم',
      icon: AlertCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'معلقة', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'in_progress': { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800', icon: MessageSquare },
      'responded': { label: 'تم الرد', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'closed': { label: 'مغلقة', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      'urgent': { label: 'عاجل', color: 'bg-red-100 text-red-800', icon: AlertCircle }
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

  const handleCreateConsultation = () => {
    toast.success('تم إرسال الاستشارة بنجاح');
    setIsNewConsultationOpen(false);
  };

  const handleViewConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsViewOpen(true);
  };

  const handleSendResponse = () => {
    toast.success('تم إرسال الرد بنجاح');
    setIsViewOpen(false);
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || consultation.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الاستشارات القانونية الداخلية</h2>
          <p className="text-gray-600 mt-2">إدارة طلبات الاستشارات القانونية من الأقسام المختلفة</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isNewConsultationOpen} onOpenChange={setIsNewConsultationOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                استشارة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>طلب استشارة قانونية جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">القسم الطالب</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                        <SelectItem value="marketing">التسويق</SelectItem>
                        <SelectItem value="it">تقنية المعلومات</SelectItem>
                        <SelectItem value="operations">العمليات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">فئة الاستشارة</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contracts">العقود</SelectItem>
                        <SelectItem value="employment">التوظيف</SelectItem>
                        <SelectItem value="termination">إنهاء الخدمة</SelectItem>
                        <SelectItem value="leaves">الإجازات</SelectItem>
                        <SelectItem value="disciplinary">الإجراءات التأديبية</SelectItem>
                        <SelectItem value="compliance">الامتثال</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">الأولوية</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="low">منخفض</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">المستشار المطلوب</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المستشار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal1">المستشار القانوني الأول</SelectItem>
                        <SelectItem value="legal2">المستشار القانوني الثاني</SelectItem>
                        <SelectItem value="legal3">المستشار القانوني الثالث</SelectItem>
                        <SelectItem value="auto">تعيين تلقائي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">موضوع الاستشارة</label>
                  <Input placeholder="اكتب موضوع الاستشارة..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">تفاصيل الاستشارة</label>
                  <Textarea 
                    placeholder="اكتب تفاصيل الاستشارة القانونية المطلوبة..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsNewConsultationOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateConsultation}>
                    <Send className="ml-2 h-4 w-4" />
                    إرسال الاستشارة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consultationStats.map((stat, index) => (
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
            placeholder="البحث في الاستشارات..."
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
            <SelectItem value="pending">معلقة</SelectItem>
            <SelectItem value="in_progress">قيد المراجعة</SelectItem>
            <SelectItem value="responded">تم الرد</SelectItem>
            <SelectItem value="closed">مغلقة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Consultations List */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الاستشارات القانونية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <div key={consultation.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{consultation.ticketNumber}</h3>
                    <p className="text-gray-700 font-medium mt-1">{consultation.subject}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(consultation.status)}
                      {getPriorityBadge(consultation.priority)}
                      <Badge variant="outline">{consultation.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewConsultation(consultation)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">مقدم الطلب</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{consultation.requester.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{consultation.requester.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">القسم</p>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{consultation.requester.department}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المستشار المسؤول</p>
                    <p className="font-medium">{consultation.assignedTo}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">{consultation.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>تاريخ الطلب: {consultation.createdDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>آخر تحديث: {consultation.lastUpdate}</span>
                    </div>
                  </div>
                  {consultation.responseDate && (
                    <div>
                      <span className="font-medium text-green-600">تم الرد في: {consultation.responseDate}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Consultation Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل الاستشارة القانونية</DialogTitle>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">رقم التذكرة</p>
                      <p className="font-medium">{selectedConsultation.ticketNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الموضوع</p>
                      <p className="font-medium">{selectedConsultation.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الفئة</p>
                      <Badge variant="outline">{selectedConsultation.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الحالة</p>
                      {getStatusBadge(selectedConsultation.status)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الأولوية</p>
                      {getPriorityBadge(selectedConsultation.priority)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات مقدم الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">الاسم</p>
                      <p className="font-medium">{selectedConsultation.requester.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">القسم</p>
                      <p className="font-medium">{selectedConsultation.requester.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المنصب</p>
                      <p className="font-medium">{selectedConsultation.requester.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المستشار المسؤول</p>
                      <p className="font-medium">{selectedConsultation.assignedTo}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">تفاصيل الاستشارة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedConsultation.description}</p>
                  </div>
                </CardContent>
              </Card>

              {selectedConsultation.response && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">الرد القانوني</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-gray-700">{selectedConsultation.response}</p>
                      <div className="mt-3 text-sm text-green-600">
                        <span>تاريخ الرد: {selectedConsultation.responseDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedConsultation.response && selectedConsultation.status !== 'closed' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إرسال الرد القانوني</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="اكتب الرد القانوني هنا..."
                      className="min-h-[150px]"
                    />
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleSendResponse}>
                        <Send className="ml-2 h-4 w-4" />
                        إرسال الرد
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};