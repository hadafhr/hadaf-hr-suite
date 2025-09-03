import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Globe, Play, Link } from 'lucide-react';

const ELearningIntegration = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const platforms = [
    {
      name: 'Zoom Learning',
      type: 'Video Conferencing',
      status: 'Connected',
      courses: 15,
      users: 120
    },
    {
      name: 'Microsoft Teams',
      type: 'Collaboration',
      status: 'Connected',
      courses: 8,
      users: 95
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{isRTL ? 'التعلم الإلكتروني' : 'E-Learning Integration'}</h2>
        <p className="text-muted-foreground">
          {isRTL ? 'التكامل مع منصات التعلم الإلكتروني' : 'Integration with e-learning platforms'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((platform, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                {platform.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="default">{platform.status}</Badge>
                <Badge variant="outline">{platform.type}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold text-primary">{platform.courses}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'دورات' : 'Courses'}</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold text-chart-2">{platform.users}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'مستخدمين' : 'Users'}</div>
                </div>
              </div>
              <Button className="w-full">
                <Link className="h-4 w-4 mr-2" />
                {isRTL ? 'الانتقال للمنصة' : 'Go to Platform'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ELearningIntegration;