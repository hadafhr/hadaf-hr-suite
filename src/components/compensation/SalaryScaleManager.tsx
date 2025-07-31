import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

interface SalaryLevel {
  id: string;
  category: string;
  level: number;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  totalSalary: number;
}

export const SalaryScaleManager: React.FC = () => {
  const [salaryLevels, setSalaryLevels] = useState<SalaryLevel[]>([
    {
      id: '1',
      category: 'الفئة الدنيا',
      level: 1,
      basicSalary: 4000,
      housingAllowance: 1000,
      transportAllowance: 400,
      totalSalary: 5400
    },
    {
      id: '2',
      category: 'الفئة الدنيا',
      level: 2,
      basicSalary: 4500,
      housingAllowance: 1125,
      transportAllowance: 450,
      totalSalary: 6075
    },
    {
      id: '3',
      category: 'الإشرافية',
      level: 1,
      basicSalary: 6000,
      housingAllowance: 1500,
      transportAllowance: 600,
      totalSalary: 8100
    },
    {
      id: '4',
      category: 'التنفيذية',
      level: 1,
      basicSalary: 8000,
      housingAllowance: 2000,
      transportAllowance: 800,
      totalSalary: 10800
    },
    {
      id: '5',
      category: 'العليا',
      level: 1,
      basicSalary: 12000,
      housingAllowance: 3000,
      transportAllowance: 1200,
      totalSalary: 16200
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<SalaryLevel | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    level: 1,
    basicSalary: 0
  });

  const categories = ['الفئة الدنيا', 'الإشرافية', 'التنفيذية', 'العليا'];

  const calculateAllowances = (basicSalary: number) => {
    const housingAllowance = basicSalary * 0.25; // 25%
    const transportAllowance = basicSalary * 0.10; // 10%
    const totalSalary = basicSalary + housingAllowance + transportAllowance;
    
    return { housingAllowance, transportAllowance, totalSalary };
  };

  const handleSave = () => {
    const { housingAllowance, transportAllowance, totalSalary } = calculateAllowances(formData.basicSalary);
    
    const newLevel: SalaryLevel = {
      id: editingLevel?.id || Date.now().toString(),
      category: formData.category,
      level: formData.level,
      basicSalary: formData.basicSalary,
      housingAllowance,
      transportAllowance,
      totalSalary
    };

    if (editingLevel) {
      setSalaryLevels(prev => prev.map(level => 
        level.id === editingLevel.id ? newLevel : level
      ));
    } else {
      setSalaryLevels(prev => [...prev, newLevel]);
    }

    setIsDialogOpen(false);
    setEditingLevel(null);
    setFormData({ category: '', level: 1, basicSalary: 0 });
  };

  const handleEdit = (level: SalaryLevel) => {
    setEditingLevel(level);
    setFormData({
      category: level.category,
      level: level.level,
      basicSalary: level.basicSalary
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSalaryLevels(prev => prev.filter(level => level.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'الفئة الدنيا': return 'bg-blue-100 text-blue-800';
      case 'الإشرافية': return 'bg-green-100 text-green-800';
      case 'التنفيذية': return 'bg-orange-100 text-orange-800';
      case 'العليا': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة سلم الرواتب</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingLevel(null);
                  setFormData({ category: '', level: 1, basicSalary: 0 });
                }}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة مستوى جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingLevel ? 'تعديل مستوى الراتب' : 'إضافة مستوى راتب جديد'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">الفئة الوظيفية</Label>
                    <Select value={formData.category} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة الوظيفية" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">المستوى</Label>
                    <Input
                      id="level"
                      type="number"
                      min="1"
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">الراتب الأساسي</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      min="0"
                      value={formData.basicSalary}
                      onChange={(e) => setFormData(prev => ({ ...prev, basicSalary: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  {formData.basicSalary > 0 && (
                    <div className="space-y-2 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium">حساب البدلات التلقائي:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>بدل السكن (25%): {(formData.basicSalary * 0.25).toFixed(0)} ريال</div>
                        <div>بدل المواصلات (10%): {(formData.basicSalary * 0.10).toFixed(0)} ريال</div>
                        <div className="col-span-2 font-medium">
                          إجمالي الراتب: {(formData.basicSalary * 1.35).toFixed(0)} ريال
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSave} disabled={!formData.category || !formData.basicSalary}>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الفئة الوظيفية</TableHead>
                <TableHead>المستوى</TableHead>
                <TableHead>الراتب الأساسي</TableHead>
                <TableHead>بدل السكن (25%)</TableHead>
                <TableHead>بدل المواصلات (10%)</TableHead>
                <TableHead>إجمالي الراتب</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaryLevels
                .sort((a, b) => {
                  const categoryOrder = ['الفئة الدنيا', 'الإشرافية', 'التنفيذية', 'العليا'];
                  const categoryCompare = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
                  return categoryCompare !== 0 ? categoryCompare : a.level - b.level;
                })
                .map((level) => (
                <TableRow key={level.id}>
                  <TableCell>
                    <Badge className={getCategoryColor(level.category)}>
                      {level.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{level.level}</TableCell>
                  <TableCell>{level.basicSalary.toLocaleString()} ريال</TableCell>
                  <TableCell>{level.housingAllowance.toLocaleString()} ريال</TableCell>
                  <TableCell>{level.transportAllowance.toLocaleString()} ريال</TableCell>
                  <TableCell className="font-medium">{level.totalSalary.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(level)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(level.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};