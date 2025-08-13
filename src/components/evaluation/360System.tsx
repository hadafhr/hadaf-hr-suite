import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Send, 
  Eye, 
  BarChart3, 
  Clock, 
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

export const System360 = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('setup');
  const { toast } = useToast();

  // Add handlers for all interactive elements
  const handleSendInvitations = () => {
    toast({
      title: isRTL ? 'إرسال الدعوات' : 'Send Invitations',
      description: isRTL ? 'تم إرسال دعوات التقييم لجميع المشاركين' : 'Evaluation invitations sent to all participants'
    });
  };

  const handlePrivacySettings = () => {
    toast({
      title: isRTL ? 'إعدادات الخصوصية' : 'Privacy Settings',
      description: isRTL ? 'جاري فتح إعدادات الخصوصية والأمان' : 'Opening privacy and security settings'
    });
  };

  const handleAddRater = () => {
    toast({
      title: isRTL ? 'إضافة مقيّم' : 'Add Rater',
      description: isRTL ? 'جاري فتح نموذج إضافة مقيّم جديد' : 'Opening add new rater form'
    });
  };

  const handleSendReminders = () => {
    toast({
      title: isRTL ? 'إرسال تذكيرات' : 'Send Reminders',
      description: isRTL ? 'تم إرسال تذكيرات للمقيّمين المتأخرين' : 'Reminders sent to pending raters'
    });
  };

  const handleContactParticipant = (participantName: string) => {
    toast({
      title: isRTL ? 'التواصل مع المشارك' : 'Contact Participant',
      description: isRTL ? `فتح محادثة مع ${participantName}` : `Opening chat with ${participantName}`
    });
  };

  const handleEditCompetency = (competencyName: string) => {
    toast({
      title: isRTL ? 'تعديل الكفاءة' : 'Edit Competency',
      description: isRTL ? `تعديل ${competencyName}` : `Editing ${competencyName}`
    });
  };

  // Default data for 360 evaluation
  const raterGroups = [
    {
      id: 'manager',
      name: isRTL ? 'المدير المباشر' : 'Direct Manager',
      weight: 40,
      count: 1,
      status: 'completed',
      color: 'bg-primary'
    },
    {
      id: 'peers',
      name: isRTL ? 'الزملاء' : 'Peers',
      weight: 25,
      count: 4,
      status: 'pending',
      color: 'bg-secondary'
    },
    {
      id: 'direct_reports',
      name: isRTL ? 'المرؤوسون' : 'Direct Reports',
      weight: 25,
      count: 3,
      status: 'in_progress',
      color: 'bg-accent'
    },
    {
      id: 'clients',
      name: isRTL ? 'العملاء' : 'Internal/External Clients',
      weight: 10,
      count: 2,
      status: 'pending',
      color: 'bg-muted'
    }
  ];

  const competencyAreas = [
    {
      id: 'leadership',
      name: isRTL ? 'القيادة والتوجيه' : 'Leadership & Direction',
      weight: 25,
      behaviors: [
        isRTL ? 'يُلهم الآخرين ويحفزهم' : 'Inspires and motivates others',
        isRTL ? 'يتخذ قرارات مدروسة' : 'Makes thoughtful decisions',
        isRTL ? 'يقود بالقدوة' : 'Leads by example'
      ]
    },
    {
      id: 'communication',
      name: isRTL ? 'التواصل والتأثير' : 'Communication & Influence',
      weight: 20,
      behaviors: [
        isRTL ? 'يتواصل بوضوح وفعالية' : 'Communicates clearly and effectively',
        isRTL ? 'يستمع بإنصات للآخرين' : 'Listens actively to others',
        isRTL ? 'يؤثر إيجابياً في الفريق' : 'Positively influences the team'
      ]
    },
    {
      id: 'collaboration',
      name: isRTL ? 'التعاون والعمل الجماعي' : 'Collaboration & Teamwork',
      weight: 20,
      behaviors: [
        isRTL ? 'يتعاون بشكل بناء' : 'Collaborates constructively',
        isRTL ? 'يدعم أهداف الفريق' : 'Supports team goals',
        isRTL ? 'يحل النزاعات بحكمة' : 'Resolves conflicts wisely'
      ]
    },
    {
      id: 'problem_solving',
      name: isRTL ? 'حل المشاكل والابتكار' : 'Problem Solving & Innovation',
      weight: 20,
      behaviors: [
        isRTL ? 'يحلل المشاكل بعمق' : 'Analyzes problems deeply',
        isRTL ? 'يقترح حلولاً مبتكرة' : 'Proposes innovative solutions',
        isRTL ? 'يتكيف مع التغيير' : 'Adapts to change'
      ]
    },
    {
      id: 'execution',
      name: isRTL ? 'التنفيذ والنتائج' : 'Execution & Results',
      weight: 15,
      behaviors: [
        isRTL ? 'ينجز المهام في الوقت المحدد' : 'Completes tasks on time',
        isRTL ? 'يحقق أهداف الجودة' : 'Achieves quality objectives',
        isRTL ? 'يتحمل المسؤولية' : 'Takes accountability'
      ]
    }
  ];

  const participants = [
    {
      id: '1',
      name: isRTL ? 'أحمد محمد السعيد' : 'Ahmed Mohammed Al-Saeed',
      role: isRTL ? 'مدير التسويق' : 'Marketing Manager',
      group: 'manager',
      email: 'ahmed.saeed@company.com',
      phone: '+966 50 123 4567',
      status: 'completed',
      submittedAt: '2024-01-15'
    },
    {
      id: '2',
      name: isRTL ? 'فاطمة علي الزهراني' : 'Fatima Ali Al-Zahrani',
      role: isRTL ? 'محلل تسويق أول' : 'Senior Marketing Analyst',
      group: 'peers',
      email: 'fatima.zahrani@company.com',
      phone: '+966 55 234 5678',
      status: 'pending',
      invitedAt: '2024-01-10'
    },
    {
      id: '3',
      name: isRTL ? 'محمد عبدالله القحطاني' : 'Mohammed Abdullah Al-Qahtani',
      role: isRTL ? 'متخصص تسويق رقمي' : 'Digital Marketing Specialist',
      group: 'direct_reports',
      email: 'mohammed.qahtani@company.com',
      phone: '+966 56 345 6789',
      status: 'in_progress',
      startedAt: '2024-01-12'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/20 text-success border-success/30">{isRTL ? 'مكتمل' : 'Completed'}</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning/20 text-warning border-warning/30">{isRTL ? 'جاري' : 'In Progress'}</Badge>;
      case 'pending':
        return <Badge variant="outline">{isRTL ? 'معلق' : 'Pending'}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            {isRTL ? 'نظام التقييم 360 درجة' : '360-Degree Feedback System'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isRTL ? 'تقييم شامل من جميع الأطراف المعنية' : 'Comprehensive evaluation from all stakeholders'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={handlePrivacySettings}>
            <Shield className="w-4 h-4" />
            {isRTL ? 'إعدادات الخصوصية' : 'Privacy Settings'}
          </Button>
          <Button className="gap-2" onClick={handleSendInvitations}>
            <Send className="w-4 h-4" />
            {isRTL ? 'إرسال دعوات' : 'Send Invitations'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30 p-1 rounded-xl">
          <TabsTrigger value="setup" className="rounded-lg">
            {isRTL ? 'الإعداد' : 'Setup'}
          </TabsTrigger>
          <TabsTrigger value="raters" className="rounded-lg">
            {isRTL ? 'المقيّمون' : 'Raters'}
          </TabsTrigger>
          <TabsTrigger value="competencies" className="rounded-lg">
            {isRTL ? 'الكفاءات' : 'Competencies'}
          </TabsTrigger>
          <TabsTrigger value="progress" className="rounded-lg">
            {isRTL ? 'التقدم' : 'Progress'}
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-lg">
            {isRTL ? 'النتائج' : 'Results'}
          </TabsTrigger>
        </TabsList>

        {/* Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {isRTL ? 'إعداد مجموعات المقيّمين' : 'Rater Groups Configuration'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تحديد الأوزان النسبية لكل مجموعة من المقيّمين' : 'Set relative weights for each rater group'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {raterGroups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded ${group.color}`} />
                      <div>
                        <h4 className="font-medium text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? `${group.count} مقيّم` : `${group.count} raters`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-lg">{group.weight}%</div>
                        <div className="text-xs text-muted-foreground">
                          {isRTL ? 'الوزن' : 'Weight'}
                        </div>
                      </div>
                      {getStatusBadge(group.status)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">
                    {isRTL ? 'إعدادات الخصوصية' : 'Privacy Settings'}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {isRTL ? 'إخفاء هوية الزملاء (مفعّل)' : 'Peer anonymity (Enabled)'}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {isRTL ? 'تشفير البيانات (مفعّل)' : 'Data encryption (Enabled)'}
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    {isRTL ? 'التذكيرات التلقائية (أسبوعية)' : 'Auto reminders (Weekly)'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Raters Tab */}
        <TabsContent value="raters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                {isRTL ? 'إدارة المقيّمين' : 'Manage Raters'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'دعوة وإدارة المقيّمين من جميع المجموعات' : 'Invite and manage raters from all groups'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <Button className="gap-2" onClick={handleAddRater}>
                    <UserPlus className="w-4 h-4" />
                    {isRTL ? 'إضافة مقيّم' : 'Add Rater'}
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleSendReminders}>
                    <Send className="w-4 h-4" />
                    {isRTL ? 'إرسال تذكيرات' : 'Send Reminders'}
                  </Button>
                </div>
                <Badge variant="outline" className="text-sm">
                  {isRTL ? `${participants.length} مقيّم` : `${participants.length} raters`}
                </Badge>
              </div>

              <div className="space-y-4">
                {participants.map((participant) => (
                  <Card key={participant.id} className="border-l-4 border-l-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{participant.name}</h4>
                            <p className="text-sm text-muted-foreground">{participant.role}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {participant.email}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {participant.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(participant.status)}
                          <Button size="sm" variant="outline" className="gap-2" onClick={() => handleContactParticipant(participant.name)}>
                            <MessageSquare className="w-4 h-4" />
                            {isRTL ? 'تواصل' : 'Contact'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competencies Tab */}
        <TabsContent value="competencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {isRTL ? 'مجالات الكفاءة' : 'Competency Areas'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تحديد مجالات الكفاءة والسلوكيات المطلوب تقييمها' : 'Define competency areas and behaviors to be evaluated'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competencyAreas.map((area) => (
                  <Card key={area.id} className="border border-border hover:shadow-soft transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{area.name}</h4>
                          <div className="mt-2 text-sm text-primary font-medium">
                            {isRTL ? `الوزن: ${area.weight}%` : `Weight: ${area.weight}%`}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleEditCompetency(area.name)}>
                          {isRTL ? 'تعديل' : 'Edit'}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {isRTL ? 'السلوكيات المطلوب تقييمها:' : 'Behaviors to evaluate:'}
                        </p>
                        <ul className="space-y-1">
                          {area.behaviors.map((behavior, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {behavior}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {isRTL ? 'حالة التقدم' : 'Progress Status'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'معدل الإنجاز العام' : 'Overall Completion'}
                    </span>
                    <span className="font-semibold">67%</span>
                  </div>
                  <Progress value={67} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'الردود المكتملة' : 'Completed Responses'}
                    </span>
                    <span className="font-semibold">2/3</span>
                  </div>
                  <Progress value={67} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'المتبقي' : 'Remaining'}
                    </span>
                    <span className="font-semibold text-warning">5 {isRTL ? 'أيام' : 'days'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {isRTL ? 'تفاصيل المجموعات' : 'Group Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {raterGroups.map((group) => (
                    <div key={group.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${group.color}`} />
                        <span className="text-sm font-medium">{group.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          1/{group.count}
                        </span>
                        {getStatusBadge(group.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {isRTL ? 'نتائج التقييم' : 'Evaluation Results'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'ملخص النتائج والتقييمات من جميع المجموعات' : 'Summary of results and ratings from all groups'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isRTL ? 'النتائج غير متاحة بعد' : 'Results Not Available Yet'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL 
                    ? 'يجب إكمال جميع التقييمات لعرض النتائج النهائية'
                    : 'All evaluations must be completed to view final results'
                  }
                </p>
                <Button className="mt-4 gap-2">
                  <Send className="w-4 h-4" />
                  {isRTL ? 'إرسال تذكيرات' : 'Send Reminders'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};