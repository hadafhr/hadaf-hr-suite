import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

export const BoardPack = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            حزمة مجلس الإدارة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">تقارير وملخصات مخصصة لمجلس الإدارة</p>
        </CardContent>
      </Card>
    </div>
  );
};