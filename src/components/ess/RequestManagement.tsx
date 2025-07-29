import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { 
  Plus,
  FileText,
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  User,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Send,
  Paperclip,
  Download,
  Search,
  Filter,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

interface Request {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  priority: 'low' | 'medium' | 'high';
  submissionDate: string;
  responseDate?: string;
  approver: string;
  comments?: string;
  attachments?: string[];
}

interface RequestManagementProps {
  language: 'ar' | 'en';
}

export const RequestManagement: React.FC<RequestManagementProps> = ({ language }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const requestTypes = [
    {
      id: 'leave',
      title: language === 'ar' ? 'طلب إجازة' : 'Leave Request',
      description: language === 'ar' ? 'طلب إجازة اعتيادية أو مرضية' : 'Request for regular or sick leave',
      icon: <CalendarIcon className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      id: 'salary_certificate',
      title: language === 'ar' ? 'تعريف بالراتب' : 'Salary Certificate',
      description: language === 'ar' ? 'طلب شهادة تعريف بالراتب' : 'Request for salary certificate',
      icon: <FileText className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      id: 'advance',
      title: language === 'ar' ? 'سلفة مالية' : 'Financial Advance',
      description: language === 'ar' ? 'طلب سلفة على الراتب' : 'Request for salary advance',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-yellow-600'
    },
    {
      id: 'data_update',
      title: language === 'ar' ? 'تعديل بيانات' : 'Data Update',
      description: language === 'ar' ? 'طلب تعديل البيانات الشخصية' : 'Request for personal data update',
      icon: <User className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      id: 'transfer',
      title: language === 'ar' ? 'نقل أو ترقية' : 'Transfer/Promotion',
      description: language === 'ar' ? 'طلب نقل أو ترقية وظيفية' : 'Request for transfer or promotion',
      icon: <Building className="h-5 w-5" />,
      color: 'text-orange-600'
    }
  ];

  const sampleRequests: Request[] = [
    {
      id: '1',
      type: 'leave',
      title: language === 'ar' ? 'طلب إجازة اعتيادية' : 'Annual Leave Request',
      description: language === 'ar' ? 'إجازة لمدة 5 أيام للسفر مع العائلة' : '5-day leave for family travel',
      status: 'approved',
      priority: 'medium',
      submissionDate: '2024-03-15',
      responseDate: '2024-03-16',
      approver: language === 'ar' ? 'د. سارة المطيري' : 'Dr. Sarah Al-Mutairi',
      comments: language === 'ar' ? 'تم الموافقة على الطلب' : 'Request approved'
    },
    {
      id: '2',
      type: 'salary_certificate',
      title: language === 'ar' ? 'شهادة راتب للبنك' : 'Salary Certificate for Bank',
      description: language === 'ar' ? 'شهادة راتب مطلوبة لإجراءات البنك' : 'Salary certificate required for banking procedures',
      status: 'pending',
      priority: 'high',
      submissionDate: '2024-03-20',
      approver: language === 'ar' ? 'قسم الموارد البشرية' : 'HR Department'
    },
    {
      id: '3',
      type: 'advance',
      title: language === 'ar' ? 'سلفة مالية عاجلة' : 'Urgent Financial Advance',
      description: language === 'ar' ? 'سلفة بقيمة 5000 ريال لظروف طارئة' : '5000 SAR advance for emergency',
      status: 'in_review',
      priority: 'high',
      submissionDate: '2024-03-18',
      approver: language === 'ar' ? 'مدير الإدارة المالية' : 'Finance Manager'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'in_review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'in_review': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      ar: {
        pending: 'معلق',
        approved: 'معتمد',
        rejected: 'مرفوض',
        in_review: 'قيد المراجعة'
      },
      en: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        in_review: 'In Review'
      }
    };
    return statusMap[language][status as keyof typeof statusMap.ar] || status;
  };

  const filteredRequests = sampleRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const requestStats = {
    total: sampleRequests.length,
    pending: sampleRequests.filter(r => r.status === 'pending').length,
    approved: sampleRequests.filter(r => r.status === 'approved').length,
    rejected: sampleRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            {language === 'ar' ? 'إدارة الطلبات' : 'Request Management'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'تقديم ومتابعة جميع طلباتك الإدارية والمالية' 
              : 'Submit and track all your administrative and financial requests'
            }
          </p>
        </div>
        
        <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'طلب جديد' : 'New Request'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {language === 'ar' ? 'تقديم طلب جديد' : 'Submit New Request'}
              </DialogTitle>
            </DialogHeader>
            <NewRequestForm language={language} onClose={() => setShowNewRequest(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
              </p>
              <p className="text-2xl font-bold">{requestStats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'معلقة' : 'Pending'}
              </p>
              <p className="text-2xl font-bold text-yellow-600">{requestStats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'معتمدة' : 'Approved'}
              </p>
              <p className="text-2xl font-bold text-green-600">{requestStats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'مرفوضة' : 'Rejected'}
              </p>
              <p className="text-2xl font-bold text-red-600">{requestStats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'البحث في الطلبات...' : 'Search requests...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={language === 'ar' ? 'تصفية حسب الحالة' : 'Filter by status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ar' ? 'جميع الطلبات' : 'All Requests'}
              </SelectItem>
              <SelectItem value="pending">
                {language === 'ar' ? 'معلقة' : 'Pending'}
              </SelectItem>
              <SelectItem value="approved">
                {language === 'ar' ? 'معتمدة' : 'Approved'}
              </SelectItem>
              <SelectItem value="rejected">
                {language === 'ar' ? 'مرفوضة' : 'Rejected'}
              </SelectItem>
              <SelectItem value="in_review">
                {language === 'ar' ? 'قيد المراجعة' : 'In Review'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-2 rounded-lg ${request.type === 'leave' ? 'bg-blue-50' : 
                                                  request.type === 'salary_certificate' ? 'bg-green-50' :
                                                  request.type === 'advance' ? 'bg-yellow-50' :
                                                  request.type === 'data_update' ? 'bg-purple-50' : 'bg-orange-50'}`}>
                  {requestTypes.find(t => t.id === request.type)?.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{request.title}</h3>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{getStatusText(request.status)}</span>
                    </Badge>
                    <Badge variant="outline" className={
                      request.priority === 'high' ? 'border-red-200 text-red-600' :
                      request.priority === 'medium' ? 'border-yellow-200 text-yellow-600' :
                      'border-blue-200 text-blue-600'
                    }>
                      {request.priority === 'high' ? (language === 'ar' ? 'عالية' : 'High') :
                       request.priority === 'medium' ? (language === 'ar' ? 'متوسطة' : 'Medium') :
                       (language === 'ar' ? 'منخفضة' : 'Low')}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{request.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {language === 'ar' ? 'تاريخ التقديم:' : 'Submitted:'} {request.submissionDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {language === 'ar' ? 'المعتمد:' : 'Approver:'} {request.approver}
                    </div>
                    {request.responseDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {language === 'ar' ? 'تاريخ الرد:' : 'Response:'} {request.responseDate}
                      </div>
                    )}
                  </div>
                  
                  {request.comments && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm">
                        <strong>{language === 'ar' ? 'التعليقات:' : 'Comments:'}</strong> {request.comments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  {language === 'ar' ? 'عرض' : 'View'}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {language === 'ar' ? 'تعليق' : 'Comment'}
                </Button>
                {request.status === 'approved' && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    {language === 'ar' ? 'تحميل' : 'Download'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {language === 'ar' ? 'لا توجد طلبات' : 'No Requests Found'}
          </h3>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'لا توجد طلبات تطابق معايير البحث الحالية'
              : 'No requests match the current search criteria'
            }
          </p>
        </Card>
      )}
    </div>
  );
};

// New Request Form Component
const NewRequestForm: React.FC<{ language: 'ar' | 'en'; onClose: () => void }> = ({ language, onClose }) => {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    amount: ''
  });

  const requestTypes = [
    {
      id: 'leave',
      title: language === 'ar' ? 'طلب إجازة' : 'Leave Request',
      icon: <CalendarIcon className="h-5 w-5" />
    },
    {
      id: 'salary_certificate',
      title: language === 'ar' ? 'تعريف بالراتب' : 'Salary Certificate',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'advance',
      title: language === 'ar' ? 'سلفة مالية' : 'Financial Advance',
      icon: <DollarSign className="h-5 w-5" />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting request:', { type: selectedType, ...formData });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Request Type Selection */}
      <div className="space-y-3">
        <Label>{language === 'ar' ? 'نوع الطلب' : 'Request Type'}</Label>
        <div className="grid grid-cols-1 gap-3">
          {requestTypes.map((type) => (
            <Button
              key={type.id}
              type="button"
              variant={selectedType === type.id ? 'default' : 'outline'}
              className="justify-start h-auto p-4"
              onClick={() => setSelectedType(type.id)}
            >
              {type.icon}
              <span className="ml-3">{type.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {selectedType && (
        <>
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">
                {language === 'ar' ? 'عنوان الطلب' : 'Request Title'}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={language === 'ar' ? 'أدخل عنوان الطلب' : 'Enter request title'}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={language === 'ar' ? 'أدخل تفاصيل الطلب' : 'Enter request details'}
                rows={4}
                required
              />
            </div>

            <div>
              <Label>{language === 'ar' ? 'الأولوية' : 'Priority'}</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    {language === 'ar' ? 'منخفضة' : 'Low'}
                  </SelectItem>
                  <SelectItem value="medium">
                    {language === 'ar' ? 'متوسطة' : 'Medium'}
                  </SelectItem>
                  <SelectItem value="high">
                    {language === 'ar' ? 'عالية' : 'High'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type-specific fields */}
          {selectedType === 'leave' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'تاريخ البداية' : 'Start Date'}</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'تاريخ النهاية' : 'End Date'}</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
            </div>
          )}

          {selectedType === 'advance' && (
            <div>
              <Label>{language === 'ar' ? 'المبلغ المطلوب (ريال)' : 'Requested Amount (SAR)'}</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0"
                required
              />
            </div>
          )}

          {/* Attachments */}
          <div>
            <Label>{language === 'ar' ? 'المرفقات (اختياري)' : 'Attachments (Optional)'}</Label>
            <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
              <div className="text-center">
                <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'اسحب الملفات هنا أو اضغط للتحديد' : 'Drag files here or click to select'}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" className="btn-primary">
              <Send className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'تقديم الطلب' : 'Submit Request'}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};