import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Receipt, Search, Filter, Eye, Calendar, CreditCard, 
  MapPin, AlertTriangle, CheckCircle, XCircle, Clock, 
  FileText, Download, PlusCircle
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  employee: string;
  merchant: string;
  mcc: string;
  amount: number;
  vat: number;
  currency: string;
  receiptStatus: 'uploaded' | 'missing' | 'pending';
  policyStatus: 'approved' | 'violation' | 'review' | 'exceeds_limit';
  cardNumber: string;
  location: string;
  category: string;
}

interface ExpenseTransactionsManagerProps {
  isRTL: boolean;
}

export const ExpenseTransactionsManager: React.FC<ExpenseTransactionsManagerProps> = ({ isRTL }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Mock transactions data
  const mockTransactions: Transaction[] = [
    {
      id: 'TXN-001',
      date: '2025-01-15',
      time: '09:12:51',
      employee: 'أحمد محمد السالم',
      merchant: 'فندق الرياض المركزي',
      mcc: '7011',
      amount: 612.50,
      vat: 79.13,
      currency: 'SAR',
      receiptStatus: 'pending',
      policyStatus: 'approved',
      cardNumber: '**** 6672',
      location: 'الرياض، السعودية',
      category: 'سفر'
    },
    {
      id: 'TXN-002',
      date: '2025-01-14',
      time: '14:25:30',
      employee: 'فاطمة عبدالله النمر',
      merchant: 'مطار الملك خالد الدولي',
      mcc: '4511',
      amount: 1250.00,
      vat: 162.50,
      currency: 'SAR',
      receiptStatus: 'uploaded',
      policyStatus: 'approved',
      cardNumber: '**** 4423',
      location: 'الرياض، السعودية',
      category: 'سفر'
    },
    {
      id: 'TXN-003',
      date: '2025-01-14',
      time: '11:45:15',
      employee: 'خالد حسن العتيبي',
      merchant: 'محطة الوقود الأولى',
      mcc: '5541',
      amount: 180.00,
      vat: 23.40,
      currency: 'SAR',
      receiptStatus: 'uploaded',
      policyStatus: 'approved',
      cardNumber: '**** 8891',
      location: 'الرياض، السعودية',
      category: 'تشغيلية'
    },
    {
      id: 'TXN-004',
      date: '2025-01-13',
      time: '19:30:45',
      employee: 'نورا أحمد الشهري',
      merchant: 'مطعم الديوان الفاخر',
      mcc: '5812',
      amount: 450.75,
      vat: 58.60,
      currency: 'SAR',
      receiptStatus: 'missing',
      policyStatus: 'exceeds_limit',
      cardNumber: '**** 2334',
      location: 'الرياض، السعودية',
      category: 'ضيافة'
    },
    {
      id: 'TXN-005',
      date: '2025-01-12',
      time: '16:15:22',
      employee: 'محمد عبدالرحمن الغامدي',
      merchant: 'مركز التدريب المتقدم',
      mcc: '8299',
      amount: 2100.00,
      vat: 273.00,
      currency: 'SAR',
      receiptStatus: 'uploaded',
      policyStatus: 'approved',
      cardNumber: '**** 5567',
      location: 'جدة، السعودية',
      category: 'تدريب'
    }
  ];

  const getReceiptStatusBadge = (status: string) => {
    const statusConfig = {
      'uploaded': { color: 'bg-green-500/20 text-green-300 border-green-500/30', text: isRTL ? 'تم الرفع' : 'Uploaded', icon: CheckCircle },
      'missing': { color: 'bg-red-500/20 text-red-300 border-red-500/30', text: isRTL ? 'مفقود' : 'Missing', icon: XCircle },
      'pending': { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', text: isRTL ? 'في الانتظار' : 'Pending', icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getPolicyStatusBadge = (status: string) => {
    const statusConfig = {
      'approved': { color: 'bg-green-500/20 text-green-300 border-green-500/30', text: isRTL ? 'معتمد' : 'Approved', icon: CheckCircle },
      'violation': { color: 'bg-red-500/20 text-red-300 border-red-500/30', text: isRTL ? 'مخالفة' : 'Violation', icon: XCircle },
      'review': { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', text: isRTL ? 'مراجعة' : 'Review', icon: Eye },
      'exceeds_limit': { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', text: isRTL ? 'تجاوز حد' : 'Exceeds Limit', icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.approved;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee = filterEmployee === 'all' || transaction.employee === filterEmployee;
    const matchesStatus = filterStatus === 'all' || transaction.receiptStatus === filterStatus;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesEmployee && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {isRTL ? 'إدارة المعاملات' : 'Transaction Management'}
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? 'البحث في المعاملات...' : 'Search transactions...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border-border text-foreground pl-10 w-64"
            />
          </div>
          
          <Select value={filterEmployee} onValueChange={setFilterEmployee}>
            <SelectTrigger className="bg-card border-border text-foreground w-48">
              <SelectValue placeholder={isRTL ? 'فلترة بالموظف' : 'Filter by Employee'} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">{isRTL ? 'جميع الموظفين' : 'All Employees'}</SelectItem>
              <SelectItem value="أحمد محمد السالم">أحمد محمد السالم</SelectItem>
              <SelectItem value="فاطمة عبدالله النمر">فاطمة عبدالله النمر</SelectItem>
              <SelectItem value="خالد حسن العتيبي">خالد حسن العتيبي</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-card border-border text-foreground w-48">
              <SelectValue placeholder={isRTL ? 'فلترة بالحالة' : 'Filter by Status'} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
              <SelectItem value="uploaded">{isRTL ? 'تم رفع الإيصال' : 'Receipt Uploaded'}</SelectItem>
              <SelectItem value="missing">{isRTL ? 'إيصال مفقود' : 'Receipt Missing'}</SelectItem>
              <SelectItem value="pending">{isRTL ? 'في الانتظار' : 'Pending'}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
...
                <DialogContent className="bg-card border-border text-foreground max-w-2xl">
...
                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        {isRTL ? 'رفع/استبدال إيصال' : 'Upload/Replace Receipt'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        {isRTL ? 'عرض سجل الأحداث' : 'View Event Log'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-16">
              <Receipt className="h-16 w-16 mx-auto mb-4 opacity-30 text-gray-400" />
              <p className="text-gray-400">
                {isRTL ? 'لا توجد معاملات مطابقة للفلاتر المحددة' : 'No transactions match the selected filters'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};