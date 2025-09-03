import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, Search, Filter, BookOpen, Users, Clock, 
  DollarSign, Edit, Trash2, Eye, Calendar, Award,
  Video, MapPin, Globe, Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TrainingPrograms = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({
    title: '',
    category: '',
    type: '',
    duration: '',
    cost: '',
    capacity: '',
    trainer: '',
    department: '',
    objectives: '',
    description: ''
  });

  const trainingPrograms = [
    {
      id: 'TRN-001',
      title: isRTL ? 'تطوير مهارات القيادة المتقدمة' : 'Advanced Leadership Development',
      category: 'Leadership',
      type: 'Hybrid',
      duration: '40 hours',
      cost: 5000,
      capacity: 20,
      enrolled: 18,
      trainer: 'Dr. Ahmed Hassan',
      department: 'All Departments',
      startDate: '2024-07-15',
      endDate: '2024-08-15',
      status: 'Active',
      objectives: [
        isRTL ? 'تطوير المهارات القيادية' : 'Develop leadership skills',
        isRTL ? 'تحسين التواصل' : 'Improve communication',
        isRTL ? 'إدارة الفرق' : 'Team management'
      ],
      description: isRTL 
        ? 'برنامج شامل لتطوير المهارات القيادية والإدارية للمديرين والقادة المستقبليين'
        : 'Comprehensive program for developing leadership and management skills for current and future leaders',
      completionRate: 85
    },
    {
      id: 'TRN-002',
      title: isRTL ? 'الأمان والسلامة المهنية' : 'Occupational Health & Safety',
      category: 'Safety',
      type: 'Classroom',
      duration: '16 hours',
      cost: 1500,
      capacity: 30,
      enrolled: 28,
      trainer: 'Safety Expert Team',
      department: 'Manufacturing',
      startDate: '2024-07-20',
      endDate: '2024-07-22',
      status: 'Scheduled',
      objectives: [
        isRTL ? 'فهم قوانين السلامة' : 'Understand safety regulations',
        isRTL ? 'تطبيق إجراءات الأمان' : 'Implement safety procedures',
        isRTL ? 'التعامل مع الطوارئ' : 'Emergency response'
      ],
      description: isRTL
        ? 'تدريب إلزامي على قوانين السلامة المهنية وإجراءات الأمان في مكان العمل'
        : 'Mandatory training on occupational safety regulations and workplace safety procedures',
      completionRate: 95
    },
    {
      id: 'TRN-003',
      title: isRTL ? 'تطوير المهارات التقنية - React & TypeScript' : 'Technical Skills - React & TypeScript',
      category: 'Technical',
      type: 'Online',
      duration: '60 hours',
      cost: 3500,
      capacity: 15,
      enrolled: 12,
      trainer: 'Tech Training Academy',
      department: 'IT',
      startDate: '2024-08-01',
      endDate: '2024-09-15',
      status: 'Registration Open',
      objectives: [
        isRTL ? 'إتقان React Framework' : 'Master React Framework',
        isRTL ? 'تعلم TypeScript' : 'Learn TypeScript',
        isRTL ? 'بناء تطبيقات حديثة' : 'Build modern applications'
      ],
      description: isRTL
        ? 'برنامج تقني متقدم لتعلم أحدث تقنيات تطوير الويب'
        : 'Advanced technical program for learning modern web development technologies',
      completionRate: 0
    },
    {
      id: 'TRN-004',
      title: isRTL ? 'مهارات المبيعات والتفاوض' : 'Sales & Negotiation Skills',
      category: 'Sales',
      type: 'Hybrid',
      duration: '32 hours',
      cost: 2800,
      capacity: 25,
      enrolled: 22,
      trainer: 'Sales Pro Institute',
      department: 'Sales',
      startDate: '2024-07-25',
      endDate: '2024-08-10',
      status: 'Active',
      objectives: [
        isRTL ? 'تحسين تقنيات البيع' : 'Improve sales techniques',
        isRTL ? 'مهارات التفاوض' : 'Negotiation skills',
        isRTL ? 'إدارة العملاء' : 'Customer management'
      ],
      description: isRTL
        ? 'برنامج متخصص لتطوير مهارات المبيعات والتفاوض للفريق التجاري'
        : 'Specialized program for developing sales and negotiation skills for the sales team',
      completionRate: 60
    }
  ];

  const categories = [
    { value: 'all', label: isRTL ? 'جميع الفئات' : 'All Categories' },
    { value: 'Leadership', label: isRTL ? 'القيادة' : 'Leadership' },
    { value: 'Technical', label: isRTL ? 'تقني' : 'Technical' },
    { value: 'Safety', label: isRTL ? 'السلامة' : 'Safety' },
    { value: 'Sales', label: isRTL ? 'المبيعات' : 'Sales' },
    { value: 'Compliance', label: isRTL ? 'الامتثال' : 'Compliance' }
  ];

  const statuses = [
    { value: 'all', label: isRTL ? 'جميع الحالات' : 'All Statuses' },
    { value: 'Active', label: isRTL ? 'نشط' : 'Active' },
    { value: 'Scheduled', label: isRTL ? 'مجدول' : 'Scheduled' },
    { value: 'Registration Open', label: isRTL ? 'التسجيل مفتوح' : 'Registration Open' },
    { value: 'Completed', label: isRTL ? 'مكتمل' : 'Completed' }
  ];

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProgram = () => {
    if (!newProgram.title || !newProgram.category || !newProgram.type) {
      toast({
        title: isRTL ? 'خطأ في البيانات' : 'Data Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: isRTL ? 'تم إضافة البرنامج' : 'Program Added',
      description: isRTL ? 'تم إضافة برنامج التدريب بنجاح' : 'Training program added successfully'
    });
    
    setIsAddDialogOpen(false);
    setNewProgram({
      title: '', category: '', type: '', duration: '', cost: '', 
      capacity: '', trainer: '', department: '', objectives: '', description: ''
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { variant: 'default', color: 'bg-green-100 text-green-800' },
      'Scheduled': { variant: 'secondary', color: 'bg-blue-100 text-blue-800' },
      'Registration Open': { variant: 'outline', color: 'bg-yellow-100 text-yellow-800' },
      'Completed': { variant: 'secondary', color: 'bg-gray-100 text-gray-800' }
    };
    
    return statusConfig[status] || { variant: 'default', color: 'bg-gray-100 text-gray-800' };
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Online': return <Globe className="h-4 w-4" />;
      case 'Classroom': return <MapPin className="h-4 w-4" />;
      case 'Hybrid': return <Video className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'برامج التدريب' : 'Training Programs'}</h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إدارة وتتبع جميع برامج التدريب والتطوير' : 'Manage and track all training and development programs'}
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {isRTL ? 'برنامج جديد' : 'New Program'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إضافة برنامج تدريبي جديد' : 'Add New Training Program'}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label>{isRTL ? 'عنوان البرنامج' : 'Program Title'} *</Label>
                  <Input 
                    placeholder={isRTL ? 'أدخل عنوان البرنامج' : 'Enter program title'}
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'الفئة' : 'Category'} *</Label>
                  <Select value={newProgram.category} onValueChange={(value) => setNewProgram({...newProgram, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الفئة' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{isRTL ? 'نوع التدريب' : 'Training Type'} *</Label>
                  <Select value={newProgram.type} onValueChange={(value) => setNewProgram({...newProgram, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">{isRTL ? 'عبر الإنترنت' : 'Online'}</SelectItem>
                      <SelectItem value="Classroom">{isRTL ? 'في القاعة' : 'Classroom'}</SelectItem>
                      <SelectItem value="Hybrid">{isRTL ? 'مختلط' : 'Hybrid'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{isRTL ? 'المدة' : 'Duration'}</Label>
                  <Input 
                    placeholder={isRTL ? 'مثال: 40 ساعة' : 'e.g., 40 hours'}
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'التكلفة (ريال)' : 'Cost (SAR)'}</Label>
                  <Input 
                    type="number"
                    placeholder={isRTL ? 'أدخل التكلفة' : 'Enter cost'}
                    value={newProgram.cost}
                    onChange={(e) => setNewProgram({...newProgram, cost: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>{isRTL ? 'السعة القصوى' : 'Maximum Capacity'}</Label>
                  <Input 
                    type="number"
                    placeholder={isRTL ? 'عدد المشاركين' : 'Number of participants'}
                    value={newProgram.capacity}
                    onChange={(e) => setNewProgram({...newProgram, capacity: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'المدرب' : 'Trainer'}</Label>
                  <Input 
                    placeholder={isRTL ? 'اسم المدرب أو المؤسسة' : 'Trainer name or institution'}
                    value={newProgram.trainer}
                    onChange={(e) => setNewProgram({...newProgram, trainer: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'القسم المستهدف' : 'Target Department'}</Label>
                  <Select value={newProgram.department} onValueChange={(value) => setNewProgram({...newProgram, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر القسم' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Departments">{isRTL ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
                      <SelectItem value="IT">{isRTL ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="Sales">{isRTL ? 'المبيعات' : 'Sales'}</SelectItem>
                      <SelectItem value="HR">{isRTL ? 'الموارد البشرية' : 'HR'}</SelectItem>
                      <SelectItem value="Finance">{isRTL ? 'المالية' : 'Finance'}</SelectItem>
                      <SelectItem value="Marketing">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{isRTL ? 'الأهداف' : 'Objectives'}</Label>
                  <Textarea 
                    placeholder={isRTL ? 'أهداف البرنامج (سطر واحد لكل هدف)' : 'Program objectives (one per line)'}
                    value={newProgram.objectives}
                    onChange={(e) => setNewProgram({...newProgram, objectives: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                  <Textarea 
                    placeholder={isRTL ? 'وصف تفصيلي للبرنامج' : 'Detailed program description'}
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleAddProgram}>
                {isRTL ? 'إضافة البرنامج' : 'Add Program'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في البرامج...' : 'Search programs...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{program.title}</h3>
                    <Badge variant="outline">{program.id}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {getTypeIcon(program.type)}
                      <span>{program.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{program.enrolled}/{program.capacity}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusBadge(program.status).color}>
                  {program.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">{isRTL ? 'المدرب:' : 'Trainer:'}</span>
                  <p className="text-muted-foreground">{program.trainer}</p>
                </div>
                <div>
                  <span className="font-medium">{isRTL ? 'القسم:' : 'Department:'}</span>
                  <p className="text-muted-foreground">{program.department}</p>
                </div>
                <div>
                  <span className="font-medium">{isRTL ? 'تاريخ البداية:' : 'Start Date:'}</span>
                  <p className="text-muted-foreground">{program.startDate}</p>
                </div>
                <div>
                  <span className="font-medium">{isRTL ? 'التكلفة:' : 'Cost:'}</span>
                  <p className="text-muted-foreground">{program.cost.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</p>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-sm">{isRTL ? 'الأهداف:' : 'Objectives:'}</span>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  {program.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{isRTL ? 'معدل الإتمام:' : 'Completion:'}</span>
                  <span className="text-sm text-primary font-semibold">{program.completionRate}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    {isRTL ? 'عرض' : 'View'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    {isRTL ? 'تقرير' : 'Report'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredPrograms.length}</div>
            <div className="text-sm text-muted-foreground">{isRTL ? 'إجمالي البرامج' : 'Total Programs'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-chart-2">
              {filteredPrograms.reduce((sum, p) => sum + p.enrolled, 0)}
            </div>
            <div className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المسجلين' : 'Total Enrolled'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-chart-3">
              {Math.round(filteredPrograms.reduce((sum, p) => sum + p.completionRate, 0) / filteredPrograms.length)}%
            </div>
            <div className="text-sm text-muted-foreground">{isRTL ? 'متوسط الإتمام' : 'Avg. Completion'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-chart-4">
              {(filteredPrograms.reduce((sum, p) => sum + p.cost, 0) / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الاستثمار' : 'Total Investment'}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingPrograms;