import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Download, Printer, Eye, Calendar, 
  Filter, BarChart3, PieChart, TrendingUp,
  Building2, Users, Target, Mail, Share
} from 'lucide-react';

const DepartmentsReports = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('monthly');

  const reportTypes = [
    {
      id: 'overview',
      title: isRTL ? 'تقرير عام للإدارات' : 'Departments Overview Report',
      description: isRTL ? 'نظرة شاملة على جميع الإدارات والوحدات' : 'Comprehensive view of all departments and units',
      icon: BarChart3,
      color: 'from-primary to-primary-glow',
      lastUpdated: isRTL ? 'محدث قبل ساعتين' : 'Updated 2 hours ago'
    },
    {
      id: 'employees',
      title: isRTL ? 'تقرير توزيع الموظفين' : 'Employee Distribution Report',
      description: isRTL ? 'توزيع الموظفين حسب الإدارات والوحدات' : 'Employee distribution across departments and units',
      icon: Users,
      color: 'from-primary to-primary-glow',
      lastUpdated: isRTL ? 'محدث قبل 3 ساعات' : 'Updated 3 hours ago'
    },
    {
      id: 'performance',
      title: isRTL ? 'تقرير أداء الإدارات' : 'Departments Performance Report',
      description: isRTL ? 'مؤشرات الأداء والكفاءة لكل إدارة' : 'Performance and efficiency indicators for each department',
      icon: TrendingUp,
      color: 'from-muted-foreground to-muted-foreground',
      lastUpdated: isRTL ? 'محدث قبل يوم' : 'Updated 1 day ago'
    },
    {
      id: 'structure',
      title: isRTL ? 'تقرير الهيكل التنظيمي' : 'Organizational Structure Report',
      description: isRTL ? 'تفاصيل الهيكل التنظيمي والتسلسل الإداري' : 'Organizational structure and management hierarchy details',
      icon: Building2,
      color: 'from-primary to-primary-glow',
      lastUpdated: isRTL ? 'محدث قبل 5 ساعات' : 'Updated 5 hours ago'
    },
    {
      id: 'budget',
      title: isRTL ? 'تقرير الميزانيات' : 'Budget Report',
      description: isRTL ? 'ميزانيات الإدارات والمصروفات' : 'Department budgets and expenditures',
      icon: PieChart,
      color: 'from-muted-foreground to-muted-foreground',
      lastUpdated: isRTL ? 'محدث قبل 12 ساعة' : 'Updated 12 hours ago'
    },
    {
      id: 'growth',
      title: isRTL ? 'تقرير النمو والتطور' : 'Growth & Development Report',
      description: isRTL ? 'نمو الإدارات والتطوير التنظيمي' : 'Department growth and organizational development',
      icon: Target,
      color: 'from-primary to-primary-glow',
      lastUpdated: isRTL ? 'محدث قبل 6 ساعات' : 'Updated 6 hours ago'
    }
  ];

  const reportData = {
    overview: {
      totalDepartments: 12,
      activeUnits: 34,
      totalEmployees: 456,
      avgEfficiency: 94,
      departments: [
        { name: isRTL ? 'تقنية المعلومات' : 'IT Department', employees: 85, efficiency: 96, budget: 2500000 },
        { name: isRTL ? 'التسويق' : 'Marketing', employees: 78, efficiency: 91, budget: 2100000 },
        { name: isRTL ? 'المبيعات' : 'Sales', employees: 92, efficiency: 98, budget: 2800000 },
        { name: isRTL ? 'الموارد البشرية' : 'HR', employees: 65, efficiency: 89, budget: 1800000 },
        { name: isRTL ? 'المالية' : 'Finance', employees: 45, efficiency: 95, budget: 3200000 },
        { name: isRTL ? 'العمليات' : 'Operations', employees: 56, efficiency: 92, budget: 1900000 }
      ]
    }
  };

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'excel', name: 'Excel', icon: FileText },
    { id: 'word', name: 'Word', icon: FileText }
  ];

  const handleGenerateReport = (reportId) => {
    console.log('إنشاء تقرير:', reportId);
    setSelectedReport(reportId);
  };

  const handleExportReport = (format) => {
    console.log('تصدير تقرير بصيغة:', format);
  };

  const handlePrintReport = () => {
    console.log('طباعة التقرير');
    window.print();
  };

  const handleEmailReport = () => {
    console.log('إرسال التقرير بالبريد الإلكتروني');
  };

  const handleShareReport = () => {
    console.log('مشاركة التقرير');
  };

  return (
    <div className="space-y-8">
      {/* أنواع التقارير */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => (
          <Card 
            key={report.id} 
            className={`group hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/20 bg-white/95 backdrop-blur-sm overflow-hidden relative cursor-pointer animate-fade-in ${
              selectedReport === report.id ? 'ring-2 ring-primary/50 shadow-glow' : ''
            }`}
            style={{animationDelay: `${index * 0.1}s`}}
            onClick={() => handleGenerateReport(report.id)}
          >
            {/* خلفية متحركة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${report.color} shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <report.icon className="h-6 w-6 text-white" />
                </div>
                {selectedReport === report.id && (
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    {isRTL ? 'محدد' : 'Selected'}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {report.lastUpdated}
                </p>
              </div>

              {/* أزرار سريعة */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/20">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1 h-8 text-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('عرض التقرير:', report.id);
                  }}
                >
                  <Eye className="h-3 w-3 ml-1" />
                  {isRTL ? 'عرض' : 'View'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1 h-8 text-foreground hover:bg-muted/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExportReport('pdf');
                  }}
                >
                  <Download className="h-3 w-3 ml-1" />
                  {isRTL ? 'تصدير' : 'Export'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* التقرير المحدد */}
      {selectedReport && (
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center">
                  {React.createElement(reportTypes.find(r => r.id === selectedReport)?.icon || FileText, 
                    { className: "h-6 w-6 text-white" }
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {reportTypes.find(r => r.id === selectedReport)?.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {reportTypes.find(r => r.id === selectedReport)?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-border/30">
                  <Filter className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصفية' : 'Filter'}
                </Button>
                <Button variant="outline" size="sm" className="border-border/30">
                  <Calendar className="h-4 w-4 ml-2" />
                  {isRTL ? 'التاريخ' : 'Date Range'}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* ملخص التقرير */}
            {selectedReport === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <p className="text-3xl font-bold text-primary">{reportData.overview.totalDepartments}</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الإدارات' : 'Total Departments'}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <p className="text-3xl font-bold text-primary">{reportData.overview.activeUnits}</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'الوحدات النشطة' : 'Active Units'}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <p className="text-3xl font-bold text-primary">{reportData.overview.totalEmployees}</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الموظفين' : 'Total Employees'}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <p className="text-3xl font-bold text-primary">{reportData.overview.avgEfficiency}%</p>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط الكفاءة' : 'Avg Efficiency'}</p>
                  </div>
                </div>

                {/* جدول الإدارات */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-right p-4 font-semibold text-foreground">{isRTL ? 'الإدارة' : 'Department'}</th>
                        <th className="text-right p-4 font-semibold text-foreground">{isRTL ? 'الموظفين' : 'Employees'}</th>
                        <th className="text-right p-4 font-semibold text-foreground">{isRTL ? 'الكفاءة' : 'Efficiency'}</th>
                        <th className="text-right p-4 font-semibold text-foreground">{isRTL ? 'الميزانية' : 'Budget'}</th>
                        <th className="text-right p-4 font-semibold text-foreground">{isRTL ? 'الحالة' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.overview.departments.map((dept, index) => (
                        <tr key={index} className="border-b border-border/10 hover:bg-muted/10 transition-colors duration-200">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-medium text-foreground">{dept.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-foreground">{dept.employees}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-primary font-semibold">{dept.efficiency}%</span>
                              <div className="w-16 bg-muted/20 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full"
                                  style={{ width: `${dept.efficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-foreground">{dept.budget.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</td>
                          <td className="p-4">
                            <Badge className="bg-primary/10 text-primary border-primary/30">
                              {isRTL ? 'نشطة' : 'Active'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* أزرار التصدير والمشاركة */}
            <div className="flex items-center justify-between pt-6 border-t border-border/20">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{isRTL ? 'تصدير بصيغة:' : 'Export as:'}</span>
                {exportFormats.map((format) => (
                  <Button 
                    key={format.id}
                    variant="outline" 
                    size="sm" 
                    className="border-border/30 hover:border-primary/50"
                    onClick={() => handleExportReport(format.id)}
                  >
                    <format.icon className="h-4 w-4 ml-2" />
                    {format.name}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border/30 hover:border-primary/50"
                  onClick={handleEmailReport}
                >
                  <Mail className="h-4 w-4 ml-2" />
                  {isRTL ? 'إرسال بالبريد' : 'Email'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border/30 hover:border-primary/50"
                  onClick={handleShareReport}
                >
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'مشاركة' : 'Share'}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
                  onClick={handlePrintReport}
                >
                  <Printer className="h-4 w-4 ml-2" />
                  {isRTL ? 'طباعة' : 'Print'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentsReports;