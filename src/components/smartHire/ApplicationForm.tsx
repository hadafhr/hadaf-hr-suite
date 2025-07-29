import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText,
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
  Award,
  Plus,
  Eye,
  Download,
  Bot,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'date';
  question: string;
  required: boolean;
  options?: string[];
  category: 'personal' | 'experience' | 'skills' | 'availability' | 'custom';
}

interface ApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    city: string;
    address: string;
  };
  education: {
    degree: string;
    major: string;
    university: string;
    graduationYear: string;
    gpa?: string;
  }[];
  experience: {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: string[];
  languages: {
    language: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'native';
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  customAnswers: { [questionId: string]: any };
  resumeFile?: File;
  coverLetter?: string;
}

export const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [applicationData, setApplicationData] = React.useState<ApplicationData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      city: '',
      address: ''
    },
    education: [{ degree: '', major: '', university: '', graduationYear: '', gpa: '' }],
    experience: [{ position: '', company: '', startDate: '', endDate: '', current: false, description: '' }],
    skills: [],
    languages: [{ language: '', level: 'intermediate' }],
    certifications: [],
    customAnswers: {}
  });

  const [preScreeningQuestions] = React.useState<Question[]>([
    {
      id: '1',
      type: 'radio',
      question: 'هل لديك الحق في العمل في المملكة العربية السعودية؟',
      required: true,
      options: ['نعم', 'لا'],
      category: 'availability'
    },
    {
      id: '2',
      type: 'select',
      question: 'ما هو مستوى خبرتك في البرمجة؟',
      required: true,
      options: ['مبتدئ (أقل من سنة)', 'متوسط (1-3 سنوات)', 'متقدم (3-5 سنوات)', 'خبير (أكثر من 5 سنوات)'],
      category: 'experience'
    },
    {
      id: '3',
      type: 'number',
      question: 'ما هو الراتب المتوقع (ريال سعودي)؟',
      required: false,
      category: 'custom'
    },
    {
      id: '4',
      type: 'checkbox',
      question: 'أي من التقنيات التالية تجيدها؟',
      required: true,
      options: ['React.js', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'PHP', '.NET'],
      category: 'skills'
    },
    {
      id: '5',
      type: 'date',
      question: 'متى يمكنك البدء في العمل؟',
      required: true,
      category: 'availability'
    },
    {
      id: '6',
      type: 'textarea',
      question: 'لماذا تريد العمل في شركتنا؟',
      required: false,
      category: 'custom'
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<any>(null);

  const steps = [
    { number: 1, title: 'المعلومات الشخصية', icon: User },
    { number: 2, title: 'التعليم والمؤهلات', icon: GraduationCap },
    { number: 3, title: 'الخبرة العملية', icon: Briefcase },
    { number: 4, title: 'المهارات واللغات', icon: Languages },
    { number: 5, title: 'أسئلة تمهيدية', icon: FileText },
    { number: 6, title: 'السيرة الذاتية', icon: Upload },
    { number: 7, title: 'المراجعة والإرسال', icon: CheckCircle }
  ];

  const addEducation = () => {
    setApplicationData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', major: '', university: '', graduationYear: '', gpa: '' }]
    }));
  };

  const addExperience = () => {
    setApplicationData(prev => ({
      ...prev,
      experience: [...prev.experience, { position: '', company: '', startDate: '', endDate: '', current: false, description: '' }]
    }));
  };

  const addLanguage = () => {
    setApplicationData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: 'intermediate' }]
    }));
  };

  const addCertification = () => {
    setApplicationData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', date: '', url: '' }]
    }));
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !applicationData.skills.includes(skill.trim())) {
      setApplicationData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const analyzeApplication = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        completeness: 95,
        skillsMatch: 88,
        experienceMatch: 92,
        recommendations: [
          'ممتاز: خبرة قوية في التقنيات المطلوبة',
          'جيد: المؤهلات العلمية مناسبة',
          'ملاحظة: يُنصح بإضافة المزيد من التفاصيل حول المشاريع السابقة'
        ],
        score: 90,
        status: 'مؤهل بقوة'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">الاسم الأول *</Label>
          <Input
            id="firstName"
            value={applicationData.personalInfo.firstName}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, firstName: e.target.value }
            }))}
            placeholder="الاسم الأول"
          />
        </div>
        <div>
          <Label htmlFor="lastName">الاسم الأخير *</Label>
          <Input
            id="lastName"
            value={applicationData.personalInfo.lastName}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, lastName: e.target.value }
            }))}
            placeholder="الاسم الأخير"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={applicationData.personalInfo.email}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value }
            }))}
            placeholder="example@email.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">رقم الهاتف *</Label>
          <Input
            id="phone"
            value={applicationData.personalInfo.phone}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, phone: e.target.value }
            }))}
            placeholder="+966 50 123 4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={applicationData.personalInfo.dateOfBirth}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
            }))}
          />
        </div>
        <div>
          <Label htmlFor="nationality">الجنسية</Label>
          <Input
            id="nationality"
            value={applicationData.personalInfo.nationality}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, nationality: e.target.value }
            }))}
            placeholder="الجنسية"
          />
        </div>
        <div>
          <Label htmlFor="city">المدينة</Label>
          <Input
            id="city"
            value={applicationData.personalInfo.city}
            onChange={(e) => setApplicationData(prev => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, city: e.target.value }
            }))}
            placeholder="المدينة"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">العنوان الكامل</Label>
        <Textarea
          id="address"
          value={applicationData.personalInfo.address}
          onChange={(e) => setApplicationData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, address: e.target.value }
          }))}
          placeholder="العنوان الكامل"
          rows={3}
        />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {applicationData.education.map((edu, index) => (
        <Card key={index} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>الدرجة العلمية *</Label>
              <Select
                value={edu.degree}
                onValueChange={(value) => {
                  const newEducation = [...applicationData.education];
                  newEducation[index].degree = value;
                  setApplicationData(prev => ({ ...prev, education: newEducation }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدرجة العلمية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">الثانوية العامة</SelectItem>
                  <SelectItem value="diploma">دبلوم</SelectItem>
                  <SelectItem value="bachelor">بكالوريوس</SelectItem>
                  <SelectItem value="master">ماجستير</SelectItem>
                  <SelectItem value="phd">دكتوراه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>التخصص *</Label>
              <Input
                value={edu.major}
                onChange={(e) => {
                  const newEducation = [...applicationData.education];
                  newEducation[index].major = e.target.value;
                  setApplicationData(prev => ({ ...prev, education: newEducation }));
                }}
                placeholder="التخصص"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label>الجامعة/المؤسسة *</Label>
              <Input
                value={edu.university}
                onChange={(e) => {
                  const newEducation = [...applicationData.education];
                  newEducation[index].university = e.target.value;
                  setApplicationData(prev => ({ ...prev, education: newEducation }));
                }}
                placeholder="اسم الجامعة"
              />
            </div>
            <div>
              <Label>سنة التخرج *</Label>
              <Input
                value={edu.graduationYear}
                onChange={(e) => {
                  const newEducation = [...applicationData.education];
                  newEducation[index].graduationYear = e.target.value;
                  setApplicationData(prev => ({ ...prev, education: newEducation }));
                }}
                placeholder="2024"
              />
            </div>
            <div>
              <Label>المعدل التراكمي</Label>
              <Input
                value={edu.gpa}
                onChange={(e) => {
                  const newEducation = [...applicationData.education];
                  newEducation[index].gpa = e.target.value;
                  setApplicationData(prev => ({ ...prev, education: newEducation }));
                }}
                placeholder="3.75"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addEducation} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        إضافة مؤهل تعليمي آخر
      </Button>
    </div>
  );

  const renderPreScreening = () => (
    <div className="space-y-6">
      {preScreeningQuestions.map((question) => (
        <Card key={question.id} className="p-4">
          <div className="space-y-3">
            <Label className="text-base">
              {question.question}
              {question.required && <span className="text-red-500 mr-1">*</span>}
            </Label>

            {question.type === 'text' && (
              <Input
                value={applicationData.customAnswers[question.id] || ''}
                onChange={(e) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: e.target.value }
                }))}
                placeholder="أدخل إجابتك"
              />
            )}

            {question.type === 'textarea' && (
              <Textarea
                value={applicationData.customAnswers[question.id] || ''}
                onChange={(e) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: e.target.value }
                }))}
                placeholder="أدخل إجابتك"
                rows={4}
              />
            )}

            {question.type === 'number' && (
              <Input
                type="number"
                value={applicationData.customAnswers[question.id] || ''}
                onChange={(e) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: e.target.value }
                }))}
                placeholder="أدخل الرقم"
              />
            )}

            {question.type === 'date' && (
              <Input
                type="date"
                value={applicationData.customAnswers[question.id] || ''}
                onChange={(e) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: e.target.value }
                }))}
              />
            )}

            {question.type === 'select' && (
              <Select
                value={applicationData.customAnswers[question.id] || ''}
                onValueChange={(value) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر من القائمة" />
                </SelectTrigger>
                <SelectContent>
                  {question.options?.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {question.type === 'radio' && (
              <RadioGroup
                value={applicationData.customAnswers[question.id] || ''}
                onValueChange={(value) => setApplicationData(prev => ({
                  ...prev,
                  customAnswers: { ...prev.customAnswers, [question.id]: value }
                }))}
              >
                {question.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === 'checkbox' && (
              <div className="grid grid-cols-2 gap-2">
                {question.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={(applicationData.customAnswers[question.id] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentAnswers = applicationData.customAnswers[question.id] || [];
                        let newAnswers;
                        if (checked) {
                          newAnswers = [...currentAnswers, option];
                        } else {
                          newAnswers = currentAnswers.filter((item: string) => item !== option);
                        }
                        setApplicationData(prev => ({
                          ...prev,
                          customAnswers: { ...prev.customAnswers, [question.id]: newAnswers }
                        }));
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      {/* AI Analysis */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">تحليل الذكاء الاصطناعي</h3>
          </div>
          {!analysisResult && (
            <Button onClick={analyzeApplication} disabled={isAnalyzing} className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              {isAnalyzing ? 'جاري التحليل...' : 'تحليل الطلب'}
            </Button>
          )}
        </div>

        {isAnalyzing && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">جاري تحليل طلبك بواسطة الذكاء الاصطناعي...</span>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{analysisResult.completeness}%</p>
                <p className="text-sm text-slate-600">اكتمال الطلب</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{analysisResult.score}</p>
                <p className="text-sm text-slate-600">النتيجة الإجمالية</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                <Badge className="bg-green-100 text-green-800">{analysisResult.status}</Badge>
                <p className="text-sm text-slate-600 mt-1">حالة الترشيح</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">توصيات الذكاء الاصطناعي:</h4>
              <ul className="space-y-1">
                {analysisResult.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Application Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ملخص الطلب</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              المعلومات الشخصية
            </h4>
            <div className="space-y-1 text-sm text-slate-600">
              <p>{applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}</p>
              <p>{applicationData.personalInfo.email}</p>
              <p>{applicationData.personalInfo.phone}</p>
              <p>{applicationData.personalInfo.city}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              التعليم
            </h4>
            <div className="space-y-1 text-sm text-slate-600">
              {applicationData.education.map((edu, index) => (
                <p key={index}>{edu.degree} في {edu.major} - {edu.university}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              المهارات
            </h4>
            <div className="flex flex-wrap gap-1">
              {applicationData.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              الملفات
            </h4>
            <div className="space-y-1 text-sm text-slate-600">
              <p>{applicationData.resumeFile ? 'تم رفع السيرة الذاتية' : 'لم يتم رفع السيرة الذاتية'}</p>
              <p>{applicationData.coverLetter ? 'تم إضافة خطاب التغطية' : 'لم يتم إضافة خطاب التغطية'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button size="lg" className="px-8">
          <CheckCircle className="w-5 h-5 mr-2" />
          إرسال الطلب
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center ${
                step.number <= currentStep ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step.number <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-center">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <Card className="p-6">
        {currentStep === 1 && renderPersonalInfo()}
        {currentStep === 2 && renderEducation()}
        {currentStep === 5 && renderPreScreening()}
        {currentStep === 7 && renderReview()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            السابق
          </Button>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={currentStep === steps.length}
          >
            التالي
          </Button>
        </div>
      </Card>
    </div>
  );
};