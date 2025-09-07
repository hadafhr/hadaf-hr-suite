import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, BarChart3, PieChart, TrendingUp, Users, Clock, DollarSign, Target, FileText, Eye, Share2, Printer, Mail, Settings } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface Report {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'scheduled';
  size: string;
  format: string[];
  permissions: string[];
  tags: string[];
}

interface ReportsProps {
  onBack: () => void;
}

const Reports = ({ onBack }: ReportsProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const reportCategories = [
    { id: 'all', name: 'جميع التقارير', count: 45 },
    { id: 'hr', name: 'الموارد البشرية', count: 12 },
    { id: 'financial', name: 'المالية والرواتب', count: 8 },
    { id: 'performance', name: 'الأداء والإنتاجية', count: 7 },
    { id: 'attendance', name: 'الحضور والغياب', count: 6 },
    { id: 'compliance', name: 'الامتثال والحوكمة', count: 5 },
    { id: 'analytics', name: 'التحليلات المتقدمة', count: 4 },
    { id: 'custom', name: 'التقارير المخصصة', count: 3 }
  ];

  const reports: Report[] = [
    {
      id: '1',
      name: 'تقرير الرواتب الشهري',
      type: 'financial',
      category: 'financial',
      description: 'تقرير شامل للرواتب والمكافآت والخصومات',
      lastGenerated: '2024-01-15',
      status: 'ready',
      size: '2.3 MB',
      format: ['PDF', 'Excel', 'CSV'],
      permissions: ['hr_manager', 'payroll_officer'],
      tags: ['شهري', 'رواتب', 'مالي']
    },
    {
      id: '2',
      name: 'تحليل الحضور والغياب',
      type: 'attendance',
      category: 'attendance',
      description: 'تحليل مفصل لبيانات الحضور والغياب والتأخير',
      lastGenerated: '2024-01-14',
      status: 'ready',
      size: '1.8 MB',
      format: ['PDF', 'Excel'],
      permissions: ['hr_manager', 'supervisor'],
      tags: ['حضور', 'تحليل', 'يومي']
    },
    {
      id: '3',
      name: 'تقرير الأداء السنوي',
      type: 'performance',
      category: 'performance',
      description: 'تقييم شامل للأداء الوظيفي والإنجازات',
      lastGenerated: '2024-01-10',
      status: 'generating',
      size: '4.1 MB',
      format: ['PDF', 'PowerPoint'],
      permissions: ['hr_manager', 'manager'],
      tags: ['أداء', 'سنوي', 'تقييم']
    }
  ];

  const recentAnalytics = [
    { title: 'معدل الحضور الشهري', value: '94.2%', change: '+2.1%', trend: 'up' },
    { title: 'مؤشر الرضا الوظيفي', value: '8.6/10', change: '+0.3', trend: 'up' },
    { title: 'معدل دوران الموظفين', value: '3.2%', change: '-0.8%', trend: 'down' },
    { title: 'إنتاجية الفريق', value: '87%', change: '+5%', trend: 'up' }
  ];

  const handleGenerateReport = async (reportId: string) => {
    setGeneratingReport(reportId);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingReport(null);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-primary/5 min-h-screen">
      <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20 animate-fade-in">
        <div className="flex items-center gap-6">
          <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
            <BarChart3 className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <BarChart3 className="h-8 w-8 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">التقارير والتحليلات المتقدمة</h1>
              <p className="text-gray-600 text-lg">نظام شامل لإنتاج وإدارة التقارير والتحليلات الذكية</p>
            </div>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#258f68] text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <FileText className="h-5 w-5 ml-2" />
          تقرير جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentAnalytics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">التقارير المتاحة</TabsTrigger>
          <TabsTrigger value="generator">منشئ التقارير</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات الذكية</TabsTrigger>
          <TabsTrigger value="scheduled">التقارير المجدولة</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex gap-4 items-center p-4 bg-card rounded-lg">
            <Input
              placeholder="البحث في التقارير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-primary">{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                      {report.status === 'ready' ? 'جاهز' : 'قيد الإنتاج'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">آخر إنتاج:</span>
                      <p className="font-medium">{report.lastGenerated}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">حجم الملف:</span>
                      <p className="font-medium">{report.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={report.status === 'generating' || generatingReport === report.id}
                      onClick={() => handleGenerateReport(report.id)}
                    >
                      {generatingReport === report.id ? 'جاري الإنتاج...' : 'إنتاج'}
                    </Button>
                    <Button size="sm" variant="outline">معاينة</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>منشئ التقارير المخصصة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>قريباً - منشئ التقارير المخصصة باستخدام الذكاء الاصطناعي</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;