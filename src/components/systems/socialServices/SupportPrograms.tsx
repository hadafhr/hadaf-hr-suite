import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Home,
  GraduationCap,
  Heart,
  Users,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

export const SupportPrograms = () => {
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const programCategories = [
    { id: 'all', name: 'الكل', icon: Users },
    { id: 'financial', name: 'المساعدات المالية', icon: DollarSign },
    { id: 'housing', name: 'الإسكان والنقل', icon: Home },
    { id: 'education', name: 'التعليم والتدريب', icon: GraduationCap },
    { id: 'health', name: 'الرعاية الصحية', icon: Heart }
  ];

  const supportPrograms = [
    {
      id: 1,
      name: 'برنامج المساعدة الطبية',
      category: 'health',
      description: 'دعم مالي للموظفين في الحالات الطبية الطارئة والعمليات الجراحية',
      maxAmount: 25000,
      eligibilityCriteria: ['سنة واحدة على الأقل في الخدمة', 'تقديم التقارير الطبية المطلوبة'],
      isActive: true,
      beneficiaries: 145,
      totalSpent: 420000,
      conditions: 'يحق للموظف الاستفادة مرة واحدة كل سنتين'
    },
    {
      id: 2,
      name: 'إعانة الزواج',
      category: 'financial',
      description: 'مساعدة مالية للموظفين الجدد المقبلين على الزواج',
      maxAmount: 15000,
      eligibilityCriteria: ['غير متزوج سابقاً', 'سنة واحدة في الخدمة'],
      isActive: true,
      beneficiaries: 67,
      totalSpent: 1005000,
      conditions: 'تُصرف المعونة بعد تقديم عقد الزواج المصدق'
    },
    {
      id: 3,
      name: 'دعم التعليم الجامعي للأطفال',
      category: 'education',
      description: 'دعم الرسوم الجامعية لأطفال الموظفين المتفوقين',
      maxAmount: 20000,
      eligibilityCriteria: ['معدل 85% فما فوق', '5 سنوات في الخدمة'],
      isActive: true,
      beneficiaries: 89,
      totalSpent: 1780000,
      conditions: 'يُجدد سنوياً حسب الأداء الأكاديمي'
    },
    {
      id: 4,
      name: 'برنامج الإسكان المدعوم',
      category: 'housing',
      description: 'قروض بدون فوائد لشراء أو بناء المساكن للموظفين',
      maxAmount: 100000,
      eligibilityCriteria: ['3 سنوات في الخدمة', 'عدم امتلاك عقار سكني'],
      isActive: true,
      beneficiaries: 23,
      totalSpent: 2300000,
      conditions: 'قرض طويل المدى بدون فوائد يُسدد خلال 10 سنوات'
    },
    {
      id: 5,
      name: 'مساعدة الطوارئ',
      category: 'financial',
      description: 'دعم فوري للحالات الطارئة والظروف الاستثنائية',
      maxAmount: 10000,
      eligibilityCriteria: ['حالة طوارئ موثقة', 'موافقة اللجنة الاجتماعية'],
      isActive: true,
      beneficiaries: 41,
      totalSpent: 205000,
      conditions: 'يُصرف خلال 48 ساعة من الموافقة'
    }
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? supportPrograms 
    : supportPrograms.filter(program => program.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    const categoryObj = programCategories.find(cat => cat.id === category);
    return categoryObj?.icon || Users;
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      financial: 'bg-green-100 text-green-800',
      housing: 'bg-blue-100 text-blue-800',
      education: 'bg-purple-100 text-purple-800',
      health: 'bg-red-100 text-red-800'
    };
    
    const names = {
      financial: 'مالي',
      housing: 'إسكان',
      education: 'تعليم',
      health: 'صحي'
    };

    return (
      <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {names[category as keyof typeof names] || category}
      </Badge>
    );
  };

  const ProgramForm = ({ program, onClose }: { program?: any, onClose: () => void }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="programName">اسم البرنامج</Label>
          <Input 
            id="programName" 
            defaultValue={program?.name}
            placeholder="أدخل اسم البرنامج"
          />
        </div>
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select defaultValue={program?.category}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">المساعدات المالية</SelectItem>
              <SelectItem value="housing">الإسكان والنقل</SelectItem>
              <SelectItem value="education">التعليم والتدريب</SelectItem>
              <SelectItem value="health">الرعاية الصحية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea 
          id="description" 
          defaultValue={program?.description}
          placeholder="وصف تفصيلي للبرنامج"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="maxAmount">الحد الأقصى للمبلغ (₪)</Label>
          <Input 
            id="maxAmount" 
            type="number"
            defaultValue={program?.maxAmount}
            placeholder="0"
          />
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Switch defaultChecked={program?.isActive} />
          <Label>البرنامج نشط</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="eligibility">شروط الاستحقاق</Label>
        <Textarea 
          id="eligibility" 
          defaultValue={program?.eligibilityCriteria?.join('\n')}
          placeholder="أدخل شروط الاستحقاق (كل شرط في سطر منفصل)"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="conditions">الشروط والأحكام</Label>
        <Textarea 
          id="conditions" 
          defaultValue={program?.conditions}
          placeholder="الشروط والأحكام الإضافية"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
        <Button variant="outline" onClick={onClose}>
          إلغاء
        </Button>
        <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
          {program ? 'تحديث البرنامج' : 'إضافة البرنامج'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">برامج الدعم الاجتماعي</h2>
          <p className="text-muted-foreground mt-1">
            إدارة وتنظيم برامج المساعدة والدعم للموظفين
          </p>
        </div>
        <Dialog open={showAddProgram} onOpenChange={setShowAddProgram}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              برنامج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة برنامج دعم جديد</DialogTitle>
            </DialogHeader>
            <ProgramForm onClose={() => setShowAddProgram(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-1 relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="البحث في البرامج..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          تصفية
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {programCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => {
          const Icon = getCategoryIcon(program.category);
          
          return (
            <Card key={program.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                        {getCategoryBadge(program.category)}
                        <Badge variant={program.isActive ? "default" : "secondary"}>
                          {program.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>تعديل برنامج الدعم</DialogTitle>
                        </DialogHeader>
                        <ProgramForm 
                          program={program} 
                          onClose={() => {}} 
                        />
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">{program.beneficiaries}</div>
                    <div className="text-xs text-muted-foreground">مستفيد</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">₪{program.totalSpent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">إجمالي المصروف</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">الحد الأقصى:</span>
                    <span className="text-sm text-primary font-semibold">₪{program.maxAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">شروط الاستحقاق:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {program.eligibilityCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {program.conditions && (
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                      <p className="text-xs text-yellow-800">{program.conditions}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    عرض التفاصيل
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    إدارة الطلبات
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};