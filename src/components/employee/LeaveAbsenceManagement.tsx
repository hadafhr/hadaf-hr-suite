import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export function LeaveAbsenceManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          إدارة الإجازات والغياب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>وحدة إدارة الإجازات والغياب قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}