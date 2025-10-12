import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Brain, Users, Target, Download, Plus, Search, Filter, Calendar, Building, Award, TrendingUp,
  BarChart3, PieChart, Activity, Zap, Eye, Settings, Bell, UserCheck, Sparkles, Archive, Edit, Trash2,
  Share, Lock, Unlock, AlertCircle, Info, UserPlus, Phone, Mail, Crown, Users2, Database, RefreshCw,
  Server, FileText, BookOpen, GraduationCap, Star, CheckCircle2, AlertTriangle, Clock, Upload, Camera,
  User, Briefcase, MapPin, Calendar as CalendarIcon, MessageSquare, ThumbsUp, Percent, TrendingDown,
  Code, Heart, Lightbulb, Shield, Zap as ZapIcon, Cpu, Palette, Globe, LineChart, BarChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';

interface SkillsInventorySystemProps {
  onBack: () => void;
}

export const SkillsInventorySystem: React.FC<SkillsInventorySystemProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddEmployeeSkillOpen, setIsAddEmployeeSkillOpen] = useState(false);
  const [isTrainingPlanOpen, setIsTrainingPlanOpen] = useState(false);

  // Default data with comprehensive skills inventory
  const [skills, setSkills] = useState([
    {
      id: '1',
      name: 'البرمجة والتطوير',
      category: 'تقنية',
      description: 'مهارات في لغات البرمجة المختلفة',
      level: 'متقدم',
      priority: 'عالية',
      requiredBy: ['مطور برمجيات', 'مهندس نظم'],
      createdDate: '2024-01-15'
    },
    {
      id: '2', 
      name: 'إدارة المشاريع',
      category: 'إدارية',
      description: 'القدرة على تخطيط وتنفيذ المشاريع',
      level: 'متوسط',
      priority: 'عالية',
      requiredBy: ['مدير مشروع', 'منسق مشاريع'],
      createdDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'التسويق الرقمي',
      category: 'تسويق',
      description: 'استراتيجيات التسويق عبر المنصات الرقمية',
      level: 'متوسط',
      priority: 'متوسطة',
      requiredBy: ['أخصائي تسويق', 'منسق إعلانات'],
      createdDate: '2024-02-01'
    }
  ]);

  const [employeeSkills, setEmployeeSkills] = useState([
    {
      id: '1',
      employeeId: 'emp_001',
      employeeName: 'أحمد محمد',
      skillId: '1',
      skillName: 'البرمجة والتطوير',
      proficiency: 85,
      level: 'متقدم',
      certificationDate: '2024-01-15',
      lastAssessed: '2024-01-20',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات أول'
    },
    {
      id: '2',
      employeeId: 'emp_002', 
      employeeName: 'سارة أحمد',
      skillId: '2',
      skillName: 'إدارة المشاريع',
      proficiency: 90,
      level: 'خبير',
      certificationDate: '2023-12-10',
      lastAssessed: '2024-01-18',
      department: 'إدارة المشاريع',
      position: 'مديرة مشاريع'
    },
    {
      id: '3',
      employeeId: 'emp_003',
      employeeName: 'محمد العلي',
      skillId: '3', 
      skillName: 'التسويق الرقمي',
      proficiency: 75,
      level: 'متوسط',
      certificationDate: '2024-02-01',
      lastAssessed: '2024-02-05',
      department: 'التسويق',
      position: 'أخصائي تسويق رقمي'
    }
  ]);

  const [skillGaps, setSkillGaps] = useState([
    {
      id: '1',
      skillName: 'الذكاء الاصطناعي',
      currentLevel: 45,
      requiredLevel: 80,
      gap: 35,
      urgency: 'عالية',
      affectedPositions: ['مطور AI', 'محلل بيانات'],
      trainingRecommendation: 'دورة تدريبية متخصصة في ML/AI'
    },
    {
      id: '2',
      skillName: 'إدارة الفرق الافتراضية',
      currentLevel: 60,
      requiredLevel: 85,
      gap: 25,
      urgency: 'متوسطة',
      affectedPositions: ['مدير فريق', 'قائد مشروع'],
      trainingRecommendation: 'ورش عمل في القيادة الرقمية'
    }
  ]);

  const [trainingPlans, setTrainingPlans] = useState([
    {
      id: '1',
      title: 'خطة تطوير مهارات البرمجة',
      skillsTargeted: ['البرمجة والتطوير', 'أمان المعلومات'],
      participants: 15,
      duration: '3 أشهر',
      budget: 50000,
      status: 'قيد التنفيذ',
      startDate: '2024-01-15',
      progress: 60
    },
    {
      id: '2',
      title: 'برنامج تطوير القيادة',
      skillsTargeted: ['إدارة المشاريع', 'القيادة الإستراتيجية'],
      participants: 8,
      duration: '6 أشهر',
      budget: 75000,
      status: 'مجدول',
      startDate: '2024-03-01',
      progress: 0
    }
  ]);

  const [newSkillForm, setNewSkillForm] = useState({
    name: '',
    category: '',
    description: '',
    level: '',
    priority: ''
  });

  const [newEmployeeSkillForm, setNewEmployeeSkillForm] = useState({
    employeeName: '',
    skillName: '',
    proficiency: '',
    level: '',
    department: ''
  });

  const handleExport = () => {
    // Create CSV content for skills inventory
    const csvContent = "data:text/csv;charset=utf-8," 
      + "المهارة,الفئة,المستوى,الأولوية,تاريخ الإنشاء\n"
      + skills.map(skill => 
          `${skill.name},${skill.category},${skill.level},${skill.priority},${skill.createdDate}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skills_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير مخزون المهارات إلى ملف CSV",
    });
  };

  const handleAddSkill = () => {
    if (!newSkillForm.name || !newSkillForm.category) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newSkill = {
      id: Date.now().toString(),
      name: newSkillForm.name,
      category: newSkillForm.category,
      description: newSkillForm.description || 'وصف المهارة الجديدة',
      level: newSkillForm.level || 'متوسط',
      priority: newSkillForm.priority || 'متوسطة',
      requiredBy: ['منصب جديد'],
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSkills([...skills, newSkill]);
    setIsAddSkillOpen(false);
    setNewSkillForm({ name: '', category: '', description: '', level: '', priority: '' });
    
    toast({
      title: "تم إضافة المهارة",
      description: `تم إضافة مهارة ${newSkill.name} بنجاح`
    });
  };

  const handleAddEmployeeSkill = () => {
    if (!newEmployeeSkillForm.employeeName || !newEmployeeSkillForm.skillName) {
      toast({
        title: "خطأ في البيانات", 
        description: "يرجى ملء الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newEmployeeSkill = {
      id: Date.now().toString(),
      employeeId: `emp_${Date.now()}`,
      employeeName: newEmployeeSkillForm.employeeName,
      skillId: Date.now().toString(),
      skillName: newEmployeeSkillForm.skillName,
      proficiency: parseInt(newEmployeeSkillForm.proficiency) || 70,
      level: newEmployeeSkillForm.level || 'متوسط',
      certificationDate: new Date().toISOString().split('T')[0],
      lastAssessed: new Date().toISOString().split('T')[0],
      department: newEmployeeSkillForm.department || 'غير محدد',
      position: 'منصب جديد'
    };

    setEmployeeSkills([...employeeSkills, newEmployeeSkill]);
    setIsAddEmployeeSkillOpen(false);
    setNewEmployeeSkillForm({ employeeName: '', skillName: '', proficiency: '', level: '', department: '' });
    
    toast({
      title: "تم إضافة مهارة الموظف",
      description: `تم ربط مهارة ${newEmployeeSkill.skillName} بالموظف ${newEmployeeSkill.employeeName}`
    });
  };

  const renderHeader = () => (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">نظام مخزون المهارات المتطور</h1>
        <p className="text-muted-foreground">منظومة شاملة لإدارة وتتبع مهارات الموظفين مع تحليل الفجوات والتوصيات</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex flex-col gap-1 py-3">
              <Users className="h-4 w-4" />
              <span className="text-xs">مهارات الموظفين</span>
            </TabsTrigger>
            <TabsTrigger value="add-skill" className="flex flex-col gap-1 py-3">
              <Plus className="h-4 w-4" />
              <span className="text-xs">إضافة مهارة</span>
            </TabsTrigger>
            <TabsTrigger value="gap-analysis" className="flex flex-col gap-1 py-3">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">تحليل الفجوات</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex flex-col gap-1 py-3">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs">التدريب والتطوير</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">الإعدادات</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">إجمالي المهارات</p>
                        <p className="text-2xl font-bold text-primary">{skills.length}</p>
                      </div>
                      <Brain className="h-8 w-8 text-primary/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">الموظفون المهرة</p>
                        <p className="text-2xl font-bold text-blue-600">{employeeSkills.length}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">فجوات المهارات</p>
                        <p className="text-2xl font-bold text-orange-600">{skillGaps.length}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-orange-500/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">خطط التدريب</p>
                        <p className="text-2xl font-bold text-green-600">{trainingPlans.length}</p>
                      </div>
                      <GraduationCap className="h-8 w-8 text-green-500/60" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      توزيع المهارات حسب الفئة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['تقنية', 'إدارية', 'تسويق', 'مالية'].map((category, index) => {
                        const skillCount = skills.filter(skill => skill.category === category).length;
                        const percentage = skills.length > 0 ? (skillCount / skills.length) * 100 : 0;
                        const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
                        return (
                          <div key={category} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                            <span className="flex-1">{category}</span>
                            <span className="font-semibold">{skillCount}</span>
                            <span className="text-sm text-muted-foreground">({percentage.toFixed(0)}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      مستوى الكفاءة العام
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employeeSkills.map((skill, index) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{skill.skillName}</span>
                            <span>{skill.proficiency}%</span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    إجراءات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" onClick={() => setActiveTab('add-skill')} className="h-20 flex-col gap-2">
                      <Plus className="h-6 w-6" />
                      إضافة مهارة
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('gap-analysis')} className="h-20 flex-col gap-2">
                      <AlertTriangle className="h-6 w-6" />
                      تحليل الفجوات
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('training')} className="h-20 flex-col gap-2">
                      <GraduationCap className="h-6 w-6" />
                      خطة تدريب
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('reports')} className="h-20 flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      التقارير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">مهارات الموظفين</h2>
                <div className="flex gap-2">
                  <Input
                    placeholder="البحث في مهارات الموظفين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Dialog open={isAddEmployeeSkillOpen} onOpenChange={setIsAddEmployeeSkillOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 ml-2" />
                        ربط مهارة بموظف
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>ربط مهارة بموظف</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>اسم الموظف *</Label>
                          <Input
                            value={newEmployeeSkillForm.employeeName}
                            onChange={(e) => setNewEmployeeSkillForm(prev => ({...prev, employeeName: e.target.value}))}
                            placeholder="اسم الموظف"
                          />
                        </div>
                        <div>
                          <Label>المهارة *</Label>
                          <Select value={newEmployeeSkillForm.skillName} onValueChange={(value) => setNewEmployeeSkillForm(prev => ({...prev, skillName: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر المهارة" />
                            </SelectTrigger>
                            <SelectContent>
                              {skills.map(skill => (
                                <SelectItem key={skill.id} value={skill.name}>{skill.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>مستوى الكفاءة (0-100)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={newEmployeeSkillForm.proficiency}
                            onChange={(e) => setNewEmployeeSkillForm(prev => ({...prev, proficiency: e.target.value}))}
                            placeholder="70"
                          />
                        </div>
                        <div>
                          <Label>المستوى</Label>
                          <Select value={newEmployeeSkillForm.level} onValueChange={(value) => setNewEmployeeSkillForm(prev => ({...prev, level: value}))}>
                            <SelectTrigger>
                              <SelectValue placeholder="المستوى" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                              <SelectItem value="متوسط">متوسط</SelectItem>
                              <SelectItem value="متقدم">متقدم</SelectItem>
                              <SelectItem value="خبير">خبير</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>القسم</Label>
                          <Input
                            value={newEmployeeSkillForm.department}
                            onChange={(e) => setNewEmployeeSkillForm(prev => ({...prev, department: e.target.value}))}
                            placeholder="القسم أو الإدارة"
                          />
                        </div>
                        <Button onClick={handleAddEmployeeSkill} className="w-full">
                          ربط المهارة
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {employeeSkills.filter(emp => 
                  emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  emp.skillName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((emp) => (
                  <Card key={emp.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{emp.employeeName}</h3>
                              <p className="text-sm text-muted-foreground">{emp.position} - {emp.department}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="outline" className="text-primary border-primary">
                              {emp.skillName}
                            </Badge>
                            <Badge variant={emp.level === 'خبير' ? 'default' : 'secondary'}>
                              {emp.level}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>مستوى الكفاءة:</span>
                              <span className="font-medium">{emp.proficiency}%</span>
                            </div>
                            <Progress value={emp.proficiency} className="h-2" />
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                معتمد: {emp.certificationDate}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                آخر تقييم: {emp.lastAssessed}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add-skill">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إضافة مهارة جديدة</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المهارة الأساسية</CardTitle>
                    <CardDescription>أدخل التفاصيل الأساسية للمهارة الجديدة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>اسم المهارة *</Label>
                      <Input
                        value={newSkillForm.name}
                        onChange={(e) => setNewSkillForm(prev => ({...prev, name: e.target.value}))}
                        placeholder="مثال: تطوير تطبيقات الويب"
                      />
                    </div>
                    
                    <div>
                      <Label>فئة المهارة *</Label>
                      <Select value={newSkillForm.category} onValueChange={(value) => setNewSkillForm(prev => ({...prev, category: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="تقنية">تقنية</SelectItem>
                          <SelectItem value="إدارية">إدارية</SelectItem>
                          <SelectItem value="تسويق">تسويق</SelectItem>
                          <SelectItem value="مالية">مالية</SelectItem>
                          <SelectItem value="موارد بشرية">موارد بشرية</SelectItem>
                          <SelectItem value="مبيعات">مبيعات</SelectItem>
                          <SelectItem value="خدمة عملاء">خدمة عملاء</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>الوصف التفصيلي</Label>
                      <Textarea
                        value={newSkillForm.description}
                        onChange={(e) => setNewSkillForm(prev => ({...prev, description: e.target.value}))}
                        placeholder="وصف شامل للمهارة ومتطلباتها وأهدافها..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>المستوى المطلوب</Label>
                        <Select value={newSkillForm.level} onValueChange={(value) => setNewSkillForm(prev => ({...prev, level: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="المستوى" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="مبتدئ">مبتدئ (0-30)</SelectItem>
                            <SelectItem value="متوسط">متوسط (31-60)</SelectItem>
                            <SelectItem value="متقدم">متقدم (61-85)</SelectItem>
                            <SelectItem value="خبير">خبير (86-100)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>الأولوية</Label>
                        <Select value={newSkillForm.priority} onValueChange={(value) => setNewSkillForm(prev => ({...prev, priority: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="مستوى الأولوية" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="منخفضة">منخفضة</SelectItem>
                            <SelectItem value="متوسطة">متوسطة</SelectItem>
                            <SelectItem value="عالية">عالية</SelectItem>
                            <SelectItem value="حرجة">حرجة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={handleAddSkill} className="w-full" size="lg">
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة المهارة
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>المهارات المضافة حديثاً</CardTitle>
                    <CardDescription>آخر المهارات التي تم إضافتها للنظام</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skills.slice(0, 5).map((skill) => (
                        <div key={skill.id} className="p-3 border border-border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge variant="outline">{skill.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{skill.description}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>المستوى: {skill.level}</span>
                            <span>الأولوية: {skill.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gap-analysis">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">تحليل فجوات المهارات</h2>
                <Button onClick={() => {
                  toast({
                    title: "تحديث التحليل",
                    description: "جاري إعادة حساب فجوات المهارات..."
                  });
                }}>
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث التحليل
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      فجوات المهارات الحرجة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillGaps.map((gap) => (
                        <Card key={gap.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{gap.skillName}</h4>
                              <p className="text-sm text-muted-foreground">
                                المناصب المتأثرة: {gap.affectedPositions.join(', ')}
                              </p>
                            </div>
                            <Badge variant={gap.urgency === 'عالية' ? 'destructive' : 'secondary'}>
                              {gap.urgency}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <p className="text-muted-foreground">المستوى الحالي</p>
                                <p className="text-lg font-bold text-orange-600">{gap.currentLevel}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-muted-foreground">المستوى المطلوب</p>
                                <p className="text-lg font-bold text-green-600">{gap.requiredLevel}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-muted-foreground">الفجوة</p>
                                <p className="text-lg font-bold text-red-600">{gap.gap}%</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>التقدم نحو المطلوب</span>
                                <span>{gap.currentLevel}% / {gap.requiredLevel}%</span>
                              </div>
                              <Progress value={gap.currentLevel} className="h-2" />
                            </div>
                            
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm"><strong>التوصية:</strong> {gap.trainingRecommendation}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>ملخص التحليل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-600">{skillGaps.length}</p>
                        <p className="text-sm text-red-700">فجوات حرجة</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">فجوات عالية الأولوية:</span>
                          <span className="font-bold text-red-600">
                            {skillGaps.filter(g => g.urgency === 'عالية').length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">متوسط حجم الفجوة:</span>
                          <span className="font-bold">
                            {(skillGaps.reduce((sum, g) => sum + g.gap, 0) / skillGaps.length).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={() => setActiveTab('training')}>
                        <GraduationCap className="h-4 w-4 ml-2" />
                        إنشاء خطة تدريب
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">التدريب والتطوير</h2>
                <Dialog open={isTrainingPlanOpen} onOpenChange={setIsTrainingPlanOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 ml-2" />
                      خطة تدريب جديدة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>إنشاء خطة تدريب جديدة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>عنوان الخطة</Label>
                        <Input placeholder="مثال: برنامج تطوير المهارات التقنية" />
                      </div>
                      <div>
                        <Label>المدة (بالأشهر)</Label>
                        <Input type="number" placeholder="3" />
                      </div>
                      <div>
                        <Label>الميزانية المقدرة</Label>
                        <Input type="number" placeholder="50000" />
                      </div>
                      <div>
                        <Label>المهارات المستهدفة</Label>
                        <Textarea placeholder="قائمة المهارات التي ستتم تغطيتها في الخطة..." />
                      </div>
                      <Button onClick={() => {
                        const newPlan = {
                          id: Date.now().toString(),
                          title: 'خطة تدريب جديدة',
                          skillsTargeted: ['مهارة جديدة'],
                          participants: 10,
                          duration: '3 أشهر',
                          budget: 50000,
                          status: 'مجدول',
                          startDate: new Date().toISOString().split('T')[0],
                          progress: 0
                        };
                        setTrainingPlans([...trainingPlans, newPlan]);
                        setIsTrainingPlanOpen(false);
                        toast({
                          title: "تم إنشاء الخطة",
                          description: "تم إضافة خطة التدريب الجديدة بنجاح"
                        });
                      }} className="w-full">
                        إنشاء الخطة
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trainingPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{plan.title}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {plan.participants} مشارك
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              المدة: {plan.duration}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              البداية: {plan.startDate}
                            </div>
                          </div>
                        </div>
                        <Badge variant={
                          plan.status === 'قيد التنفيذ' ? 'default' :
                          plan.status === 'مكتمل' ? 'secondary' : 'outline'
                        }>
                          {plan.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">المهارات المستهدفة:</p>
                          <div className="flex flex-wrap gap-1">
                            {plan.skillsTargeted.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>التقدم:</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">الميزانية:</span>
                          <span className="text-lg font-bold text-green-600">
                            {plan.budget.toLocaleString()} ر.س
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">تقارير مخزون المهارات</h2>
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير جميع التقارير
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير المهارات الشامل",
                    description: "عرض تفصيلي لجميع المهارات في النظام"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <Brain className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">تقرير المهارات الشامل</h3>
                    <p className="text-sm text-muted-foreground">قائمة تفصيلية بجميع المهارات والكفاءات</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير فجوات المهارات",
                    description: "تحليل مفصل لفجوات المهارات والتوصيات"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-orange-600" />
                    <h3 className="font-semibold mb-2">تقرير فجوات المهارات</h3>
                    <p className="text-sm text-muted-foreground">تحليل الفجوات والاحتياجات التدريبية</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير التدريب والتطوير",
                    description: "حالة خطط التدريب والتطوير المختلفة"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <GraduationCap className="h-12 w-12 mx-auto mb-3 text-green-600" />
                    <h3 className="font-semibold mb-2">تقرير التدريب والتطوير</h3>
                    <p className="text-sm text-muted-foreground">تقدم برامج التدريب والتطوير</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير كفاءة الموظفين",
                    description: "مستويات كفاءة الموظفين في مختلف المهارات"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                    <h3 className="font-semibold mb-2">تقرير كفاءة الموظفين</h3>
                    <p className="text-sm text-muted-foreground">تقييم أداء ومهارات الموظفين</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "التقرير التحليلي",
                    description: "تحليلات متقدمة ورؤى استراتيجية"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                    <h3 className="font-semibold mb-2">التقرير التحليلي</h3>
                    <p className="text-sm text-muted-foreground">رؤى وتحليلات استراتيجية</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  toast({
                    title: "تقرير مخصص",
                    description: "إنشاء تقرير حسب معايير محددة"
                  });
                }}>
                  <CardContent className="p-6 text-center">
                    <Settings className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                    <h3 className="font-semibold mb-2">تقرير مخصص</h3>
                    <p className="text-sm text-muted-foreground">إنشاء تقرير حسب احتياجاتك</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{skills.length}</p>
                      <p className="text-sm text-blue-700">إجمالي المهارات</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{employeeSkills.length}</p>
                      <p className="text-sm text-green-700">ارتباطات المهارات</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{skillGaps.length}</p>
                      <p className="text-sm text-orange-700">فجوات المهارات</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{trainingPlans.length}</p>
                      <p className="text-sm text-purple-700">خطط التدريب</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إعدادات نظام مخزون المهارات</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات عامة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>تصنيفات المهارات المتاحة</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['تقنية', 'إدارية', 'تسويق', 'مالية', 'موارد بشرية'].map((cat) => (
                          <Badge key={cat} variant="outline">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>مستويات الكفاءة</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>مبتدئ</span>
                          <span>0-30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط</span>
                          <span>31-60%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متقدم</span>
                          <span>61-85%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>خبير</span>
                          <span>86-100%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>التقييم التلقائي</Label>
                        <p className="text-sm text-muted-foreground">تفعيل التقييم الدوري للمهارات</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>إشعارات الفجوات</Label>
                        <p className="text-sm text-muted-foreground">إشعار عند اكتشاف فجوات حرجة</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إجراءات النظام</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" onClick={() => {
                      toast({
                        title: "تحديث قاعدة البيانات",
                        description: "جاري تحديث بيانات المهارات..."
                      });
                    }}>
                      <RefreshCw className="h-4 w-4 ml-2" />
                      تحديث قاعدة بيانات المهارات
                    </Button>

                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      toast({
                        title: "تصدير البيانات",
                        description: "جاري تصدير جميع بيانات النظام..."
                      });
                    }}>
                      <Download className="h-4 w-4 ml-2" />
                      تصدير جميع البيانات
                    </Button>

                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      toast({
                        title: "نسخة احتياطية",
                        description: "جاري إنشاء نسخة احتياطية..."
                      });
                    }}>
                      <Archive className="h-4 w-4 ml-2" />
                      إنشاء نسخة احتياطية
                    </Button>

                    <Button variant="outline" className="w-full justify-start" onClick={() => {
                      toast({
                        title: "تقرير الصحة",
                        description: "فحص صحة وسلامة بيانات النظام"
                      });
                    }}>
                      <Activity className="h-4 w-4 ml-2" />
                      فحص صحة النظام
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">إصدار النظام:</p>
                      <p className="font-medium">2.1.0</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">آخر تحديث:</p>
                      <p className="font-medium">2024-01-15</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">عدد المستخدمين:</p>
                      <p className="font-medium">{employeeSkills.length} موظف</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">حالة النظام:</p>
                      <Badge variant="default">نشط</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};