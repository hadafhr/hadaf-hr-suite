import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function DisciplinaryActionsManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          الإجراءات التأديبية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>وحدة الإجراءات التأديبية قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}