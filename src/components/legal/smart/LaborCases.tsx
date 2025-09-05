import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Gavel, 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Upload,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

export const LaborCases: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  // Mock data for labor cases
  const laborCases = [
    {
      id: 1,
      caseNumber: 'LC-2024-001',
      employee: {
        name: 'أحمد محمد العلي',
        id: 'EMP-001',
        department: 'تقنية المعلومات'
      },
      caseType: 'نزاع عمالي',
      status: 'active',
      priority: 'عالي',
      createdDate: '2024-01-15',
      description: 'نزاع حول ساعات العمل الإضافية وعدم دفع المستحقات',
      assignedTo: 'المستشار القانوني الأول',
      lastUpdate: '2024-01-20',
      nextAction: 'جلسة محكمة',
      nextDate: '2024-02-15',
      documents: 3,
      internalExternal: 'external'
    },
    {
      id: 2,
      caseNumber: 'LC-2024-002',
      employee: {
        name: 'فاطمة أحمد سالم',
        id: 'EMP-002', 
        department: 'الموارد البشرية'
      },
      caseType: 'إنهاء خدمة',
      status: 'under_review',
      priority: 'متوسط',
      createdDate: '2024-01-14',
      description: 'طلب إنهاء خدمة وحساب نهاية الخدمة',
      assignedTo: 'المستشار القانوني الثاني',
      lastUpdate: '2024-01-18',
      nextAction: 'مراجعة العقد',
      nextDate: '2024-01-25',
      documents: 5,
      internalExternal: 'internal'
    },
    {
      id: 3,
      caseNumber: 'LC-2024-003', 
      employee: {
        name: 'محمد عبدالله النور',
        id: 'EMP-003',
        department: 'التسويق'
      },
      caseType: 'مخالفة عقد',
      status: 'resolved',
      priority: 'منخفض',
      createdDate: '2024-01-13',
      description: 'مخالفة بنود السرية في العقد',
      assignedTo: 'المستشار القانوني الثالث',
      lastUpdate: '2024-01-19',
      nextAction: 'تم الحل',
      nextDate: '-',
      documents: 2,
      internalExternal: 'internal'
    }
  ];

  const caseStatistics = [
    {
      title: 'القضايا النشطة',
      value: '12',
      change: '+2',
      icon: Gavel,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'قيد المراجعة',
      value: '8',
      change: '-1',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'تم الحل',
      value: '47',
      change: '+5',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'متوسط وقت الحل',
      value: '15 يوم',
      change: '-3 أيام',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { label: 'نشط', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'under_review': { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'resolved': { label: 'محلول', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'closed': { label: 'مغلق', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      'pending': { label: 'معلق', color: 'bg-orange-100 text-orange-800', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['active'];
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

  const getCaseTypeBadge = (internalExternal: string) => {
    const config = {
      'internal': { label: 'داخلية', color: 'bg-blue-100 text-blue-800' },
      'external': { label: 'خارجية', color: 'bg-purple-100 text-purple-800' }
    };
    
    return <Badge className={config[internalExternal as keyof typeof config].color}>
      {config[internalExternal as keyof typeof config].label}
    </Badge>;
  };

  const handleCreateCase = () => {
    toast.success('تم إنشاء القضية بنجاح');
    setIsNewCaseOpen(false);
  };

  const filteredCases = laborCases.filter(case_ => {
    const matchesSearch = case_.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.caseType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || case_.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة القضايا العمالية</h2>
          <p className="text-gray-600 mt-2">متابعة وإدارة جميع القضايا العمالية والنزاعات</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isNewCaseOpen} onOpenChange={setIsNewCaseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                قضية جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة قضية جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">اختيار الموظف</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp1">أحمد محمد العلي</SelectItem>
                        <SelectItem value="emp2">فاطمة أحمد سالم</SelectItem>
                        <SelectItem value="emp3">محمد عبدالله النور</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">نوع القضية</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع القضية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="labor_dispute">نزاع عمالي</SelectItem>
                        <SelectItem value="termination">إنهاء خدمة</SelectItem>
                        <SelectItem value="contract_violation">مخالفة عقد</SelectItem>
                        <SelectItem value="salary_dispute">نزاع راتب</SelectItem>
                        <SelectItem value="discrimination">تمييز</SelectItem>
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
                    <label className="text-sm font-medium mb-2 block">الحالة</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">داخلية</SelectItem>
                        <SelectItem value="external">خارجية - مرفوعة للجهات الرسمية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">تفاصيل القضية</label>
                  <Textarea 
                    placeholder="اكتب تفاصيل القضية هنا..."
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">المستندات المرفقة</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">اسحب الملفات هنا أو اضغط للرفع</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PNG, JPG (الحد الأقصى 10MB)</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsNewCaseOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateCase}>
                    إنشاء القضية
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {caseStatistics.map((stat, index) => (
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
            placeholder="البحث في القضايا..."
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
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="under_review">قيد المراجعة</SelectItem>
            <SelectItem value="resolved">محلول</SelectItem>
            <SelectItem value="closed">مغلق</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة القضايا العمالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{case_.caseNumber}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(case_.status)}
                        {getPriorityBadge(case_.priority)}
                        {getCaseTypeBadge(case_.internalExternal)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">الموظف</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{case_.employee.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{case_.employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">نوع القضية</p>
                    <p className="font-medium">{case_.caseType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المسؤول</p>
                    <p className="font-medium">{case_.assignedTo}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">{case_.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>تاريخ الإنشاء: {case_.createdDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{case_.documents} مستندات</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">الإجراء التالي: {case_.nextAction}</span>
                    {case_.nextDate !== '-' && (
                      <span className="mr-2">({case_.nextDate})</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};