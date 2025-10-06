import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Receipt, TrendingUp, DollarSign, Calendar, FileText, PlusCircle, Filter, Download, Search, Eye, CreditCard, Users, Building, Settings, BarChart3, Wallet, AlertTriangle, CheckCircle, XCircle, Clock, Globe, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExpenseRequestsManager } from './ExpenseRequestsManager';
import { ExpenseReportsAnalytics } from './ExpenseReportsAnalytics';
import { ExpenseTransactionsManager } from './ExpenseTransactionsManager';
import { ExpenseSettingsPolicies } from './ExpenseSettingsPolicies';
interface AdvancedExpensesManagementProps {
  onBack: () => void;
}
export const AdvancedExpensesManagement: React.FC<AdvancedExpensesManagementProps> = ({
  onBack
}) => {
  const {
    t,
    i18n
  } = useTranslation();
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
  const recentTransactions = [{
    id: 'TXN-001',
    employee: 'أحمد محمد',
    merchant: 'فندق الرياض',
    amount: 612.50,
    status: 'pending_receipt',
    date: '2025-01-15'
  }, {
    id: 'TXN-002',
    employee: 'فاطمة السالم',
    merchant: 'مطار الملك خالد',
    amount: 1250.00,
    status: 'approved',
    date: '2025-01-14'
  }, {
    id: 'TXN-003',
    employee: 'خالد العتيبي',
    merchant: 'محطة وقود',
    amount: 180.00,
    status: 'receipt_uploaded',
    date: '2025-01-14'
  }, {
    id: 'TXN-004',
    employee: 'نورا الشهري',
    merchant: 'مطعم الديوان',
    amount: 320.75,
    status: 'policy_check',
    date: '2025-01-13'
  }];
  const expenseCards = [{
    id: 'CARD-001',
    employee: 'أحمد محمد السالم',
    balance: 2150,
    dailyLimit: 1000,
    monthlyLimit: 5000,
    status: 'active'
  }, {
    id: 'CARD-002',
    employee: 'فاطمة عبدالله النمر',
    balance: 850,
    dailyLimit: 800,
    monthlyLimit: 4000,
    status: 'active'
  }, {
    id: 'CARD-003',
    employee: 'خالد حسن العتيبي',
    balance: 0,
    dailyLimit: 1200,
    monthlyLimit: 6000,
    status: 'suspended'
  }, {
    id: 'CARD-004',
    employee: 'نورا أحمد الشهري',
    balance: 3200,
    dailyLimit: 1500,
    monthlyLimit: 7500,
    status: 'active'
  }];
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending_receipt': {
        color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        text: 'بانتظار إيصال'
      },
      'approved': {
        color: 'bg-green-500/20 text-green-300 border-green-500/30',
        text: 'معتمد'
      },
      'receipt_uploaded': {
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        text: 'تم رفع الإيصال'
      },
      'policy_check': {
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        text: 'مراجعة السياسات'
      },
      'rejected': {
        color: 'bg-red-500/20 text-red-300 border-red-500/30',
        text: 'مرفوض'
      },
      'active': {
        color: 'bg-green-500/20 text-green-300 border-green-500/30',
        text: 'مفعلة'
      },
      'suspended': {
        color: 'bg-red-500/20 text-red-300 border-red-500/30',
        text: 'معلقة'
      }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_receipt;
    return <Badge className={`${config.color} font-medium`}>{config.text}</Badge>;
  };
  return <div className={`min-h-screen bg-[#1C1C1C] text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      

      {/* Main Content */}
      <div className="p-8 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Main Navigation Tabs */}
          <TabsList className="grid grid-cols-6 gap-2 bg-gray-900/60 backdrop-blur-xl p-2 rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300 h-auto w-full">
            <TabsTrigger value="dashboard" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'لوحة التحكم' : 'Dashboard'}</span>
            </TabsTrigger>
            
            <TabsTrigger value="requests" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'طلبات المصروفات' : 'Expense Requests'}</span>
            </TabsTrigger>
            
            <TabsTrigger value="cards" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'بطاقات المصروفات' : 'Expense Cards'}</span>
            </TabsTrigger>
            
            <TabsTrigger value="transactions" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <Receipt className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'المعاملات' : 'Transactions'}</span>
            </TabsTrigger>
            
            <TabsTrigger value="reports" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</span>
            </TabsTrigger>
            
            <TabsTrigger value="settings" className="flex flex-col items-center gap-2 p-4 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl">
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">{isRTL ? 'الإعدادات والسياسات' : 'Settings & Policies'}</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        {isRTL ? 'إجمالي الشهر' : 'Monthly Total'}
                      </p>
                      <p className="text-3xl font-bold text-white">
                        ₩{kpiData.monthlyTotal.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#003366]/20 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-[#003366]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#2ECC71] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        {isRTL ? 'إجمالي السنة' : 'Yearly Total'}
                      </p>
                      <p className="text-3xl font-bold text-white">
                        ₩{kpiData.yearlyTotal.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-[#2ECC71]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#F39C12] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        {isRTL ? 'طلبات قيد الاعتماد' : 'Pending Approvals'}
                      </p>
                      <p className="text-3xl font-bold text-white">{kpiData.pendingRequests}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#F39C12]/20 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#F39C12]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">
                        {isRTL ? 'بطاقات مفعّلة' : 'Active Cards'}
                      </p>
                      <p className="text-3xl font-bold text-white">{kpiData.activeCards}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#003366]/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-[#003366]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#003366]" />
                    {isRTL ? 'الإنفاق حسب الفئة' : 'Spending by Category'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>{isRTL ? 'الرسم البياني سيتم عرضه هنا' : 'Chart will be displayed here'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#003366]" />
                    {isRTL ? 'الإنفاق حسب الأقسام' : 'Spending by Departments'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Building className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>{isRTL ? 'الرسم البياني سيتم عرضه هنا' : 'Chart will be displayed here'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-[#003366]" />
                  {isRTL ? 'أحدث المعاملات' : 'Recent Transactions'}
                </CardTitle>
                <Button variant="outline" size="sm" className="border-[#3A3A3A] text-white hover:bg-[#003366]">
                  {isRTL ? 'عرض الكل' : 'View All'}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map(transaction => <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#1C1C1C] rounded-xl border border-[#3A3A3A] hover:border-[#003366] transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#003366]/20 rounded-xl flex items-center justify-center">
                          <Receipt className="h-6 w-6 text-[#003366]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{transaction.employee}</h4>
                          <p className="text-sm text-gray-400">{transaction.merchant}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white text-lg">₩{transaction.amount}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expense Cards Tab */}
          <TabsContent value="cards" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {isRTL ? 'بطاقات المصروفات' : 'Expense Cards'}
              </h2>
              <div className="flex gap-3">
                <Input placeholder={isRTL ? 'البحث بالموظف أو القسم...' : 'Search by employee or department...'} className="bg-[#2A2A2A] border-[#3A3A3A] text-white w-80" />
                <Button className="bg-[#003366] text-white hover:bg-[#004488]">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isRTL ? 'إصدار بطاقة جديدة' : 'Issue New Card'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expenseCards.map(card => <Card key={card.id} className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{card.employee}</h3>
                        {getStatusBadge(card.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? 'الرصيد الحالي:' : 'Current Balance:'}</span>
                          <span className="font-bold text-white">₩{card.balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? 'الحد اليومي:' : 'Daily Limit:'}</span>
                          <span className="text-gray-300">₩{card.dailyLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? 'الحد الشهري:' : 'Monthly Limit:'}</span>
                          <span className="text-gray-300">₩{card.monthlyLimit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366] flex-1">
                          {isRTL ? 'إعادة تعبئة' : 'Refill'}
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#F39C12] flex-1">
                          {card.status === 'active' ? isRTL ? 'إيقاف مؤقت' : 'Suspend' : isRTL ? 'تفعيل' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
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
    </div>;
};