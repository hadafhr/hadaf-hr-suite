import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ReportsSectionProps {
  title: string;
  description: string;
}

export const ReportsSection: React.FC<ReportsSectionProps> = ({ title, description }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const reportTypes = [
    { name: 'PDF', icon: FileText, color: 'text-red-500' },
    { name: 'Excel', icon: FileText, color: 'text-green-500' },
    { name: 'CSV', icon: FileText, color: 'text-blue-500' }
  ];

  return (
    <Card className="backdrop-blur-xl bg-black/40 border border-border">
      <CardHeader>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-2 bg-accent/20 rounded-lg border border-accent/30">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="border-border text-white hover:bg-accent/20">
            <Calendar className="h-4 w-4 mr-2" />
            {isArabic ? 'تقرير يومي' : 'Daily Report'}
          </Button>
          <Button variant="outline" className="border-border text-white hover:bg-accent/20">
            <Calendar className="h-4 w-4 mr-2" />
            {isArabic ? 'تقرير شهري' : 'Monthly Report'}
          </Button>
        </div>
        
        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            {isArabic ? 'تصدير التقرير' : 'Export Report'}
          </label>
          <div className="flex items-center space-x-2 space-x-reverse">
            {reportTypes.map((type) => (
              <Button
                key={type.name}
                variant="outline"
                size="sm"
                className="flex-1 border-border text-white hover:bg-accent/20"
              >
                <type.icon className={`h-4 w-4 mr-2 ${type.color}`} />
                {type.name}
              </Button>
            ))}
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
          <Download className="h-4 w-4 mr-2" />
          {isArabic ? 'تنزيل التقرير الكامل' : 'Download Full Report'}
        </Button>

        <div className="pt-4 border-t border-border">
          <Button variant="ghost" className="w-full text-white hover:bg-accent/20">
            <Filter className="h-4 w-4 mr-2" />
            {isArabic ? 'تخصيص التقرير' : 'Customize Report'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};