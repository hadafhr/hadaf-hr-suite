import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus,
  HandHeart,
  Users,
  Calendar,
  MapPin,
  Clock,
  Target,
  Award,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  Heart,
  Globe,
  Leaf,
  BookOpen
} from 'lucide-react';

export const CommunityVolunteering = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [showNewProgram, setShowNewProgram] = useState(false);

  const volunteeringTabs = [
    { id: 'programs', name: 'البرامج التطوعية', icon: HandHeart },
    { id: 'participants', name: 'المشاركون', icon: Users },
    { id: 'csr', name: 'المسؤولية المجتمعية', icon: Globe },
    { id: 'impact', name: 'الأثر والإنجازات', icon: Award }
  ];

  const volunteerPrograms = [
    {
      id: 1,
      name: 'حملة التبرع بالدم',
      category: 'health',
      description: 'حملة دورية للتبرع بالدم بالشراكة مع بنك الدم المركزي',
      targetParticipants: 100,
      currentParticipants: 78,
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      location: 'مقر الشركة - القاعة الكبرى',
      coordinator: 'د. أحمد محمد',
      status: 'active',
      impact: 'إنقاذ 234 حياة',
      hours: 156,
      category_icon: Heart
    },
    {
      id: 2,
      name: 'برنامج محو الأمية الرقمية',
      category: 'education',
      description: 'تدريب كبار السن على استخدام التقنيات الرقمية والهواتف الذكية',
      targetParticipants: 50,
      currentParticipants: 35,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      location: 'مراكز الأحياء المختلفة',
      coordinator: 'سارة أحمد',
      status: 'active',
      impact: '150 شخص مدرب',
      hours: 280,
      category_icon: BookOpen
    },
    {
      id: 3,
      name: 'حملة تنظيف الشواطئ',
      category: 'environment',
      description: 'حملة بيئية لتنظيف الشواطئ والحفاظ على البيئة البحرية',
      targetParticipants: 80,
      currentParticipants: 92,
      startDate: '2024-01-20',
      endDate: '2024-01-20',
      location: 'شاطئ الكورنيش الشمالي',
      coordinator: 'محمد سالم',
      status: 'completed',
      impact: '5 طن نفايات جُمعت',
      hours: 320,
      category_icon: Leaf
    }
  ];

  const topVolunteers = [
    {
      id: 1,
      name: 'فاطمة عبدالله',
      department: 'الموارد البشرية',
      totalHours: 156,
      programsJoined: 8,
      level: 'ذهبي',
      badge: 'متطوع العام',
      photo: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'أحمد محمد علي',
      department: 'تقنية المعلومات',
      totalHours: 134,
      programsJoined: 6,
      level: 'فضي',
      badge: 'قائد فريق',
      photo: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'نورا سالم',
      department: 'المحاسبة',
      totalHours: 98,
      programsJoined: 5,
      level: 'برونزي',
      badge: 'متطوع نشط',
      photo: '/api/placeholder/40/40'
    }
  ];

  const csrInitiatives = [
    {
      id: 1,
      title: 'برنامج كفالة الأيتام',
      description: 'كفالة شهرية لـ 25 يتيماً في دار الأيتام المحلية',
      budget: 50000,
      beneficiaries: 25,
      duration: 'مستمر',
      status: 'active'
    },
    {
      id: 2,
      title: 'مشروع المنح الدراسية',
      description: 'منح دراسية للطلاب المتفوقين من العائلات المحتاجة',
      budget: 200000,
      beneficiaries: 15,
      duration: 'سنوي',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">مكتمل</Badge>;
      case 'planned':
        return <Badge className="bg-yellow-100 text-yellow-800">مخطط</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ذهبي':
        return <Badge className="bg-yellow-100 text-yellow-800">ذهبي</Badge>;
      case 'فضي':
        return <Badge className="bg-gray-100 text-gray-800">فضي</Badge>;
      case 'برونزي':
        return <Badge className="bg-orange-100 text-orange-800">برونزي</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const ProgramForm = ({ onClose }: { onClose: () => void }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="programName">اسم البرنامج</Label>
          <Input id="programName" placeholder="أدخل اسم البرنامج" />
        </div>
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="health">الصحة</SelectItem>
              <SelectItem value="education">التعليم</SelectItem>
              <SelectItem value="environment">البيئة</SelectItem>
              <SelectItem value="community">المجتمع</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea 
          id="description" 
          placeholder="وصف تفصيلي للبرنامج التطوعي"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="targetParticipants">عدد المشاركين المستهدف</Label>
          <Input id="targetParticipants" type="number" placeholder="0" />
        </div>
        <div>
          <Label htmlFor="startDate">تاريخ البداية</Label>
          <Input id="startDate" type="date" />
        </div>
        <div>
          <Label htmlFor="endDate">تاريخ النهاية</Label>
          <Input id="endDate" type="date" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">المكان</Label>
          <Input id="location" placeholder="موقع النشاط" />
        </div>
        <div>
          <Label htmlFor="coordinator">المنسق</Label>
          <Input id="coordinator" placeholder="المسؤول عن البرنامج" />
        </div>
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={onClose}>إضافة البرنامج</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">المجتمع والتطوع</h2>
          <p className="text-muted-foreground mt-1">
            إدارة البرامج التطوعية والمسؤولية المجتمعية
          </p>
        </div>
        <Dialog open={showNewProgram} onOpenChange={setShowNewProgram}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              برنامج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة برنامج تطوعي جديد</DialogTitle>
            </DialogHeader>
            <ProgramForm onClose={() => setShowNewProgram(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {volunteeringTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {volunteerPrograms.map((program) => {
              const CategoryIcon = program.category_icon;
              const progress = (program.currentParticipants / program.targetParticipants) * 100;
              
              return (
                <Card key={program.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{program.name}</CardTitle>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                            {getStatusBadge(program.status)}
                            <Badge variant="outline">{program.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{program.description}</p>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>المشاركون</span>
                        <span>{program.currentParticipants}/{program.targetParticipants}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-semibold">{program.hours}</div>
                        <div className="text-xs text-muted-foreground">ساعة تطوع</div>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                        <div className="text-lg font-semibold text-primary">{program.impact}</div>
                        <div className="text-xs text-muted-foreground">الأثر المحقق</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{program.startDate} - {program.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{program.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{program.coordinator}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        انضم للبرنامج
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Participants Tab */}
        <TabsContent value="participants" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {topVolunteers.map((volunteer, index) => (
              <Card key={volunteer.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      {index === 0 && (
                        <Award className="absolute -top-1 -right-1 h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{volunteer.name}</h3>
                      <p className="text-sm text-muted-foreground">{volunteer.department}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getLevelBadge(volunteer.level)}
                    <Badge variant="secondary">{volunteer.badge}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{volunteer.totalHours}</div>
                      <div className="text-xs text-muted-foreground">ساعة</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{volunteer.programsJoined}</div>
                      <div className="text-xs text-muted-foreground">برنامج</div>
                    </div>
                  </div>

                  <Button className="w-full" size="sm" variant="outline">
                    عرض الملف التطوعي
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>إحصائيات المشاركة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">247</div>
                  <div className="text-sm text-muted-foreground">إجمالي المتطوعين</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1,856</div>
                  <div className="text-sm text-muted-foreground">ساعة تطوع</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">برنامج منفذ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-muted-foreground">معدل المشاركة</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CSR Tab */}
        <TabsContent value="csr" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {csrInitiatives.map((initiative) => (
              <Card key={initiative.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{initiative.title}</CardTitle>
                      {getStatusBadge(initiative.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{initiative.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-700">₪{initiative.budget.toLocaleString()}</div>
                      <div className="text-xs text-green-600">الميزانية المخصصة</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700">{initiative.beneficiaries}</div>
                      <div className="text-xs text-blue-600">مستفيد</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>المدة: {initiative.duration}</span>
                  </div>

                  <Button className="w-full" size="sm">
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold">234</div>
                <div className="text-sm text-muted-foreground">حياة أُنقذت</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold">150</div>
                <div className="text-sm text-muted-foreground">شخص تعلم</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">طن نفايات جُمعت</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <div className="text-2xl font-bold">40</div>
                <div className="text-sm text-muted-foreground">يتيم مكفول</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>شهادات التقدير والجوائز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-yellow-50 rounded-lg">
                  <Award className="h-12 w-12 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold">جائزة أفضل مبادرة مجتمعية</h4>
                    <p className="text-sm text-muted-foreground">جمعية رجال الأعمال 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <div>
                    <h4 className="font-semibold">شهادة التميز في المسؤولية المجتمعية</h4>
                    <p className="text-sm text-muted-foreground">وزارة التنمية الاجتماعية</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};