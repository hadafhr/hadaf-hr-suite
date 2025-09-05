import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const RecruitmentSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            إعدادات التوظيف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">إعدادات وتخصيصات نظام التوظيف الذكي</p>
        </CardContent>
      </Card>
    </div>
  );
};