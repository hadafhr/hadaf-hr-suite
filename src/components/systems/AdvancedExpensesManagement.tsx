import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Receipt, TrendingUp, DollarSign, Calendar, FileText, PlusCircle, 
  Filter, Download, Search, Eye, CreditCard, Users, Building, Settings, 
  BarChart3, Wallet, AlertTriangle, CheckCircle, XCircle, Clock, Globe, Languages
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExpenseRequestsManager } from './ExpenseRequestsManager';
import { ExpenseReportsAnalytics } from './ExpenseReportsAnalytics';
import { ExpenseTransactionsManager } from './ExpenseTransactionsManager';
import { ExpenseSettingsPolicies } from './ExpenseSettingsPolicies';

interface AdvancedExpensesManagementProps {
  onBack: () => void;
}

export const AdvancedExpensesManagement: React.FC<AdvancedExpensesManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');

  const toggleLanguage = () => {
    const newLang = isRTL ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    setIsRTL(!isRTL);
  };

  // Mock data for demonstration
  const kpiData = {
    monthlyTotal: 85420,
    yearlyTotal: 1128000,
    pendingRequests: 12,
    activeCards: 143
  };

  const recentTransactions = [
    { id: 'TXN-001', employee: 'أحمد محمد', merchant: 'فندق الرياض', amount: 612.50, status: 'pending_receipt', date: '2025-01-15' },
    { id: 'TXN-002', employee: 'فاطمة السالم', merchant: 'مطار الملك خالد', amount: 1250.00, status: 'approved', date: '2025-01-14' },
    { id: 'TXN-003', employee: 'خالد العتيبي', merchant: 'محطة وقود', amount: 180.00, status: 'receipt_uploaded', date: '2025-01-14' },
    { id: 'TXN-004', employee: 'نورا الشهري', merchant: 'مطعم الديوان', amount: 320.75, status: 'policy_check', date: '2025-01-13' }
  ];

  const expenseCards = [
    { id: 'CARD-001', employee: 'أحمد محمد السالم', balance: 2150, dailyLimit: 1000, monthlyLimit: 5000, status: 'active' },
    { id: 'CARD-002', employee: 'فاطمة عبدالله النمر', balance: 850, dailyLimit: 800, monthlyLimit: 4000, status: 'active' },
    { id: 'CARD-003', employee: 'خالد حسن العتيبي', balance: 0, dailyLimit: 1200, monthlyLimit: 6000, status: 'suspended' },
    { id: 'CARD-004', employee: 'نورا أحمد الشهري', balance: 3200, dailyLimit: 1500, monthlyLimit: 7500, status: 'active' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending_receipt': { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', text: 'بانتظار إيصال' },
      'approved': { color: 'bg-green-500/20 text-green-300 border-green-500/30', text: 'معتمد' },
      'receipt_uploaded': { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', text: 'تم رفع الإيصال' },
      'policy_check': { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', text: 'مراجعة السياسات' },
      'rejected': { color: 'bg-red-500/20 text-red-300 border-red-500/30', text: 'مرفوض' },
      'active': { color: 'bg-green-500/20 text-green-300 border-green-500/30', text: 'مفعلة' },
      'suspended': { color: 'bg-red-500/20 text-red-300 border-red-500/30', text: 'معلقة' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_receipt;
    return <Badge className={`${config.color} font-medium`}>{config.text}</Badge>;
  };

  return (
    <div className={`min-h-screen p-6 bg-background text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack} 
              className="absolute top-6 left-6"
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <Receipt className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            {isRTL ? 'المصروفات والنفقات المتطورة' : 'Advanced Expenses Management'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'نظام شامل لإدارة بطاقات المصروفات والتكامل المصرفي' : 'Comprehensive system for expense cards and banking integration'}
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleLanguage}
            >
              <Languages className="h-4 w-4 mr-2" />
              {isRTL ? 'EN' : 'العربية'}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {isRTL ? 'تصدير' : 'Export'}
            </Button>
            
            <Button 
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {isRTL ? 'طلب جديد' : 'New Request'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border border-border p-6 bg-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Main Navigation Tabs */}
          <TabsList className="grid grid-cols-6 gap-2 bg-muted/60 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-border h-auto w-full">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="requests" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'طلبات المصروفات' : 'Expense Requests'}</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="cards" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'بطاقات المصروفات' : 'Expense Cards'}</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="transactions" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <Receipt className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'المعاملات' : 'Transactions'}</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="reports" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'الإعدادات والسياسات' : 'Settings & Policies'}</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-[#009F87] to-[#008072] text-white shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">
                        {isRTL ? 'إجمالي الشهر' : 'Monthly Total'}
                      </p>
                      <p className="text-3xl font-bold">
                        ₩{kpiData.monthlyTotal.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                      <DollarSign className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">
                        {isRTL ? 'إجمالي السنة' : 'Yearly Total'}
                      </p>
                      <p className="text-3xl font-bold">
                        ₩{kpiData.yearlyTotal.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">
                        {isRTL ? 'طلبات قيد الاعتماد' : 'Pending Approvals'}
                      </p>
                      <p className="text-3xl font-bold">{kpiData.pendingRequests}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                      <Clock className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">
                        {isRTL ? 'بطاقات مفعّلة' : 'Active Cards'}
                      </p>
                      <p className="text-3xl font-bold">{kpiData.activeCards}</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                      <CreditCard className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    {isRTL ? 'الإنفاق حسب الفئة' : 'Spending by Category'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>{isRTL ? 'الرسم البياني سيتم عرضه هنا' : 'Chart will be displayed here'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    {isRTL ? 'الإنفاق حسب الأقسام' : 'Spending by Departments'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Building className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>{isRTL ? 'الرسم البياني سيتم عرضه هنا' : 'Chart will be displayed here'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  {isRTL ? 'أحدث المعاملات' : 'Recent Transactions'}
                </CardTitle>
                <Button variant="outline" size="sm">
                  {isRTL ? 'عرض الكل' : 'View All'}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                          <Receipt className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{transaction.employee}</h4>
                          <p className="text-sm text-muted-foreground">{transaction.merchant}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground text-lg">₩{transaction.amount}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expense Cards Tab */}
          <TabsContent value="cards" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'بطاقات المصروفات' : 'Expense Cards'}
              </h2>
              <div className="flex gap-3">
                <Input 
                  placeholder={isRTL ? 'البحث بالموظف أو القسم...' : 'Search by employee or department...'}
                  className="bg-background border-border text-foreground w-80"
                />
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isRTL ? 'إصدار بطاقة جديدة' : 'Issue New Card'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expenseCards.map((card) => (
                <Card key={card.id} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{card.employee}</h3>
                        {getStatusBadge(card.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الرصيد الحالي:' : 'Current Balance:'}</span>
                          <span className="font-bold text-foreground">₩{card.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الحد اليومي:' : 'Daily Limit:'}</span>
                          <span className="text-foreground">₩{card.dailyLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الحد الشهري:' : 'Monthly Limit:'}</span>
                          <span className="text-foreground">₩{card.monthlyLimit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'إعادة تعبئة' : 'Refill'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {card.status === 'active' ? (isRTL ? 'إيقاف مؤقت' : 'Suspend') : (isRTL ? 'تفعيل' : 'Activate')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <ExpenseRequestsManager isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="transactions">
            <ExpenseTransactionsManager isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="reports">
            <ExpenseReportsAnalytics isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="settings">
            <ExpenseSettingsPolicies isRTL={isRTL} />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};
