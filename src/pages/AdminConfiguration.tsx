import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  RefreshCw,
  Building,
  Users,
  FileText,
  Shield,
  Database,
  Palette
} from 'lucide-react';

interface ConfigOption {
  id: string;
  name: string;
  nameEn?: string;
  value: string;
  category: string;
  isActive: boolean;
}

interface CompanyPolicy {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
}

export const AdminConfiguration: React.FC = () => {
  const { toast } = useToast();
  
  // Configuration Options State
  const [departments, setDepartments] = useState<ConfigOption[]>([
    { id: '1', name: 'تقنية المعلومات', nameEn: 'IT', value: 'it', category: 'departments', isActive: true },
    { id: '2', name: 'الموارد البشرية', nameEn: 'HR', value: 'hr', category: 'departments', isActive: true },
    { id: '3', name: 'المحاسبة', nameEn: 'Accounting', value: 'finance', category: 'departments', isActive: true },
    { id: '4', name: 'المبيعات', nameEn: 'Sales', value: 'sales', category: 'departments', isActive: true },
    { id: '5', name: 'التسويق', nameEn: 'Marketing', value: 'marketing', category: 'departments', isActive: true }
  ]);

  const [positions, setPositions] = useState<ConfigOption[]>([
    { id: '1', name: 'مطور برمجيات', nameEn: 'Software Developer', value: 'developer', category: 'positions', isActive: true },
    { id: '2', name: 'محاسب', nameEn: 'Accountant', value: 'accountant', category: 'positions', isActive: true },
    { id: '3', name: 'مدير مبيعات', nameEn: 'Sales Manager', value: 'sales_manager', category: 'positions', isActive: true },
    { id: '4', name: 'أخصائي موارد بشرية', nameEn: 'HR Specialist', value: 'hr_specialist', category: 'positions', isActive: true }
  ]);

  const [disciplinaryReasons, setDisciplinaryReasons] = useState<ConfigOption[]>([
    { id: '1', name: 'التأخير المتكرر', value: 'late_arrival', category: 'disciplinary', isActive: true },
    { id: '2', name: 'الغياب بدون إذن', value: 'unauthorized_absence', category: 'disciplinary', isActive: true },
    { id: '3', name: 'مخالفة اللوائح', value: 'policy_violation', category: 'disciplinary', isActive: true },
    { id: '4', name: 'عدم إنجاز المهام', value: 'task_failure', category: 'disciplinary', isActive: true }
  ]);

  const [leaveTypes, setLeaveTypes] = useState<ConfigOption[]>([
    { id: '1', name: 'إجازة سنوية', value: 'annual', category: 'leave_types', isActive: true },
    { id: '2', name: 'إجازة مرضية', value: 'sick', category: 'leave_types', isActive: true },
    { id: '3', name: 'إجازة طارئة', value: 'emergency', category: 'leave_types', isActive: true },
    { id: '4', name: 'إجازة أمومة', value: 'maternity', category: 'leave_types', isActive: true }
  ]);

  // Company Policies State
  const [companyPolicies, setCompanyPolicies] = useState<CompanyPolicy[]>([
    {
      id: '1',
      title: 'سياسة الحضور والانصراف',
      content: 'ساعات العمل الرسمية من 8:00 صباحاً حتى 5:00 مساءً مع ساعة استراحة للغداء.',
      category: 'attendance',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'سياسة الإجازات',
      content: 'يحق للموظف الحصول على 21 يوم إجازة سنوية قابلة للترحيل جزئياً.',
      category: 'leave',
      lastUpdated: '2024-01-10'
    }
  ]);

  // Form States
  const [newOption, setNewOption] = useState({ name: '', nameEn: '', value: '', category: '' });
  const [editingOption, setEditingOption] = useState<ConfigOption | null>(null);
  const [newPolicy, setNewPolicy] = useState({ title: '', content: '', category: '' });
  const [editingPolicy, setEditingPolicy] = useState<CompanyPolicy | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);

  // Utility Functions
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddOption = (category: string) => {
    if (!newOption.name || !newOption.value) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const option: ConfigOption = {
      id: generateId(),
      name: newOption.name,
      nameEn: newOption.nameEn,
      value: newOption.value,
      category,
      isActive: true
    };

    switch (category) {
      case 'departments':
        setDepartments([...departments, option]);
        break;
      case 'positions':
        setPositions([...positions, option]);
        break;
      case 'disciplinary':
        setDisciplinaryReasons([...disciplinaryReasons, option]);
        break;
      case 'leave_types':
        setLeaveTypes([...leaveTypes, option]);
        break;
    }

    setNewOption({ name: '', nameEn: '', value: '', category: '' });
    setShowAddDialog(false);
    
    toast({
      title: "تم إضافة الخيار بنجاح",
      description: `تم إضافة "${newOption.name}" إلى قائمة الخيارات`
    });
  };

  const handleEditOption = (option: ConfigOption) => {
    setEditingOption(option);
    setNewOption({
      name: option.name,
      nameEn: option.nameEn || '',
      value: option.value,
      category: option.category
    });
    setShowAddDialog(true);
  };

  const handleUpdateOption = () => {
    if (!editingOption) return;

    const updatedOption = {
      ...editingOption,
      name: newOption.name,
      nameEn: newOption.nameEn,
      value: newOption.value
    };

    const updateList = (list: ConfigOption[]) => 
      list.map(item => item.id === editingOption.id ? updatedOption : item);

    switch (editingOption.category) {
      case 'departments':
        setDepartments(updateList(departments));
        break;
      case 'positions':
        setPositions(updateList(positions));
        break;
      case 'disciplinary':
        setDisciplinaryReasons(updateList(disciplinaryReasons));
        break;
      case 'leave_types':
        setLeaveTypes(updateList(leaveTypes));
        break;
    }

    setEditingOption(null);
    setNewOption({ name: '', nameEn: '', value: '', category: '' });
    setShowAddDialog(false);

    toast({
      title: "تم تحديث الخيار بنجاح",
      description: `تم تحديث "${updatedOption.name}"`
    });
  };

  const handleDeleteOption = (optionId: string, category: string) => {
    const filterList = (list: ConfigOption[]) => list.filter(item => item.id !== optionId);

    switch (category) {
      case 'departments':
        setDepartments(filterList(departments));
        break;
      case 'positions':
        setPositions(filterList(positions));
        break;
      case 'disciplinary':
        setDisciplinaryReasons(filterList(disciplinaryReasons));
        break;
      case 'leave_types':
        setLeaveTypes(filterList(leaveTypes));
        break;
    }

    toast({
      title: "تم حذف الخيار",
      description: "تم حذف الخيار بنجاح",
      variant: "destructive"
    });
  };

  const handleAddPolicy = () => {
    if (!newPolicy.title || !newPolicy.content) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء عنوان ومحتوى السياسة",
        variant: "destructive"
      });
      return;
    }

    const policy: CompanyPolicy = {
      id: generateId(),
      title: newPolicy.title,
      content: newPolicy.content,
      category: newPolicy.category,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setCompanyPolicies([...companyPolicies, policy]);
    setNewPolicy({ title: '', content: '', category: '' });
    setShowPolicyDialog(false);

    toast({
      title: "تم إضافة السياسة بنجاح",
      description: `تم إضافة سياسة "${policy.title}"`
    });
  };

  const ConfigOptionsList = ({ 
    options, 
    category, 
    title 
  }: { 
    options: ConfigOption[], 
    category: string, 
    title: string 
  }) => (
    <Card className="p-6 backdrop-blur-xl bg-black/40 border border-[#008C6A]/30 hover:shadow-2xl hover:shadow-[#008C6A]/20 transition-all duration-300 animate-fade-in rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-white">{title}</CardTitle>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#008C6A]/80 hover:to-[#00694F]/80 text-white"
          onClick={() => {
            setNewOption({ ...newOption, category });
            setShowAddDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center justify-between p-3 border border-[#008C6A]/30 bg-black/20 rounded-lg">
              <div>
                <span className="font-medium text-white">{option.name}</span>
                {option.nameEn && (
                  <span className="text-sm text-gray-300 ml-2">({option.nameEn})</span>
                )}
                <div className="text-xs text-gray-400">القيمة: {option.value}</div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:bg-[#008C6A]/20"
                  onClick={() => handleEditOption(option)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:bg-red-500/20"
                  onClick={() => handleDeleteOption(option.id, category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      <div className="relative z-10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-2">
              إعدادات النظام الإدارية
            </h1>
            <p className="text-gray-300">
              إدارة جميع خيارات النظام والسياسات والإعدادات
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#008C6A]/30 text-white hover:bg-[#008C6A]/20">
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تحميل الإعدادات
            </Button>
            <Button className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#008C6A]/80 hover:to-[#00694F]/80 text-white">
              <Save className="h-4 w-4 mr-2" />
              حفظ جميع التغييرات
            </Button>
          </div>
        </div>

        {/* Configuration Tabs */}
        <Tabs defaultValue="dropdown-options" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-[#008C6A]/30">
            <TabsTrigger value="dropdown-options" className="flex items-center gap-2 text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white">
              <Database className="h-4 w-4" />
              خيارات القوائم
            </TabsTrigger>
            <TabsTrigger value="company-policies" className="flex items-center gap-2 text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              سياسات الشركة
            </TabsTrigger>
            <TabsTrigger value="system-settings" className="flex items-center gap-2 text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white">
              <Settings className="h-4 w-4" />
              إعدادات النظام
            </TabsTrigger>
            <TabsTrigger value="ui-customization" className="flex items-center gap-2 text-white data-[state=active]:bg-[#008C6A] data-[state=active]:text-white">
              <Palette className="h-4 w-4" />
              تخصيص الواجهة
            </TabsTrigger>
          </TabsList>

          {/* Dropdown Options Tab */}
          <TabsContent value="dropdown-options" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ConfigOptionsList 
                options={departments} 
                category="departments" 
                title="الأقسام" 
              />
              <ConfigOptionsList 
                options={positions} 
                category="positions" 
                title="المناصب الوظيفية" 
              />
              <ConfigOptionsList 
                options={disciplinaryReasons} 
                category="disciplinary" 
                title="أسباب الإجراءات التأديبية" 
              />
              <ConfigOptionsList 
                options={leaveTypes} 
                category="leave_types" 
                title="أنواع الإجازات" 
              />
            </div>
          </TabsContent>

          {/* Company Policies Tab */}
          <TabsContent value="company-policies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">سياسات ولوائح الشركة</h2>
              <Button onClick={() => setShowPolicyDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                إضافة سياسة جديدة
              </Button>
            </div>
            
            <div className="grid gap-4">
              {companyPolicies.map((policy) => (
                <Card key={policy.id} className="dashboard-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{policy.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          آخر تحديث: {policy.lastUpdated}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{policy.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system-settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>إعدادات الحضور والانصراف</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="work-start">بداية الدوام</Label>
                      <Input id="work-start" type="time" />
                    </div>
                    <div>
                      <Label htmlFor="work-end">نهاية الدوام</Label>
                      <Input id="work-end" type="time" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location-radius">نطاق الموقع المسموح (متر)</Label>
                    <Input id="location-radius" type="number" placeholder="200" />
                  </div>
                  <div>
                    <Label htmlFor="break-time">مدة الاستراحة (دقيقة)</Label>
                    <Input id="break-time" type="number" placeholder="60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>إعدادات الإجازات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="annual-leave">رصيد الإجازة السنوية (يوم)</Label>
                    <Input id="annual-leave" type="number" placeholder="21" />
                  </div>
                  <div>
                    <Label htmlFor="sick-leave">رصيد الإجازة المرضية (يوم)</Label>
                    <Input id="sick-leave" type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label htmlFor="emergency-leave">رصيد الإجازة الطارئة (يوم)</Label>
                    <Input id="emergency-leave" type="number" placeholder="5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* UI Customization Tab */}
          <TabsContent value="ui-customization" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>ألوان النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary-color">اللون الأساسي</Label>
                    <Input id="primary-color" type="color" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">اللون الثانوي</Label>
                    <Input id="secondary-color" type="color" className="h-10" />
                  </div>
                  <div>
                    <Label htmlFor="accent-color">لون التمييز</Label>
                    <Input id="accent-color" type="color" className="h-10" />
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>شعار الشركة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-logo">رفع شعار الشركة</Label>
                    <Input id="company-logo" type="file" accept="image/*" />
                  </div>
                  <div>
                    <Label htmlFor="company-name">اسم الشركة</Label>
                    <Input id="company-name" placeholder="اسم شركتك" />
                  </div>
                  <div>
                    <Label htmlFor="company-slogan">شعار الشركة</Label>
                    <Input id="company-slogan" placeholder="شعار أو عبارة الشركة" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Option Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOption ? 'تعديل الخيار' : 'إضافة خيار جديد'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="option-name">الاسم بالعربية *</Label>
                <Input
                  id="option-name"
                  value={newOption.name}
                  onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                  placeholder="أدخل الاسم بالعربية"
                />
              </div>
              <div>
                <Label htmlFor="option-name-en">الاسم بالإنجليزية</Label>
                <Input
                  id="option-name-en"
                  value={newOption.nameEn}
                  onChange={(e) => setNewOption({ ...newOption, nameEn: e.target.value })}
                  placeholder="Enter name in English"
                />
              </div>
              <div>
                <Label htmlFor="option-value">القيمة *</Label>
                <Input
                  id="option-value"
                  value={newOption.value}
                  onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
                  placeholder="option_value"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={editingOption ? handleUpdateOption : () => handleAddOption(newOption.category)}>
                  {editingOption ? 'تحديث' : 'إضافة'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Policy Dialog */}
        <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة سياسة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="policy-title">عنوان السياسة *</Label>
                <Input
                  id="policy-title"
                  value={newPolicy.title}
                  onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                  placeholder="أدخل عنوان السياسة"
                />
              </div>
              <div>
                <Label htmlFor="policy-category">فئة السياسة</Label>
                <Input
                  id="policy-category"
                  value={newPolicy.category}
                  onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                  placeholder="مثل: حضور، إجازات، سلوك"
                />
              </div>
              <div>
                <Label htmlFor="policy-content">محتوى السياسة *</Label>
                <Textarea
                  id="policy-content"
                  value={newPolicy.content}
                  onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                  placeholder="أدخل تفاصيل السياسة..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPolicyDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddPolicy}>
                  إضافة السياسة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </div>
  );
};