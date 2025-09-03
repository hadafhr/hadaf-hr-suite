import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Star, BarChart3 } from 'lucide-react';

const AssessmentsFeedback = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{isRTL ? 'التقييمات والتقييم' : 'Assessments & Feedback'}</h2>
        <p className="text-muted-foreground">
          {isRTL ? 'تقييم فعالية التدريب وجمع التقييمات' : 'Evaluate training effectiveness and collect feedback'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              {isRTL ? 'التقييمات القبلية/البعدية' : 'Pre/Post Assessments'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'تقييم نشط' : 'Active Assessments'}</div>
            </div>
            <Button className="w-full">
              {isRTL ? 'إدارة التقييمات' : 'Manage Assessments'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              {isRTL ? 'استطلاعات الرضا' : 'Satisfaction Surveys'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-chart-2">4.2/5</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'متوسط الرضا' : 'Average Satisfaction'}</div>
            </div>
            <Button className="w-full">
              {isRTL ? 'عرض الاستطلاعات' : 'View Surveys'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {isRTL ? 'تقييم الفعالية' : 'Effectiveness Evaluation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-chart-3">87%</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'معدل الفعالية' : 'Effectiveness Rate'}</div>
            </div>
            <Button className="w-full">
              {isRTL ? 'تقرير تفصيلي' : 'Detailed Report'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentsFeedback;