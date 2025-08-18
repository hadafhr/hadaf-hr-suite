import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export function AttendanceTimeTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          الحضور وتتبع الوقت
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>وحدة إدارة الحضور والوقت قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}