import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const ConsolidatedReports: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle>{isRTL ? 'التقارير المجمعة' : 'Consolidated Reports'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{isRTL ? 'قريباً...' : 'Coming soon...'}</p>
      </CardContent>
    </Card>
  );
};