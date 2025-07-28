import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Heart, 
  Users, 
  HandHeart, 
  Gift, 
  Target, 
  Plus, 
  Search, 
  TrendingUp, 
  Calendar,
  Eye,
  Edit,
  Send,
  FileText,
  Download
} from 'lucide-react';

const nonprofitPrograms = [
  {
    id: 1,
    name: "برنامج كفالة الأيتام",
    description: "برنامج لكفالة ورعاية الأيتام وتوفير احتياجاتهم",
    beneficiaries: 150,
    budget: 500000,
    status: "نشط",
    category: "رعاية اجتماعية",
    startDate: "2023-06-01"
  },
  {
    id: 2,
    name: "مبادرة التعليم للجميع",
    description: "توفير فرص التعليم للأطفال المحتاجين",
    beneficiaries: 200,
    budget: 750000,
    status: "نشط",
    category: "تعليم",
    startDate: "2023-09-01"
  }
];

const nonprofitStats = [
  { title: "البرامج النشطة", value: "25", icon: Target, color: "text-green-600" },
  { title: "المستفيدين", value: "1,250", icon: Users, color: "text-blue-600" },
  { title: "المتطوعين", value: "450", icon: HandHeart, color: "text-purple-600" },
  { title: "التبرعات الشهرية", value: "2.8M ريال", icon: Gift, color: "text-orange-600" }
];

const volunteers = [
  {
    id: 1,
    name: "سارة أحمد المطيري",
    skills: "تعليم، ترجمة",
    hoursContributed: 120,
    programs: 3,
    status: "نشط"
  },
  {
    id: 2,
    name: "محمد علي الغامدي",
    skills: "طب، إسعافات أولية",
    hoursContributed: 85,
    programs: 2,
    status: "نشط"
  },
  {
    id: 3,
    name: "فاطمة خالد العتيبي",
    skills: "تصميم، إدارة",
    hoursContributed: 95,
    programs: 4,
    status: "نشط"
  },
  {
    id: 4,
    name: "أحمد سعد الحربي",
    skills: "هندسة، تقنية",
    hoursContributed: 110,
    programs: 2,
    status: "نشط"
  },
  {
    id: 5,
    name: "نورا عبدالله القحطاني",
    skills: "محاسبة، إدارة مالية",
    hoursContributed: 75,
    programs: 3,
    status: "نشط"
  },
  {
    id: 6,
    name: "خالد محمد الدوسري",
    skills: "قانون، استشارات",
    hoursContributed: 90,
    programs: 2,
    status: "نشط"
  },
  {
    id: 7,
    name: "ريم فهد الشهري",
    skills: "تسويق، علاقات عامة",
    hoursContributed: 105,
    programs: 4,
    status: "نشط"
  },
  {
    id: 8,
    name: "عبدالرحمن علي النعيمي",
    skills: "تدريب، تطوير",
    hoursContributed: 130,
    programs: 5,
    status: "نشط"
  },
  {
    id: 9,
    name: "هند سلطان الزهراني",
    skills: "تمريض، رعاية صحية",
    hoursContributed: 88,
    programs: 3,
    status: "نشط"
  },
  {
    id: 10,
    name: "طلال عبدالعزيز الشمراني",
    skills: "طبخ، تموين",
    hoursContributed: 65,
    programs: 2,
    status: "نشط"
  },
  {
    id: 11,
    name: "لينا أحمد البقمي",
    skills: "ترجمة، لغات",
    hoursContributed: 115,
    programs: 3,
    status: "نشط"
  },
  {
    id: 12,
    name: "بدر محمد الخثعمي",
    skills: "تصوير، إعلام",
    hoursContributed: 70,
    programs: 2,
    status: "نشط"
  },
  {
    id: 13,
    name: "منى عبدالكريم الرشيد",
    skills: "علم نفس، إرشاد",
    hoursContributed: 125,
    programs: 4,
    status: "نشط"
  },
  {
    id: 14,
    name: "يوسف فيصل الأحمدي",
    skills: "نجارة، صيانة",
    hoursContributed: 80,
    programs: 2,
    status: "نشط"
  },
  {
    id: 15,
    name: "جود سالم الباحص",
    skills: "تعليم أطفال، رياض",
    hoursContributed: 100,
    programs: 3,
    status: "نشط"
  },
  {
    id: 16,
    name: "سلطان خالد العسيري",
    skills: "أمن، حراسة",
    hoursContributed: 60,
    programs: 1,
    status: "نشط"
  },
  {
    id: 17,
    name: "رهف عبدالله القرني",
    skills: "موسيقى، فنون",
    hoursContributed: 85,
    programs: 2,
    status: "نشط"
  },
  {
    id: 18,
    name: "عبدالعزيز أحمد الغامدي",
    skills: "رياضة، تدريب",
    hoursContributed: 95,
    programs: 3,
    status: "نشط"
  },
  {
    id: 19,
    name: "شهد محمد المطيري",
    skills: "كتابة، تحرير",
    hoursContributed: 110,
    programs: 4,
    status: "نشط"
  },
  {
    id: 20,
    name: "فهد سعد الحربي",
    skills: "سياقة، نقل",
    hoursContributed: 55,
    programs: 2,
    status: "نشط"
  }
];

export const NonProfitServices: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: '',
    category: '',
    budget: '',
    beneficiaries: ''
  });
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    skills: '',
    phone: '',
    email: ''
  });
  const [isNewProgramOpen, setIsNewProgramOpen] = useState(false);
  const [isNewVolunteerOpen, setIsNewVolunteerOpen] = useState(false);

  const handleNewProgram = () => {
    if (!newProgram.name || !newProgram.description) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إنشاء البرنامج بنجاح",
      description: `تم إنشاء برنامج ${newProgram.name}`,
    });
    
    setNewProgram({
      name: '',
      description: '',
      category: '',
      budget: '',
      beneficiaries: ''
    });
    setIsNewProgramOpen(false);
  };

  const handleNewVolunteer = () => {
    if (!newVolunteer.name || !newVolunteer.skills) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إضافة المتطوع بنجاح",
      description: `تم إضافة ${newVolunteer.name} كمتطوع`,
    });
    
    setNewVolunteer({
      name: '',
      skills: '',
      phone: '',
      email: ''
    });
    setIsNewVolunteerOpen(false);
  };

  const handleViewProgram = (programName: string) => {
    toast({
      title: "عرض التفاصيل",
      description: `عرض تفاصيل برنامج ${programName}`,
    });
  };

  const handleImpactReport = (programName: string) => {
    toast({
      title: "تقرير الأثر",
      description: `جاري تحميل تقرير الأثر لبرنامج ${programName}`,
    });
  };

  const handleViewVolunteer = (volunteerName: string) => {
    toast({
      title: "عرض الملف الشخصي",
      description: `عرض ملف ${volunteerName}`,
    });
  };

  const handleSendTask = (volunteerName: string) => {
    toast({
      title: "إرسال مهمة",
      description: `تم إرسال مهمة جديدة إلى ${volunteerName}`,
    });
  };

  const handleSearch = () => {
    toast({
      title: "البحث",
      description: "جاري البحث في البرامج...",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">خدمات القطاع غير الربحي</h1>
          <p className="text-muted-foreground mt-2">إدارة وتنظيم البرامج والخدمات الخيرية</p>
        </div>
        <div>
          <Dialog open={isNewProgramOpen} onOpenChange={setIsNewProgramOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                برنامج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>إنشاء برنامج جديد</DialogTitle>
                <DialogDescription>
                  أدخل بيانات البرنامج الخيري الجديد
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-name" className="text-right">
                    اسم البرنامج
                  </Label>
                  <Input
                    id="program-name"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    className="col-span-3"
                    placeholder="اسم البرنامج"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-description" className="text-right">
                    الوصف
                  </Label>
                  <Textarea
                    id="program-description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    className="col-span-3"
                    placeholder="وصف البرنامج"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-category" className="text-right">
                    الفئة
                  </Label>
                  <Select value={newProgram.category} onValueChange={(value) => setNewProgram({...newProgram, category: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="رعاية اجتماعية">رعاية اجتماعية</SelectItem>
                      <SelectItem value="تعليم">تعليم</SelectItem>
                      <SelectItem value="صحة">صحة</SelectItem>
                      <SelectItem value="بيئة">بيئة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-budget" className="text-right">
                    الميزانية
                  </Label>
                  <Input
                    id="program-budget"
                    value={newProgram.budget}
                    onChange={(e) => setNewProgram({...newProgram, budget: e.target.value})}
                    className="col-span-3"
                    placeholder="الميزانية بالريال"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program-beneficiaries" className="text-right">
                    عدد المستفيدين
                  </Label>
                  <Input
                    id="program-beneficiaries"
                    value={newProgram.beneficiaries}
                    onChange={(e) => setNewProgram({...newProgram, beneficiaries: e.target.value})}
                    className="col-span-3"
                    placeholder="عدد المستفيدين المتوقع"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewProgramOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleNewProgram}>
                  إنشاء البرنامج
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nonprofitStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="programs">البرامج</TabsTrigger>
          <TabsTrigger value="volunteers">المتطوعين</TabsTrigger>
          <TabsTrigger value="donations">التبرعات</TabsTrigger>
          <TabsTrigger value="impact">الأثر</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              <Input 
                placeholder="البحث في البرامج..." 
                className="w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {nonprofitPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        {program.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{program.description}</CardDescription>
                    </div>
                    <Badge variant="default">{program.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">المستفيدين</p>
                      <p className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {program.beneficiaries}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الميزانية</p>
                      <p className="font-semibold">{program.budget.toLocaleString()} ريال</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الفئة</p>
                      <p className="font-semibold">{program.category}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button 
                        size="sm"
                        onClick={() => handleViewProgram(program.name)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        عرض التفاصيل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleImpactReport(program.name)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        تقرير الأثر
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">إدارة المتطوعين</h3>
            <Dialog open={isNewVolunteerOpen} onOpenChange={setIsNewVolunteerOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة متطوع
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>إضافة متطوع جديد</DialogTitle>
                  <DialogDescription>
                    أدخل بيانات المتطوع الجديد
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteer-name" className="text-right">
                      الاسم
                    </Label>
                    <Input
                      id="volunteer-name"
                      value={newVolunteer.name}
                      onChange={(e) => setNewVolunteer({...newVolunteer, name: e.target.value})}
                      className="col-span-3"
                      placeholder="اسم المتطوع"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteer-skills" className="text-right">
                      المهارات
                    </Label>
                    <Input
                      id="volunteer-skills"
                      value={newVolunteer.skills}
                      onChange={(e) => setNewVolunteer({...newVolunteer, skills: e.target.value})}
                      className="col-span-3"
                      placeholder="المهارات والخبرات"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteer-phone" className="text-right">
                      رقم الجوال
                    </Label>
                    <Input
                      id="volunteer-phone"
                      value={newVolunteer.phone}
                      onChange={(e) => setNewVolunteer({...newVolunteer, phone: e.target.value})}
                      className="col-span-3"
                      placeholder="+966501234567"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteer-email" className="text-right">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="volunteer-email"
                      type="email"
                      value={newVolunteer.email}
                      onChange={(e) => setNewVolunteer({...newVolunteer, email: e.target.value})}
                      className="col-span-3"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewVolunteerOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleNewVolunteer}>
                    إضافة المتطوع
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <HandHeart className="h-5 w-5 mr-2 text-purple-500" />
                        {volunteer.name}
                      </CardTitle>
                      <CardDescription>المهارات: {volunteer.skills}</CardDescription>
                    </div>
                    <Badge variant="default">{volunteer.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">ساعات المساهمة</p>
                      <p className="font-semibold">{volunteer.hoursContributed} ساعة</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البرامج المشارك فيها</p>
                      <p className="font-semibold">{volunteer.programs} برنامج</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button 
                        size="sm"
                        onClick={() => handleViewVolunteer(volunteer.name)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        عرض الملف
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSendTask(volunteer.name)}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        إرسال مهمة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">إدارة التبرعات</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast({title: "تصدير التقارير", description: "جاري تصدير تقارير التبرعات..."})}>
                <Download className="h-4 w-4 mr-2" />
                تصدير التقارير
              </Button>
              <Button onClick={() => toast({title: "إضافة تبرع", description: "تم فتح نموذج إضافة تبرع جديد"})}>
                <Plus className="h-4 w-4 mr-2" />
                إضافة تبرع
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  التبرعات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">2,850,000 ريال</p>
                    <p className="text-sm text-muted-foreground">إجمالي التبرعات هذا الشهر</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">تبرعات نقدية</span>
                      <span className="text-sm font-semibold">2,100,000 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">تبرعات عينية</span>
                      <span className="text-sm font-semibold">750,000 ريال</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أهم المتبرعين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>مؤسسة الخير</span>
                    <span className="font-semibold">500,000 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>شركة البناء الحديث</span>
                    <span className="font-semibold">300,000 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متبرع مجهول</span>
                    <span className="font-semibold">250,000 ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">قياس الأثر والتحليلات</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast({title: "تحديث البيانات", description: "جاري تحديث بيانات الأثر..."})}>
                <TrendingUp className="h-4 w-4 mr-2" />
                تحديث البيانات
              </Button>
              <Button onClick={() => toast({title: "تقرير شامل", description: "جاري إنشاء التقرير الشامل للأثر..."})}>
                <FileText className="h-4 w-4 mr-2" />
                تقرير شامل
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  مؤشرات الأثر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">تحسن الأوضاع التعليمية</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">تحسن الأوضاع الصحية</span>
                      <span className="text-sm">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">الاستقرار الاجتماعي</span>
                      <span className="text-sm">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  الأحداث القادمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div 
                    className="border-l-4 border-blue-500 pl-3 cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors"
                    onClick={() => toast({title: "تفاصيل الحدث", description: "حملة توزيع الحقائب المدرسية - 15 فبراير 2024"})}
                  >
                    <h4 className="font-semibold">حملة توزيع الحقائب المدرسية</h4>
                    <p className="text-sm text-muted-foreground">15 فبراير 2024</p>
                  </div>
                  <div 
                    className="border-l-4 border-green-500 pl-3 cursor-pointer hover:bg-green-50 p-2 rounded transition-colors"
                    onClick={() => toast({title: "تفاصيل الحدث", description: "يوم التطوع المجتمعي - 22 فبراير 2024"})}
                  >
                    <h4 className="font-semibold">يوم التطوع المجتمعي</h4>
                    <p className="text-sm text-muted-foreground">22 فبراير 2024</p>
                  </div>
                  <div 
                    className="border-l-4 border-purple-500 pl-3 cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors"
                    onClick={() => toast({title: "تفاصيل الحدث", description: "معرض الأعمال الخيرية - 1 مارس 2024"})}
                  >
                    <h4 className="font-semibold">معرض الأعمال الخيرية</h4>
                    <p className="text-sm text-muted-foreground">1 مارس 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};