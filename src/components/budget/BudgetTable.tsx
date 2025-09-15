import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BudgetItem {
  id: string;
  category_code: string;
  category_name: string;
  allocated_amount: number;
  spent_amount: number;
  remaining_amount: number;
  utilization_percentage: number;
  status: 'good' | 'warning' | 'critical' | 'no_budget';
  created_at: string;
  updated_at: string;
  notes?: string;
}

interface BudgetTableProps {
  onBack?: () => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { toast } = useToast();

  // Default budget data
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: '1',
      category_code: 'SAL',
      category_name: 'الرواتب والأجور',
      allocated_amount: 1200000,
      spent_amount: 193000,
      remaining_amount: 1007000,
      utilization_percentage: 16.1,
      status: 'good',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      notes: 'رواتب فريق العمل الأساسي'
    },
    {
      id: '2',
      category_code: 'RENT',
      category_name: 'الإيجارات والمرافق',
      allocated_amount: 240000,
      spent_amount: 40000,
      remaining_amount: 200000,
      utilization_percentage: 16.7,
      status: 'good',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      notes: 'إيجار المكتب الرئيسي والفروع'
    },
    {
      id: '3',
      category_code: 'MKTG',
      category_name: 'التسويق والإعلان',
      allocated_amount: 180000,
      spent_amount: 15000,
      remaining_amount: 165000,
      utilization_percentage: 8.3,
      status: 'good',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      notes: 'حملات التسويق الرقمي'
    },
    {
      id: '4',
      category_code: 'IT',
      category_name: 'تقنية المعلومات',
      allocated_amount: 120000,
      spent_amount: 8000,
      remaining_amount: 112000,
      utilization_percentage: 6.7,
      status: 'good',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      notes: 'تحديث الأجهزة والبرمجيات'
    },
    {
      id: '5',
      category_code: 'TRAIN',
      category_name: 'التدريب والتطوير',
      allocated_amount: 60000,
      spent_amount: 5000,
      remaining_amount: 55000,
      utilization_percentage: 8.3,
      status: 'good',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      notes: 'برامج التدريب المهني'
    }
  ]);

  const [newBudgetForm, setNewBudgetForm] = useState({
    category_code: '',
    category_name: '',
    allocated_amount: 0,
    notes: ''
  });

  // Filter budget items
  const filteredItems = budgetItems.filter(item => {
    const matchesSearch = item.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated_amount, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent_amount, 0);
  const totalRemaining = budgetItems.reduce((sum, item) => sum + item.remaining_amount, 0);

  const handleAddBudgetItem = () => {
    if (!newBudgetForm.category_code || !newBudgetForm.category_name || !newBudgetForm.allocated_amount) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newItem: BudgetItem = {
      id: (budgetItems.length + 1).toString(),
      category_code: newBudgetForm.category_code.toUpperCase(),
      category_name: newBudgetForm.category_name,
      allocated_amount: newBudgetForm.allocated_amount,
      spent_amount: 0,
      remaining_amount: newBudgetForm.allocated_amount,
      utilization_percentage: 0,
      status: 'good' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: newBudgetForm.notes
    };

    setBudgetItems([...budgetItems, newItem]);
    setNewBudgetForm({ category_code: '', category_name: '', allocated_amount: 0, notes: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "تم إضافة البند بنجاح",
      description: "تم إضافة بند الميزانية الجديد"
    });
  };

  const handleEditBudgetItem = () => {
    if (!editingItem) return;

    setBudgetItems(budgetItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...editingItem,
            remaining_amount: editingItem.allocated_amount - editingItem.spent_amount,
            utilization_percentage: editingItem.allocated_amount > 0 ? (editingItem.spent_amount / editingItem.allocated_amount) * 100 : 0,
            status: editingItem.allocated_amount > 0 
              ? (editingItem.spent_amount / editingItem.allocated_amount) > 0.9 
                ? 'critical' as const
                : (editingItem.spent_amount / editingItem.allocated_amount) > 0.75 
                  ? 'warning' as const 
                  : 'good' as const
              : 'no_budget' as const,
            updated_at: new Date().toISOString()
          }
        : item
    ));
    
    setIsEditDialogOpen(false);
    setEditingItem(null);
    
    toast({
      title: "تم تحديث البند بنجاح",
      description: "تم تحديث بند الميزانية"
    });
  };

  const handleDeleteBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
    toast({
      title: "تم حذف البند",
      description: "تم حذف بند الميزانية بنجاح"
    });
  };

  const getStatusBadge = (status: string, percentage: number) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">تجاوز الحد</Badge>;
      case 'warning':
        return <Badge variant="secondary">تحذير</Badge>;
      case 'good':
        return <Badge variant="default">طبيعي</Badge>;
      case 'no_budget':
        return <Badge variant="outline">لا يوجد مخصص</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">جدول الميزانية</h1>
          <p className="text-muted-foreground">إدارة مخصصات ومصروفات الميزانية لعام {selectedYear}</p>
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            العودة
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المخصص</p>
                <p className="text-xl font-bold">{totalAllocated.toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المصروف</p>
                <p className="text-xl font-bold">{totalSpent.toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">المتبقي</p>
                <p className="text-xl font-bold">{totalRemaining.toLocaleString()} ريال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calculator className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">نسبة الصرف</p>
                <p className="text-xl font-bold">{((totalSpent / totalAllocated) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[2023, 2024, 2025, 2026].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في البنود..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <Filter className="h-4 w-4 ml-2" />
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="good">طبيعي</SelectItem>
                <SelectItem value="warning">تحذير</SelectItem>
                <SelectItem value="critical">تجاوز الحد</SelectItem>
                <SelectItem value="no_budget">لا يوجد مخصص</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)} className="w-fit">
          <Plus className="h-4 w-4 ml-2" />
          إضافة بند جديد
        </Button>
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            جدول الميزانية التفصيلي - {selectedYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الكود</TableHead>
                  <TableHead>اسم البند</TableHead>
                  <TableHead>المخصص</TableHead>
                  <TableHead>المصروف</TableHead>
                  <TableHead>المتبقي</TableHead>
                  <TableHead>نسبة الصرف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الملاحظات</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      لا توجد بنود مطابقة للفلاتر المحددة
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm font-medium">{item.category_code}</TableCell>
                      <TableCell className="font-medium">{item.category_name}</TableCell>
                      <TableCell className="font-semibold text-primary">{item.allocated_amount.toLocaleString()} ريال</TableCell>
                      <TableCell className="font-semibold text-blue-600">{item.spent_amount.toLocaleString()} ريال</TableCell>
                      <TableCell className="font-semibold text-green-600">{item.remaining_amount.toLocaleString()} ريال</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.utilization_percentage.toFixed(1)}%</span>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                item.utilization_percentage > 90 ? 'bg-red-500' :
                                item.utilization_percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(item.utilization_percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status, item.utilization_percentage)}</TableCell>
                      <TableCell className="max-w-32 truncate" title={item.notes}>
                        {item.notes || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="عرض"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="تعديل"
                            onClick={() => {
                              setEditingItem(item);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="حذف" 
                            className="text-destructive"
                            onClick={() => handleDeleteBudgetItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Budget Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بند ميزانية جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل بند الميزانية الجديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">كود البند *</Label>
              <Input
                id="code"
                placeholder="SAL, RENT, MKTG..."
                value={newBudgetForm.category_code}
                onChange={(e) => setNewBudgetForm(prev => ({ ...prev, category_code: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">اسم البند *</Label>
              <Input
                id="name"
                placeholder="اسم البند"
                value={newBudgetForm.category_name}
                onChange={(e) => setNewBudgetForm(prev => ({ ...prev, category_name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ المخصص (ريال) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={newBudgetForm.allocated_amount || ''}
                onChange={(e) => setNewBudgetForm(prev => ({ ...prev, allocated_amount: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                placeholder="ملاحظات إضافية..."
                value={newBudgetForm.notes}
                onChange={(e) => setNewBudgetForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddBudgetItem}>
              إضافة البند
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Budget Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بند الميزانية</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل بند الميزانية
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">كود البند</Label>
                <Input
                  id="edit-code"
                  value={editingItem.category_code}
                  onChange={(e) => setEditingItem(prev => prev ? ({ ...prev, category_code: e.target.value }) : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">اسم البند</Label>
                <Input
                  id="edit-name"
                  value={editingItem.category_name}
                  onChange={(e) => setEditingItem(prev => prev ? ({ ...prev, category_name: e.target.value }) : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-allocated">المبلغ المخصص (ريال)</Label>
                <Input
                  id="edit-allocated"
                  type="number"
                  value={editingItem.allocated_amount}
                  onChange={(e) => setEditingItem(prev => prev ? ({ ...prev, allocated_amount: parseFloat(e.target.value) || 0 }) : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-spent">المبلغ المصروف (ريال)</Label>
                <Input
                  id="edit-spent"
                  type="number"
                  value={editingItem.spent_amount}
                  onChange={(e) => setEditingItem(prev => prev ? ({ ...prev, spent_amount: parseFloat(e.target.value) || 0 }) : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">ملاحظات</Label>
                <Textarea
                  id="edit-notes"
                  value={editingItem.notes || ''}
                  onChange={(e) => setEditingItem(prev => prev ? ({ ...prev, notes: e.target.value }) : null)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditBudgetItem}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BudgetTable;