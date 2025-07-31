import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Gift, TrendingUp, Plus, Calendar, DollarSign } from 'lucide-react';

interface Reward {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'achievement' | 'project';
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'paid';
  submittedBy: string;
  submissionDate: string;
  approvedBy?: string;
  approvalDate?: string;
  category: string;
}

export const RewardsManager: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد',
      type: 'achievement',
      amount: 2000,
      description: 'تحقيق أهداف المبيعات بنسبة 150%',
      status: 'approved',
      submittedBy: 'مدير المبيعات',
      submissionDate: '2024-01-15',
      approvedBy: 'مدير الموارد البشرية',
      approvalDate: '2024-01-18',
      category: 'مبيعات'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة علي',
      type: 'annual',
      amount: 3000,
      description: 'مكافأة سنوية لأداء ممتاز',
      status: 'pending',
      submittedBy: 'مدير الموارد البشرية',
      submissionDate: '2024-01-20',
      category: 'أداء سنوي'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'خالد سالم',
      type: 'project',
      amount: 1500,
      description: 'إنجاز مشروع تطوير النظام في الوقت المحدد',
      status: 'pending',
      submittedBy: 'مدير التقنية',
      submissionDate: '2024-01-22',
      category: 'مشاريع'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    type: '',
    amount: 0,
    description: '',
    category: ''
  });

  const rewardTypes = {
    'annual': { label: 'مكافأة سنوية', color: 'bg-blue-100 text-blue-800', range: '1000-5000' },
    'achievement': { label: 'حافز إنجاز', color: 'bg-green-100 text-green-800', range: '5%-15% من الراتب' },
    'project': { label: 'مكافأة مشروع', color: 'bg-purple-100 text-purple-800', range: 'حسب تقدير المدير' }
  };

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'paid': 'bg-blue-100 text-blue-800'
  };

  const statusLabels = {
    'pending': 'معلق',
    'approved': 'موافق عليه',
    'paid': 'تم الصرف'
  };

  const handleSubmit = () => {
    const newReward: Reward = {
      id: Date.now().toString(),
      ...formData,
      type: formData.type as 'annual' | 'achievement' | 'project',
      status: 'pending',
      submittedBy: 'المستخدم الحالي',
      submissionDate: new Date().toISOString().split('T')[0]
    };

    setRewards(prev => [...prev, newReward]);
    setIsDialogOpen(false);
    setFormData({
      employeeId: '',
      employeeName: '',
      type: '',
      amount: 0,
      description: '',
      category: ''
    });
  };

  const handleApprove = (id: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === id ? { 
        ...reward, 
        status: 'approved' as const,
        approvedBy: 'مدير الموارد البشرية',
        approvalDate: new Date().toISOString().split('T')[0]
      } : reward
    ));
  };

  const handlePay = (id: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === id ? { ...reward, status: 'paid' as const } : reward
    ));
  };

  const stats = {
    total: rewards.length,
    pending: rewards.filter(r => r.status === 'pending').length,
    approved: rewards.filter(r => r.status === 'approved').length,
    paid: rewards.filter(r => r.status === 'paid').length,
    totalAmount: rewards.filter(r => r.status === 'approved' || r.status === 'paid')
      .reduce((sum, r) => sum + r.amount, 0)
  };

  const rewardsByType = rewards.reduce((acc, reward) => {
    acc[reward.type] = (acc[reward.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المكافآت</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">معلقة</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">تم الصرف</p>
                <p className="text-2xl font-bold">{stats.paid}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبلغ</p>
                <p className="text-xl font-bold">{stats.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage">إدارة المكافآت</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">إعدادات المكافآت</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>إدارة المكافآت والحوافز</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مكافأة جديدة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>إضافة مكافأة جديدة</DialogTitle>
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
                        <Label htmlFor="type">نوع المكافأة</Label>
                        <Select value={formData.type} onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, type: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع المكافأة" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(rewardTypes).map(([key, type]) => (
                              <SelectItem key={key} value={key}>
                                {type.label} ({type.range})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="amount">المبلغ (ريال)</Label>
                          <Input
                            id="amount"
                            type="number"
                            min="0"
                            value={formData.amount}
                            onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">الفئة</Label>
                          <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            placeholder="مثل: مبيعات، مشاريع، أداء"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">الوصف/السبب</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="اكتب سبب المكافأة والإنجاز المحقق"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          إلغاء
                        </Button>
                        <Button onClick={handleSubmit} disabled={!formData.employeeName || !formData.type || !formData.amount}>
                          إضافة المكافأة
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
                    <TableHead>نوع المكافأة</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>تقدم بواسطة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell className="font-medium">{reward.employeeName}</TableCell>
                      <TableCell>
                        <Badge className={rewardTypes[reward.type as keyof typeof rewardTypes].color}>
                          {rewardTypes[reward.type as keyof typeof rewardTypes].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{reward.amount.toLocaleString()} ريال</TableCell>
                      <TableCell className="max-w-[200px] truncate">{reward.description}</TableCell>
                      <TableCell>{reward.submittedBy}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[reward.status]}>
                          {statusLabels[reward.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {reward.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(reward.id)}
                            >
                              موافقة
                            </Button>
                          )}
                          {reward.status === 'approved' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handlePay(reward.id)}
                            >
                              صرف
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(rewardTypes).map(([type, typeInfo]) => (
              <Card key={type}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">{typeInfo.label}</h3>
                  </div>
                  <p className="text-2xl font-bold">{rewardsByType[type] || 0}</p>
                  <p className="text-sm text-muted-foreground">النطاق: {typeInfo.range}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات نظام المكافآت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">نطاقات المكافآت السنوية</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الحد الأدنى</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <div>
                    <Label>الحد الأعلى</Label>
                    <Input type="number" defaultValue="5000" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">نسب حوافز الإنجاز</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>الحد الأدنى (%)</Label>
                    <Input type="number" defaultValue="5" />
                  </div>
                  <div>
                    <Label>الحد الأعلى (%)</Label>
                    <Input type="number" defaultValue="15" />
                  </div>
                </div>
              </div>

              <Button>حفظ الإعدادات</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};