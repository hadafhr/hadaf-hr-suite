import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Filter, PlusCircle, Eye, CheckCircle, XCircle, Clock, 
  DollarSign, Calendar, FileText, User, Building, CreditCard
} from 'lucide-react';

interface ExpenseRequest {
  id: string;
  employeeName: string;
  department: string;
  category: string;
  amount: number;
  purpose: string;
  status: 'draft' | 'submitted' | 'policy_check' | 'manager_approved' | 'budget_ok' | 'finance_approved' | 'card_funded' | 'rejected';
  requestDate: string;
  lastUpdate: string;
  priority: 'low' | 'medium' | 'high';
}

interface ExpenseRequestsManagerProps {
  isRTL: boolean;
}

export const ExpenseRequestsManager: React.FC<ExpenseRequestsManagerProps> = ({ isRTL }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    category: '',
    amount: '',
    purpose: '',
    duration: '',
    attachments: []
  });

  const mockRequests: ExpenseRequest[] = [
    {
      id: 'REQ-2025-001',
      employeeName: 'أحمد محمد السالم',
      department: 'المبيعات',
      category: 'سفر عمل',
      amount: 5000,
      purpose: 'زيارة عملاء في الدمام',
      status: 'manager_approved',
      requestDate: '2025-01-20',
      lastUpdate: '2025-01-21 14:30',
      priority: 'high'
    },
    {
      id: 'REQ-2025-002',
      employeeName: 'فاطمة النمر',
      department: 'التدريب',
      category: 'تدريب',
      amount: 3200,
      purpose: 'دورة إدارة المشاريع - الرياض',
      status: 'policy_check',
      requestDate: '2025-01-19',
      lastUpdate: '2025-01-20 10:15',
      priority: 'medium'
    },
    {
      id: 'REQ-2025-003',
      employeeName: 'خالد العتيبي',
      department: 'التشغيل',
      category: 'مصروفات تشغيلية',
      amount: 1500,
      purpose: 'صيانة معدات المكتب',
      status: 'finance_approved',
      requestDate: '2025-01-18',
      lastUpdate: '2025-01-21 09:45',
      priority: 'low'
    },
    {
      id: 'REQ-2025-004',
      employeeName: 'نورا الشهري',
      department: 'الموارد البشرية',
      category: 'أخرى',
      amount: 800,
      purpose: 'مواد مكتبية ولوازم',
      status: 'rejected',
      requestDate: '2025-01-17',
      lastUpdate: '2025-01-18 16:20',
      priority: 'low'
    }
  ];

  const getStatusConfig = (status: string) => {
    const statusConfigs = {
      'draft': { 
        color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', 
        text: isRTL ? 'مسودة' : 'Draft',
        icon: FileText
      },
      'submitted': { 
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', 
        text: isRTL ? 'مُرسل' : 'Submitted',
        icon: Clock
      },
      'policy_check': { 
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', 
        text: isRTL ? 'مراجعة السياسات' : 'Policy Check',
        icon: Eye
      },
      'manager_approved': { 
        color: 'bg-green-500/20 text-green-300 border-green-500/30', 
        text: isRTL ? 'معتمد من المدير' : 'Manager Approved',
        icon: CheckCircle
      },
      'budget_ok': { 
        color: 'bg-teal-500/20 text-teal-300 border-teal-500/30', 
        text: isRTL ? 'موافقة الميزانية' : 'Budget OK',
        icon: DollarSign
      },
      'finance_approved': { 
        color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', 
        text: isRTL ? 'معتمد مالياً' : 'Finance Approved',
        icon: CheckCircle
      },
      'card_funded': { 
        color: 'bg-green-600/20 text-green-400 border-green-600/30', 
        text: isRTL ? 'تم تمويل البطاقة' : 'Card Funded',
        icon: CreditCard
      },
      'rejected': { 
        color: 'bg-red-500/20 text-red-300 border-red-500/30', 
        text: isRTL ? 'مرفوض' : 'Rejected',
        icon: XCircle
      }
    };
    return statusConfigs[status as keyof typeof statusConfigs] || statusConfigs.draft;
  };

  const getPriorityConfig = (priority: string) => {
    const priorityConfigs = {
      'low': { color: 'bg-gray-500/20 text-gray-300', text: isRTL ? 'منخفضة' : 'Low' },
      'medium': { color: 'bg-yellow-500/20 text-yellow-300', text: isRTL ? 'متوسطة' : 'Medium' },
      'high': { color: 'bg-red-500/20 text-red-300', text: isRTL ? 'عالية' : 'High' }
    };
    return priorityConfigs[priority as keyof typeof priorityConfigs] || priorityConfigs.medium;
  };

  const handleCreateRequest = () => {
    // Handle creating new request
    console.log('Creating new request:', newRequest);
    setIsCreateDialogOpen(false);
    setNewRequest({ category: '', amount: '', purpose: '', duration: '', attachments: [] });
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={isRTL ? 'البحث في الطلبات...' : 'Search requests...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#2A2A2A] border-[#3A3A3A] text-white pl-10 h-12"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-white w-48 h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={isRTL ? 'تصفية بالحالة' : 'Filter by status'} />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
              <SelectItem value="submitted">{isRTL ? 'مُرسل' : 'Submitted'}</SelectItem>
              <SelectItem value="manager_approved">{isRTL ? 'معتمد من المدير' : 'Manager Approved'}</SelectItem>
              <SelectItem value="finance_approved">{isRTL ? 'معتمد مالياً' : 'Finance Approved'}</SelectItem>
              <SelectItem value="rejected">{isRTL ? 'مرفوض' : 'Rejected'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366] h-12">
            <CreditCard className="h-4 w-4 mr-2" />
            {isRTL ? 'تعبئة رصيد البطاقة' : 'Fund Card Balance'}
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#003366] text-white hover:bg-[#004488] h-12">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isRTL ? 'طلب بطاقة جديدة' : 'New Card Request'}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1C1C1C] border-[#3A3A3A] text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {isRTL ? 'طلب بطاقة مصروفات جديدة' : 'New Expense Card Request'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isRTL ? 'نوع المصروف' : 'Expense Category'}
                    </label>
                    <Select value={newRequest.category} onValueChange={(value) => setNewRequest({...newRequest, category: value})}>
                      <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                        <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select category'} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                        <SelectItem value="travel">{isRTL ? 'سفر عمل' : 'Business Travel'}</SelectItem>
                        <SelectItem value="training">{isRTL ? 'تدريب' : 'Training'}</SelectItem>
                        <SelectItem value="operational">{isRTL ? 'مصروفات تشغيلية' : 'Operational'}</SelectItem>
                        <SelectItem value="other">{isRTL ? 'أخرى' : 'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isRTL ? 'المبلغ المطلوب (ريال)' : 'Requested Amount (SAR)'}
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newRequest.amount}
                      onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                      className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'الغرض والسبب' : 'Purpose and Reason'}
                  </label>
                  <Textarea
                    placeholder={isRTL ? 'اشرح الغرض من الطلب...' : 'Explain the purpose of the request...'}
                    value={newRequest.purpose}
                    onChange={(e) => setNewRequest({...newRequest, purpose: e.target.value})}
                    className="bg-[#2A2A2A] border-[#3A3A3A] text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isRTL ? 'المدة المطلوبة' : 'Duration Required'}
                  </label>
                  <Select value={newRequest.duration} onValueChange={(value) => setNewRequest({...newRequest, duration: value})}>
                    <SelectTrigger className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                      <SelectValue placeholder={isRTL ? 'اختر المدة' : 'Select duration'} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                      <SelectItem value="day">{isRTL ? 'يوم واحد' : '1 Day'}</SelectItem>
                      <SelectItem value="week">{isRTL ? 'أسبوع' : '1 Week'}</SelectItem>
                      <SelectItem value="month">{isRTL ? 'شهر' : '1 Month'}</SelectItem>
                      <SelectItem value="custom">{isRTL ? 'مدة مخصصة' : 'Custom Duration'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCreateRequest}
                    className="bg-[#003366] text-white hover:bg-[#004488] flex-1"
                    disabled={!newRequest.category || !newRequest.amount || !newRequest.purpose}
                  >
                    {isRTL ? 'إرسال الطلب' : 'Submit Request'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-[#3A3A3A] text-white hover:bg-[#2A2A2A] flex-1"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Requests Table/Grid */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const statusConfig = getStatusConfig(request.status);
          const priorityConfig = getPriorityConfig(request.priority);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={request.id} className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                  {/* Request Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{request.id}</h3>
                        <p className="text-gray-300 flex items-center gap-2 mt-1">
                          <User className="h-4 w-4" />
                          {request.employeeName}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {request.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priorityConfig.color}>
                          {priorityConfig.text}
                        </Badge>
                        <Badge className={`${statusConfig.color} font-medium`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.text}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">{isRTL ? 'الفئة' : 'Category'}</p>
                        <p className="text-white font-medium">{request.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{isRTL ? 'المبلغ' : 'Amount'}</p>
                        <p className="text-white font-bold text-lg">₩{request.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{isRTL ? 'تاريخ الطلب' : 'Request Date'}</p>
                        <p className="text-white">{request.requestDate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-1">{isRTL ? 'الغرض' : 'Purpose'}</p>
                      <p className="text-gray-200">{request.purpose}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 lg:min-w-[120px]">
                    <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366] flex-1 lg:w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      {isRTL ? 'عرض' : 'View'}
                    </Button>
                    {request.status === 'submitted' && (
                      <>
                        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 flex-1 lg:w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'اعتماد' : 'Approve'}
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1 lg:w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'رفض' : 'Reject'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardContent className="py-16">
            <div className="text-center text-gray-400">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg mb-2">
                {isRTL ? 'لا توجد طلبات مطابقة' : 'No matching requests found'}
              </p>
              <p className="text-sm">
                {isRTL ? 'جرب تعديل معايير البحث أو إنشاء طلب جديد' : 'Try adjusting your search criteria or create a new request'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};