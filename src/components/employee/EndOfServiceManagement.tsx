import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut } from 'lucide-react';

export function EndOfServiceManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogOut className="h-5 w-5" />
          إدارة نهاية الخدمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>وحدة إدارة نهاية الخدمة قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}