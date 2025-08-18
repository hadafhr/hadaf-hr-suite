import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export function PayrollBenefitsRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          طلبات الرواتب والمزايا
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>وحدة طلبات الرواتب والمزايا قيد التطوير...</p>
      </CardContent>
    </Card>
  );
}