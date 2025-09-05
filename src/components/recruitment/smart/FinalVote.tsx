import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, CheckCircle, XCircle, Clock } from 'lucide-react';

export const FinalVote = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-primary" />
            التصويت النهائي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">نظام التصويت النهائي مع الموافقات والرفض والانتظار</p>
        </CardContent>
      </Card>
    </div>
  );
};