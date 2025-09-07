import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  HeadphonesIcon, 
  MessageSquare, 
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Send,
  Phone,
  Mail,
  Globe,
  Star,
  FileText,
  Camera,
  Paperclip,
  User,
  Calendar
} from 'lucide-react';

export const TechnicalSupport: React.FC = () => {
  const [activeSupportTab, setActiveSupportTab] = useState('tickets');
  const [newTicketData, setNewTicketData] = useState({
    title: '',
    description: '',
    priority: '',
    category: ''
  });

  // Mock support tickets data
  const supportTickets = [
    {
      id: 'TK-2024-001',
      title: 'مشكلة في تسجيل الدخول',
      description: 'لا أستطيع تسجيل الدخول إلى النظام باستخدام بيانات الاعتماد الصحيحة',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-01-15T10:30:00',
      updatedAt: '2024-01-15T14:22:00',
      assignedTo: 'أحمد التقني',
      responses: 3
    },
    {
      id: 'TK-2024-002',
      title: 'طلب تدريب على النظام',
      description: 'نحتاج جلسة تدريبية للموظفين الجدد على استخدام نظام إدارة الموارد البشرية',
      status: 'in_progress',
      priority: 'medium',
      category: 'training',
      createdAt: '2024-01-14T09:15:00',
      updatedAt: '2024-01-15T11:30:00',
      assignedTo: 'سارة المدربة',
      responses: 5
    },
    {
      id: 'TK-2024-003',
      title: 'استفسار حول الفواتير',
      description: 'أريد الاستفسار عن آخر فاتورة وطريقة الدفع المتاحة',
      status: 'resolved',
      priority: 'low',
      category: 'billing',
      createdAt: '2024-01-12T16:45:00',
      updatedAt: '2024-01-13T10:20:00',
      assignedTo: 'محمد المالي',
      responses: 2
    }
  ];

  const supportCategories = [
    { value: 'technical', label: 'مشكلة تقنية' },
    { value: 'billing', label: 'الفواتير والمدفوعات' },
    { value: 'training', label: 'التدريب والدعم' },
    { value: 'feature', label: 'طلب ميزة جديدة' },
    { value: 'integration', label: 'التكامل مع أنظمة أخرى' },
    { value: 'other', label: 'أخرى' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'منخفض', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'متوسط', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'عالي', color: 'bg-red-100 text-red-800' },
    { value: 'urgent', label: 'عاجل', color: 'bg-red-200 text-red-900' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in_progress':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Ticket className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوح';
      case 'in_progress': return 'قيد المعالجة';
      case 'resolved': return 'محلول';
      default: return 'غير معروف';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = priorityLevels.find(p => p.value === priority);
    return priorityConfig ? (
      <Badge className={priorityConfig.color}>
        {priorityConfig.label}
      </Badge>
    ) : null;
  };

  const handleNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle new ticket submission
    console.log('New ticket:', newTicketData);
    // Reset form
    setNewTicketData({ title: '', description: '', priority: '', category: '' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSupportTab} onValueChange={setActiveSupportTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets">تذاكر الدعم</TabsTrigger>
          <TabsTrigger value="new">إنشاء تذكرة جديدة</TabsTrigger>
          <TabsTrigger value="chat">الدردشة المباشرة</TabsTrigger>
          <TabsTrigger value="resources">الموارد والأدلة</TabsTrigger>
        </TabsList>

        {/* Support Tickets */}
        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-primary" />
                  تذاكر الدعم الفني
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="البحث في التذاكر..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    تصفية
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <Card key={ticket.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(ticket.status)}
                            <h3 className="font-semibold text-lg">{ticket.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {ticket.id}
                            </Badge>
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>مُعيَّن إلى: {ticket.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>إنشئ في: {formatDate(ticket.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{ticket.responses} ردود</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant="outline" 
                            className={
                              ticket.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                              ticket.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-blue-50 text-blue-700 border-blue-200'
                            }
                          >
                            {getStatusText(ticket.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            عرض التفاصيل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Ticket */}
        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                إنشاء تذكرة دعم جديدة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewTicketSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">عنوان المشكلة *</label>
                    <Input
                      placeholder="اكتب عنوان واضح للمشكلة"
                      value={newTicketData.title}
                      onChange={(e) => setNewTicketData({...newTicketData, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع المشكلة *</label>
                    <Select value={newTicketData.category} onValueChange={(value) => setNewTicketData({...newTicketData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المشكلة" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">مستوى الأولوية *</label>
                  <Select value={newTicketData.priority} onValueChange={(value) => setNewTicketData({...newTicketData, priority: value})}>
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue placeholder="اختر مستوى الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">وصف تفصيلي للمشكلة *</label>
                  <Textarea
                    placeholder="اشرح المشكلة بالتفصيل، وما الخطوات التي قمت بها، وما النتيجة المتوقعة..."
                    value={newTicketData.description}
                    onChange={(e) => setNewTicketData({...newTicketData, description: e.target.value})}
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">إرفاق ملفات (اختياري)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Paperclip className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-600">اسحب الملفات هنا أو اضغط للاختيار</p>
                      <p className="text-xs text-gray-400">الحد الأقصى: 10 ميجابايت لكل ملف</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    إلغاء
                  </Button>
                  <Button type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    إرسال التذكرة
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Chat */}
        <TabsContent value="chat" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  الدردشة المباشرة مع الدعم الفني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat messages area */}
                  <div className="h-96 border rounded-lg p-4 bg-gray-50 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <HeadphonesIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">مرحباً! كيف يمكنني مساعدتك اليوم؟</p>
                          <span className="text-xs text-gray-500">منذ دقيقة</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                          <p className="text-sm">لدي مشكلة في تسجيل الدخول</p>
                          <span className="text-xs text-blue-200">منذ 30 ثانية</span>
                        </div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat input */}
                  <div className="flex items-center gap-2">
                    <Input placeholder="اكتب رسالتك هنا..." className="flex-1" />
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">طرق التواصل الأخرى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">الهاتف</p>
                      <p className="text-sm text-gray-600">+966 11 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">البريد الإلكتروني</p>
                      <p className="text-sm text-gray-600">support@boud.sa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">ساعات العمل</p>
                      <p className="text-sm text-gray-600">24/7 دعم مستمر</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">دليل المستخدم</h3>
                <p className="text-sm text-gray-600 mb-4">دليل شامل لاستخدام جميع ميزات النظام</p>
                <Button variant="outline" size="sm">تحميل PDF</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">فيديوهات تعليمية</h3>
                <p className="text-sm text-gray-600 mb-4">مجموعة من الفيديوهات التعليمية</p>
                <Button variant="outline" size="sm">مشاهدة</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">قاعدة المعرفة</h3>
                <p className="text-sm text-gray-600 mb-4">أسئلة شائعة وحلول مشاكل معروفة</p>
                <Button variant="outline" size="sm">تصفح</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};