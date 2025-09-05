import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileCheck,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

export const ContractsRegulations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      contractNumber: 'CON-2024-001',
      employeeName: 'أحمد محمد العلي',
      contractType: 'دوام كامل',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      department: 'تقنية المعلومات',
      salary: 12000,
      reviewDate: '2024-12-01'
    },
    {
      id: 2,
      contractNumber: 'CON-2024-002',
      employeeName: 'فاطمة أحمد سالم',
      contractType: 'دوام جزئي',
      status: 'expiring_soon',
      startDate: '2023-06-15',
      endDate: '2024-06-15',
      department: 'الموارد البشرية',
      salary: 8000,
      reviewDate: '2024-05-15'
    },
    {
      id: 3,
      contractNumber: 'CON-2024-003',
      employeeName: 'محمد عبدالله النور',
      contractType: 'مشروع',
      status: 'pending_renewal',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      department: 'التسويق',
      salary: 15000,
      reviewDate: '2024-07-01'
    }
  ];

  // Mock data for regulations
  const regulations = [
    {
      id: 1,
      title: 'لائحة الحضور والانصراف',
      category: 'سياسات الموظفين',
      status: 'active',
      version: '2.1',
      lastUpdated: '2024-01-15',
      approvedBy: 'الإدارة القانونية',
      nextReview: '2024-07-15'
    },
    {
      id: 2,
      title: 'لائحة الإجازات والعطل',
      category: 'سياسات الموظفين', 
      status: 'under_review',
      version: '1.8',
      lastUpdated: '2023-12-20',
      approvedBy: 'الموارد البشرية',
      nextReview: '2024-06-20'
    },
    {
      id: 3,
      title: 'لائحة الرواتب والبدلات',
      category: 'السياسات المالية',
      status: 'draft',
      version: '3.0',
      lastUpdated: '2024-01-10',
      approvedBy: 'الإدارة المالية',
      nextReview: '2024-04-10'
    }
  ];

  // Contract templates
  const contractTemplates = [
    {
      id: 1,
      name: 'عقد عمل دوام كامل',
      description: 'نموذج موحد لعقود الدوام الكامل',
      category: 'عقود العمل',
      language: 'عربي',
      lastUpdated: '2024-01-01'
    },
    {
      id: 2,
      name: 'عقد عمل دوام جزئي',
      description: 'نموذج موحد لعقود الدوام الجزئي',
      category: 'عقود العمل',
      language: 'عربي/إنجليزي',
      lastUpdated: '2024-01-01'
    },
    {
      id: 3,
      name: 'عقد مشروع محدد المدة',
      description: 'نموذج موحد لعقود المشاريع',
      category: 'عقود المشاريع',
      language: 'عربي',
      lastUpdated: '2024-01-01'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { label: 'ساري', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'expiring_soon': { label: 'ينتهي قريباً', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      'pending_renewal': { label: 'بانتظار التجديد', color: 'bg-orange-100 text-orange-800', icon: Clock },
      'expired': { label: 'منتهي', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'under_review': { label: 'قيد المراجعة', color: 'bg-blue-100 text-blue-800', icon: Clock },
      'draft': { label: 'مسودة', color: 'bg-gray-100 text-gray-800', icon: FileText }
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

  const handleUploadContract = () => {
    toast.success('تم رفع العقد بنجاح');
  };

  const handleCreateContract = () => {
    toast.info('فتح نموذج إنشاء عقد جديد');
  };

  const filteredContracts = contracts.filter(contract =>
    contract.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة العقود واللوائح</h2>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع العقود واللوائح الداخلية</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleUploadContract}>
            <Upload className="ml-2 h-4 w-4" />
            رفع عقد
          </Button>
          <Button onClick={handleCreateContract}>
            <Plus className="ml-2 h-4 w-4" />
            عقد جديد
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في العقود والموظفين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contracts">العقود النشطة</TabsTrigger>
          <TabsTrigger value="regulations">اللوائح الداخلية</TabsTrigger>
          <TabsTrigger value="templates">نماذج العقود</TabsTrigger>
        </TabsList>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          {/* Contracts Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">العقود النشطة</p>
                    <p className="text-xl font-bold">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تنتهي قريباً</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">تحت المراجعة</p>
                    <p className="text-xl font-bold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المراجعة الشهر</p>
                    <p className="text-xl font-bold">25</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة العقود</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{contract.contractNumber}</p>
                        <p className="text-sm text-gray-600">{contract.employeeName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">نوع العقد</p>
                        <p className="font-medium">{contract.contractType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">القسم</p>
                        <p className="font-medium">{contract.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الانتهاء</p>
                        <p className="font-medium">{contract.endDate}</p>
                      </div>
                      <div>
                        {getStatusBadge(contract.status)}
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
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اللوائح الداخلية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{regulation.title}</h3>
                        {getStatusBadge(regulation.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">الفئة: {regulation.category}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">الإصدار: {regulation.version}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">آخر تحديث: {regulation.lastUpdated}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">المراجعة التالية: {regulation.nextReview}</p>
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
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نماذج العقود الموحدة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contractTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <FileCheck className="h-8 w-8 text-blue-600" />
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <p>الفئة: {template.category}</p>
                        <p>اللغة: {template.language}</p>
                        <p>آخر تحديث: {template.lastUpdated}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="ml-2 h-4 w-4" />
                          معاينة
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Plus className="ml-2 h-4 w-4" />
                          استخدام
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};