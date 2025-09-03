import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lightbulb, GraduationCap, TrendingUp, AlertTriangle, 
  Star, Clock, CheckCircle, XCircle, Eye, MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartRecommendations = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('training');

  const trainingRecommendations = [
    {
      id: 1,
      employee: 'أحمد محمد',
      department: 'IT',
      skillGaps: ['React', 'AWS', 'DevOps'],
      recommendedCourses: [
        { name: 'React Advanced Concepts', provider: 'Udemy', duration: '40h', priority: 'High' },
        { name: 'AWS Certified Solutions Architect', provider: 'AWS', duration: '60h', priority: 'Medium' },
        { name: 'DevOps Fundamentals', provider: 'Coursera', duration: '30h', priority: 'Low' }
      ],
      confidence: 92,
      urgency: 'High'
    },
    {
      id: 2,
      employee: 'فاطمة علي',
      department: 'Marketing',
      skillGaps: ['Digital Marketing', 'SEO', 'Analytics'],
      recommendedCourses: [
        { name: 'Digital Marketing Mastery', provider: 'Google', duration: '25h', priority: 'High' },
        { name: 'SEO Optimization', provider: 'Moz', duration: '20h', priority: 'Medium' }
      ],
      confidence: 87,
      urgency: 'Medium'
    },
    {
      id: 3,
      employee: 'محمد الأحمد',
      department: 'Sales',
      skillGaps: ['CRM Systems', 'Negotiation'],
      recommendedCourses: [
        { name: 'Advanced CRM Management', provider: 'Salesforce', duration: '35h', priority: 'High' },
        { name: 'Negotiation Skills', provider: 'Harvard Business', duration: '15h', priority: 'High' }
      ],
      confidence: 95,
      urgency: 'High'
    }
  ];

  const promotionRecommendations = [
    {
      id: 1,
      employee: 'سارة أحمد',
      currentRole: 'Senior Developer',
      recommendedRole: 'Team Lead',
      department: 'IT',
      readinessScore: 88,
      criteria: {
        performance: 95,
        leadership: 82,
        experience: 87,
        skills: 90
      },
      requirements: ['Leadership Training', 'Project Management Certification'],
      timeline: '3-6 months'
    },
    {
      id: 2,
      employee: 'عبدالله محمد',
      currentRole: 'Marketing Specialist',
      recommendedRole: 'Marketing Manager',
      department: 'Marketing',
      readinessScore: 79,
      criteria: {
        performance: 88,
        leadership: 75,
        experience: 78,
        skills: 76
      },
      requirements: ['MBA or Marketing Management Course', 'Team Leadership Experience'],
      timeline: '6-9 months'
    }
  ];

  const complianceRecommendations = [
    {
      id: 1,
      issue: 'Overdue Safety Training',
      affected: 23,
      department: 'Manufacturing',
      severity: 'High',
      action: 'Schedule mandatory safety training session',
      deadline: '2024-07-15',
      status: 'pending'
    },
    {
      id: 2,
      issue: 'Missing Performance Reviews',
      affected: 8,
      department: 'Sales',
      severity: 'Medium',
      action: 'Complete quarterly performance evaluations',
      deadline: '2024-07-20',
      status: 'in-progress'
    },
    {
      id: 3,
      issue: 'Expired Certifications',
      affected: 12,
      department: 'IT',
      severity: 'Medium',
      action: 'Renew professional certifications',
      deadline: '2024-08-01',
      status: 'pending'
    }
  ];

  const handleApproveRecommendation = (type, id) => {
    toast({
      title: isRTL ? 'تم قبول التوصية' : 'Recommendation Approved',
      description: isRTL ? 'سيتم تنفيذ التوصية قريباً' : 'The recommendation will be implemented soon'
    });
  };

  const handleRejectRecommendation = (type, id) => {
    toast({
      title: isRTL ? 'تم رفض التوصية' : 'Recommendation Rejected',
      description: isRTL ? 'تم رفض التوصية وسيتم إزالتها' : 'The recommendation has been rejected and will be removed'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            {isRTL ? 'التوصيات الذكية' : 'Smart Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="training">{isRTL ? 'توصيات التدريب' : 'Training Suggestions'}</TabsTrigger>
              <TabsTrigger value="promotion">{isRTL ? 'توصيات الترقية' : 'Promotion Recommendations'}</TabsTrigger>
              <TabsTrigger value="compliance">{isRTL ? 'الإجراءات التصحيحية' : 'Corrective Actions'}</TabsTrigger>
            </TabsList>

            <TabsContent value="training" className="mt-6">
              <div className="space-y-6">
                {trainingRecommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{rec.employee}</h3>
                          <p className="text-sm text-muted-foreground">{rec.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={rec.urgency === 'High' ? 'destructive' : 'secondary'}>
                            {rec.urgency}
                          </Badge>
                          <Badge variant="outline">
                            {rec.confidence}% {isRTL ? 'ثقة' : 'confidence'}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{isRTL ? 'فجوات المهارات:' : 'Skill Gaps:'}</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.skillGaps.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-destructive/10">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium mb-3">{isRTL ? 'الدورات الموصى بها:' : 'Recommended Courses:'}</h4>
                        <div className="space-y-3">
                          {rec.recommendedCourses.map((course, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h5 className="font-medium">{course.name}</h5>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>{course.provider}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {course.duration}
                                  </span>
                                </div>
                              </div>
                              <Badge variant={course.priority === 'High' ? 'default' : 'secondary'}>
                                {course.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveRecommendation('training', rec.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'قبول' : 'Approve'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectRecommendation('training', rec.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'رفض' : 'Reject'}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-2" />
                          {isRTL ? 'تفاصيل' : 'Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="promotion" className="mt-6">
              <div className="space-y-6">
                {promotionRecommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{rec.employee}</h3>
                          <p className="text-sm text-muted-foreground">
                            {rec.currentRole} → {rec.recommendedRole}
                          </p>
                          <p className="text-sm text-muted-foreground">{rec.department}</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{rec.readinessScore}%</div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? 'درجة الاستعداد' : 'Readiness Score'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(rec.criteria).map(([key, value]) => (
                          <div key={key} className="text-center p-3 border rounded-lg">
                            <div className="text-lg font-semibold">{value}%</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{isRTL ? 'المتطلبات:' : 'Requirements:'}</h4>
                        <div className="space-y-2">
                          {rec.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {isRTL ? 'الإطار الزمني المتوقع:' : 'Expected timeline:'} {rec.timeline}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveRecommendation('promotion', rec.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'بدء العملية' : 'Start Process'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectRecommendation('promotion', rec.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'ليس الآن' : 'Not Now'}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <div className="space-y-6">
                {complianceRecommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{rec.issue}</h3>
                          <p className="text-sm text-muted-foreground">{rec.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={rec.severity === 'High' ? 'destructive' : 'secondary'}>
                            {rec.severity}
                          </Badge>
                          <Badge variant="outline">
                            {rec.affected} {isRTL ? 'موظف متأثر' : 'affected'}
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{isRTL ? 'الإجراء الموصى به:' : 'Recommended Action:'}</h4>
                        <p className="text-sm text-muted-foreground">{rec.action}</p>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span className="text-muted-foreground">
                            {isRTL ? 'الموعد النهائي:' : 'Deadline:'}
                          </span>
                          <span className="font-medium">{rec.deadline}</span>
                          <Badge variant={rec.status === 'pending' ? 'secondary' : 'default'}>
                            {rec.status === 'pending' ? (isRTL ? 'معلق' : 'Pending') : (isRTL ? 'قيد التنفيذ' : 'In Progress')}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveRecommendation('compliance', rec.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {isRTL ? 'تنفيذ' : 'Implement'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          {isRTL ? 'تصعيد' : 'Escalate'}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-2" />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'توصيات تدريب نشطة' : 'Active training recommendations'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-chart-2/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'مرشحين للترقية' : 'Promotion candidates'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'مشاكل امتثال عالية' : 'High priority compliance issues'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartRecommendations;