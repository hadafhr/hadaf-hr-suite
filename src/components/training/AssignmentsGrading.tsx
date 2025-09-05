import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  FileCheck, 
  Plus, 
  Upload, 
  Download, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Edit,
  Star,
  MessageSquare,
  Send,
  Filter,
  Search
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  instructor: string;
  dueDate: Date;
  maxScore: number;
  submissionFormat: 'text' | 'file' | 'both';
  status: 'draft' | 'published' | 'closed';
  totalSubmissions: number;
  gradedSubmissions: number;
  instructions: string;
}

interface Submission {
  id: string;
  assignmentId: string;
  studentName: string;
  studentId: string;
  submissionDate: Date;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  status: 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
}

export const AssignmentsGrading = () => {
  const { toast } = useToast();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [gradingScore, setGradingScore] = useState('');
  const [gradingFeedback, setGradingFeedback] = useState('');

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    dueTime: '',
    maxScore: '100',
    submissionFormat: 'both',
    instructions: ''
  });

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'تقرير حول استراتيجيات القيادة',
      description: 'كتابة تقرير مفصل حول استراتيجيات القيادة الحديثة مع أمثلة عملية',
      course: 'مهارات القيادة الفعالة',
      instructor: 'د. أحمد محمد',
      dueDate: new Date('2024-04-15'),
      maxScore: 100,
      submissionFormat: 'both',
      status: 'published',
      totalSubmissions: 12,
      gradedSubmissions: 8,
      instructions: 'يجب أن يحتوي التقرير على مقدمة، عرض، خاتمة، ومراجع. الحد الأدنى للكلمات 1000 كلمة.'
    },
    {
      id: '2',
      title: 'خطة إدارة الوقت الشخصية',
      description: 'إعداد خطة شخصية لإدارة الوقت وتحديد الأولويات',
      course: 'إدارة الوقت والإنتاجية',
      instructor: 'أ. فاطمة علي',
      dueDate: new Date('2024-04-20'),
      maxScore: 80,
      submissionFormat: 'file',
      status: 'published',
      totalSubmissions: 8,
      gradedSubmissions: 5,
      instructions: 'يجب أن تشمل الخطة الأهداف اليومية والأسبوعية والشهرية مع أدوات التتبع.'
    },
    {
      id: '3',
      title: 'دراسة حالة في التسويق الرقمي',
      description: 'تحليل حملة تسويقية رقمية ناجحة مع تقديم التوصيات',
      course: 'التسويق الرقمي المتقدم',
      instructor: 'م. سارة أحمد',
      dueDate: new Date('2024-04-25'),
      maxScore: 120,
      submissionFormat: 'both',
      status: 'draft',
      totalSubmissions: 0,
      gradedSubmissions: 0,
      instructions: 'اختيار حملة تسويقية معروفة وتحليلها من جميع الجوانب مع تقديم مقترحات للتحسين.'
    }
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      assignmentId: '1',
      studentName: 'محمد أحمد العلي',
      studentId: 'EMP001',
      submissionDate: new Date('2024-04-10'),
      content: 'تقرير شامل حول استراتيجيات القيادة التحويلية والتشاركية...',
      fileName: 'تقرير_القيادة_محمد_احمد.pdf',
      fileUrl: '#',
      status: 'graded',
      score: 85,
      feedback: 'تقرير ممتاز مع تحليل عميق للموضوع. يمكن تحسين الخاتمة والمراجع.',
      gradedBy: 'د. أحمد محمد',
      gradedAt: new Date('2024-04-12')
    },
    {
      id: '2',
      assignmentId: '1',
      studentName: 'فاطمة سالم',
      studentId: 'EMP002',
      submissionDate: new Date('2024-04-14'),
      content: 'دراسة تطبيقية لأساليب القيادة في البيئة العربية...',
      status: 'submitted',
    },
    {
      id: '3',
      assignmentId: '2',
      studentName: 'أحمد محمد',
      studentId: 'EMP003',
      submissionDate: new Date('2024-04-18'),
      fileName: 'خطة_ادارة_الوقت_احمد.docx',
      fileUrl: '#',
      status: 'graded',
      score: 75,
      feedback: 'خطة جيدة ولكن تحتاج إلى مزيد من التفصيل في الأهداف طويلة المدى.',
      gradedBy: 'أ. فاطمة علي',
      gradedAt: new Date('2024-04-19')
    },
    {
      id: '4',
      assignmentId: '1',
      studentName: 'سارة أحمد',
      studentId: 'EMP004',
      submissionDate: new Date('2024-04-16'),
      content: 'تحليل نقدي لنماذج القيادة المعاصرة...',
      status: 'late',
    }
  ]);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getSubmissionsForAssignment = (assignmentId: string) => {
    return submissions.filter(sub => sub.assignmentId === assignmentId);
  };

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      course: newAssignment.course,
      instructor: 'المدرب الحالي',
      dueDate: new Date(`${newAssignment.dueDate}T${newAssignment.dueTime || '23:59'}`),
      maxScore: parseInt(newAssignment.maxScore),
      submissionFormat: newAssignment.submissionFormat as Assignment['submissionFormat'],
      status: 'draft',
      totalSubmissions: 0,
      gradedSubmissions: 0,
      instructions: newAssignment.instructions
    };

    setAssignments([...assignments, assignment]);
    setNewAssignment({
      title: '', description: '', course: '', dueDate: '', dueTime: '',
      maxScore: '100', submissionFormat: 'both', instructions: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "تم إنشاء الواجب",
      description: "تم إنشاء واجب جديد بنجاح"
    });
  };

  const handleGradeSubmission = () => {
    if (!selectedSubmission || !gradingScore) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الدرجة والتعليق",
        variant: "destructive"
      });
      return;
    }

    const score = parseInt(gradingScore);
    const assignment = assignments.find(a => a.id === selectedSubmission.assignmentId);

    if (score > (assignment?.maxScore || 100)) {
      toast({
        title: "خطأ",
        description: "الدرجة أكبر من الدرجة النهائية",
        variant: "destructive"
      });
      return;
    }

    const updatedSubmissions = submissions.map(sub =>
      sub.id === selectedSubmission.id
        ? {
            ...sub,
            status: 'graded' as const,
            score,
            feedback: gradingFeedback,
            gradedBy: 'المدرب الحالي',
            gradedAt: new Date()
          }
        : sub
    );

    setSubmissions(updatedSubmissions);

    // Update assignment graded count
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === selectedSubmission.assignmentId) {
        return {
          ...assignment,
          gradedSubmissions: assignment.gradedSubmissions + 1
        };
      }
      return assignment;
    });

    setAssignments(updatedAssignments);
    setGradingScore('');
    setGradingFeedback('');
    setIsGradingDialogOpen(false);
    setSelectedSubmission(null);

    toast({
      title: "تم التصحيح",
      description: `تم تصحيح واجب ${selectedSubmission.studentName} بنجاح`
    });
  };

  const openGradingDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    if (submission.score !== undefined) {
      setGradingScore(submission.score.toString());
      setGradingFeedback(submission.feedback || '');
    }
    setIsGradingDialogOpen(true);
  };

  const getStatusBadge = (status: Assignment['status']) => {
    const variants = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      draft: 'مسودة',
      published: 'منشور',
      closed: 'مغلق'
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const getSubmissionStatusBadge = (submission: Submission) => {
    const variants = {
      submitted: 'bg-blue-100 text-blue-800',
      graded: 'bg-green-100 text-green-800',
      late: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      submitted: 'مُسلم',
      graded: 'مُصحح',
      late: 'متأخر'
    };

    return <Badge className={variants[submission.status]}>{labels[submission.status]}</Badge>;
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
            <FileCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">الواجبات والتصحيح</h1>
            <p className="text-muted-foreground">إدارة الواجبات الرقمية وتصحيحها وتقديم الملاحظات</p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              واجب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إنشاء واجب جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان الواجب *</Label>
                  <Input
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    placeholder="أدخل عنوان الواجب"
                  />
                </div>
                <div>
                  <Label htmlFor="course">الدورة *</Label>
                  <Select value={newAssignment.course} onValueChange={(value) => setNewAssignment({ ...newAssignment, course: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدورة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مهارات القيادة الفعالة">مهارات القيادة الفعالة</SelectItem>
                      <SelectItem value="إدارة الوقت والإنتاجية">إدارة الوقت والإنتاجية</SelectItem>
                      <SelectItem value="التسويق الرقمي المتقدم">التسويق الرقمي المتقدم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">وصف الواجب</Label>
                <Textarea
                  id="description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="وصف مختصر للواجب"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dueDate">تاريخ التسليم *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dueTime">وقت التسليم</Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={newAssignment.dueTime}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxScore">الدرجة النهائية</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    value={newAssignment.maxScore}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="submissionFormat">نوع التسليم</Label>
                <Select value={newAssignment.submissionFormat} onValueChange={(value) => setNewAssignment({ ...newAssignment, submissionFormat: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">نص فقط</SelectItem>
                    <SelectItem value="file">ملف فقط</SelectItem>
                    <SelectItem value="both">نص وملف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="instructions">التعليمات والإرشادات</Label>
                <Textarea
                  id="instructions"
                  value={newAssignment.instructions}
                  onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                  placeholder="تعليمات مفصلة للمتدربين"
                  rows={4}
                />
              </div>
              <Button onClick={handleCreateAssignment} className="w-full">
                إنشاء الواجب
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الواجبات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="حالة الواجب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="draft">مسودة</SelectItem>
            <SelectItem value="published">منشور</SelectItem>
            <SelectItem value="closed">مغلق</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-2">{assignment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>تاريخ التسليم:</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{assignment.dueDate.toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>الدرجة النهائية:</span>
                  <span className="font-medium">{assignment.maxScore} نقطة</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>التصحيح</span>
                  <span>{assignment.gradedSubmissions}/{assignment.totalSubmissions}</span>
                </div>
                <Progress 
                  value={assignment.totalSubmissions > 0 ? (assignment.gradedSubmissions / assignment.totalSubmissions) * 100 : 0} 
                  className="h-2" 
                />
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <Eye className="ml-2 h-4 w-4" />
                  عرض
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="ml-2 h-4 w-4" />
                  تحرير
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignment Details Dialog */}
      {selectedAssignment && (
        <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {selectedAssignment.title}
                {getStatusBadge(selectedAssignment.status)}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="submissions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="submissions">المسلمات ({getSubmissionsForAssignment(selectedAssignment.id).length})</TabsTrigger>
                <TabsTrigger value="details">تفاصيل الواجب</TabsTrigger>
                <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="submissions" className="space-y-4">
                <div className="grid gap-4">
                  {getSubmissionsForAssignment(selectedAssignment.id).map((submission) => (
                    <Card key={submission.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">{submission.studentName}</h4>
                              <p className="text-sm text-muted-foreground">ID: {submission.studentId}</p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="h-3 w-3" />
                                <span>سُلم في: {submission.submissionDate.toLocaleString('ar-SA')}</span>
                              </div>
                              {submission.fileName && (
                                <div className="flex items-center gap-1">
                                  <Upload className="h-3 w-3" />
                                  <span>{submission.fileName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {submission.status === 'graded' && submission.score !== undefined && (
                              <div className="text-right">
                                <div className={`text-lg font-bold ${getScoreColor(submission.score, selectedAssignment.maxScore)}`}>
                                  {submission.score}/{selectedAssignment.maxScore}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {Math.round((submission.score / selectedAssignment.maxScore) * 100)}%
                                </div>
                              </div>
                            )}
                            
                            {getSubmissionStatusBadge(submission)}
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => openGradingDialog(submission)}
                                disabled={submission.status === 'submitted' ? false : true}
                              >
                                {submission.status === 'graded' ? <Edit className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {submission.content && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm line-clamp-3">{submission.content}</p>
                          </div>
                        )}
                        
                        {submission.feedback && (
                          <div className="mt-3 p-3 border-r-4 border-primary bg-primary/5">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">ملاحظات المدرب</span>
                            </div>
                            <p className="text-sm">{submission.feedback}</p>
                            {submission.gradedAt && (
                              <p className="text-xs text-muted-foreground mt-1">
                                تم التصحيح في: {submission.gradedAt.toLocaleString('ar-SA')}
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getSubmissionsForAssignment(selectedAssignment.id).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد مسلمات بعد</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">وصف الواجب</h4>
                    <p className="text-sm text-muted-foreground">{selectedAssignment.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">التعليمات</h4>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedAssignment.instructions}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">{selectedAssignment.maxScore}</div>
                      <p className="text-xs text-muted-foreground">الدرجة النهائية</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">{selectedAssignment.totalSubmissions}</div>
                      <p className="text-xs text-muted-foreground">إجمالي المسلمات</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">{selectedAssignment.gradedSubmissions}</div>
                      <p className="text-xs text-muted-foreground">المصححة</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">
                        {selectedAssignment.totalSubmissions - selectedAssignment.gradedSubmissions}
                      </div>
                      <p className="text-xs text-muted-foreground">في الانتظار</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="statistics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>توزيع الدرجات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (أقل من 60)'].map((grade, index) => (
                          <div key={grade} className="flex items-center justify-between">
                            <span className="text-sm">{grade}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={(5 - index) * 20} className="w-20 h-2" />
                              <span className="text-sm w-8">{Math.floor(Math.random() * 10)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>الإحصائيات العامة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>متوسط الدرجات:</span>
                          <span className="font-medium">78.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>أعلى درجة:</span>
                          <span className="font-medium text-green-600">95</span>
                        </div>
                        <div className="flex justify-between">
                          <span>أقل درجة:</span>
                          <span className="font-medium text-red-600">45</span>
                        </div>
                        <div className="flex justify-between">
                          <span>معدل التسليم في الوقت:</span>
                          <span className="font-medium">85%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Grading Dialog */}
      <Dialog open={isGradingDialogOpen} onOpenChange={setIsGradingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              تصحيح واجب: {selectedSubmission?.studentName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">محتوى الإجابة</h4>
                {selectedSubmission.content && (
                  <p className="text-sm mb-3">{selectedSubmission.content}</p>
                )}
                {selectedSubmission.fileName && (
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">{selectedSubmission.fileName}</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">الدرجة (من {selectedAssignment?.maxScore})</Label>
                  <Input
                    id="score"
                    type="number"
                    max={selectedAssignment?.maxScore}
                    value={gradingScore}
                    onChange={(e) => setGradingScore(e.target.value)}
                    placeholder="أدخل الدرجة"
                  />
                </div>
                <div>
                  <Label>النسبة المئوية</Label>
                  <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                    {gradingScore && selectedAssignment ? 
                      `${Math.round((parseInt(gradingScore) / selectedAssignment.maxScore) * 100)}%` : 
                      '0%'
                    }
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedback">التعليقات والملاحظات</Label>
                <Textarea
                  id="feedback"
                  value={gradingFeedback}
                  onChange={(e) => setGradingFeedback(e.target.value)}
                  placeholder="أضف تعليقاتك وملاحظاتك للطالب"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleGradeSubmission} className="flex-1">
                  <Send className="ml-2 h-4 w-4" />
                  حفظ التصحيح
                </Button>
                <Button variant="outline" onClick={() => setIsGradingDialogOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};