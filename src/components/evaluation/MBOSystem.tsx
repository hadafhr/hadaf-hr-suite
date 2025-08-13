import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Check
} from 'lucide-react';

interface Objective {
  id: string;
  title: string;
  description: string;
  category: 'institutional' | 'departmental' | 'individual';
  weight: number;
  targetValue: number;
  currentValue: number;
  measurementUnit: string;
  dueDate: string;
  status: 'active' | 'completed' | 'cancelled';
  achievementPercentage: number;
}

export const MBOSystem: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: '1',
      title: isRTL ? 'تحقيق رؤية الشركة 2025' : 'Achieve Company Vision 2025',
      description: isRTL ? 'المساهمة في تحقيق الأهداف الاستراتيجية للشركة' : 'Contribute to achieving company strategic goals',
      category: 'institutional',
      weight: 20,
      targetValue: 100,
      currentValue: 75,
      measurementUnit: '%',
      dueDate: '2025-12-31',
      status: 'active',
      achievementPercentage: 75
    },
    {
      id: '2', 
      title: isRTL ? 'زيادة إنتاجية القسم' : 'Increase Department Productivity',
      description: isRTL ? 'تحسين كفاءة العمليات وزيادة الإنتاجية بنسبة 15%' : 'Improve process efficiency and increase productivity by 15%',
      category: 'departmental',
      weight: 30,
      targetValue: 115,
      currentValue: 108,
      measurementUnit: '%',
      dueDate: '2025-06-30',
      status: 'active',
      achievementPercentage: 94
    },
    {
      id: '3',
      title: isRTL ? 'تطوير المهارات التقنية' : 'Develop Technical Skills',
      description: isRTL ? 'إكمال 3 دورات تدريبية في التقنيات الحديثة' : 'Complete 3 training courses in modern technologies',
      category: 'individual',
      weight: 50,
      targetValue: 3,
      currentValue: 2,
      measurementUnit: isRTL ? 'دورة' : 'courses',
      dueDate: '2025-09-30',
      status: 'active',
      achievementPercentage: 67
    }
  ]);

  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [newObjective, setNewObjective] = useState<Partial<Objective>>({
    category: 'individual',
    weight: 0,
    targetValue: 0,
    currentValue: 0,
    measurementUnit: '',
    status: 'active'
  });

  const categoryLabels = {
    institutional: isRTL ? 'مؤسسية' : 'Institutional',
    departmental: isRTL ? 'قسمية' : 'Departmental', 
    individual: isRTL ? 'فردية' : 'Individual'
  };

  const categoryColors = {
    institutional: 'bg-blue-500',
    departmental: 'bg-green-500',
    individual: 'bg-purple-500'
  };

  const statusLabels = {
    active: isRTL ? 'نشط' : 'Active',
    completed: isRTL ? 'مكتمل' : 'Completed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled'
  };

  const statusColors = {
    active: 'bg-blue-500',
    completed: 'bg-green-500', 
    cancelled: 'bg-red-500'
  };

  const defaultWeights = {
    institutional: 20,
    departmental: 30,
    individual: 50
  };

  const totalWeight = objectives.reduce((sum, obj) => sum + obj.weight, 0);
  const overallAchievement = objectives.reduce((sum, obj) => sum + (obj.achievementPercentage * obj.weight / 100), 0);

  const handleAddObjective = () => {
    setIsAddingObjective(true);
  };

  const handleSaveObjective = () => {
    if (newObjective.title && newObjective.description) {
      const objective: Objective = {
        id: Date.now().toString(),
        title: newObjective.title!,
        description: newObjective.description!,
        category: newObjective.category as any,
        weight: newObjective.weight!,
        targetValue: newObjective.targetValue!,
        currentValue: newObjective.currentValue!,
        measurementUnit: newObjective.measurementUnit!,
        dueDate: newObjective.dueDate!,
        status: 'active',
        achievementPercentage: newObjective.currentValue! / newObjective.targetValue! * 100
      };
      
      setObjectives([...objectives, objective]);
      setNewObjective({
        category: 'individual',
        weight: 0,
        targetValue: 0,
        currentValue: 0,
        measurementUnit: '',
        status: 'active'
      });
      setIsAddingObjective(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingObjective(false);
    setNewObjective({
      category: 'individual',
      weight: 0,
      targetValue: 0,
      currentValue: 0,
      measurementUnit: '',
      status: 'active'
    });
  };

  const handleDeleteObjective = (id: string) => {
    setObjectives(objectives.filter(obj => obj.id !== id));
  };

  const handleImportObjectives = () => {
    console.log('Importing objectives...');
  };

  const handleAlignObjective = (id: string) => {
    console.log('Aligning objective:', id);
  };

  const handleLockObjectives = () => {
    console.log('Locking objectives...');
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            {isRTL ? 'نظام الإدارة بالأهداف (MBO)' : 'Management by Objectives (MBO) System'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'تحديد الأهداف SMART ومتابعة تحقيقها مع الأوزان الافتراضية' : 'Set SMART objectives and track their achievement with default weights'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{defaultWeights.institutional}%</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'أهداف مؤسسية' : 'Institutional Goals'}</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{defaultWeights.departmental}%</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'أهداف قسمية' : 'Departmental Goals'}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{defaultWeights.individual}%</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'أهداف فردية' : 'Individual Goals'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {isRTL ? 'التقدم العام' : 'Overall Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isRTL ? 'إجمالي الإنجاز' : 'Total Achievement'}
              </span>
              <span className="text-lg font-bold">{overallAchievement.toFixed(1)}%</span>
            </div>
            <Progress value={overallAchievement} className="h-3" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isRTL ? 'إجمالي الأوزان' : 'Total Weights'}
              </span>
              <span className={`text-sm font-medium ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </span>
            </div>
            
            {totalWeight !== 100 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 dark:text-yellow-400">
                  {isRTL ? 'تحذير: إجمالي الأوزان يجب أن يساوي 100%' : 'Warning: Total weights should equal 100%'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleAddObjective} className="gap-2">
          <Plus className="w-4 h-4" />
          {isRTL ? 'إضافة هدف' : 'Add Objective'}
        </Button>
        <Button onClick={handleImportObjectives} variant="outline" className="gap-2">
          <Target className="w-4 h-4" />
          {isRTL ? 'استيراد أهداف' : 'Import Objectives'}
        </Button>
        <Button onClick={handleLockObjectives} variant="outline" className="gap-2">
          <Check className="w-4 h-4" />
          {isRTL ? 'قفل الأهداف' : 'Lock Objectives'}
        </Button>
      </div>

      {/* Add New Objective Form */}
      {isAddingObjective && (
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'إضافة هدف جديد' : 'Add New Objective'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">{isRTL ? 'عنوان الهدف' : 'Objective Title'}</Label>
                <Input
                  id="title"
                  value={newObjective.title || ''}
                  onChange={(e) => setNewObjective({...newObjective, title: e.target.value})}
                  placeholder={isRTL ? 'أدخل عنوان الهدف' : 'Enter objective title'}
                />
              </div>
              
              <div>
                <Label htmlFor="category">{isRTL ? 'الفئة' : 'Category'}</Label>
                <Select value={newObjective.category} onValueChange={(value) => setNewObjective({...newObjective, category: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="institutional">{categoryLabels.institutional}</SelectItem>
                    <SelectItem value="departmental">{categoryLabels.departmental}</SelectItem>
                    <SelectItem value="individual">{categoryLabels.individual}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="weight">{isRTL ? 'الوزن (%)' : 'Weight (%)'}</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newObjective.weight || ''}
                  onChange={(e) => setNewObjective({...newObjective, weight: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="targetValue">{isRTL ? 'القيمة المستهدفة' : 'Target Value'}</Label>
                <Input
                  id="targetValue"
                  type="number"
                  value={newObjective.targetValue || ''}
                  onChange={(e) => setNewObjective({...newObjective, targetValue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="currentValue">{isRTL ? 'القيمة الحالية' : 'Current Value'}</Label>
                <Input
                  id="currentValue"
                  type="number"
                  value={newObjective.currentValue || ''}
                  onChange={(e) => setNewObjective({...newObjective, currentValue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="measurementUnit">{isRTL ? 'وحدة القياس' : 'Measurement Unit'}</Label>
                <Input
                  id="measurementUnit"
                  value={newObjective.measurementUnit || ''}
                  onChange={(e) => setNewObjective({...newObjective, measurementUnit: e.target.value})}
                  placeholder={isRTL ? 'مثال: %, دولار, عدد' : 'e.g., %, $, count'}
                />
              </div>

              <div>
                <Label htmlFor="dueDate">{isRTL ? 'تاريخ الاستحقاق' : 'Due Date'}</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newObjective.dueDate || ''}
                  onChange={(e) => setNewObjective({...newObjective, dueDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">{isRTL ? 'وصف الهدف' : 'Objective Description'}</Label>
              <Textarea
                id="description"
                value={newObjective.description || ''}
                onChange={(e) => setNewObjective({...newObjective, description: e.target.value})}
                placeholder={isRTL ? 'اكتب وصفاً تفصيلياً للهدف' : 'Write a detailed description of the objective'}
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSaveObjective}>
                {isRTL ? 'حفظ الهدف' : 'Save Objective'}
              </Button>
              <Button onClick={handleCancelAdd} variant="outline">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Objectives List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{isRTL ? 'قائمة الأهداف' : 'Objectives List'}</h3>
        
        {objectives.map((objective) => (
          <Card key={objective.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{objective.title}</h4>
                    <Badge variant="outline" className={`text-white ${categoryColors[objective.category]}`}>
                      {categoryLabels[objective.category]}
                    </Badge>
                    <Badge variant="outline" className={`text-white ${statusColors[objective.status]}`}>
                      {statusLabels[objective.status]}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{objective.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الوزن' : 'Weight'}</span>
                      <div className="font-medium">{objective.weight}%</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الهدف' : 'Target'}</span>
                      <div className="font-medium">{objective.targetValue} {objective.measurementUnit}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الحالي' : 'Current'}</span>
                      <div className="font-medium">{objective.currentValue} {objective.measurementUnit}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الاستحقاق' : 'Due Date'}</span>
                      <div className="font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(objective.dueDate).toLocaleDateString(isRTL ? 'ar' : 'en')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {isRTL ? 'نسبة الإنجاز' : 'Achievement'}
                      </span>
                      <span className="text-sm font-medium">{objective.achievementPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={objective.achievementPercentage} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAlignObjective(objective.id)}
                    className="gap-1"
                  >
                    <Target className="w-3 h-3" />
                    {isRTL ? 'محاذاة' : 'Align'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit3 className="w-3 h-3" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteObjective(objective.id)}
                    className="gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    {isRTL ? 'حذف' : 'Delete'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};