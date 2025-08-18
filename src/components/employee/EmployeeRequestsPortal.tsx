import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function EmployeeRequestsPortal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          بوابة طلبات الموظفين
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>بوابة طلبات الموظفين قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}