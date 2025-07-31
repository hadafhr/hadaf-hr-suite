import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TrendingUp, Users, Clock, CheckCircle, Award, Calendar } from 'lucide-react';

interface EmployeePromotion {
  id: string;
  employeeId: string;
  employeeName: string;
  currentPosition: string;
  currentLevel: string;
  proposedPosition: string;
  proposedLevel: string;
  currentSalary: number;
  proposedSalary: number;
  yearsInPosition: number;
  performanceHistory: string[];
  eligibilityStatus: 'eligible' | 'not_eligible' | 'pending_review';
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  notes: string;
}

export const PromotionManager: React.FC = () => {
  const [promotions, setPromotions] = useState<EmployeePromotion[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد',
      currentPosition: 'مطور برمجيات',
      currentLevel: 'مستوى 2',
      proposedPosition: 'مطور برمجيات أول',
      proposedLevel: 'مستوى 3',
      currentSalary: 8000,
      proposedSalary: 9500,
      yearsInPosition: 2.5,
      performanceHistory: ['ممتاز', 'جيد جداً'],
      eligibilityStatus: 'eligible',
      status: 'pending',
      submissionDate: '2024-01-15',
      notes: 'موظف متميز وحقق جميع الأهداف المطلوبة'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة علي',
      currentPosition: 'محاسبة',
      currentLevel: 'مستوى 1',
      proposedPosition: 'محاسبة أولى',
      proposedLevel: 'مستوى 2',
      currentSalary: 6500,
      proposedSalary: 7800,
      yearsInPosition: 3,
      performanceHistory: ['جيد جداً', 'ممتاز'],
      eligibilityStatus: 'eligible',
      status: 'approved',
      submissionDate: '2024-01-10',
      notes: 'استحقت الترقية بجدارة'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'خالد سالم',
      currentPosition: 'مندوب مبيعات',
      currentLevel: 'مستوى 1',
      proposedPosition: 'مندوب مبيعات أول',
      proposedLevel: 'مستوى 2',
      currentSalary: 5000,
      proposedSalary: 6200,
      yearsInPosition: 1.5,
      performanceHistory: ['جيد'],
      eligibilityStatus: 'not_eligible',
      status: 'pending',
      submissionDate: '2024-01-20',
      notes: 'يحتاج إكمال سنتين في المنصب الحالي'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<EmployeePromotion | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };

  const eligibilityColors = {
    'eligible': 'bg-green-100 text-green-800',
    'not_eligible': 'bg-red-100 text-red-800',
    'pending_review': 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    'pending': 'معلق',
    'approved': 'موافق عليه',
    'rejected': 'مرفوض'
  };

  const eligibilityLabels = {
    'eligible': 'مؤهل',
    'not_eligible': 'غير مؤهل',
    'pending_review': 'قيد المراجعة'
  };

  const handleApprove = (id: string) => {
    setPromotions(prev => prev.map(promotion => 
      promotion.id === id ? { ...promotion, status: 'approved' as const } : promotion
    ));
  };

  const handleReject = (id: string) => {
    setPromotions(prev => prev.map(promotion => 
      promotion.id === id ? { ...promotion, status: 'rejected' as const } : promotion
    ));
  };

  const checkEligibility = () => {
    setPromotions(prev => prev.map(promotion => {
      // Check if employee has been in position for at least 2 years
      // and has good performance in last 2 years
      const hasRequiredYears = promotion.yearsInPosition >= 2;
      const hasGoodPerformance = promotion.performanceHistory
        .slice(-2)
        .every(rating => ['ممتاز', 'جيد جداً'].includes(rating));
      
      const eligibilityStatus = hasRequiredYears && hasGoodPerformance ? 'eligible' : 'not_eligible';
      
      return { ...promotion, eligibilityStatus };
    }));
  };

  const filteredPromotions = promotions.filter(promotion => {
    return filterStatus === 'all' || promotion.status === filterStatus;
  });

  const stats = {
    total: filteredPromotions.length,
    pending: filteredPromotions.filter(p => p.status === 'pending').length,
    approved: filteredPromotions.filter(p => p.status === 'approved').length,
    eligible: filteredPromotions.filter(p => p.eligibilityStatus === 'eligible').length
  };

  const totalPromotionBudget = filteredPromotions
    .filter(promotion => promotion.status === 'approved')
    .reduce((sum, promotion) => sum + (promotion.proposedSalary - promotion.currentSalary), 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">ترقيات معلقة</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">ترقيات موافق عليها</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">موظفين مؤهلين</p>
                <p className="text-2xl font-bold">{stats.eligible}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>إدارة الترقيات</CardTitle>
            <div className="flex gap-2">
              <Button onClick={checkEligibility}>
                <CheckCircle className="w-4 h-4 ml-2" />
                فحص الأهلية
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="فلترة حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطلبات</SelectItem>
                <SelectItem value="pending">معلق</SelectItem>
                <SelectItem value="approved">موافق عليه</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {totalPromotionBudget > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium">إجمالي ميزانية الترقيات المعتمدة: </span>
                <span className="text-lg font-bold text-blue-700">
                  {totalPromotionBudget.toLocaleString()} ريال شهرياً
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الموظف</TableHead>
                <TableHead>المنصب الحالي</TableHead>
                <TableHead>المنصب المقترح</TableHead>
                <TableHead>الراتب الحالي</TableHead>
                <TableHead>الراتب المقترح</TableHead>
                <TableHead>سنوات الخبرة</TableHead>
                <TableHead>الأهلية</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-medium">{promotion.employeeName}</TableCell>
                  <TableCell>
                    <div>
                      <div>{promotion.currentPosition}</div>
                      <div className="text-xs text-muted-foreground">{promotion.currentLevel}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{promotion.proposedPosition}</div>
                      <div className="text-xs text-muted-foreground">{promotion.proposedLevel}</div>
                    </div>
                  </TableCell>
                  <TableCell>{promotion.currentSalary.toLocaleString()} ريال</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-green-600">
                        {promotion.proposedSalary.toLocaleString()} ريال
                      </div>
                      <div className="text-xs text-muted-foreground">
                        (+{(promotion.proposedSalary - promotion.currentSalary).toLocaleString()})
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{promotion.yearsInPosition} سنة</TableCell>
                  <TableCell>
                    <Badge className={eligibilityColors[promotion.eligibilityStatus]}>
                      {eligibilityLabels[promotion.eligibilityStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[promotion.status]}>
                      {statusLabels[promotion.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {promotion.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(promotion.id)}
                            disabled={promotion.eligibilityStatus === 'not_eligible'}
                          >
                            موافقة
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReject(promotion.id)}
                          >
                            رفض
                          </Button>
                        </>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          setSelectedPromotion(promotion);
                          setIsDialogOpen(true);
                        }}
                      >
                        تفاصيل
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Promotion Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل طلب الترقية</DialogTitle>
          </DialogHeader>
          {selectedPromotion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>اسم الموظف</Label>
                  <p className="font-medium">{selectedPromotion.employeeName}</p>
                </div>
                <div>
                  <Label>رقم الموظف</Label>
                  <p>{selectedPromotion.employeeId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>المنصب الحالي</Label>
                  <p>{selectedPromotion.currentPosition} - {selectedPromotion.currentLevel}</p>
                </div>
                <div>
                  <Label>المنصب المقترح</Label>
                  <p>{selectedPromotion.proposedPosition} - {selectedPromotion.proposedLevel}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>سنوات الخبرة في المنصب</Label>
                  <p>{selectedPromotion.yearsInPosition} سنة</p>
                </div>
                <div>
                  <Label>تاريخ التقديم</Label>
                  <p>{new Date(selectedPromotion.submissionDate).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>

              <div>
                <Label>تاريخ تقييمات الأداء</Label>
                <div className="flex gap-2 mt-2">
                  {selectedPromotion.performanceHistory.map((rating, index) => (
                    <Badge key={index} variant="outline">{rating}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>ملاحظات</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedPromotion.notes}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label>الراتب الحالي</Label>
                  <p className="text-lg font-medium">{selectedPromotion.currentSalary.toLocaleString()} ريال</p>
                </div>
                <div>
                  <Label>الراتب المقترح</Label>
                  <p className="text-lg font-medium text-green-600">
                    {selectedPromotion.proposedSalary.toLocaleString()} ريال
                  </p>
                  <p className="text-sm text-muted-foreground">
                    زيادة: {(selectedPromotion.proposedSalary - selectedPromotion.currentSalary).toLocaleString()} ريال
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};