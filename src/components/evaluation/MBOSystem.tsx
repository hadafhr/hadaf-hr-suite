import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  Plus, 
  Save, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Languages,
  Download,
  Upload,
  Lock,
  Unlock,
  AlertCircle,
  TrendingUp,
  Calendar,
  CheckCircle,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Import the MBO system image
import mboSystemImage from '@/assets/mbo-system.jpg';

interface Objective {
  id: string;
  title: string;
  description: string;
  category: 'financial' | 'customer' | 'innovation' | 'operational';
  weight: number;
  targetValue: number;
  currentValue: number;
  measurementUnit: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'cancelled';
  achievementPercentage: number;
}

export const MBOSystem = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: '1',
      title: isRTL ? 'زيادة إيرادات المبيعات بنسبة 25%' : 'Increase sales revenue by 25%',
      description: isRTL ? 'تحقيق نمو في المبيعات خلال الربع الثاني' : 'Achieve sales growth during Q2',
      category: 'financial',
      weight: 30,
      targetValue: 125,
      currentValue: 110,
      measurementUnit: '%',
      dueDate: '2024-06-30',
      status: 'in_progress',
      achievementPercentage: 88
    },
    {
      id: '2',
      title: isRTL ? 'تطوير منتجات جديدة' : 'Develop new products',
      description: isRTL ? 'إطلاق 3 منتجات جديدة في السوق' : 'Launch 3 new products in the market',
      category: 'innovation',
      weight: 25,
      targetValue: 3,
      currentValue: 2,
      measurementUnit: isRTL ? 'منتجات' : 'products',
      dueDate: '2024-08-15',
      status: 'in_progress',
      achievementPercentage: 67
    },
    {
      id: '3',
      title: isRTL ? 'تحسين رضا العملاء' : 'Improve customer satisfaction',
      description: isRTL ? 'تحقيق معدل رضا 95% من العملاء' : 'Achieve 95% customer satisfaction rate',
      category: 'customer',
      weight: 20,
      targetValue: 95,
      currentValue: 88,
      measurementUnit: '%',
      dueDate: '2024-07-31',
      status: 'in_progress',
      achievementPercentage: 93
    },
    {
      id: '4',
      title: isRTL ? 'تحسين كفاءة العمليات' : 'Improve operational efficiency',
      description: isRTL ? 'تقليل وقت المعالجة بنسبة 20%' : 'Reduce processing time by 20%',
      category: 'operational',
      weight: 25,
      targetValue: 80,
      currentValue: 85,
      measurementUnit: '%',
      dueDate: '2024-09-30',
      status: 'completed',
      achievementPercentage: 100
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [newObjective, setNewObjective] = useState<Partial<Objective>>({
    title: '',
    description: '',
    category: 'financial',
    weight: 0,
    targetValue: 0,
    currentValue: 0,
    measurementUnit: '',
    dueDate: '',
    status: 'not_started'
  });

  const handleAddObjective = () => {
    if (!newObjective.title || !newObjective.targetValue) {
      toast({
        title: isRTL ? 'خطأ في البيانات' : 'Data Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    const objective: Objective = {
      id: Date.now().toString(),
      title: newObjective.title!,
      description: newObjective.description || '',
      category: newObjective.category as any,
      weight: newObjective.weight || 0,
      targetValue: newObjective.targetValue!,
      currentValue: newObjective.currentValue || 0,
      measurementUnit: newObjective.measurementUnit || '',
      dueDate: newObjective.dueDate || '',
      status: 'not_started',
      achievementPercentage: 0
    };

    setObjectives([...objectives, objective]);
    setNewObjective({
      title: '',
      description: '',
      category: 'financial',
      weight: 0,
      targetValue: 0,
      currentValue: 0,
      measurementUnit: '',
      dueDate: '',
      status: 'not_started'
    });
    setShowAddForm(false);
    
    toast({
      title: isRTL ? 'تم إضافة الهدف' : 'Objective Added',
      description: isRTL ? 'تم إضافة الهدف بنجاح' : 'Objective added successfully'
    });
  };

  const handleSaveObjectives = () => {
    toast({
      title: isRTL ? 'تم الحفظ' : 'Saved',
      description: isRTL ? 'تم حفظ جميع الأهداف' : 'All objectives saved successfully'
    });
  };

  const handleDeleteObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
    toast({
      title: isRTL ? 'تم الحذف' : 'Deleted',
      description: isRTL ? 'تم حذف الهدف' : 'Objective deleted'
    });
  };

  const handleImportObjectives = () => {
    toast({
      title: isRTL ? 'استيراد الأهداف' : 'Import Objectives',
      description: isRTL ? 'جاري استيراد الأهداف من ملف CSV' : 'Importing objectives from CSV file'
    });
  };

  const handleExportObjectives = () => {
    toast({
      title: isRTL ? 'تصدير الأهداف' : 'Export Objectives',
      description: isRTL ? 'جاري تصدير الأهداف إلى ملف Excel' : 'Exporting objectives to Excel file'
    });
  };

  const handleAlignObjective = (id: string) => {
    toast({
      title: isRTL ? 'محاذاة الهدف' : 'Align Objective',
      description: isRTL ? 'تم ربط الهدف بالاستراتيجية العامة' : 'Objective aligned with company strategy'
    });
  };

  const handleLockObjectives = () => {
    setIsLocked(!isLocked);
    toast({
      title: isLocked ? (isRTL ? 'تم إلغاء القفل' : 'Unlocked') : (isRTL ? 'تم القفل' : 'Locked'),
      description: isLocked 
        ? (isRTL ? 'يمكن الآن تعديل الأهداف' : 'Objectives can now be edited')
        : (isRTL ? 'تم قفل الأهداف لهذه الدورة' : 'Objectives locked for this cycle')
    });
  };

  const handlePreviewObjective = (id: string) => {
    toast({
      title: isRTL ? 'معاينة الهدف' : 'Preview Objective',
      description: isRTL ? 'عرض تفاصيل الهدف' : 'Viewing objective details'
    });
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const handleBack = () => {
    window.history.back();
  };

  const totalWeight = objectives.reduce((sum, obj) => sum + obj.weight, 0);
  const overallAchievement = objectives.length > 0 
    ? objectives.reduce((sum, obj) => sum + (obj.achievementPercentage * obj.weight / 100), 0) / totalWeight * 100
    : 0;

  const defaultWeights = {
    financial: { label: isRTL ? 'مالي' : 'Financial', weight: 30, color: '#3B82F6' },
    customer: { label: isRTL ? 'عملاء' : 'Customer', weight: 25, color: '#10B981' },
    innovation: { label: isRTL ? 'ابتكار' : 'Innovation', weight: 25, color: '#8B5CF6' },
    operational: { label: isRTL ? 'تشغيلي' : 'Operational', weight: 20, color: '#F59E0B' }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'not_started': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: isRTL ? 'مكتمل' : 'Completed',
      in_progress: isRTL ? 'جاري' : 'In Progress',
      not_started: isRTL ? 'لم يبدأ' : 'Not Started',
      cancelled: isRTL ? 'ملغي' : 'Cancelled'
    };
    return labels[status as keyof typeof labels] || status;
  };

  // Chart data
  const chartData = objectives.map(obj => ({
    name: obj.title.substring(0, 20) + '...',
    achievement: obj.achievementPercentage,
    target: 100
  }));

  const pieData = Object.entries(defaultWeights).map(([key, value]) => ({
    name: value.label,
    value: value.weight,
    color: value.color
  }));

  return (
    <div className="space-y-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="hover-scale">
                <ArrowLeft className="h-4 w-4" />
                {isRTL ? 'رجوع' : 'Back'}
              </Button>
              <Button variant="outline" size="sm" onClick={toggleLanguage} className="hover-scale">
                <Languages className="h-4 w-4 mr-2" />
                {isRTL ? 'EN' : 'عربي'}
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold text-gradient mb-4">
              <Target className="inline h-8 w-8 mr-3 text-blue-600" />
              {isRTL ? 'نظام الإدارة بالأهداف (MBO)' : 'Management by Objectives (MBO)'}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {isRTL 
                ? 'نظام إدارة وقياس الأهداف الذكية (SMART) مع متابعة التقدم والتحليل'
                : 'Smart objectives management system with progress tracking and analysis'
              }
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setShowAddForm(true)} className="btn-primary hover-scale">
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة هدف جديد' : 'Add New Objective'}
              </Button>
              <Button variant="outline" onClick={handleSaveObjectives} className="hover-scale">
                <Save className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ' : 'Save'}
              </Button>
              <Button variant="outline" onClick={handleImportObjectives} className="hover-scale">
                <Upload className="h-4 w-4 mr-2" />
                {isRTL ? 'استيراد' : 'Import'}
              </Button>
              <Button variant="outline" onClick={handleExportObjectives} className="hover-scale">
                <Download className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
              <Button variant="outline" onClick={handleLockObjectives} className="hover-scale">
                {isLocked ? <Unlock className="h-4 w-4 mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
                {isLocked ? (isRTL ? 'إلغاء القفل' : 'Unlock') : (isRTL ? 'قفل الأهداف' : 'Lock Goals')}
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src={mboSystemImage} 
              alt="MBO System" 
              className="w-80 h-40 object-cover rounded-lg shadow-lg hover-scale"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'الإنجاز العام' : 'Overall Achievement'}
                </p>
                <p className="text-2xl font-bold text-primary">{Math.round(overallAchievement)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'إجمالي الأهداف' : 'Total Objectives'}
                </p>
                <p className="text-2xl font-bold text-primary">{objectives.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'الأهداف المكتملة' : 'Completed Goals'}
                </p>
                <p className="text-2xl font-bold text-success">
                  {objectives.filter(obj => obj.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isRTL ? 'إجمالي الوزن' : 'Total Weight'}
                </p>
                <p className="text-2xl font-bold text-primary">{totalWeight}%</p>
              </div>
              <AlertCircle className={`h-8 w-8 ${totalWeight === 100 ? 'text-success' : 'text-warning'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>{isRTL ? 'تقدم الأهداف' : 'Objectives Progress'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="achievement" fill="hsl(var(--primary))" />
                  <Bar dataKey="target" fill="hsl(var(--muted))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>{isRTL ? 'توزيع الأوزان الافتراضية' : 'Default Weight Distribution'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Default Weights */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>{isRTL ? 'الأوزان الافتراضية للفئات' : 'Default Category Weights'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(defaultWeights).map(([key, value]) => (
              <div key={key} className="text-center p-4 rounded-lg bg-muted/30">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2`} style={{ backgroundColor: value.color }}></div>
                <h3 className="font-medium">{value.label}</h3>
                <p className="text-sm text-muted-foreground">{value.weight}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objectives List */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{isRTL ? 'قائمة الأهداف' : 'Objectives List'}</span>
            <Badge variant={isLocked ? 'destructive' : 'default'}>
              {isLocked ? (isRTL ? 'مقفل' : 'Locked') : (isRTL ? 'قابل للتعديل' : 'Editable')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {objectives.map((objective) => (
              <div key={objective.id} className="p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{objective.title}</h3>
                      <Badge className={getStatusColor(objective.status)}>
                        {getStatusLabel(objective.status)}
                      </Badge>
                      <Badge variant="outline">
                        {defaultWeights[objective.category]?.label} - {objective.weight}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{objective.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span>
                        <strong>{isRTL ? 'الهدف:' : 'Target:'}</strong> {objective.targetValue} {objective.measurementUnit}
                      </span>
                      <span>
                        <strong>{isRTL ? 'الحالي:' : 'Current:'}</strong> {objective.currentValue} {objective.measurementUnit}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {objective.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handlePreviewObjective(objective.id)} className="hover-scale">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAlignObjective(objective.id)} className="hover-scale">
                      <Target className="h-4 w-4" />
                    </Button>
                    {!isLocked && (
                      <>
                        <Button size="sm" variant="outline" className="hover-scale">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteObjective(objective.id)} className="hover-scale">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{isRTL ? 'نسبة الإنجاز' : 'Achievement'}</span>
                    <span className="font-medium">{objective.achievementPercentage}%</span>
                  </div>
                  <Progress value={objective.achievementPercentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Objective Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isRTL ? 'إضافة هدف جديد' : 'Add New Objective'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">{isRTL ? 'عنوان الهدف' : 'Objective Title'}</Label>
                <Input
                  id="title"
                  value={newObjective.title || ''}
                  onChange={(e) => setNewObjective({...newObjective, title: e.target.value})}
                  placeholder={isRTL ? 'أدخل عنوان الهدف' : 'Enter objective title'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{isRTL ? 'الفئة' : 'Category'}</Label>
                <Select value={newObjective.category} onValueChange={(value) => setNewObjective({...newObjective, category: value as any})}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'اختر الفئة' : 'Select category'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(defaultWeights).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{isRTL ? 'الوصف' : 'Description'}</Label>
              <Textarea
                id="description"
                value={newObjective.description || ''}
                onChange={(e) => setNewObjective({...newObjective, description: e.target.value})}
                placeholder={isRTL ? 'أدخل وصف الهدف' : 'Enter objective description'}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">{isRTL ? 'الوزن (%)' : 'Weight (%)'}</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newObjective.weight || ''}
                  onChange={(e) => setNewObjective({...newObjective, weight: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">{isRTL ? 'القيمة المستهدفة' : 'Target Value'}</Label>
                <Input
                  id="target"
                  type="number"
                  value={newObjective.targetValue || ''}
                  onChange={(e) => setNewObjective({...newObjective, targetValue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">{isRTL ? 'وحدة القياس' : 'Measurement Unit'}</Label>
                <Input
                  id="unit"
                  value={newObjective.measurementUnit || ''}
                  onChange={(e) => setNewObjective({...newObjective, measurementUnit: e.target.value})}
                  placeholder={isRTL ? 'مثل: %, عدد, ريال' : 'e.g: %, count, $'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current">{isRTL ? 'القيمة الحالية' : 'Current Value'}</Label>
                <Input
                  id="current"
                  type="number"
                  value={newObjective.currentValue || ''}
                  onChange={(e) => setNewObjective({...newObjective, currentValue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due">{isRTL ? 'تاريخ الاستحقاق' : 'Due Date'}</Label>
                <Input
                  id="due"
                  type="date"
                  value={newObjective.dueDate || ''}
                  onChange={(e) => setNewObjective({...newObjective, dueDate: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddObjective} className="btn-primary flex-1 hover-scale">
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة الهدف' : 'Add Objective'}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="hover-scale">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};