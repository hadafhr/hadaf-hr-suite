import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog } from 'lucide-react';

export const AdditionalSettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cog className="w-5 h-5 text-primary" />
          <CardTitle>{isRTL ? 'إعدادات إضافية' : 'Additional Settings'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{isRTL ? 'قريباً...' : 'Coming soon...'}</p>
      </CardContent>
    </Card>
  );
};