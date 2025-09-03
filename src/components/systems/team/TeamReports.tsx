import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Download, Printer, Building, Clock, 
  TrendingUp, BarChart3, Eye, Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeamReports = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const departmentData = [
    { name: isRTL ? 'تقنية المعلومات' : 'IT', employees: 45 },
    { name: isRTL ? 'الموارد البشرية' : 'HR', employees: 28 },
    { name: isRTL ? 'المالية' : 'Finance', employees: 32 },
    { name: isRTL ? 'التسويق' : 'Marketing', employees: 38 },
    { name: isRTL ? 'المبيعات' : 'Sales', employees: 52 }
  ];

  const reportTypes = [
    {
      title: isRTL ? 'تقرير التوزيع الوظيفي' : 'Job Distribution Report',
      description: isRTL ? 'توزيع الموظفين حسب الأقسام والمناصب' : 'Employee distribution by departments and positions',
      icon: Building,
      lastGenerated: '2024-06-01'
    },
    {
      title: isRTL ? 'تقرير فترة التجربة' : 'Trial Period Report',
      description: isRTL ? 'قائمة الموظفين تحت التجربة وحالتهم' : 'List of employees on trial period and their status',
      icon: Clock,
      lastGenerated: '2024-06-01'
    },
    {
      title: isRTL ? 'تقرير الدوران الوظيفي' : 'Employee Turnover Report',
      description: isRTL ? 'إحصائيات الانضمام والمغادرة للموظفين' : 'Statistics on employee joining and leaving',
      icon: TrendingUp,
      lastGenerated: '2024-06-01'
    },
    {
      title: isRTL ? 'تقرير الأداء الشامل' : 'Comprehensive Performance Report',
      description: isRTL ? 'تحليل شامل لأداء الموظفين والفرق' : 'Comprehensive analysis of employee and team performance',
      icon: Award,
      lastGenerated: '2024-06-01'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRTL ? 'تقارير الفريق' : 'Team Reports'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isRTL ? 'تقارير شاملة قابلة للطباعة والتصدير عن حالة الفريق والأداء' : 'Comprehensive printable and exportable reports on team status and performance'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            {isRTL ? 'طباعة' : 'Print'}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير PDF' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Department Distribution Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {isRTL ? 'توزيع الموظفين حسب الأقسام' : 'Employee Distribution by Department'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Report Generation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <report.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs">PDF</Badge>
                    <p className="text-xs text-gray-500">
                      {isRTL ? 'آخر إنشاء:' : 'Last generated:'} {report.lastGenerated}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamReports;