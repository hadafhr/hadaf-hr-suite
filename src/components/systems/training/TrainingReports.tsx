import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';

const TrainingReports = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const reports = [
    {
      title: isRTL ? 'تقرير التكاليف الشامل' : 'Comprehensive Cost Report',
      description: isRTL ? 'تكاليف التدريب حسب الموظف والقسم' : 'Training costs per employee and department',
      type: 'cost'
    },
    {
      title: isRTL ? 'تقرير معدلات الإتمام' : 'Completion Rates Report',
      description: isRTL ? 'معدلات الإتمام مقابل التسرب' : 'Completion vs dropout rates',
      type: 'completion'
    },
    {
      title: isRTL ? 'تقرير تطوير المهارات' : 'Skills Development Report',
      description: isRTL ? 'تتبع تحسن المهارات بعد التدريب' : 'Skills improvement tracking post-training',
      type: 'skills'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{isRTL ? 'التقارير' : 'Reports'}</h2>
        <p className="text-muted-foreground">
          {isRTL ? 'تقارير تفصيلية عن أداء التدريب' : 'Detailed training performance reports'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'PDF' : 'PDF'}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'Excel' : 'Excel'}
                </Button>
                <Button size="sm" variant="outline">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainingReports;