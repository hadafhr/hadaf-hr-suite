import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, Download, FileBarChart, PieChart, BarChart3, DollarSign, 
  Calendar, Building, Users, CreditCard, AlertCircle, CheckCircle, 
  Eye, Filter, RefreshCw, ExternalLink
} from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface ExpenseReportsAnalyticsProps {
  isRTL: boolean;
}

export const ExpenseReportsAnalytics: React.FC<ExpenseReportsAnalyticsProps> = ({ isRTL }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [reportType, setReportType] = useState('spending-trends');

  // Mock analytics data
  const analyticsData = {
    totalSpending: 2456780,
    monthlyChange: 12.5,
    complianceRate: 94.2,
    receiptsUploaded: 87.6,
    averageTransactionAmount: 524.30,
    topMerchants: [
      { name: 'فندق الرياض الدولي', amount: 156780, transactions: 45 },
      { name: 'مطار الملك خالد', amount: 98450, transactions: 78 },
      { name: 'محطات أرامكو', amount: 87320, transactions: 156 },
      { name: 'مطاعم الضيافة', amount: 65430, transactions: 89 }
    ],
    departmentSpending: [
      { department: 'المبيعات', amount: 456780, percentage: 32.1 },
      { department: 'التسويق', amount: 324560, percentage: 22.8 },
      { department: 'العمليات', amount: 287430, percentage: 20.2 },
      { department: 'الموارد البشرية', amount: 198340, percentage: 13.9 },
      { department: 'التقنية', amount: 156890, percentage: 11.0 }
    ],
    categoryBreakdown: [
      { category: 'سفر عمل', amount: 567890, percentage: 39.8 },
      { category: 'وقود ومواصلات', amount: 324560, percentage: 22.7 },
      { category: 'ضيافة وطعام', amount: 298740, percentage: 20.9 },
      { category: 'تدريب ومؤتمرات', amount: 156780, percentage: 11.0 },
      { category: 'مصروفات أخرى', amount: 78930, percentage: 5.6 }
    ]
  };

  const exportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    // Handle export functionality
  };

  const refreshData = () => {
    console.log('Refreshing analytics data...');
    // Handle data refresh
  };

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#003366]" />
            {isRTL ? 'فلاتر التقارير' : 'Report Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isRTL ? 'نوع التقرير' : 'Report Type'}
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-[#1C1C1C] border-[#3A3A3A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="spending-trends">{isRTL ? 'اتجاهات الإنفاق' : 'Spending Trends'}</SelectItem>
                  <SelectItem value="department-analysis">{isRTL ? 'تحليل الأقسام' : 'Department Analysis'}</SelectItem>
                  <SelectItem value="compliance-report">{isRTL ? 'تقرير الالتزام' : 'Compliance Report'}</SelectItem>
                  <SelectItem value="merchant-analysis">{isRTL ? 'تحليل المتاجر' : 'Merchant Analysis'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isRTL ? 'القسم' : 'Department'}
              </label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-[#1C1C1C] border-[#3A3A3A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="all">{isRTL ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
                  <SelectItem value="sales">{isRTL ? 'المبيعات' : 'Sales'}</SelectItem>
                  <SelectItem value="marketing">{isRTL ? 'التسويق' : 'Marketing'}</SelectItem>
                  <SelectItem value="operations">{isRTL ? 'العمليات' : 'Operations'}</SelectItem>
                  <SelectItem value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isRTL ? 'فئة المصروف' : 'Expense Category'}
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#1C1C1C] border-[#3A3A3A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</SelectItem>
                  <SelectItem value="travel">{isRTL ? 'سفر عمل' : 'Business Travel'}</SelectItem>
                  <SelectItem value="fuel">{isRTL ? 'وقود ومواصلات' : 'Fuel & Transport'}</SelectItem>
                  <SelectItem value="meals">{isRTL ? 'ضيافة وطعام' : 'Meals & Entertainment'}</SelectItem>
                  <SelectItem value="training">{isRTL ? 'تدريب ومؤتمرات' : 'Training & Conferences'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isRTL ? 'المشروع' : 'Project'}
              </label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="bg-[#1C1C1C] border-[#3A3A3A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="all">{isRTL ? 'جميع المشاريع' : 'All Projects'}</SelectItem>
                  <SelectItem value="project-a">{isRTL ? 'مشروع أ' : 'Project A'}</SelectItem>
                  <SelectItem value="project-b">{isRTL ? 'مشروع ب' : 'Project B'}</SelectItem>
                  <SelectItem value="project-c">{isRTL ? 'مشروع ج' : 'Project C'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isRTL ? 'الفترة الزمنية' : 'Date Range'}
              </label>
              <Input 
                type="date"
                className="bg-[#1C1C1C] border-[#3A3A3A] text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={refreshData}
                variant="outline" 
                className="border-[#3A3A3A] text-white hover:bg-[#003366] h-10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {isRTL ? 'تحديث' : 'Refresh'}
              </Button>
              
              <Button 
                onClick={() => exportReport('pdf')}
                variant="outline" 
                className="border-[#3A3A3A] text-white hover:bg-[#003366] h-10"
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              
              <Button 
                onClick={() => exportReport('excel')}
                className="bg-[#003366] text-white hover:bg-[#004488] h-10"
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{isRTL ? 'إجمالي الإنفاق' : 'Total Spending'}</p>
                <p className="text-2xl font-bold text-white">₩{analyticsData.totalSpending.toLocaleString()}</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +{analyticsData.monthlyChange}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#003366]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#2ECC71] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{isRTL ? 'معدل الالتزام' : 'Compliance Rate'}</p>
                <p className="text-2xl font-bold text-white">{analyticsData.complianceRate}%</p>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mt-1">
                  {isRTL ? 'جيد' : 'Good'}
                </Badge>
              </div>
              <CheckCircle className="h-8 w-8 text-[#2ECC71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#F39C12] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{isRTL ? 'رفع الإيصالات' : 'Receipts Uploaded'}</p>
                <p className="text-2xl font-bold text-white">{analyticsData.receiptsUploaded}%</p>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mt-1">
                  {isRTL ? 'يحتاج تحسين' : 'Needs Improvement'}
                </Badge>
              </div>
              <FileBarChart className="h-8 w-8 text-[#F39C12]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#003366] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{isRTL ? 'متوسط المعاملة' : 'Avg Transaction'}</p>
                <p className="text-2xl font-bold text-white">₩{analyticsData.averageTransactionAmount}</p>
                <p className="text-gray-400 text-sm mt-1">{isRTL ? 'لكل معاملة' : 'per transaction'}</p>
              </div>
              <CreditCard className="h-8 w-8 text-[#003366]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#E74C3C] transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{isRTL ? 'تجاوزات السياسة' : 'Policy Violations'}</p>
                <p className="text-2xl font-bold text-white">23</p>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mt-1">
                  {isRTL ? 'يتطلب انتباه' : 'Needs Attention'}
                </Badge>
              </div>
              <AlertCircle className="h-8 w-8 text-[#E74C3C]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Spending */}
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="h-5 w-5 text-[#003366]" />
              {isRTL ? 'الإنفاق حسب الأقسام' : 'Spending by Department'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.departmentSpending.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{dept.department}</span>
                    <div className="text-right">
                      <span className="text-white font-bold">₩{dept.amount.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm ml-2">{dept.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#1C1C1C] rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#003366] to-[#004488] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Merchants */}
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-[#003366]" />
              {isRTL ? 'أعلى المتاجر' : 'Top Merchants'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topMerchants.map((merchant, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1C1C1C] rounded-lg border border-[#3A3A3A]">
                  <div>
                    <h4 className="text-white font-medium">{merchant.name}</h4>
                    <p className="text-gray-400 text-sm">{merchant.transactions} {isRTL ? 'معاملة' : 'transactions'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₩{merchant.amount.toLocaleString()}</p>
                    <Badge className="bg-[#003366]/20 text-[#003366] border-[#003366]/30">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#003366]" />
            {isRTL ? 'توزيع الإنفاق حسب الفئة' : 'Spending Breakdown by Category'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.categoryBreakdown.map((category, index) => (
              <div key={index} className="bg-[#1C1C1C] p-4 rounded-xl border border-[#3A3A3A]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{category.category}</h4>
                  <Badge className="bg-[#003366]/20 text-[#003366] border-[#003366]/30">
                    {category.percentage}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-white mb-2">₩{category.amount.toLocaleString()}</p>
                <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#003366] to-[#004488] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Power BI Integration Section */}
      <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-[#003366]" />
            {isRTL ? 'تقارير Power BI المتقدمة' : 'Advanced Power BI Reports'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="border-[#3A3A3A] text-white hover:bg-[#003366] h-20 flex-col"
            >
              <FileBarChart className="h-8 w-8 mb-2" />
              {isRTL ? 'تقرير الاتجاهات الشامل' : 'Comprehensive Trends Report'}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#3A3A3A] text-white hover:bg-[#003366] h-20 flex-col"
            >
              <PieChart className="h-8 w-8 mb-2" />
              {isRTL ? 'تحليل الالتزام المتقدم' : 'Advanced Compliance Analysis'}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#3A3A3A] text-white hover:bg-[#003366] h-20 flex-col"
            >
              <BarChart3 className="h-8 w-8 mb-2" />
              {isRTL ? 'مراقبة الأداء الفوري' : 'Real-time Performance Monitor'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};