import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Users, Award } from 'lucide-react';

const LearningPaths = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const learningPaths = [
    {
      id: 'LP-001',
      title: isRTL ? 'مسار تطوير القيادة' : 'Leadership Development Path',
      description: isRTL ? 'برنامج شامل لتطوير المهارات القيادية' : 'Comprehensive leadership skills development program',
      duration: '6 months',
      programs: 5,
      enrolled: 23,
      completed: 18,
      mandatory: 3,
      optional: 2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{isRTL ? 'مسارات التعلم' : 'Learning Paths'}</h2>
          <p className="text-muted-foreground">
            {isRTL ? 'مسارات التطوير المهني المنظمة' : 'Structured professional development paths'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'مسار جديد' : 'New Path'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {path.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{path.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold text-primary">{path.programs}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'برامج' : 'Programs'}</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-xl font-bold text-chart-2">{path.enrolled}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'مسجلين' : 'Enrolled'}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  {isRTL ? 'إدارة' : 'Manage'}
                </Button>
                <Button size="sm" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  {isRTL ? 'تقرير' : 'Report'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPaths;