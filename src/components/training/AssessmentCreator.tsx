import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Brain,
  FileText,
  Target,
  Clock,
  Zap
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'essay' | 'practical';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  aiGenerated: boolean;
}

interface AssessmentCreatorProps {
  onClose: () => void;
}

export const AssessmentCreator: React.FC<AssessmentCreatorProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    type: 'quiz',
    courseId: '',
    duration: 60,
    passingScore: 70,
    attempts: 3,
    aiEnabled: true
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 5,
    difficulty: 'medium',
    aiGenerated: false
  });

  const courses = [
    { id: '1', name: 'أساسيات إدارة المشاريع' },
    { id: '2', name: 'التسويق الرقمي المتقدم' },
    { id: '3', name: 'البرمجة بـ React' },
    { id: '4', name: 'تحليل البيانات' }
  ];

  const questionTypes = [
    { value: 'multiple-choice', label: isRTL ? 'اختيار متعدد' : 'Multiple Choice', icon: FileText },
    { value: 'true-false', label: isRTL ? 'صح وخطأ' : 'True/False', icon: Target },
    { value: 'essay', label: isRTL ? 'مقالي' : 'Essay', icon: FileText },
    { value: 'practical', label: isRTL ? 'عملي' : 'Practical', icon: Zap }
  ];

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.question.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        type: currentQuestion.type as Question['type'],
        question: currentQuestion.question,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer || 0,
        explanation: currentQuestion.explanation,
        points: currentQuestion.points || 5,
        difficulty: currentQuestion.difficulty as Question['difficulty'],
        aiGenerated: false
      };
      
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion({
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 5,
        difficulty: 'medium',
        aiGenerated: false
      });
    }
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const generateAIQuestions = () => {
    // Simulate AI question generation
    const aiQuestions: Question[] = [
      {
        id: `ai-${Date.now()}-1`,
        type: 'multiple-choice',
        question: isRTL ? 'ما هو الهدف الرئيسي من إدارة المشاريع؟' : 'What is the main objective of project management?',
        options: isRTL 
          ? ['تحقيق أهداف المشروع في الوقت المحدد', 'زيادة الأرباح', 'توظيف المزيد من الأشخاص', 'شراء أدوات جديدة']
          : ['Achieve project goals on time', 'Increase profits', 'Hire more people', 'Buy new tools'],
        correctAnswer: 0,
        explanation: isRTL 
          ? 'إدارة المشاريع تهدف إلى تحقيق أهداف المشروع ضمن القيود المحددة.'
          : 'Project management aims to achieve project objectives within defined constraints.',
        points: 5,
        difficulty: 'easy',
        aiGenerated: true
      },
      {
        id: `ai-${Date.now()}-2`,
        type: 'true-false',
        question: isRTL ? 'يمكن أن يكون للمشروع أكثر من مدير مشروع واحد' : 'A project can have more than one project manager',
        correctAnswer: 0,
        explanation: isRTL 
          ? 'عادة ما يكون للمشروع مدير مشروع واحد مسؤول عن النتائج النهائية.'
          : 'Typically, a project should have one project manager responsible for outcomes.',
        points: 3,
        difficulty: 'medium',
        aiGenerated: true
      }
    ];

    setQuestions([...questions, ...aiQuestions]);
  };

  const saveAssessment = () => {
    const assessment = {
      ...assessmentData,
      questions,
      totalQuestions: questions.length,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      createdAt: new Date(),
      status: 'draft'
    };
    
    console.log('Saving assessment:', assessment);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{isRTL ? 'معلومات التقييم الأساسية' : 'Basic Assessment Information'}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">{isRTL ? 'عنوان التقييم' : 'Assessment Title'} *</Label>
                <Input
                  id="title"
                  value={assessmentData.title}
                  onChange={(e) => setAssessmentData({...assessmentData, title: e.target.value})}
                  placeholder={isRTL ? 'أدخل عنوان التقييم' : 'Enter assessment title'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">{isRTL ? 'نوع التقييم' : 'Assessment Type'} *</Label>
                <Select value={assessmentData.type} onValueChange={(value) => setAssessmentData({...assessmentData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">{isRTL ? 'اختبار' : 'Quiz'}</SelectItem>
                    <SelectItem value="assignment">{isRTL ? 'مهمة' : 'Assignment'}</SelectItem>
                    <SelectItem value="practical">{isRTL ? 'عملي' : 'Practical'}</SelectItem>
                    <SelectItem value="discussion">{isRTL ? 'نقاش' : 'Discussion'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{isRTL ? 'وصف التقييم' : 'Assessment Description'}</Label>
              <Textarea
                id="description"
                value={assessmentData.description}
                onChange={(e) => setAssessmentData({...assessmentData, description: e.target.value})}
                placeholder={isRTL ? 'اكتب وصفاً مفصلاً للتقييم وأهدافه' : 'Write a detailed description of the assessment and its objectives'}
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">{isRTL ? 'الدورة التدريبية' : 'Training Course'} *</Label>
                <Select value={assessmentData.courseId} onValueChange={(value) => setAssessmentData({...assessmentData, courseId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={isRTL ? 'اختر الدورة' : 'Select course'} />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">{isRTL ? 'المدة (بالدقائق)' : 'Duration (minutes)'}</Label>
                <Input
                  id="duration"
                  type="number"
                  value={assessmentData.duration}
                  onChange={(e) => setAssessmentData({...assessmentData, duration: Number(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passingScore">{isRTL ? 'درجة النجاح (%)' : 'Passing Score (%)'}</Label>
                <Input
                  id="passingScore"
                  type="number"
                  value={assessmentData.passingScore}
                  onChange={(e) => setAssessmentData({...assessmentData, passingScore: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{isRTL ? 'إضافة الأسئلة' : 'Add Questions'}</h3>
              <Button onClick={generateAIQuestions} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100">
                <Brain className="h-4 w-4 mr-2" />
                {isRTL ? 'إنشاء أسئلة بالذكاء الاصطناعي' : 'Generate AI Questions'}
              </Button>
            </div>
            
            <Card className="border-dashed border-2 border-border">
              <CardHeader>
                <CardTitle className="text-base">{isRTL ? 'سؤال جديد' : 'New Question'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="questionType">{isRTL ? 'نوع السؤال' : 'Question Type'}</Label>
                    <Select value={currentQuestion.type} onValueChange={(value) => setCurrentQuestion({...currentQuestion, type: value as Question['type']})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {questionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <type.icon className="h-4 w-4 mr-2" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">{isRTL ? 'مستوى الصعوبة' : 'Difficulty Level'}</Label>
                    <Select value={currentQuestion.difficulty} onValueChange={(value) => setCurrentQuestion({...currentQuestion, difficulty: value as Question['difficulty']})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">{isRTL ? 'سهل' : 'Easy'}</SelectItem>
                        <SelectItem value="medium">{isRTL ? 'متوسط' : 'Medium'}</SelectItem>
                        <SelectItem value="hard">{isRTL ? 'صعب' : 'Hard'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">{isRTL ? 'نص السؤال' : 'Question Text'}</Label>
                  <Textarea
                    id="question"
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                    placeholder={isRTL ? 'اكتب السؤال هنا...' : 'Write the question here...'}
                    rows={2}
                  />
                </div>

                {currentQuestion.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الخيارات' : 'Options'}</Label>
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(currentQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion({...currentQuestion, options: newOptions});
                          }}
                          placeholder={`${isRTL ? 'الخيار' : 'Option'} ${index + 1}`}
                        />
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: index})}
                          className="w-4 h-4 text-primary"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="points">{isRTL ? 'النقاط' : 'Points'}</Label>
                    <Input
                      id="points"
                      type="number"
                      value={currentQuestion.points}
                      onChange={(e) => setCurrentQuestion({...currentQuestion, points: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <Button onClick={addQuestion} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {isRTL ? 'إضافة السؤال' : 'Add Question'}
                </Button>
              </CardContent>
            </Card>

            {questions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">{isRTL ? 'الأسئلة المضافة' : 'Added Questions'} ({questions.length})</h4>
                {questions.map((question, index) => (
                  <Card key={question.id} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {isRTL ? 'سؤال' : 'Q'} {index + 1}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {questionTypes.find(t => t.value === question.type)?.label}
                            </Badge>
                            {question.aiGenerated && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {question.points} {isRTL ? 'نقاط' : 'pts'}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{question.question}</p>
                          {question.options && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {question.options.map((option, idx) => (
                                <div key={idx} className={`${idx === question.correctAnswer ? 'text-green-600 font-medium' : ''}`}>
                                  {idx + 1}. {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{isRTL ? 'مراجعة وحفظ التقييم' : 'Review and Save Assessment'}</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'ملخص التقييم' : 'Assessment Summary'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'العنوان:' : 'Title:'}</span>
                      <p className="font-medium">{assessmentData.title || (isRTL ? 'غير محدد' : 'Not specified')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'النوع:' : 'Type:'}</span>
                      <p className="font-medium">{assessmentData.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'المدة:' : 'Duration:'}</span>
                      <p className="font-medium">{assessmentData.duration} {isRTL ? 'دقيقة' : 'minutes'}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'عدد الأسئلة:' : 'Questions:'}</span>
                      <p className="font-medium">{questions.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'إجمالي النقاط:' : 'Total Points:'}</span>
                      <p className="font-medium">{questions.reduce((sum, q) => sum + q.points, 0)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">{isRTL ? 'درجة النجاح:' : 'Passing Score:'}</span>
                      <p className="font-medium">{assessmentData.passingScore}%</p>
                    </div>
                  </div>
                </div>
                
                {assessmentData.description && (
                  <div className="pt-4 border-t">
                    <span className="text-sm text-muted-foreground">{isRTL ? 'الوصف:' : 'Description:'}</span>
                    <p className="mt-1">{assessmentData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{isRTL ? 'إنشاء تقييم جديد' : 'Create New Assessment'}</h2>
        <Badge variant="outline">{isRTL ? 'الخطوة' : 'Step'} {currentStep} {isRTL ? 'من' : 'of'} 3</Badge>
      </div>

      <div className="flex justify-between items-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {step}
            </div>
            {step < 3 && <div className={`flex-1 h-px mx-2 ${currentStep > step ? 'bg-primary' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          {isRTL ? 'السابق' : 'Previous'}
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            {isRTL ? 'إلغاء' : 'Cancel'}
          </Button>
          
          {currentStep === 3 ? (
            <Button onClick={saveAssessment} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              {isRTL ? 'حفظ التقييم' : 'Save Assessment'}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="bg-primary hover:bg-primary/90"
              disabled={currentStep === 1 && !assessmentData.title}
            >
              {isRTL ? 'التالي' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};