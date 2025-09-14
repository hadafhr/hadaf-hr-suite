import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, Clock, Plus, Edit, Trash2, Filter, ArrowLeft, ArrowRight, 
  User, Building, FileText, Download, Printer, Move, Timer, Users,
  CalendarDays, Search, Settings, ChevronLeft, ChevronRight, FolderOpen,
  Copy, Repeat, MoreHorizontal, CalendarRange, Target, Zap, FileSpreadsheet
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, differenceInMinutes, parseISO, eachDayOfInterval, isWeekend, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Shift {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  type: 'normal' | 'extra' | 'ot' | 'leave' | 'absence';
  status: 'scheduled' | 'completed' | 'pending';
  notes?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  templateId?: string;
  source: 'manual' | 'template' | 'repeated' | 'cloned';
  parentShiftId?: string;
  color?: string; // ⚙️ إضافة اللون المخصص للشفت
}

interface ShiftTemplate {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  type: 'normal' | 'extra' | 'ot' | 'leave' | 'absence';
  notes?: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  color?: string; // ⚙️ إضافة اللون المخصص للقالب
}

interface RepeatConfig {
  startDate: string;
  endDate: string;
  days: number[]; // 0=Sunday, 1=Monday, etc.
  excludeWeekends: boolean;
  excludeHolidays: boolean;
  everyXDays?: number;
}

interface CloneConfig {
  sourceEmployeeId: string;
  targetEmployeeIds: string[];
  startDate: string;
  endDate: string;
  overwriteExisting: boolean;
}

interface Employee {
  id: string;
  name: string;
  code: string;
  position: string;
  department: string;
  avatar?: string;
  contractType: 'full-time' | 'part-time' | 'contract';
  standardHours: number;
}

interface ShiftScheduleTableProps {
  onBack?: () => void;
}

const ShiftScheduleTable: React.FC<ShiftScheduleTableProps> = ({ onBack }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedShiftType, setSelectedShiftType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{employeeId: string, date: string} | null>(null);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  // ⚙️ New State Variables for Enhanced Features
  const [dateRange, setDateRange] = useState({
    startDate: format(startOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
    endDate: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')
  });
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false);
  const [isRepeatDialogOpen, setIsRepeatDialogOpen] = useState(false);
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const [isApplyTemplateOpen, setIsApplyTemplateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [repeatConfig, setRepeatConfig] = useState<RepeatConfig>({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    days: [1, 2, 3, 4, 5], // Mon-Fri
    excludeWeekends: true,
    excludeHolidays: true
  });
  const [cloneConfig, setCloneConfig] = useState<CloneConfig>({
    sourceEmployeeId: '',
    targetEmployeeIds: [],
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    overwriteExisting: false
  });

  // ⚙️ Shift Templates Data
  const [templates, setTemplates] = useState<ShiftTemplate[]>([
    {
      id: 'template1',
      name: 'دوام صباحي عادي',
      startTime: '08:00',
      endTime: '17:00',
      breakMinutes: 60,
      type: 'normal',
      notes: 'دوام عادي من الساعة 8 صباحاً حتى 5 مساءً مع ساعة راحة',
      companyId: 'comp1',
      createdBy: 'user1',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      isActive: true
    },
    {
      id: 'template2', 
      name: 'دوام مسائي',
      startTime: '14:00',
      endTime: '22:00', 
      breakMinutes: 60,
      type: 'normal',
      notes: 'دوام مسائي من الساعة 2 ظهراً حتى 10 ليلاً',
      companyId: 'comp1',
      createdBy: 'user1', 
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      isActive: true
    },
    {
      id: 'template3',
      name: 'ساعات إضافية',
      startTime: '08:00',
      endTime: '20:00',
      breakMinutes: 90,
      type: 'ot',
      notes: 'دوام بساعات إضافية 12 ساعة',
      companyId: 'comp1',
      createdBy: 'user1',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      isActive: true
    }
  ]);

  const [newTemplate, setNewTemplate] = useState<Partial<ShiftTemplate>>({
    name: '',
    startTime: '08:00',
    endTime: '17:00',
    breakMinutes: 60,
    type: 'normal',
    notes: ''
  });

  // ⚙️ State للشفت الجديد مع اللون
  const [newShiftData, setNewShiftData] = useState({
    startTime: '08:00',
    endTime: '17:00',
    breakMinutes: 60,
    type: 'normal' as const,
    notes: '',
    color: '' // اللون المخصص
  });

  // ⚙️ ألوان محددة مسبقاً للاختيار
  const predefinedColors = [
    { name: 'أخضر', value: 'green', hex: '#22c55e' },
    { name: 'أزرق', value: 'blue', hex: '#3b82f6' },
    { name: 'برتقالي', value: 'orange', hex: '#f97316' },
    { name: 'أحمر', value: 'red', hex: '#ef4444' },
    { name: 'بنفسجي', value: 'purple', hex: '#a855f7' },
    { name: 'وردي', value: 'pink', hex: '#ec4899' },
    { name: 'أصفر', value: 'yellow', hex: '#eab308' },
    { name: 'رمادي', value: 'gray', hex: '#6b7280' },
    { name: 'فيروزي', value: 'teal', hex: '#14b8a6' },
    { name: 'نيلي', value: 'indigo', hex: '#6366f1' }
  ];

  // Mock data
  const employees: Employee[] = [
    {
      id: 'emp1',
      name: 'أحمد محمد الأحمد',
      code: 'EMP001',
      position: 'مطور برمجيات',
      department: 'تقنية المعلومات',
      contractType: 'full-time',
      standardHours: 8,
      avatar: '/placeholder.svg'
    },
    {
      id: 'emp2',
      name: 'فاطمة علي السعد',
      code: 'EMP002',
      position: 'محاسبة',
      department: 'المالية',
      contractType: 'full-time',
      standardHours: 8,
      avatar: '/placeholder.svg'
    },
    {
      id: 'emp3',
      name: 'محمد سعد الغامدي',
      code: 'EMP003',
      position: 'مصمم',
      department: 'التسويق',
      contractType: 'part-time',
      standardHours: 6,
      avatar: '/placeholder.svg'
    },
    {
      id: 'emp4',
      name: 'نورا أحمد القحطاني',
      code: 'EMP004',
      position: 'موارد بشرية',
      department: 'الموارد البشرية',
      contractType: 'full-time',
      standardHours: 8,
      avatar: '/placeholder.svg'
    }
  ];

  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 'shift1',
      employeeId: 'emp1',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '08:00',
      endTime: '17:00',
      breakMinutes: 60,
      type: 'normal',
      status: 'scheduled',
      source: 'manual',
      color: 'green' // ⚙️ لون أخضر مخصص
    },
    {
      id: 'shift2',
      employeeId: 'emp1',
      date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      startTime: '08:00',
      endTime: '19:00',
      breakMinutes: 60,
      type: 'ot',
      status: 'scheduled',
      source: 'manual',
      color: 'purple' // ⚙️ لون بنفسجي مخصص
    },
    {
      id: 'shift3',
      employeeId: 'emp2',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '18:00',
      breakMinutes: 60,
      type: 'normal',
      status: 'completed',
      source: 'manual',
      color: 'blue' // ⚙️ لون أزرق مخصص
    },
    {
      id: 'shift4',
      employeeId: 'emp3',
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      startTime: '00:00',
      endTime: '00:00',
      breakMinutes: 0,
      type: 'leave',
      status: 'scheduled',
      source: 'manual',
      color: 'yellow' // ⚙️ لون أصفر مخصص
    }
  ]);

  // Calculate hours for a shift
  const calculateShiftHours = (shift: Shift): { 
    totalMinutes: number, 
    netMinutes: number, 
    hours: number, 
    minutes: number,
    decimalHours: number,
    isOvertime: boolean,
    overtimeMinutes: number
  } => {
    if (shift.type === 'leave' || shift.type === 'absence') {
      return { 
        totalMinutes: 0, 
        netMinutes: 0, 
        hours: 0, 
        minutes: 0, 
        decimalHours: 0,
        isOvertime: false,
        overtimeMinutes: 0
      };
    }

    const startTime = new Date(`2000-01-01T${shift.startTime}:00`);
    let endTime = new Date(`2000-01-01T${shift.endTime}:00`);
    
    // Handle overnight shifts
    if (endTime <= startTime) {
      endTime = new Date(`2000-01-02T${shift.endTime}:00`);
    }

    const totalMinutes = differenceInMinutes(endTime, startTime);
    const netMinutes = Math.max(0, totalMinutes - shift.breakMinutes);
    
    const hours = Math.floor(netMinutes / 60);
    const minutes = netMinutes % 60;
    const decimalHours = netMinutes / 60;

    const employee = employees.find(emp => emp.id === shift.employeeId);
    const standardMinutes = (employee?.standardHours || 8) * 60;
    const isOvertime = netMinutes > standardMinutes;
    const overtimeMinutes = isOvertime ? netMinutes - standardMinutes : 0;

    return { 
      totalMinutes, 
      netMinutes, 
      hours, 
      minutes, 
      decimalHours: Math.round(decimalHours * 100) / 100,
      isOvertime,
      overtimeMinutes
    };
  };

  // Get week days or date range days
  const displayDays = useMemo(() => {
    if (viewMode === 'week') {
      const start = startOfWeek(currentWeek, { weekStartsOn: 6 }); // Saturday
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    } else {
      // Custom date range
      const start = parseISO(dateRange.startDate);
      const end = parseISO(dateRange.endDate);
      return eachDayOfInterval({ start, end });
    }
  }, [currentWeek, viewMode, dateRange]);

  // ⚙️ Enhanced Functions for New Features
  
  // Apply template to shift data
  const applyTemplate = (template: ShiftTemplate): Partial<Shift> => ({
    startTime: template.startTime,
    endTime: template.endTime,
    breakMinutes: template.breakMinutes,
    type: template.type,
    notes: template.notes,
    templateId: template.id,
    source: 'template'
  });

  // Create shifts from template with repeat configuration
  const createRepeatedShifts = (template: ShiftTemplate, employeeIds: string[], repeatConfig: RepeatConfig) => {
    const newShifts: Shift[] = [];
    const startDate = parseISO(repeatConfig.startDate);
    const endDate = parseISO(repeatConfig.endDate);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    employeeIds.forEach(employeeId => {
      dateRange.forEach(date => {
        const dayOfWeek = date.getDay();
        
        // Check if this day should be included
        if (!repeatConfig.days.includes(dayOfWeek)) return;
        if (repeatConfig.excludeWeekends && isWeekend(date)) return;
        
        // Check if shift already exists
        const dateStr = format(date, 'yyyy-MM-dd');
        const existingShift = shifts.find(s => s.employeeId === employeeId && s.date === dateStr);
        if (existingShift) return;

        const newShift: Shift = {
          id: `shift_${Date.now()}_${employeeId}_${dateStr}`,
          employeeId,
          date: dateStr,
          startTime: template.startTime,
          endTime: template.endTime,
          breakMinutes: template.breakMinutes,
          type: template.type,
          notes: template.notes,
          templateId: template.id,
          source: 'repeated',
          status: 'scheduled'
        };

        newShifts.push(newShift);
      });
    });

    return newShifts;
  };

  // Clone shifts from one employee to others
  const cloneEmployeeShifts = (config: CloneConfig) => {
    const startDate = parseISO(config.startDate);
    const endDate = parseISO(config.endDate);
    const sourceShifts = shifts.filter(shift => {
      const shiftDate = parseISO(shift.date);
      return shift.employeeId === config.sourceEmployeeId &&
             shiftDate >= startDate && shiftDate <= endDate;
    });

    const newShifts: Shift[] = [];
    
    config.targetEmployeeIds.forEach(targetId => {
      sourceShifts.forEach(sourceShift => {
        const existingShift = shifts.find(s => 
          s.employeeId === targetId && s.date === sourceShift.date
        );
        
        if (existingShift && !config.overwriteExisting) return;
        
        if (existingShift && config.overwriteExisting) {
          // Remove existing shift
          setShifts(prev => prev.filter(s => s.id !== existingShift.id));
        }

        const newShift: Shift = {
          ...sourceShift,
          id: `shift_${Date.now()}_${targetId}_${sourceShift.date}`,
          employeeId: targetId,
          source: 'cloned',
          parentShiftId: sourceShift.id
        };

        newShifts.push(newShift);
      });
    });

    return newShifts;
  };

  // Add template
  const addTemplate = () => {
    if (!newTemplate.name || !newTemplate.startTime || !newTemplate.endTime) return;
    
    const template: ShiftTemplate = {
      id: `template_${Date.now()}`,
      name: newTemplate.name,
      startTime: newTemplate.startTime || '08:00',
      endTime: newTemplate.endTime || '17:00',
      breakMinutes: newTemplate.breakMinutes || 60,
      type: newTemplate.type || 'normal',
      notes: newTemplate.notes || '',
      companyId: 'comp1',
      createdBy: 'user1',
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      isActive: true
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: '',
      startTime: '08:00',
      endTime: '17:00',
      breakMinutes: 60,
      type: 'normal',
      notes: ''
    });
  };

  // Delete template
  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  // Apply template to multiple employees/departments
  const applyTemplateToTargets = (templateId: string, targetType: 'employees' | 'department' | 'branch', targetIds: string[]) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    let targetEmployeeIds: string[] = [];
    
    if (targetType === 'employees') {
      targetEmployeeIds = targetIds;
    } else if (targetType === 'department') {
      targetEmployeeIds = employees.filter(emp => targetIds.includes(emp.department)).map(emp => emp.id);
    } else if (targetType === 'branch') {
      // Assuming all employees are in same branch for now
      targetEmployeeIds = employees.map(emp => emp.id);
    }

    const newShifts = createRepeatedShifts(template, targetEmployeeIds, repeatConfig);
    setShifts(prev => [...prev, ...newShifts]);
  };

  // Export functions
  const exportToExcel = () => {
    const data = shifts.map(shift => {
      const employee = employees.find(emp => emp.id === shift.employeeId);
      const calc = calculateShiftHours(shift);
      return {
        'الموظف': employee?.name || '',
        'الكود': employee?.code || '',
        'القسم': employee?.department || '',
        'التاريخ': format(parseISO(shift.date), 'dd/MM/yyyy', { locale: ar }),
        'البداية': shift.startTime,
        'النهاية': shift.endTime,
        'الاستراحة': shift.breakMinutes + ' دقيقة',
        'الساعات الصافية': calc.decimalHours + ' ساعة',
        'نوع الشفت': shift.type,
        'الحالة': shift.status,
        'المصدر': shift.source,
        'ملاحظات': shift.notes || ''
      };
    });
    
    console.log('تصدير البيانات:', data);
    // Here you would implement actual Excel export
  };

  // Get week days
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 6 }); // Saturday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentWeek]);

  // Get shifts for employee and date
  const getShiftsForCell = (employeeId: string, date: Date): Shift[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return shifts.filter(shift => 
      shift.employeeId === employeeId && shift.date === dateStr
    );
  };

  // Shift type colors - ⚙️ تحديث دعم الألوان المخصصة
  const getShiftTypeColor = (type: string, customColor?: string) => {
    // إذا كان هناك لون مخصص، استخدمه
    if (customColor) {
      const colorObj = predefinedColors.find(c => c.value === customColor);
      if (colorObj) {
        return `border-2 text-white shadow-md` + ` bg-gradient-to-br from-${customColor}-400 to-${customColor}-600 hover:from-${customColor}-500 hover:to-${customColor}-700`;
      }
    }

    // الألوان الافتراضية حسب النوع
    switch (type) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'extra':
      case 'ot':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'leave':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'absence':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate weekly totals for employee
  const getEmployeeWeeklyTotal = (employeeId: string) => {
    const weekShifts = shifts.filter(shift => {
      const shiftDate = parseISO(shift.date);
      return shift.employeeId === employeeId && 
             shiftDate >= weekDays[0] && 
             shiftDate <= weekDays[6];
    });

    const totalMinutes = weekShifts.reduce((sum, shift) => {
      const calc = calculateShiftHours(shift);
      return sum + calc.netMinutes;
    }, 0);

    const overtimeMinutes = weekShifts.reduce((sum, shift) => {
      const calc = calculateShiftHours(shift);
      return sum + calc.overtimeMinutes;
    }, 0);

    return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes % 60,
      decimalHours: Math.round((totalMinutes / 60) * 100) / 100,
      overtimeHours: Math.floor(overtimeMinutes / 60),
      overtimeMinutes: overtimeMinutes % 60,
      overtimeDecimal: Math.round((overtimeMinutes / 60) * 100) / 100
    };
  };

  // Calculate daily totals
  const getDailyTotals = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayShifts = shifts.filter(shift => shift.date === dateStr);
    
    const totalMinutes = dayShifts.reduce((sum, shift) => {
      const calc = calculateShiftHours(shift);
      return sum + calc.netMinutes;
    }, 0);

    const overtimeMinutes = dayShifts.reduce((sum, shift) => {
      const calc = calculateShiftHours(shift);
      return sum + calc.overtimeMinutes;
    }, 0);

    return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes % 60,
      overtimeHours: Math.floor(overtimeMinutes / 60),
      overtimeMinutes: overtimeMinutes % 60,
      shiftsCount: dayShifts.length
    };
  };

  // Add new shift
  const addShift = (shiftData: Partial<Shift>) => {
    const newShift: Shift = {
      id: `shift_${Date.now()}`,
      employeeId: selectedCell?.employeeId || '',
      date: selectedCell?.date || format(new Date(), 'yyyy-MM-dd'),
      startTime: '08:00',
      endTime: '17:00',
      breakMinutes: 60,
      type: 'normal',
      status: 'scheduled',
      source: 'manual',
      ...shiftData
    };
    
    setShifts(prev => [...prev, newShift]);
    setIsAddShiftOpen(false);
    setSelectedCell(null);
  };

  // Update shift
  const updateShift = (shiftId: string, updates: Partial<Shift>) => {
    setShifts(prev => prev.map(shift => 
      shift.id === shiftId ? { ...shift, ...updates } : shift
    ));
  };

  // Delete shift
  const deleteShift = (shiftId: string) => {
    setShifts(prev => prev.filter(shift => shift.id !== shiftId));
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    if (selectedEmployee && selectedEmployee !== 'all' && emp.id !== selectedEmployee) return false;
    if (selectedDepartment && selectedDepartment !== 'all' && emp.department !== selectedDepartment) return false;
    return true;
  });

  // Get unique departments
  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-foreground">جدول الدوام والشفتات المتكامل</h2>
              <p className="text-muted-foreground">إدارة شفتات الموظفين مع حساب الساعات الفوري والتكرار التلقائي</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* ⚙️ Templates Manager Button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsTemplateManagerOpen(true)}
            >
              <FolderOpen className="h-4 w-4 ml-2" />
              إدارة القوالب
            </Button>

            <Select value={viewMode} onValueChange={(value: 'week' | 'month') => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">أسبوعي</SelectItem>
                <SelectItem value="month">نطاق مخصص</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={exportToExcel}>
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 ml-2" />
              طباعة
            </Button>
          </div>
        </div>

        {/* ⚙️ Custom Date Range Controls */}
        {viewMode === 'month' && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CalendarRange className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">تحديد الفترة:</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">من تاريخ</Label>
                    <Input 
                      type="date" 
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-36"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">إلى تاريخ</Label>
                    <Input 
                      type="date" 
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-36"
                    />
                  </div>
                </div>
                <Button size="sm" variant="default">
                  <Search className="h-4 w-4 ml-2" />
                  عرض الفترة
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setIsApplyTemplateOpen(true)}
                >
                  <Target className="h-4 w-4 ml-2" />
                  تطبيق قالب
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              {/* Navigation */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentWeek(prev => addDays(prev, -7))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <div className="text-lg font-semibold px-4">
                  {format(weekDays[0], 'dd/MM/yyyy', { locale: ar })} - {format(weekDays[6], 'dd/MM/yyyy', { locale: ar })}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentWeek(prev => addDays(prev, 7))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentWeek(new Date())}
                >
                  اليوم
                </Button>
              </div>

              {/* Summary */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{filteredEmployees.length} موظف</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {shifts.filter(s => {
                      const calc = calculateShiftHours(s);
                      return calc.isOvertime;
                    }).length} شفت إضافي
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأقسام" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الموظفين" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الموظفين</SelectItem>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedShiftType} onValueChange={setSelectedShiftType}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الأنواع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="normal">عادي</SelectItem>
                  <SelectItem value="ot">ساعات إضافية</SelectItem>
                  <SelectItem value="leave">إجازة</SelectItem>
                  <SelectItem value="absence">غياب</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="justify-start">
                <Filter className="h-4 w-4 ml-2" />
                مزيد من الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-right font-semibold min-w-[200px] sticky right-0 bg-background z-10">
                      الموظف
                    </th>
                    {weekDays.map(day => (
                      <th key={day.toISOString()} className="p-3 text-center font-semibold min-w-[150px]">
                        <div className="flex flex-col items-center gap-1">
                          <div className="font-bold">
                            {format(day, 'EEEE', { locale: ar })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(day, 'dd/MM')}
                          </div>
                        </div>
                      </th>
                    ))}
                    <th className="p-3 text-center font-semibold min-w-[120px]">
                      إجمالي الأسبوع
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredEmployees.map(employee => {
                    const weeklyTotal = getEmployeeWeeklyTotal(employee.id);
                    
                    return (
                      <tr key={employee.id} className="border-b hover:bg-muted/30">
                        {/* Employee Info */}
                        <td className="p-4 sticky right-0 bg-background z-10">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-sm">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {employee.code} • {employee.position}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {employee.department}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ⚙️ Clone Button */}
                        <td className="p-2 align-middle">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCloneConfig(prev => ({ 
                                ...prev, 
                                sourceEmployeeId: employee.id,
                                targetEmployeeIds: []
                              }));
                              setIsCloneDialogOpen(true);
                            }}
                            className="w-8 h-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </td>

                        {/* Day Cells */}
                        {displayDays.map(day => {
                          const dayShifts = getShiftsForCell(employee.id, day);
                          const dateStr = format(day, 'yyyy-MM-dd');
                          
                          return (
                            <td key={day.toISOString()} className="p-2 align-top">
                              <div className="min-h-[80px] space-y-1">
                                {dayShifts.length === 0 ? (
                                  // Empty cell - Add shift button
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-full min-h-[80px] border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
                                    onClick={() => {
                                      setSelectedCell({ employeeId: employee.id, date: dateStr });
                                      setIsAddShiftOpen(true);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                ) : (
                                   // Shifts in cell
                                   dayShifts.map(shift => {
                                     const calc = calculateShiftHours(shift);
                                     const shiftColor = getShiftTypeColor(shift.type, shift.color);
                                     
                                     return (
                                       <Tooltip key={shift.id}>
                                         <TooltipTrigger asChild>
                                           <div 
                                             className={`p-2 rounded-lg border cursor-pointer hover:shadow-md transition-all group ${shiftColor}`}
                                             onClick={() => setEditingShift(shift)}
                                           >
                                             {/* ⚙️ Color Indicator */}
                                             {shift.color && (
                                               <div 
                                                 className="absolute top-1 left-1 w-3 h-3 rounded-full border border-white shadow-sm"
                                                 style={{ backgroundColor: predefinedColors.find(c => c.value === shift.color)?.hex }}
                                               />
                                             )}

                                             {/* Time Range */}
                                             <div className="flex items-center justify-between text-xs font-medium mb-1">
                                               <span>{shift.startTime} - {shift.endTime}</span>
                                               <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                                                 <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                                                   <Edit className="h-3 w-3" />
                                                 </Button>
                                                 <Button 
                                                   size="sm" 
                                                   variant="ghost" 
                                                   className="h-5 w-5 p-0"
                                                   onClick={(e) => {
                                                     e.stopPropagation();
                                                     deleteShift(shift.id);
                                                   }}
                                                 >
                                                   <Trash2 className="h-3 w-3" />
                                                 </Button>
                                               </div>
                                             </div>
                                            
                                            {/* Hours Badge */}
                                            {shift.type !== 'leave' && shift.type !== 'absence' && (
                                              <div className="flex items-center justify-between">
                                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                                  <Timer className="h-3 w-3 ml-1" />
                                                  {calc.hours}س {calc.minutes}د ({calc.decimalHours}س)
                                                </Badge>
                                                {calc.isOvertime && (
                                                  <Badge variant="destructive" className="text-xs px-1 py-0">
                                                    إضافي
                                                  </Badge>
                                                )}
                                              </div>
                                            )}
                                            
                                            {/* Type Badge */}
                                            <div className="mt-1">
                                              <Badge variant="outline" className="text-xs">
                                                {shift.type === 'normal' && 'عادي'}
                                                {shift.type === 'ot' && 'إضافي'}
                                                {shift.type === 'extra' && 'إضافي'}
                                                {shift.type === 'leave' && 'إجازة'}
                                                {shift.type === 'absence' && 'غياب'}
                                              </Badge>
                                            </div>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs">
                                          <div className="space-y-2 text-xs">
                                            <div><strong>الموظف:</strong> {employee.name}</div>
                                            <div><strong>التاريخ:</strong> {format(parseISO(shift.date), 'dd/MM/yyyy', { locale: ar })}</div>
                                            <div><strong>الوقت:</strong> {shift.startTime} - {shift.endTime}</div>
                                            {shift.type !== 'leave' && shift.type !== 'absence' && (
                                              <>
                                                <div><strong>الاستراحة:</strong> {shift.breakMinutes} دقيقة</div>
                                                <div><strong>إجمالي الساعات:</strong> {calc.hours}س {calc.minutes}د</div>
                                                <div><strong>الساعات الصافية:</strong> {calc.decimalHours} ساعة</div>
                                                {calc.isOvertime && (
                                                  <div className="text-orange-600">
                                                    <strong>ساعات إضافية:</strong> {Math.floor(calc.overtimeMinutes / 60)}س {calc.overtimeMinutes % 60}د
                                                  </div>
                                                )}
                                              </>
                                            )}
                                            {shift.notes && (
                                              <div><strong>ملاحظات:</strong> {shift.notes}</div>
                                            )}
                                          </div>
                                        </TooltipContent>
                                      </Tooltip>
                                    );
                                  })
                                )}
                              </div>
                            </td>
                          );
                        })}

                        {/* Weekly Total */}
                        <td className="p-3 text-center">
                          <div className="space-y-1">
                            <div className="font-semibold text-sm">
                              {weeklyTotal.totalHours}س {weeklyTotal.totalMinutes}د
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ({weeklyTotal.decimalHours}س)
                            </div>
                            {weeklyTotal.overtimeDecimal > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                +{weeklyTotal.overtimeHours}س {weeklyTotal.overtimeMinutes}د
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Table Footer - Daily Totals */}
                <tfoot>
                  <tr className="border-t bg-muted/50 font-semibold">
                    <td className="p-4 sticky right-0 bg-muted/50 z-10">
                      إجمالي اليوم
                    </td>
                    {weekDays.map(day => {
                      const dailyTotal = getDailyTotals(day);
                      return (
                        <td key={day.toISOString()} className="p-3 text-center">
                          <div className="space-y-1 text-sm">
                            <div>{dailyTotal.totalHours}س {dailyTotal.totalMinutes}د</div>
                            <div className="text-xs text-muted-foreground">
                              {dailyTotal.shiftsCount} شفت
                            </div>
                            {dailyTotal.overtimeHours > 0 && (
                              <div className="text-xs text-orange-600">
                                +{dailyTotal.overtimeHours}س {dailyTotal.overtimeMinutes}د
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <div className="text-sm">
                        {shifts.filter(s => {
                          const shiftDate = parseISO(s.date);
                          return shiftDate >= weekDays[0] && shiftDate <= weekDays[6];
                        }).reduce((sum, shift) => {
                          const calc = calculateShiftHours(shift);
                          return sum + calc.netMinutes;
                        }, 0) / 60} ساعة
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Shift Dialog */}
        <Dialog open={isAddShiftOpen} onOpenChange={setIsAddShiftOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة شفت جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">بداية الشفت</Label>
                  <Input 
                    type="time" 
                    value={newShiftData.startTime}
                    onChange={(e) => setNewShiftData(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">نهاية الشفت</Label>
                  <Input 
                    type="time" 
                    value={newShiftData.endTime}
                    onChange={(e) => setNewShiftData(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">الاستراحة (بالدقائق)</Label>
                <Input 
                  type="number" 
                  value={newShiftData.breakMinutes}
                  onChange={(e) => setNewShiftData(prev => ({ ...prev, breakMinutes: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">نوع الشفت</Label>
                <Select 
                  value={newShiftData.type} 
                  onValueChange={(value: any) => setNewShiftData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">عادي</SelectItem>
                    <SelectItem value="ot">ساعات إضافية</SelectItem>
                    <SelectItem value="leave">إجازة</SelectItem>
                    <SelectItem value="absence">غياب</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ⚙️ Color Selector */}
              <div>
                <Label className="text-sm font-medium mb-3 block">لون الشفت (اختياري)</Label>
                <div className="grid grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewShiftData(prev => ({ ...prev, color: '' }))}
                    className={`h-8 w-8 rounded-full border-2 bg-gray-200 flex items-center justify-center ${
                      !newShiftData.color ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                    }`}
                  >
                    <span className="text-xs">×</span>
                  </button>
                  {predefinedColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewShiftData(prev => ({ ...prev, color: color.value }))}
                      className={`h-8 w-8 rounded-full border-2 ${
                        newShiftData.color === color.value 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                {newShiftData.color && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    اللون المختار: {predefinedColors.find(c => c.value === newShiftData.color)?.name}
                  </div>
                )}
              </div>
              
              <div>
                <Label className="text-sm font-medium">ملاحظات</Label>
                <Input 
                  placeholder="ملاحظات اختيارية..." 
                  value={newShiftData.notes}
                  onChange={(e) => setNewShiftData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => {
                    addShift({
                      startTime: newShiftData.startTime,
                      endTime: newShiftData.endTime,
                      breakMinutes: newShiftData.breakMinutes,
                      type: newShiftData.type,
                      notes: newShiftData.notes,
                      color: newShiftData.color || undefined
                    });
                  }}
                  className="flex-1"
                >
                  حفظ الشفت
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddShiftOpen(false);
                    setNewShiftData({
                      startTime: '08:00',
                      endTime: '17:00',
                      breakMinutes: 60,
                      type: 'normal',
                      notes: '',
                      color: ''
                    });
                  }}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default ShiftScheduleTable;