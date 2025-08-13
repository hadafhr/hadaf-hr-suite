import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  FileText,
  Download,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  Eye,
  Mail,
  Clock,
  Target,
  AlertTriangle,
  Award,
  Filter
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'individual' | 'team' | 'organization';
  category: 'performance' | 'calibration' | 'bias' | 'competency' | 'bsc' | 'kpi';
  lastGenerated: string;
  status: 'ready' | 'generating' | 'scheduled';
  frequency?: 'weekly' | 'monthly' | 'quarterly';
  recipients?: string[];
}

export const SmartReports = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dateRange, setDateRange] = useState({
    from: '2024-01-01',
    to: '2024-12-31'
  });

  // Demo reports data
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: isRTL ? 'تقرير الأداء الفردي الشامل' : 'Comprehensive Individual Performance Report',
      description: isRTL ? 'تقرير مفصل يجمع جميع أنظمة التقييم والتقييمات لموظف واحد' : 'Detailed report aggregating all appraisal systems and assessments for one employee',
      type: 'individual',
      category: 'performance',
      lastGenerated: '2024-01-15T10:30:00Z',
      status: 'ready'
    },
    {
      id: '2',
      name: isRTL ? 'تقرير فجوات الكفاءات حسب القسم' : 'Competency Gap Report by Department',
      description: isRTL ? 'تحليل فجوات الكفاءات عبر الأقسام مع توصيات التدريب' : 'Analysis of competency gaps across departments with training recommendations',
      type: 'organization',
      category: 'competency',
      lastGenerated: '2024-01-14T15:45:00Z',
      status: 'ready',
      frequency: 'monthly'
    },
    {
      id: '3',
      name: isRTL ? 'تقرير تفكيك 360 درجة' : '360-Degree Breakdown Report',
      description: isRTL ? 'تحليل مفصل لتقييمات 360 درجة حسب البعد والسلوك' : 'Detailed analysis of 360-degree evaluations by dimension and behavior',
      type: 'team',
      category: 'performance',
      lastGenerated: '2024-01-13T09:15:00Z',
      status: 'generating'
    },
    {
      id: '4',
      name: isRTL ? 'تقرير معايرة الفريق' : 'Team Calibration Report',
      description: isRTL ? 'تعديلات ما قبل وبعد المعايرة مع المبررات' : 'Pre/post calibration adjustments with justifications',
      type: 'team',
      category: 'calibration',
      lastGenerated: '2024-01-12T14:20:00Z',
      status: 'ready'
    },
    {
      id: '5',
      name: isRTL ? 'تقرير التحيز والأنماط' : 'Bias & Pattern Analysis Report',
      description: isRTL ? 'شذوذ الأنماط حسب الوحدة التنظيمية والوقت' : 'Pattern anomalies by organizational unit and time',
      type: 'organization',
      category: 'bias',
      lastGenerated: '2024-01-11T11:00:00Z',
      status: 'ready',
      frequency: 'quarterly'
    },
    {
      id: '6',
      name: isRTL ? 'تقرير توافق BSC وإنجاز KPI' : 'BSC Alignment & KPI Achievement Report',
      description: isRTL ? 'توافق بطاقة الأداء المتوازن مع تراكبات الهدف مقابل الإنجاز' : 'Balanced Scorecard alignment with target vs achievement overlays',
      type: 'organization',
      category: 'bsc',
      lastGenerated: '2024-01-10T16:30:00Z',
      status: 'ready'
    }
  ]);

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
    // Implementation for report generation
  };

  const handleDownloadReport = (reportId: string, format: 'pdf' | 'excel') => {
    console.log(`Downloading report: ${reportId} as ${format}`);
    // Implementation for report download
  };

  const handleScheduleReport = (reportId: string) => {
    console.log(`Scheduling report: ${reportId}`);
    // Implementation for report scheduling
  };

  const handleEmailReport = (reportId: string) => {
    console.log(`Emailing report: ${reportId}`);
    // Implementation for emailing report
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return { variant: 'default' as const, label: isRTL ? 'جاهز' : 'Ready', color: 'text-green-600' };
      case 'generating': return { variant: 'secondary' as const, label: isRTL ? 'قيد الإنشاء' : 'Generating', color: 'text-blue-600' };
      case 'scheduled': return { variant: 'outline' as const, label: isRTL ? 'مجدول' : 'Scheduled', color: 'text-amber-600' };
      default: return { variant: 'outline' as const, label: isRTL ? 'غير محدد' : 'Unknown', color: 'text-gray-600' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return Users;
      case 'team': return Users;
      case 'organization': return BarChart3;
      default: return FileText;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return TrendingUp;
      case 'calibration': return Target;
      case 'bias': return Eye;
      case 'competency': return Award;
      case 'bsc': return BarChart3;
      case 'kpi': return Target;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'calibration': return 'bg-green-100 text-green-800';
      case 'bias': return 'bg-red-100 text-red-800';
      case 'competency': return 'bg-purple-100 text-purple-800';
      case 'bsc': return 'bg-orange-100 text-orange-800';
      case 'kpi': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedReports = {
    individual: reports.filter(r => r.type === 'individual'),
    team: reports.filter(r => r.type === 'team'),
    organization: reports.filter(r => r.type === 'organization')
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة التقارير الذكية والتحليلات' : 'Generate and manage smart reports and analytics'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex gap-2">
            <div>
              <Label className="text-sm">{isRTL ? 'من' : 'From'}</Label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                className="w-36"
              />
            </div>
            <div>
              <Label className="text-sm">{isRTL ? 'إلى' : 'To'}</Label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                className="w-36"
              />
            </div>
          </div>
          <Button variant="outline" className="gap-2 mt-6">
            <Filter className="w-4 h-4" />
            {isRTL ? 'المرشحات' : 'Filters'}
          </Button>
        </div>
      </div>

      {/* Report Categories */}
      {Object.entries(groupedReports).map(([type, typeReports]) => (
        <div key={type} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
            {React.createElement(getTypeIcon(type), { className: "w-5 h-5 text-primary" })}
            {type === 'individual' ? (isRTL ? 'تقارير فردية' : 'Individual Reports') :
             type === 'team' ? (isRTL ? 'تقارير الفريق' : 'Team Reports') :
             isRTL ? 'تقارير المنظمة' : 'Organization Reports'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {typeReports.map((report) => {
              const statusBadge = getStatusBadge(report.status);
              const CategoryIcon = getCategoryIcon(report.category);
              
              return (
                <Card key={report.id} className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CategoryIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg leading-tight">{report.name}</CardTitle>
                          <CardDescription className="mt-1">{report.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(report.category)}>
                          {report.category === 'performance' ? (isRTL ? 'الأداء' : 'Performance') :
                           report.category === 'calibration' ? (isRTL ? 'المعايرة' : 'Calibration') :
                           report.category === 'bias' ? (isRTL ? 'التحيز' : 'Bias') :
                           report.category === 'competency' ? (isRTL ? 'الكفاءات' : 'Competency') :
                           report.category === 'bsc' ? 'BSC' :
                           report.category === 'kpi' ? 'KPI' : report.category}
                        </Badge>
                        
                        {report.frequency && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {report.frequency === 'weekly' ? (isRTL ? 'أسبوعي' : 'Weekly') :
                               report.frequency === 'monthly' ? (isRTL ? 'شهري' : 'Monthly') :
                               isRTL ? 'ربع سنوي' : 'Quarterly'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{isRTL ? 'آخر إنشاء' : 'Last generated'}: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {report.status === 'ready' ? (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleDownloadReport(report.id, 'pdf')}
                              className="gap-1"
                            >
                              <Download className="w-3 h-3" />
                              PDF
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDownloadReport(report.id, 'excel')}
                              className="gap-1"
                            >
                              <Download className="w-3 h-3" />
                              Excel
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEmailReport(report.id)}
                              className="gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              {isRTL ? 'إرسال' : 'Email'}
                            </Button>
                          </>
                        ) : report.status === 'generating' ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin">
                              <Target className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {isRTL ? 'جاري الإنشاء...' : 'Generating...'}
                            </span>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleGenerateReport(report.id)}
                            className="gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            {isRTL ? 'إنشاء' : 'Generate'}
                          </Button>
                        )}
                        
                        {!report.frequency && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleScheduleReport(report.id)}
                            className="gap-1"
                          >
                            <Calendar className="w-3 h-3" />
                            {isRTL ? 'جدولة' : 'Schedule'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quick Analytics Dashboard */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            {isRTL ? 'لوحة التحليلات السريعة' : 'Quick Analytics Dashboard'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'مؤشرات الأداء الرئيسية للتقييمات الذكية' : 'Key performance indicators for smart evaluations'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <Badge className="bg-blue-600 text-white">+12%</Badge>
              </div>
              <p className="text-sm text-blue-700 mb-1">{isRTL ? 'متوسط النتيجة الذكية' : 'Avg Smart Score'}</p>
              <p className="text-2xl font-bold text-blue-800">78.5</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <Badge className="bg-green-600 text-white">85%</Badge>
              </div>
              <p className="text-sm text-green-700 mb-1">{isRTL ? 'اكتمال التقييمات' : 'Evaluation Completion'}</p>
              <p className="text-2xl font-bold text-green-800">142/167</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <Badge className="bg-amber-600 text-white">-3</Badge>
              </div>
              <p className="text-sm text-amber-700 mb-1">{isRTL ? 'تنبيهات المخاطر' : 'Risk Alerts'}</p>
              <p className="text-2xl font-bold text-amber-800">8</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-purple-600" />
                <Badge className="bg-purple-600 text-white">+7%</Badge>
              </div>
              <p className="text-sm text-purple-700 mb-1">{isRTL ? 'أهم المواهب' : 'Top Talent'}</p>
              <p className="text-2xl font-bold text-purple-800">23</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};