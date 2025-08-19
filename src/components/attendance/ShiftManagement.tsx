import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  Clock,
  Plus,
  Edit2,
  Trash2,
  Users,
  Calendar,
  RotateCcw,
  Home,
  Building2,
  Settings,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Sun,
  Sunset,
  Sunrise
} from 'lucide-react';

interface Shift {
  id: string;
  name: string;
  nameEn?: string;
  type: 'fixed' | 'rotating' | 'split' | 'remote' | 'flexible';
  startTime: string;
  endTime: string;
  breakTime?: string;
  breakDuration?: number;
  workDays: string[];
  department?: string;
  assignedEmployees: number;
  isActive: boolean;
  overtimeAllowed: boolean;
  lateGracePeriod: number;
  description?: string;
  color: string;
}

const ShiftManagement: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      name: 'الدوام النهاري الثابت',
      nameEn: 'Fixed Day Shift',
      type: 'fixed',
      startTime: '08:00',
      endTime: '17:00',
      breakTime: '12:00',
      breakDuration: 60,
      workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      department: 'الإدارة العامة',
      assignedEmployees: 45,
      isActive: true,
      overtimeAllowed: true,
      lateGracePeriod: 15,
      description: 'الدوام الأساسي للموظفين الإداريين',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'الدوام المسائي',
      nameEn: 'Evening Shift',
      type: 'fixed',
      startTime: '14:00',
      endTime: '22:00',
      breakTime: '18:00',
      breakDuration: 30,
      workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      department: 'خدمة العملاء',
      assignedEmployees: 12,
      isActive: true,
      overtimeAllowed: false,
      lateGracePeriod: 10,
      description: 'دوام خدمة العملاء المسائية',
      color: '#F59E0B'
    },
    {
      id: '3',
      name: 'الدوام المرن',
      nameEn: 'Flexible Hours',
      type: 'flexible',
      startTime: '07:00',
      endTime: '19:00',
      workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      assignedEmployees: 8,
      isActive: true,
      overtimeAllowed: true,
      lateGracePeriod: 30,
      description: 'دوام مرن للموظفين المتخصصين',
      color: '#10B981'
    },
    {
      id: '4',
      name: 'العمل عن بعد',
      nameEn: 'Remote Work',
      type: 'remote',
      startTime: '09:00',
      endTime: '18:00',
      workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      assignedEmployees: 15,
      isActive: true,
      overtimeAllowed: true,
      lateGracePeriod: 0,
      description: 'نظام العمل من المنزل',
      color: '#8B5CF6'
    },
    {
      id: '5',
      name: 'الدوام الدوار - أسبوعي',
      nameEn: 'Rotating Weekly Shift',
      type: 'rotating',
      startTime: '06:00',
      endTime: '14:00',
      workDays: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      department: 'الإنتاج',
      assignedEmployees: 24,
      isActive: true,
      overtimeAllowed: true,
      lateGracePeriod: 5,
      description: 'دوام دوار أسبوعي لقسم الإنتاج',
      color: '#EF4444'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [newShift, setNewShift] = useState<Partial<Shift>>({
    name: '',
    type: 'fixed',
    startTime: '08:00',
    endTime: '17:00',
    workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
    isActive: true,
    overtimeAllowed: false,
    lateGracePeriod: 15,
    color: '#3B82F6',
    assignedEmployees: 0
  });

  const shiftTypes = [
    { value: 'fixed', label: 'ثابت', icon: Clock, description: 'ساعات عمل ثابتة يومياً' },
    { value: 'rotating', label: 'دوار', icon: RotateCcw, description: 'دوريات متناوبة' },
    { value: 'split', label: 'مقسم', icon: Calendar, description: 'فترتين منفصلتين' },
    { value: 'remote', label: 'عن بعد', icon: Home, description: 'عمل من المنزل' },
    { value: 'flexible', label: 'مرن', icon: Settings, description: 'ساعات مرنة' }
  ];

  const workDays = [
    { value: 'saturday', label: 'السبت', shortLabel: 'س' },
    { value: 'sunday', label: 'الأحد', shortLabel: 'ح' },
    { value: 'monday', label: 'الإثنين', shortLabel: 'ن' },
    { value: 'tuesday', label: 'الثلاثاء', shortLabel: 'ث' },
    { value: 'wednesday', label: 'الأربعاء', shortLabel: 'ر' },
    { value: 'thursday', label: 'الخميس', shortLabel: 'خ' },
    { value: 'friday', label: 'الجمعة', shortLabel: 'ج' }
  ];

  const departments = [
    'الإدارة العامة',
    'تقنية المعلومات',
    'الموارد البشرية',
    'المبيعات',
    'التسويق',
    'خدمة العملاء',
    'الإنتاج',
    'المالية',
    'العمليات'
  ];

  const getShiftIcon = (type: string) => {
    switch (type) {
      case 'fixed':
        return <Sun className="h-4 w-4" />;
      case 'rotating':
        return <RotateCcw className="h-4 w-4" />;
      case 'split':
        return <Sunset className="h-4 w-4" />;
      case 'remote':
        return <Home className="h-4 w-4" />;
      case 'flexible':
        return <Settings className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getShiftTypeBadge = (type: string) => {
    const typeInfo = shiftTypes.find(st => st.value === type);
    return (
      <Badge variant="outline" className="gap-1">
        {getShiftIcon(type)}
        {typeInfo?.label}
      </Badge>
    );
  };

  const calculateShiftHours = (startTime: string, endTime: string, breakDuration: number = 0) => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(0, diffHours - (breakDuration / 60));
  };

  const handleCreateShift = () => {
    if (!newShift.name || !newShift.startTime || !newShift.endTime) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const shift: Shift = {
      id: Date.now().toString(),
      name: newShift.name!,
      nameEn: newShift.nameEn,
      type: newShift.type as any,
      startTime: newShift.startTime!,
      endTime: newShift.endTime!,
      breakTime: newShift.breakTime,
      breakDuration: newShift.breakDuration || 0,
      workDays: newShift.workDays || [],
      department: newShift.department,
      assignedEmployees: 0,
      isActive: true,
      overtimeAllowed: newShift.overtimeAllowed || false,
      lateGracePeriod: newShift.lateGracePeriod || 15,
      description: newShift.description,
      color: newShift.color || '#3B82F6'
    };

    setShifts([...shifts, shift]);
    setIsAddDialogOpen(false);
    setNewShift({
      name: '',
      type: 'fixed',
      startTime: '08:00',
      endTime: '17:00',
      workDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      isActive: true,
      overtimeAllowed: false,
      lateGracePeriod: 15,
      color: '#3B82F6',
      assignedEmployees: 0
    });

    toast({
      title: "تم إنشاء الدوام بنجاح",
      description: `تم إضافة دوام "${shift.name}" إلى النظام`
    });
  };

  const handleDeleteShift = (shiftId: string) => {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift?.assignedEmployees > 0) {
      toast({
        title: "لا يمكن حذف الدوام",
        description: "يوجد موظفون مُعينون لهذا الدوام. يرجى نقلهم أولاً.",
        variant: "destructive"
      });
      return;
    }

    setShifts(shifts.filter(s => s.id !== shiftId));
    toast({
      title: "تم حذف الدوام",
      description: "تم حذف الدوام بنجاح"
    });
  };

  const handleToggleShift = (shiftId: string) => {
    setShifts(shifts.map(shift => 
      shift.id === shiftId 
        ? { ...shift, isActive: !shift.isActive }
        : shift
    ));
  };

  const handleDuplicateShift = (shift: Shift) => {
    const duplicated: Shift = {
      ...shift,
      id: Date.now().toString(),
      name: `${shift.name} - نسخة`,
      assignedEmployees: 0
    };

    setShifts([...shifts, duplicated]);
    toast({
      title: "تم نسخ الدوام",
      description: `تم إنشاء نسخة من "${shift.name}"`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-[#009F87]" />
              إدارة أنواع الدوام وساعات العمل
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة دوام جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>إضافة دوام جديد</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الدوام *</Label>
                      <Input
                        value={newShift.name}
                        onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
                        placeholder="مثل: الدوام النهاري"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>الاسم بالإنجليزية</Label>
                      <Input
                        value={newShift.nameEn || ''}
                        onChange={(e) => setNewShift({ ...newShift, nameEn: e.target.value })}
                        placeholder="Day Shift"
                      />
                    </div>
                  </div>

                  {/* Type Selection */}
                  <div className="space-y-2">
                    <Label>نوع الدوام *</Label>
                    <Select 
                      value={newShift.type} 
                      onValueChange={(value) => setNewShift({ ...newShift, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {shiftTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              <div>
                                <div>{type.label}</div>
                                <div className="text-xs text-gray-500">{type.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Times */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>وقت البداية *</Label>
                      <Input
                        type="time"
                        value={newShift.startTime}
                        onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>وقت النهاية *</Label>
                      <Input
                        type="time"
                        value={newShift.endTime}
                        onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>فترة السماح (دقائق)</Label>
                      <Input
                        type="number"
                        value={newShift.lateGracePeriod}
                        onChange={(e) => setNewShift({ ...newShift, lateGracePeriod: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="60"
                      />
                    </div>
                  </div>

                  {/* Break Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>وقت الاستراحة</Label>
                      <Input
                        type="time"
                        value={newShift.breakTime || ''}
                        onChange={(e) => setNewShift({ ...newShift, breakTime: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>مدة الاستراحة (دقائق)</Label>
                      <Input
                        type="number"
                        value={newShift.breakDuration || ''}
                        onChange={(e) => setNewShift({ ...newShift, breakDuration: parseInt(e.target.value) || 0 })}
                        min="0"
                        max="120"
                      />
                    </div>
                  </div>

                  {/* Work Days */}
                  <div className="space-y-2">
                    <Label>أيام العمل *</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {workDays.map(day => (
                        <label key={day.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newShift.workDays?.includes(day.value)}
                            onChange={(e) => {
                              const days = newShift.workDays || [];
                              if (e.target.checked) {
                                setNewShift({ ...newShift, workDays: [...days, day.value] });
                              } else {
                                setNewShift({ ...newShift, workDays: days.filter(d => d !== day.value) });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{day.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label>القسم</Label>
                    <Select 
                      value={newShift.department || ''} 
                      onValueChange={(value) => setNewShift({ ...newShift, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>السماح بالعمل الإضافي</Label>
                      <Switch
                        checked={newShift.overtimeAllowed}
                        onCheckedChange={(checked) => setNewShift({ ...newShift, overtimeAllowed: checked })}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label>الوصف</Label>
                    <Textarea
                      value={newShift.description || ''}
                      onChange={(e) => setNewShift({ ...newShift, description: e.target.value })}
                      placeholder="وصف مختصر للدوام"
                      rows={3}
                    />
                  </div>

                  {/* Color */}
                  <div className="space-y-2">
                    <Label>لون الدوام</Label>
                    <div className="flex gap-2">
                      {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'].map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${newShift.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewShift({ ...newShift, color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleCreateShift} className="bg-[#009F87] hover:bg-[#008072] text-white">
                      إنشاء الدوام
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{shifts.length}</div>
                <div className="text-sm text-gray-600">إجمالي الدوريات</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{shifts.filter(s => s.isActive).length}</div>
                <div className="text-sm text-gray-600">دوريات نشطة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{shifts.reduce((sum, s) => sum + s.assignedEmployees, 0)}</div>
                <div className="text-sm text-gray-600">موظف مُعين</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{shifts.filter(s => !s.isActive).length}</div>
                <div className="text-sm text-gray-600">دوريات غير نشطة</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shifts List */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader>
          <CardTitle>قائمة الدوريات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shifts.map(shift => (
              <Card key={shift.id} className={`border-r-4 ${shift.isActive ? 'bg-white' : 'bg-gray-50'}`} style={{ borderRightColor: shift.color }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getShiftIcon(shift.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{shift.name}</span>
                            {shift.nameEn && (
                              <span className="text-sm text-gray-500">({shift.nameEn})</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {getShiftTypeBadge(shift.type)}
                            {shift.department && (
                              <Badge variant="outline">
                                <Building2 className="h-3 w-3 ml-1" />
                                {shift.department}
                              </Badge>
                            )}
                            {!shift.isActive && (
                              <Badge variant="secondary">غير نشط</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold">{shift.startTime} - {shift.endTime}</div>
                        <div className="text-sm text-gray-600">
                          {calculateShiftHours(shift.startTime, shift.endTime, shift.breakDuration).toFixed(1)} ساعة
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-[#009F87]">{shift.assignedEmployees}</div>
                        <div className="text-sm text-gray-600">موظف</div>
                      </div>

                      <div className="text-center">
                        <div className="flex gap-1 mb-1">
                          {workDays.map(day => (
                            <span
                              key={day.value}
                              className={`w-6 h-6 text-xs rounded flex items-center justify-center ${
                                shift.workDays.includes(day.value) 
                                  ? 'bg-[#009F87] text-white' 
                                  : 'bg-gray-200 text-gray-400'
                              }`}
                            >
                              {day.shortLabel}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">أيام العمل</div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicateShift(shift)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingShift(shift)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleShift(shift.id)}
                          className={shift.isActive ? 'text-yellow-600' : 'text-green-600'}
                        >
                          {shift.isActive ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteShift(shift.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={shift.assignedEmployees > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {shift.description && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {shift.description}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    {shift.breakTime && (
                      <div>استراحة: {shift.breakTime} ({shift.breakDuration} دقيقة)</div>
                    )}
                    <div>فترة السماح: {shift.lateGracePeriod} دقيقة</div>
                    <div>العمل الإضافي: {shift.overtimeAllowed ? 'مسموح' : 'غير مسموح'}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftManagement;