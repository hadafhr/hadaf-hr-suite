import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MapPin, Plane, Home, Plus, CalendarIcon, DollarSign } from 'lucide-react';

interface Assignment {
  id: string;
  employeeId: string;
  employeeName: string;
  location: 'within_city' | 'outside_city' | 'outside_country';
  startDate: string;
  endDate: string;
  dailyAllowance: number;
  totalDays: number;
  totalAmount: number;
  accommodationCost?: number;
  flightCost?: number;
  status: 'active' | 'completed' | 'cancelled';
  description: string;
}

export const AssignmentAllowances: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد',
      location: 'outside_country',
      startDate: '2024-02-01',
      endDate: '2024-02-10',
      dailyAllowance: 600,
      totalDays: 10,
      totalAmount: 6000,
      accommodationCost: 2000,
      flightCost: 3000,
      status: 'active',
      description: 'حضور مؤتمر تقني في دبي'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة علي',
      location: 'outside_city',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      dailyAllowance: 300,
      totalDays: 6,
      totalAmount: 1800,
      status: 'completed',
      description: 'زيارة فرع جدة'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'خالد سالم',
      location: 'within_city',
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      dailyAllowance: 150,
      totalDays: 1,
      totalAmount: 150,
      status: 'completed',
      description: 'اجتماع في مكتب العميل'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    accommodationCost: 0,
    flightCost: 0
  });

  const locationTypes = {
    'within_city': { 
      label: 'داخل المدينة', 
      allowance: 150, 
      icon: Home,
      color: 'bg-blue-100 text-blue-800'
    },
    'outside_city': { 
      label: 'خارج المدينة', 
      allowance: 300, 
      icon: MapPin,
      color: 'bg-green-100 text-green-800'
    },
    'outside_country': { 
      label: 'خارج المملكة', 
      allowance: 600, 
      icon: Plane,
      color: 'bg-purple-100 text-purple-800'
    }
  };

  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    'active': 'نشط',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };

  const calculateTotalAmount = () => {
    if (!formData.startDate || !formData.endDate || !formData.location) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dailyAllowance = locationTypes[formData.location as keyof typeof locationTypes]?.allowance || 0;
    
    return days * dailyAllowance;
  };

  const handleSubmit = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const dailyAllowance = locationTypes[formData.location as keyof typeof locationTypes]?.allowance || 0;
    const totalAmount = totalDays * dailyAllowance;

    const newAssignment: Assignment = {
      id: Date.now().toString(),
      ...formData,
      location: formData.location as 'within_city' | 'outside_city' | 'outside_country',
      dailyAllowance,
      totalDays,
      totalAmount,
      status: 'active'
    };

    setAssignments(prev => [...prev, newAssignment]);
    setIsDialogOpen(false);
    setFormData({
      employeeId: '',
      employeeName: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      accommodationCost: 0,
      flightCost: 0
    });
  };

  const stats = {
    active: assignments.filter(a => a.status === 'active').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    totalAmount: assignments.reduce((sum, a) => sum + a.totalAmount, 0),
    totalWithExtras: assignments.reduce((sum, a) => 
      sum + a.totalAmount + (a.accommodationCost || 0) + (a.flightCost || 0), 0
    )
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">انتدابات نشطة</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">انتدابات مكتملة</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي البدلات</p>
                <p className="text-xl font-bold">{stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">الإجمالي الكامل</p>
                <p className="text-xl font-bold">{stats.totalWithExtras.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Allowance Rates */}
      <Card>
        <CardHeader>
          <CardTitle>معدلات بدل الانتداب اليومي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(locationTypes).map(([key, type]) => {
              const IconComponent = type.icon;
              return (
                <div key={key} className="flex items-center gap-3 p-4 border rounded-lg">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-medium">{type.label}</h4>
                    <p className="text-lg font-bold text-primary">{type.allowance} ريال/يوم</p>
                    {key === 'outside_country' && (
                      <p className="text-xs text-muted-foreground">+ تذاكر سفر + سكن</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة بدلات الانتداب</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة انتداب جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>إضافة انتداب جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeId">رقم الموظف</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeName">اسم الموظف</Label>
                      <Input
                        id="employeeName"
                        value={formData.employeeName}
                        onChange={(e) => setFormData(prev => ({ ...prev, employeeName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">موقع الانتداب</Label>
                    <Select value={formData.location} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, location: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر موقع الانتداب" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(locationTypes).map(([key, type]) => (
                          <SelectItem key={key} value={key}>
                            {type.label} - {type.allowance} ريال/يوم
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>تاريخ البداية</Label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>تاريخ النهاية</Label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        min={formData.startDate}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">وصف الانتداب</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="مثل: حضور مؤتمر، زيارة عميل، تدريب"
                    />
                  </div>

                  {formData.location === 'outside_country' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accommodationCost">تكلفة السكن (ريال)</Label>
                        <Input
                          id="accommodationCost"
                          type="number"
                          min="0"
                          value={formData.accommodationCost}
                          onChange={(e) => setFormData(prev => ({ ...prev, accommodationCost: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="flightCost">تكلفة الطيران (ريال)</Label>
                        <Input
                          id="flightCost"
                          type="number"
                          min="0"
                          value={formData.flightCost}
                          onChange={(e) => setFormData(prev => ({ ...prev, flightCost: parseFloat(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>
                  )}

                  {formData.startDate && formData.endDate && formData.location && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">ملخص التكاليف:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>البدل اليومي:</span>
                          <span>{calculateTotalAmount().toLocaleString()} ريال</span>
                        </div>
                        {formData.accommodationCost > 0 && (
                          <div className="flex justify-between">
                            <span>تكلفة السكن:</span>
                            <span>{formData.accommodationCost.toLocaleString()} ريال</span>
                          </div>
                        )}
                        {formData.flightCost > 0 && (
                          <div className="flex justify-between">
                            <span>تكلفة الطيران:</span>
                            <span>{formData.flightCost.toLocaleString()} ريال</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>الإجمالي:</span>
                          <span>{(calculateTotalAmount() + formData.accommodationCost + formData.flightCost).toLocaleString()} ريال</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!formData.employeeName || !formData.location || !formData.startDate || !formData.endDate}
                    >
                      إضافة الانتداب
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>الموقع</TableHead>
                <TableHead>تاريخ البداية</TableHead>
                <TableHead>تاريخ النهاية</TableHead>
                <TableHead>عدد الأيام</TableHead>
                <TableHead>البدل اليومي</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.employeeName}</TableCell>
                  <TableCell>
                    <Badge className={locationTypes[assignment.location].color}>
                      {locationTypes[assignment.location].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(assignment.startDate).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>{new Date(assignment.endDate).toLocaleDateString('ar-SA')}</TableCell>
                  <TableCell>{assignment.totalDays} يوم</TableCell>
                  <TableCell>{assignment.dailyAllowance} ريال</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.totalAmount.toLocaleString()} ريال</div>
                      {(assignment.accommodationCost || assignment.flightCost) && (
                        <div className="text-xs text-muted-foreground">
                          + {((assignment.accommodationCost || 0) + (assignment.flightCost || 0)).toLocaleString()} ريال إضافية
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[assignment.status]}>
                      {statusLabels[assignment.status]}
                    </Badge>
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