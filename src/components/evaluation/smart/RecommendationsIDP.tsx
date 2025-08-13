import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { 
  Target,
  BookOpen,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  UserPlus,
  FileText,
  Brain,
  TrendingUp,
  Award,
  MessageSquare
} from 'lucide-react';

interface IDPAction {
  id: string;
  title: string;
  description: string;
  competency: string;
  type: 'learning' | 'project' | 'mentoring' | 'coaching';
  priority: 'high' | 'medium' | 'low';
  duration: string;
  deadline: string;
  status: 'planned' | 'in_progress' | 'completed';
  progress: number;
  learningPath?: string;
}

interface EmployeeIDP {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  currentScore: number;
  targetScore: number;
  generatedAt: string;
  period: string;
  actions: IDPAction[];
  behavioralTips: string[];
  status: 'draft' | 'active' | 'completed';
}

export const RecommendationsIDP = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedEmployee, setSelectedEmployee] = useState<string>('1');
  const [selectedIDP, setSelectedIDP] = useState<EmployeeIDP | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Demo employees for IDP generation
  const employees = [
    { id: '1', name: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed', position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer', score: 78 },
    { id: '2', name: isRTL ? 'فاطمة علي' : 'Fatima Ali', position: isRTL ? 'مديرة المشاريع' : 'Project Manager', score: 72 },
    { id: '3', name: isRTL ? 'خالد سالم' : 'Khalid Salem', position: isRTL ? 'أخصائي مبيعات' : 'Sales Specialist', score: 65 },
  ];

  // Demo IDP data
  const [idps, setIdps] = useState<EmployeeIDP[]>([
    {
      id: '1',
      employeeId: '1',
      employeeName: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
      currentScore: 78,
      targetScore: 85,
      generatedAt: '2024-01-15',
      period: '90 days',
      status: 'active',
      actions: [
        {
          id: '1',
          title: isRTL ? 'تطوير مهارات القيادة' : 'Leadership Skills Development',
          description: isRTL ? 'إكمال برنامج أساسيات القيادة' : 'Complete Leadership Fundamentals program',
          competency: 'Leadership',
          type: 'learning',
          priority: 'high',
          duration: '6 weeks',
          deadline: '2024-03-01',
          status: 'in_progress',
          progress: 35,
          learningPath: 'Leadership Development Track'
        },
        {
          id: '2',
          title: isRTL ? 'مشروع إرشاد زميل جديد' : 'Mentor New Team Member',
          description: isRTL ? 'إرشاد مطور مبتدئ لمدة 3 أشهر' : 'Mentor junior developer for 3 months',
          competency: 'Mentoring',
          type: 'mentoring',
          priority: 'medium',
          duration: '12 weeks',
          deadline: '2024-04-15',
          status: 'planned',
          progress: 0
        },
        {
          id: '3',
          title: isRTL ? 'تحسين مهارات التواصل' : 'Communication Enhancement',
          description: isRTL ? 'حضور ورش التواصل الفعال' : 'Attend effective communication workshops',
          competency: 'Communication',
          type: 'learning',
          priority: 'high',
          duration: '4 weeks',
          deadline: '2024-02-28',
          status: 'planned',
          progress: 0,
          learningPath: 'Communication Skills Track'
        }
      ],
      behavioralTips: [
        isRTL ? 'استخدم أسلوب تواصل مباشر ومنظم (DISC: D)' : 'Use direct and structured communication style (DISC: D)',
        isRTL ? 'ركز على النتائج والإنجازات (Birkman: Results-oriented)' : 'Focus on results and achievements (Birkman: Results-oriented)',
        isRTL ? 'طور مهارات الاستماع النشط' : 'Develop active listening skills'
      ]
    }
  ]);

  const handleGenerateIDP = async () => {
    if (!selectedEmployee) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const employee = employees.find(emp => emp.id === selectedEmployee);
      if (!employee) return;

      const newIDP: EmployeeIDP = {
        id: Date.now().toString(),
        employeeId: selectedEmployee,
        employeeName: employee.name,
        position: employee.position,
        currentScore: employee.score,
        targetScore: employee.score + 10,
        generatedAt: new Date().toISOString().split('T')[0],
        period: '90 days',
        status: 'draft',
        actions: [
          {
            id: '1',
            title: isRTL ? 'تطوير الكفاءة الأساسية' : 'Core Competency Development',
            description: isRTL ? 'تحسين المهارات الأساسية المطلوبة للدور' : 'Improve core skills required for role',
            competency: 'Technical Skills',
            type: 'learning',
            priority: 'high',
            duration: '8 weeks',
            deadline: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'planned',
            progress: 0,
            learningPath: 'Technical Excellence Track'
          }
        ],
        behavioralTips: [
          isRTL ? 'تطبيق نصائح تطوير شخصية مخصصة' : 'Apply personalized development tips'
        ]
      };

      setIdps(prev => [newIDP, ...prev]);
      setSelectedIDP(newIDP);
      setIsGenerating(false);
    }, 2000);
  };

  const handleAssignLearning = (actionId: string) => {
    toast({
      title: isRTL ? "تم تعيين المسار التعليمي" : "Learning Path Assigned",
      description: isRTL ? "تم ربط الإجراء بالمسار التعليمي المناسب" : "Action linked to appropriate learning path",
    });
  };

  const handleNotifyEmployee = (idpId: string) => {
    const idp = idps.find(i => i.id === idpId);
    toast({
      title: isRTL ? "تم إرسال الإشعار" : "Notification Sent",
      description: isRTL ? `تم إشعار ${idp?.employeeName} بخطة التطوير` : `${idp?.employeeName} notified about development plan`,
    });
  };

  const handleMarkCompleted = (idpId: string, actionId: string) => {
    setIdps(prev => prev.map(idp => 
      idp.id === idpId 
        ? {
            ...idp,
            actions: idp.actions.map(action =>
              action.id === actionId
                ? { ...action, status: 'completed' as const, progress: 100 }
                : action
            )
          }
        : idp
    ));
    
    toast({
      title: isRTL ? "تم إكمال الإجراء" : "Action Completed",
      description: isRTL ? "تم تحديث حالة الإجراء إلى مكتمل" : "Action status updated to completed",
    });
  };

  const handleExportIDP = (idpId: string) => {
    const idp = idps.find(i => i.id === idpId);
    toast({
      title: isRTL ? "تصدير خطة التطوير" : "Exporting IDP",
      description: isRTL ? `جاري تحضير ملف PDF لخطة ${idp?.employeeName}` : `Preparing PDF for ${idp?.employeeName}'s plan`,
    });
    
    setTimeout(() => {
      toast({
        title: isRTL ? "تم التصدير بنجاح" : "Export Successful",
        description: isRTL ? "تم تحميل ملف خطة التطوير" : "Development plan file downloaded",
      });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return { variant: 'default' as const, label: isRTL ? 'مكتمل' : 'Completed', color: 'text-green-600' };
      case 'in_progress': return { variant: 'secondary' as const, label: isRTL ? 'قيد التنفيذ' : 'In Progress', color: 'text-blue-600' };
      case 'planned': return { variant: 'outline' as const, label: isRTL ? 'مخطط' : 'Planned', color: 'text-amber-600' };
      case 'active': return { variant: 'default' as const, label: isRTL ? 'نشط' : 'Active', color: 'text-green-600' };
      case 'draft': return { variant: 'secondary' as const, label: isRTL ? 'مسودة' : 'Draft', color: 'text-gray-600' };
      default: return { variant: 'outline' as const, label: isRTL ? 'غير محدد' : 'Unknown', color: 'text-gray-600' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'learning': return BookOpen;
      case 'project': return Target;
      case 'mentoring': return Users;
      case 'coaching': return MessageSquare;
      default: return Target;
    }
  };

  const currentEmployeeIDPs = idps.filter(idp => idp.employeeId === selectedEmployee);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'التوصيات وخطط التطوير الفردية' : 'Recommendations & Individual Development Plans'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إنشاء وإدارة خطط التطوير الفردية المدعومة بالذكاء الاصطناعي' : 'Generate and manage AI-powered individual development plans'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={selectedEmployee} 
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="">{isRTL ? 'اختر موظف' : 'Select Employee'}</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.position}
              </option>
            ))}
          </select>
          <Button 
            onClick={handleGenerateIDP} 
            disabled={!selectedEmployee || isGenerating}
            className="gap-2"
          >
            <Brain className="w-4 h-4" />
            {isGenerating ? (isRTL ? 'جاري الإنشاء...' : 'Generating...') : (isRTL ? 'إنشاء خطة تطوير' : 'Generate IDP')}
          </Button>
        </div>
      </div>

      {/* IDP Generation Progress */}
      {isGenerating && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="animate-spin">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  {isRTL ? 'إنشاء خطة التطوير الفردية...' : 'Generating Individual Development Plan...'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isRTL ? 'تحليل البيانات وإنشاء توصيات مخصصة' : 'Analyzing data and creating personalized recommendations'}
                </p>
                <Progress value={65} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Employee IDPs */}
      {currentEmployeeIDPs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {isRTL ? 'خطط التطوير الحالية' : 'Current Development Plans'}
          </h3>
          
          {currentEmployeeIDPs.map((idp) => (
            <Card key={idp.id} className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      {idp.employeeName} - {isRTL ? 'خطة التطوير' : 'Development Plan'}
                    </CardTitle>
                    <CardDescription>
                      {isRTL ? `${idp.period} | النتيجة الحالية: ${idp.currentScore} | الهدف: ${idp.targetScore}` : 
                               `${idp.period} | Current Score: ${idp.currentScore} | Target: ${idp.targetScore}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadge(idp.status).variant}>
                      {getStatusBadge(idp.status).label}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedIDP(selectedIDP?.id === idp.id ? null : idp)}
                    >
                      {selectedIDP?.id === idp.id ? (isRTL ? 'إخفاء' : 'Hide') : (isRTL ? 'عرض التفاصيل' : 'View Details')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {selectedIDP?.id === idp.id && (
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'التقدم الإجمالي' : 'Overall Progress'}</p>
                            <div className="text-2xl font-bold text-primary mb-2">
                              {Math.round(idp.actions.reduce((sum, action) => sum + action.progress, 0) / idp.actions.length)}%
                            </div>
                            <Progress 
                              value={idp.actions.reduce((sum, action) => sum + action.progress, 0) / idp.actions.length} 
                              className="w-full" 
                            />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'الإجراءات المكتملة' : 'Completed Actions'}</p>
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {idp.actions.filter(a => a.status === 'completed').length}/{idp.actions.length}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-muted-foreground">{isRTL ? 'مكتمل' : 'Completed'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'الأولوية العالية' : 'High Priority'}</p>
                            <div className="text-2xl font-bold text-red-600 mb-2">
                              {idp.actions.filter(a => a.priority === 'high').length}
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-muted-foreground">{isRTL ? 'عاجل' : 'Urgent'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Development Actions */}
                    <div>
                      <h4 className="font-semibold mb-4">{isRTL ? 'إجراءات التطوير' : 'Development Actions'}</h4>
                      <div className="space-y-3">
                        {idp.actions.map((action) => {
                          const TypeIcon = getTypeIcon(action.type);
                          const statusBadge = getStatusBadge(action.status);
                          
                          return (
                            <Card key={action.id} className="bg-muted/30">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <TypeIcon className="w-5 h-5 text-primary" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h5 className="font-medium text-foreground">{action.title}</h5>
                                        <p className="text-sm text-muted-foreground">{action.description}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge className={getPriorityColor(action.priority)}>
                                          {action.priority === 'high' ? (isRTL ? 'عالي' : 'High') :
                                           action.priority === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
                                           isRTL ? 'منخفض' : 'Low'}
                                        </Badge>
                                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                      <div>
                                        <span className="text-xs text-muted-foreground">{isRTL ? 'الكفاءة' : 'Competency'}: </span>
                                        <span className="text-sm font-medium">{action.competency}</span>
                                      </div>
                                      <div>
                                        <span className="text-xs text-muted-foreground">{isRTL ? 'الموعد النهائي' : 'Deadline'}: </span>
                                        <span className="text-sm font-medium">{new Date(action.deadline).toLocaleDateString()}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-muted-foreground">{isRTL ? 'التقدم' : 'Progress'}</span>
                                        <span className="text-sm font-medium">{action.progress}%</span>
                                      </div>
                                      <Progress value={action.progress} className="w-full h-2" />
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      {action.learningPath && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleAssignLearning(action.id)}
                                          className="gap-1"
                                        >
                                          <BookOpen className="w-3 h-3" />
                                          {isRTL ? 'تعيين تعلم' : 'Assign Learning'}
                                        </Button>
                                      )}
                                      {action.status !== 'completed' && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleMarkCompleted(idp.id, action.id)}
                                          className="gap-1"
                                        >
                                          <CheckCircle className="w-3 h-3" />
                                          {isRTL ? 'تم الإنجاز' : 'Mark Completed'}
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Behavioral Tips */}
                    <div>
                      <h4 className="font-semibold mb-4">{isRTL ? 'نصائح سلوكية مخصصة' : 'Personalized Behavioral Tips'}</h4>
                      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            {idp.behavioralTips.map((tip, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Award className="w-4 h-4 text-blue-600 mt-0.5" />
                                <p className="text-sm text-blue-800">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button 
                        onClick={() => handleNotifyEmployee(idp.id)}
                        className="gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        {isRTL ? 'إشعار الموظف' : 'Notify Employee'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleExportIDP(idp.id)}
                        className="gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        {isRTL ? 'تصدير خطة التطوير' : 'Export IDP'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!selectedEmployee && currentEmployeeIDPs.length === 0 && (
        <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isRTL ? 'لا توجد خطط تطوير' : 'No Development Plans'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isRTL ? 'اختر موظف وانقر على "إنشاء خطة تطوير" لبدء إنشاء خطة تطوير فردية مخصصة' : 'Select an employee and click "Generate IDP" to create a personalized development plan'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};