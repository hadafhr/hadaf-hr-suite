import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export const ExecutiveReports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            التقارير التنفيذية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">تقارير شاملة للإدارة التنفيذية حول عملية التوظيف</p>
        </CardContent>
      </Card>
    </div>
  );
};