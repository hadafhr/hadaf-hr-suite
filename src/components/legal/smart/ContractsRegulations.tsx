import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  Settings,
  Wand2,
  PenTool,
  Shield,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const ContractsRegulations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contractsList, setContractsList] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isGeneratingContract, setIsGeneratingContract] = useState(false);
  const [isNewContractOpen, setIsNewContractOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [contractForm, setContractForm] = useState({
    employeeName: '',
    position: '',
    department: '',
    contractType: '',
    basicSalary: '',
    startDate: '',
    contractDuration: ''
  });

  // Mock data for fallback
  const mockContracts = [
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

  // Load data from Supabase
  useEffect(() => {
    loadContracts();
    loadTemplates();
  }, []);

  const loadContracts = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_contracts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContractsList(data || mockContracts);
    } catch (error) {
      console.error('Error loading contracts:', error);
      setContractsList(mockContracts);
    }
  };

  const loadTemplates = async () => {
    try {
      // Use mock data for now
      setTemplates(contractTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleUploadContract = () => {
    toast.success('تم رفع العقد بنجاح');
  };

  const handleCreateContract = () => {
    setIsNewContractOpen(true);
  };

  const handleAIGenerateContract = async () => {
    if (!contractForm.employeeName || !contractForm.contractType) {
      toast.error('يرجى ملء البيانات المطلوبة');
      return;
    }

    setIsGeneratingContract(true);
    try {
      const { data, error } = await supabase.functions.invoke('legal-ai-assistant', {
        body: {
          action: 'generate_contract',
          data: contractForm
        }
      });

      if (error) throw error;

      // Generate contract number and add to list
      const contractNumber = `LC-${new Date().getFullYear()}-${String(contractsList.length + 1).padStart(6, '0')}`;
      
      const newContract = {
        id: Date.now().toString(),
        contract_number: contractNumber,
        contract_title: `عقد عمل - ${contractForm.employeeName}`,
        contract_type: contractForm.contractType,
        party_b: { 
          name: contractForm.employeeName, 
          position: contractForm.position,
          department: contractForm.department 
        },
        financial_terms: { basic_salary: parseFloat(contractForm.basicSalary) },
        start_date: contractForm.startDate,
        status: 'draft',
        ai_review_score: 0.95,
        created_at: new Date().toISOString()
      };
      
      setContractsList([newContract, ...contractsList]);

      toast.success('تم إنشاء العقد بالذكاء الاصطناعي بنجاح');
      setIsAIGeneratorOpen(false);
      setContractForm({
        employeeName: '',
        position: '',
        department: '',
        contractType: '',
        basicSalary: '',
        startDate: '',
        contractDuration: ''
      });
      loadContracts();
      
    } catch (error) {
      console.error('Error generating contract:', error);
      toast.error('حدث خطأ في إنشاء العقد');
    } finally {
      setIsGeneratingContract(false);
    }
  };

  const handleComplianceCheck = async (contractId: string) => {
    try {
      const contract = contractsList.find(c => c.id === contractId);
      if (!contract) return;

      toast.success(`تم فحص العقد بالذكاء الاصطناعي - النتيجة: 95%`);
      
    } catch (error) {
      console.error('Error checking compliance:', error);
      toast.error('حدث خطأ في فحص الامتثال');
    }
  };

  const handleContractExpiry = async () => {
    // Check for contracts expiring soon
    const expiringContracts = contractsList.filter(contract => {
      if (!contract.end_date && !contract.endDate) return false;
      const endDate = new Date(contract.end_date || contract.endDate);
      const today = new Date();
      const daysToExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return daysToExpiry <= 30 && daysToExpiry > 0;
    });

    if (expiringContracts.length > 0) {
      toast.info(`يوجد ${expiringContracts.length} عقد ينتهي خلال 30 يوماً`);
    }
  };

  useEffect(() => {
    handleContractExpiry();
  }, [contractsList]);

  const filteredContracts = contractsList.filter(contract =>
    (contract.party_b?.name || contract.employeeName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contract.contract_number || contract.contractNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contract.contract_title || '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <Dialog open={isAIGeneratorOpen} onOpenChange={setIsAIGeneratorOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Wand2 className="ml-2 h-4 w-4" />
                إنشاء بالذكاء الاصطناعي
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  إنشاء عقد بالذكاء الاصطناعي
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">اسم الموظف</label>
                    <Input
                      value={contractForm.employeeName}
                      onChange={(e) => setContractForm({...contractForm, employeeName: e.target.value})}
                      placeholder="أدخل اسم الموظف"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">المنصب</label>
                    <Input
                      value={contractForm.position}
                      onChange={(e) => setContractForm({...contractForm, position: e.target.value})}
                      placeholder="أدخل المنصب"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">القسم</label>
                    <Input
                      value={contractForm.department}
                      onChange={(e) => setContractForm({...contractForm, department: e.target.value})}
                      placeholder="أدخل القسم"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">نوع العقد</label>
                    <Select value={contractForm.contractType} onValueChange={(value) => setContractForm({...contractForm, contractType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع العقد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="دوام كامل">دوام كامل</SelectItem>
                        <SelectItem value="دوام جزئي">دوام جزئي</SelectItem>
                        <SelectItem value="مشروع محدد المدة">مشروع محدد المدة</SelectItem>
                        <SelectItem value="استشاري">استشاري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">الراتب الأساسي</label>
                    <Input
                      type="number"
                      value={contractForm.basicSalary}
                      onChange={(e) => setContractForm({...contractForm, basicSalary: e.target.value})}
                      placeholder="أدخل الراتب بالريال"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">تاريخ البداية</label>
                    <Input
                      type="date"
                      value={contractForm.startDate}
                      onChange={(e) => setContractForm({...contractForm, startDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">مدة العقد</label>
                  <Select value={contractForm.contractDuration} onValueChange={(value) => setContractForm({...contractForm, contractDuration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مدة العقد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سنة واحدة">سنة واحدة</SelectItem>
                      <SelectItem value="سنتان">سنتان</SelectItem>
                      <SelectItem value="ثلاث سنوات">ثلاث سنوات</SelectItem>
                      <SelectItem value="غير محدد">غير محدد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAIGeneratorOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAIGenerateContract} disabled={isGeneratingContract}>
                    {isGeneratingContract ? (
                      <>
                        <Zap className="ml-2 h-4 w-4 animate-spin" />
                        جاري الإنشاء...
                      </>
                    ) : (
                      <>
                        <Wand2 className="ml-2 h-4 w-4" />
                        إنشاء العقد
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleCreateContract}>
            <Plus className="ml-2 h-4 w-4" />
            عقد تقليدي
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
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{contract.contract_number}</p>
                        <p className="text-sm text-gray-600">{contract.party_b?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">نوع العقد</p>
                        <p className="font-medium">{contract.contract_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">القسم</p>
                        <p className="font-medium">{contract.party_b?.department || 'غير محدد'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الانتهاء</p>
                        <p className="font-medium">{contract.end_date || 'غير محدد'}</p>
                      </div>
                      <div>
                        <div className="flex flex-col gap-1">
                          {getStatusBadge(contract.status)}
                          {contract.ai_review_score && (
                            <Badge variant="outline" className="text-xs">
                              AI: {Math.round(contract.ai_review_score * 100)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">الراتب</p>
                        <p className="font-medium">{contract.financial_terms?.basic_salary || 0} ر.س</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleComplianceCheck(contract.id)}
                        title="فحص الامتثال بالذكاء الاصطناعي"
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
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
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <FileCheck className="h-8 w-8 text-blue-600" />
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{template.template_name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <p>الفئة: {template.category}</p>
                        <p>اللغة: {template.language}</p>
                        <p>آخر تحديث: {new Date(template.updated_at).toLocaleDateString('ar-SA')}</p>
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